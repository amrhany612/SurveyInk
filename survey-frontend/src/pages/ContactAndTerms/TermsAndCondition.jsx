import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import bgImage from "../../assets/TermsBackground.png";
import bg from "../../assets/B.G.svg";
import TermAndPrivacyImage from "../../assets/Rectangle.png";
import AOS from "aos";
import "aos/dist/aos.css";
import Container from "../../components/Container";
import GetStarted from "../../components/GetStarted";

// ✅ Reusable Info Block Component
const InfoBlock = ({ title, description, isLast }) => (
  <div
    className="
      grid lg:grid-cols-[233px_5px_1fr] gap-6 items-start mb-10
      w-full text-center lg:text-left
    "
  >
    <div className="text-[#395692] text-2xl font-semibold leading-relaxed">
      {title}
    </div>
    <div
      className="
        hidden lg:block bg-[#F19303] w-[5px] min-h-[76px]
      "
    />
    <p className="text-sm font-normal text-black leading-relaxed text-justify">
      {description}
    </p>
    {!isLast && (
      <div className="lg:hidden w-full h-[3px] bg-[#F19303] my-4"></div>
    )}
  </div>
);

function TermsAndConditions() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // ✅ All terms content here
  const content = [
    {
      title: "Eligibility",
      description:
        "Users must be at least 18 years of age or the age of majority in their jurisdiction. Users are solely responsible for the accuracy and completeness of all information submitted to the Platform.",
    },
    {
      title: "Account Responsibilities",
      description:
        "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use.",
    },
    {
      title: "Service Modifications",
      description:
        "Survey Ink reserves the right to modify, suspend, or terminate services at any time, with or without notice, at our sole discretion. We may also update these Terms periodically, and continued use constitutes acceptance of revised Terms.",
    },
    {
      title: "User Obligations",
      description:
        "Participants must provide honest responses and follow the one-survey-per-person rule unless otherwise approved. Researchers are required to uphold ethical data standards and secure all necessary approvals.",
    },
    {
      title: "Prohibited Conduct",
      description:
        "Users may not engage in fraudulent activities, violate applicable laws, infringe intellectual property rights, or attempt unauthorized access to the Platform. Users must not collect personal information without proper consent.",
    },
    {
      title: "Intellectual Property",
      description:
        "Survey Ink retains all rights to the Platform. Users retain ownership of their content but grant us a license to use such content as necessary to provide our services.",
    },
    {
      title: "Limitation of Liability",
      description:
        "To the maximum extent permitted by law, Survey Ink shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.",
    },
    {
      title: "Enforcement",
      description:
        "Any misuse or violation of these Terms may result in account suspension, termination, or legal action. These Terms are governed by applicable law, and any disputes shall be resolved in courts of competent jurisdiction.",
    },
  ];

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
          marginBottom: "5px",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
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
          <h1
            style={{
              margin: "auto",
              fontWeight: "bold",
              width: "90%",
            }}
            className="text-3xl sm:text-5xl"
          >
            Terms & Conditions
          </h1>
        </div>
      </section>

      {/* Terms Section */}
      <section
        data-aos="fade-up"
        className="w-full flex justify-center py-[100px] bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <Container>
          <div
            className="
            bg-[#E4E4E4] shadow-lg font-[Poppins] 
              max-w-[1000px] p-10 
              md:mt-[-300px] 
              w-[90%] lg:w-full mx-auto
            "
          >
            {content.map((item, index) => (
              <InfoBlock
                key={index}
                title={item.title}
                description={item.description}
                isLast={index === content.length - 1}
              />
            ))}
          </div>
        </Container>
      </section>

      <GetStarted />
    </main>
  );
}

export default TermsAndConditions;
