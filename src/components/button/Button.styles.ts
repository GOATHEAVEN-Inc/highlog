import styled from "styled-components";

export const DefaultButtonContainer = styled.button<{ type: string; width: number }>`
  display: inline-flex;
  width: ${({ width }) => (width ? `${width}px` : "174px")};
  padding: 10px 0;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base},
    transform ${({ theme }) => theme.transitions.fast};
  background-color: ${({ theme, type }) =>
    type === "primary"
      ? theme.colors.primaryScale["500"]
      : type === "secondary"
      ? theme.colors.primaryScale["50"]
      : theme.colors.grayScale["08"]};
  box-shadow: ${({ theme, type }) =>
    type === "primary" ? theme.shadows.xs : "none"};

  &:hover:not(:disabled) {
    background-color: ${({ theme, type }) =>
      type === "primary"
        ? theme.colors.primaryScale["600"]
        : type === "secondary"
        ? theme.colors.primaryScale["100"]
        : theme.colors.grayScale["08"]};
    box-shadow: ${({ theme, type }) =>
      type === "primary" ? theme.shadows.sm : "none"};
  }

  &:active:not(:disabled) {
    transform: translateY(0.5px);
    background-color: ${({ theme, type }) =>
      type === "primary"
        ? theme.colors.primaryScale["700"]
        : type === "secondary"
        ? theme.colors.primaryScale["200"]
        : theme.colors.grayScale["08"]};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const ButtonText = styled.p<{ type: string }>`
  margin: 0;
  color: ${({ theme, type }) =>
    type === "primary"
      ? theme.colors.grayScale["11"]
      : type === "secondary"
      ? theme.colors.primaryScale["700"]
      : theme.colors.grayScale["04"]};
  ${({ theme }) => theme.typography.body.M2};
`;

export const UnderBarButtonText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.primaryScale["700"]};
  ${({ theme }) => theme.typography.body.L2};
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.base};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryScale["800"]};
  }
`;
