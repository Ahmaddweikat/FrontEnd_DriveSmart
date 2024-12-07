import React from "react";

const TestList = ({ filteredTests }) => {
  if (filteredTests.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg text-center text-gray-500">
        No tests found matching the selected filter.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTests.map((test) => (
        <div key={test.title} className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">{test.title}</h3>

            
            {parseInt(test.score) > 24 ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center border-2 border-green-500 bg-green-500 text-white rounded-full w-20 h-15">
                  <span className="text-sm font-semibold">Passed</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center border-2 border-red-500 bg-red-500 text-white rounded-full w-20 h-15">
                  <span className="text-sm font-semibold">Failed</span>
                </div>
              </div>
            )}
          </div>

          {/* Date and Duration in Light Font */}
          <p className="text-gray-500 text-sm mt-1">
            Date: {test.date} | Duration: {test.duration}
          </p>

          <div className="flex justify-between items-start mt-10">
            <div>
              <p className="text-black-700 font-small">
                <strong>Tester:</strong> {test.tester}
              </p>

              {/* Score Display */}
              <p className="text-black-500 text-sm mt-2">
                <strong>Mark: </strong> {test.score}/30
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestList;
