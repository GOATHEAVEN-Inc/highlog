import styled from "styled-components";

export const TabContainer = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  gap: 4px;
  padding: 4px;
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.grayScale["09"]};
`;

export const TabItem = styled.button<{ $isActive: boolean }>`
  flex: 1 1 0;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
  ${({ theme }) => theme.typography.body.S2}
  border-radius: ${({ theme }) => theme.radius.sm};
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.grayScale["11"] : "transparent"};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary["00"] : theme.colors.grayScale["04"]};
  box-shadow: ${({ theme, $isActive }) =>
    $isActive ? theme.shadows.sm : "none"};
  font-weight: ${({ $isActive }) => ($isActive ? 700 : 500)};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  transition: ${({ theme }) => theme.transitions.base};

  &:hover {
    color: ${({ theme, $isActive }) =>
      $isActive ? theme.colors.primary["00"] : theme.colors.grayScale["02"]};
  }
`;
