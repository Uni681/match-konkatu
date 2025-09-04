import { html, raw } from 'hono/html';

export const LearnMoreSection = () => {
  const learnMoreItems = [
    {
      title: 'サービス・料金',
      subtitle: '明朗会計で安心のプラン',
      description: '入会から成婚まで、透明性の高い料金体系でサポートいたします',
      link: '/service',
      imageAlt: '和装結婚式のサービス説明'
    },
    {
      title: 'ご成婚までのながれ',
      subtitle: '丁寧なステップでご案内',
      description: '入会からご成婚まで、きめ細かいサポートの流れをご紹介します',
      link: '/flow',
      imageAlt: '和装での結婚式の流れ'
    },
    {
      title: 'よくある質問',
      subtitle: '安心してお始めください',
      description: '婚活に関する疑問やご不安にお答えします',
      link: '/faq',
      imageAlt: '和装結婚式での質問対応'
    }
  ];

  return html`
<section class="learn-more-section py-20">
  <div class="container mx-auto px-6 max-w-7xl">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      <!-- 縦書き見出し -->
      <div class="lg:col-span-3 flex justify-center lg:justify-start">
        <h2 class="learn-more-vertical-title">
          当相談所について詳しく知る
        </h2>
      </div>
      
      <!-- カードエリア -->
      <div class="lg:col-span-9">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 上段2カード -->
          ${raw(learnMoreItems.slice(0, 2).map((item, index) => `
            <a href="${item.link}" class="learn-more-card group">
              <div class="learn-more-card-background"></div>
              <div class="learn-more-card-overlay"></div>
              <div class="learn-more-card-content">
                <h3 class="learn-more-card-title">
                  ${item.title}
                </h3>
                <p class="learn-more-card-subtitle">
                  ${item.subtitle}
                </p>
                <p class="learn-more-card-description">
                  ${item.description}
                </p>
                <div class="learn-more-card-arrow">
                  <i class="fas fa-arrow-right"></i>
                </div>
              </div>
            </a>
          `).join(''))}
        </div>
        
        <!-- 下段1カード（中央配置） -->
        <div class="mt-6 flex justify-center">
          <div class="w-full md:w-1/2">
            ${raw(`
              <a href="${learnMoreItems[2].link}" class="learn-more-card group block">
                <div class="learn-more-card-background"></div>
                <div class="learn-more-card-overlay"></div>
                <div class="learn-more-card-content">
                  <h3 class="learn-more-card-title">
                    ${learnMoreItems[2].title}
                  </h3>
                  <p class="learn-more-card-subtitle">
                    ${learnMoreItems[2].subtitle}
                  </p>
                  <p class="learn-more-card-description">
                    ${learnMoreItems[2].description}
                  </p>
                  <div class="learn-more-card-arrow">
                    <i class="fas fa-arrow-right"></i>
                  </div>
                </div>
              </a>
            `)}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;
};

export default LearnMoreSection;