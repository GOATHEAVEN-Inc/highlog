import styled, { css } from "styled-components";

/** 헤더와 동일한 좌우 정렬: 풀폭 + 헤더와 같은 좌우 패딩(모바일 max(20px,4vw) / 태블릿 48px / 데스크탑 120px) */
const headerAlignedPadding = css`
  padding-left: max(20px, 4vw);
  padding-right: max(20px, 4vw);

  @media (min-width: 900px) {
    padding-left: 48px;
    padding-right: 48px;
  }

  @media (min-width: 1280px) {
    padding-left: 120px;
    padding-right: 120px;
  }
`;

export const Container = styled.main`
  width: 100%;
  min-height: calc(100vh - 89px);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 0 80px;
  background-color: ${({ theme }) => theme.colors.grayScale["10"]};
`;

export const Content = styled.section`
  width: 100%;
`;

export const HeaderRow = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  ${headerAlignedPadding}

  /* BackIconButton의 좌측 마진 대신 컨테이너 패딩으로 정렬 */
  & > button {
    margin-left: 0;
  }
`;

export const BackIconButton = styled.button`
  margin-left: clamp(16px, 4vw, 120px);
  padding: 8px 14px 8px 8px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale["08"]};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.grayScale["11"]};
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.grayScale["02"]};
  ${({ theme }) => theme.typography.body.S1};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.grayScale["09"]};
    border-color: ${({ theme }) => theme.colors.grayScale["07"]};
  }
`;

/** 모든 단계 콘텐츠가 들어가는 헤더 정렬 영역 (풀폭, 헤더와 동일한 좌우 패딩) */
export const StepContent = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-top: clamp(28px, 4vw, 48px);
  ${headerAlignedPadding}
`;

/** 단계 1~4 공통: 풀폭 흰 카드 (좌측 정렬 콘텐츠) */
const StepCardBase = styled.div`
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.grayScale["11"]};
  border: 1px solid ${({ theme }) => theme.colors.grayScale["08"]};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: clamp(28px, 4vw, 56px) clamp(20px, 4vw, 64px);
`;

export const Step1Content = styled(StepCardBase)``;
export const Step2Content = styled(StepCardBase)``;
export const Step3Content = styled(StepCardBase)``;
export const Step4Content = styled(StepCardBase)``;

/** 로딩 전용: 카드 없이 폭만 채움 */
export const Step4LoadingOuter = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

export const Step4LoadingInner = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

export const Step5Content = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

export const Step5Inner = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
