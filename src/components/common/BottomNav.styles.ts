import styled from "styled-components";

// 모바일 하단 fixed 네비게이션. 데스크탑(>=900px)에서는 숨김.
// iOS Safari home indicator를 피하기 위해 env(safe-area-inset-bottom) 추가.

const TABLET = "900px";

export const Bar = styled.nav`
  display: none;

  @media (max-width: ${TABLET}) {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 90;
    background: #fff;
    border-top: 1px solid ${({ theme }) => theme.colors.grayScale["08"]};
    padding: 8px 4px calc(8px + env(safe-area-inset-bottom));
    justify-content: space-around;
    align-items: stretch;
    box-shadow: 0 -4px 14px rgba(0, 0, 0, 0.04);
  }
`;

export const Item = styled.button<{ $active: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme, $active }) =>
    $active
      ? theme.colors.primary["00"]
      : theme.colors.grayScale["04"]};
  ${({ theme }) => theme.typography.body.S0};
  font-size: 11px;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  transition: color 0.15s ease;

  svg {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
  }

  /* 활성 상태에서 아이콘 stroke를 primary로 */
  &[data-active="true"] svg path,
  &[data-active="true"] svg line,
  &[data-active="true"] svg circle,
  &[data-active="true"] svg rect {
    stroke: currentColor;
  }
`;

export const Label = styled.span`
  white-space: nowrap;
  line-height: 1;
`;

/** 페이지 본문이 하단 네비에 가리지 않도록 root에 주는 padding-bottom용 컴포넌트 */
export const BottomSpacer = styled.div`
  display: none;

  @media (max-width: ${TABLET}) {
    display: block;
    height: calc(64px + env(safe-area-inset-bottom));
  }
`;
