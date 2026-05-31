import { useState } from "react";
import { DefaultButton } from "@/components/button/Button";
import * as S from "@/features/myPage/MyPageAccount.styles";
import { useMyPageAccountInfo } from "@/api/myPage/useMyPageAccountInfo";
import { useChangeName } from "@/api/myPage/useChangeName";

const MAX_NAME_LENGTH = 50;

type MyPageAccountProps = {
  onNavigateToPasswordChange: () => void;
};

export default function MyPageAccount({
  onNavigateToPasswordChange,
}: MyPageAccountProps) {
  const { data, isLoading } = useMyPageAccountInfo();

  if (isLoading || !data) {
    return (
      <MyPageAccountForm
        key="loading"
        initialName=""
        email=""
        isLoading
        onNavigateToPasswordChange={onNavigateToPasswordChange}
      />
    );
  }

  return (
    <MyPageAccountForm
      key={`${data.userName}-${data.email}`}
      initialName={data.userName ?? ""}
      email={data.email ?? ""}
      isLoading={false}
      onNavigateToPasswordChange={onNavigateToPasswordChange}
    />
  );
}

interface MyPageAccountFormProps {
  initialName: string;
  email: string;
  isLoading: boolean;
  onNavigateToPasswordChange: () => void;
}

function MyPageAccountForm({
  initialName,
  email,
  isLoading,
  onNavigateToPasswordChange,
}: MyPageAccountFormProps) {
  const { mutateAsync: submitNameChange, isPending } = useChangeName();
  const [name, setName] = useState(initialName);

  const displayName = isLoading
    ? "…"
    : initialName
    ? `${initialName} 님`
    : "-";

  const handleSaveName = async () => {
    const trimmed = name.trim();
    if (!trimmed || trimmed.length > MAX_NAME_LENGTH) return;
    if (trimmed === initialName) return;
    try {
      await submitNameChange({ newName: trimmed });
    } catch {
      // 에러는 useChangeName의 onError에서 처리
    }
  };

  return (
    <S.AccountContent>
      <S.AccountUserName>{displayName}</S.AccountUserName>
      <S.AccountFormSection>
        <S.AccountFieldRow>
          <S.AccountField>
            <S.AccountFieldLabel htmlFor="account-name">이름</S.AccountFieldLabel>
            <S.AccountFieldInput
              id="account-name"
              type="text"
              placeholder="이름을 입력해주세요"
              maxLength={MAX_NAME_LENGTH}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              autoComplete="name"
            />
          </S.AccountField>
          <S.AccountField>
            <S.AccountFieldLabel htmlFor="account-email">이메일</S.AccountFieldLabel>
            <S.AccountEmailInput
              id="account-email"
              type="email"
              readOnly
              autoComplete="email"
              defaultValue={email}
            />
          </S.AccountField>
        </S.AccountFieldRow>
      </S.AccountFormSection>
      <S.AccountButtonGroup>
        <DefaultButton
          width={60}
          type={isPending ? "disabled" : "primary"}
          text="저장"
          onClick={() => void handleSaveName()}
        />
        <DefaultButton
          width={120}
          type="secondary"
          text="비밀번호 변경"
          onClick={onNavigateToPasswordChange}
        />
      </S.AccountButtonGroup>
    </S.AccountContent>
  );
}
