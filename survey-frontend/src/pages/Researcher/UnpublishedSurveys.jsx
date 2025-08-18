import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar'; 
import { FaBars } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dashboardBg from '../../assets/dashboardBg.png'

function UnpublishedSurveys({ isRTL }) {
  const [surveys, setSurveys] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Hide sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      setSidebarVisible(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch unpublished surveys
  const fetchSurveys = async () => {
    try {
      const token = localStorage.getItem('access');
      const response = await axios.get('http://localhost:8000/unpublished-surveys/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSurveys(response.data);
    } catch (error) {
      console.error('Error fetching unpublished surveys:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/login');
    } else {
      fetchSurveys();
    }
  }, []);
const handlePublish = async (id) => {
  try {
    const token = localStorage.getItem('access');
    await axios.post(
      `http://localhost:8000/publish-survey/${id}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success('Survey published successfully');
    navigate('/all-surveys')
    // Optional: refresh surveys list or update UI
  } catch (error) {
    console.error('Publish error:', error);
    toast.error('Failed to publish survey');
  }
};
  const handleSidebarToggle = () => setSidebarVisible(!sidebarVisible);
  const handleProfileToggle = () => setProfileOpen(!profileOpen);
  const toggleLanguage = () => alert(isRTL ? 'Switch to English' : 'التبديل إلى العربية');
  const handleLogout = () => {
    localStorage.removeItem('access');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', direction: isRTL ? 'rtl' : 'ltr', background: `url(${dashboardBg})`,backgroundAttachment: 'fixed',backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%' }}>
      <Sidebar
        isRTL={isRTL}
        sidebarVisible={sidebarVisible}
        handleSidebarToggle={handleSidebarToggle}
        profileOpen={profileOpen}
        handleProfileToggle={handleProfileToggle}
        toggleLanguage={toggleLanguage}
        handleLogout={handleLogout}
      />

      <div
        style={{
          flexGrow: 1,
          padding: '2rem',
          backgroundColor: '#f4f7fe',
          minHeight: '100vh',
          marginLeft: isRTL ? 0 : sidebarVisible ? '270px' : "30px",
          marginRight: isRTL ? (sidebarVisible ? '250px' : 0) : 0,
          transition: 'margin 0.3s ease',
           background: `url(${dashboardBg})`,backgroundAttachment: 'fixed',backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%'
        }}
      >
        {/* Toggle Button */}
        {/* <button
          onClick={handleSidebarToggle}
          style={{
            position: 'fixed',
            top: '1rem',
            left: isRTL ? 'auto' : '1rem',
            right: isRTL ? '1rem' : 'auto',
            zIndex: 1200,
            backgroundColor: '#395692',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '0.5rem 0.75rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
          aria-label={isRTL ? 'تبديل الشريط الجانبي' : 'Toggle sidebar'}
        >
          <FaBars />
        </button> */}
        <ToastContainer position="top-right" autoClose={3000} />
{/* 
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#395692' }}>
          {isRTL ? 'الاستبيانات غير المنشورة' : 'Unpublished Surveys'}
        </h1> */}

       {surveys.length === 0 ? (
  <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>{isRTL ? 'لا توجد استبيانات غير منشورة.' : 'No unpublished surveys found.'}</p>
) : (
  <div style={{
    overflowX: 'auto',
    backgroundColor: '#395692',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    padding: '1rem',
    maxWidth: '1000px',
    margin: '18px auto',
    

  }}>
    <table style={{
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '1rem',
      color: '#2d3436',

    }}>
      <thead>
        <tr style={{ backgroundColor: '#395692', color: '#fff' }}>
          <th style={headerStyle}>{isRTL ? '📋 العنوان' : '📋 Title'}</th>
          <th style={headerStyle}>{isRTL ? '🕒 تاريخ الإنشاء' : '🕒 Created At'}</th>
          <th style={headerStyle}>{isRTL ? '⚙️ إجراء' : '⚙️ Action'}</th>
        </tr>
      </thead>
      <tbody>
        {surveys.map((survey, index) => (
          <React.Fragment key={survey.id}>
            <tr style={{ backgroundColor: '#395692', transition: 'background-color 0.3s ease' }}>
              <td style={cellStyle}>{survey.title}</td>
              <td style={cellStyle}>{new Date(survey.created_at).toLocaleDateString()}</td>
              <td style={ {...cellStyle}}>
                <button
                  onClick={() => handlePublish(survey.id)}
                  style={{
                    backgroundColor: '#F19303',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '40px',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    
                  }}
                >
                  {isRTL ? 'نشر' : 'Publish'}
                </button>
                    <button onClick={() => navigate(`/survey/${survey.id}/display/`)} style={{                    backgroundColor: '#F19303',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '40px',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    marginLeft:'8px',
                    fontWeight: 'bold',}}>
                    {isRTL ? 'عرض' : 'View'}
                  </button>
                  <button onClick={() => navigate(`/survey/${survey.id}/edit/`)} style={{                    color: '#fff',
                    border: 'none',
                    borderRadius: '40px',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    marginLeft:'8px',
                    fontWeight: 'bold',
                    backgroundColor: '#F19303',

                    }}>
                    {isRTL ? 'تعديل' : 'Edit'}
                  </button>
              </td>
            </tr>
            <tr>
              <td colSpan={3} style={{ padding: 0 }}>
                <div style={{ height: '2px', width: '100%' }}>
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
                    <path d="M0 1H864" stroke={`url(#gradient-${index})`} strokeWidth="2" />
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
      </div>
    </div>
  );
}
const headerStyle = {
  padding: '1rem',
  textAlign: 'center',
  fontWeight: '600',
  fontSize: '1rem',
  borderBottom: '2px solid #ddd',
};

const cellStyle = {
  dispalay:'flex',
  paddingTop: '2rem',
  color: '#fff',
  fontSize: '1rem',
  textAlign: 'center',
    marginTop: '100px', // adjust spacing here
  justifyContent:"center"

};
export default UnpublishedSurveys;
