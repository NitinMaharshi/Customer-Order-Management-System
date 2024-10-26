// import '../../globals.css';
import { useEffect, useState } from 'react';
// import '../../assets/scss/_sidebar.scss';
import useWidth from '../../ThemeConfig/userWidth';
import Header from './Navbar/Header';
import Footer from './Footer/Footer';
import Sidebar from './Navbar/Sidebar';

export default function Layout({ children }) {
  const { width, breakpoints } = useWidth();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [menuCollapsed, setMenuCollapsed] = useState(false);


  return (
    <>
      <Header menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} mobileMenu={mobileMenu} setMobileMenu={setMobileMenu}
        className={width >= breakpoints.lg ? menuCollapsed ? 'ml-[72px] z-10' : 'ml-[250px] z-10 transition-all' : ''} />
      {(width >= breakpoints.lg || mobileMenu) && (
        <Sidebar
          menuCollapsed={menuCollapsed}
          setMenuCollapsed={setMenuCollapsed}
          mobileMenu={mobileMenu}
          setMobileMenu={setMobileMenu}
        />
      )}
      <main className={width >= breakpoints.lg ? menuCollapsed ? 'ml-[72px]' : 'ml-[250px] transition-all' : ''}>
        <div className="pt-4 px-5 page-min-height">
          {children}
        </div>
      </main>
      {width > breakpoints.md && (
        <Footer className={width >= breakpoints.lg ? menuCollapsed ? 'ml-[72px]' : 'ml-[250px] transition-all' : ''} />
      )}

    </>
  );
}
