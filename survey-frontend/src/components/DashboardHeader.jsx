import React, { useEffect, useState } from 'react';
import { FaBell, FaTimes, FaBars } from 'react-icons/fa';

const COLORS = ['#395692', '#F19303'];

function ResearcherDashboard() {
  const [stats, setStats] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);  // <-- new state

  // Default language set to English
  const [language, setLanguage] = useState('en');
  const isRTL = language === 'ar';

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleSidebarToggle = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Toggle profile submenu open/close
  const handleProfileToggle = () => {
    setProfileOpen(prev => !prev);
  };

 useEffect(() => {
  const fetchStats = async () => {
    const response = await fetch('https://survey-ink.com/researcher-dashboard', {
      method: 'GET',
      credentials: 'include', // 🔥 This sends cookies with the request
    });

    if (response.ok) {
      const result = await response.json();
      setStats(result);
    } else {
      console.error('Failed to fetch stats');
    }
  };

  fetchStats();
}, []);

  if (!stats) return <p>{isRTL ? 'جاري التحميل...' : 'Loading...'}</p>;

  // ... your existing totalSurveyData, solvedSurveyData, unsolvedSurveyData etc ...

  const tableCellStyle = {
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: isRTL ? 'right' : 'left',
  };

  return (
    <div
      style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* No Header anymore */}

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {sidebarVisible && (
          <aside
            style={{
              width: '250px',
              background: '#f4f4f4',
              height: '100vh',
              padding: '1rem',
              borderRight: isRTL ? 'none' : '1px solid #ddd',
              borderLeft: isRTL ? '1px solid #ddd' : 'none',
              overflowY: 'auto',
              position: 'fixed',
              top: 0,
              left: isRTL ? 'auto' : 0,
              right: isRTL ? 0 : 'auto',
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              zIndex: 1100,
            }}
          >
            <button
              onClick={handleSidebarToggle}
              style={{
                alignSelf: isRTL ? 'flex-start' : 'flex-end',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#333',
                marginBottom: '1rem',
              }}
              aria-label={isRTL ? "إغلاق الشريط الجانبي" : "Close sidebar"}
            >
              <FaTimes size={24} />
            </button>

            <h2 style={{ color: '#395692' }}>{isRTL ? '📋 لوحة التحكم' : '📋 Dashboard'}</h2>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                marginTop: '1rem',
                flexGrow: 1,
                textAlign: isRTL ? 'right' : 'left',
              }}
            >
              <li style={sidebarItem}>{isRTL ? '➕ إنشاء استبيان جديد' : '➕ Create New Survey'}</li>
              <li style={sidebarItem}>{isRTL ? '🧾 عرض كل الاستبيانات' : '🧾 View All Surveys'}</li>
              <li style={sidebarItem}>{isRTL ? '📥 عرض الردود' : '📥 View Responses'}</li>
              <li style={sidebarItem}>{isRTL ? '📊 تحليل الاستبيان' : '📊 Analyze Survey'}</li>

              {/* Profile menu item */}
              <li
                style={{ 
                  ...sidebarItem, 
                  cursor: 'pointer', 
                  userSelect: 'none',
                  fontWeight: profileOpen ? 'bold' : 'normal',
                }}
                onClick={handleProfileToggle}
                aria-expanded={profileOpen}
                aria-haspopup="true"
              >
                {isRTL ? '👤 الملف الشخصي' : '👤 Profile'}
              </li>

              {/* Profile dropdown submenu */}
              {profileOpen && (
                <ul
                  style={{
                    listStyle: 'none',
                    paddingLeft: isRTL ? 0 : '1rem',
                    paddingRight: isRTL ? '1rem' : 0,
                    marginTop: '0.5rem',
                  }}
                >
                  <li
                    style={submenuItem}
                    onClick={() => alert('Go to Profile page')}
                  >
                    {isRTL ? 'الصفحة الشخصية' : 'Profile Page'}
                  </li>
                  <li
                    style={submenuItem}
                    onClick={() => alert('Go to Change Password')}
                  >
                    {isRTL ? 'تغيير كلمة المرور' : 'Change Password'}
                  </li>
                  <li
                    style={submenuItem}
                    onClick={() => alert('Logging out')}
                  >
                    {isRTL ? 'تسجيل الخروج' : 'Logout'}
                  </li>
                </ul>
              )}
            </ul>
          </aside>
        )}

        <main
          style={{
            flex: 1,
            padding: '2rem',
            marginLeft: sidebarVisible && !isRTL ? '250px' : 0,
            marginRight: sidebarVisible && isRTL ? '250px' : 0,
            overflowY: 'auto',
            height: '100vh',
            boxSizing: 'border-box',
            textAlign: isRTL ? 'right' : 'left',
          }}
        >
          {/* Your main dashboard content */}
          <h1>{isRTL ? 'لوحة الباحث' : 'Researcher Dashboard'}</h1>
          {/* Charts and tables here */}
        </main>
      </div>
    </div>
  );
}

const sidebarItem = {
  margin: '1rem 0',
  cursor: 'pointer',
  padding: '8px',
  borderRadius: '4px',
  transition: 'background 0.3s',
  userSelect: 'none',
};

const submenuItem = {
  padding: '6px 12px',
  cursor: 'pointer',
  borderRadius: '3px',
  userSelect: 'none',
  backgroundColor: '#e8e8e8',
  margin: '0.3rem 0',
};

export default ResearcherDashboard;
