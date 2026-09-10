import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import ScrollProgress from "./ScrollProgress";
import BackToTop from "./BackToTop";
import MobileCallBar from "./MobileCallBar";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <ScrollProgress />
      <Header />
      <main id="main" className="flex-1 pb-16 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <MobileCallBar />
    </div>
  );
}
