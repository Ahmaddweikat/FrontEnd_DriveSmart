import React from "react";
import { Box, Card, CardContent, Typography, Button, Grid, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

const RequestCard = ({ request, onAccept, onReject }) => {
  const { student, files } = request;

  return (
    <StyledCard>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar sx={{ mr: 2 }}>{student.name[0]}</Avatar>
              <Box>
                <Typography variant="h6">{student.name}</Typography>
                <Typography color="textSecondary">{student.email}</Typography>
              </Box>
            </Box>
            <Typography variant="body1" mb={1}>
              Phone: {student.phone}
            </Typography>
            <Typography variant="body1" mb={2}>
              Preferred License Type: {student.licenseType}
            </Typography>
            <Box mb={2}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Uploaded Documents:
              </Typography>
              {files.map((file, index) => (
                <Box key={index} mb={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => window.open(file.url)}
                  >
                    View {file.name}
                  </Button>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => onAccept(request.id)}
              >
                Accept
              </Button>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={() => onReject(request.id)}
              >
                Reject
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default RequestCard;
