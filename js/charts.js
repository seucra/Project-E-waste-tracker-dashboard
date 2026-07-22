/* ==========================================================================
   CHART.JS VISUALIZATION RENDERERS (RESPONSIVE TOUCH & FLUID ASPECT RATIOS)
   ========================================================================== */

let scorecardChartInstance = null;
let districtChartInstance = null;

function initScorecardChart() {
  const canvas = document.getElementById('scorecardChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  scorecardChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: scorecardData.map(d => `Pillar ${d.id}`),
      datasets: [
        {
          label: 'Max Weight',
          data: scorecardData.map(d => d.weight),
          backgroundColor: '#30231e',
          borderColor: '#84716b',
          borderWidth: 1
        },
        {
          label: 'Score Earned',
          data: scorecardData.map(d => d.score),
          backgroundColor: '#f8b89f',
          borderColor: '#e9aa92',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#f9e0d8',
            font: { size: 11 }
          }
        },
        tooltip: {
          padding: 10,
          titleFont: { size: 12 },
          bodyFont: { size: 12 }
        }
      },
      scales: {
        x: { ticks: { color: '#bca79f', font: { size: 10 } }, grid: { color: '#281d19' } },
        y: { ticks: { color: '#bca79f', font: { size: 10 } }, grid: { color: '#281d19' } }
      }
    }
  });
}

function initDistrictChart() {
  const canvas = document.getElementById('districtChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  districtChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: districtData.slice(0, 7).map(d => d.name.split(' ')[0]),
      datasets: [{
        label: 'Population (Millions)',
        data: districtData.slice(0, 7).map(d => (d.pop / 1000000).toFixed(2)),
        backgroundColor: '#764634',
        borderColor: '#f8b89f',
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#f9e0d8', font: { size: 11 } } },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `Population: ${(context.raw * 1000000).toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        x: { ticks: { color: '#bca79f', font: { size: 10 } }, grid: { color: '#281d19' } },
        y: { ticks: { color: '#bca79f', font: { size: 10 } }, grid: { color: '#281d19' } }
      }
    }
  });
}

function updateScorecardChartData() {
  if (scorecardChartInstance) {
    scorecardChartInstance.data.datasets[1].data = scorecardData.map(d => d.score);
    scorecardChartInstance.update();
  }
}
