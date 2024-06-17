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
  const profilePicture=auth.user ? auth.user.image : '';
  console.log(profilePicture);

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
                  
                  {auth.user ? (
                    <>
                      <li className="mx-3 relative">
                        <button
                          onClick={toggleDropdown}
                          className="flex items-center text-gray-800 hover:text-blue-500 focus:outline-none"
                        >
                          Hello, {userName}
                          <img src={profilePicture} alt="Profile Image" className="rounded-full h-10 w-10 object-cover ml-2" />
                          <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
                        </button>
                        {isDropdownOpen && (
                          <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                            <li className="my-2">
                              <Link href="/accounts" className="block px-4 py-2 text-gray-800 hover:text-blue-500">
                                Account
                              </Link>
                            </li>
                            <li className="my-2">
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
      <footer className="bg-gray-800 text-white py-8 bottom-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-blue-500">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-blue-500">Contact Us</Link></li>
                <li><Link href="/terms" className="hover:text-blue-500">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-blue-500">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><Link href="/services" className="hover:text-blue-500">All Services</Link></li>
                <li><Link href="/services/beauty" className="hover:text-blue-500">Beauty Services</Link></li>
                <li><Link href="/services/home" className="hover:text-blue-500">Home Services</Link></li>
                <li><Link href="/services/health" className="hover:text-blue-500">Health Services</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><Link href="/blog" className="hover:text-blue-500">Blog</Link></li>
                <li><Link href="/forum" className="hover:text-blue-500">Forum</Link></li>
                <li><Link href="/newsletter" className="hover:text-blue-500">Newsletter</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <ul className="flex space-x-4">
                <li><Link href="#" className="hover:text-blue-500"><FontAwesomeIcon icon={faFacebook} /></Link></li>
                <li><Link href="#" className="hover:text-blue-500"><FontAwesomeIcon icon={faTwitter} /></Link></li>
                <li><Link href="#" className="hover:text-blue-500"><FontAwesomeIcon icon={faInstagram} /></Link></li>
              </ul>
            </div>
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
