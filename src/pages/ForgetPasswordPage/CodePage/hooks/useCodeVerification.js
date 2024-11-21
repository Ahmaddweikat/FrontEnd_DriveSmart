import { useState } from "react";

const useCodeVerification = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCode(e.target.value);
    if (error) {
      setError(""); // Clear error on change
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      setError("Please enter a valid 6-digit code.");
    } else {
      setError("");
    }
  };

  return {
    code,
    error,
    handleChange,
    handleSubmit,
  };
};

export default useCodeVerification;
