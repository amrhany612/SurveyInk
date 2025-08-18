import React from 'react';
import { FaUser, FaEnvelope, FaLock, FaCity, FaUniversity, FaGlobe, FaBirthdayCake } from 'react-icons/fa';

const iconMap = {
  first_name: <FaUser />,
  last_name: <FaUser />,
  email: <FaEnvelope />,
  password: <FaLock />,
  confirm_password: <FaLock />,
  age: <FaBirthdayCake />,
  gender: <FaGlobe />,
  city: <FaCity />,
  university: <FaUniversity />,
  country: <FaGlobe />,
  field_of_study: <FaGlobe />,
  profession: <FaGlobe />,
  date_of_birth: <FaBirthdayCake />,
};

const FloatingInput = ({ name, value, onChange, type, direction, label }) => {
  const inputType = type || 'text';
  const icon = iconMap[name];

  return (
    <div style={{ ...styles.field, flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }}>
      <div style={styles.icon}>{icon}</div>
      <div style={styles.inputContainer}>
        <input
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          style={styles.input}
          required
        />
        <label style={{ ...styles.label, top: value ? '-10px' : '12px', fontSize: value ? '0.75rem' : '1rem' }}>
          {label}
        </label>
      </div>
    </div>
  );
};

const styles = {
  field: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.5rem',
    position: 'relative',
  },
  icon: {
    marginRight: '0.75rem',
    marginLeft: '0.75rem',
    fontSize: '1.2rem',
    color: '#007BFF',
  },
  inputContainer: {
    position: 'relative',
    flex: 1,
  },
  input: {
    width: '405px',
    height: '48px',                // match select height
    // padding: '1rem',               // uniform padding like select
    borderRadius: '5px',
    // border: '1px solid #d0d7de',  // same border as select
    fontSize: '1rem',
    backgroundColor: 'transparent',
    border: '1px solid var(--primary-color, #395692)',

    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',  // subtle shadow same as select
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
  },
  label: {
  position: 'absolute',
  top: '50%',
  left: '12px',
  transform: 'translateY(-50%)',
  color: '#6F86B6',
  transition: 'all 0.3s ease',
  pointerEvents: 'none',
  // backgroundColor: '#fff',
  padding: '0 4px',
  },
};

export default FloatingInput;
