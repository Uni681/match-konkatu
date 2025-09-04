// Cloudflare bindings
export interface Bindings {
  DB: D1Database;
  // Environment variables
  NOTIFICATION_EMAIL?: string;
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_USER?: string;
  SMTP_PASS?: string;
  FORM_SECRET?: string;
  // Add other bindings as needed (KV, R2, etc.)
}

// Contact form
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  inquiry_type?: string;
  message: string;
  privacy_agree?: boolean;
  website?: string; // Honeypot field
  csrf_token?: string; // CSRF protection
}

export interface ContactRecord extends ContactFormData {
  id: number;
  created_at: string;
  updated_at?: string;
  ip_address: string | null;
  user_agent: string | null;
  referer?: string | null;
  status: 'new' | 'read' | 'replied' | 'spam';
  spam_score?: number;
}

// Blog post
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: '婚活ノウハウ' | 'イベント情報';
  date: string;
  content: string;
  featured_image?: string;
  tags?: string[];
}

// Page metadata
export interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
  canonicalUrl?: string;
}

// CMS content types
export interface CMSContent {
  hero?: {
    title: string;
    subtitle: string;
    cta_text: string;
    cta_link: string;
    background_image?: string;
  };
  features?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  pricing?: {
    title: string;
    plans: Array<{
      name: string;
      price: string;
      features: string[];
      recommended?: boolean;
    }>;
  };
  testimonials?: Array<{
    name: string;
    age?: number;
    location?: string;
    comment: string;
    rating?: number;
  }>;
  faq?: Array<{
    question: string;
    answer: string;
  }>;
}

// Breadcrumb
export interface Breadcrumb {
  name: string;
  href: string;
}

// Email templates
export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

// Form validation
export interface FormValidationResult {
  isValid: boolean;
  errors: string[];
  spamScore: number;
}

// Rate limiting
export interface RateLimitInfo {
  count: number;
  resetTime: number;
  isLimited: boolean;
}