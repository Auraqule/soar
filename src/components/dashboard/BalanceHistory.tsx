import { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { useStore } from "../../store";

Chart.register(...registerables);

const BalanceHistory = () => {
  const { balanceHistory } = useStore();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !balanceHistory) return;

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
        datasets: [
          {
            label: "Balance",
            data: balanceHistory.map((item) => item.amount),
            borderColor: "#1814F3",
            backgroundColor: (context) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;

              if (!chartArea) {
                return undefined;
              }

              const gradient = ctx.createLinearGradient(
                0, // x0 (start of gradient)
                chartArea.top, // y0 (start of gradient)
                0, // x1 (end of gradient)
                chartArea.bottom // y1 (end of gradient)
              );

              gradient.addColorStop(0, "rgba(45, 96, 255, 0.5)"); // Start color (50% opacity)
              gradient.addColorStop(1, "rgba(45, 96, 255, 0)"); // End color (fully transparent)

              return gradient;
            },
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
            callbacks: {
              label: function (context) {
                const label = context.dataset.label || "";
                const value = context.raw as number;
                return `${label}: $${value}`;
              },
            },
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
              color: "rgba(0, 0, 0, 0.05)", // Light gray grid lines
              tickBorderDash: [2, 4], // Dotted grid lines for y-axis
            },
            ticks: {
              stepSize: 200,
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
              display: true,
              color: "#DFE5EE",
              tickBorderDash: [2, 4],
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
  }, [balanceHistory]);

  return (
    <div className="px-2 md:py-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Balance History
      </h2>

      <div className="h-69 md:bg-white rounded-3xl md:p-6">
        <canvas
          ref={chartRef}
          aria-label="Balance history line chart"
          role="img"
        ></canvas>
      </div>
    </div>
  );
};

export default BalanceHistory;
