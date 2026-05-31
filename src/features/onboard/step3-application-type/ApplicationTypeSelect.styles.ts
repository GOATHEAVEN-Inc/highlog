import styled from "styled-components";

export const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Title = styled.h4`
  margin: 0;
  text-align: left;
  color: ${({ theme }) => theme.colors.grayScale["00"]};
  ${({ theme }) => theme.typography.head.H4};

  @media (max-width: 520px) {
    font-size: 22px;
    line-height: 32px;
  }
`;

export const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary["00"]};
`;

export const RadioGroup = styled.div`
  margin-top: 32px;
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: stretch;
`;

export const ButtonRow = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: flex-start;
`;

export const RadioOption = styled.label<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.primary["00"] : theme.colors.grayScale["08"]};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primaryScale["50"] : theme.colors.grayScale["11"]};
  ${({ theme }) => theme.typography.body.M1};
  color: ${({ theme }) => theme.colors.grayScale["00"]};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme, $active }) =>
      $active ? theme.colors.primary["00"] : theme.colors.grayScale["07"]};
    background-color: ${({ theme, $active }) =>
      $active ? theme.colors.primaryScale["50"] : theme.colors.grayScale["10"]};
  }
`;
