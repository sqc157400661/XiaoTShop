<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShopProduct extends Model
{

    protected $table = "shop_product";
    public $timestamps = false;

    public function specifications()
    {
        return $this->hasMany(ShopGoodsSpecification::class, 'goods_id');
    }
}
