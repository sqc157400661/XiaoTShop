var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
    data: {
        navList: [],
        categoryList: [],
        currentCategory: {},
        scrollLeft: 0,
        scrollTop: 0,
        goodsCount: 0,
        scrollHeight: 0,
        searchInput: false,
        noCancel: true,
        noGoods: false,
        searchData: [],
        keywrod: '',
        currentSortType: 'default',
        currentSortOrder: '',
        page: 1,
        size: 20,
        currentSortType: 'id',
        currentSortOrder: 'desc',
        categoryID: 0
    },
    onLoad: function(options) {
        
        this.getCatalog();
        var id = options.id;
        if (id) {
            this.getCurrentCategory(id);
        }
    },
    getCatalog: function() {
        //CatalogList
        let that = this;
        wx.showLoading({
            title: '加载中...',
        });
        util.request(api.CatalogList).then(function(res) {
            console.log(res)
            that.setData({
                navList: res.data.categoryList,
                currentCategory: res.data.currentCategory
            });
            wx.hideLoading();
        });
        util.request(api.GoodsCount).then(function(res) {
            that.setData({
                goodsCount: res.data.goodsCount
            });
        });

    },
    getCurrentCategory: function(id) {
        let that = this;
        util.request(api.CatalogCurrent, {
                id: id
            })
            .then(function(res) {
                that.setData({
                    currentCategory: res.data
                });
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
    },
    getList: function() {
        var that = this;
        util.request(api.ApiRootUrl + 'api/catalog/' + that.data.currentCategory.cat_id)
            .then(function(res) {
                that.setData({
                    categoryList: res.data,
                });
            });
    },
    switchCate: function(event) {
        var that = this;
        var currentTarget = event.currentTarget;
        if (this.data.currentCategory.id == event.currentTarget.dataset.id) {
            return false;
        }

        this.getCurrentCategory(event.currentTarget.dataset.id);
    },
    searchFocus: function() {
        this.setData({
            noCancel: false,
            searchInput: true
        });
    },
    searchClose: function() {
        this.setData({
            noCancel: true,
            searchInput: false
        });
    },

    searchConfirm(event) {
        this.getSearchResult(event.detail.value);
    },

    getSearchResult(keyword) {
        this.setData({
            keyword: keyword,
            page: 1,
            categoryID: 0,
            searchData: []
        });
        this.searchGoods();
    },

    searchGoods: function() {
        let that = this;
        util.request(api.GoodsList, {
            keyword: that.data.keyword,
            page: that.data.page,
            size: that.data.size,
            sort: that.data.currentSortType,
            order: that.data.currentSortOrder,
            categoryId: that.data.categoryID
        }).then(function(res) {
            if (res.code == 200) {
                console.log(res.data.length);
                var noGoodsTmp = false;
                if (res.data.length == 0) {
                    noGoodsTmp = true;
                }
                that.setData({
                    searchData: res.data,
                    noGoods: noGoodsTmp
                });
            }
        });
    },
    toDetailsTap: function(event) {
        console.log(event);
        wx.redirectTo({
            url: '/pages/goods/goods?id=' + event.currentTarget.dataset.id,
        });
    }
})