import * as S from "@/components/common/Header.styles";
import Logo from "@/components/common/Logo";
import ArrowRight from "@/assets/icons/arrow_right.svg?react";
import CIRCLE_USER from "@/assets/icons/circle_user.svg?react";
import { NAV_LIST } from "@/constants/header/NAV_LIST";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavPopUp from "./NavPopUp";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const { isAuthenticated } = useAuth();
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 경로가 바뀌면 드로어와 드롭다운 닫기
  useEffect(() => {
    setIsDrawerOpen(false);
    setOpenDropdownId(null);
  }, [location.pathname]);

  const handleNavClick = (id: number, path: string, hasSubList: boolean) => {
    if (hasSubList) {
      setOpenDropdownId((prev) => (prev === id ? null : id));
    } else {
      navigate(path);
      setOpenDropdownId(null);
    }
  };

  const handleDrawerItemClick = (path: string) => {
    navigate(path);
    setIsDrawerOpen(false);
  };

  const isTabActive = (path: string, subList?: { path: string }[]) => {
    if (location.pathname === path) return true;
    if (subList) {
      return subList.some((sub) => location.pathname === sub.path);
    }
    return location.pathname.startsWith(path) && path !== "/";
  };

  return (
    <>
      <S.HeaderContainer>
        <S.LogoNavWrapper>
          <Link to="/">
            <Logo width={120} />
          </Link>
          <S.NavBox>
            {NAV_LIST.map((item) => {
              const active = isTabActive(item.path, item.sub_list);
              return (
                <S.NavItemWrapper key={item.id}>
                  <S.NavTitle
                    type="button"
                    $activeTab={active}
                    onClick={() =>
                      handleNavClick(item.id, item.path, !!item.sub_list)
                    }
                  >
                    {item.title}
                  </S.NavTitle>
                  {item.sub_list && openDropdownId === item.id && (
                    <S.PopupPositioner>
                      <NavPopUp
                        sub_list={item.sub_list}
                        onClose={() => setOpenDropdownId(null)}
                      />
                    </S.PopupPositioner>
                  )}
                </S.NavItemWrapper>
              );
            })}
          </S.NavBox>
        </S.LogoNavWrapper>

        <S.LoggedInContainer>
          {isAuthenticated ? (
            <>
              {/* 데스크탑 전용 CTA — 모바일에선 햄버거 안으로 이동 */}
              <S.DesktopOnlyCta
                onClick={() => navigate("/onboard")}
              >
                <S.LoggedInBox>
                  <S.LoggedInTitle>생기부 올리기</S.LoggedInTitle>
                  <ArrowRight width={16} height={16} stroke="#F0F0F3" />
                </S.LoggedInBox>
              </S.DesktopOnlyCta>
              <S.LineColumn />
              <S.DesktopUserButton
                aria-label="마이페이지"
                onClick={() => navigate("/mypage")}
              >
                <CIRCLE_USER width={24} height={24} />
              </S.DesktopUserButton>
              <S.MobileUserButton
                aria-label="마이페이지"
                onClick={() => navigate("/mypage")}
              >
                <CIRCLE_USER width={26} height={26} />
              </S.MobileUserButton>
            </>
          ) : (
            <S.DesktopOnlyCta onClick={() => navigate("/auth")}>
              <S.LoggedInBox>
                <S.LoggedInTitle>시작하기</S.LoggedInTitle>
                <ArrowRight width={16} height={16} stroke="#F0F0F3" />
              </S.LoggedInBox>
            </S.DesktopOnlyCta>
          )}
          <S.MobileMenuButton
            aria-label="메뉴 열기"
            onClick={() => setIsDrawerOpen((v) => !v)}
          >
            <S.HamburgerIcon>
              <i />
            </S.HamburgerIcon>
          </S.MobileMenuButton>
        </S.LoggedInContainer>
      </S.HeaderContainer>

      <S.Drawer $open={isDrawerOpen} aria-hidden={!isDrawerOpen}>
        {isAuthenticated && (
          <S.DrawerItem
            $active={location.pathname === "/onboard"}
            onClick={() => handleDrawerItemClick("/onboard")}
            style={{ color: "var(--primary)" }}
          >
            ＋ 생기부 올리기
          </S.DrawerItem>
        )}
        {!isAuthenticated && (
          <S.DrawerItem
            $active={location.pathname === "/auth"}
            onClick={() => handleDrawerItemClick("/auth")}
          >
            로그인 / 회원가입
          </S.DrawerItem>
        )}
        {NAV_LIST.map((item) => {
          const active = isTabActive(item.path, item.sub_list);
          return (
            <div key={item.id}>
              <S.DrawerItem
                $active={active}
                onClick={() => handleDrawerItemClick(item.path)}
              >
                {item.title}
              </S.DrawerItem>
              {item.sub_list?.map((sub) => (
                <S.DrawerSubItem
                  key={sub.path}
                  $active={location.pathname === sub.path}
                  onClick={() => handleDrawerItemClick(sub.path)}
                >
                  ㄴ {sub.title}
                </S.DrawerSubItem>
              ))}
            </div>
          );
        })}
      </S.Drawer>
    </>
  );
}
