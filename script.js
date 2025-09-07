// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");

  // Handle navbar background on scroll
  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  // Smooth scroll to section
  function smoothScrollToSection(targetId) {
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }

  // Nav link click
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      smoothScrollToSection(targetId);
    });

    // Hover effect
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.05)";
    });
    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Fade-in sections on scroll
  function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    sections.forEach((section) => {
      const boxTop = section.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        section.classList.add("visible");
      }
    });
  }

  // Intersection Observer for active nav link
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + sectionId) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
  );
  sections.forEach((section) => observer.observe(section));

  // Navbar entrance animation
  setTimeout(() => {
    navbar.style.animation = "slideInDown 0.6s ease";
  }, 100);

  // Add keyframes for navbar
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideInDown {
      from {
        transform: translateY(-100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);

  // Init
  handleScroll();
  revealOnScroll();
  window.addEventListener("scroll", () => {
    handleScroll();
    revealOnScroll();
  });
});
