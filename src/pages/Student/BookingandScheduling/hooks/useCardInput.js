import { useState } from "react";

export const useCardInput = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    value = value.slice(0, 16); // Limit to 16 characters
    // Format with spaces after every 4 digits
    value = value.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(value);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3); // Limit to 3 characters
    setCvv(value);
  };

  return {
    cardNumber,
    cvv,
    handleCardNumberChange,
    handleCvvChange,
  };
};
