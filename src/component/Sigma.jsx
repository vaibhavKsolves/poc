import React, { useEffect } from "react";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import { Graph } from "graphology";
import "../styles/sigma-styles.css"; // Custom CSS

// Function to generate random colors
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Function to create a larger graph with 50 nodes & 50 edges
const GraphComponent = () => {
  const loadGraph = useLoadGraph();

  useEffect(() => {
    const graph = new Graph();

    // 🔹 Adding 50 Nodes
    for (let i = 1; i <= 50; i++) {
      graph.addNode(`Node-${i}`, {
        x: Math.random() * 10 - 5, // Random X position
        y: Math.random() * 10 - 5, // Random Y position
        size: Math.random() * 5 + 5, // Random size between 5 and 10
        color: getRandomColor(), // Random color
        label: `Node ${i}`,
      });
    }

    // 🔹 Adding 50 Random Edges
    for (let i = 1; i <= 50; i++) {
      const source = `Node-${Math.floor(Math.random() * 50) + 1}`;
      const target = `Node-${Math.floor(Math.random() * 50) + 1}`;
      if (source !== target && !graph.hasEdge(source, target)) {
        graph.addEdge(source, target);
      }
    }

    // Load the graph into Sigma.js
    loadGraph(graph);
  }, [loadGraph]);

  return null;
};

// 🔹 Sigma.js Container Component
const SigmaGraph = () => {
  return (
    <SigmaContainer className="sigma-container">
      <GraphComponent />
    </SigmaContainer>
  );
};

export default SigmaGraph;
