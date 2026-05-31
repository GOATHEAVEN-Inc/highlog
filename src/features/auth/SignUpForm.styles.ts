import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 32px;
  box-sizing: border-box;

  @media (max-width: 520px) {
    padding: 0 20px;
  }
`;

export const SignUpTitle = styled.h4`
  ${({ theme }) => theme.typography.head.H4};
  line-height: 32px;
  color: ${({ theme }) => theme.colors.grayScale["00"]};
  margin: 0 0 18px 0;
`;

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FieldWrapper = styled.div<{ $gap: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap}px;

  &:not(:last-child) {
    margin-bottom: 13px;
  }
`;

export const Label = styled.label`
  ${({ theme }) => theme.typography.body.S1};
  color: ${({ theme }) => theme.colors.grayScale["00"]};
`;

export const AuthInput = styled.input`
  width: 100%;
  padding: 15px 14px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.grayScale["10"]};
  border: 1px solid ${({ theme }) => theme.colors.grayScale["08"]};
  border-radius: ${({ theme }) => theme.radius.md};
  ${({ theme }) => theme.typography.body.S1};
  line-height: 20px;
  color: ${({ theme }) => theme.colors.grayScale["00"]};
  transition: ${({ theme }) => theme.transitions.fast};

  &::placeholder {
    ${({ theme }) => theme.typography.body.S1};
    line-height: 20px;
    color: ${({ theme }) => theme.colors.grayScale["05"]};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.grayScale["07"]};
  }

  &:focus {
    outline: none;
    background-color: ${({ theme }) => theme.colors.grayScale["11"]};
    border-color: ${({ theme }) => theme.colors.primary["00"]};
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`;

export const EmailInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  input {
    flex: 1;
    min-width: 0;
  }
`;

export const OpenModalButton = styled.button.attrs({ type: "button" })`
  min-width: 89px;
  padding: 8px 6.5px;
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  background-color: ${({ theme }) => theme.colors.secondary["08"]};
  color: ${({ theme }) => theme.colors.secondary["05"]};
  ${({ theme }) => theme.typography.body.XS2};
  cursor: pointer;
  flex-shrink: 0;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary["07"]};
  }
`;

export const VerifyCodeFieldWrapper = styled(FieldWrapper)`
  margin-bottom: 0;
`;

export const CheckboxSection = styled.div`
  margin-top: 22px;
`;

export const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

export const CheckboxLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

export const CheckboxText = styled.span`
  ${({ theme }) => theme.typography.body.S1};
  color: ${({ theme }) => theme.colors.grayScale["00"]};
`;

export const SubmitButtonWrapper = styled.div`
  margin-top: 15px;
  margin-bottom: 24px;
  width: 100%;
`;

export const AuthPrimaryButton = styled.button`
  width: 100%;
  display: flex;
  padding: 15px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.primary["00"]};
  color: ${({ theme }) => theme.colors.grayScale["11"]};
  ${({ theme }) => theme.typography.body.M2};
  cursor: pointer;
  box-sizing: border-box;
  transition: ${({ theme }) => theme.transitions.fast};
  box-shadow: 0 4px 14px -4px rgba(90, 92, 245, 0.5);

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryScale["600"]};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primaryScale["700"]};
    transform: translateY(1px);
  }
`;

export const AuthUnderBarButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.secondary["01"]};
  ${({ theme }) => theme.typography.body.S0};
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
`;
