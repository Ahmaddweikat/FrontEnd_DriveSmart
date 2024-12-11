import React, { useState } from "react";
// import TopBar from "../../../components/HomeTopBar/TopBar";
import licenseInfo from "./constant/licenseInfo";
import Footer from "../../../components/Footer";
import HeaderSection from "./components/HeaderSection";
import LicenseCard from "./components/LicenseCard";
import ChatApp from "../../../pages/ChatApp/ChatApp";
import CloseIcon from "@mui/icons-material/Close";

const GetALicense = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* <TopBar /> */}
      <HeaderSection />
      {licenseInfo.map((license, index) => (
        <LicenseCard key={index} license={license} />
      ))}

      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 p-4 bg-customGreen text-white rounded-full shadow-lg"
        aria-label="Open Chat"
      >
        <span role="img" aria-label="Chat">
          💬
        </span>
      </button>
      {isChatOpen && (
        <div className="fixed inset-0 z-60 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white w-5/6 h-5/6 rounded-lg shadow-lg relative flex flex-col">
            <button
              onClick={toggleChat}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              aria-label="Close Chat"
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </button>

            <div className="flex-1 -mt-10 -ml-20">
              <ChatApp />
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default GetALicense;
