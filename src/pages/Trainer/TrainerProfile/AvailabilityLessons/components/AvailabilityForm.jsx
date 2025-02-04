import React from "react";
import DayMapping from "../../../../../constants/dayMapping";

export const AvailabilityForm = ({
  register,
  errors,
  handleSubmit,
  handleDaysChange,
  isRecurring,
  daysOfWeek,
  error,
  editingIndex,
  resetForm,
}) => {
  console.log("🚀 ~ daysOfWeek:", daysOfWeek)
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        {editingIndex !== null ? "Edit availability" : "Create Your availability"}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              {...register("isRecurring")}
              className="form-checkbox h-5 w-5 text-customGreen rounded"
            />
            <span className="ml-2 text-gray-700">Recurring Lesson</span>
          </label>
        </div>

        {errors.isRecurring && (
          <p className="text-red-500 text-sm">{errors.isRecurring.message}</p>
        )}

        {isRecurring && (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-3">
              {Object.entries(DayMapping).map(([value, label]) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => handleDaysChange(Number(value))}
                  className={`px-6 py-2 rounded-full transition-all duration-200 ${
                    daysOfWeek.includes(Number(value))
                      ? "bg-customGreen text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {errors.daysOfWeek && (
              <p className="text-red-500 text-sm">
                {errors.daysOfWeek.message}
              </p>
            )}
          </div>
        )}

        {!isRecurring && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700">
              Select Date
              <input
                type="date"
                {...register("specificDate")}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-customGreen focus:ring-customGreen"
              />
            </label>
            {errors.specificDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.specificDate.message}
              </p>
            )}
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm font-medium text-gray-700">
            Start Time
            <input
              type="time"
              {...register("startTime")}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-customGreen focus:ring-customGreen"
            />
          </label>
          {errors.startTime && (
            <p className="text-red-500 text-sm mt-1">
              {errors.startTime.message}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-customGreen text-white py-3 px-4 rounded-xl hover:bg-customGreen/90 transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {editingIndex !== null ? "Save Changes" : "Create Lesson"}
          </button>
          {editingIndex !== null && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
