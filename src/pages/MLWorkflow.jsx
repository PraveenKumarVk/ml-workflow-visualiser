import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DatasetUpload from "../components/DatasetUpload";
import Preprocessing from "../components/Preprocessing";
import Training from "../components/Training";
import Evaluation from "../components/Evaluation";
import RunModel from "../components/RunModel";
import ExportPipeline from "../components/ExportPipeline";

const MLWorkflow = () => {
  const [activeSection, setActiveSection] = useState("Data Collection");
  const [dataset, setDataset] = useState(null);
  const [preprocessing, setPreprocessing] = useState({});
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [readyForTraining, setReadyForTraining] = useState(false);
  const [readyForRunModel, setReadyForRunModel] = useState(false);

  const isPreprocessingEnabled = dataset !== null;
  const isTrainingEnabled = readyForTraining;
  const isEvaluationEnabled = isTrainingEnabled && selectedModel !== "";
  const isRunModelEnabled = isEvaluationEnabled && (selectedMetrics.length > 0 || readyForRunModel);
  const isExportPipelineEnabled = isRunModelEnabled;

  useEffect(() => {
    console.log("Updated preprocessing options:", preprocessing);
  }, [preprocessing]);

  useEffect(() => {
    console.log("Updated evaluation metrics:", selectedMetrics);
  }, [selectedMetrics]);

  const handleReadyForTraining = () => {
    console.log("Finalizing preprocessing options:", preprocessing);
    setReadyForTraining(true);
    setActiveSection("Training");
  };

  const handleReadyForRunModel = () => {
    console.log("Finalizing evaluation metrics:", selectedMetrics);
    setReadyForRunModel(true);
    setActiveSection("Run Model");
  };

  const completedSteps = {
    "Data Collection": dataset !== null,
    "Preprocessing": isPreprocessingEnabled,
    "Training": isTrainingEnabled,
    "Evaluation": isEvaluationEnabled,
    "Run Model": isRunModelEnabled || readyForRunModel,
    "Export Pipeline": isExportPipelineEnabled,
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar onSectionChange={setActiveSection} completedSteps={completedSteps} />

      {/* Main content area */}
      <div className="flex-grow p-6 ml-64 bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">{activeSection}</h2>
        <div className="mt-4 bg-white p-6 shadow-lg rounded-md text-gray-800">
          {activeSection === "Data Collection" && <DatasetUpload onFileUpload={setDataset} />}
          {activeSection === "Preprocessing" && (
            isPreprocessingEnabled ? (
              <>
                <Preprocessing dataset={dataset} onPreprocessingChange={setPreprocessing} />
                <button 
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" 
                  onClick={handleReadyForTraining}
                >
                  Ready for Training
                </button>
              </>
            ) : (
              <p className="text-red-500">Please upload a dataset first.</p>
            )
          )}
          {activeSection === "Training" && (
            isTrainingEnabled ? <Training onModelSelect={setSelectedModel} /> : <p className="text-red-500">Please confirm preprocessing first.</p>
          )}
          {activeSection === "Evaluation" && (
            isEvaluationEnabled ? (
              <>
                <Evaluation selectedModel={selectedModel} onMetricsChange={setSelectedMetrics} />
                <button 
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" 
                  onClick={handleReadyForRunModel}
                >
                  Ready for Run Model
                </button>
              </>
            ) : <p className="text-red-500">Please select a model first.</p>
          )}
          {activeSection === "Run Model" && (
            isRunModelEnabled || readyForRunModel ? (
              <RunModel dataset={dataset} preprocessing={preprocessing} selectedModel={selectedModel} selectedMetrics={selectedMetrics} />
            ) : (
              <>
                <p className="text-red-500">Please confirm evaluation first.</p>
                <button 
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" 
                  onClick={handleReadyForRunModel}
                >
                  Confirm Running Model
                </button>
              </>
            )
          )}
          {activeSection === "Export Pipeline" && (
            isExportPipelineEnabled ? <ExportPipeline dataset={dataset} preprocessing={preprocessing} selectedModel={selectedModel} selectedMetrics={selectedMetrics} /> : <p className="text-red-500">Please run the model first before exporting the pipeline.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MLWorkflow;
