var isCustomize = (window.location.href.indexOf("safe.tumblr.com") >= 0) ? true : false;
var disqusEnabled = (typeof disqusEnabled === "undefined") ? false : true;
var lteIE8 = $("html").is(".lte-ie8") ? true : false;
var showFollowing = (typeof showFollowing === "undefined") ? false : true;
var showTweets = (typeof showTweets === "undefined") ? false : true;
var showTwitterProfile = (typeof showTwitterProfile === "undefined") ? false : true;
var isPermalink = (typeof isPermalink === "undefined") ? false : true;
var collapseNotes = (typeof collapseNotes === "undefined") ? false : true;
var fixedBar = (typeof fixedBar === "undefined") ? false : true;
var followedRows = (typeof followedRows === "undefined") ? 3 : followedRows;
var customPhotosets = (typeof customPhotosets === "undefined") ? false : true;
var infiniteScroll = (typeof infiniteScroll === "undefined") ? false : true;
var IOS = (navigator.platform == "iPad" || navigator.platform == "iPhone" || navigator.platform == "iPod") ? true : false;
var isMobile = $("html").hasClass("touch");
var twitterJSLoading = false;
var fancyboxArgs = {
    type: "image",
    padding: 0,
    overlayColor: "#000",
    overlayOpacity: 0.85,
    titlePosition: "outside",
    titleFormat: function (a) {
        return a
    }
};
var sliderArgs = {
    container: "slides",
    autoHeight: true,
    generatePagination: false,
    effect: "slide"
};
(function (f) {
        f(document).ready(function () {
                j();
                var n = f("#header");
                if (isMobile) {
                    fixedBar = false
                }
                if (fixedBar) {
                    var r = false,
                        t = false;
                    var o = 750;
                    var m = false;
                    var p = true;
                    var s = f(window).scrollTop();
                    if (s > o) {
                        m = true;
                        p = false;
                        n.removeClass("pinned").addClass("fixed").css({
                                top: "0px"
                            }).find(".shadow").show()
                    }
                }
                if (showFollowing) {
                    b()
                }
                if (showTweets && twitterUsername !== "") {
                    a()
                }
                if (showInstagram && accessToken !== "") {
                    e()
                }
                if (isPermalink) {
                    d()
                }
                if (disqusEnabled) {
                    k()
                }
                if (searchValue !== "") {
                    f("#search-form").find("input").val(searchValue).focus(function () {
                            if (f(this).val() == searchValue) {
                                f(this).val("")
                            }
                        }).blur(function () {
                            if (f(this).val() == "") {
                                f(this).val(searchValue)
                            }
                        })
                }
                f("article .toggle").live("click", function () {
                        var B = f(this);
                        var A = B.next(".widget");
                        if (B.hasClass("open")) {
                            B.removeClass("open").html("Share");
                            A.animate({
                                    opacity: 0,
                                    top: -5
                                }, 200, "easeOutQuart", function () {
                                    f(this).removeClass("open").css({
                                            display: "none"
                                        })
                                })
                        } else {
                            f("article .toggle.open").removeClass("open").next(".widget").animate({
                                    opacity: 0,
                                    top: -5
                                }, 200, "easeOutQuart", function () {
                                    f(this).removeClass("open").css({
                                            display: "none"
                                        })
                                });
                            B.addClass("open").html("Close");
                            A.css("display", "block").animate({
                                    opacity: 1,
                                    top: 30
                                }, 200, "easeOutQuart", function () {
                                    f(this).addClass("open")
                                })
                        }
                        var D = f(this).parents("article");
                        var y = D.find(".share-pinterest");
                        var E = D.find(".share-pinterest").attr("href");
                        var u = "";
                        if (!y.hasClass("appended")) {
                            if (D.hasClass("type-photo")) {
                                u = D.find(".photo-panel img").attr("src");
                                w(u)
                            } else {
                                if (D.hasClass("type-photoset")) {
                                    u = D.find(".photo:first img").attr("src");
                                    w(u)
                                } else {
                                    if (D.hasClass("type-text") || D.hasClass("type-chat") || D.hasClass("type-quote") || D.hasClass("type-ask")) {
                                        u = D.find(":not(#comments) img:first");
                                        if (u.parents("#comments") || u === undefined) {
                                            C()
                                        } else {
                                            u = u.attr("src");
                                            w(u)
                                        }
                                    } else {
                                        if (D.hasClass("type-video")) {
                                            var x = D.find(".video iframe").attr("src");
                                            if (x.indexOf("youtu") != -1) {
                                                var z = x.match(/embed\/([a-zA-Z0-9]*)\?/);
                                                if (z != null) {
                                                    u = "http://img.youtube.com/vi/" + z[1] + "/maxresdefault.jpg";
                                                    w(u)
                                                }
                                            } else {
                                                if (x.indexOf("vimeo") != -1) {
                                                    var v = x.match(/video\/([a-zA-Z0-9]*)/);
                                                    f.ajax({
                                                            type: "GET",
                                                            url: "http://vimeo.com/api/v2/video/" + v[1] + ".json",
                                                            jsonp: "callback",
                                                            dataType: "jsonp",
                                                            success: function (F) {
                                                                var G = F[0].thumbnail_large;
                                                                u = G;
                                                                w(u)
                                                            }
                                                        })
                                                }
                                            }
                                        } else {
                                            if (D.hasClass("type-audio")) {
                                                if (D.find(".album").length > 0) {
                                                    u = D.find(".album").css("background-image").replace(/"/g, "").replace(/url\(|\)$/ig, "");
                                                    w(u)
                                                } else {
                                                    C()
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            function w(G) {
                                var F = E + G;
                                y.attr("href", F);
                                y.addClass("appended")
                            }

                            function C() {
                                y.addClass("disabled").attr("href", "javascript:void(0)")
                            }
                        }
                    });
                f("html").live("click", function (u) {
                        if (!f(u.target).parents(".share").get(0)) {
                            f(".widget").each(function () {
                                    if (f(this).hasClass("open")) {
                                        f(this).prev(".toggle").removeClass("open").html("Share");
                                        f(this).animate({
                                                opacity: 0,
                                                top: -5
                                            }, 200, "easeOutQuart", function () {
                                                f(this).removeClass("open").css({
                                                        display: "none"
                                                    })
                                            })
                                    }
                                })
                        }
                    });
                f(".short-link input").live("click", function () {
                        f(this).focus().select()
                    });
                f(".photo-panel").live("mouseenter", function () {
                        f(this).find(".photo-btns").stop(true, true).fadeIn(150)
                    }).live("mouseleave", function () {
                        f(this).find(".photo-btns").stop(true, true).fadeOut(150)
                    });
                f(".type-photoset").find(".photo-panel").find("a.lightbox").live("click", function () {
                        f(this).parent().prev("a:has(img)").click();
                        return false
                    });
                f(window).scroll(function () {
                        if (fixedBar) {
                            s = f(window).scrollTop();
                            if (s > o) {
                                if (!m) {
                                    if (t !== false) {
                                        clearTimeout(t);
                                        clearTimeout(r)
                                    }
                                    m = true;
                                    p = false;
                                    t = setTimeout(function () {
                                            n.stop(true, true).removeClass("pinned").addClass("fixed").css({
                                                    top: "-50px"
                                                }).animate({
                                                    top: "0px"
                                                }, 300).find(".shadow").show()
                                        }, 100)
                                }
                            } else {
                                if (s < o) {
                                    if (!p) {
                                        if (r !== false) {
                                            clearTimeout(t);
                                            clearTimeout(r)
                                        }
                                        m = false;
                                        p = true;
                                        r = setTimeout(function () {
                                                n.stop(true, true).animate({
                                                        top: "-60px"
                                                    }, 300, function () {
                                                        f(this).hide().css({
                                                                top: "30px"
                                                            }).find(".shadow").hide().end().removeClass("fixed").addClass("pinned").fadeIn("fast")
                                                    })
                                            }, 100)
                                    }
                                }
                            }
                        }
                    });
                f("#tabs .tab:first").css({
                        left: 0,
                        opacity: 1
                    }).addClass("active");
                f("#tabs #tabs-nav span:first").addClass("active");
                f("#tabs-nav span").click(function () {
                        var v = f("#tabs-nav span.active");
                        var y = f(".tab.active");
                        var w = f(this);
                        var x = w.attr("id").replace("tab-", "");
                        var u = f("#tabs #" + x);
                        if (w.hasClass("active")) {} else {
                            if (isMobile) {
                                y.animate({
                                        opacity: 0
                                    }, 200, function () {
                                        y.removeClass("active");
                                        v.removeClass("active");
                                        u.addClass("active").css({
                                                left: 0
                                            }).animate({
                                                opacity: 1
                                            }, 200);
                                        w.addClass("active")
                                    })
                            } else {
                                y.animate({
                                        left: 200,
                                        opacity: 0
                                    }, 200, function () {
                                        y.removeClass("active");
                                        v.removeClass("active");
                                        u.addClass("active").animate({
                                                left: 0,
                                                opacity: 1
                                            }, 200);
                                        w.addClass("active")
                                    })
                            }
                        }
                    });
                if (f("#tabs .tab").length == 1) {
                    f("#tabs #tabs-nav h2").prependTo(f(".tab"));
                    f("#tabs #tabs-nav").remove();
                    f("#tabs .tab").addClass("ruled-top");
                    var q = f("#tabs").contents();
                    f("#tabs").replaceWith(q)
                }
                if (showInstagram == false && showTweets == "") {
                    f("#tabs").remove()
                }
                if ((window.location.href.indexOf("/page/") > -1) || isMobile) {
                    infiniteScroll = false;
                    f("body").removeClass("infscroll")
                }
                if (infiniteScroll && !isPermalink) {
                    f("#content").infinitescroll({
                            navSelector: "#pagination",
                            nextSelector: "#pagination a.next",
                            itemSelector: ".post",
                            loadingImg: "http://static.tumblr.com/xgwqnql/iLQleupcf/infscroll_loader.gif",
                            loadingText: "",
                            donetext: "No more posts to load."
                        }, function (v, u) {
                            f(v).eq(0).before('<div class="page-sep">Page ' + u + "</div>");
                            j(f(v), true);
                            if (disqusEnabled) {
                                k()
                            }
                        })
                }

                function l() {
                    var u = f("body").scrollTop() ? f("body").scrollTop() : f("html").scrollTop();
                    if (u > 500) {
                        f("#back-to-top").addClass("snippet")
                    } else {
                        f("#back-to-top").removeClass("snippet")
                    }
                }
                f(document).scroll(function (u) {
                        l()
                    });
                f("#back-to-top").click(function () {
                        f("body, html").animate({
                                scrollTop: 0
                            })
                    });
                if (isMobile) {
                    f("#back-to-top").remove()
                }
                if (f("body").hasClass("hide-sidebar")) {
                    f("#sidebar").remove()
                }
                f("#group-members li span, #followed li span").each(function () {
                        var u = f(this);
                        var v = u.innerWidth();
                        u.css({
                                marginLeft: -(v / 2),
                                display: "none"
                            })
                    });
                f("#group-members li, #followed li").hover(function () {
                        var v = f(this);
                        var u = f(this).find("span");
                        if (Modernizr.mq("only screen and (-webkit-min-device-pixel-ratio: 2)") == true) {
                            u.stop().css("display", "block").animate({
                                    opacity: 1,
                                    bottom: 60
                                }, 200)
                        } else {
                            u.stop().css("display", "block").animate({
                                    opacity: 1,
                                    bottom: 39
                                }, 200)
                        }
                    }, function () {
                        var v = f(this);
                        var u = f(this).find("span");
                        if (Modernizr.mq("only screen and (-webkit-min-device-pixel-ratio: 2)") == true) {
                            u.stop().fadeOut(100, function () {
                                    u.css({
                                            bottom: 50,
                                            opacity: 0
                                        })
                                })
                        } else {
                            u.stop().fadeOut(100, function () {
                                    u.css({
                                            bottom: 29,
                                            opacity: 0
                                        })
                                })
                        }
                    });
                if (Modernizr.mq("only screen and (min-device-width : 768px) and (max-device-width : 1024px)") == true) {
                    f("#footer #likes .like_post").eq(4).remove()
                }
                if (Modernizr.mq("only screen and (-webkit-min-device-pixel-ratio: 2)") == true) {
                    f("#group-members li a img, #followed li a img").each(function () {
                            var u = f(this).attr("src");
                            var v = u.replace("_24", "_64");
                            f(this).attr("src", v)
                        })
                }
            });

        function j(l, m) {
            var n = l ? l : f(".post:not(.loaded)");
            if (!customPhotosets) {
                n.find(".photo-slideshow:not(.processed)").pxuPhotoset({
                        rounded: false,
                        highRes: (contentWidth >= 600),
                        gutter: "1px"
                    }, function () {
                        f(this).siblings(".post-panel").animate({
                                opacity: 1
                            })
                    })
            }
            if (customPhotosets) {
                n.find(".media:not(.loaded) .slides").each(function () {
                        f(this).imagesLoaded(function () {
                                var p = f(this).parents("article").attr("id").split("-")[1];
                                var o = {
                                    animationStart: function () {
                                        f("#photoset-" + p + " .caption").animate({
                                                height: "0"
                                            }, 200)
                                    },
                                    animationComplete: function () {
                                        f("#photoset-" + p + " .caption").animate({
                                                height: "40px"
                                            }, 200)
                                    }
                                };
                                f(this).parent().slides(f.extend(sliderArgs, o));
                                f(this).find(".photo-panel a[rel^=gallery]").fancybox(fancyboxArgs);
                                f(this).parent().parent().animate({
                                        opacity: 1
                                    });
                                f(this).parent().addClass("loaded")
                            })
                    })
            }
            n.each(function () {
                    var F = f(this);
                    var C = F.attr("id").split("-")[1];
                    if (F.hasClass("type-photo")) {
                        g(F);
                        f(this).find(".photo-panel a").removeAttr("onclick")
                    }
                    if (F.hasClass("type-audio")) {
                        if (!isMobile) {
                            if (F.find(".spotify iframe").length > 0) {
                                var o = F.find(".spotify iframe");
                                var J = o.width();
                                var E = o.height();
                                var A = (E / J);
                                var z = contentWidth;
                                if (o.hasClass("spotify_audio_player")) {
                                    o.css({
                                            width: z,
                                            height: z + 80
                                        })
                                } else {
                                    if (o.hasClass("soundcloud_audio_player")) {
                                        o.css({
                                                width: z
                                            })
                                    }
                                }
                                var I = F.find(".spotify").html();
                                F.data("spotify-data", I);
                                var q = F.data("spotify-data");
                                o.remove();
                                F.find(".spotify").html(q)
                            } else {
                                if (m) {
                                    var r = F.find(".player-btn").css("visibility", "hidden");
                                    var v = F.find(".js-string").html();
                                    var H = /\\x3cembed.+\\x3c\/embed\\x3e/;
                                    var p = v.match(H)[0].replace(/\\x3cembed/, "\x3cembed wmode=\x22opaque\x22");
                                    r.append('<script type="text/javascript">replaceIfFlash(9,"audio_player_' + C + "\",'\x3cdiv class=\x22audio_player\x22\x3e" + p + "\x3c/div\x3e')<\/script>").css("visibility", "visible");
                                    F.find(".js-string").remove()
                                } else {
                                    var w = F.find(".audio_player");
                                    var y = w.html();
                                    var K = y.replace(/<embed\s/i, "<embed wmode='opaque' ");
                                    w.html(K);
                                    F.find(".js-string").remove()
                                }
                            }
                        } else {
                            F.find(".player-btn").remove()
                        }
                    }
                    if (F.hasClass("type-video")) {
                        if (m) {
                            var u = F.find(".media");
                            if (/span id="?video_player/i.test(u.html())) {
                                var v = F.find(".js-string").html();
                                var x = v.split("x22video_player_" + C + "\\x22,")[1].replace(/\\'/g, "'").replace(/\\\\x26/g, "\x26").replace(/'\)\\x3c\/script\\x3e'/, "");
                                u.append('<script type="text/javascript">renderVideo("video_player_' + C + '", ' + x + "')<\/script>")
                            }
                        }
                        if (Modernizr.mq("screen and (max-device-width:480px)")) {
                            var D = 288;
                            h(F, D)
                        } else {
                            if (Modernizr.mq("screen and (max-device-width:1024px)")) {
                                var D = 500;
                                h(F, D)
                            } else {
                                h(F)
                            }
                        }
                    }
                    if (F.hasClass("type-quote")) {
                        var L = F.find(".quote-text");
                        var s = L.find(":first-child");
                        var G = L.find(":last-child");
                        var B = '<span class="ldquo">&ldquo;</span>';
                        var t = '<span class="rdquo">&rdquo;</span>';
                        if ((s.length > 0) && s.is("p")) {
                            s.prepend(B)
                        } else {
                            L.prepend(B)
                        } if ((G.length > 0) && (/<\/[a-zA-Z]+>$/.test(L.html()))) {
                            G.append(t)
                        } else {
                            L.append(t)
                        }
                    }
                    F.addClass("loaded")
                });
            if (!twitterJSLoading) {
                c()
            }
        }

        function g(n) {
            var l = n.find(".photo-panel");
            var m = l.find("img");
            var p = l.find(".lightbox");
            var o = m.parent("a");
            f(m).click(function (q) {
                    if (q.metaKey) {
                        window.open(f(m).parents("a").attr("href"));
                        return false
                    }
                });
            m.addClass("shadowed");
            p.fancybox(fancyboxArgs);
            if (o.length > 0) {
                if (o.attr("href") == p.attr("href")) {
                    o.click(function () {
                            p.click();
                            return false
                        })
                } else {
                    f("<a>", {
                            "class": "photo-link-url",
                            href: o.attr("href"),
                            text: "Go to Link"
                        }).prependTo(l.find(".photo-btns"));
                    if (p.length > 0) {
                        o.click(function () {
                                p.click();
                                return false
                            })
                    }
                }
            }
        }

        function h(y, t) {
            function x(w, F) {
                if (F == "css") {
                    var E = ((w.css("width") == "100%") ? r : parseInt(w.css("width"))) / parseInt(w.css("height"))
                } else {
                    if (F == "attr") {
                        var E = ((w.attr("width") == "100%") ? r : parseInt(w.attr("width"))) / parseInt(w.attr("height"))
                    }
                }
                return Math.floor(r / E)
            }
            y.find(".js-string").remove();
            if (t == undefined) {
                var r = contentWidth
            } else {
                var r = t
            }
            var p = y.find(".media");
            var l = p.find("embed");
            var D = p.find("object");
            var q = p.find("iframe");
            var v = p.html();
            var o = /src="?http(s)?:\/\/(www)?.youtube(-nocookie)?.com/i.test(v);
            var B = /src="?http:\/\/player\.vimeo\.com/i.test(v);
            var u = p.find(".tumblr_video_container").length > 0;
            if (o) {
                var m = v.match(/http(s)?:\/\/(www)?.youtube(-nocookie)?.com\/([a-zA-Z0-9\/\-_])+/i)[0];
                var A = m.match(/\/([ev]|embed)\/([a-zA-Z0-9\/\-_]+)/);
                var n = Math.floor(r * 0.75);
                var C = Math.floor(r * 0.5625);
                f.getJSON("http://gdata.youtube.com/feeds/api/videos/" + A[2] + "?v=2&alt=json-in-script&callback=?", function (E) {
                        if (E.entry.media$group.yt$aspectRatio != null) {
                            var w = C
                        } else {
                            var w = n
                        }
                        p.html('<iframe src="' + q.attr("src") + '&theme=light" width="' + r + '" height="' + w + '" frameborder="0" allowfullscreen></iframe>')
                    })
            } else {
                if (B) {
                    p.html('<iframe src="' + q.attr("src") + "?title=0&byline=0&portrait=0&color=" + themeColor.replace("#", "") + '" width="' + r + '" height="' + x(q, "attr") + '" frameborder="0"></iframe>')
                } else {
                    if (u) {
                        var s = p.find(".tumblr_video_container");
                        var z = x(q, "attr");
                        s.css({
                                width: r,
                                height: z
                            });
                        q.css({
                                width: r,
                                height: z
                            });
                        p.css({
                                zIndex: 500
                            })
                    } else {
                        if (q.length > 0) {
                            var z = x(q, "attr");
                            q.attr("width", r).attr("height", z).css("width", r).css("height", z)
                        } else {
                            if (l.length > 0) {
                                var z = x(l, "css");
                                l.attr("wmode", "opaque").wrap("<div></div>");
                                l.css("width", r).css("height", z);
                                l.parent().css("width", r).css("height", z);
                                if (l.parent().parent().is("object")) {
                                    l.parent().parent().css("width", r).css("height", z)
                                }
                            } else {
                                if (D.length > 0 && D.not(":has(embed)")) {
                                    if (!f.support.htmlSerialize) {
                                        D.replaceWith(D.attr("altHtml"));
                                        var l = p.find("embed");
                                        var z = x(l, "css");
                                        l.css("width", r).css("height", z);
                                        l.attr("wmode", "opaque")
                                    } else {
                                        var z = x(D, "attr");
                                        D.css("width", r).css("height", z).attr("width", r).attr("height", z)
                                    }
                                }
                            }
                        }
                    }
                }
            }
            p.removeClass("loading")
        }

        function d() {
            var n = 300;
            var l = f("ol.notes");
            var m = f("#notes-toggle");
            m.toggle(function () {
                    l.slideUp(n * 1.5);
                    f(this).removeClass("up");
                    f(this).find(".label").text("Show")
                }, function () {
                    l.slideDown(n * 1.5);
                    f(this).addClass("up");
                    f(this).find(".label").text("Hide")
                });
            if (collapseNotes && (window.location.href.indexOf("#notes") == -1)) {
                m.click()
            }
            f("#content").find(".meta-list").find("li.notes a").click(function (o) {
                    o.preventDefault();
                    if (f("#notes").find("ol.notes").is(":not(:visible)")) {
                        m.click()
                    }
                })
        }

        function b() {
            var o = f("#followed");
            var q = o.find("#followed-list");
            var p = q.children("li").size();
            o.find("h2").append(" <span>(" + p + ")</span>");
            if (p <= (followedRows * 5)) {
                return true
            }
            var n = o.find("#followed-wrap");
            var l = followedRows * q.find("li").eq(0).outerHeight(true);
            var m = n.outerHeight(true);
            n.css("height", l + "px");
            f("<a>", {
                    "class": "show-more-followed",
                    href: "#",
                    html: "Show All &darr;"
                }).appendTo(o).toggle(function () {
                    n.css({
                            height: m + "px"
                        });
                    f(this).html("Show Less &uarr;")
                }, function () {
                    n.css({
                            height: l + "px"
                        });
                    f(this).html("Show All &darr;")
                })
        }

        function k() {
            var m = "?";
            var l = f("li.comments a");
            l.each(function (n) {
                    if (f(this).attr("href").indexOf("#disqus_thread") >= 0) {
                        m += "url" + n + "=" + encodeURIComponent(this.href) + "&"
                    }
                });
            f.getScript("http://disqus.com/forums/" + disqusShortname + "/get_num_replies.js" + m, function () {
                    l.each(function (n) {
                            f(this).prepend('<span class="icon"></span>').parent().removeClass("hidden")
                        })
                })
        }

        function c() {
            twitterJSLoading = true;
            f.ajax({
                    url: "http://platform.twitter.com/widgets.js",
                    dataType: "script",
                    cache: true,
                    success: function () {
                        twitterJSLoading = false
                    }
                })
        }

        function a() {
            numTweets = (numTweets > 4) ? 4 : numTweets;
            f("#twitter .loading-text").replaceWith('<ul class="tweets" />');
            var p = window.tweet_data.slice(0, numTweets);
            var n = f(".tweets");
            if (showTwitterProfile) {
                var l = p[0]["user"];
                var m = l.description;
                var o = '<div class="profile"><h3><a href="http://www.twitter.com/' + twitterUsername + '">@' + twitterUsername + '</a><br/> <span class="name">' + l.name + "</span></h3>";
                o += (m) ? '<p class="bio">' + m + "</p></div>" : ""
            }
            f("#twitter .tweets").before(o);
            f.each(p, function () {
                    var s = this.id_str;
                    var r = linkifyTweet(this.text);
                    var v = relative_time(this.created_at);
                    var u = this.user.profile_image_url;
                    var t = "http://twitter.com/" + twitterUsername + "/status/" + s;
                    var q = '<li><p class="tweet">' + r + ' <span class="tweet-meta"><a class="timestamp" href="' + t + '" time="' + this.created_at + '" target="_blank">' + v + '</a> • <a class="reply" href="https://twitter.com/intent/tweet?in_reply_to=' + s + '">Reply</a></span></p></li>';
                    n.append(q)
                })
        }

        function e() {
            instaCount = (instaCount > 4) ? 4 : instaCount;
            f.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    cache: false,
                    timeout: 5000,
                    url: "https://api.instagram.com/v1/users/self/media/recent?access_token=" + accessToken + "&count=" + instaCount,
                    success: function (p) {
                        if (p.meta.error_type == "OAuthAccessTokenException") {
                            f("#instagram .loading-text").html("Error fetching photos, incorrect access token used.")
                        }
                        f("#instagram").append('<div id="instagram-photos" />');
                        var s = f("#instagram-photos");
                        var x = p.data;
                        for (i = 0; i < 4; i++) {
                            if (x[i] !== undefined) {
                                var m = x[i];
                                var q = m.images.low_resolution.url;
                                var r = m.id;
                                var y = m.link;
                                var n = m.likes.count;
                                var t = m.comments.count;
                                var o;
                                if (m.caption != null) {
                                    o = '<p class="caption">' + m.caption.text + "</p>"
                                } else {
                                    o = ""
                                }
                                var l;
                                if (n == 1) {
                                    l = n + " like"
                                } else {
                                    l = n + " likes"
                                }
                                var w;
                                if (t == 1) {
                                    w = t + " comment"
                                } else {
                                    w = t + " comments"
                                }
                                var v = '<img src="' + q + '" />';
                                var u = '<div class="instagram-photo ' + r + '">' + v + "<aside>" + o + '<p><span class="insta-likes">' + l + '</span> • <span class="insta-comments">' + w + "</span></p></aside></div>";
                                s.append(u);
                                if (y != null) {
                                    y = '<a href="' + y + '" />';
                                    f("." + r).find(".insta-likes").wrapInner(y);
                                    f("." + r).find(".insta-comments").wrapInner(y);
                                    f("." + r).find("> img").wrap(y)
                                }
                            }
                        }
                        f("#instagram-photos").imagesLoaded(function () {
                                f("#instagram .loading-text").remove();
                                f(".instagram-photo").each(function () {
                                        f(this).animate({
                                                opacity: 1
                                            })
                                    })
                            })
                    },
                    error: function () {
                        f("#instagram-photos").append("<p>Instagram&rsquo;s API service is experiencing some technical difficulties. Please try again later.</p>").css("background", "none");
                        f(".more-instagram").html("").css("background", "none")
                    }
                })
        }
        f.preloadImages = function () {
            for (var l = 0; l < arguments.length; l++) {
                img = new Image();
                img.src = arguments[l]
            }
        };
        f.preloadImages("http://static.tumblr.com/xgwqnql/fMLlbpj9t/header_shadow.png", "http://static.tumblr.com/njty47g/Omoleufdi/topbar_bg.png", "http://static.tumblr.com/njty47g/x1Ild1iih/photo_btns_med.png")
    })(window.jQuery);

function linkifyTweet(a) {
    return a.replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi, '<a href="$1">$1</a>').replace(/(^|\s)#(\w+)/g, '$1<a href="http://search.twitter.com/search?q=%23$2">#$2</a>').replace(/(^|\s)@(\w+)/g, '$1<a href="http://twitter.com/$2">@$2</a>')
}

function relative_time(b) {
    var a = parseDate(b);
    var c = (arguments.length > 1) ? arguments[1] : new Date();
    var d = parseInt((c.getTime() - a) / 1000);
    if (d < 60) {
        return "less than a minute ago"
    } else {
        if (d < 120) {
            return "about a minute ago"
        } else {
            if (d < (45 * 60)) {
                return (parseInt(d / 60)).toString() + " minutes ago"
            } else {
                if (d < (90 * 60)) {
                    return "about an hour ago"
                } else {
                    if (d < (24 * 60 * 60)) {
                        return "about " + (parseInt(d / 3600)).toString() + " hours ago"
                    } else {
                        if (d < (48 * 60 * 60)) {
                            return "1 day ago"
                        } else {
                            return (parseInt(d / 86400)).toString() + " days ago"
                        }
                    }
                }
            }
        }
    }
}

function parseDate(d) {
    var a = d.split(" "),
        b, c;
    if (/\+0000/.test(a[5])) {
        b = a[3];
        c = a[4]
    } else {
        b = a[5];
        c = a[3]
    }
    return new Date(Date.parse(a[1] + " " + a[2] + ", " + b + " " + c + " UTC"))
}
window.log = function () {
    log.history = log.history || [];
    log.history.push(arguments);
    if (this.console) {
        console.log(Array.prototype.slice.call(arguments))
    }
};