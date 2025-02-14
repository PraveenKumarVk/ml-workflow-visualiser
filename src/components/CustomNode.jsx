import React from "react";
import { Handle, Position } from "reactflow";

const CustomNode = ({ data }) => {
  return (
    <div className="p-4 bg-white border rounded shadow-md w-64 text-center">
      <h3 className="font-bold">{data.label}</h3>
      <div className="mt-2">{data.content}</div>
      <Handle type="source" position={Position.Bottom} className="bg-blue-500 w-2 h-2 rounded-full" />
      <Handle type="target" position={Position.Top} className="bg-blue-500 w-2 h-2 rounded-full" />
    </div>
  );
};

export default CustomNode;
