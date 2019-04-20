const ApiRootUrl ='你的域名/api/';

var version = '/v2';

module.exports = {
    IndexUrl: ApiRootUrl + 'index', //首页数据接口 --
    ProjectTypeList: ApiRootUrl + 'project-type-json', //技能类型 ok
    ProjectGood: ApiRootUrl + 'project-goods', // 技能组成商品 ok
    GoodsTransform: ApiRootUrl + 'project-goods-transform', // 转换成商城商品

    TopicList: ApiRootUrl + 'topic-list', //专题列表 ok
    TopicDetail: ApiRootUrl + 'topic-detail', //专题详情  半ok 评论相关没有处理
    TopicRelated: ApiRootUrl + 'topic-related', //相关专题 --


    CatalogList: ApiRootUrl + 'catalog-index', //分类目录全部分类数据接口 ok
    CatalogCurrent: ApiRootUrl + 'catalog-current', //分类目录当前分类数据接口 ok

    GoodsCount: ApiRootUrl + 'goods-count', //统计商品总数
    GoodsList: ApiRootUrl + 'goods-list', //获得商品列表
    GoodsCategory: ApiRootUrl + 'goods-category', //获得分类数据
    GoodsDetail: ApiRootUrl + 'goods-detail', //获得商品的详情
    GoodsRelated: ApiRootUrl + 'goods-related', //商品详情页的关联商品（大家都在看）
    GoodsNew: ApiRootUrl + 'goods-new', //新品
    GoodsHot: ApiRootUrl + 'goods-hot', //热门

    CollectAddOrDelete: ApiRootUrl + 'collect-addordelete', //添加或取消收藏
    CollectList: ApiRootUrl + 'collect-list', //收藏列表

    CartList: ApiRootUrl + 'cart-index', //获取购物车的数据
    CartAdd: ApiRootUrl + 'cart-add', // 添加商品到购物车
    CartUpdate: ApiRootUrl + 'cart-update', // 更新购物车的商品
    CartDelete: ApiRootUrl + 'cart-delete', // 删除购物车的商品
    CartChecked: ApiRootUrl + 'cart-checked', // 选择或取消选择商品
    CartGoodsCount: ApiRootUrl + 'cart-goodscount', // 获取购物车商品件数

    CommentList: ApiRootUrl + 'comment-list', //评论列表
    CommentCount: ApiRootUrl + 'comment-count', //评论总数
    CommentPost: ApiRootUrl + 'comment-post', //发表评论

    CartCheckout: ApiRootUrl + 'cart-checkout', // 下单前信息确认
    PayNow: ApiRootUrl + 'pay-now', // 立即购买

    RegionList: ApiRootUrl + 'region-list', //获取区域列表
    AddressList: ApiRootUrl + 'address-list', //收货地址列表
    AddressDetail: ApiRootUrl + 'address-detail', //收货地址详情
    AddressSave: ApiRootUrl + 'address-save', //保存收货地址
    AddressDelete: ApiRootUrl + 'address-delete', //删除收货地址


    OrderSubmit: ApiRootUrl + 'order-submit', // 提交订单
    PayPrepayId: ApiRootUrl + 'pay-prepay', //获取微信统一下单prepay_id

    AuthLoginByWeixin: ApiRootUrl + 'login', //微信登录

    OrderList: ApiRootUrl + 'order-list', //订单列表
    OrderDetail: ApiRootUrl + 'order-detail', //订单详情
    OrderCancel: ApiRootUrl + 'order-cancel', //取消订单
    OrderExpress: ApiRootUrl + 'order-express', //物流详情

    FeedBackData: ApiRootUrl + 'feedback-datalist', // 反馈选项
    FeedBackHandle: ApiRootUrl + 'feedback-handle', // 反馈

    BrandDetail: ApiRootUrl + 'brand-detail', //品牌详情

    FootprintList: ApiRootUrl + 'footprint-list', //足迹列表


    MyCoupon: ApiRootUrl + 'coupon-mine', //我的优惠券
    CouponCenter: ApiRootUrl + 'coupon-center', //领券中心 卡券列表
    GetCoupon: ApiRootUrl + 'coupon-get', //领券

    BargainList: ApiRootUrl + 'bargain-list', // 砍价列表
    BargainGoodsDetail: ApiRootUrl + 'bargain-goods-detail', // 砍价商品详情
    BargainDetail: ApiRootUrl + 'bargain-detail', // 砍价详情
    BargainHelpDetail: ApiRootUrl + 'bargain-help-detail', // 助力详情
    BargainHelp: ApiRootUrl + 'bargain-help', // 发起助力


    Getwxacodeunlimit: ApiRootUrl + 'getwxacodeunlimit', // 小程序二维码


    /*--------------------------------------------------------------------------------------*/



    BrandList: ApiRootUrl + 'brand/list', //品牌列表

    SearchIndex: ApiRootUrl + 'search/index', //搜索页面数据
    SearchResult: ApiRootUrl + 'search/result', //搜索数据
    SearchHelper: ApiRootUrl + 'search/helper', //搜索帮助
    SearchClearHistory: ApiRootUrl + 'search/clearhistory', //搜索帮助


    FootprintDelete: ApiRootUrl + 'footprint/delete', //删除足迹
};