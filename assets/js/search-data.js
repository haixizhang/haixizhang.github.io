// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-selected-work",
          title: "Selected Work",
          description: "Production systems, research, and selected technical projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-experience",
          title: "Experience",
          description: "Industry, research, and teaching experience",
          section: "Navigation",
          handler: () => {
            window.location.href = "/experience/";
          },
        },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
        
          title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
        section: "Posts",
        handler: () => {
          
            window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
          
        },
      },{id: "post-displaying-external-posts-on-your-al-folio-blog",
        
          title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-production-grade-neural-camera-lidar-calibration",
          title: 'Production-Grade Neural Camera–LiDAR Calibration',
          description: "End-to-end 6-DoF online calibration—from 500+ GB of multimodal sensor data to TensorRT deployment in an onboard C++ system",
          section: "Projects",handler: () => {
              window.location.href = "/projects/lccnet-calibration/";
            },},{id: "projects-lilinet-production-neural-lidar-lidar-calibration",
          title: 'LiLiNet: Production Neural LiDAR–LiDAR Calibration',
          description: "Geometry-aware residual calibration—from synchronized point-cloud pairs and distributed training to TensorRT/C++ vehicle deployment",
          section: "Projects",handler: () => {
              window.location.href = "/projects/lilinet-calibration/";
            },},{id: "projects-vision-based-occupant-state-monitoring",
          title: 'Vision-Based Occupant State Monitoring',
          description: "Active development — per-seat occupancy and torso-pose perception from fisheye cabin imagery, with leakage-resistant data splits and a deployable ONNX contract",
          section: "Projects",handler: () => {
              window.location.href = "/projects/occupant-state-monitoring/";
            },},{id: "projects-robotic-tool-handler",
          title: 'Robotic Tool Handler',
          description: "Senior Design Project - ARM Cortex-based robotic system with real-time control",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_robotic_tool_handler/";
            },},{id: "projects-robot-mapping-estimation-and-interaction",
          title: 'Robot Mapping, Estimation, and Interaction',
          description: "Autonomous navigation system with SLAM capabilities for TurtleBot2",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_robot_mapping/";
            },},{id: "projects-lrhperception-monocular-real-time-perception-for-autonomous-driving",
          title: 'LRHPerception - Monocular Real-time Perception for Autonomous Driving',
          description: "Unified perception pipeline achieving 29 FPS with object tracking, trajectory prediction, road segmentation, and depth estimation",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_monocular_perception/";
            },},{id: "projects-spatiotemporal-linear-universal-multivariate-time-series-forecasting",
          title: 'Spatiotemporal-Linear - Universal Multivariate Time Series Forecasting',
          description: "Novel forecasting model using Residual Neural Networks with Spatial Attention",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_spatiotemporal_linear/";
            },},{id: "projects-point-forecasts-to-probability-clouds-probabilistic-electricity-price-forecasting",
          title: 'Point Forecasts to Probability Clouds — Probabilistic Electricity Price Forecasting',
          description: "Generative probabilistic forecasting of day-ahead electricity prices with calibrated uncertainty",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_2025-uwiae-gpf/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%68%61%69%78%69%7A%68%61%6E%67%30%32@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/haixizhang", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/haixi-zhang-b83104251", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
