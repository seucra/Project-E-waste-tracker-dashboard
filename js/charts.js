/* ==========================================================================
   CHART.JS VISUALIZATION RENDERERS
   ========================================================================== */

let scorecardChartInstance = null;

function initScorecardChart() {
  const ctx = document.getElementById('scorecardChart').getContext('2d');
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
      plugins: {
        legend: { labels: { color: '#f9e0d8' } }
      },
      scales: {
        x: { ticks: { color: '#bca79f' }, grid: { color: '#281d19' } },
        y: { ticks: { color: '#bca79f' }, grid: { color: '#281d19' } }
      }
    }
  });
}

function initDistrictChart() {
  const ctx = document.getElementById('districtChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: districtData.slice(0, 7).map(d => d.name),
      datasets: [{
        label: 'Population (Impact Scale)',
        data: districtData.slice(0, 7).map(d => d.pop),
        backgroundColor: '#764634',
        borderColor: '#f8b89f',
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: { legend: { labels: { color: '#f9e0d8' } } },
      scales: {
        x: { ticks: { color: '#bca79f' }, grid: { color: '#281d19' } },
        y: { ticks: { color: '#bca79f' }, grid: { color: '#281d19' } }
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
