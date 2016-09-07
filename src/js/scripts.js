$(document).ready(function(){

    var $grid, $grid2;

    function isMediumWidth() {
        return $('#medium-indicator').is(':visible');
    }

    function isMinWidth() {
        return $('#min-indicator').is(':visible');
    }

    function isMobileWidth() {
        return $('#mobile-indicator').is(':visible');
    }

    function normalize() {

        if (!isMediumWidth()) {
            var paddings = {
                'x1': 48,
                'x2': 23.55,
                'x3': 15.4,
                'x4': 48.1,
                'x4mod': 23.6,
                'x5': 31.8
            };
        } else if (!isMinWidth()) {
            var paddings = {
                'x1': 56,
                'x2': 27.55,
                'x3': 18.3,
                'x4': 56.1,
                'x4mod': 27.55,
                'x5': 36.8
            };
        } else if(!isMobileWidth()) {
            var paddings = {
                'x1': 96,
                'x2': 27.55,
                'x3': 24.3,
                'x4': 96,
                'x4mod': 35.55,
                'x5': 46.8
            };
        } else {
            var paddings = {
                'x1': 96,
                'x2': 47.55,
                'x3': 74.3,
                'x4': 86.1,
                'x4mod': 75.55,
                'x5': 76.8
            };
        }
        if (!isMobileWidth()) {
            if (!Packery.data($('.grid')[0])) {
                setTimeout(function(){
                    packeryInit();
                },100);

            }
            var containerW = parseInt($('.n-content').width());
            $('.x1').css({
                'height': parseInt(paddings.x1 * containerW / 100)
            });
            $('.x2').css({
                'height': parseInt(paddings.x2 * containerW / 100)
            });
            $('.x3').css({
                'height': parseInt(paddings.x3 * containerW / 100)
            });
            $('.x4').css({
                'height': parseInt(paddings.x4 * containerW / 100)
            });
            $('.x4--mod').css({
                'height': parseInt(paddings.x4mod * containerW / 100)
            });
            $('.x5').css({
                'height': parseInt(paddings.x5 * containerW / 100)
            });
        } else {
            $('.grid__item').removeAttr('style');
            $('.n-content').removeAttr('style');
            $('.grid__item').removeAttr('style');
            $('.n-sidebar').removeAttr('style');
            if (Packery.data($('.grid')[0])) {
                $grid.packery('destroy');
                $grid2.packery('destroy');
            }
        }

        $('.n-sidebar').removeClass('n-sidebar--active');
    }

    normalize();

    $(window).on('resize',normalize);

    $('.n-header__burger').click(function(e){
        $('.n-sidebar').toggleClass('menu-active');
        $('.n-header__burger').toggleClass('n-header__burger--active');
        $('body').toggleClass('hidden');
    });

    $('.n-sidebar__item').click(function(e){
        e.preventDefault()
        if (!$(this).find('.n-sidebar__sublist').length) {
            return;
        }
        $(this).find('.n-sidebar__sublist').show();
        var height = $(this).find('.n-sidebar__sublist').outerHeight();
        var prevHeight = $('.n-sidebar__list').outerHeight();
        $(this).find('.n-sidebar__sublist').data('height', prevHeight + 'px');
        if (height > $('.n-sidebar__list').height()) {
            TweenMax.to($('.n-sidebar__list'),0.5, {
                css: {
                    "height": height + 'px'
                },
            });
        }
        TweenMax.to($('.n-sidebar__list'),0.5, {
            css: {
                "left": "-100%"
            },
        });
    });

    $('.n-sidebar__back').click(function(e){
        e.stopPropagation();
        var height = $(this).parent().data('height');
        TweenMax.to($('.n-sidebar__list'),0.5, {
            css: {
                "height": height
            },
        });
        TweenMax.to($('.n-sidebar__list'),0.5, {
            css: {
                "left": "0%"
            },
            onComplete: function(){
                $('.n-sidebar__sublist').hide();
            }
        });
    });

    $('.n-menu__burger').click(function(){
        TweenMax.set($('.n-content'), {
            "transform": "translate3d(" + 0 + "px," + 0 + "px," + 0 + "px)",
            "-webkit-transform": "translate3d(" + 0 + "px," + 0 + "px," + 0 + "px)",
            "-moz-transform": "translate3d(" + 0 + "px," + 0 + "px," + 0 + "px)",
        });
        TweenMax.to($('.n-footer'),0.5, {
            css: {
                "margin-left": "292px"
            },
        });
        TweenMax.to($('.n-content'),0.5, {
            css: {
                "transform": "translate3d(" + 230 + "px," + 0 + "px," + 0 + "px)",
                "-webkit-transform": "translate3d(" + 230 + "px," + 0 + "px," + 0 + "px)",
                "-moz-transform": "translate3d(" + 230 + "px," + 0 + "px," + 0 + "px)",
            },
            onComplete: function () {
                TweenMax.set($('.n-content'), {
                    css: {
                    "transform": "translate3d(" + 0 + "px," + 0 + "px," + 0 + "px)",
                    "-webkit-transform": "translate3d(" + 0 + "px," + 0 + "px," + 0 + "px)",
                    "-moz-transform": "translate3d(" + 0 + "px," + 0 + "px," + 0 + "px)",
                    "margin-left": "292px",
                    "margin-right": "-232px"
                    },
                    onComplete: function(){
                        TweenMax.to($('.n-content'),0.5,{
                            css: {
                                "margin-right": "0px"
                            },
                            onComplete:function(){

                            },
                            onUpdate: function(){
                                if (mainSlider) {
                                    mainSlider.update(true);
                                }
                            }
                        })
                    }
                });
                mainSlider.update(true);
            }
        });
        TweenMax.to($('.n-sidebar'),1, {
            css: {
                "left":"0px"
            },
        });
        $('.n-menu').toggleClass('n-menu--active');
    });

    $('.n-sidebar__close').click(function(){
        $('.n-sidebar').toggleClass('n-sidebar--active');
        TweenMax.to($('.n-content'),1, {
            css: {
                "margin-right":"-232px"
            },
            onUpdate: function(){
                if (mainSlider) {
                    mainSlider.update(true);
                }
            },
            onComplete: function(){
                TweenMax.set($('.n-content'), {
                    "transform": "translate3d(" + 230 + "px," + 0 + "px," + 0 + "px)",
                    "-webkit-transform": "translate3d(" + 230 + "px," + 0 + "px," + 0 + "px)",
                    "-moz-transform": "translate3d(" + 230 + "px," + 0 + "px," + 0 + "px)",
                    "margin-left": "62px",
                    "margin-right": "0px"
                });
                $('.n-menu').toggleClass('n-menu--active');
                TweenMax.to($('.n-footer'),0.5, {
                    css: {
                        "margin-left": "62px"
                    },
                });
                TweenMax.to($('.n-content'),0.5, {
                    css: {
                        "transform": "translate3d(" + 0 + "px," + 0 + "px," + 0 + "px)",
                        "-webkit-transform": "translate3d(" + 0 + "px," + 0 + "px," + 0 + "px)",
                        "-moz-transform": "translate3d(" + 0 + "px," + 0 + "px," + 0 + "px)",
                    },
                    onComplete: function () {
                        TweenMax.set($('.n-content'), {
                            "transform": "translate3d(" + 0 + "px," + 0 + "px," + 0 + "px)",
                            "-webkit-transform": "translate3d(" + 0 + "px," + 0 + "px," + 0 + "px)",
                            "-moz-transform": "translate3d(" + 0 + "px," + 0 + "px," + 0 + "px)",
                            "margin-left": "62px"
                        });
                        if (mainSlider) {
                            mainSlider.update(true);
                        }
                    }
                });
                TweenMax.to($('.n-sidebar'),0.5, {
                    css: {
                        "left":"-292px"
                    },
                });
                if (mainSlider) {
                    mainSlider.update(true);
                }
            }
        });

    });

    function packeryInit(){
        $grid = $('.grid').packery({
            itemSelector: '.grid__item',
            percentPosition: true,
            stamp: '.stamp',
            gutter: '.gutter-sizer'
        });


        $grid2 = $('.grid2').packery({
            itemSelector: '.grid__item',
            percentPosition: true,
            gutter: '.gutter-sizer'
        });
    }

    if (!isMobileWidth()) {
        packeryInit();
    }

    if ($('#mainSlider').length) {
        var mainSlider = new Swiper('#mainSlider', {
            loop: true,
            effect: 'coverflow',
            nextButton: '.n-slider__arrowR',
            prevButton: '.n-slider__arrowL',
            speed: 600
        });
    };

    if ($('#dateSlider').length) {
        var dateSlider = new Swiper('#dateSlider', {
            loop: true,
            speed: 600
        });
    };

    $( "#holl" ).selectmenu({
        appendTo: "#hollSelect"
    });

    $( "#actions" ).selectmenu({
        appendTo: "#actionsSelect"
    });

    $('.n-events li').each(function(index){
        $(this).hover(function(){
            dateSlider.slideTo(index);
        })
    });

    var events = [
        {
            date: '24.9.2016',
            events: [
                'hello hello',
                'buy buy',
            ]
        },
    ]

    $('#datepicker').datepicker({
        monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
        showOtherMonths: true,
        selectOtherMonths: true,
        autoClose: true,
        onSelect: function(date){
            setTimeout(function(){
                loadEvents(events);
            });
        },
        onChangeMonthYear: function(){
            setTimeout(function(){
                loadEvents(events);
            });
        }
    });
    $('#datepicker').datepicker('show');

    function loadEvents(events) {
        $('.ui-datepicker-calendar tbody').find('td').each(function(index){
            $(this).append('<div class="event-holder"><div class="event-continer"></div></div>')
            for (var i=0; i<=events.length - 1; i++) {
                var date = events[i].date.split('.');
                if (parseInt($(this).find('a').html()) == date[0] && $(this).data('month') == date[1] - 1 && $(this).data('year') == date[2]) {
                    for (var j=0; j<=events[i].events.length - 1; j++) {
                        $(this).find('.event-holder').append('<i class="n-event"><b>'+events[i].events[j]+'</b></i>');
                    }
                }
            };

        });
    }

    loadEvents(events);

    function initialize() {

        var Coordinates = [
            {lat: 59.9551157, lng: 30.3116487}
        ];

        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(59.9551157, 30.3116487),
            disableDefaultUI: true
        };

        var map = new google.maps.Map(document.getElementById('map'),mapOptions);
        var image = {
            anchor: new google.maps.Point(10, 42),
            path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
            strokeColor: '#AD1380',
            strokeWeight: 5,
            scale: 0.3
        };

        var coords = {
            lat: Coordinates[0].lat,
            lng: Coordinates[0].lng,
        };

        var contentString = '<div class="infoWindow">'+
            '<div class="infoWindow__container">' +
                '<div class="infoWindow__left">' +
                    '<img src="img/logo2.svg" alt="">'+
                '</div>'+
                '<div class="infoWindow__right">' +
                    '197198, г. Санкт-Петербург Александровский парк,'+
                    'д. 4, «Театр «Мюзик-Холл» Станция метро "Горьковская" '+
                '</div>'+
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            pixelOffset: new google.maps.Size(-300,127),
            maxWidth: 470
        });

        var marker = new google.maps.Marker({
            position: coords,
            map: map,
            icon: image,
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });

        infowindow.open(map, marker);

        google.maps.event.addListener(infowindow, 'domready', function() {
            $('.gm-style-iw').css({
                'color': 'red !important'
            });
            var elem = document.getElementsByClassName('gm-style-iw')[0].parentNode;
            var container = document.getElementsByClassName('gm-style-iw')[0].previousSibling.children[1];
            var arrowShadow = document.getElementsByClassName('gm-style-iw')[0].previousSibling.children[0];
            var arrow = document.getElementsByClassName('gm-style-iw')[0].previousSibling.children[2];
            elem.style.boxShadow = "2px 6px 10px rgba(0,0,0,0.3)";
            container.style.border = "none";
            container.style.boxShadow = "none";
            container.style.backgroundColor = "#fff";
            arrowShadow.style.display = "none";
            arrow.style.display = "none";
            console.log(container);
        });
    }

    if ($('#map').length) {
        initialize();
    }
});