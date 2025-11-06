import { html, raw } from 'hono/html'
import Layout from '../components/Layout'
import { SNSSection } from '../components/SNSSection'
import { ContactSection } from '../components/ContactSection'
import { AccessMapSection } from '../components/AccessMapSection'

export function BlogListPage(posts: any[], currentPage: number = 1, totalPages: number = 1) {
  const perPage = 9
  const offset = (currentPage - 1) * perPage
  const paginatedPosts = posts.slice(offset, offset + perPage)

  return Layout({
    title: 'ブログ | MATCH（マッチ）本気の婚活',
    description: '婚活に役立つノウハウやイベント情報をお届けします。結婚相談所MATCHの最新情報や婚活アドバイスをご紹介。',
    children: html`
      <!-- Blog Hero Section -->
      <section class="blog-hero-section relative py-32 overflow-hidden flex items-center min-h-[60vh]">
        <!-- 和柄背景 -->
        <div class="absolute inset-0 z-0">
          <div class="blog-hero-background"></div>
        </div>
        
        <!-- 金箔散らし装飾 -->
        <div class="absolute inset-0 z-10">
          <div class="gold-foil-decoration"></div>
        </div>
        
        <div class="relative z-20 container mx-auto px-6 text-center max-w-4xl">
          <!-- 英字見出し（背景扱い） -->
          <div class="blog-hero-english mb-4">
            BLOG
          </div>
          
          <!-- メイン見出し -->
          <h1 class="blog-hero-title mb-8">
            ブログ
          </h1>
          
          <!-- 説明文 -->
          <div class="blog-hero-description">
            <p>婚活に役立つノウハウやイベント情報をお届けします。</p>
            <p>結婚相談所MATCHの最新情報や婚活アドバイスをご紹介。</p>
          </div>
        </div>
      </section>

      <!-- Blog List Section -->
      <section class="blog-list-section py-20 bg-white">
        <div class="container mx-auto px-6 max-w-7xl">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            ${paginatedPosts.map(post => `
              <article class="blog-card">
                ${post.featured_image ? `
                  <div class="blog-card-image">
                    <img src="${post.featured_image}" alt="${post.title}" loading="lazy">
                  </div>
                ` : ''}
                
                <div class="blog-card-content">
                  <div class="blog-card-category">
                    <span class="category-badge">${post.category}</span>
                  </div>
                  
                  <h2 class="blog-card-title">
                    <a href="/blog/${post.slug}">${post.title}</a>
                  </h2>
                  
                  <p class="blog-card-description">${post.description}</p>
                  
                  <div class="blog-card-footer">
                    <time datetime="${post.date}" class="blog-card-date">
                      <i class="fas fa-calendar mr-2"></i>
                      ${new Date(post.date).toLocaleDateString('ja-JP')}
                    </time>
                    <a href="/blog/${post.slug}" class="blog-card-link">
                      続きを読む →
                    </a>
                  </div>
                </div>
              </article>
            `).join('')}
          </div>
          
          <!-- Pagination -->
          ${totalPages > 1 ? `
            <nav class="blog-pagination" aria-label="ページネーション">
              <div class="pagination-buttons">
                ${currentPage > 1 ? `
                  <a href="/blog?page=${currentPage - 1}" class="pagination-button">
                    <i class="fas fa-chevron-left mr-2"></i>
                    前へ
                  </a>
                ` : ''}
                
                ${Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i
                  if (pageNum > totalPages) return ''
                  return `
                    <a href="/blog?page=${pageNum}" 
                       class="pagination-button ${pageNum === currentPage ? 'active' : ''}">
                      ${pageNum}
                    </a>
                  `
                }).join('')}
                
                ${currentPage < totalPages ? `
                  <a href="/blog?page=${currentPage + 1}" class="pagination-button">
                    次へ
                    <i class="fas fa-chevron-right ml-2"></i>
                  </a>
                ` : ''}
              </div>
            </nav>
          ` : ''}
        </div>
      </section>

      <!-- SNSセクション -->
      ${SNSSection()}

      <!-- お問い合わせセクション -->
      ${ContactSection()}

      <!-- アクセスマップセクション -->
      ${AccessMapSection()}
    `
  })
}
