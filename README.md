# MATCH（マッチ）本気の婚活 - 結婚相談所Webサイト

## プロジェクト概要

親子2代で運営する結婚相談所「MATCH」のWebサイトです。IBJ正規加盟店として、温かく信頼できるサービスを提供する結婚相談所のブランドイメージを表現しています。

- **目標**: 高速・安全・低コスト・ノーサーバー運用
- **技術スタック**: Cloudflare Pages/Workers + Hono + TypeScript + TailwindCSS + Decap CMS
- **特徴**: レスポンシブデザイン、SEO最適化、アクセシビリティ対応

## 🚀 ライブデモ

- **開発サーバー**: https://3000-ipzuvjg8iqqi5f2tdtgbq-6532622b.e2b.dev
- **本番サイト**: 未デプロイ（Cloudflare Pages）
- **CMS管理画面**: /admin（Decap CMS）

## ✨ 主な機能

### 👥 フロントエンド機能

- **ホームページ**: ヒーロー、特徴、料金、お客様の声、FAQ、CTA
- **固定ページ**: サービス詳細、料金プラン、私たちについて
- **ブログ機能**: カテゴリ「婚活ノウハウ」「イベント情報」
- **お問い合わせフォーム**: バリデーション、スパム対策付き
- **SEO対応**: 構造化データ、サイトマップ、OGP、パンくず

### 🎨 デザイン特徴

- **カラーパレット**: 白・ベージュ基調で温かみと信頼感
- **レスポンシブ**: スマホ最優先のモバイルファースト
- **アクセシビリティ**: WCAG基準準拠、キーボード操作対応
- **フォント**: 日本語（Noto Sans JP、Shippori Mincho）+ 英語（Cormorant Garamond）

### 🔧 バックエンド機能

- **CMS**: Decap CMS（Git ベース、画像アップロード対応）
- **データベース**: Cloudflare D1（お問い合わせフォーム）
- **API**: REST API（お問い合わせ送信）
- **セキュリティ**: Honeypot、バリデーション、CSRFトークン

## 📁 プロジェクト構成

```
webapp/
├── src/
│   ├── index.tsx              # メインアプリケーション（Hono）
│   ├── components/            # 再利用可能コンポーネント
│   │   ├── Layout.tsx         # ベースレイアウト
│   │   ├── Hero.tsx           # ヒーローセクション
│   │   ├── Features.tsx       # 特徴セクション
│   │   ├── PriceTable.tsx     # 料金表
│   │   ├── Testimonials.tsx   # お客様の声
│   │   ├── FAQ.tsx            # よくある質問
│   │   ├── CTA.tsx            # 行動促進
│   │   └── ContactForm.tsx    # お問い合わせフォーム
│   ├── utils/
│   │   ├── content.ts         # コンテンツ管理ユーティリティ
│   │   └── build-content.ts   # ビルド時コンテンツ
│   └── types/
│       └── index.ts           # TypeScript型定義
├── public/
│   ├── admin/                 # Decap CMS管理画面
│   ├── img/                   # 画像ファイル
│   └── static/                # CSS・JavaScript
├── content/                   # CMSコンテンツ（Markdown）
│   ├── home.md               # ホームページ設定
│   ├── posts/                # ブログ記事
│   └── settings.yml          # サイト設定
├── migrations/               # データベースマイグレーション
└── ecosystem.config.cjs      # PM2設定（開発用）
```

## 🛠️ 技術スタック

### フロントエンド
- **Hono** v4.9+ - 軽量Webフレームワーク
- **TypeScript** v5.3+ - 型安全性
- **TailwindCSS** - ユーティリティファーストCSS
- **Font Awesome** - アイコン
- **Web標準API** - ファイルアクセス、Intersection Observer

### バックエンド
- **Cloudflare Pages** - ホスティング（ビルド・デプロイ）
- **Cloudflare Workers** - エッジランタイム（API）
- **Cloudflare D1** - SQLiteデータベース（お問い合わせ）
- **Zod** - バリデーション

### CMS・開発
- **Decap CMS** - Gitベースヘッドレス CMS
- **Vite** - ビルドツール
- **Wrangler** - Cloudflare CLI
- **PM2** - プロセス管理（開発用）

## 🚀 セットアップ・開発手順

### 1. 環境準備

```bash
# リポジトリのクローン
git clone <repository-url>
cd webapp

# 依存関係のインストール
npm install

# 環境設定ファイルの作成
cp .env.example .dev.vars  # ローカル開発用
```

### 2. ローカル開発

```bash
# プロジェクトをビルド
npm run build

# 開発サーバー起動（PM2使用）
npm run clean-port           # ポート3000をクリア
pm2 start ecosystem.config.cjs

# サーバー確認
curl http://localhost:3000
```

### 3. CMS設定

- **管理画面**: http://localhost:3000/admin
- **認証**: Git Gateway（本番）または Local Backend（開発）
- **コンテンツ編集**: ブログ記事、固定ページ、サイト設定

### 4. D1データベース（本番用）

```bash
# Cloudflare APIキー設定
export CLOUDFLARE_API_TOKEN="your-api-token"

# D1データベース作成
npx wrangler d1 create match-konkatsu-db

# マイグレーション実行
npm run db:migrate:prod

# wrangler.jsonc に database_id を設定
```

## 📋 本番デプロイ手順

### 1. Cloudflare Pages設定

```bash
# APIキー設定
export CLOUDFLARE_API_TOKEN="your-cloudflare-api-token"

# 認証確認
npx wrangler whoami

# プロジェクト作成
npx wrangler pages project create match-konkatsu \
  --production-branch main \
  --compatibility-date 2024-01-01
```

### 2. D1データベース設定

```bash
# 本番データベース作成
npx wrangler d1 create match-konkatsu-db

# wrangler.jsonc を更新（database_id追加）
# マイグレーション実行
npx wrangler d1 migrations apply match-konkatsu-db
```

### 3. デプロイ実行

```bash
# ビルド＆デプロイ
npm run deploy:prod

# カスタムドメイン設定（オプション）
npx wrangler pages domain add match-konkatsu.com --project-name match-konkatsu

# 環境変数設定（必要に応じて）
npx wrangler pages secret put API_KEY --project-name match-konkatsu
```

## 🎯 SEO・パフォーマンス対応

### SEO最適化
- **構造化データ**: LocalBusiness、BreadcrumbList、BlogPosting
- **メタタグ**: title、description、OGP、Twitter Card
- **サイトマップ**: 自動生成（/sitemap.xml）
- **robots.txt**: 自動生成
- **パンくずリスト**: 全ページ対応

### パフォーマンス
- **Core Web Vitals**: LCP < 1.5s、CLS < 0.1目標
- **画像最適化**: WebP、遅延読み込み、サイズ指定
- **CSS/JS最小化**: Viteによる自動最適化
- **CDN配信**: Cloudflare Edge Network

### アクセシビリティ
- **キーボード操作**: Tab、Enter、Escapeキー対応
- **スクリーンリーダー**: aria属性、ラベル設定
- **コントラスト**: WCAG AA基準準拠
- **フォーカス表示**: 明確なフォーカスインジケーター

## 🔒 セキュリティ対策

### フォームセキュリティ
- **Honeypot**: 隠しフィールドによるBot対策
- **バリデーション**: クライアント＋サーバー二重チェック
- **CORS設定**: API エンドポイント保護
- **入力サニタイゼーション**: XSS攻撃防止

### データベース
- **D1 Database**: SQLite、Cloudflare管理下
- **個人情報保護**: 暗号化、アクセス制限
- **ログ管理**: エラー監視、不正アクセス検出

## 📱 コンテンツ管理（Decap CMS）

### 管理できるコンテンツ
1. **ホームページ**: ヒーロー、特徴、料金、お客様の声、FAQ
2. **固定ページ**: サービス、料金、私たちについて
3. **ブログ記事**: カテゴリ別、タグ付け、アイキャッチ画像
4. **サイト設定**: 連絡先情報、SNSリンク、GTM ID

### CMS操作手順
1. `/admin` にアクセス
2. GitHub認証でログイン
3. コンテンツを編集・追加
4. プレビューで確認
5. 保存（自動的にGitコミット）

## 🐛 トラブルシューティング

### よくある問題

**1. ビルドエラー**
```bash
# 依存関係を再インストール
rm -rf node_modules package-lock.json
npm install

# TypeScriptエラー確認
npx tsc --noEmit
```

**2. PM2サーバー起動失敗**
```bash
# ポート確認・解放
fuser -k 3000/tcp
pm2 delete all

# ログ確認
pm2 logs match-konkatsu --nostream
```

**3. D1データベース接続エラー**
```bash
# マイグレーション状態確認
npx wrangler d1 migrations list match-konkatsu-db --local

# データベース再作成
npm run db:reset
```

**4. CMS画面アクセス不可**
- `/admin/config.yml` の設定確認
- Git Gateway設定の確認
- ブラウザキャッシュクリア

## 📊 監視・保守

### 定期メンテナンス
- **依存関係更新**: 月1回
- **セキュリティパッチ**: 緊急時
- **画像最適化**: 新規追加時
- **パフォーマンス測定**: Core Web Vitals監視

### ログ・分析
- **Cloudflare Analytics**: トラフィック、エラー率
- **D1 Database**: クエリパフォーマンス
- **Console Logs**: エラー監視

## 🤝 コントリビューション

### 開発フロー
1. Issueを作成（機能要求、バグ報告）
2. featureブランチを作成
3. 実装・テスト
4. Pull Requestを作成
5. コードレビュー
6. mainブランチにマージ

### コーディング規約
- **TypeScript**: strict モード
- **ESLint**: 推奨ルール
- **Prettier**: 自動フォーマット
- **コメント**: JSDoc形式

## 📄 ライセンス

このプロジェクトは MIT License の下で公開されています。

## 📞 サポート

- **技術的な質問**: GitHub Issues
- **緊急時**: developer@match-konkatsu.com
- **ドキュメント**: 本READMEファイル

---

**最終更新**: 2024年9月4日  
**バージョン**: v1.0.0  
**作成者**: MATCH Development Team