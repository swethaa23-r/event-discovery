// MyRegistrationsPage.jsx
// Beginner-friendly My Registrations page with Registration Overview, Upcoming & Past Events Tabs, and LocalStorage
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import { getRegistrations, cancelRegistration } from "../utils/storage";

// Sub-component: Animated Counter for Registration Overview stats
function RegCounter({ target, duration = 1200 }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let start = null;
    let frame;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(ease * target));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return <span className="reg-overview-num">{val}</span>;
}

export default function MyRegistrationsPage({ onRegistrationChange }) {
  // 1. State for registrations loaded from LocalStorage
  const [registrations, setRegistrations] = useState(() => getRegistrations());

  // 2. State for active tab: "upcoming" or "past"
  const [activeTab, setActiveTab] = useState("upcoming");

  // 3. State for cancellation feedback banner
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // 4. State for optional digital pass modal
  const [activeTicketModal, setActiveTicketModal] = useState(null);

  // Sync state with LocalStorage using useEffect
  useEffect(() => {
    const handleStorageUpdate = () => {
      setRegistrations(getRegistrations());
    };

    window.addEventListener("storage", handleStorageUpdate);
    return () => {
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, []);

  // Classify registrations into Upcoming vs Completed based on event date
  const isPastEvent = (dateStr) => {
    if (!dateStr) return false;
    const parsed = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return !isNaN(parsed.getTime()) && parsed < today;
  };

  const upcomingList = registrations.filter((reg) => !isPastEvent(reg.eventDate));
  const completedList = registrations.filter((reg) => isPastEvent(reg.eventDate));

  // Current list based on active tab
  const displayedList = activeTab === "upcoming" ? upcomingList : completedList;

  // Handle Cancel Registration with user confirmation
  const handleCancelRegistration = (registrationId, eventTitle) => {
    const confirmed = window.confirm(
      `Are you sure you want to cancel your registration for "${eventTitle}"? Your reserved seat will be released.`
    );

    if (confirmed) {
      // Remove registration from LocalStorage
      const updatedList = cancelRegistration(registrationId);
      // Update state
      setRegistrations(updatedList);
      setFeedbackMessage(`Your registration for "${eventTitle}" has been successfully cancelled.`);

      // Notify parent to refresh navbar counter
      if (onRegistrationChange) {
        onRegistrationChange();
      }

      // Auto-hide feedback message after 5 seconds
      setTimeout(() => {
        setFeedbackMessage("");
      }, 5000);
    }
  };

  return (
    <div className="my-registrations-page">
      {/* Page Header */}
      <section className="registrations-hero">
        <div className="section-container">
          <span className="section-kicker">Attendee Portal</span>
          <h1 className="registrations-title">My Registrations</h1>
          <p className="registrations-subtext">
            View your confirmed workshop bookings, digital pass codes, and manage your registrations.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="registrations-content-section">
        <div className="section-container">
          {/* Cancellation Feedback Banner */}
          {feedbackMessage && (
            <div className="alert-notice-banner" role="status">
              <span>ℹ️ {feedbackMessage}</span>
              <button
                type="button"
                className="close-alert-btn"
                onClick={() => setFeedbackMessage("")}
                aria-label="Close notification"
              >
                ✕
              </button>
            </div>
          )}

          {/* ===================================================================
              Section A: Registration Overview Summary Cards
              - Total Registrations
              - Upcoming Events
              - Completed Events
              - Calculated dynamically from LocalStorage, updates on cancellation
              =================================================================== */}
          <div className="reg-overview-grid" data-aos="fade-up">
            <div className="reg-overview-card">
              <div className="reg-overview-icon-box total">
                <span>🎟️</span>
              </div>
              <div className="reg-overview-info">
                <RegCounter target={registrations.length} />
                <span className="reg-overview-label">Total Registrations</span>
              </div>
            </div>

            <div className="reg-overview-card">
              <div className="reg-overview-icon-box upcoming">
                <span>🚀</span>
              </div>
              <div className="reg-overview-info">
                <RegCounter target={upcomingList.length} />
                <span className="reg-overview-label">Upcoming Events</span>
              </div>
            </div>

            <div className="reg-overview-card">
              <div className="reg-overview-icon-box completed">
                <span>🏆</span>
              </div>
              <div className="reg-overview-info">
                <RegCounter target={completedList.length} />
                <span className="reg-overview-label">Completed Events</span>
              </div>
            </div>
          </div>

          {/* ===================================================================
              Section B: Upcoming & Past Events Tabs
              - Two tabs: Upcoming Events and Past Events
              - Smooth tab transitions
              =================================================================== */}
          <div className="reg-tabs-navigation" data-aos="fade-up">
            <button
              type="button"
              className={`reg-tab-btn ${activeTab === "upcoming" ? "active-tab" : ""}`}
              onClick={() => setActiveTab("upcoming")}
            >
              📅 Upcoming Events ({upcomingList.length})
            </button>
            <button
              type="button"
              className={`reg-tab-btn ${activeTab === "past" ? "active-tab" : ""}`}
              onClick={() => setActiveTab("past")}
            >
              ✓ Past Events ({completedList.length})
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="reg-tab-panel">
            {displayedList.length > 0 ? (
              <div className="registrations-wrapper">
                <div className="registrations-count-bar">
                  <span>
                    Showing <strong>{displayedList.length}</strong> {activeTab === "upcoming" ? "upcoming" : "completed"} workshop
                    {displayedList.length === 1 ? "" : "s"}.
                  </span>
                  <Link to="/explore" className="btn btn-outline btn-sm">
                    + Explore More Events
                  </Link>
                </div>

                {/* List of Registered Event Cards */}
                <div className="registrations-list">
                  {displayedList.map((reg) => (
                    <article key={reg.id} className="registration-card" data-aos="fade-up">
                      {/* Event Banner Image */}
                      <div className="reg-card-media">
                        <img
                          src={reg.eventImage}
                          alt={reg.eventTitle}
                          className="reg-card-img"
                          onError={(e) => {
                            e.target.src = "/images/event-1.jpg";
                          }}
                        />
                        <span className="reg-badge-tag">{reg.eventCategory}</span>
                      </div>

                      {/* Event Details & Registration Status */}
                      <div className="reg-card-body">
                        {/* Top Row: Ticket Code & Status */}
                        <div className="reg-card-top-row">
                          <span className="ticket-badge-pill">
                            TICKET: <strong>{reg.ticketId}</strong>
                          </span>

                          {/* Registration Status Badge */}
                          {activeTab === "upcoming" ? (
                            <span className="status-badge confirmed">
                              <span className="status-dot"></span>
                              Registration Confirmed
                            </span>
                          ) : (
                            <span className="status-badge past">
                              <span className="status-dot-gray"></span>
                              Completed Event
                            </span>
                          )}
                        </div>

                        {/* Event Title */}
                        <h3 className="reg-card-title">
                          <Link to={`/event/${reg.eventId}`}>{reg.eventTitle}</Link>
                        </h3>

                        {/* Event Date, Location, and Attendee Info */}
                        <div className="reg-card-details-grid">
                          <div className="reg-detail-item">
                            <span className="icon">📅</span>
                            <span><strong>Date:</strong> {reg.eventDate} ({reg.eventTime})</span>
                          </div>
                          <div className="reg-detail-item">
                            <span className="icon">📍</span>
                            <span><strong>Location:</strong> {reg.eventFormat} • {reg.eventLocation}</span>
                          </div>
                          <div className="reg-detail-item">
                            <span className="icon">👤</span>
                            <span><strong>Attendee:</strong> {reg.attendee.name}</span>
                          </div>
                          <div className="reg-detail-item">
                            <span className="icon">✉️</span>
                            <span><strong>Email:</strong> {reg.attendee.email}</span>
                          </div>
                          <div className="reg-detail-item">
                            <span className="icon">📞</span>
                            <span><strong>Phone:</strong> {reg.attendee.phone}</span>
                          </div>
                          <div className="reg-detail-item">
                            <span className="icon">🕒</span>
                            <span><strong>Registered On:</strong> {reg.registeredAt}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="reg-card-actions">
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => setActiveTicketModal(reg)}
                          >
                            🎟️ View Digital Pass
                          </button>

                          <Link
                            to={`/event/${reg.eventId}`}
                            className="btn btn-outline btn-sm"
                          >
                            View Event Details
                          </Link>

                          {/* Cancel Registration Button - Only available for upcoming events */}
                          {activeTab === "upcoming" && (
                            <button
                              type="button"
                              className="btn btn-danger-outline btn-sm"
                              onClick={() => handleCancelRegistration(reg.id, reg.eventTitle)}
                            >
                              Cancel Registration
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ) : (
              /* Friendly Empty State for the active tab */
              <EmptyState
                title={activeTab === "upcoming" ? "No Upcoming Registrations" : "No Past Registrations"}
                description={
                  activeTab === "upcoming"
                    ? "You don't have any upcoming registered workshops scheduled. Browse our events and book your seat today!"
                    : "You haven't attended any past events yet. Explore upcoming workshops to start your learning journey!"
                }
                actionText="Explore Events"
                actionLink="/explore"
                icon={
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.75">
                    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
                    <path d="M13 5v2"></path>
                    <path d="M13 17v2"></path>
                    <path d="M13 11v2"></path>
                  </svg>
                }
              />
            )}
          </div>
        </div>
      </section>

      {/* Digital Ticket Pass Modal */}
      {activeTicketModal && (
        <div className="modal-overlay" onClick={() => setActiveTicketModal(null)}>
          <div className="ticket-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-kicker">OFFICIAL ADMISSION TICKET</span>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setActiveTicketModal(null)}
                aria-label="Close ticket pass"
              >
                ✕
              </button>
            </div>

            <div className="ticket-pass-body">
              <div className="ticket-pass-top">
                <span className="pass-brand">Stackly Events Pass</span>
                <span className="pass-code">{activeTicketModal.ticketId}</span>
              </div>

              <h2 className="pass-event-title">{activeTicketModal.eventTitle}</h2>

              <div className="pass-meta-grid">
                <div>
                  <span className="p-label">Date & Time</span>
                  <strong>{activeTicketModal.eventDate} ({activeTicketModal.eventTime})</strong>
                </div>
                <div>
                  <span className="p-label">Location / Format</span>
                  <strong>{activeTicketModal.eventFormat} • {activeTicketModal.eventLocation}</strong>
                </div>
                <div>
                  <span className="p-label">Attendee Name</span>
                  <strong>{activeTicketModal.attendee.name}</strong>
                </div>
                <div>
                  <span className="p-label">Email Address</span>
                  <strong>{activeTicketModal.attendee.email}</strong>
                </div>
                <div>
                  <span className="p-label">Registration Code</span>
                  <strong className="code-text">{activeTicketModal.id}</strong>
                </div>
                <div>
                  <span className="p-label">Status</span>
                  <strong className="status-text-green">✓ Confirmed Seat</strong>
                </div>
              </div>

              <div className="ticket-barcode-strip">
                <div className="barcode-bars">||| | |||| | ||||| ||| |||| | |||||| || | |||</div>
                <span className="barcode-label">Scan at venue entrance or presentation check-in</span>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => window.print()}
              >
                🖨️ Print Pass
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => setActiveTicketModal(null)}
              >
                Close Pass
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
