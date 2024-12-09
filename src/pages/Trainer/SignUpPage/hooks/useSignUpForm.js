import { useState } from "react";
import { trainerSignUpSchema } from "../schemas/signUpValidationSchema";

export const useSignUpForm = (initialState = {}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    licenseNumber: "",
    experience: "", // Initialize as empty string
    licenseTypes: [],
    ...initialState,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        licenseTypes: checked
          ? [...prev.licenseTypes, value]
          : prev.licenseTypes.filter((type) => type !== value),
      }));
    } else if (name === "experience") {
      // Handle experience field separately
      const numValue = value === "" ? "" : parseInt(value, 10);
      setFormData((prev) => ({
        ...prev,
        [name]: numValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Basic validation
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (formData.licenseTypes.length === 0) {
      errors.licenseTypes = "Please select at least one license type";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data before validation:", formData);
    console.log("Experience type:", typeof formData.experience);

    try {
      const validatedData = trainerSignUpSchema.parse(formData);
      console.log("Validated data:", validatedData);
    } catch (error) {
      console.error("Validation errors:", error.errors);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    validateForm,
  };
};
