// eventsData.js
// Sample event and workshop catalog for Stackly Events
// Beginner-friendly JavaScript data structure with 12 unique events

export const eventsData = [
  {
    id: 1,
    title: "Mastering React 19 & Modern Web Architecture",
    category: "Technology",
    format: "Online",
    date: "Dec 12, 2026",
    isoDate: "2026-12-12",
    time: "10:00 AM - 1:00 PM EST",
    location: "Zoom Live Stream",
    price: 0,
    isFree: true,
    rating: 4.9,
    seatsTotal: 150,
    seatsLeft: 24,
    featured: true,
    image: "/images/event-1.jpg",
    speaker: {
      name: "Sarah Jenkins",
      role: "Principal Frontend Engineer",
      company: "Vercel Ecosystem",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
    },
    shortDescription: "A hands-on deep dive into React 19, Server Components, Hooks, and building high-performance modern web apps.",
    fullDescription: "Join Sarah Jenkins for an interactive, beginner-to-intermediate crash course on modern React development. You will learn the core foundations of functional components, props, state management with Hooks, client-side routing, and best practices for structuring production-ready single-page applications.",
    learnings: [
      "Core React mental model: components, props, and unidirectional data flow",
      "Essential React Hooks: useState, useEffect, and custom hooks",
      "Building responsive UI with modern CSS and reusable component patterns",
      "Client-side routing with React Router v7",
      "Handling forms, local storage persistence, and error states"
    ],
    agenda: [
      { time: "10:00 AM", topic: "Welcome & React 19 Key Concepts" },
      { time: "10:45 AM", topic: "Live Coding: Component Architecture & State" },
      { time: "11:45 AM", topic: "Coffee Break & Interactive Q&A" },
      { time: "12:00 PM", topic: "Routing, Forms, and LocalStorage Integration" },
      { time: "12:45 PM", topic: "Live Wrap-up, Resource Sharing & Certificates" }
    ],
    prerequisites: "Basic knowledge of HTML, CSS, and modern JavaScript (ES6+ variables, arrow functions, arrays)."
  },
  {
    id: 2,
    title: "Design Systems & UI/UX Sprint with Figma",
    category: "Design",
    format: "In-Person",
    date: "Dec 16, 2026",
    isoDate: "2026-12-16",
    time: "2:00 PM - 6:00 PM PST",
    location: "DesignLab Studio, San Francisco, CA",
    price: 49,
    isFree: false,
    rating: 4.8,
    seatsTotal: 60,
    seatsLeft: 8,
    featured: false,
    image: "/images/event-2.jpg",
    speaker: {
      name: "Marcus Vance",
      role: "Lead Product Designer",
      company: "Stripe",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    shortDescription: "Learn to build scalable design tokens, responsive components, and design systems in Figma from scratch.",
    fullDescription: "Unlock the secrets behind high-velocity product design. In this workshop, Marcus Vance walks you through building an industry-standard Design System in Figma. Learn atomic design, token hierarchies, auto-layout variants, interactive component states, and seamless design-to-engineering handoff.",
    learnings: [
      "Mastering Figma Auto Layout 5.0 and Component Variants",
      "Creating typography, color tokens, and elevation scales",
      "Structuring component libraries for enterprise development",
      "Creating micro-interactions and interactive prototypes",
      "Handoff workflows between UI designers and frontend developers"
    ],
    agenda: [
      { time: "2:00 PM", topic: "Foundations of Atomic Design & Figma Workflows" },
      { time: "3:00 PM", topic: "Hands-on Workshop: Building Design Tokens" },
      { time: "4:15 PM", topic: "Prototyping Interactive States & Micro-interactions" },
      { time: "5:15 PM", topic: "Peer Review, Critique & Portfolio Tips" }
    ],
    prerequisites: "Figma account (Free tier is sufficient) and basic familiarity with digital layout tools."
  },
  {
    id: 3,
    title: "Startup Pitch & Fundraising Masterclass",
    category: "Business",
    format: "In-Person",
    date: "Jan 08, 2027",
    isoDate: "2027-01-08",
    time: "5:30 PM - 8:30 PM EST",
    location: "Innovation Hub, New York, NY",
    price: 39,
    isFree: false,
    rating: 4.9,
    seatsTotal: 80,
    seatsLeft: 12,
    featured: false,
    image: "/images/event-3.jpg",
    speaker: {
      name: "Chloe Reynolds",
      role: "Venture Partner & Founder",
      company: "SeedSpark Capital",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
    },
    shortDescription: "How to craft a compelling 10-slide pitch deck, tell your story, and secure your first angel or pre-seed investment.",
    fullDescription: "Great ideas need great storytelling. Learn from veteran venture capitalist Chloe Reynolds on how angel investors and venture funds evaluate early-stage startups. Discover the 10 essential slides of a winning deck, market sizing techniques, unit economics, and negotiation tips for your term sheet.",
    learnings: [
      "The anatomy of a winning 10-slide pitch deck",
      "How to calculate and defend your TAM, SAM, and SOM",
      "Storytelling frameworks that capture investor imagination",
      "Pre-seed valuation methods and SAFE notes explained",
      "Common founder pitfalls during investor due diligence"
    ],
    agenda: [
      { time: "5:30 PM", topic: "Networking, Drinks & Light Refreshments" },
      { time: "6:00 PM", topic: "Keynote: What Investors Actually Look For" },
      { time: "7:00 PM", topic: "Live Pitch Breakdown: Real Pitch Decks Analyzed" },
      { time: "8:00 PM", topic: "Investor Q&A and 1-on-1 Feedback Circle" }
    ],
    prerequisites: "Curiosity about entrepreneurship or an early-stage startup idea."
  },
  {
    id: 4,
    title: "EdTech Innovation: Interactive Learning & Online Pedagogy",
    category: "Education",
    format: "Online",
    date: "Jan 12, 2027",
    isoDate: "2027-01-12",
    time: "1:00 PM - 4:00 PM EST",
    location: "Virtual Classroom Live",
    price: 0,
    isFree: true,
    rating: 4.9,
    seatsTotal: 200,
    seatsLeft: 35,
    featured: false,
    image: "/images/event-4.jpg",
    speaker: {
      name: "Dr. Rachel Campbell",
      role: "Director of Digital Learning",
      company: "EdFuture Institute",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    shortDescription: "Discover interactive pedagogical frameworks, gamified teaching, and educational technology tools.",
    fullDescription: "Designed for modern educators, trainers, and instructional designers. Learn how to transform static curriculums into highly engaging, student-centered digital learning experiences using modern EdTech tools and active learning exercises.",
    learnings: [
      "Designing engaging online learning workflows and micro-modules",
      "Gamification and interactive assessments that boost completion rates",
      "Leveraging generative AI tools safely for curriculum drafting",
      "Fostering collaborative virtual peer-review groups",
      "Accessibility guidelines for equitable digital classrooms"
    ],
    agenda: [
      { time: "1:00 PM", topic: "The Evolution of Digital Classrooms & Pedagogy" },
      { time: "1:50 PM", topic: "Hands-on: Designing an Interactive Lesson Plan" },
      { time: "2:45 PM", topic: "EdTech Tools Demo & Engagement Strategies" },
      { time: "3:30 PM", topic: "Live Educator Q&A and Resource Sharing" }
    ],
    prerequisites: "Open to educators, corporate trainers, students, and instructional designers."
  },
  {
    id: 5,
    title: "Generative AI for Developers: Prompting & APIs",
    category: "Technology",
    format: "Online",
    date: "Jan 18, 2027",
    isoDate: "2027-01-18",
    time: "11:00 AM - 2:00 PM EST",
    location: "Google Meet Live",
    price: 0,
    isFree: true,
    rating: 5.0,
    seatsTotal: 300,
    seatsLeft: 42,
    featured: false,
    image: "/images/event-5.jpg",
    speaker: {
      name: "Dr. Elena Rostova",
      role: "AI Research Scientist",
      company: "DeepTech AI Lab",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
    },
    shortDescription: "Understand Large Language Models, prompt engineering, structured outputs, and building practical AI features.",
    fullDescription: "Demystify generative AI and discover how software developers can integrate LLMs into practical consumer web applications. This session covers prompt engineering techniques, function calling, grounding with external context, and best practices for low-latency AI user experiences.",
    learnings: [
      "Understanding tokens, temperature, context windows, and embeddings",
      "Few-shot prompting and system instruction engineering",
      "Connecting LLMs to structured JSON output and schemas",
      "Techniques for mitigating hallucinations in production apps",
      "Building a simple AI assistant interface in React"
    ],
    agenda: [
      { time: "11:00 AM", topic: "LLM Fundamentals & How Foundation Models Work" },
      { time: "11:50 AM", topic: "System Prompts & Structured Outputs in Practice" },
      { time: "12:40 PM", topic: "Live Demo: Building an Intelligent Search Filter" },
      { time: "1:30 PM", topic: "Audience Q&A and AI Developer Roadmaps" }
    ],
    prerequisites: "General programming experience in any language. No prior machine learning math required!"
  },
  {
    id: 6,
    title: "Cloud Native & DevOps Fundamentals with Docker",
    category: "Technology",
    format: "Online",
    date: "Jan 22, 2027",
    isoDate: "2027-01-22",
    time: "1:00 PM - 4:00 PM CST",
    location: "Interactive Webinar",
    price: 29,
    isFree: false,
    rating: 4.7,
    seatsTotal: 100,
    seatsLeft: 19,
    featured: false,
    image: "/images/event-6.jpg",
    speaker: {
      name: "Alex Thorne",
      role: "Senior Cloud Architect",
      company: "CloudScale Systems",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },
    shortDescription: "Learn containerization basics, writing Dockerfiles, docker-compose, and continuous deployment workflows.",
    fullDescription: "Modern software relies on reproducible environments. In this beginner-friendly DevOps session, Alex Thorne guides you through container concepts, containerizing a full-stack JavaScript application, managing multi-container setups, and automating deployment to the cloud.",
    learnings: [
      "Containers vs Virtual Machines: Core concepts simplified",
      "Writing clean, optimized Dockerfiles for React and Node.js",
      "Orchestrating multi-service environments with Docker Compose",
      "Managing volumes, ports, environment variables, and networks",
      "CI/CD pipelines with GitHub Actions explained"
    ],
    agenda: [
      { time: "1:00 PM", topic: "Demystifying Containers and Docker Architecture" },
      { time: "2:00 PM", topic: "Hands-on: Dockerizing your first web application" },
      { time: "3:00 PM", topic: "Multi-container setup with Docker Compose" },
      { time: "3:40 PM", topic: "Deploying to Cloud Providers & QA Session" }
    ],
    prerequisites: "Basic command-line (terminal/powershell) knowledge and Git basics."
  },
  {
    id: 7,
    title: "Agile Product Management: From Idea to Launch",
    category: "Business",
    format: "Online",
    date: "Jan 26, 2027",
    isoDate: "2027-01-26",
    time: "1:00 PM - 4:00 PM EST",
    location: "Virtual Classroom",
    price: 19,
    isFree: false,
    rating: 4.8,
    seatsTotal: 120,
    seatsLeft: 31,
    featured: false,
    image: "/images/event-7.jpg",
    speaker: {
      name: "Jonathan Bradley",
      role: "Senior Director of Product",
      company: "Atlassian Partner Network",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
    },
    shortDescription: "Discover how to write user stories, prioritize product backlogs, run sprints, and launch customer-loved features.",
    fullDescription: "Transition into or level up your product management career. In this interactive session, Jonathan Bradley breaks down how high-growth tech companies run discovery, define MVPs, validate hypotheses with data, and lead cross-functional engineering and design squads effectively.",
    learnings: [
      "Writing clear user stories with actionable acceptance criteria",
      "Prioritization frameworks: RICE, MoSCoW, and Kano models",
      "Conducting impactful customer discovery interviews",
      "Running effective sprint planning, standups, and retrospectives",
      "Measuring product-market fit using Pirate Metrics (AARRR)"
    ],
    agenda: [
      { time: "1:00 PM", topic: "The Modern Product Manager Role & Mindset" },
      { time: "1:50 PM", topic: "User Story Mapping & Backlog Prioritization Drill" },
      { time: "2:45 PM", topic: "Metrics that Matter: North Star & Retention" },
      { time: "3:30 PM", topic: "Live Resume & Portfolio Guidance for PMs" }
    ],
    prerequisites: "No previous product management experience required."
  },
  {
    id: 8,
    title: "Visual Brand Identity & Typography Design",
    category: "Design",
    format: "In-Person",
    date: "Feb 04, 2027",
    isoDate: "2027-02-04",
    time: "10:00 AM - 3:00 PM PST",
    location: "Creative Arts Center, Los Angeles, CA",
    price: 45,
    isFree: false,
    rating: 4.9,
    seatsTotal: 50,
    seatsLeft: 11,
    featured: false,
    image: "/images/event-8.jpg",
    speaker: {
      name: "Clara Zhang",
      role: "Senior Brand Stylist",
      company: "Studio Motif",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    shortDescription: "Master typography pairing, color psychology, and memorable visual identity systems for brands.",
    fullDescription: "Build iconic brand identities that stand out. In this studio workshop, Clara Zhang guides you through the complete branding lifecycle: moodboarding, typographic hierarchy, custom color harmonies, and brand guideline documentation.",
    learnings: [
      "Typography rules: serif vs sans, kerning, and hierarchy",
      "Creating accessible and resonant brand color palettes",
      "Constructing cohesive logo marks and brand iconography",
      "Assembling comprehensive style guides for clients",
      "Exporting vector assets for both digital and print production"
    ],
    agenda: [
      { time: "10:00 AM", topic: "Visual Identity Foundations & Typography Essentials" },
      { time: "11:30 AM", topic: "Hands-On Studio: Designing a Full Brand Identity" },
      { time: "1:30 PM", topic: "Brand Guidelines & Presentation Techniques" },
      { time: "2:30 PM", topic: "Portfolio Reviews & Direct Critique" }
    ],
    prerequisites: "Basic familiarity with any vector graphic design software (Figma, Illustrator, etc.)."
  },
  {
    id: 9,
    title: "STEM Teaching in the AI Era: Classroom Strategies",
    category: "Education",
    format: "In-Person",
    date: "Feb 10, 2027",
    isoDate: "2027-02-10",
    time: "9:00 AM - 1:00 PM EST",
    location: "Cambridge Education Hub, Boston, MA",
    price: 25,
    isFree: false,
    rating: 4.8,
    seatsTotal: 70,
    seatsLeft: 15,
    featured: false,
    image: "/images/event-9.jpg",
    speaker: {
      name: "Prof. Arthur Pendelton",
      role: "Associate Professor of STEM Education",
      company: "Boston Academic Labs",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80"
    },
    shortDescription: "Practical methodologies to integrate coding, robotics, and critical computational thinking into schools.",
    fullDescription: "Empower the next generation of problem solvers. Prof. Arthur Pendelton demonstrates hands-on robotics kits, visual coding frameworks (Blockly, Python), and classroom management techniques that inspire curiosity and deep scientific thinking.",
    learnings: [
      "Designing hands-on STEM lab activities with affordable hardware",
      "Scaffolding coding education from beginner blocks to real Python",
      "Ethical AI discussions for young learners and students",
      "Assessment rubrics for group engineering challenges"
    ],
    agenda: [
      { time: "9:00 AM", topic: "Modern Challenges in STEM & Digital Literacy" },
      { time: "10:15 AM", topic: "Interactive Lab: Building STEM Demonstrators" },
      { time: "11:45 AM", topic: "Adapting Curriculums for Diverse Learning Speeds" },
      { time: "12:30 PM", topic: "Take-Home Lesson Plans & Educator Community" }
    ],
    prerequisites: "Teachers, educational staff, parents, and community tutors."
  },
  {
    id: 10,
    title: "Full-Stack Web Security & Ethical Hacking",
    category: "Technology",
    format: "Online",
    date: "Feb 15, 2027",
    isoDate: "2027-02-15",
    time: "6:00 PM - 9:00 PM EST",
    location: "Live Security CyberLab",
    price: 0,
    isFree: true,
    rating: 4.9,
    seatsTotal: 250,
    seatsLeft: 54,
    featured: false,
    image: "/images/event-10.jpg",
    speaker: {
      name: "Maya Patel",
      role: "Principal Security Researcher",
      company: "Guardian Cyber Defense",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    shortDescription: "Explore OWASP Top 10 vulnerabilities, secure authentication, API tokens, and penetration testing concepts.",
    fullDescription: "Security is non-negotiable in modern engineering. Maya Patel introduces developers to ethical penetration testing, intercepting requests, identifying SQL injections and XSS exploits, and hardening cloud endpoints with industry-standard protocols.",
    learnings: [
      "OWASP Top 10 web vulnerabilities explained with live examples",
      "JWT vs session cookies: security architecture trade-offs",
      "Configuring robust Content Security Policies (CSP) and CORS headers",
      "Defensive coding practices for Node.js and React web apps"
    ],
    agenda: [
      { time: "6:00 PM", topic: "Cybersecurity Mindset & Threat Modeling" },
      { time: "7:00 PM", topic: "Hands-on Lab: Finding and Fixing Common Exploits" },
      { time: "8:00 PM", topic: "Securing APIs, Microservices, and Auth Tokens" },
      { time: "8:45 PM", topic: "Q&A and Best Defensive Resources" }
    ],
    prerequisites: "Basic web programming knowledge (JavaScript, HTML, HTTP requests)."
  },
  {
    id: 11,
    title: "Financial Modeling & Valuation for Tech Startups",
    category: "Business",
    format: "In-Person",
    date: "Feb 20, 2027",
    isoDate: "2027-02-20",
    time: "1:00 PM - 5:00 PM CST",
    location: "Financial District, Chicago, IL",
    price: 49,
    isFree: false,
    rating: 4.8,
    seatsTotal: 60,
    seatsLeft: 14,
    featured: false,
    image: "/images/event-11.jpg",
    speaker: {
      name: "Daniel Kramer",
      role: "CFO Advisor & Angel Investor",
      company: "Apex Growth Partners",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },
    shortDescription: "Learn three-statement forecasting, SaaS unit economics (CAC, LTV, Churn), and investor cap tables.",
    fullDescription: "Demystify startup finance and build robust financial projections that venture capitalists respect. Daniel Kramer teaches step-by-step Excel and Google Sheets financial modeling, calculating runway, estimating customer acquisition costs, and modeling equity dilution.",
    learnings: [
      "Building dynamic revenue models for SaaS and marketplace products",
      "Key startup metrics: CAC payback, LTV:CAC ratio, Net Revenue Retention",
      "Structuring capitalization tables and option pools for early hires",
      "Defending financial assumptions during investor meetings"
    ],
    agenda: [
      { time: "1:00 PM", topic: "Core Principles of Early-Stage Startup Accounting" },
      { time: "2:15 PM", topic: "Building a Live 3-Year Forecasting Model" },
      { time: "3:45 PM", topic: "Cap Table Math & SAFE Note Conversion Simulator" },
      { time: "4:30 PM", topic: "Founder Office Hours & Individual Q&A" }
    ],
    prerequisites: "Basic spreadsheet familiarity (Google Sheets or Microsoft Excel)."
  },
  {
    id: 12,
    title: "User Research & Usability Testing Masterclass",
    category: "Design",
    format: "Online",
    date: "Feb 25, 2027",
    isoDate: "2027-02-25",
    time: "11:00 AM - 2:30 PM EST",
    location: "Zoom Interactive Lab",
    price: 0,
    isFree: true,
    rating: 4.9,
    seatsTotal: 160,
    seatsLeft: 29,
    featured: false,
    image: "/images/event-12.jpg",
    speaker: {
      name: "Teresa Gomez",
      role: "Head of UX Research",
      company: "Elevate UX Collective",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    },
    shortDescription: "Master non-leading interview questions, unmoderated user tests, heuristic evaluation, and research synthesis.",
    fullDescription: "Stop guessing what users want. Teresa Gomez reveals professional user experience research frameworks that uncover hidden customer frustrations. Learn how to recruit test participants, write non-biased interview scripts, conduct remote testing sessions, and present actionable findings.",
    learnings: [
      "Crafting unbiased user interview questions and moderation techniques",
      "Quantitative usability metrics: SUS score, Task Completion, Time on Task",
      "Affinity mapping and synthesis into actionable design opportunities",
      "Presenting user research insights to stakeholders persuasively"
    ],
    agenda: [
      { time: "11:00 AM", topic: "Foundations of Qualitative & Quantitative UX Research" },
      { time: "11:50 AM", topic: "Live Mock User Interview & Real-Time Critique" },
      { time: "1:00 PM", topic: "Affinity Mapping Sprint: Transforming Quotes to Features" },
      { time: "2:00 PM", topic: "Open Q&A and UX Research Career Paths" }
    ],
    prerequisites: "Open to UI/UX designers, product managers, and curious creators."
  }
];

export const CATEGORIES = [
  "All",
  "Technology",
  "Business",
  "Design",
  "Education"
];

export const FORMATS = [
  "All",
  "Online",
  "In-Person"
];
