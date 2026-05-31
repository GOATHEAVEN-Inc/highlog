import styled from "styled-components";
import { headerAlignedPadding } from "@/styles/layout";

export const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 89px);
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
`;

export const Title = styled.h1`
  ${({ theme }) => theme.typography.head.H3};
  color: ${({ theme }) => theme.colors.grayScale["00"]};
  margin: 0;
`;
