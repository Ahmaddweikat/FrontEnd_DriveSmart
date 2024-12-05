import { z } from "zod";

export const codeSchema = z.object({
  code: z
    .string()
    .length(4, "Code must be exactly 4 digits")
    .regex(/^\d+$/, "Code must contain only numbers"),
});
