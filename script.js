// CIRCULAR TEXT
const degreeToRadian = (angle) => {
    return angle * (Math.PI / 180);
};

const radius = 60;
const diameter = radius * 2;

const circle = document.querySelector("#circle");
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

// LOADER 
function startLoader() {
    let counterElement = document.querySelector('.count p');
    let currentValue = 0;
    let targetValue = 100;
    let increment = 1;
    let duration = 2000;
    let startTime = null;

    function updateCounter(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = (timestamp - startTime) / duration;

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

startLoader();

gsap.to(".count", { opacity: 0, delay: 2.75, duration: 0.5 });

let textWrapper = document.querySelector('.ml16');
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
})

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
})

gsap.from(".site-content .header span", {
    y: 200,
    ease: "power4.inOut",
    duration: 1.5,
    delay: 3.25,
    stagger: 0.05
});

gsap.to(".container", {
    delay: 5.5,
    onComplete: function () {
        document.querySelector('.container').style.display = 'none';
    }
});

document.querySelector('.burger-btn').addEventListener('click', () => {
    document.querySelector('.burger-btn').classList.toggle('active');
});


function openNav() {
    if (window.innerWidth < 768) {

        let tl = gsap.timeline({ paused: true });

        tl.to(".navbar ul", {
            duration: 1,
            opacity: 1,
            height: '60dvh',
            paddingTop: '100px',
            ease: 'expo.inOut',
            duration: 0.5
        })
        tl.from(".navbar ul li", {
            duration: 1,
            opacity: 0,
            y: 20,
            stagger: 0.1,
            ease: 'expo.inOut',
            duration: 0.75
        }, "-=0.5");

        tl.reverse();

        document.querySelector('.burger-btn').addEventListener('click', () => {
            tl.reversed(!tl.reversed());
        });
    }
}

window.addEventListener('resize', openNav);

openNav();