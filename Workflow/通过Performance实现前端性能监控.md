## 通过Performance实现前端性能监控

### 一、为什么要做性能监控

个人认为，做性能优化无非就是，**优化产品，提升收益**。产品的用户体验，最终决定了产品所带来的收益。
如下图：
![页面加载时间与用户流失的关系](http://images.wangenbo.com/Snipaste_2020-04-14_15-12-04.png)

### 二、用什么做？

为了帮助开发者更好地衡量和改进前端页面性能，W3C 性能小组引入了 Navigation Timing API，实现了自动、精准的页面性能打点；开发者可以通过 window.performance 属性获取。

### 三、performance介绍

前端性能监控的API，包含三个属性：memory、timing、navigation

- performance.memory: （显示刺客内存占用情况，以字节为单位）
    - totalJSHeapSize: 表示总内存大小
    - usedJSHeapSize: 表示使用内存大小
    - jsHeapSizeLimit: 表示内存大小的限制
    
        >如果usedJSHeapSize > totalJSHeapSize就会出现内存泄露的问题。

- performance.navigation（对象提供了在指定的时间段里发生的操作相关信息，包括页面是加载还是刷新、发生了多少次重定向等等）
    - redirectCount: 如果有重定向的话，页面通过几次重定向跳转而来，默认为0
    - type: 该值的含义表示的页面打开的方式。默认为0. 可取值为0、1、2、255
        - 0（TYPE_NAVIGATE）：表示正常进入该页面(非刷新、非重定向)。
        - 1（TYPE_RELOAD）：表示通过 window.location.reload 刷新的页面。
        - 2（TYPE_BACK_FORWARD ）：表示通过浏览器的前进、后退按钮进入的页面。
        - 255（TYPE_RESERVED）：表示非以上的方式进入页面的。

- performance.timing 接口（对象包含延迟相关的性能信息，定义了从 navigationStart 至 loadEventEnd 的 21 个只读属性，描述了关键点的时间）
    - 在Navigation Timing Level 2 specification中已被废弃，被Performance.timeOrigin 替代。

属性|解释
--------- | -------------
navigationStart | 表示从上一个文档卸载结束时的unix 时间戳，如果没有上一个文档，这个值和fetchStart 相等。
unloadEventStart | 表示前一个网页（与当前页面同域）unload的时间戳，如果无前一个网页unload 或者当一个网页与当前页面不同域，则值为0。
unloadEventEnd | 返回前一个页面unload时间绑定的回调函数执行完毕的时间戳
redirectStart | 如果发生了HTTP重定向，并且从导航开始，中间的每次重定向，都和当前文档同域的话，就返回开始重定向的timing.fetchStart的值。其他情况，则返回0
redirectEnd | 如果发生了HTTP重定向，并且从导航开始，中间的每次重定向，都和当前文档同域的话，就返回最后一次重定向，接收到最后一个字节数据后的那个时间.其他情况则返回0
fetchStart | 如果一个新的资源获取被发起，则 fetchStart必须返回用户代理开始检查其相关缓存的那个时间，其他情况则返回开始获取该资源的时间
domainLookupStart | 返回用户代理对当前文档所属域进行DNS查询开始的时间。如果此请求没有DNS查询过程，如长连接，资源cache,甚至是本地资源等。 那么就返回 fetchStart的值
domainLookupEnd | 返回用户代理对结束对当前文档所属域进行DNS查询的时间。如果此请求没有DNS查询过程，如长连接，资源cache，甚至是本地资源等。那么就返回 fetchStart的值connectStart：返回用户代理向服务器服务器请求文档，开始建立连接的那个时间，如果此连接是一个长连接，又或者直接从缓存中获取资源（即没有与服务器建立连接）。则返回domainLookupEnd的值
connectStart | 返回用户代理向服务器服务器请求文档，开始建立连接的那个时间，如果此连接是一个长连接，又或者直接从缓存中获取资源（即没有与服务器建立连接）。则返回domainLookupEnd的值
connectEnd | 返回用户代理向服务器服务器请求文档，建立连接成功后的那个时间，如果此连接是一个长连接，又或者直接从缓存中获取资源（即没有与服务器建立连接）。则返回domainLookupEnd的值
secureConnectionStart | HTTPS连接开始的时间，如果不是安全连接，则值为0
requestStart | 返回从服务器、缓存、本地资源等，开始请求文档的时间
responseStart | 返回用户代理从服务器、缓存、本地资源中，接收到第一个字节数据的时间
responseEnd | 返回用户代理接收到最后一个字符的时间，和当前连接被关闭的时间中，更早的那个。同样，文档可能来自服务器、缓存、或本地资源
domLoading | 返回用户代理把其文档的 "current document readiness" 设置为 "loading"的时候
domInteractive | 返回用户代理把其文档的 "current document readiness" 设置为 "interactive"的时候
domContentLoadedEventStart | 返回文档发生 DOMContentLoaded事件的时间
domContentLoadedEventEnd | 文档的DOMContentLoaded 事件的结束时间
domComplete | 返回用户代理把其文档的 "current document readiness" 设置为 "complete"的时候
loadEventStart | 文档触发load事件的时间。如果load事件没有触发，那么该接口就返回0
loadEventEnd | 文档触发load事件结束后的时间。如果load事件没有触发，那么该接口就返回0

如果上述看不懂，可以参考下图解释：
![解释](http://images.wangenbo.com/v2-e4e26420d6b681b2b15b9edf9db9d4d0_720w.jpg)

---
Performance返回结果如下图：
![](http://images.wangenbo.com/Snipaste_2020-04-14_15-21-29.png)

---
兼容性：
![兼容性](http://images.wangenbo.com/Snipaste_2020-04-14_15-50-56.png)

### 四、性能指标与计算方式

- DNS查询耗时 ：domainLookupEnd - domainLookupStart
- TCP链接耗时 ：connectEnd - connectStart
- request请求耗时 ：responseEnd - responseStart
- 解析dom树耗时 ： domComplete - domInteractive
- 白屏时间 ：responseStart - navigationStart
- domready时间 ：domContentLoadedEventEnd - navigationStart
- onload时间 ：loadEventEnd - navigationStart

### 五、常用统计方法

1. performance 测速上报
```javascript
/**
 * 上报Performance timing数据；
 * 如果某个时间点花费时间为0，则此时间点数据不上报。
 * @param {String}
 *            f1 flag1简写，测速系统中的业务ID，譬如校友业务为164
 * @param {String}
 *            f2 flag2简写，测速的站点ID
 * @param {String}
 *            f3_ie flag3简写，测速的页面ID
 *（因为使用过程中我们发现IE9的某些数据存在异常，
 * 如果IE9和chrome合并统计，会影响分析结果，所以这里建议分开统计）
 * @param {String}
 *            f3_c flag3简写，测速的页面ID
 * （如果为空，则IE9和chrome合并统计）
 */
function setTimingRpt(f1, f2, f3_ie, f3_c){     
    var _t, _p = (window.webkitPerformance ? window.webkitPerformance : window.msPerformance), _ta = ["navigationStart","unloadEventStart","unloadEventEnd","redirectStart","redirectEnd","fetchStart","domainLookupStart","domainLookupEnd","connectStart","connectEnd","requestStart",/*10*/"responseStart","responseEnd","domLoading","domInteractive","domContentLoadedEventStart","domContentLoadedEventEnd","domComplete","loadEventStart","loadEventEnd"], _da = [], _t0, _tmp, f3 = f3_ie;  
    _p = (_p ? _p : window.performance);        
    if (_p && (_t = _p.timing)) {       
        if (!_t.domContentLoadedEventStart) {
            _ta.splice(15, 2, 'domContentLoaded', 'domContentLoaded');
        } else {
            if (f3_c) {
                f3 = f3_c;
            }
        }           
        _t0 = _t[_ta[0]];
        for (var i = 1, l = _ta.length; i < l; i++) {
            _tmp = _t[_ta[i]];
            _tmp = (_tmp ? (_tmp - _t0) : 0);
            if (_tmp > 0) {
                _da.push( i + '=' + _tmp);
            }
        }           
        if (window.d0) {//统计页面初始化时的d0时间
            _da.push('30=' + (window.d0 - _t0));
        }           
        var url = 'http://www.report.com?flag1=' + f1 + '&flag2=' + f2 + '&flag3=' + f3 + '&' + _da.join('&');      
        var _img = new Image();
        setTimeout(function(){
            _img.src = url;
        }, 10);
    }       
};
//注意！需要在onload事件后进行计算上报。
window.onload = function(){
    setTimingRpt(7839, 7, 3);//活动页面
};
```

2. 页面性能统计方法
```javascript
let times = {};
let t = window.performance.timing;

// 优先使用 navigation v2  https://www.w3.org/TR/navigation-timing-2/
if (typeof win.PerformanceNavigationTiming === 'function') {
  try {
    var nt2Timing = performance.getEntriesByType('navigation')[0]
    if (nt2Timing) {
      t = nt2Timing
    }
  } catch (err) {
  }
}

//重定向时间
times.redirectTime = t.redirectEnd - t.redirectStart;

//dns查询耗时
times.dnsTime = t.domainLookupEnd - t.domainLookupStart;

//TTFB 读取页面第一个字节的时间
times.ttfbTime = t.responseStart - t.navigationStart;

//DNS 缓存时间
times.appcacheTime = t.domainLookupStart - t.fetchStart;

//卸载页面的时间
times.unloadTime = t.unloadEventEnd - t.unloadEventStart;

//tcp连接耗时
times.tcpTime = t.connectEnd - t.connectStart;

//request请求耗时
times.reqTime = t.responseEnd - t.responseStart;

//解析dom树耗时
times.analysisTime = t.domComplete - t.domInteractive;

//白屏时间 
times.blankTime = (t.domInteractive || t.domLoading) - t.fetchStart;

//domReadyTime
times.domReadyTime = t.domContentLoadedEventEnd - t.fetchStart;
```