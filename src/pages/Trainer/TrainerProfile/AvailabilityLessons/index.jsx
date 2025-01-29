import React, { useState } from "react";
import ConfirmModal from "../../../../components/modals/ConfirmModal";
import { AvailabilityForm } from "./components/AvailabilityForm";
import { AvailabilityTable } from "./components/AvailabilityTable";
import { useAvailabilityForm } from "./hooks/useAvailabilityForm";
import { useTrainerAvailability } from "./hooks/useTrainerAvailability";

const Availability = () => {
  const {
    editingIndex,
    error,
    register,
    handleSubmit,
    errors,
    handleDaysChange,
    handleEdit,
    resetForm,
    isRecurring,
    daysOfWeek,
    onSubmit,
  } = useAvailabilityForm();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const { availabilities, isLoading, deleteAvailability } =
    useTrainerAvailability();

  const handleDeleteClick = (index) => {
    setSelectedIndex(index);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteAvailability(availabilities[selectedIndex].id);
    setShowDeleteModal(false);
    setSelectedIndex(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedIndex(null);
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-gray-100">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
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
                  lessons={availabilities}
                  handleEdit={handleEdit}
                  handleCancel={handleDeleteClick}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Availability"
        message="Are you sure you want to delete this availability?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default Availability;
