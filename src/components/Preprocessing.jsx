import React, { useState, useEffect } from "react";

const Preprocessing = ({ dataset, onPreprocessingChange }) => {
  const [columns, setColumns] = useState([]);
  const [selectedPreprocessing, setSelectedPreprocessing] = useState({});

  // Extract column names from dataset (assuming CSV format)
  useEffect(() => {
    if (dataset) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const lines = event.target.result.split("\n");
        const headers = lines[0].split(",");
        setColumns(headers);
        const initialPreprocessing = headers.reduce((acc, col) => ({ ...acc, [col]: "None" }), {});
        setSelectedPreprocessing(initialPreprocessing);
        onPreprocessingChange(initialPreprocessing); // Ensure parent receives initial state
      };
      reader.readAsText(dataset);
    }
  }, [dataset, onPreprocessingChange]);

  // Handle preprocessing selection
  const handlePreprocessingChange = (column, method) => {
    setSelectedPreprocessing((prev) => {
      const updated = { ...prev, [column]: method };
      onPreprocessingChange(updated); // Ensure parent receives updates
      return updated;
    });
  };

  return (
    <div className="p-2">
      <h3 className="font-bold text-lg">Preprocessing</h3>
      {columns.length === 0 ? (
        <p className="text-sm text-gray-500">Upload a dataset to see columns.</p>
      ) : (
        <table className="w-full mt-2 border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Column</th>
              <th className="border p-2">Preprocessing</th>
            </tr>
          </thead>
          <tbody>
            {columns.map((col) => (
              <tr key={col}>
                <td className="border p-2">{col}</td>
                <td className="border p-2">
                  <select
                    value={selectedPreprocessing[col]}
                    onChange={(e) => handlePreprocessingChange(col, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="None">None</option>
                    <option value="Drop">Drop</option>
                    <option value="Fill Mean">Fill Mean</option>
                    <option value="Fill Median">Fill Median</option>
                    <option value="Normalize">Normalize</option>
                    <option value="One-Hot Encode">One-Hot Encode</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Preprocessing;
