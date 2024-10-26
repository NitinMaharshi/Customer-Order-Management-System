import { useContext, useEffect, useRef, useState } from 'react';
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri';
import { BiChevronDown, BiChevronUp, BiLogInCircle, BiMenuAltRight } from 'react-icons/bi';

import { doLogout } from '../../../Authorisation/index';
import useWidth from '../../../ThemeConfig/userWidth';
import { useNavigate } from 'react-router-dom';
import { CheckLoginContext } from '../../../Contexts/Login/CheckLoginContext';

const Header = ({ className, menuCollapsed, setMenuCollapsed, mobileMenu, setMobileMenu }) => {

  const navigate = useNavigate();
  const { width, breakpoints } = useWidth();
  const dropDownRef = useRef(null);
  const { setGlobalBoolean } = useContext(CheckLoginContext);

  const [show, setShow] = useState(false);
  const [changeIcon, setChangeIcon] = useState(true);

  // <states></states>

  // close menu click on outside by useEffect
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setShow(false);
        setChangeIcon(!changeIcon)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    doLogout();
    setTimeout(() => {
      navigate('/login');
      setGlobalBoolean(prev => !prev)
    }, 100);
  };

  return (
    <header className={className + ' ' + 'sticky top-0'}>
      <div className="md:px-6 px-[15px] bg-white py-3  md:mx-0 mx-0 text-black-500 border-b border-gray-400">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center md:space-x-4 space-x-2">
            {width >= breakpoints.lg && (
              <button type="button" className="text-xl hidden text-black lg:block" onClick={() => setMenuCollapsed(!menuCollapsed)}>
                {menuCollapsed
                  ? (<RiMenuUnfoldLine size={34} />)
                  : (<RiMenuFoldLine size={34} />)}
              </button>
            )}
            {width < breakpoints.lg && (
              <div className="cursor-pointer text-2xl" onClick={() => setMobileMenu(!mobileMenu)}>
                <BiMenuAltRight />
              </div>
            )}
          </div>

          <div className="nav-tools flex items-center lg:space-x-6 space-x-3">
            <div className="relative inline-block " ref={dropDownRef}>
              <div className="block w-full">
                <div className="label-class-custom">
                  <button type="button" className="p-0 m-0" onClick={() => {
                    setShow((prev) => !prev);
                    setChangeIcon((prev) => !prev);
                  }}>
                    <div className="flex items-center gap-2">
                      <div className="flex-none text-sm font-normal items-center lg:flex hidden overflow-hidden text-ellipsis whitespace-nowrap text-black">
                        <span className="overflow-hidden text-ellipsis w-fit block font-bold">
                          {/* {`${userData?.firstName ? userData?.firstName : ''} ${userData?.lastName ? userData?.lastName : ''}`} */}
                          User Name
                        </span>
                        <span className="text-base inline-block ltr:ml-[10px] rtl:mr-[10px]">
                          {changeIcon ? <BiChevronDown /> : <BiChevronUp />}
                        </span>
                      </div>
                    </div>
                  </button>

                  {show && <div id="user-dropdown" className="absolute ltr:right-0 rtl:left-0 origin-top-right border border-slate-100 rounded shadow-lg bg-white z-[5] w-[160px] top-[145%] right-0 transform opacity-100 scale-100">
                    <div className="block">
                      <ul aria-labelledby="user-menu-button" className='text-black'>
                        <li>
                          <button className="block px-4 py-2 text-sm font-bold w-full text-left hover:bg-primary-50" onClick={handleLogout}>
                            <BiLogInCircle className="inline-block" size={18} /> Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>}

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
