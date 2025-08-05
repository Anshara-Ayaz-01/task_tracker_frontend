// pages/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/signup', form);
      alert('Signup successful. Please login.');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  const backgroundStyle = {
    backgroundImage: 'url("https://img.freepik.com/premium-vector/abstract-blue-white-background-poster-with-dynamic-blue-white-business-presentation-background-with-modern-technology-network-concept-vector-illustration_181182-19557.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'sans-serif',
  };

  const cardStyle = {
    backgroundColor: 'rgba(67, 125, 201, 0.85)',
    color: '#fff',
    padding: '50px',
    borderRadius: '15px',
    width: '450px',
    boxShadow: '0 0 20px rgba(0,0,0,0.7)',
    textAlign: 'center',
    backdropFilter: 'blur(8px)',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '12px 0',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#3d2ecaff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '15px',
  };

  const linkStyle = {
    color: '#87CEFA',
    textDecoration: 'none',
  };

  return (
    <div style={backgroundStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: '30px' }}> Signup </h2>
        {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}> Register</button>
        </form>

        <p style={{ marginTop: '20px' }}>
          Already have an account? <a href="/" style={linkStyle}>Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
