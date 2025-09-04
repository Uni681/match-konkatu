import { html } from 'hono/html';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
}

export const Hero = ({ title, subtitle, ctaText, ctaLink, backgroundImage }: HeroProps) => {
  return html`
<section class="relative bg-gradient-to-br from-primary-50 to-secondary-50 py-20 lg:py-28 overflow-hidden">
  ${backgroundImage ? html`
  <div 
    class="absolute inset-0 bg-cover bg-center opacity-20"
    style="background-image: url('${backgroundImage}')"
  ></div>
  ` : ''}
  
  <div class="relative z-10 container mx-auto px-4">
    <div class="text-center max-w-4xl mx-auto">
      <!-- Main Title -->
      <h1 class="font-mincho text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-on-scroll">
        ${title}
      </h1>
      
      <!-- Subtitle -->
      <p class="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto animate-on-scroll">
        ${subtitle}
      </p>
      
      <!-- CTA Button -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-on-scroll">
        <a href="${ctaLink}" class="btn btn-primary btn-lg group">
          <i class="fas fa-comments mr-2"></i>
          ${ctaText}
          <i class="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
        </a>
        
        <!-- Secondary CTA -->
        <a href="/contact" class="btn btn-secondary btn-lg">
          <i class="fab fa-line mr-2"></i>
          LINE相談
        </a>
      </div>
      
      <!-- Trust Indicators -->
      <div class="mt-12 pt-12 border-t border-gray-200">
        <div class="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
          <div class="flex items-center">
            <i class="fas fa-certificate text-primary-500 mr-2"></i>
            <span>IBJ正規加盟店</span>
          </div>
          <div class="flex items-center">
            <i class="fas fa-users text-primary-500 mr-2"></i>
            <span>80,000名以上の会員</span>
          </div>
          <div class="flex items-center">
            <i class="fas fa-heart text-primary-500 mr-2"></i>
            <span>親子で運営</span>
          </div>
          <div class="flex items-center">
            <i class="fas fa-shield-alt text-primary-500 mr-2"></i>
            <span>安心・安全</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Decorative Elements -->
  <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full opacity-20 transform translate-x-32 -translate-y-32"></div>
  <div class="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-secondary-200 to-primary-200 rounded-full opacity-20 transform -translate-x-24 translate-y-24"></div>
</section>
`;
};