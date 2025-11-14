import { html, raw } from 'hono/html'
import AdminLayout from '../../components/AdminLayout'

export function AdminBlogListPage(posts: any[]) {
  return AdminLayout({
    title: 'ブログ管理',
    currentPath: '/admin/blog',
    children: html`
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h2 style="margin: 0; font-size: 1.5rem;">ブログ記事一覧</h2>
          <a href="/admin/blog/new" class="btn btn-primary">
            <i class="fas fa-plus-circle"></i> 新規作成
          </a>
        </div>

        ${posts.length === 0 ? html`
          <div style="text-align: center; padding: 60px 20px; color: #7f8c8d;">
            <i class="fas fa-file-alt" style="font-size: 4rem; margin-bottom: 20px; opacity: 0.3;"></i>
            <p style="font-size: 1.2rem;">ブログ記事はまだありません</p>
            <a href="/admin/blog/new" class="btn btn-primary" style="margin-top: 20px;">
              <i class="fas fa-plus-circle"></i> 最初の記事を作成
            </a>
          </div>
        ` : html`
          <div class="table-responsive" style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f8f9fa; border-bottom: 2px solid #dee2e6;">
                  <th style="padding: 15px; text-align: left;">タイトル</th>
                  <th style="padding: 15px; text-align: left;">カテゴリー</th>
                  <th style="padding: 15px; text-align: left;">日付</th>
                  <th style="padding: 15px; text-align: left;">ステータス</th>
                  <th style="padding: 15px; text-align: center;">操作</th>
                </tr>
              </thead>
              <tbody>
                ${raw(posts.map(post => {
                  const isDraft = post.draft === true || post.draft === 'true'
                  const statusBadge = isDraft
                    ? '<span style="background: #95a5a6; color: white; padding: 5px 12px; border-radius: 20px; font-size: 0.85rem;">下書き</span>'
                    : '<span style="background: #27ae60; color: white; padding: 5px 12px; border-radius: 20px; font-size: 0.85rem;">公開中</span>'
                  
                  return `
                    <tr style="border-bottom: 1px solid #dee2e6;">
                      <td style="padding: 15px; font-weight: 600;">${post.title}</td>
                      <td style="padding: 15px;">
                        <span style="background: #ecf0f1; padding: 5px 12px; border-radius: 20px; font-size: 0.85rem;">
                          ${post.category || '未分類'}
                        </span>
                      </td>
                      <td style="padding: 15px;">
                        ${new Date(post.date).toLocaleDateString('ja-JP')}
                      </td>
                      <td style="padding: 15px;">
                        ${statusBadge}
                      </td>
                      <td style="padding: 15px; text-align: center;">
                        <a href="/blog/${post.slug}" target="_blank" class="btn btn-secondary" style="padding: 8px 16px; font-size: 0.9rem; margin-right: 5px;">
                          <i class="fas fa-eye"></i>
                        </a>
                        <a href="/admin/blog/edit/${post.slug}" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem; margin-right: 5px;">
                          <i class="fas fa-edit"></i>
                        </a>
                        <button onclick="deletePost('${post.slug}')" class="btn btn-danger" style="padding: 8px 16px; font-size: 0.9rem;">
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  `
                }).join(''))}
              </tbody>
            </table>
          </div>
        `}
      </div>

      <script>
        async function deletePost(slug) {
          if (!confirm('この記事を削除してもよろしいですか？')) {
            return;
          }

          try {
            const response = await fetch(\`/admin/api/blog/\${slug}\`, {
              method: 'DELETE'
            });

            if (response.ok) {
              alert('記事を削除しました');
              location.reload();
            } else {
              alert('削除に失敗しました');
            }
          } catch (error) {
            console.error('Error:', error);
            alert('エラーが発生しました');
          }
        }
      </script>
    `
  })
}

export function AdminBlogEditorPage(post?: any) {
  const isEdit = !!post
  const title = isEdit ? `記事編集: ${post.title}` : '新規記事作成'
  
  return AdminLayout({
    title,
    currentPath: '/admin/blog',
    children: html`
      <div class="card">
        <a href="/admin/blog" class="btn btn-secondary" style="margin-bottom: 20px;">
          <i class="fas fa-arrow-left"></i> 一覧に戻る
        </a>

        <form id="blog-form" method="POST" action="${isEdit ? `/admin/blog/edit/${post.slug}` : '/admin/blog/new'}">
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px;">
            <!-- 左カラム：メインコンテンツ -->
            <div>
              <div style="margin-bottom: 20px;">
                <label style="font-weight: 600; color: #2c3e50; display: block; margin-bottom: 8px;">
                  タイトル <span style="color: #e74c3c;">*</span>
                </label>
                <input 
                  type="text" 
                  name="title" 
                  required
                  value="${isEdit ? post.title : ''}"
                  placeholder="記事のタイトルを入力"
                  style="width: 100%; padding: 12px; border: 2px solid #ecf0f1; border-radius: 8px; font-size: 1.1rem;"
                >
              </div>

              <div style="margin-bottom: 20px;">
                <label style="font-weight: 600; color: #2c3e50; display: block; margin-bottom: 8px;">
                  スラッグ（URL） <span style="color: #e74c3c;">*</span>
                </label>
                <input 
                  type="text" 
                  name="slug" 
                  required
                  value="${isEdit ? post.slug : ''}"
                  ${isEdit ? 'readonly' : ''}
                  placeholder="english-url-slug"
                  style="width: 100%; padding: 12px; border: 2px solid #ecf0f1; border-radius: 8px; font-family: monospace;"
                >
                <small style="color: #7f8c8d; margin-top: 5px; display: block;">
                  半角英数字とハイフンのみ使用可能
                </small>
              </div>

              <div style="margin-bottom: 20px;">
                <label style="font-weight: 600; color: #2c3e50; display: block; margin-bottom: 8px;">
                  説明文 <span style="color: #e74c3c;">*</span>
                </label>
                <textarea 
                  name="description" 
                  required
                  rows="3"
                  placeholder="検索結果やSNSシェア時に表示される説明文"
                  style="width: 100%; padding: 12px; border: 2px solid #ecf0f1; border-radius: 8px; resize: vertical;"
                >${isEdit ? post.description : ''}</textarea>
              </div>

              <div style="margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <label style="font-weight: 600; color: #2c3e50;">
                    本文 <span style="color: #e74c3c;">*</span>
                  </label>
                  <button type="button" onclick="togglePreview()" class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.9rem;">
                    <i class="fas fa-eye"></i> プレビュー
                  </button>
                </div>
                <textarea 
                  id="content" 
                  name="content" 
                  required
                  rows="20"
                  placeholder="Markdown形式で記事を書いてください..."
                  style="width: 100%; padding: 12px; border: 2px solid #ecf0f1; border-radius: 8px; font-family: monospace; resize: vertical;"
                >${isEdit ? post.content : ''}</textarea>
                <small style="color: #7f8c8d; margin-top: 5px; display: block;">
                  Markdown形式に対応しています。# 見出し、**太字**、[リンク](URL) など
                </small>
              </div>
            </div>

            <!-- 右カラム：設定 -->
            <div>
              <div style="margin-bottom: 20px;">
                <label style="font-weight: 600; color: #2c3e50; display: block; margin-bottom: 8px;">
                  公開日時 <span style="color: #e74c3c;">*</span>
                </label>
                <input 
                  type="datetime-local" 
                  name="date" 
                  required
                  value="${isEdit ? post.date?.substring(0, 16) : new Date().toISOString().substring(0, 16)}"
                  style="width: 100%; padding: 12px; border: 2px solid #ecf0f1; border-radius: 8px;"
                >
              </div>

              <div style="margin-bottom: 20px;">
                <label style="font-weight: 600; color: #2c3e50; display: block; margin-bottom: 8px;">
                  カテゴリー <span style="color: #e74c3c;">*</span>
                </label>
                <select 
                  name="category" 
                  required
                  style="width: 100%; padding: 12px; border: 2px solid #ecf0f1; border-radius: 8px;"
                >
                  <option value="">選択してください</option>
                  <option value="婚活ノウハウ" ${isEdit && post.category === '婚活ノウハウ' ? 'selected' : ''}>婚活ノウハウ</option>
                  <option value="イベント情報" ${isEdit && post.category === 'イベント情報' ? 'selected' : ''}>イベント情報</option>
                  <option value="お知らせ" ${isEdit && post.category === 'お知らせ' ? 'selected' : ''}>お知らせ</option>
                  <option value="成婚事例" ${isEdit && post.category === '成婚事例' ? 'selected' : ''}>成婚事例</option>
                </select>
              </div>

              <div style="margin-bottom: 20px;">
                <label style="font-weight: 600; color: #2c3e50; display: block; margin-bottom: 8px;">
                  アイキャッチ画像URL
                </label>
                <input 
                  type="text" 
                  name="featured_image" 
                  value="${isEdit ? (post.featured_image || '') : ''}"
                  placeholder="/img/blog/image.jpg"
                  style="width: 100%; padding: 12px; border: 2px solid #ecf0f1; border-radius: 8px;"
                >
                <small style="color: #7f8c8d; margin-top: 5px; display: block;">
                  /img/blog/ に画像をアップロードしてください
                </small>
              </div>

              <div style="margin-bottom: 20px;">
                <label style="font-weight: 600; color: #2c3e50; display: block; margin-bottom: 8px;">
                  タグ（カンマ区切り）
                </label>
                <input 
                  type="text" 
                  name="tags" 
                  value="${isEdit && post.tags ? post.tags.join(', ') : ''}"
                  placeholder="婚活, デート, プロフィール"
                  style="width: 100%; padding: 12px; border: 2px solid #ecf0f1; border-radius: 8px;"
                >
              </div>

              <div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                <label style="display: flex; align-items: center; cursor: pointer;">
                  <input 
                    type="checkbox" 
                    name="featured" 
                    value="true"
                    ${isEdit && post.featured ? 'checked' : ''}
                    style="margin-right: 10px; width: 18px; height: 18px;"
                  >
                  <span style="font-weight: 600; color: #2c3e50;">注目記事として表示</span>
                </label>
              </div>

              <div style="margin-bottom: 20px; padding: 15px; background: #fff3cd; border-radius: 8px;">
                <label style="display: flex; align-items: center; cursor: pointer;">
                  <input 
                    type="checkbox" 
                    name="draft" 
                    value="true"
                    ${isEdit && post.draft ? 'checked' : ''}
                    style="margin-right: 10px; width: 18px; height: 18px;"
                  >
                  <span style="font-weight: 600; color: #856404;">下書きとして保存</span>
                </label>
              </div>

              <button type="submit" class="btn btn-primary" style="width: 100%; padding: 15px; font-size: 1.1rem;">
                <i class="fas fa-save"></i> ${isEdit ? '更新する' : '公開する'}
              </button>

              ${isEdit ? html`
                <button type="button" onclick="deletePost('${post.slug}')" class="btn btn-danger" style="width: 100%; padding: 15px; font-size: 1.1rem; margin-top: 10px;">
                  <i class="fas fa-trash"></i> 削除する
                </button>
              ` : ''}
            </div>
          </div>
        </form>
      </div>

      <!-- プレビューモーダル -->
      <div id="preview-modal" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 9999; overflow-y: auto;">
        <div style="max-width: 900px; margin: 50px auto; background: white; border-radius: 12px; padding: 40px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
            <h2 style="margin: 0;">プレビュー</h2>
            <button onclick="togglePreview()" class="btn btn-secondary">
              <i class="fas fa-times"></i> 閉じる
            </button>
          </div>
          <div id="preview-content" style="line-height: 1.8;"></div>
        </div>
      </div>

      <script>
        function togglePreview() {
          const modal = document.getElementById('preview-modal');
          const content = document.getElementById('content').value;
          const previewContent = document.getElementById('preview-content');
          
          if (modal.style.display === 'none') {
            // Simple markdown to HTML conversion (basic)
            const html = content
              .replace(/^### (.+)$/gm, '<h3>$1</h3>')
              .replace(/^## (.+)$/gm, '<h2>$1</h2>')
              .replace(/^# (.+)$/gm, '<h1>$1</h1>')
              .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.+?)\*/g, '<em>$1</em>')
              .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
              .replace(/\n\n/g, '</p><p>')
              .replace(/^(?!<[h|p])/gm, '<p>')
              .replace(/(?![h|p]>)$/gm, '</p>');
            
            previewContent.innerHTML = html;
            modal.style.display = 'block';
          } else {
            modal.style.display = 'none';
          }
        }

        async function deletePost(slug) {
          if (!confirm('この記事を削除してもよろしいですか？')) {
            return;
          }

          try {
            const response = await fetch(\`/admin/api/blog/\${slug}\`, {
              method: 'DELETE'
            });

            if (response.ok) {
              alert('記事を削除しました');
              location.href = '/admin/blog';
            } else {
              alert('削除に失敗しました');
            }
          } catch (error) {
            console.error('Error:', error);
            alert('エラーが発生しました');
          }
        }
      </script>
    `
  })
}
