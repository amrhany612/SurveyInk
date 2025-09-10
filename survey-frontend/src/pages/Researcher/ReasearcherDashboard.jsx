import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../axiosConfig";
import Sidebar from "../../components/Sidebar";
import dashboardBg from "../../assets/dashboardBg.png";
import { ReactComponent as TotalSurveyIcon } from "../../assets/assigned icon (1).svg";
import { ReactComponent as UnAssignedIcon } from "../../assets/unassigned icon.svg";
function ResearcherDashboard() {
  const [stats, setStats] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const isRTL = language === "ar";
  const itemsPerPage = 10;
  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
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
  const handleProfileToggle = () => setProfileOpen((prev) => !prev);
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
    async function fetchDashboard() {
      try {
        const access = localStorage.getItem("access");
        if (!access) {
          navigate("/login", { replace: true });
          return;
        }
        const response = await api.get("/researcher-dashboard", {
          headers: { Authorization: `Bearer ${access}` },
        });
        setStats(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          handleLogout(new Event("logout"));
        } else {
          console.error("Failed to fetch dashboard:", error);
        }
      }
    }
    fetchDashboard();
  }, [navigate]);
  if (!stats) return <p>{isRTL ? "جاري التحميل..." : "Loading..."}</p>;
  const total = stats.total_surveys || 0;
  const solved = stats.solved_surveys || 0;
  const unsolved = stats.unsolved_surveys || 0;
  const surveys = stats.survey_table || [];
  const totalPages = Math.ceil(surveys.length / itemsPerPage);
  const currentSurveys = surveys.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const calcPercentage = (num) =>
    total === 0 ? 0 : Math.round((num / total) * 100);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
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
          padding: "1rem 1rem 5rem 1rem",
          overflowY: "auto",
          minHeight: "100vh",
          boxSizing: "border-box",
          marginTop: "27px",
          filter: isMobile && sidebarOpen ? "blur(2px)" : "none",
          transition: "filter 0.3s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginTop: isMobile ? "0" : "2rem",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "center" : "normal",
          }}
        >
          <StatsCard
            title={isRTL ? "إجمالي الاستبيانات" : "Total Surveys"}
            value={total}
            percentage={100}
            color="#395692"
            icon={<TotalSurveyIcon style={{ width: "29px", height: "50px" }} />}
            isMobile={isMobile}
          />
          <StatsCard
            title={isRTL ? "الاستبيانات المحلولة" : "Solved Surveys"}
            value={solved}
            percentage={calcPercentage(solved)}
            icon={<TotalSurveyIcon style={{ width: "29px", height: "50px" }} />}
            color="#28a745"
            isMobile={isMobile}
          />
          <StatsCard
            title={isRTL ? "الاستبيانات غير المحلولة" : "Unsolved Surveys"}
            value={unsolved}
            percentage={calcPercentage(unsolved)}
            icon={<UnAssignedIcon style={{ width: "29px", height: "50px" }} />}
            color="#dc3545"
            isMobile={isMobile}
          />
        </div>

        <div
          style={{
            overflowX: "auto",
            marginTop: "2rem",
            width: isMobile ? "100%" : "93%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderSpacing: "0",
              borderCollapse: "separate",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              backgroundColor: "#395692",
              minWidth: isMobile ? "100%" : "auto",
              padding: "10px",
            }}
          >
            <thead style={{ backgroundColor: "#395692", color: "#fff" }}>
              <tr>
                <th
                  style={{
                    padding: "14px 16px",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: window.innerWidth < 500 ? "12px" : "15px",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  {isRTL
                    ? isMobile
                      ? "عنوان الاستبيان وحالته"
                      : "عنوان الاستبيان"
                    : isMobile
                    ? "Survey Title and Its Status"
                    : "Survey Title "}
                </th>
                <th
                  style={{
                    padding: "14px 16px",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: window.innerWidth < 500 ? "12px" : "15px",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  {isRTL ? "عدد الردود" : "Submissions"}
                </th>
                <th
                  style={{
                    padding: "14px 16px",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: window.innerWidth < 500 ? "12px" : "15px",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  {isRTL ? "المطلوب" : "Required"}
                </th>
                {!isMobile ? (
                  <th
                    style={{
                      padding: "14px 16px",
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: window.innerWidth < 500 ? "12px" : "15px",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    {isRTL ? "الحالة" : "Status"}
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {currentSurveys.length > 0 ? (
                currentSurveys.map((survey, index) => (
                  <React.Fragment key={survey.id}>
                    <tr>
                      <td style={cell} className="flex  flex-col lg:block">
                        {survey.title}
                        {isMobile ? (
                          survey.actual_submissions >=
                          survey.required_submissions ? (
                            <span
                              style={{
                                color: "#f44336",
                                fontSize: "16px",
                                fontWeight: "900",
                              }}
                            >
                              Not Active
                            </span>
                          ) : (
                            <span
                              style={{
                                color: "#4caf50",
                                fontSize: "16px",
                                fontWeight: "900",
                              }}
                            >
                              Active
                            </span>
                          )
                        ) : null}
                      </td>
                      <td style={cell}>{survey.actual_submissions}</td>
                      <td style={cell}>{survey.required_submissions}</td>
                      {!isMobile ? (
                        <td style={cell}>
                          <span
                            style={{
                              backgroundColor:
                                survey.actual_submissions >=
                                survey.required_submissions
                                  ? "#f44336"
                                  : "#4caf50",
                              padding: "4px 10px",
                              borderRadius: "20px",
                              color: "#fff",
                              fontWeight: "bold",
                              fontSize: "0.85rem",
                            }}
                          >
                            {survey.actual_submissions >=
                            survey.required_submissions
                              ? isRTL
                                ? "نعم"
                                : "Closed"
                              : isRTL
                              ? "لا"
                              : "Active"}
                          </span>
                        </td>
                      ) : null}
                    </tr>
                    <tr>
                      <td colSpan="4" style={{ padding: 0 }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="2"
                          viewBox="0 0 864 2"
                          preserveAspectRatio="none"
                        >
                          <defs>
                            <linearGradient
                              id={`survey-line-${index}`}
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
                            stroke={`url(#survey-line-${index})`}
                            strokeWidth="2"
                          />
                        </svg>
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    style={{ ...cell, textAlign: "center", color: "#ddd" }}
                  >
                    {isRTL ? "لا توجد بيانات" : "No data available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#395692",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              opacity: currentPage === 1 ? 0.5 : 1,
            }}
          >
            {isRTL ? "السابق" : "Previous"}
          </button>
          <span style={{ fontWeight: "600", color: "#395692" }}>
            {`${isRTL ? "الصفحة" : "Page"} ${currentPage} ${
              isRTL ? "من" : "of"
            } ${totalPages}`}
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
              opacity: currentPage === totalPages ? 0.5 : 1,
            }}
          >
            {isRTL ? "التالي" : "Next"}
          </button>
        </div>
      </main>
    </div>
  );
}
function StatsCard({ title, value, percentage, color, icon, isMobile }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: `linear-gradient(127deg, #395692 28.26%, rgba(26, 31, 55, 0.50) 91.2%)`,
        borderRadius: "10px",
        width: isMobile ? "90%" : "282px",
        minWidth: isMobile ? "auto" : "250px",
        height: "70px",
        padding: "1rem 1.2rem",
        boxShadow: "0 2px 6px #616161",
        margin: isMobile ? "0.5rem auto" : "0",
        flex: isMobile ? "0 0 auto" : "1",
        maxWidth: isMobile ? "100%" : "300px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <p
          style={{
            fontSize: "12px",
            color: "#BAB8B8",
            marginBottom: "0.4rem",
            fontWeight: 500,
            fontFamily: "Poppins",
          }}
        >
          {title}
        </p>
        <h2
          style={{
            fontSize: "21px",
            fontWeight: 600,
            color: "#fff",
            margin: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          {value}
          <span
            style={{
              fontSize: "12px",
              marginLeft: "0.5rem",
              color: "#01B574",
              fontWeight: 400,
            }}
          >
            {percentage >= 0 ? "+" : ""}
            {percentage}%
          </span>
        </h2>
      </div>
      <div style={{ marginLeft: "1rem" }}>{icon}</div>
    </div>
  );
}
const cell = {
  padding: "12px 16px",
  textAlign: "center",
  fontSize: "14px",
  color: "#fff",
  wordWrap: "break-word",
};
export default ResearcherDashboard;
