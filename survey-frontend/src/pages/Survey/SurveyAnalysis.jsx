import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import Sidebar from '../../components/Sidebar'; // Adjust path if needed
import dashboardBg from '../../assets/dashboardBg.png';

const COLORS = ['#395692', '#00C49F', '#FFBB28', '#FF8042', '#AA336A', '#336AAA'];

const styles = {
  container: (isRTL, sidebarVisible) => ({
    display: 'flex',
    flexDirection: isRTL ? 'row-reverse' : 'row',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: `url(${dashboardBg})`,
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
  }),
  main: (isRTL, sidebarVisible) => ({
    flex: 1,
    padding: '3rem 2rem',
    marginLeft: sidebarVisible && !isRTL ? '250px' : 0,
    marginRight: sidebarVisible && isRTL ? '250px' : 0,
    overflowY: 'auto',
  }),
  header: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: '2.5rem',
    color: '#395692',
    marginBottom: '3rem',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  },
  chartsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3rem',
  },
  chartCard: {
    background: '#fff',
    borderRadius: '15px',
    padding: '1.5rem',
    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
    width: 450,
    transition: 'transform 0.3s ease',
  },
  chartTitle: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '1.4rem',
    marginBottom: '1rem',
    color: '#444',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  pieChart: {
    margin: '0 auto',
    // color:'#395692',
    // background:'#395692'
  },
};

function SurveyAnalysis({ isRTL }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [demographics, setDemographics] = useState({
    age: [],
    gender: [],
    education: [],
  });

  const [questionStats, setQuestionStats] = useState([]);

  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleSidebarToggle = () => setSidebarVisible((prev) => !prev);
  const handleProfileToggle = () => setProfileOpen((prev) => !prev);
  const toggleLanguage = () => {
    alert(isRTL ? 'Switched to English' : 'تم التبديل إلى العربية');
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://survey-ink.com/logout/', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        navigate('/login', { replace: true });
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/survey/${id}/analysis/`, {
          withCredentials: true,
        });

        setDemographics({
          age: res.data.age_distribution,
          gender: res.data.gender_distribution,
          education: res.data.education_distribution,
        });

        setQuestionStats(res.data.question_stats);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.location.href = '/login';
        } else {
          console.error('Failed to fetch analysis data:', error);
        }
      }
    };

    fetchAnalysisData();
  }, [id]);

  const transformChartData = (choices) =>
    choices.map((item) => ({
      name: String(item.choice ?? 'Unknown'),
      value: item.count,
    }));

  const renderPieChart = (data, title) => {
    if (!data.length || data.every((item) => item.value === 0)) {
      return (
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>{title}</h3>
          <p
            style={{
              textAlign: 'center',
              color: '#777',
              fontStyle: 'italic',
              marginTop: '2rem',
            }}
          >
            {isRTL
              ? 'لا توجد بيانات بعد، يرجى انتظار أول رد'
              : 'No data available yet. Waiting for responses.'}
          </p>
        </div>
      );
    }

    return (
      <div
        style={styles.chartCard}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
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
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#333', borderRadius: '8px', border: 'none' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </div>
    );
  };

  return (
    <div style={styles.container(isRTL, sidebarVisible)}>
      <Sidebar
        isRTL={isRTL}
        sidebarVisible={sidebarVisible}
        handleSidebarToggle={handleSidebarToggle}
        profileOpen={profileOpen}
        handleProfileToggle={handleProfileToggle}
        toggleLanguage={toggleLanguage}
        handleLogout={handleLogout}
      />
      <main style={styles.main(isRTL, sidebarVisible)}>
        <h1 style={styles.header}>{isRTL ? 'تحليل الردود' : 'Responses Analysis'}</h1>

        <div style={styles.chartsWrapper}>
          {renderPieChart(
            demographics.age.map((item) => ({
              name: item.age ?? 'Unknown',
              value: item.count,
            })),
            isRTL ? 'الفئات العمرية' : 'Age Distribution'
          )}

          {renderPieChart(
            demographics.gender.map((item) => ({
              name: item.gender ?? 'Unknown',
              value: item.count,
            })),
            isRTL ? 'الجنس' : 'Gender'
          )}

          {renderPieChart(
            demographics.education.map((item) => ({
              name: item.field_of_study__name ?? 'Unknown',
              value: item.count,
            })),
            isRTL ? 'التعليم' : 'Education'
          )}

          {questionStats.length === 0 && (
            <p style={{ textAlign: 'center', color: '#777', fontStyle: 'italic', marginTop: '2rem' }}>
              {isRTL ? 'لا توجد بيانات لأسئلة الاستبيان بعد.' : 'No response data available for survey questions yet.'}
            </p>
          )}

          {questionStats.map(({ question_text, choices }, index) => {
            const data = transformChartData(choices || []);
            return renderPieChart(data, question_text || (isRTL ? 'سؤال بدون عنوان' : 'Untitled Question'));
          })}
        </div>
      </main>
    </div>
  );
}

export default SurveyAnalysis;
