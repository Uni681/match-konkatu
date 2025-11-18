import { html } from 'hono/html'
import Layout from '../components/Layout'
import { SNSSection } from '../components/SNSSection'
import { ContactSection } from '../components/ContactSection'
import { AccessMapSection } from '../components/AccessMapSection'
import { Footer } from '../components/Footer'

export function AboutPage() {
  return Layout({
    title: '当結婚相談所について | MATCH（マッチ）本気の婚活',
    description: 'MATCH（マッチ）本気の婚活の理念、カウンセラー紹介、事業所概要をご紹介します。親子で運営する温かい結婚相談所として、皆様の人生の新たなスタートをサポートいたします。',
    children: html`
      <!-- About Hero Section -->
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
              ABOUT
            </div>
            
            <!-- メイン見出し -->
            <h1 class="flow-hero-title">
              私たちについて
            </h1>
          </div>
        </div>
      </section>

      <!-- カウンセラーメッセージセクション -->
      <section class="counselor-message-section py-24">
        <div class="container mx-auto px-6 max-w-6xl">
          <!-- セクションタイトル -->
          <div class="text-center mb-20 fade-slide-up">
            <div class="message-section-english">MESSAGE</div>
            <h2 class="message-section-title">メッセージ</h2>
          </div>

          <!-- 代表カウンセラー -->
          <div class="counselor-card-wrapper counselor-card-first fade-slide-up">
            <div class="counselor-card-inner">
              <!-- 写真 -->
              <div class="counselor-photo-box">
                <div class="counselor-photo-frame">
                  <img 
                    src="https://page.gensparksite.com/v1/base64_upload/ba6c5e05ec2ac303ac972fd5a42b82ff" 
                    alt="代表カウンセラー 山口允樹" 
                    class="counselor-photo counselor-photo-yamaguchi"
                    width="400"
                    height="400"
                    loading="lazy"
                  >
                </div>
              </div>
              
              <!-- テキスト -->
              <div class="counselor-text-box">
                <div class="counselor-role primary">代表カウンセラー</div>
                <h3 class="counselor-name primary">山口 允樹<span class="name-reading">やまぐち まさき</span></h3>
                <div class="counselor-message">
                  <p>
                    これまで結婚相談所の現場で多くのご縁に携わる中で、結婚は「条件」だけでなく、その人らしい生き方と深く結びついていると感じてきました。MATCHでは、お一人おひとりの背景やペースを尊重しながら、無理のない形で一歩ずつ前に進めるようサポートいたします。
                  </p>
                  <p>
                    親世代としての視点も活かし、ご本人だけでなくご家族にとっても納得感のあるご縁を一緒に考えてまいります。安心して本音を話していただける場所として、みなさまの新しい一歩をお迎えできれば幸いです。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- カウンセラー -->
          <div class="counselor-card-wrapper fade-slide-up">
            <div class="counselor-card-inner">
              <!-- 写真 -->
              <div class="counselor-photo-box">
                <div class="counselor-photo-frame">
                  <img 
                    src="https://page.gensparksite.com/v1/base64_upload/6124091029817e3b047fa28872b60dcd" 
                    alt="カウンセラー 飯島菜々" 
                    class="counselor-photo counselor-photo-iijima"
                    width="400"
                    height="400"
                    loading="lazy"
                  >
                </div>
              </div>
              
              <!-- テキスト -->
              <div class="counselor-text-box">
                <div class="counselor-role secondary">婚活カウンセラー</div>
                <h3 class="counselor-name secondary">飯島 菜々<span class="name-reading">いいじま なな</span></h3>
                <div class="counselor-message">
                  <p>
                    カウンセラーとしてだけでなく、一人の女性としての経験も活かしながら、会員さまお一人おひとりの気持ちに寄り添ったサポートを心がけています。「こうしなきゃ」ではなく、「どうしたいか」を一緒に言葉にしていきながら、ご自身に合ったペースで婚活を進めていただけるよう伴走いたします。
                  </p>
                  <p>
                    ときには悩み、ときには笑い合いながら、前向きな一歩を一緒に見つけていけたらうれしいです。どうぞお気軽にご相談ください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 想い・理念セクション -->
      <section class="philosophy-section">
        <div class="philosophy-container">
          <div class="philosophy-inner">
            <!-- テキストエリア -->
            <div class="philosophy-text-area fade-slide-up">
              <h2 class="philosophy-title">
                大切にしている想い
              </h2>
              
              <div class="philosophy-message">
                <p>
                  MATCHは「本気の出会いを、無理のないかたちで実現する婚活」を大切にしています。お一人おひとりが持つ価値観やご事情を丁寧に伺い、その方のペースに寄り添いながら、理想のご縁へと進めるようサポートいたします。
                </p>
                
                <p>
                  親子で運営する相談所だからこそ、異なる世代の視点を活かし、ご本人とご家族どちらにとっても納得できる婚活を一緒に考えてまいります。出会いの数よりも質と納得感を重視し、お一人おひとりに合った最適なご縁を大切にしています。
                </p>
                
                <p>
                  安心して前に進める場所として、あなたの大切な人生の一歩をそっと支えられれば幸いです。
                </p>
              </div>
            </div>
            
            <!-- 写真エリア -->
            <div class="philosophy-photo-area fade-slide-up">
              <div class="philosophy-photo-frame">
                <img 
                  src="https://page.gensparksite.com/v1/base64_upload/971eb324e80dbcd26a94751513768cbb" 
                  alt="和装婚の新郎新婦が神社にいる写真" 
                  class="philosophy-photo"
                  width="600"
                  height="400"
                  loading="lazy"
                >
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 事業所概要セクション -->
      <section class="business-info-section">
        <div class="business-info-container">
          <!-- セクションタイトル -->
          <div class="business-info-header">
            <div class="business-info-english">INFORMATION</div>
            <h2 class="business-info-title">事業所概要</h2>
          </div>

          <!-- 概要カード -->
          <div class="business-info-card">
            <div class="business-info-list">
              
              <div class="business-info-row">
                <div class="business-info-label">
                  <i class="fas fa-building"></i>
                  <span>事業者名</span>
                </div>
                <div class="business-info-content">
                  MATCH
                </div>
              </div>

              <div class="business-info-row">
                <div class="business-info-label">
                  <i class="fas fa-user"></i>
                  <span>代表者名</span>
                </div>
                <div class="business-info-content">
                  山口 允樹
                </div>
              </div>

              <div class="business-info-row">
                <div class="business-info-label">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>所在地</span>
                </div>
                <div class="business-info-content">
                  〒221-0834<br>
                  神奈川県横浜市神奈川区台町8-14 412
                </div>
              </div>

              <div class="business-info-row">
                <div class="business-info-label">
                  <i class="fas fa-phone-alt"></i>
                  <span>TEL</span>
                </div>
                <div class="business-info-content">
                  045-534-8922
                </div>
              </div>

              <div class="business-info-row">
                <div class="business-info-label">
                  <i class="fas fa-clock"></i>
                  <span>営業時間</span>
                </div>
                <div class="business-info-content">
                  11:00〜22:00<br>
                  <span class="business-info-note">※お問い合わせフォームおよびLINEでのお問い合わせは24時間受け付けております。</span>
                </div>
              </div>

              <div class="business-info-row">
                <div class="business-info-label">
                  <i class="fas fa-calendar-alt"></i>
                  <span>定休日</span>
                </div>
                <div class="business-info-content">
                  毎週木曜日<br>
                  <span class="business-info-note">※状況により、ご相談対応を行う場合がございます。</span>
                </div>
              </div>

              <div class="business-info-row">
                <div class="business-info-label">
                  <i class="fas fa-briefcase"></i>
                  <span>事業内容</span>
                </div>
                <div class="business-info-content">
                  結婚相談所の運営（IBJ正規加盟店）
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <!-- SNSセクション（ホームと同じ） -->
      ${SNSSection()}

      <!-- Contact Usセクション（ホームと同じ） -->
      ${ContactSection()}

      <!-- アクセスマップセクション（ホームと同じ） -->
      ${AccessMapSection()}


    `
  })
}