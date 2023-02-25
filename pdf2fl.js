(function (bt, aT) {
    document.addEventListener("keydown", keyDownTextField, false);
    
    function keyDownTextField(e) {
        const number = parseInt(document.location.href.substring(document.location.href.lastIndexOf('/') + 1).replace(/\.[^/.]+$/, "").substring(8), 10);
        var keyCode = e.keyCode;
        if(keyCode==37) {
            document.location.href = `/OPS/pageNum-${number - 1}.xhtml`;
        }
        if(keyCode==39) {
            document.location.href = `/OPS/pageNum-${number + 1}.xhtml`;
        }
    }
    
    swiswipedetect(document, function(swipedir){
    
    if (swipedir =='left')
        keyDownTextField({keyCode: 39})
    
    if (swipedir =='right')
        keyDownTextField({keyCode: 37})
    })
    
    function swipedetect(el, callback){

    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}

    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)

    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)

    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface

        elapsedTime = new Date().getTime() - startTime // get time elapsed

        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }

        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}

    var bc = {version: "3.0.3"};
    var bi = navigator.userAgent.toLowerCase();
    if (bi.indexOf("windows") > -1 || bi.indexOf("win32") > -1) {
        bc.isWindows = true
    } else {
        if (bi.indexOf("macintosh") > -1 || bi.indexOf("mac os x") > -1) {
            bc.isMac = true
        } else {
            if (bi.indexOf("linux") > -1) {
                bc.isLinux = true
            }
        }
    }
    bc.isIE = bi.indexOf("msie") > -1;
    bc.isIE6 = bi.indexOf("msie 6") > -1;
    bc.isIE7 = bi.indexOf("msie 7") > -1;
    bc.isGecko = bi.indexOf("gecko") > -1 && bi.indexOf("safari") == -1;
    bc.isWebKit = bi.indexOf("applewebkit/") > -1;
    var bP = /#(.+)$/, bL = /^(light|shadow)box\[(.*?)\]/i, bY = /\s*([a-z_]*?)\s*=\s*(.+)\s*/, aY = /[0-9a-z]+$/i,
        bT = /(.+\/)shadowbox\.js/i;
    var by = false, a3 = false, aS = {}, bz = 0, bb, bB;
    bc.current = -1;
    bc.dimensions = null;
    bc.ease = function (a) {
        return 1 + Math.pow(a - 1, 3)
    };
    bc.errorInfo = {
        fla: {name: "Flash", url: "http://www.adobe.com/products/flashplayer/"},
        qt: {name: "QuickTime", url: "http://www.apple.com/quicktime/download/"},
        wmp: {name: "Windows Media Player", url: "http://www.microsoft.com/windows/windowsmedia/"},
        f4m: {name: "Flip4Mac", url: "http://www.flip4mac.com/wmv_download.htm"}
    };
    bc.gallery = [];
    bc.onReady = bH;
    bc.path = null;
    bc.player = null;
    bc.playerId = "sb-player";
    bc.options = {
        animate: true,
        animateFade: true,
        autoplayMovies: true,
        continuous: false,
        enableKeys: true,
        flashParams: {bgcolor: "#000000", allowfullscreen: true},
        flashVars: {},
        flashVersion: "9.0.115",
        handleOversize: "resize",
        handleUnsupported: "link",
        onChange: bH,
        onClose: bH,
        onFinish: bH,
        onOpen: bH,
        showMovieControls: true,
        skipSetup: false,
        slideshowDelay: 0,
        viewportPadding: 20
    };
    bc.getCurrent = function () {
        return bc.current > -1 ? bc.gallery[bc.current] : null
    };
    bc.hasNext = function () {
        return bc.gallery.length > 1 && (bc.current != bc.gallery.length - 1 || bc.options.continuous)
    };
    bc.isOpen = function () {
        return by
    };
    bc.isPaused = function () {
        return bB == "pause"
    };
    bc.applyOptions = function (a) {
        aS = bV({}, bc.options);
        bV(bc.options, a)
    };
    bc.revertOptions = function () {
        bV(bc.options, aS)
    };
    bc.init = function (a, f) {
        if (a3) {
            return
        }
        a3 = true;
        if (bc.skin.options) {
            bV(bc.options, bc.skin.options)
        }
        if (a) {
            bV(bc.options, a)
        }
        if (!bc.path) {
            var g, d = document.getElementsByTagName("script");
            for (var h = 0, c = d.length; h < c; ++h) {
                g = bT.exec(d[h].src);
                if (g) {
                    bc.path = g[1];
                    break
                }
            }
        }
        if (f) {
            bc.onReady = f
        }
        bd()
    };
    bc.open = function (c) {
        if (by) {
            return
        }
        var a = bc.makeGallery(c);
        bc.gallery = a[0];
        bc.current = a[1];
        c = bc.getCurrent();
        if (c == null) {
            return
        }
        bc.applyOptions(c.options || {});
        bm();
        if (bc.gallery.length) {
            c = bc.getCurrent();
            if (bc.options.onOpen(c) === false) {
                return
            }
            by = true;
            bc.skin.onOpen(c, a1)
        }
    };
    bc.close = function () {
        if (!by) {
            return
        }
        by = false;
        if (bc.player) {
            bc.player.remove();
            bc.player = null
        }
        if (typeof bB == "number") {
            clearTimeout(bB);
            bB = null
        }
        bz = 0;
        bA(false);
        bc.options.onClose(bc.getCurrent());
        bc.skin.onClose();
        bc.revertOptions()
    };
    bc.play = function () {
        if (!bc.hasNext()) {
            return
        }
        if (!bz) {
            bz = bc.options.slideshowDelay * 1000
        }
        if (bz) {
            bb = bp();
            bB = setTimeout(function () {
                bz = bb = 0;
                bc.next()
            }, bz);
            if (bc.skin.onPlay) {
                bc.skin.onPlay()
            }
        }
    };
    bc.pause = function () {
        if (typeof bB != "number") {
            return
        }
        bz = Math.max(0, bz - (bp() - bb));
        if (bz) {
            clearTimeout(bB);
            bB = "pause";
            if (bc.skin.onPause) {
                bc.skin.onPause()
            }
        }
    };
    bc.change = function (a) {
        if (!(a in bc.gallery)) {
            if (bc.options.continuous) {
                a = (a < 0 ? bc.gallery.length + a : 0);
                if (!(a in bc.gallery)) {
                    return
                }
            } else {
                return
            }
        }
        bc.current = a;
        if (typeof bB == "number") {
            clearTimeout(bB);
            bB = null;
            bz = bb = 0
        }
        bc.options.onChange(bc.getCurrent());
        a1(true)
    };
    bc.next = function () {
        bc.change(bc.current + 1)
    };
    bc.previous = function () {
        bc.change(bc.current - 1)
    };
    bc.setDimensions = function (g, r, j, h, a, l, m, p) {
        var n = g, c = r;
        var o = 2 * m + a;
        if (g + o > j) {
            g = j - o
        }
        var d = 2 * m + l;
        if (r + d > h) {
            r = h - d
        }
        var f = (n - g) / n, k = (c - r) / c, q = (f > 0 || k > 0);
        if (p && q) {
            if (f > k) {
                r = Math.round((c / n) * g)
            } else {
                if (k > f) {
                    g = Math.round((n / c) * r)
                }
            }
        }
        bc.dimensions = {
            height: g + a,
            width: r + l,
            innerHeight: g,
            innerWidth: r,
            top: Math.floor((j - (g + o)) / 2 + m),
            left: Math.floor((h - (r + d)) / 2 + m),
            oversized: q
        };
        return bc.dimensions
    };
    bc.makeGallery = function (g) {
        var c = [], h = -1;
        if (typeof g == "string") {
            g = [g]
        }
        if (typeof g.length == "number") {
            bS(g, function (k, j) {
                if (j.content) {
                    c[k] = j
                } else {
                    c[k] = {content: j}
                }
            });
            h = 0
        } else {
            if (g.tagName) {
                var d = bc.getCache(g);
                g = d ? d : bc.makeObject(g)
            }
            if (g.gallery) {
                c = [];
                var f;
                for (var a in bc.cache) {
                    f = bc.cache[a];
                    if (f.gallery && f.gallery == g.gallery) {
                        if (h == -1 && f.content == g.content) {
                            h = c.length
                        }
                        c.push(f)
                    }
                }
                if (h == -1) {
                    c.unshift(g);
                    h = 0
                }
            } else {
                c = [g];
                h = 0
            }
        }
        bS(c, function (k, j) {
            c[k] = bV({}, j)
        });
        return [c, h]
    };
    bc.makeObject = function (g, a) {
        var f = {content: g.href, title: g.getAttribute("title") || "", link: g};
        if (a) {
            a = bV({}, a);
            bS(["player", "title", "height", "width", "gallery"], function (j, h) {
                if (typeof a[h] != "undefined") {
                    f[h] = a[h];
                    delete a[h]
                }
            });
            f.options = a
        } else {
            f.options = {}
        }
        if (!f.player) {
            f.player = bc.getPlayer(f.content)
        }
        var c = g.getAttribute("rel");
        if (c) {
            var d = c.match(bL);
            if (d) {
                f.gallery = escape(d[2])
            }
            bS(c.split(";"), function (j, h) {
                d = h.match(bY);
                if (d) {
                    f[d[1]] = d[2]
                }
            })
        }
        return f
    };
    bc.getPlayer = function (a) {
        if (a.indexOf("#") > -1 && a.indexOf(document.location.href) == 0) {
            return "inline"
        }
        var f = a.indexOf("?");
        if (f > -1) {
            a = a.substring(0, f)
        }
        var d, c = a.match(aY);
        if (c) {
            d = c[0].toLowerCase()
        }
        if (d) {
            if (bc.img && bc.img.ext.indexOf(d) > -1) {
                return "img"
            }
            if (bc.swf && bc.swf.ext.indexOf(d) > -1) {
                return "swf"
            }
            if (bc.flv && bc.flv.ext.indexOf(d) > -1) {
                return "flv"
            }
            if (bc.qt && bc.qt.ext.indexOf(d) > -1) {
                if (bc.wmp && bc.wmp.ext.indexOf(d) > -1) {
                    return "qtwmp"
                } else {
                    return "qt"
                }
            }
            if (bc.wmp && bc.wmp.ext.indexOf(d) > -1) {
                return "wmp"
            }
        }
        return "iframe"
    };

    function bm() {
        var c = bc.errorInfo, a = bc.plugins, m, l, h, d, j, f, k, g;
        for (var n = 0; n < bc.gallery.length; ++n) {
            m = bc.gallery[n];
            l = false;
            h = null;
            switch (m.player) {
                case"flv":
                case"swf":
                    if (!a.fla) {
                        h = "fla"
                    }
                    break;
                case"qt":
                    if (!a.qt) {
                        h = "qt"
                    }
                    break;
                case"wmp":
                    if (bc.isMac) {
                        if (a.qt && a.f4m) {
                            m.player = "qt"
                        } else {
                            h = "qtf4m"
                        }
                    } else {
                        if (!a.wmp) {
                            h = "wmp"
                        }
                    }
                    break;
                case"qtwmp":
                    if (a.qt) {
                        m.player = "qt"
                    } else {
                        if (a.wmp) {
                            m.player = "wmp"
                        } else {
                            h = "qtwmp"
                        }
                    }
                    break
            }
            if (h) {
                if (bc.options.handleUnsupported == "link") {
                    switch (h) {
                        case"qtf4m":
                            j = "shared";
                            f = [c.qt.url, c.qt.name, c.f4m.url, c.f4m.name];
                            break;
                        case"qtwmp":
                            j = "either";
                            f = [c.qt.url, c.qt.name, c.wmp.url, c.wmp.name];
                            break;
                        default:
                            j = "single";
                            f = [c[h].url, c[h].name]
                    }
                    m.player = "html";
                    m.content = '<div class="sb-message">' + aL(bc.lang.errors[j], f) + "</div>"
                } else {
                    l = true
                }
            } else {
                if (m.player == "inline") {
                    d = bP.exec(m.content);
                    if (d) {
                        k = bN(d[1]);
                        if (k) {
                            m.content = k.innerHTML
                        } else {
                            l = true
                        }
                    } else {
                        l = true
                    }
                } else {
                    if (m.player == "swf" || m.player == "flv") {
                        g = (m.options && m.options.flashVersion) || bc.options.flashVersion;
                        if (bc.flash && !bc.flash.hasFlashPlayerVersion(g)) {
                            m.width = 310;
                            m.height = 177
                        }
                    }
                }
            }
            if (l) {
                bc.gallery.splice(n, 1);
                if (n < bc.current) {
                    --bc.current
                } else {
                    if (n == bc.current) {
                        bc.current = n > 0 ? n - 1 : n
                    }
                }
                --n
            }
        }
    }

    function bA(a) {
        if (!bc.options.enableKeys) {
            return
        }
        (a ? bo : bg)(document, "keydown", bD)
    }

    function bD(a) {
        if (a.metaKey || a.shiftKey || a.altKey || a.ctrlKey) {
            return
        }
        var d = aI(a), c;
        switch (d) {
            case 81:
            case 88:
            case 27:
                c = bc.close;
                break;
            case 37:
                c = bc.previous;
                break;
            case 39:
                c = bc.next;
                break;
            case 32:
                c = typeof bB == "number" ? bc.pause : bc.play;
                break
        }
        if (c) {
            aQ(a);
            c()
        }
    }

    function a1(f) {
        bA(false);
        var g = bc.getCurrent();
        var a = (g.player == "inline" ? "html" : g.player);
        if (typeof bc[a] != "function") {
            throw"unknown player " + a
        }
        if (f) {
            bc.player.remove();
            bc.revertOptions();
            bc.applyOptions(g.options || {})
        }
        bc.player = new bc[a](g, bc.playerId);
        if (bc.gallery.length > 1) {
            var j = bc.gallery[bc.current + 1] || bc.gallery[0];
            if (j.player == "img") {
                var d = new Image();
                d.src = j.content
            }
            var h = bc.gallery[bc.current - 1] || bc.gallery[bc.gallery.length - 1];
            if (h.player == "img") {
                var c = new Image();
                c.src = h.content
            }
        }
        bc.skin.onLoad(f, a7)
    }

    function a7() {
        if (!by) {
            return
        }
        if (typeof bc.player.ready != "undefined") {
            var a = setInterval(function () {
                if (by) {
                    if (bc.player.ready) {
                        clearInterval(a);
                        a = null;
                        bc.skin.onReady(aZ)
                    }
                } else {
                    clearInterval(a);
                    a = null
                }
            }, 10)
        } else {
            bc.skin.onReady(aZ)
        }
    }

    function aZ() {
        if (!by) {
            return
        }
        bc.player.append(bc.skin.body, bc.dimensions);
        bc.skin.onShow(bj)
    }

    function bj() {
        if (!by) {
            return
        }
        if (bc.player.onLoad) {
            bc.player.onLoad()
        }
        bc.options.onFinish(bc.getCurrent());
        if (!bc.isPaused()) {
            bc.play()
        }
        bA(true)
    }

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (d, a) {
            var c = this.length >>> 0;
            a = a || 0;
            if (a < 0) {
                a += c
            }
            for (; a < c; ++a) {
                if (a in this && this[a] === d) {
                    return a
                }
            }
            return -1
        }
    }

    function bp() {
        return (new Date).getTime()
    }

    function bV(c, a) {
        for (var d in a) {
            c[d] = a[d]
        }
        return c
    }

    function bS(g, f) {
        var d = 0, c = g.length;
        for (var a = g[0]; d < c && f.call(a, d, a) !== false; a = g[++d]) {
        }
    }

    function aL(c, a) {
        return c.replace(/\{(\w+?)\}/g, function (d, f) {
            return a[f]
        })
    }

    function bH() {
    }

    function bN(a) {
        return document.getElementById(a)
    }

    function bu(a) {
        a.parentNode.removeChild(a)
    }

    var aW = true, S = true;

    function a0() {
        var a = document.body, c = document.createElement("div");
        aW = typeof c.style.opacity === "string";
        c.style.position = "fixed";
        c.style.margin = 0;
        c.style.top = "20px";
        a.appendChild(c, a.firstChild);
        S = c.offsetTop == 20;
        a.removeChild(c)
    }

    bc.getStyle = (function () {
        var a = /opacity=([^)]*)/, c = document.defaultView && document.defaultView.getComputedStyle;
        return function (f, g) {
            var h;
            if (!aW && g == "opacity" && f.currentStyle) {
                h = a.test(f.currentStyle.filter || "") ? (parseFloat(RegExp.$1) / 100) + "" : "";
                return h === "" ? "1" : h
            }
            if (c) {
                var d = c(f, null);
                if (d) {
                    h = d[g]
                }
                if (g == "opacity" && h == "") {
                    h = "1"
                }
            } else {
                h = f.currentStyle[g]
            }
            return h
        }
    })();
    bc.appendHTML = function (a, d) {
        if (a.insertAdjacentHTML) {
            a.insertAdjacentHTML("BeforeEnd", d)
        } else {
            if (a.lastChild) {
                var c = a.ownerDocument.createRange();
                c.setStartAfter(a.lastChild);
                var f = c.createContextualFragment(d);
                a.appendChild(f)
            } else {
                a.innerHTML = d
            }
        }
    };
    bc.getWindowSize = function (a) {
        if (document.compatMode === "CSS1Compat") {
            return document.documentElement["client" + a]
        }
        return document.body["client" + a]
    };
    bc.setOpacity = function (a, c) {
        var d = a.style;
        if (aW) {
            d.opacity = (c == 1 ? "" : c)
        } else {
            d.zoom = 1;
            if (c == 1) {
                if (typeof d.filter == "string" && (/alpha/i).test(d.filter)) {
                    d.filter = d.filter.replace(/\s*[\w\.]*alpha\([^\)]*\);?/gi, "")
                }
            } else {
                d.filter = (d.filter || "").replace(/\s*[\w\.]*alpha\([^\)]*\)/gi, "") + " alpha(opacity=" + (c * 100) + ")"
            }
        }
    };
    bc.clearOpacity = function (a) {
        bc.setOpacity(a, 1)
    };

    function aP(c) {
        var a = c.target ? c.target : c.srcElement;
        return a.nodeType == 3 ? a.parentNode : a
    }

    function a8(d) {
        var c = d.pageX || (d.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)),
            a = d.pageY || (d.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
        return [c, a]
    }

    function aQ(a) {
        a.preventDefault()
    }

    function aI(a) {
        return a.which ? a.which : a.keyCode
    }

    function bo(f, a, d) {
        if (f.addEventListener) {
            f.addEventListener(a, d, false)
        } else {
            if (f.nodeType === 3 || f.nodeType === 8) {
                return
            }
            if (f.setInterval && (f !== bt && !f.frameElement)) {
                f = bt
            }
            if (!d.__guid) {
                d.__guid = bo.guid++
            }
            if (!f.events) {
                f.events = {}
            }
            var c = f.events[a];
            if (!c) {
                c = f.events[a] = {};
                if (f["on" + a]) {
                    c[0] = f["on" + a]
                }
            }
            c[d.__guid] = d;
            f["on" + a] = bo.handleEvent
        }
    }

    bo.guid = 1;
    bo.handleEvent = function (f) {
        var c = true;
        f = f || bo.fixEvent(((this.ownerDocument || this.document || this).parentWindow || bt).event);
        var d = this.events[f.type];
        for (var a in d) {
            this.__handleEvent = d[a];
            if (this.__handleEvent(f) === false) {
                c = false
            }
        }
        return c
    };
    bo.preventDefault = function () {
        this.returnValue = false
    };
    bo.stopPropagation = function () {
        this.cancelBubble = true
    };
    bo.fixEvent = function (a) {
        a.preventDefault = bo.preventDefault;
        a.stopPropagation = bo.stopPropagation;
        return a
    };

    function bg(a, d, c) {
        if (a.removeEventListener) {
            a.removeEventListener(d, c, false)
        } else {
            if (a.events && a.events[d]) {
                delete a.events[d][c.__guid]
            }
        }
    }

    var K = false, bF;
    if (document.addEventListener) {
        bF = function () {
            document.removeEventListener("DOMContentLoaded", bF, false);
            bc.load()
        }
    } else {
        if (document.attachEvent) {
            bF = function () {
                if (document.readyState === "complete") {
                    document.detachEvent("onreadystatechange", bF);
                    bc.load()
                }
            }
        }
    }

    function aX() {
        if (K) {
            return
        }
        try {
            document.documentElement.doScroll("left")
        } catch (a) {
            setTimeout(aX, 1);
            return
        }
        bc.load()
    }

    function bd() {
        if (document.readyState === "complete") {
            return bc.load()
        }
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", bF, false);
            bt.addEventListener("load", bc.load, false)
        } else {
            if (document.attachEvent) {
                document.attachEvent("onreadystatechange", bF);
                bt.attachEvent("onload", bc.load);
                var a = false;
                try {
                    a = bt.frameElement === null
                } catch (c) {
                }
                if (document.documentElement.doScroll && a) {
                    aX()
                }
            }
        }
    }

    bc.load = function () {
        if (K) {
            return
        }
        if (!document.body) {
            return setTimeout(bc.load, 13)
        }
        K = true;
        a0();
        bc.onReady();
        if (!bc.options.skipSetup) {
            bc.setup()
        }
        bc.skin.init()
    };
    bc.plugins = {};
    if (navigator.plugins && navigator.plugins.length) {
        var aH = [];
        bS(navigator.plugins, function (a, c) {
            aH.push(c.name)
        });
        aH = aH.join(",");
        var bI = aH.indexOf("Flip4Mac") > -1;
        bc.plugins = {
            fla: aH.indexOf("Shockwave Flash") > -1,
            qt: aH.indexOf("QuickTime") > -1,
            wmp: !bI && aH.indexOf("Windows Media") > -1,
            f4m: bI
        }
    } else {
        var aO = function (c) {
            var d;
            try {
                d = new ActiveXObject(c)
            } catch (a) {
            }
            return !!d
        };
        bc.plugins = {
            fla: aO("ShockwaveFlash.ShockwaveFlash"),
            qt: aO("QuickTime.QuickTime"),
            wmp: aO("wmplayer.ocx"),
            f4m: false
        }
    }
    var a6 = /^(light|shadow)box/i, bE = "shadowboxCacheKey", a2 = 1;
    bc.cache = {};
    bc.select = function (d) {
        var a = [];
        if (!d) {
            var c;
            bS(document.getElementsByTagName("a"), function (j, h) {
                c = h.getAttribute("rel");
                if (c && a6.test(c)) {
                    a.push(h)
                }
            })
        } else {
            var f = d.length;
            if (f) {
                if (typeof d == "string") {
                    if (bc.find) {
                        a = bc.find(d)
                    }
                } else {
                    if (f == 2 && typeof d[0] == "string" && d[1].nodeType) {
                        if (bc.find) {
                            a = bc.find(d[0], d[1])
                        }
                    } else {
                        for (var g = 0; g < f; ++g) {
                            a[g] = d[g]
                        }
                    }
                }
            } else {
                a.push(d)
            }
        }
        return a
    };
    bc.setup = function (a, c) {
        bS(bc.select(a), function (d, f) {
            bc.addCache(f, c)
        })
    };
    bc.teardown = function (a) {
        bS(bc.select(a), function (d, c) {
            bc.removeCache(c)
        })
    };
    bc.addCache = function (a, c) {
        var d = a[bE];
        if (d == aT) {
            d = a2++;
            a[bE] = d;
            bo(a, "click", aJ)
        }
        bc.cache[d] = bc.makeObject(a, c)
    };
    bc.removeCache = function (a) {
        bg(a, "click", aJ);
        delete bc.cache[a[bE]];
        a[bE] = null
    };
    bc.getCache = function (c) {
        var a = c[bE];
        return (a in bc.cache && bc.cache[a])
    };
    bc.clearCache = function () {
        for (var a in bc.cache) {
            bc.removeCache(bc.cache[a].link)
        }
        bc.cache = {}
    };

    function aJ(a) {
        bc.open(this);
        if (bc.gallery.length) {
            aQ(a)
        }
    }

    bc.find = (function () {
        var k = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            j = 0, f = Object.prototype.toString, p = false, r = true;
        [0, 0].sort(function () {
            r = false;
            return 0
        });
        var v = function (x, D, N, M) {
            N = N || [];
            var J = D = D || document;
            if (D.nodeType !== 1 && D.nodeType !== 9) {
                return []
            }
            if (!x || typeof x !== "string") {
                return N
            }
            var w = [], B, H, E, C, y = true, A = u(D), L = x;
            while ((k.exec(""), B = k.exec(L)) !== null) {
                L = B[3];
                w.push(B[1]);
                if (B[2]) {
                    C = B[3];
                    break
                }
            }
            if (w.length > 1 && o.exec(x)) {
                if (w.length === 2 && n.relative[w[0]]) {
                    H = d(w[0] + w[1], D)
                } else {
                    H = n.relative[w[0]] ? [D] : v(w.shift(), D);
                    while (w.length) {
                        x = w.shift();
                        if (n.relative[x]) {
                            x += w.shift()
                        }
                        H = d(x, H)
                    }
                }
            } else {
                if (!M && w.length > 1 && D.nodeType === 9 && !A && n.match.ID.test(w[0]) && !n.match.ID.test(w[w.length - 1])) {
                    var I = v.find(w.shift(), D, A);
                    D = I.expr ? v.filter(I.expr, I.set)[0] : I.set[0]
                }
                if (D) {
                    var I = M ? {
                        expr: w.pop(),
                        set: l(M)
                    } : v.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && D.parentNode ? D.parentNode : D, A);
                    H = I.expr ? v.filter(I.expr, I.set) : I.set;
                    if (w.length > 0) {
                        E = l(H)
                    } else {
                        y = false
                    }
                    while (w.length) {
                        var F = w.pop(), G = F;
                        if (!n.relative[F]) {
                            F = ""
                        } else {
                            G = w.pop()
                        }
                        if (G == null) {
                            G = D
                        }
                        n.relative[F](E, G, A)
                    }
                } else {
                    E = w = []
                }
            }
            if (!E) {
                E = H
            }
            if (!E) {
                throw"Syntax error, unrecognized expression: " + (F || x)
            }
            if (f.call(E) === "[object Array]") {
                if (!y) {
                    N.push.apply(N, E)
                } else {
                    if (D && D.nodeType === 1) {
                        for (var O = 0; E[O] != null; O++) {
                            if (E[O] && (E[O] === true || E[O].nodeType === 1 && m(D, E[O]))) {
                                N.push(H[O])
                            }
                        }
                    } else {
                        for (var O = 0; E[O] != null; O++) {
                            if (E[O] && E[O].nodeType === 1) {
                                N.push(H[O])
                            }
                        }
                    }
                }
            } else {
                l(E, N)
            }
            if (C) {
                v(C, J, N, M);
                v.uniqueSort(N)
            }
            return N
        };
        v.uniqueSort = function (w) {
            if (h) {
                p = r;
                w.sort(h);
                if (p) {
                    for (var x = 1; x < w.length; x++) {
                        if (w[x] === w[x - 1]) {
                            w.splice(x--, 1)
                        }
                    }
                }
            }
            return w
        };
        v.matches = function (x, w) {
            return v(x, null, null, w)
        };
        v.find = function (F, D, E) {
            var w, y;
            if (!F) {
                return []
            }
            for (var A = 0, B = n.order.length; A < B; A++) {
                var x = n.order[A], y;
                if ((y = n.leftMatch[x].exec(F))) {
                    var C = y[1];
                    y.splice(1, 1);
                    if (C.substr(C.length - 1) !== "\\") {
                        y[1] = (y[1] || "").replace(/\\/g, "");
                        w = n.find[x](y, D, E);
                        if (w != null) {
                            F = F.replace(n.match[x], "");
                            break
                        }
                    }
                }
            }
            if (!w) {
                w = D.getElementsByTagName("*")
            }
            return {set: w, expr: F}
        };
        v.filter = function (J, L, G, A) {
            var B = J, E = [], N = L, x, D, w = L && L[0] && u(L[0]);
            while (J && L.length) {
                for (var M in n.filter) {
                    if ((x = n.match[M].exec(J)) != null) {
                        var C = n.filter[M], F, H;
                        D = false;
                        if (N === E) {
                            E = []
                        }
                        if (n.preFilter[M]) {
                            x = n.preFilter[M](x, N, G, E, A, w);
                            if (!x) {
                                D = F = true
                            } else {
                                if (x === true) {
                                    continue
                                }
                            }
                        }
                        if (x) {
                            for (var y = 0; (H = N[y]) != null; y++) {
                                if (H) {
                                    F = C(H, x, y, N);
                                    var I = A ^ !!F;
                                    if (G && F != null) {
                                        if (I) {
                                            D = true
                                        } else {
                                            N[y] = false
                                        }
                                    } else {
                                        if (I) {
                                            E.push(H);
                                            D = true
                                        }
                                    }
                                }
                            }
                        }
                        if (F !== aT) {
                            if (!G) {
                                N = E
                            }
                            J = J.replace(n.match[M], "");
                            if (!D) {
                                return []
                            }
                            break
                        }
                    }
                }
                if (J === B) {
                    if (D == null) {
                        throw"Syntax error, unrecognized expression: " + J
                    } else {
                        break
                    }
                }
                B = J
            }
            return N
        };
        var n = v.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {"class": "className", "for": "htmlFor"},
            attrHandle: {
                href: function (w) {
                    return w.getAttribute("href")
                }
            },
            relative: {
                "+": function (E, B) {
                    var y = typeof B === "string", w = y && !/\W/.test(B), D = y && !w;
                    if (w) {
                        B = B.toLowerCase()
                    }
                    for (var A = 0, C = E.length, x; A < C; A++) {
                        if ((x = E[A])) {
                            while ((x = x.previousSibling) && x.nodeType !== 1) {
                            }
                            E[A] = D || x && x.nodeName.toLowerCase() === B ? x || false : x === B
                        }
                    }
                    if (D) {
                        v.filter(B, E, true)
                    }
                }, ">": function (D, B) {
                    var x = typeof B === "string";
                    if (x && !/\W/.test(B)) {
                        B = B.toLowerCase();
                        for (var A = 0, C = D.length; A < C; A++) {
                            var w = D[A];
                            if (w) {
                                var y = w.parentNode;
                                D[A] = y.nodeName.toLowerCase() === B ? y : false
                            }
                        }
                    } else {
                        for (var A = 0, C = D.length; A < C; A++) {
                            var w = D[A];
                            if (w) {
                                D[A] = x ? w.parentNode : w.parentNode === B
                            }
                        }
                        if (x) {
                            v.filter(B, D, true)
                        }
                    }
                }, "": function (y, B, w) {
                    var A = j++, C = c;
                    if (typeof B === "string" && !/\W/.test(B)) {
                        var x = B = B.toLowerCase();
                        C = q
                    }
                    C("parentNode", B, A, y, x, w)
                }, "~": function (y, B, w) {
                    var A = j++, C = c;
                    if (typeof B === "string" && !/\W/.test(B)) {
                        var x = B = B.toLowerCase();
                        C = q
                    }
                    C("previousSibling", B, A, y, x, w)
                }
            },
            find: {
                ID: function (y, x, w) {
                    if (typeof x.getElementById !== "undefined" && !w) {
                        var A = x.getElementById(y[1]);
                        return A ? [A] : []
                    }
                }, NAME: function (A, w) {
                    if (typeof w.getElementsByName !== "undefined") {
                        var B = [], x = w.getElementsByName(A[1]);
                        for (var y = 0, C = x.length; y < C; y++) {
                            if (x[y].getAttribute("name") === A[1]) {
                                B.push(x[y])
                            }
                        }
                        return B.length === 0 ? null : B
                    }
                }, TAG: function (x, w) {
                    return w.getElementsByTagName(x[1])
                }
            },
            preFilter: {
                CLASS: function (y, B, A, C, E, D) {
                    y = " " + y[1].replace(/\\/g, "") + " ";
                    if (D) {
                        return y
                    }
                    for (var x = 0, w; (w = B[x]) != null; x++) {
                        if (w) {
                            if (E ^ (w.className && (" " + w.className + " ").replace(/[\t\n]/g, " ").indexOf(y) >= 0)) {
                                if (!A) {
                                    C.push(w)
                                }
                            } else {
                                if (A) {
                                    B[x] = false
                                }
                            }
                        }
                    }
                    return false
                }, ID: function (w) {
                    return w[1].replace(/\\/g, "")
                }, TAG: function (w, x) {
                    return w[1].toLowerCase()
                }, CHILD: function (x) {
                    if (x[1] === "nth") {
                        var w = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(x[2] === "even" && "2n" || x[2] === "odd" && "2n+1" || !/\D/.test(x[2]) && "0n+" + x[2] || x[2]);
                        x[2] = (w[1] + (w[2] || 1)) - 0;
                        x[3] = w[3] - 0
                    }
                    x[0] = j++;
                    return x
                }, ATTR: function (x, B, A, C, w, D) {
                    var y = x[1].replace(/\\/g, "");
                    if (!D && n.attrMap[y]) {
                        x[1] = n.attrMap[y]
                    }
                    if (x[2] === "~=") {
                        x[4] = " " + x[4] + " "
                    }
                    return x
                }, PSEUDO: function (x, B, A, C, w) {
                    if (x[1] === "not") {
                        if ((k.exec(x[3]) || "").length > 1 || /^\w/.test(x[3])) {
                            x[3] = v(x[3], null, null, B)
                        } else {
                            var y = v.filter(x[3], B, A, true ^ w);
                            if (!A) {
                                C.push.apply(C, y)
                            }
                            return false
                        }
                    } else {
                        if (n.match.POS.test(x[0]) || n.match.CHILD.test(x[0])) {
                            return true
                        }
                    }
                    return x
                }, POS: function (w) {
                    w.unshift(true);
                    return w
                }
            },
            filters: {
                enabled: function (w) {
                    return w.disabled === false && w.type !== "hidden"
                }, disabled: function (w) {
                    return w.disabled === true
                }, checked: function (w) {
                    return w.checked === true
                }, selected: function (w) {
                    w.parentNode.selectedIndex;
                    return w.selected === true
                }, parent: function (w) {
                    return !!w.firstChild
                }, empty: function (w) {
                    return !w.firstChild
                }, has: function (w, x, y) {
                    return !!v(y[3], w).length
                }, header: function (w) {
                    return /h\d/i.test(w.nodeName)
                }, text: function (w) {
                    return "text" === w.type
                }, radio: function (w) {
                    return "radio" === w.type
                }, checkbox: function (w) {
                    return "checkbox" === w.type
                }, file: function (w) {
                    return "file" === w.type
                }, password: function (w) {
                    return "password" === w.type
                }, submit: function (w) {
                    return "submit" === w.type
                }, image: function (w) {
                    return "image" === w.type
                }, reset: function (w) {
                    return "reset" === w.type
                }, button: function (w) {
                    return "button" === w.type || w.nodeName.toLowerCase() === "button"
                }, input: function (w) {
                    return /input|select|textarea|button/i.test(w.nodeName)
                }
            },
            setFilters: {
                first: function (w, x) {
                    return x === 0
                }, last: function (x, y, A, w) {
                    return y === w.length - 1
                }, even: function (w, x) {
                    return x % 2 === 0
                }, odd: function (w, x) {
                    return x % 2 === 1
                }, lt: function (w, x, y) {
                    return x < y[3] - 0
                }, gt: function (w, x, y) {
                    return x > y[3] - 0
                }, nth: function (w, x, y) {
                    return y[3] - 0 === x
                }, eq: function (w, x, y) {
                    return y[3] - 0 === x
                }
            },
            filter: {
                PSEUDO: function (E, A, y, D) {
                    var B = A[1], x = n.filters[B];
                    if (x) {
                        return x(E, y, A, D)
                    } else {
                        if (B === "contains") {
                            return (E.textContent || E.innerText || g([E]) || "").indexOf(A[3]) >= 0
                        } else {
                            if (B === "not") {
                                var w = A[3];
                                for (var y = 0, C = w.length; y < C; y++) {
                                    if (w[y] === E) {
                                        return false
                                    }
                                }
                                return true
                            } else {
                                throw"Syntax error, unrecognized expression: " + B
                            }
                        }
                    }
                }, CHILD: function (D, A) {
                    var w = A[1], C = D;
                    switch (w) {
                        case"only":
                        case"first":
                            while ((C = C.previousSibling)) {
                                if (C.nodeType === 1) {
                                    return false
                                }
                            }
                            if (w === "first") {
                                return true
                            }
                            C = D;
                        case"last":
                            while ((C = C.nextSibling)) {
                                if (C.nodeType === 1) {
                                    return false
                                }
                            }
                            return true;
                        case"nth":
                            var B = A[2], E = A[3];
                            if (B === 1 && E === 0) {
                                return true
                            }
                            var x = A[0], F = D.parentNode;
                            if (F && (F.sizcache !== x || !D.nodeIndex)) {
                                var y = 0;
                                for (C = F.firstChild; C; C = C.nextSibling) {
                                    if (C.nodeType === 1) {
                                        C.nodeIndex = ++y
                                    }
                                }
                                F.sizcache = x
                            }
                            var G = D.nodeIndex - E;
                            if (B === 0) {
                                return G === 0
                            } else {
                                return (G % B === 0 && G / B >= 0)
                            }
                    }
                }, ID: function (w, x) {
                    return w.nodeType === 1 && w.getAttribute("id") === x
                }, TAG: function (w, x) {
                    return (x === "*" && w.nodeType === 1) || w.nodeName.toLowerCase() === x
                }, CLASS: function (w, x) {
                    return (" " + (w.className || w.getAttribute("class")) + " ").indexOf(x) > -1
                }, ATTR: function (w, y) {
                    var A = y[1], C = n.attrHandle[A] ? n.attrHandle[A](w) : w[A] != null ? w[A] : w.getAttribute(A),
                        D = C + "", x = y[2], B = y[4];
                    return C == null ? x === "!=" : x === "=" ? D === B : x === "*=" ? D.indexOf(B) >= 0 : x === "~=" ? (" " + D + " ").indexOf(B) >= 0 : !B ? D && C !== false : x === "!=" ? D !== B : x === "^=" ? D.indexOf(B) === 0 : x === "$=" ? D.substr(D.length - B.length) === B : x === "|=" ? D === B || D.substr(0, B.length + 1) === B + "-" : false
                }, POS: function (x, B, A, w) {
                    var C = B[2], y = n.setFilters[C];
                    if (y) {
                        return y(x, A, B, w)
                    }
                }
            }
        };
        var o = n.match.POS;
        for (var t in n.match) {
            n.match[t] = new RegExp(n.match[t].source + /(?![^\[]*\])(?![^\(]*\))/.source);
            n.leftMatch[t] = new RegExp(/(^(?:.|\r|\n)*?)/.source + n.match[t].source)
        }
        var l = function (w, x) {
            w = Array.prototype.slice.call(w, 0);
            if (x) {
                x.push.apply(x, w);
                return x
            }
            return w
        };
        try {
            Array.prototype.slice.call(document.documentElement.childNodes, 0)
        } catch (a) {
            l = function (w, x) {
                var A = x || [];
                if (f.call(w) === "[object Array]") {
                    Array.prototype.push.apply(A, w)
                } else {
                    if (typeof w.length === "number") {
                        for (var y = 0, B = w.length; y < B; y++) {
                            A.push(w[y])
                        }
                    } else {
                        for (var y = 0; w[y]; y++) {
                            A.push(w[y])
                        }
                    }
                }
                return A
            }
        }
        var h;
        if (document.documentElement.compareDocumentPosition) {
            h = function (x, y) {
                if (!x.compareDocumentPosition || !y.compareDocumentPosition) {
                    if (x == y) {
                        p = true
                    }
                    return x.compareDocumentPosition ? -1 : 1
                }
                var w = x.compareDocumentPosition(y) & 4 ? -1 : x === y ? 0 : 1;
                if (w === 0) {
                    p = true
                }
                return w
            }
        } else {
            if ("sourceIndex" in document.documentElement) {
                h = function (x, y) {
                    if (!x.sourceIndex || !y.sourceIndex) {
                        if (x == y) {
                            p = true
                        }
                        return x.sourceIndex ? -1 : 1
                    }
                    var w = x.sourceIndex - y.sourceIndex;
                    if (w === 0) {
                        p = true
                    }
                    return w
                }
            } else {
                if (document.createRange) {
                    h = function (x, A) {
                        if (!x.ownerDocument || !A.ownerDocument) {
                            if (x == A) {
                                p = true
                            }
                            return x.ownerDocument ? -1 : 1
                        }
                        var y = x.ownerDocument.createRange(), B = A.ownerDocument.createRange();
                        y.setStart(x, 0);
                        y.setEnd(x, 0);
                        B.setStart(A, 0);
                        B.setEnd(A, 0);
                        var w = y.compareBoundaryPoints(Range.START_TO_END, B);
                        if (w === 0) {
                            p = true
                        }
                        return w
                    }
                }
            }
        }

        function g(A) {
            var y = "", w;
            for (var x = 0; A[x]; x++) {
                w = A[x];
                if (w.nodeType === 3 || w.nodeType === 4) {
                    y += w.nodeValue
                } else {
                    if (w.nodeType !== 8) {
                        y += g(w.childNodes)
                    }
                }
            }
            return y
        }

        (function () {
            var x = document.createElement("div"), w = "script" + (new Date).getTime();
            x.innerHTML = "<a name='" + w + "'/>";
            var y = document.documentElement;
            y.insertBefore(x, y.firstChild);
            if (document.getElementById(w)) {
                n.find.ID = function (B, A, D) {
                    if (typeof A.getElementById !== "undefined" && !D) {
                        var C = A.getElementById(B[1]);
                        return C ? C.id === B[1] || typeof C.getAttributeNode !== "undefined" && C.getAttributeNode("id").nodeValue === B[1] ? [C] : aT : []
                    }
                };
                n.filter.ID = function (A, C) {
                    var B = typeof A.getAttributeNode !== "undefined" && A.getAttributeNode("id");
                    return A.nodeType === 1 && B && B.nodeValue === C
                }
            }
            y.removeChild(x);
            y = x = null
        })();
        (function () {
            var w = document.createElement("div");
            w.appendChild(document.createComment(""));
            if (w.getElementsByTagName("*").length > 0) {
                n.find.TAG = function (C, x) {
                    var y = x.getElementsByTagName(C[1]);
                    if (C[1] === "*") {
                        var A = [];
                        for (var B = 0; y[B]; B++) {
                            if (y[B].nodeType === 1) {
                                A.push(y[B])
                            }
                        }
                        y = A
                    }
                    return y
                }
            }
            w.innerHTML = "<a href='#'></a>";
            if (w.firstChild && typeof w.firstChild.getAttribute !== "undefined" && w.firstChild.getAttribute("href") !== "#") {
                n.attrHandle.href = function (x) {
                    return x.getAttribute("href", 2)
                }
            }
            w = null
        })();
        if (document.querySelectorAll) {
            (function () {
                var y = v, w = document.createElement("div");
                w.innerHTML = "<p class='TEST'></p>";
                if (w.querySelectorAll && w.querySelectorAll(".TEST").length === 0) {
                    return
                }
                v = function (E, A, C, B) {
                    A = A || document;
                    if (!B && A.nodeType === 9 && !u(A)) {
                        try {
                            return l(A.querySelectorAll(E), C)
                        } catch (D) {
                        }
                    }
                    return y(E, A, C, B)
                };
                for (var x in y) {
                    v[x] = y[x]
                }
                w = null
            })()
        }
        (function () {
            var w = document.createElement("div");
            w.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!w.getElementsByClassName || w.getElementsByClassName("e").length === 0) {
                return
            }
            w.lastChild.className = "e";
            if (w.getElementsByClassName("e").length === 1) {
                return
            }
            n.order.splice(1, 0, "CLASS");
            n.find.CLASS = function (A, y, x) {
                if (typeof y.getElementsByClassName !== "undefined" && !x) {
                    return y.getElementsByClassName(A[1])
                }
            };
            w = null
        })();

        function q(C, w, x, E, G, F) {
            for (var A = 0, B = E.length; A < B; A++) {
                var D = E[A];
                if (D) {
                    D = D[C];
                    var y = false;
                    while (D) {
                        if (D.sizcache === x) {
                            y = E[D.sizset];
                            break
                        }
                        if (D.nodeType === 1 && !F) {
                            D.sizcache = x;
                            D.sizset = A
                        }
                        if (D.nodeName.toLowerCase() === w) {
                            y = D;
                            break
                        }
                        D = D[C]
                    }
                    E[A] = y
                }
            }
        }

        function c(C, w, x, E, G, F) {
            for (var A = 0, B = E.length; A < B; A++) {
                var D = E[A];
                if (D) {
                    D = D[C];
                    var y = false;
                    while (D) {
                        if (D.sizcache === x) {
                            y = E[D.sizset];
                            break
                        }
                        if (D.nodeType === 1) {
                            if (!F) {
                                D.sizcache = x;
                                D.sizset = A
                            }
                            if (typeof w !== "string") {
                                if (D === w) {
                                    y = true;
                                    break
                                }
                            } else {
                                if (v.filter(w, [D]).length > 0) {
                                    y = D;
                                    break
                                }
                            }
                        }
                        D = D[C]
                    }
                    E[A] = y
                }
            }
        }

        var m = document.compareDocumentPosition ? function (w, x) {
            return w.compareDocumentPosition(x) & 16
        } : function (w, x) {
            return w !== x && (w.contains ? w.contains(x) : true)
        };
        var u = function (x) {
            var w = (x ? x.ownerDocument || x : 0).documentElement;
            return w ? w.nodeName !== "HTML" : false
        };
        var d = function (C, D) {
            var y = [], x = "", w, A = D.nodeType ? [D] : D;
            while ((w = n.match.PSEUDO.exec(C))) {
                x += w[0];
                C = C.replace(n.match.PSEUDO, "")
            }
            C = n.relative[C] ? C + "*" : C;
            for (var E = 0, B = A.length; E < B; E++) {
                v(C, A[E], y)
            }
            return v.filter(x, y)
        };
        return v
    })();
    bc.lang = {
        code: "fr",
        of: "de",
        loading: "",
        cancel: "Annuler",
        next: "Suivant",
        previous: "PrÃ©cÃ©dent",
        play: "Lire",
        pause: "Pause",
        close: "Fermer",
        errors: {
            single: 'Vous devez installer le plugin <a href="{0}">{1}</a> pour afficher ce contenu.',
            shared: 'Vous devez installer les plugins <a href="{0}">{1}</a> et <a href="{2}">{3}</a> pour afficher ce contenu.',
            either: 'Vous devez installer le plugin <a href="{0}">{1}</a> ou <a href="{2}">{3}</a> pour afficher ce contenu.'
        }
    };
    var bs, bv = "sb-drag-proxy", br, aU, bK;

    function bn() {
        br = {x: 0, y: 0, startX: null, startY: null}
    }

    function bX() {
        var a = bc.dimensions;
        bV(aU.style, {height: a.innerHeight + "px", width: a.innerWidth + "px"})
    }

    function be() {
        bn();
        var a = ["position:absolute", "cursor:" + (bc.isGecko ? "-moz-grab" : "move"), "background-color:" + (bc.isIE ? "#fff;filter:alpha(opacity=0)" : "transparent")].join(";");
        bc.appendHTML(bc.skin.body, '<div id="' + bv + '" style="' + a + '"></div>');
        aU = bN(bv);
        bX();
        bo(aU, "mousedown", bh)
    }

    function bx() {
        if (aU) {
            bg(aU, "mousedown", bh);
            bu(aU);
            aU = null
        }
        bK = null
    }

    function bh(c) {
        aQ(c);
        var a = a8(c);
        br.startX = a[0];
        br.startY = a[1];
        bK = bN(bc.player.id);
        bo(document, "mousemove", bl);
        bo(document, "mouseup", aV);
        if (bc.isGecko) {
            aU.style.cursor = "-moz-grabbing"
        }
    }

    function bl(g) {
        var c = bc.player, f = bc.dimensions, h = a8(g);
        var a = h[0] - br.startX;
        br.startX += a;
        br.x = Math.max(Math.min(0, br.x + a), f.innerWidth - c.width);
        var d = h[1] - br.startY;
        br.startY += d;
        br.y = Math.max(Math.min(0, br.y + d), f.innerHeight - c.height);
        bV(bK.style, {left: br.x + "px", top: br.y + "px"})
    }

    function aV() {
        bg(document, "mousemove", bl);
        bg(document, "mouseup", aV);
        if (bc.isGecko) {
            aU.style.cursor = "-moz-grab"
        }
    }

    bc.img = function (d, a) {
        this.obj = d;
        this.id = a;
        this.ready = false;
        var c = this;
        bs = new Image();
        bs.onload = function () {
            c.height = d.height ? parseInt(d.height, 10) : bs.height;
            c.width = d.width ? parseInt(d.width, 10) : bs.width;
            c.ready = true;
            bs.onload = null;
            bs = null
        };
        bs.src = d.content
    };
    bc.img.ext = ["bmp", "gif", "jpg", "jpeg", "png"];
    bc.img.prototype = {
        append: function (d, f) {
            var a = document.createElement("img");
            a.id = this.id;
            a.src = this.obj.content;
            a.style.position = "absolute";
            var c, g;
            if (f.oversized && bc.options.handleOversize == "resize") {
                c = f.innerHeight;
                g = f.innerWidth
            } else {
                c = this.height;
                g = this.width
            }
            a.setAttribute("height", c);
            a.setAttribute("width", g);
            d.appendChild(a)
        }, remove: function () {
            var a = bN(this.id);
            if (a) {
                bu(a)
            }
            bx();
            if (bs) {
                bs.onload = null;
                bs = null
            }
        }, onLoad: function () {
            var a = bc.dimensions;
            if (a.oversized && bc.options.handleOversize == "drag") {
                be()
            }
        }, onWindowResize: function () {
            var f = bc.dimensions;
            switch (bc.options.handleOversize) {
                case"resize":
                    var c = bN(this.id);
                    c.height = f.innerHeight;
                    c.width = f.innerWidth;
                    break;
                case"drag":
                    if (bK) {
                        var a = parseInt(bc.getStyle(bK, "top")), d = parseInt(bc.getStyle(bK, "left"));
                        if (a + this.height < f.innerHeight) {
                            bK.style.top = f.innerHeight - this.height + "px"
                        }
                        if (d + this.width < f.innerWidth) {
                            bK.style.left = f.innerWidth - this.width + "px"
                        }
                        bX()
                    }
                    break
            }
        }
    };
    bc.iframe = function (d, a) {
        this.obj = d;
        this.id = a;
        var c = bN("sb-overlay");
        this.height = d.height ? parseInt(d.height, 10) : c.offsetHeight;
        this.width = d.width ? parseInt(d.width, 10) : c.offsetWidth
    };
    bc.iframe.prototype = {
        append: function (c, a) {
            var d = '<iframe id="' + this.id + '" name="' + this.id + '" height="100%" width="100%" frameborder="0" marginwidth="0" marginheight="0" style="visibility:hidden" onload="this.style.visibility=\'visible\'" scrolling="auto"';
            if (bc.isIE) {
                d += ' allowtransparency="true"';
                if (bc.isIE6) {
                    d += " src=\"javascript:false;document.write('');\""
                }
            }
            d += "></iframe>";
            c.innerHTML = d
        }, remove: function () {
            var a = bN(this.id);
            if (a) {
                bu(a);
                if (bc.isGecko) {
                    delete bt.frames[this.id]
                }
            }
        }, onLoad: function () {
            var a = bc.isIE ? bN(this.id).contentWindow : bt.frames[this.id];
            a.location.href = this.obj.content
        }
    };
    bc.html = function (a, c) {
        this.obj = a;
        this.id = c;
        this.height = a.height ? parseInt(a.height, 10) : 300;
        this.width = a.width ? parseInt(a.width, 10) : 500
    };
    bc.html.prototype = {
        append: function (c, d) {
            var a = document.createElement("div");
            a.id = this.id;
            a.className = "html";
            a.innerHTML = this.obj.content;
            c.appendChild(a)
        }, remove: function () {
            var a = bN(this.id);
            if (a) {
                bu(a)
            }
        }
    };
    var a4 = 16;
    bc.qt = function (a, c) {
        this.obj = a;
        this.id = c;
        this.height = a.height ? parseInt(a.height, 10) : 300;
        if (bc.options.showMovieControls) {
            this.height += a4
        }
        this.width = a.width ? parseInt(a.width, 10) : 300
    };
    bc.qt.ext = ["dv", "mov", "moov", "movie", "mp4", "avi", "mpg", "mpeg"];
    bc.qt.prototype = {
        append: function (k, j) {
            var f = bc.options, d = String(f.autoplayMovies), h = String(f.showMovieControls);
            var l = "<object",
                a = {id: this.id, name: this.id, height: this.height, width: this.width, kioskmode: "true"};
            if (bc.isIE) {
                a.classid = "clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B";
                a.codebase = "http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0"
            } else {
                a.type = "video/quicktime";
                a.data = this.obj.content
            }
            for (var c in a) {
                l += " " + c + '="' + a[c] + '"'
            }
            l += ">";
            var m = {src: this.obj.content, scale: "aspect", controller: h, autoplay: d};
            for (var g in m) {
                l += '<param name="' + g + '" value="' + m[g] + '">'
            }
            l += "</object>";
            k.innerHTML = l
        }, remove: function () {
            try {
                document[this.id].Stop()
            } catch (c) {
            }
            var a = bN(this.id);
            if (a) {
                bu(a)
            }
        }
    };
    var bC = false, a5 = [], aN = ["sb-nav-close", "sb-nav-next", "sb-nav-play", "sb-nav-pause", "sb-nav-previous"], bQ,
        bM, bR, aR = true;

    function bf(d, h, m, o, g) {
        var k = (h == "opacity"), n = k ? bc.setOpacity : function (t, r) {
            t.style[h] = "" + r + "px"
        };
        if (o == 0 || (!k && !bc.options.animate) || (k && !bc.options.animateFade)) {
            n(d, m);
            if (g) {
                g()
            }
            return
        }
        var l = parseFloat(bc.getStyle(d, h)) || 0;
        var j = m - l;
        if (j == 0) {
            if (g) {
                g()
            }
            return
        }
        o *= 1000;
        var c = bp(), p = bc.ease, q = c + o, a;
        var f = setInterval(function () {
            a = bp();
            if (a >= q) {
                clearInterval(f);
                f = null;
                n(d, m);
                if (g) {
                    g()
                }
            } else {
                n(d, l + p((a - c) / o) * j)
            }
        }, 10)
    }

    function bW() {
        bQ.style.height = bc.getWindowSize("Height") + "px";
        bQ.style.width = bc.getWindowSize("Width") + "px"
    }

    function bU() {
        bQ.style.top = document.documentElement.scrollTop + "px";
        bQ.style.left = document.documentElement.scrollLeft + "px"
    }

    function bk(a) {
        if (a) {
            bS(a5, function (d, c) {
                c[0].style.visibility = c[1] || ""
            })
        } else {
            a5 = [];
            bS(bc.options.troubleElements, function (c, d) {
                bS(document.getElementsByTagName(d), function (g, f) {
                    a5.push([f, f.style.visibility]);
                    f.style.visibility = "hidden"
                })
            })
        }
    }

    function aM(a, c) {
        var d = bN("sb-nav-" + a);
        if (d) {
            d.style.display = c ? "" : "none"
        }
    }

    function bJ(c, f) {
        var g = bN("sb-loading"), a = bc.getCurrent().player, h = (a == "img" || a == "html");
        if (c) {
            bc.setOpacity(g, 0);
            g.style.display = "block";
            var d = function () {
                bc.clearOpacity(g);
                if (f) {
                    f()
                }
            };
            if (h) {
                bf(g, "opacity", 1, bc.options.fadeDuration, d)
            } else {
                d()
            }
        } else {
            var d = function () {
                g.style.display = "none";
                bc.clearOpacity(g);
                if (f) {
                    f()
                }
            };
            if (h) {
                bf(g, "opacity", 0, bc.options.fadeDuration, d)
            } else {
                d()
            }
        }
    }

    function aK(k) {
        var p = bc.getCurrent();
        bN("sb-title-inner").innerHTML = p.title || "";
        var j, n, f, g, m;
        if (bc.options.displayNav) {
            j = true;
            var l = bc.gallery.length;
            if (l > 1) {
                if (bc.options.continuous) {
                    n = m = true
                } else {
                    n = (l - 1) > bc.current;
                    m = bc.current > 0
                }
            }
            if (bc.options.slideshowDelay > 0 && bc.hasNext()) {
                g = !bc.isPaused();
                f = !g
            }
        } else {
            j = n = f = g = m = false
        }
        aM("close", j);
        aM("next", n);
        aM("play", f);
        aM("pause", g);
        aM("previous", m);
        var h = "";
        if (bc.options.displayCounter && bc.gallery.length > 1) {
            var l = bc.gallery.length;
            if (bc.options.counterType == "skip") {
                var a = 0, c = l, d = parseInt(bc.options.counterLimit) || 0;
                if (d < l && d > 2) {
                    var o = Math.floor(d / 2);
                    a = bc.current - o;
                    if (a < 0) {
                        a += l
                    }
                    c = bc.current + (d - o);
                    if (c > l) {
                        c -= l
                    }
                }
                while (a != c) {
                    if (a == l) {
                        a = 0
                    }
                    h += '<a onclick="event.preventDefault();Shadowbox.change(' + a + ');"';
                    if (a == bc.current) {
                        h += ' class="sb-counter-current"'
                    }
                    h += ">" + (++a) + "</a>"
                }
            } else {
                h = [bc.current + 1, bc.lang.of, l].join(" ")
            }
        }
        bN("sb-counter").innerHTML = h;
        k()
    }

    function a9(f) {
        var c = bN("sb-title-inner"), a = bN("sb-info-inner"), d = 0.35;
        c.style.visibility = a.style.visibility = "";
        if (c.innerHTML != "") {
            bf(c, "marginTop", 0, d)
        }
        bf(a, "marginTop", 0, d, f)
    }

    function bq(d, h) {
        var k = bN("sb-title"), g = bN("sb-info"), c = k.offsetHeight, a = g.offsetHeight, l = bN("sb-title-inner"),
            j = bN("sb-info-inner"), f = (d ? 0.35 : 0);
        bf(l, "marginTop", c, f);
        bf(j, "marginTop", a * -1, f, function () {
            l.style.visibility = j.style.visibility = "hidden";
            h()
        })
    }

    function bO(c, h, d, f) {
        var g = bN("sb-wrapper-inner"), a = (d ? bc.options.resizeDuration : 0);
        bf(bR, "top", h, a);
        bf(g, "height", c, a, f)
    }

    function bw(c, g, d, f) {
        var a = (d ? bc.options.resizeDuration : 0);
        bf(bR, "left", g, a);
        bf(bR, "width", c, a, f)
    }

    function bG(h, d) {
        var a = bN("sb-body-inner"), h = parseInt(h), d = parseInt(d), f = bR.offsetHeight - a.offsetHeight,
            g = bR.offsetWidth - a.offsetWidth, k = bM.offsetHeight, j = bM.offsetWidth,
            l = parseInt(bc.options.viewportPadding) || 20, c = (bc.player && bc.options.handleOversize != "drag");
        return bc.setDimensions(h, d, k, j, f, g, l, c)
    }

    var ba = {};
    ba.markup = '<div id="sb-container"><div id="sb-overlay"></div><div id="sb-wrapper"><div id="sb-title"><div id="sb-title-inner"></div></div><div id="sb-wrapper-inner"><div id="sb-body"><div id="sb-body-inner"></div><div id="sb-loading"><div id="sb-loading-inner"><span>{loading}</span></div></div></div></div><div id="sb-info"><div id="sb-info-inner"><div id="sb-counter"></div><div id="sb-nav"><a id="sb-nav-close" title="{close}" onclick="event.preventDefault();Shadowbox.close()"></a><a id="sb-nav-next" title="{next}" onclick="event.preventDefault();Shadowbox.next()"></a><a id="sb-nav-play" title="{play}" onclick="event.preventDefault();Shadowbox.play()"></a><a id="sb-nav-pause" title="{pause}" onclick="event.preventDefault();Shadowbox.pause()"></a><a id="sb-nav-previous" title="{previous}" onclick="event.preventDefault();Shadowbox.previous()"></a></div></div></div></div></div>';
    ba.options = {
        animSequence: "sync",
        counterLimit: 10,
        counterType: "default",
        displayCounter: true,
        displayNav: true,
        fadeDuration: 0.35,
        initialHeight: 160,
        initialWidth: 320,
        modal: false,
        overlayColor: "#000",
        overlayOpacity: 0.5,
        resizeDuration: 0.35,
        showOverlay: true,
        troubleElements: ["select", "object", "embed", "canvas"]
    };
    ba.init = function () {
        bc.appendHTML(document.body, aL(ba.markup, bc.lang));
        ba.body = bN("sb-body-inner");
        bQ = bN("sb-container");
        bM = bN("sb-overlay");
        bR = bN("sb-wrapper");
        if (!S) {
            bQ.style.position = "absolute"
        }
        if (!aW) {
            var a, c, d = /url\("(.*\.png)"\)/;
            bS(aN, function (h, g) {
                a = bN(g);
                if (a) {
                    c = bc.getStyle(a, "backgroundImage").match(d);
                    if (c) {
                        a.style.backgroundImage = "none";
                        a.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src=" + c[1] + ",sizingMethod=scale);"
                    }
                }
            })
        }
        var f;
        bo(bt, "resize", function () {
            if (f) {
                clearTimeout(f);
                f = null
            }
            if (by) {
                f = setTimeout(ba.onWindowResize, 10)
            }
        })
    };
    ba.onOpen = function (c, a) {
        aR = false;
        bQ.style.display = "block";
        bW();
        var d = bG(bc.options.initialHeight, bc.options.initialWidth);
        bO(d.innerHeight, d.top);
        bw(d.width, d.left);
        if (bc.options.showOverlay) {
            bM.style.backgroundColor = bc.options.overlayColor;
            bc.setOpacity(bM, 0);
            if (!bc.options.modal) {
                bo(bM, "click", bc.close)
            }
            bC = true
        }
        if (!S) {
            bU();
            bo(bt, "scroll", bU)
        }
        bk();
        bQ.style.visibility = "visible";
        if (bC) {
            bf(bM, "opacity", bc.options.overlayOpacity, bc.options.fadeDuration, a)
        } else {
            a()
        }
    };
    ba.onLoad = function (c, a) {
        bJ(true);
        while (ba.body.firstChild) {
            bu(ba.body.firstChild)
        }
        bq(c, function () {
            if (!by) {
                return
            }
            if (!c) {
                bR.style.visibility = "visible"
            }
            aK(a)
        })
    };
    ba.onReady = function (f) {
        if (!by) {
            return
        }
        var d = bc.player, a = bG(d.height, d.width);
        var c = function () {
            a9(f)
        };
        switch (bc.options.animSequence) {
            case"hw":
                bO(a.innerHeight, a.top, true, function () {
                    bw(a.width, a.left, true, c)
                });
                break;
            case"wh":
                bw(a.width, a.left, true, function () {
                    bO(a.innerHeight, a.top, true, c)
                });
                break;
            default:
                bw(a.width, a.left, true);
                bO(a.innerHeight, a.top, true, c)
        }
    };
    ba.onShow = function (a) {
        bJ(false, a);
        aR = true
    };
    ba.onClose = function () {
        if (!S) {
            bg(bt, "scroll", bU)
        }
        bg(bM, "click", bc.close);
        bR.style.visibility = "hidden";
        var a = function () {
            bQ.style.visibility = "hidden";
            bQ.style.display = "none";
            bk(true)
        };
        if (bC) {
            bf(bM, "opacity", 0, bc.options.fadeDuration, a)
        } else {
            a()
        }
    };
    ba.onPlay = function () {
        aM("play", false);
        aM("pause", true)
    };
    ba.onPause = function () {
        aM("pause", false);
        aM("play", true)
    };
    ba.onWindowResize = function () {
        if (!aR) {
            return
        }
        bW();
        var a = bc.player, c = bG(a.height, a.width);
        bw(c.width, c.left);
        bO(c.innerHeight, c.top);
        if (a.onWindowResize) {
            a.onWindowResize()
        }
    };
    bc.skin = ba;
    bt.Shadowbox = bc
})(window);
Shadowbox.init({overlayOpacity: 0.1, skipSetup: true});
(function (d, a) {
    if (navigator.epubReadingSystem) {
        if (navigator.epubReadingSystem.name) {
            if (navigator.epubReadingSystem.name == "iBooks") {
                function f() {
                    this.hasDeviceMotion = "ondevicemotion" in d;
                    this.threshold = 1;
                    this.delay = 100;
                    this.lastTime = new Date();
                    this.lastX = null;
                    this.lastY = null;
                    this.lastZ = null;
                    if (typeof a.CustomEvent === "function") {
                        this.event = new a.CustomEvent("shake", {bubbles: true, cancelable: true})
                    } else {
                        if (typeof a.createEvent === "function") {
                            this.event = a.createEvent("Event");
                            this.event.initEvent("shake", true, true)
                        } else {
                            return false
                        }
                    }
                }

                f.prototype.reset = function () {
                    this.lastTime = new Date();
                    this.lastX = null;
                    this.lastY = null;
                    this.lastZ = null
                };
                f.prototype.start = function () {
                    this.reset();
                    if (this.hasDeviceMotion) {
                        d.addEventListener("devicemotion", this, false)
                    }
                };
                f.prototype.stop = function () {
                    if (this.hasDeviceMotion) {
                        d.removeEventListener("devicemotion", this, false)
                    }
                    this.reset()
                };
                f.prototype.devicemotion = function (m) {
                    var l = m.accelerationIncludingGravity, k, j, h = 0, g = 0, n = 0;
                    if ((this.lastX === null) && (this.lastY === null) && (this.lastZ === null)) {
                        this.lastX = l.x;
                        this.lastY = l.y;
                        this.lastZ = l.z;
                        return
                    }
                    h = Math.abs(this.lastX - l.x);
                    g = Math.abs(this.lastY - l.y);
                    n = Math.abs(this.lastZ - l.z);
                    if (((h > this.threshold) && (g > this.threshold)) || ((h > this.threshold) && (n > this.threshold)) || ((g > this.threshold) && (n > this.threshold))) {
                        k = new Date();
                        j = k.getTime() - this.lastTime.getTime();
                        if (j > this.delay) {
                            d.dispatchEvent(this.event);
                            this.lastTime = new Date()
                        }
                    }
                    this.lastX = l.x;
                    this.lastY = l.y;
                    this.lastZ = l.z
                };
                f.prototype.handleEvent = function (g) {
                    if (typeof (this[g.type]) === "function") {
                        return this[g.type](g)
                    }
                };
                var c = new f();
                c && c.start()
            }
        }
    }
}(window, document));

function playPause(a) {
    var c = document.getElementById(a);
    if (c.paused) {
        c.play()
    } else {
        c.pause()
    }
}

function playPausePopup(a) {
    var c = document.getElementById(a);
    if (c.hasAttribute("controls")) {
        c.pause();
        c.removeAttribute("controls")
    } else {
        c.setAttribute("controls", "controls");
        c.play()
    }
}

function openVideoBox(a, d, c) {
    Shadowbox.open({
        content: '<div style="width:100%;height:100%"><video width="100%" height="100%" preload="auto" autoplay="true" controls="true" src="' + a + '" type="video/mp4"/></div>',
        player: "html",
        title: "Video Widget",
        height: c,
        width: d,
        modal: true,
        handleOversize: "resize"
    })
}

function openGallery(j, h, a, c, f, l) {
    if (j.preventDefault) {
        j.preventDefault()
    }
    j.returnValue = false;
    var g = new Array(a);
    var n = {
        continuous: false,
        counterType: "default",
        animate: false,
        handleOversize: "resize",
        modal: true,
        overlayOpacity: 0.6,
        displayCounter: false
    };
    for (i = 0; i < a; i++) {
        var k;
        var m = i + 1;
        k = h + "/" + h + "-" + m + ".jpg";
        var d = {player: "img", title: l, content: k, options: n, width: c, height: f};
        g[i] = d
    }
    Shadowbox.open(g)
}

function openGallerya(h, a, c, f, k) {
    var g = new Array(a);
    var m = {
        continuous: false,
        counterType: "default",
        animate: false,
        handleOversize: "resize",
        modal: true,
        overlayOpacity: 0.6,
        displayCounter: false
    };
    for (i = 0; i < a; i++) {
        var j;
        var l = i + 1;
        j = h + "/" + h + "-" + l + ".jpg";
        var d = {player: "img", title: k, content: j, options: m, width: c, height: f};
        g[i] = d
    }
    Shadowbox.open(g)
}

function openWidget(f, d) {
    if (f.preventDefault) {
        f.preventDefault()
    }
    f.returnValue = false;
    var c = d.firstChild;
    while (c && c.nodeType != 1) {
        c = c.nextSibling
    }
    var a = d.nextSibling;
    while (a && a.nodeType != 1) {
        a = a.nextSibling
    }
    if (a.style.display == "none") {
        a.style.display = "block";
        c.src = "images/Stop-Normal-Red-icon.png";
        d.style.top = "-140px"
    } else {
        a.style.display = "none";
        c.src = "images/start-icon.png";
        d.style.top = "0px"
    }
    return false
}

function MyMessage(a) {
    Shadowbox.open({
        content: '<div style="background-color:white;width:90%;height:90%;"><p>' + a + "</p></div>",
        player: "html",
        title: "Welcome",
        modal: true,
        handleOversize: "resize",
        height: 350,
        width: 350
    })
}

function HideFocus() {
    var a = document.getElementsByClassName("bgclear");
    for (var d = 0; d < a.length; ++d) {
        var c = a[d];
        c.style.backgroundColor = "rgba(0, 0, 0, 0)"
    }
}

function ShowFocus(c) {
    var a = document.getElementById(c);
    if (a) {
        a.style.backgroundColor = "rgba(128, 128, 128, 0.5)"
    }
}

function ShowLayer(f) {
    HideFocus();
    HideAllLayers();
    var a = document.getElementsByClassName(f);
    for (var d = 0; d < a.length; ++d) {
        var c = a[d];
        c.style.visibility = "visible"
    }
    ShowFocus(f)
}

function HideLayer(f) {
    HideFocus();
    var a = document.getElementsByClassName(f);
    for (var d = 0; d < a.length; ++d) {
        var c = a[d];
        c.style.visibility = "hidden"
    }
}

function ToggleLayer(f) {
    HideFocus();
    var a = document.getElementsByClassName(f);
    for (var d = 0; d < a.length; ++d) {
        var c = a[d];
        if (c.style.visibility == "hidden") {
            c.parentNode.style.zIndex = "2";
            c.style.visibility = "visible";
            c.style.display = "block"
        } else {
            if (c.style.visibility == "visible") {
                c.parentNode.style.zIndex = "-1";
                c.style.display = "none";
                c.style.visibility = "hidden"
            }
        }
    }
}

function AdjustIFrameSize(c) {
    var a = c.contentWindow || c.contentDocument.parentWindow;
    a.onload = function () {
        b = document.getElementsByTagName("body")[0];
        var l = document.querySelector("meta[name=viewport]");
        var k = l.getAttribute("content");
        var h = /width[ ]*=[ ]*([\d\.]+)[ ]*,[ ]*height[ ]*=[ ]*([\d\.]+)/.exec(k);
        var o = parseFloat(h[1]);
        var g = parseFloat(h[2]);
        var n = b.clientWidth;
        var f = b.clientHeight;
        var d = (n / o);
        var j = (f / g);
        var m = 1;
        if (d < j) {
            m = d
        } else {
            m = j
        }
        z = Math.sqrt(m);
        s = "zoom:" + z + "; -moz-transform: scale(" + z + "); -moz-transform-origin: -1 0;-webkit-transform: scale(" + z + ");-webkit-transform-origin: 0 0;";
        if (typeof b.setAttribute === "function") {
            b.setAttribute("style", b.getAttribute("style") + ";" + s)
        }
    }
}

function HideAllLayers() {
    var a = document.getElementsByClassName("autohide");
    for (var d = 0; d < a.length; ++d) {
        var c = a[d];
        c.style.visibility = "hidden"
    }
}

function addEvent(c, f, d) {
    if (!d.$$guid) {
        d.$$guid = addEvent.guid++
    }
    if (!c.events) {
        c.events = {}
    }
    var a = c.events[f];
    if (!a) {
        a = c.events[f] = {};
        if (c["on" + f]) {
            a[0] = c["on" + f]
        }
    }
    a[d.$$guid] = d;
    c["on" + f] = handleEvent
}

addEvent.guid = 1;

function removeEvent(a, d, c) {
    if (a.events && a.events[d]) {
        delete a.events[d][c.$$guid]
    }
}

function handleEvent(d) {
    d = d || window.event;
    var a = this.events[d.type];
    for (var c in a) {
        this.$$handleEvent = a[c];
        this.$$handleEvent(d)
    }
}

function getCookieVal(c) {
    var a = document.cookie.indexOf(";", c);
    if (a == -1) {
        a = document.cookie.length
    }
    return unescape(document.cookie.substring(c, a))
}

function GetCookie(f) {
    var c = f + "=";
    var h = c.length;
    var a = document.cookie.length;
    var g = 0;
    while (g < a) {
        var d = g + h;
        if (document.cookie.substring(g, d) == c) {
            return getCookieVal(d)
        }
        g = document.cookie.indexOf(" ", g) + 1;
        if (g == 0) {
            break
        }
    }
    return null
}

function SetCookie(d, g) {
    var a = SetCookie.arguments;
    var k = SetCookie.arguments.length;
    var c = (k > 2) ? a[2] : null;
    var j = (k > 3) ? a[3] : null;
    var f = (k > 4) ? a[4] : null;
    var h = (k > 5) ? a[5] : false;
    document.cookie = d + "=" + escape(g) + ((c == null) ? "" : ("; expires=" + c.toGMTString())) + ((j == null) ? "" : ("; path=" + j)) + ((f == null) ? "" : ("; domain=" + f)) + ((h == true) ? "; secure" : "")
}

function DeleteCookie(a) {
    document.cookie = a + "=; expires=Thu, 01-Jan-70 00:00:01 GMT;"
}

function PushBackCookie(d) {
    var c = GetCookie("back");
    var a = GetCookie("backlogical");
    if (c) {
        var f = d + "\n" + c;
        SetCookie("back", f, null, null);
        f = document.body.id + "\n" + a;
        SetCookie("backlogical", f, null, null)
    } else {
        SetCookie("back", d, null, null);
        SetCookie("backlogical", document.body.id, null, null)
    }
}

function PopBackCookie() {
    var a = null;
    var d = GetCookie("back");
    var c = GetCookie("backlogical");
    if (d) {
        var g = d.indexOf("\n");
        if (g != -1) {
            a = d.substring(0, g);
            var f = d.substring(g + 1, d.length);
            SetCookie("back", f, null, null)
        } else {
            a = d;
            DeleteCookie("back")
        }
        g = c.indexOf("\n");
        if (g != -1) {
            var f = c.substring(g + 1, d.length);
            SetCookie("backlogical", f, null, null)
        } else {
            DeleteCookie("backlogical")
        }
    }
    return a
}

var hasTouchEvents = true;
if (navigator.epubReadingSystem) {
    try {
        hasTouchEvents = navigator.epubReadingSystem.hasFeature("touch-events")
    } catch (e) {
    }
}
var evaluator;
try {
    evaluator = new XPathEvaluator()
} catch (e) {
    hasTouchEvents = false
}
if (hasTouchEvents) {
    try {
        addEvent(window, "load", function () {
            var a = evaluator.evaluate("//*[local-name()='span'][@onclick]", document.documentElement, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
            if (a) {
                var d = a.iterateNext();
                while (d) {
                    var c = d.onclick;
                    if (c.length > 0) {
                        addEvent(d, "touchstart", function (f) {
                            if (typeof c == "function") {
                                f.preventDefault();
                                this.onclick.call(d);
                                false
                            }
                        });
                        addEvent(d, "touchmove", function (f) {
                            f.preventDefault();
                            false
                        });
                        addEvent(d, "touchend", function (f) {
                            f.preventDefault();
                            false
                        });
                        addEvent(d, "touchcancel", function (f) {
                            f.preventDefault();
                            false
                        })
                    }
                    d = a.iterateNext()
                }
            }
        })
    } catch (e) {
    }
}

function TraceLink(c, a, d) {
    c.preventDefault();
    if (d.indexOf("pageNum") != -1) {
        PushBackCookie(a)
    }
    location.href = d
}

var cantracelink = false;
if (navigator.epubReadingSystem) {
    if (navigator.epubReadingSystem.name) {
        if (navigator.epubReadingSystem.name == "iBooks") {
            cantracelink = true
        }
    }
}
if (cantracelink) {
    addEvent(window, "load", function () {
        window.removeEventListener("shake", shakeEventDidOccur, false);
        setTimeout(function () {
            ShowBackLink()
        }, 500);
        var c = document.getElementsByTagName("a");
        for (var f = 0; f < c.length; f++) {
            if (c[f].hasAttribute("href")) {
                var d = c[f];
                var a = c[f].href;
                if (a.length > 0) {
                    addEvent(d, "click", function (g) {
                        TraceLink(g, location.href, this.href)
                    });
                    addEvent(d, "touchstart", function (g) {
                        TraceLink(location.href, this.href)
                    });
                    addEvent(d, "touchmove", function (g) {
                        TraceLink(location.href, this.href)
                    });
                    addEvent(d, "touchend", function (g) {
                        TraceLink(location.href, this.href)
                    });
                    addEvent(d, "touchcancel", function (g) {
                        TraceLink(location.href, this.href)
                    })
                }
            }
        }
    })
}

function PeekBackCookie() {
    var a = null;
    var c = GetCookie("back");
    if (c) {
        var d = c.indexOf("\n");
        if (d != -1) {
            a = c.substring(0, d)
        } else {
            a = c
        }
    }
    return a
}

function PeekBackLogicalCookie() {
    var a = null;
    var c = GetCookie("backlogical");
    if (c) {
        var d = c.indexOf("\n");
        if (d != -1) {
            a = c.substring(0, d)
        } else {
            a = c
        }
    }
    return a
}

function DoBackLink(a) {
    a.preventDefault();
    location.href = PopBackCookie()
}

function ShowBackLink() {
    var d = PeekBackLogicalCookie();
    if (d != null) {
        window.removeEventListener("shake", shakeEventDidOccur, false);
        d = d.replace("lp", "");
        var a = document.createElement("p");
        a.setAttribute("style", "position:absolute;top:0px;left:0px;text-align:center;width:100%;");
        var c = document.createElement("span");
        c.setAttribute("class", "sbacktext");
        c.innerHTML = "Revenir page " + d;
        c.addEventListener("click", function (f) {
            DoBackLink(f);
            return false
        });
        a.appendChild(c);
        document.body.appendChild(a);
        setTimeout(function () {
            window.addEventListener("shake", shakeEventDidOccur, false)
        }, 6500)
    }
}

function shakeEventDidOccur() {
    ShowBackLink(0)
}

var SpinningWheel = {
    cellHeight: 44, friction: 0.003, device: "i", pixelRatio: 2, slotData: [], handleEvent: function (a) {
        if (a.type == "touchstart") {
            this.lockScreen(a);
            if (a.currentTarget.id == "sw-cancel" || a.currentTarget.id == "sw-done" || a.currentTarget.id == "sw-buttonl" || a.currentTarget.id == "sw-buttonr") {
                if (this.device == "a") {
                    this.tapUp(a)
                } else {
                    this.tapDown(a)
                }
            } else {
                if (a.currentTarget.id == "sw-frame") {
                    this.scrollStart(a)
                }
            }
        } else {
            if (a.type == "touchmove") {
                this.lockScreen(a);
                if (a.currentTarget.id == "sw-cancel" || a.currentTarget.id == "sw-done" || a.currentTarget.id == "sw-buttonl" || a.currentTarget.id == "sw-buttonr") {
                    if (this.device == "i") {
                        this.tapCancel(a)
                    }
                } else {
                    if (a.currentTarget.id == "sw-frame") {
                        this.scrollMove(a)
                    }
                }
            } else {
                if (a.type == "touchend") {
                    if (a.currentTarget.id == "sw-cancel" || a.currentTarget.id == "sw-done" || a.currentTarget.id == "sw-buttonl" || a.currentTarget.id == "sw-buttonr") {
                        if (this.device == "i") {
                            this.tapUp(a)
                        }
                    } else {
                        if (a.currentTarget.id == "sw-frame") {
                            this.scrollEnd(a)
                        }
                    }
                } else {
                    if (a.type == "webkitTransitionEnd") {
                        if (a.target.id == "sw-wrapper") {
                            this.destroy()
                        } else {
                            this.backWithinBoundaries(a)
                        }
                    } else {
                        if (a.type == "orientationchange") {
                            this.onOrientationChange(a)
                        } else {
                            if (a.type == "scroll") {
                                this.onScroll(a)
                            }
                        }
                    }
                }
            }
        }
    }, onOrientationChange: function (a) {
        window.scrollTo(0, 0);
        this.swWrapper.style.top = window.innerHeight + window.pageYOffset + "px";
        this.calculateSlotsWidth()
    }, onScroll: function (a) {
        this.swWrapper.style.top = window.innerHeight + window.pageYOffset + "px"
    }, lockScreen: function (a) {
        if (a.currentTarget.id.match(/sw/)) {
            a.preventDefault();
            a.stopPropagation()
        }
    }, reset: function () {
        this.slotEl = [];
        this.activeSlot = null;
        this.swWrapper = undefined;
        this.swSlotWrapper = undefined;
        this.swSlots = undefined;
        this.swFrame = undefined
    }, calculateSlotsWidth: function () {
        var c = this.swSlots.getElementsByTagName("div");
        for (var a = 0; a < c.length; a += 1) {
            this.slotEl[a].slotWidth = c[a].offsetWidth
        }
    }, create: function () {
        var f, a, c, d, g;
        this.reset();
        if (window.devicePixelRatio >= 1.5) {
            this.pixelRatio = 1.5
        }
        if (window.devicePixelRatio >= 2) {
            this.pixelRatio = 2
        }
        this.cellHeight = 44 * this.pixelRatio;
        g = document.createElement("div");
        g.id = "sw-wrapper";
        g.style.top = window.innerHeight + window.pageYOffset + "px";
        g.style.webkitTransitionProperty = "-webkit-transform";
        g.innerHTML = '<div id="sw-super-wrapper"><div id="sw-header"><div id="sw-cancel">Cancel</div><div id="sw-buttonl">Last</div><div id="sw-buttonr">Next</div><div id="sw-done">Done</div></div><div id="sw-slots-wrapper"><div id="sw-slots"></div></div><div id="sw-frame"></div></div>';
        document.body.appendChild(g);
        this.swWrapper = g;
        this.swSlotWrapper = document.getElementById("sw-slots-wrapper");
        this.swSlots = document.getElementById("sw-slots");
        this.swFrame = document.getElementById("sw-frame");
        for (a = 0; a < this.slotData.length; a += 1) {
            d = document.createElement("ul");
            c = "";
            for (f in this.slotData[a].values) {
                c += "<li>" + this.slotData[a].values[f] + "</li>"
            }
            d.innerHTML = c;
            g = document.createElement("div");
            g.className = this.slotData[a].style;
            g.appendChild(d);
            this.swSlots.appendChild(g);
            d.slotPosition = a;
            d.slotYPosition = 0;
            d.slotWidth = 0;
            d.slotMaxScroll = this.swSlotWrapper.clientHeight - d.clientHeight - (86 * this.pixelRatio);
            d.style.webkitTransitionTimingFunction = "cubic-bezier(0, 0, 0.2, 1)";
            this.slotEl.push(d);
            if (this.slotData[a].defaultValue) {
                this.scrollToValue(a, this.slotData[a].defaultValue)
            }
        }
        this.calculateSlotsWidth();
        document.addEventListener("touchstart", this, false);
        document.addEventListener("touchmove", this, false);
        window.addEventListener("orientationchange", this, true);
        window.addEventListener("scroll", this, true);
        document.getElementById("sw-cancel").addEventListener("touchstart", this, false);
        document.getElementById("sw-done").addEventListener("touchstart", this, false);
        document.getElementById("sw-buttonl").addEventListener("touchstart", this, false);
        document.getElementById("sw-buttonr").addEventListener("touchstart", this, false);
        this.swFrame.addEventListener("touchstart", this, false)
    }, open: function () {
        this.create();
        this.swWrapper.style.webkitTransitionTimingFunction = "ease-out";
        this.swWrapper.style.webkitTransitionDuration = "400ms";
        this.swWrapper.style.webkitTransform = "translate3d(0, -" + (259 * this.pixelRatio) + "px, 0)"
    }, destroy: function () {
        this.swWrapper.removeEventListener("webkitTransitionEnd", this, false);
        this.swFrame.removeEventListener("touchstart", this, false);
        document.getElementById("sw-cancel").removeEventListener("touchstart", this, false);
        document.getElementById("sw-done").removeEventListener("touchstart", this, false);
        document.getElementById("sw-buttonl").removeEventListener("touchstart", this, false);
        document.getElementById("sw-buttonr").removeEventListener("touchstart", this, false);
        document.removeEventListener("touchstart", this, false);
        document.removeEventListener("touchmove", this, false);
        window.removeEventListener("orientationchange", this, true);
        window.removeEventListener("scroll", this, true);
        this.slotData = [];
        this.cancelAction = function () {
            return false
        };
        this.cancelDone = function () {
            return true
        };
        this.cancelButtonl = function () {
            return true
        };
        this.cancelButtonr = function () {
            return true
        };
        this.reset();
        document.body.removeChild(document.getElementById("sw-wrapper"))
    }, close: function () {
        this.swWrapper.style.webkitTransitionTimingFunction = "ease-in";
        this.swWrapper.style.webkitTransitionDuration = "400ms";
        this.swWrapper.style.webkitTransform = "translate3d(0, 0, 0)";
        this.swWrapper.addEventListener("webkitTransitionEnd", this, false)
    }, addSlot: function (c, f, a) {
        if (!f) {
            f = ""
        }
        f = f.split(" ");
        for (var d = 0; d < f.length; d += 1) {
            f[d] = "sw-" + f[d]
        }
        f = f.join(" ");
        var g = {values: c, style: f, defaultValue: a};
        this.slotData.push(g)
    }, getSelectedValues: function () {
        var d, h, f, a, g = [], c = [];
        for (f in this.slotEl) {
            this.slotEl[f].removeEventListener("webkitTransitionEnd", this, false);
            this.slotEl[f].style.webkitTransitionDuration = "0";
            if (this.slotEl[f].slotYPosition > 0) {
                this.setPosition(f, 0)
            } else {
                if (this.slotEl[f].slotYPosition < this.slotEl[f].slotMaxScroll) {
                    this.setPosition(f, this.slotEl[f].slotMaxScroll)
                }
            }
            d = -Math.round(this.slotEl[f].slotYPosition / this.cellHeight);
            h = 0;
            for (a in this.slotData[f].values) {
                if (h == d) {
                    g.push(a);
                    c.push(this.slotData[f].values[a]);
                    break
                }
                h += 1
            }
        }
        return {keys: g, values: c}
    }, setPosition: function (c, a) {
        this.slotEl[c].slotYPosition = a;
        this.slotEl[c].style.webkitTransform = "translate3d(0, " + a + "px, 0)"
    }, scrollStart: function (d) {
        var f = d.targetTouches[0].clientX - this.swSlots.offsetLeft;
        var g = 0;
        for (var a = 0; a < this.slotEl.length; a += 1) {
            g += this.slotEl[a].slotWidth;
            if (f < g) {
                this.activeSlot = a;
                break
            }
        }
        if (this.slotData[this.activeSlot].style.match("readonly")) {
            this.swFrame.removeEventListener("touchmove", this, false);
            this.swFrame.removeEventListener("touchend", this, false);
            return false
        }
        this.slotEl[this.activeSlot].removeEventListener("webkitTransitionEnd", this, false);
        this.slotEl[this.activeSlot].style.webkitTransitionDuration = "0";
        var c = window.getComputedStyle(this.slotEl[this.activeSlot]).webkitTransform;
        c = new WebKitCSSMatrix(c).m42;
        if (c != this.slotEl[this.activeSlot].slotYPosition) {
            this.setPosition(this.activeSlot, c)
        }
        this.startY = d.targetTouches[0].clientY;
        this.scrollStartY = this.slotEl[this.activeSlot].slotYPosition;
        this.scrollStartTime = d.timeStamp;
        this.swFrame.addEventListener("touchmove", this, false);
        this.swFrame.addEventListener("touchend", this, false);
        return true
    }, scrollMove: function (c) {
        var a = c.targetTouches[0].clientY - this.startY;
        if (this.slotEl[this.activeSlot].slotYPosition > 0 || this.slotEl[this.activeSlot].slotYPosition < this.slotEl[this.activeSlot].slotMaxScroll) {
            a /= 2
        }
        this.setPosition(this.activeSlot, this.slotEl[this.activeSlot].slotYPosition + a);
        this.startY = c.targetTouches[0].clientY;
        if (c.timeStamp - this.scrollStartTime > 80) {
            this.scrollStartY = this.slotEl[this.activeSlot].slotYPosition;
            this.scrollStartTime = c.timeStamp
        }
    }, scrollEnd: function (g) {
        this.swFrame.removeEventListener("touchmove", this, false);
        this.swFrame.removeEventListener("touchend", this, false);
        if (this.slotEl[this.activeSlot].slotYPosition > 0 || this.slotEl[this.activeSlot].slotYPosition < this.slotEl[this.activeSlot].slotMaxScroll) {
            this.scrollTo(this.activeSlot, this.slotEl[this.activeSlot].slotYPosition > 0 ? 0 : this.slotEl[this.activeSlot].slotMaxScroll);
            return false
        }
        var c = this.slotEl[this.activeSlot].slotYPosition - this.scrollStartY;
        if (c < this.cellHeight / 1.5 && c > -this.cellHeight / 1.5) {
            if (this.slotEl[this.activeSlot].slotYPosition % this.cellHeight) {
                this.scrollTo(this.activeSlot, Math.round(this.slotEl[this.activeSlot].slotYPosition / this.cellHeight) * this.cellHeight, "100ms")
            }
            return false
        }
        var h = g.timeStamp - this.scrollStartTime;
        var a = (2 * c / h) / this.friction;
        var f = (this.friction / 2) * (a * a);
        if (a < 0) {
            a = -a;
            f = -f
        }
        var d = this.slotEl[this.activeSlot].slotYPosition + f;
        if (d > 0) {
            if (d > this.swSlotWrapper.clientHeight / 4) {
                d = this.swSlotWrapper.clientHeight / 4
            }
        } else {
            if (d < this.slotEl[this.activeSlot].slotMaxScroll) {
                d = (d - this.slotEl[this.activeSlot].slotMaxScroll) / 2 + this.slotEl[this.activeSlot].slotMaxScroll;
                a /= 3;
                if (d < this.slotEl[this.activeSlot].slotMaxScroll - this.swSlotWrapper.clientHeight / 4) {
                    d = this.slotEl[this.activeSlot].slotMaxScroll - this.swSlotWrapper.clientHeight / 4
                }
            } else {
                d = Math.round(d / this.cellHeight) * this.cellHeight
            }
        }
        this.scrollTo(this.activeSlot, Math.round(d), Math.round(a) + "ms");
        return true
    }, scrollTo: function (d, a, c) {
        this.slotEl[d].style.webkitTransitionDuration = c ? c : "100ms";
        this.setPosition(d, a ? a : 0);
        if (this.slotEl[d].slotYPosition > 0 || this.slotEl[d].slotYPosition < this.slotEl[d].slotMaxScroll) {
            this.slotEl[d].addEventListener("webkitTransitionEnd", this, false)
        }
    }, scrollToValue: function (g, f) {
        var d, c, a;
        this.slotEl[g].removeEventListener("webkitTransitionEnd", this, false);
        this.slotEl[g].style.webkitTransitionDuration = "0";
        c = 0;
        for (a in this.slotData[g].values) {
            if (a == f) {
                d = c * this.cellHeight;
                this.setPosition(g, d);
                break
            }
            c -= 1
        }
    }, backWithinBoundaries: function (a) {
        a.target.removeEventListener("webkitTransitionEnd", this, false);
        this.scrollTo(a.target.slotPosition, a.target.slotYPosition > 0 ? 0 : a.target.slotMaxScroll, "150ms");
        return false
    }, tapDown: function (a) {
        a.currentTarget.addEventListener("touchmove", this, false);
        a.currentTarget.addEventListener("touchend", this, false);
        a.currentTarget.className = "sw-pressed"
    }, tapCancel: function (a) {
        a.currentTarget.removeEventListener("touchmove", this, false);
        a.currentTarget.removeEventListener("touchend", this, false);
        a.currentTarget.className = ""
    }, tapUp: function (a) {
        this.tapCancel(a);
        if (a.currentTarget.id == "sw-cancel") {
            this.cancelAction()
        } else {
            if (a.currentTarget.id == "sw-done") {
                this.doneAction()
            } else {
                if (a.currentTarget.id == "sw-buttonl") {
                    this.buttonlAction()
                } else {
                    this.buttonrAction()
                }
            }
        }
        this.close()
    }, setDevice: function (a) {
        this.device = a
    }, setButtonTexts: function (f, d, c, a) {
        if (f != null) {
            if (f != "") {
                document.getElementById("sw-cancel").innerHTML = f
            } else {
                document.getElementById("sw-cancel").style.display = "none"
            }
        }
        if (d != null) {
            if (d != "") {
                document.getElementById("sw-done").innerHTML = d
            } else {
                document.getElementById("sw-done").style.display = "none"
            }
        }
        if (c != null) {
            if (c != "") {
                document.getElementById("sw-buttonl").innerHTML = c
            } else {
                document.getElementById("sw-buttonl").style.display = "none"
            }
        }
        if (a != null) {
            if (a != "") {
                document.getElementById("sw-buttonr").innerHTML = a
            } else {
                document.getElementById("sw-buttonr").style.display = "none"
            }
        }
    }, setCancelAction: function (a) {
        this.cancelAction = a
    }, setDoneAction: function (a) {
        this.doneAction = a
    }, setButtonlAction: function (a) {
        this.buttonlAction = a
    }, setButtonrAction: function (a) {
        this.buttonrAction = a
    }, cancelAction: function () {
        return false
    }, cancelDone: function () {
        return true
    }, cancelButtonl: function () {
        return true
    }, cancelButtonr: function () {
        return true
    }
};

function openOneSlot(a) {
    if (document.getElementById("sw-wrapper")) {
        return
    }
    SpinningWheel.addSlot(a);
    SpinningWheel.setCancelAction(SpinningCancel);
    SpinningWheel.setDoneAction(SpinningDone);
    SpinningWheel.open()
}

function SpinningDone() {
    var c = SpinningWheel.getSelectedValues();
    var f = c.values.join(" ");
    var d = f.match(/\(p\. (\d+)\)/);
    var a = "pageNum-" + d[1] + ".html";
    PushBackCookie(location.href);
    location.href = a
}

function SpinningCancel() {
}

var GPScoords = [];

function distanceGPS(g, c, f, h) {
    var d = Math.PI / 180;
    lat1 = g * d;
    lat2 = f * d;
    lon1 = c * d;
    lon2 = h * d;
    t1 = Math.sin(lat1) * Math.sin(lat2);
    t2 = Math.cos(lat1) * Math.cos(lat2);
    t3 = Math.cos(lon1 - lon2);
    t4 = t2 * t3;
    t5 = t1 + t4;
    rad_dist = Math.atan(-t5 / Math.sqrt(-t5 * t5 + 1)) + 2 * Math.atan(1);
    return (rad_dist * 3437.74677 * 1.1508) * 1.6093470878864446
}

function erreurPosition(a) {
    var c = "Erreur lors de la gÃ©olocalisation : ";
    switch (a.code) {
        case a.TIMEOUT:
            c += "Timeout !";
            break;
        case a.PERMISSION_DENIED:
            c += "Vous nâavez pas donnÃ© la permission";
            break;
        case a.POSITION_UNAVAILABLE:
            c += "La position nâa pu Ãªtre dÃ©terminÃ©e";
            break;
        case a.UNKNOWN_ERROR:
            c += "Erreur inconnue";
            break
    }
    alert(c)
}

function maPosition(h) {
    var o = h.coords.latitude;
    var c = h.coords.longitude;
    var p = h.coords.altitude;
    var l = {};
    var j = [];
    for (var g = 0; g < GPScoords.length; ++g) {
        var n = GPScoords[g];
        var f = n[0];
        var m = f[0];
        var a = f[1];
        var d = distanceGPS(o, c, m, a);
        var k = d.toFixed(1) + " km : " + n[1] + " (p. " + n[2] + ")";
        j.push([k, d])
    }
    j.sort(function (r, q) {
        return r[1] - q[1]
    });
    for (var g = 0; g < j.length; g++) {
        l[g + 1] = j[g][0]
    }
    openOneSlot(l)
}

function Geo(a, c) {
    if (navigator.geolocation) {
        a.preventDefault();
        navigator.geolocation.getCurrentPosition(maPosition, erreurPosition, {maximumAge: 0, enableHighAccuracy: true})
    }
    return false
}

function moveCaret(f, a) {
    var d, c;
    if (f.getSelection) {
        d = f.getSelection();
        if (d.rangeCount > 0) {
            var g = d.focusNode;
            var h = d.focusOffset + a;
            d.collapse(g, Math.min(g.length, h))
        }
    } else {
        if ((d = f.document.selection)) {
            if (d.type != "Control") {
                c = d.createRange();
                c.move("character", a);
                c.select()
            }
        }
    }
}

function insertTextAtCursor(f) {
    var d, a, c;
    if (window.getSelection) {
        d = window.getSelection();
        if (d.getRangeAt && d.rangeCount) {
            a = d.getRangeAt(0);
            a.deleteContents();
            a.insertNode(document.createTextNode(f))
        }
    } else {
        if (document.selection && document.selection.createRange) {
            document.selection.createRange().text = f
        }
    }
}

function FilterKeyDown(a, c) {
    if (c.key == "Spacebar") {
        insertTextAtCursor(" ");
        return false
    }
    return true
}

function FilterKeyUp(d, f) {
    var a = d.parentNode.getAttribute("id");
    var c = d.textContent;
    if (c.length == 0) {
        if (localStorage) {
            try {
                localStorage.removeItem(a)
            } catch (f) {
            }
        } else {
            try {
                DeleteCookie(a)
            } catch (f) {
            }
        }
    } else {
        if (localStorage) {
            try {
                localStorage.setItem(a, c)
            } catch (f) {
            }
        } else {
            try {
                SetCookie(a, c)
            } catch (f) {
            }
        }
    }
    return true
}

function getFirstChild(a) {
    var c = a.firstChild;
    while (c != null && c.nodeType == 3) {
        c = c.nextSibling
    }
    return c
}

function ClearArea(c) {
    var a = c.parentNode.parentNode.getAttribute("id");
    getFirstChild(c.parentNode.parentNode).textContent = "";
    if (localStorage) {
        try {
            localStorage.removeItem(a)
        } catch (d) {
        }
    } else {
        try {
            DeleteCookie(a)
        } catch (d) {
        }
    }
    return false
}

function ClearAllAreas(f) {
    getFirstChild(f.parentNode.parentNode).textContent = "";
    if (localStorage) {
        var g = "TxtEdit-bd9483f9db67d0d0b7fa8650232b3c58";
        for (key in localStorage) {
            try {
                if (key.substring(0, g.length) === g) {
                    delete localStorage[key]
                }
            } catch (h) {
            }
        }
    } else {
        if (document.cookie && document.cookie != "") {
            var c = document.cookie.split(";");
            for (var a = 0; a < c.length; a++) {
                var d = c[a].split("=");
                d[0] = d[0].replace(/^ /, "");
                try {
                    DeleteCookie(d[0])
                } catch (h) {
                }
            }
        }
    }
    return false
}

function LoadArea() {
    var g = document.getElementsByClassName("textarea");
    for (var d = 0; d < g.length; d++) {
        var a = g[d].parentNode.getAttribute("id");
        var c = "";
        try {
            if (localStorage) {
                c = localStorage.getItem(a)
            } else {
                c = GetCookie(a)
            }
            if (c) {
                g[d].textContent = c
            }
        } catch (f) {
        }
    }
}

if (window.addEventListener) {
    window.addEventListener("load", LoadArea, false)
}
;
