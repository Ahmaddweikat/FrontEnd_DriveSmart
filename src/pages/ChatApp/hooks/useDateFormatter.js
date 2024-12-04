export const useDateFormatter = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "long" };
    return date.toLocaleDateString("en-UK", options);
  };

  return { formatDate };
};
