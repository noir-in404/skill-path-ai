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

## 2. Problem Statement Alignment & Root Challenge Mapping

### The Root Challenge
Traditional educational curricula and online courses provide static, one-size-fits-all roadmaps. Aspiring developers and students face four crippling obstacles:
1. **Industry Benchmark Ambiguity:** Job seekers do not know which specific technical proficiencies employers currently prioritize.
2. **Uncalibrated Self-Assessment:** Candidates either suffer from imposter syndrome or false confidence due to lack of objective competency diagnostics.
3. **Tutorial Hell & Sequence Confusion:** Learners jump between disparate tutorials without a structured sequence, clear DOs/DON'Ts, or authoritative documentation references.
4. **Lack of Practical Portfolio Proof:** Resumes with generic copy-pasted tutorial code fail hiring manager screenings; candidates need production-grade portfolio capstones with verifiable deliverables.

### How SkillPath AI Directly Solves the Challenge

| Core Objective | User Need | SkillPath AI Solution | Verification |
| :--- | :--- | :--- | :--- |
| **Objective 1: Skill Gap Diagnostic** | Diagnose exact gaps between current abilities and industry benchmarks | Google Gemini API analyzes user's self-reported baseline against current industry standards across 4 calibrated tiers (`Basic`, `Intermediate`, `Advanced`, `Not started`). | `server/tests/assessment.test.js`, `client/tests/SkillGapPage.test.jsx` |
| **Objective 2: Prioritized Remediation** | Understand what high-leverage fundamentals to master first | Gemini generates a dedicated **Priority Gaps Banner** highlighting critical prerequisites (e.g. Asynchronous JS before React Hooks). | `server/tests/geminiService.test.js` |
| **Objective 3: Actionable Study Roadmap** | Eliminate confusion regarding what to learn, in what order, and from where | Interactive **Recommended Study Cards** open modal study roadmaps with a 4-step sequence, authoritative documentation links (MDN, React, PostgreSQL), DOs, and DON'Ts. | `client/tests/Modals.test.jsx`, `client/tests/RoadmapPage.test.jsx` |
| **Objective 4: Hands-on Practical Projects** | Build verifiable resume-ready portfolio proof | Interactive **Practical Exercise Cards** deliver complete execution guides, step-by-step blueprints, acceptance criteria, and deliverable checklists. | `client/tests/Modals.test.jsx`, `server/tests/roadmap.test.js` |
| **Objective 5: Time-Calibrated Progress** | Fit structured learning into real-world constraints (e.g. 1-2h/day) | Progress metrics dynamically compute milestone velocity, estimated study hours completed, and overall curriculum completion percentages. | `client/tests/DashboardPage.test.jsx`, `server/tests/validationMiddleware.test.js` |

---

## 3. Technology Stack

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

## 4. Project Structure

```text
skillpath-ai/
├── client/                     # React + Vite frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components (ErrorBoundary, SkipLink, Modals, Header, Sidebar, Toast)
│   │   ├── context/            # React Context (AssessmentContext for state & persistence)
│   │   ├── pages/              # 5 Core Application Pages (Dashboard, Assessment, SkillGap, Roadmap, Progress)
│   │   ├── services/           # Frontend API client
│   │   ├── utils/              # Career constants, options, styles
│   │   ├── App.jsx             # Main application layout
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Tailwind directives & typography
│   ├── tests/                  # Frontend Vitest test suite (Modals, SkillGap, Roadmap, Dashboard, ErrorBoundary)
│   ├── package.json
│   ├── vite.config.js          # Vite config with backend /api proxy & Vitest configuration
│   └── tailwind.config.js      # Custom warm-palette theme
├── server/                     # Express & Gemini backend
│   ├── controllers/            # Assessment & Roadmap controllers
│   ├── middleware/             # Validation middleware & centralized error handling
│   ├── routes/                 # Express API routes
│   ├── services/
│   │   ├── geminiService.js    # Official @google/genai integration
│   │   └── sampleDataService.js# High-quality sample data for Hackathon Demo Mode
│   ├── tests/                  # Backend Node.js test suite (health, assessment, roadmap, gemini, sampleData)
│   ├── app.js                  # Modular Express app
│   ├── index.js                # Server entry point
│   └── package.json
├── package.json                # Root scripts (unified npm test, build, dev)
└── README.md                   # Documentation
```

---

## 5. Quick Start & Running the Application

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

## 6. Key Features Walkthrough

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
- Renders clean table comparing *Current Self-Reported Proficiency* vs *Target Industry Expectation* across 4 clear tiers (`Basic`, `Intermediate`, `Advanced`, `Not started`).
- Dedicated **Priority Gaps Banner** highlighting critical prerequisite competencies to learn first.
- Filter tabs for fast triage across skill status and importance.

### 🗺️ Feature D: Personalized AI Learning Roadmap
- Structured weekly phases with learning objectives and focus areas.
- Every learning milestone includes:
  - Estimated study hours.
  - Interactive **Recommended Study Card** that opens a 4-step sequence guide and authoritative source materials.
  - Interactive **Practical Exercise Card** that delivers step-by-step instructions, DOs, and DON'Ts.
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

## 7. Comprehensive Testing & Quality Assurance Suite

SkillPath AI incorporates an end-to-end automated test suite spanning backend API endpoints, AI schema validation, fallback demo generation, React component lifecycles, and UI interaction flows.

### Test Architecture Overview

| Layer | Framework / Runner | Scope | Test Files | Tests |
| :--- | :--- | :--- | :--- | :--- |
| **Backend API & Endpoints** | Node.js Native Test Runner (`node:test`, `supertest`) | Health checks, API routing, HTTP 400 validation, error responses | `server/tests/health.test.js`, `server/tests/assessment.test.js`, `server/tests/roadmap.test.js` | 8 tests |
| **Backend Validation Middleware** | Node.js Native Test Runner (`node:test`, `supertest`) | Strict study hours and duration bounds, sanitized payloads | `server/tests/validationMiddleware.test.js` | 3 tests |
| **Backend AI & Schema** | Node.js Native Test Runner (`node:test`) | Model configuration, JSON sanitization, missing ID repair, fallback logic | `server/tests/geminiService.test.js`, `server/tests/sampleData.test.js` | 7 tests |
| **Frontend UI Components** | Vitest + React Testing Library + JSDOM | Modal dialogues, sequential learning guides, DOs & DON'Ts, table benchmarking | `client/tests/Modals.test.jsx`, `client/tests/SkillGapPage.test.jsx`, `client/tests/RoadmapPage.test.jsx` | 15 tests |
| **Frontend State & Resilience** | Vitest + React Testing Library | Error boundaries, skip links, career tracks, metrics aggregation, empty states | `client/tests/ErrorBoundary.test.jsx`, `client/tests/SkipLink.test.jsx`, `client/tests/DashboardPage.test.jsx`, `client/tests/constants.test.js` | 11 tests |
| **Total Automated Coverage** | **Vitest + Node.js Native** | **Full Stack End-to-End** | **13 Test Suites** | **44+ Automated Tests (100% Pass Rate)** |

### Running the Test Suites

#### 1. Run Complete Full-Stack Test Suite
```bash
npm test
```
*Executes both server and client test suites sequentially, validating 44+ tests.*

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
- **Centralized Middleware Pipeline:** Input validation (`validationMiddleware.js`) and error handling (`errorHandler.js`) isolated from controllers.
- **Defensive Parsing:** All Gemini API outputs pass through `geminiService.validateAndSanitize()`, ensuring non-crashing fallbacks for missing keys, step guides, and deliverables.
- **Input Validation:** Strict endpoint validation rejects empty or malformed requests with standard HTTP 400 bad request envelopes.

---

## 8. Accessibility & Universal Usability (WCAG 2.1 AA)

SkillPath AI is engineered to be fully usable across diverse environments, assistive screen readers, and keyboard-only navigation:

1. **Bypass Blocks (`SkipLink.jsx`):** A visible-on-focus skip link allows keyboard users to bypass sidebars and jump directly to the primary page (`#main-content`) complying with WCAG 2.4.1.
2. **Semantic ARIA Data Tables:** The Skill Gap Benchmark table is marked up with semantic ARIA roles (`role="table"`, `role="row"`, `role="columnheader"`, `role="cell"`), enabling screen reader users to navigate row-by-row and expand diagnostic reasoning via keyboard (`Enter` / `Space`).
3. **Modal Dialog Management:** `StudyGuideModal` and `ExerciseGuideModal` feature `role="dialog"`, `aria-modal="true"`, explicit `aria-labelledby` headers, and global `Escape` key listeners that instantly close the active dialogue.
4. **Accessible Form Controls:** Form inputs in the Assessment Wizard feature explicit `label htmlFor` bindings, `aria-label` tags on buttons, and clear validation error alerts.
5. **Color Independence & High Contrast:** Competency levels (Basic, Intermediate, Advanced) and statuses (Strong, Needs Improvement, Missing) use distinct typographic weight and icon badges rather than relying purely on color.

---

## 9. Responsible AI & Advisory Disclaimer

Skill levels entered by users are self-reported estimates. SkillPath AI provides actionable guidance and roadmaps based on modern technical benchmarks, but does not guarantee employment, job placement, or certified competence. Disclaimers are prominently displayed throughout the application.

---

## 10. License

MIT License. Built for the PromptWar Hackathon.
