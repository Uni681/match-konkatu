import { html } from 'hono/html'

export function AdminLoginPage(error?: string) {
  return html`<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ログイン | MATCH管理画面</title>
  <link rel="icon" type="image/png" href="/img/favicon.png">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Noto Serif JP', serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .login-container {
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      padding: 50px;
      max-width: 450px;
      width: 100%;
    }
    .login-header {
      text-align: center;
      margin-bottom: 40px;
    }
    .login-header h1 {
      font-size: 2rem;
      color: #2c3e50;
      margin-bottom: 10px;
    }
    .login-header p {
      color: #7f8c8d;
      font-size: 0.95rem;
    }
    .form-group {
      margin-bottom: 25px;
    }
    .form-group label {
      display: block;
      margin-bottom: 8px;
      color: #2c3e50;
      font-weight: 600;
      font-size: 0.95rem;
    }
    .form-group input {
      width: 100%;
      padding: 15px;
      border: 2px solid #ecf0f1;
      border-radius: 10px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }
    .form-group input:focus {
      outline: none;
      border-color: #c9a961;
    }
    .login-btn {
      width: 100%;
      padding: 15px;
      background: #c9a961;
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;
    }
    .login-btn:hover {
      background: #b39451;
    }
    .error-message {
      background: #fee;
      border: 1px solid #fcc;
      color: #c33;
      padding: 15px;
      border-radius: 10px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .back-link {
      text-align: center;
      margin-top: 20px;
    }
    .back-link a {
      color: #7f8c8d;
      text-decoration: none;
      transition: color 0.3s;
    }
    .back-link a:hover {
      color: #2c3e50;
    }
  </style>
</head>
<body>
  <div class="login-container">
    <div class="login-header">
      <h1><i class="fas fa-shield-alt"></i> 管理画面</h1>
      <p>MATCH（マッチ）本気の婚活</p>
    </div>

    ${error ? html`
      <div class="error-message">
        <i class="fas fa-exclamation-circle"></i>
        <span>${error}</span>
      </div>
    ` : ''}

    <form method="POST" action="/admin/login">
      <div class="form-group">
        <label for="username">
          <i class="fas fa-user"></i> ユーザー名
        </label>
        <input 
          type="text" 
          id="username" 
          name="username" 
          required 
          autofocus
          autocomplete="username"
        >
      </div>

      <div class="form-group">
        <label for="password">
          <i class="fas fa-lock"></i> パスワード
        </label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          required
          autocomplete="current-password"
        >
      </div>

      <button type="submit" class="login-btn">
        <i class="fas fa-sign-in-alt"></i> ログイン
      </button>
    </form>

    <div class="back-link">
      <a href="/">
        <i class="fas fa-arrow-left"></i> サイトトップへ戻る
      </a>
    </div>
  </div>
</body>
</html>`
}
