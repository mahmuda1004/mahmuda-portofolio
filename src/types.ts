export interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  company?: string;
  location?: string;
  blog?: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  created_at: string;
  size: number;
}

export interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'tools' | 'languages';
  level: number; // 0 to 100
  yearsOfExp: number;
}

export interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
  type: 'work' | 'education' | 'project';
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  skills?: string[];
  category: 'cloud-ai' | 'web-dev' | 'data-science' | 'cyber-net' | 'others';
}

export interface AwardOrHonor {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  description: string;
  link?: string;
  association?: string;
}

