# 🐾 PawSense — Smart Health Monitoring for Dogs

> The Oura Ring for dogs. Real-time biometric tracking, AI anomaly detection, and vet-ready health reports.

## Live Demo

Deployed at Vercel — see [deployment URL].

## Features

- **Health Score Dashboard** — daily score (0–100) with heart rate, temperature, activity, sleep vitals
- **AI Anomaly Detection** — personalized baselines, early illness detection, multi-signal alerts
- **30-Day Timeline** — complete health history with event-level detail
- **AI Insights** — pattern analysis, retrospective early-warning signals, predictive flags
- **Vet Report Generator** — printable PDF-ready clinical summary with differential diagnoses

## Demo Scenarios

The dashboard includes three interactive demo states:
- **Healthy Day** — all vitals normal, score 80
- **Mild Concern** — HR +14%, activity −36%, sleep disrupted, score 58
- **Critical Alert** — HR +35%, fever pattern, near-zero activity, score 28 — vet visit required

## Tech Stack

Pure HTML/CSS/JS — no build step, no framework, deploys as static site.

- [Chart.js 4.4.1](https://www.chartjs.org/) — health trend charts
- [DM Serif Display + DM Sans](https://fonts.google.com/) — typography
- [Vercel](https://vercel.com) — hosting

## Deploy

1. Push to GitHub
2. Import repo on vercel.com → auto-deploys
3. No build command needed (static site)
