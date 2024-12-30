const projects = document.querySelectorAll(".projects li");
const previewImg = document.querySelector(".preview img");
const preview = document.querySelector(".preview");

const customCursor = document.createElement("div");
customCursor.classList.add("custom-cursor");
customCursor.textContent = "View";
document.body.appendChild(customCursor);

projects.forEach(project => {
  project.addEventListener("mouseenter", () => {
    const imageUrl = project.getAttribute("data-image");
    previewImg.src = imageUrl;
    previewImg.onload = () => {
      preview.style.opacity = "1";
    };

    customCursor.style.opacity = "1";
  });

  project.addEventListener("mousemove", (e) => {
    const x = e.pageX - previewImg.width / 2;
    const y = e.pageY - previewImg.offsetHeight / 1.15;
    preview.style.transform = `translate(${x}px, ${y}px)`;

    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
  });

  project.addEventListener("mouseleave", () => {
    preview.style.opacity = "0";

    customCursor.style.opacity = "0";
  });
});

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

  fetch("/public/scripts/projects.json")
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
