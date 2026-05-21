import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import AIRecommendation from '../components/AIRecommendation';


export default function Home() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [bgClass, setBgClass] = useState('bg-light');

  // Background image toggle every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBgClass(prev => prev === 'bg-light' ? 'bg-dark' : 'bg-light');
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    if (location && pickupDate && returnDate) {
      navigate('/services');
    } else {
      alert('Please fill out all fields correctly.');
    }
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/services?category=${category}`);
  };

  const handleAIRecommend = (category: string) => {
    navigate(`/services?category=${category}`);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      {/* Background div with toggle */}
      <div id="background" className={`background ${bgClass}`}></div>

      {/* Header Section */}
      <header>
        <nav>
          <img src="/c-logo.png" className="logo" alt="Car Rental Logo" />
          <div className="menu">
            <a href="/">Home</a>
            <a href="/services">Services</a>
            <a href="/about">About Us</a>
            <a href="/contact">Contact Us</a>
          
          </div>
          <div className="social">
            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#"><i className="fa-brands fa-twitter"></i></a>
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
          </div>
        </nav>
      </header>

      <br /><br /><br /><br />

      {/* Hero Section */}
      <div className="hero">
        <div className="text">
          <h4>Discover Comfort and Performance with</h4>
          <h1>Our Exclusive <br /> <span className="red">Rental Cars</span></h1>
          <p>Unmatched driving experience, wherever the road takes you.</p>
        </div>
      </div>

      {/* Booking Form Section */}
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

      {/* Popular Choices Section */}
      <div className="popular-choices-section">
        <h2>Popular Rental Car Choices</h2>
        <div className="image-container">
          <ul>
            <li onClick={() => handleCategoryClick('suv')} style={{ cursor: 'pointer' }}>
              <div className="image-wrapper">
                <img src="/pic/suv.png" alt="SUV Rental" />
                <p className="car-name">SUV Rentals</p>
              </div>
            </li>
            <li onClick={() => handleCategoryClick('luxury')} style={{ cursor: 'pointer' }}>
              <div className="image-wrapper">
                <img src="/pic/luxury.png" alt="Luxury Car Rentals" />
                <p className="car-name">Convertible / Luxury Car Rentals</p>
              </div>
            </li>
            <li onClick={() => handleCategoryClick('economy')} style={{ cursor: 'pointer' }}>
              <div className="image-wrapper">
                <img src="/pic/econo.png" alt="Economy Car Rentals" />
                <p className="car-name">Economy Car Rentals</p>
              </div>
            </li>
            <li onClick={() => handleCategoryClick('van')} style={{ cursor: 'pointer' }}>
              <div className="image-wrapper">
                <img src="/pic/van.png" alt="Passenger Van Rentals" />
                <p className="car-name">Passenger Van Rentals</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="benefits-faq-section">
        <div className="benefits-section">
          <div className="benefit-item">
            <img src="/flexilocgo.png" alt="Flexible Rentals" />
            <h3>Flexible Rentals</h3>
            <p>Cancel or change most bookings for free up to 48 hours before pick-up.</p>
          </div>
          <div className="benefit-item">
            <img src="/Search.png" alt="No Hidden Fees" />
            <h3>No Hidden Fees</h3>
            <p>Know exactly what you're paying.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-section about">
            <h3>About Us</h3>
            <p>CaRs offers reliable and affordable car rental services in Islamabad and beyond. Choose from a wide range of cars to suit your travel needs.</p>
          </div>
          <div className="footer-section hours">
            <h3>Operating Hours</h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p>Alam Tower, 37-Commercial Zone, Liberty Market, Islamabad</p>
            <p>Phone: 042 - 111 CaRs (042 - 383 383 383)</p>
            <p>Email: <a href="mailto:customersupport@alamventures.com">customersupport@alamventures.com</a></p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 CaRs.com. All Rights Reserved.</p>
        </div>
      </footer>

      {/* AI Recommendation Assistant */}
  <AIRecommendation onRecommend={handleAIRecommend} />
    </>
  );
}