import React, { useState, useEffect } from "react";

const Evaluation = ({ selectedModel, onMetricsChange }) => {
  const [metrics, setMetrics] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState([]);

  const evaluationMetrics = {
    Classification: ["Accuracy", "Precision", "Recall", "F1-Score", "ROC-AUC"],
    Regression: ["Mean Squared Error", "Mean Absolute Error", "R-Squared"],
    Clustering: ["Silhouette Score", "Davies-Bouldin Index", "Calinski-Harabasz Index"],
  };

  useEffect(() => {
    if (selectedModel) {
      const taskType = selectedModel.includes("Regression")
        ? "Regression"
        : selectedModel.includes("Clustering")
        ? "Clustering"
        : "Classification";

      setMetrics(evaluationMetrics[taskType]);
      setSelectedMetrics([]); // Reset previous selections
    }
  }, [selectedModel]);

  useEffect(() => {
    onMetricsChange(selectedMetrics); // Ensure parent receives updated metrics
  }, [selectedMetrics, onMetricsChange]);

  const handleMetricChange = (metric) => {
    setSelectedMetrics((prev) =>
      prev.includes(metric) ? prev.filter((m) => m !== metric) : [...prev, metric]
    );
  };

  return (
    <div className="p-2">
      <h3 className="font-bold text-lg">Evaluation</h3>
      {selectedModel ? (
        <div>
          <p className="text-sm text-gray-600">Metrics for {selectedModel}:</p>
          {metrics.map((metric) => (
            <label key={metric} className="block mt-1">
              <input
                type="checkbox"
                value={metric}
                checked={selectedMetrics.includes(metric)}
                onChange={() => handleMetricChange(metric)}
                className="mr-2"
              />
              {metric}
            </label>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">Select a model first to see evaluation options.</p>
      )}

      {selectedMetrics.length > 0 && (
        <p className="mt-2 text-green-600">Selected Metrics: {selectedMetrics.join(", ")}</p>
      )}
    </div>
  );
};

export default Evaluation;
