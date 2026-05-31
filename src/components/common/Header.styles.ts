import styled from "styled-components";

// 데스크탑 breakpoint 미만에서는 nav를 숨기고 햄버거 메뉴로 전환.
const TABLET = "900px";
const MOBILE = "640px";

export const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 16px max(20px, 4vw);
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary["08"]};
  background-color: ${({ theme }) => theme.colors.grayScale["11"]};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  @media (min-width: ${TABLET}) {
    padding: 20px 48px;
  }

  @media (min-width: 1280px) {
    padding: 24px 120px;
  }
`;

export const LogoNavWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-shrink: 1;
  min-width: 0;

  @media (min-width: ${TABLET}) {
    gap: 40px;
    flex-shrink: 0;
  }

  @media (min-width: 1280px) {
    width: 663px;
    gap: 73px;
  }
`;

export const NavBox = styled.div`
  display: none;
  align-items: center;
  gap: 24px;

  @media (min-width: ${TABLET}) {
    display: flex;
  }
`;

export const NavItemWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const PopupPositioner = styled.div`
  position: absolute;
  top: 65px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  min-width: max-content;
`;

export const NavTitle = styled.button<{ $activeTab: boolean }>`
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  ${({ theme, $activeTab }) =>
    $activeTab ? theme.typography.body.L2 : theme.typography.body.L1};
  color: ${({ theme, $activeTab }) =>
    $activeTab ? theme.colors.primary["00"] : theme.colors.grayScale["00"]};
  cursor: pointer;
  white-space: nowrap;
`;

export const LoggedInContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;

  @media (min-width: ${TABLET}) {
    gap: 16px;
  }
`;

export const LineColumn = styled.div`
  width: 1px;
  height: 24px;
  background-color: #a5b8f1;

  @media (max-width: ${TABLET}) {
    display: none;
  }
`;

/** 데스크탑 전용 유저 아이콘 버튼 */
export const DesktopUserButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  padding: 0;

  @media (max-width: ${TABLET}) {
    display: none;
  }
`;

/** 모바일에서만 보이는 컴팩트한 유저 아바타 */
export const MobileUserButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  width: 36px;
  height: 36px;
  padding: 0;

  @media (max-width: ${TABLET}) {
    display: inline-flex;
  }
`;

export const LoggedInWrapper = styled.div`
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.primary["00"]};
  cursor: pointer;
  flex-shrink: 0;

  @media (max-width: ${TABLET}) {
    padding: 6px 12px;
  }
`;

/** 모바일에서 헤더 좌우 충돌을 막기 위해 데스크탑에서만 보이는 변형 */
export const DesktopOnlyCta = styled(LoggedInWrapper)`
  @media (max-width: ${TABLET}) {
    display: none;
  }
`;

export const LoggedInBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const LoggedInTitle = styled.p`
  ${({ theme }) => theme.typography.body.XS2};
  color: ${({ theme }) => theme.colors.grayScale["11"]};
  white-space: nowrap;
`;

// ─── 모바일 햄버거 + 드로어 ──────────────────────────────────────────────

export const MobileMenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;

  @media (min-width: ${TABLET}) {
    display: none;
  }
`;

export const HamburgerIcon = styled.span`
  display: inline-block;
  position: relative;
  width: 22px;
  height: 16px;

  &::before,
  &::after,
  & > i {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.grayScale["00"]};
    border-radius: 2px;
  }
  &::before { top: 0; }
  & > i { top: 7px; display: block; }
  &::after { bottom: 0; }
`;

export const Drawer = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  background: #fff;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale["08"]};
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  padding: 12px 20px 18px;
  z-index: 99;
  max-height: calc(100dvh - 64px);
  overflow-y: auto;
  overscroll-behavior: contain;
  transform: translateY(${({ $open }) => ($open ? "0" : "-110%")});
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: transform 0.2s ease, opacity 0.2s ease, visibility 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (min-width: ${TABLET}) {
    display: none;
  }
`;

export const DrawerItem = styled.button<{ $active: boolean }>`
  display: block;
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  padding: 12px 4px;
  ${({ theme }) => theme.typography.body.L1};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary["00"] : theme.colors.grayScale["00"]};
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale["09"] ?? "#eef0fa"};

  &:last-child {
    border-bottom: none;
  }
`;

export const DrawerSubItem = styled(DrawerItem)`
  padding-left: 16px;
  ${({ theme }) => theme.typography.body.M0};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grayScale["03"]};
`;

export { MOBILE, TABLET };
