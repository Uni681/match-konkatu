import { html } from 'hono/html';

interface Feature {
  title: string;
  description: string;
  icon?: string;
}

interface FeaturesProps {
  features: Feature[];
}

export const Features = ({ features }: FeaturesProps) => {
  return html`
<section class="section bg-white">
  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="font-mincho text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        MATCHが選ばれる理由
      </h2>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        親子2代で運営する温かい結婚相談所として、会員様に寄り添ったサポートを提供します
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      ${features.map((feature, index) => html`
        <div class="card group hover:-translate-y-2 transition-all duration-300 animate-on-scroll" style="animation-delay: ${index * 100}ms">
          <div class="card-body text-center">
            ${feature.icon ? html`
              <div class="mb-6">
                <div class="w-16 h-16 mx-auto bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <i class="${feature.icon} text-2xl text-white"></i>
                </div>
              </div>
            ` : ''}
            
            <h3 class="font-semibold text-xl text-gray-900 mb-4">
              ${feature.title}
            </h3>
            
            <p class="text-gray-600 leading-relaxed">
              ${feature.description}
            </p>
          </div>
        </div>
      `).join('')}
    </div>
    
    <!-- Additional Info -->
    <div class="mt-16 text-center">
      <div class="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12">
        <h3 class="font-mincho text-2xl font-bold text-gray-900 mb-4">
          無料相談実施中
        </h3>
        <p class="text-gray-700 mb-6 max-w-2xl mx-auto">
          まずはお気軽にご相談ください。あなたの婚活に関する疑問や不安に、経験豊富なカウンセラーがお答えします。
        </p>
        <a href="/contact" class="btn btn-primary btn-lg">
          <i class="fas fa-calendar-alt mr-2"></i>
          今すぐ予約する
        </a>
      </div>
    </div>
  </div>
</section>
`;
};