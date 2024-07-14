import SidebarLayout from '@/Layouts/Admin/SidebarLayout';
import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import '../../../../css/bootstrap.min.css';
import '../../../css/../../css/theme.min.css';
import '../../../../vendors/css/vendors.min.css';
import '../../../../vendors/css/daterangepicker.min.css';
import '../../../../css/style3.css'
import { Dropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEllipsisV, faCheckCircle, faTimesCircle, faEdit, faDownload, 
  faPrint, faPlus, faFilter, faEye, faPowerOff, faBellSlash, faTrashAlt,
  faCircleXmark, faChevronDown, faCircleChevronDown, faPlusCircle
} from '@fortawesome/free-solid-svg-icons';

function Customers() {
  const { serviceProviders ,user} = usePage().props;
  const [showFilter, setShowFilter] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const toggleDeleteModal = (provider = null) => {
    setSelectedProvider(provider);
    setShowDeleteModal(!showDeleteModal);
  };

  return (
    <SidebarLayout user={user}>
      <div className="main-wrapper">
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="page-header">
              <div className="content-page-header">
                <h5>Customers</h5>
                <div className="list-btn">
                  <ul className="filter-list">
                    <li>
                      <a className="btn btn-filters w-auto popup-toggle" onClick={toggleFilter}>
                        <FontAwesomeIcon icon={faFilter} className="me-2" />
                        Filter
                      </a>
                    </li>
                    <li>
                      <Dropdown>
                        <Dropdown.Toggle variant="link" className="btn-filters" id="dropdown-basic">
                          <FontAwesomeIcon icon={faDownload} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1">PDF</Dropdown.Item>
                          <Dropdown.Item href="#/action-2">Excel</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </li>
                    <li>
                      <a className="btn-filters" href="#" title="Print">
                        <FontAwesomeIcon icon={faPrint} />
                      </a>
                    </li>
                    <li>
                      {/* Add Customer Button *
                      <a className="btn btn-primary" href="add-customer">
                        <FontAwesomeIcon icon={faPlus} className="me-2" />
                        Add Customer
                      </a>
                      */}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {showFilter && (
              <div id="filter_inputs" className="card filter-card">
                <div className="card-body pb-0">
                  <div className="row">
                    <div className="col-sm-6 col-md-3">
                      <div className="input-block mb-3">
                        <label>Name</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                      <div className="input-block mb-3">
                        <label>Email</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                      <div className="input-block mb-3">
                        <label>Phone</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="row">
              <div className="col-sm-12">
                <div className="card-table">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-center table-hover datatable">
                        <thead className="thead-light">
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Service Type</th>
                            <th>Company Name</th>
                            <th>Created</th>
                            <th>Status</th>
                            <th className="no-sort">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {serviceProviders.map((provider, index) => (
                            <tr key={provider.id}>
                              <td>{index + 1}</td>
                              <td>
                                <h2 className="table-avatar">
                                  <a href={`profile/${provider.id}`} className="avatar avatar-md me-2">
                                    <img
                                      className="avatar-img rounded-circle"
                                      src={provider.user_details.image || "assets/img/profiles/avatar-default.jpg"}
                                      alt="User Image"
                                    />
                                  </a>
                                  <a href={`profile/${provider.id}`}>
                                    {provider.user_details.name}
                                    <span>{provider.user_details.email}</span>
                                  </a>
                                </h2>
                              </td>
                              <td>{provider.contact_number}</td>
                              <td>{provider.service_type}</td>
                              <td>{provider.company_name}</td>
                              <td>{new Date(provider.created_at).toLocaleString()}</td>
                              <td>
                                <span className={`badge ${provider.is_approved ? 'bg-success-light' : 'bg-danger-light'}`}>
                                  {provider.is_approved ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td className="d-flex align-items-center">
                             
                             
                                <Dropdown>
                                  <Dropdown.Toggle variant="link" className="btn-action-icon">
                                    <FontAwesomeIcon icon={faEllipsisV} />
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    <Dropdown.Item href={`edit-customer/${provider.id}`}>
                                      <FontAwesomeIcon icon={faEdit} className="me-2" />
                                      Edit
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => toggleDeleteModal(provider)}>
                                      <FontAwesomeIcon icon={faTrashAlt} className="me-2" />
                                      Delete
                                    </Dropdown.Item>
                              
                                  
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
              </div>
            </div>
          </div>
        </div>

        {/* Filter Sidebar */}
        <div className={`toggle-sidebar ${showFilter ? 'open-filter' : ''}`}>
          <div className="sidebar-layout-filter">
            <div className="sidebar-header">
              <h5>Filter</h5>
              <a href="#" className="sidebar-closes" onClick={toggleFilter}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </a>
            </div>
            <div className="sidebar-body">
              {/* Add filter options here */}
            </div>
          </div>
        </div>

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="modal custom-modal fade show" id="delete_modal" style={{display: 'block'}}>
            <div className="modal-dialog modal-dialog-centered modal-md">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="form-header">
                    <h3>Delete Customer</h3>
                    <p>Are you sure want to delete?</p>
                  </div>
                  <div className="modal-btn delete-action">
                    <div className="row">
                      <div className="col-6">
                        <button type="reset" className="w-100 btn btn-primary paid-continue-btn" onClick={() => {
                          // Add delete logic here
                          toggleDeleteModal();
                        }}>
                          Delete
                        </button>
                      </div>
                      <div className="col-6">
                        <button type="submit" className="w-100 btn btn-primary paid-cancel-btn" onClick={toggleDeleteModal}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}

export default Customers;