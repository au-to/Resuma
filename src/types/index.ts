// 用户相关类型
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// 简历数据结构
export interface Resume {
  id: string;
  user_id: string;
  title: string;
  content: ResumeContent;
  template_id?: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface ResumeContent {
  personal: PersonalInfo;
  summary?: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects?: Project[];
  languages?: Language[];
  certifications?: Certification[];
}

export interface PersonalInfo {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  highlights?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location?: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  description?: string;
}

export interface Skill {
  id: string;
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  startDate?: string;
  endDate?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Elementary' | 'Limited Working' | 'Professional Working' | 'Full Professional' | 'Native';
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

// 模板相关类型
export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  is_premium: boolean;
  styles: TemplateStyles;
}

export interface TemplateStyles {
  fonts: {
    heading: string;
    body: string;
  };
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
  };
  layout: 'single-column' | 'two-column' | 'modern' | 'classic';
  spacing: 'compact' | 'normal' | 'spacious';
}

// API 响应类型
export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 表单相关类型
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export interface ResumeFormData extends Omit<Resume, 'id' | 'user_id' | 'created_at' | 'updated_at'> {}

// 应用状态类型
export interface AppState {
  user: User | null;
  currentResume: Resume | null;
  isLoading: boolean;
  error: string | null;
}

// Supabase 数据库表类型
export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>;
      };
      resumes: {
        Row: Resume;
        Insert: Omit<Resume, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Resume, 'id' | 'created_at' | 'updated_at'>>;
      };
      templates: {
        Row: Template;
        Insert: Omit<Template, 'id'>;
        Update: Partial<Omit<Template, 'id'>>;
      };
    };
  };
}