import React, { useState } from "react";
import json from "./data.json";

const Sidebar = () => {
  const [data, setData] = useState(json);

  const addToList = (itemId) => {
    const enter = prompt("Enter a name");

    const updateItem = (items) =>
      items.map((node) => {
        if (node.id === itemId) {
          // Corrected condition
          return {
            ...node,
            children: [
              ...node.children,
              { id: Date.now(), name: enter, isFolder: true, children: [] }, // Unique ID
            ],
          };
        }
        return {
          // Return other nodes as they are
          ...node,
          children: updateItem(node.children), // Recursively update child nodes
        };
      });

    setData((prev) => updateItem(prev));
  };
  const deleteFromList = (itemId) => {

    const updateItem = (list) => {
      return list
        .filter((node) => node.id !== itemId)
        .map((node) => {
          return { ...node, children: updateItem(node.children) };
        });
    };
    setData((prev) => updateItem(prev));
  };

  return (
    <>
      <h1>hello</h1>
      <ListComponent
        data={data}
        addToList={addToList}
        deleteFromList={deleteFromList}
      />
    </>
  );
};

// Render List
const ListComponent = ({ data, addToList, deleteFromList }) => {
  const [isExampldable, setIsexanpdable] = useState({});
  return (
    <div style={{ paddingLeft: "20px" }}>
      {data.map((item) => (
        <div key={item.id}>
          {item.isFolder && (
            <span
              style={{ cursor: "pointer" }}
              onClick={() =>
                setIsexanpdable((prev) => ({
                  ...prev,
                  [item.name]: !prev[item.name],
                }))
              }
            >
              +
            </span>
          )}

          <span>{item.name}</span>
          {item.isFolder && (
            <>
              <button onClick={() => addToList(item.id)}>
                create new folder
              </button>{" "}
              
            </>
          )}
          <button onClick={() => deleteFromList(item.id)}>delete</button>
          {isExampldable?.[item.name] && (
            <ListComponent
              data={item.children}
              addToList={addToList}
              deleteFromList={deleteFromList}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
