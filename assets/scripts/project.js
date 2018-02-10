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
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**!
 * MixItUp v3.2.1
 * A high-performance, dependency-free library for animated filtering, sorting and more
 * Build e686293a-a831-4453-8fff-74c886296ad0
 *
 * @copyright Copyright 2014-2017 KunkaLabs Limited.
 * @author    KunkaLabs Limited.
 * @link      https://www.kunkalabs.com/mixitup/
 *
 * @license   Commercial use requires a commercial license.
 *            https://www.kunkalabs.com/mixitup/licenses/
 *
 *            Non-commercial use permitted under same terms as CC BY-NC 3.0 license.
 *            http://creativecommons.org/licenses/by-nc/3.0/
 */

(function (window) {
    'use strict';

    var _mixitup = null,
        h = null;

    (function () {
        var VENDORS = ['webkit', 'moz', 'o', 'ms'],
            canary = window.document.createElement('div'),
            i = -1;

        // window.requestAnimationFrame

        for (i = 0; i < VENDORS.length && !window.requestAnimationFrame; i++) {
            window.requestAnimationFrame = window[VENDORS[i] + 'RequestAnimationFrame'];
        }

        // Element.nextElementSibling

        if (typeof canary.nextElementSibling === 'undefined') {
            Object.defineProperty(window.Element.prototype, 'nextElementSibling', {
                get: function get() {
                    var el = this.nextSibling;

                    while (el) {
                        if (el.nodeType === 1) {
                            return el;
                        }

                        el = el.nextSibling;
                    }

                    return null;
                }
            });
        }

        // Element.matches

        (function (ElementPrototype) {
            ElementPrototype.matches = ElementPrototype.matches || ElementPrototype.machesSelector || ElementPrototype.mozMatchesSelector || ElementPrototype.msMatchesSelector || ElementPrototype.oMatchesSelector || ElementPrototype.webkitMatchesSelector || function (selector) {
                return Array.prototype.indexOf.call(this.parentElement.querySelectorAll(selector), this) > -1;
            };
        })(window.Element.prototype);

        // Object.keys
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys

        if (!Object.keys) {
            Object.keys = function () {
                var hasOwnProperty = Object.prototype.hasOwnProperty,
                    hasDontEnumBug = false,
                    dontEnums = [],
                    dontEnumsLength = -1;

                hasDontEnumBug = !{
                    toString: null
                }.propertyIsEnumerable('toString');

                dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];

                dontEnumsLength = dontEnums.length;

                return function (obj) {
                    var result = [],
                        prop = '',
                        i = -1;

                    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' && (typeof obj !== 'function' || obj === null)) {
                        throw new TypeError('Object.keys called on non-object');
                    }

                    for (prop in obj) {
                        if (hasOwnProperty.call(obj, prop)) {
                            result.push(prop);
                        }
                    }

                    if (hasDontEnumBug) {
                        for (i = 0; i < dontEnumsLength; i++) {
                            if (hasOwnProperty.call(obj, dontEnums[i])) {
                                result.push(dontEnums[i]);
                            }
                        }
                    }

                    return result;
                };
            }();
        }

        // Array.isArray
        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray

        if (!Array.isArray) {
            Array.isArray = function (arg) {
                return Object.prototype.toString.call(arg) === '[object Array]';
            };
        }

        // Object.create
        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/create

        if (typeof Object.create !== 'function') {
            Object.create = function (undefined) {
                var Temp = function Temp() {};

                return function (prototype, propertiesObject) {
                    if (prototype !== Object(prototype) && prototype !== null) {
                        throw TypeError('Argument must be an object, or null');
                    }

                    Temp.prototype = prototype || {};

                    var result = new Temp();

                    Temp.prototype = null;

                    if (propertiesObject !== undefined) {
                        Object.defineProperties(result, propertiesObject);
                    }

                    if (prototype === null) {
                        /* jshint ignore:start */
                        result.__proto__ = null;
                        /* jshint ignore:end */
                    }

                    return result;
                };
            }();
        }

        // String.prototyoe.trim

        if (!String.prototype.trim) {
            String.prototype.trim = function () {
                return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
            };
        }

        // Array.prototype.indexOf
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf

        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function (searchElement) {
                var n, k, t, len;

                if (this === null) {
                    throw new TypeError();
                }

                t = Object(this);

                len = t.length >>> 0;

                if (len === 0) {
                    return -1;
                }

                n = 0;

                if (arguments.length > 1) {
                    n = Number(arguments[1]);

                    if (n !== n) {
                        n = 0;
                    } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
                        n = (n > 0 || -1) * Math.floor(Math.abs(n));
                    }
                }

                if (n >= len) {
                    return -1;
                }

                for (k = n >= 0 ? n : Math.max(len - Math.abs(n), 0); k < len; k++) {
                    if (k in t && t[k] === searchElement) {
                        return k;
                    }
                }

                return -1;
            };
        }

        // Function.prototype.bind
        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind

        if (!Function.prototype.bind) {
            Function.prototype.bind = function (oThis) {
                var aArgs, self, FNOP, fBound;

                if (typeof this !== 'function') {
                    throw new TypeError();
                }

                aArgs = Array.prototype.slice.call(arguments, 1);

                self = this;

                FNOP = function FNOP() {};

                fBound = function fBound() {
                    return self.apply(this instanceof FNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
                };

                if (this.prototype) {
                    FNOP.prototype = this.prototype;
                }

                fBound.prototype = new FNOP();

                return fBound;
            };
        }

        // Element.prototype.dispatchEvent

        if (!window.Element.prototype.dispatchEvent) {
            window.Element.prototype.dispatchEvent = function (event) {
                try {
                    return this.fireEvent('on' + event.type, event);
                } catch (err) {}
            };
        }
    })();

    /**
     * The `mixitup()` "factory" function creates and returns individual instances
     * of MixItUp, known as "mixers", on which API methods can be called.
     *
     * When loading MixItUp via a script tag, the factory function is accessed
     * via the global variable `mixitup`. When using a module loading
     * system (e.g. ES2015, CommonJS, RequireJS), the factory function is
     * exported into your module when you require the MixItUp library.
     *
     * @example
     * mixitup(container [,config] [,foreignDoc])
     *
     * @example <caption>Example 1: Creating a mixer instance with an element reference</caption>
     * var containerEl = document.querySelector('.container');
     *
     * var mixer = mixitup(containerEl);
     *
     * @example <caption>Example 2: Creating a mixer instance with a selector string</caption>
     * var mixer = mixitup('.container');
     *
     * @example <caption>Example 3: Passing a configuration object</caption>
     * var mixer = mixitup(containerEl, {
     *     animation: {
     *         effects: 'fade scale(0.5)'
     *     }
     * });
     *
     * @example <caption>Example 4: Passing an iframe reference</caption>
     * var mixer = mixitup(containerEl, config, foreignDocument);
     *
     * @global
     * @namespace
     * @public
     * @kind        function
     * @since       3.0.0
     * @param       {(Element|string)}  container
     *      A DOM element or selector string representing the container(s) on which to instantiate MixItUp.
     * @param       {object}            [config]
     *      An optional "configuration object" used to customize the behavior of the MixItUp instance.
     * @param       {object}            [foreignDoc]
     *      An optional reference to a `document`, which can be used to control a MixItUp instance in an iframe.
     * @return      {mixitup.Mixer}
     *      A "mixer" object holding the MixItUp instance.
     */

    _mixitup = function mixitup(container, config, foreignDoc) {
        var el = null,
            returnCollection = false,
            instance = null,
            facade = null,
            doc = null,
            output = null,
            instances = [],
            id = '',
            elements = [],
            i = -1;

        doc = foreignDoc || window.document;

        if (returnCollection = arguments[3]) {
            // A non-documented 4th paramater enabling control of multiple instances

            returnCollection = typeof returnCollection === 'boolean';
        }

        if (typeof container === 'string') {
            elements = doc.querySelectorAll(container);
        } else if (container && (typeof container === 'undefined' ? 'undefined' : _typeof(container)) === 'object' && h.isElement(container, doc)) {
            elements = [container];
        } else if (container && (typeof container === 'undefined' ? 'undefined' : _typeof(container)) === 'object' && container.length) {
            // Although not documented, the container may also be an array-like list of
            // elements such as a NodeList or jQuery collection, is returnCollection is true

            elements = container;
        } else {
            throw new Error(_mixitup.messages.errorFactoryInvalidContainer());
        }

        if (elements.length < 1) {
            throw new Error(_mixitup.messages.errorFactoryContainerNotFound());
        }

        for (i = 0; el = elements[i]; i++) {
            if (i > 0 && !returnCollection) break;

            if (!el.id) {
                id = 'MixItUp' + h.randomHex();

                el.id = id;
            } else {
                id = el.id;
            }

            if (_mixitup.instances[id] instanceof _mixitup.Mixer) {
                instance = _mixitup.instances[id];

                if (!config || config && config.debug && config.debug.showWarnings !== false) {
                    console.warn(_mixitup.messages.warningFactoryPreexistingInstance());
                }
            } else {
                instance = new _mixitup.Mixer();

                instance.attach(el, doc, id, config);

                _mixitup.instances[id] = instance;
            }

            facade = new _mixitup.Facade(instance);

            if (config && config.debug && config.debug.enable) {
                instances.push(instance);
            } else {
                instances.push(facade);
            }
        }

        if (returnCollection) {
            output = new _mixitup.Collection(instances);
        } else {
            // Return the first instance regardless

            output = instances[0];
        }

        return output;
    };

    /**
     * The `.use()` static method is used to extend the functionality of mixitup with compatible
     * extensions and libraries in an environment with modular scoping e.g. ES2015, CommonJS, or RequireJS.
     *
     * You need only call the `.use()` function once per project, per extension, as module loaders
     * will cache a single reference to MixItUp inclusive of all changes made.
     *
     * @example
     * mixitup.use(extension)
     *
     * @example <caption>Example 1: Extending MixItUp with the Pagination Extension</caption>
     *
     * import mixitup from 'mixitup';
     * import mixitupPagination from 'mixitup-pagination';
     *
     * mixitup.use(mixitupPagination);
     *
     * // All mixers created by the factory function in all modules will now
     * // have pagination functionality
     *
     * var mixer = mixitup('.container');
     *
     * @public
     * @name     use
     * @memberof mixitup
     * @kind     function
     * @static
     * @since    3.0.0
     * @param    {*}  extension   A reference to the extension or library to be used.
     * @return   {void}
     */

    _mixitup.use = function (extension) {
        _mixitup.Base.prototype.callActions.call(_mixitup, 'beforeUse', arguments);

        // Call the extension's factory function, passing
        // the mixitup factory as a paramater

        if (typeof extension === 'function' && extension.TYPE === 'mixitup-extension') {
            // Mixitup extension

            if (typeof _mixitup.extensions[extension.NAME] === 'undefined') {
                extension(_mixitup);

                _mixitup.extensions[extension.NAME] = extension;
            }
        } else if (extension.fn && extension.fn.jquery) {
            // jQuery

            _mixitup.libraries.$ = extension;
        }

        _mixitup.Base.prototype.callActions.call(_mixitup, 'afterUse', arguments);
    };

    _mixitup.instances = {};
    _mixitup.extensions = {};
    _mixitup.libraries = {};

    /**
     * @private
     */

    h = {

        /**
         * @private
         * @param   {HTMLElement}   el
         * @param   {string}        cls
         * @return  {boolean}
         */

        hasClass: function hasClass(el, cls) {
            return !!el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        },

        /**
         * @private
         * @param   {HTMLElement}   el
         * @param   {string}        cls
         * @return  {void}
         */

        addClass: function addClass(el, cls) {
            if (!this.hasClass(el, cls)) el.className += el.className ? ' ' + cls : cls;
        },

        /**
         * @private
         * @param   {HTMLElement}   el
         * @param   {string}        cls
         * @return  {void}
         */

        removeClass: function removeClass(el, cls) {
            if (this.hasClass(el, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');

                el.className = el.className.replace(reg, ' ').trim();
            }
        },

        /**
         * Merges the properties of the source object onto the
         * target object. Alters the target object.
         *
         * @private
         * @param   {object}    destination
         * @param   {object}    source
         * @param   {boolean}   [deep=false]
         * @param   {boolean}   [handleErrors=false]
         * @return  {void}
         */

        extend: function extend(destination, source, deep, handleErrors) {
            var sourceKeys = [],
                key = '',
                i = -1;

            deep = deep || false;
            handleErrors = handleErrors || false;

            try {
                if (Array.isArray(source)) {
                    for (i = 0; i < source.length; i++) {
                        sourceKeys.push(i);
                    }
                } else if (source) {
                    sourceKeys = Object.keys(source);
                }

                for (i = 0; i < sourceKeys.length; i++) {
                    key = sourceKeys[i];

                    if (!deep || _typeof(source[key]) !== 'object' || this.isElement(source[key])) {
                        // All non-object properties, or all properties if shallow extend

                        destination[key] = source[key];
                    } else if (Array.isArray(source[key])) {
                        // Arrays

                        if (!destination[key]) {
                            destination[key] = [];
                        }

                        this.extend(destination[key], source[key], deep, handleErrors);
                    } else {
                        // Objects

                        if (!destination[key]) {
                            destination[key] = {};
                        }

                        this.extend(destination[key], source[key], deep, handleErrors);
                    }
                }
            } catch (err) {
                if (handleErrors) {
                    this.handleExtendError(err, destination);
                } else {
                    throw err;
                }
            }

            return destination;
        },

        /**
         * @private
         * @param   {Error}  err
         * @param   {object} destination
         * @return  {void}
         */

        handleExtendError: function handleExtendError(err, destination) {
            var re = /property "?(\w*)"?[,:] object/i,
                matches = null,
                erroneous = '',
                message = '',
                suggestion = '',
                probableMatch = '',
                key = '',
                mostMatchingChars = -1,
                i = -1;

            if (err instanceof TypeError && (matches = re.exec(err.message))) {
                erroneous = matches[1];

                for (key in destination) {
                    i = 0;

                    while (i < erroneous.length && erroneous.charAt(i) === key.charAt(i)) {
                        i++;
                    }

                    if (i > mostMatchingChars) {
                        mostMatchingChars = i;
                        probableMatch = key;
                    }
                }

                if (mostMatchingChars > 1) {
                    suggestion = _mixitup.messages.errorConfigInvalidPropertySuggestion({
                        probableMatch: probableMatch
                    });
                }

                message = _mixitup.messages.errorConfigInvalidProperty({
                    erroneous: erroneous,
                    suggestion: suggestion
                });

                throw new TypeError(message);
            }

            throw err;
        },

        /**
         * @private
         * @param   {string} str
         * @return  {function}
         */

        template: function template(str) {
            var re = /\${([\w]*)}/g,
                dynamics = {},
                matches = null;

            while (matches = re.exec(str)) {
                dynamics[matches[1]] = new RegExp('\\${' + matches[1] + '}', 'g');
            }

            return function (data) {
                var key = '',
                    output = str;

                data = data || {};

                for (key in dynamics) {
                    output = output.replace(dynamics[key], typeof data[key] !== 'undefined' ? data[key] : '');
                }

                return output;
            };
        },

        /**
         * @private
         * @param   {HTMLElement}   el
         * @param   {string}        type
         * @param   {function}      fn
         * @param   {boolean}       useCapture
         * @return  {void}
         */

        on: function on(el, type, fn, useCapture) {
            if (!el) return;

            if (el.addEventListener) {
                el.addEventListener(type, fn, useCapture);
            } else if (el.attachEvent) {
                el['e' + type + fn] = fn;

                el[type + fn] = function () {
                    el['e' + type + fn](window.event);
                };

                el.attachEvent('on' + type, el[type + fn]);
            }
        },

        /**
         * @private
         * @param   {HTMLElement}   el
         * @param   {string}        type
         * @param   {function}      fn
         * @return  {void}
         */

        off: function off(el, type, fn) {
            if (!el) return;

            if (el.removeEventListener) {
                el.removeEventListener(type, fn, false);
            } else if (el.detachEvent) {
                el.detachEvent('on' + type, el[type + fn]);
                el[type + fn] = null;
            }
        },

        /**
         * @private
         * @param   {string}      eventType
         * @param   {object}      detail
         * @param   {Document}    [doc]
         * @return  {CustomEvent}
         */

        getCustomEvent: function getCustomEvent(eventType, detail, doc) {
            var event = null;

            doc = doc || window.document;

            if (typeof window.CustomEvent === 'function') {
                event = new window.CustomEvent(eventType, {
                    detail: detail,
                    bubbles: true,
                    cancelable: true
                });
            } else if (typeof doc.createEvent === 'function') {
                event = doc.createEvent('CustomEvent');
                event.initCustomEvent(eventType, true, true, detail);
            } else {
                event = doc.createEventObject(), event.type = eventType;

                event.returnValue = false;
                event.cancelBubble = false;
                event.detail = detail;
            }

            return event;
        },

        /**
         * @private
         * @param   {Event} e
         * @return  {Event}
         */

        getOriginalEvent: function getOriginalEvent(e) {
            if (e.touches && e.touches.length) {
                return e.touches[0];
            } else if (e.changedTouches && e.changedTouches.length) {
                return e.changedTouches[0];
            } else {
                return e;
            }
        },

        /**
         * @private
         * @param   {HTMLElement}   el
         * @param   {string}        selector
         * @return  {Number}
         */

        index: function index(el, selector) {
            var i = 0;

            while ((el = el.previousElementSibling) !== null) {
                if (!selector || el.matches(selector)) {
                    ++i;
                }
            }

            return i;
        },

        /**
         * Converts a dash or snake-case string to camel case.
         *
         * @private
         * @param   {string}    str
         * @param   {boolean}   [isPascal]
         * @return  {string}
         */

        camelCase: function camelCase(str) {
            return str.toLowerCase().replace(/([_-][a-z])/g, function ($1) {
                return $1.toUpperCase().replace(/[_-]/, '');
            });
        },

        /**
         * Converts a dash or snake-case string to pascal case.
         *
         * @private
         * @param   {string}    str
         * @param   {boolean}   [isPascal]
         * @return  {string}
         */

        pascalCase: function pascalCase(str) {
            return (str = this.camelCase(str)).charAt(0).toUpperCase() + str.slice(1);
        },

        /**
         * Converts a camel or pascal-case string to dash case.
         *
         * @private
         * @param   {string}    str
         * @return  {string}
         */

        dashCase: function dashCase(str) {
            return str.replace(/([A-Z])/g, '-$1').replace(/^-/, '').toLowerCase();
        },

        /**
         * @private
         * @param   {HTMLElement}       el
         * @param   {HTMLHtmlElement}   [doc]
         * @return  {boolean}
         */

        isElement: function isElement(el, doc) {
            doc = doc || window.document;

            if (window.HTMLElement && el instanceof window.HTMLElement) {
                return true;
            } else if (doc.defaultView && doc.defaultView.HTMLElement && el instanceof doc.defaultView.HTMLElement) {
                return true;
            } else {
                return el !== null && el.nodeType === 1 && typeof el.nodeName === 'string';
            }
        },

        /**
         * @private
         * @param   {string}            htmlString
         * @param   {HTMLHtmlElement}   [doc]
         * @return  {DocumentFragment}
         */

        createElement: function createElement(htmlString, doc) {
            var frag = null,
                temp = null;

            doc = doc || window.document;

            frag = doc.createDocumentFragment();
            temp = doc.createElement('div');

            temp.innerHTML = htmlString;

            while (temp.firstChild) {
                frag.appendChild(temp.firstChild);
            }

            return frag;
        },

        /**
         * @private
         * @param   {Node} node
         * @return  {void}
         */

        removeWhitespace: function removeWhitespace(node) {
            var deleting;

            while (node && node.nodeName === '#text') {
                deleting = node;

                node = node.previousSibling;

                deleting.parentElement && deleting.parentElement.removeChild(deleting);
            }
        },

        /**
         * @private
         * @param   {Array<*>}  a
         * @param   {Array<*>}  b
         * @return  {boolean}
         */

        isEqualArray: function isEqualArray(a, b) {
            var i = a.length;

            if (i !== b.length) return false;

            while (i--) {
                if (a[i] !== b[i]) return false;
            }

            return true;
        },

        /**
         * @private
         * @param   {object}  a
         * @param   {object}  b
         * @return  {boolean}
         */

        deepEquals: function deepEquals(a, b) {
            var key;

            if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' && a && (typeof b === 'undefined' ? 'undefined' : _typeof(b)) === 'object' && b) {
                if (Object.keys(a).length !== Object.keys(b).length) return false;

                for (key in a) {
                    if (!b.hasOwnProperty(key) || !this.deepEquals(a[key], b[key])) return false;
                }
            } else if (a !== b) {
                return false;
            }

            return true;
        },

        /**
         * @private
         * @param   {Array<*>}  oldArray
         * @return  {Array<*>}
         */

        arrayShuffle: function arrayShuffle(oldArray) {
            var newArray = oldArray.slice(),
                len = newArray.length,
                i = len,
                p = -1,
                t = [];

            while (i--) {
                p = ~~(Math.random() * len);
                t = newArray[i];

                newArray[i] = newArray[p];
                newArray[p] = t;
            }

            return newArray;
        },

        /**
         * @private
         * @param   {object}    list
         */

        arrayFromList: function arrayFromList(list) {
            var output, i;

            try {
                return Array.prototype.slice.call(list);
            } catch (err) {
                output = [];

                for (i = 0; i < list.length; i++) {
                    output.push(list[i]);
                }

                return output;
            }
        },

        /**
         * @private
         * @param   {function}  func
         * @param   {Number}    wait
         * @param   {boolean}   immediate
         * @return  {function}
         */

        debounce: function debounce(func, wait, immediate) {
            var timeout;

            return function () {
                var self = this,
                    args = arguments,
                    callNow = immediate && !timeout,
                    later = null;

                later = function later() {
                    timeout = null;

                    if (!immediate) {
                        func.apply(self, args);
                    }
                };

                clearTimeout(timeout);

                timeout = setTimeout(later, wait);

                if (callNow) func.apply(self, args);
            };
        },

        /**
         * @private
         * @param   {HTMLElement}   element
         * @return  {object}
         */

        position: function position(element) {
            var xPosition = 0,
                yPosition = 0,
                offsetParent = element;

            while (element) {
                xPosition -= element.scrollLeft;
                yPosition -= element.scrollTop;

                if (element === offsetParent) {
                    xPosition += element.offsetLeft;
                    yPosition += element.offsetTop;

                    offsetParent = element.offsetParent;
                }

                element = element.parentElement;
            }

            return {
                x: xPosition,
                y: yPosition
            };
        },

        /**
         * @private
         * @param   {object}    node1
         * @param   {object}    node2
         * @return  {Number}
         */

        getHypotenuse: function getHypotenuse(node1, node2) {
            var distanceX = node1.x - node2.x,
                distanceY = node1.y - node2.y;

            distanceX = distanceX < 0 ? distanceX * -1 : distanceX, distanceY = distanceY < 0 ? distanceY * -1 : distanceY;

            return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
        },

        /**
         * Calcuates the area of intersection between two rectangles and expresses it as
         * a ratio in comparison to the area of the first rectangle.
         *
         * @private
         * @param   {Rect}  box1
         * @param   {Rect}  box2
         * @return  {number}
         */

        getIntersectionRatio: function getIntersectionRatio(box1, box2) {
            var controlArea = box1.width * box1.height,
                intersectionX = -1,
                intersectionY = -1,
                intersectionArea = -1,
                ratio = -1;

            intersectionX = Math.max(0, Math.min(box1.left + box1.width, box2.left + box2.width) - Math.max(box1.left, box2.left));

            intersectionY = Math.max(0, Math.min(box1.top + box1.height, box2.top + box2.height) - Math.max(box1.top, box2.top));

            intersectionArea = intersectionY * intersectionX;

            ratio = intersectionArea / controlArea;

            return ratio;
        },

        /**
         * @private
         * @param   {object}            el
         * @param   {string}            selector
         * @param   {boolean}           [includeSelf]
         * @param   {HTMLHtmlElement}   [doc]
         * @return  {Element|null}
         */

        closestParent: function closestParent(el, selector, includeSelf, doc) {
            var parent = el.parentNode;

            doc = doc || window.document;

            if (includeSelf && el.matches(selector)) {
                return el;
            }

            while (parent && parent != doc.body) {
                if (parent.matches && parent.matches(selector)) {
                    return parent;
                } else if (parent.parentNode) {
                    parent = parent.parentNode;
                } else {
                    return null;
                }
            }

            return null;
        },

        /**
         * @private
         * @param   {HTMLElement}       el
         * @param   {string}            selector
         * @param   {HTMLHtmlElement}   [doc]
         * @return  {NodeList}
         */

        children: function children(el, selector, doc) {
            var children = [],
                tempId = '';

            doc = doc || window.doc;

            if (el) {
                if (!el.id) {
                    tempId = 'Temp' + this.randomHexKey();

                    el.id = tempId;
                }

                children = doc.querySelectorAll('#' + el.id + ' > ' + selector);

                if (tempId) {
                    el.removeAttribute('id');
                }
            }

            return children;
        },

        /**
         * Creates a clone of a provided array, with any empty strings removed.
         *
         * @private
         * @param   {Array<*>} originalArray
         * @return  {Array<*>}
         */

        clean: function clean(originalArray) {
            var cleanArray = [],
                i = -1;

            for (i = 0; i < originalArray.length; i++) {
                if (originalArray[i] !== '') {
                    cleanArray.push(originalArray[i]);
                }
            }

            return cleanArray;
        },

        /**
         * Abstracts an ES6 promise into a q-like deferred interface for storage and deferred resolution.
         *
         * @private
         * @param  {object} libraries
         * @return {h.Deferred}
         */

        defer: function defer(libraries) {
            var deferred = null,
                promiseWrapper = null,
                $ = null;

            promiseWrapper = new this.Deferred();

            if (_mixitup.features.has.promises) {
                // ES6 native promise or polyfill

                promiseWrapper.promise = new Promise(function (resolve, reject) {
                    promiseWrapper.resolve = resolve;
                    promiseWrapper.reject = reject;
                });
            } else if (($ = window.jQuery || libraries.$) && typeof $.Deferred === 'function') {
                // jQuery

                deferred = $.Deferred();

                promiseWrapper.promise = deferred.promise();
                promiseWrapper.resolve = deferred.resolve;
                promiseWrapper.reject = deferred.reject;
            } else if (window.console) {
                // No implementation

                console.warn(_mixitup.messages.warningNoPromiseImplementation());
            }

            return promiseWrapper;
        },

        /**
         * @private
         * @param   {Array<Promise>}    tasks
         * @param   {object}            libraries
         * @return  {Promise<Array>}
         */

        all: function all(tasks, libraries) {
            var $ = null;

            if (_mixitup.features.has.promises) {
                return Promise.all(tasks);
            } else if (($ = window.jQuery || libraries.$) && typeof $.when === 'function') {
                return $.when.apply($, tasks).done(function () {
                    // jQuery when returns spread arguments rather than an array or resolutions

                    return arguments;
                });
            }

            // No implementation

            if (window.console) {
                console.warn(_mixitup.messages.warningNoPromiseImplementation());
            }

            return [];
        },

        /**
         * @private
         * @param   {HTMLElement}   el
         * @param   {string}        property
         * @param   {Array<string>} vendors
         * @return  {string}
         */

        getPrefix: function getPrefix(el, property, vendors) {
            var i = -1,
                prefix = '';

            if (h.dashCase(property) in el.style) return '';

            for (i = 0; prefix = vendors[i]; i++) {
                if (prefix + property in el.style) {
                    return prefix.toLowerCase();
                }
            }

            return 'unsupported';
        },

        /**
         * @private
         * @return  {string}
         */

        randomHex: function randomHex() {
            return ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6).toUpperCase();
        },

        /**
         * @private
         * @param   {HTMLDocument}  [doc]
         * @return  {object}
         */

        getDocumentState: function getDocumentState(doc) {
            doc = _typeof(doc.body) === 'object' ? doc : window.document;

            return {
                scrollTop: window.pageYOffset,
                scrollLeft: window.pageXOffset,
                docHeight: doc.documentElement.scrollHeight,
                docWidth: doc.documentElement.scrollWidth,
                viewportHeight: doc.documentElement.clientHeight,
                viewportWidth: doc.documentElement.clientWidth
            };
        },

        /**
         * @private
         * @param   {object}    obj
         * @param   {function}  fn
         * @return  {function}
         */

        bind: function bind(obj, fn) {
            return function () {
                return fn.apply(obj, arguments);
            };
        },

        /**
         * @private
         * @param   {HTMLElement}   el
         * @return  {boolean}
         */

        isVisible: function isVisible(el) {
            var styles = null;

            if (el.offsetParent) return true;

            styles = window.getComputedStyle(el);

            if (styles.position === 'fixed' && styles.visibility !== 'hidden' && styles.opacity !== '0') {
                // Fixed elements report no offsetParent,
                // but may still be invisible

                return true;
            }

            return false;
        },

        /**
         * @private
         * @param   {object}    obj
         */

        seal: function seal(obj) {
            if (typeof Object.seal === 'function') {
                Object.seal(obj);
            }
        },

        /**
         * @private
         * @param   {object}    obj
         */

        freeze: function freeze(obj) {
            if (typeof Object.freeze === 'function') {
                Object.freeze(obj);
            }
        },

        /**
         * @private
         * @param   {string}    control
         * @param   {string}    specimen
         * @return  {boolean}
         */

        compareVersions: function compareVersions(control, specimen) {
            var controlParts = control.split('.'),
                specimenParts = specimen.split('.'),
                controlPart = -1,
                specimenPart = -1,
                i = -1;

            for (i = 0; i < controlParts.length; i++) {
                controlPart = parseInt(controlParts[i].replace(/[^\d.]/g, ''));
                specimenPart = parseInt(specimenParts[i].replace(/[^\d.]/g, '') || 0);

                if (specimenPart < controlPart) {
                    return false;
                } else if (specimenPart > controlPart) {
                    return true;
                }
            }

            return true;
        },

        /**
         * @private
         * @constructor
         */

        Deferred: function Deferred() {
            this.promise = null;
            this.resolve = null;
            this.reject = null;
            this.id = h.randomHex();
        },

        /**
         * @private
         * @param   {object}  obj
         * @return  {boolean}
         */

        isEmptyObject: function isEmptyObject(obj) {
            var key = '';

            if (typeof Object.keys === 'function') {
                return Object.keys(obj).length === 0;
            }

            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    return false;
                }
            }

            return true;
        },

        /**
         * @param   {mixitup.Config.ClassNames}   classNames
         * @param   {string}                      elementName
         * @param   {string}                      [modifier]
         * @return  {string}
         */

        getClassname: function getClassname(classNames, elementName, modifier) {
            var classname = '';

            classname += classNames.block;

            if (classname.length) {
                classname += classNames.delineatorElement;
            }

            classname += classNames['element' + this.pascalCase(elementName)];

            if (!modifier) return classname;

            if (classname.length) {
                classname += classNames.delineatorModifier;
            }

            classname += modifier;

            return classname;
        },

        /**
         * Returns the value of a property on a given object via its string key.
         *
         * @param   {object}    obj
         * @param   {string}    stringKey
         * @return  {*} value
         */

        getProperty: function getProperty(obj, stringKey) {
            var parts = stringKey.split('.'),
                returnCurrent = null,
                current = '',
                i = 0;

            if (!stringKey) {
                return obj;
            }

            returnCurrent = function returnCurrent(obj) {
                if (!obj) {
                    return null;
                } else {
                    return obj[current];
                }
            };

            while (i < parts.length) {
                current = parts[i];

                obj = returnCurrent(obj);

                i++;
            }

            if (typeof obj !== 'undefined') {
                return obj;
            } else {
                return null;
            }
        }
    };

    _mixitup.h = h;

    /**
     * The Base class adds instance methods to all other extensible MixItUp classes,
     * enabling the calling of any registered hooks.
     *
     * @constructor
     * @namespace
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.Base = function () {};

    _mixitup.Base.prototype = {
        constructor: _mixitup.Base,

        /**
         * Calls any registered hooks for the provided action.
         *
         * @memberof    mixitup.Base
         * @private
         * @instance
         * @since       2.0.0
         * @param       {string}    actionName
         * @param       {Array<*>}  args
         * @return      {void}
         */

        callActions: function callActions(actionName, args) {
            var self = this,
                hooks = self.constructor.actions[actionName],
                extensionName = '';

            if (!hooks || h.isEmptyObject(hooks)) return;

            for (extensionName in hooks) {
                hooks[extensionName].apply(self, args);
            }
        },

        /**
         * Calls any registered hooks for the provided filter.
         *
         * @memberof    mixitup.Base
         * @private
         * @instance
         * @since       2.0.0
         * @param       {string}    filterName
         * @param       {*}         input
         * @param       {Array<*>}  args
         * @return      {*}
         */

        callFilters: function callFilters(filterName, input, args) {
            var self = this,
                hooks = self.constructor.filters[filterName],
                output = input,
                extensionName = '';

            if (!hooks || h.isEmptyObject(hooks)) return output;

            args = args || [];

            for (extensionName in hooks) {
                args = h.arrayFromList(args);

                args.unshift(output);

                output = hooks[extensionName].apply(self, args);
            }

            return output;
        }
    };

    /**
     * The BaseStatic class holds a set of static methods which are then added to all other
     * extensible MixItUp classes as a means of integrating extensions via the addition of new
     * methods and/or actions and hooks.
     *
     * @constructor
     * @namespace
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.BaseStatic = function () {
        this.actions = {};
        this.filters = {};

        /**
         * Performs a shallow extend on the class's prototype, adding one or more new members to
         * the class in a single operation.
         *
         * @memberof    mixitup.BaseStatic
         * @public
         * @static
         * @since       2.1.0
         * @param       {object} extension
         * @return      {void}
         */

        this.extend = function (extension) {
            h.extend(this.prototype, extension);
        };

        /**
         * Registers a function to be called on the action hook of the provided name.
         *
         * @memberof    mixitup.BaseStatic
         * @public
         * @static
         * @since       2.1.0
         * @param       {string}    hookName
         * @param       {string}    extensionName
         * @param       {function}  func
         * @return      {void}
         */

        this.registerAction = function (hookName, extensionName, func) {
            (this.actions[hookName] = this.actions[hookName] || {})[extensionName] = func;
        };

        /**
         * Registers a function to be called on the filter of the provided name.
         *
         * @memberof    mixitup.BaseStatic
         * @public
         * @static
         * @since       2.1.0
         * @param       {string}    hookName
         * @param       {string}    extensionName
         * @param       {function}  func
         * @return      {void}
         */

        this.registerFilter = function (hookName, extensionName, func) {
            (this.filters[hookName] = this.filters[hookName] || {})[extensionName] = func;
        };
    };

    /**
     * The `mixitup.Features` class performs all feature and CSS prefix detection
     * neccessary for MixItUp to function correctly, as well as storing various
     * string and array constants. All feature decection is on evaluation of the
     * library and stored in a singleton instance for use by other internal classes.
     *
     * @constructor
     * @namespace
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.Features = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        this.boxSizingPrefix = '';
        this.transformPrefix = '';
        this.transitionPrefix = '';

        this.boxSizingPrefix = '';
        this.transformProp = '';
        this.transformRule = '';
        this.transitionProp = '';
        this.perspectiveProp = '';
        this.perspectiveOriginProp = '';

        this.has = new _mixitup.Has();

        this.canary = null;

        this.BOX_SIZING_PROP = 'boxSizing';
        this.TRANSITION_PROP = 'transition';
        this.TRANSFORM_PROP = 'transform';
        this.PERSPECTIVE_PROP = 'perspective';
        this.PERSPECTIVE_ORIGIN_PROP = 'perspectiveOrigin';
        this.VENDORS = ['Webkit', 'moz', 'O', 'ms'];

        this.TWEENABLE = ['opacity', 'width', 'height', 'marginRight', 'marginBottom', 'x', 'y', 'scale', 'translateX', 'translateY', 'translateZ', 'rotateX', 'rotateY', 'rotateZ'];

        this.callActions('afterConstruct');
    };

    _mixitup.BaseStatic.call(_mixitup.Features);

    _mixitup.Features.prototype = Object.create(_mixitup.Base.prototype);

    h.extend(_mixitup.Features.prototype,
    /** @lends mixitup.Features */
    {
        constructor: _mixitup.Features,

        /**
         * @private
         * @return  {void}
         */

        init: function init() {
            var self = this;

            self.callActions('beforeInit', arguments);

            self.canary = document.createElement('div');

            self.setPrefixes();
            self.runTests();

            self.callActions('beforeInit', arguments);
        },

        /**
         * @private
         * @return  {void}
         */

        runTests: function runTests() {
            var self = this;

            self.callActions('beforeRunTests', arguments);

            self.has.promises = typeof window.Promise === 'function';
            self.has.transitions = self.transitionPrefix !== 'unsupported';

            self.callActions('afterRunTests', arguments);

            h.freeze(self.has);
        },

        /**
         * @private
         * @return  {void}
         */

        setPrefixes: function setPrefixes() {
            var self = this;

            self.callActions('beforeSetPrefixes', arguments);

            self.transitionPrefix = h.getPrefix(self.canary, 'Transition', self.VENDORS);
            self.transformPrefix = h.getPrefix(self.canary, 'Transform', self.VENDORS);
            self.boxSizingPrefix = h.getPrefix(self.canary, 'BoxSizing', self.VENDORS);

            self.boxSizingProp = self.boxSizingPrefix ? self.boxSizingPrefix + h.pascalCase(self.BOX_SIZING_PROP) : self.BOX_SIZING_PROP;

            self.transitionProp = self.transitionPrefix ? self.transitionPrefix + h.pascalCase(self.TRANSITION_PROP) : self.TRANSITION_PROP;

            self.transformProp = self.transformPrefix ? self.transformPrefix + h.pascalCase(self.TRANSFORM_PROP) : self.TRANSFORM_PROP;

            self.transformRule = self.transformPrefix ? '-' + self.transformPrefix + '-' + self.TRANSFORM_PROP : self.TRANSFORM_PROP;

            self.perspectiveProp = self.transformPrefix ? self.transformPrefix + h.pascalCase(self.PERSPECTIVE_PROP) : self.PERSPECTIVE_PROP;

            self.perspectiveOriginProp = self.transformPrefix ? self.transformPrefix + h.pascalCase(self.PERSPECTIVE_ORIGIN_PROP) : self.PERSPECTIVE_ORIGIN_PROP;

            self.callActions('afterSetPrefixes', arguments);
        }
    });

    /**
     * @constructor
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.Has = function () {
        this.transitions = false;
        this.promises = false;

        h.seal(this);
    };

    // Assign a singleton instance to `mixitup.features` and initialise:

    _mixitup.features = new _mixitup.Features();

    _mixitup.features.init();

    /**
     * A group of properties defining the mixer's animation and effects settings.
     *
     * @constructor
     * @memberof    mixitup.Config
     * @name        animation
     * @namespace
     * @public
     * @since       2.0.0
     */

    _mixitup.ConfigAnimation = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        /**
         * A boolean dictating whether or not animation should be enabled for the MixItUp instance.
         * If `false`, all operations will occur instantly and syncronously, although callback
         * functions and any returned promises will still be fulfilled.
         *
         * @example <caption>Example: Create a mixer with all animations disabled</caption>
         * var mixer = mixitup(containerEl, {
         *     animation: {
         *         enable: false
         *     }
         * });
         *
         * @name        enable
         * @memberof    mixitup.Config.animation
         * @instance
         * @type        {boolean}
         * @default     true
         */

        this.enable = true;

        /**
         * A string of one or more space-seperated properties to which transitions will be
         * applied for all filtering animations.
         *
         * Properties can be listed any order or combination, although they will be applied in a specific
         * predefined order to produce consistent results.
         *
         * To learn more about available effects, experiment with our <a href="https://www.kunkalabs.com/mixitup/">
         * sandbox demo</a> and try out the "Export config" button in the Animation options drop down.
         *
         * @example <caption>Example: Apply "fade" and "translateZ" effects to all animations</caption>
         * // As targets are filtered in and out, they will fade between
         * // opacity 1 and 0 and transform between translateZ(-100px) and
         * // translateZ(0).
         *
         * var mixer = mixitup(containerEl, {
         *     animation: {
         *         effects: 'fade translateZ(-100px)'
         *     }
         * });
         *
         * @name        effects
         * @memberof    mixitup.Config.animation
         * @instance
         * @type        {string}
         * @default     'fade scale'
         */

        this.effects = 'fade scale';

        /**
         * A string of one or more space-seperated effects to be applied only to filter-in
         * animations, overriding `config.animation.effects` if set.
         *
         * @example <caption>Example: Apply downwards vertical translate to targets being filtered in</caption>
         *
         * var mixer = mixitup(containerEl, {
         *     animation: {
         *         effectsIn: 'fade translateY(-100%)'
         *     }
         * });
         *
         * @name        effectsIn
         * @memberof    mixitup.Config.animation
         * @instance
         * @type        {string}
         * @default     ''
         */

        this.effectsIn = '';

        /**
         * A string of one or more space-seperated effects to be applied only to filter-out
         * animations, overriding `config.animation.effects` if set.
         *
         * @example <caption>Example: Apply upwards vertical translate to targets being filtered out</caption>
         *
         * var mixer = mixitup(containerEl, {
         *     animation: {
         *         effectsOut: 'fade translateY(-100%)'
         *     }
         * });
         *
         * @name        effectsOut
         * @memberof    mixitup.Config.animation
         * @instance
         * @type        {string}
         * @default     ''
         */

        this.effectsOut = '';

        /**
         * An integer dictating the duration of all MixItUp animations in milliseconds, not
         * including any additional delay apllied via the `'stagger'` effect.
         *
         * @example <caption>Example: Apply an animation duration of 200ms to all mixitup animations</caption>
         *
         * var mixer = mixitup(containerEl, {
         *     animation: {
         *         duration: 200
         *     }
         * });
         *
         * @name        duration
         * @memberof    mixitup.Config.animation
         * @instance
         * @type        {number}
         * @default     600
         */

        this.duration = 600;

        /**
         * A valid CSS3 transition-timing function or shorthand. For a full list of accepted
         * values, visit <a href="http://easings.net" target="_blank">easings.net</a>.
         *
         * @example <caption>Example 1: Apply "ease-in-out" easing to all animations</caption>
         *
         * var mixer = mixitup(containerEl, {
         *     animation: {
         *         easing: 'ease-in-out'
         *     }
         * });
         *
         * @example <caption>Example 2: Apply a custom "cubic-bezier" easing function to all animations</caption>
         * var mixer = mixitup(containerEl, {
         *     animation: {
         *         easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
         *     }
         * });
         *
         * @name        easing
         * @memberof    mixitup.Config.animation
         * @instance
         * @type        {string}
         * @default     'ease'
         */

        this.easing = 'ease';

        /**
         * A boolean dictating whether or not to apply perspective to the MixItUp container
         * during animations. By default, perspective is always applied and creates the
         * illusion of three-dimensional space for effects such as `translateZ`, `rotateX`,
         * and `rotateY`.
         *
         * You may wish to disable this and define your own perspective settings via CSS.
         *
         * @example <caption>Example: Prevent perspective from being applied to any 3D transforms</caption>
         * var mixer = mixitup(containerEl, {
         *     animation: {
         *         applyPerspective: false
         *     }
         * });
         *
         * @name        applyPerspective
         * @memberof    mixitup.Config.animation
         * @instance
         * @type        {bolean}
         * @default     true
         */

        this.applyPerspective = true;

        /**
         * The perspective distance value to be applied to the container during animations,
         * affecting any 3D-transform-based effects.
         *
         * @example <caption>Example: Set a perspective distance of 2000px</caption>
         * var mixer = mixitup(containerEl, {
         *     animation: {
         *         effects: 'rotateY(-25deg)',
         *         perspectiveDistance: '2000px'
         *     }
         * });
         *
         * @name        perspectiveDistance
         * @memberof    mixitup.Config.animation
         * @instance
         * @type        {string}
         * @default     '3000px'
         */

        this.perspectiveDistance = '3000px';

        /**
         * The perspective-origin value to be applied to the container during animations,
         * affecting any 3D-transform-based effects.
         *
         * @example <caption>Example: Set a perspective origin in the top-right of the container</caption>
         * var mixer = mixitup(containerEl, {
         *     animation: {
         *         effects: 'transateZ(-200px)',
         *         perspectiveOrigin: '100% 0'
         *     }
         * });
         *
         * @name        perspectiveOrigin
         * @memberof    mixitup.Config.animation
         * @instance
         * @type        {string}
         * @default     '50% 50%'
         */

        this.perspectiveOrigin = '50% 50%';

        /**
         * A boolean dictating whether or not to enable the queuing of operations.
         *
         * If `true` (default), and a control is clicked or an API call is made while another
         * operation is progress, the operation will go into the queue and will be automatically exectuted
         * when the previous operaitons is finished.
         *
         * If `false`, any requested operations will be ignored, and the `onMixBusy` callback and `mixBusy`
         * event will be fired. If `debug.showWarnings` is enabled, a console warning will also occur.
         *
         * @example <caption>Example: Disable queuing</caption>
         * var mixer = mixitup(containerEl, {
         *     animation: {
         *         queue: false
         *     }
         * });
         *
         * @name        queue
         * @memberof    mixitup.Config.animation
         * @instance
         * @type        {boolean}
         * @default     true
         */

        this.queue = true;

        /**
         * An integer dictacting the maximum number of operations allowed in the queue at
         * any time, when queuing is enabled.
         *
         * @example <caption>Example: Allow a maximum of 5 operations in the queue at any time</caption>
         * var mixer = mixitup(containerEl, {
         *     animation: {
         *         queueLimit: 5
         *     }
         * });
         *
         * @name        queueLimit
         * @memberof    mixitup.Config.animation
         * @instance
         * @type        {number}
         * @default     3
         */

        this.queueLimit = 3;

        /**
         * A boolean dictating whether or not to transition the height and width of the
         * container as elements are filtered in and out. If disabled, the container height
         * will change abruptly.
         *
         * It may be desirable to disable this on mobile devices as the CSS `height` and
         * `width` properties do not receive GPU-acceleration and can therefore cause stuttering.
         *
         * @example <caption>Example 1: Disable the transitioning of the container height and/or width</caption>
         * var mixer = mixitup(containerEl, {
         *     animation: {
         *         animateResizeContainer: false
         *     }
         * });
         *
         * @example <caption>Example 2: Disable the transitioning of the container height and/or width for mobile devices only</caption>
         * var mixer = mixitup(containerEl, {
         *     animation: {
         *         animateResizeContainer: myFeatureTests.isMobile ? false : true
         *     }
         * });
         *
         * @name        animateResizeContainer
         * @memberof    mixitup.Config.animation
         * @instance
         * @type        {boolean}
         * @default     true
         */

        this.animateResizeContainer = true;

        /**
         * A boolean dictating whether or not to transition the height and width of target
         * elements as they change throughout the course of an animation.
         *
         * This is often a must for flex-box grid layouts where the size of target elements may change
         * depending on final their position in relation to their siblings, or for `.changeLayout()`
         * operations where the size of targets change between layouts.
         *
         * NB: This feature requires additional calculations and manipulation to non-hardware-accelerated
         * properties which may adversely affect performance on slower devices, and is therefore
         * disabled by default.
         *
         * @example <caption>Example: Enable the transitioning of target widths and heights</caption>
         * var mixer = mixitup(containerEl, {
         *     animation: {
         *         animateResizeTargets: true
         *     }
         * });
         *
         * @name        animateResizeTargets
         * @memberof    mixitup.Config.animation
         * @instance
         * @type        {boolean}
         * @default     false
         */

        this.animateResizeTargets = false;

        /**
         * A custom function used to manipulate the order in which the stagger delay is
         * incremented when using the ‘stagger’ effect.
         *
         * When using the 'stagger' effect, the delay applied to each target element is incremented
         * based on its index. You may create a custom function to manipulate the order in which the
         * delay is incremented and create engaging non-linear stagger effects.
         *
         * The function receives the index of the target element as a parameter, and must
         * return an integer which serves as the multiplier for the stagger delay.
         *
         * @example <caption>Example 1: Stagger target elements by column in a 3-column grid</caption>
         * var mixer = mixitup(containerEl, {
         *     animation: {
         *         effects: 'fade stagger(100ms)',
         *         staggerSequence: function(i) {
         *             return i % 3;
         *         }
         *     }
         * });
         *
         * @example <caption>Example 2: Using an algorithm to produce a more complex sequence</caption>
         * var mixer = mixitup(containerEl, {
         *     animation: {
         *         effects: 'fade stagger(100ms)',
         *         staggerSequence: function(i) {
         *             return (2*i) - (5*((i/3) - ((1/3) * (i%3))));
         *         }
         *     }
         * });
         *
         * @name        staggerSequence
         * @memberof    mixitup.Config.animation
         * @instance
         * @type        {function}
         * @default     null
         */

        this.staggerSequence = null;

        /**
         * A boolean dictating whether or not to reverse the direction of `translate`
         * and `rotate` transforms for elements being filtered out.
         *
         * It can be used to create carousel-like animations where elements enter and exit
         * from opposite directions. If enabled, the effect `translateX(-100%)` for elements
         * being filtered in would become `translateX(100%)` for targets being filtered out.
         *
         * This functionality can also be achieved by providing seperate effects
         * strings for `config.animation.effectsIn` and `config.animation.effectsOut`.
         *
         * @example <caption>Example: Reverse the desired direction on any translate/rotate effect for targets being filtered out</caption>
         * // Elements being filtered in will be translated from '100%' to '0' while
         * // elements being filtered out will be translated from 0 to '-100%'
         *
         * var mixer = mixitup(containerEl, {
         *     animation: {
         *         effects: 'fade translateX(100%)',
         *         reverseOut: true,
         *         nudge: false // Disable nudging to create a carousel-like effect
         *     }
         * });
         *
         * @name        reverseOut
         * @memberof    mixitup.Config.animation
         * @instance
         * @type        {boolean}
         * @default     false
         */

        this.reverseOut = false;

        /**
         * A boolean dictating whether or not to "nudge" the animation path of targets
         * when they are being filtered in and out simulatenously.
         *
         * This has been the default behavior of MixItUp since version 1, but it
         * may be desirable to disable this effect when filtering directly from
         * one exclusive set of targets to a different exclusive set of targets,
         * to create a carousel-like effect, or a generally more subtle animation.
         *
         * @example <caption>Example: Disable the "nudging" of targets being filtered in and out simulatenously</caption>
         *
         * var mixer = mixitup(containerEl, {
         *     animation: {
         *         nudge: false
         *     }
         * });
         *
         * @name        nudge
         * @memberof    mixitup.Config.animation
         * @instance
         * @type        {boolean}
         * @default     true
         */

        this.nudge = true;

        /**
         * A boolean dictating whether or not to clamp the height of the container while MixItUp's
         * geometry tests are carried out before an operation.
         *
         * To prevent scroll-bar flicker, clamping is turned on by default. But in the case where the
         * height of the container might affect its vertical positioning in the viewport
         * (e.g. a vertically-centered container), this should be turned off to ensure accurate
         * test results and a smooth animation.
         *
         * @example <caption>Example: Disable container height-clamping</caption>
         *
         * var mixer = mixitup(containerEl, {
         *     animation: {
         *         clampHeight: false
         *     }
         * });
         *
         * @name        clampHeight
         * @memberof    mixitup.Config.animation
         * @instance
         * @type        {boolean}
         * @default     true
         */

        this.clampHeight = true;

        /**
         * A boolean dictating whether or not to clamp the width of the container while MixItUp's
         * geometry tests are carried out before an operation.
         *
         * To prevent scroll-bar flicker, clamping is turned on by default. But in the case where the
         * width of the container might affect its horitzontal positioning in the viewport
         * (e.g. a horizontall-centered container), this should be turned off to ensure accurate
         * test results and a smooth animation.
         *
         * @example <caption>Example: Disable container width-clamping</caption>
         *
         * var mixer = mixitup(containerEl, {
         *     animation: {
         *         clampWidth: false
         *     }
         * });
         *
         * @name        clampWidth
         * @memberof    mixitup.Config.animation
         * @instance
         * @type        {boolean}
         * @default     true
         */

        this.clampWidth = true;

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.ConfigAnimation);

    _mixitup.ConfigAnimation.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.ConfigAnimation.prototype.constructor = _mixitup.ConfigAnimation;

    /**
     * A group of properties relating to the behavior of the Mixer.
     *
     * @constructor
     * @memberof    mixitup.Config
     * @name        behavior
     * @namespace
     * @public
     * @since       3.1.12
     */

    _mixitup.ConfigBehavior = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        /**
         * A boolean dictating whether to allow "live" sorting of the mixer.
         *
         * Because of the expensive nature of sorting, MixItUp makes use of several
         * internal optimizations to skip redundant sorting operations, such as when
         * the newly requested sort command is the same as the active one. The caveat
         * to this optimization is that "live" edits to the value of a target's sorting
         * attribute will be ignored when requesting a re-sort by the same attribute.
         *
         * By setting to `behavior.liveSort` to `true`, the mixer will always re-sort
         * regardless of whether or not the sorting attribute and order have changed.
         *
         * @example <caption>Example: Enabling `liveSort` to allow for re-sorting</caption>
         *
         * var mixer = mixitup(containerEl, {
         *     behavior: {
         *         liveSort: true
         *     },
         *     load: {
         *         sort: 'edited:desc'
         *     }
         * });
         *
         * var target = containerEl.children[3];
         *
         * console.log(target.getAttribute('data-edited')); // '2015-04-24'
         *
         * target.setAttribute('data-edited', '2017-08-10'); // Update the target's edited date
         *
         * mixer.sort('edited:desc')
         *     .then(function(state) {
         *         // The target is now at the top of the list
         *
         *         console.log(state.targets[0] === target); // true
         *     });
         *
         * @name        liveSort
         * @memberof    mixitup.Config.behavior
         * @instance
         * @type        {boolean}
         * @default     false
         */

        this.liveSort = false;

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.ConfigBehavior);

    _mixitup.ConfigBehavior.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.ConfigBehavior.prototype.constructor = _mixitup.ConfigBehavior;

    /**
     * A group of optional callback functions to be invoked at various
     * points within the lifecycle of a mixer operation.
     *
     * Each function is analogous to an event of the same name triggered from the
     * container element, and is invoked immediately after it.
     *
     * All callback functions receive the current `state` object as their first
     * argument, as well as other more specific arguments described below.
     *
     * @constructor
     * @memberof    mixitup.Config
     * @name        callbacks
     * @namespace
     * @public
     * @since       2.0.0
     */

    _mixitup.ConfigCallbacks = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        /**
         * A callback function invoked immediately after any MixItUp operation is requested
         * and before animations have begun.
         *
         * A second `futureState` argument is passed to the function which represents the final
         * state of the mixer once the requested operation has completed.
         *
         * @example <caption>Example: Adding an `onMixStart` callback function</caption>
         * var mixer = mixitup(containerEl, {
         *     callbacks: {
         *         onMixStart: function(state, futureState) {
         *              console.log('Starting operation...');
         *         }
         *     }
         * });
         *
         * @name        onMixStart
         * @memberof    mixitup.Config.callbacks
         * @instance
         * @type        {function}
         * @default     null
         */

        this.onMixStart = null;

        /**
         * A callback function invoked when a MixItUp operation is requested while another
         * operation is in progress, and the animation queue is full, or queueing
         * is disabled.
         *
         * @example <caption>Example: Adding an `onMixBusy` callback function</caption>
         * var mixer = mixitup(containerEl, {
         *     callbacks: {
         *         onMixBusy: function(state) {
         *              console.log('Mixer busy');
         *         }
         *     }
         * });
         *
         * @name        onMixBusy
         * @memberof    mixitup.Config.callbacks
         * @instance
         * @type        {function}
         * @default     null
         */

        this.onMixBusy = null;

        /**
         * A callback function invoked after any MixItUp operation has completed, and the
         * state has been updated.
         *
         * @example <caption>Example: Adding an `onMixEnd` callback function</caption>
         * var mixer = mixitup(containerEl, {
         *     callbacks: {
         *         onMixEnd: function(state) {
         *              console.log('Operation complete');
         *         }
         *     }
         * });
         *
         * @name        onMixEnd
         * @memberof    mixitup.Config.callbacks
         * @instance
         * @type        {function}
         * @default     null
         */

        this.onMixEnd = null;

        /**
         * A callback function invoked whenever an operation "fails", i.e. no targets
         * could be found matching the requested filter.
         *
         * @example <caption>Example: Adding an `onMixFail` callback function</caption>
         * var mixer = mixitup(containerEl, {
         *     callbacks: {
         *         onMixFail: function(state) {
         *              console.log('No items could be found matching the requested filter');
         *         }
         *     }
         * });
         *
         * @name        onMixFail
         * @memberof    mixitup.Config.callbacks
         * @instance
         * @type        {function}
         * @default     null
         */

        this.onMixFail = null;

        /**
         * A callback function invoked whenever a MixItUp control is clicked, and before its
         * respective operation is requested.
         *
         * The clicked element is assigned to the `this` keyword within the function. The original
         * click event is passed to the function as the second argument, which can be useful if
         * using `<a>` tags as controls where the default behavior needs to be prevented.
         *
         * Returning `false` from the callback will prevent the control click from triggering
         * an operation.
         *
         * @example <caption>Example 1: Adding an `onMixClick` callback function</caption>
         * var mixer = mixitup(containerEl, {
         *     callbacks: {
         *         onMixClick: function(state, originalEvent) {
         *              console.log('The control "' + this.innerText + '" was clicked');
         *         }
         *     }
         * });
         *
         * @example <caption>Example 2: Using `onMixClick` to manipulate the original click event</caption>
         * var mixer = mixitup(containerEl, {
         *     callbacks: {
         *         onMixClick: function(state, originalEvent) {
         *              // Prevent original click event from bubbling up:
         *              originalEvent.stopPropagation();
         *
         *              // Prevent default behavior of clicked element:
         *              originalEvent.preventDefault();
         *         }
         *     }
         * });
         *
         * @example <caption>Example 3: Using `onMixClick` to conditionally cancel operations</caption>
         * var mixer = mixitup(containerEl, {
         *     callbacks: {
         *         onMixClick: function(state, originalEvent) {
         *              // Perform some conditional check:
         *
         *              if (myApp.isLoading) {
         *                  // By returning false, we can prevent the control click from triggering an operation.
         *
         *                  return false;
         *              }
         *         }
         *     }
         * });
         *
         * @name        onMixClick
         * @memberof    mixitup.Config.callbacks
         * @instance
         * @type        {function}
         * @default     null
         */

        this.onMixClick = null;

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.ConfigCallbacks);

    _mixitup.ConfigCallbacks.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.ConfigCallbacks.prototype.constructor = _mixitup.ConfigCallbacks;

    /**
     * A group of properties relating to clickable control elements.
     *
     * @constructor
     * @memberof    mixitup.Config
     * @name        controls
     * @namespace
     * @public
     * @since       2.0.0
     */

    _mixitup.ConfigControls = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        /**
         * A boolean dictating whether or not controls should be enabled for the mixer instance.
         *
         * If `true` (default behavior), MixItUp will search the DOM for any clickable elements with
         * `data-filter`, `data-sort` or `data-toggle` attributes, and bind them for click events.
         *
         * If `false`, no click handlers will be bound, and all functionality must therefore be performed
         * via the mixer's API methods.
         *
         * If you do not intend to use the default controls, setting this property to `false` will
         * marginally improve the startup time of your mixer instance, and will also prevent any other active
         * mixer instances in the DOM which are bound to controls from controlling the instance.
         *
         * @example <caption>Example: Disabling controls</caption>
         * var mixer = mixitup(containerEl, {
         *     controls: {
         *         enable: false
         *     }
         * });
         *
         * // With the default controls disabled, we can only control
         * // the mixer via its API methods, e.g.:
         *
         * mixer.filter('.cat-1');
         *
         * @name        enable
         * @memberof    mixitup.Config.controls
         * @instance
         * @type        {boolean}
         * @default     true
         */

        this.enable = true;

        /**
         * A boolean dictating whether or not to use event delegation when binding click events
         * to the default controls.
         *
         * If `false` (default behavior), each control button in the DOM will be found and
         * individually bound when a mixer is instantiated, with their corresponding actions
         * cached for performance.
         *
         * If `true`, a single click handler will be applied to the `window` (or container element - see
         * `config.controls.scope`), and any click events triggered by elements with `data-filter`,
         * `data-sort` or `data-toggle` attributes present will be handled as they propagate upwards.
         *
         * If you require a user interface where control buttons may be added, removed, or changed during the
         * lifetime of a mixer, `controls.live` should be set to `true`. There is a marginal but unavoidable
         * performance deficit when using live controls, as the value of each control button must be read
         * from the DOM in real time once the click event has propagated.
         *
         * @example <caption>Example: Setting live controls</caption>
         * var mixer = mixitup(containerEl, {
         *     controls: {
         *         live: true
         *     }
         * });
         *
         * // Control buttons can now be added, remove and changed without breaking
         * // the mixer's UI
         *
         * @name        live
         * @memberof    mixitup.Config.controls
         * @instance
         * @type        {boolean}
         * @default     true
         */

        this.live = false;

        /**
         * A string dictating the "scope" to use when binding or querying the default controls. The available
         * values are `'global'` or `'local'`.
         *
         * When set to `'global'` (default behavior), MixItUp will query the entire document for control buttons
         * to bind, or delegate click events from (see `config.controls.live`).
         *
         * When set to `'local'`, MixItUp will only query (or bind click events to) its own container element.
         * This may be desireable if you require multiple active mixer instances within the same document, with
         * controls that would otherwise intefere with each other if scoped globally.
         *
         * Conversely, if you wish to control multiple instances with a single UI, you would create one
         * set of controls and keep the controls scope of each mixer set to `global`.
         *
         * @example <caption>Example: Setting 'local' scoped controls</caption>
         * var mixerOne = mixitup(containerOne, {
         *     controls: {
         *         scope: 'local'
         *     }
         * });
         *
         * var mixerTwo = mixitup(containerTwo, {
         *     controls: {
         *         scope: 'local'
         *     }
         * });
         *
         * // Both mixers can now exist within the same document with
         * // isolated controls placed within their container elements.
         *
         * @name        scope
         * @memberof    mixitup.Config.controls
         * @instance
         * @type        {string}
         * @default     'global'
         */

        this.scope = 'global'; // enum: ['local' ,'global']

        /**
         * A string dictating the type of logic to apply when concatenating the filter selectors of
         * active toggle buttons (i.e. any clickable element with a `data-toggle` attribute).
         *
         * If set to `'or'` (default behavior), selectors will be concatenated together as
         * a comma-seperated list. For example:
         *
         * `'.cat-1, .cat-2'` (shows any elements matching `'.cat-1'` OR `'.cat-2'`)
         *
         * If set to `'and'`, selectors will be directly concatenated together. For example:
         *
         * `'.cat-1.cat-2'` (shows any elements which match both `'.cat-1'` AND `'.cat-2'`)
         *
         * @example <caption>Example: Setting "and" toggle logic</caption>
         * var mixer = mixitup(containerEl, {
         *     controls: {
         *         toggleLogic: 'and'
         *     }
         * });
         *
         * @name        toggleLogic
         * @memberof    mixitup.Config.controls
         * @instance
         * @type        {string}
         * @default     'or'
         */

        this.toggleLogic = 'or'; // enum: ['or', 'and']

        /**
         * A string dictating the filter behavior when all toggles are inactive.
         *
         * When set to `'all'` (default behavior), *all* targets will be shown by default
         * when no toggles are active, or at the moment all active toggles are toggled off.
         *
         * When set to `'none'`, no targets will be shown by default when no toggles are
         * active, or at the moment all active toggles are toggled off.
         *
         * @example <caption>Example 1: Setting the default toggle behavior to `'all'`</caption>
         * var mixer = mixitup(containerEl, {
         *     controls: {
         *         toggleDefault: 'all'
         *     }
         * });
         *
         * mixer.toggleOn('.cat-2')
         *     .then(function() {
         *         // Deactivate all active toggles
         *
         *         return mixer.toggleOff('.cat-2')
         *     })
         *     .then(function(state) {
         *          console.log(state.activeFilter.selector); // 'all'
         *          console.log(state.totalShow); // 12
         *     });
         *
         * @example <caption>Example 2: Setting the default toggle behavior to `'none'`</caption>
         * var mixer = mixitup(containerEl, {
         *     controls: {
         *         toggleDefault: 'none'
         *     }
         * });
         *
         * mixer.toggleOn('.cat-2')
         *     .then(function() {
         *         // Deactivate all active toggles
         *
         *         return mixer.toggleOff('.cat-2')
         *     })
         *     .then(function(state) {
         *          console.log(state.activeFilter.selector); // 'none'
         *          console.log(state.totalShow); // 0
         *     });
         *
         * @name        toggleDefault
         * @memberof    mixitup.Config.controls
         * @instance
         * @type        {string}
         * @default     'all'
         */

        this.toggleDefault = 'all'; // enum: ['all', 'none']

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.ConfigControls);

    _mixitup.ConfigControls.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.ConfigControls.prototype.constructor = _mixitup.ConfigControls;

    /**
     * A group of properties defining the output and structure of class names programmatically
     * added to controls and containers to reflect the state of the mixer.
     *
     * Most commonly, class names are added to controls by MixItUp to indicate that
     * the control is active so that it can be styled accordingly - `'mixitup-control-active'` by default.
     *
     * Using a "BEM" like structure, each classname is broken into the three parts:
     * a block namespace (`'mixitup'`), an element name (e.g. `'control'`), and an optional modifier
     * name (e.g. `'active'`) reflecting the state of the element.
     *
     * By default, each part of the classname is concatenated together using single hyphens as
     * delineators, but this can be easily customised to match the naming convention and style of
     * your project.
     *
     * @constructor
     * @memberof    mixitup.Config
     * @name        classNames
     * @namespace
     * @public
     * @since       3.0.0
     */

    _mixitup.ConfigClassNames = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        /**
         * The "block" portion, or top-level namespace added to the start of any class names created by MixItUp.
         *
         * @example <caption>Example 1: changing the `config.classNames.block` value</caption>
         * var mixer = mixitup(containerEl, {
         *     classNames: {
         *         block: 'portfolio'
         *     }
         * });
         *
         * // Active control output: "portfolio-control-active"
         *
         * @example <caption>Example 2: Removing `config.classNames.block`</caption>
         * var mixer = mixitup(containerEl, {
         *     classNames: {
         *         block: ''
         *     }
         * });
         *
         * // Active control output: "control-active"
         *
         * @name        block
         * @memberof    mixitup.Config.classNames
         * @instance
         * @type        {string}
         * @default     'mixitup'
         */

        this.block = 'mixitup';

        /**
         * The "element" portion of the class name added to container.
         *
         * @name        elementContainer
         * @memberof    mixitup.Config.classNames
         * @instance
         * @type        {string}
         * @default     'container'
         */

        this.elementContainer = 'container';

        /**
         * The "element" portion of the class name added to filter controls.
         *
         * By default, all filter, sort, multimix and toggle controls take the same element value of `'control'`, but
         * each type's element value can be individually overwritten to match the unique classNames of your controls as needed.
         *
         * @example <caption>Example 1: changing the `config.classNames.elementFilter` value</caption>
         * var mixer = mixitup(containerEl, {
         *     classNames: {
         *         elementFilter: 'filter'
         *     }
         * });
         *
         * // Active filter output: "mixitup-filter-active"
         *
         * @example <caption>Example 2: changing the `config.classNames.block` and `config.classNames.elementFilter` values</caption>
         * var mixer = mixitup(containerEl, {
         *     classNames: {
         *         block: 'portfolio',
         *         elementFilter: 'filter'
         *     }
         * });
         *
         * // Active filter output: "portfolio-filter-active"
         *
         * @name        elementFilter
         * @memberof    mixitup.Config.classNames
         * @instance
         * @type        {string}
         * @default     'control'
         */

        this.elementFilter = 'control';

        /**
         * The "element" portion of the class name added to sort controls.
         *
         * By default, all filter, sort, multimix and toggle controls take the same element value of `'control'`, but
         * each type's element value can be individually overwritten to match the unique classNames of your controls as needed.
         *
         * @example <caption>Example 1: changing the `config.classNames.elementSort` value</caption>
         * var mixer = mixitup(containerEl, {
         *     classNames: {
         *         elementSort: 'sort'
         *     }
         * });
         *
         * // Active sort output: "mixitup-sort-active"
         *
         * @example <caption>Example 2: changing the `config.classNames.block` and `config.classNames.elementSort` values</caption>
         * var mixer = mixitup(containerEl, {
         *     classNames: {
         *         block: 'portfolio',
         *         elementSort: 'sort'
         *     }
         * });
         *
         * // Active sort output: "portfolio-sort-active"
         *
         * @name        elementSort
         * @memberof    mixitup.Config.classNames
         * @instance
         * @type        {string}
         * @default     'control'
         */

        this.elementSort = 'control';

        /**
         * The "element" portion of the class name added to multimix controls.
         *
         * By default, all filter, sort, multimix and toggle controls take the same element value of `'control'`, but
         * each type's element value can be individually overwritten to match the unique classNames of your controls as needed.
         *
         * @example <caption>Example 1: changing the `config.classNames.elementMultimix` value</caption>
         * var mixer = mixitup(containerEl, {
         *     classNames: {
         *         elementMultimix: 'multimix'
         *     }
         * });
         *
         * // Active multimix output: "mixitup-multimix-active"
         *
         * @example <caption>Example 2: changing the `config.classNames.block` and `config.classNames.elementMultimix` values</caption>
         * var mixer = mixitup(containerEl, {
         *     classNames: {
         *         block: 'portfolio',
         *         elementSort: 'multimix'
         *     }
         * });
         *
         * // Active multimix output: "portfolio-multimix-active"
         *
         * @name        elementMultimix
         * @memberof    mixitup.Config.classNames
         * @instance
         * @type        {string}
         * @default     'control'
         */

        this.elementMultimix = 'control';

        /**
         * The "element" portion of the class name added to toggle controls.
         *
         * By default, all filter, sort, multimix and toggle controls take the same element value of `'control'`, but
         * each type's element value can be individually overwritten to match the unique classNames of your controls as needed.
         *
         * @example <caption>Example 1: changing the `config.classNames.elementToggle` value</caption>
         * var mixer = mixitup(containerEl, {
         *     classNames: {
         *         elementToggle: 'toggle'
         *     }
         * });
         *
         * // Active toggle output: "mixitup-toggle-active"
         *
         * @example <caption>Example 2: changing the `config.classNames.block` and `config.classNames.elementToggle` values</caption>
         * var mixer = mixitup(containerEl, {
         *     classNames: {
         *         block: 'portfolio',
         *         elementToggle: 'toggle'
         *     }
         * });
         *
         * // Active toggle output: "portfolio-toggle-active"
         *
         * @name        elementToggle
         * @memberof    mixitup.Config.classNames
         * @instance
         * @type        {string}
         * @default     'control'
         */

        this.elementToggle = 'control';

        /**
         * The "modifier" portion of the class name added to active controls.
         * @name        modifierActive
         * @memberof    mixitup.Config.classNames
         * @instance
         * @type        {string}
         * @default     'active'
         */

        this.modifierActive = 'active';

        /**
         * The "modifier" portion of the class name added to disabled controls.
         *
         * @name        modifierDisabled
         * @memberof    mixitup.Config.classNames
         * @instance
         * @type        {string}
         * @default     'disabled'
         */

        this.modifierDisabled = 'disabled';

        /**
         * The "modifier" portion of the class name added to the container when in a "failed" state.
         *
         * @name        modifierFailed
         * @memberof    mixitup.Config.classNames
         * @instance
         * @type        {string}
         * @default     'failed'
         */

        this.modifierFailed = 'failed';

        /**
         * The delineator used between the "block" and "element" portions of any class name added by MixItUp.
         *
         * If the block portion is ommited by setting it to an empty string, no delineator will be added.
         *
         * @example <caption>Example: changing the delineator to match BEM convention</caption>
         * var mixer = mixitup(containerEl, {
         *     classNames: {
         *         delineatorElement: '__'
         *     }
         * });
         *
         * // example active control output: "mixitup__control-active"
         *
         * @name        delineatorElement
         * @memberof    mixitup.Config.classNames
         * @instance
         * @type        {string}
         * @default     '-'
         */

        this.delineatorElement = '-';

        /**
         * The delineator used between the "element" and "modifier" portions of any class name added by MixItUp.
         *
         * If the element portion is ommited by setting it to an empty string, no delineator will be added.
         *
         * @example <caption>Example: changing both delineators to match BEM convention</caption>
         * var mixer = mixitup(containerEl, {
         *     classNames: {
         *         delineatorElement: '__'
         *         delineatorModifier: '--'
         *     }
         * });
         *
         * // Active control output: "mixitup__control--active"
         *
         * @name        delineatorModifier
         * @memberof    mixitup.Config.classNames
         * @instance
         * @type        {string}
         * @default     '-'
         */

        this.delineatorModifier = '-';

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.ConfigClassNames);

    _mixitup.ConfigClassNames.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.ConfigClassNames.prototype.constructor = _mixitup.ConfigClassNames;

    /**
     * A group of properties relating to MixItUp's dataset API.
     *
     * @constructor
     * @memberof    mixitup.Config
     * @name        data
     * @namespace
     * @public
     * @since       3.0.0
     */

    _mixitup.ConfigData = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        /**
         * A string specifying the name of the key containing your data model's unique
         * identifier (UID). To use the dataset API, a UID key must be specified and
         * be present and unique on all objects in the dataset you provide to MixItUp.
         *
         * For example, if your dataset is made up of MongoDB documents, the UID
         * key would be `'id'` or `'_id'`.
         *
         * @example <caption>Example: Setting the UID to `'id'`</caption>
         * var mixer = mixitup(containerEl, {
         *     data: {
         *         uidKey: 'id'
         *     }
         * });
         *
         * @name        uidKey
         * @memberof    mixitup.Config.data
         * @instance
         * @type        {string}
         * @default     ''
         */

        this.uidKey = '';

        /**
         * A boolean dictating whether or not MixItUp should "dirty check" each object in
         * your dataset for changes whenever `.dataset()` is called, and re-render any targets
         * for which a change is found.
         *
         * Depending on the complexity of your data model, dirty checking can be expensive
         * and is therefore disabled by default.
         *
         * NB: For changes to be detected, a new immutable instance of the edited model must be
         * provided to mixitup, rather than manipulating properties on the existing instance.
         * If your changes are a result of a DB write and read, you will most likely be calling
         * `.dataset()` with a clean set of objects each time, so this will not be an issue.
         *
         * @example <caption>Example: Enabling dirty checking</caption>
         *
         * var myDataset = [
         *     {
         *         id: 0,
         *         title: "Blog Post Title 0"
         *         ...
         *     },
         *     {
         *         id: 1,
         *         title: "Blog Post Title 1"
         *         ...
         *     }
         * ];
         *
         * // Instantiate a mixer with a pre-loaded dataset, and a target renderer
         * // function defined
         *
         * var mixer = mixitup(containerEl, {
         *     data: {
         *         uidKey: 'id',
         *         dirtyCheck: true
         *     },
         *     load: {
         *         dataset: myDataset
         *     },
         *     render: {
         *         target: function() { ... }
         *     }
         * });
         *
         * // For illustration, we will clone and edit the second object in the dataset.
         * // NB: this would typically be done server-side in response to a DB update,
         * and then re-queried via an API.
         *
         * myDataset[1] = Object.assign({}, myDataset[1]);
         *
         * myDataset[1].title = 'Blog Post Title 11';
         *
         * mixer.dataset(myDataset)
         *    .then(function() {
         *        // the target with ID "1", will be re-rendered reflecting its new title
         *    });
         *
         * @name        dirtyCheck
         * @memberof    mixitup.Config.data
         * @instance
         * @type        {boolean}
         * @default     false
         */

        this.dirtyCheck = false;

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.ConfigData);

    _mixitup.ConfigData.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.ConfigData.prototype.constructor = _mixitup.ConfigData;

    /**
     * A group of properties allowing the toggling of various debug features.
     *
     * @constructor
     * @memberof    mixitup.Config
     * @name        debug
     * @namespace
     * @public
     * @since       3.0.0
     */

    _mixitup.ConfigDebug = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        /**
         * A boolean dictating whether or not the mixer instance returned by the
         * `mixitup()` factory function should expose private properties and methods.
         *
         * By default, mixer instances only expose their public API, but enabling
         * debug mode will give you access to various mixer internals which may aid
         * in debugging, or the authoring of extensions.
         *
         * @example <caption>Example: Enabling debug mode</caption>
         *
         * var mixer = mixitup(containerEl, {
         *     debug: {
         *         enable: true
         *     }
         * });
         *
         * // Private properties and methods will now be visible on the mixer instance:
         *
         * console.log(mixer);
         *
         * @name        enable
         * @memberof    mixitup.Config.debug
         * @instance
         * @type        {boolean}
         * @default     false
         */

        this.enable = false;

        /**
         * A boolean dictating whether or not warnings should be shown when various
         * common gotchas occur.
         *
         * Warnings are intended to provide insights during development when something
         * occurs that is not a fatal, but may indicate an issue with your integration,
         * and are therefore turned on by default. However, you may wish to disable
         * them in production.
         *
         * @example <caption>Example 1: Disabling warnings</caption>
         *
         * var mixer = mixitup(containerEl, {
         *     debug: {
         *         showWarnings: false
         *     }
         * });
         *
         * @example <caption>Example 2: Disabling warnings based on environment</caption>
         *
         * var showWarnings = myAppConfig.environment === 'development' ? true : false;
         *
         * var mixer = mixitup(containerEl, {
         *     debug: {
         *         showWarnings: showWarnings
         *     }
         * });
         *
         * @name        showWarnings
         * @memberof    mixitup.Config.debug
         * @instance
         * @type        {boolean}
         * @default     true
         */

        this.showWarnings = true;

        /**
         * Used for server-side testing only.
         *
         * @private
         * @name        fauxAsync
         * @memberof    mixitup.Config.debug
         * @instance
         * @type        {boolean}
         * @default     false
         */

        this.fauxAsync = false;

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.ConfigDebug);

    _mixitup.ConfigDebug.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.ConfigDebug.prototype.constructor = _mixitup.ConfigDebug;

    /**
     * A group of properties relating to the layout of the container.
     *
     * @constructor
     * @memberof    mixitup.Config
     * @name        layout
     * @namespace
     * @public
     * @since       3.0.0
     */

    _mixitup.ConfigLayout = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        /**
         * A boolean dictating whether or not mixitup should query all descendants
         * of the container for targets, or only immediate children.
         *
         * By default, mixitup will query all descendants matching the
         * `selectors.target` selector when indexing targets upon instantiation.
         * This allows for targets to be nested inside a sub-container which is
         * useful when ring-fencing targets from locally scoped controls in your
         * markup (see `controls.scope`).
         *
         * However, if you are building a more complex UI requiring the nesting
         * of mixers within mixers, you will most likely want to limit targets to
         * immediate children of the container by setting this property to `false`.
         *
         * @example <caption>Example: Restricting targets to immediate children</caption>
         *
         * var mixer = mixitup(containerEl, {
         *     layout: {
         *         allowNestedTargets: false
         *     }
         * });
         *
         * @name        allowNestedTargets
         * @memberof    mixitup.Config.layout
         * @instance
         * @type        {boolean}
         * @default     true
         */

        this.allowNestedTargets = true;

        /**
         * A string specifying an optional class name to apply to the container when in
         * its default state.
         *
         * By changing this class name or adding a class name to the container via the
         * `.changeLayout()` API method, the CSS layout of the container can be changed,
         * and MixItUp will attemp to gracefully animate the container and its targets
         * between states.
         *
         * @example <caption>Example 1: Specifying a container class name</caption>
         *
         * var mixer = mixitup(containerEl, {
         *     layout: {
         *         containerClassName: 'grid'
         *     }
         * });
         *
         * @example <caption>Example 2: Changing the default class name with `.changeLayout()`</caption>
         *
         * var mixer = mixitup(containerEl, {
         *     layout: {
         *         containerClassName: 'grid'
         *     }
         * });
         *
         * mixer.changeLayout('list')
         *     .then(function(state) {
         *          console.log(state.activeContainerClass); // "list"
         *     });
         *
         * @name        containerClassName
         * @memberof    mixitup.Config.layout
         * @instance
         * @type        {string}
         * @default     ''
         */

        this.containerClassName = '';

        /**
         * A reference to a non-target sibling element after which to insert targets
         * when there are no targets in the container.
         *
         * @example <caption>Example: Setting a `siblingBefore` reference element</caption>
         *
         * var addButton = containerEl.querySelector('button');
         *
         * var mixer = mixitup(containerEl, {
         *     layout: {
         *         siblingBefore: addButton
         *     }
         * });
         *
         * @name        siblingBefore
         * @memberof    mixitup.Config.layout
         * @instance
         * @type        {HTMLElement}
         * @default     null
         */

        this.siblingBefore = null;

        /**
         * A reference to a non-target sibling element before which to insert targets
         * when there are no targets in the container.
         *
         * @example <caption>Example: Setting an `siblingAfter` reference element</caption>
         *
         * var gap = containerEl.querySelector('.gap');
         *
         * var mixer = mixitup(containerEl, {
         *     layout: {
         *         siblingAfter: gap
         *     }
         * });
         *
         * @name        siblingAfter
         * @memberof    mixitup.Config.layout
         * @instance
         * @type        {HTMLElement}
         * @default     null
         */

        this.siblingAfter = null;

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.ConfigLayout);

    _mixitup.ConfigLayout.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.ConfigLayout.prototype.constructor = _mixitup.ConfigLayout;

    /**
     * A group of properties defining the initial state of the mixer on load (instantiation).
     *
     * @constructor
     * @memberof    mixitup.Config
     * @name        load
     * @namespace
     * @public
     * @since       2.0.0
     */

    _mixitup.ConfigLoad = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        /**
         * A string defining any filtering to be statically applied to the mixer on load.
         * As per the `.filter()` API, this can be any valid selector string, or the
         * values `'all'` or `'none'`.
         *
         * @example <caption>Example 1: Defining an initial filter selector to be applied on load</caption>
         *
         * // The mixer will show only those targets matching '.category-a' on load.
         *
         * var mixer = mixitup(containerEl, {
         *     load: {
         *         filter: '.category-a'
         *     }
         * });
         *
         * @example <caption>Example 2: Hiding all targets on load</caption>
         *
         * // The mixer will show hide all targets on load.
         *
         * var mixer = mixitup(containerEl, {
         *     load: {
         *         filter: 'none'
         *     }
         * });
         *
         * @name        filter
         * @memberof    mixitup.Config.load
         * @instance
         * @type        {string}
         * @default     'all'
         */

        this.filter = 'all';

        /**
         * A string defining any sorting to be statically applied to the mixer on load.
         * As per the `.sort()` API, this should be a valid "sort string" made up of
         * an attribute to sort by (or `'default'`) followed by an optional sorting
         * order, or the value `'random'`;
         *
         * @example <caption>Example: Defining sorting to be applied on load</caption>
         *
         * // The mixer will sort the container by the value of the `data-published-date`
         * // attribute, in descending order.
         *
         * var mixer = mixitup(containerEl, {
         *     load: {
         *         sort: 'published-date:desc'
         *     }
         * });
         *
         * @name        sort
         * @memberof    mixitup.Config.load
         * @instance
         * @type        {string}
         * @default     'default:asc'
         */

        this.sort = 'default:asc';

        /**
         * An array of objects representing the underlying data of any pre-rendered targets,
         * when using the `.dataset()` API.
         *
         * NB: If targets are pre-rendered when the mixer is instantiated, this must be set.
         *
         * @example <caption>Example: Defining the initial underyling dataset</caption>
         *
         * var myDataset = [
         *     {
         *         id: 0,
         *         title: "Blog Post Title 0",
         *         ...
         *     },
         *     {
         *         id: 1,
         *         title: "Blog Post Title 1",
         *         ...
         *     }
         * ];
         *
         * var mixer = mixitup(containerEl, {
         *     data: {
         *         uidKey: 'id'
         *     },
         *     load: {
         *         dataset: myDataset
         *     }
         * });
         *
         * @name        dataset
         * @memberof    mixitup.Config.load
         * @instance
         * @type        {Array.<object>}
         * @default     null
         */

        this.dataset = null;

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.ConfigLoad);

    _mixitup.ConfigLoad.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.ConfigLoad.prototype.constructor = _mixitup.ConfigLoad;

    /**
     * A group of properties defining the selectors used to query elements within a mixitup container.
     *
     * @constructor
     * @memberof    mixitup.Config
     * @name        selectors
     * @namespace
     * @public
     * @since       3.0.0
     */

    _mixitup.ConfigSelectors = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        /**
         * A selector string used to query and index target elements within the container.
         *
         * By default, the class selector `'.mix'` is used, but this can be changed to an
         * attribute or element selector to match the style of your project.
         *
         * @example <caption>Example 1: Changing the target selector</caption>
         *
         * var mixer = mixitup(containerEl, {
         *     selectors: {
         *         target: '.portfolio-item'
         *     }
         * });
         *
         * @example <caption>Example 2: Using an attribute selector as a target selector</caption>
         *
         * // The mixer will search for any children with the attribute `data-ref="mix"`
         *
         * var mixer = mixitup(containerEl, {
         *     selectors: {
         *         target: '[data-ref="mix"]'
         *     }
         * });
         *
         * @name        target
         * @memberof    mixitup.Config.selectors
         * @instance
         * @type        {string}
         * @default     '.mix'
         */

        this.target = '.mix';

        /**
         * A optional selector string used to add further specificity to the querying of control elements,
         * in addition to their mandatory data attribute (e.g. `data-filter`, `data-toggle`, `data-sort`).
         *
         * This can be used if other elements in your document must contain the above attributes
         * (e.g. for use in third-party scripts), and would otherwise interfere with MixItUp. Adding
         * an additional `control` selector of your choice allows MixItUp to restrict event handling
         * to only those elements matching the defined selector.
         *
         * @name        control
         * @memberof    mixitup.Config.selectors
         * @instance
         * @type        {string}
         * @default     ''
         *
         * @example <caption>Example 1: Adding a `selectors.control` selector</caption>
         *
         * var mixer = mixitup(containerEl, {
         *     selectors: {
         *         control: '.mixitup-control'
         *     }
         * });
         *
         * // Will not be handled:
         * // <button data-filter=".category-a"></button>
         *
         * // Will be handled:
         * // <button class="mixitup-control" data-filter=".category-a"></button>
         */

        this.control = '';

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.ConfigSelectors);

    _mixitup.ConfigSelectors.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.ConfigSelectors.prototype.constructor = _mixitup.ConfigSelectors;

    /**
     * A group of optional render functions for creating and updating elements.
     *
     * All render functions receive a data object, and should return a valid HTML string.
     *
     * @constructor
     * @memberof    mixitup.Config
     * @name        render
     * @namespace
     * @public
     * @since       3.0.0
     */

    _mixitup.ConfigRender = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        /**
         * A function returning an HTML string representing a target element, or a reference to a
         * single DOM element.
         *
         * The function is invoked as part of the `.dataset()` API, whenever a new item is added
         * to the dataset, or an item in the dataset changes (if `dataset.dirtyCheck` is enabled).
         *
         * The function receives the relevant dataset item as its first parameter.
         *
         * @example <caption>Example 1: Using string concatenation</caption>
         *
         * var mixer = mixitup(containerEl, {
         *     render: {
         *         target: function(item) {
         *             return (
         *                 '&lt;div class="mix"&gt;' +
         *                     '&lt;h2&gt;' + item.title + '&lt;/h2&gt;' +
         *                 '&lt;/div&gt;'
         *             );
         *         }
         *     }
         * });
         *
         * @example <caption>Example 2: Using an ES2015 template literal</caption>
         *
         * var mixer = mixitup(containerEl, {
         *     render: {
         *         target: function(item) {
         *             return (
         *                 `&lt;div class="mix"&gt;
         *                     &lt;h2&gt;${item.title}&lt;/h2&gt;
         *                  &lt;/div&gt;`
         *             );
         *         }
         *     }
         * });
         *
         * @example <caption>Example 3: Using a Handlebars template</caption>
         *
         * var targetTemplate = Handlebars.compile('&lt;div class="mix"&gt;&lt;h2&gt;{{title}}&lt;/h2&gt;&lt;/div&gt;');
         *
         * var mixer = mixitup(containerEl, {
         *     render: {
         *         target: targetTemplate
         *     }
         * });
         *
         * @example <caption>Example 4: Returning a DOM element</caption>
         *
         * var mixer = mixitup(containerEl, {
         *     render: {
         *         target: function(item) {
         *              // Create a single element using your framework's built-in renderer
         *
         *              var el = ...
         *
         *              return el;
         *         }
         *     }
         * });
         *
         * @name        target
         * @memberof    mixitup.Config.render
         * @instance
         * @type        {function}
         * @default     'null'
         */

        this.target = null;

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.ConfigRender);

    _mixitup.ConfigRender.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.ConfigRender.prototype.constructor = _mixitup.ConfigRender;

    /**
     * @constructor
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.ConfigTemplates = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.ConfigTemplates);

    _mixitup.ConfigTemplates.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.ConfigTemplates.prototype.constructor = _mixitup.ConfigTemplates;

    /**
     * `mixitup.Config` is an interface used for customising the functionality of a
     * mixer instance. It is organised into several semantically distinct sub-objects,
     * each one pertaining to a particular aspect of MixItUp functionality.
     *
     * An object literal containing any or all of the available properies,
     * known as the "configuration object", can be passed as the second parameter to
     * the `mixitup` factory function when creating a mixer instance to customise its
     * functionality as needed.
     *
     * If no configuration object is passed, the mixer instance will take on the default
     * configuration values detailed below.
     *
     * @example <caption>Example 1: Creating and passing the configuration object</caption>
     * // Create a configuration object with desired values
     *
     * var config = {
     *     animation: {
     *         enable: false
     *     },
     *     selectors: {
     *         target: '.item'
     *     }
     * };
     *
     * // Pass the configuration object to the mixitup factory function
     *
     * var mixer = mixitup(containerEl, config);
     *
     * @example <caption>Example 2: Passing the configuration object inline</caption>
     * // Typically, the configuration object is passed inline for brevity.
     *
     * var mixer = mixitup(containerEl, {
     *     controls: {
     *         live: true,
     *         toggleLogic: 'and'
     *     }
     * });
     *
     *
     * @constructor
     * @memberof    mixitup
     * @namespace
     * @public
     * @since       2.0.0
     */

    _mixitup.Config = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        this.animation = new _mixitup.ConfigAnimation();
        this.behavior = new _mixitup.ConfigBehavior();
        this.callbacks = new _mixitup.ConfigCallbacks();
        this.controls = new _mixitup.ConfigControls();
        this.classNames = new _mixitup.ConfigClassNames();
        this.data = new _mixitup.ConfigData();
        this.debug = new _mixitup.ConfigDebug();
        this.layout = new _mixitup.ConfigLayout();
        this.load = new _mixitup.ConfigLoad();
        this.selectors = new _mixitup.ConfigSelectors();
        this.render = new _mixitup.ConfigRender();
        this.templates = new _mixitup.ConfigTemplates();

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.Config);

    _mixitup.Config.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.Config.prototype.constructor = _mixitup.Config;

    /**
     * @constructor
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.MixerDom = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        this.document = null;
        this.body = null;
        this.container = null;
        this.parent = null;
        this.targets = [];

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.MixerDom);

    _mixitup.MixerDom.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.MixerDom.prototype.constructor = _mixitup.MixerDom;

    /**
     * @constructor
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.UiClassNames = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        this.base = '';
        this.active = '';
        this.disabled = '';

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.UiClassNames);

    _mixitup.UiClassNames.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.UiClassNames.prototype.constructor = _mixitup.UiClassNames;

    /**
     * An object into which all arbitrary arguments sent to '.dataset()' are mapped.
     *
     * @constructor
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.CommandDataset = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        this.dataset = null;

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.CommandDataset);

    _mixitup.CommandDataset.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.CommandDataset.prototype.constructor = _mixitup.CommandDataset;

    /**
     * An object into which all arbitrary arguments sent to '.multimix()' are mapped.
     *
     * @constructor
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.CommandMultimix = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        this.filter = null;
        this.sort = null;
        this.insert = null;
        this.remove = null;
        this.changeLayout = null;

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.CommandMultimix);

    _mixitup.CommandMultimix.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.CommandMultimix.prototype.constructor = _mixitup.CommandMultimix;

    /**
     * An object into which all arbitrary arguments sent to '.filter()' are mapped.
     *
     * @constructor
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.CommandFilter = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        this.selector = '';
        this.collection = null;
        this.action = 'show'; // enum: ['show', 'hide']

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.CommandFilter);

    _mixitup.CommandFilter.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.CommandFilter.prototype.constructor = _mixitup.CommandFilter;

    /**
     * An object into which all arbitrary arguments sent to '.sort()' are mapped.
     *
     * @constructor
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.CommandSort = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        this.sortString = '';
        this.attribute = '';
        this.order = 'asc';
        this.collection = null;
        this.next = null;

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.CommandSort);

    _mixitup.CommandSort.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.CommandSort.prototype.constructor = _mixitup.CommandSort;

    /**
     * An object into which all arbitrary arguments sent to '.insert()' are mapped.
     *
     * @constructor
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.CommandInsert = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        this.index = 0;
        this.collection = [];
        this.position = 'before'; // enum: ['before', 'after']
        this.sibling = null;

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.CommandInsert);

    _mixitup.CommandInsert.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.CommandInsert.prototype.constructor = _mixitup.CommandInsert;

    /**
     * An object into which all arbitrary arguments sent to '.remove()' are mapped.
     *
     * @constructor
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.CommandRemove = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        this.targets = [];
        this.collection = [];

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.CommandRemove);

    _mixitup.CommandRemove.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.CommandRemove.prototype.constructor = _mixitup.CommandRemove;

    /**
     * An object into which all arbitrary arguments sent to '.changeLayout()' are mapped.
     *
     * @constructor
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.CommandChangeLayout = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        this.containerClassName = '';

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.CommandChangeLayout);

    _mixitup.CommandChangeLayout.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.CommandChangeLayout.prototype.constructor = _mixitup.CommandChangeLayout;

    /**
     * @constructor
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     * @param       {string}        type
     * @param       {string}        selector
     * @param       {boolean}       [live]
     * @param       {string}        [parent]
     *     An optional string representing the name of the mixer.dom property containing a reference to a parent element.
     */

    _mixitup.ControlDefinition = function (type, selector, live, parent) {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        this.type = type;
        this.selector = selector;
        this.live = live || false;
        this.parent = parent || '';

        this.callActions('afterConstruct');

        h.freeze(this);
        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.ControlDefinition);

    _mixitup.ControlDefinition.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.ControlDefinition.prototype.constructor = _mixitup.ControlDefinition;

    _mixitup.controlDefinitions = [];

    _mixitup.controlDefinitions.push(new _mixitup.ControlDefinition('multimix', '[data-filter][data-sort]'));
    _mixitup.controlDefinitions.push(new _mixitup.ControlDefinition('filter', '[data-filter]'));
    _mixitup.controlDefinitions.push(new _mixitup.ControlDefinition('sort', '[data-sort]'));
    _mixitup.controlDefinitions.push(new _mixitup.ControlDefinition('toggle', '[data-toggle]'));

    /**
     * @constructor
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.Control = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        this.el = null;
        this.selector = '';
        this.bound = [];
        this.pending = -1;
        this.type = '';
        this.status = 'inactive'; // enum: ['inactive', 'active', 'disabled', 'live']
        this.filter = '';
        this.sort = '';
        this.canDisable = false;
        this.handler = null;
        this.classNames = new _mixitup.UiClassNames();

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.Control);

    _mixitup.Control.prototype = Object.create(_mixitup.Base.prototype);

    h.extend(_mixitup.Control.prototype,
    /** @lends mixitup.Control */
    {
        constructor: _mixitup.Control,

        /**
         * @private
         * @param {HTMLElement} el
         * @param {string}      type
         * @param {string}      selector
         */

        init: function init(el, type, selector) {
            var self = this;

            this.callActions('beforeInit', arguments);

            self.el = el;
            self.type = type;
            self.selector = selector;

            if (self.selector) {
                self.status = 'live';
            } else {
                self.canDisable = typeof self.el.disable === 'boolean';

                switch (self.type) {
                    case 'filter':
                        self.filter = self.el.getAttribute('data-filter');

                        break;
                    case 'toggle':
                        self.filter = self.el.getAttribute('data-toggle');

                        break;
                    case 'sort':
                        self.sort = self.el.getAttribute('data-sort');

                        break;
                    case 'multimix':
                        self.filter = self.el.getAttribute('data-filter');
                        self.sort = self.el.getAttribute('data-sort');

                        break;
                }
            }

            self.bindClick();

            _mixitup.controls.push(self);

            this.callActions('afterInit', arguments);
        },

        /**
         * @private
         * @param  {mixitup.Mixer} mixer
         * @return {boolean}
         */

        isBound: function isBound(mixer) {
            var self = this,
                isBound = false;

            this.callActions('beforeIsBound', arguments);

            isBound = self.bound.indexOf(mixer) > -1;

            return self.callFilters('afterIsBound', isBound, arguments);
        },

        /**
         * @private
         * @param  {mixitup.Mixer} mixer
         * @return {void}
         */

        addBinding: function addBinding(mixer) {
            var self = this;

            this.callActions('beforeAddBinding', arguments);

            if (!self.isBound()) {
                self.bound.push(mixer);
            }

            this.callActions('afterAddBinding', arguments);
        },

        /**
         * @private
         * @param  {mixitup.Mixer} mixer
         * @return {void}
         */

        removeBinding: function removeBinding(mixer) {
            var self = this,
                removeIndex = -1;

            this.callActions('beforeRemoveBinding', arguments);

            if ((removeIndex = self.bound.indexOf(mixer)) > -1) {
                self.bound.splice(removeIndex, 1);
            }

            if (self.bound.length < 1) {
                // No bindings exist, unbind event click handlers

                self.unbindClick();

                // Remove from `mixitup.controls` list

                removeIndex = _mixitup.controls.indexOf(self);

                _mixitup.controls.splice(removeIndex, 1);

                if (self.status === 'active') {
                    self.renderStatus(self.el, 'inactive');
                }
            }

            this.callActions('afterRemoveBinding', arguments);
        },

        /**
         * @private
         * @return {void}
         */

        bindClick: function bindClick() {
            var self = this;

            this.callActions('beforeBindClick', arguments);

            self.handler = function (e) {
                self.handleClick(e);
            };

            h.on(self.el, 'click', self.handler);

            this.callActions('afterBindClick', arguments);
        },

        /**
         * @private
         * @return {void}
         */

        unbindClick: function unbindClick() {
            var self = this;

            this.callActions('beforeUnbindClick', arguments);

            h.off(self.el, 'click', self.handler);

            self.handler = null;

            this.callActions('afterUnbindClick', arguments);
        },

        /**
         * @private
         * @param   {MouseEvent} e
         * @return  {void}
         */

        handleClick: function handleClick(e) {
            var self = this,
                button = null,
                mixer = null,
                isActive = false,
                returnValue = void 0,
                command = {},
                clone = null,
                commands = [],
                i = -1;

            this.callActions('beforeHandleClick', arguments);

            this.pending = 0;

            mixer = self.bound[0];

            if (!self.selector) {
                button = self.el;
            } else {
                button = h.closestParent(e.target, mixer.config.selectors.control + self.selector, true, mixer.dom.document);
            }

            if (!button) {
                self.callActions('afterHandleClick', arguments);

                return;
            }

            switch (self.type) {
                case 'filter':
                    command.filter = self.filter || button.getAttribute('data-filter');

                    break;
                case 'sort':
                    command.sort = self.sort || button.getAttribute('data-sort');

                    break;
                case 'multimix':
                    command.filter = self.filter || button.getAttribute('data-filter');
                    command.sort = self.sort || button.getAttribute('data-sort');

                    break;
                case 'toggle':
                    command.filter = self.filter || button.getAttribute('data-toggle');

                    if (self.status === 'live') {
                        isActive = h.hasClass(button, self.classNames.active);
                    } else {
                        isActive = self.status === 'active';
                    }

                    break;
            }

            for (i = 0; i < self.bound.length; i++) {
                // Create a clone of the command for each bound mixer instance

                clone = new _mixitup.CommandMultimix();

                h.extend(clone, command);

                commands.push(clone);
            }

            commands = self.callFilters('commandsHandleClick', commands, arguments);

            self.pending = self.bound.length;

            for (i = 0; mixer = self.bound[i]; i++) {
                command = commands[i];

                if (!command) {
                    // An extension may set a command null to indicate that the click should not be handled

                    continue;
                }

                if (!mixer.lastClicked) {
                    mixer.lastClicked = button;
                }

                _mixitup.events.fire('mixClick', mixer.dom.container, {
                    state: mixer.state,
                    instance: mixer,
                    originalEvent: e,
                    control: mixer.lastClicked
                }, mixer.dom.document);

                if (typeof mixer.config.callbacks.onMixClick === 'function') {
                    returnValue = mixer.config.callbacks.onMixClick.call(mixer.lastClicked, mixer.state, e, mixer);

                    if (returnValue === false) {
                        // User has returned `false` from the callback, so do not handle click

                        continue;
                    }
                }

                if (self.type === 'toggle') {
                    isActive ? mixer.toggleOff(command.filter) : mixer.toggleOn(command.filter);
                } else {
                    mixer.multimix(command);
                }
            }

            this.callActions('afterHandleClick', arguments);
        },

        /**
         * @param   {object}          command
         * @param   {Array<string>}   toggleArray
         * @return  {void}
         */

        update: function update(command, toggleArray) {
            var self = this,
                actions = new _mixitup.CommandMultimix();

            self.callActions('beforeUpdate', arguments);

            self.pending--;

            self.pending = Math.max(0, self.pending);

            if (self.pending > 0) return;

            if (self.status === 'live') {
                // Live control (status unknown)

                self.updateLive(command, toggleArray);
            } else {
                // Static control

                actions.sort = self.sort;
                actions.filter = self.filter;

                self.callFilters('actionsUpdate', actions, arguments);

                self.parseStatusChange(self.el, command, actions, toggleArray);
            }

            self.callActions('afterUpdate', arguments);
        },

        /**
         * @param   {mixitup.CommandMultimix} command
         * @param   {Array<string>}           toggleArray
         * @return  {void}
         */

        updateLive: function updateLive(command, toggleArray) {
            var self = this,
                controlButtons = null,
                actions = null,
                button = null,
                i = -1;

            self.callActions('beforeUpdateLive', arguments);

            if (!self.el) return;

            controlButtons = self.el.querySelectorAll(self.selector);

            for (i = 0; button = controlButtons[i]; i++) {
                actions = new _mixitup.CommandMultimix();

                switch (self.type) {
                    case 'filter':
                        actions.filter = button.getAttribute('data-filter');

                        break;
                    case 'sort':
                        actions.sort = button.getAttribute('data-sort');

                        break;
                    case 'multimix':
                        actions.filter = button.getAttribute('data-filter');
                        actions.sort = button.getAttribute('data-sort');

                        break;
                    case 'toggle':
                        actions.filter = button.getAttribute('data-toggle');

                        break;
                }

                actions = self.callFilters('actionsUpdateLive', actions, arguments);

                self.parseStatusChange(button, command, actions, toggleArray);
            }

            self.callActions('afterUpdateLive', arguments);
        },

        /**
         * @param   {HTMLElement}             button
         * @param   {mixitup.CommandMultimix} command
         * @param   {mixitup.CommandMultimix} actions
         * @param   {Array<string>}           toggleArray
         * @return  {void}
         */

        parseStatusChange: function parseStatusChange(button, command, actions, toggleArray) {
            var self = this,
                alias = '',
                toggle = '',
                i = -1;

            self.callActions('beforeParseStatusChange', arguments);

            switch (self.type) {
                case 'filter':
                    if (command.filter === actions.filter) {
                        self.renderStatus(button, 'active');
                    } else {
                        self.renderStatus(button, 'inactive');
                    }

                    break;
                case 'multimix':
                    if (command.sort === actions.sort && command.filter === actions.filter) {
                        self.renderStatus(button, 'active');
                    } else {
                        self.renderStatus(button, 'inactive');
                    }

                    break;
                case 'sort':
                    if (command.sort.match(/:asc/g)) {
                        alias = command.sort.replace(/:asc/g, '');
                    }

                    if (command.sort === actions.sort || alias === actions.sort) {
                        self.renderStatus(button, 'active');
                    } else {
                        self.renderStatus(button, 'inactive');
                    }

                    break;
                case 'toggle':
                    if (toggleArray.length < 1) self.renderStatus(button, 'inactive');

                    if (command.filter === actions.filter) {
                        self.renderStatus(button, 'active');
                    }

                    for (i = 0; i < toggleArray.length; i++) {
                        toggle = toggleArray[i];

                        if (toggle === actions.filter) {
                            // Button matches one active toggle

                            self.renderStatus(button, 'active');

                            break;
                        }

                        self.renderStatus(button, 'inactive');
                    }

                    break;
            }

            self.callActions('afterParseStatusChange', arguments);
        },

        /**
         * @param   {HTMLElement}   button
         * @param   {string}        status
         * @return  {void}
         */

        renderStatus: function renderStatus(button, status) {
            var self = this;

            self.callActions('beforeRenderStatus', arguments);

            switch (status) {
                case 'active':
                    h.addClass(button, self.classNames.active);
                    h.removeClass(button, self.classNames.disabled);

                    if (self.canDisable) self.el.disabled = false;

                    break;
                case 'inactive':
                    h.removeClass(button, self.classNames.active);
                    h.removeClass(button, self.classNames.disabled);

                    if (self.canDisable) self.el.disabled = false;

                    break;
                case 'disabled':
                    if (self.canDisable) self.el.disabled = true;

                    h.addClass(button, self.classNames.disabled);
                    h.removeClass(button, self.classNames.active);

                    break;
            }

            if (self.status !== 'live') {
                // Update the control's status propery if not live

                self.status = status;
            }

            self.callActions('afterRenderStatus', arguments);
        }
    });

    _mixitup.controls = [];

    /**
     * @constructor
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.StyleData = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        this.x = 0;
        this.y = 0;
        this.top = 0;
        this.right = 0;
        this.bottom = 0;
        this.left = 0;
        this.width = 0;
        this.height = 0;
        this.marginRight = 0;
        this.marginBottom = 0;
        this.opacity = 0;
        this.scale = new _mixitup.TransformData();
        this.translateX = new _mixitup.TransformData();
        this.translateY = new _mixitup.TransformData();
        this.translateZ = new _mixitup.TransformData();
        this.rotateX = new _mixitup.TransformData();
        this.rotateY = new _mixitup.TransformData();
        this.rotateZ = new _mixitup.TransformData();

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.StyleData);

    _mixitup.StyleData.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.StyleData.prototype.constructor = _mixitup.StyleData;

    /**
     * @constructor
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.TransformData = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        this.value = 0;
        this.unit = '';

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.TransformData);

    _mixitup.TransformData.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.TransformData.prototype.constructor = _mixitup.TransformData;

    /**
     * @constructor
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.TransformDefaults = function () {
        _mixitup.StyleData.apply(this);

        this.callActions('beforeConstruct');

        this.scale.value = 0.01;
        this.scale.unit = '';

        this.translateX.value = 20;
        this.translateX.unit = 'px';

        this.translateY.value = 20;
        this.translateY.unit = 'px';

        this.translateZ.value = 20;
        this.translateZ.unit = 'px';

        this.rotateX.value = 90;
        this.rotateX.unit = 'deg';

        this.rotateY.value = 90;
        this.rotateY.unit = 'deg';

        this.rotateX.value = 90;
        this.rotateX.unit = 'deg';

        this.rotateZ.value = 180;
        this.rotateZ.unit = 'deg';

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.TransformDefaults);

    _mixitup.TransformDefaults.prototype = Object.create(_mixitup.StyleData.prototype);

    _mixitup.TransformDefaults.prototype.constructor = _mixitup.TransformDefaults;

    /**
     * @private
     * @static
     * @since   3.0.0
     * @type    {mixitup.TransformDefaults}
     */

    _mixitup.transformDefaults = new _mixitup.TransformDefaults();

    /**
     * @constructor
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.EventDetail = function () {
        this.state = null;
        this.futureState = null;
        this.instance = null;
        this.originalEvent = null;
    };

    /**
     * The `mixitup.Events` class contains all custom events dispatched by MixItUp at various
     * points within the lifecycle of a mixer operation.
     *
     * Each event is analogous to the callback function of the same name defined in
     * the `callbacks` configuration object, and is triggered immediately before it.
     *
     * Events are always triggered from the container element on which MixItUp is instantiated
     * upon.
     *
     * As with any event, registered event handlers receive the event object as a parameter
     * which includes a `detail` property containting references to the current `state`,
     * the `mixer` instance, and other event-specific properties described below.
     *
     * @constructor
     * @namespace
     * @memberof    mixitup
     * @public
     * @since       3.0.0
     */

    _mixitup.Events = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        /**
         * A custom event triggered immediately after any MixItUp operation is requested
         * and before animations have begun.
         *
         * The `mixStart` event also exposes a `futureState` property via the
         * `event.detail` object, which represents the final state of the mixer once
         * the requested operation has completed.
         *
         * @name        mixStart
         * @memberof    mixitup.Events
         * @static
         * @type        {CustomEvent}
         */

        this.mixStart = null;

        /**
         * A custom event triggered when a MixItUp operation is requested while another
         * operation is in progress, and the animation queue is full, or queueing
         * is disabled.
         *
         * @name        mixBusy
         * @memberof    mixitup.Events
         * @static
         * @type        {CustomEvent}
         */

        this.mixBusy = null;

        /**
         * A custom event triggered after any MixItUp operation has completed, and the
         * state has been updated.
         *
         * @name        mixEnd
         * @memberof    mixitup.Events
         * @static
         * @type        {CustomEvent}
         */

        this.mixEnd = null;

        /**
         * A custom event triggered whenever a filter operation "fails", i.e. no targets
         * could be found matching the requested filter.
         *
         * @name        mixFail
         * @memberof    mixitup.Events
         * @static
         * @type        {CustomEvent}
         */

        this.mixFail = null;

        /**
         * A custom event triggered whenever a MixItUp control is clicked, and before its
         * respective operation is requested.
         *
         * This event also exposes an `originalEvent` property via the `event.detail`
         * object, which holds a reference to the original click event.
         *
         * @name        mixClick
         * @memberof    mixitup.Events
         * @static
         * @type        {CustomEvent}
         */

        this.mixClick = null;

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.Events);

    _mixitup.Events.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.Events.prototype.constructor = _mixitup.Events;

    /**
     * @private
     * @param   {string}      eventType
     * @param   {Element}     el
     * @param   {object}      detail
     * @param   {Document}    [doc]
     */

    _mixitup.Events.prototype.fire = function (eventType, el, detail, doc) {
        var self = this,
            event = null,
            eventDetail = new _mixitup.EventDetail();

        self.callActions('beforeFire', arguments);

        if (typeof self[eventType] === 'undefined') {
            throw new Error('Event type "' + eventType + '" not found.');
        }

        eventDetail.state = new _mixitup.State();

        h.extend(eventDetail.state, detail.state);

        if (detail.futureState) {
            eventDetail.futureState = new _mixitup.State();

            h.extend(eventDetail.futureState, detail.futureState);
        }

        eventDetail.instance = detail.instance;

        if (detail.originalEvent) {
            eventDetail.originalEvent = detail.originalEvent;
        }

        event = h.getCustomEvent(eventType, eventDetail, doc);

        self.callFilters('eventFire', event, arguments);

        el.dispatchEvent(event);
    };

    // Asign a singleton instance to `mixitup.events`:

    _mixitup.events = new _mixitup.Events();

    /**
     * @constructor
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.QueueItem = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        this.args = [];
        this.instruction = null;
        this.triggerElement = null;
        this.deferred = null;
        this.isToggling = false;

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.QueueItem);

    _mixitup.QueueItem.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.QueueItem.prototype.constructor = _mixitup.QueueItem;

    /**
     * The `mixitup.Mixer` class is used to hold discreet, user-configured
     * instances of MixItUp on a provided container element.
     *
     * Mixer instances are returned whenever the `mixitup()` factory function is called,
     * which expose a range of methods enabling API-based filtering, sorting,
     * insertion, removal and more.
     *
     * @constructor
     * @namespace
     * @memberof    mixitup
     * @public
     * @since       3.0.0
     */

    _mixitup.Mixer = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        this.config = new _mixitup.Config();

        this.id = '';

        this.isBusy = false;
        this.isToggling = false;
        this.incPadding = true;

        this.controls = [];
        this.targets = [];
        this.origOrder = [];
        this.cache = {};

        this.toggleArray = [];

        this.targetsMoved = 0;
        this.targetsImmovable = 0;
        this.targetsBound = 0;
        this.targetsDone = 0;

        this.staggerDuration = 0;
        this.effectsIn = null;
        this.effectsOut = null;
        this.transformIn = [];
        this.transformOut = [];
        this.queue = [];

        this.state = null;
        this.lastOperation = null;
        this.lastClicked = null;
        this.userCallback = null;
        this.userDeferred = null;

        this.dom = new _mixitup.MixerDom();

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.Mixer);

    _mixitup.Mixer.prototype = Object.create(_mixitup.Base.prototype);

    h.extend(_mixitup.Mixer.prototype,
    /** @lends mixitup.Mixer */
    {
        constructor: _mixitup.Mixer,

        /**
         * @private
         * @instance
         * @since 3.0.0
         * @param {HTMLElement} container
         * @param {HTMLElement} document
         * @param {string}      id
         * @param {object}      [config]
         */

        attach: function attach(container, document, id, config) {
            var self = this,
                target = null,
                i = -1;

            self.callActions('beforeAttach', arguments);

            self.id = id;

            if (config) {
                h.extend(self.config, config, true, true);
            }

            self.sanitizeConfig();

            self.cacheDom(container, document);

            if (self.config.layout.containerClassName) {
                h.addClass(self.dom.container, self.config.layout.containerClassName);
            }

            if (!_mixitup.features.has.transitions) {
                self.config.animation.enable = false;
            }

            if (typeof window.console === 'undefined') {
                self.config.debug.showWarnings = false;
            }

            if (self.config.data.uidKey) {
                // If the dataset API is in use, force disable controls

                self.config.controls.enable = false;
            }

            self.indexTargets();

            self.state = self.getInitialState();

            for (i = 0; target = self.lastOperation.toHide[i]; i++) {
                target.hide();
            }

            if (self.config.controls.enable) {
                self.initControls();

                self.updateControls({
                    filter: self.state.activeFilter,
                    sort: self.state.activeSort
                });

                self.buildToggleArray(null, self.state);
            }

            self.parseEffects();

            self.callActions('afterAttach', arguments);
        },

        /**
         * @private
         * @instance
         * @since 3.0.0
         * @return {void}
         */

        sanitizeConfig: function sanitizeConfig() {
            var self = this;

            self.callActions('beforeSanitizeConfig', arguments);

            // Sanitize enum/string config options

            self.config.controls.scope = self.config.controls.scope.toLowerCase().trim();
            self.config.controls.toggleLogic = self.config.controls.toggleLogic.toLowerCase().trim();
            self.config.controls.toggleDefault = self.config.controls.toggleDefault.toLowerCase().trim();

            self.config.animation.effects = self.config.animation.effects.trim();

            self.callActions('afterSanitizeConfig', arguments);
        },

        /**
         * @private
         * @instance
         * @since   3.0.0
         * @return  {mixitup.State}
         */

        getInitialState: function getInitialState() {
            var self = this,
                state = new _mixitup.State(),
                operation = new _mixitup.Operation();

            self.callActions('beforeGetInitialState', arguments);

            // Map initial values into a mock state object in order to construct an operation

            state.activeContainerClassName = self.config.layout.containerClassName;

            if (self.config.load.dataset) {
                // Dataset API

                if (!self.config.data.uidKey || typeof self.config.data.uidKey !== 'string') {
                    throw new TypeError(_mixitup.messages.errorConfigDataUidKeyNotSet());
                }

                operation.startDataset = operation.newDataset = state.activeDataset = self.config.load.dataset.slice();
                operation.startContainerClassName = operation.newContainerClassName = state.activeContainerClassName;
                operation.show = self.targets.slice();

                state = self.callFilters('stateGetInitialState', state, arguments);
            } else {
                // DOM API

                state.activeFilter = self.parseFilterArgs([self.config.load.filter]).command;
                state.activeSort = self.parseSortArgs([self.config.load.sort]).command;
                state.totalTargets = self.targets.length;

                state = self.callFilters('stateGetInitialState', state, arguments);

                if (state.activeSort.collection || state.activeSort.attribute || state.activeSort.order === 'random' || state.activeSort.order === 'desc') {
                    // Sorting on load

                    operation.newSort = state.activeSort;

                    self.sortOperation(operation);

                    self.printSort(false, operation);

                    self.targets = operation.newOrder;
                } else {
                    operation.startOrder = operation.newOrder = self.targets;
                }

                operation.startFilter = operation.newFilter = state.activeFilter;
                operation.startSort = operation.newSort = state.activeSort;
                operation.startContainerClassName = operation.newContainerClassName = state.activeContainerClassName;

                if (operation.newFilter.selector === 'all') {
                    operation.newFilter.selector = self.config.selectors.target;
                } else if (operation.newFilter.selector === 'none') {
                    operation.newFilter.selector = '';
                }
            }

            operation = self.callFilters('operationGetInitialState', operation, [state]);

            self.lastOperation = operation;

            if (operation.newFilter) {
                self.filterOperation(operation);
            }

            state = self.buildState(operation);

            return state;
        },

        /**
         * Caches references of DOM elements neccessary for the mixer's functionality.
         *
         * @private
         * @instance
         * @since   3.0.0
         * @param   {HTMLElement}       el
         * @param   {HTMLHtmlElement}   document
         * @return  {void}
         */

        cacheDom: function cacheDom(el, document) {
            var self = this;

            self.callActions('beforeCacheDom', arguments);

            self.dom.document = document;
            self.dom.body = self.dom.document.querySelector('body');
            self.dom.container = el;
            self.dom.parent = el;

            self.callActions('afterCacheDom', arguments);
        },

        /**
         * Indexes all child elements of the mixer matching the `selectors.target`
         * selector, instantiating a mixitup.Target for each one.
         *
         * @private
         * @instance
         * @since   3.0.0
         * @return  {void}
         */

        indexTargets: function indexTargets() {
            var self = this,
                target = null,
                el = null,
                dataset = null,
                i = -1;

            self.callActions('beforeIndexTargets', arguments);

            self.dom.targets = self.config.layout.allowNestedTargets ? self.dom.container.querySelectorAll(self.config.selectors.target) : h.children(self.dom.container, self.config.selectors.target, self.dom.document);

            self.dom.targets = h.arrayFromList(self.dom.targets);

            self.targets = [];

            if ((dataset = self.config.load.dataset) && dataset.length !== self.dom.targets.length) {
                throw new Error(_mixitup.messages.errorDatasetPrerenderedMismatch());
            }

            if (self.dom.targets.length) {
                for (i = 0; el = self.dom.targets[i]; i++) {
                    target = new _mixitup.Target();

                    target.init(el, self, dataset ? dataset[i] : void 0);

                    target.isInDom = true;

                    self.targets.push(target);
                }

                self.dom.parent = self.dom.targets[0].parentElement === self.dom.container ? self.dom.container : self.dom.targets[0].parentElement;
            }

            self.origOrder = self.targets;

            self.callActions('afterIndexTargets', arguments);
        },

        initControls: function initControls() {
            var self = this,
                definition = '',
                controlElements = null,
                el = null,
                parent = null,
                delagators = null,
                control = null,
                i = -1,
                j = -1;

            self.callActions('beforeInitControls', arguments);

            switch (self.config.controls.scope) {
                case 'local':
                    parent = self.dom.container;

                    break;
                case 'global':
                    parent = self.dom.document;

                    break;
                default:
                    throw new Error(_mixitup.messages.errorConfigInvalidControlsScope());
            }

            for (i = 0; definition = _mixitup.controlDefinitions[i]; i++) {
                if (self.config.controls.live || definition.live) {
                    if (definition.parent) {
                        delagators = self.dom[definition.parent];

                        if (!delagators || delagators.length < 0) continue;

                        if (typeof delagators.length !== 'number') {
                            delagators = [delagators];
                        }
                    } else {
                        delagators = [parent];
                    }

                    for (j = 0; el = delagators[j]; j++) {
                        control = self.getControl(el, definition.type, definition.selector);

                        self.controls.push(control);
                    }
                } else {
                    controlElements = parent.querySelectorAll(self.config.selectors.control + definition.selector);

                    for (j = 0; el = controlElements[j]; j++) {
                        control = self.getControl(el, definition.type, '');

                        if (!control) continue;

                        self.controls.push(control);
                    }
                }
            }

            self.callActions('afterInitControls', arguments);
        },

        /**
         * @private
         * @instance
         * @since   3.0.0
         * @param   {HTMLElement} el
         * @param   {string}      type
         * @param   {string}      selector
         * @return  {mixitup.Control|null}
         */

        getControl: function getControl(el, type, selector) {
            var self = this,
                control = null,
                i = -1;

            self.callActions('beforeGetControl', arguments);

            if (!selector) {
                // Static controls only

                for (i = 0; control = _mixitup.controls[i]; i++) {
                    if (control.el === el && control.isBound(self)) {
                        // Control already bound to this mixer (as another type).

                        // NB: This prevents duplicate controls from being registered where a selector
                        // might collide, eg: "[data-filter]" and "[data-filter][data-sort]"

                        return self.callFilters('controlGetControl', null, arguments);
                    } else if (control.el === el && control.type === type && control.selector === selector) {
                        // Another mixer is already using this control, add this mixer as a binding

                        control.addBinding(self);

                        return self.callFilters('controlGetControl', control, arguments);
                    }
                }
            }

            // Create new control

            control = new _mixitup.Control();

            control.init(el, type, selector);

            control.classNames.base = h.getClassname(self.config.classNames, type);
            control.classNames.active = h.getClassname(self.config.classNames, type, self.config.classNames.modifierActive);
            control.classNames.disabled = h.getClassname(self.config.classNames, type, self.config.classNames.modifierDisabled);

            // Add a reference to this mixer as a binding

            control.addBinding(self);

            return self.callFilters('controlGetControl', control, arguments);
        },

        /**
         * Creates a compound selector by joining the `toggleArray` value as per the
         * defined toggle logic.
         *
         * @private
         * @instance
         * @since   3.0.0
         * @return  {string}
         */

        getToggleSelector: function getToggleSelector() {
            var self = this,
                delineator = self.config.controls.toggleLogic === 'or' ? ', ' : '',
                toggleSelector = '';

            self.callActions('beforeGetToggleSelector', arguments);

            self.toggleArray = h.clean(self.toggleArray);

            toggleSelector = self.toggleArray.join(delineator);

            if (toggleSelector === '') {
                toggleSelector = self.config.controls.toggleDefault;
            }

            return self.callFilters('selectorGetToggleSelector', toggleSelector, arguments);
        },

        /**
         * Breaks compound selector strings in an array of discreet selectors,
         * as per the active `controls.toggleLogic` configuration option. Accepts
         * either a dynamic command object, or a state object.
         *
         * @private
         * @instance
         * @since   2.0.0
         * @param   {object}        [command]
         * @param   {mixitup.State} [state]
         * @return  {void}
         */

        buildToggleArray: function buildToggleArray(command, state) {
            var self = this,
                activeFilterSelector = '';

            self.callActions('beforeBuildToggleArray', arguments);

            if (command && command.filter) {
                activeFilterSelector = command.filter.selector.replace(/\s/g, '');
            } else if (state) {
                activeFilterSelector = state.activeFilter.selector.replace(/\s/g, '');
            } else {
                return;
            }

            if (activeFilterSelector === self.config.selectors.target || activeFilterSelector === 'all') {
                activeFilterSelector = '';
            }

            if (self.config.controls.toggleLogic === 'or') {
                self.toggleArray = activeFilterSelector.split(',');
            } else {
                self.toggleArray = self.splitCompoundSelector(activeFilterSelector);
            }

            self.toggleArray = h.clean(self.toggleArray);

            self.callActions('afterBuildToggleArray', arguments);
        },

        /**
         * Takes a compound selector (e.g. `.cat-1.cat-2`, `[data-cat="1"][data-cat="2"]`)
         * and breaks into its individual selectors.
         *
         * @private
         * @instance
         * @since   3.0.0
         * @param   {string} compoundSelector
         * @return  {string[]}
         */

        splitCompoundSelector: function splitCompoundSelector(compoundSelector) {
            // Break at a `.` or `[`, capturing the delineator

            var partials = compoundSelector.split(/([\.\[])/g),
                toggleArray = [],
                selector = '',
                i = -1;

            if (partials[0] === '') {
                partials.shift();
            }

            for (i = 0; i < partials.length; i++) {
                if (i % 2 === 0) {
                    selector = '';
                }

                selector += partials[i];

                if (i % 2 !== 0) {
                    toggleArray.push(selector);
                }
            }

            return toggleArray;
        },

        /**
         * Updates controls to their active/inactive state based on the command or
         * current state of the mixer.
         *
         * @private
         * @instance
         * @since   2.0.0
         * @param   {object} command
         * @return  {void}
         */

        updateControls: function updateControls(command) {
            var self = this,
                control = null,
                output = new _mixitup.CommandMultimix(),
                i = -1;

            self.callActions('beforeUpdateControls', arguments);

            // Sanitise to defaults

            if (command.filter) {
                output.filter = command.filter.selector;
            } else {
                output.filter = self.state.activeFilter.selector;
            }

            if (command.sort) {
                output.sort = self.buildSortString(command.sort);
            } else {
                output.sort = self.buildSortString(self.state.activeSort);
            }

            if (output.filter === self.config.selectors.target) {
                output.filter = 'all';
            }

            if (output.filter === '') {
                output.filter = 'none';
            }

            h.freeze(output);

            for (i = 0; control = self.controls[i]; i++) {
                control.update(output, self.toggleArray);
            }

            self.callActions('afterUpdateControls', arguments);
        },

        /**
         * @private
         * @instance
         * @since   3.0.0
         * @param   {mixitup.CommandSort}   command
         * @return  {string}
         */

        buildSortString: function buildSortString(command) {
            var self = this;
            var output = '';

            output += command.sortString;

            if (command.next) {
                output += ' ' + self.buildSortString(command.next);
            }

            return output;
        },

        /**
         * @private
         * @instance
         * @since   3.0.0
         * @param   {object}        command
         * @param   {Operation}     operation
         * @return  {Promise.<mixitup.State>}
         */

        insertTargets: function insertTargets(command, operation) {
            var self = this,
                nextSibling = null,
                insertionIndex = -1,
                frag = null,
                target = null,
                el = null,
                i = -1;

            self.callActions('beforeInsertTargets', arguments);

            if (typeof command.index === 'undefined') command.index = 0;

            nextSibling = self.getNextSibling(command.index, command.sibling, command.position);
            frag = self.dom.document.createDocumentFragment();

            if (nextSibling) {
                insertionIndex = h.index(nextSibling, self.config.selectors.target);
            } else {
                insertionIndex = self.targets.length;
            }

            if (command.collection) {
                for (i = 0; el = command.collection[i]; i++) {
                    if (self.dom.targets.indexOf(el) > -1) {
                        throw new Error(_mixitup.messages.errorInsertPreexistingElement());
                    }

                    // Ensure elements are hidden when they are added to the DOM, so they can
                    // be animated in gracefully

                    el.style.display = 'none';

                    frag.appendChild(el);
                    frag.appendChild(self.dom.document.createTextNode(' '));

                    if (!h.isElement(el, self.dom.document) || !el.matches(self.config.selectors.target)) continue;

                    target = new _mixitup.Target();

                    target.init(el, self);

                    target.isInDom = true;

                    self.targets.splice(insertionIndex, 0, target);

                    insertionIndex++;
                }

                self.dom.parent.insertBefore(frag, nextSibling);
            }

            // Since targets have been added, the original order must be updated

            operation.startOrder = self.origOrder = self.targets;

            self.callActions('afterInsertTargets', arguments);
        },

        /**
         * @private
         * @instance
         * @since   3.0.0
         * @param   {Number}      [index]
         * @param   {Element}     [sibling]
         * @param   {string}      [position]
         * @return  {Element}
         */

        getNextSibling: function getNextSibling(index, sibling, position) {
            var self = this,
                element = null;

            index = Math.max(index, 0);

            if (sibling && position === 'before') {
                // Explicit sibling

                element = sibling;
            } else if (sibling && position === 'after') {
                // Explicit sibling

                element = sibling.nextElementSibling || null;
            } else if (self.targets.length > 0 && typeof index !== 'undefined') {
                // Index and targets exist

                element = index < self.targets.length || !self.targets.length ? self.targets[index].dom.el : self.targets[self.targets.length - 1].dom.el.nextElementSibling;
            } else if (self.targets.length === 0 && self.dom.parent.children.length > 0) {
                // No targets but other siblings

                if (self.config.layout.siblingAfter) {
                    element = self.config.layout.siblingAfter;
                } else if (self.config.layout.siblingBefore) {
                    element = self.config.layout.siblingBefore.nextElementSibling;
                } else {
                    self.dom.parent.children[0];
                }
            } else {
                element === null;
            }

            return self.callFilters('elementGetNextSibling', element, arguments);
        },

        /**
         * @private
         * @instance
         * @since   2.0.0
         * @param   {Operation}     operation
         * @return  {void}
         */

        filterOperation: function filterOperation(operation) {
            var self = this,
                testResult = false,
                index = -1,
                action = '',
                target = null,
                i = -1;

            self.callActions('beforeFilterOperation', arguments);

            action = operation.newFilter.action;

            for (i = 0; target = operation.newOrder[i]; i++) {
                if (operation.newFilter.collection) {
                    // show via collection

                    testResult = operation.newFilter.collection.indexOf(target.dom.el) > -1;
                } else {
                    // show via selector

                    if (operation.newFilter.selector === '') {
                        testResult = false;
                    } else {
                        testResult = target.dom.el.matches(operation.newFilter.selector);
                    }
                }

                self.evaluateHideShow(testResult, target, action, operation);
            }

            if (operation.toRemove.length) {
                for (i = 0; target = operation.show[i]; i++) {
                    if (operation.toRemove.indexOf(target) > -1) {
                        // If any shown targets should be removed, move them into the toHide array

                        operation.show.splice(i, 1);

                        if ((index = operation.toShow.indexOf(target)) > -1) {
                            operation.toShow.splice(index, 1);
                        }

                        operation.toHide.push(target);
                        operation.hide.push(target);

                        i--;
                    }
                }
            }

            operation.matching = operation.show.slice();

            if (operation.show.length === 0 && operation.newFilter.selector !== '' && self.targets.length !== 0) {
                operation.hasFailed = true;
            }

            self.callActions('afterFilterOperation', arguments);
        },

        /**
         * @private
         * @instance
         * @since   3.0.0
         * @param   {boolean}   testResult
         * @param   {Element}   target
         * @param   {string}    action
         * @param   {Operation} operation
         * @return  {void}
         */

        evaluateHideShow: function evaluateHideShow(testResult, target, action, operation) {
            var self = this;

            self.callActions('beforeEvaluateHideShow', arguments);

            if (testResult === true && action === 'show' || testResult === false && action === 'hide') {
                operation.show.push(target);

                !target.isShown && operation.toShow.push(target);
            } else {
                operation.hide.push(target);

                target.isShown && operation.toHide.push(target);
            }

            self.callActions('afterEvaluateHideShow', arguments);
        },

        /**
         * @private
         * @instance
         * @since   2.0.0
         * @param   {Operation}     operation
         * @return  {void}
         */

        sortOperation: function sortOperation(operation) {
            var self = this;

            self.callActions('beforeSortOperation', arguments);

            operation.startOrder = self.targets;

            if (operation.newSort.collection) {
                // Sort by collection

                operation.newOrder = operation.newSort.collection;
            } else if (operation.newSort.order === 'random') {
                // Sort random

                operation.newOrder = h.arrayShuffle(operation.startOrder);
            } else if (operation.newSort.attribute === '') {
                // Sort by default

                operation.newOrder = self.origOrder.slice();

                if (operation.newSort.order === 'desc') {
                    operation.newOrder.reverse();
                }
            } else {
                // Sort by attribute

                operation.newOrder = operation.startOrder.slice();

                operation.newOrder.sort(function (a, b) {
                    return self.compare(a, b, operation.newSort);
                });
            }

            if (h.isEqualArray(operation.newOrder, operation.startOrder)) {
                operation.willSort = false;
            }

            self.callActions('afterSortOperation', arguments);
        },

        /**
         * @private
         * @instance
         * @since   2.0.0
         * @param   {mixitup.Target}        a
         * @param   {mixitup.Target}        b
         * @param   {mixitup.CommandSort}   command
         * @return  {Number}
         */

        compare: function compare(a, b, command) {
            var self = this,
                order = command.order,
                attrA = self.getAttributeValue(a, command.attribute),
                attrB = self.getAttributeValue(b, command.attribute);

            if (isNaN(attrA * 1) || isNaN(attrB * 1)) {
                attrA = attrA.toLowerCase();
                attrB = attrB.toLowerCase();
            } else {
                attrA = attrA * 1;
                attrB = attrB * 1;
            }

            if (attrA < attrB) {
                return order === 'asc' ? -1 : 1;
            }

            if (attrA > attrB) {
                return order === 'asc' ? 1 : -1;
            }

            if (attrA === attrB && command.next) {
                return self.compare(a, b, command.next);
            }

            return 0;
        },

        /**
         * Reads the values of any data attributes present the provided target element
         * which match the current sort command.
         *
         * @private
         * @instance
         * @since   3.0.0
         * @param   {mixitup.Target}    target
         * @param   {string}            [attribute]
         * @return  {(String|Number)}
         */

        getAttributeValue: function getAttributeValue(target, attribute) {
            var self = this,
                value = '';

            value = target.dom.el.getAttribute('data-' + attribute);

            if (value === null) {
                if (self.config.debug.showWarnings) {
                    // Encourage users to assign values to all targets to avoid erroneous sorting
                    // when types are mixed

                    console.warn(_mixitup.messages.warningInconsistentSortingAttributes({
                        attribute: 'data-' + attribute
                    }));
                }
            }

            // If an attribute is not present, return 0 as a safety value

            return self.callFilters('valueGetAttributeValue', value || 0, arguments);
        },

        /**
         * Inserts elements into the DOM in the appropriate
         * order using a document fragment for minimal
         * DOM thrashing
         *
         * @private
         * @instance
         * @since   2.0.0
         * @param   {boolean}   isResetting
         * @param   {Operation} operation
         * @return  {void}
         */

        printSort: function printSort(isResetting, operation) {
            var self = this,
                startOrder = isResetting ? operation.newOrder : operation.startOrder,
                newOrder = isResetting ? operation.startOrder : operation.newOrder,
                nextSibling = startOrder.length ? startOrder[startOrder.length - 1].dom.el.nextElementSibling : null,
                frag = window.document.createDocumentFragment(),
                whitespace = null,
                target = null,
                el = null,
                i = -1;

            self.callActions('beforePrintSort', arguments);

            // Empty the container

            for (i = 0; target = startOrder[i]; i++) {
                el = target.dom.el;

                if (el.style.position === 'absolute') continue;

                h.removeWhitespace(el.previousSibling);

                el.parentElement.removeChild(el);
            }

            whitespace = nextSibling ? nextSibling.previousSibling : self.dom.parent.lastChild;

            if (whitespace && whitespace.nodeName === '#text') {
                h.removeWhitespace(whitespace);
            }

            for (i = 0; target = newOrder[i]; i++) {
                // Add targets into a document fragment

                el = target.dom.el;

                if (h.isElement(frag.lastChild)) {
                    frag.appendChild(window.document.createTextNode(' '));
                }

                frag.appendChild(el);
            }

            // Insert the document fragment into the container
            // before any other non-target elements

            if (self.dom.parent.firstChild && self.dom.parent.firstChild !== nextSibling) {
                frag.insertBefore(window.document.createTextNode(' '), frag.childNodes[0]);
            }

            if (nextSibling) {
                frag.appendChild(window.document.createTextNode(' '));

                self.dom.parent.insertBefore(frag, nextSibling);
            } else {
                self.dom.parent.appendChild(frag);
            }

            self.callActions('afterPrintSort', arguments);
        },

        /**
         * Parses user-defined sort strings (i.e. `default:asc`) into sort commands objects.
         *
         * @private
         * @instance
         * @since   3.0.0
         * @param   {string}                sortString
         * @param   {mixitup.CommandSort}   command
         * @return  {mixitup.CommandSort}
         */

        parseSortString: function parseSortString(sortString, command) {
            var self = this,
                rules = sortString.split(' '),
                current = command,
                rule = [],
                i = -1;

            // command.sortString = sortString;

            for (i = 0; i < rules.length; i++) {
                rule = rules[i].split(':');

                current.sortString = rules[i];
                current.attribute = h.dashCase(rule[0]);
                current.order = rule[1] || 'asc';

                switch (current.attribute) {
                    case 'default':
                        // treat "default" as sorting by no attribute

                        current.attribute = '';

                        break;
                    case 'random':
                        // treat "random" as an order not an attribute

                        current.attribute = '';
                        current.order = 'random';

                        break;
                }

                if (!current.attribute || current.order === 'random') break;

                if (i < rules.length - 1) {
                    // Embed reference to the next command

                    current.next = new _mixitup.CommandSort();

                    h.freeze(current);

                    current = current.next;
                }
            }

            return self.callFilters('commandsParseSort', command, arguments);
        },

        /**
         * Parses all effects out of the user-defined `animation.effects` string into
         * their respective properties and units.
         *
         * @private
         * @instance
         * @since   2.0.0
         * @return  {void}
         */

        parseEffects: function parseEffects() {
            var self = this,
                transformName = '',
                effectsIn = self.config.animation.effectsIn || self.config.animation.effects,
                effectsOut = self.config.animation.effectsOut || self.config.animation.effects;

            self.callActions('beforeParseEffects', arguments);

            self.effectsIn = new _mixitup.StyleData();
            self.effectsOut = new _mixitup.StyleData();
            self.transformIn = [];
            self.transformOut = [];

            self.effectsIn.opacity = self.effectsOut.opacity = 1;

            self.parseEffect('fade', effectsIn, self.effectsIn, self.transformIn);
            self.parseEffect('fade', effectsOut, self.effectsOut, self.transformOut, true);

            for (transformName in _mixitup.transformDefaults) {
                if (!(_mixitup.transformDefaults[transformName] instanceof _mixitup.TransformData)) {
                    continue;
                }

                self.parseEffect(transformName, effectsIn, self.effectsIn, self.transformIn);
                self.parseEffect(transformName, effectsOut, self.effectsOut, self.transformOut, true);
            }

            self.parseEffect('stagger', effectsIn, self.effectsIn, self.transformIn);
            self.parseEffect('stagger', effectsOut, self.effectsOut, self.transformOut, true);

            self.callActions('afterParseEffects', arguments);
        },

        /**
         * @private
         * @instance
         * @since   2.0.0
         * @param   {string}    effectName
         * @param   {string}    effectString
         * @param   {StyleData} effects
         * @param   {String[]}  transform
         * @param   {boolean}   [isOut]
         */

        parseEffect: function parseEffect(effectName, effectString, effects, transform, isOut) {
            var self = this,
                re = /\(([^)]+)\)/,
                propIndex = -1,
                str = '',
                match = [],
                val = '',
                units = ['%', 'px', 'em', 'rem', 'vh', 'vw', 'deg'],
                unit = '',
                i = -1;

            self.callActions('beforeParseEffect', arguments);

            if (typeof effectString !== 'string') {
                throw new TypeError(_mixitup.messages.errorConfigInvalidAnimationEffects());
            }

            if (effectString.indexOf(effectName) < 0) {
                // The effect is not present in the effects string

                if (effectName === 'stagger') {
                    // Reset stagger to 0

                    self.staggerDuration = 0;
                }

                return;
            }

            // The effect is present

            propIndex = effectString.indexOf(effectName + '(');

            if (propIndex > -1) {
                // The effect has a user defined value in parentheses

                // Extract from the first parenthesis to the end of string

                str = effectString.substring(propIndex);

                // Match any number of characters between "(" and ")"

                match = re.exec(str);

                val = match[1];
            }

            switch (effectName) {
                case 'fade':
                    effects.opacity = val ? parseFloat(val) : 0;

                    break;
                case 'stagger':
                    self.staggerDuration = val ? parseFloat(val) : 100;

                    // TODO: Currently stagger must be applied globally, but
                    // if seperate values are specified for in/out, this should
                    // be respected

                    break;
                default:
                    // All other effects are transforms following the same structure

                    if (isOut && self.config.animation.reverseOut && effectName !== 'scale') {
                        effects[effectName].value = (val ? parseFloat(val) : _mixitup.transformDefaults[effectName].value) * -1;
                    } else {
                        effects[effectName].value = val ? parseFloat(val) : _mixitup.transformDefaults[effectName].value;
                    }

                    if (val) {
                        for (i = 0; unit = units[i]; i++) {
                            if (val.indexOf(unit) > -1) {
                                effects[effectName].unit = unit;

                                break;
                            }
                        }
                    } else {
                        effects[effectName].unit = _mixitup.transformDefaults[effectName].unit;
                    }

                    transform.push(effectName + '(' + effects[effectName].value + effects[effectName].unit + ')');
            }

            self.callActions('afterParseEffect', arguments);
        },

        /**
         * @private
         * @instance
         * @since   2.0.0
         * @param   {Operation}     operation
         * @return  {State}
         */

        buildState: function buildState(operation) {
            var self = this,
                state = new _mixitup.State(),
                target = null,
                i = -1;

            self.callActions('beforeBuildState', arguments);

            // Map target elements into state arrays.
            // the real target objects should never be exposed

            for (i = 0; target = self.targets[i]; i++) {
                if (!operation.toRemove.length || operation.toRemove.indexOf(target) < 0) {
                    state.targets.push(target.dom.el);
                }
            }

            for (i = 0; target = operation.matching[i]; i++) {
                state.matching.push(target.dom.el);
            }

            for (i = 0; target = operation.show[i]; i++) {
                state.show.push(target.dom.el);
            }

            for (i = 0; target = operation.hide[i]; i++) {
                if (!operation.toRemove.length || operation.toRemove.indexOf(target) < 0) {
                    state.hide.push(target.dom.el);
                }
            }

            state.id = self.id;
            state.container = self.dom.container;
            state.activeFilter = operation.newFilter;
            state.activeSort = operation.newSort;
            state.activeDataset = operation.newDataset;
            state.activeContainerClassName = operation.newContainerClassName;
            state.hasFailed = operation.hasFailed;
            state.totalTargets = self.targets.length;
            state.totalShow = operation.show.length;
            state.totalHide = operation.hide.length;
            state.totalMatching = operation.matching.length;
            state.triggerElement = operation.triggerElement;

            return self.callFilters('stateBuildState', state, arguments);
        },

        /**
         * @private
         * @instance
         * @since   2.0.0
         * @param   {boolean}   shouldAnimate
         * @param   {Operation} operation
         * @return  {void}
         */

        goMix: function goMix(shouldAnimate, operation) {
            var self = this,
                deferred = null;

            self.callActions('beforeGoMix', arguments);

            // If the animation duration is set to 0ms,
            // or no effects specified,
            // or the container is hidden
            // then abort animation

            if (!self.config.animation.duration || !self.config.animation.effects || !h.isVisible(self.dom.container)) {
                shouldAnimate = false;
            }

            if (!operation.toShow.length && !operation.toHide.length && !operation.willSort && !operation.willChangeLayout) {
                // If nothing to show or hide, and not sorting or
                // changing layout

                shouldAnimate = false;
            }

            if (!operation.startState.show.length && !operation.show.length) {
                // If nothing currently shown, nothing to show

                shouldAnimate = false;
            }

            _mixitup.events.fire('mixStart', self.dom.container, {
                state: operation.startState,
                futureState: operation.newState,
                instance: self
            }, self.dom.document);

            if (typeof self.config.callbacks.onMixStart === 'function') {
                self.config.callbacks.onMixStart.call(self.dom.container, operation.startState, operation.newState, self);
            }

            h.removeClass(self.dom.container, h.getClassname(self.config.classNames, 'container', self.config.classNames.modifierFailed));

            if (!self.userDeferred) {
                // Queue empty, no pending operations

                deferred = self.userDeferred = h.defer(_mixitup.libraries);
            } else {
                // Use existing deferred

                deferred = self.userDeferred;
            }

            self.isBusy = true;

            if (!shouldAnimate || !_mixitup.features.has.transitions) {
                // Abort

                if (self.config.debug.fauxAsync) {
                    setTimeout(function () {
                        self.cleanUp(operation);
                    }, self.config.animation.duration);
                } else {
                    self.cleanUp(operation);
                }

                return self.callFilters('promiseGoMix', deferred.promise, arguments);
            }

            // If we should animate and the platform supports transitions, go for it

            if (window.pageYOffset !== operation.docState.scrollTop) {
                window.scrollTo(operation.docState.scrollLeft, operation.docState.scrollTop);
            }

            if (self.config.animation.applyPerspective) {
                self.dom.parent.style[_mixitup.features.perspectiveProp] = self.config.animation.perspectiveDistance;

                self.dom.parent.style[_mixitup.features.perspectiveOriginProp] = self.config.animation.perspectiveOrigin;
            }

            if (self.config.animation.animateResizeContainer && operation.startHeight !== operation.newHeight && operation.viewportDeltaY !== operation.startHeight - operation.newHeight) {
                self.dom.parent.style.height = operation.startHeight + 'px';
            }

            if (self.config.animation.animateResizeContainer && operation.startWidth !== operation.newWidth && operation.viewportDeltaX !== operation.startWidth - operation.newWidth) {
                self.dom.parent.style.width = operation.startWidth + 'px';
            }

            if (operation.startHeight === operation.newHeight) {
                self.dom.parent.style.height = operation.startHeight + 'px';
            }

            if (operation.startWidth === operation.newWidth) {
                self.dom.parent.style.width = operation.startWidth + 'px';
            }

            if (operation.startHeight === operation.newHeight && operation.startWidth === operation.newWidth) {
                self.dom.parent.style.overflow = 'hidden';
            }

            requestAnimationFrame(function () {
                self.moveTargets(operation);
            });

            return self.callFilters('promiseGoMix', deferred.promise, arguments);
        },

        /**
         * @private
         * @instance
         * @since   2.0.0
         * @param   {Operation}     operation
         * @return  {void}
         */

        getStartMixData: function getStartMixData(operation) {
            var self = this,
                parentStyle = window.getComputedStyle(self.dom.parent),
                parentRect = self.dom.parent.getBoundingClientRect(),
                target = null,
                data = {},
                i = -1,
                boxSizing = parentStyle[_mixitup.features.boxSizingProp];

            self.incPadding = boxSizing === 'border-box';

            self.callActions('beforeGetStartMixData', arguments);

            for (i = 0; target = operation.show[i]; i++) {
                data = target.getPosData();

                operation.showPosData[i] = {
                    startPosData: data
                };
            }

            for (i = 0; target = operation.toHide[i]; i++) {
                data = target.getPosData();

                operation.toHidePosData[i] = {
                    startPosData: data
                };
            }

            operation.startX = parentRect.left;
            operation.startY = parentRect.top;

            operation.startHeight = self.incPadding ? parentRect.height : parentRect.height - parseFloat(parentStyle.paddingTop) - parseFloat(parentStyle.paddingBottom) - parseFloat(parentStyle.borderTop) - parseFloat(parentStyle.borderBottom);

            operation.startWidth = self.incPadding ? parentRect.width : parentRect.width - parseFloat(parentStyle.paddingLeft) - parseFloat(parentStyle.paddingRight) - parseFloat(parentStyle.borderLeft) - parseFloat(parentStyle.borderRight);

            self.callActions('afterGetStartMixData', arguments);
        },

        /**
         * @private
         * @instance
         * @since   2.0.0
         * @param   {Operation}     operation
         * @return  {void}
         */

        setInter: function setInter(operation) {
            var self = this,
                target = null,
                i = -1;

            self.callActions('beforeSetInter', arguments);

            // Prevent scrollbar flicker on non-inertial scroll platforms by clamping height/width

            if (self.config.animation.clampHeight) {
                self.dom.parent.style.height = operation.startHeight + 'px';
                self.dom.parent.style.overflow = 'hidden';
            }

            if (self.config.animation.clampWidth) {
                self.dom.parent.style.width = operation.startWidth + 'px';
                self.dom.parent.style.overflow = 'hidden';
            }

            for (i = 0; target = operation.toShow[i]; i++) {
                target.show();
            }

            if (operation.willChangeLayout) {
                h.removeClass(self.dom.container, operation.startContainerClassName);
                h.addClass(self.dom.container, operation.newContainerClassName);
            }

            self.callActions('afterSetInter', arguments);
        },

        /**
         * @private
         * @instance
         * @since   2.0.0
         * @param   {Operation}     operation
         * @return  {void}
         */

        getInterMixData: function getInterMixData(operation) {
            var self = this,
                target = null,
                i = -1;

            self.callActions('beforeGetInterMixData', arguments);

            for (i = 0; target = operation.show[i]; i++) {
                operation.showPosData[i].interPosData = target.getPosData();
            }

            for (i = 0; target = operation.toHide[i]; i++) {
                operation.toHidePosData[i].interPosData = target.getPosData();
            }

            self.callActions('afterGetInterMixData', arguments);
        },

        /**
         * @private
         * @instance
         * @since   2.0.0
         * @param   {Operation}     operation
         * @return  {void}
         */

        setFinal: function setFinal(operation) {
            var self = this,
                target = null,
                i = -1;

            self.callActions('beforeSetFinal', arguments);

            operation.willSort && self.printSort(false, operation);

            for (i = 0; target = operation.toHide[i]; i++) {
                target.hide();
            }

            self.callActions('afterSetFinal', arguments);
        },

        /**
         * @private
         * @instance
         * @since   2.0.0
         * @param   {Operation}     operation
         * @return  {void}
         */

        getFinalMixData: function getFinalMixData(operation) {
            var self = this,
                parentStyle = null,
                parentRect = null,
                target = null,
                i = -1;

            self.callActions('beforeGetFinalMixData', arguments);

            for (i = 0; target = operation.show[i]; i++) {
                operation.showPosData[i].finalPosData = target.getPosData();
            }

            for (i = 0; target = operation.toHide[i]; i++) {
                operation.toHidePosData[i].finalPosData = target.getPosData();
            }

            // Remove clamping

            if (self.config.animation.clampHeight || self.config.animation.clampWidth) {
                self.dom.parent.style.height = self.dom.parent.style.width = self.dom.parent.style.overflow = '';
            }

            if (!self.incPadding) {
                parentStyle = window.getComputedStyle(self.dom.parent);
            }

            parentRect = self.dom.parent.getBoundingClientRect();

            operation.newX = parentRect.left;
            operation.newY = parentRect.top;

            operation.newHeight = self.incPadding ? parentRect.height : parentRect.height - parseFloat(parentStyle.paddingTop) - parseFloat(parentStyle.paddingBottom) - parseFloat(parentStyle.borderTop) - parseFloat(parentStyle.borderBottom);

            operation.newWidth = self.incPadding ? parentRect.width : parentRect.width - parseFloat(parentStyle.paddingLeft) - parseFloat(parentStyle.paddingRight) - parseFloat(parentStyle.borderLeft) - parseFloat(parentStyle.borderRight);

            operation.viewportDeltaX = operation.docState.viewportWidth - this.dom.document.documentElement.clientWidth;
            operation.viewportDeltaY = operation.docState.viewportHeight - this.dom.document.documentElement.clientHeight;

            if (operation.willSort) {
                self.printSort(true, operation);
            }

            for (i = 0; target = operation.toShow[i]; i++) {
                target.hide();
            }

            for (i = 0; target = operation.toHide[i]; i++) {
                target.show();
            }

            if (operation.willChangeLayout) {
                h.removeClass(self.dom.container, operation.newContainerClassName);
                h.addClass(self.dom.container, self.config.layout.containerClassName);
            }

            self.callActions('afterGetFinalMixData', arguments);
        },

        /**
         * @private
         * @instance
         * @since    3.0.0
         * @param    {Operation}     operation
         */

        getTweenData: function getTweenData(operation) {
            var self = this,
                target = null,
                posData = null,
                effectNames = Object.getOwnPropertyNames(self.effectsIn),
                effectName = '',
                effect = null,
                widthChange = -1,
                heightChange = -1,
                i = -1,
                j = -1;

            self.callActions('beforeGetTweenData', arguments);

            for (i = 0; target = operation.show[i]; i++) {
                posData = operation.showPosData[i];
                posData.posIn = new _mixitup.StyleData();
                posData.posOut = new _mixitup.StyleData();
                posData.tweenData = new _mixitup.StyleData();

                // Process x and y

                if (target.isShown) {
                    posData.posIn.x = posData.startPosData.x - posData.interPosData.x;
                    posData.posIn.y = posData.startPosData.y - posData.interPosData.y;
                } else {
                    posData.posIn.x = posData.posIn.y = 0;
                }

                posData.posOut.x = posData.finalPosData.x - posData.interPosData.x;
                posData.posOut.y = posData.finalPosData.y - posData.interPosData.y;

                // Process opacity

                posData.posIn.opacity = target.isShown ? 1 : self.effectsIn.opacity;
                posData.posOut.opacity = 1;
                posData.tweenData.opacity = posData.posOut.opacity - posData.posIn.opacity;

                // Adjust x and y if not nudging

                if (!target.isShown && !self.config.animation.nudge) {
                    posData.posIn.x = posData.posOut.x;
                    posData.posIn.y = posData.posOut.y;
                }

                posData.tweenData.x = posData.posOut.x - posData.posIn.x;
                posData.tweenData.y = posData.posOut.y - posData.posIn.y;

                // Process width, height, and margins

                if (self.config.animation.animateResizeTargets) {
                    posData.posIn.width = posData.startPosData.width;
                    posData.posIn.height = posData.startPosData.height;

                    // "||" Prevents width/height change from including 0 width/height if hiding or showing

                    widthChange = (posData.startPosData.width || posData.finalPosData.width) - posData.interPosData.width;

                    posData.posIn.marginRight = posData.startPosData.marginRight - widthChange;

                    heightChange = (posData.startPosData.height || posData.finalPosData.height) - posData.interPosData.height;

                    posData.posIn.marginBottom = posData.startPosData.marginBottom - heightChange;

                    posData.posOut.width = posData.finalPosData.width;
                    posData.posOut.height = posData.finalPosData.height;

                    widthChange = (posData.finalPosData.width || posData.startPosData.width) - posData.interPosData.width;

                    posData.posOut.marginRight = posData.finalPosData.marginRight - widthChange;

                    heightChange = (posData.finalPosData.height || posData.startPosData.height) - posData.interPosData.height;

                    posData.posOut.marginBottom = posData.finalPosData.marginBottom - heightChange;

                    posData.tweenData.width = posData.posOut.width - posData.posIn.width;
                    posData.tweenData.height = posData.posOut.height - posData.posIn.height;
                    posData.tweenData.marginRight = posData.posOut.marginRight - posData.posIn.marginRight;
                    posData.tweenData.marginBottom = posData.posOut.marginBottom - posData.posIn.marginBottom;
                }

                // Process transforms

                for (j = 0; effectName = effectNames[j]; j++) {
                    effect = self.effectsIn[effectName];

                    if (!(effect instanceof _mixitup.TransformData) || !effect.value) continue;

                    posData.posIn[effectName].value = effect.value;
                    posData.posOut[effectName].value = 0;

                    posData.tweenData[effectName].value = posData.posOut[effectName].value - posData.posIn[effectName].value;

                    posData.posIn[effectName].unit = posData.posOut[effectName].unit = posData.tweenData[effectName].unit = effect.unit;
                }
            }

            for (i = 0; target = operation.toHide[i]; i++) {
                posData = operation.toHidePosData[i];
                posData.posIn = new _mixitup.StyleData();
                posData.posOut = new _mixitup.StyleData();
                posData.tweenData = new _mixitup.StyleData();

                // Process x and y

                posData.posIn.x = target.isShown ? posData.startPosData.x - posData.interPosData.x : 0;
                posData.posIn.y = target.isShown ? posData.startPosData.y - posData.interPosData.y : 0;
                posData.posOut.x = self.config.animation.nudge ? 0 : posData.posIn.x;
                posData.posOut.y = self.config.animation.nudge ? 0 : posData.posIn.y;
                posData.tweenData.x = posData.posOut.x - posData.posIn.x;
                posData.tweenData.y = posData.posOut.y - posData.posIn.y;

                // Process width, height, and margins

                if (self.config.animation.animateResizeTargets) {
                    posData.posIn.width = posData.startPosData.width;
                    posData.posIn.height = posData.startPosData.height;

                    widthChange = posData.startPosData.width - posData.interPosData.width;

                    posData.posIn.marginRight = posData.startPosData.marginRight - widthChange;

                    heightChange = posData.startPosData.height - posData.interPosData.height;

                    posData.posIn.marginBottom = posData.startPosData.marginBottom - heightChange;
                }

                // Process opacity

                posData.posIn.opacity = 1;
                posData.posOut.opacity = self.effectsOut.opacity;
                posData.tweenData.opacity = posData.posOut.opacity - posData.posIn.opacity;

                // Process transforms

                for (j = 0; effectName = effectNames[j]; j++) {
                    effect = self.effectsOut[effectName];

                    if (!(effect instanceof _mixitup.TransformData) || !effect.value) continue;

                    posData.posIn[effectName].value = 0;
                    posData.posOut[effectName].value = effect.value;

                    posData.tweenData[effectName].value = posData.posOut[effectName].value - posData.posIn[effectName].value;

                    posData.posIn[effectName].unit = posData.posOut[effectName].unit = posData.tweenData[effectName].unit = effect.unit;
                }
            }

            self.callActions('afterGetTweenData', arguments);
        },

        /**
         * @private
         * @instance
         * @since   3.0.0
         * @param   {Operation}     operation
         * @return  {void}
         */

        moveTargets: function moveTargets(operation) {
            var self = this,
                target = null,
                moveData = null,
                posData = null,
                statusChange = '',
                willTransition = false,
                staggerIndex = -1,
                i = -1,
                checkProgress = self.checkProgress.bind(self);

            self.callActions('beforeMoveTargets', arguments);

            // TODO: this is an extra loop in addition to the calcs
            // done in getOperation, could some of this be done there?

            for (i = 0; target = operation.show[i]; i++) {
                moveData = new _mixitup.IMoveData();
                posData = operation.showPosData[i];

                statusChange = target.isShown ? 'none' : 'show';

                willTransition = self.willTransition(statusChange, operation.hasEffect, posData.posIn, posData.posOut);

                if (willTransition) {
                    // Prevent non-transitioning targets from incrementing the staggerIndex

                    staggerIndex++;
                }

                target.show();

                moveData.posIn = posData.posIn;
                moveData.posOut = posData.posOut;
                moveData.statusChange = statusChange;
                moveData.staggerIndex = staggerIndex;
                moveData.operation = operation;
                moveData.callback = willTransition ? checkProgress : null;

                target.move(moveData);
            }

            for (i = 0; target = operation.toHide[i]; i++) {
                posData = operation.toHidePosData[i];
                moveData = new _mixitup.IMoveData();

                statusChange = 'hide';

                willTransition = self.willTransition(statusChange, posData.posIn, posData.posOut);

                moveData.posIn = posData.posIn;
                moveData.posOut = posData.posOut;
                moveData.statusChange = statusChange;
                moveData.staggerIndex = i;
                moveData.operation = operation;
                moveData.callback = willTransition ? checkProgress : null;

                target.move(moveData);
            }

            if (self.config.animation.animateResizeContainer) {
                self.dom.parent.style[_mixitup.features.transitionProp] = 'height ' + self.config.animation.duration + 'ms ease, ' + 'width ' + self.config.animation.duration + 'ms ease ';

                requestAnimationFrame(function () {
                    if (operation.startHeight !== operation.newHeight && operation.viewportDeltaY !== operation.startHeight - operation.newHeight) {
                        self.dom.parent.style.height = operation.newHeight + 'px';
                    }

                    if (operation.startWidth !== operation.newWidth && operation.viewportDeltaX !== operation.startWidth - operation.newWidth) {
                        self.dom.parent.style.width = operation.newWidth + 'px';
                    }
                });
            }

            if (operation.willChangeLayout) {
                h.removeClass(self.dom.container, self.config.layout.ContainerClassName);
                h.addClass(self.dom.container, operation.newContainerClassName);
            }

            self.callActions('afterMoveTargets', arguments);
        },

        /**
         * @private
         * @instance
         * @return  {boolean}
         */

        hasEffect: function hasEffect() {
            var self = this,
                EFFECTABLES = ['scale', 'translateX', 'translateY', 'translateZ', 'rotateX', 'rotateY', 'rotateZ'],
                effectName = '',
                effect = null,
                result = false,
                value = -1,
                i = -1;

            if (self.effectsIn.opacity !== 1) {
                return self.callFilters('resultHasEffect', true, arguments);
            }

            for (i = 0; effectName = EFFECTABLES[i]; i++) {
                effect = self.effectsIn[effectName];
                value = (typeof effect === 'undefined' ? 'undefined' : _typeof(effect)) && effect.value !== 'undefined' ? effect.value : effect;

                if (value !== 0) {
                    result = true;

                    break;
                }
            }

            return self.callFilters('resultHasEffect', result, arguments);
        },

        /**
         * Determines if a target element will transition in
         * some fasion and therefore requires binding of
         * transitionEnd
         *
         * @private
         * @instance
         * @since   3.0.0
         * @param   {string}        statusChange
         * @param   {boolean}       hasEffect
         * @param   {StyleData}     posIn
         * @param   {StyleData}     posOut
         * @return  {boolean}
         */

        willTransition: function willTransition(statusChange, hasEffect, posIn, posOut) {
            var self = this,
                result = false;

            if (!h.isVisible(self.dom.container)) {
                // If the container is not visible, the transitionEnd
                // event will not occur and MixItUp will hang

                result = false;
            } else if (statusChange !== 'none' && hasEffect || posIn.x !== posOut.x || posIn.y !== posOut.y) {
                // If opacity and/or translate will change

                result = true;
            } else if (self.config.animation.animateResizeTargets) {
                // Check if width, height or margins will change

                result = posIn.width !== posOut.width || posIn.height !== posOut.height || posIn.marginRight !== posOut.marginRight || posIn.marginTop !== posOut.marginTop;
            } else {
                result = false;
            }

            return self.callFilters('resultWillTransition', result, arguments);
        },

        /**
         * @private
         * @instance
         * @since   2.0.0
         * @param   {Operation}     operation
         * @return  {void}
         */

        checkProgress: function checkProgress(operation) {
            var self = this;

            self.targetsDone++;

            if (self.targetsBound === self.targetsDone) {
                self.cleanUp(operation);
            }
        },

        /**
         * @private
         * @instance
         * @since   2.0.0
         * @param   {Operation}     operation
         * @return  {void}
         */

        cleanUp: function cleanUp(operation) {
            var self = this,
                target = null,
                whitespaceBefore = null,
                whitespaceAfter = null,
                nextInQueue = null,
                i = -1;

            self.callActions('beforeCleanUp', arguments);

            self.targetsMoved = self.targetsImmovable = self.targetsBound = self.targetsDone = 0;

            for (i = 0; target = operation.show[i]; i++) {
                target.cleanUp();

                target.show();
            }

            for (i = 0; target = operation.toHide[i]; i++) {
                target.cleanUp();

                target.hide();
            }

            if (operation.willSort) {
                self.printSort(false, operation);
            }

            // Remove any styles applied to the parent container

            self.dom.parent.style[_mixitup.features.transitionProp] = self.dom.parent.style.height = self.dom.parent.style.width = self.dom.parent.style.overflow = self.dom.parent.style[_mixitup.features.perspectiveProp] = self.dom.parent.style[_mixitup.features.perspectiveOriginProp] = '';

            if (operation.willChangeLayout) {
                h.removeClass(self.dom.container, operation.startContainerClassName);
                h.addClass(self.dom.container, operation.newContainerClassName);
            }

            if (operation.toRemove.length) {
                for (i = 0; target = self.targets[i]; i++) {
                    if (operation.toRemove.indexOf(target) > -1) {
                        if ((whitespaceBefore = target.dom.el.previousSibling) && whitespaceBefore.nodeName === '#text' && (whitespaceAfter = target.dom.el.nextSibling) && whitespaceAfter.nodeName === '#text') {
                            h.removeWhitespace(whitespaceBefore);
                        }

                        if (!operation.willSort) {
                            // NB: Sorting will remove targets as a bi-product of `printSort()`

                            self.dom.parent.removeChild(target.dom.el);
                        }

                        self.targets.splice(i, 1);

                        target.isInDom = false;

                        i--;
                    }
                }

                // Since targets have been removed, the original order must be updated

                self.origOrder = self.targets;
            }

            if (operation.willSort) {
                self.targets = operation.newOrder;
            }

            self.state = operation.newState;
            self.lastOperation = operation;

            self.dom.targets = self.state.targets;

            // mixEnd

            _mixitup.events.fire('mixEnd', self.dom.container, {
                state: self.state,
                instance: self
            }, self.dom.document);

            if (typeof self.config.callbacks.onMixEnd === 'function') {
                self.config.callbacks.onMixEnd.call(self.dom.container, self.state, self);
            }

            if (operation.hasFailed) {
                // mixFail

                _mixitup.events.fire('mixFail', self.dom.container, {
                    state: self.state,
                    instance: self
                }, self.dom.document);

                if (typeof self.config.callbacks.onMixFail === 'function') {
                    self.config.callbacks.onMixFail.call(self.dom.container, self.state, self);
                }

                h.addClass(self.dom.container, h.getClassname(self.config.classNames, 'container', self.config.classNames.modifierFailed));
            }

            // User-defined callback function

            if (typeof self.userCallback === 'function') {
                self.userCallback.call(self.dom.container, self.state, self);
            }

            if (typeof self.userDeferred.resolve === 'function') {
                self.userDeferred.resolve(self.state);
            }

            self.userCallback = null;
            self.userDeferred = null;
            self.lastClicked = null;
            self.isToggling = false;
            self.isBusy = false;

            if (self.queue.length) {
                self.callActions('beforeReadQueueCleanUp', arguments);

                nextInQueue = self.queue.shift();

                // Update non-public API properties stored in queue

                self.userDeferred = nextInQueue.deferred;
                self.isToggling = nextInQueue.isToggling;
                self.lastClicked = nextInQueue.triggerElement;

                if (nextInQueue.instruction.command instanceof _mixitup.CommandMultimix) {
                    self.multimix.apply(self, nextInQueue.args);
                } else {
                    self.dataset.apply(self, nextInQueue.args);
                }
            }

            self.callActions('afterCleanUp', arguments);
        },

        /**
         * @private
         * @instance
         * @since   2.0.0
         * @param   {Array<*>}  args
         * @return  {mixitup.UserInstruction}
         */

        parseMultimixArgs: function parseMultimixArgs(args) {
            var self = this,
                instruction = new _mixitup.UserInstruction(),
                arg = null,
                i = -1;

            instruction.animate = self.config.animation.enable;
            instruction.command = new _mixitup.CommandMultimix();

            for (i = 0; i < args.length; i++) {
                arg = args[i];

                if (arg === null) continue;

                if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object') {
                    h.extend(instruction.command, arg);
                } else if (typeof arg === 'boolean') {
                    instruction.animate = arg;
                } else if (typeof arg === 'function') {
                    instruction.callback = arg;
                }
            }

            // Coerce arbitrary command arguments into typed command objects

            if (instruction.command.insert && !(instruction.command.insert instanceof _mixitup.CommandInsert)) {
                instruction.command.insert = self.parseInsertArgs([instruction.command.insert]).command;
            }

            if (instruction.command.remove && !(instruction.command.remove instanceof _mixitup.CommandRemove)) {
                instruction.command.remove = self.parseRemoveArgs([instruction.command.remove]).command;
            }

            if (instruction.command.filter && !(instruction.command.filter instanceof _mixitup.CommandFilter)) {
                instruction.command.filter = self.parseFilterArgs([instruction.command.filter]).command;
            }

            if (instruction.command.sort && !(instruction.command.sort instanceof _mixitup.CommandSort)) {
                instruction.command.sort = self.parseSortArgs([instruction.command.sort]).command;
            }

            if (instruction.command.changeLayout && !(instruction.command.changeLayout instanceof _mixitup.CommandChangeLayout)) {
                instruction.command.changeLayout = self.parseChangeLayoutArgs([instruction.command.changeLayout]).command;
            }

            instruction = self.callFilters('instructionParseMultimixArgs', instruction, arguments);

            h.freeze(instruction);

            return instruction;
        },

        /**
         * @private
         * @instance
         * @since   2.0.0
         * @param   {Array<*>}  args
         * @return  {mixitup.UserInstruction}
         */

        parseFilterArgs: function parseFilterArgs(args) {
            var self = this,
                instruction = new _mixitup.UserInstruction(),
                arg = null,
                i = -1;

            instruction.animate = self.config.animation.enable;
            instruction.command = new _mixitup.CommandFilter();

            for (i = 0; i < args.length; i++) {
                arg = args[i];

                if (typeof arg === 'string') {
                    // Selector

                    instruction.command.selector = arg;
                } else if (arg === null) {
                    instruction.command.collection = [];
                } else if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && h.isElement(arg, self.dom.document)) {
                    // Single element

                    instruction.command.collection = [arg];
                } else if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && typeof arg.length !== 'undefined') {
                    // Multiple elements in array, NodeList or jQuery collection

                    instruction.command.collection = h.arrayFromList(arg);
                } else if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object') {
                    // Filter command

                    h.extend(instruction.command, arg);
                } else if (typeof arg === 'boolean') {
                    instruction.animate = arg;
                } else if (typeof arg === 'function') {
                    instruction.callback = arg;
                }
            }

            if (instruction.command.selector && instruction.command.collection) {
                throw new Error(_mixitup.messages.errorFilterInvalidArguments());
            }

            instruction = self.callFilters('instructionParseFilterArgs', instruction, arguments);

            h.freeze(instruction);

            return instruction;
        },

        parseSortArgs: function parseSortArgs(args) {
            var self = this,
                instruction = new _mixitup.UserInstruction(),
                arg = null,
                sortString = '',
                i = -1;

            instruction.animate = self.config.animation.enable;
            instruction.command = new _mixitup.CommandSort();

            for (i = 0; i < args.length; i++) {
                arg = args[i];

                if (arg === null) continue;

                switch (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) {
                    case 'string':
                        // Sort string

                        sortString = arg;

                        break;
                    case 'object':
                        // Array of element references

                        if (arg.length) {
                            instruction.command.collection = h.arrayFromList(arg);
                        }

                        break;
                    case 'boolean':
                        instruction.animate = arg;

                        break;
                    case 'function':
                        instruction.callback = arg;

                        break;
                }
            }

            if (sortString) {
                instruction.command = self.parseSortString(sortString, instruction.command);
            }

            instruction = self.callFilters('instructionParseSortArgs', instruction, arguments);

            h.freeze(instruction);

            return instruction;
        },

        /**
         * @private
         * @instance
         * @since   2.0.0
         * @param   {Array<*>}  args
         * @return  {mixitup.UserInstruction}
         */

        parseInsertArgs: function parseInsertArgs(args) {
            var self = this,
                instruction = new _mixitup.UserInstruction(),
                arg = null,
                i = -1;

            instruction.animate = self.config.animation.enable;
            instruction.command = new _mixitup.CommandInsert();

            for (i = 0; i < args.length; i++) {
                arg = args[i];

                if (arg === null) continue;

                if (typeof arg === 'number') {
                    // Insert index

                    instruction.command.index = arg;
                } else if (typeof arg === 'string' && ['before', 'after'].indexOf(arg) > -1) {
                    // 'before'/'after'

                    instruction.command.position = arg;
                } else if (typeof arg === 'string') {
                    // Markup

                    instruction.command.collection = h.arrayFromList(h.createElement(arg).childNodes);
                } else if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && h.isElement(arg, self.dom.document)) {
                    // Single element

                    !instruction.command.collection.length ? instruction.command.collection = [arg] : instruction.command.sibling = arg;
                } else if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg.length) {
                    // Multiple elements in array or jQuery collection

                    !instruction.command.collection.length ? instruction.command.collection = arg : instruction.command.sibling = arg[0];
                } else if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg.childNodes && arg.childNodes.length) {
                    // Document fragment

                    !instruction.command.collection.length ? instruction.command.collection = h.arrayFromList(arg.childNodes) : instruction.command.sibling = arg.childNodes[0];
                } else if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object') {
                    // Insert command

                    h.extend(instruction.command, arg);
                } else if (typeof arg === 'boolean') {
                    instruction.animate = arg;
                } else if (typeof arg === 'function') {
                    instruction.callback = arg;
                }
            }

            if (instruction.command.index && instruction.command.sibling) {
                throw new Error(_mixitup.messages.errorInsertInvalidArguments());
            }

            if (!instruction.command.collection.length && self.config.debug.showWarnings) {
                console.warn(_mixitup.messages.warningInsertNoElements());
            }

            instruction = self.callFilters('instructionParseInsertArgs', instruction, arguments);

            h.freeze(instruction);

            return instruction;
        },

        /**
         * @private
         * @instance
         * @since   3.0.0
         * @param   {Array<*>}  args
         * @return  {mixitup.UserInstruction}
         */

        parseRemoveArgs: function parseRemoveArgs(args) {
            var self = this,
                instruction = new _mixitup.UserInstruction(),
                target = null,
                arg = null,
                i = -1;

            instruction.animate = self.config.animation.enable;
            instruction.command = new _mixitup.CommandRemove();

            for (i = 0; i < args.length; i++) {
                arg = args[i];

                if (arg === null) continue;

                switch (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) {
                    case 'number':
                        if (self.targets[arg]) {
                            instruction.command.targets[0] = self.targets[arg];
                        }

                        break;
                    case 'string':
                        instruction.command.collection = h.arrayFromList(self.dom.parent.querySelectorAll(arg));

                        break;
                    case 'object':
                        if (arg && arg.length) {
                            instruction.command.collection = arg;
                        } else if (h.isElement(arg, self.dom.document)) {
                            instruction.command.collection = [arg];
                        } else {
                            // Remove command

                            h.extend(instruction.command, arg);
                        }

                        break;
                    case 'boolean':
                        instruction.animate = arg;

                        break;
                    case 'function':
                        instruction.callback = arg;

                        break;
                }
            }

            if (instruction.command.collection.length) {
                for (i = 0; target = self.targets[i]; i++) {
                    if (instruction.command.collection.indexOf(target.dom.el) > -1) {
                        instruction.command.targets.push(target);
                    }
                }
            }

            if (!instruction.command.targets.length && self.config.debug.showWarnings) {
                console.warn(_mixitup.messages.warningRemoveNoElements());
            }

            h.freeze(instruction);

            return instruction;
        },

        /**
         * @private
         * @instance
         * @since   3.0.0
         * @param   {Array<*>}  args
         * @return  {mixitup.UserInstruction}
         */

        parseDatasetArgs: function parseDatasetArgs(args) {
            var self = this,
                instruction = new _mixitup.UserInstruction(),
                arg = null,
                i = -1;

            instruction.animate = self.config.animation.enable;
            instruction.command = new _mixitup.CommandDataset();

            for (i = 0; i < args.length; i++) {
                arg = args[i];

                if (arg === null) continue;

                switch (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) {
                    case 'object':
                        if (Array.isArray(arg) || typeof arg.length === 'number') {
                            instruction.command.dataset = arg;
                        } else {
                            // Change layout command

                            h.extend(instruction.command, arg);
                        }

                        break;
                    case 'boolean':
                        instruction.animate = arg;

                        break;
                    case 'function':
                        instruction.callback = arg;

                        break;
                }
            }

            h.freeze(instruction);

            return instruction;
        },

        /**
         * @private
         * @instance
         * @since   3.0.0
         * @param   {Array<*>}  args
         * @return  {mixitup.UserInstruction}
         */

        parseChangeLayoutArgs: function parseChangeLayoutArgs(args) {
            var self = this,
                instruction = new _mixitup.UserInstruction(),
                arg = null,
                i = -1;

            instruction.animate = self.config.animation.enable;
            instruction.command = new _mixitup.CommandChangeLayout();

            for (i = 0; i < args.length; i++) {
                arg = args[i];

                if (arg === null) continue;

                switch (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) {
                    case 'string':
                        instruction.command.containerClassName = arg;

                        break;
                    case 'object':
                        // Change layout command

                        h.extend(instruction.command, arg);

                        break;
                    case 'boolean':
                        instruction.animate = arg;

                        break;
                    case 'function':
                        instruction.callback = arg;

                        break;
                }
            }

            h.freeze(instruction);

            return instruction;
        },

        /**
         * @private
         * @instance
         * @since       3.0.0
         * @param       {mixitup.QueueItem}         queueItem
         * @return      {Promise.<mixitup.State>}
         */

        queueMix: function queueMix(queueItem) {
            var self = this,
                deferred = null,
                toggleSelector = '';

            self.callActions('beforeQueueMix', arguments);

            deferred = h.defer(_mixitup.libraries);

            if (self.config.animation.queue && self.queue.length < self.config.animation.queueLimit) {
                queueItem.deferred = deferred;

                self.queue.push(queueItem);

                // Keep controls in sync with user interactions. Mixer will catch up as it drains the queue.

                if (self.config.controls.enable) {
                    if (self.isToggling) {
                        self.buildToggleArray(queueItem.instruction.command);

                        toggleSelector = self.getToggleSelector();

                        self.updateControls({
                            filter: {
                                selector: toggleSelector
                            }
                        });
                    } else {
                        self.updateControls(queueItem.instruction.command);
                    }
                }
            } else {
                if (self.config.debug.showWarnings) {
                    console.warn(_mixitup.messages.warningMultimixInstanceQueueFull());
                }

                deferred.resolve(self.state);

                _mixitup.events.fire('mixBusy', self.dom.container, {
                    state: self.state,
                    instance: self
                }, self.dom.document);

                if (typeof self.config.callbacks.onMixBusy === 'function') {
                    self.config.callbacks.onMixBusy.call(self.dom.container, self.state, self);
                }
            }

            return self.callFilters('promiseQueueMix', deferred.promise, arguments);
        },

        /**
         * @private
         * @instance
         * @since   3.0.0
         * @param   {Array.<object>}    newDataset
         * @return  {Operation}
         */

        getDataOperation: function getDataOperation(newDataset) {
            var self = this,
                operation = new _mixitup.Operation(),
                startDataset = [];

            operation = self.callFilters('operationUnmappedGetDataOperation', operation, arguments);

            if (self.dom.targets.length && !(startDataset = self.state.activeDataset || []).length) {
                throw new Error(_mixitup.messages.errorDatasetNotSet());
            }

            operation.id = h.randomHex();
            operation.startState = self.state;
            operation.startDataset = startDataset;
            operation.newDataset = newDataset.slice();

            self.diffDatasets(operation);

            operation.startOrder = self.targets;
            operation.newOrder = operation.show;

            if (self.config.animation.enable) {
                self.getStartMixData(operation);
                self.setInter(operation);

                operation.docState = h.getDocumentState(self.dom.document);

                self.getInterMixData(operation);
                self.setFinal(operation);
                self.getFinalMixData(operation);

                self.parseEffects();

                operation.hasEffect = self.hasEffect();

                self.getTweenData(operation);
            }

            self.targets = operation.show.slice();

            operation.newState = self.buildState(operation);

            // NB: Targets to be removed must be included in `self.targets` for removal during clean up,
            // but are added after state is built so that state is accurate

            Array.prototype.push.apply(self.targets, operation.toRemove);

            operation = self.callFilters('operationMappedGetDataOperation', operation, arguments);

            return operation;
        },

        /**
         * @private
         * @instance
         * @since   3.0.0
         * @param   {mixitup.Operation} operation
         * @return  {void}
         */

        diffDatasets: function diffDatasets(operation) {
            var self = this,
                persistantStartIds = [],
                persistantNewIds = [],
                insertedTargets = [],
                data = null,
                target = null,
                el = null,
                frag = null,
                nextEl = null,
                uids = {},
                id = '',
                i = -1;

            self.callActions('beforeDiffDatasets', arguments);

            for (i = 0; data = operation.newDataset[i]; i++) {
                if (typeof (id = data[self.config.data.uidKey]) === 'undefined' || id.toString().length < 1) {
                    throw new TypeError(_mixitup.messages.errorDatasetInvalidUidKey({
                        uidKey: self.config.data.uidKey
                    }));
                }

                if (!uids[id]) {
                    uids[id] = true;
                } else {
                    throw new Error(_mixitup.messages.errorDatasetDuplicateUid({
                        uid: id
                    }));
                }

                if ((target = self.cache[id]) instanceof _mixitup.Target) {
                    // Already in cache

                    if (self.config.data.dirtyCheck && !h.deepEquals(data, target.data)) {
                        // change detected

                        el = target.render(data);

                        target.data = data;

                        if (el !== target.dom.el) {
                            // Update target element reference

                            if (target.isInDom) {
                                target.unbindEvents();

                                self.dom.parent.replaceChild(el, target.dom.el);
                            }

                            if (!target.isShown) {
                                el.style.display = 'none';
                            }

                            target.dom.el = el;

                            if (target.isInDom) {
                                target.bindEvents();
                            }
                        }
                    }

                    el = target.dom.el;
                } else {
                    // New target

                    target = new _mixitup.Target();

                    target.init(null, self, data);

                    target.hide();
                }

                if (!target.isInDom) {
                    // Adding to DOM

                    if (!frag) {
                        // Open frag

                        frag = self.dom.document.createDocumentFragment();
                    }

                    if (frag.lastElementChild) {
                        frag.appendChild(self.dom.document.createTextNode(' '));
                    }

                    frag.appendChild(target.dom.el);

                    target.isInDom = true;

                    target.unbindEvents();
                    target.bindEvents();
                    target.hide();

                    operation.toShow.push(target);

                    insertedTargets.push(target);
                } else {
                    // Already in DOM

                    nextEl = target.dom.el.nextElementSibling;

                    persistantNewIds.push(id);

                    if (frag) {
                        // Close and insert previously opened frag

                        if (frag.lastElementChild) {
                            frag.appendChild(self.dom.document.createTextNode(' '));
                        }

                        self.insertDatasetFrag(frag, target.dom.el, insertedTargets);

                        frag = null;
                    }
                }

                operation.show.push(target);
            }

            if (frag) {
                // Unclosed frag remaining

                nextEl = nextEl || self.config.layout.siblingAfter;

                if (nextEl) {
                    frag.appendChild(self.dom.document.createTextNode(' '));
                }

                self.insertDatasetFrag(frag, nextEl, insertedTargets);
            }

            for (i = 0; data = operation.startDataset[i]; i++) {
                id = data[self.config.data.uidKey];

                target = self.cache[id];

                if (operation.show.indexOf(target) < 0) {
                    // Previously shown but now absent

                    operation.hide.push(target);
                    operation.toHide.push(target);
                    operation.toRemove.push(target);
                } else {
                    persistantStartIds.push(id);
                }
            }

            if (!h.isEqualArray(persistantStartIds, persistantNewIds)) {
                operation.willSort = true;
            }

            self.callActions('afterDiffDatasets', arguments);
        },

        /**
         * @private
         * @instance
         * @since   3.1.5
         * @param   {DocumentFragment}          frag
         * @param   {(HTMLElement|null)}        nextEl
         * @param   {Array.<mixitup.Target>}    targets
         * @return  {void}
         */

        insertDatasetFrag: function insertDatasetFrag(frag, nextEl, targets) {
            var self = this;
            var insertAt = nextEl ? Array.from(self.dom.parent.children).indexOf(nextEl) : self.targets.length;

            self.dom.parent.insertBefore(frag, nextEl);

            while (targets.length) {
                self.targets.splice(insertAt, 0, targets.shift());

                insertAt++;
            }
        },

        /**
         * @private
         * @instance
         * @since   3.0.0
         * @param   {mixitup.CommandSort} sortCommandA
         * @param   {mixitup.CommandSort} sortCommandB
         * @return  {boolean}
         */

        willSort: function willSort(sortCommandA, sortCommandB) {
            var self = this,
                result = false;

            if (self.config.behavior.liveSort || sortCommandA.order === 'random' || sortCommandA.attribute !== sortCommandB.attribute || sortCommandA.order !== sortCommandB.order || sortCommandA.collection !== sortCommandB.collection || sortCommandA.next === null && sortCommandB.next || sortCommandA.next && sortCommandB.next === null) {
                result = true;
            } else if (sortCommandA.next && sortCommandB.next) {
                result = self.willSort(sortCommandA.next, sortCommandB.next);
            } else {
                result = false;
            }

            return self.callFilters('resultWillSort', result, arguments);
        },

        /**
         * A shorthand method for `.filter('all')`. Shows all targets in the container.
         *
         * @example
         *
         * .show()
         *
         * @example <caption>Example: Showing all targets</caption>
         *
         * mixer.show()
         *     .then(function(state) {
         *         console.log(state.totalShow === state.totalTargets); // true
         *     });
         *
         * @public
         * @instance
         * @since       3.0.0
         * @return      {Promise.<mixitup.State>}
         */

        show: function show() {
            var self = this;

            return self.filter('all');
        },

        /**
         * A shorthand method for `.filter('none')`. Hides all targets in the container.
         *
         * @example
         *
         * .hide()
         *
         * @example <caption>Example: Hiding all targets</caption>
         *
         * mixer.hide()
         *     .then(function(state) {
         *         console.log(state.totalShow === 0); // true
         *         console.log(state.totalHide === state.totalTargets); // true
         *     });
         *
         * @public
         * @instance
         * @since       3.0.0
         * @return      {Promise.<mixitup.State>}
         */

        hide: function hide() {
            var self = this;

            return self.filter('none');
        },

        /**
         * Returns a boolean indicating whether or not a MixItUp operation is
         * currently in progress.
         *
         * @example
         *
         * .isMixing()
         *
         * @example <caption>Example: Checking the status of a mixer</caption>
         *
         * mixer.sort('random', function() {
         *     console.log(mixer.isMixing()) // false
         * });
         *
         * console.log(mixer.isMixing()) // true
         *
         * @public
         * @instance
         * @since   2.0.0
         * @return  {boolean}
         */

        isMixing: function isMixing() {
            var self = this;

            return self.isBusy;
        },

        /**
         * Filters all targets in the container by a provided selector string, or the values `'all'`
         * or `'none'`. Only targets matching the selector will be shown.
         *
         * @example
         *
         * .filter(selector [, animate] [, callback])
         *
         * @example <caption>Example 1: Filtering targets by a class selector</caption>
         *
         * mixer.filter('.category-a')
         *     .then(function(state) {
         *         console.log(state.totalShow === containerEl.querySelectorAll('.category-a').length); // true
         *     });
         *
         * @example <caption>Example 2: Filtering targets by an attribute selector</caption>
         *
         * mixer.filter('[data-category~="a"]')
         *     .then(function(state) {
         *         console.log(state.totalShow === containerEl.querySelectorAll('[data-category~="a"]').length); // true
         *     });
         *
         * @example <caption>Example 3: Filtering targets by a compound selector</caption>
         *
         * // Show only those targets with the classes 'category-a' AND 'category-b'
         *
         * mixer.filter('.category-a.category-c')
         *     .then(function(state) {
         *         console.log(state.totalShow === containerEl.querySelectorAll('.category-a.category-c').length); // true
         *     });
         *
         * @example <caption>Example 4: Filtering via an element collection</caption>
         *
         * var collection = Array.from(container.querySelectorAll('.mix'));
         *
         * console.log(collection.length); // 34
         *
         * // Filter the collection manually using Array.prototype.filter
         *
         * var filtered = collection.filter(function(target) {
         *    return parseInt(target.getAttribute('data-price')) > 10;
         * });
         *
         * console.log(filtered.length); // 22
         *
         * // Pass the filtered collection to MixItUp
         *
         * mixer.filter(filtered)
         *    .then(function(state) {
         *        console.log(state.activeFilter.collection.length === 22); // true
         *    });
         *
         * @public
         * @instance
         * @since       2.0.0
         * @param       {(string|HTMLElement|Array.<HTMLElement>)} selector
         *      Any valid CSS selector (i.e. `'.category-a'`), or the values `'all'` or `'none'`. The filter method also accepts a reference to single target element or a collection of target elements to show.
         * @param       {boolean}   [animate=true]
         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
         * @param       {function}  [callback=null]
         *      An optional callback function to be invoked after the operation has completed.
         * @return      {Promise.<mixitup.State>}
         *      A promise resolving with the current state object.
         */

        filter: function filter() {
            var self = this,
                instruction = self.parseFilterArgs(arguments);

            return self.multimix({
                filter: instruction.command
            }, instruction.animate, instruction.callback);
        },

        /**
         * Adds an additional selector to the currently active filter selector, concatenating
         * as per the logic defined in `controls.toggleLogic`.
         *
         * @example
         *
         * .toggleOn(selector [, animate] [, callback])
         *
         * @example <caption>Example: Toggling on a filter selector</caption>
         *
         * console.log(mixer.getState().activeFilter.selector); // '.category-a'
         *
         * mixer.toggleOn('.category-b')
         *     .then(function(state) {
         *         console.log(state.activeFilter.selector); // '.category-a, .category-b'
         *     });
         *
         * @public
         * @instance
         * @since       3.0.0
         * @param       {string}    selector
         *      Any valid CSS selector (i.e. `'.category-a'`)
         * @param       {boolean}   [animate=true]
         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
         * @param       {function}  [callback=null]
         *      An optional callback function to be invoked after the operation has completed.
         * @return      {Promise.<mixitup.State>}
         *      A promise resolving with the current state object.
         */

        toggleOn: function toggleOn() {
            var self = this,
                instruction = self.parseFilterArgs(arguments),
                selector = instruction.command.selector,
                toggleSelector = '';

            self.isToggling = true;

            if (self.toggleArray.indexOf(selector) < 0) {
                self.toggleArray.push(selector);
            }

            toggleSelector = self.getToggleSelector();

            return self.multimix({
                filter: toggleSelector
            }, instruction.animate, instruction.callback);
        },

        /**
         * Removes a selector from the active filter selector.
         *
         * @example
         *
         * .toggleOff(selector [, animate] [, callback])
         *
         * @example <caption>Example: Toggling off a filter selector</caption>
         *
         * console.log(mixer.getState().activeFilter.selector); // '.category-a, .category-b'
         *
         * mixer.toggleOff('.category-b')
         *     .then(function(state) {
         *         console.log(state.activeFilter.selector); // '.category-a'
         *     });
         *
         * @public
         * @instance
         * @since       3.0.0
         * @param       {string}    selector
         *      Any valid CSS selector (i.e. `'.category-a'`)
         * @param       {boolean}   [animate=true]
         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
         * @param       {function}  [callback=null]
         *      An optional callback function to be invoked after the operation has completed.
         * @return      {Promise.<mixitup.State>}
         *      A promise resolving with the current state object.
         */

        toggleOff: function toggleOff() {
            var self = this,
                instruction = self.parseFilterArgs(arguments),
                selector = instruction.command.selector,
                toggleSelector = '';

            self.isToggling = true;

            self.toggleArray.splice(self.toggleArray.indexOf(selector), 1);

            toggleSelector = self.getToggleSelector();

            return self.multimix({
                filter: toggleSelector
            }, instruction.animate, instruction.callback);
        },

        /**
         * Sorts all targets in the container according to a provided sort string.
         *
         * @example
         *
         * .sort(sortString [, animate] [, callback])
         *
         * @example <caption>Example 1: Sorting by the default DOM order</caption>
         *
         * // Reverse the default order of the targets
         *
         * mixer.sort('default:desc')
         *     .then(function(state) {
         *         console.log(state.activeSort.attribute === 'default'); // true
         *         console.log(state.activeSort.order === 'desc'); // true
         *     });
         *
         * @example <caption>Example 2: Sorting by a custom data-attribute</caption>
         *
         * // Sort the targets by the value of a `data-published-date` attribute
         *
         * mixer.sort('published-date:asc')
         *     .then(function(state) {
         *         console.log(state.activeSort.attribute === 'published-date'); // true
         *         console.log(state.activeSort.order === 'asc'); // true
         *     });
         *
         * @example <caption>Example 3: Sorting by multiple attributes</caption>
         *
         * // Sort the targets by the value of a `data-published-date` attribute, then by `data-title`
         *
         * mixer.sort('published-date:desc data-title:asc')
         *     .then(function(state) {
         *         console.log(state.activeSort.attribute === 'published-date'); // true
         *         console.log(state.activeSort.order === 'desc'); // true
         *
         *         console.log(state.activeSort.next.attribute === 'title'); // true
         *         console.log(state.activeSort.next.order === 'asc'); // true
         *     });
         *
         * @example <caption>Example 4: Sorting by random</caption>
         *
         * mixer.sort('random')
         *     .then(function(state) {
         *         console.log(state.activeSort.order === 'random') // true
         *     });
         *
         * @example <caption>Example 5: Sorting via an element collection</caption>
         *
         * var collection = Array.from(container.querySelectorAll('.mix'));
         *
         * // Swap the position of two elements in the collection:
         *
         * var temp = collection[1];
         *
         * collection[1] = collection[0];
         * collection[0] = temp;
         *
         * // Pass the sorted collection to MixItUp
         *
         * mixer.sort(collection)
         *     .then(function(state) {
         *         console.log(state.targets[0] === collection[0]); // true
         *     });
         *
         * @public
         * @instance
         * @since       2.0.0
         * @param       {(string|Array.<HTMLElement>)}    sortString
         *      A valid sort string (e.g. `'default'`, `'published-date:asc'`, or `'random'`). The sort method also accepts an array of all target elements in a user-defined order.
         * @param       {boolean}   [animate=true]
         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
         * @param       {function}  [callback=null]
         *      An optional callback function to be invoked after the operation has completed.
         * @return      {Promise.<mixitup.State>}
         *      A promise resolving with the current state object.
         */

        sort: function sort() {
            var self = this,
                instruction = self.parseSortArgs(arguments);

            return self.multimix({
                sort: instruction.command
            }, instruction.animate, instruction.callback);
        },

        /**
         * Changes the layout of the container by adding, removing or updating a
         * layout-specific class name. If `animation.animateResizetargets` is
         * enabled, MixItUp will attempt to gracefully animate the width, height,
         * and position of targets between layout states.
         *
         * @example
         *
         * .changeLayout(containerClassName [, animate] [, callback])
         *
         * @example <caption>Example 1: Adding a new class name to the container</caption>
         *
         * mixer.changeLayout('container-list')
         *      .then(function(state) {
         *          console.log(state.activeContainerClass === 'container-list'); // true
         *      });
         *
         * @example <caption>Example 2: Removing a previously added class name from the container</caption>
         *
         * mixer.changeLayout('')
         *      .then(function(state) {
         *          console.log(state.activeContainerClass === ''); // true
         *      });
         *
         * @public
         * @instance
         * @since       2.0.0
         * @param       {string}    containerClassName
         *      A layout-specific class name to add to the container.
         * @param       {boolean}   [animate=true]
         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
         * @param       {function}  [callback=null]
         *      An optional callback function to be invoked after the operation has completed.
         * @return      {Promise.<mixitup.State>}
         *      A promise resolving with the current state object.
         */

        changeLayout: function changeLayout() {
            var self = this,
                instruction = self.parseChangeLayoutArgs(arguments);

            return self.multimix({
                changeLayout: instruction.command
            }, instruction.animate, instruction.callback);
        },

        /**
         * Updates the contents and order of the container to reflect the provided dataset,
         * if the dataset API is in use.
         *
         * The dataset API is designed for use in API-driven JavaScript applications, and
         * can be used instead of DOM-based methods such as `.filter()`, `.sort()`,
         * `.insert()`, etc. When used, insertion, removal, sorting and pagination can be
         * achieved purely via changes to your data model, without the uglyness of having
         * to interact with or query the DOM directly.
         *
         * @example
         *
         * .dataset(dataset [, animate] [, callback])
         *
         * @example <caption>Example 1: Rendering a dataset</caption>
         *
         * var myDataset = [
         *     {id: 1, ...},
         *     {id: 2, ...},
         *     {id: 3, ...}
         * ];
         *
         * mixer.dataset(myDataset)
         *     .then(function(state) {
         *         console.log(state.totalShow === 3); // true
         *     });
         *
         * @example <caption>Example 2: Sorting a dataset</caption>
         *
         * // Create a new dataset in reverse order
         *
         * var newDataset = myDataset.slice().reverse();
         *
         * mixer.dataset(newDataset)
         *     .then(function(state) {
         *         console.log(state.activeDataset[0] === myDataset[2]); // true
         *     });
         *
         * @example <caption>Example 3: Removing an item from the dataset</caption>
         *
         * console.log(myDataset.length); // 3
         *
         * // Create a new dataset with the last item removed.
         *
         * var newDataset = myDataset.slice().pop();
         *
         * mixer.dataset(newDataset)
         *     .then(function(state) {
         *         console.log(state.totalShow === 2); // true
         *     });
         *
         * @public
         * @instance
         * @since       3.0.0
         * @param       {Array.<object>}    dataset
         *      An array of objects, each one representing the underlying data model of a target to be rendered.
         * @param       {boolean}           [animate=true]
         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
         * @param       {function}          [callback=null]
         *      An optional callback function to be invoked after the operation has completed.
         * @return      {Promise.<mixitup.State>}
         *      A promise resolving with the current state object.
         */

        dataset: function dataset() {
            var self = this,
                instruction = self.parseDatasetArgs(arguments),
                operation = null,
                queueItem = null,
                animate = false;

            self.callActions('beforeDataset', arguments);

            if (!self.isBusy) {
                if (instruction.callback) self.userCallback = instruction.callback;

                animate = instruction.animate ^ self.config.animation.enable ? instruction.animate : self.config.animation.enable;

                operation = self.getDataOperation(instruction.command.dataset);

                return self.goMix(animate, operation);
            } else {
                queueItem = new _mixitup.QueueItem();

                queueItem.args = arguments;
                queueItem.instruction = instruction;

                return self.queueMix(queueItem);
            }
        },

        /**
         * Performs simultaneous `filter`, `sort`, `insert`, `remove` and `changeLayout`
         * operations as requested.
         *
         * @example
         *
         * .multimix(multimixCommand [, animate] [, callback])
         *
         * @example <caption>Example 1: Performing simultaneous filtering and sorting</caption>
         *
         * mixer.multimix({
         *     filter: '.category-b',
         *     sort: 'published-date:desc'
         * })
         *     .then(function(state) {
         *         console.log(state.activeFilter.selector === '.category-b'); // true
         *         console.log(state.activeSort.attribute === 'published-date'); // true
         *     });
         *
         * @example <caption>Example 2: Performing simultaneous sorting, insertion, and removal</caption>
         *
         * console.log(mixer.getState().totalShow); // 6
         *
         * // NB: When inserting via `multimix()`, an object should be provided as the value
         * // for the `insert` portion of the command, allowing for a collection of elements
         * // and an insertion index to be specified.
         *
         * mixer.multimix({
         *     sort: 'published-date:desc', // Sort the container, including any new elements
         *     insert: {
         *         collection: [newElementReferenceA, newElementReferenceB], // Add 2 new elements at index 5
         *         index: 5
         *     },
         *     remove: existingElementReference // Remove 1 existing element
         * })
         *     .then(function(state) {
         *         console.log(state.activeSort.attribute === 'published-date'); // true
         *         console.log(state.totalShow === 7); // true
         *     });
         *
         * @public
         * @instance
         * @since       2.0.0
         * @param       {object}    multimixCommand
         *      An object containing one or more things to do
         * @param       {boolean}   [animate=true]
         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
         * @param       {function}  [callback=null]
         *      An optional callback function to be invoked after the operation has completed.
         * @return      {Promise.<mixitup.State>}
         *      A promise resolving with the current state object.
         */

        multimix: function multimix() {
            var self = this,
                operation = null,
                animate = false,
                queueItem = null,
                instruction = self.parseMultimixArgs(arguments);

            self.callActions('beforeMultimix', arguments);

            if (!self.isBusy) {
                operation = self.getOperation(instruction.command);

                if (self.config.controls.enable) {
                    // Update controls for API calls

                    if (instruction.command.filter && !self.isToggling) {
                        // As we are not toggling, reset the toggle array
                        // so new filter overrides existing toggles

                        self.toggleArray.length = 0;
                        self.buildToggleArray(operation.command);
                    }

                    if (self.queue.length < 1) {
                        self.updateControls(operation.command);
                    }
                }

                if (instruction.callback) self.userCallback = instruction.callback;

                // Always allow the instruction to override the instance setting

                animate = instruction.animate ^ self.config.animation.enable ? instruction.animate : self.config.animation.enable;

                self.callFilters('operationMultimix', operation, arguments);

                return self.goMix(animate, operation);
            } else {
                queueItem = new _mixitup.QueueItem();

                queueItem.args = arguments;
                queueItem.instruction = instruction;
                queueItem.triggerElement = self.lastClicked;
                queueItem.isToggling = self.isToggling;

                return self.queueMix(queueItem);
            }
        },

        /**
         * @private
         * @instance
         * @since   3.0.0
         * @param   {object}            multimixCommand
         * @param   {boolean}           [isPreFetch]
         *      An optional boolean indicating that the operation is being pre-fetched for execution at a later time.
         * @return  {Operation|null}
         */

        getOperation: function getOperation(multimixCommand) {
            var self = this,
                sortCommand = multimixCommand.sort,
                filterCommand = multimixCommand.filter,
                changeLayoutCommand = multimixCommand.changeLayout,
                removeCommand = multimixCommand.remove,
                insertCommand = multimixCommand.insert,
                operation = new _mixitup.Operation();

            operation = self.callFilters('operationUnmappedGetOperation', operation, arguments);

            operation.id = h.randomHex();
            operation.command = multimixCommand;
            operation.startState = self.state;
            operation.triggerElement = self.lastClicked;

            if (self.isBusy) {
                if (self.config.debug.showWarnings) {
                    console.warn(_mixitup.messages.warningGetOperationInstanceBusy());
                }

                return null;
            }

            if (insertCommand) {
                self.insertTargets(insertCommand, operation);
            }

            if (removeCommand) {
                operation.toRemove = removeCommand.targets;
            }

            operation.startSort = operation.newSort = operation.startState.activeSort;
            operation.startOrder = operation.newOrder = self.targets;

            if (sortCommand) {
                operation.startSort = operation.startState.activeSort;
                operation.newSort = sortCommand;

                operation.willSort = self.willSort(sortCommand, operation.startState.activeSort);

                if (operation.willSort) {
                    self.sortOperation(operation);
                }
            }

            operation.startFilter = operation.startState.activeFilter;

            if (filterCommand) {
                operation.newFilter = filterCommand;
            } else {
                operation.newFilter = h.extend(new _mixitup.CommandFilter(), operation.startFilter);
            }

            if (operation.newFilter.selector === 'all') {
                operation.newFilter.selector = self.config.selectors.target;
            } else if (operation.newFilter.selector === 'none') {
                operation.newFilter.selector = '';
            }

            self.filterOperation(operation);

            operation.startContainerClassName = operation.startState.activeContainerClassName;

            if (changeLayoutCommand) {
                operation.newContainerClassName = changeLayoutCommand.containerClassName;

                if (operation.newContainerClassName !== operation.startContainerClassName) {
                    operation.willChangeLayout = true;
                }
            } else {
                operation.newContainerClassName = operation.startContainerClassName;
            }

            if (self.config.animation.enable) {
                // Populate the operation's position data

                self.getStartMixData(operation);
                self.setInter(operation);

                operation.docState = h.getDocumentState(self.dom.document);

                self.getInterMixData(operation);
                self.setFinal(operation);
                self.getFinalMixData(operation);

                self.parseEffects();

                operation.hasEffect = self.hasEffect();

                self.getTweenData(operation);
            }

            if (operation.willSort) {
                self.targets = operation.newOrder;
            }

            operation.newState = self.buildState(operation);

            return self.callFilters('operationMappedGetOperation', operation, arguments);
        },

        /**
         * Renders a previously created operation at a specific point in its path, as
         * determined by a multiplier between 0 and 1.
         *
         * @example
         * .tween(operation, multiplier)
         *
         * @private
         * @instance
         * @since   3.0.0
         * @param   {mixitup.Operation}     operation
         *      An operation object created via the `getOperation` method
         *
         * @param   {Float}                 multiplier
         *      Any number between 0 and 1 representing the percentage complete of the operation
         * @return  {void}
         */

        tween: function tween(operation, multiplier) {
            var target = null,
                posData = null,
                toHideIndex = -1,
                i = -1;

            multiplier = Math.min(multiplier, 1);
            multiplier = Math.max(multiplier, 0);

            for (i = 0; target = operation.show[i]; i++) {
                posData = operation.showPosData[i];

                target.applyTween(posData, multiplier);
            }

            for (i = 0; target = operation.hide[i]; i++) {
                if (target.isShown) {
                    target.hide();
                }

                if ((toHideIndex = operation.toHide.indexOf(target)) > -1) {
                    posData = operation.toHidePosData[toHideIndex];

                    if (!target.isShown) {
                        target.show();
                    }

                    target.applyTween(posData, multiplier);
                }
            }
        },

        /**
         * Inserts one or more new target elements into the container at a specified
         * index.
         *
         * To be indexed as targets, new elements must match the `selectors.target`
         * selector (`'.mix'` by default).
         *
         * @example
         *
         * .insert(newElements [, index] [, animate], [, callback])
         *
         * @example <caption>Example 1: Inserting a single element via reference</caption>
         *
         * console.log(mixer.getState().totalShow); // 0
         *
         * // Create a new element
         *
         * var newElement = document.createElement('div');
         * newElement.classList.add('mix');
         *
         * mixer.insert(newElement)
         *     .then(function(state) {
         *         console.log(state.totalShow === 1); // true
         *     });
         *
         * @example <caption>Example 2: Inserting a single element via HTML string</caption>
         *
         * console.log(mixer.getState().totalShow); // 1
         *
         * // Create a new element via reference
         *
         * var newElementHtml = '&lt;div class="mix"&gt;&lt;/div&gt;';
         *
         * // Create and insert the new element at index 1
         *
         * mixer.insert(newElementHtml, 1)
         *     .then(function(state) {
         *         console.log(state.totalShow === 2); // true
         *         console.log(state.show[1].outerHTML === newElementHtml); // true
         *     });
         *
         * @example <caption>Example 3: Inserting multiple elements via reference</caption>
         *
         * console.log(mixer.getState().totalShow); // 2
         *
         * // Create an array of new elements to insert.
         *
         * var newElement1 = document.createElement('div');
         * var newElement2 = document.createElement('div');
         *
         * newElement1.classList.add('mix');
         * newElement2.classList.add('mix');
         *
         * var newElementsCollection = [newElement1, newElement2];
         *
         * // Insert the new elements starting at index 1
         *
         * mixer.insert(newElementsCollection, 1)
         *     .then(function(state) {
         *         console.log(state.totalShow === 4); // true
         *         console.log(state.show[1] === newElement1); // true
         *         console.log(state.show[2] === newElement2); // true
         *     });
         *
         * @example <caption>Example 4: Inserting a jQuery collection object containing one or more elements</caption>
         *
         * console.log(mixer.getState().totalShow); // 4
         *
         * var $newElement = $('&lt;div class="mix"&gt;&lt;/div&gt;');
         *
         * // Insert the new elements starting at index 3
         *
         * mixer.insert(newElementsCollection, 3)
         *     .then(function(state) {
         *         console.log(state.totalShow === 5); // true
         *         console.log(state.show[3] === $newElement[0]); // true
         *     });
         *
         * @public
         * @instance
         * @since       2.0.0
         * @param       {(HTMLElement|Array.<HTMLElement>|string)}    newElements
         *      A reference to a single element to insert, an array-like collection of elements, or an HTML string representing a single element.
         * @param       {number}    index=0
         *      The index at which to insert the new element(s). `0` by default.
         * @param       {boolean}   [animate=true]
         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
         * @param       {function}  [callback=null]
         *      An optional callback function to be invoked after the operation has completed.
         * @return      {Promise.<mixitup.State>}
         *      A promise resolving with the current state object.
         */

        insert: function insert() {
            var self = this,
                args = self.parseInsertArgs(arguments);

            return self.multimix({
                insert: args.command
            }, args.animate, args.callback);
        },

        /**
         * Inserts one or more new elements before a provided reference element.
         *
         * @example
         *
         * .insertBefore(newElements, referenceElement [, animate] [, callback])
         *
         * @example <caption>Example: Inserting a new element before a reference element</caption>
         *
         * // An existing reference element is chosen at index 2
         *
         * var referenceElement = mixer.getState().show[2];
         *
         * // Create a new element
         *
         * var newElement = document.createElement('div');
         * newElement.classList.add('mix');
         *
         * mixer.insertBefore(newElement, referenceElement)
         *     .then(function(state) {
         *         // The new element is inserted into the container at index 2, before the reference element
         *
         *         console.log(state.show[2] === newElement); // true
         *
         *         // The reference element is now at index 3
         *
         *         console.log(state.show[3] === referenceElement); // true
         *     });
         *
         * @public
         * @instance
         * @since       3.0.0
         * @param       {(HTMLElement|Array.<HTMLElement>|string)}    newElements
         *      A reference to a single element to insert, an array-like collection of elements, or an HTML string representing a single element.
         * @param       {HTMLElement}    referenceElement
         *      A reference to an existing element in the container to insert new elements before.
         *@param       {boolean}   [animate=true]
         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
         * @param       {function}  [callback=null]
         *      An optional callback function to be invoked after the operation has completed.
         * @return      {Promise.<mixitup.State>}
         *      A promise resolving with the current state object.
         */

        insertBefore: function insertBefore() {
            var self = this,
                args = self.parseInsertArgs(arguments);

            return self.insert(args.command.collection, 'before', args.command.sibling, args.animate, args.callback);
        },

        /**
         * Inserts one or more new elements after a provided reference element.
         *
         * @example
         *
         * .insertAfter(newElements, referenceElement [, animate] [, callback])
         *
         * @example <caption>Example: Inserting a new element after a reference element</caption>
         *
         * // An existing reference element is chosen at index 2
         *
         * var referenceElement = mixer.getState().show[2];
         *
         * // Create a new element
         *
         * var newElement = document.createElement('div');
         * newElement.classList.add('mix');
         *
         * mixer.insertAfter(newElement, referenceElement)
         *     .then(function(state) {
         *         // The new element is inserted into the container at index 3, after the reference element
         *
         *         console.log(state.show[3] === newElement); // true
         *     });
         *
         * @public
         * @instance
         * @since       3.0.0
         * @param       {(HTMLElement|Array.<HTMLElement>|string)}    newElements
         *      A reference to a single element to insert, an array-like collection of elements, or an HTML string representing a single element.
         * @param       {HTMLElement}    referenceElement
         *      A reference to an existing element in the container to insert new elements after.
         * @param       {boolean}   [animate=true]
         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
         * @param       {function}  [callback=null]
         *      An optional callback function to be invoked after the operation has completed.
         * @return      {Promise.<mixitup.State>}
         *      A promise resolving with the current state object.
         */

        insertAfter: function insertAfter() {
            var self = this,
                args = self.parseInsertArgs(arguments);

            return self.insert(args.command.collection, 'after', args.command.sibling, args.animate, args.callback);
        },

        /**
         * Inserts one or more new elements into the container before all existing targets.
         *
         * @example
         *
         * .prepend(newElements [,animate] [,callback])
         *
         * @example <caption>Example: Prepending a new element</caption>
         *
         * // Create a new element
         *
         * var newElement = document.createElement('div');
         * newElement.classList.add('mix');
         *
         * // Insert the element into the container
         *
         * mixer.prepend(newElement)
         *     .then(function(state) {
         *         console.log(state.show[0] === newElement); // true
         *     });
         *
         * @public
         * @instance
         * @since       3.0.0
         * @param       {(HTMLElement|Array.<HTMLElement>|string)}    newElements
         *      A reference to a single element to insert, an array-like collection of elements, or an HTML string representing a single element.
         * @param       {boolean}   [animate=true]
         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
         * @param       {function}  [callback=null]
         *      An optional callback function to be invoked after the operation has completed.
         * @return      {Promise.<mixitup.State>}
         *      A promise resolving with the current state object.
         */

        prepend: function prepend() {
            var self = this,
                args = self.parseInsertArgs(arguments);

            return self.insert(0, args.command.collection, args.animate, args.callback);
        },

        /**
         * Inserts one or more new elements into the container after all existing targets.
         *
         * @example
         *
         * .append(newElements [,animate] [,callback])
         *
         * @example <caption>Example: Appending a new element</caption>
         *
         * // Create a new element
         *
         * var newElement = document.createElement('div');
         * newElement.classList.add('mix');
         *
         * // Insert the element into the container
         *
         * mixer.append(newElement)
         *     .then(function(state) {
         *         console.log(state.show[state.show.length - 1] === newElement); // true
         *     });
         *
         * @public
         * @instance
         * @since       3.0.0
         * @param       {(HTMLElement|Array.<HTMLElement>|string)}    newElements
         *      A reference to a single element to insert, an array-like collection of elements, or an HTML string representing a single element.
         * @param       {boolean}   [animate=true]
         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
         * @param       {function}  [callback=null]
         *      An optional callback function to be invoked after the operation has completed.
         * @return      {Promise.<mixitup.State>}
         *      A promise resolving with the current state object.
         */

        append: function append() {
            var self = this,
                args = self.parseInsertArgs(arguments);

            return self.insert(self.state.totalTargets, args.command.collection, args.animate, args.callback);
        },

        /**
         * Removes one or more existing target elements from the container.
         *
         * @example
         *
         * .remove(elements [, animate] [, callback])
         *
         * @example <caption>Example 1: Removing an element by reference</caption>
         *
         * var elementToRemove = containerEl.firstElementChild;
         *
         * mixer.remove(elementToRemove)
         *      .then(function(state) {
         *          console.log(state.targets.indexOf(elementToRemove) === -1); // true
         *      });
         *
         * @example <caption>Example 2: Removing a collection of elements by reference</caption>
         *
         * var elementsToRemove = containerEl.querySelectorAll('.category-a');
         *
         * console.log(elementsToRemove.length) // 3
         *
         * mixer.remove(elementsToRemove)
         *      .then(function() {
         *          console.log(containerEl.querySelectorAll('.category-a').length); // 0
         *      });
         *
         * @example <caption>Example 3: Removing one or more elements by selector</caption>
         *
         * mixer.remove('.category-a')
         *      .then(function() {
         *          console.log(containerEl.querySelectorAll('.category-a').length); // 0
         *      });
         *
         * @example <caption>Example 4: Removing an element by index</caption>
         *
         * console.log(mixer.getState.totalShow); // 4
         *
         * // Remove the element at index 3
         *
         * mixer.remove(3)
         *      .then(function(state) {
         *          console.log(state.totalShow); // 3
         *          console.log(state.show[3]); // undefined
         *      });
         *
         *
         * @public
         * @instance
         * @since       3.0.0
         * @param       {(HTMLElement|Array.<HTMLElement>|string|number)}    elements
         *      A reference to a single element to remove, an array-like collection of elements, a selector string, or the index of an element to remove.
         * @param       {boolean}   [animate=true]
         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
         * @param       {function}  [callback=null]
         *      An optional callback function to be invoked after the operation has completed.
         * @return      {Promise.<mixitup.State>}
         *      A promise resolving with the current state object.
         */

        remove: function remove() {
            var self = this,
                args = self.parseRemoveArgs(arguments);

            return self.multimix({
                remove: args.command
            }, args.animate, args.callback);
        },

        /**
         * Retrieves the the value of any property or sub-object within the current
         * mixitup configuration, or the whole configuration object.
         *
         * @example
         *
         * .getConfig([stringKey])
         *
         * @example <caption>Example 1: retrieve the entire configuration object</caption>
         *
         * var config = mixer.getConfig(); // Config { ... }
         *
         * @example <caption>Example 2: retrieve a named sub-object of configuration object</caption>
         *
         * var animation = mixer.getConfig('animation'); // ConfigAnimation { ... }
         *
         * @example <caption>Example 3: retrieve a value of configuration object via a dot-notation string key</caption>
         *
         * var effects = mixer.getConfig('animation.effects'); // 'fade scale'
         *
         * @public
         * @instance
         * @since       2.0.0
         * @param       {string}    [stringKey]    A "dot-notation" string key
         * @return      {*}
         */

        getConfig: function getConfig(stringKey) {
            var self = this,
                value = null;

            if (!stringKey) {
                value = self.config;
            } else {
                value = h.getProperty(self.config, stringKey);
            }

            return self.callFilters('valueGetConfig', value, arguments);
        },

        /**
         * Updates the configuration of the mixer, after it has been instantiated.
         *
         * See the Configuration Object documentation for a full list of avilable
         * configuration options.
         *
         * @example
         *
         * .configure(config)
         *
         * @example <caption>Example 1: Updating animation options</caption>
         *
         * mixer.configure({
         *     animation: {
         *         effects: 'fade translateX(-100%)',
         *         duration: 300
         *     }
         * });
         *
         * @example <caption>Example 2: Removing a callback after it has been set</caption>
         *
         * var mixer;
         *
         * function handleMixEndOnce() {
         *     // Do something ..
         *
         *     // Then nullify the callback
         *
         *     mixer.configure({
         *         callbacks: {
         *             onMixEnd: null
         *         }
         *     });
         * };
         *
         * // Instantiate a mixer with a callback defined
         *
         * mixer = mixitup(containerEl, {
         *     callbacks: {
         *         onMixEnd: handleMixEndOnce
         *     }
         * });
         *
         * @public
         * @instance
         * @since       3.0.0
         * @param       {object}    config
         *      An object containing one of more configuration options.
         * @return      {void}
         */

        configure: function configure(config) {
            var self = this;

            self.callActions('beforeConfigure', arguments);

            h.extend(self.config, config, true, true);

            self.callActions('afterConfigure', arguments);
        },

        /**
         * Returns an object containing information about the current state of the
         * mixer. See the State Object documentation for more information.
         *
         * NB: State objects are immutable and should therefore be regenerated
         * after any operation.
         *
         * @example
         *
         * .getState();
         *
         * @example <caption>Example: Retrieving a state object</caption>
         *
         * var state = mixer.getState();
         *
         * console.log(state.totalShow + 'targets are currently shown');
         *
         * @public
         * @instance
         * @since       2.0.0
         * @return      {mixitup.State} An object reflecting the current state of the mixer.
         */

        getState: function getState() {
            var self = this,
                state = null;

            state = new _mixitup.State();

            h.extend(state, self.state);

            h.freeze(state);

            return self.callFilters('stateGetState', state, arguments);
        },

        /**
         * Forces the re-indexing all targets within the container.
         *
         * This should only be used if some other piece of code in your application
         * has manipulated the contents of your container, which should be avoided.
         *
         * If you need to add or remove target elements from the container, use
         * the built-in `.insert()` or `.remove()` methods, and MixItUp will keep
         * itself up to date.
         *
         * @example
         *
         * .forceRefresh()
         *
         * @example <caption>Example: Force refreshing the mixer after external DOM manipulation</caption>
         *
         * console.log(mixer.getState().totalShow); // 3
         *
         * // An element is removed from the container via some external DOM manipulation code:
         *
         * containerEl.removeChild(containerEl.firstElementChild);
         *
         * // The mixer does not know that the number of targets has changed:
         *
         * console.log(mixer.getState().totalShow); // 3
         *
         * mixer.forceRefresh();
         *
         * // After forceRefresh, the mixer is in sync again:
         *
         * console.log(mixer.getState().totalShow); // 2
         *
         * @public
         * @instance
         * @since 2.1.2
         * @return {void}
         */

        forceRefresh: function forceRefresh() {
            var self = this;

            self.indexTargets();
        },

        /**
         * Forces the re-rendering of all targets when using the Dataset API.
         *
         * By default, targets are only re-rendered when `data.dirtyCheck` is
         * enabled, and an item's data has changed when `dataset()` is called.
         *
         * The `forceRender()` method allows for the re-rendering of all targets
         * in response to some arbitrary event, such as the changing of the target
         * render function.
         *
         * Targets are rendered against their existing data.
         *
         * @example
         *
         * .forceRender()
         *
         * @example <caption>Example: Force render targets after changing the target render function</caption>
         *
         * console.log(container.innerHTML); // ... &lt;span class="mix"&gt;Foo&lt;/span&gt; ...
         *
         * mixer.configure({
         *     render: {
         *         target: (item) => `&lt;a href="/${item.slug}/" class="mix"&gt;${item.title}&lt;/a&gt;`
         *     }
         * });
         *
         * mixer.forceRender();
         *
         * console.log(container.innerHTML); // ... &lt;a href="/foo/" class="mix"&gt;Foo&lt;/a&gt; ...
         *
         * @public
         * @instance
         * @since 3.2.1
         * @return {void}
         */

        forceRender: function forceRender() {
            var self = this,
                target = null,
                el = null,
                id = '';

            for (id in self.cache) {
                target = self.cache[id];

                el = target.render(target.data);

                if (el !== target.dom.el) {
                    // Update target element reference

                    if (target.isInDom) {
                        target.unbindEvents();

                        self.dom.parent.replaceChild(el, target.dom.el);
                    }

                    if (!target.isShown) {
                        el.style.display = 'none';
                    }

                    target.dom.el = el;

                    if (target.isInDom) {
                        target.bindEvents();
                    }
                }
            }

            self.state = self.buildState(self.lastOperation);
        },

        /**
         * Removes mixitup functionality from the container, unbinds all control
         * event handlers, and deletes the mixer instance from MixItUp's internal
         * cache.
         *
         * This should be performed whenever a mixer's container is removed from
         * the DOM, such as during a page change in a single page application,
         * or React's `componentWillUnmount()`.
         *
         * @example
         *
         * .destroy([cleanUp])
         *
         * @example <caption>Example: Destroying the mixer before removing its container element</caption>
         *
         * mixer.destroy();
         *
         * containerEl.parentElement.removeChild(containerEl);
         *
         * @public
         * @instance
         * @since   2.0.0
         * @param   {boolean}   [cleanUp=false]
         *     An optional boolean dictating whether or not to clean up any inline `display: none;` styling applied to hidden targets.
         * @return  {void}
         */

        destroy: function destroy(cleanUp) {
            var self = this,
                control = null,
                target = null,
                i = 0;

            self.callActions('beforeDestroy', arguments);

            for (i = 0; control = self.controls[i]; i++) {
                control.removeBinding(self);
            }

            for (i = 0; target = self.targets[i]; i++) {
                if (cleanUp) {
                    target.show();
                }

                target.unbindEvents();
            }

            if (self.dom.container.id.match(/^MixItUp/)) {
                self.dom.container.removeAttribute('id');
            }

            delete _mixitup.instances[self.id];

            self.callActions('afterDestroy', arguments);
        }
    });

    /**
     * @constructor
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.IMoveData = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        this.posIn = null;
        this.posOut = null;
        this.operation = null;
        this.callback = null;
        this.statusChange = '';
        this.duration = -1;
        this.staggerIndex = -1;

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.IMoveData);

    _mixitup.IMoveData.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.IMoveData.prototype.constructor = _mixitup.IMoveData;

    /**
     * @constructor
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.TargetDom = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        this.el = null;

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.TargetDom);

    _mixitup.TargetDom.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.TargetDom.prototype.constructor = _mixitup.TargetDom;

    /**
     * @constructor
     * @namespace
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.Target = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        this.id = '';
        this.sortString = '';
        this.mixer = null;
        this.callback = null;
        this.isShown = false;
        this.isBound = false;
        this.isExcluded = false;
        this.isInDom = false;
        this.handler = null;
        this.operation = null;
        this.data = null;
        this.dom = new _mixitup.TargetDom();

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.Target);

    _mixitup.Target.prototype = Object.create(_mixitup.Base.prototype);

    h.extend(_mixitup.Target.prototype, {
        constructor: _mixitup.Target,

        /**
         * Initialises a newly instantiated Target.
         *
         * @private
         * @instance
         * @since   3.0.0
         * @param   {(Element|null)}    el
         * @param   {object}            mixer
         * @param   {object}            [data]
         * @return  {void}
         */

        init: function init(el, mixer, data) {
            var self = this,
                id = '';

            self.callActions('beforeInit', arguments);

            self.mixer = mixer;

            if (!el) {
                // If no element is provided, render it

                el = self.render(data);
            }

            self.cacheDom(el);

            self.bindEvents();

            if (self.dom.el.style.display !== 'none') {
                self.isShown = true;
            }

            if (data && mixer.config.data.uidKey) {
                if (typeof (id = data[mixer.config.data.uidKey]) === 'undefined' || id.toString().length < 1) {
                    throw new TypeError(_mixitup.messages.errorDatasetInvalidUidKey({
                        uidKey: mixer.config.data.uidKey
                    }));
                }

                self.id = id;
                self.data = data;

                mixer.cache[id] = self;
            }

            self.callActions('afterInit', arguments);
        },

        /**
         * Renders the target element using a user-defined renderer function.
         *
         * @private
         * @instance
         * @since   3.1.4
         * @param   {object} data
         * @return  {void}
         */

        render: function render(data) {
            var self = this,
                render = null,
                el = null,
                temp = null,
                output = '';

            self.callActions('beforeRender', arguments);

            render = self.callFilters('renderRender', self.mixer.config.render.target, arguments);

            if (typeof render !== 'function') {
                throw new TypeError(_mixitup.messages.errorDatasetRendererNotSet());
            }

            output = render(data);

            if (output && (typeof output === 'undefined' ? 'undefined' : _typeof(output)) === 'object' && h.isElement(output)) {
                el = output;
            } else if (typeof output === 'string') {
                temp = document.createElement('div');
                temp.innerHTML = output;

                el = temp.firstElementChild;
            }

            return self.callFilters('elRender', el, arguments);
        },

        /**
         * Caches references of DOM elements neccessary for the target's functionality.
         *
         * @private
         * @instance
         * @since   3.0.0
         * @param   {Element} el
         * @return  {void}
         */

        cacheDom: function cacheDom(el) {
            var self = this;

            self.callActions('beforeCacheDom', arguments);

            self.dom.el = el;

            self.callActions('afterCacheDom', arguments);
        },

        /**
         * @private
         * @instance
         * @since   3.0.0
         * @param   {string}    attributeName
         * @return  {void}
         */

        getSortString: function getSortString(attributeName) {
            var self = this,
                value = self.dom.el.getAttribute('data-' + attributeName) || '';

            self.callActions('beforeGetSortString', arguments);

            value = isNaN(value * 1) ? value.toLowerCase() : value * 1;

            self.sortString = value;

            self.callActions('afterGetSortString', arguments);
        },

        /**
         * @private
         * @instance
         * @since   3.0.0
         * @return  {void}
         */

        show: function show() {
            var self = this;

            self.callActions('beforeShow', arguments);

            if (!self.isShown) {
                self.dom.el.style.display = '';

                self.isShown = true;
            }

            self.callActions('afterShow', arguments);
        },

        /**
         * @private
         * @instance
         * @since   3.0.0
         * @return  {void}
         */

        hide: function hide() {
            var self = this;

            self.callActions('beforeHide', arguments);

            if (self.isShown) {
                self.dom.el.style.display = 'none';

                self.isShown = false;
            }

            self.callActions('afterHide', arguments);
        },

        /**
         * @private
         * @instance
         * @since   3.0.0
         * @param   {mixitup.IMoveData} moveData
         * @return  {void}
         */

        move: function move(moveData) {
            var self = this;

            self.callActions('beforeMove', arguments);

            if (!self.isExcluded) {
                self.mixer.targetsMoved++;
            }

            self.applyStylesIn(moveData);

            requestAnimationFrame(function () {
                self.applyStylesOut(moveData);
            });

            self.callActions('afterMove', arguments);
        },

        /**
         * @private
         * @instance
         * @since   3.0.0
         * @param   {object}    posData
         * @param   {number}    multiplier
         * @return  {void}
         */

        applyTween: function applyTween(posData, multiplier) {
            var self = this,
                propertyName = '',
                tweenData = null,
                posIn = posData.posIn,
                currentTransformValues = [],
                currentValues = new _mixitup.StyleData(),
                i = -1;

            self.callActions('beforeApplyTween', arguments);

            currentValues.x = posIn.x;
            currentValues.y = posIn.y;

            if (multiplier === 0) {
                self.hide();
            } else if (!self.isShown) {
                self.show();
            }

            for (i = 0; propertyName = _mixitup.features.TWEENABLE[i]; i++) {
                tweenData = posData.tweenData[propertyName];

                if (propertyName === 'x') {
                    if (!tweenData) continue;

                    currentValues.x = posIn.x + tweenData * multiplier;
                } else if (propertyName === 'y') {
                    if (!tweenData) continue;

                    currentValues.y = posIn.y + tweenData * multiplier;
                } else if (tweenData instanceof _mixitup.TransformData) {
                    if (!tweenData.value) continue;

                    currentValues[propertyName].value = posIn[propertyName].value + tweenData.value * multiplier;

                    currentValues[propertyName].unit = tweenData.unit;

                    currentTransformValues.push(propertyName + '(' + currentValues[propertyName].value + tweenData.unit + ')');
                } else {
                    if (!tweenData) continue;

                    currentValues[propertyName] = posIn[propertyName] + tweenData * multiplier;

                    self.dom.el.style[propertyName] = currentValues[propertyName];
                }
            }

            if (currentValues.x || currentValues.y) {
                currentTransformValues.unshift('translate(' + currentValues.x + 'px, ' + currentValues.y + 'px)');
            }

            if (currentTransformValues.length) {
                self.dom.el.style[_mixitup.features.transformProp] = currentTransformValues.join(' ');
            }

            self.callActions('afterApplyTween', arguments);
        },

        /**
         * Applies the initial styling to a target element before any transition
         * is applied.
         *
         * @private
         * @instance
         * @param   {mixitup.IMoveData} moveData
         * @return  {void}
         */

        applyStylesIn: function applyStylesIn(moveData) {
            var self = this,
                posIn = moveData.posIn,
                isFading = self.mixer.effectsIn.opacity !== 1,
                transformValues = [];

            self.callActions('beforeApplyStylesIn', arguments);

            transformValues.push('translate(' + posIn.x + 'px, ' + posIn.y + 'px)');

            if (self.mixer.config.animation.animateResizeTargets) {
                if (moveData.statusChange !== 'show') {
                    // Don't apply posIn width or height or showing, as will be 0

                    self.dom.el.style.width = posIn.width + 'px';
                    self.dom.el.style.height = posIn.height + 'px';
                }

                self.dom.el.style.marginRight = posIn.marginRight + 'px';
                self.dom.el.style.marginBottom = posIn.marginBottom + 'px';
            }

            isFading && (self.dom.el.style.opacity = posIn.opacity);

            if (moveData.statusChange === 'show') {
                transformValues = transformValues.concat(self.mixer.transformIn);
            }

            self.dom.el.style[_mixitup.features.transformProp] = transformValues.join(' ');

            self.callActions('afterApplyStylesIn', arguments);
        },

        /**
         * Applies a transition followed by the final styles for the element to
         * transition towards.
         *
         * @private
         * @instance
         * @param   {mixitup.IMoveData} moveData
         * @return  {void}
         */

        applyStylesOut: function applyStylesOut(moveData) {
            var self = this,
                transitionRules = [],
                transformValues = [],
                isResizing = self.mixer.config.animation.animateResizeTargets,
                isFading = typeof self.mixer.effectsIn.opacity !== 'undefined';

            self.callActions('beforeApplyStylesOut', arguments);

            // Build the transition rules

            transitionRules.push(self.writeTransitionRule(_mixitup.features.transformRule, moveData.staggerIndex));

            if (moveData.statusChange !== 'none') {
                transitionRules.push(self.writeTransitionRule('opacity', moveData.staggerIndex, moveData.duration));
            }

            if (isResizing) {
                transitionRules.push(self.writeTransitionRule('width', moveData.staggerIndex, moveData.duration));

                transitionRules.push(self.writeTransitionRule('height', moveData.staggerIndex, moveData.duration));

                transitionRules.push(self.writeTransitionRule('margin', moveData.staggerIndex, moveData.duration));
            }

            // If no callback was provided, the element will
            // not transition in any way so tag it as "immovable"

            if (!moveData.callback) {
                self.mixer.targetsImmovable++;

                if (self.mixer.targetsMoved === self.mixer.targetsImmovable) {
                    // If the total targets moved is equal to the
                    // number of immovable targets, the operation
                    // should be considered finished

                    self.mixer.cleanUp(moveData.operation);
                }

                return;
            }

            // If the target will transition in some fasion,
            // assign a callback function

            self.operation = moveData.operation;
            self.callback = moveData.callback;

            // As long as the target is not excluded, increment
            // the total number of targets bound

            !self.isExcluded && self.mixer.targetsBound++;

            // Tag the target as bound to differentiate from transitionEnd
            // events that may come from stylesheet driven effects

            self.isBound = true;

            // Apply the transition

            self.applyTransition(transitionRules);

            // Apply width, height and margin negation

            if (isResizing && moveData.posOut.width > 0 && moveData.posOut.height > 0) {
                self.dom.el.style.width = moveData.posOut.width + 'px';
                self.dom.el.style.height = moveData.posOut.height + 'px';
                self.dom.el.style.marginRight = moveData.posOut.marginRight + 'px';
                self.dom.el.style.marginBottom = moveData.posOut.marginBottom + 'px';
            }

            if (!self.mixer.config.animation.nudge && moveData.statusChange === 'hide') {
                // If we're not nudging, the translation should be
                // applied before any other transforms to prevent
                // lateral movement

                transformValues.push('translate(' + moveData.posOut.x + 'px, ' + moveData.posOut.y + 'px)');
            }

            // Apply fade

            switch (moveData.statusChange) {
                case 'hide':
                    isFading && (self.dom.el.style.opacity = self.mixer.effectsOut.opacity);

                    transformValues = transformValues.concat(self.mixer.transformOut);

                    break;
                case 'show':
                    isFading && (self.dom.el.style.opacity = 1);
            }

            if (self.mixer.config.animation.nudge || !self.mixer.config.animation.nudge && moveData.statusChange !== 'hide') {
                // Opposite of above - apply translate after
                // other transform

                transformValues.push('translate(' + moveData.posOut.x + 'px, ' + moveData.posOut.y + 'px)');
            }

            // Apply transforms

            self.dom.el.style[_mixitup.features.transformProp] = transformValues.join(' ');

            self.callActions('afterApplyStylesOut', arguments);
        },

        /**
         * Combines the name of a CSS property with the appropriate duration and delay
         * values to created a valid transition rule.
         *
         * @private
         * @instance
         * @since   3.0.0
         * @param   {string}    property
         * @param   {number}    staggerIndex
         * @param   {number}    duration
         * @return  {string}
         */

        writeTransitionRule: function writeTransitionRule(property, staggerIndex, duration) {
            var self = this,
                delay = self.getDelay(staggerIndex),
                rule = '';

            rule = property + ' ' + (duration > 0 ? duration : self.mixer.config.animation.duration) + 'ms ' + delay + 'ms ' + (property === 'opacity' ? 'linear' : self.mixer.config.animation.easing);

            return self.callFilters('ruleWriteTransitionRule', rule, arguments);
        },

        /**
         * Calculates the transition delay for each target element based on its index, if
         * staggering is applied. If defined, A custom `animation.staggerSeqeuence`
         * function can be used to manipulate the order of indices to produce custom
         * stagger effects (e.g. for use in a grid with irregular row lengths).
         *
         * @private
         * @instance
         * @since   2.0.0
         * @param   {number}    index
         * @return  {number}
         */

        getDelay: function getDelay(index) {
            var self = this,
                delay = -1;

            if (typeof self.mixer.config.animation.staggerSequence === 'function') {
                index = self.mixer.config.animation.staggerSequence.call(self, index, self.state);
            }

            delay = !!self.mixer.staggerDuration ? index * self.mixer.staggerDuration : 0;

            return self.callFilters('delayGetDelay', delay, arguments);
        },

        /**
         * @private
         * @instance
         * @since   3.0.0
         * @param   {string[]}  rules
         * @return  {void}
         */

        applyTransition: function applyTransition(rules) {
            var self = this,
                transitionString = rules.join(', ');

            self.callActions('beforeApplyTransition', arguments);

            self.dom.el.style[_mixitup.features.transitionProp] = transitionString;

            self.callActions('afterApplyTransition', arguments);
        },

        /**
         * @private
         * @instance
         * @since   3.0.0
         * @param   {Event} e
         * @return  {void}
         */

        handleTransitionEnd: function handleTransitionEnd(e) {
            var self = this,
                propName = e.propertyName,
                canResize = self.mixer.config.animation.animateResizeTargets;

            self.callActions('beforeHandleTransitionEnd', arguments);

            if (self.isBound && e.target.matches(self.mixer.config.selectors.target) && (propName.indexOf('transform') > -1 || propName.indexOf('opacity') > -1 || canResize && propName.indexOf('height') > -1 || canResize && propName.indexOf('width') > -1 || canResize && propName.indexOf('margin') > -1)) {
                self.callback.call(self, self.operation);

                self.isBound = false;
                self.callback = null;
                self.operation = null;
            }

            self.callActions('afterHandleTransitionEnd', arguments);
        },

        /**
         * @private
         * @instance
         * @since   3.0.0
         * @param   {Event}     e
         * @return  {void}
         */

        eventBus: function eventBus(e) {
            var self = this;

            self.callActions('beforeEventBus', arguments);

            switch (e.type) {
                case 'webkitTransitionEnd':
                case 'transitionend':
                    self.handleTransitionEnd(e);
            }

            self.callActions('afterEventBus', arguments);
        },

        /**
         * @private
         * @instance
         * @since   3.0.0
         * @return  {void}
         */

        unbindEvents: function unbindEvents() {
            var self = this;

            self.callActions('beforeUnbindEvents', arguments);

            h.off(self.dom.el, 'webkitTransitionEnd', self.handler);
            h.off(self.dom.el, 'transitionend', self.handler);

            self.callActions('afterUnbindEvents', arguments);
        },

        /**
         * @private
         * @instance
         * @since   3.0.0
         * @return  {void}
         */

        bindEvents: function bindEvents() {
            var self = this,
                transitionEndEvent = '';

            self.callActions('beforeBindEvents', arguments);

            transitionEndEvent = _mixitup.features.transitionPrefix === 'webkit' ? 'webkitTransitionEnd' : 'transitionend';

            self.handler = function (e) {
                return self.eventBus(e);
            };

            h.on(self.dom.el, transitionEndEvent, self.handler);

            self.callActions('afterBindEvents', arguments);
        },

        /**
         * @private
         * @instance
         * @since   3.0.0
         * @param   {boolean}   [getBox]
         * @return  {PosData}
         */

        getPosData: function getPosData(getBox) {
            var self = this,
                styles = {},
                rect = null,
                posData = new _mixitup.StyleData();

            self.callActions('beforeGetPosData', arguments);

            posData.x = self.dom.el.offsetLeft;
            posData.y = self.dom.el.offsetTop;

            if (self.mixer.config.animation.animateResizeTargets || getBox) {
                rect = self.dom.el.getBoundingClientRect();

                posData.top = rect.top;
                posData.right = rect.right;
                posData.bottom = rect.bottom;
                posData.left = rect.left;

                posData.width = rect.width;
                posData.height = rect.height;
            }

            if (self.mixer.config.animation.animateResizeTargets) {
                styles = window.getComputedStyle(self.dom.el);

                posData.marginBottom = parseFloat(styles.marginBottom);
                posData.marginRight = parseFloat(styles.marginRight);
            }

            return self.callFilters('posDataGetPosData', posData, arguments);
        },

        /**
         * @private
         * @instance
         * @since       3.0.0
         * @return      {void}
         */

        cleanUp: function cleanUp() {
            var self = this;

            self.callActions('beforeCleanUp', arguments);

            self.dom.el.style[_mixitup.features.transformProp] = '';
            self.dom.el.style[_mixitup.features.transitionProp] = '';
            self.dom.el.style.opacity = '';

            if (self.mixer.config.animation.animateResizeTargets) {
                self.dom.el.style.width = '';
                self.dom.el.style.height = '';
                self.dom.el.style.marginRight = '';
                self.dom.el.style.marginBottom = '';
            }

            self.callActions('afterCleanUp', arguments);
        }
    });

    /**
     * A jQuery-collection-like wrapper around one or more `mixitup.Mixer` instances
     * allowing simultaneous control of said instances similar to the MixItUp 2 API.
     *
     * @example
     * new mixitup.Collection(instances)
     *
     * @constructor
     * @namespace
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     * @param       {mixitup.Mixer[]}   instances
     */

    _mixitup.Collection = function (instances) {
        var instance = null,
            i = -1;

        this.callActions('beforeConstruct');

        for (i = 0; instance = instances[i]; i++) {
            this[i] = instance;
        }

        this.length = instances.length;

        this.callActions('afterConstruct');

        h.freeze(this);
    };

    _mixitup.BaseStatic.call(_mixitup.Collection);

    _mixitup.Collection.prototype = Object.create(_mixitup.Base.prototype);

    h.extend(_mixitup.Collection.prototype,
    /** @lends mixitup.Collection */
    {
        constructor: _mixitup.Collection,

        /**
         * Calls a method on all instances in the collection by passing the method
         * name as a string followed by any applicable parameters to be curried into
         * to the method.
         *
         * @example
         * .mixitup(methodName[,arg1][,arg2..]);
         *
         * @example
         * var collection = new Collection([mixer1, mixer2]);
         *
         * return collection.mixitup('filter', '.category-a')
         *     .then(function(states) {
         *         state.forEach(function(state) {
         *             console.log(state.activeFilter.selector); // .category-a
         *         });
         *     });
         *
         * @public
         * @instance
         * @since       3.0.0
         * @param       {string}  methodName
         * @return      {Promise<Array<mixitup.State>>}
         */

        mixitup: function mixitup(methodName) {
            var self = this,
                instance = null,
                args = Array.prototype.slice.call(arguments),
                tasks = [],
                i = -1;

            this.callActions('beforeMixitup');

            args.shift();

            for (i = 0; instance = self[i]; i++) {
                tasks.push(instance[methodName].apply(instance, args));
            }

            return self.callFilters('promiseMixitup', h.all(tasks, _mixitup.libraries), arguments);
        }
    });

    /**
     * `mixitup.Operation` objects contain all data neccessary to describe the full
     * lifecycle of any MixItUp operation. They can be used to compute and store an
     * operation for use at a later time (e.g. programmatic tweening).
     *
     * @constructor
     * @namespace
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.Operation = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        this.id = '';

        this.args = [];
        this.command = null;
        this.showPosData = [];
        this.toHidePosData = [];

        this.startState = null;
        this.newState = null;
        this.docState = null;

        this.willSort = false;
        this.willChangeLayout = false;
        this.hasEffect = false;
        this.hasFailed = false;

        this.triggerElement = null;

        this.show = [];
        this.hide = [];
        this.matching = [];
        this.toShow = [];
        this.toHide = [];
        this.toMove = [];
        this.toRemove = [];
        this.startOrder = [];
        this.newOrder = [];
        this.startSort = null;
        this.newSort = null;
        this.startFilter = null;
        this.newFilter = null;
        this.startDataset = null;
        this.newDataset = null;
        this.viewportDeltaX = 0;
        this.viewportDeltaY = 0;
        this.startX = 0;
        this.startY = 0;
        this.startHeight = 0;
        this.startWidth = 0;
        this.newX = 0;
        this.newY = 0;
        this.newHeight = 0;
        this.newWidth = 0;
        this.startContainerClassName = '';
        this.startDisplay = '';
        this.newContainerClassName = '';
        this.newDisplay = '';

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.Operation);

    _mixitup.Operation.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.Operation.prototype.constructor = _mixitup.Operation;

    /**
     * `mixitup.State` objects expose various pieces of data detailing the state of
     * a MixItUp instance. They are provided at the start and end of any operation via
     * callbacks and events, with the most recent state stored between operations
     * for retrieval at any time via the API.
     *
     * @constructor
     * @namespace
     * @memberof    mixitup
     * @public
     * @since       3.0.0
     */

    _mixitup.State = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        /**
         * The ID of the mixer instance.
         *
         * @name        id
         * @memberof    mixitup.State
         * @instance
         * @type        {string}
         * @default     ''
         */

        this.id = '';

        /**
         * The currently active filter command as set by a control click or API call.
         *
         * @name        activeFilter
         * @memberof    mixitup.State
         * @instance
         * @type        {mixitup.CommandFilter}
         * @default     null
         */

        this.activeFilter = null;

        /**
         * The currently active sort command as set by a control click or API call.
         *
         * @name        activeSort
         * @memberof    mixitup.State
         * @instance
         * @type        {mixitup.CommandSort}
         * @default     null
         */

        this.activeSort = null;

        /**
         * The current layout-specific container class name, if applied.
         *
         * @name        activeContainerClassName
         * @memberof    mixitup.State
         * @instance
         * @type        {string}
         * @default     ''
         */

        this.activeContainerClassName = '';

        /**
         * A reference to the container element that the mixer is instantiated on.
         *
         * @name        container
         * @memberof    mixitup.State
         * @instance
         * @type        {Element}
         * @default     null
         */

        this.container = null;

        /**
         * An array of all target elements indexed by the mixer.
         *
         * @name        targets
         * @memberof    mixitup.State
         * @instance
         * @type        {Array.<Element>}
         * @default     []
         */

        this.targets = [];

        /**
         * An array of all target elements not matching the current filter.
         *
         * @name        hide
         * @memberof    mixitup.State
         * @instance
         * @type        {Array.<Element>}
         * @default     []
         */

        this.hide = [];

        /**
         * An array of all target elements matching the current filter and any additional
         * limits applied such as pagination.
         *
         * @name        show
         * @memberof    mixitup.State
         * @instance
         * @type        {Array.<Element>}
         * @default     []
         */

        this.show = [];

        /**
         * An array of all target elements matching the current filter irrespective of
         * any additional limits applied such as pagination.
         *
         * @name        matching
         * @memberof    mixitup.State
         * @instance
         * @type        {Array.<Element>}
         * @default     []
         */

        this.matching = [];

        /**
         * An integer representing the total number of target elements indexed by the
         * mixer. Equivalent to `state.targets.length`.
         *
         * @name        totalTargets
         * @memberof    mixitup.State
         * @instance
         * @type        {number}
         * @default     -1
         */

        this.totalTargets = -1;

        /**
         * An integer representing the total number of target elements matching the
         * current filter and any additional limits applied such as pagination.
         * Equivalent to `state.show.length`.
         *
         * @name        totalShow
         * @memberof    mixitup.State
         * @instance
         * @type        {number}
         * @default     -1
         */

        this.totalShow = -1;

        /**
         * An integer representing the total number of target elements not matching
         * the current filter. Equivalent to `state.hide.length`.
         *
         * @name        totalHide
         * @memberof    mixitup.State
         * @instance
         * @type        {number}
         * @default     -1
         */

        this.totalHide = -1;

        /**
         * An integer representing the total number of target elements matching the
         * current filter irrespective of any other limits applied such as pagination.
         * Equivalent to `state.matching.length`.
         *
         * @name        totalMatching
         * @memberof    mixitup.State
         * @instance
         * @type        {number}
         * @default     -1
         */

        this.totalMatching = -1;

        /**
         * A boolean indicating whether the last operation "failed", i.e. no targets
         * could be found matching the filter.
         *
         * @name        hasFailed
         * @memberof    mixitup.State
         * @instance
         * @type        {boolean}
         * @default     false
         */

        this.hasFailed = false;

        /**
         * The DOM element that was clicked if the last operation was triggered by the
         * clicking of a control and not an API call.
         *
         * @name        triggerElement
         * @memberof    mixitup.State
         * @instance
         * @type        {Element|null}
         * @default     null
         */

        this.triggerElement = null;

        /**
         * The currently active dataset underlying the rendered targets, if the
         * dataset API is in use.
         *
         * @name        activeDataset
         * @memberof    mixitup.State
         * @instance
         * @type        {Array.<object>}
         * @default     null
         */

        this.activeDataset = null;

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.State);

    _mixitup.State.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.State.prototype.constructor = _mixitup.State;

    /**
     * @constructor
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.UserInstruction = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        this.command = {};
        this.animate = false;
        this.callback = null;

        this.callActions('afterConstruct');

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.UserInstruction);

    _mixitup.UserInstruction.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.UserInstruction.prototype.constructor = _mixitup.UserInstruction;

    /**
     * @constructor
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     */

    _mixitup.Messages = function () {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct');

        /* Errors
        ----------------------------------------------------------------------------- */

        this.ERROR_FACTORY_INVALID_CONTAINER = '[MixItUp] An invalid selector or element reference was passed to the mixitup factory function';

        this.ERROR_FACTORY_CONTAINER_NOT_FOUND = '[MixItUp] The provided selector yielded no container element';

        this.ERROR_CONFIG_INVALID_ANIMATION_EFFECTS = '[MixItUp] Invalid value for `animation.effects`';

        this.ERROR_CONFIG_INVALID_CONTROLS_SCOPE = '[MixItUp] Invalid value for `controls.scope`';

        this.ERROR_CONFIG_INVALID_PROPERTY = '[MixitUp] Invalid configuration object property "${erroneous}"${suggestion}';

        this.ERROR_CONFIG_INVALID_PROPERTY_SUGGESTION = '. Did you mean "${probableMatch}"?';

        this.ERROR_CONFIG_DATA_UID_KEY_NOT_SET = '[MixItUp] To use the dataset API, a UID key must be specified using `data.uidKey`';

        this.ERROR_DATASET_INVALID_UID_KEY = '[MixItUp] The specified UID key "${uidKey}" is not present on one or more dataset items';

        this.ERROR_DATASET_DUPLICATE_UID = '[MixItUp] The UID "${uid}" was found on two or more dataset items. UIDs must be unique.';

        this.ERROR_INSERT_INVALID_ARGUMENTS = '[MixItUp] Please provider either an index or a sibling and position to insert, not both';

        this.ERROR_INSERT_PREEXISTING_ELEMENT = '[MixItUp] An element to be inserted already exists in the container';

        this.ERROR_FILTER_INVALID_ARGUMENTS = '[MixItUp] Please provide either a selector or collection `.filter()`, not both';

        this.ERROR_DATASET_NOT_SET = '[MixItUp] To use the dataset API with pre-rendered targets, a starting dataset must be set using `load.dataset`';

        this.ERROR_DATASET_PRERENDERED_MISMATCH = '[MixItUp] `load.dataset` does not match pre-rendered targets';

        this.ERROR_DATASET_RENDERER_NOT_SET = '[MixItUp] To insert an element via the dataset API, a target renderer function must be provided to `render.target`';

        /* Warnings
        ----------------------------------------------------------------------------- */

        this.WARNING_FACTORY_PREEXISTING_INSTANCE = '[MixItUp] WARNING: This element already has an active MixItUp instance. The provided configuration object will be ignored.' + ' If you wish to perform additional methods on this instance, please create a reference.';

        this.WARNING_INSERT_NO_ELEMENTS = '[MixItUp] WARNING: No valid elements were passed to `.insert()`';

        this.WARNING_REMOVE_NO_ELEMENTS = '[MixItUp] WARNING: No valid elements were passed to `.remove()`';

        this.WARNING_MULTIMIX_INSTANCE_QUEUE_FULL = '[MixItUp] WARNING: An operation was requested but the MixItUp instance was busy. The operation was rejected because the ' + 'queue is full or queuing is disabled.';

        this.WARNING_GET_OPERATION_INSTANCE_BUSY = '[MixItUp] WARNING: Operations can be be created while the MixItUp instance is busy.';

        this.WARNING_NO_PROMISE_IMPLEMENTATION = '[MixItUp] WARNING: No Promise implementations could be found. If you wish to use promises with MixItUp please install' + ' an ES6 Promise polyfill.';

        this.WARNING_INCONSISTENT_SORTING_ATTRIBUTES = '[MixItUp] WARNING: The requested sorting data attribute "${attribute}" was not present on one or more target elements' + ' which may product unexpected sort output';

        this.callActions('afterConstruct');

        this.compileTemplates();

        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.Messages);

    _mixitup.Messages.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.Messages.prototype.constructor = _mixitup.Messages;

    /**
     * @return {void}
     */

    _mixitup.Messages.prototype.compileTemplates = function () {
        var errorKey = '';
        var errorMessage = '';

        for (errorKey in this) {
            if (typeof (errorMessage = this[errorKey]) !== 'string') continue;

            this[h.camelCase(errorKey)] = h.template(errorMessage);
        }
    };

    _mixitup.messages = new _mixitup.Messages();

    /**
     * @constructor
     * @memberof    mixitup
     * @private
     * @since       3.0.0
     * @param       {mixitup.Mixer} mixer
     */

    _mixitup.Facade = function Mixer(mixer) {
        _mixitup.Base.call(this);

        this.callActions('beforeConstruct', arguments);

        this.configure = mixer.configure.bind(mixer);
        this.show = mixer.show.bind(mixer);
        this.hide = mixer.hide.bind(mixer);
        this.filter = mixer.filter.bind(mixer);
        this.toggleOn = mixer.toggleOn.bind(mixer);
        this.toggleOff = mixer.toggleOff.bind(mixer);
        this.sort = mixer.sort.bind(mixer);
        this.changeLayout = mixer.changeLayout.bind(mixer);
        this.multimix = mixer.multimix.bind(mixer);
        this.dataset = mixer.dataset.bind(mixer);
        this.tween = mixer.tween.bind(mixer);
        this.insert = mixer.insert.bind(mixer);
        this.insertBefore = mixer.insertBefore.bind(mixer);
        this.insertAfter = mixer.insertAfter.bind(mixer);
        this.prepend = mixer.prepend.bind(mixer);
        this.append = mixer.append.bind(mixer);
        this.remove = mixer.remove.bind(mixer);
        this.destroy = mixer.destroy.bind(mixer);
        this.forceRefresh = mixer.forceRefresh.bind(mixer);
        this.forceRender = mixer.forceRender.bind(mixer);
        this.isMixing = mixer.isMixing.bind(mixer);
        this.getOperation = mixer.getOperation.bind(mixer);
        this.getConfig = mixer.getConfig.bind(mixer);
        this.getState = mixer.getState.bind(mixer);

        this.callActions('afterConstruct', arguments);

        h.freeze(this);
        h.seal(this);
    };

    _mixitup.BaseStatic.call(_mixitup.Facade);

    _mixitup.Facade.prototype = Object.create(_mixitup.Base.prototype);

    _mixitup.Facade.prototype.constructor = _mixitup.Facade;

    if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && (typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object') {
        module.exports = _mixitup;
    } else if (typeof define === 'function' && define.amd) {
        define(function () {
            return _mixitup;
        });
    } else if (typeof window.mixitup === 'undefined' || typeof window.mixitup !== 'function') {
        window.mixitup = _mixitup;
    }
    _mixitup.BaseStatic.call(_mixitup.constructor);

    _mixitup.NAME = 'mixitup';
    _mixitup.CORE_VERSION = '3.2.1';
})(window);
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
