import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        {/* Back Button */}
        <div style={{ 
          position: 'absolute', 
          top: '20px', 
          left: '20px',
          zIndex: 10
        }}>
          <span
            onClick={() => navigate('/')}
            style={{
              cursor: 'pointer',
              color: '#dd0707',
              fontSize: '14px',
              fontWeight: '500',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ff4444';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#dd0707';
            }}
          >
            ← Back
          </span>
        </div>

        <div className="contact-form">
          <h2>Your Details</h2>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name" 
              required 
            />
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@email.com" 
              required 
            />
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="03xxxxxxxxxx" 
              required 
            />
            <select 
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="">Message Subject</option>
              <option value="inquiry">Inquiry</option>
              <option value="support">Support</option>
              <option value="feedback">Feedback</option>
            </select>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter Your Message Here" 
              maxLength={250} 
              required
            ></textarea>
            <button type="submit" className="send-btn">Send</button>
          </form>
        </div>
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p><strong>Address:</strong> Alam Tower, 37-Commercial Zone, Liberty Market, Islamabad, Pakistan.</p>
          <p><strong>Phone:</strong> 042 - 111 CaRs (042 - 383 333 383)</p>
          <p><strong>Email:</strong> customersupport@alamventures.com</p>
          <h3>Operating Hours</h3>
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 10:00 AM - 4:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
      </div>
    </section>
  );
}