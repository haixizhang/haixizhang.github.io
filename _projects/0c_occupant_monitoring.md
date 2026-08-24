---
layout: page
title: In-Cabin Occupant State Perception
description: Active development — dual-head seat-occupancy and occupant-posture classification from fisheye cabin imagery, with leakage-resistant data splits and a deployable ONNX contract
img: /assets/img/projects/oms_architecture.svg
importance: 0
category: industry
related_publications: false
permalink: /projects/occupant-state-monitoring/
---

<div class="project-kicker">ACTIVE DEVELOPMENT · COMPUTER VISION · SAFETY-CRITICAL PERCEPTION</div>

I am developing an end-to-end visual perception system for **per-seat occupant state understanding** from fisheye cabin cameras. The current dual-head baseline jointly classifies seat occupancy and occupant posture—including forward-leaning, upright, and reclined states—while the surrounding engineering work turns raw recording sessions into reproducible supervision, separates evaluation sessions from training data, and maintains a stable interface for downstream integration.

Because the project is still active, this page emphasizes the **technical contract and engineering decisions** rather than publishing provisional headline accuracy.

<div class="project-metrics project-metrics-detail">
  <div><strong>Active</strong><span>development status</span></div>
  <div><strong>2 heads</strong><span>occupancy + posture</span></div>
  <div><strong>Session-level</strong><span>held-out evaluation</span></div>
  <div><strong>ONNX</strong><span>integration interface</span></div>
</div>

<div class="project-overview-grid">
  <article><span>01 · CHALLENGE</span><strong>Understand every seat from distorted cabin views</strong><p>Fisheye imagery, occlusion, posture variation, class imbalance, and temporally correlated recordings make apparently simple classification difficult to evaluate honestly.</p></article>
  <article><span>02 · APPROACH</span><strong>Build one reproducible seat-level perception contract</strong><p>Version fixed regions of interest, isolate recording sessions, share visual features across seats, and couple model quality with deterministic data and evaluation checks.</p></article>
  <article><span>03 · CURRENT PHASE</span><strong>Stabilize labels, metrics, and integration boundaries</strong><p>Expand label coverage, freeze the evaluation protocol, test failure modes across seeds, and validate the exported model contract before reporting final results.</p></article>
</div>

<nav class="case-study-index" aria-label="Occupant monitoring case study sections">
  <span>CASE STUDY</span>
  <a href="#context">Context</a>
  <a href="#data">Data</a>
  <a href="#architecture">Architecture</a>
  <a href="#training">Training</a>
  <a href="#evaluation">Evaluation</a>
  <a href="#interface">Interface</a>
  <a href="#roadmap">Roadmap</a>
</nav>

<h2 id="context" class="case-study-anchor">Problem &amp; operating context</h2>

An occupant-monitoring model must convert wide-angle cabin imagery into a stable state estimate for each defined seat. The hard part is not only recognizing people. A usable system must preserve seat identity, avoid temporal leakage between train and validation data, remain interpretable under class imbalance, and expose predictable outputs to the consuming software stack.

The project therefore treats **data construction, model behavior, evaluation, and integration as one system** rather than optimizing an isolated image classifier.

## System architecture

<div class="system-flow" aria-label="Occupant monitoring system architecture">
  <span>Fisheye RGB sessions</span><b>→</b>
  <span>Seat-level labels</span><b>→</b>
  <span>Versioned ROI crops</span><b>→</b>
  <span>Shared visual encoder</span><b>→</b>
  <span>Multi-task heads</span><b>→</b>
  <span>Gated state output</span>
</div>

<div id="data" class="project-stage-heading case-study-anchor"><span>01</span><div><small>DATA CONTRACT</small><h3>Turn correlated recordings into trustworthy supervision</h3></div></div>

- Defined a seat-centric label schema that keeps occupancy and occupant posture explicit instead of hiding application semantics inside folder names or preprocessing code.
- Built deterministic sample manifests from recording sessions, with fixed seat regions and reproducible mapping from frame metadata to model inputs.
- Used **session-isolated splits** so visually adjacent frames from the same recording burst cannot inflate held-out performance.
- Designed burst-aware sampling and dataset audits to expose duplicate frames, sparse labels, class skew, missing files, and inconsistent annotations before training.
- Kept preprocessing configuration versioned so the same crop geometry and normalization contract can be reproduced during evaluation and export.

<div id="architecture" class="project-stage-heading case-study-anchor"><span>02</span><div><small>MODEL ARCHITECTURE</small><h3>Share perception while preserving seat-level outputs</h3></div></div>

The current visual baseline crops each configured seat region from a fisheye frame and passes every crop through a shared **ResNet-18** encoder. Two task heads operate on the same representation: a binary occupancy head and a three-class posture-classification head for forward-leaning, upright, and reclined states. Deterministic output gating prevents an unoccupied seat from producing a semantically misleading posture prediction.

<figure class="paper-architecture">
  <div class="paper-architecture__canvas">
    <img src="{{ '/assets/img/projects/oms_architecture.svg' | relative_url }}" alt="Occupant perception architecture: fisheye cabin frames are converted into versioned per-seat regions, encoded with a shared ResNet18, and passed to occupancy and posture-classification heads before deterministic output gating">
  </div>
  <figcaption><strong>Figure 1.</strong> Current RGB baseline. A shared encoder learns reusable occupant appearance features across seat crops, while task-specific heads preserve distinct occupancy and posture objectives. The illustration is schematic and contains no proprietary imagery or cabin geometry.</figcaption>
</figure>

For seat region \(s\), the model can be summarized as

<div class="geometry-derivation" aria-label="Occupant monitoring multi-task formulation">
  <div class="geometry-derivation__label">SEAT-LEVEL MULTI-TASK CONTRACT</div>
  <div class="geometry-derivation__equation geometry-derivation__equation--compact">
  \[
    h_s=f_\theta\!\left(\operatorname{Crop}(I,\mathcal{R}_s)\right),\qquad
    p_s^{\mathrm{occ}}=\sigma(w_o^{\mathsf T}h_s),\qquad
    p_s^{\mathrm{posture}}=\operatorname{softmax}(W_p h_s)
  \]
  \[
    \mathcal{L}=\lambda_o\,\mathcal{L}_{\mathrm{occ}}+
    \lambda_p\,\mathbb{1}[y_s^{\mathrm{occ}}=1]\,\mathcal{L}_{\mathrm{posture}}
  \]
  </div>
  <p class="geometry-derivation__note">The posture objective is meaningful only for occupied seats. Making this dependency explicit keeps the training target and downstream output semantics aligned.</p>
</div>

<div id="training" class="project-stage-heading case-study-anchor"><span>03</span><div><small>TRAINING SYSTEM</small><h3>Make experiments repeatable, not anecdotal</h3></div></div>

- Centralized dataset, augmentation, optimizer, schedule, seed, and checkpoint configuration so experiments can be reconstructed from artifacts rather than memory.
- Added deterministic execution controls and multi-seed runs to distinguish architecture changes from initialization noise.
- Tracked task-specific losses and class behavior separately, preventing a strong aggregate number from masking a collapsed occupancy or posture class.
- Preserved best-checkpoint selection and export metadata as part of the experiment contract.
- Structured the repository around data preparation, training, evaluation, and export boundaries so changes can be audited without tracing an ad hoc notebook workflow.

<div id="evaluation" class="project-stage-heading case-study-anchor"><span>04</span><div><small>EVALUATION</small><h3>Test the failure modes that matter operationally</h3></div></div>

The evaluation plan goes beyond aggregate accuracy. It reports per-task confusion matrices and per-class behavior, checks whether every class is actually predicted, and separates directional occupancy errors because a **missed occupant** and a **false occupied seat** have different operational consequences.

Session-held-out evaluation, multi-seed variation, degeneration checks, and label-quality audits are treated as release gates. Final quantitative results will be published only after the dataset and evaluation contract are frozen.

<div class="project-proof-strip">
  <div><span>LEAKAGE CONTROL</span><strong>Session split</strong><small>recording groups remain isolated</small></div>
  <div><span>ROBUSTNESS</span><strong>Multi-seed</strong><small>variance is measured explicitly</small></div>
  <div><span>SAFETY VIEW</span><strong>Directional errors</strong><small>failure costs remain visible</small></div>
</div>

<div id="interface" class="project-stage-heading case-study-anchor"><span>05</span><div><small>MODEL INTERFACE</small><h3>Design for integration from the beginning</h3></div></div>

The baseline is exportable through **PyTorch → ONNX** with a documented tensor contract for preprocessing, seat ordering, occupancy probability, posture probabilities, and deterministic gating. This boundary is intentionally narrow: the learned model estimates visual state, while seat configuration, policy thresholds, and application-specific decisions remain explicit in the consuming system.

Current integration work focuses on numerical parity, stable input shapes, reproducible preprocessing, and clear failure behavior when inputs or configuration violate the expected contract.

<div id="roadmap" class="project-stage-heading case-study-anchor"><span>06</span><div><small>CURRENT ROADMAP</small><h3>Freeze the evidence before publishing the result</h3></div></div>

The next milestones are to expand and audit label coverage, finalize the held-out session set, complete multi-seed comparison of the visual baselines, validate upstream frame and ROI assumptions, and lock the exported interface. Once those contracts are stable, this page can graduate from an active research case study to a result-led project with defensible headline metrics.

## Technology

`Python` · `PyTorch` · `ResNet` · `OpenCV` · `Fisheye Vision` · `Multi-Task Learning` · `Experiment Tracking` · `ONNX` · `Reproducible Evaluation`

<a class="project-companion" href="{{ '/projects/' | relative_url }}"><span>SELECTED WORK</span><strong>Return to the complete project portfolio</strong><b>View all projects →</b></a>

<p class="project-confidentiality">Architecture and workflow are summarized at a high level. No proprietary cabin imagery, customer data, vehicle counts, hardware identifiers, or unpublished performance values are shown.</p>
