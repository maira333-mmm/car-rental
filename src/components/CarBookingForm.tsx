import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car } from '../data/cars';

interface CarBookingFormProps {
  car: Car;
}

const CarBookingForm: React.FC<CarBookingFormProps> = ({ car }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    pickupLocation: '',
    dropoffLocation: '',
    driverAge: '',
    additionalRequests: '',
    insuranceOption: 'basic',
    cardNumber: '',
    paymentMethod: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkFields = () => {
    const required = ['customerName', 'customerEmail', 'customerPhone', 'pickupLocation', 'dropoffLocation', 'driverAge', 'cardNumber', 'paymentMethod'];
    return required.every(field => formData[field as keyof typeof formData]);
  };

  const submitBooking = () => {
    if (checkFields()) {
      localStorage.setItem('bookingData', JSON.stringify({ car, formData }));
      navigate('/signin');
    } else {
      alert('Please fill all required fields');
    }
  };

  return (
    <section className="booking-form">
      <h2>Booking Form</h2>
      <form id="bookingForm">
        <label htmlFor="customer-name">Full Name:</label>
        <input 
          type="text" 
          id="customer-name" 
          name="customerName" 
          placeholder="Enter your full name" 
          value={formData.customerName}
          onChange={handleChange}
          required 
        />

        <label htmlFor="customer-email">Email Address:</label>
        <input 
          type="email" 
          id="customer-email" 
          name="customerEmail" 
          placeholder="Enter your email" 
          value={formData.customerEmail}
          onChange={handleChange}
          required 
        />

        <label htmlFor="customer-phone">Phone Number:</label>
        <input 
          type="tel" 
          id="customer-phone" 
          name="customerPhone" 
          placeholder="Enter your phone number" 
          value={formData.customerPhone}
          onChange={handleChange}
          required 
        />

        <label htmlFor="pickup-location">Pick-up Location:</label>
        <select 
          id="pickup-location" 
          name="pickupLocation" 
          value={formData.pickupLocation}
          onChange={handleChange}
          required
        >
          <option value="">Select Pick-up Location</option>
          <option value="rawalpindi">Rawalpindi</option>
          <option value="islamabad">Islamabad</option>
          <option value="lahore">Lahore</option>
        </select>

        <label htmlFor="dropoff-location">Drop-off Location:</label>
        <select 
          id="dropoff-location" 
          name="dropoffLocation" 
          value={formData.dropoffLocation}
          onChange={handleChange}
          required
        >
          <option value="">Select Drop-off Location</option>
          <option value="rawalpindi">Rawalpindi</option>
          <option value="islamabad">Islamabad</option>
          <option value="lahore">Lahore</option>
        </select>

        <label htmlFor="driver-age">Driver's Age:</label>
        <input 
          type="number" 
          id="driver-age" 
          name="driverAge" 
          min="18" 
          max="100" 
          value={formData.driverAge}
          onChange={handleChange}
          required 
        />

        <label htmlFor="additional-requests">Additional Requests:</label>
        <textarea 
          id="additional-requests" 
          name="additionalRequests" 
          rows={4} 
          placeholder="Enter any special requests (e.g., GPS, child seat, etc.)"
          value={formData.additionalRequests}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="insurance-option">Add Insurance:</label>
        <select 
          id="insurance-option" 
          name="insuranceOption" 
          value={formData.insuranceOption}
          onChange={handleChange}
        >
          <option value="basic">Basic Insurance</option>
          <option value="premium">Premium Insurance</option>
          <option value="none">No Insurance</option>
        </select>

        <label htmlFor="card_number">Card Number:</label>
        <input 
          type="text" 
          id="card_number" 
          name="cardNumber" 
          maxLength={16} 
          required 
          pattern="\d{16}" 
          placeholder="16-digit card number"
          value={formData.cardNumber}
          onChange={handleChange}
        />

        <label htmlFor="payment-method">Payment Method:</label>
        <select 
          id="payment-method" 
          name="paymentMethod" 
          value={formData.paymentMethod}
          onChange={handleChange}
          required
        >
          <option value="">Select Payment Method</option>
          <option value="credit-card">Credit Card</option>
          <option value="debit-card">Debit Card</option>
          <option value="nayapay">Nayapay</option>
        </select>

        <button type="button" id="bookNowButton" onClick={submitBooking}>Book Now</button>
      </form>
    </section>
  );
};

export default CarBookingForm;