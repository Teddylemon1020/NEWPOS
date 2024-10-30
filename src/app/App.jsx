import React from "react";
import { Route, Routes } from "react-router-dom"; // No Router here, only Routes
import Sales from "./SALES/Sales.jsx";
import Inventory from "./INVENTORY/Inventory.jsx";
import TITO from "./TITO/TITO.jsx";
import Order from "./ORDERS/Ordering.jsx";
import Home from "./HOME/Home.jsx";
import Login from "./LOGIN/Login.jsx";
import Receipt from "./RECEIPT/Receipt.jsx";
import Payroll from "./PAYROLL/Payroll.jsx";
import Signup from "./LOGIN/Signup.jsx";

// export const API_URL = "https://newposbe.onrender.com";
export const API_URL = "http://localhost:3001";

const App = () => {
  return (
    <Routes>
      {/* Use only Routes inside App.jsx */}
      <Route path="/" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/TITO" element={<TITO />} />
      <Route path="/Ordering" element={<Order />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Receipt" element={<Receipt />} />
      <Route path="/Payroll" element={<Payroll />} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
