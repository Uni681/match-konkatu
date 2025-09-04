import { html } from 'hono/html';

interface LayoutProps {
  title: string;
  description: string;
  children: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

export const Layout = ({
  title,
  description,
  children,
  ogImage = '/img/og-default.jpg',
  canonicalUrl,
  structuredData
}: LayoutProps) => {
  const siteTitle = 'MATCH（マッチ）本気の婚活';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  return html`
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO Meta Tags -->
  <title>${fullTitle}</title>
  <meta name="description" content="${description}">
  ${canonicalUrl ? `<link rel="canonical" href="${canonicalUrl}">` : ''}
  
  <!-- Open Graph -->
  <meta property="og:title" content="${fullTitle}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="MATCH（マッチ）本気の婚活">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${fullTitle}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${ogImage}">
  
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
  
  ${structuredData ? `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>` : ''}
</head>
<body class="font-sans text-gray-800 bg-white">
  <!-- Header -->
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between py-4">
        <!-- Logo -->
        <div class="flex items-center">
          <a href="/" class="flex items-center space-x-2">
            <i class="fas fa-heart text-primary-500 text-2xl"></i>
            <div>
              <div class="font-mincho text-xl font-semibold text-gray-900">MATCH</div>
              <div class="text-xs text-gray-600">本気の婚活</div>
            </div>
          </a>
        </div>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <a href="/" class="text-gray-700 hover:text-primary-500 transition-colors">ホーム</a>
          <a href="/service" class="text-gray-700 hover:text-primary-500 transition-colors">サービス</a>
          <a href="/price" class="text-gray-700 hover:text-primary-500 transition-colors">料金</a>
          <a href="/about" class="text-gray-700 hover:text-primary-500 transition-colors">私たちについて</a>
          <a href="/blog" class="text-gray-700 hover:text-primary-500 transition-colors">ブログ</a>
        </nav>
        
        <!-- CTA Button -->
        <div class="hidden md:block">
          <a href="/contact" class="btn btn-primary">
            <i class="fas fa-comments mr-2"></i>
            無料相談
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
      <div id="mobile-menu" class="md:hidden hidden">
        <nav class="py-4 space-y-4">
          <a href="/" class="block py-2 text-gray-700 hover:text-primary-500 transition-colors">ホーム</a>
          <a href="/service" class="block py-2 text-gray-700 hover:text-primary-500 transition-colors">サービス</a>
          <a href="/price" class="block py-2 text-gray-700 hover:text-primary-500 transition-colors">料金</a>
          <a href="/about" class="block py-2 text-gray-700 hover:text-primary-500 transition-colors">私たちについて</a>
          <a href="/blog" class="block py-2 text-gray-700 hover:text-primary-500 transition-colors">ブログ</a>
          <a href="/contact" class="block py-2 text-primary-500 font-semibold">無料相談</a>
        </nav>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main>
    ${children}
  </main>

  <!-- Footer -->
  <footer class="bg-gray-900 text-white">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Company Info -->
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <i class="fas fa-heart text-primary-400 text-xl"></i>
            <div>
              <div class="font-mincho text-lg font-semibold">MATCH</div>
              <div class="text-sm text-gray-400">本気の婚活</div>
            </div>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed">
            神奈川県横浜市神奈川区にあるIBJ正規加盟店の結婚相談所。親子2代で運営し、温かいサポートで成婚まで導きます。
          </p>
        </div>
        
        <!-- Quick Links -->
        <div>
          <h3 class="font-semibold mb-4">サイトマップ</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="/service" class="text-gray-400 hover:text-white transition-colors">サービス</a></li>
            <li><a href="/price" class="text-gray-400 hover:text-white transition-colors">料金プラン</a></li>
            <li><a href="/about" class="text-gray-400 hover:text-white transition-colors">私たちについて</a></li>
            <li><a href="/blog" class="text-gray-400 hover:text-white transition-colors">ブログ</a></li>
            <li><a href="/contact" class="text-gray-400 hover:text-white transition-colors">お問い合わせ</a></li>
            <li><a href="/policy" class="text-gray-400 hover:text-white transition-colors">プライバシーポリシー</a></li>
          </ul>
        </div>
        
        <!-- Contact Info -->
        <div>
          <h3 class="font-semibold mb-4">お問い合わせ</h3>
          <div class="space-y-2 text-sm text-gray-400">
            <div class="flex items-center">
              <i class="fas fa-phone w-4 mr-2"></i>
              <span>045-XXX-XXXX</span>
            </div>
            <div class="flex items-center">
              <i class="fas fa-envelope w-4 mr-2"></i>
              <span>info@match-konkatsu.com</span>
            </div>
            <div class="flex items-start">
              <i class="fas fa-map-marker-alt w-4 mr-2 mt-1"></i>
              <div>
                <div>〒221-0000</div>
                <div>神奈川県横浜市神奈川区</div>
                <div>○○町1-2-3 ○○ビル4F</div>
              </div>
            </div>
            <div class="flex items-start">
              <i class="fas fa-clock w-4 mr-2 mt-1"></i>
              <div>
                <div>平日: 10:00〜19:00</div>
                <div>土曜: 10:00〜17:00</div>
                <div>日祝: 定休日</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
        <p>&copy; 2024 MATCH（マッチ）本気の婚活. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <!-- JavaScript -->
  <script src="/static/app.js"></script>
</body>
</html>`;
};

export default Layout;