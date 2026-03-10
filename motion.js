(() => {
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

    const placeholderBio = (member) => [
      `${member.name} serves as ${member.role} at 3650 Capital. A longer public biography is not currently available on the site.`
    ];

    const featuredNames = new Set([
      "Toby Cobb",
      "Justin Kennedy",
      "Jonathan Roth",
      "Peter LaPointe",
      "Malay Bansal",
      "Ken Dickey",
      "Andrew Parower",
      "Daniel Antonelli",
      "Michael Fleischer",
      "Mark Jefferis"
    ]);

    let activeButton = null;
    let lockedMember = null;

	    const renderStage = (member) => {
	      const bio = member.bio.length ? member.bio : placeholderBio(member);
	      const rosterCount = members.length;
	      stage.innerHTML = `
	        <figure class="leadership-stage-media">
	          <img src="${member.image}" alt="${member.name}" />
	        </figure>
	        <div class="leadership-stage-copy">
	          <p class="item-label">${member.role}</p>
	          <h3>${member.name}</h3>
	          <div class="leadership-stage-meta">
            <span class="leadership-pill ${member.bio.length ? "is-published" : ""}">
              ${member.bio.length ? "Published bio" : "Roster profile"}
            </span>
            ${lockedMember === member.name ? '<span class="leadership-pill is-active">Selected</span>' : ""}
            ${featuredNames.has(member.name) ? '<span class="leadership-pill">Platform lead</span>' : ""}
            <span class="leadership-pill">${rosterCount} total profiles</span>
          </div>
          <div class="leadership-stage-bio">
            ${bio.map((paragraph) => `<p>${paragraph}</p>`).join("")}
          </div>
        </div>
      `;

      stage.animate(
        [
          { opacity: 0.001, transform: "translate3d(0, 16px, 0)" },
          { opacity: 1, transform: "translate3d(0, 0, 0)" }
        ],
        { duration: 420, easing, fill: "both" }
      );
    };

    const cards = members.map((member, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "leadership-directory-card";
      button.innerHTML = `
        <span class="directory-photo">
          <img src="${member.image}" alt="${member.name}" />
        </span>
        <span class="directory-copy">
          <span class="item-label">${member.role}</span>
          <strong>${member.name}</strong>
          <span class="directory-note">${member.bio.length ? "View bio" : "Roster profile"}</span>
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

      button.addEventListener("click", () => activate({ lock: true }));
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
      frame.setAttribute(
        "src",
        `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`
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
      if (event.key === "Escape" && modal.classList.contains("is-open")) close();
    });
  }

  initVideoModal();

  const revealSelectors = [
    ".award-rail",
    ".hero-intro",
    ".hero-copy",
    ".hero-visual",
    ".hero-rail",
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
    ".leadership-photo-card"
  ];

  const revealTargets = [
    ...new Set([
      ...leadershipTargets,
      ...revealSelectors
        .flatMap((selector) => [...document.querySelectorAll(selector)])
        .filter((el) => el instanceof HTMLElement)
    ])
  ];

  let revealCount = 0;

  function animateElement(el, index = 0) {
    if (el.dataset.motionDone === "true") return;
    el.dataset.motionDone = "true";

    const delay = Math.min(index * 38, 360);
    el.animate(
      [
        { opacity: 0.001, transform: "translate3d(0, 28px, 0) scale(0.985)", filter: "blur(3px)" },
        { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)", filter: "blur(0)" }
      ],
      {
        duration: 880,
        delay,
        easing,
        fill: "both"
      }
    );
  }

  requestAnimationFrame(() => {
    document.body.classList.add("is-ready");
    document.body.classList.add("motion-ready");

    const introLines = [...document.querySelectorAll(".hero-title span")];
    introLines.forEach((line, index) => {
      line.animate(
        [
          { opacity: 0.001, transform: "translate3d(0, 42px, 0)" },
          { opacity: 1, transform: "translate3d(0, 0, 0)" }
        ],
        {
          duration: 1320,
          delay: 180 + index * 160,
          easing,
          fill: "both"
        }
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
    { rootMargin: "0px 0px -8% 0px", threshold: 0.14 }
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

    start();
  });
})();
