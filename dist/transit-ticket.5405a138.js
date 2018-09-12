// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"scss/index.scss":[function(require,module,exports) {

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/eventHub.js":[function(require,module,exports) {
window.eventHub = {
    events: {},
    emit: function emit(eventName, data) {
        var fnList = this.events[eventName];
        fnList.map(function (fn) {
            fn.call(undefined, data);
        });
    },
    on: function on(eventName, fn) {
        if (this.events[eventName] === undefined) {
            this.events[eventName] = [];
        };
        this.events[eventName].push(fn);
    },
    off: function off() {}
};
},{}],"js/timer.js":[function(require,module,exports) {
{
    var view = {
        el: '#timer',
        render: function render(data) {
            var _ref = data || '',
                time = _ref.time;

            if (time) {
                document.querySelector(this.el + ' > .time').textContent = time.hour + ':' + time.minute + ':' + time.second + ' ' + time.period;
                document.querySelector(this.el + ' > .date').textContent = time.weekday + ', ' + time.month + ' ' + time.day + ', ' + time.year;
            }
        }
    };

    var model = {
        data: {}
    };

    var controller = {
        init: function init(view, model) {
            this.view = view;
            this.model = model;
            this.view.render();
            this.bindEvent();
        },
        bindEvent: function bindEvent() {
            var _this = this;

            var time = void 0;
            setInterval(function () {
                time = _this.getTime();
                _this.model.data.time = time;
                _this.view.render(_this.model.data);
            }, 1000);
        },
        getTime: function getTime() {
            var time = new Date();
            var timeSet = {
                year: time.getFullYear(),
                month: this.getMonthName(time.getMonth()),
                day: time.getDate(),
                hour: this.convertSmallTime(time.getHours()),
                minute: this.convertSmallTime(time.getMinutes()),
                second: this.convertSmallTime(time.getSeconds()),
                weekday: this.getWeekDay(time.getDay()),
                period: time.getHours() < 12 ? 'AM' : 'PM'
            };
            return timeSet;
        },
        getWeekDay: function getWeekDay(e) {
            return isNaN(e) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][e];
        },
        convertSmallTime: function convertSmallTime(time) {
            var newTime = time < 10 ? '0' + time : time;
            return newTime;
        },
        getMonthName: function getMonthName(e) {
            return isNaN(e) ? null : ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][e];
        }
    };

    controller.init(view, model);
}
},{}],"js/color.js":[function(require,module,exports) {
{
    var view = {
        el: '#colorBar',
        template: '\n            <div class="color"></div>\n            <div class="color"></div>\n            <div class="color"></div>\n        ',
        render: function render(data) {
            document.querySelector(this.el).innerHTML = this.template;
            colors = data.colors;
            var colorDoms = document.querySelectorAll('.color');
            for (var _i = 0; _i < colorDoms.length; _i++) {
                colorDoms[_i].style.backgroundColor = colors[_i];
            }
        }
    };

    var model = {
        data: {
            colors: ['#385656', '#BDD2E7', '#EEDB88']
        }
    };

    var controller = {
        init: function init(view, model) {
            this.view = view;
            this.model = model;
            this.view.render(this.model.data);
            this.bindEvent();
            this.bindEventHub();
        },
        bindEvent: function bindEvent() {},
        bindEventHub: function bindEventHub() {
            var _this = this;

            eventHub.on('color-inputed', function (data) {
                var colors = [];
                for (i in data) {
                    colors.push(data[i]);
                }

                _this.changeColor(colors);
            });
        },
        changeColor: function changeColor(data) {
            this.model.data.colors = data;
            this.view.render(this.model.data);
        }
    };

    controller.init(view, model);
}
},{}],"js/color-input.js":[function(require,module,exports) {
{
    var view = {
        el: '#colorInput',
        template: '\n            <form>\n                <span class="close">Close</span>\n                <label>\n                Left Color\n                <input name="left" placeholder="colorCode" type=\'color\'>\n                </label>\n                <label>\n                Middle Color\n                <input name="middle" placeholder="colorCode" type=\'color\'>\n                </label>\n                <label>\n                Right Color\n                <input name="right" placeholder="colorCode" type=\'color\'>\n                </label>\n\n                <input type="submit" value="Change">\n            </form>\n        ',

        init: function init() {
            this.$el = document.querySelector(this.el);
        },
        render: function render() {
            this.$el.innerHTML = this.template;
            this.$form = this.$el.querySelector('form');
        }
    };

    var model = {
        data: {}
    };

    var controller = {
        init: function init(view, model) {
            this.view = view;
            this.model = model;
            this.view.init();
            this.view.render();
            this.bindEvent();
            this.bindEventHub();
        },
        bindEvent: function bindEvent() {
            var _this = this;

            this.view.$el.addEventListener('submit', function (e) {
                e.preventDefault();
                var colorValues = {};
                if (e.target && e.target.nodeName.toUpperCase() == "FORM") {
                    colorValues.left = _this.view.$form.left.value;
                    colorValues.middle = _this.view.$form.middle.value;
                    colorValues.right = _this.view.$form.right.value;
                }
                eventHub.emit('color-inputed', colorValues);
                _this.view.$el.classList.remove('active');
            });

            this.view.$el.addEventListener('click', function (e) {
                if (e.target && e.target.classList[0] === "close") {
                    _this.view.$el.classList.remove('active');
                }
            });
        },
        bindEventHub: function bindEventHub() {
            var _this2 = this;

            eventHub.on('open-color-input', function () {
                _this2.view.$el.classList.add('active');
            });
        }
    };

    controller.init(view, model);
}
},{}],"js/header-color-picker.js":[function(require,module,exports) {
{
    var view = {
        el: '#headColorInput',
        template: '\n            <form>\n                <label>\n                Right Color\n                <input name="color" placeholder="colorCode" type=\'color\'>\n                </label>\n\n                <input type="submit" value="Change">\n            </form>\n        ',

        init: function init() {
            this.$el = document.querySelector(this.el);
        },
        render: function render() {
            this.$el.innerHTML = this.template;
            this.$form = this.$el.querySelector('form');
        }
    };

    var model = {
        data: {}
    };

    var controller = {
        init: function init(view, model) {
            this.view = view;
            this.model = model;
            this.view.init();
            this.view.render();
            this.bindEvent();
            this.bindEventHub();
        },
        bindEvent: function bindEvent() {
            var _this = this;

            this.view.$el.addEventListener('submit', function (e) {
                e.preventDefault();
                var colorValues = {};
                if (e.target && e.target.nodeName.toUpperCase() == "FORM") {
                    colorValues.color = _this.view.$form.color.value;
                }
                // eventHub.emit('color-inputed', colorValues);
                console.log(colorValues);
                document.querySelector('.top').style.background = 'linear-gradient(180deg, ' + colorValues.color + ' 0%, rgba(255,255,255,1) 50%, ' + colorValues.color + ' 100%)';
                _this.view.$el.classList.remove('active');
            });

            this.view.$el.addEventListener('click', function (e) {
                if (e.target && e.target.classList[0] === "close") {
                    _this.view.$el.classList.remove('active');
                }
            });
        },
        bindEventHub: function bindEventHub() {
            var _this2 = this;

            eventHub.on('open-head-color-input', function () {
                _this2.view.$el.classList.add('active');
            });
        }
    };

    controller.init(view, model);
}
},{}],"index.js":[function(require,module,exports) {
"use strict";

require("./scss/index.scss");

require("./js/eventHub");

require("./js/timer");

require("./js/color");

require("./js/color-input");

require("./js/header-color-picker");

function CountDown(ele, duration) {
    this.ele = ele;
    this.timeToCountDown = duration;
}

CountDown.prototype = {
    render: function render(time) {
        this.ele.textContent = 'Expires in ' + time.day + ':' + time.hours + ':' + time.minutes + ':' + time.seconds;
    },
    startCount: function startCount() {
        var _this = this;

        this.render(this.timeToCountDown);
        var update = function update() {
            setTimeout(function () {
                if (_this.timeToCountDown > 0) {
                    _this.timeToCountDown--;
                    var newTime = _this.formate(_this.timeToCountDown);
                    _this.render(newTime);
                    update();
                } else {
                    alert('expired!');
                };
            }, 1000);
        };
        update();
    },
    formate: function formate(time) {
        var timeSet = {
            day: '00',
            hours: this.convertSmallTime(Math.floor(time / 60 / 60)),
            minutes: this.convertSmallTime(Math.floor(time / 60) % 60),
            seconds: this.convertSmallTime(time % 60)
        };
        return timeSet;
    },
    convertSmallTime: function convertSmallTime(time) {
        var newTime = time < 10 ? '0' + time : time;
        return newTime;
    }
};

var time = new CountDown(document.querySelector('#countDown'), 60 * 60 * 2.8);
time.startCount();

// listen to color-input component Open
document.querySelector('#back').addEventListener('click', function () {
    eventHub.emit('open-color-input');
});

// listen to head-color-input component Open
document.querySelector('.top').addEventListener('click', function () {
    eventHub.emit('open-head-color-input');
});
},{"./scss/index.scss":"scss/index.scss","./js/eventHub":"js/eventHub.js","./js/timer":"js/timer.js","./js/color":"js/color.js","./js/color-input":"js/color-input.js","./js/header-color-picker":"js/header-color-picker.js"}],"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '63298' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/transit-ticket.5405a138.map