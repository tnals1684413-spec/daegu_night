const heroSwiper = new Swiper(".hero-slides", {
  loop: true,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  speed: 500,
  autoplay: {
    delay: 4500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: ".hero-indicators",
    type: "bullets",
    clickable: true,
  },
  navigation: {
    prevEl: ".hero-prev",
    nextEl: ".hero-next",
  },
});

const autoplayButton = document.querySelector(".hero-play");

if (!autoplayButton) {
  throw new Error("The hero autoplay button was not found.");
}

const updateAutoplayButton = () => {
  const isRunning = heroSwiper.autoplay.running;
  autoplayButton.textContent = isRunning ? "PAUSE" : "AUTO PLAY";
  autoplayButton.setAttribute(
    "aria-label",
    isRunning ? "자동 재생 일시 정지" : "자동 재생 다시 시작",
  );
  autoplayButton.setAttribute("aria-pressed", String(isRunning));
};

autoplayButton.addEventListener("click", () => {
  if (heroSwiper.autoplay.running) {
    heroSwiper.autoplay.stop();
  } else {
    heroSwiper.autoplay.start();
  }

  updateAutoplayButton();
});
