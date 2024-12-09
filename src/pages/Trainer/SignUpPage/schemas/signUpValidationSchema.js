import { z } from "zod";

export const trainerSignUpSchema = z
  .object({
    // Personal Information
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),

    // Password Fields
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

    // Professional Details
    licenseNumber: z
      .string()
      .min(6, "License number must be at least 6 characters")
      .regex(
        /^DIL[0-9]+$/,
        "License number must start with DIL followed by numbers"
      ),

    experience: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z
        .number()
        .min(0, "Experience cannot be negative")
        .max(50, "Please enter a valid years of experience")
    ),

    // License Types
    licenseTypes: z
      .array(
        z.enum([
          "MOTORCYCLE",
          "TRACTOR",
          "PRIVATE",
          "COMMERCIAL",
          "PUBLIC",
          "HEAVY",
        ])
      )
      .min(1, "Select at least one license type"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
