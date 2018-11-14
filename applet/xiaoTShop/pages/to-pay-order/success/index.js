var e = [ "order", "request", "urls", "/user/shipping-address/default", "token", "vynjO", "data", "code", "gLHEh", "balance", "/order/pay", "POST", "wxpay", "/pages/order-list/index?currentType=0&share=1", "currentTarget", "dataset", "/user/amount", "IQafG", "showModal", "优惠不等人，商品一旦错过就不存在了哦～", "忍痛放弃", "#999999", "#b5272d", "cancel", "ZHEnv", "无法获取用户资金信息", "fdYIH", "application/x-www-form-urlencoded", "qGhFl", "uXUJx", "bwGZX", "rfJIq", "我在想想", "oYgsp", "gJqTv", "yAYcF", "../../../utils/pay.js", "globalData", "iphone", "dreHb", "redirectTo", "/pages/order-list/index?currentType=1&share=1", "setData", "TTYyP", "money" ];

!function(e, x) {
    !function(x) {
        for (;--x; ) e.push(e.shift());
    }(++x);
}(e, 486);

var x = function(x, r) {
    return e[x -= 0];
}, r = require(x("0x0")), t = getApp();

Page({
    data: {},
    onLoad: function(e) {
        var a = this;
        t[x("0x1")][x("0x2")] == !![] && ("dreHb" !== x("0x3") ? wx[x("0x4")]({
            url: x("0x5")
        }) : a[x("0x6")]({
            iphone: x("0x2")
        })), e && ("TTYyP" === x("0x7") ? a[x("0x6")]({
            money: e[x("0x8")],
            order: e[x("0x9")],
            id: e.id
        }) : res.cancel && wx[x("0x4")]({
            url: "/pages/order-list/index?currentType=0&share=1"
        })), wx[x("0xa")]({
            url: t[x("0x1")][x("0xb")] + x("0xc"),
            data: {
                token: t.globalData[x("0xd")]
            },
            success: function(e) {
                "vynjO" === x("0xe") ? 0 == e[x("0xf")][x("0x10")] && (x("0x11") === x("0x11") ? a.setData({
                    curAddressData: e[x("0xf")][x("0xf")]
                }) : (money -= e[x("0xf")][x("0xf")][x("0x12")], money <= 0 ? wx[x("0xa")]({
                    url: t[x("0x1")].urls + x("0x13"),
                    method: x("0x14"),
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        token: t[x("0x1")][x("0xd")],
                        orderId: orderId
                    },
                    success: function(e) {
                        wx.redirectTo({
                            url: x("0x5")
                        });
                    }
                }) : r[x("0x15")](t, money, orderId, x("0x5")))) : wx[x("0x4")]({
                    url: x("0x16")
                });
            }
        });
    },
    toPayTap: function(e) {
        var a = this, o = e[x("0x17")][x("0x18")].id, n = e[x("0x17")][x("0x18")][x("0x8")];
        wx.request({
            url: t.globalData[x("0xb")] + x("0x19"),
            data: {
                token: t[x("0x1")][x("0xd")]
            },
            success: function(c) {
                x("0x1a") !== x("0x1a") ? wx[x("0x1b")]({
                    title: "",
                    content: x("0x1c"),
                    cancelText: x("0x1d"),
                    cancelColor: x("0x1e"),
                    confirmText: "我在想想",
                    confirmColor: x("0x1f"),
                    success: function(e) {
                        e[x("0x20")] && wx[x("0x4")]({
                            url: x("0x16")
                        });
                    }
                }) : 0 == c[x("0xf")][x("0x10")] ? "ZHEnv" !== x("0x21") ? wx[x("0x1b")]({
                    title: "错误",
                    content: x("0x22"),
                    showCancel: ![]
                }) : (n -= c[x("0xf")][x("0xf")].balance) <= 0 ? x("0x23") !== x("0x23") ? r[x("0x15")](t, n, o, x("0x5")) : wx[x("0xa")]({
                    url: t[x("0x1")].urls + x("0x13"),
                    method: x("0x14"),
                    header: {
                        "content-type": x("0x24")
                    },
                    data: {
                        token: t[x("0x1")][x("0xd")],
                        orderId: o
                    },
                    success: function(r) {
                        x("0x25") === x("0x26") ? a.setData({
                            money: e[x("0x8")],
                            order: e[x("0x9")],
                            id: e.id
                        }) : wx.redirectTo({
                            url: x("0x5")
                        });
                    }
                }) : "NqFsq" !== x("0x27") ? r[x("0x15")](t, n, o, x("0x5")) : 0 == c[x("0xf")][x("0x10")] && a[x("0x6")]({
                    curAddressData: c[x("0xf")].data
                }) : "rfJIq" !== x("0x28") ? a[x("0x6")]({
                    curAddressData: c[x("0xf")].data
                }) : wx[x("0x1b")]({
                    title: "错误",
                    content: x("0x22"),
                    showCancel: ![]
                });
            }
        });
    },
    closeOreder: function() {
        wx.showModal({
            title: "",
            content: "优惠不等人，商品一旦错过就不存在了哦～",
            cancelText: x("0x1d"),
            cancelColor: "#999999",
            confirmText: x("0x29"),
            confirmColor: x("0x1f"),
            success: function(e) {
                x("0x2a") !== x("0x2b") ? e.cancel && (x("0x2c") === x("0x2c") ? wx.redirectTo({
                    url: "/pages/order-list/index?currentType=0&share=1"
                }) : that[x("0x6")]({
                    iphone: x("0x2")
                })) : wx.request({
                    url: t[x("0x1")].urls + x("0x13"),
                    method: x("0x14"),
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        token: t.globalData[x("0xd")],
                        orderId: orderId
                    },
                    success: function(e) {
                        wx[x("0x4")]({
                            url: x("0x5")
                        });
                    }
                });
            }
        });
    }
});