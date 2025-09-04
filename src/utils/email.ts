import type { EmailTemplate, ContactFormData } from '../types'

/**
 * SMTP経由でメール送信
 */
export async function sendEmail(
  to: string,
  template: EmailTemplate,
  smtpConfig: {
    host: string;
    port: number;
    user: string;
    pass: string;
  }
): Promise<boolean> {
  try {
    // Cloudflare Workers環境では外部SMTPサービス（SendGrid、Resendなど）のAPI使用を推奨
    // ここではResend APIを使用した例を示します
    
    // 実際の実装では環境変数でSMTPサービスを選択
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${smtpConfig.pass}`, // Resend API Key
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: smtpConfig.user,
        to: [to],
        subject: template.subject,
        html: template.html,
        text: template.text,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Email send failed:', error);
    return false;
  }
}

/**
 * 管理者への通知メールテンプレート
 */
export function createAdminNotificationTemplate(formData: ContactFormData): EmailTemplate {
  const subject = `【MATCH】新しいお問い合わせ - ${formData.name}様`
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: 'Hiragino Sans', 'Meiryo', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #8B4513; color: white; padding: 15px; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #8B4513; }
            .value { background-color: white; padding: 8px; border-radius: 3px; margin-top: 5px; }
            .footer { background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>新しいお問い合わせが届きました</h2>
            </div>
            <div class="content">
                <div class="field">
                    <div class="label">お名前:</div>
                    <div class="value">${escapeHtml(formData.name)}</div>
                </div>
                <div class="field">
                    <div class="label">メールアドレス:</div>
                    <div class="value">${escapeHtml(formData.email)}</div>
                </div>
                ${formData.phone ? `
                <div class="field">
                    <div class="label">電話番号:</div>
                    <div class="value">${escapeHtml(formData.phone)}</div>
                </div>
                ` : ''}
                ${formData.inquiry_type ? `
                <div class="field">
                    <div class="label">お問い合わせ種別:</div>
                    <div class="value">${escapeHtml(formData.inquiry_type)}</div>
                </div>
                ` : ''}
                <div class="field">
                    <div class="label">メッセージ:</div>
                    <div class="value">${escapeHtml(formData.message).replace(/\n/g, '<br>')}</div>
                </div>
            </div>
            <div class="footer">
                <p>このメールは自動送信されています。</p>
                <p>MATCH（マッチ）本気の婚活 - 管理システム</p>
            </div>
        </div>
    </body>
    </html>
  `
  
  const text = `
新しいお問い合わせが届きました

お名前: ${formData.name}
メールアドレス: ${formData.email}
${formData.phone ? `電話番号: ${formData.phone}\n` : ''}
${formData.inquiry_type ? `お問い合わせ種別: ${formData.inquiry_type}\n` : ''}

メッセージ:
${formData.message}

---
MATCH（マッチ）本気の婚活
  `
  
  return { subject, html, text }
}

/**
 * 自動返信メールテンプレート
 */
export function createAutoReplyTemplate(formData: ContactFormData): EmailTemplate {
  const subject = `【MATCH】お問い合わせありがとうございます - ${formData.name}様`
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: 'Hiragino Sans', 'Meiryo', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #8B4513; color: white; padding: 15px; border-radius: 5px 5px 0 0; text-align: center; }
            .content { background-color: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
            .greeting { font-size: 18px; margin-bottom: 20px; }
            .message { margin-bottom: 20px; }
            .highlight { background-color: #fff3cd; padding: 15px; border-left: 4px solid #8B4513; margin: 20px 0; }
            .footer { background-color: #f5f5f5; padding: 20px; text-align: center; }
            .contact-info { margin-top: 15px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>MATCH（マッチ）本気の婚活</h1>
            </div>
            <div class="content">
                <div class="greeting">
                    ${escapeHtml(formData.name)} 様
                </div>
                <div class="message">
                    この度は、MATCH（マッチ）本気の婚活にお問い合わせいただき、誠にありがとうございます。
                </div>
                <div class="highlight">
                    <strong>【重要】48時間以内にご返信いたします</strong><br>
                    お急ぎの場合は、お電話でのお問い合わせも承っております。
                </div>
                <div class="message">
                    <p>お送りいただいた内容を確認次第、担当者よりご連絡させていただきます。</p>
                    <p>もしご不明な点がございましたら、お気軽にお問い合わせください。</p>
                    <p>あなたの理想のパートナー探しを、私たちが全力でサポートいたします。</p>
                </div>
            </div>
            <div class="footer">
                <div class="contact-info">
                    <strong>MATCH（マッチ）本気の婚活</strong><br>
                    TEL: 03-1234-5678<br>
                    営業時間: 平日 10:00-19:00 / 土日祝 10:00-17:00<br>
                    定休日: 火曜日<br>
                    Email: info@match-konkatu.com
                </div>
                <p style="margin-top: 15px; font-size: 12px; color: #666;">
                    このメールは自動送信されています。心当たりがない場合は、お手数ですが削除してください。
                </p>
            </div>
        </div>
    </body>
    </html>
  `
  
  const text = `
${formData.name} 様

この度は、MATCH（マッチ）本気の婚活にお問い合わせいただき、誠にありがとうございます。

【重要】48時間以内にご返信いたします
お急ぎの場合は、お電話でのお問い合わせも承っております。

お送りいただいた内容を確認次第、担当者よりご連絡させていただきます。
もしご不明な点がございましたら、お気軽にお問い合わせください。

あなたの理想のパートナー探しを、私たちが全力でサポートいたします。

---
MATCH（マッチ）本気の婚活
TEL: 03-1234-5678
営業時間: 平日 10:00-19:00 / 土日祝 10:00-17:00
定休日: 火曜日
Email: info@match-konkatu.com

このメールは自動送信されています。
  `
  
  return { subject, html, text }
}

/**
 * HTMLエスケープ関数
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

/**
 * メール送信設定の検証
 */
export function validateEmailConfig(env: any): boolean {
  return !!(env.NOTIFICATION_EMAIL && env.SMTP_USER && env.SMTP_PASS)
}