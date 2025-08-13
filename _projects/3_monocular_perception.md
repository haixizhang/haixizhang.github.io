---
layout: page
title: LRHPerception - Monocular Real-time Perception for Autonomous Driving
description: Unified perception pipeline achieving 29 FPS with object tracking, trajectory prediction, road segmentation, and depth estimation
img: assets/img/mono.gif
importance: 3
category: research
related_publications: true
github_url: https://github.com/EnisZuo/LRHPerception
pdf_url: /assets/pdf/RAL__No_Map_Needed__Monocular_Real_time_Perception_Package_for_Autonomous_Driving.pdf

---

## Project Overview

Development of LRHPerception (Low-cost, Real-time, High Information richness), a comprehensive monocular perception system for autonomous driving that processes single-camera video feeds to provide real-time interpretation of driving environments. This research addresses the computational limitations of existing multi-camera fusion systems while maintaining interpretability advantages over end-to-end approaches.

**Duration:** April 2023 – August 2023  
**Role:** Co-Lead Developer (Equal Contribution)  
**Team Size:** 5 members  
**Institution:** University of Rochester  
**Collaborators:** Aiyinsi Zuo*, Zirui Li*, Haixi Zhang*, Chunshu Wu, Prof. Tong Geng, Prof. Zhiyao Duan

## Technical Implementation

### Hardware Platform
- **GPU:** Single RTX 3090 for training and inference
- **Performance Target:** Real-time processing (29+ FPS)
- **Memory Usage:** 3.2GB VRAM during inference
- **Power Consumption:** 15W on embedded platforms

### Software Architecture
- **Framework:** PyTorch with CUDA acceleration
- **Backbone:** Swin Transformer for optimal feature extraction
- **Integration:** Shared feature extraction across all four perception tasks
- **Training:** Cross-dataset approach (KITTI, Cityscapes, JAAD, PIE)

### Core Modules
- **C-BYTE Object Tracking:** Camera-Calibrated BYTE with motion compensation
- **Trajectory Prediction:** Conditional Variational Autoencoder with step-wise goal estimation
- **Road Segmentation:** Focused single-class segmentation with optimized decoder
- **Depth Estimation:** Coarse-refine architecture with secondary refinement flow

## Key Achievements

### Performance Breakthrough
- Achieved 29 FPS real-time performance on single GPU
- **555% acceleration** over fastest local mapping method
- **Order-of-magnitude speed improvement** while maintaining accuracy
- First unified package combining all four perception tasks

### Object Tracking Excellence
- **MOTA Score:** 76.9% (vs 76.6% ByteTrack baseline)
- **IDF1 Score:** 81.2% (vs 79.3% ByteTrack baseline)
- **Processing Time:** 31.0ms per frame
- Implemented camera motion correction with Lucas-Kanade optical flow

### Trajectory Prediction Innovation
- **JAAD Dataset MSE:** 43/113/283 (0.5s/1.0s/1.5s prediction horizons)
- **PIE Dataset MSE:** 19/44/104 (0.5s/1.0s/1.5s prediction horizons)
- **Processing Speed:** 111/104/92.6 FPS for 8/12/24 object batches
- **40× faster** than highest accuracy alternative method

### Segmentation & Depth Accuracy
- **Road Segmentation mIOU:** 88.9% on Cityscapes dataset
- **Depth RMS Error:** 0.229 on KITTI dataset
- **Depth δ1 Accuracy:** 96.6% (pixels within 1.25× ground truth)
- **577% faster** than best alternative depth estimation method

### Research Impact
- **Published:** Peer-reviewed conference paper
- **Novel Integration:** First work to unify these four perception tasks
- **Real-world Validation:** Extensive testing on KITTI dataset
- **Practical Deployment:** Suitable for actual autonomous driving systems

## Technologies Used

**Deep Learning Frameworks:**
- PyTorch for model development and training
- CUDA for GPU acceleration and optimization
- Mixed precision training for efficiency

**Computer Vision Libraries:**
- OpenCV for image processing and preprocessing
- Multi-scale feature extraction and fusion

**Autonomous Driving Datasets:**
- KITTI for object detection and depth estimation
- Cityscapes for road segmentation validation
- JAAD/PIE for trajectory prediction benchmarking

**Optimization Techniques:**
- Shared Transformer backbone architecture
- Cross-task feature sharing and skip connections
- Real-time inference optimization with TensorRT

## Results & Impact

- **Academic Contribution:** Novel unified perception framework for autonomous driving
- **Performance:** State-of-the-art accuracy with dramatic speed improvements
- **Practical Value:** Bridge between research and real-world deployment
- **Industry Relevance:** Cost-effective single-camera autonomous driving solution

---