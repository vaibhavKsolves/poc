// import React, { useState, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, removeFromCart } from "./redux/cartSlice";
// import { Button, Card, List, Typography, Space } from "antd";
// import BarChart from "./component/BarChart";
// import FlowChart from "./component/Flowchart";
// import SigmaGraph from "./component/Sigma";
// import TransactionTable from "./component/Transact";
// import Pagination from "./component/PaginationComponent";
// import "antd/dist/reset.css"; // Import Ant Design styles

// const { Title } = Typography;

// const App = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);

//   const products = [
//     { id: 1, name: "Laptop" },
//     { id: 2, name: "Phone" },
//     { id: 3, name: "Tablet" },
//   ];

//   const components = useMemo(
//     () => [
//       <Card key="barChart" title="📊 Bar Chart" bordered>
//         <BarChart />
//       </Card>,
//       <Card key="flowChart" title="🔄 Flow Chart" bordered>
//         <FlowChart />
//       </Card>,
//       <Card key="sigmaGraph" title="🚀 Sigma.js Graph Example" bordered>
//         <SigmaGraph />
//       </Card>,
//       <Card key="transactionTable" title="💰 Transactions" bordered>
//         <TransactionTable />
//       </Card>,
//     ],
//     []
//   );

//   return (
//     <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
//       <Space direction="vertical" style={{ width: "100%" }}>
//         {components[currentPage - 1]}
//       </Space>

//       <Title level={2} style={{ marginTop: "20px" }}>🛒 Products</Title>
//       <List
//         bordered
//         dataSource={products}
//         renderItem={(product) => (
//           <List.Item actions={[<Button type="primary" onClick={() => dispatch(addToCart(product))}>Add to Cart</Button>]}>
//             {product.name}
//           </List.Item>
//         )}
//       />

//       <Title level={2} style={{ marginTop: "20px" }}>🛍️ Cart</Title>
//       <List
//         bordered
//         dataSource={cartItems}
//         renderItem={(item) => (
//           <List.Item actions={[<Button type="dashed" onClick={() => dispatch(removeFromCart(item.id))}>Remove</Button>]}>
//             {item.name}
//           </List.Item>
//         )}
//       />

//       <Pagination totalItems={components.length} itemsPerPage={1} onPageChange={setCurrentPage} />
//     </div>
//   );
// };

// export default App;

import React, { useState, useMemo } from "react";
import { Button, Card, List, Typography } from "antd";
import { CartProvider, useCart } from "./component/CartContext";
import BarChart from "./component/BarChart";
import FlowChart from "./component/Flowchart";
import SigmaGraph from "./component/Sigma";
import TransactionTable from "./component/Transact";
import Pagination from "./component/PaginationComponent";
import "antd/dist/reset.css";
import Sidebar from "./component/Sidebar";
import AutoComplete from "./component/AutoComplete";

const { Title } = Typography;

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { cartItems, addToCart, removeFromCart } = useCart();

  const products = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Phone" },
    { id: 3, name: "Tablet" },
  ];

  const components = useMemo(
    () => [
      <BarChart key="barChart" />,
      <FlowChart key="flowChart" />,
      <Card key="sigmaGraph" title="🚀 Sigma.js Graph Example">
        <SigmaGraph />
      </Card>,
      <TransactionTable key="transactionTable" />,
      <Sidebar key="sidebar" />, // Sidebar as a separate page
      <AutoComplete key="autocomplete" />,
    ],
    []
  );

  return (
    <div style={{ padding: "20px" }}>
      {components[currentPage - 1]}

      {/* <Title level={2}>🛒 Products</Title>
      <List
        bordered
        dataSource={products}
        renderItem={(product) => (
          <List.Item>
            {product.name}
            <Button type="primary" onClick={() => addToCart(product)}>
              Add to Cart
            </Button>
          </List.Item>
        )}
      />

      <Title level={2}>🛍️ Cart</Title> */}
      {/* <List
        bordered
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item>
            {item.name}
            <Button type="danger" onClick={() => removeFromCart(item.id)}>
              Remove
            </Button>
          </List.Item>
        )}
      /> */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "#fff", 
          padding: "10px",
          boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)", 
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          totalItems={components.length}
          itemsPerPage={1}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

// Wrap App with CartProvider
const WrappedApp = () => (
  <CartProvider>
    <App />
  </CartProvider>
);

export default WrappedApp;
