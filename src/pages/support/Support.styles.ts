import styled from "styled-components";
import { headerAlignedPadding } from "@/styles/layout";

export const SupportContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding-top: 64px;
  padding-bottom: 96px;
  background-color: ${({ theme }) => theme.colors.grayScale["10"]};
  ${headerAlignedPadding}
`;

export const SupportWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  gap: 48px;
`;
