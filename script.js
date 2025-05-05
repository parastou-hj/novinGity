
document.addEventListener('DOMContentLoaded', () => {
    const megaMenuTriggers = document.querySelectorAll('.has-megamenu');
    const allMegaMenus = document.querySelectorAll('.mega-menu');
    let hoverTimeout = null;
    let activeMenu = null;
    let activeTriggerLi = null;

    const closeAllMegaMenus = (immediately = false) => {
        allMegaMenus.forEach(menu => {
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
            }
        });
         if (activeTriggerLi) {
             activeTriggerLi.classList.remove('active-trigger');
         }
        activeMenu = null;
        activeTriggerLi = null;
        if (hoverTimeout && !immediately) {
             clearTimeout(hoverTimeout);
             hoverTimeout = null;
        }
    };

    const activateFirstTab = (menu) => {
        if (!menu) return;
        const tabs = menu.querySelectorAll('.pro-tabs > .p-tab');
        const contents = menu.querySelectorAll('.pro-contents > .p-content');

        tabs.forEach(tab => tab.classList.remove('active'));
        contents.forEach(content => content.classList.remove('active'));

        if (tabs.length > 0) {
            const firstTab = tabs[0];
            const firstContentId = firstTab.getAttribute('data-tab');
            const firstContent = menu.querySelector(`.pro-contents > #${firstContentId}`);

            firstTab.classList.add('active');
            if (firstContent) {
                firstContent.classList.add('active');
            }
        }
    };

    megaMenuTriggers.forEach(triggerLi => {
        const targetMenuId = triggerLi.getAttribute('data-megamenu-target');
        const targetSelector = targetMenuId.startsWith('#') ? targetMenuId : `#${targetMenuId}`;
        // Important: Search for the menu within the nav context if placed inside
        const targetMenu = triggerLi.closest('nav').querySelector(targetSelector);
         // If menus are outside nav, use: document.querySelector(targetSelector);

        if (!targetMenu) {
             console.warn('Mega menu not found for target:', targetSelector);
            return;
        }

        triggerLi.addEventListener('mouseenter', function() {
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
                hoverTimeout = null;
            }

            if (activeMenu && activeMenu !== targetMenu) {
                closeAllMegaMenus(true);
            }

            if (!targetMenu.classList.contains('active')) {
                closeAllMegaMenus(true); // Ensure others are closed

                activeMenu = targetMenu;
                activeTriggerLi = this; // Keep track of the trigger
                activateFirstTab(activeMenu);
                activeMenu.classList.add('active');
                activeTriggerLi.classList.add('active-trigger'); // Add style to trigger
            }
        });

        triggerLi.addEventListener('mouseleave', function() {
            hoverTimeout = setTimeout(() => {
                if (activeMenu && !activeMenu.matches(':hover')) {
                    closeAllMegaMenus(true);
                }
                hoverTimeout = null;
            }, 250);
        });
    });

    allMegaMenus.forEach(menu => {
        menu.addEventListener('mouseenter', () => {
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
                hoverTimeout = null;
            }
        });

        menu.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                // Use activeTriggerLi to check if mouse moved back to trigger
                if (activeTriggerLi && !activeTriggerLi.matches(':hover')) {
                    closeAllMegaMenus(true);
                }
                hoverTimeout = null;
            }, 250);
        });

        // Tab switching logic inside each menu
        const megaMenuTabs = menu.querySelectorAll('.pro-tabs > .p-tab');
        megaMenuTabs.forEach(tab => {
            tab.addEventListener('mouseenter', function() {
                if (!menu.classList.contains('active')) return;

                const tabTargetId = this.getAttribute('data-tab');
                const tabTargetContent = menu.querySelector(`.pro-contents > #${tabTargetId}`);

                if (tabTargetContent && !this.classList.contains('active')) {
                    const currentMenuTabs = menu.querySelectorAll('.pro-tabs > .p-tab');
                    const currentMenuContents = menu.querySelectorAll('.pro-contents > .p-content');

                    currentMenuTabs.forEach(t => t.classList.remove('active'));
                    currentMenuContents.forEach(content => content.classList.remove('active'));

                    tabTargetContent.classList.add('active');
                    this.classList.add('active');
                }
            });
        });
    });

    // Close menu on click outside
    document.addEventListener('click', function(event) {
        if (activeMenu && !activeMenu.contains(event.target) && activeTriggerLi && !activeTriggerLi.contains(event.target)) {
            closeAllMegaMenus(true);
        }
    });
});

 // تابع راه‌اندازی نقشه گوگل
 function initMap() {
    // موقعیت مرکز نقشه (طول و عرض جغرافیایی)
    const companyLocation = { lat: 40.7282, lng: -73.9442 }; // این مختصات را با موقعیت شرکت خود جایگزین کنید
    
    // ایجاد نقشه
    const map = new google.maps.Map(document.getElementById('google-map'), {
        center: companyLocation,
        zoom: 13, // سطح زوم
        zoomControl: false, // غیرفعال کردن کنترل‌های پیش‌فرض زوم
        mapTypeControl: false, // غیرفعال کردن کنترل‌های پیش‌فرض تغییر نوع نقشه
        streetViewControl: false, // غیرفعال کردن کنترل استریت ویو
        fullscreenControl: false, // غیرفعال کردن دکمه تمام‌صفحه
        scrollwheel: true, // فعال کردن زوم با اسکرول موس
        styles: [
            // استایل‌های سفارشی نقشه - می‌توانید از سایت Snazzy Maps استایل‌های مختلف را پیدا کنید
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#444444"}]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{"color": "#f2f2f2"}]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{"saturation": -100}, {"lightness": 45}]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{"visibility": "simplified"}]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{"color": "#a8d7d5"}, {"visibility": "on"}]
            }
        ]
    });
    
    // اضافه کردن مارکر برای موقعیت شرکت
    const marker = new google.maps.Marker({
        position: companyLocation,
        map: map,
        title: 'شرکت نوین ژیتی ژن بیوتکنولوژی',
        icon: {
            url: 'images/map-marker.png', // مسیر آیکون سفارشی مارکر
            scaledSize: new google.maps.Size(40, 40) // اندازه آیکون
        }
    });
    
    // اضافه کردن عملکرد به دکمه‌های زوم
    document.querySelector('.zoom-in').addEventListener('click', function() {
        map.setZoom(map.getZoom() + 1);
    });
    
    document.querySelector('.zoom-out').addEventListener('click', function() {
        map.setZoom(map.getZoom() - 1);
    });
    
    // اضافه کردن عملکرد به دکمه‌های تغییر نوع نقشه
    const mapTypeBtns = document.querySelectorAll('.map-type-btn');
    
    mapTypeBtns[0].classList.add('active'); // نقشه به عنوان حالت پیش‌فرض
    
    mapTypeBtns[0].addEventListener('click', function() {
        map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        mapTypeBtns[0].classList.add('active');
        mapTypeBtns[1].classList.remove('active');
    });
    
    mapTypeBtns[1].addEventListener('click', function() {
        map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
        mapTypeBtns[1].classList.add('active');
        mapTypeBtns[0].classList.remove('active');
    });
}


//baner-carousel
$(function () {
    $("#banner-owl").owlCarousel({
      rtl: true,
      items: 1,
      // nav: true,
      dots: false,
      loop: true,
      animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    smartSpeed: 450,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      // navText: [
      //     '<i class="fa-solid fa-chevron-right"></i>',
      //     '<i class="fa-solid fa-chevron-left"></i>'
      // ],
      responsive: {
        0: {
          items: 1,
        },
      },
    });
  });
  $(".nav-right").click(function () {
    $("#banner-owl").trigger("prev.owl.carousel");
  });
  
  $(".nav-left").click(function () {
    $("#banner-owl").trigger("next.owl.carousel");
  });



  $(function () {
    $("#blog-owl").owlCarousel({
      rtl: true,
      items: 4,
      // nav: true,
      dots: false,
      loop: true,
    smartSpeed: 450,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      // navText: [
      //     '<i class="fa-solid fa-chevron-right"></i>',
      //     '<i class="fa-solid fa-chevron-left"></i>'
      // ],
      responsive: {
        0: {
          items: 2,
        }
        ,
        768:{
            items:3
        },
        992:{
            items:4
        }
      },
    });
  });
  $(".blog-right").click(function () {
    $("#blog-owl").trigger("prev.owl.carousel");
  });
  
  $(".blog-left").click(function () {
    $("#blog-owl").trigger("next.owl.carousel");
  });



  $(function () {
    $("#clgue-owl").owlCarousel({
      rtl: true,
      items: 4,
      // nav: true,
    //   dots: false,
      loop: true,
    smartSpeed: 450,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      // navText: [
      //     '<i class="fa-solid fa-chevron-right"></i>',
      //     '<i class="fa-solid fa-chevron-left"></i>'
      // ],
      responsive: {
        0: {
          items: 3,
        },
        576:{
            items:4
        },
        768:{
            items:6
        },
        992:{
            items:8
        }
      },
    });
  });
  $('.up').on('click',function(){
    document.documentElement.scrollTop = 0;
})

//----------------------video-modal
$(document).ready(function () {
    const modal = $(".video-modal");
    const video = $("#myVideo")[0];
  
    $(".video-sec").click(function () {
      modal.fadeIn();
      video.play();
    });
  
    $(".close-modal, .modal-overlay").click(function () {
      modal.fadeOut();
      video.pause();
      video.currentTime = 0;
    });
  
    $(".modal-content video").click(function (e) {
      e.stopPropagation();
    });
  });
  

  //off-canvas:

$('.fa-bars').on('click', function(){
    $('.off-canvas').addClass('active');
    $('.overlay').addClass('active');
    $('body').css('overflow','hidden');
    
  })
  $('.close-btn').on('click',function(){
    $('.off-canvas').removeClass('active');
    $('.overlay').removeClass('active');
    $('body').css('overflow','auto');
  
  })
  $(document).ready(function() {
  
    $('.category-btn').on('click', function(e) {
        e.preventDefault();
        $('.submenu.level-1').addClass('active');
    });
  
  
    $('.subcategory-btn').on('click', function(e) {
        e.preventDefault();
        $(this).closest('.submenu-item').find('.submenu.level-2').addClass('active');
    });
  
  
    $('.back-btn').on('click', function() {
        $(this).closest('.submenu').removeClass('active');
    });
  
  
    $('.close-btn').on('click', function() {
        $('.submenu').removeClass('active');
    });
  });
  $('body').on('click',function(e){
    if(!e.target.closest('.off-canvas')&&!e.target.closest('.fa-bars')&&!e.target.closest('.fixed-phone')&&!e.target.closest('.pro-equip')&& !e.target.closest('.equip')){
        $('.off-canvas').removeClass('active');
        $('.overlay').removeClass('active');
        $('body').css('overflow','auto');
      
  
    }})


    $(document).ready(function () {
        const $searchIcon = $('.search-icon');
        const $searchBox = $('.search-box');
        const $searchInput = $('.search-box input');
        const $closeSearch = $('.close-search');
        const $searchResults = $('.search-results');

        $searchIcon.on('click', function () {
            $searchBox.toggle();
            if ($searchBox.is(':visible')) {
                $searchInput.focus();
                $searchResults.hide(); 
                $searchInput.val(''); 
            }
        });

        $closeSearch.on('click', function () {
            $searchBox.hide();
            $searchResults.hide();
            $searchInput.val('');
        });

        $searchInput.on('input', function (e) {
             
            var searchText = e.target.value.trim().toLowerCase();
            $.each($('.search-result-item'), function (i, item) {
                if ($(item).text().toLowerCase().includes(searchText) && searchText.length > 0) {
                    $searchResults.show();
                    $(item).css('display', 'block');
                } else {
                    $(item).css('display', 'none');
                }
            });
            if ($('.search-result-item:visible').length > 0 && searchText.length > 0) {
                $searchResults.show();
            } else {
                $searchResults.hide();
            }
        });

       

        $(document).on('click', function (event) {
            if (!$(event.target).closest('.search-box, .search-icon').length && $searchBox.is(':visible')) {
                $searchBox.hide();
                $searchResults.hide();
                $searchInput.val('');
            }
        });

        $searchBox.on('click', function (event) {
            event.stopPropagation();
        });
    });

    var tabs=$('.footer-tab');
    tabs.on('click', function(){
        // $(this).addClass('active');
        $('#'+$(this).data('tab')).toggleClass('active')
    })
