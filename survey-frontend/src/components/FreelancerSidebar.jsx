// src/components/FreelancerSidebar.js
import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import logo from '../assets/logo3.png';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../axiosConfig';
import { ReactComponent as solvedIcon } from '../assets/assigned icon.svg';
// import  pendingIcon  from '../assets/pending.png';
import { ReactComponent as surveyIcon } from '../assets/chart.svg';
import profileIcon from '../assets/profile-circle_svgrepo.com.svg';
import { Link } from 'react-router-dom';

import Vector from '../assets/Vector 6.svg'
function FreelancerSidebar({
  isRTL,
  sidebarVisible,
  handleSidebarToggle,
  handleLogout,
  profileOpen,
  setProfileOpen,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [surveysOpen, setSurveysOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({ username: '', image: '' });

  // Open "Services" dropdown if path matches "/services"
  useEffect(() => {
    if (location.pathname.startsWith('/services')) {
      setServicesOpen(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('access');
        const response = await api.get('/freelancer-dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = response.data.user_info.user;
        const defaultImage = 'https://www.w3schools.com/howto/img_avatar.png';
        const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim();
        const image = response.data.image || defaultImage;

        setUserInfo({ username: fullName || 'User', image });
      } catch (error) {
        console.error('Sidebar user info error:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleClickProfile = () => navigate('/profile');
  const handleClickDashboard = () => navigate('/freelancer-dashboard');

  const toggleLanguage = () => {
    const newLang = localStorage.getItem('lang') === 'ar' ? 'en' : 'ar';
    localStorage.setItem('lang', newLang);
    window.location.reload();
  };

  const SidebarItem = ({ children, onClick, active ,icon: Icon}) => {
    const [isHovered, setIsHovered] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <li
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          margin: '1rem 0',
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '4px',
          color: '#000',
          backgroundColor: active || isHovered ? '#F19303' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        {Icon && <Icon size={18} />}
        <span>{children}</span>
      </li>
      <img
        src={Vector}
        alt="underline"
        style={{
          display: 'block',
          width: '158px',
          marginTop: '-4px',
          marginLeft: '10px',
        }}
      />
    </div>
  );
  };

  if (!sidebarVisible) return null;

  return (
    <aside
      style={{
        width: '260px',
        background: 'transparent',
        color: 'white',
        height: 'calc(100vh - 64px)', // updated
        padding: '1rem',
        position: 'fixed',
        top: '64px', // updated
        left: isRTL ? 'auto' : 0,
        right: isRTL ? 0 : 'auto',
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1100,
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      {/* <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img src={logo} alt="Logo" style={{ maxWidth: '150px' }} />
      </div> */}
  <Link to="/freelancer-dashboard" style={{ textDecoration: 'none' }}>

  <div
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '12px 20px',
    borderRadius: '15px',
    border: '0.5px solid #FEA319',
    background: '#1A1F37',
    boxShadow: '0 3.5px 5.5px rgba(0, 0, 0, 0.05)',
    width: '240px',
    margin: '58px auto 20px',
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 23 23"
    fill="none"
    role="img"
    aria-label="Dashboard Icon"
    style={{marginRight:"15px"}}
  >
    <circle cx="11.25" cy="11.25" r="11" fill="#395692" stroke="#FEA319" strokeWidth="0.5" />
    <g transform="translate(4, 4) scale(1.1)">
      <g clipPath="url(#clip0)">
        <path
          d="M6.37217 2.85064C6.33945 2.81935 6.29593 2.80188 6.25066 2.80188C6.20539 2.80188 6.16186 2.81935 6.12915 2.85064L2.08398 6.71497C2.06681 6.7314 2.05314 6.75115 2.04381 6.77302C2.03448 6.79488 2.02968 6.81842 2.02971 6.84219L2.02905 10.469C2.02905 10.6555 2.10313 10.8343 2.23499 10.9662C2.36685 11.098 2.5457 11.1721 2.73218 11.1721H4.84375C4.93699 11.1721 5.02641 11.1351 5.09234 11.0692C5.15827 11.0032 5.19531 10.9138 5.19531 10.8206V7.83228C5.19531 7.78566 5.21383 7.74095 5.2468 7.70798C5.27976 7.67502 5.32447 7.6565 5.37109 7.6565H7.12891C7.17553 7.6565 7.22024 7.67502 7.2532 7.70798C7.28617 7.74095 7.30469 7.78566 7.30469 7.83228V10.8206C7.30469 10.9138 7.34173 11.0032 7.40766 11.0692C7.47359 11.1351 7.56301 11.1721 7.65625 11.1721H9.76694C9.95342 11.1721 10.1323 11.098 10.2641 10.9662C10.396 10.8343 10.4701 10.6555 10.4701 10.469V6.84219C10.4701 6.81842 10.4653 6.79488 10.456 6.77302C10.4466 6.75115 10.433 6.7314 10.4158 6.71497L6.37217 2.85064Z"
          fill="#FEA319"
        />
        <path
          d="M11.4118 5.99023L9.76829 4.41787V2.03186C9.76829 1.93862 9.73125 1.8492 9.66532 1.78327C9.59939 1.71734 9.50997 1.6803 9.41673 1.6803H8.36204C8.2688 1.6803 8.17938 1.71734 8.11345 1.78327C8.04752 1.8492 8.01048 1.93862 8.01048 2.03186V2.73499L6.73782 1.51814C6.61873 1.39773 6.44163 1.32874 6.25025 1.32874C6.05953 1.32874 5.88287 1.39773 5.76378 1.51836L1.09019 5.98979C0.953524 6.12163 0.936385 6.3385 1.06075 6.48132C1.09198 6.51737 1.13022 6.54669 1.17314 6.56749C1.21606 6.5883 1.26277 6.60015 1.31041 6.60233C1.35806 6.60451 1.40565 6.59697 1.45029 6.58017C1.49493 6.56337 1.53569 6.53766 1.57008 6.50461L6.1294 2.14788C6.16211 2.11658 6.20564 2.09912 6.25091 2.09912C6.29618 2.09912 6.3397 2.11658 6.37242 2.14788L10.9322 6.50461C10.9993 6.56903 11.0893 6.60418 11.1824 6.60237C11.2754 6.60055 11.3639 6.56192 11.4285 6.49495C11.5635 6.3552 11.5522 6.12449 11.4118 5.99023Z"
          fill="#FEA319"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </g>
  </svg>

  <span
    style={{
      color: '#FEA319',
      fontSize: '16px',
      fontWeight: 500,
      fontFamily: 'Poppins, sans-serif',
      letterSpacing: '0.5px',
    }}
  >
    DASHBOARD
  </span>

</div>
</Link>


      {/* User  Info */}
    <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem',
              padding: '0.5rem',
              border: '2px solid #395692',  // light gray solid border
              borderRadius: '15px',  
              width:'240px'
            }}
          >
            <img
              src={profileIcon}
              alt="Profile"
              title="Profile"
              style={{ width: '28px', height: '28px', cursor: 'pointer',marginLeft:'30px' }}
            />
            <span style={{ fontWeight: 500, fontSize: '14px' ,color:'#000',marginLeft:'20px'}}>{userInfo.username}</span>
          </div>
    

      {/* Header + Close */}
      {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>{isRTL ? '🧑‍💻 لوحة العمل' : '🧑‍💻 Freelancer'}</h2>
        <button
          onClick={handleSidebarToggle}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'white',
          }}
        >
          <FaTimes size={20} />
        </button>
      </div> */}

      {/* Sidebar Links */}
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
        {/* <SidebarItem
          onClick={handleClickDashboard}
          icon={surveyIcon}
          active={location.pathname === '/freelancer-dashboard'}
        >
          {isRTL ? ' لوحة التحكم' : ' Survey States'}
        </SidebarItem> */}
        <SidebarItem
          onClick={() => navigate('/surveys/solved')}
          icon={solvedIcon}

          active={location.pathname === '/surveys/solved'}
        >
          {isRTL ? ' تم حلها' : ' Solved Surveys'}
        </SidebarItem>

        <SidebarItem
          onClick={() => navigate('/surveys/pending')}
          // icon={pendingIcon}
        
          active={location.pathname === '/surveys/pending'}
        >
          {isRTL ? ' قيد الانتظار' : ' Pending Surveys'}
        </SidebarItem>
{/* 
        <SidebarItem onClick={() => setServicesOpen((prev) => !prev)}>
          {isRTL ? '🛠️ الخدمات' : '🛠️ Services'}
          <span style={{ marginInlineStart: '0.5rem' }}>
            {servicesOpen ? '▲' : '▼'}
          </span>
        </SidebarItem>

        {servicesOpen && (
          <ul style={{ listStyle: 'none', paddingInlineStart: '1rem' }}>
            <SidebarItem
              onClick={() => navigate('/services/proofreading')}
              active={location.pathname === '/services/proofreading'}
            >
              {isRTL ? '📝 تدقيق لغوي' : '📝 Proofreading'}
            </SidebarItem>
            <SidebarItem
              onClick={() => navigate('/services/data-analysis')}
              active={location.pathname === '/services/data-analysis'}
            >
              {isRTL ? '📊 تحليل SPSS' : '📊 SPSS Analysis'}
            </SidebarItem>
            <SidebarItem
              onClick={() => navigate('/services/pls')}
              active={location.pathname === '/services/pls'}
            >
              {isRTL ? '📈 تحليل PLS' : '📈 PLS Analysis'}
            </SidebarItem>
            <SidebarItem
              onClick={() => navigate('/services/publishing')}
              active={location.pathname === '/services/publishing'}
            >
              {isRTL ? '🌍 نشر دولي' : '🌍 International Publishing'}
            </SidebarItem>
            <SidebarItem
              onClick={() => navigate('/services/special')}
              active={location.pathname === '/services/special'}
            >
              {isRTL ? '⭐ طلب خاص' : '⭐ Special Request'}
            </SidebarItem>
          </ul>
        )} */}

        {/* <SidebarItem onClick={() => setProfileOpen((prev) => !prev)}>
          {isRTL ? '👤 الملف الشخصي' : '👤 Profile'}
          <span style={{ marginInlineStart: '0.5rem' }}>
            {profileOpen ? '▲' : '▼'}
          </span>
        </SidebarItem> */}
{/* 
        {profileOpen && (
          <ul style={{ listStyle: 'none', paddingInlineStart: '1rem' }}>
            <SidebarItem onClick={handleClickProfile}>
              {isRTL ? 'الصفحة الشخصية' : 'Profile Page'}
            </SidebarItem>
            <SidebarItem onClick={toggleLanguage}>
              {isRTL ? 'اللغة' : 'Language'}
            </SidebarItem>
            <SidebarItem onClick={handleLogout}>
              {isRTL ? 'تسجيل الخروج' : 'Logout'}
            </SidebarItem>
          </ul>
        )} */}
      </ul>
    </aside>
  );
}

export default FreelancerSidebar;
