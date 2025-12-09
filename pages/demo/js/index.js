// index.js - 修复动画版本
(function(window, $) {
    'use strict';
  
    // ==================== 工具函数 ====================
    var Utils = {
      getRandomNum: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      },
  
      calcTotal: function(price, num) {
        var result = Number(price) * Number(num);
        return result.toFixed(0);
      },
  
      detectDevice: function() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        var isAndroid = /android/i.test(userAgent);
        var isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
        var isPC = !isAndroid && !isIOS && !/Iron/.test(userAgent);
        return { isAndroid: isAndroid, isIOS: isIOS, isPC: isPC };
      },
  
      debounce: function(func, wait) {
        var timer;
        return function() {
          var context = this;
          var args = arguments;
          clearTimeout(timer);
          timer = setTimeout(function() {
            func.apply(context, args);
          }, wait);
        };
      }
    };
  
    // ==================== 倒计时模块 ====================
    var Countdown = {
      endTimeG: null,
      intervalId: null,
  
      init: function() {
        this.setupNewCountdown();
        this.startTimer();
      },
  
      setupNewCountdown: function() {
        var randomHour = Utils.getRandomNum(1, 9);
        var currentTime = new Date();
        this.endTimeG = currentTime.setHours(currentTime.getHours() + randomHour);
      },
  
      cutDownTime: function() {
        var nowTime = new Date();
        var endTime = new Date(this.endTimeG);
        var leftTime = endTime.getTime() - nowTime.getTime();
        
        if (leftTime < 0) {
          this.setupNewCountdown();
          leftTime = 0;
        }
        
        var leftH = Math.floor((leftTime / (1000 * 60 * 60)) % 24),
            leftM = Math.floor((leftTime / (1000 * 60)) % 60),
            leftS = Math.floor((leftTime / 1000) % 60);
            
        leftH = leftH >= 10 ? leftH : "0" + leftH;
        leftM = leftM >= 10 ? leftM : "0" + leftM;
        leftS = leftS >= 10 ? leftS : "0" + leftS;
  
        return {
          hour: leftH,
          minute: leftM,
          second: leftS
        };
      },
  
      startTimer: function() {
        var self = this;
        if (this.intervalId) clearInterval(this.intervalId);
        
        this.intervalId = setInterval(function() {
          var cutDownTimeText = self.cutDownTime();
          $(".sp_top_cut_down .sp_left_view .sp_hour").html(cutDownTimeText.hour);
          $(".sp_top_cut_down .sp_left_view .sp_minute").html(cutDownTimeText.minute);
          $(".sp_top_cut_down .sp_left_view .sp_second").html(cutDownTimeText.second);
        }, 1000);
      },
  
      cleanup: function() {
        if (this.intervalId) clearInterval(this.intervalId);
      }
    };
  
    // ==================== 图片管理模块 ====================
    var ImageManager = {
      spImgList: [
        "./image/20251204-p1.png",
        "./image/20251204-p2.png",
        "./image/20251204-p3.png",
        "./image/20251204-p4.png",
        "./image/20251204-p5.png",
        "./image/20251204-p6.png",
        "./image/20251204-p7.png",
        "./image/20251204-p8.webp",
        "./image/20251204-p9.png",
        "./image/20251204-p10.png",
        "./image/20251204-p1-s.png",
        "./image/20251204-p2-s.png",
        "./image/20251204-p3-s.png",
        "./image/20251204-p4-s.png",
        "./image/20251204-p5-s.png",
        "./image/20251204-p6-s.png",
        "./image/20251204-p7-s.png",
        "./image/20251204-p8-s.png",
        "./image/20251204-p9-s.png",
        "./image/20251204-p10-s.png",
        "./image/20251204-b1.png",
        "./image/20251204-b2.png",
        "./image/20251204-b3.png"
      ],
  
      lazyLoadImages: function() {
        var images = document.querySelectorAll(".lazy-load");
        var config = {
          rootMargin: "0px 0px 1300px 0px",
          threshold: 0,
        };
  
        if (!window.IntersectionObserver) {
          // 如果不支持 IntersectionObserver，使用回退方案
          this.lazyLoadFallback();
          return;
        }
  
        var lazyLoadObserver = new IntersectionObserver(function(entries, observer) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              var image = entry.target;
              var dataSrc = image.getAttribute("data-src");
              if (dataSrc) {
                image.src = dataSrc;
                image.removeAttribute("data-src");
              }
              lazyLoadObserver.unobserve(image);
            }
          });
        }, config);
  
        for (var i = 0; i < images.length; i++) {
          lazyLoadObserver.observe(images[i]);
        }
      },
  
      lazyLoadFallback: function() {
        var images = document.querySelectorAll(".lazy-load");
        for (var i = 0; i < images.length; i++) {
          var image = images[i];
          var dataSrc = image.getAttribute("data-src");
          if (dataSrc) {
            image.src = dataSrc;
            image.removeAttribute("data-src");
          }
        }
      },
  
      preloadImages: function(imageArray) {
        if (Array.isArray(imageArray[0])) {
          for (var i = 0; i < imageArray.length; i++) {
            var subArray = imageArray[i];
            for (var j = 0; j < subArray.length; j++) {
              if (subArray[j]) {
                var img = new Image();
                img.src = subArray[j];
              }
            }
          }
        } else {
          for (var i = 0; i < imageArray.length; i++) {
            if (imageArray[i]) {
              var img = new Image();
              img.src = imageArray[i];
            }
          }
        }
      }
    };
  
    // ==================== Swiper配置模块 ====================
    var SwiperManager = {
      swipers: {},
  
      initAll: function() {
        // 顶部淡入淡出轮播
        this.swipers.fadeTop = new Swiper(".sp-swiper-fade-top", {
          spaceBetween: 10,
          effect: "fade",
          autoplay: {
            disableOnInteraction: false,
            delay: 2000,
          },
          speed: 2000,
        });
  
        // 按钮轮播
        this.swipers.btnLoop = new Swiper(".sp-btn-loop", {
          spaceBetween: 10,
          autoplay: {
            disableOnInteraction: false,
            reverseDirection: true,
          },
          loop: true,
        });
  
        // 产品选择轮播
        this.swipers.product = new Swiper(".sp-swiper-pro", {
          speed: 1,
          spaceBetween: 0,
        });
  
        // PC轮播
        this.swipers.center = new Swiper(".sp-swiper2", {
          autoplay: {
            disableOnInteraction: false,
          },
          slidesPerView: "auto",
          spaceBetween: 20,
          centeredSlides: true,
          loop: true,
          navigation: {
            nextEl: ".sp-swiper-btn-next",
            prevEl: ".sp-swiper-btn-prev",
          },
        });
  
        // 移动端轮播
        this.swipers.mobile = new Swiper(".sp-swiper2-m", {
          autoplay: {
            disableOnInteraction: false,
          },
          slidesPerView: 1,
          spaceBetween: 20,
          centeredSlides: true,
          loop: true,
          navigation: {
            nextEl: ".sp-swiper-btn-next-m",
            prevEl: ".sp-swiper-btn-prev-m",
          },
        });

        // sp-part3 轮播（4张图片，带分页指示器，无导航按钮）
        this.swipers.part3 = new Swiper(".sp-swiper-part3", {
          autoplay: {
            disableOnInteraction: false,
            delay: 3000,
          },
          loop: true,
          pagination: {
            el: ".sp-swiper-part3 .swiper-pagination",
            clickable: true,
          },
        });

        // 移动端 sp-part2 轮播（默认展示3个）
        if (document.body.clientWidth <= 1080) {
          this.swipers.part2 = new Swiper(".sp-part2-swiper", {
            slidesPerView: 3,
            spaceBetween: 20,
            loop: true,
            autoplay: {
              disableOnInteraction: false,
              delay: 3000,
            },
          });
        }

        // jQuery跑马灯
        if ($.fn.slide) {
          jQuery(".sp-scroll2").slide({
            mainCell: ".nav-imgs",
            autoPlay: true,
            effect: "leftMarquee",
            interTime: 12,
            vis: 1,
            scroll: 1,
          });
        }
      },
  
      getProductSwiper: function() {
        return this.swipers.product;
      },
  
      cleanup: function() {
        for (var key in this.swipers) {
          if (this.swipers.hasOwnProperty(key)) {
            var swiper = this.swipers[key];
            if (swiper && typeof swiper.destroy === 'function') {
              swiper.destroy(true, true);
            }
          }
        }
        this.swipers = {};
      }
    };
  
    // ==================== 产品选择模块 ====================
    var ProductSelector = {
      price1: 149,
      price2: 298,
      sptextList: ["X 10pcs", "X 30pcs", "X 50pcs"],
      productSwiper: null,
  
      init: function(swiper) {
        this.productSwiper = swiper;
        this.bindEvents();
        this.updatePrices(); // 初始更新价格
      },
  
      bindEvents: function() {
        var self = this;
        
        // 颜色/数量选项
        $(".sp-option").click(function() {
          $(this).siblings().removeClass("active");
          $(this).addClass("active");
          self.updateDisplay();
        });
  
        // 快速跳过
        $(".sp-btn-skip").click(function() {
          $(".sp-num .sp-option").removeClass("active");
          $(".sp-num .sp-option").eq(2).addClass("active");
          self.updateDisplay();
        });
  
        // 额外套餐
        $(".sp-extra-box").click(function() {
          $(this).toggleClass("sp-active");
          self.updateDisplay();
        });
  
        // 数量加减
        $(".sp-reduce").click(function() {
          var input = $(this).siblings("input")[0];
          var num = Number(input.value) - 1;
          if (num > 0) {
            input.value = num;
          }
          self.updatePrices();
        });
  
        $(".sp-add").click(function() {
          var input = $(this).siblings("input")[0];
          var num = Number(input.value) + 1;
          input.value = num;
          self.updatePrices();
        });
      },
  
      updateDisplay: function() {
        var colorOptions = $(".sp-color .sp-option.active").index();
        var numOptions = $(".sp-num .sp-option.active").index();
  
        var _index;
        if ($(".sp-extra-box").hasClass("sp-active")) {
          _index = colorOptions + 10;
        } else {
          _index = colorOptions;
        }
  
        $(".sp-num-tip").text(this.sptextList[numOptions]);
  
        if (this.productSwiper) {
          this.productSwiper.slideToLoop(_index);
        }
  
        this.updatePrices();
      },
  
      updatePrices: function() {
        var input = $("#calcNumber")[0];
        if (input) {
          var quantity = Number(input.value);
          $("#sp_price1").html(Utils.calcTotal(this.price1, quantity));
          $("#sp_price2").html(Utils.calcTotal(this.price2, quantity));
        }
      }
    };
  
    // ==================== 响应式布局模块 ====================
    var ResponsiveLayout = {
      init: function() {
        this.updateZoom();
        this.bindResize();
      },
  
      updateZoom: function() {
        $("#root").css("zoom", "normal");
        if (document.body.clientWidth <= 1080) {
          var scale = document.body.clientWidth / 1080;
          $("#root").css("zoom", scale);
        } else {
          var scale = document.body.clientWidth / 1920;
          $("#root").css("zoom", scale);
        }
      },
  
      bindResize: function() {
        var self = this;
        var timer;
        
        window.addEventListener("resize", function() {
          if (timer) clearTimeout(timer);
          timer = setTimeout(function() {
            self.updateZoom();
          }, 100);
        });
      }
    };
  
    // ==================== 动画模块（修复版） ====================
    var AnimationManager = {
      observers: [],
  
      init: function() {
        this.initGraduallyAnimations();
        this.initFadeAnimations();
        
        // 强制检查一次，确保初始可见的元素有动画
        setTimeout(function() {
          AnimationManager.checkVisibleAnimations();
        }, 300);
      },
  
      initGraduallyAnimations: function() {
        var graduallyList = document.getElementsByClassName("gradually");
        
        for (var i = 0; i < graduallyList.length; i++) {
          this.setupGraduallyObserver(graduallyList[i]);
        }
      },
  
      setupGraduallyObserver: function(gradually) {
        var spans = gradually.querySelectorAll("span");
        var paragraph = gradually.querySelector(".sp-sub-title");
  
        // 创建观察器
        var observer = new IntersectionObserver(
          function(entries) {
            entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                // 给每个 span 和 i 动画
                for (var j = 0; j < spans.length; j++) {
                  var span = spans[j];
                  span.style.animation = "swift-up-fade 0.5s ease forwards";
                  span.style.animationDelay = (j * 0.1) + "s";
  
                  var iElement = span.querySelector("i");
                  if (iElement) {
                    iElement.style.animation = "swift-up-fade 0.5s ease forwards";
                    iElement.style.animationDelay = (j * 0.1) + "s";
                  }
                }
  
                // 段落
                var totalDelay = spans.length * 0.1 + 0.3;
                if (paragraph) {
                  paragraph.style.animation = "swift-up-fade 0.5s ease forwards";
                  paragraph.style.animationDelay = totalDelay + "s";
                }
  
                observer.unobserve(gradually);
              }
            });
          },
          {
            threshold: 0.3,
            rootMargin: "0px 0px -100px 0px"
          }
        );
        
        this.observers.push(observer);
        observer.observe(gradually);
      },
  
      initFadeAnimations: function() {
        this.initFadeBoxAnimations('.sp-fade-box', 'sp-fade-in', 0.5, '.sp-ani');
        this.initFadeBoxAnimations('.sp-fade-box2', 'sp-fade-left', 0.3, '.sp-ani2');
      },
  
      initFadeBoxAnimations: function(selector, animationName, delayIncrement, targetSelector) {
        var elements = document.getElementsByClassName(selector.replace('.', ''));
        
        for (var i = 0; i < elements.length; i++) {
          this.setupFadeBoxObserver(elements[i], selector, animationName, delayIncrement, targetSelector);
        }
      },
  
      setupFadeBoxObserver: function(element, selector, animationName, delayIncrement, targetSelector) {
        var targetClass = selector === '.sp-fade-box' ? '.sp-ani' : '.sp-ani2';
        var animatedElements = element.querySelectorAll(targetSelector || targetClass);
        
        if (animatedElements.length === 0) return;
  
        var observer = new IntersectionObserver(
          function(entries) {
            entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                for (var j = 0; j < animatedElements.length; j++) {
                  var el = animatedElements[j];
                  el.style.animation = animationName + " 1s ease forwards";
                  el.style.animationDelay = (j * delayIncrement + 0.5) + "s";
                }
                observer.unobserve(element);
              }
            });
          },
          {
            threshold: 0.3,
            rootMargin: "0px 0px -100px 0px"
          }
        );
        
        this.observers.push(observer);
        observer.observe(element);
      },
  
      // 检查当前可见的元素并触发动画
      checkVisibleAnimations: function() {
        // 检查 gradually 元素
        var graduallyList = document.getElementsByClassName("gradually");
        for (var i = 0; i < graduallyList.length; i++) {
          var rect = graduallyList[i].getBoundingClientRect();
          var isVisible = (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
          );
          
          if (isVisible) {
            // 如果元素可见但还没有动画，手动触发
            if (!graduallyList[i].classList.contains('animated')) {
              this.triggerGraduallyAnimation(graduallyList[i]);
              graduallyList[i].classList.add('animated');
            }
          }
        }
        
        // 检查 fade-box 元素
        var fadeBoxes = document.querySelectorAll('.sp-fade-box, .sp-fade-box2');
        for (var j = 0; j < fadeBoxes.length; j++) {
          var rect = fadeBoxes[j].getBoundingClientRect();
          var isVisible = (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
          );
          
          if (isVisible && !fadeBoxes[j].classList.contains('animated')) {
            fadeBoxes[j].classList.add('animated');
          }
        }
      },
  
      triggerGraduallyAnimation: function(gradually) {
        var spans = gradually.querySelectorAll("span");
        var paragraph = gradually.querySelector(".sp-sub-title");
  
        for (var j = 0; j < spans.length; j++) {
          var span = spans[j];
          span.style.animation = "swift-up-fade 0.5s ease forwards";
          span.style.animationDelay = (j * 0.1) + "s";
  
          var iElement = span.querySelector("i");
          if (iElement) {
            iElement.style.animation = "swift-up-fade 0.5s ease forwards";
            iElement.style.animationDelay = (j * 0.1) + "s";
          }
        }
  
        var totalDelay = spans.length * 0.1 + 0.3;
        if (paragraph) {
          paragraph.style.animation = "swift-up-fade 0.5s ease forwards";
          paragraph.style.animationDelay = totalDelay + "s";
        }
      },
  
      cleanup: function() {
        for (var i = 0; i < this.observers.length; i++) {
          if (this.observers[i] && this.observers[i].disconnect) {
            this.observers[i].disconnect();
          }
        }
        this.observers = [];
      }
    };
  
    // ==================== 交互模块 ====================
    var InteractionManager = {
      initNum: 0,
  
      init: function() {
        this.bindEvents();
        this.bindScrollEvents();
      },
  
      bindEvents: function() {
        var self = this;
        
        // 菜单
        $(".sp-menu-btn").click(function(e) {
          e.stopPropagation();
          $(".sp-menu-mask").show();
        });
  
        $(".sp-menu-mask").click(function(e) {
          $(".sp-menu-mask").hide();
        });
  
        // 阻止菜单内容区域的点击事件冒泡
        $(".sp-menu").click(function(e) {
          e.stopPropagation();
        });
  
        // 关闭按钮
        $(".sp-close-btn").click(function(e) {
          e.stopPropagation();
          $(".sp-menu-mask").hide();
        });
  
        // 问答 - 展开/收起功能
        $(".sp-qa3-question").on("click", function() {
          var $currentItem = $(this).closest(".sp-qa3-item");
          var $container = $(".sp-qa3-container");
          
          if ($currentItem.hasClass("active")) {
            // 如果当前是展开状态，则收起
            $currentItem.removeClass("active");
            // 检查是否还有其他展开的项
            if ($(".sp-qa3-item.active").length === 0) {
              $container.removeClass("has-active");
            }
          } else {
            // 如果当前是收起状态，先收起其他所有项，再展开当前项
            $(".sp-qa3-item").removeClass("active");
            $currentItem.addClass("active");
            $container.addClass("has-active");
          }
        });
  
        // 立即购买
        $(document).on("click", ".sp_buy_now", function() {
          console.log("xxx111");
        });
  
        // 加入购物车
        $(document).on("click", ".sp_add_cart", function() {
          self.handleAddToCart(this);
        });
  
        // 锚点滚动
        this.bindAnchorLinks();
      },
  
      handleAddToCart: function(button) {
        var self = this;
        
        // 购物车动效
        $(button).children("img").addClass("on");
        $(".sp-cart .num").show();
        
        setTimeout(function() {
          $(".cart-btn").children("img").removeClass("on");
        }, 500);
        
        $(".sp-cart").addClass("on");
        setTimeout(function() {
          $(".sp-cart").removeClass("on");
        }, 500);
  
        // 更新数量
        var spNum = $("#calcNumber")[0] ? Number($("#calcNumber")[0].value) : 1;
        this.initNum += spNum;
  
        $(".cardNum").each(function() {
          $(this).html(self.initNum);
        });
        
        $(".cardNum").removeClass("sp-gray");
  
        // 图片飞入动画
        this.createFlyAnimation();
      },
  
      createFlyAnimation: function() {
        var imgs = $(".sp_product_part .swiper-slide-active").find("img");
        var self = this;
        
        imgs.each(function(index, img) {
          var $img = $(img);
          var flyer = img.cloneNode(true);
          flyer.classList.add("sp_clone");
  
          $(".sp_product_part").append(flyer);
          $(flyer).css({
            width: img.width,
            height: img.height,
            background: "#e7e9ef",
            position: "fixed",
            top: img.offsetTop,
            left: $img.offset().left,
            "z-index": 99,
          });
          
          var finish;
          if (document.body.clientWidth <= 1080) {
            finish = $(".sp-btn-style2 .sp-cart");
            $(flyer).animate(
              {
                top: $(".sp-btn-style2")[0].offsetTop,
                left: $(".sp-btn-style2 .sp-area2")[0].offsetLeft + finish.width() / 2,
                width: 50,
                height: 50,
                opacity: 0.4,
              },
              500,
              "linear",
              function() {
                $(this).animate(
                  {
                    width: 0,
                    height: 0,
                    opacity: 0,
                  },
                  0,
                  function() {
                    $(this).detach();
                  }
                );
              }
            );
          } else {
            finish = $(".sp_pc .sp-cart");
            $(flyer).animate(
              {
                top: finish[0].offsetTop,
                left: finish[0].offsetLeft + finish.width() / 2,
                width: 50,
                height: 50,
                opacity: 0.4,
              },
              500,
              "linear",
              function() {
                $(this).animate(
                  {
                    width: 0,
                    height: 0,
                    opacity: 0,
                  },
                  0,
                  function() {
                    $(this).detach();
                  }
                );
              }
            );
          }
        });
      },
  
      bindAnchorLinks: function() {
        var links = document.querySelectorAll('a[href^="#shopping"]');
        for (var i = 0; i < links.length; i++) {
          (function(link) {
            link.addEventListener("click", function(event) {
              event.preventDefault();
              var targetElement = document.getElementById("shopping");
              if (!targetElement) return;
              
              var offsetTop = document.body.clientWidth <= 1080
                ? targetElement.offsetTop - ($(".sp-nav").height() || 0)
                : targetElement.offsetTop;
  
              var sptop = document.body.clientWidth <= 1080 ? 70 : 65;
  
              window.scroll({
                top: offsetTop * ($("div#root").css("zoom") || 1) - sptop * ($("div#root").css("zoom") || 1),
                behavior: "smooth",
              });
            });
          })(links[i]);
        }
      },
  
      bindScrollEvents: function() {
        var self = this;
        
        // 初始检查
        this.updateScrollClasses();
        
        $(window).scroll(function() {
          self.updateScrollClasses();
        });
      },
  
      updateScrollClasses: function() {
        var headerHeight = $(".sp_header").height() || 0;
        var zoom = parseFloat($("div#root").css("zoom")) || 1;
        
        if ($(window).scrollTop() > headerHeight * zoom) {
          $(".sp_header-wrap").addClass("sp-fixed");
        } else {
          $(".sp_header-wrap").removeClass("sp-fixed");
        }
      }
    };
  
    // ==================== 设备特定处理 ====================
    var DeviceHandler = {
      init: function() {
        var deviceInfo = Utils.detectDevice();
        
        if (deviceInfo.isAndroid) {
          console.log("Android");
        } else if (deviceInfo.isIOS) {
          console.log("iOS");
        } else if (deviceInfo.isPC) {
          console.log("PC");
        } else {
          $(".sp_system").css("letter-spacing", "-4px");
        }
      }
    };
  
    // ==================== 主渲染函数（保持与原始代码一致的结构） ====================
    var MainRender = {
      init: function() {
        // 响应式布局
        ResponsiveLayout.init();
        
        // 动画
        AnimationManager.init();
        
        // 图片处理
        ImageManager.lazyLoadImages();
        ImageManager.preloadImages(ImageManager.spImgList);
        
        // 锚点链接
        InteractionManager.bindAnchorLinks();
        
        // 设备特定处理
        DeviceHandler.init();
        
        // 确保初始状态
        setTimeout(function() {
          if (ProductSelector.productSwiper) {
            ProductSelector.updatePrices();
          }
          InteractionManager.updateScrollClasses();
        }, 100);
      }
    };
  
    // ==================== 主应用 ====================
    var App = {
      init: function() {
        $(document).ready(function() {
          // 1. 初始化倒计时
          Countdown.init();
          
          // 2. 初始化Swiper
          SwiperManager.initAll();
          
          // 3. 初始化产品选择
          ProductSelector.init(SwiperManager.getProductSwiper());
          
          // 4. 初始化交互
          InteractionManager.init();
          
          // 5. 执行主渲染（包含动画）
          MainRender.init();
          
          console.log("App initialized successfully");
        });
      },
  
      cleanup: function() {
        Countdown.cleanup();
        SwiperManager.cleanup();
        AnimationManager.cleanup();
      }
    };
  
    // ==================== 启动应用 ====================
    $(document).ready(function() {
      App.init();
      
      // 暴露到全局便于调试
      window.App = App;
    });
  
  })(window, jQuery);