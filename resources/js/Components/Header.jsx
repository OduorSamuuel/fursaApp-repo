import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faChevronRight,
  faAlignLeft,
  faArrowRight,
  faArrowLeft,
  faPlus,
  faPaperPlane,
  faCheck,
  faClock,
  faBell,
  faSearch,
  faTimes,
  faMoon,
  faSun,
  faExpand,
  faCompress,
  faUser,
  faCog,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isNotificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [isTimesheetMenuOpen, setTimesheetMenuOpen] = useState(false);

  const toggleProfileMenu = () => setProfileMenuOpen(!isProfileMenuOpen);
  const toggleNotificationMenu = () => setNotificationMenuOpen(!isNotificationMenuOpen);
  const toggleTimesheetMenu = () => setTimesheetMenuOpen(!isTimesheetMenuOpen);

  return (
    <>
      <header className="nxl-header">
        <div className="header-wrapper">
          <div className="header-left d-flex align-items-center gap-4">
            <a href="javascript:void(0);" className="nxl-head-mobile-toggler" id="mobile-collapse">
              <div className="hamburger hamburger--arrowturn">
                <div className="hamburger-box">
                  <div className="hamburger-inner" />
                </div>
              </div>
            </a>
            <div className="nxl-navigation-toggle">
              <a href="javascript:void(0);" id="menu-mini-button">
                <FontAwesomeIcon icon={faAlignLeft} />
              </a>
              <a href="javascript:void(0);" id="menu-expend-button" style={{ display: 'none' }}>
                <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>
            <div className="nxl-lavel-mega-menu-toggle d-flex d-lg-none">
              <a href="javascript:void(0);" id="nxl-lavel-mega-menu-open">
                <FontAwesomeIcon icon={faAlignLeft} />
              </a>
            </div>
            <div className="nxl-drp-link nxl-lavel-mega-menu">
              <div className="nxl-lavel-mega-menu-toggle d-flex d-lg-none">
                <a href="javascript:void(0);" id="nxl-lavel-mega-menu-hide">
                  <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                  <span>Back</span>
                </a>
              </div>
              <div className="nxl-lavel-mega-menu-wrapper d-flex gap-3">
                <div className="dropdown nxl-h-item nxl-lavel-menu">
                  <a
                    href="javascript:void(0);"
                    className="avatar-text avatar-md bg-primary text-white"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </a>
                  <div className="dropdown-menu nxl-h-dropdown">
                    <div className="dropdown nxl-level-menu">
                      <a href="javascript:void(0);" className="dropdown-item">
                        <span className="hstack">
                          <FontAwesomeIcon icon={faPaperPlane} />
                          <span>Applications</span>
                        </span>
                        <FontAwesomeIcon icon={faChevronRight} className="ms-auto me-0" />
                      </a>
                      <div className="dropdown-menu nxl-h-dropdown">
                        <a href="apps-chat.html" className="dropdown-item">
                          <FontAwesomeIcon icon={faPaperPlane} className="wd-5 ht-5 bg-gray-500 rounded-circle me-3" />
                          <span>Chat</span>
                        </a>
                      </div>
                    </div>
                    <div className="dropdown-divider" />
                    <div className="dropdown nxl-level-menu">
                      <a href="javascript:void(0);" className="dropdown-item">
                        <span className="hstack">
                          <FontAwesomeIcon icon={faCheck} />
                          <span>Reports</span>
                        </span>
                        <FontAwesomeIcon icon={faChevronRight} className="ms-auto me-0" />
                      </a>
                      <div className="dropdown-menu nxl-h-dropdown">
                        <a href="reports-sales.html" className="dropdown-item">
                          <FontAwesomeIcon icon={faCheck} className="wd-5 ht-5 bg-gray-500 rounded-circle me-3" />
                          <span>ReportS</span>
                        </a>
                      </div>
                    </div>
                    <div className="dropdown-divider" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="header-right ms-auto">
            <div className="d-flex align-items-center">
              <div className="dropdown nxl-h-item nxl-header-search">
                <a
                  href="javascript:void(0);"
                  className="nxl-head-link me-0"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </a>
                <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-search-dropdown">
                  <div className="input-group search-form">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faSearch} className="fs-6 text-muted" />
                    </span>
                    <input
                      type="text"
                      className="form-control search-input-field"
                      placeholder="Search...."
                    />
                    <span className="input-group-text">
                      <button type="button" className="btn-close" />
                    </span>
                  </div>
                  <div className="dropdown-divider mt-0" />
                </div>
              </div>
              <div className="dropdown nxl-h-item nxl-header-language d-none d-sm-flex">
                <a
                  href="javascript:void(0);"
                  className="nxl-head-link me-0 nxl-language-link"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                >
                  <img
                    src="assets/vendors/img/flags/4x3/us.svg"
                    alt=""
                    className="img-fluid wd-20"
                  />
                </a>
                <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-language-dropdown">
                  <div className="dropdown-divider mt-0" />
                </div>
              </div>
              <div className="nxl-h-item d-none d-sm-flex">
                <div className="full-screen-switcher">
                  <a
                    href="javascript:void(0);"
                    className="nxl-head-link me-0"
                    onclick="$('body').fullScreenHelper('toggle');"
                  >
                    <FontAwesomeIcon icon={faExpand} className="maximize" />
                    <FontAwesomeIcon icon={faCompress} className="minimize" />
                  </a>
                </div>
              </div>
              <div className="nxl-h-item dark-light-theme">
                <a href="javascript:void(0);" className="nxl-head-link me-0 dark-button">
                  <FontAwesomeIcon icon={faMoon} />
                </a>
                <a href="javascript:void(0);" className="nxl-head-link me-0 light-button" style={{ display: 'none' }}>
                  <FontAwesomeIcon icon={faSun} />
                </a>
              </div>
              <div className="dropdown nxl-h-item">
                <a
                  href="javascript:void(0);"
                  className="nxl-head-link me-0"
                  onClick={toggleTimesheetMenu}
                >
                  <FontAwesomeIcon icon={faClock} />
                  <span className="badge bg-success nxl-h-badge">2</span>
                </a>
                {isTimesheetMenuOpen && (
                  <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-timesheets-menu show">
                    <div className="d-flex justify-content-between align-items-center timesheets-head">
                      <h6 className="fw-bold text-dark mb-0">Timesheets</h6>
                      <a
                        href="javascript:void(0);"
                        className="fs-11 text-success text-end ms-auto"
                        data-bs-toggle="tooltip"
                        title="Upcomming Timers"
                      >
                        <FontAwesomeIcon icon={faClock} />
                        <span>3 Upcomming</span>
                      </a>
                    </div>
                    <div className="d-flex justify-content-between align-items-center flex-column timesheets-body">
                      <FontAwesomeIcon icon={faClock} className="fs-1 mb-4" />
                      <p className="text-muted">No started timers found yes!</p>
                      <a href="javascript:void(0);" className="btn btn-sm btn-primary">
                        Started Timer
                      </a>
                    </div>
                    <div className="dropdown-divider" />
                  </div>
                )}
              </div>
              <div className="dropdown nxl-h-item">
                <a
                  href="javascript:void(0);"
                  className="nxl-head-link me-0"
                  onClick={toggleNotificationMenu}
                >
                  <FontAwesomeIcon icon={faBell} />
                </a>
                {isNotificationMenuOpen && (
                  <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-notification-dropdown show">
                    <div className="d-flex justify-content-between align-items-center nxl-notification-head">
                      <h6 className="fw-bold text-dark mb-0">Notifications</h6>
                      <a
                        href="javascript:void(0);"
                        className="fs-11 text-primary text-end ms-auto"
                        data-bs-toggle="tooltip"
                        title="Mark all as read"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </a>
                    </div>
                    <div className="dropdown-divider" />
                    <div className="d-flex justify-content-between align-items-center flex-column nxl-notification-body">
                      <FontAwesomeIcon icon={faBell} className="fs-1 mb-4" />
                      <p className="text-muted">No New Notification!</p>
                    </div>
                    <div className="text-center nxl-notification-footer">
                      <a href="javascript:void(0);" className="fs-13 fw-semibold text-dark">
                        View All Notifications
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <div className="dropdown nxl-h-item">
                <a
                  className="nxl-head-link me-0"
                  onClick={toggleProfileMenu}
                >
                  <FontAwesomeIcon icon={faUser} />
                </a>
                {isProfileMenuOpen && (
                  <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-profile-dropdown show">
                    <div className="d-flex flex-column nxl-profile-head">
                      <div className="avatar avatar-md mb-3 bg-primary text-white">A</div>
                      <h6 className="fw-bold text-dark mb-1">John Doe</h6>
                      <p className="fs-13 text-muted mb-0">johndoe@example.com</p>
                    </div>
                    <div className="dropdown-divider" />
                    <div className="d-flex flex-column nxl-profile-body">
                      <a href="profile.html" className="dropdown-item">
                        <FontAwesomeIcon icon={faCog} className="me-2" />
                        <span>Profile Settings</span>
                      </a>
                      <a href="javascript:void(0);" className="dropdown-item">
                        <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                        <span>Logout</span>
                      </a>
                    </div>
                    <div className="dropdown-divider" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
