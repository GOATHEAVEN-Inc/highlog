import { DefaultButton } from "@/components/button/Button";
import FileUpload from "@/features/recordManagement/FileUpload";
import type { UploadStatus } from "@/hooks/useFileUpload";
import * as S from "@/features/onboard/step4-record/OnboardSchoolRecordUpload.styles";

interface OnboardSchoolRecordUploadProps {
  file: File | null;
  status: UploadStatus;
  progress: number;
  isUploading: boolean;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
  onNext: () => void;
}

export default function OnboardSchoolRecordUpload({
  file,
  status,
  progress,
  isUploading,
  onFileSelect,
  onRemove,
  onNext,
}: OnboardSchoolRecordUploadProps) {
  const canProceed = !!file && !isUploading;

  return (
    <S.Wrapper>
      <S.Title>
        면접을 준비하는 <S.Highlight>생활기록부</S.Highlight>를 업로드해 주세요
      </S.Title>
      <S.UploadSection>
        <FileUpload
          text="이곳에 파일을 업로드해주세요"
          subText="HTML, PDF 파일만 업로드 할 수 있어요"
          status={isUploading ? "uploading" : status}
          progress={progress}
          fileName={file?.name}
          onFileSelect={onFileSelect}
          onRemove={onRemove}
        />
        {file && (
          <S.ActionRow>
            <DefaultButton
              width={140}
              type={canProceed ? "primary" : "disabled"}
              text={isUploading ? "분석 중..." : "다음"}
              onClick={canProceed ? onNext : undefined}
            />
          </S.ActionRow>
        )}
      </S.UploadSection>
    </S.Wrapper>
  );
}
