import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Call backend API
      const res = await axios.post("http://localhost:8000/api/v1/user/sendmail", {
        email,
      });

      if (res.data.success) {
        // ✅ Redirect to VerifyOtp page with email
        navigate("/otpverify", { state: { email } });
      } else {
        alert("❌ Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .otp-page {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-family: Arial, sans-serif;
        }
        .otp-card {
          background: #fff;
          padding: 25px 20px;
          border-radius: 10px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.2);
          width: 320px;
          text-align: center;
        }
        .otp-card h2 {
          margin-bottom: 15px;
          color: #333;
        }
        .otp-card input {
          width: 92%;
          padding: 10px;
          margin: 8px 0;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
          outline: none;
        }
        .otp-card button {
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
        .otp-card button:hover {
          background: #1b5edc;
        }
      `}</style>

      <div className="otp-page">
        <div className="otp-card">
          <h2>Send OTP</h2>
          <form onSubmit={handleSendOtp}>
            <input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Otp;
