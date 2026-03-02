import React from "react";

const PasswordStrength = ({ password }) => {
  const getStrength = () => {
    if (password.length < 6) return "Weak";
    if (password.match(/[A-Z]/) && password.match(/\d/)) return "Strong";
    return "Medium";
  };

  return <p>Password Strength: <strong>{getStrength()}</strong></p>;
};

export default PasswordStrength;
