import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PhoneLogin = () => {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Trigger OTP send API
    navigate("/auth/otp");
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Phone Login</h2>
      <input type="tel" placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <button type="submit">Send OTP</button>
    </form>
  );
};

export default PhoneLogin;
