import React from "react";
import MonitorIcon from "@mui/icons-material/Monitor";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MedicationIcon from "@mui/icons-material/Medication";

const FlipCard = ({ isExpanded }) => {
  return (
    <div className="flex justify-center items-center p-4 perspective">
      <div className="flex space-x-4 overflow-x-auto">
        {" "}
        {/* Card 1 */}
        <div
          className="relative  h-80 transform transition-transform duration-500 preserve-3d hover:rotate-y-180"
          style={{
            width: isExpanded ? "300px" : "320px",
          }}
        >
          {/* Front Side */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
            <MedicationIcon
              style={{ color: "#72b626", width: "50px", height: "50px" }}
            />
            <span className="text-6xl fa fa-stethoscope text-customGreen mb-4"></span>
            <h2 className="text-2xl font-semibold text-customGreen ">
              Medical Examination
            </h2>
          </div>

          {/* Back Side */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-lg p-6 rotate-y-180 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold text-customGreen ">
              {" "}
              Medical Examination / Health Department
            </h3>
            <p className="text-customGray mt-2 text-center">
              The medical examination is the first step after completing the
              transaction at the driving school. You can apply for the medical
              examination at the Health Department on Sundays, Mondays, and
              Thursdays from 08:00 am to 10:30 am. It is preferable to go as
              early as possible. Students with a shipping license and above
              should not have breakfast before the examination.
            </p>
          </div>
        </div>
        {/* Card 2 */}
        <div
          className="relative h-80 transform transition-transform duration-500 preserve-3d hover:rotate-y-180"
          style={{
            width: isExpanded ? "300px" : "320px",
          }}
        >
          {/* Front Side */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
            <MonitorIcon
              style={{ color: "#72b626", width: "50px", height: "50px" }}
            />
            <span className="text-6xl fa fa-trophy text-customGreen mb-4"></span>{" "}
            {/* Replace with a relevant icon */}
            <h2 className="text-2xl font-semibold text-customGreen ">
              Theoretical examination
            </h2>
          </div>

          {/* Back Side */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-lg p-6 rotate-y-180 flex flex-col items-center justify-center">
            <h4 className="text-lg font-semibold text-customGreen ">
              {" "}
              Theoretical Examination (Theory) / Traffic Department
            </h4>
            <p className="text-customGray mt-2 text-center">
              After studying the theory well and practicing the theory training
              exams available on our website Makkawi Driving School, you can
              apply for the official theory exam any day from Sunday to
              Thursday, and on the day designated for the exam you must be
              present at the department from 08:30 in the morning and wait for
              your turn.
            </p>
          </div>
        </div>
        {/* Card 3 */}
        <div
          className="relative  h-80 transform transition-transform duration-500 preserve-3d hover:rotate-y-180"
          style={{
            width: isExpanded ? "300px" : "320px",
          }}
        >
          {/* Front Side */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
            <DirectionsBusIcon
              style={{ color: "#72b626", width: "50px", height: "50px" }}
            />
            <span className="text-6xl fa fa-trophy text-customGreen mb-4"></span>{" "}
            {/* Replace with a relevant icon */}
            <h2 className="text-2xl font-semibold text-customGreen ">
              Practical examination
            </h2>
          </div>

          {/* Back Side */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-lg p-6 rotate-y-180 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold text-customGreen ">
              {" "}
              Practical examination (Test) / Traffic Department{" "}
            </h3>
            <p className="text-customGray mt-2 text-center">
              The last step after mastering the basic driving skills is to take
              the practical driving test. You can take the official test any day
              from Sunday to Thursday by prior appointment through the driving
              school. As for the test time, it is determined in advance (and is
              not considered an exact date).
            </p>
          </div>
        </div>
        {/* Card 4 */}
        <div
          className="relative  h-80 transform transition-transform duration-500 preserve-3d hover:rotate-y-180"
          style={{
            width: isExpanded ? "300px" : "320px",
          }}
        >
          {/* Front Side */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
            <CreditCardIcon
              style={{ color: "#72b626", width: "50px", height: "50px" }}
            />
            <span className="text-6xl fa fa-trophy text-customGreen mb-4"></span>{" "}
            {/* Replace with a relevant icon */}
            <h2 className="text-2xl font-semibold text-customGreen ">
              Obtaining the license
            </h2>
          </div>

          {/* Back Side */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-lg p-6 rotate-y-180 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold text-customGreen ">
              {" "}
              Obtaining a license / Traffic department{" "}
            </h3>
            <p className="text-customGray mt-2 text-center">
              After passing the practical exam (test), you can obtain a driving
              license from the licensing authority (Traffic Department) any day
              from Sunday to Thursday from 08:00 AM to 01:00 PM, with the
              necessity of bringing your personal ID card and going in person to
              receive the license.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
