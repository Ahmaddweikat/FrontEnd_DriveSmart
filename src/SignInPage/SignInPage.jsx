import React from "react";
// import Logo from "./components/Logo";
import InputField from "./components/InputField";
import RememberMe from "./components/RememberMe";
import SignInButton from "./components/SignInButton";
import Footer from "./components/Footer";
import backgroundImage from "./images/Wallpaper.jpg"; // Adjust the path according to your file structure
import { Link } from "react-router-dom"; // Import Link for routing
import Logo from "../../src/assets/DRIVESMART.png";

function SignInPage() {
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="relative w-full max-w-md p-8 bg-white text-center rounded-lg shadow-lg mx-4">
        {/* Logo inside the input panel */}
        <div className="flex justify-start mb-3 mr-8">
          <img src={Logo} alt="Logo" className="h-30 w-36" />
        </div>

        {/* Sign-in Heading below the logo */}
        <h1 className="text-4xl font-serif font-bold mb-8 text-left text-gray-800">
          Sign in
        </h1>

        {/* Sign-in Form */}
        <form className="space-y-4">
          <InputField type="email" placeholder="Email" label="Email" />
          <InputField type="password" placeholder="Password" label="Password" />
          <RememberMe />
          <SignInButton />
        </form>
        {/* Register Link */}
        <p className="mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-600 underline-shrink">
            Sign up
          </Link>
        </p>

        {/* OR Separator */}
        <div className="flex items-center mt-6 mb-4">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-gray-500">or</span>
          <hr className="w-full border-gray-300" />
        </div>

        {/* Google Sign-in Button with SVG Logo */}
        <button className="w-full flex items-center justify-center border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-100">
          <svg
            className="h-5 w-5 mr-2"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.68 8.18182C15.68 7.61455 15.6291 7.06909 15.5345 6.54545H8V9.64364H12.3055C12.1164 10.64 11.5491 11.4836 10.6982 12.0509V14.0655H13.2945C14.8073 12.6691 15.68 10.6182 15.68 8.18182Z"
              fill="#4285F4"
            ></path>
            <path
              d="M8 16C10.16 16 11.9709 15.2873 13.2945 14.0655L10.6982 12.0509C9.98545 12.5309 9.07636 12.8218 8 12.8218C5.92 12.8218 4.15273 11.4182 3.52 9.52727H0.858182V11.5927C2.17455 14.2036 4.87273 16 8 16Z"
              fill="#34A853"
            ></path>
            <path
              d="M3.52 9.52C3.36 9.04 3.26545 8.53091 3.26545 8C3.26545 7.46909 3.36 6.96 3.52 6.48V4.41455H0.858182C0.312727 5.49091 0 6.70545 0 8C0 9.29455 0.312727 10.5091 0.858182 11.5855L2.93091 9.97091L3.52 9.52Z"
              fill="#FBBC05"
            ></path>
            <path
              d="M8 3.18545C9.17818 3.18545 10.2255 3.59273 11.0618 4.37818L13.3527 2.08727C11.9636 0.792727 10.16 0 8 0C4.87273 0 2.17455 1.79636 0.858182 4.41455L3.52 6.48C4.15273 4.58909 5.92 3.18545 8 3.18545Z"
              fill="#EA4335"
            ></path>
          </svg>
          Sign in with Google
        </button>
        {/* Footer Component */}
        <div className="mt-8">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
