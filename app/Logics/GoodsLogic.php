<?php
/**
 * sqc @小T科技 2018.03.06
 *
 *
 */
namespace App\Logic;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Resources\Good as GoodResource;
use App\Models\Good;

class GoodsLogic
{


    public function __construct()
    {

    }

    // 分页获取商品列表
    static public function getGoodsList($where, $page = 1, $limit = 20)
    {
        return GoodResource::collection(Good::where($where)->orderBy('sort', 'asc')->paginate($limit))->additional(['code' =>200,'status' => 'success']);
    }

    static public function getGoodsDetail($where){
    }

}
