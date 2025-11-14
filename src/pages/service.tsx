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
      <section class="service-hero-section relative overflow-hidden flex items-center justify-center min-h-[60vh]">
        <!-- 和柄背景 -->
        <div class="absolute inset-0 z-0">
          <div class="service-hero-background"></div>
        </div>
        
        <!-- 金箔散らし装飾 -->
        <div class="absolute inset-0 z-10">
          <div class="gold-foil-decoration"></div>
        </div>
        
        <div class="relative z-20 container mx-auto px-6 text-center max-w-4xl">
          <div class="py-16">
            <!-- 英字見出し（背景扱い） -->
            <div class="service-hero-english mb-6">
              SERVICE & PRICING
            </div>
            
            <!-- メイン見出し -->
            <h1 class="service-hero-title">
              サービス・料金
            </h1>
          </div>
        </div>
      </section>

      <!-- プラン比較セクション -->
      <section class="plans-section">
        <div class="plans-container">
          <!-- セクションタイトル -->
          <div class="plans-header">
            <div class="plans-english">PLANS</div>
            <h2 class="plans-title">料金プラン</h2>
            <p class="plans-subtitle">あなたのペースで進められる婚活サポートを届けます</p>
          </div>

          <!-- メインプラン（3カード横並び） -->
          <div class="plans-main-grid">
            
            <!-- MATCHライト -->
            <div class="new-plan-card">
              <div class="new-plan-tag">単発</div>
              <h3 class="new-plan-name">MATCHライト</h3>
              <div class="new-plan-price">
                <span class="new-price-amount">3,000</span>
                <span class="new-price-unit">円</span>
                <span class="new-price-period">/ 1回</span>
              </div>
              <div class="new-plan-description">
                <p>「このまま婚活を始めていいのかな？」が気になる人へ。</p>
                <p class="new-plan-content-title">内容</p>
                <p class="new-plan-content">
                  ・価値観整理ワーク（20〜30問）で思考を可視化<br>
                  ・方向性診断（30分）で"いま向かうべき方向"を明確に<br>
                  ・恋愛のクセ、つまずきやすい点を言語化
                </p>
                <p>婚活の前に、"自分のコンパス"をつくるための1回完結セッション。</p>
              </div>
            </div>

            <!-- MATCHスタンダード -->
            <div class="new-plan-card new-plan-featured">
              <div class="new-plan-badge">おすすめ</div>
              <div class="new-plan-tag">定番</div>
              <h3 class="new-plan-name">MATCHスタンダード</h3>
              <div class="new-plan-price">
                <span class="new-price-amount">9,800</span>
                <span class="new-price-unit">円</span>
                <span class="new-price-period">/ 月額</span>
              </div>
              <div class="new-plan-description">
                <p>無理のないペースで婚活を続けたい人へ。<br>焦らず、淡々と、それでも確実に進むための基本セット。</p>
                <p class="new-plan-content-title">内容</p>
                <p class="new-plan-content">
                  ・月2回の面談（45分 ×2）<br>
                  ・毎月の紹介<br>
                  ・ライトなLINE添削<br>
                  ・プロフィールの微調整<br>
                  ・AI恋愛行動分析（準備中）
                </p>
                <p>感情と行動が整うことで、ゆるやかでも前に進み続けられる。</p>
              </div>
            </div>

            <!-- MATCHプレミアム -->
            <div class="new-plan-card">
              <div class="new-plan-tag">集中サポート</div>
              <h3 class="new-plan-name">MATCHプレミアム</h3>
              <div class="new-plan-price">
                <span class="new-price-amount">14,800</span>
                <span class="new-price-unit">円</span>
                <span class="new-price-period">/ 月額</span>
              </div>
              <div class="new-plan-description">
                <p>「ひとりだと止まってしまう」「短期間で動かしたい」<br>そんな時の伴走に近い距離感のサポート。</p>
                <p class="new-plan-content-title">内容</p>
                <p class="new-plan-content">
                  ・週1面談（45分 ×4）<br>
                  ・お見合い同行<br>
                  ・デート前の練習・想定QA<br>
                  ・プロフィールのフル添削<br>
                  ・重めの相談にも丁寧に対応<br>
                  ・紹介数アップ
                </p>
                <p>立ち止まりやすいポイントを、その場で解消していくスタイル。<br>メンタル面・実践面のどちらも丁寧に支える、最も手厚いプラン。</p>
              </div>
            </div>

          </div>

          <!-- サブプラン（成婚料＋焦らない婚活ラボ） -->
          <div class="plans-sub-grid">
            
            <!-- 登録料・成婚料 -->
            <div class="new-plan-success-fee">
              <div class="new-success-fee-prices">
                <div class="new-success-fee-row">
                  <h3 class="new-success-fee-title">登録料</h3>
                  <div class="new-success-fee-price">
                    <span class="new-price-amount">10,000</span>
                    <span class="new-price-unit">円</span>
                  </div>
                </div>
                <div class="new-success-fee-row">
                  <h3 class="new-success-fee-title">成婚料</h3>
                  <div class="new-success-fee-price">
                    <span class="new-price-amount">50,000</span>
                    <span class="new-price-unit">円</span>
                  </div>
                </div>
              </div>
              <p class="new-success-fee-text">
                <span class="new-success-fee-badge">全プラン共通</span><br>
                登録料は初回のみのお支払いです。<br>
                成婚料は成功報酬として、成婚退会時にのみいただきます。<br>
                追加費用はかかりません。
              </p>
            </div>

            <!-- 焦らない婚活ラボ（準備中） -->
            <div class="new-plan-comingsoon-wide">
              <div class="new-plan-comingsoon-badge">Coming Soon</div>
              <div class="new-plan-comingsoon-left">
                <h3 class="new-plan-comingsoon-title">焦らない婚活ラボ</h3>
                <div class="new-plan-comingsoon-price">
                  月額 <span class="new-price-amount-small">500</span><span class="new-price-unit-small">円</span>
                </div>
              </div>
              <div class="new-plan-comingsoon-right">
                <p class="new-plan-comingsoon-text">
                  婚活の前に、まず"心の土台"を整えたい人へ。恋愛ラジオ・匿名相談・心の整理ワークを通して、自分の感情や思考を優しく整える「休憩所」のような場所。
                </p>
                <p class="new-plan-note">※AIマチ子と同時リリース予定　※現在準備中です</p>
              </div>
            </div>

          </div>
        </div>
      </section>
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
