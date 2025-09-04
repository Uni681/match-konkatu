import { html, raw } from 'hono/html';

interface Plan {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

interface PriceTableProps {
  title: string;
  plans: Plan[];
}

export const PriceTable = ({ title, plans }: PriceTableProps) => {
  return html`
<section class="section section-alt">
  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="font-mincho text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        ${title}
      </h2>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        明朗会計で安心してご利用いただける料金プランをご用意しました
      </p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-${plans.length} gap-8 max-w-5xl mx-auto">
      ${raw(plans.map((plan, index) => `
        <div class="relative">
          ${plan.recommended ? `
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div class="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                おすすめ
              </div>
            </div>
          ` : ''}
          
          <div class="card ${plan.recommended ? 'ring-2 ring-primary-500 scale-105' : ''} h-full animate-on-scroll" style="animation-delay: ${index * 200}ms">
            <div class="card-body">
              <!-- Plan Header -->
              <div class="text-center mb-8">
                <h3 class="font-semibold text-2xl text-gray-900 mb-4">
                  ${plan.name}
                </h3>
                <div class="text-3xl font-bold text-primary-600 mb-2">
                  ${plan.price}
                </div>
                <p class="text-sm text-gray-500">
                  月会費・成婚料は別途
                </p>
              </div>
              
              <!-- Features List -->
              <ul class="space-y-4 mb-8">
                ${raw(plan.features.map(feature => `
                  <li class="flex items-start">
                    <i class="fas fa-check text-primary-500 mt-1 mr-3 flex-shrink-0"></i>
                    <span class="text-gray-700">${feature}</span>
                  </li>
                `).join(''))}
              </ul>
              
              <!-- CTA Button -->
              <div class="mt-auto">
                <a href="/contact?plan=${encodeURIComponent(plan.name)}" 
                   class="w-full ${plan.recommended ? 'btn-primary' : 'btn-outline'} btn block text-center">
                  <i class="fas fa-comments mr-2"></i>
                  相談する
                </a>
              </div>
            </div>
          </div>
        </div>
      `).join(''))}
    </div>
    
    <!-- Additional Pricing Info -->
    <div class="mt-16 max-w-4xl mx-auto">
      <div class="bg-white rounded-xl p-8 shadow-md">
        <h3 class="font-semibold text-xl text-gray-900 mb-6 text-center">
          料金について
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div class="text-2xl font-bold text-primary-600 mb-2">月会費</div>
            <div class="text-gray-700">17,600円〜22,000円（税込）</div>
            <div class="text-sm text-gray-500 mt-1">プランにより異なります</div>
          </div>
          
          <div>
            <div class="text-2xl font-bold text-primary-600 mb-2">成婚料</div>
            <div class="text-gray-700">220,000円（税込）</div>
            <div class="text-sm text-gray-500 mt-1">成婚時のみお支払い</div>
          </div>
          
          <div>
            <div class="text-2xl font-bold text-primary-600 mb-2">お見合い料</div>
            <div class="text-gray-700">0円</div>
            <div class="text-sm text-gray-500 mt-1">何度でも無料</div>
          </div>
        </div>
        
        <div class="mt-8 p-4 bg-gray-50 rounded-lg">
          <p class="text-sm text-gray-600 text-center">
            <i class="fas fa-info-circle mr-1"></i>
            分割払いのご相談も承ります。詳しくは無料相談でお聞きください。
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
`;
};