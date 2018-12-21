var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

var app = getApp();

Page({
    data: {
        coupons: [],
        loadingMoreHidden:false // 分页预留
    },
    onLoad: function() {},
    onShow: function() {
        this.getMyCoupons();
    },
    getMyCoupons: function() {
        let that = this;
        // 页面渲染完成
        wx.showToast({
            title: '加载中...',
            icon: 'loading',
            duration: 2000
        });
        util.request(api.MyCoupon, {
        }).then(function(res) {
            if (res.code === 200) {
                if(res.data.length>=1){
                    that.setData({
                        loadingMoreHidden: true,
                    });
                }
                that.setData({
                    coupons: res.data,
                });
            }
            wx.hideToast();
        });
    },
    goBuy: function() {
        wx.navigateTo({
            url: "/pages/couponcenter/index"
        });
    },
    gohome: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    }
});