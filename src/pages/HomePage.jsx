// HomePage.jsx
// Modern, content-rich Home Page for Stackly Events with rich animations and interactive features
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import { eventsData } from "../data/eventsData";
import { isEventRegistered } from "../utils/storage";

// Sub-component: Animated Counter that counts smoothly from 0 to target
function AnimatedCounter({ target, suffix = "+", duration = 1600 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    let animId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [target, duration]);

  return (
    <span className="stat-num">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function HomePage() {
  // 1. Featured Event Spotlight
  const featuredEvent = eventsData.find((event) => event.featured) || eventsData[0];

  // 2. Upcoming Events: 6 distinct events
  const upcomingEvents = eventsData.slice(0, 6);

  // 3. Horizontal Workshop Scroll Ref
  const workshopScrollRef = useRef(null);

  const scrollWorkshops = (direction) => {
    if (workshopScrollRef.current) {
      const scrollDistance = direction === "left" ? -340 : 340;
      workshopScrollRef.current.scrollBy({ left: scrollDistance, behavior: "smooth" });
    }
  };

  // 4. Feature Card Icon Shake State
  const [shakingIconIdx, setShakingIconIdx] = useState(null);

  const handleIconClick = (idx) => {
    setShakingIconIdx(null);
    setTimeout(() => {
      setShakingIconIdx(idx);
    }, 20);
  };

  // 5. JavaScript-based Newsletter form validation
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterError, setNewsletterError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterChange = (e) => {
    setNewsletterEmail(e.target.value);
    if (newsletterError) {
      setNewsletterError("");
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = newsletterEmail.trim();

    // JavaScript validation - do not rely on HTML5 native validation
    if (!email) {
      setNewsletterError("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setNewsletterError("Please enter a valid email address (e.g. name@example.com).");
      return;
    }

    setNewsletterError("");
    setSubscribed(true);
    setNewsletterEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  // Categories for Infinite Marquee
  const popularCategories = [
    {
      name: "Technology",
      image: "/images/cat-tech.jpg",
      count: "18+ Workshops",
      description: "Web development, cloud computing, generative AI, and cybersecurity."
    },
    {
      name: "Business",
      image: "/images/cat-business.jpg",
      count: "12+ Masterclasses",
      description: "Startup fundraising, product management, pitch decks, and growth strategy."
    },
    {
      name: "Design",
      image: "/images/cat-design.jpg",
      count: "10+ Sprints",
      description: "UI/UX design systems, Figma workflows, brand identity, and design sprints."
    },
    {
      name: "Education",
      image: "/images/cat-education.jpg",
      count: "8+ Sessions",
      description: "Digital pedagogy, interactive EdTech tools, and modern teaching methodologies."
    }
  ];

  // 6 Workshops for Horizontal Scrolling
  const workshops = [
    {
      id: 1,
      title: "Web Development Workshop",
      image: "/images/ws-webdev.jpg",
      date: "Dec 18, 2026",
      format: "Online",
      description: "Master modern HTML5, CSS Grid, React 19 component architecture, and responsive layouts."
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      image: "/images/ws-uiux.jpg",
      date: "Dec 22, 2026",
      format: "In-Person",
      description: "Build scalable component libraries, design token systems, and interactive Figma prototypes."
    },
    {
      id: 11,
      title: "Digital Marketing Workshop",
      image: "/images/ws-marketing.jpg",
      date: "Jan 05, 2027",
      format: "In-Person",
      description: "Learn growth hacking, customer acquisition funnels, conversion optimization, and analytics."
    },
    {
      id: 5,
      title: "AI & Machine Learning Workshop",
      image: "/images/ws-aiml.jpg",
      date: "Jan 15, 2027",
      format: "Online",
      description: "Explore practical prompt engineering, LLM APIs, structured outputs, and AI app development."
    },
    {
      id: 4,
      title: "Cloud Computing Workshop",
      image: "/images/ws-cloud.jpg",
      date: "Jan 22, 2027",
      format: "Online",
      description: "Deploy serverless microservices, Docker containers, Kubernetes clusters, and AWS DevOps pipelines."
    },
    {
      id: 9,
      title: "Cybersecurity Workshop",
      image: "/images/ws-security.jpg",
      date: "Jan 28, 2027",
      format: "In-Person",
      description: "Hands-on ethical hacking, vulnerability scanning, security audits, and enterprise threat defense."
    }
  ];

  // 4 Featured Speakers with Social Media Interaction
  const featuredSpeakers = [
    {
      name: "Dr. Elena Rostova",
      role: "AI Research Scientist",
      company: "DeepTech AI Lab",
      image: "/images/speaker-1.jpg",
      bio: "Pioneering LLM applications, multimodal models, and open-source machine learning architectures."
    },
    {
      name: "Clara Zhang",
      role: "Lead Brand & UX Designer",
      company: "Studio Motif",
      image: "/images/speaker-2.jpg",
      bio: "Award-winning creative director specializing in typography systems and intuitive digital interfaces."
    },
    {
      name: "Daniel Kramer",
      role: "CFO Advisor & Angel Investor",
      company: "Apex Growth Partners",
      image: "/images/speaker-3.jpg",
      bio: "Advisor to 40+ high-growth tech startups on fundraising, SaaS unit economics, and seed valuations."
    },
    {
      name: "Sarah Jenkins",
      role: "Cloud Architect & DevRel",
      company: "Kubernetes Foundation",
      image: "/images/speaker-4.jpg",
      bio: "Leading distributed cloud infrastructure, microservices reliability, and global open source community labs."
    }
  ];

  // 4 Features with Shake Animation
  const whyChooseFeatures = [
    {
      title: "Easy Registration",
      icon: "⚡",
      desc: "One-click registration saved directly to your browser LocalStorage with instant ticket pass codes."
    },
    {
      title: "Discover New Opportunities",
      icon: "🚀",
      desc: "Hand-picked workshops across high-demand tech, business, design, and educational disciplines."
    },
    {
      title: "Expert-Led Workshops",
      icon: "🎓",
      desc: "Every masterclass is led by verified industry practitioners bringing real battle-tested experience."
    },
    {
      title: "Connect With Communities",
      icon: "🤝",
      desc: "Network with like-minded creators, peers, founders, and instructors to supercharge your career."
    }
  ];

  // 4 Attendee Stories with Star-by-Star Animation
  const testimonials = [
    {
      name: "Maya Lin",
      role: "Product Designer, MetaSprint",
      image: "/images/testimonial-1.jpg",
      quote: "The Figma design system sprint completely transformed how our team builds components. Highly practical, engaging, and well structured!"
    },
    {
      name: "Alex Rivera",
      role: "Full-Stack Developer, Vercel Eco",
      image: "/images/testimonial-2.jpg",
      quote: "Stackly Events is my top platform for weekend upskilling. Clean interface, instant ticket generation, and zero spam. Highly recommended!"
    },
    {
      name: "Jordan Patel",
      role: "Tech Startup Founder, NexaCloud",
      image: "/images/testimonial-3.jpg",
      quote: "Attended the fundraising workshop and secured our first angel investor within two months. The pitch deck breakdown was pure gold."
    },
    {
      name: "Priya Sharma",
      role: "Cloud Engineer, Razorpay",
      image: "/images/testimonial-4.jpg",
      quote: "The Cloud Computing masterclass gave me the exact hands-on skills to build microservices and pass my AWS cert on the first attempt."
    }
  ];

  return (
    <div className="home-page">
      {/* ===================================================================
          Section 1: Hero Section
          - Large event background image with slow zoom effect
          - Heading: "Discover Events That Inspire You"
          - Subtitle: "Find exciting events, learn new skills and connect with amazing people."
          - Explore Events and Discover More buttons
          - Floating decorative elements
          - Animated Statistics Counters (500+ Events, 10K+ Attendees, 50+ Workshops, 100+ Expert Speakers)
          =================================================================== */}
      <section className="hero-banner-section">
        <div className="hero-banner-overlay"></div>
        <div className="hero-floating-orb orb-1" aria-hidden="true"></div>
        <div className="hero-floating-orb orb-2" aria-hidden="true"></div>
        <div className="section-container hero-banner-content">
          <div className="hero-tag-pill">
            <span className="sparkle">✦</span>
            <span>Discover • Learn • Connect</span>
          </div>

          <h1 className="hero-main-heading">
            Discover Events That Inspire You
          </h1>

          <p className="hero-main-description">
            Find exciting events, learn new skills and connect with amazing people.
          </p>

          <div className="hero-buttons-row">
            <Link to="/explore" className="btn btn-hero-cta">
              Explore Events
              <span className="arrow-icon">&rarr;</span>
            </Link>
            <a
              href="#featured-section"
              className="btn btn-hero-secondary-cta"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("featured-section")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Discover More
            </a>
          </div>

          {/* Animated Statistics Counters */}
          <div className="hero-stats-strip">
            <div className="hero-stat-box">
              <AnimatedCounter target={500} suffix="+" duration={1600} />
              <span className="stat-lbl">Events</span>
            </div>
            <div className="stat-separator"></div>
            <div className="hero-stat-box">
              <AnimatedCounter target={10} suffix="K+" duration={1800} />
              <span className="stat-lbl">Attendees</span>
            </div>
            <div className="stat-separator"></div>
            <div className="hero-stat-box">
              <AnimatedCounter target={50} suffix="+" duration={1400} />
              <span className="stat-lbl">Workshops</span>
            </div>
            <div className="stat-separator"></div>
            <div className="hero-stat-box">
              <AnimatedCounter target={100} suffix="+" duration={1500} />
              <span className="stat-lbl">Expert Speakers</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          Section 2: Featured Event Spotlight
          - Image Reveal Animation with clip-path & gentle zoom
          - Staggered fade-up for information
          - Hover animation on View Details button
          =================================================================== */}
      <section className="featured-spotlight-section" id="featured-section" data-aos="fade-up">
        <div className="section-container">
          <div className="section-head-center">
            <span className="section-kicker">Editor's Choice</span>
            <h2 className="section-heading">Featured Event Spotlight</h2>
            <p className="section-subtext centered">
              Our top recommended session starting soon. Secure your seat before availability runs out.
            </p>
          </div>

          {featuredEvent && (
            <div className="featured-spotlight-card">
              {/* Media Column with Event Photo and Image Reveal Effect */}
              <div className="spotlight-media">
                <div className="spotlight-img-reveal-wrapper">
                  <img
                    src="/images/featured-spotlight.jpg"
                    alt={featuredEvent.title}
                    className="spotlight-img"
                    onError={(e) => {
                      e.target.src = featuredEvent.image;
                    }}
                  />
                </div>
                <div className="spotlight-top-badge">
                  ⭐ HIGHLIGHTED WORKSHOP
                </div>
                <div className="spotlight-price-pill">
                  {featuredEvent.isFree ? "FREE ENTRY" : `$${featuredEvent.price} TICKET`}
                </div>
              </div>

              {/* Information Column with Staggered Fade-Up Elements */}
              <div className="spotlight-details">
                <div className="spotlight-tags" data-aos="fade-up" data-aos-delay="50">
                  <span className="badge category-badge">{featuredEvent.category}</span>
                  <span className={`badge format-badge ${featuredEvent.format.toLowerCase().replace("-", "")}`}>
                    {featuredEvent.format === "Online" ? "🌐 Online Stream" : "📍 In-Person Studio"}
                  </span>
                </div>

                <h3 className="spotlight-title" data-aos="fade-up" data-aos-delay="100">
                  <Link to={`/event/${featuredEvent.id}`}>
                    {featuredEvent.title}
                  </Link>
                </h3>

                <p className="spotlight-desc" data-aos="fade-up" data-aos-delay="150">
                  {featuredEvent.fullDescription || featuredEvent.shortDescription}
                </p>

                {/* Key Meta Information */}
                <div className="spotlight-meta-grid" data-aos="fade-up" data-aos-delay="200">
                  <div className="spot-meta-item">
                    <span className="icon">📅</span>
                    <div>
                      <span className="meta-label">Date</span>
                      <strong>{featuredEvent.date}</strong>
                    </div>
                  </div>
                  <div className="spot-meta-item">
                    <span className="icon">⏰</span>
                    <div>
                      <span className="meta-label">Time</span>
                      <strong>{featuredEvent.time}</strong>
                    </div>
                  </div>
                  <div className="spot-meta-item">
                    <span className="icon">📍</span>
                    <div>
                      <span className="meta-label">Location</span>
                      <strong>{featuredEvent.location}</strong>
                    </div>
                  </div>
                  <div className="spot-meta-item">
                    <span className="icon">👥</span>
                    <div>
                      <span className="meta-label">Availability</span>
                      <strong className="seats-highlight">
                        Only {featuredEvent.seatsLeft} of {featuredEvent.seatsTotal} seats open
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Speaker Snippet */}
                <div className="spotlight-speaker" data-aos="fade-up" data-aos-delay="250">
                  <img
                    src={featuredEvent.speaker.avatar}
                    alt={featuredEvent.speaker.name}
                    className="spotlight-speaker-avatar"
                    onError={(e) => {
                      e.target.src = "/images/speaker-1.jpg";
                    }}
                  />
                  <div>
                    <h4 className="speaker-name">{featuredEvent.speaker.name}</h4>
                    <p className="speaker-company">{featuredEvent.speaker.role} • {featuredEvent.speaker.company}</p>
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="spotlight-actions" data-aos="fade-up" data-aos-delay="300">
                  <Link
                    to={`/event/${featuredEvent.id}`}
                    className="btn btn-primary btn-spotlight-primary"
                  >
                    View Event Details & Register &rarr;
                  </Link>
                  <Link
                    to="/explore"
                    className="btn btn-outline"
                  >
                    Browse All Workshops
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===================================================================
          Section 3: Popular Categories – Infinite Marquee Animation
          - Cards move continuously from right to left
          - Seamless infinite loop without sudden jumps
          - Pauses on hover
          - Clicking navigates to /explore with category filter
          =================================================================== */}
      <section className="popular-categories-section" data-aos="fade-up">
        <div className="section-container">
          <div className="section-head-center">
            <span className="section-kicker">Find Your Field</span>
            <h2 className="section-heading">Popular Categories</h2>
            <p className="section-subtext centered">
              Hover to pause. Choose your area of focus and explore high-demand workshops designed for real-world impact.
            </p>
          </div>

          <div className="categories-marquee-wrapper">
            <div className="marquee-track">
              {/* Render items 3 times for a completely seamless infinite loop */}
              {[...popularCategories, ...popularCategories, ...popularCategories].map((cat, idx) => (
                <Link
                  key={`${cat.name}-${idx}`}
                  to={`/explore?category=${encodeURIComponent(cat.name)}`}
                  className="category-image-card marquee-item"
                >
                  <div className="cat-img-wrapper">
                    <img
                      src={cat.image}
                      alt={`${cat.name} workshops`}
                      className="cat-card-img"
                      onError={(e) => {
                        e.target.src = "/images/event-1.jpg";
                      }}
                    />
                    <span className="cat-pill-overlay">{cat.count}</span>
                  </div>
                  <div className="cat-content-box">
                    <h3 className="cat-name">{cat.name}</h3>
                    <p className="cat-description">{cat.description}</p>
                    <div className="cat-explore-link">
                      <span>Explore {cat.name}</span>
                      <span className="cat-arrow">&rarr;</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          Section 4: Upcoming Events – Centered Heading & Staggered Cards
          - Center-aligned heading and subtitle
          - Smooth fade-down animation on the heading
          - At least 6 event cards with unique images and equal heights
          =================================================================== */}
      <section className="upcoming-events-section" data-aos="fade-up">
        <div className="section-container">
          <div className="section-head-center upcoming-heading-center" data-aos="fade-down">
            <span className="section-kicker">Curated Calendar</span>
            <h2 className="section-heading">Upcoming Events</h2>
            <p className="section-subtext centered">
              Browse 6 hand-picked sessions scheduled for the upcoming weeks. Learn from industry leaders.
            </p>
          </div>

          {/* 6 Event Cards Grid */}
          <div className="events-grid">
            {upcomingEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
                isRegistered={isEventRegistered(event.id)}
              />
            ))}
          </div>

          <div className="upcoming-view-all-center" data-aos="fade-up">
            <Link to="/explore" className="btn btn-outline btn-lg upcoming-view-all-btn">
              Explore All Events &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================================
          Section 5: Workshops You Can Join – Horizontal Scrolling Layout
          - 6 workshop cards (Web Dev, UI/UX, Marketing, AI/ML, Cloud, Security)
          - Left & Right arrow navigation buttons for smooth scrolling
          - Touch scroll on mobile
          =================================================================== */}
      <section className="workshops-showcase-section" data-aos="fade-up">
        <div className="section-container">
          <div className="workshops-header-row">
            <div>
              <span className="section-kicker">Skill Acceleration</span>
              <h2 className="section-heading">Workshops You Can Join</h2>
              <p className="section-subtext">
                Hands-on practical masterclasses. Use the arrows to browse upcoming deep-dives.
              </p>
            </div>

            {/* Left & Right Smooth Scroll Buttons */}
            <div className="workshop-scroll-controls" aria-label="Workshop scroll navigation">
              <button
                type="button"
                className="btn-scroll-arrow"
                onClick={() => scrollWorkshops("left")}
                aria-label="Scroll workshops left"
                title="Scroll left"
              >
                ‹
              </button>
              <button
                type="button"
                className="btn-scroll-arrow"
                onClick={() => scrollWorkshops("right")}
                aria-label="Scroll workshops right"
                title="Scroll right"
              >
                ›
              </button>
            </div>
          </div>

          {/* Horizontal Scrolling Card Track */}
          <div className="workshops-scroll-track" ref={workshopScrollRef}>
            {workshops.map((ws, idx) => (
              <article
                key={ws.title}
                className="workshop-item-card horizontal-ws-card"
                data-aos="fade-up"
                data-aos-delay={(idx + 1) * 75}
              >
                <div className="workshop-img-box">
                  <img
                    src={ws.image}
                    alt={ws.title}
                    className="workshop-img"
                    onError={(e) => {
                      e.target.src = "/images/event-1.jpg";
                    }}
                  />
                  <span className="workshop-format-badge">{ws.format}</span>
                </div>
                <div className="workshop-body">
                  <div className="workshop-date-row">
                    <span className="ws-date-icon">📅</span>
                    <span className="ws-date-text">{ws.date}</span>
                  </div>
                  <h3 className="workshop-title">
                    <Link to={`/event/${ws.id}`}>{ws.title}</Link>
                  </h3>
                  <p className="workshop-desc">{ws.description}</p>
                  <Link to={`/event/${ws.id}`} className="btn btn-workshop-cta">
                    Join Workshop &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          Section 6: Online & Offline Events (two attractive side-by-side sections)
          - Join Online Events
          - Attend In-Person Events
          =================================================================== */}
      <section className="dual-format-section" data-aos="fade-up">
        <div className="section-container">
          <div className="section-head-center">
            <span className="section-kicker">Flexible Formats</span>
            <h2 className="section-heading">Online & In-Person Experiences</h2>
            <p className="section-subtext centered">
              Whether you prefer remote learning from home or vibrant face-to-face workshops in city hubs.
            </p>
          </div>

          <div className="dual-format-grid">
            {/* Online Events Card */}
            <div className="format-promo-card online" data-aos="fade-right">
              <div className="format-card-img-wrap">
                <img
                  src="/images/format-online.jpg"
                  alt="Join Online Events"
                  className="format-card-img"
                  onError={(e) => {
                    e.target.src = "/images/event-5.jpg";
                  }}
                />
                <div className="format-overlay-badge">🌐 100% VIRTUAL</div>
              </div>
              <div className="format-card-content">
                <h3 className="format-card-title">Join Online Events</h3>
                <p className="format-card-desc">
                  Participate from anywhere in the world. High-definition interactive live streams with 
                  real-time Q&A, collaborative breakout rooms, and downloadable session resources.
                </p>
                <Link to="/explore?format=Online" className="btn btn-primary format-btn">
                  Explore Online Events &rarr;
                </Link>
              </div>
            </div>

            {/* Offline Events Card */}
            <div className="format-promo-card offline" data-aos="fade-left">
              <div className="format-card-img-wrap">
                <img
                  src="/images/format-offline.jpg"
                  alt="Attend In-Person Events"
                  className="format-card-img"
                  onError={(e) => {
                    e.target.src = "/images/event-2.jpg";
                  }}
                />
                <div className="format-overlay-badge">📍 IN-PERSON VENUES</div>
              </div>
              <div className="format-card-content">
                <h3 className="format-card-title">Attend In-Person Events</h3>
                <p className="format-card-desc">
                  Experience the energy of live rooms, collaborative design tables, dedicated workstation 
                  labs, and face-to-face networking with industry peers and mentors.
                </p>
                <Link to="/explore?format=In-Person" className="btn btn-primary format-btn">
                  Explore In-Person Events &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          Section 7: Featured Speakers – Social Media Interaction
          - 4 professional speaker profile cards
          - LinkedIn, Instagram, Facebook icons reveal smoothly on hover
          - IMPORTANT: Clicking any icon navigates to 404 page via React Router
          =================================================================== */}
      <section className="featured-speakers-section" data-aos="fade-up">
        <div className="section-container">
          <div className="section-head-center">
            <span className="section-kicker">Industry Mentors</span>
            <h2 className="section-heading">Featured Speakers</h2>
            <p className="section-subtext centered">
              Learn directly from accomplished practitioners leading innovation at top tech and design teams.
            </p>
          </div>

          <div className="speakers-grid four-speakers-grid">
            {featuredSpeakers.map((spk, idx) => (
              <div
                key={spk.name}
                className="speaker-card-box interactive-speaker-card"
                data-aos="fade-up"
                data-aos-delay={(idx + 1) * 80}
              >
                <div className="speaker-avatar-wrap">
                  <img
                    src={spk.image}
                    alt={spk.name}
                    className="speaker-avatar-img"
                    onError={(e) => {
                      e.target.src = "/images/testimonial-1.jpg";
                    }}
                  />

                  {/* Social media icons appearing on hover (navigate to 404 via React Router) */}
                  <div className="speaker-social-overlay" aria-label={`Social links for ${spk.name}`}>
                    <Link
                      to="/social/linkedin"
                      className="spk-social-btn"
                      title={`${spk.name} on LinkedIn (redirects to 404)`}
                      aria-label="LinkedIn"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
                      </svg>
                    </Link>
                    <Link
                      to="/social/instagram"
                      className="spk-social-btn"
                      title={`${spk.name} on Instagram (redirects to 404)`}
                      aria-label="Instagram"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </Link>
                    <Link
                      to="/social/facebook"
                      className="spk-social-btn"
                      title={`${spk.name} on Facebook (redirects to 404)`}
                      aria-label="Facebook"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.704 0-1.28.163-1.636.467-.357.304-.515.823-.515 1.708v1.805h4.333l-.613 3.667h-3.72v7.98H9.101z"/>
                      </svg>
                    </Link>
                  </div>
                </div>
                <div className="speaker-card-body">
                  <h3 className="spk-name">{spk.name}</h3>
                  <p className="spk-role-badge">{spk.role}</p>
                  <p className="spk-company">{spk.company}</p>
                  <p className="spk-bio">{spk.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          Section 8: Why Choose Stackly Events – Shake Animation on Icon Click
          - 4 feature cards
          - Clicking an icon triggers short shake animation on that icon
          =================================================================== */}
      <section className="why-choose-section" id="why-choose" data-aos="fade-up">
        <div className="section-container">
          <div className="section-head-center">
            <span className="section-kicker">The Stackly Advantage</span>
            <h2 className="section-heading">Why Choose Stackly Events</h2>
            <p className="section-subtext centered">
              Click any icon to interact! We make professional upskilling and event discovery simple, practical, and inspiring.
            </p>
          </div>

          <div className="four-features-grid">
            {whyChooseFeatures.map((feat, idx) => (
              <div
                key={feat.title}
                className="feature-card interactive-feature-card"
                data-aos="fade-up"
                data-aos-delay={(idx + 1) * 80}
              >
                <div
                  className={`feature-icon-circle ${shakingIconIdx === idx ? "shaking" : ""}`}
                  onClick={() => handleIconClick(idx)}
                  role="button"
                  tabIndex={0}
                  title="Click icon for shake animation"
                  aria-label={`${feat.title} icon - click to shake`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleIconClick(idx);
                    }
                  }}
                >
                  <span>{feat.icon}</span>
                </div>
                <h3 className="feature-title">{feat.title}</h3>
                <p className="feature-desc">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          Section 9: Attendee Stories – Animated Stars (star-by-star fill)
          - 4 customer testimonial cards
          - 5 stars animate star-by-star when cards appear
          =================================================================== */}
      <section className="testimonials-section" data-aos="fade-up">
        <div className="section-container">
          <div className="section-head-center">
            <span className="section-kicker">Attendee Stories</span>
            <h2 className="section-heading">What Attendees Say</h2>
            <p className="section-subtext centered">
              Real feedback from developers, designers, and students who leveled up with Stackly Events.
            </p>
          </div>

          <div className="testimonials-grid four-testimonials-grid">
            {testimonials.map((t, idx) => (
              <div
                key={t.name}
                className="testimonial-card"
                data-aos="fade-up"
                data-aos-delay={(idx + 1) * 90}
              >
                {/* 5 Animated Stars (Staggered star-by-star pop-in) */}
                <div className="animated-stars-row" aria-label="5 out of 5 stars rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className="animated-star"
                      style={{ animationDelay: `${(idx * 0.12) + (star * 0.1)}s` }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="testimonial-quote">"{t.quote}"</p>
                <div className="testimonial-author">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="author-avatar"
                    onError={(e) => {
                      e.target.src = "/images/speaker-1.jpg";
                    }}
                  />
                  <div>
                    <h4 className="author-name">{t.name}</h4>
                    <p className="author-role">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          Section 10: Newsletter Subscription Section – JavaScript Validation
          - No HTML5 native validation popups (uses noValidate)
          - Field-specific error rendered conditionally from React state
          =================================================================== */}
      <section className="newsletter-banner-section" data-aos="fade-up">
        <div className="section-container">
          <div className="newsletter-box">
            <div className="newsletter-text">
              <span className="newsletter-kicker">Stay Ahead</span>
              <h2 className="newsletter-heading">Get Event Updates & Early Passes</h2>
              <p className="newsletter-desc">
                Subscribe to our curated newsletter and receive weekly announcements about upcoming 
                free workshops, speaker AMAs, and exclusive discount codes.
              </p>
            </div>

            <div className="newsletter-form-col">
              {subscribed ? (
                <div className="newsletter-success-alert">
                  <span className="check-icon">✓</span>
                  <div>
                    <strong>You are subscribed!</strong>
                    <p>Check your inbox soon for early workshop invites.</p>
                  </div>
                </div>
              ) : (
                <form className="home-newsletter-form" onSubmit={handleSubscribe} noValidate>
                  <div className="nl-input-group">
                    <input
                      type="email"
                      className={`nl-email-input ${newsletterError ? "input-has-error" : ""}`}
                      placeholder="Enter your email address..."
                      value={newsletterEmail}
                      onChange={handleNewsletterChange}
                    />
                    <button type="submit" className="btn btn-primary btn-nl-submit">
                      Subscribe Free
                    </button>
                  </div>
                  {/* JavaScript-controlled error message */}
                  {newsletterError && (
                    <span className="field-error-text" role="alert">
                      ⚠️ {newsletterError}
                    </span>
                  )}
                  <p className="nl-microcopy">
                    🔒 No spam ever. Unsubscribe anytime with a single click.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          Section 11: Call to Action Banner
          - Heading: "Your Next Experience Starts Here"
          - Explore Events and View My Registrations buttons
          =================================================================== */}
      <section className="cta-home-section" data-aos="zoom-in">
        <div className="section-container">
          <div className="cta-home-box">
            <div className="cta-content-wrapper">
              <span className="cta-kicker">Start Learning Today</span>
              <h2 className="cta-home-title">Your Next Experience Starts Here</h2>
              <p className="cta-home-subtitle">
                Join thousands of motivated professionals and students discovering world-class workshops 
                every week on Stackly Events.
              </p>

              <div className="cta-actions-group">
                <Link to="/explore" className="btn btn-cta-main">
                  Explore Events &rarr;
                </Link>
                <Link to="/registrations" className="btn btn-cta-secondary">
                  View My Registrations
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
