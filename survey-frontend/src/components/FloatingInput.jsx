import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCity,
  FaUniversity,
  FaGlobe,
  FaBirthdayCake,
} from "react-icons/fa";

const iconMap = {
  First_name: <FaUser />,
  Last_name: <FaUser />,
  Email: <FaEnvelope />,
  Password: <FaLock />,
  Confirm_password: <FaLock />,
  Age: <FaBirthdayCake />,
  Gender: <FaGlobe />,
  City: <FaCity />,
  University: <FaUniversity />,
  Country: <FaGlobe />,
  Field_of_study: <FaGlobe />,
  Profession: <FaGlobe />,
  Date_of_birth: <FaBirthdayCake />,
};

const FloatingInput = ({ name, value, onChange, type, direction, label }) => {
  const inputType = type || "text";
  const icon = iconMap[name];

  return (
    <div
      className="floating-input-container"
      style={{
        ...styles.field,
        width: "100%",
      }}
    >
      <div className="input-icon" style={styles.icon}>
        {icon}
      </div>
      <div style={{ ...styles.inputContainer, width: "100%" }}>
        <input
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          style={{ ...styles.input, width: "100%" }}
          required
        />
        <label
          style={{
            ...styles.label,
            top: value ? "-10px" : "12px",
            fontSize: value ? "0.75rem" : "1rem",
            [direction === "rtl" ? "right" : "left"]: "12px",
            transform:
              direction === "rtl" ? "translateY(-50%)" : "translateY(-50%)",
          }}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

const styles = {
  field: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1.5rem",
    position: "relative",
    width: "100%",
  },
  icon: {
    marginRight: "0.75rem",
    marginLeft: "0.75rem",
    fontSize: "1.2rem",
    color: "#007BFF",
    flexShrink: 0,
  },
  inputContainer: {
    position: "relative",
    flex: 1,
    width: "100%",
  },
  input: {
    width: "100%",
    height: "48px",
    padding: "1rem",
    paddingRight: "1rem",
    borderRadius: "5px",
    border: "1px solid var(--primary-color, #395692)",
    fontSize: "1rem",
    backgroundColor: "transparent",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  },
  label: {
    position: "absolute",
    top: "50%",
    color: "#6F86B6",
    transition: "all 0.3s ease",
    pointerEvents: "none",
    padding: "0 4px",
  },
};

export default FloatingInput;
