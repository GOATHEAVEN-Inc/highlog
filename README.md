# high-log

AI 기반 대학입시 면접 준비 서비스

## 1. 서비스 개요

### 1.1 서비스 명

AI 기반 대학입시 면접 준비 서비스

### 1.2 서비스 목적

생활기록부(생기부)를 기반으로 맞춤형 면접 예상 질문을 생성하고 AI와 실전 면접 연습을 통해 대학입시 면접을 효과적으로 준비할 수 있도록 지원

### 1.3 서비스 특장점

- **시공간 제약 없는 면접 연습**: 텍스트/음성 모드 지원으로 언제 어디서나 면접 준비 가능
- **개인 맞춤형 질문 생성**: 생기부 분석을 통한 실전형 예상 질문 자동 생성
- **세분화된 면접 연습**: 면접 유형별(종합/교과/학교자체), 평가 요소별(인성/전공적합성/교직적성) 맞춤 연습
- **체계적인 피드백**: 종합 결과 및 상세 분석 제공

### 1.4 주요 기능

- **온보딩** (`/onboard`): 신규 사용자 안내 플로우
- **인증** (`/auth`, `/auth/find-password`): 이메일 인증 기반 회원가입/로그인/비밀번호 재설정
- **생기부 관리** (`/record_management`): 업로드, 상세 조회, 벡터화 진행률 SSE
- **질문 생성** (`/question/*`): 생기부 기반 예상 질문 SSE 스트리밍
- **면접 연습** (`/interview/practice`): 텍스트/음성 모드, 실시간 SSE 챗
- **결과 분석** (`/interview/result/:sessionId`): 평가 요소별 점수 및 피드백
- **마이페이지** (`/mypage`, `/mypage/withdraw`): 비밀번호 변경, 회원 탈퇴
- **공지/FAQ** (`/support`, `/faq`): 운영 콘텐츠

## 2. Getting Started

### 2.1. Installation

```bash
git clone https://github.com/mhojune/high-log.git
cd high-log
npm install
```

### 2.2. 환경 변수

루트에 `.env` 파일을 생성하고 백엔드 API 주소를 지정합니다.

```bash
VITE_API_URL=https://onedaypocket.shop
```

### 2.3. Running the application

```bash
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # 타입 체크 + 프로덕션 빌드
npm run lint     # ESLint
npm run preview  # 빌드 결과 미리보기
```

### 2.4. Git hooks

`husky` + `lint-staged`로 커밋/푸시 시점에 자동 검증이 실행됩니다.

- **pre-commit**: 스테이지된 `.ts/.tsx/.js/.jsx` 파일에 ESLint --fix 적용
- **pre-push**: `npm run build`로 타입체크와 빌드를 함께 검증

## 3. Documentation

- [Styling Guide](./docs/styling.md)
- [Routing Guide](./docs/routing.md)
- [Components Guide](./docs/components.md)
- [Auth & API Guide](./docs/auth-and-api.md)