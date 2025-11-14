import { html, raw } from 'hono/html';

export const StorySection = () => {
  return html`
<section class="story-section-elegant py-28">
  <div class="container mx-auto px-6 max-w-4xl text-center">
    <!-- 上品な見出し -->
    <div class="mb-16">
      <h2 class="story-section-title">
        親子で支える温かい結婚相談所
      </h2>
      <p class="story-section-copy">
        異なる世代の視点と経験を活かし、<br>
        お一人おひとりに寄り添ったサポートを提供しています。
      </p>
    </div>

    <!-- 控えめCTA -->
    <div class="mt-14">
      <a href="/about" class="story-cta-button">
        当結婚相談所について
      </a>
    </div>
  </div>
</section>
`;
};

export default StorySection;
