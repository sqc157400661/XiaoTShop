

### 基于Laravel5.5 小T商城（微信小程序端）
### 说明
是小程序电商项目，因为鄙人不懂UI和审美，效果配图选不够专业还请见谅
##项目概述
+ 基于Laravel5.5开发
+ 产品名称：XiaoTShop
+ 项目代码：https://github.com/sqc157400661/XiaoTShop

## 运行环境
- Nginx 1.8+
- PHP 7.2+
- Mysql 5.7+
- Redis 3.0+
- Memcached 1.4+

**注意：当前版本功能还在完善中，暂时请勿商用。**

### 项目截图【v0.1.2 版本】

![首页](https://xiaot-static.oss-cn-hangzhou.aliyuncs.com/XiaoT/show/Xiaot_img%20111.jpg)

### v0.1.2版本

![首页](https://xiaot-static.oss-cn-hangzhou.aliyuncs.com/XiaoT/show/gh_667b391a9af7_344.jpg)

### 新版本【本次是v0.6.7】

![首页](https://xiaot-static.oss-cn-hangzhou.aliyuncs.com/XiaoT/show/gh_ed3c26c094b2_344.jpg)

### 功能列表
+ 首页
+ 分类首页、分类商品、新品首发、人气推荐商品页面
+ 商品详情页面，包含加入购物车、收藏商品、商品评论功能
+ 搜索功能
+ 专题功能
+ 品牌功能
+ 完整的购物流程，商品的加入、编辑、删除、批量选择，收货地址的选择，下单支付
+ 会员中心（订单、收藏、足迹、收货地址、意见反馈）
+ 营销优惠系统
+ 支付功能
....

### 小程序前端项目结构
```
跟目录下的 applet文件夹下
```

### 后端说明
+ 首页
+ 入口  域名/admin  用户名admin  密码admin


### 如何安装

1、下载项目到自己的项目目录

2、执行composer update 安装相关依赖

3、配置.env 为自己的环境参数
    demo
  ```
  APP_NAME=Laravel
  APP_ENV=local
  APP_KEY=base64:X2HTFXYXez3RwZ5plFA220P8HrFtXtflp+8o6Lw1X5E=
  APP_DEBUG=true
  APP_LOG_LEVEL=debug
  APP_URL=http://xxxx
  
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=数据库名
  DB_USERNAME=root
  DB_PASSWORD=数据库密码
  
  BROADCAST_DRIVER=log
  CACHE_DRIVER=file
  SESSION_DRIVER=file
  SESSION_LIFETIME=120
  QUEUE_DRIVER=sync
  
  CACHE_DRIVER=redis // 缓存驱动redis
  REDIS_HOST=127.0.0.1
  REDIS_PASSWORD=redis授权密码
  REDIS_PORT=6379
  
  MAIL_DRIVER=smtp
  MAIL_HOST=smtp.mailtrap.io
  MAIL_PORT=2525
  MAIL_USERNAME=null
  MAIL_PASSWORD=null
  MAIL_ENCRYPTION=null
  
  PUSHER_APP_ID=
  PUSHER_APP_KEY=
  PUSHER_APP_SECRET=
  PUSHER_APP_CLUSTER=mt1
  
  WECHAT_MINI_PROGRAM_APPID=小程序的appid
  WECHAT_MINI_PROGRAM_SECRET=小程序的appsecret
  WECHAT_PAYMENT_APPID=支付的appid
  WECHAT_PAYMENT_MCH_ID=商户号
  WECHAT_PAYMENT_KEY=秘钥

  ```

4、执行`php artisan XiaoT:install`

5、注意本项目默认使用的阿里云oss系统
```
config下的filesystems.php文件下修改自己的参数
```


**注意-如何升级：**<br>
如果你之前安装过，需要升级版本，那么进行下面操作步骤<br>
1、拉下最新代码覆盖原代码<br>
2、执行composer update 安装相关依赖<br>
3、执行`php artisan XiaoT:update`

```
# 执行php artisan XiaoT:update 出现下面错误
Class XXXX TableSeeder does not exist

执行：composer dump-autoload 即可
```

## 扩展包描述

| 扩展包 | 一句话描述 | 在本项目中的使用案例 |  
| --- | --- | --- |   
| [orangehill/iseed](https://github.com/orangehill/iseed) | 将数据表里的数据以 seed 的方式导出 | demo数据表导出 |
| [awssat/laravel-visits](https://github.com/awssat/laravel-visits) | 统计任意模型的查看数 | 数据统计相关。 |
|[encore/laravel-admin](https://github.com/z-song/laravel-admin)| 后台构建 | 用于后台主体的构建 |
| [jacobcyl/ali-oss-storage](https://github.com/jacobcyl/Aliyun-oss-storage) | 阿里云Oss管理 | 项目中阿里云OSS管理工具 |
| [overtrue/laravel-wechat](https://github.com/overtrue/laravel-wechat) | 微信 SDK for Laravel | 小程序授权、登录、微信支付等 |

### 作者希望
+ 喜欢别忘了 Star
+ 有建议和想法可以联系我157400661@qq.com
+ 都不要赞助我 ╥﹏╥.

<center>
<img src="https://xiaot-static.oss-cn-hangzhou.aliyuncs.com/XiaoT/minepay.jpg" width="16%" height="16%" style="float:left;margin:-left:20px;" />
<img src="https://xiaot-static.oss-cn-hangzhou.aliyuncs.com/XiaoT/alipay.png" width="16%" height="16%" style="float:left;margin:-left:20px;" />
</center>


