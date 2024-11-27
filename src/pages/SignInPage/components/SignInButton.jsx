import React from "react";

function SignInButton({ isLoading }) {
  return (
    <button
      type="submit"
      className="w-full bg-customRed text-black font-normal p-3 rounded-lg hover:bg-red-600 transition-colors font-serif"
    >
      {isLoading ? "Loading..." : "Sign in"}
    </button>
  );
}

export default SignInButton;
