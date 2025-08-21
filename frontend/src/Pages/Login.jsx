import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/v1/user/login", {
        email,
        password,
      });

      if (res.data.success) {
        setMessage(res.data.message);
        localStorage.setItem("token", res.data.token);
        window.location.href = "/Deshboard"; // redirect
      } else {
        setMessage(res.data.message || "Invalid credentials ❌");
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Server error ❌");
    }
  };

  return (
    <>
      <style>{`
        .login-page {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100%;
          // background: linear-gradient(135deg, #6a11cb, #2575fc);
          font-family: Arial, sans-serif;
        }

        .login-card {
          background: #fff;
          padding: 25px 20px;
          border-radius: 10px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.2);
          width: 340px;
          text-align: center;
          animation: fadeIn 0.8s ease-in-out;
        }

        .login-card h2 {
          margin-bottom: 15px;
          color: #333;
          font-size: 22px;
        }

        .login-card input {
          width: 300px;
          padding: 10px;
          margin: 6px 0;
          border: 1px solid #ccc;
          border-radius: 6px;
          outline: none;
          font-size: 13px;
          transition: 0.3s;
        }

        .login-card input:focus {
          border-color: #2575fc;
          box-shadow: 0 0 4px rgba(37,117,252,0.4);
        }

        .login-card button {
          width: 100%;
          padding: 10px;
          margin-top: 10px;
          background: #2575fc;
          color: #fff;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 15px;
          transition: background 0.3s ease;
        }

        .login-card button:hover {
          background: #1b5edc;
        }

        .login-footer {
          margin-top: 10px;
          font-size: 13px;
        }

        .login-footer a {
          color: #2575fc;
          text-decoration: none;
        }

        .login-footer a:hover {
          text-decoration: underline;
        }

        .message {
          margin-top: 10px;
          font-size: 14px;
          color: red;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="login-page">
        <div className="login-card">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>

          {message && <div className="message">{message}</div>}

          <div className="login-footer">
            Don’t have an account? <a href="/register">Register</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
