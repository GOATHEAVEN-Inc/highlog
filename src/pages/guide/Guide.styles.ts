import styled from "styled-components";
import { headerAlignedPadding } from "@/styles/layout";

export const Container = styled.main`
  width: 100%;
  box-sizing: border-box;
  padding-top: 64px;
  padding-bottom: 96px;
  background-color: ${({ theme }) => theme.colors.grayScale["10"]};
  ${headerAlignedPadding}
`;

export const FlowResultWrapper = styled.div`
  padding: 96px 0;
  display: flex;
  flex-direction: column;
  gap: 96px;
`;
