import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    phone: "",
    age: "",
    gender: "",
  });
  const [userimage, setUserImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setUserImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    if (userimage) {
      data.append("userimage", userimage);
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/ragister",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Registration successful ✅");
        setTimeout(() => navigate("/login"), 1500); // redirect after 1.5 sec
      } else {
        toast.error(res.data.message || "Registration failed ❌");
      }
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Something went wrong ❌");
    }
  };

  return (
    <>
      <style>{`
        .register-page {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-family: Arial, sans-serif;
        }
        .register-card {
          background: #fff;
          padding: 25px 20px;
          border-radius: 10px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.2);
          width: 340px;
          text-align: center;
          animation: fadeIn 0.8s ease-in-out;
        }
        .register-card h2 { margin-bottom: 15px; color: #333; font-size: 22px; }
        .register-card input {
          width: 300px;
          padding: 10px;
          margin: 6px 0;
          border: 1px solid #ccc;
          border-radius: 6px;
          outline: none;
          font-size: 13px;
        }
        .register-card button {
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
        .register-footer {
          margin-top: 10px;
          font-size: 14px;
        }
      `}</style>

      <div className="register-page">
        <div className="register-card">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <input type="password" name="confirmpassword" placeholder="Confirm Password" value={formData.confirmpassword} onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
            <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
            <input type="text" name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} required />
            <input type="file" name="userimage" onChange={handleFileChange} accept="image/*" />
            <button type="submit">Register</button>
          </form>

          <div className="register-footer">
            Already have an account? <a href="/login">Login</a>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default Register;
