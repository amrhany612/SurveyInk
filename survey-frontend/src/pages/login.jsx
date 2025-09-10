import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import loginBg from "../assets/login_background.png";
import "react-toastify/dist/ReactToastify.css";
import api from "../axiosConfig";
import axios from "axios";
import Container from "../components/Container";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const isRTL = i18n.language === "ar";
  const direction = isRTL ? "rtl" : "ltr";
  const textAlign = isRTL ? "right" : "left";

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("https://survey-ink.com/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        // Display the error message from the backend if available
        const errorMessage = data.detail || data.error || "Login failed";
        throw new Error(errorMessage);
        console.log(errorMessage);
      }

      const { access, refresh, user } = data;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful");

      const role = user.role || "user";
      if (role === "freelancer") {
        navigate("/freelancer-dashboard");
      } else if (role === "researcher") {
        navigate("/researcher-dashboard");
      } else if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        toast.warning("Redirecting to home");
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div style={{ ...styles.page, direction }}>
      <ToastContainer />
      <div style={styles.mainContainer}>
        <div style={styles.contentWrapper} className="pt-5 pb-20">
          <div style={styles.logoFormContainer}>
            <img src={logo} alt="Logo" style={styles.logo} />

            <form style={styles.card} onSubmit={handleLogin}>
              <h2 style={{ ...styles.title, textAlign }}>
                {t("login_title") || "Login"}
              </h2>

              <p style={{ ...styles.signupText, textAlign }}>
                New user?{" "}
                <a href="/signup" style={styles.signupLink}>
                  Create an account
                </a>
              </p>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email address</label>
                <input
                  type="email"
                  placeholder={t("email_placeholder") || "Email"}
                  style={{ ...styles.input, direction }}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  placeholder={t("password_placeholder") || "Password"}
                  style={{ ...styles.input, direction }}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div style={styles.actionsRow}>
                <a href="/forgot-password" style={styles.forgot}>
                  Forgot password?
                </a>

                <button type="submit" style={styles.button}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>
        {`
          @media (max-width: 1200px) {
            .logo-form-container {
              max-width: 90% !important;
            }
          }
          
          @media (max-width: 992px) {
            .logo-form-container {
              max-width: 95% !important;
            }
            
            .form-card {
              padding: 2rem !important;
            }
          }
          
          @media (max-width: 768px) {
            .form-card {
              width: 100% !important;
              max-width: 100% !important;
              padding: 1.5rem !important;
            }
          }
          
          @media (max-width: 480px) {
            .form-card {
              padding: 1.25rem !important;
              border-radius: 10px !important;
            }
            
            .login-title {
              font-size: 28px !important;
            }
            
            .login-button {
              width: 100% !important;
              margin-top: 1rem;
            }
            
            .actions-row {
              flex-direction: column;
              align-items: flex-start !important;
              gap: 1rem;
            }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    background:
      "linear-gradient(91deg, rgba(255, 255, 255, 0.00) 0.52%, rgba(241, 147, 3, 0.32) 56.09%, rgba(57, 86, 146, 0.55) 99.35%)",
    fontFamily: "Poppins, sans-serif",
    padding: "1rem",
  },
  mainContainer: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  contentWrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  logoFormContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: "500px",
  },
  logo: {
    width: "136px",
    height: "106px",
    objectFit: "contain",
    marginBottom: "2rem",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow:
      "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
    padding: "2.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
  title: {
    fontSize: "35px",
    fontWeight: "600",
    color: "#395692",
    marginBottom: "0.5rem",
    marginTop: "0",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    color: "#395692",
    fontSize: "14px",
    fontWeight: "500",
  },
  input: {
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    width: "100%",
    boxSizing: "border-box",
  },
  forgot: {
    fontSize: "0.9rem",
    color: "#98A4BE",
    textDecoration: "none",
    alignSelf: "flex-start",
  },
  button: {
    backgroundColor: "#F19303",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "40px",
    cursor: "pointer",
    transition: "background 0.3s ease",
    width: "102px",
    height: "32px",
    fontSize: "0.9rem",
  },
  signupText: {
    fontSize: "0.9rem",
    color: "#333",
    fontFamily: "Poppins",
    margin: "0.5rem 0",
  },
  signupLink: {
    color: "#F19303",
    textDecoration: "none",
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  actionsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "0.5rem",
  },
};

export default Login;
