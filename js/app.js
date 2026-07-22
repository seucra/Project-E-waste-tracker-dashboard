/* ==========================================================================
   MAIN APPLICATION CONTROLLER & TAB NAVIGATION
   ========================================================================== */

function switchTab(tabId, evt) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  
  if (evt && evt.target) {
    evt.target.classList.add('active');
  }
  const targetContent = document.getElementById(`tab-${tabId}`);
  if (targetContent) {
    targetContent.classList.add('active');
  }
}

function renderScorecardTable() {
  const tbody = document.getElementById('scorecardTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  scorecardData.forEach(row => {
    const badgeClass = row.score >= 10 ? 'badge-success' : (row.score > 0 ? 'badge-warning' : 'badge-critical');
    tbody.innerHTML += `
      <tr>
        <td><strong>${row.name}</strong></td>
        <td>${row.weight.toFixed(1)}</td>
        <td>${row.benchmark.toFixed(1)}</td>
        <td>${row.achieved.toFixed(1)}</td>
        <td><span class="badge ${badgeClass}">${row.score.toFixed(1)}</span></td>
      </tr>
    `;
  });
}

function renderDistrictTable() {
  const tbody = document.getElementById('districtTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  districtData.forEach(d => {
    tbody.innerHTML += `
      <tr>
        <td><strong>${d.name}</strong></td>
        <td>${d.pop.toLocaleString()}</td>
        <td>Category Breakdown Pending</td>
        <td>CPCB NGT Report 2025</td>
      </tr>
    `;
  });
}

async function loadReport() {
  const area = document.getElementById('reportRenderArea');
  if (!area) return;
  try {
    const res = await fetch('REPORT.md');
    if (res.ok) {
      const text = await res.text();
      let html = text
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/```([\s\S]*?)```/g, '<blockquote style="font-family:monospace; white-space:pre-wrap;">$1</blockquote>')
        .replace(/\n\n/g, '<br><br>');
      area.innerHTML = html;
    }
  } catch(e) {
    area.innerHTML = '<p>Could not load REPORT.md file directly.</p>';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  renderScorecardTable();
  renderDistrictTable();
  initScorecardChart();
  initDistrictChart();
  loadReport();
});
