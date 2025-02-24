import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, Slider, Button } from "antd";
import { ReactFlowProvider, ReactFlow } from "reactflow";
import Sigma from "sigma";
import { DirectedGraph } from "graphology"; // ✅ Import Graphology
import "reactflow/dist/style.css";

const BarChart = () => {
  const [data, setData] = useState([25, 30, 45, 60, 20, 75, 50]);
  const svgRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous elements

    const width = 400;
    const height = 200;
    const barWidth = width / data.length;

    const xScale = d3.scaleBand().domain(data.map((_, i) => i)).range([0, width]).padding(0.3);
    const yScale = d3.scaleLinear().domain([0, d3.max(data)]).range([height, 0]);

    svg.attr("width", width).attr("height", height);

    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (_, i) => xScale(i))
      .attr("y", d => yScale(d))
      .attr("width", barWidth - 5)
      .attr("height", d => height - yScale(d))
      .attr("fill", "#1890ff");
  }, [data]);

  useEffect(() => {
    if (containerRef.current) {
      const graph = new DirectedGraph(); // ✅ Create a valid Graphology instance

      // ✅ Add sample nodes and edges
      graph.addNode("A", { x: 0, y: 0, size: 10, label: "Node A", color: "red" });
      graph.addNode("B", { x: 10, y: 10, size: 10, label: "Node B", color: "blue" });
      graph.addEdge("A", "B");

      // ✅ Initialize Sigma with the valid graph
      new Sigma(graph, containerRef.current);
    }
  }, []);

  return (
    <Card title="D3.js Bar Chart with Ant Design, React Flow & Sigma.js" style={{ width: 450, margin: "auto", textAlign: "center" }}>
      <svg ref={svgRef}></svg>
      <Slider
        min={10}
        max={100}
        step={5}
        defaultValue={50}
        onChange={value => setData(data.map(() => Math.floor(Math.random() * value)))}
      />
      <Button type="primary" onClick={() => setData(data.map(() => Math.floor(Math.random() * 100)))}>
        Randomize Data
      </Button>
      <div style={{ height: 300, border: "1px solid #ddd", marginTop: 20 }} ref={containerRef}></div>
      <ReactFlowProvider>
        <ReactFlow style={{ height: 300, width: "100%" }}>
          {/* Flow Nodes and Edges will be added dynamically here */}
        </ReactFlow>
      </ReactFlowProvider>
    </Card>
  );
};

export default BarChart;
