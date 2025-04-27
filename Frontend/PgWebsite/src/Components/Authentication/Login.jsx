import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaUnlockAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      toast.success(res.data.alert);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.response?.data?.alert || "❌ Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <section className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p className="login-subtitle">Sign in to your account</p>
          </div>
          
          <form onSubmit={submit} className="login-form">
            <div className="login-input-group">
              <label htmlFor="email">Email Address</label>
              <div className="login-input-field">
                <MdEmail className="login-icon" />
                <input 
                  id="email"
                  type="email" 
                  placeholder="Enter your email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
            </div>
            
            <div className="login-input-group">
              <label htmlFor="password">Password</label>
              <div className="login-input-field">
                <FaUnlockAlt className="login-icon" />
                <input 
                  id="password"
                  type="password" 
                  placeholder="Enter your password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
            </div>
            
            <div className="login-forgot-password">
              <Link to="/forgot-password" className="login-forgot-link">
                Forgot Password?
              </Link>
            </div>
            
            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          
          <div className="login-register-prompt">
            <p>Don't have an account?</p>
            <Link to="/register" className="login-register-link">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;