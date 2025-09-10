import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";
import dashboardBg from "../../assets/dashboardBg.png";

function AllSurveys({ isRTL }) {
  const [surveys, setSurveys] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [showActionsPopup, setShowActionsPopup] = useState(false);
  const navigate = useNavigate();

  // Responsive: handle sidebar and screen size
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

  // Fetch surveys
  const fetchSurveys = async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await axios.get("http://localhost:8000/all-surveys/", {
        params: {
          page: currentPage,
          search: searchTerm,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSurveys(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 10));
    } catch (error) {
      console.error("Error fetching surveys:", error);
      if (error.response && error.response.status === 401) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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

  const handleProfileToggle = () => {
    setProfileOpen(!profileOpen);
  };

  const toggleLanguage = () => {
    alert(isRTL ? "Switch to English" : "التبديل إلى العربية");
  };

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
    if (action === "view") {
      navigate(`/survey/${surveyId}/display/`);
    } else if (action === "responses") {
      navigate(`/survey/${surveyId}/responses/analysis/`);
    } else if (action === "submissions") {
      navigate(`/survey/${surveyId}/submissions`);
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
        {/* Page Title */}
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            color: "#395692",
          }}
        >
          {isRTL ? "جميع الاستبيانات" : "All Surveys"}
        </h1>

        {/* Search bar */}
        <div style={{ marginBottom: "1rem", marginTop: "20px" }}>
          <input
            type="text"
            placeholder={isRTL ? "ابحث عن الاستبيان..." : "Search surveys..."}
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              width: "100%",
              maxWidth: "400px",
            }}
          />
        </div>

        {/* Surveys Table */}
        <div
          style={{
            overflowX: "hidden",
            backgroundColor: "#395692",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            padding: isMobile ? "1rem 1rem 1rem 0.4rem" : "1rem",
            maxWidth: "1200px",
          }}
        >
          <table
            style={{
              width: "97%",
              borderCollapse: "collapse",
              fontSize: "1rem",
              margin: "10px",
              backgroundColor: "transparent",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#395692", color: "#fff" }}>
                {!isMobile && (
                  <>
                    <th style={{ padding: "10px", textAlign: "center" }}>
                      {isRTL ? "العنوان" : "Title"}
                    </th>
                    <th style={{ padding: "10px", textAlign: "center" }}>
                      {isRTL ? "تاريخ الإنشاء" : "Created At"}
                    </th>
                    <th style={{ padding: "10px", textAlign: "center" }}>
                      {isRTL ? "المرسلات" : "Actual Submissions"}
                    </th>
                    <th style={{ padding: "10px", textAlign: "center" }}>
                      {isRTL ? "المطلوبة" : "Required Submissions"}
                    </th>
                  </>
                )}
                <th style={{ padding: "10px", textAlign: "center" }}>
                  {isMobile ? "Title" : ""}
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(surveys) && surveys.length > 0 ? (
                surveys.map((survey, index) => (
                  <React.Fragment key={survey.id}>
                    <tr
                      style={{
                        backgroundColor: "#395692D4",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      {!isMobile ? (
                        <>
                          <td
                            style={{
                              paddingTop: "20px",
                              textAlign: "center",
                              color: "#fff",
                            }}
                          >
                            {survey.title}
                          </td>
                          <td
                            style={{
                              paddingTop: "20px",
                              textAlign: "center",
                              color: "#fff",
                            }}
                          >
                            {new Date(survey.created_at).toLocaleDateString()}
                          </td>
                          <td
                            style={{
                              paddingTop: "20px",
                              textAlign: "center",
                              color: "#fff",
                            }}
                          >
                            {survey.actual_submissions}
                          </td>
                          <td
                            style={{
                              paddingTop: "20px",
                              textAlign: "center",
                              color: "#fff",
                            }}
                          >
                            {survey.required_submissions}
                          </td>
                        </>
                      ) : (
                        <td
                          style={{
                            paddingTop: "20px",
                            textAlign: "center",
                            color: "#fff",
                          }}
                          colSpan={4}
                          className={isMobile ? "column-mobile" : ""}
                        >
                          {survey.title}
                          {isMobile ? (
                            <button
                              onClick={() => handleViewActions(survey)}
                              style={buttonStyle}
                            >
                              {isRTL
                                ? "عرض كل المعلومات واتخاذ اجراء"
                                : "View All Information and Take an Action"}
                            </button>
                          ) : null}
                        </td>
                      )}
                      {!isMobile ? (
                        <td style={{ paddingTop: "20px", textAlign: "center" }}>
                          <button
                            onClick={() => handleViewActions(survey)}
                            style={buttonStyle}
                          >
                            {!isRTL ? "Take Action" : "اتخاذ إجراء"}
                          </button>
                        </td>
                      ) : null}
                    </tr>
                    {/* Gradient Separator */}
                    <tr>
                      <td colSpan={isMobile ? 2 : 5} style={{ padding: 10 }}>
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
                ))
              ) : (
                <tr>
                  <td
                    colSpan={isMobile ? 2 : 5}
                    style={{
                      padding: "1rem",
                      textAlign: "center",
                      color: "#fff",
                    }}
                  >
                    {isRTL ? "لا توجد استبيانات." : "No surveys available."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#395692",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            {isRTL ? "السابق" : "Previous"}
          </button>
          <span style={{ alignSelf: "center", fontWeight: "bold" }}>
            {isRTL
              ? `الصفحة ${currentPage} من ${totalPages}`
              : `Page ${currentPage} of ${totalPages}`}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#395692",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            {isRTL ? "التالي" : "Next"}
          </button>
        </div>

        {/* Actions Popup for Mobile */}
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
                <p style={{ margin: "0.5rem 0" }}>
                  <strong>{isRTL ? "المرسلات:" : "Actual Submissions:"}</strong>{" "}
                  {selectedSurvey.actual_submissions}
                </p>
                <p style={{ margin: "0.5rem 0" }}>
                  <strong>
                    {isRTL ? "المطلوبة:" : "Required Submissions:"}
                  </strong>{" "}
                  {selectedSurvey.required_submissions}
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
                  onClick={() => handleActionClick("view", selectedSurvey.id)}
                  style={{ ...buttonStyle, width: "100%" }}
                >
                  {isRTL ? "عرض الاستبيان" : "View Survey Itself"}
                </button>
                <button
                  onClick={() =>
                    handleActionClick("responses", selectedSurvey.id)
                  }
                  style={{ ...buttonStyle, width: "100%" }}
                >
                  {isRTL ? "عرض الردود" : "View Responses"}
                </button>
                <button
                  onClick={() =>
                    handleActionClick("submissions", selectedSurvey.id)
                  }
                  style={{ ...buttonStyle, width: "100%" }}
                >
                  {isRTL ? "عرض التفاصيل" : "View Submissions"}
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
      <style>
        {`
          .column-mobile{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
            padding: 10px !important;
          } 
        `}
      </style>
    </div>
  );
}

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

export default AllSurveys;
