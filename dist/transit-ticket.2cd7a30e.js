parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"YvtQ":[function(require,module,exports) {

},{}],"Q280":[function(require,module,exports) {
window.eventHub={events:{},emit:function(n,t){this.events[n].map(function(n){n.call(void 0,t)})},on:function(n,t){void 0===this.events[n]&&(this.events[n]=[]),this.events[n].push(t)},off:function(){}};
},{}],"yCUT":[function(require,module,exports) {
var e={el:"#timer",render:function(e){var t=(e||"").time;t&&(document.querySelector(this.el+" > .time").textContent=t.hour+":"+t.minute+":"+t.second+" "+t.period,document.querySelector(this.el+" > .date").textContent=t.weekday+", "+t.month+" "+t.day+", "+t.year)}},t={data:{}},n={init:function(e,t){this.view=e,this.model=t,this.view.render(),this.bindEvent()},bindEvent:function(){var e=this,t=void 0;setInterval(function(){t=e.getTime(),e.model.data.time=t,e.view.render(e.model.data)},1e3)},getTime:function(){var e=new Date;return{year:e.getFullYear(),month:this.getMonthName(e.getMonth()),day:e.getDate(),hour:this.convertSmallTime(e.getHours()),minute:this.convertSmallTime(e.getMinutes()),second:this.convertSmallTime(e.getSeconds()),weekday:this.getWeekDay(e.getDay()),period:e.getHours()<12?"AM":"PM"}},getWeekDay:function(e){return isNaN(e)?null:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][e]},convertSmallTime:function(e){return e<10?"0"+e:e},getMonthName:function(e){return isNaN(e)?null:["Jan","Feb","March","April","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][e]}};n.init(e,t);
},{}],"rzxb":[function(require,module,exports) {
var o={el:"#colorBar",template:'\n            <div class="color"></div>\n            <div class="color"></div>\n            <div class="color"></div>\n        ',render:function(o){document.querySelector(this.el).innerHTML=this.template,colors=o.colors;for(var n=document.querySelectorAll(".color"),i=0;i<n.length;i++)n[i].style.backgroundColor=colors[i]}},n={data:{colors:["#385656","#BDD2E7","#EEDB88"]}},t={init:function(o,n){this.view=o,this.model=n,this.view.render(this.model.data),this.bindEvent(),this.bindEventHub()},bindEvent:function(){},bindEventHub:function(){var o=this;eventHub.on("color-inputed",function(n){var t=[];for(i in n)t.push(n[i]);o.changeColor(t)})},changeColor:function(o){this.model.data.colors=o,this.view.render(this.model.data)}};t.init(o,n);
},{}],"K00i":[function(require,module,exports) {
var e={el:"#colorInput",template:'\n            <form>\n                <span class="close">Close</span>\n                <label>\n                Left Color\n                <input name="left" placeholder="colorCode" type=\'color\'>\n                </label>\n                <label>\n                Middle Color\n                <input name="middle" placeholder="colorCode" type=\'color\'>\n                </label>\n                <label>\n                Right Color\n                <input name="right" placeholder="colorCode" type=\'color\'>\n                </label>\n\n                <input type="submit" value="Change">\n            </form>\n        ',init:function(){this.$el=document.querySelector(this.el)},render:function(){this.$el.innerHTML=this.template,this.$form=this.$el.querySelector("form")}},t={data:{}},i={init:function(e,t){this.view=e,this.model=t,this.view.init(),this.view.render(),this.bindEvent(),this.bindEventHub()},bindEvent:function(){var e=this;this.view.$el.addEventListener("submit",function(t){t.preventDefault();var i={};t.target&&"FORM"==t.target.nodeName.toUpperCase()&&(i.left=e.view.$form.left.value,i.middle=e.view.$form.middle.value,i.right=e.view.$form.right.value),eventHub.emit("color-inputed",i),e.view.$el.classList.remove("active")}),this.view.$el.addEventListener("click",function(t){t.target&&"close"===t.target.classList[0]&&e.view.$el.classList.remove("active")})},bindEventHub:function(){var e=this;eventHub.on("open-color-input",function(){e.view.$el.classList.add("active")})}};i.init(e,t);
},{}],"Focm":[function(require,module,exports) {
"use strict";function e(e,t){this.ele=e,this.timeToCountDown=t}require("./scss/index.scss"),require("./js/eventHub"),require("./js/timer"),require("./js/color"),require("./js/color-input"),e.prototype={render:function(e){this.ele.textContent="Expires in "+e.day+":"+e.hours+":"+e.minutes+":"+e.seconds},startCount:function(){var e=this;this.render(this.timeToCountDown);!function t(){setTimeout(function(){if(e.timeToCountDown>0){e.timeToCountDown--;var n=e.formate(e.timeToCountDown);e.render(n),t()}else alert("expired!")},1e3)}()},formate:function(e){return{day:"00",hours:this.convertSmallTime(Math.floor(e/60/60)),minutes:this.convertSmallTime(Math.floor(e/60)%60),seconds:this.convertSmallTime(e%60)}},convertSmallTime:function(e){return e<10?"0"+e:e}};var t=new e(document.querySelector("#countDown"),10080);t.startCount(),document.querySelector("#back").addEventListener("click",function(){eventHub.emit("open-color-input")});
},{"./scss/index.scss":"YvtQ","./js/eventHub":"Q280","./js/timer":"yCUT","./js/color":"rzxb","./js/color-input":"K00i"}]},{},["Focm"], null)
//# sourceMappingURL=transit-ticket.2cd7a30e.map