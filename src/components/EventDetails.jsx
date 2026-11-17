// EventDetails.jsx
// Reusable event information display component showing banner, description, speaker, and register button

export default function EventDetails({ event, isRegistered = false, onRegisterClick }) {
  if (!event) return null;

  return (
    <div className="event-details-content">
      {/* Hero Header Area */}
      <div className="details-header">
        <div className="details-tags">
          <span className="badge category-badge">{event.category}</span>
          <span className="badge format-badge">{event.format}</span>
          {event.isFree ? (
            <span className="badge price-free-badge">Free Event</span>
          ) : (
            <span className="badge price-paid-badge">${event.price} Admission</span>
          )}
          {isRegistered && (
            <span className="badge format-badge inperson">✓ Confirmed Attendee</span>
          )}
        </div>

        <h1 className="details-title">{event.title}</h1>

        <p className="details-tagline">{event.shortDescription}</p>

        {/* Quick Highlights Bar: Date, Location, Time, Seats */}
        <div className="details-quick-meta">
          <div className="quick-meta-box">
            <span className="q-icon">📅</span>
            <div>
              <span className="q-label">Date</span>
              <strong className="q-val">{event.date}</strong>
            </div>
          </div>

          <div className="quick-meta-box">
            <span className="q-icon">⏰</span>
            <div>
              <span className="q-label">Time</span>
              <strong className="q-val">{event.time}</strong>
            </div>
          </div>

          <div className="quick-meta-box">
            <span className="q-icon">📍</span>
            <div>
              <span className="q-label">Location</span>
              <strong className="q-val">{event.location}</strong>
            </div>
          </div>

          <div className="quick-meta-box">
            <span className="q-icon">👥</span>
            <div>
              <span className="q-label">Seat Availability</span>
              <strong className="q-val highlight-orange">{event.seatsLeft} of {event.seatsTotal} left</strong>
            </div>
          </div>
        </div>

        {/* Action Button: Register Now */}
        <div className="details-header-action">
          {isRegistered ? (
            <div className="registered-alert-pill">
              <span>✓ You are registered for this event!</span>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-primary btn-details-register"
              onClick={onRegisterClick}
            >
              🎟️ Register Now &rarr;
            </button>
          )}
        </div>
      </div>

      {/* Selected Event Banner Image */}
      <div className="details-banner">
        <img
          src={event.image}
          alt={event.title}
          className="details-banner-img"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80";
          }}
        />
      </div>

      {/* Speaker Bio Card */}
      <div className="speaker-profile-card">
        <img
          src={event.speaker.avatar}
          alt={event.speaker.name}
          className="speaker-avatar-lg"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80";
          }}
        />
        <div className="speaker-info-lg">
          <span className="speaker-kicker">Workshop Instructor</span>
          <h3 className="speaker-name-lg">{event.speaker.name}</h3>
          <p className="speaker-title-lg">
            {event.speaker.role} • <span className="highlight-company">{event.speaker.company}</span>
          </p>
          <p className="speaker-bio-text">
            Recognized industry specialist leading technical masterclasses and hands-on professional labs. 
            Passionate about mentoring engineers and creatives to accelerate their career growth.
          </p>
        </div>
      </div>

      {/* Event Description Section */}
      <section className="details-section">
        <h2 className="section-title">Event Description</h2>
        <p className="section-paragraph">{event.fullDescription}</p>
      </section>

      {/* What You Will Learn */}
      {event.learnings && event.learnings.length > 0 && (
        <section className="details-section">
          <h2 className="section-title">What You Will Learn</h2>
          <div className="learnings-grid">
            {event.learnings.map((item, index) => (
              <div key={index} className="learning-item">
                <span className="check-bullet">✓</span>
                <span className="learning-text">{item}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Workshop Agenda Schedule */}
      {event.agenda && event.agenda.length > 0 && (
        <section className="details-section">
          <h2 className="section-title">Session Schedule & Topics</h2>
          <div className="agenda-timeline">
            {event.agenda.map((slot, index) => (
              <div key={index} className="agenda-item">
                <div className="agenda-time-badge">{slot.time}</div>
                <div className="agenda-topic-content">
                  <h4 className="agenda-topic-title">{slot.topic}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Prerequisites & Requirements */}
      <section className="details-section prerequisites-box">
        <h3 className="prereq-title">📋 Prerequisites & Equipment</h3>
        <p className="prereq-desc">{event.prerequisites}</p>
      </section>
    </div>
  );
}
