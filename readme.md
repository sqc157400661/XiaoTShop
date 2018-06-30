### 基于Laravel5.5 小T商城（微信小程序端）

+ 后台基于Laravel5.5开发
+ 前端资源来源于nideshop
+ 功能和数据库参考ecshop

**注意：当前版本功能还在完善中，暂时请勿商用。**

### 项目截图

![首页](https://xiaot-static.oss-cn-hangzhou.aliyuncs.com/XiaoT/show/Xiaot_img%20001.jpg)

![专题](https://xiaot-static.oss-cn-hangzhou.aliyuncs.com/XiaoT/show/Xiaot_img%20005.jpg)

![分类](https://xiaot-static.oss-cn-hangzhou.aliyuncs.com/XiaoT/show/Xiaot_img%20003.jpg)

![商品列表](https://xiaot-static.oss-cn-hangzhou.aliyuncs.com/XiaoT/show/Xiaot_img%20011.jpg)

![商品列表1](https://xiaot-static.oss-cn-hangzhou.aliyuncs.com/XiaoT/show/Xiaot_img%20012.jpg)

![商品详情](https://xiaot-static.oss-cn-hangzhou.aliyuncs.com/XiaoT/show/Xiaot_img%20002.jpg)

![购物车](https://xiaot-static.oss-cn-hangzhou.aliyuncs.com/XiaoT/show/Xiaot_img%20004.jpg)

![订单中心](https://xiaot-static.oss-cn-hangzhou.aliyuncs.com/XiaoT/show/Xiaot_img%20004.jpg)

![订单中心1](https://xiaot-static.oss-cn-hangzhou.aliyuncs.com/XiaoT/show/Xiaot_img%20009.jpg)

![订单中心2](https://xiaot-static.oss-cn-hangzhou.aliyuncs.com/XiaoT/show/Xiaot_img%20007.jpg)

![我的](https://xiaot-static.oss-cn-hangzhou.aliyuncs.com/XiaoT/show/Xiaot_img%20006.jpg)

![优惠券](https://xiaot-static.oss-cn-hangzhou.aliyuncs.com/XiaoT/show/Xiaot_img%20010.jpg)

### 功能列表
+ 首页
+ 分类首页、分类商品、新品首发、人气推荐商品页面
+ 商品详情页面，包含加入购物车、收藏商品、商品评论功能
+ 搜索功能
+ 专题功能
+ 品牌功能
+ 完整的购物流程，商品的加入、编辑、删除、批量选择，收货地址的选择，下单支付
+ 会员中心（订单、收藏、足迹、收货地址、意见反馈）
....

### 小程序前端项目结构
```
├─config
├─lib
│  └─wxParse　　　
├─pages
│  ├─auth
│  │  ├─login
│  │  ├─register
│  │  └─reset
│  ├─brand
│  ├─brandDetail
│  ├─cart
│  ├─catalog
│  ├─category
│  ├─comment
│  ├─goods
│  ├─hotGoods
│  ├─index
│  ├─logs
│  ├─newGoods
│  ├─pay
│  ├─search
│  ├─shopping
│  │  ├─address
│  │  ├─addressAdd
│  │  └─checkout
│  ├─topic
│  ├─topicDetail
│  └─ucenter
│      ├─address
│      ├─addressAdd
│      ├─collect
│      ├─coupon
│      ├─feedback
│      ├─footprint
│      ├─index
│      ├─order
│      └─orderDetail
├─static
│  └─images
└─utils
```

### 后端说明
+ 首页
+ 入口  域名/admin  用户名admin  密码admin


### 如何安装

1、下载项目到自己的项目目录

2、执行composer update 安装相关依赖

3、配置.env 为自己的环境参数

4、执行`php artisan XiaoT:install`


### 作者希望
+ 喜欢别忘了 Star
+ 微信号 sqc157400661
+ 交流 QQ 群：563359136
+ 打赏作者

<center>
<img src="https://xiaot-static.oss-cn-hangzhou.aliyuncs.com/XiaoT/minepay.jpg" width="16%" height="16%" />
</center>



### 还在开发的功能
+ 1、优惠券系统
+ 2、用户积分系统
