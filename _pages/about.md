---
layout: about
title: about
permalink: /
subtitle: ML / Computer Vision / Robotics Engineer · Multimodal Perception · Production ML Systems
description: Haixi Zhang designs, trains, and deploys machine learning systems for computer vision, sensor calibration, and robotics.
profile:
  align: right
  image: prof_pic_2026_blue.png
  image_circular: false
selected_papers: false
social: true
---
Hi, I’m **Haixi Zhang**, an **ML / Computer Vision / Robotics Engineer** based in **San Jose, CA**. I hold an **M.Eng. in Electrical & Computer Engineering** from Cornell University and a **B.S. in Electrical & Computer Engineering** from the University of Rochester.

I build production perception systems that combine **multimodal sensor data, 3D geometry, and deep learning**. At Tensor Auto, I am the **sole technical owner of three ML/CV systems**, from network design and training to data pipelines and onboard inference. I designed, trained, and deployed two neural sensor-calibration systems. I also built and evaluated front- and rear-seat occupant perception, combining person detection, posture classification, iToF reasoning, and VLM temporal fusion.

<a class="home-feature home-feature--suite" href="{{ '/projects/' | relative_url }}">
  <span class="home-feature__label">FEATURED INDUSTRY WORK</span>
  <strong>Neural Perception Systems—Designed, Trained &amp; Deployed</strong>
  <span>Camera–LiDAR and LiDAR–LiDAR calibration built from network design through TensorRT/C++ deployment, alongside integrated occupant perception.</span>
  <span class="home-feature__results">
    <em><b>3</b> systems owned end to end</em>
    <em><b>2</b> production deployments</em>
    <em><b>95%</b> less rotation error · unseen vehicle</em>
    <em><b>63%</b> less fleet rotation error · LiLiNet</em>
  </span>
  <span class="home-feature__systems">
    <em><b>LCCNet</b> · Deployed</em>
    <em><b>LiLiNet</b> · Deployed</em>
    <em><b>In-Cabin Perception</b> · Vehicle Evaluated</em>
  </span>
  <b>Explore selected work →</b>
</a>

### Technical Focus

<div class="home-focus-list">
  <section class="home-focus-row">
    <span>01</span>
    <div>
      <h4>Neural Model Design &amp; Geometric Learning</h4>
      <p>Designing <strong>dual-branch encoders, cross-modal attention, camera-conditioned FiLM, and spherical correlation</strong>, with SE(3) / SO(3) objectives for sensor calibration and multi-task visual learning for occupant perception.</p>
    </div>
  </section>
  <section class="home-focus-row">
    <span>02</span>
    <div>
      <h4>Production ML Engineering</h4>
      <p>Engineering <strong>world-size-configurable PyTorch DDP / NCCL training runtimes</strong>, then carrying models through <strong>ONNX / TensorRT</strong> optimization, performance profiling, and production <strong>C++</strong> integration.</p>
    </div>
  </section>
  <section class="home-focus-row">
    <span>03</span>
    <div>
      <h4>Data & Evaluation Systems</h4>
      <p>Built a shared <strong>Airflow/Kubernetes sensor-data pipeline</strong> that streamed <strong>17+ TB of raw logs</strong> in a single pass to produce <strong>~600 GB of calibration data</strong>, with measured clock synchronization, traceable labels, and view-aware selection.</p>
    </div>
  </section>
</div>

I enjoy working across the full perception lifecycle—from data and modeling to runtime integration and benchmarking—and collaborating with cross-functional teams to improve end-to-end system quality.

Outside engineering, I’m fascinated by world history from the Renaissance through the Second Industrial Revolution, and I remain an enthusiastic fan of **Yes, Prime Minister**.

---

*Interested in production perception, autonomous systems, or applied computer vision? I’d love to connect.*
