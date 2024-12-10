import React from "react";
import { motion } from "framer-motion";
import {
  FaUserTie,
  FaEnvelope,
  FaIdCard,
  FaClock,
  FaCar,
  FaLock,
} from "react-icons/fa";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trainerSignUpSchema } from './schemas/signUpValidationSchema';

const SignUpPage = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(trainerSignUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      licenseNumber: '',
      experience: '',
      licenseTypes: [],
    },
  });
  

  const onSubmit = async (data) => {
    console.log('Submitted Data:', data);
    
  };

  const licenseTypeOptions = [
    { id: "MOTORCYCLE", label: "Motorcycle" },
    { id: "TRACTOR", label: "Tractor" },
    { id: "PRIVATE", label: "Personal Vehicle" },
    { id: "COMMERCIAL", label: "Commercial Vehicle" },
    { id: "PUBLIC", label: "Public Transport" },
    { id: "HEAVY", label: "Heavy Vehicle" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        {/* Left Side - Branding & Motivation */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-12 flex flex-col justify-center text-white">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl font-bold mb-4">
              Drive Your Career Forward
            </h1>
            <p className="text-xl mb-6 font-light">
              Join our community of professional driving instructors and make a
              lasting impact
            </p>

            <div className="space-y-4 mt-8">
              <div className="flex items-center space-x-4">
                <FaUserTie className="text-3xl text-yellow-300" />
                <div>
                  <h3 className="font-semibold">Professional Development</h3>
                  <p className="text-sm text-gray-200">
                    Continuous training and support
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FaCar className="text-3xl text-green-300" />
                <div>
                  <h3 className="font-semibold">Flexible Opportunities</h3>
                  <p className="text-sm text-gray-200">
                    Work on your own terms
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                Instructor Registration
              </h2>
              <p className="text-gray-500 mt-2">
                Create your professional profile
              </p>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <div className="flex items-center">
                  <FaUserTie className="absolute left-3 text-gray-400" />
                  <Controller
                    control={control}
                    name="firstName"
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter first name"
                      />
                    )}
                  />
                </div>
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <div className="flex items-center">
                  <FaUserTie className="absolute left-3 text-gray-400" />
                  <Controller
                    control={control}
                    name="lastName"
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter last name"
                      />
                    )}
                  />
                </div>
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
              </div>
            </div>

            {/* Email Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="flex items-center">
                <FaEnvelope className="absolute left-3 text-gray-400" />
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <input
                      type="email"
                      {...field}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="you@example.com"
                    />
                  )}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="flex items-center">
                  <FaLock className="absolute left-3 text-gray-400" />
                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <input
                        type="password"
                        {...field}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter password"
                      />
                    )}
                  />
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <div className="flex items-center">
                  <FaLock className="absolute left-3 text-gray-400" />
                  <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <input
                        type="password"
                        {...field}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Confirm password"
                      />
                    )}
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            {/* Professional Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  License Number
                </label>
                <div className="flex items-center">
                  <FaIdCard className="absolute left-3 text-gray-400" />
                  <Controller
                    control={control}
                    name="licenseNumber"
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="DIL123456"
                      />
                    )}
                  />
                </div>
                {errors.licenseNumber && <p className="text-red-500 text-sm">{errors.licenseNumber.message}</p>}
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <div className="flex items-center">
                  <FaClock className="absolute left-3 text-gray-400" />
                  <Controller
                    control={control}
                    name="experience"
                    render={({ field }) => (
                      <input
                        type="number"
                        {...field}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Years of experience"
                        min="0"
                      />
                    )}
                  />
                </div>
                {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
              </div>
            </div>

            {/* License Types */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                License Types
              </label>
              <div className="grid grid-cols-3 gap-4 gap-x-26 gap-y-4">
                {licenseTypeOptions.map(({ id, label }) => (
                  <div key={id} className="flex items-center">
                    <Controller
                      control={control}
                      name="licenseTypes"
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          id={id}
                          name="licenseTypes"
                          value={id}
                          checked={field.value.includes(id)}
                          onChange={(e) => {
                            const value = e.target.checked
                              ? [...field.value, id]
                              : field.value.filter((v) => v !== id);
                            field.onChange(value);
                          }}
                          className="
                            h-4 w-4 
                            text-blue-600 
                            border-gray-300 
                            rounded 
                            focus:ring-blue-500 
                            focus:ring-2 
                            focus:border-blue-500
                          "
                        />
                      )}
                    />
                    <label
                      htmlFor={id}
                      className="
                        ml-3 
                        text-sm 
                        font-medium 
                        text-gray-700 
                        hover:text-blue-600 
                        cursor-pointer
                        transition-colors
                        duration-200
                      "
                    >
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 rounded-lg hover:opacity-90 transition-all"
            >
              Create Account
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
