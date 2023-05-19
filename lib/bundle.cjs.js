'use strict';

/**
 * 判断数值是否在输入的范围
 * @param num 目标数值
 * @param min 范围最小值
 * @param max 范围最大值
 * @param equal 是否包含等于最值
 * @returns
 */
function isNumberInRange(num, min, max, equal = false) {
    if (max < min) {
        [min, max] = [max, min];
    }
    return equal ? min <= num && num <= max : min < num && num < max;
}
const MathUtils = {
    isNumberInRange,
};

/**
 * 颜色字符串 rgb 转 16 进制
 * @param color rgb 或者 rgba 格式的颜色字符串
 * @param alpha 输出透明度
 * @returns
 */
function rgb2hex(color = "", alpha = 255) {
    var _a;
    let transformed = "";
    if (!/^rgba?\([\d,\s.]+\)$/i.test(color)) {
        throw new Error("The color format entered is incorrect.");
    }
    const colorNumbers = (_a = color.match(/\d+(\.\d+)?/gm)) === null || _a === void 0 ? void 0 : _a.map((n, i) => {
        const number = Number(n);
        if (i > 3 || isNaN(number) || !isNumberInRange(number, 0, 255, true)) {
            throw new Error("The color has invalid value.");
        }
        return number;
    });
    if (colorNumbers) {
        transformed =
            "#" +
                colorNumbers
                    .map((number, i) => {
                    let str = "";
                    // alpha
                    if (i < 3) {
                        str = (number <= 16 ? "0" : "") + number.toString(16);
                    }
                    else {
                        if (isNumberInRange(number, 0, 1, true)) {
                            alpha = Math.round(number * 255);
                        }
                        else {
                            alpha = number || alpha;
                        }
                    }
                    return str;
                })
                    .join("");
        if (isNumberInRange(alpha, 0, 255, true) && alpha < 255) {
            transformed += alpha.toString(16);
        }
    }
    return transformed;
}
/**
 * 颜色字符串 16 进制转 rgb
 * @param color 16 进制颜色字符串
 * @param alpha 输出透明度
 * @returns
 */
function hex2rgb(color = "", alpha = 1, alphaFixed = 3) {
    if (/^#[0-9a-fA-F]$/i.test(color)) {
        throw new Error("The color format entered is incorrect.");
    }
    let r, g, b, a = alpha;
    if (color.length === 4) {
        r = Math.pow(parseInt(color[1], 16), 2);
        g = Math.pow(parseInt(color[2], 16), 2);
        b = Math.pow(parseInt(color[3], 16), 2);
    }
    else {
        r = parseInt(color.slice(1, 3), 16);
        g = parseInt(color.slice(3, 5), 16);
        b = parseInt(color.slice(5, 7), 16);
        a = parseInt(color.slice(7, 9), 16) / 256 || alpha;
    }
    [r, g, b, a].forEach((number) => {
        if (!isNumberInRange(number, 0, 255, true)) {
            throw new Error("The color has invalid value.");
        }
    });
    let fns, fne;
    if (!a || isNumberInRange(a, 0, 1)) {
        fns = "rgba(";
        let aStr = a.toString();
        if (aStr.length > alphaFixed) {
            aStr = a.toFixed(alphaFixed);
        }
        fne = `, ${aStr})`;
    }
    else {
        fns = "rgb(";
        fne = ")";
    }
    return `${fns}${r}, ${g}, ${b}${fne}`;
}
const ColorUtils = {
    rgb2hex,
    hex2rgb,
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var dayjs_min = {exports: {}};

(function (module, exports) {
	!function(t,e){module.exports=e();}(commonjsGlobal,(function(){var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return "["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return +(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return {M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p=function(t){return t instanceof _},S=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else {var a=e.name;D[a]=e,i=a;}return !r&&i&&(g=i),i||!r&&g},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=v;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t);}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init();},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},m.$utils=function(){return O},m.isValid=function(){return !(this.$d.toString()===l)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),l=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(h){case c:return r?l(1,0):l(31,11);case f:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),l=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d;}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,l=this;r=Number(r);var $=O.p(h),y=function(t){var e=w(l);return O.w(e.date(e.date()+Math.round(t*r)),l)};if($===f)return this.set(f,this.$M+r);if($===c)return this.set(c,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},$={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||$[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,v=this-M,g=O.m(this,M);return g=($={},$[c]=g/12,$[f]=g,$[h]=g/3,$[o]=(v-m)/6048e5,$[a]=(v-m)/864e5,$[u]=v/n,$[s]=v/e,$[i]=v/t,$)[y]||v,l?g:O.a(g)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),T=_.prototype;return w.prototype=T,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){T[t[1]]=function(e){return this.$g(e,t[0],t[1])};})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[g],w.Ls=D,w.p={},w})); 
} (dayjs_min));

var dayjs_minExports = dayjs_min.exports;
var dayjs = /*@__PURE__*/getDefaultExportFromCjs(dayjs_minExports);

/**
 * 解析日期或时间为数值
 * @param datetime 时间
 * @returns
 */
function parseDateOrTime(datetime) {
    const reg_time = /^\d{2}:\d{2}.+$/m;
    let d = NaN;
    let needTimeOffset = false;
    const timeOffset = new Date().getTimezoneOffset() * 60 * 1000;
    if (typeof datetime === "string") {
        if (/^\d+-\d+-\d+$/.test(datetime)) {
            needTimeOffset = true;
            datetime = datetime.replace(/-/g, "/");
        }
        d = Date.parse(datetime);
        if (needTimeOffset) {
            d -= timeOffset;
        }
        // HH:mm:ss
        if (!d && reg_time.test(datetime)) {
            const now = new Date();
            d = Date.parse(`${nativeFormat(now, `YYYY-MM-DDT${datetime}.sss`)}`);
        }
    }
    return Date.parse(new Date(d || datetime).toISOString());
}
/**
 * 原生时间日期格式化
 * @param datetime 时间
 * @param format 格式
 * @returns
 */
function nativeFormat(datetime = new Date(), format = "YYYY-MM-DD HH:mm:ss") {
    const _d = new Date(parseDateOrTime(datetime));
    return format.replace(/(Y{4})|(M{2})|(D{2})|(H{2})|(m{2})|(s{3})|(s{2})/gm, function (match, fyear, fmonth, fdate, fhour, fmin, fmsec, fsec) {
        if (fyear)
            return _d.getFullYear().toString();
        if (fmonth)
            return ("00" + (_d.getMonth() + 1).toString()).slice(-2);
        if (fdate)
            return ("00" + _d.getDate().toString()).slice(-2);
        if (fhour)
            return ("00" + _d.getHours().toString()).slice(-2);
        if (fmin)
            return ("00" + _d.getMinutes().toString()).slice(-2);
        if (fmsec)
            return _d.getMilliseconds().toString();
        if (fsec)
            return ("00" + _d.getSeconds().toString()).slice(-2);
        return "";
    });
}
/**
 * 封装的 dayjs 时间格式化
 * @param datetime 时间
 * @param format 格式
 * @returns
 */
function dayjsFormat(datetime = new Date(), format = "YYYY-MM-DD HH:mm:ss") {
    return dayjs(parseDateOrTime(datetime) || "").format(format);
}
/**
 * 格式化时间段
 * @param from 开始时间
 * @param to 结束时间
 * @param format 格式
 * @param pad0 是否填0
 * @returns
 */
function durationFormat(from = new Date(), to = new Date(), format = "HH hours mm mins ss secs sss ms", pad0 = true) {
    const _f = new Date(parseDateOrTime(from));
    const _t = new Date(parseDateOrTime(to));
    const duration = _t.valueOf() - _f.valueOf();
    const msecs = duration % 1000;
    const secs = Math.floor(duration / 1000) % 60;
    const mins = Math.floor(duration / 1000 / 60) % 60;
    const hours = Math.floor(duration / 1000 / 60 / 60) % 24;
    const days = Math.floor(duration / 1000 / 60 / 60 / 24);
    return format.replace(/(d)|(H{2})|(m{2})|(s{3})|(s{2})/gm, function (match, fday, fhour, fmin, fmsec, fsec) {
        let tem = "";
        if (fday) {
            tem += days;
        }
        if (fhour) {
            tem += hours;
        }
        if (fmin) {
            tem += mins;
        }
        if (fmsec) {
            tem += msecs;
        }
        if (fsec) {
            tem += secs;
        }
        if (pad0 && (fhour || fmin || fsec)) {
            tem = ("00" + tem).slice(-2);
        }
        return tem;
    });
}
const DateUtils = {
    parseDateOrTime,
    nativeFormat,
    dayjsFormat,
    durationFormat,
};

const doc = document;
const rootElem = doc.documentElement || doc.body;
const fullscreenEnabled = doc.fullscreenEnabled || doc.webkitFullscreenEnabled || doc.mozFullScreenEnabled || doc.msFullscreenEnabled;
const requestFullscreen = rootElem.requestFullscreen ||
    rootElem.webkitRequestFullscreen ||
    rootElem.mozRequestFullScreen ||
    rootElem.msRequestFullscreen;
const exitFullscreen = doc.exitFullscreen || doc.webkitExitFullscreen || doc.mozCancelFullScreen || doc.msExitFullscreen;
/**
 * 当前页面文档是否处于全屏模式
 */
function isDocumentInFullscreenMode() {
    return Boolean(doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement ||
        doc.fullscreen ||
        doc.webkitIsFullScreen ||
        doc.mozFullScreen ||
        doc.msIsFullScreen);
}
/**
 * 切换元素的全屏模式
 * @param target 要全屏的目标元素
 * @param options 全屏选项
 * @returns
 */
function toggleElementFullscreen(target, options) {
    return new Promise((resolve, reject) => {
        if (!fullscreenEnabled) {
            reject(new Error("This browser is not support fullscreen."));
        }
        if (!requestFullscreen) {
            reject(new Error("The element is not support fullscreen"));
        }
        if (isDocumentInFullscreenMode()) {
            resolve(exitFullscreen());
        }
        else {
            resolve(requestFullscreen.call(target, options));
        }
    });
}
/**
 * 元素注册横向滚动事件，可注册为 Vue 指令
 * @param target - 目标元素
 * @param {object} options - 配置选项
 * @param {boolean} options.altKey - 按住 alt 键时横向滚动生效
 * @param {boolean} options.force - 强制横向滚动生效
 */
function listenElementHorizontalScrolling(target, options = { altkey: true, force: false }) {
    target.addEventListener("wheel", (e) => {
        const event = e || window.event;
        if (event &&
            event.target === target &&
            (target.offsetHeight >= target.scrollHeight || options.altkey === event.altKey || options.force)) {
            event.preventDefault();
            event.stopPropagation();
            target.scrollLeft += event.deltaY;
        }
    });
}
/**
 * 获取元素样式属性值
 * @param propName 属性名
 * @returns 属性值
 */
function getElementStyleProp(target = document.documentElement, propName = "") {
    if (!(target && propName)) {
        return;
    }
    return getComputedStyle(target).getPropertyValue(propName).trim();
}
const ElementUtils = {
    isDocumentInFullscreenMode,
    toggleElementFullscreen,
    listenElementHorizontalScrolling,
    getElementStyleProp,
};

/**
 * 创建自定义事件
 * @param type 事件类型
 * @param bubbles 是否冒泡
 * @param cancelable 能否被取消
 * @returns
 */
function createCustomEvent(type = "", bubbles = true, cancelable = true) {
    let event;
    if (!type.trim()) {
        throw new Error("Unknown custom event type.");
    }
    if (typeof document.createEventObject === "function") {
        event = document.createEventObject();
        event.type = type;
        event.bubbles = bubbles;
        event.cancelable = cancelable;
    }
    if (Event && typeof Event.prototype.initEvent === "function") {
        if (typeof Event.prototype.initEvent === "function") {
            event = document.createEvent("Event");
            event.initEvent(type, bubbles, cancelable);
        }
        else {
            event = new Event(type, { bubbles, cancelable });
        }
    }
    return event;
}
/**
 * 触发自定义事件
 * @param event 目标事件
 * @param target 事件对象
 */
function dispatchCustomEvent(event, target = document) {
    if (!event.type) {
        throw new Error("Unknown event type.");
    }
    if (typeof target !== "object") {
        throw new Error("target must be an object");
    }
    if (typeof target.fireEvent === "function") {
        target.fireEvent(event.type, event);
    }
    if (typeof target.dispatchEvent === "function") {
        target.dispatchEvent(event);
    }
}
const EventUtils = {
    createCustomEvent,
    dispatchCustomEvent,
};

/* eslint-disable @typescript-eslint/ban-ts-comment */
const isSecurity = window === top && window.location.protocol === "https:";
function genInputElemToBody(attrs) {
    const input = document.createElement("input");
    input.type = "file";
    // see https://stackoverflow.com/questions/47664777/javascript-file-input-onchange-not-working-ios-safari-only
    input.style.cssText = `position: absolute; top: 0; left: 0; z-index: -9999; width: 1px; height: 1px; opacity: 0;`;
    for (const key in attrs) {
        if (Object.prototype.hasOwnProperty.call(attrs, key)) {
            const val = attrs[key];
            if (val === null || typeof val === "undefined") {
                input[key] = null;
                input.removeAttribute(key);
            }
            else {
                input[key] = val;
                if (typeof val === "function") {
                    input.addEventListener(key.replace(/^on/, ""), val);
                }
            }
        }
    }
    document.body.append(input);
    return input;
}
function genMockFileSystemFileHandle(file) {
    return {
        kind: "file",
        name: file.name,
        getFile() {
            return Promise.resolve(file);
        },
        isSameEntry() {
            console.warn("Can't implement");
            return Promise.reject(false);
        },
    };
}
function genMockFileSystemDirectoryHandle(directory) {
    return {
        kind: "directory",
        name: directory.name || "unnamed",
        subFolders: directory.subFolders || [],
        subFiles: directory.subFiles || [],
        getDirectoryHandle(name) {
            return new Promise((resolve, reject) => {
                var _a;
                if (name && ((_a = this.subFolders) === null || _a === void 0 ? void 0 : _a.includes(name))) {
                    resolve(this[name]);
                }
                else {
                    reject(new Error(`Not found '${name}'`));
                }
            });
        },
        getFileHandle(name) {
            return new Promise((reslove, reject) => {
                if (name && this.subFiles.includes(name)) {
                    reslove(this[name]);
                }
                else {
                    reject(new Error(`Not found '${name}'`));
                }
            });
        },
        isSameEntry() {
            console.warn("Can't implement");
            return Promise.reject(false);
        },
        removeEntry() {
            console.warn("Can't implement");
            return Promise.reject(false);
        },
        resolve() {
            console.warn("Can't implement");
            return Promise.reject(false);
        },
    };
}
function recursionDirectoryTree(file, parent, path) {
    path = path || file.webkitRelativePath;
    const [currpath, ...rest] = path.split("/");
    parent = parent || recursionDirectoryTree.genFakeRootDirectory();
    if (currpath === file.name) {
        parent.subFiles.push(file.name);
        parent[currpath] = genMockFileSystemFileHandle(file);
    }
    else {
        if (!parent.subFolders.includes(currpath)) {
            parent.subFolders.push(currpath);
        }
        parent[currpath] = parent[currpath] || recursionDirectoryTree.genFakeRootDirectory();
        parent[currpath].kind = "directory";
        parent[currpath].name = currpath;
        parent[currpath].subFolders = parent[currpath].subFolders || [];
        parent[currpath].subFiles = parent[currpath].subFiles || [];
        if (rest.length) {
            recursionDirectoryTree(file, parent[currpath], rest.join("/"));
        }
    }
    return parent;
}
recursionDirectoryTree.genFakeRootDirectory = function (dirname = "root") {
    return genMockFileSystemDirectoryHandle({ name: dirname });
};
// @ts-ignore
const nativeOpen = self.showOpenFilePicker;
const isNativeOpenSupported = nativeOpen && isSecurity;
/**
 * 显示文件选择窗口
 * @param {OpenFilePickerOptions} options 文件选择配置选项
 * @returns {Promise<MockFileSystemFileHandle[]>}
 */
const showOpenFilePicker = (options) => {
    if (isNativeOpenSupported && (options === null || options === void 0 ? void 0 : options.native)) {
        return nativeOpen(options);
    }
    return new Promise((reslove, reject) => {
        const inputAttrs = {};
        if (options) {
            if (options.multiple) {
                inputAttrs.multiple = true;
            }
            const types = [].concat(options.types).filter((type) => type === null || type === void 0 ? void 0 : type.accept);
            if (!options.excludeAcceptAllOption) {
                types.unshift({
                    description: "Any",
                    accept: {
                        any: ["*.*"],
                    },
                });
            }
            if (types.length) {
                const trimReg = /^\s+|(,?\s+)$/m;
                let inputAccept = types
                    .map(({ accept }) => {
                    var _a;
                    for (const mimetype in accept) {
                        if (Object.prototype.hasOwnProperty.call(accept, mimetype)) {
                            const exts = ((_a = accept[mimetype]) === null || _a === void 0 ? void 0 : _a.length) ? accept[mimetype].join(", ").replace(trimReg, "") : "";
                            return exts || mimetype;
                        }
                    }
                })
                    .join(", ");
                inputAccept = inputAccept.replace(trimReg, "");
                if (inputAccept) {
                    inputAttrs.accept = inputAccept;
                }
            }
        }
        inputAttrs.onchange = () => {
            var _a;
            if (!((_a = input.files) === null || _a === void 0 ? void 0 : _a.length)) {
                reject(new Error("No file selected"));
            }
            else {
                reslove(Array.from(input.files).map((file) => genMockFileSystemFileHandle(file)));
            }
            input.remove();
        };
        const input = genInputElemToBody(inputAttrs);
        input.click();
    });
};
//@ts-ignore
const nativeDir = window.showDirectoryPicker;
const isNativeDirSupported = nativeDir && isSecurity;
/**
 * 显示文件选择窗口
 * @param {DirectoryPickerOptions} options 文件选择配置选项
 * @returns {Promise<MockFileSystemDirectoryHandle[]>}
 */
const showDirectoryPicker = (options) => {
    if (isNativeDirSupported && (options === null || options === void 0 ? void 0 : options.native)) {
        return nativeDir(options);
    }
    return new Promise((reslove, reject) => {
        const inputAttrs = {
            webkitdirectory: true,
            handlechange: () => {
                var _a;
                if (!((_a = input.files) === null || _a === void 0 ? void 0 : _a.length)) {
                    reject(new Error("No directory selected"));
                }
                else {
                    const root = recursionDirectoryTree.genFakeRootDirectory();
                    Array.from(input.files).forEach((file) => {
                        recursionDirectoryTree(file, root);
                    });
                    reslove(root);
                }
                input.remove();
            },
        };
        const input = genInputElemToBody(inputAttrs);
        if (!("webkitdirectory" in input)) {
            throw new Error(`HTMLInputElement.webkitdirectory is not supported, can't polyfill showDirectoryPicker`);
        }
        input.click();
    });
};
if (!nativeOpen) {
    window.showOpenFilePicker = showOpenFilePicker;
}
if (!nativeDir) {
    window.showDirectoryPicker = showDirectoryPicker;
}
/**
 * 下载文件
 * @param {string | Blob} target - 目标链接或文件
 * @param {string} filename - 自定义文件名
 * @param {boolean} newWnd - 使用新窗口打开的方式下载
 */
function downloadFile(target, filename = "", newWnd = false) {
    if (!target) {
        throw new Error("target is empty");
    }
    let url = "";
    if ((window.File && target instanceof window.File) || (window.Blob && target instanceof Blob)) {
        if (target instanceof window.File) {
            filename = filename || target.name || "download";
        }
        if (window.navigator.msSaveOrOpenBlob) {
            return window.navigator.msSaveOrOpenBlob(target, filename);
        }
        url = URL.createObjectURL(target);
    }
    if (typeof target === "string") {
        url = target;
    }
    if (!url) {
        throw new Error("Can't get the URL of target");
    }
    if (newWnd) {
        window.open(url);
    }
    else {
        let downloadElem;
        const downloadElemStyle = "position: fixed; top: 0; left: 0; z-index: -9999; width: 1px; height: 1px; opacity: 0;";
        const downloadStart = () => {
            setTimeout(() => {
                downloadElem.remove();
                if ((window.File && target instanceof window.File) || (window.Blob && target instanceof Blob)) {
                    URL.revokeObjectURL(url);
                }
            }, 500);
        };
        const urlDetail = /^([^\s:]+:)?(\/\/)?([^:/&?%]+)(:(\d+))?(.*\/)?([^:/&?]*?\.\w+)?([^.]*?(\?.*)?)?$/gm.exec(url);
        const url_protocol = (urlDetail === null || urlDetail === void 0 ? void 0 : urlDetail[1]) || location.protocol;
        const url_host = (urlDetail === null || urlDetail === void 0 ? void 0 : urlDetail[3]) || "";
        const url_port = (urlDetail === null || urlDetail === void 0 ? void 0 : urlDetail[5]) || "";
        const url_file = (urlDetail === null || urlDetail === void 0 ? void 0 : urlDetail[7]) || "";
        filename = filename || url_file || "download";
        if (url_protocol === location.protocol && url_host === location.host && url_port === location.port) {
            downloadElem = document.createElement("a");
            downloadElem.href = url;
            downloadElem.download = filename;
            downloadElem.onclick = downloadStart;
        }
        else {
            downloadElem = document.createElement("iframe");
            const iframe = downloadElem;
            iframe.onload = () => {
                var _a;
                const ifDom = iframe.contentDocument || ((_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document);
                ifDom === null || ifDom === void 0 ? void 0 : ifDom.execCommand("SaveAs");
                downloadStart();
            };
        }
        downloadElem.style.cssText = downloadElemStyle;
        document.body.appendChild(downloadElem);
        if (downloadElem.tagName === "A") {
            downloadElem.click();
        }
        else {
            downloadElem.src = url;
        }
    }
}
const FileSystemUtils = {
    showOpenFilePicker,
    showDirectoryPicker,
    downloadFile,
};
// For more advanced polyfill usage, see https://github.com/jimmywarting/native-file-system-adapter
// https://github.com/eligrey/FileSaver.js

class ListLoop {
    constructor(list = [], count = 1, index = 0) {
        this.list = list;
        this.count = count;
        this.index = index;
        this.list = list;
        this.count = count;
        this.index = index;
    }
    get total() {
        return this.list ? this.list.length : 0;
    }
    lastRound() {
        return (this.index = (this.index - this.count + this.list.length) % this.list.length);
    }
    nextRound() {
        return (this.index = (this.index + this.count + this.list.length) % this.list.length);
    }
    get currentRoundList() {
        let list = [];
        if (this.count > this.list.length) {
            list = this.list;
        }
        else {
            list = this.list.slice(this.index, this.index + this.count);
            if (list.length < this.count) {
                list = list.concat(this.list.slice(0, this.count - list.length));
            }
        }
        return list;
    }
}

/**
 * 校验响应数据是否为期望状态码
 * @param response 响应数据
 * @param code 期望状态码
 * @param includeStatus 是否包含校验 status
 * @returns
 */
function validateResponseCode(response, code = [200], includeStatus = false) {
    return ([NaN].concat(code).filter((c) => {
        return !isNaN(c) && (c === response.code || (includeStatus && c === response.status));
    }).length > 0);
}
/**
 * 获取响应数据的 message
 * @param response 响应数据
 * @param maxLen 限制最大长度
 * @returns
 */
function getResponseMessage(response, maxLen) {
    return String((response && (response.msg || response.statusText || response.message)) || response).slice(0, maxLen);
}
const NetworkUtils = {
    validateResponseCode,
    getResponseMessage,
};

/**
 * 合并对象共有的属性
 * @param target 目标对象
 * @param source 源对象
 * @returns 合并后的目标对象
 */
function assignCommonProperty(target, source, fromSourceStrictly = true) {
    if (!(target instanceof Object && source instanceof Object)) {
        throw new Error(`arguments must be object.`);
    }
    for (const key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key) &&
            (!fromSourceStrictly || Object.prototype.hasOwnProperty.call(source, key))) {
            target[key] = source[key];
        }
    }
    return target;
}
const ObjectUtils = {
    assignCommonProperty,
};

exports.ColorUtils = ColorUtils;
exports.DateUtils = DateUtils;
exports.ElementUtils = ElementUtils;
exports.EventUtils = EventUtils;
exports.FileSystemUtils = FileSystemUtils;
exports.ListLoop = ListLoop;
exports.MathUtils = MathUtils;
exports.NetworkUtils = NetworkUtils;
exports.ObjectUtils = ObjectUtils;
exports.assignCommonProperty = assignCommonProperty;
exports.createCustomEvent = createCustomEvent;
exports.dayjsFormat = dayjsFormat;
exports.dispatchCustomEvent = dispatchCustomEvent;
exports.downloadFile = downloadFile;
exports.durationFormat = durationFormat;
exports.getElementStyleProp = getElementStyleProp;
exports.getResponseMessage = getResponseMessage;
exports.hex2rgb = hex2rgb;
exports.isDocumentInFullscreenMode = isDocumentInFullscreenMode;
exports.isNumberInRange = isNumberInRange;
exports.listenElementHorizontalScrolling = listenElementHorizontalScrolling;
exports.nativeFormat = nativeFormat;
exports.rgb2hex = rgb2hex;
exports.showDirectoryPicker = showDirectoryPicker;
exports.showOpenFilePicker = showOpenFilePicker;
exports.toggleElementFullscreen = toggleElementFullscreen;
exports.validateResponseCode = validateResponseCode;

if(typeof window !== 'undefined') {
  window._SHXS_JS_UTILS_VERSION_ = '1.1.1'
}
