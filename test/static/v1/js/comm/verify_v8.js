var Verify={
	EmulatorValatian : 1,
    VirtualAPKValatian : 1,
    // ===================== 验证函数 ==========================

    //系统平台验证
    checkPlatform: function (tag) {
        if (tag) {
            //弹窗
            if (!Client.env.isClient) {
                if (Client.env.platform == "android" || Client.env.platform == "unknow") {
                    //ACT._dialog("dialog_platform");
                    arousal.downLoad();
                    return false;
                }
                if (Client.env.platform == "ios") {
                    //ACT._dialog("dialog_platform_ios");
                    arousal.downLoad();
                    return false;
                }
            }
        } else {
            //无弹窗
            if (!Client.env.isClient) {
                return false;
            }
        }
        return true;
    },
	//用户授权验证
	checkPermission : function (){
		_pstr1 = typeof (_pstr1) == "undefined" ? "" : _pstr1;
        _pstr2 = typeof (_pstr2) == "undefined" ? "" : _pstr2;
        _pstr3 = typeof (_pstr3) == "undefined" ? "" : _pstr3;
        _pstr4 = typeof (_pstr4) == "undefined" ? "" : _pstr4;
		if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.toCheckPermission) == "function") {
			var res = window.activityInterface.toCheckPermission(_pstr1, _pstr2, _pstr3, _pstr4,"");
			if(res == false){
				window.activityInterface.toCheckPermission(_pstr1, _pstr2, _pstr3, _pstr4,"permcallb2");
				return false;
			}
		}
		window.permcallb2 = function (flag) {
		}
		return true;
	},
    //版本验证
    checkVersion: function (tag, androidvCode, iosvCode) {
        if (!androidvCode) { androidvCode = 190; }
        if (!iosvCode) { iosvCode = 1; }
        if (!Client.env.isClient) { return false; }
        if (tag) {
            //弹窗
            if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.getVersionCode) == "function") {
                var VsersionCode = window.activityInterface.getVersionCode();
                if (Client.env.platform == "android") {
                    if (VsersionCode < androidvCode) { //190 = 1.5.4.003
                        ACT._dialog("dialog_version");
                        return false;
                    }
                }
                if (Client.env.platform == "ios") {
                    if (VsersionCode < iosvCode) {
                        ACT._dialog("dialog_version_ios");
                        return false;
                    }
                }
            } else {
                ACT._dialog("dialog_version");
                return false;
            }
        } else {
            //无弹窗
            if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.getVersionCode) == "function") {
                var VsersionCode = window.activityInterface.getVersionCode();
                if (Client.env.platform == "android") {
                    if (VsersionCode < androidvCode) { //190 = 1.5.4.003
                        return false;
                    }
                }
                if (Client.env.platform == "ios") {
                    if (VsersionCode < iosvCode) {
                        return false;
                    }
                }
            } else {
                return false;
            }
        }
        return true;
    },
    //版本验证特殊版本
    checkVserionSpecial: function (androidvCode, iosvCode, dialogtype) {
        if (!androidvCode) { androidvCode = 219; }
        if (!iosvCode) { iosvCode = 0; }
        if (!dialogtype) { dialogtype = "dialog_version_special"; }
        if (!Client.env.isClient) { return false; }
        if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.getVersionCode) == "function") {
            var VsersionCode = window.activityInterface.getVersionCode();
            if (Client.env.platform == "android" && VsersionCode < androidvCode) {
                ACT._dialog(dialogtype);
                return false;
            }
            if (Client.env.platform == "ios" && VsersionCode < iosvCode) {
                ACT._dialog(dialogtype);
                return false;
            }
        }
        return true;
    },
    //版本验证
    checkVersionMatch: function (matchfh, androidvCode, iosvCode, tag, dialogtype) {
        if (!matchfh) { matchfh = "<"; }
        if (!iosvCode) { iosvCode = 0; }
        if (!tag) { tag = 0; }
        if (!dialogtype) { dialogtype = "dialog_version_special"; }
        if (!Client.env.isClient) { return false; }
        if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.getVersionCode) == "function") {
            var VsersionCode = window.activityInterface.getVersionCode();
            if (matchfh == "<") {
                if (Client.env.platform == "android") {
                    if (VsersionCode < androidvCode) {
                        if (tag) {
                            ACT._dialog(dialogtype);
                        }
                        return false;
                    }
                }
                if (Client.env.platform == "ios") {
                    if (VsersionCode < iosvCode) {
                        if (tag) {
                            ACT._dialog(dialogtype);
                        }
                        return false;
                    }
                }
            } else if (matchfh == "<=") {
                if (Client.env.platform == "android") {
                    if (VsersionCode <= androidvCode) {
                        if (tag) {
                            ACT._dialog(dialogtype);
                        }
                        return false;
                    }
                }
                if (Client.env.platform == "ios") {
                    if (VsersionCode <= iosvCode) {
                        if (tag) {
                            ACT._dialog(dialogtype);
                        }
                        return false;
                    }
                }
            } else if (matchfh == ">") {
                if (Client.env.platform == "android") {
                    if (VsersionCode > androidvCode) {
                        if (tag) {
                            ACT._dialog(dialogtype);
                        }
                        return false;
                    }
                }
                if (Client.env.platform == "ios") {
                    if (VsersionCode > iosvCode) {
                        if (tag) {
                            ACT._dialog(dialogtype);
                        }
                        return false;
                    }
                }
            } else {
                if (Client.env.platform == "android") {
                    if (VsersionCode >= androidvCode) {
                        if (tag) {
                            ACT._dialog(dialogtype);
                        }
                        return false;
                    }
                }
                if (Client.env.platform == "ios") {
                    if (VsersionCode >= iosvCode) {
                        if (tag) {
                            ACT._dialog(dialogtype);
                        }
                        return false;
                    }
                }
            }
        } else {
            return false;
        }
        return true;
    },
    //活动开始、结束验证
    checkOpen:function(){
        if (OPEN == 0) { ACT._dialog("dialog_no_open"); return false; }  //活动未开始
        if (OPEN == 2) { ACT._dialog("dialog_close"); return false; } //活动已结束
        return true;
    },
    //活动暂停
    checkPAUSE:function(){
        if (PAUSE == "open") { ACT._dialog("dialog_pause"); return false; }
        return true;
    },
    //设备号验证、绑定
    DeviceVal: function () {
        if (ACT['c']['DeviceBindUserStatus'] == -1) {
            if (ACT['c']['DeviceUpmax'] == -1) {
                if (ACT['c']['DeviceBandPerson'] < 1) {
                    ACT._dialog("dialog_DeviceFirstBand","bottom");
                } else {
                    ACT._dialog("dialog_DeviceOtherBand","bottom");
                }
            } else {
                ACT._dialog("dialog_DeviceUpmax","bottom");
            }
            return false;
        }
        return true;
    },
    //顶号
    otherPlaceLogin:function(){
        if (ACT['c']['loginStatus']=="104"){
            ACT._dialog("dialog_other_place_login");
            return false;
        }
        return true;
    },
    //登陆验证【无弹窗】
    LoginCheck : function(){
        var _this = this;
        if (!_this.checkVersion()){return false;}
        return true;
    },
    //验证登陆
    checkLogin : function(){
        if (ACT['c']['loginStatus']=="103" && Client.scookie==''){
            Client.login();
            return false;
        }
        return true;
    },
    //模拟器
    Emulator: function () {
        var _this = this;
        if (EMULATOR == "open") {
            if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.isEmulator) == "function") {
                var result = window.activityInterface.isEmulator();
                if (result) {
                    if (_this.ValEmulatorOrVirtualAPKWhiteList('ValEmulatorWhiteList') == -100) {
                        _this.EmulatorValatian = 2;
                        window.activityInterface.showToast("请使用手机参与活动！");
                        ACT._dialog("dialog_Emulator");
                        return false;
                    }
                }
            }
        }
        return true;
    },
    //分身
    IsVirtualAPK: function () {
        var _this = this;
        if (VIRTUALAPK == "open") {
            if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.getIsVirtualAPK) == "function") {
                var result = window.activityInterface.getIsVirtualAPK();
                if (result) {
                    if (_this.ValEmulatorOrVirtualAPKWhiteList('ValVirtualAPKWhiteList') == -100) {
                        _this.VirtualAPKValatian = 2;
                        window.activityInterface.showToast("手机环境异常");
                        ACT._dialog("dialog_IsVirtualAPK");
                        return false;
                    }
                }
            }
        }
        return true;
    },
    //模拟器、分身白名单验证
    ValEmulatorOrVirtualAPKWhiteList: function (actionf) {
        var _this = this;
        var result = -100;
        var jixing = "";

        if (Client.env.isClient && Client.env.platform == "android") {
            var ofstart = navigator.userAgent.indexOf("Androidkb");
            var ofend = navigator.userAgent.indexOf("@4399_sykb_android_activity@");
            var censtr = navigator.userAgent.substring(ofstart, ofend);
            var jixing = censtr.split(";")[1];
        }

        if (Client.env.isClient && Client.env.platform == "ios") {
            var ofstart = navigator.userAgent.indexOf("Ioskb/");
            var ofend = navigator.userAgent.indexOf("*");
            var censtr = navigator.userAgent.substring(ofstart, ofend);
            var jixing = censtr.split(";")[1];
        }

        Client.getasync(ACT.ajaxPath, { ac: actionf, jixing: jixing, r: Math.random() }, function (msg) {
            if (msg['key'] == 100) {
                result = 100;
            }
        });

        return result;
    },
	//模拟器二次验证
	SecEmulator : function(){
        var _this = this;
        if(_this.EmulatorValatian==2){
            window.activityInterface.showToast("请使用手机参与活动！");
			ACT._dialog("dialog_Emulator");
			return false;
        }
        return true;
    },
    //分身二次验证
    SecVirtualAPK : function(){
        var _this = this;
        if(_this.VirtualAPKValatian==2){
            window.activityInterface.showToast("手机环境异常");
            ACT._dialog("dialog_IsVirtualAPK");
            return false;
        }
        return true;
    },
	
	//好友互动页维护验证
    FriendPagePause : function(){
        if (FRIENDPAGEPAUSE == "open") { ACT._dialog("dialog_friendpagepause"); return false; }
        return true;
    },
	
    //验证全部
    checkAll : function(){
        var _this = this;
        if (!_this.checkPlatform(1)) {return false;}
        if (!_this.checkVersion(1)) { return false; }
        if (!_this.checkOpen()){ return false;}
        if (!_this.checkPAUSE()){ return false;}
        if (!_this.checkLogin()){ return false;}
        if (!_this.SecEmulator()){ return false;}
        if (!_this.SecVirtualAPK()){ return false;}
		if (!_this.checkPermission()) {return false;}
        if (!_this.DeviceVal()) { return false; }
        if (!_this.otherPlaceLogin()){ return false;}
        return true;
    },
	//验证不包括权限验证
    checkAllNoPermission : function(){
        var _this = this;
        if (!_this.checkPlatform(1)) {return false;}
        if (!_this.checkVersion(1)) { return false; }
        if (!_this.checkOpen()){ return false;}
        if (!_this.checkPAUSE()){ return false;}
        if (!_this.checkLogin()){ return false;}
        if (!_this.SecEmulator()){ return false;}
        if (!_this.SecVirtualAPK()){ return false;}
        if (!_this.otherPlaceLogin()){ return false;}
        return true;
    },
	
	//数美强制升级验证
    ShumeiUpVer : function(){
        var _this = this;
		if (!_this.checkVersionMatch("<=", 308, 18, 1 , "dialog_version_smup")) { return false; }
        return true;
    },
	
	//跳转到社区 定位到某个tab
    toHomeCommunityWhitTab : function(id, JumpUrl,Jumptitle){
        var _this = this;
		
		//0=关注 、1=推荐 、2=热榜 、3=论坛 、4=福利中心、5=玩家榜、6=水友赛、7=最强爆友、     【合并组合】爆友广场（原推荐/水友赛/最强爆友） 【自定义兼容新旧版本】
		
		//1=推荐 2=热榜 3=论坛 4=福利中心 5=玩家榜 6=水友赛 7=最强爆友  【66 ~ < 75版本】
			
		//0=关注； 1=爆友广场（原推荐/水友赛/最强爆友）； 2=论坛； 3=福利中心； 4=玩家榜；【1575新版本及以上】
			
		if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.toHomeCommunityWhitTab) == "function") {
			var VsersionCode = window.activityInterface.getVersionCode();
			if (Client.env.platform == "android" && VsersionCode >= 335){ //335 = 1.5.7.5
				if(id==1 || id==6 || id==7){ //爆友广场（原推荐/水友赛/最强爆友）
					id = 1;
				}else if(id == 3){
					id = 2;
				}else if(id == 4){
					id = 3;
				}else if(id == 5){
					id = 4;
				}else if(id == 2){
					window.activityInterface.toActivityWaps("https://huodong2.3839.com/hotRank/index.php","热榜",null);
                    return false;
				}
				window.activityInterface.toHomeCommunityWhitTab(id);
                return false;
			}else{
				if(id == 0){
					if(JumpUrl != ""){
						window.activityInterface.toActivityWaps(JumpUrl,Jumptitle,null);
						return false;
					}else{
						return false;
					}
				}
				window.activityInterface.toHomeCommunityWhitTab(id);
                return false;
			}
		}else{
            if(id==4){
                //福利中心
                window.activityInterface.toActivityWaps("https://huodong2.3839.com/flzx/index.html?imm=0","福利中心",null);
                return false;
            }else if(id==5){
                //玩家榜
                window.activityInterface.toActivityWaps("https://huodong2.3839.com/kbwjb/index.html?imm=0","玩家榜",null);
                return false;
            }else if(id==6){
                //水友赛
                window.activityInterface.toActivityWaps("https://huodong3.3839.com/n/hykb/shuiyousai/index.php?imm=0","水友赛",null);
                return false;
            }else if(id==7){
                //最强爆友
                window.activityInterface.toActivityWaps("https://huodong3.3839.com/n/hykb/best_friend/index.php?imm=1","最强爆友聚合页",null);
                return false;
            }else if(id==2){
                //热榜
                window.activityInterface.toActivityWaps("https://huodong2.3839.com/hotRank/index.php?imm=0","热榜",null);
                return false;
            }else{
                if(JumpUrl != ""){
                    window.activityInterface.toActivityWaps(JumpUrl,Jumptitle,null);
                    return false;
                }
            }
		}
        return true;
    },

    //常规ajax交互弹窗
    AjaxDialog : function (msg,user){
        //活动暂停
        if(msg['key']=="pause"){  
            ACT._dialog("dialog_pause"); 
            return false; 
        } 
        //黑名单
        if (msg['key'] == "blacklist") {
            if (msg['level'] == 2) {
                //轻微异常用户
                ACT._dialog("dialog_blacklist_level2");
                return false;
            }
            if (msg['level'] == 3) {
                //轻微异常用户
                ACT._dialog("dialog_blacklist_level3");
                return false;
            }
            if (msg['level'] == 4) {
                //轻微异常用户
                ACT._dialog("dialog_blacklist_level4");
                return false;
            }
        }
		//数美黑名单
		if (msg['key'] == "shumei_black") {
            ACT._dialog("dialog_shumei_blacklist");
            return false;
        }
		//数美黑名单-其他弹窗
        if (msg['key'] == "shumei_black_other") {
			if(msg['time']) { $('.shumei_blacklist_time_'+msg['type']).html(msg['time']); }
            if(msg['desc']) { $('.shumei_blacklist_desc_'+msg['type']).html(msg['desc']); } 
			if(msg['verify'] == 1){
				$('.shumei_blacklist_tip_6').html('也可通过【自助解禁】临时解除该异常，若后续参与仍未关闭异常软件，将延长封禁时间');
				$('.shumei_login_btn').show();
			}
            ACT._dialog("dialog_shumei_blacklist_common"+msg['type']);
            return false;
        }
        //设备号第一次绑定
        if (msg['key'] == "DeviceFirstBand") {
			$(".device_band_user_img").html('<img src="//imga.3839.com/' + user['uid'] + '">');
            $(".device_band_user_name").html(user['name']);
            $(".device_band_user_uid").html(user['uid']);
            $(".device_band_user_baomihua").html(user['baomihua']);
            ACT._dialog("dialog_DeviceFirstBand","bottom");
			return false;
        }
        //设备号第二次绑定
        if (msg['key'] == "DeviceOtherBand") {
			$(".device_band_user_img").html('<img src="//imga.3839.com/' + user['uid'] + '">');
            $(".device_band_user_name").html(user['name']);
            $(".device_band_user_uid").html(user['uid']);
            $(".device_band_user_baomihua").html(user['baomihua']);
			
            var DeviceBandInfo = msg['DeviceBandInfo'];
			for(var b in DeviceBandInfo['bandinfo']){
				var bound_bandinfo = DeviceBandInfo['bandinfo'][b];                           
				$(".device_bound_user_name").html(bound_bandinfo['nickname']);
				$(".device_bound_user_uid").html(bound_bandinfo['uid']);
				$(".device_bound_user_baomihua").html(bound_bandinfo['baomihua']);
				$(".device_bound_source").html(''+bound_bandinfo['identity_type_name']+'：<span>'+bound_bandinfo['username']+'</span><i class="'+bound_bandinfo['identity_type_class']+'"></i>');
			}		
            ACT._dialog("dialog_DeviceOtherBand","bottom");
			return false;
        }
        //设备号绑定超过最大数
        if (msg['key'] == "DeviceUpmax") {
			var DeviceBandInfo = msg['DeviceBandInfo'];
			var x_v3_str = '';
			var x_v3_i = 1;
			for(var b in DeviceBandInfo['bandinfo']){
				var bound_bandinfo = DeviceBandInfo['bandinfo'][b];     
				x_v3_str += '<div class="id-card">';
				x_v3_str += '   <p class="p1">已绑定账号'+x_v3_i+'</p>';
				x_v3_str += '   <p class="p2">'+bound_bandinfo['nickname']+'</p>';
				x_v3_str += '   <p class="p3">ID：'+bound_bandinfo['uid']+'</p>';
				x_v3_str += '   <p class="p3">爆米花：'+bound_bandinfo['baomihua']+'</p>';
				x_v3_str += '   <p class="p3">'+bound_bandinfo['identity_type_name']+'：<span>'+bound_bandinfo['username']+'</span><i class="'+bound_bandinfo['identity_type_class']+'"></i></p>';        
				x_v3_str += '</div>';                       
				x_v3_i+=1;
			}
			$(".dialog_DeviceUpmax_ul").html(x_v3_str);
            ACT._dialog("dialog_DeviceUpmax","bottom");
			return false;
        }
        //5003其他地方登陆了
        if(msg['key']=="otherPlaceLogin"){
            ACT._dialog("dialog_other_place_login");   
            return false;
        }
        //服务器繁忙，请刷新重试！
        if(msg['key']=="error"){ 
            ACT.dialog = Tools.Alert("服务器繁忙，请刷新重试！"); 
            return false; 
        }
		//服务器繁忙，请刷新重试！
        if(msg['key']=="loaderr"){ 
            ACT._dialog("dialog_loaderr"); 
            return false; 
        }
        //用户恶意操作
        if(msg['key']=="userError"){ 
            ACT.dialog = Tools.Alert("网络开小差了，请刷新页面重试！"); 
            return false; 
        }
        //用户频繁操作
        if(msg['key']=="userMulClick"){ 
            ACT.dialog = Tools.Alert("您操作太频繁了！"); 
            return false; 
        }
        //爆米花错误
        if(msg['key']=="bmherror"){ 
            ACT._dialog("dialog_bmherror");   
            return false;
        }   
        //爆米花数不够
        if(msg['key']=="bmh_no_enough"){ 
            ACT._dialog("dialog_bmh_no_enough");   
            return false; 
        }  
        //超级爆米花错误
        if (msg['key'] == "superbmherror") {
            ACT._dialog("dialog_superbmherror");
            return false;
        }
        //验证码错误
        if(msg['key']=="yzm_err_show"){ 
            ACT._dialog("dialog_yzm_err_show"); 
            return false; 
        }
        //验证码初始化  
        if(msg['key']=="yzm"){ 
            $("#identify_img").attr('src',msg['img']); 
            $("#codekey").val(msg['ckey']); 
            ACT._dialog("dialog_yzm");
            return false; 
        } 
        //虚拟手机号限制
        if (msg['key'] == "telerror") {
            ACT._dialog("dialog_telerror"); 
            return false;
        }
        //好友互动页暂停
        if (msg['key'] == "friendpagepause") {
            ACT._dialog("dialog_friendpagepause");
            return false;
        }
        //好友互动页白名单验证
        if (msg['key'] == "hyhdpagewhite") {
            ACT._dialog("dialog_hyhdpagewhite");
            return false;
        }
        //好友互动页修改头像/昵称/生日验证  
        if(msg['key']=="editavatar_err"){ 
            $(".dialog_editavatar_err_renshu").html(msg['renshu']);
            if(msg['mode']==1){
                ACT._dialog("dialog_editavatar_mode1_err");
            }else{
                ACT._dialog("dialog_editavatar_mode2_err");
            }
            return false; 
        } 
        return true;
    },

    // ===== 输入验证 ====
    _num_number:function(obj){
        reg1=/[^\d]/g; 
        if(reg1.test(obj.value)){ 
            obj.value = obj.value.replace(reg1,""); //清除"数字"以外的字符
        }
        reg2=/^[^1-9]/g; 
        if(reg2.test(obj.value)){ 
            obj.value = obj.value.replace(reg2,""); //验证第一个字符不是0
        }
    },
    _num_name:function(obj){
        reg1=/[^a-zA-Z\u4e00-\u9fa5 ]/g; 
        if(reg1.test(obj.value)){ 
            obj.value = obj.value.replace(reg1,""); //清除中英文以外的字符
        }
    },
    //跳转地址
    _JumpUrl: function (url, title) {
        if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.toActivityWaps) == "function") {
            window.activityInterface.toActivityWaps(url, title, "");
        } else {
            window.location = url;
        }
        return false;
    },
    //跳转帖子
    _JumpTiezi: function (url) {
        var id = url.match(/([0-9]+)\.htm/) ? url.match(/([0-9]+)\.htm/)[1].toString() : '';
        if (typeof window.activityInterface.toForumPostDetail == 'function') {
            window.activityInterface.toForumPostDetail(id);
        } else {
            ACT._dialog('dialog_version');
        }
    },

    //绑定微信
    GoBandWx: function () {
        var _this = this;
        if (!_this.checkPlatform(1)) { return false; }
        if (!_this.checkVersionMatch(">=",321)){
			window.activityInterface.toActivityWaps("https://m.3839.com/wx_remind/", "", "");
		}else{
			if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.toWechatRemind) == "function") {
				window.activityInterface.toWechatRemind();
			} else {
				ACT._dialog("dialog_version");
			}
		}
        return false;
    },
    //前往论坛
    GoLuntan: function (luntanid) {
        var _this = this;
        if (!_this.checkPlatform(1)) { return false; }
        if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.toForumDetail) == "function") {
            window.activityInterface.toForumDetail("" + luntanid + "");
        } else {
            ACT._dialog('dialog_version');
        }
        return false;
    },
    //唤醒快爆=打开游戏详情页
    JumpApk: function (gameid, shortUrl) {
        var _this = this;
        AndroidConnect.launch('hykb://openTopic?type=gamedetail&gameId=' + gameid + '', function () {
            document.location.href = shortUrl;
        });
        return false;
    },
	//唤醒快爆=打开活动页
    OpenApkActivityDetail: function (url, kburl) {
        AndroidConnect.launch('hykb://activitydetail?url=' + url + '', function () {
            document.location.href = kburl;
        });
        return false;
    },
	//ios快爆内打开地址到外部浏览器
    OpenIosUrlToWeb: function (actype, kbiosurl) {
        var obj = {};
        obj.interface_type = actype;
        obj.interface_link = kbiosurl;
        window.webkit.messageHandlers.actionToOpenActivity.postMessage(obj);
        return false;
    },
    // ===== 跳转功能 ====
    JumpGlobal: function () {
        var _this = this;
        if (Client.env.isClient) {
            $('a').click(function () {
                var $this = $(this),
                    url = $this.attr("href").toString(),
                    title = $this.attr('title') || '',
                    type = $this.data('type') ? $this.data('type').replace(/(^\s*)|(\s*$)/g, "") : '',
                    id = url.match(/([0-9]+)\.htm/) ? url.match(/([0-9]+)\.htm/)[1].toString() : '',
                    ajc = $this.data('ajc') ? $this.data('ajc') : "",
                    aparam = $this.data('apram') ? $this.data('apram') : "";

                title = title.toString();

                if (ajc != "") {
                    Client.get(ACT.ajaxPath, { ac: "JumpUrlArc", aparam: aparam, r: Math.random() }, function (msg) {
                        if (msg['key'] == "ok") {
                            if (type == 'arc') { //文章详情页
                                window.activityInterface.toArticleDetail(id, title);
                                return false;
                            } else if (type == 'list') {
                                if ($this.data('ext')) { //图鉴类或者关卡
                                    window.activityInterface.toArticleSortList(id, title, 0 | $this.data('ext'));
                                } else {
                                    window.activityInterface.toArticleList(id, title);
                                }
                                return false;
                            } else if (type == 'video') { //视频播放页
                                window.activityInterface.toVideoDetail(id, title);
                                return false;
                            } else if (type == 'video_list') { //视频列表页
                                if ($this.data('tid')) {
                                    window.activityInterface.toVideoSortList(url, title, $this.data('tid').toString());
                                } else {
                                    window.activityInterface.toVideoSortList(url, title, "");
                                }
                                return false;
                            } else if (type == 'game') { //游戏详情页
                                window.activityInterface.toGameDetail(id, title);
                                return false;
                            } else if (type == 'tool' || type == 'hd') { //tool工具详情页 hd活动地址
                                var share_data = {};
                                share_data['title'] = $this.data('title');
                                share_data['icon'] = $this.data('icon');
                                share_data['link'] = $this.data('link');
                                share_data['desc'] = $this.data('desc');
                                var json_str = JSON.stringify(share_data);

                                if (type == 'tool') {
                                    window.activityInterface.toToolDetailWaps(url, title, '');
                                } else {
                                    window.activityInterface.toActivityWaps(url, title, "");
                                }
                                return false;
                            } else if (type == 'search') { //搜索页
                                window.activityInterface.toMainSearch();
                                return false;
                            } else if (type == 'tool_list') { //工具箱列表页
                                window.activityInterface.toToolsList();
                                return false;
                            } else if (type == 'video_full' && url && typeof window.activityInterface.openVideoFullScreen == 'function') { //直接播放视频（全屏播放）
                                window.activityInterface.openVideoFullScreen(url);
                                return false;
                            } else if (type == 'luntan') { //论坛
                                if (typeof window.activityInterface.toForumDetail == 'function') {
                                    window.activityInterface.toForumDetail(id);
                                } else {
                                    ACT._dialog('dialog_version');
                                }
                                return false;
                            } else if (type == 'tiezi') { //帖子
                                if (typeof window.activityInterface.toForumPostDetail == 'function') {
                                    window.activityInterface.toForumPostDetail(id);
                                } else {
                                    ACT._dialog('dialog_version');
                                }
                                return false;
                            } else if (url.indexOf('//') !== -1) {
                                window.activityInterface.toActivityWaps(url, title, "");
                                return false;
                            }
                        }
                    });
                } else {
                    if (type == 'arc') { //文章详情页
                        window.activityInterface.toArticleDetail(id, title);
                        return false;
                    } else if (type == 'list') {
                        if ($this.data('ext')) { //图鉴类或者关卡
                            window.activityInterface.toArticleSortList(id, title, 0 | $this.data('ext'));
                        } else {
                            window.activityInterface.toArticleList(id, title);
                        }
                        return false;
                    } else if (type == 'video') { //视频播放页
                        window.activityInterface.toVideoDetail(id, title);
                        return false;
                    } else if (type == 'video_list') { //视频列表页
                        if ($this.data('tid')) {
                            window.activityInterface.toVideoSortList(url, title, $this.data('tid').toString());
                        } else {
                            window.activityInterface.toVideoSortList(url, title, "");
                        }
                        return false;
                    } else if (type == 'game') { //游戏详情页
                        window.activityInterface.toGameDetail(id, title);
                        return false;
                    } else if (type == 'tool' || type == 'hd') { //tool工具详情页 hd活动地址
                        var share_data = {};
                        share_data['title'] = $this.data('title');
                        share_data['icon'] = $this.data('icon');
                        share_data['link'] = $this.data('link');
                        share_data['desc'] = $this.data('desc');
                        var json_str = JSON.stringify(share_data);

                        if (type == 'tool') {
                            window.activityInterface.toToolDetailWaps(url, title, '');
                        } else {
                            window.activityInterface.toActivityWaps(url, title, "");
                        }
                        return false;
                    } else if (type == 'search') { //搜索页
                        window.activityInterface.toMainSearch();
                        return false;
                    } else if (type == 'tool_list') { //工具箱列表页
                        window.activityInterface.toToolsList();
                        return false;
                    } else if (type == 'video_full' && url && typeof window.activityInterface.openVideoFullScreen == 'function') { //直接播放视频（全屏播放）
                        window.activityInterface.openVideoFullScreen(url);
                        return false;
                    } else if (type == 'luntan') { //论坛
                        if (typeof window.activityInterface.toForumDetail == 'function') {
                            window.activityInterface.toForumDetail(id);
                        } else {
                            ACT._dialog('dialog_version');
                        }
                        return false;
                    } else if (type == 'tiezi') { //帖子
                        if (typeof window.activityInterface.toForumPostDetail == 'function') {
                            window.activityInterface.toForumPostDetail(id);
                        } else {
                            ACT._dialog('dialog_version');
                        }
                        return false;
                    } else if (url.indexOf('//') !== -1) {
                        window.activityInterface.toActivityWaps(url, title, "");
                        return false;
                    }
                }
                return false;
            });
        }
        return true;
    },
    // ===== 跳转功能=new ====
    checkJump: function () {
        var _this = this;
        $(document).on("click", "a", function () {
            
            var copen = $(this).data('copen') ? $(this).data('copen') : "close",
            ac  = $(this).data('ac') ? $(this).data('ac') : "JumpUrlArc",
            param = $(this).data('param') ? $(this).data('param') : "";
            if (copen != "close"){
                //统计
                Client.get(ACT.ajaxPath, { ac: ac, param: param, r: Math.random() }, function (msg) {
                });
            }

            var href = $(this).attr("href") ? $(this).attr("href").toString() : '';
            if (href.indexOf('//') !== -1) {   //判断有链接
                if (!Client.env.isClient) {        //外部打开
                    var android_reg = /\/\/(m|www)\.3839\.com\/qd\-[a-z0-9]+\.htm/i.exec(href);    //安卓下载页
                    if ($(this).data('platform') && $(this).data('platform') == 1) { //外部打开使用弹框
                        //ACT._dialog('dialog_platform');
                        arousal.downLoad();
                        return false;
                    } else if (android_reg) { //判断跳转,href值为安卓下载页
                        var hdjumptype = $(this).data('hdjumptype') ? $(this).data('hdjumptype').toString() : '';  //跳转类型 1ios，2安卓,非必填
                        var hdjumpios = $(this).data('hdjumpios') ? $(this).data('hdjumpios').toString() : ''; //ios链接,类型空或1时必填
                        var hdjumpurl = $(this).data('hdjumpurl') ? $(this).data('hdjumpurl').toString() : window.location.href;//活动链接，为空时默认本页链接
                        var isWeixin = (/micromessenger/gi).test(navigator.userAgent);
                        if (hdjumptype == 'ios') {  //ios跳转
                            if (isWeixin) {
                                window.location.href = href;
                            } else {
                                window.location.href = hdjumpios;
                            }
                            return false;
                        } else if (hdjumptype == 'android') {  //安卓跳转
                            if (Client.env.platform == 'android') {
                                AndroidConnect.launch('hykb://activitydetail?url=' + hdjumpurl, function () {
                                    window.location.href = href;
                                    return false;
                                });
                            } else {
                                window.location.href = href;
                            }
                            return false;
                        } else {
                            if (Client.env.platform == 'android') {
                                AndroidConnect.launch('hykb://activitydetail?url=' + hdjumpurl, function () {
                                    window.location.href = href;
                                    return false;
                                });
                            } else if (Client.env.platform == 'ios' && !isWeixin && hdjumpios != '') {
                                window.location.href = hdjumpios;
                            } else {
                                window.location.href = href;
                            }
                            return false;
                        }
                    } else {
                        //链接跳转
                    }
                } else {  //快爆内部
                    if (typeof (window.activityInterface) != "object") {
                        ACT._dialog('dialog_version');
                        return false;
                    }
                    var title = $(this).attr('title') ? ($(this).attr('title').toString() || '') : '';
                    //var arc_reg = /\/\/(m\.)?news\.4399\.com[a-z0-9/]+(\d{6,})\.(htm|html)/i.exec(href);       //文章
					var arc_reg = /\/\/(m|www)\.3839\.com\/article\/(\d+)\.html/i.exec(href);                //文章
                    var video_reg = /\/\/v\.4399pk\.com[a-z0-9/]+video_(\d+)\.htm/i.exec(href);                //视频
                    var forum_reg = /\/\/(m\.)?bbs\.3839\.com\/forum-(\d+)\.htm/i.exec(href);                  //论坛
                    var thread_reg = /\/\/(m\.)?bbs\.3839\.com\/thread-(\d+)\.htm/i.exec(href);                //帖子
                    var thread_reg_test = /\/\/t\.forum\.3839\.com\/thread-(\d+)\.htm/i.exec(href);                //帖子【测试环境】
                    var game_reg = /\/\/(m|www)\.3839\.com\/a\/(\d+)\.htm/i.exec(href);                        //游戏1
					var fast_game_reg = /\/\/(m|www)\.3839\.com\/c\/(\d+)\.htm/i.exec(href);                   //快玩游戏
                    var cloud_game_reg = /\/\/(m|www)\.3839\.com\/b\/(\d+)\.htm/i.exec(href);                  //云玩游戏
                    var videofull_reg = /\/\/(.*?)\.mp4$/i.exec(href);                                         //视频播放
					var forum_2_reg = /\/\/(m\.)?bbs\.3839\.com\/forum-(\d+)-(\d+)\.htm/i.exec(href);           //论坛二级栏目

                    if (arc_reg) {
                        window.activityInterface.toArticleDetail(arc_reg[2].toString(), title);
                    } else if (video_reg) {
                        window.activityInterface.toVideoDetail(video_reg[2].toString(), title);
                    } else if (forum_reg) {
                        window.activityInterface.toForumDetail(forum_reg[2].toString());
                    } else if (thread_reg) {
                        window.activityInterface.toForumPostDetail(thread_reg[2].toString());
                    } else if (thread_reg_test) {
                        window.activityInterface.toForumPostDetail(thread_reg_test[1].toString());
                    } else if (game_reg) {
                        window.activityInterface.toGameDetail(game_reg[2].toString(), title);
                    }else if(fast_game_reg) {//快玩
						if (typeof(window.activityInterface.toKuaiWanGameDetail) == 'function') {
							window.activityInterface.toKuaiWanGameDetail(fast_game_reg[2].toString());
						} 
                    }else if(cloud_game_reg){//云玩
						if(typeof(window.activityInterface.toYunWanGameDetail) == 'function'){
							window.activityInterface.toYunWanGameDetail(cloud_game_reg[2].toString());
						} 
					}else if (videofull_reg) {
                        window.activityInterface.openVideoFullScreen(href);
                    }else if (forum_2_reg) {
						if (typeof(window.activityInterface.toForumPostListByTheme) == 'function') {
							window.activityInterface.toForumPostListByTheme(forum_2_reg[2].toString(),forum_2_reg[3].toString());
						}
					} else {  //活动或工具
                        window.activityInterface.toActivityWaps(href, title, null);
                    }
                    return false;
                }
            }
        });
        return true;
    }
}




