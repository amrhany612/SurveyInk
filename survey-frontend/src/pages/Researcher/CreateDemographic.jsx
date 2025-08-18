import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { FaBars } from 'react-icons/fa';
import api from '../../axiosConfig';
import Select from 'react-select';
import dashboardBg from '../../assets/dashboardBg.png'

const CreateDemographic = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const isRTL = language === 'ar';

  const [countries, setCountries] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [fields, setFields] = useState([]);
  const [professions, setProfessions] = useState([]);

  const { surveyId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    country: [],
    university: [],
    field_of_study: [],
    profession: [],
    gender: '',
    age_min: 0,
    age_max: 0,
    income_min: 0,
    income_max: 0
  });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [r1, r2, r3, r4] = await Promise.all([
          api.get('/api/countries/'),
          api.get('/api/universities/'),
          api.get('/api/fields_of_study/'),
          api.get('/api/professions/'),
        ]);
        setCountries(r1.data);
        setUniversities(r2.data);
        setFields(r3.data);
        setProfessions(r4.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSelectChange = (selected, name) => {
    setForm(prev => ({
      ...prev,
      [name]: selected.map(s => s.value)
    }));
  };

  const convertOptions = (items) => items.map(item => ({ value: item.id, label: item.name }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/surveys/${surveyId}/demographics/`, form);
      navigate(`/create-survey/${surveyId}/questions`);
    } catch (err) {
      console.error(err);
      alert(isRTL ? 'حدث خطأ أثناء الحفظ' : 'Error saving demographics');
    }
  };

  const customSelectStyle = {
    control: (base) => ({
      ...base,
      padding: '2px',
      borderRadius: '5px',
      width:'461px',
      height:'33px',
      borderColor: 'linear-gradient(90deg, #395692 50%, #E0E1E2 20%, #F19303 30%)',
      boxShadow: 'none',
      background:'#D2DBEC'
      
    }),
  };

  const fieldsMap = [
    { name: 'country', label: isRTL ? 'البلد' : 'Country', options: countries },
    { name: 'university', label: isRTL ? 'الجامعة' : 'University', options: universities },
    { name: 'field_of_study', label: isRTL ? 'المجال الدراسي' : 'Field of Study', options: fields },
    { name: 'profession', label: isRTL ? 'المهنة' : 'Profession', options: professions },
  ];

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ display: 'flex', height: '100vh',        background: `url(${dashboardBg})`,backgroundAttachment: 'fixed',backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%'  
     }}>
      <Sidebar
        isRTL={isRTL}
        sidebarVisible={sidebarVisible}
        handleSidebarToggle={() => setSidebarVisible(!sidebarVisible)}
        profileOpen={profileOpen}
        handleProfileToggle={() => setProfileOpen(!profileOpen)}
        toggleLanguage={() => setLanguage(prev => prev === 'ar' ? 'en' : 'ar')}
        handleLogout={() => {
          localStorage.clear();
          navigate('/login');
        }}
      />

      <main style={{
        flex: 1,
        padding: '2rem',
        backgroundColor: '#f5f6fa',
        marginLeft: sidebarVisible ? '270px' : '0',
        transition: 'margin-left 0.3s',
                background: `url(${dashboardBg})`,backgroundAttachment: 'fixed',backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%'  
        
      }}>
        <div style={{
          display: 'flex',
          justifyContent: isRTL ? 'flex-end' : 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: isRTL ? 'right' : 'left',
            color:'#35508C',marginTop:'8px'
          }}>
            {isRTL ? 'اختر البيانات الديموغرافية' : 'Select Demographic Data'}
          </h2>
          {/* <button onClick={() => setSidebarVisible(!sidebarVisible)}>
            <FaBars size={20} />
          </button> */}
        </div>

        <form onSubmit={handleSubmit} style={{
          background: '#A3B6DED4',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          maxWidth: '982px',
          margin: '0 auto'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {fieldsMap.map(field => (
              <div key={field.name}>
                <label style={{color:'#fff' , fontSize:'14px',fontStyle:'normal',fontWeight:500,fontFamily:'Poppins'}}>{field.label}</label>
                <Select
                  isMulti
                  options={convertOptions(field.options)}
                  value={convertOptions(field.options).filter(opt => form[field.name].includes(opt.value))}
                  onChange={(selected) => handleSelectChange(selected, field.name)}
                  styles={customSelectStyle}
                />
              </div>
            ))}

            <div>
              <label style={{color:'#fff' , fontSize:'14px',fontStyle:'normal',fontWeight:500,fontFamily:'Poppins'}}>{isRTL ? 'الجنس' : 'Gender'}</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ced4da',background:'#D2DBEC' }}
              >
                <option value="">{isRTL ? '--اختر--' : '--Select--'}</option>
                <option value="both">{isRTL ? 'الاثنين معاً' : 'Both'}</option>
                <option value="male">{isRTL ? 'ذكر' : 'Male'}</option>
                <option value="female">{isRTL ? 'أنثى' : 'Female'}</option>
              </select>
            </div>

            <div></div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{color:'#fff', fontSize:'14px',fontStyle:'normal',fontWeight:500,fontFamily:'Poppins'}}>{isRTL ? 'العمر (سنة)' : 'Age (years)'}</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input
                  type="number"
                  name="age_min"
                  value={form.age_min}
                  min="0"
                  onChange={handleChange}
                  style={{ flex: 1, ...customSelectStyle.control({}),width:'447px',height:'22px',background:'#D2DBEC' }}
                />
                <span style={{ alignSelf: 'center' }}>—</span>
                <input
                  type="number"
                  name="age_max"
                  value={form.age_max}
                  min={form.age_min}
                  onChange={handleChange}
                  style={{ flex: 1, ...customSelectStyle.control({}),width:'447px',height:'22px',background:'#D2DBEC' }}
                />
              </div>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{color:'#fff', fontSize:'14px',fontStyle:'normal',fontWeight:500,fontFamily:'Poppins'}}>{isRTL ? 'الدخل' : 'Income'}</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input
                  type="number"
                  name="income_min"
                  value={form.income_min}
                  min="0"
                  onChange={handleChange}
                  style={{ flex: 1, ...customSelectStyle.control({}),width:'447px',height:'22px',background:'#D2DBEC' }}
                />
                <span style={{ alignSelf: 'center' }}>—</span>
                <input
                  type="number"
                  name="income_max"
                  value={form.income_max}
                  min={form.income_min}
                  onChange={handleChange}
                  style={{ flex: 1, ...customSelectStyle.control({}) ,width:'447px',height:'22px',background:'#D2DBEC'}}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', textAlign: isRTL ? 'right' : 'left' }}>
            <button
              type="submit"
              style={{
                background: '#395692',
                color: '#F19303',
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {isRTL ? 'التالي: إنشاء الأسئلة' : 'Next: Create Questions'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateDemographic;