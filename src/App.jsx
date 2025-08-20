import { Outlet, useLocation } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import useIsMobile from './hook/useIsMobile';
import ScrollToTop from './hook/useScrollTop';

function App() {
  const isMobile = useIsMobile();
  const location = useLocation();

  // 데스크톱 화면에서 푸터가 필요한 페이지 경로 목록
  const desktopFooterPages = ['/'];

  const showDesktopFooter = !isMobile && desktopFooterPages.includes(location.pathname);
  const showMobileFooter = isMobile;

  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      {(showDesktopFooter || showMobileFooter) && <Footer />}
    </>
  );
}

export default App;