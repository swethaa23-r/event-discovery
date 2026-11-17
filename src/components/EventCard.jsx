// EventCard.jsx
// Reusable event card component used in Home Page and Explore Events Page
import { Link } from "react-router-dom";

export default function EventCard({ event, isRegistered = false, index = 0 }) {
  const {
    id,
    title,
    category,
    format,
    date,
    time,
    location,
    price,
    isFree,
    rating,
    seatsLeft,
    image,
    speaker,
    shortDescription
  } = event;

  const animationDelay = ((index % 6) + 1) * 75;

  return (
    <article
      className="event-card"
      data-aos="fade-up"
      data-aos-delay={animationDelay}
    >
      {/* Event Image Banner */}
      <div className="card-media">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="card-image"
          onError={(e) => {
            // Fallback image in case of network issue
            e.target.src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80";
          }}
        />
        {/* Top Badges */}
        <div className="card-top-badges">
          <span className="badge category-badge">{category}</span>
          <span className={`badge format-badge ${format.toLowerCase().replace("-", "")}`}>
            {format === "Online" ? "🌐 Online" : "📍 In-Person"}
          </span>
        </div>

        {/* Free or Price Tag Floating Badge */}
        <div className="price-tag-overlay">
          {isFree ? (
            <span className="price-badge free">FREE</span>
          ) : (
            <span className="price-badge paid">${price}</span>
          )}
        </div>
      </div>

      {/* Card Content Area */}
      <div className="card-body">
        {/* Meta Info: Date & Rating */}
        <div className="card-meta">
          <div className="meta-item date-meta">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{date} • {time.split("-")[0].trim()}</span>
          </div>

          <div className="meta-item rating-meta">
            <span className="star-icon">★</span>
            <span className="rating-val">{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Event Title */}
        <h3 className="card-title">
          <Link to={`/event/${id}`} title={title}>
            {title}
          </Link>
        </h3>

        {/* Short Summary Description */}
        <p className="card-summary">{shortDescription}</p>

        {/* Location snippet */}
        <div className="card-location-snippet">
          <span className="loc-icon">📍</span>
          <span className="loc-text">{location}</span>
        </div>

        {/* Speaker Info */}
        <div className="card-speaker">
          <img
            src={speaker.avatar}
            alt={speaker.name}
            className="speaker-avatar"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";
            }}
          />
          <div className="speaker-details">
            <p className="speaker-name">{speaker.name}</p>
            <p className="speaker-role">{speaker.company}</p>
          </div>
        </div>

        {/* Card Footer: Seats & View Details Action */}
        <div className="card-footer">
          <div className="seats-indicator">
            {isRegistered ? (
              <span className="registered-badge-tag">✓ Registered</span>
            ) : seatsLeft <= 10 ? (
              <span className="seats-warning">
                🔥 Only {seatsLeft} seats left
              </span>
            ) : (
              <span className="seats-normal">
                {seatsLeft} seats open
              </span>
            )}
          </div>

          <div className="card-action">
            <Link to={`/event/${id}`} className="btn btn-card-details">
              View Details &rarr;
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
