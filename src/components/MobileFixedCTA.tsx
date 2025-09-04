import { html } from 'hono/html';

export const MobileFixedCTA = () => {
  return html`
<!-- Mobile Fixed CTA (表示はCSSで制御) -->
<div class="fixed-mobile-cta md:hidden">
  <div class="cta-buttons">
    <a href="/contact" class="cta-btn cta-primary-mini">
      <i class="fas fa-calendar-check mr-2"></i>
      無料相談
    </a>
    <a href="https://line.me/R/ti/p/@match-konkatu" class="cta-btn cta-secondary-mini">
      <i class="fab fa-line mr-2 text-green-500"></i>
      LINE相談
    </a>
  </div>
</div>

<!-- スマホ固定CTA用のbody padding-bottom調整 -->
<style>
  @media (max-width: 767px) {
    body {
      padding-bottom: 80px;
    }
  }
</style>
`;
};

export default MobileFixedCTA;