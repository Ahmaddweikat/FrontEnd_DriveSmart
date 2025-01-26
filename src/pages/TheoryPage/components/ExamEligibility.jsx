import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  AlertTitle,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Send as SendIcon,
  Info as InfoIcon,
  CheckCircle,
  Schedule,
} from "@mui/icons-material";

const ExamEligibility = ({ successRate = 95 }) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState("none"); // none, pending, approved
  const [examDetails, setExamDetails] = useState(null);

  const handleRequestExam = async () => {
    setRequestStatus("pending");
    setIsConfirmDialogOpen(false);

    // Simulated API call
    setTimeout(() => {
      const response = {
        approved: true,
        examDate: "2024-02-01",
        examTime: "10:00 AM",
        location: "Smart Drive Testing Center - Room 204",
      };
      setExamDetails(response);
      setRequestStatus("approved");
    }, 2000);
  };

  const renderExamStatus = () => {
    if (requestStatus === "pending") {
      return (
        <Alert severity="info" sx={{ mt: 2 }}>
          <AlertTitle>Request Pending</AlertTitle>
          Your exam request is being reviewed by the school manager. We'll
          notify you once it's approved.
        </Alert>
      );
    }

    if (requestStatus === "approved" && examDetails) {
      return (
        <Alert severity="success" sx={{ mt: 2 }}>
          <AlertTitle>Exam Scheduled!</AlertTitle>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText primary={`Date: ${examDetails.examDate}`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Schedule color="success" />
              </ListItemIcon>
              <ListItemText primary={`Time: ${examDetails.examTime}`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InfoIcon color="success" />
              </ListItemIcon>
              <ListItemText primary={`Location: ${examDetails.location}`} />
            </ListItem>
          </List>
        </Alert>
      );
    }

    return null;
  };

  return (
    <Box sx={{ 
      bgcolor: 'background.paper', 
      borderRadius: 2, 
      boxShadow: 2,
      p: 4,
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <CircularProgress 
            variant="determinate" 
            value={successRate} 
            size={80}
            thickness={4}
            sx={{ color: successRate >= 90 ? 'success.main' : 'warning.main' }}
          />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              Success Rate
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: successRate >= 90 ? 'success.main' : 'warning.main' }}>
              {successRate}%
            </Typography>
          </Box>
        </Box>

        {successRate >= 90 && requestStatus === 'none' && (
          <Button
            variant="contained"
            color="success"
            size="large"
            startIcon={<SendIcon />}
            onClick={() => setIsConfirmDialogOpen(true)}
            sx={{ minWidth: 200 }}
          >
            Request Official Exam
          </Button>
        )}
      </Box>

      {successRate < 90 && (
        <Alert severity="info" variant="filled">
          Complete more practice tests to reach 90% success rate and qualify for the official exam
        </Alert>
      )}

      {renderExamStatus()}

      <Dialog
        open={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
      >
        <DialogTitle>Confirm Exam Request</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            <AlertTitle>Before you proceed:</AlertTitle>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="Make sure you have completed all required practice tests" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="Ensure your personal information is up to date" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="You can only request one exam at a time" />
              </ListItem>
            </List>
          </Alert>
          <Typography>
            Are you sure you want to request the official theoretical exam?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsConfirmDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleRequestExam}
            variant="contained"
            color="success"
          >
            Confirm Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default ExamEligibility;
