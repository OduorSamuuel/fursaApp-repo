import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCircleInfo,
  faCalendarDays,
  faStar,
  faClock,
  faMoneyBillWave,
  faMapMarkerAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Layout from "@/Layouts/Layout";
import Accounts from "@/Layouts/Accounts/Accounts";
import { usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import CancelServiceModal from "../../Components/CancelServiceModal";

function Appointments({ auth }) {
  const { serviceRequests } = usePage().props;
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleCancelClick = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
  };

  const handleConfirmCancel = (reasons) => {
    Inertia.put(`/service/cancel/${selectedRequest.id}`, {
      reasons,
    });
    handleCloseModal();
  };

  return (
    <Layout auth={auth}>
      <Accounts>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">My Bookings</h2>

            {serviceRequests.map((request) => (
              <div 
                key={request.id} 
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-6 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row p-6">
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <img
                      src={`/${request.first_image_path}`}
                      alt="Service Image"
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </div>
                  <div className="md:w-2/3 md:pl-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {request.service_name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-center">
                        <FontAwesomeIcon icon={faClock} className="mr-3 text-gray-400" />
                        <span className="font-medium mr-2">Booking Date:</span>
                        {formatBookingDate(request.booking_date)}
                      </li>
                      <li className="flex items-center">
                        <FontAwesomeIcon icon={faMoneyBillWave} className="mr-3 text-gray-400" />
                        <span className="font-medium mr-2">Amount:</span>
                        sh {request.amount}
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${request.payment_status === 'Pending' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {request.payment_status}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-3 text-gray-400" />
                        <span className="font-medium mr-2">Location:</span>
                        {request.location}
                      </li>
                      <li className="flex items-center">
                        <FontAwesomeIcon icon={faUser} className="mr-3 text-gray-400" />
                        <span className="font-medium mr-2">Service Provider:</span>
                        {request.service_provider_user_name}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300">
                    <FontAwesomeIcon icon={faCircleInfo} className="mr-2" /> Reason
                  </button>
                  {request.status === "Completed" || request.status === "Cancelled by User" ? (
                    <>
                      <Link
                        href={`/description/${request.service_detail_id}`}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
                      >
                        <FontAwesomeIcon icon={faCalendarDays} className="mr-2" /> Book Again
                      </Link>
                      {request.status === "Completed" && (
                        <Link
                          href={`/rating/${request.service_detail_id}`}
                          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                        >
                          <FontAwesomeIcon icon={faStar} className="mr-2" /> Rate Service
                        </Link>
                      )}
                    </>
                  ) : (
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
                      onClick={() => handleCancelClick(request)}
                    >
                      <FontAwesomeIcon icon={faCalendarDays} className="mr-2" /> Cancel Service
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Pagination section */}
            <div className="mt-8 flex justify-between items-center">
              <div className="flex items-center">
                <span className="mr-2 text-gray-600">Show</span>
                <select className="border rounded px-2 py-1">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </select>
                <span className="ml-2 text-gray-600">entries</span>
              </div>
              <div className="flex items-center">
                <span className="mr-4 text-gray-600">1 - 5 of 10</span>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Previous
                  </a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    1
                  </a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    2
                  </a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    3
                  </a>
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Next
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <CancelServiceModal
          show={showModal}
          handleClose={handleCloseModal}
          handleConfirm={handleConfirmCancel}
        />
      </Accounts>
    </Layout>
  );
}

// Helper functions
function getStatusBadgeClass(status) {
  switch (status) {
    case "Cancelled by User":
      return "bg-red-100 text-red-800";
    case "Completed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-blue-100 text-blue-800";
  }
}

function formatBookingDate(bookingDate) {
  return new Date(bookingDate).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

export default Appointments;