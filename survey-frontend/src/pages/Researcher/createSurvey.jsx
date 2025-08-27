import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dashboardBg from '../../assets/dashboardBg.png'

const CreateSurvey = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const isRTL = language === 'ar';

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [numQuestions, setNumQuestions] = useState(1);
  const [durationDays, setDurationDays] = useState(1);
  const [minDurationMinutes, setMinDurationMinutes] = useState(1);
  const [maxDurationMinutes, setMaxDurationMinutes] = useState(3);
  // const [choiceSet, setChoiceSet] = useState('');
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [otherUniversity, setOtherUniversity] = useState('');
  const [reason, setReason] = useState('');
  const [langChoice, setLangChoice] = useState('en');
  const [requiredSubmissions, setRequiredSubmissions] = useState(1);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    window.history.pushState({}, document.title, '/login');
    window.location.href = '/login';
  };

  // Fetch universities from backend API
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await fetch('https://survey-ink.com/api/universities/');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setUniversities(data);
          } else if (data.results && Array.isArray(data.results)) {
            setUniversities(data.results);
          } else {
            setUniversities([]);
          }
        } else {
          console.error('Failed to fetch universities');
        }
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };
    fetchUniversities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access');

    const payload = {
      title,
      description,
      num_questions: Number(numQuestions),
      duration_days: Number(durationDays),
      min_duration_minutes: Number(minDurationMinutes),
      max_duration_minutes: Number(maxDurationMinutes),
      // choice_set: choiceSet.trim(),
      university: selectedUniversity !== 'other' ? selectedUniversity : undefined,
      university_name: selectedUniversity === 'other' ? otherUniversity : undefined,

      
      reason,
      language: langChoice,
      required_submissions: Number(requiredSubmissions),
    };

    try {
      const response = await fetch('https://survey-ink.com/create-survey/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();

        toast.success(isRTL ? 'تم إنشاء الاستبيان بنجاح!' : 'Survey created successfully!');
        setTitle('');
        setDescription('');
        setNumQuestions(1);
        setDurationDays(1);
        setMinDurationMinutes(1);
        setMaxDurationMinutes(3);
        // setChoiceSet('');
        setSelectedUniversity('');
        setReason('');
        setLangChoice('en');
        setRequiredSubmissions(1);

        navigate(`/create-demographic/${data.id}/`, {
          state: { numQuestions: Number(numQuestions), surveyTitle: title },
        });
      } else {
        toast.error(isRTL ? 'فشل في إنشاء الاستبيان' : 'Failed to create survey');
      }
    } catch (error) {
      alert(isRTL ? 'حدث خطأ' : 'An error occurred');
      console.error(error);
    }
  };

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        padding: '1rem',
        background: `url(${dashboardBg})`,backgroundAttachment: 'fixed',backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%'  
      }}
    >
      <Sidebar
        isRTL={isRTL}
        sidebarVisible={sidebarVisible}
        handleSidebarToggle={() => setSidebarVisible(!sidebarVisible)}
        profileOpen={profileOpen}
        handleProfileToggle={() => setProfileOpen(!profileOpen)}
        toggleLanguage={toggleLanguage}
        handleLogout={handleLogout}
      />

      {!sidebarVisible && (
        <button
          onClick={() => setSidebarVisible(true)}
          style={{
            position: 'fixed',
            top: '1rem',
            left: isRTL ? 'auto' : '1rem',
            right: isRTL ? '1rem' : 'auto',
            zIndex: 1200,
            backgroundColor: '#395692',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '0.5rem 0.7rem',
            cursor: 'pointer',
          }}
          aria-label={isRTL ? 'فتح القائمة' : 'Open Menu'}
        >
          <FaBars size={20} />
        </button>
      )}

      <main
        style={{
          flexGrow: 1,
          maxWidth: '982px',
          width: '100%',
          backgroundColor: '#A3B6DED4',
          // padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          overflowY: 'auto',
          maxHeight: '90vh',
          marginLeft:'250px',
          marginTop:'18px'
        }}
      >

  <h1
    style={{
      textAlign: isRTL ? 'right' : 'left',
      backgroundColor: '#395692',
      color: '#F19303',
      padding: '1rem',
      borderRadius: '5px',
      fontSize: '14px',
      fontStyle:'normal',
      fontWeight:600,
      width: '100%',
      height:'49px',
    }}
  >
    {isRTL ? 'إنشاء استبيان جديد' : 'Create a New Survey'}
  </h1>

        <form onSubmit={handleSubmit} style={{padding:'2rem'}}>
          {/* Title */}
          <label htmlFor="title" style={{fontSize:'14px', color:'#fff',display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            {isRTL ? 'عنوان الاستبيان' : 'Survey Title'}
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '1rem',
              borderRadius: '5px',
              border: '1px solid #395692',
              direction: isRTL ? 'rtl' : 'ltr',
              background:'#D2DBEC',
            }}
          />

          {/* Description */}
          <label htmlFor="description" style={{ fontSize:'14px', color:'#fff',display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            {isRTL ? 'وصف الاستبيان' : 'Survey Description'}
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '1rem',
              borderRadius: '5px',
              border: '1px solid #395692',
              direction: isRTL ? 'rtl' : 'ltr',
              background:'#D2DBEC',

            }}
          />

          {/* Duration Days */}
          <label htmlFor="durationDays" style={{fontSize:'14px', color:'#fff', display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            {isRTL ? 'مدة الاستبيان (أيام)' : 'Survey Deadline (days)'}
          </label>
          <input
            id="durationDays"
            type="number"
            min="1"
            value={durationDays}
            onChange={(e) => setDurationDays(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '1rem',
              borderRadius: '5px',
              border: '1px solid #395692',
              direction: isRTL ? 'rtl' : 'ltr',
              background:'#D2DBEC',
              color:'#9A9DA4'

            }}
          />

          {/* Min Duration Minutes */}
          <label htmlFor="minDurationMinutes" style={{fontSize:'14px', color:'#fff', display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            {isRTL ? 'الحد الأدنى لمدة الإجابة (دقائق)' : 'Minimum Duration (minutes)'}
          </label>
          <input
            id="minDurationMinutes"
            type="number"
            min="1"
            value={minDurationMinutes}
            onChange={(e) => setMinDurationMinutes(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '1rem',
              borderRadius: '5px',
              border: '1px solid #395692',
              direction: isRTL ? 'rtl' : 'ltr',
                            background:'#D2DBEC',
                            color:'#9A9DA4'

            }}
          />

          {/* Max Duration Minutes */}
          <label htmlFor="maxDurationMinutes" style={{fontSize:'14px', color:'#fff', display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            {isRTL ? 'الحد الأقصى لمدة الإجابة (دقائق)' : 'Maximum Duration (minutes)'}
          </label>
          <input
            id="maxDurationMinutes"
            type="number"
            min={minDurationMinutes}
            value={maxDurationMinutes}
            onChange={(e) => setMaxDurationMinutes(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '1rem',
              borderRadius: '5px',
              border: '1px solid #395692',
              direction: isRTL ? 'rtl' : 'ltr',
                            background:'#D2DBEC',
                            color:'#9A9DA4'

            }}
          />

                    {/* Required Submissions */}
          <label
            htmlFor="requiredSubmissions"
            style={{ fontSize:'14px', color:'#fff',display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}
          >
            {isRTL ? 'عدد المشاركات المطلوبة' : 'Required Number of Submissions'}
          </label>
          <input
            id="requiredSubmissions"
            type="number"
            min="1"
            value={requiredSubmissions}
            onChange={(e) => setRequiredSubmissions(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '1.5rem',
              borderRadius: '5px',
              border: '1px solid #395692',
              direction: isRTL ? 'rtl' : 'ltr',
              background:'#D2DBEC',
              color:'#9A9DA4'

            }}
          />

         {/* University Dropdown */}
          <label htmlFor="university" style={{ fontSize:'14px', color:'#fff',display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            {isRTL ? 'الجامعة' : 'University'}
          </label>
          <select
            id="university"
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '1rem',
              borderRadius: '5px',
              border: '1px solid #395692',
              direction: isRTL ? 'rtl' : 'ltr',
              background:'#D2DBEC',
              color:'#9A9DA4'

            }}
          >
            <option value="">{isRTL ? 'اختر الجامعة' : 'Select University'}</option>
            {Array.isArray(universities) &&
              universities.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {uni.name}
                </option>
              ))}
            <option value="other">{isRTL ? 'أخرى' : 'Other'}</option>
          </select>

          {/* Show input if "Other" is selected */}
          {selectedUniversity === 'other' && (
            <input
              type="text"
              placeholder={isRTL ? 'اكتب اسم الجامعة' : 'Enter university name'}
              value={otherUniversity}
              onChange={(e) => setOtherUniversity(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '1rem',
                borderRadius: '5px',
                border: '1px solid #395692',
                direction: isRTL ? 'rtl' : 'ltr',
                background:'#D2DBEC',
                color:'#9A9DA4'

              }}
            />
          )}
          {/* Reason Dropdown */}
          <label htmlFor="reason" style={{fontSize:'14px', color:'#fff', display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            {isRTL ? 'سبب الاستبيان' : 'Reason'}
          </label>
          <select
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '1rem',
              borderRadius: '5px',
              border: '1px solid #395692',
              direction: isRTL ? 'rtl' : 'ltr',
                            background:'#D2DBEC',
                            color:'#9A9DA4'

            }}
          >
            <option value="">{isRTL ? 'اختر السبب' : 'Select Reason'}</option>
            <option value="bachelor">{isRTL ? 'بكالوريوس' : 'Bachelor'}</option>
            <option value="masters">{isRTL ? 'ماجستير' : 'Master’s'}</option>
            <option value="phd">{isRTL ? 'دكتوراه' : 'PhD'}</option>
            <option value="research">{isRTL ? 'ورقة بحثية' : 'Research Paper'}</option>
            <option value="market">{isRTL ? 'بحث سوقي' : 'Market Research'}</option>
          </select>

          {/* Language Dropdown */}
          <label htmlFor="langChoice" style={{ fontSize:'14px', color:'#fff',display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            {isRTL ? 'لغة الاستبيان' : 'Survey Language'}
          </label>
          <select
            id="langChoice"
            value={langChoice}
            onChange={(e) => setLangChoice(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '1rem',
              borderRadius: '5px',
              border: '1px solid #395692',
              direction: isRTL ? 'rtl' : 'ltr',
                            background:'#D2DBEC',
                            color:'#9A9DA4'

            }}
          >
            <option value="en">{isRTL ? 'الإنجليزية' : 'English'}</option>
            <option value="ar">{isRTL ? 'العربية' : 'Arabic'}</option>
          </select>


          {/* Choice Set */}
          {/* <label htmlFor="choiceSet" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            {isRTL ? 'مجموعة الخيارات (مفصولة بفواصل)' : 'Scale (comma separated)'}
          </label>
          <textarea
            id="choiceSet"
            value={choiceSet}
            onChange={(e) => setChoiceSet(e.target.value)}
            rows="2"
            placeholder={isRTL ? 'مثال: ممتاز,ممتاز جداً,عادي' : 'e.g., Excellent,Very Good,Average'}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '1rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
              direction: isRTL ? 'rtl' : 'ltr',
            }}
          /> */}
          <button
            type="submit"
            style={{
              backgroundColor: '#395692',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
          >
            {isRTL ? 'إنشاء الاستبيان' : 'Create Survey'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateSurvey;
