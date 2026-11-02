// متجري POS — تفاعلات الموقع (بلا أي مكتبات)
(function () {
  "use strict";

  // ظل الترويسة عند التمرير
  var header = document.querySelector(".site-header");
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // قائمة الجوال
  var navToggle = document.querySelector(".nav-toggle");
  var mobileNav = document.querySelector(".mobile-nav");
  function closeMobileNav() {
    mobileNav.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "فتح قائمة الأقسام");
  }
  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      navToggle.setAttribute("aria-label", isOpen ? "إغلاق قائمة الأقسام" : "فتح قائمة الأقسام");
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMobileNav);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileNav.classList.contains("open")) {
        closeMobileNav();
        navToggle.focus();
      }
    });
  }

  // الظهور التدريجي عند التمرير — كشف مبكر (هامش سفلي موجب) حتى لا يسبق التمريرُ الظهور
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0, rootMargin: "0px 0px 18% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }
  // التهيئة نجحت — لا حاجة لشبكة أمان الإظهار القسري
  if (window.__revealSafety) {
    clearTimeout(window.__revealSafety);
    window.__revealSafety = null;
  }

  // أكورديون الأسئلة الشائعة
  document.querySelectorAll(".acc-item").forEach(function (item) {
    var btn = item.querySelector(".acc-btn");
    var panel = item.querySelector(".acc-panel");
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".acc-item.open").forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".acc-panel").style.maxHeight = null;
        other.querySelector(".acc-btn").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
})();
