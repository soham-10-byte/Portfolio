/**
 * Central Content Store for Soham Sen Portfolio
 * Adheres strictly to AGENT.md Section 5 facts and multi-page specifications.
 * NO HARDCODED COPY IN COMPONENTS.
 */

export const heroData = {
  logoText: "SOHAM SEN",
  logoTextMobile: "SS.",
  taglinePill: "DEVELOPER + GROWTH MARKETER",
  tagline: "I build the product. I build the buzz.",
  mainText:
    "MERN stack developer and growth marketer. I build full-stack products and run the SEO, ads and content that bring customers to them.",
  readMoreLink: "#about",
  readMoreLabel: "About me",
  imageSrc: "/images/soham-cartoon-portrait.png",
  imageAlt: "Portrait of Soham Sen",
  overlayText: {
    part1: "PRODUCT",
    part2: "+ BUZZ.",
  },
  locationText: "Based in India",
  primaryCta: {
    label: "LET'S WORK TOGETHER",
    href: "#contact",
  },
  secondaryCta: {
    label: "VIEW MY WORK",
    href: "#works",
  },
  resumeLink: {
    label: "DOWNLOAD RESUME",
    href: "/Soham-Sen-Resume.pdf",
  },
  floatingBadges: [
    { value: "₹15L+", label: "monthly sales" },
    { value: "15+", label: "brands grown" },
    { value: "12+", label: "engineering projects" },
  ],
  navLinks: [
    { label: "HOME", href: "/#home" },
    { label: "WORKS", href: "/#works" },
    { label: "ABOUT", href: "/#about" },
    { label: "SKILLS", href: "/#skills" },
    { label: "SERVICES", href: "/#services" },
    { label: "CONTACT", href: "/#contact" },
  ],
};

export const profile = {
  name: "Soham Sen",
  role: "MERN Stack Developer & Performance Marketer",
  tagline: "DEVELOPER + GROWTH MARKETER",
  hero: {
    h1Line1: "I BUILD THE PRODUCT.",
    h1Line2: "I BUILD THE BUZZ.",
    subline:
      "MERN stack developer and growth marketer. ₹15L+ monthly sales for a furniture brand, plus 15+ brands grown through SEO, ads and content.",
  },
  summary:
    "B.Tech Computer Science student and software developer with hands-on experience in React.js, Node.js, Express.js, REST APIs, MongoDB, authentication and debugging. Strong in Java, JavaScript, Python and SQL, with an interest in scalable backends, distributed systems, serverless and AI-powered systems.",
  location: "Kolkata, India", // [CONFIRM LOCATION WITH USER]
};

export const contact = {
  email: "sensoham2005@gmail.com",
  phone: "+91 9330777980",
  whatsappUrl: "https://wa.me/919330777980",
  linkedin: "https://www.linkedin.com/in/soham-sen-613815216/",
  github: "https://github.com/soham-10-byte",
  resumeUrl: "/Soham-Sen-Resume.pdf", // User to supply file in public/
};

export const stats = [
  {
    value: 15,
    prefix: "₹",
    suffix: "L+",
    label: "MONTHLY SALES",
    detail: "Generated for Steelam Furniture via integrated SEO & performance ads",
  },
  {
    value: 15,
    prefix: "",
    suffix: "+",
    label: "BRANDS GROWN",
    detail: "Cross-industry growth delivered through SEO, performance marketing & content",
  },
  {
    value: 12,
    prefix: "",
    suffix: "+",
    label: "ENGINEERING PROJECTS",
    detail: "Full-stack products, APIs, integrations and engineering prototypes",
  },
];

export const skills = {
  languages: {
    title: "Programming Languages",
    items: ["Java", "JavaScript (ES6+)", "Python", "SQL"],
  },
  backend: {
    title: "Backend Engineering",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "API Integration",
      "JWT Auth",
      "Authentication",
      "Error Handling",
    ],
  },
  frontend: {
    title: "Frontend Development",
    items: ["React.js", "HTML5", "CSS3", "Tailwind CSS"],
  },
  databases: {
    title: "Databases & Architecture",
    items: ["MongoDB", "MongoDB Atlas", "MySQL", "Database Design", "CRUD"],
  },
  aiEngineering: {
    title: "AI Engineering & Prototyping",
    items: [
      "LLM Workflows",
      "Prompt Engineering",
      "Context Engineering",
      "AI-Assisted Development",
      "AI Prototyping",
    ],
  },
  tools: {
    title: "Tools & DevOps Workflow",
    items: [
      "Git",
      "GitHub",
      "Postman",
      "VS Code",
      "Firebase",
      "Vercel",
      "Claude Code",
      "Cursor AI",
    ],
  },
  marketing: {
    title: "Performance & Growth Marketing",
    items: [
      "SEO Audits",
      "Content Strategy & Planning",
      "Page Optimization",
      "Performance Marketing (Ads)",
      "Niche Virality",
      "Video Shoots",
      "Videography",
      "Video Editing",
    ],
  },
  certification: {
    name: "Oracle Certified Foundations Associate – Agentic AI",
    issuer: "Oracle",
  },
};

export const experience = [
  {
    role: "Software Developer Intern",
    company: "Skydreamix Tech Solutions",
    period: "Aug 2025 – Feb 2026",
    type: "Hybrid",
    highlights: [
      "Built production-oriented features with React.js, Node.js, Express.js and REST APIs",
      "Built backend APIs for authentication, data handling, CRUD and application workflows",
      "Debugged and tested frontend and backend issues, including edge cases and integration errors",
      "Worked with Git/GitHub, code reviews, Agile, testing and deployment",
      "Used AI-assisted development for prototyping, debugging and documentation",
    ],
  },
];

export const devProjects = [
  {
    slug: "rasoi",
    title: "Rasoi – Smart Canteen Management Platform",
    year: "2026",
    date: "May 2026",
    role: "Full-Stack MERN Developer",
    tagline: "Food ordering and operational workflows, built end to end.",
    category: "MERN Full-Stack",
    stack: {
      frontend: ["React.js", "Responsive UI", "Role-Based Dashboards"],
      backend: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
      database: ["MongoDB", "Mongoose ODM"],
      integrations: ["Cloudinary", "Nodemailer", "AI-Assisted Development"],
    },
    stackFlat: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Cloudinary", "Nodemailer"],
    summary:
      "Full-stack MERN food ordering and canteen operations platform. Built with JWT authentication, role-based access control, responsive operational dashboards, Cloudinary media integration, and Nodemailer automated email workflows. AI-assisted tooling was used throughout for debugging, prototyping, and architecture refinement.",
    problem:
      "College and workplace canteens face severe rush-hour order bottlenecks, manual cash processing delays, and an inability to track kitchen preparation status in real time.",
    solution:
      "Engineered an end-to-end MERN architecture: a responsive digital ordering menu secured with JWT session tokens for customers, and an operational kitchen dashboard for queue monitoring with automated Nodemailer receipt dispatches.",
    features: [
      "Role-Based Access Control (RBAC) separating student ordering portals from canteen admin dashboards",
      "JWT-based session authentication with secure password hashing",
      "Cloudinary integration for optimized image delivery and menu media management",
      "Nodemailer automated email receipts and live order status notifications",
      "Structured MongoDB schemas with indexing for peak lunch-hour order throughput",
      "Responsive admin dashboards for real-time order queue and inventory management",
    ],
    highlights: [
      "REST APIs with structured error handling and input validation",
      "AI-assisted workflows used for debugging, prototyping, and architecture refinement",
      "Full CRUD operations for menu items, orders, and user management",
    ],
    howItWorks: [
      { step: "01", label: "BROWSE MENU", detail: "Customer logs in via JWT and browses the live canteen menu." },
      { step: "02", label: "PLACE ORDER", detail: "Secure order submitted through the Express REST API." },
      { step: "03", label: "KITCHEN QUEUE", detail: "Admin dashboard shows live queue pulled from MongoDB." },
      { step: "04", label: "EMAIL NOTIFY", detail: "Nodemailer dispatches automated receipt and order status update." },
    ],
    images: [
      { src: "/images/rasoi-menu.png", alt: "Rasoi food ordering menu with searchable categories and meal cards" },
      { src: "/images/rasoi-dashboard.png", alt: "Rasoi customer dashboard showing spend and order activity" },
    ],
    liveUrl: "https://rasoi-canteen-management-system.vercel.app/login",
    githubUrl: "[PLACEHOLDER URL]",
    image: "/images/rasoi-menu.png",
  },
  {
    slug: "calcutta-heritage",
    title: "The Calcutta Heritage",
    year: "2026",
    date: "Jan 2026",
    role: "Full-Stack MERN Developer",
    tagline: "A cultural archive built for Kolkata's living history.",
    category: "MERN Platform & CMS",
    stack: {
      frontend: ["React.js", "Responsive Frontend", "Editorial Reading UI"],
      backend: ["Node.js", "Express.js", "Backend APIs", "Data Management"],
      database: ["MongoDB", "Document Storage"],
      integrations: ["REST APIs", "AI-Assisted Debugging & Code Analysis"],
    },
    stackFlat: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    summary:
      "Heritage content platform with a responsive React frontend, secure administrative workflows, and a modular Node.js/Express backend for managing cultural archive data. AI-assisted debugging and code analysis were integrated throughout the development workflow.",
    problem:
      "Preserving and cataloguing Kolkata's historical monuments, colonial architecture, and street-level cultural narratives requires structured categorization, media management, and intuitive editorial workflows.",
    solution:
      "Built a full-stack digital archive with a Node.js/Express REST backend and MongoDB document storage, plus a secure admin workflow for content publishing and a high-contrast responsive reading experience for visitors.",
    features: [
      "Modular REST backend architecture supporting articles, landmarks, and timeline entries",
      "Secure administrative workflow for publishing, updating, and archiving heritage stories",
      "Responsive frontend with editorial typography and accessible reading layout",
      "Backend data management for heritage media, categories, and metadata",
      "AI-assisted debugging and code analysis integrated into the development workflow",
    ],
    highlights: [
      "Secure admin portal with authentication-protected publishing routes",
      "Backend APIs for structured data retrieval and archive management",
      "Responsive across all device sizes for field research and casual reading",
    ],
    howItWorks: [
      { step: "01", label: "DISCOVER", detail: "Visitor browses heritage entries by category or location on React frontend." },
      { step: "02", label: "READ", detail: "Rich article view renders editorial content fetched from MongoDB via REST API." },
      { step: "03", label: "ADMIN LOGS IN", detail: "Authenticated admin accesses the secure publishing workflow." },
      { step: "04", label: "PUBLISH & PERSIST", detail: "Content saved, updated, or archived through Express backend to MongoDB." },
    ],
    images: [
      { src: "/images/calcutta-heritage.jpg", alt: "The Calcutta Heritage homepage featuring illuminated Howrah Bridge and heritage tours" },
      { src: "/images/calcutta-heritage.jpg", alt: "The Calcutta Heritage editorial portal and journey planner" },
    ],
    liveUrl: "https://thecalcuttaheritage.com/",
    githubUrl: "[PLACEHOLDER URL]",
    image: "/images/calcutta-heritage.jpg",
  },
  {
    slug: "trial-class-booking",
    title: "Online Trial Class Booking System",
    year: "2026",
    date: "2026",
    role: "Full-Stack Developer",
    tagline: "Book a free trial session — zero friction, fully automated.",
    category: "Full-Stack Web App",
    stack: {
      frontend: ["React.js", "Responsive UI", "[PLACEHOLDER]"],
      backend: ["Node.js", "Express.js", "[PLACEHOLDER]"],
      database: ["MongoDB", "[PLACEHOLDER]"],
      integrations: ["[PLACEHOLDER]"],
    },
    stackFlat: ["React.js", "Node.js", "Express.js", "MongoDB"],
    summary:
      "Lead generation and onboarding platform that securely collects user details and lets prospective students book an online trial class for a defined trial period. [Additional details — PLACEHOLDER: supply specifics]",
    problem:
      "High drop-off rates on manual or multi-step booking flows reduce trial conversions for online educational programs. [PLACEHOLDER: add context]",
    solution:
      "Constructed a friction-free booking flow with instant field validation, automated slot reservation, and real-time backend persistence. [PLACEHOLDER: add implementation detail]",
    features: [
      "User data collection form with client-side validation",
      "Online trial class slot booking and confirmation flow",
      "Backend persistence of booking records in MongoDB",
      "Mobile-first responsive interface",
    ],
    highlights: [
      "Designed for low drop-off on small-screen mobile devices",
      "[PLACEHOLDER: add technical highlights]",
    ],
    howItWorks: [
      { step: "01", label: "ENTER DETAILS", detail: "User fills in contact and availability information." },
      { step: "02", label: "SELECT SLOT", detail: "Available trial class slots are presented for selection. [PLACEHOLDER]" },
      { step: "03", label: "CONFIRM", detail: "Booking confirmed and persisted to MongoDB via Express backend." },
      { step: "04", label: "NEXT STEPS", detail: "[PLACEHOLDER: describe notification or confirmation step]" },
    ],
    images: [
      { src: "/images/trial-class-booking.png", alt: "Codeyoung trial class booking homepage with mentor match and free trial call to action" },
    ],
    liveUrl: "https://code-young-trial-booking.vercel.app/",
    githubUrl: "[PLACEHOLDER URL]",
    image: "/images/trial-class-booking.png",
  },
];

export const marketingCases = [
  {
    slug: "steelam-furniture",
    brand: "Steelam Furniture",
    industry: "Furniture",
    websiteUrl: "https://steelamfurniture.com/",
    featured: true,
    headlineResult: "₹15L+",
    result: "₹15L+", // backward compatibility alias
    resultLabel: "MONTHLY SALES",
    metricLabel: "MONTHLY SALES",
    services: ["SEO", "Performance Marketing"],
    summary:
      "Generated more than ₹15L in monthly sales by pairing high-intent search visibility with targeted paid campaigns.",
    description:
      "Generated more than ₹15L in monthly sales by pairing high-intent search visibility with targeted paid campaigns.",
    challenge:
      "Furniture shoppers compare styles, materials, pricing and delivery before making a high-consideration purchase. The growth challenge was to help qualified buyers discover Steelam online and move from product exploration to a sales enquiry through clearer search coverage and coordinated campaigns.",
    approach: [
      "Reviewed technical SEO foundations, page titles, collection copy and internal links so search engines and shoppers could understand the catalogue more easily.",
      "Structured Google Search and Meta campaigns around product interest and buyer intent, with budgets and bids reviewed against enquiry quality.",
      "Aligned ad messages with relevant furniture collections and refined calls to action to make the next step clearer for prospective buyers.",
    ],
    results: [
      "Monthly sales exceeded ₹15L during the campaign period.",
      "Search and paid campaigns gave the furniture catalogue clearer coverage across discovery and purchase-intent moments.",
      "A repeatable campaign structure made it possible to review spend, search demand and enquiries together and prioritize the strongest opportunities.",
    ],
    deliverables: [
      "Technical SEO audit & page optimization",
      "Paid ads campaign architecture",
      "High-intent search keyword mapping",
      "Conversion rate optimization for product pages",
    ],
    images: [
      { src: "/images/steelam-homepage.jpg", alt: "Steelam Furniture homepage featuring its furniture collection" },
    ],
    image: "/images/steelam-homepage.jpg",
    timeline: "Completed",
    tags: ["Furniture", "Paid Ads", "SEO"],
  },
  {
    slug: "maxli-perfumes",
    brand: "Maxli Perfumes",
    industry: "Fragrance",
    websiteUrl: "https://www.maxlionline.com/",
    featured: false,
    headlineResult: "SEO + ADS",
    result: "SEO + ADS",
    resultLabel: "GROWTH CAMPAIGN",
    metricLabel: "GROWTH CAMPAIGN",
    services: ["SEO", "Performance Marketing"],
    summary:
      "A coordinated search and paid-media campaign designed to make Maxli Perfumes easier to discover and its fragrance range easier to explore online.",
    description:
      "A coordinated search and paid-media campaign designed to make Maxli Perfumes easier to discover and its fragrance range easier to explore online.",
    challenge:
      "Fragrance is difficult to evaluate online because shoppers cannot sample a scent through a screen. The campaign needed to communicate product character clearly, reach people with relevant intent, and make product discovery feel straightforward.",
    approach: [
      "Mapped commercial fragrance searches to product and category pages, then improved page titles, descriptions and on-page relevance.",
      "Organized Google and Meta campaigns by audience intent and product interest, with performance reviewed using traffic and purchase-path signals.",
      "Developed short-form creative concepts around scent notes, product presentation and gifting occasions to help shoppers imagine the fragrance.",
    ],
    results: [
      "Established a coordinated SEO and paid-media campaign for product discovery.",
      "Created reusable creative directions for fragrance notes, discovery and seasonal gifting.",
      "Defined a measurement loop around qualified visits, product engagement and attributed purchases so future budget decisions can follow observed performance.",
    ],
    deliverables: [
      "SEO audit & commercial search keyword mapping",
      "Google Search & Meta Ads structure",
      "Creative direction and video editing for video ads",
    ],
    images: [
      {
        src: "https://www.maxlionline.com/assets/images/hero_bottle1.webp",
        alt: "Maxli Signature Collection perfume bottle, photographed for the official Maxli website",
      },
      {
        src: "https://www.maxlionline.com/uploads/products/prod_million-love_1_49bdfc24a71d.webp",
        alt: "Million Love Extrait de Parfum from Maxli's official product collection",
      },
      {
        src: "https://www.maxlionline.com/assets/images/maxli_banner_privilege.webp",
        alt: "Maxli Atelier Discovery Coffret from the official Maxli website",
      },
    ],
    image: "https://www.maxlionline.com/assets/images/hero_bottle1.webp",
    timeline: "Campaign",
    tags: ["Fragrance", "Google Ads", "Meta Ads"],
  },
  {
    slug: "infinity-gym",
    brand: "Infinity Gym",
    industry: "Fitness",
    featured: false,
    headlineResult: "₹1L+",
    result: "₹1L+",
    resultLabel: "IN A SINGLE MONTH",
    metricLabel: "IN A SINGLE MONTH",
    services: ["Content Planning"],
    summary:
      "Community-focused short-form content helped generate more than ₹1 lakh in gym memberships within a 30-day period.",
    description:
      "Community-focused short-form content helped generate more than ₹1 lakh in gym memberships within a 30-day period.",
    challenge:
      "Local gyms compete for attention in a crowded feed, and broad fitness posts rarely give nearby prospects a reason to visit. The opportunity was to turn the gym's coaches, members and day-to-day progress into useful local content with a clear membership next step.",
    approach: [
      "Planned a 30-day mix of coach tips, member milestones, facility moments and beginner-friendly topics to support local discovery.",
      "Captured on-floor footage and edited it into concise vertical videos with an opening hook, readable captions and a single call to action.",
      "Used authentic member progress and technique explainers to make the content useful and shareable within the local fitness community.",
    ],
    results: [
      "Generated more than ₹1 lakh in gym memberships within a 30-day period.",
      "Built a consistent organic content system around local relevance, member stories and trial-pass enquiries.",
    ],
    deliverables: [
      "30-day strategic content planning calendar",
      "Short-form video shoots & dynamic reel editing",
      "Direct-response trial pass conversion hooks",
    ],
    images: [
      { src: "/images/infinity-gym.jpg", alt: "Infinity Fitness World brand identity and short-form content strategy" },
    ],
    image: "/images/infinity-gym.jpg",
    timeline: "30 Days",
    tags: ["Fitness", "Reels", "Content Virality"],
  },
  {
    slug: "baidick",
    brand: "Baidick",
    industry: "Growth Marketing",
    featured: false,
    headlineResult: "₹2L+",
    result: "₹2L+",
    resultLabel: "SALES WITHIN 4 MONTHS",
    metricLabel: "SALES WITHIN 4 MONTHS",
    services: ["Marketing"],
    summary:
      "A focused early-stage marketing programme generated more than ₹2 lakh in sales over four months.",
    description:
      "A focused early-stage marketing programme generated more than ₹2 lakh in sales over four months.",
    challenge:
      "An early-stage brand needs a clear offer, a focused audience and a practical way to learn which messages lead to sales. The work centered on creating that foundation and turning early demand into a trackable acquisition path.",
    approach: [
      "Clarified the core offer and mapped the customer journey from first impression through enquiry and purchase.",
      "Organized paid campaign tests around audience intent and message fit, using early response to guide the next iteration.",
      "Reviewed landing-page friction and campaign signals regularly, then refined creative and funnel steps around observed buyer behavior.",
    ],
    results: [
      "Generated more than ₹2 lakh in sales within four months.",
      "Established a repeatable foundation for campaign planning, creative testing and funnel review.",
    ],
    deliverables: [
      "Growth marketing strategy & positioning",
      "Early-stage paid customer acquisition funnel",
      "Iterative creative testing framework",
    ],
    images: [
      { src: "/images/baidick-logo.jpg", alt: "Baidick brand crest logo and growth marketing creative" },
    ],
    image: "/images/baidick-logo.jpg",
    timeline: "4 Months",
    tags: ["Marketing", "Early Traction", "Funnel"],
  },
  {
    slug: "design-inmyway",
    brand: "Design InMyWay",
    industry: "Interior Design",
    featured: false,
    headlineResult: "10+",
    result: "10+",
    resultLabel: "CLIENTS IN 4-5 MONTHS",
    metricLabel: "CLIENTS IN 4-5 MONTHS",
    services: ["SEO", "Marketing Strategy"],
    summary:
      "Search strategy and service positioning helped Design InMyWay acquire more than 10 design clients over four to five months.",
    description:
      "Search strategy and service positioning helped Design InMyWay acquire more than 10 design clients over four to five months.",
    challenge:
      "Design services are often difficult to compare from a short portfolio page. The challenge was to make the studio's offer easier to find in search, communicate its value clearly and give prospective clients a direct route to enquire.",
    approach: [
      "Audited core pages and mapped interior-design search intent to service pages, headings, metadata and supporting content.",
      "Clarified service packages and messaging so visitors could understand the studio's capabilities and choose a relevant next step.",
      "Structured project stories around the brief, design approach and finished work to give potential clients useful decision context.",
    ],
    results: [
      "Acquired more than 10 design clients over a four-to-five-month period.",
      "Created a clearer organic-search foundation and a more useful path from service discovery to project enquiry.",
    ],
    deliverables: [
      "Technical SEO audit and on-page optimization",
      "B2B service package & positioning strategy",
      "Conversion-focused case study layouts",
    ],
    images: [
      { src: "/images/case-design.svg", alt: "Design InMyWay SEO and positioning overview" },
    ],
    image: "/images/case-design.svg",
    timeline: "4-5 Months",
    tags: ["Interior Design", "B2B SEO", "Positioning"],
  },
];

export const marketingSkills = [
  "Content Planning & Strategy",
  "SEO Audits",
  "Page Optimization",
  "Paid Ads",
  "Going Viral in a Niche",
  "Video Shoots",
  "Videography",
  "Video Editing",
];

export const expertiseMarquee = [
  "SEO AUDITS",
  "MERN FULL-STACK",
  "META ADS",
  "REST APIS",
  "GOOGLE ADS",
  "CONTENT PLANNING",
  "AUTHENTICATION & JWT",
  "NICHE VIRALITY",
  "DATABASE ARCHITECTURE",
  "VIDEOGRAPHY & EDITING",
  "AI PROTOTYPING",
  "CONVERSION OPTIMIZATION",
];

export const services = [
  {
    number: "01",
    title: "Web & App Engineering",
    category: "DEVELOPMENT",
    description:
      "Production-grade web apps built on the MERN stack with bulletproof REST APIs, JWT authentication, responsive layouts, and robust database design.",
    deliverables: [
      "Custom React applications",
      "Express & Node.js backend services",
      "MongoDB database modeling",
      "Third-party API & payment integrations",
    ],
  },
  {
    number: "02",
    title: "Search Engine Optimization",
    category: "GROWTH",
    description:
      "Technical audits, on-page architecture, and keyword strategies that secure top rankings and capture high-intent commercial organic traffic.",
    deliverables: [
      "Comprehensive technical SEO audits",
      "Keyword research & content mapping",
      "Page speed & Core Web Vitals optimization",
      "Local & e-commerce search visibility",
    ],
  },
  {
    number: "03",
    title: "Performance Marketing",
    category: "GROWTH",
    description:
      "ROI-driven ad campaigns on Meta and Google Ads designed to convert cold audiences into paying customers with disciplined cost controls.",
    deliverables: [
      "Full-funnel campaign architecture",
      "High-converting ad creative direction",
      "A/B testing of angles and copy",
      "Attribution & ROAS tracking",
    ],
  },
  {
    number: "04",
    title: "Content Strategy & Video",
    category: "GROWTH",
    description:
      "End-to-end content production—from ideation and scripting to videography and dynamic post-production—engineered for viral distribution.",
    deliverables: [
      "Niche virality playbooks",
      "On-set videography & creative direction",
      "Fast-paced short-form video editing",
      "Omnichannel distribution strategy",
    ],
  },
];

export const process = [
  {
    step: "01",
    name: "DISCOVER",
    description:
      "Deep dive into your product architecture, current growth bottlenecks, target demographics, and commercial benchmarks.",
  },
  {
    step: "02",
    name: "PLAN",
    description:
      "Draft comprehensive technical specifications, database schemas, and API contracts—or map out a full-funnel ad & content calendar.",
  },
  {
    step: "03",
    name: "BUILD & LAUNCH",
    description:
      "Ship clean, tested MERN code into production environments, or roll out optimized ad sets and SEO assets with real-time tracking.",
  },
  {
    step: "04",
    name: "GROW & SCALE",
    description:
      "Iterate based on telemetry and user behavior. Scale server throughput or ad spend efficiently to maximize profitability.",
  },
];

export const navItems = [
  { label: "HOME", href: "/#home" },
  { label: "WORKS", href: "/#works" },
  { label: "ABOUT", href: "/#about" },
  { label: "SKILLS", href: "/#skills" },
  { label: "SERVICES", href: "/#services" },
  { label: "CONTACT", href: "/#contact" },
];

export const cta = {
  primary: "LET'S WORK TOGETHER",
  secondary: "VIEW MY WORK",
  developer: "HIRE ME AS A DEVELOPER",
  marketing: "GROW MY BRAND",
  navPill: "HIRE ME",
  resume: "DOWNLOAD RESUME",
  whatsapp: "WHATSAPP ME",
  formSubmit: "SEND MY MESSAGE →",
  formSuccess: "Thanks! I'll get back to you within 24 hours.",
  formTrust: "No spam. Just a quick, honest reply.",
};

export const formOptions = {
  interests: [
    "Website/App Development",
    "Digital Marketing & Growth",
    "Both",
    "Something else",
  ],
  budgets: [
    "Under ₹50,000",
    "₹50,000 – ₹1,50,000",
    "₹1,50,000 – ₹5,00,000",
    "₹5,00,000+",
    "Flexible / To be discussed",
  ],
};
