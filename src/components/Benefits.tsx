import React from 'react';

const Benefits: React.FC = () => {
  return (
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
          <p>Know exactly what you’re paying.</p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;