import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../axiosConfig";
import dashboardBg from "../../assets/dashboardBg.png";

function SolvedSurveyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isRTL, setIsRTL] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchSolvedSurvey = async () => {
      try {
        const token = localStorage.getItem("access");
        const res = await api.get(`surveys/solved/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const answerMap = {};
        res.data.answers.forEach((a) => {
          answerMap[a.question.id] = a.answer_text;
        });
        setSurvey(res.data.survey);
        setAnswers(answerMap);
        setIsRTL(res.data.survey.language === "ar");
      } catch (err) {
        console.error("Error fetching solved survey:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSolvedSurvey();
  }, [id]);

  if (loading) return <p>{isRTL ? "جار التحميل..." : "Loading..."}</p>;
  if (!survey || !survey.questions)
    return <p>{isRTL ? "لم يتم العثور على الاستبيان" : "Survey not found"}</p>;

  return (
    <div
      style={{
        direction: isRTL ? "rtl" : "ltr",
        background: `url(${dashboardBg})`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: 700,
          backgroundColor: "#A3B6DED4",
          borderRadius: 12,
          padding: "2rem",
          margin: "0 auto",
          color: "white",
        }}
      >
        <h2 style={{ color: "#35508C" }}>
          {"Survey Title: "}
          {survey.title}
        </h2>
        <p style={{ color: "#35508C", marginBottom: "15px" }}>
          {"Survey Description: "}
          {survey.description}
        </p>

        <form>
          {survey.questions.map((q, i) => (
            <div
              key={q.id}
              style={{
                backgroundColor: "white",
                color: "black",
                padding: 12,
                borderRadius: 8,
                marginBottom: 20,
              }}
            >
              <label>
                {i + 1}. {q.text}
              </label>

              {q.question_type === "multiple_choice" &&
                q.choices.map((opt) => {
                  const isChecked = answers[q.id] === opt.text;

                  return (
                    <div
                      key={opt.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "6px 0",
                        padding: "6px 12px",
                        borderRadius: 6,
                        backgroundColor: isChecked ? "#F19303" : "transparent",
                        cursor: "not-allowed",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          border: `2px solid ${isChecked ? "#F19303" : "#aaa"}`,
                          backgroundColor: isChecked ? "#F19303" : "#eee",
                          marginRight: 10,
                        }}
                      ></div>
                      <span style={{ fontSize: 16 }}>
                        {opt.text}
                        {"ki"}
                      </span>
                    </div>
                  );
                })}

              {q.question_type === "text" && (
                <input
                  type="text"
                  value={answers[q.id] || ""}
                  style={{ width: "97%", padding: 8 }}
                  readOnly
                  disabled
                />
              )}

              {q.question_type === "scale" && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{q.scale_min_label || "1"}</span>
                  {[1, 2, 3, 4, 5].map((val) => {
                    const isChecked = answers[q.id] === String(val);

                    return (
                      <label
                        key={val}
                        style={{
                          padding: "6px 10px",
                          margin: "0 4px",
                          borderRadius: 6,
                          backgroundColor: isChecked
                            ? "#F19303"
                            : "transparent",
                          cursor: "not-allowed",
                        }}
                      >
                        <input
                          type="radio"
                          name={`q_${q.id}`}
                          value={val}
                          checked={isChecked}
                          readOnly
                          disabled
                          style={{ marginRight: 4 }}
                        />
                        {val}
                      </label>
                    );
                  })}
                  <span>{q.scale_max_label || "5"}</span>
                </div>
              )}
            </div>
          ))}

          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              style={{
                padding: "0.75rem 2rem",
                backgroundColor: "#F19303",
                color: "white",
                border: "none",
                borderRadius: 8,
                fontWeight: "bold",
              }}
            >
              {isRTL ? "عودة" : "Back"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SolvedSurveyForm;
