import styled from "styled-components";

export const RecordCardContainer = styled.div`
  width: 1200px;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.grayScale["11"]};
  border: 0.5px solid ${({ theme }) => theme.colors.secondary["07"]};
  border-radius: 12px;
  padding: 16px 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary["08"]};
  }
`;

export const RecordCardText = styled.p`
  ${({ theme }) => theme.typography.body.L1};
  color: #000000;
`;

export const RecordCardIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.secondary["05"]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 8px;
  box-sizing: border-box;
  cursor: pointer;
`;

export const RecordCardIcon = styled.svg`
  width: 100%;
  height: 100%;

  path {
    stroke: ${({ theme }) => theme.colors.secondary["08"]};
  }
`;
