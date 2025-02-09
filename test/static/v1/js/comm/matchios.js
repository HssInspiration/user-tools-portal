var isIDevice = (/iphone|ipad|ipod/gi).test(navigator.appVersion);
var _isIosClient = (/Ioskb/gi).test(navigator.userAgent);
if (isIDevice && _isIosClient) {
	var iosVersionCode = window.prompt(jsonString('getVersionCode', ''));
    window.activityInterface = {      
        wapShareOnlyPicDelOriginalPic: function (imageUrl, platformType, callbackfun) { //4-1.wap纯图分享
            return window.webkit.messageHandlers.wapShareOnlyPicDelOriginalPic.postMessage({ "imgaeurl": imageUrl, "platformType": platformType, "jsFunctionName": callbackfun });
        },
        wapShareOnlyPic: function (imageUrl, platformType, callbackfun) { //4-2.wap纯图分享
            return window.webkit.messageHandlers.wapShareOnlyPic.postMessage({ "imgaeurl": imageUrl, "platformType": platformType, "jsFunctionName": callbackfun });
        },
        wapShare: function (imageUrl, titleUrl, title, desc, platformType, callbackfun) { //4-3.wap分享
            return window.webkit.messageHandlers.wapShare.postMessage({ "imgaeurl": imageUrl, "titleUrl": titleUrl, "title": title,"desc": desc, "platformType": platformType, "platformType": platformType, "jsFunctionName": callbackfun });
        },
        activityShare: function (imageUrl, titleUrl, title, desc, platformType, callbackfun) { //4-3.wap分享,旧版
            return window.webkit.messageHandlers.wapShare.postMessage({ "imgaeurl": imageUrl, "titleUrl": titleUrl, "title": title,"desc": desc, "platformType": platformType, "platformType": platformType, "jsFunctionName": callbackfun });
        },
        toUserInfo: function () { //5.跳转个人资料接口
            return window.webkit.messageHandlers.activityInterface.postMessage('');
        },
        toSendPost: function (forumId, postType, parentThemeId, childThemeId) { //7.调用某个论坛编辑器接口
            return window.webkit.messageHandlers.toSendPost.postMessage({ "forumId": forumId, "postType": postType, "parentThemeId": parentThemeId, "childThemeId": childThemeId });
        },
        switchToNewsFlash: function () { //跳转排行榜接口
            return window.webkit.messageHandlers.switchToNewsFlash.postMessage('');
        },
        toPersonCenter: function (uid) { //跳转个人主页接口
            return window.webkit.messageHandlers.toPersonCenter.postMessage(uid);
        },
        toWechatRemind: function () { //跳转微信提醒接口
            return window.webkit.messageHandlers.toWechatRemind.postMessage('');
        },
        toFeedBack: function () { //跳转帮助与反馈接口
            return window.webkit.messageHandlers.toFeedBack.postMessage('');
        },
        toSetting: function () { //跳转设置接口
            return window.webkit.messageHandlers.toSetting.postMessage('');
        },
        switchToRecommend: function () { //跳转首页接口
            return window.webkit.messageHandlers.switchToRecommend.postMessage('');
        },
        switchToStrategyLib: function () { //跳转攻略
            return window.webkit.messageHandlers.switchToStrategyLib.postMessage('');
        },
        toToolsList: function () { //跳转工具接口
            return window.webkit.messageHandlers.toToolsList.postMessage('');
        },
        toForumDetail: function (id, parentName, childName) { //跳转某个论坛帖子tab的子栏目
            return window.webkit.messageHandlers.toForumDetail.postMessage({ "id": id, "parentName": parentName, "childName": childName });
        },
        isEmulator: function () { //模拟器
            var resEmulator = window.prompt(jsonString('isEmulator', ''));
            return resEmulator==1 ? true : false;
        },
        showToast: function (meg) {// 弹窗
            return window.webkit.messageHandlers.showToast.postMessage(meg);
        }, 
        toForumPostDetail: function (id) { //跳转论坛帖子详情页
            return window.webkit.messageHandlers.toForumPostDetail.postMessage(id);
        },
        getVersionCode: function () { //获取当前app版本号
            return window.prompt(jsonString('getVersionCode', ''));
        },
        getUniqueDeviceId: function () { //设备号
            return window.prompt(jsonString('getUniqueDeviceId', ''));
        },
        getUniqueDeviceIdNew: function () { //识别码
            return window.prompt(jsonString('getUniqueDeviceIdNew', ''));
        },
        switchToMine: function () { //我的
            return window.webkit.messageHandlers.switchToMine.postMessage('');
        },
        getIsVirtualAPK: function () { //分身[IOS端无此判断]
            return false;
        },
        toCertification: function (callbackfun) { //跳转实名认证
            if (callbackfun==""){
                var tcfparam = {};
            }else{
                var tcfparam = { "jsFunctionName": callbackfun};
            }
            return window.webkit.messageHandlers.toCertification.postMessage(tcfparam);
        },
        checkSubscript: function (userid,gameid, callbackfun) { //验证是否预约游戏           
            return window.webkit.messageHandlers.checkSubscript.postMessage({ "userid": userid, "gameid": gameid, "callback": callbackfun });
        },
        addSubscript: function (phone, userid, gameid, successCallback, failCallback) { //添加(预约\关注)
            return window.webkit.messageHandlers.addSubscript.postMessage({ "phone": phone, "userid": userid, "gameid": Math.abs(gameid), "successCallback": successCallback, "failCallback": failCallback });
        },
        cancleSubscript: function (userid, gameid, callbackfun) { //取消(预约\关注)
            return window.webkit.messageHandlers.cancleSubscript.postMessage({ "userid": userid, "gameid": gameid, "callback": callbackfun });
        },
        toToolDetailWaps: function (url, id, shareData) { //跳转至工具详情页
            return window.webkit.messageHandlers.toToolDetailWaps.postMessage({ "url": url, "id": id, "shareData": shareData });
        },
        toActivityWaps: function (url, title, shareData) { //打开活动页
            return window.webkit.messageHandlers.toActivityWaps.postMessage({ "url": url, "title": title, "shareData": shareData });
        },
        toGameDetail: function (id, title) { //打开游戏详情页
            return window.webkit.messageHandlers.toGameDetail.postMessage({ "id": id, "title": title });
        },
        openVideoFullScreen: function (videoUrl) { //直接播放视频（全屏播放）
            return window.webkit.messageHandlers.openVideoFullScreen.postMessage(videoUrl);
        },
        openVideoFullScreen2: function (videoUrl) { //自动直接全屏播放视频
            return window.webkit.messageHandlers.openVideoFullScreen2.postMessage(videoUrl);
        },
        toH5: function (url, title) { //打开h5页面
            return window.webkit.messageHandlers.toH5.postMessage({ "url": url, "title": title });
        },
        copyContentToClipboard: function (txt) { //复制功能
            return window.webkit.messageHandlers.copyContentToClipboard.postMessage(txt);
        },
        toActionList: function (txt) { //打开活动列表页
            return window.webkit.messageHandlers.toActionList.postMessage(txt);
        },
        getVersionName: function () { //获取当前app的版本名称
            return window.prompt(jsonString('getVersionName ', ''));
        },
        isWift: function () { //判断当前网络是否WIFI
            return window.prompt(jsonString('isWift ', ''));
        },
        toReplyDetailActity: function (pid, fid, cid) { //打开游戏评价详情
            return window.webkit.messageHandlers.toReplyDetailActity.postMessage({ "pid": pid, "fid": fid, "cid": cid });
        },
        switchToExpectRank: function () { //跳转首页-热榜
            return window.webkit.messageHandlers.switchToExpectRank.postMessage('');
        },
        toArticleSortList: function (id, title, type) { //打开文章分类列表页
            return window.webkit.messageHandlers.toArticleSortList.postMessage({ "id": id, "title": title, "type": type });
        },
        toArticleList: function (id, title) { //打开文章列表页
            return window.webkit.messageHandlers.toArticleList.postMessage({ "id": id, "title": title });
        },
        actionToOpenActivity: function (data) { //跳转原生页（或走多种接口跳转）
            return window.webkit.messageHandlers.actionToOpenActivity.postMessage(data);
        },
        isWifi: function () { //判断当前网络是否WIFI
            return window.prompt(jsonString('isWifi ', ''));
        },
        toArticleDetail: function (id, title) { //打开文章详情页
            return window.webkit.messageHandlers.toArticleDetail.postMessage({ "id": id, "title": title });
        },
        toVideoDetail: function (id, title) { //打开视频播放页
            return window.webkit.messageHandlers.toVideoDetail.postMessage({ "id": id, "title": title });
        },
        toVideoSortList: function (id, title, tid) { //打开视频分类列表页
            return window.webkit.messageHandlers.toVideoSortList.postMessage({ "id": id, "title": title, "tid": tid });
        },
        toMainSearch: function () { //打开搜索页
            return window.webkit.messageHandlers.toMainSearch.postMessage('');
        },
        switchToMineFriend: function (uid, tabIndex) { //打开我的好友页面
            return window.webkit.messageHandlers.switchToMineFriend.postMessage({ "uid": uid, "tabIndex": tabIndex});
        },
        switchToAnLiWall: function () { //跳转到安利墙
            return window.webkit.messageHandlers.switchToAnLiWall.postMessage('');
        },
        checkIllegalityApp: function () { //检测是否含有刷爆米花的非法app列表
            return {};
        },
        checkInstalled: function (packName) { //检测手机上是否有安装该app
            return true;
        },
        levelExamResult: function (isPass, icon_level, icon_comment, link) { //打开视频分类列表页
            return window.webkit.messageHandlers.levelExamResult.postMessage({ "isPass": isPass, "icon_level": icon_level, "icon_comment": icon_comment, "link": link });
        },
        toPersonCenterFansList: function (uid) { //跳转个人主页-粉丝列表
            return window.webkit.messageHandlers.toPersonCenterFansList.postMessage(uid);
        },
        toQQGroupList: function (jsondata) { //打开QQ群列表页
            return window.webkit.messageHandlers.toQQGroupList.postMessage(jsondata);
        },
        toTopicNewsList: function (title, jsondata) { //打开专区文章列表
            return window.webkit.messageHandlers.toTopicNewsList.postMessage({ "title": title, "jsondata": jsondata});
        },
        switchToFind: function () { //跳转到 社区
            return window.webkit.messageHandlers.switchToFind.postMessage('');
        },
        /*getVerifyCode: function (phone, callbackfun) { //发送预约验证的电话号码
            return window.webkit.messageHandlers.getVerifyCode.postMessage({ "phone": phone, "callback": callbackfun });
        },
        checkVerifyCode: function (phone, code, callbackfun) { //预约手机号验证
            return window.webkit.messageHandlers.checkVerifyCode.postMessage({ "phone": phone, "code": code, "callback": callbackfun });
        },
		*/
        finishActivity: function () { //关闭活动页
            return window.webkit.messageHandlers.finishActivity.postMessage('');
        },
        toExamActivity: function (url, title) { //跳转到考试界面
            return window.webkit.messageHandlers.toExamActivity.postMessage({ "url": url, "title": title });
        },
        toForumDetailByGameId: function (gameid) { //打开论坛详情通过游戏id
            return window.webkit.messageHandlers.toForumDetailByGameId.postMessage(gameid);
        },
        isPhoneBinded: function () { //打开论坛详情通过游戏id
            return window.prompt(jsonString('isPhoneBinded', '')) == 1 ? true : false;
        },
        goBindPhone: function () { //跳转手机绑定页面
            return window.webkit.messageHandlers.goBindPhone.postMessage('');
        },
        
		
        toCommunity: function () { //跳转社区-论坛界面
            return window.webkit.messageHandlers.toCommunity.postMessage('');
        },
        toHotPost: function () { //跳转社区-热帖界面
            return window.webkit.messageHandlers.toHotPost.postMessage('');
        },
        closeAccount: function () { //注销账户
            return window.webkit.messageHandlers.closeAccount.postMessage('');
        },
        isNotificationEnabled: function () { //判断通知权限是否开启
            return window.prompt(jsonString('isNotificationEnabled', '')) == 1 ? true : false;
        },
        goSystemNotification: function () { //至系统通知栏设置
            return window.webkit.messageHandlers.goSystemNotification.postMessage('');
        },
        logout: function () { //退出
            return window.webkit.messageHandlers.logout.postMessage('');
        },
        getContentFromClipboard: function () { //获取剪切板内容
            return window.prompt(jsonString('getContentFromClipboard ', ''));
        },
        isInstallHYKBApp: function () { //是否安装了好游快爆app
            return window.prompt(jsonString('isInstallHYKBApp', '')) == 1 ? true : false;
        },
        toToolWeb: function (toolUrl, id, imageUrl, title, url, desc) { //打开工具wap页
            return window.webkit.messageHandlers.toToolWeb.postMessage({ "toolUrl": toolUrl, "id": id, "imageUrl": imageUrl, "title": title, "url": url, "desc": desc });
        },
        getLocalPhone: function () { //获取用户默认号码
            return window.prompt(jsonString('getLocalPhone ', ''));
        },		
			
    }
	//1.0.1
	if (window.prompt(jsonString('getVersionCode', '')) >= 6) {	
		window.activityInterface.setWebShareInfo = function (imageUrl, title, url, desc) { //设置活动页的分享信息		
            return window.webkit.messageHandlers.setWebShareInfo.postMessage({ "imageUrl": imageUrl, "title": title, "url": url, "desc": desc });
        }

        window.activityInterface.setHouDongCollectInfo = function (id, url, title, image) { //设置活动收藏信息
            return window.webkit.messageHandlers.setHouDongCollectInfo.postMessage({ "id": id, "url": url, "title": title, "image": image });
        }
	}
    //1.1.0
    if (window.prompt(jsonString('getVersionCode', '')) >= 7) {
        window.activityInterface.preventActGoBack = function (callbackfun) { //回退功能		
            return window.webkit.messageHandlers.preventActGoBack.postMessage(callbackfun);
        }

        window.activityInterface.goBack = function () {
            return window.webkit.messageHandlers.goBack.postMessage('');
        }
    }
    //1.2.0
    if (window.prompt(jsonString('getVersionCode', '')) >= 9) {
        window.activityInterface.saveMergeImage = function (text, textColor, imgUrl, textSize, x, y, callbackfun) { //文字与图片合成 分享 下载	
            return window.webkit.messageHandlers.saveMergeImage.postMessage({ "text": text, "textColor": textColor, "imgUrl": imgUrl, "textSize": textSize, "x": x, "y": y, "callback": callbackfun });
        }
		
		window.activityInterface.shareMergeImage = function (imgId, platformType, callbackfun) { //根据图片合成返回的imgId分享图片	
            return window.webkit.messageHandlers.shareMergeImage.postMessage({ "imgId": imgId, "platformType": platformType, "callback": callbackfun });
        }
		
		window.activityInterface.saveMergeImageLocalAlbum = function (imgId, platformType, callbackfun) { //根据图片合成返回的imgId分享图片	
            return window.webkit.messageHandlers.saveMergeImageLocalAlbum.postMessage({ "imgId": imgId, "platformType": platformType, "callback": callbackfun });
        }	
    }
    //1.3.0
    if (window.prompt(jsonString('getVersionCode', '')) >= 11) {
        window.activityInterface.goMedalManager = function (userid) { //跳转到勋章墙	
            return window.webkit.messageHandlers.goMedalManager.postMessage({ "userId": userid });
        }

        window.activityInterface.goMedalDetail = function (userid, medalId) { //跳转到勋章详情页
            return window.webkit.messageHandlers.goMedalDetail.postMessage({ "userId": userid, "medalId": medalId });
        }

        window.activityInterface.toPostReplyList = function (replyId) { //H5打开帖子详情，定位到回帖列表
            return window.webkit.messageHandlers.toPostReplyList.postMessage({ "replyId": replyId });
        }
    }
	
	//1.3.4
    if (window.prompt(jsonString('getVersionCode', '')) >= 13) {
        window.activityInterface.toChooseForumAndSendPost = function () { //打开发帖弹框 类似首页发布按钮	
            return window.webkit.messageHandlers.toChooseForumAndSendPost.postMessage('');
        }

        window.activityInterface.jumpWXLiveLink = function (userName,path) { //进入微信小程序
            return window.webkit.messageHandlers.jumpWXLiveLink.postMessage({ "userName": userName, "path": path });
        }
    }

	//1.3.5
    if (window.prompt(jsonString('getVersionCode', '')) >= 14) {
        window.activityInterface.getVideoAutoPlaySetting = function () { //获取视频播放设置中视频自动播放条件属性	返回值：all（任何网络下都自动播放）；wifi（仅WiFi下自动播放）；none（关闭自动播放）
            return window.prompt(jsonString('getVideoAutoPlaySetting',''));
        }
        window.activityInterface.selectLocalImage = function (maxImageNum,callbackfun) { //活动页选择相册图片
            return window.webkit.messageHandlers.selectLocalImage.postMessage({ "maxImageNum": maxImageNum, "callback": callbackfun });
        }
        window.activityInterface.toOpenCreationCenter = function () { //打开原创作中心发布入口
            return window.webkit.messageHandlers.toOpenCreationCenter.postMessage('');
        }
        window.activityInterface.toProduceCenterActivity = function (contentType) { //跳转到我的内容创作
            return window.webkit.messageHandlers.toProduceCenterActivity.postMessage({ "contentType": contentType });
        }
        window.activityInterface.toProduceDataActivity = function () { //跳转到创作数据分析页面
            return window.webkit.messageHandlers.toProduceDataActivity.postMessage('');
        }
        window.activityInterface.toKbCertHomeActivity = function () { //跳转到快爆认证页面
            return window.webkit.messageHandlers.toKbCertHomeActivity.postMessage('');
        }
        window.activityInterface.toForumReportActivity = function (reportType,reportId,callbackfun) { //h5跳转到论坛相关举报原生页面
            return window.webkit.messageHandlers.toForumReportActivity.postMessage({ "reportType": reportType,"reportId": reportId, "callback": callbackfun });
        }
        window.activityInterface.toForumReportActivity = function (reportType,reportId,callbackfun) { //h5跳转到论坛相关举报原生页面
            return window.webkit.messageHandlers.toForumReportActivity.postMessage({ "reportType": reportType,"reportId": reportId, "callback": callbackfun });
        }
        window.activityInterface.toOperateLikeNumberForPost = function (postId,currentLikeNumber,isAdd,callbackfun) { //同步帖子点赞状态到原生界面以及服务端
            return window.webkit.messageHandlers.toOperateLikeNumberForPost.postMessage({ "postId": postId,"currentLikeNumber": currentLikeNumber,"isAdd": isAdd, "callback": callbackfun });
        }
        window.activityInterface.toImagesActivity = function (imageUrl) { //浏览图片
            return window.webkit.messageHandlers.toImagesActivity.postMessage({ "imageUrl": imageUrl });
        }
    }
	
	
	//1.3.6
    if (window.prompt(jsonString('getVersionCode', '')) >= 15) {
        window.activityInterface.getShuMeiDeviceId = function () { //获取数美设备指纹id
            return window.prompt(jsonString('getShuMeiDeviceId',''));
        }
    }
	
	
	//1.3.9
    if (window.prompt(jsonString('getVersionCode', '')) >= 18) {
		window.activityInterface.getStatusBarHeight = function () { //返回值对应iOS机型状态栏高度
            return window.prompt(jsonString('getStatusBarHeight',''));
        }
        window.activityInterface.bigDataReport157101 = function (key,jsonContent) { //大数据上报（自定义内容）（对应安卓185）
            return window.webkit.messageHandlers.bigDataReport157101.postMessage({ "key": key, "jsonContent": jsonContent });
        }
		/**
		 * 跳转到厂商主页，同安卓117
		 * @param string fid 厂商ID
		 */
		window.activityInterface.toFactoryCenter = function (fid) {
            return window.webkit.messageHandlers.toFactoryCenter.postMessage({'fid':fid});
        }
    }
	
	//1.4.0
    if (window.prompt(jsonString('getVersionCode', '')) >= 19) {
        window.activityInterface.toHomeCommunityWhitTab = function (tabid) { //跳转到社区 定位到某个tab（对应安卓157）
            return window.webkit.messageHandlers.toHomeCommunityWhitTab.postMessage({ "tab": tabid});
        }  
		window.activityInterface.openWeChat = function () { //打开微信
            return window.webkit.messageHandlers.openWeChat.postMessage('');
        } 
		/**
		 * 游戏预约，同安卓60
		 * @param int type 可传但没有作用，兼容安卓传参
		 * @param boolean needPhone 可传但没有作用，兼容安卓传参
		 * @param string gid 游戏id
		 * @param string subTitle 预约成功弹框的副标题
		 * @param string wechatTip 预约成功弹框的微信设置提示文案
		 * @param string reminderTip 预约提醒弹框的提示文案
		 * @param int wifi 可传但没有作用，兼容安卓传参
		 * @param string successCallback 第一个参数是手机号码，第二个参数是手机号状态(-1:弹预约提醒弹窗，0:无手机号,1:已退订),第三个参数是是否开启了微信消息提醒(0:未开启,1:已开启)，第四个参数是微信昵称(为空表示没有绑定)（1.4.1版开始）
		 */
        window.activityInterface.appointment = function (type, needPhone, gid, subTitle, wechatTip, reminderTip, wifi, successCallback) {
			var data = {
				'sid':0,
				'gid':gid,
				'subTitle':subTitle,
				'wechatTip':wechatTip,
				'reminderTip':reminderTip,
				'sucessCallback':successCallback
			};
			return window.webkit.messageHandlers.apponitment.postMessage(data);
        }
    }

    //1.4.1
    if (window.prompt(jsonString('getVersionCode', '')) >= 20) {
        window.activityInterface.toGameDetailToTab = function (id,tabid) { //跳转到游戏详情页 定位到某个tab
            return window.webkit.messageHandlers.toGameDetailToTab.postMessage({ "id": id,"tab": tabid});
        }  
    }
	
	//1.4.2
    if (window.prompt(jsonString('getVersionCode', '')) >= 21) {
        window.activityInterface.isQQInstalled = function () { //是否安装QQ
            return window.prompt(jsonString('isQQInstalled ', ''));
        } 
		window.activityInterface.isWeiboAppInstalled = function () { //是否安装微博
            return window.prompt(jsonString('isWeiboAppInstalled ', ''));
        } 	
		window.activityInterface.isSupportWX = function () { //是否安装微信
            return window.prompt(jsonString('isSupportWX ', ''));
        }	
		window.activityInterface.toWelfareCenter = function () { //跳转到福利中心
            return window.webkit.messageHandlers.toWelfareCenter.postMessage('');
        } 		
    }

	//1.4.4
    if (window.prompt(jsonString('getVersionCode', '')) >= 22) {
        window.activityInterface.jumpQQLiveLink = function (miniAppID,miniPath) { //进入微信小程序
            return window.webkit.messageHandlers.jumpQQLiveLink.postMessage({ "miniAppID": miniAppID, "miniPath": miniPath });
        }
    }

	//1.4.5
	if(iosVersionCode>=23) {
		/**
		 * 获取指定key的缓存值，同安卓204
		 * @param string key 键值
		 * @return 返回指定Key的缓存值(字符串)，如果缓存中无对应Key的值时，将返回空对象
		 */
        window.activityInterface.getValue = function (key) {
			return window.prompt(jsonString('getValue', JSON.stringify({"key":key})));
        }
		/**
		 * 设置缓存，关闭APP失效，同安卓204
		 * @param string key 键值
		 * @param string value 缓存内容，如果缓存中已存在对应的 Key，新设置的 value 将会取代旧的value值。
		 */
        window.activityInterface.setValue = function (key, value) {
			return window.webkit.messageHandlers.setValue.postMessage({"key":key,"value":value});
        }
		/**
		 * 注入Js，同安卓203
		 * @param string url 需要注入的url
		 * @param string injectJsUrl 需要注入的js
		 * @param int version 用来更新Js的版本控制, 目前没用到
		 */
        window.activityInterface.injectJsToWebActivity = function (url, injectJsUrl, version) {
			return window.webkit.messageHandlers.injectJsToWebActivity.postMessage({"url":url,"injectJsUrl":injectJsUrl,"version":version});
        }
		/**
		 * 跳转到首页 定位到某个tab
		 * @param int tab 1=推荐;4=小游戏;7=热点;6=云游戏列表;8=找游戏
		 */
        window.activityInterface.toHomePageWhitTab = function (tab) {
			return window.webkit.messageHandlers.toHomePageWhitTab.postMessage({"tab":tab});
        }

		/**
		 * 复制文本，同安卓9
		 * @param string copyStr 复制的内容
		 * @param string text 自定义提示文案 ：已复制+自定义文案
		 */
        window.activityInterface.copyContentToClipboard = function (content, text) {
			if(!text) {
				text = "复制成功";
			}
			return window.webkit.messageHandlers.copyContentToClipboard.postMessage({"copyStr":content,"text":text});
        }

		/**
		 * 跳转帖子详情 定位回帖列表，同安卓138
		 * @param string id 帖子id
		 */
        window.activityInterface.toPostReplyList = function (id) {
			return window.webkit.messageHandlers.toPostDetaiLocationTabList.postMessage({"postId":id});
        }
	}

	//1.4.6
	if(iosVersionCode>=24) {
		/**
		 * 打开回帖编辑器，对应安卓4
		 * @param string option，参数需要传Json字符串，数组各个参数说明如下：
		 * string option.postId 帖子ID; 对应回复的帖子ID，必填
		 * string option.forumId 论坛ID; 帖子所在的论坛ID，必填
		 * int option.huodongId 活动ID;对应的活动ID，必填，147新增参数
		 * int option.postType 帖子的类型; 是否是问答帖，1：非问答帖；2：问答帖，必填
		 * int option.isEnableComment 回复弹窗权限是否被楼主关闭 默认 1：未关闭， 其它值：关闭，必填
		 * string option.callback 结果回调方法，选填
		 */
        window.activityInterface.startReplyEditor = function (option) {
			return window.webkit.messageHandlers.startReplyEditor.postMessage(JSON.parse(option));
        }

		/**
		 * 打开回复对话框，对应安卓5
		 * @param string option，参数需要传Json字符串，数组各个参数说明如下：
		 * string option.postId 帖子ID; 对应回复的帖子ID，必填
		 * string option.forumId 论坛ID; 帖子所在的论坛ID，必填
		 * string option.replyId 回复ID；对应帖子的回复ID，必填
		 * int option.huodongId 活动ID;对应的活动ID，必填，147新增参数
		 * string option.toReplyId 回复的回复ID；对应回复的回复ID，选填
		 * string option.replyContent 回复内容，必填
		 * string option.replyNickname 回复对方昵称，必填
		 * int option.isEnableComment 回复弹窗权限是否被楼主关闭 默认 1：未关闭， 其它值：关闭，必填
		 * string option.callback 结果回调方法，选填
		 */
        window.activityInterface.startReplyDialog = function (option) {
			return window.webkit.messageHandlers.startReplyDialog.postMessage(JSON.parse(option));
        }
	}

	//1.4.7
	if(iosVersionCode>=25) {
		/**
		 * 回帖点赞功能，对应安卓6
		 * @param string option，参数需要传Json字符串，数组各个参数说明如下：
		 * string option.isLike 点赞状态，当前是否已经点赞，必填
		 * string option.replyId 回帖id，选填
		 * int option.commentId 回复ID，选填
		 * int option.toCommentId 被回复的回复id，选填
		 * string option.callback 结果回调方法，选填
		 */
        window.activityInterface.actionReplyLikeClick = function (option) {
			return window.webkit.messageHandlers.actionReplyLikeClick.postMessage(JSON.parse(option));
        }
	}


    window.userInterface = {
        isLogin: function () {//1.判断是否登陆
            return window.prompt(jsonString('isLogin', ''))==1 ? true : false;
        },
        login: function () { //2.去登陆接口
            return window.webkit.messageHandlers.login.postMessage('');
        },      
        getUserInfo: function () { //3.获取用户信息
            return window.prompt(jsonString('getUserInfo', ''));
        },
    }


    window.protocolInterface = {
        setBarTitle: function (title) { //设置导航栏标题
            return window.webkit.messageHandlers.setBarTitle.postMessage(title);
        },
        closeWindow: function () { //关闭当前页面
            return window.webkit.messageHandlers.closeWindow.postMessage('');
        },
        preventGoBack: function (callbackfun) { //阻止当前页面后退
            return window.webkit.messageHandlers.preventGoBack.postMessage({"jsFunctionName": callbackfun });
        },
        passExam: function () { //通过礼仪考试
            return window.webkit.messageHandlers.passExam.postMessage('');
        },
        iconVisibility: function (isHidden) { //是否隐藏后退图标
            return window.webkit.messageHandlers.iconVisibility.postMessage(isHidden);
        },
        passIllegalExam: function () { //通过违规考试
            return window.webkit.messageHandlers.passIllegalExam.postMessage('');
        },
    }
}

function jsonString(clientName, cont) {
    return JSON.stringify({ "function": clientName, "params": cont })
}



