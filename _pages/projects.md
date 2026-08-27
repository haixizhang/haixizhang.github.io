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

<p class="work-intro">As sole technical owner, I take production ML and robotics systems from initial requirements and data contracts through independent design, implementation, and validation—and, for deployed systems, onboard integration. The work below emphasizes measurable recovery, cross-domain robustness, and complete engineering ownership.</p>

<h2 class="category work-category">Industry Systems</h2>

<section class="calibration-suite">
  <header class="calibration-suite__header">
    <div class="calibration-suite__eyebrow">PRODUCTION CALIBRATION PORTFOLIO</div>
    <h2>Neural Sensor Calibration Systems</h2>
    <p>Two independently developed and deployed systems covering camera–LiDAR and LiDAR–LiDAR extrinsic calibration—recovering large rotational disturbances to sub-degree residuals, scaling training through a reusable distributed runtime, and carrying the same geometry into production C++.</p>
  </header>

  <div class="suite-results" aria-label="Calibration portfolio results">
    <div><strong>2</strong><span>production systems deployed</span></div>
    <div><strong>500+ GB</strong><span>multimodal sensor data</span></div>
    <div><strong>10° → &lt;1°</strong><span>controlled recovery</span></div>
    <div><strong>Scale-out</strong><span>reusable distributed training runtime</span></div>
  </div>

<article class="industry-feature industry-feature--lccnet">
  <div class="industry-feature__content">
    <div class="industry-feature__meta">
      <div class="industry-feature__eyebrow">01 · LCCNET · CAMERA ↔ LIDAR</div>
      <div class="industry-feature__status"><i aria-hidden="true"></i>Production · Deployed</div>
    </div>
    <h2><a href="{{ '/projects/lccnet-calibration/' | relative_url }}">Neural Camera–LiDAR Calibration</a></h2>
    <p class="industry-feature__lead">A production 6-DoF calibration system that learns corrective geometry from RGB and LiDAR evidence, scales through a world-size-aware training runtime, recovers perturbations as large as 10° to sub-degree residuals, and closes the loop onboard.</p>
    <div class="project-metrics">
      <div><strong>500+ GB</strong><span>sensor data</span></div>
      <div><strong>50K+</strong><span>curated pairs</span></div>
      <div><strong>0.31°</strong><span>fleet validation</span></div>
      <div><strong>&lt;0.6°</strong><span>held-out vehicle</span></div>
    </div>
    <div class="industry-feature__footer">
      <div class="industry-feature__stack">
        <b>TECHNICAL CAPABILITIES</b>
        <div class="industry-feature__tags">
          <span>Multimodal Deep Learning</span><span>Camera–LiDAR Extrinsic Calibration</span><span>Cross-Modal Attention</span><span>SE(3) Optimization</span><span>Distributed Training Systems</span><span>PyTorch DDP / NCCL</span><span>3D Projection Geometry</span><span>Domain Generalization</span><span>Fleet-Scale Data Engineering</span><span>Onboard Inference</span>
        </div>
      </div>
      <a class="industry-feature__cta" href="{{ '/projects/lccnet-calibration/' | relative_url }}">Explore the case study <span aria-hidden="true">↗</span></a>
    </div>
  </div>
  <div class="industry-feature__visual">
    <div class="industry-feature__media">
      <img src="{{ '/assets/img/projects/lccnet_qualitative_calibration.jpg' | relative_url }}" alt="Synthetic LCCNet comparison showing predicted calibration, a visibly rotated mis-calibrated input, and reference alignment" loading="lazy" decoding="async" data-zoomable>
      <div class="industry-feature__visual-meta"><span>QUALITATIVE RECOVERY</span><small>Fully synthetic · click to enlarge</small></div>
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
    <p class="industry-feature__lead">A geometry-aware system that combines full-azimuth correlation with a production-hardened distributed training runtime, recovers cross-LiDAR alignment from large rotational disturbances, and ships through TensorRT/C++.</p>
    <div class="project-metrics">
      <div><strong>5K+</strong><span>curated pairs</span></div>
      <div><strong>+62.5%</strong><span>improvement</span></div>
      <div><strong>0.35°</strong><span>session held-out</span></div>
      <div><strong>95.9%</strong><span>frames improved</span></div>
    </div>
    <div class="industry-feature__footer">
      <div class="industry-feature__stack">
        <b>TECHNICAL CAPABILITIES</b>
        <div class="industry-feature__tags">
          <span>3D Deep Learning</span><span>Cross-LiDAR Extrinsic Calibration</span><span>Point-Cloud Registration</span><span>Spherical Range Imaging</span><span>Circular Correlation</span><span>SO(3) / SE(3) Optimization</span><span>Distributed Training Systems</span><span>PyTorch DDP / NCCL</span><span>Distributed Evaluation</span><span>Robust Pose Aggregation</span>
        </div>
      </div>
      <a class="industry-feature__cta" href="{{ '/projects/lilinet-calibration/' | relative_url }}">Explore the case study <span aria-hidden="true">↗</span></a>
    </div>
  </div>
  <div class="industry-feature__visual">
    <div class="industry-feature__media">
      <img src="{{ '/assets/img/projects/lilinet_qualitative_calibration.jpg' | relative_url }}" alt="Synthetic LiLiNet comparison showing aligned main and blind-spot LiDAR clouds, a rigidly mis-calibrated input, and reference alignment" loading="lazy" decoding="async" data-zoomable>
      <div class="industry-feature__visual-meta"><span>CROSS-LIDAR ALIGNMENT</span><small>Fully synthetic · click to enlarge</small></div>
    </div>
  </div>
</article>
</section>

<article class="industry-feature industry-feature--oms">
  <div class="industry-feature__content">
    <div class="industry-feature__meta">
      <div class="industry-feature__eyebrow">03 · IN-CABIN · OCCUPANT PERCEPTION</div>
      <div class="industry-feature__status"><i aria-hidden="true"></i>Active Development</div>
    </div>
    <h2><a href="{{ '/projects/occupant-state-monitoring/' | relative_url }}">In-Cabin Occupant State Perception</a></h2>
    <p class="industry-feature__lead">A dual-head perception system that jointly classifies seat occupancy and occupant posture from fisheye cabin imagery, with leakage-resistant data construction, deterministic evaluation, and a deployable ONNX interface.</p>
    <div class="project-metrics project-metrics--capabilities">
      <div><b>01 · MODEL</b><strong>Seat-aware multi-task inference</strong><span>shared visual representation for occupancy and posture classification</span></div>
      <div><b>02 · DATA</b><strong>Session-isolated data contract</strong><span>burst-aware sampling with recording-level separation</span></div>
      <div><b>03 · VALIDATION</b><strong>Safety-oriented error taxonomy</strong><span>directional errors, per-class recall, and degeneration checks</span></div>
      <div><b>04 · SYSTEM</b><strong>Deterministic deployment interface</strong><span>versioned preprocessing, tensor semantics, and output gating</span></div>
    </div>
    <div class="industry-feature__footer">
      <div class="industry-feature__stack">
        <b>TECHNICAL CAPABILITIES</b>
        <div class="industry-feature__tags">
          <span>In-Cabin Computer Vision</span><span>Multi-Task Visual Learning</span><span>Occupancy Classification</span><span>Occupant Posture Recognition</span><span>Fisheye ROI Modeling</span><span>Leakage-Resistant Evaluation</span><span>Class-Imbalance Diagnostics</span><span>Safety-Critical Error Analysis</span><span>Deterministic Model Export</span>
        </div>
      </div>
      <a class="industry-feature__cta" href="{{ '/projects/occupant-state-monitoring/' | relative_url }}">Explore the case study <span aria-hidden="true">↗</span></a>
    </div>
  </div>
  <div class="industry-feature__visual">
    <div class="industry-feature__media">
      <img src="{{ '/assets/img/projects/oms_architecture.svg' | relative_url }}" alt="Schematic architecture for per-seat occupancy and occupant-posture classification from fisheye imagery" loading="lazy" decoding="async" data-zoomable>
      <div class="industry-feature__visual-meta"><span>CURRENT VISUAL BASELINE</span><small>Schematic · click to enlarge</small></div>
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
