import React from "react";

export function StudentInfo({
  studentName,
  studentId,
  schoolName,
  typeOfLicence,
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h3 className="text-base">
          <strong>Student Name:</strong> {studentName || "Ahmad Dweikat"}
        </h3>
      </div>
      <div>
        <h3 className="text-base">
          <strong>School Name:</strong> {schoolName || "Al-Quds"}
        </h3>
      </div>
      <div>
        <h3 className="text-base">
          <strong>Student ID:</strong> {studentId || "12345"}
        </h3>
      </div>
      <div>
        <h3 className="text-base">
          <strong>Type of Licence:</strong> {typeOfLicence || "Private"}
        </h3>
      </div>
    </div>
  );
}
