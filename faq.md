#### 1.php artisan XiaoT:install执行

##### 1）报错提示
In ProviderRepository.php line 208:
  Class 'Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider' not found

错误级别：必须解决

原因：未执行composer update，laravel-ide-helper库未安装

解决：执行composer update

##### 2)
/xxxxxx/xxx/xiaot_project/app/Admin directory already exists !

错误级别：可以忽略
原因：执行admin:install命令初始化时创建Admin文件夹出错

解决：可忽略。encore/laravel-admin的admin:install命令优化，只执行数据库相关操作，不执行创建文件夹的操作。


##### 3)
SQLSTATE[22007]: Invalid datetime format: 1292 Incorrect datetime value: '0' for column 'add_time' at row 1

错误级别：必须解决，忽略的话会缺少数据
原因：shop_comment表的add_time字段定义的类型是timestamp，但是seed执行插入数据时，add_time给的值是0，造成数据不匹配。
解决：删掉ShopCommentTableSeeder中add_time的赋值，使其走默认值，或给add_time添加符合格式的的值‘1971-01-01 08:00:00‘

已解决

#### 2.小程序启动
##### 1)
小程序开发者工具中，控制台报错
:59438/appservice/appservice?load:1 Uncaught (in promise) {errMsg: "request:fail url not in domain list"}

原因：api域名不是https
解决：配置为https，或者在开发者工具右上角详情中勾选【不校验安全域名、web-view 域名、TLS 版本以及 HTTPS 证书】