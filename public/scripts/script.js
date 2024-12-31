// Fonction utilitaire pour vérifier l'existence d'un élément
const safeQuerySelector = (selector) => document.querySelector(selector);

// CIRCULAR TEXT
const degreeToRadian = (angle) => angle * (Math.PI / 180);

const circle = safeQuerySelector("#circle");
if (circle) {
    const radius = 60;
    const diameter = radius * 2;

    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;

    const text = circle.dataset.text;
    const characters = text.split("");

    const deltaAngle = 360 / characters.length;
    const characterOffsetAngle = 8;
    let currentAngle = -90;

    characters.forEach((character, index) => {
        const span = document.createElement("span");
        span.innerText = character;
        const xPos = radius * (1 + Math.cos(degreeToRadian(currentAngle)));
        const yPos = radius * (1 + Math.sin(degreeToRadian(currentAngle)));

        const transform = `translate(${xPos}px, ${yPos}px)`;
        const rotate = `rotate(${(index * deltaAngle) + characterOffsetAngle}deg)`;
        span.style.transform = `${transform} ${rotate}`;

        currentAngle += deltaAngle;
        circle.appendChild(span);
    });
}

const burgerBtn = safeQuerySelector('.burger-btn');
if (burgerBtn) {
    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('active');
    });
}

function openNav() {
    if (window.innerWidth < 768) {
        const navbarList = safeQuerySelector(".navbar ul");
        if (!navbarList) return;

        let tl = gsap.timeline({ paused: true });

        tl.to(".navbar ul", {
            display: 'flex',
            opacity: 1,
            height: '60dvh',
            paddingTop: '100px',
            ease: 'expo.inOut',
            duration: 0.5
        });

        tl.from(".navbar ul li", {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            ease: 'expo.inOut',
            duration: 0.75
        }, "-=0.5");

        tl.reverse();

        if (burgerBtn) {
            burgerBtn.addEventListener('click', () => {
                tl.reversed(!tl.reversed());
            });
        }
    }
}

window.addEventListener('resize', openNav);
openNav();




