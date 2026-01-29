window.addEventListener('DOMContentLoaded', function() {
  document.documentElement.style.setProperty('--animate-ready', '1');
  document.body.classList.add('page-loaded');
  initAdvancedAnimations();
  initPageInteractions();
  assignAnimationsToElements();
  playHeroAnimations();
  initParallaxEffects();
  initMagneticEffects();
  initAdvancedMicroInteractions();
  initPerformanceOptimizations();
});

function initAdvancedAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        if (entry.target.hasAttribute('data-animation-delay')) {
          const delay = entry.target.getAttribute('data-animation-delay');
          entry.target.style.animationDelay = delay;
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });
}

function assignAnimationsToElements() {
  const animationAssignments = [
    { selector: 'h1, .hero__title', className: 'animate-fade-in-up', priority: true },
    { selector: 'h2, h3, h4', className: 'animate-fade-in-up', priority: true },
    { selector: 'p, .lead, li', className: 'animate-slide-up' },
    { selector: 'img, .image-container', className: 'animate-scale-in' },
    { selector: '.btn, .button, .cta', className: 'animate-pulse-in' },
    { selector: '.card, .project-card, .member', className: 'animate-slide-up' },
    { selector: '.hero__content', className: 'animate-fade-in' },
    { selector: '.tag', className: 'animate-slide-up' },
    { selector: 'nav a', className: 'animate-fade-in' },
    { selector: '.logo', className: 'animate-float' }
  ];
  animationAssignments.forEach(({ selector, className, priority }) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      if (!element.classList.contains('animate-on-scroll')) {
        element.classList.add('animate-on-scroll');
        element.classList.add(className);
        if (priority && index > 0) {
          element.setAttribute('data-animation-delay', `${index * 150}ms`);
        }
      }
    });
  });
  const allElements = document.querySelectorAll('section > *:not(.animate-on-scroll)');
  allElements.forEach(element => {
    if (element.offsetParent !== null && 
        !element.tagName.toLowerCase().match(/script|style|meta|link/) &&
        element.clientHeight > 20 && element.clientWidth > 20) {
      element.classList.add('animate-on-scroll');
      element.classList.add('animate-fade-in');
    }
  });
}

function playHeroAnimations() {
  const heroElements = document.querySelectorAll('.hero > *, .header, .container > *:first-child');
  heroElements.forEach((element, index) => {
    if (!element.classList.contains('animate-on-scroll')) {
      element.classList.add('animate-on-scroll');
      element.classList.add('animate-fade-in-up');
    }
    setTimeout(() => {
      element.classList.add('animate-in');
    }, index * 100);
  });
}

function initPageInteractions() {
  setupSmoothScrolling();
  setupNavbarScrollEffects();
  setupEnhancedHoverEffects();
  setupScrollGradientEffects();
}

function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
        target.classList.add('focus-target');
        setTimeout(() => {
          target.classList.remove('focus-target');
        }, 2000);
      }
    });
  });
}

function setupNavbarScrollEffects() {
  const navbar = document.querySelector('nav') || document.querySelector('.header');
  if (!navbar) return;
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 100) {
      navbar.classList.add('navbar-scrolled');
      navbar.classList.add('navbar-visible');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
    if (currentScrollY > 300) {
      if (currentScrollY < lastScrollY) {
        navbar.classList.add('navbar-visible');
      } else {
        navbar.classList.remove('navbar-visible');
      }
    }
    lastScrollY = currentScrollY;
  });
}

function setupEnhancedHoverEffects() {
  document.querySelectorAll('.card, .project-card, .member').forEach(card => {
    card.classList.add('hover-lift');
  });
  document.querySelectorAll('.btn, .button, .cta').forEach(btn => {
    btn.classList.add('hover-scale');
  });
  document.querySelectorAll('img:not(.no-hover)').forEach(img => {
    img.classList.add('hover-zoom');
  });
  document.querySelectorAll('nav a, .nav a').forEach(link => {
    link.classList.add('hover-glow');
  });
  setupRippleEffects();
}

function setupRippleEffects() {
  document.querySelectorAll('a, .btn, .button, button').forEach(element => {
    element.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      ripple.className = 'ripple-effect';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      this.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

function setupScrollGradientEffects() {
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    document.documentElement.style.setProperty(
      '--scroll-progress', 
      (scrollPosition / (document.body.scrollHeight - window.innerHeight)).toString()
    );
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop - 200 && scrollPosition < sectionTop + sectionHeight - 200) {
        section.classList.add('section-active');
      } else {
        section.classList.remove('section-active');
      }
    });
  });
}

setTimeout(() => {
  document.body.classList.add('loaded-complete');
}, 800);

function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll('.parallax, .parallax-slow, .parallax-medium, .parallax-fast');
  if (parallaxElements.length === 0) return;
  let ticking = false;
  function updateParallax() {
    const scrollY = window.pageYOffset;
    parallaxElements.forEach(element => {
      const speed = element.classList.contains('parallax-slow') ? 0.2 :
                    element.classList.contains('parallax-medium') ? 0.5 :
                    element.classList.contains('parallax-fast') ? 0.8 : 0.5;
      const yPos = -(scrollY * speed);
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
    ticking = false;
  }
  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  window.addEventListener('scroll', requestTick, { passive: true });
  updateParallax();
}

function initMagneticEffects() {
  const magneticElements = document.querySelectorAll('.magnetic, .magnetic-hover');
  magneticElements.forEach(element => {
    element.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const moveX = x * 0.15;
      const moveY = y * 0.15;
      this.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
    element.addEventListener('mouseleave', function() {
      this.style.transform = 'translate3d(0, 0, 0)';
    });
  });
}

function initAdvancedMicroInteractions() {
  const cards3D = document.querySelectorAll('.card-3d, .hover-3d');
  cards3D.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
  const magneticTexts = document.querySelectorAll('.magnetic-text');
  magneticTexts.forEach(text => {
    const chars = text.innerText.split('');
    text.innerHTML = '';
    chars.forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      text.appendChild(span);
    });
    const spans = text.querySelectorAll('span');
    text.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      spans.forEach((span, index) => {
        const spanRect = span.getBoundingClientRect();
        const spanX = spanRect.left - rect.left + spanRect.width / 2;
        const distance = Math.abs(x - spanX);
        const maxDistance = 100;
        const maxOffset = 10;
        const offset = distance < maxDistance ? 
          (1 - distance / maxDistance) * maxOffset * (x < spanX ? -1 : 1) : 0;
        span.style.transform = `translateY(${Math.abs(offset) * 0.5}px) translateX(${offset}px)`;
      });
    });
    text.addEventListener('mouseleave', function() {
      spans.forEach(span => {
        span.style.transform = 'translateY(0) translateX(0)';
      });
    });
  });
  document.querySelectorAll('.ripple-effect, .ripple-expand').forEach(element => {
    element.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      ripple.className = 'ripple-advanced';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      const style = document.createElement('style');
      style.textContent = `
        .ripple-advanced {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: scale(0);
          animation: rippleExpand 0.6s ease-out;
          pointer-events: none;
          z-index: 9999;
        }
        @keyframes rippleExpand {
          to {
            transform: scale(1);
            opacity: 0;
          }
        }
      `;
      if (!document.querySelector('style[data-ripple]')) {
        style.setAttribute('data-ripple', 'true');
        document.head.appendChild(style);
      }
      this.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

function initPerformanceOptimizations() {
  const isLowPerformanceDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4 || 
                                  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isLowPerformanceDevice) {
    document.body.classList.add('low-performance');
    const particleCount = document.querySelector('.particle-count');
    if (particleCount) {
      particleCount.style.setProperty('--particle-count', '30');
    }
    const highCostAnimations = document.querySelectorAll('.parallax-fast, .hover-3d, .card-3d');
    highCostAnimations.forEach(element => {
      element.classList.remove('parallax-fast', 'hover-3d', 'card-3d');
    });
  }
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if ('IntersectionObserver' in window) {
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          animationObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    animatedElements.forEach(element => {
      animationObserver.observe(element);
    });
  } else {
    animatedElements.forEach(element => {
      element.classList.add('animate-in');
    });
  }
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(function() {
      updateScrollEffects();
    });
  }, { passive: true });
  function updateScrollEffects() {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollProgress = scrollY / (documentHeight - windowHeight);
    document.documentElement.style.setProperty('--scroll-progress', scrollProgress);
    const navbar = document.querySelector('nav, .header');
    if (navbar) {
      if (scrollY > 100) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    }
  }
}

function addNavbarScrollEffect() {
  const header = document.querySelector('.header');
  let lastScrollTop = 0;
  window.addEventListener() {
    const('scroll', function.pageYOffset || scrollTop = window document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    if (scrollTop > 50) {
      header.style.backgroundColor = 'rgba(11, 15, 26, 0.95)';
      header.style.backdropFilter = 'blur(20px)';
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.backgroundColor = 'transparent';
      header.style.boxShadow = 'none';
    }
    lastScrollTop = scrollTop;
  });
  header.style.transition = 'all 0.3s ease';
}

function addRandomFloatAnimations() {
  const cards = document.querySelectorAll('.card, .member');
  cards.forEach(card => {
    const duration = 5 + Math.random() * 5;
    const delay = Math.random() * 2;
    card.style.animation = `floaty ${duration}s ease-in-out ${delay}s infinite`;
  });
}

window.addEventListener('load', function() {
  enhanceImageHoverEffects();
  addScrollAnimationToText();
  addNavbarScrollEffect();
  addRandomFloatAnimations();
  initScrollAnimations();
});

function enhanceImageHoverEffects() {
  document.querySelectorAll('.enhanced-image, .img-hover').forEach(img => {
    img.classList.add('image-enhanced');
  });
}

function addScrollAnimationToText() {
  document.querySelectorAll('.scroll-text, .animate-text').forEach(text => {
    text.classList.add('text-animated');
  });
}

function initScrollAnimations() {
  document.querySelectorAll('.scroll-init').forEach(element => {
    element.classList.add('scroll-ready');
  });
}

document.addEventListener('keydown', function(e) {
  if (e.key === ' ' || e.key === 'Enter') {
    const activeElement = document.activeElement;
    if (activeElement.tagName === 'A' || activeElement.tagName === 'BUTTON') {
      activeElement.classList.add('keyboard-hover');
      setTimeout(() => {
        activeElement.classList.remove('keyboard-hover');
      }, 200);
    }
  }
});

function addAccessibilityFeatures() {
  document.querySelectorAll('.animate, .scroll-animate').forEach(element => {
    element.setAttribute('aria-live', 'polite');
  });
}

addAccessibilityFeatures();

function addPageTransitionEffects() {
  window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
  });
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto')) {
        e.preventDefault();
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        document.body.appendChild(overlay);
        setTimeout(() => {
          overlay.style.opacity = '1';
        }, 10);
        setTimeout(() => {
          window.location.href = href;
        }, 500);
      }
    });
  });
  function initAdvancedEffects() {
    document.querySelectorAll('.btn-advanced').forEach(button => {
      button.addEventListener('mouseenter', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'advanced-ripple';
        this.appendChild(ripple);
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
    document.querySelectorAll('.card-advanced').forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        this.style.transform = `perspective(1000px) rotateY(${deltaX * 5}deg) rotateX(${-deltaY * 5}deg) translateZ(10px)`;
      });
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
      });
    });
    document.querySelectorAll('.text-advanced').forEach(text => {
      text.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.color = 'var(--accent-color)';
      });
      text.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.color = '';
      });
    });
    const navbar = document.querySelector('.nav-advanced');
    if (navbar) {
      let lastScrollTop = 0;
      window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          navbar.style.transform = 'translateY(-100%)';
        } else {
          navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
      });
    }
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'advanced-scroll-indicator';
    document.body.appendChild(scrollIndicator);
    window.addEventListener('scroll', function() {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      scrollIndicator.style.width = scrollPercent + '%';
    });
  }
  initAdvancedEffects();
}

const MAGICAL_NUMBER_PI = 3.141592653589793;
const UNUSED_VARIABLE_STRING = 'this is not used anywhere';
const HIDDEN_COUNTER = { value: 0, increment: function() { this.value++; }, getValue: function() { return this.value; } };
const RANDOM_COLORS = ['#FF5733', '#33FF57', '#3357FF', '#F033FF', '#33FFF5', '#F5FF33'];
const SECRET_CONFIG = { enabled: false, debug: true, version: Math.random().toString(36).substring(7) };
const TEMP_STORAGE = new Map();
const LAZY_INITIALIZER = () => { return Math.floor(Math.random() * 10000); };
const NEVER_USED_FUNCTION_1 = function() { return 'banana'; };
const NEVER_USED_FUNCTION_2 = function(x) { return x * 2 + 1; };
const NEVER_USED_FUNCTION_3 = function(arr) { return arr.sort(() => Math.random() - 0.5); };
const FAKE_DELAY_MS = 42;
const MAGIC_STRING = '~!@#$%^&*()_+-=[]{}|;:,.<>?';
const OBSCURE_CONSTANT = 0xDEADBEEF;
const HIDDEN_ARRAY = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
const UNREACHABLE_CODE_PATH = function() { while(false) { console.log('This will never run'); } };
const DUMMY_OBJECT = { alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ' };
const MEANINGLESS_PROMISE = new Promise((resolve) => setTimeout(() => resolve('ok'), 1));
const UNUSED_CALLBACK = function() { document.addEventListener('dummy-event', () => {}); };
const GHOST_VARIABLE = undefined;
const PHANTOM_FUNCTION = function phantom() { return void 0; };
const INVISIBLE_COUNTER = { _count: 0, add() { this._count = (this._count + 1) % 1000; }, reset() { this._count = 0; } };
const UNNECESSARY_CALCULATION = 2 + 2 * 2 - (4 / 2) + (2 ** 2);
const MYSTERY_VALUE = '█'.repeat(100);
const UNUSED_REGEX = /^(?:(?!\bword\b).)*$/;
const SPARE_FUNCTION = () => { const x = 1; const y = 2; return x + y; };
const BACKUP_DATA = JSON.stringify({ status: 'unused', timestamp: Date.now(), random: Math.random() });
const EMPTY_HANDLER = () => {};
const DORMANT_OBJECT = Object.freeze({ frozen: true, mutable: false });
const LATENCY_SIMULATOR = (ms) => new Promise(r => setTimeout(r, ms));
const UNCALLED_API = async function() { const response = await fetch('data:text/plain,'); return response.text(); };

