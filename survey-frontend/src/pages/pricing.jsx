import React, { useEffect } from "react";
import bgImage from "../assets/about_us_image.jpg";
import sectioBackground2 from "../assets/B.G.png";
import AOS from "aos";
import "aos/dist/aos.css";
import Container from "../components/Container";
import empoweringImage from "../assets/empowering.png";

function Pricing() {
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
          }}
          className="mt-8 lg:mt-64"
        >
          <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>
            select your package
          </h1>
        </div>
      </section>

      <div className="relative font-bold">
        <div className="container mx-auto absolute z-[10] left-1/2 -translate-x-1/2 -top-[120px] lg:-top-[200px]">
          <div
            className="grid grid-cols-1 lg:grid-cols-4"
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
          >
            <div className="flex flex-col items-center mb-12 lg:mb-0">
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #C1DEE8 0%, #C1DEE8 50%, rgba(255, 255, 255, 0.9) 100%)",
                  borderRadius: "15px",
                  border: "1px solid #FEA319",
                }}
                className="p-6 pt-12 pb-12 flex flex-col items-center w-full sm:w-1/2 lg:w-5/6 mb-4 lg:mb-12"
              >
                <div className="w-32 h-10 bg-[#395692] rounded-lg flex items-center justify-center mb-1">
                  <span className="text-2xl font-bold text-[#FEA319]">100</span>
                </div>
                <h3 className="text-[12px] text-[#395692] mb-14">surveys</h3>
                <div className="text-3xl font-bold text-[#FEA319]">1000</div>
                <div className="text-lg text-[#395692] font-bold">EGP</div>
              </div>
              <div
                style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                className="py-3 px-4 w-full sm:w-1/2 lg:w-full text-center text-[14px]"
              >
                <span>INCLUDES:</span>
              </div>
              <div className="p-4 flex-grow">
                <p className="text-[12px] leading-relaxed text-center w-56">
                  Create and publish surveys easily with essential tools to get
                  started right away.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center mb-12 lg:mb-0">
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #C1DEE8 0%, #C1DEE8 50%, rgba(255, 255, 255, 0.9) 100%)",
                  borderRadius: "15px",
                  border: "1px solid #FEA319",
                }}
                className="p-6 pt-12 pb-12 flex flex-col items-center w-full sm:w-1/2 lg:w-5/6 mb-4 lg:mb-12"
              >
                <div className="w-32 h-10 bg-[#395692] rounded-lg flex items-center justify-center mb-1">
                  <span className="text-2xl font-bold text-[#FEA319]">200</span>
                </div>
                <h3 className="text-[12px] text-[#395692] mb-14">surveys</h3>
                <div className="text-3xl font-bold text-[#FEA319]">1800</div>
                <div className="text-lg text-[#395692] font-bold">EGP</div>
              </div>
              <div
                style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                className="py-3 px-4 w-full sm:w-1/2 lg:w-full text-center text-[14px]"
              >
                <span>INCLUDES:</span>
              </div>
              <div className="p-4 flex-grow">
                <p className="text-[12px] leading-relaxed text-center w-56">
                  Secure and reliable hosting for your surveys, ensuring data
                  integrity and accessibility across the region.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center mb-12 lg:mb-0">
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #C1DEE8 0%, #C1DEE8 50%, rgba(255, 255, 255, 0.9) 100%)",
                  borderRadius: "15px",
                  border: "1px solid #FEA319",
                }}
                className="p-6 pt-12 pb-12 flex flex-col items-center w-full sm:w-1/2 lg:w-5/6 mb-4 lg:mb-12"
              >
                <div className="w-32 h-10 bg-[#395692] rounded-lg flex items-center justify-center mb-1">
                  <span className="text-2xl font-bold text-[#FEA319]">300</span>
                </div>
                <h3 className="text-[12px] text-[#395692] mb-14">surveys</h3>
                <div className="text-3xl font-bold text-[#FEA319]">2500</div>
                <div className="text-lg text-[#395692] font-bold">EGP</div>
              </div>
              <div
                style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                className="py-3 px-4 w-full sm:w-1/2 lg:w-full text-center text-[14px]"
              >
                <span>INCLUDES:</span>
              </div>
              <div className="p-4 flex-grow">
                <p className="text-[12px] leading-relaxed text-center w-56">
                  Advanced analytics and integrations to help you gather deeper
                  insights and streamline your workflow.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center mb-12 lg:mb-0">
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #C1DEE8 0%, #C1DEE8 50%, rgba(255, 255, 255, 0.9) 100%)",
                  borderRadius: "15px",
                  border: "1px solid #FEA319",
                }}
                className="p-6 pt-12 pb-12 flex flex-col items-center w-full sm:w-1/2 lg:w-5/6 mb-4 lg:mb-12"
              >
                <div className="w-32 h-10 bg-[#395692] rounded-lg flex items-center justify-center mb-1">
                  <span className="text-2xl font-bold text-[#FEA319]">
                    +500
                  </span>
                </div>
                <h3 className="text-[12px] text-[#395692] mb-14">surveys</h3>
                <div className="text-3xl font-bold text-[#FEA319]">4000</div>
                <div className="text-lg text-[#395692] font-bold">EGP</div>
              </div>
              <div
                style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                className="py-3 px-4 w-full sm:w-1/2 lg:w-full text-center text-[14px]"
              >
                <span>INCLUDES:</span>
              </div>
              <div className="p-4 flex-grow">
                <p className="text-[12px] leading-relaxed text-center w-56">
                  Dedicated support and enterprise-grade features tailored for
                  large-scale research and organizational needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
        className="h-[114rem] lg:h-[18rem]"
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

      <Container>
        <section style={{ width: "80%", zIndex: "20" }} className="m-auto">
          <div
            className="
              flex flex-col lg:flex-row 
              items-center 
              justify-between 
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
    </main>
  );
}

export default Pricing;
