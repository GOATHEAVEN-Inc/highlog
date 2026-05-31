import styled from "styled-components";
import { headerAlignedPadding } from "@/styles/layout";

export const Container = styled.div`
  width: 100%;
  padding-top: 64px;
  padding-bottom: 96px;
  background-color: ${({ theme }) => theme.colors.grayScale["10"]};
  box-sizing: border-box;
  ${headerAlignedPadding}
`;

export const ContentWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

export const LoadingCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin-top: 48px;
  width: 100%;
`;
