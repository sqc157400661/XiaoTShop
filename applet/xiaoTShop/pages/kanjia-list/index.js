const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
//获取应用实例
const app = getApp()
Page({
    data: {
        kanjialist: [],
        wxlogin: 0, // ++ 是否登陆
    },
    onShareAppMessage: function() {
        return {
            title: 'XiaoTShop',
            desc: 'XiaoT科技商城',
            path: '/pages/index/index'
        }
    },
    swiperchange: function(x) {
        let that = this;
        that.setData({
            swiperCurrent: x.detail.current,
        });
    },
    getListData: function() {
        let that = this;
        util.request(api.BargainList).then(function(res) {
            if (res.code == 200) {
                that.setData({
                    kanjialist: res.data,
                });
            }
        });
    },
    onLoad: function(options) {
        this.getListData();
    },
    onReady: function() {
        // 页面渲染完成
    },
    onShow: function() {
        var token = wx.getStorageSync('token');
        if(!token){
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
    toDetail: function(x,isTab) {
        var bargain_id = x.currentTarget.dataset.bargain_id;
        wx.navigateTo({
            url: '/pages/kanjia-goods/index?id=' + bargain_id
        });
    },
   
})