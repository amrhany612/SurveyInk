import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import backgroundImage from "../assets/B.G.png";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import FloatingInput from "../components/FloatingInput";
import FloatingSelect from "../components/FloatingSelect";
import Container from "../components/Container";
import { toast } from "react-toastify";

const Signup = () => {
  const { t, i18n } = useTranslation();
  const { role } = useParams();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";
  const direction = isRTL ? "rtl" : "ltr";
  const textAlign = isRTL ? "right" : "left";

  const [formData, setFormData] = useState({
    First_name: "",
    Last_name: "",
    Email: "",
    Password: "",
    Confirm_password: "",
    Age: "",
    Gender: "",
    Date_of_birth: "",
    Country: "",
    Field_of_study: "",
    Profession: "",
    University: "",
    City: "",
  });

  const [options, setOptions] = useState({
    countries: [],
    fieldsOfStudy: [],
    professions: [],
    cities: [],
    universities: [],
  });

  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState({ button: false, link: false });

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [countries, fields, professions, universities] =
          await Promise.all([
            fetch("https://survey-ink.com/api/countries/").then((res) =>
              res.json()
            ),
            fetch("https://survey-ink.com/api/fields_of_study/").then((res) =>
              res.json()
            ),
            fetch("https://survey-ink.com/api/professions/").then((res) =>
              res.json()
            ),
            fetch("https://survey-ink.com/api/universities/").then((res) =>
              res.json()
            ),
          ]);

        const normalized = {
          countries: countries.results || countries,
          fieldsOfStudy: fields.results || fields,
          professions: professions.results || professions,
          universities: universities.results || universities,
          cities: [],
        };

        setOptions(normalized);

        setFormData((prev) => ({
          ...prev,
          Gender: prev.Gender || "M",
          Country: prev.Country || (normalized.countries[0]?.id ?? ""),
          Field_of_study:
            prev.Field_of_study || (normalized.fieldsOfStudy[0]?.id ?? ""),
          Profession: prev.Profession || (normalized.professions[0]?.id ?? ""),
          University: prev.University || (normalized.universities[0]?.id ?? ""),
        }));
      } catch (err) {
        console.error("Fetch error:", err);
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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(
          data.message ||
            data.error.substring(0, 70) + " ..." ||
            t("signup_failed")
        );
      }
    } catch {
      alert(t("signup_failed"));
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
      onChange: handleChange,
    };

    if (name === "Date_of_birth") {
      return (
        <div
          key={name}
          className="date-input-container mb-10"
          style={{
            position: "relative",
            width: "100%",
          }}
        >
          <input
            type="date"
            name={name}
            value={value}
            onChange={handleChange}
            className="date-input"
            style={{
              padding: "1rem",
              paddingRight: direction === "rtl" ? "1rem" : "3rem",
              paddingLeft: direction === "rtl" ? "3rem" : "1rem",
              borderRadius: "5px",
              border: "1px solid var(--primary-color, #395692)",
              fontSize: "1rem",
              backgroundColor: "transparent",
              outline: "none",
              width: "100%",
              height: "48px",
              appearance: "none",
              WebkitAppearance: "none",
              color: "#6F86B6",
              MozAppearance: "textfield",
              boxSizing: "border-box",
            }}
            dir={direction}
          />
        </div>
      );
    }

    const isSelectField = [
      "Gender",
      "Country",
      "Field_of_study",
      "Profession",
      "City",
      "University",
    ].includes(name);

    if (isSelectField) {
      const selectOptions = {
        Gender: [
          { id: "M", name: t("male") },
          { id: "F", name: t("female") },
        ],
        Country: options.countries,
        Field_of_study: options.fieldsOfStudy,
        Profession: options.professions,
        University: options.universities,
        City: options.cities,
      };

      if (name === "City" && !options.cities.length) return null;

      return (
        <FloatingSelect key={name} {...commonProps}>
          {selectOptions[name]?.map((item) => (
            <option key={item.id} value={item.id}>
              {t(item.name) || item.name}
            </option>
          ))}
        </FloatingSelect>
      );
    }

    return (
      <FloatingInput
        key={name}
        {...commonProps}
        type={name.toLowerCase().includes("password") ? "password" : "text"}
      />
    );
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.5rem",
        }}
      >
        <div
          style={{
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #395692",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            animation: "spin 1s linear infinite",
            marginRight: "10px",
          }}
        />
        Signing up...
      </div>
    );
  }

  const orderedFields = [
    "First_name",
    "Last_name",
    "Email",
    "Password",
    "Confirm_password",
    "Age",
    "Gender",
    "Date_of_birth",
    "Country",
    "Field_of_study",
    "Profession",
    "University",
    "City",
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        direction,
      }}
      className="pt-8 pb-20"
    >
      <Container>
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "150px",
            height: "110px",
            marginBottom: "30px",
            transition: "transform 0.6s ease-in-out",
          }}
        />
        <div
          className="form-container"
          style={{
            flex: "1",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            animation: "fadeInLeft 1s ease-in-out",
            maxWidth: "100%",
            overflow: "hidden",
            backgroundColor: "white",
            borderRadius: "20px",
            boxShadow:
              "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
          }}
        >
          <h2
            style={{
              fontFamily: "Poppins",
              fontSize: "35px",
              fontWeight: 600,
              color: "#395692",
              textAlign,
              marginBottom: "0.5rem",
            }}
          >
            {t("Create Account SurveyInk")}
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#8297C1",
              fontFamily: "Poppins",
              fontWeight: 400,
              marginBottom: "16px",
              textAlign,
              display: isRTL ? "flex" : "block",
            }}
          >
            {t("Already have an account ?")}{" "}
            <a
              href="/login"
              style={{
                color: "#FEB951",
                textDecoration: hover.link ? "underline" : "none",
                fontSize: "16px",
                fontWeight: 400,
              }}
              onMouseEnter={() => setHover((prev) => ({ ...prev, link: true }))}
              onMouseLeave={() =>
                setHover((prev) => ({ ...prev, link: false }))
              }
            >
              {t("Sign in")}
            </a>
          </p>
          <form
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
            onSubmit={handleSignup}
          >
            <div className="form-grid">{orderedFields.map(renderField)}</div>

            <button
              type="submit"
              className="submit-button"
              style={{
                padding: "10px 4px",
                backgroundColor: "#F19303",
                color: "#fff",
                fontWeight: "600",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1rem",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)",
                width: "100%",
                height: "48px",
                textAlign: "center",
              }}
            >
              {t("Sign Up")}
            </button>
          </form>
        </div>

        <style>
          {`
            @media (max-width: 991.98px) {
              .form-grid {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                width: 100%;
              }
              
              .form-grid > div {
                width: 100%;
                max-width: 100%;
              }
            }
            
            @media (min-width: 992px) {
              .form-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
                margin-bottom: 1rem;
                align-items: flex-start;
              }
            }
            
            .form-container {
              max-width: 100%;
              overflow: hidden;
            }
            
            .submit-button {
              max-width: 100%;
            }
            
            @media (max-width: 576px) {
              .form-container {
                padding: 1rem 0.5rem;
              }
              
              h2 {
                font-size: 28px !important;
              }
            }
            
            .form-grid > div,
            .floating-input-container,
            .floating-select-container {
              width: 100%;
              max-width: 100%;
            }
            
            .date-input-container {
              width: 100%;
            }
            
            .date-input {
              width: 100% !important;
              margin-left: 0 !important;
            }
            
            [dir="rtl"] .floating-input-container .input-icon {
              margin-right: 0;
              margin-left: 0.75rem;
            }
          `}
        </style>
      </Container>
    </div>
  );
};

export default Signup;
