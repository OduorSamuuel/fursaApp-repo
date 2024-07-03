import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faWallet, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { ScaleLoader } from 'react-spinners'; // Import ScaleLoader from react-spinners
import "react-alice-carousel/lib/alice-carousel.css";
import "../../css/feather.css";
import "../../css/style.css";
import "aos/dist/aos.css";
import "../../css/bootstrap-datetimepicker.min.css";
import "../../css/bootstrap.min.css";

import Image from "../../../public/Images/pic-4.png";
import mpesa from "../../../public/Images/mpesa.jpeg";

function BookingPayment() {
    const { bookingSummary } = usePage().props;
    const subtotal = parseFloat(bookingSummary.bookingData.selectedTier.price);
    const serviceCharge = subtotal * 0.05; // 5% of the subtotal (adjust as needed)
    const totalCost = subtotal + serviceCharge;
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Mpesa');
    const [phoneNumber, setPhoneNumber] = useState('254748498010');
    const [loading, setLoading] = useState(false);

    // Function to handle radio button change
    const handlePaymentMethodChange = (method) => {
        setSelectedPaymentMethod(method);
    };

    // Function to handle clicking on "Proceed to Pay" button
    const handleProceedToPay = async () => {
        setLoading(true);
        await Inertia.post('/perform-stk-push', {
            bookingSummary,
            totalCost,
            phoneNumber
        });
        setLoading(false);
    };

    // Function to handle clicking on "Proceed to finish checkout" button
    const handleProceedToFinishCheckout = async () => {
        setLoading(true);
        await Inertia.post('/booked', {
            bookingSummary,
            totalCost,
            phoneNumber
        });
        setLoading(false);
    };

    return (
        <div className="main-wrapper">
            <div className="content book-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 mx-auto">
                            <ul className="step-register row">
                                <li className="activate col-md-4">
                                    <div className="multi-step-icon">
                                        <FontAwesomeIcon icon={faCalendarAlt} />
                                    </div>
                                    <div className="multi-step-info">
                                        <h6>Appointment</h6>
                                        <p>Choose time & date for the service</p>
                                    </div>
                                </li>
                                <li className="active col-md-4">
                                    <div className="multi-step-icon">
                                        <FontAwesomeIcon icon={faWallet} />
                                    </div>
                                    <div className="multi-step-info">
                                        <h6>Payment</h6>
                                        <p>Select Payment Gateway</p>
                                    </div>
                                </li>
                                <li className="col-md-4">
                                    <div className="multi-step-icon">
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                    </div>
                                    <div className="multi-step-info">
                                        <h6>Done </h6>
                                        <p>Completion of Booking</p>
                                    </div>
                                </li>
                            </ul>
                            <div className="row">
                                <div className="col-lg-6">
                                    <h5 className="pay-title">Payment Methods</h5>
                                    <div className="payment-card payment-bg">
                                        <div className="payment-head">
                                            <label className="custom_radio">
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    value="Mpesa"
                                                    checked={selectedPaymentMethod === 'Mpesa'}
                                                    onChange={() => handlePaymentMethodChange('Mpesa')}
                                                />
                                                <span className="checkmark"></span>
                                                <div className="">
                                                    <img className="h-12  object-cover" src={mpesa} alt="M-Pesa" />
                                                </div>
                                            </label>
                                            <h6>M-Pesa</h6>
                                        </div>
                                    </div>
                                    <div className="payment-card">
                                        <div className="payment-head">
                                            <label className="custom_radio">
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    value="CashAfterService"
                                                    checked={selectedPaymentMethod === 'CashAfterService'}
                                                    onChange={() => handlePaymentMethodChange('CashAfterService')}
                                                />
                                                <span className="checkmark"></span>
                                                <div className="payment-image">
                                                    <FontAwesomeIcon icon={faWallet} size="2x" />
                                                </div>
                                            </label>
                                            <h6>Cash After Service</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <h5 className="pay-title">Booking Summary</h5>
                                    <div className="summary-box">
                                        <div className="booking-info">
                                            <div className="service-book">
                                                <div className="serv-profile">
                                                    <span className="badge">{bookingSummary.bookingData.provider.service_name}</span>
                                                    <h2>{bookingSummary.bookingData.provider.service_name}</h2>
                                                    <ul>
                                                        <li className="serv-pro">
                                                            <img src={Image} alt="img" />
                                                        </li>
                                                        <li className="service-map"><FontAwesomeIcon icon={faCheckCircle} />{bookingSummary.bookingData.provider.county_name}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="booking-summary">
                                            <ul className="booking-date">
                                                <li>Date <span>{bookingSummary.selectedDate}</span></li>
                                                <li>Time <span>{bookingSummary.selectedTime}</span></li>
                                                <li>Service Provider <span>{bookingSummary.bookingData.provider.user_name}</span></li>
                                            </ul>
                                            <ul className="booking-date">
                                                <li>Contact No <span>{phoneNumber}</span></li>
                                                <li>Subtotal <span>{bookingSummary.bookingData.selectedTier.price}</span></li>
                                                <li>Service Charge <span>{serviceCharge.toFixed(2)}</span></li>
                                            </ul>
                                            <div className="booking-total">
                                                <ul className="booking-total-list">
                                                    <li>
                                                        <span>Total</span>
                                                        <span className="total-cost">ksh {totalCost.toFixed(2)}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="booking-pay">
                                        {selectedPaymentMethod === 'Mpesa' && (
                                            <button
                                                onClick={handleProceedToPay}
                                                className="btn btn-primary btn-pay w-100"
                                                disabled={loading}
                                            >
                                                Proceed to Pay ksh {totalCost.toFixed(2)}
                                                {loading && <ScaleLoader color={"#ffffff"} loading={true} height={20} width={2} radius={2} margin={2} />}
                                            </button>
                                        )}
                                        {selectedPaymentMethod === 'CashAfterService' && (
                                            <button
                                                onClick={handleProceedToFinishCheckout}
                                                className="btn btn-primary btn-pay w-100"
                                                disabled={loading}
                                            >
                                                Proceed to finish checkout ksh {totalCost.toFixed(2)}
                                                {loading && <ScaleLoader color={"#ffffff"} loading={true} height={20} width={2} radius={2} margin={2} />}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingPayment;
