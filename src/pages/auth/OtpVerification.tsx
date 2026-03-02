import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    // TODO: Verify OTP API
    navigate("/");
  };

  return (
    <form className="otp-form" onSubmit={handleVerify}>
      <h2>Verify OTP</h2>
      <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
      <button type="submit">Verify</button>
    </form>
  );
};

export default OtpVerification;
