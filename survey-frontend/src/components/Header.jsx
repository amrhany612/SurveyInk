import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/HomeLogo.png';
import { styles } from '../style';
import profileIcon from '../assets/profile-circle_svgrepo.com.svg';
import { useLocation } from 'react-router-dom';

function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const location = useLocation();
  const isProfilePage = location.pathname.startsWith('/profile');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access');
      const response = await fetch('http://127.0.0.1:8000/api/logout/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        localStorage.removeItem('access');
        navigate('/login', { replace: true });
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleProfileMenu = () => {
    setProfileMenuOpen((prev) => !prev);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    // { to: '/services', label: 'Services' },
    { to: '/about', label: 'About us' },
    { to: '/contact', label: 'Contact us' },
  ];

  const authLinks = [
    { to: '/login', label: 'Login' },
    { to: '/signup', label: 'Sign Up' },
  ];

  const isAuthenticated = !!localStorage.getItem('access');

  return (
<header
  style={{
    display: 'flex',
    alignItems: 'center',
    padding: '0 40px',
    height: '70px',
    gap: '20px',
    background: isProfilePage
      ? 'transparent' // خلفية البروفايل
      : '#ffffff', // الخلفية الافتراضية
    color: isProfilePage ? '#fff' : '#000',
    transition: 'background 0.3s ease',
  }}
>
      {/* Left - Logo */}
      <div style={{ flexShrink: 0 }}>
        <img
          src={logo}
          alt="SURVEY INK Logo"
          style={{
            height: '35px',
            width: '68px',
          }}
        />
      </div>

      {/* Center - Navigation Links */}
      <nav
        style={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
        }}
      >
        {navLinks.map((link, index) => (
          <Link
            key={`nav-${index}`}
            to={link.to}
            onMouseEnter={() => setHoveredLink(`nav-${index}`)}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              color: '#000000',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '16px',
              textTransform: 'uppercase',
              padding: '0.5rem 0',
              borderBottom: hoveredLink === `nav-${index}` ? '2px solid #000' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Right - Language + Profile or Auth */}
      <div
        style={{
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'center',
          flexShrink: 0,
          position: 'relative',
        }}
      >
        {/* Language Dropdown */}
        <select
          onChange={(e) => changeLanguage(e.target.value)}
          value={i18n.language}
          style={{
            backgroundColor: '#FFFFFF',
            color: '#000000',
            border: '1px solid #000000',
            padding: '0.3rem 0.6rem',
          }}
        >
          <option value="en">EN</option>
          <option value="ar">AR</option>
        </select>

        {/* Auth Links or Profile */}
        {isAuthenticated ? (
          <div style={{ position: 'relative' }}>
            <img
              src={profileIcon}
              alt="Profile"
              title="Profile"
              style={{ width: '43px', height: '43px', cursor: 'pointer' }}
              onClick={toggleProfileMenu}
            />
            {profileMenuOpen && (
              <div
                ref={profileMenuRef}
                style={{
                  position: 'absolute',
                  top: '60px',
                  right: 0,
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  zIndex: 1000,
                  width: '150px',
                  fontSize: '14px',
                }}
              >
                <Link
                  to="/profile"
                  style={{
                    display: 'block',
                    padding: '10px 15px',
                    textDecoration: 'none',
                    color: '#000',
                    borderBottom: '1px solid #ddd',
                  }}
                  onClick={() => setProfileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={(e) => {
                    setProfileMenuOpen(false);
                    handleLogout(e);
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 15px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: '#000',
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          authLinks.map((link, index) => (
            <Link
              key={`auth-${index}`}
              to={link.to}
              onMouseEnter={() => setHoveredLink(`auth-${index}`)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                color: '#000000',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '16px',
                textTransform: 'uppercase',
                padding: '0.5rem 1rem',
                border: hoveredLink === `auth-${index}` ? '2px solid #000' : '2px solid transparent',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
              }}
            >
              {link.label}
            </Link>
          ))
        )}
      </div>
    </header>
  );
}

export default Header;
