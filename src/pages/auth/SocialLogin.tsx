import React from "react";

const SocialLogin = () => {
  const handleGoogleLogin = () => {
    // TODO: Google login logic
    console.log("Google login");
  };

  const handleFacebookLogin = () => {
    // TODO: Facebook login logic
    console.log("Facebook login");
  };

  return (
    <div className="social-login">
      <h2>Social Login</h2>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <button onClick={handleFacebookLogin}>Login with Facebook</button>
    </div>
  );
};

export default SocialLogin;
