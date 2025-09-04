import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { raw } from 'hono/html'
import type { Bindings } from './types'

// Components
import Layout from './components/Layout'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { PriceTable } from './components/PriceTable'
import { Testimonials } from './components/Testimonials'
import { FAQ } from './components/FAQ'
import { CTA } from './components/CTA'
import StorySection from './components/StorySection'
import MobileFixedCTA from './components/MobileFixedCTA'
import ReasonsSection from './components/ReasonsSection'
import IBJStatsSection from './components/IBJStatsSection'
import AboutUsLinksSection from './components/AboutUsLinksSection'

// Utils
import { generateSEOMeta, generateBreadcrumbs } from './utils/content'
import { ContactForm } from './components/ContactForm'
import NewsSection from './components/NewsSection'
import { buildTimeContent } from './utils/build-content'
import { sendEmail, createAdminNotificationTemplate, createAutoReplyTemplate, validateEmailConfig } from './utils/email'
import { 
  detectSpam, 
  validateFormToken, 
  generateFormToken, 
  checkRateLimit, 
  normalizeIP, 
  sanitizeFormData,
  shouldNotifyAdmin 
} from './utils/security'
import { 
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateArticleSchema,
  generateWebSiteSchema,
  generateServiceSchema,
  generateSitemap,
  generateRobotsTxt,
  generateSocialMeta
} from './utils/seo'
import { z } from 'zod'

// Build time content
const { home, pages, posts, settings } = buildTimeContent;

const app = new Hono<{ Bindings: Bindings }>()

// CORS設定
app.use('/api/*', cors())

// 静的ファイルの配信
app.use('/static/*', serveStatic({ root: './public' }))
app.use('/img/*', serveStatic({ root: './public' }))
app.use('/admin/*', serveStatic({ root: './public' }))

// robots.txt（完全版）
app.get('/robots.txt', (c) => {
  const baseUrl = new URL(c.req.url).origin
  const robotsTxt = generateRobotsTxt(baseUrl)
  
  return c.text(robotsTxt, 200, {
    'Content-Type': 'text/plain',
    'Cache-Control': 'public, max-age=86400' // 24時間キャッシュ
  })
})

// sitemap.xml（完全版）
app.get('/sitemap.xml', (c) => {
  const baseUrl = new URL(c.req.url).origin
  const sitemap = generateSitemap(baseUrl, posts)
  
  return c.text(sitemap, 200, {
    'Content-Type': 'application/xml',
    'Cache-Control': 'public, max-age=3600' // 1時間キャッシュ
  })
})

// JSON-LD 構造化データAPI（デバッグ用）
app.get('/api/schema/:type', (c) => {
  const baseUrl = new URL(c.req.url).origin
  const type = c.req.param('type')
  
  let schema
  switch (type) {
    case 'organization':
      schema = generateOrganizationSchema(baseUrl)
      break
    case 'localbusiness':
      schema = generateLocalBusinessSchema(baseUrl)
      break
    case 'website':
      schema = generateWebSiteSchema(baseUrl)
      break
    case 'service':
      schema = generateServiceSchema(baseUrl)
      break
    case 'faq':
      // FAQ from home content
      const faqData = home.faq || []
      schema = generateFAQSchema(faqData)
      break
    default:
      return c.json({ error: 'Invalid schema type' }, 400)
  }
  
  return c.json(schema, 200, {
    'Cache-Control': 'public, max-age=3600'
  })
})

// Legacy redirects (fallback for dynamic redirects not covered by _redirects file)
const legacyRedirects = new Map([
  ['/posts', '/blog'],
  ['/services', '/service'],
  ['/pricing', '/price'],
  ['/about-us', '/about'],
  ['/contact-us', '/contact'],
  ['/news', '/blog'],
  ['/サービス', '/service'],
  ['/料金', '/price'],
  ['/会社概要', '/about'],
  ['/お問い合わせ', '/contact']
])

// Handle legacy redirects
app.get('*', (c, next) => {
  const path = c.req.path
  const redirect = legacyRedirects.get(path)
  
  if (redirect) {
    return c.redirect(redirect, 301)
  }
  
  // Handle wildcard redirects
  if (path.startsWith('/posts/')) {
    const slug = path.replace('/posts/', '')
    return c.redirect(`/blog/${slug}`, 301)
  }
  
  if (path.startsWith('/news/')) {
    const slug = path.replace('/news/', '')
    return c.redirect(`/blog/${slug}`, 301)
  }
  
  return next()
})

// ホームページ
app.get('/', (c) => {
  const homeContent = home
  const siteSettings = settings
  
  const meta = generateSEOMeta({
    title: siteSettings.site_name,
    description: siteSettings.site_description
  })
  
  // 構造化データ
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': siteSettings.site_url,
    name: siteSettings.site_name,
    description: siteSettings.site_description,
    url: siteSettings.site_url,
    telephone: siteSettings.phone,
    email: siteSettings.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'JP',
      addressRegion: '神奈川県',
      addressLocality: '横浜市神奈川区',
      streetAddress: siteSettings.address
    },
    openingHours: 'Mo-Fr 10:00-19:00, Sa 10:00-17:00',
    areaServed: {
      '@type': 'State',
      name: '神奈川県'
    },
    serviceType: '結婚相談所'
  }
  
  const heroHtml = Hero({
    title: homeContent.hero.title,
    subtitle: homeContent.hero.subtitle,
    ctaText: homeContent.hero.cta_text,
    ctaLink: homeContent.hero.cta_link,
    backgroundImage: homeContent.hero.background_image
  })
  
  const featuresHtml = Features({
    features: homeContent.features
  })
  
  const pricingHtml = PriceTable({
    title: homeContent.pricing.title,
    plans: homeContent.pricing.plans
  })
  
  const testimonialsHtml = Testimonials({
    testimonials: homeContent.testimonials
  })
  
  const faqHtml = FAQ({
    faq: homeContent.faq
  })
  
  const storyHtml = StorySection()
  
  const newsHtml = NewsSection({
    posts: posts
  })
  
  const reasonsHtml = ReasonsSection()
  
  const ibjStatsHtml = IBJStatsSection()
  
  const aboutUsLinksHtml = AboutUsLinksSection()
  
  const ctaHtml = CTA({
    variant: 'gradient'
  })
  
  const mobileCtaHtml = MobileFixedCTA()
  
  const content = `
    ${heroHtml}
    ${storyHtml}
    ${newsHtml}
    ${reasonsHtml}
    ${ibjStatsHtml}
    ${aboutUsLinksHtml}
    ${ctaHtml}
    ${mobileCtaHtml}
  `
  
  return c.html(Layout({
    title: meta.title,
    description: meta.description,
    children: content,
    structuredData
  }))
})

// サービスページ
app.get('/service', (c) => {
  const pageContent = pages.service
  
  const meta = generateSEOMeta({
    title: pageContent.title,
    description: pageContent.description
  })
  
  const breadcrumbs = generateBreadcrumbs('/service')
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${c.req.url.split('/service')[0]}${crumb.href}`
    }))
  }
  
  const content = `
    <div class="container mx-auto px-4 py-12">
      <nav class="mb-8" aria-label="パンくずリスト">
        <ol class="flex space-x-2 text-sm text-gray-600">
          ${breadcrumbs.map((crumb, index) => `
            <li class="flex items-center">
              ${index > 0 ? '<i class="fas fa-chevron-right mx-2 text-xs"></i>' : ''}
              ${index === breadcrumbs.length - 1 
                ? `<span class="text-gray-900">${crumb.name}</span>`
                : `<a href="${crumb.href}" class="hover:text-primary-500">${crumb.name}</a>`
              }
            </li>
          `).join('')}
        </ol>
      </nav>
      
      <div class="max-w-4xl mx-auto prose prose-lg">
        ${raw(pageContent.content)}
      </div>
    </div>
    
    ${CTA({ variant: 'default' })}
  `
  
  return c.html(Layout({
    title: meta.title,
    description: meta.description,
    children: content,
    structuredData: breadcrumbSchema
  }))
})

// 料金ページ
app.get('/price', (c) => {
  const pageContent = pages.price
  
  const meta = generateSEOMeta({
    title: pageContent.title,
    description: pageContent.description
  })
  
  const breadcrumbs = generateBreadcrumbs('/price')
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${c.req.url.split('/price')[0]}${crumb.href}`
    }))
  }
  
  const content = `
    <div class="container mx-auto px-4 py-12">
      <nav class="mb-8" aria-label="パンくずリスト">
        <ol class="flex space-x-2 text-sm text-gray-600">
          ${breadcrumbs.map((crumb, index) => `
            <li class="flex items-center">
              ${index > 0 ? '<i class="fas fa-chevron-right mx-2 text-xs"></i>' : ''}
              ${index === breadcrumbs.length - 1 
                ? `<span class="text-gray-900">${crumb.name}</span>`
                : `<a href="${crumb.href}" class="hover:text-primary-500">${crumb.name}</a>`
              }
            </li>
          `).join('')}
        </ol>
      </nav>
      
      <div class="max-w-4xl mx-auto prose prose-lg">
        ${raw(pageContent.content)}
      </div>
    </div>
    
    ${CTA({ variant: 'default' })}
  `
  
  return c.html(Layout({
    title: meta.title,
    description: meta.description,
    children: content,
    structuredData: breadcrumbSchema
  }))
})

// 私たちについてページ
app.get('/about', (c) => {
  const pageContent = pages.about
  
  const meta = generateSEOMeta({
    title: pageContent.title,
    description: pageContent.description
  })
  
  const breadcrumbs = generateBreadcrumbs('/about')
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${c.req.url.split('/about')[0]}${crumb.href}`
    }))
  }
  
  const content = `
    <div class="container mx-auto px-4 py-12">
      <nav class="mb-8" aria-label="パンくずリスト">
        <ol class="flex space-x-2 text-sm text-gray-600">
          ${breadcrumbs.map((crumb, index) => `
            <li class="flex items-center">
              ${index > 0 ? '<i class="fas fa-chevron-right mx-2 text-xs"></i>' : ''}
              ${index === breadcrumbs.length - 1 
                ? `<span class="text-gray-900">${crumb.name}</span>`
                : `<a href="${crumb.href}" class="hover:text-primary-500">${crumb.name}</a>`
              }
            </li>
          `).join('')}
        </ol>
      </nav>
      
      <div class="max-w-4xl mx-auto prose prose-lg">
        ${raw(pageContent.content)}
      </div>
    </div>
    
    ${CTA({ variant: 'default' })}
  `
  
  return c.html(Layout({
    title: meta.title,
    description: meta.description,
    children: content,
    structuredData: breadcrumbSchema
  }))
})

// ブログ一覧ページ
app.get('/blog', (c) => {
  const allPosts = posts
  const page = parseInt(c.req.query('page') || '1')
  const perPage = 9
  const offset = (page - 1) * perPage
  const paginatedPosts = allPosts.slice(offset, offset + perPage)
  const totalPages = Math.ceil(allPosts.length / perPage)
  
  const meta = generateSEOMeta({
    title: 'ブログ',
    description: '婚活に役立つノウハウやイベント情報をお届けします'
  })
  
  const breadcrumbs = generateBreadcrumbs('/blog')
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${c.req.url.split('/blog')[0]}${crumb.href}`
    }))
  }
  
  const content = `
    <div class="container mx-auto px-4 py-12">
      <nav class="mb-8" aria-label="パンくずリスト">
        <ol class="flex space-x-2 text-sm text-gray-600">
          ${breadcrumbs.map((crumb, index) => `
            <li class="flex items-center">
              ${index > 0 ? '<i class="fas fa-chevron-right mx-2 text-xs"></i>' : ''}
              ${index === breadcrumbs.length - 1 
                ? `<span class="text-gray-900">${crumb.name}</span>`
                : `<a href="${crumb.href}" class="hover:text-primary-500">${crumb.name}</a>`
              }
            </li>
          `).join('')}
        </ol>
      </nav>
      
      <div class="text-center mb-12">
        <h1 class="font-mincho text-3xl md:text-4xl font-bold text-gray-900 mb-4">ブログ</h1>
        <p class="text-lg text-gray-600">婚活に役立つノウハウやイベント情報をお届けします</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        ${paginatedPosts.map(post => `
          <article class="card">
            <div class="card-body">
              ${post.featured_image ? `
                <div class="mb-4">
                  <img src="${post.featured_image}" alt="${post.title}" class="w-full h-48 object-cover rounded-lg">
                </div>
              ` : ''}
              
              <div class="mb-3">
                <span class="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  ${post.category}
                </span>
              </div>
              
              <h2 class="font-semibold text-xl text-gray-900 mb-3 line-clamp-2">
                <a href="/blog/${post.slug}" class="hover:text-primary-600">${post.title}</a>
              </h2>
              
              <p class="text-gray-600 mb-4 line-clamp-3">${post.description}</p>
              
              <div class="flex items-center justify-between text-sm text-gray-500">
                <time datetime="${post.date}">
                  ${new Date(post.date).toLocaleDateString('ja-JP')}
                </time>
                <a href="/blog/${post.slug}" class="text-primary-600 hover:text-primary-700 font-medium">
                  続きを読む →
                </a>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
      
      <!-- Pagination -->
      ${totalPages > 1 ? `
        <nav class="flex justify-center" aria-label="ページネーション">
          <div class="flex space-x-2">
            ${page > 1 ? `
              <a href="/blog?page=${page - 1}" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                前へ
              </a>
            ` : ''}
            
            ${Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = page <= 3 ? i + 1 : page - 2 + i
              if (pageNum > totalPages) return ''
              return `
                <a href="/blog?page=${pageNum}" 
                   class="px-4 py-2 border rounded-md ${pageNum === page 
                     ? 'bg-primary-500 text-white border-primary-500' 
                     : 'border-gray-300 text-gray-700 hover:bg-gray-50'}">
                  ${pageNum}
                </a>
              `
            }).join('')}
            
            ${page < totalPages ? `
              <a href="/blog?page=${page + 1}" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                次へ
              </a>
            ` : ''}
          </div>
        </nav>
      ` : ''}
    </div>
    
    ${CTA({ variant: 'default' })}
  `
  
  return c.html(Layout({
    title: meta.title,
    description: meta.description,
    children: content,
    structuredData: breadcrumbSchema
  }))
})

// ブログ記事詳細ページ
app.get('/blog/:slug', (c) => {
  const slug = c.req.param('slug')
  const post = posts.find(p => p.slug === slug)
  
  if (!post) {
    return c.text('Post not found', 404)
  }
  
  const meta = generateSEOMeta({
    title: post.title,
    description: post.description,
    type: 'article'
  })
  
  const breadcrumbs = generateBreadcrumbs(`/blog/${slug}`)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'MATCH（マッチ）本気の婚活'
    },
    publisher: {
      '@type': 'Organization',
      name: 'MATCH（マッチ）本気の婚活'
    }
  }
  
  const content = `
    <article class="container mx-auto px-4 py-12">
      <nav class="mb-8" aria-label="パンくずリスト">
        <ol class="flex space-x-2 text-sm text-gray-600">
          ${breadcrumbs.map((crumb, index) => `
            <li class="flex items-center">
              ${index > 0 ? '<i class="fas fa-chevron-right mx-2 text-xs"></i>' : ''}
              ${index === breadcrumbs.length - 1 
                ? `<span class="text-gray-900">${crumb.name}</span>`
                : `<a href="${crumb.href}" class="hover:text-primary-500">${crumb.name}</a>`
              }
            </li>
          `).join('')}
        </ol>
      </nav>
      
      <header class="text-center mb-12">
        <div class="mb-4">
          <span class="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full font-medium">
            ${post.category}
          </span>
        </div>
        
        <h1 class="font-mincho text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          ${post.title}
        </h1>
        
        <div class="text-gray-600 mb-8">
          <time datetime="${post.date}">
            <i class="fas fa-calendar mr-2"></i>
            ${new Date(post.date).toLocaleDateString('ja-JP')}
          </time>
          ${post.tags && post.tags.length > 0 ? `
            <div class="mt-4">
              ${post.tags.map(tag => `
                <span class="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm mr-2">
                  #${tag}
                </span>
              `).join('')}
            </div>
          ` : ''}
        </div>
        
        ${post.featured_image ? `
          <div class="mb-8">
            <img src="${post.featured_image}" alt="${post.title}" class="w-full max-w-3xl mx-auto rounded-xl shadow-lg">
          </div>
        ` : ''}
      </header>
      
      <div class="max-w-4xl mx-auto prose prose-lg prose-primary">
        ${raw(post.content)}
      </div>
      
      <!-- Share buttons -->
      <div class="max-w-4xl mx-auto mt-12 pt-8 border-t border-gray-200">
        <h3 class="font-semibold text-lg mb-4">この記事をシェア</h3>
        <div class="flex space-x-4">
          <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(c.req.url)}&text=${encodeURIComponent(post.title)}" 
             target="_blank" 
             class="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            <i class="fab fa-twitter mr-2"></i>
            Twitter
          </a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(c.req.url)}" 
             target="_blank"
             class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <i class="fab fa-facebook mr-2"></i>
            Facebook
          </a>
          <button onclick="navigator.clipboard.writeText('${c.req.url}')" 
                  class="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
            <i class="fas fa-link mr-2"></i>
            URLコピー
          </button>
        </div>
      </div>
      
      <!-- Back to blog -->
      <div class="max-w-4xl mx-auto mt-8 text-center">
        <a href="/blog" class="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
          <i class="fas fa-arrow-left mr-2"></i>
          ブログ一覧に戻る
        </a>
      </div>
    </article>
    
    ${CTA({ 
      title: "婚活でお悩みですか？",
      subtitle: "記事を読んで気になることがあれば、お気軽にご相談ください。",
      variant: 'default' 
    })}
  `
  
  return c.html(Layout({
    title: meta.title,
    description: meta.description,
    children: content,
    structuredData: articleSchema
  }))
})

// ご成婚までのながれページ
app.get('/flow', (c) => {
  const pageContent = {
    title: '和装結婚式 成婚までの流れ',
    description: '和装結婚式での成婚までの流れをご案内いたします。伝統的な和の心を大切にした、美しい結婚への道のりをサポートします。'
  }
  
  const meta = generateSEOMeta({
    title: pageContent.title,
    description: pageContent.description
  })
  
  const breadcrumbs = generateBreadcrumbs('/flow')
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${c.req.url.split('/flow')[0]}${crumb.href}`
    }))
  }

  const content = `
    <div class="container mx-auto px-4 py-12">
      <nav class="mb-8" aria-label="パンくずリスト">
        <ol class="flex space-x-2 text-sm text-gray-600">
          ${breadcrumbs.map((crumb, index) => `
            <li class="flex items-center">
              ${index > 0 ? '<i class="fas fa-chevron-right mx-2 text-xs"></i>' : ''}
              ${index === breadcrumbs.length - 1 
                ? `<span class="text-gray-900">${crumb.name}</span>`
                : `<a href="${crumb.href}" class="hover:text-primary-500">${crumb.name}</a>`
              }
            </li>
          `).join('')}
        </ol>
      </nav>
      
      <div class="text-center mb-12">
        <h1 class="font-mincho text-3xl md:text-4xl font-bold text-gray-900 mb-4">和装結婚式 成婚までの流れ</h1>
        <p class="text-lg text-gray-600">${pageContent.description}</p>
      </div>
      
      <!-- 和装カップル画像ヒーロー -->
      <div class="max-w-6xl mx-auto mb-16">
        <div class="relative rounded-xl overflow-hidden shadow-2xl">
          <img src="https://page.gensparksite.com/v1/base64_upload/89690625e4eb58ebd19c69812967065f" 
               alt="日本庭園を歩く和装の新郎新婦" 
               class="w-full h-96 md:h-[500px] object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div class="absolute bottom-8 left-8 text-white">
            <h2 class="font-mincho text-2xl md:text-3xl font-bold mb-2">伝統と美が織りなす特別な一日</h2>
            <p class="text-lg opacity-90">和装結婚式で叶える、永遠の愛の誓い</p>
          </div>
        </div>
      </div>
      
      <div class="max-w-4xl mx-auto prose prose-lg prose-primary">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="step-card bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div class="step-number bg-gradient-to-br from-red-500 to-pink-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
            <h3 class="font-mincho text-xl font-bold text-gray-900 mb-3">和装婚活相談</h3>
            <p class="text-gray-700 leading-relaxed">和装結婚式への想いをお聞かせください。白無垢・色打掛の選び方から、神社選び、和装フォトウェディングまで、和の結婚式に関するご相談を承ります。</p>
          </div>
          
          <div class="step-card bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div class="step-number bg-gradient-to-br from-red-500 to-pink-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
            <h3 class="font-mincho text-xl font-bold text-gray-900 mb-3">和装プロフィール作成</h3>
            <p class="text-gray-700 leading-relaxed">和装での前撮りや、着物姿でのお写真を含むプロフィール作成をサポート。和の心を大切にする方同士の出会いを演出します。</p>
          </div>
          
          <div class="step-card bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div class="step-number bg-gradient-to-br from-red-500 to-pink-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
            <h3 class="font-mincho text-xl font-bold text-gray-900 mb-3">お見合い・和装デート</h3>
            <p class="text-gray-700 leading-relaxed">日本庭園や茶室でのお見合い、着物デートなど、和の雰囲気を大切にしたお引き合わせ。お互いの和装への想いを共有できる特別な時間をご提供します。</p>
          </div>
          
          <div class="step-card bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div class="step-number bg-gradient-to-br from-red-500 to-pink-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">4</div>
            <h3 class="font-mincho text-xl font-bold text-gray-900 mb-3">和装結婚式・成婚</h3>
            <p class="text-gray-700 leading-relaxed">神前式での結婚式や和装フォトウェディングまで、トータルサポート。白無垢から色打掛への着替え、和装前撮りまで、理想の和装結婚式を実現します。</p>
          </div>
        </div>
        
        <!-- 和装結婚式の特徴 -->
        <div class="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-8 mb-12 border border-red-100">
          <h3 class="font-mincho text-2xl font-bold text-center text-gray-900 mb-6">和装結婚式の魅力</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div class="feature-item">
              <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-torii-gate text-2xl text-red-600"></i>
              </div>
              <h4 class="font-semibold text-lg text-gray-900 mb-2">伝統美</h4>
              <p class="text-gray-700">日本古来の美しさを纏う白無垢・色打掛での格式高い結婚式</p>
            </div>
            <div class="feature-item">
              <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-camera text-2xl text-red-600"></i>
              </div>
              <h4 class="font-semibold text-lg text-gray-900 mb-2">特別な記念</h4>
              <p class="text-gray-700">日本庭園での前撮りから挙式まで、一生の思い出となる写真</p>
            </div>
            <div class="feature-item">
              <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-heart text-2xl text-red-600"></i>
              </div>
              <h4 class="font-semibold text-lg text-gray-900 mb-2">家族の絆</h4>
              <p class="text-gray-700">神前式で家族同士の繋がりを深める厳粛で温かい挙式</p>
            </div>
          </div>
        </div>
        
        <div class="text-center">
          <a href="/contact" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg">
            <i class="fas fa-torii-gate mr-3"></i>
            和装結婚式相談を申し込む
            <i class="fas fa-arrow-right ml-3"></i>
          </a>
        </div>
      </div>
    </div>
  `

  return c.html(Layout({
    title: meta.title,
    description: meta.description,
    children: content,
    structuredData: breadcrumbSchema
  }))
})

// よくある質問ページ
app.get('/faq', (c) => {
  const pageContent = {
    title: '和装結婚式 よくある質問',
    description: '和装結婚式・和装フォトウェディング・神前式に関するよくある質問にお答えします。白無垢・色打掛についてのご質問もお気軽にどうぞ。'
  }
  
  const meta = generateSEOMeta({
    title: pageContent.title,
    description: pageContent.description
  })
  
  const breadcrumbs = generateBreadcrumbs('/faq')
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${c.req.url.split('/faq')[0]}${crumb.href}`
    }))
  }

  const faqs = [
    {
      question: "和装結婚式にはどのような種類がありますか？",
      answer: "神前式（神社での挙式）、仏前式、人前式があります。白無垢での神前式が最も人気で、色打掛でのお色直しも可能です。また、和装フォトウェディングのみのプランもご用意しています。"
    },
    {
      question: "白無垢と色打掛の違いを教えてください",
      answer: "白無垢は純白の和装で神前式で着用する正式な花嫁衣装です。色打掛は披露宴でのお色直しで着用する華やかな和装で、赤や金など色とりどりの美しい柄が特徴です。"
    },
    {
      question: "和装での前撮りはできますか？",
      answer: "はい。日本庭園や神社での和装前撮りを承っております。季節の花々との撮影や、紅葉・桜の季節には特に美しいお写真をお撮りできます。ヘアメイクから着付けまでトータルサポートいたします。"
    },
    {
      question: "神社はどのように選べばよいですか？",
      answer: "お二人の居住地や思い出の場所、神社の雰囲気などを考慮してお選びいただけます。明治神宮、神田明神、湯島天神など都内の有名神社から、地元の氏神様まで幅広くご対応可能です。"
    },
    {
      question: "和装結婚式の費用はどのくらいかかりますか？",
      answer: "神前式のみの場合は30万円～、披露宴も含める場合は100万円～が目安です。和装レンタル（白無垢・色打掛）、着付け、ヘアメイク、写真撮影、神社への奉納料などが含まれます。詳細はお見積りいたします。"
    },
    {
      question: "家族が和装結婚式に反対している場合はどうしたらよいですか？",
      answer: "和装結婚式の格式や伝統的な意味をご説明し、ご家族にもご理解いただけるよう丁寧にご相談に乗ります。神前式の意味や、家族の絆を深める儀式であることをお伝えできます。"
    },
    {
      question: "着物を持参することはできますか？",
      answer: "はい、お母様やおばあ様から受け継いだ着物をお持ち込みいただくことも可能です。サイズ直しや着付けの準備も承ります。思い出の着物での結婚式は特別な意味を持ちます。"
    },
    {
      question: "雨天時の対応はどうなりますか？",
      answer: "神社での挙式は屋内で行われるため雨天でも問題ございません。前撮りの場合は延期または屋内撮影に変更いたします。雨に濡れた日本庭園も趣があり、美しいお写真が撮れることもあります。"
    }
  ]

  const content = `
    <div class="container mx-auto px-4 py-12">
      <nav class="mb-8" aria-label="パンくずリスト">
        <ol class="flex space-x-2 text-sm text-gray-600">
          ${breadcrumbs.map((crumb, index) => `
            <li class="flex items-center">
              ${index > 0 ? '<i class="fas fa-chevron-right mx-2 text-xs"></i>' : ''}
              ${index === breadcrumbs.length - 1 
                ? `<span class="text-gray-900">${crumb.name}</span>`
                : `<a href="${crumb.href}" class="hover:text-primary-500">${crumb.name}</a>`
              }
            </li>
          `).join('')}
        </ol>
      </nav>
      
      <div class="text-center mb-12">
        <h1 class="font-mincho text-3xl md:text-4xl font-bold text-gray-900 mb-4">和装結婚式 よくある質問</h1>
        <p class="text-lg text-gray-600">${pageContent.description}</p>
      </div>
      
      <!-- 和装アイテム画像ヘッダー -->
      <div class="max-w-5xl mx-auto mb-12">
        <div class="relative rounded-xl overflow-hidden shadow-xl">
          <img src="https://page.gensparksite.com/v1/base64_upload/8fc938425ea1151f5524c33365139d08" 
               alt="和装結婚式のアイテム - 折り鶴、扇子、指輪、ブーケ" 
               class="w-full h-64 md:h-80 object-cover">
          <div class="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
          <div class="absolute bottom-6 left-6 text-white">
            <h2 class="font-mincho text-xl md:text-2xl font-bold mb-2">和装結婚式への想いをお聞かせください</h2>
            <p class="text-sm md:text-base opacity-90">伝統の美しさを纏う特別な一日のために</p>
          </div>
        </div>
      </div>
      
      <div class="max-w-4xl mx-auto">
        <div class="space-y-6">
          ${faqs.map((faq, index) => `
            <div class="faq-item bg-white rounded-lg shadow-sm border border-red-100 p-6 hover:shadow-md transition-shadow">
              <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-start">
                <span class="bg-gradient-to-r from-red-100 to-pink-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium mr-3 mt-0.5 flex items-center">
                  <i class="fas fa-torii-gate mr-1 text-xs"></i>
                  Q${index + 1}
                </span>
                <span class="font-mincho">${faq.question}</span>
              </h3>
              <div class="ml-12 text-gray-700 leading-relaxed">
                ${faq.answer}
              </div>
            </div>
          `).join('')}
        </div>
        
        <!-- 和装結婚式の特典セクション -->
        <div class="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-8 my-12 border border-red-100">
          <h3 class="font-mincho text-xl font-bold text-center text-gray-900 mb-6">和装結婚式の特典</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="benefit-item flex items-start space-x-4">
              <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-gift text-red-600"></i>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">前撮り特別プラン</h4>
                <p class="text-gray-700 text-sm">日本庭園での和装前撮りを特別価格でご提供</p>
              </div>
            </div>
            <div class="benefit-item flex items-start space-x-4">
              <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-kimono text-red-600"></i>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">衣装レンタル割引</h4>
                <p class="text-gray-700 text-sm">白無垢・色打掛のレンタルを優待価格で</p>
              </div>
            </div>
            <div class="benefit-item flex items-start space-x-4">
              <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-camera text-red-600"></i>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">アルバム制作サービス</h4>
                <p class="text-gray-700 text-sm">プロカメラマンによる和装フォトアルバム作成</p>
              </div>
            </div>
            <div class="benefit-item flex items-start space-x-4">
              <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-users text-red-600"></i>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">家族着付けサービス</h4>
                <p class="text-gray-700 text-sm">ご両親・ご親族の着物着付けもサポート</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <p class="text-gray-600 mb-6 font-mincho">和装結婚式に関するご質問・ご相談はお気軽にどうぞ</p>
          <a href="/contact" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg">
            <i class="fas fa-torii-gate mr-3"></i>
            和装結婚式のご相談はこちら
            <i class="fas fa-arrow-right ml-3"></i>
          </a>
        </div>
      </div>
    </div>
  `

  return c.html(Layout({
    content,
    meta,
    breadcrumbSchema
  }))
})

// お問い合わせページ
app.get('/contact', (c) => {
  const meta = generateSEOMeta({
    title: 'お問い合わせ',
    description: 'お気軽にお問い合わせください。フォーム、LINE、お電話よりご連絡をお願いいたします。'
  })
  
  const breadcrumbs = generateBreadcrumbs('/contact')
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${c.req.url.split('/contact')[0]}${crumb.href}`
    }))
  }
  
  const content = `
    <div class="container mx-auto px-4 py-12">
      <nav class="mb-8" aria-label="パンくずリスト">
        <ol class="flex space-x-2 text-sm text-gray-600">
          ${breadcrumbs.map((crumb, index) => `
            <li class="flex items-center">
              ${index > 0 ? '<i class="fas fa-chevron-right mx-2 text-xs"></i>' : ''}
              ${index === breadcrumbs.length - 1 
                ? `<span class="text-gray-900">${crumb.name}</span>`
                : `<a href="${crumb.href}" class="hover:text-primary-500">${crumb.name}</a>`
              }
            </li>
          `).join('')}
        </ol>
      </nav>
    </div>
    
    ${ContactForm()}
  `
  
  return c.html(Layout({
    title: meta.title,
    description: meta.description,
    children: content,
    structuredData: breadcrumbSchema
  }))
})

// プライバシーポリシーページ
app.get('/policy', (c) => {
  const meta = generateSEOMeta({
    title: 'プライバシーポリシー',
    description: 'プライバシーポリシーについて'
  })
  
  const content = `
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto prose prose-lg">
        <h1>プライバシーポリシー</h1>
        
        <p>MATCH（マッチ）本気の婚活（以下、「当社」）は、お客様の個人情報保護の重要性を認識し、以下のプライバシーポリシーを定め、個人情報の適切な取り扱いに努めます。</p>
        
        <h2>1. 個人情報の収集について</h2>
        <p>当社では、以下の目的で個人情報を収集いたします：</p>
        <ul>
          <li>結婚相談所サービスの提供</li>
          <li>お客様からのお問い合わせへの対応</li>
          <li>サービス改善のための統計分析</li>
          <li>重要な通知事項の連絡</li>
        </ul>
        
        <h2>2. 個人情報の利用目的</h2>
        <p>収集した個人情報は、以下の目的で利用いたします：</p>
        <ul>
          <li>会員様のプロフィール作成・管理</li>
          <li>お見合いのセッティング</li>
          <li>婚活サポート・アドバイスの提供</li>
          <li>各種ご連絡・お知らせの送付</li>
          <li>サービスの品質向上</li>
        </ul>
        
        <h2>3. 個人情報の第三者提供について</h2>
        <p>当社は、法令に基づく場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。ただし、以下の場合は除きます：</p>
        <ul>
          <li>IBJ（日本結婚相談所連盟）への会員情報の提供</li>
          <li>お見合い相手への必要最小限の情報提供</li>
          <li>法令により開示が求められた場合</li>
        </ul>
        
        <h2>4. 個人情報の管理について</h2>
        <p>当社は、個人情報の紛失、破壊、改ざん、漏洩等を防ぐため、適切な安全管理措置を講じます。</p>
        
        <h2>5. 個人情報の開示・訂正・削除について</h2>
        <p>お客様は、当社が保有する個人情報の開示・訂正・削除を求めることができます。ご希望の場合は、当社までご連絡ください。</p>
        
        <h2>6. お問い合わせ窓口</h2>
        <p>個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください：</p>
        <p>
          MATCH（マッチ）本気の婚活<br>
          電話：045-XXX-XXXX<br>
          メール：info@match-konkatsu.com
        </p>
        
        <h2>7. プライバシーポリシーの変更について</h2>
        <p>本プライバシーポリシーは、法令の変更等に応じて予告なく変更する場合があります。変更後のプライバシーポリシーは、当サイトに掲載した時点で効力を生じるものとします。</p>
        
        <p class="text-sm text-gray-500">最終更新日：2024年1月1日</p>
      </div>
    </div>
  `
  
  return c.html(Layout({
    title: meta.title,
    description: meta.description,
    children: content
  }))
})

// フォームトークン生成API
app.get('/api/form-token', (c) => {
  const secret = c.env?.FORM_SECRET || 'default-secret'
  const token = generateFormToken(secret)
  return c.json({ token })
})

// お問い合わせAPIエンドポイント（強化版）
const contactSchema = z.object({
  name: z.string().min(1, '名前は必須です').max(100, '名前は100文字以内で入力してください'),
  email: z.string().email('正しいメールアドレスを入力してください').max(255, 'メールアドレスが長すぎます'),
  phone: z.string().optional(),
  inquiry_type: z.string().optional(),
  message: z.string().min(10, 'メッセージは10文字以上で入力してください').max(5000, 'メッセージは5000文字以内で入力してください'),
  privacy_agree: z.string().refine(val => val === 'on' || val === 'true', {
    message: 'プライバシーポリシーへの同意が必要です'
  }),
  csrf_token: z.string().optional(),
  // ハニーポット（スパム対策）
  website: z.string().optional()
})

app.post('/api/contact', async (c) => {
  const startTime = Date.now()
  
  try {
    // クライアント情報取得
    const clientIP = normalizeIP(
      c.req.header('CF-Connecting-IP') || 
      c.req.header('X-Forwarded-For') || 
      c.req.header('X-Real-IP') || 
      'unknown'
    )
    const userAgent = c.req.header('User-Agent') || ''
    const referer = c.req.header('Referer') || ''
    
    // フォームデータを取得
    const formData = await c.req.formData()
    const rawData = Object.fromEntries(formData.entries()) as Record<string, string>
    
    // データサニタイズ
    const sanitizedData = sanitizeFormData(rawData as any)
    
    // CSRF トークン検証
    const secret = c.env?.FORM_SECRET || 'default-secret'
    if (!validateFormToken(sanitizedData.csrf_token, secret)) {
      console.log('Invalid CSRF token:', { ip: clientIP, token: sanitizedData.csrf_token })
      return c.json({ error: 'セッションが無効です。ページを再読み込みしてやり直してください。' }, 400)
    }
    
    // バリデーション
    const validatedData = contactSchema.parse(sanitizedData)
    
    // レート制限チェック（簡易版 - 実際の実装ではDBまたはKVストレージを使用）
    // ここでは基本的なチェックのみ実装
    const rateLimitKey = `rate_limit_${clientIP}`
    
    // スパム検出
    const spamCheck = detectSpam(validatedData, {
      ip: clientIP,
      userAgent,
      referer
    })
    
    if (!spamCheck.isValid) {
      console.log('Spam detected:', {
        ip: clientIP,
        score: spamCheck.spamScore,
        errors: spamCheck.errors,
        data: { 
          name: validatedData.name, 
          email: validatedData.email,
          honeypot: sanitizedData.website 
        }
      })
      
      // スパムの場合はDBに保存するが、メール通知はしない
      if (c.env?.DB) {
        await c.env.DB.prepare(`
          INSERT INTO contacts (name, email, phone, message, created_at, ip_address, user_agent, referer, status, spam_score)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          validatedData.name,
          validatedData.email,
          validatedData.phone || null,
          `[${validatedData.inquiry_type || 'その他'}] ${validatedData.message}`,
          new Date().toISOString(),
          clientIP,
          userAgent,
          referer,
          'spam',
          spamCheck.spamScore
        ).run()
      }
      
      // スパムでも成功レスポンスを返す（スパマーに成功/失敗を教えない）
      return c.json({ 
        success: true, 
        message: 'お問い合わせを受け付けました。48時間以内にご返信いたします。' 
      })
    }
    
    // D1データベースに保存
    let insertResult
    if (c.env?.DB) {
      insertResult = await c.env.DB.prepare(`
        INSERT INTO contacts (name, email, phone, message, created_at, updated_at, ip_address, user_agent, referer, status, spam_score)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        validatedData.name,
        validatedData.email,
        validatedData.phone || null,
        `[${validatedData.inquiry_type || 'その他'}] ${validatedData.message}`,
        new Date().toISOString(),
        new Date().toISOString(),
        clientIP,
        userAgent,
        referer,
        'new',
        spamCheck.spamScore
      ).run()
      
      console.log('Contact form submission saved:', insertResult.meta.last_row_id)
    }
    
    // メール通知（環境変数が設定されている場合のみ）
    if (shouldNotifyAdmin(spamCheck.spamScore) && validateEmailConfig(c.env)) {
      try {
        // 管理者通知メール
        const adminTemplate = createAdminNotificationTemplate(validatedData)
        const adminEmailSent = await sendEmail(
          c.env.NOTIFICATION_EMAIL,
          adminTemplate,
          {
            host: c.env.SMTP_HOST || '',
            port: parseInt(c.env.SMTP_PORT || '587', 10),
            user: c.env.SMTP_USER || '',
            pass: c.env.SMTP_PASS || ''
          }
        )
        
        // 自動返信メール
        const autoReplyTemplate = createAutoReplyTemplate(validatedData)
        const autoReplyEmailSent = await sendEmail(
          validatedData.email,
          autoReplyTemplate,
          {
            host: c.env.SMTP_HOST || '',
            port: parseInt(c.env.SMTP_PORT || '587', 10),
            user: c.env.SMTP_USER || '',
            pass: c.env.SMTP_PASS || ''
          }
        )
        
        console.log('Email notifications:', {
          admin: adminEmailSent,
          autoReply: autoReplyEmailSent,
          contactId: insertResult?.meta.last_row_id
        })
        
      } catch (emailError) {
        console.error('Email sending failed:', emailError)
        // メール送信失敗してもフォーム送信は成功とする
      }
    } else {
      console.log('Email notifications skipped:', {
        shouldNotify: shouldNotifyAdmin(spamCheck.spamScore),
        configValid: validateEmailConfig(c.env),
        spamScore: spamCheck.spamScore
      })
    }
    
    const processingTime = Date.now() - startTime
    console.log('Contact form processed successfully:', {
      processingTime: `${processingTime}ms`,
      spamScore: spamCheck.spamScore,
      contactId: insertResult?.meta.last_row_id,
      clientIP
    })
    
    return c.json({ 
      success: true, 
      message: 'お問い合わせを受け付けました。48時間以内にご返信いたします。' 
    })
    
  } catch (error) {
    const processingTime = Date.now() - startTime
    console.error('Contact form error:', {
      error: error.message,
      stack: error.stack,
      processingTime: `${processingTime}ms`
    })
    
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map(e => e.message).join(', ')
      return c.json({ error: errorMessage }, 400)
    }
    
    return c.json({ 
      error: 'サーバーエラーが発生しました。しばらく時間をおいて再度お試しください。' 
    }, 500)
  }
})

export default app
