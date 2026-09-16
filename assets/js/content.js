/* ==========================================================================
   content.js — EVERY piece of text on the site lives here.
   Edit this file only; never touch main.js to change wording.
   Set  draft: false  once Sri Saye has approved the copy.
   ========================================================================== */

window.CONTENT = {

  draft: true,

  /* ── Identity ───────────────────────────────────────────────────────── */
  name:   "Sri Saye Magesh N",
  kicker: "Discipline · Precision · Country",
  role:   "MBA Candidate · Finance & Strategy · Risk & Compliance",
  roleShort: "Finance · Strategy · Risk",   // short form used in the nav lockup
  blurb:  "Forty-three months across statutory audit, AML transaction monitoring and UK corporate tax. Now reading for an MBA at Great Lakes Chennai, working on strategy, capital allocation and go-to-market.",
  resume: "assets/docs/resume_sri_saye_magesh_n.pdf",

  stats: [
    { value: "43",   label: "Months in practice" },
    { value: "40+",  label: "Audit clients run" },
    { value: "83%",  label: "Cycle time cut" },
    { value: "100+", label: "NCC cadets led" }
  ],

  /* ── 01 · About ─────────────────────────────────────────────────────── */
  about: {
    portrait: "assets/img/portrait.jpg",
    paragraphs: [
      "I work where compliance meets operations — finding the control that is failing, then fixing the process behind it.",
      "At NatWest I held a zero processing-error rate across two years of transaction monitoring, and identified a payment cut-off risk running through 2,000–3,000 transactions a day. The automated alert system I proposed cut daily violations by 70%. At M.R. Rajshekar & Co I ran delivery for more than 40 annual audit clients and rebuilt the workflow behind them, cutting process cycle time by 83%.",
      "I am now in the 2026–27 MBA batch at Great Lakes Institute of Management, Chennai, applying that same structure to strategy problems — market entry, channel economics and capital allocation — through live case competitions.",
      "Away from the desk I served as Company Sergeant Major with the NCC at Ramakrishna Mission Vivekananda College, responsible for over 100 cadets, and was selected for the NCC Youth Exchange Programme to Singapore. Five Services Selection Boards so far, three conference-outs. I play table tennis at state and district level and run long distance."
    ],
    tags: [
      "Risk & Controls",
      "Financial Analysis",
      "Process Optimisation",
      "Go-to-Market Strategy",
      "Structured Problem Solving"
    ],
    facts: [
      { label: "Based in",   value: "Chennai, Tamil Nadu" },
      { label: "Programme",  value: "MBA (PGPM), Great Lakes Chennai · Batch of 2026–27" },
      { label: "Experience", value: "43 months — audit, AML monitoring, corporate tax" },
      { label: "Open to",    value: "Consulting, strategy and finance roles" },
      { label: "Languages",  value: "English · Tamil · Hindi" }
    ]
  },

  /* ── 02 · Skills ────────────────────────────────────────────────────── */
  skills: [
    {
      group: "Risk & compliance",
      items: [
        { name: "Risk mitigation & internal controls", level: 90 },
        { name: "AML transaction monitoring",          level: 88 },
        { name: "Statutory & tax audit",               level: 85 },
        { name: "Regulatory reporting",                level: 75 }
      ]
    },
    {
      group: "Finance & analysis",
      items: [
        { name: "Financial statement analysis", level: 85 },
        { name: "Cash flow & DCF modelling",    level: 80 },
        { name: "Unit economics",               level: 78 },
        { name: "Quantitative modelling",       level: 72 }
      ]
    },
    {
      group: "Strategy & delivery",
      items: [
        { name: "Process & cycle-time optimisation", level: 90 },
        { name: "Structured problem solving",        level: 85 },
        { name: "Client & stakeholder management",   level: 85 },
        { name: "Go-to-market strategy",             level: 72 }
      ]
    }
  ],

  /* ── 03 · Experience ────────────────────────────────────────────────── */
  experience: [
    {
      period:   "Oct 2024 — Mar 2026",
      role:     "Audit Assistant",
      org:      "M.R. Rajshekar & Co",
      location: "Chennai, India",
      points: [
        "Executed tax and statutory audit engagements at 100% accuracy, keeping regulatory compliance clean across the portfolio.",
        "Ran standalone account management and delivery for more than 40 annual audit clients, holding on-time completion through peak season.",
        "Reviewed accounting and operational workflows for systemic bottlenecks, then rebuilt the process — cutting cycle time by 83%."
      ]
    },
    {
      period:   "Oct 2022 — Sep 2024",
      role:     "Customer Service & Operations Analyst",
      org:      "NatWest Digital Services India",
      location: "Chennai, India",
      points: [
        "Applied transaction monitoring frameworks to complex international flows, identifying and escalating high-risk anomalies across AML, global sanctions and fraud.",
        "Identified a critical payment cut-off risk in transaction filtering and proposed an automated visual alert system, cutting daily violations by 70% across 2,000–3,000 daily cut-off transactions.",
        "Led process improvements that strengthened system controls, saving 3–4 seconds per transaction and eight labour hours a day.",
        "Maintained a zero processing-error rate across the full two-year tenure."
      ]
    },
    {
      period:   "Jul 2022 — Oct 2022",
      role:     "Tax Analyst",
      org:      "EY Global Delivery Services India",
      location: "Chennai, India",
      points: [
        "Managed UK corporate tax assessment processes against HMRC regulations and internal quality standards.",
        "Resolved client tax enquiries inside stringent service-level timelines, lifting client satisfaction above benchmark."
      ]
    }
  ],

  /* ── 04 · Projects ──────────────────────────────────────────────────── */
  projects: [
    {
      title:    "GlobalCraft Innovations — Go-to-Market Strategy",
      category: "Strategy",
      description: "A Renegotiate–Rebuild–Diversify roadmap for a premium stationery exporter trapped by a legacy US distributor. Hybrid channel architecture pairing distributor-led national retail with a rebuilt direct-to-retailer model: trade margin 70% → 60%, cash cycle 120 → 30 days, US dependency 60% → 52%, and +44% revenue on the same demand.",
      stack:    ["Channel economics", "Negotiation strategy", "Scenario analysis", "Working capital"],
      links:    [{ label: "Deck", url: "assets/docs/globalcraft_gtm_strategy.pdf" }]
    },
    {
      title:    "Nova Consumer — Winning the Next 100 Million",
      category: "Strategy",
      description: "Market-entry and growth strategy for Tier-2 and Tier-3 India in beauty and personal care, built on a primary consumer survey and on-ground retail research into channel preference, price sensitivity and local trust drivers. Market sizing, segmentation, unit economics and a five-year roadmap to ₹2,500–3,500 Cr revenue and 95–100M consumers. Cleared two rounds to the Pre-Finals of the Learnous Case Study Challenge, Season 7.",
      stack:    ["Consumer research", "Market sizing", "Unit economics", "Go-to-market"],
      links:    [{ label: "Deck", url: "assets/docs/nova_consumer_next_100_million.pdf" }]
    },
    {
      title:    "The Good Doll — Retail Expansion Strategy",
      category: "Strategy",
      description: "A capital-efficient offline growth strategy built as a Test–Prove–Scale roadmap rather than a store-count plan. Cities prioritised on purchasing power, retail presence, cultural fit and logistics; channels chosen on customer fit and scalability across curated retail partnerships, experiential tourism, premium school channels and D2C–offline integration — inside a phased ₹1 Cr investment plan.",
      stack:    ["Channel strategy", "City prioritisation", "Unit economics", "Retail"],
      links:    [{ label: "Deck", url: "assets/docs/the_good_doll_retail_expansion.pdf" }]
    },
    {
      title:    "Tata Steel vs JSW Steel — Cash Flow Analysis",
      category: "Finance",
      description: "A three-year comparative study of cash generation quality across FY2024–FY2026, covering operating cash flow, investing and financing activity, free cash flow, capital expenditure and closing cash. Assessed FCF conversion, OCF-to-capex efficiency and reinvestment intensity to judge which company can fund its own growth.",
      stack:    ["Cash flow analysis", "Ratio analysis", "Comparative benchmarking", "Excel"],
      links:    [{ label: "Model", url: "assets/docs/tata_steel_vs_jsw_cash_flow_analysis.xlsx" }]
    },
    {
      title:    "FinEase — AI Financial Analysis Agent",
      category: "AI & Product",
      description: "An AI tool, in development, that converts raw financial statements into structured analysis and generates industry-benchmarked insights and hypotheses.",
      stack:    ["AI agents", "Financial analysis", "Benchmarking"],
      links:    []
    }
  ],

  /* ── 05 · Education & certifications ────────────────────────────────── */
  education: [
    {
      year:  "2026 — 2027",
      title: "MBA (PGPM)",
      org:   "Great Lakes Institute of Management, Chennai",
      note:  "CGPA 3.28 · Member, Food Committee 2026"
    },
    {
      year:  "2019 — 2022",
      title: "B.Com (Commerce)",
      org:   "Ramakrishna Mission Vivekananda College, Chennai",
      note:  "80.8% · Company Sergeant Major, NCC"
    },
    {
      year:  "2021",
      title: "CMA (Intermediate)",
      org:   "Institute of Cost Accountants of India",
      note:  "Cleared the intermediate level."
    },
    {
      year:  "2026",
      title: "Discounted Cash Flow Modelling",
      org:   "Coursera",
      note:  "Valuation and cash flow modelling certification."
    },
    {
      year:  "2019",
      title: "Diploma in Computer Application",
      org:   "Common Service Centre (CSC)",
      note:  "Foundational computing and office systems."
    }
  ],

  /* ── 06 · Achievements ──────────────────────────────────────────────── */
  achievements: [
    { figure: "1st",  title: "Mock SSB — Army",          note: "Placed first in the Services Selection Board mock interview conducted by DGV College, Chennai." },
    { figure: "3/5",  title: "SSB Conference-Outs",      note: "Three conference-outs across five Services Selection Boards attended to date." },
    { figure: "100+", title: "Cadets Commanded",         note: "Company Sergeant Major, NCC · Ramakrishna Mission Vivekananda College · 2021–22." },
    { figure: "YEP",  title: "Youth Exchange Programme", note: "Qualified for the NCC Youth Exchange Programme to Singapore, 2020." },
    { figure: "1st",  title: "Table Tennis",             note: "Inter-company champion representing NatWest, 2022. Multiple state and district-level titles." },
    { figure: "3rd",  title: "Marathon — 6 km",         note: "Third place over 6 km in 30 minutes · Strength Fit, Hosur · October 2021." },
    { figure: "Prize", title: "Paper Presentation",      note: "Prize-winner, Digitisation of India · DG Vaishnav College, Chennai." }
  ],

  /* ── 07 · Off duty ──────────────────────────────────────────────────── */
  /* HOW TO ADD PHOTOS:
     1. Drop <name>.jpg and <name>_t.jpg into the correct subfolder in
        assets/img/gallery/<galleryFolder>/
     2. Tell Antigravity "add images for <strand label>" and it will scan
        the folder and append the entries below automatically.              */
  offDuty: {
    lede: "Five dimensions beyond the spreadsheet — defence, stage, sport, music, and a lens — that shaped how I lead, compete, and create.",
    strands: [
      {
        label: "Defence & NCC",
        galleryFolder: "defence_ncc",
        text: "Being the CSM of 105 Cadets in National Cadet Corps inducted me in Defence. This experience culminated into being selected for Singapore Youth Exchange Program 2020. Reaching till level 3 in Army SSB Conference after 5 attempts and winning DGV College's mock SSB organised by real colonels, has made sure my innate ability to Lead under pressure has been proved multiple times.",
        gallery: [
          { src: "ncc_guard",    caption: "Guard duty · NCC",      alt: "Sri Saye Magesh in NCC uniform on guard duty" },
          { src: "ncc_portrait", caption: "Company Sergeant Major", alt: "Formal portrait in NCC uniform" },
          { src: "ncc_cadets",   caption: "The company · NCC",      alt: "Group of NCC cadets in uniform" }
        ]
      },
      {
        label: "Extracurricular",
        galleryFolder: "extracurricular",
        text: "Having been always an 'Yes Man' at school I have won more than 80 awards in diverse fields like elocution, acting, paintings, singing. Additionally being a President of annual drama club of my college provided ample exposure which helped in building creativity and adaptability and also made me curious learner throughout my life span.",
        gallery: []
      },
      {
        label: "Sports",
        galleryFolder: "sports",
        text: "I actively play multiple sports like badminton, Cycling and cricket to stay agile and team-oriented, but my core competitive drive lies in state-level Table Tennis and Long Distance Running. Table Tennis trained my split-second decision-making, while long-distance running taught me profound resilience. Beyond competition, prioritizing daily health and fitness is a non-negotiable that keeps my mind sharp under pressure. Whether on the pitch, the table, or the road, sports have hardwired me to outlast any challenge.",
        gallery: [
          { src: "sport_trophy", caption: "Long distance", alt: "Running trophy topped with a sprinting figure" }
        ]
      },
      {
        label: "Music",
        galleryFolder: "music",
        text: "Learning music and playing violin for four years has taught me several things. One lesson is the importance of endless patience and refinement in mastering anything. Secondly, participating in the bhajan group of my school revealed the significance of individual voices blending perfectly to form a harmonious group. It gives me the required balance as music complements my rational mindset. Headed many bhajan sessions in school times.",
        gallery: []
      },
      {
        label: "Photography",
        galleryFolder: "photography",
        text: "For me photography means freezing the neglected aspects of the fast paced environment around me. As I tend to find patterns among complex numbers and financial statements, similarly through photography, I can create images that capture both movement and tranquillity within a single shot. In photography, there is no need for any words rather images convey everything.",
        gallery: [
          { src: "photo_palm_sunset",  caption: "Sundown through the palms", alt: "Sun setting behind coconut palms" },
          { src: "photo_storm_cloud",  caption: "Anvil cloud building",       alt: "A towering storm cloud over rooftops at dusk" },
          { src: "photo_rooftop_dusk", caption: "Rooftop, last light",        alt: "Silhouette on a rooftop against the setting sun" },
          { src: "photo_night_bloom",  caption: "Night-blooming cereus",      alt: "A white night-blooming cereus flower" },
          { src: "photo_skyline_dusk", caption: "Chennai skyline at dusk",    alt: "Wide view of Chennai skyline at dusk" }
        ]
      }
    ]
  },

  /* ── 08 · Contact ───────────────────────────────────────────────────── */
  contact: {
    lede:     "Open to consulting, strategy and finance roles, and to case competitions. Email is the fastest route.",
    email:    "srisayemageshn10@gmail.com",
    phone:    "+91 63790 42424",
    location: "Chennai, Tamil Nadu, India",
    linkedin: "https://www.linkedin.com/in/sri-saye-magesh-n-296395225",
    github:   "https://github.com/SriSayeMagesh"
  }
};
