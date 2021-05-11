;
(function($, window) {

    let APP = {
        plugins: {
            APlayer: {
                css: baseLink + "/source/js/APlayer/APlayer.min.css",
                js: baseLink + "/source/js/APlayer/APlayer.min.js"
            },
            bootstrap: {
                js: baseLink + "/source/css/bootstrap/js/bootstrap.min.js"
            },
            highlight: {
                js: baseLink + "/source/js/highlightjs/highlight.pack.js"
            },
            lazyLoad: {
                js: baseLink + "/source/js/jquery.lazyload.min.js"
            },
            share: {
                js: baseLink + "/source/js/overshare/js/social-share.min.js"
            },
            toc: {
                js: baseLink + "/source/js/toc.js"
            },
            wayPoints: {
                js: baseLink + "/source/js/jquery.waypoints.min.js"
            }
        }
    };

    console.log("%c Theme." + themeName + " v" + version + " %c https://www.extlight.com/ ", "color: white; background: #e9546b; padding:5px 0;", "padding:4px;border:1px solid #e9546b;");

    $.ajaxSetup({
        cache: true
    });

    const loadResource = function() {
        // let APlayer = APP.plugins.APlayer;
        // $('head').append('<link href="' + APlayer.css + '" rel="stylesheet" type="text/css" />');
        // $.getScript(APlayer.js);
        $.getScript("//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js");
        // $("body").css("cursor", "url('" + baseLink + "/source/images/normal.cur'), default");
        // $("a").css("cursor", "url('" + baseLink + "/source/images/link.cur'), pointer");
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

    const commonEvent = function() {
        // sidebar
        let $sidebar = $("#sidebar");
        $("#sidebarBtn").off("click").on("click", function() {
            if ($sidebar.hasClass("show")) {
                $sidebar.removeClass("show");
                $(this).html("<i class='fa fa-ellipsis-v'></i>");
                $("#menuToolPanel").removeClass("show");
            } else {
                $sidebar.addClass("show");
                $(this).html("<i class='fa fa-arrow-left'></i>");
            }
        });

        // search
        let $body = $("body");
        let $iframe = $('<div id="modal-iframe" class="iziModal light"></div>');
        $body.append($iframe);

        $("#modal-iframe").iziModal({
            iframe: true,
            headerColor: "rgb(10,10,10)",
            title: '<i class="fa fa-search"></i> 站内搜索' ,
            width: 620,
            iframeHeight: 360,
            iframeURL: "/search/"
        });

        $("#searchBtn").off("click").on("click", function() {
            $('#modal-iframe').iziModal('open');
        });

        // change mode
        $("#changeMode").off("click").on("click", function () {
            let $html = $("html");
            let mode = ($html.attr("mode") === "light" ? "dark" : "light");
            sessionStorage.setItem(CURRENT_MODE, mode);
            $html.attr("mode", mode);
            if (mode === "light") {
                $(this).html('<i class="fa fa-adjust"></i> <span>夜间</span>');
            } else {
                $(this).html('<i class="fa fa-adjust"></i> <span>白昼</span>');
            }
        });

        // to top
        let toTop = $('<a href="javascript:void(0)" id="toTop" class="to-top"> <i class="fa fa-angle-double-up"></i> <span>回到顶部</span> </a>');
        $body.append(toTop);

        $("#toTop").off("click").on("click", function() {
            $('html, body').animate({
                scrollTop: $('html').offset().top
            }, 500);
        });

        $("#toolBtn").off("click").on("click", function() {
           let $menuToolPanel = $("#menuToolPanel");
           if ($menuToolPanel.hasClass("show")) {
               $menuToolPanel.removeClass("show");
           } else {
               $menuToolPanel.addClass("show");
           }
        });
    };


    let GLASS_THEME = "glass_theme";
    let TEXT_SHADOW = "text_shadow";
    const toolPanelEvent = function() {
        let isGlassTheme = localStorage.getItem(GLASS_THEME);
        let $glassTheme = $("#glassTheme");
        if (isGlassTheme === "true") {
            $("#appCss").attr("href", baseLink + "/source/css/app_Glass.css?v=" + version);
            $glassTheme.prop("checked", true);
        }

        $glassTheme.off("click").on("click", function() {
            let checked = $(this).prop("checked");
            if (checked) {
                $("#appCss").attr("href", baseLink + "/source/css/app_Glass.css?v=" + version);
                localStorage.setItem(GLASS_THEME, "true");
            } else {
                $("#appCss").attr("href", baseLink + "/source/css/app_Material.css?v=" + version);
                localStorage.removeItem(GLASS_THEME);
            }
        });

        let isTextShadow = localStorage.getItem(TEXT_SHADOW);
        let $body = $("body");
        let $textShadow = $("#textShadow");
        if (isTextShadow === "false") {
            $body.css({"textShadow": "none"});
        }

        $textShadow.off("click").on("click", function() {
            let checked = $(this).prop("checked");
            if (checked) {
                $body.css({"textShadow": "0 1px 3px var(--text-shadow-color)"});
                localStorage.removeItem(TEXT_SHADOW);
            } else {
                $body.css({"textShadow": "none"});
                localStorage.setItem(TEXT_SHADOW, "false");
            }
        });

    };

    const loadLazy = function() {
        $.getScript(APP.plugins.lazyLoad.js, function() {
            $("img.lazyload").lazyload({
                placeholder : baseLink + "/source/images/loading2.jpg",
                effect: "fadeIn"
            });
        })
    };

    const tocPositionEvent = function() {
        $.getScript(APP.plugins.bootstrap.js, function() {
            let $postToc = $("#postToc");
            $postToc.affix({ offset: 480});
        });
    };

    const rewardEvent = function() {
        $("#rewardBtn").off("click").on("click", function() {
            let $postRewardPanel = $("#postRewardPanel");
            if ($postRewardPanel.hasClass("show")) {
                $postRewardPanel.removeClass("show");
            } else {
                $postRewardPanel.addClass("show");
            }
        });

    };

    const praiseEvent = function() {
        $("#priseBtn").on("click",function () {
            let postId = $(this).data("postId");
            if (sessionStorage.getItem("hasPrize" + postId)) {
                layer.msg("已点赞,请勿频繁操作");
                return;
            }

            $.post("/praisePost/" + postId, null, function (resp) {
                if (resp.success) {
                    layer.msg("点赞成功");
                    $("#prizeNum").text(resp.data);
                    sessionStorage.setItem("hasPrize" + postId, "y");
                }
            },"json");
        });
    };

    const copyInfoEvent = function() {
        let clipboard = new ClipboardJS('.info-btn');
        clipboard.on('success', function(e) {
            layer.msg("复制成功");
            e.clearSelection();
        });
    };

    const copyCodeEvent = function() {
        let $highlightArr = $(".highlight");
        $highlightArr.each(function(index, domEle) {
            let $highlight = $(domEle);
            let $table = $highlight.find("table");
            let copyBtn = $("<span class='copy-btn'><i class='fa fa-clone'></i></span>");
            $highlight.append(copyBtn);
            let clipboard = new ClipboardJS(copyBtn.get(0), {
                text: function(trigger) {
                    let html = $table.find("td.code pre").html();
                    html = html.replace(/<br>/g, "\r\n");
                    return $(html).text();
                }
            });

            clipboard.on('success', function(e) {
                layer.msg("复制成功");
                e.clearSelection();
            });
        });
    };

    const shareCodeEvent = function() {
        $.getScript(APP.plugins.share.js);
    };

    const runCodeEvent = function() {
        $(".run-code").on("click", function() {
            let $btn = $(this);
            let html = $btn.prev("figure").find("td.code pre").html();
            html = html.replace(/<br>/g, "\r\n");
            let codeContent = $(html).text();
            let childWin = window.open("", "_blank", "");
            childWin.document.open("text/html", "replace");
            childWin.opener = null;
            childWin.document.write(codeContent);
            childWin.document.close()
        });
    };

    const contentWayPoint = function() {
        $.getScript(APP.plugins.wayPoints.js, function() {
            $('.animate-box').waypoint(function (direction) {
                if (direction === 'down' && !$(this.element).hasClass('animated')) {
                    $(this.element).addClass('item-animate');
                    $('body .animate-box.item-animate').each(function (k) {
                        let el = $(this);
                        setTimeout(function () {
                            let effect = el.data('animate-effect');
                            effect = effect || 'fadeInUp';
                            el.addClass(effect + ' animated visible');
                            el.removeClass('item-animate');
                        }, k * 100, 'easeInOutExpo');
                    });
                }
            }, {
                offset: '85%'
            });
        });
    };

    const postEvent = function() {
        let $postDetail = $(".post-detail");
        if ($postDetail.length > 0) {

            $.getScript(APP.plugins.toc.js, function () {
                $(".toc-panel").html(tocHelper("nav"));
                $('body').scrollspy({ offset: 100, target: '.toc-panel' });
                let headArr = $(".post-detail").find("h3");
                $(window).scroll(function(e) {
                    let scrollTop = $(this).scrollTop();
                    // 确认当前滚动的目录索引
                    let current = 0;
                    $.grep(headArr, function(domEle, index) {
                        if (scrollTop >= $(domEle).offset().top - 100) {
                            current = index;
                            return true;
                        }
                    });
                    $(".post-toc").find("li.nav-level-2").removeClass("active");
                    let currentHead = $(".post-toc").find("li.nav-level-2").eq(current);
                    currentHead.addClass("active");
                });
            });

            $.getScript(APP.plugins.highlight.js, function () {
                document.querySelectorAll('figure span').forEach((block) => {
                    hljs.highlightBlock(block);
                });
            });

            tocPositionEvent();
            rewardEvent();
            praiseEvent();
            copyCodeEvent();
            shareCodeEvent();
            runCodeEvent();
        }
    };

    const pjaxEvent = function() {
        $(document).pjax('a[data-pjax]', '#main', {fragment: '#main', timeout: 8000});
        $(document).on('pjax:send', function() {NProgress.start(); });
        $(document).on('pjax:complete',   function(e) {
            postEvent();
            pushEvent();

            let $sidebar = $("#sidebar");
            let $arr = $sidebar.find("ul.first-menus>li");
            $arr.removeClass("current");
            let $target = $sidebar.find("ul.first-menus>li>a").filter("[href='" + window.location.pathname + "']");
            $target.parent("li").addClass("current");
            NProgress.done();
            $.getScript("//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js");
        });
        $(document).on('pjax:end', function() { contentWayPoint(); loadLazy();});
    };

    const pushEvent = function() {
        $.getScript("https://zz.bdstatic.com/linksubmit/push.js");
    };

    const ServiceWorker = function() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js');
            });
        }
    };

    $(function() {
        themModeEvent();
        commonEvent();
        toolPanelEvent();
        loadLazy();
        contentWayPoint();
        copyInfoEvent();
        postEvent();
        pjaxEvent();
        pushEvent();
        loadResource();
        ServiceWorker();
    });

})(jQuery, window);
