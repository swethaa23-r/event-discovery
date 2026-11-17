// storage.js
// Beginner-friendly LocalStorage helper functions for Stackly Events
// Stores and manages event registrations locally in the user's browser.

const STORAGE_KEY = "stackly_registrations";

/**
 * Retrieve all registered events from LocalStorage
 * @returns {Array} List of registration objects
 */
export function getRegistrations() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading registrations from localStorage:", error);
    return [];
  }
}

/**
 * Save a new registration to LocalStorage
 * @param {Object} event - The event object
 * @param {Object} formData - Form input values (name, email, phone, tickets, notes)
 * @returns {Object} The created registration object
 */
export function saveRegistration(event, formData) {
  try {
    const existing = getRegistrations();
    
    // Generate a unique ticket reference code
    const ticketId = "STK-" + Math.floor(100000 + Math.random() * 900000);
    
    const newRegistration = {
      id: "reg_" + Date.now(),
      ticketId: ticketId,
      eventId: event.id,
      eventTitle: event.title,
      eventCategory: event.category,
      eventFormat: event.format,
      eventDate: event.date,
      eventTime: event.time,
      eventLocation: event.location,
      eventPrice: event.price,
      eventImage: event.image,
      speakerName: event.speaker.name,
      registeredAt: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      attendee: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "Not provided",
        tickets: Number(formData.tickets) || 1,
        notes: formData.notes || ""
      }
    };

    const updated = [newRegistration, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newRegistration;
  } catch (error) {
    console.error("Error saving registration to localStorage:", error);
    return null;
  }
}

/**
 * Cancel/remove a registration by its unique registration id
 * @param {string} registrationId
 * @returns {Array} Updated list of registrations
 */
export function cancelRegistration(registrationId) {
  try {
    const current = getRegistrations();
    const updated = current.filter((reg) => reg.id !== registrationId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error("Error canceling registration:", error);
    return [];
  }
}

/**
 * Check if the user is already registered for a specific event
 * @param {number} eventId
 * @returns {boolean}
 */
export function isEventRegistered(eventId) {
  const current = getRegistrations();
  return current.some((reg) => reg.eventId === Number(eventId));
}
