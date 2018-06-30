<?php

use Illuminate\Database\Seeder;

class ProjectFuncdotTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('project_funcdot')->delete();
        
        \DB::table('project_funcdot')->insert(array (
            0 => 
            array (
                'id' => 1,
                'type_id' => 1,
                'functype_id' => 1,
                'model_id' => 1,
                'funcdot_name' => '小功能点',
                'funcdot_desc' => '小功能点',
                'bottom_time' => 4,
                'time' => 6,
                'discount_price' => '0.00',
                'price' => 0,
                'sort' => 255,
                'status' => 1,
                'created_at' => '2018-05-08 06:05:21',
                'updated_at' => '2018-05-08 06:05:21',
            ),
            1 => 
            array (
                'id' => 2,
                'type_id' => 1,
                'functype_id' => 1,
                'model_id' => 1,
                'funcdot_name' => '小功能点',
                'funcdot_desc' => '小功能点',
                'bottom_time' => 4,
                'time' => 6,
                'discount_price' => '11.00',
                'price' => 11,
                'sort' => 255,
                'status' => 1,
                'created_at' => '2018-05-11 06:12:41',
                'updated_at' => '2018-05-11 06:12:41',
            ),
        ));
        
        
    }
}