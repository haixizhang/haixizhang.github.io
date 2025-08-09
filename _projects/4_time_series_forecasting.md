---
layout: page
title: Spatiotemporal-Linear: Universal Multivariate Time Series Forecasting
description: Novel forecasting model using Residual Neural Networks with Spatial Attention
img: assets/img/forecasting.png
importance: 4
category: research
---

## Project Overview

**SpatioTemporal-Linear (STL)** addresses critical limitations in multivariate time series forecasting by enhancing simple linear models with spatial and temporal information processing. While recent linear models (LTSF-Linear) outperform complex transformers in long-term forecasting, they fail in data-scarce scenarios and short-term prediction tasks.

**Duration:** June 2023 – August 2023  
**Type:** Self-Initiated Research  
**Status:** Published at ACM Conference 2024  
**Collaborators:** Aiyinsi Zuo, Haixi Zhang, Zirui Li, Ce Zheng

## Research Problem & Innovation

### **Core Challenge**
- **Linear models** excel in long-term forecasting but fail in data-scarce scenarios (T ≪ τ)
- **Transformer models** suffer from error accumulation in iterative prediction
- **Existing approaches** overlook spatial dependencies and temporal intricacies

### **STL Solution**
A three-route architecture that integrates:
1. **Core Route**: Enhanced residual linear layers for baseline prediction
2. **Temporal Route**: Time-embedded processing with positional and datetime embeddings
3. **Spatial Route**: Dependency-guided spatial attention mechanism

## Technical Architecture

### **Three-Route Framework**
```
XT+1:T+τ = X^core + X^temp + X^spat
```

### **1. Core Route - Residual Linear (Res-L)**
- **Dual pathway design**: Linear transformation + skip connection
- **Mathematical formulation**: `X^core = L1(X1:T) + L3 ∘ g(L2(X1:T))`
- **Purpose**: Provides baseline prediction with regularization effects

### **2. Temporal Route - Time-Embedded Processing**
- **Positional Embedding**: Sinusoidal encodings for sequential context
- **DateTime Embedding**: Dense representations of cyclical time patterns
- **Dynamic Encoder/Decoder**: Learnable gating mechanism for temporal integration
- **Activation threshold**: Only engages when T ≤ θT (data-scarce scenarios)

### **3. Spatial Route - Dependency-Guided Attention**
- **Spatial Attention**: Captures inter-variable relationships
- **Interaction Scoring**: Matrix multiplication for directional similarity
- **Skip Connections**: Preserves input fidelity while adding spatial refinement

## Key Technical Contributions

### **1. Universal Applicability**
- **Information-rich scenarios**: T ≫ τ (e.g., high-frequency trading)
- **Data-scarce scenarios**: T ≪ τ (e.g., autonomous driving trajectory prediction)
- **Flexible prediction horizons**: Adaptable to various forecasting lengths

### **2. Performance Improvements**
- **34% enhancement** over DLinear in data-scarce conditions
- **55% improvement** on JAAD traffic dataset
- **14.3% boost** in MSE over top-performing baselines

### **3. Theoretical Foundation**
- **Fragmentary regression proof**: Linear models capture β(s', t') where s' ⊂ s, t' ⊂ t
- **Complete spatiotemporal modeling**: STL achieves β(s, t) through route integration
- **Error mitigation**: Direct prediction eliminates accumulation effects

## Experimental Results

### **Information-Rich Scenarios**
Tested on prediction horizons τ ∈ {24, 48, 96, 192, 336} with optimal observation lengths:

| Dataset | Best MSE | Improvement over DLinear |
|---------|----------|-------------------------|
| Electricity | 0.094 | 12.8% |
| ETTh1 | 0.308 | 1.6% |
| ETTm1 | 0.194 | 8.1% |
| Weather | 0.092 | 8.9% |

### **Data-Scarce Scenarios**
Fixed observation T = 48 with varying prediction horizons:

| Dataset | Avg MSE | Improvement over DLinear |
|---------|---------|-------------------------|
| Electricity | 0.181 | 24.9% |
| ETTh1 | 0.398 | 19.7% |
| ETTm1 | 0.440 | 18.4% |
| Weather | 0.197 | 23.0% |
| JAAD | 0.316×10⁻³ | 55.0% |

### **Ablation Study Results**
Progressive improvement with route integration:
- **Basic Linear**: Baseline performance
- **Core-only**: Initial enhancement with residual connections
- **Core + Spatial**: Significant boost from inter-variable modeling
- **Full STL**: Optimal performance with all three routes

## Implementation & Applications

### **Training Strategy**
- **Multi-channel training**: Entire sequence processed simultaneously (vs. univariate approach)
- **Cross-dataset validation**: ETTh1, ETTm1, Electricity, Weather, JAAD datasets
- **Loss function**: MSE between predicted and ground truth sequences
- **Hardware**: RTX 3090 GPU for all experiments

### **Real-World Applications**
- **Financial Markets**: High-frequency trading with limited historical data
- **Autonomous Driving**: Trajectory prediction upon object detection
- **Energy Systems**: Electricity demand forecasting with varying data availability
- **Healthcare**: Disease progression modeling with sparse observations

### **Dataset Coverage**
- **ETT (Electricity Transformer Temperature)**: Industrial sensor data
- **Electricity**: Consumer load patterns across 321 clients
- **Weather**: Meteorological measurements with 21 variables
- **JAAD**: Traffic trajectory prediction for autonomous driving

## Key Innovations

### **1. Data Scarcity Solution**
First work to systematically address LTSF-Linear's deficiency in data-scarce scenarios and provide a comprehensive solution.

### **2. Spatiotemporal Integration**
Novel framework combining spatial attention with temporal embeddings in linear-based architecture.

### **3. Universal Framework**
Demonstrates superior performance across diverse prediction lengths and data richness levels.

## Results Visualization

STL consistently outperforms baselines across:
- **Varying prediction lengths**: Superior accuracy regardless of forecasting horizon
- **Different data richness**: Maintains performance even with limited observations
- **Multiple domains**: Robust across financial, industrial, and transportation datasets

### **Ablation Study Insights**
Visualizations demonstrate how each route contributes:
- **Temporal route**: Corrects predictions when core relationships are skewed
- **Spatial route**: Provides refinement through cross-variable dependencies
- **Combined effect**: Progressively closer approximation to ground truth

## Impact & Future Work

### **Academic Contribution**
- **Novel paradigm**: Linear-based models enhanced with spatiotemporal processing
- **Empirical validation**: Comprehensive evaluation across multiple scenarios
- **Theoretical foundation**: Formal proof of linear model limitations and STL solutions

### **Practical Implications**
- **Reduced computational cost**: Linear efficiency with transformer-level accuracy
- **Broader applicability**: Universal solution for diverse forecasting scenarios
- **Real-time deployment**: Suitable for time-critical applications

### **Future Directions**
- **Foundation models**: Pre-trained spatiotemporal forecasting frameworks
- **Multi-modal integration**: Combining time series with other data modalities
- **Causal discovery**: Learning causal relationships in multivariate sequences

## Code & Resources

- **arXiv Paper**: "SpatioTemporal-Linear: Towards Universal Multivariate Time Series Forecasting"
- **Conference**: ACM 2024 (Machine Learning for Time Series track)
- **Implementation**: PyTorch-based framework with comprehensive evaluation scripts
- **Datasets**: Preprocessed versions of all benchmark datasets

This work establishes STL as a robust, universal solution for multivariate time series forecasting, bridging the gap between simple linear models and complex transformer architectures while addressing critical real-world constraints.