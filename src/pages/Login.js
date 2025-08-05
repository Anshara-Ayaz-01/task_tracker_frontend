import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // ✅ Import axios instance

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/login', form); // ✅ Base URL and withCredentials are already configured
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed. Please check your credentials.');
      console.error(err);
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
    color: '#3d2ecaff',
    textDecoration: 'none',
  };

  return (
    <div style={backgroundStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: '30px' }}> User Login Portal </h2>
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
          <button type="submit" style={buttonStyle}>Login</button>
        </form>

        <p style={{ marginTop: '20px' }}>
          Don't have an account? <a href="/signup" style={linkStyle}>Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
