var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

Page({
  data:{
    orderList: []
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    this.getOrderList();
  },
  getOrderList(){
    let that = this;
    util.request(api.OrderList).then(function (res) {
      if (res.code == 200) {
        that.setData({
          orderList: res.data
        });
      }
    });
  },
  payOrder(e){
    var orderId = e.currentTarget.dataset.order_id;
    var actualPrice = e.currentTarget.dataset.actual_price;
    console.log(orderId)
    console.log(actualPrice)
    wx.redirectTo({
      url: '/pages/pay/pay?orderId='+orderId+'&actualPrice='+actualPrice,
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})