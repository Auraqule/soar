import { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { useStore } from "../../store";

Chart.register(...registerables);

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
      type: "doughnut",
      data: {
        labels: expenseStats.map((stat) => stat.category),
        datasets: [
          {
            data: expenseStats.map((stat) => stat.percentage),
            backgroundColor: [
              "#3B82F6", // Entertainment
              "#F97316", // Bill Expenses
              "#2563EB", // Investment
              "#1F2937", // Others
            ],
            borderWidth: 0,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
          legend: {
            position: "right",
            labels: {
              boxWidth: 10,
              padding: 20,
              font: {
                size: 12,
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
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Expense Statistics
      </h2>

      <div className="h-64">
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
