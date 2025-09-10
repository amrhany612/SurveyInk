import { useTranslation } from "react-i18next";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import logo from "../assets/HomeLogo.png";
import Container from "./Container";
import mobile from "../assets/mobile.png";
import mobile2 from "../assets/mobile2.png";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative pt-10 pb-14 sm:px-28 bg-gradient-to-r from-[#d2edf6] to-[#f5dfc4] font-poppins">
      <Container>
        {/* Top Section */}
        <div
          className="
            flex flex-col text-center gap-8 
            sm:flex-row sm:justify-between sm:items-start sm:text-left
          "
        >
          {[
            {
              title: "About",
              links: ["Contact Us", "Terms and condition", "Privacy Policy"],
              hrefs: ["/contact", "/terms", "/privacy"],
            },
            {
              title: "Product",
              links: ["Pricing", "Testimonials"],
              hrefs: ["/pricing", "/testimonials"],
            },
            {
              title: "Discover",
              links: ["Teams", "Partners", "Career"],
              hrefs: ["/teams", "/partners", "/career"],
            },
            {
              title: "Follow us",
              links: [],
              social: true,
            },
          ].map((col, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-2 items-start w-1/2 sm:w-fit"
            >
              <h4 className="font-bold text-[#1a1a1a]">{col.title}</h4>
              {col.social ? (
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com/surveyink"
                    className="text-[#23407F] text-xl"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://facebook.com/surveyink"
                    className="text-[#23407F] text-xl"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="https://linkedin.com/company/surveyink"
                    className="text-[#23407F] text-xl"
                  >
                    <FaLinkedinIn />
                  </a>
                </div>
              ) : (
                col.links.map((link, i) => (
                  <a
                    key={i}
                    href={col.hrefs[i]}
                    className="text-[#1a1a1a] text-[15px] no-underline"
                  >
                    {link}
                  </a>
                ))
              )}
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-10 flex sm:justify-center items-center gap-2 flex-wrap">
          <img src={logo} alt="SurveyINK Logo" className="h-7 object-contain" />
          <p className="text-sm text-[#555]">
            &copy; 2025 – All Rights Reserved surveyink
          </p>
        </div>
      </Container>
      <div>
        <img
          src={localStorage.getItem("i18nextLng") === "ar" ? mobile2 : mobile}
          alt="mobile"
          className={`absolute ${
            localStorage.getItem("i18nextLng") === "ar" ? "left-6" : "right-6"
          } bottom-48 block sm:hidden w-48 h-64`}
          style={{
            animation: "float 2s ease-in-out infinite",
          }}
        />
      </div>

      <style>
        {`
  @keyframes float {
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
  }
`}
      </style>
    </footer>
  );
}

export default Footer;
