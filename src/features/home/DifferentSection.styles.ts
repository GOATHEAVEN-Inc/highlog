import styled from "styled-components";

export const DifferentSectionContainer = styled.section`
  width: 100%;
  height: 707px;
  background: linear-gradient(180deg, #edf5ff 0%, #dbe0ff 104.65%);
  display: flex;
  justify-content: center;
  position: relative;
  padding-top: 236px;

  @media (max-width: 1024px) {
    height: auto;
    padding: 48px 20px 56px;
    flex-direction: column;
    align-items: center;
  }
`;

export const MainTitle = styled.p`
  ${({ theme }) => theme.typography.head.H1};
  color: ${({ theme }) => theme.colors.grayScale["00"]};
  white-space: pre-wrap;
  position: absolute;
  left: 184px;
  top: 80px;

  @media (max-width: 1024px) {
    position: static;
    text-align: center;
    font-size: 22px;
    line-height: 1.4;
    margin-bottom: 32px;
  }
`;

export const MainTitleBlue = styled.span`
  ${({ theme }) => theme.typography.head.H1};
  color: ${({ theme }) => theme.colors.secondary["03"]};
`;

export const DifferentWrapper = styled.div`
  display: flex;
  gap: 52px;
  align-items: center;

  @media (max-width: 1024px) {
    flex-direction: column;
    width: 100%;
    gap: 24px;
  }
`;

export const BeforeBox = styled.div`
  display: flex;
  width: 324px;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 360px;
  }
`;

export const BeforeText = styled.p`
  ${({ theme }) => theme.typography.body.L2};
  color: #6c6dcb;
`;

export const BeforeCardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

export const BeforeCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 80px;
  padding: 8px 32px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 8px;
  border: 2px solid #bfbcf0;
  background-color: rgba(246, 246, 251, 0.3);
`;

export const BeforeCardText = styled.p`
  ${({ theme }) => theme.typography.body.L2};
  color: #363574;
`;

export const BeforeCardTextSub = styled.p`
  ${({ theme }) => theme.typography.body.L0};
  color: #363574;
`;

export const PolygonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 73px;
  padding-top: 50px;

  @media (max-width: 1024px) {
    /* 모바일에선 화살표(폴리곤 4개)는 너무 자리 차지하니 숨김 */
    display: none;
  }
`;

export const AfterBox = styled.div`
  display: flex;
  width: 324px;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin-bottom: 62px;

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 360px;
    margin-bottom: 0;
  }
`;

export const AfterTextBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 20px 20px 0 20px;
  background-color: ${({ theme }) => theme.colors.grayScale["11"]};
  box-shadow: 1px 2px 2px 0 rgba(3, 14, 160, 0.35);
`;

export const AfterText = styled.p`
  ${({ theme }) => theme.typography.head.H4};
  color: #000;
`;

export const AfterTextSub = styled.span`
  ${({ theme }) => theme.typography.body.XL};
  color: #000;
`;

export const AfterCardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

export const AfterCard = styled.div<{ $color: string }>`
  display: flex;
  flex-direction: column;
  height: 80px;
  padding: 8px 32px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 8px;
  background-color: ${({ $color }) => $color};
`;

export const AfterCardText = styled.p`
  ${({ theme }) => theme.typography.body.L2};
  color: ${({ theme }) => theme.colors.secondary["09"]};
`;

export const AfterCardTextSub = styled.p`
  ${({ theme }) => theme.typography.body.XL};
  color: #000;
`;
