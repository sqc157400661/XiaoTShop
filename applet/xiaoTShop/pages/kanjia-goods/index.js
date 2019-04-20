var app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');


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
        bargain:{},
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
        products:[],
        checked_sp_item_ids:[],
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
        util.request(api.BargainGoodsDetail, {
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
                    bargain:res.data.bargain,
                    userHasCollect: res.data.userHasCollect
                });
                WxParse.wxParse('goodsDetail', 'html', res.data.info.goods_desc, that);
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
    readyKanjia:function(){
        
    },
    goKanjia: function() {
        var that = this;
        if (this.data.hideShopPopup == 1) {
            //打开规格选择窗口
            this.setData({
                shopType: 'tobuy'
            }),
            this.bindGuiGeTap();
        } else {
            var product_id = 0;
            var product = this.getProductByCheckedSpecIds()
            if(product !== true && product.length < 1){
                wx.showToast({
                    image: '/static/images/icon_error.png',
                    title: '请选择商品规格！',
                    mask: true
                });
                return false;
            }else if(product.id){
               product_id =  product.id
            }
            
            //验证限购
            if (this.data.goods.limit_num < this.data.buyNumber) {
                wx.showToast({
                    image: '/static/images/icon_error.png',
                    title: '数量超限',
                    mask: true
                });
                return false;
            }
            //验证库存
            if (this.data.goods.goods_number < this.data.buyNumber) {
                //找不到对应的product信息，提示没有库存
                wx.showToast({
                    image: '/static/images/icon_error.png',
                    title: '库存不足',
                    mask: true
                });
                return false;
            }
            wx.navigateTo({
                url: '/pages/kanjia/index?goodsId=' + that.data.goods.id + '&number=' + that.data.buyNumber + '&product_id=' + product_id+ '&bargainId=' + that.data.id
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
        var checked_sp_item_ids = this.data.checked_sp_item_ids;
        var sp_item_id = x.currentTarget.dataset.sp_item_id;
        var sp_id = x.currentTarget.dataset.sp_id;
      
        if(typeof checked_sp_item_ids[sp_id] == 'undefined'){
              checked_sp_item_ids[sp_id] = {};  
        }
        if(typeof checked_sp_item_ids[sp_id][sp_item_id] !='undefined' &&checked_sp_item_ids[sp_id][sp_item_id] == 'checked'){
            checked_sp_item_ids[sp_id][sp_item_id] = 'nocheck';
        }else{
            for(var i in checked_sp_item_ids[sp_id]){
                checked_sp_item_ids[sp_id][i] = 'nocheck';
            }
            checked_sp_item_ids[sp_id][sp_item_id] = 'checked';
        }
        this.setData({
            checked_sp_item_ids: checked_sp_item_ids
        });
        var product = this.getProductByCheckedSpecIds();
    },
    getProductByCheckedSpecIds(){
        var goods = this.data.goods;
        var products = this.data.products;
        if(products.length<1){
            return true;
        }
        var checked_sp_item_ids = this.data.checked_sp_item_ids;
        var checked_sp_item_ids = this.data.checked_sp_item_ids;
        var checkedIds = [];
        for(var i in checked_sp_item_ids){
            if(checked_sp_item_ids[i]){
                for(var j in checked_sp_item_ids[i]){
                    if(checked_sp_item_ids[i][j] == 'checked'){
                        checkedIds.push(j);
                    }
                }
            }
        }
        checkedIds = this.quickSort(checkedIds);
        var checkedIdsStr= checkedIds.join("_");
        var checkedProduct = [];
        for(var k in products){
            if(products[k].goods_spec_item_ids == checkedIdsStr){
                checkedProduct = products[k];
                goods.retail_price = checkedProduct.retail_price;
                goods.goods_number = checkedProduct.goods_number;
                this.setData({
                    goods: goods
                });
            }
        }
        return  checkedProduct;
    },
    quickSort(arr){
        //如果数组长度小于等于1，则返回数组本身
        if(arr.length<=1){
            return arr;
        }
        //定义中间值的索引
        var index = Math.floor(arr.length/2);
        //取到中间值
        var temp = arr.splice(index,1);
        //定义左右部分数组
        var left = [];
        var right = [];
        for(var i=0;i<arr.length;i++){
            //如果元素比中间值小，那么放在左边，否则放右边
            if(arr[i]<temp){
                left.push(arr[i]);
            }else{
                right.push(arr[i]);
            }
        }
        return this.quickSort(left).concat(temp,this.quickSort(right));
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