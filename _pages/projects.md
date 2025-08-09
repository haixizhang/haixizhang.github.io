---
layout: page
title: Projects & Publications
permalink: /projects/
description: A collection of my research projects, publications, and technical work.
nav: true
nav_order: 2
display_categories: [research, technical]
horizontal: false
---

<div class="projects">

<!-- Projects Section -->
<h2 class="category">Projects</h2>

<!-- Featured Project - Fast Robot (Card Format) -->
<div class="row mb-4">
  <div class="col-12">
    <div class="card border-primary">
      <div class="card-body">
        <div class="row">
          <div class="col-md-8">
            <h4 class="card-title">
              <a href="https://haixizhang.github.io/FastRobot/" target="_blank" class="text-decoration-none">
                🚀 Fast Robot Navigation & Control <span class="badge bg-primary ms-2">Featured</span>
              </a>
            </h4>
            <h6 class="card-subtitle mb-2 text-muted">Technical Work - Embedded Systems & Robotics</h6>
            <p class="card-text">
              Advanced robotic control system implementing real-time navigation and obstacle avoidance using embedded systems programming. This project features a comprehensive documentation website with detailed implementation guides and results.
            </p>
          </div>
          <div class="col-md-4 d-flex align-items-center justify-content-center">
            <a href="https://haixizhang.github.io/FastRobot/" target="_blank" class="btn btn-primary btn-lg">
              <i class="fas fa-external-link-alt me-2"></i>View Project Website
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Other Projects (Individual Pages) -->
<div class="row">
  {% assign other_projects = site.projects | where_exp: "project", "project.title != 'Fast Robot Navigation & Control'" %}
  {% assign sorted_projects = other_projects | sort: "importance" %}
  
  {% for project in sorted_projects %}
    <div class="col-md-6 mb-4">
      {% include projects.liquid %}
    </div>
  {% endfor %}
</div>
</div>