import { html } from 'hono/html'

export function CampaignSection() {
  return html`
    <section class="campaign-section relative py-20 overflow-hidden">
      <!-- 背景画像 - 和装婚アイテム（明るくぼやかし効果） -->
      <div class="absolute inset-0 z-0">
        <img 
          src="https://page.gensparksite.com/v1/base64_upload/7e08822a4beb2fc8bbcce7d5580f6407" 
          alt="和装結婚式のアイテム 白無垢・扇子・結婚指輪・松・梅の花" 
          class="w-full h-full object-cover object-center brightness-125 saturate-110 blur-sm"
          width="1920"
          height="1080"
          loading="lazy"
        >
      </div>
      
      <!-- 薄い白→透明の縦グラデーション（明るめ調整） -->
      <div class="absolute inset-0 z-10 bg-gradient-to-b from-white/40 via-white/20 to-white/5"></div>
      
      <div class="relative z-20 container mx-auto px-6 text-center">
        <!-- 見出し（英字）- 中央上部、文字間広め -->
        <div class="campaign-title-english mb-8">
          OPEN CAMPAIGN
        </div>
        
        <!-- メインコピー（中央・H2） -->
        <h2 class="campaign-main-copy mb-4">
          先着男女お1人様限定！<br>
          <span class="campaign-highlight">入会金、登録料、サポート費の初期費用が無料</span>
        </h2>
        
        <!-- 注記（コピー直下、小さめ） -->
        <p class="campaign-notice mb-12">
          ※先着10名様限定｜2025年3月31日まで
        </p>
        
        <!-- CTAボタン -->
        <div class="campaign-cta">
          <a href="/service" class="campaign-btn">
            サービス・料金の詳細はこちら
          </a>
        </div>
      </div>
    </section>
  `
}