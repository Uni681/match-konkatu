import { html, raw } from 'hono/html';

export const StorySection = () => {
  return html`
<section class="section-bg-japanese py-20">
  <div class="container mx-auto px-6 max-w-4xl text-center">
    <!-- シンプルヘッダー -->
    <div class="mb-12">
      <h2 class="text-4xl md:text-5xl font-light text-gray-800 mb-6 font-mincho">
        親子で支える、温かい結婚相談所
      </h2>
      <p class="text-xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
        異なる世代の視点と経験を活かし、お一人おひとりに寄り添ったサポートを提供しています。
      </p>
    </div>

    <!-- シンプルボタン -->
    <div class="mt-12">
      <a href="/about" class="inline-flex items-center px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl group">
        当結婚相談所について
        <i class="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform"></i>
      </a>
    </div>
  </div>
</section>
`;
};

export default StorySection;