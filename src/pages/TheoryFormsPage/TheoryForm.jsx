import React from "react";
import Footer from "../../components/Footer";
import Banner from "./components/Banner";

const TheoryForm = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-y-scroll">
        <Banner />
        <div className="container mx-auto p-4"></div>
        <Footer />
      </div>
    </div>
  );
};

export default TheoryForm;
