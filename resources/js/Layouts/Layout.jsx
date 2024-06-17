import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../public/Images/logo-no-background.png';

const Layout = ({ auth, children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
                <ul className="hidden lg:flex items-center">
                  <li className="mx-3">
                    <Link href="/about" className="text-gray-800 hover:text-blue-500">About</Link>
                  </li>
                  <li className="mx-3">
                    <Link href="/appointments" className="text-gray-800 hover:text-blue-500">Appointments</Link>
                  </li>
                  <li className="mx-3">
                    <Link href="/services" className="text-gray-800 hover:text-blue-500">Services</Link>
                  </li>
                  {auth.user ? (
                    <>
                      <li className="mx-3">
                        <Link href="/chat" className="text-gray-800 hover:text-blue-500">Chats</Link>
                      </li>
                      <li>
                        <Link as="button" method="post" href={route('logout')}>
                          Logout
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="mx-3">
                        <Link href={route('login')} className="text-gray-800 hover:text-blue-500">Login</Link>
                      </li>
                      <li className="mx-3">
                        <Link href="/choice" className="text-gray-800 hover:text-blue-500">Register</Link>
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
                <li className="my-2">
                  <Link href="/about" className="text-gray-800 hover:text-blue-500" onClick={toggleMenu}>About</Link>
                </li>
                <li className="my-2">
                  <Link href="/appointments" className="text-gray-800 hover:text-blue-500" onClick={toggleMenu}>Appointments</Link>
                </li>
                <li className="my-2">
                  <Link href="/services" className="text-gray-800 hover:text-blue-500" onClick={toggleMenu}>Services</Link>
                </li>
                {auth.user ? (
                  <>
                    <li className="my-2">
                      <Link href='/chat' className="text-gray-800 hover:text-blue-500" onClick={toggleMenu}>Chats</Link>
                    </li>
                    <li className="my-2">
                      <Link as="button" method="post" href={route('logout')} className="text-gray-800 hover:text-blue-500" onClick={toggleMenu}>
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="my-2">
                      <Link href={route('login')} className="text-gray-800 hover:text-blue-500" onClick={toggleMenu}>Login</Link>
                    </li>
                    <li className="my-2">
                      <Link href="/choice" className="text-gray-800 hover:text-blue-500" onClick={toggleMenu}>Register</Link>
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
    </>
  );
};

export default Layout;
