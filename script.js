const themeToggles = document.querySelectorAll(".theme-toggle");
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

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

// Handle booking button clicks
function handleBookingClick(event) {
  event.preventDefault();

  if (!isLoggedIn()) {
    // Redirect to login page
    window.location.href = 'login.html';
  } else {
    // Scroll to booking section
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// Add event listeners to booking buttons
function initBookingButtons() {
  const bookingButtons = document.querySelectorAll('a[href="#booking"]');
  bookingButtons.forEach(button => {
    button.addEventListener('click', handleBookingClick);
  });
}

// Update login state UI
function updateLoginState() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    if (isLoggedIn()) {
      logoutBtn.style.display = 'inline-flex';
    } else {
      logoutBtn.style.display = 'none';
    }
  }

  // Add logout functionality
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      updateLoginState();
      alert('You have been logged out successfully');
    });
  }
}

// Initialize booking buttons when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  initBookingButtons();

  // Check login state and show/hide logout button
  updateLoginState();

  // ── FULL-SCREEN NAV OVERLAY  ──────────────────────────────────────────
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navOverlay = document.getElementById('nav-overlay');

  if (hamburgerBtn && navOverlay) {

    function openOverlay() {
      navOverlay.classList.add('is-open');
      navOverlay.setAttribute('aria-hidden', 'false');
      hamburgerBtn.classList.add('is-open');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      hamburgerBtn.setAttribute('aria-label', 'Close navigation menu');
      document.body.style.overflow = 'hidden'; // prevent background scroll
    }

    function closeOverlay() {
      navOverlay.classList.remove('is-open');
      navOverlay.setAttribute('aria-hidden', 'true');
      hamburgerBtn.classList.remove('is-open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerBtn.setAttribute('aria-label', 'Open navigation menu');
      document.body.style.overflow = '';
    }

    // Dedicated close button (✕) inside the overlay
    const overlayCloseBtn = document.getElementById('overlay-close-btn');
    if (overlayCloseBtn) {
      overlayCloseBtn.addEventListener('click', closeOverlay);
    }

    hamburgerBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      navOverlay.classList.contains('is-open') ? closeOverlay() : openOverlay();
    });

    // Close when any overlay link is clicked
    navOverlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeOverlay);
    });

    // Close when clicking the overlay background (not on the nav itself)
    navOverlay.addEventListener('click', function (e) {
      if (e.target === navOverlay) closeOverlay();
    });

    // Auto-close on resize to desktop widths
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) closeOverlay();
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeOverlay();
    });

    // -- ACTIVE NAVIGATION HIGHLIGHTING -------------------------------------
    function highlightActivePage() {
      const currentPath = window.location.pathname;
      const currentFile = currentPath.split('/').pop() || 'index.html';
      const hash = window.location.hash;

      const navLinks = document.querySelectorAll('.nav-links a, .overlay-link');

      // Clear all active classes first
      navLinks.forEach(link => link.classList.remove('active'));

      let foundHashMatch = false;

      // Priority 1: Match hash if it exists
      if (hash) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === hash) {
            link.classList.add('active');
            foundHashMatch = true;
          }
        });
      }

      // Priority 2: Fallback to matching the current page file if no hash match found
      if (!foundHashMatch) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          const isHomePage = (currentFile === 'index.html' || currentFile === '');
          const isLinkHome = (href === 'index.html');

          if (href === currentFile || (isHomePage && isLinkHome)) {
            link.classList.add('active');
          }
        });
      }
    }

    // Call on load and on hash change
    highlightActivePage();
    window.addEventListener('hashchange', highlightActivePage);
    // -----------------------------------------------------------------------

  }
  // ─────────────────────────────────────────────────────────────────────

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

// Handle login form submission - only on login page
if (window.location.pathname.includes('login.html')) {
  const loginForm = document.querySelector('.auth-card button[type="button"]');
  if (loginForm && loginForm.textContent === 'Login') {
    loginForm.addEventListener('click', function () {
      const emailInput = document.querySelector('input[type="email"]');
      const passwordInput = document.querySelector('input[type="password"]');

      if (emailInput && passwordInput) {
        // Simple validation (in real app, this would be server-side)
        if (emailInput.value && passwordInput.value) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', emailInput.value);
          window.location.href = 'index.html#booking';
        } else {
          alert('Please fill in all fields');
        }
      }
    });
  }
}

// Handle register form submission - only on register page
if (window.location.pathname.includes('register.html')) {
  const registerForm = document.querySelector('.auth-card button[type="button"]');
  if (registerForm && registerForm.textContent === 'Register') {
    registerForm.addEventListener('click', function () {
      const nameInput = document.querySelector('input[type="text"]');
      const emailInput = document.querySelector('input[type="email"]');
      const passwordInputs = document.querySelectorAll('input[type="password"]');

      if (nameInput && emailInput && passwordInputs.length === 2) {
        if (passwordInputs[0].value !== passwordInputs[1].value) {
          alert('Passwords do not match');
          return;
        }

        if (nameInput.value && emailInput.value && passwordInputs[0].value) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', emailInput.value);
          localStorage.setItem('userName', nameInput.value);
          window.location.href = 'index.html#booking';
        } else {
          alert('Please fill in all fields');
        }
      }
    });
  }
}

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  // Scroll to top when clicked
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
