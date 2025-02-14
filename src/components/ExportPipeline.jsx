import React from "react";

const ExportPipeline = ({ dataset, preprocessing, selectedModel, selectedMetrics }) => {
  const generatePythonScript = () => {
    let script = `import pandas as pd\nfrom sklearn.model_selection import train_test_split\n`;

    // Add preprocessing imports
    if (preprocessing) {
      script += `from sklearn.preprocessing import StandardScaler\n`;
    }

    // Add model-specific imports
    if (selectedModel === "Random Forest") {
      script += `from sklearn.ensemble import RandomForestClassifier\n`;
    } else if (selectedModel === "Logistic Regression") {
      script += `from sklearn.linear_model import LogisticRegression\n`;
    } else if (selectedModel === "Random Forest Regressor") {
      script += `from sklearn.ensemble import RandomForestRegressor\n`;
    } else if (selectedModel === "K-Means") {
      script += `from sklearn.cluster import KMeans\n`;
    }

    // Add evaluation metric imports
    if (selectedMetrics && selectedMetrics.length > 0) {
      script += `from sklearn.metrics import ${selectedMetrics.map((m) => m.replace("-", "_")).join(", ")}\n`;
    }

    script += `\n# Load dataset\n`;
    script += `df = pd.read_csv("your_dataset.csv")\n\n`;

    // Preprocessing
    if (preprocessing) {
      script += `# Preprocessing\nscaler = StandardScaler()\ndf[df.select_dtypes(include=['number']).columns] = scaler.fit_transform(df[df.select_dtypes(include=['number']).columns])\n\n`;
    }

    // Splitting dataset
    script += `# Split dataset\nX = df.iloc[:, :-1]\ny = df.iloc[:, -1]\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\n`;

    // Model training
    script += `# Train Model\n`;
      if (selectedModel === "Random Forest") {
          script += `model = RandomForestClassifier()\n`;
      } else if (selectedModel === "Logistic Regression") {
          script += `model = LogisticRegression()\n`;
      } else if (selectedModel === "Random Forest Regressor") {
          script += `model = RandomForestRegressor()\n`;
      } else if (selectedModel === "K-Means") {
          script += `model = KMeans(n_clusters=3)\n`;
      }

    script += `model.fit(X_train, y_train)\n\n`;

    // Evaluation
    script += `# Evaluate Model\n`;
    if (selectedMetrics && selectedMetrics.length > 0) {
      script += `y_pred = model.predict(X_test)\n`;
      selectedMetrics.forEach((metric) => {
        metric = metric.replace("-", "_");
        script += `print("${metric}: ", ${metric}(y_test, y_pred))\n`;
      });
    }

    return script;
  };

  const downloadScript = () => {
    const script = generatePythonScript();
    const blob = new Blob([script], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "ml_pipeline.py";
    link.click();
  };

  return (
    <div className="p-4">
      <h3 className="font-bold text-lg">Export Pipeline</h3>
      <button
        onClick={downloadScript}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Download Python Script
      </button>
    </div>
  );
};

export default ExportPipeline;
