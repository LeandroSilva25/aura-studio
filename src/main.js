const q = (sel, el = document) => el.querySelector(sel);
const qa = (sel, el = document) => Array.from(el.querySelectorAll(sel));

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function setYear() {
  const el = q("#year");
  if (!el) return;
  el.textContent = String(new Date().getFullYear());
}

function stickyHeader() {
  const header = q(".site-header");
  if (!header) return;

  const onScroll = () => {
    header.dataset.stuck = window.scrollY > 8 ? "true" : "false";
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function mobileNav() {
  const btn = q(".nav-toggle");
  const menu = q("#nav-menu");
  if (!btn || !menu) return;

  const setOpen = (open) => {
    btn.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
    btn.querySelector(".sr-only").textContent = open ? "Fechar menu" : "Abrir menu";
  };

  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") !== "true";
    setOpen(open);
  });

  qa("a", menu).forEach((a) => {
    a.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("is-open")) return;
    const t = e.target;
    if (t instanceof HTMLElement && (menu.contains(t) || btn.contains(t))) return;
    setOpen(false);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    setOpen(false);
  });
}

function revealOnScroll() {
  const items = qa(".reveal");
  if (items.length === 0) return;
  if (prefersReducedMotion()) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.14, rootMargin: "80px 0px -40px 0px" }
  );

  items.forEach((el) => io.observe(el));
}

function lazyImages() {
  const imgs = qa("img[data-src]");
  if (imgs.length === 0) return;

  const load = (img) => {
    const src = img.getAttribute("data-src");
    if (!src) return;
    img.src = src;
    img.removeAttribute("data-src");
  };

  if ("loading" in HTMLImageElement.prototype) {
    imgs.forEach(load);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const img = entry.target;
        if (img instanceof HTMLImageElement) load(img);
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.01, rootMargin: "400px 0px" }
  );

  imgs.forEach((img) => io.observe(img));
}

function videoPolicies() {
  if (!prefersReducedMotion()) return;
  qa("video").forEach((v) => {
    try {
      v.pause();
      v.removeAttribute("autoplay");
      v.controls = true;
    } catch {
      // no-op
    }
  });
}

function primeVideos() {
  const vids = qa("video");
  if (vids.length === 0) return;

  const prime = (v) => {
    try {
      v.muted = true;
      v.playsInline = true;
      v.preload = "auto";
      v.load();
    } catch {
      // no-op
    }

    // Tenta decodificar 1 frame para evitar "tela preta".
    try {
      v.currentTime = Math.min(0.08, Math.max(0.001, v.currentTime || 0.001));
      const p = v.play();
      if (p && typeof p.then === "function") {
        p.then(() => {
          // Vídeos de background (autoplay + loop) devem continuar rodando.
          const keepPlaying = v.hasAttribute("autoplay") && v.hasAttribute("loop");
          if (!keepPlaying) v.pause();
        }).catch(() => {});
      }
    } catch {
      // no-op
    }
  };

  vids.forEach((v) => {
    // O vídeo scrub é controlado por ScrollTrigger; não devemos "primar" ele aqui.
    if (v.hasAttribute("data-scroll-video")) return;
    // Prime rápido quando metadados estiverem prontos.
    v.addEventListener("loadedmetadata", () => prime(v), { once: true });
    if (v.readyState >= 1) prime(v);

    // Se o browser bloquear o play inicial, tenta novamente no primeiro gesto.
    const onFirstGesture = () => {
      prime(v);
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
      window.removeEventListener("touchstart", onFirstGesture);
    };
    window.addEventListener("pointerdown", onFirstGesture, { once: true });
    window.addEventListener("touchstart", onFirstGesture, { once: true, passive: true });
    window.addEventListener("keydown", onFirstGesture, { once: true });
  });
}

function whatsappLink() {
  const a = q("[data-whatsapp]");
  if (!a) return;

  const phone = "5511987654321";
  const text =
    "Olá, Studio Aura. Gostaria de conversar sobre um projeto. Minha cidade é ____ e o imóvel é ____.";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  a.setAttribute("href", url);
  a.setAttribute("rel", "noopener noreferrer");
  a.setAttribute("target", "_blank");
}

function formLead() {
  const form = q("#lead-form");
  if (!form) return;
  const status = q(".form-status", form);
  const submitBtn = q("[data-submit]", form);

  const setError = (name, msg) => {
    const el = q(`[data-error-for="${name}"]`, form);
    if (el) el.textContent = msg || "";
  };

  const validate = () => {
    let ok = true;
    const data = new FormData(form);

    const nome = String(data.get("nome") || "").trim();
    const email = String(data.get("email") || "").trim();
    const cidade = String(data.get("cidade") || "").trim();
    const mensagem = String(data.get("mensagem") || "").trim();

    setError("nome", "");
    setError("email", "");
    setError("cidade", "");
    setError("mensagem", "");
    if (status) status.textContent = "";

    if (nome.length < 2) {
      setError("nome", "Informe seu nome.");
      ok = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("email", "Informe um email válido.");
      ok = false;
    }
    if (cidade.length < 2) {
      setError("cidade", "Informe sua cidade.");
      ok = false;
    }
    if (mensagem.length < 12) {
      setError("mensagem", "Conte um pouco mais sobre o projeto (mín. 12 caracteres).");
      ok = false;
    }

    return ok;
  };

  const setBusy = (busy) => {
    if (!submitBtn) return;
    submitBtn.setAttribute("aria-busy", String(busy));
    submitBtn.disabled = busy;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setBusy(true);
    if (status) status.textContent = "Enviando…";

    try {
      await new Promise((r) => setTimeout(r, 850));
      form.reset();
      if (status) status.textContent = "Recebido. Retornaremos em breve com próximos passos.";
    } catch {
      if (status) status.textContent = "Não foi possível enviar agora. Tente novamente.";
    } finally {
      setBusy(false);
    }
  });
}

function scrollScrubProcessVideoGSAP() {
  const video = q("[data-scroll-video]");
  const wrap = q("[data-scroll-video-wrap]");
  const scrubRoot = q("[data-process-scrub]");
  if (!video || !wrap || !scrubRoot) return;
  if (prefersReducedMotion()) return;
  if (typeof window.gsap === "undefined" || typeof window.ScrollTrigger === "undefined") return;

  window.gsap.registerPlugin(window.ScrollTrigger);

  let didSetup = false;

  const setup = () => {
    if (didSetup) return;

    const duration = Number(video.duration) || 0;
    if (!duration || !Number.isFinite(duration)) return;
    const endTime = Math.max(0, duration - 0.08);
    didSetup = true;

    try {
      video.pause();
      video.removeAttribute("loop");
      video.removeAttribute("autoplay");
      video.preload = "auto";
      video.currentTime = 0.001;
    } catch {
      // no-op
    }

    // Scrub verdadeiramente bidirecional (descendo avança, subindo retrocede)
    // com mapeamento 1:1 do progresso do ScrollTrigger -> currentTime.
    const playhead = { t: 0 };
    const fps = 30;

    const applyTime = () => {
      try {
        // Evita seek fora do range e reduz glitches em alguns browsers.
        let t = Math.max(0, Math.min(endTime, playhead.t));
        // Quantiza levemente para estabilizar repaint no final.
        t = Math.round(t * fps) / fps;
        if (endTime - t < 1 / fps) t = endTime;
        video.currentTime = t;
      } catch {
        // no-op
      }
    };

    const tween = window.gsap.to(playhead, {
      t: endTime,
      ease: "none",
      onUpdate: applyTime,
      scrollTrigger: {
        trigger: scrubRoot,
        start: "top top",
        // Duração de rolagem proporcional ao vídeo, sem “vazio” antes.
        // Ajuste fino: pxPorSegundo controla o “ritmo” cinematográfico.
        end: () => {
          const pxPorSegundo = 520;
          const min = window.innerHeight * 1.8;
          return `+=${Math.max(min, endTime * pxPorSegundo)}`;
        },
        scrub: true,
        pin: scrubRoot,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: () => {
          // Garante que o vídeo já aparece sem "gap" preto ao entrar na seção.
          playhead.t = Math.max(0.001, playhead.t || 0.001);
          applyTime();
        },
        onEnterBack: () => {
          applyTime();
        },
        onLeaveBack: () => {
          playhead.t = 0;
          applyTime();
          try {
            video.pause();
          } catch {}
        },
        onLeave: () => {
          playhead.t = endTime;
          applyTime();
          // Reaplica no próximo frame para evitar "ghost frame" na liberação do pin.
          window.requestAnimationFrame(() => {
            playhead.t = endTime;
            applyTime();
            try {
              video.pause();
            } catch {}
          });
        },
      },
    });

    // Recalcula ao redimensionar para manter o pin limpo.
    window.addEventListener(
      "resize",
      () => {
        const st = tween.scrollTrigger;
        if (st) st.refresh();
      },
      { passive: true }
    );

    // Garante layout correto após criação.
    try {
      window.ScrollTrigger.refresh();
    } catch {
      // no-op
    }
  };

  // Força início de load e cria o scrub assim que duration estiver disponível.
  try {
    video.preload = "auto";
    video.load();
  } catch {
    // no-op
  }

  const waitForDuration = () => {
    setup();
    if (didSetup) return;
    window.setTimeout(waitForDuration, 60);
  };

  video.addEventListener("loadedmetadata", setup);
  video.addEventListener("durationchange", setup);
  video.addEventListener("canplay", setup);
  waitForDuration();
}

setYear();
stickyHeader();
mobileNav();
revealOnScroll();
lazyImages();
videoPolicies();
whatsappLink();
formLead();
primeVideos();
scrollScrubProcessVideoGSAP();

