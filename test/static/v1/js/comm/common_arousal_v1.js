var AndroidConnect2 = {
    alink:false,
    initLaunch : function(){
        var _this = this;

        if( !this.frame ){
            this.frame = document.createElement("frame");
            this.frame.style.display = "none";
            document.body.appendChild(this.frame);
            this.timeout = 1000;

            window.onblur = function(){
                clearTimeout(_this.timer);
                _this.timer = null;
            };
        }
    },
    launchFallback : function(start_time){
        var now_time = Date.now();

        if (!start_time || now_time - start_time < this.timeout + 200){
            this.fallback();
        }
    },
    launch : function(launch_url, fallback){
        var _this = this,
            start_time = Date.now(),
            isIos=(/iphone|ipad|ipod|macintosh/gi).test(navigator.appVersion);
        this.launch_url = launch_url || '//d.3839.com/Cj';
        this.fallback = typeof fallback === "function" ? fallback : function(){};
        if(isIos){
            if(!this.alink){
                this.alink=document.createElement("a");
                this.alink.setAttribute("target","_self");
                this.alink.style.display="none";
                document.body.appendChild(this.alink);
            }
            console.log(this.alink)
            this.alink.setAttribute("href",this.launch_url);
            this.alink.click();
            setTimeout(function(){
                if(typeof this.fallback==="function"){
                    this.fallback;
                }

            },1500);
            return false;
        };
        this.initLaunch();
        if( this.fallback ){
            this.timer = setTimeout(function(){
                _this.launchFallback(start_time);
            }, _this.timeout);
        }

        this.redirect();
    },

    redirect : function(){
        var isChrome = navigator.userAgent.indexOf("Chrome") > -1;

        if(isChrome){
            document.location.href = this.launch_url;
        } else {
            this.frame.setAttribute("src", this.launch_url);
        }
    },
};
var arousal={
    imgagePath:"//res.onebiji.com/kuaibao/huanqi/v1/images/",
	//imgagePath:"//t.huodong.4399.com/kuaibao/huanqi/v1/images/",
    env:{
        platform: 'android',//运行平台
        isClient: 0     //是否app
    },
    isWeChat:0,//是否在微信或者QQ中
    defaultObj :{
        androidKbLink:'hykb://openmainpage',
        iosKbLink:'hykb://openmainpage',
        androidDownload:'//d.3839.com/Cj',
        iosDownload:'https://apps.apple.com/cn/app/%E5%A5%BD%E6%B8%B8%E5%BF%AB%E7%88%86/id1562927731',
        btnShow:1,
        isAuto:0,
    },
    isAndroid:(/android/gi).test(navigator.appVersion),
    isIos:(/iphone|ipad|ipod|macintosh/gi).test(navigator.appVersion),
    isClient:(/@4399_sykb_android_activity@/gi).test(navigator.userAgent),
    isIosClient:(/Ioskb/gi).test(navigator.userAgent),
    ua:navigator.userAgent.toLowerCase(),
    $arousal:document.getElementById('js_arousal'),
    $parent:null,
    $div:document.createElement("div"),
    $kbAppArousal:null,$kbLoadPop:null,$kbGuidePop:null,$weChatShare:null,$outsideMask:null,$kbWhy:null,$guideCopy:null,$toast:null,$kbDownload:null,initObj:null,
    downLoadTxt:'安卓',

    //打开app节点
    openApp:[
        '<a class="kbAppArousal" style="display: none;">',
		'<em></em><span>APP内打开</span>',
        '</a>'
    ],
   
     //引导弹窗节点
    guidePop:[
        '<div class="kbGuidePop" style="display: none;">',
            '<div class="guideClose">关闭</div>',
            '<div class="guideCon">',
                '<div class="guideTitle">',
                    '<b>安装了好游快爆，<br>但是无法打开？</b>',
                '</div>',
                '<div class="guideStep">',
                    '<ul>',
                        '<li>',
                            '<dl>',
                                '<dt>部分浏览器会弹窗二次确认弹窗</dt>',
                                '<dd>点击同意即可</dd>',
                            '</dl>',
                        '</li>',
                        '<li>',
                            '<dl>',
                                '<dt>QQ、微信或当前浏览器可能不支持</dt>',
                                '<dd>复制链接试试在其他游览器打开</dd>',
                            '</dl>',
                            '<a class="guideCopy"><span>复制链接</span></a>',
                        '</li>',
                        '<li>',
                            '<dl>',
                                '<dt>检查是否已安装好游快爆</dt>',
                                '<dd>请在APP列表查找是否已安装好游快爆</dd>',
                            '</dl>',
                            '<span class="guideAppList"><em></em><em></em><em></em><em></em></span>',
                        '</li>',
                    '</ul>',
                '</div>',

            '</div>',
            
        '</div>',
    ],
    //微信分享弹窗节点
    weChatPop:[
        '<div class="weChatShare" style="display: none;">',
            '<div class="weChatCon">',
                '<div class="weChatTitle">',
                    '<b>无法打开？试试这样</b>',
                '</div>',
                '<div class="weChatTxt">',
                    '<p>1. 点击右上角“更多”按钮</p>',
                    '<p>2. 点击“<span>在浏览器中打开</span>”</p>',
                    '<p>3. 再次点击“APP内打开”</p>',
                '</div>',
                '<div class="kbExplain">',
                    '<span></span>',
                    '<dl>',
                        '<dt>好游快爆</dt>',
                        '<dd>超过8000万玩家一起讨论、分享、评价游戏</dd>',
                    '</dl>',
                '</div>',
            '</div>',

        '</div>',
    ],
    arousalEle:null,
    //节点样式
    footStyle:null,
   
    imgUrl:function(str){
        return this.imgagePath+str;
    },
    extend:function(){
        var length = arguments.length;
        var target = arguments[0] || {};
        if (typeof target!="object" && typeof target != "function") {
            target = {};
        }
        if (length == 1) {
            target = this;
            i--;
        }
        for (var i = 1; i < length; i++) { 
            var source = arguments[i]; 
            for (var key in source) { 
                if (Object.prototype.hasOwnProperty.call(source, key)) { 
                    target[key] = source[key]; 
                } 
            } 
        }
        return target; 
    },
    downLoad:function(){
        this.$outsideMask.style.display = 'block';
        // if(this.isIos){
        //     AndroidConnect2.launch(this.initObj.iosKbLink);
        // }else{
        //     if(this.isAndroid){
        //         AndroidConnect2.launch(this.initObj.androidKbLink);
        //     }else{
        //         window.open("https://www.3839.com/app.html", '_blank');
               
        //     }
        // }
        if(this.isWeChat){//在微信或者QQ内
            this.$weChatShare.style.display = 'block';
        }else{
            this.$kbLoadPop.style.display = 'block';
        };
        return false;
    },
    init:function(){
        this.downLoadTxt=this.isIos?'IOS':'安卓';
         //下载弹窗节点
        this.downLoadPop=[
            '<div class="kbLoadPop" style="display: none;"> ',
            '<div class="loadClose">关闭</div>',
            '<div class="loadTopImg">',
                '<span class="img"></span>',
                '<span class="imgMask"></span>',
            '</div>',
            '<div class="loadCon">',
                '<div class="loadTitle">',
                    '<b>前往好游快爆体验</b>',
                    '<span>更多精彩内容</span>',
                '</div>',
                '<div class="loadTxt">好游快爆是一款超火的好玩游戏聚合APP，超过<b>8000万</b>玩家一起讨论、分享、评价游戏</div>',
                '<div class="loadBtn">',
                    '<a class="kbDownload">',
                        '<span>下载好游快爆 '+this.downLoadTxt+'客户端</span>',
                    '</a>',
                    '<a class="kbOpen">我已安装 直接打开</a>',
                    '<div class="kbWhy">',
                        '<a>我已安装，还是无法打开</a>',
                    '</div>',
                '</div>',

            '</div>',
        '</div> ',
        ],
        this.arousalEle=[
            this.openApp.join("")+this.downLoadPop.join("")+this.guidePop.join("")+this.weChatPop.join("")+
            '<div class="outsideMask" style="display: none;"></div>',
            '<div class="kbToast" style="display: none;">',
            '</div> ',
        ];
        this.footStyle=[
    'dl,dt,dd { margin: 0; padding: 0; }',
    '.kbAppArousal { width: 3.46rem; height: 0.76rem; overflow: hidden; -webkit-box-sizing: border-box; padding-left: 0.12rem; position: fixed; left: 50%; margin-left: -1.73rem; bottom: 0.64rem; background: #23C268; box-shadow: rgba(255, 255, 255, 0.2) 0 0 0 1px inset, 0px 0.04rem 0.16rem 0px rgba(0, 0, 0, 0.04); border-radius: 1rem; z-index: 99; font-size: 0; }',
    '.kbLoadPop .loadClose, .kbGuidePop .guideClose { overflow: hidden; line-height: 99; }',
    
    '.kbAppArousal em { width: 1.56rem; height: 0.52rem; overflow: hidden; display: inline-block; vertical-align: top; border-radius: 0.6rem; box-shadow: #fff 0 0 0 1px inset, 0px 0.04rem 0.16rem 0px rgba(0, 0, 0, 0.04); margin-right: 0.12rem; position: relative; margin-top: 0.12rem; background: linear-gradient(97deg, #FFF -0.5%, #EAFFEC 100.5%); }',
    
    '.kbAppArousal em::after { content: ""; background:url('+this.imgUrl('arousalLogo.png')+') no-repeat 0 0; background-size: 100% 100%; background-color: transparent; position: absolute; left: 50%; top: 50%; width: 1.21rem; height: 0.28rem; margin: -0.14rem 0 0 -0.605rem; }',
    
    '.kbAppArousal span { height: 0.76rem; line-height: 0.78rem; overflow: hidden; position: relative; font-size: 0.28rem; display: inline-block; vertical-align: top; font-weight: 500; -webkit-text-stroke: .2pt; color:#fff; }',
    
    '.kbLoadPop { position: fixed; width: 7.5rem; left: 50%; bottom: 0; margin-left: -3.75rem; z-index: 99999999999999999; }',
    
    '.kbLoadPop::before { content: ""; background:url('+this.imgUrl('loadPopBg.png')+') no-repeat 0 0; background-size: 100% 100%;  width: 100%; height: 1.94rem; position: absolute; left: 0; top: 0; z-index: -1; }',
    '.kbLoadPop::after { content: ""; background:#fff; position: absolute; left: 0; top: 1.92rem; right: 0; bottom: 0; z-index: -1; }',
    
    '.kbLoadPop .loadClose { background:url('+this.imgUrl('loadClose.png')+') no-repeat center center; background-size: 0.24rem auto; background-color: transparent; width: 0.6rem; height: 0.6rem; position: absolute; left: 0.14rem; top: 0.14rem; display: block; z-index: 22; }',
    
    '.kbLoadPop .loadTopImg { position: absolute; top: -0.16rem; right: 0.48rem; z-index: 0; width: 1.44rem; height: 1.44rem; }',
    
    '.kbLoadPop .loadTopImg::before { content: ""; background:url('+this.imgUrl('loadPopIcon.png')+') no-repeat 0 0; background-size: 100% 100%; background-color: transparent; width: 0.38rem; height: 0.55rem; position: absolute; left: -0.82rem; top: 0.5rem; }',
    
    '.kbLoadPop .loadTopImg span.img { background:url('+this.imgUrl('arousalLogoImg.jpg')+') no-repeat 0 0; background-size: 100% 100%; background-color: transparent; width: 1.44rem; height: 1.44rem; border-radius: 0.32rem; -webkit-box-sizing: border-box; border: #7A7D7A solid 1px; -webkit-transform: rotate(15deg); display: block; overflow: hidden; }',
    
    '.kbLoadPop .loadTopImg span.imgMask { width: 1.36rem; height: 1.36rem; -webkit-box-sizing: border-box; border: #7A7D7A solid 1px; -webkit-transform: rotate(-6deg); backdrop-filter: blur(0.08rem); -webkit-backdrop-filter: blur(0.08rem); background: rgba(255, 255, 255, 0.5); border-radius: 0.2rem 0.36rem 0.2rem 0.2rem; position: absolute; left: -0.2rem; top: 0.04rem; z-index: -1; }',
    
    '.kbLoadPop .loadCon { padding: 0.96rem 0.64rem 0.54rem; }',
    
    '.kbLoadPop .loadTitle b { font-size: 0.44rem; display: block; color: #131715; line-height: 0.52rem; position: relative; z-index: 0; }',
    
    '.kbLoadPop .loadTitle b::before { content: ""; background:url('+this.imgUrl('arousalTitBg.png')+') no-repeat 0 0; background-size: 100% 100%; background-color: transparent; width: 1.86rem; height: 0.21rem; position: absolute; left: 0.85rem; top: 0.36rem; z-index: -1; }',
    
    '.kbLoadPop .loadTitle span { display: block; font-size: 0.28rem; line-height: 0.34rem; color: #3E403F; margin-top: 0.12rem; }',
    
    '.kbLoadPop .loadTxt { margin-top: 0.48rem; line-height: 0.42rem; color: #7A7D7A; font-size: 0.28rem; }',
    
    '.kbLoadPop .loadTxt b { color: #3E403F; padding-right: 0.04rem; }',
    
    '.kbLoadPop .loadBtn { width: 100%; padding-top: 0.24rem; }',
    
    '.kbLoadPop .loadBtn a.kbDownload { background:linear-gradient(270deg,#28C36B -1.59%,#3AD470 100%); width: 100%; display: block; height: 0.88rem; line-height: 0.9rem; overflow: hidden; color:#fff; font-weight: 500; -webkit-text-stroke: .2pt; font-size: 0; text-align: center; border-radius: 1rem; margin-top: 0.24rem; }',
    
    '.kbLoadPop .loadBtn a.kbDownload span { background:url('+this.imgUrl('loadPopDown.png')+') no-repeat 0 center; background-size: 0.32rem auto; background-color: transparent; display: inline-block; vertical-align: top; font-size: 0.3rem; height: 0.88rem; line-height: 0.9rem; overflow: hidden; padding-left: 0.36rem; }',
    
    '.kbLoadPop .loadBtn a.kbOpen { width: 100%; display: block; height: 0.88rem; line-height: 0.9rem; overflow: hidden; color: #0AAC3C; font-weight: 500; -webkit-text-stroke: .2pt; font-size: 0.3rem; position: relative; border-radius: 1rem; margin-top: 0.24rem; text-align: center; box-shadow: rgba(35, 194, 104, 0.5) 0 0 0 1px inset; }',
    
    '.kbLoadPop .loadBtn a.kbOpen::after { content: ""; background:url('+this.imgUrl('loadGo.png')+') no-repeat 0 0; background-size: 100% 100%; background-color: transparent; width: 0.76rem; height: 0.76rem; position: absolute; right: 0.08rem; top: 0.08rem; }',
    
    '.kbLoadPop .loadBtn .kbWhy { height: 0.46rem; line-height: 0.48rem; overflow: hidden; text-align: center; font-size: 0; margin-top: 0.38rem; }',
    
    '.kbLoadPop .loadBtn .kbWhy a { height: 0.46rem; line-height: 0.48rem; overflow: hidden; display: inline-block; vertical-align: top; position: relative; color: #A7A8A7; font-size: 0.24rem; padding-right: 0.32rem; }',
    
    '.kbLoadPop .loadBtn .kbWhy a::after { content: ""; background:url('+this.imgUrl('loadlQuestion.png')+') no-repeat 0 0; background-size: 100% 100%; background-color: transparent; width: 0.28rem; height: 0.28rem; position: absolute; right: 0; top: 50%; margin-top: -0.14rem; }',
    
    '.kbGuidePop { position: fixed; width: 6rem; left: 50%; margin-left: -3rem; top: 50%; -webkit-transform: translateY(-50%); z-index: 99999999999999999; }',
    
    '.kbGuidePop::before { content: ""; left: 0; right: 0; top: 0.32rem; bottom: 0.9rem; -webkit-transform: rotate(5deg); border-radius: 0.4rem; position: absolute; background: rgba(255, 255, 255, 0.2); box-shadow: rgba(255, 255, 255, 0.4) 0 0 0 1px inset; }',
    
    '.kbGuidePop .guideClose { background:url('+this.imgUrl('guideClose.png')+') no-repeat 0 0; background-size: 100% 100%; background-color: transparent; position: absolute; width: 0.6rem; height: 0.6rem; line-height: 999; overflow: hidden; z-index: 1; bottom: -1.2rem; left: 50%; margin-left: -0.3rem; }',
    
    '.kbGuidePop .guideCon { background:url('+this.imgUrl('guidePopBg.png')+') no-repeat 0 0; background-size: 100% auto; background-color: transparent; width: 100%; padding: 0.56rem 0.4rem 0.48rem; position: relative; -webkit-box-sizing: border-box; z-index: 0; }',
    
    '.kbGuidePop .guideCon::before { content: ""; background:url('+this.imgUrl('guidePopImg1.png')+') no-repeat 0 0; background-size: 100% 100%; background-color: transparent; width: 1.88rem; height: 2.03rem; position: absolute; right: 0.28rem; top: -0.38rem; }',
    
    '.kbGuidePop .guideCon::after { content: ""; top: 1.54rem; left: 0; right: 0; bottom: 0; z-index: -1; position: absolute; background:#fff; border-radius: 0 0 0.4rem 0.4rem; }',
    
    '.kbGuidePop .guideCon .guideTitle b { font-size: 0.38rem; display: block; color: #131715; line-height: 0.46rem; position: relative; z-index: 0; }',
    
    '.kbGuidePop .guideCon .guideTitle b::before { content: ""; background:url('+this.imgUrl('arousalTitBg.png')+') no-repeat 0 0; background-size: 100% 100%; background-color: transparent; width: 1.64rem; height: 0.2rem; position: absolute; left: 0.78rem; bottom: -0.02rem; z-index: -1; }',
    
    '.kbGuidePop .guideCon .guideStep li { padding-top: 0.44rem; }',
    
    '.kbGuidePop .guideCon .guideStep li:first-child { padding-top: 0.48rem; }',
    
    '.kbGuidePop .guideCon .guideStep li dl { display: block; }',
    
    '.kbGuidePop .guideCon .guideStep li dl dt { position: relative; color: #3E403F; font-size: 0.3rem; font-weight: 500; -webkit-text-stroke: .2pt; display: block; line-height: 0.36rem; width: 100%; z-index: 0; }',
    
    '.kbGuidePop .guideCon .guideStep li dl dt::before { content: ""; background:url('+this.imgUrl('guidePopImg2.png')+') no-repeat 0 0; background-size: 100% 100%; background-color: transparent; width: 0.32rem; height: 0.32rem; position: absolute; left: -0.04rem; bottom: -0.06rem; z-index: -1; }',
    
    '.kbGuidePop .guideCon .guideStep li dl dd { color: #A7A8A7; font-size: 0.26rem; line-height: 0.3rem; display: block; margin-top: 0.12rem; width: 100%; }',
    
    '.kbGuidePop .guideCon .guideStep li .guideCopy { width: 100%; height: 0.56rem; border-radius: 0.3rem; display: block; font-size: 0; text-align: center; margin-top: 0.24rem; background: linear-gradient(270deg,#28C36B -1.59%,#3AD470 100%); }',
    
    '.kbGuidePop .guideCon .guideStep li .guideCopy span { height: 0.56rem; line-height: 0.58rem; overflow: hidden; background:url('+this.imgUrl('guidePopLink.png')+') no-repeat 0 center; background-size: 0.24rem auto; background-color: transparent; display: inline-block; vertical-align: top; color:#fff; font-size: 0.24rem; font-weight: 500; -webkit-text-stroke: .2pt; padding-left: 0.32rem; }',
    
    '.kbGuidePop .guideCon .guideStep li .guideAppList { margin-top: 0.24rem; overflow: hidden; display: block; }',
    
    '.kbGuidePop .guideCon .guideStep li .guideAppList em { float: left; background:#F2F3F5; border-radius: 0.28rem; width: 1.12rem; height: 1.12rem; margin-right: 0.24rem; -webkit-box-sizing: border-box; }',
    
    '.kbGuidePop .guideCon .guideStep li .guideAppList em:nth-child(2) { background:url('+this.imgUrl('arousalLogoImg.jpg')+') no-repeat 0 0; background-size: 100% 100%; background-color: transparent; border: #7A7D7A solid 1px; }',
    
    '.kbGuidePop .guideCon .guideStep li .guideAppList em:last-child { margin-right: 0; }',
    
    '.weChatShare { background:url('+this.imgUrl('weChatBg.png')+') no-repeat 0 0; background-size: 100% 100%; background-color: transparent; width: 5.28rem; height: 4.96rem; position: fixed; top: 0.2rem; right: 0.12rem; z-index: 99999999999999999; }',
    
    '.weChatShare .weChatCon { padding: 1.42rem 0 0 0.8rem; -webkit-box-sizing: border-box; }',
    
    '.weChatShare .weChatCon .weChatTitle b { font-size: 0.3rem; display: block; color: #3E403F; line-height: 0.36rem; position: relative; z-index: 0; }',
    
    '.weChatShare .weChatCon .weChatTitle b::before { content: ""; background:url('+this.imgUrl('arousalTitBg.png')+') no-repeat 0 0; background-size: 100% 100%; background-color: transparent; width: 1.8rem; height: 0.16rem; position: absolute; left: 0.02rem; bottom: -0.04rem; z-index: -1; }',
    
    '.weChatShare .weChatCon .weChatTxt { color: #3E403F; line-height: 0.3rem; font-size: 0.26rem; }',
    
    '.weChatShare .weChatCon .weChatTxt p { margin-top: 0.24rem; }',
    
    '.weChatShare .weChatCon .weChatTxt p span { display: inline-block; vertical-align: top; height: 0.3rem; line-height: 0.3rem; padding-left: 0.3rem;background:url('+this.imgUrl('iconBrowser.png')+') no-repeat 0 0; background-size: 0.3rem auto; background-color: transparent; }',
    
    '.weChatShare .weChatCon .kbExplain { height: 0.64rem; position: absolute; right: 0.36rem; bottom: 0.34rem; overflow: hidden; width: 4.26rem; }',
    
    '.weChatShare .weChatCon .kbExplain span { background:url('+this.imgUrl('arousalLogoImg.jpg')+') no-repeat 0 0; background-size: 100% 100%; background-color: transparent; float: left; width: 0.64rem; height: 0.64rem; border-radius: 0.14rem; -webkit-box-sizing: border-box; box-shadow: rgba(255, 255, 255, 0.5) 0 0 0 1px inset, 0px 1px 0.05rem 0px rgba(0, 0, 0, 0.04); }',
    
    '.weChatShare .weChatCon .kbExplain dl { float: right; width: 3.5rem; padding-top: 0.04rem; }',
    
    '.weChatShare .weChatCon .kbExplain dl dt { color: #3E403F; font-size: 0.22rem; font-weight: 500; -webkit-text-stroke: .2pt; line-height: 0.26rem; display: block; width: 100%; }',
    
    '.weChatShare .weChatCon .kbExplain dl dd { font-size: 0.18rem; line-height: 0.24rem; color: #7A7D7A; margin-top: 0.06rem; display: block; width: 100%; }',
    
    '.kbToast { white-space: nowrap; width: 100%; text-align: center; font-size: 0; position: fixed; left: 0; top: 50%; margin-top: -0.35rem; z-index: 999999999999999999999999999; }',
    
    '.kbToast span { background:rgba(0,0,0,.65); height: 0.7rem; line-height: 0.72rem; overflow: hidden; border-radius: 0.2rem; color:#fff; font-size: 0.28rem; display: inline-block; vertical-align: top; padding: 0 0.24rem; }',
    
    '.outsideMask { background: rgba(0, 0, 0, 0.6); position: fixed; top: 0; left: 0; right: 0; z-index: 99999999; width: 100%; height: 100%; }',
    
        ];
        this.initObj= this.$arousal.getAttribute('data-obj');
        this.env.platform = this.isAndroid ? 'android' : (this.isIos ? 'ios' : 'unknow');
        this.env.isClient = this.env.platform == "ios" ? this.isIosClient : this.isClient;
        if(this.env.isClient){
            return false;
        }else{
            this.initObj = this.initObj?this.initObj.replace(/'/g,'"'):'{}';
            this.initObj =this.extend(this.defaultObj,JSON.parse(this.initObj));
            this.$parent =this.$arousal.parentNode;
            this.$div.className = 'kbArousalWrap';
            this.$div.innerHTML = this.arousalEle.join('') + '<style>' + this.footStyle.join('') + '</style>';
            this.$parent.replaceChild(this.$div, this.$arousal);
            
            this.$kbLoadPop= this.$div.getElementsByClassName("kbLoadPop")[0];
            this.$kbGuidePop= this.$div.getElementsByClassName("kbGuidePop")[0];
            this.$weChatShare= this.$div.getElementsByClassName("weChatShare")[0];
            this.$outsideMask= this.$div.getElementsByClassName("outsideMask")[0];
            this.$kbWhy= this.$div.getElementsByClassName("kbWhy")[0];
            this.$guideCopy= this.$div.getElementsByClassName("guideCopy")[0];
            this.$toast= this.$div.getElementsByClassName("kbToast")[0];
            this.$kbDownload= this.$div.getElementsByClassName("kbDownload")[0];
            
            if(parseInt(this.initObj.isAuto)){
                
                var _link="hykb://activitydetail?url=" + encodeURIComponent(window.location.href.replace(/www\.guoping123\.com/, 'www.onebiji.com').replace('huodong3.3839.com', 'huodong3.i3839.com'));
                this.initObj.androidKbLink=_link;
                this.initObj.iosKbLink=_link;
            }else{
                if(this.initObj.androidKbLink.indexOf("hykb://activitydetail?url=")>-1){
                    var regex = /http[s]?:\/\/[^\s]+/g;
                    var androidLink=this.initObj.androidKbLink.match(regex);
                    this.initObj.androidKbLink="hykb://activitydetail?url="+encodeURIComponent(androidLink[0])
                };
                if(this.initObj.iosKbLink.indexOf("hykb://activitydetail?url=")>-1){
                    var regex = /http[s]?:\/\/[^\s]+/g;
                    var iosLink=this.initObj.iosKbLink.match(regex);
                    this.initObj.iosKbLink="hykb://activitydetail?url="+encodeURIComponent(iosLink[0])
                }

            }
            if(parseInt(this.initObj.btnShow)){
                this.$kbAppArousal= this.$div.getElementsByClassName("kbAppArousal")[0];
                this.$kbAppArousal.style.display = 'block';

            }
            
        };
        if((this.ua.match(/MicroMessenger/i)=="micromessenger")||(this.ua.match(/\bqq\b/i) == "qq")){
            this.isWeChat=1;//在微信中或QQ中
        };
        if(parseInt(this.initObj.btnShow)){
            this.$kbAppArousal.addEventListener('click', function() {
                arousal.downLoad();
            });
        }
        this.$kbWhy.addEventListener('click', function() {
            arousal.$kbGuidePop.style.display = 'block';
            arousal.$kbLoadPop.style.display =  'none';
            return false;
        });
        this.$outsideMask.addEventListener('click', function() {
            arousal.$weChatShare.style.display = 'none';
            arousal.$kbLoadPop.style.display = 'none';
            arousal.$kbGuidePop.style.display = 'none';
            arousal.$outsideMask.style.display = 'none';
            return false;
        });
        //下载
        this.$kbDownload.addEventListener('click', function() {
            if(arousal.isIos){
                window.location.href=arousal.initObj.iosDownload;
            }else{
                window.location.href=arousal.initObj.androidDownload;
            };
            return false;
        });
        //toast
        var isToast=false;
        function arousalToast(txt){
            if(!isToast){
                isToast=true;
                arousal.$toast.style.display ='block';
                arousal.$toast.innerHTML =txt;
                setTimeout(function(){
                    arousal.$toast.style.display ='none';
                    isToast=false;
                },1000)
            }
        };
        //复制当前网址
        this.$guideCopy.addEventListener('click', function() {
            // 创建一个临时的textarea元素     
            var tempTextarea = document.createElement('textarea');     
            // 设置textarea的value为当前网址     
            tempTextarea.value = window.location.href;      
            // 将textarea添加到DOM中     
            document.body.appendChild(tempTextarea);      
            // 选中textarea中的文本     
            tempTextarea.select();      
            // 复制选中的文本     
            document.execCommand('copy');      
            // 移除临时的textarea元素     
            document.body.removeChild(tempTextarea);      
            // 提示用户复制成功    
            arousalToast("<span>复制成功</span>"); 
            return false;
           
        });
        this.$div.addEventListener('click', function(e) {
            var ele = e.target.className;
            switch (ele) {
                case 'loadClose':
                    arousal.$kbLoadPop.style.display =  'none';
                    arousal.$outsideMask.style.display = 'none';        
                    break;
                case 'guideClose':
                    arousal.$kbGuidePop.style.display =  'none';
                    arousal.$outsideMask.style.display = 'none'; 
                    break;
                case 'kbOpen':
                    if(arousal.isIos){
                        AndroidConnect2.launch(arousal.initObj.iosKbLink);
                    }else{
                        AndroidConnect2.launch(arousal.initObj.androidKbLink);
                    };
                    setTimeout(function(){
                        arousal.$kbGuidePop.style.display = 'block';
                        arousal.$kbLoadPop.style.display =  'none';
                    },3000)
                    break;
                default:
                   return false;
            };
            return false;
           
        }) 

    }
};
arousal.init();
