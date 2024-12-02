import React from "react";

function SignInButton({ isLoading }) {
  return (
    <button
      type="submit"
      className="w-full text-black font-normal p-3 rounded-lg transition-colors shadow-md bg-customGreen text-white hover:bg-green-600"
    >
      {isLoading ? "Loading..." : "Sign in"}
    </button>
  );
}

export default SignInButton;
