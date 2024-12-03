import { z } from "zod";

export const bookingSchema = z
  .object({
    trainer: z.string(),
    car: z.string().nullable(),
    date: z.date().nullable(),
    time: z.string().nullable(),
    selectedDays: z.array(z.string()),
    selectedCars: z.record(z.string(), z.array(z.string())).nullable(),
  })
  .refine(
    (data) => {
      // First tab validation
      if (data.date !== null) {
        return data.trainer && data.car && data.date && data.time;
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
