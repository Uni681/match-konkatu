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
      <section class="about-hero-section relative overflow-hidden flex items-center justify-center min-h-[60vh]">
        <!-- 和柄背景 -->
        <div class="absolute inset-0 z-0">
          <div class="about-hero-background"></div>
        </div>
        
        <!-- 金箔散らし装飾 -->
        <div class="absolute inset-0 z-10">
          <div class="gold-foil-decoration"></div>
        </div>
        
        <div class="relative z-20 container mx-auto px-6 text-center max-w-4xl flex items-center justify-center h-full">
          <div>
            <!-- 英字見出し（背景扱い） -->
            <div class="about-hero-english mb-6">
              ABOUT
            </div>
            
            <!-- メイン見出し -->
            <h1 class="about-hero-title">
              当結婚相談所について
            </h1>
          </div>
        </div>
      </section>

      <!-- カウンセラーメッセージセクション -->
      <section class="counselor-message-section py-20 bg-white">
        <div class="container mx-auto px-6 max-w-6xl">
          <!-- セクションタイトル -->
          <div class="text-center mb-16">
            <div class="section-title-english mb-2">MESSAGE</div>
            <h2 class="section-title-japanese">メッセージ</h2>
          </div>

          <!-- 代表カウンセラー -->
          <div class="counselor-card mb-20">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start lg:items-center">
              <!-- 写真 -->
              <div class="counselor-image-container">
                <img 
                  src="https://page.gensparksite.com/v1/base64_upload/ba6c5e05ec2ac303ac972fd5a42b82ff" 
                  alt="代表カウンセラー 山口允樹" 
                  class="counselor-image"
                  width="400"
                  height="400"
                  loading="lazy"
                >
              </div>
              
              <!-- テキスト -->
              <div class="counselor-text">
                <div class="counselor-position primary">代表カウンセラー</div>
                <h3 class="counselor-name primary">山口 允樹</h3>
                <div class="counselor-description">
                  <p>
                    結婚相談所業界での経験を活かし、お一人おひとりの想いを大切にサポートいたします。
                    安心して活動いただけるよう誠実に寄り添い、ご成婚というゴールへ導きます。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- サブカウンセラー -->
          <div class="counselor-card">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start lg:items-center">
              <!-- 写真 -->
              <div class="counselor-image-container lg:order-2">
                <img 
                  src="https://page.gensparksite.com/v1/base64_upload/6124091029817e3b047fa28872b60dcd" 
                  alt="カウンセラー 飯島菜々" 
                  class="counselor-image"
                  width="400"
                  height="400"
                  loading="lazy"
                >
              </div>
              
              <!-- テキスト -->
              <div class="counselor-text lg:order-1">
                <div class="counselor-position secondary">カウンセラー</div>
                <h3 class="counselor-name secondary">飯島 菜々</h3>
                <div class="counselor-description">
                  <p>
                    同じ女性としての目線を活かし、会員様に寄り添ったアドバイスをいたします。
                    新しい出会いを楽しみながら、ご成婚に向けて一歩ずつ進んでいただけるよう全力で支援いたします。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 想い・理念セクション -->
      <section class="philosophy-section py-20">
        <div class="container mx-auto px-6 max-w-6xl">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <!-- テキスト -->
            <div class="philosophy-text">
              <h2 class="philosophy-title mb-8">
                大切にしている想い
              </h2>
              
              <div class="philosophy-content">
                <p class="mb-6">
                  MATCHは「本気の出会いを最高のマッチングへ」を理念に掲げています。
                </p>
                
                <p class="mb-6">
                  お一人おひとりの価値観を尊重し、きめ細やかなサポートを通じて、理想のパートナーとのご縁を結びます。
                </p>
                
                <p>
                  安心して活動いただけるよう、経験豊富なカウンセラーが真心を込めて伴走いたします。
                </p>
              </div>
            </div>
            
            <!-- 写真 -->
            <div class="philosophy-image-container">
              <img 
                src="https://page.gensparksite.com/v1/base64_upload/971eb324e80dbcd26a94751513768cbb" 
                alt="和装婚の新郎新婦が神社にいる写真" 
                class="philosophy-image"
                width="600"
                height="400"
                loading="lazy"
              >
            </div>
          </div>
        </div>
      </section>

      <!-- 事業所概要セクション -->
      <section class="business-info-section py-20">
        <div class="container mx-auto px-6 max-w-4xl">
          <!-- セクションタイトル -->
          <div class="text-center mb-12">
            <div class="section-title-english mb-2">INFORMATION</div>
            <h2 class="section-title-japanese">事業所概要</h2>
          </div>

          <!-- 概要カード -->
          <div class="business-info-card">
            <div class="business-info-grid">
              
              <div class="info-item">
                <div class="info-label">
                  <i class="fas fa-building info-icon"></i>
                  事業者
                </div>
                <div class="info-value">
                  MATCH
                </div>
              </div>

              <div class="info-item">
                <div class="info-label">
                  <i class="fas fa-user info-icon"></i>
                  代表者
                </div>
                <div class="info-value">
                  山口 允樹
                </div>
              </div>

              <div class="info-item">
                <div class="info-label">
                  📍 所在地
                </div>
                <div class="info-value">
                  〒221-0834<br>
                  神奈川県横浜市神奈川区台町8-14 412
                </div>
              </div>

              <div class="info-item">
                <div class="info-label">
                  📞 TEL
                </div>
                <div class="info-value">
                  045-534-8922
                </div>
              </div>

              <div class="info-item">
                <div class="info-label">
                  🕰️ 営業時間
                </div>
                <div class="info-value">
                  11:00-22:00<br>
                  <span class="text-sm text-gray-600">※お問い合わせフォームや公式LINEでのお問い合わせは24時間受け付けております</span>
                </div>
              </div>

              <div class="info-item">
                <div class="info-label">
                  📅 定休日
                </div>
                <div class="info-value">
                  毎週木曜日<br>
                  <span class="text-sm text-gray-600">※但し、ご相談により対応する場合があります。</span>
                </div>
              </div>

              <div class="info-item">
                <div class="info-label">
                  💼 事業内容
                </div>
                <div class="info-value">
                  結婚相談所事業
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