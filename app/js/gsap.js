gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const timeline = gsap.timeline();
const roadmapItems = document.querySelectorAll('.roadmap__item');

const animateItem = (item, duration) => {
  return new Promise(resolve => {
    timeline.to(item, {className: 'roadmap__item active', duration: duration, onComplete: resolve});
  });
};

const removeActiveClass = (item, duration) => {
  return new Promise(resolve => {
    timeline.to(item, {className: 'roadmap__item', duration: duration, onComplete: resolve});
  });
};

ScrollTrigger.create({
  trigger: '.roadmap',
  start: 'top 66%',
  end: 'bottom 66%',
  once: true,
  lockScroll: true,
  onEnter: async () => {
    setTimeout(async () => {
      timeline.clear();
      for (let index = 0; index < roadmapItems.length; index++) {
        const currentItem = roadmapItems[index];
        const nextItem = roadmapItems[index + 1];
        await animateItem(currentItem, 1.3);
        if (nextItem) {
          await removeActiveClass(currentItem, 0);
        } else {
          await removeActiveClass(currentItem, 1.3);
        }
      }
    }, 1500);
  },
  onEnterBack: () => {
    timeline.clear();
    roadmapItems.forEach((item) => {
      timeline.to(item, {className: 'roadmap__item', duration: 1.2});
    });
  }
});

const sections = document.querySelectorAll(".section");

const scrolling = {
  enabled: true,
  events: "scroll,wheel,touchmove,pointermove".split(","),
  prevent: e => e.preventDefault(),
  disable() {
    if (scrolling.enabled) {
      scrolling.enabled = false;
      window.addEventListener("scroll", gsap.ticker.tick, {passive: true});
      scrolling.events.forEach((e, i) => (i ? document : window).addEventListener(e, scrolling.prevent, {passive: false}));
    }
  },
  enable() {
    if (!scrolling.enabled) {
      scrolling.enabled = true;
      window.removeEventListener("scroll", gsap.ticker.tick);
      scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, scrolling.prevent));
    }
  }
};

function goToSection(section) {
  if (scrolling.enabled) {
    scrolling.disable();
    gsap.to(window, {
      scrollTo: {y: section, autoKill: false},
      onComplete: scrolling.enable,
      duration: 1.2
    });
  }
}

sections.forEach((section, i) => {
  ScrollTrigger.create({
    trigger: section,
    start: "top bottom-=1",
    end: "bottom top+=1",
    onEnter: () => goToSection(section.offsetTop),
    onEnterBack: () => goToSection(section.offsetTop)
  });
});