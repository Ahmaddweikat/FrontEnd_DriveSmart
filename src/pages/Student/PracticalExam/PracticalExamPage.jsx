import React, { useState } from "react";
import {
  Button,
  Modal,
  Alert,
  Container,
  Box,
  Typography,
  Link,
} from "@mui/material";
import useStudentProgressStore from "../../../store/studentProgress.store";

const PracticalExamPage = () => {
  const { completedLessons } = useStudentProgressStore();

  const [showModal, setShowModal] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [examAppointment, setExamAppointment] = useState(null);

  const constraints = [
    "Must have completed minimum 15 practical lessons",
    "Must have passed the theory exam",
    "Must have valid medical certificate",
    "Payment must be completed",
  ];

  const handleRequestExam = () => {
    setRequestSent(true);
    setShowModal(false);
    // Simulate approval after 3 seconds
    setTimeout(() => {
      setExamAppointment({
        date: "2024-02-20",
        time: "10:00 AM",
        location: "Main Testing Center",
      });
    }, 8000);
  };

  return (
    <div className="p-6">
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <h1 className="text-2xl font-bold mb-6">Practical Lessons Progress</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl mb-4">
            Completed Lessons: {completedLessons}
          </h2>
          {completedLessons >= 15 && !requestSent && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowModal(true)}
            >
              Request Practical Exam
            </Button>
          )}
          {completedLessons < 15 && (
            <Alert severity="warning">
              You must complete at least 15 practical lessons to request a test.
            </Alert>
          )}
          {requestSent && !examAppointment && (
            <Alert severity="info">
              Your practical exam request is being processed. We'll notify you
              once it's approved.
            </Alert>
          )}
          {examAppointment && (
            <Alert severity="success">
              <h3 className="font-bold">Exam Appointment Confirmed!</h3>
              <p>Date: {examAppointment.date}</p>
              <p>Time: {examAppointment.time}</p>
              <p>Location: {examAppointment.location}</p>
            </Alert>
          )}

          <Modal open={showModal} onClose={() => setShowModal(false)}>
            <div className="bg-white p-6 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96">
              <h2 className="text-xl mb-4">Practical Exam Requirements</h2>
              <ul className="list-disc pl-6 mb-4">
                {constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
              <Button
                variant="contained"
                color="primary"
                onClick={handleRequestExam}
              >
                Confirm Request
              </Button>
            </div>
          </Modal>
        </div>

        {/* New Result Inquiry Section */}
        <Box className="bg-white p-6 rounded-lg shadow-md mt-6">
          <Typography variant="h5" className="mb-7">
            Check Your Exam Results
          </Typography>
          <Typography variant="body1" className="mb-10">
            You can check your practical driving test results on the Ministry of
            Transportation website.
          </Typography>
          <Link
            href="http://www.mot.gov.ps/?page_id=647"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="contained" color="secondary" className="mt-2">
              Check Exam Results
            </Button>
          </Link>
        </Box>
      </Container>
    </div>
  );
};

export default PracticalExamPage;
