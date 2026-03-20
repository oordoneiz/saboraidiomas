// ─────────────────────────────────────────────
// INTERSECTION OBSERVER (PROGRESS BAR)
// ─────────────────────────────────────────────
const recObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => {
        const fill = document.getElementById('recProgressFill');
        if (fill) fill.style.width = '73%';
      }, 400);
      recObserver.disconnect();
    }
  });
}, { threshold: 0.2 });

const recSection = document.getElementById('recursos');
if (recSection) recObserver.observe(recSection);

// ─────────────────────────────────────────────
// SELECT IDIOMA (UNIFICADO)
// ─────────────────────────────────────────────
function selectIdioma(valor, elemento) {
  const input = document.getElementById('rec-idioma') || document.getElementById('r-idioma');
  if (input) input.value = valor;

  document.querySelectorAll('.rec-pill, .idioma-chip')
    .forEach(el => el.classList.remove('active'));

  if (elemento) elemento.classList.add('active');
}

// ─────────────────────────────────────────────
// FORMULARIO DEMO (UNIFICADO)
// ─────────────────────────────────────────────
async function enviarDemo() {
  const nombre = document.getElementById('rec-nombre')?.value.trim() || document.getElementById('r-nombre')?.value.trim();
  const email  = document.getElementById('rec-email')?.value.trim()  || document.getElementById('r-email')?.value.trim();
  const idioma = document.getElementById('rec-idioma')?.value        || document.getElementById('r-idioma')?.value;

  if (!nombre || !email || !idioma) {
    alert("Completa todos los campos");
    return;
  }

  alert("Formulario enviado correctamente (modo demo)");
}

// ─────────────────────────────────────────────
// HERO CAROUSEL
// ─────────────────────────────────────────────
const slides = document.getElementById('heroSlides');
const dots = document.querySelectorAll('#heroDots .dot');
let current = 0;
let timer;

function goTo(n) {
  current = (n + 4) % 4;
  if (slides) slides.style.transform = `translateX(-${current * 25}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === current));
}

function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }

function startAuto() { timer = setInterval(next, 5000); }
function stopAuto() { clearInterval(timer); }

document.getElementById('nextBtn')?.addEventListener('click', () => { stopAuto(); next(); startAuto(); });
document.getElementById('prevBtn')?.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });
dots.forEach(d => d.addEventListener('click', () => { stopAuto(); goTo(+d.dataset.index); startAuto(); }));

startAuto();

// ─────────────────────────────────────────────
// SCROLL REVEAL
// ─────────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ─────────────────────────────────────────────
// NAVBAR SCROLL
// ─────────────────────────────────────────────
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (!nav) return;
  nav.style.background = window.scrollY > 40
    ? 'rgba(50,50,50,0.99)'
    : 'rgba(80,80,80,0.96)';
});

// ─────────────────────────────────────────────
// MENU MÓVIL
// ─────────────────────────────────────────────
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuBtn.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.addEventListener('click', (e) => {
  if (!menuBtn?.contains(e.target) && !mobileMenu?.contains(e.target)) {
    mobileMenu?.classList.remove('open');
    menuBtn?.classList.remove('open');
    document.body.style.overflow = '';
  }
});