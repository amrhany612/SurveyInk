import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.mp4';

function SignupChoice() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'right' : 'left';

  const [hoveredButton, setHoveredButton] = useState(null);

  const handleChoice = (role) => {
    navigate(`/signup/${role}`);
  };

  return (
    <div style={{ ...styles.page, direction, background: 'linear-gradient(91deg, rgba(255, 255, 255, 0.00) 0.52%, rgba(241, 147, 3, 0.32) 56.09%, rgba(57, 86, 146, 0.55) 99.35%)' }}>
      <div/>

      <div style={styles.card}>
        <video
          src={logo}
          style={styles.logo}
          autoPlay
          loop
          muted
          playsInline
        />        
        <h2 style={{ ...styles.title }}>
          {t('Choose Your Role')}
        </h2>
        <div style={styles.buttonGroup}>
          <button
            onClick={() => handleChoice('researcher')}
            onMouseEnter={() => setHoveredButton('researcher')}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              ...styles.button,
            }}
          >
            {t('Researcher')}
          </button>
          <button
            onClick={() => handleChoice('freelancer')}
            onMouseEnter={() => setHoveredButton('freelancer')}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              ...styles.secondButton,
            }}
          >
            {t('Freelancer')}
          </button>
            <p style={styles.link}>
                {t('Discover Our Services')}
                
            </p>
             
        </div>


      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    fontFamily: 'sans-serif',
    padding: '1rem',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay
    zIndex: 1,
  },
  card: {
    zIndex: 2,
    backgroundColor: 'white',
    padding: '3rem',
    // borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    textAlign: 'center',
    maxWidth: '444px',
    width: '100%',
    height:'489px'
  },
  logo: {
    width: '250px',
    height: '200px',
    // marginBottom: '1.5rem',
  },
  link: {
  display: 'flex',
  width: '252px',
  height: '12px',
  flexDirection: 'column',
  justifyContent: 'center',
  flexShrink: 0,
  overflow: 'hidden',
  color: '#AAA',
  textAlign: 'center',
  textOverflow: 'ellipsis',
  alignItems:'center',
  whiteSpace: 'nowrap',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '24px',
  textTransform: 'capitalize',
  // marginTop: '1.5rem',
  cursor: 'pointer', // optional: makes it feel clickable
},

title: {
  color: 'var(--395692, #395692)',
  textAlign: 'center',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '24px',
  textTransform: 'capitalize',
  marginBottom: '2rem',
},
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  alignItems: 'center',

  },
button: {
  display: 'flex',
  width: '260px',
  height: '32px',
  // padding: '10px 4px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  flexShrink: 0,

  backgroundColor: '#F19303',
  color: '#fff',
  fontWeight: 600,
  border: 'none',
  borderRadius: '20px',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
},
secondButton: {
  display: 'flex',
  width: '260px',
  height: '32px',
  // padding: '10px 4px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  flexShrink: 0,

  backgroundColor: '#395692',
  color: '#fff',
  fontWeight: 600,
  border: 'none',
  borderRadius: '20px',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
},
};

export default SignupChoice;
