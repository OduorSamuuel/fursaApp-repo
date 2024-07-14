import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import logo from '../../../public/Images/logo-no-background.png';

const Layout = ({ auth, children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    Inertia.post(route('logout'));
  };

  const userName = auth.user ? auth.user.name.split(' ')[0] : '';

  return (
    <>
      <div className="">
        <nav className="bg-white shadow-md sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="">
                <img src={logo} alt="product image" className="w-full h-9" />
              </Link>
              <div className="flex items-center">
                <ul className="hidden lg:flex items-center space-x-4">
                  <li>
                    <Link href="/about" className="text-gray-800 hover:text-blue-500">About</Link>
                  </li>
                  <li>
                    <Link href="/services" className="text-gray-800 hover:text-blue-500">Services</Link>
                  </li>
                  {auth.user ? (
                    <li className="relative">
                      <button
                        onClick={toggleDropdown}
                        className="flex items-center text-gray-800 hover:text-blue-500 focus:outline-none"
                      >
                        Hello, {userName}
                        <img
                          src={auth.user && auth.user.image ? `/${auth.user.image}` : '/Images/avatar.jpeg'}
                          alt="Profile"
                          className="rounded-full h-10 w-10 object-cover ml-2"
                        />
                        <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
                      </button>
                      {isDropdownOpen && (
                        <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                          <li>
                            <Link href="/accounts" className="block px-4 py-2 text-gray-800 hover:text-blue-500">
                              Account
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={handleLogout}
                              className="block w-full text-left px-4 py-2 text-gray-800 hover:text-blue-500"
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                      )}
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link href={route('login')} className="text-blue-500 hover:text-gray-700 px-3 py-2 rounded-md">Login</Link>
                      </li>
                      <li>
                        <Link href="/register" className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md border border-blue-500">Register</Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <div className="block lg:hidden">
                <button onClick={toggleMenu} className="text-gray-800 hover:text-blue-500 focus:outline-none">
                  <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white bg-opacity-75 rounded-md shadow-lg z-20">
              <ul className="flex flex-col items-center">
                <li>
                  <Link href="/about" className="text-gray-800 hover:text-blue-500 px-4 py-2" onClick={toggleMenu}>About</Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-800 hover:text-blue-500 px-4 py-2" onClick={toggleMenu}>Services</Link>
                </li>
                {auth.user ? (
                  <>
                    <li>
                      <Link href='/chat' className="text-gray-800 hover:text-blue-500 px-4 py-2" onClick={toggleMenu}>Chats</Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:text-blue-500"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link href={route('login')} className="text-blue-500 hover:text-gray-70000 px-4 py-2 rounded-md" onClick={toggleMenu}>Login</Link>
                    </li>
                    <li>
                      <Link href="/register" className="text-gray-800 hover:text-blue-500 px-4 py-2 rounded-md border border-blue-500" onClick={toggleMenu}>Register</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </nav>

        {/* Email not verified message */}
        {auth.user && !auth.user.is_verified && (
          <div className="bg-yellow-200 p-4 text-center">
            <p className="text-yellow-800">
              Your email is not verified. Please check your inbox and verify your email address.
            </p>
          </div>
        )}

        {children}
      </div>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Footer content */}
          </div>
          <div className="text-center mt-8">
            <p>&copy; 2024 FursaApp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
