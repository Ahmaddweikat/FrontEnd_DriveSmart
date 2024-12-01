const useFilteredLessons = (lessons, selectedRating) => {
  const filteredLessons = lessons.filter((lesson) =>
    selectedRating ? lesson.rating === selectedRating : true
  );

  return filteredLessons;
};

export default useFilteredLessons;
