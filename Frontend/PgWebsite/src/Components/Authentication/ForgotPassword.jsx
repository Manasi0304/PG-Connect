import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './Login.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Step 1: Send OTP to Email
  const sendOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/forgot-password/send-otp", { email });
      toast.success(res.data.message);
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Error sending OTP");
    }
  };

  // Step 2: Verify OTP & Reset Password
  const resetPassword = async () => {
    try {
      const res = await axios.post("http://localhost:5000/forgot-password/reset", {
        email,
        otp,
        newPassword
      });
      toast.success(res.data.message);
      navigate("/login"); // Redirect to login after reset
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Password reset failed");
    }
  };

  return (
    <section className="forgotPasswordForm">
      <div className="formDiv">
        <h2>Forgot Password</h2>

        {step === 1 ? (
          <>
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button onClick={sendOtp} className="btn2">Send OTP</button>
          </>
        ) : (
          <>
            <div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button onClick={resetPassword} className="btn2">Reset Password</button>
          </>
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;
