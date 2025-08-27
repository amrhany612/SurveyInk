import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import bgImage from '../../assets/TermsBackground.png';
import bg from '../../assets/B.G.svg';
import TermAndPrivacyImage from '../../assets/Rectangle.png';
import PrivacyImage from '../../assets/privacy_image.png';

import AOS from 'aos';
import 'aos/dist/aos.css';

// Reusable Info Block Component
const InfoBlock = ({ title, description }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '233px 5px 1fr',
      gap: '1.5rem',
      alignItems: 'start',
      marginBottom: '40px',
    }}
  >
    {/* Title */}
    <div
      style={{
        color: '#395692',
        fontSize: '28px',
        fontWeight: '600',
        fontFamily: 'Poppins',
        lineHeight: '1.6',
      }}
    >
      {title}
    </div>

    {/* Orange vertical line */}
    <div
      style={{
        backgroundColor: '#F19303',
        width: '5px',
        height: '100%',
        minHeight: '76px',
      }}
    />

    {/* Description */}
    <p
      style={{
        margin: 0,
        lineHeight: '1.6',
        color: '#000',
        textAlign: 'justify',
        fontSize: '14px',
        fontWeight: 400,
        fontFamily: 'Poppins',
        fontWeight:'400'
      }}
    >
      {description}
    </p>
  </div>
);



function PrivacyAndPoliciy() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const infoBlocks = [
    {
      title: 'Information We Collect',
      description:
        'We collect only the data necessary to deliver our services, including contact details, demographics, account credentials, survey responses, payment information, and technical data to ensure functionality and security.',
    },
    {
      title: 'Legal Process',
      description:
        'We process your personal data based on: your explicit consent for specific activities, performance of our contract with you, our legitimate business interests (service improvement, fraud prevention), and compliance with legal obligations.',
    },
    {
      title: 'Data usage',
      description:
        'Your information is used to provide and maintain our services, process transactions, match you with relevant surveys, communicate updates, analyze usage for improvements, ensure security, prevent fraud, and comply with legal requirements.',
    },
    {
      title: 'Data Sharing',
      description:
        'We do not sell your personal information; we may share data with service providers (under strict confidentiality), researchers (anonymized unless consented), legal authorities (when required), and during business transfers with safeguards.',
    },
        {
      title: 'Data Security',
      description:
        'We implement industry-standard security measures including encryption of data in transit and at rest, secure payment processing systems, access controls and authentication measures, regular security audits and monitoring, and incident response procedures for data breaches.',
    },
        {
      title: 'International Transfers',
      description:
        'Your data may be processed in countries outside your jurisdiction. We ensure appropriate safeguards through standard contractual clauses, adequacy decisions, and other legally recognized transfer mechanisms.',
    },
        {
      title: 'Data Retention',
      description:
        'We retain personal data only as long as necessary for the stated purposes or as required by law. Survey data retention periods are determined by researcher requirements, legal obligations, and legitimate business needs.',
    },
        {
      title: 'Your Rights',
      description:
        'Depending on your jurisdiction, you may have the right to access, correct, delete, or restrict your data, receive it in a portable format, object to processing, and withdraw consent; to exercise these rights, contact us at privacy@surveyink.com.',
    },
        {
      title: 'Cookies and Tracking',
      description:
        'We use cookies and similar technologies to maintain user sessions, analyze platform performance, personalize content, and ensure security. You can manage cookie preferences through your browser settings.',
    },
        {
      title: 'Updates to This Policy',
      description:
        'We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify users of material changes via email or platform notifications. Continued use after changes constitutes acceptance of the updated policy.',
    },
        {
      title: 'Contact Information',
      description:
        'For privacy-related questions or to exercise your rights, contact us at privacy@surveyink.com or our Data Protection Officer at dpo@surveyink.com.',
    },
  ];

  return (
    <main className="privacy-page">
      {/* Header Section */}
      <section
        data-aos="fade-down"
        style={{
          width: '1440px',
          color: '#395692',
          textAlign: 'center',
        }}
      >
        <div style={{ position: 'relative', width: '1550px', height: '532px' }}>
          <div
            style={{
              backgroundImage: `url(${PrivacyImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(5.5px)',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              color: '#fff',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '100px',
            }}
          >
            <h1 style={{ fontSize: '48px', fontWeight: 'bold',marginTop:'400px' }}>
              Privacy & Policy
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section
        data-aos="fade-up"
        style={{
          width: '1550px',
          // height:"",
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundRepeat:'no-repeat',

          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: '#E4E4E4',
            padding: '2.5rem',
            maxWidth: '1000px',
            boxShadow: '0 6px 24px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '16px',
            color: '#333',
            marginTop: '40px',
          }}
        >
          {infoBlocks.map((item, index) => (
            <InfoBlock key={index} title={item.title} description={item.description} />
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        data-aos="fade-up"
        style={{
          width: '1550px',
          height: '334px',
          margin: '0 auto',
          // top:'10rem',
          backgroundImage: `url(${TermAndPrivacyImage})`,
          backgroundSize: 'cover',
          backgroundRepeat:'no-repeat',

          backgroundPosition: 'center',
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
    </main>
  );
}

export default PrivacyAndPoliciy;
