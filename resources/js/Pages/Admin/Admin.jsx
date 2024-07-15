import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import SidebarLayout from '@/Layouts/Admin/SidebarLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faArrowLeft, faEllipsisV, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import ServiceRequests from '@/Components/ServiceRequests';
import MiniChart from '@/Components/MiniChart';
import OverView from '@/Components/OverView';

function Admin() {
  const { users, user, serviceRequests, chartData, statusCounts, totalRequests, totalServiceProviders, previousDayProviders, percentageChange, serviceProviders, totalUsers, previousDayUsers, totalAmount, previousDayAmount, amountpercentageChange, userPercentageChange } = usePage().props;
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Logic to paginate users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <SidebarLayout user={user} />
      <main className="nxl-container">
        <div className="nxl-content">
          <div className="main-content">
            <div className="row">
              <OverView totalUsers={totalUsers} totalServiceProviders={totalServiceProviders} />
              <ServiceRequests serviceRequests={serviceRequests} chartData={chartData} statusCounts={statusCounts} totalRequests={totalRequests} />
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
                <div className="card stretch stretch-full">
                  <div className="card-header">
                    <h5 className="card-title">Users</h5>
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
                            <th scope="col">Cancelled by User</th>
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
                                  <div>
                                    <span className="d-block">{user.name}</span>
                                    <span className="fs-12 d-block fw-normal text-muted">{user.email}</span>
                                  </div>
                                </div>
                              </td>
                              <td>{user.email}</td>
                              <td>
                                <span className={`badge ${user.is_verified ? 'bg-soft-success text-success' : 'bg-soft-danger text-danger'}`}>
                                  <FontAwesomeIcon icon={user.is_verified ? faCheckCircle : faTimesCircle} className="me-1" />
                                  {user.is_verified ? 'Verified' : 'Not Verified'}
                                </span>
                              </td>
                              <td>{user.is_admin ? 'Admin' : 'User'}</td>
                              <td>
                                <span className={`badge ${user.cancelled_by_user ? 'bg-soft-warning text-warning' : 'bg-soft-secondary text-secondary'}`}>
                                  {user.cancelled_by_user ? 'Yes' : 'No'}
                                </span>
                              </td>
                              <td className="text-end">
                                <Link href={`/admin/users/${user.id}`} className="btn btn-primary btn-sm">
                                  Manage User
                                </Link>
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
                        <a href="#" onClick={() => paginate(currentPage - 1)} className={currentPage === 1 ? 'disabled' : ''}>
                          <FontAwesomeIcon icon={faArrowLeft} />
                        </a>
                      </li>
                      {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
                        <li key={index}>
                          <a href="#" className={currentPage === index + 1 ? 'active' : ''} onClick={() => paginate(index + 1)}>
                            {index + 1}
                          </a>
                        </li>
                      ))}
                      <li>
                        <a href="#" onClick={() => paginate(currentPage + 1)} className={currentPage === Math.ceil(users.length / usersPerPage) ? 'disabled' : ''}>
                          <FontAwesomeIcon icon={faArrowRight} />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Admin;
