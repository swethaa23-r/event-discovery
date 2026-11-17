// App.jsx
// Main application component with React Router setup and global registration count state
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import EventDetailsPage from "./pages/EventDetailsPage";
import MyRegistrationsPage from "./pages/MyRegistrationsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { getRegistrations } from "./utils/storage";
import "./App.css";

// Helper component to redirect legacy /events/:id to /event/:id
function LegacyEventRedirect() {
  const { id } = useParams();
  return <Navigate to={`/event/${id}`} replace />;
}

export default function App() {
  // Initialize count directly from LocalStorage
  const [registrationCount, setRegistrationCount] = useState(() => getRegistrations().length);

  // Initialize AOS (Animate On Scroll) on component mount
  useEffect(() => {
    AOS.init({
      duration: 650,
      easing: "ease-out-cubic",
      once: true,
      offset: 40,
      delay: 50,
    });
  }, []);

  // Refresh registrations count helper
  const refreshRegistrationCount = () => {
    const list = getRegistrations();
    setRegistrationCount(list.length);
  };

  useEffect(() => {
    // Listen to window storage event for multi-tab sync
    window.addEventListener("storage", refreshRegistrationCount);
    return () => {
      window.removeEventListener("storage", refreshRegistrationCount);
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-container">
        {/* Consistent Top Navigation */}
        <Navbar registrationCount={registrationCount} />

        {/* Dynamic Route Pages */}
        <main className="main-content">
          <Routes>
            {/* Primary Required Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route
              path="/event/:id"
              element={<EventDetailsPage onRegistrationChange={refreshRegistrationCount} />}
            />
            <Route
              path="/registrations"
              element={<MyRegistrationsPage onRegistrationChange={refreshRegistrationCount} />}
            />

            {/* Backward Compatibility Redirects */}
            <Route path="/events" element={<Navigate to="/explore" replace />} />
            <Route path="/events/:id" element={<LegacyEventRedirect />} />
            <Route path="/my-registrations" element={<Navigate to="/registrations" replace />} />
            <Route path="/404" element={<NotFoundPage />} />

            {/* Wildcard 404 Route for all unknown / unhandled URLs */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Consistent Bottom Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
