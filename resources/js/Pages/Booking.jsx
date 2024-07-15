import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import moment from "moment";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart, faShareAlt, faPrint, faDownload, faStar, faCircleCheck, faMapPin, faThumbsUp, faThumbsDown, faUser, faEnvelope, faPhone, faStarHalf, faCalendar, faWallet, faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faTwitter, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import "react-alice-carousel/lib/alice-carousel.css";
import Slider from "react-slick";
import "../../css/feather.css";
import "../../css/style.css";
import "aos/dist/aos.css";
import "../../css/bootstrap-datetimepicker.min.css";
import "../../css/bootstrap.min.css";

function Booking() {
  const { bookingData } = usePage().props;
  console.log(bookingData);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    if (bookingData && bookingData.availability) {
      const selectedDay = moment(selectedDate).format('dddd').toLowerCase();
      const selectedDayAvailability = bookingData.availability.find(day => day.day_of_week === selectedDay);
      console.log(selectedDayAvailability);
      if (selectedDayAvailability) {
        const slots = generateTimeSlots(selectedDayAvailability.open, selectedDayAvailability.close);
        setTimeSlots(slots);
      } else {
        setTimeSlots([]);
      }
    }
  }, [bookingData, selectedDate]);

  const generateTimeSlots = (openTime, closeTime) => {
    if (!openTime || !closeTime) return [];
    const openMoment = moment(openTime, 'HH:mm');
    const closeMoment = moment(closeTime, 'HH:mm');
    const slots = [];
    while (openMoment.isBefore(closeMoment)) {
      slots.push(openMoment.format('hh:mm A'));
      openMoment.add(1, 'hour');
    }
    return slots;
  };

  const handleBookAppointment = () => {
    // Validate if time slot is selected
    if (!selectedTime) {
      alert("Please select a time slot.");
      return;
    }

    // Navigate to summary page with booking details
    Inertia.post('/booking-summary', {
      bookingData,
      selectedDate,
      selectedTime
    });
  };

  const isPastDate = (date) => {
    return moment(date).isBefore(moment(), 'day');
  };

  const isPastTimeSlot = (slot) => {
    if (selectedDate === moment().format('YYYY-MM-DD')) {
      return moment(slot, 'hh:mm A').isBefore(moment());
    }
    return false;
  };

  return (
    <div className="main-wrapper">
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <ul className="step-register row">
                <li className="active col-md-4">
                  <div className="multi-step-icon">
                    <FontAwesomeIcon icon={faCalendar} size="2x" />
                  </div>
                  <div className="multi-step-info">
                    <h6>Appointment</h6>
                    <p>Choose time & date for the service</p>
                  </div>
                </li>
                <li className="col-md-4">
                  <div className="multi-step-icon">
                    <FontAwesomeIcon icon={faWallet} size="2x" />
                  </div>
                  <div className="multi-step-info">
                    <h6>Payment</h6>
                    <p>Select Payment Gateway</p>
                  </div>
                </li>
                <li className="col-md-4">
                  <div className="multi-step-icon">
                    <FontAwesomeIcon icon={faCheckCircle} size="2x" />
                  </div>
                  <div className="multi-step-info">
                    <h6>Done</h6>
                    <p>Completion of Booking</p>
                  </div>
                </li>
              </ul>
              <div className="booking-service">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="service-book">
                      <div className="serv-profile">
                        <span className="badge">{bookingData.provider.service_name}</span>
                        <h2>{bookingData.provider.service_name}</h2>
                        <ul>
                          <li className="serv-pro">
                            <img src="assets/img/profiles/avatar-01.jpg" alt="img" />
                            <div className="serv-pro-info">
                              <h6>{bookingData.provider.user_name}</h6>
                              <p className="serv-review"><FontAwesomeIcon icon={faStar} /> <span>4.9 </span>(255 reviews)</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="row align-items-center">
                      <div className="col-md-7 col-sm-6"></div>
                      <div className="flex">
                        <div className="provide-box">
                          <span><FontAwesomeIcon icon={faEnvelope} /></span>
                          <div className="provide-info">
                            <h6>Email</h6>
                            <p>{bookingData.provider.email}</p>
                          </div>
                        </div>
                        <div className="provide-box">
                          <span><FontAwesomeIcon icon={faMapPin} /></span>
                          <div className="provide-info">
                            <h6>Address</h6>
                            <p>{bookingData.provider.address}</p>
                          </div>
                        </div>
                        <div className="provide-box">
                          <div className="provide-info">
                            <h6>Service Amount</h6>
                            <h6>{bookingData.selectedTier.name} package</h6>
                            <h5> Ksh {bookingData.selectedTier.price} </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="book-form">
                <div className="row"></div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className="book-title">
                    <h5>Appointment Date</h5>
                  </div>
                  <div className="book-date">
                    <input
                      type="date"
                      className="form-control"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={moment().format('YYYY-MM-DD')} // Disable past dates
                    />
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="book-title">
                        <h5>Appointment Time</h5>
                      </div>
                    </div>
                  </div>
                  <div className="token-slot mt-2">
                    {timeSlots.map((slot, index) => (
                      <div className="form-check-inline visits me-0" key={index}>
                        <label className="visit-btns">
                          <input
                            type="radio"
                            className="form-check-input"
                            name="appointment"
                            value={slot}
                            onChange={() => setSelectedTime(slot)}
                            disabled={isPastTimeSlot(slot)} // Disable past time slots
                          />
                          <span className="visit-rsn">{slot}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="book-submit text-end">
                    <a href="#" className="btn btn-secondary">Cancel</a>
                    <button className="btn btn-primary" onClick={handleBookAppointment}>Book Appointment</button>
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

export default Booking;
