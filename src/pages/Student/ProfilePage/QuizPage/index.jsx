import React from "react";
import QuizList from "./components/QuizList";
import ProfilePanel from "./components/ProfilePanel";
import SearchAndFilter from "./components/SearchAndFilter";
import { quizzes } from "./constant/quizzes";
import useQuizFilter from "./hooks/useQuizFilter";

const QuizPage = () => {
  const { setFilter, selectedFilter, setSelectedFilter, applyFilter } =
    useQuizFilter();
  const filteredQuizzes = applyFilter(quizzes);

  // Calculate average score
  const averageScore = Math.round(
    quizzes.reduce((acc, quiz) => acc + parseInt(quiz.score), 0) / quizzes.length
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
            
            <ProfilePanel 
              totalQuizzes={quizzes.length} 
              averageScore={averageScore}
            />
            
            <SearchAndFilter
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              setFilter={setFilter}
            />
            
            <QuizList
              quizzes={filteredQuizzes}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
