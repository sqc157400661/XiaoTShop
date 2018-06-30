<?php

use Illuminate\Database\Seeder;

class ProjectModelTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('project_model')->delete();
        
        \DB::table('project_model')->insert(array (
            0 => 
            array (
                'id' => 1,
                'functype_id' => 1,
                'type_id' => 1,
                'model_name' => '测试模块',
                'model_desc' => '测试模块',
                'sort' => 255,
                'status' => 1,
                'created_at' => '2018-05-07 12:27:26',
                'updated_at' => '2018-05-07 12:27:26',
            ),
            1 => 
            array (
                'id' => 2,
                'functype_id' => 1,
                'type_id' => 1,
                'model_name' => '基础功能测试模块',
                'model_desc' => '基础功能测试模块c',
                'sort' => 255,
                'status' => 1,
                'created_at' => '2018-05-07 12:30:38',
                'updated_at' => '2018-05-07 12:30:38',
            ),
            2 => 
            array (
                'id' => 3,
                'functype_id' => 1,
                'type_id' => 0,
                'model_name' => '基础功能测试模块11111',
                'model_desc' => '基础功能测试模块c1111',
                'sort' => 255,
                'status' => 1,
                'created_at' => '2018-05-07 12:30:55',
                'updated_at' => '2018-05-07 12:30:55',
            ),
            3 => 
            array (
                'id' => 4,
                'functype_id' => 2,
                'type_id' => 0,
                'model_name' => '基础功能测试模块',
                'model_desc' => '基础功能测试模块',
                'sort' => 255,
                'status' => 1,
                'created_at' => '2018-05-11 06:11:19',
                'updated_at' => '2018-05-11 06:11:19',
            ),
        ));
        
        
    }
}