/**
 * Core Web Vitals最適化スクリプト
 * LCP < 1.8s、CLS < 0.1を目標とした最適化
 */

// Critical CSS の遅延読み込み
function loadCriticalCSS() {
  const criticalStyles = `
    /* Above-the-fold critical styles */
    body { font-family: system-ui, -apple-system, sans-serif; margin: 0; }
    .hero { min-height: 60vh; background: linear-gradient(rgba(139, 69, 19, 0.8), rgba(139, 69, 19, 0.6)); }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
    .btn { display: inline-block; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; transition: all 0.2s; }
    .btn-primary { background: #8B4513; color: white; }
    .btn-primary:hover { background: #6d452f; }
  `;
  
  const style = document.createElement('style');
  style.textContent = criticalStyles;
  document.head.appendChild(style);
}

// 画像の遅延読み込み (Intersection Observer)
function setupLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px'
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  }
}

// CLS (Cumulative Layout Shift) 対策
function preventLayoutShift() {
  // 画像のアスペクト比を設定
  const images = document.querySelectorAll('img:not([width]):not([height])');
  images.forEach(img => {
    const aspectRatio = img.dataset.aspectRatio || '16/9';
    img.style.aspectRatio = aspectRatio;
    img.style.objectFit = 'cover';
  });
  
  // フォントの読み込み完了まで文字を非表示にしない
  if ('fonts' in document) {
    document.fonts.ready.then(() => {
      document.body.classList.add('fonts-loaded');
    });
  }
}

// LCP (Largest Contentful Paint) 最適化
function optimizeLCP() {
  // Hero画像のプリロード
  const heroImage = document.querySelector('.hero-image');
  if (heroImage && heroImage.dataset.src) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = heroImage.dataset.src;
    link.as = 'image';
    document.head.appendChild(link);
  }
  
  // 重要なフォントのプリロード
  const fontPreloads = [
    'https://fonts.gstatic.com/s/notosansjp/v52/k3kXps2l7BDgbYOlhs8w7ccJfFHEb8JKASK/wF3W7QkDBUbCGD0nB8FmOLfg2t0NwTOGGOPM8kJmxw.woff2',
    'https://fonts.gstatic.com/s/notoserifjp/v13/xn77YHs72GKoTvER4Gn3b5eMYC4l7LCZot_FZojk5NK5fFYzXNA.woff2'
  ];
  
  fontPreloads.forEach(fontUrl => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = fontUrl;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

// 非同期CSS読み込み
function loadNonCriticalCSS() {
  const stylesheets = [
    '/static/styles.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
  ];
  
  stylesheets.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print';
    link.onload = function() { this.media = 'all'; };
    document.head.appendChild(link);
  });
}

// リソースヒント最適化
function optimizeResourceHints() {
  const hints = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
    { rel: 'dns-prefetch', href: '//cdnjs.cloudflare.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: true }
  ];
  
  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    if (hint.crossOrigin) link.crossOrigin = hint.crossOrigin;
    document.head.appendChild(link);
  });
}

// Web Vitals計測（開発/デバッグ用）
function measureWebVitals() {
  if (typeof webVitals !== 'undefined') {
    webVitals.getCLS(console.log);
    webVitals.getFID(console.log);
    webVitals.getFCP(console.log);
    webVitals.getLCP(console.log);
    webVitals.getTTFB(console.log);
  }
}

// Service Worker登録（キャッシュ最適化）
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}

// スムーズスクロール最適化
function optimizeScrolling() {
  // Passive event listeners
  document.addEventListener('touchstart', () => {}, { passive: true });
  document.addEventListener('touchmove', () => {}, { passive: true });
  
  // Intersection Observer for animations
  if ('IntersectionObserver' in window) {
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          animationObserver.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '10% 0px'
    });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      animationObserver.observe(el);
    });
  }
}

// メインの初期化関数
function initPerformanceOptimizations() {
  loadCriticalCSS();
  preventLayoutShift();
  optimizeLCP();
  optimizeResourceHints();
  
  // DOM読み込み完了後
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupLazyLoading();
      optimizeScrolling();
    });
  } else {
    setupLazyLoading();
    optimizeScrolling();
  }
  
  // ページ読み込み完了後
  window.addEventListener('load', () => {
    loadNonCriticalCSS();
    measureWebVitals();
    // registerServiceWorker(); // 必要に応じて有効化
  });
}

// 即座に実行
initPerformanceOptimizations();

// パフォーマンス計測用のエクスポート
window.performanceOptimizer = {
  measureWebVitals,
  setupLazyLoading,
  preventLayoutShift,
  optimizeLCP
};