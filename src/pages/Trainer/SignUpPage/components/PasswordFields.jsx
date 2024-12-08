import React, { useState } from 'react';
import { FaLock, FaLockOpen } from 'react-icons/fa';

export const PasswordFields = ({ 
  passwordValue, 
  confirmPasswordValue, 
  onChange 
}) => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => togglePasswordVisibility('password')}
            className="absolute left-3 z-10 text-gray-400 hover:text-blue-600"
          >
            {showPassword.password ? <FaLockOpen /> : <FaLock />}
          </button>
          <input
            type={showPassword.password ? 'text' : 'password'}
            name="password"
            value={passwordValue}
            onChange={onChange}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Create password"
            required
          />
        </div>
      </div>
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => togglePasswordVisibility('confirmPassword')}
            className="absolute left-3 z-10 text-gray-400 hover:text-blue-600"
          >
            {showPassword.confirmPassword ? <FaLockOpen /> : <FaLock />}
          </button>
          <input
            type={showPassword.confirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={confirmPasswordValue}
            onChange={onChange}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Repeat password"
            required
          />
        </div>
      </div>
    </div>
  );
};