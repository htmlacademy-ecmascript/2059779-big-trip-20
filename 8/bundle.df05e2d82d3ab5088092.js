(()=>{var t={10:(t,e,n)=>{"use strict";n.d(e,{Z:()=>a});var s=n(537),i=n.n(s),r=n(645),o=n.n(r)()(i());o.push([t.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const a=o},645:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",s=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),s&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),s&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,s,i,r){"string"==typeof t&&(t=[[null,t,void 0]]);var o={};if(s)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(o[l]=!0)}for(var c=0;c<t.length;c++){var u=[].concat(t[c]);s&&o[u[0]]||(void 0!==r&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=r),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),i&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=i):u[4]="".concat(i)),e.push(u))}},e}},537:t=>{"use strict";t.exports=function(t){var e=t[1],n=t[3];if(!n)return e;if("function"==typeof btoa){var s=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),i="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),r="/*# ".concat(i," */");return[e].concat([r]).join("\n")}return[e].join("\n")}},484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",s="second",i="minute",r="hour",o="day",a="week",l="month",c="quarter",u="year",d="date",h="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var s=String(t);return!s||s.length>=e?t:""+Array(e+1-s.length).join(n)+t},y={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),s=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(s,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var s=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(s,l),r=n-i<0,o=e.clone().add(s+(r?-1:1),l);return+(-(s+(n-i)/(r?i-o:o-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:u,w:a,d:o,D:d,h:r,m:i,s,ms:n,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},_="en",g={};g[_]=v;var $=function(t){return t instanceof w},b=function t(e,n,s){var i;if(!e)return _;if("string"==typeof e){var r=e.toLowerCase();g[r]&&(i=r),n&&(g[r]=n,i=r);var o=e.split("-");if(!i&&o.length>1)return t(o[0])}else{var a=e.name;g[a]=e,i=a}return!s&&i&&(_=i),i||!s&&_},C=function(t,e){if($(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new w(n)},M=y;M.l=b,M.i=$,M.w=function(t,e){return C(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var w=function(){function v(t){this.$L=b(t.locale,null,!0),this.parse(t)}var m=v.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(M.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var s=e.match(f);if(s){var i=s[2]-1||0,r=(s[7]||"0").substring(0,3);return n?new Date(Date.UTC(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)):new Date(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return M},m.isValid=function(){return!(this.$d.toString()===h)},m.isSame=function(t,e){var n=C(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return C(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<C(t)},m.$g=function(t,e,n){return M.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,c=!!M.u(e)||e,h=M.p(t),f=function(t,e){var s=M.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return c?s:s.endOf(o)},p=function(t,e){return M.w(n.toDate()[t].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,m=this.$M,y=this.$D,_="set"+(this.$u?"UTC":"");switch(h){case u:return c?f(1,0):f(31,11);case l:return c?f(1,m):f(0,m+1);case a:var g=this.$locale().weekStart||0,$=(v<g?v+7:v)-g;return f(c?y-$:y+(6-$),m);case o:case d:return p(_+"Hours",0);case r:return p(_+"Minutes",1);case i:return p(_+"Seconds",2);case s:return p(_+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var a,c=M.p(t),h="set"+(this.$u?"UTC":""),f=(a={},a[o]=h+"Date",a[d]=h+"Date",a[l]=h+"Month",a[u]=h+"FullYear",a[r]=h+"Hours",a[i]=h+"Minutes",a[s]=h+"Seconds",a[n]=h+"Milliseconds",a)[c],p=c===o?this.$D+(e-this.$W):e;if(c===l||c===u){var v=this.clone().set(d,1);v.$d[f](p),v.init(),this.$d=v.set(d,Math.min(this.$D,v.daysInMonth())).$d}else f&&this.$d[f](p);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[M.p(t)]()},m.add=function(n,c){var d,h=this;n=Number(n);var f=M.p(c),p=function(t){var e=C(h);return M.w(e.date(e.date()+Math.round(t*n)),h)};if(f===l)return this.set(l,this.$M+n);if(f===u)return this.set(u,this.$y+n);if(f===o)return p(1);if(f===a)return p(7);var v=(d={},d[i]=t,d[r]=e,d[s]=1e3,d)[f]||1,m=this.$d.getTime()+n*v;return M.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||h;var s=t||"YYYY-MM-DDTHH:mm:ssZ",i=M.z(this),r=this.$H,o=this.$m,a=this.$M,l=n.weekdays,c=n.months,u=function(t,n,i,r){return t&&(t[n]||t(e,s))||i[n].slice(0,r)},d=function(t){return M.s(r%12||12,t,"0")},f=n.meridiem||function(t,e,n){var s=t<12?"AM":"PM";return n?s.toLowerCase():s},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:M.s(a+1,2,"0"),MMM:u(n.monthsShort,a,c,3),MMMM:u(c,a),D:this.$D,DD:M.s(this.$D,2,"0"),d:String(this.$W),dd:u(n.weekdaysMin,this.$W,l,2),ddd:u(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:M.s(r,2,"0"),h:d(1),hh:d(2),a:f(r,o,!0),A:f(r,o,!1),m:String(o),mm:M.s(o,2,"0"),s:String(this.$s),ss:M.s(this.$s,2,"0"),SSS:M.s(this.$ms,3,"0"),Z:i};return s.replace(p,(function(t,e){return e||v[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,d,h){var f,p=M.p(d),v=C(n),m=(v.utcOffset()-this.utcOffset())*t,y=this-v,_=M.m(this,v);return _=(f={},f[u]=_/12,f[l]=_,f[c]=_/3,f[a]=(y-m)/6048e5,f[o]=(y-m)/864e5,f[r]=y/e,f[i]=y/t,f[s]=y/1e3,f)[p]||y,h?_:M.a(_)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return g[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),s=b(t,e,!0);return s&&(n.$L=s),n},m.clone=function(){return M.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),D=w.prototype;return C.prototype=D,[["$ms",n],["$s",s],["$m",i],["$H",r],["$W",o],["$M",l],["$y",u],["$D",d]].forEach((function(t){D[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),C.extend=function(t,e){return t.$i||(t(e,w,C),t.$i=!0),C},C.locale=b,C.isDayjs=$,C.unix=function(t){return C(1e3*t)},C.en=g[_],C.Ls=g,C.p={},C}()},646:function(t){t.exports=function(){"use strict";var t,e,n=1e3,s=6e4,i=36e5,r=864e5,o=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,a=31536e6,l=2592e6,c=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,u={years:a,months:l,days:r,hours:i,minutes:s,seconds:n,milliseconds:1,weeks:6048e5},d=function(t){return t instanceof _},h=function(t,e,n){return new _(t,n,e.$l)},f=function(t){return e.p(t)+"s"},p=function(t){return t<0},v=function(t){return p(t)?Math.ceil(t):Math.floor(t)},m=function(t){return Math.abs(t)},y=function(t,e){return t?p(t)?{negative:!0,format:""+m(t)+e}:{negative:!1,format:""+t+e}:{negative:!1,format:""}},_=function(){function p(t,e,n){var s=this;if(this.$d={},this.$l=n,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),e)return h(t*u[f(e)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(e){s.$d[f(e)]=t[e]})),this.calMilliseconds(),this;if("string"==typeof t){var i=t.match(c);if(i){var r=i.slice(2).map((function(t){return null!=t?Number(t):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var m=p.prototype;return m.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(e,n){return e+(t.$d[n]||0)*u[n]}),0)},m.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=v(t/a),t%=a,this.$d.months=v(t/l),t%=l,this.$d.days=v(t/r),t%=r,this.$d.hours=v(t/i),t%=i,this.$d.minutes=v(t/s),t%=s,this.$d.seconds=v(t/n),t%=n,this.$d.milliseconds=t},m.toISOString=function(){var t=y(this.$d.years,"Y"),e=y(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var s=y(n,"D"),i=y(this.$d.hours,"H"),r=y(this.$d.minutes,"M"),o=this.$d.seconds||0;this.$d.milliseconds&&(o+=this.$d.milliseconds/1e3);var a=y(o,"S"),l=t.negative||e.negative||s.negative||i.negative||r.negative||a.negative,c=i.format||r.format||a.format?"T":"",u=(l?"-":"")+"P"+t.format+e.format+s.format+c+i.format+r.format+a.format;return"P"===u||"-P"===u?"P0D":u},m.toJSON=function(){return this.toISOString()},m.format=function(t){var n=t||"YYYY-MM-DDTHH:mm:ss",s={Y:this.$d.years,YY:e.s(this.$d.years,2,"0"),YYYY:e.s(this.$d.years,4,"0"),M:this.$d.months,MM:e.s(this.$d.months,2,"0"),D:this.$d.days,DD:e.s(this.$d.days,2,"0"),H:this.$d.hours,HH:e.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:e.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:e.s(this.$d.seconds,2,"0"),SSS:e.s(this.$d.milliseconds,3,"0")};return n.replace(o,(function(t,e){return e||String(s[t])}))},m.as=function(t){return this.$ms/u[f(t)]},m.get=function(t){var e=this.$ms,n=f(t);return"milliseconds"===n?e%=1e3:e="weeks"===n?v(e/u[n]):this.$d[n],0===e?0:e},m.add=function(t,e,n){var s;return s=e?t*u[f(e)]:d(t)?t.$ms:h(t,this).$ms,h(this.$ms+s*(n?-1:1),this)},m.subtract=function(t,e){return this.add(t,e,!0)},m.locale=function(t){var e=this.clone();return e.$l=t,e},m.clone=function(){return h(this.$ms,this)},m.humanize=function(e){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!e)},m.milliseconds=function(){return this.get("milliseconds")},m.asMilliseconds=function(){return this.as("milliseconds")},m.seconds=function(){return this.get("seconds")},m.asSeconds=function(){return this.as("seconds")},m.minutes=function(){return this.get("minutes")},m.asMinutes=function(){return this.as("minutes")},m.hours=function(){return this.get("hours")},m.asHours=function(){return this.as("hours")},m.days=function(){return this.get("days")},m.asDays=function(){return this.as("days")},m.weeks=function(){return this.get("weeks")},m.asWeeks=function(){return this.as("weeks")},m.months=function(){return this.get("months")},m.asMonths=function(){return this.as("months")},m.years=function(){return this.get("years")},m.asYears=function(){return this.as("years")},p}();return function(n,s,i){t=i,e=i().$utils(),i.duration=function(t,e){var n=i.locale();return h(t,{$l:n},e)},i.isDuration=d;var r=s.prototype.add,o=s.prototype.subtract;s.prototype.add=function(t,e){return d(t)&&(t=t.asMilliseconds()),r.bind(this)(t,e)},s.prototype.subtract=function(t,e){return d(t)&&(t=t.asMilliseconds()),o.bind(this)(t,e)}}}()},379:t=>{"use strict";var e=[];function n(t){for(var n=-1,s=0;s<e.length;s++)if(e[s].identifier===t){n=s;break}return n}function s(t,s){for(var r={},o=[],a=0;a<t.length;a++){var l=t[a],c=s.base?l[0]+s.base:l[0],u=r[c]||0,d="".concat(c," ").concat(u);r[c]=u+1;var h=n(d),f={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==h)e[h].references++,e[h].updater(f);else{var p=i(f,s);s.byIndex=a,e.splice(a,0,{identifier:d,updater:p,references:1})}o.push(d)}return o}function i(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,i){var r=s(t=t||[],i=i||{});return function(t){t=t||[];for(var o=0;o<r.length;o++){var a=n(r[o]);e[a].references--}for(var l=s(t,i),c=0;c<r.length;c++){var u=n(r[c]);0===e[u].references&&(e[u].updater(),e.splice(u,1))}r=l}}},569:t=>{"use strict";var e={};t.exports=function(t,n){var s=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(n)}},216:t=>{"use strict";t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{"use strict";t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{"use strict";t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var s="";n.supports&&(s+="@supports (".concat(n.supports,") {")),n.media&&(s+="@media ".concat(n.media," {"));var i=void 0!==n.layer;i&&(s+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),s+=n.css,i&&(s+="}"),n.media&&(s+="}"),n.supports&&(s+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(s+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleTagTransform(s,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{"use strict";t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(s){var i=e[s];if(void 0!==i)return i.exports;var r=e[s]={id:s,exports:{}};return t[s].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var s in e)n.o(e,s)&&!n.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0,(()=>{"use strict";var t=n(379),e=n.n(t),s=n(795),i=n.n(s),r=n(569),o=n.n(r),a=n(565),l=n.n(a),c=n(216),u=n.n(c),d=n(589),h=n.n(d),f=n(10),p={};p.styleTagTransform=h(),p.setAttributes=l(),p.insert=o().bind(null,"head"),p.domAPI=i(),p.insertStyleElement=u(),e()(f.Z,p),f.Z&&f.Z.locals&&f.Z.locals;const v="shake";class m{#t=null;constructor(){if(new.target===m)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#t||(this.#t=function(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}(this.template)),this.#t}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#t=null}shake(t){this.element.classList.add(v),setTimeout((()=>{this.element.classList.remove(v),t?.()}),600)}}function y(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"beforeend";if(!(t instanceof m))throw new Error("Can render only components");if(null===e)throw new Error("Container element doesn't exist");e.insertAdjacentElement(n,t.element)}function _(t,e){if(!(t instanceof m&&e instanceof m))throw new Error("Can replace only components");const n=t.element,s=e.element,i=s.parentElement;if(null===i)throw new Error("Parent element doesn't exist");i.replaceChild(n,s)}function g(t){if(null!==t){if(!(t instanceof m))throw new Error("Can remove only components");t.element.remove(),t.removeElement()}}const $=["taxi","bus","train","ship","dray","hyperloop","check-in","sightseeing","street-fight"],b=["Uryupinsk","Nizhny Volochyok","Chebarkul","Kokshamary","Kutais","Hot Key","Moscvabad"],C=["The city of incredible beauty is somewhere very far from this place. And this place would have won the Terrible Hole of the Year competition, if the organizers of the competition had known about this hole.","The city is known for swarms of mutant mosquitoes that can pick up and carry a medium-sized child into the forests.","The resorts of this city were famous in the 18th century. Since then they have not been repaired.","Incredibly clean air could be here if it were not for emissions from a metallurgical plant.","Stephen King only writes about Derry in his novels because he doesn't know about this place."],M=["Don't listen to chanson","Guide to bars","Non-swearing driver","Don't lose luggage during transportation",'The correct answer to the question "From what district?"',"Order a knife","Don't cut the kidney","Carry a bomb in your luggage","Steer the plane"],w="default",D="time-down",k="price-down",E=200,S=9e3;class T extends m{#e=null;constructor(t){let{onSortTypeChange:e}=t;super(),this.#e=e,this.element.addEventListener("click",this.#n)}#n=t=>{"INPUT"===t.target.tagName&&this.#e(t.target.dataset.sortType)};get template(){return` <form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n        <div class="trip-sort__item  trip-sort__item--day">\n          <input\n            id="sort-day"\n            class="trip-sort__input  visually-hidden"\n            type="radio"\n            name="trip-sort"\n            value="sort-day"\n            data-sort-type="${w}"\n            checked\n            >\n          <label class="trip-sort__btn" for="sort-day">Day</label>\n        </div>\n\n        <div class="trip-sort__item  trip-sort__item--event">\n          <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n          <label class="trip-sort__btn" for="sort-event">Event</label>\n        </div>\n\n        <div class="trip-sort__item  trip-sort__item--time">\n          <input\n            id="sort-time"\n            class="trip-sort__input  visually-hidden"\n            type="radio"\n            name="trip-sort"\n            value="sort-time"\n            data-sort-type="${D}">\n          <label class="trip-sort__btn" for="sort-time">Time</label>\n        </div>\n\n        <div class="trip-sort__item  trip-sort__item--price">\n          <input\n            id="sort-price"\n            class="trip-sort__input  visually-hidden"\n            type="radio"\n            name="trip-sort"\n            value="sort-price"\n            data-sort-type="${k}">\n          <label class="trip-sort__btn" for="sort-price">Price</label>\n        </div>\n\n        <div class="trip-sort__item  trip-sort__item--offer">\n          <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n          <label class="trip-sort__btn" for="sort-offer">Offers</label>\n        </div>\n      </form>`}}class A extends m{get template(){return"<p class=\"trip-events__msg\">Click New Event to create your first point</p>\n      \x3c!--\n      Значение отображаемого текста зависит от выбранного фильтра:\n        * Everthing – 'Click New Event to create your first point'\n        * Past — 'There are no past events now';\n        * Present — 'There are no present events now';\n        * Future — 'There are no future events now'.\n      --\x3e\n    "}}function x(t){return t[Math.floor(Math.random()*t.length)]}function F(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;const n=Math.abs(Math.min(t,e)),s=Math.abs(Math.max(t,e));return Math.floor(Math.random()*(s-n+1))+n}function O(t){return t.charAt(0).toUpperCase()+t.slice(1)}function H(t,e){return t.map((t=>t.id===e.id?e:t))}var Y=n(484),L=n.n(Y),P=n(646),I=n.n(P);L().extend(I());let U=new Date;function B(t,e){return L()(t).format(e)}function N(t,e){return L().duration(L()(t).diff(L()(e)))}class j extends m{#s=null;#i=null;#r=null;constructor(t){let{event:e,onEditClick:n,onFavoriteClick:s}=t;super(),this.#s=e,this.#i=n,this.#r=s,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#o),this.favoriteButton=this.element.querySelector(".event__favorite-btn"),this.favoriteButton.addEventListener("click",this.#a)}get template(){return function(t){const{basePrice:e,destination:n,dateFrom:s,dateTo:i,type:r,isFavorite:o,offers:a}=t,l=B(s,"YYYY-MM-DD"),c=B(s,"YYYY-MM-DD"),u=B(i,"YYYY-MM-DD"),d=B(s,"hh:mm"),h=B(i,"hh:mm"),f=B(i,"MMM DD"),p=o?"event__favorite-btn event__favorite-btn--active":"event__favorite-btn",v=function(t,e){const n=L().duration(L()(t).diff(L()(e))),s=n.days(),i=n.hours();let r="";return s>0&&(r+=`${s}D `),i>0&&(r+=`${i}H `),r+=`${n.minutes()}M`,r}(i,s);return`<li class="trip-events__item">\n        <div class="event">\n          <time class="event__date" datetime="${l}">${f}</time>\n          <div class="event__type">\n            <img class="event__type-icon" width="42" height="42" src="img/icons/${r}.png" alt="Event type icon">\n          </div>\n          <h3 class="event__title">${O(r)} ${n}</h3>\n          <div class="event__schedule">\n            <p class="event__time">\n              <time class="event__start-time" datetime="${c}">${d}</time>\n              &mdash;\n              <time class="event__end-time" datetime="${u}">${h}</time>\n            </p>\n            <p class="event__duration">${v}</p>\n          </div>\n          <p class="event__price">\n            &euro;&nbsp;<span class="event__price-value">${e}</span>\n          </p>\n          <h4 class="visually-hidden">Offers:</h4>\n            ${function(t){return`<ul class="event__selected-offers">${0===t.length?"":t.map((t=>`<li class="event__offer">\n            <span class="event__offer-title">${t.title}</span>\n            &plus;&euro;&nbsp;\n            <span class="event__offer-price">${t.price}</span>\n      </li>`)).join("")}</ul>`}(a)}\n          <button class="${p}" type="button">\n            <span class="visually-hidden">Add to favorite</span>\n            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n            </svg>\n          </button>\n          <button class="event__rollup-btn" type="button">\n            <span class="visually-hidden">Open event</span>\n          </button>\n        </div>\n      </li>`}(this.#s)}#o=t=>{t.preventDefault(),this.#i()};#a=t=>{t.preventDefault(),this.#r(),this.favoriteButton.classList.toggle("event__favorite-btn--active")}}class q extends m{#s=null;#l=null;#c=null;#u=null;#d=null;#h=null;constructor(t){let{event:e,onFormSubmit:n,onToggleClick:s,onDeleteClick:i,destinations:r,options:o}=t;super(),this.#s=e,this.#l=r,this.#c=o,this.#u=n,this.#d=s,this.#h=i,this.element.querySelector("form").addEventListener("submit",this.#f),this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#p),this.element.querySelector(".event__reset-btn").addEventListener("click",this.#v)}get template(){return function(t,e,n){let{destination:s,type:i,offers:r,dateFrom:o,dateTo:a,basePrice:l}=t;const c=e.length>0?e.find((t=>t.name===s)).description:"Неописуемая красота.",u=l,d=r,h=B(o,"DD/MM/YY hh:mm"),f=B(a,"DD/MM/YY hh:mm"),p=function(t,e){return`<div class="event__available-offers">${0===t.length?"":t.map((t=>`<div class="event__offer-selector">\n      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${e.includes(t)?"checked":""}>\n        <label class="event__offer-label" for="event-offer-luggage-1">\n          <span class="event__offer-title">${t.title}</span>\n          &plus;&euro;&nbsp;\n          <span class="event__offer-price">${t.price}</span>\n        </label>\n    </div>`)).join("")}</div>`}(n.find((t=>t.type===i)).offers,d);return`<li class="trip-events__item">\n      <form class="event event--edit" action="#" method="post">\n          <header class="event__header">\n            ${function(t,e){const n=0===t.length?"":t.map((t=>`<div class="event__type-item">\n        <input id="event-type-${t}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}" ${t===e?"checked":""}>\n        <label class="event__type-label  event__type-label--${t}" for="event-type-${t}-1">${O(t)}</label>\n      </div>`)).join("");return`<div class="event__type-wrapper">\n      <label class="event__type  event__type-btn" for="event-type-toggle-1">\n        <span class="visually-hidden">Choose event type</span>\n          <img class="event__type-icon" width="17" height="17" src="img/icons/${e}.png" alt="Event type icon">\n      </label>\n      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n      <div class="event__type-list">\n        <fieldset class="event__type-group">\n          <legend class="visually-hidden">Event type</legend>\n          ${n}\n        </fieldset>\n      </div>\n    </div>`}($,i)}\n            <div class="event__field-group  event__field-group--destination">\n              <label class="event__label  event__type-output" for="event-destination-1">\n                ${O(i)}\n              </label>\n              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${s}" list="destination-list-1">\n              <datalist id="destination-list-1">\n                <option value="${s}"></option>\n                <option value="${s}"></option>\n                <option value="${s}"></option>\n              </datalist>\n            </div>\n\n            <div class="event__field-group  event__field-group--time">\n              <label class="visually-hidden" for="event-start-time-1">From</label>\n              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${h}">\n              &mdash;\n              <label class="visually-hidden" for="event-end-time-1">To</label>\n              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${f}">\n            </div>\n\n            <div class="event__field-group  event__field-group--price">\n              <label class="event__label" for="event-price-1">\n                <span class="visually-hidden">Price</span>\n                &euro;\n              </label>\n              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${u}">\n            </div>\n\n            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n            <button class="event__reset-btn" type="reset">Delete</button>\n            <button class="event__rollup-btn" type="button">\n              <span class="visually-hidden">Open event</span>\n            </button>\n          </header>\n          <section class="event__details">\n            <section class="event__section  event__section--offers">\n              <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n              ${p}\n            </section>\n\n            <section class="event__section  event__section--destination">\n              <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n              <p class="event__destination-description">${c}</p>\n            </section>\n          </section>\n        </form>\n      </li>`}(this.#s,this.#l,this.#c)}#f=t=>{t.preventDefault(),this.#u(this.#s)};#p=t=>{t.preventDefault(),this.#d()};#v=t=>{t.preventDefault(),this.#h()}}const W="DEFAULT",z="EDITING";class Z{#m=null;#s=null;#l=null;#c=null;#y=W;#_=null;#g=null;#$=null;#b=null;constructor(t){let{listComponent:e,destinations:n,options:s,onDataUpdate:i,onModeChange:r}=t;this.#m=e,this.#l=n,this.#c=s,this.#$=i,this.#b=r}init(t){this.#s=t;const e=this.#_,n=this.#g;this.#_=new j({event:this.#s,onEditClick:this.#C,onFavoriteClick:this.#r}),this.#g=new q({event:this.#s,onFormSubmit:this.#u,onToggleClick:this.#M,onDeleteClick:this.#h,destinations:this.#l,options:this.#c}),null!==e&&null!==n?(this.#y===W&&_(this.#_,e),this.#y===z&&_(this.#g,n),g(e),g(n)):y(this.#_,this.#m)}destroy(){g(this.#_),g(this.#g)}resetView(){this.#y!==W&&this.#w()}#D(){_(this.#g,this.#_),document.addEventListener("keydown",this.#k),this.#b(),this.#y=z}#w(){_(this.#_,this.#g),document.removeEventListener("keydown",this.#k),this.#y=W}#E(){g(this.#g),document.removeEventListener("keydown",this.#k)}#k=t=>{"Escape"===t.key&&(t.preventDefault(),this.#w())};#u=t=>{this.#w(),this.#$(t)};#M=()=>{this.#w()};#C=()=>{this.#D()};#h=()=>{this.#E()};#r=()=>{this.#$({...this.#s,isFavorite:!this.#s.isFavorite})}}class K extends m{get template(){return' <ul class="trip-events__list">\n\n      </ul>'}}function J(t,e){return t.basePrice-e.basePrice}function V(t,e){return N(t.dateFrom,t.dateTo).asSeconds()-N(e.dateFrom,e.dateTo).asSeconds()}class X extends m{#S=null;#T=null;constructor(t){let{events:e,totalPrice:n}=t;super(),this.#S=e,this.#T=n}get template(){return function(t,e){const n=t[0],s=t[t.length-1],i=t.length>3?"...":t[1].destination;return`<section class="trip-main__trip-info  trip-info">\n        <div class="trip-info__main">\n          <h1 class="trip-info__title">${n.destination} &mdash; ${i} &mdash; ${s.destination}</h1>\n          <p class="trip-info__dates">${B(n.dateFrom,"MMM DD")}&nbsp;&mdash;&nbsp;${B(s.dateTo,"MMM DD")}</p>\n        </div>\n        <p class="trip-info__cost">\n          Total: &euro;&nbsp;<span class="trip-info__cost-value">${e}</span>\n        </p>\n      </section>`}(this.#S,this.#T)}}class R extends m{#A=null;constructor(t){let{filters:e}=t;super(),this.#A=e}get template(){return function(t){const e=t.map(((t,e)=>function(t,e){const{type:n,hasEvents:s}=t;return`<div class="trip-filters__filter">\n      <input\n        id="filter-${n}"\n        class="trip-filters__filter-input  visually-hidden"\n        type="radio"\n        name="trip-filter"\n        value="${n}"\n        ${e?"checked":""}\n        ${s?"":"disabled"} >\n      <label class="trip-filters__filter-label" for="filter-${n}">${O(n)}</label>\n    </div>\n  `}(t,0===e))).join("");return`<div class="trip-main__trip-controls  trip-controls">\n        <div class="trip-controls__filters">\n          <h2 class="visually-hidden">Filter events</h2>\n          \x3c!-- Фильтры --\x3e\n          <form class="trip-filters" action="#" method="get">\n          ${e}\n            <button class="visually-hidden" type="submit">Accept filter</button>\n          </form>\n        </div>\n      </div>`}(this.#A)}}const G={everything:t=>[...t],future:t=>t.filter((t=>L()(t.dateFrom).isAfter(L()()))),present:t=>t.filter((t=>L()(t.dateFrom).isSame(L()()))),past:t=>t.filter((t=>L()(t.dateFrom).isBefore(L()())))};class Q extends m{#x=null;constructor(t){let{onClick:e}=t;super(),this.#x=e,this.element.addEventListener("click",this.#F,{once:!0})}get template(){return'<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>'}#F=t=>{t.preventDefault(),this.#x(),this.element.setAttribute("disabled","true")}}function tt(){const t=Array.from({length:F(1,4)},(()=>({src:`https://loremflickr.com/248/152?random${F(1,20)}`,description:"Котики лучше всех!"})));return{id:crypto.randomUUID(),name:x(b),description:x(C),pictures:t}}function et(){return{id:crypto.randomUUID(),title:x(M),price:F(E,S)}}const nt=document.querySelector(".trip-main"),st=document.querySelector(".trip-events"),it=new class{destinations=[];offers=[];events=[];constructor(){this.destinations=this.generateDestinations(),this.offers=this.generateOffers(),this.events=this.generateEvents()}getDestinations(){return this.destinations}getEvents(){return this.events}getOffers(){return this.offers}generateDestinations(){return Array.from({length:6},tt)}generateOffers(){return $.map((t=>({type:t,offers:Array.from({length:F(0,6)},et)})))}generateEvents(){return Array.from({length:6},(()=>{const t=x($),e=x(this.destinations),n=this.offers.find((e=>e.type===t)),s=F()?n.offers.slice(0,F(0,6)):[];return function(t,e,n,s){return{id:crypto.randomUUID(),basePrice:F(E,S),dateFrom:t.startDate,dateTo:t.finishDate,destination:e,isFavorite:!!F(),offers:s,type:n}}(function(){const t=F(1,15),e=Math.random(),n=new Date(U.getTime());n.setDate(U.getDate()+t);const s=F(0,23),i=F(0,59),r=F(0,59);n.setHours(s,i,r);const o=new Date(n.getTime()+24*e*60*60*1e3);return U=o,{startDate:n.toISOString(),finishDate:o.toISOString()}}(),e.name,t,s)}))}},rt=new class{#O=null;#l=null;constructor(t){this.#O=t,this.#l=this.#O.getDestinations()}get destinations(){return this.#l}}(it),ot=new class{#O=null;#H=null;constructor(t){this.#O=t,this.#H=this.#O.getOffers()}get offers(){return this.#H}}(it),at=new class{#O=null;#S=null;constructor(t){this.#O=t,this.#S=this.#O.getEvents()}get events(){return this.#S}getTotalPrice(){return this.#S.reduce(((t,e)=>(t+=e.basePrice,e.offers.forEach((e=>{t+=e.price})),t)),0)}}(it),lt=new class{#Y=null;#A=[];#S=null;#l=null;#H=null;#T=null;constructor(t){let{headerContainer:e,eventsModel:n,offersModel:s,destinationsModel:i}=t;var r;this.#Y=e,this.#S=[...n.events],this.#l=[...i.destinations],this.#A=(r=this.#S,Object.entries(G).map((t=>{let[e,n]=t;return{type:e,hasEvents:!!n(r).length}}))),this.#H=[...s.offers],this.#T=n.getTotalPrice()}init(){this.#L(),this.#P(),this.#I()}#I(){y(new Q({onClick:()=>{}}),this.#Y)}#L(){y(new X({events:this.#S,totalPrice:this.#T}),this.#Y)}#P(){y(new R({filters:this.#A}),this.#Y)}}({headerContainer:nt,destinationsModel:rt,offersModel:ot,eventsModel:at}),ct=new class{#U=null;#S=null;#l=null;#H=null;#B=null;#N=new A;#m=new K;#j=w;#q=[];#W=new Map;constructor(t){let{listContainer:e,destinationsModel:n,offersModel:s,eventsModel:i}=t;this.#U=e,this.#S=[...i.events],this.#l=[...n.destinations],this.#H=[...s.offers]}init(){this.#q=[...this.#S],this.#z(),this.#Z()}#Z(){0===this.#S.length?this.#K():(this.#J(),this.#S.forEach((t=>{this.#V(t)})))}#X=t=>{this.#S=H(this.#S,t),this.#q=H(this.#q,t),this.#W.get(t.id).init(t)};#z(){this.#B=new T({onSortTypeChange:this.#e}),y(this.#B,this.#U)}#J(){y(this.#m,this.#U)}#K(){y(this.#N,this.#U)}#V(t){const e=new Z({listComponent:this.#m.element,destinations:this.#l,options:this.#H,onDataUpdate:this.#X,onModeChange:this.#b});e.init(t),this.#W.set(t.id,e)}#R(){this.#W.forEach((t=>t.destroy())),this.#W.clear()}#b=()=>{this.#W.forEach((t=>t.resetView()))};#G(t){switch(t){case D:this.#S.sort(V);break;case k:this.#S.sort(J);break;default:this.#S=[...this.#q]}this.#j=t}#e=t=>{this.#j!==t&&(this.#G(t),this.#R(),this.#Z())}}({listContainer:st,destinationsModel:rt,offersModel:ot,eventsModel:at});lt.init(),ct.init()})()})();
//# sourceMappingURL=bundle.df05e2d82d3ab5088092.js.map