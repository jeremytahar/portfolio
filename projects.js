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
    const x = e.clientX - previewImg.width / 2;
    const y = e.clientY - previewImg.offsetHeight / 1.15;
    preview.style.transform = `translate(${x}px, ${y}px)`;

    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
  });

  project.addEventListener("mouseleave", () => {
    preview.style.opacity = "0";

    customCursor.style.opacity = "0";
  });
});

function pageTransition() {
  let tl = gsap.timeline();

  tl.to('.transition', {
    duration: 1,
    scaleY: 1,
    transformOrigin: 'bottom',
    ease: 'power4.inOut'
  });

  tl.to('.transition', {
    duration: 1,
    scaleY: 0,
    transformOrigin: 'top',
    ease: 'power4.inOut',
    delay: 0.2
  });
}

function contentAnimation() {
  let tl = gsap.timeline();

  tl.to('h1', {
    top: 0,
    duration: 1,
    ease: 'power3.inOut',
    delay: 0.75
  });
}

function delay(n) {
  n = n || 0;
  return new Promise(done => {
    setTimeout(() => {
      done();
    }, n);
  });
}

barba.init({
  sync: true,
  transitions: [
    {
      async leave(data) {
        const done = this.async();

        pageTransition();
        await delay(1000);
        done();
      },

      async enter(data) {
        contentAnimation();
      },

      async once(data) {
        contentAnimation();
      },
    },
  ],
})
