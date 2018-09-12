### 协作开发者
1、[@2lovecode](https://github.com/2lovecode)


**如有意向共同开发，请发邮箱157400661@qq.com,请附上个人说明以及意向描述，谢谢~**

### 基于Laravel5.5 小T商城（微信小程序端）

+ 后台基于Laravel5.5开发
+ 前端资源来源于nideshop
+ 功能和数据库参考ecshop

**注意：当前版本功能还在完善中，暂时请勿商用。**

### 项目截图

![首页](https://xiaot-static.oss-cn-hangzhou.aliyuncs.com/XiaoT/show/Xiaot_img%20111.jpg)

### 发行先行版1.0  计划发行时间2018.10.07 [可能会有波动]   计划每月升级一个版本

![首页](https://xiaot-static.oss-cn-hangzhou.aliyuncs.com/XiaoT/show/gh_667b391a9af7_344.jpg)

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

```
 # .env 数据库和redis配置略 可参考官方文档配置

 # .env 配置文件中 添加小程序
WECHAT_MINI_PROGRAM_APPID= 你的appid
WECHAT_MINI_PROGRAM_SECRET= 你的appsecret

# 小程序代码./applet/xiaoTShop/config/api.js
const ApiRootUrl ='你的域名/api/';

```

4、执行`php artisan XiaoT:install`


### 作者希望
+ 喜欢别忘了 Star
+ 有建议和想法可以联系我157400661@qq.com
+ 都不要赞助我 ╥﹏╥.

<center>
<img src="https://xiaot-static.oss-cn-hangzhou.aliyuncs.com/XiaoT/minepay.jpg" width="16%" height="16%" style="float:left;margin:-left:20px;" />
<img src="https://xiaot-static.oss-cn-hangzhou.aliyuncs.com/XiaoT/alipay.png" width="16%" height="16%" style="float:left;margin:-left:20px;" />
</center>



### 还在开发的功能
+ 1、优惠券系统
+ 2、用户积分系统
