---
layout: page
title: "LiLiNet: Production Neural LiDAR–LiDAR Calibration"
description: Geometry-aware residual calibration—from synchronized point-cloud pairs and distributed training to TensorRT/C++ vehicle deployment
importance: 1
category: industry
related_publications: false
permalink: /projects/lilinet-calibration/
---

<div class="project-kicker">PRODUCTION ML · 3D GEOMETRY · END-TO-END OWNERSHIP</div>

I independently architected, trained, diagnosed, and shipped **LiLiNet**, a production residual-calibration system that recovers the rigid-body alignment between heterogeneous LiDARs from imperfect initial extrinsics. The project spans multi-session data collection, geometric label auditing, spherical representation and network design, distributed training, controlled evaluation, ONNX/TensorRT optimization, and integration into an onboard C++ runtime.

<div class="project-metrics project-metrics-detail">
  <div><strong>5K+</strong><span>curated paired observations</span></div>
  <div><strong>+62.5%</strong><span>rotation improvement</span></div>
  <div><strong>0.35°</strong><span>session-held-out error</span></div>
  <div><strong>95.9%</strong><span>evaluated frames improved</span></div>
</div>

<div class="project-overview-grid">
  <article><span>01 · CHALLENGE</span><strong>One rig, multiple LiDAR viewpoints</strong><p>Small rotational offsets fragment the unified point cloud and quietly degrade the geometry consumed by downstream perception.</p></article>
  <article><span>02 · APPROACH</span><strong>Make displacement explicit</strong><p>Project both clouds into a shared spherical representation, then expose angular misalignment through circular azimuth correlation.</p></article>
  <article><span>03 · OUTCOME</span><strong>Recover alignment from large disturbances</strong><p>The learned SE(3) residual contracts injected rotational errors of up to 10° to approximately 0.5° within the trained recovery regime.</p></article>
</div>

<nav class="case-study-index" aria-label="LiLiNet case study sections">
  <span>CASE STUDY</span>
  <a href="#context">Context</a>
  <a href="#data">Data</a>
  <a href="#formulation">Formulation</a>
  <a href="#architecture">Architecture</a>
  <a href="#training">Training</a>
  <a href="#evaluation">Evaluation</a>
  <a href="#deployment">Deployment</a>
  <a href="#insights">Insights</a>
</nav>

<h2 id="context" class="case-study-anchor">Problem &amp; operating context</h2>

Cross-LiDAR misalignment reduces the geometric consistency of the unified point cloud consumed by downstream perception. Repeating manual calibration for every sensor rig is expensive, while silent drift and incorrect initialization are difficult to diagnose operationally. LiLiNet turns this into an observable production capability: begin with an imperfect extrinsic estimate, select trustworthy synchronized observations, recover the relative pose, aggregate evidence across frames, classify calibration health, and generate an updated sensor rig.

## System architecture

<div class="system-flow" aria-label="LiLiNet system architecture">
  <span>Synchronized LiDAR logs</span><b>→</b>
  <span>Initial extrinsics</span><b>→</b>
  <span>Spherical rasterization</span><b>→</b>
  <span>Azimuth correlation</span><b>→</b>
  <span>Robust aggregation</span><b>→</b>
  <span>Sensor-rig update</span>
</div>

<div id="data" class="project-stage-heading case-study-anchor"><span>01</span><div><small>DATA &amp; GEOMETRY</small><h3>Build trustworthy supervision</h3></div></div>

- Built a reproducible multi-session dataset containing **5K+ synchronized LiDAR pairs**, with strict train/validation indexing and deterministic experiment contracts.
- Implemented quality gates for timestamp alignment, ego motion, radial point support, overlap occupancy, shared geometric structure, and corrupted calibration metadata.
- Built robust fleet-level initialization statistics using **chordal-SVD rotation averaging** and **geometric-median translation**, while rejecting duplicated, seed-derived, or geometrically inconsistent rigs.
- Developed point-cloud and calibration audits that exposed order-of-magnitude sensor-density anomalies, invalid frame conventions, ranging inconsistencies, and mislabeled evaluation data before they could distort model selection.

<div id="formulation" class="project-stage-heading case-study-anchor"><span>02</span><div><small>GEOMETRIC FORMULATION</small><h3>Estimate a residual on SE(3)</h3></div></div>

The initial extrinsics define how the two point clouds should meet in a shared frame. LiLiNet predicts the correction that restores their relative geometry, while rotation quality is measured intrinsically on (SO(3)).

<div class="geometry-derivation" aria-label="LiLiNet residual calibration formulation on SE(3)">
  <div class="geometry-derivation__label">RESIDUAL CALIBRATION ON SE(3)</div>
  <p>LiLiNet does not memorize an absolute sensor pose. It predicts the rigid-body correction that carries an imperfect initialization back toward the calibrated geometry:</p>
  <div class="geometry-derivation__equation">
  \[
    T=\begin{bmatrix}R&t\\0&1\end{bmatrix}\in SE(3),\qquad R\in SO(3)
  \]
  \[
    \begin{aligned}
      \Delta T_{\mathrm{gt}}&=T_{\mathrm{gt}}T_{\mathrm{init}}^{-1}\\
      T_{\mathrm{final}}&=\Delta T_{\mathrm{pred}}T_{\mathrm{init}}\approx T_{\mathrm{gt}}
    \end{aligned}
  \]
  </div>
  <p class="geometry-derivation__note">Rotation is evaluated by the geodesic distance on SO(3), not by element-wise matrix error:</p>
  <div class="geometry-derivation__equation geometry-derivation__equation--compact">
  \[
    d_{SO(3)}(R_1,R_2)=\cos^{-1}\!\left(\frac{\operatorname{tr}(R_1^{\mathsf T}R_2)-1}{2}\right)
  \]
  </div>
</div>

<div id="architecture" class="project-stage-heading case-study-anchor"><span>03</span><div><small>MODEL ARCHITECTURE</small><h3>Make angular displacement explicit</h3></div></div>

LiLiNet converts each synchronized point cloud into a full-azimuth **256 × 1536 spherical raster** with range statistics, density, intensity, and overlap channels. The architecture is organized around the geometry of the error:

<figure class="paper-architecture">
  <div class="paper-architecture__canvas">
    <img src="{{ '/assets/img/projects/lilinet_architecture.svg' | relative_url }}" alt="LiLiNet architecture: paired LiDAR inputs, spherical rasterization, shared encoders, circular azimuth correlation, pose heads, robust aggregation, and sensor-rig update">
  </div>
  <figcaption><strong>Figure 1.</strong> LiLiNet converts both point clouds into a shared full-azimuth representation, exposes rotational displacement through circular correlation, and estimates a deployable SE(3) residual from local and global geometry.</figcaption>
</figure>

- A shared **ResNet-18-style encoder with GroupNorm** extracts comparable features across both LiDAR representations.
- Explicit **circular azimuth cross-correlation** exposes rotational displacement rather than forcing a generic CNN to discover it implicitly.
- A multi-scale translation path combines local 1/8-scale structure with coarse 1/32-scale geometric context.
- Learned sensor-position conditioning and separate normalized-quaternion and translation heads produce a full **6-DoF residual**.
- Geodesic rotation, robust translation, trimmed point consistency, yaw/tilt auxiliary objectives, EMA, learned loss weighting, and **multi-GPU distributed training** stabilize optimization.

<figure class="paper-architecture paper-qualitative">
  <div class="paper-architecture__canvas">
    <a href="{{ '/assets/img/projects/lilinet_qualitative_calibration.jpg' | relative_url }}" aria-label="Open the full-resolution synthetic LiLiNet calibration comparison">
      <img src="{{ '/assets/img/projects/lilinet_qualitative_calibration.jpg' | relative_url }}" alt="Synthetic LiLiNet qualitative comparison: the main and blind-spot LiDAR point clouds overlap after predicted calibration, separate into duplicated cars walls curbs and poles under a rigid mis-calibration, and overlap again in the reference alignment" loading="lazy" decoding="async">
    </a>
  </div>
  <figcaption><strong>Figure 2.</strong> A fully synthetic LiDAR–LiDAR alignment visualization. The mis-calibrated input exposes the rigid-pose error as duplicated walls, vehicles, curbs, and poles; predicted calibration collapses the two colored clouds back toward the reference geometry. No proprietary point clouds, environments, or sensor hardware is shown.</figcaption>
</figure>

<div id="training" class="project-stage-heading case-study-anchor"><span>04</span><div><small>DISTRIBUTED TRAINING RUNTIME</small><h3>Treat scale, evaluation, and recovery as one system</h3></div></div>

LiLiNet hardens multi-accelerator training beyond basic gradient synchronization. Its **PyTorch DistributedDataParallel / NCCL runtime** combines vehicle-aware weighted sampling, deterministic per-rank execution, duplicate-free distributed validation, globally reduced metrics, optional synchronized batch normalization, and rank-coordinated operational controls. Strict resume contracts preserve optimizer, scheduler, learned-loss, raw-model, and EMA state so interrupted or extended experiments continue without silently changing model semantics. Multi-accelerator execution increased experimental capacity, while end-to-end profiling localized the remaining throughput ceiling to CPU-side point-cloud loading, spherical rasterization, and nearest-neighbor correspondence construction.

<section class="training-runtime training-runtime--lilinet" aria-label="LiLiNet distributed training runtime">
  <header class="training-runtime__header">
    <div><span>PRODUCTION-HARDENED TRAINING SYSTEM</span><strong>Deterministic scale-out with a profiled data path</strong></div>
    <div class="training-runtime__result"><strong>PROFILED</strong><span>end-to-end throughput</span></div>
  </header>
  <div class="training-runtime__flow">
    <article><span>01 · LAUNCH</span><strong>Rank-aware execution</strong><small>torchrun · NCCL/Gloo backend · process-local seeding</small></article>
    <article><span>02 · SAMPLE</span><strong>Distribution-aware shards</strong><small>vehicle-weighted training · no-padding evaluation</small></article>
    <article><span>03 · OPTIMIZE</span><strong>Synchronized model state</strong><small>DDP gradients · optional SyncBatchNorm · learned-loss sync</small></article>
    <article><span>04 · RECOVER</span><strong>Strict experiment continuity</strong><small>global metrics · raw/EMA checkpoints · coordinated stop control</small></article>
  </div>
  <aside class="training-runtime__boundary">
    <div><span>DISTRIBUTED EXECUTION</span><strong>Correctness-preserving scale-out</strong><small>world-size-configurable DDP with deterministic sampling, evaluation, and recovery contracts</small></div>
    <b aria-hidden="true">→</b>
    <div><span>PROFILED THROUGHPUT CEILING</span><strong>CPU-side geometric preprocessing</strong><small>point-cloud I/O · spherical projection · nearest-neighbor correspondence construction</small></div>
  </aside>
</section>

<div id="evaluation" class="project-stage-heading case-study-anchor"><span>05</span><div><small>EVALUATION</small><h3>Measure recovery and operating performance separately</h3></div></div>

<div class="impact-comparison" aria-label="LiLiNet large-error recovery envelope">
  <div class="impact-comparison__value"><span>CONTROLLED PERTURBATION</span><strong>up to 10°</strong><small>rotational disturbance</small></div>
  <div class="impact-comparison__arrow" aria-hidden="true">→</div>
  <div class="impact-comparison__value impact-comparison__value--after"><span>CORRECTED RESIDUAL</span><strong>≈0.5°</strong><small>controlled recovery</small></div>
  <div class="impact-comparison__gain"><strong>SUB-1°</strong><span>recovery envelope</span></div>
</div>

Controlled perturbation evaluation demonstrated recovery from rotational disturbances of up to **10° to approximately 0.5° residual error**. At the distinct production operating point, LiLiNet achieved **+62.5% rotational improvement** on session-held-out evaluation. Offline translation improved from **15.20 cm to 4.52 cm (+70.3%)**, and **208 of 217 evaluated frames** improved. Production write-back deliberately preserves the trusted rig translation while applying the learned rotational correction.

<div id="deployment" class="project-stage-heading case-study-anchor"><span>06</span><div><small>PRODUCTION SYSTEM</small><h3>Carry the geometry contract onto the vehicle</h3></div></div>

I productionized the full path through **PyTorch → ONNX → TensorRT → C++** and integrated it into the onboard autonomy stack. The runtime includes:

- Stable tensor contracts and numerical parity tooling across Python, ONNX, TensorRT, and C++ preprocessing.
- Hardware-aware TensorRT engine selection across onboard compute variants, with fail-closed compatibility and shape checks.
- Automatic module startup, synchronized keyframe collection, vehicle-motion gating, and geometric BEV-quality screening.
- Independent per-sensor caches, multi-frame inference, quaternion-aware averaging, and MAD outlier rejection.
- Calibration-health classification, operational telemetry, parity dumps, recoverable diagnostics, and complete sensor-rig generation.
- Rotation-only production updates that preserve established translations and handle incompatible sensor-frame conventions explicitly.

<h2 id="insights" class="case-study-anchor">Engineering and research depth</h2>

The strongest contribution was not a single architecture change, but a rigorous framework for determining **why** a calibration model succeeds or fails. Controlled probes quantified a projection-mask shortcut, showed that residual error was dominated by stable cross-domain bias rather than frame noise, and demonstrated why simply increasing aggregation or model complexity could not solve new-domain behavior. These findings drove the data gates, noise curriculum, checkpoint-selection protocol, initialization strategy, and deployment decisions while retiring expensive approaches that did not improve the real operating point.

The evaluation protocol also separates session-held-out accuracy from whole-vehicle generalization instead of conflating them—a critical distinction for production ML systems with limited ground-truth calibration data.

## Technology

`Python` · `C++` · `PyTorch` · `PyTorch DistributedDataParallel` · `NCCL` · `Distributed Sampling` · `Distributed Evaluation` · `SyncBatchNorm` · `EMA Checkpointing` · `3D Geometry` · `Point Clouds` · `ONNX` · `TensorRT` · `CUDA` · `Eigen` · `Protobuf` · `Bazel` · `Sensor Fusion`

<a class="project-companion" href="{{ '/projects/lccnet-calibration/' | relative_url }}"><span>COMPANION SYSTEM</span><strong>LCCNet · Neural Camera–LiDAR Calibration</strong><b>View case study →</b></a>

<p class="project-confidentiality">Selected details are summarized at a high level to respect the confidentiality of production systems and fleet operations.</p>
