// EventDetailsPage.jsx
// Beginner-friendly event details page with dynamic registration form reveal & LocalStorage
import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import EventDetails from "../components/EventDetails";
import RegistrationForm from "../components/RegistrationForm";
import NotFoundPage from "./NotFoundPage";
import { eventsData } from "../data/eventsData";
import { isEventRegistered } from "../utils/storage";

export default function EventDetailsPage({ onRegistrationChange }) {
  const { id } = useParams();

  // Find the selected event from sample events array (validate ID)
  const numericId = Number(id);
  const event = !isNaN(numericId) ? eventsData.find((item) => item.id === numericId) : null;

  // State: check if user is already registered for this event
  const [isRegistered, setIsRegistered] = useState(() =>
    event ? isEventRegistered(event.id) : false
  );

  // State: toggle display of registration form when user clicks "Register Now"
  const [showForm, setShowForm] = useState(false);

  // State: copy link feedback
  const [copiedLink, setCopiedLink] = useState(false);

  // Ref to scroll to the registration card
  const formRef = useRef(null);

  useEffect(() => {
    // Scroll to top when page opens
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Handle "Register Now" button click: reveal form and scroll to it
  const handleRegisterClick = () => {
    setShowForm(true);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Handle successful registration
  const handleSuccess = () => {
    setIsRegistered(true);
    setShowForm(true); // Keep success view visible
    if (onRegistrationChange) {
      onRegistrationChange();
    }
  };

  // Copy URL link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  if (!event) {
    return <NotFoundPage />;
  }

  return (
    <div className="event-details-page">
      {/* Breadcrumbs Navigation */}
      <div className="breadcrumbs-bar">
        <div className="section-container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="crumb-separator">/</span>
            <Link to="/explore">Explore Events</Link>
            <span className="crumb-separator">/</span>
            <span className="current-crumb">{event.title}</span>
          </nav>
        </div>
      </div>

      <div className="section-container details-container">
        <div className="details-layout-grid">
          {/* Main Left Content: Banner image, title, date, location, description, speaker, agenda */}
          <main className="details-main-col">
            <EventDetails
              event={event}
              isRegistered={isRegistered}
              onRegisterClick={handleRegisterClick}
            />
          </main>

          {/* Sticky Sidebar Right: Registration Box */}
          <aside className="details-sidebar-col">
            <div className="sidebar-sticky-wrapper">
              {/* Registration Card Box */}
              <div
                id="registration-section"
                ref={formRef}
                className="sidebar-card registration-box-container"
              >
                {/* If user hasn't clicked Register Now yet and is not registered, show the action card */}
                {!showForm && !isRegistered ? (
                  <div className="pre-registration-card">
                    <div className="pre-reg-header">
                      <span className="pre-reg-label">RESERVE YOUR SEAT</span>
                      <h3 className="pre-reg-title">Join this Workshop</h3>
                      <p className="pre-reg-desc">
                        Instant digital pass saved to your browser. Zero hassle, 100% free cancellation.
                      </p>
                    </div>

                    <div className="pre-reg-meta">
                      <div className="pre-meta-row">
                        <span>Admission:</span>
                        <strong className={event.isFree ? "free-text" : "paid-text"}>
                          {event.isFree ? "Free Admission" : `$${event.price} Ticket`}
                        </strong>
                      </div>
                      <div className="pre-meta-row">
                        <span>Format:</span>
                        <strong>{event.format} ({event.location})</strong>
                      </div>
                      <div className="pre-meta-row">
                        <span>Availability:</span>
                        <strong className="seats-highlight">
                          Only {event.seatsLeft} seats remaining
                        </strong>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-primary btn-register-trigger"
                      onClick={handleRegisterClick}
                    >
                      🎟️ Register Now &rarr;
                    </button>
                  </div>
                ) : (
                  /* Display the simple Registration Form when user clicks Register Now */
                  <RegistrationForm
                    event={event}
                    isAlreadyRegistered={isRegistered}
                    onRegistrationSuccess={handleSuccess}
                  />
                )}
              </div>

              {/* Share & Quick Actions Card */}
              <div className="sidebar-card share-card">
                <h4 className="share-title">Share this Workshop</h4>
                <p className="share-sub">Invite a friend or study buddy to attend together.</p>
                
                <button
                  type="button"
                  className="btn btn-outline btn-copy-link"
                  onClick={handleCopyLink}
                >
                  {copiedLink ? "✓ Event Link Copied!" : "📋 Copy Event Link"}
                </button>

                <div className="sidebar-secondary-links">
                  <Link to="/explore" className="back-link">
                    &larr; Back to all workshops
                  </Link>
                </div>
              </div>

              {/* Organizer Guarantee Box */}
              <div className="sidebar-card guarantee-box">
                <div className="guarantee-item">
                  <span className="g-icon">🛡️</span>
                  <div>
                    <strong>100% Free Cancellation</strong>
                    <p>Cancel your seat anytime from your dashboard if plans change.</p>
                  </div>
                </div>
                <div className="guarantee-item">
                  <span className="g-icon">🎥</span>
                  <div>
                    <strong>Session Recording & Slides</strong>
                    <p>Attendees receive downloadable resources following the session.</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
