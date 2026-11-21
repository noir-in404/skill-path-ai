# SkillPath AI 🧭

> **Tagline:** From Career Ambition to Practical Skill Development.  
> *An AI-Powered Career Readiness & Skill Development Platform built for PromptWar.*

---

## 1. Project Overview

Students and fresh graduates often know what career they want, but struggle to answer three critical questions:
1. *Which exact skills does the industry actually demand for that role?*
2. *How do my current self-reported abilities compare against market expectations?*
3. *What should I learn next, in what order, and through which practical projects?*

**SkillPath AI** solves this problem. It does not simply recommend generic video courses. Instead, it leverages **Google's Gemini API** to analyze the precise gap between a student's current competencies and industry expectations, converts that gap into an actionable phased learning roadmap, and recommends resume-worthy portfolio projects to apply newly learned skills.

---

## 2. Technology Stack

- **Frontend:**
  - React.js (v18)
  - Vite for fast build and dev environment
  - Tailwind CSS for modern, polished SaaS styling
  - Lucide React for clean icons
  - Recharts for competency breakdown and milestone completion charts
- **Backend:**
  - Node.js & Express.js (ES Modules)
  - RESTful API endpoints (`/api/assessment/analyze`, `/api/roadmap/generate`, `/api/health`)
- **AI Integration:**
  - Official Google Gen AI JavaScript SDK: `@google/genai`
  - Configurable model (defaults to `gemini-2.5-flash` for high-speed structured generation)
  - Strict JSON schema generation with system instructions and defensive parsing
- **Data Persistence:**
  - Browser `localStorage` for assessment profile, generated roadmaps, task completion states, and project statuses.

---

## 3. Project Structure

```text
skillpath-ai/
├── client/                     # React + Vite frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components (Sidebar, Header, ApiKeyModal, Toast, etc.)
│   │   ├── context/            # React Context (AssessmentContext for state & persistence)
│   │   ├── pages/              # 5 Core Application Pages:
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── AssessmentPage.jsx
│   │   │   ├── SkillGapPage.jsx
│   │   │   ├── RoadmapPage.jsx
│   │   │   └── ProgressPage.jsx
│   │   ├── services/           # Frontend API client
│   │   ├── utils/              # Career constants, options, styles
│   │   ├── App.jsx             # Main application layout
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Tailwind directives & typography
│   ├── package.json
│   ├── vite.config.js          # Vite config with backend /api proxy
│   └── tailwind.config.js      # Custom warm-palette theme
├── server/                     # Express & Gemini backend
│   ├── controllers/            # Assessment & Roadmap controllers
│   ├── routes/                 # Express API routes
│   ├── services/
│   │   ├── geminiService.js    # Official @google/genai integration
│   │   └── sampleDataService.js# High-quality sample data for Hackathon Demo Mode
│   ├── .env.example            # Backend env template
│   ├── index.js                # Express server entry point
│   └── package.json
├── .env.example                # Root env template
├── package.json                # Root scripts
└── README.md                   # Documentation
```

---

## 4. Quick Start & Running the Application

### Prerequisites
- Node.js v18+ (tested on Node v24)
- npm v9+

### Step 1: Install Dependencies
From the repository root:
```bash
npm run install:all
```
*(Or install inside `server/` and `client/` individually with `npm install`)*

### Step 2: Configure Environment Variables
Copy `.env.example` to `server/.env`:
```bash
cp .env.example server/.env
```
Inside `server/.env`:
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```
> **Where to get a key:** You can generate a free Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey).

*(Note: If you do not have an API key right now, SkillPath AI includes a **Curated Demo Mode** that allows you to experience the complete interactive application immediately without any setup!)*

### Step 3: Run the Backend Server
In terminal 1:
```bash
npm run server
```
Server starts on `http://localhost:5000`.

### Step 4: Run the Frontend Client
In terminal 2:
```bash
npm run client
```
Client starts on `http://localhost:5173`. Open your browser to `http://localhost:5173`.

---

## 5. Key Features Walkthrough

### 🧭 Feature A: Career Dashboard
- Comprehensive overview displaying the user's active career goal, total readiness score, evaluated skills, and overall completion percentage.
- Interactive **Next Up Milestones** widget allows users to complete study tasks directly from the dashboard.
- Recharts competency breakdown chart categorizing skills into Strong, Needs Improvement, and Missing.
- One-click demo start for immediate evaluation.

### 📝 Feature B: Multi-Step Career Assessment
- **Step 1 (Background):** Education level (Undergraduate, Graduate, Bootcamp, Self-taught, etc.) and field of study.
- **Step 2 (Career Goal):** 10 popular industry tracks (Frontend Developer, Backend, Full Stack, Data Analyst, Data Scientist, UI/UX Designer, Cybersecurity Analyst, AI/ML Engineer, Product Manager, Digital Marketing) or custom user input.
- **Step 3 (Current Skills):** Interactive skill tagger with 1-click role suggestions, custom skill additions, and proficiency selection (*Beginner*, *Basic*, *Intermediate*, *Advanced*).
- **Step 4 (Learning Plan):** Daily study availability (1h, 2h, 3h, 4h+), target duration (4, 8, 12, 16 weeks), and preferred learning style.

### 🔍 Feature C: AI-Powered Skill Gap Analysis
- Gemini compares self-reported skills against live industry requirements for the selected career.
- Identifies **Strong**, **Needs Improvement**, and **Missing** skills.
- Renders dual progress bars comparing *Current Self-Reported Proficiency* vs *Target Industry Expectation*.
- Dedicated **Priority Gaps Banner** highlighting critical prerequisite competencies to learn first.
- Filter tabs for fast triage across skill status and importance.

### 🗺️ Feature D: Personalized AI Learning Roadmap
- Structured weekly phases with learning objectives and focus areas.
- Every learning milestone includes:
  - Estimated study hours.
  - Recommended study activities and official documentation.
  - Practical coding/design hands-on exercise.
  - Clear completion criteria.
- Real-time checkboxes that immediately update global progress and persist to `localStorage`.

### 💻 Feature E: Practical Portfolio Projects
- Recommends capstone projects to demonstrate applied mastery to employers.
- Includes difficulty level, estimated hours, skills applied, and expected portfolio deliverables.
- Interactive status tracking: *Not Started*, *In Progress*, or *Completed*.

### 📊 Feature F: Progress & Project Tracker
- Real-time analytics with Recharts visualizations showing milestone completion per phase.
- Task checklist with filter by completion status.
- Persistence across browser refreshes.

---

## 6. Comprehensive Testing & Quality Assurance Suite

SkillPath AI incorporates an end-to-end automated test suite spanning backend API endpoints, AI schema validation, fallback demo generation, React component lifecycles, and UI interaction flows.

### Test Architecture Overview

| Layer | Framework / Runner | Scope | Test Files | Tests |
| :--- | :--- | :--- | :--- | :--- |
| **Backend API & Endpoints** | Node.js Native Test Runner (`node:test`, `supertest`) | Health checks, API routing, HTTP 400 validation, error responses | `server/tests/health.test.js`, `server/tests/assessment.test.js`, `server/tests/roadmap.test.js` | 8 tests |
| **Backend AI & Schema** | Node.js Native Test Runner (`node:test`) | Model configuration, JSON sanitization, missing ID repair, fallback logic | `server/tests/geminiService.test.js`, `server/tests/sampleData.test.js` | 7 tests |
| **Frontend UI Components** | Vitest + React Testing Library + JSDOM | Modal dialogues, interactive step-by-step guides, table benchmarking | `client/tests/Modals.test.jsx`, `client/tests/SkillGapPage.test.jsx`, `client/tests/RoadmapPage.test.jsx` | 15 tests |
| **Frontend State & Resilience** | Vitest + React Testing Library | Error boundaries, career tracks, metrics aggregation, empty states | `client/tests/ErrorBoundary.test.jsx`, `client/tests/DashboardPage.test.jsx`, `client/tests/constants.test.js` | 9 tests |
| **Total Automated Coverage** | **Vitest + Node.js Native** | **Full Stack End-to-End** | **11 Test Suites** | **37+ Automated Tests (100% Pass Rate)** |

### Running the Test Suites

#### 1. Run Complete Full-Stack Test Suite
```bash
npm test
```
*Executes both server and client test suites sequentially, validating 37+ tests.*

#### 2. Run Backend API & AI Tests Only
```bash
npm run test:server
```

#### 3. Run Frontend React & Component Tests Only
```bash
npm run test:client
```

#### 4. Run Test Coverage Reports
```bash
npm run test:coverage
```

### Code Quality & Engineering Best Practices
- **Resilience via Error Boundaries:** Protected by `ErrorBoundary.jsx` preventing white-screen crashes and preserving user session data during runtime rendering exceptions.
- **Defensive Parsing:** All Gemini API outputs pass through `geminiService.validateAndSanitize()`, ensuring non-crashing fallbacks for missing keys, step guides, and deliverables.
- **Input Validation:** Strict endpoint validation rejects empty or malformed requests with standard HTTP 400 bad request envelopes.
- **Accessibility (a11y):** High-contrast typography, semantic HTML (`<main>`, `<header>`, `<aside>`, `<table>`), ARIA tags (`aria-label`, `aria-modal="true"`, `role="dialog"`), and full keyboard navigation (Escape, Tab focus traps).

---

## 7. Responsible AI & Advisory Disclaimer

Skill levels entered by users are self-reported estimates. SkillPath AI provides actionable guidance and roadmaps based on modern technical benchmarks, but does not guarantee employment, job placement, or certified competence. Disclaimers are prominently displayed throughout the application.

---

## 8. License

MIT License. Built for the PromptWar Hackathon.
