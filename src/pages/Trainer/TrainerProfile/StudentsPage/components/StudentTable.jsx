import React from 'react';

const StudentTable = ({ currentStudents }) => {
    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg max-w-7xl mx-auto"> 
            <table className="w-full divide-y divide-gray-200">
                <thead className="bg-customGreen text-white">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Student Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Gender</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">License Type</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Contact Number</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Lessons Taken</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Blood Type</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {currentStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-100 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900">{student.name}</div></td>
                            <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{student.gender}</div></td>
                            <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{student.licenseType}</div></td>
                            <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{student.contactNumber}</div></td>
                            <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{student.lessonsTaken} lessons</div></td>
                            <td className="px-6 py-4 whitespace-nowrap"><span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">{student.bloodType}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentTable;
