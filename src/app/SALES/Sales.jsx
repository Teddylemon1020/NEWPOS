import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto"; // Import Chart.js
import "../style.css";
import { API_URL } from "../App.jsx";

const FoodSalesGraph = () => {
  const [salesOrderData, setSalesOrderData] = useState({
    ADOSILOG: 0,
    BANGSILOG: 0,
    CHICKSILOG: 0,
    CORNSILOG: 0,
    DANGSILOG: 0,
    HOTSILOG: 0,
    LIEMPOSILOG: 0,
    LONGSILOG: 0,
    RIBSILOG: 0,
    SISIGSILOG: 0,
    SPAMSILOG: 0,
    TAPSILOG: 0,
    TOCILOG: 0,
  });
  const [error, setError] = useState("");

  const fetchSalesData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/user/sales/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        console.log(data.order);
        const newSalesData = { ...salesOrderData };
        data.order.forEach((name) => {
          if (newSalesData[name] !== undefined) {
            newSalesData[name] += 1;
          }
        });
        setSalesOrderData(newSalesData);
      } else {
        setError(data.message || "Failed to fetch sales data");
        console.log(data.message);
      }
    } catch (error) {
      setError("Server error, please try again later.");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  useEffect(() => {
    // Sales by Food Category Data

    const salesData = {
      labels: [
        "ADOSILOG",
        "BANGSILOG",
        "CHICKSILOG",
        "CORNSILOG",
        "DANGSILOG",
        "HOTSILOG",
        "LIEMPOSILOG",
        "LONGSILOG",
        "RIBSILOG",
        "SISIGSILOG",
        "SPAMSILOG",
        "TAPSILOG",
        "TOCILOG",
      ],
      datasets: [
        {
          label: "Sales (in units)",
          data: [
            salesOrderData.ADOSILOG,
            salesOrderData.BANGSILOG,
            salesOrderData.CHICKSILOG,
            salesOrderData.CORNSILOG,
            salesOrderData.DANGSILOG,
            salesOrderData.HOTSILOG,
            salesOrderData.LIEMPOSILOG,
            salesOrderData.LONGSILOG,
            salesOrderData.RIBSILOG,
            salesOrderData.SISIGSILOG,
            salesOrderData.SPAMSILOG,
            salesOrderData.TAPSILOG,
            salesOrderData.TOCILOG,
          ],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#FF6384",
          ],
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
        },
      ],
    };

    // Configurations for Sales by Food Category (Bar Chart)
    const salesConfig = {
      type: "bar",
      data: salesData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "#4B5563",
            },
          },
        },
      },
    };

    // Rendering the charts when the component mounts
    const salesChart = new Chart(
      document.getElementById("salesChart"),
      salesConfig
    );

    // Cleanup function to destroy charts when the component unmounts
    return () => {
      salesChart.destroy();
    };
  }, [salesOrderData]);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 flex flex-col items-center justify-center min-h-screen space-y-12">
      {/* Page title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Food Category Sales
      </h1>

      {/* Container for the charts */}
      <div className="charts-container grid grid-cols-1 gap-8 w-full max-w-5xl">
        {/* Sales by Food Category Graph */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <canvas id="salesChart" className="w-full"></canvas>
        </div>
      </div>
    </div>
  );
};

export default FoodSalesGraph;
