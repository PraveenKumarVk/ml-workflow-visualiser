import React, { useState } from "react";

const Training = ({ onModelSelect }) => {
  const [selectedTask, setSelectedTask] = useState("Classification");
  const [selectedModel, setSelectedModel] = useState("");

  const models = {
    Classification: ["Logistic Regression", "Decision Tree", "Random Forest", "SVM", "Neural Network"],
    Regression: ["Linear Regression", "Ridge Regression", "Random Forest Regressor", "XGBoost"],
    Clustering: ["K-Means", "DBSCAN", "Agglomerative Clustering"]
  };

  const handleTaskChange = (event) => {
    setSelectedTask(event.target.value);
    setSelectedModel(""); // Reset model when task changes
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
    onModelSelect(event.target.value);
  };

  return (
    <div className="p-2">
      <h3 className="font-bold text-lg">Training</h3>
      <div className="mt-2">
        <label className="font-semibold">Select Task: </label>
        <select
          value={selectedTask}
          onChange={handleTaskChange}
          className="border rounded px-2 py-1 ml-2"
        >
          <option value="Classification">Classification</option>
          <option value="Regression">Regression</option>
          <option value="Clustering">Clustering</option>
        </select>
      </div>

      <div className="mt-2">
        <label className="font-semibold">Select Model: </label>
        <select
          value={selectedModel}
          onChange={handleModelChange}
          className="border rounded px-2 py-1 ml-2"
        >
          <option value="">Select a model</option>
          {models[selectedTask].map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>

      {selectedModel && <p className="mt-2 text-green-600">Selected Model: {selectedModel}</p>}
    </div>
  );
};

export default Training;
