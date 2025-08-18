import React, { useEffect, useState } from 'react';
import { FaBars, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';
import AdminSidebar from '../../components/AdminSidebar';
import dashboardBg from '../../assets/dashboardBg.png'

function ManageSurveysPage({ isRTL }) {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({ username: '', image: '' });
  const navigate = useNavigate();

  const fetchSurveys = async () => {
    try {
      const token = localStorage.getItem('access');
      const response = await api.get('/api/admin/surveys/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSurveys(response.data);
    } catch (error) {
      console.error('Error fetching surveys:', error);
    } finally {
      setLoading(false);
    }
  };

//   const fetchUserInfo = async () => {
//     try {
//       const res = await api.get('/api/admin/profile', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
//       });
//       const user = res.data.user;
//       const username = `${user.first_name} ${user.last_name}` || 'Admin';
//       const image = res.data.image || 'https://www.w3schools.com/howto/img_avatar.png';
//       setUserInfo({ username, image });
//     } catch (err) {
//       console.error('Error loading profile:', err);
//     }
//   };

  useEffect(() => {
    fetchSurveys();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(isRTL ? 'هل أنت متأكد من حذف الاستبيان؟' : 'Are you sure you want to delete this survey?')) return;
    try {
      const token = localStorage.getItem('access');
      await api.delete(`/api/admin/surveys/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSurveys((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      alert(isRTL ? 'فشل الحذف' : 'Failed to delete survey');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column',background: `url(${dashboardBg})`,backgroundAttachment: 'fixed',backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%'  }} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Sidebar Toggle for Mobile */}
      {!sidebarVisible && (
        <button onClick={() => setSidebarVisible(true)} style={{
          position: 'fixed',
          top: '1rem',
          [isRTL ? 'right' : 'left']: '1rem',
          zIndex: 1200,
          backgroundColor: '#395692',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          padding: '0.5rem 0.7rem',
          cursor: 'pointer',
        }}>
          <FaBars size={20} />
        </button>
      )}

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {sidebarVisible && (
          <AdminSidebar
            isRTL={isRTL}
            handleSidebarToggle={() => setSidebarVisible(false)}
            handleLogout={handleLogout}
            username={userInfo.username}
            userImage={userInfo.image}
          />
        )}

        <main style={{
          flex: 1,
          marginLeft: sidebarVisible && !isRTL ? '220px' : 0,
          marginRight: sidebarVisible && isRTL ? '220px' : 0,
          overflowY: 'auto',
          height: '100vh',
          padding: '1rem',
          boxSizing: 'border-box',
        }}>
          {/* <h2 style={{ marginBottom: '1.5rem', color: '#395692', textAlign: 'center' }}>
            {isRTL ? 'إدارة الاستبيانات' : 'Manage Surveys'}
          </h2> */}

          {loading ? (
            <p>{isRTL ? 'جاري التحميل...' : 'Loading surveys...'}</p>
          ) : (
          <div style={{ overflowX: 'auto' }}>
  <table style={{
    width: '93%',
    borderSpacing: '0',
    borderCollapse: 'separate',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop:'50px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    backgroundColor: '#395692',
  }}>
    <thead style={{ backgroundColor: '#395692', color: '#fff' }}>
      <tr>
        <th style={headerCell}>{isRTL ? 'العنوان' : 'Title'}</th>
        <th style={headerCell}>{isRTL ? 'الحالة' : 'Status'}</th>
        <th style={headerCell}>{isRTL ? 'الإجراءات' : 'Actions'}</th>
      </tr>
    </thead>
    <tbody>
      {surveys.map((survey, index) => (
        <React.Fragment key={survey.id}>
          <tr style={{ borderBottom: '1px solid #eee', transition: 'background 0.3s' }}>
            <td style={cell}>{survey.title}</td>
            <td style={cell}>{survey.is_published ? (isRTL ? 'منشور' : 'Published') : (isRTL ? 'غير منشور' : 'Unpublished')}</td>
            <td style={cell}>
              <button
                onClick={() => handleDelete(survey.id)}
                style={actionBtn('#dc3545')}
              >
                <FaTrash />
              </button>
            </td>
          </tr>

          {/* One-line Gradient Under Entire Row */}
          <tr>
            <td colSpan={3} style={{ padding: 0 }}>
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
};

const actionBtn = (bg) => ({
  margin: '0 5px',
  padding: '6px 12px',
  borderRadius: '6px',
  backgroundColor: bg,
  color: '#fff',
  border: 'none',
  borderRadius: '40px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  width: '80px',
  height: '30px',
});

export default ManageSurveysPage;
