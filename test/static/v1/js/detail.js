ACT.login(_page_pram);
Verify.checkJump();

var PAGE = {
    focus: function (uid) {
        if (!ACT._check()) return false;
        if (ACT['c']['uid'] == uid) {
            window.activityInterface.showToast('无法关注自己');
            return false;
        }
        my_ajax({
            ac: 'focus',
            uid: uid,
            r: Math.random()
        }, function (msg) {
            if (!Verify.AjaxDialog(msg, ACT.c)) {
                return false;
            }

            if (msg.key == 'ok') {
                window.activityInterface.showToast('关注成功~');
                $('.follow[data-uid="' + uid + '"]').addClass('disable').text('已关注');
            } else {
                window.activityInterface.showToast(msg.info);
            }
        });
    },
    cancelFocus: function (uid) {
        if (!ACT._check()) return false;
        if (ACT['c']['uid'] == uid) {
            return false;
        }
        my_ajax({
            ac: 'cancelFocus',
            uid: uid,
            r: Math.random()
        }, function (msg) {
            if (!Verify.AjaxDialog(msg, ACT.c)) {
                return false;
            }

            if (msg.key == 'ok') {
                $('.follow[data-uid="' + uid + '"]').removeClass('disable').text('关注');
                window.activityInterface.showToast('取消关注成功');
            } else {
                window.activityInterface.showToast(msg.info);
            }
        });
    },
    getFriendRelation: function () {
        var uid = $('.follow').attr('data-uid');
        if (ACT['c']['uid'] == uid) return false;
        my_ajax({
            ac: 'getFriendRelation',
            uid: uid,
            r: Math.random()
        }, function (msg) {
            if (msg.key == 'ok') {
                if (msg.relation == '2' || msg.relation == '4') {
                    $('.follow[data-uid="' + uid + '"]').addClass('disable').text('已关注');
                }
            }
        });
    }
};
(function () {
    $(document).on('click', function () {
        $('.effer').remove();
    });

    $('#gai_peijian_list>.item').on('click', '.effer', function () {
        $(this).remove();
        return false;
    });

    $('#gai_peijian_list>.item[data-id]').click(function () {
        var $o = $(this);
        if ($o.find('.effer:visible').length) {
            // $('.effer').remove();
            // return false;
        }
        var peijian_id = $o.attr('data-id');
        if (is_empty(_peijian_list[peijian_id])) return false;
        var peijian = _peijian_list[peijian_id];

        $('.effer').remove();
        ACT.getPeijianEffect($o, peijian);
        return false;
    });
})();
(function () {
    //生成
    $('#share_btn').click(function () {//生成文案
        if (!ACT._check()) return false;
        ACT.makeImg();//生成图片
        ACT.shareStat($(this).attr('data-id'), $(this));
        return false;
    });
    $('#clickSave').click(function () {
        if (Client.env.isClient) {
            ACT.saveShareImg();
        } else {
            saveFile($(".shareImg").attr("src"))
        }
    });
    //生成图层，点击图片外的范围返回首页
    $('.pop-share-wrapper').click(function () {
        var nodename = event.target.nodeName;
        if (nodename != 'IMG') {
            $('#shareDiv').hide();
            $(".share-mask").hide();
        }
    });
})();

(function () {
    //关注
    $('.follow[data-uid]').click(function () {
        var uid = $(this).attr('data-uid');
        if (!uid) return false;
        if ($(this).hasClass('disable')) {
            PAGE.cancelFocus(uid);
        } else {
            PAGE.focus(uid);
        }
    });
})();