import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  pricePerDay: number;
  seats: number;
  transmission: string;
  fuelType: string;
  category: string;
  images: string[];
  features: string[];
}

// Car data - EXACT same as your original
const carsData: Car[] = [
  {
    id: 'luxury-1',
    name: 'Toyota 86 British Green Limited',
    brand: 'Toyota',
    model: '86 British Green Limited',
    year: 2019,
    pricePerDay: 200,
    seats: 2,
    transmission: 'Manual',
    fuelType: 'Petrol',
    category: 'luxury',
    images: ['/pic/toyot.jpg', '/pic/toyo.jpg', '/pic/toyin.jpg'],
    features: ['Bluetooth, premium sound', '2.0L engine', 'Sporty design']
  },
  {
    id: 'economy-1',
    name: 'Kia Rio 2018',
    brand: 'Kia',
    model: 'Rio',
    year: 2018,
    pricePerDay: 90,
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    category: 'economy',
    images: ['/pic/econo.jpg', '/pic/econ.jpg'],
    features: ['Apple CarPlay', '1.6L engine', 'Bluetooth']
  },
  {
    id: 'suv-1',
    name: 'Hyundai Palisade 2021',
    brand: 'Hyundai',
    model: 'Palisade',
    year: 2021,
    pricePerDay: 150,
    seats: 7,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    category: 'suv',
    images: ['/pic/ssss.jpg', '/pic/s.jpg', '/pic/ss.jpg'],
    features: ['Premium sound', '3.8L V6 engine', 'All-wheel drive']
  },
  {
    id: 'van-1',
    name: 'Mercedes-Benz Sprinter 2012',
    brand: 'Mercedes-Benz',
    model: 'Sprinter',
    year: 2012,
    pricePerDay: 100,
    seats: 12,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    category: 'van',
    images: ['/pic/v.jpg', '/pic/vv.jpg', '/pic/vvv.jpg'],
    features: ['GPS navigation', 'V6 engine', 'Premium leather']
  }
];

export default function Services() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredCars, setFilteredCars] = useState(carsData);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
      filterCars(category);
    }
  }, [searchParams]);

  const filterCars = (category: string) => {
    if (category === 'all') {
      setFilteredCars(carsData);
    } else {
      setFilteredCars(carsData.filter(car => car.category === category));
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterCars(category);
  };

  return (
    <>
      {/* Header Section - WITHOUT Sign In/Sign Up */}
      <header style={{ position: 'static', backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '5px 0', marginBottom: '10px' }}>
        <nav style={{ width: '90%', margin: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src="/c-logo.png" style={{ width: '120px' }} alt="Car Rental Logo" />
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a>
            <a href="/about" style={{ color: '#fff', textDecoration: 'none' }}>About Us</a>
            <a href="/contact" style={{ color: '#fff', textDecoration: 'none' }}>Contact Us</a>
          </div>
        </nav>
      </header>

      {/* Page Header */}
      <section className="page-header" style={{ background: '#dd0707', color: 'white', padding: '40px 0', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '3rem', fontWeight: 'bold', color: 'white', letterSpacing: '2px' }}>Welcome to Our Car Rental Services</h1>
        <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.25rem', color: 'white', lineHeight: '1.5', fontWeight: '300', letterSpacing: '1px' }}>Find the best car rental deals suited to your needs</p>
      </section>

      {/* Listing Section */}
      <section className="listing-page py-5" style={{ padding: '50px 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
          <div className="row" style={{ display: 'flex', flexWrap: 'wrap', marginRight: '-15px', marginLeft: '-15px' }}>
            
            {/* Car Listings - 9 columns */}
            <div className="col-md-9" style={{ flex: '0 0 75%', maxWidth: '75%', paddingRight: '15px', paddingLeft: '15px' }}>
              <div className="sorting-count mb-3">
                <p><span>{filteredCars.length} Listings</span></p>
              </div>

              {filteredCars.map((car) => (
                <div key={car.id} className="card mb-4" style={{ backgroundColor: 'transparent', border: '1px solid #ddd', marginBottom: '20px' }}>
                  <div className="row no-gutters" style={{ display: 'flex', flexWrap: 'wrap', marginRight: '0', marginLeft: '0' }}>
                    <div className="col-md-4" style={{ flex: '0 0 33.333%', maxWidth: '33.333%' }}>
                      <img src={car.images[0]} className="card-img" alt={car.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
                    </div>
                    <div className="col-md-8" style={{ flex: '0 0 66.667%', maxWidth: '66.667%' }}>
                      <div className="card-body" style={{ padding: '20px' }}>
                        <h5 className="card-title" style={{ color: 'white', marginBottom: '10px' }}>{car.name}</h5>
                        <p className="card-text list-price" style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'white' }}>${car.pricePerDay} Per Day</p>
                        <ul style={{ paddingLeft: '0', listStyle: 'none', marginBottom: '15px' }}>
                          <li style={{ display: 'inline-block', marginRight: '15px', color: 'white' }}><i className="fa fa-user" aria-hidden="true"></i> {car.seats} seats</li>
                          <li style={{ display: 'inline-block', marginRight: '15px', color: 'white' }}><i className="fa fa-calendar" aria-hidden="true"></i> {car.year} model</li>
                          <li style={{ display: 'inline-block', marginRight: '15px', color: 'white' }}><i className="fa fa-car" aria-hidden="true"></i> {car.fuelType}</li>
                        </ul>
                        <a href={`/car/${car.id}`} className="btn btn-primary" style={{ backgroundColor: '#c20606', borderColor: '#c20606', color: 'white', padding: '8px 16px', borderRadius: '4px', textDecoration: 'none', display: 'inline-block' }}>View Details</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar Widget - 3 columns */}
            <div className="col-md-3" style={{ flex: '0 0 25%', maxWidth: '25%', paddingRight: '15px', paddingLeft: '15px' }}>
              <div className="sidebar_widget" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '20px', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <h5 style={{ fontWeight: 'bold', marginBottom: '15px', color: 'white' }}>Filter By Car Type</h5>
                <select 
                  id="car-type-filter" 
                  className="form-control" 
                  value={selectedCategory}
                  onChange={handleFilterChange}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#fff', color: '#000' }}
                >
                  <option value="all">All Types</option>
                  <option value="luxury">Luxury</option>
                  <option value="economy">Economy</option>
                  <option value="suv">SUV</option>
                  <option value="van">Van</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer style={{ backgroundColor: 'rgba(64, 64, 64, 0.7)', padding: '1rem', textAlign: 'center' }}>
        <p style={{ color: '#ccc', margin: '0' }}>&copy; 2024 CaRS.com | All rights reserved.</p>
      </footer>

      {/* Add Bootstrap CSS if not already present */}
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
    </>
  );
}