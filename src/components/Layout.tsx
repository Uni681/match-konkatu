import { html, raw } from 'hono/html';

interface LayoutProps {
  title: string;
  description: string;
  children: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object | object[];
  breadcrumbs?: Array<{name: string, href: string}>;
  pageType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
}

export const Layout = ({
  title,
  description,
  children,
  ogImage = '/img/og-default.jpg',
  canonicalUrl,
  structuredData,
  breadcrumbs = [],
  pageType = 'website',
  publishedTime,
  modifiedTime,
  author,
  keywords = []
}: LayoutProps) => {
  const siteTitle = 'MATCH（マッチ）本気の婚活';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
  const currentUrl = canonicalUrl || '';

  // キーワードの文字列化
  const keywordString = keywords.length > 0 ? keywords.join(', ') : '結婚相談所, 婚活, マッチング, 横浜, 神奈川';

  return html`
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO Meta Tags -->
  <title>${fullTitle}</title>
  <meta name="description" content="${description}">
  <meta name="keywords" content="${keywordString}">
  <meta name="author" content="${author || 'MATCH（マッチ）本気の婚活'}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  ${canonicalUrl ? `<link rel="canonical" href="${canonicalUrl}">` : ''}
  
  <!-- Language and Region -->
  <meta name="language" content="ja-JP">
  <link rel="alternate" hreflang="ja" href="${currentUrl}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${fullTitle}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${title}のイメージ">
  <meta property="og:type" content="${pageType}">
  <meta property="og:url" content="${currentUrl}">
  <meta property="og:site_name" content="MATCH（マッチ）本気の婚活">
  <meta property="og:locale" content="ja_JP">
  ${publishedTime ? `<meta property="article:published_time" content="${publishedTime}">` : ''}
  ${modifiedTime ? `<meta property="article:modified_time" content="${modifiedTime}">` : ''}
  ${author ? `<meta property="article:author" content="${author}">` : ''}
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@match_konkatu">
  <meta name="twitter:creator" content="@match_konkatu">
  <meta name="twitter:title" content="${fullTitle}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${ogImage}">
  <meta name="twitter:image:alt" content="${title}のイメージ">
  
  <!-- Additional SEO Meta Tags -->
  <meta name="format-detection" content="telephone=no">
  <meta name="theme-color" content="#8B4513">
  <meta name="msapplication-TileColor" content="#8B4513">
  <meta name="msapplication-config" content="/browserconfig.xml">
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&family=Noto+Serif+JP:wght@400;500;600&family=Shippori+Mincho+B1:wght@400;500;600;700&family=Cormorant+Garamond:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer">
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: {
              50: '#faf7f4',
              100: '#f5f0ea',
              200: '#e8ddd0',
              300: '#d9c5b0',
              400: '#c4956c',
              500: '#8b5a3c',
              600: '#6d452f',
              700: '#5a3926',
              800: '#4a2f20',
              900: '#3d271b'
            },
            secondary: {
              50: '#faf8f4',
              100: '#f5f1ea',
              200: '#e8c4a0',
              300: '#d4a574',
              400: '#c4956c',
              500: '#b8935f',
              600: '#a67c5a',
              700: '#8b6749',
              800: '#72533b',
              900: '#5d432f'
            }
          },
          fontFamily: {
            'sans': ['Noto Sans JP', 'sans-serif'],
            'serif': ['Noto Serif JP', 'serif'],
            'mincho': ['Shippori Mincho B1', 'serif'],
            'english': ['Cormorant Garamond', 'serif']
          }
        }
      }
    }
  </script>
  
  <!-- Custom Styles -->
  <link rel="stylesheet" href="/static/styles.css">
  
  <!-- Structured Data (JSON-LD) -->
  ${structuredData ? 
    Array.isArray(structuredData) 
      ? raw(structuredData.map(schema => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('\n  '))
      : raw(`<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`)
    : ''}
  
  <!-- Preload Critical Resources -->
  <link rel="preload" href="/static/styles.css" as="style">
  <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" as="style">
  
  <!-- DNS Prefetch for External Resources -->
  <link rel="dns-prefetch" href="//fonts.googleapis.com">
  <link rel="dns-prefetch" href="//fonts.gstatic.com">
  <link rel="dns-prefetch" href="//cdnjs.cloudflare.com">
  <link rel="dns-prefetch" href="//cdn.tailwindcss.com">
</head>
<body class="font-sans text-gray-800 bg-white">
  <!-- Minimal Header -->
  <header class="absolute top-0 left-0 right-0 z-[100] header-transparent">
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between py-6">
        <!-- Logo -->
        <div class="flex items-center">
          <a href="/" class="flex items-center">
            <img src="/img/logo-hq.png" alt="MATCH（マッチ）本気の婚活" class="h-14 w-auto opacity-95 md:h-16">
          </a>
        </div>
        
        <!-- Minimal Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <a href="/" class="text-gray-800 hover:text-primary-600 transition-colors text-sm font-medium">ホーム</a>
          <a href="/about" class="text-gray-800 hover:text-primary-600 transition-colors text-sm font-medium">当結婚相談所について</a>
          <a href="/service" class="text-gray-800 hover:text-primary-600 transition-colors text-sm font-medium">サービス・料金</a>
          <a href="/flow" class="text-gray-800 hover:text-primary-600 transition-colors text-sm font-medium">ご成婚までのながれ</a>
          <a href="/faq" class="text-gray-800 hover:text-primary-600 transition-colors text-sm font-medium">よくあるご質問</a>
          <a href="/contact" class="text-gray-800 hover:text-primary-600 transition-colors text-sm font-medium">お問い合わせ</a>
        </nav>
        
        <!-- Social Icons and IBJ Banner -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- IBJ正規加盟店バナー -->
          <a href="https://www.ibjapan.com/" target="_blank" rel="noopener noreferrer" class="hover:opacity-80 transition-opacity">
            <img 
              src="https://page.gensparksite.com/v1/base64_upload/42a2aca30693b587e5ba48d1b3c96794" 
              alt="IBJ正規加盟店" 
              class="h-8 w-auto"
              width="120"
              height="32"
              loading="lazy"
            >
          </a>
          
          <a href="https://www.instagram.com/match_konkatu" class="text-gray-600 hover:text-primary-600 transition-colors">
            <i class="fab fa-instagram text-xl"></i>
          </a>
          <a href="https://line.me/R/ti/p/@match-konkatu" class="text-gray-600 hover:text-primary-600 transition-colors">
            <i class="fab fa-line text-xl"></i>
          </a>
        </div>
        
        <!-- Mobile Menu Toggle -->
        <button 
          id="mobile-menu-toggle" 
          class="md:hidden p-2 text-gray-700 hover:text-primary-500"
          aria-expanded="false"
          aria-controls="mobile-menu"
          aria-label="メニューを開く"
        >
          <i class="fas fa-bars text-xl"></i>
        </button>
      </div>
      
      <!-- Mobile Menu -->
      <div id="mobile-menu" class="md:hidden hidden bg-white rounded-lg shadow-lg mt-2">
        <nav class="p-4 space-y-2">
          <a href="/" class="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded transition-colors">ホーム</a>
          <a href="/about" class="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded transition-colors">当結婚相談所について</a>
          <a href="/service" class="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded transition-colors">サービス・料金</a>
          <a href="/about" class="block py-2 text-gray-700 hover:text-primary-500 transition-colors">私たちについて</a>
          <a href="/blog" class="block py-2 text-gray-700 hover:text-primary-500 transition-colors">ブログ</a>
          <a href="/contact" class="block py-2 text-primary-500 font-semibold">無料相談</a>
        </nav>
      </div>
    </div>
  </header>

  ${breadcrumbs.length > 0 ? raw(`
  <!-- Breadcrumb -->
  <nav class="bg-gray-50 border-b border-gray-200" aria-label="パンくず">
    <div class="container mx-auto px-4 py-3">
      <ol class="flex items-center space-x-2 text-sm">
        ${breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return `
            <li class="flex items-center">
              ${index > 0 ? '<i class="fas fa-chevron-right text-gray-400 text-xs mx-2"></i>' : ''}
              ${isLast 
                ? `<span class="text-gray-600 font-medium" aria-current="page">${crumb.name}</span>`
                : `<a href="${crumb.href}" class="text-primary-600 hover:text-primary-800 transition-colors">${crumb.name}</a>`
              }
            </li>
          `;
        }).join('')}
      </ol>
    </div>
  </nav>
  `) : ''}

  <!-- Main Content -->
  <main>
    ${raw(children)}
  </main>

  <!-- Footer -->
  <footer class="bg-white border-t border-gray-200">
    <div class="container mx-auto px-6 py-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Company Info -->
        <div>
          <div class="mb-3">
            <img src="/img/logo-hq.png" alt="MATCH（マッチ）本気の婚活" class="h-10 w-auto">
          </div>
          <p class="text-gray-600 text-xs leading-relaxed">
            神奈川県横浜市神奈川区にあるIBJ正規加盟店の結婚相談所。親子2代で運営し、温かいサポートで成婚まで導きます。
          </p>
        </div>
        
        <!-- Navigation Links & Social -->
        <div class="flex justify-between items-start">
          <!-- Quick Links -->
          <div>
            <ul class="space-y-1 text-xs">
              <li><a href="/" class="text-gray-500 hover:text-primary-600 transition-colors">ホーム</a></li>
              <li><a href="/about" class="text-gray-500 hover:text-primary-600 transition-colors">当結婚相談所について</a></li>
              <li><a href="/service" class="text-gray-500 hover:text-primary-600 transition-colors">サービス・料金</a></li>
              <li><a href="/flow" class="text-gray-500 hover:text-primary-600 transition-colors">ご成婚までのながれ</a></li>
              <li><a href="/faq" class="text-gray-500 hover:text-primary-600 transition-colors">よくあるご質問</a></li>
              <li><a href="/blog" class="text-gray-500 hover:text-primary-600 transition-colors">ブログ</a></li>
              <li><a href="/contact" class="text-gray-500 hover:text-primary-600 transition-colors">お問い合わせ</a></li>
              <li><a href="/policy" class="text-gray-500 hover:text-primary-600 transition-colors">プライバシーポリシー</a></li>
            </ul>
          </div>
          
          <!-- Social Links -->
          <div class="flex items-center space-x-3">
            <a href="https://www.ibjapan.com/" target="_blank" rel="noopener noreferrer" class="hover:opacity-80 transition-opacity">
              <img 
                src="https://page.gensparksite.com/v1/base64_upload/42a2aca30693b587e5ba48d1b3c96794" 
                alt="IBJ正規加盟店" 
                class="h-5 w-auto"
              >
            </a>
            <a href="https://www.instagram.com/match_konkatu" class="text-gray-500 hover:text-primary-600 transition-colors">
              <i class="fab fa-instagram text-lg"></i>
            </a>
            <a href="https://line.me/R/ti/p/@match-konkatu" class="text-gray-500 hover:text-primary-600 transition-colors">
              <i class="fab fa-line text-lg"></i>
            </a>
          </div>
        </div>
      </div>
      
      <div class="border-t border-gray-200 mt-4 pt-3 text-center text-xs text-gray-400">
        <p>&copy; 2024 MATCH（マッチ）本気の婚活. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <!-- Performance Optimization -->
  <script>
    // Critical performance optimizations (inline for faster execution)
    (function() {
      // Prevent layout shift for images
      document.addEventListener('DOMContentLoaded', function() {
        const images = document.querySelectorAll('img:not([width]):not([height])');
        images.forEach(img => {
          const aspectRatio = img.dataset.aspectRatio || '16/9';
          img.style.aspectRatio = aspectRatio;
          img.style.objectFit = 'cover';
        });
      });
      
      // Font loading optimization
      if ('fonts' in document) {
        document.fonts.ready.then(() => {
          document.body.classList.add('fonts-loaded');
        });
      }
    })();
  </script>

  <!-- Performance and App Scripts -->
  <script src="/static/performance.js" defer></script>
  <script src="/static/app.js" defer></script>
  
  <!-- Web Vitals (for development/monitoring) -->
  <script>
    // Load Web Vitals library for monitoring (development only)
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('dev')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/web-vitals@3/dist/web-vitals.iife.js';
      script.onload = () => {
        if (window.webVitals) {
          webVitals.getCLS(console.log);
          webVitals.getFID(console.log);  
          webVitals.getFCP(console.log);
          webVitals.getLCP(console.log);
          webVitals.getTTFB(console.log);
        }
      };
      document.head.appendChild(script);
    }
  </script>
</body>
</html>`;
};

export default Layout;