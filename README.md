# MATCH（マッチ）本気の婚活 - 結婚相談所Webサイト

横浜の結婚相談所「MATCH（マッチ）本気の婚活」の公式Webサイトです。Cloudflare Pages + Hono framework で構築された、高性能でSEO最適化されたWebアプリケーションです。

## 🌟 プロジェクト概要

- **サイト名**: MATCH（マッチ）本気の婚活
- **目的**: 結婚相談所の集客・ブランディング・顧客管理
- **技術スタック**: Hono + TypeScript + Cloudflare Pages/Workers
- **デプロイ**: Cloudflare Pages
- **CMS**: Decap CMS (Git-based)

## 🚀 ライブサイト

- **本番サイト**: [https://match-konkatu.pages.dev](https://match-konkatu.pages.dev)
- **管理画面**: [https://match-konkatu.pages.dev/admin](https://match-konkatu.pages.dev/admin)
- **GitHub Pages**: [https://uni681.github.io/match-konkatu](https://uni681.github.io/match-konkatu)

## ✨ 主な機能

### 🎯 コア機能
- **レスポンシブ対応**: 全デバイスで最適な表示
- **高速パフォーマンス**: Core Web Vitals最適化済み
- **SEO完全対応**: 構造化データ、サイトマップ、OGP
- **アクセシビリティ**: WCAG 2.1 AA準拠
- **セキュリティ**: CSRF、Honeypot、スパム対策

### 📝 コンテンツ管理
- **Decap CMS**: Git-based ヘッドレスCMS
- **ブログ機能**: カテゴリー別記事管理
- **固定ページ**: サービス、料金、会社情報
- **お客様の声**: 成婚事例・評価管理

### 📞 顧客接点
- **お問い合わせフォーム**: D1データベース保存
- **メール通知**: 自動返信・管理者通知
- **電話・LINE連携**: 複数チャンネル対応

### 🛡️ セキュリティ・品質
- **スパム対策**: Honeypot + トークン認証
- **パフォーマンス**: LCP < 1.8s、CLS < 0.1
- **リダイレクト管理**: 旧URL対応
- **エラーハンドリング**: 包括的なエラー処理

## 🏗️ 技術仕様

### フロントエンド
```
- Framework: Hono + TypeScript
- Styling: TailwindCSS + Custom CSS
- Icons: Font Awesome 6
- Fonts: Google Fonts (Noto Sans JP, Shippori Mincho)
```

### バックエンド
```
- Runtime: Cloudflare Workers
- Database: Cloudflare D1 (SQLite)
- Email: Resend API (環境変数で設定)
- Authentication: CSRF Token + Honeypot
```

### 開発・デプロイ
```
- Build Tool: Vite
- Package Manager: npm
- CI/CD: GitHub + Cloudflare Pages
- Process Manager: PM2 (開発時)
```

## 📋 初回セットアップ

### 1. リポジトリのクローン
```bash
git clone https://github.com/Uni681/match-konkatu.git
cd match-konkatu
```

### 2. 依存関係のインストール
```bash
npm install
```

### 3. 環境変数の設定
`.dev.vars` ファイルを作成し、必要な環境変数を設定：

```bash
# .dev.vars (本番環境では wrangler secret put で設定)

# フォーム関連
FORM_SECRET=your-form-secret-key-here
NOTIFICATION_EMAIL=admin@match-konkatu.com

# メール送信 (Resend API)
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USER=resend
SMTP_PASS=your-resend-api-key

# その他
NODE_ENV=development
```

### 4. データベースの初期化
```bash
# D1データベースの作成 (Cloudflare API Token必要)
npx wrangler d1 create match-konkatu-production

# ローカル開発用マイグレーション
npx wrangler d1 migrations apply match-konkatu-production --local
```

### 5. プロジェクトのビルド
```bash
npm run build
```

## 🚀 開発環境の起動

### 基本的な開発フロー
```bash
# 1. ビルド (初回または大幅な変更時)
npm run build

# 2. 開発サーバー起動 (PM2使用)
pm2 start ecosystem.config.cjs

# 3. 動作確認
curl http://localhost:3000

# 4. ログ確認
pm2 logs --nostream
```

### よく使うコマンド
```bash
# 開発サーバー再起動
npm run clean-port && npm run build && pm2 restart webapp

# データベースリセット
npm run db:reset

# ローカルデータベース確認
npm run db:console:local

# スタイル変更の反映
# CSSファイル編集後は自動的に反映されます
```

## 📝 コンテンツ編集フロー

### 1. 管理画面でのコンテンツ編集
1. **アクセス**: [http://localhost:3000/admin](http://localhost:3000/admin)
2. **ログイン**: GitHub認証またはローカル認証
3. **編集**: 直感的なエディターでコンテンツ編集
4. **プレビュー**: 編集内容をリアルタイムプレビュー
5. **保存**: Draft → Review → Publish の承認フロー

### 2. ブログ記事の作成
1. 「ブログ記事」→「新規作成」
2. 必須項目の入力：
   - タイトル・SEOタイトル
   - メタディスクリプション
   - カテゴリー・タグ
   - アイキャッチ画像
   - 本文（Markdown形式）
3. 「公開状態」で公開設定
4. 「保存」→「公開」

### 3. 固定ページの編集
1. 「ページ管理」から対象ページを選択
2. SEO設定・コンテンツを編集
3. プレビューで確認
4. 公開

### 4. サイト設定の変更
1. 「サイト設定」→「基本設定」
2. 連絡先・営業時間・SNS情報を編集
3. SEO・フォーム設定を調整

## 🖼️ 画像最適化ルール

### アップロード時の最適化
```
推奨サイズ・フォーマット：
- ヒーロー画像: 1920x1080px, WebP/JPEG, 200KB以下
- ブログアイキャッチ: 1200x630px, WebP/JPEG, 150KB以下
- プロフィール画像: 400x400px, WebP/JPEG, 100KB以下
- アイコン: 64x64px, SVG/PNG, 10KB以下
```

### 画像の配置
```
public/img/
├── hero-bg.jpg          # ヒーローセクション背景
├── og-default.jpg       # デフォルトOGP画像
├── blog/               # ブログ用画像
├── testimonials/       # お客様の声
└── services/          # サービス説明画像
```

### 自動最適化
- **遅延読み込み**: Intersection Observer使用
- **WebP対応**: モダンブラウザで自動切り替え
- **レスポンシブ画像**: デバイスに最適なサイズ配信

## 🌐 デプロイメント

### Cloudflare Pages への本番デプロイ
```bash
# 1. Cloudflare API Token設定
export CLOUDFLARE_API_TOKEN=your-api-token

# 2. プロジェクト作成
npx wrangler pages project create match-konkatu \
  --production-branch main \
  --compatibility-date 2024-09-04

# 3. D1データベース作成・マイグレーション
npx wrangler d1 create match-konkatu-production
npx wrangler d1 migrations apply match-konkatu-production

# 4. 環境変数設定
npx wrangler pages secret put FORM_SECRET --project-name match-konkatu
npx wrangler pages secret put NOTIFICATION_EMAIL --project-name match-konkatu
npx wrangler pages secret put SMTP_PASS --project-name match-konkatu

# 5. デプロイ実行
npm run build
npx wrangler pages deploy dist --project-name match-konkatu
```

### 継続的デプロイ (推奨)
1. **GitHub連携**: Cloudflare Pagesでリポジトリを連携
2. **自動ビルド**: mainブランチへのpush時に自動デプロイ
3. **プレビュー**: プルリクエスト時の自動プレビュー生成

## 🔧 カスタマイズ

### デザイン・スタイリング
```css
/* public/static/styles.css */
:root {
  --color-primary: #8b5a3c;    /* メインブランドカラー */
  --color-secondary: #d4a574;   /* セカンダリカラー */
  /* 他のデザイントークン */
}
```

### 機能追加
```typescript
// src/index.tsx に新しいルートを追加
app.get('/new-page', (c) => {
  return c.html(Layout({
    title: 'New Page',
    description: 'Description',
    children: '<h1>New Content</h1>'
  }))
})
```

### CMS設定の拡張
```yaml
# public/admin/config.yml
collections:
  - name: "new-collection"
    label: "新しいコンテンツタイプ"
    folder: "content/new"
    # 設定を追加
```

## 🐛 トラブルシューティング

### よくある問題と解決法

#### 1. 開発サーバーが起動しない
```bash
# ポートが使用中の場合
npm run clean-port
pm2 delete all

# 依存関係の問題
rm -rf node_modules package-lock.json
npm install
```

#### 2. ビルドエラー
```bash
# TypeScriptエラーの確認
npm run build 2>&1 | grep error

# 依存関係の確認
npm audit fix
```

#### 3. データベース接続エラー
```bash
# ローカルD1の状態確認
ls -la .wrangler/state/v3/d1/

# マイグレーションの再実行
npm run db:reset
```

#### 4. CMS管理画面にアクセスできない
```bash
# 管理画面ファイルの確認
ls -la public/admin/

# 認証設定の確認
cat public/admin/config.yml | grep -A5 backend
```

## 📊 パフォーマンス監視

### Core Web Vitals目標値
- **LCP (Largest Contentful Paint)**: < 1.8秒
- **FID (First Input Delay)**: < 100ミリ秒  
- **CLS (Cumulative Layout Shift)**: < 0.1

### 監視方法
```javascript
// 開発環境でのWebVitals計測
// ブラウザのコンソールで確認可能
console.log('WebVitals measurement active')
```

### 最適化チェックリスト
- [ ] 画像の最適化・遅延読み込み
- [ ] CSSの最小化・クリティカルパス
- [ ] JavaScriptの最小化・分割
- [ ] フォントの最適化
- [ ] CDNの活用

## 🤝 コントリビューション

### 開発に参加する場合
1. **Issues**: バグ報告・機能要望
2. **Pull Requests**: コード改善・新機能
3. **コードレビュー**: 品質維持
4. **ドキュメント**: README・コメント改善

### 開発ルール
- **コミット**: [Conventional Commits](https://conventionalcommits.org/)形式
- **ブランチ**: `feature/xxx`, `fix/xxx`, `docs/xxx`
- **テスト**: 主要機能の動作確認必須
- **リファクタリング**: 機能改善時は既存機能を破壊しない

## 📞 サポート・お問い合わせ

### 技術サポート
- **GitHub Issues**: バグ報告・機能要望
- **Discord**: リアルタイム質問・相談
- **Email**: tech-support@match-konkatu.com

### ビジネス関連
- **電話**: 045-XXX-XXXX
- **Email**: info@match-konkatu.com  
- **LINE**: [@match-konkatu](https://line.me/R/ti/p/@match-konkatu)

## 📄 ライセンス

```
Copyright (c) 2024 MATCH（マッチ）本気の婚活
All rights reserved.

This project is proprietary software.
Unauthorized copying, modification, distribution, or use is strictly prohibited.
```

---

**最終更新**: 2024年12月01日  
**バージョン**: 1.0.0  
**メンテナー**: MATCH開発チーム

このドキュメントは、プロジェクトの機能追加・変更に伴い定期的に更新されます。