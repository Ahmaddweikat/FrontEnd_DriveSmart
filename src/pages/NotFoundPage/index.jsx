import React from "react";
import { Link } from "react-router-dom";
import trafficLightSvg from "./img/traffic-light-404.svg";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-custombg flex items-center justify-center px-4">
      <div className="max-w-2xl text-center animate-fade-in">
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-customRed mb-4">404</h1>
          <img
            src={trafficLightSvg}
            alt="Traffic Light Stop"
            className="w-48 h-48 mx-auto mb-6"
          />
        </div>

        <h2 className="text-3xl font-bold text-customGray mb-4">
          Oops! Wrong Turn
        </h2>

        <p className="text-customGrayOption mb-8 text-lg">
          Looks like you've taken an unexpected detour. This page doesn't exist
          in our driving school system.
        </p>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block bg-customGreen text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
