// Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => {
  observer.observe(el);
});

// Counter animation
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += step;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };
  updateCounter();
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target.querySelector('.stat-number[data-target]');
      if (counter && counter.textContent === '0') {
        animateCounter(counter);
      }
      statsObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.stat-card').forEach(stat => {
  statsObserver.observe(stat);
});


// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const targetPosition = target.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// BOTÓN SUBIR - robusto con contenedor flotante
(function () {
  function initBtnBehavior() {
    const btnTop = document.getElementById("btn-top");
    if (!btnTop) return false;

    const SHOW_AT = 200; // px desde top para mostrar el botón

    const checkScroll = () => {
      const sc = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (sc > SHOW_AT) {
        btnTop.classList.add("show"); // añade clase para mostrar
      } else {
        btnTop.classList.remove("show"); // oculta el botón
      }
    };

    // Estado inicial
    checkScroll();

    // Listeners
    window.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);

    // Click en el botón
    btnTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    return true;
  }

  // Inicializar cuando el DOM esté listo
  document.addEventListener("DOMContentLoaded", () => {
    if (!initBtnBehavior()) {
      // Si el botón aparece después de cargar el script
      const mo = new MutationObserver((mutations, observer) => {
        if (initBtnBehavior()) observer.disconnect();
      });
      mo.observe(document.body, { childList: true, subtree: true });

      // Fallback: intenta después de 1 segundo
      setTimeout(() => { initBtnBehavior(); }, 1000);
    }
  });
})();


// Preloader hide on full load
window.addEventListener('load', () => {
  // Add a small delay to avoid flash if load is too fast
  setTimeout(() => {
    document.body.classList.add('loaded');
    const preloader = document.getElementById('preloader');
    if (preloader) {
      // Remove from DOM after transition ends
      preloader.addEventListener('transitionend', () => preloader.remove());
      // Safety removal in case transitionend doesn't fire
      setTimeout(() => { if (preloader.parentNode) preloader.remove(); }, 1200);
    }
  }, 200);
});





