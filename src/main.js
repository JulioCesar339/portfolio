/* ── Main — punto de entrada ─────────────────────────
   Importa todos los módulos y los inicializa
   cuando el DOM está listo.
──────────────────────────────────────────────────── */

import 'aos/dist/aos.css';
import './css/styles.css';

import AOS        from 'aos';
import { initTyping  } from './js/typing.js';
import { initCounters } from './js/counter.js';
import { initCursor  } from './js/cursor.js';

document.addEventListener('DOMContentLoaded', () => {

  // Animaciones de scroll
  AOS.init({
    once: true,
    offset: 60,
    duration: 650,
    easing: 'ease-out-cubic'
  });

  // Efectos
  initTyping();
  initCounters();
  initCursor();

});