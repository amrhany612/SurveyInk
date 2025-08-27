// Signup.js
import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import backgroundImage from '../assets/B.G.svg';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import FloatingInput from '../components/FloatingInput';
import FloatingSelect from '../components/FloatingSelect';
import dateIcon from '../assets/DATE ICON.svg';

const Signup = () => {
  const { t, i18n } = useTranslation();
  const { role } = useParams();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'right' : 'left';

  const [formData, setFormData] = useState({
    First_name: '', Last_name: '', Email: '', Password: '', Confirm_password: '',
    Age: '', Gender: '', Date_of_birth: '', Country: '', Field_of_study: '',
    Profession: '', University: '', City: ''
  });

  const [options, setOptions] = useState({
    countries: [], fieldsOfStudy: [], professions: [], cities: [], universities: [],
  });

  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState({ button: false, link: false });

  // ✅ Handle all input changes
  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [countries, fields, professions, universities] = await Promise.all([
          fetch('https://survey-ink.com/api/countries/').then(res => res.json()),
          fetch('https://survey-ink.com/api/fields_of_study/').then(res => res.json()),
          fetch('https://survey-ink.com/api/professions/').then(res => res.json()),
          fetch('https://survey-ink.com/api/universities/').then(res => res.json()),
        ]);
        setOptions({
          countries: countries.results || countries,
          fieldsOfStudy: fields.results || fields,
          professions: professions.results || professions,
          universities: universities.results || universities,
          cities: [],
        });
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    fetchAll();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...formData, role };

    try {
      const res = await fetch(`https://survey-ink.com/api/signup/${role}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) navigate('/login');
      else alert(data.message || t('signup_failed'));
    } catch {
      alert(t('signup_failed'));
    } finally {
      setLoading(false);
    }
  };

  const renderField = (name) => {
    const value = formData[name];
    const commonProps = {
      name,
      value,
      direction,
      label: t(name),
      onChange: handleChange // ✅ Add change handler here
    };

    if (name === 'Date_of_birth') {
      return (
        <div key={name} style={styles.dateWrapper}>
          <input
            type="date"
            name={name}
            value={value}
            onChange={handleChange}
            style={styles.dateInput}
            dir={direction}
          />
          {/* <img
            src={dateIcon}
            alt="Calendar Icon"
            style={styles.dateIcon}
          /> */}
        </div>
      );
    }

    const isSelectField = ['Gender', 'Country', 'Field_of_study', 'Profession', 'City', 'University'].includes(name);

    if (isSelectField) {
      const selectOptions = {
        Gender: [
          { id: 'M', name: t('male') },
          { id: 'F', name: t('female') },
        ],
        Country: options.countries,
        Field_of_study: options.fieldsOfStudy,
        Profession: options.professions,
        University: options.universities,
        City: options.cities,
      };

      if (name === 'City' && !options.cities.length) return null;

      return (
        <FloatingSelect key={name} {...commonProps}>
          {selectOptions[name]?.map(item => (
            <option key={item.id} value={item.id}>{t(item.name) || item.name}</option>
          ))}
        </FloatingSelect>
      );
    }

    return (
      <FloatingInput
        key={name}
        {...commonProps}
        type={name.toLowerCase().includes('password') ? 'password' : 'text'}
      />
    );
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner} />
        Signing up...
      </div>
    );
  }

  return (
    <div style={{ ...styles.page, direction }}>
      <div style={styles.imageContainer}>
        <div style={styles.overlay}>
          <img src={logo} alt="Logo" style={styles.logo} />
        </div>
      </div>

      <div style={styles.formContainer}>
        <h2 style={{ ...styles.title, textAlign }}>{t('Create Account SurveyInk')}</h2>
        <p style={{ ...styles.signupText, textAlign }}>
          {t('Already have an account ?')}{' '}
          <a
            href="/login"
            style={{
              ...styles.link,
              textDecoration: hover.link ? 'underline' : 'none',
            }}
            onMouseEnter={() => setHover(prev => ({ ...prev, link: true }))}
            onMouseLeave={() => setHover(prev => ({ ...prev, link: false }))}
          >
            {t('Sign in')}
          </a>
        </p>
        <form style={styles.form} onSubmit={handleSignup}>
          <div style={styles.formGrid}>
            {Object.keys(formData).map(renderField)}
          </div>

          <button
            type="submit"
            style={{
              ...styles.button
            }}
          >
            {t('Sign Up')}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  dateWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: '405px',
  },
  dateInput: {
    padding: '1rem',
    paddingRight: '3rem',
    borderRadius: '5px',
    border: '1px solid var(--primary-color, #395692)',
    fontSize: '1rem',
    backgroundColor: 'transparent',
    outline: 'none',
    width: '405px',
    height: '48px',
    appearance: 'none',
    WebkitAppearance: 'none',
    color: '#6F86B6',
    MozAppearance: 'textfield',
    marginLeft: '1.5rem'
  },
  dateIcon: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '29px',
    height: '29px',
    pointerEvents: 'none',
  },
  formContainer: {
    flex: '0 0 70%',
    maxWidth: '70%',
    padding: '4rem 3rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    animation: 'fadeInLeft 1s ease-in-out',
  },
  imageContainer: {
    flex: '0 0 30%',
    maxWidth: '30%',
    backgroundColor: '#395692',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    animation: 'fadeInRight 1s ease-in-out',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  overlay: {
    textAlign: 'center',
    color: 'white',
    padding: '2rem',
    animation: 'zoomIn 1s ease-in-out',
  },
  logo: {
    width: '150px',
    height: '110px',
    transition: 'transform 0.6s ease-in-out',
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: '35px',
    fontWeight: 600,
    color: '#395692',
    marginLeft: '21px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    marginBottom: '1rem',
    alignItems: 'flex-start',
  },
  button: {
    padding: '10px 4px',
    backgroundColor: '#F19303',
    color: '#fff',
    fontWeight: '600',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 123, 255, 0.3)',
    width: '895px',
    marginLeft: '23px',
    height: '32px',
    justifyContent: 'center',
    textAlign: 'center',
  },
  signupText: {
    marginLeft: '25px',
    fontSize: '16px',
    color: '#8297C1',
    fontFamily: 'Poppins',
    fontWeight: 400,
    marginBottom: '16px'
  },
  link: {
    color: '#FEB951',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 400,
  },
};

export default Signup;
