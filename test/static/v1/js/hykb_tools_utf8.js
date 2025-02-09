var hykb_tools = {
    ua: window.navigator.userAgent,
    is_yuanshen_tool: false, /* 原神地图工具悬浮窗 */
    is_strategy_tool: false, /* 攻略站悬浮窗 */
    is_android_kb: false, /* 安卓好游快爆快爆 */
    is_ios_kb: false, /* IOS好游快爆快爆 */
    is_kb: false, /* 好游快爆 */
    is_android: false, /* 安卓浏览器 */
    is_ios: false, /* IOS浏览器 */
    is_wechat: false, /* 微信浏览器 */
    is_qq: false, /* QQ浏览器 */
    ajax_lock_list: {}, /* ajax请求锁 */
    init: function () { /* 初始化 */
        this.is_yuanshen_tool = /@4399_sykb_android_activity@;yuanshen_tool/i.test(this.ua);
        this.is_strategy_tool = /@yuanshen_tool/i.test(this.ua);
        this.is_android_kb = /@4399_sykb_android_activity@/i.test(this.ua) && !this.is_yuanshen_tool;
        this.is_ios_kb = /Ioskb/i.test(this.ua);
        this.is_kb = this.is_android_kb || this.is_ios_kb;
        this.is_android = /Android/i.test(this.ua);
        this.is_ios = /iphone|ipad|ipod|macintosh/i.test(this.ua);
        this.is_wechat = /MicroMessenger/i.test(this.ua);
        this.is_qq = /qq/i.test(this.ua);
    },
    is_login: function () { /* 是否登录好游快爆 */
        return typeof window.userInterface == 'object' && typeof window.userInterface.isLogin == 'function' && window.userInterface.isLogin();
    },
    get_user_info: function () { /* 获取快爆用户信息 */
        var userInfo = {};
        if (this.is_login()) {
            userInfo = window.userInterface.getUserInfo();
            userInfo = JSON.parse(userInfo);
        }
        return userInfo;
    },
    get_scookie: function () { /* 获取快爆scookie信息 */
        var userInfo = this.get_user_info();
        return userInfo.scookie ? userInfo.scookie : '';
    },
    wap_share: function (opt) { /* 快爆外部浏览器分享 */
        var conf = {
            'share_btn_id': '#share_btn',
            'share_title': '分享标题',
            'share_desc': '分享描述',
            'share_img': 'https://img.71acg.net/kbyx~sykb/20201026/19493669887',
            'share_type': 'all',
            'share_url': window.location.href,
            'callback': null
        };

        conf = $.extend({}, conf, opt);
        conf.share_url = this.get_share_url(conf.share_url);

        var $share_btn = $(conf.share_btn_id);
        if ($share_btn.length) {
            if (typeof window.activityInterface == 'object' && typeof window.activityInterface.wapShare == 'function') { //快爆内部
                $share_btn.click(function () {
                    if (conf.share_url.indexOf('?') == -1) { //解决快爆内部QQ分享url无法访问的问题
                        conf.share_url += '?from=hykb';
                    }
                    window.activityInterface.wapShare(conf.share_img, conf.share_url, conf.share_title, conf.share_desc, conf.share_type, conf.callback);
                    return false;
                });
            } else { //快爆外部
                $share_btn.attr('data-role', 'share');
                $share_btn.attr('data-share-url', conf.share_url);
                $share_btn.attr('data-share-img', conf.share_img);
                $share_btn.attr('data-share-title', conf.share_title);
                $share_btn.attr('data-share-description', conf.share_desc);
                document.write('<script type="text/javascript" src="https://f2.3839img.com/etweixin/v2/js/jshare_e1.js"><\/script>');
            }
        }
    },
    new_wap_share: function (opt) { /* 新版分享 */
        var conf = {
            'share_btn_id': '#share_btn',
            'share_tip': '如果觉得好用，记得分享给好友，一起来使用吧！',
            'share_guide_txt': '', //引导文案
            'share_title': '分享标题',
            'share_desc': '分享描述',
            'share_img': 'https://img.71acg.net/kbyx~sykb/20201026/19493669887',
            'share_url': window.location.href,
            'callback': null
        };

        conf = $.extend({}, conf, opt);
        conf.share_url = this.get_share_url(conf.share_url);

        var $share_btn = $(conf.share_btn_id);
        if ($share_btn.length) {
            if (typeof window.activityInterface == 'object' && typeof window.activityInterface.wapShare == 'function') { //快爆内部
                $share_btn.click(function () {
                    if ($('.mod-pop-share').length == 0) {
                        var str = '' +
                            '<div class="tool-comm-share">' +
                            '    <div class="mod-pop-share">' +
                            '        <a class="mod-pop-hide" href="#">关闭</a>' +
                            '        <div class="pcon">' +
                            '            <div class="txt1"><span>' + conf.share_tip + '</span></div>' +
                            (conf.share_guide_txt ? '<div class="mt20 tac">' + conf.share_guide_txt + '</div>' : '') +
                            '            <ul class="shareitem">' +
                            '                <li><span class="qq" data-type="qq"></span>QQ好友</li>' +
                            '                <li><span class="wx" data-type="weixin"></span>微信好友</li>' +
                            '                <li><span class="kj" data-type="qzone"></span>QQ空间</li>' +
                            '                <li><span class="quan" data-type="pengyouquan"></span>朋友圈</li>' +
                            '                <li><span class="wb" data-type="weibo"></span>新浪微博</li>' +
                            '                <li><span class="fz" data-type="copyurl"></span>复制</li>' +
                            '            </ul>' +
                            '        </div>' +
                            '    </div>' +
                            '    <div class="mask"></div>' +
                            '</div>';

                        $('head').append('<link href="https://f2.3839img.com/static/hykbTool/share/css/style.css?v1" type="text/css" rel="stylesheet">');
                        $('body').append(str);
                    } else {
                        $('.mod-pop-share').show();
                        $('.tool-comm-share .mask').show();
                    }
                    return false;
                });

                if (conf.share_url.indexOf('?') == -1) { //解决快爆内部QQ分享url无法访问的问题
                    conf.share_url += '?from=hykb';
                }

                //关闭分享
                $(document).on('click', '.mod-pop-hide, .tool-comm-share .mask', function () {
                    $(".mod-pop-share").hide();
                    $('.tool-comm-share .mask').hide();
                    return false;
                });

                //点击分享
                $(document).on('click', '.mod-pop-share .shareitem li', function () {
                    var share_type = $(this).find('span').data('type');
                    if (share_type == 'copyurl') { //由于IOS快爆分享复制有bug，故用此方法
                        window.activityInterface.copyContentToClipboard(conf.share_url);
                        var callback = eval(conf.callback);
                        typeof callback == 'function' && callback('copyurl_share_success');
                    } else {
                        window.activityInterface.wapShare(conf.share_img, conf.share_url, conf.share_title, conf.share_desc, share_type, conf.callback);
                    }
                    return false;
                });
            } else { //快爆外部
                $share_btn.attr('data-role', 'share');
                $share_btn.attr('data-share-url', conf.share_url);
                $share_btn.attr('data-share-img', conf.share_img);
                $share_btn.attr('data-share-title', conf.share_title);
                $share_btn.attr('data-share-description', conf.share_desc);
                document.write('<script type="text/javascript" src="https://f2.3839img.com/etweixin/v2/js/jshare_e1.js"><\/script>');
            }
        }
    },
    big_data_report: function (tool_id) { /* 大数据上报 */
        if (typeof window.activityInterface == 'object' && typeof window.activityInterface.bigDataReport == 'function') {
            window.activityInterface.bigDataReport('enter_tooldetail', '', '', '', '', '', '', '工具详情页', '', '工具详情页-浏览-' + tool_id, 1);
        }
    },
    open_floating_btn: function (title) { /* 打开悬浮窗 */
        if (typeof window.activityInterface == 'object' && typeof window.activityInterface.openFloatingBtn == 'function') {
            var url = 'strategytool://open?url=' + encodeURIComponent(window.location.href) + '&gj_title=' + title;
            window.activityInterface.openFloatingBtn(url);
        }
    },
    get_share_url: function (url) { /* 获取快爆外部分享地址 */
        return url.replace(/www\.onebiji\.com/, 'www.guoping123.com');
    },
    get_strategy_float_url: function (url) { /* 获取攻略站悬浮窗地址 */
        return url.replace('m.3839.com/baoliao', 'm.3839.com/kuaibao') + '?1';
    },
    check_url: function (url) { /* 检查快爆外部地址 */
        return /\/\/[a-z0-9\.]*(3839|onebiji|yxhhdl|guoping123)\.com/i.test(url);
    },
    check_mobile: function (mobile) { /* 检查手机号 */
        return /^1([3-9])\d{9}$/.test(mobile);
    },
    jsonString: function (clientName, cont) {
        return JSON.stringify({"function": clientName, "params": cont});
    },
    record_query_switch_component: function (conf) { /* 战绩查询切换组件 */
        if (typeof window.activityInterface == 'object' && typeof window.activityInterface.setWebShareInfo == 'function') {
            if (this.is_android_kb && window.activityInterface.getVersionCode() >= 351) {
                conf = JSON.stringify(conf);
                window.activityInterface.setWebShareInfo(conf);
            }
        }
    },
    check_video_autoplay: function () { /* 检查视频自动播放 */
        var is_autoplay = false; //默认不自动播放
        if (typeof window.activityInterface == 'object' && typeof window.activityInterface.getVideoAutoPlaySetting == 'function') {
            var result = window.activityInterface.getVideoAutoPlaySetting(); //返回值：all（任何网络下都自动播放）；wifi（仅WiFi下自动播放）；none（关闭自动播放）
            if (result == 'all') {
                is_autoplay = true;
            } else if (result == 'wifi') {
                if (typeof window.activityInterface == 'object' && typeof window.activityInterface.isWifi == 'function') {
                    var is_wifi = window.activityInterface.isWifi();
                    if (is_wifi == true || is_wifi == "1") {
                        is_autoplay = true;
                    }
                }
            }
        } else if (!hykb_tools.is_kb) { //非快爆浏览器
            if (!hykb_tools.is_wechat) { //非微信浏览器
                is_autoplay = true;
            }
        }

        var android_version = this.get_android_version();
        if (hykb_tools.is_android && android_version && android_version <= 6) { //小于等于安卓6不自动播放
            is_autoplay = false;
        }

        return is_autoplay;
    },
    get_android_version: function () { /* 获取安卓版本号 */
        var ua = navigator.userAgent.toLowerCase();
        var version = null;
        if (ua.indexOf("android") > 0) {
            var reg = /android [\d._]+/gi;
            var v_info = ua.match(reg);
            version = (v_info + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, "."); //得到版本号4.2.2
            version = parseInt(version.split('.')[0]);// 得到版本号第一位
        }

        return version;
    },
    get_query_string: function (name) { /* 获取url参数 */
        var search = window.location.search;
        if (search == '') {
            return '';
        }

        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = search.substr(1).match(reg);
        if (r != null && r[2] !== '') {
            return decodeURIComponent(r[2]);
        }

        return '';
    },
    load_script: function (url, callback) { /* 加载js */
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    if (typeof callback == 'function') {
                        callback();
                    }
                }
            };
        } else {
            script.onload = function () {
                if (typeof callback == 'function') {
                    callback();
                }
            };
        }
        document.head.appendChild(script);
    },
    check_dialog_func_exists: function (callback) { /* 检查弹窗函数是否存在 */
        if (typeof kb_dialog != 'object' || typeof kb_dialog.open != 'function') {
            this.load_script('https://res.3839pic.com/kuaibao/js/kb_dialog.js', function () {
                typeof callback == 'function' && callback();
            });
        } else {
            typeof callback == 'function' && callback();
        }
    },
    come_back_next_time: function (key, dialog_type) { /* 下次如何回来 */
        var _this = this;
        _this.check_dialog_func_exists(function () {
            key = key || 'kbtool';
            key += '_come_back_next_time';
            if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.preventActGoBack) == "function" && localStorage.getItem(key) != 1) {
                window.activityInterface.preventActGoBack("preventActGoBackCallback");
                window.preventActGoBackCallback = function () {
                    dialog_type = dialog_type || 'center';
                    kb_dialog.open({id: 'kbtool_come_back_next_dlg', type: dialog_type});
                }
            }

            $('#kbtool_know_come_back_next').unbind('click').bind('click', function () {
                kb_dialog.close();
                if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.goBack) == "function") {
                    window.activityInterface.preventActGoBack('');
                    window.activityInterface.goBack();
                }
                return false;
            });

            $('#kbtool_no_remind_next').unbind('click').bind('click', function () {
                if ($(this).is(':checked')) {
                    localStorage.setItem(key, 1);
                } else {
                    localStorage.setItem(key, 0);
                }
            });
        });
    },
    ajax_request: function (opt) { /* ajax请求 */
        var _this = this;
        var conf = {
            url: 'ajax.php',
            type: 'POST',
            data: {},
            dataType: 'json',
            success: null,
            error: null,
            lock_key: 'lock_key'
        };

        conf = $.extend({}, conf, opt);
        if (conf.lock_key) {
            if (_this.ajax_lock_list[conf.lock_key]) {
                return false;
            }

            _this.ajax_lock_list[conf.lock_key] = true;
        }

        var scookie = _this.get_scookie();
        if (scookie) {
            conf.data.scookie = scookie;
        }

        var deviceId = _this.get_device_id();
        if (deviceId) {
            conf.data.deviceId = deviceId;
        }

        $.ajax({
            type: conf.type,
            url: conf.url,
            data: conf.data,
            dataType: conf.dataType,
            success: function (resp) {
                if (conf.lock_key) {
                    _this.ajax_lock_list[conf.lock_key] = false;
                }

                typeof conf.success == 'function' && conf.success(resp);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (conf.lock_key) {
                    _this.ajax_lock_list[conf.lock_key] = false;
                }

                typeof conf.error == 'function' && conf.error(jqXHR, textStatus, errorThrown);
            }
        });
    },
    get_device_id: function () { /* 获取设备id */
        var deviceId = '';
        if (typeof window.activityInterface == 'object') {
            if (typeof window.activityInterface.getUniqueDeviceIdNew == 'function') {
                deviceId = window.activityInterface.getUniqueDeviceIdNew();
            } else if (typeof window.activityInterface.getUniqueDeviceId == 'function') {
                deviceId = window.activityInterface.getUniqueDeviceId();
            }
        }
        return deviceId;
    }
};

hykb_tools.init();

//适配不同类型的链接跳转到快爆原生页
(function () {
    if (hykb_tools.is_kb) {
        $(document).on('click', 'a[data-type]', function () {
            if (typeof window.activityInterface == 'object') {
                var _this = $(this),
                    type = _this.data('type'),
                    id = _this.data('id') || '',
                    href = _this.attr('href') || '';

                if (id) { //解决安卓低版本将数字转成科学计数法
                    id = id.toString();
                }

                if (type == 'arc') { //文章页
                    window.activityInterface.toArticleDetail(id, "");
                    return false;
                } else if (type == 'list') { //文章列表页
                    if (_this.data('ext')) { //图鉴类或者关卡
                        window.activityInterface.toArticleSortList(id, "", 0 | _this.data('ext'));
                    } else { //普通列表
                        window.activityInterface.toArticleList(id, "");
                    }
                    return false;
                } else if (type == 'video') { //视频播放页
                    window.activityInterface.toVideoDetail(id, "");
                    return false;
                } else if (type == 'video_list') { //视频列表页
                    var tid = _this.data('tid') || '';
                    window.activityInterface.toVideoSortList(id, "", tid.toString());
                    return false;
                } else if (type == 'game') { //游戏详情页
                    window.activityInterface.toGameDetail(id, "");
                    return false;
                } else if (type == 'yunwan_game') { //云玩游戏详情页
                    window.activityInterface.toYunWanGameDetail(id);
                    return false;
                } else if (type == 'kuaiwan_game') { //快玩游戏详情页
                    window.activityInterface.toKuaiWanGameDetail(id);
                    return false;
                } else if (type == 'person') { //个人主页
                    window.activityInterface.toPersonCenter(id);
                    return false;
                } else if (type == 'tool' || type == 'hd') {
                    var share_data = {};
                    share_data['title'] = _this.data('title');
                    share_data['icon'] = _this.data('icon');
                    share_data['link'] = _this.data('link');
                    share_data['desc'] = _this.data('desc');
                    var json_str = JSON.stringify(share_data);
                    if (type == 'tool') { //工具详情页
                        window.activityInterface.toToolDetailWaps(href, "", json_str);
                    } else { //活动页
                        window.activityInterface.toActivityWaps(href, "", json_str);
                    }
                    return false;
                } else if (type == 'search') { //打开搜索页
                    var forum_id = $(this).data('forum_id');
                    if (forum_id && typeof window.activityInterface.toSearchPostWithForumId == 'function') { //纯搜索帖子
                        window.activityInterface.toSearchPostWithForumId('', forum_id.toString());
                    } else if (typeof window.activityInterface.toSearchNewsAndVideo == 'function') { //只能搜索文章和视频
                        window.activityInterface.toSearchNewsAndVideo('', 0);
                    } else { //只能搜索游戏和用户
                        window.activityInterface.toMainSearch();
                    }
                    return false;
                } else if (type == 'tool_list') { //工具箱列表页
                    window.activityInterface.toToolsList();
                    return false;
                } else if (type == 'forum_list') { //论坛列表页
                    var theme_id = _this.data('theme_id');
                    if (theme_id && typeof window.activityInterface.toForumPostListByTheme == 'function') { //主题id到具体的帖子列表的页面(v1.5.6.6及以上使用)
                        window.activityInterface.toForumPostListByTheme(id, theme_id.toString());
                    } else if (typeof window.activityInterface.toForumDetail == 'function') {
                        var pname = _this.data('pname') || '',
                            cname = _this.data('cname') || '';
                        if ((hykb_tools.is_android_kb && window.activityInterface.getVersionCode() > 214) || hykb_tools.is_ios_kb) { //安卓快爆从v1.5.4.9版本开始，ios快爆任意版本
                            if (hykb_tools.is_android_kb && (pname == '攻略站' || pname == '爆料站')) { //ios快爆传strategy会定位不到攻略站，所以必须传中文
                                pname = 'strategy';
                            }
                            window.activityInterface.toForumDetail(id, pname, cname);
                        } else {
                            window.activityInterface.toForumDetail(id);
                        }
                    }
                    return false;
                } else if (type == 'forum_detail') { //帖子详情页
                    if (typeof window.activityInterface.toForumPostDetail == 'function') {
                        window.activityInterface.toForumPostDetail(id);
                    }
                    return false;
                } else if (type == 'video_full') { //播放视频（全屏播放）
                    var url = _this.data('url') || '';
                    window.activityInterface.openVideoFullScreen();
                    return false;
                } else if (type == 'wap') { //任意wap页面
                    var title = _this.data('title') || '';
                    window.activityInterface.toActivityWaps(href, title, '');
                    return false;
                } else if (type == 'reply_detail') { //评价
                    if (typeof window.activityInterface.toReplyDetailActity == 'function') {
                        var pid = _this.data('pid'),
                            fid = _this.data('fid'),
                            cid = _this.data('cid');
                        window.activityInterface.toReplyDetailActity(pid, fid, cid);
                    }
                    return false;
                }
            }
        });
    }
})();