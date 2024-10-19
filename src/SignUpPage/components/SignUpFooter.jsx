import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const SignupFooter = () => {
  return (
    <div className="text-center text-sm text-gray-500">
      Already have an account?{" "}
      <Link to="/signin" className="text-sm text-blue-600 hover:underline">
        Sign in
      </Link>
    </div>
  );
};

export default SignupFooter;
