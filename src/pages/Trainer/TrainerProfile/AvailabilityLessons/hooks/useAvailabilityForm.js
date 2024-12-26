import { useState } from 'react';
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { availabilitySchema } from "../schema/schema";

export const useAvailabilityForm = () => {
  const initialState = {
    daysOfWeek: [],
    specificDate: "",
    startTime: "",
    isRecurring: true,
  };

  const [lessons, setLessons] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit: validateSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    trigger,  
  } = useForm({
    resolver: joiResolver(availabilitySchema),
    defaultValues: initialState,
    mode: 'onChange',  
  });

  const checkForConflict = (newLesson) => {
    return lessons.some((lesson, index) => {
      if (editingIndex === index) return false;

      if (newLesson.isRecurring && lesson.isRecurring) {
        return newLesson.daysOfWeek.some(day => 
          lesson.daysOfWeek.includes(day) && lesson.startTime === newLesson.startTime
        );
      } else if (!newLesson.isRecurring && !lesson.isRecurring) {
        return lesson.specificDate === newLesson.specificDate && 
               lesson.startTime === newLesson.startTime;
      } else if (newLesson.isRecurring && !lesson.isRecurring) {
        const lessonDate = new Date(lesson.specificDate);
        const dayOfWeek = lessonDate.getDay() || 7;
        return newLesson.daysOfWeek.includes(dayOfWeek) && 
               lesson.startTime === newLesson.startTime;
      } else if (!newLesson.isRecurring && lesson.isRecurring) {
        const newLessonDate = new Date(newLesson.specificDate);
        const dayOfWeek = newLessonDate.getDay() || 7;
        return lesson.daysOfWeek.includes(dayOfWeek) && 
               lesson.startTime === newLesson.startTime;
      } else if (!newLesson.isRecurring) {
        return lessons.some((lesson) => lesson.specificDate === newLesson.specificDate && lesson.startTime === newLesson.startTime);
      }
      return false;
    });
  };

  const handleDaysChange = async (day) => {
    setError("");
    const daysOfWeek = watch("daysOfWeek") || [];
    const newDays = daysOfWeek.includes(day)
      ? daysOfWeek.filter((d) => d !== day)
      : [...daysOfWeek, day];
    await setValue("daysOfWeek", newDays, { shouldValidate: true });
    trigger("daysOfWeek");
  };

  const handleSubmit = (onSubmitCallback) => {
    const handleFormSubmit = (data) => {
      const currentTime = new Date('2024-12-26T16:56:15+02:00');
      let specificDate = null;
      let daysOfWeek = [];

      if (!data.isRecurring && data.specificDate) {
        specificDate = new Date(data.specificDate).toISOString().split('T')[0];
        const dayOfWeek = new Date(data.specificDate).getDay();
        daysOfWeek = [dayOfWeek === 0 ? 7 : dayOfWeek];
      } else if (data.isRecurring) {
        daysOfWeek = data.daysOfWeek;
      }

      const formattedData = {
        ...data,
        startTime: data.startTime || currentTime.toLocaleTimeString().split(' ')[0],
        specificDate,
        daysOfWeek
      };

      if (checkForConflict(formattedData)) {
        setError("A lesson already exists at this time slot");
        return;
      }

      const availabilityData = {
        availability: {
          daysOfWeek: formattedData.daysOfWeek,
          id: "2c2174c9-1999-4d03-82d2-78663df60d29",
          isBooked: false,
          isRecurring: formattedData.isRecurring,
          startTime: formattedData.startTime,
          TrainerId: "3c66f0f0-5cbb-4bd8-b9f9-70b0020d42fc",
        }
      };

      console.log('data = ', JSON.stringify(availabilityData, null, 4));

      onSubmitCallback(formattedData, availabilityData);
      
      // Reset form
      setError("");
      setValue("daysOfWeek", []);
      setValue("specificDate", "");
      setValue("startTime", "");
    };

    return validateSubmit(handleFormSubmit);
  };

  const handleEdit = (index) => {
    setError("");
    const lessonToEdit = lessons[index];
    reset({
      ...lessonToEdit,
      specificDate: lessonToEdit.specificDate || '',
      isRecurring: lessonToEdit.isRecurring,
    });
    setEditingIndex(index);
  };

  const handleCancel = (index) => {
    setLessons(prev => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setEditingIndex(null);
    setError("");
    reset(initialState);
  };

  return {
    lessons,
    setLessons,
    editingIndex,
    error,
    register,
    handleSubmit,
    errors,
    watch,
    handleDaysChange,
    handleEdit,
    handleCancel,
    resetForm,
    isRecurring: watch("isRecurring"),
    daysOfWeek: watch("daysOfWeek") || [],
  };
};
