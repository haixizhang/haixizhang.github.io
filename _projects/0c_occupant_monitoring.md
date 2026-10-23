---
layout: page
title: In-Cabin Occupant Perception System
description: Front- and rear-seat occupant monitoring built from RTMO detector adaptation, ResNet-18 multi-task learning, iToF reasoning, and temporally fused VLM attributes
img: /assets/img/projects/oms_architecture.svg
importance: 0
category: industry
related_publications: false
permalink: /projects/occupant-state-monitoring/
---

<div class="project-kicker">INTEGRATED SYSTEM · MULTIMODAL PERCEPTION · REAL-VEHICLE EVALUATION</div>

As technical owner, I designed and delivered **front- and rear-seat occupant monitoring**, beginning with RTMO person/keypoint adaptation and a **ResNet-18 multi-task occupancy/posture model**, then integrating iToF seating-position reasoning, VLM attributes, temporal fusion, and confidence-aware vehicle messaging. My work spans neural-model design and training, targeted detector fine-tuning, data construction, and integration with the upstream vehicle software.

<div class="project-metrics project-metrics-detail">
  <div><strong>99.3%</strong><span>occupancy F1</span></div>
  <div><strong>95.8%</strong><span>posture Macro-F1</span></div>
  <div><strong>89.2%</strong><span>seat-depth accuracy</span></div>
  <div><strong>1.4 cm</strong><span>stable height MAE</span></div>
</div>

The system covers **front and rear seats**. The results section documents the task-specific protocols behind these benchmarks, alongside separate rear-seat detector-adaptation results.

<div class="project-overview-grid">
  <article><span>01 · CHALLENGE</span><strong>Follow occupant state through difficult transitions</strong><p>Forward leaning, occlusion, entering and leaving the vehicle, and seat changes demand reliable detection and consistent seat-level state.</p></article>
  <article><span>02 · APPROACH</span><strong>Train the visual models, then integrate their evidence</strong><p>Fine-tune RTMO for cabin-specific failures, train a shared-encoder multi-task classifier, and connect their outputs to physical signals and temporal state.</p></article>
  <article><span>03 · RESULT</span><strong>Quantify the system on vehicle recordings</strong><p>Measure occupancy, posture, seating position, and attributes against reviewed human labels, then publish a confidence-aware vehicle message.</p></article>
</div>

<nav class="case-study-index" aria-label="Occupant perception case study sections">
  <span>CASE STUDY</span>
  <a href="#context">Context</a>
  <a href="#detection">RTMO</a>
  <a href="#posture">Multi-Task Model</a>
  <a href="#fusion">Fusion</a>
  <a href="#architecture">Full System</a>
  <a href="#evaluation">Results</a>
  <a href="#interface">Integration</a>
</nav>

<h2 id="context" class="case-study-anchor">Problem &amp; operating context</h2>

Occupant perception must associate a person with a seat, identify forward-leaning, upright, or reclined posture, estimate where an upright occupant is sitting, and maintain useful attributes over time. A missed person can suppress everything downstream; an old attribute estimate can become incorrect as soon as occupants change seats.

I treated **data construction, model adaptation, temporal state, sensor interpretation, and vehicle integration** as parts of one system. Development used AI coding agents, including collaboration with the upstream development agent, to support implementation and integration; I owned the technical decisions, model work, and evaluation.

<div id="detection" class="project-stage-heading case-study-anchor"><span>01</span><div><small>DETECTOR ADAPTATION</small><h3>Recover forward-leaning occupants before classifying them</h3></div></div>

RTMO-s performs one-stage person detection and predicts body keypoints; hip keypoints support seat association. The production detector’s difficult cases were occupants folded forward: some produced no candidate, while others fell below the confidence gate. I fine-tuned the detector for **front and rear cabin views**, using a targeted annotation and training workflow around those failure modes:

- Selected missed detections, already-detected forward leans, and upright/reclined controls from training sessions.
- Created and reviewed **349 cabin frames** across front and rear views, with tight visible-body boxes and hip keypoints for seat association; converted the labels into COCO-compatible training data.
- Fine-tuned **RTMO-s** with cabin examples mixed with COCO person data, retaining general person-detection behavior while adapting to cabin viewpoints.
- Exported through ONNX with the existing input/output and in-graph NMS contract, then evaluated the exported model through the production seat-assignment logic.

On the detector’s reserved evaluation sessions, **rear-seat forward-lean confirmation increased from 72.1% to 98.6% (106/147 → 145/147)**. Front-seat model detection with correct hip-based seat assignment reached **108/111**; the unchanged bounding-box-height rule limited confirmed outputs to **88/111**. This diagnosis separated model recovery from a remaining downstream policy constraint.

These detector-adaptation results use a separate protocol from the front-seat integrated-system results below.

<div id="posture" class="project-stage-heading case-study-anchor"><span>02</span><div><small>POSTURE MODEL &amp; DATA</small><h3>Learn posture with explicit seat and label semantics</h3></div></div>

I designed and trained a **shared-encoder multi-task network** over fixed seat ROIs. An ImageNet-pretrained **ResNet-18** trunk feeds a binary occupancy head and a three-class posture head for forward lean, upright, and reclined states. A masked objective combines occupancy BCE with posture cross-entropy only on occupied, visually judgeable samples. Inference uses explicit occupancy and image-quality gating to preserve the meaning of the outputs.

- Built versioned annotation rules, browser-based labeling/review tools, deterministic manifests, and burst-aware sampling.
- Isolated recording days for training and evaluation, and restricted propagated labels to training.
- Addressed class imbalance, seat-identity shortcuts, and augmentation/inference mismatch through diagnostics and training-set BatchNorm recalibration.
- Completed nine-session out-of-fold evaluation over **6,337 manually labeled seat observations**, including **3,072 valid posture labels**: pooled posture Macro-F1 **0.8714**, occupancy F1 **0.9820**. This earlier model study measures recording-day variation and has its own dataset and protocol.

<div id="fusion" class="project-stage-heading case-study-anchor"><span>03</span><div><small>SENSOR &amp; TEMPORAL FUSION</small><h3>Turn individual observations into a consistent occupant state</h3></div></div>

**Seating position.** The system combines iToF distance and seat-track position to distinguish front-edge seating from the middle/back region. It produces this estimate when the occupant is upright, with explicit confidence and validity fields.

**VLM attributes.** Repeated attribute readings are fused in a sliding window for the same occupant. Entry and exit reset the accumulated state, so the next occupant starts a new estimate. The evaluation tracks how age and height estimates change as observations accumulate, as well as their stable-window error.

**Vehicle context.** Per-seat perception is combined with seat position, backrest angle, seatbelt status, door state, and gear signals in one output schema. Each estimated field carries confidence and validity so consuming software can interpret uncertain or unavailable results.

<div id="architecture" class="project-stage-heading case-study-anchor"><span>04</span><div><small>SYSTEM ARCHITECTURE</small><h3>Connect complementary evidence at the seat level</h3></div></div>

<figure class="paper-architecture">
  <div class="paper-architecture__canvas">
    <img src="{{ '/assets/img/projects/oms_architecture.svg' | relative_url }}?v=20261021-model" alt="Occupant perception system: cabin images feed RTMO detection, seat-level posture classification and VLM attributes; iToF and seat signals support seating-position reasoning; temporal fusion and confidence rules produce one vehicle message per seat">
  </div>
  <figcaption><strong>System architecture.</strong> Person detection, posture, seating position, and attributes provide distinct evidence. Per-seat state, temporal fusion, and confidence/validity rules connect their outputs to the vehicle interface. The diagram contains no proprietary imagery or cabin geometry.</figcaption>
</figure>

<div id="evaluation" class="project-stage-heading case-study-anchor"><span>05</span><div><small>REAL-VEHICLE RESULTS</small><h3>Measure each capability under its operating conditions</h3></div></div>

The October 16, 2026 engineering report evaluates **driver and front-passenger seats from the front OMS camera**, including entry/exit, seat changes, empty seats, and multiple postures. Ground truth was manually labeled after interval sampling and grouping similar consecutive frames. Cross-annotator agreement was **96% for posture and 97% for occupancy**, with disagreements reviewed.

<div class="project-results" markdown="1" role="region" aria-label="Evaluation results" tabindex="0">

| Capability | Result | Evaluation condition |
|---|---|---|
| Occupancy | **98.7% accuracy · 98.5% recall · 99.3% F1** | Frame-level person-detection output against occupied/empty labels |
| Posture | **96.3% accuracy · 95.8% Macro-F1** | Three classes on ground-truth occupied samples, evaluated independently of occupancy detection |
| Forward lean | **94.7% recall · 97.3% F1** | Posture classification; errors were toward upright |
| Seating position | **89.2% accuracy** | Front-edge vs. middle/back; output coverage **94.5%** on upright samples |
| VLM gender | **98.0% accuracy** | Individual VLM replies |
| Height | **1.4 cm MAE · 94.3% within ±4 cm** | Fused estimate after the observation window fills |
| Age | **4.2 years MAE · 78.6% within ±6 years** | Fused estimate after the observation window fills |

</div>

Temporal accumulation substantially improved the measured attribute estimates: from **1–2 readings to a full window**, height within ±4 cm rose from **38.7% to 94.3%**, and age within ±6 years rose from **11.3% to 78.6%**. Weight remained a weaker estimate at **8.5 kg MAE**, making it a target for further work with physical priors.

<div id="interface" class="project-stage-heading case-study-anchor"><span>06</span><div><small>VEHICLE INTEGRATION</small><h3>Deliver one interpretable message per seat</h3></div></div>

The unified message carries occupancy, posture, seating position, occupant attributes, and vehicle-provided signals. Confidence and validity accompany the estimates, while timestamps and sequence numbers support downstream consumption. The quantification report includes a recorded output example from the integrated system.

This work extended my ownership from model training and ONNX contracts into **upstream integration, per-seat state management, temporal aggregation, and real-vehicle quantitative evaluation**. Further iteration focuses on difficult detector cases, upright/reclined boundaries, iToF thresholds across body types, and stronger physical constraints for attribute estimation.

## Technology

Python · PyTorch · RTMO · MMPose · ResNet · ONNX · Computer Vision · Keypoint Detection · iToF · VLM Integration · Temporal Fusion · Vehicle Signals · Quantitative Evaluation

<a class="project-companion" href="{{ '/projects/' | relative_url }}"><span>SELECTED WORK</span><strong>Return to the complete project portfolio</strong><b>View all projects →</b></a>

<p class="project-confidentiality">Architecture and evaluation results are summarized at a high level. No proprietary cabin imagery, raw recordings, internal endpoints, or vehicle identifiers are included.</p>
