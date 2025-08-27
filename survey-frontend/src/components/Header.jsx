import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/HomeLogo.png";
import profileIcon from "../assets/profile-circle_svgrepo.com.svg";
import '../pages/css/Header.css'
function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const location = useLocation();
  const isProfilePage = location.pathname.startsWith("/profile");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access");
      const response = await fetch("https://survey-ink.com/api/logout/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        localStorage.removeItem("access");
        navigate("/login", { replace: true });
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleProfileMenu = () => {
    setProfileMenuOpen((prev) => !prev);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About us" },
    { to: "/contact", label: "Contact us" },
  ];

  const authLinks = [
    { to: "/login", label: "Login" },
    { to: "/signup", label: "Sign Up" },
  ];

  const isAuthenticated = !!localStorage.getItem("access");

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        height: "70px",
        justifyContent: "space-between",
        background: isProfilePage ? "transparent" : "#ffffff",
        color: isProfilePage ? "#fff" : "#000",
        position: "relative",
        zIndex: 100,
      }}
    >
      {/* Left - Logo */}
      <div style={{ flexShrink: 0 }}>
        <img src={logo} alt="SURVEY INK Logo" style={{ height: "35px", width: "68px" }} />
      </div>

      {/* Center - Navigation Links (hidden on mobile) */}
      <nav className="nav-links" style={{ display: "flex", gap: "30px" }}>
        {navLinks.map((link, index) => (
          <Link
            key={`nav-${index}`}
            to={link.to}
            onMouseEnter={() => setHoveredLink(`nav-${index}`)}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              color: "#000000",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "16px",
              textTransform: "uppercase",
              padding: "0.5rem 0",
              borderBottom: hoveredLink === `nav-${index}` ? "2px solid #000" : "none",
              transition: "all 0.3s ease",
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Right - Language + Profile or Auth */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <select
          onChange={(e) => changeLanguage(e.target.value)}
          value={i18n.language}
          style={{
            backgroundColor: "#FFFFFF",
            color: "#000000",
            border: "1px solid #000000",
            padding: "0.3rem 0.6rem",
          }}
        >
          <option value="en">EN</option>
          <option value="ar">AR</option>
        </select>

        {isAuthenticated ? (
          <div style={{ position: "relative" }}>
            <img
              src={profileIcon}
              alt="Profile"
              style={{ width: "40px", height: "40px", cursor: "pointer" }}
              onClick={toggleProfileMenu}
            />
            {profileMenuOpen && (
              <div
                ref={profileMenuRef}
                style={{
                  position: "absolute",
                  top: "50px",
                  right: 0,
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  width: "150px",
                  fontSize: "14px",
                }}
              >
                <Link
                  to="/profile"
                  style={{
                    display: "block",
                    padding: "10px 15px",
                    textDecoration: "none",
                    color: "#000",
                    borderBottom: "1px solid #ddd",
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
                    width: "100%",
                    padding: "10px 15px",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    color: "#000",
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
              style={{
                color: "#000000",
                textDecoration: "none",
                fontWeight: "500",
                fontSize: "16px",
                textTransform: "uppercase",
                padding: "0.5rem 1rem",
                border: "2px solid transparent",
                borderRadius: "4px",
              }}
            >
              {link.label}
            </Link>
          ))
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          display: "none",
          fontSize: "24px",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "70px",
            left: 0,
            right: 0,
            background: "#fff",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {navLinks.map((link, index) => (
            <Link
              key={`mnav-${index}`}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: "#000",
                textDecoration: "none",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export default Header;
