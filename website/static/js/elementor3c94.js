(function ($, elementor) {
    "use strict";

    var Apdash = {

        init: function () {

            var widgets = {
                'tt-hero-static.default': Apdash.Banner,
                'at-coming-soon.default': Apdash.ComingSoon,
                'tt-screenshots.default': Apdash.Slider,
                'tt-pricing-table.default': Apdash.Pricing,
                'tt-google-map.default': Apdash.GoogleMap,
                'tt-testimonial.default': Apdash.Testimonial,
                'tt-logo-carousel.default': Apdash.Logo,
            };
            $.each(widgets, function (widget, callback) {
                elementor.hooks.addAction('frontend/element_ready/' + widget, callback);
            });

        },

        Pricing: function ($scope) {
            var element = $scope.find('#js-contcheckbox');
            element.change(function () {
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

        },

        GoogleMap: function ($scope) {
            var map = $scope.find('.gmap3-area');

            map.each(function () {
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
                // .marker(function (map) {
                //     return {
                //         position: map.getCenter(),
                //         icon: mrkr
                //     };
                // })

            });

        },

        Banner: function ($scope) {
            var counting = $scope.find('.countdown');

            counting.each(function (index, value) {
                var count_year = $(this).attr("data-count-year");
                var count_month = $(this).attr("data-count-month");
                var count_day = $(this).attr("data-count-day");
                var count_date = count_year + '/' + count_month + '/' + count_day;
                $(this).countdown(count_date, function (event) {
                    $(this).html(
                        event.strftime('<div class="counting"><span class="CountdownContent">%D<span class="CountdownLabel">Days</span></span><span class="CountdownSeparator">:</span></div><div class="counting"><span class="CountdownContent">%H <span class="CountdownLabel">Hours</span></span><span class="CountdownSeparator">:</span></div><div class="counting"><span class="CountdownContent">%M <span class="CountdownLabel">Minutes</span></span><span class="CountdownSeparator">:</span></div><div class="counting"><span class="CountdownContent">%S <span class="CountdownLabel">Seconds</span></span></div>')
                    );
                });
            });
        },

          ComingSoon: function ($scope) {
            var counting = $scope.find('.countdown');

            counting.each(function (index, value) {
                var count_year = $(this).attr("data-count-year");
                var count_month = $(this).attr("data-count-month");
                var count_day = $(this).attr("data-count-day");
                var count_date = count_year + '/' + count_month + '/' + count_day;
                $(this).countdown(count_date, function (event) {
                    $(this).html(
                        event.strftime('<div class="counting"><span class="CountdownContent">%D<span class="CountdownLabel">Days</span></span><span class="CountdownSeparator">:</span></div><div class="counting"><span class="CountdownContent">%H <span class="CountdownLabel">Hours</span></span><span class="CountdownSeparator">:</span></div><div class="counting"><span class="CountdownContent">%M <span class="CountdownLabel">Minutes</span></span><span class="CountdownSeparator">:</span></div><div class="counting"><span class="CountdownContent">%S <span class="CountdownLabel">Seconds</span></span></div>')
                    );
                });
            });
        },


        Slider: function ($scope) {
            var slideInit = $scope.find('[data-swiper]');

            slideInit.each(function () {
                var swps = document.querySelectorAll('[data-swiper]');

                if (swps.length > 0) {
                    swps.forEach(function (swp) {
                        var config = JSON.parse(swp.getAttribute('data-swiper'));
                        var mySwiper = new Swiper(swp, config);

                        $('.swiper-slide').on('mouseover', function () {
                            mySwiper.autoplay.stop();
                        });

                        $('.swiper-slide').on('mouseout', function () {
                            mySwiper.autoplay.start();
                        });
                    });

                }
            });
        },


        Testimonial: function ($scope) {

            var slideInit = $scope.find('[data-testi]');

            slideInit.each(function () {
                var swps = document.querySelectorAll('[data-testi]');

                if (swps.length > 0) {
                    swps.forEach(function (swp) {
                        var config = JSON.parse(swp.getAttribute('data-testi'));
                        var mySwiper = new Swiper(swp, config);

                        $('.swiper-slide').on('mouseover', function () {
                            mySwiper.autoplay.stop();
                        });

                        $('.swiper-slide').on('mouseout', function () {
                            mySwiper.autoplay.start();
                        });
                    });

                }


            });
        },



        Logo: function ($scope) {

            var slideInit = $scope.find('[data-logo]');

            slideInit.each(function () {
                var swps = document.querySelectorAll('[data-logo]');

                if (swps.length > 0) {
                    swps.forEach(function (swp) {
                        var config = JSON.parse(swp.getAttribute('data-logo'));
                        var mySwiper = new Swiper(swp, config);

                        $('.swiper-slide').on('mouseover', function () {
                            mySwiper.autoplay.stop();
                        });

                        $('.swiper-slide').on('mouseout', function () {
                            mySwiper.autoplay.start();
                        });
                    });

                }


            });
        },

        Animation: function ($scope) {
            var animation = $scope.find('.overlay_effect');
            var title = $scope.find('.typing-title');
            title.each(function () {

                $('.typed-title').typed({
                    stringsElement: $('.typing-title'),
                    typeSpeed: 100,
                    startDelay: 500,
                    backSpeed: 100,
                    backDelay: 500,
                    loop: true,
                });

            });

            animation.each(function () {
                var $single_portfolio_img = $('.overlay_effect');
                var $window = $(window);

                function scroll_addclass() {
                    var window_height = $(window).height() - 200;
                    var window_top_position = $window.scrollTop();
                    var window_bottom_position = (window_top_position + window_height);

                    $.each($single_portfolio_img, function () {
                        var $element = $(this);
                        var element_height = $element.outerHeight();
                        var element_top_position = $element.offset().top;
                        var element_bottom_position = (element_top_position + element_height);

                        //check to see if this current container is within viewport
                        if ((element_bottom_position >= window_top_position) &&
                            (element_top_position <= window_bottom_position)) {
                            $element.addClass('is_show');
                        }
                    });
                }

                $window.on('scroll resize', scroll_addclass);
                $window.trigger('scroll');

                // var wow = new WOW({
                //     boxClass: 'wow',
                //     animateClass: 'animated',
                //     offset: 0,
                //     mobile: false,
                //     live: true,
                //     scrollContainer: null
                // });
                // wow.init();
            });
        },


    };
    $(window).on('elementor/frontend/init', Apdash.init);
}(jQuery, window.elementorFrontend));