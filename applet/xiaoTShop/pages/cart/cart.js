var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp();

Page({
    data: {
        cartGoods: [],
        cartTotal: {
            "goodsCount": 0,
            "goodsAmount": 0.00,
            "checkedGoodsCount": 0,
            "checkedGoodsAmount": 0.00
        },
        totalPrice:0,
        delBtnWidth: 120,
        isEditCart: false,
        checkedAllStatus: false,
        editCartList: []
    },
    getEleWidth: function(x) {
        try {
            var t = wx.getSystemInfoSync().windowWidth,
                e = 375 / (x / 2);
            return Math.floor(t / e);
        } catch (x) {
            return  ![];
        }
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
    
    },
    onReady: function() {
        // 页面渲染完成
        var x = this.getEleWidth(this.data.delBtnWidth);
        this.setData({
            delBtnWidth: x
        });
    },
    onShow: function() {
        // 页面显示
        this.getCartList();
        
    },
    onHide: function() {
        // 页面隐藏

    },
    onUnload: function() {
        // 页面关闭

    },
    getCartList: function() {
        let that = this;
        util.request(api.CartList).then(function(res) {
            if (res.code == 200) {
                console.log(res.data);
                that.setData({
                    cartGoods: res.data.cartList,
                    cartTotal: res.data.cartTotal
                });
            }

            that.setData({
                checkedAllStatus: that.isCheckedAll()
            });
        });
    },
    isCheckedAll: function() {
        var totalPrice = 0;
        this.data.cartGoods.map(function(element, index, array) {
            if (element.checked == true) {
                totalPrice += (element.retail_price*100*element.number)/100
            }
        });
        this.setData({
            totalPrice: totalPrice
        });
        //判断购物车商品已全选
        return this.data.cartGoods.every(function(element, index, array) {
            if (element.checked == true) {
                return true;
            } else {
                return false;
            }
        });
         
    },
    checkedItem: function(event) {
        let itemIndex = event.currentTarget.dataset.index;
        let that = this;
        console.log(that.data.cartGoods[itemIndex])
        if (!this.data.isEditCart) {

            util.request(api.CartChecked, {
                goodsIds: that.data.cartGoods[itemIndex].goods_id,
                productIds: that.data.cartGoods[itemIndex].product_id,
                isChecked: that.data.cartGoods[itemIndex].checked ? 0 : 1
            }, 'POST').then(function(res) {
                if (res.code == 200) {
                    that.setData({
                        cartGoods: res.data.cartList,
                        cartTotal: res.data.cartTotal
                    });
                }

                that.setData({
                    checkedAllStatus: that.isCheckedAll()
                });
            });
        } else {
            //编辑状态
            let tmpCartData = this.data.cartGoods.map(function(element, index, array) {
                if (index == itemIndex) {
                    element.checked = !element.checked;
                }

                return element;
            });
            that.setData({
                cartGoods: tmpCartData,
                checkedAllStatus: that.isCheckedAll(),
                'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
            });
        }
    },
    getCheckedGoodsCount: function() {
        let checkedGoodsCount = 0;
        this.data.cartGoods.forEach(function(v) {
            if (v.checked === true) {
                checkedGoodsCount += v.number;
            }
        });
        console.log(checkedGoodsCount);
        return checkedGoodsCount;
    },
    checkedAll: function() {
        let that = this;

        if (!this.data.isEditCart) {
            var goodsIds = this.data.cartGoods.map(function(v) {
                return v.goods_id;
            });
            var productIds = this.data.cartGoods.map(function(v) {
                return v.product_id;
            });
            util.request(api.CartChecked, {
                goodsIds: goodsIds.join(','),
                productIds: productIds.join(','),
                isChecked: that.isCheckedAll() ? 0 : 1
            }, 'POST').then(function(res) {
                if (res.code == 200) {
                    console.log(res.data);
                    that.setData({
                        cartGoods: res.data.cartList,
                        cartTotal: res.data.cartTotal
                    });
                }

                that.setData({
                    checkedAllStatus: that.isCheckedAll()
                });
            });
        } else {
            //编辑状态
            let checkedAllStatus = that.isCheckedAll();
            let tmpCartData = this.data.cartGoods.map(function(v) {
                v.checked = !checkedAllStatus;
                return v;
            });

            that.setData({
                cartGoods: tmpCartData,
                checkedAllStatus: that.isCheckedAll(),
                'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
            });
        }

    },
    editCart: function() {
        var that = this;
        if (this.data.isEditCart) {
            this.getCartList();
            this.setData({
                isEditCart: !this.data.isEditCart
            });
        } else {
            //编辑状态
            let tmpCartList = this.data.cartGoods.map(function(v) {
                v.checked = false;
                return v;
            });
            console.log(tmpCartList);
            this.setData({
                editCartList: this.data.cartGoods,
                cartGoods: tmpCartList,
                isEditCart: !this.data.isEditCart,
                checkedAllStatus: that.isCheckedAll(),
                'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
            });
        }

    },
    updateCart: function(goodsId, number, id) {
        let that = this;

        util.request(api.CartUpdate, {
            goodsId: goodsId,
            number: number,
            id: id
        }, 'POST').then(function(res) {
            if (res.code == 200) {
              that.setData({
                cartTotal: res.data.cartTotal
              });
            }

            that.setData({
                checkedAllStatus: that.isCheckedAll()
            });
        });

    },
    cutNumber: function(event) {
        let itemIndex = event.target.dataset.index;
        let cartItem = this.data.cartGoods[itemIndex];
        let number = (cartItem.number - 1 > 1) ? cartItem.number - 1 : 1;
        cartItem.number = number;
        this.setData({
            cartGoods: this.data.cartGoods
        });
        this.updateCart(cartItem.goods_id, number, cartItem.id);
    },
    addNumber: function(event) {
        let itemIndex = event.target.dataset.index;
        let cartItem = this.data.cartGoods[itemIndex];
        let number = cartItem.number + 1;
        cartItem.number = number;
        this.setData({
            cartGoods: this.data.cartGoods
        });
        this.updateCart(cartItem.goods_id, number, cartItem.id);

    },
    checkoutOrder: function() {
        //获取已选择的商品
        let that = this;

        var checkedGoods = this.data.cartGoods.filter(function(element, index, array) {
            if (element.checked == true) {
                return true;
            } else {
                return false;
            }
        });

        if (checkedGoods.length <= 0) {
            return false;
        }


        wx.navigateTo({
            url: '../to-pay-order/index'
        })
    },
    deleteCart: function() {
        //获取已选择的商品
        let that = this;

        let goodsIds = this.data.cartGoods.filter(function(element, index, array) {
            if (element.checked == true) {
                return true;
            } else {
                return false;
            }
        });

        if (goodsIds.length <= 0) {
            return false;
        }

        goodsIds = goodsIds.map(function(element, index, array) {
            if (element.checked == true) {
                return element.goods_id;
            }
        });


        util.request(api.CartDelete, {
            goodsIds: goodsIds.join(',')
        }, 'POST').then(function(res) {
            if (res.code == 200) {
                let cartList = res.data.cartList.map(v => {
                    v.checked = false;
                    return v;
                });
                that.setData({
                    cartGoods: cartList,
                    cartTotal: res.data.cartTotal
                });
            }

            that.setData({
                checkedAllStatus: that.isCheckedAll()
            });
        });
    },
    delItem: function(event) {
        //获取已选择的商品
        let that = this;
        wx.showModal({
            title: '提示',
            content: '您确定要删除么',
            success(res) {
                if (res.confirm) {
                    var cartId = event.target.dataset.item_id;
                    console.log(cartId)
                    util.request(api.CartDelete, {
                        cartId:cartId,
                        goodsIds: 'none'
                    }, 'POST').then(function(res) {
                        if (res.code == 200) {
                            let cartList = res.data.cartList.map(v => {
                                v.checked = false;
                                return v;
                            });
                            that.setData({
                                cartGoods: cartList,
                                cartTotal: res.data.cartTotal
                            });
                        }

                        that.setData({
                            checkedAllStatus: that.isCheckedAll()
                        });
                    });
                }
            }
        })
        
    },


    touchS: function(x) {
        if(1 == x.touches.length){
            this.setData({
                startX: x.touches[0].clientX
            })
        }
    },
    touchM: function(x) {
        var t = x.currentTarget.dataset.index;
        if (1 == x.touches.length) {
            var e = x.touches[0].clientX,i = this.data.startX - e,a = this.data.delBtnWidth,n = "";
            n = 'margin-left:-' + i + "px";
            if(i >= a) {
                n = 'left:-' + a + "px";
            }
            var r = this.data.cartGoods;
            r[parseInt(t)].left = n;
            this.setData({
                cartGoods: r
            });
        }
    },

    touchE: function(x) {
        var t = x.currentTarget.dataset.index;
        if (1 == x.changedTouches.length) {
            var e = x.changedTouches[0].clientX,i = this.data.startX - e,a = this.data.delBtnWidth,n = "",r=[];
            n = (i > a/2) ? "margin-left:-" + a + "px" : 'margin-left:0px';
            var r = this.data.cartGoods;
            r[parseInt(t)].left = n;
            this.setData({
                cartGoods: r
            });
        }
    },



})