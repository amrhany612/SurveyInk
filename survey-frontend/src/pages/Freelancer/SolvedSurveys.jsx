import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import api from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import FreelancerSidebar from "../../components/FreelancerSidebar";
import dashboardBg from "../../assets/dashboardBg.png";

const SolvedSurveys = () => {
  const [surveys, setSurveys] = useState([]);
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [language, setLanguage] = useState("en");

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
    async function fetchSolvedSurveys() {
      try {
        const token = localStorage.getItem("access");
        if (!token) {
          handleLogout(new Event("logout"));
          return;
        }

        const response = await api.get("/surveys/solved/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setSurveys(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          handleLogout(new Event("logout"));
        } else {
          console.error("Error fetching solved surveys:", err);
        }
      }
    }

    fetchSolvedSurveys();
  }, []);

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
          marginLeft: !isMobile && sidebarVisible && !isRTL ? "15px" : "0",
          transition: "margin 0.3s ease, filter 0.3s ease",
          filter: isMobile && sidebarOpen ? "blur(2px)" : "none",
        }}
      >
        {surveys.length === 0 ? (
          <p
            style={{
              color: "#7f8c8d",
              fontSize: "1.1rem",
              marginTop: "60px",
              textAlign: isMobile ? "center" : "start",
            }}
          >
            {isRTL ? "لا توجد استبيانات محلولة." : "No solved surveys found."}
          </p>
        ) : (
          <div
            style={{
              overflowX: "hidden",
              backgroundColor: "#395692",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              padding: "1rem 1rem 1rem 1rem",
              maxWidth: "1000px",
              marginTop: "58px",
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
                    {isRTL ? "تاريخ التقديم" : "Submitted At"}
                  </th>
                  <th style={headerStyle}>{isRTL ? "إجراء" : "Action"}</th>
                </tr>
              </thead>
              <tbody>
                {surveys.map((s, index) => (
                  <React.Fragment key={index}>
                    <tr
                      style={{
                        backgroundColor: "#395692",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      <td
                        style={{
                          color: "#fff",
                          fontSize: "1rem",
                          textAlign: "center",
                          padding: isMobile ? "2.2rem 0" : "2.2rem",
                        }}
                      >
                        {s.survey_title}
                      </td>
                      <td
                        style={{
                          padding: isMobile ? "2.2rem 2rem" : "2.2rem",
                          color: "#fff",
                          fontSize: "1rem",
                          textAlign: "center",
                        }}
                      >
                        {new Date(s.submitted_at).toLocaleString()}
                      </td>
                      <td
                        style={{
                          padding: isMobile ? "2.2rem 0" : "2.2rem",
                          color: "#fff",
                          fontSize: "1rem",
                          textAlign: "center",
                        }}
                      >
                        <button
                          onClick={() =>
                            navigate(`/surveys/solved/${s.survey_id}`)
                          }
                          style={{
                            backgroundColor: "#F19303",
                            color: "#fff",
                            border: "none",
                            borderRadius: "40px",
                            padding: "6px 12px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {isRTL ? "عرض" : "View"}
                        </button>
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
      </main>
    </div>
  );
};

const headerStyle = {
  padding: "1rem",
  textAlign: "center",
  fontWeight: "600",
  fontSize: "1rem",
  borderBottom: "2px solid #ddd",
};

export default SolvedSurveys;
