// EmptyState.jsx
// Reusable empty state component for search results, filters, and empty registrations
import { Link } from "react-router-dom";

export default function EmptyState({
  title = "No Items Found",
  description = "We couldn't find what you were looking for. Try adjusting your search or filters.",
  actionText = "Browse All Events",
  actionLink = "/explore",
  onAction = null,
  icon = null
}) {
  return (
    <div className="empty-state-card">
      <div className="empty-state-icon">
        {icon || (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        )}
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-desc">{description}</p>
      
      <div className="empty-state-actions">
        {onAction ? (
          <button type="button" onClick={onAction} className="btn btn-primary">
            {actionText}
          </button>
        ) : actionLink ? (
          <Link to={actionLink} className="btn btn-primary">
            {actionText}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
