import { html } from 'hono/html'

export function ContactAccessSection() {
  return html`
    <!-- CONTACTセクション - オープンキャンペーンと同じフルブリード構造 -->
    <section class="contact-section-fullbleed relative py-20 overflow-hidden">
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
      
      <div class="relative z-20 container mx-auto px-6 max-w-7xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
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
    </section>
    
    <!-- ACCESSセクション -->
    <section class="contact-access-section py-20">
      <div class="container mx-auto px-6 max-w-7xl">
        <!-- ACCESSブロック -->
        <div class="access-block">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            <!-- 住所テキスト -->
            <div class="access-text-content">
              <h3 class="access-title mb-6">
                ACCESS
              </h3>
              
              <div class="access-info">
                <div class="access-info-item">
                  <h4 class="access-company-name">MATCH 本気の婚活 結婚相談所</h4>
                </div>
                
                <div class="access-info-item">
                  <i class="fas fa-map-marker-alt mr-2 text-primary-600"></i>
                  <span>〒221-0834 神奈川県横浜市神奈川区台町5-14 412</span>
                </div>
                
                <div class="access-info-item">
                  <i class="fas fa-walking mr-2 text-primary-600"></i>
                  <span>横浜駅西口から徒歩7分</span>
                </div>
                
                <div class="access-info-item">
                  <i class="fas fa-phone mr-2 text-primary-600"></i>
                  <span>TEL：045-534-8922</span>
                </div>
              </div>
            </div>
            
            <!-- Google Map -->
            <div class="access-map-container">
              <div class="map-placeholder">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3248.8015921293386!2d139.619!3d35.4697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDI4JzExLjAiTiAxMznCsDM3JzA4LjQiRQ!5e0!3m2!1sja!2sjp!4v1"
                  width="100%"
                  height="360"
                  style="border:0; border-radius: 12px;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  title="MATCH 本気の婚活 結婚相談所の地図"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  `
}