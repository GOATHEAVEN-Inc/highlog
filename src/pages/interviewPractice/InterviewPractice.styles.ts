import styled from "styled-components";
import { headerAlignedPadding } from "@/styles/layout";

export const InterviewPracticeContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding-top: 64px;
  padding-bottom: 96px;
  gap: 48px;
  background-color: ${({ theme }) => theme.colors.grayScale["10"]};
  ${headerAlignedPadding}
`;
