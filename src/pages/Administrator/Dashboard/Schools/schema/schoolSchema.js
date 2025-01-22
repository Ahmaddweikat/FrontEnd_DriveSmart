import { z } from "zod";

export const schoolSchema = z.object({
  name: z.string().min(1, "School name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  description: z.string().optional(),
  phone: z.string().min(1, "Phone number is required"),
  website: z.string().optional(),
  email: z.string().email("Invalid email address"),
  managerId: z.string().min(1, "Manager ID is required"),
  logo: z.string().url("Invalid logo URL").optional(),
});
