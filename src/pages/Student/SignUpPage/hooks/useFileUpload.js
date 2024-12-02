import { useState } from "react";

const useFileUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);

    if (file.type === "application/pdf") {
      setFileContent(URL.createObjectURL(file));
    } else if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setFileContent(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return { uploadedFile, fileContent, handleFileUpload };
};

export default useFileUpload;
