// ScrollToTop.jsx
// Automatically scrolls window to top on route change for smooth navigation
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // Refresh AOS positions on page navigation
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 60);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
