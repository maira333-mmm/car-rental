import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    city: 'Rawalpindi',
    gender: '',
    age: '18'
  });
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    
    const usernamePattern = /^[a-zA-Z_-]+$/;
    if (!usernamePattern.test(formData.username)) {
      setUsernameError('Username can only contain letters, underscores, and dashes.');
      isValid = false;
    } else {
      setUsernameError('');
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(formData.password)) {
      setPasswordError('Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (formData.password !== formData.confirm_password) {
      setConfirmPasswordError('Passwords do not match.');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem('user', JSON.stringify(formData));
      navigate('/signin');
    }
  };

  return (
    <div className="signup-body">
      <div className="signup-container">
        <div className="home-link">
          <Link to="/">HOME</Link>
        </div>
        <h2>Car Rental Registration</h2>
        <form onSubmit={handleSubmit}>
          <table cellSpacing="4">
            <tbody>
              <tr>
                <td><label htmlFor="full_name">Full Name:</label></td>
                <td>
                  <input 
                    type="text" 
                    name="full_name" 
                    id="full_name" 
                    placeholder="Please enter your full name" 
                    pattern="[a-zA-Z\s]+" 
                    title="Only alphabets and spaces are allowed" 
                    value={formData.full_name}
                    onChange={handleChange}
                    required 
                  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="username">Username:</label></td>
                <td>
                  <input 
                    type="text" 
                    name="username" 
                    id="username" 
                    placeholder="Username" 
                    value={formData.username}
                    onChange={handleChange}
                    required 
                  />
                  <div className="error-message">{usernameError}</div>
                </td>
              </tr>
              <tr>
                <td><label htmlFor="email">Email:</label></td>
                <td>
                  <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="Email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="phone">Phone Number:</label></td>
                <td>
                  <input 
                    type="tel" 
                    name="phone" 
                    id="phone" 
                    placeholder="Phone Number" 
                    pattern="[0-9]+" 
                    title="Only numbers are allowed" 
                    value={formData.phone}
                    onChange={handleChange}
                    required 
                  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="password">Password:</label></td>
                <td>
                  <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Password" 
                    minLength={8} 
                    value={formData.password}
                    onChange={handleChange}
                    required 
                  />
                  <div className="error-message">{passwordError}</div>
                </td>
              </tr>
              <tr>
                <td><label htmlFor="confirm_password">Confirm Password:</label></td>
                <td>
                  <input 
                    type="password" 
                    name="confirm_password" 
                    id="confirm_password" 
                    placeholder="Confirm Password" 
                    value={formData.confirm_password}
                    onChange={handleChange}
                    required 
                  />
                  <div className="error-message">{confirmPasswordError}</div>
                </td>
              </tr>
              <tr>
                <td><label htmlFor="city">City:</label></td>
                <td>
                  <select name="city" id="city" value={formData.city} onChange={handleChange}>
                    <option>Islamabad</option>
                    <option selected={formData.city === 'Rawalpindi'}>Rawalpindi</option>
                    <option>Lahore</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Gender:</td>
                <td className="gender-section">
                  <label><input type="radio" name="gender" value="male" onChange={handleChange} required /> Male</label>
                  <label><input type="radio" name="gender" value="female" onChange={handleChange} /> Female</label>
                  <label><input type="radio" name="gender" value="other" onChange={handleChange} /> Prefer not to say</label>
                </td>
              </tr>
              <tr>
                <td><label htmlFor="age">Age:</label></td>
                <td>
                  <input 
                    type="number" 
                    name="age" 
                    id="age" 
                    value={formData.age} 
                    min="18" 
                    max="75" 
                    onChange={handleChange}
                    required 
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;