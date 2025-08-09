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
      <div class="card h-100">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">
            <a href="{{ project.url | relative_url }}" class="text-decoration-none">{{ project.title }}</a>
          </h5>
          <h6 class="card-subtitle mb-2 text-muted">{{ project.category | capitalize }} Project</h6>
          <p class="card-text">{{ project.description }}</p>
          
          <!-- Project links section -->
          <div class="mt-auto">
            <div class="d-flex flex-wrap gap-1">
              {% if project.github_url %}
                <a href="{{ project.github_url }}" class="btn btn-outline-primary btn-sm" target="_blank">
                  <i class="fab fa-github me-1"></i>GitHub
                </a>
              {% endif %}
              {% if project.arxiv_url %}
                <a href="{{ project.arxiv_url }}" class="btn btn-outline-info btn-sm" target="_blank">
                  arXiv
                </a>
              {% endif %}
              {% if project.pdf_url %}
                <a href="{{ project.pdf_url }}" class="btn btn-outline-secondary btn-sm" target="_blank">
                  PDF
                </a>
              {% endif %}
              {% if project.website_url %}
                <a href="{{ project.website_url }}" class="btn btn-outline-success btn-sm" target="_blank">
                  Website
                </a>
              {% endif %}
            </div>
            <div class="mt-2">
              <a href="{{ project.url | relative_url }}" class="btn btn-primary btn-sm">
                View Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  {% endfor %}
</div>


</div>