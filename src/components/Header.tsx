import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <header>
      <nav>
        <div className="logo">
          <img src="/c-logo.png" alt="Logo" />
        </div>
        <div className="menu">
          <Link to="/" style={{ color: location.pathname === '/' ? '#dd0707' : '#fff' }}>Home</Link>
          <Link to="/services" style={{ color: location.pathname === '/services' ? '#dd0707' : '#fff' }}>Services</Link>
          <Link to="/about" style={{ color: location.pathname === '/about' ? '#dd0707' : '#fff' }}>About Us</Link>
          <Link to="/contact" style={{ color: location.pathname === '/contact' ? '#dd0707' : '#fff' }}>Contact Us</Link>

        </div>
      </nav>
    </header>
  );
}