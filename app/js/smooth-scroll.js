window.addEventListener('load', function () {
  const menuLinks = document.querySelectorAll('.header__link');

  menuLinks.forEach(function (menuLink) {
    menuLink.addEventListener('click', function (event) {
      event.preventDefault();

      const targetId = menuLink.getAttribute('href').slice(1);
      const targetElement = document.getElementById(targetId);
      const targetOffset = targetElement.offsetTop - document.querySelector('.header').offsetHeight;

      gsap.to(window, {
        scrollTo: {y: targetOffset, autoKill: false},
        duration: 1,
        ease: 'power4.inOut'
      });
    });
  });
});