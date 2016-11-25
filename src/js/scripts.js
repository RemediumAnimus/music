$(document).ready(function(){

    var $grid, $grid2;
    var eventsPath = $('body').find('*[data-json-url]');
    var firstLoad = false;
    var method = $('body').find('*[data-method]').data('method') || "POST";
    var events;
    var decksLength;
    var counter = 1;
    var translate = translateArray; // global
    var months = translate.monthNames;
    var magnificPopup;

    function bileter() {
        if ($('.bileter_init').length) {
            $('.bileter_init').click();
        }
    }

    bileter();


    function isMediumWidth() {
        return $('#medium-indicator').is(':visible');
    }

    function isMinWidth() {
        return $('#min-indicator').is(':visible');
    }

    function isMobileWidth() {
        return $('#mobile-indicator').is(':visible');
    }

    function isEnglish() {
        return $('body').hasClass('english');
    }

    console.log(isEnglish());

    //адаптация блоков на главной
    function normalize() {
        var space = 1;
        if ($('.n-menu').hasClass('n-menu--active') && firstLoad) {
            space = 1.15;
        }
        if (!isMediumWidth()) {
            var paddings = {
                'x1': 48 * space,
                'x2': 24 * space,
                'x3': 16 * space,
                'x3mod2': 25 * space,
                'x4': 48 * space,
                'x4mod': 24 * space,
                'x5': 32 * space
            };
        } else if (!isMinWidth()) {
            var paddings = {
                'x1': 56 * space,
                'x2': 28 * space,
                'x3': 19.2 * space,
                'x4': 56 * space,
                'x4mod': 28 * space,
                'x5': 36.8 * space
            };
        } else if(!isMobileWidth()) {
            var paddings = {
                'x1': 96 * space,
                'x2': 27.55 * space,
                'x3': 24.3 * space,
                'x3mod2': 44 * space,
                'x4': 96 * space,
                'x4mod': 35.55 * space,
                'x5': 46.8 * space
            };
        } else {
            var paddings = {
                'x1': 96 * space,
                'x2': 47.55 * space,
                'x3': 74.3 * space,
                'x4': 86.1 * space,
                'x4mod': 75.55 * space,
                'x5': 76.8 * space
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
            $('.x3--mod2').css({
                'height': parseInt(paddings.x3mod2 * containerW / 100)
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
        firstLoad = true;
    };

    function calendarSizer(calendar) {
        var $items = $(calendar).find('.event-holder');
        var $td = $(calendar).find('td');
        $items.css({
            'min-height': $items.eq(0).closest('td').width() - 80 + 'px'
        });
        $td.css({
            'padding-top': 0
        });
    }

    normalize();

    $(window).on('resize',normalize);


    $('.n-header__burger').click(function(e){
        $('.n-sidebar').toggleClass('menu-active');
        $('.n-header__burger').toggleClass('n-header__burger--active');
        $('body').toggleClass('hidden');
    });

    function sidebarMove($elem) {
        if (!$elem.find('.n-sidebar__sublist').length) {
            return;
        }

        var height = $elem.find('.n-sidebar__sublist').outerHeight();
        var prevHeight = $('.n-sidebar__list').height();

        $elem.find('.n-sidebar__sublist').show();
        $elem.find('.n-sidebar__sublist').data('height', prevHeight + 'px');

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
    }

    sidebarMove($('.n-sidebar__item.active'));

    //анимация пунктов в меню
    $('.n-sidebar__item').click(function(e){
        //e.preventDefault();

        sidebarMove($(this));

    });

    $('.n-detail__right__btn').click(function(){
        $('.n-detail__right__block').addClass('n-full');
        $(this).hide();
    });

    //анимация бокового меню
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

    function gridSizer($item) {
        $item.each(function(){
            $(this).css({
                'height': $(this).width() + 'px'
            });
        })
    }

    setTimeout(function(){
        gridSizer($('.n-media'));
        gridSizer($('.n-gal-item'));
    });

    $(window).on('resize',function(){gridSizer($('.n-media'))});
    $(window).on('resize',function(){gridSizer($('.n-gal-item'))});

    //анимация бокового меню и контентой части
    function animateForward(){
        var left = parseInt($('.n-sidebar').width()) - 62;
        var sidebarWidth = $('.n-sidebar').css('width');
        TweenMax.set($('.n-content'), {
            "transform": "translate3d(" + 0 + "px," + 0 + "px," + 0 + "px)",
            "-webkit-transform": "translate3d(" + 0 + "px," + 0 + "px," + 0 + "px)",
            "-moz-transform": "translate3d(" + 0 + "px," + 0 + "px," + 0 + "px)",
        });

        TweenMax.to($('.n-footer'),0.5, {
            css: {
                "margin-left": "15%"
            },
        });

        TweenMax.to($('.n-content'),0.5, {
            css: {
                "transform": "translate3d(" + left + "px," + 0 + "px," + 0 + "px)",
                "-webkit-transform": "translate3d(" + left + "px," + 0 + "px," + 0 + "px)",
                "-moz-transform": "translate3d(" + left + "px," + 0 + "px," + 0 + "px)",
            },
            onComplete: function () {
                TweenMax.set($('.n-content'), {
                    css: {
                        "transform": "translate3d(" + 0 + "px," + 0 + "px," + 0 + "px)",
                        "-webkit-transform": "translate3d(" + 0 + "px," + 0 + "px," + 0 + "px)",
                        "-moz-transform": "translate3d(" + 0 + "px," + 0 + "px," + 0 + "px)",
                        "margin-left": sidebarWidth,
                        "margin-right": left * -1 + "px"
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
                                if (dateSlider) {
                                    dateSlider.update(true);
                                }

                                gridSizer($('.n-media'));
                            }
                        })
                    }
                });

                if (mainSlider) {
                    mainSlider.update(true);
                }
                if (dateSlider) {
                    dateSlider.update(true);
                }
            }
        });

        TweenMax.to($('.n-sidebar'),0.5, {
            css: {
                "left":"0px"
            },
        });

        TweenMax.to($('.n-sidebar__icons'),0.5, {
            css: {
                "left":"0px"
            },
        });

        TweenMax.set($('.n-fixed__container'),{
            "padding-left": "40px"

        });

        TweenMax.to($('.n-fixed'),0, {
            css: {
                "left":"15%"
            },
        });

        TweenMax.to($('.n-footer'),0.5, {
            css: {
                "margin-left": "15%"
            },
        });

        $('.n-menu').toggleClass('n-menu--active');

    }

    //анимация бокового меню и контентой части
    function animateBackward(){

        $('.n-sidebar').toggleClass('n-sidebar--active');

        TweenMax.to($('.n-content'),1, {
            css: {
                "margin-right":"-15%"
            },
            onUpdate: function(){
                if (mainSlider) {
                    mainSlider.update(true);
                }

                if (dateSlider) {
                    dateSlider.update(true);
                }

                gridSizer($('.n-media'));
            },
            onComplete: function(){
                var left = $('.n-content').offset().left - 62;
                TweenMax.set($('.n-content'), {
                    "transform": "translate3d(" + left + "px," + 0 + "px," + 0 + "px)",
                    "-webkit-transform": "translate3d(" + left + "px," + 0 + "px," + 0 + "px)",
                    "-moz-transform": "translate3d(" + left + "px," + 0 + "px," + 0 + "px)",
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

                        if (dateSlider) {
                            dateSlider.update(true);
                        }

                        TweenMax.set($('.n-fixed__container'),{
                            "padding-left": "0px"
                        });

                        normalize();
                        packeryInit();
                    }
                });
                TweenMax.to($('.n-sidebar'),0.5, {
                    css: {
                        "left":"-15%"
                    },
                });

                TweenMax.to($('.n-sidebar__icons'),0.5, {
                    css: {
                        "left":"-15%"
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

                if (dateSlider) {
                    dateSlider.update(true);
                }
            }
        });

    }

    $('.n-menu__burger').click(function(){
        animateForward();
        $('.x3--circle').addClass('fixtop');
    });

    $('.n-sidebar__close').click(function(){
        animateBackward();
        $('.x3--circle').removeClass('fixtop');
    });

    //инициализация плагина построения блоков
    function packeryInit(){
        $grid = $('.grid').packery({
            itemSelector: '.grid__item',
            percentPosition: true,
            stamp: '.stamp',
            gutter: '.gutter-sizer'
        });

        $grid.on( 'layoutComplete', function(){

        });

        $grid2 = $('.grid2').packery({
            itemSelector: '.grid__item',
            percentPosition: true,
            gutter: '.gutter-sizer'
        });

        //$('.n-content').addClass('n-contentActive');
        //$('.n-sidebar').addClass('n-sideActive');
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
            speed: 900,
            preventClicks: true,
            preventClicksPropagation: true,
            onSlideChangeEnd: function(swiper) {
                bileter();
            }
        });
    };

    if ($('#dateSlider').length) {
        var dateSlider = new Swiper('#dateSlider', {
            loop: false,
            speed: 900,
            effect: 'fade',
            preventClicks: true,
            preventClicksPropagation: true
        });
    };

    if ($('#dateSliderMob').length) {
        var dateSliderMob = new Swiper('#dateSliderMob', {
            loop: false,
            speed: 900,
            effect: 'fade',
            preventClicks: true,
            preventClicksPropagation: true
        });
    };

    if ($('#gallerySlider').length) {
        var gallerySlider = new Swiper('#gallerySlider', {
            speed: 900,
            nextButton: '.n-slider__arrowR',
            prevButton: '.n-slider__arrowL',
            slidesPerView: 4,
            preventClicks: true,
            preventClicksPropagation: true,
            breakpoints: {
                799: {
                    slidesPerView: 'auto',
                },
                800: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 2,
                },
                1600: {
                    slidesPerView: 3,
                }
            }
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

    function sidebarScroll() {
        $('.n-sidebar__wrap').scrollbar({
            autoScrollSize: true,
            scrollx: "hidden"
        });
    }

    sidebarScroll();

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


    //селекты
    $( "#holl" ).selectmenu({
        appendTo: "#holl-Select",
        open: function(){
            innerScroll($(this));
        },
        close: function(){
            $(this).parent().find('.ui-menu').removeClass('select-active');
        },
        change: function(event, ui){
            var categories = getTabCategories();
            var attr1 = $(this).data('sort');
            var attr2 = $('#actions').data('sort');
            var value1 = ui.item.value;
            var value2 = getSortVal($('#actions'));
            sort(categories, attr1, attr2, value1, value2, $('#bigDate'));
            bileter();
        }
    });

    $( "#actions" ).selectmenu({
        appendTo: "#actions-Select",
        open: function(){
            innerScroll($(this));
        },
        close: function(){
            $(this).parent().find('.ui-menu').removeClass('select-active');
        },
        change: function(event, ui){
            var categories = getTabCategories();
            var attr1 = $('#holl').data('sort');
            var attr2 = $(this).data('sort');
            var value1 = getSortVal($('#holl'));
            var value2 = ui.item.value;
            sort(categories, attr1, attr2, value1, value2, $('#bigDate'));
            bileter();
        }
    });

    $( "#holl2" ).selectmenu({
        appendTo: "#holl-Select2",
        open: function(){
            innerScroll($(this));
        },
        close: function(){
            $(this).parent().find('.ui-menu').removeClass('select-active');
        },
        change: function(event, ui){
            var categories = getTabCategories();
            var attr1 = $(this).data('sort');
            var attr2 = $('#actions2').data('sort');
            var value1 = ui.item.value;
            var value2 = getSortVal($('#actions2'));
            sort(categories, attr1, attr2, value1, value2, $('#bigDate2'));
            bileter();
        }
    });

    $( "#actions2" ).selectmenu({
        appendTo: "#actions-Select2",
        open: function(){
            innerScroll($(this));
        },
        close: function(){
            $(this).parent().find('.ui-menu').removeClass('select-active');
        },
        change: function(event, ui){
            var categories = getTabCategories();
            var attr1 = $('#holl2').data('sort');
            var attr2 = $(this).data('sort');
            var value1 = getSortVal($('#holl2'));
            var value2 = ui.item.value;
            sort(categories, attr1, attr2, value1, value2, $('#bigDate2'));
            bileter();
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

    $( "#yearSelect" ).selectmenu({
        appendTo: "#year-Select",
        open: function(){
            innerScroll($(this));
        },
        close: function(){
            $(this).parent().find('.ui-menu').removeClass('select-active');
        },
        change: function(event, ui){
            $('.newsForm').submit();
        }
    });

    $( "#catSelect" ).selectmenu({
        appendTo: "#cat-Select",
        open: function(){
            innerScroll($(this));
        },
        close: function(){
            $(this).parent().find('.ui-menu').removeClass('select-active');
        },
        change: function(event, ui){
            $('.newsForm').submit();
        }
    });

    function sliderEvents() {
        $('.n-events li').each(function(index){
            $(this).hover(function(){
                console.log(index);
                dateSlider.slideTo(index - 1);
                dateSliderMob.slideTo(index - 1);
            });
        });
    };

    sliderEvents();

    function checkEvents() {

        $('#datepicker td').each(function(index) {
            var $that = $(this);
            if (!$(this).find('.n-event').length && $(this).find('.ui-state-active').length) {
                $(this).css({
                    'opacity': 0.5
                });
                $('#sliderWrap').css({
                    'background':$('.empty-event').data('pic')
                });
                $('.n-date').find('.empty-event').show();
                return false;
            } else {
                $('.n-date').find('.empty-event').hide();
            }
        });

        $('#datepicker td').each(function(index) {
            if ($(this).find('.ui-state-active').length) {
                $('#sliderWrap').find('.n-item__date i').html($(this).find('.ui-state-active').html());
                $('#sliderWrap').find('.n-item__date span').html(months[$(this).data('month')]);
            }
            if (!$(this).find('.n-event').length) {
                $(this).css({
                    'opacity': 0.5
                });
            }
        });

        $('#datepicker-mob td').each(function(index) {
            var $that = $(this);
            if (!$(this).find('.n-event').length && $(this).find('.ui-state-active').length) {
                $(this).css({
                    'opacity': 0.5
                });
                $('#sliderWrapMob').css({
                    'background':$('.empty-event').data('pic')
                });
                $('.n-date-mob').find('.empty-event').show();
                return false;
            } else {
                $('.n-date-mob').find('.empty-event').hide();
            }
        });

        $('#datepicker-mob td').each(function(index) {
            if ($(this).find('.ui-state-active').length) {
                $('#sliderWrapMob').find('.n-item__date i').html($(this).find('.ui-state-active').html());
                $('#sliderWrapMob').find('.n-item__date span').html(months[$(this).data('month')]);
            }
            if (!$(this).find('.n-event').length) {
                $(this).css({
                    'opacity': 0.5
                });
            }
        });
    }

    //загрузка событий календаря
    var request = (function() {
        var loaded = false;
        return function() {
            $.ajax({
                xhr: function()
                {
                    $('.n-preloader__val').css({
                        'width': '0%',
                        'opacity': 1
                    });
                    var xhr = new window.XMLHttpRequest();
                    //Upload progress
                    xhr.upload.addEventListener("progress", function(evt){
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;
                            //Do something with upload progress
                        }
                    }, false);
                    //Download progress
                    xhr.addEventListener("progress", function(evt){
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;
                            //Do something with download progress
                            $('.n-preloader__val').stop().animate({
                                'width': percentComplete * 30 + "%"
                            },'slow');
                        }
                    }, false);
                    return xhr;
                },
                type: method,//POST
                url: eventsPath.data('json-url'),
                error: function(xml,status,error){
                    console.log(status);
                },
                success: function(eventsBigDate) {
                    if (loaded) { return }
                    setTimeout(function(){

                        loadEventsBigDate('#bigDate',eventsBigDate);
                        loadEventsDate('#bigDate2',eventsBigDate);
                        loadEventsBigDate('#datepicker', eventsBigDate);
                        loadEventsBigDate('#datepicker-mob', eventsBigDate);
                        $('.n-event').addClass('hide');
                        imageLoader();

                        $('#bigDate2 td').each(function(index){
                            if (!$(this).find('.n-event').length) {
                                $(this).hide();
                            }
                            $(this).find('.event-container').html(
                                $(this).find('.ui-state-default').html() + '<span>' + $('#bigDate2 .ui-datepicker-month').html() + '</span>'
                            );
                        });
                        checkEvents();
                        calendarSizer('#bigDate');
                        $(window).on('resize',function(){
                            calendarSizer('#bigDate');
                        });
                        eventInit();
                        loaded = true;
                        events = eventsBigDate;
                        loadSliderEvents($('#sliderWrap'));
                        loadSliderEventsMob($('#sliderWrapMob'));
                        resizePicker();
                        bileter();
                    });
                }
            });
        }
    })();

    function getTabCategories() {
        var values = $('.n-declarations__list').find('.active').data('filter-by-category');
        values.length > 1 ? values = values.split(',') : values = [values];
        return values;
    }

    function getSortVal($elem) {
        return $elem.val();
    }

    function addStyles($elem) {
        $elem.find('.n-event__cover').hide();
        $elem.find('.ui-state-default').addClass('n-color');
        $elem.find('.n-event__subBg').hide();
        if ($elem.closest('#bigDate2').length) {
            $elem.hide();
            $elem.find('.n-event__cover').hide();
        }
    }

    function removeStyles($elem) {
        $elem.find('.n-event__cover').show();
        $elem.find('.ui-state-default').removeClass('n-color');
        $elem.find('.n-event__subBg').show();
        if ($elem.closest('#bigDate2').length) {
            $elem.show();
            $elem.find('.n-event__cover').hide();
        }
    }

    function resizePicker() {
        console.log($('#n-events-mob').outerHeight())
        $('.n-date-mob .n-item__container').css({
            'height': $('#n-events-mob').outerHeight() + 500 || $('.n-date-mob .empty-event').outerHeight() + 500
        });
    };

    function checkElem($elem) {
        $elem.find('td').each(function() {
            var $that = $(this);

            $(this).find('.n-event').each(function(index){
                if ($that.find('.n-event').eq(index).css('display') == 'none') {
                    if ($that.find('.n-event').eq(index+1).length && $that.find('.n-event').eq(index+1).css('display') != 'none') {

                        $that.find('.n-event').eq(index).removeClass('n-spaceFirst');
                        $that.find('.n-event').eq(index + 1).addClass('n-spaceFirst');
                        return false;
                    }
                } else {
                    $that.find('.n-event').eq(index).removeClass('n-spaceFirst');
                }
            });
        });

        $elem.find('td').each(function() {
            var $that = $(this);
            var hasElems = false;
            $(this).find('.n-event').each(function(index){
                if ($that.find('.n-event').eq(index).css('display') == 'none') {
                    hasElems = false;
                    if ($that.find('.n-event').eq(index+1).length && $that.find('.n-event').eq(index+1).css('display') != 'none') {
                        hasElems = true;
                        return false;
                    }
                } else {
                    hasElems = true;
                    return false;
                }
            });

            if (hasElems) {
                removeStyles($(this));
            } else {
                addStyles($(this));
            }
        });
    }

    $('.n-declarations__list li').click(function(){
        $('.n-declarations__list li').removeClass('active');
        $(this).addClass('active');

        (function(){
            var attr1 = $('#holl').data('sort');
            var attr2 = $('#actions').data('sort');
            var value1 = getSortVal($('#holl'));
            var value2 = getSortVal($('#actions'));
            var categories = getTabCategories();
            sort(categories, attr1, attr2, value1, value2, $('#bigDate'));
            bileter();
        })();


        (function(){
            var attr1 = $('#holl2').data('sort');
            var attr2 = $('#actions2').data('sort');
            var value1 = getSortVal($('#holl2'));
            var value2 = getSortVal($('#actions2'));
            var categories = getTabCategories();
            sort(categories, attr1, attr2, value1, value2, $('#bigDate2'));
            bileter();
        })();
    });

    function sort(categoriesList, attr, attr2, value, value2, $elem) {

        $elem.find('td').each(function() {
            var $that = $(this);
            $(this).find('.n-event').each(function () {
                var categories = $(this).data('categories');
                var hasValue = false;
                var all = false;

                for (var i=0; i<categoriesList.length; i++) {
                    if (categoriesList[i] == 1) {
                        all = true;
                    }
                }

                categories.length > 1 ? categories = $(this).data('categories').split(',') : categories = [$(this).data('categories')];

                if (value == 0 && value2 == 0 && all) {
                    $elem.find('td').each(function() {
                        var $that = $(this);

                        $(this).find('.n-event').each(function () {
                            $(this).removeClass('n-spaceFirst');
                            if ($(this).data(attr) != 'undefined') {
                                $(this).show();
                            }
                        });
                    });
                } else {
                    for (var i=0; i<categoriesList.length; i++) {
                        for (var j=0; j<categories.length; j++) {

                            if (parseInt(categoriesList[i]) == parseInt(categories[j])) {
                                if ($(this).data(attr) != value && value != 0) {
                                    $(this).hide();
                                } else {
                                    if ($(this).data(attr2) != value2) {
                                        $(this).hide();
                                    } else {
                                        $(this).show();
                                        hasValue = true;
                                    }
                                    if (value2 == 0) {
                                        $(this).show();
                                        hasValue = true;
                                    }
                                }
                            } else {
                                $(this).hide();
                            }
                            if (hasValue) {
                                $(this).show();
                                break;
                            }
                        }
                    }
                }
            });
        });

        checkElem($elem);
    }

    if (eventsPath.length) {
        request();
    }

    tabby.init({
        callback: (function() {
            return function(){
                calendarSizer('#bigDate');
            }
        })()
    });

    $('#datepicker').datepicker({
        monthNames: translate.monthNames,
        dayNames: translate.dayNames,
        dayNamesMin: translate.dayNamesMin,
        showOtherMonths: true,
        selectOtherMonths: true,
        autoClose: true,
        firstDay: 1,
        onSelect: function(e, inst){
            inst.inline = false;
            setTimeout(function() {
                loadSliderEvents($('#sliderWrap'));
                checkEvents();
            });
        },
        onChangeMonthYear: function(){
            setTimeout(function() {
                loadEventsBigDate('#datepicker', events);
                eventInit();
                loadSliderEvents($('#sliderWrap'));
                checkEvents();
            });
        }
    });

    $('#datepicker-mob').datepicker({
        monthNames: translate.monthNames,
        dayNames: translate.dayNames,
        dayNamesMin: translate.dayNamesMin,
        showOtherMonths: true,
        selectOtherMonths: true,
        autoClose: true,
        firstDay: 1,
        onSelect: function(e, inst){
            inst.inline = false;
            setTimeout(function() {
                loadSliderEventsMob($('#sliderWrapMob'));
                checkEvents();
                resizePicker();
            });
        },
        onChangeMonthYear: function(){
            setTimeout(function() {
                loadEventsBigDate('#datepicker-mob', events);
                eventInit();
                loadSliderEventsMob($('#sliderWrapMob'));
                checkEvents();
                resizePicker();
            });
        }
    });

    $('#bigDate').datepicker({
        monthNames: translate.monthNames,
        dayNames: translate.dayNames,
        dayNamesMin: translate.dayNamesMin,
        showOtherMonths: true,
        autoClose: true,
        firstDay: 1,
        changeMonth: true,
        changeYear: true,
        onSelect: function(date, inst){
            inst.show();
        },
        onChangeMonthYear: function() {
            setTimeout(function(){
                loadEventsBigDate('#bigDate', events);
                calendarSizer('#bigDate');
                var attr1 = $('#holl').data('sort');
                var attr2 = $('#actions').data('sort');
                var value1 = getSortVal($('#holl'));
                var value2 = getSortVal($('#actions'));
                var categories = getTabCategories();
                sort(categories, attr1, attr2, value1, value2, $('#bigDate'));
            })
        }
    });

    $('#bigDate2').datepicker({
        monthNames: translate.monthNames,
        dayNames: translate.dayNames,
        dayNamesMin: translate.dayNamesMin,
        showOtherMonths: true,
        autoClose: true,
        onSelect: function(e,inst){
            inst.show();
        },
        onChangeMonthYear: function(inst){
            setTimeout(function(){
                loadEventsDate('#bigDate2',events);
                $('#bigDate2 td').each(function(index){
                    if (!$(this).find('.n-event').length) {
                        $(this).hide();
                    }
                    $(this).find('.event-container').html(
                        $(this).find('.ui-state-default').html() + '<span>' + $('#bigDate2 .ui-datepicker-month').html() + '</span>'
                    );
                });
                eventInit();
                var attr1 = $('#holl2').data('sort');
                var attr2 = $('#actions2').data('sort');
                var value1 = getSortVal($('#holl2'));
                var value2 = getSortVal($('#actions2'));
                var categories = getTabCategories();
                sort(categories, attr1, attr2, value1, value2, $('#bigDate2'));
            });
        }
    });


    //колбэк для нормальной обработки событий в datepicker. После смены даты календарь занового перестраивается, все события слетают
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

        $('#bigDate td').hover(function(){
            if ($(this).find('.n-event__cover').length) {
                $(this).find('.ui-state-default').addClass('calHover')
            }
        },function(){
            if ($(this).find('.n-event__cover').length) {
                $(this).find('.ui-state-default').removeClass('calHover')
            }
        });

        $('#bigDate .n-event').hover(function(e){
            var id = $(this).data('id');
            $(this).prev().addClass('event-visible');

            $('#bigDate td').each(function(index){
                var $that = $(this);
                $(this).find('.n-event').each(function(){
                    $(this).addClass('event-hide');
                    if ($(this).data('id') == id) {
                        $(this).removeClass('event-hide');
                        $that.addClass('event-active');
                        $(this).prev().addClass('event-visible');
                    }
                })
            });
        },function(){
            $(this).prev().removeClass('event-visible');
            var id = $(this).data('id');

            $('#bigDate td').each(function(index){
                $(this).find('.n-event').each(function(){
                    $(this).removeClass('event-hide');
                });
                $('#bigDate td').removeClass('event-active');
                $(this).find('.n-event').prev().removeClass('event-visible');
            });
        });

        $('#datepicker td').click(function(e){
            if (!$(this).find('.n-event').length) {
                e.preventDefault();
                return;
            }
            $('#datepicker td').each(function(e){
                $(this).find('a').eq(0).removeClass('ui-state-active');
            });
            $(this).find('a').eq(0).addClass('ui-state-active');
        });

         $('#datepicker-mob td').click(function(e){
             if (!$(this).find('.n-event').length) {
                 e.preventDefault();
                 return;
             }
             $('#datepicker-mob td').each(function(e){
                 $(this).find('a').eq(0).removeClass('ui-state-active');
             });
             $(this).find('a').eq(0).addClass('ui-state-active');
         });

        $('.n-declarations__date *').click(function(){
            if ($(this).is('[href]')) {
                location.href = $(this).attr('href');
            }
        });
    };

    eventInit();

    function loadSliderEvents($container) {
        if (!dateSlider) {return}
        var $events = $container.find('.ui-state-active').parent().find('.n-event');
        var source   = $("#template-events").html();
        var lastSlide;
        dateSlider.removeAllSlides();
        $events.each(function(index){
            var event = $(this).find('.n-event');
            var bg = $(this).find('.n-event__subBg').css('background-image');
            var slide = $("<div class='n-item__inside__pic swiper-slide notransition'></div>");
            slide.css({
                'background-image': bg
            });
            dateSlider.appendSlide(slide);
            lastSlide = index;
        });

        $('.swiper-slide').removeClass('notransition');

        $('#n-events').find('li').each(function(){
            $(this).remove();
        });

        for (var i=0; i<events.length; i++) {
            var date = events[i].date.split('.');
            if (parseInt($container.find('.ui-state-active').html()) == date[0] && $container.find('.ui-state-active').parent().data('month') == date[1] - 1 && $container.find('.ui-state-active').parent().data('year') == date[2]) {
                var template = Handlebars.compile(source);
                var html = template(events[i]);
                $('#n-events').append(html);
            }

        };
        sliderEvents();
    };

    function loadSliderEventsMob($container) {
        if (!dateSliderMob) {return}
        var $events = $container.find('.ui-state-active').parent().find('.n-event');
        var source   = $("#template-events-mob").html();
        var lastSlide;
        dateSliderMob.removeAllSlides();
        $events.each(function(index){
            var event = $(this).find('.n-event');
            var bg = $(this).find('.n-event__subBg').css('background-image');
            var slide = $("<div class='n-item__inside__pic swiper-slide notransition'></div>");
            slide.css({
                'background-image': bg
            });
            dateSliderMob.appendSlide(slide);
            lastSlide = index;
        });

        $('.swiper-slide').removeClass('notransition');

        $('#n-events-mob').find('li').each(function(){
            $(this).remove();
        });

        for (var i=0; i<events.length; i++) {
            var date = events[i].date.split('.');
            if (parseInt($container.find('.ui-state-active').html()) == date[0] && $container.find('.ui-state-active').parent().data('month') == date[1] - 1 && $container.find('.ui-state-active').parent().data('year') == date[2]) {
                var template = Handlebars.compile(source);
                var html = template(events[i]);
                $('#n-events-mob').append(html);
            }

        };
        sliderEvents();
    };

    (function (global) {

        'use strict';

        function defer() {
            var resolve, reject, promise = new Promise(function (a, b) {
                resolve = a;
                reject = b;
            });

            return {
                resolve: resolve,
                reject: reject,
                promise: promise
            };
        }

        /**
         * Image preloader
         * @param {Object} options
         */
        var ImagePreloader = function (options) {
            this.options = options || {};
            this.options.parallel = this.options.parallel || false;
            this.items = [];
            this.max = 0;
        };

        ImagePreloader.prototype.queue = function (array) {
            if (!Array.isArray(array)) {
                array = [array];
            }

            if (array.length > this.max) {
                this.max = array.length;
            }

            var deferred = defer();

            this.items.push({
                collection: array,
                deferred: deferred
            });

            return deferred.promise;
        };

        ImagePreloader.prototype.preloadImage = function (path) {
            return new Promise(function (resolve, reject) {
                var image = new Image();
                image.onload = resolve;
                image.onerror = resolve;
                image.src = path;
            });
        };

        ImagePreloader.prototype.preload = function () {
            var deck, decks = [];

            if (this.options.parallel) {

                for (var i = 0; i < this.max; i++) {
                    this.items.forEach(function (item) {
                        if (typeof item.collection[i] !== 'undefined') {
                            item.collection[i] = this.preloadImage(item.collection[i]);
                        }
                    }, this);
                }

            } else {

                this.items.forEach(function (item) {
                    item.collection = item.collection.map(this.preloadImage);
                }, this);

            }

            this.items.forEach(function (item) {
                deck = Promise.all(item.collection)
                    .then(item.deferred.resolve.bind(item.deferred))
                    .catch(console.log.bind(console));

                decks.push(deck);
            });

            return Promise.all(decks);
        };

        global.ImagePreloader = ImagePreloader;

    }(window));

    function Deck(node, preloader, index) {
        var data = node.style.backgroundImage.slice(4, -1).replace(/"/g, "");;

        preloader.queue(data)
            .then(function () {
                //console.log('Deck ' + index + ' loaded.');
                node.classList.add('loaded');
                var percentComplete = (counter * 70 / decksLength) + 30;
                //console.log(percentComplete + "%");
                $('.n-preloader__val').stop().animate({
                    'width': percentComplete + "%"
                });
                if (counter == decksLength) {
                    $('.n-preloader__val').animate({
                        'opacity': 0
                    });
                    $('.n-event').removeClass('hide');
                }
                counter++;
            })
            .catch(console.error.bind(console));
    }

    function imageLoader() {
        var ip = new ImagePreloader({
            parallel: false
        });
        var decks = Array.prototype.slice.call(document.querySelectorAll('.n-event__subBg'));
        decksLength = decks.length;
        console.log(decksLength);

        decks.forEach(function (deck, index) {
            new Deck(deck, ip, index);
        });

        ip.preload()
            .then(function () {
                console.log('All decks loaded.');
            });
    };

    //обработка загрузки данных в календарь
    function loadEventsBigDate(elem,events) {
        if (!elem.length) {return}

        var source   = $("#template-BigDate").html() || $("#template-BigDate-mob").html();
        var day = new Date().getDate();
        var month = new Date().getMonth();

        var events = events.sort(function(obj1, obj2) {
            // Сортировка по возрастанию
            return parseInt(obj1.time.split(':').join('')) - parseInt(obj2.time.split(':').join(''));
        });

        $('' + elem + ' .ui-datepicker-calendar tbody').find('td').each(function(j){

            $(this).append('<div class="event-holder"><div class="event-container"></div></div>');

            for (var i=0; i<=events.length - 1; i++) {
                var date = events[i].date.split('.');

                if (parseInt($(this).find('a').html()) == date[0] && $(this).data('month') == date[1] - 1 && $(this).data('year') == date[2]) {

                    var template = Handlebars.compile(source);
                    var html    = template(events[i]);

                    if (!$(this).find('.n-event__cover').length) {
                        $(this).find('.event-holder').append('<div class="n-event__cover"></div><div class="n-event__cont"></div>');
                    }

                    //console.log(parseInt(events[i].time.split(':').join('')));

                    $(this).find('.event-holder .n-event__cont').append(html);

                    if (day > parseInt($(this).find('.ui-state-default').html()) && month >= $(this).data('month')) {
                        $(this).find('.event-btn').hide();
                    }

                }
            };
            if (!$(this).hasClass('ui-datepicker-other-month')) {
                $('#n-next-month').html(months[$(this).data('month')+1] || months[0]);
            }
        });
    };

    function loadEventsDate(elem,events) {
        if (!elem.length) {return}

        var source   = $("#template-BigDate2").html();
        var day = new Date().getDate();
        var month = new Date().getMonth();

        $('' + elem + ' .ui-datepicker-calendar tbody').find('td').each(function(index){
            $(this).append('<div class="event-holder"><div class="event-container"></div></div>');

            for (var i=0; i<=events.length - 1; i++) {
                var date = events[i].date.split('.');

                if (parseInt($(this).find('a').html()) == date[0] && $(this).data('month') == date[1] - 1 && $(this).data('year') == date[2]) {

                    var template = Handlebars.compile(source);
                    var html    = template(events[i]);

                    if (!$(this).find('.n-event__cover').length) {
                        $(this).find('.event-holder').append('<div class="n-event__cover"></div><div class="n-event__cont"></div>');
                    }

                    $(this).find('.event-holder .n-event__cont').append(html);

                    if (day > parseInt($(this).find('.ui-state-default').html()) && month >= $(this).data('month')) {
                        $(this).find('.event-btn').hide();
                    }
                }
            };
        });
    };


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

    $('#n-next-month').click(function(){
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
        }
    };

    tabbyDetect();
    $(window).on('resize',tabbyDetect);

    function changePos() {
        if(!$('.n-fixed').length) {return}
        var $elem = $('.n-fixed');
        var $container = $('#bigDate tbody');
        if ($(window).scrollTop() >= $container.offset().top && $('#tab1').hasClass('active')) {
            $elem.addClass('n-fixed--show');
        } else {
            $elem.removeClass('n-fixed--show');
        }
    }

    function placeholder() {

        $('input[type="text"],input[type="search"], textarea').focus(function(){
            if ($(this).prop('readonly')==false) {
                var plac = $(this).prop('placeholder');
                $(this).prop('placeholder',' ');

                $('input[type="text"],input[type="search"], textarea').blur(function(){
                    $(this).prop('placeholder',plac);
                });
            }
        });
    };

    placeholder();

    $(window).on('scroll',changePos);
    $(window).on('resize', function(){
        if(isMobileWidth()) {
            $('.n-content').removeClass('n-contentActive');
            $('.n-sidebar').removeClass('n-sideActive');
        } else {
            if (readCookie('menu-hide')) {
                $('.n-content').removeClass('n-contentActive');
                $('.n-sidebar').removeClass('n-sideActive');
                $('.n-menu').removeClass('n-menu--active');
                $('.n-footer').addClass('n-footer--left');
            }
            $('.n-date-mob').hide();
        }
        console.log(readCookie('menu-visible'));
    });

    $('.n-poster__dates').click(function(){
        if (!isMobileWidth()) { return }
        $(this).toggleClass('active');
    });

    $('.n-table__header').click(function(){
        if (!isMobileWidth()) { return }
        $(this).closest('.n-tables').toggleClass('n-table--active');
    });

    //попап
    $.extend(true, $.magnificPopup.defaults, {
        tClose: translate.tClose, // Alt text on close button
        tLoading: translate.tLoading, // Text that is displayed during loading. Can contain %curr% and %total% keys
        gallery: {
            tPrev: translate.tPrev, // Alt text on left arrow
            tNext: translate.tNext, // Alt text on right arrow
            tCounter: translate.tCounter // Markup for "1 of 7" counter
        },
        image: {
            tError: translate.tError // Error message when image could not be loaded
        },
        ajax: {
            tError: translate.ajax.tError // Error message when ajax request failed
        }
    });

    $('.pop-img').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        removalDelay: 500,
        callbacks: {
            beforeOpen: function() {
                setTimeout(function() {
                    /* Swipe para a esquerda - Próximo */
                    $(".mfp-container").swipe( {
                        swipeLeft:function(event, direction, distance, duration, fingerCount) {
                            console.log("swipe right");
                            magnificPopup.next();
                        },

                        /* Swipe para a direita - Anterior */
                        swipeRight:function(event, direction, distance, duration, fingerCount) {
                            console.log("swipe left");
                            magnificPopup.prev();
                        },
                    });
                }, 500);
            },
            change: function() {
                if (this.isOpen) {
                    //this.wrap.addClass('mfp-open');
                }
            },
            beforeClose: function() {
                //this.wrap.removeClass('mfp-open');
            }
        },
    });

    magnificPopup = $.magnificPopup.instance;

    (function(){
        var startFrom = parseInt($('.js-load').data('start-from'));
        var inProgress = false;
        var path = $('body').find('*[data-ajax-url]');
        var count = parseInt($('.js-load').data('count'));
        var page = parseInt($('.js-load').data('page'));
        var perpage = parseInt($('.js-load').data('perpage'));
        $('.js-load').click(function(){
            $.ajax({
                url: path.data('ajax-url'),
                method: method,
                data: {
                    "startFrom" : startFrom,
                    "page": page,
                    "perPage": perpage
                },
                beforeSend: function() {
                    inProgress = true;
                }
            }).done(function(data){

                if (data.length > 0) {
                    $('#n-load').append(data);
                    gridSizer($('.n-media'));
                    inProgress = false;
                    $('.js-load').attr('data-page',++page);
                }

                if ( startFrom + ( (page-1) * perpage ) >= count ) {
                    $('.js-load').hide();
                }
            });
        });
    })();

    function heightContent() {
        if ($('.n-main').height() > $('.n-content').height() && !isMobileWidth()) {
            $('.n-content').css({
                'min-height': parseInt($('.n-main').height()) + 'px'
            });
        }
    };
    $(window).on('resize',heightContent);
    heightContent();

    $('.n-header__date').click(function(){
        $('.n-date-mob').show();
        setTimeout(function(){
            $('.n-date-mob').addClass('n-date-mob--visible');
        });
    });

    $('.n-item__close').click(function(){
        $('.n-date-mob').removeClass('n-date-mob--visible');
        setTimeout(function(){
            $('.n-date-mob').hide();
        },200);
    });
});