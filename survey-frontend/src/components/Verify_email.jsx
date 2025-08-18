import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const uid = searchParams.get("uid");
    const token = searchParams.get("token");

    if (uid && token) {
      fetch(`http://localhost:8000/api/verify-email/${uid}/${token}/`)
        .then(response => {
          if (!response.ok) throw new Error("Verification failed");
          return response.json();
        })
        .then(() => {
          // Redirect immediately with success message
          navigate('/login?msg=' + encodeURIComponent("Email verified successfully! You can now log in."), { replace: true });
        })
        .catch(() => {
          // Redirect immediately with failure message
          navigate('/login?msg=' + encodeURIComponent("Verification failed. Please try again."), { replace: true });
        });
    } else {
      // Redirect if params are invalid
      navigate('/login?msg=' + encodeURIComponent("Invalid verification link."), { replace: true });
    }
  }, [searchParams, navigate]);

  // Return null because we don't render anything here
return (
  <div style={{ textAlign: "center", marginTop: "2rem" }}>
    <div className="spinner" />
    <p>Verifying your email...</p>
    <style>{`
      .spinner {
        margin: 0 auto 1rem;
        width: 40px;
        height: 40px;
        border: 4px solid #ccc;
        border-top-color: #395692;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);
};

export default VerifyEmail;
