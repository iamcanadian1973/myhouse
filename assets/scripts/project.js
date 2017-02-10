"use strict";

/*! 
* jQuery Double Tap To Go - v1.0.0 - 2015-04-20 - file
* http://github.com/zenopopovici/DoubleTapToGo
* Copyright (c) 2015 Graffino
*/
!function ($, window, document, undefined) {
  $.fn.doubleTapToGo = function (action) {
    return "ontouchstart" in window || navigator.msMaxTouchPoints || navigator.userAgent.toLowerCase().match(/windows phone os 7/i) ? (this.each("unbind" === action ? function () {
      $(this).off(), $(document).off("click touchstart MSPointerDown", handleTouch);
    } : function () {
      function handleTouch(e) {
        for (var resetItem = !0, parents = $(e.target).parents(), i = 0; i < parents.length; i++) {
          parents[i] == curItem[0] && (resetItem = !1);
        }resetItem && (curItem = !1);
      }var curItem = !1;$(this).on("click", function (e) {
        var item = $(this);item[0] != curItem[0] && (e.preventDefault(), curItem = item);
      }), $(document).on("click touchstart MSPointerDown", handleTouch);
    }), this) : !1;
  };
}(jQuery, window, document);
"use strict";

/*
 * Collapse plugin for jQuery
 * --
 * source: http://github.com/danielstocks/jQuery-Collapse/
 * site: http://webcloud.se/jQuery-Collapse
 *
 * @author Daniel Stocks (http://webcloud.se)
 * Copyright 2013, Daniel Stocks
 * Released under the MIT, BSD, and GPL Licenses.
 */

(function ($, exports) {

  // Constructor
  function Collapse(el, options) {
    options = options || {};
    var _this = this,
        query = options.query || "> :even";

    $.extend(_this, {
      $el: el,
      options: options,
      sections: [],
      isAccordion: options.accordion || false,
      db: options.persist ? jQueryCollapseStorage(el.get(0).id) : false
    });

    // Figure out what sections are open if storage is used
    _this.states = _this.db ? _this.db.read() : [];

    // For every pair of elements in given
    // element, create a section
    _this.$el.find(query).each(function () {
      new jQueryCollapseSection($(this), _this);
    });

    // Capute ALL the clicks!
    (function (scope) {
      _this.$el.on("click", "[data-collapse-summary] " + (scope.options.clickQuery || ""), $.proxy(_this.handleClick, scope));

      _this.$el.bind("toggle close open", $.proxy(_this.handleEvent, scope));
    })(_this);
  }

  Collapse.prototype = {
    handleClick: function handleClick(e, state) {
      e.preventDefault();
      state = state || "toggle";
      var sections = this.sections,
          l = sections.length;
      while (l--) {
        if ($.contains(sections[l].$summary[0], e.target)) {
          sections[l][state]();
          break;
        }
      }
    },
    handleEvent: function handleEvent(e) {
      if (e.target == this.$el.get(0)) return this[e.type]();
      this.handleClick(e, e.type);
    },
    open: function open(eq) {
      this._change("open", eq);
    },
    close: function close(eq) {
      this._change("close", eq);
    },
    toggle: function toggle(eq) {
      this._change("toggle", eq);
    },
    _change: function _change(action, eq) {
      if (isFinite(eq)) return this.sections[eq][action]();
      $.each(this.sections, function (i, section) {
        section[action]();
      });
    }
  };

  // Section constructor
  function Section($el, parent) {

    if (!parent.options.clickQuery) $el.wrapInner('<a href="#"/>');

    $.extend(this, {
      isOpen: false,
      $summary: $el.attr("data-collapse-summary", ""),
      $details: $el.next(),
      options: parent.options,
      parent: parent
    });
    parent.sections.push(this);

    // Check current state of section
    var state = parent.states[this._index()];

    if (state === 0) {
      this.close(true);
    } else if (this.$summary.is(".open") || state === 1) {
      this.open(true);
    } else {
      this.close(true);
    }
  }

  Section.prototype = {
    toggle: function toggle() {
      this.isOpen ? this.close() : this.open();
    },
    close: function close(bypass) {
      this._changeState("close", bypass);
    },
    open: function open(bypass) {
      var _this = this;
      if (_this.options.accordion && !bypass) {
        $.each(_this.parent.sections, function (i, section) {
          section.close();
        });
      }
      _this._changeState("open", bypass);
    },
    _index: function _index() {
      return $.inArray(this, this.parent.sections);
    },
    _changeState: function _changeState(state, bypass) {

      var _this = this;
      _this.isOpen = state == "open";
      if ($.isFunction(_this.options[state]) && !bypass) {
        _this.options[state].apply(_this.$details);
      } else {
        _this.$details[_this.isOpen ? "show" : "hide"]();
      }

      _this.$summary.toggleClass("open", state !== "close");
      _this.$details.attr("aria-hidden", state === "close");
      _this.$summary.attr("aria-expanded", state === "open");
      _this.$summary.trigger(state === "open" ? "opened" : "closed", _this);
      if (_this.parent.db) {
        _this.parent.db.write(_this._index(), _this.isOpen);
      }
    }
  };

  // Expose in jQuery API
  $.fn.extend({
    collapse: function collapse(options, scan) {
      var nodes = scan ? $("body").find("[data-collapse]") : $(this);
      return nodes.each(function () {
        var settings = scan ? {} : options,
            values = $(this).attr("data-collapse") || "";
        $.each(values.split(" "), function (i, v) {
          if (v) settings[v] = true;
        });
        new Collapse($(this), settings);
      });
    }
  });

  // Expose constructor to
  // global namespace
  exports.jQueryCollapse = Collapse;
  exports.jQueryCollapseSection = Section;

  //jQuery DOM Ready
  $(function () {
    $.fn.collapse(false, true);
  });
})(window.jQuery, window);
"use strict";

(function (c, k, l, m) {
  function n() {
    var a = c(this),
        b;if (b = a.is(":visible")) {
      b = a[0].getBoundingClientRect();var d = -a.data("jquery-lazyload-any").threshold,
          e = p - d,
          f = q - d;b = (b.top >= d && b.top <= e || b.bottom >= d && b.bottom <= e) && (b.left >= d && b.left <= f || b.right >= d && b.right <= f);
    }b && a.trigger("appear");
  }function r() {
    p = k.innerHeight || l.documentElement.clientHeight;q = k.innerWidth || l.documentElement.clientWidth;g();
  }function g() {
    h = h.filter(":jquery-lazyload-any-appear");1 == this.nodeType ? c(this).find(":jquery-lazyload-any-appear").each(n) : h.each(n);
  }function w() {
    var a = c(this),
        b = a.data("jquery-lazyload-any"),
        d = a.contents().filter(function () {
      return 8 === this.nodeType;
    }).get(0),
        d = c(d && c.trim(d.data));a.replaceWith(d);c.isFunction(b.load) && b.load.call(d, d);
  }function t() {
    var a = c(this),
        b;a.data("jquery-lazyload-any-scroller") ? b = !1 : (b = a.css("overflow"), "scroll" != b && "auto" != b ? b = !1 : (a.data("jquery-lazyload-any-scroller", 1), a.bind("scroll", g), b = !0));var d;a.data("jquery-lazyload-any-display") ? d = void 0 : "none" != a.css("display") ? d = void 0 : (a.data("jquery-lazyload-any-display", 1), a._bindShow(g), d = !0);b | d && !a.data("jquery-lazyload-any-watch") && (a.data("jquery-lazyload-any-watch", 1), a.bind("appear", u));
  }function u() {
    var a = c(this);0 === a.find(":jquery-lazyload-any-appear").length && (a.removeData("jquery-lazyload-any-scroller").removeData("jquery-lazyload-any-display").removeData("jquery-lazyload-any-watch"), a.unbind("scroll", g).unbind("appear", u)._unbindShow(g));
  }var p,
      q,
      v = !1,
      h = c();c.expr[":"]["jquery-lazyload-any-appear"] = function (a) {
    return c(a).data("jquery-lazyload-any-appear") !== m;
  };c.fn.lazyload = function (a) {
    var b = { threshold: 0, trigger: "appear" };c.extend(b, a);a = b.trigger.split(" ");this.data("jquery-lazyload-any-appear", -1 != c.inArray("appear", a)).data("jquery-lazyload-any", b);this.bind(b.trigger, w);this.each(n);this.parents().each(t);this.each(function () {
      h = h.add(this);
    });v || (v = !0, r(), c(l).ready(function () {
      c(k).bind("resize", r).bind("scroll", g);
    }));return this;
  };c.lazyload = { check: g, refresh: function refresh(a) {
      (a === m ? h : c(a)).each(function () {
        var a = c(this);a.is(":jquery-lazyload-any-appear") && a.parents().each(t);
      });
    } };(function () {
    function a() {
      var a = c(this),
          b = "none" != a.css("display");a.data("jquery-lazyload-any-show") != b && (a.data("jquery-lazyload-any-show", b), b && a.trigger("show"));
    }function b() {
      f = f.filter(":jquery-lazyload-any-show");f.each(a);0 === f.length && (e = clearInterval(e));
    }var d = 50,
        e,
        f = c();c.expr[":"]["jquery-lazyload-any-show"] = function (a) {
      return c(a).data("jquery-lazyload-any-show") !== m;
    };c.fn._bindShow = function (a) {
      this.bind("show", a);this.data("jquery-lazyload-any-show", "none" != this.css("display"));
      f = f.add(this);d && !e && (e = setInterval(b, d));
    };c.fn._unbindShow = function (a) {
      this.unbind("show", a);this.removeData("jquery-lazyload-any-show");
    };c.lazyload.setInterval = function (a) {
      a == d || !c.isNumeric(a) || 0 > a || (d = a, e = clearInterval(e), 0 < d && (e = setInterval(b, d)));
    };
  })();
})(jQuery, window, document);
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
* jquery.matchHeight-min.js master
* v0.6.0. 
* http://brm.io/jquery-match-height/
* License: MIT
*/
(function (c) {
  var n = -1,
      f = -1,
      g = function g(a) {
    return parseFloat(a) || 0;
  },
      r = function r(a) {
    var b = null,
        d = [];c(a).each(function () {
      var a = c(this),
          k = a.offset().top - g(a.css("margin-top")),
          l = 0 < d.length ? d[d.length - 1] : null;null === l ? d.push(a) : 1 >= Math.floor(Math.abs(b - k)) ? d[d.length - 1] = l.add(a) : d.push(a);b = k;
    });return d;
  },
      p = function p(a) {
    var b = { byRow: !0, property: "height", target: null, remove: !1 };if ("object" === (typeof a === "undefined" ? "undefined" : _typeof(a))) return c.extend(b, a);"boolean" === typeof a ? b.byRow = a : "remove" === a && (b.remove = !0);return b;
  },
      b = c.fn.matchHeight = function (a) {
    a = p(a);if (a.remove) {
      var e = this;this.css(a.property, "");c.each(b._groups, function (a, b) {
        b.elements = b.elements.not(e);
      });return this;
    }if (1 >= this.length && !a.target) return this;b._groups.push({ elements: this, options: a });b._apply(this, a);return this;
  };b._groups = [];b._throttle = 80;b._maintainScroll = !1;b._beforeUpdate = null;b._afterUpdate = null;b._apply = function (a, e) {
    var d = p(e),
        h = c(a),
        k = [h],
        l = c(window).scrollTop(),
        f = c("html").outerHeight(!0),
        m = h.parents().filter(":hidden");m.each(function () {
      var a = c(this);
      a.data("style-cache", a.attr("style"));
    });m.css("display", "block");d.byRow && !d.target && (h.each(function () {
      var a = c(this),
          b = a.css("display");"inline-block" !== b && "inline-flex" !== b && (b = "block");a.data("style-cache", a.attr("style"));a.css({ display: b, "padding-top": "0", "padding-bottom": "0", "margin-top": "0", "margin-bottom": "0", "border-top-width": "0", "border-bottom-width": "0", height: "100px" });
    }), k = r(h), h.each(function () {
      var a = c(this);a.attr("style", a.data("style-cache") || "");
    }));c.each(k, function (a, b) {
      var e = c(b),
          f = 0;if (d.target) f = d.target.outerHeight(!1);else {
        if (d.byRow && 1 >= e.length) {
          e.css(d.property, "");return;
        }e.each(function () {
          var a = c(this),
              b = a.css("display");"inline-block" !== b && "inline-flex" !== b && (b = "block");b = { display: b };b[d.property] = "";a.css(b);a.outerHeight(!1) > f && (f = a.outerHeight(!1));a.css("display", "");
        });
      }e.each(function () {
        var a = c(this),
            b = 0;d.target && a.is(d.target) || ("border-box" !== a.css("box-sizing") && (b += g(a.css("border-top-width")) + g(a.css("border-bottom-width")), b += g(a.css("padding-top")) + g(a.css("padding-bottom"))), a.css(d.property, f - b + "px"));
      });
    });m.each(function () {
      var a = c(this);a.attr("style", a.data("style-cache") || null);
    });b._maintainScroll && c(window).scrollTop(l / f * c("html").outerHeight(!0));return this;
  };b._applyDataApi = function () {
    var a = {};c("[data-match-height], [data-mh]").each(function () {
      var b = c(this),
          d = b.attr("data-mh") || b.attr("data-match-height");a[d] = d in a ? a[d].add(b) : b;
    });c.each(a, function () {
      this.matchHeight(!0);
    });
  };var q = function q(a) {
    b._beforeUpdate && b._beforeUpdate(a, b._groups);c.each(b._groups, function () {
      b._apply(this.elements, this.options);
    });b._afterUpdate && b._afterUpdate(a, b._groups);
  };b._update = function (a, e) {
    if (e && "resize" === e.type) {
      var d = c(window).width();if (d === n) return;n = d;
    }a ? -1 === f && (f = setTimeout(function () {
      q(e);f = -1;
    }, b._throttle)) : q(e);
  };c(b._applyDataApi);c(window).bind("load", function (a) {
    b._update(!1, a);
  });c(window).bind("resize orientationchange", function (a) {
    b._update(!0, a);
  });
})(jQuery);
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// jQuery RoyalSlider plugin. Custom build. Copyright 2011-2015 Dmitry Semenov http://dimsemenov.com 
// http://dimsemenov.com/private/home.php?build=bullets_thumbnails_autoplay_animated-blocks_auto-height_global-caption 
// jquery.royalslider v9.5.7
(function (n) {
  function v(b, f) {
    var c,
        a = this,
        e = window.navigator,
        g = e.userAgent.toLowerCase();a.uid = n.rsModules.uid++;a.ns = ".rs" + a.uid;var d = document.createElement("div").style,
        h = ["webkit", "Moz", "ms", "O"],
        k = "",
        l = 0,
        q;for (c = 0; c < h.length; c++) {
      q = h[c], !k && q + "Transform" in d && (k = q), q = q.toLowerCase(), window.requestAnimationFrame || (window.requestAnimationFrame = window[q + "RequestAnimationFrame"], window.cancelAnimationFrame = window[q + "CancelAnimationFrame"] || window[q + "CancelRequestAnimationFrame"]);
    }window.requestAnimationFrame || (window.requestAnimationFrame = function (a, b) {
      var c = new Date().getTime(),
          d = Math.max(0, 16 - (c - l)),
          e = window.setTimeout(function () {
        a(c + d);
      }, d);l = c + d;return e;
    });window.cancelAnimationFrame || (window.cancelAnimationFrame = function (a) {
      clearTimeout(a);
    });a.isIPAD = g.match(/(ipad)/);a.isIOS = a.isIPAD || g.match(/(iphone|ipod)/);c = function (a) {
      a = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || 0 > a.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];return { browser: a[1] || "", version: a[2] || "0" };
    }(g);h = {};c.browser && (h[c.browser] = !0, h.version = c.version);h.chrome && (h.webkit = !0);a._a = h;a.isAndroid = -1 < g.indexOf("android");a.slider = n(b);a.ev = n(a);a._b = n(document);a.st = n.extend({}, n.fn.royalSlider.defaults, f);a._c = a.st.transitionSpeed;a._d = 0;!a.st.allowCSS3 || h.webkit && !a.st.allowCSS3OnWebkit || (c = k + (k ? "T" : "t"), a._e = c + "ransform" in d && c + "ransition" in d, a._e && (a._f = k + (k ? "P" : "p") + "erspective" in d));k = k.toLowerCase();a._g = "-" + k + "-";a._h = "vertical" === a.st.slidesOrientation ? !1 : !0;a._i = a._h ? "left" : "top";a._j = a._h ? "width" : "height";a._k = -1;a._l = "fade" === a.st.transitionType ? !1 : !0;a._l || (a.st.sliderDrag = !1, a._m = 10);a._n = "z-index:0; display:none; opacity:0;";a._o = 0;a._p = 0;a._q = 0;n.each(n.rsModules, function (b, c) {
      "uid" !== b && c.call(a);
    });a.slides = [];a._r = 0;(a.st.slides ? n(a.st.slides) : a.slider.children().detach()).each(function () {
      a._s(this, !0);
    });a.st.randomizeSlides && a.slides.sort(function () {
      return .5 - Math.random();
    });a.numSlides = a.slides.length;a._t();a.st.startSlideId ? a.st.startSlideId > a.numSlides - 1 && (a.st.startSlideId = a.numSlides - 1) : a.st.startSlideId = 0;a._o = a.staticSlideId = a.currSlideId = a._u = a.st.startSlideId;a.currSlide = a.slides[a.currSlideId];a._v = 0;a.pointerMultitouch = !1;a.slider.addClass((a._h ? "rsHor" : "rsVer") + (a._l ? "" : " rsFade"));d = '<div class="rsOverflow"><div class="rsContainer">';a.slidesSpacing = a.st.slidesSpacing;a._w = (a._h ? a.slider.width() : a.slider.height()) + a.st.slidesSpacing;a._x = Boolean(0 < a._y);1 >= a.numSlides && (a._z = !1);a._a1 = a._z && a._l ? 2 === a.numSlides ? 1 : 2 : 0;a._b1 = 6 > a.numSlides ? a.numSlides : 6;a._c1 = 0;a._d1 = 0;a.slidesJQ = [];for (c = 0; c < a.numSlides; c++) {
      a.slidesJQ.push(n('<div style="' + (a._l ? "" : c !== a.currSlideId ? a._n : "z-index:0;") + '" class="rsSlide "></div>'));
    }a._e1 = d = n(d + "</div></div>");var m = a.ns,
        k = function k(b, c, d, e, f) {
      a._j1 = b + c + m;a._k1 = b + d + m;a._l1 = b + e + m;f && (a._m1 = b + f + m);
    };c = e.pointerEnabled;a.pointerEnabled = c || e.msPointerEnabled;a.pointerEnabled ? (a.hasTouch = !1, a._n1 = .2, a.pointerMultitouch = Boolean(1 < e[(c ? "m" : "msM") + "axTouchPoints"]), c ? k("pointer", "down", "move", "up", "cancel") : k("MSPointer", "Down", "Move", "Up", "Cancel")) : (a.isIOS ? a._j1 = a._k1 = a._l1 = a._m1 = "" : k("mouse", "down", "move", "up"), "ontouchstart" in window || "createTouch" in document ? (a.hasTouch = !0, a._j1 += " touchstart" + m, a._k1 += " touchmove" + m, a._l1 += " touchend" + m, a._m1 += " touchcancel" + m, a._n1 = .5, a.st.sliderTouch && (a._f1 = !0)) : (a.hasTouch = !1, a._n1 = .2));a.st.sliderDrag && (a._f1 = !0, h.msie || h.opera ? a._g1 = a._h1 = "move" : h.mozilla ? (a._g1 = "-moz-grab", a._h1 = "-moz-grabbing") : h.webkit && -1 != e.platform.indexOf("Mac") && (a._g1 = "-webkit-grab", a._h1 = "-webkit-grabbing"), a._i1());a.slider.html(d);a._o1 = a.st.controlsInside ? a._e1 : a.slider;a._p1 = a._e1.children(".rsContainer");a.pointerEnabled && a._p1.css((c ? "" : "-ms-") + "touch-action", a._h ? "pan-y" : "pan-x");a._q1 = n('<div class="rsPreloader"></div>');e = a._p1.children(".rsSlide");a._r1 = a.slidesJQ[a.currSlideId];a._s1 = 0;a._e ? (a._t1 = "transition-property", a._u1 = "transition-duration", a._v1 = "transition-timing-function", a._w1 = a._x1 = a._g + "transform", a._f ? (h.webkit && !h.chrome && a.slider.addClass("rsWebkit3d"), a._y1 = "translate3d(", a._z1 = "px, ", a._a2 = "px, 0px)") : (a._y1 = "translate(", a._z1 = "px, ", a._a2 = "px)"), a._l ? a._p1[a._g + a._t1] = a._g + "transform" : (h = {}, h[a._g + a._t1] = "opacity", h[a._g + a._u1] = a.st.transitionSpeed + "ms", h[a._g + a._v1] = a.st.css3easeInOut, e.css(h))) : (a._x1 = "left", a._w1 = "top");var p;n(window).on("resize" + a.ns, function () {
      p && clearTimeout(p);p = setTimeout(function () {
        a.updateSliderSize();
      }, 50);
    });a.ev.trigger("rsAfterPropsSetup");a.updateSliderSize();a.st.keyboardNavEnabled && a._b2();a.st.arrowsNavHideOnTouch && (a.hasTouch || a.pointerMultitouch) && (a.st.arrowsNav = !1);a.st.arrowsNav && (e = a._o1, n('<div class="rsArrow rsArrowLeft"><div class="rsArrowIcn"></div></div><div class="rsArrow rsArrowRight"><div class="rsArrowIcn"></div></div>').appendTo(e), a._c2 = e.children(".rsArrowLeft").click(function (b) {
      b.preventDefault();a.prev();
    }), a._d2 = e.children(".rsArrowRight").click(function (b) {
      b.preventDefault();a.next();
    }), a.st.arrowsNavAutoHide && !a.hasTouch && (a._c2.addClass("rsHidden"), a._d2.addClass("rsHidden"), e.one("mousemove.arrowshover", function () {
      a._c2.removeClass("rsHidden");a._d2.removeClass("rsHidden");
    }), e.hover(function () {
      a._e2 || (a._c2.removeClass("rsHidden"), a._d2.removeClass("rsHidden"));
    }, function () {
      a._e2 || (a._c2.addClass("rsHidden"), a._d2.addClass("rsHidden"));
    })), a.ev.on("rsOnUpdateNav", function () {
      a._f2();
    }), a._f2());if (a.hasTouch && a.st.sliderTouch || !a.hasTouch && a.st.sliderDrag) a._p1.on(a._j1, function (b) {
      a._g2(b);
    });else a.dragSuccess = !1;var r = ["rsPlayBtnIcon", "rsPlayBtn", "rsCloseVideoBtn", "rsCloseVideoIcn"];a._p1.click(function (b) {
      if (!a.dragSuccess) {
        var c = n(b.target).attr("class");if (-1 !== n.inArray(c, r) && a.toggleVideo()) return !1;if (a.st.navigateByClick && !a._h2) {
          if (n(b.target).closest(".rsNoDrag", a._r1).length) return !0;a._i2(b);
        }a.ev.trigger("rsSlideClick", b);
      }
    }).on("click.rs", "a", function (b) {
      if (a.dragSuccess) return !1;a._h2 = !0;setTimeout(function () {
        a._h2 = !1;
      }, 3);
    });a.ev.trigger("rsAfterInit");
  }n.rsModules || (n.rsModules = { uid: 0 });v.prototype = { constructor: v, _i2: function _i2(b) {
      b = b[this._h ? "pageX" : "pageY"] - this._j2;b >= this._q ? this.next() : 0 > b && this.prev();
    }, _t: function _t() {
      var b;
      b = this.st.numImagesToPreload;if (this._z = this.st.loop) 2 === this.numSlides ? (this._z = !1, this.st.loopRewind = !0) : 2 > this.numSlides && (this.st.loopRewind = this._z = !1);this._z && 0 < b && (4 >= this.numSlides ? b = 1 : this.st.numImagesToPreload > (this.numSlides - 1) / 2 && (b = Math.floor((this.numSlides - 1) / 2)));this._y = b;
    }, _s: function _s(b, f) {
      function c(b, c) {
        c ? g.images.push(b.attr(c)) : g.images.push(b.text());if (h) {
          h = !1;g.caption = "src" === c ? b.attr("alt") : b.contents();g.image = g.images[0];g.videoURL = b.attr("data-rsVideo");var d = b.attr("data-rsw"),
              e = b.attr("data-rsh");"undefined" !== typeof d && !1 !== d && "undefined" !== typeof e && !1 !== e ? (g.iW = parseInt(d, 10), g.iH = parseInt(e, 10)) : a.st.imgWidth && a.st.imgHeight && (g.iW = a.st.imgWidth, g.iH = a.st.imgHeight);
        }
      }var a = this,
          e,
          g = {},
          d,
          h = !0;b = n(b);a._k2 = b;a.ev.trigger("rsBeforeParseNode", [b, g]);if (!g.stopParsing) return b = a._k2, g.id = a._r, g.contentAdded = !1, a._r++, g.images = [], g.isBig = !1, g.hasCover || (b.hasClass("rsImg") ? (d = b, e = !0) : (d = b.find(".rsImg"), d.length && (e = !0)), e ? (g.bigImage = d.eq(0).attr("data-rsBigImg"), d.each(function () {
        var a = n(this);a.is("a") ? c(a, "href") : a.is("img") ? c(a, "src") : c(a);
      })) : b.is("img") && (b.addClass("rsImg rsMainSlideImage"), c(b, "src"))), d = b.find(".rsCaption"), d.length && (g.caption = d.remove()), g.content = b, a.ev.trigger("rsAfterParseNode", [b, g]), f && a.slides.push(g), 0 === g.images.length && (g.isLoaded = !0, g.isRendered = !1, g.isLoading = !1, g.images = null), g;
    }, _b2: function _b2() {
      var b = this,
          f,
          c,
          a = function a(_a) {
        37 === _a ? b.prev() : 39 === _a && b.next();
      };b._b.on("keydown" + b.ns, function (e) {
        if (!b.st.keyboardNavEnabled) return !0;if (!(b._l2 || (c = e.keyCode, 37 !== c && 39 !== c || f))) {
          if (document.activeElement && /(INPUT|SELECT|TEXTAREA)/i.test(document.activeElement.tagName)) return !0;b.isFullscreen && e.preventDefault();a(c);f = setInterval(function () {
            a(c);
          }, 700);
        }
      }).on("keyup" + b.ns, function (a) {
        f && (clearInterval(f), f = null);
      });
    }, goTo: function goTo(b, f) {
      b !== this.currSlideId && this._m2(b, this.st.transitionSpeed, !0, !f);
    }, destroy: function destroy(b) {
      this.ev.trigger("rsBeforeDestroy");this._b.off("keydown" + this.ns + " keyup" + this.ns + " " + this._k1 + " " + this._l1);this._p1.off(this._j1 + " click");this.slider.data("royalSlider", null);n.removeData(this.slider, "royalSlider");n(window).off("resize" + this.ns);this.loadingTimeout && clearTimeout(this.loadingTimeout);b && this.slider.remove();this.ev = this.slider = this.slides = null;
    }, _n2: function _n2(b, f) {
      function c(c, f, g) {
        c.isAdded ? (a(f, c), e(f, c)) : (g || (g = d.slidesJQ[f]), c.holder ? g = c.holder : (g = d.slidesJQ[f] = n(g), c.holder = g), c.appendOnLoaded = !1, e(f, c, g), a(f, c), d._p2(c, g, b), c.isAdded = !0);
      }function a(a, c) {
        c.contentAdded || (d.setItemHtml(c, b), b || (c.contentAdded = !0));
      }function e(a, b, c) {
        d._l && (c || (c = d.slidesJQ[a]), c.css(d._i, (a + d._d1 + p) * d._w));
      }function g(a) {
        if (l) {
          if (a > q - 1) return g(a - q);if (0 > a) return g(q + a);
        }return a;
      }var d = this,
          h,
          k,
          l = d._z,
          q = d.numSlides;if (!isNaN(f)) return g(f);var m = d.currSlideId,
          p,
          r = b ? Math.abs(d._o2 - d.currSlideId) >= d.numSlides - 1 ? 0 : 1 : d._y,
          t = Math.min(2, r),
          w = !1,
          v = !1,
          u;for (k = m; k < m + 1 + t; k++) {
        if (u = g(k), (h = d.slides[u]) && (!h.isAdded || !h.positionSet)) {
          w = !0;break;
        }
      }for (k = m - 1; k > m - 1 - t; k--) {
        if (u = g(k), (h = d.slides[u]) && (!h.isAdded || !h.positionSet)) {
          v = !0;break;
        }
      }if (w) for (k = m; k < m + r + 1; k++) {
        u = g(k), p = Math.floor((d._u - (m - k)) / d.numSlides) * d.numSlides, (h = d.slides[u]) && c(h, u);
      }if (v) for (k = m - 1; k > m - 1 - r; k--) {
        u = g(k), p = Math.floor((d._u - (m - k)) / q) * q, (h = d.slides[u]) && c(h, u);
      }if (!b) for (t = g(m - r), m = g(m + r), r = t > m ? 0 : t, k = 0; k < q; k++) {
        t > m && k > t - 1 || !(k < r || k > m) || (h = d.slides[k]) && h.holder && (h.holder.detach(), h.isAdded = !1);
      }
    }, setItemHtml: function setItemHtml(b, f) {
      var c = this,
          a = function a() {
        if (!b.images) b.isRendered = !0, b.isLoaded = !0, b.isLoading = !1, d(!0);else if (!b.isLoading) {
          var a, f;b.content.hasClass("rsImg") ? (a = b.content, f = !0) : a = b.content.find(".rsImg:not(img)");a && !a.is("img") && a.each(function () {
            var a = n(this),
                c = '<img class="rsImg" src="' + (a.is("a") ? a.attr("href") : a.text()) + '" />';f ? b.content = n(c) : a.replaceWith(c);
          });a = f ? b.content : b.content.find("img.rsImg");k();a.eq(0).addClass("rsMainSlideImage");b.iW && b.iH && (b.isLoaded || c._q2(b), d());b.isLoading = !0;if (b.isBig) n("<img />").on("load.rs error.rs", function (a) {
            n(this).off("load.rs error.rs");e([this], !0);
          }).attr("src", b.image);else {
            b.loaded = [];b.numStartedLoad = 0;a = function a(_a2) {
              n(this).off("load.rs error.rs");
              b.loaded.push(this);b.loaded.length === b.numStartedLoad && e(b.loaded, !1);
            };for (var g = 0; g < b.images.length; g++) {
              var h = n("<img />");b.numStartedLoad++;h.on("load.rs error.rs", a).attr("src", b.images[g]);
            }
          }
        }
      },
          e = function e(a, c) {
        if (a.length) {
          var d = a[0];if (c !== b.isBig) (d = b.holder.children()) && 1 < d.length && l();else if (b.iW && b.iH) g();else if (b.iW = d.width, b.iH = d.height, b.iW && b.iH) g();else {
            var e = new Image();e.onload = function () {
              e.width ? (b.iW = e.width, b.iH = e.height, g()) : setTimeout(function () {
                e.width && (b.iW = e.width, b.iH = e.height);g();
              }, 1E3);
            };e.src = d.src;
          }
        } else g();
      },
          g = function g() {
        b.isLoaded = !0;b.isLoading = !1;d();l();h();
      },
          d = function d() {
        if (!b.isAppended && c.ev) {
          var a = c.st.visibleNearby,
              d = b.id - c._o;f || b.appendOnLoaded || !c.st.fadeinLoadedSlide || 0 !== d && (!(a || c._r2 || c._l2) || -1 !== d && 1 !== d) || (a = { visibility: "visible", opacity: 0 }, a[c._g + "transition"] = "opacity 400ms ease-in-out", b.content.css(a), setTimeout(function () {
            b.content.css("opacity", 1);
          }, 16));b.holder.find(".rsPreloader").length ? b.holder.append(b.content) : b.holder.html(b.content);
          b.isAppended = !0;b.isLoaded && (c._q2(b), h());b.sizeReady || (b.sizeReady = !0, setTimeout(function () {
            c.ev.trigger("rsMaybeSizeReady", b);
          }, 100));
        }
      },
          h = function h() {
        !b.loadedTriggered && c.ev && (b.isLoaded = b.loadedTriggered = !0, b.holder.trigger("rsAfterContentSet"), c.ev.trigger("rsAfterContentSet", b));
      },
          k = function k() {
        c.st.usePreloader && b.holder.html(c._q1.clone());
      },
          l = function l(a) {
        c.st.usePreloader && (a = b.holder.find(".rsPreloader"), a.length && a.remove());
      };b.isLoaded ? d() : f ? !c._l && b.images && b.iW && b.iH ? a() : (b.holder.isWaiting = !0, k(), b.holder.slideId = -99) : a();
    }, _p2: function _p2(b, f, c) {
      this._p1.append(b.holder);b.appendOnLoaded = !1;
    }, _g2: function _g2(b, f) {
      var c = this,
          a,
          e = "touchstart" === b.type;c._s2 = e;c.ev.trigger("rsDragStart");if (n(b.target).closest(".rsNoDrag", c._r1).length) return c.dragSuccess = !1, !0;!f && c._r2 && (c._t2 = !0, c._u2());c.dragSuccess = !1;if (c._l2) e && (c._v2 = !0);else {
        e && (c._v2 = !1);c._w2();if (e) {
          var g = b.originalEvent.touches;if (g && 0 < g.length) a = g[0], 1 < g.length && (c._v2 = !0);else return;
        } else b.preventDefault(), a = b, c.pointerEnabled && (a = a.originalEvent);c._l2 = !0;c._b.on(c._k1, function (a) {
          c._x2(a, f);
        }).on(c._l1, function (a) {
          c._y2(a, f);
        });c._z2 = "";c._a3 = !1;c._b3 = a.pageX;c._c3 = a.pageY;c._d3 = c._v = (f ? c._e3 : c._h) ? a.pageX : a.pageY;c._f3 = 0;c._g3 = 0;c._h3 = f ? c._i3 : c._p;c._j3 = new Date().getTime();if (e) c._e1.on(c._m1, function (a) {
          c._y2(a, f);
        });
      }
    }, _k3: function _k3(b, f) {
      if (this._l3) {
        var c = this._m3,
            a = b.pageX - this._b3,
            e = b.pageY - this._c3,
            g = this._h3 + a,
            d = this._h3 + e,
            h = f ? this._e3 : this._h,
            g = h ? g : d,
            d = this._z2;this._a3 = !0;this._b3 = b.pageX;this._c3 = b.pageY;"x" === d && 0 !== a ? this._f3 = 0 < a ? 1 : -1 : "y" === d && 0 !== e && (this._g3 = 0 < e ? 1 : -1);d = h ? this._b3 : this._c3;a = h ? a : e;f ? g > this._n3 ? g = this._h3 + a * this._n1 : g < this._o3 && (g = this._h3 + a * this._n1) : this._z || (0 >= this.currSlideId && 0 < d - this._d3 && (g = this._h3 + a * this._n1), this.currSlideId >= this.numSlides - 1 && 0 > d - this._d3 && (g = this._h3 + a * this._n1));this._h3 = g;200 < c - this._j3 && (this._j3 = c, this._v = d);f ? this._q3(this._h3) : this._l && this._p3(this._h3);
      }
    }, _x2: function _x2(b, f) {
      var c = this,
          a,
          e = "touchmove" === b.type;if (!c._s2 || e) {
        if (e) {
          if (c._r3) return;var g = b.originalEvent.touches;if (g) {
            if (1 < g.length) return;a = g[0];
          } else return;
        } else a = b, c.pointerEnabled && (a = a.originalEvent);c._a3 || (c._e && (f ? c._s3 : c._p1).css(c._g + c._u1, "0s"), function h() {
          c._l2 && (c._t3 = requestAnimationFrame(h), c._u3 && c._k3(c._u3, f));
        }());if (c._l3) b.preventDefault(), c._m3 = new Date().getTime(), c._u3 = a;else if (g = f ? c._e3 : c._h, a = Math.abs(a.pageX - c._b3) - Math.abs(a.pageY - c._c3) - (g ? -7 : 7), 7 < a) {
          if (g) b.preventDefault(), c._z2 = "x";else if (e) {
            c._v3(b);return;
          }c._l3 = !0;
        } else if (-7 > a) {
          if (!g) b.preventDefault(), c._z2 = "y";else if (e) {
            c._v3(b);return;
          }c._l3 = !0;
        }
      }
    }, _v3: function _v3(b, f) {
      this._r3 = !0;this._a3 = this._l2 = !1;this._y2(b);
    }, _y2: function _y2(b, f) {
      function c(a) {
        return 100 > a ? 100 : 500 < a ? 500 : a;
      }function a(a, b) {
        if (e._l || f) h = (-e._u - e._d1) * e._w, k = Math.abs(e._p - h), e._c = k / b, a && (e._c += 250), e._c = c(e._c), e._x3(h, !1);
      }var e = this,
          g,
          d,
          h,
          k;g = -1 < b.type.indexOf("touch");if (!e._s2 || g) if (e._s2 = !1, e.ev.trigger("rsDragRelease"), e._u3 = null, e._l2 = !1, e._r3 = !1, e._l3 = !1, e._m3 = 0, cancelAnimationFrame(e._t3), e._a3 && (f ? e._q3(e._h3) : e._l && e._p3(e._h3)), e._b.off(e._k1).off(e._l1), g && e._e1.off(e._m1), e._i1(), !e._a3 && !e._v2 && f && e._w3) {
        var l = n(b.target).closest(".rsNavItem");l.length && e.goTo(l.index());
      } else {
        d = f ? e._e3 : e._h;if (!e._a3 || "y" === e._z2 && d || "x" === e._z2 && !d) {
          if (!f && e._t2) {
            e._t2 = !1;if (e.st.navigateByClick) {
              e._i2(e.pointerEnabled ? b.originalEvent : b);e.dragSuccess = !0;return;
            }e.dragSuccess = !0;
          } else {
            e._t2 = !1;e.dragSuccess = !1;return;
          }
        } else e.dragSuccess = !0;e._t2 = !1;e._z2 = "";var q = e.st.minSlideOffset;g = g ? b.originalEvent.changedTouches[0] : e.pointerEnabled ? b.originalEvent : b;var m = d ? g.pageX : g.pageY,
            p = e._d3;g = e._v;var r = e.currSlideId,
            t = e.numSlides,
            w = d ? e._f3 : e._g3,
            v = e._z;Math.abs(m - p);g = m - g;d = new Date().getTime() - e._j3;d = Math.abs(g) / d;if (0 === w || 1 >= t) a(!0, d);else {
          if (!v && !f) if (0 >= r) {
            if (0 < w) {
              a(!0, d);return;
            }
          } else if (r >= t - 1 && 0 > w) {
            a(!0, d);return;
          }if (f) {
            h = e._i3;if (h > e._n3) h = e._n3;else if (h < e._o3) h = e._o3;else {
              m = d * d / .006;l = -e._i3;p = e._y3 - e._z3 + e._i3;0 < g && m > l ? (l += e._z3 / (15 / (m / d * .003)), d = d * l / m, m = l) : 0 > g && m > p && (p += e._z3 / (15 / (m / d * .003)), d = d * p / m, m = p);l = Math.max(Math.round(d / .003), 50);h += m * (0 > g ? -1 : 1);if (h > e._n3) {
                e._a4(h, l, !0, e._n3, 200);return;
              }if (h < e._o3) {
                e._a4(h, l, !0, e._o3, 200);return;
              }
            }e._a4(h, l, !0);
          } else l = function l(a) {
            var b = Math.floor(a / e._w);a - b * e._w > q && b++;return b;
          }, p + q < m ? 0 > w ? a(!1, d) : (l = l(m - p), e._m2(e.currSlideId - l, c(Math.abs(e._p - (-e._u - e._d1 + l) * e._w) / d), !1, !0, !0)) : p - q > m ? 0 < w ? a(!1, d) : (l = l(p - m), e._m2(e.currSlideId + l, c(Math.abs(e._p - (-e._u - e._d1 - l) * e._w) / d), !1, !0, !0)) : a(!1, d);
        }
      }
    }, _p3: function _p3(b) {
      b = this._p = b;this._e ? this._p1.css(this._x1, this._y1 + (this._h ? b + this._z1 + 0 : 0 + this._z1 + b) + this._a2) : this._p1.css(this._h ? this._x1 : this._w1, b);
    }, updateSliderSize: function updateSliderSize(b) {
      var f, c;if (this.slider) {
        if (this.st.autoScaleSlider) {
          var a = this.st.autoScaleSliderWidth,
              e = this.st.autoScaleSliderHeight;this.st.autoScaleHeight ? (f = this.slider.width(), f != this.width && (this.slider.css("height", e / a * f), f = this.slider.width()), c = this.slider.height()) : (c = this.slider.height(), c != this.height && (this.slider.css("width", a / e * c), c = this.slider.height()), f = this.slider.width());
        } else f = this.slider.width(), c = this.slider.height();if (b || f != this.width || c != this.height) {
          this.width = f;this.height = c;this._b4 = f;this._c4 = c;this.ev.trigger("rsBeforeSizeSet");this.ev.trigger("rsAfterSizePropSet");this._e1.css({ width: this._b4, height: this._c4 });this._w = (this._h ? this._b4 : this._c4) + this.st.slidesSpacing;this._d4 = this.st.imageScalePadding;for (f = 0; f < this.slides.length; f++) {
            b = this.slides[f], b.positionSet = !1, b && b.images && b.isLoaded && (b.isRendered = !1, this._q2(b));
          }if (this._e4) for (f = 0; f < this._e4.length; f++) {
            b = this._e4[f], b.holder.css(this._i, (b.id + this._d1) * this._w);
          }this._n2();this._l && (this._e && this._p1.css(this._g + "transition-duration", "0s"), this._p3((-this._u - this._d1) * this._w));this.ev.trigger("rsOnUpdateNav");
        }this._j2 = this._e1.offset();this._j2 = this._j2[this._i];
      }
    }, appendSlide: function appendSlide(b, f) {
      var c = this._s(b);if (isNaN(f) || f > this.numSlides) f = this.numSlides;this.slides.splice(f, 0, c);this.slidesJQ.splice(f, 0, n('<div style="' + (this._l ? "position:absolute;" : this._n) + '" class="rsSlide"></div>'));f <= this.currSlideId && this.currSlideId++;this.ev.trigger("rsOnAppendSlide", [c, f]);this._f4(f);f === this.currSlideId && this.ev.trigger("rsAfterSlideChange");
    }, removeSlide: function removeSlide(b) {
      var f = this.slides[b];f && (f.holder && f.holder.remove(), b < this.currSlideId && this.currSlideId--, this.slides.splice(b, 1), this.slidesJQ.splice(b, 1), this.ev.trigger("rsOnRemoveSlide", [b]), this._f4(b), b === this.currSlideId && this.ev.trigger("rsAfterSlideChange"));
    }, _f4: function _f4(b) {
      var f = this;b = f.numSlides;b = 0 >= f._u ? 0 : Math.floor(f._u / b);f.numSlides = f.slides.length;0 === f.numSlides ? (f.currSlideId = f._d1 = f._u = 0, f.currSlide = f._g4 = null) : f._u = b * f.numSlides + f.currSlideId;for (b = 0; b < f.numSlides; b++) {
        f.slides[b].id = b;
      }f.currSlide = f.slides[f.currSlideId];f._r1 = f.slidesJQ[f.currSlideId];f.currSlideId >= f.numSlides ? f.goTo(f.numSlides - 1) : 0 > f.currSlideId && f.goTo(0);f._t();f._l && f._p1.css(f._g + f._u1, "0ms");f._h4 && clearTimeout(f._h4);f._h4 = setTimeout(function () {
        f._l && f._p3((-f._u - f._d1) * f._w);f._n2();f._l || f._r1.css({ display: "block", opacity: 1 });
      }, 14);f.ev.trigger("rsOnUpdateNav");
    }, _i1: function _i1() {
      this._f1 && this._l && (this._g1 ? this._e1.css("cursor", this._g1) : (this._e1.removeClass("grabbing-cursor"), this._e1.addClass("grab-cursor")));
    }, _w2: function _w2() {
      this._f1 && this._l && (this._h1 ? this._e1.css("cursor", this._h1) : (this._e1.removeClass("grab-cursor"), this._e1.addClass("grabbing-cursor")));
    }, next: function next(b) {
      this._m2("next", this.st.transitionSpeed, !0, !b);
    }, prev: function prev(b) {
      this._m2("prev", this.st.transitionSpeed, !0, !b);
    }, _m2: function _m2(b, f, c, a, e) {
      var g = this,
          d,
          h,
          k;g.ev.trigger("rsBeforeMove", [b, a]);k = "next" === b ? g.currSlideId + 1 : "prev" === b ? g.currSlideId - 1 : b = parseInt(b, 10);if (!g._z) {
        if (0 > k) {
          g._i4("left", !a);return;
        }if (k >= g.numSlides) {
          g._i4("right", !a);return;
        }
      }g._r2 && (g._u2(!0), c = !1);h = k - g.currSlideId;k = g._o2 = g.currSlideId;var l = g.currSlideId + h;a = g._u;var n;g._z ? (l = g._n2(!1, l), a += h) : a = l;g._o = l;g._g4 = g.slidesJQ[g.currSlideId];g._u = a;g.currSlideId = g._o;g.currSlide = g.slides[g.currSlideId];g._r1 = g.slidesJQ[g.currSlideId];var l = g.st.slidesDiff,
          m = Boolean(0 < h);h = Math.abs(h);var p = Math.floor(k / g._y),
          r = Math.floor((k + (m ? l : -l)) / g._y),
          p = (m ? Math.max(p, r) : Math.min(p, r)) * g._y + (m ? g._y - 1 : 0);p > g.numSlides - 1 ? p = g.numSlides - 1 : 0 > p && (p = 0);k = m ? p - k : k - p;k > g._y && (k = g._y);if (h > k + l) for (g._d1 += (h - (k + l)) * (m ? -1 : 1), f *= 1.4, k = 0; k < g.numSlides; k++) {
        g.slides[k].positionSet = !1;
      }g._c = f;g._n2(!0);e || (n = !0);d = (-a - g._d1) * g._w;n ? setTimeout(function () {
        g._j4 = !1;g._x3(d, b, !1, c);g.ev.trigger("rsOnUpdateNav");
      }, 0) : (g._x3(d, b, !1, c), g.ev.trigger("rsOnUpdateNav"));
    }, _f2: function _f2() {
      this.st.arrowsNav && (1 >= this.numSlides ? (this._c2.css("display", "none"), this._d2.css("display", "none")) : (this._c2.css("display", "block"), this._d2.css("display", "block"), this._z || this.st.loopRewind || (0 === this.currSlideId ? this._c2.addClass("rsArrowDisabled") : this._c2.removeClass("rsArrowDisabled"), this.currSlideId === this.numSlides - 1 ? this._d2.addClass("rsArrowDisabled") : this._d2.removeClass("rsArrowDisabled"))));
    }, _x3: function _x3(b, f, c, a, e) {
      function g() {
        var a;h && (a = h.data("rsTimeout")) && (h !== k && h.css({ opacity: 0, display: "none", zIndex: 0 }), clearTimeout(a), h.data("rsTimeout", ""));if (a = k.data("rsTimeout")) clearTimeout(a), k.data("rsTimeout", "");
      }var d = this,
          h,
          k,
          l = {};isNaN(d._c) && (d._c = 400);d._p = d._h3 = b;d.ev.trigger("rsBeforeAnimStart");d._e ? d._l ? (d._c = parseInt(d._c, 10), c = d._g + d._v1, l[d._g + d._u1] = d._c + "ms", l[c] = a ? n.rsCSS3Easing[d.st.easeInOut] : n.rsCSS3Easing[d.st.easeOut], d._p1.css(l), a || !d.hasTouch ? setTimeout(function () {
        d._p3(b);
      }, 5) : d._p3(b)) : (d._c = d.st.transitionSpeed, h = d._g4, k = d._r1, k.data("rsTimeout") && k.css("opacity", 0), g(), h && h.data("rsTimeout", setTimeout(function () {
        l[d._g + d._u1] = "0ms";l.zIndex = 0;l.display = "none";h.data("rsTimeout", "");h.css(l);setTimeout(function () {
          h.css("opacity", 0);
        }, 16);
      }, d._c + 60)), l.display = "block", l.zIndex = d._m, l.opacity = 0, l[d._g + d._u1] = "0ms", l[d._g + d._v1] = n.rsCSS3Easing[d.st.easeInOut], k.css(l), k.data("rsTimeout", setTimeout(function () {
        k.css(d._g + d._u1, d._c + "ms");k.data("rsTimeout", setTimeout(function () {
          k.css("opacity", 1);k.data("rsTimeout", "");
        }, 20));
      }, 20))) : d._l ? (l[d._h ? d._x1 : d._w1] = b + "px", d._p1.animate(l, d._c, a ? d.st.easeInOut : d.st.easeOut)) : (h = d._g4, k = d._r1, k.stop(!0, !0).css({ opacity: 0, display: "block",
        zIndex: d._m }), d._c = d.st.transitionSpeed, k.animate({ opacity: 1 }, d._c, d.st.easeInOut), g(), h && h.data("rsTimeout", setTimeout(function () {
        h.stop(!0, !0).css({ opacity: 0, display: "none", zIndex: 0 });
      }, d._c + 60)));d._r2 = !0;d.loadingTimeout && clearTimeout(d.loadingTimeout);d.loadingTimeout = e ? setTimeout(function () {
        d.loadingTimeout = null;e.call();
      }, d._c + 60) : setTimeout(function () {
        d.loadingTimeout = null;d._k4(f);
      }, d._c + 60);
    }, _u2: function _u2(b) {
      this._r2 = !1;clearTimeout(this.loadingTimeout);if (this._l) {
        if (!this._e) this._p1.stop(!0), this._p = parseInt(this._p1.css(this._h ? this._x1 : this._w1), 10);else {
          if (!b) {
            b = this._p;var f = this._h3 = this._l4();this._p1.css(this._g + this._u1, "0ms");b !== f && this._p3(f);
          }
        }
      } else 20 < this._m ? this._m = 10 : this._m++;
    }, _l4: function _l4() {
      var b = window.getComputedStyle(this._p1.get(0), null).getPropertyValue(this._g + "transform").replace(/^matrix\(/i, "").split(/, |\)$/g),
          f = 0 === b[0].indexOf("matrix3d");return parseInt(b[this._h ? f ? 12 : 4 : f ? 13 : 5], 10);
    }, _m4: function _m4(b, f) {
      return this._e ? this._y1 + (f ? b + this._z1 + 0 : 0 + this._z1 + b) + this._a2 : b;
    }, _k4: function _k4(b) {
      this._l || (this._r1.css("z-index", 0), this._m = 10);this._r2 = !1;this.staticSlideId = this.currSlideId;this._n2();this._n4 = !1;this.ev.trigger("rsAfterSlideChange");
    }, _i4: function _i4(b, f) {
      var c = this,
          a = (-c._u - c._d1) * c._w;if (0 !== c.numSlides && !c._r2) if (c.st.loopRewind) c.goTo("left" === b ? c.numSlides - 1 : 0, f);else if (c._l) {
        c._c = 200;var e = function e() {
          c._r2 = !1;
        };c._x3(a + ("left" === b ? 30 : -30), "", !1, !0, function () {
          c._r2 = !1;c._x3(a, "", !1, !0, e);
        });
      }
    }, _q2: function _q2(b, f) {
      if (!b.isRendered) {
        var c = b.content,
            a = "rsMainSlideImage",
            e,
            g = n.isFunction(this.st.imageAlignCenter) ? this.st.imageAlignCenter(b) : this.st.imageAlignCenter,
            d = n.isFunction(this.st.imageScaleMode) ? this.st.imageScaleMode(b) : this.st.imageScaleMode,
            h;b.videoURL && (a = "rsVideoContainer", "fill" !== d ? e = !0 : (h = c, h.hasClass(a) || (h = h.find("." + a)), h.css({ width: "100%", height: "100%" }), a = "rsMainSlideImage"));c.hasClass(a) || (c = c.find("." + a));if (c) {
          var k = b.iW,
              l = b.iH;b.isRendered = !0;if ("none" !== d || g) {
            a = "fill" !== d ? this._d4 : 0;h = this._b4 - 2 * a;var q = this._c4 - 2 * a,
                m,
                p,
                r = {};"fit-if-smaller" === d && (k > h || l > q) && (d = "fit");if ("fill" === d || "fit" === d) m = h / k, p = q / l, m = "fill" == d ? m > p ? m : p : "fit" == d ? m < p ? m : p : 1, k = Math.ceil(k * m, 10), l = Math.ceil(l * m, 10);"none" !== d && (r.width = k, r.height = l, e && c.find(".rsImg").css({ width: "100%", height: "100%" }));g && (r.marginLeft = Math.floor((h - k) / 2) + a, r.marginTop = Math.floor((q - l) / 2) + a);c.css(r);
          }
        }
      }
    } };n.rsProto = v.prototype;n.fn.royalSlider = function (b) {
    var f = arguments;return this.each(function () {
      var c = n(this);if ("object" !== (typeof b === "undefined" ? "undefined" : _typeof(b)) && b) {
        if ((c = c.data("royalSlider")) && c[b]) return c[b].apply(c, Array.prototype.slice.call(f, 1));
      } else c.data("royalSlider") || c.data("royalSlider", new v(c, b));
    });
  };n.fn.royalSlider.defaults = { slidesSpacing: 8, startSlideId: 0, loop: !1, loopRewind: !1, numImagesToPreload: 4, fadeinLoadedSlide: !0, slidesOrientation: "horizontal", transitionType: "move", transitionSpeed: 600, controlNavigation: "bullets", controlsInside: !0, arrowsNav: !0, arrowsNavAutoHide: !0, navigateByClick: !0, randomizeSlides: !1, sliderDrag: !0, sliderTouch: !0, keyboardNavEnabled: !1, fadeInAfterLoaded: !0, allowCSS3: !0, allowCSS3OnWebkit: !0,
    addActiveClass: !1, autoHeight: !1, easeOut: "easeOutSine", easeInOut: "easeInOutSine", minSlideOffset: 10, imageScaleMode: "fit-if-smaller", imageAlignCenter: !0, imageScalePadding: 4, usePreloader: !0, autoScaleSlider: !1, autoScaleSliderWidth: 800, autoScaleSliderHeight: 400, autoScaleHeight: !0, arrowsNavHideOnTouch: !1, globalCaption: !1, slidesDiff: 2 };n.rsCSS3Easing = { easeOutSine: "cubic-bezier(0.390, 0.575, 0.565, 1.000)", easeInOutSine: "cubic-bezier(0.445, 0.050, 0.550, 0.950)" };n.extend(jQuery.easing, { easeInOutSine: function easeInOutSine(b, f, c, a, e) {
      return -a / 2 * (Math.cos(Math.PI * f / e) - 1) + c;
    }, easeOutSine: function easeOutSine(b, f, c, a, e) {
      return a * Math.sin(f / e * (Math.PI / 2)) + c;
    }, easeOutCubic: function easeOutCubic(b, f, c, a, e) {
      return a * ((f = f / e - 1) * f * f + 1) + c;
    } });
})(jQuery, window);
// jquery.rs.bullets v1.0.1
(function (c) {
  c.extend(c.rsProto, { _i5: function _i5() {
      var a = this;"bullets" === a.st.controlNavigation && (a.ev.one("rsAfterPropsSetup", function () {
        a._j5 = !0;a.slider.addClass("rsWithBullets");for (var b = '<div class="rsNav rsBullets">', e = 0; e < a.numSlides; e++) {
          b += '<div class="rsNavItem rsBullet"><span></span></div>';
        }a._k5 = b = c(b + "</div>");a._l5 = b.appendTo(a.slider).children();a._k5.on("click.rs", ".rsNavItem", function (b) {
          a._m5 || a.goTo(c(this).index());
        });
      }), a.ev.on("rsOnAppendSlide", function (b, c, d) {
        d >= a.numSlides ? a._k5.append('<div class="rsNavItem rsBullet"><span></span></div>') : a._l5.eq(d).before('<div class="rsNavItem rsBullet"><span></span></div>');a._l5 = a._k5.children();
      }), a.ev.on("rsOnRemoveSlide", function (b, c) {
        var d = a._l5.eq(c);d && d.length && (d.remove(), a._l5 = a._k5.children());
      }), a.ev.on("rsOnUpdateNav", function () {
        var b = a.currSlideId;a._n5 && a._n5.removeClass("rsNavSelected");b = a._l5.eq(b);b.addClass("rsNavSelected");a._n5 = b;
      }));
    } });c.rsModules.bullets = c.rsProto._i5;
})(jQuery);
// jquery.rs.thumbnails v1.0.8
(function (f) {
  f.extend(f.rsProto, { _h6: function _h6() {
      var a = this;"thumbnails" === a.st.controlNavigation && (a._i6 = { drag: !0, touch: !0, orientation: "horizontal", navigation: !0, arrows: !0, arrowLeft: null, arrowRight: null, spacing: 4, arrowsAutoHide: !1, appendSpan: !1, transitionSpeed: 600, autoCenter: !0, fitInViewport: !0, firstMargin: !0, paddingTop: 0, paddingBottom: 0 }, a.st.thumbs = f.extend({}, a._i6, a.st.thumbs), a._j6 = !0, !1 === a.st.thumbs.firstMargin ? a.st.thumbs.firstMargin = 0 : !0 === a.st.thumbs.firstMargin && (a.st.thumbs.firstMargin = a.st.thumbs.spacing), a.ev.on("rsBeforeParseNode", function (a, b, c) {
        b = f(b);c.thumbnail = b.find(".rsTmb").remove();c.thumbnail.length ? c.thumbnail = f(document.createElement("div")).append(c.thumbnail).html() : (c.thumbnail = b.attr("data-rsTmb"), c.thumbnail || (c.thumbnail = b.find(".rsImg").attr("data-rsTmb")), c.thumbnail = c.thumbnail ? '<img src="' + c.thumbnail + '"/>' : "");
      }), a.ev.one("rsAfterPropsSetup", function () {
        a._k6();
      }), a._n5 = null, a.ev.on("rsOnUpdateNav", function () {
        var e = f(a._l5[a.currSlideId]);e !== a._n5 && (a._n5 && (a._n5.removeClass("rsNavSelected"), a._n5 = null), a._l6 && a._m6(a.currSlideId), a._n5 = e.addClass("rsNavSelected"));
      }), a.ev.on("rsOnAppendSlide", function (e, b, c) {
        e = "<div" + a._n6 + ' class="rsNavItem rsThumb">' + a._o6 + b.thumbnail + "</div>";a._e && a._s3.css(a._g + "transition-duration", "0ms");c >= a.numSlides ? a._s3.append(e) : a._l5.eq(c).before(e);a._l5 = a._s3.children();a.updateThumbsSize(!0);
      }), a.ev.on("rsOnRemoveSlide", function (e, b) {
        var c = a._l5.eq(b);c && (a._e && a._s3.css(a._g + "transition-duration", "0ms"), c.remove(), a._l5 = a._s3.children(), a.updateThumbsSize(!0));
      }));
    }, _k6: function _k6() {
      var a = this,
          e = "rsThumbs",
          b = a.st.thumbs,
          c = "",
          g,
          d,
          h = b.spacing;a._j5 = !0;a._e3 = "vertical" === b.orientation ? !1 : !0;a._n6 = g = h ? ' style="margin-' + (a._e3 ? "right" : "bottom") + ":" + h + 'px;"' : "";a._i3 = 0;a._p6 = !1;a._m5 = !1;a._l6 = !1;a._q6 = b.arrows && b.navigation;d = a._e3 ? "Hor" : "Ver";a.slider.addClass("rsWithThumbs rsWithThumbs" + d);c += '<div class="rsNav rsThumbs rsThumbs' + d + '"><div class="' + e + 'Container">';a._o6 = b.appendSpan ? '<span class="thumbIco"></span>' : "";for (var k = 0; k < a.numSlides; k++) {
        d = a.slides[k], c += "<div" + g + ' class="rsNavItem rsThumb">' + d.thumbnail + a._o6 + "</div>";
      }c = f(c + "</div></div>");g = {};b.paddingTop && (g[a._e3 ? "paddingTop" : "paddingLeft"] = b.paddingTop);b.paddingBottom && (g[a._e3 ? "paddingBottom" : "paddingRight"] = b.paddingBottom);c.css(g);a._s3 = f(c).find("." + e + "Container");a._q6 && (e += "Arrow", b.arrowLeft ? a._r6 = b.arrowLeft : (a._r6 = f('<div class="' + e + " " + e + 'Left"><div class="' + e + 'Icn"></div></div>'), c.append(a._r6)), b.arrowRight ? a._s6 = b.arrowRight : (a._s6 = f('<div class="' + e + " " + e + 'Right"><div class="' + e + 'Icn"></div></div>'), c.append(a._s6)), a._r6.click(function () {
        var b = (Math.floor(a._i3 / a._t6) + a._u6) * a._t6 + a.st.thumbs.firstMargin;a._a4(b > a._n3 ? a._n3 : b);
      }), a._s6.click(function () {
        var b = (Math.floor(a._i3 / a._t6) - a._u6) * a._t6 + a.st.thumbs.firstMargin;a._a4(b < a._o3 ? a._o3 : b);
      }), b.arrowsAutoHide && !a.hasTouch && (a._r6.css("opacity", 0), a._s6.css("opacity", 0), c.one("mousemove.rsarrowshover", function () {
        a._l6 && (a._r6.css("opacity", 1), a._s6.css("opacity", 1));
      }), c.hover(function () {
        a._l6 && (a._r6.css("opacity", 1), a._s6.css("opacity", 1));
      }, function () {
        a._l6 && (a._r6.css("opacity", 0), a._s6.css("opacity", 0));
      })));a._k5 = c;a._l5 = a._s3.children();a.msEnabled && a.st.thumbs.navigation && a._s3.css("-ms-touch-action", a._e3 ? "pan-y" : "pan-x");a.slider.append(c);a._w3 = !0;a._v6 = h;b.navigation && a._e && a._s3.css(a._g + "transition-property", a._g + "transform");a._k5.on("click.rs", ".rsNavItem", function (b) {
        a._m5 || a.goTo(f(this).index());
      });a.ev.off("rsBeforeSizeSet.thumbs").on("rsBeforeSizeSet.thumbs", function () {
        a._w6 = a._e3 ? a._c4 : a._b4;a.updateThumbsSize(!0);
      });a.ev.off("rsAutoHeightChange.thumbs").on("rsAutoHeightChange.thumbs", function (b, c) {
        a.updateThumbsSize(!0, c);
      });
    }, updateThumbsSize: function updateThumbsSize(a, e) {
      var b = this,
          c = b._l5.first(),
          f = {},
          d = b._l5.length;b._t6 = (b._e3 ? c.outerWidth() : c.outerHeight()) + b._v6;b._y3 = d * b._t6 - b._v6;f[b._e3 ? "width" : "height"] = b._y3 + b._v6;b._z3 = b._e3 ? b._k5.width() : void 0 !== e ? e : b._k5.height();b._w3 && (b.isFullscreen || b.st.thumbs.fitInViewport) && (b._e3 ? b._c4 = b._w6 - b._k5.outerHeight() : b._b4 = b._w6 - b._k5.outerWidth());b._z3 && (b._o3 = -(b._y3 - b._z3) - b.st.thumbs.firstMargin, b._n3 = b.st.thumbs.firstMargin, b._u6 = Math.floor(b._z3 / b._t6), b._y3 < b._z3 ? (b.st.thumbs.autoCenter ? b._q3((b._z3 - b._y3) / 2) : b._q3(b._n3), b.st.thumbs.arrows && b._r6 && (b._r6.addClass("rsThumbsArrowDisabled"), b._s6.addClass("rsThumbsArrowDisabled")), b._l6 = !1, b._m5 = !1, b._k5.off(b._j1)) : b.st.thumbs.navigation && !b._l6 && (b._l6 = !0, !b.hasTouch && b.st.thumbs.drag || b.hasTouch && b.st.thumbs.touch) && (b._m5 = !0, b._k5.on(b._j1, function (a) {
        b._g2(a, !0);
      })), b._s3.css(f), a && e && b._m6(b.currSlideId, !0));
    }, setThumbsOrientation: function setThumbsOrientation(a, e) {
      this._w3 && (this.st.thumbs.orientation = a, this._k5.remove(), this.slider.removeClass("rsWithThumbsHor rsWithThumbsVer"), this._k6(), this._k5.off(this._j1), e || this.updateSliderSize(!0));
    }, _q3: function _q3(a) {
      this._i3 = a;this._e ? this._s3.css(this._x1, this._y1 + (this._e3 ? a + this._z1 + 0 : 0 + this._z1 + a) + this._a2) : this._s3.css(this._e3 ? this._x1 : this._w1, a);
    }, _a4: function _a4(a, e, b, c, g) {
      var d = this;if (d._l6) {
        e || (e = d.st.thumbs.transitionSpeed);
        d._i3 = a;d._x6 && clearTimeout(d._x6);d._p6 && (d._e || d._s3.stop(), b = !0);var h = {};d._p6 = !0;d._e ? (h[d._g + "transition-duration"] = e + "ms", h[d._g + "transition-timing-function"] = b ? f.rsCSS3Easing[d.st.easeOut] : f.rsCSS3Easing[d.st.easeInOut], d._s3.css(h), d._q3(a)) : (h[d._e3 ? d._x1 : d._w1] = a + "px", d._s3.animate(h, e, b ? "easeOutCubic" : d.st.easeInOut));c && (d._i3 = c);d._y6();d._x6 = setTimeout(function () {
          d._p6 = !1;g && (d._a4(c, g, !0), g = null);
        }, e);
      }
    }, _y6: function _y6() {
      this._q6 && (this._i3 === this._n3 ? this._r6.addClass("rsThumbsArrowDisabled") : this._r6.removeClass("rsThumbsArrowDisabled"), this._i3 === this._o3 ? this._s6.addClass("rsThumbsArrowDisabled") : this._s6.removeClass("rsThumbsArrowDisabled"));
    }, _m6: function _m6(a, e) {
      var b = 0,
          c,
          f = a * this._t6 + 2 * this._t6 - this._v6 + this._n3,
          d = Math.floor(this._i3 / this._t6);this._l6 && (this._j6 && (e = !0, this._j6 = !1), f + this._i3 > this._z3 ? (a === this.numSlides - 1 && (b = 1), d = -a + this._u6 - 2 + b, c = d * this._t6 + this._z3 % this._t6 + this._v6 - this._n3) : 0 !== a ? (a - 1) * this._t6 <= -this._i3 + this._n3 && a - 1 <= this.numSlides - this._u6 && (c = (-a + 1) * this._t6 + this._n3) : c = this._n3, c !== this._i3 && (b = void 0 === c ? this._i3 : c, b > this._n3 ? this._q3(this._n3) : b < this._o3 ? this._q3(this._o3) : void 0 !== c && (e ? this._q3(c) : this._a4(c))), this._y6());
    } });f.rsModules.thumbnails = f.rsProto._h6;
})(jQuery);
// jquery.rs.autoplay v1.0.5
(function (b) {
  b.extend(b.rsProto, { _x4: function _x4() {
      var a = this,
          d;a._y4 = { enabled: !1, stopAtAction: !0, pauseOnHover: !0, delay: 2E3 };!a.st.autoPlay && a.st.autoplay && (a.st.autoPlay = a.st.autoplay);a.st.autoPlay = b.extend({}, a._y4, a.st.autoPlay);a.st.autoPlay.enabled && (a.ev.on("rsBeforeParseNode", function (a, c, f) {
        c = b(c);if (d = c.attr("data-rsDelay")) f.customDelay = parseInt(d, 10);
      }), a.ev.one("rsAfterInit", function () {
        a._z4();
      }), a.ev.on("rsBeforeDestroy", function () {
        a.stopAutoPlay();a.slider.off("mouseenter mouseleave");b(window).off("blur" + a.ns + " focus" + a.ns);
      }));
    }, _z4: function _z4() {
      var a = this;a.startAutoPlay();a.ev.on("rsAfterContentSet", function (b, e) {
        a._l2 || a._r2 || !a._a5 || e !== a.currSlide || a._b5();
      });a.ev.on("rsDragRelease", function () {
        a._a5 && a._c5 && (a._c5 = !1, a._b5());
      });a.ev.on("rsAfterSlideChange", function () {
        a._a5 && a._c5 && (a._c5 = !1, a.currSlide.isLoaded && a._b5());
      });a.ev.on("rsDragStart", function () {
        a._a5 && (a.st.autoPlay.stopAtAction ? a.stopAutoPlay() : (a._c5 = !0, a._d5()));
      });a.ev.on("rsBeforeMove", function (b, e, c) {
        a._a5 && (c && a.st.autoPlay.stopAtAction ? a.stopAutoPlay() : (a._c5 = !0, a._d5()));
      });a._e5 = !1;a.ev.on("rsVideoStop", function () {
        a._a5 && (a._e5 = !1, a._b5());
      });a.ev.on("rsVideoPlay", function () {
        a._a5 && (a._c5 = !1, a._d5(), a._e5 = !0);
      });b(window).on("blur" + a.ns, function () {
        a._a5 && (a._c5 = !0, a._d5());
      }).on("focus" + a.ns, function () {
        a._a5 && a._c5 && (a._c5 = !1, a._b5());
      });a.st.autoPlay.pauseOnHover && (a._f5 = !1, a.slider.hover(function () {
        a._a5 && (a._c5 = !1, a._d5(), a._f5 = !0);
      }, function () {
        a._a5 && (a._f5 = !1, a._b5());
      }));
    }, toggleAutoPlay: function toggleAutoPlay() {
      this._a5 ? this.stopAutoPlay() : this.startAutoPlay();
    }, startAutoPlay: function startAutoPlay() {
      this._a5 = !0;this.currSlide.isLoaded && this._b5();
    }, stopAutoPlay: function stopAutoPlay() {
      this._e5 = this._f5 = this._c5 = this._a5 = !1;this._d5();
    }, _b5: function _b5() {
      var a = this;a._f5 || a._e5 || (a._g5 = !0, a._h5 && clearTimeout(a._h5), a._h5 = setTimeout(function () {
        var b;a._z || a.st.loopRewind || (b = !0, a.st.loopRewind = !0);a.next(!0);b && (a.st.loopRewind = !1);
      }, a.currSlide.customDelay ? a.currSlide.customDelay : a.st.autoPlay.delay));
    }, _d5: function _d5() {
      this._f5 || this._e5 || (this._g5 = !1, this._h5 && (clearTimeout(this._h5), this._h5 = null));
    } });b.rsModules.autoplay = b.rsProto._x4;
})(jQuery);
// jquery.rs.animated-blocks v1.0.7
(function (l) {
  l.extend(l.rsProto, { _p4: function _p4() {
      function m() {
        var g = a.currSlide;if (a.currSlide && a.currSlide.isLoaded && a._t4 !== g) {
          if (0 < a._s4.length) {
            for (b = 0; b < a._s4.length; b++) {
              clearTimeout(a._s4[b]);
            }a._s4 = [];
          }if (0 < a._r4.length) {
            var f;for (b = 0; b < a._r4.length; b++) {
              if (f = a._r4[b]) a._e ? (f.block.css(a._g + a._u1, "0s"), f.block.css(f.css)) : f.block.stop(!0).css(f.css), a._t4 = null, g.animBlocksDisplayed = !1;
            }a._r4 = [];
          }g.animBlocks && (g.animBlocksDisplayed = !0, a._t4 = g, a._u4(g.animBlocks));
        }
      }var a = this,
          b;a._q4 = { fadeEffect: !0,
        moveEffect: "top", moveOffset: 20, speed: 400, easing: "easeOutSine", delay: 200 };a.st.block = l.extend({}, a._q4, a.st.block);a._r4 = [];a._s4 = [];a.ev.on("rsAfterInit", function () {
        m();
      });a.ev.on("rsBeforeParseNode", function (a, b, d) {
        b = l(b);d.animBlocks = b.find(".rsABlock").css("display", "none");d.animBlocks.length || (b.hasClass("rsABlock") ? d.animBlocks = b.css("display", "none") : d.animBlocks = !1);
      });a.ev.on("rsAfterContentSet", function (b, f) {
        f.id === a.slides[a.currSlideId].id && setTimeout(function () {
          m();
        }, a.st.fadeinLoadedSlide ? 300 : 0);
      });a.ev.on("rsAfterSlideChange", function () {
        m();
      });
    }, _v4: function _v4(l, a) {
      setTimeout(function () {
        l.css(a);
      }, 6);
    }, _u4: function _u4(m) {
      var a = this,
          b,
          g,
          f,
          d,
          h,
          e,
          n;a._s4 = [];m.each(function (m) {
        b = l(this);g = {};f = {};d = null;var c = b.attr("data-move-offset"),
            c = c ? parseInt(c, 10) : a.st.block.moveOffset;if (0 < c && ((e = b.data("move-effect")) ? (e = e.toLowerCase(), "none" === e ? e = !1 : "left" !== e && "top" !== e && "bottom" !== e && "right" !== e && (e = a.st.block.moveEffect, "none" === e && (e = !1))) : e = a.st.block.moveEffect, e && "none" !== e)) {
          var p;p = "right" === e || "left" === e ? !0 : !1;var k;n = !1;a._e ? (k = 0, h = a._x1) : (p ? isNaN(parseInt(b.css("right"), 10)) ? h = "left" : (h = "right", n = !0) : isNaN(parseInt(b.css("bottom"), 10)) ? h = "top" : (h = "bottom", n = !0), h = "margin-" + h, n && (c = -c), a._e ? k = parseInt(b.css(h), 10) : (k = b.data("rs-start-move-prop"), void 0 === k && (k = parseInt(b.css(h), 10), isNaN(k) && (k = 0), b.data("rs-start-move-prop", k))));f[h] = a._m4("top" === e || "left" === e ? k - c : k + c, p);g[h] = a._m4(k, p);
        }c = b.attr("data-fade-effect");if (!c) c = a.st.block.fadeEffect;else if ("none" === c.toLowerCase() || "false" === c.toLowerCase()) c = !1;c && (f.opacity = 0, g.opacity = 1);if (c || e) d = {}, d.hasFade = Boolean(c), Boolean(e) && (d.moveProp = h, d.hasMove = !0), d.speed = b.data("speed"), isNaN(d.speed) && (d.speed = a.st.block.speed), d.easing = b.data("easing"), d.easing || (d.easing = a.st.block.easing), d.css3Easing = l.rsCSS3Easing[d.easing], d.delay = b.data("delay"), isNaN(d.delay) && (d.delay = a.st.block.delay * m);c = {};a._e && (c[a._g + a._u1] = "0ms");c.moveProp = g.moveProp;c.opacity = g.opacity;c.display = "none";a._r4.push({ block: b, css: c });a._v4(b, f);a._s4.push(setTimeout(function (b, d, c, e) {
          return function () {
            b.css("display", "block");if (c) {
              var g = {};if (a._e) {
                var f = "";c.hasMove && (f += c.moveProp);c.hasFade && (c.hasMove && (f += ", "), f += "opacity");g[a._g + a._t1] = f;g[a._g + a._u1] = c.speed + "ms";g[a._g + a._v1] = c.css3Easing;b.css(g);setTimeout(function () {
                  b.css(d);
                }, 24);
              } else setTimeout(function () {
                b.animate(d, c.speed, c.easing);
              }, 16);
            }delete a._s4[e];
          };
        }(b, g, d, m), 6 >= d.delay ? 12 : d.delay));
      });
    } });l.rsModules.animatedBlocks = l.rsProto._p4;
})(jQuery);
// jquery.rs.auto-height v1.0.3
(function (b) {
  b.extend(b.rsProto, { _w4: function _w4() {
      var a = this;if (a.st.autoHeight) {
        var b,
            c,
            e,
            f = !0,
            d = function d(_d) {
          e = a.slides[a.currSlideId];(b = e.holder) && (c = b.height()) && void 0 !== c && c > (a.st.minAutoHeight || 30) && (a._c4 = c, a._e || !_d ? a._e1.css("height", c) : a._e1.stop(!0, !0).animate({ height: c }, a.st.transitionSpeed), a.ev.trigger("rsAutoHeightChange", c), f && (a._e && setTimeout(function () {
            a._e1.css(a._g + "transition", "height " + a.st.transitionSpeed + "ms ease-in-out");
          }, 16), f = !1));
        };a.ev.on("rsMaybeSizeReady.rsAutoHeight", function (a, b) {
          e === b && d();
        });a.ev.on("rsAfterContentSet.rsAutoHeight", function (a, b) {
          e === b && d();
        });a.slider.addClass("rsAutoHeight");a.ev.one("rsAfterInit", function () {
          setTimeout(function () {
            d(!1);setTimeout(function () {
              a.slider.append('<div style="clear:both; float: none;"></div>');
            }, 16);
          }, 16);
        });a.ev.on("rsBeforeAnimStart", function () {
          d(!0);
        });a.ev.on("rsBeforeSizeSet", function () {
          setTimeout(function () {
            d(!1);
          }, 16);
        });
      }
    } });b.rsModules.autoHeight = b.rsProto._w4;
})(jQuery);
// jquery.rs.global-caption v1.0.1
(function (b) {
  b.extend(b.rsProto, { _d6: function _d6() {
      var a = this;a.st.globalCaption && (a.ev.on("rsAfterInit", function () {
        a.globalCaption = b('<div class="rsGCaption"></div>').appendTo(a.st.globalCaptionInside ? a._e1 : a.slider);a.globalCaption.html(a.currSlide.caption || "");
      }), a.ev.on("rsBeforeAnimStart", function () {
        a.globalCaption.html(a.currSlide.caption || "");
      }));
    } });b.rsModules.globalCaption = b.rsProto._d6;
})(jQuery);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * jQuery Smooth Scroll - v2.1.1 - 2017-01-01
 * https://github.com/kswedberg/jquery-smooth-scroll
 * Copyright (c) 2017 Karl Swedberg
 * Licensed MIT
 */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    // CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function ($) {

  var version = '2.1.1';
  var optionOverrides = {};
  var defaults = {
    exclude: [],
    excludeWithin: [],
    offset: 0,

    // one of 'top' or 'left'
    direction: 'top',

    // if set, bind click events through delegation
    //  supported since jQuery 1.4.2
    delegateSelector: null,

    // jQuery set of elements you wish to scroll (for $.smoothScroll).
    //  if null (default), $('html, body').firstScrollable() is used.
    scrollElement: null,

    // only use if you want to override default behavior
    scrollTarget: null,

    // fn(opts) function to be called before scrolling occurs.
    // `this` is the element(s) being scrolled
    beforeScroll: function beforeScroll() {},

    // fn(opts) function to be called after scrolling occurs.
    // `this` is the triggering element
    afterScroll: function afterScroll() {},

    // easing name. jQuery comes with "swing" and "linear." For others, you'll need an easing plugin
    // from jQuery UI or elsewhere
    easing: 'swing',

    // speed can be a number or 'auto'
    // if 'auto', the speed will be calculated based on the formula:
    // (current scroll position - target scroll position) / autoCoeffic
    speed: 400,

    // coefficient for "auto" speed
    autoCoefficient: 2,

    // $.fn.smoothScroll only: whether to prevent the default click action
    preventDefault: true
  };

  var getScrollable = function getScrollable(opts) {
    var scrollable = [];
    var scrolled = false;
    var dir = opts.dir && opts.dir === 'left' ? 'scrollLeft' : 'scrollTop';

    this.each(function () {
      var el = $(this);

      if (this === document || this === window) {
        return;
      }

      if (document.scrollingElement && (this === document.documentElement || this === document.body)) {
        scrollable.push(document.scrollingElement);

        return false;
      }

      if (el[dir]() > 0) {
        scrollable.push(this);
      } else {
        // if scroll(Top|Left) === 0, nudge the element 1px and see if it moves
        el[dir](1);
        scrolled = el[dir]() > 0;

        if (scrolled) {
          scrollable.push(this);
        }
        // then put it back, of course
        el[dir](0);
      }
    });

    if (!scrollable.length) {
      this.each(function () {
        // If no scrollable elements and <html> has scroll-behavior:smooth because
        // "When this property is specified on the root element, it applies to the viewport instead."
        // and "The scroll-behavior property of the … body element is *not* propagated to the viewport."
        // → https://drafts.csswg.org/cssom-view/#propdef-scroll-behavior
        if (this === document.documentElement && $(this).css('scrollBehavior') === 'smooth') {
          scrollable = [this];
        }

        // If still no scrollable elements, fall back to <body>,
        // if it's in the jQuery collection
        // (doing this because Safari sets scrollTop async,
        // so can't set it to 1 and immediately get the value.)
        if (!scrollable.length && this.nodeName === 'BODY') {
          scrollable = [this];
        }
      });
    }

    // Use the first scrollable element if we're calling firstScrollable()
    if (opts.el === 'first' && scrollable.length > 1) {
      scrollable = [scrollable[0]];
    }

    return scrollable;
  };

  var rRelative = /^([\-\+]=)(\d+)/;
  $.fn.extend({
    scrollable: function scrollable(dir) {
      var scrl = getScrollable.call(this, { dir: dir });

      return this.pushStack(scrl);
    },
    firstScrollable: function firstScrollable(dir) {
      var scrl = getScrollable.call(this, { el: 'first', dir: dir });

      return this.pushStack(scrl);
    },

    smoothScroll: function smoothScroll(options, extra) {
      options = options || {};

      if (options === 'options') {
        if (!extra) {
          return this.first().data('ssOpts');
        }

        return this.each(function () {
          var $this = $(this);
          var opts = $.extend($this.data('ssOpts') || {}, extra);

          $(this).data('ssOpts', opts);
        });
      }

      var opts = $.extend({}, $.fn.smoothScroll.defaults, options);

      var clickHandler = function clickHandler(event) {
        var escapeSelector = function escapeSelector(str) {
          return str.replace(/(:|\.|\/)/g, '\\$1');
        };

        var link = this;
        var $link = $(this);
        var thisOpts = $.extend({}, opts, $link.data('ssOpts') || {});
        var exclude = opts.exclude;
        var excludeWithin = thisOpts.excludeWithin;
        var elCounter = 0;
        var ewlCounter = 0;
        var include = true;
        var clickOpts = {};
        var locationPath = $.smoothScroll.filterPath(location.pathname);
        var linkPath = $.smoothScroll.filterPath(link.pathname);
        var hostMatch = location.hostname === link.hostname || !link.hostname;
        var pathMatch = thisOpts.scrollTarget || linkPath === locationPath;
        var thisHash = escapeSelector(link.hash);

        if (thisHash && !$(thisHash).length) {
          include = false;
        }

        if (!thisOpts.scrollTarget && (!hostMatch || !pathMatch || !thisHash)) {
          include = false;
        } else {
          while (include && elCounter < exclude.length) {
            if ($link.is(escapeSelector(exclude[elCounter++]))) {
              include = false;
            }
          }

          while (include && ewlCounter < excludeWithin.length) {
            if ($link.closest(excludeWithin[ewlCounter++]).length) {
              include = false;
            }
          }
        }

        if (include) {
          if (thisOpts.preventDefault) {
            event.preventDefault();
          }

          $.extend(clickOpts, thisOpts, {
            scrollTarget: thisOpts.scrollTarget || thisHash,
            link: link
          });

          $.smoothScroll(clickOpts);
        }
      };

      if (options.delegateSelector !== null) {
        this.off('click.smoothscroll', options.delegateSelector).on('click.smoothscroll', options.delegateSelector, clickHandler);
      } else {
        this.off('click.smoothscroll').on('click.smoothscroll', clickHandler);
      }

      return this;
    }
  });

  var getExplicitOffset = function getExplicitOffset(val) {
    var explicit = { relative: '' };
    var parts = typeof val === 'string' && rRelative.exec(val);

    if (typeof val === 'number') {
      explicit.px = val;
    } else if (parts) {
      explicit.relative = parts[1];
      explicit.px = parseFloat(parts[2]) || 0;
    }

    return explicit;
  };

  $.smoothScroll = function (options, px) {
    if (options === 'options' && (typeof px === 'undefined' ? 'undefined' : _typeof(px)) === 'object') {
      return $.extend(optionOverrides, px);
    }
    var opts, $scroller, speed, delta;
    var explicitOffset = getExplicitOffset(options);
    var scrollTargetOffset = {};
    var scrollerOffset = 0;
    var offPos = 'offset';
    var scrollDir = 'scrollTop';
    var aniProps = {};
    var aniOpts = {};

    console.log(explicitOffset);

    if (explicitOffset.px) {
      opts = $.extend({ link: null }, $.fn.smoothScroll.defaults, optionOverrides);
    } else {
      opts = $.extend({ link: null }, $.fn.smoothScroll.defaults, options || {}, optionOverrides);

      if (opts.scrollElement) {
        offPos = 'position';

        if (opts.scrollElement.css('position') === 'static') {
          opts.scrollElement.css('position', 'relative');
        }
      }

      if (px) {
        explicitOffset = getExplicitOffset(px);
      }
    }

    scrollDir = opts.direction === 'left' ? 'scrollLeft' : scrollDir;

    if (opts.scrollElement) {
      $scroller = opts.scrollElement;

      if (!explicitOffset.px && !/^(?:HTML|BODY)$/.test($scroller[0].nodeName)) {
        scrollerOffset = $scroller[scrollDir]();
      }
    } else {
      $scroller = $('html, body').firstScrollable(opts.direction);
    }

    // beforeScroll callback function must fire before calculating offset
    opts.beforeScroll.call($scroller, opts);

    scrollTargetOffset = explicitOffset.px ? explicitOffset : {
      relative: '',
      px: $(opts.scrollTarget)[offPos]() && $(opts.scrollTarget)[offPos]()[opts.direction] || 0
    };

    aniProps[scrollDir] = scrollTargetOffset.relative + (scrollTargetOffset.px + scrollerOffset + opts.offset);

    speed = opts.speed;

    // automatically calculate the speed of the scroll based on distance / coefficient
    if (speed === 'auto') {

      // $scroller[scrollDir]() is position before scroll, aniProps[scrollDir] is position after
      // When delta is greater, speed will be greater.
      delta = Math.abs(aniProps[scrollDir] - $scroller[scrollDir]());

      // Divide the delta by the coefficient
      speed = delta / opts.autoCoefficient;
    }

    aniOpts = {
      duration: speed,
      easing: opts.easing,
      complete: function complete() {
        opts.afterScroll.call(opts.link, opts);
      }
    };

    if (opts.step) {
      aniOpts.step = opts.step;
    }

    if ($scroller.length) {
      $scroller.stop().animate(aniProps, aniOpts);
    } else {
      opts.afterScroll.call(opts.link, opts);
    }
  };

  $.smoothScroll.version = version;
  $.smoothScroll.filterPath = function (string) {
    string = string || '';

    return string.replace(/^\//, '').replace(/(?:index|default).[a-zA-Z]{3,4}$/, '').replace(/\/$/, '');
  };

  // default options
  $.fn.smoothScroll.defaults = defaults;
});
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! modernizr 3.3.1 (Custom Build) | MIT *
 * http://modernizr.com/download/?-cssanimations-csstransforms-csstransforms3d-csstransitions-flexbox-flexboxlegacy-touchevents-setclasses !*/
!function (e, n, t) {
  function s(e, n) {
    return (typeof e === "undefined" ? "undefined" : _typeof(e)) === n;
  }function r() {
    var e, n, t, r, o, i, a;for (var f in x) {
      if (x.hasOwnProperty(f)) {
        if (e = [], n = x[f], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (t = 0; t < n.options.aliases.length; t++) {
          e.push(n.options.aliases[t].toLowerCase());
        }for (r = s(n.fn, "function") ? n.fn() : n.fn, o = 0; o < e.length; o++) {
          i = e[o], a = i.split("."), 1 === a.length ? Modernizr[a[0]] = r : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = r), y.push((r ? "" : "no-") + a.join("-"));
        }
      }
    }
  }function o(e) {
    var n = w.className,
        t = Modernizr._config.classPrefix || "";if (S && (n = n.baseVal), Modernizr._config.enableJSClass) {
      var s = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");n = n.replace(s, "$1" + t + "js$2");
    }Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), S ? w.className.baseVal = n : w.className = n);
  }function i() {
    return "function" != typeof n.createElement ? n.createElement(arguments[0]) : S ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments);
  }function a() {
    var e = n.body;return e || (e = i(S ? "svg" : "body"), e.fake = !0), e;
  }function f(e, t, s, r) {
    var o,
        f,
        l,
        u,
        d = "modernizr",
        p = i("div"),
        c = a();if (parseInt(s, 10)) for (; s--;) {
      l = i("div"), l.id = r ? r[s] : d + (s + 1), p.appendChild(l);
    }return o = i("style"), o.type = "text/css", o.id = "s" + d, (c.fake ? c : p).appendChild(o), c.appendChild(p), o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(n.createTextNode(e)), p.id = d, c.fake && (c.style.background = "", c.style.overflow = "hidden", u = w.style.overflow, w.style.overflow = "hidden", w.appendChild(c)), f = t(p, e), c.fake ? (c.parentNode.removeChild(c), w.style.overflow = u, w.offsetHeight) : p.parentNode.removeChild(p), !!f;
  }function l(e, n) {
    return !!~("" + e).indexOf(n);
  }function u(e) {
    return e.replace(/([a-z])-([a-z])/g, function (e, n, t) {
      return n + t.toUpperCase();
    }).replace(/^-/, "");
  }function d(e, n) {
    return function () {
      return e.apply(n, arguments);
    };
  }function p(e, n, t) {
    var r;for (var o in e) {
      if (e[o] in n) return t === !1 ? e[o] : (r = n[e[o]], s(r, "function") ? d(r, t || n) : r);
    }return !1;
  }function c(e) {
    return e.replace(/([A-Z])/g, function (e, n) {
      return "-" + n.toLowerCase();
    }).replace(/^ms-/, "-ms-");
  }function m(n, s) {
    var r = n.length;if ("CSS" in e && "supports" in e.CSS) {
      for (; r--;) {
        if (e.CSS.supports(c(n[r]), s)) return !0;
      }return !1;
    }if ("CSSSupportsRule" in e) {
      for (var o = []; r--;) {
        o.push("(" + c(n[r]) + ":" + s + ")");
      }return o = o.join(" or "), f("@supports (" + o + ") { #modernizr { position: absolute; } }", function (e) {
        return "absolute" == getComputedStyle(e, null).position;
      });
    }return t;
  }function h(e, n, r, o) {
    function a() {
      d && (delete N.style, delete N.modElem);
    }if (o = s(o, "undefined") ? !1 : o, !s(r, "undefined")) {
      var f = m(e, r);if (!s(f, "undefined")) return f;
    }for (var d, p, c, h, v, g = ["modernizr", "tspan"]; !N.style;) {
      d = !0, N.modElem = i(g.shift()), N.style = N.modElem.style;
    }for (c = e.length, p = 0; c > p; p++) {
      if (h = e[p], v = N.style[h], l(h, "-") && (h = u(h)), N.style[h] !== t) {
        if (o || s(r, "undefined")) return a(), "pfx" == n ? h : !0;try {
          N.style[h] = r;
        } catch (y) {}if (N.style[h] != v) return a(), "pfx" == n ? h : !0;
      }
    }return a(), !1;
  }function v(e, n, t, r, o) {
    var i = e.charAt(0).toUpperCase() + e.slice(1),
        a = (e + " " + z.join(i + " ") + i).split(" ");return s(n, "string") || s(n, "undefined") ? h(a, n, r, o) : (a = (e + " " + P.join(i + " ") + i).split(" "), p(a, n, t));
  }function g(e, n, s) {
    return v(e, t, t, n, s);
  }var y = [],
      x = [],
      C = { _version: "3.3.1", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function on(e, n) {
      var t = this;setTimeout(function () {
        n(t[e]);
      }, 0);
    }, addTest: function addTest(e, n, t) {
      x.push({ name: e, fn: n, options: t });
    }, addAsyncTest: function addAsyncTest(e) {
      x.push({ name: null, fn: e });
    } },
      Modernizr = function Modernizr() {};Modernizr.prototype = C, Modernizr = new Modernizr();var w = n.documentElement,
      S = "svg" === w.nodeName.toLowerCase(),
      b = C._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];C._prefixes = b;var _ = C.testStyles = f;Modernizr.addTest("touchevents", function () {
    var t;if ("ontouchstart" in e || e.DocumentTouch && n instanceof DocumentTouch) t = !0;else {
      var s = ["@media (", b.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");_(s, function (e) {
        t = 9 === e.offsetTop;
      });
    }return t;
  });var T = "Moz O ms Webkit",
      z = C._config.usePrefixes ? T.split(" ") : [];C._cssomPrefixes = z;var P = C._config.usePrefixes ? T.toLowerCase().split(" ") : [];C._domPrefixes = P;var E = { elem: i("modernizr") };Modernizr._q.push(function () {
    delete E.elem;
  });var N = { style: E.elem.style };Modernizr._q.unshift(function () {
    delete N.style;
  }), C.testAllProps = v, C.testAllProps = g, Modernizr.addTest("cssanimations", g("animationName", "a", !0)), Modernizr.addTest("flexbox", g("flexBasis", "1px", !0)), Modernizr.addTest("flexboxlegacy", g("boxDirection", "reverse", !0)), Modernizr.addTest("csstransforms", function () {
    return -1 === navigator.userAgent.indexOf("Android 2.") && g("transform", "scale(1)", !0);
  }), Modernizr.addTest("csstransitions", g("transition", "all", !0));var j = "CSS" in e && "supports" in e.CSS,
      k = "supportsCSS" in e;Modernizr.addTest("supports", j || k), Modernizr.addTest("csstransforms3d", function () {
    var e = !!g("perspective", "1px", !0),
        n = Modernizr._config.usePrefixes;if (e && (!n || "webkitPerspective" in w.style)) {
      var t,
          s = "#modernizr{width:0;height:0}";Modernizr.supports ? t = "@supports (perspective: 1px)" : (t = "@media (transform-3d)", n && (t += ",(-webkit-transform-3d)")), t += "{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}", _(s + t, function (n) {
        e = 7 === n.offsetWidth && 18 === n.offsetHeight;
      });
    }return e;
  }), r(), o(y), delete C.addTest, delete C.addAsyncTest;for (var A = 0; A < Modernizr._q.length; A++) {
    Modernizr._q[A]();
  }e.Modernizr = Modernizr;
}(window, document);
'use strict';

jQuery(document).ready(function ($) {

	var pushy = $('.pushy'),
	    //menu css class
	body = $('body'),
	    header = $('.site-header'),
	    container = $('.site-container'),
	    //container css class
	siteOverlay = $('.site-overlay'),
	    // site-overlay div
	push = $('.push'),
	    //css class to add pushy capability
	pushyClass = 'pushy-left pushy-open',
	    //menu position & menu open class
	pushyActiveClass = 'pushy-active',
	    //css class to toggle site overlay
	containerClass = 'container-push',
	    //container open class
	pushClass = 'push-push',
	    //css class to add pushy capability
	menuBtn = $('.menu-btn, .pushy a'),
	    //css classes to toggle the menu
	closeBtn = $('.close-btn'),
	    menuSpeed = 200,
	    //jQuery fallback menu speed
	menuWidth = pushy.width() + 'px'; //jQuery fallback menu width

	function togglePushy() {
		console.log("togglePushy");
		body.toggleClass(pushyActiveClass); //toggle site overlay
		pushy.toggleClass(pushyClass);
		//container.toggleClass(containerClass);
		push.toggleClass(pushClass); //css class to add pushy capability
	}

	function openPushyFallback() {
		console.log("openPushyFallback");
		body.addClass(pushyActiveClass);
		header.addClass(pushClass);
		pushy.addClass(pushyClass);
		container.addClass(pushClass);
		// body.animate({right: "260px"}, menuSpeed); //animate the elements with the push class
	}

	function closePushyFallback() {
		console.log("closePushyFallback");
		body.removeClass(pushyActiveClass);
		header.removeClass(pushClass);
		pushy.removeClass("pushy-open");
		container.removeClass(pushClass);
	}

	if (Modernizr.csstransforms3d) {
		//toggle menu
		menuBtn.click(function () {
			togglePushy();
		});
		//close menu when clicking site overlay
		siteOverlay.click(function () {
			togglePushy();
		});
	} else {
		//jQuery fallback
		container.css({ "overflow-x": "hidden" }); //fixes IE scrollbar issue

		//keep track of menu state (open/close)
		var state = true;

		//toggle menu
		menuBtn.click(function () {
			if (state) {
				openPushyFallback();
				state = false;
			} else {
				closePushyFallback();
				state = true;
			}
		});

		// close menu when clicking site overlay
		siteOverlay.click(function () {
			if (state) {
				openPushyFallback();
				state = false;
			} else {
				closePushyFallback();
				state = true;
			}
		});

		//close menu when clicking close button
		closeBtn.click(function () {
			closePushyFallback();
			state = true;
		});
	}

	$('.menu-btn, .close-btn').on('click', function (e) {
		e.preventDefault();
	});
});
//# sourceMappingURL=project.js.map
