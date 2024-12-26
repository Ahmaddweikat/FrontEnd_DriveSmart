import ClearIcon from "@mui/icons-material/Clear";
import GoogleIcon from "@mui/icons-material/Google";
import InfoIcon from "@mui/icons-material/Info";
import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
// import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import DayMapping from "../../../constants/dayMapping";
import useAuthStore from "../../../store/auth.store";
import ConfirmModal from "./../../../components/modals/ConfirmModal";
import ErrorModal from "./../../../components/modals/ErrorModal";
import SuccessModal from "./../../../components/modals/SuccessModal";
import Spinner from "./../../../components/Spinner/index";
import BookingRequestStatus from "./BookingRequestStatus";
import useAvailabilityFilters from "./hooks/useAvailabilityFilters";
import useGetAvailabilities from "./hooks/useGetAvailabilities";
import { useCreateBooking, useGetBookings } from "./hooks/ussBookings";
import {
  useCheckGoogleConnection,
  useDisconnectGoogle,
} from "./hooks/useGoogleConnection";

const NewBookingPage = () => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmModalOpen2, setConfirmModalOpen2] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const { user } = useAuthStore();

  const {
    data: availabilities = [],
    isLoading,
    error,
  } = useGetAvailabilities("isRecurring=true");

  const { mutate: createBooking, isLoading: isBooking } = useCreateBooking();
  const { data: bookings = [], isLoading: isLoadingBookings } =
    useGetBookings();

  const [selectedCars, setSelectedCars] = useState({});

  const handleCarSelect = (availabilityId, carId) => {
    setSelectedCars((prev) => ({
      ...prev,
      [availabilityId]: carId,
    }));
  };

  const {
    filters,
    trainers,
    cars,
    filteredAvailabilities,
    handleFilterChange,
    handleClearFilter,
  } = useAvailabilityFilters(availabilities);

  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const { data: googleConnection } = useCheckGoogleConnection(user.id);
  const { mutate: disconnectGoogle } = useDisconnectGoogle();

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading availabilities: {error.message}</div>;

  const handleBookSession = (availability) => {
    const selectedCarId = selectedCars[availability.id];

    if (!selectedCarId && availability.cars.length > 1) {
      alert("Please select a car first");
      return;
    }

    setSelectedBooking({
      availabilityId: availability.id,
      carId: selectedCarId || availability.cars[0].id,
      trainerName: availability.Trainer.name,
      startTime: availability.startTime,
      days: availability.daysOfWeek.map((day) => DayMapping[day]).join(", "),
    });
    setConfirmModalOpen(true);
  };

  const handleConfirmBooking = () => {
    const bookingData = {
      availabilityId: selectedBooking.availabilityId,
      carId: selectedBooking.carId,
    };

    createBooking(bookingData, {
      onSuccess: () => {
        setConfirmModalOpen(false);
        setSuccessModalOpen(true);
      },
      onError: (error) => {
        setConfirmModalOpen(false);
        setErrorMessage(error?.response?.data?.message);
        setErrorModalOpen(true);
      },
    });
  };

  const handleGoogleCalendarConnect = () => {
    window.open(`http://localhost:5000/OAuth?userId=${user.id}`, "_blank");
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-gray-100">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <BookingRequestStatus
                    key={booking.id}
                    bookingRequest={booking}
                  />
                ))
              ) : (
                <Paper elevation={3} className="p-4 mb-6">
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <InfoIcon color="primary" />
                    <Typography variant="h6" color="text.secondary">
                      No Current Booking Request - You can book a new lesson
                      below
                    </Typography>
                  </Stack>
                </Paper>
              )}
              <Paper elevation={3} className="p-6 mb-6">
                {/* Google Calendar Button Section */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={4}
                >
                  <h1 className="text-2xl font-bold text-gray-800">
                    Book a Lesson
                  </h1>
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

                {/* Filters Section */}
                <Stack direction="row" spacing={2} className="mb-6">
                  {/* Trainer Select */}
                  <FormControl className="flex-1">
                    <InputLabel>Select Trainer</InputLabel>
                    <Select
                      value={filters.trainer}
                      onChange={(e) =>
                        handleFilterChange("trainer", e.target.value)
                      }
                      endAdornment={
                        filters.trainer && (
                          <IconButton
                            size="small"
                            onClick={() => handleClearFilter("trainer")}
                            sx={{ mr: 2 }}
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        )
                      }
                    >
                      {trainers.map((trainer) => (
                        <MenuItem key={trainer.id} value={trainer.id}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Avatar src={trainer.profilePicture} />
                            <span>{trainer.name}</span>
                          </Stack>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Car Select with Avatars */}
                  <FormControl className="flex-1">
                    <InputLabel>Select Car</InputLabel>
                    <Select
                      value={filters.car}
                      onChange={(e) =>
                        handleFilterChange("car", e.target.value)
                      }
                      endAdornment={
                        filters.car && (
                          <IconButton
                            size="small"
                            onClick={() => handleClearFilter("car")}
                            sx={{ mr: 2 }}
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        )
                      }
                    >
                      {cars.map((car) => (
                        <MenuItem
                          key={car.id}
                          value={`${car.manufacturer} ${car.model}`}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Avatar src={car.profilePicture} />
                            <span>
                              {car.manufacturer} {car.model}
                            </span>
                          </Stack>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Days Select */}
                  <FormControl className="flex-1">
                    <InputLabel>Days</InputLabel>
                    <Select
                      multiple
                      value={filters.days}
                      onChange={(e) =>
                        handleFilterChange("days", e.target.value)
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={DayMapping[value]} />
                          ))}
                        </Box>
                      )}
                      endAdornment={
                        filters.days.length > 0 && (
                          <IconButton
                            size="small"
                            onClick={() => handleClearFilter("days")}
                            sx={{ mr: 2 }}
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        )
                      }
                    >
                      {Object.entries(DayMapping).map(([value, label]) => (
                        <MenuItem key={value} value={Number(value)}>
                          {label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Time Select */}
                  <FormControl className="flex-1">
                    <InputLabel>Start Time</InputLabel>
                    <Select
                      value={filters.startTime}
                      onChange={(e) =>
                        handleFilterChange("startTime", e.target.value)
                      }
                      endAdornment={
                        filters.startTime && (
                          <IconButton
                            size="small"
                            onClick={() => handleClearFilter("startTime")}
                            sx={{ mr: 2 }}
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        )
                      }
                    >
                      {[
                        "08:00",
                        "09:00",
                        "10:00",
                        "11:00",
                        "12:00",
                        "13:00",
                        "14:00",
                        "15:00",
                        "16:00",
                        "17:00",
                      ].map((time) => (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>

                {/* Table View */}
                <Box sx={{ height: "calc(100vh - 450px)", overflow: "auto" }}>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                          <TableCell>Trainer</TableCell>
                          <TableCell>Available Days</TableCell>
                          <TableCell>Start Time</TableCell>
                          <TableCell>Car</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredAvailabilities.map((availability) => (
                          <TableRow
                            key={availability.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Avatar
                                  src={availability.Trainer.profilePicture}
                                />
                                <span>{availability.Trainer.name}</span>
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <Stack direction="row" spacing={1}>
                                {availability.daysOfWeek.map((day) => (
                                  <Chip
                                    key={day}
                                    label={DayMapping[day]}
                                    size="small"
                                  />
                                ))}
                              </Stack>
                            </TableCell>
                            <TableCell>{availability.startTime}</TableCell>
                            <TableCell>
                              {availability.cars.length === 1 ? (
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                  sx={{ mb: 1 }}
                                >
                                  <Avatar
                                    src={availability.cars[0].profilePicture}
                                    variant="rounded"
                                  />
                                  <Box>
                                    <Typography variant="body2">
                                      {availability.cars[0].manufacturer}{" "}
                                      {availability.cars[0].model}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      {availability.cars[0].gearboxType} •{" "}
                                      {availability.cars[0].color}
                                    </Typography>
                                  </Box>
                                </Stack>
                              ) : (
                                <FormControl fullWidth>
                                  <Select
                                    value={selectedCars[availability.id] || ""}
                                    onChange={(e) =>
                                      handleCarSelect(
                                        availability.id,
                                        e.target.value
                                      )
                                    }
                                    size="small"
                                    sx={{ minWidth: 200 }}
                                  >
                                    {availability.cars.map((car) => (
                                      <MenuItem key={car.id} value={car.id}>
                                        <Stack
                                          direction="row"
                                          alignItems="center"
                                          spacing={2}
                                        >
                                          <Avatar
                                            src={car.profilePicture}
                                            variant="rounded"
                                          />
                                          <Box>
                                            <Typography variant="body2">
                                              {car.manufacturer} {car.model}
                                            </Typography>
                                            <Typography
                                              variant="caption"
                                              color="text.secondary"
                                            >
                                              {car.gearboxType} • {car.color}
                                            </Typography>
                                          </Box>
                                        </Stack>
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              )}
                            </TableCell>
                            <TableCell align="right">
                              <Button
                                variant="contained"
                                sx={{
                                  backgroundColor: "#72b626",
                                  "&:hover": { backgroundColor: "#6aa51f" },
                                }}
                                onClick={() => handleBookSession(availability)}
                                disabled={bookings && bookings.length > 0}
                              >
                                Book Lesson
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Paper>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={confirmModalOpen}
        title="Confirm Booking"
        message={
          selectedBooking
            ? `Are you sure you want to book a session with ${selectedBooking.trainerName} at ${selectedBooking.startTime} on ${selectedBooking.days}?`
            : ""
        }
        onConfirm={handleConfirmBooking}
        onCancel={() => setConfirmModalOpen(false)}
      />
      <SuccessModal
        isOpen={successModalOpen}
        message="Your session has been successfully booked!"
        onClose={() => setSuccessModalOpen(false)}
        buttonText="Done"
      />
      <ErrorModal
        isOpen={errorModalOpen}
        message={errorMessage}
        onClose={() => setErrorModalOpen(false)}
      />
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
};

export default NewBookingPage;
