<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Logic\CartLogic;
use App\Models\ShopGoods;
use App\Models\ShopCart;
use Illuminate\Support\Facades\Validator;

class ShopCartController extends ApiController
{
    public function __construct()
    {
    }

    // 获取购物车的数据
    public function index(Request $request)
    {
        $where = [
            'uid' =>\Auth::user()->id,
        ];
        $cartData = CartLogic::getCartList($where);
        return $this->success($cartData);
    }

    // 添加商品到购物车
    public function add(Request $request)
    {
        if (empty(\Auth::user()->id)) {
            $user_id = 0;
        } else {
            $user_id = \Auth::user()->id;
        }
        // 参数校验
        $validator = Validator::make($request->all(),
            [
                'goodsId' => 'required',
                'number' => 'required|numeric',
            ],
            [
                'goodsId.required' => '商品id参数缺失',
                'number.required' => '购买数量参数缺失',
                'number.numeric' => '购买数量需要是数字',
            ]
        );
        if ($validator->fails()) {
            return $this->failed($validator->errors(), 403);
        }
        $goodsInfo = ShopGoods::getGoodsDetail(['id'=>$request->goodsId]);
        $re = CartLogic::addCart($goodsInfo,$request->number);
        if($re){
            $goodsCount = ShopCart::getGoodsCount(['uid' => $user_id]);
            return  $this->success(['goodsCount'=>$goodsCount]);
        }
        return $this->failed('购物车添加失败', 201);
    }

    // 更新购物车的商品
    public function update(Request $request)
    {
        // 参数校验
        $validator = Validator::make($request->all(),
            [
                'id' => 'required',
                'number' => 'required|numeric',
            ],
            [
                'id.required' => '商品id参数缺失',
                'number.required' => '参数缺失',
                'number.numeric' => '非法参数',
            ]
        );
        if ($validator->fails()) {
            return $this->failed($validator->errors(), 403);
        }
        $where['id'] = $request->id;
        $info = ShopCart::where($where)->first();
        $info->number = $request->number;
        $re = $info->save();
        if($re){
            return $this->message('更新成功');
        }
        return $this->failed('更新失败','201');
    }

    // 删除购物车的商品
    public function delete(Request $request)
    {
        if (empty(\Auth::user()->id)) {
            $user_id = 0;
        } else {
            $user_id = \Auth::user()->id;
        }
        // 参数校验
        $validator = Validator::make($request->all(),
            [
                'goodsIds' => 'required',
            ],
            [
                'goodsIds.required' => '商品id参数缺失',
            ]
        );
        if ($validator->fails()) {
            return $this->failed($validator->errors(), 403);
        }
        $where = [
            'uid' =>$user_id,
            'goods_id' => explode(',',$request->goodsIds)
        ];
        ShopCart::where($where)->delete();
        $cartData = CartLogic::getCartList(['uid' =>$user_id]);
        return $this->success($cartData);
    }

    // 选择或取消选择商品
    public function checked(Request $request)
    {
        if (empty(\Auth::user()->id)) {
            $user_id = 0;
        } else {
            $user_id = \Auth::user()->id;
        }
        // 参数校验
        $validator = Validator::make($request->all(),
            [
                'goodsIds' => 'required',
                'isChecked' => 'required|numeric',
            ],
            [
                'goodsIds.required' => '商品id参数缺失',
                'isChecked.required' => '参数缺失',
                'isChecked.numeric' => '非法参数',
            ]
        );
        if ($validator->fails()) {
            return $this->failed($validator->errors(), 403);
        }
        $where = [
            'uid'=>$user_id,
        ];
        ShopCart::where($where)->whereIn('goods_id',explode(',',$request->goodsIds))->update(['checked' => $request->isChecked]);
        $cartData = CartLogic::getCartList(['uid' =>$user_id]);
        return $this->success($cartData);
    }

    // 获取购物车商品件数
    public function goodsCount(Request $request)
    {
        if (empty(\Auth::user()->id)) {
            $user_id = 0;
        } else {
            $user_id = \Auth::user()->id;
        }
        $goodsCount = ShopCart::getGoodsCount(['uid' => $user_id]);
        return $this->success(['goodsCount'=>$goodsCount]);
    }



    // 下单前信息确认
    public function checkout(Request $request)
    {
        return $this->success([]);
    }

}