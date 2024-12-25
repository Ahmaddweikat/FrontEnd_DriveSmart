const useLessonStyling = () => {
  const getLessonStatusStyle = (status, date) => {
    const currentDate = new Date();
    const lessonDate = new Date(date);

    if (
      lessonDate < currentDate &&
      status !== "completed" &&
      status !== "canceled"
    ) {
      return "border-l-4 border-red-500"; // Out of date
    }

    switch (status) {
      case "upcoming":
        return "border-l-4 border-blue-500";
      case "completed":
        return "border-l-4 border-green-500";
      case "canceled":
        return "border-l-4 border-red-500";
      default:
        return "";
    }
  };

  const getStatusTextColor = (status, date) => {
    const isOutOfDate = new Date(date) < new Date() &&
      status !== "completed" &&
      status !== "canceled";

    if (isOutOfDate || status === "canceled") return "text-red-500";
    if (status === "upcoming") return "text-blue-500";
    if (status === "completed") return "text-green-500";
    return "";
  };

  return {
    getLessonStatusStyle,
    getStatusTextColor
  };
};

export default useLessonStyling;
