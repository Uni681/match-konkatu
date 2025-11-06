import { html } from 'hono/html'

export function AccessMapSection() {
  return html`
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
                  <span>〒221-0834 神奈川県横浜市神奈川区台町8-14 412</span>
                </div>
                
                <div class="access-info-item">
                  <i class="fas fa-walking mr-2 text-primary-600"></i>
                  <span>横浜駅西口から徒歩7分</span>
                </div>
                
                <div class="access-info-item">
                  <i class="fas fa-phone mr-2 text-primary-600"></i>
                  <span>TEL：045-534-8922</span>
                </div>
                
                <div class="access-info-item">
                  <i class="fas fa-clock mr-2 text-primary-600"></i>
                  <span>営業時間：11:00-22:00</span>
                </div>
                
                <div class="access-info-item text-sm text-gray-600">
                  <span>※お問い合わせフォームや公式LINEでのお問い合わせは24時間受け付けております</span>
                </div>
                
                <div class="access-info-item">
                  <i class="fas fa-calendar-times mr-2 text-primary-600"></i>
                  <span>定休日：毎週木曜日</span>
                </div>
                
                <div class="access-info-item text-sm text-gray-600">
                  <span>※但し、ご相談により対応する場合があります。</span>
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