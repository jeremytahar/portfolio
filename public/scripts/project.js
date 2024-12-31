gsap.registerPlugin(ScrollTrigger);

gsap.to(".video-container", {
  width: "100%",
  scrollTrigger: {
    trigger: ".video-container", 
    start: "top bottom", 
    end: "top center", 
    scrub: true,
  },
});


document.addEventListener("DOMContentLoaded", () => {
  const projectId = new URLSearchParams(window.location.search).get("id"); // Récupère l'ID du projet depuis l'URL
  const projectInfoContainer = document.querySelector(".wrapper");

  fetch("../public/scripts/projects.json")
    .then(response => response.json())
    .then(data => {
      const project = data.find(item => item.id === projectId);

      if (!project) {
        projectInfoContainer.innerHTML = "<h1>Project not found</h1>";
        return;
      }

      // Dynamically update the content
      document.title = `Jeremy Tahar | ${project.title}`;
      projectInfoContainer.querySelector(".project-header h1").textContent = project.title;
      projectInfoContainer.querySelector(".project-header img").src = project.image;
      projectInfoContainer.querySelector(".title-date span").textContent = project.date;
      projectInfoContainer.querySelector(".project-info p").textContent = project.description;

      // Update the technologies list
      const techList = projectInfoContainer.querySelector(".tech ul");
      techList.innerHTML = project.technologies.map(tech => `<li>${tech}</li>`).join("");

      // Update the video
      projectInfoContainer.querySelector(".video-container video source").src = project.video;
      projectInfoContainer.querySelector(".video-container video").load();

      document.querySelector('.video-container video').addEventListener('click', function() {
        this.paused ? this.play() : this.pause();
      }
      );

      // Update the website link
      const websiteLink = projectInfoContainer.querySelector(".rotating-circle a");
      websiteLink.setAttribute("href", project.website);

      const githubLink = projectInfoContainer.querySelector(".github a");
      githubLink.setAttribute("href", project.github);
    })
    .catch(error => {
      console.error("Error loading project data:", error);
      projectInfoContainer.innerHTML = "<h1>Error loading project data</h1>";
    });
});
