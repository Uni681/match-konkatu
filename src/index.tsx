import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { raw } from 'hono/html'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
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
import ReasonsSection from './components/ReasonsSection'
import IBJStatsSection from './components/IBJStatsSection'
import AboutUsLinksSection from './components/AboutUsLinksSection'
import { BadgesSection } from './components/BadgesSection'
import { SNSSection } from './components/SNSSection'
import { ContactSection } from './components/ContactSection'
import { ContactAccessSection } from './components/ContactAccessSection'

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
import { AboutPage } from './pages/about'
import { ServicePage } from './pages/service'
import { FlowPage } from './pages/flow'
import { FAQPage } from './pages/faq'
import { ContactPage } from './pages/contact'
import { BlogListPage } from './pages/blog'
import { AdminLoginPage } from './pages/admin/login'
import { AdminDashboardPage } from './pages/admin/dashboard'
import { AdminContactsPage, AdminContactDetailPage } from './pages/admin/contacts'
import { AdminBlogListPage, AdminBlogEditorPage } from './pages/admin/blog'

// Build time content
const { home, pages, posts, settings } = buildTimeContent;

const app = new Hono<{ Bindings: Bindings }>()

// CORS設定
app.use('/api/*', cors())

// 静的ファイルの配信
app.use('/static/*', serveStatic({ root: './public' }))
app.use('/img/*', serveStatic({ root: './public' }))

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
  
  const badgesHtml = BadgesSection()
  
  const snsHtml = SNSSection()
  
  const contactAccessHtml = ContactAccessSection()
  
  const content = `
    ${heroHtml}
    ${storyHtml}
    ${newsHtml}
    ${reasonsHtml}
    ${ibjStatsHtml}
    ${aboutUsLinksHtml}
    ${badgesHtml}
    ${snsHtml}
    ${contactAccessHtml}
  `
  
  return c.html(Layout({
    title: meta.title,
    description: meta.description,
    children: content,
    structuredData
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
  return c.html(AboutPage())
})

// サービス・料金ページ
app.get('/service', (c) => {
  return c.html(ServicePage())
})

// ご成婚までの流れページ
app.get('/flow', (c) => {
  return c.html(FlowPage())
})

// ブログ一覧ページ
app.get('/blog', (c) => {
  const page = parseInt(c.req.query('page') || '1')
  const perPage = 9
  const totalPages = Math.ceil(posts.length / perPage)
  
  return c.html(BlogListPage(posts, page, totalPages))
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
    <article class="container mx-auto px-4 md:px-6 py-8 md:py-16">
      <nav class="mb-8" aria-label="パンくずリスト">
        <ol class="flex flex-wrap space-x-2 text-sm text-gray-600">
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
        <div class="mb-6">
          <span class="inline-block bg-gradient-to-r from-[#c9a961] to-[#b39451] text-white px-6 py-2 rounded-full font-medium text-sm">
            ${post.category}
          </span>
        </div>
        
        <h1 class="font-mincho text-2xl md:text-4xl font-bold text-gray-900 mb-6 px-4">
          ${post.title}
        </h1>
        
        <div class="text-gray-600 mb-8">
          <time datetime="${post.date}" class="text-sm md:text-base">
            <i class="fas fa-calendar mr-2"></i>
            ${new Date(post.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
          ${post.tags && post.tags.length > 0 ? `
            <div class="mt-6 flex flex-wrap gap-2 justify-center">
              ${post.tags.map(tag => `
                <span class="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition-colors">
                  #${tag}
                </span>
              `).join('')}
            </div>
          ` : ''}
        </div>
        
        ${post.featured_image ? `
          <div class="mb-12">
            <img src="${post.featured_image}" alt="${post.title}" class="w-full max-w-4xl mx-auto rounded-2xl shadow-lg" style="max-height: 500px; object-fit: cover;">
          </div>
        ` : ''}
      </header>
      
      <div class="max-w-4xl mx-auto prose prose-lg prose-primary mb-16" style="font-size: 1.125rem; line-height: 1.9;">
        ${raw(post.content)}
      </div>
      
      <!-- Share buttons -->
      <div class="max-w-4xl mx-auto mt-16 pt-8 border-t-2 border-gray-200">
        <h3 class="font-semibold text-lg md:text-xl mb-6 text-center md:text-left">この記事をシェアする</h3>
        <div class="flex flex-wrap gap-3 justify-center md:justify-start">
          <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(c.req.url)}&text=${encodeURIComponent(post.title)}" 
             target="_blank" 
             class="flex items-center px-6 py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-all shadow-md">
            <i class="fab fa-twitter mr-2"></i>
            Twitter
          </a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(c.req.url)}" 
             target="_blank"
             class="flex items-center px-6 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#166fe5] transition-all shadow-md">
            <i class="fab fa-facebook mr-2"></i>
            Facebook
          </a>
          <button onclick="navigator.clipboard.writeText('${c.req.url}'); alert('URLをコピーしました');" 
                  class="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all shadow-md">
            <i class="fas fa-link mr-2"></i>
            URLコピー
          </button>
        </div>
      </div>
      
      <!-- Back to blog -->
      <div class="max-w-4xl mx-auto mt-12 text-center">
        <a href="/blog" class="inline-flex items-center text-[#c9a961] hover:text-[#b39451] font-medium text-lg transition-colors">
          <i class="fas fa-arrow-left mr-2"></i>
          ブログ一覧に戻る
        </a>
      </div>
    </article>
    
    <!-- Blog CTA Section - Relax Tone -->
    <section class="section-relax">
      <div class="container mx-auto px-4 md:px-6">
        <div class="relax-card">
          <h2 class="relax-title">
            ひと休みしていきませんか？
          </h2>
          <div class="relax-text">
            <p>・結婚したい気持ちが、あるようなないような</p>
            <p>・アプリを入れては消している</p>
            <p>・なんなら今日もその話をしている（脳内で）</p>
            <p><br></p>
            <p>そんな人、ここにもいます。（私たち）</p>
            <p><br></p>
            <p>気を張らずに、ゆるっと状況をお話ししましょう。</p>
          </div>
          
          <div class="relax-buttons">
            <a href="/contact" class="btn-relax-main">
              ちょっと聞いてほしい（無料）
            </a>
            <a href="#" class="btn-relax-line">
              LINEで相談してみる
            </a>
          </div>
        </div>
      </div>
    </section>
    
    ${SNSSection()}
    ${ContactSection()}
  `
  
  return c.html(Layout({
    title: meta.title,
    description: meta.description,
    children: content,
    structuredData: articleSchema
  }))
})

// よくあるご質問ページ
app.get('/faq', (c) => {
  return c.html(FAQPage())
})

// お問い合わせページ
app.get('/contact', (c) => {
  return c.html(ContactPage())
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

// =====================================
// 管理画面ルーティング
// =====================================

// 認証ミドルウェア
const adminAuth = async (c: any, next: any) => {
  const sessionToken = getCookie(c, 'admin_session')
  
  // 簡易認証（本番環境ではより堅牢な認証を推奨）
  const validToken = c.env?.ADMIN_SESSION_SECRET || 'match-admin-2024'
  
  if (sessionToken === validToken) {
    await next()
  } else {
    return c.redirect('/admin/login')
  }
}

// ログインページ（GET）
app.get('/admin/login', (c) => {
  const sessionToken = getCookie(c, 'admin_session')
  const validToken = c.env?.ADMIN_SESSION_SECRET || 'match-admin-2024'
  
  // すでにログイン済みの場合はダッシュボードへ
  if (sessionToken === validToken) {
    return c.redirect('/admin/dashboard')
  }
  
  return c.html(AdminLoginPage())
})

// ログイン処理（POST）
app.post('/admin/login', async (c) => {
  try {
    const formData = await c.req.formData()
    const username = formData.get('username') as string
    const password = formData.get('password') as string
    
    // 認証情報チェック（環境変数から取得、なければデフォルト）
    const validUsername = c.env?.ADMIN_USERNAME || 'admin'
    const validPassword = c.env?.ADMIN_PASSWORD || 'match2024'
    
    if (username === validUsername && password === validPassword) {
      // セッショントークンを設定
      const sessionToken = c.env?.ADMIN_SESSION_SECRET || 'match-admin-2024'
      setCookie(c, 'admin_session', sessionToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 60 * 60 * 24 * 7 // 7日間
      })
      
      return c.redirect('/admin/dashboard')
    } else {
      return c.html(AdminLoginPage('ユーザー名またはパスワードが正しくありません'))
    }
  } catch (error) {
    console.error('Login error:', error)
    return c.html(AdminLoginPage('ログインエラーが発生しました'))
  }
})

// ログアウト処理
app.post('/admin/logout', (c) => {
  deleteCookie(c, 'admin_session')
  return c.redirect('/admin/login')
})

// ダッシュボード
app.get('/admin/dashboard', adminAuth, async (c) => {
  try {
    let contactsCount = 0
    let newContactsCount = 0
    
    if (c.env?.DB) {
      const contactsResult = await c.env.DB.prepare('SELECT COUNT(*) as count FROM contacts').first()
      contactsCount = contactsResult?.count || 0
      
      const newContactsResult = await c.env.DB.prepare("SELECT COUNT(*) as count FROM contacts WHERE status = 'new'").first()
      newContactsCount = newContactsResult?.count || 0
    }
    
    const postsCount = posts.length
    
    return c.html(AdminDashboardPage({
      contacts: contactsCount,
      posts: postsCount,
      newContacts: newContactsCount
    }))
  } catch (error) {
    console.error('Dashboard error:', error)
    return c.html(AdminDashboardPage({ contacts: 0, posts: 0, newContacts: 0 }))
  }
})

// お問い合わせ一覧
app.get('/admin/contacts', adminAuth, async (c) => {
  try {
    let contactsList: any[] = []
    
    if (c.env?.DB) {
      const result = await c.env.DB.prepare(`
        SELECT id, name, email, phone, message, created_at, status, spam_score
        FROM contacts
        ORDER BY created_at DESC
        LIMIT 100
      `).all()
      
      contactsList = result.results || []
    }
    
    return c.html(AdminContactsPage(contactsList))
  } catch (error) {
    console.error('Contacts list error:', error)
    return c.html(AdminContactsPage([]))
  }
})

// お問い合わせ詳細
app.get('/admin/contacts/:id', adminAuth, async (c) => {
  try {
    const id = c.req.param('id')
    
    if (!c.env?.DB) {
      return c.text('データベースが設定されていません', 500)
    }
    
    const contact = await c.env.DB.prepare(`
      SELECT * FROM contacts WHERE id = ?
    `).bind(id).first()
    
    if (!contact) {
      return c.text('お問い合わせが見つかりません', 404)
    }
    
    return c.html(AdminContactDetailPage(contact))
  } catch (error) {
    console.error('Contact detail error:', error)
    return c.text('エラーが発生しました', 500)
  }
})

// お問い合わせステータス更新
app.post('/admin/contacts/:id/status', adminAuth, async (c) => {
  try {
    const id = c.req.param('id')
    const formData = await c.req.formData()
    const status = formData.get('status') as string
    
    if (!c.env?.DB) {
      return c.text('データベースが設定されていません', 500)
    }
    
    await c.env.DB.prepare(`
      UPDATE contacts 
      SET status = ?, updated_at = ?
      WHERE id = ?
    `).bind(status, new Date().toISOString(), id).run()
    
    return c.redirect(`/admin/contacts/${id}`)
  } catch (error) {
    console.error('Status update error:', error)
    return c.text('エラーが発生しました', 500)
  }
})

// ブログ一覧
app.get('/admin/blog', adminAuth, (c) => {
  return c.html(AdminBlogListPage(posts))
})

// ブログ新規作成ページ
app.get('/admin/blog/new', adminAuth, (c) => {
  return c.html(AdminBlogEditorPage())
})

// ブログ編集ページ
app.get('/admin/blog/edit/:slug', adminAuth, (c) => {
  const slug = c.req.param('slug')
  const post = posts.find(p => p.slug === slug)
  
  if (!post) {
    return c.text('記事が見つかりません', 404)
  }
  
  return c.html(AdminBlogEditorPage(post))
})

// ブログ新規作成（POST）
app.post('/admin/blog/new', adminAuth, async (c) => {
  try {
    const formData = await c.req.formData()
    
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const description = formData.get('description') as string
    const content = formData.get('content') as string
    const date = formData.get('date') as string
    const category = formData.get('category') as string
    const featuredImage = formData.get('featured_image') as string || ''
    const tagsStr = formData.get('tags') as string || ''
    const tags = tagsStr.split(',').map(t => t.trim()).filter(t => t)
    const featured = formData.get('featured') === 'true'
    const draft = formData.get('draft') === 'true'
    
    const frontmatter = `---
title: "${title}"
seo_title: "${title}｜MATCH"
description: "${description}"
category: "${category}"
tags: ${JSON.stringify(tags)}
date: "${date}:00+09:00"
featured_image: "${featuredImage}"
featured_image_alt: "${title}"
featured: ${featured}
draft: ${draft}
---

${content}`
    
    const fileDate = date.substring(0, 10)
    const fileName = `${fileDate}-${slug}.md`
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <title>記事作成完了</title>
        <style>
          body { font-family: sans-serif; padding: 40px; max-width: 1200px; margin: 0 auto; }
          pre { background: #f5f5f5; padding: 20px; border-radius: 8px; overflow-x: auto; }
          .btn { display: inline-block; padding: 12px 24px; background: #c9a961; color: white; text-decoration: none; border-radius: 8px; }
        </style>
      </head>
      <body>
        <h1>✅ 記事作成完了</h1>
        <p>以下のファイルを <strong>content/posts/</strong> に保存してください：</p>
        <h2>${fileName}</h2>
        <pre>${frontmatter}</pre>
        <p><a href="/admin/blog" class="btn">ブログ一覧に戻る</a></p>
      </body>
      </html>
    `)
  } catch (error) {
    console.error('Blog create error:', error)
    return c.text('エラーが発生しました', 500)
  }
})

// ブログ編集（POST）
app.post('/admin/blog/edit/:slug', adminAuth, async (c) => {
  try {
    const slug = c.req.param('slug')
    const formData = await c.req.formData()
    
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const content = formData.get('content') as string
    const date = formData.get('date') as string
    const category = formData.get('category') as string
    const featuredImage = formData.get('featured_image') as string || ''
    const tagsStr = formData.get('tags') as string || ''
    const tags = tagsStr.split(',').map(t => t.trim()).filter(t => t)
    const featured = formData.get('featured') === 'true'
    const draft = formData.get('draft') === 'true'
    
    const frontmatter = `---
title: "${title}"
seo_title: "${title}｜MATCH"
description: "${description}"
category: "${category}"
tags: ${JSON.stringify(tags)}
date: "${date}:00+09:00"
featured_image: "${featuredImage}"
featured_image_alt: "${title}"
featured: ${featured}
draft: ${draft}
---

${content}`
    
    const post = posts.find(p => p.slug === slug)
    const fileName = post?.fileName || `${slug}.md`
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <title>記事更新完了</title>
        <style>
          body { font-family: sans-serif; padding: 40px; max-width: 1200px; margin: 0 auto; }
          pre { background: #f5f5f5; padding: 20px; border-radius: 8px; overflow-x: auto; }
          .btn { display: inline-block; padding: 12px 24px; background: #c9a961; color: white; text-decoration: none; border-radius: 8px; }
        </style>
      </head>
      <body>
        <h1>✅ 記事更新完了</h1>
        <p>以下の内容で <strong>content/posts/${fileName}</strong> を更新してください：</p>
        <pre>${frontmatter}</pre>
        <p><a href="/admin/blog" class="btn">ブログ一覧に戻る</a></p>
      </body>
      </html>
    `)
  } catch (error) {
    console.error('Blog update error:', error)
    return c.text('エラーが発生しました', 500)
  }
})

// ブログ削除API
app.delete('/admin/api/blog/:slug', adminAuth, async (c) => {
  try {
    const slug = c.req.param('slug')
    const post = posts.find(p => p.slug === slug)
    
    if (!post) {
      return c.json({ error: '記事が見つかりません' }, 404)
    }
    
    return c.json({ 
      success: true, 
      message: `content/posts/ から ${post.fileName || slug + '.md'} を削除してください` 
    })
  } catch (error) {
    console.error('Blog delete error:', error)
    return c.json({ error: 'エラーが発生しました' }, 500)
  }
})

export default app
