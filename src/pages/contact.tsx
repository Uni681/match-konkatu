import { html } from 'hono/html'
import Layout from '../components/Layout'
import { ContactForm } from '../components/ContactForm'
import { SNSSection } from '../components/SNSSection'
import { ContactSection } from '../components/ContactSection'
import { AccessMapSection } from '../components/AccessMapSection'

export function ContactPage() {
  return Layout({
    title: 'お問い合わせ | MATCH（マッチ）本気の婚活',
    description: '婚活に関するご相談、サービス内容のご質問、お申し込み前の不安など、どんなことでもお気軽にお問い合わせください。',
    children: html`
      <!-- Contact Hero Section -->
      <section class="contact-hero-section relative overflow-hidden flex items-center justify-center min-h-[60vh]">
        <!-- 和柄背景 -->
        <div class="absolute inset-0 z-0">
          <div class="contact-hero-background"></div>
        </div>
        
        <!-- 金箔散らし装飾 -->
        <div class="absolute inset-0 z-10">
          <div class="gold-foil-decoration"></div>
        </div>
        
        <div class="relative z-20 container mx-auto px-6 text-center max-w-4xl">
          <div class="py-16">
            <!-- 英字見出し（背景扱い） -->
            <div class="contact-hero-english mb-6">
              CONTACT US
            </div>
            
            <!-- メイン見出し -->
            <h1 class="contact-hero-title">
              お問い合わせ
            </h1>
          </div>
        </div>
      </section>

      <!-- Contact Form Section -->
      ${ContactForm()}

      <!-- SNSセクション -->
      ${SNSSection()}

      <!-- お問い合わせセクション -->
      ${ContactSection()}

      <!-- アクセスマップセクション -->
      ${AccessMapSection()}
    `
  })
}
