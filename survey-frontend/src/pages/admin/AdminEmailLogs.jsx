import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import api from '../../axiosConfig';
import AdminSidebar from '../../components/AdminSidebar';
import dashboardBg from '../../assets/dashboardBg.png'

function AdminEmailLogs({ isRTL }) {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState('');
  const [userInfo, setUserInfo] = useState({ username: '', image: '' });

  useEffect(() => {
    fetchLogs();
    fetchUser();
  }, [search]);

  const fetchLogs = async () => {
    try {
      const res = await api.get(`/api/admin/email-logs?search=${search}`);
      setLogs(res.data);
    } catch (err) {
      console.error('Failed to load email logs', err);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await api.get('/api/admin/profile');
      const user = res.data.user;
      const name = `${user.first_name} ${user.last_name}`;
      const image = res.data.image || 'https://www.w3schools.com/howto/img_avatar.png';
      setUserInfo({ username: name, image });
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' ,background: `url(${dashboardBg})`,backgroundAttachment: 'fixed',backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%' }} dir={isRTL ? 'rtl' : 'ltr'}>
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
            {isRTL ? 'سجل الإيميلات' : 'Email Logs'}
          </h2> */}

          {/* Search Field */}
          <div style={{ textAlign: isRTL ? 'right' : 'left' ,marginTop:'30px'}}>
            <input
              type="text"
              placeholder={isRTL ? 'ابحث بالبريد أو العنوان...' : 'Search by email or subject...'}
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
                marginTop:'23px'
              }}
            />
          </div>

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
        <th style={headerCell}>{isRTL ? 'البريد' : 'Recipient'}</th>
        <th style={headerCell}>{isRTL ? 'الموضوع' : 'Subject'}</th>
        <th style={headerCell}>{isRTL ? 'الرسالة' : 'Message'}</th>
        <th style={headerCell}>{isRTL ? 'الحالة' : 'Status'}</th>
        <th style={headerCell}>{isRTL ? 'الوقت' : 'Timestamp'}</th>
      </tr>
    </thead>
    <tbody>
      {logs.length === 0 ? (
        <tr>
          <td colSpan="5" style={{ ...cell, textAlign: 'center', color: '#ddd' }}>
            {isRTL ? 'لا توجد سجلات' : 'No email logs found'}
          </td>
        </tr>
      ) : (
        logs.map((log, index) => (
          <React.Fragment key={log.id}>
            <tr style={{ borderBottom: '1px solid #eee', transition: 'background 0.3s' }}>
              <td style={cell}>{log.recipient}</td>
              <td style={cell}>{log.subject}</td>
              <td style={{ ...cell, width: '300px' }}>{log.message}</td>
              <td style={cell}>
                <span style={{
                  padding: '4px 10px',
                  backgroundColor: log.status === 'sent' ? '#4caf50' : '#f44336',
                  borderRadius: '20px',
                  color: '#fff',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                }}>
                  {isRTL
                    ? log.status === 'sent' ? 'تم الإرسال' : 'فشل'
                    : log.status === 'sent' ? 'Sent' : 'Failed'}
                </span>
              </td>
              <td style={cell}>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
            <tr>
              <td colSpan="5" style={{ padding: 0 }}>
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

export default AdminEmailLogs;
