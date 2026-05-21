import React from 'react';
import { useNavigate } from 'react-router-dom';

const PopularChoices: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (category: string) => {
    navigate(`/services?category=${category}`);
  };

  return (
    <div className="popular-choices-section">
      <h2>Popular Rental Car Choices</h2>
      <div className="image-container">
        <ul>
          <li onClick={() => handleClick('suv')} style={{ cursor: 'pointer' }}>
            <div className="image-wrapper">
              <img src="/pic/suv.png" alt="SUV Rental" />
              <p className="car-name">SUV Rentals</p>
            </div>
          </li>
          <li onClick={() => handleClick('luxury')} style={{ cursor: 'pointer' }}>
            <div className="image-wrapper">
              <img src="/pic/luxury.png" alt="Luxury Car Rentals" />
              <p className="car-name">Convertible / Luxury Car Rentals</p>
            </div>
          </li>
          <li onClick={() => handleClick('economy')} style={{ cursor: 'pointer' }}>
            <div className="image-wrapper">
              <img src="/pic/econo.png" alt="Economy Car Rentals" />
              <p className="car-name">Economy Car Rentals</p>
            </div>
          </li>
          <li onClick={() => handleClick('van')} style={{ cursor: 'pointer' }}>
            <div className="image-wrapper">
              <img src="/pic/van.png" alt="Passenger Van Rentals" />
              <p className="car-name">Passenger Van Rentals</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PopularChoices;