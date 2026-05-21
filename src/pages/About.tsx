import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  return (
    <>
      <div className="about-container-classic">
        {/* Simple Back Link - No Container */}
        <div style={{ marginBottom: '30px' }}>
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

        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{
            background: '#dd0707',
            padding: '4px 16px',
            borderRadius: '25px',
            fontSize: '13px',
            fontWeight: '500',
            display: 'inline-block',
            marginBottom: '15px',
            color: '#ffffff'
          }}>
            About CaRS
          </span>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #ffffff, #dd0707)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: '15px'
          }}>
            Our Story
          </h1>
          <p style={{ color: '#ffffff', maxWidth: '600px', margin: '0 auto', opacity: 0.8 }}>
            Learn more about who we are and what drives us
          </p>
        </div>
        
        {/* Image Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
          borderRadius: '16px',
          padding: '20px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(221,7,7,0.3)',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <img 
            src="/pic/crent.jpg" 
            alt="Car Rental Image" 
            style={{
              width: '100%',
              maxWidth: '500px',
              height: 'auto',
              borderRadius: '12px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.3)'
            }}
          />
        </div>

        {/* Mission Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
          borderRadius: '16px',
          padding: '25px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(221,7,7,0.3)',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: '#dd0707',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 'bold',
              color: 'white'
            }}>
              M
            </div>
            <h2 style={{ color: '#dd0707', margin: 0, fontSize: '1.5rem' }}>Our Mission</h2>
          </div>
          <p style={{ color: '#ffffff', lineHeight: '1.8', margin: 0 }}>
            Founded in 2024, our car rental service aims to revolutionize the way people rent vehicles in Pakistan. 
            Our mission is to provide a seamless online experience, allowing customers to easily book cars that meet their needs.
          </p>
        </div>

        {/* Vision Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
          borderRadius: '16px',
          padding: '25px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(221,7,7,0.3)',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: '#dd0707',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 'bold',
              color: 'white'
            }}>
              V
            </div>
            <h2 style={{ color: '#dd0707', margin: 0, fontSize: '1.5rem' }}>Our Vision</h2>
          </div>
          <p style={{ color: '#ffffff', lineHeight: '1.8', margin: 0 }}>
            Our platform is designed to assist users in selecting from a diverse range of vehicles while ensuring 
            the highest quality of service. We believe in building a community around car rental that fosters trust and convenience.
          </p>
        </div>

        {/* Why Choose Us Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
          borderRadius: '16px',
          padding: '25px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(221,7,7,0.3)',
          marginBottom: '30px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: '#dd0707',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 'bold',
              color: 'white'
            }}>
              W
            </div>
            <h2 style={{ color: '#dd0707', margin: 0, fontSize: '1.5rem' }}>Why Choose Us?</h2>
          </div>
          <p style={{ color: '#ffffff', lineHeight: '1.8', margin: 0 }}>
            With a user-friendly interface and dedicated customer support, we aim to cater to everyone's automotive needs, 
            whether it's for leisure or business purposes. Our extensive range of vehicles is just a click away!
          </p>
        </div>

        {/* Stats Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            textAlign: 'center',
            padding: '20px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(221,7,7,0.2)'
          }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#dd0707' }}>2024</div>
            <div style={{ color: '#ffffff', fontSize: '13px', opacity: 0.7 }}>Founded</div>
          </div>
          <div style={{
            textAlign: 'center',
            padding: '20px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(221,7,7,0.2)'
          }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#dd0707' }}>4+</div>
            <div style={{ color: '#ffffff', fontSize: '13px', opacity: 0.7 }}>Premium Cars</div>
          </div>
          <div style={{
            textAlign: 'center',
            padding: '20px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(221,7,7,0.2)'
          }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#dd0707' }}>3</div>
            <div style={{ color: '#ffffff', fontSize: '13px', opacity: 0.7 }}>Cities</div>
          </div>
          <div style={{
            textAlign: 'center',
            padding: '20px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(221,7,7,0.2)'
          }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#dd0707' }}>24/7</div>
            <div style={{ color: '#ffffff', fontSize: '13px', opacity: 0.7 }}>Support</div>
          </div>
        </div>

        {/* Quote Section - White Text */}
        <div style={{
          textAlign: 'center',
          padding: '35px',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '16px',
          borderTop: '1px solid rgba(221,7,7,0.3)',
          borderBottom: '1px solid rgba(221,7,7,0.3)'
        }}>
          <p style={{
            fontSize: '1.3rem',
            fontStyle: 'italic',
            color: '#ffffff',
            fontWeight: '400',
            margin: 0,
            letterSpacing: '1px'
          }}>
            “THINK renting, THINK CaRS!”
          </p>
        </div>
      </div>

      <style>{`
        .about-container-classic {
          max-width: 1000px;
          margin: 30px auto 0;
          padding: 20px;
        }
        
        @media (max-width: 768px) {
          .about-container-classic {
            margin: 20px auto 0;
            padding: 15px;
          }
          .about-container-classic h1 {
            font-size: 2rem;
          }
          div[style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}