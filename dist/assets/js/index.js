/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/alife-logger/lib/base.js":
/*!***********************************************!*\
  !*** ./node_modules/alife-logger/lib/base.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(/*! ./util */ "./node_modules/alife-logger/lib/util.js"), sendBeacon = __webpack_require__(/*! ./common/sendBeacon */ "./node_modules/alife-logger/lib/common/sendBeacon.js"), selfId = "aokcdqn3ly@e629dabd48a9933", pushToQueue = function(e, t) {
    var i;
    {
        if ("error" !== t.t || !(i = e.requestQueue[0]) || "error" !== i.t || t.msg !== i.msg) {
            if ("behavior" === t.t) {
                var r = e.requestQueue && e.requestQueue.length;
                if (r > 0 && "behavior" === e.requestQueue[r - 1].t) {
                    var n = t.behavior || [];
                    e.requestQueue[r - 1].behavior.concat(n);
                } else e.requestQueue.push(t);
            } else e.requestQueue.unshift(t);
            return e.onReady(function() {
                e.requestTimmer = util.delay(function() {
                    e.clear();
                }, e.requestQueue[0] && "error" === e.requestQueue[0].t ? 3e3 : -1);
            }), !0;
        }
        i.times++;
    }
}, Base = function(e) {
    return this.ver = "1.8.20", this._conf = util.ext({}, Base.dftCon), this.sampleCache = {}, 
    this.requestQueue = [], this.selfQueue = [], this.sdkFlag = !0, this.hash = util.seq(), 
    this.resetPageview(), this.setConfig(e), this.rip = util.getRandIP(), this.record = 999, 
    this["EagleEye-TraceID"] = this.getTraceId()["EagleEye-TraceID"], this._common = {}, 
    this;
};

Base.dftCon = {
    sample: 1,
    pvSample: 1,
    tag: "",
    imgUrl: "https://arms-retcode.aliyuncs.com/r.png?",
    region: null,
    ignore: {
        ignoreUrls: [],
        ignoreApis: [],
        ignoreErrors: [ /^Script error\.?$/ ]
    },
    release: undefined,
    environment: "prod"
}, Base.prototype = {
    constructor: Base,
    onReady: function(e) {
        return e();
    },
    getPage: function() {
        var e = this._conf.page;
        return util.safetyCall(e, [], e + "");
    },
    setPage: function() {},
    setConfig: function(e) {
        e && "object" == typeof e && (util.verifyConfig(e), e = this.setImgUrl(e), this._conf = util.ext({}, this._conf, e));
    },
    setImgUrl: function(e) {
        var t = e.region, i = e.imgUrl;
        if (t) {
            var r = util.regionMap[t];
            return e.imgUrl = r || util.defaultImgUrl, e;
        }
        return i && (e.imgUrl = i), e;
    },
    checkImgUrl: function(e) {
        if (this.getConfig("debug")) return !0;
        var t = util.regionMap, i = !1;
        for (var r in t) if (t[r] === e) {
            i = !0;
            break;
        }
        return !i && util.warn("[retcode] invalid url: " + e), i;
    },
    sendRequest: function() {},
    sendBeacon: function(e) {
        sendBeacon(e, this.getConfig("imgUrl"));
    },
    postData: function() {},
    commonInfo: function() {
        return {};
    },
    setCommonInfo: function(e) {
        e && "object" == typeof e && (this._common = util.ext({}, this._common, e));
    },
    resetPageview: function() {
        this.pageview = util.uu(), this.sBegin = Date.now();
    },
    getUsername: function() {
        if (this.username) return this.username;
        var e = this._conf, t = e && e.setUsername;
        if ("function" == typeof t) try {
            var i = t();
            "string" == typeof i && (i = i.substr(0, 20), this.username = i);
        } catch (r) {
            util.warn("[arms] setUsername fail", r);
        }
        return this.username;
    },
    getTraceId: function() {
        var e = this.rip, t = Date.now(), i = util.getSortNum(this.record), r = e + t + i + util.getRandNum(this._conf.pid);
        return this["EagleEye-TraceID"] = r, this.record = i, {
            "EagleEye-TraceID": r
        };
    },
    getUberTraceId: function(e) {
        var t = this.rip, i = Date.now(), r = util.getSortNum(this.record), n = util.getRandNum(this._conf.pid), s = t + i + r + util.getNum(2) + n, u = s.substring(0, 16);
        return e = e ? "1" : "0", {
            "uber-trace-id": s + ":" + u + ":0:" + e,
            traceId: s
        };
    },
    getPageviewId: function() {
        return {
            "EagleEye-SessionID": this.pageview
        };
    },
    getConfig: function(e) {
        return e ? this._conf[e] : util.ext({}, this._conf);
    },
    sampling: function(e) {
        return 1 === e || ("boolean" == typeof this.sampleCache[e] ? this.sampleCache[e] : (this.sampleCache[e] = util.pick(e), 
        this.sampleCache[e]));
    },
    clear: function(e) {
        var t;
        clearTimeout(this.requestTimmer), this.requestTimmer = null;
        for (var i = this._conf && "function" == typeof this._conf.sendRequest; t = this.requestQueue.pop(); ) "res" === t.t ? this.postData(t, "res") : "error" === t.t ? this.postData(t, "err") : "api" === t.t ? this.postData(t, "apiSnapshot") : "behavior" === t.t ? this.postData(t, "behavior") : "health" === t.t && !i && window && window.navigator && "function" == typeof window.navigator.sendBeacon ? this.sendBeacon(t) : this.sendRequest(t);
        return e && this.clearSelf(), this;
    },
    clearSelf: function() {
        var e;
        for (clearTimeout(this.Timmer), this.Timmer = null; e = this.selfQueue.pop(); ) this.postData(e, "err");
        return this;
    },
    _lg: function(e, t, i, r) {
        var n = this._conf, s = this.getPage(), u = n.ignore || {}, o = u.ignoreErrors, a = u.ignoreUrls, l = u.ignoreApis;
        return this._isRobot ? this : util.ignoreByRule(s, a) || util.ignoreByRule(util.decode(s), a) ? this : "error" === e && (util.ignoreByRule(t.msg, o) || util.ignoreByRule(util.decode(t.msg), o)) ? this : "api" === e && (util.ignoreByRule(t.api, l) || util.ignoreByRule(util.decode(t.api), l)) ? this : this.checkImgUrl(n.imgUrl) && t && !n.disabled && n.pid ? 0 === r ? this : (t = util.ext({
            t: e,
            times: 1,
            page: s,
            tag: n.tag || "",
            release: n.release || "",
            environment: n.environment,
            begin: Date.now(),
            c1: n.c1,
            c2: n.c2,
            c3: n.c3
        }, t, this.commonInfo(), this._common, {
            pid: n.pid,
            _v: this.ver,
            pv_id: this.pageview,
            username: this.getUsername(),
            sampling: i || 1,
            z: util.seq()
        }), 1 === r ? pushToQueue(this, t) : i && !this.sampling(i) ? this : pushToQueue(this, t)) : this;
    },
    _self: function(e, t, i) {
        var r = this, n = r._conf;
        if ("error" !== e) return r;
        if (!r.checkImgUrl(n.imgUrl)) return r;
        if (!t || n.disabled || !n.pid || !selfId) return r;
        if (i && !r.sampling(i)) return r;
        t = util.ext({
            t: e,
            times: 1,
            page: util.selfErrPage,
            tag: n.pid,
            begin: Date.now()
        }, t, {
            pid: selfId,
            _v: r.ver,
            sampling: i || 1,
            z: util.seq()
        });
        var s = r.selfQueue[0];
        if (s) {
            s.times++;
            try {
                if (s.err && t.err && s.err.msg_raw && t.err.msg_raw) {
                    s.err.msg_raw.split("&").indexOf(t.err.msg_raw) < 0 && s.err.msg_raw.length < 1e3 && (s.err.msg_raw += "&" + t.err.msg_raw);
                }
            } catch (u) {}
        } else r.selfQueue.unshift(t), r.onReady(function() {
            r.sdkFlag && (r.sdkFlag = !1, r.Timmer = util.delay(function() {
                r.clearSelf();
            }, 1e4));
        });
    },
    custom: function(e, t) {
        if (!e || "object" != typeof e) return this;
        var i = !1, r = {
            begin: Date.now()
        };
        return util.each(e, function(e, t) {
            return !(i = t && t.length <= 20) && util.warn("[retcode] invalid key: " + t), r["x-" + t] = e, 
            i;
        }), i ? this._lg("custom", r, t || 1) : this;
    }
}, module.exports = Base;

/***/ }),

/***/ "./node_modules/alife-logger/lib/biz.browser/behavior.js":
/*!***************************************************************!*\
  !*** ./node_modules/alife-logger/lib/biz.browser/behavior.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(/*! ../util */ "./node_modules/alife-logger/lib/util.js");

module.exports = function(e, t) {
    var n = [], r = null, o = t && t.location && t.location.href, a = 0, i = undefined, s = null, u = function(e, t, n) {
        if (null !== e) {
            var r = e[t];
            e[t] = n(r);
        }
    }, c = function(e) {
        var t, n, r, o, a, i = [];
        if (!e || "string" != typeof e.tagName) return "";
        if (i.push(e.tagName.toLowerCase()), "string" == typeof e.id && i.push("#".concat(e.id)), 
        "string" == typeof (t = e.className)) for (n = t.split(/\s+/), a = 0; a < n.length; a++) i.push(".".concat(n[a]));
        var s = [ "type", "name", "title", "alt" ];
        for (a = 0; a < s.length; a++) r = s[a], "string" == typeof (o = e.getAttribute(r)) && i.push("[".concat(r, '="').concat(o, '"]'));
        return i.join("");
    }, f = function(e, t) {
        return function(n) {
            if (n && n !== s) {
                s = n;
                var o;
                try {
                    o = n.target;
                } catch (f) {
                    o = "<unknown>";
                }
                if (0 !== o.length) {
                    var u = {
                        type: "ui.".concat(e),
                        data: {
                            message: function(e) {
                                if (!e || 1 !== e.nodeType) return "";
                                for (var t = e || null, n = [], r = 0, o = 0, a = " > ".length, i = ""; t && r++ < 5 && !("html" === (i = c(t)) || r > 1 && o + n.length * a + i.length >= 80); ) n.push(i), 
                                o += i.length, t = t.parentNode;
                                return n.reverse().join(" > ");
                            }(o)
                        },
                        timestamp: Date.now()
                    };
                    "click" === e ? (a && clearTimeout(a), t ? a = setTimeout(function() {
                        r && r.addBehavior(u);
                    }, 0) : r && r.addBehavior(u)) : "keypress" === e && (i || r && r.addBehavior(u), 
                    clearTimeout(i), i = setTimeout(function() {
                        i = undefined;
                    }, 100));
                }
            }
        };
    }, h = function() {
        if (function() {
            var e = t && t.chrome, n = e && e.app && e.app.runtime, r = "history" in t && !!t.history.pushState && !!t.history.replaceState;
            return !n && r;
        }()) {
            var e = function(e, t) {
                var n = {
                    type: "navigation",
                    data: {
                        from: e,
                        to: t
                    }
                };
                r && r.addBehavior(n), o = t;
            }, n = t.onpopstate;
            t.onpopstate = function() {
                for (var r = arguments.length, a = new Array(r), i = 0; i < r; i++) a[i] = arguments[i];
                var s = t.location.href;
                if (e(o, s), n) return n.apply(this, a);
            };
            var a = function(t) {
                return function() {
                    for (var n = arguments.length, r = new Array(n), a = 0; a < n; a++) r[a] = arguments[a];
                    var i = r.length > 2 ? r[2] : undefined;
                    return i && e(o, String(i)), t.apply(this, r);
                };
            };
            u(t.history, "pushState", a), u(t.history, "replaceState", a);
        }
    };
    util.ext(e.prototype, {
        addBehavior: function(e) {
            if (this.getConfig("behavior") && e && "object" == typeof e) {
                var r = {}, o = e.data || {};
                if (e.type) r = o; else {
                    if ("string" != typeof o.name || "string" != typeof o.message) return;
                    r.name = o.name.substr(0, 20), r.message = o.message.substr(0, 200);
                }
                r.message && (r.message = util.encode(r.message));
                var a = {
                    type: e.type || "custom",
                    data: r || {},
                    timestamp: e.timestamp || Date.now(),
                    page: e.page || t && t.location && t.location.pathname
                };
                return n.push(a), n = n.slice(-100);
            }
        },
        getBehavior: function() {
            return n || [];
        },
        setBehavior: function(e) {
            return e && (n = e), n;
        },
        reportBehavior: function(e) {
            var t = this;
            t.getConfig("behavior") && (t.sendBhTimer && (clearTimeout(t.sendBhTimer), t.sendBhTimer = undefined), 
            t.sendBhTimer = setTimeout(function() {
                n && n.length > 0 && (t.behavior(n), n = [], t.sendBhTimer = undefined, e && "function" == typeof e && e());
            }, 0));
        },
        initBehavior: function() {
            if (!this.hasInitBehavior && !r) {
                try {
                    !function() {
                        if (document && document.referrer && document.location) {
                            var e = document.referrer, t = document.location.href;
                            if ("" !== e) {
                                var n = {
                                    type: "navigation",
                                    data: {
                                        from: e,
                                        to: t
                                    }
                                };
                                o = t, r && r.addBehavior(n);
                            }
                        }
                    }(), t && t.document && t.document.addEventListener && (t.document.addEventListener("click", f("click"), !1), 
                    t.document.addEventListener("keypress", f("keypress"), !1)), h(), this.getConfig("enableConsole") && function() {
                        if (t && t.console) for (var e = [ "debug", "info", "warn", "log", "error", "assert" ], n = 0; n < e.length; n++) {
                            var o = e[n];
                            t.console[o] && "function" == typeof t.console[o] && u(t.console, o, function(e) {
                                var n = o;
                                return function() {
                                    for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++) a[i] = arguments[i];
                                    var s = {
                                        type: "console",
                                        data: {
                                            level: n,
                                            message: a
                                        }
                                    };
                                    if (r && r.addBehavior(s), "error" === n) for (var u = 0; u < a.length; u++) {
                                        var c = a[u];
                                        c && c.message && c.stack && r && r.errorHandler(new ErrorEvent("error", {
                                            error: c,
                                            message: c.message
                                        }));
                                    }
                                    e && Function.prototype.apply.call(e, t.console, a);
                                };
                            });
                        }
                    }();
                } catch (e) {
                    util.warn("[arms] error in initBehavior", e);
                }
                r = this, this.hasInitBehavior = !0;
            }
            return this;
        }
    });
};

/***/ }),

/***/ "./node_modules/alife-logger/lib/biz.browser/clazz.js":
/*!************************************************************!*\
  !*** ./node_modules/alife-logger/lib/biz.browser/clazz.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(/*! ../util */ "./node_modules/alife-logger/lib/util.js"), Reporter = __webpack_require__(/*! ../reporter */ "./node_modules/alife-logger/lib/reporter.js"), webSender = __webpack_require__(/*! ../common/sender */ "./node_modules/alife-logger/lib/common/sender.js"), webPost = __webpack_require__(/*! ../common/post */ "./node_modules/alife-logger/lib/common/post.js"), win = util.win, doc = win.document, validFn = /^(error|api|speed|sum|avg|percent|custom|msg|setPage|setConfig|behavior|performance)$/, Browser = function(e) {
    var r = this;
    return Reporter.call(r, e), r._initialPage = e.page && util.safetyCall(e.page, [], e.page + "") || null, 
    r._isRobot = util.isRobot(), r._health = {
        errcount: 0,
        apisucc: 0,
        apifail: 0
    }, r.beforeSend = function(e, t) {
        "error" === e ? r._health.errcount++ : "api" === e && r._health[t.success ? "apisucc" : "apifail"]++;
    }, !1 !== e.enableInstanceAutoSend && (r.initHandler(), r.initHook(), r.initFmpObserver(1e4), 
    r._conf && r._conf.behavior && "function" == typeof r.initBehavior && r.initBehavior()), 
    Object.defineProperty && win.addEventListener && Object.defineProperty(r, "pipe", {
        set: r.sendPipe
    }), r;
};

Browser.prototype = util.createObject(Reporter.prototype), util.ext(Reporter._root.dftCon, {
    uid: null,
    setUsername: null,
    ignoreUrlPath: null,
    ignoreApiPath: null,
    urlHelper: [ {
        rule: /\/([a-z\-_]+)?\d{2,20}/g,
        target: "/$1**"
    }, /\/$/ ],
    apiHelper: {
        rule: /\/([a-z\-_]+)?\d{2,20}/g,
        target: "/$1**"
    },
    ignoreUrlCase: !0,
    imgUrl: "https://arms-retcode.aliyuncs.com/r.png?",
    disableHook: !1,
    autoSendPv: !0,
    autoSendPerf: !0,
    enableSPA: !1,
    enableLinkTrace: !1,
    linkType: "arms",
    enableApiCors: !1,
    sendResource: !0,
    behavior: !0,
    enableConsole: !1,
    parseHash: function(e) {
        return (e ? util.cutUrlSearch(e.replace(/^#\/?/, "")) : "") || "[index]";
    },
    parseResponse: function(e) {
        if (!e || "object" != typeof e) return {};
        var r = e.code, t = e.msg || e.message || e.subMsg || e.errorMsg || e.ret || e.errorResponse || "";
        return "object" == typeof t && (r = r || t.code, t = t.msg || t.message || t.info || t.ret || JSON.stringify(t)), 
        {
            msg: t,
            code: r,
            success: !0
        };
    }
}), util.ext(Browser.prototype, {
    constructor: Browser,
    _super: Reporter,
    onReady: function(e) {
        var r = this;
        if (r.hasReady) return e();
        "complete" === doc.readyState ? (r.hasReady = !0, e()) : util.on(win, "load", function() {
            r.hasReady = !0, e();
        }, !0);
    },
    getPage: function(e) {
        var r = this._conf, t = r.page, i = location, o = i.host + i.pathname;
        return t && !e ? util.safetyCall(t, [], t + "") : this._initialPage || util.filterByRule(r.ignoreUrlCase ? o.toLowerCase() : o, r.ignoreUrlPath ? r.ignoreUrlPath : r.urlHelper);
    },
    setPage: function(e, r) {
        var t = this, i = t.prevPage;
        if (!1 !== r) {
            if (!e || e === i) return t;
            t.prevPage = e, clearTimeout(t.sendPVTimmer), t.handleUnload(1), t.resetPageview(), 
            t.sendPVTimmer = setTimeout(function() {
                t.sendPV();
            }, 10);
        } else t.prevPage = e;
        return t._conf.page = e, t;
    },
    setConfig: function(e, r) {
        if (e && "object" == typeof e) {
            util.verifyConfig(e), e = this.setImgUrl(e);
            var t = this._conf;
            if (this._conf = util.ext({}, t, e), !r) {
                var i = "disableHook";
                i in e && t[i] !== e[i] && (e[i] ? this.removeHook() : this.addHook()), (i = "enableSPA") in e && t[i] !== e[i] && this.bindHashChange(e[i]);
            }
        }
    },
    sendRequest: function(e) {
        webSender(e, this.getConfig("imgUrl"));
    },
    postData: function(e, r) {
        var t = {};
        t[r] = e[r], delete e[r];
        var i = "";
        "object" == typeof e && (i = util.serialize(e)), webPost(t, this.getConfig("imgUrl") + i + "&post_res=");
    },
    sendPipe: function(e) {
        var r = this;
        if (!e || !e.length) return r;
        try {
            if ("Array" === util.T(e[0])) return util.each(e, function(e) {
                return r.sendPipe(e);
            });
            if ("Array" !== util.T(e)) return r;
            var t = e.shift();
            if (!validFn.test(t)) return r;
            r[t].apply(r, e);
        } catch (i) {
            return util.warn("[retcode] error in sendPipe", i), r;
        }
    },
    sendHealth: function() {
        var e = util.ext({}, this._health);
        e.healthy = e.errcount > 0 ? 0 : 1, e.begin = Date.now();
        var r = e.begin - this.sBegin;
        e.stay = r, this._lg("health", e, 1), this._health = {
            errcount: 0,
            apisucc: 0,
            apifail: 0
        };
    },
    createInstance: function(e) {
        e = util.ext({
            pid: this._conf.pid
        }, e);
        var r = this.__proto__.constructor(e);
        return e.page && r.sendPV(), r;
    }
}), __webpack_require__(/*! ./behavior */ "./node_modules/alife-logger/lib/biz.browser/behavior.js")(Browser, win), __webpack_require__(/*! ./handler */ "./node_modules/alife-logger/lib/biz.browser/handler.js")(Browser, win, doc), 
__webpack_require__(/*! ./fmp */ "./node_modules/alife-logger/lib/biz.browser/fmp.js")(Browser, win, doc), __webpack_require__(/*! ./hook */ "./node_modules/alife-logger/lib/biz.browser/hook.js")(Browser, win), __webpack_require__(/*! ./hack */ "./node_modules/alife-logger/lib/biz.browser/hack.js")(Browser, win), 
Browser._super = Reporter, Browser._root = Reporter._root, Reporter.Browser = Browser, 
module.exports = Browser;

/***/ }),

/***/ "./node_modules/alife-logger/lib/biz.browser/fmp.js":
/*!**********************************************************!*\
  !*** ./node_modules/alife-logger/lib/biz.browser/fmp.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(/*! ../util */ "./node_modules/alife-logger/lib/util.js"), checkInterval = 500;

module.exports = function(e, n, r) {
    function t(e, n, r) {
        var i = 0, u = e.tagName;
        if ("SCRIPT" !== u && "STYLE" !== u && "META" !== u && "HEAD" !== u) {
            var c = e.children ? e.children.length : 0;
            if (c > 0) for (var l = e.children, a = c - 1; a >= 0; a--) i += t(l[a], n + 1, i > 0);
            if (i <= 0 && !r) {
                if (!(e.getBoundingClientRect && e.getBoundingClientRect().top < o)) return 0;
            }
            i += 1 + .5 * n;
        }
        return i;
    }
    function i(e) {
        for (var n = 1; n < e.length; n++) if (e[n].score < e[n - 1].score) return e.splice(n, 1), 
        i(e);
        return e;
    }
    var o = n.innerHeight || 0, u = [], c = null, l = 0;
    util.ext(e.prototype, {
        initFmpObserver: function(e) {
            var i = this;
            if (!i._conf || !i._conf.useFmp) return null;
            if (!n.MutationObserver) return util.warn("[retcode] first meaningful paint can not be retrieved"), 
            i.sendPerformance(), null;
            util.on(n, "beforeunload", function() {
                i.endObserving(0, !0);
            });
            var o = n.MutationObserver;
            return (c = new o(function() {
                !function(e) {
                    var n = Date.now() - e, i = r.querySelector("body");
                    if (i) {
                        var o = 0;
                        o += t(i, 1, !1), u.push({
                            score: o,
                            t: n
                        });
                    } else u.push({
                        score: 0,
                        t: n
                    });
                }(i._startTime);
            })).observe(document, {
                childList: !0,
                subtree: !0
            }), l = 1, i.onReady(function() {
                i.endObserving(e);
            }), c;
        },
        endObserving: function(e, n) {
            var r = this;
            if (c && l) if (r.fmpTimmer && (clearTimeout(r.fmpTimmer), r.fmpTimmer = null), 
            n || !function(e, n) {
                var r = Date.now() - e;
                return !(r > n || r - (u && u.length && u[u.length - 1].t || 0) > 2 * checkInterval);
            }(r._startTime, e)) {
                c.disconnect(), l = 0, u = i(u);
                for (var t = null, o = 1; o < u.length; o++) if (u[o].t >= u[o - 1].t) {
                    var a = u[o].score - u[o - 1].score;
                    (!t || t.rate <= a) && (t = {
                        t: u[o].t,
                        rate: a
                    });
                }
                t && t.t > 0 && t.t < 36e5 ? r.sendPerformance({
                    fmp: t.t
                }) : r.sendPerformance();
            } else r.fmpTimmer = util.delay(function() {
                r.endObserving(e);
            }, checkInterval);
        }
    });
};

/***/ }),

/***/ "./node_modules/alife-logger/lib/biz.browser/hack.js":
/*!***********************************************************!*\
  !*** ./node_modules/alife-logger/lib/biz.browser/hack.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(t, e) {
    var r = __webpack_require__(/*! ../util */ "./node_modules/alife-logger/lib/util.js"), a = e.history || {}, n = e.document, i = function(t, r) {
        var a;
        e.CustomEvent ? a = new CustomEvent(t, {
            detail: r
        }) : ((a = n.createEvent("HTMLEvents")).initEvent(t, !1, !0), a.detail = r), e.dispatchEvent(a);
    }, o = function(t) {
        var e = a[t];
        "function" == typeof e && (a[t] = function(n, o, c) {
            var s = 1 === arguments.length ? [ arguments[0] ] : Array.apply(null, arguments), u = location.href, h = e.apply(a, s);
            if (!c || "string" != typeof c) return h;
            if (c === u) return h;
            try {
                var l = u.split("#"), p = c.split("#"), y = r.cutUrlSearch(l[0]), f = r.cutUrlSearch(p[0]), v = l[1] && l[1].replace(/^\/?(.*)/, "$1"), S = p[1] && p[1].replace(/^\/?(.*)/, "$1");
                y !== f ? i("historystatechange", f) : v !== S && i("historystatechange", S);
            } catch (d) {
                r.warn("[retcode] error in " + t + ": " + d);
            }
            return h;
        }, a[t].toString = r.createFakeToString(t));
    };
    r.ext(t.prototype, {
        hackHistoryState: function() {
            return this.hasHackedHistoryState ? this : (o("pushState"), o("replaceState"), this.hasHackedHistoryState = !0, 
            this);
        }
    });
};

/***/ }),

/***/ "./node_modules/alife-logger/lib/biz.browser/handler.js":
/*!**************************************************************!*\
  !*** ./node_modules/alife-logger/lib/biz.browser/handler.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(e, t, r) {
    var n = __webpack_require__(/*! ../util */ "./node_modules/alife-logger/lib/util.js"), a = __webpack_require__(/*! ../common/res */ "./node_modules/alife-logger/lib/common/res.js"), o = __webpack_require__(/*! ../common/perf */ "./node_modules/alife-logger/lib/common/perf.js"), i = null, s = r.documentElement, c = t.innerWidth || s.clientWidth || r.body.clientWidth, h = t.innerHeight || s.clientHeight || r.body.clientHeight, d = t.navigator.connection, l = {
        sr: screen.width + "x" + screen.height,
        vp: c + "x" + h,
        ct: d ? d.effectiveType || d.type : ""
    }, u = {}, g = function(e, t, a, o, i) {
        if (t === undefined) {
            var s, c;
            if (!u[e]) {
                s = new RegExp(e + "=([^;]+)");
                try {
                    c = s.exec(r.cookie);
                } catch (d) {
                    return n.warn("[retcode] can not get cookie:", d), null;
                }
                c && (u[e] = c[1]);
            }
            return u[e];
        }
        var h = e + "=" + t;
        o && (h += "; domain=" + o), h += "; path=" + (i || "/"), a && (h += "; max-age=" + a);
        try {
            return r.cookie = h, !!r.cookie;
        } catch (d) {
            return n.warn("[retcode] can not set cookie: ", d), !1;
        }
    }, f = function(e) {
        var t = e._conf.uid || g("_nk_") || g("_bl_uid");
        if (!t) {
            t = n.uu();
            if (!g("_bl_uid", t, 15552e3)) return null;
        }
        return t;
    };
    return n.ext(e.prototype, {
        activeErrHandler: function(e) {
            return i && !e ? this : (i = this, this);
        },
        errorHandler: function(e) {
            if (!e) return this;
            var t = e.type;
            if ("error" === t) {
                var r = e.target || e.srcElement;
                !(!r || !r.tagName || e.message || e.filename || e.lineno || e.colno) ? this.resourceErrorHandler(e) : this.error(e.error || {
                    message: e.message
                }, e);
            } else "unhandledrejection" === t && n.T(e.reason, "Error") && n.checkAutoError(e.reason) && this.error(e.reason);
            try {
                this.getConfig("behavior") && this.reportBehavior && this.reportBehavior();
            } catch (e) {}
            return this;
        },
        resourceErrorHandler: function(e) {
            var t = this, r = e.target || e.srcElement;
            try {
                var a = t.getSrc(r), o = "string" == typeof r.tagName ? r.tagName.toLowerCase() : "", i = t.getXPath(r, 5);
                return t._lg("resourceError", {
                    src: a && a.substring(0, 1e3),
                    node_name: o,
                    xpath: i
                }), t;
            } catch (s) {
                return n.warn("[ARMS] resourceErrorHandler error :", s), t;
            }
        },
        getSrc: function(e) {
            var t = e.src || e.href;
            try {
                if (!t) {
                    var r = "object" === ("string" == typeof e.tagName ? e.tagName.toLowerCase() : ""), n = e.getAttribute("classid") && "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" === e.getAttribute("classid").toLowerCase() || "application/x-shockwave-flash" === e.getAttribute("type");
                    r && n && (t = e.getAttribute("data") || e.getAttribute("codebase")), t || (t = e.outerHTML || e.innerHTML);
                }
            } catch (a) {
                t = "";
            }
            return t;
        },
        getXPath: function(e, t) {
            var r = e.id ? "#" + e.id : "", n = "string" == typeof e.className ? "." + e.className.split(" ").join(".") : "", a = ("string" == typeof e.tagName ? e.tagName.toLowerCase() : "") + r + n;
            return e.parentNode && e.parentNode.tagName && t - 1 != 0 ? this.getXPath(e.parentNode, t - 1) + " > " + a : a;
        },
        sendPerformance: function(e) {
            var t = this;
            t.onReady(function() {
                var r = o();
                r && r.load && r.load > 0 && (r.page = t.getPage(!0), e && (r = n.ext(r, e)), r.autoSend = !0, 
                t.performance(r));
            });
        },
        sendResources: function(e) {
            var t = this;
            t.onReady(function() {
                var r = a();
                r && r.load && r.load > 0 && (r.load && r.load <= 2e3 || r.load && r.load <= 8e3 && Math.random() > .05 || (r.page = t.getPage(!0), 
                r.dl = location.href, e && (r = n.ext(r, e)), t._lg("res", r, t.getConfig("sample"))));
            });
        },
        sendPV: function() {
            var e = this;
            e.onReady(function() {
                var n = function(e) {
                    var n = f(e), a = t.devicePixelRatio || 1;
                    return {
                        uid: n,
                        dt: r.title,
                        dl: location.href,
                        dr: r.referrer,
                        dpr: a.toFixed(2),
                        de: (r.characterSet || r.defaultCharset || "").toLowerCase(),
                        ul: s.lang,
                        begin: Date.now()
                    };
                }(e);
                n && n.uid && e._lg("pv", n, e.getConfig("pvSample"));
            });
        },
        commonInfo: function() {
            return l.uid = f(this), l.sid = function(e) {
                if (e.session) return e.session;
                var t;
                try {
                    if ("object" == typeof window && "object" == typeof sessionStorage && "function" == typeof sessionStorage.getItem) return "string" == typeof (t = sessionStorage.getItem("_bl_sid")) ? (e.session = t, 
                    t) : (t = n.uu(), e.session = t, "function" == typeof sessionStorage.setItem && sessionStorage.setItem("_bl_sid", t), 
                    t);
                } catch (r) {
                    n.warn("[ARMS] getSid error :", r);
                }
                return e.session = t = n.uu(), t;
            }(this), l;
        },
        handleUnload: function(e) {
            var t = Date.now();
            if (t - this._lastUnload < 200) return this;
            this._lastUnload = t, this.sendHealth(e), this.speedCache && (this._lg("speed", this.speedCache), 
            this.speedCache = null, clearTimeout(this.speedTimmer)), this.clear(!0);
        },
        bindHashChange: function(e) {
            var r = this;
            if (!e ^ r.hashChangeHandler) return r;
            e ? (r.hackHistoryState(), r.hashChangeHandler = function(e) {
                var t = r._conf.parseHash(location.hash);
                t && r.setPage(t, !1 !== e);
            }, r.stateChangeHandler = function(e) {
                var t = r._conf.parseHash(e.detail);
                t && r.setPage(t);
            }, n.on(t, "hashchange", r.hashChangeHandler), n.on(t, "historystatechange", r.stateChangeHandler), 
            r.hashChangeHandler(!1)) : (n.off(t, "hashchange", r.hashChangeHandler), n.off(t, "historystatechange", r.stateChangeHandler), 
            r.hashChangeHandler = null, r.stateChangeHandler = null);
        },
        initHandler: function() {
            var e = this;
            if (e.hasInitHandler) return e;
            var r = e._conf;
            return n.on(t, "beforeunload", function() {
                e.handleUnload(0);
            }), e.bindHashChange(r.enableSPA), e.activeErrHandler(!1), e.hasInitHandler = !0, 
            e;
        }
    }), n.on(t, "error", function(e) {
        i && i.errorHandler(e);
    }, !1, !0).on(t, "unhandledrejection", function(e) {
        i && i.errorHandler(e);
    }), e;
};

/***/ }),

/***/ "./node_modules/alife-logger/lib/biz.browser/hook.js":
/*!***********************************************************!*\
  !*** ./node_modules/alife-logger/lib/biz.browser/hook.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(e, t) {
    var a = __webpack_require__(/*! ../util */ "./node_modules/alife-logger/lib/util.js"), r = null, n = a.getCurDomain(), i = function(e, t, r, i, o, s, p, c, l, g, d, u, f) {
        var h = a.J(o) || null, y = a.safetyCall(t, [ h, i ], null);
        if (!y) return !1;
        var E = y.code || s, v = !("success" in y) || y.success;
        e.api(r, v, p, E, y.msg, c, l, g, d, n, u, f);
    }, o = "fetch", s = "__oFetch_", p = "__oXMLHttpRequest_", c = "XMLHttpRequest";
    return a.ext(e.prototype, {
        removeHook: function(e, a) {
            return r && (a || this === r) ? (t[s] && (t[o] = t[s], delete t[s]), t[p] && (t[c] = t[p], 
            delete t[p]), r = null, this) : this;
        },
        addHook: function(e) {
            return !e && r ? this : (r || (function() {
                if ("function" == typeof t[o]) {
                    var e = t[o];
                    t[s] = e, t[o] = function(o, s) {
                        var p = 1 === arguments.length ? [ arguments[0] ] : Array.apply(null, arguments), c = r;
                        if (!c || !c.api) return e.apply(t, p);
                        if (s && ("HEAD" === s.method || "no-cors" === s.mode)) return e.apply(t, p);
                        var l = Date.now(), g = c._conf, d = (o && "string" != typeof o ? o.url : o) || "", u = d;
                        d = a.cutUrlSearch(d);
                        var f = (g.ignore || {}).ignoreApis;
                        if (!a.checkAPI(d, !0) || a.ignoreByRule(d, f)) return e.apply(t, p);
                        d = a.filterByRule(d, g.ignoreApiPath ? g.ignoreApiPath : g.apiHelper);
                        var h = g.enableLinkTrace, y = "", E = "", v = c.getConfig("pid"), I = null, D = c.getConfig("sample"), T = c.getConfig("linkType"), A = 1;
                        if (D && !c.sampling(D) && (A = 0), h) {
                            var S = "";
                            try {
                                S = location.origin ? location.origin : location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "");
                            } catch (R) {
                                S = "";
                            }
                            var b = a.checkSameOrigin(u, S);
                            if (c.getConfig("enableApiCors") || b) {
                                if (o && "string" != typeof o) try {
                                    if (p[0].headers && "function" == typeof p[0].headers.get && "function" == typeof p[0].headers.append) switch (T) {
                                      case "tracing":
                                        var k = p[0].headers.get("uber-trace-id");
                                        k ? y = k.split(":")[0] : (k = c.getUberTraceId(A), p[0].headers.append("uber-trace-id", k["uber-trace-id"]), 
                                        y = k.traceId), E = c.pageview;
                                        break;

                                      default:
                                        var m = p[0].headers.get("EagleEye-TraceID"), w = p[0].headers.get("EagleEye-SessionID"), H = p[0].headers.get("EagleEye-pAppName");
                                        m ? y = m : (y = c.getTraceId()["EagleEye-TraceID"], p[0].headers.append("EagleEye-TraceID", y)), 
                                        w ? E = w : (E = c.getPageviewId()["EagleEye-SessionID"], p[0].headers.append("EagleEye-SessionID", E)), 
                                        H || p[0].headers.append("EagleEye-pAppName", v);
                                    }
                                } catch (P) {
                                    a.warn("[retcode] fetch failed to set header, exception is :\n" + P);
                                }
                                if (s) switch (s.headers = s.headers ? s.headers : {}, T) {
                                  case "tracing":
                                    if (s.headers["uber-trace-id"]) y = s.headers["uber-trace-id"].split(":")[0]; else {
                                        var C = c.getUberTraceId(A);
                                        s.headers["uber-trace-id"] = C["uber-trace-id"], y = C.traceId;
                                    }
                                    E = c.getPageviewId()["EagleEye-SessionID"];
                                    break;

                                  default:
                                    s.headers["EagleEye-TraceID"] ? y = s.headers["EagleEye-TraceID"] : (y = c.getTraceId()["EagleEye-TraceID"], 
                                    s.headers["EagleEye-TraceID"] = y), s.headers["EagleEye-SessionID"] ? E = s.headers["EagleEye-SessionID"] : (E = c.getPageviewId()["EagleEye-SessionID"], 
                                    s.headers["EagleEye-SessionID"] = E), s.headers["EagleEye-pAppName"] || (s.headers["EagleEye-pAppName"] = v);
                                }
                            }
                        }
                        return e.apply(t, p).then(function(e) {
                            if (!c || !c.api) return e;
                            try {
                                if (!e || "function" != typeof e.clone) return e;
                                var t = e.clone(), r = t.headers;
                                if (r && "function" == typeof r.get) {
                                    var o = r.get("content-type");
                                    if (o && !/(text)|(json)/.test(o)) return e;
                                    if (!y) {
                                        var s = a.parseFetchHeaders(r);
                                        "object" == typeof s && s["eagleeye-traceid"] && (y = s["eagleeye-traceid"], I = "response");
                                    }
                                }
                                var f = Date.now() - l;
                                return t.text().then(function(e) {
                                    var o = a.getFetchSnapshot(p, e, r);
                                    t.ok ? i(c, g.parseResponse, d, u, e, t.status || 200, f, l, y, E, o, I, A) : c.api(d, !1, f, t.status || 404, t.statusText, l, y, E, o, n, I, A);
                                }), e;
                            } catch (R) {
                                return a.warn("[ARMS] fetch response error :", R), e;
                            }
                        })["catch"](function(e) {
                            if (!c || !c.api) throw e;
                            var t = Date.now() - l;
                            throw c.api(d, !1, t, e.name || "Error", e.message, l, y, E, {}, n), e;
                        });
                    }, t[o].toString = a.createFakeToString(o);
                }
            }(), function() {
                if ("function" == typeof t[c]) {
                    var e, o = t[c];
                    t[p] = o, t[c] = function(t) {
                        var s = new o(t), p = r;
                        if (!p || !p.api || !s.addEventListener) return s;
                        var c, l, g, d = s.send, u = s.open, f = s.setRequestHeader, h = p._conf, y = (h.ignore || {}).ignoreApis, E = p.getConfig("enableLinkTrace"), v = "", I = "", D = "", T = null, A = p.getConfig("sample"), S = p.getConfig("linkType"), b = 1;
                        return A && !p.sampling(A) && (b = 0), s.open = function(t, r) {
                            e = t;
                            var n = 1 === arguments.length ? [ arguments[0] ] : Array.apply(null, arguments);
                            u.apply(s, n), g = r || "", l = a.cutUrlSearch(g);
                            var i = !a.checkAPI(l, !0) || a.ignoreByRule(l, y);
                            if (l = l ? a.filterByRule(l, h.ignoreApiPath ? h.ignoreApiPath : h.apiHelper) : "", 
                            !i && E) {
                                var o = "";
                                try {
                                    o = location.origin ? location.origin : location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "");
                                } catch (T) {
                                    o = "";
                                }
                                var c = a.checkSameOrigin(g, o);
                                if ((p.getConfig("enableApiCors") || c) && f && "function" == typeof f) switch (S) {
                                  case "tracing":
                                    var d = p.getUberTraceId(b);
                                    f.apply(s, [ "uber-trace-id", d["uber-trace-id"] ]), v = d.traceId, I = p.getPageviewId()["EagleEye-SessionID"];
                                    break;

                                  default:
                                    v = p.getTraceId()["EagleEye-TraceID"], f.apply(s, [ "EagleEye-TraceID", v ]), I = p.getPageviewId()["EagleEye-SessionID"], 
                                    f.apply(s, [ "EagleEye-SessionID", I ]), D = p.getConfig("pid"), f.apply(s, [ "EagleEye-pAppName", D ]);
                                }
                            }
                        }, s.send = function() {
                            c = Date.now();
                            var e = 1 === arguments.length ? [ arguments[0] ] : Array.apply(null, arguments);
                            d.apply(s, e);
                        }, a.on(s, "readystatechange", function() {
                            if (l && 4 === s.readyState) {
                                var t = Date.now() - c, r = a.getXhrSnapshot(g, e, s);
                                if (!v) {
                                    var o = a.parseXhrHeaders("function" == typeof s.getAllResponseHeaders && s.getAllResponseHeaders() || "");
                                    "object" == typeof o && o["eagleeye-traceid"] && (v = o["eagleeye-traceid"], T = "response");
                                }
                                if (s.status >= 200 && s.status <= 299) {
                                    var d = s.status || 200;
                                    if ("function" == typeof s.getResponseHeader) {
                                        var u = s.getResponseHeader("Content-Type");
                                        if (u && !/(text)|(json)/.test(u)) return;
                                    }
                                    s.responseType && "text" !== s.responseType ? p.api(l, !0, t, d, "", c, v, I, {}, n, T, b) : i(p, h.parseResponse, l, g, s.responseText, d, t, c, v, I, r, T, b);
                                } else p.api(l, !1, t, s.status || "FAILED", s.statusText, c, v, I, r, n, T, b);
                            }
                        }), s;
                    }, t[c].toString = a.createFakeToString(c);
                }
            }()), r = this, this);
        },
        initHook: function() {
            return this.hasInitHook ? this : (this.getConfig("disableHook") || this.addHook(), 
            this.hasInitHook = !0, this);
        }
    }), e;
};

/***/ }),

/***/ "./node_modules/alife-logger/lib/common/constants.js":
/*!***********************************************************!*\
  !*** ./node_modules/alife-logger/lib/common/constants.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.TIMING_KEYS = [ "", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "", "domInteractive", "", "domContentLoadedEventEnd", "", "loadEventStart", "", "msFirstPaint", "secureConnectionStart" ];

/***/ }),

/***/ "./node_modules/alife-logger/lib/common/perf.js":
/*!******************************************************!*\
  !*** ./node_modules/alife-logger/lib/common/perf.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(/*! ../util */ "./node_modules/alife-logger/lib/util.js"), constants = __webpack_require__(/*! ./constants */ "./node_modules/alife-logger/lib/common/constants.js"), TIMING_KEYS = constants.TIMING_KEYS;

module.exports = function() {
    var t = util.win || {}, n = t.performance;
    if (!n || "object" != typeof n) return null;
    var e = {}, i = n.timing || {}, a = Date.now(), r = 1;
    if ("function" == typeof t.PerformanceNavigationTiming) {
        var o = n.getEntriesByType("navigation")[0];
        o && (i = o, r = 2);
    }
    util.each({
        dns: [ 3, 2 ],
        tcp: [ 5, 4 ],
        ssl: [ 5, 17 ],
        ttfb: [ 7, 6 ],
        trans: [ 8, 7 ],
        dom: [ 10, 8 ],
        res: [ 14, 12 ],
        firstbyte: [ 7, 2 ],
        fpt: [ 8, 1 ],
        tti: [ 10, 1 ],
        ready: [ 12, 1 ],
        load: [ 14, 1 ]
    }, function(t, n) {
        var a = i[TIMING_KEYS[t[1]]], o = i[TIMING_KEYS[t[0]]];
        if (2 === r || a > 0 && o > 0) {
            var I = Math.round(o - a);
            I >= 0 && I < 6e5 && (e[n] = I);
        }
    });
    var I = t.navigator.connection, l = n.navigation || {};
    e.ct = I ? I.effectiveType || I.type : "";
    var f = I ? I.downlink || I.downlinkMax || I.bandwidth || null : null;
    if ((f = f > 999 ? 999 : f) && (e.bandwidth = f), e.navtype = 1 === l.type ? "Reload" : "Other", 
    1 === r && i[TIMING_KEYS[16]] > 0 && i[TIMING_KEYS[1]] > 0) {
        var u = i[TIMING_KEYS[16]] - i[TIMING_KEYS[1]];
        u >= 0 && u < 36e5 && (e.fpt = u);
    }
    return 1 === r && i[TIMING_KEYS[1]] > 0 ? e.begin = i[TIMING_KEYS[1]] : 2 === r && e.load > 0 ? e.begin = a - e.load : e.begin = a, 
    e;
};

/***/ }),

/***/ "./node_modules/alife-logger/lib/common/post.js":
/*!******************************************************!*\
  !*** ./node_modules/alife-logger/lib/common/post.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(/*! ../util */ "./node_modules/alife-logger/lib/util.js"), win = "object" == typeof window ? window : {}, xmlHttp = win.__oXMLHttpRequest_ || win.XMLHttpRequest;

xmlHttp = "function" == typeof xmlHttp ? xmlHttp : undefined, module.exports = function(t, e) {
    try {
        var n = new xmlHttp();
        n.open("POST", e, !0), n.setRequestHeader("Content-Type", "text/plain"), n.send(JSON.stringify(t));
    } catch (i) {
        util.warn("[retcode] Failed to log, exception is :\n" + i);
    }
};

/***/ }),

/***/ "./node_modules/alife-logger/lib/common/res.js":
/*!*****************************************************!*\
  !*** ./node_modules/alife-logger/lib/common/res.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(/*! ../util */ "./node_modules/alife-logger/lib/util.js"), constants = __webpack_require__(/*! ./constants */ "./node_modules/alife-logger/lib/common/constants.js"), TIMING_KEYS = constants.TIMING_KEYS;

module.exports = function() {
    var t = util.win || {}, e = t.performance;
    if (!e || "object" != typeof e || "function" != typeof e.getEntriesByType) return null;
    var n = {}, i = e.timing || {}, r = e.getEntriesByType("resource") || [];
    if (n.begin = i[TIMING_KEYS[1]] || Date.now(), "function" == typeof t.PerformanceNavigationTiming) {
        var o = e.getEntriesByType("navigation")[0];
        o && (i = o);
    }
    return util.each({
        dom: [ 10, 8 ],
        load: [ 14, 1 ]
    }, function(t, e) {
        var r = i[TIMING_KEYS[t[1]]], o = i[TIMING_KEYS[t[0]]];
        if (r > 0 && o > 0) {
            var a = Math.round(o - r);
            a >= 0 && a < 6e5 && (n[e] = a);
        }
    }), n.res = JSON.stringify(r), n;
};

/***/ }),

/***/ "./node_modules/alife-logger/lib/common/sendBeacon.js":
/*!************************************************************!*\
  !*** ./node_modules/alife-logger/lib/common/sendBeacon.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(/*! ../util */ "./node_modules/alife-logger/lib/util.js");

module.exports = function(o, n) {
    "object" == typeof o && (o = util.serialize(o));
    var e = n + o;
    window && window.navigator && "function" == typeof window.navigator.sendBeacon ? window.navigator.sendBeacon(e, "&post_res=") : util.warn("[arms] navigator.sendBeacon not surported");
};

/***/ }),

/***/ "./node_modules/alife-logger/lib/common/sender.js":
/*!********************************************************!*\
  !*** ./node_modules/alife-logger/lib/common/sender.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(/*! ../util */ "./node_modules/alife-logger/lib/util.js"), win = "object" == typeof window ? window : {}, _catch = "catch", oFetch = win.__oFetch_ || win.fetch;

oFetch = "function" == typeof oFetch ? oFetch : undefined, module.exports = function(e, o) {
    var t = -1;
    "object" == typeof e && (t = e.z, e = util.serialize(e));
    var n = o + e;
    if (oFetch) return oFetch(n, {
        method: "HEAD",
        mode: "no-cors"
    })[_catch](util.noop);
    if (win.document && win.document.createElement) {
        var c = "__request_hold_" + t, i = win[c] = new Image();
        i.onload = i.onerror = function() {
            win[c] = undefined;
        }, i.src = n, i = null;
    }
};

/***/ }),

/***/ "./node_modules/alife-logger/lib/index.js":
/*!************************************************!*\
  !*** ./node_modules/alife-logger/lib/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function initSDK(e, n) {
    var r = win[key] = new BrowserLogger(e);
    r.sendPipe(n);
    var i = r._conf;
    return !1 !== i.autoSendPv && r.sendPV(), i && i.useFmp || r.sendPerformance(), 
    i && i.sendResource && r.sendResources(), win[initFlag] = !0, r;
}

function initCdnBlSDK() {
    if (win[initFlag]) return win[key];
    var e = {}, n = [];
    return key in win && (e = win[key].config || {}, n = win[key].pipe || []), initSDK(e, n);
}

var win = window, BrowserLogger = win.BrowserLogger = __webpack_require__(/*! ./biz.browser/clazz */ "./node_modules/alife-logger/lib/biz.browser/clazz.js"), key = __webpack_require__(/*! ./util */ "./node_modules/alife-logger/lib/util.js").key, initFlag = "__hasInitBlSdk";

BrowserLogger.singleton = function(e, n) {
    return win[initFlag] ? win[key] : initSDK(e, n);
}, BrowserLogger.createExtraInstance = function(e) {
    e && "object" == typeof e && !0 !== e.enableInstanceAutoSend && (e.enableInstanceAutoSend = !1);
    var n = new BrowserLogger(e), r = n._conf;
    return r.enableInstanceAutoSend && (!1 !== r.autoSendPv && n.sendPV(), r && r.useFmp || n.sendPerformance(), 
    r && r.sendResource && n.sendResources()), n;
};

var isBrowser = "object" == typeof window && !!window.navigator;

isBrowser && win[key] && (BrowserLogger.bl = initCdnBlSDK(win.__hasInitBlSdk)), 
module.exports = BrowserLogger;

/***/ }),

/***/ "./node_modules/alife-logger/lib/reporter.js":
/*!***************************************************!*\
  !*** ./node_modules/alife-logger/lib/reporter.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(/*! ./util */ "./node_modules/alife-logger/lib/util.js"), Base = __webpack_require__(/*! ./base */ "./node_modules/alife-logger/lib/base.js"), validApiKeys = [ "api", "success", "time", "code", "msg", "trace", "traceId", "begin", "pv_id", "sid", "seq", "domain", "flag" ], parseStatData = function(e, t) {
    var r = e.split("::");
    return r.length > 1 ? util.ext({
        group: r[0],
        key: r[1]
    }, t) : util.ext({
        group: "default_group",
        key: r[0]
    }, t);
}, Reporter = function(e) {
    Base.call(this, e);
    var t;
    try {
        t = "object" == typeof performance ? performance.timing.fetchStart : Date.now();
    } catch (r) {
        t = Date.now();
    }
    return this._startTime = t, this;
};

Reporter.prototype = util.createObject(Base.prototype), util.ext(Base.dftCon, {
    startTime: null
}), util.ext(Reporter.prototype, {
    constructor: Reporter,
    _super: Base,
    sum: function(e, t, r) {
        try {
            return this._lg("sum", parseStatData(e, {
                val: t || 1,
                begin: Date.now()
            }), r);
        } catch (i) {
            util.warn("[retcode] can not get parseStatData: " + i);
        }
    },
    avg: function(e, t, r) {
        try {
            return this._lg("avg", parseStatData(e, {
                val: t || 0,
                begin: Date.now()
            }), r);
        } catch (i) {
            util.warn("[retcode] can not get parseStatData: " + i);
        }
    },
    percent: function(e, t, r, i) {
        try {
            return this._lg("percent", parseStatData(e, {
                subkey: t,
                val: r || 0,
                begin: Date.now()
            }), i);
        } catch (a) {
            util.warn("[retcode] can not get parseStatData: " + a);
        }
    },
    msg: function(e, t) {
        if (e && !(e.length > 180)) return this.custom({
            msg: e
        }, t);
    },
    error: function(e, t) {
        if (!e) return util.warn("[retcode] invalid param e: " + e), this;
        1 === arguments.length ? ("string" == typeof e && (e = {
            message: e
        }, t = {}), "object" == typeof e && (t = e = e.error || e)) : ("string" == typeof e && (e = {
            message: e
        }), "object" != typeof t && (t = {}));
        var r = e.name || "CustomError", i = e.message || "", a = e.stack || "";
        t = t || {};
        if (util.checkSDKError(i, t.filename)) {
            var s = /^Script error\.?$/, n = e.msg || e.message;
            if (util.ignoreByRule(n, s) || util.ignoreByRule(util.decode(n), s)) return this;
            var o = {
                msg: util.selfErrKey,
                err: {
                    msg_raw: util.encode(e.msg || e.message)
                }
            };
            return this._self("error", o, 1);
        }
        var u = {
            begin: Date.now(),
            cate: r,
            msg: i && i.substring(0, 1e3),
            stack: a && a.substring(0, 1e3),
            file: util.removeUrlSearch(t.filename || ""),
            line: t.lineno || "",
            col: t.colno || "",
            err: {
                msg_raw: util.encode(i),
                stack_raw: util.encode(a)
            },
            tag: t.tag || "",
            c1: t.c1,
            c2: t.c2,
            c3: t.c3
        }, l = (this.getConfig("ignore") || {}).ignoreErrors;
        return util.ignoreByRule(u.msg, l) || util.ignoreByRule(util.decode(u.msg), l) ? this : (this.beforeSend && this.beforeSend("error", u), 
        this._lg("error", u, 1));
    },
    behavior: function(e) {
        if (e) {
            var t = "object" == typeof e && e.behavior ? e : {
                behavior: e
            };
            return this.beforeSend && this.beforeSend("behavior", t), this._lg("behavior", t, 1);
        }
    },
    api: function(e, t, r, i, a, s, n, o, u, l, c, p) {
        if (!e) return util.warn("[retcode] api is null"), this;
        if (e = "string" == typeof e ? {
            api: e,
            success: t,
            time: r,
            code: i,
            msg: a,
            begin: s,
            traceId: n,
            pv_id: o,
            apiSnapshot: u,
            domain: l,
            flag: p
        } : util.sub(e, validApiKeys), !util.checkAPI(e.api, !0)) return this;
        e.code = e.code || "";
        var g = e.msg || "";
        if (g = "string" == typeof g ? g.substring(0, 1e3) : g, e.msg = g, e.success = e.success ? 1 : 0, 
        e.time = +e.time, e.begin = e.begin, e.traceId = e.traceId || "", e.pv_id = e.pv_id || "", 
        e.domain = e.domain || "", e.flag = e.flag, e.success ? e.apiSnapshot && delete e.apiSnapshot : e.apiSnapshot = u, 
        c && (e.traceOrigin = c), !e.api || isNaN(e.time)) return util.warn("[retcode] invalid time or api"), 
        this;
        var f = (this.getConfig("ignore") || {}).ignoreApis;
        return util.ignoreByRule(e.api, f) || util.ignoreByRule(util.decode(e.api), f) ? this : (this.beforeSend && this.beforeSend("api", e), 
        this._lg("api", e, e.success && this.getConfig("sample"), e.flag));
    },
    speed: function(e, t, r) {
        var i = this, a = this.getConfig("startTime") || this._startTime;
        return /^s(\d|1[0])$/.test(e) ? (t = "number" != typeof t ? Date.now() - a : t >= a ? t - a : t, 
        i.speedCache = i.speedCache || {}, i.speedCache[e] = t, i.speedCache.begin = a, 
        clearTimeout(i.speedTimmer), i.speedTimmer = setTimeout(function() {
            r || (i.speedCache.page = i.getPage(!0)), i._lg("speed", i.speedCache), i.speedCache = null;
        }, 5e3), i) : (util.warn("[retcode] invalid point: " + e), i);
    },
    performance: function(e) {
        if (e && "object" == typeof e && !this.hasSendPerf) {
            var t = {}, r = {}, i = this.getConfig("autoSendPerf");
            if (e.autoSend && i) return r = util.ext(this.perfData || {}, e), this.hasSendPerf = !0, 
            this._lg("perf", r, this.getConfig("sample"));
            if (e.autoSend && !i) return delete e.autoSend, this.perfData ? (r = util.ext(this.perfData || {}, e), 
            this.hasSendPerf = !0, this._lg("perf", r, this.getConfig("sample"))) : void (this.perfData = e);
            for (var a in e) (/^t([1-9]|1[0])$/.test(a) || "ctti" === a || "cfpt" === a) && (t[a] = e[a]);
            if (!0 === e.autoSend || !i && (i || this.perfData)) return !0 !== e.autoSend && !1 === i && this.perfData ? (t = util.ext(this.perfData || {}, t), 
            this.hasSendPerf = !0, this._lg("perf", t, this.getConfig("sample"))) : void 0;
            this.perfData = util.ext(this.perfData || {}, t);
        }
    },
    resource: function(e, t) {
        if (!e || !util.isPlainObject(e)) return util.warn("[arms] invalid param data: " + e), 
        this;
        var r = Object.keys(e), i = [ "begin", "dom", "load", "res", "dl" ], a = !1;
        for (var s in i) {
            if (r.indexOf(i[s]) < 0) {
                a = !0;
                break;
            }
        }
        if (a) return util.warn("[arms] lack param data: " + e), this;
        var n = {
            begin: e.begin || Date.now(),
            dom: e.dom || "",
            load: e.load || "",
            res: util.isArray(e.res) ? JSON.stringify(e.res) : JSON.stringify([]),
            dl: e.dl || ""
        };
        return this._lg("res", n, t);
    }
}), Reporter._super = Base, Reporter._root = Base, Base.Reporter = Reporter, module.exports = Reporter;

/***/ }),

/***/ "./node_modules/alife-logger/lib/util.js":
/*!***********************************************!*\
  !*** ./node_modules/alife-logger/lib/util.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Date.now = Date.now || function() {
    return new Date().getTime();
};

var SEQUENCE = Date.now(), noop = function() {}, getCwarn = function() {
    var e = "object" == typeof console ? console.warn : noop;
    try {
        var t = {
            warn: e
        };
        t.warn.call(t);
    } catch (r) {
        return noop;
    }
    return e;
}, util = {
    noop: noop,
    warn: getCwarn(),
    key: "__bl",
    selfErrKey: "ARMS_SDK_ERROR",
    selfErrPage: "ARMSSDK",
    win: "object" == typeof window && window.document ? window : undefined,
    regionMap: {
        cn: "https://arms-retcode.aliyuncs.com/r.png?",
        sg: "https://arms-retcode-sg.aliyuncs.com/r.png?",
        sg_2: "https://retcode-sg-lazada.arms.aliyuncs.com/r.png?",
        daily: "http://arms-retcode-daily.alibaba.net/r.png?",
        daily_2: "https://arms-retcode-daily.alibaba.net/r.png?",
        us: "https://retcode-us-west-1.arms.aliyuncs.com/r.png?"
    },
    defaultImgUrl: "https://arms-retcode.aliyuncs.com/r.png?",
    createObject: function(e) {
        if (Object.create) return Object.create(e);
        var t = function() {};
        return t.prototype = e, new t();
    },
    each: function(e, t) {
        var r = 0, n = e.length;
        if (this.T(e, "Array")) for (;r < n && !1 !== t.call(e[r], e[r], r); r++) ; else for (r in e) if (!1 === t.call(e[r], e[r], r)) break;
        return e;
    },
    safetyCall: function(e, t, r) {
        if ("function" != typeof e) return r;
        try {
            return e.apply(this, t);
        } catch (n) {
            return r;
        }
    },
    T: function(e, t) {
        var r = Object.prototype.toString.call(e).substring(8).replace("]", "");
        return t ? r === t : r;
    },
    filterByRule: function(e, t) {
        if (!e) return "";
        if (!t) return e;
        var r = this, n = r.T(t);
        return "Function" === n ? r.safetyCall(t, [ e ], e) : "Array" === n ? (this.each(t, function(t) {
            e = r.filterByRule(e, t);
        }), e) : "Object" === n ? e.replace(t.rule, t.target || "") : e.replace(t, "");
    },
    ignoreByRule: function(e, t) {
        if (!e || !t) return !1;
        if ((this.isString(t) || t.source || "Function" === this.T(t)) && (t = [ t ]), !this.isArray(t)) return util.warn("[arms] invalid rules of ignore config, (list of) String/RegExp/Funcitons are available"), 
        !1;
        for (var r, n = [], o = 0, i = t.length; o < i; o++) if (r = t[o], this.isString(r)) n.push(r.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")); else if (r && r.source) n.push(r.source); else if (r && "Function" === this.T(r) && !0 === this.safetyCall(r, [ e ], !1)) return !0;
        var a = new RegExp(n.join("|"), "i");
        return !!(n.length && a.test && a.test(e));
    },
    J: function(e) {
        if (!e || "string" != typeof e) return e;
        var t = null;
        try {
            t = JSON.parse(e);
        } catch (r) {}
        return t;
    },
    pick: function(e) {
        return 1 === e || 1 === Math.ceil(Math.random() * e);
    },
    verifyConfig: function(e) {
        if ("sample" in e) {
            var t = e.sample, r = t;
            t && /^\d+(\.\d+)?%$/.test(t) && (r = parseInt(100 / parseFloat(t))), 0 < r && 1 > r && (r = parseInt(1 / r)), 
            r >= 1 && r <= 100 ? e.sample = r : delete e.sample;
        }
        return e;
    },
    on: function(e, t, r, n, o) {
        return e.addEventListener ? (o = o || !1, e.addEventListener(t, function i(a) {
            n && e.removeEventListener(t, i, o), r.call(this, a);
        }, o)) : e.attachEvent && e.attachEvent("on" + t, function a(o) {
            n && e.detachEvent("on" + t, a), r.call(this, o);
        }), this;
    },
    off: function(e, t, r) {
        return r ? (e.removeEventListener ? e.removeEventListener(t, r) : e.detachEvent && e.detachEvent(t, r), 
        this) : this;
    },
    delay: function(e, t) {
        return -1 === t ? (e(), null) : setTimeout(e, t || 0);
    },
    ext: function(e) {
        for (var t = 1, r = arguments.length; t < r; t++) {
            var n = arguments[t];
            for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
        }
        return e;
    },
    sub: function(e, t) {
        var r = {};
        return this.each(e, function(e, n) {
            -1 !== t.indexOf(n) && (r[n] = e);
        }), r;
    },
    uu: function() {
        for (var e, t, r = 20, n = new Array(r), o = Date.now().toString(36).split(""); r-- > 0; ) t = (e = 36 * Math.random() | 0).toString(36), 
        n[r] = e % 3 ? t : t.toUpperCase();
        for (var i = 0; i < 8; i++) n.splice(3 * i + 2, 0, o[i]);
        return n.join("");
    },
    seq: function() {
        return (SEQUENCE++).toString(36);
    },
    decode: function(e) {
        try {
            e = decodeURIComponent(e);
        } catch (t) {}
        return e;
    },
    encode: function(e, t) {
        try {
            e = t ? encodeURIComponent(e).replace(/\(/g, "%28").replace(/\)/g, "%29") : encodeURIComponent(e);
        } catch (r) {}
        return e;
    },
    serialize: function(e) {
        e = e || {};
        var t = [];
        for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && e[r] !== undefined && t.push(r + "=" + this.encode(e[r], "msg" === r));
        return t.join("&");
    },
    checkAPI: function(e, t) {
        if (!e || "string" != typeof e) return !1;
        var r = /arms-retcode[\w-]*\.aliyuncs/.test(e);
        return !r && t && (r = /(\.png)|(\.gif)|(alicdn\.com)/.test(e)), !r;
    },
    checkAutoError: function(e) {
        return !(!e || !e.message) && !/failed[\w\s]+fetch/i.test(e.message);
    },
    cutUrlSearch: function(e) {
        return e && "string" == typeof e ? e.replace(/^(https?:)?\/\//, "").replace(/\?.*$/, "") : "";
    },
    removeUrlSearch: function(e) {
        return e && "string" == typeof e ? e.replace(/\?.*$/, "") : "";
    },
    createFakeToString: function(e) {
        return function() {
            return e + "() { [native code] }";
        };
    },
    checkSameOrigin: function(e, t) {
        if (!t || !e) return !1;
        var r = "//" + t.split("/")[2];
        return e === t || e.slice(0, t.length + 1) === t + "/" || e === r || e.slice(0, r.length + 1) === r + "/" || !/^(\/\/|http:|https:).*/.test(e);
    },
    getRandIP: function() {
        for (var e = [], t = 0; t < 4; t++) {
            var r = Math.floor(256 * Math.random());
            e[t] = (r > 15 ? "" : "0") + r.toString(16);
        }
        return e.join("").replace(/^0/, "1");
    },
    getSortNum: function(e) {
        return e ? (e += 1) >= 1e3 && e <= 9999 ? e : e < 1e3 ? e + 1e3 : e % 1e4 + 1e3 : 1e3;
    },
    getRandNum: function(e) {
        return e && "string" == typeof e ? e.length < 5 ? this.getNum(5) : e.substring(e.length - 5) : this.getNum(5);
    },
    getNum: function(e) {
        for (var t = [], r = 0; r < e; r++) {
            var n = Math.floor(16 * Math.random());
            t[r] = n.toString(16);
        }
        return t.join("");
    },
    getCurDomain: function() {
        return location && location.hostname || "";
    },
    parseFetchHeaders: function(e) {
        if (!e) return {};
        var t = {};
        try {
            if ("function" == typeof e.keys) for (var r = e.keys(), n = r.next(); !n.done; ) {
                var o = n.value;
                t[o] = e.get(o), n = r.next();
            } else t = e;
        } catch (i) {
            t = {};
        }
        return t;
    },
    parseXhrHeaders: function(e) {
        if (!e && "string" != typeof e) return {};
        var t = {};
        try {
            var r = e.split("\r\n");
            t = r.reduce(function(e, t) {
                var r = t.split(": ");
                return e[r[0]] = r[1], e;
            }, {});
        } catch (n) {
            t = {};
        }
        return t;
    },
    getQuerys: function(e) {
        if (!e) return "";
        var t = {}, r = [], n = "", o = "";
        try {
            var i = [];
            if (e.indexOf("?") >= 0 && (i = e.substring(e.indexOf("?") + 1, e.length).split("&")), 
            i.length > 0) for (var a in i) n = (r = i[a].split("="))[0], o = r[1], t[n] = o;
        } catch (s) {
            t = {};
        }
        return t;
    },
    getFetchSnapshot: function(e, t, r) {
        var n, o;
        try {
            var i = (e && "string" != typeof e[0] ? e[0].url : e[0]) || "", a = (e && "string" != typeof e[0] ? e[0] : e[1]) || {}, s = "POST" === a.method.toUpperCase() ? a.body : this.getQuerys(i);
            n = {
                originApi: i,
                method: a.method || "unknown",
                params: s,
                response: t || "",
                reqHeaders: this.parseFetchHeaders(a.headers || null),
                resHeaders: this.parseFetchHeaders(r)
            }, o = "function" == typeof encodeURIComponent && JSON && encodeURIComponent(JSON.stringify(n)) || "{}";
        } catch (c) {
            o = "{}";
        }
        return o;
    },
    getXhrSnapshot: function(e, t, r) {
        if (!e || !t || !r) return {};
        var n, o;
        try {
            var i = "";
            "" === r.responseType || "text" === r.responseType ? i = r.responseText : "document" === r.responseType && (i = r.responseXML), 
            n = {
                originApi: e,
                method: t,
                params: this.getQuerys(e),
                response: i,
                reqHeaders: {},
                resHeaders: this.parseXhrHeaders("function" == typeof r.getAllResponseHeaders && r.getAllResponseHeaders() || "")
            }, o = "function" == typeof encodeURIComponent && JSON && encodeURIComponent(JSON.stringify(n)) || "{}";
        } catch (a) {
            o = "{}";
        }
        return o;
    },
    isRobot: function() {
        var e = [ "nuhk", "googlebot/", "googlebot-image", "yammybot", "openbot", "slurp", "msnbot", "ask jeeves/teoma", "ia_archiver", "baiduspider", "bingbot/", "adsbot" ];
        if (!navigator || "string" != typeof navigator.userAgent) return !1;
        try {
            for (var t = navigator.userAgent.toLowerCase(), r = 0; r < e.length; r++) {
                var n = e[r];
                if (t.lastIndexOf(n) >= 0) return !0;
            }
        } catch (o) {
            util.warn("[arms] useragent parse error");
        }
        return !1;
    },
    isFunction: function(e) {
        return "function" == typeof e;
    },
    isPlainObject: function(e) {
        return "[object Object]" === Object.prototype.toString.call(e);
    },
    isString: function(e) {
        return "[object String]" === Object.prototype.toString.call(e);
    },
    isArray: function(e) {
        return "[object Array]" === Object.prototype.toString.call(e);
    },
    joinRegExp: function(e) {
        for (var t, r = [], n = 0, o = e.length; n < o; n++) t = e[n], this.isString(t) ? r.push(t.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) : t && t.source && r.push(t.source);
        return new RegExp(r.join("|"), "i");
    },
    reWriteMethod: function(e, t, r) {
        if (null !== e) {
            var n = e[t];
            e[t] = r(n);
        }
    },
    checkSDKError: function(e, t) {
        if (!e && !t) return !1;
        if (new RegExp(this.selfErrKey, "i").test(e)) return !0;
        return !!this.ignoreByRule(t, [ /retcode.alicdn.com\/retcode\/bl.js/, /g.alicdn.com\/retcode\/cloud-sdk\/bl.js/, /laz-g-cdn.alicdn.com\/retcode\/cloud-sdk\/bl.js/, /local.taobao.com:8880\/build\/bl/ ]);
    },
    sdkError: function(e) {
        return {
            msg: e,
            message: this.selfErrKey
        };
    }
};

module.exports = util;

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"0e7e156d-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"0e7e156d-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { id: "app" } }, [_c("router-view")], 1)
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/lib-flexible/flexible.js":
/*!***********************************************!*\
  !*** ./node_modules/lib-flexible/flexible.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


;(function(win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var flexibleEl = doc.querySelector('meta[name="flexible"]');
    var dpr = 0;
    var scale = 0;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});

    if (metaEl) {
        console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
        }
    }

    if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
    }

    docEl.setAttribute('data-dpr', dpr);
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }

    function refreshRem(){
        var width = docEl.getBoundingClientRect().width;
        if (width / dpr > 540) {
            width = 540 * dpr;
        }
        var rem = width / 10;
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }


    refreshRem();

    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }

})(window, window['lib'] || (window['lib'] = {}));


/***/ }),

/***/ "./node_modules/poi/lib/webpack/babel-loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/poi/lib/webpack/babel-loader.js??ref--1-0!./node_modules/cache-loader/dist/cjs.js??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'App'
});
document.getElementById('global_loading').style.display = 'none';

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/sa-sdk-javascript/sensorsdata.min.js":
/*!***********************************************************!*\
  !*** ./node_modules/sa-sdk-javascript/sensorsdata.min.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e){ true?module.exports=e():undefined}(function(){try{var sd={modules:{}},_=sd._={};"object"!=typeof JSON&&(JSON={}),function(){"use strict";var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta,rep;function f(e){return e<10?"0"+e:e}function this_value(){return this.valueOf()}function quote(e){return rx_escapable.lastIndex=0,rx_escapable.test(e)?'"'+e.replace(rx_escapable,function(e){var t=meta[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var r,s,a,i,n,o=gap,d=t[e];switch(d&&"object"==typeof d&&"function"==typeof d.toJSON&&(d=d.toJSON(e)),"function"==typeof rep&&(d=rep.call(t,e,d)),typeof d){case"string":return quote(d);case"number":return isFinite(d)?String(d):"null";case"boolean":case"null":return String(d);case"object":if(!d)return"null";if(gap+=indent,n=[],"[object Array]"===Object.prototype.toString.apply(d)){for(i=d.length,r=0;r<i;r+=1)n[r]=str(r,d)||"null";return a=0===n.length?"[]":gap?"[\n"+gap+n.join(",\n"+gap)+"\n"+o+"]":"["+n.join(",")+"]",gap=o,a}if(rep&&"object"==typeof rep)for(i=rep.length,r=0;r<i;r+=1)"string"==typeof rep[r]&&(a=str(s=rep[r],d))&&n.push(quote(s)+(gap?": ":":")+a);else for(s in d)Object.prototype.hasOwnProperty.call(d,s)&&(a=str(s,d))&&n.push(quote(s)+(gap?": ":":")+a);return a=0===n.length?"{}":gap?"{\n"+gap+n.join(",\n"+gap)+"\n"+o+"}":"{"+n.join(",")+"}",gap=o,a}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value),"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(e,t,r){var s;if(gap="",indent="","number"==typeof r)for(s=0;s<r;s+=1)indent+=" ";else"string"==typeof r&&(indent=r);if(rep=t,t&&"function"!=typeof t&&("object"!=typeof t||"number"!=typeof t.length))throw new Error("JSON.stringify");return str("",{"":e})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j;function walk(e,t){var r,s,a=e[t];if(a&&"object"==typeof a)for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(void 0!==(s=walk(a,r))?a[r]=s:delete a[r]);return reviver.call(e,t,a)}if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),function(){var e,t=Array.prototype,r=Function.prototype,s=Object.prototype,a=t.slice,i=s.toString,n=s.hasOwnProperty,o=(r.bind,t.forEach),d=(t.indexOf,Array.isArray),c={},u=_.each=function(e,t,r){if(null==e)return!1;if(o&&e.forEach===o)e.forEach(t,r);else if(_.isArray(e)&&e.length===+e.length){for(var s=0,a=e.length;s<a;s++)if(s in e&&t.call(r,e[s],s,e)===c)return!1}else for(var i in e)if(n.call(e,i)&&t.call(r,e[i],i,e)===c)return!1};_.extend=function(e){return u(a.call(arguments,1),function(t){for(var r in t)n.call(t,r)&&void 0!==t[r]&&(e[r]=t[r])}),e},_.extend2Lev=function(e){return u(a.call(arguments,1),function(t){for(var r in t)void 0!==t[r]&&(_.isObject(t[r])&&_.isObject(e[r])?_.extend(e[r],t[r]):e[r]=t[r])}),e},_.coverExtend=function(e){return u(a.call(arguments,1),function(t){for(var r in t)void 0!==t[r]&&void 0===e[r]&&(e[r]=t[r])}),e},_.isArray=d||function(e){return"[object Array]"===i.call(e)},_.isFunction=function(e){if(!e)return!1;try{return/^\s*\bfunction\b/.test(e)}catch(e){return!1}},_.isArguments=function(e){return!(!e||!n.call(e,"callee"))},_.toArray=function(e){return e?e.toArray?e.toArray():_.isArray(e)?a.call(e):_.isArguments(e)?a.call(e):_.values(e):[]},_.values=function(e){var t=[];return null==e?t:(u(e,function(e){t[t.length]=e}),t)},_.indexOf=function(e,t){var r=e.indexOf;if(r)return r.call(e,t);for(var s=0;s<e.length;s++)if(t===e[s])return s;return-1},_.hasAttribute=function(e,t){return e.hasAttribute?e.hasAttribute(t):!(!e.attributes[t]||!e.attributes[t].specified)},_.filter=function(e,t,r){var s=Object.prototype.hasOwnProperty;if(e.filter)return e.filter(t);for(var a=[],i=0;i<e.length;i++)if(s.call(e,i)){var n=e[i];t.call(r,n,i,e)&&a.push(n)}return a},_.inherit=function(e,t){return e.prototype=new t,e.prototype.constructor=e,e.superclass=t.prototype,e},_.trim=function(e){return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")},_.isObject=function(e){return null!=e&&"[object Object]"==i.call(e)},_.isEmptyObject=function(e){if(_.isObject(e)){for(var t in e)if(n.call(e,t))return!1;return!0}return!1},_.isUndefined=function(e){return void 0===e},_.isString=function(e){return"[object String]"==i.call(e)},_.isDate=function(e){return"[object Date]"==i.call(e)},_.isBoolean=function(e){return"[object Boolean]"==i.call(e)},_.isNumber=function(e){return"[object Number]"==i.call(e)&&/[\d\.]+/.test(String(e))},_.isElement=function(e){return!(!e||1!==e.nodeType)},_.isJSONString=function(e){try{JSON.parse(e)}catch(e){return!1}return!0},_.safeJSONParse=function(e){var t=null;try{t=JSON.parse(e)}catch(e){return!1}return t},_.decodeURIComponent=function(e){var t=e;try{t=decodeURIComponent(e)}catch(r){t=e}return t},_.encodeDates=function(e){return _.each(e,function(t,r){_.isDate(t)?e[r]=_.formatDate(t):_.isObject(t)&&(e[r]=_.encodeDates(t))}),e},_.mediaQueriesSupported=function(){return void 0!==window.matchMedia||void 0!==window.msMatchMedia},_.getScreenOrientation=function(){var e=screen.msOrientation||screen.mozOrientation||(screen.orientation||{}).type,t="\u672a\u53d6\u5230\u503c";if(e)t=e.indexOf("landscape")>-1?"landscape":"portrait";else if(_.mediaQueriesSupported()){var r=window.matchMedia||window.msMatchMedia;r("(orientation: landscape)").matches?t="landscape":r("(orientation: portrait)").matches&&(t="portrait")}return t},_.now=Date.now||function(){return(new Date).getTime()},_.throttle=function(e,t,r){var s,a,i,n=null,o=0;r||(r={});var d=function(){o=!1===r.leading?0:_.now(),n=null,i=e.apply(s,a),n||(s=a=null)};return function(){var c=_.now();o||!1!==r.leading||(o=c);var u=t-(c-o);return s=this,a=arguments,u<=0||u>t?(n&&(clearTimeout(n),n=null),o=c,i=e.apply(s,a),n||(s=a=null)):n||!1===r.trailing||(n=setTimeout(d,u)),i}},_.hashCode=function(e){if("string"!=typeof e)return 0;var t=0;if(0==e.length)return t;for(var r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r),t&=t;return t},_.formatDate=function(e){function t(e){return e<10?"0"+e:e}return e.getFullYear()+"-"+t(e.getMonth()+1)+"-"+t(e.getDate())+" "+t(e.getHours())+":"+t(e.getMinutes())+":"+t(e.getSeconds())+"."+t(e.getMilliseconds())},_.searchObjDate=function(e){_.isObject(e)&&_.each(e,function(t,r){_.isObject(t)?_.searchObjDate(e[r]):_.isDate(t)&&(e[r]=_.formatDate(t))})},_.searchZZAppStyle=function(e){void 0!==e.properties.$project&&(e.project=e.properties.$project,delete e.properties.$project),void 0!==e.properties.$token&&(e.token=e.properties.$token,delete e.properties.$token)},_.formatJsonString=function(e){try{return JSON.stringify(e,null,"  ")}catch(t){return JSON.stringify(e)}},_.formatString=function(e,t){return _.isNumber(t)&&e.length>t?(sd.log("\u5b57\u7b26\u4e32\u957f\u5ea6\u8d85\u8fc7\u9650\u5236\uff0c\u5df2\u7ecf\u505a\u622a\u53d6--"+e),e.slice(0,t)):e},_.searchObjString=function(e){_.isObject(e)&&_.each(e,function(t,r){_.isObject(t)?_.searchObjString(e[r]):_.isString(t)&&(e[r]=_.formatString(t,"$element_selector"===r?1024:sd.para.max_string_length))})},_.parseSuperProperties=function(e){_.isObject(e)&&(_.each(e,function(t,r){if(_.isFunction(t))try{e[r]=t(),_.isFunction(e[r])&&(sd.log("\u60a8\u7684\u5c5e\u6027- "+r+" \u683c\u5f0f\u4e0d\u6ee1\u8db3\u8981\u6c42\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664"),delete e[r])}catch(t){delete e[r],sd.log("\u60a8\u7684\u5c5e\u6027- "+r+" \u629b\u51fa\u4e86\u5f02\u5e38\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664")}}),_.strip_sa_properties(e))},_.filterReservedProperties=function(e){_.isObject(e)&&_.each(["distinct_id","user_id","id","date","datetime","event","events","first_id","original_id","device_id","properties","second_id","time","users"],function(t,r){t in e&&(r<3?(delete e[t],sd.log("\u60a8\u7684\u5c5e\u6027- "+t+"\u662f\u4fdd\u7559\u5b57\u6bb5\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664")):sd.log("\u60a8\u7684\u5c5e\u6027- "+t+"\u662f\u4fdd\u7559\u5b57\u6bb5\uff0c\u8bf7\u907f\u514d\u5176\u4f5c\u4e3a\u5c5e\u6027\u540d"))})},_.searchConfigData=function(e){if("object"==typeof e&&e.$option){var t=e.$option;return delete e.$option,t}return{}},_.unique=function(e){for(var t,r=[],s={},a=0;a<e.length;a++)(t=e[a])in s||(s[t]=!0,r.push(t));return r},_.strip_sa_properties=function(e){return _.isObject(e)?(_.each(e,function(t,r){if(_.isArray(t)){var s=[];_.each(t,function(e){_.isString(e)?s.push(e):sd.log("\u60a8\u7684\u6570\u636e-",r,t,"\u7684\u6570\u7ec4\u91cc\u7684\u503c\u5fc5\u987b\u662f\u5b57\u7b26\u4e32,\u5df2\u7ecf\u5c06\u5176\u5220\u9664")}),0!==s.length?e[r]=s:(delete e[r],sd.log("\u5df2\u7ecf\u5220\u9664\u7a7a\u7684\u6570\u7ec4"))}_.isString(t)||_.isNumber(t)||_.isDate(t)||_.isBoolean(t)||_.isArray(t)||_.isFunction(t)||"$option"===r||(sd.log("\u60a8\u7684\u6570\u636e-",r,t,"-\u683c\u5f0f\u4e0d\u6ee1\u8db3\u8981\u6c42\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664"),delete e[r])}),e):e},_.strip_empty_properties=function(e){var t={};return _.each(e,function(e,r){null!=e&&(t[r]=e)}),t},_.utf8Encode=function(e){var t,r,s,a,i="";for(t=r=0,s=(e=(e+"").replace(/\r\n/g,"\n").replace(/\r/g,"\n")).length,a=0;a<s;a++){var n=e.charCodeAt(a),o=null;n<128?r++:o=n>127&&n<2048?String.fromCharCode(n>>6|192,63&n|128):String.fromCharCode(n>>12|224,n>>6&63|128,63&n|128),null!==o&&(r>t&&(i+=e.substring(t,r)),i+=o,t=r=a+1)}return r>t&&(i+=e.substring(t,e.length)),i},_.base64Encode=function(e){if("function"==typeof btoa)return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g,function(e,t){return String.fromCharCode("0x"+t)}));var t,r,s,a,i,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",o=0,d=0,c="",u=[];if(!(e=String(e)))return e;e=_.utf8Encode(e);do{t=(i=e.charCodeAt(o++)<<16|e.charCodeAt(o++)<<8|e.charCodeAt(o++))>>18&63,r=i>>12&63,s=i>>6&63,a=63&i,u[d++]=n.charAt(t)+n.charAt(r)+n.charAt(s)+n.charAt(a)}while(o<e.length);switch(c=u.join(""),e.length%3){case 1:c=c.slice(0,-2)+"==";break;case 2:c=c.slice(0,-1)+"="}return c},_.UUID=(e=function(){for(var e=1*new Date,t=0;e==1*new Date;)t++;return e.toString(16)+t.toString(16)},function(){var t=String(screen.height*screen.width);t=t&&/\d{5,}/.test(t)?t.toString(16):String(31242*Math.random()).replace(".","").slice(0,8);var r=e()+"-"+Math.random().toString(16).replace(".","")+"-"+function(e){var t,r,s=navigator.userAgent,a=[],i=0;function n(e,t){var r,s=0;for(r=0;r<t.length;r++)s|=a[r]<<8*r;return e^s}for(t=0;t<s.length;t++)r=s.charCodeAt(t),a.unshift(255&r),a.length>=4&&(i=n(i,a),a=[]);return a.length>0&&(i=n(i,a)),i.toString(16)}()+"-"+t+"-"+e();return r||(String(Math.random())+String(Math.random())+String(Math.random())).slice(2,15)}),_.getQueryParam=function(e,t){t=t.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]"),e=_.decodeURIComponent(e);var r=new RegExp("[\\?&]"+t+"=([^&#]*)").exec(e);return null===r||r&&"string"!=typeof r[1]&&r[1].length?"":_.decodeURIComponent(r[1])},_.urlParse=function(e){var t=function(e){this._fields={Username:4,Password:5,Port:7,Protocol:2,Host:6,Path:8,URL:0,QueryString:9,Fragment:10},this._values={},this._regex=null,this._regex=/^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/,void 0!==e&&this._parse(e)};return t.prototype.setUrl=function(e){this._parse(e)},t.prototype._initValues=function(){for(var e in this._fields)this._values[e]=""},t.prototype.addQueryString=function(e){if("object"!=typeof e)return!1;var t=this._values.QueryString||"";for(var r in e)t=new RegExp(r+"[^&]+").test(t)?t.replace(new RegExp(r+"[^&]+"),r+"="+e[r]):"&"===t.slice(-1)?t+r+"="+e[r]:""===t?r+"="+e[r]:t+"&"+r+"="+e[r];this._values.QueryString=t},t.prototype.getUrl=function(){var e="";return e+=this._values.Origin,e+=this._values.Port?":"+this._values.Port:"",e+=this._values.Path,e+=this._values.QueryString?"?"+this._values.QueryString:"",e+=this._values.Fragment?"#"+this._values.Fragment:""},t.prototype.getUrl=function(){var e="";return e+=this._values.Origin,e+=this._values.Port?":"+this._values.Port:"",e+=this._values.Path,e+=this._values.QueryString?"?"+this._values.QueryString:""},t.prototype._parse=function(e){this._initValues();var t=this._regex.exec(e);if(!t)throw"DPURLParser::_parse -> Invalid URL";for(var r in this._fields)void 0!==t[this._fields[r]]&&(this._values[r]=t[this._fields[r]]);this._values.Hostname=this._values.Host.replace(/:\d+$/,""),this._values.Origin=this._values.Protocol+"://"+this._values.Hostname},new t(e)},_.addEvent=function(){function e(t){return t&&(t.preventDefault=e.preventDefault,t.stopPropagation=e.stopPropagation,t._getPath=e._getPath),t}e._getPath=function(){var e=this;return this.path||this.composedPath&&this.composedPath()||function(){try{var t=e.target,r=[t];if(null===t||null===t.parentElement)return[];for(;null!==t.parentElement;)t=t.parentElement,r.unshift(t);return r}catch(e){return[]}}()},e.preventDefault=function(){this.returnValue=!1},e.stopPropagation=function(){this.cancelBubble=!0};(function(t,r,s){var a=!(!_.isObject(sd.para.heatmap)||!sd.para.heatmap.useCapture);if(_.isObject(sd.para.heatmap)&&void 0===sd.para.heatmap.useCapture&&"click"===r&&(a=!0),t&&t.addEventListener)t.addEventListener(r,function(t){t._getPath=e._getPath,s.call(this,t)},a);else{var i="on"+r,n=t[i];t[i]=function(t,r,s){return function(a){if(a=a||e(window.event)){a.target=a.srcElement;var i,n,o=!0;return"function"==typeof s&&(i=s(a)),n=r.call(t,a),!1!==i&&!1!==n||(o=!1),o}}}(t,s,n)}}).apply(null,arguments)},_.addHashEvent=function(e){var t="pushState"in window.history?"popstate":"hashchange";_.addEvent(window,t,e)},_.addSinglePageEvent=function(e){var t=location.href,r=window.history.pushState,s=window.history.replaceState;window.history.pushState=function(){r.apply(window.history,arguments),e(t),t=location.href},window.history.replaceState=function(){s.apply(window.history,arguments),e(t),t=location.href};var a=r?"popstate":"hashchange";_.addEvent(window,a,function(){e(t),t=location.href})},_.cookie={get:function(e){for(var t=e+"=",r=document.cookie.split(";"),s=0;s<r.length;s++){for(var a=r[s];" "==a.charAt(0);)a=a.substring(1,a.length);if(0==a.indexOf(t))return _.decodeURIComponent(a.substring(t.length,a.length))}return null},set:function(e,t,r,s,a){var i="",n="",o="";if(r=null==r?73e3:r,s=void 0===s?sd.para.cross_subdomain:s){var d=_.getCurrentDomain(location.href);"url\u89e3\u6790\u5931\u8d25"===d&&(d=""),i=d?"; domain="+d:""}if(0!==r){var c=new Date;"s"===String(r).slice(-1)?c.setTime(c.getTime()+1e3*Number(String(r).slice(0,-1))):c.setTime(c.getTime()+24*r*60*60*1e3),n="; expires="+c.toGMTString()}a&&(o="; secure"),document.cookie=e+"="+encodeURIComponent(t)+n+"; path=/"+i+o},remove:function(e,t){t=void 0===t?sd.para.cross_subdomain:t,_.cookie.set(e,"",-1,t)},getCookieName:function(e,t){var r="";if(t=t||location.href,!1===sd.para.cross_subdomain){try{r=_.URL(t).hostname}catch(e){sd.log(e)}r="string"==typeof r&&""!==r?"sajssdk_2015_"+e+"_"+r.replace(/\./g,"_"):"sajssdk_2015_root_"+e}else r="sajssdk_2015_cross_"+e;return r},getNewUser:function(){return null!==this.get("sensorsdata_is_new_user")||null!==this.get(this.getCookieName("new_user"))}},_.getElementContent=function(e,t){var r="",s="";return e.textContent?r=_.trim(e.textContent):e.innerText&&(r=_.trim(e.innerText)),r&&(r=r.replace(/[\r\n]/g," ").replace(/[ ]+/g," ").substring(0,255)),s=r||"","input"!==t&&"INPUT"!==t||("button"===e.type||"submit"===e.type?s=e.value||"":sd.para.heatmap&&"function"==typeof sd.para.heatmap.collect_input&&sd.para.heatmap.collect_input(e)&&(s=e.value||"")),s},_.getEleInfo=function(e){if(!e.target)return!1;var t=e.target,r=t.tagName.toLowerCase(),s={};return s.$element_type=r,s.$element_name=t.getAttribute("name"),s.$element_id=t.getAttribute("id"),s.$element_class_name="string"==typeof t.className?t.className:null,s.$element_target_url=t.getAttribute("href"),s.$element_content=_.getElementContent(t,r),(s=_.strip_empty_properties(s)).$url=location.href,s.$url_path=location.pathname,s.$title=document.title,s.$viewport_width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||0,s},_.localStorage={get:function(e){return window.localStorage.getItem(e)},parse:function(e){var t;try{t=JSON.parse(_.localStorage.get(e))||null}catch(e){sd.log(e)}return t},set:function(e,t){window.localStorage.setItem(e,t)},remove:function(e){window.localStorage.removeItem(e)},isSupport:function(){var e=!0;try{var t="__sensorsdatasupport__",r="testIsSupportStorage";_.localStorage.set(t,r),_.localStorage.get(t)!==r&&(e=!1),_.localStorage.remove(t)}catch(t){e=!1}return e}},_.sessionStorage={isSupport:function(){var e=!0,t="__sensorsdatasupport__",r="testIsSupportStorage";try{sessionStorage&&sessionStorage.setItem?(sessionStorage.setItem(t,r),sessionStorage.removeItem(t,r),e=!0):e=!1}catch(t){e=!1}return e}},_.isSupportCors=function(){return void 0!==window.XMLHttpRequest&&("withCredentials"in new XMLHttpRequest||"undefined"!=typeof XDomainRequest)},_.xhr=function(e){if(e)return void 0!==window.XMLHttpRequest&&"withCredentials"in new XMLHttpRequest?new XMLHttpRequest:"undefined"!=typeof XDomainRequest?new XDomainRequest:null;if(void 0!==window.XMLHttpRequest)return new XMLHttpRequest;if(window.ActiveXObject)try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){sd.log(e)}}},_.ajax=function(e){function t(e){if(!e)return"";try{return JSON.parse(e)}catch(e){return{}}}e.timeout=e.timeout||2e4,e.credentials=void 0===e.credentials||e.credentials;var r=_.xhr(e.cors);if(!r)return!1;e.type||(e.type=e.data?"POST":"GET"),e=_.extend({success:function(){},error:function(){}},e);try{"object"==typeof r&&"timeout"in r?r.timeout=e.timeout:setTimeout(function(){r.abort()},e.timeout+500)}catch(t){try{setTimeout(function(){r.abort()},e.timeout+500)}catch(e){sd.log(e)}}r.onreadystatechange=function(){try{4==r.readyState&&(r.status>=200&&r.status<300||304==r.status?e.success(t(r.responseText)):e.error(t(r.responseText),r.status),r.onreadystatechange=null,r.onload=null)}catch(e){r.onreadystatechange=null,r.onload=null}},r.open(e.type,e.url,!0);try{e.credentials&&(r.withCredentials=!0),_.isObject(e.header)&&_.each(e.header,function(e,t){r.setRequestHeader(t,e)}),e.data&&(e.cors||r.setRequestHeader("X-Requested-With","XMLHttpRequest"),"application/json"===e.contentType?r.setRequestHeader("Content-type","application/json; charset=UTF-8"):r.setRequestHeader("Content-type","application/x-www-form-urlencoded"))}catch(e){sd.log(e)}r.send(e.data||null)},_.loadScript=function(e){e=_.extend({success:function(){},error:function(){},appendCall:function(e){document.getElementsByTagName("head")[0].appendChild(e)}},e);var t=null;"css"===e.type&&((t=document.createElement("link")).rel="stylesheet",t.href=e.url),"js"===e.type&&((t=document.createElement("script")).async="async",t.setAttribute("charset","UTF-8"),t.src=e.url,t.type="text/javascript"),t.onload=t.onreadystatechange=function(){this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(e.success(),t.onload=t.onreadystatechange=null)},t.onerror=function(){e.error(),t.onerror=null},e.appendCall(t)},_.getHostname=function(e,t){t&&"string"==typeof t||(t="hostname\u89e3\u6790\u5f02\u5e38");var r=null;try{r=_.URL(e).hostname}catch(e){sd.log("getHostname\u4f20\u5165\u7684url\u53c2\u6570\u4e0d\u5408\u6cd5\uff01")}return r||t},_.getQueryParamsFromUrl=function(e){var t={},r=e.split("?")[1]||"";return r&&(t=_.getURLSearchParams("?"+r)),t},_.getURLSearchParams=function(e){for(var t=function(e){return decodeURIComponent(e)},r={},s=(e=e||"").substring(1).split("&"),a=0;a<s.length;a++){var i=s[a].indexOf("=");if(-1!==i){var n=s[a].substring(0,i),o=s[a].substring(i+1);n=t(n),o=t(o),r[n]=o}}return r},_.URL=function(e){var t,r={},s=["hash","host","hostname","href","origin","password","pathname","port","protocol","search","username"];if("function"==typeof window.URL&&function(){try{return"http://modernizr.com/"===new URL("http://modernizr.com/").href}catch(e){return!1}}())(r=new URL(e)).searchParams||(r.searchParams=(t=_.getURLSearchParams(r.search),{get:function(e){return t[e]}}));else{if(!1===/^https?:\/\/.+/.test(e))throw"Invalid URL";var a=document.createElement("a");a.href=e;for(var i=s.length-1;i>=0;i--){var n=s[i];r[n]=a[n]}r.hostname&&"string"==typeof r.pathname&&0!==r.pathname.indexOf("/")&&(r.pathname="/"+r.pathname),r.searchParams=function(){var e=_.getURLSearchParams(r.search);return{get:function(t){return e[t]}}}()}return r},_.getCurrentDomain=function(e){var t=sd.para.current_domain;switch(typeof t){case"function":var r=t();return""===r||""===_.trim(r)?"url\u89e3\u6790\u5931\u8d25":-1!==r.indexOf(".")?r:"url\u89e3\u6790\u5931\u8d25";case"string":return""===t||""===_.trim(t)?"url\u89e3\u6790\u5931\u8d25":-1!==t.indexOf(".")?t:"url\u89e3\u6790\u5931\u8d25";default:var s=_.getCookieTopLevelDomain();return""===e?"url\u89e3\u6790\u5931\u8d25":""===s?"url\u89e3\u6790\u5931\u8d25":s}},_.getCookieTopLevelDomain=function(e){var t=(e=e||window.location.hostname).split(".");if(_.isArray(t)&&t.length>=2&&!/^(\d+\.)+\d+$/.test(e))for(var r="."+t.splice(t.length-1,1);t.length>0;)if(r="."+t.splice(t.length-1,1)+r,document.cookie="sensorsdata_domain_test=true; path=/; domain="+r,-1!==document.cookie.indexOf("sensorsdata_domain_test=true")){var s=new Date;return s.setTime(s.getTime()-1e3),document.cookie="sensorsdata_domain_test=true; expires="+s.toGMTString()+"; path=/; domain="+r,r}return""},_.isReferralTraffic=function(e){return""===(e=e||document.referrer)||_.getCookieTopLevelDomain(_.getHostname(e))!==_.getCookieTopLevelDomain()},_.ry=function(e){return new _.ry.init(e)},_.ry.init=function(e){this.ele=e},_.ry.init.prototype={addClass:function(e){return-1===(" "+this.ele.className+" ").indexOf(" "+e+" ")&&(this.ele.className=this.ele.className+(""===this.ele.className?"":" ")+e),this},removeClass:function(e){var t=" "+this.ele.className+" ";return-1!==t.indexOf(" "+e+" ")&&(this.ele.className=t.replace(" "+e+" "," ").slice(1,-1)),this},hasClass:function(e){return-1!==(" "+this.ele.className+" ").indexOf(" "+e+" ")},attr:function(e,t){return"string"==typeof e&&_.isUndefined(t)?this.ele.getAttribute(e):("string"==typeof e&&(t=String(t),this.ele.setAttribute(e,t)),this)},offset:function(){var e=this.ele.getBoundingClientRect();if(e.width||e.height){var t=this.ele.ownerDocument.documentElement;return{top:e.top+window.pageYOffset-t.clientTop,left:e.left+window.pageXOffset-t.clientLeft}}return{top:0,left:0}},getSize:function(){if(!window.getComputedStyle)return{width:this.ele.offsetWidth,height:this.ele.offsetHeight};try{var e=this.ele.getBoundingClientRect();return{width:e.width,height:e.height}}catch(e){return{width:0,height:0}}},getStyle:function(e){return this.ele.currentStyle?this.ele.currentStyle[e]:this.ele.ownerDocument.defaultView.getComputedStyle(this.ele,null).getPropertyValue(e)},wrap:function(e){var t=document.createElement(e);return this.ele.parentNode.insertBefore(t,this.ele),t.appendChild(this.ele),_.ry(t)},getCssStyle:function(e){var t=this.ele.style.getPropertyValue(e);if(t)return t;var r=null;if("function"==typeof window.getMatchedCSSRules&&(r=getMatchedCSSRules(this.ele)),!r||!_.isArray(r))return null;for(var s=r.length-1;s>=0;s--){if(t=r[s].style.getPropertyValue(e))return t}},sibling:function(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e},next:function(){return this.sibling(this.ele,"nextSibling")},prev:function(e){return this.sibling(this.ele,"previousSibling")},siblings:function(e){return this.siblings((this.ele.parentNode||{}).firstChild,this.ele)},children:function(e){return this.siblings(this.ele.firstChild)},parent:function(){var e=this.ele.parentNode;return e=e&&11!==e.nodeType?e:null,_.ry(e)}},_.strToUnicode=function(e){if("string"!=typeof e)return sd.log("\u8f6c\u6362unicode\u9519\u8bef",e),e;for(var t="",r=0;r<e.length;r++)t+="\\"+e.charCodeAt(r).toString(16);return t},_.getReferrer=function(e){return"string"!=typeof(e=e||document.referrer)?"\u53d6\u503c\u5f02\u5e38_referrer\u5f02\u5e38_"+String(e):(0===e.indexOf("https://www.baidu.com/")&&(e=e.split("?")[0]),"string"==typeof(e=e.slice(0,sd.para.max_referrer_string_length))?e:"")},_.getKeywordFromReferrer=function(e){e=e||document.referrer;var t=sd.para.source_type.keyword;if(document&&"string"==typeof e){if(0===e.indexOf("http")){var r=_.getReferSearchEngine(e),s=_.getQueryParamsFromUrl(e);if(_.isEmptyObject(s))return"\u672a\u53d6\u5230\u503c";var a=null;for(var i in t)if(r===i&&"object"==typeof s)if(a=t[i],_.isArray(a))for(i=0;i<a.length;i++){var n=s[a[i]];if(n)return n}else if(s[a])return s[a];return"\u672a\u53d6\u5230\u503c"}return""===e?"\u672a\u53d6\u5230\u503c_\u76f4\u63a5\u6253\u5f00":"\u672a\u53d6\u5230\u503c_\u975ehttp\u7684url"}return"\u53d6\u503c\u5f02\u5e38_referrer\u5f02\u5e38_"+String(e)},_.getWxAdIdFromUrl=function(e){var t=_.getQueryParam(e,"gdt_vid"),r=_.getQueryParam(e,"hash_key"),s=_.getQueryParam(e,"callbacks"),a={click_id:"",hash_key:"",callbacks:""};return _.isString(t)&&t.length&&(a.click_id=16==t.length||18==t.length?t:"\u53c2\u6570\u89e3\u6790\u4e0d\u5408\u6cd5",_.isString(r)&&r.length&&(a.hash_key=r),_.isString(s)&&s.length&&(a.callbacks=s)),a},_.getReferSearchEngine=function(e){var t=_.getHostname(e);if(!t||"hostname\u89e3\u6790\u5f02\u5e38"===t)return"";sd.para.source_type.keyword;var r={baidu:[/^.*\.baidu\.com$/],bing:[/^.*\.bing\.com$/],google:[/^www\.google\.com$/,/^www\.google\.com\.[a-z]{2}$/,/^www\.google\.[a-z]{2}$/],sm:[/^m\.sm\.cn$/],so:[/^.+\.so\.com$/],sogou:[/^.*\.sogou\.com$/],yahoo:[/^.*\.yahoo\.com$/]};for(var s in r)for(var a=r[s],i=0,n=a.length;i<n;i++)if(a[i].test(t))return s;return"\u672a\u77e5\u641c\u7d22\u5f15\u64ce"},_.getSourceFromReferrer=function(){function e(e,t){for(var r=0;r<e.length;r++)if(-1!==t.split("?")[0].indexOf(e[r]))return!0}var t="("+sd.para.source_type.utm.join("|")+")\\=[^&]+",r=sd.para.source_type.search,s=sd.para.source_type.social,a=document.referrer||"",i=_.info.pageProp.url;if(i){var n=i.match(new RegExp(t));return n&&n[0]?"\u4ed8\u8d39\u5e7f\u544a\u6d41\u91cf":e(r,a)?"\u81ea\u7136\u641c\u7d22\u6d41\u91cf":e(s,a)?"\u793e\u4ea4\u7f51\u7ad9\u6d41\u91cf":""===a?"\u76f4\u63a5\u6d41\u91cf":"\u5f15\u8350\u6d41\u91cf"}return"\u83b7\u53d6url\u5f02\u5e38"},_.info={initPage:function(){var e=_.getReferrer(),t=location.href,r=_.getCurrentDomain(t);r||sd.debug.jssdkDebug("url_domain\u5f02\u5e38_"+t+"_"+r),this.pageProp={referrer:e,referrer_host:e?_.getHostname(e):"",url:t,url_host:_.getHostname(t,"url_host\u53d6\u503c\u5f02\u5e38"),url_domain:r}},pageProp:{},campaignParams:function(){var e=sd.source_channel_standard.split(" "),t="",r={};return _.isArray(sd.para.source_channel)&&sd.para.source_channel.length>0&&(e=e.concat(sd.para.source_channel),e=_.unique(e)),_.each(e,function(e){(t=_.getQueryParam(location.href,e)).length&&(r[e]=t)}),r},campaignParamsStandard:function(e,t){e=e||"",t=t||"";var r=_.info.campaignParams(),s={},a={};return _.each(r,function(r,i,n){-1!==(" "+sd.source_channel_standard+" ").indexOf(" "+i+" ")?s[e+i]=n[i]:a[t+i]=n[i]}),{$utms:s,otherUtms:a}},properties:function(){return{$timezone_offset:(new Date).getTimezoneOffset(),$screen_height:Number(screen.height)||0,$screen_width:Number(screen.width)||0,$lib:"js",$lib_version:String(sd.lib_version)}},currentProps:{},register:function(e){_.extend(_.info.currentProps,e)}},_.autoExeQueue=function(){return{items:[],enqueue:function(e){this.items.push(e),this.start()},dequeue:function(){return this.items.shift()},getCurrentItem:function(){return this.items[0]},isRun:!1,start:function(){this.items.length>0&&!this.isRun&&(this.isRun=!0,this.getCurrentItem().start())},close:function(){this.dequeue(),this.isRun=!1,this.start()}}},_.trackLink=function(e,t,r){var s=null;if((e=e||{}).ele&&(s=e.ele),e.event&&(s=e.target?e.target:e.event.target),r=r||{},!s||"object"!=typeof s)return!1;if(!s.href||/^javascript/.test(s.href)||s.target||s.download||s.onclick)return sd.track(t,r),!1;function a(e){e.stopPropagation(),e.preventDefault();var a=!1;function i(){a||(a=!0,location.href=s.href)}setTimeout(i,1e3),sd.track(t,r,i)}e.event&&a(e.event),e.ele&&_.addEvent(e.ele,"click",function(e){a(e)})},_.eventEmitter=function(){this._events=[],this.pendingEvents=[]},_.eventEmitter.prototype={emit:function(e){var t=[].slice.call(arguments,1);_.each(this._events,function(r){r.type===e&&r.callback.apply(r.context,t)})},on:function(e,t,r){"function"==typeof t&&this._events.push({type:e,callback:t,context:r||this})},tempAdd:function(e,t){t&&e&&(this.pendingEvents.push({type:e,data:t}),this.pendingEvents.length>20&&this.pendingEvents.shift())},isReady:function(){var e=this;this.tempAdd=this.emit,0!==this.pendingEvents.length&&(_.each(this.pendingEvents,function(t){e.emit(t.type,t.data)}),this.pendingEvents=[])}},_.rot13obfs=function(e,t){t="number"==typeof t?t:13;for(var r=(e=String(e)).split(""),s=0,a=r.length;s<a;s++){r[s].charCodeAt(0)<126&&(r[s]=String.fromCharCode((r[s].charCodeAt(0)+t)%126))}return r.join("")},_.rot13defs=function(e){e=String(e);return _.rot13obfs(e,113)},_.setCssStyle=function(e){var t=document.createElement("style");t.type="text/css";try{t.appendChild(document.createTextNode(e))}catch(r){t.styleSheet.cssText=e}var r=document.getElementsByTagName("head")[0],s=document.getElementsByTagName("script")[0];r?r.children.length?r.insertBefore(t,r.children[0]):r.appendChild(t):s.parentNode.insertBefore(t,s)},_.isIOS=function(){return!!navigator.userAgent.match(/iPhone|iPad|iPod/i)},_.getIOSVersion=function(){try{var e=navigator.appVersion.match(/OS (\d+)[._](\d+)[._]?(\d+)?/);return e&&e[1]?Number.parseInt(e[1],10):""}catch(e){return""}}}(),sd.para_default={preset_properties:{latest_utm:!0,latest_traffic_source_type:!0,latest_search_keyword:!0,latest_referrer:!0,latest_referrer_host:!1,latest_landing_page:!1,latest_wx_ad_click_id:!1,url:!1,title:!1},img_use_crossorigin:!1,name:"sa",max_referrer_string_length:200,max_string_length:500,cross_subdomain:!0,show_log:!0,is_debug:!1,debug_mode:!1,debug_mode_upload:!1,session_time:0,use_client_time:!1,source_channel:[],send_type:"image",vtrack_ignore:{},auto_init:!0,is_track_single_page:!1,is_single_page:!1,batch_send:!1,source_type:{},callback_timeout:200,datasend_timeout:3e3,queue_timeout:300,is_track_device_id:!1,ignore_oom:!0,app_js_bridge:!1},sd.addReferrerHost=function(e){_.isObject(e.properties)&&(e.properties.$first_referrer&&(e.properties.$first_referrer_host=_.getHostname(e.properties.$first_referrer,"\u53d6\u503c\u5f02\u5e38")),"track"!==e.type&&"track_signup"!==e.type||("$referrer"in e.properties&&(e.properties.$referrer_host=""===e.properties.$referrer?"":_.getHostname(e.properties.$referrer,"\u53d6\u503c\u5f02\u5e38")),sd.para.preset_properties.latest_referrer&&sd.para.preset_properties.latest_referrer_host&&(e.properties.$latest_referrer_host=""===e.properties.$latest_referrer?"":_.getHostname(e.properties.$latest_referrer,"\u53d6\u503c\u5f02\u5e38"))))},sd.addPropsHook=function(e){sd.para.preset_properties&&sd.para.preset_properties.url&&("track"===e.type||"track_signup"===e.type)&&void 0===e.properties.$url&&(e.properties.$url=window.location.href),sd.para.preset_properties&&sd.para.preset_properties.title&&("track"===e.type||"track_signup"===e.type)&&void 0===e.properties.$title&&(e.properties.$title=document.title)},sd.initPara=function(e){sd.para=e||sd.para||{};var t,r={};if(_.isObject(sd.para.is_track_latest))for(var s in sd.para.is_track_latest)r["latest_"+s]=sd.para.is_track_latest[s];for(t in sd.para.preset_properties=_.extend({},sd.para_default.preset_properties,r,sd.para.preset_properties||{}),sd.para.preset_properties.latest_wx_ad_click_id&&(sd.para.preset_properties.url=!0),sd.para_default)void 0===sd.para[t]&&(sd.para[t]=sd.para_default[t]);"string"==typeof sd.para.server_url&&"://"===sd.para.server_url.slice(0,3)&&(sd.para.server_url=location.protocol.slice(-1)+sd.para.server_url),"string"==typeof sd.para.web_url&&"://"===sd.para.web_url.slice(0,3)&&(sd.para.web_url=location.protocol.slice(-1)+sd.para.web_url),"image"!==sd.para.send_type&&"ajax"!==sd.para.send_type&&"beacon"!==sd.para.send_type&&(sd.para.send_type="image"),sd.bridge.initPara(),sd.bridge.initState();var a={datasend_timeout:6e3,send_interval:6e3,one_send_max_length:6};_.localStorage.isSupport()&&_.isSupportCors()&&"object"==typeof localStorage?!0===sd.para.batch_send?(sd.para.batch_send=_.extend({},a),sd.para.use_client_time=!0):"object"==typeof sd.para.batch_send&&(sd.para.use_client_time=!0,sd.para.batch_send=_.extend({},a,sd.para.batch_send)):sd.para.batch_send=!1;var i=["utm_source","utm_medium","utm_campaign","utm_content","utm_term"],n=["www.baidu.","m.baidu.","m.sm.cn","so.com","sogou.com","youdao.com","google.","yahoo.com/","bing.com/","ask.com/"],o=["weibo.com","renren.com","kaixin001.com","douban.com","qzone.qq.com","zhihu.com","tieba.baidu.com","weixin.qq.com"],d={baidu:["wd","word","kw","keyword"],google:"q",bing:"q",yahoo:"p",sogou:["query","keyword"],so:"q",sm:"q"};"object"==typeof sd.para.source_type&&(sd.para.source_type.utm=_.isArray(sd.para.source_type.utm)?sd.para.source_type.utm.concat(i):i,sd.para.source_type.search=_.isArray(sd.para.source_type.search)?sd.para.source_type.search.concat(n):n,sd.para.source_type.social=_.isArray(sd.para.source_type.social)?sd.para.source_type.social.concat(o):o,sd.para.source_type.keyword=_.isObject(sd.para.source_type.keyword)?_.extend(d,sd.para.source_type.keyword):d);var c=["mark","/mark","strong","b","em","i","u","abbr","ins","del","s","sup"];if(_.isObject(sd.para.heatmap)&&(sd.para.heatmap.clickmap=sd.para.heatmap.clickmap||"default",sd.para.heatmap.scroll_notice_map=sd.para.heatmap.scroll_notice_map||"default",sd.para.heatmap.scroll_delay_time=sd.para.heatmap.scroll_delay_time||4e3,sd.para.heatmap.scroll_event_duration=sd.para.heatmap.scroll_event_duration||18e3,sd.para.heatmap.renderRefreshTime=sd.para.heatmap.renderRefreshTime||1e3,sd.para.heatmap.loadTimeout=sd.para.heatmap.loadTimeout||1e3,_.isObject(sd.para.heatmap.collect_tags)?!0===sd.para.heatmap.collect_tags.div?sd.para.heatmap.collect_tags.div={ignore_tags:c}:_.isObject(sd.para.heatmap.collect_tags.div)?sd.para.heatmap.collect_tags.div.ignore_tags?_.isArray(sd.para.heatmap.collect_tags.div.ignore_tags)||(sd.log("ignore_tags \u53c2\u6570\u5fc5\u987b\u662f\u6570\u7ec4\u683c\u5f0f"),sd.para.heatmap.collect_tags.div.ignore_tags=c):sd.para.heatmap.collect_tags.div.ignore_tags=c:sd.para.heatmap.collect_tags.div=!1:sd.para.heatmap.collect_tags={div:!1}),"object"==typeof sd.para.server_url&&sd.para.server_url.length)for(t=0;t<sd.para.server_url.length;t++)/sa\.gif[^\/]*$/.test(sd.para.server_url[t])||(sd.para.server_url[t]=sd.para.server_url[t].replace(/\/sa$/,"/sa.gif").replace(/(\/sa)(\?[^\/]+)$/,"/sa.gif$2"));else/sa\.gif[^\/]*$/.test(sd.para.server_url)||(sd.para.server_url=sd.para.server_url.replace(/\/sa$/,"/sa.gif").replace(/(\/sa)(\?[^\/]+)$/,"/sa.gif$2"));"string"==typeof sd.para.server_url&&(sd.para.debug_mode_url=sd.para.debug_mode_url||sd.para.server_url.replace("sa.gif","debug")),!0===sd.para.noCache?sd.para.noCache="?"+(new Date).getTime():sd.para.noCache="",sd.para.callback_timeout>sd.para.datasend_timeout&&(sd.para.datasend_timeout=sd.para.callback_timeout),sd.para.callback_timeout>sd.para.queue_timeout&&(sd.para.queue_timeout=sd.para.callback_timeout),sd.para.queue_timeout>sd.para.datasend_timeout&&(sd.para.datasend_timeout=sd.para.queue_timeout)},sd.readyState={state:0,historyState:[],stateType:{1:"1-init\u672a\u5f00\u59cb",2:"2-init\u5f00\u59cb",3:"3-store\u5b8c\u6210"},getState:function(){return this.historyState.join("\n")},setState:function(e){String(e)in this.stateType&&(this.state=e),this.historyState.push(this.stateType[e])}},sd.setPreConfig=function(e){sd.para=e.para,sd._q=e._q},sd.setInitVar=function(){sd._t=sd._t||1*new Date,sd.lib_version="1.15.20",sd.is_first_visitor=!1,sd.source_channel_standard="utm_source utm_medium utm_campaign utm_content utm_term"},sd.log=function(){if((_.sessionStorage.isSupport()&&"true"===sessionStorage.getItem("sensorsdata_jssdk_debug")||sd.para.show_log)&&(!_.isObject(arguments[0])||!0!==sd.para.show_log&&"string"!==sd.para.show_log&&!1!==sd.para.show_log||(arguments[0]=_.formatJsonString(arguments[0])),"object"==typeof console&&console.log))try{return console.log.apply(console,arguments)}catch(e){console.log(arguments[0])}},sd.enableLocalLog=function(){if(_.sessionStorage.isSupport())try{sessionStorage.setItem("sensorsdata_jssdk_debug","true")}catch(e){sd.log("enableLocalLog error: "+e.message)}},sd.disableLocalLog=function(){_.sessionStorage.isSupport()&&sessionStorage.removeItem("sensorsdata_jssdk_debug")},sd.debug={distinct_id:function(){},jssdkDebug:function(){},_sendDebug:function(e){sd.track("_sensorsdata2019_debug",{_jssdk_debug_info:e})},apph5:function(e){var t="app_h5\u6253\u901a\u5931\u8d25-",r={1:t+"use_app_track\u4e3afalse",2:t+"Android\u6216\u8005iOS\uff0c\u6ca1\u6709\u66b4\u9732\u76f8\u5e94\u65b9\u6cd5",3.1:t+"Android\u6821\u9a8cserver_url\u5931\u8d25",3.2:t+"iOS\u6821\u9a8cserver_url\u5931\u8d25",4.1:t+"H5 \u6821\u9a8c iOS server_url \u5931\u8d25",4.2:t+"H5 \u6821\u9a8c Android server_url \u5931\u8d25"},s=e.output,a=e.step,i=e.data||"";"all"!==s&&"console"!==s||sd.log(r[a]),("all"===s||"code"===s)&&_.isObject(sd.para.is_debug)&&sd.para.is_debug.apph5&&(i.type&&"profile"===i.type.slice(0,7)||(i.properties._jssdk_debug_info="apph5-"+String(a)))},defineMode:function(e){var t={1:{title:"\u5f53\u524d\u9875\u9762\u65e0\u6cd5\u8fdb\u884c\u53ef\u89c6\u5316\u5168\u57cb\u70b9",message:"App SDK \u4e0e Web JS SDK \u6ca1\u6709\u8fdb\u884c\u6253\u901a\uff0c\u8bf7\u8054\u7cfb\u8d35\u65b9\u6280\u672f\u4eba\u5458\u4fee\u6b63 App SDK \u7684\u914d\u7f6e\uff0c\u8be6\u7ec6\u4fe1\u606f\u8bf7\u67e5\u770b\u6587\u6863\u3002",link_text:"\u914d\u7f6e\u6587\u6863",link_url:"https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html"},2:{title:"\u5f53\u524d\u9875\u9762\u65e0\u6cd5\u8fdb\u884c\u53ef\u89c6\u5316\u5168\u57cb\u70b9",message:"App SDK \u4e0e Web JS SDK \u6ca1\u6709\u8fdb\u884c\u6253\u901a\uff0c\u8bf7\u8054\u7cfb\u8d35\u65b9\u6280\u672f\u4eba\u5458\u4fee\u6b63 Web JS SDK \u7684\u914d\u7f6e\uff0c\u8be6\u7ec6\u4fe1\u606f\u8bf7\u67e5\u770b\u6587\u6863\u3002",link_text:"\u914d\u7f6e\u6587\u6863",link_url:"https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html"},3:{title:"\u5f53\u524d\u9875\u9762\u65e0\u6cd5\u8fdb\u884c\u53ef\u89c6\u5316\u5168\u57cb\u70b9",message:"Web JS SDK \u6ca1\u6709\u5f00\u542f\u5168\u57cb\u70b9\u914d\u7f6e\uff0c\u8bf7\u8054\u7cfb\u8d35\u65b9\u5de5\u4f5c\u4eba\u5458\u4fee\u6b63 SDK \u7684\u914d\u7f6e\uff0c\u8be6\u7ec6\u4fe1\u606f\u8bf7\u67e5\u770b\u6587\u6863\u3002",link_text:"\u914d\u7f6e\u6587\u6863",link_url:"https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_web_all-1573964.html"},4:{title:"\u5f53\u524d\u9875\u9762\u65e0\u6cd5\u8fdb\u884c\u53ef\u89c6\u5316\u5168\u57cb\u70b9",message:"Web JS SDK \u914d\u7f6e\u7684\u6570\u636e\u6821\u9a8c\u5730\u5740\u4e0e App SDK \u914d\u7f6e\u7684\u6570\u636e\u6821\u9a8c\u5730\u5740\u4e0d\u4e00\u81f4\uff0c\u8bf7\u8054\u7cfb\u8d35\u65b9\u5de5\u4f5c\u4eba\u5458\u4fee\u6b63 SDK \u7684\u914d\u7f6e\uff0c\u8be6\u7ec6\u4fe1\u606f\u8bf7\u67e5\u770b\u6587\u6863\u3002",link_text:"\u914d\u7f6e\u6587\u6863",link_url:"https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html"}};return!(!e||!t[e])&&t[e]}};var commonWays={setOnlineState:function(e){if(!0===e&&_.isObject(sd.para.jsapp)&&"function"==typeof sd.para.jsapp.getData){sd.para.jsapp.isOnline=!0;var t=sd.para.jsapp.getData();_.isArray(t)&&t.length>0&&_.each(t,function(e){_.isJSONString(e)&&sd.sendState.pushSend(JSON.parse(e))})}else sd.para.jsapp.isOnline=!1},autoTrackIsUsed:!1,isReady:function(e){e()},getUtm:function(){return _.info.campaignParams()},getStayTime:function(){return(new Date-sd._t)/1e3},setProfileLocal:function(e){if(!_.localStorage.isSupport())return sd.setProfile(e),!1;if(!_.isObject(e)||_.isEmptyObject(e))return!1;var t=_.localStorage.parse("sensorsdata_2015_jssdk_profile"),r=!1;if(_.isObject(t)&&!_.isEmptyObject(t)){for(var s in e)!(s in t&&t[s]!==e[s])&&s in t||(t[s]=e[s],r=!0);r&&(_.localStorage.set("sensorsdata_2015_jssdk_profile",JSON.stringify(t)),sd.setProfile(e))}else _.localStorage.set("sensorsdata_2015_jssdk_profile",JSON.stringify(e)),sd.setProfile(e)},setInitReferrer:function(){var e=_.getReferrer();sd.setOnceProfile({_init_referrer:e,_init_referrer_host:_.info.pageProp.referrer_host})},setSessionReferrer:function(){var e=_.getReferrer();store.setSessionPropsOnce({_session_referrer:e,_session_referrer_host:_.info.pageProp.referrer_host})},setDefaultAttr:function(){_.info.register({_current_url:location.href,_referrer:_.getReferrer(),_referring_host:_.info.pageProp.referrer_host})},trackHeatMap:function(e,t,r){if("object"==typeof e&&e.tagName){var s=e.tagName.toLowerCase(),a=e.parentNode.tagName.toLowerCase();"button"===s||"a"===s||"a"===a||"button"===a||"input"===s||"textarea"===s||_.hasAttribute(e,"data-sensors-click")||heatmap.start(null,e,s,t,r)}},trackAllHeatMap:function(e,t,r){if("object"==typeof e&&e.tagName){var s=e.tagName.toLowerCase();heatmap.start(null,e,s,t,r)}},autoTrackSinglePage:function(e,t){if(this.autoTrackIsUsed)var r=_.info.pageProp.url;else r=_.info.pageProp.referrer;function s(){var e=_.info.campaignParams(),t={};return _.each(e,function(e,r,s){-1!==(" "+sd.source_channel_standard+" ").indexOf(" "+r+" ")?t["$"+r]=s[r]:t[r]=s[r]}),t}function a(e,t){sd.track("$pageview",_.extend({$referrer:r,$url:location.href,$url_path:location.pathname,$title:document.title},e,s()),t),r=location.href}e=_.isObject(e)?e:{},e=_.isObject(e)?e:{},sd.is_first_visitor&&!e.not_set_profile&&(sd.setOnceProfile(_.extend({$first_visit_time:new Date,$first_referrer:_.getReferrer(),$first_browser_language:navigator.language||"\u53d6\u503c\u5f02\u5e38",$first_browser_charset:"string"==typeof document.charset?document.charset.toUpperCase():"\u53d6\u503c\u5f02\u5e38",$first_traffic_source_type:_.getSourceFromReferrer(),$first_search_keyword:_.getKeywordFromReferrer()},s())),sd.is_first_visitor=!1),e.not_set_profile&&delete e.not_set_profile,a(e,t),this.autoTrackSinglePage=a},autoTrackWithoutProfile:function(e,t){e=_.isObject(e)?e:{},this.autoTrack(_.extend(e,{not_set_profile:!0}),t)},autoTrack:function(e,t){e=_.isObject(e)?e:{};var r=_.info.campaignParams(),s={};_.each(r,function(e,t,r){-1!==(" "+sd.source_channel_standard+" ").indexOf(" "+t+" ")?s["$"+t]=r[t]:s[t]=r[t]}),sd.is_first_visitor&&!e.not_set_profile&&(sd.setOnceProfile(_.extend({$first_visit_time:new Date,$first_referrer:_.getReferrer(),$first_browser_language:navigator.language||"\u53d6\u503c\u5f02\u5e38",$first_browser_charset:"string"==typeof document.charset?document.charset.toUpperCase():"\u53d6\u503c\u5f02\u5e38",$first_traffic_source_type:_.getSourceFromReferrer(),$first_search_keyword:_.getKeywordFromReferrer()},s)),sd.is_first_visitor=!1),e.not_set_profile&&delete e.not_set_profile;var a=location.href;sd.para.is_single_page&&_.addHashEvent(function(){var r=_.getReferrer(a);sd.track("$pageview",_.extend({$referrer:r,$url:location.href,$url_path:location.pathname,$title:document.title},s,e),t),a=location.href}),sd.track("$pageview",_.extend({$referrer:_.getReferrer(),$url:location.href,$url_path:location.pathname,$title:document.title},s,e),t),this.autoTrackIsUsed=!0},getAnonymousID:function(){return _.isEmptyObject(sd.store._state)?"\u8bf7\u5148\u521d\u59cb\u5316SDK":sd.store._state._first_id||sd.store._state.first_id||sd.store._state._distinct_id||sd.store._state.distinct_id},setPlugin:function(e){if(!_.isObject(e))return!1;_.each(e,function(e,t){_.isFunction(e)&&(_.isObject(window.SensorsDataWebJSSDKPlugin)&&window.SensorsDataWebJSSDKPlugin[t]?e(window.SensorsDataWebJSSDKPlugin[t]):sd.log(t+"\u6ca1\u6709\u83b7\u53d6\u5230,\u8bf7\u67e5\u9605\u6587\u6863\uff0c\u8c03\u6574"+t+"\u7684\u5f15\u5165\u987a\u5e8f\uff01"))})},useModulePlugin:function(){sd.use.apply(sd,arguments)},useAppPlugin:function(){this.setPlugin.apply(this,arguments)}};function BatchSend(){this.sendingData=0}sd.quick=function(){var e=Array.prototype.slice.call(arguments),t=e[0],r=e.slice(1);if("string"==typeof t&&commonWays[t])return commonWays[t].apply(commonWays,r);"function"==typeof t?t.apply(sd,r):sd.log("quick\u65b9\u6cd5\u4e2d\u6ca1\u6709\u8fd9\u4e2a\u529f\u80fd"+e[0])},sd.use=function(e,t){_.isObject(sd.modules)&&_.isObject(sd.modules[e])&&_.isFunction(sd.modules[e].init)&&(t=t||{},sd.modules[e].init(sd,t))},sd.track=function(e,t,r){saEvent.check({event:e,properties:t})&&saEvent.send({type:"track",event:e,properties:t},r)},sd.trackLink=function(e,t,r){"object"==typeof e&&e.tagName?_.trackLink({ele:e},t,r):"object"==typeof e&&e.target&&e.event&&_.trackLink(e,t,r)},sd.trackLinks=function(e,t,r){return r=r||{},!(!e||"object"!=typeof e)&&(!(!e.href||/^javascript/.test(e.href)||e.target)&&void _.addEvent(e,"click",function(s){s.preventDefault();var a=!1;function i(){a||(a=!0,location.href=e.href)}setTimeout(i,1e3),sd.track(t,r,i)}))},sd.setProfile=function(e,t){saEvent.check({propertiesMust:e})&&saEvent.send({type:"profile_set",properties:e},t)},sd.setOnceProfile=function(e,t){saEvent.check({propertiesMust:e})&&saEvent.send({type:"profile_set_once",properties:e},t)},sd.appendProfile=function(e,t){saEvent.check({propertiesMust:e})&&(_.each(e,function(t,r){_.isString(t)?e[r]=[t]:_.isArray(t)?e[r]=t:(delete e[r],sd.log("appendProfile\u5c5e\u6027\u7684\u503c\u5fc5\u987b\u662f\u5b57\u7b26\u4e32\u6216\u8005\u6570\u7ec4"))}),_.isEmptyObject(e)||saEvent.send({type:"profile_append",properties:e},t))},sd.incrementProfile=function(e,t){var r=e;_.isString(e)&&((e={})[r]=1),saEvent.check({propertiesMust:e})&&(!function(e){for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t)&&!/-*\d+/.test(String(e[t])))return!1;return!0}(e)?sd.log("profile_increment\u7684\u503c\u53ea\u80fd\u662f\u6570\u5b57"):saEvent.send({type:"profile_increment",properties:e},t))},sd.deleteProfile=function(e){saEvent.send({type:"profile_delete"},e),store.set("distinct_id",_.UUID()),store.set("first_id","")},sd.unsetProfile=function(e,t){var r=e,s={};_.isString(e)&&(e=[]).push(r),_.isArray(e)?(_.each(e,function(e){_.isString(e)?s[e]=!0:sd.log("profile_unset\u7ed9\u7684\u6570\u7ec4\u91cc\u9762\u7684\u503c\u5fc5\u987b\u65f6string,\u5df2\u7ecf\u8fc7\u6ee4\u6389",e)}),saEvent.send({type:"profile_unset",properties:s},t)):sd.log("profile_unset\u7684\u53c2\u6570\u662f\u6570\u7ec4")},sd.identify=function(e,t){"number"==typeof e&&(e=String(e));var r=store.getFirstId();if(void 0===e){var s=_.UUID();r?store.set("first_id",s):store.set("distinct_id",s)}else saEvent.check({distinct_id:e})?!0===t?r?store.set("first_id",e):store.set("distinct_id",e):r?store.change("first_id",e):store.change("distinct_id",e):sd.log("identify\u7684\u53c2\u6570\u5fc5\u987b\u662f\u5b57\u7b26\u4e32")},sd.trackSignup=function(e,t,r,s){if(saEvent.check({distinct_id:e,event:t,properties:r})){var a=store.getFirstId()||store.getDistinctId();store.set("distinct_id",e),saEvent.send({original_id:a,distinct_id:e,type:"track_signup",event:t,properties:r},s)}},sd.trackAbtest=function(e,t){},sd.registerPage=function(e){saEvent.check({properties:e})?_.extend(_.info.currentProps,e):sd.log("register\u8f93\u5165\u7684\u53c2\u6570\u6709\u8bef")},sd.clearAllRegister=function(e){store.clearAllProps(e)},sd.register=function(e){saEvent.check({properties:e})?store.setProps(e):sd.log("register\u8f93\u5165\u7684\u53c2\u6570\u6709\u8bef")},sd.registerOnce=function(e){saEvent.check({properties:e})?store.setPropsOnce(e):sd.log("registerOnce\u8f93\u5165\u7684\u53c2\u6570\u6709\u8bef")},sd.registerSession=function(e){saEvent.check({properties:e})?store.setSessionProps(e):sd.log("registerSession\u8f93\u5165\u7684\u53c2\u6570\u6709\u8bef")},sd.registerSessionOnce=function(e){saEvent.check({properties:e})?store.setSessionPropsOnce(e):sd.log("registerSessionOnce\u8f93\u5165\u7684\u53c2\u6570\u6709\u8bef")},sd.login=function(e,t){if("number"==typeof e&&(e=String(e)),saEvent.check({distinct_id:e})){var r=store.getFirstId(),s=store.getDistinctId();e!==s?(r||store.set("first_id",s),sd.trackSignup(e,"$SignUp",{},t)):t&&t()}else sd.log("login\u7684\u53c2\u6570\u5fc5\u987b\u662f\u5b57\u7b26\u4e32"),t&&t()},sd.logout=function(e){var t=store.getFirstId();if(t)if(store.set("first_id",""),!0===e){var r=_.UUID();store.set("distinct_id",r)}else store.set("distinct_id",t);else sd.log("\u6ca1\u6709first_id\uff0clogout\u5931\u8d25")},sd.getPresetProperties=function(){var e,t,r={$is_first_day:_.cookie.getNewUser(),$referrer:_.info.pageProp.referrer||"",$referrer_host:_.info.pageProp.referrer?_.getHostname(_.info.pageProp.referrer):"",$url:location.href,$url_path:location.pathname,$title:document.title||"",_distinct_id:store.getDistinctId()},s=_.extend({},_.info.properties(),sd.store.getProps(),(e=_.info.campaignParams(),t={},_.each(e,function(e,r,s){-1!==(" "+sd.source_channel_standard+" ").indexOf(" "+r+" ")?t["$"+r]=s[r]:t[r]=s[r]}),t),r);return sd.para.preset_properties.latest_referrer&&sd.para.preset_properties.latest_referrer_host&&(s.$latest_referrer_host=""===s.$latest_referrer?"":_.getHostname(s.$latest_referrer)),s},sd.detectMode=function(){var e={searchKeywordMatch:location.search.match(/sa-request-id=([^&#]+)/),isSeachHasKeyword:function(){var e=this.searchKeywordMatch;return e&&e[0]&&e[1]},hasKeywordHandle:function(){var e=this.searchKeywordMatch,t=location.search.match(/sa-request-type=([^&#]+)/),r=location.search.match(/sa-request-url=([^&#]+)/);heatmap.setNotice(r),_.sessionStorage.isSupport()&&(r&&r[0]&&r[1]&&sessionStorage.setItem("sensors_heatmap_url",decodeURIComponent(r[1])),sessionStorage.setItem("sensors_heatmap_id",e[1]),t&&t[0]&&t[1]?"1"===t[1]||"2"===t[1]||"3"===t[1]?(t=t[1],sessionStorage.setItem("sensors_heatmap_type",t)):t=null:t=null!==sessionStorage.getItem("sensors_heatmap_type")?sessionStorage.getItem("sensors_heatmap_type"):null),this.isReady(e[1],t)},isReady:function(e,t,r){sd.para.heatmap_url?_.loadScript({success:function(){setTimeout(function(){"undefined"!=typeof sa_jssdk_heatmap_render&&(sa_jssdk_heatmap_render(sd,e,t,r),"object"==typeof console&&"function"==typeof console.log&&(sd.heatmap_version&&sd.heatmap_version===sd.lib_version||console.log("heatmap.js\u4e0esensorsdata.js\u7248\u672c\u53f7\u4e0d\u4e00\u81f4\uff0c\u53ef\u80fd\u5b58\u5728\u98ce\u9669!")))},0)},error:function(){},type:"js",url:sd.para.heatmap_url}):sd.log("\u6ca1\u6709\u6307\u5b9aheatmap_url\u7684\u8def\u5f84")},isStoregeHasKeyword:function(){return _.sessionStorage.isSupport()&&"string"==typeof sessionStorage.getItem("sensors_heatmap_id")},storageHasKeywordHandle:function(){heatmap.setNotice(),e.isReady(sessionStorage.getItem("sensors_heatmap_id"),sessionStorage.getItem("sensors_heatmap_type"),location.href)}},t={isVtrackMode:!1,loadVtrack:function(){_.loadScript({success:function(){},error:function(){},type:"js",url:sd.para.vtrack_url?sd.para.vtrack_url:location.protocol+"//static.sensorsdata.cn/sdk/"+sd.lib_version+"/vtrack.min.js"})},messageListener:function(e){if("sa-fe"!==e.data.source)return!1;"v-track-mode"===e.data.type&&(e.data.data&&e.data.data.isVtrack&&(t.isVtrackMode=!0,t.loadVtrack()),window.removeEventListener("message",t.messageListener,!1))},removeMessageHandle:function(){window.removeEventListener&&window.removeEventListener("message",t.messageListener,!1)},verifyVtrackMode:function(){window.addEventListener&&window.addEventListener("message",t.messageListener,!1),window.parent&&window.parent.postMessage&&window.parent.postMessage({source:"sa-web-sdk",type:"v-is-vtrack",data:{}},"*")}},r=function(e){var t=sd.bridge.initDefineBridgeInfo();function r(){var e=[];t.touch_app_bridge||e.push(sd.debug.defineMode("1")),_.isObject(sd.para.app_js_bridge)||(e.push(sd.debug.defineMode("2")),t.verify_success=!1),_.isObject(sd.para.heatmap)&&"default"==sd.para.heatmap.clickmap||e.push(sd.debug.defineMode("3")),"fail"===t.verify_success&&e.push(sd.debug.defineMode("4"));var r={callType:"app_alert",data:e};SensorsData_App_Visual_Bridge&&SensorsData_App_Visual_Bridge.sensorsdata_visualized_alert_info?SensorsData_App_Visual_Bridge.sensorsdata_visualized_alert_info(JSON.stringify(r)):window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.sensorsdataNativeTracker&&window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage&&window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(JSON.stringify(r))}if(_.isObject(window.SensorsData_App_Visual_Bridge)&&window.SensorsData_App_Visual_Bridge.sensorsdata_visualized_mode&&(!0===window.SensorsData_App_Visual_Bridge.sensorsdata_visualized_mode||window.SensorsData_App_Visual_Bridge.sensorsdata_visualized_mode()))if(_.isObject(sd.para.heatmap)&&"default"==sd.para.heatmap.clickmap)if(_.isObject(sd.para.app_js_bridge)&&"success"===t.verify_success)if(e)sa_jssdk_app_define_mode(sd,e);else{var s=location.protocol;s=_.indexOf(["http:","https:"],s)>-1?s:"https:",_.loadScript({success:function(){setTimeout(function(){"undefined"!=typeof sa_jssdk_app_define_mode&&sa_jssdk_app_define_mode(sd,e)},0)},error:function(){},type:"js",url:s+"//static.sensorsdata.cn/sdk/"+sd.lib_version+"/vapph5define.min.js"})}else r();else r()};function s(){sd.readyState.setState(3),window.sensorsdata_app_call_js=function(e){e&&"visualized"==e&&("undefined"!=typeof sa_jssdk_app_define_mode?r(!0):r(!1))},r(!1),sd.bridge.app_js_bridge_v1(),_.info.initPage(),sd.para.is_track_single_page&&_.addSinglePageEvent(function(e){var t=function(t){t=t||{},e!==location.href&&(_.info.pageProp.referrer=e,sd.quick("autoTrack",_.extend({$url:location.href,$referrer:e},t)))};if("boolean"==typeof sd.para.is_track_single_page)t();else if("function"==typeof sd.para.is_track_single_page){var r=sd.para.is_track_single_page();_.isObject(r)?t(r):!0===r&&t()}}),sd.para.batch_send&&sd.batchSend.batchInterval(),sd.store.init(),sd.readyState.setState(4),sd._q&&_.isArray(sd._q)&&sd._q.length>0&&_.each(sd._q,function(e){sd[e[0]].apply(sd,Array.prototype.slice.call(e[1]))}),_.isObject(sd.para.heatmap)&&(heatmap.initHeatmap(),heatmap.initScrollmap())}e.isSeachHasKeyword()?e.hasKeywordHandle():window.parent!==self?(t.verifyVtrackMode(),setTimeout(function(){if(t.isVtrackMode)return!1;t.removeMessageHandle(),e.isStoregeHasKeyword()?e.storageHasKeywordHandle():s()},1e3)):s()},BatchSend.prototype={add:function(e){_.isObject(e)&&(this.writeStore(e),"track_signup"!==e.type&&"$pageview"!==e.event||this.sendStrategy())},remove:function(e){this.sendingData>0&&--this.sendingData,_.isArray(e)&&e.length>0&&_.each(e,function(e){_.localStorage.remove(e)})},send:function(e){var t=this,r=_.isArray(sd.para.server_url)?sd.para.server_url[0]:sd.para.server_url;_.ajax({url:r,type:"POST",data:"data_list="+encodeURIComponent(_.base64Encode(JSON.stringify(e.vals))),credentials:!1,timeout:sd.para.batch_send.datasend_timeout,cors:!0,success:function(){t.remove(e.keys)},error:function(){t.sendingData>0&&--t.sendingData}})},sendPrepare:function(e){var t=e.vals,r=sd.para.batch_send.one_send_max_length,s=t.length;if(s>0)if(s<=r)this.send({keys:e.keys,vals:t});else for(var a=0;a*r<s;a++)this.send({keys:e.keys.splice(0,r),vals:t.splice(0,r)})},sendStrategy:function(){var e=this.readStore();e.keys.length>0&&0===this.sendingData&&(this.sendingData=Math.ceil(e.vals.length/sd.para.batch_send.one_send_max_length),this.sendPrepare(e))},batchInterval:function(){var e=this;setInterval(function(){e.sendStrategy()},sd.para.batch_send.send_interval)},readStore:function(){for(var e=[],t=[],r=null,s=(new Date).getTime(),a=localStorage.length,i=0;i<a;i++){var n=localStorage.key(i);0===n.indexOf("sawebjssdk-")&&/^sawebjssdk\-\d+$/.test(n)&&((r=localStorage.getItem(n))?(r=_.safeJSONParse(r))&&_.isObject(r)?(r._flush_time=s,e.push(n),t.push(r)):(localStorage.removeItem(n),sd.log("localStorage-\u6570\u636eparse\u5f02\u5e38"+r)):(localStorage.removeItem(n),sd.log("localStorage-\u6570\u636e\u53d6\u503c\u5f02\u5e38"+r)))}return{keys:e,vals:t}},writeStore:function(e){var t=String(Math.random()).slice(2,5)+String(Math.random()).slice(2,5)+String((new Date).getTime()).slice(3);localStorage.setItem("sawebjssdk-"+t,JSON.stringify(e))}},sd.batchSend=new BatchSend;var dataSend={getSendUrl:function(e,t){var r=_.base64Encode(t),s="crc="+_.hashCode(r);return-1!==e.indexOf("?")?e+"&data="+encodeURIComponent(r)+"&ext="+encodeURIComponent(s):e+"?data="+encodeURIComponent(r)+"&ext="+encodeURIComponent(s)},getSendData:function(e){var t=_.base64Encode(e),r="crc="+_.hashCode(t);return"data="+encodeURIComponent(t)+"&ext="+encodeURIComponent(r)},getInstance:function(e){var t=new(this[this.getSendType(e)])(e),r=t.start;return t.start=function(){_.isObject(sd.para.is_debug)&&sd.para.is_debug.storage&&sd.store.requests&&sd.store.requests.push({name:this.server_url,initiatorType:this.img?"img":"xmlhttprequest",entryType:"resource",requestData:this.data});var e=this;r.apply(this,arguments),setTimeout(function(){e.isEnd(!0)},sd.para.callback_timeout)},t.end=function(){this.callback&&this.callback();var e=this;setTimeout(function(){e.lastClear&&e.lastClear()},sd.para.datasend_timeout-sd.para.callback_timeout)},t.isEnd=function(e){if(!this.received){this.received=!0,this.end();var t=this;e?sd.para.queue_timeout-sd.para.callback_timeout<=0?t.close():setTimeout(function(){t.close()},sd.para.queue_timeout-sd.para.callback_timeout):t.close()}},t},getSendType:function(e){var t=["image","ajax","beacon"],r=t[0];return"beacon"===(r=e.config&&_.indexOf(t,e.config.send_type)>-1?e.config.send_type:sd.para.send_type)&&"function"!=typeof navigator.sendBeacon&&(r="image"),"ajax"===r&&!1===_.isSupportCors()&&(r="image"),r},image:function(e){this.callback=e.callback,this.img=document.createElement("img"),this.img.width=1,this.img.height=1,sd.para.img_use_crossorigin&&(this.img.crossOrigin="anonymous"),this.data=e.data,this.server_url=dataSend.getSendUrl(e.server_url,e.data)}};dataSend.image.prototype.start=function(){var e=this;sd.para.ignore_oom&&(this.img.onload=function(){this.onload=null,this.onerror=null,this.onabort=null,e.isEnd()},this.img.onerror=function(){this.onload=null,this.onerror=null,this.onabort=null,e.isEnd()},this.img.onabort=function(){this.onload=null,this.onerror=null,this.onabort=null,e.isEnd()}),this.img.src=this.server_url},dataSend.image.prototype.lastClear=function(){this.img.src=""},dataSend.ajax=function(e){this.callback=e.callback,this.server_url=e.server_url,this.data=dataSend.getSendData(e.data)},dataSend.ajax.prototype.start=function(){var e=this;_.ajax({url:this.server_url,type:"POST",data:this.data,credentials:!1,timeout:sd.para.datasend_timeout,cors:!0,success:function(){e.isEnd()},error:function(){e.isEnd()}})},dataSend.beacon=function(e){this.callback=e.callback,this.server_url=e.server_url,this.data=dataSend.getSendData(e.data)},dataSend.beacon.prototype.start=function(){var e=this;"object"==typeof navigator&&"function"==typeof navigator.sendBeacon&&navigator.sendBeacon(this.server_url,this.data),setTimeout(function(){e.isEnd()},40)};var sendState={};sd.sendState=sendState,sd.events=new _.eventEmitter,sendState.queue=_.autoExeQueue(),sendState.requestData=null,sendState.getSendCall=function(e,t,r){if(sd.is_heatmap_render_mode)return!1;if(sd.readyState.state<3)return sd.log("\u521d\u59cb\u5316\u6ca1\u6709\u5b8c\u6210"),!1;e._track_id=Number(String(Math.random()).slice(2,5)+String(Math.random()).slice(2,4)+String((new Date).getTime()).slice(-4)),sd.para.use_client_time&&(e._flush_time=(new Date).getTime());var s=e;if(e=JSON.stringify(e),this.requestData={data:s,config:t,callback:r},sd.events.tempAdd("send",s),!sd.para.app_js_bridge&&sd.para.batch_send&&localStorage.length<200)return sd.log(s),sd.batchSend.add(this.requestData.data),!1;sd.bridge.dataSend(s,this,r),sd.log(s)},sendState.prepareServerUrl=function(){if("object"==typeof this.requestData.config&&this.requestData.config.server_url)this.sendCall(this.requestData.config.server_url,this.requestData.callback);else if(_.isArray(sd.para.server_url))for(var e=0;e<sd.para.server_url.length;e++)this.sendCall(sd.para.server_url[e]);else sd.para.server_url&&this.sendCall(sd.para.server_url,this.requestData.callback)},sendState.sendCall=function(e,t){var r={server_url:e,data:JSON.stringify(this.requestData.data),callback:t,config:this.requestData.config};_.isObject(sd.para.jsapp)&&!sd.para.jsapp.isOnline&&"function"==typeof sd.para.jsapp.setData?(delete r.callback,r=JSON.stringify(r),sd.para.jsapp.setData(r)):this.pushSend(r)},sendState.pushSend=function(e){var t=dataSend.getInstance(e),r=this;t.close=function(){r.queue.close()},this.queue.enqueue(t)};var saEvent={};sd.saEvent=saEvent,saEvent.checkOption={regChecks:{regName:/^((?!^distinct_id$|^original_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$)[a-zA-Z_$][a-zA-Z\d_$]{0,99})$/i},checkPropertiesKey:function(e){var t=this,r=!0;return _.each(e,function(e,s){t.regChecks.regName.test(s)||(r=!1)}),r},check:function(e,t){return"string"==typeof this[e]?this[this[e]](t):_.isFunction(this[e])?this[e](t):void 0},str:function(e){return!!_.isString(e)||(sd.log("\u8bf7\u68c0\u67e5\u53c2\u6570\u683c\u5f0f,\u5fc5\u987b\u662f\u5b57\u7b26\u4e32"),!0)},properties:function(e){return _.strip_sa_properties(e),!e||(_.isObject(e)?!!this.checkPropertiesKey(e)||(sd.log("properties \u91cc\u7684\u81ea\u5b9a\u4e49\u5c5e\u6027\u540d\u9700\u8981\u662f\u5408\u6cd5\u7684\u53d8\u91cf\u540d\uff0c\u4e0d\u80fd\u4ee5\u6570\u5b57\u5f00\u5934\uff0c\u4e14\u53ea\u5305\u542b\uff1a\u5927\u5c0f\u5199\u5b57\u6bcd\u3001\u6570\u5b57\u3001\u4e0b\u5212\u7ebf\uff0c\u81ea\u5b9a\u4e49\u5c5e\u6027\u4e0d\u80fd\u4ee5 $ \u5f00\u5934"),!0):(sd.log("properties\u53ef\u4ee5\u6ca1\u6709\uff0c\u4f46\u6709\u7684\u8bdd\u5fc5\u987b\u662f\u5bf9\u8c61"),!0))},propertiesMust:function(e){return _.strip_sa_properties(e),void 0===e||!_.isObject(e)||_.isEmptyObject(e)?(sd.log("properties\u5fc5\u987b\u662f\u5bf9\u8c61\u4e14\u6709\u503c"),!0):!!this.checkPropertiesKey(e)||(sd.log("properties \u91cc\u7684\u81ea\u5b9a\u4e49\u5c5e\u6027\u540d\u9700\u8981\u662f\u5408\u6cd5\u7684\u53d8\u91cf\u540d\uff0c\u4e0d\u80fd\u4ee5\u6570\u5b57\u5f00\u5934\uff0c\u4e14\u53ea\u5305\u542b\uff1a\u5927\u5c0f\u5199\u5b57\u6bcd\u3001\u6570\u5b57\u3001\u4e0b\u5212\u7ebf\uff0c\u81ea\u5b9a\u4e49\u5c5e\u6027\u4e0d\u80fd\u4ee5 $ \u5f00\u5934"),!0)},event:function(e){return!(!_.isString(e)||!this.regChecks.regName.test(e))||(sd.log("\u8bf7\u68c0\u67e5\u53c2\u6570\u683c\u5f0f\uff0ceventName \u5fc5\u987b\u662f\u5b57\u7b26\u4e32\uff0c\u4e14\u9700\u662f\u5408\u6cd5\u7684\u53d8\u91cf\u540d\uff0c\u5373\u4e0d\u80fd\u4ee5\u6570\u5b57\u5f00\u5934\uff0c\u4e14\u53ea\u5305\u542b\uff1a\u5927\u5c0f\u5199\u5b57\u6bcd\u3001\u6570\u5b57\u3001\u4e0b\u5212\u7ebf\u548c $,\u5176\u4e2d\u4ee5 $ \u5f00\u5934\u7684\u8868\u660e\u662f\u7cfb\u7edf\u7684\u4fdd\u7559\u5b57\u6bb5\uff0c\u81ea\u5b9a\u4e49\u4e8b\u4ef6\u540d\u8bf7\u4e0d\u8981\u4ee5 $ \u5f00\u5934"),!0)},test_id:"str",group_id:"str",distinct_id:function(e){return!(!_.isString(e)||!/^.{1,255}$/.test(e))||(sd.log("distinct_id\u5fc5\u987b\u662f\u4e0d\u80fd\u4e3a\u7a7a\uff0c\u4e14\u5c0f\u4e8e255\u4f4d\u7684\u5b57\u7b26\u4e32"),!1)}},saEvent.check=function(e){for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t)&&!this.checkOption.check(t,e[t]))return!1;return!0},saEvent.send=function(e,t){var r={distinct_id:store.getDistinctId(),lib:{$lib:"js",$lib_method:"code",$lib_version:String(sd.lib_version)},properties:{}};_.isObject(e)&&_.isObject(e.properties)&&!_.isEmptyObject(e.properties)&&e.properties.$lib_detail&&(r.lib.$lib_detail=e.properties.$lib_detail,delete e.properties.$lib_detail),_.extend(r,sd.store.getUnionId(),e),_.isObject(e.properties)&&!_.isEmptyObject(e.properties)&&_.extend(r.properties,e.properties),e.type&&"profile"===e.type.slice(0,7)||(r.properties=_.extend({},_.info.properties(),store.getProps(),store.getSessionProps(),_.info.currentProps,r.properties),sd.para.preset_properties.latest_referrer&&!_.isString(r.properties.$latest_referrer)&&(r.properties.$latest_referrer="\u53d6\u503c\u5f02\u5e38"),sd.para.preset_properties.latest_search_keyword&&!_.isString(r.properties.$latest_search_keyword)&&(r.properties.$latest_search_keyword="\u53d6\u503c\u5f02\u5e38"),sd.para.preset_properties.latest_traffic_source_type&&!_.isString(r.properties.$latest_traffic_source_type)&&(r.properties.$latest_traffic_source_type="\u53d6\u503c\u5f02\u5e38"),sd.para.preset_properties.latest_landing_page&&!_.isString(r.properties.$latest_landing_page)&&(r.properties.$latest_landing_page="\u53d6\u503c\u5f02\u5e38"),sd.para.preset_properties.latest_wx_ad_click_id&&!_.isString(r.properties._latest_wx_ad_click_id)&&(r.properties._latest_wx_ad_click_id="\u53d6\u503c\u5f02\u5e38",r.properties._latest_wx_ad_hash_key="\u53d6\u503c\u5f02\u5e38",r.properties._latest_wx_ad_callbacks="\u53d6\u503c\u5f02\u5e38")),r.properties.$time&&_.isDate(r.properties.$time)?(r.time=1*r.properties.$time,delete r.properties.$time):sd.para.use_client_time&&(r.time=1*new Date),_.parseSuperProperties(r.properties),_.filterReservedProperties(r.properties),_.searchObjDate(r),_.searchObjString(r),_.searchZZAppStyle(r);var s=_.searchConfigData(r.properties);saNewUser.checkIsAddSign(r),saNewUser.checkIsFirstTime(r),sd.addReferrerHost(r),sd.addPropsHook(r),!0===sd.para.debug_mode?(sd.log(r),this.debugPath(JSON.stringify(r),t)):sd.sendState.getSendCall(r,s,t)},saEvent.debugPath=function(e,t){var r=e,s="";s=-1!==sd.para.debug_mode_url.indexOf("?")?sd.para.debug_mode_url+"&data="+encodeURIComponent(_.base64Encode(e)):sd.para.debug_mode_url+"?data="+encodeURIComponent(_.base64Encode(e)),_.ajax({url:s,type:"GET",cors:!0,header:{"Dry-Run":String(sd.para.debug_mode_upload)},success:function(e){!0===_.isEmptyObject(e)?alert("debug\u6570\u636e\u53d1\u9001\u6210\u529f"+r):alert("debug\u5931\u8d25 \u9519\u8bef\u539f\u56e0"+JSON.stringify(e))}})};var store=sd.store={requests:[],_sessionState:{},_state:{distinct_id:"",first_id:"",props:{}},getProps:function(){return this._state.props||{}},getSessionProps:function(){return this._sessionState},getDistinctId:function(){return this._state._distinct_id||this._state.distinct_id},getUnionId:function(){var e={},t=this._state._first_id||this._state.first_id,r=this._state._distinct_id||this._state.distinct_id;return t&&r?(e.login_id=r,e.anonymous_id=t):e.anonymous_id=r,e},getFirstId:function(){return this._state._first_id||this._state.first_id},toState:function(e){var t=null;if(null!=e&&_.isJSONString(e))if(t=JSON.parse(e),this._state=_.extend(t),t.distinct_id){if("object"==typeof t.props){for(var r in t.props)"string"==typeof t.props[r]&&(t.props[r]=t.props[r].slice(0,sd.para.max_referrer_string_length));this.save()}}else this.set("distinct_id",_.UUID()),sd.debug.distinct_id("1",e);else this.set("distinct_id",_.UUID()),sd.debug.distinct_id("2",e)},initSessionState:function(){var e=_.cookie.get("sensorsdata2015session"),t=null;null!==e&&"object"==typeof(t=JSON.parse(e))&&(this._sessionState=t||{})},setOnce:function(e,t){e in this._state||this.set(e,t)},set:function(e,t){this._state=this._state||{},"distinct_id"===e&&this._state.distinct_id&&sd.events.tempAdd("changeDistinctId",t),this._state[e]=t,"first_id"===e?delete this._state._first_id:"distinct_id"===e&&delete this._state._distinct_id,this.save()},change:function(e,t){this._state["_"+e]=t},setSessionProps:function(e){var t=this._sessionState;_.extend(t,e),this.sessionSave(t)},setSessionPropsOnce:function(e){var t=this._sessionState;_.coverExtend(t,e),this.sessionSave(t)},setProps:function(e,t){var r={};for(var s in r=t?e:_.extend(this._state.props||{},e))"string"==typeof r[s]&&(r[s]=r[s].slice(0,sd.para.max_referrer_string_length));this.set("props",r)},setPropsOnce:function(e){var t=this._state.props||{};_.coverExtend(t,e),this.set("props",t)},clearAllProps:function(e){if(this._sessionState={},_.isArray(e)&&e.length>0)for(var t=0;t<e.length;t++)_.isString(e[t])&&-1===e[t].indexOf("latest_")&&e[t]in this._state.props&&delete this._state.props[e[t]];else for(var t in this._state.props)1!==t.indexOf("latest_")&&delete this._state.props[t];this.sessionSave({}),this.save()},sessionSave:function(e){this._sessionState=e,_.cookie.set("sensorsdata2015session",JSON.stringify(this._sessionState),0)},save:function(){var e=JSON.parse(JSON.stringify(this._state));delete e._first_id,delete e._distinct_id,_.cookie.set(this.getCookieName(),JSON.stringify(e),73e3,sd.para.cross_subdomain)},getCookieName:function(){var e="";if(!1===sd.para.cross_subdomain){try{e=_.URL(location.href).hostname}catch(e){sd.log(e)}e="string"==typeof e&&""!==e?"sa_jssdk_2015_"+e.replace(/\./g,"_"):"sa_jssdk_2015_root"}else e="sensorsdata2015jssdkcross";return e},init:function(){this.initSessionState();var e=_.UUID(),t=_.cookie.get(this.getCookieName());null===t?(sd.is_first_visitor=!0,this.set("distinct_id",e)):(_.isJSONString(t)&&JSON.parse(t).distinct_id||(sd.is_first_visitor=!0),this.toState(t)),saNewUser.setDeviceId(e),saNewUser.storeInitCheck(),saNewUser.checkIsFirstLatest()}},saNewUser={checkIsAddSign:function(e){"track"===e.type&&(_.cookie.getNewUser()?e.properties.$is_first_day=!0:e.properties.$is_first_day=!1)},is_first_visit_time:!1,checkIsFirstTime:function(e){"track"===e.type&&"$pageview"===e.event&&(this.is_first_visit_time?(e.properties.$is_first_time=!0,this.is_first_visit_time=!1):e.properties.$is_first_time=!1)},setDeviceId:function(e){var t=null,r=_.cookie.get("sensorsdata2015jssdkcross"),s={};null!=r&&_.isJSONString(r)&&(s=JSON.parse(r)).$device_id&&(t=s.$device_id),t=t||e,!0===sd.para.cross_subdomain?store.set("$device_id",t):(s.$device_id=t,_.cookie.set("sensorsdata2015jssdkcross",JSON.stringify(s),null,!0)),sd.para.is_track_device_id&&(_.info.currentProps.$device_id=t)},storeInitCheck:function(){if(sd.is_first_visitor){var e=new Date,t={h:23-e.getHours(),m:59-e.getMinutes(),s:59-e.getSeconds()};_.cookie.set(_.cookie.getCookieName("new_user"),"1",3600*t.h+60*t.m+t.s+"s"),this.is_first_visit_time=!0}else _.cookie.getNewUser()||(this.checkIsAddSign=function(e){"track"===e.type&&(e.properties.$is_first_day=!1)}),this.checkIsFirstTime=function(e){"track"===e.type&&"$pageview"===e.event&&(e.properties.$is_first_time=!1)}},checkIsFirstLatest:function(){for(var e=_.info.pageProp.url_domain,t=["$utm_source","$utm_medium","$utm_campaign","$utm_content","$utm_term"],r=store.getProps(),s=0;s<t.length;s++)t[s]in r&&delete r[t[s]];store.setProps(r,!0);var a={};if(""===e&&(e="url\u89e3\u6790\u5931\u8d25"),_.each(sd.para.preset_properties,function(t,r){if(-1===r.indexOf("latest_"))return!1;if(r=r.slice(7),t){if("utm"!==r&&"url\u89e3\u6790\u5931\u8d25"===e)"wx_ad_click_id"===r?(a._latest_wx_ad_click_id="url\u7684domain\u89e3\u6790\u5931\u8d25",a._latest_wx_ad_hash_key="url\u7684domain\u89e3\u6790\u5931\u8d25",a._latest_wx_ad_callbacks="url\u7684domain\u89e3\u6790\u5931\u8d25"):a["$latest_"+r]="url\u7684domain\u89e3\u6790\u5931\u8d25";else if(_.isReferralTraffic(document.referrer))switch(r){case"traffic_source_type":a.$latest_traffic_source_type=_.getSourceFromReferrer();break;case"referrer":a.$latest_referrer=_.info.pageProp.referrer;break;case"search_keyword":a.$latest_search_keyword=_.getKeywordFromReferrer();break;case"landing_page":a.$latest_landing_page=location.href;break;case"wx_ad_click_id":var s=_.getWxAdIdFromUrl(location.href);a._latest_wx_ad_click_id=s.click_id,a._latest_wx_ad_hash_key=s.hash_key,a._latest_wx_ad_callbacks=s.callbacks}}else if("utm"===r&&sd.store._state.props)for(var i in sd.store._state.props)(0===i.indexOf("$latest_utm")||0===i.indexOf("_latest_")&&i.indexOf("_latest_wx_ad_")<0)&&delete sd.store._state.props[i];else if(sd.store._state.props&&"$latest_"+r in sd.store._state.props)delete sd.store._state.props["$latest_"+r];else if("wx_ad_click_id"==r&&sd.store._state.props){_.each(["_latest_wx_ad_click_id","_latest_wx_ad_hash_key","_latest_wx_ad_callbacks"],function(e){e in sd.store._state.props&&delete sd.store._state.props[e]})}}),sd.register(a),sd.para.preset_properties.latest_utm){var i=_.info.campaignParamsStandard("$latest_","_latest_"),n=i.$utms,o=i.otherUtms;_.isEmptyObject(n)||sd.register(n),_.isEmptyObject(o)||sd.register(o)}}};sd.bridge={is_verify_success:!1,initPara:function(){var e={is_send:!0,white_list:[],is_mui:!1};"object"==typeof sd.para.app_js_bridge?sd.para.app_js_bridge=_.extend({},e,sd.para.app_js_bridge):!0===sd.para.use_app_track||!0===sd.para.app_js_bridge||"only"===sd.para.use_app_track?(!1!==sd.para.use_app_track_is_send&&"only"!==sd.para.use_app_track||(e.is_send=!1),sd.para.app_js_bridge=_.extend({},e)):"mui"===sd.para.use_app_track&&(e.is_mui=!0,sd.para.app_js_bridge=_.extend({},e)),!1===sd.para.app_js_bridge.is_send&&sd.log("\u8bbe\u7f6e\u4e86 is_send:false,\u5982\u679c\u6253\u901a\u5931\u8d25\uff0c\u6570\u636e\u5c06\u88ab\u4e22\u5f03\uff01")},initState:function(){function e(e){function t(e){var t={hostname:"",project:""};try{t.hostname=_.URL(e).hostname,t.project=_.URL(e).searchParams.get("project")||"default"}catch(e){sd.log(e)}return t}var r=t(e),s=t(sd.para.server_url);if(r.hostname===s.hostname&&r.project===s.project)return!0;if(sd.para.app_js_bridge.white_list.length>0)for(var a=0;a<sd.para.app_js_bridge.white_list.length;a++){var i=t(sd.para.app_js_bridge.white_list[a]);if(i.hostname===r.hostname&&i.project===r.project)return!0}return!1}if(_.isObject(sd.para.app_js_bridge)&&!sd.para.app_js_bridge.is_mui)if(window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.sensorsdataNativeTracker&&_.isObject(window.SensorsData_iOS_JS_Bridge)&&window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url)e(window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url)&&(sd.bridge.is_verify_success=!0);else if(_.isObject(window.SensorsData_APP_New_H5_Bridge)&&window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url&&window.SensorsData_APP_New_H5_Bridge.sensorsdata_track){var t=window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url();t&&e(t)&&(sd.bridge.is_verify_success=!0)}},initDefineBridgeInfo:function(){var e={touch_app_bridge:!0,verify_success:!1};return window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.sensorsdataNativeTracker&&window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage&&_.isObject(window.SensorsData_iOS_JS_Bridge)&&window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url?sd.bridge.is_verify_success?e.verify_success="success":e.verify_success="fail":_.isObject(window.SensorsData_APP_New_H5_Bridge)&&window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url&&window.SensorsData_APP_New_H5_Bridge.sensorsdata_track?sd.bridge.is_verify_success?e.verify_success="success":e.verify_success="fail":"object"==typeof SensorsData_APP_JS_Bridge&&(SensorsData_APP_JS_Bridge.sensorsdata_verify&&SensorsData_APP_JS_Bridge.sensorsdata_visual_verify||SensorsData_APP_JS_Bridge.sensorsdata_track)?SensorsData_APP_JS_Bridge.sensorsdata_verify&&SensorsData_APP_JS_Bridge.sensorsdata_visual_verify?SensorsData_APP_JS_Bridge.sensorsdata_visual_verify(JSON.stringify({server_url:sd.para.server_url}))?e.verify_success="success":e.verify_success="fail":e.verify_success="success":!/sensors-verify/.test(navigator.userAgent)&&!/sa-sdk-ios/.test(navigator.userAgent)||window.MSStream?e.touch_app_bridge=!1:sd.bridge.iOS_UA_bridge()?e.verify_success="success":e.verify_success="fail",e},iOS_UA_bridge:function(){if(/sensors-verify/.test(navigator.userAgent)){var e=navigator.userAgent.match(/sensors-verify\/([^\s]+)/);if(e&&e[0]&&"string"==typeof e[1]&&2===e[1].split("?").length){e=e[1].split("?");var t=null,r=null;try{t=_.URL(sd.para.server_url).hostname,r=_.URL(sd.para.server_url).searchParams.get("project")||"default"}catch(e){sd.log(e)}return!(!t||t!==e[0]||!r||r!==e[1])}return!1}return!!/sa-sdk-ios/.test(navigator.userAgent)},dataSend:function(e,t,r){if(_.isObject(sd.para.app_js_bridge)&&!sd.para.app_js_bridge.is_mui)if(window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.sensorsdataNativeTracker&&window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage&&_.isObject(window.SensorsData_iOS_JS_Bridge)&&window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url)sd.bridge.is_verify_success?(window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(JSON.stringify({callType:"app_h5_track",data:_.extend({server_url:sd.para.server_url},e)})),"function"==typeof r&&r()):sd.para.app_js_bridge.is_send?(sd.debug.apph5({data:e,step:"4.1",output:"all"}),t.prepareServerUrl()):"function"==typeof r&&r();else if(_.isObject(window.SensorsData_APP_New_H5_Bridge)&&window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url&&window.SensorsData_APP_New_H5_Bridge.sensorsdata_track)sd.bridge.is_verify_success?(SensorsData_APP_New_H5_Bridge.sensorsdata_track(JSON.stringify(_.extend({server_url:sd.para.server_url},e))),"function"==typeof r&&r()):sd.para.app_js_bridge.is_send?(sd.debug.apph5({data:e,step:"4.2",output:"all"}),t.prepareServerUrl()):"function"==typeof r&&r();else if("object"==typeof SensorsData_APP_JS_Bridge&&(SensorsData_APP_JS_Bridge.sensorsdata_verify||SensorsData_APP_JS_Bridge.sensorsdata_track))SensorsData_APP_JS_Bridge.sensorsdata_verify?SensorsData_APP_JS_Bridge.sensorsdata_verify(JSON.stringify(_.extend({server_url:sd.para.server_url},e)))?"function"==typeof r&&r():sd.para.app_js_bridge.is_send?(sd.debug.apph5({data:e,step:"3.1",output:"all"}),t.prepareServerUrl()):"function"==typeof r&&r():(SensorsData_APP_JS_Bridge.sensorsdata_track(JSON.stringify(_.extend({server_url:sd.para.server_url},e))),"function"==typeof r&&r());else if(!/sensors-verify/.test(navigator.userAgent)&&!/sa-sdk-ios/.test(navigator.userAgent)||window.MSStream)_.isObject(sd.para.app_js_bridge)&&!0===sd.para.app_js_bridge.is_send?(sd.debug.apph5({data:e,step:"2",output:"all"}),t.prepareServerUrl()):"function"==typeof r&&r();else{var s=null;sd.bridge.iOS_UA_bridge()?((s=document.createElement("iframe")).setAttribute("src","sensorsanalytics://trackEvent?event="+encodeURIComponent(JSON.stringify(_.extend({server_url:sd.para.server_url},e)))),document.documentElement.appendChild(s),s.parentNode.removeChild(s),s=null,"function"==typeof r&&r()):sd.para.app_js_bridge.is_send?(sd.debug.apph5({data:e,step:"3.2",output:"all"}),t.prepareServerUrl()):"function"==typeof r&&r()}else _.isObject(sd.para.app_js_bridge)&&sd.para.app_js_bridge.is_mui?_.isObject(window.plus)&&window.plus.SDAnalytics&&window.plus.SDAnalytics.trackH5Event?(window.plus.SDAnalytics.trackH5Event(data),"function"==typeof r&&r()):_.isObject(sd.para.app_js_bridge)&&!0===sd.para.app_js_bridge.is_send?t.prepareServerUrl():"function"==typeof r&&r():(sd.debug.apph5({data:e,step:"1",output:"code"}),t.prepareServerUrl())},app_js_bridge_v1:function(){var e=null,t=null;window.sensorsdata_app_js_bridge_call_js=function(r){!function(r){e=r,_.isJSONString(e)&&(e=JSON.parse(e)),t&&(t(e),t=null,e=null)}(r)},sd.getAppStatus=function(r){if(function(){if(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream){var e=document.createElement("iframe");e.setAttribute("src","sensorsanalytics://getAppInfo"),document.documentElement.appendChild(e),e.parentNode.removeChild(e),e=null}}(),"object"==typeof window.SensorsData_APP_JS_Bridge&&window.SensorsData_APP_JS_Bridge.sensorsdata_call_app&&(e=SensorsData_APP_JS_Bridge.sensorsdata_call_app(),_.isJSONString(e)&&(e=JSON.parse(e))),!r)return e;null===e?t=r:(r(e),e=null)}}};var heatmap=sd.heatmap={setNotice:function(e){sd.is_heatmap_render_mode=!0,sd.para.heatmap||(sd.errorMsg="\u60a8SDK\u6ca1\u6709\u914d\u7f6e\u5f00\u542f\u70b9\u51fb\u56fe\uff0c\u53ef\u80fd\u6ca1\u6709\u6570\u636e\uff01"),e&&e[0]&&e[1]&&"http:"===e[1].slice(0,5)&&"https:"===location.protocol&&(sd.errorMsg="\u60a8\u7684\u5f53\u524d\u9875\u9762\u662fhttps\u7684\u5730\u5740\uff0c\u795e\u7b56\u5206\u6790\u73af\u5883\u4e5f\u5fc5\u987b\u662fhttps\uff01"),sd.para.heatmap_url||(sd.para.heatmap_url=location.protocol+"//static.sensorsdata.cn/sdk/"+sd.lib_version+"/heatmap.min.js")},getDomIndex:function(e){if(!e.parentNode)return-1;for(var t=0,r=e.tagName,s=e.parentNode.children,a=0;a<s.length;a++)if(s[a].tagName===r){if(e===s[a])return t;t++}return-1},selector:function(e){var t=e.parentNode&&9==e.parentNode.nodeType?-1:this.getDomIndex(e);return e.getAttribute&&e.getAttribute("id")&&(!sd.para.heatmap||sd.para.heatmap&&"not_use_id"!==sd.para.heatmap.element_selector)?"#"+e.getAttribute("id"):e.tagName.toLowerCase()+(~t?":nth-of-type("+(t+1)+")":"")},getDomSelector:function(e,t){if(!e||!e.parentNode||!e.parentNode.children)return!1;t=t&&t.join?t:[];var r=e.nodeName.toLowerCase();return e&&"body"!==r&&1==e.nodeType?(t.unshift(this.selector(e)),e.getAttribute&&e.getAttribute("id")&&sd.para.heatmap&&"not_use_id"!==sd.para.heatmap.element_selector?t.join(" > "):this.getDomSelector(e.parentNode,t)):(t.unshift("body"),t.join(" > "))},na:function(){var e=document.documentElement.scrollLeft||window.pageXOffset;return parseInt(isNaN(e)?0:e,10)},i:function(){var e=0;try{e=o.documentElement&&o.documentElement.scrollTop||m.pageYOffset,e=isNaN(e)?0:e}catch(t){e=0}return parseInt(e,10)},getBrowserWidth:function(){var e=window.innerWidth||document.body.clientWidth;return isNaN(e)?0:parseInt(e,10)},getBrowserHeight:function(){var e=window.innerHeight||document.body.clientHeight;return isNaN(e)?0:parseInt(e,10)},getScrollWidth:function(){var e=parseInt(document.body.scrollWidth,10);return isNaN(e)?0:e},W:function(e){var t=parseInt(+e.clientX+ +this.na(),10);e=parseInt(+e.clientY+ +this.i(),10);return{x:isNaN(t)?0:t,y:isNaN(e)?0:e}},start:function(e,t,r,s,a){var i=_.isObject(s)?s:{},n=_.isFunction(a)?a:_.isFunction(s)?s:void 0;if(sd.para.heatmap&&sd.para.heatmap.collect_element&&!sd.para.heatmap.collect_element(t))return!1;var o=this.getDomSelector(t),d=_.getEleInfo({target:t});if(d.$element_selector=o||"",sd.para.heatmap&&sd.para.heatmap.custom_property){var c=sd.para.heatmap.custom_property(t);_.isObject(c)&&(d=_.extend(d,c))}d=_.extend(d,i),"a"===r&&sd.para.heatmap&&!0===sd.para.heatmap.isTrackLink?_.trackLink({event:e,target:t},"$WebClick",d):sd.track("$WebClick",d,n)},hasElement:function(e){var t=e._getPath();if(_.isArray(t)&&t.length>0)for(var r=0;r<t.length;r++)if(t[r]&&t[r].tagName&&"a"===t[r].tagName.toLowerCase())return t[r];return!1},isStyleTag:function(e,t){return!(_.indexOf(["a","div","input","button","textarea"],e)>-1)&&(!t||sd.para.heatmap&&sd.para.heatmap.collect_tags&&sd.para.heatmap.collect_tags.div?!!(_.isObject(sd.para.heatmap)&&_.isObject(sd.para.heatmap.collect_tags)&&_.isObject(sd.para.heatmap.collect_tags.div)&&_.indexOf(sd.para.heatmap.collect_tags.div.ignore_tags,e)>-1):_.indexOf(["mark","/mark","strong","b","em","i","u","abbr","ins","del","s","sup"],e)>-1)},isCollectableDiv:function(e,t){try{if(0===e.children.length)return!0;for(var r=0;r<e.children.length;r++)if(1===e.children[r].nodeType){var s=e.children[r].tagName.toLowerCase();if(!this.isStyleTag(s,t))return!1;if(!this.isCollectableDiv(e.children[r],t))return!1}return!0}catch(e){sd.log(e)}return!1},getCollectableParent:function(e,t){try{var r=e.parentNode,s=r?r.tagName.toLowerCase():"";if("body"===s)return!1;if(s&&"div"===s&&this.isCollectableDiv(r,t))return r;if(r&&this.isStyleTag(s,t))return this.getCollectableParent(r,t)}catch(e){sd.log(e)}return!1},initScrollmap:function(){if(!_.isObject(sd.para.heatmap)||"default"!==sd.para.heatmap.scroll_notice_map)return!1;var e=function(){return!(sd.para.scrollmap&&_.isFunction(sd.para.scrollmap.collect_url)&&!sd.para.scrollmap.collect_url())},t=function(e){var t={};return t.timeout=e.timeout||1e3,t.func=e.func,t.hasInit=!1,t.inter=null,t.main=function(e,t){this.func(e,t),this.inter=null},t.go=function(e){var r={};this.inter||(r.$viewport_position=document.documentElement&&document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop||0,r.$viewport_position=Math.round(r.$viewport_position)||0,r.$viewport_height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0,r.$viewport_width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||0,e?t.main(r,!0):this.inter=setTimeout(function(){t.main(r)},this.timeout))},t}({timeout:1e3,func:function(e,t){var r=document.documentElement&&document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop||0,s=new Date,a=s-this.current_time;(a>sd.para.heatmap.scroll_delay_time&&r-e.$viewport_position!=0||t)&&(e.$url=location.href,e.$title=document.title,e.$url_path=location.pathname,e.event_duration=Math.min(sd.para.heatmap.scroll_event_duration,parseInt(a)/1e3),sd.track("$WebStay",e)),this.current_time=s}});t.current_time=new Date,_.addEvent(window,"scroll",function(){if(!e())return!1;t.go()}),_.addEvent(window,"unload",function(){if(!e())return!1;t.go("notime")})},initHeatmap:function(){var e=this;return!(!_.isObject(sd.para.heatmap)||"default"!==sd.para.heatmap.clickmap)&&(!(_.isFunction(sd.para.heatmap.collect_url)&&!sd.para.heatmap.collect_url())&&("all"===sd.para.heatmap.collect_elements?sd.para.heatmap.collect_elements="all":sd.para.heatmap.collect_elements="interact",void("all"===sd.para.heatmap.collect_elements?_.addEvent(document,"click",function(t){var r=t||window.event;if(!r)return!1;var s=r.target||r.srcElement;if("object"!=typeof s)return!1;if("string"!=typeof s.tagName)return!1;var a=s.tagName.toLowerCase();if("body"===a||"html"===a)return!1;if(!s||!s.parentNode||!s.parentNode.children)return!1;var i=s.parentNode.tagName.toLowerCase();"a"===i||"button"===i?e.start(r,s.parentNode,i):e.start(r,s,a)}):_.addEvent(document,"click",function(t){var r=t||window.event;if(!r)return!1;var s=r.target||r.srcElement;if("object"!=typeof s)return!1;if("string"!=typeof s.tagName)return!1;var a=s.tagName.toLowerCase();if("body"===a.toLowerCase()||"html"===a.toLowerCase())return!1;if(!s||!s.parentNode||!s.parentNode.children)return!1;var i=s.parentNode,n=e.hasElement(t);if("a"===a||"button"===a||"input"===a||"textarea"===a||_.hasAttribute(s,"data-sensors-click"))e.start(r,s,a);else if("button"===i.tagName.toLowerCase()||"a"===i.tagName.toLowerCase())e.start(r,i,s.parentNode.tagName.toLowerCase());else if("area"===a&&"map"===i.tagName.toLowerCase()&&_.ry(i).prev().tagName&&"img"===_.ry(i).prev().tagName.toLowerCase())e.start(r,_.ry(i).prev(),_.ry(i).prev().tagName.toLowerCase());else if(n)e.start(r,n,n.tagName.toLowerCase());else if("div"===a&&sd.para.heatmap.collect_tags.div&&e.isCollectableDiv(s))e.start(r,s,a);else if(e.isStyleTag(a)&&sd.para.heatmap.collect_tags.div){var o=e.getCollectableParent(s);o&&e.start(r,o,"div")}}))))}};sd.init=function(e){if(sd.readyState&&sd.readyState.state&&sd.readyState.state>=2)return!1;sd.setInitVar(),sd.readyState.setState(2),sd.initPara(e),sd.detectMode(),sd._.isIOS()&&sd._.getIOSVersion()&&sd._.getIOSVersion()<13&&sd.para.heatmap&&sd.para.heatmap.collect_tags&&sd.para.heatmap.collect_tags.div&&sd._.setCssStyle("div, [data-sensors-click] { cursor: pointer; -webkit-tap-highlight-color: rgba(0,0,0,0); }")};var methods=["track","quick","register","registerPage","registerOnce","trackSignup","setProfile","setOnceProfile","appendProfile","incrementProfile","deleteProfile","unsetProfile","identify","login","logout","trackLink","clearAllRegister"];if(_.each(methods,function(e){var t=sd[e];sd[e]=function(){if(sd.readyState.state<3)return _.isArray(sd._q)||(sd._q=[]),sd._q.push([e,arguments]),!1;if(sd.readyState.getState())return t.apply(sd,arguments);try{console.error("\u8bf7\u5148\u521d\u59cb\u5316\u795e\u7b56JS SDK")}catch(e){sd.log(e)}}}),sd.modules.Deeplink=function(){"use strict";/micromessenger\/([\d.]+)/i.test(navigator.userAgent||"");var e,t=function(){var e={};return void 0!==document.hidden?(e.hidden="hidden",e.visibilityChange="visibilitychange"):void 0!==document.msHidden?(e.hidden="msHidden",e.visibilityChange="msvisibilitychange"):void 0!==document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e};function r(){return void 0!==e&&document[e]}e=t().hidden;var s={android:/Android/i,iOS:/iPhone|iPad|iPod/i},a=function(){for(var e in s)if(navigator.userAgent.match(s[e]))return e;return""}(),i=function(e){return null!=e&&"[object Object]"==toString.call(e)},n={key:null,timer:null,sd:null,data:null,timeout:2500,apiURL:"{origin}/sdk/deeplink/param?key={key}&system_type=JS&project={project}",init:function(e){if(this.sd)return this.log("deeplink\u5df2\u7ecf\u521d\u59cb\u5316"),!1;if(i(sensorsDataAnalytic201505)&&(this.sd=sensorsDataAnalytic201505),this.log("init()"),null===this.sd)return this.log("\u795e\u7b56JS SDK\u672a\u6210\u529f\u5f15\u5165"),!1;if(!s.hasOwnProperty(a))return this.log("\u4e0d\u652f\u6301\u5f53\u524d\u7cfb\u7edf\uff0c\u76ee\u524d\u53ea\u652f\u6301Android\u548ciOS"),!1;if(i(e)&&this.sd._.isNumber(e.timeout)&&e.timeout>=2500&&(this.timeout=e.timeout),!this.sd.para.server_url)return this.log("\u795e\u7b56JS SDK\u914d\u7f6e\u9879server_url\u672a\u6b63\u786e\u914d\u7f6e"),!1;var t,r,o=(t=this.sd,{origin:(r=t._.URL(t.para.server_url)).origin,project:r.searchParams.get("project")||"default"});this.apiURL=this.apiURL.replace("{origin}",o.origin).replace("{project}",o.project);var d=this.sd._.URL(window.location.href).searchParams.get("deeplink");if(!d)return this.log("\u5f53\u524d\u9875\u9762\u7f3a\u5c11deeplink\u53c2\u6570"),!1;d=window.decodeURIComponent(d);var c=d.match(/\/sd\/(\w+)\/(\w+)$/);if(!c)return this.log("\u5f53\u524d\u9875\u9762\u7684deeplink\u53c2\u6570\u65e0\u6548"),!1;this.key=c[2],this.apiURL=this.apiURL.replace("{key}",window.encodeURIComponent(c[2])),this.sd._.ajax({url:this.apiURL,type:"GET",cors:!0,credentials:!1,success:function(e){if(e.errorMsg)return n.log("API\u62a5\u9519\uff1a"+e.errorMsg),!1;n.data=e,n.log("API\u67e5\u8be2\u6210\u529f\uff0c\u6570\u636e\uff1a"+JSON.stringify(e,null,"  ")),this.data.app_key&&(this.data.android_info&&this.data.android_info.url_schemes&&(this.data.android_info.url_schemes+="://sensorsdata/sd/"+this.data.app_key+"/"+this.key),this.data.ios_info&&this.data.ios_info.url_schemes&&(this.data.ios_info.url_schemes+="://sensorsdata/sd/"+this.data.app_key+"/"+this.key))}.bind(this),error:function(e){n.log("API\u67e5\u8be2\u51fa\u9519")}}),this.addListeners()},openDeepLink:function(){if(this.log("openDeeplink()"),!this.data)return this.log("\u6ca1\u6709Deep link\u6570\u636e!"),!1;if("iOS"===a){this.log("\u5f53\u524d\u7cfb\u7edf\u662fiOS");var t=this.sd&&this.sd._&&this.sd._.getIOSVersion()>=9&&this.data.ios_info.ios_wake_url?this.data.ios_info.ios_wake_url:this.data.ios_info.url_schemes;this.log("\u5524\u8d77APP\u7684\u5730\u5740\uff1a"+t),s=this,i=t,n=this.data.ios_info.download_url,s.log("\u5c1d\u8bd5\u5524\u8d77 iOS app:"+i),window.location.href=i,s.timer=setTimeout(function(){if(r())return s.log("The page is hidden, stop navigating to download page"),!1;s.log("App\u53ef\u80fd\u672a\u5b89\u88c5\uff0c\u8df3\u8f6c\u5230\u4e0b\u8f7d\u5730\u5740"),window.location.href=n},s.timeout),s.log("new timer:"+s.timer)}else this.log("\u5f53\u524d\u7cfb\u7edf\u662f android"),function(t,s,a){t.log("\u5c1d\u8bd5\u5524\u8d77 android app");var i=s;t.log("\u5524\u8d77APP\u7684\u5730\u5740\uff1a"+i),window.location=i,t.timer=setTimeout(function(){var s=r();if(t.log("hide:"+e+":"+document[e]),s)return t.log("The page is hidden, stop navigating to download page"),!1;t.log("App\u53ef\u80fd\u672a\u5b89\u88c5\uff0c\u8df3\u8f6c\u5230\u4e0b\u8f7d\u5730\u5740"),window.location=a},t.timeout)}(this,this.data.android_info.url_schemes,this.data.android_info.download_url);var s,i,n},log:function(e){this.sd&&this.sd.log(e)},addListeners:function(){var e=t().visibilityChange;e&&document.addEventListener(e,function(){clearTimeout(this.timer),this.log("visibilitychange, clear timeout:"+this.timer)}.bind(this),!1),window.addEventListener("pagehide",function(){this.log("page hide, clear timeout:"+this.timer),clearTimeout(this.timer)}.bind(this),!1)}};return i(window.SensorsDataWebJSSDKPlugin)?window.SensorsDataWebJSSDKPlugin.deeplink=window.SensorsDataWebJSSDKPlugin.deeplink||n:window.SensorsDataWebJSSDKPlugin={deeplink:n},n}(),sd.modules.SiteLinker=function(){"use strict";var e={getPart:function(e){var t=this.option.length;if(t)for(var r=0;r<t;r++)if(e.indexOf(this.option[r].part_url)>-1)return!0;return!1},getPartHash:function(e){var t=this.option.length;if(t)for(var r=0;r<t;r++)if(e.indexOf(this.option[r].part_url)>-1)return this.option[r].after_hash;return!1},getCurrenId:function(){var e=this.store.getDistinctId()||"",t=this.store.getFirstId()||"";return this._.rot13obfs&&(e=e?this._.rot13obfs(e):""),encodeURIComponent(t?"f"+e:"d"+e)},rewireteUrl:function(e,t){var r=/([^?#]+)(\?[^#]*)?(#.*)?/.exec(e),s="";if(r){var a,i=r[1]||"",n=r[2]||"",o=r[3]||"";if(this.getPartHash(e))a=o.indexOf("_sasdk"),s=o.indexOf("?")>-1?a>-1?i+n+"#"+o.substring(1,a)+"_sasdk="+this.getCurrenId():i+n+"#"+o.substring(1)+"&_sasdk="+this.getCurrenId():i+n+"#"+o.substring(1)+"?_sasdk="+this.getCurrenId();else a=n.indexOf("_sasdk"),s=/^\?(\w)+/.test(n)?a>-1?i+"?"+n.substring(1,a)+"_sasdk="+this.getCurrenId()+o:i+"?"+n.substring(1)+"&_sasdk="+this.getCurrenId()+o:i+"?"+n.substring(1)+"_sasdk="+this.getCurrenId()+o;return t&&(t.href=s),s}},getUrlId:function(){var e=location.href.match(/_sasdk=([aufd][^\?\#\&\=]+)/);if(this._.isArray(e)&&e[1]){var t=decodeURIComponent(e[1]);return t&&("f"===t.substring(0,1)||"d"===t.substring(0,1))&&this._.rot13defs&&(t=t.substring(0,1)+this._.rot13defs(t.substring(1))),t}return""},setRefferId:function(){var e=this.store.getDistinctId(),t=this.getUrlId();if(""===t)return!1;var r="a"===t.substring(0,1)||"d"===t.substring(0,1);if((t=t.substring(1))===e)return!1;t&&r&&this.store.getFirstId()&&(this.sd.identify(t,!0),this.sd.saEvent.send({original_id:t,distinct_id:e,type:"track_signup",event:"$SignUp",properties:{}},null)),t&&r&&!this.store.getFirstId()&&this.sd.identify(t,!0),!t||r||this.store.getFirstId()||this.sd.login(t)},addListen:function(){var e=this;e._.addEvent(document,"mousedown",function(t){var r=t.target;if("a"===r.tagName.toLowerCase()&&r.href){var s=e._.URL(r.href).protocol;"http:"!==s&&"https:"!==s||e.getPart(r.href)&&e.rewireteUrl(r.href,r)}})},init:function(e,t){this.sd=e,this._=e._,this.store=e.store,this.para=e.para,this._.isObject(t)&&this._.isArray(t.linker)&&t.linker.length>0?(this.setRefferId(),this.addListen(),this.option=t.linker,this.option=function(t){for(var r=t.length,s=[],a=0;a<r;a++)/[A-Za-z0-9]+\./.test(t[a].part_url)&&"[object Boolean]"==Object.prototype.toString.call(t[a].after_hash)?s.push(t[a]):e.log("linker \u914d\u7f6e\u7684\u7b2c "+(a+1)+" \u9879\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u8bf7\u68c0\u67e5\u53c2\u6570\u683c\u5f0f\uff01");return s}(this.option)):e.log("\u8bf7\u914d\u7f6e\u6253\u901a\u57df\u540d\u53c2\u6570\uff01")}};return e}(),"string"!=typeof window.sensorsDataAnalytic201505)return void 0===window.sensorsDataAnalytic201505?(window.sensorsDataAnalytic201505=sd,sd):window.sensorsDataAnalytic201505;sd.setPreConfig(window[sensorsDataAnalytic201505]),window[sensorsDataAnalytic201505]=sd,window.sensorsDataAnalytic201505=sd,sd.init()}catch(e){if("object"==typeof console&&console.log)try{console.log(e)}catch(e){sd.log(e)}}});

/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vue-router/dist/vue-router.esm.js":
/*!********************************************************!*\
  !*** ./node_modules/vue-router/dist/vue-router.esm.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*!
  * vue-router v3.4.3
  * (c) 2020 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if ( true && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function extend (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

var View = {
  name: 'RouterView',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    // used by devtools to display a router-view badge
    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      var vnodeData = parent.$vnode ? parent.$vnode.data : {};
      if (vnodeData.routerView) {
        depth++;
      }
      if (vnodeData.keepAlive && parent._directInactive && parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      var cachedData = cache[name];
      var cachedComponent = cachedData && cachedData.component;
      if (cachedComponent) {
        // #2301
        // pass props
        if (cachedData.configProps) {
          fillPropsinData(cachedComponent, data, cachedData.route, cachedData.configProps);
        }
        return h(cachedComponent, data, children)
      } else {
        // render previous empty view
        return h()
      }
    }

    var matched = route.matched[depth];
    var component = matched && matched.components[name];

    // render empty node if no matched route or no config component
    if (!matched || !component) {
      cache[name] = null;
      return h()
    }

    // cache component
    cache[name] = { component: component };

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // register instance in init hook
    // in case kept-alive component be actived when routes changed
    data.hook.init = function (vnode) {
      if (vnode.data.keepAlive &&
        vnode.componentInstance &&
        vnode.componentInstance !== matched.instances[name]
      ) {
        matched.instances[name] = vnode.componentInstance;
      }
    };

    var configProps = matched.props && matched.props[name];
    // save route and configProps in cache
    if (configProps) {
      extend(cache[name], {
        route: route,
        configProps: configProps
      });
      fillPropsinData(component, data, route, configProps);
    }

    return h(component, data, children)
  }
};

function fillPropsinData (component, data, route, configProps) {
  // resolve props
  var propsToPass = data.props = resolveProps(route, configProps);
  if (propsToPass) {
    // clone to prevent mutation
    propsToPass = data.props = extend({}, propsToPass);
    // pass non-declared props as attrs
    var attrs = data.attrs = data.attrs || {};
    for (var key in propsToPass) {
      if (!component.props || !(key in component.props)) {
        attrs[key] = propsToPass[key];
        delete propsToPass[key];
      }
    }
  }
}

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (true) {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
    .replace(encodeReserveRE, encodeReserveReplacer)
    .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
     true && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    var value = extraQuery[key];
    parsedQuery[key] = Array.isArray(value)
      ? value.map(castQueryParamValue)
      : castQueryParamValue(value);
  }
  return parsedQuery
}

var castQueryParamValue = function (value) { return (value == null || typeof value === 'object' ? value : String(value)); };

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0 ? decode(parts.join('=')) : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj
    ? Object.keys(obj)
      .map(function (key) {
        var val = obj[key];

        if (val === undefined) {
          return ''
        }

        if (val === null) {
          return encode(key)
        }

        if (Array.isArray(val)) {
          var result = [];
          val.forEach(function (val2) {
            if (val2 === undefined) {
              return
            }
            if (val2 === null) {
              result.push(encode(key));
            } else {
              result.push(encode(key) + '=' + encode(val2));
            }
          });
          return result.join('&')
        }

        return encode(key) + '=' + encode(val)
      })
      .filter(function (x) { return x.length > 0; })
      .join('&')
    : null;
  return res ? ("?" + res) : ''
}

/*  */

var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // query values can be null and undefined
    if (aVal == null || bVal == null) { return aVal === bVal }
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options), options)
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens, options) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$', flags(options));
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options && options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}
pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  params = params || {};
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));

    // Fix #2505 resolving asterisk routes { name: 'not-found', params: { pathMatch: '/not-found' }}
    // and fix #3106 so that you can work with location descriptor object having params.pathMatch equal to empty string
    if (typeof params.pathMatch === 'string') { params[0] = params.pathMatch; }

    return filler(params, { pretty: true })
  } catch (e) {
    if (true) {
      // Fix #3072 no warn if `pathMatch` is string
      warn(typeof params.pathMatch === 'string', ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  } finally {
    // delete the 0 if it was added
    delete params[0];
  }
}

/*  */

function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next._normalized) {
    return next
  } else if (next.name) {
    next = extend({}, raw);
    var params = next.params;
    if (params && typeof params === 'object') {
      next.params = extend({}, params);
    }
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = extend({}, next);
    next._normalized = true;
    var params$1 = extend(extend({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params$1;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params$1, ("path " + (current.path)));
    } else if (true) {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var noop = function () {};

var Link = {
  name: 'RouterLink',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    ariaCurrentValue: {
      type: String,
      default: 'page'
    },
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(
      this.to,
      current,
      this.append
    );
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback =
      globalActiveClass == null ? 'router-link-active' : globalActiveClass;
    var exactActiveClassFallback =
      globalExactActiveClass == null
        ? 'router-link-exact-active'
        : globalExactActiveClass;
    var activeClass =
      this.activeClass == null ? activeClassFallback : this.activeClass;
    var exactActiveClass =
      this.exactActiveClass == null
        ? exactActiveClassFallback
        : this.exactActiveClass;

    var compareTarget = route.redirectedFrom
      ? createRoute(null, normalizeLocation(route.redirectedFrom), null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var ariaCurrentValue = classes[exactActiveClass] ? this.ariaCurrentValue : null;

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location, noop);
        } else {
          router.push(location, noop);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) {
        on[e] = handler;
      });
    } else {
      on[this.event] = handler;
    }

    var data = { class: classes };

    var scopedSlot =
      !this.$scopedSlots.$hasNormal &&
      this.$scopedSlots.default &&
      this.$scopedSlots.default({
        href: href,
        route: route,
        navigate: handler,
        isActive: classes[activeClass],
        isExactActive: classes[exactActiveClass]
      });

    if (scopedSlot) {
      if (scopedSlot.length === 1) {
        return scopedSlot[0]
      } else if (scopedSlot.length > 1 || !scopedSlot.length) {
        if (true) {
          warn(
            false,
            ("RouterLink with to=\"" + (this.to) + "\" is trying to use a scoped slot but it didn't provide exactly one child. Wrapping the content with a span element.")
          );
        }
        return scopedSlot.length === 0 ? h() : h('span', {}, scopedSlot)
      }
    }

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href, 'aria-current': ariaCurrentValue };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var aData = (a.data = extend({}, a.data));
        aData.on = aData.on || {};
        // transform existing events in both objects into arrays so we can push later
        for (var event in aData.on) {
          var handler$1 = aData.on[event];
          if (event in on) {
            aData.on[event] = Array.isArray(handler$1) ? handler$1 : [handler$1];
          }
        }
        // append new listeners for router-link
        for (var event$1 in on) {
          if (event$1 in aData.on) {
            // on[event] is always a function
            aData.on[event$1].push(on[event$1]);
          } else {
            aData.on[event$1] = handler;
          }
        }

        var aAttrs = (a.data.attrs = extend({}, a.data.attrs));
        aAttrs.href = href;
        aAttrs['aria-current'] = ariaCurrentValue;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('RouterView', View);
  Vue.component('RouterLink', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  if (true) {
    // warn if routes do not include leading slashes
    var found = pathList
    // check for missing leading slash
      .filter(function (path) { return path && path.charAt(0) !== '*' && path.charAt(0) !== '/'; });

    if (found.length > 0) {
      var pathNames = found.map(function (path) { return ("- " + path); }).join('\n');
      warn(false, ("Non-nested routes must include a leading slash character. Fix the following routes: \n" + pathNames));
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (true) {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(
        path || name
      )) + " cannot be a " + "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions =
    route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict);

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props:
      route.props == null
        ? {}
        : route.components
          ? route.props
          : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (true) {
      if (
        route.name &&
        !route.redirect &&
        route.children.some(function (child) { return /^\/?$/.test(child.path); })
      ) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
            "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
            "the default child route will not be rendered. Remove the name from " +
            "this route and use the name of the default child route for named " +
            "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias) ? route.alias : [route.alias];
    for (var i = 0; i < aliases.length; ++i) {
      var alias = aliases[i];
      if ( true && alias === path) {
        warn(
          false,
          ("Found an alias with the same value as the path: \"" + path + "\". You have to remove that alias. It will be ignored in development.")
        );
        // skip in dev to make it work
        continue
      }

      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    }
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if ( true && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
          "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (
  path,
  pathToRegexpOptions
) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (true) {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(
        !keys[key.name],
        ("Duplicate param keys in route with path: \"" + path + "\"")
      );
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (
  path,
  parent,
  strict
) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */



function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (true) {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
      return _createRoute(record, location, redirectedFrom)
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
      ? originalRedirect(createRoute(record, location, null, router))
      : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (true) {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (true) {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (true) {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      // Fix #1994: using * with props: true generates a param named 0
      params[key.name || 'pathMatch'] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */

// use User Timing api (if present) for more accurate key precision
var Time =
  inBrowser && window.performance && window.performance.now
    ? window.performance
    : Date;

function genStateKey () {
  return Time.now().toFixed(3)
}

var _key = genStateKey();

function getStateKey () {
  return _key
}

function setStateKey (key) {
  return (_key = key)
}

/*  */

var positionStore = Object.create(null);

function setupScroll () {
  // Prevent browser scroll behavior on History popstate
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  // Fix for #1585 for Firefox
  // Fix for #2195 Add optional third attribute to workaround a bug in safari https://bugs.webkit.org/show_bug.cgi?id=182678
  // Fix for #2774 Support for apps loaded from Windows file shares not mapped to network drives: replaced location.origin with
  // window.location.protocol + '//' + window.location.host
  // location.host contains the port and location.hostname doesn't
  var protocolAndPath = window.location.protocol + '//' + window.location.host;
  var absolutePath = window.location.href.replace(protocolAndPath, '');
  // preserve existing history state as it could be overriden by the user
  var stateCopy = extend({}, window.history.state);
  stateCopy.key = getStateKey();
  window.history.replaceState(stateCopy, '', absolutePath);
  window.addEventListener('popstate', handlePopState);
  return function () {
    window.removeEventListener('popstate', handlePopState);
  }
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (true) {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior.call(
      router,
      to,
      from,
      isPop ? position : null
    );

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll
        .then(function (shouldScroll) {
          scrollToPosition((shouldScroll), position);
        })
        .catch(function (err) {
          if (true) {
            assert(false, err.toString());
          }
        });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function handlePopState (e) {
  saveScrollPosition();
  if (e.state && e.state.key) {
    setStateKey(e.state.key);
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

var hashStartsWithNumberRE = /^#\d/;

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    // getElementById would still fail if the selector contains a more complicated query like #main[data-attr]
    // but at the same time, it doesn't make much sense to select an element with an id and an extra selector
    var el = hashStartsWithNumberRE.test(shouldScroll.selector) // $flow-disable-line
      ? document.getElementById(shouldScroll.selector.slice(1)) // $flow-disable-line
      : document.querySelector(shouldScroll.selector);

    if (el) {
      var offset =
        shouldScroll.offset && typeof shouldScroll.offset === 'object'
          ? shouldScroll.offset
          : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState =
  inBrowser &&
  (function () {
    var ua = window.navigator.userAgent;

    if (
      (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
      ua.indexOf('Mobile Safari') !== -1 &&
      ua.indexOf('Chrome') === -1 &&
      ua.indexOf('Windows Phone') === -1
    ) {
      return false
    }

    return window.history && typeof window.history.pushState === 'function'
  })();

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      // preserve existing history state as it could be overriden by the user
      var stateCopy = extend({}, history.state);
      stateCopy.key = getStateKey();
      history.replaceState(stateCopy, '', url);
    } else {
      history.pushState({ key: setStateKey(genStateKey()) }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

var NavigationFailureType = {
  redirected: 2,
  aborted: 4,
  cancelled: 8,
  duplicated: 16
};

function createNavigationRedirectedError (from, to) {
  return createRouterError(
    from,
    to,
    NavigationFailureType.redirected,
    ("Redirected when going from \"" + (from.fullPath) + "\" to \"" + (stringifyRoute(
      to
    )) + "\" via a navigation guard.")
  )
}

function createNavigationDuplicatedError (from, to) {
  var error = createRouterError(
    from,
    to,
    NavigationFailureType.duplicated,
    ("Avoided redundant navigation to current location: \"" + (from.fullPath) + "\".")
  );
  // backwards compatible with the first introduction of Errors
  error.name = 'NavigationDuplicated';
  return error
}

function createNavigationCancelledError (from, to) {
  return createRouterError(
    from,
    to,
    NavigationFailureType.cancelled,
    ("Navigation cancelled from \"" + (from.fullPath) + "\" to \"" + (to.fullPath) + "\" with a new navigation.")
  )
}

function createNavigationAbortedError (from, to) {
  return createRouterError(
    from,
    to,
    NavigationFailureType.aborted,
    ("Navigation aborted from \"" + (from.fullPath) + "\" to \"" + (to.fullPath) + "\" via a navigation guard.")
  )
}

function createRouterError (from, to, type, message) {
  var error = new Error(message);
  error._isRouter = true;
  error.from = from;
  error.to = to;
  error.type = type;

  return error
}

var propertiesToLog = ['params', 'query', 'hash'];

function stringifyRoute (to) {
  if (typeof to === 'string') { return to }
  if ('path' in to) { return to.path }
  var location = {};
  propertiesToLog.forEach(function (key) {
    if (key in to) { location[key] = to[key]; }
  });
  return JSON.stringify(location, null, 2)
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

function isNavigationFailure (err, errorType) {
  return (
    isError(err) &&
    err._isRouter &&
    (errorType == null || err.type === errorType)
  )
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
           true && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
  this.listeners = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (
  location,
  onComplete,
  onAbort
) {
    var this$1 = this;

  var route;
  // catch redirect option https://github.com/vuejs/vue-router/issues/3201
  try {
    route = this.router.match(location, this.current);
  } catch (e) {
    this.errorCbs.forEach(function (cb) {
      cb(e);
    });
    // Exception should still be thrown
    throw e
  }
  this.confirmTransition(
    route,
    function () {
      var prev = this$1.current;
      this$1.updateRoute(route);
      onComplete && onComplete(route);
      this$1.ensureURL();
      this$1.router.afterHooks.forEach(function (hook) {
        hook && hook(route, prev);
      });

      // fire ready cbs once
      if (!this$1.ready) {
        this$1.ready = true;
        this$1.readyCbs.forEach(function (cb) {
          cb(route);
        });
      }
    },
    function (err) {
      if (onAbort) {
        onAbort(err);
      }
      if (err && !this$1.ready) {
        this$1.ready = true;
        // Initial redirection should still trigger the onReady onSuccess
        // https://github.com/vuejs/vue-router/issues/3225
        if (!isNavigationFailure(err, NavigationFailureType.redirected)) {
          this$1.readyErrorCbs.forEach(function (cb) {
            cb(err);
          });
        } else {
          this$1.readyCbs.forEach(function (cb) {
            cb(route);
          });
        }
      }
    }
  );
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    // changed after adding errors with
    // https://github.com/vuejs/vue-router/pull/3047 before that change,
    // redirect and aborted navigation would produce an err == null
    if (!isNavigationFailure(err) && isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) {
          cb(err);
        });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  var lastRouteIndex = route.matched.length - 1;
  var lastCurrentIndex = current.matched.length - 1;
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    lastRouteIndex === lastCurrentIndex &&
    route.matched[lastRouteIndex] === current.matched[lastCurrentIndex]
  ) {
    this.ensureURL();
    return abort(createNavigationDuplicatedError(current, route))
  }

  var ref = resolveQueue(
    this.current.matched,
    route.matched
  );
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort(createNavigationCancelledError(current, route))
    }
    try {
      hook(route, current, function (to) {
        if (to === false) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(createNavigationAbortedError(current, route));
        } else if (isError(to)) {
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' &&
            (typeof to.path === 'string' || typeof to.name === 'string'))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort(createNavigationRedirectedError(current, route));
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort(createNavigationCancelledError(current, route))
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) {
            cb();
          });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  this.current = route;
  this.cb && this.cb(route);
};

History.prototype.setupListeners = function setupListeners () {
  // Default implementation is empty
};

History.prototype.teardownListeners = function teardownListeners () {
  this.listeners.forEach(function (cleanupListener) {
    cleanupListener();
  });
  this.listeners = [];
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(
    activated,
    'beforeRouteEnter',
    function (guard, _, match, key) {
      return bindEnterGuard(guard, match, key, cbs, isValid)
    }
  )
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
      next(cb);
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (
    instances[key] &&
    !instances[key]._isBeingDestroyed // do not reuse being destroyed instance
  ) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */

var HTML5History = /*@__PURE__*/(function (History) {
  function HTML5History (router, base) {
    History.call(this, router, base);

    this._startLocation = getLocation(this.base);
  }

  if ( History ) HTML5History.__proto__ = History;
  HTML5History.prototype = Object.create( History && History.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    if (this.listeners.length > 0) {
      return
    }

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      this.listeners.push(setupScroll());
    }

    var handleRoutingEvent = function () {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === this$1._startLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (supportsScroll) {
          handleScroll(router, route, current, true);
        }
      });
    };
    window.addEventListener('popstate', handleRoutingEvent);
    this.listeners.push(function () {
      window.removeEventListener('popstate', handleRoutingEvent);
    });
  };

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = decodeURI(window.location.pathname);
  if (base && path.toLowerCase().indexOf(base.toLowerCase()) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */

var HashHistory = /*@__PURE__*/(function (History) {
  function HashHistory (router, base, fallback) {
    History.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History ) HashHistory.__proto__ = History;
  HashHistory.prototype = Object.create( History && History.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    if (this.listeners.length > 0) {
      return
    }

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      this.listeners.push(setupScroll());
    }

    var handleRoutingEvent = function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    };
    var eventType = supportsPushState ? 'popstate' : 'hashchange';
    window.addEventListener(
      eventType,
      handleRoutingEvent
    );
    this.listeners.push(function () {
      window.removeEventListener(eventType, handleRoutingEvent);
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(
      location,
      function (route) {
        pushHash(route.fullPath);
        handleScroll(this$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(
      location,
      function (route) {
        replaceHash(route.fullPath);
        handleScroll(this$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(cleanPath(base + '/#' + location));
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  // empty path
  if (index < 0) { return '' }

  href = href.slice(index + 1);
  // decode the hash but not the search or hash
  // as search(query) is already decoded
  // https://github.com/vuejs/vue-router/issues/2708
  var searchIndex = href.indexOf('?');
  if (searchIndex < 0) {
    var hashIndex = href.indexOf('#');
    if (hashIndex > -1) {
      href = decodeURI(href.slice(0, hashIndex)) + href.slice(hashIndex);
    } else { href = decodeURI(href); }
  } else {
    href = decodeURI(href.slice(0, searchIndex)) + href.slice(searchIndex);
  }

  return href
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */

var AbstractHistory = /*@__PURE__*/(function (History) {
  function AbstractHistory (router, base) {
    History.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History ) AbstractHistory.__proto__ = History;
  AbstractHistory.prototype = Object.create( History && History.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(
      location,
      function (route) {
        this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
        this$1.index++;
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(
      location,
      function (route) {
        this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(
      route,
      function () {
        this$1.index = targetIndex;
        this$1.updateRoute(route);
      },
      function (err) {
        if (isNavigationFailure(err, NavigationFailureType.duplicated)) {
          this$1.index = targetIndex;
        }
      }
    );
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback =
    mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (true) {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (raw, current, redirectedFrom) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

   true &&
    assert(
      install.installed,
      "not installed. Make sure to call `Vue.use(VueRouter)` " +
        "before creating root instance."
    );

  this.apps.push(app);

  // set up app destroyed handler
  // https://github.com/vuejs/vue-router/issues/2639
  app.$once('hook:destroyed', function () {
    // clean out app from this.apps array once destroyed
    var index = this$1.apps.indexOf(app);
    if (index > -1) { this$1.apps.splice(index, 1); }
    // ensure we still have a main app or null if no apps
    // we do not release the router so it can be reused
    if (this$1.app === app) { this$1.app = this$1.apps[0] || null; }

    if (!this$1.app) {
      // clean up event listeners
      // https://github.com/vuejs/vue-router/issues/2341
      this$1.history.teardownListeners();
    }
  });

  // main app previously initialized
  // return as we don't need to set up new history listener
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History || history instanceof HashHistory) {
    var handleInitialScroll = function (routeOrError) {
      var from = history.current;
      var expectScroll = this$1.options.scrollBehavior;
      var supportsScroll = supportsPushState && expectScroll;

      if (supportsScroll && 'fullPath' in routeOrError) {
        handleScroll(this$1, routeOrError, from, false);
      }
    };
    var setupListeners = function (routeOrError) {
      history.setupListeners();
      handleInitialScroll(routeOrError);
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupListeners,
      setupListeners
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

  // $flow-disable-line
  if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
    return new Promise(function (resolve, reject) {
      this$1.history.push(location, resolve, reject);
    })
  } else {
    this.history.push(location, onComplete, onAbort);
  }
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

  // $flow-disable-line
  if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
    return new Promise(function (resolve, reject) {
      this$1.history.replace(location, resolve, reject);
    })
  } else {
    this.history.replace(location, onComplete, onAbort);
  }
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply(
    [],
    route.matched.map(function (m) {
      return Object.keys(m.components).map(function (key) {
        return m.components[key]
      })
    })
  )
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  current = current || this.history.current;
  var location = normalizeLocation(to, current, append, this);
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '3.4.3';
VueRouter.isNavigationFailure = isNavigationFailure;
VueRouter.NavigationFailureType = NavigationFailureType;

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["default"] = (VueRouter);


/***/ }),

/***/ "./node_modules/vue/dist/vue.runtime.esm.js":
/*!**************************************************!*\
  !*** ./node_modules/vue/dist/vue.runtime.esm.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.6.12
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var isUsingMicroTask = false;

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ( true && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.12';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false'
    ? 'false'
    // allow arbitrary string value for contenteditable
    : key === 'contenteditable' && isValidContentEditableValue(value)
      ? value
      : 'true'
};

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
       true && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (true) {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ( true && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (true) {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (true) {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly
  ) {
    if (oldVnode === vnode) {
      return
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (true) {
          checkDuplicateKeys(ch);
        }
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (true) {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ( true &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ( true &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (true) {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && value !== '' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

/*  */

/*  */

/*  */

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1 (event, handler, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

// #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1 (
  name,
  handler,
  capture,
  passive
) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;
    handler = original._wrapper = function (e) {
      if (
        // no bubbling, should always fire.
        // this is just a safety net in case event.timeStamp is unreliable in
        // certain weird environments...
        e.target === e.currentTarget ||
        // event is fired after handler attachment
        e.timeStamp >= attachedTimestamp ||
        // bail for environments that have buggy event.timeStamp implementations
        // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
        // #9681 QtWebEngine event.timeStamp is negative value
        e.timeStamp <= 0 ||
        // #9448 bail if event is fired in another document in a multi-page
        // electron/nw.js app, since event.timeStamp will be using a different
        // starting reference
        e.target.ownerDocument !== document
      ) {
        return original.apply(this, arguments)
      }
    };
  }
  target$1.addEventListener(
    name,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  name,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    name,
    handler._wrapper || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

var svgContainer;

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if (
      // skip the update if old and new VDOM state is the same.
      // `value` is handled separately because the DOM value may be temporarily
      // out of sync with VDOM state due to focus, composition and modifiers.
      // This  #4521 by skipping the unnecessary `checked` update.
      cur !== oldProps[key]
    ) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

var whitespaceRE = /\s+/;

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  // JSDOM may return undefined for transition properties
  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors
function toMs (s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ( true && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ( true && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
     true && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };

var isVShowDirective = function (d) { return d.name === 'show'; };

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(isNotTextNode);
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ( true && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ( true &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  beforeMount: function beforeMount () {
    var this$1 = this;

    var update = this._update;
    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1);
      // force removing pass
      this$1.__patch__(
        this$1._vnode,
        this$1.kept,
        false, // hydrating
        true // removeOnly (!important, avoids unnecessary moves)
      );
      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (true) {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (e && e.target !== el) {
            return
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (
        true
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if ( true &&
      config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/vuex/dist/vuex.esm.js":
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createLogger, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLogger", function() { return createLogger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.5.1
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index = {
  Store: Store,
  install: install,
  version: '3.5.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/App.vue":
/*!*********************!*\
  !*** ./src/App.vue ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=7ba5bd90& */ "./src/App.vue?vue&type=template&id=7ba5bd90&");
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ "./src/App.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__["render"],
  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/App.vue?vue&type=script&lang=js&":
/*!**********************************************!*\
  !*** ./src/App.vue?vue&type=script&lang=js& ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_poi_lib_webpack_babel_loader_js_ref_1_0_node_modules_cache_loader_dist_cjs_js_ref_2_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/poi/lib/webpack/babel-loader.js??ref--1-0!../node_modules/cache-loader/dist/cjs.js??ref--2-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=js& */ "./node_modules/poi/lib/webpack/babel-loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_poi_lib_webpack_babel_loader_js_ref_1_0_node_modules_cache_loader_dist_cjs_js_ref_2_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!****************************************************!*\
  !*** ./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \****************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_0e7e156d_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_2_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"0e7e156d-vue-loader-template"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--2-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=7ba5bd90& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"0e7e156d-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_0e7e156d_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_2_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_0e7e156d_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_2_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/apps sync recursive router\\.js$":
/*!***********************************!*\
  !*** ./src/apps sync router\.js$ ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./src/apps sync recursive router\\.js$";

/***/ }),

/***/ "./src/apps sync recursive store\\.js$":
/*!**********************************!*\
  !*** ./src/apps sync store\.js$ ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./src/apps sync recursive store\\.js$";

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App */ "./src/App.vue");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./router */ "./src/router.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store */ "./src/store.js");
/* harmony import */ var lib_flexible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lib-flexible */ "./node_modules/lib-flexible/flexible.js");
/* harmony import */ var lib_flexible__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lib_flexible__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _static_js_JSBridge__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../static/js/JSBridge */ "./static/js/JSBridge.js");
/* harmony import */ var sa_sdk_javascript__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! sa-sdk-javascript */ "./node_modules/sa-sdk-javascript/sensorsdata.min.js");
/* harmony import */ var sa_sdk_javascript__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(sa_sdk_javascript__WEBPACK_IMPORTED_MODULE_6__);



 // 解决Android机器页面不再受到用户字体缩放强制改变大小


 // 加入神策

 // import VueOrionSDK from './components/custom/LhAdNew.vue'
// start 阿里云ARMS

/**
 * qsc环境  <==>  阿里云控制台对应选项
 * 本地 => 本地环境
 * 测试 => 日常环境
 * 预生产 => 预发环境
 * 正式  => 线上环境
 * **/

var BrowserLogger = __webpack_require__(/*! alife-logger */ "./node_modules/alife-logger/lib/index.js");

var __bl = BrowserLogger.singleton({
  pid: "hvd9oaga9s@9dd07b8a2d4b047",
  appType: "web",
  imgUrl: "https://arms-retcode.aliyuncs.com/r.png?",
  sendResource: true,
  enableLinkTrace: true,
  behavior: true,
  enableSPA: true,
  environment: process.env.ARMS_ENV
}); // end 阿里云ARMS
// __bl.sum('fe-httpError-5xx-test', '1')
// __bl.sum('fe-httpError-4xx-test', '1')
// import { wechat } from 'library'
// import { resolve } from 'dns';
// Vue.component(VueOrionSDK.name, VueOrionSDK)
// Vue.use(ConfigPlugin, {
//     $layout: 'VIEW_BOX'
// })
// Vue.use(Toast)
// console.log = (function(oriLogFunc){
//     return function(str)
//     {}
//   })(console.log);
// 开发环境使用mock数据，打包的时候并不会将其打包进去


if (true) {// require('@/http/mock/index.js')
}

vue__WEBPACK_IMPORTED_MODULE_0__["default"].config.productionTip = false;
/* eslint-disable no-new */

new vue__WEBPACK_IMPORTED_MODULE_0__["default"]({
  el: '#app',
  router: _router__WEBPACK_IMPORTED_MODULE_2__["default"],
  store: _store__WEBPACK_IMPORTED_MODULE_3__["default"],
  components: {
    App: _App__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  template: '<App/>'
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm.js");


vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vue_router__WEBPACK_IMPORTED_MODULE_1__["default"]); // 动态获取路由，请在各个app中填写

var routerFiles = __webpack_require__("./src/apps sync recursive router\\.js$");

var routes = routerFiles.keys().map(function (rfPath) {
  return routerFiles(rfPath).default;
});
var router = new vue_router__WEBPACK_IMPORTED_MODULE_1__["default"]({
  mode: 'history',
  routes: routes
});
/*
router.afterEach((to ,from) => {
  
})
*/

/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");


vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vuex__WEBPACK_IMPORTED_MODULE_1__["default"]);

var modulesFiles = __webpack_require__("./src/apps sync recursive store\\.js$"); // 你不需要 `import app from './modules/app'`
// 它将加载所有的 vuex 组件


var modules = modulesFiles.keys().reduce(function (modules, modulePath) {
  // set './app.js' => 'app'
  var moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  var value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});
var store = new vuex__WEBPACK_IMPORTED_MODULE_1__["default"].Store({
  modules: modules
});
/* harmony default export */ __webpack_exports__["default"] = (store);

/***/ }),

/***/ "./static/js/JSBridge.js":
/*!*******************************!*\
  !*** ./static/js/JSBridge.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable */
var bridge = {
  default: undefined,
  // for typescript
  call: function call(method, args, cb) {
    var ret = '';

    if (typeof args == 'function') {
      cb = args;
      args = {};
    }

    var arg = {
      data: args === undefined ? null : args
    };

    if (typeof cb == 'function') {
      var cbName = 'dscb' + window.dscb++;
      window[cbName] = cb;
      arg['_dscbstub'] = cbName;
    }

    arg = JSON.stringify(arg); //if in webview that dsBridge provided, call!

    if (window._dsbridge) {
      ret = _dsbridge.call(method, arg);
    } else if (window._dswk || navigator.userAgent.indexOf("_dsbridge") != -1) {
      ret = prompt("_dsbridge=" + method, arg);
    }

    return JSON.parse(ret || '{}').data;
  },
  register: function register(name, fun, asyn) {
    var q = asyn ? window._dsaf : window._dsf;

    if (!window._dsInit) {
      window._dsInit = true; //notify native that js apis register successfully on next event loop

      setTimeout(function () {
        bridge.call("_dsb.dsinit");
      }, 0);
    }

    if (_typeof(fun) == "object") {
      q._obs[name] = fun;
    } else {
      q[name] = fun;
    }
  },
  registerAsyn: function registerAsyn(name, fun) {
    this.register(name, fun, true);
  },
  hasNativeMethod: function hasNativeMethod(name, type) {
    return this.call("_dsb.hasNativeMethod", {
      name: name,
      type: type || "all"
    });
  },
  disableJavascriptDialogBlock: function disableJavascriptDialogBlock(disable) {
    this.call("_dsb.disableJavascriptDialogBlock", {
      disable: disable !== false
    });
  }
};
;

(function (w, doc) {
  //insert dsbridge
  if (window._dsf) {} else {
    var ob = {
      _dsf: {
        _obs: {}
      },
      _dsaf: {
        _obs: {}
      },
      dscb: 0,
      dsBridge: bridge,
      close: function close() {
        bridge.call("_dsb.closePage");
      },
      _dshandleMessageFromNative: function _dshandleMessageFromNative(info) {
        var arg = JSON.parse(info.data);
        var ret = {
          id: info.callbackId,
          complete: true
        };
        var f = this._dsf[info.method];
        var af = this._dsaf[info.method];

        var callSyn = function callSyn(f, ob) {
          ret.data = f.apply(ob, arg);
          bridge.call("_dsb.returnValue", ret);
        };

        var callAsyn = function callAsyn(f, ob) {
          arg.push(function (data, complete) {
            ret.data = data;
            ret.complete = complete !== false;
            bridge.call("_dsb.returnValue", ret);
          });
          f.apply(ob, arg);
        };

        if (f) {
          callSyn(f, this._dsf);
        } else if (af) {
          callAsyn(af, this._dsaf);
        } else {
          //with namespace
          var name = info.method.split('.');
          if (name.length < 2) return;
          var method = name.pop();
          var namespace = name.join('.');
          var obs = this._dsf._obs;
          var ob = obs[namespace] || {};
          var m = ob[method];

          if (m && typeof m == "function") {
            callSyn(m, ob);
            return;
          }

          obs = this._dsaf._obs;
          ob = obs[namespace] || {};
          m = ob[method];

          if (m && typeof m == "function") {
            callAsyn(m, ob);
            return;
          }
        }
      }
    };

    for (var attr in ob) {
      window[attr] = ob[attr];
    }

    bridge.register("_hasJavascriptMethod", function (method, tag) {
      var name = method.split('.');

      if (name.length < 2) {
        return !!(_dsf[name] || _dsaf[name]);
      } else {
        // with namespace
        var method = name.pop();
        var namespace = name.join('.');
        var ob = _dsf._obs[namespace] || _dsaf._obs[namespace];
        return ob && !!ob[method];
      }
    });
  }

  if (w.JSBridge) return; // PRIVATE VARIABLES
  //!!! WARNING - Should be in SYNC with Native Code defines - Begin

  var JSBRIDGE_URL_SCHEME = 'jsbridgeurlscheme';
  var JSBRIDGE_URL_MESSAGE = '__JSB_URL_MESSAGE__';
  var JSBRIDGE_URL_EVENT = '__JSB_URL_EVENT__';
  var JSBRIDGE_URL_API = '__JSB_URL_API__'; //!!! WARNING - Should be in SYNC with Native Code defines - End

  var ua = navigator.userAgent;
  var isIOSDevice = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  var isAndroidDevice = /Android/g.test(ua);
  var sendMessageQueue = [];
  var receiveMessageQueue = [];
  var messageHandlers = {};
  var responseCallbacks = {};
  var apiData = null;
  var uniqueId = 1;
  var messagingIframe; // PRIVATE METHODS

  function JSBridgeLog() {
    if (typeof console != 'undefined') {
      console.log("JSBridge:JS: LOG: ", arguments);
    }
  }

  function JSBridgeLogException(e, m) {
    if (typeof console != 'undefined') {
      console.error("JSBridge:JS: EXCEPTION: ", arguments);
    }
  }

  function getIFrameSrc(param) {
    return JSBRIDGE_URL_SCHEME + '://' + JSBRIDGE_URL_MESSAGE + '/' + param;
  }

  function callObjCAPI(name, data) {
    // Should not called triggerNativeCall as iFrame needs to be deleted in order to get the retvalue.
    var iframe = document.createElement("IFRAME");
    apiData = {
      api: name
    };
    if (data) apiData["data"] = data;
    iframe.setAttribute("src", getIFrameSrc(JSBRIDGE_URL_API));
    document.documentElement.appendChild(iframe);
    iframe.parentNode.removeChild(iframe);
    iframe = null;
    var ret = JSBridge.nativeReturnValue;
    JSBridge.nativeReturnValue = undefined; // alert(ret);

    if (isObject(ret)) {
      return JSON.stringify(ret);
    }

    if (ret) return ret;
  }

  function isObject(obj) {
    var type = _typeof(obj);

    return type === 'function' || type === 'object' && !!obj;
  }

  ; // function triggerNativeCall() {
  //     if (isIOSDevice) {
  //         messagingIframe.src = getIFrameSrc(JSBRIDGE_URL_EVENT);
  //     } else {
  //         var apiName = ((isAndroidDevice) ? ("AndroidAPI.ProcessJSEventQueue") : ("WebAppAPI.ProcessJSEventQueue"));
  //         try {
  //             var api = eval(apiName);
  //             if (api) api(_fetchJSEventQueue());
  //         } catch (e) {}
  //     }
  // }

  function triggerNativeCall() {
    if (isIOSDevice) {
      messagingIframe.src = getIFrameSrc(JSBRIDGE_URL_EVENT);
    } else {
      if (window.AndroidAPI) {
        try {
          AndroidAPI.ProcessJSEventQueue(_fetchJSEventQueue());
        } catch (e) {}
      } else {
        JSBridgeLogException("Unsupported API:", name);
      }
    }
  }

  function doSend(message, responseCallback) {
    if (responseCallback) {
      var callbackId = 'cb_' + uniqueId++ + '_' + new Date().getTime();
      responseCallbacks[callbackId] = responseCallback;
      message['callbackId'] = callbackId;
    }

    sendMessageQueue.push(message);
    triggerNativeCall();
  }

  function dispatchMessageFromNative(messageJSON) {
    setTimeout(function _timeoutDispatchMessageFromObjC() {
      var message = JSON.parse(messageJSON);
      var messageHandler;
      var responseCallback;

      if (message.responseId) {
        responseCallback = responseCallbacks[message.responseId];

        if (!responseCallback) {
          return;
        }

        responseCallback(message.responseData);
        delete responseCallbacks[message.responseId];
      } else {
        if (message.callbackId) {
          var callbackResponseId = message.callbackId;

          responseCallback = function responseCallback(responseData) {
            doSend({
              responseId: callbackResponseId,
              responseData: responseData
            });
          };
        }

        try {
          var handler = message.eventName ? messageHandlers[message.eventName] : JSBridge.bridgeHandler;

          if (handler) {
            handler(message.data, responseCallback);
          }
        } catch (e) {
          JSBridgeLogException(e, "dispatchMessageFromNative");
        }
      }
    });
  }

  function getReturnObject(apiName, status, dataJson) {
    var outJson = {
      status: status
    };
    if (apiName) outJson["apiName"] = apiName;
    if (dataJson) outJson["data"] = dataJson;
    return outJson;
  } // PUBLIC METHODS


  function init(bridgeHandler) {
    if (JSBridge.bridgeHandler) {
      JSBridgeLogException(e, "init");
    }

    JSBridge.bridgeHandler = bridgeHandler;
    var receivedMessages = receiveMessageQueue;
    receiveMessageQueue = null;

    for (var i = 0; i < receivedMessages.length; i++) {
      dispatchMessageFromNative(receivedMessages[i]);
    }
  }

  function send(eventName, data, responseCallback) {
    var dataToSend = {};
    if (eventName) dataToSend["eventName"] = eventName;
    dataToSend["data"] = {
      status: "true"
    };
    if (data) dataToSend["data"]["data"] = data;
    doSend(dataToSend, responseCallback);
  }

  function registerEvent(eventName, handler) {
    if (isIOSDevice) {
      dsBridge.register(eventName, handler);
    } else {
      messageHandlers[eventName] = handler;
    }
  }

  function deRegisterEvent(eventName, handler) {
    if (messageHandlers[eventName]) {
      delete messageHandlers[eventName];
    }
  }

  function callAPI(name, data, responseCallback) {
    if (isIOSDevice) {
      //ios use javascript core
      if (!data) {
        data = {};
        data.es_method = "sync";
      } else {
        data.es_method = "sync";
      }

      if (responseCallback) {
        data.es_method = "async";
        dsBridge.call(name, data, function (v) {
          var ret = v;

          if (isObject(v)) {
            ret = JSON.stringify(v);
          }

          responseCallback(ret);
        });
      } else {
        var ret = dsBridge.call(name, data);

        if (isObject(ret)) {
          return JSON.stringify(ret);
        }

        return ret;
      }
    } else {
      try {
        if (!data) {
          data = {
            "key": "value"
          };
        }

        if (data) {
          if (responseCallback) {
            var cbID = "cbID" + +new Date();
            responseCallbacks[cbID] = responseCallback;
            data["callbackID"] = cbID;
          }

          try {
            data = JSON.stringify(data);
          } catch (e) {}
        }

        if (isIOSDevice) {
          if (data) name += ":";
          return callObjCAPI(name, data);
        } else {
          // var api = eval((isAndroidDevice) ? ("AndroidAPI.ProcessJSAPIRequest") : ("WebAppAPI.ProcessJSAPIRequest"));
          // if (api) {
          //     if (data) return api(name, data);
          //     return api(name, null);
          // } else {
          //     JSBridgeLogException("Unsupported API:", name);
          // }
          if (window.AndroidAPI) {
            if (data) return AndroidAPI.ProcessJSAPIRequest(name, data);
            return AndroidAPI.ProcessJSAPIRequest(name, null);
          } else {
            JSBridgeLogException("Unsupported API:", name);
          }
        }
      } catch (e) {
        JSBridgeLogException(e, "Invalid API:" + name);
      }
    }
  }

  function callAPICallback(apiCallback, outJson, status) {
    if (apiCallback) {
      apiCallback(getReturnObject(null, status ? status : "true", outJson));
    }
  }

  function callEventCallback(responseCallback, outJson, inJson) {
    if (responseCallback) {
      responseCallback(getReturnObject(inJson ? inJson["eventName"] : null, "true", outJson));
    }
  }

  function _fetchJSEventQueue() {
    try {
      var messageQueueString = JSON.stringify(sendMessageQueue);
      sendMessageQueue = [];
      return messageQueueString;
    } catch (e) {
      JSBridgeLogException(e, "_fetchJSEventQueue");
    }

    return [];
  }

  function _handleMessageFromNative(messageJSON) {
    if (receiveMessageQueue) {
      receiveMessageQueue.push(messageJSON);
    } else {
      dispatchMessageFromNative(messageJSON);
    }
  }

  function _getAPIData() {
    return JSON.stringify(apiData);
  }

  function _invokeJSCallback(cbID, removeAfterExecute, config) {
    if (cbID) {
      var cb = responseCallbacks[cbID];

      if (cb) {
        if (removeAfterExecute) delete responseCallbacks[cbID];
        var data = config;

        if (isAndroidDevice) {
          try {
            data = JSON.parse(config);
          } catch (e) {}
        }

        if (isObject(data)) {
          data = JSON.stringify(data);
        }

        if (data.callbackID) delete data.callbackID;
        cb.call(null, data);
      }
    }
  }

  ;
  w.JSBridge = {
    init: init.bind(this),
    send: send.bind(this),
    callAPI: callAPI.bind(this),
    registerEvent: registerEvent.bind(this),
    deRegisterEvent: deRegisterEvent.bind(this),
    callAPICallback: callAPICallback.bind(this),
    callEventCallback: callEventCallback.bind(this),
    _fetchJSEventQueue: _fetchJSEventQueue.bind(this),
    _handleMessageFromNative: _handleMessageFromNative.bind(this),
    _getAPIData: _getAPIData.bind(this),
    _invokeJSCallback: _invokeJSCallback.bind(this)
  };
  messagingIframe = doc.createElement('iframe');
  messagingIframe.style.display = 'none';
  triggerNativeCall();
  doc.documentElement.appendChild(messagingIframe);
  var readyEvent = doc.createEvent('Events');
  readyEvent.initEvent('JSBridgeReady');
  readyEvent.bridge = JSBridge;
  doc.dispatchEvent(readyEvent);
})(window, document);

/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    console.log(123456);
  }
});

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.js */"./src/index.js");


/***/ })

/******/ });
//# sourceMappingURL=index.js.map