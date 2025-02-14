import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const RunModel = ({ dataset, preprocessing, selectedModel, selectedMetrics }) => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRunModel = async () => {
      if (!dataset || !selectedModel || selectedMetrics.length === 0) {
      alert("Please complete all steps before running the model.");
      return;
    }

    setLoading(true);

    // Prepare data for API request
    const formData = new FormData();
    formData.append("dataset", dataset);
    formData.append("preprocessing", JSON.stringify(preprocessing));
    formData.append("selectedModel", selectedModel);
    formData.append("selectedMetrics", JSON.stringify(selectedMetrics));

    try {
        const response = await axios.post(`${API_BASE_URL}/run-model`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
      setResults(response.data);
    } catch (error) {
      console.error("Error running model:", error);
      alert("Failed to run model.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h3 className="font-bold text-lg">Run Model</h3>
      <button
        onClick={handleRunModel}
        className="bg-green-500 text-white px-4 py-2 rounded mt-2"
        disabled={loading}
      >
        {loading ? "Running..." : "Run Model"}
      </button>

      {results && (
  <div className="mt-4 bg-gray-100 p-4 rounded">
    <h4 className="font-semibold">Results:</h4>
    <pre className="text-sm">{JSON.stringify(results, null, 2)}</pre>

    {results["Feature Importance"] && (
      <div className="mt-4">
        <h4 className="font-semibold">Feature Importance:</h4>
        <ul>
          {Object.entries(results["Feature Importance"]).map(([feature, importance]) => (
            <li key={feature} className="text-sm">
              {feature}: <span className="font-bold">{importance}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
)}
    </div>
  );
};

export default RunModel;
