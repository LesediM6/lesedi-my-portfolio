
export interface ProjectDetails {
  problem: string;
  solution: string;
  features: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  category: 'AI & Data' | 'Web Development' | 'Cloud & DevOps' | 'Mobile';
  github: string;
  demo: string;
  image: string;
  featured: boolean;
  deepDive?: ProjectDetails;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  keywords: string[];
}

export interface Certificate {
  id: number | string;
  title: string;
  issuer: string;
  issueDate: string;
  imageUrl: string;
  verificationCode: string;
  skills: string[];
  category: string;
  description?: string;
  credentialUrl?: string;
  pdfUrl?: string;
  verificationId?: string;
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  education: string;
  languages: string[];
  bio: string;
  objective: string;
  profileImage: string;
}
