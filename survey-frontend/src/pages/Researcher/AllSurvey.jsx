import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';  // adjust path if needed
import { FaBars } from 'react-icons/fa';
import dashboardBg from '../../assets/dashboardBg.png'

function AllSurveys({ isRTL }) {
  const [surveys, setSurveys] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Responsive: hide sidebar on small screens by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarVisible(false);
      } else {
        setSidebarVisible(true);
      }
    };

    handleResize(); // set initial state

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch surveys
  const fetchSurveys = async () => {
    try {
      const token = localStorage.getItem('access');
      const response = await axios.get('http://localhost:8000/all-surveys/', {
        params: {
          page: currentPage,
          search: searchTerm,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSurveys(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 10));
    } catch (error) {
      console.error('Error fetching surveys:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/login');
    } else {
      fetchSurveys();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleSidebarToggle = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleProfileToggle = () => {
    setProfileOpen(!profileOpen);
  };

  const toggleLanguage = () => {
    alert(isRTL ? 'Switch to English' : 'التبديل إلى العربية');
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', direction: isRTL ? 'rtl' : 'ltr', background: `url(${dashboardBg})`,backgroundAttachment: 'fixed',backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%'
 }}>
      {/* Sidebar */}
      <Sidebar
        isRTL={isRTL}
        sidebarVisible={sidebarVisible}
        handleSidebarToggle={handleSidebarToggle}
        profileOpen={profileOpen}
        handleProfileToggle={handleProfileToggle}
        toggleLanguage={toggleLanguage}
        handleLogout={handleLogout}
      />

      {/* Main content area */}
      <div
        style={{
          flexGrow: 1,
          padding: '2rem',
          backgroundColor: '#f4f7fe',
          minHeight: '100vh',
          marginLeft: isRTL ? 0 : sidebarVisible ? '270px' : "30px",
          marginRight: isRTL ? (sidebarVisible ? '250px' : 0) : 0,
          transition: 'margin 0.3s ease',
          position: 'relative',
           background: `url(${dashboardBg})`,backgroundAttachment: 'fixed',backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%'

        }}
      >
        {/* Sidebar toggle button */}
        <button
          onClick={handleSidebarToggle}
          style={{
            position: 'fixed',
            top: '1rem',
            left: isRTL ? 'auto' : '1rem',
            right: isRTL ? '1rem' : 'auto',
            zIndex: 1200,
            backgroundColor: '#395692',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '0.5rem 0.75rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label={isRTL ? 'تبديل الشريط الجانبي' : 'Toggle sidebar'}
        >
          <FaBars />
        </button>

        {/* Page Title */}
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' , color:'#395692' }}>
          {isRTL ? 'جميع الاستبيانات' : 'All Surveys'}
        </h1>

        {/* Search bar */}
        <div style={{ marginBottom: '1rem',marginTop:'70px' }}>
          <input
            type="text"
            placeholder={isRTL ? 'ابحث عن الاستبيان...' : 'Search surveys...'}
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              width: '100%',
              maxWidth: '400px',
            }}
          />
        </div>

        {/* Surveys Table */}
    <div
  style={{
    overflowX: 'auto',
    backgroundColor: '#395692',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    padding: '1rem',
    maxWidth: '1200px',
    // margin: '0 auto',
  }}
>
  <table
    style={{
      width: '1150px',
      borderCollapse: 'collapse',
      fontSize: '1rem',
      margin:'10px',
      backgroundColor: 'transparent',
      
    }}
  >
    <thead>
      <tr style={{ backgroundColor: '#395692', color: '#fff' }}>
        <th style={{ padding: '12px', textAlign: 'center' }}>{isRTL ? 'العنوان' : 'Title'}</th>
        <th style={{ padding: '12px', textAlign: 'center' }}>{isRTL ? 'تاريخ الإنشاء' : 'Created At'}</th>
        <th style={{ padding: '12px', textAlign: 'center' }}>{isRTL ? 'المرسلات' : 'Actual Submissions'}</th>
        <th style={{ padding: '12px', textAlign: 'center' }}>{isRTL ? 'المطلوبة' : 'Required Submissions'}</th>
        <th style={{ padding: '12px', textAlign: 'center' }}>{isRTL ? 'الإجراءات' : 'Actions'}</th>
      </tr>
    </thead>
    <tbody>
      {Array.isArray(surveys) && surveys.length > 0 ? (
        surveys.map((survey, index) => (
          <React.Fragment key={survey.id}>
            <tr
              style={{
                backgroundColor: '#395692D4',
                transition: 'background-color 0.3s ease',
              }}
            >
              <td style={{ paddingTop: '20px', textAlign: 'center', color: '#fff' }}>{survey.title}</td>
              <td style={{ paddingTop: '20px', textAlign: 'center', color: '#fff' }}>
                {new Date(survey.created_at).toLocaleDateString()}
              </td>
              <td style={{ paddingTop: '20px', textAlign: 'center', color: '#fff' }}>{survey.actual_submissions}</td>
              <td style={{ paddingTop: '20px', textAlign: 'center', color: '#fff' }}>{survey.required_submissions}</td>
              <td style={{ paddingTop: '20px', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' ,paddingTop:'20px'}}>
                  <button onClick={() => navigate(`/survey/${survey.id}/display/`)} style={buttonStyle}>
                    {isRTL ? 'عرض' : 'View'}
                  </button>
                  <button onClick={() => navigate(`/survey/${survey.id}/responses/analysis/`)} style={buttonStyle}>
                    {isRTL ? 'الردود' : 'Responses'}
                  </button>
                  <button onClick={() => navigate(`/survey/${survey.id}/submissions`)} style={buttonStyle}>
                    {isRTL ? 'عرض التفاصيل' : 'Submissions'}
                  </button>
                  {/* <button onClick={() => navigate(`/survey/${survey.id}/edit/`)} style={buttonStyle}>
                    {isRTL ? 'تعديل' : 'Edit'}
                  </button> */}
                </div>
              </td>
            </tr>
            {/* Gradient Separator */}
            <tr>
              <td colSpan={5} style={{ padding: 0 }}>
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
        ))
      ) : (
        <tr>
          <td colSpan="5" style={{ padding: '1rem', textAlign: 'center', color: '#fff' }}>
            {isRTL ? 'لا توجد استبيانات.' : 'No surveys available.'}
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


        {/* Pagination */}
        <div
          style={{
            marginTop: '2rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#395692',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            }}
          >
            {isRTL ? 'السابق' : 'Previous'}
          </button>
          <span style={{ alignSelf: 'center', fontWeight: 'bold' }}>
            {isRTL ? `الصفحة ${currentPage} من ${totalPages}` : `Page ${currentPage} of ${totalPages}`}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#395692',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            }}
          >
            {isRTL ? 'التالي' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
const buttonStyle = {
  backgroundColor: '#F19303',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '40px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  fontSize:'12px'
};

export default AllSurveys;
