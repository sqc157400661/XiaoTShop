var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
    data: {
        // text:"这是一个页面"
        projectTypeList: [],
        scrollHeight: 0,
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    scrollHeight: res.windowHeight
                });
            }
        });
        this.getProjectTypeList()
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
    getProjectTypeList: function() {
        var that = this;
        util.request(api.ProjectTypeList, {})
            .then(function(res) {
                console.log(res)
                that.setData({
                    projectTypeList: res.data,
                });
            });
    },
    onUnload: function() {
        // 页面关闭
    },
    jump: function(event) {
        var jurl = event.currentTarget.dataset.url
        wx.navigateTo({
            url: jurl,
        })
    },
})