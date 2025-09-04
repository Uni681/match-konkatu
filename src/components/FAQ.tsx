import { html, raw } from 'hono/html';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faq: FAQItem[];
}

export const FAQ = ({ faq }: FAQProps) => {
  return html`
<section class="section section-alt">
  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="font-mincho text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        よくある質問
      </h2>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        ご入会を検討されている方からよくいただくご質問にお答えします
      </p>
    </div>
    
    <div class="max-w-4xl mx-auto">
      ${raw(faq.map((item, index) => `
        <div class="faq-item mb-4 animate-on-scroll" style="animation-delay: ${index * 100}ms">
          <button 
            class="faq-question w-full text-left bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-expanded="false"
            aria-controls="faq-answer-${index}"
          >
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-gray-900 pr-4 leading-relaxed">
                <i class="fas fa-question-circle text-primary-500 mr-3"></i>
                ${item.question}
              </h3>
              <div class="flex-shrink-0">
                <i class="fas fa-chevron-down text-gray-400 transform transition-transform duration-200"></i>
              </div>
            </div>
          </button>
          
          <div 
            id="faq-answer-${index}"
            class="faq-answer bg-white rounded-lg mt-2 shadow-sm"
            aria-labelledby="faq-question-${index}"
          >
            <div class="px-6 py-4 border-t border-gray-100">
              <div class="text-gray-700 leading-relaxed">
                <i class="fas fa-arrow-right text-primary-500 mr-3"></i>
                ${item.answer}
              </div>
            </div>
          </div>
        </div>
      `).join(''))}
    </div>
    
    <!-- Additional Help Section -->
    <div class="mt-16 text-center">
      <div class="bg-white rounded-xl p-8 md:p-12 shadow-md max-w-3xl mx-auto">
        <i class="fas fa-headset text-4xl text-primary-500 mb-6"></i>
        <h3 class="font-mincho text-2xl font-bold text-gray-900 mb-4">
          その他のご質問はお気軽に
        </h3>
        <p class="text-gray-700 mb-8 leading-relaxed">
          掲載されていないご質問や、個別のご相談がございましたら、
          お電話またはお問い合わせフォームよりお気軽にご連絡ください。
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:045-XXX-XXXX" class="btn btn-primary">
            <i class="fas fa-phone mr-2"></i>
            電話で相談: 045-XXX-XXXX
          </a>
          <a href="/contact" class="btn btn-outline">
            <i class="fas fa-envelope mr-2"></i>
            メールで相談
          </a>
        </div>
        
        <div class="mt-6 text-sm text-gray-500">
          <i class="fas fa-clock mr-2"></i>
          受付時間: 平日10:00〜19:00 / 土曜10:00〜17:00
        </div>
      </div>
    </div>
  </div>
</section>

<style>
.faq-question[aria-expanded="true"] .fa-chevron-down {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
}

.faq-item:hover .faq-question {
  background-color: #fafaf9;
}
</style>
`;
};