import React from "react";
import { Link } from "react-router-dom";

function ForgetPassword() {
  return (
    <Link to="/forgot-password" className="text-green-600 underline-shrink">
      Forgot your Password?
    </Link>
  );
}

export default ForgetPassword;
