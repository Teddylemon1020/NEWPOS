import React, { useEffect } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js
import '../style.css';

const FoodSalesGraph = () => {
  useEffect(() => {
    // Sales by Food Category Data
    const salesData = {
      labels: [
        'ADOSILOG', 'BANGSILOG', 'CHICKSILOG', 'CORNSILOG', 'DANGSILOG', 'HOTSILOG', 
        'LIEMPOSILOG', 'LONGSILOG', 'RIBSILOG', 'SISIGSILOG', 'SPAMSILOG', 'TAPSILOG', 'TOCILOG'
      ],
      datasets: [{
        label: 'Sales (in units)',
        data: [15, 10, 12, 8, 9, 11, 13, 7, 10, 14, 8, 13, 12],
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', 
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384'
        ],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      }]
    };

    // Orders Over Time Data
    const ordersData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [{
        label: 'Total Orders',
        data: [150, 200, 180, 220, 170, 250, 190, 230, 210, 220, 240, 260],
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        borderWidth: 2,
        fill: true,
        tension: 0.3  // Smooth line
      }]
    };

    // Peak Order Time Data
    const orderTimeData = {
      labels: ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM'],
      datasets: [{
        label: 'Orders Frequency',
        data: [10, 20, 30, 15, 40, 25, 35],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384'],
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2
      }]
    };

    // Configurations for Sales by Food Category (Bar Chart)
    const salesConfig = {
      type: 'bar',
      data: salesData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#4B5563'
            }
          }
        }
      }
    };

    // Configurations for Total Orders Over Time (Line Chart)
    const ordersConfig = {
      type: 'line',
      data: ordersData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#4B5563'
            }
          }
        }
      }
    };

    // Configurations for Peak Order Time (Pie Chart)
    const orderTimeConfig = {
      type: 'pie',
      data: orderTimeData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#4B5563'
            }
          }
        }
      }
    };

    // Rendering the charts when the component mounts
    const salesChart = new Chart(
      document.getElementById('salesChart'),
      salesConfig
    );

    const ordersChart = new Chart(
      document.getElementById('ordersChart'),
      ordersConfig
    );

    const orderTimeChart = new Chart(
      document.getElementById('orderTimeChart'),
      orderTimeConfig
    );

    // Cleanup function to destroy charts when the component unmounts
    return () => {
      salesChart.destroy();
      ordersChart.destroy();
      orderTimeChart.destroy();
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 flex flex-col items-center justify-center min-h-screen space-y-12">
      {/* Page title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Food Category Sales</h1>

      {/* Container for the charts */}
      <div className="charts-container grid grid-cols-1 gap-8 w-full max-w-5xl">
        {/* Sales by Food Category Graph */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <canvas id="salesChart" className="w-full"></canvas>
        </div>

        {/* Total Orders Over Time Graph */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Total Orders Over Time</h2>
          <canvas id="ordersChart" className="w-full"></canvas>
        </div>

        {/* Peak Order Time Frequency Graph */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Peak Order Time</h2>
          <canvas id="orderTimeChart" className="w-full"></canvas>
        </div>
      </div>
    </div>
  );
};

export default FoodSalesGraph;
