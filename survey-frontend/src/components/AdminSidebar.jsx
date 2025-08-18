import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUserTie,
  FaUserFriends,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import logo from '../assets/logo3.png';
import Vector from '../assets/Vector 6.svg';
import researcherIcon from '../assets/Vector.svg';
import freelancerIcon from '../assets/Group 92.svg';
import surveyIcon from '../assets/Group 93.svg';
import settingIcon from '../assets/setting_svgrepo.com.svg'
import logoutIcon from '../assets/logout_svgrepo.com.svg'
import emailIcon from '../assets/logs.svg'
import loginIcon from '../assets/history.svg'
import { Link } from 'react-router-dom';

const AdminSidebar = ({ isRTL, handleSidebarToggle, handleLogout, username, userImage }) => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  const menuItems = [
    // { label: 'Dashboard', labelAr: 'لوحة التحكم', icon: <FaTachometerAlt />, route: '/admin-dashboard' },
    { label: 'Manage Researchers', labelAr: 'إدارة الباحثين',icon: <img src={researcherIcon} alt="Researcher Icon" className="w-5 h-5" />, route: '/admin/researchers' },
    { label: 'Manage Freelancers', labelAr: 'إدارة المستقلين',icon: <img src={freelancerIcon} alt="Freelancer Icon" className="w-5 h-5" />, route: '/admin/freelancers' },
    { label: 'Manage Surveys', labelAr: 'إدارة الاستبيانات', icon: <img src={surveyIcon} alt="Survey Icon" className="w-5 h-5" />, route: '/admin/surveys' },
    {
      label: 'Admin Settings',
      labelAr: 'إعدادات المشرف',
      icon: <img src={settingIcon} alt="Survey Icon" className="w-5 h-5" />,
     children: [
    {
      label: 'Email Logs',
      labelAr: 'سجلات البريد',
      route: '/admin/settings/email-logs',
      icon: <img src={emailIcon} alt="Email Icon" className="w-4 h-4" />,
    },
    {
      label: 'Login History',
      labelAr: 'تاريخ الدخول',
      route: '/admin/settings/login-history',
      icon: <img src={loginIcon} alt="Login Icon" className="w-4 h-4" />,
    },
    {
      label: 'Notifications',
      labelAr: 'الإشعارات',
      route: '/admin/settings/notifications',
      icon: <img alt="Notification Icon" className="w-4 h-4" />,
    },
  ],
    },
    {
    label: 'Logout',
    labelAr: 'تسجيل الخروج',
    icon: <img src={logoutIcon} alt="Logout Icon" className="w-5 h-5" />,
    onClick: handleLogout, // ⬅ Make sure handleLogout is in scope
  },
  ];

  const handleNav = (route) => {
    if (route) {
      navigate(route);
      handleSidebarToggle(); // Optional
    }
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(prev => (prev === index ? null : index));
  };

  return (
    <aside
      style={{
        width: '270px',
        background: 'transparent',
        color: '#000',
        height: '100vh',
        padding: '1rem',
        position: 'fixed',
        top: 0,
        left: isRTL ? 'auto' : 0,
        right: isRTL ? 0 : 'auto',
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1100,
        overflow: 'auto',
        fontFamily: 'Poppins',
        marginTop:'60px',
        
      }}
    >
      {/* Section title card */}
        <Link to="/admin-dashboard" style={{ textDecoration: 'none' }}>

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
    margin: '58px auto 40px',
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
    style={{marginRight:'20px'}}
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

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {menuItems.map((item, idx) => (
          <div key={idx}>
            <SidebarItem
              text={isRTL ? item.labelAr : item.label}
              icon={item.icon}
              onClick={() => item.children ? toggleDropdown(idx) : handleNav(item.route)}
              isActive={openDropdown === idx}
            />
            {item.children && openDropdown === idx && (
              <ul style={{ listStyle: 'none', paddingInlineStart: '1rem' }}>
                {item.children.map((child, i) => (
                  <SidebarItem
                    key={i}
                    text={isRTL ? child.labelAr : child.label}
                    icon={<span style={{ width: '16px' }}>•</span>}
                    onClick={() => handleNav(child.route)}
                    isChild
                  />
                ))}
              </ul>
            )}
          </div>
        ))}
      </ul>

      {/* <button
        onClick={handleSidebarToggle}
        style={{
          marginTop: 'auto',
          background: 'transparent',
          border: '1px solid #FEA319',
          color: '#FEA319',
          padding: '0.5rem 1rem',
          borderRadius: '10px',
          fontSize: '0.85rem',
          cursor: 'pointer',
          transition: '0.3s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#FEA319')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        {isRTL ? 'إخفاء القائمة' : 'Hide Sidebar'}
      </button> */}
    </aside>
  );
};

// Reusable Sidebar Item
const SidebarItem = ({ icon, text, onClick, isChild = false, isActive = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        margin: '1rem 0',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '4px',
        backgroundColor: isHovered || isActive ? '#F19303' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: '#000',
        fontSize: '16px',
        fontWeight:400,
        fontFamily:'Poppins',
        fontStyle:'normal'
      }}
    >
      {icon}
      <span>{text}</span>
    </li>
  );
};

export default AdminSidebar;
