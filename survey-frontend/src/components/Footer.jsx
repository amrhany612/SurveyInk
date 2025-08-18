import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUser, FaEnvelope, FaCommentDots } from 'react-icons/fa';
import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import logo from '../assets/HomeLogo.png'
import { Link } from 'react-router-dom';

function Footer() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
 <footer style={styles.footer}>
  <div style={styles.topSection}>
    {/* Logo Section */}
    <div>
      <img src={logo} alt="SurveyINK Logo" style={styles.logo} />
    </div>

    {/* Links Section */}
    <div style={styles.linksSection}>
      <div style={styles.linkColumn}>
        <h4 style={styles.linkTitle}>About</h4>
        <a href="/contact" style={styles.link}>Contact Us</a>
        <a href="/terms" style={styles.link}>Terms and condition</a>
        <a href="/privacy" style={styles.link}>Privacy Policy</a>
      </div>

      <div style={styles.linkColumn}>
        <h4 style={styles.linkTitle}>Product</h4>
        <a href="/pricing" style={styles.link}>Pricing</a>
        <a href="/testimonials" style={styles.link}>Testimonials</a>
      </div>

      <div style={styles.linkColumn}>
        <h4 style={styles.linkTitle}>Discover</h4>
        <a href="/teams" style={styles.link}>Teams</a>
        <a href="/partners" style={styles.link}>Partners</a>
        <a href="/career" style={styles.link}>Career</a>
      </div>

      <div style={styles.linkColumn}>
        <h4 style={styles.linkTitle}>Follow us</h4>
        <div style={styles.socialIcons}>
          <a href="https://facebook.com/surveyink" style={styles.icon}><FaFacebookF /></a>
          <a href="https://instagram.com/surveyink" style={styles.icon}><FaInstagram /></a>
          <a href="https://linkedin.com/company/surveyink" style={styles.icon}><FaLinkedinIn /></a>
        </div>
      </div>
    </div>
  </div>

  {/* Bottom Copy */}
  <div style={styles.bottomSection}>
    <p style={styles.copy}>&copy; 2025 – All Rights Reserved surveyink</p>
  </div>
</footer>
  );
}

const styles = {
  footer: {
    background: 'linear-gradient(to right, #d2edf6, #f5dfc4)', // match image bg
    padding: '40px 80px',
    fontFamily: 'Poppins, sans-serif',
  },
  topSection: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    borderBottom: '1px solid transparent',
  },
  logoSection: {
    // flex: '1 1 250px',
  },
  logo: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#23407F',
    marginLeft:'14rem'
    
  },
  linksSection: {
    flex: '3 1 700px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '2rem',
  },
  linkColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  linkTitle: {
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '0.5rem',
    marginLeft:'2.5rem'
  },
  link: {
    color: '#1a1a1a',
    textDecoration: 'none',
    fontSize: '15px',
    marginLeft:'2.5rem'
  },
  socialIcons: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
    marginLeft:'2.5rem'
  },
  icon: {
    fontSize: '20px',
    color: '#23407F',
    textDecoration: 'none',
    // marginLeft:'50px'
  },
  bottomSection: {
    textAlign: 'center',
    marginTop: '30px',
  },
  copy: {
    fontSize: '14px',
    color: '#555',
  },
};


export default Footer;
