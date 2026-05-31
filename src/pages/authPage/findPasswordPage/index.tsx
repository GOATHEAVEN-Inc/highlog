import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@/components/modal/Modal";
import AuthDescription from "@/features/auth/AuthDescription";
import FindPasswordForm from "@/features/auth/FindPasswordForm";
import * as S from "@/pages/authPage/AuthPage.styles";
import {
  useConfirmEmail,
  useRequestEmailVerify,
  useResetPassword,
} from "@/api/auth/useAuthApi";
import { parseApiError } from "@/api/client";
import { isValidPassword } from "@/constants/auth";

export default function FindPasswordPage() {
  const navigate = useNavigate();
  const [isSentModalOpen, setIsSentModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { mutateAsync: requestEmailVerify, isPending: isSendingCode } =
    useRequestEmailVerify();
  const { mutateAsync: confirmEmail, isPending: isVerifying } = useConfirmEmail();
  const { mutateAsync: resetPassword, isPending: isChangingPassword } =
    useResetPassword();

  const handleSendVerificationCode = async (email: string) => {
    setErrorMessage("");
    try {
      await requestEmailVerify({ email });
      setIsSentModalOpen(true);
    } catch (err) {
      setErrorMessage(parseApiError(err).message);
      throw err;
    }
  };

  const handleVerifyAndGoNext = async (data: {
    email: string;
    verificationCode: string;
  }) => {
    setErrorMessage("");
    try {
      const res = await confirmEmail({
        email: data.email,
        code: data.verificationCode,
      });
      if (!res.verified) {
        setErrorMessage(res.message ?? "인증번호가 올바르지 않습니다.");
        throw new Error(res.message ?? "VERIFY_FAILED");
      }
    } catch (err) {
      if (!errorMessage) {
        setErrorMessage(parseApiError(err).message);
      }
      throw err;
    }
  };

  const handleChangePassword = async (data: {
    email: string;
    verificationCode: string;
    newPassword: string;
    newPasswordConfirm: string;
  }) => {
    setErrorMessage("");
    if (!isValidPassword(data.newPassword)) {
      setErrorMessage(
        "비밀번호는 8자 이상, 영문/숫자/특수문자 중 3가지 이상 조합이어야 합니다."
      );
      throw new Error("INVALID_PASSWORD");
    }
    if (data.newPassword !== data.newPasswordConfirm) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      throw new Error("PASSWORD_MISMATCH");
    }
    try {
      await resetPassword({
        email: data.email,
        code: data.verificationCode,
        newPassword: data.newPassword,
      });
      setIsCompleteModalOpen(true);
    } catch (err) {
      setErrorMessage(parseApiError(err).message);
      throw err;
    }
  };

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.LeftFrame>
          <AuthDescription />
        </S.LeftFrame>
        <S.FormFrame>
          <S.FormFrameContentWithPadding>
            <FindPasswordForm
              onSendVerificationCode={handleSendVerificationCode}
              onVerifyAndGoNext={handleVerifyAndGoNext}
              onChangePassword={handleChangePassword}
              isSendingCode={isSendingCode}
              isVerifying={isVerifying}
              isChangingPassword={isChangingPassword}
              errorMessage={errorMessage}
            />
          </S.FormFrameContentWithPadding>
        </S.FormFrame>
      </S.ContentWrapper>
      <Modal
        isOpen={isSentModalOpen}
        onClose={() => setIsSentModalOpen(false)}
        mainTitle="인증번호가 발송되었습니다"
        subTitle="입력한 이메일로 인증번호를 발송했습니다."
        leftButtonText="확인"
        rightButtonText="확인"
        onLeftButtonClick={() => setIsSentModalOpen(false)}
        onRightButtonClick={() => setIsSentModalOpen(false)}
      />
      <Modal
        isOpen={isCompleteModalOpen}
        onClose={() => {
          setIsCompleteModalOpen(false);
          navigate("/auth");
        }}
        mainTitle="비밀번호가 변경되었습니다"
        subTitle="새 비밀번호로 다시 로그인해주세요."
        leftButtonText="확인"
        rightButtonText="확인"
        onLeftButtonClick={() => {
          setIsCompleteModalOpen(false);
          navigate("/auth");
        }}
        onRightButtonClick={() => {
          setIsCompleteModalOpen(false);
          navigate("/auth");
        }}
      />
    </S.Container>
  );
}
