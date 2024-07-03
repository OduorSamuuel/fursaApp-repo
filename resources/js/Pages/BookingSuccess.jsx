import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faWallet, faCheckCircle, faArrowLeft, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

import "react-alice-carousel/lib/alice-carousel.css";
import "../../css/feather.css";
import "../../css/style.css";
import "aos/dist/aos.css";
import "../../css/bootstrap.min.css";
import "../../css/bootstrap-datetimepicker.min.css";
import Image from "../../img/booking-done.png";
import { Link } from "@inertiajs/react";

function BookingSuccess() {
    return (
        <div className="main-wrapper">
            <div className="content book-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 mx-auto">
                            <ul className="step-register row">
                                <li className="activate col-md-4">
                                    <div className="multi-step-icon">
                                        <span><FontAwesomeIcon icon={faCalendarAlt} size="2x" className="text-primary" /></span>
                                    </div>
                                    <div className="multi-step-info">
                                        <h6>Appointment</h6>
                                        <p>Choose time & date for the service</p>
                                    </div>
                                </li>
                                <li className="activate col-md-4">
                                    <div className="multi-step-icon">
                                        <span><FontAwesomeIcon icon={faWallet} size="2x" className="text-primary" /></span>
                                    </div>
                                    <div className="multi-step-info">
                                        <h6>Payment</h6>
                                        <p>Select Payment Gateway</p>
                                    </div>
                                </li>
                                <li className="active col-md-4">
                                    <div className="multi-step-icon">
                                        <span><FontAwesomeIcon icon={faCheckCircle} size="2x" className="text-primary" /></span>
                                    </div>
                                    <div className="multi-step-info">
                                        <h6>Done</h6>
                                        <p>Completion of Booking</p>
                                    </div>
                                </li>
                            </ul>
                            <div className="row align-items-center">
                                <div className="col-md-7">
                                    <div className="booking-done">
                                        <h6>Successfully Completed Payment</h6>
                                        <p>Your Booking has been Successfully Completed</p>
                                        <div className="book-submit">
                                            <Link href="/" className="btn btn-primary"><FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Go to Home</Link>

<a className="btn btn-primary" onClick={() => window.location.href = '/accounts/appointments'}>Booking History</a>

                                          
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="booking-done">
                                        <img src={Image} className="img-fluid" alt="Booking Done" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mouse-cursor cursor-outer"></div>
            <div className="mouse-cursor cursor-inner"></div>
        </div>
    )
}

export default BookingSuccess;
