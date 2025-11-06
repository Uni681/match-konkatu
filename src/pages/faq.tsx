import { html } from 'hono/html'
import Layout from '../components/Layout'
import { SNSSection } from '../components/SNSSection'
import { ContactSection } from '../components/ContactSection'
import { AccessMapSection } from '../components/AccessMapSection'

export function FAQPage() {
  return Layout({
    title: 'よくあるご質問 | MATCH（マッチ）本気の婚活',
    description: '結婚相談所MATCHに寄せられるよくあるご質問にお答えします。料金、サービス内容、活動方法など、お気軽にお問い合わせください。',
    children: html`
      <!-- FAQ Hero Section -->
      <section class="faq-hero-section relative py-32 overflow-hidden flex items-center min-h-[60vh]">
        <!-- 和柄背景 -->
        <div class="absolute inset-0 z-0">
          <div class="faq-hero-background"></div>
        </div>
        
        <!-- 金箔散らし装飾 -->
        <div class="absolute inset-0 z-10">
          <div class="gold-foil-decoration"></div>
        </div>

        <!-- 左上の花柄装飾 -->
        <div class="faq-hero-decoration"></div>
        
        <div class="relative z-20 container mx-auto px-6 text-center max-w-4xl">
          <!-- 英字見出し（背景扱い） -->
          <div class="faq-hero-english mb-4">
            FAQ
          </div>
          
          <!-- メイン見出し -->
          <h1 class="faq-hero-title mb-8">
            よくあるご質問
          </h1>
          
          <!-- 説明文 -->
          <div class="faq-hero-description">
            <p>お客様から寄せられるよくあるご質問にお答えします。</p>
            <p>その他のご質問は、お気軽にお問い合わせください。</p>
          </div>
        </div>
      </section>

      <!-- FAQ List Section -->
      <section class="faq-list-section py-20 bg-white">
        <div class="container mx-auto px-6 max-w-5xl">
          
          <!-- FAQ Item 1 -->
          <div class="faq-list-item">
            <div class="faq-number">Q1</div>
            <div class="faq-content">
              <h3 class="faq-question-title">はじめるのは難しいですか？全くわからないのですが…</h3>
              <div class="faq-answer-box">
                <p>
                  <span class="faq-answer-label">A.</span>
                  初めての方でも安心してご活動いただけるよう、カウンセラーが丁寧にサポートいたします。無料カウンセリングで、婚活の進め方から詳しくご説明させていただきますので、ご安心ください。
                </p>
              </div>
            </div>
          </div>

          <!-- FAQ Item 2 -->
          <div class="faq-list-item">
            <div class="faq-number">Q2</div>
            <div class="faq-content">
              <h3 class="faq-question-title">どういったサービスがあるのですか？どう利用するのですか？</h3>
              <div class="faq-answer-box">
                <p>
                  <span class="faq-answer-label">A.</span>
                  IBJ（日本結婚相談所連盟）の会員検索システムをご利用いただけます。全国8万人以上の会員様の中から、ご希望の条件でお相手を探すことができます。カウンセラーからのご紹介も積極的に行っております。お見合いのセッティングから交際中のアドバイスまで、きめ細やかにサポートいたします。
                </p>
              </div>
            </div>
          </div>

          <!-- FAQ Item 3 -->
          <div class="faq-list-item">
            <div class="faq-number">Q3</div>
            <div class="faq-content">
              <h3 class="faq-question-title">プロフィールは誰でも見れるんですか？うまく作れるかな？</h3>
              <div class="faq-answer-box">
                <p>
                  <span class="faq-answer-label">A.</span>
                  プロフィールはIBJ会員様のみが閲覧できます。一般には公開されませんので、プライバシーは守られます。また、魅力的なプロフィール作成のため、写真撮影のアドバイスから自己紹介文の添削まで、カウンセラーが全面的にサポートいたしますのでご安心ください。
                </p>
              </div>
            </div>
          </div>

          <!-- FAQ Item 4 -->
          <div class="faq-list-item">
            <div class="faq-number">Q4</div>
            <div class="faq-content">
              <h3 class="faq-question-title">全国どこの人と会えるんですか？</h3>
              <div class="faq-answer-box">
                <p>
                  <span class="faq-answer-label">A.</span>
                  IBJのネットワークにより、全国どこの会員様ともお見合いが可能です。ただし、お見合い場所は通常、お互いの中間地点や主要都市で設定いたします。遠方の方との交際をご希望の場合は、将来的な転居の可能性なども含めて、カウンセラーにご相談ください。
                </p>
              </div>
            </div>
          </div>

          <!-- FAQ Item 5 -->
          <div class="faq-list-item">
            <div class="faq-number">Q5</div>
            <div class="faq-content">
              <h3 class="faq-question-title">20代ですが、入会できますか？</h3>
              <div class="faq-answer-box">
                <p>
                  <span class="faq-answer-label">A.</span>
                  はい、20代の方も大歓迎です。結婚を真剣に考えている方であれば、年齢を問わずご入会いただけます。むしろ20代の方は同世代の会員様からも人気が高く、多くのお見合いチャンスがございます。早めのご活動開始をお勧めいたします。
                </p>
              </div>
            </div>
          </div>

          <!-- FAQ Item 6 -->
          <div class="faq-list-item">
            <div class="faq-number">Q6</div>
            <div class="faq-content">
              <h3 class="faq-question-title">短期間契約もできますか？退会したいときはすぐできますか？</h3>
              <div class="faq-answer-box">
                <p>
                  <span class="faq-answer-label">A.</span>
                  当相談所では、最短3ヶ月からのご契約が可能です。また、退会をご希望の場合は、お申し出いただければすぐに手続きを進めさせていただきます。ご成婚以外での退会の場合、タイミングによっては一部返金対応も可能です。詳しくはカウンセラーにご相談ください。
                </p>
              </div>
            </div>
          </div>

          <!-- FAQ Item 7 -->
          <div class="faq-list-item">
            <div class="faq-number">Q7</div>
            <div class="faq-content">
              <h3 class="faq-question-title">費用についてもっと詳しく知りたいです</h3>
              <div class="faq-answer-box">
                <p>
                  <span class="faq-answer-label">A.</span>
                  料金プランは、ライト・スタンダード・プレミアムの3つをご用意しております。入会金、月会費、成婚料が主な費用で、お見合い料は全プラン無料です。詳細は<a href="/service" class="faq-link">サービス・料金ページ</a>をご覧いただくか、無料カウンセリングでご説明させていただきます。
                </p>
              </div>
            </div>
          </div>

          <!-- FAQ Item 8 -->
          <div class="faq-list-item">
            <div class="faq-number">Q8</div>
            <div class="faq-content">
              <h3 class="faq-question-title">仕事が忙しくて活動できるか不安です</h3>
              <div class="faq-answer-box">
                <p>
                  <span class="faq-answer-label">A.</span>
                  お仕事がお忙しい方こそ、結婚相談所の利用価値があります。お見合いの日程調整はカウンセラーが代行いたしますし、システムでのお相手検索は24時間いつでも可能です。月に数回のお見合いでも十分に活動できますので、ご自身のペースで無理なく婚活を進めていただけます。
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- まだ疑問がある方へ -->
      <section class="faq-cta-section py-20 section-bg-japanese">
        <div class="container mx-auto px-6 max-w-4xl text-center">
          <div class="faq-cta-icon">
            <i class="fas fa-question-circle"></i>
          </div>
          <h2 class="faq-cta-title">まだ疑問がある方へ</h2>
          <p class="faq-cta-text">
            その他のご質問やご不安な点がございましたら、<br>
            お気軽に無料カウンセリングでお聞きください。<br>
            経験豊富なカウンセラーが丁寧にお答えいたします。
          </p>
          <div class="faq-cta-buttons">
            <a href="#contact" class="faq-cta-button primary">
              <i class="fas fa-calendar-check mr-2"></i>
              無料カウンセリング予約
            </a>
            <a href="tel:045-534-8922" class="faq-cta-button secondary">
              <i class="fas fa-phone mr-2"></i>
              お電話でお問い合わせ
            </a>
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
