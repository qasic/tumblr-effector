/*!
// Infinite Scroll jQuery plugin
// copyright Paul Irish, licensed GPL & MIT
// version 1.5.101207

// home and docs: http://www.infinite-scroll.com
*/
function linkifyTweet(e) {
    return e.replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi, '<a href="$1">$1</a>').replace(/(^|\s)#(\w+)/g, '$1<a href="https://twitter.com/search?q=%23$2">#$2</a>').replace(/(^|\s)@(\w+)/g, '$1<a href="http://twitter.com/$2">@$2</a>')
}

function relative_time(e) {
    var t = parseDate(e),
        i = arguments.length > 1 ? arguments[1] : new Date,
        n = parseInt((i.getTime() - t) / 1e3);
    return 60 > n ? "less than a minute ago" : 120 > n ? "about a minute ago" : 2700 > n ? parseInt(n / 60).toString() + " minutes ago" : 5400 > n ? "about an hour ago" : 86400 > n ? "about " + parseInt(n / 3600).toString() + " hours ago" : 172800 > n ? "1 day ago" : parseInt(n / 86400).toString() + " days ago"
}

function parseDate(e) {
    var t, i, n = e.split(" ");
    return /\+0000/.test(n[5]) ? (t = n[3], i = n[4]) : (t = n[5], i = n[3]), new Date(Date.parse(n[1] + " " + n[2] + ", " + t + " " + i + " UTC"))
}! function (e) {
    e.fn.infinitescroll = function (t, i) {
        function n() {
            v.debug && window.console && console.log.call(console, arguments)
        }

        function a(t) {
            for (var i in t) return i.indexOf && i.indexOf("Selector") > -1 && 0 === e(t[i]).length ? (n("Your " + i + " found no elements."), !1) : !0
        }

        function o(t) {
            if (t.match(/^(.*?)\b2\b(.*?$)/)) t = t.match(/^(.*?)\b2\b(.*?$)/).slice(1);
            else if (t.match(/^(.*?)2(.*?$)/)) {
                if (t.match(/^(.*?page=)2(\/.*|$)/)) return t = t.match(/^(.*?page=)2(\/.*|$)/).slice(1);
                n("Trying backup next selector parse technique. Treacherous waters here, matey."), t = t.match(/^(.*?)2(.*?$)/).slice(1)
            } else {
                if (t.match(/^(.*?page=)1(\/.*|$)/)) return t = t.match(/^(.*?page=)1(\/.*|$)/).slice(1);
                if (e.isFunction(v.pathParse)) return [t];
                n("Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com."), b.isInvalidPage = !0
            }
            return t
        }

        function s() {
            return v.isFiltered = !0, e(window).trigger("error.infscr." + v.infid, [302])
        }

        function r() {
            var t = 0 + e(document).height() - (e(b.container).scrollTop() || e(b.container.ownerDocument.body).scrollTop()) - e(window).height();
            return n("math:", t, b.pixelsFromNavToBottom), t - v.bufferPx < b.pixelsFromNavToBottom
        }

        function d() {
            b.loadingMsg.find("img").hide().parent().find("div").html(v.donetext).animate({
                opacity: 1
            }, 2e3, function () {
                e(this).parent().fadeOut("normal")
            }), v.errorCallback()
        }

        function c() {
            v.isDuringAjax || v.isInvalidPage || v.isDone || v.isFiltered || v.isPaused || r(v, b) && e(document).trigger("retrieve.infscr." + v.infid)
        }

        function l() {
            v.isDuringAjax = !0, b.loadingMsg.appendTo(v.loadMsgSelector).show(v.loadingMsgRevealSpeed, function () {
                e(v.navSelector).hide(), v.currPage++, n("heading into ajax", w), u = e(v.contentSelector).is("table") ? e("<tbody/>") : e("<div/>"), g = document.createDocumentFragment(), m = e.isFunction(v.pathParse) ? v.pathParse(w.join("2"), v.currPage) : w.join(v.currPage), u.load(m + " " + v.itemSelector, null, h)
            })
        }

        function h() {
            if (v.isDone) return d(), !1;
            var t = u.children();
            if (0 == t.length || t.hasClass("error404")) return e(window).trigger("error.infscr." + v.infid, [404]);
            for (; u[0].firstChild;) g.appendChild(u[0].firstChild);
            if (e(v.contentSelector)[0].appendChild(g), b.loadingMsg.fadeOut("normal"), v.animate) {
                var n = e(window).scrollTop() + e("#infscr-loading").height() + v.extraScrollPx + "px";
                e("html,body").animate({
                    scrollTop: n
                }, 800, function () {
                    v.isDuringAjax = !1
                })
            }
            i.call(e(v.contentSelector)[0], t.get(), v.currPage), v.animate || (v.isDuringAjax = !1)
        }

        function f(e) {
            return v.isPaused = "pause" == e ? !0 : "resume" == e ? !1 : !v.isPaused, n("Paused: " + v.isPaused), !1
        }

        function p(t) {
            v.isDone || 404 != t || (n("Page not found. Self-destructing..."), d(), v.isDone = !0, v.currPage = 1, e(window).unbind("scroll.infscr." + v.infid), e(document).unbind("retrieve.infscr." + v.infid)), v.isFiltered && 302 == t && (n("Filtered. Going to next instance..."), v.isDone = !0, v.currPage = 1, v.isPaused = !1, e(window).unbind("scroll.infscr." + v.infid, c).unbind("pause.infscr." + v.infid).unbind("filter.infscr." + v.infid).unbind("error.infscr." + v.infid), e(document).unbind("retrieve.infscr." + v.infid, l))
        }
        e.browser.ie6 = e.browser.msie && e.browser.version < 7;
        var u, g, m, v = e.extend({}, e.infinitescroll.defaults, t),
            b = e.infinitescroll;
        if (i = i || function () {}, !a(v)) return !1;
        b.container = document.documentElement, v.contentSelector = v.contentSelector || this, v.loadMsgSelector = v.loadMsgSelector || v.contentSelector;
        var w = e(v.nextSelector).attr("href");
        return w ? (w = o(w), b.pixelsFromNavToBottom = e(document).height() + (b.container == document.documentElement ? 0 : e(b.container).offset().top) - e(v.navSelector).offset().top, b.loadingMsg = e('<div id="infscr-loading" style="text-align: center;"><img alt="Loading..." src="' + v.loadingImg + '" /><div>' + v.loadingText + "</div></div>"), (new Image).src = v.loadingImg, e(window).bind("scroll.infscr." + v.infid, c).bind("filter.infscr." + v.infid, s).bind("error.infscr." + v.infid, function (e, t) {
            p(t)
        }).bind("pause.infscr." + v.infid, function (e, t) {
            f(t)
        }).trigger("scroll.infscr." + v.infid), e(document).bind("retrieve.infscr." + v.infid, l), this) : (n("Navigation selector not found"), void 0)
    }, e.infinitescroll = {
        defaults: {
            debug: !1,
            preload: !1,
            nextSelector: "div.navigation a:first",
            loadingImg: "http://www.infinite-scroll.com/loading.gif",
            loadingText: "<em>Loading the next set of posts...</em>",
            donetext: "<em>Congratulations, you've reached the end of the internet.</em>",
            navSelector: "div.navigation",
            contentSelector: null,
            loadMsgSelector: null,
            loadingMsgRevealSpeed: "fast",
            extraScrollPx: 150,
            itemSelector: "div.post",
            animate: !1,
            pathParse: void 0,
            bufferPx: 40,
            errorCallback: function () {},
            infid: 1,
            currPage: 1,
            isDuringAjax: !1,
            isInvalidPage: !1,
            isFiltered: !1,
            isDone: !1,
            isPaused: !1
        },
        loadingImg: void 0,
        loadingMsg: void 0,
        container: void 0,
        currDOMChunk: null
    }
}(jQuery),
/*!
    --------------------------------
    PXU Photoset Extended
    --------------------------------
    + https://github.com/PixelUnion/Extended-Tumblr-Photoset
    + http://pixelunion.net
    + Version 1.7.0
    + Copyright 2013 Pixel Union
    + Licensed under the MIT license
*/
function (e) {
    e.fn.pxuPhotoset = function (t, i) {
        var n = {
            lightbox: !0,
            highRes: !0,
            rounded: "corners",
            borderRadius: "5px",
            exif: !0,
            captions: !0,
            gutter: "10px",
            photoset: ".photo-slideshow",
            photoWrap: ".photo-data",
            photo: ".pxu-photo"
        }, a = e.extend(n, t);
        if (a.lightbox) {
            e(".tumblr-box").on("click", function (t) {
                t.preventDefault();
                var i = e(this),
                    n = i.parents(a.photoset).attr("id");
                o(i, n)
            });
            var o = function (t, i) {
                var n = t.parents(a.photoWrap).find(a.photo + " img").data("count"),
                    o = [];
                e("#" + i).find(a.photoWrap).each(function () {
                    var t = e(this).find(a.photo + " img"),
                        i = t.data("width"),
                        n = t.data("height"),
                        s = t.attr("src"),
                        r = t.data("highres"),
                        d = {
                            width: i,
                            height: n,
                            low_res: s,
                            high_res: r
                        };
                    o.push(d)
                }), Tumblr.Lightbox.init(o, n)
            }
        }
        return e(a.photoWrap).on("mouseenter", function () {
            e(this).find(".icons").css("visibility", "visible")
        }).on("mouseleave", function () {
            e(this).find(".icons").css("visibility", "hidden")
        }), e("span.info").on("mouseenter", function () {
            var t = e(this),
                i = t.children(".pxu-data");
            i.css("display", "block").stop(!0, !1).animate({
                opacity: 1
            }, 200)
        }), e("span.info").on("mouseleave", function () {
            var t = e(this),
                i = t.children(".pxu-data");
            i.stop(!0, !1).animate({
                opacity: 0
            }, 200, function () {
                e(this).css("display", "none")
            })
        }), this.each(function () {
            function t(t) {
                for (var i, n, o, s, r, d = t.find(".row"), c = d.length, l = 0; c > l; l++)
                    if (currentRow = d.eq(l), images = currentRow.find(a.photoWrap + " img"), photoCount = images.length, photoCount > 1) {
                        var h = currentRow.find(a.photo + " img").map(function () {
                            return i = e(this), n = i.data("width"), o = i.data("height"), s = i.parent().width(), r = s / n * o, i.data("new-height", r), r
                        }).get(),
                            f = Array.min(h);
                        for (currentRow.height(f).find(a.photo).height(f), g = 0; photoCount > g; g++) {
                            var p = images.eq(g),
                                u = p.data("new-height"),
                                m = f;
                            if (u > m) {
                                var v = (u - m) / 2;
                                p.css("margin-top", -v)
                            }
                        }
                    }
            }
            var n = e(this),
                o = n.data("layout"),
                s = JSON.stringify(o).split(""),
                r = s.length,
                d = n.find(a.photo + " img");
            for (g = 0; g < d.length; g++) {
                var c = d.eq(g);
                c.attr("data-count", g + 1)
            }
            var l = [];
            for (g = 1; r >= g; ++g) {
                for (var h = 0, f = 0; g > f; ++f) {
                    var p = parseInt(s[f], 10);
                    h += p
                }
                var u = parseInt(s[g - 1], 10);
                l[g] = Array(g, u, h)
            }
            for (var g = 1; r >= g; g++) {
                var m;
                m = 1 === g ? 0 : l[g - 1][2], n.find(a.photoWrap).slice(m, l[g][2]).addClass("count-" + l[g][1]).wrapAll('<div class="row clearit" />')
            }
            if (e(this).find(".row").css("margin-bottom", a.gutter), e(this).find(a.photoWrap + ":not(:first-child) " + a.photo + " img").css("margin-left", a.gutter), Array.min = function (e) {
                return Math.min.apply(Math, e)
            }, t(n), e(window).resize(function () {
                t(n)
            }), a.exif && a.captions ? n.find(a.photoWrap).each(function () {
                var t, i, n = e(this).find("img");
                if (n.hasClass("exif-yes")) {
                    var a = n.data("camera") || "-",
                        o = n.data("iso") || "-",
                        s = n.data("aperture") || "-",
                        r = n.data("exposure") || "-",
                        d = n.data("focal") || "-";
                    t = '<table class="exif"><tr><td colspan="2"><span class="label">Camera</span><br>' + a + '</td></tr><tr><td><span class="label">ISO</span><br>' + o + '</td><td><span class="label">Aperture</span><br>' + s + '</td></tr><tr><td><span class="label">Exposure</span><br>' + r + '</td><td><span class="label">Focal Length</span><br>' + d + "</td></tr></table>"
                } else t = ""; if (n.hasClass("caption-yes")) {
                    var c = n.data("caption");
                    i = '<p class="pxu-caption">' + c + "</p>"
                } else i = "";
                ("" !== i || "" !== t) && (e(this).find(".info").append('<div class="pxu-data">' + i + t + '<span class="arrow-down"></span></div>'), "" === t && e(this).find(".pxu-data").addClass("caption-only"), e(this).find("span.info").css("display", "block"))
            }) : a.exif ? n.find(a.photoWrap).each(function () {
                var t = e(this).find("img");
                if (t.hasClass("exif-yes")) {
                    var i = t.data("camera") || "-",
                        n = t.data("iso") || "-",
                        a = t.data("aperture") || "-",
                        o = t.data("exposure") || "-",
                        s = t.data("focal") || "-",
                        r = '<table class="exif"><tr><td colspan="2"><span class="label">Camera</span><br>' + i + '</td></tr><tr><td><span class="label">ISO</span><br>' + n + '</td><td><span class="label">Aperture</span><br>' + a + '</td></tr><tr><td><span class="label">Exposure</span><br>' + o + '</td><td><span class="label">Focal Length</span><br>' + s + '</td></tr></table><span class="arrow-down"></span>';
                    e(this).find(".info").append('<div class="pxu-data">' + r + "</div>"), e(this).find("span.info").css("display", "block")
                }
            }) : a.captions && n.find(a.photoWrap).each(function () {
                var t = e(this).find("img");
                if (t.hasClass("caption-yes")) {
                    var i = t.data("caption"),
                        n = '<p class="pxu-caption" style="margin:0;">' + i + "</p>";
                    e(this).find(".info").append('<div class="pxu-data caption-only">' + n + '<span class="arrow-down"></span></div>'), e(this).find("span.info").css("display", "block")
                }
            }), a.highRes && n.find(a.photoWrap).each(function () {
                var t = e(this).find(a.photo + " img"),
                    i = t.data("highres");
                t.attr("src", i)
            }), "corners" == a.rounded) {
                var v = n.find(".row");
                if (1 == r) v.find(a.photoWrap + ":first-child " + a.photo).css({
                    borderRadius: a.borderRadius + " 0 0 " + a.borderRadius
                }), v.find(a.photoWrap + ":last-child " + a.photo).css({
                    borderRadius: "0 " + a.borderRadius + " " + a.borderRadius + " 0"
                });
                else
                    for (var b = 0; r > b; b++) {
                        var w;
                        0 === b && (w = v.eq(b).find(a.photo).size(), 1 == w ? v.eq(b).find(a.photo).css({
                            borderRadius: a.borderRadius + " " + a.borderRadius + " 0 0"
                        }) : (v.eq(b).find(a.photoWrap + ":first-child " + a.photo).css({
                            borderRadius: a.borderRadius + " 0 0 0"
                        }), v.eq(b).find(a.photoWrap + ":last-child " + a.photo).css({
                            borderRadius: "0 " + a.borderRadius + " 0 0"
                        }))), b == r - 1 && (w = v.eq(b).find(a.photo).size(), 1 == w ? v.eq(b).find(a.photo).css({
                            borderRadius: "0 0 " + a.borderRadius + " " + a.borderRadius
                        }) : (v.eq(b).find(a.photoWrap + ":first-child " + a.photo).css({
                            borderRadius: "0 0 0 " + a.borderRadius
                        }), v.eq(b).find(a.photoWrap + ":last-child " + a.photo).css({
                            borderRadius: "0 0 " + a.borderRadius + " 0"
                        })))
                    }
            }
            "all" == a.rounded && n.find(a.photo).css({
                borderRadius: a.borderRadius
            }), a.rounded || n.find(a.photo).css({
                borderRadius: 0
            }), n.addClass("processed"), "function" == typeof i && i.call(this)
        })
    }
}(jQuery),
function (e) {
    e.fn.slides = function (t) {
        return t = e.extend({}, e.fn.slides.option, t), this.each(function () {
            function i(i, n, a) {
                if (!s && o) {
                    switch (s = !0, t.animationStart(k + 1), i) {
                    case "next":
                        x = k, y = k + 1, y = u === y ? 0 : y, d = 2 * g, i = 2 * -g, k = y;
                        break;
                    case "prev":
                        x = k, y = k - 1, y = -1 === y ? u - 1 : y, d = 0, i = 0, k = y;
                        break;
                    case "pagination":
                        y = parseInt(a, 10), x = e("." + t.paginationClass + " li." + t.currentClass + " a", f).attr("href").match("[^#/]+$"), y > x ? (d = 2 * g, i = 2 * -g) : (d = 0, i = 0), k = y
                    }
                    "fade" === n ? t.crossfade ? p.children(":eq(" + y + ")", f).css({
                        zIndex: 10
                    }).fadeIn(t.fadeSpeed, t.fadeEasing, function () {
                        t.autoHeight ? p.animate({
                            height: p.children(":eq(" + y + ")", f).outerHeight()
                        }, t.autoHeightSpeed, function () {
                            p.children(":eq(" + x + ")", f).css({
                                display: "none",
                                zIndex: 0
                            }), p.children(":eq(" + y + ")", f).css({
                                zIndex: 0
                            }), t.animationComplete(y + 1), s = !1
                        }) : (p.children(":eq(" + x + ")", f).css({
                            display: "none",
                            zIndex: 0
                        }), p.children(":eq(" + y + ")", f).css({
                            zIndex: 0
                        }), t.animationComplete(y + 1), s = !1)
                    }) : p.children(":eq(" + x + ")", f).fadeOut(t.fadeSpeed, t.fadeEasing, function () {
                        t.autoHeight ? p.animate({
                            height: p.children(":eq(" + y + ")", f).outerHeight()
                        }, t.autoHeightSpeed, function () {
                            p.children(":eq(" + y + ")", f).fadeIn(t.fadeSpeed, t.fadeEasing)
                        }) : p.children(":eq(" + y + ")", f).fadeIn(t.fadeSpeed, t.fadeEasing, function () {
                            e.browser.msie && e(this).get(0).style.removeAttribute("filter")
                        }), t.animationComplete(y + 1), s = !1
                    }) : (p.children(":eq(" + y + ")").css({
                        left: d,
                        display: "block"
                    }), t.autoHeight ? p.animate({
                        left: i,
                        height: p.children(":eq(" + y + ")").outerHeight()
                    }, t.slideSpeed, t.slideEasing, function () {
                        p.css({
                            left: -g
                        }), p.children(":eq(" + y + ")").css({
                            left: g,
                            zIndex: 5
                        }), p.children(":eq(" + x + ")").css({
                            left: g,
                            display: "none",
                            zIndex: 0
                        }), t.animationComplete(y + 1), s = !1
                    }) : p.animate({
                        left: i
                    }, t.slideSpeed, t.slideEasing, function () {
                        p.css({
                            left: -g
                        }), p.children(":eq(" + y + ")").css({
                            left: g,
                            zIndex: 5
                        }), p.children(":eq(" + x + ")").css({
                            left: g,
                            display: "none",
                            zIndex: 0
                        }), t.animationComplete(y + 1), s = !1
                    })), t.pagination && (e("." + t.paginationClass + " li." + t.currentClass, f).removeClass(t.currentClass), e("." + t.paginationClass + " li:eq(" + y + ")", f).addClass(t.currentClass))
                }
            }

            function n() {
                clearInterval(f.data("interval"))
            }

            function a() {
                t.pause ? (clearTimeout(f.data("pause")), clearInterval(f.data("interval")), l = setTimeout(function () {
                    clearTimeout(f.data("pause")), h = setInterval(function () {
                        i("next", b)
                    }, t.play), f.data("interval", h)
                }, t.pause), f.data("pause", l)) : n()
            }
            e("." + t.container, e(this)).children().wrapAll('<div class="slides_control"/>');
            var o, s, r, d, c, l, h, f = e(this),
                p = e(".slides_control", f),
                u = p.children().size(),
                g = p.children().outerWidth(),
                m = p.children().outerHeight(),
                v = t.start - 1,
                b = t.effect.indexOf(",") < 0 ? t.effect : t.effect.replace(" ", "").split(",")[0],
                w = t.effect.indexOf(",") < 0 ? b : t.effect.replace(" ", "").split(",")[1],
                y = 0,
                x = 0,
                C = 0,
                k = 0;
            if (2 > u) return e("." + t.container, e(this)).fadeIn(t.fadeSpeed, t.fadeEasing, function () {
                o = !0, t.slidesLoaded()
            }), e("." + t.next + ", ." + t.prev).fadeOut(0), !1;
            if (!(2 > u)) {
                if (0 > v && (v = 0), v > u && (v = u - 1), t.start && (k = v), t.randomize && p.randomize(), e("." + t.container, f).css({
                    overflow: "hidden",
                    position: "relative"
                }), p.children().css({
                    position: "absolute",
                    top: 0,
                    left: p.children().outerWidth(),
                    zIndex: 0,
                    display: "none"
                }), p.css({
                    position: "relative",
                    width: 3 * g,
                    height: m,
                    left: -g
                }), e("." + t.container, f).css({
                    display: "block"
                }), t.autoHeight && (p.children().css({
                    height: "auto"
                }), p.animate({
                    height: p.children(":eq(" + v + ")").outerHeight()
                }, t.autoHeightSpeed)), t.preload && p.find("img:eq(" + v + ")").length) {
                    e("." + t.container, f).css({
                        background: "url(" + t.preloadImage + ") no-repeat 50% 50%"
                    });
                    var I = p.find("img:eq(" + v + ")").attr("src") + "?" + (new Date).getTime();
                    c = "slides_control" != e("img", f).parent().attr("class") ? p.children(":eq(0)")[0].tagName.toLowerCase() : p.find("img:eq(" + v + ")"), p.find("img:eq(" + v + ")").attr("src", I).load(function () {
                        p.find(c + ":eq(" + v + ")").fadeIn(t.fadeSpeed, t.fadeEasing, function () {
                            e(this).css({
                                zIndex: 5
                            }), e("." + t.container, f).css({
                                background: ""
                            }), o = !0, t.slidesLoaded()
                        })
                    })
                } else p.children(":eq(" + v + ")").fadeIn(t.fadeSpeed, t.fadeEasing, function () {
                    o = !0, t.slidesLoaded()
                });
                t.bigTarget && (p.children().css({
                    cursor: "pointer"
                }), p.children().click(function () {
                    return i("next", b), !1
                })), t.hoverPause && t.play && (p.bind("mouseover", function () {
                    n()
                }), p.bind("mouseleave", function () {
                    a()
                })), t.generateNextPrev && (e("." + t.container, f).after('<a href="#" class="' + t.prev + '">Prev</a>'), e("." + t.prev, f).after('<a href="#" class="' + t.next + '">Next</a>')), e("." + t.next, f).click(function (e) {
                    e.preventDefault(), t.play && a(), i("next", b)
                }), e("." + t.prev, f).click(function (e) {
                    e.preventDefault(), t.play && a(), i("prev", b)
                }), t.generatePagination ? (t.prependPagination ? f.prepend("<ul class=" + t.paginationClass + "></ul>") : f.append("<ul class=" + t.paginationClass + "></ul>"), p.children().each(function () {
                    e("." + t.paginationClass, f).append('<li><a href="#' + C + '">' + (C + 1) + "</a></li>"), C++
                })) : e("." + t.paginationClass + " li a", f).each(function () {
                    e(this).attr("href", "#" + C), C++
                }), e("." + t.paginationClass + " li:eq(" + v + ")", f).addClass(t.currentClass), e("." + t.paginationClass + " li a", f).click(function () {
                    return t.play && a(), r = e(this).attr("href").match("[^#/]+$"), k != r && i("pagination", w, r), !1
                }), e("a.link", f).click(function () {
                    return t.play && a(), r = e(this).attr("href").match("[^#/]+$") - 1, k != r && i("pagination", w, r), !1
                }), t.play && (h = setInterval(function () {
                    i("next", b)
                }, t.play), f.data("interval", h))
            }
        })
    }, e.fn.slides.option = {
        preload: !1,
        preloadImage: "/img/loading.gif",
        container: "slides_container",
        generateNextPrev: !1,
        next: "next",
        prev: "prev",
        pagination: !0,
        generatePagination: !0,
        prependPagination: !1,
        paginationClass: "pagination",
        currentClass: "current",
        fadeSpeed: 350,
        fadeEasing: "",
        slideSpeed: 350,
        slideEasing: "",
        start: 1,
        effect: "slide",
        crossfade: !1,
        randomize: !1,
        play: 0,
        pause: 0,
        hoverPause: !1,
        autoHeight: !1,
        autoHeightSpeed: 350,
        bigTarget: !1,
        animationStart: function () {},
        animationComplete: function () {},
        slidesLoaded: function () {}
    }, e.fn.randomize = function (t) {
        function n() {
            return Math.round(Math.random()) - .5
        }
        return e(this).each(function () {
            var a = e(this),
                o = a.children(),
                s = o.length;
            if (s > 1) {
                o.hide();
                var r = [];
                for (i = 0; s > i; i++) r[r.length] = i;
                r = r.sort(n), e.each(r, function (e, i) {
                    var n = o.eq(i),
                        s = n.clone(!0);
                    s.show().appendTo(a), void 0 !== t && t(n, s), n.remove()
                })
            }
        })
    }
}(jQuery),
function (e, t) {
    var i = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    e.fn.imagesLoaded = function (n) {
        function a() {
            var t = e(h),
                i = e(f);
            r && (f.length ? r.reject(c, t, i) : r.resolve(c)), e.isFunction(n) && n.call(s, c, t, i)
        }

        function o(t, n) {
            t.src === i || -1 !== e.inArray(t, l) || (l.push(t), n ? f.push(t) : h.push(t), e.data(t, "imagesLoaded", {
                isBroken: n,
                src: t.src
            }), d && r.notifyWith(e(t), [n, c, e(h), e(f)]), c.length === l.length && (setTimeout(a), c.unbind(".imagesLoaded")))
        }
        var s = this,
            r = e.isFunction(e.Deferred) ? e.Deferred() : 0,
            d = e.isFunction(r.notify),
            c = s.find("img").add(s.filter("img")),
            l = [],
            h = [],
            f = [];
        return c.length ? c.bind("load.imagesLoaded error.imagesLoaded", function (e) {
            o(e.target, "error" === e.type)
        }).each(function (n, a) {
            var s = a.src,
                r = e.data(a, "imagesLoaded");
            r && r.src === s ? o(a, r.isBroken) : a.complete && a.naturalWidth !== t ? o(a, 0 === a.naturalWidth || 0 === a.naturalHeight) : (a.readyState || a.complete) && (a.src = i, a.src = s)
        }) : a(), r ? r.promise(s) : s
    }
}(jQuery),
/*
 * FancyBox - jQuery Plugin
 * Simple and fancy lightbox alternative
 *
 * Examples and documentation at: http://fancybox.net
 *
 * Copyright (c) 2008 - 2010 Janis Skarnelis
 *
 * Version: 1.3.1 (05/03/2010)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
function (e) {
    var t, i, n, a, o, s, r, d, c, l, h, f, p = 0,
        u = {}, g = [],
        m = 0,
        v = {}, b = [],
        w = null,
        y = new Image,
        x = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,
        C = /[^\.]\.(swf)\s*$/i,
        k = 1,
        I = !1,
        M = e.extend(e("<div/>")[0], {
            prop: 0
        }),
        S = 0,
        O = !e.support.opacity && !window.XMLHttpRequest,
        q = function () {
            i.hide(), y.onerror = y.onload = null, w && w.abort(), t.empty()
        }, T = function () {
            e.fancybox('<p id="fancybox_error">The requested content cannot be loaded.<br />Please try again later.</p>', {
                scrolling: "no",
                padding: 20,
                transitionIn: "none",
                transitionOut: "none"
            })
        }, P = function () {
            return [e(window).width(), e(window).height(), e(document).scrollLeft(), e(document).scrollTop()]
        }, A = function () {
            var e = P(),
                t = {}, i = v.margin,
                n = v.autoScale,
                a = 2 * (20 + i),
                o = 2 * (20 + i),
                s = 2 * v.padding;
            return v.width.toString().indexOf("%") > -1 ? (t.width = e[0] * parseFloat(v.width) / 100 - 40, n = !1) : t.width = v.width + s, v.height.toString().indexOf("%") > -1 ? (t.height = e[1] * parseFloat(v.height) / 100 - 40, n = !1) : t.height = v.height + s, n && (t.width > e[0] - a || t.height > e[1] - o) && ("image" == u.type || "swf" == u.type ? (a += s, o += s, n = Math.min(Math.min(e[0] - a, v.width) / v.width, Math.min(e[1] - o, v.height) / v.height), t.width = Math.round(n * (t.width - s)) + s, t.height = Math.round(n * (t.height - s)) + s) : (t.width = Math.min(t.width, e[0] - a), t.height = Math.min(t.height, e[1] - o))), t.top = e[3] + .5 * (e[1] - (t.height + 40)), t.left = e[2] + .5 * (e[0] - (t.width + 40)), v.autoScale === !1 && (t.top = Math.max(e[3] + i, t.top), t.left = Math.max(e[2] + i, t.left)), t
        }, j = function (e) {
            if (e && e.length) switch (v.titlePosition) {
            case "inside":
                return e;
            case "over":
                return '<span id="fancybox-title-over">' + e + "</span>";
            default:
                return '<span id="fancybox-title-wrap"><span id="fancybox-title-left"></span><span id="fancybox-title-main">' + e + '</span><span id="fancybox-title-right"></span></span>'
            }
            return !1
        }, _ = function () {
            var t = v.title,
                i = f.width - 2 * v.padding,
                n = "fancybox-title-" + v.titlePosition;
            if (e("#fancybox-title").remove(), S = 0, v.titleShow !== !1 && (t = e.isFunction(v.titleFormat) ? v.titleFormat(t, b, m, v) : j(t), t && "" !== t)) {
                switch (e('<div id="fancybox-title" class="' + n + '" />').css({
                    width: i,
                    paddingLeft: v.padding,
                    paddingRight: v.padding
                }).html(t).appendTo("body"), v.titlePosition) {
                case "inside":
                    S = e("#fancybox-title").outerHeight(!0) - v.padding, f.height += S;
                    break;
                case "over":
                    e("#fancybox-title").css("bottom", v.padding);
                    break;
                default:
                    e("#fancybox-title").css("bottom", -1 * e("#fancybox-title").outerHeight(!0))
                }
                e("#fancybox-title").appendTo(o).hide()
            }
        }, R = function () {
            e(document).unbind("keydown.fb").bind("keydown.fb", function (t) {
                27 == t.keyCode && v.enableEscapeButton ? (t.preventDefault(), e.fancybox.close()) : 37 == t.keyCode ? (t.preventDefault(), e.fancybox.prev()) : 39 == t.keyCode && (t.preventDefault(), e.fancybox.next())
            }), e.fn.mousewheel && (a.unbind("mousewheel.fb"), b.length > 1 && a.bind("mousewheel.fb", function (t, i) {
                t.preventDefault(), I || 0 === i || (i > 0 ? e.fancybox.prev() : e.fancybox.next())
            })), v.showNavArrows && ((v.cyclic && b.length > 1 || 0 !== m) && d.show(), (v.cyclic && b.length > 1 || m != b.length - 1) && c.show())
        }, D = function () {
            var e, t;
            b.length - 1 > m && (e = b[m + 1].href, "undefined" != typeof e && e.match(x) && (t = new Image, t.src = e)), m > 0 && (e = b[m - 1].href, "undefined" != typeof e && e.match(x) && (t = new Image, t.src = e))
        }, E = function () {
            s.css("overflow", "auto" == v.scrolling ? "image" == v.type || "iframe" == v.type || "swf" == v.type ? "hidden" : "auto" : "yes" == v.scrolling ? "auto" : "visible"), e.support.opacity || (s.get(0).style.removeAttribute("filter"), a.get(0).style.removeAttribute("filter")), e("#fancybox-title").show(), v.hideOnContentClick && s.one("click", e.fancybox.close), v.hideOnOverlayClick && n.one("click", e.fancybox.close), v.showCloseButton && r.show(), R(), e(window).bind("resize.fb", e.fancybox.center), v.centerOnScroll ? e(window).bind("scroll.fb", e.fancybox.center) : e(window).unbind("scroll.fb"), e.isFunction(v.onComplete) && v.onComplete(b, m, v), I = !1, D()
        }, F = function (e) {
            var t = Math.round(h.width + (f.width - h.width) * e),
                i = Math.round(h.height + (f.height - h.height) * e),
                n = Math.round(h.top + (f.top - h.top) * e),
                o = Math.round(h.left + (f.left - h.left) * e);
            a.css({
                width: t + "px",
                height: i + "px",
                top: n + "px",
                left: o + "px"
            }), t = Math.max(t - 2 * v.padding, 0), i = Math.max(i - (2 * v.padding + S * e), 0), s.css({
                width: t + "px",
                height: i + "px"
            }), "undefined" != typeof f.opacity && a.css("opacity", .5 > e ? .5 : e)
        }, z = function (e) {
            var t = e.offset();
            return t.top += parseFloat(e.css("paddingTop")) || 0, t.left += parseFloat(e.css("paddingLeft")) || 0, t.top += parseFloat(e.css("border-top-width")) || 0, t.left += parseFloat(e.css("border-left-width")) || 0, t.width = e.width(), t.height = e.height(), t
        }, L = function () {
            var t = u.orig ? e(u.orig) : !1,
                i = {};
            return t && t.length ? (t = z(t), i = {
                width: t.width + 2 * v.padding,
                height: t.height + 2 * v.padding,
                top: t.top - v.padding - 20,
                left: t.left - v.padding - 20
            }) : (t = P(), i = {
                width: 1,
                height: 1,
                top: t[3] + .5 * t[1],
                left: t[2] + .5 * t[0]
            }), i
        }, Q = function () {
            if (i.hide(), a.is(":visible") && e.isFunction(v.onCleanup) && v.onCleanup(b, m, v) === !1) return e.event.trigger("fancybox-cancel"), I = !1, void 0;
            if (b = g, m = p, v = u, s.get(0).scrollTop = 0, s.get(0).scrollLeft = 0, v.overlayShow && (O && e("select:not(#fancybox-tmp select)").filter(function () {
                return "hidden" !== this.style.visibility
            }).css({
                visibility: "hidden"
            }).one("fancybox-cleanup", function () {
                this.style.visibility = "inherit"
            }), n.css({
                "background-color": v.overlayColor,
                opacity: v.overlayOpacity
            }).unbind().show()), f = A(), _(), a.is(":visible")) {
                e(r.add(d).add(c)).hide();
                var o, l = a.position();
                h = {
                    top: l.top,
                    left: l.left,
                    width: a.width(),
                    height: a.height()
                }, o = h.width == f.width && h.height == f.height, s.fadeOut(v.changeFade, function () {
                    var i = function () {
                        s.html(t.contents()).fadeIn(v.changeFade, E)
                    };
                    e.event.trigger("fancybox-change"), s.empty().css("overflow", "hidden"), o ? (s.css({
                        top: v.padding,
                        left: v.padding,
                        width: Math.max(f.width - 2 * v.padding, 1),
                        height: Math.max(f.height - 2 * v.padding - S, 1)
                    }), i()) : (s.css({
                        top: v.padding,
                        left: v.padding,
                        width: Math.max(h.width - 2 * v.padding, 1),
                        height: Math.max(h.height - 2 * v.padding, 1)
                    }), M.prop = 0, e(M).animate({
                        prop: 1
                    }, {
                        duration: v.changeSpeed,
                        easing: v.easingChange,
                        step: F,
                        complete: i
                    }))
                })
            } else a.css("opacity", 1), "elastic" == v.transitionIn ? (h = L(), s.css({
                top: v.padding,
                left: v.padding,
                width: Math.max(h.width - 2 * v.padding, 1),
                height: Math.max(h.height - 2 * v.padding, 1)
            }).html(t.contents()), a.css(h).show(), v.opacity && (f.opacity = 0), M.prop = 0, e(M).animate({
                prop: 1
            }, {
                duration: v.speedIn,
                easing: v.easingIn,
                step: F,
                complete: E
            })) : (s.css({
                top: v.padding,
                left: v.padding,
                width: Math.max(f.width - 2 * v.padding, 1),
                height: Math.max(f.height - 2 * v.padding - S, 1)
            }).html(t.contents()), a.css(f).fadeIn("none" == v.transitionIn ? 0 : v.speedIn, E))
        }, W = function () {
            t.width(u.width), t.height(u.height), "auto" == u.width && (u.width = t.width()), "auto" == u.height && (u.height = t.height()), Q()
        }, B = function () {
            I = !0, u.width = y.width, u.height = y.height, e("<img />").attr({
                id: "fancybox-img",
                src: y.src,
                alt: u.title
            }).appendTo(t), Q()
        }, H = function () {
            q();
            var i, n, a, o, r, d = g[p];
            if (u = e.extend({}, e.fn.fancybox.defaults, "undefined" == typeof e(d).data("fancybox") ? u : e(d).data("fancybox")), a = d.title || e(d).title || u.title || "", d.nodeName && !u.orig && (u.orig = e(d).children("img:first").length ? e(d).children("img:first") : e(d)), "" === a && u.orig && (a = u.orig.attr("alt")), i = d.nodeName && /^(?:javascript|#)/i.test(d.href) ? u.href || null : u.href || d.href || null, u.type ? (n = u.type, i || (i = u.content)) : u.content ? n = "html" : i ? i.match(x) ? n = "image" : i.match(C) ? n = "swf" : e(d).hasClass("iframe") ? n = "iframe" : i.match(/#/) ? (d = i.substr(i.indexOf("#")), n = e(d).length > 0 ? "inline" : "ajax") : n = "ajax" : n = "inline", u.type = n, u.href = i, u.title = a, u.autoDimensions && "iframe" !== u.type && "swf" !== u.type && (u.width = "auto", u.height = "auto"), u.modal && (u.overlayShow = !0, u.hideOnOverlayClick = !1, u.hideOnContentClick = !1, u.enableEscapeButton = !1, u.showCloseButton = !1), e.isFunction(u.onStart) && u.onStart(g, p, u) === !1) return I = !1, void 0;
            switch (t.css("padding", 20 + u.padding + u.margin), e(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change", function () {
                e(this).replaceWith(s.children())
            }), n) {
            case "html":
                t.html(u.content), W();
                break;
            case "inline":
                e('<div class="fancybox-inline-tmp" />').hide().insertBefore(e(d)).bind("fancybox-cleanup", function () {
                    e(this).replaceWith(s.children())
                }).bind("fancybox-cancel", function () {
                    e(this).replaceWith(t.children())
                }), e(d).appendTo(t), W();
                break;
            case "image":
                I = !1, e.fancybox.showActivity(), y = new Image, y.onerror = function () {
                    T()
                }, y.onload = function () {
                    y.onerror = null, y.onload = null, B()
                }, y.src = i;
                break;
            case "swf":
                o = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + u.width + '" height="' + u.height + '"><param name="movie" value="' + i + '"></param>', r = "", e.each(u.swf, function (e, t) {
                    o += '<param name="' + e + '" value="' + t + '"></param>', r += " " + e + '="' + t + '"'
                }), o += '<embed src="' + i + '" type="application/x-shockwave-flash" width="' + u.width + '" height="' + u.height + '"' + r + "></embed></object>", t.html(o), W();
                break;
            case "ajax":
                d = i.split("#", 2), n = u.ajax.data || {}, d.length > 1 && (i = d[0], "string" == typeof n ? n += "&selector=" + d[1] : n.selector = d[1]), I = !1, e.fancybox.showActivity(), w = e.ajax(e.extend(u.ajax, {
                    url: i,
                    data: n,
                    error: T,
                    success: function (e) {
                        200 == w.status && (t.html(e), W())
                    }
                }));
                break;
            case "iframe":
                e('<iframe id="fancybox-frame" name="fancybox-frame' + (new Date).getTime() + '" frameborder="0" hspace="0" scrolling="' + u.scrolling + '" src="' + u.href + '"></iframe>').appendTo(t), Q()
            }
        }, $ = function () {
            i.is(":visible") ? (e("div", i).css("top", -40 * k + "px"), k = (k + 1) % 12) : clearInterval(l)
        }, N = function () {
            e("#fancybox-wrap").length || (e("body").append(t = e('<div id="fancybox-tmp"></div>'), i = e('<div id="fancybox-loading"><div></div></div>'), n = e('<div id="fancybox-overlay"></div>'), a = e('<div id="fancybox-wrap"></div>')), e.support.opacity || (a.addClass("fancybox-ie"), i.addClass("fancybox-ie")), o = e('<div id="fancybox-outer"></div>').appendTo(a), o.append(s = e('<div id="fancybox-inner"></div>'), r = e('<a id="fancybox-close"></a>'), d = e('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'), c = e('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>')), r.click(e.fancybox.close), i.click(e.fancybox.cancel), d.click(function (t) {
                t.preventDefault(), e.fancybox.prev()
            }), c.click(function (t) {
                t.preventDefault(), e.fancybox.next()
            }), O && (n.get(0).style.setExpression("height", "document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + 'px'"), i.get(0).style.setExpression("top", "(-20 + (document.documentElement.clientHeight ? document.documentElement.clientHeight/2 : document.body.clientHeight/2 ) + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop )) + 'px'"), o.prepend('<iframe id="fancybox-hide-sel-frame" src="javascript:\'\';" scrolling="no" frameborder="0" ></iframe>')))
        };
    e.fn.fancybox = function (t) {
        return e(this).data("fancybox", e.extend({}, t, e.metadata ? e(this).metadata() : {})).unbind("click.fb").bind("click.fb", function (t) {
            return t.preventDefault(), I ? void 0 : (I = !0, e(this).blur(), g = [], p = 0, t = e(this).attr("rel") || "", t && "" != t && "nofollow" !== t ? (g = e("a[rel=" + t + "], area[rel=" + t + "]"), p = g.index(this)) : g.push(this), H(), !1)
        }), this
    }, e.fancybox = function (t, i) {
        if (!I) {
            if (I = !0, i = "undefined" != typeof i ? i : {}, g = [], p = i.index || 0, e.isArray(t)) {
                for (var n = 0, a = t.length; a > n; n++) "object" == typeof t[n] ? e(t[n]).data("fancybox", e.extend({}, i, t[n])) : t[n] = e({}).data("fancybox", e.extend({
                    content: t[n]
                }, i));
                g = jQuery.merge(g, t)
            } else "object" == typeof t ? e(t).data("fancybox", e.extend({}, i, t)) : t = e({}).data("fancybox", e.extend({
                content: t
            }, i)), g.push(t);
            (p > g.length || 0 > p) && (p = 0), H()
        }
    }, e.fancybox.showActivity = function () {
        clearInterval(l), i.show(), l = setInterval($, 66)
    }, e.fancybox.hideActivity = function () {
        i.hide()
    }, e.fancybox.next = function () {
        return e.fancybox.pos(m + 1)
    }, e.fancybox.prev = function () {
        return e.fancybox.pos(m - 1)
    }, e.fancybox.pos = function (e) {
        I || (e = parseInt(e, 10), e > -1 && b.length > e && (p = e, H()), v.cyclic && b.length > 1 && 0 > e && (p = b.length - 1, H()), v.cyclic && b.length > 1 && e >= b.length && (p = 0, H()))
    }, e.fancybox.cancel = function () {
        I || (I = !0, e.event.trigger("fancybox-cancel"), q(), u && e.isFunction(u.onCancel) && u.onCancel(g, p, u), I = !1)
    }, e.fancybox.close = function () {
        function t() {
            n.fadeOut("fast"), a.hide(), e.event.trigger("fancybox-cleanup"), s.empty(), e.isFunction(v.onClosed) && v.onClosed(b, m, v), b = u = [], m = p = 0, v = u = {}, I = !1
        }
        if (!I && !a.is(":hidden")) {
            if (I = !0, v && e.isFunction(v.onCleanup) && v.onCleanup(b, m, v) === !1) return I = !1, void 0;
            if (q(), e(r.add(d).add(c)).hide(), e("#fancybox-title").remove(), a.add(s).add(n).unbind(), e(window).unbind("resize.fb scroll.fb"), e(document).unbind("keydown.fb"), s.css("overflow", "hidden"), "elastic" == v.transitionOut) {
                h = L();
                var i = a.position();
                f = {
                    top: i.top,
                    left: i.left,
                    width: a.width(),
                    height: a.height()
                }, v.opacity && (f.opacity = 1), M.prop = 1, e(M).animate({
                    prop: 0
                }, {
                    duration: v.speedOut,
                    easing: v.easingOut,
                    step: F,
                    complete: t
                })
            } else a.fadeOut("none" == v.transitionOut ? 0 : v.speedOut, t)
        }
    }, e.fancybox.resize = function () {
        var t, i;
        I || a.is(":hidden") || (I = !0, t = s.wrapInner("<div style='overflow:auto'></div>").children(), i = t.height(), a.css({
            height: i + 2 * v.padding + S
        }), s.css({
            height: i
        }), t.replaceWith(t.children()), e.fancybox.center())
    }, e.fancybox.center = function () {
        I = !0;
        var e = P(),
            t = v.margin,
            i = {};
        i.top = e[3] + .5 * (e[1] - (a.height() - S + 40)), i.left = e[2] + .5 * (e[0] - (a.width() + 40)), i.top = Math.max(e[3] + t, i.top), i.left = Math.max(e[2] + t, i.left), a.css(i), I = !1
    }, e.fn.fancybox.defaults = {
        padding: 10,
        margin: 20,
        opacity: !1,
        modal: !1,
        cyclic: !1,
        scrolling: "auto",
        width: 560,
        height: 340,
        autoScale: !0,
        autoDimensions: !0,
        centerOnScroll: !1,
        ajax: {},
        swf: {
            wmode: "transparent"
        },
        hideOnOverlayClick: !0,
        hideOnContentClick: !1,
        overlayShow: !0,
        overlayOpacity: .3,
        overlayColor: "#666",
        titleShow: !0,
        titlePosition: "outside",
        titleFormat: null,
        transitionIn: "fade",
        transitionOut: "fade",
        speedIn: 300,
        speedOut: 300,
        changeSpeed: 300,
        changeFade: "fast",
        easingIn: "swing",
        easingOut: "swing",
        showCloseButton: !0,
        showNavArrows: !0,
        enableEscapeButton: !0,
        onStart: null,
        onCancel: null,
        onComplete: null,
        onCleanup: null,
        onClosed: null
    }, e(document).ready(function () {
        N()
    })
}(jQuery),
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (e, t, i, n, a) {
        return jQuery.easing[jQuery.easing.def](e, t, i, n, a)
    },
    easeInQuad: function (e, t, i, n, a) {
        return n * (t /= a) * t + i
    },
    easeOutQuad: function (e, t, i, n, a) {
        return -n * (t /= a) * (t - 2) + i
    },
    easeInOutQuad: function (e, t, i, n, a) {
        return (t /= a / 2) < 1 ? n / 2 * t * t + i : -n / 2 * (--t * (t - 2) - 1) + i
    },
    easeInCubic: function (e, t, i, n, a) {
        return n * (t /= a) * t * t + i
    },
    easeOutCubic: function (e, t, i, n, a) {
        return n * ((t = t / a - 1) * t * t + 1) + i
    },
    easeInOutCubic: function (e, t, i, n, a) {
        return (t /= a / 2) < 1 ? n / 2 * t * t * t + i : n / 2 * ((t -= 2) * t * t + 2) + i
    },
    easeInQuart: function (e, t, i, n, a) {
        return n * (t /= a) * t * t * t + i
    },
    easeOutQuart: function (e, t, i, n, a) {
        return -n * ((t = t / a - 1) * t * t * t - 1) + i
    },
    easeInOutQuart: function (e, t, i, n, a) {
        return (t /= a / 2) < 1 ? n / 2 * t * t * t * t + i : -n / 2 * ((t -= 2) * t * t * t - 2) + i
    },
    easeInQuint: function (e, t, i, n, a) {
        return n * (t /= a) * t * t * t * t + i
    },
    easeOutQuint: function (e, t, i, n, a) {
        return n * ((t = t / a - 1) * t * t * t * t + 1) + i
    },
    easeInOutQuint: function (e, t, i, n, a) {
        return (t /= a / 2) < 1 ? n / 2 * t * t * t * t * t + i : n / 2 * ((t -= 2) * t * t * t * t + 2) + i
    },
    easeInSine: function (e, t, i, n, a) {
        return -n * Math.cos(t / a * (Math.PI / 2)) + n + i
    },
    easeOutSine: function (e, t, i, n, a) {
        return n * Math.sin(t / a * (Math.PI / 2)) + i
    },
    easeInOutSine: function (e, t, i, n, a) {
        return -n / 2 * (Math.cos(Math.PI * t / a) - 1) + i
    },
    easeInExpo: function (e, t, i, n, a) {
        return 0 == t ? i : n * Math.pow(2, 10 * (t / a - 1)) + i
    },
    easeOutExpo: function (e, t, i, n, a) {
        return t == a ? i + n : n * (-Math.pow(2, -10 * t / a) + 1) + i
    },
    easeInOutExpo: function (e, t, i, n, a) {
        return 0 == t ? i : t == a ? i + n : (t /= a / 2) < 1 ? n / 2 * Math.pow(2, 10 * (t - 1)) + i : n / 2 * (-Math.pow(2, -10 * --t) + 2) + i
    },
    easeInCirc: function (e, t, i, n, a) {
        return -n * (Math.sqrt(1 - (t /= a) * t) - 1) + i
    },
    easeOutCirc: function (e, t, i, n, a) {
        return n * Math.sqrt(1 - (t = t / a - 1) * t) + i
    },
    easeInOutCirc: function (e, t, i, n, a) {
        return (t /= a / 2) < 1 ? -n / 2 * (Math.sqrt(1 - t * t) - 1) + i : n / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + i
    },
    easeInElastic: function (e, t, i, n, a) {
        var o = 1.70158,
            s = 0,
            r = n;
        if (0 == t) return i;
        if (1 == (t /= a)) return i + n;
        if (s || (s = .3 * a), r < Math.abs(n)) {
            r = n;
            var o = s / 4
        } else var o = s / (2 * Math.PI) * Math.asin(n / r);
        return -(r * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * a - o) * 2 * Math.PI / s)) + i
    },
    easeOutElastic: function (e, t, i, n, a) {
        var o = 1.70158,
            s = 0,
            r = n;
        if (0 == t) return i;
        if (1 == (t /= a)) return i + n;
        if (s || (s = .3 * a), r < Math.abs(n)) {
            r = n;
            var o = s / 4
        } else var o = s / (2 * Math.PI) * Math.asin(n / r);
        return r * Math.pow(2, -10 * t) * Math.sin((t * a - o) * 2 * Math.PI / s) + n + i
    },
    easeInOutElastic: function (e, t, i, n, a) {
        var o = 1.70158,
            s = 0,
            r = n;
        if (0 == t) return i;
        if (2 == (t /= a / 2)) return i + n;
        if (s || (s = a * .3 * 1.5), r < Math.abs(n)) {
            r = n;
            var o = s / 4
        } else var o = s / (2 * Math.PI) * Math.asin(n / r);
        return 1 > t ? -.5 * r * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * a - o) * 2 * Math.PI / s) + i : .5 * r * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * a - o) * 2 * Math.PI / s) + n + i
    },
    easeInBack: function (e, t, i, n, a, o) {
        return void 0 == o && (o = 1.70158), n * (t /= a) * t * ((o + 1) * t - o) + i
    },
    easeOutBack: function (e, t, i, n, a, o) {
        return void 0 == o && (o = 1.70158), n * ((t = t / a - 1) * t * ((o + 1) * t + o) + 1) + i
    },
    easeInOutBack: function (e, t, i, n, a, o) {
        return void 0 == o && (o = 1.70158), (t /= a / 2) < 1 ? n / 2 * t * t * (((o *= 1.525) + 1) * t - o) + i : n / 2 * ((t -= 2) * t * (((o *= 1.525) + 1) * t + o) + 2) + i
    },
    easeInBounce: function (e, t, i, n, a) {
        return n - jQuery.easing.easeOutBounce(e, a - t, 0, n, a) + i
    },
    easeOutBounce: function (e, t, i, n, a) {
        return (t /= a) < 1 / 2.75 ? n * 7.5625 * t * t + i : 2 / 2.75 > t ? n * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + i : 2.5 / 2.75 > t ? n * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + i : n * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + i
    },
    easeInOutBounce: function (e, t, i, n, a) {
        return a / 2 > t ? .5 * jQuery.easing.easeInBounce(e, 2 * t, 0, n, a) + i : .5 * jQuery.easing.easeOutBounce(e, 2 * t - a, 0, n, a) + .5 * n + i
    }
});
var isCustomize = window.location.href.indexOf("safe.tumblr.com") >= 0,
    disqusEnabled = "undefined" != typeof disqusEnabled,
    lteIE8 = $("html").is(".lte-ie8"),
    showFollowing = "undefined" != typeof showFollowing,
    showTweets = "undefined" != typeof showTweets,
    showTwitterProfile = "undefined" != typeof showTwitterProfile,
    isPermalink = "undefined" != typeof isPermalink,
    collapseNotes = "undefined" != typeof collapseNotes,
    fixedBar = "undefined" != typeof fixedBar,
    followedRows = window.followedRows || 3,
    customPhotosets = "undefined" != typeof customPhotosets,
    infiniteScroll = "undefined" != typeof infiniteScroll,
    IOS = "iPad" == navigator.platform || "iPhone" == navigator.platform || "iPod" == navigator.platform,
    isMobile = $("html").hasClass("touch"),
    twitterJSLoading = !1,
    fancyboxArgs = {
        type: "image",
        padding: 0,
        overlayColor: "#000",
        overlayOpacity: .85,
        titleShow: !1
    }, sliderArgs = {
        container: "slides",
        autoHeight: !0,
        generatePagination: !1,
        effect: "slide"
    };
! function (e) {
    function t(t, i) {
        var o = t ? t : e(".post:not(.loaded)");
        customPhotosets ? o.find(".media:not(.loaded) .slides").each(function () {
            e(this).imagesLoaded(function () {
                var t = e(this).parents("article").attr("id").split("-")[1],
                    i = {
                        animationStart: function () {
                            e("#photoset-" + t + " .caption").animate({
                                height: "0"
                            }, 200)
                        },
                        animationComplete: function () {
                            e("#photoset-" + t + " .caption").animate({
                                height: "40px"
                            }, 200)
                        }
                    };
                e(this).parent().slides(e.extend(sliderArgs, i)), e(this).find(".photo-panel a[rel^=gallery]").fancybox(fancyboxArgs), e(this).parent().parent().animate({
                    opacity: 1
                }), e(this).parent().addClass("loaded")
            })
        }) : (o.find(".photo-slideshow:not(.processed)").pxuPhotoset({
            rounded: !1,
            highRes: contentWidth >= 600,
            gutter: "1px"
        }, function () {
            e(this).siblings(".post-panel").animate({
                opacity: 1
            })
        }), o.find(".photo-data .photo a").fancybox(fancyboxArgs), o.find(".view").each(function () {
            e(this).click(function (t) {
                t.preventDefault(), e(this).parents(".photo-data").find(".photo a").click()
            })
        })), o.each(function () {
            var t = e(this),
                o = t.attr("id").split("-")[1];
            if (t.hasClass("type-photo") && (n(t), e(this).find(".photo-panel a").removeAttr("onclick")), t.hasClass("type-audio"))
                if (isMobile) t.find(".player-btn").remove();
                else if (t.find(".spotify iframe").length > 0) {
                var s = t.find(".spotify iframe");
                s.width(), s.height();
                var r = contentWidth;
                s.hasClass("spotify_audio_player") ? s.css({
                    width: r,
                    height: r + 80
                }) : s.hasClass("soundcloud_audio_player") && s.css({
                    width: r
                });
                var d = t.find(".spotify").html();
                t.data("spotify-data", d);
                var c = t.data("spotify-data");
                s.remove(), t.find(".spotify").html(c)
            }
            if (t.hasClass("type-video")) {
                if (i) {
                    var l = t.find(".media");
                    if (/span id="?video_player/i.test(l.html())) {
                        var h = t.find(".js-string").html(),
                            f = h.split("x22video_player_" + o + "\\x22,")[1].replace(/\\'/g, "'").replace(/\\\\x26/g, "&").replace(/'\)\\x3c\/script\\x3e'/, "");
                        l.append('<script type="text/javascript">renderVideo("video_player_' + o + '", ' + f + "')</script>")
                    }
                }
                if (Modernizr.mq("screen and (max-device-width:480px)")) {
                    var p = 288;
                    a(t, p)
                } else if (Modernizr.mq("screen and (max-device-width:1024px)")) {
                    var p = 500;
                    a(t, p)
                } else a(t)
            }
            if (t.hasClass("type-quote")) {
                var u = t.find(".quote-text"),
                    g = u.find(":first-child"),
                    m = u.find(":last-child"),
                    v = '<span class="ldquo">&ldquo;</span>',
                    b = '<span class="rdquo">&rdquo;</span>';
                g.length > 0 && g.is("p") ? g.prepend(v) : u.prepend(v), m.length > 0 && /<\/[a-zA-Z]+>$/.test(u.html()) ? m.append(b) : u.append(b)
            }
            t.addClass("loaded")
        }), twitterJSLoading || d()
    }

    function n(t) {
        var i = t.find(".photo-panel"),
            n = i.find("img"),
            a = i.find(".lightbox"),
            o = n.parent("a");
        e(n).click(function (t) {
            return t.metaKey ? (window.open(e(n).parents("a").attr("href")), !1) : void 0
        }), n.addClass("shadowed"), a.fancybox(fancyboxArgs), o.length > 0 && (o.attr("href") == a.attr("href") ? o.click(function () {
            return a.click(), !1
        }) : (e("<a>", {
            "class": "photo-link-url",
            href: o.attr("href"),
            text: "Go to Link"
        }).prependTo(i.find(".photo-btns")), a.length > 0 && o.click(function () {
            return a.click(), !1
        })))
    }

    function a(t, i) {
        function n(e, t) {
            if ("css" == t) var i = ("100%" == e.css("width") ? a : parseInt(e.css("width"))) / parseInt(e.css("height"));
            else if ("attr" == t) var i = ("100%" == e.attr("width") ? a : parseInt(e.attr("width"))) / parseInt(e.attr("height"));
            return Math.floor(a / i)
        }
        if (t.find(".js-string").remove(), void 0 == i) var a = contentWidth;
        else var a = i;
        var o = t.find(".media"),
            s = o.find("embed"),
            r = o.find("object"),
            d = o.find("iframe"),
            c = o.html(),
            l = /src="?http(s)?:\/\/(www)?.youtube(-nocookie)?.com/i.test(c),
            h = /src="?http:\/\/player\.vimeo\.com/i.test(c),
            f = o.find(".tumblr_video_container").length > 0;
        if (l) {
            var p = c.match(/http(s)?:\/\/(www)?.youtube(-nocookie)?.com\/([a-zA-Z0-9\/\-_])+/i)[0],
                u = p.match(/\/([ev]|embed)\/([a-zA-Z0-9\/\-_]+)/),
                g = Math.floor(.75 * a),
                m = Math.floor(.5625 * a);
            e.getJSON("http://gdata.youtube.com/feeds/api/videos/" + u[2] + "?v=2&alt=json-in-script&callback=?", function (e) {
                if (null != e.entry.media$group.yt$aspectRatio) var t = m;
                else var t = g;
                o.html('<iframe src="' + d.attr("src") + '&theme=light" width="' + a + '" height="' + t + '" frameborder="0" allowfullscreen></iframe>')
            })
        } else if (h) o.html('<iframe src="' + d.attr("src") + "?title=0&byline=0&portrait=0&color=" + themeColor.replace("#", "") + '" width="' + a + '" height="' + n(d, "attr") + '" frameborder="0"></iframe>');
        else if (f) {
            var v = o.find(".tumblr_video_container"),
                b = n(d, "attr");
            v.css({
                width: a,
                height: b
            }), d.css({
                width: a,
                height: b
            }), o.css({
                zIndex: 500
            })
        } else if (d.length > 0) {
            var b = n(d, "attr");
            d.attr("width", a).attr("height", b).css("width", a).css("height", b)
        } else if (s.length > 0) {
            var b = n(s, "css");
            s.attr("wmode", "opaque").wrap("<div></div>"), s.css("width", a).css("height", b), s.parent().css("width", a).css("height", b), s.parent().parent().is("object") && s.parent().parent().css("width", a).css("height", b)
        } else if (r.length > 0 && r.not(":has(embed)"))
            if (e.support.htmlSerialize) {
                var b = n(r, "attr");
                r.css("width", a).css("height", b).attr("width", a).attr("height", b)
            } else {
                r.replaceWith(r.attr("altHtml"));
                var s = o.find("embed"),
                    b = n(s, "css");
                s.css("width", a).css("height", b), s.attr("wmode", "opaque")
            }
        o.removeClass("loading")
    }

    function o() {
        var t = 300,
            i = e("ol.notes"),
            n = e("#notes-toggle");
        n.toggle(function () {
            i.slideUp(1.5 * t), e(this).removeClass("up"), e(this).find(".label").text("Show")
        }, function () {
            i.slideDown(1.5 * t), e(this).addClass("up"), e(this).find(".label").text("Hide")
        }), collapseNotes && -1 == window.location.href.indexOf("#notes") && n.click(), e("#content").find(".meta-list").find("li.notes a").click(function (t) {
            t.preventDefault(), e("#notes").find("ol.notes").is(":not(:visible)") && n.click()
        })
    }

    function s() {
        var t = e("#followed"),
            i = t.find("#followed-list"),
            n = i.children("li").size();
        if (t.find("h2").append(" <span>(" + n + ")</span>"), 5 * followedRows >= n) return !0;
        var a = t.find("#followed-wrap"),
            o = followedRows * i.find("li").eq(0).outerHeight(!0),
            s = a.outerHeight(!0);
        a.css("height", o + "px"), e("<a>", {
            "class": "show-more-followed",
            href: "#",
            html: "Show All &darr;"
        }).appendTo(t).toggle(function () {
            a.css({
                height: s + "px"
            }), e(this).html("Show Less &uarr;")
        }, function () {
            a.css({
                height: o + "px"
            }), e(this).html("Show All &darr;")
        })
    }

    function r() {
        var t = "?",
            i = e("li.comments a");
        i.each(function (i) {
            e(this).attr("href").indexOf("#disqus_thread") >= 0 && (t += "url" + i + "=" + encodeURIComponent(this.href) + "&")
        }), e.getScript("http://disqus.com/forums/" + disqusShortname + "/get_num_replies.js" + t, function () {
            i.each(function () {
                e(this).prepend('<span class="icon"></span>').parent().removeClass("hidden")
            })
        })
    }

    function d() {
        twitterJSLoading = !0, e.ajax({
            url: "http://platform.twitter.com/widgets.js",
            dataType: "script",
            cache: !0,
            success: function () {
                twitterJSLoading = !1
            }
        })
    }

    function c() {
        numTweets = numTweets > 4 ? 4 : numTweets, e("#twitter .loading-text").replaceWith('<ul class="tweets" />');
        var t = window.tweet_data.slice(0, numTweets),
            i = e(".tweets");
        if (showTwitterProfile) {
            var n = t[0].user,
                a = n.description,
                o = '<div class="profile"><h3><a href="http://www.twitter.com/' + twitterUsername + '">@' + twitterUsername + '</a><br/> <span class="name">' + n.name + "</span></h3>";
            o += a ? '<p class="bio">' + a + "</p></div>" : ""
        }
        e("#twitter .tweets").before(o), e.each(t, function () {
            var e = this.id_str,
                t = linkifyTweet(this.text),
                n = relative_time(this.created_at);
            this.user.profile_image_url;
            var a = "http://twitter.com/" + twitterUsername + "/status/" + e,
                o = '<li><p class="tweet">' + t + ' <span class="tweet-meta"><a class="timestamp" href="' + a + '" time="' + this.created_at + '" target="_blank">' + n + '</a> • <a class="reply" href="https://twitter.com/intent/tweet?in_reply_to=' + e + '">Reply</a></span></p></li>';
            i.append(o)
        })
    }

    function l() {
        instaCount = instaCount > 4 ? 4 : instaCount, e.ajax({
            type: "GET",
            dataType: "jsonp",
            cache: !1,
            timeout: 5e3,
            url: "https://api.instagram.com/v1/users/self/media/recent?access_token=" + accessToken + "&count=" + instaCount,
            success: function (t) {
                "OAuthAccessTokenException" == t.meta.error_type && e("#instagram .loading-text").html("Error fetching photos, incorrect access token used."), e("#instagram").append('<div id="instagram-photos" />');
                var n = e("#instagram-photos"),
                    a = t.data;
                for (i = 0; 4 > i; i++)
                    if (void 0 !== a[i]) {
                        var o, s = a[i],
                            r = s.images.low_resolution.url,
                            d = s.id,
                            c = s.link,
                            l = s.likes.count,
                            h = s.comments.count;
                        o = null != s.caption ? '<p class="caption">' + s.caption.text + "</p>" : "";
                        var f;
                        f = 1 == l ? l + " like" : l + " likes";
                        var p;
                        p = 1 == h ? h + " comment" : h + " comments";
                        var u = '<img src="' + r + '" />',
                            g = '<div class="instagram-photo ' + d + '">' + u + "<aside>" + o + '<p><span class="insta-likes">' + f + '</span> • <span class="insta-comments">' + p + "</span></p></aside></div>";
                        n.append(g), null != c && (c = '<a href="' + c + '" />', e("." + d).find(".insta-likes").wrapInner(c), e("." + d).find(".insta-comments").wrapInner(c), e("." + d).find("> img").wrap(c))
                    }
                e("#instagram-photos").imagesLoaded(function () {
                    e("#instagram .loading-text").remove(), e(".instagram-photo").each(function () {
                        e(this).animate({
                            opacity: 1
                        })
                    })
                })
            },
            error: function () {
                e("#instagram-photos").append("<p>Instagram&rsquo;s API service is experiencing some technical difficulties. Please try again later.</p>").css("background", "none"), e(".more-instagram").html("").css("background", "none")
            }
        })
    }
    e(document).ready(function () {
        function i() {
            var t = e("body").scrollTop() ? e("body").scrollTop() : e("html").scrollTop();
            t > 500 ? e("#back-to-top").addClass("snippet") : e("#back-to-top").removeClass("snippet")
        }
        t();
        var n = e("#header");
        if (isMobile && (fixedBar = !1), fixedBar) {
            var a = !1,
                d = !1,
                h = 750,
                f = !1,
                p = !0,
                u = e(window).scrollTop();
            u > h && (f = !0, p = !1, n.removeClass("pinned").addClass("fixed").css({
                top: "0px"
            }).find(".shadow").show())
        }
        if (showFollowing && s(), showTweets && "" !== twitterUsername && c(), showInstagram && "" !== accessToken && l(), isPermalink && o(), disqusEnabled && r(), "" !== searchValue && e("#search-form").find("input").val(searchValue).focus(function () {
            e(this).val() == searchValue && e(this).val("")
        }).blur(function () {
            "" == e(this).val() && e(this).val(searchValue)
        }), e("article .toggle").live("click", function () {
            function t(e) {
                var t = r + e;
                s.attr("href", t), s.addClass("appended")
            }

            function i() {
                s.addClass("disabled").attr("href", "javascript:void(0)")
            }
            var n = e(this),
                a = n.next(".widget");
            n.hasClass("open") ? (n.removeClass("open").html("Share"), a.animate({
                opacity: 0,
                top: -5
            }, 200, "easeOutQuart", function () {
                e(this).removeClass("open").css({
                    display: "none"
                })
            })) : (e("article .toggle.open").removeClass("open").next(".widget").animate({
                opacity: 0,
                top: -5
            }, 200, "easeOutQuart", function () {
                e(this).removeClass("open").css({
                    display: "none"
                })
            }), n.addClass("open").html("Close"), a.css("display", "block").animate({
                opacity: 1,
                top: 30
            }, 200, "easeOutQuart", function () {
                e(this).addClass("open")
            }));
            var o = e(this).parents("article"),
                s = o.find(".share-pinterest"),
                r = o.find(".share-pinterest").attr("href"),
                d = "";
            if (!s.hasClass("appended"))
                if (o.hasClass("type-photo")) d = o.find(".photo-panel img").attr("src"), t(d);
                else if (o.hasClass("type-photoset")) d = o.find(".photo:first img").attr("src"), t(d);
            else if (o.hasClass("type-text") || o.hasClass("type-chat") || o.hasClass("type-quote") || o.hasClass("type-ask")) d = o.find(":not(#comments) img:first"), d.parents("#comments") || void 0 === d ? i() : (d = d.attr("src"), t(d));
            else if (o.hasClass("type-video")) {
                var c = o.find(".video iframe").attr("src");
                if (-1 != c.indexOf("youtu")) {
                    var l = c.match(/embed\/([a-zA-Z0-9]*)\?/);
                    null != l && (d = "http://img.youtube.com/vi/" + l[1] + "/maxresdefault.jpg", t(d))
                } else if (-1 != c.indexOf("vimeo")) {
                    var h = c.match(/video\/([a-zA-Z0-9]*)/);
                    e.ajax({
                        type: "GET",
                        url: "http://vimeo.com/api/v2/video/" + h[1] + ".json",
                        jsonp: "callback",
                        dataType: "jsonp",
                        success: function (e) {
                            var i = e[0].thumbnail_large;
                            d = i, t(d)
                        }
                    })
                }
            } else o.hasClass("type-audio") && (o.find(".album").length > 0 ? (d = o.find(".album").css("background-image").replace(/"/g, "").replace(/url\(|\)$/gi, ""), t(d)) : i())
        }), e("html").live("click", function (t) {
            e(t.target).parents(".share").get(0) || e(".widget").each(function () {
                e(this).hasClass("open") && (e(this).prev(".toggle").removeClass("open").html("Share"), e(this).animate({
                    opacity: 0,
                    top: -5
                }, 200, "easeOutQuart", function () {
                    e(this).removeClass("open").css({
                        display: "none"
                    })
                }))
            })
        }), e(".short-link input").live("click", function () {
            e(this).focus().select()
        }), e(".photo-panel").live("mouseenter", function () {
            e(this).find(".photo-btns").stop(!0, !0).fadeIn(150)
        }).live("mouseleave", function () {
            e(this).find(".photo-btns").stop(!0, !0).fadeOut(150)
        }), e(".type-photoset").find(".photo-panel").find("a.lightbox").live("click", function () {
            return e(this).parent().prev("a:has(img)").click(), !1
        }), e(window).scroll(function () {
            fixedBar && (u = e(window).scrollTop(), u > h ? f || (d !== !1 && (clearTimeout(d), clearTimeout(a)), f = !0, p = !1, d = setTimeout(function () {
                n.stop(!0, !0).removeClass("pinned").addClass("fixed").css({
                    top: "-50px"
                }).animate({
                    top: "0px"
                }, 300).find(".shadow").show()
            }, 100)) : h > u && (p || (a !== !1 && (clearTimeout(d), clearTimeout(a)), f = !1, p = !0, a = setTimeout(function () {
                n.stop(!0, !0).animate({
                    top: "-60px"
                }, 300, function () {
                    e(this).hide().css({
                        top: "30px"
                    }).find(".shadow").hide().end().removeClass("fixed").addClass("pinned").fadeIn("fast")
                })
            }, 100))))
        }), e("#tabs .tab:first").css({
            left: 0,
            opacity: 1
        }).addClass("active"), e("#tabs #tabs-nav span:first").addClass("active"), e("#tabs-nav span").click(function () {
            var t = e("#tabs-nav span.active"),
                i = e(".tab.active"),
                n = e(this),
                a = n.attr("id").replace("tab-", ""),
                o = e("#tabs #" + a);
            n.hasClass("active") || (isMobile ? i.animate({
                opacity: 0
            }, 200, function () {
                i.removeClass("active"), t.removeClass("active"), o.addClass("active").css({
                    left: 0
                }).animate({
                    opacity: 1
                }, 200), n.addClass("active")
            }) : i.animate({
                left: 200,
                opacity: 0
            }, 200, function () {
                i.removeClass("active"), t.removeClass("active"), o.addClass("active").animate({
                    left: 0,
                    opacity: 1
                }, 200), n.addClass("active")
            }))
        }), 1 == e("#tabs .tab").length) {
            e("#tabs #tabs-nav h2").prependTo(e(".tab")), e("#tabs #tabs-nav").remove(), e("#tabs .tab").addClass("ruled-top");
            var g = e("#tabs").contents();
            e("#tabs").replaceWith(g)
        }
        0 == showInstagram && "" == showTweets && e("#tabs").remove(), (window.location.href.indexOf("/page/") > -1 || isMobile) && (infiniteScroll = !1, e("body").removeClass("infscroll")), infiniteScroll && !isPermalink && e("#content").infinitescroll({
            navSelector: "#pagination",
            nextSelector: "#pagination a.next",
            itemSelector: ".post",
            loadingImg: "http://static.tumblr.com/xgwqnql/iLQleupcf/infscroll_loader.gif",
            loadingText: "",
            donetext: "No more posts to load."
        }, function (i, n) {
            e(i).eq(0).before('<div class="page-sep">Page ' + n + "</div>"), t(e(i), !0), disqusEnabled && r()
        }), e(document).scroll(function () {
            i()
        }), e("#back-to-top").click(function () {
            e("body, html").animate({
                scrollTop: 0
            })
        }), isMobile && e("#back-to-top").remove(), e("body").hasClass("hide-sidebar") && e("#sidebar").remove(), e("#group-members li span, #followed li span").each(function () {
            var t = e(this),
                i = t.innerWidth();
            t.css({
                marginLeft: -(i / 2),
                display: "none"
            })
        }), e("#group-members li, #followed li").hover(function () {
            e(this);
            var t = e(this).find("span");
            1 == Modernizr.mq("only screen and (-webkit-min-device-pixel-ratio: 2)") ? t.stop().css("display", "block").animate({
                opacity: 1,
                bottom: 60
            }, 200) : t.stop().css("display", "block").animate({
                opacity: 1,
                bottom: 39
            }, 200)
        }, function () {
            e(this);
            var t = e(this).find("span");
            1 == Modernizr.mq("only screen and (-webkit-min-device-pixel-ratio: 2)") ? t.stop().fadeOut(100, function () {
                t.css({
                    bottom: 50,
                    opacity: 0
                })
            }) : t.stop().fadeOut(100, function () {
                t.css({
                    bottom: 29,
                    opacity: 0
                })
            })
        }), 1 == Modernizr.mq("only screen and (min-device-width : 768px) and (max-device-width : 1024px)") && e("#footer #likes .like_post").eq(4).remove(), 1 == Modernizr.mq("only screen and (-webkit-min-device-pixel-ratio: 2)") && e("#group-members li a img, #followed li a img").each(function () {
            var t = e(this).attr("src"),
                i = t.replace("_24", "_64");
            e(this).attr("src", i)
        })
    }), e.preloadImages = function () {
        for (var e = 0; e < arguments.length; e++) img = new Image, img.src = arguments[e]
    }, e.preloadImages("http://static.tumblr.com/xgwqnql/fMLlbpj9t/header_shadow.png", "http://static.tumblr.com/njty47g/Omoleufdi/topbar_bg.png", "http://static.tumblr.com/njty47g/x1Ild1iih/photo_btns_med.png")
}(window.jQuery), window.log = function () {
    log.history = log.history || [], log.history.push(arguments), this.console && console.log(Array.prototype.slice.call(arguments))
};