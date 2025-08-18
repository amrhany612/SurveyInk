import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { FaBars } from 'react-icons/fa';
import { toast } from 'react-toastify';

const EditSurveyQuestions = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [language, setLanguage] = useState('en');
  const [isRTL, setIsRTL] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userLang = localStorage.getItem('language') || 'en';
    setLanguage(userLang);
    setIsRTL(userLang === 'ar');

    const token = localStorage.getItem('access');
    if (!token) return;

    axios
      .get(`http://localhost:8000/researcher/surveys/${id}/questions/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const formatted = res.data.map((q) => ({
          ...q,
          type: q.question_type || 'text',
          choices: q.choices || [],
          scale_min_label: q.scale_min_label || '',
          scale_max_label: q.scale_max_label || '',
        }));
        setQuestions(formatted);
      })
      .catch(() => {
        toast.error(userLang === 'ar' ? 'فشل تحميل الأسئلة' : 'Failed to load questions');
      });
  }, [id]);

  const handleInputChange = (index, key, value) => {
    const updated = [...questions];
    updated[index][key] = value;

    // Handle change in type and reset relevant fields
    if (key === 'type') {
      updated[index]['question_type'] = value;

      if (value === 'multiple_choice') {
        updated[index].choices = [''];
        updated[index].scale_min_label = '';
        updated[index].scale_max_label = '';
      } else if (value === 'scale') {
        updated[index].choices = [];
        updated[index].scale_min_label = '';
        updated[index].scale_max_label = '';
      } else {
        updated[index].choices = [];
        updated[index].scale_min_label = '';
        updated[index].scale_max_label = '';
      }
    }

    setQuestions(updated);
  };

  const handleChoiceChange = (qIndex, cIndex, value) => {
    const updated = [...questions];
    updated[qIndex].choices[cIndex] = value;
    setQuestions(updated);
  };

  const handleAddChoice = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].choices.push('');
    setQuestions(updated);
  };

  const handleRemoveChoice = (qIndex, cIndex) => {
    const updated = [...questions];
    updated[qIndex].choices.splice(cIndex, 1);
    setQuestions(updated);
  };

  const handleSave = () => {
    const token = localStorage.getItem('access');
    if (!token) {
      toast.error(language === 'ar' ? 'مطلوب تسجيل الدخول' : 'Login required');
      return;
    }

    const cleaned = questions.map((q) => {
      const base = {
        id: q.id,
        text: q.text,
        question_type: q.type,
      };
      if (q.type === 'scale') {
        base.scale_min_label = q.scale_min_label;
        base.scale_max_label = q.scale_max_label;
      }
      if (q.type === 'multiple_choice') {
        base.choices = q.choices;
      }
      return base;
    });

    axios
      .put(`http://localhost:8000/researcher/surveys/${id}/questions/`, cleaned, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success(language === 'ar' ? 'تم تحديث الأسئلة' : 'Questions updated successfully');
        navigate(`/survey/${id}/edit/`);
      })
      .catch(() => {
        toast.error(language === 'ar' ? 'فشل التحديث' : 'Update failed');
      });
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }} dir={isRTL ? 'rtl' : 'ltr'}>
      {showSidebar && <Sidebar />}
      {!showSidebar && (
        <button
          onClick={() => setShowSidebar(true)}
          style={{
            position: 'fixed',
            top: '1rem',
            [isRTL ? 'left' : 'right']: '1rem',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            zIndex: 1000,
            cursor: 'pointer',
            color: '#395692',
          }}
        >
          <FaBars />
        </button>
      )}

      <div style={{ flexGrow: 1, padding: '2rem', overflowY: 'auto' }}>
        <div
          style={{
            maxWidth: '700px',
            margin: '0 auto',
            backgroundColor: '#A3B6DED4',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            borderTop: '5px solid #395692',
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#395692' }}>
            {language === 'ar' ? 'تعديل الأسئلة' : 'Edit Questions'}
          </h2>

          {questions.map((q, i) => (
            <div key={q.id || i} style={{ marginBottom: '2rem' }}>
              <label style={{ fontWeight: 500,fontSize:"15px",fontFamily:'Poppins',color:'#fff' }}>
                {language === 'ar' ? `السؤال ${i + 1}` : `Question ${i + 1}`}
              </label>
              <input
                type="text"
                value={q.text}
                onChange={(e) => handleInputChange(i, 'text', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #395692',
                  marginBottom: '0.5rem',
          background:'#D2DBEC',

                }}
              />

              <select
                value={q.type}
                onChange={(e) => handleInputChange(i, 'type', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #395692',
                  marginBottom: '1rem',
          background:'#D2DBEC',

                }}
              >
                <option value="scale">{language === 'ar' ? 'مقياس' : 'Scale'}</option>
                <option value="multiple_choice">{language === 'ar' ? 'اختيار من متعدد' : 'Multiple Choice'}</option>
                <option value="text">{language === 'ar' ? 'نص' : 'Text'}</option>
              </select>

              {q.question_type === 'scale' && (
                <>
                  <input
                    type="text"
                    placeholder={language === 'ar' ? 'أقل قيمة' : 'Min Label'}
                    value={q.scale_min_label}
                    onChange={(e) => handleInputChange(i, 'scale_min_label', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #395692',
                      marginBottom: '0.5rem',
                      background:'#D2DBEC',

                    }}
                  />
                  <input
                    type="text"
                    placeholder={language === 'ar' ? 'أعلى قيمة' : 'Max Label'}
                    value={q.scale_max_label}
                    onChange={(e) => handleInputChange(i, 'scale_max_label', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #395692',
                      marginBottom: '1rem',
                      background:'#D2DBEC',

                    }}
                  />
                </>
              )}

              {q.question_type === 'multiple_choice' && (
                <div>
                  {q.choices.map((choice, cIndex) => (
                    <div key={cIndex} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input
                        type="text"
                        value={choice.text}
                        onChange={(e) => handleChoiceChange(i, cIndex, e.target.value)}
                        style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #395692',
          background:'#D2DBEC',

                         }}
                      />
                      <button onClick={() => handleRemoveChoice(i, cIndex)} style={{ color: 'red' }}>
                        ✖
                      </button>
                    </div>
                  ))}
                  <button onClick={() => handleAddChoice(i)} style={{ marginTop: '0.5rem' }}>
                    {language === 'ar' ? 'إضافة خيار' : 'Add Choice'}
                  </button>
                </div>
              )}
            </div>
          ))}

          <button
            onClick={handleSave}
            style={{
              backgroundColor: '#F19303',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSurveyQuestions;
