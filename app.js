// ===== PAWSENSE APP =====

let currentScenario = 'healthy';
let hrChart, actChart, sleepChart;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initDemoSwitcher();
  initCharts();
  applyScenario('healthy');
  renderTimeline();
  renderInsights();
  renderVetReport();
  document.getElementById('dismissAlert').addEventListener('click', () => {
    document.getElementById('alertBanner').style.display = 'none';
  });
});

// ===== NAV =====
function initNav() {
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => switchView(tab.dataset.view));
  });
}

function switchView(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('view-' + viewId).classList.add('active');
  document.querySelector('[data-view="' + viewId + '"]').classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== DEMO SWITCHER =====
function initDemoSwitcher() {
  document.querySelectorAll('.demo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.demo-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyScenario(btn.dataset.scenario);
    });
  });
}

// ===== APPLY SCENARIO =====
function applyScenario(scenario) {
  currentScenario = scenario;
  const s = SCENARIOS[scenario];
  const d = CHART_DATA[scenario];

  // Score ring
  const circ = 2 * Math.PI * 56;
  const offset = circ * (1 - s.score / 100);
  const ring = document.getElementById('scoreCircle');
  ring.style.strokeDashoffset = offset.toFixed(1);
  ring.style.stroke = s.scoreColor;
  document.getElementById('scoreNumber').textContent = s.score;
  document.getElementById('scoreNumber').style.color = s.scoreColor;
  document.getElementById('scoreWord').textContent = s.scoreWord;

  // Hero text
  document.getElementById('heroGreeting').textContent = s.greeting;
  document.getElementById('heroSubtitle').textContent = s.subtitle;

  // Vitals
  setVital('HR', s.vitals.hr);
  setVital('Temp', s.vitals.temp);
  setVital('Act', s.vitals.act);
  setVital('Sleep', s.vitals.sleep);

  // Alert
  const banner = document.getElementById('alertBanner');
  if (s.showAlert) {
    banner.style.display = 'block';
    document.getElementById('alertTitle').textContent = s.alertTitle;
    document.getElementById('alertDesc').textContent = s.alertDesc;
    document.getElementById('alertBadge').style.display = 'flex';
  } else {
    banner.style.display = 'none';
    document.getElementById('alertBadge').style.display = 'none';
  }

  // Charts
  updateChart(hrChart,   d.hr,       scenario);
  updateChart(actChart,  d.activity,  scenario);
  updateChart(sleepChart, d.sleep,   scenario);

  // Today's log
  renderTodayLog(s.todayLog);
}

function setVital(key, v) {
  const valEl  = document.getElementById('vital' + key);
  const statEl = document.getElementById('status' + key);
  const wrap   = document.getElementById('vital-' + key.toLowerCase().replace('temp','temp').replace('hr','hr').replace('act','act').replace('sleep','sleep'));
  if (valEl)  valEl.textContent = v.val;
  if (statEl) {
    statEl.textContent = v.status;
    statEl.className = 'vital-status ' + (v.cls || 'ok');
  }
  if (wrap) {
    wrap.classList.remove('warning', 'danger');
    if (v.cls) wrap.classList.add(v.cls);
  }
}

// ===== CHARTS =====
function initCharts() {
  const chartDefaults = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ctx.parsed.y } } },
    scales: {
      y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11 }, color: '#6B6560' } },
      x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#6B6560' } }
    }
  };

  hrChart = new Chart(document.getElementById('hrTrendChart'), {
    type: 'line',
    data: buildHRData(CHART_DATA.healthy.hr, 'healthy'),
    options: {
      ...chartDefaults,
      scales: {
        ...chartDefaults.scales,
        y: { ...chartDefaults.scales.y, min: 60, max: 130 }
      }
    }
  });

  actChart = new Chart(document.getElementById('actChart'), {
    type: 'bar',
    data: buildSimpleData(CHART_DATA.healthy.activity, '#3B9E5A'),
    options: { ...chartDefaults, scales: { ...chartDefaults.scales, y: { ...chartDefaults.scales.y, min: 0, max: 100 } } }
  });

  sleepChart = new Chart(document.getElementById('sleepChart'), {
    type: 'bar',
    data: buildSimpleData(CHART_DATA.healthy.sleep, '#378ADD'),
    options: { ...chartDefaults, scales: { ...chartDefaults.scales, y: { ...chartDefaults.scales.y, min: 0, max: 100 } } }
  });
}

function buildHRData(data, scenario) {
  const color = scenario === 'critical' ? '#E24B4A' : scenario === 'mild' ? '#E8A020' : '#3B9E5A';
  const pointColors = data.map((v, i) => (scenario !== 'healthy' && i >= 4) ? '#E24B4A' : color);
  return {
    labels: CHART_DATA.labels,
    datasets: [
      {
        label: 'Heart Rate',
        data,
        borderColor: color,
        backgroundColor: color + '15',
        borderWidth: 2.5,
        tension: 0.4,
        fill: true,
        pointRadius: data.map((v, i) => (scenario !== 'healthy' && i >= 4) ? 5 : 3),
        pointBackgroundColor: pointColors
      },
      {
        label: 'Baseline',
        data: new Array(7).fill(88),
        borderColor: 'rgba(0,0,0,0.18)',
        borderDash: [5, 4],
        borderWidth: 1.5,
        pointRadius: 0,
        fill: false,
        tension: 0
      }
    ]
  };
}

function buildSimpleData(data, color) {
  return {
    labels: CHART_DATA.labels,
    datasets: [{
      label: 'Score',
      data,
      backgroundColor: data.map((v, i) => i >= 4 ? (v < 50 ? '#E24B4A55' : '#E8A02055') : color + '88'),
      borderColor: data.map((v, i) => i >= 4 ? (v < 50 ? '#E24B4A' : '#E8A020') : color),
      borderWidth: 1.5,
      borderRadius: 6
    }]
  };
}

function updateChart(chart, data, scenario) {
  if (!chart) return;
  const isHR = chart.canvas.id === 'hrTrendChart';
  if (isHR) {
    chart.data = buildHRData(data, scenario);
  } else {
    const color = chart.canvas.id === 'actChart' ? '#3B9E5A' : '#378ADD';
    chart.data = buildSimpleData(data, color);
  }
  chart.update();
}

// ===== TODAY'S LOG =====
function renderTodayLog(items) {
  const container = document.getElementById('todayLog');
  container.innerHTML = items.map((item, i) => `
    <div class="log-item">
      <div class="log-dot-wrap">
        <div class="log-dot" style="background:${item.dot}"></div>
        ${i < items.length - 1 ? '<div class="log-line"></div>' : ''}
      </div>
      <div class="log-content">
        <div class="log-event">${item.event} <span class="log-tag ${item.tag}">${item.tag === 'ok' ? 'Normal' : item.tag === 'warning' ? 'Watch' : 'Alert'}</span></div>
        <div class="log-detail">${item.detail}</div>
      </div>
      <div class="log-time">${item.time}</div>
    </div>
  `).join('');
}

// ===== TIMELINE =====
function renderTimeline() {
  const container = document.getElementById('fullTimeline');
  container.innerHTML = TIMELINE.map(day => `
    <div class="timeline-day">
      <div class="timeline-day-header">
        ${day.date}
        <span class="day-badge ${day.hasAlert ? 'has-alert' : ''}">${day.hasAlert ? '⚠ Alert' : 'No alerts'}</span>
      </div>
      <div class="timeline-events">
        ${day.events.map(ev => `
          <div class="tl-event ${ev.type}">
            <div class="tl-icon">${ev.icon}</div>
            <div class="tl-body">
              <div class="tl-title">${ev.title}</div>
              <div class="tl-desc">${ev.desc}</div>
              ${ev.meta ? `<div class="tl-meta">${ev.meta}</div>` : ''}
            </div>
            <div class="tl-time">${ev.time}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// ===== INSIGHTS =====
function renderInsights() {
  const grid = document.getElementById('insightsGrid');
  grid.innerHTML = INSIGHTS.map(ins => `
    <div class="insight-card ${ins.urgent ? 'urgent' : ''}">
      <div class="insight-header">
        <div class="insight-emoji">${ins.emoji}</div>
        <div>
          <div class="insight-title">${ins.title}</div>
          <div class="insight-subtitle">${ins.subtitle}</div>
        </div>
      </div>
      <div class="insight-body">${ins.body}</div>
      ${ins.metrics.map(m => `
        <div class="insight-metric">
          <span class="metric-name">${m.name}</span>
          <span class="metric-val ${m.cls}">${m.val}</span>
        </div>
      `).join('')}
      <button class="insight-action ${ins.actionCls}" onclick="${ins.urgent ? "switchView('vet')" : 'void(0)'}">${ins.action}</button>
    </div>
  `).join('');
}

// ===== VET REPORT =====
function renderVetReport() {
  const r = VET_REPORT;
  document.getElementById('vetReport').innerHTML = `
    <div class="vet-report-header">
      <div>
        <div class="vet-report-title">🐾 PawSense Health Report</div>
        <div class="vet-report-sub">Patient: Mochi · Golden Retriever · 4 yrs · 28 kg</div>
      </div>
      <div class="vet-report-date">
        Generated: ${r.date}<br>
        <span class="vet-urgency">${r.urgency}</span>
      </div>
    </div>
    <div class="vet-report-body">
      <div class="vet-section">
        <div class="vet-section-title">Current Vitals</div>
        <div class="vet-vitals">
          ${r.vitals.map(v => `
            <div class="vet-vital">
              <div class="vet-vital-label">${v.label}</div>
              <div class="vet-vital-val ${v.danger ? 'danger' : ''}">${v.val}</div>
              <div class="vet-vital-unit">${v.unit}</div>
              ${v.flag ? `<div class="vet-vital-flag">${v.flag}</div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>

      <div class="vet-section">
        <div class="vet-section-title">Clinical Findings</div>
        ${r.findings.map(f => `
          <div class="vet-finding ${f.type}">
            <div class="vet-finding-icon">${f.icon}</div>
            <div class="vet-finding-text"><strong>${f.title}</strong>${f.desc}</div>
          </div>
        `).join('')}
      </div>

      <div class="vet-section">
        <div class="vet-section-title">Differential Diagnoses to Consider</div>
        <p style="font-size:14px; color: var(--text-muted); line-height:1.7">${r.differentials}</p>
      </div>

      <div class="vet-section">
        <div class="vet-section-title">Medical History</div>
        <p style="font-size:14px; color: var(--text-muted); line-height:1.7">${r.history}</p>
      </div>

      <div class="vet-section" style="text-align:center">
        <p style="font-size:12px; color:var(--text-faint); margin-bottom:8px">Report generated by PawSense AI · For informational purposes only · Not a substitute for professional veterinary diagnosis</p>
        <button class="vet-print-btn" onclick="window.print()">🖨️ Print / Save PDF for Vet</button>
      </div>
    </div>
  `;
}
