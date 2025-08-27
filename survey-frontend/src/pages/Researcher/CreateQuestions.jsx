import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar'; // Adjust path if needed
import axios from 'axios';
import dashboardBg from '../../assets/dashboardBg.png'

const CreateQuestions = () => {
  const { surveyId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const surveyTitle = location.state?.surveyTitle || '';
  const [language, setLanguage] = useState('en');
  const isRTL = language === 'ar';

  const [questions, setQuestions] = useState([
    {
      text: '',
      question_type: 'text',
      scale: { minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
      choices: ['']
    }
  ]);

  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleLanguage = () => setLanguage(prev => (prev === 'ar' ? 'en' : 'ar'));

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    if (field === 'question_type') {
      updated[index] = {
        text: '',
        question_type: value,
        scale: { minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
        choices: ['']
      };
    } else {
      updated[index][field] = value;
    }
    setQuestions(updated);
  };

  const handleScaleChange = (index, key, value) => {
    const updated = [...questions];
    updated[index].scale[key] = value;
    setQuestions(updated);
  };

  const handleChoiceChange = (qIndex, cIndex, value) => {
    const updated = [...questions];
    updated[qIndex].choices[cIndex] = value;
    setQuestions(updated);
  };

  const addChoice = (index) => {
    const updated = [...questions];
    updated[index].choices.push('');
    setQuestions(updated);
  };

  const removeChoice = (qIndex, cIndex) => {
    const updated = [...questions];
    updated[qIndex].choices.splice(cIndex, 1);
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: '',
        question_type: 'text',
        scale: { minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
        choices: ['']
      }
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length === 1) return;
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = questions.map((q) => {
      const base = {
        text: q.text.trim(),
        question_type: q.question_type,
      };

      if (q.question_type === 'scale') {
        return {
          ...base,
          scale_min_label: q.scale?.minLabel?.trim(),
          scale_max_label: q.scale?.maxLabel?.trim(),
          choices: [],
        };
      } else if (q.question_type === 'multiple_choice') {
        return {
          ...base,
          choices: q.choices
            .filter(c => c.trim() !== '')
            .map(c => ({ text: c.trim() }))
        };
      } else {
        return {
          ...base,
          choices: [],
        };
      }
    });

    const isValid = payload.every(q => {
      if (!q.text) return false;
      if (q.question_type === 'multiple_choice' && q.choices.length === 0) return false;
      if (q.question_type === 'scale' && (!q.scale_min_label || !q.scale_max_label)) return false;
      return true;
    });

    if (!isValid) {
      alert(isRTL ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields');
      return;
    }

    try {
      const token = localStorage.getItem('access');
      await axios.post(
        `https://survey-ink.com/surveys/${surveyId}/questions/bulk_create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert(isRTL ? 'تم حفظ الأسئلة بنجاح!' : 'Questions saved successfully!');
      navigate(`/unpublished-surveys`);
    } catch (error) {
      console.error(error);
      alert(isRTL ? 'حدث خطأ أثناء الحفظ' : 'Error while saving');
    }
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ display: 'flex', height: '100vh' , background: `url(${dashboardBg})`,backgroundAttachment: 'fixed',backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%'}}>
      <Sidebar
        isRTL={isRTL}
        sidebarVisible={sidebarVisible}
        handleSidebarToggle={() => setSidebarVisible(!sidebarVisible)}
        profileOpen={profileOpen}
        handleProfileToggle={() => setProfileOpen(!profileOpen)}
        toggleLanguage={toggleLanguage}
        handleLogout={handleLogout}
      />

      <main
        style={{
          flex: 1,
          padding: '2rem',
          backgroundColor: '#f5f6fa',
          overflowY: 'auto',
          marginLeft: '270px',
           background: `url(${dashboardBg})`,backgroundAttachment: 'fixed',backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%'
        }}
      >
        <h2
          style={{
            textAlign: isRTL ? 'right' : 'left',
            color: '#35508C',
            fontSize: '2rem',
            marginBottom: '2rem',
            fontWeight: '700',
            marginTop:'8px'
          }}
        >
          {isRTL ? `أدخل الأسئلة لـ: ${surveyTitle}` : `Enter Questions for: ${surveyTitle}`}
        </h2>

        <form onSubmit={handleSubmit}>
          {questions.map((q, idx) => (
            <div
              key={idx}
              style={{
                background: '#A3B6DED4',
                padding: '1.5rem',
                borderRadius: '1rem',
                marginBottom: '2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                position: 'relative'
              }}
            >
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(idx)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    [isRTL ? 'left' : 'right']: '10px',
                    background: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '28px',
                    height: '28px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  ×
                </button>
              )}

              {/* QUESTION TYPE FIRST */}
              <label style={{color:'#fff',fontSize:'14px',fontFamily:'Poppins',fontStyle:'normal',fontWeight:500}}>{isRTL ? 'نوع السؤال' : 'Question Type'}</label>
              <select
                value={q.question_type}
                onChange={e => handleQuestionChange(idx, 'question_type', e.target.value)}
                style={{
                  width: '100%',
                  marginBottom: '1rem',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #ced4da',
                  background:'#D2DBEC',
                  color:'#9A9DA4',
                }}
              >
                <option value="text">{isRTL ? 'نص' : 'Text'}</option>
                <option value="scale">{isRTL ? 'مقياس' : 'Scale'}</option>
                <option value="multiple_choice">{isRTL ? 'اختيار من متعدد' : 'Multiple Choice'}</option>
              </select>

              {/* THEN QUESTION TEXT */}
              <label style={{color:'#fff',fontSize:'14px',fontFamily:'Poppins',fontStyle:'normal',fontWeight:500}}>{isRTL ? `السؤال ${idx + 1}` : `Question ${idx + 1}`}</label>
              <textarea
                value={q.text}
                onChange={e => handleQuestionChange(idx, 'text', e.target.value)}
                rows={3}
                placeholder={isRTL ? 'أدخل نص السؤال' : 'Enter question text'}
                style={{
                  width: '100%',
                  marginBottom: '1rem',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #ced4da',
                  resize: 'vertical',
                  background:'#D2DBEC',
                }}
              />

              {q.question_type === 'scale' && (
                <>
                  <label>{isRTL ? 'أدنى تصنيف' : 'Min Label'}</label>
                  <input
                    value={q.scale.minLabel}
                    onChange={e => handleScaleChange(idx, 'minLabel', e.target.value)}
                    placeholder={isRTL ? 'مثلاً: أرفض بشدة' : 'e.g. Strongly Disagree'}
                    style={{
                      width: '100%',
                      marginBottom: '0.5rem',
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #ced4da'
                    }}
                  />
                  <label>{isRTL ? 'أعلى تصنيف' : 'Max Label'}</label>
                  <input
                    value={q.scale.maxLabel}
                    onChange={e => handleScaleChange(idx, 'maxLabel', e.target.value)}
                    placeholder={isRTL ? 'مثلاً: أوافق بشدة' : 'e.g. Strongly Agree'}
                    style={{
                      width: '100%',
                      marginBottom: '1rem',
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #ced4da'
                    }}
                  />
                </>
              )}

              {q.question_type === 'multiple_choice' &&
                q.choices.map((choice, cidx) => (
                  <div key={cidx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <input
                      value={choice}
                      onChange={e => handleChoiceChange(idx, cidx, e.target.value)}
                      placeholder={isRTL ? 'أدخل خياراً' : 'Enter choice'}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #ced4da'
                      }}
                    />
                    {cidx === q.choices.length - 1 && (
                      <button
                        type="button"
                        onClick={() => addChoice(idx)}
                        style={{
                          fontSize: '1.2rem',
                          background: '#28a745',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '50%',
                          width: '28px',
                          height: '28px'
                        }}
                      >
                        ＋
                      </button>
                    )}
                    {q.choices.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeChoice(idx, cidx)}
                        style={{
                          fontSize: '1.2rem',
                          background: '#dc3545',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '50%',
                          width: '28px',
                          height: '28px'
                        }}
                      >
                        －
                      </button>
                    )}
                  </div>
                ))}
            </div>
          ))}

          <button
            type="button"
            onClick={addQuestion}
            style={{
              marginRight: '1rem',
              background: '#395692',
              color: '#fff',
              border: 'none',
              padding: '0.7rem 1.5rem',
              borderRadius: '0.6rem',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {isRTL ? 'أضف سؤالاً' : 'Add Question'}
          </button>

          <button
            type="submit"
            style={{
              background: '#F19303',
              color: '#fff',
              border: 'none',
              padding: '0.7rem 1.5rem',
              borderRadius: '0.6rem',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {isRTL ? 'حفظ الأسئلة' : 'Save Questions'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateQuestions;
