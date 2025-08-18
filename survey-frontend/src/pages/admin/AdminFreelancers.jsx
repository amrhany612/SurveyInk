import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import api from '../../axiosConfig';
import AdminSidebar from '../../components/AdminSidebar';
import dashboardBg from '../../assets/dashboardBg.png'

function AdminFreelancers({ isRTL }) {
  const [freelancers, setFreelancers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [userInfo, setUserInfo] = useState({ username: '', image: '' });

  const fetchFreelancers = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem('access'); // or whatever key you're using
    if (!token) {
      throw new Error('No access token found');
    }

    const res = await api.get(`/api/admin/freelancers/?search=${search}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setFreelancers(res.data);
  } catch (err) {
    console.error('Failed to fetch freelancers:', err);
  }
  setLoading(false);
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
    fetchFreelancers();
    fetchUserInfo();
  }, [search]);

  const handleBlock = async (id) => {
    await api.post(`/api/admin/users/${id}/toggle-block`);
    fetchFreelancers();
  };

  const handleDelete = async (id) => {
    if (window.confirm(isRTL ? 'هل أنت متأكد من الحذف؟' : 'Are you sure to delete?')) {
      await api.delete(`/api/admin/users/${id}`);
      fetchFreelancers();
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

          <div style={{ textAlign: isRTL ? 'right' : 'left',marginTop:'30px' }}>
            <input
              type="text"
              placeholder={isRTL ? 'ابحث بالاسم...' : 'Search by name...'}
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
                marginLeft:'50px',
                marginTop:'20px'

              }}
            />
          </div>

         {loading ? (
  <p>{isRTL ? 'جاري التحميل...' : 'Loading...'}</p>
) : (
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
          <th style={headerCell}>{isRTL ? 'الاسم' : 'Name'}</th>
          <th style={headerCell}>{isRTL ? 'البريد' : 'Email'}</th>
          <th style={headerCell}>{isRTL ? 'الحالة' : 'Status'}</th>
          <th style={headerCell}>{isRTL ? 'الإجراءات' : 'Actions'}</th>
        </tr>
      </thead>
      <tbody>
        {freelancers.map((f, index) => (
          <React.Fragment key={f.id}>
            <tr style={{ borderBottom: '1px solid #eee', transition: 'background 0.3s' }}>
              <td style={cell}>{f.name}</td>
              <td style={cell}>{f.email}</td>
              <td style={cell}>
                {f.is_active ? (isRTL ? 'نشط' : 'Active') : (isRTL ? 'محظور' : 'Blocked')}
              </td>
              <td style={cell}>
                <button
                  onClick={() => handleBlock(f.id)}
                  style={actionBtn(f.is_active ? '#F19303' : '#28a745')}
                >
                  {f.is_active ? (isRTL ? 'حظر' : 'Block') : (isRTL ? 'إلغاء الحظر' : 'Unblock')}
                </button>
                <button
                  onClick={() => handleDelete(f.id)}
                  style={actionBtn('#dc3545')}
                >
                  {isRTL ? 'حذف' : 'Delete'}
                </button>
              </td>
            </tr>

            {/* One-line Gradient Under Entire Row */}
            <tr>
              <td colSpan={4} style={{ padding: 0 }}>
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
  borderRadius:'40px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  width: '80px',
  height: '30px'
});

export default AdminFreelancers;
