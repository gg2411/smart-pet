// ===== PAWSENSE DATA =====
// 30-day health data for Mochi, Golden Retriever, 4 years old

const DOG = {
  name: 'Mochi',
  breed: 'Golden Retriever',
  age: '4 years',
  weight: '28 kg',
  baseline: { hr: 88, temp: 38.5, activity: 6100, sleep: 7.5 }
};

// ===== 7-DAY CHART DATA =====
const CHART_DATA = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  healthy: {
    hr:       [85, 88, 90, 87, 86, 89, 88],
    activity: [84, 78, 91, 88, 72, 95, 80],
    sleep:    [88, 82, 90, 85, 79, 92, 86]
  },
  mild: {
    hr:       [88, 87, 90, 86, 98, 102, 95],
    activity: [85, 81, 88, 84, 60, 55, 65],
    sleep:    [88, 83, 89, 85, 68, 62, 70]
  },
  critical: {
    hr:       [86, 89, 88, 90, 118, 121, 115],
    activity: [83, 80, 90, 86, 32, 28, 40],
    sleep:    [86, 84, 91, 88, 45, 38, 52]
  }
};

// ===== SCENARIO CONFIGS =====
const SCENARIOS = {
  healthy: {
    score: 80, scoreColor: '#3B9E5A', scoreWord: 'Great',
    greeting: 'Mochi is doing great today! 🎉',
    subtitle: 'All vitals within normal range · Last synced 3 min ago',
    showAlert: false,
    vitals: {
      hr:    { val: '88 bpm',  status: 'Normal',  cls: '' },
      temp:  { val: '38.5°C', status: 'Normal',  cls: '' },
      act:   { val: '6,240 steps', status: 'Active',   cls: '' },
      sleep: { val: '7.5 hrs', status: 'Good',    cls: '' }
    },
    todayLog: [
      { dot: '#3B9E5A', event: 'Morning walk', detail: '48 min · 3,800 steps · heart rate stable 85–92 bpm', time: '7:10 AM', tag: 'ok' },
      { dot: '#3B9E5A', event: 'Post-walk meal', detail: 'Appetite normal · full bowl finished in 4 minutes', time: '8:05 AM', tag: 'ok' },
      { dot: '#3B9E5A', event: 'Nap detected', detail: '82 min rest · deep sleep 55 min · quality 88/100', time: '9:30 AM', tag: 'ok' },
      { dot: '#3B9E5A', event: 'Play session', detail: 'Fetch in backyard · 22 min · high energy, no distress', time: '12:15 PM', tag: 'ok' },
      { dot: '#3B9E5A', event: 'Resting period', detail: 'Heart rate 82 bpm · temperature stable · relaxed', time: '3:00 PM', tag: 'ok' },
      { dot: '#3B9E5A', event: 'Evening walk', detail: '35 min · 2,440 steps · good energy throughout', time: '6:30 PM', tag: 'ok' }
    ]
  },

  mild: {
    score: 58, scoreColor: '#E8A020', scoreWord: 'Watch',
    greeting: 'Mochi may need some attention 🔍',
    subtitle: 'Mild anomalies detected · Monitoring closely',
    showAlert: true,
    alertTitle: 'Mild Elevation in Heart Rate & Reduced Activity',
    alertDesc: 'Heart rate 14% above baseline and activity down 36% vs. daily average. Not urgent — but worth monitoring today.',
    vitals: {
      hr:    { val: '102 bpm', status: '↑ Mild',   cls: 'warning' },
      temp:  { val: '38.9°C', status: 'Borderline', cls: 'warning' },
      act:   { val: '3,900 steps', status: '↓ Low', cls: 'warning' },
      sleep: { val: '5.8 hrs', status: 'Restless', cls: 'warning' }
    },
    todayLog: [
      { dot: '#3B9E5A', event: 'Morning walk', detail: '28 min · 2,100 steps · slightly slower than usual', time: '7:30 AM', tag: 'ok' },
      { dot: '#E8A020', event: 'Reduced appetite', detail: 'Left 30% of food in bowl — unusual for Mochi', time: '8:20 AM', tag: 'warning' },
      { dot: '#E8A020', event: 'Restless nap', detail: 'Multiple position changes · sleep quality 58/100', time: '10:00 AM', tag: 'warning' },
      { dot: '#E8A020', event: 'Activity drop detected', detail: 'Steps 36% below daily average for this time of day', time: '12:00 PM', tag: 'warning' },
      { dot: '#E8A020', event: 'Heart rate elevated', detail: '102 bpm at rest · baseline 88 · PawSense flagging', time: '1:45 PM', tag: 'warning' },
      { dot: '#3B9E5A', event: 'Lapping water', detail: 'Normal hydration observed · no signs of distress', time: '3:10 PM', tag: 'ok' }
    ]
  },

  critical: {
    score: 28, scoreColor: '#E24B4A', scoreWord: 'Alert',
    greeting: 'Mochi needs veterinary attention 🚨',
    subtitle: 'Critical anomaly detected · Immediate action recommended',
    showAlert: true,
    alertTitle: '🚨 Critical: Elevated Heart Rate + Fever Pattern + Low Activity',
    alertDesc: 'Heart rate 35% above baseline for 6+ hours, combined with temperature trending up and activity at 18% of normal. This pattern is consistent with infection or acute illness.',
    vitals: {
      hr:    { val: '118 bpm', status: '↑ Critical', cls: 'danger' },
      temp:  { val: '39.7°C', status: '↑ High',      cls: 'danger' },
      act:   { val: '1,100 steps', status: '↓ Very Low', cls: 'danger' },
      sleep: { val: '3.2 hrs', status: 'Disrupted', cls: 'danger' }
    },
    todayLog: [
      { dot: '#E8A020', event: 'Skipped morning walk', detail: 'Mochi refused to leave dog bed — first time in 3 months', time: '7:00 AM', tag: 'warning' },
      { dot: '#E8A020', event: 'Meal refused', detail: 'Did not eat morning meal — appetite at 0%', time: '8:00 AM', tag: 'warning' },
      { dot: '#E24B4A', event: 'Heart rate spike', detail: '118 bpm at rest · 35% above personal baseline of 88 bpm', time: '8:45 AM', tag: 'danger' },
      { dot: '#E24B4A', event: 'Temperature elevated', detail: '39.7°C · above normal range (37.5–39.2°C) · PawSense flagging fever pattern', time: '10:00 AM', tag: 'danger' },
      { dot: '#E24B4A', event: '⚠ PawSense Critical Alert triggered', detail: 'Combination of elevated HR, temperature, and near-zero activity indicates urgent veterinary care needed', time: '10:04 AM', tag: 'danger' },
      { dot: '#E24B4A', event: 'Elevated HR sustained', detail: '118–121 bpm for 6 consecutive hours · no improvement', time: '2:00 PM', tag: 'danger' },
      { dot: '#E24B4A', event: 'No food or water consumed', detail: 'Mochi has not eaten or drunk in 6 hours — risk of dehydration', time: '3:30 PM', tag: 'danger' }
    ]
  }
};

// ===== 30-DAY TIMELINE =====
const TIMELINE = [
  {
    date: 'Today — April 25',
    hasAlert: true,
    events: [
      { type: 'featured', icon: '🚨', time: '10:04 AM', title: 'CRITICAL ALERT: Urgent Veterinary Visit Required', desc: 'Heart rate 118 bpm (35% above baseline), temperature 39.7°C, activity at 18% of normal for 6+ hours. PawSense AI detects high-confidence illness pattern — consistent with acute infection or gastroenteritis. Immediate vet visit recommended.', meta: 'Confidence: 94% · Anomaly score: 9.2/10' },
      { type: 'alert', icon: '🌡️', time: '10:00 AM', title: 'Fever Pattern Detected', desc: 'Temperature trending from 38.5°C baseline to 39.7°C over 5 hours. Exceeds breed-normal ceiling of 39.2°C.', meta: 'Duration: 5 hours sustained' },
      { type: 'alert', icon: '❤️', time: '8:45 AM', title: 'Heart Rate Spike — 118 bpm', desc: 'Resting heart rate jumped from baseline 88 bpm to 118 bpm. Elevated for 2+ hours before alert threshold reached.', meta: 'Deviation: +35% above personal baseline' },
      { type: 'warning', icon: '🦴', time: '8:00 AM', title: 'Meal Refused', desc: 'Mochi did not eat morning meal. Combined with prior warning signals, appetite loss escalated anomaly score.', meta: '' },
      { type: 'warning', icon: '🛏️', time: '7:00 AM', title: 'Refused Morning Walk', desc: 'First refusal of walk in 90+ days. Lethargy detected via accelerometer — near-zero movement for 3 hours overnight.', meta: 'Baseline walk streak broken' }
    ]
  },
  {
    date: 'Yesterday — April 24',
    hasAlert: false,
    events: [
      { type: 'warning', icon: '😴', time: '11:30 PM', title: 'Restless Sleep — Quality 42/100', desc: 'Unusual movement patterns overnight. 14 position changes vs. average 3. Deep sleep phases reduced by 60%.', meta: 'Retrospective: likely early symptom onset' },
      { type: 'warning', icon: '⚡', time: '5:00 PM', title: 'Activity 28% Below Daily Average', desc: 'Evening walk completed but pace 40% slower. Mochi did not engage in usual post-walk play.', meta: '' },
      { type: 'ok', icon: '🥣', time: '12:00 PM', title: 'Lunch — 75% Consumed', desc: 'Slight reduction in appetite noted but within acceptable range. No alert triggered.', meta: '' },
      { type: 'ok', icon: '🚶', time: '7:20 AM', title: 'Morning Walk — 35 min', desc: 'Normal walk, slightly shorter than average 48 min. Vitals stable during activity.', meta: '' }
    ]
  },
  {
    date: 'April 23',
    hasAlert: false,
    events: [
      { type: 'ok', icon: '✅', time: 'All day', title: 'Excellent Health Day — Score 91/100', desc: 'Best score of the week. All vitals nominal, 7,400 steps, 8.1 hrs quality sleep. Baseline confirmed stable.', meta: '' },
      { type: 'info', icon: '📊', time: '8:00 PM', title: 'Weekly Baseline Recalibrated', desc: 'PawSense AI updated Mochi\'s personal baseline models with 30 days of new data. Heart rate baseline confirmed at 88 bpm.', meta: '' }
    ]
  },
  {
    date: 'April 22',
    hasAlert: false,
    events: [
      { type: 'ok', icon: '🏃', time: '4:00 PM', title: 'High Activity Day — 9,200 Steps', desc: 'Long run with owner at Riverside Park. Heart rate peaked at 168 bpm during exertion (healthy). Full recovery within 18 minutes.', meta: 'Exercise HR: expected and normal' },
      { type: 'ok', icon: '😴', time: '9:00 PM', title: 'Deep Sleep — 8.3 hrs', desc: 'Post-exercise recovery sleep. Quality score 94/100. All biometrics stable overnight.', meta: '' }
    ]
  },
  {
    date: 'April 19',
    hasAlert: true,
    events: [
      { type: 'warning', icon: '⚠️', time: '2:30 PM', title: 'Mild Alert: Elevated HR After Heat Exposure', desc: 'Heart rate reached 108 bpm after afternoon nap in direct sun. Owner moved Mochi indoors and HR normalized within 30 min.', meta: 'Resolved without vet visit · Duration: 32 min' },
      { type: 'resolved', icon: '✅', time: '3:02 PM', title: 'Alert Resolved — HR Normalized', desc: 'Heart rate returned to 89 bpm following cooling and hydration. PawSense closed the alert.', meta: '' }
    ]
  },
  {
    date: 'April 15',
    hasAlert: false,
    events: [
      { type: 'info', icon: '💉', time: '10:00 AM', title: 'Veterinary Check-up — All Clear', desc: 'Annual wellness visit. Dr. Sarah Chen confirmed excellent health. Weight 28.2 kg (ideal). Vaccinations updated. No concerns.', meta: 'PawSense report shared with vet · Next visit: October 2025' },
      { type: 'warning', icon: '❤️', time: '10:30 AM', title: 'Expected HR Elevation at Vet — Auto-Flagged', desc: 'Heart rate 110 bpm during visit (white coat effect). PawSense auto-tagged as vet anxiety — not anomalous.', meta: 'Correctly auto-resolved by AI' }
    ]
  },
  {
    date: 'April 8',
    hasAlert: true,
    events: [
      { type: 'warning', icon: '🦴', time: '7:00 AM', title: 'Reduced Appetite — 2 Days Running', desc: 'Mochi ate only 50% of food for 2 consecutive days. Alert triggered on day 2 per consecutive-day rule.', meta: '' },
      { type: 'info', icon: '📱', time: '9:00 AM', title: 'Owner Checked In via App', desc: 'Owner noted Mochi had chewed on a plastic toy the previous day. Monitored for 24h. Appetite returned to normal.', meta: 'Resolved: behavioral, not illness-related' },
      { type: 'resolved', icon: '✅', time: 'April 9', title: 'Appetite Returned to Normal', desc: 'Full meal consumed. Alert closed. Owner note: "She found a treat under the couch and decided eating was worth it again."', meta: '' }
    ]
  }
];

// ===== INSIGHTS =====
const INSIGHTS = [
  {
    urgent: true,
    emoji: '🚨',
    title: 'Critical Health Pattern',
    subtitle: 'Immediate action required',
    body: 'PawSense AI has detected a convergence of three independent anomaly signals — elevated heart rate, fever pattern, and near-zero activity — sustained for 6+ hours. This combination has a 94% predictive accuracy for requiring veterinary intervention based on patterns across 12,000+ similar dog health profiles.',
    metrics: [
      { name: 'Heart rate elevation', val: '+35%', cls: 'up' },
      { name: 'Temperature', val: '39.7°C (↑1.2°)', cls: 'up' },
      { name: 'Activity level', val: '18% of normal', cls: 'up' },
      { name: 'AI confidence', val: '94%', cls: 'up' }
    ],
    action: '📅 Book Emergency Vet Visit',
    actionCls: ''
  },
  {
    urgent: false,
    emoji: '📈',
    title: 'Heart Rate Analysis',
    subtitle: 'Last 7 days',
    body: 'Mochi\'s resting heart rate has been stable at 88 bpm for the past 3 months. The sudden spike to 118–121 bpm over the past 24 hours represents a statistically significant deviation. Normal exertion-based elevations during walks typically resolve within 18 minutes — this pattern has not resolved in 6+ hours.',
    metrics: [
      { name: 'Personal baseline', val: '88 bpm', cls: 'ok' },
      { name: 'Current resting HR', val: '118 bpm', cls: 'up' },
      { name: 'Duration elevated', val: '6+ hours', cls: 'up' },
      { name: 'Normal recovery time', val: '~18 min', cls: 'ok' }
    ],
    action: 'View Full HR History',
    actionCls: 'secondary'
  },
  {
    urgent: false,
    emoji: '🌡️',
    title: 'Temperature Trend',
    subtitle: 'Fever pattern detected',
    body: 'Canine normal temperature range is 37.5–39.2°C. Mochi\'s temperature of 39.7°C exceeds the upper bound and has been trending upward since early morning. Combined with other signals, this is consistent with an infection or inflammatory response.',
    metrics: [
      { name: 'Normal range', val: '37.5–39.2°C', cls: 'ok' },
      { name: 'Current reading', val: '39.7°C', cls: 'up' },
      { name: '5-hour trend', val: '+1.2°C rise', cls: 'up' },
      { name: 'Hydration risk', val: 'Moderate', cls: 'warn' }
    ],
    action: 'Download Temperature Log',
    actionCls: 'secondary'
  },
  {
    urgent: false,
    emoji: '😴',
    title: 'Sleep Pattern Disruption',
    subtitle: 'Started 48 hours ago',
    body: 'Sleep quality has dropped from Mochi\'s average 86/100 to 38/100 over the past 2 nights. Retrospective analysis shows the sleep disruption predates the heart rate alert by ~36 hours — an early signal that could be used for even earlier intervention.',
    metrics: [
      { name: 'Average sleep quality', val: '86/100', cls: 'ok' },
      { name: 'Last night quality', val: '38/100', cls: 'up' },
      { name: 'Deep sleep time', val: '↓ 60%', cls: 'up' },
      { name: 'Early signal lag', val: '~36 hrs', cls: 'warn' }
    ],
    action: 'View Sleep History',
    actionCls: 'secondary'
  },
  {
    urgent: false,
    emoji: '📋',
    title: 'Historical Comparison',
    subtitle: 'April 15 vet visit — all clear',
    body: 'At Mochi\'s last annual check-up 10 days ago, all biometrics were within ideal ranges and Dr. Chen confirmed excellent health. This confirms that the current anomaly is acute and recent — not a pre-existing condition. Weight was 28.2 kg (ideal range for breed).',
    metrics: [
      { name: 'Days since last vet visit', val: '10 days', cls: 'warn' },
      { name: 'Vet assessment Apr 15', val: 'All clear', cls: 'ok' },
      { name: 'Anomaly onset', val: '~36 hrs ago', cls: 'warn' },
      { name: 'Vaccination status', val: 'Current', cls: 'ok' }
    ],
    action: 'View Apr 15 Report',
    actionCls: 'secondary'
  },
  {
    urgent: false,
    emoji: '🏃',
    title: 'Activity Intelligence',
    subtitle: 'Exercise & recovery patterns',
    body: 'Mochi\'s activity baseline is 6,100 steps/day with weekly peaks on Saturday (avg 9,200 steps). The current 1,100 steps represents an 82% drop from baseline and is the second-lowest day on record. Previous low was April 8 (appetite concern, resolved).',
    metrics: [
      { name: 'Daily step baseline', val: '6,100', cls: 'ok' },
      { name: 'Steps today', val: '1,100 (−82%)', cls: 'up' },
      { name: 'Best day this month', val: '9,200 (Apr 22)', cls: 'ok' },
      { name: 'Streak (walk days)', val: 'Broken today', cls: 'up' }
    ],
    action: 'View Activity Log',
    actionCls: 'secondary'
  }
];

// ===== VET REPORT =====
const VET_REPORT = {
  date: 'April 25, 2025 — 10:04 AM',
  urgency: 'URGENT — Same-Day Visit Recommended',
  vitals: [
    { label: 'Heart Rate', val: '118', unit: 'bpm', danger: true, flag: '↑ 35% above baseline' },
    { label: 'Temperature', val: '39.7', unit: '°C', danger: true, flag: '↑ Exceeds normal range' },
    { label: 'Activity', val: '18%', unit: 'of normal', danger: true, flag: '↓ Near-zero movement' },
    { label: 'Sleep Quality', val: '38', unit: '/100', danger: true, flag: '↓ 56 pts below average' }
  ],
  findings: [
    { type: 'critical', icon: '🔴', title: 'Sustained Tachycardia', desc: 'Resting heart rate of 118–121 bpm for 6+ consecutive hours. Mochi\'s established personal baseline is 88 bpm (confirmed over 90 days of data). Exertion-based elevation has been ruled out — Mochi has been stationary for 6+ hours.' },
    { type: 'critical', icon: '🔴', title: 'Pyrexia (Fever)', desc: 'Temperature of 39.7°C, exceeding the canine normal ceiling of 39.2°C. Temperature has risen 1.2°C over 5 hours. Not attributable to exercise or environmental heat (indoor, shaded environment confirmed by owner).' },
    { type: 'critical', icon: '🔴', title: 'Anorexia & Lethargy', desc: 'Complete refusal of food and water for 8+ hours. Walk refused for first time in 90+ days. Accelerometer data confirms near-zero voluntary movement since 6:00 AM.' },
    { type: 'warning', icon: '🟡', title: 'Prodromal Signs (48h Prior)', desc: 'Retrospective analysis shows early signals 36–48 hours before main alert: sleep quality dropped from 86/100 to 58/100, appetite reduced to 75%, and evening pace slowed by 40%. PawSense flagged these as mild concern-level.' }
  ],
  differentials: 'Acute infection (bacterial/viral) · Gastroenteritis · Pancreatitis · Ingested foreign body · Tick-borne illness (Lyme, Ehrlichia)',
  history: 'Annual wellness visit April 15, 2025 — Dr. Sarah Chen — all clear. Vaccinations current. Weight 28.2 kg. No prior serious illness episodes. One mild heat-related HR elevation on April 19 — resolved spontaneously.'
};
