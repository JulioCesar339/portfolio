/* ── Contador Animado ────────────────────────────────
   Cuando una tarjeta de proyecto entra al viewport,
   los números cuentan desde 0 hasta su valor final
   con easing suave.
──────────────────────────────────────────────────── */

function animateCounter(el) {
  const target   = parseInt(el.dataset.count, 10);
  const suffix   = el.dataset.suffix || '';
  const isZero   = el.hasAttribute('data-zero');
  const duration = 1400; // ms que dura la animación
  const startTime = performance.now();

  // Si el valor es 0 solo lo mostramos directo
  if (isZero) {
    el.textContent = '0' + suffix;
    return;
  }

  function tick(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Easing ease-out cúbico — arranca rápido y frena suave
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = Math.round(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

export function initCounters() {
  // IntersectionObserver — dispara cuando la tarjeta es visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const counters = entry.target.querySelectorAll('[data-count]');
      counters.forEach(el => {
        // Solo anima una vez
        if (!el.dataset.animated) {
          el.dataset.animated = 'true';
          animateCounter(el);
        }
      });
    });
  }, { threshold: 0.3 });

  // Observar todas las tarjetas de proyectos
  document.querySelectorAll('.proj-card').forEach(card => {
    observer.observe(card);
  });
}