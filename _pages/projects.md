---
layout: page
title: Projects & Publications
permalink: /projects/
description: A collection of my research projects, publications, and technical work.
nav: true
nav_order: 2
display_categories: [research, technical]
horizontal: false
---
<!-- pages/projects.md -->
<div class="projects">
<!-- Projects Section -->
<h2 class="category">Projects</h2>
<div class="row row-cols-1 row-cols-md-2 g-4">
  <!-- Fast Robot Project -->
  <div class="col">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">
          <a href="https://haixizhang.github.io/FastRobot/" target="_blank" class="text-decoration-none">
            Fast Robot Navigation & Control
          </a>
        </h5>
        <h6 class="card-subtitle mb-2 text-muted">Technical Work - Embedded Systems & Robotics</h6>
        <p class="card-text">
          Advanced robotic control system implementing real-time navigation and obstacle avoidance using embedded systems programming.
        </p>
        <div class="mt-auto">
          <a href="https://haixizhang.github.io/FastRobot/" target="_blank" class="btn btn-primary btn-sm">
            View Project Website
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- Robotic Tool Handler -->
  <div class="col">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">Robotic Tool Handler (Senior Design)</h5>
        <h6 class="card-subtitle mb-2 text-muted">Technical Work - University of Rochester | Lead Developer</h6>
        <p class="card-text">
          Embedded firmware development for ARM Cortex-based NVIDIA Jetson Nano platform with real-time motion control.
        </p>
        <ul class="list-unstyled small">
          <li>• Designed embedded firmware in C & Python on NVIDIA Jetson Nano with Ubuntu Linux and ROS</li>
          <li>• Developed test-driven modules with SIL/HIL testing for strict latency requirements</li>
          <li>• Implemented YOLO-based object detection with 20% increased throughput</li>
          <li>• Debugged communication signals using oscilloscopes and logic analyzers</li>
        </ul>
        <div class="mt-auto">
          <span class="badge bg-secondary me-1">C/C++</span>
          <span class="badge bg-secondary me-1">Python</span>
          <span class="badge bg-secondary me-1">ROS</span>
          <span class="badge bg-secondary me-1">RTOS</span>
          <br>
          <a href="#" class="btn btn-outline-primary btn-sm mt-2">
            GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- Robot Mapping Project -->
  <div class="col">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">Robot Mapping, Estimation, and Interaction</h5>
        <h6 class="card-subtitle mb-2 text-muted">Technical Work - University of Rochester | Solo Developer</h6>
        <p class="card-text">
          Autonomous navigation software stack for TurtleBot2 platform with advanced SLAM capabilities.
        </p>
        <ul class="list-unstyled small">
          <li>• Developed C++ software stack for autonomous navigation on Ubuntu-based TurtleBot2</li>
          <li>• Reduced localization error by 10% and planning time by 15% via EKF SLAM</li>
          <li>• Implemented Occupancy Grid Mapping and A* search algorithms</li>
          <li>• Designed unit-testing framework for sensor integration and fault detection</li>
        </ul>
        <div class="mt-auto">
          <span class="badge bg-secondary me-1">ROS</span>
          <span class="badge bg-secondary me-1">C++</span>
          <span class="badge bg-secondary me-1">SLAM</span>
          <span class="badge bg-secondary me-1">Linux</span>
          <br>
          <a href="#" class="btn btn-outline-primary btn-sm mt-2">
            GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- Monocular Perception Project -->
  <div class="col">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">Monocular Real-time Perception for Autonomous Driving</h5>
        <h6 class="card-subtitle mb-2 text-muted">Research - University of Rochester</h6>
        <p class="card-text">
          Unified monocular perception pipeline for autonomous driving with real-time performance.
        </p>
        <ul class="list-unstyled small">
          <li>• Designed unified perception pipeline integrating object tracking and trajectory prediction</li>
          <li>• Achieved 30+ FPS performance on single GPU with road segmentation and depth estimation</li>
          <li>• Optimized multi-task modules through shared Transformer backbones</li>
          <li>• Under review at IEEE RA-L</li>
        </ul>
        <div class="mt-auto">
          <span class="badge bg-secondary me-1">Python</span>
          <span class="badge bg-secondary me-1">PyTorch</span>
          <span class="badge bg-secondary me-1">Computer Vision</span>
          <span class="badge bg-secondary me-1">Transformers</span>
          <br>
          <a href="https://github.com/EnisZuo/LRHPerception" class="btn btn-outline-primary btn-sm mt-2">
            GitHub
          </a>
          <a href="/assets/pdf/RAL__No_Map_Needed__Monocular_Real_time_Perception_Package_for_Autonomous_Driving.pdf" class="btn btn-outline-secondary btn-sm mt-2 ms-1">
            PDF
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- Time Series Forecasting Project -->
  <div class="col">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">Spatiotemporal-Linear: Universal Multivariate Time Series Forecasting</h5>
        <h6 class="card-subtitle mb-2 text-muted">Research - Self-Initiated Research</h6>
        <p class="card-text">
          Novel forecasting model using Residual Neural Networks with Spatial Attention for improved time series prediction.
        </p>
        <ul class="list-unstyled small">
          <li>• Proposed a forecasting model using Residual Neural Nets with Spatial Attention</li>
          <li>• Achieved 10% higher accuracy compared to existing methods</li>
          <li>• Validated the model on public datasets (Traffic, Electricity, etc.)</li>
          <li>• Findings accepted for presentation at ACM 2024</li>
        </ul>
        <div class="mt-auto">
          <span class="badge bg-secondary me-1">Python</span>
          <span class="badge bg-secondary me-1">PyTorch</span>
          <span class="badge bg-secondary me-1">Time Series</span>
          <span class="badge bg-secondary me-1">Neural Networks</span>
          <br>
          <a href="#" class="btn btn-outline-primary btn-sm mt-2">
            arXiv
          </a>
          <a href="/assets/pdf/spatiotemporal_linear_paper.pdf" class="btn btn-outline-secondary btn-sm mt-2 ms-1">
            PDF
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- Publications Section
<div class="mt-5">
  <h2 class="category">Publications</h2>
  <div class="publications">
    {% bibliography %}
  </div>
</div> -->
</div>