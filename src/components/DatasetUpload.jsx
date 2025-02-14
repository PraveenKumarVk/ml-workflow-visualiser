import React, { useState } from "react";

const DatasetUpload = ({ onFileUpload }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input type="file" accept=".csv" onChange={handleFileChange} className="hidden" id="datasetUpload" />
      <label htmlFor="datasetUpload" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md">
        Upload CSV
      </label>
      {fileName && <p className="mt-2 text-sm">{fileName}</p>}
    </div>
  );
};

export default DatasetUpload;
