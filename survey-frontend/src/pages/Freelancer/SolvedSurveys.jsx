import React, { useEffect, useState } from 'react';
import api from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import FreelancerSidebar from '../../components/FreelancerSidebar';
import dashboardBg from '../../assets/dashboardBg.png'

const SolvedSurveys = () => {
  const [surveys, setSurveys] = useState([]);
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  
  const isRTL = language === 'ar';

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    async function fetchSolvedSurveys() {
      try {
        const token = localStorage.getItem('access');
        if (!token) {
          handleLogout();
          return;
        }

        const response = await api.get('/surveys/solved/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data)
        setSurveys(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          handleLogout();
        } else {
          console.error('Error fetching solved surveys:', err);
        }
      }
    }

    fetchSolvedSurveys();
  }, []);

  return (
     <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: "'Segoe UI', sans-serif" , background: `url(${dashboardBg})`,
             backgroundAttachment: 'fixed',
             backgroundRepeat: 'no-repeat',
             backgroundSize: '100% 100%'}}>
      
      {sidebarVisible && (
        <FreelancerSidebar
          isRTL={isRTL}
          sidebarVisible={sidebarVisible}
          handleSidebarToggle={() => setSidebarVisible(false)}
          handleLogout={handleLogout}
          profileOpen={profileOpen}
          setProfileOpen={setProfileOpen}
        />
      )}

      <main style={{
        flex: 1,
        padding: '2rem',
        transition: 'margin 0.3s ease',
        marginLeft: isRTL ? 0 : sidebarVisible ? '220px' : '0',
        marginRight: isRTL ? (sidebarVisible ? '220px' : '0') : 0
      }}>


        {surveys.length === 0 ? (
          <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>No solved surveys found.</p>
        ) : (
          <div style={{
            overflowX: 'auto',
            backgroundColor: '#395692',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            padding: '1rem',
            maxWidth: '1000px',
            margin: '36px auto',
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '1rem',
              color: '#fff',
            }}>
              <thead>
                <tr style={{ backgroundColor: '#395692' }}>
                  <th style={headerStyle}> Survey Title</th>
                  <th style={headerStyle}> Submitted At</th>
                  <th style={headerStyle}> {isRTL ? 'إجراء' : 'Action'}</th>

                </tr>
              </thead>
              <tbody>
              {surveys.map((s, index) => (
                <React.Fragment key={index}>
                  <tr
                    style={{
                      backgroundColor: '#395692',
                      transition: 'background-color 0.3s ease',
                    }}
                  >
                    <td style={cellStyle}>{s.survey_title}</td>
                    <td style={cellStyle}>{new Date(s.submitted_at).toLocaleString()}</td>
                    <td style={cellStyle}>
                      <button
                        onClick={() => navigate(`/surveys/solved/${s.survey_id}`)}
                        style={{
                          backgroundColor: '#F19303',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '40px',
                          padding: '6px 12px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          alignItems:'center',
                          justifyContent:"center",
                        }}
                      >
                        {isRTL ? 'عرض' : 'View'}
                      </button>
                    </td>
                  </tr>

                  {/* Gradient line under the row */}
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
      </main>
    </div>
  );
};

// ✅ All styles in one object
const headerStyle = {
  padding: '1rem',
  textAlign: 'left',
  fontWeight: '600',
  fontSize: '1rem',
  borderBottom: '2px solid #ddd',
  textAlign:'center'
};

const cellStyle = {
  padding: '2.2rem',
  // borderBottom: '1px solid #2c3e50',
  color: '#fff',
  fontSize: '1rem',
  textAlign:'center'
};
const styles = {
  main: {
    flex: 1,
    padding: '2rem',
    backgroundColor: '#f9fafb',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  noData: {
    color: '#7f8c8d',
    fontSize: '1.1rem',
    textAlign: 'center',
  },
  tableWrapper: {
    overflowX: 'auto',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    padding: '1rem',
    margin: '0 auto',
    maxWidth: '1000px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '1rem',
    color: '#2d3436',
  },
  theadRow: {
    backgroundColor: '#f1f1f1',
  },
  headerCell: {
    padding: '1rem',
    textAlign: 'left',
    fontWeight: '600',
    borderBottom: '2px solid #ddd',
  },
  row: {
    transition: 'background-color 0.3s ease',
  },
  cell: {
    padding: '1rem',
    borderBottom: '1px solid #eee',
  },
};

export default SolvedSurveys;
