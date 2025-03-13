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
            borderRadius: 30,
            barThickness: 14,
            borderWidth: 3,
            borderColor: "transparent",
            borderSkipped: false,
          },
          {
            label: "Deposit",
            data: weeklyActivity.map((day) => day.deposit),
            backgroundColor: "#396AFF",
            borderRadius: 30,
            barThickness: 14,
            borderWidth: 3,
            borderColor: "transparent",
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            align: "end",
            labels: {
              boxWidth: 8,
              usePointStyle: true,
              pointStyle: "circle",
              font: {
                size: 12,
              },
              color: "#6B7280",
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "#1F2937",
            titleColor: "#FFFFFF",
            bodyColor: "#FFFFFF",
            titleFont: {
              size: 14,
            },
            bodyFont: {
              size: 12,
            },
            padding: 8,
            cornerRadius: 4,
          },
          datalabels: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true,
              color: "#F3F3F5",
            },
            ticks: {
              stepSize: 100,
              color: "#718EBF",
              font: {
                size: 12,
              },
            },
            border: {
              display: false,
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#6B7280",
              font: {
                size: 12,
              },
            },
            border: {
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
    <div className="px-2 md:px-6 py-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Weekly Activity
      </h2>

      <div className="h-81 md:bg-white rounded-lg  md:p-6">
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
