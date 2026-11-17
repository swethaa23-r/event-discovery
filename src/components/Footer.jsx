// Footer.jsx
// Professional, consistent footer component for Stackly Events with updated contact and social links
import { useState } from "react";
import { Link } from "react-router-dom";

const currentYear = new Date().getFullYear();

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [footerEmailError, setFooterEmailError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleEmailChange = (e) => {
    setNewsletterEmail(e.target.value);
    if (footerEmailError) {
      setFooterEmailError("");
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = newsletterEmail.trim();

    // JavaScript-based validation (no native HTML5 popup)
    if (!email) {
      setFooterEmailError("Please enter your email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFooterEmailError("Invalid email format.");
      return;
    }

    setFooterEmailError("");
    setSubscribed(true);
    setNewsletterEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="footer-root">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1: Brand, Tagline & Social Media Icons */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <div className="brand-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <span className="brand-title">Stackly<span className="brand-accent">Events</span></span>
            </div>

            <p className="footer-desc">
              Stackly Events is your go-to discovery and registration platform for high-impact 
              workshops, conferences, and masterclasses led by verified industry leaders.
            </p>

            {/* Social Media Icons below tagline (redirecting to 404 page) */}
            <div className="footer-social-icons">
              {/* Twitter / X */}
              <Link to="/social/twitter" className="social-icon-btn" title="Follow us on Twitter / X" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>

              {/* LinkedIn */}
              <Link to="/social/linkedin" className="social-icon-btn" title="Connect on LinkedIn" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
                </svg>
              </Link>

              {/* Instagram */}
              <Link to="/social/instagram" className="social-icon-btn" title="Follow us on Instagram" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>

              {/* Facebook */}
              <Link to="/social/facebook" className="social-icon-btn" title="Join our Facebook Community" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.704 0-1.28.163-1.636.467-.357.304-.515.823-.515 1.708v1.805h4.333l-.613 3.667h-3.72v7.98H9.101z"/>
                </svg>
              </Link>

              {/* YouTube */}
              <Link to="/social/youtube" className="social-icon-btn" title="Watch on YouTube" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </Link>
            </div>

            <div className="footer-badge-feature">
              <span className="sparkle-icon">✦</span>
              <span>100% Verified Instructors & Instant Tickets</span>
            </div>
          </div>

          {/* Column 2: Useful Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home Overview</Link></li>
              <li><Link to="/explore">Explore Events</Link></li>
              <li><Link to="/registrations">My Registrations</Link></li>
              <li>
                <a
                  href="/#featured-section"
                  onClick={(e) => {
                    if (window.location.pathname === "/") {
                      e.preventDefault();
                      document.getElementById("featured-section")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Featured Event
                </a>
              </li>
              <li>
                <a
                  href="/#why-choose"
                  onClick={(e) => {
                    if (window.location.pathname === "/") {
                      e.preventDefault();
                      document.getElementById("why-choose")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Why Choose Stackly
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Event Categories */}
          <div className="footer-col">
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links">
              <li><Link to="/explore?category=Technology">Technology</Link></li>
              <li><Link to="/explore?category=Business">Business</Link></li>
              <li><Link to="/explore?category=Design">Design</Link></li>
              <li><Link to="/explore?category=Education">Education</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Information with requested Address & Phone Number */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Contact Information</h4>
            <div className="contact-details-list">
              {/* Updated Address */}
              <div className="contact-item">
                <span className="c-icon">📍</span>
                <span>MMR Complex, Chinna Thirupathi, Near Chinna Muniyappan Kovil, Salem - 636 008</span>
              </div>
              {/* Updated Phone Number */}
              <div className="contact-item">
                <span className="c-icon">📞</span>
                <a href="tel:9090909090">Ph.no : 9090909090</a>
              </div>
              <div className="contact-item">
                <span className="c-icon">✉️</span>
                <a href="mailto:support@stacklyevents.com">support@stacklyevents.com</a>
              </div>
              <div className="contact-item">
                <span className="c-icon">⏰</span>
                <span>Mon – Fri: 9:00 AM – 6:00 PM IST</span>
              </div>
            </div>

            {/* Quick newsletter subscription with JavaScript-based validation */}
            <div className="footer-mini-newsletter">
              <span className="mini-nl-label">Stay in the loop:</span>
              {subscribed ? (
                <div className="newsletter-success">
                  <span>✓ Subscribed successfully!</span>
                </div>
              ) : (
                <form className="newsletter-form" onSubmit={handleSubscribe} noValidate>
                  <div className="mini-nl-group">
                    <input
                      type="email"
                      className={`newsletter-input ${footerEmailError ? "input-has-error" : ""}`}
                      placeholder="Enter email for alerts"
                      value={newsletterEmail}
                      onChange={handleEmailChange}
                    />
                    <button type="submit" className="btn btn-newsletter" aria-label="Subscribe">
                      Join
                    </button>
                  </div>
                  {footerEmailError && (
                    <span className="footer-error-text" role="alert">
                      ⚠️ {footerEmailError}
                    </span>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar with links redirecting to 404 page */}
        <div className="footer-bottom">
          <p className="copyright-text">
            © {currentYear} Stackly Events – Event Discovery & Workshop Registration Platform.
          </p>
          <div className="footer-bottom-links">
            {/* Privacy policy redirecting to 404 page */}
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="dot-divider">•</span>
            {/* Terms of service redirecting to 404 page */}
            <Link to="/terms-of-service">Terms of Service</Link>
            <span className="dot-divider">•</span>
            {/* Explore events in bottom strip redirecting to 404 page */}
            <Link to="/explore-events">Explore Events</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
