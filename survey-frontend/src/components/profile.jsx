import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profileIcon from '../assets/profile.svg';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  // const [isRTL, setIsRTL] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [isRTL, setIsRTL] = useState(i18n.language === 'ar');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('access');
        const response = await fetch('https://survey-ink.com/profile/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 401) {
          localStorage.removeItem('access');
          navigate('/login');
          return;
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [navigate]);

  const labelCellStyle = {
    border: '1px solid #ccc',
    borderRadius:'5px',
    padding: '12px 16px',
    fontWeight: '600',
    color: '#FFF',
    background: 'rgba(57, 86, 146, 0.5)',
    width:'155px',
    fontFamily: 'Poppins',
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 600,
  };

  const valueCellStyle = {
    border: '1px solid #ccc',
    padding: '12px 16px',
    borderRadius:'5px',
    fontFamily: 'Poppins',
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 600,
    color: '#FFF',
    backgroundColor: 'rgba(57, 86, 146, 0.30)',
    maxWidth: '1016px',
    wordBreak: 'break-word',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <main
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{
          padding: '3rem 2rem',
          flexGrow: 1,
          fontFamily: "'Poppins', sans-serif",
          color: '#34495e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          width: '100%',
        }}
      >
        {profileData ? (
          <div
            style={{
              width: '100%',
              background: '#fff',
              borderRadius: '5px',
              padding: '3rem 4rem',
              boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {/* صورة و معلومات قصيرة */}
            <img
              src={profileIcon}
              alt="Profile Icon"
              style={{
                position: 'absolute',
                top: '-5rem',
                left: '8rem',
                width: '156px',
                height: '156px',
                borderRadius: '50%',
                objectFit: 'cover',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            />
            <p style={{
              position: 'absolute',
              top: '5.5rem',
              left: '10.15rem',
              color: '#395692',
              fontFamily: 'Poppins',
              fontSize: '16px',
              fontWeight: 600,
              margin: 0,
            }}>
              {profileData.user.first_name} {profileData.user.last_name}
            </p>
            <p style={{
              position: 'absolute',
              top: '7rem',
              left: '10.15rem',
              color: '#FEA319',
              fontFamily: 'Poppins',
              fontSize: '14px',
              fontWeight: 400,
              margin: 0,
            }}>
              current Role {profileData.role}
            </p>
            <p style={{
              position: 'absolute',
              top: '8.5rem',
              left: '10.15rem',
              color: '#98A4BE',
              fontFamily: 'Poppins',
              fontSize: '12px',
              fontWeight: 400,
              margin: 0,
            }}>
              {profileData.country?.name}
            </p>

            {/* ✅ زر تغيير كلمة المرور */}
            <button
              onClick={() => navigate('/change-password')}
              style={{
                marginTop: '8rem',
                position:'absolute',
                top:'4.8rem',
                borderRadius: '10px',
                border: '1px solid #FEA319',
                backgroundColor: 'transparent',
                color: '#395692',
                display: 'flex',
                width: '150px',
                height: '30px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'Poppins',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginLeft: '6rem'
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FEA319')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              Change Password
            </button>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                // marginTop: '2rem',
                width: '100%',
                paddingRight: '4rem', // نفس المسافة الجانبية للجدول تقريبا
                marginTop:'150px'
              }}
            >
               {profileData?.role === 'freelancer' && (
                <StatsCard
                  title={isRTL ? 'المحفظة' : 'Wallet'}
                  value="0 EGP"
                  percentage={0}
                  icon={
                    <div
                      style={{
                        backgroundColor: '#5F79B2',
                        borderRadius: '12px',
                        padding: '8px',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        
                      }}
                    >
                      {/* SVG Icon */}
 <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 21 21"
        fill="none"
      >
        <path
          d="M4.38714 4.70926H16.5746C16.717 4.7092 16.8592 4.71823 17.0004 4.7363C16.9526 4.4003 16.8372 4.07747 16.6611 3.78727C16.4851 3.49708 16.2522 3.24554 15.9763 3.0478C15.7005 2.85007 15.3875 2.71025 15.0561 2.63677C14.7248 2.56329 14.382 2.55767 14.0484 2.62025L4.02532 4.33145H4.0139C3.38474 4.45176 2.82526 4.80773 2.44971 5.32664C3.01551 4.92419 3.69281 4.70837 4.38714 4.70926Z"
          fill="#FEA319"
        />
        <path
          d="M16.5747 5.625H4.38721C3.74096 5.62571 3.12138 5.88274 2.66441 6.33971C2.20745 6.79667 1.95041 7.41625 1.94971 8.0625V15.375C1.95041 16.0212 2.20745 16.6408 2.66441 17.0978C3.12138 17.5548 3.74096 17.8118 4.38721 17.8125H16.5747C17.221 17.8118 17.8405 17.5548 18.2975 17.0978C18.7545 16.6408 19.0115 16.0212 19.0122 15.375V8.0625C19.0115 7.41625 18.7545 6.79667 18.2975 6.33971C17.8405 5.88274 17.221 5.62571 16.5747 5.625ZM14.7656 12.9375C14.5246 12.9375 14.2889 12.866 14.0885 12.7321C13.8881 12.5982 13.7319 12.4078 13.6396 12.1851C13.5474 11.9624 13.5233 11.7174 13.5703 11.481C13.6173 11.2446 13.7334 11.0274 13.9038 10.857C14.0743 10.6865 14.2914 10.5704 14.5279 10.5234C14.7643 10.4764 15.0093 10.5005 15.232 10.5928C15.4547 10.685 15.6451 10.8412 15.779 11.0416C15.9129 11.2421 15.9844 11.4777 15.9844 11.7187C15.9844 12.042 15.856 12.352 15.6274 12.5805C15.3988 12.8091 15.0889 12.9375 14.7656 12.9375Z"
          fill="#FEA319"
        />
        <path
          d="M1.96875 10.6313V6.8418C1.96875 6.01647 2.42578 4.63281 4.01206 4.33308C5.3584 4.08057 6.69141 4.08057 6.69141 4.08057C6.69141 4.08057 7.56738 4.68994 6.84375 4.68994C6.12012 4.68994 6.13916 5.62305 6.84375 5.62305C7.54834 5.62305 6.84375 6.51807 6.84375 6.51807L4.00635 9.73633L1.96875 10.6313Z"
          fill="#FEA319"
        />
      </svg>
                    </div>
                  }
                />
              )}
              {/* DASHBOARD Button */}
              <div
                onClick={() => {
                  if (profileData?.role === 'freelancer') navigate('/freelancer-dashboard');
                  else if (profileData?.role === 'researcher') navigate('/researcher-dashboard');
                  else if (profileData?.role === 'admin') navigate('/admin-dashboard');
                  else navigate('/');
                }}
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
                  width: '180px',
                  height: '35px',
                  cursor: 'pointer',
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

              {/* ✅ StatsCard يظهر فقط لو freelancer */}
             
            </div>

            {/* جدول البيانات */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', marginLeft: '3.2rem' }}>
              <table style={{ borderCollapse: 'collapse', width: '1200px', fontSize: '1.15rem' }}>
                <tbody>
                  <tr>
                    <td style={labelCellStyle}>{t('firstName')}</td>
                    <td style={valueCellStyle}>{profileData.user.first_name}</td>
                  </tr>
                  <tr>
                    <td style={labelCellStyle}>{isRTL ? 'اسم العائلة' : 'Last Name'}</td>
                    <td style={valueCellStyle}>{profileData.user.last_name}</td>
                  </tr>
                  <tr>
                    <td style={labelCellStyle}>Email:</td>
                    <td style={valueCellStyle}>{profileData.email}</td>
                  </tr>
                  <tr>
                    <td style={labelCellStyle}>{isRTL ? 'العمر' : 'Age'}</td>
                    <td style={valueCellStyle}>{profileData.age}</td>
                  </tr>
                  <tr>
                    <td style={labelCellStyle}>{isRTL ? 'الجنس' : 'Gender'}</td>
                    <td style={valueCellStyle}>{profileData.gender}</td>
                  </tr>
                  <tr>
                    <td style={labelCellStyle}>{isRTL ? 'تاريخ الميلاد' : 'Date of Birth'}</td>
                    <td style={valueCellStyle}>
                      {new Date(profileData.date_of_birth).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <td style={labelCellStyle}>{isRTL ? 'البلد' : 'Country'}</td>
                    <td style={valueCellStyle}>{profileData.country?.name || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style={labelCellStyle}>{isRTL ? 'المهنة' : 'Profession'}</td>
                    <td style={valueCellStyle}>{profileData.profession?.name || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style={labelCellStyle}>{isRTL ? 'الجامعة' : 'University'}</td>
                    <td style={valueCellStyle}>{profileData.university?.name || 'N/A'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p style={{ textAlign: 'center', fontSize: '1.25rem', color: '#7f8c8d', userSelect: 'none' }}>
            {isRTL ? 'جارٍ تحميل البيانات...' : 'Loading profile data...'}
          </p>
        )}
      </main>
    </div>
  );
};
function StatsCard({ title, value, percentage, color, icon }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: `linear-gradient(127deg, #395692 28.26%, rgba(26, 31, 55, 0.50) 91.2%)`,
        borderRadius: '15px',
        width: '160px',
        height: '35px',
        padding: '0 8px', // outer padding of the whole card
        boxShadow: '0 2px 6px #616161',
        marginRight:'16px'
      }}
    >
      {/* 👉 Text Content with padding */}
      <div
        style={{
          flex: 1,
          padding: '4px', // ✅ Add internal padding to the text
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <p
          style={{
            fontSize: '10px',
            color: '#BAB8B8',
            margin: 0,
            lineHeight: 1.1,
            fontFamily: 'Poppins',
            fontWeight: 500,
          }}
        >
          {title}
        </p>
        <span
          style={{
            fontSize: '12px',
            color: '#FFF',
            fontWeight: 600,
          }}
        >
          {value}
          <span
            style={{
              fontSize: '10px',
              color: '#01B574',
              marginLeft: '4px',
              fontWeight: 400,
            }}
          >
            {percentage >= 0 ? '+' : ''}
            {percentage}%
          </span>
        </span>
      </div>

      {/* 👉 Icon on the right */}
      <div style={{ marginLeft: '8px' }}>
        {icon}
      </div>
    </div>
  );
}
export default Profile;
