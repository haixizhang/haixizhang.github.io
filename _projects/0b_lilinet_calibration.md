---
layout: page
title: "LiLiNet: Production Neural LiDAR–LiDAR Calibration"
description: Built and deployed LiDAR–LiDAR calibration from scratch, reducing fleet rotation error by 63%
importance: 1
category: industry
related_publications: false
permalink: /projects/lilinet-calibration/
---

<div class="project-kicker">PRODUCTION ML · 3D GEOMETRY · END-TO-END OWNERSHIP</div>

I **built a LiDAR–LiDAR calibration network from scratch** with shared GroupNorm spherical encoders, **circular azimuth correlation**, and sensor-conditioned rotation/translation heads. The network reduced mean rotation error by **83% (4.86° → 0.83°)** in testing. I deployed it onboard, reducing fleet rotation error by **63% (0.93° → 0.35°)**. As sole technical owner, I also built its data pipeline, distributed training, model export, and C++ integration.

<div class="project-metrics project-metrics-detail">
  <div><strong>63%</strong><span>less fleet rotation error</span></div>
  <div><strong>83%</strong><span>less rotation error · testing</span></div>
  <div><strong>96%</strong><span>evaluated frames improved</span></div>
  <div><strong>~20K</strong><span>training frames</span></div>
</div>

<div class="project-overview-grid">
  <article><span>01 · CHALLENGE</span><strong>One rig, multiple LiDAR viewpoints</strong><p>Small rotational offsets fragment the unified point cloud and quietly degrade the geometry consumed by downstream perception.</p></article>
  <article><span>02 · APPROACH</span><strong>Make displacement explicit</strong><p>Project both clouds into a shared spherical representation, then expose angular misalignment through circular azimuth correlation.</p></article>
  <article><span>03 · OUTCOME</span><strong>Reduce fleet calibration error</strong><p>Onboard deployment reduced rotation error by 63%, from 0.93° to 0.35°, with 96% of evaluated frames improved.</p></article>
</div>

<nav class="case-study-index" aria-label="LiLiNet case study sections">
  <span>CASE STUDY</span>
  <a href="#context">Context</a>
  <a href="#formulation">Formulation</a>
  <a href="#architecture">Network</a>
  <a href="#training">Training</a>
  <a href="#data">Data</a>
  <a href="#collection">Collection</a>
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

<div id="formulation" class="project-stage-heading case-study-anchor"><span>01</span><div><small>GEOMETRIC FORMULATION</small><h3>Estimate a residual on SE(3)</h3></div></div>

The initial extrinsics define how the two point clouds should meet in a shared frame. LiLiNet is a **local refiner around an existing rig**, targeting approximately **±2–3°** residual rotation. Rotation quality is measured intrinsically on SO(3). The training model includes a translation head, while production applies rotation only: blind-spot LiDAR ranging-scale bias makes the translation estimate unsuitable for rig write-back.

<div class="geometry-derivation" aria-label="LiLiNet residual calibration formulation on SE(3)">
  <div class="geometry-derivation__label">RESIDUAL CALIBRATION ON SE(3)</div>
  <p>The supervision target is a residual rigid-body correction. Data diversity and geometric probes are used to distinguish image/point-cloud evidence from vehicle- or sensor-specific pose shortcuts:</p>
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

<div id="architecture" class="project-stage-heading case-study-anchor"><span>02</span><div><small>MODEL ARCHITECTURE</small><h3>Make angular displacement explicit</h3></div></div>

I designed LiLiNet around the angular structure of cross-LiDAR misalignment. Each synchronized point cloud becomes a full-azimuth **256 × 1536 spherical raster** with range statistics, density, intensity, and overlap channels. Shared features and explicit correlation then expose displacement before the pose heads estimate a correction:

<figure class="paper-architecture">
  <div class="paper-architecture__canvas">
    <img src="{{ '/assets/img/projects/lilinet_architecture.svg' | relative_url }}?v=20261021-network" alt="LiLiNet architecture: paired LiDAR inputs, spherical rasterization, shared encoders, circular azimuth correlation, pose heads, robust aggregation, and sensor-rig update">
  </div>
  <figcaption><strong>Figure 1.</strong> LiLiNet converts both point clouds into a shared full-azimuth representation, exposes rotational displacement through circular correlation, and estimates a residual pose from local and global geometry.</figcaption>
</figure>

- **Shared spherical encoders.** ResNet-18-style encoders with GroupNorm use shared weights to place main- and blind-spot-LiDAR observations in a comparable feature space.
- **Circular azimuth correlation.** Wrap-around cross-correlation makes angular displacement explicit across the 360° raster, providing the rotation branch with a matching signal.
- **Task-specific geometry.** The rotation head combines correlation with global context. The translation branch combines local 1/8-scale and coarse 1/32-scale features to preserve both correspondence detail and broader geometry.
- **Sensor-conditioned pose heads.** Learned sensor-position conditioning captures heterogeneous viewpoints; normalized-quaternion and translation outputs parameterize the residual transform.
- **Geometric objectives and training.** SO(3) rotation, robust translation, trimmed point consistency, and yaw/tilt auxiliary objectives supervise alignment. EMA, learned loss weighting, and distributed training support optimization.

<figure class="paper-architecture paper-qualitative">
  <div class="paper-architecture__canvas">
    <a href="{{ '/assets/img/projects/lilinet_qualitative_calibration.jpg' | relative_url }}" aria-label="Open the full-resolution synthetic LiLiNet calibration comparison">
      <img src="{{ '/assets/img/projects/lilinet_qualitative_calibration.jpg' | relative_url }}" alt="Synthetic LiLiNet qualitative comparison: the main and blind-spot LiDAR point clouds overlap after predicted calibration, separate into duplicated cars walls curbs and poles under a rigid mis-calibration, and overlap again in the reference alignment" loading="lazy" decoding="async">
    </a>
  </div>
  <figcaption><strong>Figure 2.</strong> A fully synthetic LiDAR–LiDAR alignment visualization. The mis-calibrated input exposes the rigid-pose error as duplicated walls, vehicles, curbs, and poles; predicted calibration collapses the two colored clouds back toward the reference geometry. No proprietary point clouds, environments, or sensor hardware is shown.</figcaption>
</figure>

<div id="training" class="project-stage-heading case-study-anchor"><span>03</span><div><small>DISTRIBUTED TRAINING RUNTIME</small><h3>Treat scale, evaluation, and recovery as one system</h3></div></div>

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

<div id="data" class="project-stage-heading case-study-anchor"><span>04</span><div><small>DATA &amp; GEOMETRY</small><h3>Build trustworthy supervision</h3></div></div>

The training dataset contains approximately **20K paired LiDAR frames**, matching blind-spot observations with the main LiDAR. Data quality is central: stable vehicle/sensor pose priors can become shortcuts, while ranging-scale errors can contaminate geometric labels.

- Apply sensor-clock pairing and frame-time pose association; reject excessive translation or yaw over the pairing interval.
- Collect at **≤0.5 m/s** with steering and motion limits because this collection path does not perform motion compensation.
- Select views by speed bin and pose change, with a **600-row per-session cap** to limit repetitive data and session dominance.
- A measured selection batch shrank from **171K to 13K frames**, freeing **404 GB** of local storage while retaining the collected data in object storage for future selection rules.
- Audit point-cloud overlays and rig consistency before admitting revised labels. Numerical alignment scores support diagnosis, with visual point-cloud review providing the final geometric check.

{% include calibration_data_pipeline.liquid %}

<div id="evaluation" class="project-stage-heading case-study-anchor"><span>06</span><div><small>EVALUATION</small><h3>Reduce rotation error in testing and deployment</h3></div></div>

The deployed model reduced fleet rotation error by **63% (0.93° → 0.35°)** and improved **96% of evaluated frames**. Testing also demonstrated recovery from larger initial misalignment:

<div class="project-results" markdown="1" role="region" aria-label="Evaluation results" tabindex="0">

| Evaluation | Rotation error | Error reduction |
|---|---|---|
| **Deployed model · fleet evaluation** | **0.93° → 0.35°** | **63%** |
| **Larger-misalignment testing** | **4.86° → 0.83°** | **83%** |

</div>

Fleet figures evaluate the deployed model; the larger-misalignment result comes from a separate stress-test version.

<details>
<summary>Next-model evaluation</summary>

An October candidate reduced rotation error by **76% (0.96° → 0.23°)** in a separate evaluation. It uses expanded data and revised calibration labels and has not been deployed. Label reliability and LiDAR ranging-scale errors remain under investigation.

</details>

<div id="deployment" class="project-stage-heading case-study-anchor"><span>07</span><div><small>PRODUCTION SYSTEM</small><h3>Carry the geometry contract onto the vehicle</h3></div></div>

I productionized the full path through **PyTorch → ONNX → TensorRT → C++** and integrated it into the onboard autonomy stack. The runtime includes:

- Stable tensor contracts and numerical parity tooling across Python, ONNX, TensorRT, and C++ preprocessing.
- Hardware-aware TensorRT engine selection across onboard compute variants, with fail-closed compatibility and shape checks.
- Automatic module startup, synchronized keyframe collection, vehicle-motion gating, and geometric BEV-quality screening.
- Independent per-sensor caches, multi-frame inference, quaternion-aware averaging, and MAD outlier rejection.
- Calibration-health classification, operational telemetry, parity dumps, recoverable diagnostics, and complete sensor-rig generation.
- Rotation-only production updates that preserve established translations and handle incompatible sensor-frame conventions explicitly.

<h2 id="insights" class="case-study-anchor">Engineering and research depth</h2>

I combined **network architecture, geometric learning, and controlled model diagnostics** to determine why a calibration model succeeds or fails. Controlled probes quantified a projection-mask shortcut, showed that residual error was dominated by stable cross-domain bias rather than frame noise, and demonstrated why simply increasing aggregation or model complexity could not solve new-domain behavior. These findings drove the data gates, noise curriculum, checkpoint-selection protocol, initialization strategy, and deployment decisions while retiring expensive approaches that did not improve the real operating point.

The evaluation protocol also separates session-held-out accuracy from whole-vehicle generalization instead of conflating them—a critical distinction for production ML systems with limited ground-truth calibration data.

## Technology

`Python` · `C++` · `PyTorch` · `PyTorch DistributedDataParallel` · `NCCL` · `Distributed Sampling` · `Distributed Evaluation` · `SyncBatchNorm` · `EMA Checkpointing` · `3D Geometry` · `Point Clouds` · `ONNX` · `TensorRT` · `CUDA` · `Eigen` · `Protobuf` · `Bazel` · `Airflow` · `Kubernetes` · `Sensor-Clock Synchronization` · `Data Curation` · `Sensor Fusion`

<a class="project-companion" href="{{ '/projects/lccnet-calibration/' | relative_url }}"><span>COMPANION SYSTEM</span><strong>LCCNet · Neural Camera–LiDAR Calibration</strong><b>View case study →</b></a>

<p class="project-confidentiality">Selected details are summarized at a high level to respect the confidentiality of production systems and fleet operations.</p>
