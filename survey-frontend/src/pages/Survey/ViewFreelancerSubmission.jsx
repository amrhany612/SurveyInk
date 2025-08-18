import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';
import dashboardBg from '../../assets/dashboardBg.png'

const ViewFreelancerSubmission = () => {
  const { surveyId, freelancerId } = useParams();
  const [submission, setSubmission] = useState(null);
  const [isRTL, setIsRTL] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const token = localStorage.getItem('access');
        const res = await api.get(`/survey/${surveyId}/submission/${freelancerId}/`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setSubmission(res.data);
        setIsRTL(res.data.survey.language === 'ar');
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [surveyId, freelancerId]);

  if (loading) return <p>{isRTL ? 'جار التحميل...' : 'Loading...'}</p>;
  if (!submission || !submission.survey) return <p>{isRTL ? 'لم يتم العثور على الاستبيان' : 'Survey not found'}</p>;

  const { survey, answers } = submission;

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr',background: `url(${dashboardBg})`,backgroundAttachment: 'fixed',backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: 700, backgroundColor: '#A3B6DED4', borderRadius: 12, padding: '2rem', margin: '0 auto', color: 'white' }}>
        <h2>{survey.title}</h2>
        <p>{survey.description}</p>

        <form>
          {answers.map((a, i) => {
            const q = a.question;
            const answer = a.answer_text;

            return (
              <div key={a.id} style={{ backgroundColor: 'white', color: 'black', padding: 12, borderRadius: 8, marginBottom: 20 }}>
                <label>{i + 1}. {q.text}</label>

               {q.question_type === 'multiple_choice' && q.choices.map(opt => {
  const isChecked = answer === opt.text;

  return (
    <div
      key={opt.id}
      style={{
        display: 'flex',
        alignItems: 'center',
        margin: '6px 0',
        padding: '6px 12px',
        borderRadius: 6,
        backgroundColor: isChecked ? '#F19303' : 'transparent',
        cursor: 'not-allowed',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 18,
          height: 18,
          borderRadius: '50%',
          border: `2px solid ${isChecked ? '#F19303' : '#aaa'}`,
          backgroundColor: isChecked ? '#F19303' : '#eee',
          marginRight: 10,
        }}
      />
      <span style={{ fontSize: 16 }}>{opt.text}</span>
    </div>
  );
})}

{q.question_type === 'text' && (
  <input
    type="text"
    value={answer}
    style={{ width: '97%', padding: 8 }}
    readOnly
    disabled
  />
)}

{q.question_type === 'scale' && (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span>{q.scale_min_label || '1'}</span>
    {[1, 2, 3, 4, 5].map(val => {
      const isChecked = answer === String(val);

      return (
        <label
          key={val}
          style={{
            padding: '6px 10px',
            margin: '0 4px',
            borderRadius: 6,
            backgroundColor: isChecked ? '#F19303' : 'transparent',
            cursor: 'not-allowed',
          }}
        >
          <input
            type="radio"
            name={`q_${a.question_id}`}
            value={val}
            checked={isChecked}
            readOnly
            disabled
            style={{ marginRight: 4 }}
          />
          {val}
        </label>
      );
    })}
    <span>{q.scale_max_label || '5'}</span>
  </div>
)}

              </div>
            );
          })}

          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              style={{
                padding: '0.75rem 2rem',
                backgroundColor: '#F19303',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                fontWeight: 'bold'
              }}
            >
              {isRTL ? 'عودة' : 'Back'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewFreelancerSubmission;
