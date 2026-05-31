# 라우팅 가이드 (Routing Guide)

이 프로젝트는 페이지 탐색을 위해 React Router v7을 사용합니다. 이 문서는 라우터 설정 방법과 새 경로를 추가하는 방법, 그리고 현재 등록된 경로 목록에 대해 설명합니다.

## 라우터 설정 (Router Setup)

라우터는 `src/router/Router.tsx`에 설정되어 있습니다. `createBrowserRouter`를 사용하여 경로 트리를 생성합니다.

- 최상위에는 온보딩 페이지(`/onboard`)와 메인 레이아웃(`<App />`) 두 가지가 있습니다.
- `<App />` 하위 경로는 공통 헤더/푸터를 사용하며, 인증이 필요한 경로는 `<ProtectedRoute>`로 감싸 보호합니다.

```tsx
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Onboard from "@/pages/onboard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
// ... other imports

const router = createBrowserRouter([
  { path: "/onboard", element: <Onboard /> },
  {
    path: "/",
    element: <App />,
    children: [
      // 공개 라우트
      // 보호 라우트는 <ProtectedRoute>로 감쌈
    ],
  },
]);
```

## 보호 라우트 (`<ProtectedRoute>`)

`src/components/auth/ProtectedRoute.tsx`는 인증되지 않은 사용자를 다른 경로로 리다이렉트합니다.

- 기본 리다이렉트 경로: `/auth`
- `redirectPath` prop으로 변경 가능 (예: 생기부 관련 페이지는 `/onboard`로 보내 온보딩 유도)

```tsx
<ProtectedRoute redirectPath="/onboard">
  <RecordManagement />
</ProtectedRoute>
```

## 현재 등록된 라우트

| 경로 | 컴포넌트 | 보호 | 비고 |
| --- | --- | --- | --- |
| `/onboard` | `Onboard` | ❌ | 최초 진입 가이드 (5단계) |
| `/` | `Home` | ❌ | 메인 |
| `/auth` | `AuthPage` | ❌ | 로그인/회원가입 |
| `/auth/find-password` | `FindPasswordPage` | ❌ | 이메일 인증 → 비밀번호 재설정 |
| `/guide` | `Guide` | ❌ | 사용 가이드 |
| `/privacy`, `/term` | `Privacy`, `Term` | ❌ | 약관/개인정보처리방침 |
| `/question`, `/question/loading`, `/question/show`, `/question/storage` | 질문 생성 플로우 | ❌ | 생기부 → 예상 질문 생성 |
| `/interview/practice` | `InterviewPractice` | ✅ | 텍스트/음성 면접 연습 |
| `/interview/practice/storage` | `InterviewStorage` | ✅ | 면접 기록 보관함 |
| `/interview/result/:sessionId` | `InterviewResult` | ❌ | 면접 결과 분석 |
| `/record_management` | `RecordManagement` | ✅ (→ `/onboard`) | 생기부 목록 |
| `/record_management/upload` | `RecordUpload` | ✅ (→ `/onboard`) | 생기부 업로드 |
| `/record_management/:id` | `RecordDetail` | ✅ (→ `/onboard`) | 생기부 상세 |
| `/record_detail/:id/question_list` | `QuestionsList` | ❌ | 생기부별 질문 목록 |
| `/mypage`, `/mypage/withdraw` | `MyPage`, `WithdrawAccountPage` | ✅ | 마이페이지/회원탈퇴 |
| `/support`, `/support/:id` | `Support`, `SupportDetail` | ❌ | 공지사항 |
| `/faq` | `Faq` | ❌ | 자주 묻는 질문 |

## 새 경로 추가하기

1. **페이지 컴포넌트 생성**: `src/pages` 하위에 폴더와 `index.tsx`(필요 시 `*.styles.ts`)를 추가합니다.
2. **라우터 등록**: `src/router/Router.tsx`에서 페이지를 import하고, 적절한 위치에 경로 객체를 추가합니다.
3. **보호 여부 결정**: 인증이 필요한 페이지는 `<ProtectedRoute>`로 감쌉니다. 비인증 사용자를 온보딩으로 보내려면 `redirectPath="/onboard"`를 추가합니다.

```tsx
{
  path: "new-page",
  element: (
    <ProtectedRoute>
      <NewPage />
    </ProtectedRoute>
  ),
},
```

## 페이지 구조

모든 페이지 컴포넌트는 `src/pages` 하위에 자체 폴더를 가지며, `index.tsx`와 함께 같은 폴더의 `*.styles.ts`로 스타일을 분리합니다.

```
src/pages/
├── home/
│   ├── index.tsx
│   └── Home.styles.ts
├── onboard/
│   ├── index.tsx
│   └── Onboard.styles.ts
└── recordManagement/
    ├── index.tsx
    ├── upload/
    └── detail/
```
