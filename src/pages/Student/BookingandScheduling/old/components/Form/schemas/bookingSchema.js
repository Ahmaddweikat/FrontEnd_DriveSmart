import { z } from "zod";

export const bookingSchema = z
  .object({
    trainer: z.string(),
    car: z.string().nullable(),
    selectedDates: z.record(
      z.string(),
      z.object({
        time: z.string().nullable(),
        car: z.string()
      })
    ),
    selectedDays: z.array(z.string()),
    selectedCars: z.record(z.string(), z.string()),
  })
  .refine(
    (data) => {
      // First tab validation
      if (Object.keys(data.selectedDates).length > 0) {
        return data.trainer && 
               data.selectedDates && 
               Object.values(data.selectedDates).every(
                 dateData => dateData.time !== null && dateData.car
               );
      }
      // Second tab validation
      if (data.selectedDays.length > 0) {
        const datesFromDays = {};
        data.selectedDays.forEach(day => {
          if (data.selectedCars[day]) {
            datesFromDays[day] = {
              time: data.selectedTimeInput,
              car: data.selectedCars[day]
            };
          }
        });
        return data.trainer && 
               Object.keys(datesFromDays).length === data.selectedDays.length;
      }
      return false;
    },
    {
      message: "Please fill in all required fields",
    }
  );