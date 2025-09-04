import type { FormValidationResult, ContactFormData, RateLimitInfo } from '../types'

/**
 * CSRF トークン生成
 */
export function generateCSRFToken(): string {
  // Cloudflare Workers環境でのランダム文字列生成
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * 簡易トークン検証
 */
export function validateFormToken(
  token: string | undefined,
  secret: string,
  maxAge: number = 3600000 // 1時間
): boolean {
  if (!token || !secret) return false
  
  try {
    // 簡易的なトークン形式: timestamp.hash
    const [timestamp, hash] = token.split('.')
    if (!timestamp || !hash) return false
    
    const tokenTime = parseInt(timestamp, 10)
    const currentTime = Date.now()
    
    // 有効期限チェック
    if (currentTime - tokenTime > maxAge) return false
    
    // ハッシュ検証
    const expectedHash = hashStringSync(`${timestamp}${secret}`)
    return hash === expectedHash
  } catch {
    return false
  }
}

/**
 * フォームトークン生成
 */
export function generateFormToken(secret: string): string {
  const timestamp = Date.now().toString()
  const hash = hashStringSync(`${timestamp}${secret}`)
  return `${timestamp}.${hash}`
}

/**
 * 文字列ハッシュ化（簡易版）
 */
async function hashString(input: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * 同期版ハッシュ（簡易）
 */
function hashStringSync(input: string): string {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // 32bit整数に変換
  }
  return Math.abs(hash).toString(16)
}

/**
 * スパム検出アルゴリズム
 */
export function detectSpam(formData: ContactFormData, clientInfo: {
  ip?: string
  userAgent?: string
  referer?: string
}): FormValidationResult {
  let spamScore = 0
  const errors: string[] = []
  
  // 1. ハニーポット検査
  if (formData.website && formData.website.trim() !== '') {
    spamScore += 100
    console.log('Spam detected: Honeypot field filled')
  }
  
  // 2. 内容の品質チェック
  const message = formData.message.toLowerCase()
  const name = formData.name.toLowerCase()
  
  // 短すぎるメッセージ
  if (formData.message.length < 10) {
    spamScore += 20
  }
  
  // 長すぎるメッセージ（異常に長い）
  if (formData.message.length > 5000) {
    spamScore += 30
  }
  
  // 同じ文字の連続
  if (/(.)\1{4,}/.test(message)) {
    spamScore += 25
  }
  
  // スパムキーワード検出
  const spamKeywords = [
    'viagra', 'casino', 'lottery', 'bitcoin', 'crypto',
    'investment', 'loan', 'credit', 'forex', 'trading',
    'clickhere', 'buynow', 'urgent', 'congratulations',
    'winner', 'million', 'inheritance', 'urgent',
    '稼げる', '副業', '投資', '仮想通貨', 'ビットコイン',
    '宝くじ', '当選', '無料', 'クリック', '即金'
  ]
  
  const spamCount = spamKeywords.filter(keyword => 
    message.includes(keyword) || name.includes(keyword)
  ).length
  
  if (spamCount > 0) {
    spamScore += spamCount * 15
  }
  
  // 3. URLの検出
  const urlPattern = /https?:\/\/[^\s]+/gi
  const urlMatches = formData.message.match(urlPattern)
  if (urlMatches && urlMatches.length > 2) {
    spamScore += 30
  }
  
  // 4. メールアドレスの妥当性
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(formData.email)) {
    spamScore += 25
  }
  
  // 5. 名前の妥当性チェック
  if (formData.name.length < 2) {
    spamScore += 20
  }
  
  // 数字だけの名前
  if (/^\d+$/.test(formData.name)) {
    spamScore += 40
  }
  
  // 6. User Agentチェック
  if (!clientInfo.userAgent || clientInfo.userAgent.length < 10) {
    spamScore += 15
  }
  
  // 7. リファラーチェック（直接アクセスは減点なし、外部サイトは要チェック）
  if (clientInfo.referer) {
    try {
      const refererUrl = new URL(clientInfo.referer)
      const currentHost = new URL(globalThis.location?.href || 'https://example.com').hostname
      
      // 外部サイトからのリファラー
      if (!refererUrl.hostname.includes(currentHost)) {
        spamScore += 10
      }
    } catch {
      // 無効なリファラー
      spamScore += 5
    }
  }
  
  // 8. 同じIPアドレスからの連続送信チェック（実装時にDB確認）
  // これは実際のAPIエンドポイントで実装
  
  // 判定
  const isValid = spamScore < 50
  
  if (!isValid) {
    errors.push('送信内容に問題があります。もう一度確認してください。')
  }
  
  return {
    isValid,
    errors,
    spamScore
  }
}

/**
 * レート制限チェック
 */
export function checkRateLimit(
  clientIP: string,
  submissionTimes: number[],
  maxRequests: number = 5,
  timeWindow: number = 300000 // 5分
): RateLimitInfo {
  const currentTime = Date.now()
  const windowStart = currentTime - timeWindow
  
  // 時間ウィンドウ内のリクエストをフィルター
  const recentRequests = submissionTimes.filter(time => time > windowStart)
  
  const count = recentRequests.length
  const isLimited = count >= maxRequests
  const resetTime = recentRequests.length > 0 ? 
    Math.min(...recentRequests) + timeWindow : currentTime
  
  return {
    count,
    resetTime,
    isLimited
  }
}

/**
 * IPアドレス正規化
 */
export function normalizeIP(ip: string): string {
  // IPv6の場合は短縮形に統一
  try {
    if (ip.includes(':')) {
      // IPv6の簡略化（実装簡易版）
      return ip.toLowerCase().replace(/^::ffff:/, '')
    }
    return ip
  } catch {
    return ip
  }
}

/**
 * フォームデータサニタイズ
 */
export function sanitizeFormData(data: ContactFormData): ContactFormData {
  return {
    name: sanitizeString(data.name, 100),
    email: sanitizeString(data.email, 255).toLowerCase(),
    phone: data.phone ? sanitizeString(data.phone, 20) : undefined,
    inquiry_type: data.inquiry_type ? sanitizeString(data.inquiry_type, 50) : undefined,
    message: sanitizeString(data.message, 5000),
    privacy_agree: data.privacy_agree,
    website: data.website ? sanitizeString(data.website, 255) : undefined,
    csrf_token: data.csrf_token ? sanitizeString(data.csrf_token, 255) : undefined
  }
}

/**
 * 文字列サニタイズ
 */
function sanitizeString(input: string, maxLength: number): string {
  return input
    .trim()
    .substring(0, maxLength)
    .replace(/[<>\"'&]/g, '') // 基本的なHTMLエスケープ文字を除去
}

/**
 * 管理者通知の判定
 */
export function shouldNotifyAdmin(spamScore: number): boolean {
  return spamScore < 75 // スパムスコアが高すぎない場合のみ通知
}