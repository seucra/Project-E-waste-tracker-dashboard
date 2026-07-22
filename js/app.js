/* ==========================================================================
   MAIN APPLICATION CONTROLLER, NAVIGATION & SEARCH ENGINE
   ========================================================================== */

function switchTab(tabId, evt) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  
  if (evt && evt.target) {
    evt.target.classList.add('active');
    evt.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
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

function renderDistrictTable(filterQuery = '') {
  const tbody = document.getElementById('districtTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  
  const filtered = districtData.filter(d => 
    d.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colSpan="4" style="text-align:center; color:var(--text-muted);">No districts matching "${filterQuery}"</td></tr>`;
    return;
  }

  filtered.forEach(d => {
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

function filterDistricts(query) {
  renderDistrictTable(query);
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

function printReport() {
  const reportContent = document.getElementById('reportRenderArea').innerHTML;
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>Uttar Pradesh E-Waste Executive Report</title>
        <style>
          body { font-family: sans-serif; padding: 20px; color: #111; line-height: 1.6; }
          h1, h2, h3 { color: #871f21; border-bottom: 1px solid #ccc; }
          blockquote { background: #f4f4f4; padding: 10px; border-left: 4px solid #871f21; }
        </style>
      </head>
      <body>${reportContent}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

window.addEventListener('DOMContentLoaded', () => {
  renderScorecardTable();
  renderDistrictTable();
  initScorecardChart();
  initDistrictChart();
  loadReport();
});
