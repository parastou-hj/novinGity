
$(document).ready(function() {
    // ========== Mega Menu Functionality ==========
    
    // Variables for mega menu navigation
    const navItems = $(".nav-link.dropdown-toggle");
    const megaMenus = $(".mega-menu");
    // const menuOverlay = $(".menu-overlay");
    
    // Function to handle hover events for mega menus
    function handleMegaMenuHover() {
        let hoverTimeout;
        
        // On mouseenter, show the corresponding mega menu
        navItems.on("mouseenter", function() {
            const targetMenuId = $(this).data("megamenu");
            
            // Clear any existing timeout
            clearTimeout(hoverTimeout);
            
            // Hide all mega menus first
            megaMenus.removeClass("active");
            
            // Show the target menu and overlay
            $("#" + targetMenuId).addClass("active");
            // menuOverlay.addClass("active");
        });
        
        // On mouseleave from nav item, set timeout to hide menu
        navItems.on("mouseleave", function() {
            hoverTimeout = setTimeout(function() {
                megaMenus.removeClass("active");
                // menuOverlay.removeClass("active");
            }, 300); // Small delay to allow moving mouse to mega menu
        });
        
        // On mouseenter mega menu, clear timeout
        megaMenus.on("mouseenter", function() {
            clearTimeout(hoverTimeout);
        });
        
        // On mouseleave mega menu, hide it
        megaMenus.on("mouseleave", function() {
            $(this).removeClass("active");
            // menuOverlay.removeClass("active");
        });
        
        // Close mega menu when clicking outside
        $(document).on("click", function(e) {
            if (!$(e.target).closest(".nav-item, .mega-menu").length) {
                megaMenus.removeClass("active");
                // menuOverlay.removeClass("active");
            }
        });
    }
    
    // ========== Tab System Functionality ==========
    
    // Function to initialize tab system
    function initTabSystem() {
        // For product menu tabs
        const pTabs = $(".p-tab-earth");
        
        // Activate first tab by default
        pTabs.first().addClass("active");
        $("#" + pTabs.first().data("tab")).addClass("active");
        
        // Handle tab click
        pTabs.on("click", function() {
            const tabId = $(this).data("tab");
            
            // Remove active class from all tabs and contents
            $(".p-tab-earth, .p-content-earth").removeClass("active");
            
            // Add active class to current tab and content
            $(this).addClass("active");
            $("#" + tabId).addClass("active");
        });
        
        // Handle tab hover (alternative to click if preferred)
        pTabs.on("mouseenter", function() {
            const tabId = $(this).data("tab");
            
            // Remove active class from all tabs and contents
            $(".p-tab-earth, .p-content-earth").removeClass("active");
            
            // Add active class to current tab and content
            $(this).addClass("active");
            $("#" + tabId).addClass("active");
        });
    }
    
    // ========== Mobile Menu Functionality ==========
    
    // Function to initialize mobile menu
    function initMobileMenu() {
        const mobileMenuBtn = $(".mobile-menu-btn");
        const navMenu = $(".nav-menu");
        
        mobileMenuBtn.on("click", function() {
            $(this).toggleClass("active");
            navMenu.toggleClass("active");
            menuOverlay.toggleClass("active");
        });
        
        // Close mobile menu when clicking overlay
        menuOverlay.on("click", function() {
            mobileMenuBtn.removeClass("active");
            navMenu.removeClass("active");
            menuOverlay.removeClass("active");
        });
    }
    
    // ========== General Utility Functions ==========
    
    // Function to handle window resize events
    function handleResize() {
        $(window).on("resize", function() {
            if ($(window).width() > 991) {
                $(".mobile-menu-btn").removeClass("active");
                $(".nav-menu").removeClass("active");
                menuOverlay.removeClass("active");
            }
        });
    }
    
    // Initialize all functionalities
    handleMegaMenuHover();
    initTabSystem();
    initMobileMenu();
    handleResize();
    
    // ========== Additional Tab System (From Your Example) ==========
    
    // Initialize tab system based on your example code
    function initNavTabs() {
        var tabs = $(".nav-item");
        var firstTab = tabs.first();
        
        // Activate first tab by default (if it has data-tab attribute)
        if (firstTab.data("tab")) {
            firstTab.addClass("active");
            $("#" + firstTab.data("tab")).addClass("active");
        }
        
        // Handle tab hover
        $(tabs).on("mouseenter", function() {
            if ($(this).data("tab")) {
                $(".nav-item.active, .nav-content.active").removeClass("active");
                $(this).addClass("active");
                $("#" + $(this).data("tab")).addClass("active");
            }
        });
        
        // Handle click outside to close
        $('body').on('mouseover', function(e) {
            if (!$(e.target).closest('.nav-item').length) {
                $('.nav-item').removeClass('active');
                $('.nav-content').removeClass('active');
            }
        });
    }
    
    // Initialize the additional tab system
    initNavTabs();
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