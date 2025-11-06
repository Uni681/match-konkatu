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
<section class="relative h-screen flex items-center justify-center overflow-hidden">
  <!-- 提供された本物の和装婚礼写真 -->
  <div class="absolute inset-0 z-0">
    <img 
      src="https://page.gensparksite.com/v1/base64_upload/6dc9bf755dc318a18394939e8a53a65d" 
      alt="桜満開の神社鳥居前で行われる和装結婚式、白無垢の花嫁と紋付袴の花婿が向かい合う美しい瞬間" 
      class="w-full h-full object-cover object-center brightness-110 saturate-110 contrast-105"
      loading="eager"
      fetchpriority="high"
    >
  </div>
  
  <!-- シンプルテキストコンテンツ（白枠なし） -->
  <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
    <!-- メインキャッチコピー -->
    <h1 class="hero-text-elegant hero-main-title text-center mb-6">
      MATCHで叶える<br>
      本気の出会い
    </h1>
    
    <!-- スタイリッシュブランドロゴ -->
    <div class="hero-stylish-brand text-center">
      MATCH
    </div>
  </div>
  
  <!-- シンプルスクロール指示 -->
  <div class="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
    <div class="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center bg-white bg-opacity-30">
      <div class="w-1 h-3 bg-gray-600 rounded-full mt-2 animate-bounce"></div>
    </div>
  </div>
</section>
`;
};