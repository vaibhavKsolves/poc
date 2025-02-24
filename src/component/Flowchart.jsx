import React, { useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Handle,
  Position
} from "reactflow";
import "reactflow/dist/style.css";

// ✅ Custom Node Component
const CustomNode = ({ data }) => {
  return (
    <div style={{ padding: 10, background: "#1890ff", color: "#fff", borderRadius: 8, textAlign: "center" }}>
      <strong>{data.label}</strong>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

// ✅ Initial Nodes
const initialNodes = [
  { id: "1", position: { x: 100, y: 100 }, data: { label: "Start Node" }, type: "custom" },
  { id: "2", position: { x: 300, y: 100 }, data: { label: "Process Node" }, type: "custom" },
  { id: "3", position: { x: 500, y: 100 }, data: { label: "End Node" }, type: "custom" },
];

// ✅ Initial Edges (Connections)
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }, { id: "e2-3", source: "2", target: "3" }];

const FlowChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), []);

  return (
    <div style={{ height: 500, border: "1px solid #ddd" }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={{ custom: CustomNode }}
          fitView
        />
      </ReactFlowProvider>
    </div>
  );
};

export default FlowChart;
