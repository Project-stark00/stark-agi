const hasAnime = typeof anime !== "undefined";

if (hasAnime) {
  anime({
    targets: ".hero-content",
    opacity: [0, 1],
    translateY: [28, 0],
    duration: 950,
    easing: "easeOutExpo"
  });

  anime({
    targets: ".hero-visual",
    opacity: [0, 1],
    translateY: [38, 0],
    scale: [0.96, 1],
    duration: 1150,
    delay: 180,
    easing: "easeOutExpo"
  });

  anime({
    targets: ".particle",
    translateY: () => anime.random(-36, 36),
    translateX: () => anime.random(-22, 22),
    scale: () => anime.random(8, 18) / 10,
    opacity: [0.18, 0.55, 0.18],
    duration: () => anime.random(4200, 7600),
    delay: anime.stagger(280),
    direction: "alternate",
    loop: true,
    easing: "easeInOutSine"
  });

  anime({
    targets: ".fusion-orb-wrap",
    translateX: "-50%",
    translateY: [-8, 8],
    duration: 3100,
    direction: "alternate",
    loop: true,
    easing: "easeInOutSine"
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      anime({
        targets: entry.target,
        opacity: [0, 1],
        translateY: [34, 0],
        duration: 850,
        easing: "easeOutExpo"
      });

      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.16 });

  document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));
} else {
  document.querySelectorAll(".hero-content, .hero-visual, .reveal").forEach((item) => {
    item.style.opacity = 1;
  });
}

document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = (0.5 - (y / rect.height)) * 8;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  });
});
