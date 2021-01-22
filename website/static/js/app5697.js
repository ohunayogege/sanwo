var THEMETAGS = THEMETAGS || {};

(function ($) {

    /*!----------------------------------------------
        # This beautiful code written with heart
        # by Mominul Islam <hello@mominul.me>
        # In Dhaka, BD at the ThemeTags workstation.
        ---------------------------------------------*/

    // USE STRICT
    "use strict";

    window.TT = {
        init: function () {
            // Header
            this.header = $('.site-header');
            this.body = $('body');
            this.wpadminbar = $('#wpadminbar');

            this.headerFixed = {
                initialOffset: parseInt(this.header.attr('data-fixed-initial-offset')) || 100,

                enabled: $('[data-header-fixed]').length,
                value: false,

                mobileEnabled: $('[data-mobile-header-fixed]').length,
                mobileValue: false
            };


            // Logos
            this.siteBranding = this.header.find('.site-branding');
            this.siteTitle = this.header.find('.site-title');
            this.logo = this.header.find('.main-logo');
            this.fixedLogo = this.header.find('.logo-sticky');
            this.mobileLogo = this.header.find('.mobile-logo');
            this.fixedMobileLogo = this.header.find('.fixed-mobile-logo');

            this.logoForOnepage = this.header.find('.for-onepage');
            this.logoForOnepageDark = this.logoForOnepage.find('.dark');
            this.logoForOnepageLight = this.logoForOnepage.find('.light');

            // Menus
            this.megaMenu = this.header.find('#mega-menu-wrap');
            this.mobileMenu = $('[data-mobile-menu-resolution]').data('mobile-menu-resolution');


            this.resize();
        },

        resize: function () {
            this.isDesktop = $(window).width() >= 991;
            this.isMobile = $(window).width() <= 991;
            this.isPad = $(window).width() <= 1024;
            this.isMobileMenu = $(window).width() <= TT.mobileMenu
        }
    };

    THEMETAGS.initialize = {
        init: function () {
            THEMETAGS.initialize.general();
            THEMETAGS.initialize.blog();
            THEMETAGS.initialize.swiperSlider();
            THEMETAGS.initialize.countUp();
            THEMETAGS.initialize.countDown();
            THEMETAGS.initialize.sectionSwitch();
            THEMETAGS.initialize.googleMap();
            THEMETAGS.initialize.contactFrom();
            THEMETAGS.initialize.handleMobileHeader();
        },

        /*========================================================*/
        /*=           Collection of snippet and tweaks           =*/
        /*========================================================*/

        general: function () {
            $('.off-canvas').on('click', function () {
                $('.off_canvus_item').addClass('active');
            });

            $('.canvas_menu_header .close_icon').on('click', function () {
                $('.off_canvus_item').removeClass('active');
            })


            if ($('body').hasClass("admin-bar")) {
                $('body').addClass('header-position');
            }

            var $body = $('body');

            var $popup = $('.canvas-menu-wrapper');


            var wow = new WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                mobile: false,
                live: true,
                scrollContainer: null
            });
            wow.init();


            $("#js-contcheckbox").change(function () {
                if (this.checked) {
                    $('.yearly-price').css('display', 'none');
                    $('.monthly-price').css('display', 'block');
                    $('.afterinput').addClass('active');
                    $('.pricing-switch-wrap').removeClass('yearly');
                    $('.beforeinput').removeClass('active');


                } else {
                    $('.pricing-switch-wrap').addClass('yearly');
                    $('.yearly-price').css('display', 'block');
                    $('.monthly-price').css('display', 'none');
                    $('.afterinput').removeClass('active');
                    $('.beforeinput').addClass('active');
                }
            });


            if ($("#wpadminbar").length && $(window).width() < 768) {
                $("#wpadminbar").css({
                    position: "fixed",
                    top: "0"
                })
            }


            var blogContainer = $(".blog-masonry");

            blogContainer.masonry({
                itemSelector: '.post-item',
                percentPosition: true
            });

            /* Bootstrap Accordion  */
            $('.faq .card').each(function () {
                var $this = $(this);
                $this.on('click', function (e) {
                    var has = $this.hasClass('active');
                    $('.faq .card').removeClass('active');
                    if (has) {
                        $this.removeClass('active');
                    } else {
                        $this.addClass('active');
                    }
                });
            });


            /* Magnefic Popup */
            $('.popup-video').each(function () {
                $('.popup-video').magnificPopup({
                    type: 'iframe'
                });
            });


            $("#page-open-main-menu").on('click', function (e) {
                e.preventDefault();
                var mask = '<div class="mask-overlay">';
                $(mask).hide().appendTo('body').fadeIn('fast');
                $popup.addClass('open');
                $(".tt-hamburger").addClass('active');
                $body.addClass('page-popup-open');
                $("html").addClass("no-scroll sidebar-open").height(window.innerHeight + "px");

            });

            $("#page-close-main-menu, #mega-menu-wrap .menu li a").on('click', function (e) {
                e.preventDefault();
                $('.mask-overlay').remove();
                $body.removeClass('page-popup-open');
                $popup.removeClass('open');
                $('.sub-menu, .sub-menu-wide').removeAttr('style');
                $("html").removeClass("no-scroll sidebar-open").height("auto");
                $(".tt-hamburger").removeClass('active');
                $('.has-submenu .menu-link').removeClass('active');
            });
        },

        /*===========================================*/
        /*=           handle Mobile Header          =*/
        /*===========================================*/
        handleMobileHeader: function () {

            if (TT.header && TT.header.length) {

                if (TT.isMobileMenu) {
                    TT.header.addClass('mobile-header');
                    TT.body.addClass('is-mobile-menu');
                    setTimeout(function () {
                        $('.main-nav').addClass('unhidden');
                    }, 300);
                } else {
                    TT.header.removeClass('mobile-header');
                    TT.body.removeClass('is-mobile-menu');
                    $('.main-nav').addClass('visible');
                }
            }
        },

        /*==========================================*/
        /*=           handle Fixed Header          =*/
        /*==========================================*/

        handleFixedHeader: function () {

            TT.init();
            var fixed = TT.headerFixed;

            if ($(document).scrollTop() > fixed.initialOffset) {

                if ((!TT.isMobileMenu && fixed.enabled && !fixed.value) ||
                    (TT.isMobileMenu && fixed.mobileEnabled && !fixed.mobileValue)) {

                    if (TT.isMobileMenu) {
                        fixed.mobileValue = true;
                    } else {
                        fixed.value = true;
                    }

                    TT.header.addClass('header-fixed no-transition');

                }

            } else if (fixed.value || fixed.mobileValue) {

                fixed.value = false;
                fixed.mobileValue = false;

                TT.header.removeClass('header-fixed');

            }

            // Effect appearance
            if ($(document).scrollTop() > fixed.initialOffset + 50) {
                TT.header.removeClass('no-transition').addClass('showed');
            } else {
                TT.header.removeClass('showed').addClass('no-transition');
            }
        },

        /*===========================*/
        /*=           Blog          =*/
        /*===========================*/

        blog: function () {

            if ((typeof $.fn.imagesLoaded !== 'undefined') && (typeof $.fn.isotope !== 'undefined')) {

                var blogContainer = $(".saaspik-masonry");

                blogContainer.masonry({
                    itemSelector: '.grid-item',
                    percentPosition: true
                });
            }
        },

        /*====================================*/
        /*=           Swiper Slider          =*/
        /*====================================*/

        swiperSlider: function () {
            $('#portfolio-testimonial').each(function () {
                var swiper = new Swiper('#portfolio-testimonial', {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    loop: true,
                    speed: 800,
                    autoplay: {
                        delay: 5000,
                    },
                    navigation: {
                        nextEl: '.testi-button-next',
                        prevEl: '.testi-button-prev',
                    },
                });
            });

            $('.related-product').each(function () {
                var swiper = new Swiper('.related-product', {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    loop: true,
                    speed: 800,
                    autoplay: {
                        delay: 2000,
                    },
                    navigation: {
                        nextEl: '.product-button-next',
                        prevEl: '.product-button-prev',
                    },
                });
            });

        },

        /*=====================================*/
        /*=           Section Switch          =*/
        /*=====================================*/

        sectionSwitch: function () {
            $('.page-scroll, .site-header .menu li a').on('click', function () {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    if (target.length > 0) {

                        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                        $('html,body').animate({
                            scrollTop: target.offset().top - 130
                        }, 1000);
                        return false;
                    }
                }
            });
        },

        /*==============================*/
        /*=           Countup          =*/
        /*==============================*/

        countUp: function () {
            var options = {
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
                prefix: '',
                suffix: ''
            };

            var counteEl = $('[data-counter]');

            if (counteEl) {
                counteEl.each(function () {
                    var val = $(this).data('counter');

                    var countup = new CountUp(this, 0, val, 0, 2.5, options);
                    $(this).appear(function () {
                        countup.start();
                    }, {
                        accX: 0,
                        accY: 0
                    })
                });
            }
        },

        /*=================================*/
        /*=           Countdown          =*/
        /*=================================*/
        countDown: function () {

            if ($('.countdown').length > 0) {

                $('.countdown').each(function (index, value) {
                    var count_year = $(this).data("count-year");
                    var count_month = $(this).data("count-month");
                    var count_day = $(this).data("count-day");
                    var count_date = count_year + '/' + count_month + '/' + count_day;
                    $(this).countdown(count_date, function (event) {
                        $(this).html(event.strftime('<div class="counting"><span class="CountdownContent">%D<span class="CountdownLabel">Days</span></span></div><div class="counting"><span class="CountdownContent">%H <span class="CountdownLabel">Hours</span></span></div><div class="counting"><span class="CountdownContent">%M <span class="CountdownLabel">Minutes</span></span></div><div class="counting"><span class="CountdownContent">%S <span class="CountdownLabel">Seconds</span></span></div>'));
                    });
                });
            }
        },

        /*=================================*/
        /*=           Google Map          =*/
        /*=================================*/

        googleMap: function () {

            $('.gmap3-area').each(function () {
                var $this = $(this),
                    key = $this.data('key'),
                    lat = $this.data('lat'),
                    lng = $this.data('lng'),
                    mrkr = $this.data('mrkr'),
                    zoom = $this.data('zoom'),
                    scrollwheel = $this.data('scrollwheel') || false;

                $this.gmap3({
                    center: [lat, lng],
                    zoom: zoom,
                    scrollwheel: scrollwheel,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    styles: [{
                        "featureType": "administrative.country",
                        "elementType": "geometry.fill",
                        "stylers": [{
                            "visibility": "on"
                        }]
                    }]
                })
                    .marker(function (map) {
                        return {
                            position: map.getCenter(),
                            icon: mrkr
                        };
                    })

            });

        },

        /*===========================*/
        /*=           Form          =*/
        /*===========================*/

        contactFrom: function () {
            $('[data-sanwo-form-error]').each(function () {
                var $this = $(this);
                $('.form-result', $this).css('display', 'none');

                $this.submit(function () {
                    $('button[type="submit"]', $this).addClass('clicked');
                    // Create a object and assign all fields name and value.
                    var values = {};

                    $('[name]', $this).each(function () {
                        var $this = $(this),
                            $name = $this.attr('name'),
                            $value = $this.val();
                        values[$name] = $value;
                    });

                    // Make Request
                    $.ajax({
                        url: $this.attr('action'),
                        type: 'POST',
                        data: values,
                        success: function success(data) {

                            if (data.error == true) {
                                $('.form-result', $this).addClass('alert-warning').removeClass('alert-success alert-danger').css('display', 'block');
                            } else {
                                $('.form-result', $this).addClass('alert-success').removeClass('alert-warning alert-danger').css('display', 'block');
                            }
                            $('.form-result > .content', $this).html(data.message);
                            $('button[type="submit"]', $this).removeClass('clicked');

                            console.log("Success");
                        },
                        error: function error() {
                            $('.form-result', $this).addClass('alert-danger').removeClass('alert-warning alert-success').css('display', 'block');
                            $('.form-result > .content', $this).html('Sorry, an error occurred.');
                            $('button[type="submit"]', $this).removeClass('clicked');
                            console.log("Error");
                        }
                    });
                    return false;
                });


            });
        }


    };

    THEMETAGS.documentOnReady = {
        init: function () {
            THEMETAGS.initialize.init();
        },
    };

    THEMETAGS.documentOnLoad = {
        init: function () {
            TT.init();
            THEMETAGS.initialize.handleMobileHeader();
            $("#preloader").fadeOut("slow");
        },
    };

    THEMETAGS.documentOnResize = {
        init: function () {
            if ($("#wpadminbar").length && $(window).width() < 768) {
                $("#wpadminbar").css({
                    position: "fixed",
                    top: "0"
                })
            }
            TT.resize();
            THEMETAGS.initialize.handleMobileHeader();
            THEMETAGS.initialize.handleFixedHeader();
        },
    };

    THEMETAGS.documentOnScroll = {
        init: function () {
            THEMETAGS.initialize.handleFixedHeader();
        },
    };

    // Initialize Functions
    $(document).ready(THEMETAGS.documentOnReady.init);
    $(window).on('load', THEMETAGS.documentOnLoad.init);
    $(window).on('resize', THEMETAGS.documentOnResize.init);
    $(window).on('scroll', THEMETAGS.documentOnScroll.init);

})(jQuery);

