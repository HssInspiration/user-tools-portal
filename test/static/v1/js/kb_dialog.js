var kb_dialog = {
    dialog: null,
    open: function (opt) {
        var _this = this;
        _this.close();
        _this.dialog = new ToolDialog(opt);
    },
    close: function () {
        var _this = this;
        if (_this.dialog) {
            _this.dialog.close();
            _this.dialog = null;
        }
    }
}

var ToolDialog = function (opt) {
    this.commonData = {
        mask: "<div class='fixed-top' id='iwgc_dialog_bg' style='position: fixed; left: 0px; background: rgb(0, 0, 0); bottom: 0; top: 0px; z-index:  999;  width: 100%;'></div>",
        win: $(window),
        doc: $(document)
    };

    opt = opt || {};
    this.config = {
        id: '', //弹窗ID
        close_id: '.popClose', //弹窗关闭ID
        close_fun: null, //关闭回调
        maskOpacity: 0.7, //遮罩透明度
        cover: true, //是否需要遮罩
        maskClose: false, //是否点击遮罩时关闭弹层。当遮罩存在时有效
        type: 'center', //弹窗类型，默认居中 center-居中弹出 bottom-底部弹出 auto-自动居中
        scrollbar: true //打开弹弹窗时，是否允许浏览器出现滚动条
    }

    this.config = $.extend({}, this.config, opt);
    this.$dialog = $("#" + this.config.id);
    if (this.$dialog.length == 0) {
        console.error("弹窗ID错误，请检查！");
        return;
    }
    this.resizeHandle = null;
    this.show();
}

ToolDialog.prototype = {
    show: function () {
        var _this = this;
        if (_this.config.cover) {
            if ($("#iwgc_dialog_bg").length == 0) {
                $("body").append(_this.commonData.mask);
                $("#iwgc_dialog_bg").css({"opacity": _this.config.maskOpacity});
            } else {
                $("#iwgc_dialog_bg").show();
            }
        }

        //页面不出现滚动条
        if (!_this.config.scrollbar) {
            $("html,body").css("overflow", 'hidden');
        }

        var dialog_type = _this.config.type;
        if (dialog_type == 'bottom') { //底部弹出
            _this.$dialog.show().css({
                'z-index': 99999,
                'position': 'fixed',
                'left': '50%',
                'bottom': 0
            });
        } else if (dialog_type == 'auto') { //自动居中
            _this.$dialog.show().css({
                'z-index': 99999,
                'position': 'fixed'
            });
        } else if (dialog_type == 'center') { //居中弹出
            _this.$dialog.show().css({
                'z-index': 99999,
                'position': 'fixed',
                "top": (_this.commonData.win.height() - _this.$dialog.outerHeight()) / 2,
                "left": (_this.commonData.win.width() - _this.$dialog.outerWidth()) / 2,
            });
        }

        if (this.config.maskClose) {
            $('body').on('click', '#iwgc_dialog_bg', function () {
                _this.close();
            });
        } else {
            $("#iwgc_dialog_bg").unbind("click");
        }

        _this.$dialog.show();
        _this.$dialog.find(_this.config.close_id).on('click', function () {
            _this.close();
            return false
        });

        if (dialog_type == 'center') {
            /**
             * 注意：这里必须用_this.resize.bind(_this)绑定，否则会出现resize函数中this指向window对象，导致无法获取到弹窗对象
             */
            _this.resizeHandle = _this.resize.bind(_this);
            _this.commonData.win.unbind('resize', _this.resizeHandle).bind('resize', _this.resizeHandle);
        }
    },
    close: function () {
        var _this = this;
        _this.$dialog.hide();
        $("#iwgc_dialog_bg").hide();
        $("html,body").css("overflow", '');

        if (typeof _this.resizeHandle == 'function') {
            _this.commonData.win.unbind('resize', _this.resizeHandle);
        }

        var close_fun = _this.config.close_fun;
        if (typeof _this.config.close_fun == 'function') {
            _this.config.close_fun = null;
            close_fun();
        }
    },
    resize: function () {
        var _this = this;
        if (_this.config.type == 'center') {
            _this.$dialog.css({
                "top": (_this.commonData.win.height() - _this.$dialog.outerHeight()) / 2,
                "left": (_this.commonData.win.width() - _this.$dialog.outerWidth()) / 2,
            });
        }
    }
}