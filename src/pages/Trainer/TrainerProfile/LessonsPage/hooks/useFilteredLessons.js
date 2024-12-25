const useFilteredLessons = (lessons, selectedRating, searchTerm = "") => {
  return lessons.filter(lesson => {
      const matchesRating = selectedRating === 0 || lesson.rating === selectedRating;
      const matchesSearchTerm = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                lesson.student.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesRating && matchesSearchTerm;
  });
};

export default useFilteredLessons;