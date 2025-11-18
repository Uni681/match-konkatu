import { html, raw } from 'hono/html';

export const IBJStatsSection = () => {
  const stats = [
    {
      prefix: '約',
      number: '90,000',
      unit: '名',
      label: '会員数',
      description: '日本最大級のネットワーク'
    },
    {
      prefix: '約',
      number: '40,000',
      unit: '件',
      label: '月間お見合い成立数',
      description: '活発なマッチング実績'
    },
    {
      prefix: '',
      number: '13,516',
      unit: '名',
      label: '年間成婚数',
      description: '豊富な成婚実績'
    }
  ];

  return html`
<section class="ibj-stats-section py-20">
  <div class="container mx-auto px-6 max-w-7xl">
    <!-- セクション見出し -->
    <div class="text-center mb-16 fade-slide-up">
      <div class="ibj-stats-subtitle mb-3">
        ABOUT US
      </div>
      <h2 class="ibj-stats-title mb-8">
        数字で見るIBJ
      </h2>
      <p class="ibj-stats-description max-w-4xl mx-auto">
        IBJは日本最大級の結婚相談所ネットワーク。会員数約9万人、年間成婚数13,516名。<br>
        MATCHはこのIBJに加盟し、確かな出会いを提供します。
      </p>
    </div>

    <!-- 統計カード -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12 fade-slide-up">
      ${raw(stats.map((stat, index) => `
        <div class="ibj-stats-card">
          <div class="ibj-stats-number-wrapper">
            ${stat.prefix ? `<span class="ibj-stats-prefix">${stat.prefix}</span>` : ''}
            <span class="ibj-stats-number count-up-number">${stat.number}</span>
            <span class="ibj-stats-unit">${stat.unit}</span>
          </div>
          <div class="ibj-stats-content">
            <h3 class="ibj-stats-label">
              ${stat.label}
            </h3>
            <p class="ibj-stats-card-description">
              ${stat.description}
            </p>
          </div>
        </div>
      `).join(''))}
    </div>

    <!-- CTA -->
    <div class="text-center fade-slide-up">
      <a href="https://www.ibjapan.com/" target="_blank" rel="noopener noreferrer" class="ibj-cta-button">
        IBJについてはこちら
        <i class="fas fa-external-link-alt ml-2 text-sm"></i>
      </a>
    </div>
  </div>
</section>
`;
};

export default IBJStatsSection;