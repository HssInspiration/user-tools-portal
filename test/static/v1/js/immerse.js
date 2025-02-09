function setFontSize(){
    var w=window,
        d=document.documentElement,
        c;
    function setSize(){
        var deviceWidth = d.clientWidth;
        deviceWidth > 750 && (deviceWidth = 750);
        var a=(deviceWidth / 7.5).toFixed(2);
        d.style.fontSize = a + "px";
    }
    setSize();
    w.addEventListener("resize", function () {
        clearTimeout(c),
        c = setTimeout(setSize, 300)
    }, !1)
}
(function(){
    var ua = window.navigator.userAgent;
    if(/\sQQ\//i.test(ua)){setFontSize()}
})();

var holdMod = {
    barHeightInit:0,
    barHeight:0, // 状态栏高度
    menuHeight:48, // 菜单栏高度
    imm:null, // 沉浸式 0是/白 1是/黑 2非/白头
    isMenu:false, //是否有菜单
    env:{
        platform: 'android',//运行平台
        isClient: 0     //是否app
    },
    getUrlQuery:function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null)
            context = decodeURIComponent(r[2]);
        reg = null;
        r = null;
        return context == null || context === "" || context === "undefined" ? "" : context;
    },
    rem2px:function(val){
        var deviceWidth = document.documentElement.clientWidth;
        deviceWidth > 750 && (deviceWidth = 750);
        var rem = (deviceWidth / 7.5).toFixed(2);
        return val*rem;
    },
    getBarHeight: function(){
        var rate = window.screen.height / window.screen.width;
        var limit =  window.screen.height == window.screen.availHeight ? 1.8 : 1.65;
        if(this.env.isClient){
            if(this.env.platform == "android" && window.activityInterface && typeof (window.activityInterface.getStatusBarHeight)=="function"){
                var statusBarHeight = window.activityInterface.getStatusBarHeight();
                var dpr =  window.devicePixelRatio;
                this.barHeight = statusBarHeight / dpr;
            }else{
                this.barHeight = rate > limit ? 32 : 24;
            }
            if(this.env.platform == "ios"){
                var iosVsersionCode = window.prompt&&window.prompt(this.jsonString('getVersionCode ',''));
                if(iosVsersionCode>=18){
                    this.barHeight = window.prompt&&window.prompt(this.jsonString('getStatusBarHeight',''));
                }else{
                    this.barHeight = rate > limit ? 44 : 20;
                }
            }
        }else{
            if(this.env.platform == "android"){
                this.barHeight = rate > limit ? 32 : 24;
            }
            if(this.env.platform == "ios"){
                this.barHeight = rate > limit ? 44 : 20;
            }
        }
    },
    setMenuHeight:function(){
        this.menuHeight = this.env.platform == "android" ? 48 : 44;
    },
    holdOverHeight:function(){
        var diff =  this.barHeightInit - this.barHeight;
        return diff >= 0 ? diff : 0;
    },
    //是否沉浸式
    isFull: function () {
    if (this.env.isClient && (this.imm === '0' || this.imm === '1') && this.imm) {
        if (this.env.platform == "android") {
          return window.activityInterface && window.activityInterface.getVersionCode() >= 294;
        }
        if (this.env.platform == "ios") {
          return window.prompt && window.prompt(this.jsonString('getVersionCode ', '')) >= 14;
        }
      } else if (this.env.isClient && (this.immgj === '0' || this.immgj === '1') && this.immgj) {
        return window.activityInterface && window.activityInterface.getVersionCode() >= 351;
      }
      return false;
    },
    jsonString:function(clientName, cont) {
        return JSON.stringify({ "function": clientName, "params": cont })
    },
    init:function(node,val){
        var isAndroid = (/android/gi).test(navigator.appVersion),
            isIos = (/iphone|ipad|ipod/gi).test(navigator.appVersion),
            isClient = (/@4399_sykb_android_activity@/gi).test(navigator.userAgent),
            isIosClient = (/Ioskb/gi).test(navigator.userAgent);

        this.env.platform = isAndroid ? 'android' : (isIos ? 'ios' : 'unknow');
        this.env.isClient = this.env.platform == "ios" ? isIosClient : isClient;
        this.getBarHeight();
        this.setMenuHeight();
        this.imm = this.getUrlQuery('imm');
        this.barHeightInit = this.rem2px(val!=undefined?val:.88);
        var $node = document.getElementsByClassName(node)[0];

        if(this.isFull()){
            //沉浸式
            document.body.classList.add('vFull');
            $node&&($node.style.marginTop = - this.holdOverHeight() +'px');
        }else{
            //非沉浸式
            document.body.classList.add('vBase');
            if(this.isMenu){
                $node&&($node.style.marginTop = - this.barHeightInit +'px');
            }else{
                $node&&($node.style.marginTop = - (this.barHeightInit+this.menuHeight) +'px');
            }
        }
    }
}

document.addEventListener('DOMContentLoaded',function(){
    // holdMod.isMenu = true;  // 是否有菜单栏内容
    // holdMod.isFull = ()=> true; // 测试状态设置沉浸式效果
    holdMod.init('immersive'); 
},false)
