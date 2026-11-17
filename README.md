# Stackly Events – Event Discovery & Workshop Registration Platform

A clean, modern, and beginner-friendly React website for discovering and registering for tech workshops, design sprints, and masterclasses.

---

## 🚀 Overview

**Stackly Events** connects aspiring developers, designers, and innovators with high-impact workshops led by industry specialists. The application is built using modern **React**, standard **JavaScript ES6+**, **CSS3**, and **React Router DOM**, without complex state management libraries like Redux or backend dependencies.

---

## 🎨 Design & Color Palette

The user interface follows a professional and clean design aesthetic with smooth transitions and subtle hover effects:

- **Deep Navy Blue** (`#0f172a` / `#090e24`): Main branding, headings, and high-contrast footers.
- **Soft Violet** (`#7c3aed` / `#ede9fe`): Primary interactive buttons, active links, accents, and category tags.
- **Crisp White & Light Slate** (`#ffffff` / `#f8fafc`): Card surfaces, clean backgrounds, and readable layouts.
- **Warm Orange Accent** (`#f97316`): Seat scarcity indicators, star ratings, and registration badges.

---

## 📄 Pages Included

1. **Home Page (`/`)**:
   - Hero banner with tagline, call-to-action buttons, and key community metrics.
   - Quick category pills to browse by subject (Technology, Design, AI, Business, etc.).
   - Curated **Featured Workshops** section using the reusable `EventCard` component.
   - Value propositions ("Why Choose Stackly Events") and a step-by-step workflow.
   - Interactive newsletter subscription form and bottom call-to-action strip.

2. **Explore Events Page (`/events`)**:
   - Instant live search by workshop title, description, or speaker name.
   - Multi-parameter filtering:
     - **Category** (All, Technology, Design, AI & Data, Business, Creative Arts).
     - **Format** (All, Online, In-Person).
     - **Price** (All, Free, Paid).
   - Sorting options: Default, Price (Low to High), Price (High to Low), and Highest Rated.
   - Active filter tags with single-click remove and **"Reset Filters"** button.
   - Clean results counter and dynamic `EmptyState` when no events match the search.

3. **Event Details Page (`/events/:id`)**:
   - Dynamic routing using `useParams()`.
   - Breadcrumb navigation (`Home > Explore Events > Event Title`).
   - Comprehensive event presentation (`EventDetails` component):
     - Date, time, venue/stream, and live seats remaining counter.
     - High-definition event banner photograph.
     - Speaker biography card with instructor photo, role, and company.
     - Detailed workshop curriculum and "What You Will Learn" checklist.
     - Timeline agenda with scheduled time slots.
     - Prerequisites and equipment guidelines.
   - Sticky registration sidebar with embedded `RegistrationForm`.
   - "Copy Event Link" share utility with visual copy confirmation.

4. **My Registrations Page (`/my-registrations`)**:
   - Displays all registered workshops persisted in the browser's `localStorage`.
   - Summary cards displaying Ticket ID (e.g., `STK-593821`), event date, time, location, and attendee information.
   - **"View Digital Pass"** popup modal featuring a printable ticket pass and attendee barcode design.
   - **"Cancel Registration"** button with confirmation prompt, releasing the seat and updating the user interface immediately.
   - Friendly `EmptyState` component with an "Explore Upcoming Events" action button when no registrations exist.

5. **404 Not Found Page (`*`)**:
   - Friendly error display with quick recovery links back to the Home page or Explore Events page.

---

## 🧩 Reusable Components

All components are functional, modular, and easy to maintain:

- **`Navbar`**: Responsive header with the Stackly Events logo, desktop navigation links, an interactive mobile hamburger drawer menu, and a live registration count badge.
- **`Footer`**: Consistent footer featuring brand story, navigation links, workshop categories, and a mock newsletter subscription box with feedback message.
- **`EventCard`**: Card component featuring event imagery, category badges, format indicators, ratings, speaker info, seat availability, and a direct link to event details.
- **`EventDetails`**: Component presenting full workshop curriculum, speaker card, timeline agenda, and learning outcomes.
- **`RegistrationForm`**: Controlled form with validation for name, email, number of tickets, and terms agreement, saving registrations directly to `localStorage`.
- **`EmptyState`**: Component used across the search catalog and registrations page when no items match.

---

## 🛠️ Technology Stack

- **React 19**
- **JavaScript ES6+** (Arrow functions, array methods, destructuring, template literals)
- **React Router DOM v7** (`BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, `useParams`, `useSearchParams`)
- **HTML5 & Modern CSS3** (CSS custom properties/variables, Flexbox, CSS Grid, media queries)
- **Browser LocalStorage API** for client-side persistence

---

## 💻 How to Run the Project Locally

### 1. Install dependencies:
```bash
npm install
```

### 2. Start the development server:
```bash
npm run dev
```

### 3. Open your browser:
Visit `http://localhost:5173` to explore the website.

### 4. Build for production:
```bash
npm run build
```
