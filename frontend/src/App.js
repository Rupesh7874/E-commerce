import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import OtpPage from "./Pages/OtpPage";  
import OtpVerify from "./Pages/OtpVerify";  
import Deshboard from "./Pages/Dashboard";  

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
         <Route path="/otp" element={<OtpPage />} />
         <Route path="/otpverify" element={<OtpVerify />} />
         <Route path="/Deshboard" element={<Deshboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
