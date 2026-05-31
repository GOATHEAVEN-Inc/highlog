import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RouteFallback from "@/components/common/RouteFallback";

const Home = lazy(() => import("@/pages/home"));
const AuthPage = lazy(() => import("@/pages/authPage"));
const FindPasswordPage = lazy(() => import("@/pages/authPage/findPasswordPage"));
const Guide = lazy(() => import("@/pages/guide"));
const CreateQuestions = lazy(
  () => import("@/pages/interviewQuestions/createQuestions"),
);
const LoadingQuestions = lazy(
  () => import("@/pages/interviewQuestions/loadingQuestions"),
);
const ShowQuestions = lazy(
  () => import("@/pages/interviewQuestions/showQuestions"),
);
const SaveQuestions = lazy(
  () => import("@/pages/interviewQuestions/saveQuestions"),
);
const InterviewPractice = lazy(() => import("@/pages/interviewPractice"));
const InterviewStorage = lazy(
  () => import("@/pages/interviewPractice/storage"),
);
const InterviewResult = lazy(
  () => import("@/pages/interviewPractice/interviewResult"),
);
const MyPage = lazy(() => import("@/pages/myPage"));
const WithdrawAccountPage = lazy(() => import("@/pages/myPage/withdraw"));
const Support = lazy(() => import("@/pages/support"));
const SupportDetail = lazy(() => import("@/pages/support/detail"));
const Privacy = lazy(() => import("@/pages/privacy"));
const Term = lazy(() => import("@/pages/term"));
const RecordManagement = lazy(() => import("@/pages/recordManagement"));
const RecordUpload = lazy(() => import("@/pages/recordManagement/upload"));
const RecordDetail = lazy(() => import("@/pages/recordManagement/detail"));
const QuestionsList = lazy(
  () => import("@/pages/recordManagement/detail/questionsList"),
);
const Faq = lazy(() => import("@/pages/faq"));
const Onboard = lazy(() => import("@/pages/onboard"));
const QnaPage = lazy(() => import("@/pages/qna"));
const QnaStoragePage = lazy(() => import("@/pages/qna/storage"));

const withSuspense = (node: React.ReactNode) => (
  <Suspense fallback={<RouteFallback />}>{node}</Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: withSuspense(<Home />) },
      { path: "/privacy", element: withSuspense(<Privacy />) },
      { path: "/term", element: withSuspense(<Term />) },
      { path: "onboard", element: withSuspense(<Onboard />) },
      { path: "auth", element: withSuspense(<AuthPage />) },
      {
        path: "auth/find-password",
        element: withSuspense(<FindPasswordPage />),
      },
      { path: "guide", element: withSuspense(<Guide />) },
      { path: "qna", element: withSuspense(<QnaPage />) },
      { path: "qna/storage", element: withSuspense(<QnaStoragePage />) },
      { path: "question", element: withSuspense(<CreateQuestions />) },
      { path: "question/loading", element: withSuspense(<LoadingQuestions />) },
      { path: "question/show", element: withSuspense(<ShowQuestions />) },
      { path: "question/storage", element: withSuspense(<SaveQuestions />) },
      {
        path: "interview/practice",
        element: (
          <ProtectedRoute>
            {withSuspense(<InterviewPractice />)}
          </ProtectedRoute>
        ),
      },
      {
        path: "interview/practice/storage",
        element: (
          <ProtectedRoute>
            {withSuspense(<InterviewStorage />)}
          </ProtectedRoute>
        ),
      },
      {
        path: "interview/result/:sessionId",
        element: withSuspense(<InterviewResult />),
      },
      {
        path: "record_management",
        element: (
          <ProtectedRoute redirectPath="/onboard">
            {withSuspense(<RecordManagement />)}
          </ProtectedRoute>
        ),
      },
      {
        path: "record_management/upload",
        element: (
          <ProtectedRoute redirectPath="/onboard">
            {withSuspense(<RecordUpload />)}
          </ProtectedRoute>
        ),
      },
      {
        path: "record_management/:id",
        element: (
          <ProtectedRoute redirectPath="/onboard">
            {withSuspense(<RecordDetail />)}
          </ProtectedRoute>
        ),
      },
      {
        path: "record_detail/:id/question_list",
        element: withSuspense(<QuestionsList />),
      },
      {
        path: "mypage",
        element: (
          <ProtectedRoute>{withSuspense(<MyPage />)}</ProtectedRoute>
        ),
      },
      {
        path: "mypage/withdraw",
        element: (
          <ProtectedRoute>
            {withSuspense(<WithdrawAccountPage />)}
          </ProtectedRoute>
        ),
      },
      { path: "support", element: withSuspense(<Support />) },
      { path: "support/:id", element: withSuspense(<SupportDetail />) },
      { path: "faq", element: withSuspense(<Faq />) },
    ],
  },
]);

export default router;
