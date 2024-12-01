import React, { useState } from "react";
import TopBar from "../../../components/HomeTopBar/TopBar";
import licenseInfo from "./constant/licenseInfo";
import Footer from "../../../components/Footer";
import HeaderSection from "./components/HeaderSection";
import LicenseCard from "./components/LicenseCard";
import ChatButton from "./components/ChatButton";
import ChatBox from "./components/ChatBox";

const GetALicense = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <TopBar />
      <HeaderSection />
      {licenseInfo.map((license, index) => (
        <LicenseCard key={index} license={license} />
      ))}
      {/* <ChatButton toggleChat={toggleChat} />
      <ChatBox isChatOpen={isChatOpen} toggleChat={toggleChat} /> */}
      <Footer />
    </div>
  );
};

export default GetALicense;
