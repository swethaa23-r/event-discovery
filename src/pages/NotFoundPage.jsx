// NotFoundPage.jsx
// Beautiful and simple 404 Not Found page for Stackly Events
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="section-container">
        <div className="not-found-card" data-aos="fade-up">
          {/* Simple Event-Themed Illustration */}
          <div className="not-found-illustration" aria-hidden="true">
            <svg
              width="130"
              height="130"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="event-illustration-svg"
            >
              {/* Event Ticket Background */}
              <rect
                x="15"
                y="25"
                width="90"
                height="65"
                rx="10"
                fill="#f5f3ff"
                stroke="#7c3aed"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />
              
              {/* Calendar Header Bar */}
              <path
                d="M15 35C15 29.4772 19.4772 25 25 25H95C100.523 25 105 29.4772 105 35V42H15V35Z"
                fill="#7c3aed"
              />
              
              {/* Calendar Rings */}
              <rect x="32" y="18" width="6" height="12" rx="3" fill="#0f172a" />
              <rect x="82" y="18" width="6" height="12" rx="3" fill="#0f172a" />

              {/* Ticket Notches */}
              <circle cx="15" cy="57" r="7" fill="#ffffff" stroke="#7c3aed" strokeWidth="2.5" />
              <circle cx="105" cy="57" r="7" fill="#ffffff" stroke="#7c3aed" strokeWidth="2.5" />

              {/* Magnifying Glass searching for the event */}
              <circle cx="60" cy="62" r="14" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
              <line x1="70" y1="72" x2="84" y2="86" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="60" cy="62" r="6" fill="#ede9fe" />

              {/* Sparkle Accent */}
              <path
                d="M96 15L97.5 19.5L102 21L97.5 22.5L96 27L94.5 22.5L90 21L94.5 19.5L96 15Z"
                fill="#f97316"
              />
            </svg>
          </div>

          {/* Large 404 Text */}
          <div className="not-found-number">404</div>

          {/* Friendly Message */}
          <h1 className="not-found-title">Oops! This event page doesn't exist.</h1>

          <p className="not-found-desc">
            The workshop or page you are looking for may have concluded, been moved, or the link may be incorrect.
            Explore our event calendar to discover other exciting workshops!
          </p>

          {/* Action Buttons: Back to Home + Explore Events */}
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary btn-not-found-home">
              &larr; Back to Home
            </Link>
            <Link to="/explore" className="btn btn-outline">
              Explore Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
