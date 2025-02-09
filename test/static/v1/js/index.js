ACT.login();
Verify.checkJump();

var PAGE = {
    cate_id: 0,
    gun_id: 0,
    tag_id: 0,
    gun_title: '',
    sort: '',
    cursor: 0,
    last_id: 0,
    clear_cate: function (no_set_value) {
        no_set_value = no_set_value || 0;
        var _this = this;
        $('#head_guns_content>.item').removeClass('on');
        $('#options>a.guns').text('全部枪械');
        $('#head_cate>.item').removeClass('on').eq(0).addClass('on');
        $('#head_guns_content>.item').show();
        if (!no_set_value) {
            _this.cate_id = 0;
            _this.gun_id = 0;
        }
    },
    clear_lab: function (no_set_value) {
        var _this = this;
        $('#options>a.lables').text('标签筛选');
        $('.lables-content>.item').removeClass('on');
        if (!no_set_value) {
            _this.tag_id = 0;
        }
    },
    clear_words: function () {
        var _this = this;
        $('#gai_search_form').removeAttr('flag').find('input:text').val('').siblings('.close').removeClass("show");
        _this.words = '';
    },
    reset_sort: function (sort) {
        var _this = this;
        sort = sort || 'id';
        $('#sort-content>.item').removeClass('on').filter('[sort="' + sort + '"]').addClass('on');
        $('#options>a.sort').text($('#sort-content>.item.on').text());
        _this.sort = sort;
    },
    get_sort: function () {
        return $('#sort-content>.item.on').attr('sort');
    },
    scroll_handler: function () {
        var _this = this;
        var $ul = $('#list');
        if ((getScrollTop() + getClientHeight() + 100) >= getScrollHeight()) {
            PAGE.get_list();
        }
    },
    renderList: function (datalist, $ul) {
        $.each(datalist, function (i, v) {
            var tag_str = '';
            var j = 0;
            $.each(v['tag_ids'], function (it, vk) {
                if (is_empty(_tag_list[vk])) return;
                vt = _tag_list[vk];
                if (!is_empty(PAGE.tag_id) && PAGE.tag_id == vk) {
                    cur_tag_str = '<span class="new">' + vt['title'] + '</span>';
                } else if (j == 0) {
                    cur_tag_str = '<span class="new">' + vt['title'] + '</span>';
                } else {
                    tag_str += '<span' + (j == 0 ? ' class="new"' : '') + '>' + vt['title'] + '</span>';
                }
                j++;
            });
            tag_str = cur_tag_str + tag_str;

            var peijian_str = '';
            var peijian_len = Object.keys(v['caowei_peijian']).length;
            var j = 0;
            $.each(v['caowei_peijian'], function (caowei_id, peijian_id) {
                if (is_empty(_peijian_list[peijian_id])) return;
                var peijian = _peijian_list[peijian_id];
                peijian_str += '<div class="f-item"><img class="lazyload" data-src="' + peijian['icon'] + '" alt="" srcset=""></div>';
                j++;
                if (peijian_len > 8) {
                    if (j == 7) {
                        peijian_str += '<div class="f-item last"><img src="' + SKIN + '/images/more.png" alt="" srcset=""></div>';
                        return false;
                    }
                }
            });

            var item_html = '<div class="item">\n' +
                '<a href="javascript:;" onclick="ACT.toDetailPage(\'' + v['id'] + '\')">' +
                '\t<div class="name">\n' +
                (v['share_code'] ? '\t\t<span class="code"></span>\n' : '') +
                '\t\t<div class="name-str">' + v['title'] + '</div>\n' +
                '\t</div>\n' +
                '\t<div class="tags">\n' + tag_str +
                '\t\t<span class="time">' + v['create_time'] + '</span>\n' +
                '\t</div>\n' +
                '\t<div class="gun">\n' +
                '\t\t<img data-src="' + v['gun_thumb'] + '" class="gun-img lazyload" alt="" srcset="">\n' +
                '\t\t<div class="name-wrapper">\n' +
                '\t\t\t<p class="gun-name">' + v['gun_title'] + '</p>\n' +
                '\t\t\t<p class="coin">' + (ACT.formatPrice(v['price'])) + '</p>\n' +
                '\t\t</div>\n' +
                '\n' +
                '\t</div>\n' +
                '\t<div class="fittings">\n' + peijian_str + '</div>\n' +
                '</a>' +
                '\t<div class="user">\n' +
                '<a href="javascript:;" class="via-wrapper" onclick="ACT.toPersonCenter(' + v['uid'] + ')">' +
                '\t\t<img data-src="' + v['user']['avatar'] + '" class="via lazyload" alt="" srcset="">\n' +
                '\t\t<span class="user-name">' + v['user']['nickname'] + '</span>\n' +
                '</a>' +
                '\t\t<a class="star collect' + (v['collected'] == 1 ? ' on' : '') + '" data-id="' + v['id'] + '">' + v['collect_num'] + '</a>\n' +
                '\t\t<a class="like zan' + (v['zaned'] == 1 ? ' on' : '') + '" data-id="' + v['id'] + '">' + v['zan'] + '</a>\n' +
                '\t</div>\n' +
                '</div>';
            $ul.append(item_html);
        });
    },
    get_list: function () {
        var _this = this;
        $div = $('#list_div');
        $ul = $div.find('.list1');
        $loadding = $div.find('.more');
        $loadding.html('加载中...').show();//加载中
        $none = $div.find('.no-content');
        $(window).unbind('scroll', PAGE.scroll_handler);

        var cursor = _this.cursor;
        my_ajax({
            ac: 'getGaiList',
            cate_id: _this.cate_id,
            gun_id: _this.gun_id,
            tag_id: _this.tag_id,
            gun_title: _this.words,
            sort: _this.sort,
            cursor: _this.cursor,
            last_id: _this.last_id
        }, function (msg) {
            if (!Verify.AjaxDialog(msg, ACT.c)) {
                return false;
            }
            console.log('msg type: ', typeof msg)
            console.log('msg: ', msg)
            if (msg.key == 'ok') {//有数据
                PAGE.cursor = msg.result.cursor;
                PAGE.last_id = msg.result.last_id;
                if (cursor == 0) {//首页
                    if (msg.result.list.length) {
                        $ul.html('').show();
                        $none.hide();
                    } else {
                        $ul.hide();
                        $loadding.hide();
                        $none.show();
                        return false;
                    }
                }
                if (msg.result.list.length) {
                    _this.renderList(msg.result.list, $ul);
                }
                if (msg.result.cursor > -1) {//下一页
                    $(window).bind('scroll', PAGE.scroll_handler);
                } else {
                    $loadding.html('暂时没有更多内容啦~').show();
                }
            } else {
                if (!is_empty(msg.info)) {
                    window.activityInterface.showToast(msg.info);
                }
            }
        });
    }
};

(function () {
    PAGE.sort = PAGE.get_sort();
    PAGE.get_list();
    if (Client.env.isClient) {
        //载入上次编辑未提交的方案
        if ($.cookie(ACT.record_key)) {
            ACT._dialog('dialog_record');
        }
    }

    if ($.cookie(ACT.shuoming_key) != "ok") {
        ACT._dialog('dialog_shuoming');
        $.cookie(ACT.shuoming_key, 'ok', {expires: 60});
    }
})();

(function () {
    $(".sidebar .top").click(function () {
        $("html, body").animate({scrollTop: 0}, 300);
    });

    $(".unfold,.collapse").click(function () {
        $(".sidebar").toggleClass("v2");
        $(".unfold").toggleClass("v2");
    });

    $('.tool-tip .close').click(function () {
        $(this).parent().remove();
        return false;
    });

    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 200) {
            $(".tool-tip").show();
            $('#top_btn').show();
        } else {
            $(".tool-tip").hide();
            $('#top_btn').hide();
        }
        $(".sidebar").addClass("v2");
        $(".unfold").addClass("v2");
    });
})();

(function () {
    var $form = $('#gai_search_form');
    var $input = $form.find('input:text');
    var $search_btn = $form.find('.search-btn');

    $search_btn.click(function () {
        $form.submit();
        return false;
    });

    $form.submit(function () {
        $input = $form.find('input:text');
        var words = $.trim($input.val());
        // if (!words) {
        //     ACT.toastMsg('请输入枪械名');
        //     return false;
        // }
        if (!words && ($form.attr('flag') != 1)) return false;
        if (PAGE.words == words) return false;
        PAGE.words = words;
        PAGE.clear_cate();
        PAGE.clear_lab();
        PAGE.reset_sort(PAGE.words == '' ? 'zan' : 'id');
        PAGE.cursor = PAGE.last_id = 0;
        PAGE.get_list();
        $form.attr('flag', 1);
        return false;
    });

    $input.on("input", function () {
        console.log('11', $.trim($(this).val()), '22')
        if ($.trim($(this).val())) {
            console.log('a')
            $(this).siblings(".close").addClass("show");
        } else {
            $(this).siblings(".close").removeClass("show");
        }
    });
    $form.find(".close").click(function () {
        $('#gai_search_form').find('input:text').val('').siblings('.close').removeClass("show");
        if ($form.attr('flag') == 1) {
            PAGE.words = '';
            PAGE.clear_cate();
            PAGE.clear_lab();
            PAGE.reset_sort('zan');
            PAGE.cursor = 0;
            PAGE.last_id = 0;
            PAGE.get_list();
            $form.removeAttr('flag');
        }
        return false;
    });
})();
(function () {
    //点击全部枪械、标签筛选、排序
    $("#options>a").click(function () {
        $(this).toggleClass("on").siblings("a").removeClass("on")
        var boxs = $(this).siblings(".options-content").find(".box");
        boxs.eq($(this).index()).toggle().siblings(".box").hide();
    });

    $('#head_cate>.item').click(function () {
        if ($(this).hasClass('on')) return false;
        var cate_id = $(this).data('cid');
        $(this).addClass('on').siblings().removeClass('on');
        if (cate_id) {
            $('#head_guns_content>.item').hide().filter('[data-cid="' + cate_id + '"]').show();
        } else {
            $('#head_guns_content>.item').show();
        }
    });

    $('#head_guns_content>.item').click(function () {
        if ($(this).hasClass('on')) return false;
        $(this).addClass('on').siblings().removeClass('on');
    });

    $('.lables-content>.item').click(function () {
        if ($(this).hasClass('on')) return false;
        $(this).addClass('on').siblings().removeClass('on');
    });

    // 分类-重置
    $('#reset_cate_gun_btn').click(function () {
        PAGE.clear_cate(1);
        return false;
    });
    // 分类-完成
    $('#ok_cate_gun_btn').click(function () {
        var cate_id = gun_id = 0;
        if ($('#head_cate>.item[data-cid].on:visible').length) cate_id = $('#head_cate>.item[data-cid].on:visible').attr('data-cid');
        if ($('#head_guns_content>.item[data-gun-id].on:visible').length) gun_id = $('#head_guns_content>.item[data-gun-id].on:visible').attr('data-gun-id');
        if (gun_id) {
            $('#options>a.guns').text($('#head_guns_content>.item.on:visible').text());
        } else if (cate_id) {
            $('#options>a.guns').text($('#head_cate>.item.on:visible').text());
        }
        $('#options a.guns').toggleClass("on").siblings("a").removeClass("on");
        $('.guns-box').toggle();
        if (PAGE.gun_id == gun_id && PAGE.cate_id == cate_id) return false;

        PAGE.cate_id = cate_id;
        PAGE.gun_id = gun_id;
        PAGE.clear_lab();
        PAGE.clear_words();
        PAGE.reset_sort(PAGE.cate_id || PAGE.gun_id || PAGE.tag_id ? 'id' : 'zan');
        PAGE.cursor = PAGE.last_id = 0;
        PAGE.get_list();

        return false;
    });
    // 标签-重置
    $('#reset_tag_btn').click(function () {
        PAGE.clear_lab(1);
        return false;
    });
    // 标签-完成
    $('#ok_tag_btn').click(function () {
        var tag_id = 0;
        if ($('.lables-content>.item[data-id].on').length) tag_id = $('.lables-content>.item[data-id].on').attr('data-id');
        if (tag_id) {
            $('#options>a.lables').text($('.lables-content>.item.on').text());
        } else {
            $('#options>a.lables').text('标签筛选');
        }
        $('#options a.lables').toggleClass("on").siblings("a").removeClass("on");
        $('.lables-box').toggle();

        if (PAGE.tag_id == tag_id) return false;

        PAGE.tag_id = tag_id;
        PAGE.clear_cate();
        PAGE.clear_words();
        PAGE.reset_sort(PAGE.cate_id || PAGE.gun_id || PAGE.tag_id ? 'id' : 'zan');
        PAGE.cursor = PAGE.last_id = 0;
        PAGE.get_list();

        return false;
    });
    // 排序
    $('#sort-content>a').click(function () {
        if ($(this).hasClass('on')) {
            $('.sort-box').toggle();
            return false;
        }
        $(this).addClass('on').siblings().removeClass('on');
        $('#options>a.sort').text($(this).text());
        $('#options a.sort').toggleClass("on").siblings("a").removeClass("on");
        $('.sort-box').toggle();

        var sort = PAGE.get_sort();
        if (PAGE.sort == sort) return false;
        PAGE.sort = sort;
        PAGE.cursor = PAGE.last_id = 0;
        PAGE.get_list();

        return false;
    });
})();
