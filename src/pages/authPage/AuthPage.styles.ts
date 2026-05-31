import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 89px);
  padding-top: 39px;
  padding-bottom: 96px;
  padding-left: clamp(20px, 6vw, 120px);
  padding-right: clamp(20px, 6vw, 120px);
  box-sizing: border-box;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: stretch;
  gap: 24px;

  @media (max-width: 960px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FrameBase = styled.div`
  background-color: ${({ theme }) => theme.colors.grayScale["11"]};
  border: 1px solid ${({ theme }) => theme.colors.grayScale["08"]};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  min-width: 0;
`;

export const LeftFrame = styled(FrameBase)`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: none;
  background: linear-gradient(
    155deg,
    ${({ theme }) => theme.colors.primaryScale["700"]} 0%,
    ${({ theme }) => theme.colors.primaryScale["500"]} 52%,
    ${({ theme }) => theme.colors.primaryScale["400"]} 100%
  );

  @media (max-width: 960px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

export const FormFrame = styled(FrameBase)`
  flex: 0 1 486px;
  width: min(486px, 100%);
  min-height: 560px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 960px) {
    flex-basis: auto;
    width: 100%;
    min-height: 0;
  }
`;

export const FormFrameContent = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 36px 0 40px;

  @media (max-width: 520px) {
    padding: 28px 0 32px;
  }
`;

export const FormFrameContentWithPadding = styled(FormFrameContent)`
  padding: 128px 18px 0 18px;
`;

export const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 32px 28px;
  box-sizing: border-box;

  @media (max-width: 520px) {
    padding: 0 18px 24px;
  }
`;
