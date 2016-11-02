$(document).ready(function(){

    var $grid, $grid2;
    var eventsPath = $('body').find('*[data-json-url]');
    var firstLoad = false;
    var method = $('body').find('*[data-method]').data('method') || "POST";
    var events;

    function isMediumWidth() {
        return $('#medium-indicator').is(':visible');
    }

    function isMinWidth() {
        return $('#min-indicator').is(':visible');
    }

    function isMobileWidth() {
        return $('#mobile-indicator').is(':visible');
    }

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
            'min-height': $items.eq(0).closest('td').width() + 'px'
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

    //анимация пунктов в меню
    $('.n-sidebar__item').click(function(e){
        //e.preventDefault();

        if (!$(this).find('.n-sidebar__sublist').length) {
            return;
        }
        var height = $(this).find('.n-sidebar__sublist').outerHeight();
        var prevHeight = $('.n-sidebar__list').height();

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

        TweenMax.to($('.n-sidebar'),1, {
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

        $('.n-content').addClass('n-contentActive');
        $('.n-sidebar').addClass('n-sideActive');
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
            preventClicks: false,
            preventClicksPropagation: false
        });
    };

    if ($('#dateSlider').length) {
        var dateSlider = new Swiper('#dateSlider', {
            loop: true,
            speed: 900,
            effect: 'fade',
            preventClicks: false,
            preventClicksPropagation: false
        });
    };

    if ($('#gallerySlider').length) {
        var gallerySlider = new Swiper('#gallerySlider', {
            speed: 900,
            preventClicksPropagation: false,
            preventClicks: false,
            nextButton: '.n-slider__arrowR',
            prevButton: '.n-slider__arrowL',
            slidesPerView: 4,
            preventClicks: false,
            preventClicksPropagation: false,
            breakpoints: {
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
            var parameter = getTabParameter();
            var attr1 = $(this).data('sort');
            var attr2 = $('#actions').data('sort');
            var value1 = ui.item.value;
            var value2 = getSortVal($('#actions'));
            sort(parameter, attr1, attr2, value1, value2, $('#bigDate'));
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
            var parameter = getTabParameter();
            var attr1 = $('#holl').data('sort');
            var attr2 = $(this).data('sort');
            var value1 = getSortVal($('#holl'));
            var value2 = ui.item.value;
            sort(parameter, attr1, attr2, value1, value2, $('#bigDate'));
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
            var parameter = getTabParameter();
            var attr1 = $(this).data('sort');
            var attr2 = $('#actions2').data('sort');
            var value1 = ui.item.value;
            var value2 = getSortVal($('#actions2'));
            sort(parameter, attr1, attr2, value1, value2, $('#bigDate2'));
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
            var parameter = getTabParameter();
            var attr1 = $('#holl2').data('sort');
            var attr2 = $(this).data('sort');
            var value1 = getSortVal($('#holl2'));
            var value2 = ui.item.value;
            sort(parameter, attr1, attr2, value1, value2, $('#bigDate2'));
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

    function sliderEvents() {
        $('.n-events li').each(function(index){
            $(this).hover(function(){
                dateSlider.slideTo(index);
            });
        });
    };
    sliderEvents();

    //загрузка событий календаря
    var request = (function() {
        var loaded = false;
        return function() {
            $.ajax({
                xhr: function()
                {
                    $('.n-preloader__val').css({
                        'width': 0,
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
                            $('.n-preloader__val').animate({
                                'width': percentComplete * 100 + "%"
                            });
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
                        $('.n-preloader__val').animate({
                            'opacity': 0
                        });

                        loadEventsBigDate('#bigDate',eventsBigDate);
                        loadEventsDate('#bigDate2',eventsBigDate);
                        loadEventsBigDate('#datepicker', eventsBigDate);

                        $('#bigDate2 td').each(function(index){
                            if (!$(this).find('.n-event').length) {
                                $(this).hide();
                            }
                            $(this).find('.event-container').html(
                                $(this).find('.ui-state-default').html() + '<span>' + $('#bigDate2 .ui-datepicker-month').html() + '</span>'
                            );
                        });
                        calendarSizer('#bigDate');
                        $(window).on('resize',function(){
                            calendarSizer('#bigDate');
                        });
                        eventInit();
                        loaded = true;
                        events = eventsBigDate;
                        loadSliderEvents($('#sliderWrap'));
                    });
                }
            });
        }
    })();

    function getTabParameter() {
        return $('.n-declarations__list').find('.active').data('parameter');
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

    function checkElem($elem, selector) {
        $elem.find(selector).each(function(index) {
            if ($(this).css('display') != 'none') {
                removeStyles($elem);
                return false;
            } else {
                console.log($(this));
                $elem.find(selector).eq(index).removeClass('n-spaceFirst');
                $elem.find(selector).eq(index + 1).addClass('n-spaceFirst');

                if ($elem.find(selector).length - 1 == index) {
                    addStyles($elem);
                }
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
            var parameter = getTabParameter();
            sort(parameter, attr1, attr2, value1, value2, $('#bigDate'));
        })();


        (function(){
            var attr1 = $('#holl2').data('sort');
            var attr2 = $('#actions2').data('sort');
            var value1 = getSortVal($('#holl2'));
            var value2 = getSortVal($('#actions2'));
            var parameter = getTabParameter();
            sort(parameter, attr1, attr2, value1, value2, $('#bigDate2'));
        })();
    });

    function sort(parameter, attr, attr2, value, value2, $elem) {
        if (value == 0 && value2 == 0 && parameter == 0) {
            $elem.find('td').each(function() {
                var $that = $(this);
                $(this).find('.n-event').each(function () {
                    $(this).removeClass('n-spaceFirst');
                    if ($(this).data(attr) != 'undefined') {
                        $(this).show();
                        checkElem($that,'.n-event');
                    }
                });
            });
        } else {
            $elem.find('td').each(function() {
                var $that = $(this);

                $(this).find('.n-event').each(function () {
                    var parameters = $(this).data('parameters').split(',');

                    for (var i=0; i<parameters.length; i++) {
                        if (parseInt(parameters[parameter])) {
                            if ($(this).data(attr) != value && value != 0) {
                                $(this).hide();
                            } else {
                                if ($(this).data(attr2) != value2) {
                                    $(this).hide();
                                } else {
                                    $(this).show();
                                }

                                if (value2 == 0) {
                                    $(this).show();
                                }
                            }
                            break;
                        } else {
                            $(this).hide();
                            break;
                        }
                    }
                    checkElem($that,'.n-event');
                });
            });
        }
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
        monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
        showOtherMonths: true,
        selectOtherMonths: true,
        autoClose: true,
        firstDay: 1,
        onSelect: function(e, inst){
            inst.inline = false;
            setTimeout(function() {
                loadSliderEvents($('#sliderWrap'));
            });
        },
        onChangeMonthYear: function(){
            setTimeout(function() {
                loadEventsBigDate('#datepicker', events);
                eventInit();
                loadSliderEvents($('#sliderWrap'));
            });
        }
    });

    $('#bigDate').datepicker({
        monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
        dayNames: ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"],
        dayNamesMin: [ "Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота" ],
        showOtherMonths: true,
        autoClose: true,
        firstDay: 1,
        onSelect: function(date, inst){
            inst.inline = false;
        },
        onChangeMonthYear: function() {
            setTimeout(function(){
                loadEventsBigDate('#bigDate', events);
                calendarSizer('#bigDate');
                var attr1 = $('#holl').data('sort');
                var attr2 = $('#actions').data('sort');
                var value1 = getSortVal($('#holl'));
                var value2 = getSortVal($('#actions'));
                var parameter = getTabParameter();
                sort(parameter, attr1, attr2, value1, value2, $('#bigDate'));
            })
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
                var parameter = getTabParameter();
                sort(parameter, attr1, attr2, value1, value2, $('#bigDate2'));
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
                    if ($(this).data('id') == id) {
                        $that.addClass('event-active');
                        $(this).prev().addClass('event-visible');
                    }
                })
            });
        },function(){
            $(this).prev().removeClass('event-visible');
            var id = $(this).data('id');

            $('#bigDate td').each(function(index){
                $('#bigDate td').removeClass('event-active');
                $(this).find('.n-event').prev().removeClass('event-visible');
            });
        });

        $('#datepicker td').click(function(e){
            $('#datepicker td').each(function(){
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
    }

    //обработка загрузки данных в календарь
    function loadEventsBigDate(elem,events) {
        if (!elem.length) {return}

        var source   = $("#template-BigDate").html();
        var day = new Date().getDate();

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

                    $(this).find('.event-holder .n-event__cont').append(html);

                    if (day > parseInt($(this).find('.ui-state-default').html())) {
                        $(this).find('.event-btn').hide();
                    }

                }
            };
        });
    };

    function loadEventsDate(elem,events) {
        if (!elem.length) {return}

        var source   = $("#template-BigDate2").html();

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

                    $(this).find('.event-holder .n-event__cont').append(html)
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
        }
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
    $('.pop-img').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        removalDelay: 500,
        callbacks: {
            beforeOpen: function() {
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass = this.st.el.attr('data-effect');
            },
            change: function() {
                if (this.isOpen) {
                    this.wrap.addClass('mfp-open');
                }
            },
            beforeClose: function() {
                this.wrap.removeClass('mfp-open');
            }
        },
    });

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


    //карта
    function initialize(id) {

        var Coordinates = [
            {lat: 59.9551157, lng: 30.3116487}
        ];

        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(59.9551157, 30.3116487),
            disableDefaultUI: true,
            scrollwheel: false
        };

        var map = new google.maps.Map(document.getElementById(id),mapOptions);

        switch(id) {

            case 'map' :

                var image = {
                    anchor: new google.maps.Point(10, 42),
                    path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
                    strokeColor: '#AD1380',
                    strokeWeight: 5,
                    scale: 0.3
                };

                var contentString = '<div class="infoWindow">' +
                    '<div class="infoWindow__container">' +
                    '<div class="infoWindow__left">' +
                    '<img src="img/logo2.svg" alt="">' +
                    '</div>' +
                    '<div class="infoWindow__right">' +
                    '197198, г. Санкт-Петербург Александровский парк,' +
                    'д. 4, «Театр «Мюзик-Холл» Станция метро "Горьковская" ' +
                    '</div>' +
                    '</div>' +
                    '</div>';

                var infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    pixelOffset: new google.maps.Size(-300, 127),
                    maxWidth: 470
                });

                var coords = {
                    lat: Coordinates[0].lat,
                    lng: Coordinates[0].lng,
                };

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
                });

                break;

            case 'map2' :

                var image = {
                    anchor: new google.maps.Point(10, 42),
                    path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
                    strokeColor: '#AD1380',
                    strokeWeight: 5,
                    scale: 0.3,
                };

                var contentString = '<div class="infoWindow">' +
                    '<div class="infoWindow__container">' +
                    '<div class="infoWindow__left">' +
                    '<img src="img/logo2.svg" alt="">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';

                var infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    pixelOffset: new google.maps.Size(-170, 95),
                    maxWidth: 200
                });

                var coords = {
                    lat: Coordinates[0].lat,
                    lng: Coordinates[0].lng,
                };

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
                });

                break;
        }
    }

    if ($('#map').length) {
        initialize('map');
    }
    if ($('#map2').length) {
        initialize('map2');
    }
});