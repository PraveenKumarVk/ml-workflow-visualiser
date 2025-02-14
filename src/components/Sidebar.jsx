import React, { useState } from "react";

const Sidebar = ({ onSectionChange, completedSteps }) => {
  const [activeSection, setActiveSection] = useState("Data Collection");

  const sections = [
    "Data Collection",
    "Preprocessing",
    "Training",
    "Evaluation",
    "Run Model",
    "Export Pipeline"
  ];

  const handleSectionClick = (section) => {
    setActiveSection(section);
    onSectionChange(section);
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 fixed left-0 top-0">
      <h2 className="text-xl font-bold mb-4">ML Workflow</h2>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section} className={`cursor-pointer p-2 rounded-md ${
            activeSection === section ? "bg-blue-500" : completedSteps[section] ? "hover:bg-gray-700" : "bg-gray-600 opacity-50 cursor-not-allowed"
            }`}
            onClick={() => onSectionChange(section)} >
            {section}{completedSteps[section] && "  ✔"}
          </li>

        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
