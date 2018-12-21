var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp();
Page({
    data: {
        coupons: "",
        coupon_class: "coupons-item",
        no_coupon_class: "coupon-no-item",
        banners:[],
        hasNoCoupons:true,
        busid: 0
    },
    listenerCouponsInput: function(x) {
        this.data.coupons = x.detail.value,
        this.data.id = x.currentTarget.dataset.id;
    },
    listenerDuiHuan: function() {
        // 兑换码逻辑 预留2018.12.19
    },
    onLoad: function() {
        var x = this;
        x.getCoupons()
    },
    getCoupons: function() {
        let that = this;
        // 页面渲染完成
        wx.showToast({
            title: '加载中...',
            icon: 'loading',
            duration: 1000
        });
        util.request(api.CouponCenter, {
        }).then(function(res) {
            if (res.code === 200 && res.data.length>0) {
                that.setData({
                    coupons: res.data,
                    hasNoCoupons: false,
                });
            }
            wx.hideToast();
        });

    },
    gitCoupon: function(x) {
        let that = this;
        // 页面渲染完成
        wx.showToast({
            title: '领取中...',
            icon: 'loading',
            duration: 1000
        });
        util.request(api.GetCoupon, {
            id: x.currentTarget.dataset.id,
        }, 'POST').then(function(res) {
            if (res.code === 200) {
                var coupons = that.data.coupons
                coupons[x.currentTarget.dataset.index].can_get_num = res.data.can_get_num;
                if(res.data.can_get_num<=0){
                    coupons[x.currentTarget.dataset.index].button_info['status'] = 0;
                    coupons[x.currentTarget.dataset.index].button_info['text'] = '已领取';
                }
                wx.hideToast();
                wx.showToast({
                    title: "礼券领取成功",
                    icon: "success",
                    duration: 2e3
                })
                that.setData({
                    coupons: coupons,
                });
            }
        },function(err){
            wx.showModal({
                title: "领取失败",
                content: err.data.message,
                showCancel: ![]
            });
        })
    }
});