import { html } from 'hono/html'

export function Footer() {
  return html`
    <!-- ========================================
         Footer - Elegant Version (和 × 上品 × 静か)
         ======================================== -->
    <footer class="footer-elegant">
      <div class="container mx-auto px-6 max-w-7xl">
        
        <!-- PC Layout: 3-column grid -->
        <div class="footer-grid">
          
          <!-- Left: Logo + Address/Tel -->
          <div class="footer-left">
            <!-- Logo with generous spacing -->
            <div class="footer-logo mb-6">
              <h2 class="footer-logo-text">MATCH</h2>
            </div>
            
            <!-- Address and Tel -->
            <div class="footer-contact-info">
              <p class="footer-address">
                〒221-0834<br>
                神奈川県横浜市神奈川区台町8-14 412
              </p>
              <p class="footer-tel mt-3">
                TEL：045-534-8922
              </p>
            </div>
          </div>
          
          <!-- Center: Site Navigation -->
          <nav class="footer-nav">
            <ul class="footer-nav-list">
              <li><a href="/" class="footer-nav-link">ホーム</a></li>
              <li><a href="/about" class="footer-nav-link">当結婚相談所について</a></li>
              <li><a href="/service" class="footer-nav-link">サービス・料金</a></li>
              <li><a href="/flow" class="footer-nav-link">ご成婚までのながれ</a></li>
              <li><a href="/faq" class="footer-nav-link">よくあるご質問</a></li>
              <li><a href="/contact" class="footer-nav-link">お問い合わせ</a></li>
            </ul>
            
            <!-- Privacy Policy Link (subtle) -->
            <div class="footer-policy-link mt-6">
              <a href="/policy" class="footer-nav-link footer-nav-link-small">プライバシーポリシー</a>
            </div>
          </nav>
          
          <!-- Right: Copyright -->
          <div class="footer-right">
            <p class="footer-copyright">
              &copy; 2024 MATCH by Uni
            </p>
          </div>
          
        </div>
        
      </div>
    </footer>
  `
}