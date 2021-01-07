;
(function() {
    let version = "1.1";
    let base = "https://cdn.jsdelivr.net/gh/moonlightL/CDN@" + version;
    let APP = {
        theme: "Grace",
        plugins: {
            APlayer: {
                css: base + "/Grace/source/js/APlayer/APlayer.min.css",
                js: base + "/Grace/source/js/APlayer/APlayer.min.js"
            },
            bootstrap: {
                js: base + "/Grace/source/css/bootstrap/js/bootstrap.min.js"
            },
            highlight: {
                js: base + "/Grace/source/js/highlightjs/highlight.pack.js",
            },
            lazyLoad: {
                js: base + "/Grace/source/js/jquery.lazyload.min.js"
            },
            toc: {
                js: base + "/Grace/source/js/toc.js"
            },
            wayPoints: {
                js: base + "/Grace/source/js/jquery.waypoints.min.js"
            }
        }
    };

    console.log("%c Theme." + APP.theme + " v" + version + " %c https://www.extlight.com/ ", "color: white; background: #e9546b; padding:5px 0;", "padding:4px;border:1px solid #e9546b;");

    const loadResource = function() {
        let APlayer = APP.plugins.APlayer;
        $('head').append('<link href="' + APlayer.css + '" rel="stylesheet" type="text/css" />');
        $.getScript(APlayer.js);
        $.getScript("//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js");
    };

    let CURRENT_MODE = "current_mode";
    const themModeEvent = function() {
        let mode = sessionStorage.getItem(CURRENT_MODE);
        if (!mode) {
            let hour = (new Date()).getHours();
            mode = (hour >= 6 && hour < 18 ? "light" : "dark");
        }
        $("html").attr("mode", mode);

        if (mode === "light") {
            $("#modeBtn").html('<i class="fa fa-moon-o"></i>');
        } else {
            $("#modeBtn").html('<i class="fa fa-sun-o"></i>');
        }
    };

    const optionEvent = function() {
        let body = $("body");

        let $options = $('<div class="options animated fadeInLeft" id="option"> <i class="fa fa-cog fa-2x faa-spin animated"></i> </div>');
        body.append($options);

        let elements = [
            {"title": "up", "icon": "fa fa-arrow-up"},
            {"title": "change-mode", "icon": "fa fa-adjust"},
            {"title": "music", "icon": "fa fa-music"},
        ];

        let htmArr = [];
        for (let i = 0; i < elements.length; i++) {
            let ele = elements[i];
            htmArr.push('<div class="option-item '+ ele.title +'"> <i class="' + ele.icon+'"></i> </div> ');
        }

        body.append(htmArr.join(""));
        $("#option").off("click").on("click", function() {
            $(this).siblings(".option-item").toggleClass("show");
        });

        $(".up").off("click").on("click", function() {
            $('html, body').animate({
              scrollTop: $('html').offset().top
            }, 500);
        });

        $(".music").off("click").on("click", function() {
            let $aplayer = $("#aplayer");
            if ($aplayer.hasClass("inited")) {
                $aplayer.toggleClass("show");
                return;
            }

            $aplayer.toggleClass("show");
            const ap = new APlayer({
                container: $aplayer.get(0),
                fixed: true,
                listFolded: true,
                listMaxHeight: 90,
                lrcType: 3,
                audio: [
                    {
                        name: 'China',
                        artist: '徐梦圆',
                        url: 'https://images.extlight.com/China.mp3',
                        cover: 'http://p2.music.126.net/h_jIa6jZSuI8gBW6a89Dhg==/16667496765602378.jpg?param=130y130',
                        theme: '#ebd0c2'
                    },
                    {
                        name: 'Love Heart',
                        artist: '未知',
                        url: 'https://images.extlight.com/%CA%9F%E1%B4%8F%E1%B4%A0%E1%B4%87_%CA%9C%E1%B4%87%E1%B4%80%CA%80%E1%B4%9B.mp3',
                        cover: 'http://p2.music.126.net/h_jIa6jZSuI8gBW6a89Dhg==/16667496765602378.jpg?param=130y130',
                        theme: '#ebd0c2'
                    }
                ]
            });

            $aplayer.addClass("inited");
        });

    };

    const changeModeEvent = function() {
        $("#modeBtn").off("click").on("click", function () {
            let $html = $("html");
            let mode = ($html.attr("mode") === "light" ? "dark" : "light");
            sessionStorage.setItem(CURRENT_MODE, mode);
            $html.attr("mode", mode);
            if (mode === "light") {
                $(this).html("<i class='fa fa-moon-o'></i>");
            } else {
                $(this).html("<i class='fa fa-sun-o'></i>");
            }
        });

        $(".change-mode").off("click").on("click", function () {
            let $html = $("html");
            let mode = ($html.attr("mode") === "light" ? "dark" : "light");
            sessionStorage.setItem(CURRENT_MODE, mode);
            $html.attr("mode", mode);
            if (mode === "light") {
                $("#modeBtn").html('<i class="fa fa-moon-o"></i>');
            } else {
                $("#modeBtn").html('<i class="fa fa-sun-o"></i>');
            }
        });

    };

    const navBarShow = function() {
        let $navBar = $("#navBar");
        $(window).on("scroll", function() {
            let scrollTop = $(this).scrollTop();
            checkNav(scrollTop, $navBar);
        });

        window.onload = function () {
            let scrollTop = $(this).scrollTop();
            checkNav(scrollTop, $navBar);
        }
    };

    function checkNav(scrollTop, navBar) {
        if (scrollTop > 0) {
            navBar.addClass("show");
        } else {
            navBar.removeClass("show");
        }
    };

    const menuToggleEvent = function() {
        $("#menuToggle").off("click").on("click", function() {
            let $body = $("body");
            let $mask = $("<div class='common-mask'></div>");
            $body.append($mask);

            let $menu = $("ul.menu").clone();
            let $tinyMenu = $(".tiny-menu");
            $tinyMenu.html($menu);
            $body.addClass("tiny");

            $mask.off("click").on("click", function() {
                $(this).remove();
                $tinyMenu.html("");
                $body.removeClass("tiny");
            });
        });
    };

    const loadLazy = function() {
        $.getScript(APP.plugins.lazyLoad.js, function() {
            $("img.lazyload").lazyload({
                placeholder : base + "/Grace/source/images/loading.gif",
                effect: "fadeIn"
            });
        })
    };

    const contentWayPoint = function () {
        $.getScript(APP.plugins.wayPoints.js, function() {
            let i = 0;
            $('.animate-box').waypoint(function (direction) {
                if (direction === 'down' && !$(this.element).hasClass('animated')) {
                    i++;
                    $(this.element).addClass('item-animate');
                    setTimeout(function () {
                        $('body .animate-box.item-animate').each(function (k) {
                            let el = $(this);
                            setTimeout(function () {
                                let effect = el.data('animate-effect');
                                effect = effect || 'fadeInUp';
                                el.addClass(effect + ' animated visible');
                                el.removeClass('item-animate');
                            }, k * 300, 'easeInOutExpo');
                        });
                    }, 100);
                }
            }, {
                offset: '85%'
            });
        });
    };

    const searchEvent = function() {

        let $body = $("body");
        let $iframe = $('<div id="modal-iframe" class="iziModal light"></div>');
        $body.append($iframe);

        $("#modal-iframe").iziModal({
            iframe: true,
            headerColor: "rgb(76, 175, 80)",
            title: '<i class="fa fa-search"></i> 站内搜索' ,
            width: 620,
            iframeHeight: 360,
            iframeURL: "/search/"
        });

        $("#searchBtn").off("click").on("click", function() {
            $('#modal-iframe').iziModal('open');
        });

    };

    const sidebarEvent = function() {
        $.getScript(APP.plugins.bootstrap.js, function() {
            let $sidebar = $("#sidebar");
            // 固定位置
            $sidebar.affix({ offset: 480});
            $sidebar.find("li.tab-item").off("click").on("click", function() {
                if ($(this).hasClass("active")) {
                    return;
                }

                let $tabItems = $sidebar.find(".tab-item");
                $tabItems.removeClass("active");
                $(this).addClass("active");

                let index = $tabItems.index($(this));

                let panelItems = $sidebar.find(".panel-item");
                panelItems.removeClass("active");
                $(panelItems.get(index)).addClass("active");
            });
        });
    };

    const copyEvent = function() {
        let clipboard = new ClipboardJS('.info-btn');
        clipboard.on('success', function(e) {
            layer.msg("复制成功");
            e.clearSelection();
        });
    };

    const rewardEvent = function() {
        $("#rewardBtn").off("click").on("click", function() {
            let $body = $("body");
            let $mask = $("<div class='common-mask'></div>");
            $body.append($mask);

            $(".post-reward .codes").addClass("visible");

            $mask.off("click").on("click", function() {
                $(this).remove();
                $(".post-reward .codes").removeClass("visible");
            });
        });

        $(".post-reward a").off("click").on("click", function() {
            if ($(this).hasClass("active")) {
                return;
            }

            let $old = $(".post-reward a.active");
            $old.removeClass("active");
            let $postReward = $(".post-reward");
            $postReward.find("." + $old.data("type")).removeClass("active");

            $(this).addClass("active");
            $postReward.find("." + $(this).data("type")).addClass("active");
        });
    };

    const postEvent = function() {
        let $postDetail = $(".post-detail");
        if ($postDetail.length > 0) {
            // 生成目录
            $.getScript(APP.plugins.toc.js, function () {
                $(".post-toc").html(tocHelper("nav"));
            });

            // 代码高亮
            $.getScript(APP.plugins.highlight.js, function () {
                document.querySelectorAll('figure span').forEach((block) => {
                    hljs.highlightBlock(block);
                });
            });

            sidebarEvent();
            rewardEvent();
        }
    };

    const pjaxEvent = function() {
        $(document).pjax('a[data-pjax]', '#wrap', {fragment: '#wrap', timeout: 8000});
        $(document).on('pjax:start', function() { NProgress.start(); });
        $(document).on('pjax:end',   function(e) {
            loadLazy();
            contentWayPoint();
            postEvent();
            $.getScript("//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js");

            // 导航状态
            let $navBar = $("#navBar");
            let $arr = $navBar.find("ul.menu>li");
            $arr.removeClass("current");
            let $target = $navBar.find("ul.menu>li>a").filter("[href='" + window.location.pathname + "']");
            $target.parent("li").addClass("current");
            NProgress.done();
        });
    };

    $(function() {
        themModeEvent();
        optionEvent();
        changeModeEvent();
        navBarShow();
        menuToggleEvent();
        loadLazy();
        contentWayPoint();
        searchEvent();
        copyEvent();
        postEvent();
        pjaxEvent();
        loadResource();
    });

})();
