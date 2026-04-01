// ===== AIRBNB CLONE - MAIN APP =====

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const profileBtn = document.querySelector('.navbar-profile-btn');
  const dropdown = document.querySelector('.profile-dropdown');
  const compactSearch = document.querySelector('.navbar-search-compact');

  // Scroll behavior
  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    }
    if (compactSearch) {
      compactSearch.classList.toggle('visible', window.scrollY > 120);
    }
  });

  // Profile dropdown
  if (profileBtn && dropdown) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });
    document.addEventListener('click', () => dropdown.classList.remove('open'));
    dropdown.addEventListener('click', e => e.stopPropagation());
  }
}

// ===== WISHLIST STATE =====
let wishlistIds = JSON.parse(localStorage.getItem('airbnb_wishlist') || '[]');

function toggleWishlist(id, btn) {
  const idx = wishlistIds.indexOf(id);
  if (idx === -1) {
    wishlistIds.push(id);
    showToast('Saved to wishlist ❤️');
  } else {
    wishlistIds.splice(idx, 1);
    showToast('Removed from wishlist');
  }
  localStorage.setItem('airbnb_wishlist', JSON.stringify(wishlistIds));
  updateWishlistBtn(btn, id);
  btn.classList.add('popping');
  setTimeout(() => btn.classList.remove('popping'), 300);
}

function updateWishlistBtn(btn, id) {
  const active = wishlistIds.includes(id);
  btn.classList.toggle('active', active);
  btn.querySelector('span').textContent = active ? '❤️' : '🤍';
  btn.setAttribute('aria-label', active ? 'Remove from wishlist' : 'Save to wishlist');
}

function isWishlisted(id) { return wishlistIds.includes(id); }

// ===== TOAST =====
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== CREATE LISTING CARD =====
function createListingCard(listing, small = false) {
  const wishlisted = isWishlisted(listing.id);
  const priceDisplay = `₹${listing.price.toLocaleString('en-IN')}`;
  const card = document.createElement('div');
  card.className = 'listing-card';
  card.setAttribute('data-id', listing.id);
  card.innerHTML = `
    <div class="card-image">
      ${listing.badge ? `<div class="card-badge">${listing.badge}</div>` : ''}
      <img src="${listing.image}" alt="${listing.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'">
      <button class="wishlist-btn ${wishlisted ? 'active' : ''}" 
        aria-label="${wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}"
        onclick="event.stopPropagation(); toggleWishlist(${listing.id}, this)">
        <span>${wishlisted ? '❤️' : '🤍'}</span>
      </button>
    </div>
    <div class="card-info">
      <div class="card-top">
        <div class="card-location">${listing.location}</div>
        <div class="card-rating"><span class="star">★</span> ${listing.rating}</div>
      </div>
      <div class="card-title">${listing.title}</div>
      <div class="card-price"><strong>${priceDisplay}</strong> for 2 nights · ★ ${listing.rating}</div>
    </div>
  `;
  card.addEventListener('click', () => {
    window.location.href = `${getBasePath()}pages/listing-details.html?id=${listing.id}`;
  });
  return card;
}

function getBasePath() {
  const path = window.location.pathname;
  return path.includes('/pages/') ? '../' : '';
}

// ===== LOAD LISTINGS =====
let allListings = [];

async function loadListings() {
  try {
    const base = getBasePath();
    const res = await fetch(`${base}data/listings.json`);
    allListings = await res.json();
    return allListings;
  } catch (e) {
    console.error('Failed to load listings:', e);
    return [];
  }
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  items.forEach(item => obs.observe(item));
}

// ===== GALLERY MODAL =====
function initGalleryModal(images) {
  let current = 0;
  const modal = document.querySelector('.gallery-modal');
  const img = modal?.querySelector('img');
  const counter = modal?.querySelector('.gallery-counter');
  if (!modal) return;

  function update() {
    img.src = images[current];
    if (counter) counter.textContent = `${current + 1} / ${images.length}`;
  }

  document.querySelectorAll('.gallery-main img, .gallery-thumb img').forEach((el, i) => {
    el.addEventListener('click', () => { current = i; update(); modal.classList.add('open'); });
  });
  document.querySelector('.show-all-btn')?.addEventListener('click', () => {
    current = 0; update(); modal.classList.add('open');
  });
  modal.querySelector('.modal-close')?.addEventListener('click', () => modal.classList.remove('open'));
  modal.querySelector('.modal-prev')?.addEventListener('click', () => {
    current = (current - 1 + images.length) % images.length; update();
  });
  modal.querySelector('.modal-next')?.addEventListener('click', () => {
    current = (current + 1) % images.length; update();
  });
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') { current = (current - 1 + images.length) % images.length; update(); }
    if (e.key === 'ArrowRight') { current = (current + 1) % images.length; update(); }
    if (e.key === 'Escape') modal.classList.remove('open');
  });
}

// ===== SKELETON LOADER =====
function renderSkeletons(container, count = 4) {
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    container.innerHTML += `
      <div class="skeleton-card">
        <div class="skeleton card-image"></div>
        <div class="skeleton skeleton-line" style="width:80%;margin-top:12px"></div>
        <div class="skeleton skeleton-line short"></div>
        <div class="skeleton skeleton-line" style="width:50%"></div>
      </div>
    `;
  }
}

// ===== SEARCH FUNCTION =====
function handleSearch(e) {
  e?.preventDefault();
  const where = document.getElementById('search-where')?.value || 'Anywhere';
  const checkin = document.getElementById('search-checkin')?.value || '';
  const checkout = document.getElementById('search-checkout')?.value || '';
  const guests = document.getElementById('search-guests')?.value || '';
  const params = new URLSearchParams({ where, checkin, checkout, guests });
  const base = getBasePath();
  window.location.href = `${base}pages/search-results.html?${params.toString()}`;
}

// ===== FORMAT CURRENCY (INR) =====
function formatINR(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

// ===== INIT ON LOAD =====
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  document.querySelector('.hero-search')?.addEventListener('submit', handleSearch);
  document.querySelector('.search-btn')?.addEventListener('click', handleSearch);
});
