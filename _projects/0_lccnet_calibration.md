---
layout: page
title: Production-Grade Neural Camera–LiDAR Calibration
description: End-to-end 6-DoF online calibration—from 500+ GB of multimodal sensor data to TensorRT deployment in an onboard C++ system
importance: 0
category: industry
related_publications: false
permalink: /projects/lccnet-calibration/
---

<div class="project-kicker">PRODUCTION ML · AUTONOMOUS SYSTEMS · END-TO-END OWNERSHIP</div>

As sole technical owner, I took a learning-based system for **online 6-DoF camera–LiDAR extrinsic calibration** from initial requirements to production deployment. I independently designed and implemented its core data, geometry, model, training, evaluation, and runtime components, spanning fleet-scale sensor processing, geometric validation, multimodal learning, ONNX/TensorRT optimization, and onboard C++ integration.

<div class="project-metrics project-metrics-detail">
  <div><strong>500+ GB</strong><span>multimodal sensor data</span></div>
  <div><strong>50K+</strong><span>quality-controlled pairs</span></div>
  <div><strong>0.31°</strong><span>fleet validation error</span></div>
  <div><strong>&lt;0.6°</strong><span>held-out vehicle error</span></div>
</div>

<div class="project-overview-grid">
  <article><span>01 · CHALLENGE</span><strong>Calibration drift breaks sensor agreement</strong><p>Even a small camera–LiDAR offset corrupts projection geometry and propagates error into downstream perception.</p></article>
  <article><span>02 · APPROACH</span><strong>Learn correction from paired evidence</strong><p>Fuse RGB appearance with rasterized depth and intensity while preserving camera identity and 3D geometric constraints.</p></article>
  <article><span>03 · OUTCOME</span><strong>Close the loop onboard</strong><p>From quality-gated fleet logs to TensorRT inference, robust aggregation, health diagnostics, and sensor-rig generation.</p></article>
</div>

<nav class="case-study-index" aria-label="LCCNet case study sections">
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

Camera–LiDAR misalignment degrades the geometric consistency required by downstream perception. Manual calibration is costly to repeat across a production fleet and difficult to monitor continuously. This system turns calibration into an automated, observable onboard capability: it selects trustworthy sensor observations, estimates an extrinsic correction, aggregates evidence across frames, evaluates calibration health, and produces an updated sensor configuration.

## System architecture

<div class="system-flow" aria-label="LCCNet system architecture">
  <span>Fleet sensor logs</span><b>→</b>
  <span>Synchronization &amp; quality gates</span><b>→</b>
  <span>RGB–LiDAR fusion</span><b>→</b>
  <span>6-DoF correction</span><b>→</b>
  <span>Robust aggregation</span><b>→</b>
  <span>Sensor-rig update</span>
</div>

<div id="data" class="project-stage-heading case-study-anchor"><span>01</span><div><small>DATA &amp; GEOMETRY</small><h3>Convert raw fleet logs into trusted pairs</h3></div></div>

- Built a scalable pipeline processing **500+ GB of camera, LiDAR, vehicle-state, and odometry logs** into synchronized, reproducible training and evaluation data.
- Implemented temporal alignment, LiDAR motion compensation, virtual-camera rectification, deterministic point selection, and session-level dataset partitioning.
- Added automated gates for motion state, illumination, exposure, blur, point density, depth distribution, and calibration consistency.
- Detected and rejected stale sensor configurations with errors approaching **10°**, preventing corrupted geometry from entering training and deployment evaluation.
- Eliminated pose-dependent field-of-view leakage and aligned the Python training pipeline with the production C++ preprocessing contract.

<div id="formulation" class="project-stage-heading case-study-anchor"><span>02</span><div><small>GEOMETRIC FORMULATION</small><h3>Learn a correction—not an absolute pose</h3></div></div>

The calibration task is formulated as residual estimation on the rigid-motion group. An imperfect initialization renders the LiDAR observation; supervision asks the network to predict the transformation that returns that observation to the true camera geometry.

<div class="geometry-derivation" aria-label="LCCNet camera LiDAR calibration formulation on SE(3)">
  <div class="geometry-derivation__label">THE GEOMETRIC CONTRACT</div>
  <p>Each camera–LiDAR extrinsic is represented as a homogeneous transform. The current estimate renders LiDAR evidence into the camera frame; the network learns the correction, not an absolute pose:</p>
  <div class="geometry-derivation__equation">
  \[
    T=\begin{bmatrix}R&t\\0&1\end{bmatrix}\in SE(3),\qquad R\in SO(3)
  \]
  \[
    R^{\mathsf T}R=I,\qquad \det(R)=1
  \]
  \[
    p_C^{\mathrm{init}}=T_{\mathrm{init}}p_L,\qquad
    \tilde{u}\sim K\,p_C^{\mathrm{init}}
  \]
  \[
    \begin{aligned}
      \Delta T_{\mathrm{gt}}&=T_{\mathrm{gt}}T_{\mathrm{init}}^{-1}\\
      T_{\mathrm{final}}&=\Delta T_{\mathrm{pred}}T_{\mathrm{init}}\approx T_{\mathrm{gt}}
    \end{aligned}
  \]
  </div>
  <div class="geometry-derivation__split">
    <div><span>ROTATION</span>\[\Delta R_{\mathrm{gt}}=R_{\mathrm{gt}}R_{\mathrm{init}}^{\mathsf T}\]</div>
    <div><span>TRANSLATION</span>\[\Delta t_{\mathrm{gt}}=t_{\mathrm{gt}}-\Delta R_{\mathrm{gt}}t_{\mathrm{init}}\]</div>
  </div>
  <p class="geometry-derivation__note">Training perturbs the initialization while holding the true sensor geometry fixed. Every perturbation therefore creates a new projected depth image and a mathematically consistent SE(3) correction target.</p>
</div>

<div id="architecture" class="project-stage-heading case-study-anchor"><span>03</span><div><small>MODEL ARCHITECTURE</small><h3>Fuse appearance with 3D structure</h3></div></div>

The network consumes camera RGB, a rasterized LiDAR inverse-depth/intensity representation, and camera identity. Its design separates global rotational reasoning from the local correspondence needed for translation:

<figure class="paper-architecture">
  <div class="paper-architecture__canvas">
    <img src="{{ '/assets/img/projects/lccnet_architecture.svg' | relative_url }}" alt="LCCNet architecture: camera and LiDAR preprocessing, dual encoders, camera FiLM, cross-attention, rotation and translation heads, and SE(3) correction composition">
  </div>
  <figcaption><strong>Figure 1.</strong> LCCNet predicts a residual rigid transform from camera appearance and pose-conditioned LiDAR projection. Local cross-modal correspondence supports translation while coarse global geometry supports rotation.</figcaption>
</figure>

- ImageNet-pretrained **ResNet-18** RGB encoder and an independent **depth + intensity** LiDAR branch with GroupNorm.
- Camera-conditioned **FiLM** modulation, enabling one network to model multiple camera viewpoints without duplicating the backbone.
- Bidirectional **RGB↔LiDAR cross-attention** at higher spatial resolution for local geometric correspondence.
- A coarse/global rotation branch and a local-plus-context translation branch for full **6-DoF** correction.
- Quaternion normalization, geodesic rotation, robust translation, and **3D point-consistency** objectives that supervise the transform in both parameter and geometric space.

<figure class="paper-architecture paper-qualitative">
  <div class="paper-architecture__canvas">
    <a href="{{ '/assets/img/projects/lccnet_qualitative_calibration.jpg' | relative_url }}" aria-label="Open the full-resolution synthetic LCCNet calibration comparison">
      <img src="{{ '/assets/img/projects/lccnet_qualitative_calibration.jpg' | relative_url }}" alt="Synthetic LCCNet qualitative comparison: the predicted calibration aligns the projected LiDAR scan pattern with the camera scene, the mis-calibrated input shows a coherent rotational offset, and the reference alignment restores the geometry" loading="lazy" decoding="async">
    </a>
  </div>
  <figcaption><strong>Figure 2.</strong> A fully synthetic qualitative visualization of the recovery contract. The middle row applies a coherent rigid perturbation to the LiDAR projection; the predicted result restores the structured scan pattern toward the reference alignment. No proprietary data, vehicle imagery, or hardware is shown.</figcaption>
</figure>

<div id="training" class="project-stage-heading case-study-anchor"><span>04</span><div><small>DISTRIBUTED TRAINING RUNTIME</small><h3>Scale the experiment—not the operational risk</h3></div></div>

I treated training throughput as an end-to-end systems problem, not a model-only optimization. The original pipeline spent most of its roughly **60-hour** run time repeatedly executing CPU-heavy point-cloud geometry, projection, and perturbation work. I moved reusable computation out of the hot path and repackaged the dataset into sequential **TAR shards** for streaming access, reducing a representative single-accelerator run to approximately **20 hours**. I then built a world-size-configurable **PyTorch DistributedDataParallel** runtime that brought the same experiment class below **5 hours**—an approximately **13× reduction in iteration time** from the initial baseline.

<section class="training-runtime training-runtime--turnaround" aria-label="LCCNet training turnaround and distributed runtime">
  <header class="training-runtime__header">
    <div><span>EXPERIMENT TURNAROUND</span><strong>Remove host-side waste, then scale the optimized path</strong></div>
    <div class="training-runtime__result"><strong>≈13×</strong><span>end-to-end reduction</span></div>
  </header>
  <div class="training-runtime__flow">
    <article><span>01 · INITIAL PIPELINE</span><strong>≈60 hours</strong><small>CPU-heavy geometry, projection, and perturbation repeatedly executed online</small></article>
    <article><span>02 · DATA-PATH OPTIMIZATION</span><strong>≈20 hours</strong><small>reusable computation precomputed · sequential TAR-sharded streaming</small></article>
    <article><span>03 · DISTRIBUTED RUNTIME</span><strong>&lt;5 hours</strong><small>world-size-configurable DDP · deterministic shard ownership</small></article>
  </div>
  <aside class="training-runtime__boundary">
    <div><span>DATA PLANE</span><strong>Keep accelerators fed</strong><small>precomputed geometry · TAR streaming · persistent workers · overlapped host-to-device transfer</small></div>
    <b aria-hidden="true">+</b>
    <div><span>CONTROL PLANE</span><strong>Preserve experiment correctness at scale</strong><small>rank-aware seeding · synchronized gradients and learned losses · global metrics · full-state resume</small></div>
  </aside>
</section>

<div id="evaluation" class="project-stage-heading case-study-anchor"><span>05</span><div><small>EVALUATION</small><h3>Separate capture range from operating accuracy</h3></div></div>

<div class="impact-comparison" aria-label="LCCNet large-error recovery envelope">
  <div class="impact-comparison__value"><span>CONTROLLED PERTURBATION</span><strong>up to 10°</strong><small>rotational disturbance</small></div>
  <div class="impact-comparison__arrow" aria-hidden="true">→</div>
  <div class="impact-comparison__value impact-comparison__value--after"><span>CORRECTED RESIDUAL</span><strong>≈0.5°</strong><small>controlled recovery</small></div>
  <div class="impact-comparison__gain"><strong>SUB-1°</strong><span>recovery envelope</span></div>
</div>

Controlled perturbation evaluation demonstrated recovery from rotational disturbances of up to **10° to approximately 0.5° residual error**. This capture range is reported separately from operating-point accuracy: the system reached **0.31° / 3.33 cm** on fleet validation and demonstrated **sub-degree cross-vehicle generalization**, including below **0.6° rotation error** on held-out vehicle evaluation.

<div class="project-proof-strip">
  <div><span>FLEET VALIDATION</span><strong>0.31°</strong><small>rotation error</small></div>
  <div><span>TRANSLATION</span><strong>3.33 cm</strong><small>validation error</small></div>
  <div><span>HELD-OUT VEHICLE</span><strong>&lt;0.6°</strong><small>rotation error</small></div>
</div>

<div id="deployment" class="project-stage-heading case-study-anchor"><span>06</span><div><small>PRODUCTION SYSTEM</small><h3>Ship the same geometry into C++</h3></div></div>

I productionized the model through **PyTorch → ONNX → TensorRT → C++** and integrated it into the onboard autonomy stack. The runtime includes:

- Camera–LiDAR timestamp synchronization and point-cloud motion compensation.
- Shared virtual-camera preprocessing across training and deployment.
- Deterministic depth/intensity rasterization and camera-conditioned inference.
- Iterative correction and robust multi-frame MAD outlier rejection.
- Per-camera calibration health classification and operational diagnostics.
- Safe relative/absolute sensor-pose updates and complete sensor-rig generation.
- Hardware-compatible TensorRT engine selection, inference timing, and recoverable result logging.

<h2 id="insights" class="case-study-anchor">Engineering and research depth</h2>

Beyond headline accuracy, I built a diagnostic framework for understanding model behavior under domain shift. Controlled ablations and geometric probes isolated bias-dominated error, synthetic-border shortcuts, augmentation-distribution mismatch, and pose-attractor behavior. These findings guided data gates, model selection, and deployment decisions while eliminating expensive but ineffective directions such as naive resolution scaling and variance-only multi-frame aggregation.

## Technology

`Python` · `C++` · `PyTorch` · `PyTorch DistributedDataParallel` · `NCCL` · `Distributed Sampling` · `TAR-Sharded Streaming` · `Geometry Precomputation` · `Global Metric Reduction` · `OpenCV` · `ONNX` · `TensorRT` · `CUDA` · `Protobuf` · `Docker` · `Sensor Fusion` · `3D Geometry`

<a class="project-companion" href="{{ '/projects/lilinet-calibration/' | relative_url }}"><span>COMPANION SYSTEM</span><strong>LiLiNet · Neural LiDAR–LiDAR Calibration</strong><b>View case study →</b></a>

<p class="project-confidentiality">Selected details are summarized at a high level to respect the confidentiality of production systems and fleet operations.</p>
