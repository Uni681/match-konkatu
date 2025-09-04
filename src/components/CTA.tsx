import { html, raw } from 'hono/html';

interface CTAProps {
  title?: string;
  subtitle?: string;
  primaryText?: string;
  primaryLink?: string;
  secondaryText?: string;
  secondaryLink?: string;
  variant?: 'default' | 'minimal' | 'gradient';
}

export const CTA = ({
  title = "無料相談でお聞きください",
  subtitle = "あなたの婚活に関する疑問や不安に、経験豊富なカウンセラーがお答えします。",
  primaryText = "無料相談を申し込む",
  primaryLink = "/contact",
  secondaryText = "LINE相談",
  secondaryLink = "/contact",
  variant = 'default'
}: CTAProps) => {
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'minimal':
        return 'bg-white border-t border-gray-200 py-12';
      case 'gradient':
        return 'bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 relative overflow-hidden';
      default:
        return 'section-bg-gradient-light py-20';
    }
  };

  const getTextClasses = () => {
    return variant === 'gradient' ? 'text-white' : 'text-gray-900';
  };

  const getSubtextClasses = () => {
    return variant === 'gradient' ? 'text-white/90' : 'text-gray-600';
  };

  return html`
<section class="elegant-section elegant-section-light">
  <div class="container mx-auto px-6 text-center max-w-4xl">
    <!-- Minimal Header -->
    <div class="w-20 h-px bg-primary-600 mx-auto mb-8"></div>
    
    <h2 class="elegant-heading mb-6">
      ${title}
    </h2>
    
    <p class="elegant-subheading mb-12 max-w-2xl mx-auto">
      ${subtitle}
    </p>
    
    <!-- Simple Buttons -->
    <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
      <a href="${primaryLink}" class="minimal-cta-primary group">
        ${primaryText}
        <i class="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform"></i>
      </a>
      
      ${secondaryText ? raw(`
        <a href="${secondaryLink}" class="minimal-cta-secondary group">
          <i class="fab fa-line mr-3 text-green-600"></i>
          ${secondaryText}
        </a>
      `) : ''}
    </div>
    
    <!-- Simple Contact Info -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-600">
      <div class="text-center">
        <div class="text-lg font-light mb-2">お電話</div>
        <div class="text-primary-600">045-XXX-XXXX</div>
      </div>
      <div class="text-center">
        <div class="text-lg font-light mb-2">営業時間</div>
        <div class="text-primary-600">平日10:00-19:00</div>
      </div>
      <div class="text-center">
        <div class="text-lg font-light mb-2">メール</div>
        <div class="text-primary-600">info@match-konkatsu.com</div>
      </div>
    </div>
  </div>
</section>
`;
};