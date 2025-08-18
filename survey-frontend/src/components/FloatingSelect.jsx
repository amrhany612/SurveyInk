import React from 'react';

function FloatingSelect({ name, value, onChange, label, direction, children }) {
  return (
    <div style={{ ...styles.inputWrapper, direction }}>
      <label style={styles.floatingLabel}>{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={styles.select}
        required
      >
        {children /* render passed options dynamically */}
      </select>
    </div>
  );
}

const styles = {
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  floatingLabel: {
    position: 'absolute',
    top: '-25px',
    left: '12px',
    background: 'transparent',
    padding: '0 4px',
    fontSize: '0.85rem',
    color: '#6F86B6',
    zIndex: 1,
    marginLeft:'20px',
  },
  select: {
    width: '405px',
    height: '48px',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '5px',
    border: '1px solid var(--primary-color, #395692)',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
    backgroundColor: 'transparent',
    outline: 'none',
    appearance: 'none',
    boxSizing: 'border-box',
    marginLeft:'20px'
  },
};

export default FloatingSelect;
