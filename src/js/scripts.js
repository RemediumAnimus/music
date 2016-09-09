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
    };

    normalize();

    $(window).on('resize',normalize);

    $('.n-header__burger').click(function(e){
        $('.n-sidebar').toggleClass('menu-active');
        $('.n-header__burger').toggleClass('n-header__burger--active');
        $('body').toggleClass('hidden');
    });

    $('.n-sidebar__item').click(function(e){
        //e.preventDefault();

        if (!$(this).find('.n-sidebar__sublist').length) {
            return;
        }
        var height = $(this).find('.n-sidebar__sublist').outerHeight();
        var prevHeight = $('.n-sidebar__list').outerHeight();

        $(this).find('.n-sidebar__sublist').show();
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

                if (mainSlider) {
                    mainSlider.update(true);
                }
            }
        });

        TweenMax.to($('.n-sidebar'),1, {
            css: {
                "left":"0px"
            },
        });

        TweenMax.to($('.n-fixed'),1, {
            css: {
                "left":"332px"
            },
        });

        TweenMax.to($('.n-footer'),0.5, {
            css: {
                "margin-left": "292px"
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

                TweenMax.to($('.n-fixed'),1, {
                    css: {
                        "left":"102px"
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

    $(document).on({
        mouseenter: function () {
            if(isMinWidth()) {return}
            var $container = $(this).find('.n-event__b');
            var height;
            TweenMax.killTweensOf($container);
            $container.css('height','auto');
            height = $container.css('height');
            $container.css('height','0');
            TweenMax.to($container,0.5, {
                css: {
                   'height':height
                },
                onComplete: function() {
                    $container.css('visibility','visible');
                    $container.stop().animate({
                        'opacity': 1
                    },'slow');
                }
            });
        },
        mouseleave: function () {
            if(isMinWidth()) {return}
            var $container = $(this).find('.n-event__b');
            TweenMax.killTweensOf($container);
            TweenMax.to($container,0.5, {
                css: {
                    "opacity": 0
                },
                onComplete: function(){
                    $container.css('visibility','visible');
                    TweenMax.to($container,0.5, {
                        css: {
                            'height':0
                        },
                    });
                }
            });
        }
    },'#bigDate2 .n-event');

    function innerScroll($elem) {
        var height = $elem.parent().find('.ui-menu').css('height');
        var $that = $elem;

        $elem.parent().find('.ui-menu').addClass('hidden');
        $that.parent().find('.ui-menu').addClass('scrollbar-inner');
        $('.scrollbar-inner').scrollbar({
            autoScrollSize: true,
            scrollx: "hidden"
        });
        $elem.parent().find('.ui-menu').css('height',0);
        TweenMax.to($elem.parent().find('.ui-menu'),0.5, {
            css: {
                "height": height
            },
            onComplete:function(){

            }
        });
        setTimeout(function(){
            $that.parent().find('.ui-menu').addClass('select-active');
        },100);
    };

    $( "#holl" ).selectmenu({
        appendTo: "#holl-Select",
        open: function(){
            innerScroll($(this));
        },
        close: function(){
            $(this).parent().find('.ui-menu').removeClass('select-active');
        }
    });

    $( "#actions" ).selectmenu({
        appendTo: "#actions-Select",
        open: function(){
            innerScroll($(this));
        },
        close: function(){
            $(this).parent().find('.ui-menu').removeClass('select-active');
        }
    });

    $( "#holl2" ).selectmenu({
        appendTo: "#holl-Select2",
        open: function(){
            innerScroll($(this));
        },
        close: function(){
            $(this).parent().find('.ui-menu').removeClass('select-active');
        }
    });

    $( "#actions2" ).selectmenu({
        appendTo: "#actions-Select2",
        open: function(){
            innerScroll($(this));
        },
        close: function(){
            $(this).parent().find('.ui-menu').removeClass('select-active');
        }
    });

    $( "#tabSelect" ).selectmenu({
        appendTo: "#tab-Select",
        open: function(){
            innerScroll($(this));
        },
        close: function(){
            $(this).parent().find('.ui-menu').removeClass('select-active');
        }
    });

    $( "#tabSelect2" ).selectmenu({
        appendTo: "#tab-Select2",
        open: function(){
            innerScroll($(this));
        },
        close: function(){
            $(this).parent().find('.ui-menu').removeClass('select-active');
        }
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
        {
            date: '14.9.2016',
            events: [
                'hello hello',
                'buy buy',
            ]
        },
        {
            date: '10.9.2016',
            events: [
                'hello hello',
                'buy buy',
                'wtf'
            ]
        },
    ];

    var request = (function() {
        var loaded = false;
        return function() {
            $.ajax({
                type: 'GET',
                url: 'events.json',
                error: function(xml,status,error){
                    console.log(status);
                },
                success: function(eventsBigDate) {
                    if (loaded) { return }
                    loadEventsBigDate('#bigDate',eventsBigDate);
                    loadEventsBigDate('#bigDate2',eventsBigDate);
                    $('#bigDate2 td').each(function(index){
                        if (!$(this).find('.n-event').length) {
                            $(this).hide();
                        }
                        $(this).find('.event-container').html(
                            $(this).find('.ui-state-default').html() + '<span>' + $('#bigDate2 .ui-datepicker-month').html() + '</span>'
                        );
                    });
                    loaded = true;
                }
            });
        }
    })();

    request();

    tabby.init({
        callback: (function() {
            var loaded = false;
            return function(){
                request();
            }
        })()
    });


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

    $('#bigDate').datepicker({
        monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
        dayNames: ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"],
        dayNamesMin: [ "Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье" ],
        showOtherMonths: true,
        autoClose: true,
        onSelect: function(date, inst){
            inst.inline = false;
        },
        onChangeMonthYear: function(){
            setTimeout(function(){
                $.ajax({
                    type: 'GET',
                    url: 'events.json',
                    error: function(xml,status,error){
                        console.log(status);
                    },
                    success: function(eventsBigDate) {
                        loadEventsBigDate('#bigDate',eventsBigDate);
                    }
                });
            });
        }
    });


    $('#bigDate2').datepicker({
        monthNames: [ "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря" ],
        dayNames: ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"],
        dayNamesMin: [ "Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье" ],
        showOtherMonths: true,
        autoClose: true,
        onSelect: function(e,inst){
            inst.inline = false;
        },
        onChangeMonthYear: function(inst){
            setTimeout(function(){
                $.ajax({
                    type: 'GET',
                    url: 'events.json',
                    error: function(xml,status,error){
                        console.log(status);
                    },
                    success: function(eventsBigDate) {
                        loadEventsBigDate('#bigDate2',eventsBigDate);
                        $('#bigDate2 td').each(function(index){
                            if (!$(this).find('.n-event').length) {
                                $(this).hide();
                            }
                            $(this).find('.event-container').html(
                                $(this).find('.ui-state-default').html() + '<span>' + $('#bigDate2 .ui-datepicker-month').html() + '</span>'
                            );
                        });
                        eventInit();
                    }
                });
            });
        }
    });

    function eventInit(){
        $('#bigDate2 td').click(function(e){
            if(!isMediumWidth()) {return}
            var $elem = $(e.target).closest('.n-event');
            var $container = $(e.target).closest('.n-event').find('.n-event__b');
            var $bg = $(e.target).closest('.n-event').find('.n-event__subBg');
            var height;


            $('.n-event').removeClass('active');
            $elem.addClass('active');

            $('.n-event').find('.n-event__b').animate({
                'opacity': '0',
                'height': '0'
            },'slow');

            TweenMax.killTweensOf($container);
            $container.css('height','auto');
            height = $container.css('height');
            $container.css('height','0');
            TweenMax.to($container,0.5, {
                css: {
                    'height':height
                },
                onComplete: function() {
                    $container.css('visibility','visible');
                    $container.stop().animate({
                        'opacity': 1
                    },'slow');
                }
            });
        });
    }
    eventInit();


    function loadEvents(events) {
        $('.n-date .ui-datepicker-calendar tbody').find('td').each(function(index){
            $(this).append('<div class="event-holder"><div class="event-container"></div></div>')
            for (var i=0; i<=events.length - 1; i++) {
                var date = events[i].date.split('.');
                if (parseInt($(this).find('a').html()) == date[0] && $(this).data('month') == date[1] - 1 && $(this).data('year') == date[2]) {
                    for (var j=0; j<=events[i].events.length - 1; j++) {
                        $(this).find('.event-holder').append('<i class="n-event"><b>'+events[i].events[j]+'</b></i>');
                    }
                }
            };

        });
    };

    function loadEventsBigDate(elem,events) {
        $('' + elem + ' .ui-datepicker-calendar tbody').find('td').each(function(index){
            $(this).append('<div class="event-holder"><div class="event-container"></div></div>');

            for (var i=0; i<=events.length - 1; i++) {
                var date = events[i].date.split('.');

                if (parseInt($(this).find('a').html()) == date[0] && $(this).data('month') == date[1] - 1 && $(this).data('year') == date[2]) {
                    $(this).find('.event-holder').append('<div class="n-event__bg" style="background-image:url('+ events[i].pic +')"></div><div class="n-event__cover"></div><div class="n-event__cont"></div>');

                    for (var j=0; j<=events[i].events.length - 1; j++) {
                        $(this).find('.event-holder .n-event__cont').append('' +
                            '<div class="n-event">' +
                                '<div class="n-event__subBg" style="background-image:url('+ events[i].pic +')"></div>' +
                                '<div class="n-event__type">' +
                                    '<div class="n-event__type__l">'+
                                        events[i].holl[j]+
                                    '</div>' +
                                    '<div class="n-event__type__r">'+
                                        events[i].type[j]+
                                    '</div>' +
                                '</div>' +
                                '<i class="n-event__info">'+
                                    '<span class="n-event__t"><a href="#">'+ events[i].events[j] +'</a></span>'+
                                    '<span class="n-event__b">'+ events[i].descriptions[j] +'</span>'+
                                '</i>' +
                                '<b>' +
                                    '<span class="n-event__time">'+
                                        events[i].time[j]+
                                    '</span>' +
                                '</b>' +
                                '<div class="n-event__age">'+
                                    events[i].age[j]+
                                '</div>'+
                                '<a class="event-btn" onclick=window.location="#">' +
                                    'Купить билет' +
                                '</a>'+
                            '</div>');
                    }
                }
            };
        });
    };

    loadEvents(events);

    function getDate(){
        var month = $('.ui-datepicker-month').html();
        var year = $('.ui-datepicker-year').html();
        $('.n-declarations__month span').html(month + ' ' + year);
        $('.ui-datepicker-other-month span').hide();
    };

    $('.n-declarations__month__arrL').click(function(){
        TweenMax.to($('#bigDate'),0.5, {
            css: {
                "opacity": "0"
            },
            onComplete: function(){
                $('.ui-datepicker-prev').click();
                getDate();
                setTimeout(function(){
                    TweenMax.to($('#bigDate'),0.5, {
                        css: {
                            "opacity": "1"
                        },
                    })
                },200);
            }
        });
        TweenMax.to($('#bigDate2'),0.5, {
            css: {
                "opacity": "0"
            },
            onComplete: function(){
                getDate();
                setTimeout(function(){
                    TweenMax.to($('#bigDate2'),0.5, {
                        css: {
                            "opacity": "1"
                        },
                    })
                },200);
            }
        });
    });

    $('.n-declarations__month__arrR').click(function(){
        TweenMax.to($('#bigDate'),0.5, {
            css: {
                "opacity": "0"
            },
            onComplete: function(){
                $('.ui-datepicker-next').click();
                getDate();
                setTimeout(function(){
                    TweenMax.to($('#bigDate'),0.5, {
                        css: {
                            "opacity": "1"
                        },
                    })
                },200);
            }
        });
        TweenMax.to($('#bigDate2'),0.5, {
            css: {
                "opacity": "0"
            },
            onComplete: function(){
                getDate();
                setTimeout(function(){
                    TweenMax.to($('#bigDate2'),0.5, {
                        css: {
                            "opacity": "1"
                        },
                    })
                },200);
            }
        });
    });
    getDate();
    function tabbyDetect() {
        if (isMinWidth()) {
            tabby.toggleTab( '#tab2' );
            $('.n-declarations__list li:nth-child(1)').removeClass('active');
            $('.n-declarations__list li:nth-child(2)').addClass('active');
        }
    };
    tabbyDetect();
    $(window).on('resize',tabbyDetect);

    function changePos() {
        var $elem = $('.n-fixed');
        var $container = $('#bigDate tbody');
        if ($(window).scrollTop() >= $container.offset().top && $('#tab1').hasClass('active')) {
            $elem.addClass('n-fixed--show');
        } else {
            $elem.removeClass('n-fixed--show');
        }
    }

    $(window).on('scroll',changePos);

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