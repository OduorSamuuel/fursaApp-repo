import SidebarLayout from '@/Layouts/Admin/SidebarLayout';
import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import '../../../../css/bootstrap.min.css';
import '../../../css/../../css/theme.min.css';
import '../../../../vendors/css/vendors.min.css';
import '../../../../vendors/css/daterangepicker.min.css';
import { Dropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faCheckCircle, faTimesCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import ProviderModal from '@/Components/ProviderModal';

function Customers() {
  const { serviceProviders } = usePage().props;
  const [selectedProvider, setSelectedProvider] = useState(null);

  const handleViewProvider = (provider) => {
    setSelectedProvider(provider);
  };

  const handleCloseModal = () => {
    setSelectedProvider(null);
  };

  const handleSaveProvider = (editedProvider) => {
    // Implement logic to save edited provider details
    console.log('Saving edited provider:', editedProvider);
    // Replace with actual logic to update provider details
  };

  const handleDeleteProvider = (providerId) => {
    // Implement logic to delete provider
    console.log('Deleting provider with ID:', providerId);
    // Replace with actual logic to delete provider
  };

  return (
   
    <SidebarLayout>
      <main className="nxl-container">
        <div className="nxl-content">
          <div className="card-body custom-card-action p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0 table-striped" style={{ minWidth: '100%' }}>
                <thead>
                  <tr className="border-b">
                    <th scope="col">Provider</th>
                    <th scope="col">Email</th>
                    <th scope="col">Verified</th>
                    <th scope="col">Approved</th>
                    <th scope="col">Service Type</th>
                    <th scope="col">County</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceProviders.map((provider) => (
                    <tr key={provider.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <div className="avatar-image">
                            <img src={provider.user_details.image ? `/${provider.user_details.image}` : '/default-avatar.png'} alt="" className="img-fluid rounded-circle" style={{ width: '40px', height: '40px' }} />
                          </div>
                          <div>
                            <span className="d-block">{provider.user_details.name}</span>
                            <span className="fs-12 d-block fw-normal text-muted">{provider.user_details.username}</span>
                          </div>
                        </div>
                      </td>
                      <td>{provider.user_details.email}</td>
                      <td>
                        <span className={`badge ${provider.user_details.is_verified ? 'bg-soft-success text-success' : 'bg-soft-danger text-danger'}`}>
                          <FontAwesomeIcon icon={provider.user_details.is_verified ? faCheckCircle : faTimesCircle} className="me-1" />
                          {provider.user_details.is_verified ? 'Verified' : 'Not Verified'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${provider.is_approved ? 'bg-soft-success text-success' : 'bg-soft-danger text-danger'}`}>
                          {provider.is_approved ? 'Approved' : 'Pending'}
                        </span>
                      </td>
                      <td>{provider.service_type}</td>
                      <td>{provider.county.name}</td>
                      <td className="text-end">
                        <Dropdown>
                          <Dropdown.Toggle variant="link" id="dropdown-basic">
                            <FontAwesomeIcon icon={faEllipsisV} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleViewProvider(provider)}>Edit</Dropdown.Item>
                            <Dropdown.Item>Delete</Dropdown.Item>
                            {/* Add more actions as needed */}
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      {selectedProvider && (
        <ProviderModal
          provider={selectedProvider}
          onClose={handleCloseModal}
          onSave={handleSaveProvider}
          onDelete={handleDeleteProvider}
        />
      )}
    </SidebarLayout>
  );
}

export default Customers;
