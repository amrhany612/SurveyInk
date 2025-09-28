import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import bgImage from "../../assets/TermsBackground.png";
import bg from "../../assets/B.G.svg";
import TermAndPrivacyImage from "../../assets/Rectangle.png";
import AOS from "aos";
import "aos/dist/aos.css";
import Container from "../../components/Container";
import GetStarted from "../../components/GetStarted";
import {
  FaUserCheck,
  FaUserShield,
  FaTools,
  FaClipboard,
  FaBan,
  FaBook,
  FaExclamationTriangle,
  FaGavel,
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

function TermsAndConditions() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const content = [
    {
      title: "Eligibility",
      icon: <FaUserCheck />,
      description: [
        "Users must be at least 18 years old or of legal age in their area.",
        "They are responsible for providing accurate information.",
        "All submitted info must be complete and truthful.",
        "Users are accountable for their own data on the Platform.",
      ],
    },
    {
      title: "Account Responsibilities",
      icon: <FaUserShield />,
      description: [
        "You must keep your account credentials confidential.",
        "You are responsible for all activities on your account.",
        "Notify us immediately if there is unauthorized use.",
        "Ensure your account is secure at all times.",
      ],
    },
    {
      title: "Service Modifications",
      icon: <FaTools />,
      description: [
        "Survey Ink may modify, suspend, or terminate services anytime.",
        "Notice may or may not be provided.",
        "We can update Terms periodically.",
        "Continued use means you accept the revised Terms.",
      ],
    },
    {
      title: "User Obligations",
      icon: <FaClipboard />,
      description: [
        "Participants must answer surveys honestly.",
        "Follow the one-survey-per-person rule unless approved.",
        "Researchers must maintain ethical standards.",
        "Secure all necessary approvals for data collection.",
      ],
    },
    {
      title: "Prohibited Conduct",
      icon: <FaBan />,
      description: [
        "Users cannot engage in fraud or illegal activities.",
        "Do not infringe on intellectual property rights.",
        "Unauthorized access to the Platform is forbidden.",
        "Personal data cannot be collected without consent.",
      ],
    },
    {
      title: "Intellectual Property",
      icon: <FaBook />,
      description: [
        "Survey Ink owns all rights to the Platform.",
        "Users retain ownership of their own content.",
        "We are granted a license to use user content.",
        "This license is necessary to provide our services.",
      ],
    },
    {
      title: "Limitation of Liability",
      icon: <FaExclamationTriangle />,
      description: [
        "Survey Ink is not liable for indirect or incidental damages.",
        "Consequential damages from platform use are excluded.",
        "Liability is limited to the maximum extent allowed by law.",
        "Users accept this limitation when using the Platform.",
      ],
    },
    {
      title: "Enforcement",
      icon: <FaGavel />,
      description: [
        "Misuse of the Platform may lead to suspension or termination.",
        "Legal action may be taken for violations.",
        "These Terms are governed by applicable law.",
        "Disputes will be resolved in competent courts.",
      ],
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

export default TermsAndConditions;
