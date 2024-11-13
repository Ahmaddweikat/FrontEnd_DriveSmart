import { useState } from "react";

const useNewPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(""); // Clear error on change
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError(""); // Clear error on change
  };

  const validatePasswords = () => {
    if (password === "" || confirmPassword === "") {
      setError("Both fields are required.");
      return false;
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess(false);
  };

  return {
    password,
    confirmPassword,
    error,
    success,
    setSuccess, // Expose setSuccess
    handlePasswordChange,
    handleConfirmPasswordChange,
    validatePasswords,
    resetForm,
  };
};

export default useNewPasswordForm;
