import { html } from 'hono/html'

export function Footer() {
  return html`
    <footer class="bg-gray-900 text-white py-12">
      <div class="container mx-auto px-6 max-w-6xl">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <!-- 会社情報 -->
          <div class="col-span-1 md:col-span-2">
            <div class="mb-4">
              <img src="/img/logo-hq.png" alt="MATCH（マッチ）本気の婚活" class="h-12 w-auto opacity-90">
            </div>
            <p class="text-gray-400 text-sm leading-relaxed mb-4">
              神奈川県横浜市神奈川区にあるIBJ正規加盟店の結婚相談所です。親子で運営する温かいサポートで、皆様の人生の大切なパートナー探しをお手伝いいたします。
            </p>
            <div class="flex space-x-4">
              <a href="https://www.instagram.com/match_konkatu" class="text-gray-400 hover:text-white transition-colors">
                <i class="fab fa-instagram text-xl"></i>
              </a>
              <a href="https://lin.ee/hxJlbwI" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">
                <i class="fab fa-line text-xl"></i>
              </a>
            </div>
          </div>
          
          <!-- サイトマップ -->
          <div>
            <h4 class="font-semibold text-white mb-4">サイトマップ</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="/" class="text-gray-400 hover:text-white transition-colors">ホーム</a></li>
              <li><a href="/about" class="text-gray-400 hover:text-white transition-colors">当結婚相談所について</a></li>
              <li><a href="/service" class="text-gray-400 hover:text-white transition-colors">サービス・料金</a></li>
              <li><a href="/flow" class="text-gray-400 hover:text-white transition-colors">ご成婚までのながれ</a></li>
              <li><a href="/faq" class="text-gray-400 hover:text-white transition-colors">よくあるご質問</a></li>
              <li><a href="/blog" class="text-gray-400 hover:text-white transition-colors">ブログ</a></li>
              <li><a href="/contact" class="text-gray-400 hover:text-white transition-colors">お問い合わせ</a></li>
            </ul>
          </div>
          
          <!-- お問い合わせ -->
          <div>
            <h4 class="font-semibold text-white mb-4">お問い合わせ</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li class="flex items-center">
                <i class="fas fa-phone mr-2"></i>
                <span>045-534-8922</span>
              </li>
              <li class="flex items-center">
                <i class="fas fa-envelope mr-2"></i>
                <span>info@match-konkatsu.com</span>
              </li>
              <li class="flex items-start">
                <i class="fas fa-map-marker-alt mr-2 mt-0.5"></i>
                <span>〒221-0834<br>神奈川県横浜市神奈川区台町8-14 412</span>
              </li>
              <li class="text-xs mt-2">
                <div>営業時間：11:00-22:00</div>
                <div class="text-gray-500">※お問い合わせフォームや公式LINEでのお問い合わせは24時間受け付けております</div>
              </li>
              <li class="text-xs mt-1">
                <div>定休日：毎週木曜日</div>
                <div class="text-gray-500">※但し、ご相談により対応する場合があります。</div>
              </li>
            </ul>
          </div>
          
        </div>
        
        <!-- フッター下部 -->
        <div class="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div class="text-sm text-gray-400 mb-4 md:mb-0">
            <p>&copy; 2024 MATCH（マッチ）本気の婚活. All rights reserved.</p>
          </div>
          <div class="text-sm">
            <a href="/policy" class="text-gray-400 hover:text-white transition-colors">プライバシーポリシー</a>
          </div>
        </div>
      </div>
    </footer>
  `
}