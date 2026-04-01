(() => {
  // Phase 7: wpautop DOM cleanup — remove stray empty <p> and <br> from grid containers
  document.querySelectorAll('.page-frame p:empty').forEach(p => p.remove());
  document.querySelectorAll('.page-frame > br, .site-header > br, .hero-grid > br, .sub-grid > br, .metrics-grid > br, .site-footer-grid > br').forEach(br => br.remove());

  // Phase 8: Font-ready fade-in
  const pageFrame = document.querySelector('.page-frame');
  if (pageFrame) {
    document.fonts.ready.then(() => pageFrame.classList.add('fonts-ready'));
  }

  // Mobile nav toggle
  const navToggle = document.querySelector(".nav-toggle");
  const header = document.querySelector(".site-header");
  const nav = document.getElementById("primary-nav");
  if (navToggle && header && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.classList.toggle("nav-lock", isOpen);
    });
    // Close nav when a link is clicked on mobile
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 720) {
          header.classList.remove("nav-open");
          navToggle.setAttribute("aria-expanded", "false");
          document.body.classList.remove("nav-lock");
        }
      });
    });
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    document.documentElement.classList.add("reduce-motion");
    return;
  }

  const easing = "cubic-bezier(0.22, 1, 0.36, 1)";
  document.documentElement.classList.add("motion-enabled");
  document.body.classList.add("has-motion");

  function initLeadershipExplorer() {
    const members = window.LEADERSHIP_MEMBERS;
    const stage = document.getElementById("leadership-stage");
    const grid = document.getElementById("leadership-directory-grid");
    if (!Array.isArray(members) || !stage || !grid) return [];

    const placeholderBio = (member) => [`${member.name} serves as ${member.role} at 3650 Capital.`];

    let activeButton = null;
    let lockedMember = null;

    const renderStage = (member) => {
      const bio = member.bio.length ? member.bio : placeholderBio(member);
      stage.innerHTML = `
        <figure class="leadership-stage-media">
          <img src="${member.image}" alt="${member.name}" loading="lazy" />
        </figure>
        <div class="leadership-stage-copy">
          <p class="item-label">${member.role}</p>
          <h3>${member.name}</h3>
          <div class="leadership-stage-bio">
            ${bio.map((paragraph) => `<p>${paragraph}</p>`).join("")}
          </div>
        </div>
      `;

      const stageMedia = stage.querySelector(".leadership-stage-media");
      const stageRole = stage.querySelector(".item-label");
      const stageName = stage.querySelector("h3");
      const stageBio = stage.querySelector(".leadership-stage-bio");

      stage.animate(
        [
          { opacity: 0.001, transform: "translate3d(0, 16px, 0)" },
          { opacity: 1, transform: "translate3d(0, 0, 0)" }
        ],
        { duration: 420, easing, fill: "both" }
      );

      stageMedia?.animate(
        [
          { opacity: 0.001, transform: "translate3d(0, 20px, 0) scale(0.985)" },
          { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" }
        ],
        { duration: 520, easing, fill: "both" }
      );

      stageRole?.animate(
        [
          { opacity: 0.001, transform: "translate3d(-18px, 0, 0)" },
          { opacity: 1, transform: "translate3d(0, 0, 0)" }
        ],
        { duration: 520, delay: 80, easing, fill: "both" }
      );

      stageName?.animate(
        [
          { opacity: 0.001, transform: "translate3d(-26px, 0, 0)" },
          { opacity: 1, transform: "translate3d(0, 0, 0)" }
        ],
        { duration: 620, delay: 120, easing, fill: "both" }
      );

      stageBio?.animate(
        [
          { opacity: 0.001, transform: "translate3d(0, 18px, 0)" },
          { opacity: 1, transform: "translate3d(0, 0, 0)" }
        ],
        { duration: 560, delay: 180, easing, fill: "both" }
      );
    };

    const cards = members.map((member, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "leadership-directory-card";
      button.innerHTML = `
        <span class="directory-photo">
          <img src="${member.image}" alt="${member.name}" loading="lazy" />
        </span>
        <span class="directory-copy">
          <span class="item-label">${member.role}</span>
          <strong>${member.name}</strong>
        </span>
      `;

      const activate = ({ lock = false } = {}) => {
        if (!lock && lockedMember && lockedMember !== member.name) return;
        if (lock) lockedMember = member.name;
        activeButton?.classList.remove("is-active");
        activeButton?.classList.remove("is-locked");
        activeButton = button;
        activeButton.classList.add("is-active");
        if (lockedMember === member.name) {
          activeButton.classList.add("is-locked");
        }
        renderStage(member);
      };

      button.addEventListener("click", () => {
        activate({ lock: true });
        // Scroll bio panel into view when clicking a member deep in the roster
        const stageRect = stage.getBoundingClientRect();
        if (stageRect.top < 0 || stageRect.bottom > window.innerHeight) {
          stage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      button.addEventListener("focus", () => activate());
      if (window.matchMedia("(hover: hover)").matches) {
        button.addEventListener("mouseenter", () => activate());
      }

      if (member.name === "Toby Cobb" || (!activeButton && index === 0)) {
        activeButton = button;
        button.classList.add("is-active");
        renderStage(member);
      }

      grid.appendChild(button);
      return button;
    });

    return [stage, ...cards];
  }

  const leadershipTargets = initLeadershipExplorer();

  function initVideoModal() {
    const modal = document.querySelector(".video-modal");
    const frame = modal?.querySelector("[data-video-embed]");
    const openers = [...document.querySelectorAll("[data-video-open]")];
    const closers = [...document.querySelectorAll("[data-video-close]")];
    if (!modal || !frame || !openers.length) return;

    let lastTrigger = null;

    const close = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("video-modal-open");
      frame.setAttribute("src", "");
      lastTrigger?.focus();
    };

    const open = (trigger) => {
      const videoId = trigger.getAttribute("data-video-id");
      if (!videoId) return;
      lastTrigger = trigger;
      const videoHash = trigger.getAttribute("data-video-hash");
      const hashParam = videoHash ? `&h=${videoHash}` : "";
      frame.setAttribute(
        "src",
        `https://player.vimeo.com/video/${videoId}?autoplay=1${hashParam}&title=0&byline=0&portrait=0&dnt=1`
      );
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("video-modal-open");
    };

    openers.forEach((opener) => {
      opener.addEventListener("click", () => open(opener));
    });

    closers.forEach((closer) => {
      closer.addEventListener("click", close);
    });

    window.addEventListener("keydown", (event) => {
      if (!modal.classList.contains("is-open")) return;
      if (event.key === "Escape") { close(); return; }
      if (event.key === "Tab") {
        const focusable = modal.querySelectorAll('button, [href], iframe, [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
  }

  initVideoModal();

  function initTransactionDetails() {
    const tiles = [...document.querySelectorAll(".transaction-tile")];
    if (!tiles.length) return;

    tiles.forEach((tile) => {
      const toggle = tile.querySelector(".transaction-detail-toggle");
      const panel = tile.querySelector(".transaction-detail-panel");
      if (!toggle || !panel) return;

      const setOpen = (next) => {
        tile.classList.toggle("is-open", next);
        panel.setAttribute("aria-hidden", next ? "false" : "true");
        toggle.setAttribute("aria-expanded", next ? "true" : "false");
      };

      toggle.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const next = !tile.classList.contains("is-open");
        tiles.forEach((other) => {
          if (other !== tile) {
            other.classList.remove("is-open");
            other.querySelector(".transaction-detail-panel")?.setAttribute("aria-hidden", "true");
          }
        });
        setOpen(next);
      });

      tile.addEventListener("mouseleave", () => {
        if (!tile.matches(".is-open")) setOpen(false);
      });
    });

    document.addEventListener("click", (event) => {
      if (event.target.closest(".transaction-tile")) return;
      tiles.forEach((tile) => {
        tile.classList.remove("is-open");
        tile.querySelector(".transaction-detail-panel")?.setAttribute("aria-hidden", "true");
      });
    });
  }

  initTransactionDetails();

  // Contact form validation
  const form = document.getElementById("inquiry-form");
  const formSuccess = document.getElementById("form-success");
  if (form && formSuccess) {
    const showError = (input, label) => {
      input.classList.add("is-invalid");
      label.classList.add("has-error");
      let err = label.querySelector(".field-error");
      if (!err) {
        err = document.createElement("span");
        err.className = "field-error";
        err.setAttribute("role", "alert");
        label.appendChild(err);
      }
      err.textContent = input.type === "email"
        ? "Please enter a valid email address."
        : "This field is required.";
    };

    const clearError = (input, label) => {
      input.classList.remove("is-invalid");
      label.classList.remove("has-error");
      label.querySelector(".field-error")?.remove();
    };

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let valid = true;

      form.querySelectorAll("[required]").forEach((input) => {
        const label = input.closest("label");
        const empty = !input.value.trim();
        const badEmail = input.type === "email" && input.value && !input.value.includes("@");
        if (empty || badEmail) {
          showError(input, label);
          valid = false;
        } else {
          clearError(input, label);
        }
      });

      if (valid) {
        const btn = form.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; btn.textContent = "Sending\u2026"; }
        fetch("https://api.web3forms.com/submit", { method: "POST", body: new FormData(form) })
          .then((r) => r.json())
          .then((json) => {
            if (json.success) {
              form.style.display = "none";
              formSuccess.classList.add("is-visible");
              formSuccess.scrollIntoView({ behavior: "smooth", block: "nearest" });
            } else {
              if (btn) { btn.disabled = false; btn.textContent = "Submit inquiry"; }
            }
          })
          .catch(() => {
            if (btn) { btn.disabled = false; btn.textContent = "Submit inquiry"; }
          });
      }
    });

    form.querySelectorAll("[required]").forEach((input) => {
      input.addEventListener("input", () => {
        const label = input.closest("label");
        if (input.value.trim()) clearError(input, label);
      });
    });
  }

  const revealSelectors = [
    ".award-rail",
    ".hero-intro",
    ".hero-copy",
    ".hero-visual",
    ".hero-rail",
    ".name-origin-lead > *",
    ".name-origin-copy",
    ".statement-lead",
    ".statement-grid article",
    ".feature-copy > *",
    ".feature-media",
    ".proof-head",
    ".proof-case",
    ".proof-columns article",
    ".system-head > *",
    ".system-grid article",
    ".news-head > *",
    ".news-item",
    ".site-footnote p",
    ".sub-hero-copy > *",
    ".sub-hero-media",
    ".sub-band > :first-child > *",
    ".sub-grid > *",
    ".sub-grid-3 > *",
    ".metrics-grid > *",
    ".office-card",
    ".inquiry-form",
    ".leadership-photo-card",
    ".why-pillar",
    ".firm-stat",
    ".solutions-compare-col",
    ".why-section-head > *",
    ".solutions-compare-head > *"
  ];

  const revealTargets = [
    ...new Set([
      ...leadershipTargets,
      ...revealSelectors
        .flatMap((selector) => [...document.querySelectorAll(selector)])
        .filter((el) => el instanceof HTMLElement)
    ])
  ];

  // Per-grid stagger: assign data-stagger-index per child within each grid parent
  document.querySelectorAll(
    ".sub-grid, .sub-grid-3, .metrics-grid, .metrics-grid-wide, .founder-strip, " +
    ".sub-grid-ethos, .sub-grid-solutions, .sub-grid-leadership, .sub-grid-leadership-wide, " +
    ".leadership-directory-grid, .contact-directory-grid, .sub-band, " +
    ".why-pillars, .firm-stats-band, .solutions-compare-grid"
  ).forEach((grid) => {
    [...grid.children].forEach((child, i) => {
      child.dataset.staggerIndex = String(i);
    });
  });

  // Clip-path wipe targets — applied to image-frame containers, not to imgs
  const clipPathClasses = new Set([
    "sub-hero-media", "feature-media", "leadership-photo-card",
    "case-image", "metric-photo", "office-photo"
  ]);

  function animateElement(el, fallbackIndex = 0) {
    if (el.dataset.motionDone === "true") return;
    el.dataset.motionDone = "true";

    const idx = el.dataset.staggerIndex !== undefined
      ? Number(el.dataset.staggerIndex)
      : fallbackIndex;
    const delay = Math.min(idx * 80, 280);

    const isClipTarget = [...clipPathClasses].some((cls) => el.classList.contains(cls));

    if (isClipTarget) {
      el.animate(
        [
          { clipPath: "inset(0 100% 0 0)", opacity: 0.001 },
          { clipPath: "inset(0 0% 0 0)", opacity: 1 }
        ],
        { duration: 640, delay, easing, fill: "both" }
      );
      return;
    }

    el.animate(
      [
        { opacity: 0.001, transform: "translate3d(0, 20px, 0)" },
        { opacity: 1, transform: "translate3d(0, 0, 0)" }
      ],
      {
        duration: 620,
        delay,
        easing,
        fill: "both"
      }
    );
  }

  let revealCount = 0;

  requestAnimationFrame(() => {
    document.body.classList.add("is-ready");
    document.body.classList.add("motion-ready");

    const introLines = [...document.querySelectorAll(".hero-title span")];
    let wordIdx = 0;
    introLines.forEach((line) => {
      const words = line.textContent.trim().split(/\s+/);
      line.textContent = "";
      words.forEach((word) => {
        const span = document.createElement("span");
        span.className = "hero-word";
        span.textContent = word;
        line.appendChild(span);
        line.appendChild(document.createTextNode(" "));
      });
    });
    document.querySelectorAll(".hero-title .hero-word").forEach((wordEl) => {
      wordEl.animate(
        [
          { clipPath: "inset(0 0 0 100%)" },
          { clipPath: "inset(0 0 0 0%)" }
        ],
        { duration: 880, delay: 180 + wordIdx++ * 80, easing, fill: "both" }
      );
    });

    const firstPass = revealTargets.filter((el) => el.getBoundingClientRect().top < window.innerHeight * 1.08);
    firstPass.forEach((el) => animateElement(el, revealCount++));
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateElement(entry.target, revealCount++);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -60px 0px", threshold: 0.14 }
  );

  revealTargets
    .filter((el) => el.dataset.motionDone !== "true")
    .forEach((el) => observer.observe(el));

  const mediaFrames = [
    ...document.querySelectorAll(
      ".hero-visual, .sub-hero-media, .feature-media, .case-image, .leadership-photo-card, .leadership-stage-media"
    )
  ];

  mediaFrames.forEach((frame) => {
    const media = frame.querySelector("img");
    if (!media) return;

    frame.addEventListener("pointermove", (event) => {
      const rect = frame.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      frame.style.setProperty("--mx", `${px * -12}px`);
      frame.style.setProperty("--my", `${py * -10}px`);
      frame.style.setProperty("--media-scale", "1.04");
    });

    frame.addEventListener("pointerleave", () => {
      frame.style.setProperty("--mx", "0px");
      frame.style.setProperty("--my", "0px");
      frame.style.setProperty("--media-scale", "1");
    });
  });

  const sliders = [...document.querySelectorAll("[data-slider]")];
  sliders.forEach((slider) => {
    const slides = [...slider.querySelectorAll(".transaction-slide")];
    const dots = [...slider.querySelectorAll(".transaction-slider-nav span")];
    if (slides.length < 2) return;

    let index = slides.findIndex((slide) => slide.classList.contains("is-active"));
    if (index < 0) index = 0;
    const interval = Number(slider.getAttribute("data-interval") || 4200);
    let timer;

    const setActive = (next) => {
      index = (next + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === index);
      });
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === index);
      });
    };

    const start = () => {
      timer = window.setInterval(() => setActive(index + 1), interval);
    };

    const stop = () => {
      window.clearInterval(timer);
    };

    slider.addEventListener("pointerenter", stop);
    slider.addEventListener("pointerleave", () => {
      stop();
      start();
    });

    dots.forEach((dot, dotIndex) => {
      dot.setAttribute("role", "button");
      dot.setAttribute("tabindex", "0");
      dot.setAttribute("aria-label", `Show transaction slide ${dotIndex + 1}`);
      dot.addEventListener("click", () => {
        stop();
        setActive(dotIndex);
        start();
      });
      dot.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        stop();
        setActive(dotIndex);
        start();
      });
    });

    start();
  });

  // === SCROLL PROGRESS BAR ===
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  const progressFill = document.createElement("div");
  progressFill.className = "scroll-progress-fill";
  progressBar.appendChild(progressFill);
  document.body.insertBefore(progressBar, document.body.firstChild);

  // === SCROLL-DRIVEN: progress + header compact + hero parallax ===
  const heroVisualFrame = document.querySelector(".hero-visual");
  let rafPending = false;

  const handleScroll = () => {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      progressFill.style.transform = `scaleX(${Math.min(progress, 1)})`;

      if (header) header.classList.toggle("is-scrolled", scrollTop > 80);

      if (heroVisualFrame) {
        const parallax = Math.min(scrollTop * 0.25, 90);
        heroVisualFrame.style.setProperty("--hero-parallax", `${parallax}px`);
      }

      rafPending = false;
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  // === CARD SPOTLIGHT + 3D TILT ===
  if (window.matchMedia("(hover: hover)").matches) {
    const spotlightCards = [
      ...document.querySelectorAll(
        ".sub-card, .metric-card, .founder-card, .office-card, .leadership-directory-card, .why-pillar, .firm-stat, .solutions-compare-col"
      )
    ];
    const tiltCards = new Set(document.querySelectorAll(".sub-card, .metric-card, .founder-card, .office-card"));
    spotlightCards.forEach((card) => {
      const shouldTilt = tiltCards.has(card);
      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--spotlight-x", `${x}%`);
        card.style.setProperty("--spotlight-y", `${y}%`);
        if (shouldTilt) {
          const rx = ((y - 50) / 50) * -5;
          const ry = ((x - 50) / 50) * 5;
          card.style.setProperty("--tilt-rx", `${rx}deg`);
          card.style.setProperty("--tilt-ry", `${ry}deg`);
        }
      });
      if (shouldTilt) {
        card.addEventListener("pointerleave", () => {
          card.style.setProperty("--tilt-rx", "0deg");
          card.style.setProperty("--tilt-ry", "0deg");
        });
      }
    });
  }

  // === NUMBER COUNTERS ===
  function initCounters() {
    const DURATION = 1600;
    const ease = (t) => 1 - Math.pow(1 - t, 3);

    document.querySelectorAll(".tag-strip li, .transaction-stage-meta strong, .metric-card h3").forEach((el) => {
      const raw = el.textContent.trim();
      // Match: $16.3 billion, 1,300+ properties, $11.5 billion, $49.3M, etc.
      const m = raw.match(/^(\$?)([\d,]+\.?\d*)\s*(\+?)(.*)$/);
      if (!m) return;
      const [, prefix, numStr, plus, textSuffix] = m;
      const target = parseFloat(numStr.replace(/,/g, ""));
      if (!target || target < 2) return;
      const hasDecimal = numStr.includes(".");
      const decimals = hasDecimal ? (numStr.split(".")[1] || "").length : 0;
      el.dataset.counterTo = String(target);
      el.dataset.counterPrefix = prefix;
      el.dataset.counterSuffix = plus + (textSuffix ? " " + textSuffix.trim() : "");
      el.dataset.counterDecimals = String(decimals);
      el.dataset.counterCommas = numStr.includes(",") ? "1" : "";
    });

    const run = (el) => {
      const to = Number(el.dataset.counterTo);
      const prefix = el.dataset.counterPrefix || "";
      const suffix = el.dataset.counterSuffix || "";
      const decimals = Number(el.dataset.counterDecimals || 0);
      const useCommas = el.dataset.counterCommas === "1";
      const start = performance.now();
      const step = (now) => {
        const t = Math.min((now - start) / DURATION, 1);
        let val = to * ease(t);
        let display;
        if (decimals > 0) {
          display = val.toFixed(decimals);
        } else {
          display = Math.round(val).toString();
        }
        if (useCommas) {
          const parts = display.split(".");
          parts[0] = Number(parts[0]).toLocaleString();
          display = parts.join(".");
        }
        el.textContent = `${prefix}${display}${suffix}`;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const counterObs = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (!isIntersecting || target.dataset.counterDone === "true") return;
          target.dataset.counterDone = "true";
          run(target);
          counterObs.unobserve(target);
        });
      },
      { threshold: 0.6 }
    );

    document.querySelectorAll("[data-counter-to]").forEach((el) => counterObs.observe(el));
  }

  // ----- Deal map (Leaflet) -------------------------------------------
  function initDealMap() {
    const el = document.getElementById("deal-map");
    if (!el || typeof L === "undefined") return;

    const map = L.map(el, {
      center: [36.5, -96.5],
      zoom: 4,
      scrollWheelZoom: false,
      attributionControl: true,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '\u00a9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors \u00a9 <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    const txIcon = L.divIcon({
      className: "map-pin-tx",
      html: "<span></span>",
      iconSize: [12, 12],
      iconAnchor: [6, 6],
      popupAnchor: [0, -9],
    });

    const officeIcon = L.divIcon({
      className: "map-pin-office",
      html: "<span></span>",
      iconSize: [14, 14],
      iconAnchor: [7, 7],
      popupAnchor: [0, -11],
    });

    const popupOpts = { maxWidth: 220, className: "map-popup" };

    [
      [25.99, -80.17, "Oasis at Dania Pointe", "$64.3M senior construction loan"],
      [25.80, -80.20, "Gateway at Wynwood", "$79.0M senior construction loan"],
      [30.27, -97.74, "48 East \u2014 Austin", "$90.9M senior construction loan"],
      [47.25, -122.44, "Tacoma Marriott", "$82.0M senior construction loan"],
      [33.02, -96.70, "Renaissance Dallas at Plano Legacy West", "$90.0M senior loan"],
      [41.66, -83.56, "ICP/IRG Portfolio", "$180.0M senior loan \u2014 Ohio &amp; Michigan"],
      [25.95, -80.14, "Aventura Self Storage", "$23.0M senior loan"],
      [40.74, -74.03, "Waterfront Corporate Center I", "$30.0M preferred equity \u2014 Hoboken, NJ"],
      [35.23, -80.84, "Transcoastal Portfolio", "$89.0M preferred equity \u2014 21 Sunbelt assets"],
      [25.94, -80.25, "Center at Miami Gardens", "$49.3M senior construction loan"],
    ].forEach(([lat, lng, name, detail]) => {
      L.marker([lat, lng], { icon: txIcon })
        .addTo(map)
        .bindPopup(`<strong>${name}</strong><br><span>${detail}</span>`, popupOpts);
    });

    [
      [25.74, -80.21, "Miami", "2977 McFarlane Road, Suite 300"],
      [40.76, -73.97, "New York", "410 Park Avenue, Suite 720"],
      [34.07, -118.40, "Los Angeles", "9595 Wilshire Blvd, Suite 611"],
      [32.81, -96.81, "Dallas", "4143 Maple Ave, Suite 220"],
      [33.85, -84.37, "Atlanta", "3050 Peachtree Road NW, Suite 320"],
    ].forEach(([lat, lng, city, address]) => {
      L.marker([lat, lng], { icon: officeIcon })
        .addTo(map)
        .bindPopup(`<strong>3650 Capital \u2014 ${city}</strong><br><span>${address}</span>`, popupOpts);
    });
  }

  // === CURSOR DOT ===
  function initCursor() {
    if (window.matchMedia("(hover: none)").matches || window.matchMedia("(pointer: coarse)").matches) return;
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    document.body.appendChild(dot);
    let mouseX = 0, mouseY = 0, dotX = 0, dotY = 0, visible = false;
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) { visible = true; dot.classList.add("is-visible"); }
    });
    document.addEventListener("mouseleave", () => { visible = false; dot.classList.remove("is-visible"); });
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", () => dot.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => dot.classList.remove("is-hover"));
    });
    (function loop() {
      dotX += (mouseX - dotX) * 0.16;
      dotY += (mouseY - dotY) * 0.16;
      dot.style.left = dotX + "px";
      dot.style.top = dotY + "px";
      requestAnimationFrame(loop);
    })();
  }

  // === SCROLL PROGRESS BAR ===
  function initScrollProgress() {
    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.prepend(bar);
    window.addEventListener("scroll", () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = total > 0 ? (window.scrollY / total * 100) + "%" : "0%";
    }, { passive: true });
  }

  // === SCROLL REVEAL ===
  function initScrollReveal() {
    const sel = '.sub-card, .metric-card, .why-pillar, .legal-section, .founder-card, .transaction-tile, .office-card, .news-item, .section-stack-head, .statement-lead, .news-feature, .proof-case, .metrics-band-item, .firm-stat, .page-cta';
    const targets = Array.from(document.querySelectorAll(sel));
    if (!targets.length) return;
    const seen = new Map();
    targets.forEach(el => {
      const key = el.parentElement;
      const idx = seen.get(key) || 0;
      seen.set(key, idx + 1);
      el.style.setProperty('--reveal-delay', (idx * 55) + 'ms');
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -48px 0px', threshold: 0.07 });
    targets.forEach(el => {
      const rect = el.getBoundingClientRect();
      el.classList.add('reveal');
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-visible');
      } else {
        observer.observe(el);
      }
    });
  }

  // === SMOOTH ANCHORS ===
  function initSmoothAnchors() {
    const header = document.querySelector('.site-header');
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const id = anchor.getAttribute('href').slice(1);
        if (!id) return;
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        const offset = (header?.offsetHeight || 0) + 20;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      });
    });
  }

  // === PRESS MARQUEE ===
  function initPressMarquee() {
    const container = document.querySelector('.press-names');
    if (!container) return;
    const items = Array.from(container.children);
    if (items.length < 2) return;
    const inner = document.createElement('div');
    inner.className = 'press-names-inner';
    items.forEach(item => inner.appendChild(item));
    items.forEach(item => inner.appendChild(item.cloneNode(true)));
    container.appendChild(inner);
  }

  // === DARK / LIGHT THEME TOGGLE ===
  function initThemeToggle() {
    const saved = localStorage.getItem("3650-theme");
    if (saved === "dark") document.documentElement.setAttribute("data-theme", "dark");

    const btn = document.createElement("button");
    btn.className = "theme-toggle";
    btn.type = "button";
    btn.setAttribute("aria-label", "Toggle dark mode");

    // Build SVG icons using DOM methods (no innerHTML)
    const sunSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    sunSvg.setAttribute("class", "theme-icon-sun");
    sunSvg.setAttribute("width", "16");
    sunSvg.setAttribute("height", "16");
    sunSvg.setAttribute("viewBox", "0 0 24 24");
    sunSvg.setAttribute("fill", "none");
    sunSvg.setAttribute("stroke", "currentColor");
    sunSvg.setAttribute("stroke-width", "2");
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "12"); circle.setAttribute("cy", "12"); circle.setAttribute("r", "5");
    sunSvg.appendChild(circle);
    [[12,1,12,3],[12,21,12,23],[4.22,4.22,5.64,5.64],[18.36,18.36,19.78,19.78],[1,12,3,12],[21,12,23,12],[4.22,19.78,5.64,18.36],[18.36,5.64,19.78,4.22]].forEach(([x1,y1,x2,y2]) => {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", x1); line.setAttribute("y1", y1);
      line.setAttribute("x2", x2); line.setAttribute("y2", y2);
      sunSvg.appendChild(line);
    });

    const moonSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    moonSvg.setAttribute("class", "theme-icon-moon");
    moonSvg.setAttribute("width", "16");
    moonSvg.setAttribute("height", "16");
    moonSvg.setAttribute("viewBox", "0 0 24 24");
    moonSvg.setAttribute("fill", "none");
    moonSvg.setAttribute("stroke", "currentColor");
    moonSvg.setAttribute("stroke-width", "2");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z");
    moonSvg.appendChild(path);

    btn.appendChild(sunSvg);
    btn.appendChild(moonSvg);

    const header = document.querySelector(".site-header");
    if (header) header.appendChild(btn);

    btn.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      if (isDark) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("3650-theme", "light");
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("3650-theme", "dark");
      }
    });
  }

  // === SMOOTH TRANSACTION ACCORDION ===
  function initSmoothAccordion() {
    document.querySelectorAll(".transaction-detail-panel").forEach((panel) => {
      panel.style.setProperty("--panel-height", panel.scrollHeight + "px");
    });
  }

  // Heading reveals handled by initScrollReveal — no separate animation needed

  // === HERO KICKER TYPEWRITER ===
  function initKickerTypewriter() {
    const kicker = document.querySelector('.hero-intro .section-kicker');
    if (!kicker) return;
    const text = kicker.textContent;
    kicker.textContent = '';
    kicker.style.borderRight = '2px solid var(--accent)';
    let i = 0;
    const type = () => {
      if (i < text.length) {
        kicker.textContent += text[i++];
        setTimeout(type, 35 + Math.random() * 25);
      } else {
        setTimeout(() => { kicker.style.borderRight = 'none'; }, 800);
      }
    };
    setTimeout(type, 600);
  }

  // === SCROLL PARALLAX ON SECTION IMAGES ===
  function initSectionParallax() {
    const images = document.querySelectorAll('.sub-hero-media img, .case-image img, .statement-media img, .news-feature figure img');
    if (!images.length) return;

    const update = () => {
      images.forEach(img => {
        const rect = img.getBoundingClientRect();
        const vh = window.innerHeight;
        if (rect.bottom < 0 || rect.top > vh) return;
        const progress = (rect.top + rect.height / 2) / vh;
        const shift = (progress - 0.5) * 30;
        img.style.transform = `translate3d(0, ${shift}px, 0) scale(1.08)`;
      });
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  // === NEWS CAROUSEL WITH ARROWS ===
  function initNewsCarousel() {
    const list = document.querySelector('.news-list');
    if (!list) return;
    const items = [...list.querySelectorAll('.news-item')];
    if (items.length <= 4) return;

    const pageSize = 4;
    let page = 0;
    const totalPages = Math.ceil(items.length / pageSize);

    const navWrap = document.createElement('div');
    navWrap.className = 'news-nav';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'news-nav-btn news-nav-prev';
    prevBtn.type = 'button';
    prevBtn.setAttribute('aria-label', 'Previous news');
    prevBtn.textContent = '\u2190';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'news-nav-btn news-nav-next';
    nextBtn.type = 'button';
    nextBtn.setAttribute('aria-label', 'Next news');
    nextBtn.textContent = '\u2192';

    const pageIndicator = document.createElement('span');
    pageIndicator.className = 'news-nav-indicator';

    navWrap.appendChild(prevBtn);
    navWrap.appendChild(pageIndicator);
    navWrap.appendChild(nextBtn);
    list.parentElement.insertBefore(navWrap, list.nextSibling);

    const showPage = (p) => {
      page = ((p % totalPages) + totalPages) % totalPages;
      const start = page * pageSize;
      items.forEach((item, i) => {
        if (i >= start && i < start + pageSize) {
          item.style.display = '';
          item.animate(
            [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }],
            { duration: 350, easing, fill: 'both', delay: (i - start) * 60 }
          );
        } else {
          item.style.display = 'none';
        }
      });
      pageIndicator.textContent = `${page + 1} / ${totalPages}`;
      prevBtn.disabled = page === 0;
      nextBtn.disabled = page === totalPages - 1;
    };

    prevBtn.addEventListener('click', () => showPage(page - 1));
    nextBtn.addEventListener('click', () => showPage(page + 1));
    showPage(0);
  }

  initCursor();
  initScrollProgress();
  initScrollReveal();
  initDealMap();
  initCounters();
  initSmoothAnchors();
  initPressMarquee();
  initThemeToggle();
  initSmoothAccordion();
  initKickerTypewriter();
  initSectionParallax();
  initNewsCarousel();
})();
