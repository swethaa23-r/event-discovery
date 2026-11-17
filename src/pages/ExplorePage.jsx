// ExplorePage.jsx
// Beginner-friendly Explore Events page with Event Highlights, Formats Filter, search, categories, and date sorting
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AOS from "aos";
import EventCard from "../components/EventCard";
import EmptyState from "../components/EmptyState";
import { eventsData, CATEGORIES } from "../data/eventsData";
import { isEventRegistered } from "../utils/storage";

export default function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL query params
  const categoryParam = searchParams.get("category");
  const selectedCategory = categoryParam && CATEGORIES.includes(categoryParam) ? categoryParam : "All";
  
  // Format filter derived from URL searchParams (Online, In-Person, Hybrid, or All)
  const selectedFormat = searchParams.get("format") || "All";

  // 1. Search input state
  const [searchTerm, setSearchTerm] = useState("");

  // 2. Sort by date option state
  const [sortOrder, setSortOrder] = useState("default");

  // Section A: 3 Special Highlighted Events
  const highlightedEvents = eventsData.filter((e) => e.featured || [1, 2, 5].includes(e.id)).slice(0, 3);

  // Section B: 3 Event Formats
  const eventFormats = [
    {
      id: "Online",
      name: "Online Events",
      badge: "🌐 100% Virtual",
      image: "/images/format-online.jpg",
      description: "Interactive virtual livestreams, collaborative breakout sessions, and real-time mentor Q&A."
    },
    {
      id: "In-Person",
      name: "In-Person Events",
      badge: "📍 Physical Venues",
      image: "/images/format-offline.jpg",
      description: "Face-to-face workshops in tech hubs, hands-on workstation labs, and live community networking."
    },
    {
      id: "Hybrid",
      name: "Hybrid Events",
      badge: "⚡ Dual Access",
      image: "/images/format-hybrid.jpg",
      description: "Flexible format offering both in-person venue seats and high-definition virtual interactive streaming."
    }
  ];

  // Handle format card click to filter
  const handleFormatSelect = (formatId) => {
    const nextFormat = selectedFormat === formatId ? "All" : formatId;
    const nextParams = {};
    if (selectedCategory !== "All") {
      nextParams.category = selectedCategory;
    }
    if (nextFormat !== "All") {
      nextParams.format = nextFormat;
    }
    setSearchParams(nextParams);
  };

  // Handle category button click
  const handleCategoryClick = (category) => {
    const nextParams = {};
    if (category !== "All") {
      nextParams.category = category;
    }
    if (selectedFormat !== "All") {
      nextParams.format = selectedFormat;
    }
    setSearchParams(nextParams);
  };

  // Reset all search and filter values
  const handleReset = () => {
    setSearchTerm("");
    setSortOrder("default");
    setSearchParams({});
  };

  // Filter and sort events cleanly
  const filteredEvents = eventsData
    .filter((event) => {
      // Search by event title/name
      const term = searchTerm.toLowerCase().trim();
      const matchesName = !term || event.title.toLowerCase().includes(term);

      // Filter by category
      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory;

      // Filter by format
      const matchesFormat =
        selectedFormat === "All" ||
        event.format.toLowerCase().includes(selectedFormat.toLowerCase());

      return matchesName && matchesCategory && matchesFormat;
    })
    .sort((a, b) => {
      // Sort by date
      if (sortOrder === "date-asc") {
        return new Date(a.isoDate) - new Date(b.isoDate);
      }
      if (sortOrder === "date-desc") {
        return new Date(b.isoDate) - new Date(a.isoDate);
      }
      return 0; // Default order
    });

  // Re-trigger AOS animations whenever filtered events list updates
  useEffect(() => {
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 50);
    return () => clearTimeout(timer);
  }, [filteredEvents]);

  return (
    <div className="explore-page">
      {/* Header Banner */}
      <section className="explore-hero">
        <div className="section-container">
          <span className="section-kicker">Discover Workshops</span>
          <h1 className="explore-title">Explore All Events</h1>
          <p className="explore-subtext">
            Search by event name, filter by your favorite category, or explore by format to find the perfect session.
          </p>

          {/* Search Input Bar */}
          <div className="search-bar-wrapper">
            <div className="search-input-group">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search events by name (e.g. React, Figma, AI, Cloud)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchTerm("")}
                  title="Clear search"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          Section A: Event Highlights (Top 3 Special Highlighted Events)
          - Visually attractive highlighted events section
          - Unique images, Featured badge, View Details buttons
          =================================================================== */}
      <section className="explore-highlights-section" data-aos="fade-up">
        <div className="section-container">
          <div className="highlights-header">
            <span className="section-kicker">Curated Picks</span>
            <h2 className="section-heading-sm">Event Highlights</h2>
            <p className="section-subtext-sm">
              Featured masterclasses and keynotes selected for maximum career and technical impact.
            </p>
          </div>

          <div className="highlights-grid">
            {highlightedEvents.map((event, idx) => (
              <article
                key={event.id}
                className="highlight-card"
                data-aos="fade-up"
                data-aos-delay={(idx + 1) * 80}
              >
                <div className="highlight-media-box">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="highlight-img"
                    onError={(e) => {
                      e.target.src = "/images/event-1.jpg";
                    }}
                  />
                  <span className="highlight-badge">⭐ FEATURED</span>
                  <span className="highlight-cat-tag">{event.category}</span>
                </div>

                <div className="highlight-body">
                  <div className="highlight-meta-row">
                    <span>📅 {event.date}</span>
                    <span>📍 {event.location}</span>
                  </div>

                  <h3 className="highlight-title">
                    <Link to={`/event/${event.id}`}>{event.title}</Link>
                  </h3>

                  <p className="highlight-desc">{event.shortDescription}</p>

                  <div className="highlight-footer">
                    <span className="highlight-price">
                      {event.isFree ? "Free Entry" : `$${event.price}`}
                    </span>
                    <Link to={`/event/${event.id}`} className="btn btn-primary btn-sm btn-highlight-view">
                      View Details &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          Section B: Find Events Near You / Event Formats
          - Online Events, Offline Events, Hybrid Events
          - Clicking a format filters the events list accordingly
          =================================================================== */}
      <section className="explore-formats-section" data-aos="fade-up">
        <div className="section-container">
          <div className="formats-header">
            <span className="section-kicker">Browse by Experience</span>
            <h2 className="section-heading-sm">Find Events Near You & By Format</h2>
            <p className="section-subtext-sm">
              Click a format card to filter the events list below by your preferred learning style.
            </p>
          </div>

          <div className="formats-interactive-grid">
            {eventFormats.map((fmt) => (
              <div
                key={fmt.id}
                className={`format-choice-card ${selectedFormat === fmt.id ? "active-format" : ""}`}
                onClick={() => handleFormatSelect(fmt.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleFormatSelect(fmt.id);
                  }
                }}
              >
                <div className="format-img-wrapper">
                  <img src={fmt.image} alt={fmt.name} className="format-choice-img" />
                  <span className="format-badge-pill">{fmt.badge}</span>
                </div>
                <div className="format-choice-body">
                  <h3 className="format-choice-title">{fmt.name}</h3>
                  <p className="format-choice-desc">{fmt.description}</p>
                  <button
                    type="button"
                    className={`btn btn-sm ${selectedFormat === fmt.id ? "btn-primary" : "btn-outline"}`}
                  >
                    {selectedFormat === fmt.id ? "✓ Format Selected" : `Explore ${fmt.name}`}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Events List & Controls */}
      <section className="explore-main-section">
        <div className="section-container">
          {/* Controls Bar: Category Buttons + Sort by Date */}
          <div className="explore-controls-panel">
            {/* Category Filter Buttons */}
            <div className="category-buttons-group">
              <span className="control-label">Categories:</span>
              <div className="category-buttons-list">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`btn-category-filter ${selectedCategory === cat ? "active" : ""}`}
                    onClick={() => handleCategoryClick(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort by Date Option */}
            <div className="sort-controls-group">
              <label htmlFor="date-sort-select" className="control-label">
                Sort by Date:
              </label>
              <select
                id="date-sort-select"
                className="sort-dropdown"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="default">Default Order</option>
                <option value="date-asc">📅 Date: Earliest First</option>
                <option value="date-desc">📅 Date: Latest First</option>
              </select>
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="explore-results-bar">
            <p className="results-count-text">
              Showing <strong>{filteredEvents.length}</strong> of {eventsData.length} events
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {selectedFormat !== "All" && ` (${selectedFormat} Format)`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>

            {(searchTerm || selectedCategory !== "All" || selectedFormat !== "All" || sortOrder !== "default") && (
              <button
                type="button"
                className="btn-clear-all-filters"
                onClick={handleReset}
              >
                Reset All Filters
              </button>
            )}
          </div>

          {/* Event Cards Grid or Empty State */}
          {filteredEvents.length > 0 ? (
            <div className="events-grid">
              {filteredEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  index={index}
                  isRegistered={isEventRegistered(event.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Events Found"
              description={`We couldn't find any events matching your current filters.`}
              actionText="Reset Filters & Show All Events"
              onAction={handleReset}
            />
          )}
        </div>
      </section>
    </div>
  );
}
