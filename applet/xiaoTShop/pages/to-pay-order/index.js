var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const pay = require('../../services/pay.js');

var app = getApp();

Page({
    data: {
        checkedGoodsList: [],
        checkedAddress: {},
        checkedCoupon: [],
        couponId:0,
        couponList: [],
        goodsTotalPrice: 0.00, //商品总价
        freightPrice: 0.00, //快递费
        couponPrice: 0.00, //优惠券的价格
        orderTotalPrice: 0.00, //订单总价
        actualPrice: 0.00, //实际需要支付的总价
        is_buyNow: 0,
        goodsId: 0,
        productId: 0, // 规格id
        buynumber: 0,
        bargainId:0,
        addressId: 0,
        postscript:'暂无留言',
        couponId: 0
    },
    getPostscript: function (e) {
        var val = e.detail.value;
        this.setData({
            postscript: val
        });
    },
    onLoad: function(options) {

        // 页面初始化 options为页面跳转所带来的参数
        if (options.goodsId) {
            this.setData({
                'is_buyNow': 1,
                'goodsId': options.goodsId,
                'buynumber': options.number,
                'productId': options.product_id,
                'bargainId': options.bargainId ? options.bargainId:0,
                //is_buyNow_info:'?goodsId='+options.goodsId+'&number='+options.number+'&product_id='+options.product_id
            });
        }

    },
    getCheckoutInfo: function() {
        let that = this;
        util.request(api.CartCheckout, {
            addressId: that.data.addressId,
            couponId: that.data.couponId
        }).then(function(res) {
            if (res.code === 200) {
                console.log(res.data);
                that.setData({
                    checkedGoodsList: res.data.checkedGoodsList,
                    checkedAddress: res.data.checkedAddress,
                    actualPrice: res.data.actualPrice,
                    checkedCoupon: res.data.checkedCoupon,
                    couponList: res.data.couponList,
                    couponPrice: res.data.couponPrice,
                    freightPrice: res.data.freightPrice,
                    goodsTotalPrice: res.data.goodsTotalPrice,
                    orderTotalPrice: res.data.orderTotalPrice
                });
            }
            wx.hideLoading();
        });
    },
    buyNow: function() {
        let that = this;
        util.request(api.PayNow, {
            addressId: that.data.addressId,
            couponId: that.data.couponId,
            goodsId: that.data.goodsId,
            buynumber: that.data.buynumber,
            productId: that.data.productId,
            bargainId: that.data.bargainId
        }, 'POST').then(function(res) {
            if (res.code === 200) {
                that.setData({
                    checkedGoodsList: res.data.checkedGoodsList,
                    checkedAddress: res.data.checkedAddress,
                    actualPrice: res.data.actualPrice,
                    checkedCoupon: res.data.checkedCoupon,
                    couponList: res.data.couponList,
                    couponPrice: res.data.couponPrice,
                    freightPrice: res.data.freightPrice,
                    goodsTotalPrice: res.data.goodsTotalPrice,
                    orderTotalPrice: res.data.orderTotalPrice
                });
            }
            wx.hideLoading();
        });
    },
    bindChangeCoupon: function(x) {
        let that = this;
        var e = x.detail.value[0] - 1;
        if(-1 == e){
            that.setData({
                couponId:0,
                couponPrice: 0.00,
            });
        }else{
            var coupon = that.data.couponList[e];
            if(!coupon){
                return false;
            }
            var couponId = coupon.coupon_id;
            that.setData({
                couponId: couponId,
            });
        }
        if(that.data.goodsId){
            that.buyNow();
        }else{
            that.getCheckoutInfo();
        }
        
    },
    selectAddress() {
        wx.navigateTo({
            url: '/pages/shopping/address/address' ,
        })
    },
    addAddress() {
        wx.navigateTo({
            url: '/pages/shopping/addressAdd/addressAdd',
        })
    },
    onReady: function() {
        // 页面渲染完成

    },
    onShow: function() {
        let that = this;
        try {
            var addressId = wx.getStorageSync('addressId');
            if (addressId) {
                this.setData({
                    'addressId': addressId
                });
            }

            var couponId = wx.getStorageSync('couponId');
            if (couponId) {
                this.setData({
                    'couponId': couponId
                });
            }
        } catch (e) {
            // Do something when catch error
        }
        
        // 页面显示
        wx.showLoading({
            title: '加载中...',
        })
        if (that.data.is_buyNow) {
            that.buyNow();
        } else {
            that.getCheckoutInfo();
        }




    },
    onHide: function() {
        // 页面隐藏

    },
    onUnload: function() {
        // 页面关闭

    },
    submitOrder: function() {
        let that = this;
        if (this.data.addressId <= 0) {
            util.showErrorToast('请选择收货地址');
            return false;
        }

        wx.showLoading({
            title: '支付中...',
        });

        util.request(api.OrderSubmit, {
            addressId: this.data.addressId,
            couponId: this.data.couponId,
            goodsId: that.data.goodsId,
            productId: that.data.productId,
            postscript: that.data.postscript,
            buynumber: that.data.buynumber
        }, 'POST').then(res => {
            if (res.code === 200) {
                const orderId = res.data.id;
                pay.payOrder(parseInt(orderId)).then(res => {
                    wx.redirectTo({
                        url: '/pages/payResult/payResult?status=1&orderId=' + orderId
                    });
                }).catch(res => {
                    wx.redirectTo({
                        url: '/pages/payResult/payResult?status=0&orderId=' + orderId
                    });
                });
            } else {
                util.showErrorToast('下单失败');
            }
        });
    }
})