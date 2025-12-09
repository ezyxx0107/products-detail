/**
 *
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://146.56.218.109:18086/wechat/index.html
 *
 * Copyright 2024-2031 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 */

document.addEventListener("DOMContentLoaded", function () {
  // 倒计时
  function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  let endTimeG;

  function cutDownTime() {
    let nowTime = new Date();
    let endTime = new Date(endTimeG);

    let leftTime = endTime.getTime() - nowTime.getTime();
    if (leftTime < 0) {
      setupNewCountdown();
      leftTime = 0;
    }
    let leftH = Math.floor((leftTime / (1000 * 60 * 60)) % 24),
      leftM = Math.floor((leftTime / (1000 * 60)) % 60),
      leftS = Math.floor((leftTime / 1000) % 60);
    leftH = leftH >= 10 ? leftH : "0" + leftH;
    leftM = leftM >= 10 ? leftM : "0" + leftM;
    leftS = leftS >= 10 ? leftS : "0" + leftS;

    return {
      hour: leftH,
      minute: leftM,
      second: leftS,
    };
  }
  function setupNewCountdown() {
    const randomHour = getRandomNum(1, 9);
    const currentTime = new Date();
    endTimeG = currentTime.setHours(currentTime.getHours() + randomHour);
  }
  let intervalId;

  function getCutDownTime() {
    setupNewCountdown();
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(function () {
      let cutDownTimeText = cutDownTime();
      $(".sp_top_cut_down .sp_left_view .sp_hour").html(cutDownTimeText.hour);
      $(".sp_top_cut_down .sp_left_view .sp_minute").html(
        cutDownTimeText.minute
      );
      $(".sp_top_cut_down .sp_left_view .sp_second").html(
        cutDownTimeText.second
      );
    }, 1000);
  }

  getCutDownTime();

  let spImgList = [
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
    "./image/20251204-b3.png",
  ];

  new Swiper(".sp-swiper-fade-top", {
    spaceBetween: 10,
    effect: "fade",
    autoplay: true,
    autoplay: {
      disableOnInteraction: false,
      delay: 2000,
    },
    speed: 2000,
  });

  // new Swiper(".sp-swiper-bg", {
  //   spaceBetween: 0,

  //   autoplay: true,
  //   autoplay: {
  //     disableOnInteraction: false,
  //   },
  //   pagination: {
  //     el: ".sp-pagination-col",
  //     clickable: true,
  //   },
  // });

  // 按钮轮播
  new Swiper(".sp-btn-loop", {
    spaceBetween: 10,
    autoplay: true,
    autoplay: {
      disableOnInteraction: false,
      reverseDirection: true,
    },
    loop: true,
  });

  // new Swiper(".sp-swiper1-m", {
  //   autoplay: true,
  //   autoplay: {
  //     disableOnInteraction: false,
  //     delay: 1,
  //   },
  //   spaceBetween: 22,
  //   loop: true,
  //   slidesPerView: "auto",
  //   speed: 6000,
  // });

  new Swiper(".sp-swiper2", {
    autoplay: true,
    autoplay: {
      disableOnInteraction: false,
      // delay: 0,
    },
    // speed: 6000,
    slidesPerView: "auto",
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    navigation: {
      nextEl: ".sp-swiper-btn-next",
      prevEl: ".sp-swiper-btn-prev",
    },
  });

  new Swiper(".sp-swiper2-m", {
    autoplay: true,
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

  let _swiper = new Swiper(".sp-swiper-pro", {
    speed: 1,
    spaceBetween: 0,
  });
  let sptextList = ["X 10pcs", "X 30pcs", "X 50pcs"];
  $(" .sp-option").click(function () {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");

    let colorOptions = $(" .sp-color .sp-option.active").index();
    let numOptions = $(" .sp-num .sp-option.active").index();

    if ($(".sp-extra-box").hasClass("sp-active")) {
      _index = colorOptions + 10;
    } else {
      _index = colorOptions;
    }

    $(".sp-num-tip").text(sptextList[numOptions]);

    _swiper.slideToLoop(_index);
  });

  $(".sp-btn-skip").click(function () {
    $(".sp-num .sp-option").removeClass("active");
    $(".sp-num .sp-option").eq(2).addClass("active");

    let colorOptions = $(" .sp-color .sp-option.active").index();
    let numOptions = $(" .sp-num .sp-option.active").index();

    if ($(".sp-extra-box").hasClass("sp-active")) {
      _index = colorOptions + 10;
    } else {
      _index = colorOptions;
    }
    $(".sp-num-tip").text(sptextList[numOptions]);

    _swiper.slideToLoop(_index);
  });

  $(".sp-extra-box").click(function () {
    $(this).toggleClass("sp-active");

    let colorOptions = $(" .sp-color .sp-option.active").index();

    if ($(".sp-extra-box").hasClass("sp-active")) {
      _index = colorOptions + 10;
    } else {
      _index = colorOptions;
    }

    _swiper.slideToLoop(_index);
  });

  jQuery(".sp-scroll2").slide({
    mainCell: ".nav-imgs",
    autoPlay: true,
    effect: "leftMarquee",
    interTime: 12,
    vis: 1,
    scroll: 1,
  });

  function mainRender() {
    $(function () {
      $("#root").css("zoom", "normal");
      if (document.body.clientWidth <= 1080) {
        let scale = document.body.clientWidth / 1080;
        $("#root").css("zoom", scale);
      } else {
        const scale = document.body.clientWidth / 1920;
        $("#root").css("zoom", scale);
      }

      window.addEventListener(
        "resize",
        (function () {
          var timer;
          return function () {
            if (timer) clearTimeout(timer);
            timer = setTimeout(function () {
              $("#root").css("zoom", "normal");
              if (document.body.clientWidth <= 1080) {
                let scale = document.body.clientWidth / 1080;
                $("#root").css("zoom", scale);
              } else {
                const scale = document.body.clientWidth / 1920;
                $("#root").css("zoom", scale);
              }
            }, 100);
          };
        })()
      );
    });

    function lazyLoadImages() {
      // 懒加载
      const images = document.querySelectorAll(".lazy-load"); // 获取所有需要懒加载的图片
      const config = {
        rootMargin: "0px 0px 1300px 0px",
        threshold: 0,
      };

      const lazyLoadObserver = new IntersectionObserver(function (
        entries,
        observer
      ) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // 当图片进入视口时
            const image = entry.target;
            const dataSrc = image.getAttribute("data-src");
            image.src = dataSrc; // 将data-src属性的值设置为图片的实际地址
            lazyLoadObserver.unobserve(image); // 停止观察该图片
          }
        });
      },
      config);

      images.forEach(function (image) {
        lazyLoadObserver.observe(image); // 开始观察每个图片
      });
    }

    function preloadImages(imageArray) {
      // 预加载
      // 检查数组数据结构
      if (Array.isArray(imageArray[0])) {
        // 处理二维数组
        imageArray.forEach((subArray) => {
          subArray.forEach((url) => {
            const img = new Image();
            img.src = url;
          });
        });
      } else {
        // 处理一维数组
        imageArray.forEach((url) => {
          const img = new Image();
          img.src = url;
        });
      }
    }

    lazyLoadImages();

    preloadImages(spImgList);

    // 找到所有跳转套餐的锚点链接
    var links = document.querySelectorAll('a[href^="#shopping"]');
    links.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault(); // 阻止默认的跳转行为
        // 方式一
        const targetElement = document.getElementById("shopping"); // 获取跳转目标节点
        const offsetTop =
          document.body.clientWidth <= 1080
            ? targetElement.offsetTop - $(".sp-nav").height()
            : targetElement.offsetTop;

        let sptop = document.body.clientWidth <= 1080 ? 70 : 65;

        window.scroll({
          top:
            offsetTop * $("div#root").css("zoom") -
            sptop * $("div#root").css("zoom"),
          behavior: "smooth", // 使用 smooth 实现平滑滚动
        });
      });
    });

    // IOS字体多了间距的处理 给节点添加 sp_system 类名
    // 判断当前用户是安卓端还是iOS端
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    var isAndroid = /android/i.test(userAgent);
    var isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    var isPC = !isAndroid && !isIOS && !/Iron/.test(userAgent); // 添加了对 "Iron" 关键词的判断

    if (isAndroid) {
      console.log("Android");
    } else if (isIOS) {
      console.log("iOS");
    } else if (isPC) {
      console.log("PC");
    } else {
      $(".sp_system").css("letter-spacing", "-4px");
    }
  }

  mainRender();

  let sp_price1 = 149;
  let sp_price2 = 298;

  function calcTotal(price, num) {
    let result = Number(price) * Number(num);
    return result.toFixed(0);
  }
  $(".sp-reduce").click(function () {
    let input = $(this).siblings("input")[0];
    let num = Number(input.value) - 1;
    if (num > 0) {
      input.value = num;
    }
    $("#sp_price1").html(calcTotal(sp_price1, input.value));
    $("#sp_price2").html(calcTotal(sp_price2, input.value));
  });
  $(".sp-add").click(function () {
    let input = $(this).siblings("input")[0];
    let num = Number(input.value) + 1;
    input.value = num;
    $("#sp_price1").html(calcTotal(sp_price1, input.value));
    $("#sp_price2").html(calcTotal(sp_price2, input.value));
  });

  // 标题文本渐出
  const graduallyList = document.getElementsByClassName("gradually");
  for (let gradually of graduallyList) {
    const spans = gradually.querySelectorAll("span");
    const paragraph = gradually.querySelector(".sp-sub-title");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 给每个 span 和 i 动画
            spans.forEach((span, index) => {
              span.style.animation = `swift-up-fade 0.5s ease forwards`;
              span.style.animationDelay = `${index * 0.1}s`;

              const i = span.querySelector("i");
              if (i) {
                i.style.animation = `swift-up-fade 0.5s ease forwards`;
                i.style.animationDelay = `${index * 0.1}s`;
              }
            });

            // 段落
            const totalDelay = spans.length * 0.1 + 0.3;
            if (paragraph) {
              paragraph.style.animation = `swift-up-fade 0.5s ease forwards`;
              paragraph.style.animationDelay = `${totalDelay}s`;
            }

            observer.unobserve(gradually);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );
    observer.observe(gradually);
  }

  // // 点击按钮
  // $(".sp-video-btn").click(function () {
  //   $(".sp-mask").css("display", "flex");
  // });

  // 菜单
  $(".sp-menu-btn").click(function (e) {
    $(".sp-menu-mask").show();
  });

  $(".sp-menu-mask").click(function (e) {
    // if ($(e.target).closest(".sp-menu-mask li").length > 0) {
    // } else {
    $(".sp-menu-mask").hide();
    // }
  });

  // 滚动隐藏顶部
  if (
    $(window).scrollTop() >
    $(".sp_header").height() * $("div#root").css("zoom")
  ) {
    $(".sp_header-wrap").addClass("sp-fixed");
  } else {
    $(".sp_header-wrap").removeClass("sp-fixed");
  }

  // // 滚动添加底部
  // if (
  //   $(window).scrollTop() >
  //   $(".sp-part1").height() * $("div#root").css("zoom") -
  //     $(".sp-part1 .swiper").height() * $("div#root").css("zoom")
  // ) {
  //   $(".sp-btn-style2").addClass("sp-fixed-bottom");
  // } else {
  //   $(".sp-btn-style2").removeClass("sp-fixed-bottom");
  // }

  $(window).scroll(function () {
    if (
      $(window).scrollTop() >
      $(".sp_header").height() * $("div#root").css("zoom")
    ) {
      $(".sp_header-wrap").addClass("sp-fixed");
    } else {
      $(".sp_header-wrap").removeClass("sp-fixed");
    }

    // if (
    //   $(window).scrollTop() >
    //   $(".sp-part1").height() * $("div#root").css("zoom") -
    //     $(".sp-part1 .swiper").height() * $("div#root").css("zoom")
    // ) {
    //   $(".sp-btn-style2").addClass("sp-fixed-bottom");
    // } else {
    //   $(".sp-btn-style2").removeClass("sp-fixed-bottom");
    // }
  });

  $(document).on("click", ".sp_buy_now", function () {
    console.log("xxx111");
  });

  let initNum = 0;
  $(document).on("click", ".sp_add_cart", function () {
    // 购物车加购动效

    $(this).children("img").addClass("on");
    $(".sp-cart .num").show();
    setTimeout(function () {
      $(" .cart-btn").children("img").removeClass("on");
    }, 500);
    $(" .sp-cart").addClass("on");
    setTimeout(function () {
      $(".sp-cart").removeClass("on");
    }, 500);

    let spNum = $(".sp_product_part #calcNumber")[0].value;
    initNum += Number(spNum);

    // $("#calcNumber").val(1);

    $(".cardNum").each(function () {
      $(this).html(initNum);
    });
    $(".cardNum").removeClass("sp-gray");
    // handleAddToCart(initNum);

    var imgs = $(".sp_product_part .swiper-slide-active").find("img");
    // var imgs = $(".sp_product_part .sp-img-p.active");

    imgs.each(function () {
      var $img = $(this);
      var flyer = $img[0].cloneNode(true);
      flyer.classList.add("sp_clone");

      $(".sp_product_part").append(flyer);
      $(flyer).css({
        width: $img[0].width,
        height: $img[0].height,
        background: "#e7e9ef",
        position: "fixed",

        top: $img[0].offsetTop,
        left: $img.offset().left,
        "z-index": 99,
      });
      let finish;
      if (document.body.clientWidth <= 1080) {
        finish = $(".sp-btn-style2 .sp-cart");

        $(flyer).animate(
          {
            top: $(".sp-btn-style2")[0].offsetTop,
            left:
              $(".sp-btn-style2 .sp-area2")[0].offsetLeft + finish.width() / 2,
            width: 50,
            height: 50,
            opacity: 0.4,
          },
          500,
          "linear",
          function () {
            $(this).animate(
              {
                width: 0,
                height: 0,
                opacity: 0,
              },
              0,
              function () {
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
          function () {
            $(this).animate(
              {
                width: 0,
                height: 0,
                opacity: 0,
              },
              0,
              function () {
                $(this).detach();
              }
            );
          }
        );
      }
    });
  });

  // 问答
  $(".sp-qa3-question").on("click", function () {
    var $currentItem = $(this).closest(".sp-qa3-item");
    var $answer = $currentItem.find(".sp-qa3-answer");

    if ($currentItem.hasClass("active")) {
      $answer.slideUp(300);
      $currentItem.removeClass("active");
    } else {
      $(".sp-qa3-item").removeClass("active");
      $(".sp-qa3-answer").slideUp(300);
      $currentItem.addClass("active");
      $answer.slideDown(300);
    }
  });

  // 文本渐出动画
  const graduallyList2 = document.getElementsByClassName("sp-fade-box");
  for (let gradually2 of graduallyList2) {
    const paragraph2 = gradually2.querySelectorAll(".sp-ani");

    const observerAni = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            paragraph2.forEach((span, index) => {
              span.style.animation = `sp-fade-in 1s ease forwards`;
              span.style.animationDelay = `${index * 0.5 + 0.5}s`;
            });

            observerAni.unobserve(gradually2);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );
    observerAni.observe(gradually2);
  }
  // 文本渐出动画
  const graduallyList3 = document.getElementsByClassName("sp-fade-box2");
  for (let gradually3 of graduallyList3) {
    const paragraph3 = gradually3.querySelectorAll(".sp-ani2");

    const observerAni = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            paragraph3.forEach((span, index) => {
              span.style.animation = `sp-fade-left 1s ease forwards`;
              span.style.animationDelay = `${index * 0.3 + 1}s`;
            });

            observerAni.unobserve(gradually3);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );
    observerAni.observe(gradually3);
  }
});
