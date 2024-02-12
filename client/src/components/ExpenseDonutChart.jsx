import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

function ExpenseDonutChart({ categoryTotals, selectedMonth }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = document.getElementById('donutChart');
  
    const labels = categoryTotals ? Object.keys(categoryTotals) : [];
    const dataValues = categoryTotals ? Object.values(categoryTotals) : [];
  
    const totalExpenditure = dataValues.reduce((total, value) => total + value, 0);

    console.log("Labels :", labels);
  
    const data = {
      labels: labels,
      datasets: [{
        data: dataValues,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF8C00',
          '#7B68EE',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF8C00',
          '#7B68EE',
        ],
      }],
    };
  
    const options = {
      cutout: '70%', // Set the size of the donut hole
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
        },
        tooltip: {
          callbacks: {
            label: (context) => {
                const categoryName = context.label;
                const categoryAmount = categoryTotals[categoryName];
                const percentage = ((categoryAmount / totalExpenditure) * 100).toFixed(2);
                return `${categoryName}: Rs ${categoryAmount} (${percentage}%)`;
              },
          },
        },
      },
    };
  
    // Destroy previous Chart instance
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  
    // Create new Chart instance
    chartRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: options,
    });
  
  }, [categoryTotals, selectedMonth]);

  return (
    <div style={{
        width: '40%',
        height: '350px',
        margin: 'auto',  // Center the div horizontally
        marginTop: '50px',  // Optional: Add top margin for vertical centering
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Add a subtle shadow
        borderRadius: '10px',  // Optional: Add rounded corners
      }}>
        <canvas id='donutChart'></canvas>
      </div>
      
  );
}

export default ExpenseDonutChart;
