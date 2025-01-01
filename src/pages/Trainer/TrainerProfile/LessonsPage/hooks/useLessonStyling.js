const useLessonStyling = () => {
  const getLessonStatusStyle = (status, date) => {
    const lessonDate = new Date(date);
    lessonDate.setHours(0, 0, 0, 0);
    
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (status === "canceled") {
      return "border-l-4 border-red-600";
    }

    if (status === "completed") {
      return "border-l-4 border-green-500";
    }

    // For upcoming lessons
    if (lessonDate >= currentDate && status === "upcoming") {
      return "border-l-4 border-blue-500";
    }

    // For out of date lessons
    if (lessonDate < currentDate && status === "out of date") {
      return "border-l-4 border-red-600";
    }

    return "border-l-4 border-gray-500";
  };

  const getStatusTextColor = (status, date) => {
    const lessonDate = new Date(date);
    lessonDate.setHours(0, 0, 0, 0);
    
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (status === "canceled") {
      return "text-red-600";
    }

    if (status === "completed") {
      return "text-green-500";
    }

    // For upcoming lessons
    if (lessonDate >= currentDate && status === "upcoming") {
      return "text-blue-500";
    }

    // For out of date lessons
    if (lessonDate < currentDate && status === "out of date") {
      return "text-red-600";
    }

    return "text-gray-500";
  };

  return {
    getLessonStatusStyle,
    getStatusTextColor,
  };
};

export default useLessonStyling;
