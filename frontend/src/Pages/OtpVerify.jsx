import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OtpVerify = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/api/v1/user/verifyOTP", {
        email,
        otp,
      });

      if (res.data.success) {
        alert("✅ OTP Verified Successfully!");
        // Redirect to Register page with email
        navigate("/register", { state: { email } });
      } else {
        alert(res.data.message || "❌ Invalid OTP");
      }
    } catch (error) {
      console.error("OTP Verify Error:", error);
      alert("⚠️ Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .otpverify-page {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-family: Arial, sans-serif;
        }
        .otpverify-card {
          background: #fff;
          padding: 25px 20px;
          border-radius: 10px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.2);
          width: 320px;
          text-align: center;
        }
        .otpverify-card h2 {
          margin-bottom: 15px;
          color: #333;
        }
        .otpverify-card input {
          width: 92%;
          padding: 10px;
          margin: 8px 0;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
          outline: none;
        }
        .otpverify-card button {
          width: 100%;
          padding: 10px;
          margin-top: 10px;
          background: #2575fc;
          color: #fff;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 15px;
        }
        .otpverify-card button:hover {
          background: #1b5edc;
        }
      `}</style>

      <div className="otpverify-page">
        <div className="otpverify-card">
          <h2>Verify OTP</h2>
          <form onSubmit={handleVerify}>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OtpVerify;
