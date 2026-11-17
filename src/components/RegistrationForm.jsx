// RegistrationForm.jsx
// Beginner-friendly registration form with validation and LocalStorage saving
import { useState } from "react";
import { Link } from "react-router-dom";
import { saveRegistration, isEventRegistered } from "../utils/storage";

export default function RegistrationForm({ event, onRegistrationSuccess, isAlreadyRegistered = false }) {
  // 1. Form inputs state using useState
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  // 2. Validation errors state using useState
  const [errors, setErrors] = useState({});

  // 3. Duplicate registration warning state
  const [duplicateError, setDuplicateError] = useState("");

  // 4. Successful registration confirmation state
  const [confirmedTicket, setConfirmedTicket] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (duplicateError) {
      setDuplicateError("");
    }
  };

  // JavaScript validation for a single field
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "name":
        if (!value.trim()) return "Full Name is required.";
        if (value.trim().length < 2) return "Full Name must be at least 2 characters.";
        return "";
      case "email": {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return "Email Address is required.";
        if (!emailPattern.test(value.trim())) return "Please enter a valid email address (e.g. alex@example.com).";
        return "";
      }
      case "phone": {
        const cleanedPhone = value.replace(/[\s\-()+]/g, "");
        if (!value.trim()) return "Phone Number is required.";
        if (cleanedPhone.length < 10 || !/^\d+$/.test(cleanedPhone)) {
          return "Please enter a valid phone number (at least 10 digits).";
        }
        return "";
      }
      default:
        return "";
    }
  };

  // Form validation function
  const validate = () => {
    const newErrors = {};

    const nameErr = validateField("name", formData.name);
    if (nameErr) newErrors.name = nameErr;

    const emailErr = validateField("email", formData.email);
    if (emailErr) newErrors.email = emailErr;

    const phoneErr = validateField("phone", formData.phone);
    if (phoneErr) newErrors.phone = phoneErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check validation first
    if (!validate()) {
      return;
    }

    // Prevent duplicate registration for the same event
    if (isEventRegistered(event.id)) {
      setDuplicateError("You have already registered for this event. Duplicate registrations are not allowed.");
      return;
    }

    setIsSubmitting(true);

    // Save registration to LocalStorage
    const saved = saveRegistration(event, formData);

    if (saved) {
      setConfirmedTicket(saved);
      if (onRegistrationSuccess) {
        onRegistrationSuccess(saved);
      }
    }

    setIsSubmitting(false);
  };

  // If already registered prior to submitting
  if (isAlreadyRegistered && !confirmedTicket) {
    return (
      <div className="registration-already-card">
        <div className="already-icon">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h3 className="already-title">You're Already Registered!</h3>
        <p className="already-desc">
          Your seat is already confirmed for <strong>{event.title}</strong>. 
          Duplicate registrations for the same event are prevented.
        </p>
        <div className="already-actions">
          <Link to="/registrations" className="btn btn-primary">
            View in My Registrations
          </Link>
          <Link to="/explore" className="btn btn-outline">
            Browse Other Events
          </Link>
        </div>
      </div>
    );
  }

  // After successful registration: display success message and allow navigating to My Registrations
  if (confirmedTicket) {
    return (
      <div className="registration-success-card">
        <div className="success-badge-icon">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <h3 className="success-heading">Registration Successful! 🎉</h3>
        <p className="success-subheading">
          Congratulations, <strong>{confirmedTicket.attendee.name}</strong>! Your ticket has been generated and saved locally.
        </p>

        {/* Ticket Summary Box */}
        <div className="ticket-summary-box">
          <div className="ticket-header">
            <span className="ticket-label">OFFICIAL PASS</span>
            <span className="ticket-code">{confirmedTicket.ticketId}</span>
          </div>
          <div className="ticket-details-grid">
            <div>
              <span className="t-label">Event:</span>
              <strong className="t-val">{confirmedTicket.eventTitle}</strong>
            </div>
            <div>
              <span className="t-label">Date:</span>
              <strong className="t-val">{confirmedTicket.eventDate} ({confirmedTicket.eventTime})</strong>
            </div>
            <div>
              <span className="t-label">Location:</span>
              <strong className="t-val">{confirmedTicket.eventLocation}</strong>
            </div>
            <div>
              <span className="t-label">Attendee:</span>
              <strong className="t-val">{confirmedTicket.attendee.name}</strong>
            </div>
            <div>
              <span className="t-label">Email:</span>
              <strong className="t-val">{confirmedTicket.attendee.email}</strong>
            </div>
            <div>
              <span className="t-label">Phone:</span>
              <strong className="t-val">{confirmedTicket.attendee.phone}</strong>
            </div>
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="success-actions">
          <Link to="/registrations" className="btn btn-primary">
            Go to My Registrations &rarr;
          </Link>
          <Link to="/explore" className="btn btn-outline">
            Explore More Events
          </Link>
        </div>
      </div>
    );
  }

  // Standard Registration Form
  return (
    <div className="registration-form-wrapper">
      <div className="form-header">
        <h3 className="form-title">Workshop Registration</h3>
        <p className="form-subtitle">
          Fill in your details below to instantly reserve your seat for this event.
        </p>
      </div>

      {duplicateError && (
        <div className="duplicate-error-banner">
          <span>⚠️ {duplicateError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="reg-form" noValidate>
        {/* 1. Full Name */}
        <div className="form-group">
          <label htmlFor="reg-name" className="form-label">
            Full Name <span className="required-star">*</span>
          </label>
          <input
            type="text"
            id="reg-name"
            name="name"
            className={`form-input ${errors.name ? "input-error input-has-error" : ""}`}
            placeholder="e.g. Alex Morgan"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error-text field-error-text">{errors.name}</span>}
        </div>

        {/* 2. Email Address */}
        <div className="form-group">
          <label htmlFor="reg-email" className="form-label">
            Email Address <span className="required-star">*</span>
          </label>
          <input
            type="email"
            id="reg-email"
            name="email"
            className={`form-input ${errors.email ? "input-error input-has-error" : ""}`}
            placeholder="e.g. alex.morgan@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error-text field-error-text">{errors.email}</span>}
        </div>

        {/* 3. Phone Number */}
        <div className="form-group">
          <label htmlFor="reg-phone" className="form-label">
            Phone Number <span className="required-star">*</span>
          </label>
          <input
            type="tel"
            id="reg-phone"
            name="phone"
            className={`form-input ${errors.phone ? "input-error input-has-error" : ""}`}
            placeholder="e.g. +1 (555) 019-2834"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="error-text field-error-text">{errors.phone}</span>}
        </div>

        {/* 4. Submit Registration Button */}
        <button
          type="submit"
          className="btn btn-primary btn-submit-reg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Submit Registration"}
        </button>

        <p className="privacy-microcopy">
          🔒 Your ticket is saved in LocalStorage. Free cancellation anytime.
        </p>
      </form>
    </div>
  );
}
