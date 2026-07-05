/* =====================================================
   PropertyLead – Interactive JavaScript
   ===================================================== */

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== PARTICLE SYSTEM =====
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 20;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;
    container.appendChild(p);
  }
}
createParticles();

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 1500, suffix = '') {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + suffix;
    }
  }, 16);
}

let countersStarted = false;
function startCounters() {
  if (countersStarted) return;
  countersStarted = true;
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.target.includes('.') ? '' : '';
    animateCounter(el, target, 1500, suffix);
  });
}

// ===== INTERSECTION OBSERVER – Cards & Counters =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.dealer-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 80}ms`;
  observer.observe(card);
});

// Counter observer
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  const counterObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) startCounters();
  }, { threshold: 0.5 });
  counterObserver.observe(heroStats);
}

// ===== FILTER BUTTONS =====
const filterBtns = document.querySelectorAll('.filter-btn');
const dealerCards = document.querySelectorAll('.dealer-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    dealerCards.forEach(card => {
      const rating = parseFloat(card.dataset.rating);
      const reviews = parseInt(card.dataset.reviews);
      card.classList.remove('hidden');

      if (filter === 'top' && rating < 4.5) {
        card.classList.add('hidden');
      } else if (filter === 'reviews') {
        // Sort by reviews – rearrange DOM
      }
    });

    if (filter === 'reviews') {
      const grid = document.getElementById('dealers-grid');
      const cardsArr = Array.from(grid.querySelectorAll('.dealer-card:not(.hidden)'));
      cardsArr.sort((a, b) => parseInt(b.dataset.reviews) - parseInt(a.dataset.reviews));
      cardsArr.forEach(c => grid.appendChild(c));
    }
  });
});

// ===== CONTACT FORM =====
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('form-submit-btn');
  const success = document.getElementById('form-success');
  btn.disabled = true;
  btn.innerHTML = '<span>Sending...</span>';

  setTimeout(() => {
    btn.style.display = 'none';
    success.style.display = 'block';
    document.getElementById('contact-form').reset();
  }, 1000);
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== CARD HOVER GLOW =====
document.querySelectorAll('.dealer-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// ===== STAR RATINGS =====
document.querySelectorAll('.stars').forEach(el => {
  const rating = parseFloat(el.dataset.rating);
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  el.textContent = '★'.repeat(full) + (half ? '⭐' : '') + '☆'.repeat(empty);
});

console.log('%c🏠 PropertyLead — Uttam Nagar West Delhi', 
  'color:#3B82F6;font-size:16px;font-weight:bold;');
console.log('%c5 verified property dealers loaded.', 
  'color:#10B981;font-size:12px;');
