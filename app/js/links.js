export function links() {
  const headerLinks = document.querySelectorAll('.header__link');
  const sections = document.querySelectorAll('section');
  const footer = document.querySelector('footer');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.8
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetId = entry.target.getAttribute('id');
        headerLinks.forEach(link => {
          if (link.getAttribute('href') === `#${targetId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  observer.observe(footer);
}