import { html } from 'hono/html'
import AdminLayout from '../../components/AdminLayout'

export function AdminDashboardPage(stats: { contacts: number, posts: number, newContacts: number }) {
  return AdminLayout({
    title: 'ダッシュボード',
    currentPath: '/admin/dashboard',
    children: html`
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px;">
        <!-- お問い合わせ統計 -->
        <div class="card" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 0.9rem; opacity: 0.9; margin-bottom: 5px;">お問い合わせ総数</div>
              <div style="font-size: 2.5rem; font-weight: bold;">${stats.contacts}</div>
            </div>
            <div style="font-size: 3rem; opacity: 0.3;">
              <i class="fas fa-envelope"></i>
            </div>
          </div>
        </div>

        <!-- 未対応お問い合わせ -->
        <div class="card" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 0.9rem; opacity: 0.9; margin-bottom: 5px;">未対応</div>
              <div style="font-size: 2.5rem; font-weight: bold;">${stats.newContacts}</div>
            </div>
            <div style="font-size: 3rem; opacity: 0.3;">
              <i class="fas fa-exclamation-circle"></i>
            </div>
          </div>
        </div>

        <!-- ブログ記事数 -->
        <div class="card" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 0.9rem; opacity: 0.9; margin-bottom: 5px;">ブログ記事</div>
              <div style="font-size: 2.5rem; font-weight: bold;">${stats.posts}</div>
            </div>
            <div style="font-size: 3rem; opacity: 0.3;">
              <i class="fas fa-blog"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- クイックアクション -->
      <div class="card" style="margin-bottom: 30px;">
        <h2 style="margin-bottom: 20px; font-size: 1.5rem;">
          <i class="fas fa-bolt"></i> クイックアクション
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
          <a href="/admin/contacts" class="btn btn-primary" style="padding: 20px; text-align: center; display: block;">
            <i class="fas fa-envelope" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
            お問い合わせ確認
          </a>
          <a href="/admin/blog/new" class="btn btn-primary" style="padding: 20px; text-align: center; display: block;">
            <i class="fas fa-plus-circle" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
            新規投稿
          </a>
          <a href="/admin/blog" class="btn btn-primary" style="padding: 20px; text-align: center; display: block;">
            <i class="fas fa-blog" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
            ブログ管理
          </a>
          <a href="/" target="_blank" class="btn btn-secondary" style="padding: 20px; text-align: center; display: block;">
            <i class="fas fa-external-link-alt" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
            サイトを見る
          </a>
        </div>
      </div>

      <!-- ウェルカムメッセージ -->
      <div class="card" style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);">
        <h2 style="margin-bottom: 15px; font-size: 1.5rem; color: #2c3e50;">
          <i class="fas fa-info-circle"></i> ようこそ、管理画面へ
        </h2>
        <p style="line-height: 1.8; color: #2c3e50; margin-bottom: 15px;">
          この管理画面では、お問い合わせの確認・返信、ブログ記事の作成・編集が可能です。
        </p>
        <ul style="line-height: 2; color: #2c3e50; margin-left: 20px;">
          <li><strong>お問い合わせ管理</strong>：顧客からのお問い合わせを確認し、ステータスを管理できます</li>
          <li><strong>ブログ管理</strong>：新規記事の作成、既存記事の編集・削除ができます</li>
          <li><strong>プレビュー機能</strong>：記事公開前にプレビューで確認できます</li>
        </ul>
      </div>
    `
  })
}
