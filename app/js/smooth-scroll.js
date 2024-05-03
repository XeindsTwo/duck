

window.addEventListener('load', function () {
  const menuLinks = document.querySelectorAll('.desktop');

  menuLinks.forEach(function (menuLink) {
    menuLink.addEventListener('click', function (event) {
      event.preventDefault();

      const targetId = menuLink.getAttribute('href').slice(1);
      const targetElement = document.getElementById(targetId);
      const headerHeight = document.querySelector('.header').offsetHeight; // Получаем высоту хедера
      const targetOffset = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight; // Рассчитываем точное положение цели с учетом высоты хедера

      gsap.to(window, {
        scrollTo: {y: targetOffset, autoKill: false},
        duration: 1,
        ease: 'power4.inOut'
      });
    });
  });
});
