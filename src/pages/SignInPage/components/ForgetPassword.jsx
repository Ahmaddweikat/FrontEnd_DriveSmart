import React from "react";
import { Link } from "react-router-dom";

function ForgetPassword() {
  return (
    <Link to="/forget-password" className="text-green-600 underline-shrink">
      Forget your Password?
    </Link>
  );
}

export default ForgetPassword;
