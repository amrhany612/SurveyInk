import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { styles } from '../style';
import HeaderImage from '../assets/empower.jpg';
import MissionImage from '../assets/ourmission.jpg';
import WhyJoinImage from '../assets/whyjoinus.jpg';
import bgImage from '../assets/about_us_image.jpg';
import sectioBackground from '../assets/B.G.svg';
import empoweringImage from '../assets/empowering.png';
import empoweringTextImage from '../assets/brand asset.svg';
import ourMission from '../assets/our_mission.png';
import ourMissionImage from '../assets/our_mission_image.svg';
import surveyImage from '../assets/Survey Hosting.jpg';
import researchSupportImage from '../assets/Research Paper Support.jpg';
import statisticalImage from '../assets/Statistical Analysis.jpg';
import academicImage from '../assets/Academic.png';
import languageImage from '../assets/Dual-Language Platform-pictogram.jpg';
import paymentImage from '../assets/Fair Compensation .jpg';
import verifyImage from '../assets/Verified Participants.jpg';
import responseImage from '../assets/One-Time Response Policy.jpg';
import backgroundImage from '../assets/background.svg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import './css/about.css'

function AboutUs() {
  const { t } = useTranslation();
      const navigate = useNavigate();
  
 useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <main className="about-page">
      <section
        data-aos="fade-down"
        style={{
          width: '1440px',
          backgroundImage: '#fff',
          color: '#395692',
          textAlign: 'center'
        }}
      >
<div style={{ position: 'relative', width: '1550px', height: '532px' }}>
  {/* Background Image with Blur */}
  <div
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'blur(0.65px)',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
    }}
  />

  {/* Foreground Content Centered */}
  <div
    style={{
      position: 'relative',
      zIndex: 2,
      color: '#fff',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight:'100px'
    }}
  >
    <h1 style={{ fontSize: '48px', fontWeight: 'bold' }}>About Us</h1>
  </div>
</div>

</section>
      {/* Hero Section */}
  <section
  data-aos="fade-up"
  style={{
    width: '1550px',
    height: '448px',
    margin: '0 auto', // center the section horizontally
    backgroundImage: `url(${sectioBackground})`, // or use backgroundColor instead
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '2rem',
    borderRadius: '12px', // optional for styling
    display: 'flex',
    alignItems: 'center',
  }}
>

 <div
    style={{
      display: 'flex',
      marginLeft:"225px",
      marginBottom:"200px"
    }}
  >
    {/* First Card */}
   <div
      style={{
        width: '464px',
        height: '464px',
        backgroundColor: '#F8F8F8',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        fontFamily: 'sans-serif',
      }}
    >

      <div style={{ position: 'relative', display: 'inline-block', paddingLeft: '8px' ,marginTop:'89px'}}>
        {/* Curvy color image overlay */}
        <img
          src={empoweringTextImage}
          alt="Curvy Overlay"
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '50px',  // adjust width
            height: '40px', // adjust height
            zIndex: 1,
          }}
        />

        {/* Heading text */}
        <h2
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#23407F',
            lineHeight: '1.2',
            marginBottom: '0.5rem',
            position: 'relative',
            zIndex: 2, // place text above background image if needed
          }}
        >
          Empowering Research<br />in The Middle East
        </h2>
        <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6' }}>
          Survey Ink empowers Middle East researchers with verified participants, expert support,
          and bilingual tools for faster, affordable insights. Freelancers gain flexible, meaningful work
          by contributing to impactful academic, market, and thesis research projects.
        </p>
    </div>


    <button
      style={{
        backgroundColor: '#F19303',
        color: '#FEFEFF',
        border: 'none',
        width:'120px',
        height:'38px',
        padding: '8px 24px',
        borderRadius: '40px',
        fontWeight: '600',
        fontSize: '16px',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        marginBottom:'90px',
        marginTop:'10px',
        fontFamily:'Poppins',
        fontStyle:'normal',
        textAlign:'center',
        justifyContent:'center'
      }}
      onClick={() => navigate('/signup')}

    >
      JOIN US
    </button>
</div>


    {/* Second Card */}
<div
  style={{
    width: '444px',
    height: '464px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    padding: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  <img
    src={empoweringImage}
    alt="empowering Image"
    style={{ maxWidth: '444px', maxHeight: '464px', objectFit: 'cover' }}
  />
</div>
  </div>
 
</section>
  {/* Third Section */}
<section
  data-aos="fade-up"
  style={{
    width: '1440px',
    height: '448px',
    padding: '0',
    display: 'flex',
    overflow: 'hidden',
  }}
>
  {/* Left Half - background image with card inside */}
  <div
    style={{
      width: '50%',
      height: '100%',
      backgroundImage: `url(${ourMission})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {/* First Card */}
    <div
      style={{
        width: '560px',
        height: '352px',
        backgroundColor: '#F8F8F8',
        boxShadow: 'inset -1px 0 0 rgba(0,0,0,0.1)', // خط فاصل داخلي اختياري
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        fontFamily: 'sans-serif',
        borderTopRightRadius: '0',
        borderBottomRightRadius: '0',
        marginLeft:'160px'
      }}
    >
      <div style={{ position: 'relative', display: 'inline-block', paddingLeft: '8px', marginTop: '48px' }}>
        <img
          src={empoweringTextImage}
          alt="Curvy Overlay"
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '50px',
            height: '40px',
            zIndex: 1,
          }}
        />
        <h2
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#23407F',
            lineHeight: '1.2',
            marginBottom: '0.5rem',
            position: 'relative',
            zIndex: 2,
          }}
        >
          Our Mission
        </h2>
        <p style={{ fontSize: '16px', color: '#6F6F6F',fontFamily: "Poppins",fontStyle:'normal',fontWeight:'400',lineHeight: '1.6',width:'373px',height:'178px' }}>
        Our mission is to facilitate high-quality data collection, academic collaboration, and freelance engagement through an inclusive, secure, and user-friendly platform that serves the needs of both researchers and independent professionals.        </p>
      </div>

    </div>
  </div>

  {/* Right Half - Card with image (no gap between) */}
  <div
    style={{
      width: '560px',
      height: '352px',
      boxShadow: 'inset 1px 0 0 rgba(0,0,0,0.1)', // خط فاصل داخلي اختياري
      backgroundColor:'#F8F8F8',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0',
      marginTop:'48px'
    }}
  >
    <img
    src={ourMissionImage}
      alt="empowering Image"
      style={{
        maxWidth: '560px',
        maxHeight: '352px',
        objectFit: 'cover',
      }}
    />
  </div>
</section>

<section
  data-aos="fade-up"
  style={{
    width: '1550px',
    height: 'auto',
    margin: '0 auto',
    backgroundImage: `url(${sectioBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '3rem 2rem',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif',
  }}
>
  {/* Title */}
  <h2
    style={{
      fontSize: '35px',
      fontWeight: '600',
      color: '#23407F',
      padding: '0.5rem 1.5rem',
      marginBottom: '2rem',
      fontStyle:'normal',
      lineHeight:'42px'
    }}
  >
    What We Offer
  </h2>

  {/* Cards Container */}
  <div
    style={{
      display: 'flex',
      gap: '1.5rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop:'47px'
    }}
  >
    {/* Card 1 */}
    <div style={cardStyle}>
      <img src={surveyImage} alt="Survey Hosting" style={imageStyle} />
      <h3 style={cardTitleStyle}>Survey Hosting</h3>
      <p style={cardTextStyle}>
        Secure and reliable hosting for your surveys, ensuring data integrity and accessibility across the region.
      </p>
      <div style={bottomBarStyle}></div>
    </div>

    {/* Card 2 */}
    <div style={cardStyle}>
      <img src={researchSupportImage} alt="Research Support" style={imageStyle} />
      <h3 style={cardTitleStyle}>Research Paper Support</h3>
      <p style={cardTextStyle}>
        Comprehensive assistance with research paper development, from methodology to final presentation.
      </p>
      <div style={bottomBarStyle}></div>
    </div>

    {/* Card 3 */}
    <div style={cardStyle}>
      <img src={statisticalImage} alt="Statistical Analysis" style={imageStyle} />
      <h3 style={cardTitleStyle}>Statistical Analysis</h3>
      <p style={cardTextStyle}>
        Expert statistical analysis to help you interpret your data and draw accurate conclusions.
      </p>
      <div style={bottomBarStyle}></div>
    </div>

    {/* Card 4 */}
    <div style={cardStyle}>
      <img src={academicImage} alt="Academic Publishing" style={imageStyle} />
      <h3 style={cardTitleStyle}>Academic Publishing Help</h3>
      <p style={cardTextStyle}>
        Guidance through the academic publishing process, increasing your chances of success.
      </p>
      <div style={bottomBarStyle}></div>
    </div>
  </div>
</section>
    {/* why join survey ink */}
 <section
  data-aos="fade-up"
  style={{
    width: '1550px',
    height: 'auto',
    margin: '0 auto',
    backgroundColor:'#F4F4F4',
    padding: '3rem 2rem',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif',
  }}
>
 <div
  style={{
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    position: 'relative',
    paddingLeft: '2rem', // مسافة من يسار الصفحة حسب الاتجاه
    textAlign: 'start',
  }}
>
  <div style={{ position: 'relative' }}>
    {/* Curvy color image overlay */}
    <img
      src={empoweringTextImage}
      alt="Curvy Overlay"
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '50px',
        height: '40px',
        zIndex: 1,
      }}
    />

    {/* Heading text */}
    <h2
      style={{
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#3699DD',
        lineHeight: '1.2',
        marginBottom: '0.5rem',
        position: 'relative',
        zIndex: 2,
        textAlign: 'start',
      }}
    >
      Why Join SurveyInk?
    </h2>
  </div>
</div>

  {/* Cards Container */}
  <div
    style={{
      display: 'flex',
      gap: '1.5rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop:'47px'
    }}
  >
    {/* Card 1 */}
    <div style={cardJoinStyle}>
      <img src={languageImage} alt="Survey Hosting" style={imageJoinStyle} />
      <h3 style={cardJoinTitleStyle}>Dual-Language Platform</h3>
      <p style={cardJoinTextStyle}>
        Secure and reliable hosting for your surveys, ensuring data integrity and accessibility across the region.
      </p>
    </div>

    {/* Card 2 */}
    <div style={cardJoinStyle}>
      <img src={paymentImage} alt="Research Support" style={imageJoinStyle} />
      <h3 style={cardJoinTitleStyle}>Fair Compensation </h3>
      <p style={cardJoinTextStyle}>
        Comprehensive assistance with research paper development, from methodology to final presentation.
      </p>
    </div>

    {/* Card 3 */}
    <div style={cardJoinStyle}>
      <img src={verifyImage} alt="Statistical Analysis" style={imageJoinStyle} />
      <h3 style={cardJoinTitleStyle}>Verified Participants</h3>
      <p style={cardJoinTextStyle}>
        Expert statistical analysis to help you interpret your data and draw accurate conclusions.
      </p>
    </div>

    {/* Card 4 */}
    <div style={cardJoinStyle}>
      <img src={responseImage} alt="Academic Publishing" style={imageJoinStyle} />
      <h3 style={cardJoinTitleStyle}>One-Time Response Policy</h3>
      <p style={cardJoinTextStyle}>
        Guidance through the academic publishing process, increasing your chances of success.
      </p>
    </div>
  </div>
</section>

     {/* Hero Section */}
<section
  data-aos="fade-up"
  style={{
    width: '1550px',
    height: '448px',
    margin: '0 auto',
    backgroundColor: '#FFFFFF',
    padding: '2rem',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  }}
>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2
      style={{
        fontSize: '33px',
        fontWeight: '600',
        color: '#395692',
        lineHeight: '1.4',
        maxWidth: '900px',
        marginBottom: '20px',
      }}
    >
      So, what are you waiting for? Get your exclusive services in one hand
    </h2>

    <button
      style={{
        backgroundColor: '#395692',
        color: '#FEFEFF',
        border: 'none',
        width: '120px',
        height: '38px',
        borderRadius: '40px',
        fontWeight: '600',
        fontSize: '16px',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        textAlign: 'center',
      }}
    >
      Get Started
    </button>
  </div>
</section>


      {/* Footer Note */}
    </main>
  );
}
const cardStyle = {
  width: '300px',
  backgroundColor: '#fff',
  // padding: '1rem',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const imageStyle = {
  width: '300px',
  height: '160.722px',
  objectFit: 'cover',
  borderRadius: '14px 14px 0 14px',
  marginBottom: '10px',
};

const cardTitleStyle = {
  color: '#3699DD',
  fontSize: '16px',
  fontWeight: '600',
  fontStyle:'normal',
  // marginBottom: '0.5rem',
  fontFamily:'Poppins',
  paddingLeft:'13.33px',
  width:'230px',
  height: "28px"

};

const cardTextStyle = {
  color: '#000',
  fontSize: '12px',
  lineHeight: '1.5',
  fontFamily:'Poppins',
  paddingLeft:'13.33px',
  width: "223.667px",
  

};

const bottomBarStyle = {
  position: 'absolute',
  bottom: '0',
  right: '0',
  width: '35px',
  height: "110px",
  backgroundColor: '#23407F',
};

const cardJoinStyle = {
  width: '280px',
  // backgroundColor: '#fff',
  backgroundImage:`url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
  // padding: '1rem',
  borderRadius: '12px',
  // boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height:'307px',
  
};

const imageJoinStyle = {
  width: '273px',
  height: '160.722px',
  objectFit: 'cover',
  borderRadius: '14px 0px 0 14px',
  marginBottom: '10px',
};

const cardJoinTitleStyle = {
  color: '#FEA319',
  fontSize: '18px',
  fontWeight: '700',
  fontStyle:'normal',
  // marginBottom: '0.5rem',
  fontFamily:'Poppins',
  paddingLeft:'13.33px',
  // width:'260px',
  height: "23.075px",
  paddingBottom:'13.33px',

  

};

const cardJoinTextStyle = {
  color: '#fff',
  fontSize: '12px',
  lineHeight: '1.5',
  fontFamily:'Poppins',
  paddingLeft:'13.33px',
  width: "247.925px",
  paddingBottom:'13.33px'
  

};

export default AboutUs;
