import { useState } from "react";

const useEmailForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(""); // Clear error on change
  };

  const validateEmail = () => {
    if (email !== "test@example.com") {
      setError("We cannot find your email.");
      return false;
    }
    return true;
  };

  const resetEmail = () => {
    setEmail("");
    setError("");
  };

  return {
    email,
    error,
    handleEmailChange,
    validateEmail,
    resetEmail,
  };
};

export default useEmailForm;
