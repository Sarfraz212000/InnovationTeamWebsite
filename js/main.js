/* ==========================================================
   Innovantage India Pvt Ltd - main script
   Features: mobile menu, active link, scroll reveal, back-to-top,
   tabs, contact form validation, EN/AR language toggle (RTL)
   ========================================================== */
(function () {
  "use strict";

  /* ---------- Translations (Arabic). English text lives in the HTML. ---------- */
  var AR = {
    "nav.home": "الرئيسية", "nav.values": "قيمنا", "nav.why": "لماذا تختارنا", "nav.partners": "الشركاء",
    "nav.services": "الخدمات", "nav.solutions": "الحلول", "nav.customers": "العملاء",
    "nav.careers": "الوظائف", "nav.contact": "اتصل بنا",
    "hero.title": "نحوّل المؤسسات بالذكاء الاصطناعي",
    "hero.sub": "نطلق الأفكار الجريئة ونحوّل التقليدي إلى حلول رائدة، ونقود التغيير في حلول الذكاء الاصطناعي والتقنية.",
    "cta.discovery": "احجز مكالمة استكشافية",
    "sol.title": "حيث يلتقي الابتكار بالتنفيذ", "sol.all": "جميع الحلول", "learn": "اعرف المزيد",
    "sol.dx": "التجربة الرقمية", "sol.ent": "حلول المؤسسات", "sol.api": "واجهات البرمجة والتكامل",
    "sol.bom": "مراقبة الأعمال والعمليات",
    "proj.title": "المشاريع المميزة",
    "tech.title": "التقنيات والقدرات", "tech.cloud": "المنصات السحابية ومنصات المؤسسات",
    "tech.ai": "تقنيات الذكاء الاصطناعي وتعلم الآلة", "tech.api": "تطوير واجهات البرمجة والمنظومة",
    "tech.org": "القدرات التنظيمية والمواهب",
    "svc.title": "نعمل جنباً إلى جنب لتحقيق رؤيتك", "svc.dt": "التحول الرقمي",
    "svc.data": "البيانات والذكاء الاصطناعي", "svc.app": "تطوير التطبيقات",
    "clients.title": "موثوقون من قادة الصناعة",
    "future.title": "نقود مستقبل الأعمال",
    "blog.title": "أفكار تشكّل الجيل القادم من المؤسسات", "read": "اقرأ المزيد",
    "cta.title": "احجز مكالمة معنا", "cta.btn": "تواصل معنا",
    "footer.company": "الشركة", "footer.services": "الخدمات", "footer.solutions": "الحلول",
    "footer.rights": "جميع الحقوق محفوظة.", "footer.privacy": "سياسة الخصوصية",
    "values.title": "قيمنا", "why.title": "لماذا تختارنا", "partners.title": "شركاؤنا",
    "services.title": "خدماتنا", "solutions.title": "حلولنا", "customers.title": "عملاؤنا",
    "careers.title": "الوظائف", "contact.title": "تواصل معنا", "privacy.title": "سياسة الخصوصية",
    "apply": "قدّم الآن",
    "form.name": "الاسم الكامل", "form.email": "البريد الإلكتروني", "form.phone": "رقم الهاتف (اختياري)",
    "form.message": "رسالتك", "form.send": "إرسال الرسالة",
    "form.ok": "شكراً لك! تم استلام رسالتك وسنتواصل معك قريباً.",
    "err.required": "هذا الحقل مطلوب", "err.email": "يرجى إدخال بريد إلكتروني صحيح",
    "err.short": "الرجاء كتابة 10 أحرف على الأقل"
  };
  var EN = {}; // filled automatically from the page on first load

  var root = document.documentElement;
  var currentLang = "en";

  function applyLang(lang) {
    currentLang = lang;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!(key in EN)) EN[key] = el.textContent;
      if (lang === "ar" && AR[key]) el.textContent = AR[key];
      else if (lang === "en" && EN[key] !== undefined) el.textContent = EN[key];
    });
    var btn = document.getElementById("langToggle");
    if (btn) btn.textContent = lang === "ar" ? "EN" : "عربي";
    try { localStorage.setItem("innovantage-lang", lang); } catch (e) {}
  }

  function t(key, fallback) {
    return currentLang === "ar" && AR[key] ? AR[key] : fallback;
  }

  /* ---------- Language toggle ---------- */
  var langBtn = document.getElementById("langToggle");
  if (langBtn) {
    langBtn.addEventListener("click", function () {
      applyLang(currentLang === "en" ? "ar" : "en");
    });
  }
  var saved = null;
  try { saved = localStorage.getItem("innovantage-lang"); } catch (e) {}
  // capture English text first, then switch if Arabic was saved
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    EN[el.getAttribute("data-i18n")] = el.textContent;
  });
  if (saved === "ar") applyLang("ar");

  /* ---------- Mobile menu ---------- */
  var hamburger = document.getElementById("hamburger");
  var nav = document.getElementById("nav");
  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      hamburger.classList.toggle("open", open);
      hamburger.setAttribute("aria-expanded", open);
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Highlight current page in nav ---------- */
  var page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(function (a) {
    if (a.getAttribute("href") === page) a.classList.add("active");
  });

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Back to top ---------- */
  var topBtn = document.getElementById("backToTop");
  if (topBtn) {
    window.addEventListener("scroll", function () {
      topBtn.classList.toggle("show", window.scrollY > 400);
    });
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Tabs (Technologies & Capabilities) ---------- */
  document.querySelectorAll(".tab-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = btn.getAttribute("data-tab");
      document.querySelectorAll(".tab-btn").forEach(function (b) { b.classList.remove("active"); });
      document.querySelectorAll(".tab-panel").forEach(function (p) { p.classList.remove("active"); });
      btn.classList.add("active");
      var panel = document.getElementById(target);
      if (panel) panel.classList.add("active");
    });
  });

  /* ---------- Counters (stats band) ---------- */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target, end = parseInt(el.getAttribute("data-count"), 10), suffix = el.getAttribute("data-suffix") || "";
        var start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / 1200, 1);
          el.textContent = Math.floor(p * end) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        co.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { co.observe(c); });
  }

  /* ---------- Contact form validation ---------- */
  var form = document.getElementById("contactForm");
  if (form) {
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setError(input, msg) {
      var group = input.closest(".form-group");
      group.classList.toggle("invalid", !!msg);
      group.querySelector(".error-msg").textContent = msg || "";
      return !msg;
    }

    function validateField(input) {
      var v = input.value.trim();
      if (input.name === "name") return setError(input, v ? "" : t("err.required", "This field is required"));
      if (input.name === "email") {
        if (!v) return setError(input, t("err.required", "This field is required"));
        return setError(input, emailRe.test(v) ? "" : t("err.email", "Please enter a valid email address"));
      }
      if (input.name === "message") {
        if (!v) return setError(input, t("err.required", "This field is required"));
        return setError(input, v.length >= 10 ? "" : t("err.short", "Please write at least 10 characters"));
      }
      return true;
    }

    form.querySelectorAll("input, textarea").forEach(function (input) {
      input.addEventListener("blur", function () { validateField(input); });
      input.addEventListener("input", function () {
        if (input.closest(".form-group").classList.contains("invalid")) validateField(input);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("input[name], textarea[name]").forEach(function (input) {
        if (!validateField(input)) ok = false;
      });
      var msg = document.getElementById("formSuccess");
      if (ok) {
        // Static site: no backend. Connect to a form service (Formspree, EmailJS, etc.) here.
        form.reset();
        msg.classList.add("show");
        setTimeout(function () { msg.classList.remove("show"); }, 6000);
      } else {
        msg.classList.remove("show");
      }
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll(".js-year").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
