import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import axios from "axios";

// 🔹 Fetch Transactions API
const fetchTransactions = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts?_limit=10"
  ); // Mock API
  return response.data.map((tx) => ({
    id: tx.id,
    type: tx.id % 2 === 0 ? "Deposit" : "Withdraw",
    amount: (Math.random() * 1000).toFixed(2),
    date: new Date().toLocaleString(),
  }));
};

const TransactionTable = () => {
  const [globalFilter, setGlobalFilter] = useState(""); // 🔹 Global search filter
  const [sorting, setSorting] = useState([]); // 🔹 Sorting state

  // 🔹 Query to fetch transactions
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  // 🔹 Table Columns
  const columns = useMemo(
    () => [
      { accessorKey: "type", header: "Transaction Type" },
      { accessorKey: "amount", header: "Amount ($)" },
      { accessorKey: "date", header: "Date & Time" },
    ],
    []
  );

  // 🔹 Table Instance with Filtering & Sorting
  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // 🔹 Add Filtering
    getSortedRowModel: getSortedRowModel(), // 🔹 Add Sorting
    state: { globalFilter, sorting }, // 🔹 Controlled states
    onSortingChange: setSorting, // 🔹 Update sorting
    onGlobalFilterChange: setGlobalFilter, // 🔹 Update search input
    globalFilterFn: (row, columnId, filterValue) => {
      return String(row.getValue(columnId))
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    }, // 🔹 Custom Filtering Logic
  });

  if (isLoading) return <p>Loading transactions...</p>;

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h2>📌 Transactions (Search + Sort)</h2>

      {/* 🔹 Global Search Filter */}
      <input
        type="text"
        placeholder="Search Transactions..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />

      {/* 🔹 Transaction Table */}
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    borderBottom: "2px solid black",
                    padding: "8px",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                  onClick={header.column.getToggleSortingHandler()} // 🔹 Sorting on click
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() === "asc"
                    ? " 🔼"
                    : header.column.getIsSorted() === "desc"
                    ? " 🔽"
                    : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{ borderBottom: "1px solid gray", padding: "8px" }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
