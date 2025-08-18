import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FreelancerSidebar from '../../components/FreelancerSidebar';
import axios from '../../axiosConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function PublishingPage() {
  const [requestText, setRequestText] = useState('');
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en');
  const isRTL = language === 'ar';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleRequest = () => alert('Quotation requested for International Publishing');
  const handleSend = async () => {
    const formData = new FormData();
    formData.append('message', requestText);
    formData.append('service_type', 'International Publishing'); // dynamic per page

    try {
      const token = localStorage.getItem('access');
      await axios.post('/api/submit/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Request sent successfully!');
    } catch (err) {
      toast.error('Error sending request.');
      console.error(err);
    }
  };
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {sidebarVisible && (
        <FreelancerSidebar
          isRTL={isRTL}
          sidebarVisible={sidebarVisible}
          handleSidebarToggle={() => setSidebarVisible(false)}
          handleLogout={handleLogout}
          profileOpen={profileOpen}
          setProfileOpen={setProfileOpen}
        />
      )}
      <main style={{
        flex: 1, padding: '2rem',
        marginLeft: isRTL ? 0 : sidebarVisible ? '220px' : '0',
        marginRight: isRTL ? (sidebarVisible ? '220px' : '0') : 0,
      }}>
        <ToastContainer position="top-right" autoClose={3000} />
        
        <h1 style={{
          fontSize: '2.2rem', fontWeight: 'bold', color: '#395692',
          marginBottom: '2rem',marginLeft:"30px", marginTop: '60px', textAlign: isRTL ? 'right' : 'left',
        }}>
          🌍 {isRTL ? 'مساعدة في النشر الدولي' : 'International Publishing Assistance'}
        </h1>

        <div style={{
          backgroundColor: '#fff', padding: '2rem', borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxWidth: '600px', margin: '0 auto',
        }}>
          <label style={{ display: 'block', marginBottom: '1rem', fontWeight: '600' }}>
            {isRTL ? 'اكتب طلبك هنا:' : 'Write your request here:'}
          </label>
          <textarea
            value={requestText}
            onChange={(e) => setRequestText(e.target.value)}
            rows={6}
            style={{
              width: '95%',
              padding: '0.8rem',
              borderRadius: '10px',
              border: '1px solid #ccc',
              marginBottom: '1.5rem',
              resize: 'vertical',
              direction: isRTL ? 'rtl' : 'ltr'
            }}
          />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={handleRequest} style={buttonStyle('#F19303')}>
              {isRTL ? 'طلب تسعير' : 'Request Quotation'}
            </button>
            <button onClick={handleSend} style={buttonStyle('#28a745')}>
              {isRTL ? 'إرسال' : 'Send'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

const buttonStyle = (bg) => ({
  flex: 1, backgroundColor: bg, color: 'white',
  padding: '0.7rem 1rem', borderRadius: '8px',
  border: 'none', fontWeight: 'bold', cursor: 'pointer',
});

export default PublishingPage;
