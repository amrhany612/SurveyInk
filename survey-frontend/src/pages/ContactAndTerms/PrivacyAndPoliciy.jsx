import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import bgImage from "../../assets/TermsBackground.png";
import bg from "../../assets/B.G.svg";
import TermAndPrivacyImage from "../../assets/Rectangle.png";
import PrivacyImage from "../../assets/privacy_image.png";

import AOS from "aos";
import "aos/dist/aos.css";
import Container from "../../components/Container";
import GetStarted from "../../components/GetStarted";
import {
  FaClipboardList,
  FaBalanceScale,
  FaCogs,
  FaHandshake,
  FaLock,
  FaGlobe,
  FaHourglassHalf,
  FaUserEdit,
  FaCookieBite,
  FaSyncAlt,
  FaEnvelope,
} from "react-icons/fa";

const InfoBlock = ({ title, icon, description, isLast }) => (
  <div
    className="
      grid lg:grid-cols-[233px_5px_1fr] gap-6 items-center mb-10
      w-full text-center lg:text-left
    "
  >
    <div className="text-[#395692] text-2xl font-semibold leading-relaxed flex items-center text-left lg:pl-12 relative">
      <span>{title}</span>
      <span className="hidden lg:inline absolute text-3xl -left-[5px] animate-slightScale">
        {icon}
      </span>

      <style>
        {`
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    @keyframes slightScale {
      0%   { transform: scale(1); }
      25%  { transform: scale(1.1); }
      50%  { transform: scale(0.9); }
      75%  { transform: scale(1.1); }
      100% { transform: scale(1); }
    }

    .animate-slightScale {
      animation: slightScale 3s infinite;
    }
  `}
      </style>
    </div>

    <div className="hidden lg:block bg-[#F19303] w-[5px] min-h-[100px]" />

    <ul className="hidden md:block text-md font-bold text-black leading-relaxed list-disc list-inside text-left">
      {description.map((point, i) => (
        <li key={i}>{point}</li>
      ))}
    </ul>

    <div className="md:hidden w-full text-md font-bold text-black leading-relaxed text-left">
      {description.map((point, i) => (
        <div
          key={i}
          className={`py-2 ${
            i !== description.length - 1 ? "border-b border-gray-500" : ""
          }`}
        >
          {point}
        </div>
      ))}
    </div>

    {!isLast && (
      <div className="lg:hidden w-full h-[3px] bg-[#F19303] my-4"></div>
    )}
  </div>
);

function PrivacyAndPoliciy() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const content = [
    {
      title: "Information We Collect",
      icon: <FaClipboardList />,
      description: [
        "We collect only necessary data to deliver our services.",
        "This includes contact details, demographics, and account credentials.",
        "We may also collect survey responses and payment information.",
        "Technical data is gathered to ensure functionality and security.",
      ],
    },
    {
      title: "Legal Process",
      icon: <FaBalanceScale />,
      description: [
        "We process personal data with your explicit consent for specific activities.",
        "Some processing is necessary to perform our contract with you.",
        "We rely on legitimate interests like improving services and preventing fraud.",
        "We also comply with applicable legal obligations.",
      ],
    },
    {
      title: "Data Usage",
      icon: <FaCogs />,
      description: [
        "Provide and maintain our services and process transactions.",
        "Match you with relevant surveys and communicate updates.",
        "Analyze usage to improve performance and ensure security.",
        "Prevent fraud and comply with legal requirements.",
      ],
    },
    {
      title: "Data Sharing",
      icon: <FaHandshake />,
      description: [
        "We do not sell your personal information.",
        "Data may be shared with authorities or business transfers under safeguards.",
        "Researchers may access anonymized data unless consent is given.",
        "Legal authorities or business transfers may require data sharing with safeguards.",
      ],
    },
    {
      title: "Data Security",
      icon: <FaLock />,
      description: [
        "We use encryption for data in transit and at rest.",
        "Payments are processed through secure systems.",
        "Access controls and authentication measures are in place.",
        "Regular audits, monitoring, and breach response procedures are applied.",
      ],
    },
    {
      title: "International Transfers",
      icon: <FaGlobe />,
      description: [
        "Your data may be processed outside your jurisdiction.",
        "We ensure safeguards with standard contractual clauses.",
        "Adequacy decisions may also provide protection.",
        "Other legally recognized transfer mechanisms are applied.",
      ],
    },
    {
      title: "Data Retention",
      icon: <FaHourglassHalf />,
      description: [
        "We retain data only as long as necessary for the stated purposes.",
        "Survey data retention depends on researcher requirements.",
        "Legal obligations may extend retention periods.",
        "Legitimate business needs are also considered.",
      ],
    },
    {
      title: "Your Rights",
      icon: <FaUserEdit />,
      description: [
        "You may have rights to access, correct, delete, or restrict data.",
        "You can request your data in a portable format.",
        "You may object to processing or withdraw consent.",
        "To exercise rights, contact us at privacy@surveyink.com.",
      ],
    },
    {
      title: "Cookies and Tracking",
      icon: <FaCookieBite />,
      description: [
        "We use cookies and similar technologies to maintain user sessions.",
        "Cookies help analyze platform performance.",
        "They allow personalization of content.",
        "They ensure security, with preferences managed in browser settings.",
      ],
    },
    {
      title: "Updates to This Policy",
      icon: <FaSyncAlt />,
      description: [
        "We may update this Privacy Policy periodically.",
        "Changes may reflect new practices or legal requirements.",
        "Material changes will be notified via email or platform.",
        "Continued use means acceptance of the updated policy.",
      ],
    },
    {
      title: "Contact Information",
      icon: <FaEnvelope />,
      description: [
        "For privacy-related questions, contact privacy@surveyink.com.",
        "You may also reach our Data Protection Officer.",
        "The DPO is available at dpo@surveyink.com.",
        "We will respond to requests in line with legal requirements.",
      ],
    },
  ];

  return (
    <main className="privacy-page">
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
            backgroundImage: `url(${PrivacyImage})`,
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
            Privacy & Policy
          </h1>
        </div>
      </section>

      <section
        data-aos="fade-up"
        className="w-full flex justify-center py-[100px] bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <Container>
          <div
            className="
            bg-[#E4E4E4] shadow-lg font-[Poppins] 
              p-10 
              md:mt-[-300px] 
              w-[100%] lg:w-full mx-auto
            "
          >
            <div>
              {content.map((item, index) => (
                <InfoBlock
                  key={index}
                  title={item.title}
                  icon={item.icon}
                  description={item.description}
                  isLast={index === content.length - 1}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <GetStarted />
    </main>
  );
}

export default PrivacyAndPoliciy;
