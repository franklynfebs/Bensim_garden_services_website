document.addEventListener("DOMContentLoaded", function () {

  /* ================= TOGGLE MOBILE MENU ================= */

  const menuToggle = document.getElementById("menuToggle");
  const navButtons = document.getElementById("navButtons");
  const menuOverlay = document.getElementById("menuOverlay");

  if (menuToggle && navButtons && menuOverlay) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navButtons.classList.toggle("show-nav");
      menuOverlay.classList.toggle("active");
    });

    menuOverlay.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navButtons.classList.remove("show-nav");
      menuOverlay.classList.remove("active");
    });
  }

  /* ================= POSTCODE CHECK ================= */

  const serviceablePostcodes = [
    "M1","M2","M3","M4","M5","M6","M7","M8","M9","M11","M12","M13","M14","M15","M16","M17","M18","M19",
    "M20","M21","M22","M23","M24","M25","M26","M27","M28","M29","M30","M31","M32","M33","M34","M35","M38",
    "M40","M41","M43","M44","M45","M46","M50","M60","M61","M90",
    "BL0","BL1","BL2","BL3","BL4","BL5","BL6","BL7","BL8","BL9",
    "OL1","OL2","OL3","OL4","OL5","OL6","OL7","OL8","OL9","OL10","OL11","OL12","OL16",
    "SK1","SK2","SK3","SK4","SK5","SK6","SK7","SK8","SK14","SK15","SK16",
    "WN1","WN2","WN3","WN4","WN5","WN6","WN7",
    "WA13","WA14","WA15"
  ];

  const postcodeForm = document.getElementById("postcode-form");

  if (postcodeForm) {
    postcodeForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const postcode = document.getElementById("postcode").value.toUpperCase().trim();
      const resultDiv = document.getElementById("result");

      if (serviceablePostcodes.includes(postcode)) {
        resultDiv.innerHTML = `
          <div style="margin:1%;font-size:1.3rem;color:white;border:1px solid brown;padding:10px;border-radius:5px;">
            <p>Great news! We offer our services in your area.</p>
          </div>`;
      } else {
        resultDiv.innerHTML = `
          <div style="margin:1%;font-size:1.3rem;color:red;border:1px solid red;padding:10px;border-radius:5px;">
            <p>Sorry, we do not offer services in your area.</p>
          </div>`;
      }
    });
  }

  /* ================= SEARCH ================= */

  const searchBar = document.getElementById("search-bar");
  const resultsContainer = document.getElementById("search-results");
  const closeBtn = document.getElementById("close-results-button");

  const content = [
    { title: "Artificial Grass", text: "Artificial grass laying services" },
    { title: "Tree Cutting", text: "Safe and efficient tree cutting services" },
    { title: "Grass Cutting", text: "Professional grass cutting" },
    { title: "Fencing", text: "Durable fencing solutions" },
    { title: "Decking", text: "Custom decking solutions" },
    { title: "Painting", text: "Painting and decorating services" },
    { title: "Tiling", text: "Expert tiling services" },
    { title: "Block Paving", text: "Block paving for driveways" },
    { title: "Removals", text: "Reliable removal services" },
    { title: "Lawn", text: "Professional lawn care and maintenance" }
  ];

  if (searchBar) {
    searchBar.addEventListener("input", performSearch);
  }

  function performSearch() {
    const query = searchBar.value.toLowerCase();
    resultsContainer.innerHTML = "";

    const results = content.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.text.toLowerCase().includes(query)
    );

    if (results.length > 0) {
      results.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("search-result-item");
        div.innerHTML = `<h3>${item.title}</h3><p>${item.text}</p>`;
        resultsContainer.appendChild(div);
      });
    } else {
      resultsContainer.innerHTML = "<p>No results found.</p>";
    }

    resultsContainer.classList.remove("hidden");
    closeBtn.classList.remove("hidden");
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      resultsContainer.classList.add("hidden");
      closeBtn.classList.add("hidden");
    });
  }

  /* ================= IMAGE SLIDER ================= */

  let currentIndex = 0;
  const slides = document.querySelectorAll(".slide");
  const slider = document.querySelector(".slider");

  if (slides.length > 0 && slider) {
    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }, 3000);
  }

  /* ================= SWIPE ================= */

  const contentSection = document.querySelector(".content-section");
  let startY = 0;
  let endY = 0;

  if (contentSection) {
    contentSection.addEventListener("touchstart", e => {
      startY = e.touches[0].clientY;
    });

    contentSection.addEventListener("touchmove", e => {
      endY = e.touches[0].clientY;
    });

    contentSection.addEventListener("touchend", () => {
      if (startY > endY + 50) {
        contentSection.classList.add("swipe-up");
      } else if (endY > startY + 50) {
        contentSection.classList.remove("swipe-up");
      }
    });
  }

});


     document.addEventListener("DOMContentLoaded", function () {

  /* ===== LAST FOUR CARDS SLIDER ===== */

  const slider = document.querySelector(".slide-container");
  const cards = document.querySelectorAll(".last-four-card");

  if (!slider || cards.length === 0) return; // stop if not on this page

  let currentIndex = 0;
  let startX = 0;
  let isDragging = false;
  let autoSlide;
  const swipeThreshold = 60;

  function cardWidth() {
    return cards[0].offsetWidth;
  }

  function setPosition() {
    slider.style.transition = "transform 0.4s ease";
    slider.style.transform = `translateX(-${currentIndex * cardWidth()}px)`;
  }

  function startAutoSlide() {
    autoSlide = setInterval(() => {
      if (!isDragging) {
        currentIndex = (currentIndex + 1) % cards.length;
        setPosition();
      }
    }, 3000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  slider.addEventListener("pointerdown", (e) => {
    startX = e.clientX;
    isDragging = true;
    slider.style.transition = "none";
    stopAutoSlide();
  });

  slider.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    slider.style.transform = `translateX(${diff - currentIndex * cardWidth()}px)`;
  });

  slider.addEventListener("pointerup", (e) => {
    isDragging = false;
    const diff = e.clientX - startX;

    if (diff > swipeThreshold && currentIndex > 0) currentIndex--;
    else if (diff < -swipeThreshold && currentIndex < cards.length - 1) currentIndex++;

    setPosition();
    startAutoSlide();
  });

  slider.addEventListener("pointerleave", () => {
    if (!isDragging) return;
    isDragging = false;
    setPosition();
    startAutoSlide();
  });

  window.addEventListener("resize", setPosition);

  startAutoSlide();

});