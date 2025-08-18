import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import { FaBars } from 'react-icons/fa';
import { toast } from 'react-toastify';
import dashboardBg from '../../assets/dashboardBg.png';

const EditSurveyDemographics = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isRTL, setIsRTL] = useState(false);
  const [language, setLanguage] = useState('en');

  const [gender, setGender] = useState('');
  const [ageMin, setAgeMin] = useState('');
  const [ageMax, setAgeMax] = useState('');
  const [incomeMin, setIncomeMin] = useState('');
  const [incomeMax, setIncomeMax] = useState('');

  const [country, setCountry] = useState([]);
  const [university, setUniversity] = useState([]);
  const [fieldOfStudy, setFieldOfStudy] = useState([]);
  const [profession, setProfession] = useState([]);

  const [countries, setCountries] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [fields, setFields] = useState([]);
  const [professions, setProfessions] = useState([]);

  const areAllSelected = (selected, allOptions) => {
    const selectedSorted = [...selected].sort().join(',');
    const allSorted = allOptions.map(opt => String(opt.id)).sort().join(',');
    return selectedSorted === allSorted;
  };

  const checkAndSetAll = (selected, allOptions, setter) => {
    const allIds = allOptions.map(opt => String(opt.id));
    const selectedIds = selected.map(id => String(id));
    if (areAllSelected(selectedIds, allOptions)) {
      setter(allIds);
    } else {
      setter(selectedIds);
    }
  };

  useEffect(() => {
    const userLang = localStorage.getItem('language') || 'en';
    setLanguage(userLang);
    setIsRTL(userLang === 'ar');

    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchDropdowns = async () => {
      const [countryRes, universityRes, fieldRes, professionRes] = await Promise.all([
        axios.get('http://localhost:8000/api/countries/'),
        axios.get('http://localhost:8000/api/universities/'),
        axios.get('http://localhost:8000/api/fields_of_study/'),
        axios.get('http://localhost:8000/api/professions/')
      ]);

      setCountries(countryRes.data);
      setUniversities(universityRes.data);
      setFields(fieldRes.data);
      setProfessions(professionRes.data);

      const demoRes = await axios.get(`http://localhost:8000/surveys/${id}/demographics/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = demoRes.data;
      setGender(data.gender || '');
      setAgeMin(data.age_min || '');
      setAgeMax(data.age_max || '');
      setIncomeMin(data.income_min || '');
      setIncomeMax(data.income_max || '');

      checkAndSetAll(data.countries || [], countryRes.data, setCountry);
      checkAndSetAll(data.universities || [], universityRes.data, setUniversity);
      checkAndSetAll(data.fields_of_study || [], fieldRes.data, setFieldOfStudy);
      checkAndSetAll(data.professions || [], professionRes.data, setProfession);
    };

    fetchDropdowns().catch(() =>
      toast.error(language === 'ar' ? 'فشل تحميل البيانات' : 'Failed to load data')
    );
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access');

    try {
      await axios.put(`http://localhost:8000/surveys/${id}/demographics/`, {
        gender,
        age_min: ageMin,
        age_max: ageMax,
        income_min: incomeMin,
        income_max: incomeMax,
        country,
        university,
        field_of_study: fieldOfStudy,
        profession
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(language === 'ar' ? 'تم التحديث بنجاح' : 'Demographics updated successfully');
      navigate(`/edit-survey-questions/${id}`);
    } catch (err) {
      toast.error(language === 'ar' ? 'حدث خطأ أثناء التحديث' : 'Error updating demographics');
    }
  };

  const renderSingleSelectWithAll = (label, values, setter, options) => {
    const allSelected = areAllSelected(values, options);

    return (
      <div style={{ marginBottom: '1rem' ,}}>
        <label style={{ fontWeight: 500,fontSize:"15px",fontFamily:'Poppins',color:'#fff' }}>{label}</label>
        <select
          value={allSelected ? 'all' : values[0] || ''}
          onChange={(e) => {
            const value = e.target.value;
            if (value === 'all') {
              setter(options.map(opt => String(opt.id)));
            } else {
              setter([value]);
            }
          }}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #395692',
            direction: isRTL ? 'rtl' : 'ltr',
                      background:'#D2DBEC',
              color:'#9A9DA4'


          }}
        >
          <option value="">{language === 'ar' ? 'اختر' : 'Select'}</option>
          <option value="all">{language === 'ar' ? 'الكل' : 'All'}</option>
          {options.map(opt => (
            <option key={opt.id} value={String(opt.id)}>{opt.name}</option>
          ))}
        </select>
      </div>
    );
  };

  const renderSelect = (label, value, setter, options) => (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ fontWeight: 500,fontSize:"15px",fontFamily:'Poppins',color:'#fff'}}>{label}</label>
      <select
        value={value}
        onChange={(e) => setter(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #395692',
          direction: isRTL ? 'rtl' : 'ltr',
          background:'#D2DBEC',
              color:'#9A9DA4'


        }}
      >
        <option value="">{language === 'ar' ? 'اختر' : 'Select'}</option>
        {options.map((item) => (
          <option key={item.id} value={item.id}>{item.name}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div style={{ display: 'flex', height: '100vh',  background: `url(${dashboardBg})`,
              backgroundAttachment: 'fixed',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%' }} dir={isRTL ? 'rtl' : 'ltr'}>
      {sidebarVisible && <Sidebar />}
      {!sidebarVisible && (
        <button
          onClick={() => setSidebarVisible(true)}
          style={{
            position: 'fixed',
            top: '1rem',
            [isRTL ? 'left' : 'right']: '1rem',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            zIndex: 1000,
            cursor: 'pointer',
            color: '#395692'
          }}
        >
          <FaBars />
        </button>
      )}

      <div style={{ flexGrow: 1, padding: '2rem', overflowY: 'auto' ,  background: `url(${dashboardBg})`,
                backgroundAttachment: 'fixed',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%'}}>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          backgroundColor: '#A3B6DED4',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          borderTop: '5px solid #395692',
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#395692' }}>
            {language === 'ar' ? 'تعديل البيانات الديموغرافية' : 'Edit Demographic Criteria'}
          </h2>

          <form onSubmit={handleSubmit}>
            {renderSelect(language === 'ar' ? 'الجنس' : 'Gender', gender, setGender, [
              { id: 'male', name: language === 'ar' ? 'ذكر' : 'Male' },
              { id: 'female', name: language === 'ar' ? 'أنثى' : 'Female' }
            ])}

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontWeight: 500,fontSize:"15px",fontFamily:'Poppins',color:'#fff' }}>{language === 'ar' ? 'الفئة العمرية' : 'Age Range'}</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input
                  type="number"
                  placeholder={language === 'ar' ? 'الحد الأدنى' : 'Min'}
                  value={ageMin}
                  onChange={(e) => setAgeMin(e.target.value)}
                  style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #395692', 
                                          background:'#D2DBEC',
                             color:'#9A9DA4'


                  }}
                />
                <input
                  type="number"
                  placeholder={language === 'ar' ? 'الحد الأقصى' : 'Max'}
                  value={ageMax}
                  onChange={(e) => setAgeMax(e.target.value)}
                  style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #395692',
                                          background:'#D2DBEC',
                                    color:'#9A9DA4'


                   }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontWeight: 500,fontSize:"15px",fontFamily:'Poppins',color:'#fff',

               }}>{language === 'ar' ? 'الدخل الشهري' : 'Monthly Income'}</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input
                  type="number"
                  placeholder={language === 'ar' ? 'الحد الأدنى' : 'Min'}
                  value={incomeMin}
                  onChange={(e) => setIncomeMin(e.target.value)}
                  style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #395692',
                                          background:'#D2DBEC',
              color:'#9A9DA4'


                   }}
                />
                <input
                  type="number"
                  placeholder={language === 'ar' ? 'الحد الأقصى' : 'Max'}
                  value={incomeMax}
                  onChange={(e) => setIncomeMax(e.target.value)}
                  style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #395692',
                                          background:'#D2DBEC',
              color:'#9A9DA4'


                   }}
                />
              </div>
            </div>

            {renderSingleSelectWithAll(language === 'ar' ? 'الدولة' : 'Country', country, setCountry, countries)}
            {renderSingleSelectWithAll(language === 'ar' ? 'الجامعة' : 'University', university, setUniversity, universities)}
            {renderSingleSelectWithAll(language === 'ar' ? 'مجال الدراسة' : 'Field of Study', fieldOfStudy, setFieldOfStudy, fields)}
            {renderSingleSelectWithAll(language === 'ar' ? 'المهنة' : 'Profession', profession, setProfession, professions)}

            <button
              type="submit"
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
                marginTop: '1rem'
              }}
            >
              {language === 'ar' ? 'حفظ ومتابعة' : 'Save and Continue'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSurveyDemographics;
