const ctx = document.getElementById("stats").getContext("2d");

export function createChart(stats) {
  return new Chart(ctx, {
    type: "radar",
    data: {
      labels: [
        "HP",
        "Attack",
        "Defense",
        ["Special", "Attack"],
        ["Special", "Defense"],
        "Speed",
      ],
      datasets: [
        {
          data: stats,
          borderWidth: 1,
          color: "#fff",
          backgroundColor: "#fff",
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        r: {
          grid: {
            color: "#fff",
          },
          pointLabels: {
            color: "#fff",
          },
          angleLines: {
            color: "#fff",
          },
        },
      },
    },
  });
}
