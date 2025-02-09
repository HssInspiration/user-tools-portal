
window.hykbJsAndroidApiObj  = {
    user:window.userInterface || null,
    activity:window.activityInterface  || null,
    download:window.downloadInterface  || null
};

//客户端相关JS类
var Client = {
    scookie:"",
    env: {
        platform: 'android',		//运行平台
		    version: '1.5.3.8',			//客户端的版本号
        isClient: 0					//是否是客户端
    },
    uislogin:false,
    //初始化
    init: function() {
        var client = this;
        var isAndroid = (/android/gi).test(navigator.appVersion),
            isClient = (/@4399_sykb_android_activity@/gi).test(navigator.userAgent),
            isIosClient = (/Ioskb/gi).test(navigator.userAgent),
            isIDevice = (/iphone|ipad|ipod/gi).test(navigator.appVersion);
        this.env.platform = isAndroid ? 'android' : (isIDevice ? 'ios' : 'unknow');
        if (this.env.platform == "ios") {
            this.env.isClient = isIosClient;
        } else {
            this.env.isClient = isClient;
        }
        if (this.env.platform == "ios" && this.env.isClient) {
            if (/(Ioskb\/)(\d+\.\d+\.\d+(\.\d+)?)/g.test(navigator.userAgent)) {
                client.env.version = RegExp.$2;
            }
            this.uislogin = window.userInterface.isLogin();
        } else if (this.env.platform == "android" && this.env.isClient) {
            if (/(Androidkb\/)(\d+\.\d+\.\d+(\.\d+)?)/g.test(navigator.userAgent)) {
                client.env.version = RegExp.$2;
            }
            this.uislogin = window.userInterface.isLogin();
        }

        //判断是否有登录
        if (this.env.isClient) {
            if (window.userInterface && this.uislogin) {
                var UserInfo = window.userInterface.getUserInfo();
                var jsonobj = eval('(' + UserInfo + ')');
                this.scookie = jsonobj.scookie;
            }
        }

    },
    login:function() {
        if(this.env.isClient) {
            if(this.scookie) {
                return false;
            }
			window.userInterface.login();
        }else {
            document.location.href = 'https://ptlogin.4399.com/oauth2/authorize.do?client_id=test&redirect_uri='+encodeURIComponent(window.location.href)+'&response_type=NILL&auth_action=LOGIN&css=&uid=&access_token=';
        }
        return true;
    },
    loginReload:function(ajaxPath,data,callback) {
        this.get(ajaxPath,data,callback);
    },
    get:function(url, data, callback) {
        if(this.env.isClient) {
            if(this.scookie=="" && window.userInterface.isLogin()==1) {
                var UserInfo = window.userInterface.getUserInfo();
                var jsonobj  = eval('('+UserInfo+')');
                this.scookie =  jsonobj.scookie;
            }
            data.scookie = this.scookie;

            if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.getUniqueDeviceIdNew) == "function"){
                data.device = window.activityInterface.getUniqueDeviceIdNew(); //识别码
            }else{
                data.device = window.activityInterface.getUniqueDeviceId(); //设备号
            }
        }

        $.post(url, data, function(result) {callback(result);},"json").fail(function (){ if (typeof (postHykbHdFailCommonFunc) === "function") { postHykbHdFailCommonFunc(); }  });
    },
    getasync:function(url, data, callback) {
        if(this.env.isClient) {
            if(this.scookie=="" && window.userInterface.isLogin()==1) {
                var UserInfo = window.userInterface.getUserInfo();
                var jsonobj  = eval('('+UserInfo+')');
                this.scookie =  jsonobj.scookie;
            }
            data.scookie = this.scookie;

            if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.getUniqueDeviceIdNew) == "function"){
                data.device = window.activityInterface.getUniqueDeviceIdNew(); //识别码
            }else{
                data.device = window.activityInterface.getUniqueDeviceId(); //设备号
            }
        }

        $.ajax({
            type:'post',
            url:url,
            data:data,
            dataType:'json',
            async:false,
            success:function(result){
                callback(result);
            }
        });
    }

};
Client.init();

//弹窗类
var Dialog = function(opt){
    this.config = {
        id:'',
        close_id:'',
        close_fun:null,
        maskOpacity:0.7,
        cover:true,
        maskClose:true, //遮罩是否可以关闭
        dialogType:'center',
        isH5: /mobile/i.test(navigator.userAgent),
        bodyScrollTop:0
    }

    this.config = $.extend({},this.config,opt);
    this.show();
}

Dialog.prototype = {
    show:function(){
        var that = this;
        temp_id = $("#"+this.config.id);
        var close_id = temp_id.find(this.config.close_id);
		var closeid = this.config.close_id.replace('.',"");
        this.config.bodyScrollTop = $(window).scrollTop();
        var commonData = {
            mark : "<div class='fixed-top' id='iwgc_dialog_bg' style='position: fixed; left: 0px; background: rgb(0, 0, 0); bottom: 0; top: 0px; z-index: 999;  width: 100%;'></div>",
            win:$(window),
            doc:$(document)
        };

        iwgc_dialog_bg = $("#iwgc_dialog_bg");
        if(this.config.cover){
            if(iwgc_dialog_bg.length==0){
                $("body").append(commonData.mark);
                $("#iwgc_dialog_bg").css({"opacity":0.7});
            }else{
                iwgc_dialog_bg.show();
            }
        }

		if(this.config.maskClose){
			iwgc_dialog_bg = $("#iwgc_dialog_bg");
            iwgc_dialog_bg.attr("class","fixed-top "+closeid+"");
            iwgc_dialog_bg.unbind("click");
        }

        function move(e){
            e.preventDefault();//禁止事件冒泡
        }
        if(this.config.isH5){
            //背景层阻止默认滑动事件
            iwgc_dialog_bg.on('touchmove',move, false);
            //移动端环境
            $("body").css("position",'fixed');
            $("body").css("width",'7.5rem');
            $("body").css("margin-left",'-3.75rem');
            $("body").css("left",'50%');
            $("body").css("top","-"+this.config.bodyScrollTop+'px');
        }else{
            //PC环境
            $("body").css("overflow",'hidden');
        }

        //center 弹出
        if(this.config.dialogType=='center'){
			temp_id.show().css({
                'z-index':99999,
                'position':'fixed',
                "top":(commonData.win.height()-temp_id.outerHeight())/2,
                "left":(commonData.win.width()-temp_id.outerWidth())/2,
            });
        }

        //bottom弹出
        if(this.config.dialogType=='bottom'){
            temp_id.show().css({
                'z-index':99999,
                'position':'fixed',
                'left':'50%',
                'bottom':0
            });
        }

        if(this.config.maskClose){
            iwgc_dialog_bg.on('click',function(){
                that.close();
                return false
            })
        }else{
            iwgc_dialog_bg.unbind("click");
        }

        temp_id.show();
        close_id.on('click',function(){
            that.close();
            return false
        })
        //console.log(this.config);
    },
    close:function(){
        $("#"+this.config.id).hide();
        $("#iwgc_dialog_bg").hide();
        if(this.config.isH5){
            //移动端环境
            $("body").css("position",'');
            $("body").css("width",'');
            $("body").css("margin-left",'');
            $("body").css("left",'');
            $("body").css("top",'');
            $(window).scrollTop(this.config.bodyScrollTop);
			var that =  this;
            $(window).scroll(function(event){
                that.config.bodyScrollTop = $(window).scrollTop();
            });
        }else{
            //PC环境
            var that =  this;
            $("body").css("overflow",'');
        }
        if(typeof this.config.close_fun == 'function'){
			that.config.close_fun();
		}
    }
 }

 $(function(){
	//处理弹窗时的弹窗的滚动效果
	var scrollTimer = null
	$('.in-chip,.over-panel,.dia-note').on('scroll',function(){
		clearTimeout(scrollTimer);
		scrollTimer= null;
		var that = $(this);
		that.addClass('rolling');
		scrollTimer = setTimeout(function(){
			that.removeClass('rolling')
		},300)
	})
	$('.dia-form input,.dia-form textarea').focus(function(){
		$(this).parents('.dia-con').addClass('over')
	}).blur(function(){
		$(this).parents('.dia-con').removeClass('over')
	})
 })

//工具类
var Tools = {
    dialog: function(config) {
        return new Dialog(config);
    },
	scrollTo:function(opt){
        var o = {
            "id":"scroll",
            "pos":0
        };
        o = $.extend(o,{},opt);
        window.scrollTo(0,$(o.id).offset().top+o.pos);
        return false;
    },
    //信息弹窗
    Alert:function(msg,func){
        $("#dialog_msg_info").html(msg);
        return this.dialog({
            id:'dialog_msg',
            close_id:'.dialog_msg_close',
            close_fun:function(){
                if(typeof func == "function"){
                    func();
                }
            }
        });
    },
    //自定义内容弹窗
    DiyAlert:function(msg,dialogid,func){
        $("#"+dialogid+"_info").html(msg);
        return this.dialog({
            id:dialogid,
            close_id:'.'+dialogid+'_close',
            close_fun:function(){
                if(typeof func == "function"){
                    func();
                }
            }
        });
    },
    //获取链接的所有参数，保存成对象。默认添加 t参数
    filterReg:function(){
        var arr= window.location.search.substr(1);
        var myobj={};
        if(arr){
            var myarr=arr.split("&");
            for(var i in myarr){
                var nowArr=myarr[i].split("=");
                if(nowArr[0].search(/^[\w\d]+$/)==0){
                    myobj[nowArr[0]]=nowArr[1];
                }
            }
        }
        return myobj;
    },
    //定位到某个位置
    //$('#pos_duobang'),80,500
    position: function (div, top, ms) {
        ms = ms || 1000;
        var o = div.offset();
        var t = parseInt(o.top) - (top || 0);
        $("html,body").animate({ 'scrollTop': t }, ms);
        return true;
    },
    //跳转外部地址
    JumpUrl: function (Url) {
        window.location = Url;
        return true;
    }
}
