import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTrainerAvailability } from "./useTrainerAvailability";

export const useAvailabilityForm = () => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [error, setError] = useState(null);

  const { availabilities, createAvailability, updateAvailability } =
    useTrainerAvailability();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const isRecurring = watch("isRecurring");

  const handleEdit = (index, availability) => {
    setEditingIndex(index);
    setDaysOfWeek(availability.daysOfWeek || []);

    // Set form values
    setValue("isRecurring", availability.isRecurring);
    setValue("startTime", availability.startTime);

    if (availability.isRecurring) {
      setValue("daysOfWeek", availability.daysOfWeek);
    } else {
      // Format the date to YYYY-MM-DD for the date input
      const formattedDate = availability.specificDate.split("T")[0];
      setValue("specificDate", formattedDate);
    }
  };

  const resetForm = () => {
    setEditingIndex(null);
    setDaysOfWeek([]);
    reset();
  };

  const handleDaysChange = (day) => {
    setDaysOfWeek((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      }
      return [...prev, day];
    });
  };

  const onSubmit = (formData) => {
    // Format startTime to HH:mm by removing seconds
    const startTime = formData.startTime.split(":").slice(0, 2).join(":");

    const requestData = {
      startTime,
      isRecurring: formData.isRecurring,
    };

    if (formData.isRecurring) {
      requestData.daysOfWeek = daysOfWeek;
    } else {
      requestData.specificDate = formData.specificDate;
    }

    if (editingIndex !== null) {
      updateAvailability({
        id: availabilities[editingIndex].id,
        data: requestData,
      });
    } else {
      createAvailability(requestData);
    }
    resetForm();
  };

  return {
    editingIndex,
    error,
    register,
    handleSubmit,
    errors,
    handleDaysChange,
    handleEdit,
    resetForm,
    isRecurring,
    daysOfWeek,
    onSubmit,
  };
};
