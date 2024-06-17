// SidebarLayout.js
import React from 'react';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faTools, faUsers, faCog } from '@fortawesome/free-solid-svg-icons';

const SidebarLayout = ({ children, selectedLink }) => {
  return (
    <div className="flex">
        <div className='sticky top-0'>
            
      <aside className="hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0 border-r border-gray-200 sticky top-0">
        <div className="py-6 text-gray-500 dark:text-gray-400">
          <a href="#" className="ml-8 text-lg font-bold text-gray-800 dark:text-gray-200">fursaApp</a>
          <ul className="mt-8">
            <li>
              <Link href="/service/dashboard" className={`relative px-6 py-3 transition-colors duration-150 inline-flex items-center w-full text-sm font-semibold text-gray-800 dark:text-gray-100 ${selectedLink === 'dashboard' ? 'bg-purple-500' : 'hover:bg-purple-100 dark:hover:bg-gray-700'}`}>
                <FontAwesomeIcon icon={faTachometerAlt} className="mr-4" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/service/services" className={`relative px-6 py-3 transition-colors duration-150 inline-flex items-center w-full text-sm font-semibold text-gray-800 dark:text-gray-100 ${selectedLink === 'services' ? 'bg-purple-500' : 'hover:bg-purple-100 dark:hover:bg-gray-700'}`}>
                <FontAwesomeIcon icon={faTools} className="mr-4" />
                <span>Services</span>
              </Link>
            </li>
            <li>
              <Link href="/service/clients" className={`relative px-6 py-3 transition-colors duration-150 inline-flex items-center w-full text-sm font-semibold text-gray-800 dark:text-gray-100 ${selectedLink === 'clients' ? 'bg-purple-500' : 'hover:bg-purple-100 dark:hover:bg-gray-700'}`}>
                <FontAwesomeIcon icon={faUsers} className="mr-4" />
                <span>Clients</span>
              </Link>
            </li>
            <li>
              <Link href="/service/settings" className={`relative px-6 py-3 transition-colors duration-150 inline-flex items-center w-full text-sm font-semibold text-gray-800 dark:text-gray-100 ${selectedLink === 'settings' ? 'bg-purple-500' : 'hover:bg-purple-100 dark:hover:bg-gray-700'}`}>
                <FontAwesomeIcon icon={faCog} className="mr-4" />
                <span>Settings</span>
              </Link>
            </li>
            
              {/*
              <li><Link href="/service/chats" className={`relative px-6 py-3 transition-colors duration-150 inline-flex items-center w-full text-sm font-semibold text-gray-800 dark:text-gray-100 ${selectedLink === 'settings' ? 'bg-purple-500' : 'hover:bg-purple-100 dark:hover:bg-gray-700'}`}>
                <FontAwesomeIcon icon={faCog} className="mr-4" />
                <span>Chats</span>
              </Link>
            </li>
  */}
          </ul>
        </div>
      </aside>

        </div>
      {/* Render the children components */}
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
