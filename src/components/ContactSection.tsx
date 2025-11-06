import { html } from 'hono/html'

export function ContactSection() {
  return html`
    <section class="contact-access-section py-0">
      <div class="container mx-auto px-0 max-w-full">
        
        <!-- CONTACTブロック - フルブリード（余白なし） -->
        <div class="contact-block relative overflow-hidden">
          <!-- 背景画像 - 和装婚（軽いぼかし） -->
          <div class="absolute inset-0 z-0">
            <img 
              src="https://page.gensparksite.com/v1/base64_upload/971eb324e80dbcd26a94751513768cbb" 
              alt="和装結婚式の写真" 
              class="w-full h-full object-cover object-center blur-sm brightness-80 saturate-95"
              width="1920"
              height="600"
              loading="lazy"
            >
          </div>
          
          <!-- 軽い暗めのオーバーレイ -->
          <div class="absolute inset-0 z-10 bg-gradient-to-r from-black/30 via-black/20 to-black/10"></div>
          
          <div class="relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-8 py-16 px-6 lg:py-24 lg:px-16">
            
            <!-- 左側テキスト -->
            <div class="contact-text-content">
              <h2 class="contact-section-title mb-6 text-white">
                CONTACT US
              </h2>
              <p class="contact-section-description text-white">
                相談は無料です。皆様からのお問い合わせをお待ちしております。
              </p>
            </div>
            
            <!-- 右側：大きなCTAボタンを縦並び -->
            <div class="contact-buttons-container">
              <a href="tel:045-534-8922" class="contact-cta-btn phone-btn bg-transparent text-white border-white hover:bg-white hover:text-gray-900">
                <i class="fas fa-phone mr-3"></i>
                045-534-8922
              </a>
              
              <a href="/contact" class="contact-cta-btn form-btn bg-transparent text-white border-white hover:bg-white hover:text-gray-900">
                <i class="fas fa-envelope mr-3"></i>
                お問い合わせフォーム
              </a>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  `
}