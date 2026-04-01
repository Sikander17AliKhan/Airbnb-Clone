# 🏠 Airbnb Clone – Frontend Project

A fully responsive Airbnb-style frontend clone built with **HTML5, CSS3, and Vanilla JavaScript**. No frameworks or build tools required.

---

## 📁 Project Structure

```
airbnb-clone/
├── index.html                  ← Homepage
├── data/
│   └── listings.json           ← 16 sample listings (INR prices)
├── css/
│   ├── style.css               ← Global styles, layout, components
│   ├── navbar.css              ← Sticky navbar, dropdown
│   ├── cards.css               ← Listing card styles
│   └── animations.css          ← All animations & transitions
├── js/
│   ├── app.js                  ← Core app logic (navbar, wishlist, toast)
│   ├── listings.js             ← Listing rendering & category filtering
│   └── animations.js           ← UI interactions (tabs, price calc, FAQ)
├── pages/
│   ├── listings.html           ← Explore all listings
│   ├── listing-details.html    ← Single listing with booking card
│   ├── search-results.html     ← Search results + map placeholder
│   ├── login.html              ← Login page
│   ├── signup.html             ← Sign up page
│   ├── profile.html            ← User profile with tabs
│   ├── wishlist.html           ← Saved listings
│   ├── booking.html            ← Confirm & pay
│   ├── checkout.html           ← Booking confirmed page
│   ├── host-dashboard.html     ← Host stats, reservations, earnings
│   ├── add-listing.html        ← 6-step listing creation form
│   ├── my-trips.html           ← Upcoming/past trips
│   ├── my-listings.html        ← Host's active listings
│   ├── help.html               ← Help Centre with FAQ accordion
│   └── 404.html                ← Error page
└── assets/
    └── navbar.html             ← Navbar template reference
```

---

## 🚀 How to Run Locally

### Option 1: VS Code Live Server (Recommended)
1. Install [VS Code](https://code.visualstudio.com/)
2. Install the **Live Server** extension
3. Open the `airbnb-clone` folder in VS Code
4. Right-click `index.html` → **Open with Live Server**
5. Browser opens at `http://127.0.0.1:5500`

### Option 2: Python HTTP Server
```bash
cd airbnb-clone
python3 -m http.server 8080
# Open http://localhost:8080
```

### Option 3: Node.js HTTP Server
```bash
cd airbnb-clone
npx serve .
# Or: npx http-server .
```

> ⚠️ **Important**: Must be served via HTTP (not `file://`) because the app fetches `listings.json` using the Fetch API, which requires a server context.

---

## ✨ Features

### UI/UX
- ✅ Airbnb-exact design language (colors, fonts, spacing)
- ✅ Sticky navbar with scroll detection
- ✅ Compact search bar appears on scroll
- ✅ Profile dropdown with animation
- ✅ Page fade-in transitions
- ✅ Toast notifications

### Homepage
- ✅ Full search bar (Where / Check-in / Check-out / Guests)
- ✅ Category tabs (Beach, Mountain, City, Camping, Islands, etc.)
- ✅ Horizontal scroll listing rows with arrow buttons
- ✅ Category-filtered featured listings grid
- ✅ Popular destinations section
- ✅ Inspiration CTA banner
- ✅ Full footer with 4 columns

### Listing Cards
- ✅ Hover lift + image zoom effect
- ✅ Animated wishlist heart toggle
- ✅ "Guest favourite" badge
- ✅ Staggered card entrance animations
- ✅ Skeleton loading state

### Listing Details
- ✅ 5-photo gallery grid (2 + 2 layout)
- ✅ Full-screen gallery modal with keyboard navigation
- ✅ Host info, highlights, amenities grid
- ✅ Sticky booking card with date picker
- ✅ Live price calculator (nights × rate + fees)
- ✅ Reviews section

### Booking Flow
- ✅ booking.html – payment method selection, price breakdown
- ✅ checkout.html – booking confirmation with code

### Host Dashboard
- ✅ Stats cards (earnings, bookings, rating, listings)
- ✅ Upcoming reservations list
- ✅ Recent reviews
- ✅ Monthly earnings bar chart
- ✅ Listing performance bars

### Add Listing
- ✅ 6-step form wizard
- ✅ Property type selector
- ✅ Guest/bedroom/bathroom counters
- ✅ Amenity checkbox grid
- ✅ Photo upload area
- ✅ Live pricing calculator

### Other Pages
- ✅ Login / Signup with social buttons
- ✅ Profile with 5 tabs (info, security, payments, notifications, privacy)
- ✅ Wishlist (persisted in localStorage)
- ✅ My Trips (upcoming/past/cancelled tabs)
- ✅ My Listings (with edit/pause controls)
- ✅ Help Centre with FAQ accordion
- ✅ 404 Error page

---

## 🎨 Design Tokens

| Token | Value |
|-------|-------|
| Primary | `#FF385C` |
| Text dark | `#222222` |
| Text light | `#717171` |
| Border | `#DDDDDD` |
| Background | `#F7F7F7` |
| Border radius | `12px–24px` |
| Font | DM Sans (Google Fonts) |

---

## 💾 Data

16 sample listings in `data/listings.json` covering:
- Delhi, Gurugram, Noida, Dehradun
- Goa, Mumbai, Jaipur, Udaipur
- Manali, Coorg, Ooty, Lonavala
- Kerala, Nashik, Andaman, Spiti Valley

Each listing includes: id, title, location, city, type, price (INR), rating, reviews, description, amenities, guests, bedrooms, beds, bathrooms, host, superhost, image URLs, category, badge.

---

## 📱 Responsive Breakpoints

- **Desktop**: 1280px max-width container
- **Tablet** (≤1024px): Single-column details, 2-col grid
- **Mobile** (≤768px): Collapsed navbar, stacked search bar
- **Small mobile** (≤480px): Single-column everywhere

---

## 🧑‍💻 Built for

College frontend project demonstrating:
- Semantic HTML5 structure
- CSS3 Flexbox + Grid layouts
- CSS custom properties (variables)
- Vanilla JS modules (no framework)
- LocalStorage persistence
- Fetch API for JSON data
- Responsive design with media queries
- Accessible ARIA labels and keyboard navigation
