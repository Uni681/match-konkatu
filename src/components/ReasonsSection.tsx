import { html, raw } from 'hono/html';

export const ReasonsSection = () => {
  const reasons = [
    {
      icon: 'fas fa-user-friends',
      title: '男女カウンセラーが在籍',
      description: '男女カウンセラーが在籍し、幅広い視点であなたの魅力を引き出します。同性ならではの悩みも気軽にご相談いただける結婚相談所です。'
    },
    {
      icon: 'fas fa-heart',
      title: '親子で運営する温かさ',
      description: '親子で運営しているからこそ、世代を超えて温かいサポートを提供します。異なる世代の視点でアドバイスを差し上げます。'
    },
    {
      icon: 'fas fa-certificate',
      title: 'IBJ正規加盟店の信頼',
      description: 'IBJ正規加盟店として、信頼できる出会いと豊富な会員ネットワークをご紹介します。80,000名以上の結婚相談所会員との出会いが可能です。'
    }
  ];

  return html`
<section class="reasons-section py-20">
  <div class="container mx-auto px-6 max-w-7xl">
    <!-- セクション見出し -->
    <div class="text-center mb-16">
      <h2 class="reasons-section-title mb-6">
        MATCHが選ばれる３つの理由
      </h2>
      <p class="text-lg text-gray-600 max-w-3xl mx-auto">
        MATCH（マッチ）本気の婚活は、会員様一人ひとりに寄り添い、理想のパートナーとの出会いをサポートします
      </p>
    </div>

    <!-- 理由カード（3カラム） -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
      ${raw(reasons.map((reason, index) => `
        <div class="reasons-card">
          <!-- アイコン -->
          <div class="reasons-icon-wrapper">
            <i class="${reason.icon} reasons-icon"></i>
          </div>
          
          <!-- コンテンツ -->
          <div class="reasons-content">
            <h3 class="reasons-card-title">
              ${reason.title}
            </h3>
            <p class="reasons-card-description">
              ${reason.description}
            </p>
          </div>
        </div>
      `).join(''))}
    </div>
  </div>
</section>
`;
};

export default ReasonsSection;