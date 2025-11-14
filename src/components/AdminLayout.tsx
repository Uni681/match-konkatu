import { html } from 'hono/html'

interface AdminLayoutProps {
  title: string
  children: any
  currentPath?: string
}

export function AdminLayout({ title, children, currentPath = '' }: AdminLayoutProps) {
  return html`<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | MATCH管理画面</title>
  <link rel="icon" type="image/png" href="/img/favicon.png">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="/static/styles.css">
  <style>
    .admin-container {
      display: flex;
      min-height: 100vh;
      background: #f5f5f5;
    }
    .admin-sidebar {
      width: 250px;
      background: #2c3e50;
      color: white;
      padding: 20px;
      position: fixed;
      height: 100vh;
      overflow-y: auto;
    }
    .admin-sidebar h2 {
      font-size: 1.5rem;
      margin-bottom: 30px;
      padding-bottom: 15px;
      border-bottom: 2px solid rgba(255,255,255,0.1);
    }
    .admin-nav a {
      display: block;
      padding: 12px 15px;
      color: rgba(255,255,255,0.8);
      text-decoration: none;
      border-radius: 8px;
      margin-bottom: 5px;
      transition: all 0.3s;
    }
    .admin-nav a:hover {
      background: rgba(255,255,255,0.1);
      color: white;
    }
    .admin-nav a.active {
      background: #c9a961;
      color: white;
    }
    .admin-nav i {
      width: 20px;
      margin-right: 10px;
    }
    .admin-content {
      flex: 1;
      margin-left: 250px;
      padding: 30px;
    }
    .admin-header {
      background: white;
      padding: 20px 30px;
      border-radius: 12px;
      margin-bottom: 30px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .admin-header h1 {
      font-size: 2rem;
      color: #2c3e50;
      margin: 0;
    }
    .logout-btn {
      background: #e74c3c;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.3s;
    }
    .logout-btn:hover {
      background: #c0392b;
    }
    .card {
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .btn {
      display: inline-block;
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      transition: all 0.3s;
      border: none;
      cursor: pointer;
      font-size: 1rem;
    }
    .btn-primary {
      background: #c9a961;
      color: white;
    }
    .btn-primary:hover {
      background: #b39451;
    }
    .btn-secondary {
      background: #95a5a6;
      color: white;
    }
    .btn-secondary:hover {
      background: #7f8c8d;
    }
    .btn-danger {
      background: #e74c3c;
      color: white;
    }
    .btn-danger:hover {
      background: #c0392b;
    }
    .btn-success {
      background: #27ae60;
      color: white;
    }
    .btn-success:hover {
      background: #229954;
    }
    @media (max-width: 768px) {
      .admin-sidebar {
        width: 200px;
      }
      .admin-content {
        margin-left: 200px;
        padding: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="admin-container">
    <!-- Sidebar -->
    <aside class="admin-sidebar">
      <h2><i class="fas fa-shield-alt"></i> 管理画面</h2>
      <nav class="admin-nav">
        <a href="/admin/dashboard" class="${currentPath === '/admin/dashboard' ? 'active' : ''}">
          <i class="fas fa-home"></i>ダッシュボード
        </a>
        <a href="/admin/contacts" class="${currentPath === '/admin/contacts' ? 'active' : ''}">
          <i class="fas fa-envelope"></i>お問い合わせ
        </a>
        <a href="/admin/blog" class="${currentPath === '/admin/blog' ? 'active' : ''}">
          <i class="fas fa-blog"></i>ブログ管理
        </a>
        <a href="/admin/blog/new" class="${currentPath === '/admin/blog/new' ? 'active' : ''}">
          <i class="fas fa-plus-circle"></i>新規投稿
        </a>
        <a href="/" target="_blank">
          <i class="fas fa-external-link-alt"></i>サイトを見る
        </a>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="admin-content">
      <div class="admin-header">
        <h1>${title}</h1>
        <form action="/admin/logout" method="POST" style="margin: 0;">
          <button type="submit" class="logout-btn">
            <i class="fas fa-sign-out-alt"></i> ログアウト
          </button>
        </form>
      </div>
      
      ${children}
    </main>
  </div>
</body>
</html>`
}

export default AdminLayout
