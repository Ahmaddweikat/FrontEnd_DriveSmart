import React from "react";

export function TrainerCarSelection({
  selectedTrainer,
  selectedCar,
  handleTrainerSelect,
  setSelectedCar,
  trainers,
  cars,
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-gray-600 font-semibold mb-2 mt-4">
          Select Trainer
        </label>
        <select
          value={selectedTrainer}
          onChange={(e) => handleTrainerSelect(e.target.value)}
          className="w-3/4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen bg-white"
        >
          <option value="">Select a trainer</option>
          {trainers.map((trainer, index) => (
            <option key={index} value={trainer}>
              {trainer}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-600 font-semibold mb-2 mt-4">
          Select Car
        </label>
        <select
          value={selectedCar}
          onChange={(e) => setSelectedCar(e.target.value)}
          className="w-3/4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen bg-white"
        >
          <option value="">Select a car</option>
          {cars.map((car, index) => (
            <option key={index} value={car}>
              {car}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
