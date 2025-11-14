import { html } from 'hono/html'

export function Footer() {
  return html`
    <!-- ========================================
         Footer - Elegant Version (和 × 上品 × 静か)
         営業時間・定休日完全削除済み
         ======================================== -->
    <footer class="footer-elegant">
      <div class="container mx-auto px-6 max-w-7xl">
        
        <div class="footer-content-wrapper">
          
          <!-- 左ブロック: ロゴ + 住所 + TEL -->
          <div class="footer-block-left">
            <div class="footer-logo">
              <img src="/img/logo-hq.png" alt="MATCH" class="footer-logo-image">
            </div>
            <div class="footer-contact">
              <p class="footer-address">〒221-0834<br>神奈川県横浜市神奈川区台町8-14 412</p>
              <p class="footer-tel">TEL：045-534-8922</p>
            </div>
          </div>
          
          <!-- 中央ブロック: グローバルナビ（上4つ・下2つ） -->
          <nav class="footer-block-center">
            <div class="footer-nav-wrapper">
              <!-- 上段：4つ -->
              <ul class="footer-nav-horizontal footer-nav-row-top"><li><a href="/" class="footer-nav-link">ホーム</a></li><li class="footer-nav-sep">/</li><li><a href="/about" class="footer-nav-link">当結婚相談所について</a></li><li class="footer-nav-sep">/</li><li><a href="/service" class="footer-nav-link">サービス・料金</a></li><li class="footer-nav-sep">/</li><li><a href="/flow" class="footer-nav-link">ご成婚までのながれ</a></li></ul>
              <!-- 下段：2つ -->
              <ul class="footer-nav-horizontal footer-nav-row-bottom"><li><a href="/faq" class="footer-nav-link">よくあるご質問</a></li><li class="footer-nav-sep">/</li><li><a href="/contact" class="footer-nav-link">お問い合わせ</a></li></ul>
            </div>
          </nav>
          
          <!-- 右ブロック: 空 -->
          <div class="footer-block-right"></div>
          
        </div>
        
        <!-- コピーライト: 最下に、さりげなく -->
        <div class="footer-copyright-bottom">
          <p class="footer-copyright">&copy; 2024 MATCH by Uni</p>
        </div>
        
      </div>
    </footer>
  `
}
