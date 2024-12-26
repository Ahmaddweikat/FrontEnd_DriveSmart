import { useState, useMemo } from "react";
import DayMapping from "../../../../constants/dayMapping";

const useAvailabilityFilters = (availabilities) => {
  const [filters, setFilters] = useState({
    trainer: "",
    car: "",
    days: [],
    startTime: "",
  });

  // Get unique trainers and cars
  const trainers = useMemo(
    () =>
      Array.from(
        new Map(availabilities.map((a) => [a.Trainer.id, a.Trainer])).values()
      ),
    [availabilities]
  );

  const cars = useMemo(
    () =>
      Array.from(
        new Map(
          availabilities.flatMap((a) => a.cars.map((c) => [c.id, c]))
        ).values()
      ),
    [availabilities]
  );

  const filteredAvailabilities = useMemo(() => {
    return availabilities.filter((availability) => {
      const trainerMatch =
        !filters.trainer || availability.Trainer.id === filters.trainer;
      const carMatch =
        !filters.car ||
        availability.cars.some(
          (car) => `${car.manufacturer} ${car.model}` === filters.car
        );
      const dayMatch =
        filters.days.length === 0 ||
        availability.daysOfWeek.some((day) => filters.days.includes(day));
      const timeMatch =
        !filters.startTime ||
        availability.startTime.includes(filters.startTime);

      return trainerMatch && carMatch && dayMatch && timeMatch;
    });
  }, [filters, availabilities]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClearFilter = (field) => {
    setFilters((prev) => ({
      ...prev,
      [field]: Array.isArray(prev[field]) ? [] : "",
    }));
  };

  return {
    filters,
    trainers,
    cars,
    filteredAvailabilities,
    handleFilterChange,
    handleClearFilter,
  };
};

export default useAvailabilityFilters;
