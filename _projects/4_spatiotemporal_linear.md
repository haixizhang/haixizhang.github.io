---
layout: page
title: Spatiotemporal-Linear - Universal Multivariate Time Series Forecasting
description: Novel forecasting model using Residual Neural Networks with Spatial Attention
img: /assets/img/forecasting.png
importance: 4
category: research
arxiv_url: https://arxiv.org/abs/2312.14869
---
## Project Overview

Development of SpatioTemporal-Linear (STL), a novel framework that enhances simple linear models with spatial and temporal information processing for universal multivariate time series forecasting. This self-initiated research addresses critical limitations of existing linear models in data-scarce scenarios and short-term prediction tasks.

**Duration:** June 2023 – August 2023  
**Role:** Co-Lead Researcher  
**Team Size:** 4 members  
**Type:** Self-Initiated Research  
**Status:** Published at ACM 2024  
**Collaborators:** Aiyinsi Zuo, Haixi Zhang, Zirui Li, Ce Zheng

## Technical Implementation

### System Architecture
- **Framework:** PyTorch with comprehensive evaluation pipeline
- **Core Design:** Three-route framework (Core, Temporal, Spatial)
- **Training Strategy:** Multi-channel processing vs. univariate approaches
- **Hardware:** RTX 3090 GPU for all experiments

### Three-Route Framework
- **Core Route:** Enhanced residual linear layers with dual pathways
- **Temporal Route:** Time-embedded processing with positional and datetime embeddings
- **Spatial Route:** Dependency-guided spatial attention mechanism
- **Integration:** Skip connection aggregation across all routes

### Mathematical Foundation
- **Baseline Problem:** Linear models capture β(s', t') where s' ⊂ s, t' ⊂ t
- **STL Solution:** Achieves complete spatiotemporal modeling β(s, t)
- **Route Combination:** XT+1:T+τ = X^core + X^temp + X^spat

### Advanced Components
- **Residual Linear (Res-L):** Dual transformation with skip connections
- **Positional Embedding:** Sinusoidal encodings for sequential context
- **DateTime Embedding:** Dense representations of cyclical time patterns
- **Spatial Attention:** Inter-variable relationship modeling with interaction scoring

## Key Achievements

### Universal Performance
- **14.3% boost** in MSE over top-performing DLinear baseline
- **Consistent top-2 ranking** across all datasets and prediction horizons
- **Superior accuracy** in both information-rich and data-scarce scenarios
- **Robust performance** across diverse forecasting applications

### Data-Scarce Scenario Excellence
- **34% enhancement** over DLinear in data-constrained conditions
- **55% improvement** on JAAD traffic dataset (real-world autonomous driving)
- **First work** to systematically address LTSF-Linear's data scarcity limitations
- **Universal applicability** across varying observation lengths

### Cross-Dataset Validation
- **ETTh1/ETTm1:** Electricity transformer temperature forecasting
- **Electricity:** Consumer load patterns across 321 clients
- **Weather:** Meteorological measurements with 21 variables
- **JAAD:** Traffic trajectory prediction for autonomous driving applications

### Theoretical Contributions
- **Mathematical proof** of linear model limitations in spatiotemporal capture
- **Novel architecture** combining linear efficiency with transformer-level accuracy
- **Ablation study validation** showing progressive improvement with route integration
- **Complete framework** for both spatial and temporal information processing

### Research Recognition
- **ACM 2024 Publication:** Machine Learning for Time Series track
- **Novel paradigm:** Linear-based models enhanced with spatiotemporal processing
- **Comprehensive evaluation:** Multiple scenarios and prediction horizons
- **Practical applications:** Real-world deployment in various domains

## Technologies Used

**Machine Learning Frameworks:**
- PyTorch for model development and training
- Comprehensive evaluation pipeline with multiple metrics

**Time Series Processing:**
- Multi-channel sequence processing
- Sinusoidal positional encoding implementation
- DateTime feature extraction and embedding

**Mathematical Optimization:**
- Residual learning with skip connections
- Spatial attention mechanism with softmax normalization
- Dynamic encoder/decoder with learnable gating

**Evaluation & Validation:**
- Cross-dataset training and testing protocols
- MSE and MAE metrics across multiple benchmarks
- Real-time performance assessment

## Results & Impact

- **Academic Innovation:** First universal linear-based spatiotemporal forecasting framework
- **Practical Significance:** Addresses critical real-world forecasting constraints
- **Performance Breakthrough:** Superior accuracy with computational efficiency
- **Broad Applicability:** Validated across financial, industrial, and transportation domains

---