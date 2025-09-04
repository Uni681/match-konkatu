import type { BlogPost } from '../types'

/**
 * 組織情報のJSON-LD構造化データ
 */
export function generateOrganizationSchema(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MATCH（マッチ）本気の婚活",
    "alternateName": "マッチ婚活",
    "description": "横浜の結婚相談所。本気の婚活をサポートし、理想のパートナーとの出会いをお手伝いします。",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/img/logo-hq.png`,
      "width": 300,
      "height": 100
    },
    "image": `${baseUrl}/img/hero-bg.jpg`,
    "telephone": "+81-45-XXX-XXXX",
    "email": "info@match-konkatu.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "神奈川区○○町1-2-3 ○○ビル4F",
      "addressLocality": "横浜市",
      "addressRegion": "神奈川県",
      "postalCode": "221-0000",
      "addressCountry": "JP"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 35.4767,
      "longitude": 139.6228
    },
    "openingHours": [
      "Mo-Fr 10:00-19:00",
      "Sa 10:00-17:00"
    ],
    "priceRange": "¥¥",
    "serviceArea": {
      "@type": "Place",
      "name": "横浜市・川崎市・東京都内"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "結婚相談サービス",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "ライトプラン",
          "description": "お手軽に婚活を始めたい方向け",
          "price": "29800",
          "priceCurrency": "JPY",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer", 
          "name": "スタンダードプラン",
          "description": "充実したサポートで真剣婚活",
          "price": "49800",
          "priceCurrency": "JPY",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "プレミアムプラン", 
          "description": "専任カウンセラーによる徹底サポート",
          "price": "79800",
          "priceCurrency": "JPY",
          "availability": "https://schema.org/InStock"
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/match.konkatu",
      "https://www.instagram.com/match_konkatu",
      "https://line.me/R/ti/p/@match-konkatu"
    ]
  }
}

/**
 * ローカルビジネスのJSON-LD構造化データ
 */
export function generateLocalBusinessSchema(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MatchmakingService"],
    "name": "MATCH（マッチ）本気の婚活",
    "description": "横浜の結婚相談所。お一人お一人に寄り添った丁寧なサポートで、理想のパートナー探しをお手伝いします。",
    "url": baseUrl,
    "telephone": "+81-45-XXX-XXXX",
    "email": "info@match-konkatu.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "神奈川区○○町1-2-3 ○○ビル4F",
      "addressLocality": "横浜市",
      "addressRegion": "神奈川県", 
      "postalCode": "221-0000",
      "addressCountry": "JP"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 35.4767,
      "longitude": 139.6228
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "10:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification", 
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "17:00"
      }
    ],
    "image": [
      `${baseUrl}/img/office-exterior.jpg`,
      `${baseUrl}/img/office-interior.jpg`,
      `${baseUrl}/img/consultation-room.jpg`
    ],
    "priceRange": "¥¥",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "田中様（32歳・女性）"
        },
        "reviewRating": {
          "@type": "Rating", 
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "親身になってサポートしてくださり、理想のお相手と出会えました。スタッフの皆さんの温かい対応に感謝しています。"
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "佐藤様（28歳・男性）"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5", 
          "bestRating": "5"
        },
        "reviewBody": "結婚に対して不安がありましたが、丁寧なカウンセリングで自信が持てました。半年で成婚できました！"
      }
    ]
  }
}

/**
 * パンくずナビのJSON-LD構造化データ
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{name: string, href: string}>, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.href.startsWith('http') ? crumb.href : `${baseUrl}${crumb.href}`
    }))
  }
}

/**
 * FAQ構造化データ
 */
export function generateFAQSchema(faqs: Array<{question: string, answer: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

/**
 * ブログ記事のJSON-LD構造化データ
 */
export function generateArticleSchema(post: BlogPost, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "image": post.featured_image ? `${baseUrl}${post.featured_image}` : `${baseUrl}/img/default-blog.jpg`,
    "author": {
      "@type": "Organization",
      "name": "MATCH（マッチ）本気の婚活",
      "url": baseUrl
    },
    "publisher": {
      "@type": "Organization", 
      "name": "MATCH（マッチ）本気の婚活",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/img/logo-hq.png`,
        "width": 300,
        "height": 100
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`
    },
    "keywords": post.tags?.join(', '),
    "articleSection": post.category,
    "about": {
      "@type": "Thing",
      "name": "結婚相談",
      "description": "婚活や結婚に関する情報"
    }
  }
}

/**
 * WebSiteの構造化データ
 */
export function generateWebSiteSchema(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MATCH（マッチ）本気の婚活",
    "alternateName": "マッチ婚活",
    "url": baseUrl,
    "description": "横浜の結婚相談所。本気の婚活をサポートし、理想のパートナーとの出会いをお手伝いします。",
    "publisher": {
      "@type": "Organization",
      "name": "MATCH（マッチ）本気の婚活"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://www.facebook.com/match.konkatu",
      "https://www.instagram.com/match_konkatu", 
      "https://line.me/R/ti/p/@match-konkatu"
    ]
  }
}

/**
 * サービスの構造化データ
 */
export function generateServiceSchema(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "結婚相談サービス",
    "description": "プロのカウンセラーによる婚活サポート。お見合いの設定から成婚まで全面的にサポートします。",
    "provider": {
      "@type": "Organization",
      "name": "MATCH（マッチ）本気の婚活",
      "url": baseUrl
    },
    "serviceType": "結婚相談・婚活サポート",
    "areaServed": {
      "@type": "Place",
      "name": "横浜市・川崎市・東京都内"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "料金プラン",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "ライトプラン",
          "price": "29800",
          "priceCurrency": "JPY",
          "description": "基本的な婚活サポート"
        },
        {
          "@type": "Offer",
          "name": "スタンダードプラン",  
          "price": "49800",
          "priceCurrency": "JPY",
          "description": "充実したサポート付き"
        },
        {
          "@type": "Offer",
          "name": "プレミアムプラン",
          "price": "79800", 
          "priceCurrency": "JPY",
          "description": "専任カウンセラー付き"
        }
      ]
    }
  }
}

/**
 * サイトマップ生成
 */
export function generateSitemap(baseUrl: string, posts: BlogPost[]) {
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/service', priority: '0.8', changefreq: 'monthly' },
    { url: '/price', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/blog', priority: '0.6', changefreq: 'daily' },
    { url: '/policy', priority: '0.3', changefreq: 'yearly' }
  ]
  
  const postUrls = posts.map(post => ({
    url: `/blog/${post.slug}`,
    priority: '0.6',
    changefreq: 'monthly',
    lastmod: post.date
  }))
  
  const allUrls = [...staticPages, ...postUrls]
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`
  
  for (const page of allUrls) {
    xml += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`
    
    if (page.lastmod) {
      xml += `
    <lastmod>${new Date(page.lastmod).toISOString().split('T')[0]}</lastmod>`
    }
    
    xml += `
  </url>
`
  }
  
  xml += `</urlset>`
  
  return xml
}

/**
 * robots.txt生成
 */
export function generateRobotsTxt(baseUrl: string) {
  return `User-agent: *
Allow: /

# 重要なページを優先
Crawl-delay: 1

# サイトマップの場所
Sitemap: ${baseUrl}/sitemap.xml

# 除外するパス
Disallow: /api/
Disallow: /admin/
Disallow: /*.json$
Disallow: /*?*utm_*
Disallow: /*?*fbclid*
Disallow: /*?*gclid*

# 重要なページへの直接アクセス
Allow: /
Allow: /about
Allow: /service  
Allow: /price
Allow: /contact
Allow: /blog
Allow: /blog/*`
}

/**
 * OGP・Twitter Cards メタタグ生成
 */
export function generateSocialMeta(
  title: string,
  description: string, 
  url: string,
  image?: string,
  type: 'website' | 'article' = 'website'
) {
  const defaultImage = '/img/ogp-default.jpg'
  const ogImage = image || defaultImage
  
  return {
    // OGP
    'og:title': title,
    'og:description': description,
    'og:url': url,
    'og:type': type,
    'og:image': ogImage,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:site_name': 'MATCH（マッチ）本気の婚活',
    'og:locale': 'ja_JP',
    
    // Twitter Cards
    'twitter:card': 'summary_large_image',
    'twitter:site': '@match_konkatu',
    'twitter:creator': '@match_konkatu', 
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': ogImage,
    
    // その他
    'theme-color': '#8B4513',
    'msapplication-TileColor': '#8B4513'
  }
}