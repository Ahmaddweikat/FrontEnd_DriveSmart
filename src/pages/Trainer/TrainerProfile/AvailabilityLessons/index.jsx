import React from "react";
import { useAvailabilityForm } from "./hooks/useAvailabilityForm";
import { AvailabilityForm } from "./components/AvailabilityForm";
import { AvailabilityTable } from "./components/AvailabilityTable";
import ProfilePanel from "./components/ProfilePanel";

const Availability = () => {
  const {
    lessons,
    setLessons,
    editingIndex,
    error,
    register,
    handleSubmit,
    errors,
    handleDaysChange,
    handleEdit,
    handleCancel,
    resetForm,
    isRecurring,
    daysOfWeek,
  } = useAvailabilityForm();

  const onSubmit = (formattedData, availabilityData) => {
    if (editingIndex !== null) {
      setLessons(prev => {
        const newLessons = [...prev];
        newLessons[editingIndex] = formattedData;
        return newLessons;
      });
    } else {
      setLessons((prev) => [...prev, formattedData]);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <ProfilePanel totalLicenses={3} />
            </div>

            <div className="space-y-8">
              <AvailabilityForm 
                register={register}
                errors={errors}
                handleSubmit={handleSubmit(onSubmit)}
                handleDaysChange={handleDaysChange}
                isRecurring={isRecurring}
                daysOfWeek={daysOfWeek}
                error={error}
                editingIndex={editingIndex}
                resetForm={resetForm}
              />

              <AvailabilityTable 
                lessons={lessons} 
                handleEdit={handleEdit}
                handleCancel={handleCancel}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Availability;