import React from "react";
import Footer from "../../../components/Footer";
import QuizApp from "./components/QuizApp";

const QuestionsForm = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-y-scroll">
        {/* Banner */}
        <section
          className="relative min-h-[35vh] bg-cover bg-center"
          // style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10 flex justify-center items-center h-full">
            {/* Add any title or content here if needed */}
          </div>
        </section>
        <QuizApp />
        <Footer />
      </div>
    </div>
  );
};

export default QuestionsForm;
