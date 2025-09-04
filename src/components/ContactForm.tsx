import { html } from 'hono/html';

export const ContactForm = () => {
  return html`
<section class="section bg-white">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Form Header -->
      <div class="text-center mb-12">
        <h2 class="font-mincho text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          お問い合わせ
        </h2>
        <p class="text-lg text-gray-600 leading-relaxed">
          婚活に関するご相談やサービスについてのご質問など、<br class="hidden sm:block">
          お気軽にお問い合わせください。
        </p>
      </div>
      
      <!-- Contact Methods -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <!-- Phone -->
        <div class="text-center p-6 bg-gray-50 rounded-xl">
          <div class="w-16 h-16 mx-auto bg-primary-500 rounded-full flex items-center justify-center mb-4">
            <i class="fas fa-phone text-2xl text-white"></i>
          </div>
          <h3 class="font-semibold text-lg text-gray-900 mb-2">お電話</h3>
          <p class="text-gray-600 mb-4">045-XXX-XXXX</p>
          <div class="text-sm text-gray-500">
            <div>平日: 10:00〜19:00</div>
            <div>土曜: 10:00〜17:00</div>
            <div>日祝: 定休日</div>
          </div>
        </div>
        
        <!-- Email -->
        <div class="text-center p-6 bg-gray-50 rounded-xl">
          <div class="w-16 h-16 mx-auto bg-primary-500 rounded-full flex items-center justify-center mb-4">
            <i class="fas fa-envelope text-2xl text-white"></i>
          </div>
          <h3 class="font-semibold text-lg text-gray-900 mb-2">メール</h3>
          <p class="text-gray-600 mb-4">info@match-konkatsu.com</p>
          <div class="text-sm text-gray-500">
            24時間受付<br>
            48時間以内にご返信
          </div>
        </div>
        
        <!-- LINE -->
        <div class="text-center p-6 bg-gray-50 rounded-xl">
          <div class="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-4">
            <i class="fab fa-line text-2xl text-white"></i>
          </div>
          <h3 class="font-semibold text-lg text-gray-900 mb-2">LINE</h3>
          <p class="text-gray-600 mb-4">LINE公式アカウント</p>
          <a href="#" class="btn btn-outline btn-sm">
            <i class="fab fa-line mr-2"></i>
            友だち追加
          </a>
        </div>
      </div>
      
      <!-- Contact Form -->
      <div class="bg-gray-50 rounded-2xl p-8 md:p-12">
        <h3 class="font-semibold text-2xl text-gray-900 mb-8 text-center">
          お問い合わせフォーム
        </h3>
        
        <form id="contact-form" class="space-y-6" action="/api/contact" method="POST">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Name -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                お名前 <span class="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="山田太郎"
              >
            </div>
            
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                メールアドレス <span class="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="example@email.com"
              >
            </div>
          </div>
          
          <!-- Phone -->
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
              電話番号
            </label>
            <input 
              type="tel" 
              id="phone" 
              name="phone"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder="090-1234-5678"
            >
          </div>
          
          <!-- Inquiry Type -->
          <div>
            <label for="inquiry_type" class="block text-sm font-medium text-gray-700 mb-2">
              お問い合わせ内容
            </label>
            <select 
              id="inquiry_type" 
              name="inquiry_type"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <option value="">選択してください</option>
              <option value="consultation">無料相談希望</option>
              <option value="service">サービスについて</option>
              <option value="price">料金について</option>
              <option value="process">入会手続きについて</option>
              <option value="other">その他</option>
            </select>
          </div>
          
          <!-- Message -->
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
              メッセージ <span class="text-red-500">*</span>
            </label>
            <textarea 
              id="message" 
              name="message" 
              rows="6" 
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-vertical"
              placeholder="ご質問やご相談内容をご記入ください。無料相談をご希望の場合は、希望日時もお書きください。"
            ></textarea>
          </div>
          
          <!-- Privacy Policy -->
          <div>
            <label class="flex items-start">
              <input 
                type="checkbox" 
                id="privacy_agree" 
                name="privacy_agree" 
                required
                class="mt-1 mr-3 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              >
              <span class="text-sm text-gray-700">
                <a href="/policy" target="_blank" class="text-primary-600 hover:underline">プライバシーポリシー</a>に同意します <span class="text-red-500">*</span>
              </span>
            </label>
          </div>
          
          <!-- Submit Button -->
          <div class="text-center">
            <button 
              type="submit" 
              class="btn btn-primary btn-lg w-full md:w-auto px-12"
              id="submit-button"
            >
              <i class="fas fa-paper-plane mr-2"></i>
              送信する
            </button>
          </div>
        </form>
      </div>
      
      <!-- Map Section -->
      <div class="mt-16">
        <h3 class="font-semibold text-2xl text-gray-900 mb-8 text-center">アクセス</h3>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Map -->
          <div class="bg-gray-200 rounded-xl h-64 lg:h-80 flex items-center justify-center">
            <div class="text-center text-gray-500">
              <i class="fas fa-map-marker-alt text-4xl mb-4"></i>
              <p>Googleマップ</p>
              <p class="text-sm">（実装時に埋め込み）</p>
            </div>
          </div>
          
          <!-- Address Info -->
          <div class="space-y-6">
            <div>
              <h4 class="font-semibold text-lg text-gray-900 mb-3">
                <i class="fas fa-building text-primary-500 mr-2"></i>
                MATCH（マッチ）本気の婚活
              </h4>
              <div class="space-y-2 text-gray-700">
                <div class="flex items-start">
                  <i class="fas fa-map-marker-alt w-5 mr-2 mt-1 text-primary-500"></i>
                  <div>
                    <div>〒221-0000</div>
                    <div>神奈川県横浜市神奈川区○○町1-2-3</div>
                    <div>○○ビル4F</div>
                  </div>
                </div>
                
                <div class="flex items-center">
                  <i class="fas fa-train w-5 mr-2 text-primary-500"></i>
                  <div>
                    <div>JR東神奈川駅 徒歩5分</div>
                    <div>京急神奈川駅 徒歩3分</div>
                  </div>
                </div>
                
                <div class="flex items-center">
                  <i class="fas fa-phone w-5 mr-2 text-primary-500"></i>
                  <span>045-XXX-XXXX</span>
                </div>
                
                <div class="flex items-start">
                  <i class="fas fa-clock w-5 mr-2 mt-1 text-primary-500"></i>
                  <div>
                    <div>平日: 10:00〜19:00</div>
                    <div>土曜: 10:00〜17:00</div>
                    <div>日祝: 定休日</div>
                  </div>
                </div>
                
                <div class="flex items-center">
                  <i class="fas fa-car w-5 mr-2 text-primary-500"></i>
                  <span>近隣にコインパーキングあり</span>
                </div>
              </div>
            </div>
            
            <!-- CTA -->
            <div class="bg-primary-50 p-6 rounded-xl">
              <h5 class="font-semibold text-gray-900 mb-2">お気軽にお越しください</h5>
              <p class="text-sm text-gray-600 mb-4">
                初回相談は無料です。まずはお話を聞かせてください。
              </p>
              <a href="tel:045-XXX-XXXX" class="btn btn-primary btn-sm">
                <i class="fas fa-phone mr-2"></i>
                今すぐ電話
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Form Success Modal (Hidden by default) -->
<div id="success-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden">
  <div class="flex items-center justify-center min-h-screen p-4">
    <div class="bg-white rounded-xl p-8 max-w-md w-full">
      <div class="text-center">
        <i class="fas fa-check-circle text-5xl text-green-500 mb-4"></i>
        <h3 class="font-semibold text-xl text-gray-900 mb-4">送信完了</h3>
        <p class="text-gray-600 mb-6">
          お問い合わせありがとうございます。<br>
          48時間以内にご返信いたします。
        </p>
        <button onclick="closeSuccessModal()" class="btn btn-primary">
          閉じる
        </button>
      </div>
    </div>
  </div>
</div>

<script>
document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const submitButton = document.getElementById('submit-button');
  const originalText = submitButton.innerHTML;
  
  // Loading state
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>送信中...';
  submitButton.disabled = true;
  
  try {
    const formData = new FormData(e.target);
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (response.ok) {
      // Success
      document.getElementById('success-modal').classList.remove('hidden');
      e.target.reset();
    } else {
      // Error
      alert(result.error || 'エラーが発生しました。もう一度お試しください。');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    alert('エラーが発生しました。もう一度お試しください。');
  } finally {
    // Reset button
    submitButton.innerHTML = originalText;
    submitButton.disabled = false;
  }
});

function closeSuccessModal() {
  document.getElementById('success-modal').classList.add('hidden');
}

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSuccessModal();
  }
});
</script>
`;
};