import React, { useEffect, useState } from "react";
import { API_URL } from "../App";
import "./inventory.css";
import "../style.css";

const InventoryItem = ({ name, currentStock, items, setItems }) => {
  const [newStock, setNewStock] = useState(0);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${API_URL}/api/inventory/update/stock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemName: name, newStock }),
      });

      if (!response.ok) {
        return console.log("FAILED TO UPDATE");
      }

      const data = await response.json();

      setItems((prevItems) =>
        prevItems.map((item) => {
          if (item.itemName === name) {
            return { ...item, ...data.item }; // Update the item with the new data
          }
          return item; // Return the unchanged item
        })
      );
    } catch (error) {
      console.log("FAILED TO UPDATE");
    }
  };

  return (
    <div className="menu-item bg-white p-5 rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p className="mb-2">
        Current Stock: <span>{currentStock}</span>
      </p>
      <input
        type="number"
        min="0"
        className="border rounded-md p-2 mb-2 w-full"
        placeholder="Enter new stock"
        value={newStock}
        onChange={(e) => setNewStock(e.target.value)}
      />
      <button
        className="update-stock bg-blue-500 text-white rounded-md px-3 py-1"
        onClick={handleUpdate}
      >
        Update Stock
      </button>
    </div>
  );
};

const Inventory = () => {
  // Initial stock for the items
  const [items, setItems] = useState([]);

  const getAllStocks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/inventory/get/all`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return console.log("FAILED TO FETCH");
      }

      const data = await response.json();

      console.log(data.items);

      setItems(data.items);
    } catch (error) {
      console.log("FAILED TO FETCH");
    }
  };

  useEffect(() => {
    getAllStocks();
  }, []);

  return (
    <div className="bg-gray-100 py-5">
      <button
        className="menu-toggle"
        onClick={() => (window.location.href = "/home")}
      >
        ☰ Menu
      </button>
      <div className="container mx-auto max-w-3xl bg-white rounded-lg shadow-lg p-5">
        <h1 className="text-3xl font-bold text-center mb-5">
          Inventory Management
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <InventoryItem
              key={item._id}
              name={item.itemName}
              currentStock={item.currentStock}
              items={items}
              setItems={setItems}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
