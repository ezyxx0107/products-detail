// utils.js
(function(window, $) {
    'use strict';
    
    var Utils = {
      /**
       * 获取指定范围内的随机整数
       */
      getRandomNum: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      },
  
      /**
       * 格式化倒计时时间
       */
      formatTime: function(leftTime) {
        var leftH = Math.floor((leftTime / (1000 * 60 * 60)) % 24);
        var leftM = Math.floor((leftTime / (1000 * 60)) % 60);
        var leftS = Math.floor((leftTime / 1000) % 60);
        
        return {
          hour: leftH >= 10 ? leftH : "0" + leftH,
          minute: leftM >= 10 ? leftM : "0" + leftM,
          second: leftS >= 10 ? leftS : "0" + leftS
        };
      },
  
      /**
       * 计算总价
       */
      calcTotal: function(price, num) {
        var result = Number(price) * Number(num);
        return result.toFixed(0);
      },
  
      /**
       * 懒加载图片
       */
      lazyLoadImages: function(selector) {
        selector = selector || ".lazy-load";
        var images = document.querySelectorAll(selector);
        var config = {
          rootMargin: "0px 0px 1300px 0px",
          threshold: 0
        };
  
        var lazyLoadObserver = new IntersectionObserver(function(entries, observer) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              var image = entry.target;
              var dataSrc = image.getAttribute("data-src");
              if (dataSrc) {
                image.src = dataSrc;
                image.removeAttribute("data-src");
              }
              observer.unobserve(image);
            }
          });
        }, config);
  
        for (var i = 0; i < images.length; i++) {
          lazyLoadObserver.observe(images[i]);
        }
      },
  
      /**
       * 预加载图片
       */
      preloadImages: function(imageArray) {
        if (!Array.isArray(imageArray)) return;
  
        if (Array.isArray(imageArray[0])) {
          // 二维数组
          for (var i = 0; i < imageArray.length; i++) {
            var subArray = imageArray[i];
            for (var j = 0; j < subArray.length; j++) {
              if (subArray[j]) new Image().src = subArray[j];
            }
          }
        } else {
          // 一维数组
          for (var i = 0; i < imageArray.length; i++) {
            if (imageArray[i]) new Image().src = imageArray[i];
          }
        }
      },
  
      /**
       * 防抖函数
       */
      debounce: function(func, wait) {
        var timer;
        return function executedFunction() {
          var context = this;
          var args = arguments;
          var later = function() {
            clearTimeout(timer);
            func.apply(context, args);
          };
          clearTimeout(timer);
          timer = setTimeout(later, wait);
        };
      },
  
      /**
       * 检测设备类型
       */
      detectDevice: function() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        var isAndroid = /android/i.test(userAgent);
        var isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
        var isPC = !isAndroid && !isIOS && !/Iron/.test(userAgent);
  
        return { isAndroid: isAndroid, isIOS: isIOS, isPC: isPC };
      },
  
      /**
       * 平滑滚动到元素
       */
      smoothScrollTo: function(targetElement, options) {
        var defaultOptions = {
          offset: 0,
          duration: 500,
          behavior: 'smooth'
        };
        
        var config = $.extend({}, defaultOptions, options);
        var targetPosition = targetElement.offsetTop - config.offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: config.behavior
        });
      }
    };
  
    // 暴露到全局
    window.AppUtils = Utils;
    
  })(window, jQuery);