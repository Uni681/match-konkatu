import { html, raw } from 'hono/html';
import { buildTimeContent } from '../utils/build-content';

interface NewsItem {
  slug: string;
  title: string;
  date: string;
  category?: string;
  description?: string;
}

interface NewsSectionProps {
  posts?: NewsItem[];
}

export const NewsSection = ({ posts }: NewsSectionProps) => {
  // ブログデータから記事を取得（引数がない場合はbuild-contentから直接取得）
  const blogPosts = posts || buildTimeContent.posts.map(post => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    category: post.category,
    description: post.description
  }));
  
  // 最新3件を取得（日付でソート）
  const latestPosts = blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  
  return html`
<section class="news-section-elegant py-28">
  <div class="container mx-auto px-6 max-w-6xl">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
      <!-- 縦書き見出し（PC）/ 横書き見出し（SP） -->
      <div class="md:col-span-3 flex md:justify-end md:pr-8">
        <h2 class="news-section-title-elegant">
          最新情報
        </h2>
      </div>
      
      <!-- 記事リスト -->
      <div class="md:col-span-9">
        <div class="space-y-0">
          ${raw(latestPosts.map((post, index) => `
            <article class="news-item-elegant ${index < latestPosts.length - 1 ? 'news-item-border' : ''}">
              <a href="/blog/${post.slug}" class="news-item-title-elegant">
                ${post.title}
              </a>
              <div class="news-item-meta">
                <time class="news-item-date-elegant" datetime="${post.date}">
                  ${new Date(post.date).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                ${post.category ? `
                  <span class="news-item-category-elegant">
                    ${post.category}
                  </span>
                ` : ''}
              </div>
            </article>
          `).join(''))}
        </div>
      </div>
    </div>
    
    <!-- 記事一覧ボタン（中央配置） -->
    <div class="w-full text-center mt-16">
      <a href="/blog" class="news-cta-button">
        記事一覧はこちら
      </a>
    </div>
  </div>
</section>
`;
};

export default NewsSection;
