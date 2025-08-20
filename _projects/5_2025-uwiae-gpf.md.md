---
layout: page
title: Point Forecasts to Probability Clouds — Probabilistic Electricity Price Forecasting
description: UWIAE-GPF: Generative probabilistic forecasting of day-ahead electricity prices with calibrated uncertainty
img: /assets/img/uwiae-gpf.png
importance: 1
category: research
related_publications: false
pdf_url: /assets/pdf/uwiae-gpf-poster.pdf
tags: [Time Series, Probabilistic Forecasting, Energy Markets, PyTorch, Deep Learning]
---

## Overview
I built a **probabilistic forecasting pipeline** that turns single-point predictions of day-ahead electricity prices into **scenario clouds** with calibrated uncertainty. The model—**UWIAE-GPF (Univariate Weak-Innovation Autoencoder for Generative Probabilistic Forecasting)**—learns spike-and-tail behavior typical in electricity markets and produces both point trajectories and **risk bands** (90/50/10% intervals).

**Duration:** Jan 2025 – May 2025  
**Role:** Solo Developer
**Institution:** Cornell University
**Supervisor:** Professor [Lang Tong](https://www.engineering.cornell.edu/people/lang-tong/)

**Why it matters:** Operators and traders need not only *accurate* forecasts but also *confidence bounds* to plan for best/worst cases.

## Data & Task
- **Market:** NYISO Day-Ahead LBMP (N.Y.C. zone), **2018–2023**, hourly.  
- **Setup:** Rolling windows of past **1–28 days** → forecast **next-day (24 h)** price path.  
- **Split:** Train (2018–2022), Test (2023).  
- **Eval:** Normalized errors (e.g., **NMSE**) + coverage of prediction intervals.

## Method
- **UWIAE-GPF:** Innovation-autoencoder with reconstruction/innovation critics + adversarial generator to model price dynamics and rare spikes.  
- **Deterministic baselines:** PatchTST, iTransformer, Informer, GRU, NLinear, StemGNN.  
- **Probabilistic baselines:** TimeGrad (diffusion), RealNVP/MAF flows (GRU/Transformer-conditioned).  
- **Uncertainty:** After convergence, draw **1,000** latent samples per window to form **scenario ensembles** → mean/median paths + central bands (90/50/10%).

## Results
- **Best NMSE = 0.093**, outperforming deterministic Transformers and earlier generative baselines.  
- **↓65.3%** NMSE vs **PatchTST** (best deterministic) and **↓39.2%** vs original WIAE, with **~4× faster** per-epoch training than PatchTST.  
- Interval bands capture spikes better, improving **risk-aware planning**.

## Implementation
- **Stack:** Python, **PyTorch**, NumPy, Pandas, matplotlib; Linux; experiment tracking via scripts.  
- **Deployment angle:** Saves ensembles & summary stats for downstream dashboards or bidding logic.

## Highlights
- **Probabilistic wins → lower risk:** Calibrated intervals and diverse scenario paths.  
- **Scalable:** Trains efficiently while modeling heavy tails/spikes.  
- **Transferable:** Template can be adapted to other volatile time series.

## Artifacts
- **Poster (PDF):** [Download](/assets/pdfs/uwiae-gpf-poster.pdf)
- **Contact:** haixizhang02@gmail.com
