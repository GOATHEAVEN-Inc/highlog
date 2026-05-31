import { useState } from "react";
import PasswordInput from "@/components/input/PasswordInput";
import * as S from "@/features/auth/FindPasswordForm.styles";

type FindPasswordStep = "initial" | "newPassword";

interface FindPasswordFormProps {
  onSendVerificationCode: (email: string) => Promise<void>;
  onVerifyAndGoNext: (data: { email: string; verificationCode: string }) => Promise<void>;
  onChangePassword: (data: {
    email: string;
    verificationCode: string;
    newPassword: string;
    newPasswordConfirm: string;
  }) => Promise<void>;
  isSendingCode?: boolean;
  isVerifying?: boolean;
  isChangingPassword?: boolean;
  errorMessage?: string;
}

export default function FindPasswordForm({
  onSendVerificationCode,
  onVerifyAndGoNext,
  onChangePassword,
  isSendingCode,
  isVerifying,
  isChangingPassword,
  errorMessage,
}: FindPasswordFormProps) {
  const [step, setStep] = useState<FindPasswordStep>("initial");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const handleSendCode = () => {
    const trimmed = email.trim();
    if (!trimmed) return;
    onSendVerificationCode(trimmed).catch(() => {
      /* page 측에서 errorMessage로 표시 */
    });
  };

  const handleGoToPasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onVerifyAndGoNext({ email, verificationCode });
      setStep("newPassword");
    } catch {
      /* page 측에서 errorMessage로 표시, step 유지 */
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onChangePassword({
        email,
        verificationCode,
        newPassword,
        newPasswordConfirm,
      });
    } catch {
      /* page 측에서 errorMessage로 표시 */
    }
  };

  if (step === "initial") {
    return (
      <S.Form onSubmit={handleGoToPasswordChange}>
        <S.FormTitle>비밀번호 찾기</S.FormTitle>
        <S.FieldWrapper $gap={7}>
          <S.Label htmlFor="findPassword-email">이메일</S.Label>
          <S.EmailInputRow>
            <S.AuthInput
              id="findPassword-email"
              type="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <S.OpenModalButton
              type="button"
              onClick={handleSendCode}
              disabled={isSendingCode || !email.trim()}
            >
              {isSendingCode ? "발송 중..." : "인증번호 받기"}
            </S.OpenModalButton>
          </S.EmailInputRow>
        </S.FieldWrapper>
        <S.VerifyCodeFieldWrapper $gap={5}>
          <S.Label htmlFor="findPassword-code">인증번호</S.Label>
          <S.AuthInput
            id="findPassword-code"
            type="text"
            placeholder="이메일로 받은 인증번호를 입력해주세요"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
        </S.VerifyCodeFieldWrapper>
        {errorMessage && <S.ErrorText>{errorMessage}</S.ErrorText>}
        <S.PasswordChangeButtonWrapper>
          <S.AuthPrimaryButton type="submit" disabled={isVerifying}>
            {isVerifying ? "확인 중..." : "비밀번호 변경"}
          </S.AuthPrimaryButton>
        </S.PasswordChangeButtonWrapper>
      </S.Form>
    );
  }

  return (
    <S.Form onSubmit={handleChangePassword}>
      <S.FormTitle>비밀번호 변경</S.FormTitle>
      <S.FieldWrapper $gap={7}>
        <S.Label htmlFor="findPassword-new">새 비밀번호</S.Label>
        <PasswordInput
          id="findPassword-new"
          placeholder="8자 이상, 영문, 숫자, 특수문자 3가지 조합"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </S.FieldWrapper>
      <S.FieldWrapper $gap={7}>
        <S.Label htmlFor="findPassword-confirm">새 비밀번호 확인</S.Label>
        <PasswordInput
          id="findPassword-confirm"
          placeholder="새 비밀번호 재입력"
          value={newPasswordConfirm}
          onChange={(e) => setNewPasswordConfirm(e.target.value)}
          required
        />
      </S.FieldWrapper>
      {errorMessage && <S.ErrorText>{errorMessage}</S.ErrorText>}
      <S.SubmitButtonWrapper>
        <S.AuthPrimaryButton type="submit" disabled={isChangingPassword}>
          {isChangingPassword ? "변경 중..." : "변경 완료"}
        </S.AuthPrimaryButton>
      </S.SubmitButtonWrapper>
    </S.Form>
  );
}
