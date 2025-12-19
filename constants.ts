import { Profile, Project, SkillCategory, Certificate, Experience } from './types';

export const PROFILE: Profile = {
  name: "Lesedi Mphachake",
  title: "Software Developer → Data Engineering & AI",
  location: "Johannesburg, South Africa",
  email: "lesedimoreno000@gmail.com",
  phone: "060 804 6435",
  linkedin: "https://www.linkedin.com/in/lesedi-mphachake-1b5080251/",
  education: "National Diploma in IT, Rosebank College (2022-2024)",
  languages: ["isiZulu", "sePedi", "Afrikaans", "English", "seSotho"],
  bio: "Highly motivated Software Engineer transitioning into Data Engineering and AI. Proficient in Python, SQL, and full-stack development with hands-on experience in AI integration and data pipelines. Recent graduate with practical project experience in e-commerce AI systems, sentiment analysis, and ethical AI auditing. Passionate about leveraging data to drive informed decision-making and building scalable, accessible systems.",
  objective: "Seeking Data Engineering/AI roles where I can apply my software development background to build robust data pipelines, implement machine learning solutions, and contribute to data-driven decision making. Particularly interested in ethical AI, data governance, and scalable system design.",
  profileImage: "https://github.com/LesediM6/Lesedi-Mphachake-Portfolio/blob/a964143ff4672ae92ea3ba1c73bc985d8205ce9e/lesedi.jpg?raw=true"
};

export const RESUME_KEYWORDS = [
  "Python", "SQL", "Data Pipelines", "Machine Learning", "AI", "PostgreSQL", "Redis", "Cloud", "Azure", 
  "Vercel AI SDK", "Data Modeling", "ETL", "React", "Node.js", "REST APIs", "Git", "Statistical Analysis", 
  "NLP", "Data Engineering", "Full-stack", "TypeScript", "Big Data", "Automation"
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    role: "AI Software Intern / Project Lead",
    company: "Academic/Capstone Projects",
    location: "Johannesburg",
    period: "2023 - Present",
    description: [
      "Led the development of Mzansi Market AI, integrating Vercel AI SDK with PostgreSQL to create a personalized recommendation engine.",
      "Engineered real-time sentiment analysis pipelines using Python and ML models, improving data ingestion speed by 30%.",
      "Conducted a comprehensive audit of gender bias in NLP models, documenting ethical risks and technical mitigation strategies."
    ],
    keywords: ["Python", "SQL", "Data Pipelines", "AI", "Vercel AI SDK", "NLP"]
  },
  {
    id: "exp-2",
    role: "Full Stack Developer",
    company: "Freelance / Personal Ventures",
    location: "Remote",
    period: "2022 - 2024",
    description: [
      "Built and deployed a high-conversion CV generator used by 50+ students to optimize their job applications.",
      "Developed secure backend systems using Node.js and JWT for various e-commerce and analytical platforms.",
      "Managed CI/CD pipelines through Vercel and GitHub, maintaining 99.9% uptime for deployed projects."
    ],
    keywords: ["Node.js", "React", "JWT", "Vercel", "Git", "Full-stack"]
  }
];

export const SKILLS: SkillCategory[] = [
  {
    category: "AI & Machine Learning",
    skills: ["Python", "Jupyter", "pandas", "Statistical Analysis", "Ethical AI"]
  },
  {
    category: "Data Engineering",
    skills: ["PostgreSQL", "MySQL", "Redis", "Data Modeling", "Data Pipelines"]
  },
  {
    category: "Cloud & DevOps",
    skills: ["Vercel", "Azure", "Firebase", "Git/GitHub"]
  },
  {
    category: "Backend Development",
    skills: ["Node.js", "Java", "REST APIs", "JWT Authentication"]
  },
  {
    category: "Frontend Development",
    skills: ["React", "JavaScript", "HTML/CSS", "Tailwind"]
  },
  {
    category: "Tools",
    skills: ["Visual Studio Code", "Android Studio", "Microsoft Office"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "mzansi-market-ai",
    title: "Mzansi Market AI",
    shortDescription: "AI-powered E-commerce Platform with smart recommendations.",
    description: "A comprehensive e-commerce platform leveraging the Vercel AI SDK to provide intelligent product recommendations and a seamless user experience.",
    technologies: ["PostgreSQL", "Redis", "Vercel AI SDK", "JWT", "React"],
    category: "AI & Data",
    github: "https://mzansimarket.vercel.app/",
    demo: "https://mzansimarket.vercel.app/",
    image: "https://i.pinimg.com/1200x/21/c4/8b/21c48bb96e1c9a891b961d020729ec52.jpg",
    featured: true
  },
  {
    id: "sentimentsphere",
    title: "SentimentSphere",
    shortDescription: "Real-time sentiment analysis pipeline.",
    description: "An end-to-end data processing pipeline that ingests text data and performs real-time sentiment analysis using machine learning models.",
    technologies: ["Python", "ML models", "React", "FastAPI"],
    category: "AI & Data",
    github: "https://sentimentsphere22.vercel.app/",
    demo: "https://sentimentsphere22.vercel.app/",
    image: "https://i.pinimg.com/1200x/52/ad/6a/52ad6a11c1dcb1692ff9e321bd520167.jpg",
    featured: true
  },
  {
    id: "marketing-content-gen",
    title: "AI Marketing Content Generator",
    shortDescription: "Intelligent copy generation for marketing campaigns.",
    description: "A specialized AI tool that uses large language models to generate high-conversion marketing copy and social media content based on user inputs.",
    technologies: ["LLMs", "React", "Node.js", "Vercel"],
    category: "AI & Data",
    github: "#",
    demo: "https://marketgen2.vercel.app/",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
    featured: true
  },
  {
    id: "gender-bias-audit",
    title: "Gender Bias AI Audit Report",
    shortDescription: "Analytical study on bias in AI linguistic models.",
    description: "A rigorous audit and technical report investigating gender-based bias within specific NLP models, proposing mitigation strategies and ethical frameworks.",
    technologies: ["Python", "Data Analysis", "NLP", "AI Ethics"],
    category: "AI & Data",
    github: "https://github.com/durksie/GENDER-BIAS-AUDIT-REPORT.git",
    demo: "https://github.com/durksie/GENDER-BIAS-AUDIT-REPORT",
    image: "https://i.pinimg.com/1200x/84/e2/87/84e287a6d00bd66130b2fab4ec5f7a3c.jpg",
    featured: false
  },
  {
    id: "cv-generator",
    title: "Smart CV Generator",
    shortDescription: "Automated ATS-friendly resume builder.",
    description: "A modern web application designed to help job seekers generate professional, data-driven, and ATS-compliant CVs in minutes.",
    technologies: ["React", "Tailwind CSS", "Node.js", "PDF-Lib"],
    category: "Web Development",
    github: "#",
    demo: "https://cvgeneration-rho.vercel.app/",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1000",
    featured: false
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: 1,
    title: "Building AI Powered Chatbots Without Programming",
    issuer: "IBM via Coursera",
    issueDate: "Nov 14, 2025",
    imageUrl: "https://github.com/LesediM6/Lesedi-Mphachake-Portfolio/blob/b191655db60a23cdde615171ba3c618ba306a284/chatbort-cert.JPG?raw=true",
    verificationCode: "40ED54528365",
    skills: ["AI Chatbots", "IBM Watson", "No-Code AI"],
    category: "AI & Machine Learning",
    description: "Advanced study of natural language processing and chatbot architecture using enterprise-grade tools."
  },
  {
    id: 2,
    title: "Artificial Intelligence on Microsoft Azure",
    issuer: "Microsoft via Coursera", 
    issueDate: "Dec 1, 2025",
    imageUrl: "https://github.com/LesediM6/Lesedi-Mphachake-Portfolio/blob/b191655db60a23cdde615171ba3c618ba306a284/azure-ai-cert.JPG?raw=true",
    verificationCode: "LYTXXHID79TV",
    skills: ["Microsoft Azure", "AI Services", "Cloud AI"],
    category: "Cloud & AI",
    description: "Specialized training in cloud-native AI services, vision, and language APIs on Azure."
  },
  {
    id: 3,
    title: "Python for Data Science, AI & Development",
    issuer: "IBM via Coursera",
    issueDate: "Dec 4, 2025",
    imageUrl: "https://github.com/LesediM6/Lesedi-Mphachake-Portfolio/blob/b191655db60a23cdde615171ba3c618ba306a284/python-ds-cert.JPG?raw=true",
    verificationCode: "T7PLOSICQWMM",
    skills: ["Python", "Data Science", "AI Development"],
    category: "Programming",
    description: "Comprehensive Python mastery for data manipulation, statistical modeling, and AI logic."
  },
  {
    id: 4,
    title: "Trustworthy AI: Managing Bias, Ethics, and Accountability",
    issuer: "Johns Hopkins University via Coursera",
    issueDate: "Dec 2, 2025",
    imageUrl: "https://github.com/LesediM6/Lesedi-Mphachake-Portfolio/blob/b191655db60a23cdde615171ba3c618ba306a284/trustworthy-ai-cert.JPG?raw=true",
    verificationCode: "U249REF7S8LE",
    skills: ["AI Ethics", "Bias Mitigation", "AI Governance"],
    category: "AI Ethics & Governance",
    description: "High-level framework for implementing accountable and fair AI systems in production."
  },
  {
    id: 5,
    title: "AI Foundations: Prompt Engineering with ChatGPT",
    issuer: "Arizona State University via Coursera",
    issueDate: "Nov 7, 2025",
    imageUrl: "https://github.com/LesediM6/Lesedi-Mphachake-Portfolio/blob/b191655db60a23cdde615171ba3c618ba306a284/prompt-engineering-cert.JPG?raw=true",
    verificationCode: "00568LUMMZUB",
    skills: ["Prompt Engineering", "ChatGPT", "LLM Optimization"],
    category: "AI & Machine Learning",
    description: "Optimization techniques for interacting with LLMs to generate high-value outputs."
  },
  {
    id: 6,
    title: "Generative AI with Large Language Models",
    issuer: "DeepLearning.AI & AWS via Coursera",
    issueDate: "Nov 11, 2025",
    imageUrl: "https://github.com/LesediM6/Lesedi-Mphachake-Portfolio/blob/b191655db60a23cdde615171ba3c618ba306a284/generative-ai-cert.JPG?raw=true",
    verificationCode: "4Rv2DNT0TvZG",
    skills: ["Generative AI", "LLMs", "AWS", "Deep Learning"],
    category: "AI & Machine Learning",
    description: "Technical deep dive into transformer architectures and scaling generative models on AWS."
  },
  {
    id: 7,
    title: "Emotional Intelligence",
    issuer: "Arizona State University via Coursera",
    issueDate: "Dec 12, 2025",
    imageUrl: "https://github.com/LesediM6/Lesedi-Mphachake-Portfolio/blob/b191655db60a23cdde615171ba3c618ba306a284/emotional-intelligence-cert.JPG?raw=true",
    verificationCode: "TKPPEKB5DV2",
    skills: ["Emotional Intelligence", "Soft Skills", "Leadership"],
    category: "Professional Development",
    description: "Critical professional skills for effective collaboration and team leadership in tech."
  },
  {
    id: 8,
    title: "Work Smarter, Not Harder: Time Management",
    issuer: "University of California, Irvine via Coursera",
    issueDate: "Dec 11, 2025",
    imageUrl: "https://github.com/LesediM6/Lesedi-Mphachake-Portfolio/blob/b191655db60a23cdde615171ba3c618ba306a284/time-management-cert.JPG?raw=true",
    verificationCode: "BLG73N76T3HK",
    skills: ["Time Management", "Productivity", "Professional Skills"],
    category: "Professional Development",
    description: "Methodologies for maximizing professional output and managing complex project timelines."
  }
];