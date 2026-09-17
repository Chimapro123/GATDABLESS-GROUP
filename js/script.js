// ========================================
// GATDABLESS GROUP
// Main Website JavaScript
// ========================================

// ----------------------------------------
// ELEMENT SELECTORS
// ----------------------------------------

const header = document.querySelector(".site-header");
const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const mobileMenu = document.getElementById("mobileMenu");
const backTop = document.getElementById("backTop");
const year = document.getElementById("year");

// ========================================
// HEADER + MOBILE NAVIGATION
// ========================================

function updateHeader() {
  const scrolled = window.scrollY > 28;

  if (header) {
    header.classList.toggle("scrolled", scrolled);
  }

  if (backTop) {
    backTop.classList.toggle("visible", window.scrollY > 650);
  }
}

// Listen for page scrolling
window.addEventListener("scroll", updateHeader, {
  passive: true,
});

// Run immediately when page loads
updateHeader();

// ----------------------------------------
// OPEN MOBILE MENU
// ----------------------------------------

function openMenu() {
  if (!mobileMenu || !menuToggle) return;

  mobileMenu.classList.add("open");

  mobileMenu.setAttribute("aria-hidden", "false");

  menuToggle.setAttribute("aria-expanded", "true");

  document.body.classList.add("menu-open");
}

// ----------------------------------------
// CLOSE MOBILE MENU
// ----------------------------------------

function closeMenu() {
  if (!mobileMenu || !menuToggle) return;

  mobileMenu.classList.remove("open");

  mobileMenu.setAttribute("aria-hidden", "true");

  menuToggle.setAttribute("aria-expanded", "false");

  document.body.classList.remove("menu-open");
}

// Open menu button
menuToggle?.addEventListener("click", openMenu);

// Close menu button
menuClose?.addEventListener("click", closeMenu);

// Close menu when navigation link is clicked
mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Close menu with ESC key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

const revealItems = document.querySelectorAll(".reveal");

// Check if browser supports IntersectionObserver
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // Stop observing once visible
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
} else {
  // Fallback for older browsers
  revealItems.forEach((item) => {
    item.classList.add("visible");
  });
}

// ========================================
// ANIMATED STATISTICS COUNTERS
// ========================================

const counters = document.querySelectorAll("[data-count]");

let countersStarted = false;

const stats = document.getElementById("stats");

// Counter animation function
function animateCounter(element) {
  const target = Number(element.dataset.count);

  const duration = 1500;

  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;

    const progress = Math.min(elapsed / duration, 1);

    // Smooth easing effect
    const easedProgress = 1 - Math.pow(1 - progress, 3);

    const currentValue = Math.floor(target * easedProgress);

    element.textContent = currentValue.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }

  requestAnimationFrame(updateCounter);
}

// Start counters when statistics section enters screen
if (stats && "IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !countersStarted) {
        countersStarted = true;

        counters.forEach((counter) => {
          animateCounter(counter);
        });

        counterObserver.disconnect();
      }
    },
    {
      threshold: 0.35,
    },
  );

  counterObserver.observe(stats);
}

// ========================================
// PORTFOLIO FILTER SYSTEM
// ========================================

const filterButtons = document.querySelectorAll(".filter");

const portfolioCards = document.querySelectorAll(".portfolio-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active state
    filterButtons.forEach((item) => {
      item.classList.remove("active");
    });

    // Add active state
    button.classList.add("active");

    // Get selected filter
    const filter = button.dataset.filter;

    portfolioCards.forEach((card) => {
      const category = card.dataset.category;

      // Show everything
      if (filter === "all") {
        card.classList.remove("hidden");

        return;
      }

      // Show matching category
      if (category === filter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// ========================================
// TESTIMONIAL SLIDER
// ========================================

const testimonials = [
  {
    quote:
      "A dependable partner from planning to delivery. Their team brings professionalism, clear communication and a genuine commitment to the outcome.",

    name: "A. Client",

    role: "Corporate Partner",
  },

  {
    quote:
      "The experience was organized from start to finish. Every detail was handled with care and the communication stayed clear throughout.",

    name: "M. Partner",

    role: "Travel Client",
  },

  {
    quote:
      "A creative team that understands both the business objective and the story behind the brand. The final work felt intentional and professional.",

    name: "K. Director",

    role: "Media & Brand Client",
  },
];

// Current testimonial
let testimonialIndex = 0;

// Testimonial elements
const quoteEl = document.getElementById("testimonialQuote");

const nameEl = document.getElementById("testimonialName");

const roleEl = document.getElementById("testimonialRole");

const dots = document.querySelectorAll(".dot");

// ----------------------------------------
// Render testimonial
// ----------------------------------------

function renderTestimonial() {
  // Safety check
  if (!quoteEl || !nameEl || !roleEl) {
    return;
  }

  const item = testimonials[testimonialIndex];

  // Update text
  quoteEl.textContent = item.quote;

  nameEl.textContent = item.name;

  roleEl.textContent = item.role;

  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === testimonialIndex);
  });
}

// Previous testimonial
document.getElementById("testimonialPrev")?.addEventListener("click", () => {
  testimonialIndex =
    (testimonialIndex - 1 + testimonials.length) % testimonials.length;

  renderTestimonial();
});

// Next testimonial
document.getElementById("testimonialNext")?.addEventListener("click", () => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;

  renderTestimonial();
});

// Click testimonial dots
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    testimonialIndex = index;

    renderTestimonial();
  });
});

// Initial testimonial
renderTestimonial();

// ========================================
// CONTACT FORM
// ========================================

// ========================================
// GATDABLESS ENQUIRY FORM - EMAILJS
// ========================================

const contactForm = document.getElementById("contactForm");

const formMessage = document.getElementById("formMessage");

contactForm?.addEventListener("submit", async (event) => {
  // Stop the page from refreshing
  event.preventDefault();

  // Find the submit button
  const submitButton = contactForm.querySelector(
    'button[type="submit"], input[type="submit"]',
  );

  // Get visitor's name
  const name = contactForm.elements.name?.value.trim() || "";

  // Change button while sending
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
  }

  // Show sending message
  if (formMessage) {
    formMessage.textContent = "Sending your enquiry...";
  }

  try {
    // Send the complete form through EmailJS
    await emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", contactForm);

    // Success message
    if (formMessage) {
      formMessage.textContent = name
        ? `Thank you, ${name}. Your enquiry has been sent successfully to the GATDABLESS team.`
        : "Thank you. Your enquiry has been sent successfully to the GATDABLESS team.";
    }

    // Clear the form
    contactForm.reset();
  } catch (error) {
    // Show error in console
    console.error("EmailJS Error:", error);

    // Show error to visitor
    if (formMessage) {
      formMessage.textContent =
        "Sorry, your enquiry could not be sent. Please try again or contact us directly.";
    }
  } finally {
    // Enable button again
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Start an Enquiry";
    }
  }
});
// ========================================
// BACK TO TOP BUTTON
// ========================================

backTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ========================================
// FOOTER YEAR
// ========================================

if (year) {
  year.textContent = new Date().getFullYear();
}

// ========================================
// CUSTOM PREMIUM CURSOR
// ========================================

const cursorDot = document.querySelector(".cursor-dot");

const cursorRing = document.querySelector(".cursor-ring");

// Starting mouse position
let mouseX = window.innerWidth / 2;

let mouseY = window.innerHeight / 2;

// Starting ring position
let ringX = mouseX;

let ringY = mouseY;

// Only activate on devices with a mouse
const finePointer = window.matchMedia("(pointer:fine)").matches;

if (cursorDot && cursorRing && finePointer) {
  // --------------------------------------
  // Track mouse
  // --------------------------------------

  window.addEventListener(
    "mousemove",
    (event) => {
      mouseX = event.clientX;

      mouseY = event.clientY;

      // Small cursor follows immediately
      cursorDot.style.left = `${mouseX}px`;

      cursorDot.style.top = `${mouseY}px`;
    },
    {
      passive: true,
    },
  );

  // --------------------------------------
  // Smooth ring movement
  // --------------------------------------

  function followCursor() {
    ringX += (mouseX - ringX) * 0.16;

    ringY += (mouseY - ringY) * 0.16;

    cursorRing.style.left = `${ringX}px`;

    cursorRing.style.top = `${ringY}px`;

    requestAnimationFrame(followCursor);
  }

  followCursor();

  // --------------------------------------
  // Cursor hover effects
  // --------------------------------------

  document
    .querySelectorAll("a, button, input, textarea, select")
    .forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursorRing.style.width = "44px";

        cursorRing.style.height = "44px";

        cursorRing.style.background = "rgba(223, 32, 39, 0.08)";
      });

      element.addEventListener("mouseleave", () => {
        cursorRing.style.width = "32px";

        cursorRing.style.height = "32px";

        cursorRing.style.background = "transparent";
      });
    });
}

// ========================================
// SMOOTH INTERNAL ANCHOR SCROLLING
// ========================================

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    // Ignore empty #
    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ========================================
// CLOSE MOBILE MENU ON RESIZE
// ========================================

window.addEventListener("resize", () => {
  // If screen becomes desktop size
  if (window.innerWidth > 900) {
    closeMenu();
  }
});

// ========================================
// PREVENT BACKGROUND SCROLL WHEN MENU OPEN
// ========================================

function handleBodyScroll() {
  if (document.body.classList.contains("menu-open")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

// Watch for menu class changes
const menuObserver = new MutationObserver(handleBodyScroll);

if (mobileMenu) {
  menuObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"],
  });
}

// ========================================
// PAGE LOAD
// ========================================

window.addEventListener("load", () => {
  document.body.classList.add("page-loaded");
});
