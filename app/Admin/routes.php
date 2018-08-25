<?php

use Illuminate\Routing\Router;

Admin::registerAuthRoutes();

Route::group([
    'prefix'        => config('admin.route.prefix'),
    'namespace'     => config('admin.route.namespace'),
    'middleware'    => config('admin.route.middleware'),
], function (Router $router) {

    $router->get('/', 'HomeController@index');

    //轮播图管理
    $router->resource('carousel', CarouselController::class);
    //专题管理
    $router->resource('special', SpecialController::class);
    //商品管理
    $router->resource('goods', GoodController::class);
    //商品分类管理
    $router->resource('classes', ClassController::class);

    // 前台用户管理
    $router->resource('User', UsersController::class);

    //新闻管理
    $router->resource('News', NewsController::class);

    //前端用户管理
//    $router->resource('front-users', FrontEndUserController::class);

    // 项目类型管理
    $router->resource('project-type', ProjectTypeController::class);

    // 项目功能分类管理
    $router->resource('project-func-type', ProjectFuncTypeController::class);

    // 功能模块管理
    $router->resource('project-model', ProjectModelController::class);

    // 功能点管理
    $router->resource('project-dot', ProjectFuncDotController::class);

    // 品牌管理
    $router->resource('shop-brand', BrandController::class);

    // 统计管理
    $router->resource('stat', StatController::class);

    Route::post('uploadFile', 'UploadController@uploadImg')->name('admin-up');

    /********* shop相关********/
    Route::group(['namespace' => 'Shop'], function (Router $router) {
        // 商品分类管理
        $router->resource('shop-category', ShopCategoryController::class);
        // 规格管理
        $router->resource('shop-specification', ShopSpecificationController::class);

        // 属性分类管理
        $router->resource('shop-attribute-category', ShopAttributeCategoryController::class);
        // 属性管理
        $router->resource('shop-attribute', ShopAttributeController::class);

        // 商品管理
        $router->resource('shop-goods', ShopGoodsController::class);
        // 主题&专题管理
        $router->resource('shop-topics', ShopTopicController::class);
        // 商城订单管理
        $router->resource('shop-order', ShopOrderController::class);
        // 用户反馈
        $router->resource('shop-feedback', FeedbackController::class);
    });

});
