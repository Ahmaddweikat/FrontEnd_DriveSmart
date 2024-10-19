import React from "react";
// import Logo from "./components/Logo";
import InputField from "./components/InputField";
import RememberMe from "./components/RememberMe";
import SignInButton from "./components/SignInButton";
import Footer from "./components/Footer";
import backgroundImage from "./images/Wallpaper.jpg"; // Adjust the path according to your file structure
import { Link } from "react-router-dom"; // Import Link for routing

function SignInPage() {
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="relative w-full max-w-md p-8 bg-white text-center rounded-lg shadow-lg mx-4">
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          {/* Logo could go here if needed */}
        </div>

        {/* Sign-in Heading */}
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">
          Sign in to your account
        </h1>
        <p className="text-gray-500 mb-6">Log in to Driving School Complex</p>

        {/* Sign-in Form */}
        <form className="space-y-6">
          <InputField type="email" placeholder="Email" label="Email" />
          <InputField type="password" placeholder="Password" label="Password" />
          <RememberMe />
          <SignInButton />
        </form>

        {/* Register Link */}
        <p className="mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>

        {/* Footer Component */}
        <div className="mt-8">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
