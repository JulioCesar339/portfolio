/* ── Cursor Personalizado ────────────────────────────
   Punto verde que sigue al mouse al instante +
   anillo que sigue con lag suave.
   Se expande al hacer hover sobre elementos interactivos.
──────────────────────────────────────────────────── */

export function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (!dot || !ring) return;

  let mx = -100, my = -100; // posición del mouse
  let rx = -100, ry = -100; // posición del ring (con lag)

  // Dot sigue al mouse al instante
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  // Ring sigue con interpolación suave
  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover sobre elementos interactivos → cursor se expande
  const interactives = 'a, button, .btn, .proj-card, .skill-chip, .nav-links a';
  document.querySelectorAll(interactives).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // Ocultar cursor al salir de la ventana
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
}