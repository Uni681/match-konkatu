import { html, raw } from 'hono/html';

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
<section class="section section-bg-pattern bg-white">
  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <div class="inline-flex items-center bg-primary-100 text-primary-800 px-6 py-3 rounded-full text-sm font-semibold mb-6">
        <i class="fas fa-star mr-2 text-primary-600"></i>
        選ばれる理由
      </div>
      <h2 class="font-mincho text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        MATCHが<span class="text-primary-600">選ばれる</span>理由
      </h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        親子2代で運営する温かい結婚相談所として、<br class="hidden md:block">
        会員様お一人おひとりに寄り添った<strong class="text-gray-900">きめ細かなサポート</strong>を提供します
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      ${raw(features.map((feature, index) => `
        <div class="group animate-on-scroll" style="animation-delay: ${index * 100}ms">
          <div class="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 h-full">
            ${feature.icon ? `
              <div class="mb-6">
                <div class="w-20 h-20 mx-auto bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <i class="${feature.icon} text-3xl text-white"></i>
                </div>
              </div>
            ` : ''}
            
            <h3 class="font-bold text-xl text-gray-900 mb-4 text-center">
              ${feature.title}
            </h3>
            
            <p class="text-gray-600 leading-relaxed text-center">
              ${feature.description}
            </p>
          </div>
        </div>
      `).join(''))}
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