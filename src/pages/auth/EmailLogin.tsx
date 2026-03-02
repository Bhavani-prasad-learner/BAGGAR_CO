import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordStrength from "./PasswordStrength";

const EmailLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Handle email login API
    navigate("/");
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Email Login</h2>
      <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
      <PasswordStrength password={password} />
      <button type="submit">Login</button>
    </form>
  );
};

export default EmailLogin;
