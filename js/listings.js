// ===== LISTINGS PAGE LOGIC =====

// Category emoji map
const CATEGORY_ICONS = {
  'All': '🏠',
  'Beach': '🏖️',
  'Mountain': '⛰️',
  'City': '🏙️',
  'Camping': '⛺',
  'Cabins': '🛖',
  'Islands': '🏝️',
  'Houseboat': '⛵',
  'Farm Stay': '🌾',
  'Villa': '🏡',
};

let activeCategory = 'All';
let currentListings = [];

// Render category tabs
function renderCategoryTabs(listings) {
  const scroll = document.querySelector('.tabs-scroll');
  if (!scroll) return;
  const cats = ['All', ...new Set(listings.map(l => l.category))];
  scroll.innerHTML = '';
  cats.forEach(cat => {
    const div = document.createElement('div');
    div.className = `tab-item${cat === activeCategory ? ' active' : ''}`;
    div.innerHTML = `
      <span class="tab-icon">${CATEGORY_ICONS[cat] || '🏠'}</span>
      <span>${cat}</span>
    `;
    div.addEventListener('click', () => {
      activeCategory = cat;
      document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
      div.classList.add('active');
      const filtered = cat === 'All' ? listings : listings.filter(l => l.category === cat);
      renderListingsGrid(filtered, document.getElementById('featured-grid'));
    });
    scroll.appendChild(div);
  });
}

// Render listings into a grid
function renderListingsGrid(listings, container) {
  if (!container) return;
  container.innerHTML = '';
  if (!listings.length) {
    container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:48px;color:var(--text-light)">
      <div style="font-size:48px;margin-bottom:16px">😕</div>
      <p>No listings found for this category.</p>
    </div>`;
    return;
  }
  listings.forEach(listing => {
    container.appendChild(createListingCard(listing));
  });
}

// Render row (horizontal scroll)
function renderListingsRow(listings, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  listings.forEach(listing => {
    const card = createListingCard(listing);
    card.style.width = '240px';
    card.style.flexShrink = '0';
    container.appendChild(card);
  });
}

// Render popular destinations
function renderDestinations() {
  const grid = document.querySelector('.destinations-grid');
  if (!grid) return;
  const dests = [
    { city: 'Goa', state: 'India', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80', count: '200+ stays' },
    { city: 'Jaipur', state: 'Rajasthan', img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80', count: '150+ stays' },
    { city: 'Mumbai', state: 'Maharashtra', img: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&q=80', count: '300+ stays' },
    { city: 'Kerala', state: 'India', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80', count: '180+ stays' },
    { city: 'Manali', state: 'Himachal Pradesh', img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80', count: '90+ stays' },
  ];
  grid.innerHTML = '';
  dests.forEach((d, i) => {
    const card = document.createElement('div');
    card.className = 'destination-card reveal';
    if (i === 0) card.style.gridRow = 'span 2';
    card.innerHTML = `
      <img src="${d.img}" alt="${d.city}" loading="lazy" 
        onerror="this.src='https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80'">
      <div class="destination-overlay">
        <h3>${d.city}</h3>
        <p>${d.count}</p>
      </div>
    `;
    card.addEventListener('click', () => {
      window.location.href = `search-results.html?where=${d.city}`;
    });
    grid.appendChild(card);
  });
}

// Init homepage
async function initHomePage() {
  const featuredGrid = document.getElementById('featured-grid');
  const gurgaonRow = document.getElementById('gurgaon-row');
  const noidaRow = document.getElementById('noida-row');

  if (featuredGrid) renderSkeletons(featuredGrid, 8);

  const listings = await loadListings();
  currentListings = listings;

  if (featuredGrid) {
    renderCategoryTabs(listings);
    renderListingsGrid(listings, featuredGrid);
  }
  if (gurgaonRow) {
    renderListingsRow(listings.filter(l => l.city === 'Gurugram' || l.city === 'Delhi'), 'gurgaon-row');
  }
  if (noidaRow) {
    renderListingsRow(listings.filter(l => l.city === 'Noida' || l.city === 'Dehradun'), 'noida-row');
  }

  renderDestinations();
  initScrollReveal();
}

// Init listings/explore page
async function initListingsPage() {
  const grid = document.getElementById('listings-main-grid');
  if (grid) renderSkeletons(grid, 12);
  const listings = await loadListings();
  renderCategoryTabs(listings);
  if (grid) renderListingsGrid(listings, grid);
}

// Init search results page
async function initSearchResultsPage() {
  const params = new URLSearchParams(window.location.search);
  const where = params.get('where') || 'Anywhere';
  const checkin = params.get('checkin') || '';
  const checkout = params.get('checkout') || '';

  const titleEl = document.getElementById('search-title');
  const countEl = document.getElementById('results-count');

  if (titleEl) titleEl.textContent = `Stays in ${where}`;

  const grid = document.getElementById('search-results-grid');
  if (grid) renderSkeletons(grid, 8);

  const listings = await loadListings();

  const filtered = where === 'Anywhere'
    ? listings
    : listings.filter(l =>
      l.location.toLowerCase().includes(where.toLowerCase()) ||
      l.city.toLowerCase().includes(where.toLowerCase())
    );

  if (countEl) countEl.textContent = `${filtered.length} stays · ${checkin || 'Any week'} · ${checkout || ''} · Add guests`;
  if (grid) renderListingsGrid(filtered.length ? filtered : listings, grid);
}

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (page === 'home') initHomePage();
  else if (page === 'listings') initListingsPage();
  else if (page === 'search') initSearchResultsPage();
});
