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

function formatInline(str) {
  return str
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color:var(--accent-secondary); text-decoration:underline;">$1</a>');
}

async function loadMarkdownFile(filename, elementId) {
  const area = document.getElementById(elementId);
  if (!area) return;
  try {
    const res = await fetch(filename);
    if (res.ok) {
      let text = await res.text();
      // Remove YAML frontmatter if present
      text = text.replace(/^---[\s\S]*?---\s*/, '');

      // Parse Math blocks ($$ ... $$)
      text = text.replace(/\$\$([\s\S]*?)\$\$/g, '<div class="math-block">$1</div>');
      // Parse inline Math ($ ... $)
      text = text.replace(/\$([^\$\n]+)\$/g, '<span class="math-inline">$1</span>');

      const lines = text.split('\n');
      let html = '';
      let inTable = false;
      let inList = false;

      for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        // Table row check
        if (line.startsWith('|') && line.endsWith('|')) {
          if (/^\|[\s\-:|]+\|$/.test(line)) {
            continue;
          }
          const cells = line.split('|').slice(1, -1).map(c => c.trim());
          if (!inTable) {
            inTable = true;
            html += '<table><thead><tr>';
            cells.forEach(c => { html += `<th>${formatInline(c)}</th>`; });
            html += '</tr></thead><tbody>';
          } else {
            html += '<tr>';
            cells.forEach(c => { html += `<td>${formatInline(c)}</td>`; });
            html += '</tr>';
          }
          continue;
        } else if (inTable) {
          inTable = false;
          html += '</tbody></table>';
        }

        // Headings
        if (/^#\s+(.*)/.test(line)) {
          html += `<h1>${formatInline(line.replace(/^#\s+/, ''))}</h1>`;
          continue;
        }
        if (/^##\s+(.*)/.test(line)) {
          html += `<h2>${formatInline(line.replace(/^##\s+/, ''))}</h2>`;
          continue;
        }
        if (/^###\s+(.*)/.test(line)) {
          html += `<h3>${formatInline(line.replace(/^###\s+/, ''))}</h3>`;
          continue;
        }
        if (/^####\s+(.*)/.test(line)) {
          html += `<h4>${formatInline(line.replace(/^####\s+/, ''))}</h4>`;
          continue;
        }

        // Blockquote
        if (line.startsWith('>')) {
          html += `<blockquote>${formatInline(line.replace(/^>\s*/, ''))}</blockquote>`;
          continue;
        }

        // Horizontal rule
        if (/^---$|^\*\*\*$|^___$/.test(line)) {
          html += '<hr style="border:0; border-top:1px solid var(--border-color); margin:1.5rem 0;">';
          continue;
        }

        // Empty line
        if (line === '') {
          if (inList) {
            html += '</ul>';
            inList = false;
          }
          html += '<br>';
          continue;
        }

        // Bullet lists
        if (/^[\-\*]\s+(.*)/.test(line)) {
          if (!inList) {
            inList = true;
            html += '<ul>';
          }
          html += `<li>${formatInline(line.replace(/^[\-\*]\s+/, ''))}</li>`;
          continue;
        }

        // Paragraph
        html += `<p>${formatInline(line)}</p>`;
      }

      if (inTable) html += '</tbody></table>';
      if (inList) html += '</ul>';

      area.innerHTML = html;
    } else {
      area.innerHTML = `<p style="color:var(--accent-primary)">Could not load ${filename} file directly.</p>`;
    }
  } catch(e) {
    area.innerHTML = `<p style="color:var(--accent-primary)">Error loading ${filename}: ${e.message}</p>`;
  }
}

async function loadReport() {
  await loadMarkdownFile('UP_EWaste_Research_Report_Revised.md', 'reportRenderArea');
}

async function loadAuditReport() {
  await loadMarkdownFile('UP_EWaste_Research_Report_Revised.md', 'auditReportRenderArea');
}

function printReportArea(elementId, title) {
  const reportContent = document.getElementById(elementId).innerHTML;
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: sans-serif; padding: 20px; color: #111; line-height: 1.6; }
          h1, h2, h3 { color: #871f21; border-bottom: 1px solid #ccc; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #f4f4f4; color: #871f21; }
          blockquote { background: #f4f4f4; padding: 10px; border-left: 4px solid #871f21; }
          .math-block { background: #f9f9f9; padding: 10px; font-family: monospace; border: 1px solid #ddd; }
        </style>
      </head>
      <body>${reportContent}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

function printReport() {
  printReportArea('reportRenderArea', 'Uttar Pradesh E-Waste Executive Research Report');
}

function printAuditReport() {
  printReportArea('auditReportRenderArea', 'Uttar Pradesh E-Waste Data Validation & Score Math Proof');
}

window.addEventListener('DOMContentLoaded', () => {
  renderScorecardTable();
  renderDistrictTable();
  initScorecardChart();
  initDistrictChart();
  loadReport();
  loadAuditReport();
});

