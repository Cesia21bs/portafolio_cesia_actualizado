import './styles.less';

/* ── CURSOR GLOW ── */
const glow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});

/* ── NAVBAR: scroll shrink + active link ── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

const observerNav = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observerNav.observe(s));

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileMenu.classList.toggle('open', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

/* ── TYPED ROLE ── */
const roles = [
  'Estudiante de Ing. en Computación',
  'Diseñadora Web',
  'Desarrolladora Frontend',
  'Apasionada por la tecnología',
];
let roleIdx = 0, charIdx = 0, isDeleting = false;
const typedEl = document.getElementById('typed-role');

function typeRole() {
  const current = roles[roleIdx];
  if (!isDeleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      isDeleting = true;
      return setTimeout(typeRole, 2200);
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeRole, isDeleting ? 48 : 78);
}
typeRole();

/* ── REVEAL ON SCROLL ── */
const reveals = document.querySelectorAll('.reveal');
const observerReveal = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observerReveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observerReveal.observe(el));

/* ── SKILL BARS ── */
const skillFills = document.querySelectorAll('.skill-fill');
const observerSkills = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillFills.forEach(fill => {
        fill.style.width = fill.dataset.width + '%';
      });
      observerSkills.disconnect();
    }
  });
}, { threshold: 0.3 });
const skillSection = document.getElementById('habilidades');
if (skillSection) observerSkills.observe(skillSection);

/* ── COUNTER ANIMATION ── */
const counters = document.querySelectorAll('.stat-number[data-target]');
const observerCount = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      let start = 0;
      const step = target / 40;
      const interval = setInterval(() => {
        start += step;
        if (start >= target) {
          el.textContent = target + '+';
          clearInterval(interval);
        } else {
          el.textContent = Math.floor(start);
        }
      }, 40);
      observerCount.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => observerCount.observe(c));

/* ── CONTACT FORM (demo — shows success msg) ── */
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Enviando…';

    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Enviar mensaje 🚀';
      successMsg.hidden = false;
      setTimeout(() => { successMsg.hidden = true; }, 5000);
    }, 1200);
  });
}

/* ── SMOOTH SCROLL for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
