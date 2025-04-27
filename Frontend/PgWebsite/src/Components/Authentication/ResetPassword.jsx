import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './Login.css';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`http://localhost:5000/reset-password/${token}`, { newPassword });
      toast.success(data.alert);
      localStorage.setItem("token", data.token); // Auto-login after reset
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.alert || "❌ Reset failed!");
    }
  };

  return (
    <section className="resetPasswordForm">
      <div className="formDiv">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn2">Reset Password</button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
