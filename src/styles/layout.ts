import { css } from "styled-components";

/**
 * 헤더와 동일한 좌우 정렬을 위한 패딩.
 * 헤더(Header.styles.ts)와 같은 브레이크포인트/값 사용:
 * - 모바일: max(20px, 4vw)
 * - 태블릿(≥900px): 48px
 * - 데스크탑(≥1280px): 120px
 */
export const headerAlignedPadding = css`
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

/**
 * 페이지 최상위 컨테이너 공통.
 * 풀폭 + 헤더 정렬 패딩(좌우 여백이 헤더 로고/유저아이콘과 일치).
 * 고정 min-width(1440px) 금지 — 노트북에서 가로 스크롤 유발하던 패턴을 대체한다.
 * 내부 콘텐츠는 contentInner로 감싸 가운데 정렬 + 초광폭 가드.
 */
export const pageContainer = css`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  ${headerAlignedPadding}
`;

/**
 * 헤더폭을 채우는 내부 래퍼.
 * width:100%로 헤더 정렬 영역을 가득 채우되, 초광폭(>~1840px) 화면에서만
 * 가독성을 위해 1600px로 제한한다(일반 노트북/모니터에선 헤더폭과 동일).
 */
export const contentInner = css`
  width: 100%;
  max-width: 1600px;
  box-sizing: border-box;
`;
