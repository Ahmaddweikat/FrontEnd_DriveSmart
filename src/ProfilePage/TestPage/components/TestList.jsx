import React from "react";

const TestList = ({ filteredTests }) => {
  return (
    <>
      {/* Tests List */}
      <div className="space-y-4">
        {filteredTests.map((test, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{test.title}</h3>

              {/* Passed or Failed Indicator with Filled Circle and Animation */}
              {parseInt(test.score) > 24 ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center justify-center border-2 border-green-500 bg-green-500 text-white rounded-full w-20 h-15 ">
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
                {/* <p className="text-black-500 text-sm mt-2">
                <strong>Score: </strong>{" "}
                {((test.score / 30) * 100).toFixed(2)}%
              </p> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TestList;
