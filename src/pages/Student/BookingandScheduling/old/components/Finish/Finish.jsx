import React from "react";
import { Box, Paper, Typography, Container } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import Details from "./components/Details";

const Finish = ({ selectedLessonType, numberOfLessons }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        py: 6,
        px: 3,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <PaymentIcon
              sx={{
                fontSize: 40,
                color: "#72b626",
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: "#2d3748",
              }}
            >
              Payment Details
            </Typography>
          </Box>

          {/* Payment Container */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              bgcolor: "white",
              transition: "all 0.3s ease-in-out",
              border: "1px solid rgba(0,0,0,0.1)",
              "&:hover": {
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                transform: "translateY(-4px)",
              },
            }}
          >
            <Box
              sx={{
                p: 4,
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background:
                    "linear-gradient(90deg, #72b626 0%, #8ed444 100%)",
                },
              }}
            >
              <Details
                selectedLessonType={selectedLessonType}
                numberOfLessons={numberOfLessons}
              />
            </Box>
          </Paper>
          <Box
            sx={{
              mt: 4,
              p: 3,
              bgcolor: "rgba(114, 182, 38, 0.1)",
              borderRadius: 2,
              border: "1px dashed #72b626",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#2d3748",
                textAlign: "center",
              }}
            >
              Your payment information is secure and encrypted. Once the payment
              is processed, you'll receive a confirmation email with your
              booking details.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Finish;
