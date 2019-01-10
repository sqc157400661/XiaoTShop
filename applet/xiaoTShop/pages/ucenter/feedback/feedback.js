var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');



var app = getApp();

Page({
    data: {
        FeedbackData: ['请选择反馈类型', '产品建议', '其他'],
        index: 0,
        currentNoteLen: 0,
        noteMaxLen: 300,
        content: '',
        user_contact: ''
    },
    bindPickerChange: function(e) {
        this.setData({
            index: e.detail.value
        })
    },
    onLoad: function() {
        let that = this;
        util.request(api.FeedBackData).then(function(res) {
            if (res.code == 200) {
                that.setData({
                    FeedbackData: res.data
                });
            }
        });

    },
    onReady: function() {

    },
    onShow: function() {

    },
    onHide: function() {
        // 页面隐藏

    },
    onUnload: function() {
        // 页面关闭
    },
    //字数限制
    bindWordLimit: function(e) {
        var value = e.detail.value,
            len = parseInt(value.length);
        if (len > this.data.noteMaxLen) return;
        this.setData({
            currentNoteLen: len, //当前字数
            content: value
            //limitNoteLen: this.data.noteMaxLen - len //剩余字数
        });
    },
    user_contact: function(e) {
        var value = e.detail.value
        this.setData({
            user_contact: value
        });
    },
    submit: function function_name() {
        let that = this;

        if (!that.data.index) {
            wx.showToast({
                image: '/static/images/icon_error.png',
                title: '请选择类型',
                mask: true
            });
            return;
        }

        if (!that.data.content) {
            wx.showToast({
                image: '/static/images/icon_error.png',
                title: '请填写您的反馈',
                mask: true
            });
            return;
        }

        util.request(api.FeedBackHandle, {
            msg_type: this.data.index,
            msg_content: this.data.content,
            user_contact: that.data.user_contact
        }, "POST").then(function(res) {
            if (res.code == 200) {
                wx.showToast({
                    title: res.message
                });
                setTimeout(function() {
                    wx.reLaunch({
                        url: '/pages/ucenter/index/index',
                    })
                }, 1000)
            }
        });

    }
})