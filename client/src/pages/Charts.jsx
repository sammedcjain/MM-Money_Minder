import React, { useEffect } from "react";
import Chart from "chart.js/auto";

function Charts() {
  useEffect(() => {
    const createBarChart = (canvasId) => {
      const ctx = document.getElementById(canvasId);
      const chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 19, 3, 5, 2, 3],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      return chartInstance;
    };

    const createDoughnutChart = (canvasId) => {
      const ctx = document.getElementById(canvasId);
      const data = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
          hoverOffset: 4,
        }],
      };

      const config = {
        type: 'doughnut',
        data: data,
      };

      const chartInstance = new Chart(ctx, config);
      return chartInstance;
    };

    const barChart = createBarChart("myBarChart");
    const doughnutChart = createDoughnutChart("myDoughnutChart");

    // Cleanup function to destroy the Chart instances when the component unmounts
    return () => {
      if (barChart) {
        barChart.destroy();
      }
      if (doughnutChart) {
        doughnutChart.destroy();
      }
    };
  }, []); // Empty dependency array to ensure useEffect runs once

  return (
    <>
      <div style={{ width: "80%", height: "60%" }}>
        <canvas id="myBarChart"></canvas>
      </div>
      <div style={{ width: "80%", height: "60%" }}>
        <canvas id="myDoughnutChart"></canvas>
      </div>
    </>
  );
}

export default Charts;
