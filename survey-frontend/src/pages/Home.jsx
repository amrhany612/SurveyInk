import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AnalysisImage from "../assets/Intuitive Analytics picotgram.svg";
import CustomizableImage from "../assets/Customizable Settings pict.svg";
import SeamlessImage from "../assets/Seamless Management picot.svg";
import bgImage from "../assets/B.G.svg";
import surveyHosting from "../assets/Survey Hosting.jpg";
import StatisticalAnalysis from "../assets/Statistical Analysis.jpg";
import Academic from "../assets/Academic.png";
import Research from "../assets/Research Paper Support.jpg";
import languageImage from "../assets/Dual-Language Platform-pictogram.jpg";
import paymentImage from "../assets/Fair Compensation .jpg";
import verifyImage from "../assets/Verified Participants.jpg";
import responseImage from "../assets/One-Time Response Policy.jpg";
import empoweringTextImage from "../assets/brand asset.svg";
import backgroundImage from "../assets/background.svg";
import HeroVideo from "../assets/hero_section_video.mp4";
import wordBg from "../assets/brand asset.svg";
import dollarImage from "../assets/DollarImage.png";
import empoweringBgImage from "../assets/B.G.svg";
import empower from "../assets/3d-rendering-isometric-fdgdf 1.png";
import "./css/Home.css";
import Container from "../components/Container";
import GetStarted from "../components/GetStarted";
import exchange1 from "../assets/exchange1.png";
import exchange2 from "../assets/exvhange2.png";
import exchange from "../assets/exchange.mp4";
import survTablet from "../assets/survTablet.jpg";
import survTablet2 from "../assets/survTablet2.jpg";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();
  const direction = i18n.language === "ar" ? "rtl" : "ltr";
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const [currentImage, setCurrentImage] = useState(0);
  const images = [exchange1, exchange2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateMaxIndex = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const totalItems = container.children.length;
      const itemsPerView = window.innerWidth >= 1024 ? 2 : 1;
      setMaxIndex(Math.max(totalItems - itemsPerView, 0));
    };
    updateMaxIndex();
    window.addEventListener("resize", updateMaxIndex);
    return () => {
      window.removeEventListener("resize", updateMaxIndex);
    };
  }, []);

  const scrollToService = (index) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const item = container.children[0];
      if (!item) return;

      const gap = parseInt(getComputedStyle(container).gap || 32);
      const itemWidth = item.offsetWidth + gap;

      const scrollAmount =
        (index - currentIndex) * itemWidth * (i18n.language === "ar" ? -1 : 1);

      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });

      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    scrollToService(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(currentIndex + 1, maxIndex);
    scrollToService(newIndex);
  };

  return (
    <div className="home-page" style={{ direction }}>
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src={HeroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content Overlay */}
        <div
          className={`h-full
            mx-auto px-4 w-[97%] 
          `}
        >
          <div className="text-white flex md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 items-center w-[90%] justify-between">
            <span className="text-[20px]">Follow us</span>
            <div
              style={{
                direction,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div>
                <a href="https://facebook.com/surveyink">
                  <FaFacebookF style={{ fontSize: "20px" }} />
                </a>
              </div>
              <div>
                <a href="https://instagram.com/surveyink">
                  <FaInstagram style={{ fontSize: "20px" }} />
                </a>
              </div>
              <div className="ml-[3px]">
                <a href="https://linkedin.com/company/surveyink">
                  <FaLinkedinIn style={{ fontSize: "20px" }} />
                </a>
              </div>
            </div>
          </div>
          <div className="relative z-10 text-white h-full flex flex-col justify-center ">
            <div className="max-w-[704px]">
              <p className="text-xl max-w-[800px] mb-8 opacity-95 text-start">
                {t("Welcome to surveyInk")}
              </p>

              <p className="text-[60px] font-semibold mb-6 leading-[72px] text-start text-[#6CAEDB]">
                {t("Connecting Minds, One Survey At A Time")}
              </p>

              <div className="flex gap-4 justify-start">
                <a
                  href="/signup"
                  className="px-5 py-2 w-[138px] h-11 text-base font-semibold rounded-full bg-[#F19303] text-white text-center flex items-center justify-center"
                >
                  {t("Get_Started") || "Get Started"}
                </a>
              </div>
            </div>
            <div className="md:flex justify-between items-end absolute bottom-0 w-[100%] pb-[22px] hidden">
              <span className="text-[20px]">Follow us</span>
              <div className="flex items-center gap-3">
                <div
                  style={{
                    border: "2px solid white",
                    padding: "2px",
                    borderRadius: "7px",
                  }}
                >
                  <a href="https://facebook.com/surveyink" className="text-xl">
                    <FaFacebookF />
                  </a>
                </div>
                <a
                  href="https://instagram.com/surveyink"
                  className="text-[32px]"
                >
                  <FaInstagram />
                </a>

                <div
                  style={{
                    border: "2px solid white",
                    padding: "2px",
                    borderRadius: "7px",
                  }}
                >
                  <a
                    href="https://linkedin.com/company/surveyink"
                    className="text-xl"
                  >
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Container>
        <section className="mt-20 bg-white text-center">
          <div className="max-w-[1317px] mx-auto px-4">
            <p className="text-[#F19303] text-[19px] font-normal font-poppins mb-2">
              {t("where data meets innovation.")}
            </p>

            <h2 className="text-[33px] font-semibold font-poppins text-black mb-10 leading-[1.3]">
              {t("A Dashboard Designed for Clarity")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
              <div className="flex flex-col items-center p-6">
                <div className="w-[75px] h-[75px] flex items-center justify-center mb-5">
                  <img
                    src={AnalysisImage}
                    alt="Analytics icon"
                    className="w-[60px] h-[60px]"
                  />
                </div>
                <h3 className="text-[28px] font-semibold text-black mb-3">
                  {t("Intuitive Analytics")}
                </h3>
                <p className="text-[16px] font-normal text-black leading-6">
                  {t("Gain instant insights with charts and reports.")}
                </p>
              </div>

              <div className="flex flex-col items-center p-6">
                <div className="w-[75px] h-[75px] flex items-center justify-center mb-5">
                  <img
                    src={SeamlessImage}
                    alt="Management icon"
                    className="w-[75px] h-[75px]"
                  />
                </div>
                <h3 className="text-[28px] font-semibold text-black mb-3">
                  Seamless Management
                </h3>
                <p className="text-[16px] font-normal text-black leading-6">
                  Effortlessly manage your survey respondents.
                </p>
              </div>

              <div className="flex flex-col items-center p-6">
                <div className="w-[86px] h-[86px] flex items-center justify-center mb-5">
                  <img
                    src={CustomizableImage}
                    alt="Settings icon"
                    className="w-[86px] h-[86px]"
                  />
                </div>
                <h3 className="text-[28px] font-semibold text-black mb-3">
                  Customizable Settings
                </h3>
                <p className="text-[16px] font-normal text-black leading-6">
                  Tailor your dashboard to fit your needs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Container>

      {/* Services Section */}
      <section
        style={{
          padding: "4rem 1rem",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          marginTop: "50px",
          position: "relative",
          direction: i18n.language === "ar" ? "rtl" : "ltr",
        }}
      >
        <div
          className="overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
        />
        <Container>
          <div
            style={{
              maxWidth: "1485px",
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                style={{
                  background: "#fff",
                  border: "1px solid #eaeaea",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: currentIndex === 0 ? "not-allowed" : "pointer",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  opacity: currentIndex === 0 ? 0.5 : 1,
                }}
              >
                {direction === "rtl" ? "→" : "←"}
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === maxIndex}
                style={{
                  background: "#fff",
                  border: "1px solid #eaeaea",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: currentIndex === maxIndex ? "not-allowed" : "pointer",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  opacity: currentIndex === maxIndex ? 0.5 : 1,
                }}
              >
                {direction === "rtl" ? "←" : "→"}
              </button>
            </div>

            <div
              style={{
                overflow: "hidden",
                position: "relative",
                maxWidth: "1485px",
              }}
            >
              <div
                ref={containerRef}
                style={{
                  display: "flex",
                  gap: "2rem",
                  width: "100%",
                  scrollBehavior: "smooth",
                  height: "396px",
                  overflowX: "auto",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  direction: i18n.language === "ar" ? "rtl" : "ltr",
                }}
                className="custom-scrollbar"
              >
                {/*first*/}
                <div
                  className="
    flex-shrink-0 bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col
    h-[396px]
    w-full sm:w-full lg:w-1/2
    max-w-[720px]
  "
                >
                  <div className="flex-2 w-full overflow-hidden">
                    <img
                      src={StatisticalAnalysis}
                      alt={t("Statistical Analysis")}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className={`p-8 flex-1 ${
                      i18n.language === "ar" ? "text-right" : "text-center"
                    }`}
                  >
                    <h3 className="text-xl font-semibold mb-4 text-[#1a1a2e]">
                      {t("Statistical Analysis")}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t(
                        "Expert statistical analysis to help you interpret your data."
                      )}
                    </p>
                  </div>
                </div>

                {/*second */}
                <div
                  className="
    flex-shrink-0 bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col
    h-[396px]
    w-full sm:w-full lg:w-1/2
    max-w-[720px]
  "
                >
                  <div className="flex-2 w-full overflow-hidden">
                    <img
                      src={Academic}
                      alt={t("Academic")}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className={`p-8 flex-1 ${
                      i18n.language === "ar" ? "text-right" : "text-center"
                    }`}
                  >
                    <h3 className="text-xl font-semibold mb-4 text-[#1a1a2e]">
                      {t("Academic Publishing Help")}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t("Guidance through the academic publishing process.")}
                    </p>
                  </div>
                </div>

                {/*third*/}
                <div
                  className="
    flex-shrink-0 bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col
    h-[396px]
    w-full sm:w-full lg:w-1/2
    max-w-[720px]
  "
                >
                  <div className="flex-2 w-full overflow-hidden">
                    <img
                      src={survTablet}
                      alt={t("surveyHosting")}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className={`p-8 flex-1 ${
                      i18n.language === "ar" ? "text-right" : "text-center"
                    }`}
                  >
                    <h3 className="text-xl font-semibold mb-4 text-[#1a1a2e]">
                      {t("Survey Hosting")}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t("Secure and reliable hosting for your surveys.")}
                    </p>
                  </div>
                </div>

                {/*fourth*/}
                <div
                  className="
    flex-shrink-0 bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col
    h-[396px]
    w-full sm:w-full lg:w-1/2
    max-w-[720px]
  "
                >
                  <div className="flex-2 w-full overflow-hidden">
                    <img
                      src={Research}
                      alt={t("Research")}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className={`p-8 flex-1 ${
                      i18n.language === "ar" ? "text-right" : "text-center"
                    }`}
                  >
                    <h3 className="text-xl font-semibold mb-4 text-[#1a1a2e]">
                      {t("Data Collection")}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t("High-quality data collection methods.")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/*Supported Currencies Section*/}
      <Container>
        <section className="mt-20 bg-white py-10">
          <div className="max-w-[1317px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 px-4 text-center lg:text-left">
            {/* Left Side - Text and Buttons */}
            <div className="flex-1 min-w-[280px] flex flex-col items-center lg:items-start">
              <h2 className="text-[35px] font-poppins font-semibold text-[#395692] mb-6 flex items-center justify-center lg:justify-start">
                <span className="relative inline-block">
                  <img
                    src={wordBg}
                    alt=""
                    className="absolute sm:top-0 hidden sm:block sm:left-0 sm:translate-x-0 w-[50px] h-[40px] z-0"
                    style={{
                      transform:
                        direction === "rtl" ? "rotate(90deg)" : "rotate(0)",
                      right: direction === "rtl" ? "0" : "unset",
                    }}
                  />
                  <span className="relative z-10 text-[#395692] leading-[45px]">
                    Supported Currencies
                  </span>
                </span>
              </h2>

              <p className="text-black text-base mb-2">
                We currently support transactions in
              </p>
              <p className="text-[#F19303] text-lg">
                Egyptian Pound (EGP) & American Dollars (USD)
              </p>

              <div className="flex gap-4 mt-6 justify-center lg:justify-start">
                <button className="px-6 py-2 rounded-[15px] w-[117px] h-[39px] bg-[#395692] text-[#FEA319] font-medium">
                  More
                </button>
                <button className="px-6 py-2 rounded-[15px] border border-[#395692] text-[#3699DD] font-medium">
                  Contact Us
                </button>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="lg:w-[42%] w-[90%] min-h-[197px] max-h-[197px] rounded-xl overflow-hidden relative">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Currency Exchange"
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${
                    currentImage === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      </Container>

      {/*Empowering section*/}
      <section
        className="mt-20 bg-cover bg-center relative overflow-hidden pt-9 pb-16"
        style={{ backgroundImage: `url(${empoweringBgImage})` }}
      >
        <Container>
          <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col lg:flex-row">
            {/* Left Side - Text */}
            <div
              className="
          flex-1 relative z-10 
          flex flex-col 
          items-center lg:items-start
          text-center lg:text-left
          
        "
            >
              <img
                src={empoweringTextImage}
                alt="Curvy Overlay"
                className="absolute top-0 left-0 w-[50px] h-[40px] z-0 hidden lg:block"
                style={{
                  transform:
                    direction === "rtl" ? "rotate(90deg)" : "rotate(0)",
                  right: direction === "rtl" ? "0" : "unset",
                }}
              />

              <p
                className={`text-[28px] sm:text-[32px] lg:text-[35px] font-semibold text-[#23407F] leading-tight mb-4 font-poppins relative z-10 ${
                  direction === "rtl" ? "lg:text-right" : "lg:text-left"
                }`}
              >
                Empowering Research
                <br />
                in The Middle East
              </p>

              <span
                className={`block max-w-[500px] text-[15px] sm:text-[16px] text-[#333] leading-relaxed font-poppins ${
                  direction === "rtl" ? "lg:text-right" : "lg:text-left"
                }`}
              >
                Survey Ink empowers Middle East researchers with verified
                participants, expert support, and bilingual tools for faster,
                affordable insights. Freelancers gain flexible, meaningful work
                by contributing to impactful academic, market, and thesis
                research projects.
              </span>

              {/* Button */}
              <button
                className="mt-6 bg-[#F19303] text-white w-[120px] h-[38px] rounded-full font-semibold text-[16px] shadow-md font-poppins hover:scale-105 transition-transform"
                onClick={() => navigate("/signup")}
              >
                JOIN US
              </button>
            </div>
          </div>

          {/* Right Side - Absolute Image (only on lg and above) */}
          <img
            src={empower}
            alt="3d"
            className={`hidden lg:block absolute bottom-0  ${
              direction === "rtl" ? "left-0" : "right-2"
            } w-[70%] object-contain ${
              direction === "rtl" ? "scale-x-[-1]" : "unset"
            }`}
          />
        </Container>
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

      <Container>
        <GetStarted />
      </Container>
    </div>
  );
}

const styles = {
  button: {
    display: "inline-block",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    fontWeight: "600",
    textDecoration: "none",
    transition: "all 0.3s ease",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
  },
};

const cardJoinStyle = {
  width: "280px",
  // backgroundColor: '#fff',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  // padding: '1rem',
  borderRadius: "12px",
  // boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "307px",
};

const imageJoinStyle = {
  width: "273px",
  height: "160.722px",
  objectFit: "cover",
  borderRadius: "14px 0px 0 14px",
  marginBottom: "10px",
};

const cardJoinTitleStyle = {
  color: "#FEA319",
  fontSize: "18px",
  fontWeight: "700",
  fontStyle: "normal",
  // marginBottom: '0.5rem',
  fontFamily: "Poppins",
  paddingLeft: "13.33px",
  width: "253.948px",
  height: "23.075px",
};

const cardJoinTextStyle = {
  color: "#fff",
  fontSize: "12px",
  lineHeight: "1.5",
  fontFamily: "Poppins",
  paddingLeft: "13.33px",
  width: "247.925px",
};

export default Home;
