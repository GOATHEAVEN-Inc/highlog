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

export const LoginTitle = styled.h4`
  ${({ theme }) => theme.typography.head.H4};
  color: ${({ theme }) => theme.colors.grayScale["00"]};
  margin: 0 0 20px 0;
`;

export const FieldWrapper = styled.div<{ $gap: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap}px;

  &:not(:last-child) {
    margin-bottom: 14px;
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
  ${({ theme }) => theme.typography.body.S0};
  line-height: 20px;
  color: ${({ theme }) => theme.colors.grayScale["00"]};
  transition: ${({ theme }) => theme.transitions.fast};

  &::placeholder {
    ${({ theme }) => theme.typography.body.S0};
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

export const KeepLoginRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const KeepLoginLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const KeepLoginText = styled.span`
  ${({ theme }) => theme.typography.body.S1};
  color: ${({ theme }) => theme.colors.grayScale["00"]};
`;

export const SubmitButtonWrapper = styled.div`
  margin-top: 28px;
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
