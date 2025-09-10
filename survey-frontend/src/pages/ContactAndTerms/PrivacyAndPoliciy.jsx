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

// Reusable Info Block Component
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

function PrivacyAndPoliciy() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const content = [
    {
      title: "Information We Collect",
      description:
        "We collect only the data necessary to deliver our services, including contact details, demographics, account credentials, survey responses, payment information, and technical data to ensure functionality and security.",
    },
    {
      title: "Legal Process",
      description:
        "We process your personal data based on: your explicit consent for specific activities, performance of our contract with you, our legitimate business interests (service improvement, fraud prevention), and compliance with legal obligations.",
    },
    {
      title: "Data usage",
      description:
        "Your information is used to provide and maintain our services, process transactions, match you with relevant surveys, communicate updates, analyze usage for improvements, ensure security, prevent fraud, and comply with legal requirements.",
    },
    {
      title: "Data Sharing",
      description:
        "We do not sell your personal information; we may share data with service providers (under strict confidentiality), researchers (anonymized unless consented), legal authorities (when required), and during business transfers with safeguards.",
    },
    {
      title: "Data Security",
      description:
        "We implement industry-standard security measures including encryption of data in transit and at rest, secure payment processing systems, access controls and authentication measures, regular security audits and monitoring, and incident response procedures for data breaches.",
    },
    {
      title: "International Transfers",
      description:
        "Your data may be processed in countries outside your jurisdiction. We ensure appropriate safeguards through standard contractual clauses, adequacy decisions, and other legally recognized transfer mechanisms.",
    },
    {
      title: "Data Retention",
      description:
        "We retain personal data only as long as necessary for the stated purposes or as required by law. Survey data retention periods are determined by researcher requirements, legal obligations, and legitimate business needs.",
    },
    {
      title: "Your Rights",
      description:
        "Depending on your jurisdiction, you may have the right to access, correct, delete, or restrict your data, receive it in a portable format, object to processing, and withdraw consent; to exercise these rights, contact us at privacy@surveyink.com.",
    },
    {
      title: "Cookies and Tracking",
      description:
        "We use cookies and similar technologies to maintain user sessions, analyze platform performance, personalize content, and ensure security. You can manage cookie preferences through your browser settings.",
    },
    {
      title: "Updates to This Policy",
      description:
        "We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify users of material changes via email or platform notifications. Continued use after changes constitutes acceptance of the updated policy.",
    },
    {
      title: "Contact Information",
      description:
        "For privacy-related questions or to exercise your rights, contact us at privacy@surveyink.com or our Data Protection Officer at dpo@surveyink.com.",
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

export default PrivacyAndPoliciy;
