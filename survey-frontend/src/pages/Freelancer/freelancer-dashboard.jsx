import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../axiosConfig";
import FreelancerSidebar from "../../components/FreelancerSidebar";
import dashboardBg from "../../assets/dashboardBg.png";
import { ReactComponent as TotalSurveyIcon } from "../../assets/assigned icon (1).svg";
import pendingSurveyIcon from "../../assets/pending.png";

function FreelancerDashboard() {
  const [stats, setStats] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({ username: "", image: "" });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [language, setLanguage] = useState("en");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
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
        const token = localStorage.getItem("access");
        if (!token) {
          handleLogout(new Event("logout"));
          return;
        }

        const response = await api.get("/freelancer-dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStats(response.data);

        const defaultImage = "https://www.w3schools.com/howto/img_avatar.png";
        const user = response.data.user_info.user;
        const username =
          `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
          localStorage.getItem("username") ||
          "User";
        const image = response.data.image || defaultImage;
        setUserInfo({ username, image });
      } catch (err) {
        if (err.response?.status === 401) {
          handleLogout(new Event("logout"));
        } else {
          console.error("Dashboard fetch error:", err);
        }
      }
    }

    fetchDashboard();
  }, []);

  if (!stats) return <p>{isRTL ? "جاري التحميل..." : "Loading..."}</p>;

  const {
    total_assigned_surveys = 0,
    solved_surveys = 0,
    pending_surveys = 0,
    surveys = [],
    monthly_submissions_count = [],
    yearly_submissions_count = [],
  } = stats;

  const totalPages = Math.ceil(surveys.length / itemsPerPage);
  const currentSurveys = surveys.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage((p) => p + 1);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage((p) => p - 1);

  const calcPercentage = (num) =>
    total_assigned_surveys === 0
      ? 0
      : Math.round((num / total_assigned_surveys) * 100);

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
          username={userInfo.username}
          userImage={userInfo.image}
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
          marginTop: "60px",
          transition: "margin 0.3s ease, filter 0.3s ease",
          filter: isMobile && sidebarOpen ? "blur(2px)" : "none",
        }}
      >
        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: "1.5rem",
            justifyContent: "center",
            marginTop: "2rem",
            maxWidth: isMobile ? "100%" : "800px",
            margin: "0 auto",
            direction: isRTL ? "rtl" : "ltr",
          }}
        >
          <StatsCard
            title={isRTL ? "المحفظة" : "Wallet"}
            value={`0 EGP`}
            percentage={0}
            icon={
              <div
                style={{
                  backgroundColor: "#5F79B2",
                  borderRadius: "12px",
                  padding: "8px",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 21 21"
                  fill="none"
                >
                  <path
                    d="M4.38714 4.70926H16.5746C16.717 4.7092 16.8592 4.71823 17.0004 4.7363C16.9526 4.4003 16.8372 4.07747 16.6611 3.78727C16.4851 3.49708 16.2522 3.24554 15.9763 3.0478C15.7005 2.85007 15.3875 2.71025 15.0561 2.63677C14.7248 2.56329 14.382 2.55767 14.0484 2.62025L4.02532 4.33145H4.0139C3.38474 4.45176 2.82526 4.80773 2.44971 5.32664C3.01551 4.92419 3.69281 4.70837 4.38714 4.70926Z"
                    fill="#FEA319"
                  />
                  <path
                    d="M16.5747 5.625H4.38721C3.74096 5.62571 3.12138 5.88274 2.66441 6.33971C2.20745 6.79667 1.95041 7.41625 1.94971 8.0625V15.375C1.95041 16.0212 2.20745 16.6408 2.66441 17.0978C3.12138 17.5548 3.74096 17.8118 4.38721 17.8125H16.5747C17.221 17.8118 17.8405 17.5548 18.2975 17.0978C18.7545 16.6408 19.0115 16.0212 19.0122 15.375V8.0625C19.0115 7.41625 18.7545 6.79667 18.2975 6.33971C17.8405 5.88274 17.221 5.62571 16.5747 5.625ZM14.7656 12.9375C14.5246 12.9375 14.2889 12.866 14.0885 12.7321C13.8881 12.5982 13.7319 12.4078 13.6396 12.1851C13.5474 11.9624 13.5233 11.7174 13.5703 11.481C13.6173 11.2446 13.7334 11.0274 13.9038 10.857C14.0743 10.6865 14.2914 10.5704 14.5279 10.5234C14.7643 10.4764 15.0093 10.5005 15.232 10.5928C15.4547 10.685 15.6451 10.8412 15.779 11.0416C15.9129 11.2421 15.9844 11.4777 15.9844 11.7187C15.9844 12.042 15.856 12.352 15.6274 12.5805C15.3988 12.8091 15.0889 12.9375 14.7656 12.9375Z"
                    fill="#FEA319"
                  />
                  <path
                    d="M1.96875 10.6313V6.8418C1.96875 6.01647 2.42578 4.63281 4.01206 4.33308C5.35840 4.08057 6.69141 4.08057 6.69141 4.08057C6.69141 4.08057 7.56738 4.68994 6.84375 4.68994C6.12012 4.68994 6.13916 5.62305 6.84375 5.62305C7.54834 5.62305 6.84375 6.51807 6.84375 6.51807L4.00635 9.73633L1.96875 10.6313Z"
                    fill="#FEA319"
                  />
                </svg>
              </div>
            }
            isMobile={isMobile}
          />

          <StatsCard
            title={isRTL ? "الاستبيانات المعينة" : "Assigned Surveys"}
            value={total_assigned_surveys}
            icon={<TotalSurveyIcon style={{ width: "29px", height: "50px" }} />}
            percentage={100}
            isMobile={isMobile}
          />
          <StatsCard
            title={isRTL ? "تم حلها" : "Solved Surveys"}
            value={solved_surveys}
            icon={<TotalSurveyIcon style={{ width: "29px", height: "50px" }} />}
            percentage={calcPercentage(solved_surveys)}
            isMobile={isMobile}
          />
          <StatsCard
            title={isRTL ? "قيد الانتظار" : "Pending Surveys"}
            value={pending_surveys}
            icon={
              <img
                src={pendingSurveyIcon}
                alt="Pending Surveys"
                style={{ width: "35px", height: "35px" }}
              />
            }
            percentage={calcPercentage(pending_surveys)}
            isMobile={isMobile}
          />
        </div>

        {/* Monthly Chart */}
        {/*
          <ChartBlock
            title={isRTL ? 'احصائيات الاستبيانات المحلولة شهريًا' : 'Solved Surveys by Month'}
            data={monthly_submissions_count}
            dataKey="month"
            color="#395692"
          />
        */}

        {/* Yearly Chart */}
        {/*
          <ChartBlock
            title={
              isRTL
                ? "احصائيات الاستبيانات المحلولة سنويًا"
                : "Solved Surveys by Year"
            }
            data={yearly_submissions_count}
            dataKey="year"
            color="#2E8B57"
          />
        */}
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
        width: isMobile ? "100%" : "100%",
        height: "70px",
        padding: "1rem 1.2rem",
        boxShadow: "0 2px 6px #616161",
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

function ChartBlock({ title, data, dataKey, color }) {
  return (
    <div style={{ width: "100%", height: "300px", marginTop: "2.5rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem", color }}>
        {title}
      </h2>
    </div>
  );
}

export default FreelancerDashboard;
