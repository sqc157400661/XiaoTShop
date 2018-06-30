<?php

use Illuminate\Database\Seeder;

class CarouselTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('carousel')->delete();
        
        \DB::table('carousel')->insert(array (
            0 => 
            array (
                'id' => 1,
                'booth_type' => 1,
                'carousel_title' => '轮播测试1',
                'carousel_img' => 'images/910e5135017a0c881fc66e53e7d638c8.jpg',
                'carousel_info' => '轮播测试1',
                'state' => 1,
                'created_at' => '2018-05-09 09:16:24',
                'updated_at' => '2018-06-22 08:47:24',
                'goods_id' => 1,
            ),
            1 => 
            array (
                'id' => 2,
                'booth_type' => 1,
                'carousel_title' => '轮播测试2',
                'carousel_img' => 'images/3ffb207af32313fa38baa4ae35708886.jpg',
                'carousel_info' => '轮播测试2',
                'state' => 1,
                'created_at' => '2018-05-10 08:50:05',
                'updated_at' => '2018-06-22 08:48:10',
                'goods_id' => 1,
            ),
            2 => 
            array (
                'id' => 3,
                'booth_type' => 2,
                'carousel_title' => '哈哈哈',
                'carousel_img' => 'images/6adf6eee8e83405c8caae80c42a53ffc.jpg',
                'carousel_info' => '2说弟弟撒',
                'state' => 1,
                'created_at' => '2018-06-15 03:48:46',
                'updated_at' => '2018-06-15 03:48:46',
                'goods_id' => 0,
            ),
            3 => 
            array (
                'id' => 4,
                'booth_type' => 3,
                'carousel_title' => '新增哈哈哈',
                'carousel_img' => 'images/565c97e18f7c69fd766193a7cf6e0341.jpg',
                'carousel_info' => '新增新增',
                'state' => 1,
                'created_at' => '2018-06-15 03:51:18',
                'updated_at' => '2018-06-15 03:51:18',
                'goods_id' => 0,
            ),
            4 => 
            array (
                'id' => 5,
                'booth_type' => 1,
                'carousel_title' => '轮播测试3',
                'carousel_img' => 'images/1d00d00b476c1697f961bc9dbc7d53c7.jpg',
                'carousel_info' => '轮播测试3',
                'state' => 1,
                'created_at' => '2018-06-22 08:48:30',
                'updated_at' => '2018-06-22 08:48:30',
                'goods_id' => 0,
            ),
            5 => 
            array (
                'id' => 6,
                'booth_type' => 1,
                'carousel_title' => '轮播测试4',
                'carousel_img' => 'images/76a9f07349c4eed2cddaec5c1a762d84.jpg',
                'carousel_info' => '轮播测试4',
                'state' => 1,
                'created_at' => '2018-06-22 08:48:48',
                'updated_at' => '2018-06-22 08:48:48',
                'goods_id' => 0,
            ),
            6 => 
            array (
                'id' => 7,
                'booth_type' => 1,
                'carousel_title' => '轮播测试5',
                'carousel_img' => 'images/bf2f2bf9a3ca51ef10fc577c6baf5429.jpg',
                'carousel_info' => '轮播测试5',
                'state' => 1,
                'created_at' => '2018-06-22 08:49:08',
                'updated_at' => '2018-06-22 08:49:08',
                'goods_id' => 0,
            ),
        ));
        
        
    }
}