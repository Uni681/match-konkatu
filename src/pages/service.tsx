import { html } from 'hono/html'
import Layout from '../components/Layout'
import { SNSSection } from '../components/SNSSection'
import { ContactSection } from '../components/ContactSection'
import { AccessMapSection } from '../components/AccessMapSection'

export function ServicePage() {
  return Layout({
    title: 'サービス・料金 | MATCH（マッチ）本気の婚活',
    description: '結婚相談所MATCHのサービス内容と料金プランをご紹介します。お客様のニーズに合わせた3つのプランをご用意しております。',
    children: html`
      <!-- Service Hero Section -->
      <section class="service-hero-section relative py-32 overflow-hidden flex items-center min-h-[60vh]">
        <!-- 和柄背景 -->
        <div class="absolute inset-0 z-0">
          <div class="service-hero-background"></div>
        </div>
        
        <!-- 金箔散らし装飾 -->
        <div class="absolute inset-0 z-10">
          <div class="gold-foil-decoration"></div>
        </div>
        
        <div class="relative z-20 container mx-auto px-6 text-center max-w-4xl">
          <!-- 英字見出し（背景扱い） -->
          <div class="service-hero-english mb-4">
            SERVICE & PRICING
          </div>
          
          <!-- メイン見出し -->
          <h1 class="service-hero-title mb-8">
            サービス・料金
          </h1>
          
          <!-- 説明文 -->
          <div class="service-hero-description">
            <p>お一人おひとりの婚活スタイルに合わせた、3つのプランをご用意しております。</p>
            <p>IBJ正規加盟店として、充実したサポート体制で皆様のご成婚を全力で応援いたします。</p>
          </div>
        </div>
      </section>

      <!-- プラン比較セクション -->
      <section class="plans-section py-20 bg-white">
        <div class="container mx-auto px-6 max-w-7xl">
          <!-- セクションタイトル -->
          <div class="text-center mb-16">
            <div class="section-title-english mb-2">PLANS</div>
            <h2 class="section-title-japanese">料金プラン</h2>
            <p class="section-subtitle mt-4">ご自身に合ったプランをお選びください</p>
          </div>

          <!-- 3プランカード -->
          <div class="plans-grid">
            
            <!-- ライトプラン -->
            <div class="plan-card">
              <div class="plan-header">
                <div class="plan-icon">✨</div>
                <h3 class="plan-name">ライトプラン</h3>
                <p class="plan-subtitle">気軽に始める婚活</p>
              </div>
              
              <div class="plan-price">
                <div class="price-label">入会金</div>
                <div class="price-amount">33,000<span class="price-unit">円</span></div>
                <div class="price-note">（税込）</div>
              </div>

              <div class="plan-features">
                <div class="feature-item">
                  <i class="fas fa-check feature-icon"></i>
                  <span>月会費：11,000円</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-check feature-icon"></i>
                  <span>お見合い料：無料</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-check feature-icon"></i>
                  <span>成婚料：220,000円</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-check feature-icon"></i>
                  <span>申込可能数：月20名</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-check feature-icon"></i>
                  <span>基本的なサポート</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-check feature-icon"></i>
                  <span>IBJ会員検索システム</span>
                </div>
              </div>

              <div class="plan-description">
                <p>まずは気軽に婚活を始めたい方におすすめのプランです。基本的なサポートを受けながら、マイペースに活動できます。</p>
              </div>

              <div class="plan-cta">
                <a href="/contact" class="plan-button">
                  詳細を見る
                  <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>

            <!-- スタンダードプラン -->
            <div class="plan-card plan-card-featured">
              <div class="plan-badge">おすすめ</div>
              
              <div class="plan-header">
                <div class="plan-icon">💎</div>
                <h3 class="plan-name">スタンダードプラン</h3>
                <p class="plan-subtitle">充実のサポート</p>
              </div>
              
              <div class="plan-price">
                <div class="price-label">入会金</div>
                <div class="price-amount">55,000<span class="price-unit">円</span></div>
                <div class="price-note">（税込）</div>
              </div>

              <div class="plan-features">
                <div class="feature-item">
                  <i class="fas fa-check feature-icon"></i>
                  <span>月会費：16,500円</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-check feature-icon"></i>
                  <span>お見合い料：無料</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-check feature-icon"></i>
                  <span>成婚料：220,000円</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-check feature-icon"></i>
                  <span>申込可能数：月40名</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-check feature-icon"></i>
                  <span>手厚いカウンセリング</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-check feature-icon"></i>
                  <span>プロフィール写真撮影サポート</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-check feature-icon"></i>
                  <span>お見合い同行サービス（月2回）</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-check feature-icon"></i>
                  <span>定期的なフィードバック</span>
                </div>
              </div>

              <div class="plan-description">
                <p>最も人気のプランです。充実したサポート体制で、効率的に婚活を進めたい方に最適です。カウンセラーが二人三脚で伴走します。</p>
              </div>

              <div class="plan-cta">
                <a href="#contact" class="plan-button plan-button-featured">
                  詳細を見る
                  <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>

            <!-- プレミアムプラン -->
            <div class="plan-card">
              <div class="plan-header">
                <div class="plan-icon">👑</div>
                <h3 class="plan-name">プレミアムプラン</h3>
                <p class="plan-subtitle">最高峰のサポート</p>
              </div>
              
              <div class="plan-price">
                <div class="price-label">入会金</div>
                <div class="price-amount">110,000<span class="price-unit">円</span></div>
                <div class="price-note">（税込）</div>
              </div>

              <div class="plan-features">
                <div class="feature-item">
                  <i class="fas fa-check feature-icon"></i>
                  <span>月会費：22,000円</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-check feature-icon"></i>
                  <span>お見合い料：無料</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-check feature-icon"></i>
                  <span>成婚料：220,000円</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-check feature-icon"></i>
                  <span>申込可能数：月60名</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-check feature-icon"></i>
                  <span>専属カウンセラー制</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-check feature-icon"></i>
                  <span>プロカメラマン撮影付き</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-check feature-icon"></i>
                  <span>お見合い無制限同行</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-check feature-icon"></i>
                  <span>24時間LINE相談対応</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-check feature-icon"></i>
                  <span>ファッション・マナー指導</span>
                </div>
              </div>

              <div class="plan-description">
                <p>最高峰のサポートで、短期集中的にご成婚を目指す方におすすめ。専属カウンセラーがマンツーマンで徹底サポートいたします。</p>
              </div>

              <div class="plan-cta">
                <a href="/contact" class="plan-button">
                  詳細を見る
                  <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- サービス内容詳細セクション -->
      <section class="service-details-section py-20 section-bg-japanese">
        <div class="container mx-auto px-6 max-w-6xl">
          <!-- セクションタイトル -->
          <div class="text-center mb-16">
            <div class="section-title-english mb-2">SERVICES</div>
            <h2 class="section-title-japanese">充実のサポート内容</h2>
          </div>

          <div class="service-details-grid">
            
            <!-- サポート1 -->
            <div class="service-detail-card">
              <div class="service-detail-icon">
                <i class="fas fa-user-friends"></i>
              </div>
              <h3 class="service-detail-title">専任カウンセラー</h3>
              <p class="service-detail-description">
                経験豊富なカウンセラーが、お一人おひとりに寄り添い、理想のお相手探しをサポートします。定期的な面談でお悩みを解決いたします。
              </p>
            </div>

            <!-- サポート2 -->
            <div class="service-detail-card">
              <div class="service-detail-icon">
                <i class="fas fa-search"></i>
              </div>
              <h3 class="service-detail-title">IBJ会員検索</h3>
              <p class="service-detail-description">
                日本最大級のIBJ（日本結婚相談所連盟）の会員検索システムで、全国8万人以上の中から理想のお相手を探せます。
              </p>
            </div>

            <!-- サポート3 -->
            <div class="service-detail-card">
              <div class="service-detail-icon">
                <i class="fas fa-camera"></i>
              </div>
              <h3 class="service-detail-title">プロフィール作成</h3>
              <p class="service-detail-description">
                魅力的なプロフィール写真の撮影アドバイスから、文章の添削まで。第一印象を最大限に高めるお手伝いをいたします。
              </p>
            </div>

            <!-- サポート4 -->
            <div class="service-detail-card">
              <div class="service-detail-icon">
                <i class="fas fa-handshake"></i>
              </div>
              <h3 class="service-detail-title">お見合いセッティング</h3>
              <p class="service-detail-description">
                お見合いの日程調整から場所の選定まで、すべてお任せください。当日の同行サービスもご用意しております。
              </p>
            </div>

            <!-- サポート5 -->
            <div class="service-detail-card">
              <div class="service-detail-icon">
                <i class="fas fa-comments"></i>
              </div>
              <h3 class="service-detail-title">交際アドバイス</h3>
              <p class="service-detail-description">
                お見合い後の交際中も、デートプランや会話のコツなど、きめ細やかなアドバイスで真剣交際へと導きます。
              </p>
            </div>

            <!-- サポート6 -->
            <div class="service-detail-card">
              <div class="service-detail-icon">
                <i class="fas fa-heart"></i>
              </div>
              <h3 class="service-detail-title">成婚までの伴走</h3>
              <p class="service-detail-description">
                プロポーズのタイミングや両家の顔合わせまで、成婚退会後もしっかりとサポート。安心して新生活を始められます。
              </p>
            </div>

          </div>
        </div>
      </section>

      <!-- よくある質問セクション -->
      <section class="faq-section py-20 bg-white">
        <div class="container mx-auto px-6 max-w-4xl">
          <!-- セクションタイトル -->
          <div class="text-center mb-16">
            <div class="section-title-english mb-2">FAQ</div>
            <h2 class="section-title-japanese">よくあるご質問</h2>
          </div>

          <div class="faq-list">
            
            <div class="faq-item">
              <div class="faq-question">
                <i class="fas fa-question-circle faq-icon"></i>
                <h3>プラン変更は可能ですか？</h3>
              </div>
              <div class="faq-answer">
                <p>はい、可能です。活動状況に応じて上位プランへの変更が可能です。詳細はカウンセラーにご相談ください。</p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-question">
                <i class="fas fa-question-circle faq-icon"></i>
                <h3>入会時に必要なものは何ですか？</h3>
              </div>
              <div class="faq-answer">
                <p>身分証明書、独身証明書、収入証明書（男性のみ）、学歴証明書などが必要です。詳しくは無料カウンセリング時にご説明いたします。</p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-question">
                <i class="fas fa-question-circle faq-icon"></i>
                <h3>お見合い料は本当に無料ですか？</h3>
              </div>
              <div class="faq-answer">
                <p>はい、当相談所では全プランでお見合い料は無料です。回数制限もございませんので、安心して積極的に活動いただけます。</p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-question">
                <i class="fas fa-question-circle faq-icon"></i>
                <h3>成婚の定義を教えてください</h3>
              </div>
              <div class="faq-answer">
                <p>当相談所では、結婚の意思を持ってお二人が真剣交際を進め、退会を決意された時点を成婚としております。</p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-question">
                <i class="fas fa-question-circle faq-icon"></i>
                <h3>活動期間の目安はどのくらいですか？</h3>
              </div>
              <div class="faq-answer">
                <p>平均的には6ヶ月〜12ヶ月程度で成婚される方が多いです。ただし個人差がありますので、焦らずマイペースで活動することをお勧めしています。</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- SNSセクション -->
      ${SNSSection()}

      <!-- お問い合わせセクション -->
      ${ContactSection()}

      <!-- アクセスマップセクション -->
      ${AccessMapSection()}

    `
  })
}
