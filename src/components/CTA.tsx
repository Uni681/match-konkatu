import { html } from 'hono/html';

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
        return 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-16';
      default:
        return 'bg-gradient-to-r from-primary-50 to-secondary-50 py-16';
    }
  };

  const getTextClasses = () => {
    return variant === 'gradient' ? 'text-white' : 'text-gray-900';
  };

  const getSubtextClasses = () => {
    return variant === 'gradient' ? 'text-white/90' : 'text-gray-600';
  };

  return html`
<section class="${getVariantClasses()}">
  <div class="container mx-auto px-4 text-center">
    <div class="max-w-3xl mx-auto">
      ${variant !== 'minimal' ? html`
        <i class="fas fa-heart text-4xl ${variant === 'gradient' ? 'text-white' : 'text-primary-500'} mb-6"></i>
      ` : ''}
      
      <h2 class="font-mincho text-2xl md:text-3xl font-bold ${getTextClasses()} mb-4">
        ${title}
      </h2>
      
      <p class="text-lg ${getSubtextClasses()} mb-8 leading-relaxed">
        ${subtitle}
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a href="${primaryLink}" class="btn ${variant === 'gradient' ? 'bg-white text-primary-600 hover:bg-gray-50' : 'btn-primary'} btn-lg group">
          <i class="fas fa-comments mr-2"></i>
          ${primaryText}
          <i class="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
        </a>
        
        ${secondaryText ? html`
          <a href="${secondaryLink}" class="btn ${variant === 'gradient' ? 'border-white text-white hover:bg-white hover:text-primary-600' : 'btn-outline'} btn-lg">
            <i class="fab fa-line mr-2"></i>
            ${secondaryText}
          </a>
        ` : ''}
      </div>
      
      <!-- Contact Info -->
      <div class="mt-8 pt-8 border-t ${variant === 'gradient' ? 'border-white/20' : 'border-gray-200'}">
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm ${getSubtextClasses()}">
          <div class="flex items-center">
            <i class="fas fa-phone mr-2"></i>
            <span>お電話: 045-XXX-XXXX</span>
          </div>
          <div class="flex items-center">
            <i class="fas fa-clock mr-2"></i>
            <span>平日10:00-19:00 / 土10:00-17:00</span>
          </div>
          <div class="flex items-center">
            <i class="fas fa-envelope mr-2"></i>
            <span>info@match-konkatsu.com</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;
};