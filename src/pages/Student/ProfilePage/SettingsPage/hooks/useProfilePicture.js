import { useState } from "react";

const useProfilePicture = () => {
  const [profilePicture, setProfilePicture] = useState(
    "/path/to/profile-picture.jpg"
  );
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Update selected image state
      };
      reader.readAsDataURL(file); // Convert the file to a base64 URL
    }
  };

  const handleSave = () => {
    if (selectedImage) {
      setProfilePicture(selectedImage); // Update profile picture on save
      // Optionally reset selectedImage if needed
    }
  };

  return {
    profilePicture,
    selectedImage,
    handleImageChange,
    handleSave,
  };
};

export default useProfilePicture;
