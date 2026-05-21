import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car } from '../data/cars';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const navigate = useNavigate();

  return (
    <div className="card mb-4 car">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={car.images[0]} className="card-img" alt={car.name} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{car.name}</h5>
            <p className="card-text list-price">${car.pricePerDay} Per Day</p>
            <ul>
              <li><i className="fa fa-user" aria-hidden="true"></i> {car.seats} seats</li>
              <li><i className="fa fa-calendar" aria-hidden="true"></i> {car.year} model</li>
              <li><i className="fa fa-car" aria-hidden="true"></i> {car.fuelType}</li>
            </ul>
            <button onClick={() => navigate(`/car/${car.id}`)} className="btn btn-primary">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;