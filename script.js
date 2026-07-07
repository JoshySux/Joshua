/* ==========================================
                LIGHTBOX
========================================== */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const caption = document.getElementById("lightbox-caption");

const images = Array.from(document.querySelectorAll(".card img"));

let currentImage = null;
let currentGallery = null;
let currentGalleryIndex = 0;

function openLightbox(img){

    currentImage = img;

    currentGallery = img.dataset.gallery;

    if(currentGallery){

        currentGalleryIndex = galleryState[currentGallery].index;

        lightboxImg.src =
            galleries[currentGallery][currentGalleryIndex].src;

        caption.textContent =
            galleries[currentGallery][currentGalleryIndex].caption;

    }

    else{

        lightboxImg.src = img.src;
        caption.textContent = img.alt;

    }

    lightbox.classList.add("active");

}

images.forEach(img=>{

    img.addEventListener("click",()=>{

        openLightbox(img);

    });

});

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.classList.remove("active");

    }

});

document.querySelector(".lb-next").onclick = ()=>{

    if(!currentGallery){

        return;

    }

    currentGalleryIndex++;

    if(currentGalleryIndex>=galleries[currentGallery].length){

        currentGalleryIndex=0;

    }

    lightboxImg.style.opacity=0;

    setTimeout(()=>{

        lightboxImg.src=
        galleries[currentGallery][currentGalleryIndex].src;

        caption.textContent=
        galleries[currentGallery][currentGalleryIndex].caption;

        lightboxImg.style.opacity=1;

    },180);

};

document.querySelector(".lb-prev").onclick=()=>{

    if(!currentGallery){

        return;

    }

    currentGalleryIndex--;

    if(currentGalleryIndex<0){

        currentGalleryIndex=
        galleries[currentGallery].length-1;

    }

    lightboxImg.style.opacity=0;

    setTimeout(()=>{

        lightboxImg.src=
        galleries[currentGallery][currentGalleryIndex].src;

        caption.textContent=
        galleries[currentGallery][currentGalleryIndex].caption;

        lightboxImg.style.opacity=1;

    },180);

};


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

// Gradually speed up 
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


/* ==========================================
            GALLERY ENGINE V3
========================================== */

const galleries={

portrait:[

{
src:"img/Salinan JSX05903.jpg",
caption:"Midnight photoshoot with @shniamrsla."
},

{
src:"img/Salinan JSX05575.jpg",
caption:"Midnight photoshoot with @shniamrsla."
},

{
src:"img/Salinan JSX06150.jpg",
caption:"Midnight photoshoot with @shniamrsla."
},

{
src:"img/JSX05511 (1).jpg",
caption:"Midnight photoshoot with @shniamrsla."
}


],

automotive:[

{
src:"img/IMG_2052.jpg",
caption:"Pekora Itasha Wrapped • Porsche Cayman"
},

{
src:"img/JSX09320 (1).jpg",
caption:"Azores Orange • McLaren 720S"
},

{
src:"img/IMG_8269 (2).jpg",
caption:"Skyline Blue • Nissan Skyline GT-R R34"
},

{
src:"img/IMG_6500 (1).jpg",
caption:"Metalic Grey • Nissan Silvia S15"
},

{
src:"img/JSX00872 (1).jpg",
caption:"Midnight Run • Aerox Alpha"
}

],

church:[

{
src:"img/JSX08530 (1).jpg",
caption:"Ps. Yehu Wangsajaya"
},

{
src:"img/JSX02690.jpg",
caption:"Ps. Marcell Kurniawan M.Th"
},

{
src:"img/JSX08889 (1).jpg",
caption:"Ps. Roslianna Ginting, M.PdK"
},

{
src:"img/JSX00539.jpg",
caption:"Ps. Grace A. Thenu, M.Th"
},

{
src:"img/JSX02340.jpg",
caption:"Ps. Yohanes Hetharia, M.Th"
},

],

art:[

{
src:"img/SnapInsta.to_434728578_390508100443196_6500645728106430014_n.jpg",
caption:"'' I'll Always Be With You ''"
},

{
src:"img/SnapInsta.to_547665278_17917721133178400_2759003373024519476_n.jpg",
caption:"Art Collaboration w/ @zincknockonwood"
},

{
src:"img/laquey.jpg",
caption:"Art Commission For Laquesha"
},

{
src:"img/pelmanwtfman.jpg",
caption:"Art Commission For Raphael"
},

{
src:"img/hurbhurb.jpg",
caption:"Art Collaboration w/ Friends"
}

],

poster:[

{
src:"img/Ferrari 488 Pista_20251117_104751_0000.png",
caption:"Lamborghini Huracán Tecnica Poster Design"
},

{
src:"img/6.png",
caption:"Porsche GT3RS Poster Design"
},

{
src:"img/1.png",
caption:"Lexus IS350 Poster Design"
},

{
src:"img/17.png",
caption:"Toyota Supra MK4 Poster Design"
},

{
src:"img/41.png",
caption:"Mitsubishi Lancer Evo VII Poster Design"
},

{
src:"img/44.png",
caption:"Honda Mobilio Poster Design"
}

],

collab:[

{
src:"img/12.png",
caption:"Japanese Stype Poster for @shniamrsla."
},

{
src:"img/car posters hell yeah hell yeah wooo (7).png",
caption:"Custom Pinterest Inspired Poster for @shniamrsla."
},

{
src:"img/car posters hell yeah hell yeah wooo (10).png",
caption:"Pink RedBull Poster."
},

]

};

const galleryState={};

document.querySelectorAll(".gallery-slideshow").forEach(img=>{

    galleryState[img.dataset.gallery]={

        index:0,
        interval:null

    };

});

document.querySelectorAll(".gallery-slideshow").forEach(img=>{

    const galleryName=img.dataset.gallery;

    img.addEventListener("mouseenter",()=>{

        galleryState[galleryName].interval=setInterval(()=>{

            const gallery=galleries[galleryName];

            galleryState[galleryName].index++;

            if(galleryState[galleryName].index>=gallery.length){

                galleryState[galleryName].index=0;

            }

            img.style.opacity=0;

            setTimeout(()=>{

                img.src=
                gallery[
                galleryState[galleryName].index
                ].src;

                img.alt=
                gallery[
                galleryState[galleryName].index
                ].caption;

                img.style.opacity=1;

            },400);

        },4500);

    });

    img.addEventListener("mouseleave",()=>{

      clearInterval(galleryState[galleryName].interval);

    });

});
