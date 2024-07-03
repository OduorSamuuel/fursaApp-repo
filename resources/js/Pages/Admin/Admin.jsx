import React, { useState } from 'react'
import '../../../css/bootstrap.min.css';
import '../../../css/theme.min.css';
import '../../../vendors/css/vendors.min.css';
import '../../../vendors/css/daterangepicker.min.css';
import SidebarLayout from '@/Layouts/Admin/SidebarLayout';
import Header from '@/Components/Header';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faArrowLeft, faEllipsisH, faArrowRight, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { usePage } from '@inertiajs/react';
import { Dropdown, Modal, Button, Form } from 'react-bootstrap';
import { Inertia } from '@inertiajs/inertia';
import ServiceRequests from '@/Components/ServiceRequests';
import MiniChart from '@/Components/MiniChart';
import OverView from '@/Components/OverView';


function Admin() {

  const { users, serviceRequests, chartData, statusCounts, totalRequests, totalServiceProviders,previousDayProviders,percentageChange,serviceProviders,totalUsers,
    previousDayUsers,totalAmount,previousDayAmount,amountpercentageChange,
    userPercentageChange} = usePage().props;// Assuming 'users' is correctly passed from Laravel
 const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const usersPerPage = 5;

  // Logic to paginate users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Open modal
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Handle close modal
  const handleClose = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  // Handle confirm action
  const handleConfirm = () => {
    // Perform the confirm action here (e.g., delete user, assign role, approve user)
    // Use Inertia.js to perform the update
    if (confirmAction) {
      confirmAction();
    }
    setConfirmAction(null);
    handleClose();
  };

  // Example actions
  const deleteUser = () => {
    Inertia.post(`/users/${selectedUser.id}/delete`);
  };

  const approveUser = () => {
    Inertia.post(`/users/${selectedUser.id}/approve`);
  };

  const assignRole = (role) => {
    const roleValue = role === 'Admin' ? 1 : 0;
    axios.post(`/users/${selectedUser.id}/assign-role`, { role: roleValue })
      .then(() => Inertia.reload())
      .catch(error => console.error('Error assigning role:', error));
  };

  return (
    <>
<SidebarLayout/>
<Header/>
  <main className="nxl-container">
      <div className="nxl-content">
       
        
       
        {/* [ page-header ] end */}
        {/* [ Main Content ] start */}
        <div className="main-content">
          <div className="row">
            {/* [Invoices Awaiting Payment] start */}
<OverView totalUsers={totalUsers}
totalServiceProviders={totalServiceProviders}/>

            {/* [Conversion Rate] end */}
            {/* [Payment Records] start */}
            <ServiceRequests
        serviceRequests={serviceRequests}
        chartData={chartData}
        statusCounts={statusCounts}
        totalRequests={totalRequests}
      />
            {/* [Payment Records] end */}
            {/* [Total Sales] start */}
        <MiniChart 
        serviceProviders={serviceProviders}
        totalServiceProviders={totalServiceProviders}
        previousDayProviders={previousDayProviders}
        percentageChange={percentageChange}
        userPercentageChange={userPercentageChange}
        totalUsers={totalUsers}
        previousDayUsers={previousDayUsers}
        amountpercentageChange={amountpercentageChange}
        totalAmount={totalAmount}
        previousDayAmount={previousDayAmount}
        />
            <div className="col-xxl-8">
            <div className="col-xxl-8">
      
            <div className="col-xxl-8">
            <div className="col-xxl-8">
            <div className="col-xxl-8">
      <div className="card stretch stretch-full">
        <div className="card-header">
          <h5 className="card-title">Users</h5>
          <div className="card-header-action">
            {/* Header actions here */}
          </div>
        </div>
        <div className="card-body custom-card-action p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 table-striped" style={{ minWidth: '100%' }}>
              <thead>
                <tr className="border-b">
                  <th scope="col">Users</th>
                  <th scope="col">Email</th>
                  <th scope="col">Status</th>
                  <th scope="col">Role</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <div className="avatar-image">
                          <img src={`/${user.image}`} alt="" className="img-fluid rounded-circle" style={{ width: '40px', height: '40px' }} />
                        </div>
                        <a href="javascript:void(0);">
                          <span className="d-block">{user.name}</span>
                          <span className="fs-12 d-block fw-normal text-muted">{user.email}</span>
                        </a>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge ${user.is_verified ? 'bg-soft-success text-success' : 'bg-soft-danger text-danger'}`}>
                        {user.is_verified ? (
                          <FontAwesomeIcon icon={faCheckCircle} className="me-1" />
                        ) : (
                          <FontAwesomeIcon icon={faTimesCircle} className="me-1" />
                        )}
                        {user.is_verified ? 'Verified' : 'Not Verified'}
                      </span>
                    </td>
                    <td>{user.is_admin ? 'Admin' : 'User'}</td>
                    <td className="text-end">
                      <Dropdown>
                        <Dropdown.Toggle variant="link" id="dropdown-basic">
                          <FontAwesomeIcon icon={faEllipsisV} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleViewUser(user)}>View User</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer">
          <ul className="list-unstyled d-flex align-items-center gap-2 mb-0 pagination-common-style overflow-auto">
            <li>
              <a href="javascript:void(0);" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </a>
            </li>
            {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
              <li key={index}>
                <a href="javascript:void(0);" className={currentPage === index + 1 ? 'active' : ''} onClick={() => paginate(index + 1)}>
                  {index + 1}
                </a>
              </li>
            ))}
            <li>
              <a href="javascript:void(0);" onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(users.length / usersPerPage)}>
                <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Modal for Viewing and Editing User Details */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Status:</strong> {selectedUser.is_verified ? 'Verified' : 'Not Verified'}</p>
              <p><strong>Role:</strong> {selectedUser.is_admin ? 'Admin' : 'User'}</p>
              {/* Add more user details here as needed */}
              <hr />
              <Form>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Approve User"
                    checked={selectedUser.is_verified}
                    onChange={() => setConfirmAction(approveUser)}
                  />
                </Form.Group>
                <Form.Group controlId="formRoleSelect">
                  <Form.Label>Assign Role</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue={selectedUser.is_admin ? 'Admin' : 'User'}
                    onChange={(e) => setConfirmAction(() => () => assignRole(e.target.value))}
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="danger" onClick={() => setConfirmAction(deleteUser)}>Delete User</Button>
              </Form>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
    </div>
    </div>
   
    </div>

          
   
       
          </div>
        </div>
        {/* [ Main Content ] end */}
      </div>

 
    </main> 
</>
  
  )
}

export default Admin
