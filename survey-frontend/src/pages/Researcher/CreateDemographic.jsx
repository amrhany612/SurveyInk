import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import api from "../../axiosConfig";
import Select from "react-select";
import dashboardBg from "../../assets/dashboardBg.png";

const CreateDemographic = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [language, setLanguage] = useState("en");
  const isRTL = language === "ar";

  const [countries, setCountries] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [fields, setFields] = useState([]);
  const [professions, setProfessions] = useState([]);

  const { surveyId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    country: [],
    university: [],
    field_of_study: [],
    profession: [],
    gender: "",
    age_min: 0,
    age_max: 0,
    income_min: 0,
    income_max: 0,
  });

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  };

  const handleSidebarToggle = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    }
  };

  const handleCloseSidebar = () => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
        setSidebarVisible(true);
      } else {
        setSidebarVisible(false);
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [r1, r2, r3, r4] = await Promise.all([
          api.get("/api/countries/"),
          api.get("/api/universities/"),
          api.get("/api/fields_of_study/"),
          api.get("/api/professions/"),
        ]);
        setCountries(r1.data);
        setUniversities(r2.data);
        setFields(r3.data);
        setProfessions(r4.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSelectChange = (selected, name) => {
    setForm((prev) => ({
      ...prev,
      [name]: selected.map((s) => s.value),
    }));
  };

  const convertOptions = (items) =>
    items.map((item) => ({ value: item.id, label: item.name }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/surveys/${surveyId}/demographics/`, form);
      navigate(`/create-survey/${surveyId}/questions`);
    } catch (err) {
      console.error(err);
      alert(isRTL ? "حدث خطأ أثناء الحفظ" : "Error saving demographics");
    }
  };

  const customSelectStyle = {
    control: (base) => ({
      ...base,
      padding: "2px",
      borderRadius: "5px",
      width: "100%",
      height: "33px",
      borderColor:
        "linear-gradient(90deg, #395692 50%, #E0E1E2 20%, #F19303 30%)",
      boxShadow: "none",
      background: "#D2DBEC",
    }),
  };

  const fieldsMap = [
    { name: "country", label: isRTL ? "البلد" : "Country", options: countries },
    {
      name: "university",
      label: isRTL ? "الجامعة" : "University",
      options: universities,
    },
    {
      name: "field_of_study",
      label: isRTL ? "المجال الدراسي" : "Field of Study",
      options: fields,
    },
    {
      name: "profession",
      label: isRTL ? "المهنة" : "Profession",
      options: professions,
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: `url(${dashboardBg})`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
      }}
      dir={isRTL ? "rtl" : "ltr"}
      onClick={handleCloseSidebar}
    >
      {isMobile && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSidebarOpen(!sidebarOpen);
          }}
          style={{
            position: "fixed",
            top: "13px",
            left: isRTL ? "auto" : "90px",
            right: isRTL ? "90px" : "auto",
            zIndex: 1200,
            background: "#395692",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            opacity: "0.7",
          }}
        >
          {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      )}

      {isMobile && sidebarOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1099,
          }}
          onClick={handleCloseSidebar}
        />
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: isMobile ? "fixed" : "relative",
          zIndex: 1100,
          transition: isMobile ? "transform 0.3s ease-in-out" : "none",
          transform:
            isMobile && !sidebarOpen
              ? isRTL
                ? "translateX(100%)"
                : "translateX(-100%)"
              : "translateX(0)",
        }}
      >
        <Sidebar
          isRTL={isRTL}
          sidebarVisible={isMobile ? sidebarOpen : sidebarVisible}
          handleSidebarToggle={handleSidebarToggle}
          handleLogout={handleLogout}
          profileOpen={profileOpen}
          setProfileOpen={setProfileOpen}
          isMobile={isMobile}
        />
      </div>

      <main
        style={{
          flex: 1,
          padding: "1rem",
          overflowY: "auto",
          minHeight: "100vh",
          boxSizing: "border-box",
          marginTop: isMobile ? "80px" : "0",
          transition: "margin 0.3s ease, filter 0.3s ease",
          filter: isMobile && sidebarOpen ? "blur(2px)" : "none",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: isRTL ? "right" : "left",
            color: "#35508C",
            marginTop: "8px",
            marginBottom: "2rem",
          }}
        >
          {isRTL ? "اختر البيانات الديموغرافية" : "Select Demographic Data"}
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "#A3B6DED4",
            padding: "2rem",
            borderRadius: "1rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            maxWidth: "982px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: isMobile ? "block" : "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    color: "#fff",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                >
                  {isRTL ? "البلد" : "Country"}
                </label>
                <Select
                  isMulti
                  options={convertOptions(countries)}
                  value={convertOptions(countries).filter((opt) =>
                    form.country.includes(opt.value)
                  )}
                  onChange={(selected) =>
                    handleSelectChange(selected, "country")
                  }
                  styles={customSelectStyle}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    color: "#fff",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                >
                  {isRTL ? "الجامعة" : "University"}
                </label>
                <Select
                  isMulti
                  options={convertOptions(universities)}
                  value={convertOptions(universities).filter((opt) =>
                    form.university.includes(opt.value)
                  )}
                  onChange={(selected) =>
                    handleSelectChange(selected, "university")
                  }
                  styles={customSelectStyle}
                />
              </div>
            </div>

            <div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    color: "#fff",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                >
                  {isRTL ? "المجال الدراسي" : "Field of Study"}
                </label>
                <Select
                  isMulti
                  options={convertOptions(fields)}
                  value={convertOptions(fields).filter((opt) =>
                    form.field_of_study.includes(opt.value)
                  )}
                  onChange={(selected) =>
                    handleSelectChange(selected, "field_of_study")
                  }
                  styles={customSelectStyle}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    color: "#fff",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                >
                  {isRTL ? "المهنة" : "Profession"}
                </label>
                <Select
                  isMulti
                  options={convertOptions(professions)}
                  value={convertOptions(professions).filter((opt) =>
                    form.profession.includes(opt.value)
                  )}
                  onChange={(selected) =>
                    handleSelectChange(selected, "profession")
                  }
                  styles={customSelectStyle}
                />
              </div>
            </div>

            <div
              style={{
                gridColumn: isMobile ? "auto" : "span 2",
                marginBottom: "1.5rem",
              }}
            >
              <label
                style={{
                  color: "#fff",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontFamily: "Poppins",
                }}
              >
                {isRTL ? "الجنس" : "Gender"}
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                style={{
                  width: isMobile ? "100%" : "100%",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #ced4da",
                  background: "#D2DBEC",
                  height: "33px",
                }}
              >
                <option value="">{isRTL ? "--اختر--" : "--Select--"}</option>
                <option value="both">{isRTL ? "الاثنين معاً" : "Both"}</option>
                <option value="male">{isRTL ? "ذكر" : "Male"}</option>
                <option value="female">{isRTL ? "أنثى" : "Female"}</option>
              </select>
            </div>

            <div
              style={{
                gridColumn: isMobile ? "auto" : "span 2",
                marginBottom: "1.5rem",
              }}
            >
              <label
                style={{
                  color: "#fff",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontFamily: "Poppins",
                }}
              >
                {isRTL ? "العمر (سنة)" : "Age (years)"}
              </label>
              <div
                style={{
                  display: "flex",
                  gap: isMobile ? "0.2rem" : "1rem",
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <input
                  type="number"
                  name="age_min"
                  value={form.age_min}
                  min="0"
                  onChange={handleChange}
                  style={{
                    flex: 1,
                    padding: "0.5rem",
                    borderRadius: "5px",
                    border: "1px solid #ced4da",
                    background: "#D2DBEC",
                    height: "33px",
                  }}
                />
                <span>to</span>
                <input
                  type="number"
                  name="age_max"
                  value={form.age_max}
                  min={form.age_min}
                  onChange={handleChange}
                  style={{
                    flex: 1,
                    padding: "0.5rem",
                    borderRadius: "5px",
                    border: "1px solid #ced4da",
                    background: "#D2DBEC",
                    height: "33px",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                gridColumn: isMobile ? "auto" : "span 2",
                marginBottom: "1.5rem",
              }}
            >
              <label
                style={{
                  color: "#fff",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontFamily: "Poppins",
                }}
              >
                {isRTL ? "الدخل" : "Income"}
              </label>
              <div
                style={{
                  display: "flex",
                  gap: isMobile ? "0.2rem" : "1rem",
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <input
                  type="number"
                  name="income_min"
                  value={form.income_min}
                  min="0"
                  onChange={handleChange}
                  style={{
                    flex: 1,
                    padding: "0.5rem",
                    borderRadius: "5px",
                    border: "1px solid #ced4da",
                    background: "#D2DBEC",
                    height: "33px",
                  }}
                />
                <span>to</span>
                <input
                  type="number"
                  name="income_max"
                  value={form.income_max}
                  min={form.income_min}
                  onChange={handleChange}
                  style={{
                    flex: 1,
                    padding: "0.5rem",
                    borderRadius: "5px",
                    border: "1px solid #ced4da",
                    background: "#D2DBEC",
                    height: "33px",
                  }}
                />
              </div>
            </div>
          </div>

          <div
            style={{ marginTop: "2rem", textAlign: isRTL ? "right" : "left" }}
          >
            <button
              type="submit"
              style={{
                background: "#395692",
                color: "#F19303",
                padding: "0.75rem 1.5rem",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {isRTL ? "التالي: إنشاء الأسئلة" : "Next: Create Questions"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateDemographic;
