import React from "react";
import BarChart from "./component/BarChart";
import FlowChart from "./component/Flowchart"
import SigmaGraph from "./component/Sigma";
import TransactionTable from "./component/Transact";
import "antd/dist/reset.css"; // Import Ant Design styles

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <BarChart />
      <FlowChart />
      <h2>🚀 Sigma.js Graph Example</h2>
      <SigmaGraph />
      <TransactionTable />

    </div>
  );
}

export default App;
