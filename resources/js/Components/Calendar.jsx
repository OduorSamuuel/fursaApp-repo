import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Book Service</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select Date"
        className="form-control"
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full mt-4">
        Book Now
      </button>
    </div>
  );
};

export default Calendar;
