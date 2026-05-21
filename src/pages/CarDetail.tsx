import { useState, useEffect } from 'react';
import { useParams, useNavigate }from 'react-router-dom';

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
  description: string;
}

// Car data
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
    images: ['/pic/toyo.jpg', '/pic/toyin.jpg', '/pic/to.jpg'],
    features: [
      'Bluetooth, premium sound, and touchscreen',
      'Responsive 2.0L engine for dynamic driving',
      'Sleek British Green sporty design',
      'Precision steering for a thrilling drive',
      'ABS, traction control, and airbags'
    ],
    description: 'Experience the thrill of driving with the Toyota 86 British Green Limited.'
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
    images: ['/pic/econo.jpg', '/pic/econ.jpg', '/pic/econo.jpg'],
    features: [
      'Apple CarPlay, Android Auto, and Bluetooth',
      '1.6L engine offering smooth and efficient performance',
      'Modern and sleek design with compact efficiency',
      'Responsive handling and precise steering',
      'Safety features include ABS, traction control, and airbags'
    ],
    description: 'The Kia Rio 2018 is the perfect economy car for your daily commute.'
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
    images: ['/pic/s.jpg', '/pic/ss.jpg', '/pic/sss.jpg'],
    features: [
      'Apple CarPlay, Android Auto, and premium sound system',
      '3.8L V6 engine with 291 horsepower',
      'Stylish design with a spacious interior',
      'All-wheel drive with excellent handling',
      'Forward-collision warning and lane-keeping assist'
    ],
    description: 'The Hyundai Palisade 2021 offers luxury and space for the whole family.'
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
    features: [
      'Bluetooth connectivity, GPS navigation, rear-view camera',
      'Powerful V6 engine with excellent fuel efficiency',
      'Premium leather interior with climate control',
      'Ample legroom and luggage space',
      'Advanced airbags, ABS, and stability control'
    ],
    description: 'The Mercedes-Benz Sprinter 2012 is the ultimate passenger van.'
  }
];

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);
  const [formData, setFormData] = useState({
    customerName: '', customerEmail: '', customerPhone: '', pickupLocation: '', dropoffLocation: '',
    pickupDate: '', returnDate: '', driverAge: '', additionalRequests: '', insuranceOption: 'basic', paymentMethod: ''
  });
  const [priceDetails, setPriceDetails] = useState({
    days: 1,
    subtotal: 0,
    discount: 0,
    discountType: '',
    insuranceCost: 0,
    total: 0
  });

  useEffect(() => {
    const foundCar = carsData.find(c => c.id === id);
    if (foundCar) { setCar(foundCar); }
    else navigate('/services');
  }, [id, navigate]);

  useEffect(() => {
    if (car && car.images.length > 1) {
      const interval = setInterval(() => setSlideIndex((prev) => (prev + 1) % car.images.length), 2000);
      return () => clearInterval(interval);
    }
  }, [car]);

  // Calculate price based on dates
  const calculatePrice = (pickupDate: string, returnDate: string) => {
    if (!pickupDate || !returnDate || !car) return;
    
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    let subtotal = car.pricePerDay * days;
    let discount = 0;
    let discountType = '';
    
    if (days >= 30) {
      discount = subtotal * 0.20;
      discountType = 'Monthly Discount (20%)';
    } else if (days >= 7) {
      discount = subtotal * 0.10;
      discountType = 'Weekly Discount (10%)';
    }
    
    // Student discount (additional)
    if (formData.insuranceOption === 'student') {
      discount += subtotal * 0.15;
      discountType += discountType ? ' + Student Discount (15%)' : 'Student Discount (15%)';
    }
    
    // Senior discount (additional)
    if (formData.insuranceOption === 'senior') {
      discount += subtotal * 0.10;
      discountType += discountType ? ' + Senior Discount (10%)' : 'Senior Discount (10%)';
    }
    
    const insuranceCost = formData.insuranceOption === 'premium' ? 15 * days : 0;
    const total = subtotal - discount + insuranceCost;
    
    setPriceDetails({
      days,
      subtotal,
      discount,
      discountType,
      insuranceCost,
      total
    });
  };

  // Update when dates change
  useEffect(() => {
    calculatePrice(formData.pickupDate, formData.returnDate);
  }, [formData.pickupDate, formData.returnDate, formData.insuranceOption, car]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateBookingId = () => {
    return 'CARS-' + Math.random().toString(36).substr(2, 8).toUpperCase();
  };

  const confirmBooking = () => {
    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone || 
        !formData.pickupLocation || !formData.dropoffLocation || !formData.pickupDate || 
        !formData.returnDate || !formData.driverAge || !formData.paymentMethod) {
      alert('Please fill all required fields');
      return;
    }

    const insuranceText = formData.insuranceOption === 'premium' ? 'Premium Insurance (+$15/day)' : 
                          formData.insuranceOption === 'student' ? 'Student Discount (15%)' :
                          formData.insuranceOption === 'senior' ? 'Senior Discount (10%)' :
                          formData.insuranceOption === 'basic' ? 'Basic Insurance (Included)' : 'No Insurance';
    
    const booking = {
      bookingId: generateBookingId(),
      bookingDate: new Date().toLocaleString(),
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      carName: car?.name,
      carPrice: car?.pricePerDay,
      pickupLocation: formData.pickupLocation,
      dropoffLocation: formData.dropoffLocation,
      pickupDate: formData.pickupDate,
      returnDate: formData.returnDate,
      days: priceDetails.days,
      subtotal: priceDetails.subtotal,
      discount: priceDetails.discount,
      discountType: priceDetails.discountType,
      insuranceCost: priceDetails.insuranceCost,
      totalAmount: priceDetails.total,
      paymentMethod: formData.paymentMethod,
      insurance: insuranceText,
      additionalRequests: formData.additionalRequests || 'None'
    };
    
    setBookingData(booking);
    setShowSummary(true);
    setShowBookingForm(false);
    
    // Save to localStorage
    const allBookings = JSON.parse(localStorage.getItem('allBookings') || '[]');
    allBookings.push(booking);
    localStorage.setItem('allBookings', JSON.stringify(allBookings));
  };

  const downloadPDF = () => {
    if (!bookingData) return;
    
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>CaRS Booking Confirmation</title>
        <meta charset="UTF-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Poppins', Arial, sans-serif; padding: 40px; background: #fff; }
          .container { max-width: 800px; margin: 0 auto; }
          .header { text-align: center; border-bottom: 3px solid #dd0707; padding-bottom: 20px; margin-bottom: 20px; }
          .logo { font-size: 28px; font-weight: bold; color: #dd0707; }
          .subtitle { color: #666; margin-top: 5px; }
          .booking-id { background: #f5f5f5; padding: 12px; text-align: center; margin: 20px 0; border-radius: 8px; }
          .booking-id strong { color: #dd0707; }
          .section { margin: 20px 0; }
          .section-title { background: #dd0707; color: white; padding: 8px 12px; margin-bottom: 12px; border-radius: 5px; font-size: 14px; }
          .row { display: flex; margin: 6px 0; }
          .label { width: 140px; font-weight: bold; color: #333; }
          .value { flex: 1; color: #555; }
          .total-row { display: flex; justify-content: space-between; margin: 8px 0; }
          .total-amount { background: #f0f0f0; padding: 12px; text-align: center; font-size: 18px; font-weight: bold; margin-top: 15px; border-radius: 8px; }
          .total-amount span { color: #dd0707; font-size: 22px; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 11px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">CaRS Car Rental</div>
            <div class="subtitle">Booking Confirmation</div>
          </div>
          
          <div class="booking-id">
            <strong>Booking ID:</strong> ${bookingData.bookingId}<br>
            <small>Booked on: ${bookingData.bookingDate}</small>
          </div>
          
          <div class="section">
            <div class="section-title">🚗 VEHICLE DETAILS</div>
            <div class="row"><div class="label">Vehicle:</div><div class="value">${bookingData.carName}</div></div>
            <div class="row"><div class="label">Price per day:</div><div class="value">$${bookingData.carPrice}</div></div>
          </div>
          
          <div class="section">
            <div class="section-title">👤 CUSTOMER DETAILS</div>
            <div class="row"><div class="label">Name:</div><div class="value">${bookingData.customerName}</div></div>
            <div class="row"><div class="label">Email:</div><div class="value">${bookingData.customerEmail}</div></div>
            <div class="row"><div class="label">Phone:</div><div class="value">${bookingData.customerPhone}</div></div>
          </div>
          
          <div class="section">
            <div class="section-title">📅 RENTAL DETAILS</div>
            <div class="row"><div class="label">Pickup Location:</div><div class="value">${bookingData.pickupLocation}</div></div>
            <div class="row"><div class="label">Dropoff Location:</div><div class="value">${bookingData.dropoffLocation}</div></div>
            <div class="row"><div class="label">Pickup Date:</div><div class="value">${bookingData.pickupDate}</div></div>
            <div class="row"><div class="label">Return Date:</div><div class="value">${bookingData.returnDate}</div></div>
            <div class="row"><div class="label">Total Days:</div><div class="value">${bookingData.days}</div></div>
          </div>
          
          <div class="section">
            <div class="section-title">💰 PAYMENT SUMMARY</div>
            <div class="total-row"><div class="label">Subtotal:</div><div>$${bookingData.subtotal.toFixed(2)}</div></div>
            ${bookingData.discount > 0 ? `<div class="total-row" style="color:#4CAF50"><div class="label">${bookingData.discountType}:</div><div> -$${bookingData.discount.toFixed(2)}</div></div>` : ''}
            ${bookingData.insuranceCost > 0 ? `<div class="total-row"><div class="label">Premium Insurance:</div><div>+$${bookingData.insuranceCost.toFixed(2)}</div></div>` : ''}
            <div class="total-amount">
              Total Amount: <span>$${bookingData.totalAmount.toFixed(2)}</span>
            </div>
            <div class="row" style="margin-top:10px"><div class="label">Payment Method:</div><div class="value">${bookingData.paymentMethod}</div></div>
            <div class="row"><div class="label">Insurance:</div><div class="value">${bookingData.insurance}</div></div>
            <div class="row"><div class="label">Additional Requests:</div><div class="value">${bookingData.additionalRequests}</div></div>
          </div>
          
          <div class="footer">
            <p>Thank you for choosing CaRS Car Rental</p>
            <p>For support: 042-111-CaRS | support@cars.com</p>
            <p>Please carry this confirmation for pickup</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const closeSummary = () => {
    setShowSummary(false);
    setFormData({
      customerName: '', customerEmail: '', customerPhone: '', pickupLocation: '', dropoffLocation: '',
      pickupDate: '', returnDate: '', driverAge: '', additionalRequests: '', insuranceOption: 'basic', paymentMethod: ''
    });
  };

  const today = new Date().toISOString().split('T')[0];

  if (!car) return <div style={{ paddingTop: '100px', textAlign: 'center', color: 'white' }}>Loading...</div>;

  return (
    <>
      <header style={{ position: 'static', background: 'rgba(0,0,0,0.7)', padding: '5px 0' }}>
        <nav style={{ width: '90%', margin: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src="/c-logo.png" style={{ width: '120px' }} alt="Logo" />
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a>
            <a href="/services" style={{ color: '#fff', textDecoration: 'none' }}>Services</a>
            <a href="/about" style={{ color: '#fff', textDecoration: 'none' }}>About</a>
            <a href="/contact" style={{ color: '#fff', textDecoration: 'none' }}>Contact</a>
          </div>
        </nav>
      </header>

      <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Car Section */}
        <section style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', background: 'black', borderRadius: '8px', padding: '20px' }}>
          <div style={{ flex: '0 0 60%' }}>
            {car.images.map((img, idx) => (
              <img key={idx} src={img} alt={car.name} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px', display: slideIndex === idx ? 'block' : 'none' }} />
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: '#dd0707', marginBottom: '15px' }}>Vehicle Details</h2>
            <p style={{ color: '#ffffff', marginBottom: '8px' }}><strong>Brand:</strong> {car.brand}</p>
            <p style={{ color: '#ffffff', marginBottom: '8px' }}><strong>Model:</strong> {car.model}</p>
            <p style={{ color: '#ffffff', marginBottom: '8px' }}><strong>Price:</strong> ${car.pricePerDay}/day</p>
            <p style={{ color: '#ffffff', marginBottom: '8px' }}><strong>Seats:</strong> {car.seats}</p>
            <p style={{ color: '#ffffff', marginBottom: '8px' }}><strong>Transmission:</strong> {car.transmission}</p>
            <p style={{ color: '#ffffff', marginBottom: '8px' }}><strong>Fuel:</strong> {car.fuelType}</p>
            {car.features.map((f, i) => <div key={i} style={{ margin: '5px 0', color: '#ffffff' }}>✓ {f}</div>)}
          </div>
        </section>

        {/* Booking Button / Form */}
        {!showBookingForm ? (
          <button onClick={() => setShowBookingForm(true)} style={{ width: '100%', padding: '14px', background: '#dd0707', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}>
            📅 Book Now - ${car.pricePerDay}/day
          </button>
        ) : (
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px', marginTop: '20px' }}>
            <h3 style={{ color: '#dd0707', marginBottom: '15px' }}>Complete Booking Details</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input type="text" name="customerName" placeholder="Full Name *" value={formData.customerName} onChange={handleChange} style={{ padding: '10px', background: '#2a2a2a', border: '1px solid #444', borderRadius: '6px', color: '#ffffff' }} />
              <input type="email" name="customerEmail" placeholder="Email Address *" value={formData.customerEmail} onChange={handleChange} style={{ padding: '10px', background: '#2a2a2a', border: '1px solid #444', borderRadius: '6px', color: '#ffffff' }} />
              <input type="tel" name="customerPhone" placeholder="Phone Number *" value={formData.customerPhone} onChange={handleChange} style={{ padding: '10px', background: '#2a2a2a', border: '1px solid #444', borderRadius: '6px', color: '#ffffff' }} />
              <input type="number" name="driverAge" placeholder="Driver Age *" min="18" value={formData.driverAge} onChange={handleChange} style={{ padding: '10px', background: '#2a2a2a', border: '1px solid #444', borderRadius: '6px', color: '#ffffff' }} />
              
              <select name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} style={{ padding: '10px', background: '#2a2a2a', border: '1px solid #444', borderRadius: '6px', color: '#ffffff' }}>
                <option value="">Pickup Location *</option><option>Rawalpindi</option><option>Islamabad</option><option>Lahore</option>
              </select>
              <select name="dropoffLocation" value={formData.dropoffLocation} onChange={handleChange} style={{ padding: '10px', background: '#2a2a2a', border: '1px solid #444', borderRadius: '6px', color: '#ffffff' }}>
                <option value="">Dropoff Location *</option><option>Rawalpindi</option><option>Islamabad</option><option>Lahore</option>
              </select>
              
              <input type="date" name="pickupDate" min={today} value={formData.pickupDate} onChange={handleChange} style={{ padding: '10px', background: '#2a2a2a', border: '1px solid #444', borderRadius: '6px', color: '#ffffff' }} />
              <input type="date" name="returnDate" min={formData.pickupDate || today} value={formData.returnDate} onChange={handleChange} style={{ padding: '10px', background: '#2a2a2a', border: '1px solid #444', borderRadius: '6px', color: '#ffffff' }} />
              
              <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} style={{ padding: '10px', background: '#2a2a2a', border: '1px solid #444', borderRadius: '6px', color: '#ffffff' }}>
                <option value="">Payment Method *</option><option>Credit Card</option><option>Debit Card</option><option>Nayapay</option>
              </select>
              <select name="insuranceOption" value={formData.insuranceOption} onChange={handleChange} style={{ padding: '10px', background: '#2a2a2a', border: '1px solid #444', borderRadius: '6px', color: '#ffffff' }}>
                <option value="basic">Basic Insurance (Included)</option>
                <option value="premium">Premium Insurance (+$15/day)</option>
                <option value="student">Student Discount (15% off)</option>
                <option value="senior">Senior Discount (10% off)</option>
              </select>
            </div>
            
            <textarea name="additionalRequests" rows={2} placeholder="Additional Requests (GPS, child seat, etc.)" value={formData.additionalRequests} onChange={handleChange} style={{ width: '100%', marginTop: '15px', padding: '10px', background: '#2a2a2a', border: '1px solid #444', borderRadius: '6px', color: '#ffffff' }} />
            
            {/* Price Summary */}
            {formData.pickupDate && formData.returnDate && (
              <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
                <h4 style={{ color: '#dd0707', marginBottom: '10px' }}>💰 Price Summary</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ color: '#ffffff' }}>Daily Rate:</span>
                  <span style={{ color: '#ffffff' }}>${car.pricePerDay} × {priceDetails.days} days</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ color: '#ffffff' }}>Subtotal:</span>
                  <span style={{ color: '#ffffff' }}>${priceDetails.subtotal.toFixed(2)}</span>
                </div>
                {priceDetails.discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', color: '#4CAF50' }}>
                    <span>{priceDetails.discountType}:</span>
                    <span>-${priceDetails.discount.toFixed(2)}</span>
                  </div>
                )}
                {priceDetails.insuranceCost > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ color: '#ffffff' }}>Premium Insurance:</span>
                    <span style={{ color: '#ffffff' }}>+${priceDetails.insuranceCost.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '2px solid #dd0707' }}>
                  <strong style={{ color: '#dd0707', fontSize: '18px' }}>Total Amount:</strong>
                  <strong style={{ color: '#dd0707', fontSize: '18px' }}>${priceDetails.total.toFixed(2)}</strong>
                </div>
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button onClick={confirmBooking} style={{ flex: 1, padding: '12px', background: '#dd0707', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>✅ Confirm Booking</button>
              <button onClick={() => setShowBookingForm(false)} style={{ padding: '12px 20px', background: '#333', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        )}
      </div>

      {/* Booking Summary Modal with PDF Download */}
      {showSummary && bookingData && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 2000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ background: '#1a1a1a', borderRadius: '12px', maxWidth: '450px', width: '90%', maxHeight: '85vh', overflow: 'auto', border: '1px solid #dd0707' }}>
            <div style={{ background: '#dd0707', padding: '15px', textAlign: 'center' }}>
              <h2 style={{ margin: 0, color: 'white' }}>✅ Booking Confirmed!</h2>
            </div>
            
            <div style={{ padding: '20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ width: '60px', height: '60px', background: '#4CAF50', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px' }}>✓</div>
                <p style={{ color: '#aaa', marginTop: '10px' }}>Booking ID: {bookingData.bookingId}</p>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <h4 style={{ color: '#dd0707' }}>🚗 Vehicle Details</h4>
                <div style={{ background: '#2a2a2a', padding: '10px', borderRadius: '8px' }}>
                  <p style={{ color: '#ffffff' }}><strong>Vehicle:</strong> {bookingData.carName}</p>
                  <p style={{ color: '#ffffff' }}><strong>Price:</strong> ${bookingData.carPrice}/day</p>
                </div>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <h4 style={{ color: '#dd0707' }}>👤 Customer Details</h4>
                <div style={{ background: '#2a2a2a', padding: '10px', borderRadius: '8px' }}>
                  <p style={{ color: '#ffffff' }}><strong>Name:</strong> {bookingData.customerName}</p>
                  <p style={{ color: '#ffffff' }}><strong>Email:</strong> {bookingData.customerEmail}</p>
                  <p style={{ color: '#ffffff' }}><strong>Phone:</strong> {bookingData.customerPhone}</p>
                </div>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <h4 style={{ color: '#dd0707' }}>📅 Rental Details</h4>
                <div style={{ background: '#2a2a2a', padding: '10px', borderRadius: '8px' }}>
                  <p style={{ color: '#ffffff' }}><strong>Pickup:</strong> {bookingData.pickupLocation} ({bookingData.pickupDate})</p>
                  <p style={{ color: '#ffffff' }}><strong>Dropoff:</strong> {bookingData.dropoffLocation} ({bookingData.returnDate})</p>
                  <p style={{ color: '#ffffff' }}><strong>Days:</strong> {bookingData.days}</p>
                </div>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: '#dd0707' }}>💰 Total Amount</h4>
                <div style={{ background: '#2a2a2a', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#dd0707' }}>${bookingData.totalAmount.toFixed(2)}</p>
                  <p style={{ color: '#ffffff' }}><strong>Payment:</strong> {bookingData.paymentMethod}</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={downloadPDF} style={{ flex: 1, padding: '12px', background: '#dd0707', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                  📄 Download PDF Confirmation
                </button>
                <button onClick={closeSummary} style={{ padding: '12px 20px', background: '#333', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer style={{ background: 'rgba(0,0,0,0.9)', textAlign: 'center', padding: '20px', marginTop: '40px' }}>
        <p style={{ color: '#ffffff' }}>&copy; 2024 CaRS Car Rentals | All Rights Reserved</p>
      </footer>
    </>
  );
}