/**
 * Sample / Demo Data Generator for SkillPath AI
 * Used when running in Demo Mode or when GEMINI_API_KEY is not yet configured.
 * Clearly marked as sample data to meet guidelines.
 */

export const getSampleAnalysis = (assessment) => {
  const career = assessment.careerGoal || 'Frontend Developer';
  const studyHours = assessment.dailyStudyHours || 2;
  const weeks = assessment.learningDurationWeeks || 8;
  const learningStyle = assessment.learningStyle || 'Practical projects';

  // Customized sample based on career
  if (career.toLowerCase().includes('data')) {
    return {
      isDemo: true,
      careerGoal: career,
      summary: `Sample Analysis: You have foundational curiosity in data manipulation. For a competitive ${career} role, you should bridge the gap between basic spreadsheet/scripting knowledge and industry-standard SQL query optimization, statistical testing, and reproducible analysis pipelines.`,
      readinessScore: 42,
      skillAnalysis: [
        {
          skill: "SQL & Relational Databases",
          currentLevel: "Basic",
          requiredLevel: "Advanced",
          status: "Needs Improvement",
          importance: "High",
          category: "Core Technical",
          reason: "Essential for querying analytical data warehouses, aggregations, window functions, and CTEs."
        },
        {
          skill: "Python & Pandas",
          currentLevel: "Intermediate",
          requiredLevel: "Advanced",
          status: "Needs Improvement",
          importance: "High",
          category: "Core Technical",
          reason: "Primary toolkit for data wrangling, feature engineering, and automating repetitive ETL tasks."
        },
        {
          skill: "Data Visualization (Tableau / PowerBI)",
          currentLevel: "Beginner",
          requiredLevel: "Intermediate",
          status: "Needs Improvement",
          importance: "High",
          category: "Frameworks & Tools",
          reason: "Stakeholders require intuitive visual dashboards and business intelligence reporting."
        },
        {
          skill: "Statistical Analysis & Hypothesis Testing",
          currentLevel: "None",
          requiredLevel: "Intermediate",
          status: "Missing",
          importance: "High",
          category: "Core Technical",
          reason: "Required to validate A/B tests, measure significance, and avoid spurious data correlations."
        },
        {
          skill: "Spreadsheets & Advanced Excel",
          currentLevel: "Intermediate",
          requiredLevel: "Intermediate",
          status: "Strong",
          importance: "Medium",
          category: "Core Technical",
          reason: "Quick ad-hoc financial models and exploratory analysis still rely heavily on Excel."
        },
        {
          skill: "Git & Version Control",
          currentLevel: "None",
          requiredLevel: "Basic",
          status: "Missing",
          importance: "Medium",
          category: "Architecture & Design",
          reason: "Critical for collaborating on shared analytics repos and maintaining reproducible code."
        }
      ],
      priorityGaps: [
        {
          skill: "Advanced SQL & Window Functions",
          priority: "High",
          reason: "Most data technical screenings start with complex multi-table joins and windowing.",
          prerequisite: "Basic SQL queries"
        },
        {
          skill: "Statistical Testing for Product Metrics",
          priority: "High",
          reason: "Distinguishes junior data extractors from analytical problem solvers.",
          prerequisite: "Basic probability"
        },
        {
          skill: "BI Dashboard Storytelling",
          priority: "Medium",
          reason: "Bridging the gap between raw data and executive decision-making.",
          prerequisite: "Clean data models"
        }
      ],
      roadmap: [
        {
          phase: 1,
          title: "Phase 1: Advanced SQL & Data Modeling",
          duration: "Weeks 1-2",
          focus: "Mastering complex querying, subqueries, and relational schema modeling.",
          objectives: [
            "Write nested queries and Common Table Expressions (CTEs)",
            "Master Window Functions (ROW_NUMBER, RANK, LAG/LEAD)",
            "Optimize query performance with indexing"
          ],
          tasks: [
            {
              id: "t-1",
              title: "Window Functions Deep Dive",
              skill: "SQL",
              description: "Learn how to compute running totals, moving averages, and ranks across partitions.",
              importance: "High",
              recommendedActivities: "Solve 15 LeetCode/HackerRank SQL medium challenges on window functions.",
              estimatedHours: 8,
              practicalTask: "Write a SQL query that ranks monthly customer cohort retention without self-joins.",
              completionCriteria: "All 15 query solutions execute within optimal runtime limits.",
              stepByStepGuide: [
                "Step 1: Set up a PostgreSQL or SQLite database with a sample transactions table.",
                "Step 2: Practice basic partition syntax using ROW_NUMBER(), RANK(), and DENSE_RANK() OVER (PARTITION BY ... ORDER BY ...).",
                "Step 3: Implement time-lag comparisons using LAG() and LEAD() to measure consecutive purchase intervals.",
                "Step 4: Compute cumulative metrics using SUM(amount) OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW).",
                "Step 5: Benchmark query performance with EXPLAIN ANALYZE and compare window functions against traditional self-joins."
              ],
              whatToDo: [
                "Always specify explicit ORDER BY clauses inside OVER() when computing running ranks or cumulative sums.",
                "Verify whether ties should receive identical ranks (RANK vs DENSE_RANK) based on business logic.",
                "Use CTEs to structure complex window calculations into readable logical stages."
              ],
              whatNotToDo: [
                "DO NOT use correlated subqueries when a window function can resolve the calculation in a single pass.",
                "DO NOT confuse PARTITION BY with GROUP BY — PARTITION BY does not collapse rows into a single record.",
                "DO NOT omit indexes on foreign keys and timestamp columns used inside PARTITION BY."
              ],
              completed: false
            },
            {
              id: "t-2",
              title: "Relational Schema Normalization",
              skill: "Database Design",
              description: "Understand 1NF through 3NF and star schema modeling for analytics.",
              importance: "High",
              recommendedActivities: "Study star vs snowflake schemas in dimensional modeling.",
              estimatedHours: 6,
              practicalTask: "Design an e-commerce analytical schema with fact and dimension tables.",
              completionCriteria: "Entity relationship diagram passes 3NF and analytical query efficiency checks.",
              stepByStepGuide: [
                "Step 1: Identify all core entities in an e-commerce workflow (users, orders, products, shipments).",
                "Step 2: Eliminate repeating groups to achieve First Normal Form (1NF).",
                "Step 3: Remove partial functional dependencies for 2NF and transitive dependencies for 3NF.",
                "Step 4: Design a dimensional star schema with a central fact_orders table and surrounding dimension tables (dim_users, dim_products, dim_dates).",
                "Step 5: Create SQL DDL migration files with appropriate PRIMARY KEY and FOREIGN KEY constraints."
              ],
              whatToDo: [
                "Denormalize carefully into star schemas specifically for read-heavy reporting and analytics warehouses.",
                "Use surrogate integer keys for dimensions instead of mutable natural business keys.",
                "Document entity relationships with clear ER diagrams before writing DDL statements."
              ],
              whatNotToDo: [
                "DO NOT store comma-separated lists of values in a single database column.",
                "DO NOT skip foreign key indexing on massive analytical transactional tables.",
                "DO NOT over-normalize dimensional reporting schemas into deep snowflake hierarchies unless required for storage."
              ],
              completed: false
            }
          ]
        },
        {
          phase: 2,
          title: "Phase 2: Exploratory Data Analysis & Python Pandas",
          duration: "Weeks 3-5",
          focus: "Data cleansing, missing value imputation, and automated EDA scripts.",
          objectives: [
            "Automate data ingestion from CSV, JSON, and SQL connections",
            "Handle datetime transformations and time-series aggregation",
            "Generate actionable visual summaries with Seaborn"
          ],
          tasks: [
            {
              id: "t-3",
              title: "Data Cleaning Pipeline with Pandas",
              skill: "Python & Pandas",
              description: "Build robust scripts to sanitize messy real-world survey and transaction data.",
              importance: "High",
              recommendedActivities: "Download a messy Kaggle dataset and write a modular cleaning script.",
              estimatedHours: 10,
              practicalTask: "Write a Python script that flags outliers and normalizes address strings.",
              completionCriteria: "Zero unhandled NaN errors when running on test batch files.",
              stepByStepGuide: [
                "Step 1: Ingest raw CSV data into a Pandas DataFrame using pd.read_csv with strict dtype specifications.",
                "Step 2: Inspect missing data patterns using df.isnull().sum() and visualize missingness with missingno.",
                "Step 3: Handle null values using context-appropriate imputation (median for skewed numbers, explicit 'Unknown' for categories).",
                "Step 4: Standardize dates and strings using pd.to_datetime and string accessor methods (.str.strip().str.lower()).",
                "Step 5: Write unit assertions using pd.testing.assert_frame_equal to verify repeatable transformation results."
              ],
              whatToDo: [
                "Encapsulate cleaning steps into functional pipeline methods using df.pipe().",
                "Log all data transformation dropped rows and imputed values for analytical auditing.",
                "Preserve raw source data by always creating a new transformed copy of the DataFrame."
              ],
              whatNotToDo: [
                "DO NOT use inplace=True as it can introduce hidden mutation bugs in Pandas.",
                "DO NOT drop entire rows automatically without understanding why data was missing.",
                "DO NOT chain index assignments like df['a'][1] = val (causes SettingWithCopyWarning)."
              ],
              completed: false
            },
            {
              id: "t-4",
              title: "Exploratory Data Analysis Report",
              skill: "Data Visualization",
              description: "Uncover distribution skewness, correlations, and anomalies using Seaborn/Matplotlib.",
              importance: "Medium",
              recommendedActivities: "Conduct an end-to-end EDA notebook with markdown documentation.",
              estimatedHours: 8,
              practicalTask: "Generate correlation heatmaps and boxplots for user churn factors.",
              completionCriteria: "Deliver a Jupyter notebook with documented insights and business takeaways.",
              stepByStepGuide: [
                "Step 1: Calculate summary statistics (mean, median, IQR, skewness) across numerical columns.",
                "Step 2: Plot distributions using Seaborn histplot with KDE overlays to check for normality.",
                "Step 3: Construct a Pearson / Spearman correlation matrix and visualize it with sns.heatmap.",
                "Step 4: Create categorical breakdown boxplots and violin plots to identify segment variations.",
                "Step 5: Summarize 3 core data anomalies or counter-intuitive correlations in Markdown narrative cells."
              ],
              whatToDo: [
                "Clearly label all visual axes, provide units, and choose colorblind-accessible palettes.",
                "Accompany every chart with 1-2 bullet points of business interpretation.",
                "Investigate extreme outliers before deciding whether to trim or keep them."
              ],
              whatNotToDo: [
                "DO NOT use 3D pie charts or misleading truncated axes that distort percentage differences.",
                "DO NOT present raw correlation numbers without checking for non-linear relationships.",
                "DO NOT produce silent charts without titles, legends, or explanatory context."
              ],
              completed: false
            }
          ]
        },
        {
          phase: 3,
          title: "Phase 3: Business Intelligence & Executive Storytelling",
          duration: "Weeks 6-8",
          focus: "Creating dynamic executive dashboards and presenting metric narratives.",
          objectives: [
            "Design user-friendly interactive BI dashboards",
            "Calculate business KPIs (LTV, CAC, Churn rate)",
            "Document findings for non-technical stakeholders"
          ],
          tasks: [
            {
              id: "t-5",
              title: "Interactive KPI Dashboard",
              skill: "Tableau / PowerBI",
              description: "Build an executive-ready dashboard with dynamic date filters and drill-downs.",
              importance: "High",
              recommendedActivities: "Follow dashboard UX best practices for color harmony and clarity.",
              estimatedHours: 12,
              practicalTask: "Create a SaaS revenue and cohort churn tracker dashboard.",
              completionCriteria: "Dashboard updates in under 2 seconds and includes clear metric definitions.",
              stepByStepGuide: [
                "Step 1: Connect Tableau / PowerBI to the normalized analytical star schema database.",
                "Step 2: Define calculated measures for Monthly Recurring Revenue (MRR), Customer Acquisition Cost (CAC), and LTV.",
                "Step 3: Lay out high-level KPI summary cards across the top header row for quick executive scanning.",
                "Step 4: Build interactive trend charts with date granularity parameters (Day, Week, Month).",
                "Step 5: Configure drill-through actions enabling viewers to click a churned cohort and inspect constituent account rows."
              ],
              whatToDo: [
                "Keep dashboard visual hierarchies simple: high-level metrics at top, detailed trends below.",
                "Provide tooltips that define the exact business formula behind each metric.",
                "Optimize workbook performance by filtering at the data source level before visual rendering."
              ],
              whatNotToDo: [
                "DO NOT clutter a single dashboard screen with more than 5-6 core charts.",
                "DO NOT use ambiguous color codings (stick to consistent semantic colors: green = growth, red = risk).",
                "DO NOT publish dashboards without testing date filter edge cases across leap years and month ends."
              ],
              completed: false
            }
          ]
        }
      ],
      projects: [
        {
          id: "p-1",
          title: "SaaS Retention & Churn Analytics Suite",
          description: "Analyze customer subscription churn patterns using SQL queries and interactive Python notebooks, concluding with an executive retention dashboard.",
          skills: ["SQL", "Python", "Pandas", "Tableau/PowerBI"],
          difficulty: "Intermediate",
          estimatedHours: 16,
          deliverables: [
            "Reproducible SQL ETL scripts with CTEs and window functions",
            "Jupyter notebook detailing churn correlation and feature importance",
            "Interactive dashboard tracking monthly recurring revenue (MRR) and cohort decay"
          ],
          careerRelevance: "Directly mirrors the daily analytics workflows at modern subscription and technology firms.",
          stepByStepGuide: [
            "Phase 1: Metric Definitions - Formalize churn formulas (subscriber churn vs revenue churn) and cohort boundaries.",
            "Phase 2: SQL Cohort Extraction - Write SQL queries with LAG and DATE_TRUNC to calculate month-over-month retention rates.",
            "Phase 3: Python Feature Analysis - Build a Jupyter notebook examining correlation between product usage frequency and cancellation.",
            "Phase 4: Dashboard Visualization - Create an interactive Tableau/PowerBI dashboard displaying cohort heatmap retention triangles.",
            "Phase 5: Executive Delivery - Write a 2-page executive summary outlining 3 strategic actions to curb user churn."
          ],
          whatToDo: [
            "Differentiate between voluntary churn (cancellations) and involuntary churn (expired credit cards).",
            "Use cohort-based retention curves instead of blended average churn rates.",
            "Make all data extraction SQL queries reproducible and version-controlled."
          ],
          whatNotToDo: [
            "DO NOT calculate churn rate simply as cancels divided by total active users without aligning timeframes.",
            "DO NOT present raw statistical data without explaining the financial revenue implications.",
            "DO NOT hardcode database credentials inside public project notebooks."
          ],
          completed: false,
          status: "Not Started"
        },
        {
          id: "p-2",
          title: "E-Commerce Market Basket & Recommendation Analyzer",
          description: "Apply association rule mining and SQL transactional aggregations to discover cross-sell opportunities for an online storefront.",
          skills: ["Python", "Pandas", "Association Rules", "Data Storytelling"],
          difficulty: "Advanced",
          estimatedHours: 20,
          deliverables: [
            "Transaction database schema design",
            "Python implementation of Apriori / FP-Growth algorithms",
            "Executive slide deck highlighting top 5 cross-selling bundles"
          ],
          careerRelevance: "Demonstrates practical revenue-driving analytical capability beyond simple descriptive metrics.",
          stepByStepGuide: [
            "Phase 1: Transactional Extraction - Query point-of-sale order line items and aggregate into basket transaction lists.",
            "Phase 2: Data Preprocessing - One-hot encode basket contents into sparse Boolean matrices using mlxtend.",
            "Phase 3: Association Mining - Run FP-Growth algorithm to identify item pairs with Support >= 0.02 and Confidence >= 0.5.",
            "Phase 4: Lift Evaluation - Filter and rank association rules by Lift (> 1.2) to discover genuine cross-sell affinities.",
            "Phase 5: Commercial Recommendations - Translate findings into bundle packaging and checkout upsell suggestions."
          ],
          whatToDo: [
            "Set appropriate minimum support thresholds to prevent memory exhaustion on large transaction catalogues.",
            "Focus on Lift rather than Confidence alone to avoid falsely recommending universally popular items.",
            "Present product recommendations in clear business terms with expected average order value (AOV) uplifts."
          ],
          whatNotToDo: [
            "DO NOT recommend items that customers already routinely buy together by default (e.g., iPhone + Charger) without incremental value.",
            "DO NOT run association mining on raw uncleaned data with seasonal promotional noise.",
            "DO NOT neglect computational efficiency when scaling beyond 100,000 distinct SKUs."
          ],
          completed: false,
          status: "Not Started"
        }
      ]
    };
  }

  // Default: Frontend / Full Stack / Software Engineering
  return {
    isDemo: true,
    careerGoal: career,
    summary: `Sample Analysis: You show good foundational drive toward becoming a ${career}. To stand out in today's engineering job market, your primary focus should be bridging the gap from basic syntax to modern component architecture, state management patterns, API error handling, and end-to-end project execution.`,
    readinessScore: 48,
    skillAnalysis: [
      {
        skill: "JavaScript (ES6+) & Asynchronous Programming",
        currentLevel: "Basic",
        requiredLevel: "Advanced",
        status: "Needs Improvement",
        importance: "High",
        category: "Core Technical",
        reason: "Core foundation of web development. Required for promises, async/await, closures, and event-driven architecture."
      },
      {
        skill: "React.js & Component Architecture",
        currentLevel: "Beginner",
        requiredLevel: "Intermediate",
        status: "Needs Improvement",
        importance: "High",
        category: "Frameworks & Tools",
        reason: "Industry standard library for building dynamic client-side applications with hooks and state isolation."
      },
      {
        skill: "HTML5 Semantic Structure & Modern CSS",
        currentLevel: "Intermediate",
        requiredLevel: "Intermediate",
        status: "Strong",
        importance: "High",
        category: "Core Technical",
        reason: "Critical for accessibility (a11y), responsive layouts (Flexbox/Grid), and SEO indexing."
      },
      {
        skill: "Git, Branching & GitHub Collaboration",
        currentLevel: "Basic",
        requiredLevel: "Intermediate",
        status: "Needs Improvement",
        importance: "Medium",
        category: "Architecture & Design",
        reason: "Essential for team workflows, pull request reviews, merge conflict resolution, and CI/CD."
      },
      {
        skill: "REST API Integration & Error Resilience",
        currentLevel: "None",
        requiredLevel: "Intermediate",
        status: "Missing",
        importance: "High",
        category: "Core Technical",
        reason: "Real-world web apps must fetch, cache, and gracefully handle network failures and loading states."
      },
      {
        skill: "TypeScript Fundamentals",
        currentLevel: "None",
        requiredLevel: "Basic",
        status: "Missing",
        importance: "Medium",
        category: "Core Technical",
        reason: "Most modern enterprise codebases enforce static typing to catch runtime bugs early."
      },
      {
        skill: "Tailwind CSS & Design Systems",
        currentLevel: "Basic",
        requiredLevel: "Intermediate",
        status: "Needs Improvement",
        importance: "Medium",
        category: "Frameworks & Tools",
        reason: "Enables rapid UI development with consistent spacing, typography scales, and responsive variants."
      }
    ],
    priorityGaps: [
      {
        skill: "Asynchronous JavaScript (Promises, async/await, event loop)",
        priority: "High",
        reason: "You cannot write reliable data-fetching React applications without deep async fluency.",
        prerequisite: "JavaScript syntax & functions"
      },
      {
        skill: "React State Management & Custom Hooks",
        priority: "High",
        reason: "Essential for building modular, maintainable user interfaces that update reactively.",
        prerequisite: "ES6 modules and destructuring"
      },
      {
        skill: "API Error Handling & Optimistic Updates",
        priority: "Medium",
        reason: "Distinguishes junior tutorial coders from production-ready developers.",
        prerequisite: "Fetch / Axios API basics"
      }
    ],
    roadmap: [
      {
        phase: 1,
        title: "Phase 1: JavaScript Mastery & Asynchronous Foundations",
        duration: "Weeks 1-2",
        focus: "Solidifying core language mechanics, closures, and async data handling.",
        objectives: [
          "Understand the JavaScript Event Loop, Call Stack, and Microtask Queue",
          "Master ES6+ syntax: destructuring, rest/spread, array methods (map, filter, reduce)",
          "Handle asynchronous operations with Promises and async/await cleanly"
        ],
        tasks: [
          {
            id: "t-1",
            title: "Async Data Fetcher with AbortController",
            skill: "JavaScript",
            description: "Build a reusable async utility function that handles network timeouts, cancelable requests, and status code errors.",
            importance: "High",
            recommendedActivities: "Implement retry logic with exponential backoff using vanilla JavaScript.",
            estimatedHours: 6,
            practicalTask: "Build a small CLI or browser script that fetches weather or user data with error recovery.",
            completionCriteria: "Handles 404, 500, network loss, and manual aborts gracefully without uncaught exceptions.",
            stepByStepGuide: [
              "Step 1: Set up a blank JavaScript module or Node sandbox. Avoid third-party fetch libraries.",
              "Step 2: Initialize an AbortController instance: const controller = new AbortController().",
              "Step 3: Attach a setTimeout to automatically call controller.abort() after 5000 milliseconds.",
              "Step 4: Use try/catch with fetch(url, { signal: controller.signal }) and explicitly check if (!res.ok) throw new Error(res.statusText).",
              "Step 5: Write an exponential backoff loop (1s, 2s, 4s delay) that retries transient 5xx server errors up to 3 times before returning a structured error."
            ],
            whatToDo: [
              "Always clean up setTimeout with clearTimeout if the fetch resolves before timeout.",
              "Distinguish between user-initiated AbortError and actual network connection drops.",
              "Return standardized payload shapes like { data, error, loading }."
            ],
            whatNotToDo: [
              "DO NOT use empty catch {} blocks that swallow failed network calls silently.",
              "DO NOT retry client errors (like 401 Unauthorized or 404 Not Found) — only retry transient 5xx errors.",
              "DO NOT install Axios or other heavy libraries before mastering native fetch."
            ],
            completed: false
          },
          {
            id: "t-2",
            title: "Functional Array Processing Exercises",
            skill: "JavaScript",
            description: "Practice transforming complex nested JSON payloads using map, filter, and reduce without mutating state.",
            importance: "Medium",
            recommendedActivities: "Solve 10 functional programming katas on exercism.org or LeetCode.",
            estimatedHours: 4,
            practicalTask: "Group an e-commerce order list by customer and compute average order values in a single reduce pass.",
            completionCriteria: "Pure function returns correct aggregated data without side effects.",
            stepByStepGuide: [
              "Step 1: Create a mock array of 20 orders containing customerId, itemCategory, and amount.",
              "Step 2: Write a pure function groupByCustomer that uses Array.prototype.reduce().",
              "Step 3: Inside the accumulator, compute running counts and total spend per customer without mutating the original order objects.",
              "Step 4: Chain a secondary .map() transformation to output formatted summaries with rounded currency figures.",
              "Step 5: Test edge cases: empty arrays, single-item arrays, and orders with 0 amounts."
            ],
            whatToDo: [
              "Always supply an initial accumulator value (e.g. {}) to .reduce() to prevent runtime type errors.",
              "Use Object.freeze() during unit testing to guarantee your functions do not mutate input data.",
              "Prefer clean destructuring inside callback parameters: ({ customerId, amount }) => ..."
            ],
            whatNotToDo: [
              "DO NOT use forEach with external variables when map or reduce produces a pure return value.",
              "DO NOT mutate properties on nested objects directly (e.g. order.processed = true).",
              "DO NOT write 50-line monolithic reduce callbacks — split helper logic into named functions."
            ],
            completed: false
          }
        ]
      },
      {
        phase: 2,
        title: "Phase 2: React Core & Component State Architecture",
        duration: "Weeks 3-5",
        focus: "Building reactive, accessible components with modern React hooks.",
        objectives: [
          "Master useState, useEffect, useMemo, and useCallback rules",
          "Create custom hooks for data fetching and browser state",
          "Manage lift-state-up patterns and Context API for global state"
        ],
        tasks: [
          {
            id: "t-3",
            title: "Custom Hook: useFetch & useLocalStorage",
            skill: "React.js",
            description: "Write custom hooks that encapsulate browser persistence and declarative API querying with cache.",
            importance: "High",
            recommendedActivities: "Review the official React docs on 'Reusing Logic with Custom Hooks'.",
            estimatedHours: 8,
            practicalTask: "Build a hook that syncs form input with localStorage and cleans up on unmount.",
            completionCriteria: "Hook provides { data, loading, error, refetch } and works across component remounts.",
            stepByStepGuide: [
              "Step 1: Create a src/hooks/useLocalStorage.js file taking (key, initialValue) parameters.",
              "Step 2: Use lazy state initialization: useState(() => { return JSON.parse(localStorage.getItem(key)) ?? initialValue; }).",
              "Step 3: Wrap localStorage.setItem in a useEffect with try/catch to safely handle browser storage quota exceptions.",
              "Step 4: Next, build useFetch(url, options) returning { data, loading, error, refetch } with AbortController cleanup in the useEffect return function.",
              "Step 5: Test remounting scenarios in React StrictMode to verify requests are aborted properly without memory leak warnings."
            ],
            whatToDo: [
              "Always wrap localStorage operations in try/catch to prevent crashes in private browsing mode.",
              "Include a cleanup function in useEffect to cancel active network subscriptions on unmount.",
              "Memoize refetch with useCallback so consumers can safely put it in dependency arrays."
            ],
            whatNotToDo: [
              "DO NOT call hooks conditionally inside if statements or loops (obey Rules of Hooks).",
              "DO NOT store circular or non-serializable objects (functions, DOM nodes) in localStorage.",
              "DO NOT trigger infinite re-renders by creating new object literals in hook return values without useMemo."
            ],
            completed: false
          },
          {
            id: "t-4",
            title: "Accessible Modal & Dropdown UI Components",
            skill: "React.js & Tailwind CSS",
            description: "Construct interactive UI primitives with keyboard navigation (Esc to close, focus trap) and ARIA attributes.",
            importance: "Medium",
            recommendedActivities: "Study WAI-ARIA authoring practices for dialogs and disclosures.",
            estimatedHours: 6,
            practicalTask: "Create a reusable Modal dialog with backdrop blur and smooth enter/leave transitions.",
            completionCriteria: "Full keyboard accessibility confirmed with Tab and Escape key testing.",
            stepByStepGuide: [
              "Step 1: Create a Modal component accepting isOpen, onClose, title, and children props.",
              "Step 2: Render the modal into document.body using ReactDOM.createPortal to avoid z-index stacking issues.",
              "Step 3: Add a window keydown event listener listening for Escape to trigger onClose(). Clean up the listener on unmount.",
              "Step 4: Add aria-modal='true', role='dialog', and aria-labelledby attributes.",
              "Step 5: Prevent background page scrolling when modal is open by adding overflow: hidden to document.body."
            ],
            whatToDo: [
              "Use React portals so modals always render at the top level of the DOM tree.",
              "Restore focus back to the triggering element when the modal is closed.",
              "Provide a visible backdrop click target to close the modal intuitively."
            ],
            whatNotToDo: [
              "DO NOT leave background page scrolling enabled while a modal is active.",
              "DO NOT forget to remove window event listeners in useEffect cleanup functions.",
              "DO NOT rely only on mouse clicks — test with keyboard only (Tab, Shift+Tab, Escape)."
            ],
            completed: false
          }
        ]
      },
      {
        phase: 3,
        title: "Phase 3: Production Polish, TypeScript & Full Project Delivery",
        duration: "Weeks 6-8",
        focus: "Typesafe props, routing, performance optimization, and project deployment.",
        objectives: [
          "Migrate React components to TypeScript with strict type definitions",
          "Implement client-side routing with deep linkable URLs",
          "Deploy to Vercel/Netlify with automated CI checks"
        ],
        tasks: [
          {
            id: "t-5",
            title: "TypeScript Integration for React State",
            skill: "TypeScript",
            description: "Define discriminated union types for async states (Idle, Loading, Success, Error) and component props.",
            importance: "High",
            recommendedActivities: "Convert an existing JavaScript component tree to .tsx with strict null checks.",
            estimatedHours: 10,
            practicalTask: "Write TypeScript interfaces for a product catalogue with cart actions and dispatch types.",
            completionCriteria: "Zero 'any' types used; compiler passes with no warnings.",
            stepByStepGuide: [
              "Step 1: Install TypeScript and typings: npm install -D typescript @types/react @types/react-dom.",
              "Step 2: Create a tsconfig.json file with strict: true, noImplicitAny: true, and jsx: 'react-jsx'.",
              "Step 3: Define discriminated unions for async state: type RequestState<T> = { status: 'idle' } | { status: 'loading' } | { status: 'success'; data: T } | { status: 'error'; error: string }.",
              "Step 4: Type component props with explicit interfaces or type aliases rather than generic object shapes.",
              "Step 5: Run npx tsc --noEmit to verify zero compiler type errors."
            ],
            whatToDo: [
              "Always enable strict null checks to eliminate 'cannot read properties of undefined' runtime crashes.",
              "Prefer discriminated unions with a common literal discriminator tag (e.g. status) for type-safe state handling.",
              "Type generic API responses using parameterized interfaces (ApiResponse<T>)."
            ],
            whatNotToDo: [
              "DO NOT use the any escape hatch to bypass difficult type checking.",
              "DO NOT use non-null assertion operator (!) unless you can mathematically prove the value cannot be null.",
              "DO NOT duplicate types that can be inferred with typeof or ReturnType<T>."
            ],
            completed: false
          },
          {
            id: "t-6",
            title: "Performance Optimization & Lighthouse Audit",
            skill: "Web Performance",
            description: "Use React.lazy, dynamic imports, and image optimization to achieve a 95+ Lighthouse score.",
            importance: "Medium",
            recommendedActivities: "Profile render passes with React DevTools Profiler to eliminate unnecessary re-renders.",
            estimatedHours: 6,
            practicalTask: "Split vendor bundles and run an automated performance audit on production build.",
            completionCriteria: "Achieve sub-1.5s Largest Contentful Paint (LCP) and zero layout shifts.",
            stepByStepGuide: [
              "Step 1: Run npm run build and inspect bundle size distribution using vite-plugin-visualizer or source-map-explorer.",
              "Step 2: Implement route-level code splitting using React.lazy and <Suspense fallback={<LoadingSpinner />}>.",
              "Step 3: Wrap expensive calculated values in useMemo and isolate component re-renders using React.memo.",
              "Step 4: Convert legacy PNG/JPEG assets to WebP/AVIF format and add explicit width/height to eliminate layout shifts (CLS).",
              "Step 5: Run Chrome Lighthouse audit in an Incognito window and ensure Performance, Accessibility, and Best Practices score 95+."
            ],
            whatToDo: [
              "Profile before optimizing: use React Profiler to pinpoint actual rendering bottlenecks.",
              "Ensure lazy-loaded chunks have smooth skeleton fallbacks so users don't see jarring blank flashes.",
              "Set explicit cache-control headers on static JS and CSS bundles in production."
            ],
            whatNotToDo: [
              "DO NOT wrap every single primitive component in React.memo prematurely without profiling.",
              "DO NOT load oversized 4K images when a 200px responsive thumbnail is required.",
              "DO NOT ignore layout shifts (CLS) caused by dynamically injected web fonts or banners."
            ],
            completed: false
          }
        ]
      }
    ],
    projects: [
      {
        id: "p-1",
        title: "DevSprint – Agile Kanban & Task Management App",
        description: "A responsive project management board featuring drag-and-drop task organization, priority filtering, localStorage persistence, and activity log.",
        skills: ["React.js", "Tailwind CSS", "Custom Hooks", "State Management"],
        difficulty: "Intermediate",
        estimatedHours: 18,
        deliverables: [
          "Interactive drag-and-drop column board (To Do, In Progress, Review, Done)",
          "Task tagging, priority indicators, and search filter",
          "Automated browser storage persistence and JSON export/import"
        ],
        careerRelevance: "Demonstrates practical ability to manage complex state trees and responsive user interactions that companies build every day.",
        stepByStepGuide: [
          "Phase 1: Architecture Planning - Define the board data model: columns array ('To Do', 'In Progress', 'Review', 'Done'), each holding tasks with { id, title, description, priority, tags, createdAt }.",
          "Phase 2: Project Setup & Layout - Initialize Vite + React with Tailwind CSS. Create a 4-column responsive grid that scrolls horizontally on mobile devices.",
          "Phase 3: Core Task CRUD - Implement TaskModal to add, edit, and delete tasks. Lift state to the top-level Board component to maintain a single source of truth.",
          "Phase 4: Drag-and-Drop Implementation - Use native HTML5 Drag and Drop attributes (draggable, onDragStart, onDragOver, onDrop) to enable moving tasks between columns.",
          "Phase 5: Persistence & Defensive UX - Persist board state to localStorage. Add debounced autosave, empty column placeholders, and a 'Reset Board' button.",
          "Phase 6: Polish & Accessibility - Add keyboard navigation (Esc to close modal, Tab key trap) and responsive status tags."
        ],
        whatToDo: [
          "Maintain immutable state updates: always use spread syntax or map/filter when reordering or updating tasks.",
          "Generate collision-proof unique IDs with crypto.randomUUID() rather than using array indices.",
          "Add visual hover indicators to drop zones so the user knows where their task will land."
        ],
        whatNotToDo: [
          "DO NOT mutate state directly (e.g. board.columns[0].tasks.push(newTask)) — this will break React's render lifecycle.",
          "DO NOT start implementing drag-and-drop before basic click-to-move or modal task editing works smoothly.",
          "DO NOT hardcode column identifiers as raw strings across multiple components — declare a shared COLUMNS enum."
        ],
        completed: false,
        status: "Not Started"
      },
      {
        id: "p-2",
        title: "CodePulse – GitHub Developer Profile & Repo Analyzer",
        description: "An analytics web app that queries the GitHub REST API to visualize developer commit velocity, top languages, contribution heatmaps, and repository star metrics.",
        skills: ["React.js", "REST API", "Recharts", "TypeScript"],
        difficulty: "Intermediate",
        estimatedHours: 22,
        deliverables: [
          "Debounced username search with graceful rate-limit handling and error banners",
          "Visual data charts for repository sizes, languages, and commit frequencies",
          "Responsive mobile-first layout with dark/light visual theme"
        ],
        careerRelevance: "Demonstrates API integration proficiency, data visualization, and defensive coding against third-party network failure.",
        stepByStepGuide: [
          "Phase 1: Project Setup & API Interface - Set up React with Recharts and Tailwind CSS. Create an api/github.js module for user profile and repos fetching.",
          "Phase 2: Search with Debounce - Implement an input field with a custom useDebounce hook (500ms delay) so requests only fire when the user finishes typing.",
          "Phase 3: Rate-Limit & Error Handling - Inspect HTTP response headers (X-RateLimit-Remaining, X-RateLimit-Reset). Display an informative warning badge when limits are near.",
          "Phase 4: Data Transformation - Calculate total repository stars, identify top 5 primary languages, and compute average repo size using pure utility functions.",
          "Phase 5: Recharts Integration - Build an interactive BarChart for top starred repositories and a Donut/Pie chart for language percentage breakdown.",
          "Phase 6: Empty & Loading States - Create pulsing skeleton loaders for charts while data fetches, and display an intuitive 'User Not Found' illustration for 404s."
        ],
        whatToDo: [
          "Always handle the null case for repository language (e.g. markdown-only or config repos have no language).",
          "Cache fetched profiles in sessionStorage so users navigating back do not re-consume GitHub API quota.",
          "Use ResponsiveContainer from Recharts so charts fit seamlessly on mobile screens."
        ],
        whatNotToDo: [
          "DO NOT store personal GitHub access tokens in public frontend client repositories.",
          "DO NOT fire network calls on every single keystroke — debouncing is mandatory.",
          "DO NOT assume repository lists are always under 30 items (account for GitHub pagination)."
        ],
        completed: false,
        status: "Not Started"
      }
    ]
  };
};
