import { html } from 'hono/html'
import AdminLayout from '../../components/AdminLayout'

export function AdminContactsPage(contacts: any[]) {
  return AdminLayout({
    title: 'お問い合わせ管理',
    currentPath: '/admin/contacts',
    children: html`
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h2 style="margin: 0; font-size: 1.5rem;">お問い合わせ一覧</h2>
          <div>
            <button onclick="filterContacts('all')" class="btn btn-secondary" style="margin-right: 10px;">
              <i class="fas fa-list"></i> すべて
            </button>
            <button onclick="filterContacts('new')" class="btn btn-primary" style="margin-right: 10px;">
              <i class="fas fa-envelope"></i> 未対応
            </button>
            <button onclick="filterContacts('replied')" class="btn btn-success">
              <i class="fas fa-check"></i> 対応済み
            </button>
          </div>
        </div>

        ${contacts.length === 0 ? html`
          <div style="text-align: center; padding: 60px 20px; color: #7f8c8d;">
            <i class="fas fa-inbox" style="font-size: 4rem; margin-bottom: 20px; opacity: 0.3;"></i>
            <p style="font-size: 1.2rem;">お問い合わせはまだありません</p>
          </div>
        ` : html`
          <div class="table-responsive" style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f8f9fa; border-bottom: 2px solid #dee2e6;">
                  <th style="padding: 15px; text-align: left;">日時</th>
                  <th style="padding: 15px; text-align: left;">名前</th>
                  <th style="padding: 15px; text-align: left;">メール</th>
                  <th style="padding: 15px; text-align: left;">ステータス</th>
                  <th style="padding: 15px; text-align: center;">操作</th>
                </tr>
              </thead>
              <tbody id="contacts-table-body">
                ${contacts.map(contact => {
                  const status = contact.status || 'new'
                  const statusBadge = status === 'new' 
                    ? '<span style="background: #3498db; color: white; padding: 5px 12px; border-radius: 20px; font-size: 0.85rem;">未対応</span>'
                    : status === 'replied'
                    ? '<span style="background: #27ae60; color: white; padding: 5px 12px; border-radius: 20px; font-size: 0.85rem;">対応済み</span>'
                    : '<span style="background: #e74c3c; color: white; padding: 5px 12px; border-radius: 20px; font-size: 0.85rem;">スパム</span>'
                  
                  return html`
                    <tr data-status="${status}" style="border-bottom: 1px solid #dee2e6;">
                      <td style="padding: 15px;">
                        ${new Date(contact.created_at).toLocaleString('ja-JP', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td style="padding: 15px; font-weight: 600;">${contact.name}</td>
                      <td style="padding: 15px;">
                        <a href="mailto:${contact.email}" style="color: #3498db; text-decoration: none;">
                          ${contact.email}
                        </a>
                      </td>
                      <td style="padding: 15px;">
                        ${statusBadge}
                      </td>
                      <td style="padding: 15px; text-align: center;">
                        <a href="/admin/contacts/${contact.id}" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">
                          <i class="fas fa-eye"></i> 詳細
                        </a>
                      </td>
                    </tr>
                  `
                }).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>

      <script>
        function filterContacts(status) {
          const rows = document.querySelectorAll('#contacts-table-body tr');
          rows.forEach(row => {
            if (status === 'all') {
              row.style.display = '';
            } else {
              if (row.dataset.status === status) {
                row.style.display = '';
              } else {
                row.style.display = 'none';
              }
            }
          });
        }
      </script>
    `
  })
}

export function AdminContactDetailPage(contact: any) {
  return AdminLayout({
    title: 'お問い合わせ詳細',
    currentPath: '/admin/contacts',
    children: html`
      <div class="card" style="margin-bottom: 20px;">
        <a href="/admin/contacts" class="btn btn-secondary" style="margin-bottom: 20px;">
          <i class="fas fa-arrow-left"></i> 一覧に戻る
        </a>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
          <div>
            <h3 style="margin-bottom: 20px; color: #2c3e50;">
              <i class="fas fa-user"></i> お問い合わせ情報
            </h3>
            
            <div style="margin-bottom: 15px;">
              <label style="font-weight: 600; color: #7f8c8d; display: block; margin-bottom: 5px;">お名前</label>
              <div style="font-size: 1.1rem;">${contact.name}</div>
            </div>

            <div style="margin-bottom: 15px;">
              <label style="font-weight: 600; color: #7f8c8d; display: block; margin-bottom: 5px;">メールアドレス</label>
              <div>
                <a href="mailto:${contact.email}" style="color: #3498db; text-decoration: none; font-size: 1.1rem;">
                  ${contact.email}
                </a>
              </div>
            </div>

            ${contact.phone ? html`
              <div style="margin-bottom: 15px;">
                <label style="font-weight: 600; color: #7f8c8d; display: block; margin-bottom: 5px;">電話番号</label>
                <div>
                  <a href="tel:${contact.phone}" style="color: #3498db; text-decoration: none; font-size: 1.1rem;">
                    ${contact.phone}
                  </a>
                </div>
              </div>
            ` : ''}

            <div style="margin-bottom: 15px;">
              <label style="font-weight: 600; color: #7f8c8d; display: block; margin-bottom: 5px;">受信日時</label>
              <div>${new Date(contact.created_at).toLocaleString('ja-JP')}</div>
            </div>
          </div>

          <div>
            <h3 style="margin-bottom: 20px; color: #2c3e50;">
              <i class="fas fa-cog"></i> ステータス管理
            </h3>
            
            <form method="POST" action="/admin/contacts/${contact.id}/status">
              <div style="margin-bottom: 15px;">
                <label style="font-weight: 600; color: #7f8c8d; display: block; margin-bottom: 10px;">現在のステータス</label>
                <select name="status" class="form-select" style="width: 100%; padding: 12px; border: 2px solid #ecf0f1; border-radius: 8px; font-size: 1rem;">
                  <option value="new" ${contact.status === 'new' ? 'selected' : ''}>未対応</option>
                  <option value="replied" ${contact.status === 'replied' ? 'selected' : ''}>対応済み</option>
                  <option value="spam" ${contact.status === 'spam' ? 'selected' : ''}>スパム</option>
                </select>
              </div>
              
              <button type="submit" class="btn btn-primary" style="width: 100%;">
                <i class="fas fa-save"></i> ステータスを更新
              </button>
            </form>

            ${contact.spam_score !== null && contact.spam_score !== undefined ? html`
              <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                <label style="font-weight: 600; color: #7f8c8d; display: block; margin-bottom: 5px;">スパムスコア</label>
                <div>${contact.spam_score}</div>
              </div>
            ` : ''}
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 15px; color: #2c3e50;">
            <i class="fas fa-comment"></i> メッセージ内容
          </h3>
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; line-height: 1.8; white-space: pre-wrap; font-size: 1.05rem;">
${contact.message}
          </div>
        </div>
      </div>

      <div class="card" style="background: #fff9e6; border: 2px solid #c9a961;">
        <h3 style="margin-bottom: 15px; color: #2c3e50;">
          <i class="fas fa-reply"></i> 返信方法
        </h3>
        <p style="margin-bottom: 15px; line-height: 1.8;">
          このお問い合わせに返信するには、以下のメールアドレスまたは電話番号にご連絡ください。
        </p>
        <div style="display: flex; gap: 15px;">
          <a href="mailto:${contact.email}?subject=Re: お問い合わせありがとうございます" class="btn btn-primary">
            <i class="fas fa-envelope"></i> メールで返信
          </a>
          ${contact.phone ? html`
            <a href="tel:${contact.phone}" class="btn btn-success">
              <i class="fas fa-phone"></i> 電話する
            </a>
          ` : ''}
        </div>
      </div>
    `
  })
}
