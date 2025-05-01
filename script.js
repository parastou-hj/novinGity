$(document).ready(function() {
    // متغیر برای تایمر
    var hoverTimer;
    var megaMenuHoverTimer;
    var currentMegaMenu = null;
    
    // تابع آماده‌سازی منوها
    function setupMenus() {
        // پاکسازی همه رویدادها قبل از اضافه کردن مجدد
        $('.nav-link[data-megamenu]').off('mouseenter mouseleave');
        $('.mega-menu').off('mouseenter mouseleave');
        $('.nav-item').off('mouseenter mouseleave');
        
        // در حالت دسکتاپ از هاور استفاده می‌کنیم
        if ($(window).width() >= 992) {
            // ماوس روی آیتم منو
            $('.nav-item').on('mouseenter', function() {
                // لغو هر تایمر فعال
                clearTimeout(hoverTimer);
                
                // پنهان کردن همه مگامنوها
                $('.mega-menu').removeClass('active');
                
                // یافتن لینک منو با data-megamenu
                var link = $(this).find('.nav-link[data-megamenu]');
                
                if (link.length) {
                    // دریافت آیدی مگامنو
                    var megamenuId = link.data('megamenu');
                    currentMegaMenu = $('#' + megamenuId);
                    
                    // نمایش مگامنوی مربوط به این آیتم
                    currentMegaMenu.addClass('active');
                }
            });
            
            // ماوس روی مگامنو
            $('.mega-menu').on('mouseenter', function() {
                // لغو هر تایمر فعال
                clearTimeout(megaMenuHoverTimer);
            });
            
            // خروج ماوس از مگامنو
            $('.mega-menu').on('mouseleave', function() {
                var megaMenu = $(this);
                
                // ایجاد تایمر برای مخفی کردن مگامنو
                megaMenuHoverTimer = setTimeout(function() {
                    megaMenu.removeClass('active');
                    currentMegaMenu = null;
                }, 100);
            });
            
            // خروج ماوس از آیتم منو
            $('.nav-item').on('mouseleave', function() {
                var navItem = $(this);
                
                // ایجاد تایمر برای مخفی کردن مگامنو
                hoverTimer = setTimeout(function() {
                    // بررسی اینکه آیا ماوس روی مگامنو است
                    if (!$('.mega-menu:hover').length) {
                        $('.mega-menu').removeClass('active');
                        currentMegaMenu = null;
                    }
                }, 100);
            });
            
            // بستن مگامنو با کلیک خارج از منو
            $(document).on('click', function(e) {
                if (!$(e.target).closest('.nav-item').length && !$(e.target).closest('.mega-menu').length) {
                    $('.mega-menu').removeClass('active');
                    currentMegaMenu = null;
                }
            });
        } else {
            // در حالت موبایل از کلیک استفاده می‌کنیم
            initMobileMenu();
        }
    }
    
    // تابع راه‌اندازی منوی موبایل
    function initMobileMenu() {
        // رویداد کلیک روی آیتم‌های منو در موبایل
        $('.nav-link[data-megamenu]').on('click', function(e) {
            e.preventDefault();
            
            // دریافت آیدی مگامنو
            var megamenuId = $(this).data('megamenu');
            
            // بررسی وضعیت فعلی
            if ($('#' + megamenuId).hasClass('active')) {
                // اگر فعال است، غیرفعال کن
                $('#' + megamenuId).removeClass('active');
                $(this).parent('.nav-item').removeClass('active');
            } else {
                // بستن سایر مگامنوها
                $('.mega-menu').removeClass('active');
                $('.nav-item').removeClass('active');
                
                // نمایش مگامنوی مربوطه
                $('#' + megamenuId).addClass('active');
                $(this).parent('.nav-item').addClass('active');
            }
        });
    }
    
    // باز و بسته کردن منوی موبایل
    $('.mobile-menu-btn').on('click', function() {
        $(this).toggleClass('active');
        $('.nav-menu').toggleClass('active');
        $('.menu-overlay').toggleClass('active');
        $('body').toggleClass('menu-open');
    });
    
    // بستن منوی موبایل با کلیک روی اورلی
    $('.menu-overlay').on('click', function() {
        $('.mobile-menu-btn').removeClass('active');
        $('.nav-menu').removeClass('active');
        $('.menu-overlay').removeClass('active');
        $('body').removeClass('menu-open');
        
        // بستن همه مگامنوها
        $('.mega-menu').removeClass('active');
        $('.nav-item').removeClass('active');
    });
    
    // مدیریت تغییر سایز صفحه
    $(window).resize(function() {
        // پاکسازی تایمرها
        clearTimeout(hoverTimer);
        clearTimeout(megaMenuHoverTimer);
        
        // بستن همه مگامنوها
        $('.mega-menu').removeClass('active');
        currentMegaMenu = null;
        
        // در حالت دسکتاپ
        if ($(window).width() >= 992) {
            $('.mobile-menu-btn').removeClass('active');
            $('.nav-menu').removeClass('active');
            $('.menu-overlay').removeClass('active');
            $('body').removeClass('menu-open');
            
            // پاکسازی رویدادهای موبایل
            $('.nav-link[data-megamenu]').off('click');
        }
        
        // راه‌اندازی مجدد منوها با توجه به سایز جدید
        setupMenus();
    });
    
    // فعال‌سازی اولیه منوها
    setupMenus();
    
    // تابع برای فراخوانی مجدد در صورت تغییر داینامیک منوها
    function refreshMegaMenus() {
        // پاکسازی تایمرها
        clearTimeout(hoverTimer);
        clearTimeout(megaMenuHoverTimer);
        
        // بستن همه مگامنوها
        $('.mega-menu').removeClass('active');
        currentMegaMenu = null;
        
        // راه‌اندازی مجدد منوها
        setupMenus();
    }
    
    // اکسپوز کردن تابع برای استفاده توسط کدهای دیگر
    window.refreshMegaMenus = refreshMegaMenus;
    
    // اضافه کردن جستجو در مگامنو (اختیاری)
    $('.mega-menu-search input').on('keyup', function() {
        var searchText = $(this).val().toLowerCase();
        var parentMegaMenu = $(this).closest('.mega-menu');
        
        if (searchText.length > 1) {
            parentMegaMenu.find('.submenu-link').each(function() {
                var linkText = $(this).text().toLowerCase();
                if (linkText.indexOf(searchText) >= 0) {
                    $(this).parent().show();
                } else {
                    $(this).parent().hide();
                }
            });
        } else {
            parentMegaMenu.find('.submenu-item').show();
        }
    });
});