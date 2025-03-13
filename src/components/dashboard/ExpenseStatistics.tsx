import { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { useStore } from "../../store";
import DataLabelsPlugin from "chartjs-plugin-datalabels";

Chart.register(...registerables, DataLabelsPlugin);

const ExpenseStatistics = () => {
  const { expenseStats } = useStore();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !expenseStats) return;

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: expenseStats.map((stat) => stat.category),
        datasets: [
          {
            data: expenseStats.map((stat) => stat.percentage),
            backgroundColor: [
              "#343C6A", // Entertainment
              "#FC7900", // Bill Expenses
              "#396AFF", // Investment
              "#232323", // Others
            ],
            borderWidth: 0,
            // borderRadius: 4,
          },
        ],
      },
      options: {
        offset: [20, 40, 45, 20],
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              boxWidth: 10,
              padding: 20,
              font: {
                size: 12,
              },
              generateLabels: () => {
                return []; // Return an empty array to hide legend labels
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.raw as number;
                return `${label}: ${value}%`;
              },
            },
          },
          datalabels: {
            color: "#FFFFFF",
            font: {
              size: 12,
              weight: "bold",
            },
            align: "center",
            textAlign: "right",
            // offset: -80,
            formatter: (value) => {
              //   const label = context.chart.data.labels[context.dataIndex];
              // Display both the label and the percentage
              //   return `${label}\n${value}%`;
              return `${value}%`;
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [expenseStats]);

  return (
    <div className="px-2 md:px-4 lg:px-4 py-4">
      <h2 className="text-lg font-semibold text-gray-800 md:mb-4">
        Expense Statistics
      </h2>

      <div className="h-81 md:bg-white rounded-3xl md:p-6">
        <canvas
          ref={chartRef}
          aria-label="Expense statistics pie chart"
          role="img"
        ></canvas>
      </div>
    </div>
  );
};

export default ExpenseStatistics;
