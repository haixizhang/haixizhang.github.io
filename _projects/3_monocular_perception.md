---
layout: page
title: LRHPerception - Monocular Real-time Perception for Autonomous Driving
description: Unified perception pipeline achieving 29 FPS with object tracking, trajectory prediction, road segmentation, and depth estimation
img: assets/img/mono.gif
importance: 3
category: research
related_publications: true
---

## Project Overview

**LRHPerception** (Low-cost, Real-time, High Information richness) is a comprehensive monocular perception system for autonomous driving that processes single-camera video feeds to provide real-time interpretation of driving environments. This research addresses the computational limitations of existing multi-camera fusion systems while maintaining the interpretability advantages over end-to-end approaches.

**Duration:** April 2023 – August 2023  
**Institution:** University of Rochester  
**Status:** Published in peer-reviewed conference  
**Collaborators:** Aiyinsi Zuo*, Zirui Li*, Haixi Zhang* (*Equal Contribution), Chunshu Wu, Prof. Tong Geng, Prof. Zhiyao Duan

## Research Innovation

### **Core Problem Addressed**
Traditional autonomous driving systems face a fundamental trade-off:
- **End-to-end methods**: Computationally efficient but lack interpretability and safety assurance
- **Multi-camera fusion**: Provide comprehensive scene understanding but require excessive computational resources (< 10 FPS)

### **Our Solution: LRHPerception**
A unified monocular perception package that achieves **555% acceleration** over fastest mapping techniques while maintaining comparable accuracy across all perception tasks.

## Technical Architecture

### **Shared Backbone Design**
- **Foundation**: Swin Transformer backbone for optimal feature extraction
- **Multi-scale Features**: Generates feature maps {Φ4, Φ8, Φ16, Φ32} with different stride sizes
- **Computational Efficiency**: Single backbone serves all four perception tasks, reducing redundant processing

### **Integrated Multi-task Pipeline**
Instead of processing tasks independently, our architecture leverages:
- **Shared feature extraction** across all modules
- **Skip connections** between related tasks
- **Cross-task information sharing** for improved accuracy

## Key Technical Contributions

### **1. C-BYTE Object Tracking**
**Innovation**: Camera-Calibrated BYTE tracking with motion compensation

**Technical Implementation:**
```python
# Camera motion correction pipeline
Pt = LucasKanadeOpticalFlow(It-1, It, Pt-1)
A = RANSAC(Pt-1, Pt)  # Affine transformation matrix
Opred = Transform(KalmanFilter(T), A)
```

**Key Features:**
- Lucas-Kanade optical flow for camera motion estimation
- RANSAC-based affine transformation calculation
- Separate rotation and displacement compensation
- Two-stage association (high/low confidence detections)

**Performance:**
- **MOTA**: 76.9% (vs 76.6% ByteTrack baseline)
- **IDF1**: 81.2% (vs 79.3% ByteTrack baseline)
- **Processing Time**: 31.0ms per frame

### **2. Advanced Trajectory Prediction**
**Innovation**: Conditional Variational Autoencoder with step-wise goal estimation

**Architecture Components:**
- **Past Trajectory Encoder**: GRU + pre-trained CVAE from BiTrap
- **Latent Space Modeling**: P(Z|Xt) for multi-modal future predictions
- **Future Trajectory Decoder**: Sequential GRU cells with fully-connected layers

**Performance Results:**
- **JAAD Dataset MSE**: 43/113/283 (0.5s/1.0s/1.5s prediction horizons)
- **PIE Dataset MSE**: 19/44/104 (0.5s/1.0s/1.5s prediction horizons)
- **Processing Speed**: 111/104/92.6 FPS for 8/12/24 object batches
- **Improvement**: 40× faster than highest accuracy alternative

### **3. Efficient Road Segmentation**
**Innovation**: Focused single-class segmentation with optimized decoder

**Technical Design:**
- **U-Net Framework**: O = D(Φ8) using stride-8 feature maps
- **CBS Blocks**: Conv2D-BatchNorm-SiLu with C2f integration
- **DualConv Optimization**: Replaces traditional bottleneck blocks

**Performance:**
- **mIOU**: 88.9% on Cityscapes dataset
- **Processing Speed**: 55.0 FPS (dual task with detection)
- **Efficiency**: Outperforms universal segmentation methods

### **4. Coarse-Refine Depth Estimation**
**Innovation**: Two-stage depth estimation with secondary refinement flow

**Architecture Details:**
- **Coarse Depth Former**: Operates on Φ16, Φ32 feature maps using C2f UpDecoder
- **Refine Depth Former**: U-Net with secondary flow integration
- **Multi-scale Fusion**: D(i*, j*) = R(D(i,j) ⊕ ΦUD)

**Performance Results:**
- **RMS Error**: 0.229 on KITTI dataset
- **δ1 Accuracy**: 96.6% (pixels within 1.25× ground truth)
- **Processing Speed**: 42.0 FPS
- **Improvement**: 577% faster than best alternative (VA-Depth)

## Comprehensive Performance Results

### **Real-time System Performance**
- **Overall FPS**: 29 FPS on single RTX 3090 GPU
- **Acceleration**: 555% faster than fastest local mapping method
- **Integration Benefit**: 2× speedup from architectural integration alone
- **Module Improvements**: 806% acceleration from individual optimizations

### **Accuracy Maintenance**
All modules achieve **comparable or superior accuracy** to state-of-the-art specialized methods:
- Object tracking: Outperforms BYTE and BoT-SORT
- Trajectory prediction: Significant improvements across all metrics
- Road segmentation: Surpasses universal segmentation models
- Depth estimation: Competitive accuracy with dramatic speed gains

## Technical Innovations Deep Dive

### **Multi-task Integration Strategy**
```
Traditional: 3 separate backbones + 4 task-specific networks
Our Approach: 1 shared backbone + 2 integrated decoders + cross-task features
Result: 4× computational reduction while improving accuracy
```

### **Cross-dataset Training Approach**
- **KITTI**: Object detection + depth estimation
- **Cityscapes**: Road segmentation  
- **JAAD/PIE**: Trajectory prediction
- **Unified Loss**: L = λdetLdet + λsegLseg + λdepthLdepth + λtrajLtraj

### **Real-world Validation**
Extensive testing on KITTI dataset demonstrates:
- Robust performance across diverse driving scenarios
- Minimal failure cases (documented and analyzed)
- Practical applicability for autonomous driving systems

## Implementation Details

### **Hardware Requirements**
- **Training**: 4×RTX 3090 GPUs, 128GB RAM
- **Inference**: Single RTX 3090 (or equivalent)
- **Real-time Deployment**: Achieves 29 FPS on standard hardware

### **Software Framework**
- **Deep Learning**: PyTorch with CUDA acceleration
- **Computer Vision**: OpenCV for preprocessing
- **Optimization**: Mixed precision training, gradient checkpointing

## Research Impact & Applications

### **Academic Contribution**
- **First Integration**: Unified package combining all four perception tasks
- **Performance Breakthrough**: Order-of-magnitude speed improvement
- **Practical Framework**: Bridge between research and real-world deployment

### **Industry Applications**
- **Cost-effective Autonomous Driving**: Single-camera system reduces hardware costs
- **Real-time Processing**: Enables practical deployment on standard hardware
- **Interpretable Perception**: Provides human-understandable scene interpretation

### **Future Research Directions**
- **3D Scene Understanding**: Extension to 3D object detection and tracking
- **Temporal Consistency**: Long-term sequence modeling improvements
- **Domain Adaptation**: Robust performance across different environments
- **Edge Deployment**: Optimization for embedded autonomous driving platforms

## Code & Resources

- **GitHub Repository**: [LRHPerception](https://github.com/EnisZuo/LRHPerception)
- **Paper**: [Single-Eye View: Monocular Real-time Perception Package for Autonomous Driving](assets\pdf\RAL__No_Map_Needed__Monocular_Real_time_Perception_Package_for_Autonomous_Driving.pdf)
- **Datasets**: KITTI, Cityscapes, JAAD, PIE preprocessing scripts

## Results Visualization

The system produces a comprehensive 5-channel output:
1. **Original RGB**: Input camera feed
2. **Road Segmentation**: Pixel-level drivable area identification  
3. **Depth Estimation**: Monocular depth map (0-80 meters)
4. **Object Detection**: Bounding boxes with classifications
5. **Trajectory Prediction**: Past (blue) and future (red) object trajectories

### **Success Cases**
- Right-turning van with accurate trajectory prediction
- Forward-moving bicycle with precise depth estimation
- Left-turning bus with robust tracking through occlusion

### **Failure Analysis**
- Temporary trajectory misprediction (self-correcting within 0.5s)
- Occasional segmentation gaps in complex intersections
- Areas identified for future system improvements

This work represents a significant advancement in practical autonomous driving perception, achieving the optimal balance between computational efficiency, accuracy, and interpretability that is essential for safe autonomous vehicle deployment.