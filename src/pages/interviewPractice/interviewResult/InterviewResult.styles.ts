import styled from "styled-components";
import { headerAlignedPadding } from "@/styles/layout";

export const InterviewResultContainer = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  padding-top: 64px;
  padding-bottom: 96px;
  gap: 96px;
  background-color: ${({ theme }) => theme.colors.grayScale["10"]};
  ${headerAlignedPadding}
`;
