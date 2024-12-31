document.addEventListener("DOMContentLoaded", () => {
  fetch('../public/scripts/projects.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Erreur de chargement du fichier JSON');
          }
          return response.json();
      })
      .then(projects => {
          generateProjects(projects);
          initializePreviewEvents(); // Appeler la fonction après la génération des projets
      })
      .catch(error => console.error('Erreur:', error));

  // Fonction pour générer les projets
  function generateProjects(projects) {
      const projectList = document.getElementById("projects-list");

      projects.forEach(project => {
          const listItem = document.createElement("li");
          listItem.setAttribute("data-image", project.thumbnail);

          const link = document.createElement("a");
          link.href = `../project/?id=${project.id}`;
          link.textContent = project.title;

          const yearSpan = document.createElement("span");
          yearSpan.classList.add("year");
          yearSpan.textContent = project.year;

          listItem.appendChild(link);
          listItem.appendChild(yearSpan);

          projectList.appendChild(listItem);
      });
  }

  // Initialiser les événements pour les éléments de projet
  function initializePreviewEvents() {
      const projectsItems = document.querySelectorAll(".projects li");
      const previewImg = document.querySelector(".preview img");
      const preview = document.querySelector(".preview");

      console.log(projectsItems); // Vérifiez que cette fois, il contient des éléments

      const customCursor = document.createElement("div");
      customCursor.classList.add("custom-cursor");
      customCursor.textContent = "View";
      document.body.appendChild(customCursor);

      projectsItems.forEach(projectItem => {
          projectItem.addEventListener("mouseenter", () => {
              const imageUrl = projectItem.getAttribute("data-image");
              console.log(imageUrl);
              previewImg.src = imageUrl;
              previewImg.onload = () => {
                  preview.style.opacity = "1";
              };

              customCursor.style.opacity = "1";
          });

          projectItem.addEventListener("mousemove", (e) => {
              const x = e.pageX - previewImg.width / 2;
              const y = e.pageY - previewImg.offsetHeight / 1.15;
              preview.style.transform = `translate(${x}px, ${y}px)`;

              customCursor.style.left = `${e.clientX}px`;
              customCursor.style.top = `${e.clientY}px`;
          });

          projectItem.addEventListener("mouseleave", () => {
              preview.style.opacity = "0";

              customCursor.style.opacity = "0";
          });
      });
  }
});
