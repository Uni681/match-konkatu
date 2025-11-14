import { html } from 'hono/html'

export function CampaignSection() {
  return html`
    <section class="campaign-section relative overflow-hidden">
      <!-- 背景画像 - ぼかし・明度UP・彩度DOWN（CSS側でフィルター強化） -->
      <div class="absolute inset-0 z-0">
        <img 
          src="https://page.gensparksite.com/v1/base64_upload/7e08822a4beb2fc8bbcce7d5580f6407" 
          alt="和装結婚式のアイテム 白無垢・扇子・結婚指輪・松・梅の花" 
          class="campaign-background w-full h-full object-cover object-center"
          style="filter: blur(2px) brightness(1.2) saturate(0.7);"
          width="1920"
          height="1080"
          loading="lazy"
        >
      </div>
      
      <!-- より明るい白グラデーション - 和の高級感 -->
      <div class="absolute inset-0 z-10 bg-gradient-to-b from-white/50 via-white/25 to-white/10"></div>
      
      <div class="relative z-20 container mx-auto px-6 text-center">
        <!-- 見出し（英字）- 薄金・大きく・上質に -->
        <div class="campaign-title-english mb-8">
          OPEN CAMPAIGN
        </div>
        
        <!-- メインコピー（中央・H2）- 2行の差を明確に -->
        <h2 class="campaign-main-copy mb-4">
          <span class="campaign-copy-line1">先着男女お1人様限定！</span>
          <span class="campaign-copy-line2">
            <span class="campaign-highlight">入会金、登録料、サポート費</span>の<span class="campaign-highlight">初期費用が無料</span>
          </span>
        </h2>
        
        <!-- 注記（控えめに・墨色） -->
        <p class="campaign-notice mb-12">
          ※先着10名様限定｜2025年3月31日まで
        </p>
        
        <!-- CTAボタン - 控えめ・枠線スタイル -->
        <div class="campaign-cta">
          <a href="/service" class="campaign-btn">
            サービス・料金の詳細はこちら
          </a>
        </div>
      </div>
    </section>
  `
}