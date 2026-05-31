import * as S from "@/pages/onboard/Onboard.styles";
import OnboardProgressBar from "@/features/onboard/shared/OnboardProgressBar";
import ChevronLeft from "@/assets/icons/chevron_left.svg?react";
import OnboardSchoolRecordUpload from "@/features/onboard/step4-record/OnboardSchoolRecordUpload";
import SchoolSelect from "@/features/onboard/step1-school/SchoolSelect";
import DepartmentSelect from "@/features/onboard/step2-department/DepartmentSelect";
import ApplicationTypeSelect from "@/features/onboard/step3-application-type/ApplicationTypeSelect";
import Modal from "@/components/modal/Modal";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useRecordUpload } from "@/api/record/useRecordUploadApi";
import { getRecordList } from "@/api/record/recordListApi";
import { useAuth } from "@/contexts/AuthContext";
import { parseApiError } from "@/api/client";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

/**
 * 온보딩(실제 동작): 생기부 업로드(실제 저장·벡터화) → 학교 → 학과 → 전형 →
 * 기존 실제 질문 생성 흐름(/question/loading → /question/show)으로 인계.
 * 비로그인 시 로그인 페이지로 이동(실제 업로드는 인증 필요).
 */
export default function Onboard() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const { file, status, progress, handleFileSelect, handleRemoveFile } =
    useFileUpload();
  const uploadMutation = useRecordUpload();

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [recordId, setRecordId] = useState<number | null>(null);
  const [recordTitle, setRecordTitle] = useState("");
  const [form, setForm] = useState({
    school: "",
    department: "",
    applicationType: "",
  });
  const [errorModal, setErrorModal] = useState<{ main: string; sub?: string } | null>(
    null,
  );

  const handleSchoolChange = (school: string) =>
    setForm((p) => ({
      ...p,
      school,
      department: p.school === school ? p.department : "",
      applicationType: p.school === school && p.department ? p.applicationType : "",
    }));
  const handleDepartmentChange = (department: string) =>
    setForm((p) => ({
      ...p,
      department,
      applicationType: p.department === department ? p.applicationType : "",
    }));
  const handleApplicationTypeChange = (applicationType: string) =>
    setForm((p) => ({ ...p, applicationType }));

  const handleBackClick = () => setCurrentStep((prev) => Math.max(1, prev - 1));

  // 1단계: 실제 업로드(presigned→스토리지→벡터화) 후 recordId 확보 → 2단계
  const handleUploadAndNext = async () => {
    if (!file || isUploading) return;
    const title =
      (file.name.replace(/\.[^./\\]+$/, "").trim() || "내 생기부").slice(0, 28);
    setIsUploading(true);
    setUploadProgress(0);
    try {
      await uploadMutation.mutateAsync({
        file,
        title,
        filename: file.name,
        onProgress: setUploadProgress,
      });
      const list = await getRecordList();
      const newest = list.records.reduce(
        (a, b) => (b.id > a.id ? b : a),
        list.records[0],
      );
      if (!newest) throw new Error("업로드된 생기부를 찾을 수 없습니다.");
      setRecordId(newest.id);
      setRecordTitle(title);
      setCurrentStep(2);
    } catch (err) {
      setErrorModal({
        main: "생기부 업로드에 실패했어요",
        sub: parseApiError(err).message,
      });
    } finally {
      setIsUploading(false);
    }
  };

  // 마지막: 기존 실제 질문 생성 흐름으로 인계
  const handleGenerate = () => {
    if (!recordId) return;
    navigate("/question/loading", {
      state: {
        recordId,
        title: recordTitle,
        school: form.school,
        department: form.department,
        applicationType: form.applicationType,
        schoolRecord: "",
        questionsPerCategory: 25,
      },
    });
  };

  if (isAuthLoading) return null;
  if (!isAuthenticated) return <Navigate to="/auth" replace />;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <S.Step1Content>
            <OnboardSchoolRecordUpload
              file={file}
              status={status}
              progress={uploadProgress || progress}
              isUploading={isUploading}
              onFileSelect={handleFileSelect}
              onRemove={handleRemoveFile}
              onNext={handleUploadAndNext}
            />
          </S.Step1Content>
        );
      case 2:
        return (
          <S.Step2Content>
            <SchoolSelect
              school={form.school}
              onSchoolChange={handleSchoolChange}
              onNext={() => setCurrentStep(3)}
            />
          </S.Step2Content>
        );
      case 3:
        return (
          <S.Step3Content>
            <DepartmentSelect
              school={form.school}
              department={form.department}
              onDepartmentChange={handleDepartmentChange}
              onNext={() => setCurrentStep(4)}
            />
          </S.Step3Content>
        );
      case 4:
        return (
          <S.Step4Content>
            <ApplicationTypeSelect
              applicationType={form.applicationType}
              onApplicationTypeChange={handleApplicationTypeChange}
              onNext={handleGenerate}
            />
          </S.Step4Content>
        );
      default:
        return null;
    }
  };

  return (
    <S.Container>
      <S.Content>
        <OnboardProgressBar totalSteps={4} currentStep={currentStep} />
        {currentStep > 1 && !isUploading && (
          <S.HeaderRow>
            <S.BackIconButton onClick={handleBackClick} aria-label="이전 단계">
              <ChevronLeft width={20} height={20} />
              <span>이전</span>
            </S.BackIconButton>
          </S.HeaderRow>
        )}
        <S.StepContent>{renderStepContent()}</S.StepContent>
      </S.Content>
      <Modal
        isOpen={!!errorModal}
        onClose={() => setErrorModal(null)}
        mainTitle={errorModal?.main ?? ""}
        subTitle={errorModal?.sub}
        leftButtonText="닫기"
        rightButtonText="다시 시도"
        onLeftButtonClick={() => setErrorModal(null)}
        onRightButtonClick={() => setErrorModal(null)}
      />
    </S.Container>
  );
}
