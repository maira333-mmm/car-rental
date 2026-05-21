import React from 'react';

interface CarFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CarFilter: React.FC<CarFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="sidebar_widget">
      <h5>Filter By Car Type</h5>
      <select 
        id="car-type-filter" 
        className="form-control"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="all">All Types</option>
        <option value="luxury">Luxury</option>
        <option value="economy">Economy</option>
        <option value="suv">SUV</option>
        <option value="van">Van</option>
      </select>
    </div>
  );
};

export default CarFilter;