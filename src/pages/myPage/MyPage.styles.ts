import styled from "styled-components";
import { headerAlignedPadding } from "@/styles/layout";

export const Container = styled.div`
  width: 100%;
  padding-top: 64px;
  padding-bottom: 96px;
  background-color: ${({ theme }) => theme.colors.grayScale["10"]};
  box-sizing: border-box;
  min-height: 100%;
  ${headerAlignedPadding}
`;
