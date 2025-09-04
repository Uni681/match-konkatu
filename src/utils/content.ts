import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { BlogPost, CMSContent } from '@/types';

// コンテンツディレクトリのパス
const CONTENT_DIR = path.join(process.cwd(), 'content');
const POSTS_DIR = path.join(CONTENT_DIR, 'posts');

/**
 * MarkdownをHTMLに変換する設定
 */
marked.setOptions({
  breaks: true,
  gfm: true,
});

/**
 * ブログ記事一覧を取得
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    if (!fs.existsSync(POSTS_DIR)) {
      return [];
    }

    const files = fs.readdirSync(POSTS_DIR);
    const posts: BlogPost[] = [];

    for (const file of files) {
      if (file.endsWith('.md')) {
        const slug = file.replace(/\.md$/, '');
        const post = await getBlogPost(slug);
        if (post) {
          posts.push(post);
        }
      }
    }

    // 日付順でソート（新しい順）
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

/**
 * 特定のブログ記事を取得
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(POSTS_DIR, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    const html = marked(content);

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      category: data.category || '婚活ノウハウ',
      date: data.date || new Date().toISOString(),
      content: html,
      featured_image: data.featured_image || '',
      tags: data.tags || [],
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

/**
 * カテゴリ別の記事を取得
 */
export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const allPosts = await getBlogPosts();
  return allPosts.filter(post => post.category === category);
}

/**
 * ホームページのコンテンツを取得
 */
export async function getHomeContent(): Promise<CMSContent | null> {
  try {
    const filePath = path.join(CONTENT_DIR, 'home.md');
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    
    return data as CMSContent;
  } catch (error) {
    console.error('Error reading home content:', error);
    return null;
  }
}

/**
 * 固定ページのコンテンツを取得
 */
export async function getPageContent(page: string): Promise<{ title: string; description: string; content: string } | null> {
  try {
    const filePath = path.join(CONTENT_DIR, `${page}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    const html = marked(content);

    return {
      title: data.title || '',
      description: data.description || '',
      content: html,
    };
  } catch (error) {
    console.error(`Error reading page content ${page}:`, error);
    return null;
  }
}

/**
 * サイト設定を取得
 */
export async function getSiteSettings() {
  try {
    const filePath = path.join(CONTENT_DIR, 'settings.yml');
    
    if (!fs.existsSync(filePath)) {
      return {
        site_name: 'MATCH（マッチ）本気の婚活',
        site_url: 'https://match-konkatsu.com',
        site_description: '神奈川県横浜市神奈川区にあるIBJ正規加盟店の結婚相談所',
        phone: '045-XXX-XXXX',
        email: 'info@match-konkatsu.com',
        address: '〒221-0000 神奈川県横浜市神奈川区○○町1-2-3',
        business_hours: '平日: 10:00〜19:00\n土曜: 10:00〜17:00\n日祝: 定休日',
        line_url: '',
        gtm_id: '',
      };
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    
    return data;
  } catch (error) {
    console.error('Error reading site settings:', error);
    return null;
  }
}

/**
 * パンくずリストを生成
 */
export function generateBreadcrumbs(pathname: string) {
  const breadcrumbs = [
    { name: 'ホーム', href: '/' }
  ];

  const segments = pathname.split('/').filter(segment => segment);
  
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const href = '/' + segments.slice(0, i + 1).join('/');
    
    let name = segment;
    
    // パス名を日本語に変換
    switch (segment) {
      case 'about':
        name = '私たちについて';
        break;
      case 'service':
        name = 'サービス';
        break;
      case 'price':
        name = '料金';
        break;
      case 'contact':
        name = 'お問い合わせ';
        break;
      case 'blog':
        name = 'ブログ';
        break;
      case 'policy':
        name = 'プライバシーポリシー';
        break;
      default:
        // ブログ記事の場合は記事タイトルを使用
        if (segments[i - 1] === 'blog') {
          // 実際の実装では記事タイトルを取得
          name = '記事詳細';
        }
    }
    
    breadcrumbs.push({ name, href });
  }

  return breadcrumbs;
}

/**
 * SEO用のメタデータを生成
 */
export function generateSEOMeta({
  title,
  description,
  ogImage = '/img/og-default.jpg',
  canonicalUrl,
  type = 'website'
}: {
  title: string;
  description: string;
  ogImage?: string;
  canonicalUrl?: string;
  type?: string;
}) {
  const siteTitle = 'MATCH（マッチ）本気の婚活';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
  
  return {
    title: fullTitle,
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogImage,
    ogType: type,
    canonicalUrl,
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: ogImage,
  };
}