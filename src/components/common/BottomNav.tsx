import { useNavigate, useLocation } from "react-router-dom";
import * as S from "@/components/common/BottomNav.styles";
import FolderOpen from "@/assets/icons/folder_open.svg?react";
import FileIcon from "@/assets/icons/file.svg?react";
import Mic from "@/assets/icons/microphone.svg?react";
import Wand from "@/assets/icons/wand.svg?react";
import User from "@/assets/icons/circle_user.svg?react";
import { useAuth } from "@/contexts/AuthContext";

interface NavItemDef {
  label: string;
  path: string;
  icon: React.ComponentType<{ width?: number; height?: number }>;
  /** 활성으로 칠 추가 경로 prefix (e.g. /qna 클릭 시 /qna/storage도 같은 탭으로 표시) */
  match?: (pathname: string) => boolean;
}

// 5개 핵심 메뉴. 데스크탑 nav와 일관된 순서로 정렬.
const ITEMS: NavItemDef[] = [
  {
    label: "생기부",
    path: "/record_management",
    icon: FolderOpen,
    match: (p) => p.startsWith("/record_management"),
  },
  {
    label: "면접 질문",
    path: "/question",
    icon: FileIcon,
    match: (p) => p.startsWith("/question") && !p.startsWith("/question/storage") ? true : p === "/question",
  },
  {
    label: "면접 연습",
    path: "/interview/practice",
    icon: Mic,
    match: (p) => p.startsWith("/interview"),
  },
  {
    label: "질문 분석",
    path: "/qna",
    icon: Wand,
    match: (p) => p.startsWith("/qna"),
  },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // 마지막 슬롯은 로그인 상태에 따라 분기
  const lastItem: NavItemDef = isAuthenticated
    ? {
        label: "내 정보",
        path: "/mypage",
        icon: User,
        match: (p) => p.startsWith("/mypage"),
      }
    : {
        label: "로그인",
        path: "/auth",
        icon: User,
        match: (p) => p.startsWith("/auth"),
      };

  const allItems = [...ITEMS, lastItem];

  const isActive = (item: NavItemDef) =>
    item.match ? item.match(location.pathname) : location.pathname === item.path;

  return (
    <S.Bar aria-label="하단 메뉴">
      {allItems.map((it) => {
        const active = isActive(it);
        const Icon = it.icon;
        return (
          <S.Item
            key={it.path + it.label}
            type="button"
            $active={active}
            data-active={active}
            onClick={() => navigate(it.path)}
            aria-current={active ? "page" : undefined}
          >
            <Icon width={22} height={22} />
            <S.Label>{it.label}</S.Label>
          </S.Item>
        );
      })}
    </S.Bar>
  );
}
