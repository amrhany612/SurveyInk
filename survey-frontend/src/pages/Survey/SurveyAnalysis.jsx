import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Sidebar from "../../components/Sidebar";
import dashboardBg from "../../assets/dashboardBg.png";

const COLORS = [
  "#395692",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AA336A",
  "#336AAA",
];

const SurveyAnalysis = ({ isRTL }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [demographics, setDemographics] = useState({
    age: [],
    gender: [],
    education: [],
  });

  const [questionStats, setQuestionStats] = useState([]);

  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

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

  const handleProfileToggle = () => setProfileOpen((prev) => !prev);

  const toggleLanguage = () => {
    alert(isRTL ? "Switched to English" : "تم التبديل إلى العربية");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("access");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    navigate("/login", { replace: true });
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
    const fetchAnalysisData = async () => {
      try {
        const token = localStorage.getItem("access");
        if (!token) {
          navigate("/login", { replace: true });
          return;
        }

        const res = await axios.get(
          `http://localhost:8000/survey/${id}/analysis/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDemographics({
          age: res.data.age_distribution,
          gender: res.data.gender_distribution,
          education: res.data.education_distribution,
        });

        setQuestionStats(res.data.question_stats);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login", { replace: true });
        } else {
          console.error("Failed to fetch analysis data:", error);
        }
      }
    };

    fetchAnalysisData();
  }, [id, navigate]);

  const transformChartData = (choices) =>
    choices.map((item) => ({
      name: String(item.choice ?? "Unknown"),
      value: item.count,
    }));

  const renderPieChart = (data, title) => {
    if (!data.length || data.every((item) => item.value === 0)) {
      return (
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>{title}</h3>
          <p
            style={{
              textAlign: "center",
              color: "#777",
              fontStyle: "italic",
              marginTop: "2rem",
            }}
          >
            {isRTL
              ? "لا توجد بيانات بعد، يرجى انتظار أول رد"
              : "No data available yet. Waiting for responses."}
          </p>
        </div>
      );
    }

    return (
      <div
        style={styles.chartCard}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <h3 style={styles.chartTitle}>{title}</h3>
        <PieChart width={400} height={300} style={styles.pieChart}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={90}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#333",
              borderRadius: "8px",
              border: "none",
            }}
            itemStyle={{ color: "#fff" }}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </div>
    );
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
          overflow: "hidden",
          minHeight: "100vh",
          boxSizing: "border-box",
          transition: "margin 0.3s ease, filter 0.3s ease",
          filter: isMobile && sidebarOpen ? "blur(2px)" : "none",
        }}
      >
        <h1 style={styles.header}>
          {isRTL ? "تحليل الردود" : "Responses Analysis"}
        </h1>

        <div style={styles.chartsWrapper}>
          {renderPieChart(
            demographics.age.map((item) => ({
              name: item.age ?? "Unknown",
              value: item.count,
            })),
            isRTL ? "الفئات العمرية" : "Age Distribution"
          )}

          {renderPieChart(
            demographics.gender.map((item) => ({
              name: item.gender ?? "Unknown",
              value: item.count,
            })),
            isRTL ? "الجنس" : "Gender"
          )}

          {renderPieChart(
            demographics.education.map((item) => ({
              name: item.field_of_study__name ?? "Unknown",
              value: item.count,
            })),
            isRTL ? "التعليم" : "Education"
          )}

          {questionStats.length === 0 && (
            <p
              style={{
                textAlign: "center",
                color: "#777",
                fontStyle: "italic",
                marginTop: "2rem",
              }}
            >
              {isRTL
                ? "لا توجد بيانات لأسئلة الاستبيان بعد."
                : "No response data available for survey questions yet."}
            </p>
          )}

          {questionStats.map(({ question_text, choices }, index) => {
            const data = transformChartData(choices || []);
            return renderPieChart(
              data,
              question_text || (isRTL ? "سؤال بدون عنوان" : "Untitled Question")
            );
          })}
        </div>
      </main>
    </div>
  );
};

const styles = {
  header: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: "2.5rem",
    color: "#395692",
    marginBottom: "3rem",
    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
  },
  chartsWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "3rem",
  },
  chartCard: {
    background: "#fff",
    borderRadius: "15px",
    padding: "1.5rem",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
    width: "100%",
    maxWidth: "450px",
    transition: "transform 0.3s ease",
  },
  chartTitle: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: "1.4rem",
    marginBottom: "1rem",
    color: "#444",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  pieChart: {
    margin: "0 auto",
  },
};

export default SurveyAnalysis;
