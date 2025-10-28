// 关于页面文字滚动动画
(function() {
  'use strict';
  
  console.log('🚀 about-animation.js 加载完成');
  
  // 动画变量 - 使用全局变量
  window.pursuitInterval = null;
  window.animationStarted = false;
  
  // 动画函数 - 设为全局函数
  window.startWordAnimation = function() {
    if (window.animationStarted) {
      console.log('⚠️ 动画已经启动，跳过重复执行');
      return;
    }
    
    try {
      console.log('🎬 startWordAnimation 函数开始执行');
      
      const maskElement = document.querySelector('.aboutsiteTips .mask');
      console.log('🎯 找到mask元素:', maskElement);
      if (!maskElement) {
        console.log('❌ 未找到mask元素');
        return;
      }
      
      const spans = maskElement.querySelectorAll('span');
      console.log('📝 找到spans:', spans.length, spans);
      if (spans.length === 0) {
        console.log('❌ 未找到span元素');
        return;
      }
      
      let currentIndex = 0;
      
      // 初始化样式
      console.log('🎨 开始初始化样式...');
      spans.forEach((span, index) => {
        const isFirst = index === 0;
        span.style.cssText = `
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          transition: all 0.5s ease !important;
          opacity: ${isFirst ? '1' : '0'} !important;
          transform: translateY(${isFirst ? '0' : '20px'}) !important;
          color: #333 !important;
          font-size: 36px !important;
          font-weight: 700 !important;
        `;
        console.log(`设置span ${index} (${span.textContent}):`, isFirst ? '显示' : '隐藏');
      });
      
      // 启动动画循环
      console.log('⏰ 启动定时器，间隔2秒');
      window.pursuitInterval = setInterval(() => {
        console.log(`🔄 动画切换: ${currentIndex} -> ${(currentIndex + 1) % spans.length}`);
        console.log(`当前词: ${spans[currentIndex].textContent}`);
        
        spans[currentIndex].style.opacity = '0';
        spans[currentIndex].style.transform = 'translateY(-20px)';
        
        currentIndex = (currentIndex + 1) % spans.length;
        console.log(`下一词: ${spans[currentIndex].textContent}`);
        
        setTimeout(() => {
          spans[currentIndex].style.opacity = '1';
          spans[currentIndex].style.transform = 'translateY(0)';
          console.log(`✅ 显示: ${spans[currentIndex].textContent}`);
        }, 250);
      }, 2000);
      
      console.log('🎉 文字动画初始化完成');
      window.animationStarted = true;
      
    } catch (error) {
      console.error('❌ 文字动画错误:', error);
    }
  }
  
  // 启动函数
  function initAnimation() {
    console.log('🔍 尝试启动动画');
    
    // 检查是否在关于页面
    if (!document.querySelector('.aboutsiteTips')) {
      console.log('❌ 不在关于页面，跳过动画');
      return;
    }
    
    // 检查DOM是否准备好
    if (document.readyState === 'loading') {
      console.log('⏳ DOM未准备好，等待加载完成');
      document.addEventListener('DOMContentLoaded', function() {
        setTimeout(window.startWordAnimation, 1000);
      });
    } else {
      console.log('✅ DOM已准备好，延迟启动动画');
      setTimeout(window.startWordAnimation, 1000);
    }
  }
  
  // 立即尝试初始化
  initAnimation();
  
  // 清理函数
  window.addEventListener('beforeunload', function() {
    if (window.pursuitInterval) {
      clearInterval(window.pursuitInterval);
      console.log('🧹 清理动画定时器');
    }
  });
  
})();
