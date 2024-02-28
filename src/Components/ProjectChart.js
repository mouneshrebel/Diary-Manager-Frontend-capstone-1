// ProjectChart.js
import React, { useEffect } from 'react';
import Chart from 'chart.js/auto'; // Import Chart library or any other chart library you are using
// import { useNavigate } from 'react-router-dom';

const ProjectChart = ({ data }) => {
  let chartInstance;
  // const navigate=useNavigate()

  useEffect(() => {
    // Initialize the chart when the component mounts
    const ctx = document.getElementById('projectChartCanvas').getContext('2d');
    chartInstance = new Chart(ctx, {
      type: 'bar', // Replace with your chart type
      data: data,
      options: {
        // Your chart options
      },
    });

    return () => {
      // Cleanup and destroy the chart when the component unmounts
      chartInstance.destroy();
    };
  }, [data]); // Ensure the chart is re-initialized when the data prop changes

  // const handleUpdate = () => {
  //   // Example: Update the chart data
  //  navigate("/dashboard")
  // };

  return (
    <div>
      <canvas id="projectChartCanvas" width="400" height="200"></canvas>
      {/* <button onClick={handleUpdate}>Update Chart Data</button> */}
    </div>
  );
};

export default ProjectChart;
