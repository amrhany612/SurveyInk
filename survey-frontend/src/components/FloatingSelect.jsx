import React from "react";

function FloatingSelect({ name, value, onChange, label, direction, children }) {
  return (
    <div
      className="floating-select-container"
      style={{ ...styles.inputWrapper, direction, width: "100%" }}
    >
      <label
        style={{
          ...styles.floatingLabel,
          [direction === "rtl" ? "right" : "left"]: "12px",
        }}
      >
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{ ...styles.select, width: "100%", marginLeft: "0" }}
        required
      >
        {children}
      </select>
    </div>
  );
}

const styles = {
  inputWrapper: {
    position: "relative",
    width: "100%",
    marginBottom: "1.5rem",
  },
  floatingLabel: {
    position: "absolute",
    top: "-25px",
    background: "transparent",
    padding: "0 4px",
    fontSize: "0.85rem",
    color: "#6F86B6",
    zIndex: 1,
  },
  select: {
    width: "100%",
    height: "48px",
    padding: "1rem",
    borderRadius: "5px",
    border: "1px solid var(--primary-color, #395692)",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
    backgroundColor: "transparent",
    outline: "none",
    appearance: "none",
    boxSizing: "border-box",
  },
};

export default FloatingSelect;
