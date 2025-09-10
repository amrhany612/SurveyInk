import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import api from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import FreelancerSidebar from "../../components/FreelancerSidebar";
import dashboardBg from "../../assets/dashboardBg.png";

const PendingSurveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [language, setLanguage] = useState("en");

  const [currentPage, setCurrentPage] = useState(1);
  const surveysPerPage = 20;

  const isRTL = language === "ar";

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

  useEffect(() => {
    async function fetchPendingSurveys() {
      try {
        const token = localStorage.getItem("access");
        if (!token) {
          handleLogout(new Event("logout"));
          return;
        }

        const response = await api.get("/surveys/pending/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setSurveys(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          handleLogout(new Event("logout"));
        } else {
          console.error("Error fetching pending surveys:", err);
        }
      }
    }

    fetchPendingSurveys();
  }, []);

  const filteredSurveys = surveys.filter((s) =>
    s.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastSurvey = currentPage * surveysPerPage;
  const indexOfFirstSurvey = indexOfLastSurvey - surveysPerPage;
  const currentSurveys = filteredSurveys.slice(
    indexOfFirstSurvey,
    indexOfLastSurvey
  );
  const totalPages = Math.ceil(filteredSurveys.length / surveysPerPage);

  const handleSolveSurvey = (surveyId) => {
    navigate(`/survey/${surveyId}/display`);
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
        <FreelancerSidebar
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
          marginTop: "42px",
          marginLeft: !isMobile && sidebarVisible && !isRTL ? "15px" : "0",
          transition: "margin 0.3s ease, filter 0.3s ease",
          filter: isMobile && sidebarOpen ? "blur(2px)" : "none",
        }}
      >
        <input
          type="text"
          placeholder={isRTL ? "ابحث عن العنوان..." : "Search by title..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            marginBottom: "1.5rem",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "100%",
            maxWidth: "400px",
            direction: isRTL ? "rtl" : "ltr",
            marginTop: "20px",
          }}
        />

        {filteredSurveys.length === 0 ? (
          <p style={{ color: "#7f8c8d", fontSize: "1.1rem" }}>
            {isRTL
              ? "لم يتم العثور على استبيانات معلقة."
              : "No pending surveys found."}
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
              margin: "0 auto",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "1rem",
                color: "#fff",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#395692" }}>
                  <th style={headerStyle}>
                    {isRTL ? "عنوان الاستبيان" : "Survey Title"}
                  </th>
                  <th style={headerStyle}>
                    {isRTL ? "تاريخ التعيين" : "Assigned At"}
                  </th>
                  <th style={headerStyle}>{isRTL ? "إجراء" : "Action"}</th>
                </tr>
              </thead>
              <tbody>
                {currentSurveys.map((s, index) => (
                  <React.Fragment key={s.id}>
                    <tr
                      style={{
                        backgroundColor: "#395692",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      <td
                        style={{
                          ...cellStyle,
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        {s.title}
                      </td>
                      <td
                        style={{
                          ...cellStyle,
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        {new Date(s.created_at).toLocaleString()}
                      </td>
                      <td style={{ ...cellStyle, textAlign: "center" }}>
                        <button
                          onClick={() => handleSolveSurvey(s.id)}
                          style={{
                            padding: "0.5rem 1rem",
                            backgroundColor: "#F19303",
                            color: "white",
                            border: "none",
                            borderRadius: "40px",
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: "0.9rem",
                          }}
                        >
                          {isRTL ? "حل" : "Fill"}
                        </button>
                      </td>
                    </tr>

                    <tr style={{ marginBottom: "5px" }}>
                      <td colSpan={3} style={{ padding: 0 }}>
                        <div style={{ width: "100%" }}>
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

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    style={{
                      padding: "0.4rem 0.8rem",
                      backgroundColor:
                        page === currentPage ? "#3498db" : "#ecf0f1",
                      color: page === currentPage ? "white" : "#2c3e50",
                      border: "1px solid #bdc3c7",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      minWidth: "40px",
                    }}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const headerStyle = {
  padding: "1rem",
  textAlign: "center",
  fontWeight: "600",
  fontSize: "1rem",
  background: "#395692",
  color: "#fff",
  borderBottom: "2px solid #ddd",
};

const cellStyle = {
  padding: "1rem",
  color: "#395692",
  fontSize: "1rem",
};

export default PendingSurveys;
