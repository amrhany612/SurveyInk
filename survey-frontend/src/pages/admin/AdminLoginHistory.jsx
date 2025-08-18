import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import api from '../../axiosConfig';
import AdminSidebar from '../../components/AdminSidebar';
import dashboardBg from '../../assets/dashboardBg.png'

function AdminLoginHistory({ isRTL }) {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [userInfo, setUserInfo] = useState({ username: '', image: '' });

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('access');
      const res = await api.get(`/api/admin/login-history?search=${search}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch login history:', err);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const res = await api.get('/api/admin/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
      });
      const user = res.data.user;
      const username = `${user.first_name} ${user.last_name}` || 'Admin';
      const image = res.data.image || 'https://www.w3schools.com/howto/img_avatar.png';
      setUserInfo({ username, image });
    } catch (err) {
      console.error('Error loading profile:', err);
    }
  };

  useEffect(() => {
    fetchHistory();
    fetchUserInfo();
  }, [search]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: `url(${dashboardBg})`,backgroundAttachment: 'fixed',backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%' }} dir={isRTL ? 'rtl' : 'ltr'}>
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
            {isRTL ? 'سجل الدخول' : 'Login History'}
          </h2> */}

          {/* Search Field */}
          <div style={{ textAlign: isRTL ? 'right' : 'left',marginTop:'30px' }}>
            <input
              type="text"
              placeholder={isRTL ? 'ابحث بالبريد أو IP...' : 'Search by email or IP...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                width: '239px',
                maxWidth: '400px',
                marginBottom: '1.5rem',
                border: '1px solid #ccc',
                borderRadius: '6px',
                direction: isRTL ? 'rtl' : 'ltr',
                marginLeft: '50px',
                marginTop:'22px '
              }}
            />
          </div>

          {/* Table */}
         <div style={{ overflowX: 'auto' }}>
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
        <th style={headerCell}>{isRTL ? 'البريد الإلكتروني' : 'Email'}</th>
        <th style={headerCell}>{isRTL ? 'عنوان IP' : 'IP Address'}</th>
        <th style={headerCell}>{isRTL ? 'الحالة' : 'Status'}</th>
        <th style={headerCell}>{isRTL ? 'الوقت' : 'Timestamp'}</th>
      </tr>
    </thead>
    <tbody>
      {history.length === 0 ? (
        <tr>
          <td colSpan="4" style={{ ...cell, textAlign: 'center', color: '#ddd' }}>
            {isRTL ? 'لا يوجد سجل دخول' : 'No login history found'}
          </td>
        </tr>
      ) : (
        history.map((entry, index) => (
          <React.Fragment key={index}>
            <tr>
              <td style={cell}>{entry.email}</td>
              <td style={cell}>{entry.ip_address}</td>
              <td style={cell}>
                <span style={{
                  padding: '4px 10px',
                  backgroundColor: entry.status === 'success' ? '#4caf50' : '#f44336',
                  borderRadius: '20px',
                  color: '#fff',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                }}>
                  {isRTL
                    ? entry.status === 'success' ? 'ناجح' : 'فشل'
                    : entry.status === 'success' ? 'Success' : 'Failure'}
                </span>
              </td>
              <td style={cell}>{new Date(entry.timestamp).toLocaleString()}</td>
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
                      id={`login-gradient-${index}`}
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
                  <path d="M0 1H864" stroke={`url(#login-gradient-${index})`} strokeWidth="2" />
                </svg>
              </td>
            </tr>
          </React.Fragment>
        ))
      )}
    </tbody>
  </table>
</div>
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
  wordWrap: 'break-word',
};

export default AdminLoginHistory;
