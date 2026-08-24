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

  <p class="experience-scope"><strong>Role scope.</strong> Technical owner of three company-level ML/CV systems spanning multimodal calibration and in-cabin perception, with responsibility from requirement definition and data infrastructure through modeling, onboard deployment, production validation, and ongoing monitoring.</p>

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
        <h3>Independent Technical Execution</h3>
        <p>Independently designed and implemented the core data, geometry, model, training, evaluation, and runtime components for three perception systems, two of which have been deployed in production.</p>
      </div>
    </article>
    <article>
      <span>03</span>
      <div>
        <h3>Data Infrastructure Collaboration</h3>
        <p>Partnered with the data infrastructure team to define sensor-data formats and interfaces, validate upstream data quality, and co-develop automated data-collection tooling for scalable training and evaluation.</p>
      </div>
    </article>
    <article>
      <span>04</span>
      <div>
        <h3>Production Deployment</h3>
        <p>Owned model export, TensorRT optimization, onboard C++ integration, release validation, deployment support, and production monitoring across the complete inference path.</p>
      </div>
    </article>
    <article>
      <span>05</span>
      <div>
        <h3>Validation & Integration Debugging</h3>
        <p>Worked directly with the testing team to design integration tests, reproduce system failures, debug data/model/runtime issues, and verify fixes in the integrated environment.</p>
      </div>
    </article>
    <article>
      <span>06</span>
      <div>
        <h3>Production Robustness</h3>
        <p>Hardened model outputs with validation logic, consistency checks, deterministic interfaces, and failure diagnostics to improve reliability beyond offline model accuracy.</p>
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
      <span><b>In-Cabin Perception</b> · Occupancy &amp; Posture Classification</span>
      <em>Active development</em>
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
