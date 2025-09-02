import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import loginBg from '../assets/login_background.png';
import 'react-toastify/dist/ReactToastify.css';
import api from '../axiosConfig'
import axios from 'axios';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const isRTL = i18n.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'right' : 'left';

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    toast.error('Please fill in all fields');
    return;
  }

  try {
    const response = await fetch('https://survey-ink.com/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Display the error message from the backend if available
      const errorMessage = data.detail || data.error || 'Login failed';
      throw new Error(errorMessage);
    }

    const { access, refresh, user } = data;

    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    localStorage.setItem('user', JSON.stringify(user));

    toast.success('Login successful');

    const role = user.role || 'user';
    if (role === 'freelancer') {
      navigate('/freelancer-dashboard');
    } else if (role === 'researcher') {
      navigate('/researcher-dashboard');
    } else if (role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      toast.warning('Redirecting to home');
      navigate('/');
    }
  } catch (error) {
    console.error('Login error:', error);
    toast.error(error.message || 'Invalid credentials. Please try again.');
  }
};
  return (
    <div style={{ ...styles.page, direction }}>
      <img src={loginBg} alt="background" style={styles.backgroundSvg} />

      <ToastContainer />
      <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" style={styles.logo} />
      </div>

      <div style={styles.container}>
        <form style={styles.card} onSubmit={handleLogin}>
          <h2 style={{ ...styles.title, textAlign }}>
            {t('login_title') || 'Login'}
          </h2>
          
          <p style={{ ...styles.signupText, textAlign }}>
            New user?{' '}
            <a href="/signup" style={styles.signupLink}>
              Create an account
            </a>
          </p>
          <label style={styles.label}>Email address</label>
          <input
            type="email"
            placeholder={t('email_placeholder') || 'Email'}
            style={{ ...styles.input, direction }}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder={t('password_placeholder') || 'Password'}
            style={{ ...styles.input, direction }}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        <div style={styles.actionsRow}>
          <a href="/forgot-password" style={styles.forgot}>
            Forgot password?
          </a>

          <button type="submit" style={styles.button}>
            Login
          </button>
        </div>

        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    position: 'relative', // Add this
    height: '100vh',
    background: 'linear-gradient(91deg, rgba(255, 255, 255, 0.00) 0.52%, rgba(241, 147, 3, 0.32) 56.09%, rgba(57, 86, 146, 0.55) 99.35%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif',
    overflow: 'hidden', // So SVG doesn’t spill out
  },

  backgroundSvg: {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
  pointerEvents: 'none', // Prevent blocking clicks
  objectFit: 'cover',
  opacity: 0.2, // Optional: make it blend with gradient
  
},

  logoContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: 'transparent',
    marginRight: '150px',
  },
  logo: {
    maxWidth: '136px',
    maxHeight: '106px',
  },
  container: {
    display: 'flex',
    width: '90%',
    maxWidth: '560px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    marginRight: '266px',
  },
  card: {
    flex: 1,
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    justifyContent: 'center',
  },
  title: {
    fontSize: '35px',
    fontWeight: '600',
    color: '#395692',
    marginBottom: '0.5rem',
  },
  label: {
    color: '#395692',
    fontSize: '14px',
    fontWeight: '400',
  },
  input: {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    width: '100%',
  },
  forgot: {
    fontSize: '0.9rem',
    color: '#98A4BE',
    textDecoration: 'none',
    marginTop: '-0.5rem',
    marginBottom: '1rem',
    alignSelf: 'flex-start',
  },
  button: {
    // padding: '0.75rem',
    backgroundColor: '#F19303',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '40px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    width:'102px',
    height:'32px',
    justifyContent: "right",
    alignItems: "right",
  },
  signupText: {
    // marginTop: '1rem',
    // marginBottom:'20px',
    fontSize: '0.9rem',
    color: '#333',
    width:'243px',
    fontFamily:'Poppins'

    
  },
  signupLink: {
    color: '#F19303',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontFamily:'Poppins'
  },
  actionsRow: {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '-0.5rem',
},
};

export default Login;
