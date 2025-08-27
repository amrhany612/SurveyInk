import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import dashboardBg from '../../assets/dashboardBg.png';

const SurveySubmissions = () => {
  const { id } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();
  const [isRTL, setIsRTL] = useState(false);
  
  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem('access');
      const res = await fetch(`https://survey-ink.com/survey/${id}/submissions/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log(data)
      setSubmissions(data);
    } catch (err) {
      console.error('Error loading submissions:', err);
    }
  };

  const handleAction = async (submissionId, action) => {
    try {
      const token = localStorage.getItem('access');
      const url = `https://survey-ink.com/submission/${submissionId}/${action}/`;
      await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSubmissions(); // Refresh after action
    } catch (err) {
      console.error(`Error ${action}ing submission:`, err);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [id]);

  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#f9fafb',
      fontFamily: "'Segoe UI', sans-serif",
      minHeight: '100vh',
      background: `url(${dashboardBg})`,
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
    }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: '2.5rem',
        marginBottom: '2rem',
        color: '#35508C',
        fontWeight: 'bold'
      }}>
        Survey Submissions
      </h2>

      <div style={{
        overflowX: 'auto',
        backgroundColor: '#395692',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        padding: '1rem',
        margin: 'auto',
        maxWidth: '1000px'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#395692', color: '#fff' }}>
              <th style={headerStyle}>User Email</th>
              <th style={headerStyle}>Submitted At</th>
              <th style={headerStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub, index) => (
              <tr
                key={sub.id}
                style={{
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9',
                  transition: 'background-color 0.3s ease',
                  cursor: 'default',
                }}
              >
                <td style={cellStyle}>{sub.freelancer_email}</td>
                <td style={cellStyle}>{new Date(sub.submitted_at).toLocaleDateString()}</td>
                <td style={cellStyle}>

                <button
  onClick={() => navigate(`/survey/${sub.survey_id}/submission/${sub.freelancer_id}`)}
  style={{
    backgroundColor: '#F19303',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontWeight: 'bold',
  }}
>
  {isRTL ? 'عرض' : 'View'}
</button>
</td>
              </tr>
            ))}
            {submissions.length === 0 && (
              <tr>
                <td colSpan="4" style={{
                  ...cellStyle,
                  textAlign: 'center',
                  color: '#888',
                  fontSize: '1.1rem'
                }}>
                  No submissions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Reusable styles
const headerStyle = {
  padding: '1rem',
  textAlign: 'left',
  fontWeight: '600',
  fontSize: '1rem',
  borderBottom: '2px solid #ddd',
};

const cellStyle = {
  padding: '1rem',
  // borderBottom: '1px solid #eee',
  color: '#fff',
  fontSize: '1rem',
  background:'#395692'
};

const actionButton = {
  padding: '0.4rem 0.8rem',
  border: 'none',
  borderRadius: '6px',
  color: '#fff',
  fontWeight: '600',
  transition: 'background-color 0.3s ease',
};

export default SurveySubmissions;
