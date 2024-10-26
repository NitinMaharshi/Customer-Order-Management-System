import React, { useContext, useState } from 'react';
import { doLogout } from '../../Authorisation';
import { useNavigate } from 'react-router-dom';
import { CheckLoginContext } from '../../Contexts/Login/CheckLoginContext';

const CustomerLayout = ({ children }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { setGlobalBoolean } = useContext(CheckLoginContext);
    const navigate = useNavigate()

    const handleLogout = () => {
        doLogout();
        setTimeout(() => {
            navigate('/login');
            setGlobalBoolean(prev => !prev)
        }, 100);
    };

    return (
        <>
            <header className="sticky top-0 z-50 bg-white shadow-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <span className="font-semibold text-xl">MyCompany</span>
                    </div>

                    {/* Menu Items */}
                    <nav className="space-x-8 hidden md:flex">
                        <a href="/" className="text-gray-700 hover:text-blue-600">
                            Home
                        </a>
                        <a href="/my-order" className="text-gray-700 hover:text-blue-600">
                            Orders
                        </a>
                    </nav>

                    {/* User Menu */}
                    <div className="relative">
                        <button
                            className="flex items-center space-x-2 focus:outline-none"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <span className="text-gray-700 font-medium">User Name</span>
                            <svg
                                className="w-5 h-5 text-gray-700"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {/* Dropdown */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                                <button
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main>
                {children}
            </main>
        </>
    );
};

export default CustomerLayout;
