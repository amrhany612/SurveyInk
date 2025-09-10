import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { styles } from "../style";
import HeaderImage from "../assets/empower.jpg";
import MissionImage from "../assets/ourmission.jpg";
import WhyJoinImage from "../assets/whyjoinus.jpg";
import bgImage from "../assets/about_us_image.jpg";
import sectioBackground from "../assets/B.G.svg";
import sectioBackground2 from "../assets/B.G.png";
import empoweringImage from "../assets/empowering.png";
import empoweringTextImage from "../assets/brand asset.svg";
import ourMission from "../assets/our_mission.png";
import ourMissionImage from "../assets/our_mission_image.svg";
import surveyImage from "../assets/Survey Hosting.jpg";
import researchSupportImage from "../assets/Research Paper Support.jpg";
import statisticalImage from "../assets/Statistical Analysis.jpg";
import academicImage from "../assets/Academic.png";
import languageImage from "../assets/Dual-Language Platform-pictogram.jpg";
import paymentImage from "../assets/Fair Compensation .jpg";
import verifyImage from "../assets/Verified Participants.jpg";
import responseImage from "../assets/One-Time Response Policy.jpg";
import backgroundImage from "../assets/background.svg";
import backgroundImage2 from "../assets/background.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import GetStarted from "../components/GetStarted";

function AboutUs() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const isEnglish = localStorage.getItem("i18nextLng") !== "ar";

  return (
    <main>
      <section
        data-aos="fade-down"
        className="h-[60vh] md:h-[80vh] lg:h-[100vh] "
        style={{
          backgroundColor: "#fff",
          color: "#395692",
          textAlign: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(0.65px)",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            color: "#fff",
            marginTop: "10rem",
          }}
        >
          <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>About Us</h1>
        </div>
      </section>

      {/* Hero Section */}
      <Container>
        <section
          style={{ width: "80%", zIndex: "20" }}
          className="
            relative m-auto
            lg:absolute 
            lg:left-1/2 
            lg:-translate-x-1/2
            lg:top-[500px]
          "
        >
          <div
            className="
              flex flex-col lg:flex-row 
              items-center 
              justify-between 
              lg:bg-white
              lg:shadow-lg 
              lg:rounded-xl 
              p-6 lg:p-10 
              max-w-[1200px] 
              w-full
            "
          >
            <div
              className={`flex-1 text-center ${
                localStorage.getItem("i18nextLng") === "ar"
                  ? "lg:text-right"
                  : "lg:text-left"
              } mb-6 lg:mb-0`}
            >
              <h2
                className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-[#23407F] leading-snug ${
                  localStorage.getItem("i18nextLng") === "ar"
                    ? "lg:text-right"
                    : "lg:text-left"
                }`}
              >
                Empowering Research
                <br />
                in The Middle East
              </h2>
              <p
                className={`text-[#555] text-base mt-4 max-w-[500px] mx-auto lg:mx-0 ${
                  localStorage.getItem("i18nextLng") === "ar"
                    ? "lg:text-right"
                    : "lg:text-left"
                }`}
              >
                Survey Ink empowers Middle East researchers with verified
                participants, expert support, and bilingual tools for faster,
                affordable insights. Freelancers gain flexible, meaningful work
                by contributing to impactful academic, market, and thesis
                research projects.
              </p>
              <button
                className="
                  mt-6 
                  bg-[#F19303] 
                  text-white 
                  px-6 py-2 
                  rounded-full 
                  font-semibold 
                  shadow-md 
                  hover:scale-105 
                  transition-transform
                "
                onClick={() => navigate("/signup")}
              >
                JOIN US
              </button>
            </div>

            <div className="flex-1 flex justify-center">
              <img
                src={empoweringImage}
                alt="Empowering"
                className="w-full max-w-[400px] h-auto object-contain"
              />
            </div>
          </div>
        </section>
      </Container>

      <div
        style={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
        className="h-[25rem] hidden lg:block"
      >
        <img
          src={sectioBackground2}
          alt="background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* Our Mission Section */}
      <section data-aos="fade-up" className={`bg-[#a7a7a72f] py-12`}>
        <Container>
          <div
            className={`flex flex-col lg:flex-row 
              items-center
              text-center 
              lg:justify-between gap-8
              ${
                localStorage.getItem("i18nextLng") === "ar"
                  ? "lg:text-right"
                  : "lg:text-left"
              }
            `}
          >
            <div className="max-w-[560px]">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#23407F] mb-4">
                Our Mission
              </h2>
              <p className="text-[#6F6F6F] text-base leading-relaxed">
                Our mission is to facilitate high-quality data collection,
                academic collaboration, and freelance engagement through an
                inclusive, secure, and user-friendly platform that serves the
                needs of both researchers and independent professionals.
              </p>
            </div>

            <div className="w-full max-w-[560px]">
              <img
                src={ourMissionImage}
                alt="Our Mission"
                className="w-full h-auto object-cover rounded-md"
              />
            </div>
          </div>
        </Container>
      </section>

      <section
        data-aos="fade-up"
        className="max-w-[1550px] mx-auto bg-cover bg-center py-12 px-6 flex flex-col items-center font-[Poppins]"
        style={{
          backgroundImage: `url(${sectioBackground})`,
        }}
      >
        <Container>
          {/* Title */}
          <h2 className="text-[35px] font-semibold text-[#23407F] leading-[42px] mb-8 text-center">
            What We Offer
          </h2>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 w-full justify-items-center">
            <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-[400px] flex flex-col items-start">
              <img
                src={surveyImage}
                alt="Survey Hosting"
                className="w-full object-cover"
                style={{ height: "200px" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: isEnglish ? "20px" : "0",
                  paddingRight: isEnglish ? "0" : "20px",
                }}
              >
                <div style={{ width: "75%", paddingBottom: "30px" }}>
                  <h3 className="text-xl font-semibold text-[rgb(54,153,221)] mt-4 mb-2">
                    Survey Hosting
                  </h3>
                  <p className="text-[#555] text-sm leading-relaxed">
                    Secure and reliable hosting for your surveys, ensuring data
                    integrity and accessibility across the region.
                  </p>
                </div>
                <div className="w-8 bg-[#23407F]"></div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-[400px] flex flex-col items-start">
              <img
                src={researchSupportImage}
                alt="Research Support"
                className="w-full object-cover"
                style={{ height: "200px" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: isEnglish ? "20px" : "0",
                  paddingRight: isEnglish ? "0" : "20px",
                }}
              >
                <div style={{ width: "75%", paddingBottom: "30px" }}>
                  <h3 className="text-xl font-semibold text-[rgb(54,153,221)] mt-4 mb-2">
                    Research Paper Support
                  </h3>
                  <p className="text-[#555] text-sm leading-relaxed">
                    Comprehensive assistance with research paper development,
                    from methodology to final presentation.
                  </p>
                </div>
                <div className="w-8 bg-[#23407F]"></div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-[400px] flex flex-col items-start">
              <img
                src={statisticalImage}
                alt="Statistical Analysis"
                className="w-full object-cover"
                style={{ height: "200px" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: isEnglish ? "20px" : "0",
                  paddingRight: isEnglish ? "0" : "20px",
                }}
              >
                <div style={{ width: "75%", paddingBottom: "30px" }}>
                  <h3 className="text-xl font-semibold text-[rgb(54,153,221)] mt-4 mb-2">
                    Statistical Analysis
                  </h3>
                  <p className="text-[#555] text-sm leading-relaxed">
                    Expert statistical analysis to help you interpret your data
                    and draw accurate conclusions.
                  </p>
                </div>
                <div className="w-8 bg-[#23407F]"></div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-[400px] flex flex-col items-start">
              <img
                src={academicImage}
                alt="Academic Publishing"
                className="w-full object-cover"
                style={{ height: "200px" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: isEnglish ? "20px" : "0",
                  paddingRight: isEnglish ? "0" : "20px",
                }}
              >
                <div style={{ width: "75%", paddingBottom: "30px" }}>
                  <h3 className="text-xl font-semibold text-[rgb(54,153,221)] mt-4 mb-2">
                    Academic Publishing Help
                  </h3>
                  <p className="text-[#555] text-sm leading-relaxed">
                    Guidance through the academic publishing process, increasing
                    your chances of success.
                  </p>
                </div>
                <div className="w-8 bg-[#23407F]"></div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* why join survey ink */}
      <section
        data-aos="fade-up"
        className="w-full max-w-[1550px] mx-auto bg-[#F4F4F4] py-12 px-6 flex flex-col items-center font-[Poppins]"
      >
        <Container>
          {/* Title */}
          <div className="w-full flex justify-center md:justify-start relative text-center md:text-start">
            <div className="relative">
              <img
                src={empoweringTextImage}
                alt="Curvy Overlay"
                className="absolute top-0 w-[50px] h-[40px] z-10 hidden md:block"
                style={{
                  left: isEnglish ? "0" : "unset",
                  right: isEnglish ? "unset" : "0",
                  transform: isEnglish ? "rotate(0deg)" : "rotate(90deg)",
                }}
              />
              <h2 className="text-[32px] font-bold text-[#23407F] leading-tight mb-2 relative z-20">
                Why Join SurveyInk?
              </h2>
            </div>
          </div>

          {/* Cards Container */}
          <div
            className="
              grid 
              grid-cols-1 
              md:grid-cols-2 
              lg:grid-cols-4 
              gap-6 
              lg:justify-between 
              mt-12 
              w-full
              place-items-center
            "
          >
            {/* Card 1 */}
            <div
              className="
                rounded-xl 
                flex flex-col 
                relative h-[370px]
                w-3/4 md:w-full 
                bg-cover bg-center
                overflow-hidden
              "
              style={{ backgroundImage: `url(${backgroundImage2})` }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "white",
                }}
              >
                <img
                  src={languageImage}
                  alt="Survey Hosting"
                  className="h-40 object-contain"
                />
              </div>
              <div style={{ padding: "20px" }}>
                <h3 className="text-[#FEA319] text-lg font-bold">
                  Dual-Language Platform
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Secure and reliable hosting for your surveys, ensuring data
                  integrity and accessibility across the region.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="
                rounded-xl 
                flex flex-col 
                relative h-[370px]
                w-3/4 md:w-full 
                bg-cover bg-center
                overflow-hidden
              "
              style={{ backgroundImage: `url(${backgroundImage2})` }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "white",
                }}
              >
                <img
                  src={paymentImage}
                  alt="Survey Hosting"
                  className="h-40 object-contain"
                />
              </div>
              <div style={{ padding: "20px" }}>
                <h3 className="text-[#FEA319] text-lg font-bold pl-3 pb-3">
                  Fair Compensation
                </h3>
                <p className="text-white text-sm leading-relaxed pl-3 pb-3">
                  Comprehensive assistance with research paper development, from
                  methodology to final presentation.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="
                rounded-xl 
                flex flex-col 
                relative h-[370px]
                w-3/4 md:w-full 
                bg-cover bg-center
                overflow-hidden
              "
              style={{ backgroundImage: `url(${backgroundImage2})` }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "white",
                }}
              >
                <img
                  src={verifyImage}
                  alt="Survey Hosting"
                  className="h-40 object-contain"
                />
              </div>
              <div style={{ padding: "20px" }}>
                <h3 className="text-[#FEA319] text-lg font-bold pl-3 pb-3">
                  Verified Participants
                </h3>
                <p className="text-white text-sm leading-relaxed pl-3 pb-3">
                  Expert statistical analysis to help you interpret your data
                  and draw accurate conclusions.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div
              className="
                rounded-xl 
                flex flex-col 
                relative h-[370px]
                w-3/4 md:w-full 
                bg-cover bg-center
                overflow-hidden
              "
              style={{ backgroundImage: `url(${backgroundImage2})` }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "white",
                }}
              >
                <img
                  src={responseImage}
                  alt="Survey Hosting"
                  className="h-40 object-contain"
                />
              </div>
              <div style={{ padding: "20px" }}>
                <h3 className="text-[#FEA319] text-lg font-bold pl-3 pb-3">
                  One-Time Response Policy
                </h3>
                <p className="text-white text-sm leading-relaxed pl-3 pb-3">
                  Guidance through the academic publishing process, increasing
                  your chances of success.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <GetStarted />
    </main>
  );
}

export default AboutUs;
