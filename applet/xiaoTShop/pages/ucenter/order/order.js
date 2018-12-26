var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

Page({
    data: {
        orderList: [],
        statusType: {},
        statusTab:0
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数

        this.getOrderList();
    },
    getOrderList() {
        let that = this;
        util.request(api.OrderList, {
            v2: 1,
            statusTab:that.data.statusTab
        }).then(function(res) {
            if (res.code == 200) {
                that.setData({
                    orderList: res.data.list,
                    statusType: res.data.statusType
                });
            }
        });
    },
    payOrder(e) {
        var orderId = e.currentTarget.dataset.order_id;
        var actualPrice = e.currentTarget.dataset.actual_price;
        console.log(orderId)
        console.log(actualPrice)
        wx.redirectTo({
            url: '/pages/pay/pay?orderId=' + orderId + '&actualPrice=' + actualPrice,
        })
    },
    statusTap:function(x) {
        var that = this;
        var index = x.currentTarget.dataset.index;
        that.setData({
            statusTab: index
        });
        that.getOrderList();
    },
    cancelOrder: function(opt) {
        let that = this;
        wx.showModal({
            title: "确定要取消该订单吗？",
            content: "",
            success: function (x) {
                if(x.confirm){
                    var orderId = opt.currentTarget.dataset.id;
                    util.request(api.OrderCancel, {
                        orderId:orderId
                    }).then(function(res) {
                        if (res.code == 200) {
                            that.getOrderList();
                        }
                    });
                }
            }
        });
        
    },
    orderDetail: function(x) {
        var e = x.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../orderDetail/orderDetail?id=" + e
        });
    },
    onReady: function() {
        // 页面渲染完成
    },
    onShow: function() {
        // 页面显示
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    }
})