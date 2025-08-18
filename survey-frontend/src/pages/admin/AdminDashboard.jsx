import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';
import api from '../../axiosConfig';
import AdminSidebar from '../../components/AdminSidebar';
import dashboardBg from '../../assets/dashboardBg.png'

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({ username: '', image: '' });

  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();
  const isRTL = language === 'ar';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    async function fetchStats() {
      try {
        const token = localStorage.getItem('access');
        if (!token) return handleLogout();

        const response = await api.get('api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data)
        setStats(response.data);
        const user = response.data.user_info.user;
        const username = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Admin';
        const image = response.data.image || 'https://www.w3schools.com/howto/img_avatar.png';
        setUserInfo({ username, image });
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) handleLogout();
      }
    }

    fetchStats();
  }, []);

  if (!stats) return <p>{isRTL ? 'جاري التحميل...' : 'Loading...'}</p>;

const {
  total_researchers,
  total_freelancers,
  total_surveys,
  total_responses,
  monthly_users,
  yearly_users,
} = stats;
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column',background: `url(${dashboardBg})`,backgroundAttachment: 'fixed',backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%' }} dir={isRTL ? 'rtl' : 'ltr'}>
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

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
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
          marginTop:'15px'
        }}>


          {/* Stats */}
<div style={{
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1.5rem',
  justifyContent: 'center',
  marginTop: '2rem',
}}>
  <StatsCard title={isRTL ? 'عدد الباحثين' : 'Total Researchers'} value={stats.total_researchers} color="#007bff" />
  <StatsCard title={isRTL ? 'عدد العاملين' : 'Total Freelancers'} value={stats.total_freelancers} color="#6610f2" />
  <StatsCard title={isRTL ? 'عدد الاستبيانات' : 'Total Surveys'} value={stats.total_surveys} color="#28a745" />
  <StatsCard title={isRTL ? 'عدد الردود' : 'Total Responses'} value={stats.total_responses} color="#ffc107" />
</div>

          {/* Monthly Chart */}
         <ChartBlock
  title={isRTL ? 'عدد المستخدمين شهريًا' : 'Monthly New Users'}
  data={monthly_users.map(item => ({
    ...item,
    month: new Date(item.month).toLocaleString(isRTL ? 'ar-EG' : 'en-US', { month: 'short', year: '2-digit' }),
  }))}
  dataKey="month"
  color="#395692"
/>

{/* Yearly Chart */}
<ChartBlock
  title={isRTL ? 'عدد المستخدمين سنويًا' : 'Yearly New Users'}
  data={yearly_users.map(item => ({
    ...item,
    year: new Date(item.year).getFullYear(),
  }))}
  dataKey="year"
  color="#2E8B57"
/>
        </main>
      </div>
    </div>
  );
}

const StatsCard = ({ title, value, color }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
    background: `linear-gradient(127deg, #395692 28.26%, rgba(26, 31, 55, 0.50) 91.2%)`,
    borderRadius: '10px',
    width: '268px',
    height: '80px',
    padding: '1rem',
    // borderLeft: `6px solid ${color}`,
    // boxShadow: '0 2px 6px #616161',
  }}>
    <p style={{ fontSize: '14px', color: '#BAB8B8', marginBottom: '0.4rem', fontWeight: 600 }}>{title}</p>
    <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#FEA319' }}>{value}</h2>
  </div>
);

const ChartBlock = ({ title, data, dataKey, color }) => (
  <div style={{ width: '100%', height: '300px', marginTop: '2.5rem' }}>
    <h2 style={{ textAlign: 'center', marginBottom: '1rem', color }}>{title}</h2>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill={color} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default AdminDashboard;
