import { z } from "zod";

export const bookingSchema = z
  .object({
    trainer: z.string(),
    car: z.string().nullable(),
    selectedDates: z.record(z.string(), z.string().nullable()),
    selectedDays: z.array(z.string()),
    selectedCars: z.record(z.string(), z.array(z.string())).nullable(),
  })
  .refine(
    (data) => {
      // First tab validation
      if (Object.keys(data.selectedDates).length > 0) {
        return data.trainer && 
               data.car && 
               Object.values(data.selectedDates).every(time => time !== null);
      }
      // Second tab validation
      return (
        data.trainer && 
        data.selectedDays.length > 0 && 
        data.selectedCars !== null
      );
    },
    {
      message: "Please fill in all required fields",
    }
  );