import { useState } from "react";

const useFileUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileContent(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return { uploadedFile, fileContent, handleFileUpload };
};

export default useFileUpload;
