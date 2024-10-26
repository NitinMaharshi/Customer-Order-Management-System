import { useState } from 'react';
import { BsX } from 'react-icons/bs';
import { Link } from 'react-router-dom';

// import logo from '../../../public/img/login/login-logo.png';

import SidebarMenuItems from './SidebarMenuItems';
import useWidth from '../../../ThemeConfig/userWidth';

const Sidebar = ({ menuCollapsed, mobileMenu, setMobileMenu }) => {
  const { width, breakpoints } = useWidth();
  const [menuHover, setMenuHover] = useState(false);

  return (
    <div>
      <div
        className={`sidebar-wrapper w-[250px] bg-primary-700 dark:bg-slate-800 shadow-base ${menuCollapsed ? 'w-[72px] close_sidebar' : 'w-[250px]'
          } 
      ${menuHover ? 'sidebar-hovered' : ''}`}
        onMouseEnter={() => {
          setMenuHover(true);
        }}
        onMouseLeave={() => {
          setMenuHover(false);
        }}
      >
        <div className={'flex justify-between lg:justify-center items-center z-[9] px-4 pt-2 border-none'}>
          <Link to="/">
            <div className="flex items-center space-x-4 text-white font-extrabold">
              {/* <div className="logo-icon min-h-12 flex justify-center items-center">
                <Image src={logo} alt="logo" height={50} />
              </div> */}
              Logo
            </div>
          </Link>

          {width < breakpoints.lg && (
            <div
              className="cursor-pointer"
              onClick={() => {
                setMobileMenu(!mobileMenu);
              }}
            >
              <BsX size={22} color="#fff" />
            </div>
          )}
        </div>
        <div className="px-4 py-2 h-[calc(100%-80px)] overflow-y-auto overflow-x-hidden">
          <ul className='h-full'>
            <SidebarMenuItems collapsed={menuCollapsed} menuHover={menuHover} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
