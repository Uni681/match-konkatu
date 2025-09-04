import { html, raw } from 'hono/html';

export const AboutUsLinksSection = () => {
  const linkCards = [
    {
      title: 'サービス・料金',
      subtitle: '充実したサポート内容と明朗会計の料金体系をご案内します',
      link: '/service',
      backgroundImage: 'https://page.gensparksite.com/v1/base64_upload/623ce341e6406c4b479efaff9e5f1d41'
    },
    {
      title: 'ご成婚までのながれ',
      subtitle: '出会いから成婚まで、一歩一歩丁寧にサポートいたします',
      link: '/flow',
      backgroundImage: 'https://page.gensparksite.com/v1/base64_upload/89690625e4eb58ebd19c69812967065f'
    },
    {
      title: 'よくある質問',
      subtitle: '皆様からよくいただくご質問にお答えしています',
      link: '/faq',
      backgroundImage: 'https://page.gensparksite.com/v1/base64_upload/8fc938425ea1151f5524c33365139d08'
    }
  ];

  return html`
<section class="about-us-links-section py-20">
  <div class="container mx-auto px-6 max-w-7xl">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      <!-- 縦書き見出し -->
      <div class="lg:col-span-3 flex lg:justify-center">
        <h2 class="about-us-vertical-title">
          当相談所について詳しく知る
        </h2>
      </div>
      
      <!-- リンクカード -->
      <div class="lg:col-span-9">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          ${raw(linkCards.slice(0, 2).map((card, index) => `
            <a href="${card.link}" class="about-us-link-card group">
              <div class="about-us-card-background" style="background-image: url('${card.backgroundImage}')"></div>
              <div class="about-us-card-overlay"></div>
              <div class="about-us-card-content">
                <h3 class="about-us-card-title">
                  ${card.title}
                </h3>
                <p class="about-us-card-subtitle">
                  ${card.subtitle}
                </p>
                <div class="about-us-card-arrow">
                  <i class="fas fa-arrow-right"></i>
                </div>
              </div>
            </a>
          `).join(''))}
        </div>
        
        <!-- 3つ目のカード（1列で配置） -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-start-1">
            ${raw(`
              <a href="${linkCards[2].link}" class="about-us-link-card group">
                <div class="about-us-card-background" style="background-image: url('${linkCards[2].backgroundImage}')"></div>
                <div class="about-us-card-overlay"></div>
                <div class="about-us-card-content">
                  <h3 class="about-us-card-title">
                    ${linkCards[2].title}
                  </h3>
                  <p class="about-us-card-subtitle">
                    ${linkCards[2].subtitle}
                  </p>
                  <div class="about-us-card-arrow">
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

export default AboutUsLinksSection;