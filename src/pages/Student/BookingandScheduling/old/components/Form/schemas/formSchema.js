import { z } from "zod";

export const formSchema = z.object({
  currentStep: z.number().min(0).max(4),
  isComplete: z.boolean(),
});
