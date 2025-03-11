import { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { useStore } from "../../store";

Chart.register(...registerables);

const WeeklyActivity = () => {
  const { weeklyActivity } = useStore();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !weeklyActivity) return;

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [
          {
            label: "Withdraw",
            data: weeklyActivity.map((day) => day.withdraw),
            backgroundColor: "#1F2937",
            borderRadius: 4,
            barThickness: 12,
          },
          {
            label: "Deposit",
            data: weeklyActivity.map((day) => day.deposit),
            backgroundColor: "#3B82F6",
            borderRadius: 4,
            barThickness: 12,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            align: "start",
            labels: {
              boxWidth: 8,
              usePointStyle: true,
              pointStyle: "circle",
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
            ticks: {
              stepSize: 100,
            },
          },
          x: {
            grid: {
              display: false,
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
  }, [weeklyActivity]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Weekly Activity
      </h2>

      <div className="h-64">
        <canvas
          ref={chartRef}
          aria-label="Weekly activity chart showing deposits and withdrawals"
          role="img"
        ></canvas>
      </div>
    </div>
  );
};

export default WeeklyActivity;
