var app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
  data: {
    id: 0,
    goods: {},
    gallery: [],
    attribute: [],
    issueList: [],
    comment: [],
    brand: {},
    relatedGoods: [],
    cartGoodsCount: 0,
    userHasCollect: 0,
    number: 1,
    openAttr: false,
    noCollectImage: "/static/images/icon_collect.png",
    hasCollectImage: "/static/images/icon_collect_checked.png",
    collectBackImage: "/static/images/icon_collect.png"
  },
  getGoodsInfo: function () {
    let that = this;
    util.request(api.GoodsDetail, { id: that.data.id }).then(function (res) {
      if (res.code == 200) {
        that.setData({
          goods: res.data.info,
          gallery: res.data.info.list_pic_url,
          attribute: res.data.attribute,
          issueList: res.data.issue,
          comment: res.data.comment,
          brand: res.data.brand,
          userHasCollect: res.data.userHasCollect
        });

        if (res.data.userHasCollect == 1) {
          that.setData({
            'collectBackImage': that.data.hasCollectImage
          });
        } else {
          that.setData({
            'collectBackImage': that.data.noCollectImage
          });
        }

        WxParse.wxParse('goodsDetail', 'html', res.data.info.goods_desc, that);

        that.getGoodsRelated();
      }
    });

  },
  getGoodsRelated: function () {
    let that = this;
    util.request(api.GoodsRelated, { id: that.data.id }).then(function (res) {
      if (res.code == 200) {
        that.setData({
          relatedGoods: res.data,
        });
      }
    });

  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      id: parseInt(options.id)
      // id: 1181000
    });
    var that = this;
    this.getGoodsInfo();
    util.request(api.CartGoodsCount).then(function (res) {
      if (res.code == 200) {
        that.setData({
          cartGoodsCount: res.data.goodsCount
        });

      }
    });
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  switchAttrPop: function () {
    if (this.data.openAttr == false) {
      this.setData({
        openAttr: !this.data.openAttr
      });
    }
  },
  closeAttr: function () {
    this.setData({
      openAttr: false,
    });
  },
  addCannelCollect: function () {
    let that = this;
    //添加或是取消收藏
    util.request(api.CollectAddOrDelete, { typeId: 0, valueId: this.data.id }, "POST")
      .then(function (res) {
        let _res = res;
        if (_res.code == 200) {
          if (_res.data.type == 'add') {
            that.setData({
              'collectBackImage': that.data.hasCollectImage
            });
          } else {
            that.setData({
              'collectBackImage': that.data.noCollectImage
            });
          }

        } else {
          wx.showToast({
            image: '/static/images/icon_error.png',
            title: _res.message,
            mask: true
          });
        }
      });
  },
  openCartPage: function () {
    wx.switchTab({
      url: '/pages/cart/cart',
    });
  },
  addToCart: function () {
    var that = this;
    if (this.data.openAttr === false) {
      //打开规格选择窗口
      this.setData({
        openAttr: !this.data.openAttr
      });
    } else {

      //验证库存
      if (this.data.goods.goods_number < this.data.number) {
        //找不到对应的product信息，提示没有库存
        wx.showToast({
          image: '/static/images/icon_error.png',
          title: '库存不足',
          mask: true
        });
        return false;
      }

      //添加到购物车
      util.request(api.CartAdd, { goodsId: this.data.goods.id, number: this.data.number}, "POST")
        .then(function (res) {
          let _res = res;
          if (_res.code == 200) {
            wx.showToast({
              title: '添加成功'
            });
            that.setData({
              openAttr: !that.data.openAttr,
              cartGoodsCount: _res.data.goodsCount
            });
          } else {
            wx.showToast({
              image: '/static/images/icon_error.png',
              title: _res.message,
              mask: true
            });
          }

        });
    }

  },
  payNow: function () {
    var that = this;
    if (this.data.openAttr === false) {
      //打开规格选择窗口
      this.setData({
        openAttr: !this.data.openAttr
      });
    } else {

      //验证库存
      if (this.data.goods.goods_number < this.data.number) {
        //找不到对应的product信息，提示没有库存
        wx.showToast({
          image: '/static/images/icon_error.png',
          title: '库存不足',
          mask: true
        });
        return false;
      }
      wx.navigateTo({
        url: '../shopping/checkout/checkout?goodsId=' + this.data.goods.id + '&number=' + this.data.number
      })
    }

  },
  cutNumber: function () {
    this.setData({
      number: (this.data.number - 1 > 1) ? this.data.number - 1 : 1
    });
  },
  addNumber: function () {
    this.setData({
      number: this.data.number + 1
    });
  }
})