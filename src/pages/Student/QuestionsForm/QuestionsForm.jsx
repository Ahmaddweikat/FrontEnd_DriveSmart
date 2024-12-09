import React, { useEffect } from "react";
import Footer from "../../../components/Footer";
import QuizApp from "./components/QuizApp";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { personalLicenseForms } from '../../TheoryPage/data/personalLicense/index';

const QuestionsForm = () => {
  const { formType } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error('FULL DEBUG INFO:');
    console.error('Current Location:', location);
    console.error('Current Path:', location.pathname);
    console.error('Form Type:', formType);
    console.error('Available Forms:', personalLicenseForms);
  }, [formType, location]);
  
  const selectedForm = personalLicenseForms.find(form => 
    form.formType === formType
  );
  
  if (!selectedForm) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 p-6">
        <div className="text-center bg-white p-8 rounded-xl shadow-2xl">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Form Not Found</h1>
          <p className="text-gray-700 mb-4">The quiz form you're looking for does not exist.</p>
          <div className="flex flex-col space-y-4">
            <p className="text-sm text-gray-500">
              Available Forms: {personalLicenseForms.map(f => f.formType).join(', ')}
            </p>
            <button 
              onClick={() => navigate('/theory')} 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Back to Theory Page
            </button>
            <button 
              onClick={() => navigate('/')} 
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition duration-300"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <div className="flex-1 flex flex-col h-screen overflow-y-scroll">
        <section className="relative bg-cover bg-center">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10 flex justify-center items-center h-full">
            {/* Add any title or content here if needed */}
          </div>
        </section>
        <QuizApp 
          questions={selectedForm.questions} 
          title={selectedForm.title} 
          timeLimit={selectedForm.timeLimit}
        />
        <Footer />
      </div>
    </div>
  );
};

export default QuestionsForm;
