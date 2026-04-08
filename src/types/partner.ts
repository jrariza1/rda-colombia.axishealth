export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface PartnerLogo {
  name: string;
  image_url?: string;
}

export interface RatingEntry {
  value: string;
  label: string;
  description: string;
}

export interface LandingSection<T = any> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: T[];
}

export interface PartnerConfig {
  slug: string;
  type: 'distributor' | 'd2c';
  name: string;
  distributor_id?: string;
  insurer_id?: string;
  landings?: string[];

  // Branding
  logo_url: string;
  primary_color: string;
  secondary_color: string;
  accent_color?: string;
  font_main?: string;
  border_radius?: string;
  custom_css?: string;
  template_id?: 'classic' | 'olelife' | 'rda';
  
  // Dynamic UI Protocol (Stitch Engine)
  style?: 'classic' | 'cyberpunk' | 'minimal' | 'axis-block';
  colors?: {
    background?: string;
    text_primary?: string;
    text_secondary?: string;
    accent?: string;
  };
  typography?: {
    family?: 'sans' | 'serif' | 'monospace';
    size_base?: string;
  };

  branding?: {
    images?: {
      hero?: string[];
    };
  };

  // Universal Sections
  sections: {
    hero: {
      eyebrow?: string;
      title: string;
      subtitle?: string;
      cta_primary?: { label: string; url: string };
      cta_secondary?: { label: string; url: string };
      images?: string[];
      metadata?: Record<string, any>;
    };
    features: LandingSection<FeatureItem>;
    benefits: LandingSection<Benefit>;
    products: LandingSection<Benefit>; 
    trust: {
      eyebrow?: string;
      title?: string;
      partner_logos: PartnerLogo[];
      ratings: RatingEntry[];
      rating_source?: string;
    };
    faq: LandingSection<FAQ>;
    testimonials: LandingSection<Testimonial>;
    stats?: {
      items: { label: string; value: string; icon?: string }[];
    };
    cta_banner?: {
      title: string;
      subtitle?: string;
      btn_label: string;
    };
    navbar: {
      language_label?: string;
      links?: { label: string; url: string }[];
    };
    footer: {
      description?: string;
      copyright?: string;
      links?: { label: string; url: string }[];
    };
  };

  // Contact & Support
  support_phone?: string;
  support_email?: string;

  // AI Agent
  agent_name?: string;
  agent_avatar_url?: string;
  agent_greeting?: string;
  agent_personality?: string;

  // Legal
  legal_notice?: string;
  privacy_url?: string;
  terms_url?: string;

  // Social
  social_links?: SocialLinks;

  // Plans
  plans?: Plan[];

  product_id?: string;
  vertical_id?: string;
  line_id?: string;
  agent_id?: string;
  product_data?: {
    id: string;
    entityId: string;
    vertical_id: string;
    line_id: string;
    agent_id: string;
    agentContext?: string;
    pdfUrl?: string;
    [key: string]: any;
  };
  handover_instruction?: string;
  projectType?: 'main' | 'partners';
  custom_config?: {
    code?: string;
    [key: string]: any;
  };
}


export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  period: string;
  features: string[];
  popular?: boolean;
  cta_text?: string;
  icon?: string;
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role?: string;
  company?: string;
  avatar_url?: string;
  quote: string;
  rating?: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
}

export const DEFAULT_CONFIG: PartnerConfig = {
  slug: 'default',
  type: 'd2c',
  name: 'Axis',
  logo_url: '/placeholder.svg',
  primary_color: '#0ea5e9',
  secondary_color: '#64748b',
  accent_color: '#f59e0b',
  font_main: 'Inter',
  border_radius: '0.5rem',
  projectType: 'partners',
  sections: {
    hero: {
      title: 'Protección para tu futuro',
      cta_primary: { label: 'Saber más', url: '#contact' },
    },
    features: { title: 'Características', items: [] },
    benefits: { title: 'Beneficios', items: [] },
    products: { title: 'Productos', items: [] },
    trust: { partner_logos: [], ratings: [] },
    faq: { title: 'FAQ', items: [] },
    testimonials: { title: 'Testimonios', items: [] },
    navbar: { language_label: 'ES', links: [] },
    footer: { copyright: `© ${new Date().getFullYear()} Axis.`, links: [] }
  },
  social_links: {},
  plans: []
};
