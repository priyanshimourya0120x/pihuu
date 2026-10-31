
/* ==========================================
   PIHU CREATORS - MAIN JAVASCRIPT
   Navbar | Dropdown | Mobile Menu | Footer
========================================== */

document.addEventListener("DOMContentLoaded", function () {

  // ==========================================
  // 1. SELECT ELEMENTS
  // ==========================================

  const menuToggle = document.querySelector(".pc-menu-toggle");
  const navigation = document.querySelector(".pc-navigation");
  const dropdowns = document.querySelectorAll(".pc-dropdown");
  const navLinks = document.querySelectorAll(".pc-navigation a");
  const footerYear = document.getElementById("pc-current-year");


  // ==========================================
  // 2. CLOSE DROPDOWNS
  // ==========================================

  function closeDropdowns(except = null) {

    dropdowns.forEach(function (dropdown) {

      if (dropdown === except) return;

      dropdown.classList.remove("open");

      const button = dropdown.querySelector(
        ".pc-dropdown-toggle"
      );

      if (button) {
        button.setAttribute("aria-expanded", "false");
      }

    });

  }


  // ==========================================
  // 3. CLOSE MOBILE NAVIGATION
  // ==========================================

  function closeMobileMenu() {

    if (!menuToggle || !navigation) return;

    menuToggle.classList.remove("active");
    navigation.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    closeDropdowns();

  }


  // ==========================================
  // 4. MOBILE MENU TOGGLE
  // ==========================================

  if (menuToggle && navigation) {

    menuToggle.addEventListener("click", function (event) {

      event.stopPropagation();

      const isOpen = navigation.classList.toggle("open");

      menuToggle.classList.toggle("active", isOpen);

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      if (!isOpen) {
        closeDropdowns();
      }

    });

  }


  // ==========================================
  // 5. NAVBAR DROPDOWNS
  // Services + Projects
  // ==========================================

  dropdowns.forEach(function (dropdown) {

    const button = dropdown.querySelector(
      ".pc-dropdown-toggle"
    );

    if (!button) return;

    button.addEventListener("click", function (event) {

      event.preventDefault();
      event.stopPropagation();

      const willOpen = !dropdown.classList.contains("open");

      closeDropdowns(dropdown);

      dropdown.classList.toggle("open", willOpen);

      button.setAttribute(
        "aria-expanded",
        String(willOpen)
      );

    });

  });


  // ==========================================
  // 6. CLOSE MENU WHEN LINK IS CLICKED
  // ==========================================

  navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

      closeMobileMenu();

    });

  });


  // ==========================================
  // 7. CLOSE ON OUTSIDE CLICK
  // ==========================================

  document.addEventListener("click", function (event) {

    if (!event.target.closest(".pc-navigation")) {
      closeDropdowns();
    }

    if (
      navigation &&
      menuToggle &&
      !event.target.closest(".pc-header")
    ) {
      closeMobileMenu();
    }

  });


  // ==========================================
  // 8. CLOSE WITH ESCAPE KEY
  // ==========================================

  document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

      closeMobileMenu();

    }

  });


  // ==========================================
  // 9. FOOTER CURRENT YEAR
  // ==========================================

  if (footerYear) {

    footerYear.textContent = new Date().getFullYear();

  }


  // ==========================================
  // 10. SMOOTH SCROLL FOR SAME-PAGE LINKS
  // ==========================================

  document.querySelectorAll('a[href*="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

      const href = link.getAttribute("href");

      if (!href) return;

      const hashIndex = href.indexOf("#");

      if (hashIndex === -1) return;

      const hash = href.substring(hashIndex);

      if (hash.length <= 1) return;

      const target = document.getElementById(
        decodeURIComponent(hash.substring(1))
      );

      // Only scroll if the target exists on this page.
      if (target && hashIndex === 0) {

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        closeMobileMenu();

      }

    });

  });


  // ==========================================
  // 11. PREVENT MENU STATE ISSUES ON RESIZE
  // ==========================================

  window.addEventListener("resize", function () {

    if (window.innerWidth > 1050) {

      closeMobileMenu();

    }

  });


  // ==========================================
  // 12. ACCESSIBILITY DEFAULTS
  // ==========================================

  dropdowns.forEach(function (dropdown) {

    const button = dropdown.querySelector(
      ".pc-dropdown-toggle"
    );

    if (button && !button.hasAttribute("aria-expanded")) {

      button.setAttribute("aria-expanded", "false");

    }

  });

});
