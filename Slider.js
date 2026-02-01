/* =========================================
   MITHILA CRUNCH - SLIDER.JS
   Google Sheet Controlled Live Slider
========================================= */

const SLIDER_API =
  "https://script.google.com/macros/s/AKfycbw2prFyE0NrF_eiWEkjVukUMZwr4M5mmuXBIl22Gd-JfyZnqOc-uiYzPfNrLwriWNaT/exec?type=slider";


let currentSlide = 0;
let slidesData = [];
let autoInterval = null;

/* ================= FETCH SLIDER DATA ================= */
fetch(SLIDER_API)
  .then(res => res.text()) // safer for Apps Script
  .then(text => {
    console.log("RAW SLIDER RESPONSE:", text);

    slidesData = JSON.parse(text);

    if (!Array.isArray(slidesData) || slidesData.length === 0) {
      console.warn("No slider data found");
      return;
    }

    buildSlides();
    startAutoSlide();
  })
  .catch(err => {
    console.error("SLIDER FETCH ERROR:", err);
  });

/* ================= BUILD SLIDES ================= */
function buildSlides() {
  const slidesEl = document.getElementById("slides");
  const dotsEl = document.getElementById("dots");

  if (!slidesEl || !dotsEl) {
    console.error("Slider container missing");
    return;
  }

  slidesEl.innerHTML = "";
  dotsEl.innerHTML = "";

  slidesData.forEach((s, index) => {
    console.log("MEDIA URL:", s.media);

    const slide = document.createElement("div");
    slide.className = "slide";

    // IMAGE / VIDEO
    if (s.media && s.media.toLowerCase().endsWith(".mp4")) {
      slide.innerHTML = `
        <video autoplay muted loop playsinline
          style="width:100%;height:100%;object-fit:cover">
          <source src="${s.media}" type="video/mp4">
        </video>
      `;
    } else {
      slide.style.backgroundImage = `url("${s.media}")`;
      slide.style.backgroundSize = "cover";
      slide.style.backgroundPosition = "center";
    }

    // CONTENT (same hero layout)
    slide.innerHTML += `
      <div class="hero-inner">
        <div class="hero-text">
          <h1>${s.title || ""}</h1>
          <p>${s.subtitle || ""}</p>

          <div class="hero-actions">
            <button class="primary-btn">
              ${s.cta || "Order Now"}
            </button>
            <button class="secondary-btn">
              Explore Menu
            </button>
          </div>
        </div>

        <div class="heritage-badge">
  <h3>Pure & Traditional</h3>
  <p>No preservatives. No compromise.</p>
</div>

    `;

    slidesEl.appendChild(slide);

    // DOT
    const dot = document.createElement("span");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsEl.appendChild(dot);
  });

  updateSlider();
}

/* ================= SLIDER CONTROLS ================= */
function goToSlide(index) {
  currentSlide = index;
  updateSlider();
  restartAutoSlide();
}

function updateSlider() {
  const slidesEl = document.getElementById("slides");
  const dots = document.querySelectorAll(".slider-dots span");

  slidesEl.style.transform =
    `translateX(-${currentSlide * 100}%)`;

  dots.forEach((d, i) => {
    d.classList.toggle("active", i === currentSlide);
  });
}

/* ================= AUTO SLIDE ================= */
function startAutoSlide() {
  autoInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % slidesData.length;
    updateSlider();
  }, 5000);
}

function restartAutoSlide() {
  clearInterval(autoInterval);
  startAutoSlide();
}
