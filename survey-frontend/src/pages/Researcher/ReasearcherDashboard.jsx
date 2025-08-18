import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';
import Sidebar from '../../components/Sidebar'; // Your shared sidebar component
import dashboardBg from '../../assets/dashboardBg.png'

import { ReactComponent as TotalSurveyIcon  } from '../../assets/assigned icon (1).svg';
import { ReactComponent as UnAssignedIcon  } from '../../assets/unassigned icon.svg';


function ResearcherDashboard() {
  const [stats, setStats] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const isRTL = language === 'ar';
  const itemsPerPage = 10;

  const toggleLanguage = () => setLanguage(prev => (prev === 'ar' ? 'en' : 'ar'));

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('access');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    navigate('/login', { replace: true });
  };

  const handleSidebarToggle = () => setSidebarVisible(!sidebarVisible);
  const handleProfileToggle = () => setProfileOpen(prev => !prev);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const access = localStorage.getItem('access');
        if (!access) {
          navigate('/login', { replace: true });
          return;
        }

        const response = await api.get('/researcher-dashboard', {
          headers: { Authorization: `Bearer ${access}` },
        });
        setStats(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          handleLogout(new Event('logout'));
        } else {
          console.error('Failed to fetch dashboard:', error);
        }
      }
    }

    fetchDashboard();
  }, [navigate]);

  if (!stats) return <p>{isRTL ? 'جاري التحميل...' : 'Loading...'}</p>;

  const total = stats.total_surveys || 0;
  const solved = stats.solved_surveys || 0;
  const unsolved = stats.unsolved_surveys || 0;
  const surveys = stats.survey_table || [];

  const totalPages = Math.ceil(surveys.length / itemsPerPage);
  const currentSurveys = surveys.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const tableCellStyle = {
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: isRTL ? 'right' : 'left',
  };

  const thStyle = {
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'center',
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const calcPercentage = (num) => total === 0 ? 0 : Math.round((num / total) * 100);

  return (
    <div style={{ height: '100vh', display: 'flex',background: `url(${dashboardBg})`,backgroundAttachment: 'fixed',backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%'  }} dir={isRTL ? 'rtl' : 'ltr'}>
    
      {/* Sidebar Component */}
      {sidebarVisible && (
        <Sidebar
          isRTL={isRTL}
          sidebarVisible={sidebarVisible}
          handleSidebarToggle={handleSidebarToggle}
          handleLogout={handleLogout}
          profileOpen={profileOpen}
          setProfileOpen={setProfileOpen}
        />
      )}

      <main
        style={{
          flex: 1,
          marginLeft: sidebarVisible && !isRTL ? '250px' : 0,
          marginRight: sidebarVisible && isRTL ? '250px' : 0,
          padding: '1rem',
          overflowY: 'auto',
          height: '100vh',
          boxSizing: 'border-box',
        }}
      >
        {/* <h1 style={{ textAlign: 'center', color: '#395692' }}>
          {isRTL ? 'لوحة الباحث' : 'Researcher Dashboard'}
        </h1> */}

        {/* Stats Cards */}
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1.5rem', marginTop: '2rem' }}>
          <StatsCard title={isRTL ? 'إجمالي الاستبيانات' : 'Total Surveys'} value={total} percentage={100} color="#395692" icon={<TotalSurveyIcon  style={{ width: '29px', height: '50px' }} />}/>
          <StatsCard title={isRTL ? 'الاستبيانات المحلولة' : 'Solved Surveys'} value={solved} percentage={calcPercentage(solved)} icon={<TotalSurveyIcon  style={{ width: '29px', height: '50px' }} />} color="#28a745" />
          <StatsCard title={isRTL ? 'الاستبيانات غير المحلولة' : 'Unsolved Surveys'} value={unsolved} percentage={calcPercentage(unsolved)} icon={<UnAssignedIcon style={{ width: '29px', height: '50px' }}/>} color="#dc3545" />
        </div>

    {/* Table */}
<div style={{ overflowX: 'auto', marginTop: '2rem' }}>
  <table style={{
    width: '93%',
    borderSpacing: '0',
    borderCollapse: 'separate',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    backgroundColor: '#395692',
  }}>
    <thead style={{ backgroundColor: '#395692', color: '#fff' }}>
      <tr>
        <th style={headerCell}>{isRTL ? 'عنوان الاستبيان' : 'Survey Title'}</th>
        <th style={headerCell}>{isRTL ? 'عدد الردود' : 'Submissions'}</th>
        <th style={headerCell}>{isRTL ? 'المطلوب' : 'Required'}</th>
        <th style={headerCell}>{isRTL ? 'الحالة' : 'Status'}</th>
      </tr>
    </thead>
    <tbody>
      {currentSurveys.length > 0 ? (
        currentSurveys.map((survey, index) => (
          <React.Fragment key={survey.id}>
            <tr>
              <td style={cell}>{survey.title}</td>
              <td style={cell}>{survey.actual_submissions}</td>
              <td style={cell}>{survey.required_submissions}</td>
              <td style={cell}>
                <span style={{
                  backgroundColor: survey.actual_submissions >= survey.required_submissions ? '#f44336' : '#4caf50',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                }}>
                  {survey.actual_submissions >= survey.required_submissions
                    ? (isRTL ? 'نعم' : 'Closed')
                    : (isRTL ? 'لا' : 'Active')}
                </span>
              </td>
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
                    <linearGradient id={`survey-line-${index}`} x1="0" y1="1" x2="855.666" y2="1" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#395692" />
                      <stop offset="0.5" stopColor="#E0E1E2" />
                      <stop offset="1" stopColor="#F19303" />
                    </linearGradient>
                  </defs>
                  <path d="M0 1H864" stroke={`url(#survey-line-${index})`} strokeWidth="2" />
                </svg>
              </td>
            </tr>
          </React.Fragment>
        ))
      ) : (
        <tr>
          <td colSpan="4" style={{ ...cell, textAlign: 'center', color: '#ddd' }}>
            {isRTL ? 'لا توجد بيانات' : 'No data available'}
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


        {/* Pagination */}
        <div style={{
          marginTop: '1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.5rem',
        }}>
          <button onClick={handlePrevPage} disabled={currentPage === 1}  
          style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#395692',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            }}>
            {isRTL ? 'السابق' : 'Previous'}
          </button>
          <span style={{ fontWeight: '600', color: '#395692' }}>
            {`${isRTL ? 'الصفحة' : 'Page'} ${currentPage} ${isRTL ? 'من' : 'of'} ${totalPages}`}
          </span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}  
          style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#395692',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            }}>
            {isRTL ? 'التالي' : 'Next'}
          </button>
        </div>
      </main>
    </div>
  );
}

function StatsCard({ title, value, percentage, color, icon }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: `linear-gradient(127deg, #395692 28.26%, rgba(26, 31, 55, 0.50) 91.2%)`,
        borderRadius: '10px',
        width: '282px',
        height: '70px',
        padding: '1rem 1.2rem',
        // borderLeft: `6px solid ${color}`,
        boxShadow: '0 2px 6px #616161',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{ fontSize: '12px', color: '#BAB8B8', marginBottom: '0.4rem', fontWeight: 500, fontFamily: 'Poppins' }}>
          {title}
        </p>
        <h2 style={{ fontSize: '21px', fontWeight: 600, color: '#fff', margin: 0 }}>
          {value}
          <span style={{ fontSize: '12px', marginLeft: '2.5rem', color: '#01B574', fontWeight: 400 }}>
            {percentage >= 0 ? '+' : ''}{percentage}%
          </span>
        </h2>
      </div>
      <div style={{ marginLeft: '1rem' }}>
        {icon}
      </div>
    </div>
  );
}
const headerCell = {
  padding: '14px 16px',
  textAlign: 'center',
  fontWeight: '600',
  fontSize: '15px',
  borderBottom: '1px solid #ddd',
};

const cell = {
  padding: '12px 16px',
  textAlign: 'center',
  fontSize: '14px',
  color: '#fff',
  wordWrap: 'break-word',
};

export default ResearcherDashboard;
