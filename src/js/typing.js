/* ── Typing Effect ───────────────────────────────────
   Escribe varias frases en loop en el hero badge:
   escribe → pausa → borra → siguiente frase → ...
──────────────────────────────────────────────────── */

const phrases = [
  'QA Automation Engineer',
  'Playwright & TypeScript',
  'CI/CD con GitHub Actions',
  'Performance Testing k6',
  'QA Automation Engineer'   // vuelve al inicio y se queda
];

const SPEED_TYPE   = 70;    // ms por letra al escribir
const SPEED_DELETE = 35;    // ms por letra al borrar
const PAUSE_END    = 1800;  // ms al terminar de escribir
const PAUSE_START  = 300;   // ms antes de empezar la siguiente

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;

export function initTyping() {
  const typingEl = document.getElementById('typing-text');
  const cursorEl = document.querySelector('.cursor-blink');

  if (!typingEl) return;

  function typeLoop() {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      // Escribiendo letra por letra
      typingEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        // Llegó al final — si es la última frase se queda fija
        if (phraseIndex === phrases.length - 1) {
          cursorEl.style.opacity = '0'; // oculta el cursor al terminar
          return;
        }
        isDeleting = true;
        setTimeout(typeLoop, PAUSE_END);
        return;
      }

    } else {
      // Borrando letra por letra
      typingEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex++;
        setTimeout(typeLoop, PAUSE_START);
        return;
      }
    }

    setTimeout(typeLoop, isDeleting ? SPEED_DELETE : SPEED_TYPE);
  }

  // Pequeño delay para que se note la animación de entrada del hero
  setTimeout(typeLoop, 900);
}