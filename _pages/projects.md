---
layout: page
title: Selected Work
permalink: /projects/
description: Production systems, research, and selected technical projects.
nav: true
nav_order: 2
display_categories: [industry, research, technical]
horizontal: false
---

<div class="projects">

<p class="work-intro">I design, train, and deploy neural perception systems. As technical owner of three ML/CV systems, I build the models, data pipelines, distributed training, and onboard inference that turn geometric learning into measurable results. My shared calibration-data pipeline streamed <strong>17+ TB of raw logs</strong> in a single pass to produce <strong>~600 GB of data for both calibration models</strong>.</p>

<h2 class="category work-category">Industry Systems</h2>

<section class="calibration-suite">
  <header class="calibration-suite__header">
    <div class="calibration-suite__eyebrow">PRODUCTION CALIBRATION PORTFOLIO</div>
    <h2>Neural Sensor Calibration Systems</h2>
    <p>Two neural calibration systems designed, trained, and deployed end to end: cross-modal attention and camera conditioning for camera–LiDAR geometry, and shared spherical features with circular correlation for cross-LiDAR alignment.</p>
  </header>

  <div class="suite-results" aria-label="Calibration portfolio results">
    <div><strong>2</strong><span>production systems deployed</span></div>
    <div><strong>2 regions</strong><span>automated data collection</span></div>
    <div><strong>~13×</strong><span>training acceleration</span></div>
    <div><strong>SE(3) / SO(3)</strong><span>geometry-aware neural learning</span></div>
  </div>

<article class="industry-feature industry-feature--lccnet">
  <div class="industry-feature__content">
    <div class="industry-feature__meta">
      <div class="industry-feature__eyebrow">01 · LCCNET · CAMERA ↔ LIDAR</div>
      <div class="industry-feature__status"><i aria-hidden="true"></i>Production · Deployed</div>
    </div>
    <h2><a href="{{ '/projects/lccnet-calibration/' | relative_url }}">Neural Camera–LiDAR Calibration</a></h2>
    <p class="industry-feature__lead">Designed, trained, and deployed a 6-DoF camera–LiDAR calibration network with dual encoders, camera-conditioned FiLM, and cross-modal attention. On an unseen vehicle, the deployed model reduced rotation error by <strong>95% (2.95° → 0.14°)</strong> and reprojection error by <strong>89% (22.4 → 2.4 px)</strong>.</p>
    <div class="project-metrics">
      <div><strong>95%</strong><span>less rotation error · unseen vehicle</span></div>
      <div><strong>89%</strong><span>less reprojection error · unseen vehicle</span></div>
      <div><strong>~100K</strong><span>training frames</span></div>
      <div><strong>~13×</strong><span>training acceleration</span></div>
    </div>
    <div class="industry-feature__footer">
      <div class="industry-feature__stack">
        <b>TECHNICAL CAPABILITIES</b>
        <div class="industry-feature__tags">
          <span>Dual-Branch Encoders</span><span>Camera-Conditioned FiLM</span><span>Cross-Modal Attention</span><span>Geometric Supervision</span><span>Distributed Training Systems</span><span>PyTorch DDP / NCCL</span><span>3D Projection Geometry</span><span>Sensor-Clock Synchronization</span><span>Airflow / Kubernetes</span><span>Onboard Inference</span>
        </div>
      </div>
      <a class="industry-feature__cta" href="{{ '/projects/lccnet-calibration/' | relative_url }}">Explore the case study <span aria-hidden="true">↗</span></a>
    </div>
  </div>
  <div class="industry-feature__visual">
    <div class="industry-feature__media">
      <img src="{{ '/assets/img/projects/lccnet_architecture.svg' | relative_url }}?v=20261021-network" alt="LCCNet neural network with dual encoders, camera-conditioned FiLM, cross-modal attention, and rotation/translation heads" loading="lazy" decoding="async" data-zoomable>
      <div class="industry-feature__visual-meta"><span>NEURAL NETWORK DESIGN</span><small>FiLM + cross-attention · click to enlarge</small></div>
    </div>
  </div>
</article>

<article class="industry-feature industry-feature--lilinet">
  <div class="industry-feature__content">
    <div class="industry-feature__meta">
      <div class="industry-feature__eyebrow">02 · LILINET · LIDAR ↔ LIDAR</div>
      <div class="industry-feature__status"><i aria-hidden="true"></i>Production · Deployed</div>
    </div>
    <h2><a href="{{ '/projects/lilinet-calibration/' | relative_url }}">Neural LiDAR–LiDAR Calibration</a></h2>
    <p class="industry-feature__lead">Built a LiDAR–LiDAR calibration network from scratch with shared spherical encoders, circular azimuth correlation, and sensor-conditioned rotation/translation heads. Deployed the model onboard, reducing fleet rotation error by <strong>63% (0.93° → 0.35°)</strong>.</p>
    <div class="project-metrics">
      <div><strong>63%</strong><span>less fleet rotation error</span></div>
      <div><strong>83%</strong><span>less rotation error · testing</span></div>
      <div><strong>96%</strong><span>evaluated frames improved</span></div>
      <div><strong>~20K</strong><span>training frames</span></div>
    </div>
    <div class="industry-feature__footer">
      <div class="industry-feature__stack">
        <b>TECHNICAL CAPABILITIES</b>
        <div class="industry-feature__tags">
          <span>Shared GroupNorm Encoders</span><span>Sensor Conditioning</span><span>Multi-Scale Pose Heads</span><span>Spherical Range Imaging</span><span>Circular Correlation</span><span>SO(3) / SE(3) Optimization</span><span>Distributed Training Systems</span><span>PyTorch DDP / NCCL</span><span>Motion-Aware Collection</span><span>Geometric Label Auditing</span>
        </div>
      </div>
      <a class="industry-feature__cta" href="{{ '/projects/lilinet-calibration/' | relative_url }}">Explore the case study <span aria-hidden="true">↗</span></a>
    </div>
  </div>
  <div class="industry-feature__visual">
    <div class="industry-feature__media">
      <img src="{{ '/assets/img/projects/lilinet_architecture.svg' | relative_url }}?v=20261021-network" alt="LiLiNet neural network with shared spherical encoders, circular azimuth correlation, sensor conditioning, and task-specific pose heads" loading="lazy" decoding="async" data-zoomable>
      <div class="industry-feature__visual-meta"><span>GEOMETRIC NEURAL LEARNING</span><small>Spherical features + correlation · click to enlarge</small></div>
    </div>
  </div>
</article>
</section>

<article class="industry-feature industry-feature--oms">
  <div class="industry-feature__content">
    <div class="industry-feature__meta">
      <div class="industry-feature__eyebrow">03 · IN-CABIN · OCCUPANT PERCEPTION</div>
      <div class="industry-feature__status"><i aria-hidden="true"></i>Integrated · Vehicle Evaluated</div>
    </div>
    <h2><a href="{{ '/projects/occupant-state-monitoring/' | relative_url }}">In-Cabin Occupant Perception</a></h2>
    <p class="industry-feature__lead">Front- and rear-seat occupant monitoring built from RTMO detector/keypoint fine-tuning and a ResNet-18 multi-task occupancy/posture network, then integrated with iToF seating position, VLM temporal fusion, and confidence-aware vehicle messaging.</p>
    <div class="project-metrics">
      <div><strong>99.3%</strong><span>occupancy F1</span></div>
      <div><strong>95.8%</strong><span>posture Macro-F1</span></div>
      <div><strong>89.2%</strong><span>seat-depth accuracy</span></div>
      <div><strong>1.4 cm</strong><span>stable height MAE</span></div>
    </div>
    <div class="industry-feature__footer">
      <div class="industry-feature__stack">
        <b>TECHNICAL CAPABILITIES</b>
        <div class="industry-feature__tags">
          <span>RTMO Fine-Tuning</span><span>Person / Keypoint Detection</span><span>Multi-Task ResNet-18</span><span>iToF Seating Position</span><span>VLM Integration</span><span>Temporal Fusion</span><span>Per-Seat State</span><span>Vehicle Interfaces</span><span>Real-Vehicle Evaluation</span>
        </div>
      </div>
      <a class="industry-feature__cta" href="{{ '/projects/occupant-state-monitoring/' | relative_url }}">Explore the case study <span aria-hidden="true">↗</span></a>
    </div>
  </div>
  <div class="industry-feature__visual">
    <div class="industry-feature__media">
      <img src="{{ '/assets/img/projects/oms_architecture.svg' | relative_url }}?v=20261021-model" alt="Integrated occupant perception architecture with RTMO detection, posture, iToF seating position, VLM temporal fusion, and vehicle messages" loading="lazy" decoding="async" data-zoomable>
      <div class="industry-feature__visual-meta"><span>INTEGRATED PERCEPTION SYSTEM</span><small>Schematic · click to enlarge</small></div>
    </div>
  </div>
</article>

<h2 class="category work-category">Research &amp; Selected Projects</h2>

<div class="row">
  <div class="col-md-6 mb-4">
    <div class="card h-100">
      <img src="/assets/img/fast-robot.jpg" class="card-img-top project-img" alt="Fast Robot Navigation & Control">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">Fast Robot Navigation &amp; Control</h5>
        <h6 class="card-subtitle mb-2 text-muted">Embedded Systems &amp; Robotics</h6>
        <p class="card-text">Real-time navigation, control, and obstacle avoidance on a resource-constrained embedded robot.</p>
        <div class="mt-auto">
          <a href="https://haixizhang.github.io/FastRobot/" target="_blank" class="btn btn-primary btn-sm">View Project Website</a>
        </div>
      </div>
    </div>
  </div>

  {% assign other_projects = site.projects | where_exp: "project", "project.category != 'industry'" %}
  {% assign sorted_projects = other_projects | sort: "importance" %}

  {% for project in sorted_projects %}
  <div class="col-md-6 mb-4">
    <div class="card h-100">
      {% if project.img %}
        <img src="{{ project.img | relative_url }}" class="card-img-top project-img" alt="{{ project.title }}">
      {% endif %}
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">{{ project.title }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ project.category | capitalize }} Project</h6>
        <p class="card-text">{{ project.description }}</p>
        <div class="mt-auto">
          <div class="d-flex flex-wrap gap-1">
            {% if project.github_url %}<a href="{{ project.github_url }}" class="btn btn-outline-primary btn-sm" target="_blank"><i class="fab fa-github me-1"></i>GitHub</a>{% endif %}
            {% if project.arxiv_url %}<a href="{{ project.arxiv_url }}" class="btn btn-outline-info btn-sm" target="_blank">arXiv</a>{% endif %}
            {% if project.pdf_url %}<a href="{{ project.pdf_url }}" class="btn btn-outline-secondary btn-sm" target="_blank">PDF</a>{% endif %}
            {% if project.website_url %}<a href="{{ project.website_url }}" class="btn btn-outline-success btn-sm" target="_blank">Website</a>{% endif %}
          </div>
          <div class="mt-2"><a href="{{ project.url | relative_url }}" class="btn btn-primary btn-sm">View Details</a></div>
        </div>
      </div>
    </div>
  </div>
  {% endfor %}
</div>
</div>
