var app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');




var x = [ "OiKWA", "request", "urls", "goodsDetail", "basicInfo", "inviter_id_", "share", "tHcrw", "qflhA", "showModal", "购买数量不能为0！", "iphone", "YIFrk", "DcYRT", "buyNumber", "/banner/list", "beBQV", "OwTDm", "gTBMD", "picUrl", "getStorageSync", "mallName", "uid", "getStorage", "shopCarInfo", "yrjzi", "/shop/goods/detail", "KJrTp", "canSubmit", "请选择商品规格！", "properties", "SVWXV", "name", "selectSize", "minPrice", "pingtuanPrice", "vOnhQ", "videoId", "stores", "html", "content", "goPingtuan", "goPingList", "reputation", "/shop/goods/pingtuan/set", "kqzdy", "MWSPp", "YHKfz", "currentTarget", "dataset", "propertyindex", "childsCurGoods", "active", "YindB", "MYsGc", "Elyng", "bLytM", "unGcr", "buliduBuyNowInfo", "navigateTo", "pingtuan", "bindGuiGeTap", "addShopCar", "tobuy", "/shop/goods/pingtuan/open", "token", "wRnRC", "WDgch", "fPaFh", "siteInfo", "url", "subDomain", "lAhSQ", "请先选择规格尺寸哦~", "buyNumMin", "ncVOy", "buyNumMax", "/pages/pingtuan/index?id=", "&uid=", "&gid=", "保存成功", "success", "KifEI", "AKpbJ", "HCUWT", "saveImageToPhotosAlbum", "codeimg", "ykPJB", "uOGAc", "UVdPM", "ThJFs", "price", "eRhZo", "iJbaT", "JPVnb", "收藏成功", "../../images/active.png", "EDghJ", "uXAGD", "msg", "bulidShopCarInfo", "closePopupTap", "加入购物车成功", "xnYRi", "vphWw", "FbhWq", "goodsId", "pingtuanId", "pic", "propertyChildIds", "label", "propertyChildNames", "selectptPrice", "left", "number", "logistics", "weight", "shopList", "HMIZL", "gSzDN", "buyNowInfo", "/pages/to-pay-order/index?orderType=buyNow", "showLoading", "商品准备中...", "dRRWN", "getVideoSrc", "iJHaS", "xYwuh", "YQcLH", "selectSizePrice", "logisticsType", "bAYir", "bulidupingTuanInfo", "PingTuanInfo", "/pages/to-pay-order/index?orderType=buyPT", "准备拼团中...", "logisticsId", "FkhxI", "SRMqU", "jqsZQ", "ptuanCt", "BuoBD", "tZeKf", "FCCpH", "zSxSG", "splice", "NziVZ", "HTQUm", "gVbmx", "/pages/index/index", "tqJfD", "VjhgN", "/pages/goods-details/index?id=", "&inviter_id=", "&share=1", "/shop/goods/reputation", "dJafL", "wCwdC", "../../images/error.png", "HAeCZ", "BTdzK", "HHldj", "VfMxj", "oRCxU", "/shop/goods/fav/delete", "取消收藏", "NRNyu", "gyYfz", "JQaWP", "nHits", "QIoGw", "UFJwh", "/media/video/detail", "zhgSO", "ZkJcO", "switchTab", "curHdIndex", "curBdIndex", "stopPullDownRefresh", "QyGGm", "温馨提示", "需要您的授权，才能正常使用哦～", "kApUJ", "CpZbt", "wxParse", "article", "/user/wxapp/register/complex", "zqNzr", "DjsZT", "reLaunch", "muDeR", "UESSH", "生成中...", "/qrcode/wxa/unlimit", "pages/goods-details/index", "uoQHj", "ZJzhN", "xoCei", "/shop/goods/price", "downloadFile", "Dnfyd", "hdXQc", "BFAXI", "../../wxParse/wxParse.js", "选择规格：", "detail", "current", "otmUe", "length", "WScDJ", "login", "showToast", "授权成功", "globalData", "usinfo", "split", "AbXyN", "push", "ETbRr", "data", "code", "setData", "fdMp4", "JowPp", "wTRNh", "shopNum", "lnZAP", "lHhKU", "setStorage", "hideLoading", "tempFilePath", "PNOnv", "ZRdHw", "scene", "Cxmsp", "inviter_id" ];

!function(x, t) {
    !function(t) {
        for (;--t; ) x.push(x.shift());
    }(++t);
}(x, 203);

var t = function(t, e) {
    return x[t -= 0];
};


Page({
    data: {
        id: 0,
        swiperCurrent: 0, // ++
        autoplay: 1,
        interval: 1e4, // ++
        duration: 500,
        hasMoreSelect: 0,
        selectSize: '选择规格：',
        selectSizePrice: 0,
        cartGoodsCount: 0,
        buyNumber: 1,
        buyNumMin: 1,
        buyNumMax: 0,
        favicon: 0,
        selectptPrice: 0,
        propertyChildIds: "",
        propertyChildNames: "",
        canSubmit: ![],
        shopCarInfo: {},
        shopType: "addShopCar",
        wxlogin: 1, // ++ 是否登陆
        sharebox:1,
        sharecode:1,
        hideShopPopup:1,
        share:0,// 是否是分享
        tabArr: {
            curHdIndex: 0,
            curBdIndex: 0
        },
        goods: {},
        products:{},
        gallery: [],
        attribute: [],
        issueList: [],
        comment: [],
        brand: {},
        userHasCollect: 0,
    },
    swiperchange: function(x) {
        let that = this;
        that.setData({
            swiperCurrent: x.detail.current,
        });
    },
    gohome: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    tabFun: function(x) {
        var e = x.target.dataset.id, i = {};
        i['curHdIndex'] = e, i['curBdIndex'] = e, this.setData({
            tabArr: i
        });
    },
    getGoodsInfo: function() {
        let that = this;
        util.request(api.GoodsDetail, {
            id: that.data.id
        }).then(function(res) {
            if (res.code == 200) {
                that.setData({
                    goods: res.data.info,
                    buyNumMax:res.data.info.goods_number,
                    products:res.data.info.products,
                    gallery: res.data.info.list_pic_url,
                    attribute: res.data.attribute,
                    issueList: res.data.issue,
                    comment: res.data.comment,
                    brand: res.data.brand,
                    userHasCollect: res.data.userHasCollect
                });
                WxParse.wxParse('goodsDetail', 'html', res.data.info.goods_desc, that);

                // that.getGoodsRelated(); 相关商品
            }
        });

    },

    getGoodsRelated: function() {
        let that = this;
        util.request(api.GoodsRelated, {
            id: that.data.id
        }).then(function(res) {
            if (res.code == 200) {
                that.setData({
                    relatedGoods: res.data,
                });
            }
        });

    },

    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.setData({
            id: parseInt(options.id)
            // id: 1181000
        });
        var that = this;
        this.getGoodsInfo();
        util.request(api.CartGoodsCount).then(function(res) {
            if (res.code == 200) {
                that.setData({
                    cartGoodsCount: res.data.goodsCount
                });

            }
        });
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

    },
    onHide: function() {
        // 页面隐藏

    },
    onUnload: function() {
        // 页面关闭

    },
    addCannelCollect: function() {
        let that = this;
        //添加或是取消收藏
        util.request(api.CollectAddOrDelete, {
                typeId: 0,
                valueId: this.data.id
            }, "POST")
            .then(function(res) {
                let _res = res;
                if (_res.code == 200) {
                    if (_res.data.type == 'add') {
                        that.setData({
                            userHasCollect: 1
                        });
                    } else {
                        that.setData({
                            userHasCollect: 0
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
    goShopCar: function() {
        wx.switchTab({
            url: '/pages/cart/cart',
        });
    },
    addToCart: function() {
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
            util.request(api.CartAdd, {
                    goodsId: this.data.goods.id,
                    number: this.data.number
                }, "POST")
                .then(function(res) {
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
    payNow: function() {
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


    bindGuiGeTap: function() {
        this.setData({
            hideShopPopup: 0
        });
    },
    closePopupTap: function() {
        this.setData({
            hideShopPopup: 1
        });
    },
    numJianTap: function() {
        if (this.data.buyNumber > this.data.buyNumMin) {
            var x = this.data.buyNumber;
            x--; 
            this.setData({
                buyNumber: x
            });
        }
    },
    numJiaTap: function() {
        if (this.data.buyNumber < this.data.buyNumMax) {
            var x = this.data.buyNumber;
            x++, this.setData({
                buyNumber: x
            });
        }
    },
    labelItemTap: function(x) {
        for (var e = this, i = e.data.goodsDetail.properties[x.currentTarget.dataset.propertyindex].childsCurGoods, s = 0; s < i.length; s++) 
            e.data.goodsDetail.properties[x.currentTarget.dataset.propertyindex].childsCurGoods[s].active = ![];
        e.data.goodsDetail.properties[x.currentTarget.dataset.propertyindex].childsCurGoods[x.currentTarget.dataset.propertychildindex].active = !![];
        for (var o = e.data.goodsDetail.properties.length, n = 0, d = "", r = "", s = 0; s < e.data.goodsDetail.properties.length; s++) if (t("0x73") === t("0x73")) {
            i = e.data.goodsDetail.properties[s].childsCurGoods;
            for (var c = 0; c < i.length; c++) if ("kvaLC" !== t("0x74")) {
                if (i[c].active) if ("HCUWT" === t("0x75")) n++, d = d + e.data.goodsDetail.properties[s].id + ":" + i[c].id + ",", 
                r = r + e.data.goodsDetail.properties[s].name + ":" + i[c].name + "  "; else {
                    var u = this;
                    wx.saveImageToPhotosAlbum({
                        filePath: u.data.codeimg,
                        success: function(x) {
                            wx.showToast({
                                title: '保存成功',
                                icon: "success",
                                duration: 2e3
                            });
                        }
                    }), u.setData({
                        sharecode: !![]
                    });
                }
            } else e.setData({
                iphone: "iphone"
            });
        } else 0 == res.data.code && e.setData({
            pingtuan: res.data.data
        });
        var h = ![];
        if (o == n && (t("0x78") !== t("0x79") ? h = !![] : this.setData({
            sharebox: ![]
        })), h) if (t("0x7a") === t("0x7a")) wx.request({
            url: a.siteInfo[t("0x67")] + a.siteInfo.subDomain + "/shop/goods/price",
            data: {
                goodsId: e.data.goodsDetail.basicInfo.id,
                propertyChildIds: d
            },
            success: function(x) {
                "nAlwX" !== t("0x7b") ? e.setData({
                    selectSizePrice: x.data.data.price,
                    propertyChildIds: d,
                    propertyChildNames: r,
                    buyNumMax: x.data.data.stores,
                    buyNumber: x.data.data.stores > 0 ? 1 : 0,
                    selectptPrice: x.data.data.pingtuanPrice
                }) : h = !![];
            }
        }); else {
            var l = this;
            l.goPingtuan(), l.goPingList(), wx.stopPullDownRefresh();
        }
        this.setData({
            goodsDetail: e.data.goodsDetail,
            canSubmit: h
        });
    },

    getShareBox: function() {
        this.setData({
            sharebox: ![]
        });
    },
    getcode: function() {
        var x = this;
        wx.showLoading({
            title: '生成中...'
        }), wx.request({
            url: a.globalData.urls + '/qrcode/wxa/unlimit',
            data: {
                scene: "i=" + x.data.goodsDetail.basicInfo.id + ",u=" + a.globalData.uid + ",s=1",
                page: 'pages/goods-details/index',
                expireHours: 1
            },
            success: function(e) {
                if (t("0xe4") !== t("0xe4")) {
                    for (var i = {}, s = 0; s < dilist.length; s++) i[dilist[s][0]] = dilist[s][1];
                    var o = i.i, n = i.u, d = i.s;
                    x.setData({
                        id: o
                    }), n && wx.setStorage({
                        key: 'inviter_id_' + o,
                        data: n
                    }), d && x.setData({
                        share: d
                    });
                } else 0 == e.data.code && (t("0xe5") === t("0xe6") ? wx.request({
                    url: a.siteInfo.url + a.siteInfo.subDomain + t("0xe7"),
                    data: {
                        goodsId: x.data.goodsDetail.basicInfo.id,
                        propertyChildIds: propertyChildIds
                    },
                    success: function(e) {
                        x.setData({
                            selectSizePrice: e.data.data.price,
                            propertyChildIds: propertyChildIds,
                            propertyChildNames: propertyChildNames,
                            buyNumMax: e.data.data.stores,
                            buyNumber: e.data.data.stores > 0 ? 1 : 0,
                            selectptPrice: e.data.data.pingtuanPrice
                        });
                    }
                }) : wx.downloadFile({
                    url: e.data.data,
                    success: function(e) {
                        t("0xe9") !== t("0xea") ? (wx[t("0x1a")](), x.setData({
                            codeimg: e.tempFilePath,
                            sharecode: ![],
                            sharebox: !![]
                        })) : buyNowInfo.shopList = [];
                    }
                }));
            }
        });
    },
    savecode: function() {
        var x = this;
        wx.saveImageToPhotosAlbum({
            filePath: x.data.codeimg,
            success: function(e) {
                t("0xeb") === t("0xeb") ? wx.showToast({
                    title: '保存成功',
                    icon: t("0x72"),
                    duration: 2e3
                }) : 0 == e.data.code ? (x.setData({
                    pingtuanOpenId: e.data.data.id,
                    shopType: 'pingtuan'
                }), x.bindGuiGeTap()) : wx.showModal({
                    title: "错误",
                    content: e.data.msg,
                    showCancel: ![]
                });
            }
        }), x.setData({
            sharecode: !![]
        });
    },
    closeshare: function() {
        this.setData({
            sharebox: !![],
            sharecode: !![]
        });
    }


})