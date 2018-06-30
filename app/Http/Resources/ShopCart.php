<?php

namespace App\Http\Resources;

use App\Models\ShopCategory as ShopCategoryDB;
use Illuminate\Http\Resources\Json\Resource;

class ShopCart extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "id"=>$this->id,
            "user_id"=> $this->uid,
            "goods_id"=> $this->goods_id,
            "goods_sn"=> $this->goods_sn,
            "goods_name"=> $this->goods_name,
            "market_price"=> $this->market_price,
            "retail_price"=> $this->shop_goods->retail_price,
            "number"=> $this->number,
            "checked"=> $this->checked,
            'freight_price' => $this->shop_goods->freight_price,
            "list_pic_url"=>  config('filesystems.disks.oss.url').'/'.$this->list_pic_url,
            "primary_pic_url"=>  config('filesystems.disks.oss.url').'/'.$this->shop_goods->primary_pic_url,
        ];
    }

}
