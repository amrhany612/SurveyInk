import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.mp4";
import Container from "../components/Container";

function SignupChoice() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";
  const direction = isRTL ? "rtl" : "ltr";

  const [hoveredButton, setHoveredButton] = useState(null);

  const handleChoice = (role) => {
    navigate(`/signup/${role}`);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(91deg, rgba(255,255,255,0.00) 0.52%, rgba(241,147,3,0.32) 56.09%, rgba(57,86,146,0.55) 99.35%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        direction,
        fontFamily: "Poppins, sans-serif",
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          textAlign: "center",
          width: "100%",
          maxWidth: "420px",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "all 0.3s ease",
          height: "500px",
          marginTop: "30px",
          marginBottom: "80px",
        }}
      >
        {/* Logo */}
        <video
          src={logo}
          style={{
            width: "70%",
            maxWidth: "220px",
            height: "auto",
            objectFit: "contain",
          }}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Title */}
        <h2
          style={{
            color: "#395692",
            fontSize: "clamp(16px, 2vw, 20px)", // responsive font size
            fontWeight: 600,
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          {t("Choose Your Role")}
        </h2>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            width: "100%",
          }}
        >
          <button
            onClick={() => handleChoice("researcher")}
            onMouseEnter={() => setHoveredButton("researcher")}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              width: "100%",
              maxWidth: "260px",
              padding: "0.6rem 1rem",
              backgroundColor: "#F19303",
              color: "#fff",
              fontWeight: 600,
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "clamp(14px, 1.2vw, 16px)",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            {t("Researcher")}
          </button>

          <button
            onClick={() => handleChoice("freelancer")}
            onMouseEnter={() => setHoveredButton("freelancer")}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              width: "100%",
              maxWidth: "260px",
              padding: "0.6rem 1rem",
              backgroundColor: "#395692",
              color: "#fff",
              fontWeight: 600,
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "clamp(14px, 1.2vw, 16px)",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            {t("Freelancer")}
          </button>

          {/* Link */}
          <p
            style={{
              marginTop: "1rem",
              color: "#777",
              fontSize: "clamp(12px, 1vw, 14px)",
              fontWeight: 400,
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            {t("Discover Our Services")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupChoice;
