import { z } from "zod";

// Step 1 Schema
export const step1Schema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    city: z.string().min(2, "City is required"),
    phoneNumber: z
      .string()
      .regex(
        /^(59|56)\d{7}$/,
        "Phone number must start with 59 or 56 and have 9 digits total"
      ),
    gender: z.enum(["male", "female"], {
      required_error: "Gender is required",
      invalid_type_error: "Gender must be either male or female",
    }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Step 2 Schema
export const step2Schema = z.object({
  bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    required_error: "Blood type is required",
  }),
  studentId: z.string().regex(/^\d{9}$/, "Student ID must be exactly 9 digits"),
});
