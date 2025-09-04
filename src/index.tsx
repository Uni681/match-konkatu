import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import type { Bindings } from './types'

// Components
import Layout from './components/Layout'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { PriceTable } from './components/PriceTable'
import { Testimonials } from './components/Testimonials'
import { FAQ } from './components/FAQ'
import { CTA } from './components/CTA'

// Utils
import { generateSEOMeta, generateBreadcrumbs } from './utils/content'
import { ContactForm } from './components/ContactForm'
import { buildTimeContent } from './utils/build-content'
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

// robots.txt
app.get('/robots.txt', (c) => {
  return c.text(`User-agent: *
Allow: /

Sitemap: ${c.req.url.replace(/\/[^\/]*$/, '')}/sitemap.xml`)
})

// sitemap.xml (簡易版)
app.get('/sitemap.xml', (c) => {
  const baseUrl = c.req.url.replace(/\/[^\/]*$/, '')
  const allPosts = posts
  
  const staticPages = [
    '',
    '/about',
    '/service', 
    '/price',
    '/contact',
    '/blog',
    '/policy'
  ]
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`
  
  // 静的ページ
  staticPages.forEach(page => {
    sitemap += `  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>
`
  })
  
  // ブログ記事
  allPosts.forEach(post => {
    sitemap += `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`
  })
  
  sitemap += `</urlset>`
  
  c.header('Content-Type', 'application/xml')
  return c.text(sitemap)
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
  
  const ctaHtml = CTA({
    variant: 'gradient'
  })
  
  const content = `
    ${heroHtml}
    ${featuresHtml}
    ${pricingHtml}
    ${testimonialsHtml}
    ${faqHtml}
    ${ctaHtml}
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
        ${pageContent.content}
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
        ${pageContent.content}
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
        ${pageContent.content}
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
        ${post.content}
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

// お問い合わせAPIエンドポイント
const contactSchema = z.object({
  name: z.string().min(1, '名前は必須です'),
  email: z.string().email('正しいメールアドレスを入力してください'),
  phone: z.string().optional(),
  inquiry_type: z.string().optional(),
  message: z.string().min(1, 'メッセージは必須です'),
  privacy_agree: z.string().optional(),
  // ハニーポット（スパム対策）
  website: z.string().optional()
})

app.post('/api/contact', async (c) => {
  try {
    // フォームデータを取得
    const formData = await c.req.formData()
    const data = Object.fromEntries(formData.entries())
    
    // ハニーポット（スパム対策）チェック
    if (data.website) {
      console.log('Spam detected via honeypot')
      return c.json({ error: 'Invalid submission' }, 400)
    }
    
    // バリデーション
    const validatedData = contactSchema.parse(data)
    
    // プライバシーポリシー同意チェック
    if (!validatedData.privacy_agree) {
      return c.json({ error: 'プライバシーポリシーへの同意が必要です' }, 400)
    }
    
    // D1データベースに保存
    if (c.env?.DB) {
      const insertResult = await c.env.DB.prepare(`
        INSERT INTO contacts (name, email, phone, message, created_at, ip_address, user_agent, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        validatedData.name,
        validatedData.email,
        validatedData.phone || null,
        `[${validatedData.inquiry_type || 'その他'}] ${validatedData.message}`,
        new Date().toISOString(),
        c.req.header('CF-Connecting-IP') || c.req.header('X-Forwarded-For') || 'unknown',
        c.req.header('User-Agent') || 'unknown',
        'new'
      ).run()
      
      console.log('Contact form submission saved:', insertResult.meta.last_row_id)
    }
    
    return c.json({ 
      success: true, 
      message: 'お問い合わせを受け付けました。48時間以内にご返信いたします。' 
    })
    
  } catch (error) {
    console.error('Contact form error:', error)
    
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map(e => e.message).join(', ')
      return c.json({ error: errorMessage }, 400)
    }
    
    return c.json({ error: 'サーバーエラーが発生しました。しばらく時間をおいて再度お試しください。' }, 500)
  }
})

export default app
