import { html } from 'hono/html'

export function SNSSection() {
  return html`
    <section class="sns-section py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div class="container mx-auto px-6 max-w-6xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          <!-- LINEカード -->
          <div class="sns-card line-card">
            <div class="sns-card-content">
              <div class="sns-card-text">
                <h3 class="sns-card-title line-title">
                  <i class="fab fa-line mr-3 text-green-600"></i>
                  LINE
                </h3>
                <p class="sns-card-description">
                  友だち追加で、無料カウンセリングのご予約やご質問がスムーズにできます。
                </p>
              </div>
              
              <div class="sns-qr-container">
                <div class="sns-qr-placeholder">
                  <div class="qr-placeholder-content">
                    <i class="fas fa-qrcode text-4xl text-gray-400 mb-2"></i>
                    <span class="text-sm text-gray-500">QR</span>
                  </div>
                </div>
              </div>
              
              <div class="sns-card-button-container">
                <a href="https://line.me/R/ti/p/@match-konkatu" class="sns-btn line-btn">
                  <i class="fab fa-line mr-2"></i>
                  LINEで相談する
                </a>
              </div>
            </div>
          </div>
          
          <!-- Instagramカード -->
          <div class="sns-card instagram-card">
            <div class="sns-card-content">
              <div class="sns-card-text">
                <h3 class="sns-card-title instagram-title">
                  <i class="fab fa-instagram mr-3 text-gray-700"></i>
                  Instagram
                </h3>
                <p class="sns-card-description">
                  最新イベント情報や婚活のヒントを発信中。ぜひフォローしてください。
                </p>
              </div>
              
              <div class="sns-qr-container">
                <div class="sns-qr-placeholder">
                  <div class="qr-placeholder-content">
                    <i class="fas fa-qrcode text-4xl text-gray-400 mb-2"></i>
                    <span class="text-sm text-gray-500">QR</span>
                  </div>
                </div>
              </div>
              
              <div class="sns-card-button-container">
                <a href="https://www.instagram.com/match_konkatu" class="sns-btn instagram-btn">
                  <i class="fab fa-instagram mr-2"></i>
                  フォローする
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  `
}