import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const MixedChart = ({ monthly }) => {
  useEffect(() => {
    const ctx = document.getElementById('mixedChart').getContext('2d');

    // Create mixed chart
    const mixedChart = new Chart(ctx, {
      type: 'bar',
      data: {
        datasets: [
          {
            type: 'bar',
            label: 'Monthly',
            data: monthly,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            type: 'line',
            label: 'Zero Values',
            data: Array(monthly.length).fill(0),
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            pointRadius: 0,
          },
        ],
        labels: Array.from({ length: 12 }, (_, i) => i + 1),
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            position: 'left',
          },
        },
      },
    });

    // Cleanup the chart on component unmount
    return () => {
      mixedChart.destroy();
    };
  }, [monthly]);

  return (
    <div style={{
        width: '90%',
        height: '100%',
        margin: 'auto',  // Center the div horizontally
        marginTop: '50px',  // Optional: Add top margin for vertical centering
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Add a subtle shadow
        borderRadius: '10px',  // Optional: Add rounded corners
      }}>
      <canvas id="mixedChart" width="400" height="200"></canvas>
    </div>
  );
};

export default MixedChart;
