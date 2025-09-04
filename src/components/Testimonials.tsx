import { html, raw } from 'hono/html';

interface Testimonial {
  name: string;
  age?: number;
  location?: string;
  comment: string;
  rating?: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials = ({ testimonials }: TestimonialsProps) => {
  const renderStars = (rating: number = 5) => {
    return Array.from({ length: 5 }, (_, i) => 
      `<i class="fas fa-star ${i < rating ? 'text-yellow-400' : 'text-gray-300'}"></i>`
    ).join('');
  };

  return html`
<section class="section bg-white">
  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="font-mincho text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        お客様の声
      </h2>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        MATCHで素敵なパートナーと出会い、幸せな結婚をされた方々の声をご紹介します
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      ${raw(testimonials.map((testimonial, index) => `
        <div class="card group animate-on-scroll" style="animation-delay: ${index * 150}ms">
          <div class="card-body">
            <!-- Rating -->
            <div class="flex justify-center mb-4">
              ${raw(renderStars(testimonial.rating))}
            </div>
            
            <!-- Quote -->
            <blockquote class="text-gray-700 italic leading-relaxed mb-6">
              "${testimonial.comment}"
            </blockquote>
            
            <!-- Customer Info -->
            <div class="text-center border-t pt-4">
              <div class="font-semibold text-gray-900 mb-1">
                ${testimonial.name}
              </div>
              <div class="text-sm text-gray-500">
                ${testimonial.age ? `${testimonial.age}歳` : ''}
                ${testimonial.age && testimonial.location ? ' / ' : ''}
                ${testimonial.location ? testimonial.location : ''}
              </div>
            </div>
          </div>
        </div>
      `).join(''))}
    </div>
    
    <!-- CTA Section -->
    <div class="mt-16 text-center">
      <div class="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
        <i class="fas fa-heart text-4xl text-primary-500 mb-6"></i>
        <h3 class="font-mincho text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          あなたも幸せな結婚を
        </h3>
        <p class="text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
          一人ひとりに寄り添った丁寧なサポートで、理想のパートナーとの出会いをお手伝いします。
          まずは無料相談から始めませんか？
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact" class="btn btn-primary btn-lg">
            <i class="fas fa-comments mr-2"></i>
            無料相談を申し込む
          </a>
          <a href="/about" class="btn btn-outline btn-lg">
            <i class="fas fa-users mr-2"></i>
            私たちについて
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
`;
};