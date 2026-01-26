/* LIGHTBOX */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const caption = document.querySelector("#lightbox p");
const images = Array.from(document.querySelectorAll(".card img"));
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = images[index].src;
  caption.textContent = images[index].alt;
  lightbox.style.display = "flex";
}

images.forEach((img, i) => {
  img.addEventListener("click", () => openLightbox(i));
});

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) lightbox.style.display = "none";
});

document.querySelector(".lb-next").onclick = () =>
  openLightbox((currentIndex + 1) % images.length);

document.querySelector(".lb-prev").onclick = () =>
  openLightbox((currentIndex - 1 + images.length) % images.length);

/* SMOOTH ACCELERATING PROFILE SPIN */
const profilePhoto = document.querySelector('.profile-photo');

let spinning = false;
let speed = 5;
let minSpeed = 0.3;
let acceleration = 0.003;
let animFrame;

let rotation = 0;
let rotationFrame;

// Track rotation continuously
function trackRotation() {
  rotation = (rotation + 360 / (speed * 60)) % 360;
  rotationFrame = requestAnimationFrame(trackRotation);
}

// Gradually speed up (your original logic, preserved)
function accelerateSpin() {
  if (!spinning) return;

  if (speed > minSpeed) {
    speed -= acceleration;
    profilePhoto.style.animation = `spin ${speed}s linear infinite`;
  }

  animFrame = requestAnimationFrame(accelerateSpin);
}

profilePhoto.addEventListener('click', () => {
  if (!spinning) {
    // START SPIN
    spinning = true;
    speed = 5;

    profilePhoto.style.transition = "none";
    profilePhoto.style.animation = `spin ${speed}s linear infinite`;

    accelerateSpin();
    trackRotation();
  } else {
    // STOP SPIN SMOOTHLY
    spinning = false;

    cancelAnimationFrame(animFrame);
    cancelAnimationFrame(rotationFrame);

    profilePhoto.style.animation = "none";

    // Snap to nearest upright rotation
    const finalRotation = Math.round(rotation / 360) * 360;

    // Re-enable transition for smooth slowdown
    requestAnimationFrame(() => {
      profilePhoto.style.transition = "transform 1.6s cubic-bezier(.22,1,.36,1)";
      profilePhoto.style.transform = `rotate(${finalRotation}deg)`;
    });

    rotation = finalRotation % 360;
  }
});


/* KEYFRAMES */
const styleSheet = document.createElement("style");
styleSheet.textContent = `
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`;
document.head.appendChild(styleSheet);

const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // animate once
      }
    });
  },
  {
    threshold: 0.15
  }
);

reveals.forEach(el => observer.observe(el));

