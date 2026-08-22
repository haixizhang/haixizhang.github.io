---
layout: about
title: about
permalink: /
subtitle: Robotics & Perception | Real-time CV & Applied ML | Sensor Data & Systems Engineering
profile:
  align: right
  image: prof_pic.jpg
  image_circular: false
selected_papers: false
social: true
---
Hi! I’m **Haixi Zhang**, a **Robotics / Perception / Applied ML / Computer Vision Engineer** who builds and ships real-world sensor systems. I work across the complete production path—from fleet-scale data and geometric modeling to neural networks, accelerated inference, and onboard C++ integration.

Most recently, I independently developed and deployed two neural sensor-calibration systems spanning **camera–LiDAR** and **LiDAR–LiDAR** alignment. The systems recover rotational perturbations of up to **10° to sub-degree residuals** and run through production **TensorRT/C++** pipelines. I hold a **B.S. in Electrical & Computer Engineering** from the University of Rochester and an **M.Eng. in Electrical & Computer Engineering** from Cornell University, and I’m based in **San Jose, CA**.

<a class="home-feature home-feature--suite" href="{{ '/projects/' | relative_url }}">
  <span class="home-feature__label">FEATURED PRODUCTION WORK</span>
  <strong>Two Neural Calibration Systems—Built and Shipped End to End</strong>
  <span>Production camera–LiDAR and LiDAR–LiDAR calibration, from fleet-scale sensor data to sub-degree recovery and accelerated onboard inference.</span>
  <span class="home-feature__results">
    <em><b>2</b> deployed systems</em>
    <em><b>500+ GB</b> sensor data</em>
    <em><b>10° → &lt;1°</b> recovery</em>
    <em><b>TRT + C++</b> onboard stack</em>
  </span>
  <span class="home-feature__systems"><em>LCCNet · Camera ↔ LiDAR</em><em>LiLiNet · LiDAR ↔ LiDAR</em></span>
  <b>Explore the systems →</b>
</a>

### What I do
- **Sensor data & pipelines**
  - Build ETL, synchronization, and validation workflows for multi-sensor logs (camera / LiDAR / IMU / CAN)
  - Curate datasets and define evaluation protocols for training, regression testing, and debugging
  - Automate large-scale processing with workflow tools (e.g., Airflow) and containerized jobs (Docker/K8s)

- **Real-time computer vision & applied ML**
  - Develop perception modules such as detection, tracking, depth-related tasks, and feature extraction using **Python + OpenCV + PyTorch**
  - Train and evaluate models with clean metrics, ablations, and failure-case analysis (day/night, noise, motion, domain shifts)
  - Package models for deployment and iterate using an end-to-end data → model → evaluation loop

- **Signal processing & time-series analysis**
  - Design filtering and time-series pipelines for sensor signals (denoising, feature extraction, temporal modeling)
  - Combine classical methods with learning-based approaches when it improves robustness and interpretability

- **Performance-oriented software engineering**
  - Write production C++/Python on Linux; profile and optimize for latency/throughput and resource usage
  - Use multiprocessing/multithreading where appropriate; accelerate with GPU when needed
  - Deploy with **ONNX / TensorRT** on edge/production platforms and integrate into larger C++ systems

- **Robotics systems**
  - Integrate perception into ROS/ROS2 systems (TF2, catkin/colcon) with reliable interfaces and testing
  - Work with autonomy foundations: estimation (EKF-style), mapping (occupancy grids), and planning (A*)


I’m comfortable contributing across the stack—from data and modeling to integration and benchmarking—and I enjoy collaborating with cross-functional teams to improve end-to-end system quality.

When I’m not immersed in code or research, I’m fascinated by world history, particularly the Renaissance period through the Second Industrial Revolution. There’s something captivating about how technological and social innovations from those eras laid the groundwork for today’s advancements. I’m also a big fan of **Yes, Prime Minister** – the wit and political satire never get old! 

---

*Interested in autonomous systems, computer vision, or just want to discuss the future of robotics? I’d love to connect!*
