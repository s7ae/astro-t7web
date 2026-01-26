// 高级动画系统 v3.0 - 极致丝滑体验

// DOM加载完成后执行
window.addEventListener('DOMContentLoaded', function() {
  // 设置自定义属性以启用CSS动画
  document.documentElement.style.setProperty('--animate-ready', '1');
  
  // 标记页面已加载
  document.body.classList.add('page-loaded');
  
  // 初始化高级动画系统
  initAdvancedAnimations();
  
  // 初始化页面交互效果
  initPageInteractions();
  
  // 为所有页面元素分配合适的动画类
  assignAnimationsToElements();
  
  // 立即播放首屏动画
  playHeroAnimations();
  
  // 初始化视差滚动效果
  initParallaxEffects();
  
  // 初始化磁性吸附效果
  initMagneticEffects();
  
  // 初始化高级微交互
  initAdvancedMicroInteractions();
  
  // 初始化性能优化
  initPerformanceOptimizations();
});

// 初始化高级动画系统
function initAdvancedAnimations() {
  // 使用Intersection Observer来检测元素进入视口
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 激活动画
        entry.target.classList.add('animate-in');
        
        // 对于某些元素，添加额外的延迟类以创建级联效果
        if (entry.target.hasAttribute('data-animation-delay')) {
          const delay = entry.target.getAttribute('data-animation-delay');
          entry.target.style.animationDelay = delay;
        }
        
        // 动画完成后移除观察，避免重复触发
        observer.unobserve(entry.target);
      }
    });
  }, {
    // 当元素可见度达到10%时触发
    threshold: 0.1,
    // 提前100px触发动画，给用户更好的体验
    rootMargin: '0px 0px -100px 0px'
  });
  
  // 观察所有带有animate-on-scroll类的元素
  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });
}

// 为页面元素分配合适的动画类
function assignAnimationsToElements() {
  // 为不同类型的元素分配不同的动画
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
  
  // 遍历所有分配规则
  animationAssignments.forEach(({ selector, className, priority }) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      // 如果元素还没有动画类，则添加
      if (!element.classList.contains('animate-on-scroll')) {
        element.classList.add('animate-on-scroll');
        element.classList.add(className);
        
        // 为非首屏元素添加延迟，创建级联效果
        if (priority && index > 0) {
          element.setAttribute('data-animation-delay', `${index * 150}ms`);
        }
      }
    });
  });
  
  // 为所有未分类的可见元素添加基本动画
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

// 播放首屏动画
function playHeroAnimations() {
  // 获取首屏可见的元素
  const heroElements = document.querySelectorAll('.hero > *, .header, .container > *:first-child');
  
  // 立即激活动画，无需等待观察器触发
  heroElements.forEach((element, index) => {
    // 确保元素有动画类
    if (!element.classList.contains('animate-on-scroll')) {
      element.classList.add('animate-on-scroll');
      element.classList.add('animate-fade-in-up');
    }
    
    // 立即激活动画，添加微小的延迟以创建流畅的序列
    setTimeout(() => {
      element.classList.add('animate-in');
    }, index * 100);
  });
}

// 初始化页面交互效果
function initPageInteractions() {
  // 平滑滚动
  setupSmoothScrolling();
  
  // 导航栏滚动效果
  setupNavbarScrollEffects();
  
  // 元素悬停效果
  setupEnhancedHoverEffects();
  
  // 滚动触发背景渐变效果
  setupScrollGradientEffects();
}

// 平滑滚动功能
function setupSmoothScrolling() {
  // 为所有锚点链接添加平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        // 使用平滑滚动到目标位置
        window.scrollTo({
          top: target.offsetTop - 80, // 考虑导航栏高度
          behavior: 'smooth'
        });
        
        // 为目标元素添加焦点效果，提高可访问性
        target.classList.add('focus-target');
        setTimeout(() => {
          target.classList.remove('focus-target');
        }, 2000);
      }
    });
  });
}

// 导航栏滚动效果
function setupNavbarScrollEffects() {
  const navbar = document.querySelector('nav') || document.querySelector('.header');
  if (!navbar) return;
  
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    
    // 滚动时导航栏样式变化
    if (currentScrollY > 100) {
      navbar.classList.add('navbar-scrolled');
      navbar.classList.add('navbar-visible');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
    
    // 向上滚动时显示导航栏，向下滚动时隐藏（在一定滚动距离后）
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

// 增强的悬停效果
function setupEnhancedHoverEffects() {
  // 卡片元素悬停效果
  document.querySelectorAll('.card, .project-card, .member').forEach(card => {
    // 添加悬停效果类而非内联样式
    card.classList.add('hover-lift');
  });
  
  // 按钮悬停效果
  document.querySelectorAll('.btn, .button, .cta').forEach(btn => {
    btn.classList.add('hover-scale');
  });
  
  // 图片悬停效果
  document.querySelectorAll('img:not(.no-hover)').forEach(img => {
    img.classList.add('hover-zoom');
  });
  
  // 导航链接悬停效果
  document.querySelectorAll('nav a, .nav a').forEach(link => {
    link.classList.add('hover-glow');
  });
  
  // 为链接和按钮添加波纹效果
  setupRippleEffects();
}

// 波纹点击效果
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

// 滚动触发背景渐变效果
function setupScrollGradientEffects() {
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // 更新根元素的滚动进度变量
    document.documentElement.style.setProperty(
      '--scroll-progress', 
      (scrollPosition / (document.body.scrollHeight - window.innerHeight)).toString()
    );
    
    // 为当前可见的部分添加活动状态
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

// 页面加载动画序列
setTimeout(() => {
  document.body.classList.add('loaded-complete');
}, 800);

// 视差滚动效果
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll('.parallax, .parallax-slow, .parallax-medium, .parallax-fast');
  
  if (parallaxElements.length === 0) return;
  
  // 使用requestAnimationFrame优化性能
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
  
  // 监听滚动事件
  window.addEventListener('scroll', requestTick, { passive: true });
  
  // 初始更新
  updateParallax();
}

// 磁性吸附效果
function initMagneticEffects() {
  const magneticElements = document.querySelectorAll('.magnetic, .magnetic-hover');
  
  magneticElements.forEach(element => {
    element.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // 计算移动距离，限制最大移动范围
      const moveX = x * 0.15;
      const moveY = y * 0.15;
      
      this.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
    
    element.addEventListener('mouseleave', function() {
      // 鼠标离开时恢复原位
      this.style.transform = 'translate3d(0, 0, 0)';
    });
  });
}

// 高级微交互
function initAdvancedMicroInteractions() {
  // 3D卡片效果
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
  
  // 磁性文本效果
  const magneticTexts = document.querySelectorAll('.magnetic-text');
  
  magneticTexts.forEach(text => {
    const chars = text.innerText.split('');
    
    // 将每个字符包裹在span中
    text.innerHTML = '';
    chars.forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char; // 保留空格
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
        
        // 根据距离计算偏移量
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
  
  // 波纹点击效果增强
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
      
      // 添加样式
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

// 性能优化
function initPerformanceOptimizations() {
  // 检测设备性能
  const isLowPerformanceDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4 || 
                                  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // 如果是低性能设备，减少动画效果
  if (isLowPerformanceDevice) {
    document.body.classList.add('low-performance');
    
    // 减少粒子数量
    const particleCount = document.querySelector('.particle-count');
    if (particleCount) {
      particleCount.style.setProperty('--particle-count', '30');
    }
    
    // 禁用某些高消耗动画
    const highCostAnimations = document.querySelectorAll('.parallax-fast, .hover-3d, .card-3d');
    highCostAnimations.forEach(element => {
      element.classList.remove('parallax-fast', 'hover-3d', 'card-3d');
    });
  }
  
  // 使用Intersection Observer优化动画触发
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
    // 回退方案：直接添加动画类
    animatedElements.forEach(element => {
      element.classList.add('animate-in');
    });
  }
  
  // 优化滚动事件
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(function() {
      // 滚动相关的更新
      updateScrollEffects();
    });
  }, { passive: true });
  
  // 滚动效果更新函数
  function updateScrollEffects() {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // 更新滚动进度
    const scrollProgress = scrollY / (documentHeight - windowHeight);
    document.documentElement.style.setProperty('--scroll-progress', scrollProgress);
    
    // 更新导航栏状态
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



// 导航栏滚动效果
function addNavbarScrollEffect() {
  const header = document.querySelector('.header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 向下滚动时隐藏导航栏，向上滚动时显示
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    // 滚动超过一定距离时改变导航栏样式
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
  
  // 初始设置导航栏过渡
  header.style.transition = 'all 0.3s ease';
}

// 为卡片添加随机浮动动画
function addRandomFloatAnimations() {
  const cards = document.querySelectorAll('.card, .member');
  
  cards.forEach(card => {
    // 随机生成浮动动画持续时间和延迟
    const duration = 5 + Math.random() * 5; // 5-10秒
    const delay = Math.random() * 2; // 0-2秒
    
    card.style.animation = `floaty ${duration}s ease-in-out ${delay}s infinite`;
  });
}

// 页面完全加载后执行的函数
window.addEventListener('load', function() {
  // 增强图片悬停效果
  enhanceImageHoverEffects();
  
  // 为文本元素添加滚动动画
  addScrollAnimationToText();
  
  // 添加导航栏滚动效果
  addNavbarScrollEffect();
  
  // 添加随机浮动动画
  addRandomFloatAnimations();
  
  // 重新初始化滚动动画观察器，确保所有新添加的元素都被观察
  initScrollAnimations();
});

// 添加键盘导航增强效果
document.addEventListener('keydown', function(e) {
  // 空格或回车键触发按钮悬停效果
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

// 添加可访问性支持
function addAccessibilityFeatures() {
  // 为动画元素添加无障碍属性
  document.querySelectorAll('.animate, .scroll-animate').forEach(element => {
    element.setAttribute('aria-live', 'polite');
  });
}

// 初始化可访问性功能
addAccessibilityFeatures();

// 添加页面切换过渡效果
function addPageTransitionEffects() {
  // 页面离开时的过渡效果
  window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
  });
  
  // 页面切换过渡效果
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // 只对内部链接应用过渡效果
      if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto')) {
        e.preventDefault();
        
        // 创建过渡遮罩
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        document.body.appendChild(overlay);
        
        // 触发动画
        setTimeout(() => {
          overlay.style.opacity = '1';
        }, 10);
        
        // 页面跳转
        setTimeout(() => {
          window.location.href = href;
        }, 500);
      }
    });
  });
  
  // 高级动效增强
  function initAdvancedEffects() {
    // 高级按钮波纹效果
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
    
    // 高级卡片悬停效果
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
    
    // 高级文本效果
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
    
    // 高级导航栏效果
    const navbar = document.querySelector('.nav-advanced');
    if (navbar) {
      let lastScrollTop = 0;
      
      window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          // 向下滚动 - 隐藏导航栏
          navbar.style.transform = 'translateY(-100%)';
        } else {
          // 向上滚动 - 显示导航栏
          navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
      });
    }
    
    // 高级滚动指示器
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'advanced-scroll-indicator';
    document.body.appendChild(scrollIndicator);
    
    window.addEventListener('scroll', function() {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      scrollIndicator.style.width = scrollPercent + '%';
    });
  }
  
  // 初始化高级动效
  initAdvancedEffects();
}