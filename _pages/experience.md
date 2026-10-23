---
layout: page
permalink: /experience/
title: Experience
description: Technical ownership, production delivery, research, and teaching
nav: true
nav_order: 4
_styles: |
  .post-header {
    margin-bottom: 2.25rem;
  }

  .post-header .post-title {
    margin-bottom: 0.45rem;
    font-size: clamp(3rem, 7vw, 4.15rem);
    font-weight: 420;
    letter-spacing: -0.045em;
    line-height: 1;
  }

  .post-header .post-description {
    margin: 0;
    color: color-mix(in srgb, var(--global-text-color) 78%, var(--global-bg-color));
    font-size: 0.9rem;
    letter-spacing: 0.01em;
  }

---

<section class="experience-primary">
  <header class="experience-role-header">
    <div>
      <span class="experience-eyebrow">INDUSTRY EXPERIENCE</span>
      <h2>ML Engineer</h2>
      <p>Tensor Auto · San Jose, CA</p>
    </div>
    <time>Sep 2025 — Present</time>
  </header>

  <p class="experience-scope">Sole technical owner of three ML/CV systems spanning sensor calibration and occupant perception. I independently design and train the models, build their data and training pipelines, and integrate onboard inference with infrastructure and testing teams. Deployed two calibration systems to production and completed real-vehicle evaluation of integrated occupant perception.</p>

  <div class="experience-ownership" aria-label="Industry responsibilities and impact">
    <article>
      <span>01</span>
      <div>
        <h3>Product Definition & System Design</h3>
        <p>Partnered with my manager to translate high-level product direction into concrete system requirements, evaluation criteria, integration contracts, and delivery milestones.</p>
      </div>
    </article>
    <article>
      <span>02</span>
      <div>
        <h3>Neural Network Design &amp; Training</h3>
        <p>Designed and trained camera–LiDAR calibration with camera-conditioned FiLM and cross-modal attention, reducing rotation error by <strong>95% (2.95° → 0.14°)</strong> on an unseen vehicle. Built LiDAR–LiDAR calibration from scratch with shared spherical encoders and circular azimuth correlation, reducing mean rotation error by <strong>83% (4.86° → 0.83°)</strong> in testing.</p>
      </div>
    </article>
    <article>
      <span>03</span>
      <div>
        <h3>Automated Sensor-Data Infrastructure</h3>
        <p>Built and launched a shared Airflow/Kubernetes collection pipeline across two regions, streaming <strong>17+ TB of raw drive logs</strong> through single-pass extraction to produce <strong>~600 GB of camera–LiDAR and LiDAR–LiDAR calibration data</strong>. Added drift-aware synchronization, traceable calibration labels, and per-log retries; reduced the runtime image from <strong>20 GB to 600 MB</strong>.</p>
      </div>
    </article>
    <article>
      <span>04</span>
      <div>
        <h3>Production Deployment</h3>
        <p>Deployed both calibration models through <strong>PyTorch → ONNX → TensorRT → C++</strong>, with numerical-parity checks, robust temporal aggregation, and sensor-rig updates. Fleet evaluation showed <strong>44% / 57%</strong> lower rotation/translation error for camera–LiDAR calibration and <strong>63% (0.93° → 0.35°)</strong> lower rotation error for LiDAR–LiDAR calibration.</p>
      </div>
    </article>
    <article>
      <span>05</span>
      <div>
        <h3>Detector Adaptation &amp; Evaluation</h3>
        <p>Fine-tuned RTMO-s for front- and rear-seat person detection and keypoints using targeted cabin annotations mixed with COCO data. Rear-seat forward-lean confirmation increased from 72.1% to 98.6% on reserved evaluation sessions, without increasing empty-seat false positives.</p>
      </div>
    </article>
    <article>
      <span>06</span>
      <div>
        <h3>Integrated Occupant Perception</h3>
        <p>Designed front- and rear-seat occupant monitoring with a ResNet-18 multi-task occupancy/posture model, RTMO detection, iToF reasoning, and VLM temporal fusion. Connected confidence-aware outputs to the vehicle interface; system benchmarks measured 99.3% occupancy F1 and 95.8% posture Macro-F1.</p>
      </div>
    </article>
  </div>

  <div class="experience-systems" aria-label="Selected industry systems">
    <div class="experience-systems__heading">
      <span>SELECTED SYSTEMS</span>
      <p>Technical details and results are documented in the corresponding case studies.</p>
    </div>
    <a href="{{ '/projects/lccnet-calibration/' | relative_url }}">
      <span><b>LCCNet</b> · Camera ↔ LiDAR Calibration</span>
      <em>Production deployed</em>
    </a>
    <a href="{{ '/projects/lilinet-calibration/' | relative_url }}">
      <span><b>LiLiNet</b> · Cross-LiDAR Calibration</span>
      <em>Production deployed</em>
    </a>
    <a href="{{ '/projects/occupant-state-monitoring/' | relative_url }}">
      <span><b>In-Cabin Perception</b> · Detection, Posture &amp; Multimodal Fusion</span>
      <em>Vehicle evaluated</em>
    </a>
  </div>
</section>

<section class="experience-secondary">
  <header class="experience-section-header">
    <span class="experience-eyebrow">RESEARCH EXPERIENCE</span>
    <h2>Research Assistant</h2>
    <p><strong>University of Rochester</strong> · Jan 2023 — May 2024 · Advisor: <a href="https://www.tonytgeng.com/">Professor Tong Geng</a></p>
  </header>

  <ul>
    <li>Developed PyTorch-based graph learning and nature-inspired computing methods, combining algorithm design, mathematical analysis, and controlled experimentation across multiple application domains.</li>
    <li>Designed reproducible research workflows for model comparison, performance analysis, and collaborative experimentation in shared Linux computing environments.</li>
    <li>Led a five-member research infrastructure effort covering Linux server administration, automation, Docker/Kubernetes environments, and reliable access to shared compute resources.</li>
  </ul>
</section>

<section class="experience-secondary experience-secondary--teaching">
  <header class="experience-section-header">
    <span class="experience-eyebrow">TEACHING EXPERIENCE</span>
    <h2>Teaching Assistant</h2>
    <p><strong>University of Rochester</strong> · 2022 — 2024</p>
  </header>

  <div class="teaching-courses">
    <div>
      <strong>ECE 204</strong>
      <span>Multiprocessor Architecture</span>
    </div>
    <div>
      <strong>ECE 200</strong>
      <span>Computer Organization</span>
    </div>
    <div>
      <strong>ECE 221</strong>
      <span>Electronic Devices & Circuits</span>
    </div>
  </div>

  <p>Delivered lectures, discussion sessions, office hours, and laboratory support across multiprocessor systems, memory architecture, computer organization, and electronic circuits. Guided students through technical work in <strong>C, MIPS assembly, Verilog, SPICE/LTspice</strong>, and hardware debugging.</p>
</section>
