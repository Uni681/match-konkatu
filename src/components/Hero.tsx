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
  <!-- 背景画像（神社和装婚礼写真） -->
  <div class="absolute inset-0 z-0">
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
  
  <!-- メインコンテンツ（中央より少し上：40%位置） -->
  <div class="relative z-10 text-center px-6 max-w-4xl mx-auto hero-content-wrapper">
    
    <!-- メインコピー -->
    <h1 class="hero-main-copy">
      ご縁を結ぶ、本気の婚活。
    </h1>
    
    <!-- ブランド名（少し小さめ） -->
    <div class="hero-brand-name">
      MATCH
    </div>
    
    <!-- 控えめCTA -->
    <a href="/about" class="hero-cta-button">
      はじめての方へ
    </a>
    
  </div>
  
  <!-- シンプルスクロール指示 -->
  <div class="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
    <div class="w-6 h-10 border-2 border-white border-opacity-40 rounded-full flex justify-center">
      <div class="w-1 h-3 bg-white bg-opacity-60 rounded-full mt-2 animate-bounce"></div>
    </div>
  </div>
</section>
`;
};
