// ===== ANIMATIONS =====

// Category tabs horizontal scroll arrows
function initTabsScroll() {
  const scroll = document.querySelector('.tabs-scroll');
  if (!scroll) return;
  const prev = document.querySelector('.tab-prev');
  const next = document.querySelector('.tab-next');
  if (prev) prev.addEventListener('click', () => scroll.scrollBy({ left: -200, behavior: 'smooth' }));
  if (next) next.addEventListener('click', () => scroll.scrollBy({ left: 200, behavior: 'smooth' }));
}

// Row scroll arrows
function initRowScrollArrows() {
  document.querySelectorAll('.row-scroll-wrapper').forEach(wrapper => {
    const row = wrapper.querySelector('.listings-row');
    const prev = wrapper.querySelector('.scroll-arrow.prev');
    const next = wrapper.querySelector('.scroll-arrow.next');
    if (prev) prev.addEventListener('click', () => row.scrollBy({ left: -260, behavior: 'smooth' }));
    if (next) next.addEventListener('click', () => row.scrollBy({ left: 260, behavior: 'smooth' }));
  });
}

// Profile tabs
function initProfileTabs() {
  const tabs = document.querySelectorAll('.profile-tab');
  const panels = document.querySelectorAll('.profile-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.style.display = 'none');
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.target);
      if (target) { target.style.display = 'block'; target.classList.add('animate-fade-in'); }
    });
  });
  // Show first panel
  if (panels.length) panels[0].style.display = 'block';
}

// Date pricing calculator
function initPriceCalculator() {
  const checkin = document.getElementById('booking-checkin');
  const checkout = document.getElementById('booking-checkout');
  const nightsEl = document.getElementById('nights-count');
  const priceEl = document.getElementById('total-price');
  const basePrice = parseInt(document.body.dataset.price || '4200');

  function calculate() {
    if (!checkin?.value || !checkout?.value) return;
    const d1 = new Date(checkin.value);
    const d2 = new Date(checkout.value);
    const nights = Math.max(1, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)));
    const total = basePrice * nights;
    const cleaning = 500;
    const service = Math.round(total * 0.14);
    const grand = total + cleaning + service;

    if (nightsEl) nightsEl.textContent = nights;
    document.getElementById('price-per-night-row') &&
      (document.getElementById('price-per-night-row').textContent = `₹${basePrice.toLocaleString('en-IN')} × ${nights} nights`);
    document.getElementById('subtotal') &&
      (document.getElementById('subtotal').textContent = `₹${total.toLocaleString('en-IN')}`);
    document.getElementById('cleaning-fee') &&
      (document.getElementById('cleaning-fee').textContent = `₹${cleaning.toLocaleString('en-IN')}`);
    document.getElementById('service-fee') &&
      (document.getElementById('service-fee').textContent = `₹${service.toLocaleString('en-IN')}`);
    if (priceEl) priceEl.textContent = `₹${grand.toLocaleString('en-IN')}`;
  }

  checkin?.addEventListener('change', calculate);
  checkout?.addEventListener('change', calculate);

  // Set default dates
  if (checkin && !checkin.value) {
    const today = new Date();
    const next = new Date(today); next.setDate(next.getDate() + 3);
    const out = new Date(today); out.setDate(out.getDate() + 5);
    checkin.value = next.toISOString().split('T')[0];
    checkout.value = out.toISOString().split('T')[0];
    calculate();
  }
}

// Filter chips
function initFilterChips() {
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
    });
  });
}

// Help accordion / FAQ
function initHelpAccordion() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

// Multi-step form
function initMultiStepForm() {
  const steps = document.querySelectorAll('.form-step-panel');
  const stepBtns = document.querySelectorAll('.form-step');
  let current = 0;

  function showStep(idx) {
    steps.forEach((s, i) => s.style.display = i === idx ? 'block' : 'none');
    stepBtns.forEach((b, i) => {
      b.classList.toggle('active', i === idx);
      b.classList.toggle('done', i < idx);
    });
    current = idx;
  }

  document.querySelectorAll('.next-step-btn').forEach(btn => {
    btn.addEventListener('click', () => { if (current < steps.length - 1) showStep(current + 1); });
  });
  document.querySelectorAll('.prev-step-btn').forEach(btn => {
    btn.addEventListener('click', () => { if (current > 0) showStep(current - 1); });
  });
  stepBtns.forEach((btn, i) => btn.addEventListener('click', () => showStep(i)));

  if (steps.length) showStep(0);
}

// Smooth counter animation
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current).toLocaleString('en-IN');
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTabsScroll();
  initRowScrollArrows();
  initProfileTabs();
  initPriceCalculator();
  initFilterChips();
  initHelpAccordion();
  initMultiStepForm();

  // Counter animation on scroll
  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { animateCounters(); obs.disconnect(); }
    });
    obs.observe(statsSection);
  }
});
