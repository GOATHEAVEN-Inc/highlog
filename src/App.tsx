import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BottomNav from '@/components/common/BottomNav';
import { BottomSpacer } from '@/components/common/BottomNav.styles';
import ScrollToTop from '@/hooks/ScrollToTop';
import { AuthProvider } from '@/contexts/AuthContext';

const App = () => {
  const { pathname } = useLocation();
  // 인증/온보딩은 집중 흐름 — 푸터·하단 nav 숨김. 단 공용 헤더는 유지해 사이트 일체감 확보.
  const hideFooter = pathname.startsWith('/auth') || pathname.startsWith('/onboard');
  const hideBottomNav = pathname.startsWith('/auth') || pathname.startsWith('/onboard');

  return (
    <AuthProvider>
      <ScrollToTop />
      <Header />
      <Outlet />
      {!hideFooter && <Footer />}
      {!hideBottomNav && (
        <>
          <BottomSpacer />
          <BottomNav />
        </>
      )}
    </AuthProvider>
  );
};

export default App;
