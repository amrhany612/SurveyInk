import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import bgImage from '../../assets/TermsBackground.png';
import bg from '../../assets/B.G.svg';
import TermAndPrivacyImage from '../../assets/Rectangle.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

// ✅ Reusable Info Block Component
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

    <div
      style={{
        backgroundColor: '#F19303',
        width: '5px',
        height: '100%',
        minHeight: '76px',
      }}
    />

    <p
      style={{
        margin: 0,
        lineHeight: '1.6',
        color: '#000',
        textAlign: 'justify',
        fontSize: '14px',
        fontWeight: 400,
        fontFamily: 'Poppins',
      }}
    >
      {description}
    </p>
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
      title: 'Eligibility',
      description:
        'Users must be at least 18 years of age or the age of majority in their jurisdiction. Users are solely responsible for the accuracy and completeness of all information submitted to the Platform.',
    },
    {
      title: 'Account Responsibilities',
      description:
        'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use.',
    },
    {
      title: 'Service Modifications',
      description:
        'Survey Ink reserves the right to modify, suspend, or terminate services at any time, with or without notice, at our sole discretion. We may also update these Terms periodically, and continued use constitutes acceptance of revised Terms.',
    },
    {
      title: 'User Obligations',
      description:
        'Participants must provide honest responses and follow the one-survey-per-person rule unless otherwise approved. Researchers are required to uphold ethical data standards and secure all necessary approvals.',
    },
    {
      title: 'Prohibited Conduct',
      description:
        'Users may not engage in fraudulent activities, violate applicable laws, infringe intellectual property rights, or attempt unauthorized access to the Platform. Users must not collect personal information without proper consent.',
    },
    {
      title: 'Intellectual Property',
      description:
        'Survey Ink retains all rights to the Platform. Users retain ownership of their content but grant us a license to use such content as necessary to provide our services.',
    },
        {
      title: 'Limitation of Liability',
      description:
        'To the maximum extent permitted by law, Survey Ink shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.',
    },
        {
      title: 'Enforcement',
      description:
        'Any misuse or violation of these Terms may result in account suspension, termination, or legal action. These Terms are governed by applicable law, and any disputes shall be resolved in courts of competent jurisdiction.',
    },
  ];

  return (
    <main>
      {/* Header Section */}
      <section
        data-aos="fade-down"
        style={{
          width: '100%',
          color: '#395692',
          textAlign: 'center',
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '532px' }}>
          <div
            style={{
              backgroundImage: `url(${bgImage})`,
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
              padding: '0 100px',
            }}
          >
            <h1 style={{ fontSize: '48px', fontWeight: 'bold' }}>
              Terms & Conditions
            </h1>
          </div>
        </div>
      </section>

      {/* Terms Section */}
      <section
        data-aos="fade-up"
        style={{
          width: '100%',
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          padding: '100px 0',
        }}
      >
        <div
          style={{
            backgroundColor: '#E4E4E4',
            padding: '2.5rem',
            maxWidth: '1000px',
            boxShadow: '0 6px 24px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Poppins, sans-serif',
            marginTop:'-250px'
          }}
        >
          {content.map((item, index) => (
            <InfoBlock
              key={index}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        data-aos="fade-up"
        style={{
          width: '100%',
          height: '334px',
          margin: '0 auto',
          backgroundImage: `url(${TermAndPrivacyImage})`,
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

export default TermsAndConditions;
