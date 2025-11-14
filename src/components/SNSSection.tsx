import { html } from 'hono/html'

export function SNSSection() {
  return html`
    <section class="sns-section">
      <div class="container mx-auto px-6 max-w-6xl">
        <div class="text-center mb-12">
          <h2 class="sns-section-title text-3xl md:text-4xl mb-4">
            SNS
          </h2>
          <p class="sns-section-subtitle text-gray-600" style="color: #6b6158;">
            最新情報やご相談はSNSでも受け付けております
          </p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          
          <!-- LINEカード -->
          <div class="sns-card-v2 line-card-v2">
            <div class="sns-icon-wrapper line-icon">
              <i class="fab fa-line text-5xl"></i>
            </div>
            <h3 class="sns-card-v2-title">LINE</h3>
            <p class="sns-card-v2-description">
              友だち追加で、無料カウンセリングのご予約やご質問がスムーズにできます。
            </p>
            <a href="https://lin.ee/hxJlbwI" target="_blank" rel="noopener noreferrer" class="sns-btn-v2 line-btn-v2">
              <i class="fab fa-line mr-2"></i>
              LINEで相談する
            </a>
          </div>
          
          <!-- Instagramカード -->
          <div class="sns-card-v2 instagram-card-v2">
            <div class="sns-icon-wrapper instagram-icon">
              <i class="fab fa-instagram text-5xl"></i>
            </div>
            <h3 class="sns-card-v2-title">Instagram</h3>
            <p class="sns-card-v2-description">
              最新イベント情報や婚活のヒントを発信中。ぜひフォローしてください。
            </p>
            <a href="https://www.instagram.com/match_konkatu" target="_blank" rel="noopener noreferrer" class="sns-btn-v2 instagram-btn-v2">
              <i class="fab fa-instagram mr-2"></i>
              フォローする
            </a>
          </div>
          
        </div>
      </div>
    </section>
  `
}