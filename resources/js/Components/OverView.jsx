import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faEllipsisV } from '@fortawesome/free-solid-svg-icons'

function OverView({ totalUsers, totalServiceProviders }) {
  return (
    <>
      <div className="col-xxl-3 col-md-6">
        <div className="card stretch stretch-full">
          <div className="card-body">
            <div className="d-flex align-items-start justify-content-between mb-4">
              <div className="d-flex gap-4 align-items-center">
                <div className="avatar-text avatar-lg bg-gray-200">
                  <FontAwesomeIcon icon={faUsers} size="lg" /> {/* User icon */}
                </div>
                <div>
                  <div className="fs-4 fw-bold text-dark">
                    <span className="counter">{totalUsers}</span>
                  </div>
                  <h3 className="fs-13 fw-semibold text-truncate-1-line">
                    Total Users
                  </h3>
                </div>
              </div>
              <a href="javascript:void(0);" className="">
                <FontAwesomeIcon icon={faEllipsisV} size="lg" />
              </a>
            </div>
            <div className="pt-4">
              <div className="progress mt-2 ht-3">
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xxl-3 col-md-6">
        <div className="card stretch stretch-full">
          <div className="card-body">
            <div className="d-flex align-items-start justify-content-between mb-4">
              <div className="d-flex gap-4 align-items-center">
                <div className="avatar-text avatar-lg bg-gray-200">
                  <FontAwesomeIcon icon={faUsers} size="lg" /> {/* User icon */}
                </div>
                <div>
                  <div className="fs-4 fw-bold text-dark">
                    <span className="counter">{totalServiceProviders}</span>
                  </div>
                  <h3 className="fs-13 fw-semibold text-truncate-1-line">
                    Total Service Providers
                  </h3>
                </div>
              </div>
              <a href="javascript:void(0);" className="">
                <FontAwesomeIcon icon={faEllipsisV} size="lg" />
              </a>
            </div>
            <div className="pt-4">
              <div className="progress mt-2 ht-3">
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OverView
