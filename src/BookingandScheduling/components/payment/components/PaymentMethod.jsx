import React, { useState } from "react";
import visa from "./images/visa.svg";
import cash from "./images/cash.svg";
import mastercard from "./images/mastercard.svg";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"; // Import Button component
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("CreditCard");
  const [date, setDate] = useState("");
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

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md font-sans">
      <div className="flex border border-gray-300 rounded-lg overflow-hidden">
        {/* Payment Methods Sidebar */}
        <div className="w-1/3 border-r border-gray-300 bg-gray-50 flex flex-col">
          <button
            className={`flex justify-between items-center p-4 text-left font-semibold ${
              paymentMethod === "CreditCard"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setPaymentMethod("CreditCard")}
          >
            <span>Credit card</span>
            <div className="flex space-x-2">
              <img src={visa} alt="Visa" className="w-8" />
              <img src={mastercard} alt="Mastercard" className="w-8" />
            </div>
          </button>

          <button
            className={`flex justify-between items-center p-4 text-left font-semibold ${
              paymentMethod === "PayLater"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setPaymentMethod("PayLater")}
          >
            <span>Pay after lesson</span>
            <img src={cash} alt="cash" className="w-8" />
          </button>
        </div>

        {/* Payment Form */}
        <div className="flex-1 p-6">
          <p className="text-lg font-medium text-gray-800 mb-4">
            Amount being paid now:{" "}
            <span className="font-bold text-black">$115.50</span>
          </p>

          {paymentMethod === "CreditCard" && (
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Cardholder's name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Name on card"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Card number
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="XXXX XXXX XXXX XXXX"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                />
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Expiration date
                  </label>
                  <div className="flex space-x-2">
                    <FormControl
                      sx={{ minWidth: 120, marginTop: "8px" }}
                      size="small"
                    >
                      <InputLabel
                        id="month-select-label"
                        className="text-center mt-1"
                      >
                        Month
                      </InputLabel>
                      <Select
                        sx={{ height: "56px" }}
                        labelId="month-select-label"
                        id="month-select"
                        value={date}
                        label="Month"
                        onChange={(e) => setDate(e.target.value)}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {[...Array(12)].map((_, index) => (
                          <MenuItem key={index + 1} value={index + 1}>
                            {index + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DatePicker"]}
                        sx={{ marginBottom: "25px" }}
                      >
                        <DatePicker
                          label="Year"
                          views={["year"]}
                          openTo="year"
                          sx={{ minWidth: 120 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-600 mt-1">
                    CVV code
                  </label>
                  <TextField
                    id="cvv-code"
                    label="CVV"
                    variant="outlined"
                    size="small"
                    value={cvv}
                    onChange={handleCvvChange}
                    sx={{
                      minWidth: 120,
                      marginRight: "45px",
                      marginTop: "12px",
                      "& .MuiInputBase-root": {
                        height: "55px", // This targets the height of the input field
                      },
                    }}
                    InputLabelProps={{
                      className: "flex items-center justify-center w-full mt-2", // This centers the label horizontally
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "PayPal" && (
            <div className="text-gray-600 text-base mt-4">Pay with PayPal</div>
          )}

          {paymentMethod === "PayLater" && (
            <div className="text-gray-600 text-base mt-4">
              Pay later options
            </div>
          )}

          {/* Finish Button */}
          <div className="mt-6 flex justify-end">
            <Button
              variant="outlined"
              endIcon={<CheckCircleIcon />}
              onClick={() => alert("Payment Finished!")}
              sx={{
                color: "#72b626",
                borderColor: "#72b626",
              }}
            >
              Finish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
