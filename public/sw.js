/**
 * Service Worker for MATCH Konkatu Website
 * キャッシュ戦略でCore Web Vitals向上
 */

const CACHE_NAME = 'match-konkatu-v1';
const STATIC_CACHE_NAME = 'match-static-v1';
const DYNAMIC_CACHE_NAME = 'match-dynamic-v1';

// キャッシュするリソース（静的ファイル）
const STATIC_ASSETS = [
  '/',
  '/static/styles.css',
  '/static/performance.js',
  '/static/app.js',
  'https://cdn.tailwindcss.com/tailwind.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

// 動的キャッシュ対象のURL パターン
const DYNAMIC_CACHE_PATTERNS = [
  /^https:\/\/fonts\.googleapis\.com\/.*/,
  /^https:\/\/fonts\.gstatic\.com\/.*/,
  /^https:\/\/cdnjs\.cloudflare\.com\/.*/,
  /\/api\/.*/ // API endpoints
];

// キャッシュしないURL パターン
const NO_CACHE_PATTERNS = [
  /\/api\/contact/,
  /\/api\/form-token/,
  /\/admin\/.*/
];

// インストールイベント
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch(err => {
        console.log('Service Worker: Cache failed', err);
      })
  );
  
  // 新しいService Workerを即座にアクティベート
  self.skipWaiting();
});

// アクティベートイベント
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // 古いキャッシュを削除
          if (cacheName !== STATIC_CACHE_NAME && 
              cacheName !== DYNAMIC_CACHE_NAME && 
              cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // 新しいService Workerを即座に制御開始
  self.clients.claim();
});

// フェッチイベント
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // キャッシュしないリクエストをスキップ
  if (NO_CACHE_PATTERNS.some(pattern => pattern.test(request.url))) {
    return;
  }
  
  // GET リクエストのみ処理
  if (request.method !== 'GET') {
    return;
  }
  
  // 静的ファイル用の戦略
  if (STATIC_ASSETS.includes(request.url) || request.url.includes('/static/')) {
    event.respondWith(cacheFirstStrategy(request, STATIC_CACHE_NAME));
    return;
  }
  
  // 動的コンテンツ用の戦略
  if (DYNAMIC_CACHE_PATTERNS.some(pattern => pattern.test(request.url))) {
    event.respondWith(staleWhileRevalidateStrategy(request, DYNAMIC_CACHE_NAME));
    return;
  }
  
  // ページリクエスト用の戦略
  if (request.headers.get('accept').includes('text/html')) {
    event.respondWith(networkFirstStrategy(request, CACHE_NAME));
    return;
  }
  
  // その他のリクエスト（画像など）
  event.respondWith(cacheFirstStrategy(request, DYNAMIC_CACHE_NAME));
});

/**
 * Cache First 戦略
 * キャッシュを優先、なければネットワークから取得
 */
async function cacheFirstStrategy(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    // 成功したレスポンスのみキャッシュ
    if (networkResponse && networkResponse.status === 200) {
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Cache First Strategy failed:', error);
    // フォールバック処理
    if (request.headers.get('accept').includes('text/html')) {
      const cache = await caches.open(CACHE_NAME);
      return cache.match('/') || new Response('Offline');
    }
    throw error;
  }
}

/**
 * Network First 戦略
 * ネットワークを優先、失敗したらキャッシュ
 */
async function networkFirstStrategy(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network First Strategy failed, trying cache:', error);
    
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // 最終フォールバック
    return new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

/**
 * Stale While Revalidate 戦略
 * キャッシュを即座に返し、バックグラウンドで更新
 */
async function staleWhileRevalidateStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // バックグラウンドでの更新処理
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(error => {
    console.log('Background fetch failed:', error);
  });
  
  // キャッシュがあれば即座に返す、なければネットワークを待つ
  return cachedResponse || fetchPromise;
}

// バックグラウンド同期（将来的な機能拡張用）
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  console.log('Background sync triggered');
  // 必要に応じて実装
}

// プッシュ通知（将来的な機能拡張用）
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/img/icon-192x192.png',
      badge: '/img/badge-72x72.png',
      data: data.url
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// 通知クリック処理
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.notification.data) {
    event.waitUntil(
      clients.openWindow(event.notification.data)
    );
  }
});