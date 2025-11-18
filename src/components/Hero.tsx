import { html, raw } from 'hono/html';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
}

export const Hero = ({ title, subtitle, ctaText, ctaLink, backgroundImage }: HeroProps) => {
  return html`
<section class="hero-elegant relative h-screen flex items-start justify-center overflow-hidden">
  <!-- 背景画像（神社和装婚礼写真） - ズームアウトアニメーション -->
  <div class="absolute inset-0 z-0 hero-zoom">
    <img 
      src="https://page.gensparksite.com/v1/base64_upload/6dc9bf755dc318a18394939e8a53a65d" 
      alt="桜満開の神社鳥居前で行われる和装結婚式、白無垢の花嫁と紋付袴の花婿が向かい合う美しい瞬間" 
      class="w-full h-full object-cover object-center"
      loading="eager"
      fetchpriority="high"
    >
  </div>
  
  <!-- 上品なオーバーレイ（薄め・茶寄り黒） -->
  <div class="absolute inset-0 z-1 hero-overlay"></div>
  
  <!-- 控えめな花びら1枚 -->
  <div class="sakura-petal">
    🌸
  </div>
  
  <!-- メインコンテンツ（中央より少し上：40%位置） -->
  <div class="relative z-10 text-center px-6 max-w-4xl mx-auto hero-content-wrapper">
    
    <!-- メインコピー - fade-slide-up適用 -->
    <h1 class="hero-main-copy fade-slide-up">
      ご縁を結ぶ<br class="md:hidden">本気の婚活
    </h1>
    
    <!-- ブランド名（少し小さめ） - fade-slide-up適用 -->
    <div class="hero-brand-name fade-slide-up">
      MATCH
    </div>
    
    <!-- 控えめCTA - 遅延表示 -->
    <a href="/about" class="hero-cta-button hero-cta-delayed">
      はじめての方へ
    </a>
    
  </div>
</section>
`;
};
