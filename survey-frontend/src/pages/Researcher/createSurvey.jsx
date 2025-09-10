import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dashboardBg from "../../assets/dashboardBg.png";

const CreateSurvey = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [language, setLanguage] = useState("en");
  const isRTL = language === "ar";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [numQuestions, setNumQuestions] = useState(1);
  const [durationDays, setDurationDays] = useState(1);
  const [minDurationMinutes, setMinDurationMinutes] = useState(1);
  const [maxDurationMinutes, setMaxDurationMinutes] = useState(3);
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [otherUniversity, setOtherUniversity] = useState("");
  const [reason, setReason] = useState("");
  const [langChoice, setLangChoice] = useState("en");
  const [requiredSubmissions, setRequiredSubmissions] = useState(1);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("access");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    navigate("/login", { replace: true });
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

  // Fetch universities from backend API
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await fetch("https://survey-ink.com/api/universities/");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setUniversities(data);
          } else if (data.results && Array.isArray(data.results)) {
            setUniversities(data.results);
          } else {
            setUniversities([]);
          }
        } else {
          console.error("Failed to fetch universities");
        }
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };
    fetchUniversities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access");

    const payload = {
      title,
      description,
      num_questions: Number(numQuestions),
      duration_days: Number(durationDays),
      min_duration_minutes: Number(minDurationMinutes),
      max_duration_minutes: Number(maxDurationMinutes),
      university:
        selectedUniversity !== "other" ? selectedUniversity : undefined,
      university_name:
        selectedUniversity === "other" ? otherUniversity : undefined,
      reason,
      language: langChoice,
      required_submissions: Number(requiredSubmissions),
    };

    try {
      const response = await fetch("https://survey-ink.com/create-survey/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();

        toast.success(
          isRTL ? "تم إنشاء الاستبيان بنجاح!" : "Survey created successfully!"
        );
        setTitle("");
        setDescription("");
        setNumQuestions(1);
        setDurationDays(1);
        setMinDurationMinutes(1);
        setMaxDurationMinutes(3);
        setSelectedUniversity("");
        setReason("");
        setLangChoice("en");
        setRequiredSubmissions(1);

        navigate(`/create-demographic/${data.id}/`, {
          state: { numQuestions: Number(numQuestions), surveyTitle: title },
        });
      } else {
        toast.error(
          isRTL ? "فشل في إنشاء الاستبيان" : "Failed to create survey"
        );
      }
    } catch (error) {
      alert(isRTL ? "حدث خطأ" : "An error occurred");
      console.error(error);
    }
  };

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
          padding: isMobile
            ? "1rem 1rem 5rem 1rem"
            : "4.8rem 1.5rem 4.5rem 3rem",
          overflowY: "auto",
          minHeight: "100vh",
          boxSizing: "border-box",
          marginTop: isMobile ? "35px" : "0",
          filter: isMobile && sidebarOpen ? "blur(2px)" : "none",
          transition: "filter 0.3s ease",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: "982px",
            width: "100%",
            backgroundColor: "#A3B6DED4",
            borderRadius: "8px",
            boxShadow: "rgba(0, 0, 0, 0.2) 0px 18px 50px -10px",
            overflowY: "auto",
          }}
        >
          <h1
            style={{
              textAlign: isRTL ? "right" : "left",
              backgroundColor: "#395692",
              color: "#F19303",
              padding: "1rem",
              borderRadius: "5px",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              width: "100%",
              height: "49px",
              margin: 0,
            }}
          >
            {isRTL ? "إنشاء استبيان جديد" : "Create a New Survey"}
          </h1>

          <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
            {/* Title */}
            <label
              htmlFor="title"
              style={{
                fontSize: "14px",
                color: "#fff",
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 500,
              }}
            >
              {isRTL ? "عنوان الاستبيان" : "Survey Title"}
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "1rem",
                borderRadius: "5px",
                border: "1px solid #395692",
                direction: isRTL ? "rtl" : "ltr",
                background: "#D2DBEC",
              }}
            />

            {/* Description */}
            <label
              htmlFor="description"
              style={{
                fontSize: "14px",
                color: "#fff",
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 500,
              }}
            >
              {isRTL ? "وصف الاستبيان" : "Survey Description"}
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "1rem",
                borderRadius: "5px",
                border: "1px solid #395692",
                direction: isRTL ? "rtl" : "ltr",
                background: "#D2DBEC",
              }}
            />

            {/* Duration Days */}
            <label
              htmlFor="durationDays"
              style={{
                fontSize: "14px",
                color: "#fff",
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 500,
              }}
            >
              {isRTL ? "مدة الاستبيان (أيام)" : "Survey Deadline (days)"}
            </label>
            <input
              id="durationDays"
              type="number"
              min="1"
              value={durationDays}
              onChange={(e) => setDurationDays(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "1rem",
                borderRadius: "5px",
                border: "1px solid #395692",
                direction: isRTL ? "rtl" : "ltr",
                background: "#D2DBEC",
                color: "#9A9DA4",
              }}
            />

            {/* Min Duration Minutes */}
            <label
              htmlFor="minDurationMinutes"
              style={{
                fontSize: "14px",
                color: "#fff",
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 500,
              }}
            >
              {isRTL
                ? "الحد الأدنى لمدة الإجابة (دقائق)"
                : "Minimum Duration (minutes)"}
            </label>
            <input
              id="minDurationMinutes"
              type="number"
              min="1"
              value={minDurationMinutes}
              onChange={(e) => setMinDurationMinutes(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "1rem",
                borderRadius: "5px",
                border: "1px solid #395692",
                direction: isRTL ? "rtl" : "ltr",
                background: "#D2DBEC",
                color: "#9A9DA4",
              }}
            />

            {/* Max Duration Minutes */}
            <label
              htmlFor="maxDurationMinutes"
              style={{
                fontSize: "14px",
                color: "#fff",
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 500,
              }}
            >
              {isRTL
                ? "الحد الأقصى لمدة الإجابة (دقائق)"
                : "Maximum Duration (minutes)"}
            </label>
            <input
              id="maxDurationMinutes"
              type="number"
              min={minDurationMinutes}
              value={maxDurationMinutes}
              onChange={(e) => setMaxDurationMinutes(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "1rem",
                borderRadius: "5px",
                border: "1px solid #395692",
                direction: isRTL ? "rtl" : "ltr",
                background: "#D2DBEC",
                color: "#9A9DA4",
              }}
            />

            {/* Required Submissions */}
            <label
              htmlFor="requiredSubmissions"
              style={{
                fontSize: "14px",
                color: "#fff",
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 500,
              }}
            >
              {isRTL
                ? "عدد المشاركات المطلوبة"
                : "Required Number of Submissions"}
            </label>
            <input
              id="requiredSubmissions"
              type="number"
              min="1"
              value={requiredSubmissions}
              onChange={(e) => setRequiredSubmissions(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "1.5rem",
                borderRadius: "5px",
                border: "1px solid #395692",
                direction: isRTL ? "rtl" : "ltr",
                background: "#D2DBEC",
                color: "#9A9DA4",
              }}
            />

            {/* University Dropdown */}
            <label
              htmlFor="university"
              style={{
                fontSize: "14px",
                color: "#fff",
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 500,
              }}
            >
              {isRTL ? "الجامعة" : "University"}
            </label>
            <select
              id="university"
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "1rem",
                borderRadius: "5px",
                border: "1px solid #395692",
                direction: isRTL ? "rtl" : "ltr",
                background: "#D2DBEC",
                color: "#9A9DA4",
              }}
            >
              <option value="">
                {isRTL ? "اختر الجامعة" : "Select University"}
              </option>
              {Array.isArray(universities) &&
                universities.map((uni) => (
                  <option key={uni.id} value={uni.id}>
                    {uni.name}
                  </option>
                ))}
              <option value="other">{isRTL ? "أخرى" : "Other"}</option>
            </select>

            {/* Show input if "Other" is selected */}
            {selectedUniversity === "other" && (
              <input
                type="text"
                placeholder={
                  isRTL ? "اكتب اسم الجامعة" : "Enter university name"
                }
                value={otherUniversity}
                onChange={(e) => setOtherUniversity(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "1rem",
                  borderRadius: "5px",
                  border: "1px solid #395692",
                  direction: isRTL ? "rtl" : "ltr",
                  background: "#D2DBEC",
                  color: "#9A9DA4",
                }}
              />
            )}
            {/* Reason Dropdown */}
            <label
              htmlFor="reason"
              style={{
                fontSize: "14px",
                color: "#fff",
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 500,
              }}
            >
              {isRTL ? "سبب الاستبيان" : "Reason"}
            </label>
            <select
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "1rem",
                borderRadius: "5px",
                border: "1px solid #395692",
                direction: isRTL ? "rtl" : "ltr",
                background: "#D2DBEC",
                color: "#9A9DA4",
              }}
            >
              <option value="">{isRTL ? "اختر السبب" : "Select Reason"}</option>
              <option value="bachelor">
                {isRTL ? "بكالوريوس" : "Bachelor"}
              </option>
              <option value="masters">{isRTL ? "ماجستير" : "Master’s"}</option>
              <option value="phd">{isRTL ? "دكتوراه" : "PhD"}</option>
              <option value="research">
                {isRTL ? "ورقة بحثية" : "Research Paper"}
              </option>
              <option value="market">
                {isRTL ? "بحث سوقي" : "Market Research"}
              </option>
            </select>

            {/* Language Dropdown */}
            <label
              htmlFor="langChoice"
              style={{
                fontSize: "14px",
                color: "#fff",
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 500,
              }}
            >
              {isRTL ? "لغة الاستبيان" : "Survey Language"}
            </label>
            <select
              id="langChoice"
              value={langChoice}
              onChange={(e) => setLangChoice(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "1rem",
                borderRadius: "5px",
                border: "1px solid #395692",
                direction: isRTL ? "rtl" : "ltr",
                background: "#D2DBEC",
                color: "#9A9DA4",
              }}
            >
              <option value="en">{isRTL ? "الإنجليزية" : "English"}</option>
              <option value="ar">{isRTL ? "العربية" : "Arabic"}</option>
            </select>

            <button
              type="submit"
              style={{
                backgroundColor: "#395692",
                color: "white",
                padding: "12px 24px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100%",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              {isRTL ? "إنشاء الاستبيان" : "Create Survey"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateSurvey;
