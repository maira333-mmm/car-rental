import React, { useState, useEffect } from 'react';

interface PriceCalculatorProps {
  carPrice: number;
  carName: string;
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({ carPrice, carName }) => {
  const [days, setDays] = useState(1);
  const [insurance, setInsurance] = useState(false);
  const [studentDiscount, setStudentDiscount] = useState(false);
  const [seniorDiscount, setSeniorDiscount] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoMessage, setPromoMessage] = useState('');
  
  const [subtotal, setSubtotal] = useState(carPrice);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [insuranceCost, setInsuranceCost] = useState(0);
  const [totalPrice, setTotalPrice] = useState(carPrice);
  
  const insuranceRate = 15;
  
  const validPromoCodes = [
    { code: 'WELCOME10', discount: 10, type: 'percent', message: 'Welcome! 10% off applied!' },
    { code: 'FLAT20', discount: 20, type: 'fixed', message: 'Flat $20 off applied!' },
    { code: 'SPECIAL15', discount: 15, type: 'percent', message: 'Special 15% off applied!' },
    { code: 'SAVE30', discount: 30, type: 'fixed', message: 'Save $30 on your booking!' },
    { code: 'CARS2024', discount: 25, type: 'percent', message: '2024 Special! 25% off applied!' },
    { code: 'STUDENT25', discount: 25, type: 'percent', message: 'Student Special! 25% off!' },
    { code: 'WEEKEND20', discount: 20, type: 'percent', message: 'Weekend Getaway! 20% off!' }
  ];
  
  useEffect(() => {
    let discount = 0;
    let insuranceAmt = insurance ? insuranceRate * days : 0;
    
    // Weekly discount (7+ days = 10% off)
    if (days >= 7 && days < 30) {
      discount += carPrice * days * 0.10;
    }
    
    // Monthly discount (30+ days = 20% off)
    if (days >= 30) {
      discount += carPrice * days * 0.20;
    }
    
    // Student discount (15% off)
    if (studentDiscount) {
      discount += carPrice * days * 0.15;
    }
    
    // Senior discount (10% off)
    if (seniorDiscount) {
      discount += carPrice * days * 0.10;
    }
    
    // Promo code discount
    if (promoApplied && promoCode) {
      const promo = validPromoCodes.find(p => p.code === promoCode);
      if (promo) {
        if (promo.type === 'percent') {
          discount += carPrice * days * (promo.discount / 100);
        } else {
          discount += promo.discount;
        }
      }
    }
    
    const subtotalAmount = carPrice * days;
    const finalTotal = subtotalAmount - discount + insuranceAmt;
    
    setSubtotal(subtotalAmount);
    setDiscountAmount(discount);
    setInsuranceCost(insuranceAmt);
    setTotalPrice(finalTotal);
  }, [days, insurance, studentDiscount, seniorDiscount, promoApplied, carPrice, promoCode]);
  
  const applyPromoCode = () => {
    if (!promoCode.trim()) {
      setPromoMessage('Please enter a promo code');
      setTimeout(() => setPromoMessage(''), 3000);
      return;
    }
    
    const found = validPromoCodes.find(p => p.code === promoCode.toUpperCase());
    if (found) {
      setPromoApplied(true);
      setPromoMessage(`✓ ${found.message}`);
      setTimeout(() => setPromoMessage(''), 3000);
    } else {
      setPromoMessage('✗ Invalid promo code');
      setTimeout(() => setPromoMessage(''), 3000);
    }
  };
  
  const removePromo = () => {
    setPromoApplied(false);
    setPromoCode('');
    setPromoMessage('Promo code removed');
    setTimeout(() => setPromoMessage(''), 2000);
  };
  
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };
  
  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)',
      borderRadius: '12px',
      padding: '20px',
      marginTop: '20px',
      border: '1px solid rgba(221,7,7,0.3)'
    }}>
      <h3 style={{ color: '#dd0707', marginBottom: '15px', fontSize: '18px' }}>
        💰 AI Smart Price Calculator
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {/* Days Selection */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#fff' }}>
            Number of Days: 
            <span style={{ color: '#dd0707', marginLeft: '10px' }}>{days} day(s)</span>
          </label>
          <input
            type="range"
            min="1"
            max="60"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value))}
            style={{
              width: '100%',
              height: '6px',
              borderRadius: '3px',
              background: '#444',
              WebkitAppearance: 'none'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
            <span style={{ fontSize: '11px', color: '#aaa' }}>1 day</span>
            <span style={{ fontSize: '11px', color: '#4CAF50' }}>7 days (10% off)</span>
            <span style={{ fontSize: '11px', color: '#4CAF50' }}>30 days (20% off)</span>
          </div>
        </div>
        
        {/* Insurance Option */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="checkbox"
            id="insurance"
            checked={insurance}
            onChange={(e) => setInsurance(e.target.checked)}
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />
          <label htmlFor="insurance" style={{ color: '#fff', cursor: 'pointer' }}>
            🛡️ Premium Insurance (+${insuranceRate}/day) - Full coverage, theft protection, roadside assistance
          </label>
        </div>
        
        {/* Student Discount */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="checkbox"
            id="student"
            checked={studentDiscount}
            onChange={(e) => setStudentDiscount(e.target.checked)}
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />
          <label htmlFor="student" style={{ color: '#fff', cursor: 'pointer' }}>
            🎓 Student Discount (15% off) - Valid student ID required at pickup
          </label>
        </div>
        
        {/* Senior Discount */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="checkbox"
            id="senior"
            checked={seniorDiscount}
            onChange={(e) => setSeniorDiscount(e.target.checked)}
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />
          <label htmlFor="senior" style={{ color: '#fff', cursor: 'pointer' }}>
            👴 Senior Citizen Discount (10% off) - Age 60+ only, valid ID required
          </label>
        </div>
        
        {/* Promo Code */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#fff' }}>
            🎁 Promo Code:
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              placeholder="Enter promo code"
              disabled={promoApplied}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #444',
                backgroundColor: '#2a2a2a',
                color: 'white',
                outline: 'none'
              }}
            />
            {!promoApplied ? (
              <button
                onClick={applyPromoCode}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#dd0707',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Apply
              </button>
            ) : (
              <button
                onClick={removePromo}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#333',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            )}
          </div>
          {promoMessage && (
            <p style={{ fontSize: '12px', marginTop: '5px', color: promoMessage.includes('✓') ? '#4CAF50' : '#ff4444' }}>
              {promoMessage}
            </p>
          )}
          <div style={{ marginTop: '8px', fontSize: '11px', color: '#aaa', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ background: '#333', padding: '2px 6px', borderRadius: '4px' }}>WELCOME10</span>
            <span style={{ background: '#333', padding: '2px 6px', borderRadius: '4px' }}>FLAT20</span>
            <span style={{ background: '#333', padding: '2px 6px', borderRadius: '4px' }}>SPECIAL15</span>
            <span style={{ background: '#333', padding: '2px 6px', borderRadius: '4px' }}>SAVE30</span>
            <span style={{ background: '#333', padding: '2px 6px', borderRadius: '4px' }}>CARS2024</span>
            <span style={{ background: '#333', padding: '2px 6px', borderRadius: '4px' }}>STUDENT25</span>
            <span style={{ background: '#333', padding: '2px 6px', borderRadius: '4px' }}>WEEKEND20</span>
          </div>
        </div>
        
        {/* Price Breakdown */}
        <div style={{
          marginTop: '15px',
          paddingTop: '15px',
          borderTop: '1px solid #333'
        }}>
          <h4 style={{ color: '#dd0707', marginBottom: '10px', fontSize: '14px' }}>📊 Price Breakdown:</h4>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#aaa' }}>{carName}:</span>
            <span style={{ color: '#fff' }}>{formatPrice(carPrice)} × {days} days</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#aaa' }}>Subtotal:</span>
            <span style={{ color: '#fff' }}>{formatPrice(subtotal)}</span>
          </div>
          
          {(days >= 7 || studentDiscount || seniorDiscount || promoApplied) && (
            <div style={{ marginBottom: '8px', paddingTop: '5px', borderTop: '1px dashed #333' }}>
              <span style={{ color: '#4CAF50', fontSize: '12px' }}>✨ Discounts Applied:</span>
              
              {days >= 7 && days < 30 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                  <span style={{ color: '#4CAF50', fontSize: '12px' }}>Weekly Discount (10% off):</span>
                  <span style={{ color: '#4CAF50', fontSize: '12px' }}>-{formatPrice(carPrice * days * 0.10)}</span>
                </div>
              )}
              
              {days >= 30 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                  <span style={{ color: '#4CAF50', fontSize: '12px' }}>Monthly Discount (20% off):</span>
                  <span style={{ color: '#4CAF50', fontSize: '12px' }}>-{formatPrice(carPrice * days * 0.20)}</span>
                </div>
              )}
              
              {studentDiscount && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                  <span style={{ color: '#4CAF50', fontSize: '12px' }}>Student Discount (15% off):</span>
                  <span style={{ color: '#4CAF50', fontSize: '12px' }}>-{formatPrice(carPrice * days * 0.15)}</span>
                </div>
              )}
              
              {seniorDiscount && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                  <span style={{ color: '#4CAF50', fontSize: '12px' }}>Senior Discount (10% off):</span>
                  <span style={{ color: '#4CAF50', fontSize: '12px' }}>-{formatPrice(carPrice * days * 0.10)}</span>
                </div>
              )}
            </div>
          )}
          
          {insurance && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#aaa' }}>Premium Insurance:</span>
              <span style={{ color: '#fff' }}>+{formatPrice(insuranceCost)}</span>
            </div>
          )}
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '2px solid #dd0707' }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#dd0707' }}>💰 Total Amount:</span>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#dd0707' }}>{formatPrice(totalPrice)}</span>
          </div>
          
          {discountAmount > 0 && (
            <div style={{ marginTop: '8px', textAlign: 'center', padding: '8px', background: 'rgba(76,175,80,0.1)', borderRadius: '6px' }}>
              <span style={{ fontSize: '13px', color: '#4CAF50' }}>
                🎉 You saved {formatPrice(discountAmount)} with discounts! 🎉
              </span>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #dd0707;
          cursor: pointer;
          box-shadow: 0 0 5px #dd0707;
        }
      `}</style>
    </div>
  );
};

export default PriceCalculator;