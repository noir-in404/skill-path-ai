export const CAREER_ROLES = [
  {
    id: 'frontend',
    title: 'Frontend Developer',
    description: 'Build responsive, accessible, interactive web applications and user interfaces.',
    suggestedSkills: [
      'HTML5 & Semantic Web',
      'Modern CSS & Tailwind',
      'JavaScript (ES6+)',
      'React.js',
      'Git & Version Control',
      'REST APIs & Fetch',
      'TypeScript',
      'Web Performance & a11y'
    ]
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    description: 'Design robust APIs, microservices, databases, authentication, and server architectures.',
    suggestedSkills: [
      'Node.js & Express',
      'REST & GraphQL APIs',
      'SQL & Relational DBs',
      'MongoDB / NoSQL',
      'Authentication & JWT',
      'Docker & Containerization',
      'System Architecture',
      'Git & Version Control'
    ]
  },
  {
    id: 'fullstack',
    title: 'Full Stack Developer',
    description: 'Master both client-side interfaces and scalable backend services end-to-end.',
    suggestedSkills: [
      'JavaScript / TypeScript',
      'React.js',
      'Node.js & Express',
      'SQL / PostgreSQL',
      'RESTful API Design',
      'Git & GitHub',
      'Tailwind CSS',
      'Cloud Deployment'
    ]
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    description: 'Transform raw data into business intelligence, KPI dashboards, and strategic insights.',
    suggestedSkills: [
      'SQL Queries & CTEs',
      'Advanced Excel & Sheets',
      'Python & Pandas',
      'Tableau / PowerBI',
      'Data Cleansing & Wrangling',
      'Statistical Analysis',
      'Business Storytelling'
    ]
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Develop predictive models, machine learning algorithms, and deep analytical experiments.',
    suggestedSkills: [
      'Python',
      'Pandas & NumPy',
      'Scikit-Learn',
      'Machine Learning Models',
      'Statistics & Probability',
      'SQL & Data Warehousing',
      'Data Visualization'
    ]
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Designer',
    description: 'Craft intuitive user experiences, design systems, wireframes, and high-fidelity prototypes.',
    suggestedSkills: [
      'Figma & Auto Layout',
      'Wireframing & Prototyping',
      'User Research & Interviews',
      'Design Systems',
      'Information Architecture',
      'Usability Testing',
      'Interaction Design'
    ]
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst',
    description: 'Defend systems, analyze network vulnerabilities, and respond to cyber threat vectors.',
    suggestedSkills: [
      'Networking Protocols (TCP/IP)',
      'Linux Administration',
      'Vulnerability Scanning',
      'Security Fundamentals',
      'Python Scripting',
      'Incident Response',
      'SIEM Tools'
    ]
  },
  {
    id: 'ai-ml',
    title: 'AI/ML Engineer',
    description: 'Build and deploy machine learning pipelines, deep learning architectures, and LLM applications.',
    suggestedSkills: [
      'Python',
      'PyTorch / TensorFlow',
      'Linear Algebra & Calculus',
      'LLMs & Prompt Engineering',
      'Model Evaluation & Fine-tuning',
      'Vector Databases & RAG',
      'MLOps Basics'
    ]
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Drive product discovery, align stakeholder requirements, and prioritize engineering roadmaps.',
    suggestedSkills: [
      'Agile / Scrum Methodologies',
      'User Stories & Acceptance Criteria',
      'Product Strategy & Roadmapping',
      'Data-Driven Decision Making',
      'Customer Empathy & Discovery',
      'Wireframing & Spec Writing'
    ]
  },
  {
    id: 'marketing',
    title: 'Digital Marketing Specialist',
    description: 'Accelerate user acquisition through SEO, content marketing, paid campaigns, and funnel analytics.',
    suggestedSkills: [
      'Search Engine Optimization (SEO)',
      'Content Strategy & Copywriting',
      'Google Analytics 4',
      'Conversion Rate Optimization',
      'Social Media Marketing',
      'Email Campaigns & Automation'
    ]
  }
];

export const PROFICIENCY_LEVELS = [
  {
    level: 'Beginner',
    label: 'Beginner',
    description: 'I have little or no practical experience; theoretical awareness only.'
  },
  {
    level: 'Basic',
    label: 'Basic',
    description: 'I understand the core fundamentals and can follow tutorials.'
  },
  {
    level: 'Intermediate',
    label: 'Intermediate',
    description: 'I can use this skill independently for common tasks and solve standard bugs.'
  },
  {
    level: 'Advanced',
    label: 'Advanced',
    description: 'I can handle complex edge cases, architectural patterns, and optimize performance.'
  }
];

export const EDUCATION_LEVELS = [
  'High School Student / Graduate',
  'Undergraduate Student',
  'Graduate / Master’s Student',
  'Coding Bootcamp Student / Alum',
  'Self-Taught Developer',
  'Career Transitioner / Professional',
  'Other'
];

export const STUDY_HOURS_OPTIONS = [
  { value: 1, label: '1 hour / day', desc: 'Consistent light pace (~7 hrs/wk)' },
  { value: 2, label: '2 hours / day', desc: 'Balanced steady progress (~14 hrs/wk)' },
  { value: 3, label: '3 hours / day', desc: 'Accelerated study (~21 hrs/wk)' },
  { value: 4, label: '4+ hours / day', desc: 'Intensive full-time immersion (~28+ hrs/wk)' }
];

export const DURATION_OPTIONS = [
  { value: 4, label: '4 Weeks', desc: 'Sprint / Targeted refresher' },
  { value: 8, label: '8 Weeks', desc: 'Comprehensive core mastery' },
  { value: 12, label: '12 Weeks', desc: 'In-depth professional transition' },
  { value: 16, label: '16 Weeks', desc: 'Complete foundation to capstone portfolio' }
];

export const LEARNING_STYLES = [
  {
    id: 'Practical projects',
    title: 'Practical Projects',
    desc: 'Hands-on coding, building portfolio apps, and debugging exercises.'
  },
  {
    id: 'A combination of methods',
    title: 'A Combination of Methods',
    desc: 'Balanced mix of theory, video walkthroughs, and practical building.'
  },
  {
    id: 'Reading and documentation',
    title: 'Reading & Official Docs',
    desc: 'Deep reading of official documentation, architectural articles, and specifications.'
  },
  {
    id: 'Video-based learning',
    title: 'Video-Based Learning',
    desc: 'Visual lectures, video tutorials, and live coding demos.'
  }
];
