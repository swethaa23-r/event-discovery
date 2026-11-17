// Navbar.jsx
// Main navigation component with responsive mobile menu and dynamic registration badge
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ registrationCount = 0 }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer when user clicks a navigation link
  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`navbar-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <div className="brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
              <path d="M8 14h.01"></path>
              <path d="M12 14h.01"></path>
              <path d="M16 14h.01"></path>
              <path d="M8 18h.01"></path>
              <path d="M12 18h.01"></path>
            </svg>
          </div>
          <div className="brand-text">
            <span>Stackly</span>
            <span className="brand-accent">Events</span>
            <span className="brand-dot"></span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Home
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Explore Events
          </NavLink>
          <NavLink
            to="/registrations"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            My Registrations
            {registrationCount > 0 && (
              <span className="badge-count" title={`${registrationCount} registered workshop(s)`}>
                {registrationCount}
              </span>
            )}
          </NavLink>
        </nav>

        {/* Right CTA / Action */}
        <div className="navbar-actions">
          <Link to="/explore" className="btn btn-outline-nav">
            Browse Workshops
          </Link>

          {/* Hamburger Mobile Menu Button */}
          <button
            type="button"
            className={`hamburger-btn ${isMobileMenuOpen ? "open" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? "show" : ""}`}>
        <div className="mobile-nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "mobile-link active" : "mobile-link")}
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) => (isActive ? "mobile-link active" : "mobile-link")}
            onClick={closeMenu}
          >
            Explore Events
          </NavLink>
          <NavLink
            to="/registrations"
            className={({ isActive }) => (isActive ? "mobile-link active" : "mobile-link")}
            onClick={closeMenu}
          >
            My Registrations
            {registrationCount > 0 && (
              <span className="badge-count mobile-badge">{registrationCount}</span>
            )}
          </NavLink>
          <Link to="/explore" className="btn btn-primary btn-mobile-cta" onClick={closeMenu}>
            Explore All Events
          </Link>
        </div>
      </div>
      
      {/* Mobile overlay backdrop */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMenu} />
      )}
    </header>
  );
}
