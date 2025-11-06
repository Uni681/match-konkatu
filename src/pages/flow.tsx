import { html } from 'hono/html'
import Layout from '../components/Layout'
import { SNSSection } from '../components/SNSSection'
import { ContactSection } from '../components/ContactSection'
import { AccessMapSection } from '../components/AccessMapSection'

export function FlowPage() {
  return Layout({
    title: 'ご成婚までの流れ | MATCH（マッチ）本気の婚活',
    description: '結婚相談所MATCHのご入会からご成婚までの流れをご紹介します。無料カウンセリングから成婚退会まで、6つのステップで分かりやすく解説いたします。',
    children: html`
      <!-- Flow Hero Section -->
      <section class="flow-hero-section relative overflow-hidden flex items-center justify-center min-h-[60vh]">
        <!-- 和柄背景 -->
        <div class="absolute inset-0 z-0">
          <div class="flow-hero-background"></div>
        </div>
        
        <!-- 金箔散らし装飾 -->
        <div class="absolute inset-0 z-10">
          <div class="gold-foil-decoration"></div>
        </div>
        
        <div class="relative z-20 container mx-auto px-6 text-center max-w-4xl">
          <div class="py-16">
            <!-- 英字見出し（背景扱い） -->
            <div class="flow-hero-english mb-6">
              FLOW TO MARRIAGE
            </div>
            
            <!-- メイン見出し -->
            <h1 class="flow-hero-title">
              ご成婚までの流れ
            </h1>
          </div>
        </div>
      </section>

      <!-- Flow Steps Section -->
      <section class="flow-steps-section py-20 bg-white">
        <div class="container mx-auto px-6 max-w-6xl">
          
          <!-- Step 1: 無料カウンセリング -->
          <div class="flow-step-item flow-step-left">
            <div class="flow-step-number">STEP 01</div>
            <div class="flow-step-content-wrapper">
              <div class="flow-step-image">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop" 
                  alt="無料カウンセリング"
                  loading="lazy"
                >
              </div>
              <div class="flow-step-text">
                <h3 class="flow-step-title">無料カウンセリング</h3>
                <div class="flow-step-description">
                  <p>まずは無料カウンセリングにお越しください。婚活のお悩みや理想のお相手像、活動スタイルなどをじっくりお伺いいたします。</p>
                  <ul class="flow-step-list">
                    <li>所要時間：約60分〜90分</li>
                    <li>完全予約制・プライバシー厳守</li>
                    <li>ご入会を強制することはございません</li>
                    <li>料金プランの詳細説明</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Step Divider -->
          <div class="flow-step-divider">
            <div class="flow-divider-line"></div>
            <div class="flow-divider-icon">
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>

          <!-- Step 2: ご入会手続き -->
          <div class="flow-step-item flow-step-right">
            <div class="flow-step-number">STEP 02</div>
            <div class="flow-step-content-wrapper">
              <div class="flow-step-text">
                <h3 class="flow-step-title">ご入会手続き</h3>
                <div class="flow-step-description">
                  <p>ご納得いただけましたら、ご入会手続きを進めさせていただきます。必要書類をご提出いただき、正式に会員登録を行います。</p>
                  <ul class="flow-step-list">
                    <li>必要書類：身分証明書、独身証明書など</li>
                    <li>入会金・初期費用のお支払い</li>
                    <li>会員規約の確認・同意</li>
                    <li>活動開始日の設定</li>
                  </ul>
                </div>
              </div>
              <div class="flow-step-image">
                <img 
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop" 
                  alt="ご入会手続き"
                  loading="lazy"
                >
              </div>
            </div>
          </div>

          <!-- Step Divider -->
          <div class="flow-step-divider">
            <div class="flow-divider-line"></div>
            <div class="flow-divider-icon">
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>

          <!-- Step 3: プロフィール作成 -->
          <div class="flow-step-item flow-step-left">
            <div class="flow-step-number">STEP 03</div>
            <div class="flow-step-content-wrapper">
              <div class="flow-step-image">
                <img 
                  src="https://page.gensparksite.com/v1/base64_upload/2a65b764dc0517349dad6c81a7869049" 
                  alt="プロフィール作成"
                  loading="lazy"
                >
              </div>
              <div class="flow-step-text">
                <h3 class="flow-step-title">プロフィール作成</h3>
                <div class="flow-step-description">
                  <p>魅力的なプロフィールを一緒に作成します。写真撮影のアドバイスから自己紹介文の添削まで、丁寧にサポートいたします。</p>
                  <ul class="flow-step-list">
                    <li>プロフィール写真撮影サポート</li>
                    <li>自己紹介文の作成・添削</li>
                    <li>趣味・価値観の整理</li>
                    <li>理想のお相手像の明確化</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Step Divider -->
          <div class="flow-step-divider">
            <div class="flow-divider-line"></div>
            <div class="flow-divider-icon">
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>

          <!-- Step 4: お相手探し -->
          <div class="flow-step-item flow-step-right">
            <div class="flow-step-number">STEP 04</div>
            <div class="flow-step-content-wrapper">
              <div class="flow-step-text">
                <h3 class="flow-step-title">お相手探し</h3>
                <div class="flow-step-description">
                  <p>IBJの会員検索システムで全国8万人以上の中から理想のお相手を探します。カウンセラーからのご紹介も受けられます。</p>
                  <ul class="flow-step-list">
                    <li>IBJ会員検索システムの利用</li>
                    <li>カウンセラーからのご紹介</li>
                    <li>お申込み・お申受けの管理</li>
                    <li>定期的な活動報告・フィードバック</li>
                  </ul>
                </div>
              </div>
              <div class="flow-step-image">
                <img 
                  src="https://page.gensparksite.com/v1/base64_upload/b3c3658fe728149c538ab168e1d77e63" 
                  alt="お相手探し"
                  loading="lazy"
                >
              </div>
            </div>
          </div>

          <!-- Step Divider -->
          <div class="flow-step-divider">
            <div class="flow-divider-line"></div>
            <div class="flow-divider-icon">
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>

          <!-- Step 5: お見合い・交際 -->
          <div class="flow-step-item flow-step-left">
            <div class="flow-step-number">STEP 05</div>
            <div class="flow-step-content-wrapper">
              <div class="flow-step-image">
                <img 
                  src="https://page.gensparksite.com/v1/base64_upload/a966f9157dd9c30641236bff95b64664" 
                  alt="お見合い・交際"
                  loading="lazy"
                >
              </div>
              <div class="flow-step-text">
                <h3 class="flow-step-title">お見合い・交際</h3>
                <div class="flow-step-description">
                  <p>お見合いが成立したら、実際にお会いいただきます。交際に進んだ後も、カウンセラーがしっかりとサポートいたします。</p>
                  <ul class="flow-step-list">
                    <li>お見合い日程調整・場所選定</li>
                    <li>お見合い同行サービス（プランによる）</li>
                    <li>交際中のデートアドバイス</li>
                    <li>真剣交際へのステップアップ支援</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Step Divider -->
          <div class="flow-step-divider">
            <div class="flow-divider-line"></div>
            <div class="flow-divider-icon">
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>

          <!-- Step 6: ご成婚 -->
          <div class="flow-step-item flow-step-right">
            <div class="flow-step-number">STEP 06</div>
            <div class="flow-step-content-wrapper">
              <div class="flow-step-text">
                <h3 class="flow-step-title">ご成婚</h3>
                <div class="flow-step-description">
                  <p>プロポーズが成功し、お二人が結婚の意思を固められたら、晴れてご成婚です。おめでとうございます！</p>
                  <ul class="flow-step-list">
                    <li>プロポーズのタイミングアドバイス</li>
                    <li>両家顔合わせのサポート</li>
                    <li>ご成婚退会のお手続き</li>
                    <li>成婚後のフォロー・ご相談</li>
                  </ul>
                </div>
              </div>
              <div class="flow-step-image">
                <img 
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop" 
                  alt="ご成婚"
                  loading="lazy"
                >
              </div>
            </div>
          </div>

          <!-- Final Message -->
          <div class="flow-final-message">
            <div class="flow-final-icon">
              <i class="fas fa-heart"></i>
            </div>
            <h3 class="flow-final-title">新しい人生のスタートを応援します</h3>
            <p class="flow-final-text">
              ご成婚後も、必要に応じてサポートいたします。<br>
              お二人の幸せな未来を心よりお祈りしております。
            </p>
          </div>

        </div>
      </section>

      <!-- 活動期間の目安セクション -->
      <section class="flow-duration-section py-20 section-bg-japanese">
        <div class="container mx-auto px-6 max-w-4xl">
          <div class="text-center mb-12">
            <div class="section-title-english mb-2">AVERAGE DURATION</div>
            <h2 class="section-title-japanese">活動期間の目安</h2>
          </div>

          <div class="duration-cards">
            <div class="duration-card">
              <div class="duration-icon">
                <i class="fas fa-clock"></i>
              </div>
              <h3 class="duration-title">平均活動期間</h3>
              <div class="duration-value">6〜12ヶ月</div>
              <p class="duration-description">
                多くの会員様が6ヶ月から12ヶ月程度でご成婚されています。ただし個人差がございますので、焦らず着実に活動することをお勧めしています。
              </p>
            </div>

            <div class="duration-card">
              <div class="duration-icon">
                <i class="fas fa-users"></i>
              </div>
              <h3 class="duration-title">お見合い回数</h3>
              <div class="duration-value">平均10〜15回</div>
              <p class="duration-description">
                ご成婚された方の平均お見合い回数は10〜15回程度です。お見合い料は無料ですので、積極的に活動いただけます。
              </p>
            </div>

            <div class="duration-card">
              <div class="duration-icon">
                <i class="fas fa-calendar-check"></i>
              </div>
              <h3 class="duration-title">交際期間</h3>
              <div class="duration-value">3〜6ヶ月</div>
              <p class="duration-description">
                真剣交際からご成婚までは平均3〜6ヶ月程度です。お二人のペースを大切にしながら、結婚への準備を進めていきます。
              </p>
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
