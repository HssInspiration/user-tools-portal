var DETAIL_URL = '/user-tools-portal/test/detail.html?';
var ACT = {
    //**************************函数的一些标志，跟公用变量**************************************
    dialog: '',
    // ajaxPath: "ajax.php",
    ajaxPath: "http://localhost:8088/json/ajax.json",
    reflash: false,
    reg: Tools.filterReg(),
    c: {'loginStatus': 103},
    shuoming_key: 'sjzxd_gaiqiang_shuoming',
    record_key: 'sjzxd_gaiqiang_record',
    enterGaiZhuangPeijian: 0,
    //***************************功能函数，用于实现每个函数**************************************
    //弹窗
    _dialog: function (id, close_fun) {
        var _this = this;
        if (_this.dialog) {
            _this.dialog.close();
            _this.dialog = '';
        }
        _this.dialog = Tools.dialog({
            id: id, close_id: "." + id + "_close", close_fun: function () {
                if (typeof close_fun == "function") {
                    close_fun();
                }
            }
        });
    },
    _check: function () {
        var _this = this;
        if (!Verify.checkPlatform(1)) {
            return false;
        }
        if (!Verify.checkLogin()) {
            return false;
        }
        if (!Verify.otherPlaceLogin()) {
            return false;
        }
        return true;
    },
    toastMsg: function (msg) {
        if (typeof (window.activityInterface) == "object" && typeof window.activityInterface.showToast == 'function') {
            window.activityInterface.showToast(msg);
        } else {
            alert(msg);
        }
    },
    showToast: function (msg, time) {
        time = time || 2000;
        $('#dia_toast_msg').html(msg).show()
        setTimeout(function () {
            $('#dia_toast_msg').hide()
        }, time);
    },
    AjaxDialog: function (msg) {
        if (typeof msg == 'undefined' || !msg) return false;
        if (msg['key'] == 'no_login') {
            ACT.toastMsg('你还未登录，请先登录');
            return false;
        } else if (msg['key'] == 'otherPlaceLogin') {
            ACT._dialog('dialog_other_place_login');
            return false;
        }
        return true;
    },
    checkShareCode: function (str) {
        let regex = /^[^\-]+\-[^-]+\-[^\-]+$/;
        return regex.test(str);
    },
    formatPrice: function (num) {
        let str = num.toString();
        let result = "";
        while (str.length > 3) {
            result = "," + str.slice(-3) + result;
            str = str.slice(0, str.length - 3);
        }
        if (str) {
            result = str + result;
        }
        return result;
    },
    //******************************************* 活动JS *******************************************//

    quit: function () {
        window.activityInterface.preventActGoBack('');
        window.activityInterface.goBack();
    },
    confirm_quit: function () {
        if ($.cookie(ACT.record_key)) {
            ACT._dialog("dialog_back_queren");
            return false;
        } else {
            window.activityInterface.preventActGoBack('');
            window.activityInterface.goBack();
            return false;
            //ACT.quit();
        }
    },
    goback: function () {
        if (!Verify.checkPlatform(0)) {
            return false;
        }
        ACT.enterGaiZhuangPeijian = 0;
        window.activityInterface.preventActGoBack('');
        window.activityInterface.goBack();
        return false;
    },
    decrNum: function ($o) {
        var n = $.trim($o.text());
        if (!/^\d+$/.test(n)) n = 0;
        n = n - 0 - 1;
        n = n < 0 ? 0 : n;
        $o.text(n);
    },
    incrNum: function ($o) {
        var n = $.trim($o.text());
        if (!/^\d+$/.test(n)) n = 0;
        n = n - 0 + 1;
        $o.text(n);
    },
    toIndexPage: function (is_finish) {
        is_finish = is_finish || 0;
        if (is_finish && typeof (window.activityInterface) == 'object' && typeof (window.activityInterface.finishActivity) == "function") window.activityInterface.finishActivity();
        // Verify._JumpUrl(INDEX_URL, '三角洲行动快爆改枪台');
        window.activityInterface.toToolDetailWaps(INDEX_URL, "三角洲行动快爆改枪台", "");
    },
    toGaiPage: function (is_finish, urlparam) {
        if (!ACT._check()) return false;
        is_finish = is_finish || 0;
        urlparam = urlparam || '';
        if (is_finish && typeof (window.activityInterface) == 'object' && typeof (window.activityInterface.finishActivity) == "function") window.activityInterface.finishActivity();
        ACT.to_gai = 0;
        // Verify._JumpUrl(GAI_URL + (GAI_URL.indexOf('?') == -1 ? '?' : '&') + urlparam, '三角洲行动快爆改枪台');
        window.activityInterface.toToolDetailWaps(GAI_URL + (GAI_URL.indexOf('?') == -1 ? '?' : '&') + urlparam, '三角洲行动快爆改枪台', "");
    },
    toDetailPage: function (id, is_finish) {
        // if (!ACT._check()) return false;
        is_finish = is_finish || 0;
        if (is_finish && typeof (window.activityInterface) == 'object' && typeof (window.activityInterface.finishActivity) == "function") window.activityInterface.finishActivity();
        Verify._JumpUrl(DETAIL_URL + (DETAIL_URL.indexOf('?') == -1 ? '?' : '&') + 'id=' + id, '三角洲行动快爆改枪台');
        // window.activityInterface.toToolDetailWaps(DETAIL_URL + (DETAIL_URL.indexOf('?') == -1 ? '?' : '&') + 'id=' + id, '三角洲行动快爆改枪台', "");
    },
    toMyPage: function (is_finish) {
        if (!ACT._check()) return false;
        is_finish = is_finish || 0;
        if (is_finish && typeof (window.activityInterface) == 'object' && typeof (window.activityInterface.finishActivity) == "function") window.activityInterface.finishActivity();
        // Verify._JumpUrl(MY_URL, '三角洲行动快爆改枪台');
        window.activityInterface.toToolDetailWaps(MY_URL, '三角洲行动快爆改枪台', "");
    },
    Copy: function (id) {
        if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.copyContentToClipboard) == "function") {
            var data = $("#" + id).text();
            window.activityInterface.copyContentToClipboard(data);
        } else {
            text = $("#" + id).text();
            window.prompt("你的浏览器不支持此复制功能,请直接长按进行复制", text);
        }
    },
    CopyData: function (data) {
        if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.copyContentToClipboard) == "function") {
            window.activityInterface.copyContentToClipboard(data);
        } else {
            window.prompt("你的浏览器不支持此复制功能,请直接长按进行复制", data);
        }
    },
    imgToBase64: function (img_url) {
        img_url = img_url.replace('https://img.71acg.net', '//img.71acg.net');
        return img_url.replace('//img.71acg.net', _img_dm);
    },
    login: function (param) {
        var _this = this;
        if (!Client.env.isClient) {
            return false;
        }
        param = param || {};
        data = param;
        data.ac = "login";
        data.r = Math.random();
        Client.get(_this.ajaxPath, data, function (msg) {
            _this.c = msg;
            //未登陆
            if (msg['loginStatus'] == "103") {
                return false;
            }
            if (msg['loginStatus'] == "104") {
                ACT._dialog("dialog_other_place_login");
                return false;
            }
            if (msg['loginStatus'] == "100") {
                $("img.user_avatar").attr('src', msg['avatar']);
                $(".user_info_name").html(msg['nickname']);
                if (!is_empty(data['page']) && data['page'] == 'detail') {
                    PAGE.getFriendRelation();
                }
                if (!is_empty(msg['zaned'])) {
                    $('.zan[data-id]').addClass('on');
                }
                if (!is_empty(msg['collected'])) {
                    $('.collect[data-id]').addClass('on');
                }
            }
            return false;
        });
        return _this;
    },
    clearRecord: function () {
        $.cookie(ACT.record_key, '', {expires: 1});
    },
    loadRecord: function () {
        ACT.toGaiPage(0, 'getRecord=1');
    },
    //保存图片
    saveShareImg: function () {
        var _this = this;
        if (!Client.env.isClient) {
            return false;
        }
        if (!ACT.share_image_src64) {
            window.activityInterface.showToast("图片错误~");
            return false;
        }
        if (Client.env.platform == "android") {
            if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.saveMergeImageLocalAlbum) == "function") {
                window.activityInterface.saveMergeImageLocalAlbum("", "", ACT.share_image_src64, 0, 0, 0, "savecallback");
            } else {
                //需要升级
                _this._dialog("dialog_version");
            }
        } else {
            if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.saveMergeImage) == "function") {
                window.activityInterface.saveMergeImage("", "", ACT.share_image_src64, 0, 0, 0, "savecallback");
            } else {
                //需要升级
                _this._dialog("dialog_version");
            }
        }
        //回调操作
        window.savecallback = function (imgId) {
            console.log(imgId);
            if (imgId.indexOf('错误') === -1 && imgId.indexOf('失败') === -1) {
                window.activityInterface.showToast("图片保存成功");
            } else {
                window.activityInterface.showToast("啊哦-保存失败，请爆友检查文件权限是否开启");
            }
        }
        return false;
    },
    //分享图
    ShareOnlyPic: function (mode) {
        var _this = this;
        if (!Client.env.isClient) {
            return false;
        }
        if (!ACT.share_image_src64) {
            window.activityInterface.showToast('分享图片未生成');
            return false;
        }
        if (mode == "weibo") {
            var packageName = "com.sina.weibo";
            var packmsg = "请先安装微博客户端";
            var checkInstalled = window.activityInterface.checkInstalled(packageName);
        } else if (mode == "weixin" || mode == "pengyouquan") {
            var packageName = "com.tencent.mm";
            var packmsg = "请先安装微信客户端";
            var checkInstalled = window.activityInterface.checkInstalled(packageName);
        } else {
            var packmsg = "请先安装客户端";
            var checkInstalled = true;
        }
        if (checkInstalled == false) {
            window.activityInterface.showToast(packmsg);
            return false;
        }
        if (Client.env.platform == "android") {
            _this.ShareOnlyPicAnd(mode)
        } else {
            _this.ShareOnlyPicIos(mode)
        }
        return false;
    },
    ShareOnlyPicAnd: function (mode) {
        var _this = this;
        var shareBigPic = ACT.share_image_src64;
        if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.wapShareOnlyPicDelOriginalPic) == "function") {
            if (mode == "weixin" || mode == "pengyouquan") {
                window.activityInterface.wapShareOnlyPicDelOriginalPic(shareBigPic, mode, null);
            } else {
                window.activityInterface.wapShareOnlyPicDelOriginalPic(shareBigPic, mode, "shareback");
            }
        } else if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.wapShareOnlyPic) == "function") {
            if (mode == "weixin" || mode == "pengyouquan") {
                window.activityInterface.wapShareOnlyPic(shareBigPic, mode, null);
            } else {
                window.activityInterface.wapShareOnlyPic(shareBigPic, mode, "shareback");
            }
        } else {
            _this._dialog("dialog_version");
            return false;
        }
        //回调操作
        window.shareback = function (flag) {
            if (flag.indexOf("success") >= 0) {
                //分享成功
                window.activityInterface.showToast("分享成功");
            }
        }
    },
    ShareOnlyPicIos: function (mode) {
        var _this = this;
        if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.saveMergeImage) == "function") {
            window.activityInterface.saveMergeImage("", "", ACT.share_image_src64, 0, 0, 0, "savecallback");
        } else {
            //需要升级
            _this._dialog("dialog_version");
        }
        //回调操作
        window.savecallback = function (imgId) {
            console.log(imgId);
            if (imgId.indexOf('错误') === -1 && imgId.indexOf('失败') === -1) {
                if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.shareMergeImage) == "function") {
                    window.activityInterface.shareMergeImage(imgId, mode, "shareback");
                }
            } else {
                window.activityInterface.showToast("啊哦-保存失败，请爆友检查文件权限是否开启");
            }
        }
        window.shareback = function (flag) {
            if (flag.indexOf("success") >= 0) {
                //分享成功
                window.activityInterface.showToast("分享成功");
            }
        }
    },
    //去个人中心
    toPersonCenter: function (uid) {
        var _this = this;
        if (!Verify.checkPlatform(1)) {
            return false;
        }
        if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.toPersonCenter) == "function") {
            window.activityInterface.toPersonCenter(uid);
        } else {
            _this._dialog("dialog_version");
        }
        return false;
    },
    //前往其他活动
    FlyOtherUrl: function (url, title) {
        var _this = this;
        //if (!Verify.checkAll()) { return false; }
        if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.toActivityWaps) == "function") {
            window.activityInterface.toActivityWaps(url, title, "");
        } else {
            window.location = url;
        }
        return false;
    },
    //去论坛
    GoLuntan: function (id) {
        if (typeof window.activityInterface.toForumDetail == 'function') {
            window.activityInterface.toForumDetail(id);
        } else {
            ACT._dialog('dialog_version');
        }
        return false;
    },
    //跳转论坛
    toForumDetail: function (id, pname, cname) {
        if (typeof window.activityInterface == 'object' && typeof window.activityInterface.toForumDetail == 'function') {
            var pname = pname || '',
                cname = cname || '';
            if (pname && (Client.env.platform == "android" && window.activityInterface.getVersionCode() > 214 || Client.env.platform == "ios")) { //从v1.5.4.9版本开始
                window.activityInterface.toForumDetail(id, pname, cname);
            } else {
                window.activityInterface.toForumDetail(id);
            }
        } else {
            window.location = "https://m.bbs.3839.com/forum-" + id + ".htm";
        }
    },
    // 保存文件函数
    saveFile: function (base64str) {
        var link = document.createElement("a");
        link.setAttribute("href", base64str);
        link.setAttribute("download", "image.jpg"); // 设定下载文件的名称
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },
    toToolsList: function (is_finish) {//工具箱列表页
        if (!Client.env.isClient) return false;
        is_finish = is_finish || 0;
        if (is_finish && typeof (window.activityInterface) == 'object' && typeof (window.activityInterface.finishActivity) == "function") window.activityInterface.finishActivity();
        window.activityInterface.toToolsList();
    },
    //****************************************** 私有函数，权限类里面调用 ******************************************
    to_gai: 0,
    srip_douhao_toarr: function (str) {
        return str.replace(/^,|,$/g, "").split(',');
    },
    share_image_src64: '',
    checkLen: function ($o, maxChars) {
        maxChars = maxChars || 100;
        var str = $.trim($o.val());
        if (str.length > maxChars) {
            str = str.substring(0, maxChars);
            $o.val(str);
        }
        $o.siblings('span.num').text(str.length.toString() + '/' + maxChars);
    },
    formateToNum: function (value) {
        if (value.indexOf('*') !== -1) value = eval(value);
        return value;
    },
    getAttrPercent: function (value, attr_id) {
        var percent = (value / ACT.ATTR_CONF[attr_id]['max']) * 100;
        if (percent > 100) percent = 100;
        return Math.ceil(percent);
    },
    ATTR_CONF: {
        1: {'title': '基础伤害', 'title2': '基础伤害', 'max': 100}
        , 4: {'title': '操控速度', 'title2': '操控速度', 'max': 100}
        , 2: {'title': '优势射程', 'title2': '优势射程', 'max': 150}
        , 5: {'title': '据枪稳定性', 'title2': '据枪稳定', 'max': 100}
        , 3: {'title': '后坐力控制', 'title2': '后座控制', 'max': 100}
        , 6: {'title': '腰际射击精度', 'title2': '腰射精度', 'max': 100}
    },
    getPeijianEffect: function ($o, peijian) {
        if (is_empty(peijian['attr_data'])) return '';
        if ($o.find('.effer').length) {
            $o.find('.effer').show();
            return false;
        }
        var str = '';
        $.each(peijian['attr_data'], function (k, v) {
            var class_str = '';
            if (v['fuhao'] == '-') {
                class_str = 'minus';
            } else {
                class_str = 'add';
            }
            str += '<p>' + ACT.ATTR_CONF[k]['title2'] + '：<span class="' + class_str + '">' + v['fuhao'] + '' + v['value'] + (v['type'] == 2 ? '%' : '') + '</span></p>';
        });
        str = '<div class="effer">' + str + '</div>';
        $o.append(str);
    },
    shareStat: function (id, $o) {
        if (!Client.env.isClient) return false;
        my_ajax({ac: 'shareStat', id: id, r: Math.random()}, function (msg) {
            if (msg.key == 'ok') {
                ACT.incrNum($o);
            }
        });
    },
    screenshot: function () {
        var dia = document.querySelector("#CanvasBoxDiv");
        html2canvas(dia, {
            scale: 1.5,
            backgroundColor: null
        }).then(function (canvas) {
            var dataURL = canvas.toDataURL();
            $("#shareImg").attr('src', dataURL);
            if (Client.env.isClient) ACT.share_image_src64 = dataURL;
            $('.step_div').hide();
            $('#dia_toast_msg').hide();
            $('#shareDiv').show();
            $(".share-mask").show();
        });
    },
    makeImg: function () {
        ACT.showToast('改枪方案截图中...', 15000);
        setTimeout(function () {
            ACT.screenshot();
        }, 3);
    },
    renderCanvasBoxDiv: function (gun_id, gun, title, tag_ids, caowei_peijian, share_code, gai_attr_data, peijian_price_total, price) {
        $div = $('#CanvasBoxDiv');
        // $div.find('.share-qrcode').hide();//隐藏底部分享图
        $div.find('.detail-pars,.share-input').hide();//隐藏方案分享码
        var cate_title = $('#step1CateList>div[data-cid="' + gun['cate_id'] + '"]').find('.gun-name').text();
        //枪械信息
        $div.find('div.gun .left').html(
            '<p class="type-name">' + cate_title + '</p>\n' +
            '<img class="gun-img" src="' + ACT.imgToBase64(gun['thumb']) + '" alt="" srcset="">\n' +
            '<p class="name">' + gun['title'] + '</p>\n' +
            '<div class="coin">参考价值<span class="coin-tag"></span>' + price + '</div>'
        );
        var gun_attr_html = '';
        $.each(ACT.ATTR_CONF, function (attr_id, attr_v) {
            if (is_empty(gai_attr_data[attr_id])) return;
            v = gai_attr_data[attr_id];
            var add_class = '';
            var add_value = '';
            if (v['change'] > 0) {
                add_class = 'add';
                add_value = '(' + '+' + v['change'] + ')';
            }
            if (v['change'] < 0) {
                add_class = 'minus';
                add_value = '(' + v['change'] + ')';
            }
            gun_attr_html += '<div class="item">\n' +
                '\t<div class="top">\n' +
                '\t\t<span class="name">' + attr_v['title'] + '</span><span class="num ' + add_class + '">' + v['new_value'] + add_value + '</span>\n' +
                '\t</div>\n' +
                '\t<div class="progress-wrapper">\n' +
                '\t\t<div class="progress" style="width: ' + ACT.getAttrPercent(v['org_value'], attr_id) + '%;">\n' +
                (v['change_percent'] ? '\t\t\t<div class="' + add_class + '" style="width: ' + (1.9 * v['change_percent'] / 100) + 'rem;"></div>\n' : '') +
                '\t\t</div>\n' +
                '\t</div>\n' +
                '</div>';
        });
        $div.find('div.gun .attribute').html(gun_attr_html);
        //具体改装
        var peijian_html = '';
        $.each(caowei_peijian, function (caowei_id, peijian_id) {
            if (is_empty(_peijian_list[peijian_id])) return;
            if (is_empty(_caowei_list[caowei_id])) return;
            var caowei = _caowei_list[caowei_id];
            var peijian = _peijian_list[peijian_id];
            peijian_html += '<div class="item">\n' +
                '\t<div class="img-wrapper">\n' +
                '\t\t<span class="type">' + caowei['title'] + '</span>\n' +
                '\t\t<img src="' + ACT.imgToBase64(peijian['icon']) + '" alt="">\n' +
                '\t</div>\n' +
                '\t<p class="name">' + peijian['title'] + '</p>\n' +
                '</div>';
        });
        $div.find('.list3').html(peijian_html);
        //方案分享码
        if (share_code) {
            $div.find('.detail-pars,.share-input').show();
            $('#share_code_input').val(share_code);
        }
    },
    zan: function ($o) {
        var _this = this;
        if (!_this._check()) return false;
        var id = $o.attr('data-id');
        if (!id) return false;
        my_ajax({ac: 'zan', id: id, r: Math.random()}, function (msg) {
            if (!Verify.AjaxDialog(msg, ACT.c)) {
                return false;
            }
            if (msg.key == 'ok') {
                ACT.incrNum($o);
                $o.addClass('on');
                ACT.toastMsg('谢谢你的点赞');
            } else if (msg.key == 'cancel_ok') {
                ACT.decrNum($o);
                $o.removeClass('on');
                ACT.toastMsg('已取消点赞');
            } else {
                ACT.toastMsg(msg.info);
                return false;
            }
        });
        return false;
    },
    collect: function ($o) {
        var _this = this;
        if (!_this._check()) return false;
        var id = $o.attr('data-id');
        if (!id) return false;
        my_ajax({ac: 'collect', id: id, r: Math.random()}, function (msg) {
            if (!Verify.AjaxDialog(msg, ACT.c)) {
                return false;
            }
            if (msg.key == 'ok') {
                ACT.incrNum($o);
                $o.addClass('on');
                ACT.toastMsg('可在【我的】→【我的收藏】查看');
            } else if (msg.key == 'cancel_ok') {
                ACT.decrNum($o);
                $o.removeClass('on');
                ACT.toastMsg('已取消收藏');
            } else {
                ACT.toastMsg(msg.info);
                return false;
            }
        });
        return false;
    },
    record_query_switch_component: function (conf) { /* 战绩查询切换组件 */
        if (typeof window.activityInterface == 'object' && typeof window.activityInterface.setWebShareInfo == 'function') {
            if (Client.env.platform == "android" && window.activityInterface.getVersionCode() >= 351) {
                conf = JSON.stringify(conf);
                window.activityInterface.setWebShareInfo(conf);
            }
        }
    },
    preventBack: function () {
        if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.preventActGoBack) == "function" && typeof (window.activityInterface.goBack) == "function") {
            window.activityInterface.preventActGoBack('ACT.confirm_quit');
        }
    },
    //大数据埋点
    /*bigDataReport: function () {
        if (typeof window.activityInterface == 'object' && typeof (window.activityInterface.bigDataReport) == "function") {
            window.activityInterface.bigDataReport('enter_tooldetail', '', '', '', '', 'android_appid', '', '工具详情页', '', '工具详情页-浏览-562', 1);
        }
        return false;
    }*/
}

function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

// 获取当前可视范围的高度
function getClientHeight() {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    return clientHeight;
}

// 获取文档完整的高度
function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

function is_empty(o) {
    if (is_null(o)) return true;
    if (!o) return true;
    if (Array.prototype.isPrototypeOf(o) && o.length === 0) return true;
    if (Object.prototype.isPrototypeOf(o) && Object.keys(o).length === 0) return true;
    return false;
}

function is_null(o) {
    if (typeof o == 'undefined') return true;
    if (o === null) return true;
    return false;
}

//ajax请求
var lock_arr = {};

function my_ajax(data, callback, errcallback) {
    var data = data || {};

    if (Client.env.isClient) {
        if (Client.scookie == "" && window.userInterface.isLogin() == 1) {
            var UserInfo = window.userInterface.getUserInfo();
            var jsonobj = eval('(' + UserInfo + ')');
            Client.scookie = jsonobj.scookie;
        }
        data.scookie = Client.scookie;

        if (typeof (window.activityInterface) == "object" && typeof (window.activityInterface.getUniqueDeviceIdNew) == "function") {
            data.device = window.activityInterface.getUniqueDeviceIdNew(); //识别码
        } else {
            data.device = window.activityInterface.getUniqueDeviceId(); //设备号
        }
    }

    var ac = data.ac || 'ac';
    if (lock_arr[ac]) return false;
    lock_arr[ac] = true;

    $.ajax({
        url: ACT.ajaxPath,
        data: data,
        type: 'POST',
        dataType: 'json',
        success: function (result) {
            lock_arr[ac] = false;

            if (typeof callback == 'function') {
                callback(result);
            }
        },
        error: function () {
            lock_arr[ac] = false;

            if (typeof errcallback == 'function') {
                errcallback();
            }
        }
    });
}

(function () {
    $(document).on('click', 'a.zan[data-id]', function () {
        ACT.zan($(this));
        return false;
    });
    $(document).on('click', 'a.collect[data-id]', function () {
        ACT.collect($(this));
        return false;
    });
})();

(function () {
    $('.statBtn[data-stat-id]').click(function () {
        if (!Client.env.isClient) {
            return false;
        }
        var id = $(this).attr('data-stat-id');
        my_ajax({ac: 'clickStat', id: id, r: Math.random()}, function (msg) {

        });
    });
})();

//返回时执行相关函数
function onResume() {
    if (ACT.to_gai == 1) {
        window.location.reload();
        ACT.to_gai = 0;
    }
};
