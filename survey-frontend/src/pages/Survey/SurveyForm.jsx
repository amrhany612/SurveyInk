import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import dashboardBg from '../../assets/dashboardBg.png'

function SurveyForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [survey, setSurvey] = useState(null);
  const [demographics, setDemographics] = useState({});
  const [answers, setAnswers] = useState({});
  const [countries, setCountries] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [fieldsOfStudy, setFieldsOfStudy] = useState([]);
  const [professions, setProfessions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [isRTL, setIsRTL] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [userRole, setUserRole] = useState('');

  const [hoverBtn, setHoverBtn] = useState({ back: false, submit: false });

  const fetchDropdowns = async (token) => {
    const endpoints = [
      ['countries', setCountries],
      ['universities', setUniversities],
      ['fields_of_study', setFieldsOfStudy],
      ['professions', setProfessions],
    ];

    await Promise.all(endpoints.map(async ([endpoint, setter]) => {
      try {
        const res = await axios.get(`http://localhost:8000/api/${endpoint}/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setter(res.data);
      } catch (err) {
        console.error(`Failed to fetch ${endpoint}:`, err);
      }
    }));
  };

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const token = localStorage.getItem('access');
        const res = await axios.get(`http://localhost:8000/surveys/${id}/display/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(res.data.user_role)
        setUserRole(res.data.user_role);
        setSurvey(res.data);
        console.log(userRole)
        setIsRTL(res.data.language === 'ar');
        await fetchDropdowns(token);
      } catch (err) {
        console.error('Error fetching survey:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSurvey();
  }, [id]);

  useEffect(() => {
    if (step === 2 && survey) {
      const maxSec = survey.max_duration_minutes * 60;
      setStartTime(Date.now());
      setTimeLeft(maxSec);

      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            alert(isRTL ? 'انتهى الوقت' : 'Time is up');
            navigate('/all-surveys');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [step, survey]);

  const demographicFields = survey?.demographic || {};
  console.log(demographicFields)
  const handleDemographicsChange = (field, value) => {
    setDemographics(prev => ({ ...prev, [field]: value }));
  };

  const handleAnswersChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleDemographicsNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const durationSeconds = Math.floor((Date.now() - startTime) / 1000);

    // if (durationSeconds < survey.min_duration_minutes * 60) {
    //   toast.warning(isRTL ? 'المدة غير كافية' : 'Not enough time spent');
    //   return;
    // }

    try {
      const token = localStorage.getItem('access');
      await axios.post(`http://localhost:8000/surveys/${id}/submit/`, {
        demographics, answers, duration: durationSeconds
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert(isRTL ? 'تم الإرسال بنجاح' : 'Submitted successfully');
      navigate('/surveys/solved');
    } catch (error) {
      console.error('Submit error:', error);
      alert(isRTL ? 'فشل الإرسال' : 'Submission failed');
    }
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  if (loading) return <p>{isRTL ? 'جار التحميل...' : 'Loading...'}</p>;

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr',background: `url(${dashboardBg})`,backgroundAttachment: 'fixed',backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: 700, backgroundColor: '#A3B6DED4', borderRadius: 12, padding: '2rem', margin: '0 auto', color: 'white' }}>
        {step === 2 && timeLeft !== null && (
          <div style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
            {isRTL ? 'الوقت المتبقي: ' : 'Time left:'} {formatTime(timeLeft)}
          </div>
        )}

        <h2 style={{color:'#35508C'}}>{survey.title}</h2>
        <p style={{color:'#35508C'}}>{survey.description}</p>

        {step === 1 ? (
          <form onSubmit={handleDemographicsNext}>
            {demographicFields.age_min !== 0 && demographicFields.age_max !== 0 && (
              <div style={{ marginBottom: 12 }}>
                <label>{isRTL ? 'العمر' : 'Age'}:</label>
                <input
                  type="number"
                  value={demographics.age || ''}
                  onChange={(e) => handleDemographicsChange('age', e.target.value)}
                  required ={userRole !== 'researcher'}
                  min={demographicFields.age_min}
                  max={demographicFields.age_max}
                  placeholder={`Age (${demographicFields.age_min} - ${demographicFields.age_max})`}

                  style={{ width: '97%', padding: 8, marginTop: 4, borderRadius: 4 }}
                />
              </div>
            )}

            {demographicFields.gender !== null && (
              <div style={{ marginBottom: 12 }}>
                <label>{isRTL ? 'الجنس' : 'Gender'}:</label>
                <select
                  value={demographics.gender || ''}
                  onChange={(e) => handleDemographicsChange('gender', e.target.value)}
                  required ={userRole !== 'researcher'}
                  style={{ width: '97%', padding: 8, marginTop: 4, borderRadius: 4 }}
                >
                  <option value="">{isRTL ? 'اختر' : 'Select'}</option>
                  <option value="male">{isRTL ? 'ذكر' : 'Male'}</option>
                  <option value="female">{isRTL ? 'أنثى' : 'Female'}</option>
                </select>
              </div>
            )}

            {demographicFields.country && (
              <div style={{ marginBottom: 12 }}>
                <label>{isRTL ? 'الدولة' : 'Country'}:</label>
                <select
                  value={demographics.country || ''}
                  onChange={(e) => handleDemographicsChange('country', e.target.value)}
                  required ={userRole !== 'researcher'}
                  style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 4 }}
                >
                  <option value="">{isRTL ? 'اختر' : 'Select'}</option>
                  {countries.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>
            )}

            {demographicFields.university && (
              <div style={{ marginBottom: 12 }}>
                <label>{isRTL ? 'الجامعة' : 'University'}:</label>
                <select
                  value={demographics.university || ''}
                  onChange={(e) => handleDemographicsChange('university', e.target.value)}
                  required ={userRole !== 'researcher'}
                  style={{ width: '100%', padding: 8 }}
                >
                  <option value="">{isRTL ? 'اختر' : 'Select'}</option>
                  {universities.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                </select>
              </div>
            )}

            {demographicFields.field_of_study && (
              <div style={{ marginBottom: 12 }}>
                <label>{isRTL ? 'المجال' : 'Field of Study'}:</label>
                <select
                  value={demographics.field_of_study || ''}
                  onChange={(e) => handleDemographicsChange('field_of_study', e.target.value)}
                  required ={userRole !== 'researcher'} 
                  style={{ width: '100%', padding: 8 }}
                >
                  <option value="">{isRTL ? 'اختر' : 'Select'}</option>
                  {fieldsOfStudy.map(f => <option key={f.id} value={f.name}>{f.name}</option>)}
                </select>
              </div>
            )}

            {demographicFields.profession && (
              <div style={{ marginBottom: 12 }}>
                <label>{isRTL ? 'المهنة' : 'Profession'}:</label>
                <select
                  value={demographics.profession || ''}
                  onChange={(e) => handleDemographicsChange('profession', e.target.value)}
                  required ={userRole !== 'researcher'}
                  style={{ width: '100%', padding: 8 }}
                >
                  <option value="">{isRTL ? 'اختر' : 'Select'}</option>
                  {professions.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
              </div>
            )}

            {demographicFields.income_min !== 0 && demographicFields.income_max !== 0 && (
              <div style={{ marginBottom: 12 }}>
                
                <label>{isRTL ? 'الدخل' : 'Income'}:</label>
                <input
                  type="number"
                  value={demographics.income || ''}
                  onChange={(e) => handleDemographicsChange('income', e.target.value)}
                  required ={userRole !== 'researcher'}
                  min={demographicFields.income_min}
                  max={demographicFields.income_max}
                  placeholder={`Income (${demographicFields.income_min} - ${demographicFields.income_max})`}

                  style={{ width: '97%', padding: 8, marginTop: 4, borderRadius: 4 }}
                />
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <button
                type="submit"
                onMouseEnter={() => setHoverBtn({ ...hoverBtn, back: true })}
                onMouseLeave={() => setHoverBtn({ ...hoverBtn, back: false })}
                style={{
                  padding: '0.75rem 2rem',
                  backgroundColor: hoverBtn.back ? '#F19303' : 'white',
                  color: hoverBtn.back ? 'white' : '#395692',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 'bold'
                }}
              >
                {isRTL ? 'التالي' : 'Next'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <ToastContainer />
            {survey.questions.map((q, i) => (
              <div key={q.id} style={{ backgroundColor: 'white', color: 'black', padding: 12, borderRadius: 8, marginBottom: 20 }}>
                <label>{i + 1}. {q.question_text}</label>
                {q.type === 'multiple_choice' &&
                  q.options.map(opt => (
                    <div key={opt.id}>
                      <input
                        type="radio"
                        name={q.id}
                        value={opt.text}
                        checked={answers[q.id] === opt.text}
                        onChange={() => handleAnswersChange(q.id, opt.text)}
                        required
                      />
                      <label style={{ marginLeft: 8 }}>{opt.text}</label>
                    </div>
                  ))
                }
                {q.type === 'text' && (
                  <input
                    type="text"
                    value={answers[q.id] || ''}
                    onChange={(e) => handleAnswersChange(q.id, e.target.value)}
                    required
                    style={{ width: '97%', padding: 8 }}
                  />
                )}
                {q.type === 'scale' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{q.scale_min_label || '1'}</span>
                    {[1, 2, 3, 4, 5].map(val => (
                      <label key={val}>
                        <input
                          type="radio"
                          name={q.id}
                          value={val}
                          checked={answers[q.id] === String(val)}
                          onChange={() => handleAnswersChange(q.id, String(val))}
                          required
                        />
                        {val}
                      </label>
                    ))}
                    <span>{q.scale_max_label || '5'}</span>
                  </div>
                )}
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button type="button" onClick={() => setStep(1)} style={{                  
                padding: '0.75rem 2rem',
                  backgroundColor: hoverBtn.back ? '#F19303' : 'white',
                  color: hoverBtn.back ? 'white' : '#395692',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 'bold',
                  cursor:'pointer'}}>{isRTL ? 'عودة' : 'Back'} </button>
              {userRole !== 'researcher' && (
                <button type="submit" style = {{ padding: '0.75rem 2rem',
                  backgroundColor: hoverBtn.back ? '#F19303' : 'white',
                  color: hoverBtn.back ? 'white' : '#395692',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 'bold',
                  cursor:'pointer'}} >
                  {isRTL ? 'إرسال' : 'Submit'}
                </button>
              )}            
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default SurveyForm;
