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

document.body.style.overflow = 'hidden';

// LOADER
function startLoader() {
    const counterElement = safeQuerySelector('.count p');
    if (!counterElement) return;

    let currentValue = 0;
    const targetValue = 100;
    const duration = 2000;
    let startTime = null;

    function updateCounter(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration;

        if (progress < 1) {
            currentValue = Math.min(targetValue, Math.floor(progress * targetValue));
            counterElement.textContent = currentValue;
            requestAnimationFrame(updateCounter);
        } else {
            counterElement.textContent = targetValue;
        }
    }

    requestAnimationFrame(updateCounter);
}

if (safeQuerySelector('.count p')) startLoader();

gsap.to(".count", { opacity: 0, delay: 2.75, duration: 0.5 });

const textWrapper = safeQuerySelector('.ml16');
if (textWrapper) {
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({ loop: false })
        .add({
            targets: '.ml16 .letter',
            translateY: [-100, 0],
            easing: "easeOutExpo",
            duration: 1500,
            delay: (el, i) => 30 * i
        })
        .add({
            targets: '.ml16 .letter',
            translateY: [0, 100],
            easing: "easeOutExpo",
            duration: 3000,
            delay: (el, i) => 1000 + 30 * i
        });
}

gsap.to(".pre-loader", {
    width: "80vw",
    height: "50vh",
    ease: "power4.inOut",
    duration: 2,
    delay: 2.25
});

gsap.to(".loader", {
    height: "0",
    ease: "power4.inOut",
    duration: 1.5,
    delay: 3.25
});

gsap.to(".loader", {
    backgroundColor: "#394f49",
    ease: "power4.inOut",
    duration: 1,
    delay: 2.75
});

gsap.to(".loader-bg", {
    height: "0",
    ease: "power4.inOut",
    duration: 1,
    delay: 3
});

gsap.to("#circle-wrapper", {
    opacity: 1,
    ease: "power4.inOut",
    duration: 1,
    delay: 4
});

gsap.from(".site-content .header span", {
    y: 200,
    ease: "power4.inOut",
    duration: 1.5,
    delay: 3.25,
    stagger: 0.05
});

gsap.to(".container", {
    delay: 4.75,
    onComplete: function () {
        const container = safeQuerySelector('.container');
        if (container) container.style.display = 'none';

        document.body.style.overflow = 'auto';
    }
});

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



// SKILLS SLIDER 
gsap.set(".slider1 li > span", { transformOrigin: "0 50%" });
gsap.set(".slider1 li:not(:first-of-type) span", { opacity: 0.2, scale: 0.8 });

const tl = gsap.timeline()
    .to(".slider1 li:not(:first-of-type) span", {
        opacity: 1,
        scale: 1,
        stagger: 0.5,
    })
    .to(".slider1 li:not(:last-of-type) span", {
        opacity: 0.2,
        scale: 0.8,
        stagger: 0.5
    }, 0);

    if (ScrollTrigger.isTouch === 1) {
        ScrollTrigger.normalizeScroll(true);
      }

ScrollTrigger.create({
    trigger: ".slider1 h2",
    start: "center 60%",
    endTrigger: ".slider1 li:last-of-type",
    end: "center 60%",
    pin: true,
    animation: tl,
    // markers: true,
    scrub: true,
});

