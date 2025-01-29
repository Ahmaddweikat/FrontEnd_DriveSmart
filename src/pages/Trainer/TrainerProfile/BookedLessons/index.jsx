import { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Stack,
  Chip,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Container,
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { useGetTrainerBookings } from "./hooks/useGetTrainerBookings";
import { useBookingRespond } from "./hooks/useBookingRespond";
import DayMapping from "../../../../constants/dayMapping";
import Spinner from "../../../../components/Spinner";
import GoogleIcon from "@mui/icons-material/Google";
import {
  useCheckGoogleConnection,
  useDisconnectGoogle,
} from "../../../../hooks/useGoogleConnection";
import useAuthStore from "../../../../store/auth.store";
import ConfirmModal from "../../../../components/modals/ConfirmModal";

const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(parseInt(hours));
  date.setMinutes(parseInt(minutes));

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export default function BookedLessons() {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [openAcceptModal, setOpenAcceptModal] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const { data: bookings = [], isLoading } = useGetTrainerBookings();
  const { user } = useAuthStore();
  const { data: googleConnection } = useCheckGoogleConnection(user.id);
  const { mutate: disconnectGoogle } = useDisconnectGoogle();
  const [confirmModalOpen2, setConfirmModalOpen2] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = booking.Student.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTab =
      (tabValue === 0 && booking.status === "pending") ||
      (tabValue === 1 && booking.status === "accepted") ||
      (tabValue === 2 && booking.status === "rejected");
    return matchesSearch && matchesTab;
  });

  const bookingMutation = useBookingRespond();

  const handleAcceptBooking = () => {
    bookingMutation.mutate({
      bookingId: selectedBooking.id,
      status: "accepted",
    });
    setOpenAcceptModal(false);
  };

  const handleRejectBooking = () => {
    bookingMutation.mutate({
      bookingId: selectedBooking.id,
      status: "rejected",
      rejectionReason,
    });
    setOpenRejectModal(false);
    setRejectionReason("");
  };

  const handleAcceptClick = (booking) => {
    setSelectedBooking(booking);
    setOpenAcceptModal(true);
  };

  const handleRejectClick = (booking) => {
    setSelectedBooking(booking);
    setOpenRejectModal(true);
  };

  const handleGoogleCalendarConnect = () => {
    window.open(`http://localhost:5000/OAuth?userId=${user.id}`, "_blank");
  };

  const BookingsTable = ({ bookings }) => (
    <TableContainer sx={{ marginTop: 4 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>Student</TableCell>
            <TableCell>Available Days</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>Car</TableCell>
            <TableCell>Status</TableCell>
            {tabValue === 0 && <TableCell align="right">Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar src={booking.Student.profilePicture}>
                    {booking.Student.name[0]}
                  </Avatar>
                  <span>{booking.Student.name}</span>
                </Stack>
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  {booking.TrainerAvailability.daysOfWeek.map((day) => (
                    <Chip key={day} label={DayMapping[day]} size="small" />
                  ))}
                </Stack>
              </TableCell>
              <TableCell>
                {formatTime(booking.TrainerAvailability.startTime)}
              </TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar src={booking.Car.profilePicture} variant="rounded">
                    {booking.Car.manufacturer[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="body2">
                      {booking.Car.manufacturer} {booking.Car.model}
                    </Typography>
                  </Box>
                </Stack>
              </TableCell>
              <TableCell>{booking.status}</TableCell>
              {tabValue === 0 && (
                <TableCell align="right">
                  <IconButton
                    color="success"
                    onClick={() => handleAcceptClick(booking)}
                  >
                    <Check />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleRejectClick(booking)}
                  >
                    <Close />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-gray-100">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              <Box sx={{ py: 4 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 4 }}
                >
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    Booked Lessons
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<GoogleIcon />}
                    onClick={
                      googleConnection?.connected
                        ? () => setConfirmModalOpen2(true)
                        : handleGoogleCalendarConnect
                    }
                    sx={{
                      backgroundColor: googleConnection?.connected
                        ? "#4CAF50"
                        : "#1976d2",
                      "&:hover": {
                        backgroundColor: googleConnection?.connected
                          ? "#45a049"
                          : "#1565c0",
                      },
                    }}
                  >
                    {googleConnection?.connected
                      ? "Disconnect Google Calendar"
                      : "Connect Google Calendar"}
                  </Button>
                </Stack>
                <Box
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 2,
                    boxShadow: 1,
                    p: 3,
                  }}
                >
                  <TextField
                    fullWidth
                    margin="normal"
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />

                  <Tabs value={tabValue} onChange={handleTabChange}>
                    <Tab label="Pending" />
                    <Tab label="Accepted" />
                    <Tab label="Rejected" />
                  </Tabs>

                  <BookingsTable bookings={filteredBookings} />

                  <Dialog
                    open={openAcceptModal}
                    onClose={() => setOpenAcceptModal(false)}
                  >
                    <DialogTitle>Accept Booking</DialogTitle>
                    <DialogContent>
                      Are you sure you want to accept this booking?
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setOpenAcceptModal(false)}>
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={handleAcceptBooking}
                      >
                        Accept
                      </Button>
                    </DialogActions>
                  </Dialog>

                  <Dialog
                    open={openRejectModal}
                    onClose={() => setOpenRejectModal(false)}
                  >
                    <DialogTitle>Reject Booking</DialogTitle>
                    <DialogContent>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        label="Rejection Reason"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setOpenRejectModal(false)}>
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleRejectBooking}
                      >
                        Reject
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              </Box>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={confirmModalOpen2}
        title="Confirm Disconnect"
        message="Are you sure you want to disconnect your Google Calendar?"
        onConfirm={() => {
          disconnectGoogle(user.id, {
            onSuccess: () => {
              setConfirmModalOpen2(false);
            },
          });
        }}
        onCancel={() => setConfirmModalOpen2(false)}
      />
    </>
  );
}
