---
layout: page
title: Robot Mapping, Estimation, and Interaction
description: Autonomous navigation system with SLAM capabilities for TurtleBot2
img: /assets/img/mapping.gif
importance: 2
category: technical
related_publications: false
github_url: https://github.com/haixizhang/Robot-Mapping-Estimation-Interaction

---
## Project Overview
Solo development of a comprehensive autonomous navigation software stack for TurtleBot2 platform, focusing on real-time sensor fusion and mapping capabilities. This project demonstrates advanced robotics algorithms including SLAM, path planning, and sensor integration.

**Duration:** January 2024 – May 2024  
**Role:** Solo Developer  
**Platform:** TurtleBot2 with Ubuntu Linux  
**Institution:** University of Rochester
**Supervisor:** [Thomas M. Howard](https://www.hajim.rochester.edu/ece/people/faculty/howard_tom/)

## Technical Implementation

### System Architecture
- **Platform:** TurtleBot2 robot with differential drive
- **Operating System:** Ubuntu Linux
- **Framework:** ROS (Robot Operating System)
- **Programming Language:** C++
- **Sensors:** LiDAR, IMU, wheel encoders

### Key Algorithms Implemented

#### SLAM (Simultaneous Localization and Mapping)
- **Algorithm:** Extended Kalman Filter (EKF) SLAM
- **Performance:** 10% reduction in localization error compared to baseline
- **Features:** Real-time pose estimation and map building

#### Mapping
- **Method:** Occupancy Grid Mapping
- **Resolution:** Configurable grid resolution for different environments
- **Updates:** Probabilistic map updates using sensor measurements

#### Path Planning
- **Algorithm:** A* search algorithm
- **Performance:** 15% reduction in planning time
- **Features:** Dynamic replanning, obstacle avoidance

## Key Achievements

### Navigation System
- Developed and deployed a complete C++ software stack for autonomous navigation
- Implemented real-time sensor fusion combining LiDAR, IMU, and odometry data
- Achieved robust navigation in uncertain and dynamic environments

### Performance Improvements
- **Localization:** 10% improvement in pose estimation accuracy
- **Planning:** 15% reduction in path planning computation time
- **Reliability:** 95% success rate in reaching navigation goals

### Software Engineering
- Designed comprehensive unit-testing framework for sensor integration
- Implemented fault detection and recovery mechanisms
- Created modular, reusable software components

### Real-time Performance
- Met strict real-time requirements for mobile robot navigation
- Optimized algorithms for embedded computing constraints
- Maintained 20Hz control loop frequency

## Results & Validation

### Experimental Setup
- **Environment:** Indoor laboratory with static and dynamic obstacles
- **Test Scenarios:** Multiple navigation tasks with varying complexity
- **Metrics:** Localization accuracy, planning time, success rate

### Performance Metrics
- **Localization Error:** < 5cm RMS in structured environments
- **Planning Time:** < 100ms for typical scenarios
- **Navigation Success:** 95% goal reaching success rate
- **Real-time Performance:** Consistent 20Hz operation

## Future Enhancements

- **Multi-robot Coordination:** Extend to collaborative SLAM
- **Dynamic Obstacles:** Improved tracking and prediction
- **Semantic Mapping:** Integration of object recognition
- **Outdoor Navigation:** GPS integration for larger environments

---
