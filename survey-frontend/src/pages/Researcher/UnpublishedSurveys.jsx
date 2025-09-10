import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dashboardBg from "../../assets/dashboardBg.png";

function UnpublishedSurveys({ isRTL }) {
  const [surveys, setSurveys] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [showActionsPopup, setShowActionsPopup] = useState(false);
  const navigate = useNavigate();

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

  // Fetch unpublished surveys
  const fetchSurveys = async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await axios.get(
        "http://localhost:8000/unpublished-surveys/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSurveys(response.data);
    } catch (error) {
      console.error("Error fetching unpublished surveys:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/login");
    } else {
      fetchSurveys();
    }
  }, []);

  const handlePublish = async (id) => {
    try {
      const token = localStorage.getItem("access");
      await axios.post(
        `http://localhost:8000/publish-survey/${id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Survey published successfully");
      navigate("/all-surveys");
    } catch (error) {
      console.error("Publish error:", error);
      toast.error("Failed to publish survey");
    }
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

  const handleProfileToggle = () => setProfileOpen(!profileOpen);
  const toggleLanguage = () =>
    alert(isRTL ? "Switch to English" : "التبديل إلى العربية");

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("access");
    navigate("/login", { replace: true });
  };

  const handleViewActions = (survey) => {
    setSelectedSurvey(survey);
    setShowActionsPopup(true);
  };

  const handleClosePopup = () => {
    setShowActionsPopup(false);
    setSelectedSurvey(null);
  };

  const handleActionClick = (action, surveyId) => {
    handleClosePopup();
    if (action === "publish") {
      handlePublish(surveyId);
    } else if (action === "view") {
      navigate(`/survey/${surveyId}/display/`);
    } else if (action === "edit") {
      navigate(`/survey/${surveyId}/edit/`);
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
          padding: "1rem",
          overflowY: "auto",
          minHeight: "100vh",
          boxSizing: "border-box",
          filter: isMobile && sidebarOpen ? "blur(2px)" : "none",
          transition: "filter 0.3s ease",
        }}
      >
        <ToastContainer position="top-right" autoClose={3000} />

        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            color: "#395692",
          }}
        >
          {isRTL ? "الاستبيانات غير المنشورة" : "Unpublished Surveys"}
        </h1>

        {surveys.length === 0 ? (
          <p style={{ color: "#7f8c8d", fontSize: "1.1rem" }}>
            {isRTL
              ? "لا توجد استبيانات غير منشورة."
              : "No unpublished surveys found."}
          </p>
        ) : (
          <div
            style={{
              overflowX: "auto",
              backgroundColor: "#395692",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              padding: "1rem",
              maxWidth: "1000px",
              margin: "18px auto 0 auto",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "1rem",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#395692", color: "#fff" }}>
                  <th style={headerStyle}>
                    {isRTL ? "📋 العنوان" : "📋 Title"}
                  </th>
                  <th style={headerStyle}>
                    {isRTL ? "🕒 تاريخ الإنشاء" : "🕒 Created At"}
                  </th>
                  <th style={headerStyle}>
                    {isMobile ? "" : isRTL ? "الإجراءات ⚙️" : "⚙️ Actions"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {surveys.map((survey, index) => (
                  <React.Fragment key={survey.id}>
                    <tr
                      style={{
                        backgroundColor: "#395692D4",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      <td style={{ ...cellStyle, textAlign: "center" }}>
                        {survey.title}
                      </td>
                      <td style={{ ...cellStyle, textAlign: "center" }}>
                        {new Date(survey.created_at).toLocaleDateString()}
                      </td>
                      <td style={{ ...cellStyle, textAlign: "center" }}>
                        {isMobile ? (
                          <button
                            onClick={() => handleViewActions(survey)}
                            style={{
                              backgroundColor: "#F19303",
                              color: "#fff",
                              border: "none",
                              borderRadius: "40px",
                              padding: "6px 12px",
                              cursor: "pointer",
                              fontSize: "15px",
                              fontWeight: "bold",
                            }}
                          >
                            {isRTL ? "إجراء" : "Take Action"}
                          </button>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <button
                              onClick={() => handlePublish(survey.id)}
                              style={{
                                backgroundColor: "#F19303",
                                color: "#fff",
                                border: "none",
                                borderRadius: "40px",
                                padding: "6px 12px",
                                cursor: "pointer",
                                fontWeight: "bold",
                              }}
                            >
                              {isRTL ? "نشر" : "Publish"}
                            </button>
                            <button
                              onClick={() =>
                                navigate(`/survey/${survey.id}/display/`)
                              }
                              style={{
                                backgroundColor: "#F19303",
                                color: "#fff",
                                border: "none",
                                borderRadius: "40px",
                                padding: "6px 12px",
                                cursor: "pointer",
                                fontWeight: "bold",
                              }}
                            >
                              {isRTL ? "عرض" : "View"}
                            </button>
                            <button
                              onClick={() =>
                                navigate(`/survey/${survey.id}/edit/`)
                              }
                              style={{
                                backgroundColor: "#F19303",
                                color: "#fff",
                                border: "none",
                                borderRadius: "40px",
                                padding: "6px 12px",
                                cursor: "pointer",
                                fontWeight: "bold",
                              }}
                            >
                              {isRTL ? "تعديل" : "Edit"}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} style={{ padding: 0 }}>
                        <div style={{ height: "2px", width: "100%" }}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="2"
                            viewBox="0 0 864 2"
                            preserveAspectRatio="none"
                          >
                            <defs>
                              <linearGradient
                                id={`gradient-${index}`}
                                x1="0"
                                y1="1"
                                x2="855.666"
                                y2="1"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#395692" />
                                <stop offset="0.5" stopColor="#E0E1E2" />
                                <stop offset="1" stopColor="#F19303" />
                              </linearGradient>
                            </defs>
                            <path
                              d="M0 1H864"
                              stroke={`url(#gradient-${index})`}
                              strokeWidth="2"
                            />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showActionsPopup && selectedSurvey && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1300,
            }}
            onClick={handleClosePopup}
          >
            <div
              style={{
                backgroundColor: "#395692",
                padding: "2rem",
                borderRadius: "12px",
                width: "90%",
                maxWidth: "400px",
                textAlign: "center",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ color: "#F19303", marginBottom: "1.5rem" }}>
                {isRTL ? "تفاصيل الاستبيان" : "Survey Details"}
              </h3>
              <div
                style={{
                  textAlign: isRTL ? "right" : "left",
                  color: "#fff",
                  marginBottom: "1.5rem",
                }}
              >
                <p style={{ margin: "0.5rem 0" }}>
                  <strong>{isRTL ? "العنوان:" : "Title:"}</strong>{" "}
                  {selectedSurvey.title}
                </p>
                <p style={{ margin: "0.5rem 0" }}>
                  <strong>{isRTL ? "تاريخ الإنشاء:" : "Created At:"}</strong>{" "}
                  {new Date(selectedSurvey.created_at).toLocaleDateString()}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <button
                  onClick={() =>
                    handleActionClick("publish", selectedSurvey.id)
                  }
                  style={{ ...buttonStyle, width: "100%" }}
                >
                  {isRTL ? "نشر" : "Publish"}
                </button>
                <button
                  onClick={() => handleActionClick("view", selectedSurvey.id)}
                  style={{ ...buttonStyle, width: "100%" }}
                >
                  {isRTL ? "عرض" : "View"}
                </button>
                <button
                  onClick={() => handleActionClick("edit", selectedSurvey.id)}
                  style={{ ...buttonStyle, width: "100%" }}
                >
                  {isRTL ? "تعديل" : "Edit"}
                </button>
                <button
                  onClick={handleClosePopup}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "40px",
                    fontWeight: "600",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  {isRTL ? "إغلاق" : "Close"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const headerStyle = {
  padding: "1rem",
  textAlign: "center",
  fontWeight: "600",
  fontSize: "1rem",
  borderBottom: "2px solid #ddd",
};

const cellStyle = {
  padding: "1rem 0",
  color: "#fff",
  fontSize: "1rem",
  textAlign: "center",
  verticalAlign: "middle",
};

const buttonStyle = {
  backgroundColor: "#F19303",
  color: "#fff",
  border: "none",
  padding: "0.5rem 1rem",
  borderRadius: "40px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  fontSize: "12px",
};

export default UnpublishedSurveys;
