import React, { useState } from "react";
import { FaUnlockAlt, FaUser } from "react-icons/fa";
import { MdEmail, MdSms } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Register.css';

const Register = () => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await axios.post("http://localhost:5000/register/send-otp", {
        firstName, lastName, email, password,
      });
      toast.success(res.data.alert);
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.alert || "❌ Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await axios.post("http://localhost:5000/register/verify-otp", {
        email, otp,
      });
      toast.success(res.data.alert);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.alert || "❌ OTP verification failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="login-page register-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>{step === 1 ? "Create Account" : "Verify Email"}</h2>
            <p className="login-subtitle">
              {step === 1 
                ? "Join us to get started" 
                : "Enter the OTP sent to your email"}
            </p>
          </div>
          
          {step === 1 ? (
            <form onSubmit={sendOtp} className="login-form register-form">
              <div className="login-input-group">
                <label htmlFor="firstName">First Name</label>
                <div className="login-input-field">
                  <FaUser className="login-icon" />
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="login-input-group">
                <label htmlFor="lastName">Last Name</label>
                <div className="login-input-field">
                  <FaUser className="login-icon" />
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="login-input-group">
                <label htmlFor="regEmail">Email Address</label>
                <div className="login-input-field">
                  <MdEmail className="login-icon" />
                  <input
                    id="regEmail"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="login-input-group">
                <label htmlFor="regPassword">Password</label>
                <div className="login-input-field">
                  <FaUnlockAlt className="login-icon" />
                  <input
                    id="regPassword"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? "Sending OTP..." : "Continue"}
              </button>
            </form>
          ) : (
            <form onSubmit={verifyOtp} className="login-form">
              <div className="login-input-group">
                <label htmlFor="otp">Enter OTP</label>
                <div className="login-input-field">
                  <MdSms className="login-icon" />
                  <input
                    id="otp"
                    type="text"
                    placeholder="Enter the 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="otp-resend">
                <button 
                  type="button" 
                  className="otp-resend-button"
                  onClick={(e) => sendOtp(e)}
                  disabled={isLoading}
                >
                  Resend OTP
                </button>
              </div>
              
              <button 
                type="submit" 
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify & Register"}
              </button>
            </form>
          )}
          
          <div className="login-register-prompt">
            <p>Already have an account?</p>
            <Link to="/login" className="login-register-link">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;