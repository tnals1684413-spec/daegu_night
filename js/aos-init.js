AOS.init({
  duration: 900,
  easing: "ease-out-cubic",
  once: true,
  offset: 120,
  disable: () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
});
