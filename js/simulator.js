/* ==========================================================================
   LIVE TARGET BENCHMARK SIMULATOR ENGINE
   ========================================================================== */

function recalculateScore() {
  const t6 = parseFloat(document.getElementById('sim-target-6').value) || 1.0;
  const t7 = parseFloat(document.getElementById('sim-target-7').value) || 20.0;
  
  const s6 = (0.5 / t6) * 10.0;
  const s7 = (1.0 / t7) * 10.0;
  
  scorecardData[5].score = Math.min(10.0, s6);
  scorecardData[6].score = Math.min(10.0, s7);

  document.getElementById('sim-score-6').innerText = `+${s6.toFixed(1)} Score`;
  document.getElementById('sim-score-7').innerText = `+${s7.toFixed(1)} Score`;

  const totalScore = scorecardData.reduce((acc, curr) => acc + curr.score, 0);
  document.getElementById('headerScoreDisplay').innerText = totalScore.toFixed(1);
  document.getElementById('kpiScore').innerText = `${totalScore.toFixed(1)} / 100`;

  renderScorecardTable();
  updateScorecardChartData();
}
