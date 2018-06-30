<?php

namespace App\Http\Controllers\Api;

use App\Models\Carousel;
use App\Models\Special;
use App\Logic\ShopGoodsLogic;
use App\Models\ShopTopic;
use App\Http\Resources\ShopTopic as ShopTopicResource;

class IndexController extends ApiController
{
    /**
     * xiaoT技术首页信息
     * @return mixed
     */
    public function index()
    {
        // 先获取当前登录的用户信息

        if (empty(\Auth::user())) {
            return $this->failed('用户未登录', 401);
        }else{
            $user_id = \Auth::user()->id;
        }
        $outData = [];
        // 专题导航信息
        $outData['specialList'] = Special::getSpecialList();
        // 首页轮播
        $outData['carouselInfo'] = Carousel::getCarouselByType(Carousel::BOOTH_TYPE_HOME);

        // 热门
        $outData['hotGoodsList'] = ShopGoodsLogic::getGoodsList(['is_hot' => 1], 6);

        // 新品
        $outData['newGoodsList'] = ShopGoodsLogic::getGoodsList(['is_new' => 1], 4);

        // 新品
        $outData['topicList'] = ShopTopicResource::collection(ShopTopic::getTopicListByPage())->additional(['code' => 200]);
        return $this->success($outData);
    }
}
