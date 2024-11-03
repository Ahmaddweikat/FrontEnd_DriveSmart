import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faUnlock,
  faMapMarkerAlt, // Add map marker icon for address
  faCity, // Add city icon
} from "@fortawesome/free-solid-svg-icons"; // Import necessary icons
import Button from "./SignUpButton";

function InputField({ onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    street: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset error message
    setError("");

    // Validate email format using regex pattern
    const emailPattern =
      /^(?![0-9!#$%&'*+/=?^_`{|}~-])([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address!"); // Set an error message
      return; // Stop the form submission
    }

    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match!"); // Set an error message
      return; // Stop the form submission
    }

    // Ensure the user agrees to terms
    if (!terms) {
      setError("You must agree to the Terms of Use."); // Set an error message
      return; // Stop the form submission
    }

    // Call the onSubmit prop with the collected form data
    onSubmit({ firstName, lastName, email, password, ...formData });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      {/* First Name and Last Name */}
      <div className="relative mb-2">
        <div className="relative mb-2">
          <label
            className="block font-serif font-medium text-gray-700 text-left mb-2"
            htmlFor="firstName"
          >
            Full Name
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="Ahmad Dweikat"
            value={firstName} // Bind the first name state
            onChange={(e) => setFirstName(e.target.value)} // Handle first name change
            className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-600 hover:border-customGreen"
            required // Mark as required
          />
          <span className="absolute right-3 top-8 text-gray-400 mt-3">
            <FontAwesomeIcon icon={faUser} />
          </span>
        </div>
        {/* <div className="relative mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            value={lastName} // Bind the last name state
            onChange={(e) => setLastName(e.target.value)} // Handle last name change
            className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required // Mark as required
          />
          <span className="absolute right-3 top-8 text-gray-400">
            <FontAwesomeIcon icon={faUser} />
          </span>
        </div> */}
      </div>

      {/* Email Field */}
      <div className="relative mb-2">
        <label
          className="block text-sm font-medium text-gray-700 text-left"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email address..."
          value={email} // Bind the email state
          onChange={(e) => setEmail(e.target.value)} // Handle email change
          className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-600 hover:border-customGreen"
          required // Mark as required
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" // Regex for email validation
        />
        <span className="absolute right-3 top-8 text-gray-400">
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
      </div>

      {/* Password and Confirm Password */}
      <div className="grelative mb-2">
        <div className="relative mb-4">
          <label
            className="block text-sm font-medium text-gray-700 text-left"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Password..."
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Handle password change
            className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-600 hover:border-customGreen"
            required // Mark as required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            className="absolute right-3 top-8 text-gray-400"
          >
            <FontAwesomeIcon icon={showPassword ? faUnlock : faLock} />
          </button>
        </div>
        <div className="relative mb-4">
          <label
            className="block text-sm font-medium text-gray-700 text-left"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            placeholder="Confirm Password..."
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Handle confirm password change
            className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-700 hover:border-customGreen"
            required // Mark as required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle password visibility
            className="absolute right-3 top-8 text-gray-400"
          >
            <FontAwesomeIcon icon={showConfirmPassword ? faUnlock : faLock} />
          </button>
        </div>
      </div>
      {/* Gender Field */}
      {/* <div className="mb-2">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="gender"
        >
          Gender
        </label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 sm:text-sm"
          required // Mark as required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div> */}
      {/* Address Fields */}
      {/* <div className="grid grid-cols-1 gap-4 mt-2">
        <div className="relative mb-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="city"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required // Mark as required
          />
          <span className="absolute right-3 top-8 text-gray-400">
            <FontAwesomeIcon icon={faCity} />
          </span>
        </div>
        <div className="relative mb-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="street"
          >
            Street
          </label>
          <input
            type="text"
            id="street"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required // Mark as required
          />
          <span className="absolute right-3 top-8 text-gray-400">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </span>
        </div>
      </div> */}

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex items-center space-x-2 mb-4">
        <input
          type="checkbox"
          id="terms"
          checked={terms}
          onChange={() => setTerms(!terms)} // Handle terms change
          className="form-checkbox"
          required // Mark as required
        />
        <label htmlFor="terms" className="text-sm">
          I agree to the Terms of Use
        </label>
      </div>

      {/* Sign Up Button */}
      <Button type="submit" text="Sign Up" />
    </form>
  );
}

export default InputField;
