const themeToggles = document.querySelectorAll(".theme-toggle");
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const bookingForm = document.getElementById("bookingForm");
const bookingConfirm = document.getElementById("bookingConfirm");
const slider = document.querySelector(".slider");
const afterImage = document.querySelector(".after-img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const accordionItems = document.querySelectorAll(".accordion-item");
const revealSections = document.querySelectorAll(".reveal");

if (themeToggles.length) {
  themeToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const isDark = document.body.dataset.theme === "dark";
      document.body.dataset.theme = isDark ? "light" : "dark";
      themeToggles.forEach((btn) =>
        btn.setAttribute("aria-pressed", String(!isDark))
      );
    });
  });
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing mobile menu...');
  
  // Highlight active page in navigation
  function highlightActivePage() {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop() || 'index.html';
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Remove existing active classes
      link.classList.remove('active');
      
      // Add active class based on current page
      if (href === currentFile || 
          (currentFile === 'index.html' && href === 'index.html') ||
          (currentFile === '' && href === 'index.html')) {
        link.classList.add('active');
      }
      
      // Handle hash links for single page navigation
      if (href.startsWith('#') && currentFile === 'index.html') {
        const hash = window.location.hash;
        if (hash === href) {
          link.classList.add('active');
        }
      }
    });
  }
  
  // Call the function to set active page
  highlightActivePage();
  
  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  console.log('Mobile menu toggle found:', !!mobileMenuToggle);
  console.log('Mobile menu found:', !!mobileMenu);

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", function(e) {
      e.preventDefault();
      console.log('Mobile menu toggle clicked');
      // Toggle both classes for maximum compatibility
      mobileMenu.classList.toggle("active");
      mobileMenu.classList.toggle("open");
      const isActive = mobileMenu.classList.contains("active") || mobileMenu.classList.contains("open");
      mobileMenuToggle.setAttribute("aria-expanded", isActive);
      console.log('Mobile menu is now:', isActive ? 'open' : 'closed');
    });

    // Close menu when clicking links
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        mobileMenu.classList.remove("open");
        mobileMenuToggle.setAttribute("aria-expanded", "false");
      });
    });
  } else {
    console.error('Mobile menu elements not found!');
  }
});

if (slider && afterImage) {
  slider.addEventListener("input", (event) => {
    const value = event.target.value;
    afterImage.style.width = `${value}%`;
  });
}

if (lightbox && lightboxImage) {
  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      lightboxImage.src = item.src;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });
}

if (lightbox && lightboxClose) {
  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
    }
  });
}

if (accordionItems.length) {
  accordionItems.forEach((item) => {
    item.addEventListener("click", () => {
      const panel = item.nextElementSibling;
      const isOpen = panel.classList.contains("open");
      panel.classList.toggle("open", !isOpen);
      item.setAttribute("aria-expanded", String(!isOpen));
      item.querySelector(".icon").textContent = isOpen ? "+" : "-";
    });
  });
}

if (revealSections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  revealSections.forEach((section) => observer.observe(section));
}

function createConfetti() {
  const colors = ["#FFB6B9", "#A0E7E5", "#FFF5E1"];
  for (let i = 0; i < 24; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.6}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 2500);
  }
}

function playChime() {
  const enabled = document.getElementById("soundToggle").checked;
  if (!enabled) return;
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime);
  gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.25);
}

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (bookingConfirm) {
      bookingConfirm.textContent =
        "All set! We have your booking and a confirmation is on the way.";
    }
    createConfetti();
    playChime();
    bookingForm.reset();
  });
}

const trailContainer = document.querySelector(".cursor-trail");
let trailTimeout;

if (trailContainer) {
  document.addEventListener("mousemove", (event) => {
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    dot.style.left = `${event.clientX}px`;
    dot.style.top = `${event.clientY}px`;
    trailContainer.appendChild(dot);
    clearTimeout(trailTimeout);
    trailTimeout = setTimeout(() => {
      trailContainer.innerHTML = "";
    }, 400);
    setTimeout(() => dot.remove(), 600);
  });
}
