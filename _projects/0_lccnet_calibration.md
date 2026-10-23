---
layout: page
title: Production-Grade Neural Camera–LiDAR Calibration
description: Designed, trained, and deployed camera–LiDAR calibration that reduced rotation error by 95% on an unseen vehicle
importance: 0
category: industry
related_publications: false
permalink: /projects/lccnet-calibration/
---

<div class="project-kicker">PRODUCTION ML · AUTONOMOUS SYSTEMS · END-TO-END OWNERSHIP</div>

I **designed, trained, and deployed a 6-DoF camera–LiDAR calibration network** with dual RGB/LiDAR encoders, camera-conditioned FiLM, cross-modal attention, and geometry-aware losses. On an **unseen vehicle**, the deployed model reduced rotation error by **95% (2.95° → 0.14°)** and reprojection error by **89% (22.4 → 2.4 px)**. As sole technical owner, I also built its data pipeline, distributed training, and **ONNX → TensorRT → onboard C++** integration.

<div class="project-metrics project-metrics-detail">
  <div><strong>95%</strong><span>less rotation error · unseen vehicle</span></div>
  <div><strong>6-DoF</strong><span>learned residual correction</span></div>
  <div><strong>89%</strong><span>less reprojection error · unseen vehicle</span></div>
  <div><strong>~13×</strong><span>training acceleration</span></div>
</div>

<div class="project-overview-grid">
  <article><span>01 · CHALLENGE</span><strong>Calibration drift breaks sensor agreement</strong><p>Even a small camera–LiDAR offset corrupts projection geometry and propagates error into downstream perception.</p></article>
  <article><span>02 · APPROACH</span><strong>Design the network around sensor geometry</strong><p>Dual encoders, camera-conditioned FiLM, and learned cross-modal correspondence feed separate rotation and translation heads.</p></article>
  <article><span>03 · OUTCOME</span><strong>Improve calibration on unseen data</strong><p>The deployed model reduced rotation error by 95% and reprojection error by 89% on an unseen vehicle.</p></article>
</div>

<nav class="case-study-index" aria-label="LCCNet case study sections">
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

<div id="formulation" class="project-stage-heading case-study-anchor"><span>01</span><div><small>GEOMETRIC FORMULATION</small><h3>Learn a correction—not an absolute pose</h3></div></div>

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

<div id="architecture" class="project-stage-heading case-study-anchor"><span>02</span><div><small>MODEL ARCHITECTURE</small><h3>Fuse appearance with 3D structure</h3></div></div>

I designed and trained a **dual-branch network** that consumes camera RGB, a rasterized LiDAR inverse-depth/intensity representation, and camera identity. Its architecture learns cross-modal correspondence while giving rotation and translation different paths through the fused geometry:

<figure class="paper-architecture">
  <div class="paper-architecture__canvas">
    <img src="{{ '/assets/img/projects/lccnet_architecture.svg' | relative_url }}?v=20261021-network" alt="LCCNet architecture: camera and LiDAR preprocessing, dual encoders, camera FiLM, cross-attention, rotation and translation heads, and SE(3) correction composition">
  </div>
  <figcaption><strong>Figure 1.</strong> LCCNet predicts a residual rigid transform from camera appearance and pose-conditioned LiDAR projection. Local cross-modal correspondence supports translation while coarse global geometry supports rotation.</figcaption>
</figure>

- **Modality-specific encoders.** An ImageNet-pretrained ResNet-18 extracts RGB appearance, while an independent GroupNorm LiDAR branch encodes projected inverse depth and intensity before fusion.
- **Camera-conditioned FiLM.** Learned feature modulation carries camera identity into the network, allowing one model to serve different camera viewpoints and projection geometries.
- **Cross-modal attention.** Bidirectional RGB↔LiDAR attention at 1/8-scale features learns local appearance-to-geometry relationships that support correspondence-sensitive pose estimation.
- **Separate pose heads.** Coarse/global features support rotation; a local-plus-context path supports translation. The network predicts a normalized quaternion and translation vector for a full 6-DoF residual.
- **Geometry-aware learning.** Rotation and robust translation objectives are coupled with 3D point consistency, tying the predicted correction to the alignment it produces in physical space.

<figure class="paper-architecture paper-qualitative">
  <div class="paper-architecture__canvas">
    <a href="{{ '/assets/img/projects/lccnet_qualitative_calibration.jpg' | relative_url }}" aria-label="Open the full-resolution synthetic LCCNet calibration comparison">
      <img src="{{ '/assets/img/projects/lccnet_qualitative_calibration.jpg' | relative_url }}" alt="Synthetic LCCNet qualitative comparison: the predicted calibration aligns the projected LiDAR scan pattern with the camera scene, the mis-calibrated input shows a coherent rotational offset, and the reference alignment restores the geometry" loading="lazy" decoding="async">
    </a>
  </div>
  <figcaption><strong>Figure 2.</strong> A fully synthetic qualitative visualization of the recovery contract. The middle row applies a coherent rigid perturbation to the LiDAR projection; the predicted result restores the structured scan pattern toward the reference alignment. No proprietary data, vehicle imagery, or hardware is shown.</figcaption>
</figure>

<div id="training" class="project-stage-heading case-study-anchor"><span>03</span><div><small>DISTRIBUTED TRAINING RUNTIME</small><h3>Scale the experiment—not the operational risk</h3></div></div>

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

<div id="data" class="project-stage-heading case-study-anchor"><span>04</span><div><small>DATA &amp; GEOMETRY</small><h3>Convert raw fleet logs into trusted pairs</h3></div></div>

The training dataset contains approximately **100K camera–LiDAR frames**, with RGB rectified to shared virtual-camera intrinsics and LiDAR rendered as inverse depth plus intensity. The data platform is shared with LiLiNet; camera-specific synchronization and projection determine which observations are useful for this model.

- Freeze the rig used for each label, using either the recording-time configuration or an explicitly revised calibration. Internal geometric consistency checks reject corrupted configurations before they enter training.
- Pair camera and LiDAR observations on **sensor timestamps**. Per-log measurements account for different trigger behavior across compute platforms and track drift within a recording.
- Retain the field-of-view margin needed for perturbed-prior reprojection, filter insufficient projected point support, and preserve frame-time motion metadata.
- Deduplicate views using pose changes and select frames before downloading. Camera downloads were approximately halved in the measured collection batch.
- Preserve validation/test partitions when adding training data; replace recollected versions of a session explicitly so old and new labels do not silently mix.

The shared collector was rebuilt after measuring a drifting publication delay of approximately **126 ms**. In one measured vehicle, camera matching windows narrowed from **±100 ms to ±4 ms without frame loss**; in a separate drifting recording, usable-frame coverage rose from **8% to 100%**. These measurements describe the tested logs and motivate sensor-clock matching across the platform.

{% include calibration_data_pipeline.liquid %}

<div id="evaluation" class="project-stage-heading case-study-anchor"><span>06</span><div><small>EVALUATION</small><h3>Connect geometric learning to runtime behavior</h3></div></div>

The deployed model improved both calibration accuracy on an unseen vehicle and fleet performance:

<div class="project-results" markdown="1" role="region" aria-label="Deployed camera–LiDAR calibration results" tabindex="0">

| Evaluation | Rotation error | Reprojection error |
|---|---|---|
| **Unseen vehicle** | **2.95° → 0.14° (−95%)** | **22.4 → 2.4 px (−89%)** |
| **Fleet evaluation** | **−44%** | **−50%** |

</div>

The unseen-vehicle result uses the August deployed model. Fleet results use the current deployed model against nominal extrinsics, with **57% lower translation error** as well. Export and runtime checks verify preprocessing, numerical parity, and pose composition before onboard integration.

<details>
<summary>October model iterations and offline comparison</summary>

The **1002 production release** was retrained after the new collector expanded the training dataset by **16%**. I exported the selected model to ONNX, converted it to TensorRT, and deployed it through the existing onboard interface.

<div class="project-results" markdown="1" role="region" aria-label="Evaluation results" tabindex="0">

| Version / experiment | Rotation error | Translation error | Status and measurement scope |
|---|---|---|---|
| Previous production model | 0.49° | 4.2 cm | Reference on 2,824 validation frames |
| **1002 release** | **0.41°** | **3.4 cm** | Deployed; same 2,824-frame validation comparison |
| October candidate | **0.42° → 0.31°** | — | Separate same-vehicle, different-session comparison; selected checkpoint, not yet exported or deployed |

</div>

The release comparison measures **offline validation improvement over the previous production model**; the fleet figures above compare the current model against nominal extrinsics. Training and validation contain different sessions from the same vehicle pool. The newer candidate also incorporates expanded data and revised labels, so its improvement reflects the combined update.

</details>

**Data-quality iteration.** A port of the onboard depth-distribution gate is implemented and pending merge and collection-image activation. In the measured data, it rejects **7.9%** of frames; those frames carried **2.2×** the rotation error of the retained group. Training with the filtered data is in progress. The collection speed limit is still being evaluated.

<div id="deployment" class="project-stage-heading case-study-anchor"><span>07</span><div><small>PRODUCTION SYSTEM</small><h3>Ship the same geometry into C++</h3></div></div>

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

`Python` · `C++` · `PyTorch` · `PyTorch DistributedDataParallel` · `NCCL` · `Distributed Sampling` · `TAR-Sharded Streaming` · `Geometry Precomputation` · `Global Metric Reduction` · `OpenCV` · `ONNX` · `TensorRT` · `CUDA` · `Protobuf` · `Docker` · `Airflow` · `Kubernetes` · `Sensor-Clock Synchronization` · `Data Provenance` · `Sensor Fusion` · `3D Geometry`

<a class="project-companion" href="{{ '/projects/lilinet-calibration/' | relative_url }}"><span>COMPANION SYSTEM</span><strong>LiLiNet · Neural LiDAR–LiDAR Calibration</strong><b>View case study →</b></a>

<p class="project-confidentiality">Selected details are summarized at a high level to respect the confidentiality of production systems and fleet operations.</p>
