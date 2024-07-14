import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

const TopBar = ({ children }) => {
  const { auth } = usePage().props;
  console.log(auth);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSideMenu = () => setIsSideMenuOpen(!isSideMenuOpen);
  const toggleNotificationsMenu = () => setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    // Implement your theme toggling logic here
  };

  return (
    <>
      <header className={`z-10 py-4 bg-white sticky top-0 shadow-md ${darkMode ? 'dark:bg-gray-800' : ''}`}>
        <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        
          <div className="flex items-center">
            <span className="text-2xl font-bold">FursaApp</span>
          </div>

          {/* Navigation items */}
        

          <div className="flex items-center space-x-4">
            {/* Theme toggler */}
           

            {/* Notifications */}
       

            {/* Profile */}
            <div className="relative">
              <button
                className="flex items-center focus:outline-none"
                onClick={toggleProfileMenu}
                aria-label="Account"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src={ `/${auth.user.image}` || 'https://i.pravatar.cc/300'}
                  alt={auth.user.name}
                />
                <span className="ml-2">{auth.user.name}</span>
              </button>
              {isProfileMenuOpen && (
                <ul
                className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:text-gray-300 dark:border-gray-700 dark:bg-gray-700"
                onMouseLeave={() => setIsProfileMenuOpen(false)}
                onKeyDown={(e) => e.key === 'Escape' && setIsProfileMenuOpen(false)}
              >
              
                <li className="flex">
                  <Link
                    className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                    href={route('service.settings')}
                  >
                    <svg
                      className="w-4 h-4 mr-3"
                      aria-hidden="true"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 10.5h18M3 14.5h18M3 18.5h18"></path>
                    </svg>
                    <span>Settings</span>
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                method='post' 
               href={route('logout')}
                  >
                    <svg
                      className="w-4 h-4 mr-3"
                      aria-hidden="true"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17 16l4 4m0 0l-4 4m4-4H3m14 4V4m0 4H3m0-4h14"></path>
                    </svg>
                    <span>Log out</span>
                  </Link>
                </li>
                <li className="flex">
                  <Link
                    className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                    href={route('lock-screen')} 
                  >
                    <svg
                      className="w-4 h-4 mr-3"
                      aria-hidden="true"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17 16l4 4m0 0l-4 4m4-4H3m14 4V4m0 4H3m0-4h14"></path>
                    </svg>
                    <span>Lock Screen</span>
                  </Link>
                </li>
              </ul>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
            onClick={toggleSideMenu}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
      </header>
      {children}
    </>
  );
};

export default TopBar;