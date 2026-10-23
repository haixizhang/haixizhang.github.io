---
layout: default
permalink: /resume/
title: Resume
description: Haixi Zhang - Machine Learning, Computer Vision, and Robotics Engineer
nav: false
---

<div class="resume-viewer">
  <header class="resume-viewer__header">
    <div>
      <p class="resume-viewer__eyebrow">MACHINE LEARNING · COMPUTER VISION · ROBOTICS</p>
      <h1>Resume</h1>
      <p class="resume-viewer__description">Haixi Zhang — Machine Learning Engineer</p>
    </div>
    <div class="resume-viewer__actions">
      <a
        class="btn btn-primary"
        href="{{ '/output/pdf/Haixi_Zhang_Resume_ML_CV_Robotics.pdf' | relative_url }}?v=bbe5ff500596"
        download="Haixi_Zhang_Resume.pdf"
      >
        <i class="fa-solid fa-download" aria-hidden="true"></i>
        Download PDF
      </a>
      <a
        class="btn btn-outline-primary"
        href="{{ '/output/pdf/Haixi_Zhang_Resume_ML_CV_Robotics.pdf' | relative_url }}?v=bbe5ff500596"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open PDF
      </a>
    </div>
  </header>

  <div class="resume-viewer__document" aria-label="Preview of Haixi Zhang's resume">
    <a
      href="{{ '/output/pdf/Haixi_Zhang_Resume_ML_CV_Robotics.pdf' | relative_url }}?v=bbe5ff500596"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open the full PDF of Haixi Zhang's resume"
    >
      <img
        src="{{ '/assets/img/resume-preview.png' | relative_url }}?v=bbe5ff500596"
        alt="Haixi Zhang's one-page resume"
        width="1530"
        height="1980"
        loading="eager"
      >
    </a>
  </div>
</div>

<style>
  .resume-viewer {
    margin: 1.25rem auto 3rem;
    max-width: 1100px;
  }

  .resume-viewer__header {
    align-items: flex-end;
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  .resume-viewer__eyebrow {
    color: var(--global-theme-color);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    margin-bottom: 0.45rem;
  }

  .resume-viewer h1 {
    font-size: clamp(2.4rem, 6vw, 4.5rem);
    font-weight: 700;
    letter-spacing: -0.05em;
    line-height: 0.95;
    margin: 0;
  }

  .resume-viewer__description {
    color: var(--global-text-color-light);
    margin: 0.75rem 0 0;
  }

  .resume-viewer__actions {
    display: flex;
    flex-shrink: 0;
    gap: 0.65rem;
  }

  .resume-viewer__actions .btn {
    align-items: center;
    display: inline-flex;
    gap: 0.45rem;
    white-space: nowrap;
  }

  .resume-viewer__document {
    background: #eceff3;
    border: 1px solid rgba(20, 31, 44, 0.12);
    border-radius: 0.65rem;
    box-shadow: 0 24px 60px rgba(20, 31, 44, 0.14);
    padding: clamp(0.6rem, 2vw, 1.35rem);
  }

  .resume-viewer__document img {
    background: #fff;
    box-shadow: 0 4px 18px rgba(20, 31, 44, 0.12);
    display: block;
    height: auto;
    margin: 0 auto;
    width: 100%;
  }

  @media (max-width: 767px) {
    .resume-viewer__header {
      align-items: flex-start;
      flex-direction: column;
      gap: 1rem;
    }

    .resume-viewer__actions {
      width: 100%;
    }

    .resume-viewer__actions .btn {
      flex: 1;
      justify-content: center;
    }
  }
</style>
