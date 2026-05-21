import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingForm: React.FC = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleSubmit = () => {
    if (location && pickupDate && returnDate) {
      navigate('/services');
    } else {
      alert('Please fill out all fields correctly.');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="booking-form-container">
      <form id="booking-form">
        <div className="form-field">
          <label htmlFor="location">Location</label>
          <select 
            name="location" 
            id="location" 
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="" disabled>Search Places</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Rawalpindi">Rawalpindi</option>
            <option value="Lahore">Lahore</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="pickup-date">Pick-Up Date</label>
          <input 
            type="date" 
            id="pickup-date" 
            name="pickup-date" 
            required
            min={today}
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="return-date">Return Date</label>
          <input 
            type="date" 
            id="return-date" 
            name="return-date" 
            required
            min={pickupDate || today}
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </div>
        <div className="form-field submit-container">
          <button type="button" onClick={handleSubmit} className="submit-btn">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;