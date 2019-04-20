const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
//获取应用实例
const app = getApp()
Page({
    data: {
        id: null,
        share: 0,
        userID: 0,
        autoplay: !![],
        userInfo: {},
        codeimg: '',
        interval: 3e3,
        duration: 1e3,
        bargainDetail: {},
        bargainHelpDetail: {},
        joinId: 0,
        kanjiashare: !![],
        helpkanjiashare: !![],
        victorykanjia: !![],
        postershow: !![],
        countDownDay: "00",
        countDownHour: "00",
        countDownMinute: "00",
        countDownSecond: "00",

        wxlogin: 0, // ++ 是否登陆
    },
    kanjiashow: function() {
        this.setData({
            kanjiashare: ![]
        });
    },
    closevictory: function() {
        this.setData({
            victorykanjia: !![]
        });
    },
    getshare: function() {
        this.setData({
            kanjiashare: ![]
        });
    },
    closeShare: function() {
        this.setData({
            kanjiashare: !![]
        });
    },
    gokanjia: function() {
        var x = this;
        var url = "/pages/kanjia/index?" + "bargainId=" + x.data.bargainId + "&goodsId=" + x.data.goodsId + "&productId=" + x.data.productId + "&share=1";
        wx.navigateTo({
            url: url
        });
    },
    closeHelp: function() {
        this.setData({
            helpkanjiashare: !![]
        });
    },
    showposter: function() {
        var that = this;
        util.request(api.Getwxacodeunlimit, {
            scene: that.data.scene,
            path: 'pages/kanjia/index',
            width: 50,
            get_body: 1,
        }).then(function(res) {
            that.getBase64ImageUrl(res.data.file);
        });
        that.setData({
            kanjiashare: !![],
            postershow: ![]
        });
    },
    closecode: function() {
        this.setData({
            postershow: !![]
        });
    },
    getData: function() {
        let that = this;
        util.request(api.BargainDetail, {
            bargainId: that.data.bargainId,
            goodsId: that.data.goodsId,
            productId: that.data.productId,
            joinId: that.data.joinId
        }).then(function(res) {
            if (res.code == 200) {
                that.setData({
                    bargainDetail: res.data,
                    joinId: res.data.id,
                });
                that.getHelpData();
                that.getEndTime(res.data.stop_time);
            }
        });
    },
    saveposter: function() {
        var x = this;
        console.log(x.data.codeimg),
            wx.saveImageToPhotosAlbum({
                filePath: x.data.codeimg,
                success: function(e) {
                    wx.showToast({
                        title: "保存成功",
                        icon: "success",
                        duration: 2e3
                    });
                }
            }),
            x.setData({
                postershow: !![]
            });
    },
    getHelpData: function() {
        let that = this;
        util.request(api.BargainHelpDetail, {
            joinId: that.data.joinId,
        }).then(function(res) {
            if (res.code == 200) {
                that.setData({
                    bargainHelpDetail: res.data,
                });
            }
        });
    },
    gopay: function() {
        var that = this;
        wx.navigateTo({
            url: '../to-pay-order/index?goodsId=' + that.data.goodsId + '&number=1' + '&product_id=' + that.data.productId + '&bargainId=' + that.data.bargainId
        })
    },
    getBase64ImageUrl: function(base64Data) {
        /// 获取到base64Data
        /// 通过微信小程序自带方法将base64转为二进制去除特殊符号，再转回base64
        base64Data = wx.arrayBufferToBase64(wx.base64ToArrayBuffer(base64Data));
        /// 拼接请求头，data格式可以为image/png或者image/jpeg等，看需求
        const base64ImgUrl = "data:image/png;base64," + base64Data;
        /// 刷新数据
        this.setData({
            codeimg: base64ImgUrl
        })
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
        var that = this;
        var scene = "?joinId=" + options.joinId + "&bargainId=" + options.bargainId + "&goodsId=" + options.goodsId + "&productId=" + options.productId + "&share=1";
        that.setData({
            joinId: options.joinId ? parseInt(options.joinId) : 0,
            bargainId: options.bargainId?parseInt(options.bargainId):0,
            scene: decodeURIComponent(scene),
            goodsId: parseInt(options.goodsId),
            productId: options.productId ? parseInt(options.productId) : 0
        });
        that.getData();
    },
    onReady: function() {
        // 页面渲染完成
    },
    getEndTime: function(o) {
        var t = this;
        o = o.replace(/-/g, "/");
        var s = Date.parse(new Date()) / 1e3;
        var r = Date.parse(new Date(o)) / 1e3 - s,
            c = setInterval(function() {
                var x = r,
                    e = Math.floor(x / 3600 / 24),
                    i = e.toString();
                1 == i.length && (i = "0" + i);
                var n = Math.floor((x - 3600 * e * 24) / 3600),
                    o = n.toString();
                1 == o.length && (o = "0" + o);
                var s = Math.floor((x - 3600 * e * 24 - 3600 * n) / 60),
                    u = s.toString();
                1 == u.length && (u = "0" + u);
                var l = (x - 3600 * e * 24 - 3600 * n - 60 * s).toString();
                1 == l.length && (l = "0" + l),
                    t.setData({
                        countDownDay: i,
                        countDownHour: o,
                        countDownMinute: u,
                        countDownSecond: l
                    }),
                    --r < 0 && ("YpVuW" === "iVaCX" ? this.setData({
                        kanjiashare: ![]
                    }) : (clearInterval(c), t.setData({
                        countDownDay: "00",
                        countDownHour: "00",
                        countDownMinute: "00",
                        countDownSecond: "00"
                    })));
            }.bind(t), 1e3);

    },
    helpKanjia: function() {
        var that = this;
        util.request(api.BargainHelp, {
            joinId: that.data.joinId,
        }, 'POST').then(function(res) {
            if (res.code == 200) {
                that.getData()
            }
        });
    },
    onShow: function() {
        var token = wx.getStorageSync('token');
        var userInfo = wx.getStorageSync('userInfo');
        // 页面显示
        if (userInfo && token) {
            app.globalData.userInfo = userInfo;
            app.globalData.token = token;
        }

        this.setData({
            userInfo: app.globalData.userInfo,
        });
        if (!token) {
            return false;
        }
        this.setData({
            wxlogin: 1,
        });
        // 页面显示
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    },
    toDetail: function(x, isTab) {
        var bargain_id = x.currentTarget.dataset.bargain_id;
        wx.navigateTo({
            url: '/pages/kanjia-goods/index?id=' + bargain_id
        });
    },
    onShareAppMessage: function() {
        var x = this;
        return x.setData({
            kanjiashare: !![]
        }), {
            title: "我发现一件好货，来帮我砍价吧～",
            path: "/pages/kanjia/index?joinId=" + x.data.joinId + "&bargainId=" + x.data.bargainId + "&goodsId=" + x.data.goodsId + "&productId=" + x.data.productId + "&share=1",
            success: function(e) {
                x.setData({
                    kanjiashare: !![]
                });
                wx.showModal({
                    title: "错误",
                    content: e.data.msg,
                    showCancel: ![]
                });
            },
            fail: function(x) {}
        };
    },


})