import { html } from 'hono/html'

export function BadgesSection() {
  return html`
    <section class="badges-section py-8 bg-white border-t border-b border-gray-200">
      <div class="container mx-auto px-6">
        <div class="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
          <!-- 受賞バッジ群 -->
          <div class="badge-item">
            <img 
              src="/img/badge-award.png" 
              alt="受賞バッジ" 
              class="h-12 md:h-16 w-auto opacity-80 hover:opacity-100 transition-opacity"
              width="120"
              height="64"
              loading="lazy"
            >
          </div>
          
          <!-- 男の婚活ロゴ -->
          <div class="badge-item">
            <img 
              src="/img/logo-otoko-konkatsu.png" 
              alt="男の婚活" 
              class="h-12 md:h-16 w-auto opacity-80 hover:opacity-100 transition-opacity"
              width="120"
              height="64"
              loading="lazy"
            >
          </div>
          
          <!-- IBJ正規加盟店 -->
          <div class="badge-item">
            <a href="https://www.ibjapan.com/" target="_blank" rel="noopener noreferrer">
              <img 
                src="/img/logo-ibj.png" 
                alt="IBJ正規加盟店" 
                class="h-12 md:h-16 w-auto opacity-80 hover:opacity-100 transition-opacity"
                width="120"
                height="64"
                loading="lazy"
              >
            </a>
          </div>
          
          <!-- AI matching -->
          <div class="badge-item">
            <img 
              src="/img/logo-ai-matching.png" 
              alt="AI matching" 
              class="h-12 md:h-16 w-auto opacity-80 hover:opacity-100 transition-opacity"
              width="120"
              height="64"
              loading="lazy"
            >
          </div>
        </div>
      </div>
    </section>
  `
}