// ServiceProvider.js
import React from 'react';
import Dashboard from '../Admin/Service/Dashboard';
import Services from '../Admin/Service/Services';
import Clients from '../Admin/Service/Clients';
import Settings from '../Admin/Service/Settings';
import SidebarLayout from '../../Layouts/Admin/SidebarLayout';

const ServiceProvider = ({ auth }) => {
  return (
    <SidebarLayout>
      {/* Render the appropriate component based on the URL */}
      {url().pathname === '/service/dashboard' && <Dashboard />}
      {url().pathname === '/service/services' && <Services />}
      {url().pathname === '/service/clients' && <Clients />}
      {url().pathname === '/service/settings' && <Settings />}
    </SidebarLayout>
  );
};

export default ServiceProvider;
