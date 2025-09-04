// Cloudflare bindings
export interface Bindings {
  DB: D1Database;
  // Add other bindings as needed (KV, R2, etc.)
}

// Contact form
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactRecord extends ContactFormData {
  id: number;
  created_at: string;
  ip_address: string | null;
  user_agent: string | null;
  status: 'new' | 'read' | 'replied';
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