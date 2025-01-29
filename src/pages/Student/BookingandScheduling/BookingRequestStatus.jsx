import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CancelIcon from "@mui/icons-material/Cancel";
import { Avatar, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ConfirmModal from "../../../components/modals/ConfirmModal";
import DayMapping from "../../../constants/dayMapping";
import { useCancelBooking } from "./hooks/ussBookings";

const statusColors = {
  pending: {
    color: "#FFA500",
    background: "#FFF3E0",
  },
  accepted: {
    color: "#72b626",
    background: "#F1F8E9",
  },
  rejected: {
    color: "#FF0000",
    background: "#FFEBEE",
  },
};

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

const BookingRequestStatus = ({ bookingRequest }) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { mutate: cancelBooking } = useCancelBooking();

  const handleCancelBooking = () => {
    cancelBooking(bookingRequest.id, {
      onSuccess: () => {
        setIsConfirmModalOpen(false);
      },
    });
  };

  const { trainer, startTime, days, car, status } = {
    trainer: {
      name: bookingRequest?.TrainerAvailability?.Trainer?.name,
      profilePicture:
        bookingRequest?.TrainerAvailability?.Trainer?.profilePicture,
    },
    startTime: bookingRequest?.TrainerAvailability?.startTime,
    days: bookingRequest?.TrainerAvailability?.daysOfWeek
      .map((day) => DayMapping[day])
      .join(", "),
    car: {
      manufacturer: bookingRequest?.Car?.manufacturer,
      model: bookingRequest?.Car?.model,
      gearboxType: bookingRequest?.Car?.gearboxType,
      profilePicture: bookingRequest?.Car?.profilePicture,
    },
    status: bookingRequest?.status,
  };

  return (
    <>
      <Paper elevation={3} className="p-4 mb-6">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
        >
          <h1 className="text-2xl font-bold text-gray-800">
            Current Booking Request
          </h1>
          {status === "pending" && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<CancelIcon />}
              onClick={() => setIsConfirmModalOpen(true)}
            >
              Cancel Booking
            </Button>
          )}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          spacing={4}
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" spacing={4} flex={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="subtitle2" color="text.secondary" mr={1}>
                Trainer:
              </Typography>
              <Avatar
                src={trainer.profilePicture}
                sx={{ width: 32, height: 32 }}
              />
              <Typography>{trainer.name}</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="subtitle2" color="text.secondary" mr={1}>
                Schedule:
              </Typography>
              <AccessTimeIcon color="action" />
              <Typography>
                {formatTime(startTime)} - {days}
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="subtitle2" color="text.secondary" mr={1}>
                Vehicle:
              </Typography>
              <Avatar
                src={car.profilePicture}
                variant="rounded"
                sx={{ width: 32, height: 32 }}
              />
              <Typography>
                {car.manufacturer} {car.model} • {car.gearboxType}
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="subtitle2" color="text.secondary" mr={1}>
                Status:
              </Typography>
              <Chip
                label={status?.toUpperCase()}
                sx={{
                  color: statusColors[status]?.color,
                  backgroundColor: statusColors[status]?.background,
                  width: "fit-content",
                }}
              />
            </Stack>
          </Stack>
        </Stack>
      </Paper>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title="Cancel Booking"
        message="Are you sure you want to cancel this booking request?"
        onConfirm={handleCancelBooking}
        onCancel={() => setIsConfirmModalOpen(false)}
        confirmText="Yes, Cancel"
        cancelText="No, Keep it"
      />
    </>
  );
};

export default BookingRequestStatus;
