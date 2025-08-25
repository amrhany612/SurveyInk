import React from 'react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import AnalysisImage from '../assets/Intuitive Analytics picotgram.svg';
import CustomizableImage from '../assets/Customizable Settings pict.svg';
import SeamlessImage from '../assets/Seamless Management picot.svg';
import bgImage from '../assets/B.G.svg';
import surveyHosting from '../assets/Survey Hosting.jpg';
import StatisticalAnalysis from '../assets/Statistical Analysis.jpg';
import Academic from '../assets/Academic.png';
import Research from '../assets/Research Paper Support.jpg';
import languageImage from '../assets/Dual-Language Platform-pictogram.jpg';
import paymentImage from '../assets/Fair Compensation .jpg';
import verifyImage from '../assets/Verified Participants.jpg';
import responseImage from '../assets/One-Time Response Policy.jpg';
import empoweringTextImage from '../assets/brand asset.svg';
import backgroundImage from '../assets/background.svg';
import HeroVideo from '../assets/hero_section_video.mp4';
import wordBg from '../assets/brand asset.svg';
import dollarImage from '../assets/DollarImage.png'
import empoweringBgImage from '../assets/B.G.svg'
import empoweringImage from '../assets/empoweringHome.png';
import "./css/Home.css"
function Home() {
  const { t, i18n } = useTranslation();
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';
    const navigate = useNavigate();

   const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToService = (index) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const serviceWidth = 447 + 32; // width + gap
      container.scrollTo({
        left: index * serviceWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    scrollToService(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(currentIndex + 1, 1); // Only 4 services, showing 3 at a time
    scrollToService(newIndex);
  };

  return (
    <div className="home-page" style={{ direction }}>
    <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src={HeroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          color: '#fff',
          padding: '6rem 2rem',
          textAlign: 'left',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          justifyContent: 'center',
        }}
      >

        <div style={{ maxWidth: '704px' }}>
          <p style={{
            fontSize: '1.25rem',
            maxWidth: '800px',
            margin: '0 auto 2rem',
            opacity: '0.95'
          }}>
            {t('Welcome to surveyInk')}
          </p>
          <p style={{
            fontSize: '60px',
            fontWeight: '600',
            fontStyle:'normal',
            marginBottom: '1.5rem',
            lineHeight: '72px',
            textAlign:'left',
            color:'#6CAEDB'
          }}>
            {t('Connecting Minds, One Survey At A Time')}
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'left' }}>
            <a href="/signup" style={{
              padding: '0.5rem 1.2rem',
              width:'138.218px',
              height: '44px',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '40px',
              backgroundColor: '#F19303',
              color: '#fff',
              textDecoration: 'none'
            }}>
              {t('Get_Started') || 'Get Started'}
            </a>
          </div>
        </div>
      </div>
    </section>

{/* Features Section */}
<section style={{
  marginTop:'80px',
  backgroundColor: '#ffffff',
  textAlign: 'center'
}}>
  <div style={{ 
    maxWidth: '1317px',
    marginLeft:'61.5px',
  }}>
    <p 
    style={{
      height:'23px',
      fontWeight:'400px',
      fontStyle:'normal',
      fontSize:'19px',
      fontFamily:'Poppins',
      color:'#F19303',
      textAlign:'center',
      
      
    }}
    >{t('where data meets innovation.')}</p>
    {/* Main Title */}
    <h2 style={{
      fontSize: '33px',
      fontWeight: '600',
      fontStyle:'SemiBold',
      fontFamily:'Poppins',
      marginBottom: '20px',
      color: ' #000000',
      lineHeight: '1.3'
    }}>
      {t('A Dashboard Designed for Clarity')}
    </h2>

    {/* Features Grid */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '160px',
      // margin: '50px 0',
      width:'1317px',
      height:'212px',
    }}>
      {/* Feature 1: Intuitive Analytics */}
<div style={{
  padding: '30px 20px',
  textAlign: 'center',
  width: '329px',
  height: '186px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '22px',
  marginTop:'25px'
}}>
  <div style={{
    width: '75px',
    height: '75px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <img 
      src={AnalysisImage}
      alt="Analytics icon"
      style={{ width: '60px', height: '60px' }}
    />
  </div>
  
  <div style={{
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  }}>
    <h3 style={{
      fontSize: '28px',
      fontWeight: '600',
      color: '#000000',
      margin: 0 // Remove default margin
    }}>
      {t("Intuitive Analytics")}
    </h3>
    <p style={{ 
      color: '#000000',
      fontFamily: 'Poppins',
      lineHeight: '24px',
      fontSize: '16px',
      fontWeight: '400',
      margin: 0 // Remove default margin
    }}>
      {t("Gain instant insights with charts and reports.")}
    </p>
  </div>
</div>

      {/* Feature 2: Seamless Management */}
      <div style={{
        padding: '30px 20px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '75px',
          height: '75px',
          margin: '0 auto 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <img 
            src={SeamlessImage} 
            alt="Management icon"
            style={{ width: '75px', height: '75px' }}
          />
        </div>
        <h3 style={{
          fontSize: '28px',
          fontWeight: '600',
          marginBottom: '15px',
          color: '#000000',
          width:'339px',
          height:'34px'
        }}>
          Seamless Management
        </h3>
        <p style={{ 
          color: ' #000000',
          fontFamily:'Poppins',
          lineHeight: '24px',
          fontSize: '16px',
          fontWeight:'400px',
          width:'329px',
          height:'48px',
          textAlign:'center'

        }}>
          Effortlessly manage your survey respondents.
        </p>
      </div>

      {/* Feature 3: Customizable Settings */}
      <div style={{
        padding: '30px 20px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '86px',
          height: '86px',
          margin: '0 auto 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            src={CustomizableImage}
            alt="Settings icon"
            style={{ width: '86px', height: '86px' }}
          />
        </div>
        <h3 style={{
          fontSize: '28px',
          fontWeight: '600',
          marginBottom: '15px',
          color: '#000000',
          lineHeight:'120%',
          width:'321px',
          height:'34px'
        }}>
          Customizable Settings
        </h3>
        <p style={{ 
          color: ' #000000',
          fontFamily:'Poppins',
          lineHeight: '24px',
          fontSize: '16px',
          fontWeight:'400px',
          width:'329px',
          height:'48px',
          textAlign:'center'
        }}>
          Tailor your dashboard to fit your needs.
        </p>
      </div>
    </div>

   
  </div>
</section>



{/* Services Section */}
    <section style={{
      padding: '4rem 2rem',
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      marginTop: '50px',
      position: 'relative',
      '::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        zIndex: 0
      }
    }}>
      <div style={{ 
        maxWidth: '1485px', 
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Navigation Arrows */}
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          style={{
            position: 'absolute',
            left: '-50px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#fff',
            border: '1px solid #eaeaea',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            zIndex: 10,
            opacity: currentIndex === 0 ? 0.5 : 1
          }}
        >
          ←
        </button>

        <button 
          onClick={handleNext}
          disabled={currentIndex === 1} // Only 2 possible positions with 4 items showing 3
          style={{
            position: 'absolute',
            right: '-50px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#fff',
            border: '1px solid #eaeaea',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: currentIndex === 1 ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            zIndex: 10,
            opacity: currentIndex === 1 ? 0.5 : 1
          }}
        >
          →
        </button>

        {/* Services Carousel */}
        <div style={{
          display: 'flex',
          overflow: 'hidden',
          position: 'relative',
          maxWidth: '1485px'
        }}>
          <div 
            ref={containerRef}
            style={{
              display: 'flex',
              gap: '2rem',
              width: '100%',
              scrollBehavior: 'smooth',
              padding: '0 1rem',
              height: '396px'
            }}
          >
            {/* Service 1 */}
            <div style={{
              minWidth: '447px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              border: '1px solid #eaeaea',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: '396px',
              flexShrink: 0
            }}>
              <div style={{
                height: '263px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f8f9fa',
                width: '447px'
              }}>
                <img 
                  src={StatisticalAnalysis} 
                  alt="Statistical Analysis"
                  style={{ 
                    width: '447px', 
                    height: '263px',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div style={{
                padding: '2rem',
                textAlign: 'center',
                flex: 1
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#1a1a2e'
                }}>
                  Statistical Analysis
                </h3>
                <p style={{ 
                  color: '#666',
                  lineHeight: '1.6'
                }}>
                  Expert statistical analysis to help you interpret your data.
                </p>
              </div>
            </div>

            {/* Service 2 */}
            <div style={{
              minWidth: '447px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              border: '1px solid #eaeaea',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: '396px',
              flexShrink: 0
            }}>
              <div style={{
                height: '263px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f8f9fa',
                width: '447px'
              }}>
                <img 
                  src={Academic}
                  alt="Academic Publishing"
                  style={{ 
                    width: '447px', 
                    height: '263px',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div style={{
                padding: '2rem',
                textAlign: 'center',
                flex: 1
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#1a1a2e'
                }}>
                  Academic Publishing Help
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  Guidance through the academic publishing process.
                </p>
              </div>
            </div>

            {/* Service 3 */}
            <div style={{
              minWidth: '447px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              border: '1px solid #eaeaea',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: '396px',
              flexShrink: 0
            }}>
              <div style={{
                height: '263px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f8f9fa',
                width: '447px'
              }}>
                <img 
                  src={surveyHosting}
                  alt="Survey Hosting"
                  style={{ 
                    width: '447px', 
                    height: '263px',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div style={{
                padding: '2rem',
                textAlign: 'center',
                flex: 1
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#1a1a2e'
                }}>
                  Survey Hosting
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  Secure and reliable hosting for your surveys.
                </p>
              </div>
            </div>

            {/* Service 4 */}
            <div style={{
              minWidth: '447px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              border: '1px solid #eaeaea',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: '396px',
              flexShrink: 0
            }}>
              <div style={{
                height: '263px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f8f9fa',
                width: '447px'
              }}>
                <img 
                  src={Research}
                  alt="Data Collection"
                  style={{ 
                    width: '447px', 
                    height: '263px',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div style={{
                padding: '2rem',
                textAlign: 'center',
                flex: 1
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#1a1a2e'
                }}>
                  Data Collection
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  High-quality data collection methods.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
<section style={{
  marginTop: '80px',
  backgroundColor: '#ffffff',
  padding: '40px 0',
}}>
  <div style={{
    maxWidth: '1317px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  }}>
    {/* Left Side - Text and Buttons */}
    <div style={{ flex: 1, minWidth: '300px', paddingRight: '20px' }}>
          {/* <div style={{ position: 'relative', display: 'inline-block', paddingLeft: '8px' ,marginTop:'89px'}}></div> */}
<h2 style={{ 
  fontSize: '35px', 
  fontFamily:'Poppins',
  fontWeight:'600',
  color:'#395692',
  marginBottom: '20px',
  textAlign: 'left',
  display: 'flex',
  alignItems: 'center'
}}>
  {/* الحرفين "Su" داخل span بخلفية صورة */}
  <span style={{
    display: 'inline-block',
    position: 'relative',
    width: '70px',   // تقدر تعدل حسب حجم الحرف
    height: '45px',
    // marginRight: '5px',
  }}>
    <img
      src={wordBg}
      alt=""
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '50px',
        height: '40px',
        zIndex: 1,

      }}
    />
    <span style={{
      position: 'relative',
      zIndex: 1,
      display: 'inline-block',
      width: '400px',
      height: '100%',
      textAlign: 'center',
      lineHeight: '45px',
      color: '#395692',
    }}>
      Supported Currencies
    </span>
  </span>

  </h2>
          <span style={{ color:'#000',fontWeight: 'normal', fontSize: '16px' }}>
          We currently support transactions in<br />
          
        </span >
        <span style={{ color:'#F19303',fontWeight: 'normal', fontSize: '18px' }}>
        Egyptian Pound (EGP) & American Dollars (USD)

        </span>
      <div style={{ display: 'flex', gap: '10px',marginTop:'24px' }}>
        <button style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#FEA319',
          border: 'none',
          borderRadius: '15px',
          width:'117px',
          height:'39px',
          cursor: 'pointer',
          background: 'linear-gradient(0deg, #395692 0%, #395692 100%), #F19303',

        }}>
          More
        </button>
        <button style={{
          padding: '10px 20px',
          backgroundColor: 'transparent',
          color: '#3699DD',
          border: '1px solid #395692',
          borderRadius: '15px',
          cursor: 'pointer'
        }}>
          Contact Us
        </button>
      </div>
    </div>

    {/* Right Side - Image */}
    <div style={{ flex: 1, minWidth: '300px', textAlign: 'center' }}>
      <img 
        src={dollarImage} 
        alt="Currency Support" 
        style={{ maxWidth: '100%', height: 'auto' }} 
      />
    </div>
  </div>
</section>
<section style={{
  marginTop: '80px',
  backgroundImage: `url(${empoweringBgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  // padding: '40px 0',
}}>
  <div style={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch', // تمتد الصور بالنسبه لطول الcontainer
    maxWidth: '1200px',
    margin: '0 auto',
  }}>
    
    {/* Left Side - Text and Curvy Image */}
    <div style={{
      flex: 1,
      paddingLeft: '8px',
      marginTop: '70px',
      position: 'relative',
      zIndex: 2,
    }}>
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

      <p
        style={{
          fontSize: '35px',
          fontWeight: '600',
          color: '#23407F',
          lineHeight: '1.2',
          marginBottom: '0.5rem',
          fontFamily: 'Poppins',
          position: 'relative',
          zIndex: 2,
        }}
      >
        Empowering Research<br />in The Middle East
      </p>
      <span style={{
        maxWidth: '400px',
        display: 'block',
        fontSize: '16px',
        color: '#333',
        lineHeight: '1.5',
        fontFamily: 'Poppins',
      }}>
        Survey Ink empowers Middle East researchers with verified participants, expert support, and bilingual tools for faster, affordable insights. Freelancers gain flexible, meaningful work by contributing to impactful academic, market, and thesis research projects.
      </span>
    </div>

    {/* Right Side - Full Height Image with 3D Style */}
    {/* <div style={{
      flex: 1,
      position: 'relative',
      display: 'flex',
      left:'9.6rem',
      // alignItems: 'stretch',
      // justifyContent: 'flex-end',
      width:"956px"
    }}>
      <img 
        src={empoweringImage} 
        alt="Empowering Illustration" 
        style={{
          width: '100%',
          height: '457px',
          objectFit: 'cover',
        }} 
      />
    </div> */}
  </div>
  <div className="join-section">

  <button
      className="join-btn"
      style={{
        backgroundColor: '#F19303',
        color: '#FEFEFF',
        border: 'none',
        width:'120px',
        height:'38px',
        // padding: '12px 24px',
        borderRadius: '40px',
        fontWeight: '600',
        fontSize: '16px',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        marginBottom:'90px',
        marginTop:'10px',
        marginLeft:'165px',
        fontFamily:'Poppins',
        fontStyle:'normal',
        textAlign:'center'
      }}
      onClick={() => navigate('/signup')}

    >
      JOIN US
    </button>
    </div>

</section>


{/* <section
  data-aos="fade-up"
  style={{
    width: '1550px',
    // height: 'auto',
    // margin: '0 auto',
    // backgroundColor:'#F4F4F4',
    padding: '3rem 2rem',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif',
  }}
> */}
 {/* <div
  style={{
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    position: 'relative',
    paddingLeft: '2rem', // مسافة من يسار الصفحة حسب الاتجاه
    textAlign: 'start',
  }}
> */}
  {/* <div style={{ position: 'relative' }}> */}
    {/* Curvy color image overlay */}
    {/* <img
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
    /> */}

    {/* Heading text */}
    {/* <h2
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
</div> */}

  {/* Cards Container */}
  {/* <div
    style={{
      display: 'flex',
      gap: '1.5rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop:'47px'
    }}
  > */}
    {/* Card 1 */}
    {/* <div style={cardJoinStyle}>
      <img src={languageImage} alt="Survey Hosting" style={imageJoinStyle} />
      <h3 style={cardJoinTitleStyle}>Dual-Language Platform</h3>
      <p style={cardJoinTextStyle}>
        Secure and reliable hosting for your surveys, ensuring data integrity and accessibility across the region.
      </p>
    </div> */}

    {/* Card 2 */}
    {/* <div style={cardJoinStyle}>
      <img src={paymentImage} alt="Research Support" style={imageJoinStyle} />
      <h3 style={cardJoinTitleStyle}>Fair Compensation </h3>
      <p style={cardJoinTextStyle}>
        Comprehensive assistance with research paper development, from methodology to final presentation.
      </p>
    </div> */}

    {/* Card 3 */}
    {/* <div style={cardJoinStyle}>
      <img src={verifyImage} alt="Statistical Analysis" style={imageJoinStyle} />
      <h3 style={cardJoinTitleStyle}>Verified Participants</h3>
      <p style={cardJoinTextStyle}>
        Expert statistical analysis to help you interpret your data and draw accurate conclusions.
      </p>
    </div> */}

    {/* Card 4 */}
    {/* <div style={cardJoinStyle}>
      <img src={responseImage} alt="Academic Publishing" style={imageJoinStyle} />
      <h3 style={cardJoinTitleStyle}>One-Time Response Policy</h3>
      <p style={cardJoinTextStyle}>
        Guidance through the academic publishing process, increasing your chances of success.
      </p>
    </div>
  </div>
</section> */}

{/* <section
  data-aos="fade-up"
  style={{
    width: '100%',
    maxWidth: '1550px',
    height: '448px',
    margin: '0 auto',
    background: '#000',
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
      </section> */}

      <section style={{
  marginTop:'80px',
  backgroundColor: '#ffffff',
  textAlign: 'center',
  height:'250px'
}}>
  <div style={{ 
    maxWidth: '1317px',
    marginLeft:'61.5px',
  }}>

   <h2
      style={{
        fontSize: '33px',
        fontWeight: '600',
        color: '#395692',
        lineHeight: '1.4',
        maxWidth: '900px',
        marginBottom: '20px',
        marginLeft:'15rem',
        marginTop:'10rem'
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

    </div>
  );
}

const styles = {
  button: {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    }
  }
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
  width:'253.948px',
  height: "23.075px"

};

const cardJoinTextStyle = {
  color: '#fff',
  fontSize: '12px',
  lineHeight: '1.5',
  fontFamily:'Poppins',
  paddingLeft:'13.33px',
  width: "247.925px",
  

};

export default Home;