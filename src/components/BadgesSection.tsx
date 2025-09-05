import { html } from 'hono/html'

export function BadgesSection() {
  return html`
    <section class="badges-section py-8 bg-white border-t border-b border-gray-200">
      <div class="container mx-auto px-6">
        <div class="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
          <!-- 受賞バッジ（IBJ No.1） -->
          <div class="badge-item">
            <img 
              src="https://page.gensparksite.com/v1/base64_upload/23089dad40911affc5edf65c638b12bb" 
              alt="IBJ 2024年お見合い数・会員数・成婚数 No.1受賞バッジ" 
              class="h-12 md:h-16 w-auto opacity-80 hover:opacity-100 transition-opacity"
              width="120"
              height="64"
              loading="lazy"
            >
          </div>
          
          <!-- 森かすみ（IBJ婚活アンバサダー） -->
          <div class="badge-item">
            <img 
              src="https://page.gensparksite.com/v1/base64_upload/899725d1225da34105d925b9ea4db1c1" 
              alt="IBJ婚活アンバサダー 森かすみ" 
              class="h-12 md:h-16 w-auto opacity-80 hover:opacity-100 transition-opacity"
              width="120"
              height="64"
              loading="lazy"
            >
          </div>
          
          <!-- 成婚主義 -->
          <div class="badge-item">
            <a href="https://www.ibjapan.com/" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://page.gensparksite.com/v1/base64_upload/7f98388616ed01bfadbc8bbab090c47d" 
                alt="成婚主義の相談所 IBJ加盟相談所" 
                class="h-12 md:h-16 w-auto opacity-80 hover:opacity-100 transition-opacity"
                width="120"
                height="64"
                loading="lazy"
              >
            </a>
          </div>
          
          <!-- AIマッチング -->
          <div class="badge-item">
            <img 
              src="https://page.gensparksite.com/v1/base64_upload/2098246e9fc9a4a903dff6d0239463db" 
              alt="AIマッチング IBJS4.0対応" 
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