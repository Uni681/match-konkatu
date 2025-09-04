/**
 * MATCH婚活サイト - メインJavaScript
 * 軽量・高速・アクセシブルなWebアプリケーション
 */

(function() {
  'use strict';

  // DOM読み込み完了を待つ
  document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
  });

  /**
   * アプリケーション初期化
   */
  function initializeApp() {
    // モバイルメニューの初期化
    initializeMobileMenu();
    
    // スムーズスクロールの初期化
    initializeSmoothScroll();
    
    // FAQアコーディオンの初期化
    initializeFAQ();
    
    // フォームの初期化
    initializeForms();
    
    // 遅延読み込み画像の初期化
    initializeLazyImages();
    
    // アニメーションの初期化
    initializeAnimations();
    
    console.log('MATCH婚活サイト初期化完了');
  }

  /**
   * モバイルメニューの制御
   */
  function initializeMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', function() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
        
        // アクセシビリティのための処理
        if (!isExpanded) {
          mobileMenu.querySelector('a')?.focus();
        }
      });
      
      // ESCキーでメニューを閉じる
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
          menuToggle.setAttribute('aria-expanded', 'false');
          mobileMenu.classList.add('hidden');
          menuToggle.focus();
        }
      });
    }
  }

  /**
   * スムーズスクロール
   */
  function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // アクセシビリティ: フォーカスを移動
          target.focus();
          if (target !== document.activeElement) {
            target.setAttribute('tabindex', '-1');
            target.focus();
          }
        }
      });
    });
  }

  /**
   * FAQアコーディオン
   */
  function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const button = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      
      if (button && answer) {
        button.addEventListener('click', function() {
          const isExpanded = button.getAttribute('aria-expanded') === 'true';
          
          // 他のFAQを閉じる
          faqItems.forEach(otherItem => {
            if (otherItem !== item) {
              const otherButton = otherItem.querySelector('.faq-question');
              const otherAnswer = otherItem.querySelector('.faq-answer');
              
              if (otherButton && otherAnswer) {
                otherButton.setAttribute('aria-expanded', 'false');
                otherAnswer.style.maxHeight = '0';
                otherAnswer.style.opacity = '0';
              }
            }
          });
          
          // 現在のFAQの状態を切り替え
          if (isExpanded) {
            button.setAttribute('aria-expanded', 'false');
            answer.style.maxHeight = '0';
            answer.style.opacity = '0';
          } else {
            button.setAttribute('aria-expanded', 'true');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.opacity = '1';
          }
        });
        
        // 初期状態を設定
        answer.style.transition = 'max-height 0.3s ease-out, opacity 0.3s ease-out';
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        answer.style.overflow = 'hidden';
      }
    });
  }

  /**
   * フォームバリデーション
   */
  function initializeForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        if (!validateForm(form)) {
          e.preventDefault();
        }
      });
      
      // リアルタイムバリデーション
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('blur', function() {
          validateField(input);
        });
        
        input.addEventListener('input', function() {
          clearFieldError(input);
        });
      });
    });
  }

  /**
   * フォーム全体のバリデーション
   */
  function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  /**
   * 個別フィールドのバリデーション
   */
  function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // 必須チェック
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'この項目は必須です';
    }
    // メールアドレスチェック
    else if (field.type === 'email' && value && !isValidEmail(value)) {
      isValid = false;
      errorMessage = '正しいメールアドレスを入力してください';
    }
    // 電話番号チェック
    else if (field.type === 'tel' && value && !isValidPhone(value)) {
      isValid = false;
      errorMessage = '正しい電話番号を入力してください';
    }
    
    if (isValid) {
      clearFieldError(field);
    } else {
      showFieldError(field, errorMessage);
    }
    
    return isValid;
  }

  /**
   * メールアドレスバリデーション
   */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * 電話番号バリデーション
   */
  function isValidPhone(phone) {
    const phoneRegex = /^[0-9-\+\(\)\s]+$/;
    return phoneRegex.test(phone) && phone.replace(/[^0-9]/g, '').length >= 10;
  }

  /**
   * フィールドエラー表示
   */
  function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error text-red-600 text-sm mt-1';
    errorElement.textContent = message;
    errorElement.id = field.id + '-error';
    
    field.setAttribute('aria-describedby', errorElement.id);
    field.parentNode.appendChild(errorElement);
  }

  /**
   * フィールドエラークリア
   */
  function clearFieldError(field) {
    field.classList.remove('error');
    field.removeAttribute('aria-invalid');
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      field.removeAttribute('aria-describedby');
      existingError.remove();
    }
  }

  /**
   * 遅延読み込み画像
   */
  function initializeLazyImages() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            
            if (src) {
              img.setAttribute('src', src);
              img.removeAttribute('data-src');
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          }
        });
      });
      
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
      });
    }
  }

  /**
   * スクロールアニメーション
   */
  function initializeAnimations() {
    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      document.querySelectorAll('.animate-on-scroll').forEach(element => {
        animationObserver.observe(element);
      });
    }
  }

  /**
   * ハニーポット（スパム対策）
   */
  function createHoneypot(form) {
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website';
    honeypot.style.position = 'absolute';
    honeypot.style.left = '-9999px';
    honeypot.style.visibility = 'hidden';
    honeypot.setAttribute('tabindex', '-1');
    honeypot.setAttribute('autocomplete', 'off');
    
    form.appendChild(honeypot);
    
    form.addEventListener('submit', function(e) {
      if (honeypot.value) {
        e.preventDefault();
        console.log('Spam detected');
        return false;
      }
    });
  }

  // お問い合わせフォームがある場合はハニーポットを追加
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    createHoneypot(contactForm);
  }

})();