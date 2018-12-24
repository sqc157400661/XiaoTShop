var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();

Page({
    data: {
        addressList: [],
        addressId:0,
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.getAddressList();
    },
    onReady: function() {
        // 页面渲染完成
    },
    onShow: function() {
        // 页面显示
        try {
            var addressId = wx.getStorageSync('addressId');
            if (addressId) {
                this.setData({
                    'addressId': addressId
                });
            }
        } catch (e) {
            // Do something when catch error
        }
    },
    getAddressList() {
        let that = this;
        util.request(api.AddressList).then(function(res) {
            if (res.code == 200) {
                that.setData({
                    addressList: res.data
                });
            }
        });
    },
    addressAddOrUpdate(event) {
        wx.navigateTo({
            url: '/pages/shopping/addressAdd/addressAdd?id=' + event.currentTarget.dataset.addressId
        })
    },
    selectAddress(event) {

        try {
            wx.setStorageSync('addressId', event.currentTarget.dataset.addressId);
        } catch (e) {

        }

        //选择该收货地址
        wx.navigateBack();
        // wx.redirectTo({
        //   url: '/pages/to-pay-order/index'+ this.data.is_buyNow_info
        // })
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    }
})