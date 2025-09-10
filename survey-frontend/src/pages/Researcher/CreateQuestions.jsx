import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import dashboardBg from "../../assets/dashboardBg.png";

const CreateQuestions = () => {
  const { surveyId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const surveyTitle = location.state?.surveyTitle || "";
  const [language, setLanguage] = useState("en");
  const isRTL = language === "ar";

  const [questions, setQuestions] = useState([
    {
      text: "",
      question_type: "text",
      scale: { minLabel: "Strongly Disagree", maxLabel: "Strongly Agree" },
      choices: [""],
    },
  ]);

  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("access");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const handleSidebarToggle = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    }
  };

  const handleCloseSidebar = () => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
        setSidebarVisible(true);
      } else {
        setSidebarVisible(false);
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    if (field === "question_type") {
      updated[index] = {
        text: "",
        question_type: value,
        scale: { minLabel: "Strongly Disagree", maxLabel: "Strongly Agree" },
        choices: [""],
      };
    } else {
      updated[index][field] = value;
    }
    setQuestions(updated);
  };

  const handleScaleChange = (index, key, value) => {
    const updated = [...questions];
    updated[index].scale[key] = value;
    setQuestions(updated);
  };

  const handleChoiceChange = (qIndex, cIndex, value) => {
    const updated = [...questions];
    updated[qIndex].choices[cIndex] = value;
    setQuestions(updated);
  };

  const addChoice = (index) => {
    const updated = [...questions];
    updated[index].choices.push("");
    setQuestions(updated);
  };

  const removeChoice = (qIndex, cIndex) => {
    const updated = [...questions];
    updated[qIndex].choices.splice(cIndex, 1);
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        question_type: "text",
        scale: { minLabel: "Strongly Disagree", maxLabel: "Strongly Agree" },
        choices: [""],
      },
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length === 1) return;
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = questions.map((q) => {
      const base = {
        text: q.text.trim(),
        question_type: q.question_type,
      };

      if (q.question_type === "scale") {
        return {
          ...base,
          scale_min_label: q.scale?.minLabel?.trim(),
          scale_max_label: q.scale?.maxLabel?.trim(),
          choices: [],
        };
      } else if (q.question_type === "multiple_choice") {
        return {
          ...base,
          choices: q.choices
            .filter((c) => c.trim() !== "")
            .map((c) => ({ text: c.trim() })),
        };
      } else {
        return {
          ...base,
          choices: [],
        };
      }
    });

    const isValid = payload.every((q) => {
      if (!q.text) return false;
      if (q.question_type === "multiple_choice" && q.choices.length === 0)
        return false;
      if (
        q.question_type === "scale" &&
        (!q.scale_min_label || !q.scale_max_label)
      )
        return false;
      return true;
    });

    if (!isValid) {
      alert(
        isRTL
          ? "يرجى ملء جميع الحقول المطلوبة"
          : "Please fill in all required fields"
      );
      return;
    }

    try {
      const token = localStorage.getItem("access");
      await axios.post(
        `https://survey-ink.com/surveys/${surveyId}/questions/bulk_create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(isRTL ? "تم حفظ الأسئلة بنجاح!" : "Questions saved successfully!");
      navigate(`/unpublished-surveys`);
    } catch (error) {
      console.error(error);
      alert(isRTL ? "حدث خطأ أثناء الحفظ" : "Error while saving");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: `url(${dashboardBg})`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
      }}
      dir={isRTL ? "rtl" : "ltr"}
      onClick={handleCloseSidebar}
    >
      {isMobile && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSidebarOpen(!sidebarOpen);
          }}
          style={{
            position: "fixed",
            top: "13px",
            left: isRTL ? "auto" : "90px",
            right: isRTL ? "90px" : "auto",
            zIndex: 1200,
            background: "#395692",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            opacity: "0.7",
          }}
        >
          {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      )}

      {isMobile && sidebarOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1099,
          }}
          onClick={handleCloseSidebar}
        />
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: isMobile ? "fixed" : "relative",
          zIndex: 1100,
          transition: isMobile ? "transform 0.3s ease-in-out" : "none",
          transform:
            isMobile && !sidebarOpen
              ? isRTL
                ? "translateX(100%)"
                : "translateX(-100%)"
              : "translateX(0)",
        }}
      >
        <Sidebar
          isRTL={isRTL}
          sidebarVisible={isMobile ? sidebarOpen : sidebarVisible}
          handleSidebarToggle={handleSidebarToggle}
          handleLogout={handleLogout}
          profileOpen={profileOpen}
          setProfileOpen={setProfileOpen}
          isMobile={isMobile}
        />
      </div>

      <main
        style={{
          flex: 1,
          padding: "1rem",
          overflowY: "auto",
          minHeight: "100vh",
          boxSizing: "border-box",
          marginTop: isMobile ? "80px" : "0",
          transition: "margin 0.3s ease, filter 0.3s ease",
          filter: isMobile && sidebarOpen ? "blur(2px)" : "none",
        }}
      >
        <h2
          style={{
            textAlign: isRTL ? "right" : "left",
            color: "#35508C",
            fontSize: "2rem",
            marginBottom: "2rem",
            fontWeight: "700",
            marginTop: "8px",
          }}
        >
          {isRTL
            ? `أدخل الأسئلة لـ: ${surveyTitle}`
            : `Enter Questions for: ${surveyTitle}`}
        </h2>

        <form onSubmit={handleSubmit}>
          {questions.map((q, idx) => (
            <div
              key={idx}
              style={{
                background: "#A3B6DED4",
                padding: "1.5rem",
                borderRadius: "1rem",
                marginBottom: "2rem",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                position: "relative",
              }}
            >
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(idx)}
                  style={{
                    position: "absolute",
                    top: "10px",
                    [isRTL ? "left" : "right"]: "10px",
                    background: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "28px",
                    height: "28px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  ×
                </button>
              )}

              <label
                style={{
                  color: "#fff",
                  fontSize: "14px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 500,
                }}
              >
                {isRTL ? "نوع السؤال" : "Question Type"}
              </label>
              <select
                value={q.question_type}
                onChange={(e) =>
                  handleQuestionChange(idx, "question_type", e.target.value)
                }
                style={{
                  width: "100%",
                  marginBottom: "1rem",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #ced4da",
                  background: "#D2DBEC",
                  color: "#9A9DA4",
                }}
              >
                <option value="text">{isRTL ? "نص" : "Text"}</option>
                <option value="scale">{isRTL ? "مقياس" : "Scale"}</option>
                <option value="multiple_choice">
                  {isRTL ? "اختيار من متعدد" : "Multiple Choice"}
                </option>
              </select>

              <label
                style={{
                  color: "#fff",
                  fontSize: "14px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 500,
                }}
              >
                {isRTL ? `السؤال ${idx + 1}` : `Question ${idx + 1}`}
              </label>
              <textarea
                value={q.text}
                onChange={(e) =>
                  handleQuestionChange(idx, "text", e.target.value)
                }
                rows={3}
                placeholder={isRTL ? "أدخل نص السؤال" : "Enter question text"}
                style={{
                  width: "100%",
                  marginBottom: "1rem",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #ced4da",
                  resize: "vertical",
                  background: "#D2DBEC",
                }}
              />

              {q.question_type === "scale" && (
                <>
                  <label
                    style={{
                      color: "#fff",
                      fontSize: "14px",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 500,
                    }}
                  >
                    {isRTL ? "أدنى تصنيف" : "Min Label"}
                  </label>
                  <input
                    value={q.scale.minLabel}
                    onChange={(e) =>
                      handleScaleChange(idx, "minLabel", e.target.value)
                    }
                    placeholder={
                      isRTL ? "مثلاً: أرفض بشدة" : "e.g. Strongly Disagree"
                    }
                    style={{
                      width: "100%",
                      marginBottom: "0.5rem",
                      padding: "0.5rem",
                      borderRadius: "0.5rem",
                      border: "1px solid #ced4da",
                      background: "#D2DBEC",
                    }}
                  />
                  <label
                    style={{
                      color: "#fff",
                      fontSize: "14px",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 500,
                    }}
                  >
                    {isRTL ? "أعلى تصنيف" : "Max Label"}
                  </label>
                  <input
                    value={q.scale.maxLabel}
                    onChange={(e) =>
                      handleScaleChange(idx, "maxLabel", e.target.value)
                    }
                    placeholder={
                      isRTL ? "مثلاً: أوافق بشدة" : "e.g. Strongly Agree"
                    }
                    style={{
                      width: "100%",
                      marginBottom: "1rem",
                      padding: "0.5rem",
                      borderRadius: "0.5rem",
                      border: "1px solid #ced4da",
                      background: "#D2DBEC",
                    }}
                  />
                </>
              )}

              {q.question_type === "multiple_choice" &&
                q.choices.map((choice, cidx) => (
                  <div
                    key={cidx}
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                      alignItems: "center",
                    }}
                  >
                    <input
                      value={choice}
                      onChange={(e) =>
                        handleChoiceChange(idx, cidx, e.target.value)
                      }
                      placeholder={isRTL ? "أدخل خياراً" : "Enter choice"}
                      style={{
                        flex: 1,
                        padding: "0.5rem",
                        borderRadius: "0.5rem",
                        border: "1px solid #ced4da",
                        background: "#D2DBEC",
                      }}
                    />
                    {cidx === q.choices.length - 1 && (
                      <button
                        type="button"
                        onClick={() => addChoice(idx)}
                        style={{
                          fontSize: "1.2rem",
                          background: "#28a745",
                          color: "#fff",
                          border: "none",
                          borderRadius: "50%",
                          width: "28px",
                          height: "28px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        ＋
                      </button>
                    )}
                    {q.choices.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeChoice(idx, cidx)}
                        style={{
                          fontSize: "1.2rem",
                          background: "#dc3545",
                          color: "#fff",
                          border: "none",
                          borderRadius: "50%",
                          width: "28px",
                          height: "28px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        －
                      </button>
                    )}
                  </div>
                ))}
            </div>
          ))}

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={addQuestion}
              style={{
                background: "#395692",
                color: "#fff",
                border: "none",
                padding: "0.7rem 1.5rem",
                borderRadius: "0.6rem",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {isRTL ? "أضف سؤالاً" : "Add Question"}
            </button>

            <button
              type="submit"
              style={{
                background: "#F19303",
                color: "#fff",
                border: "none",
                padding: "0.7rem 1.5rem",
                borderRadius: "0.6rem",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {isRTL ? "حفظ الأسئلة" : "Save Questions"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateQuestions;
