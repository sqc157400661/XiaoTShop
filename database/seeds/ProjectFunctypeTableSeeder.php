<?php

use Illuminate\Database\Seeder;

class ProjectFunctypeTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('project_functype')->delete();
        
        \DB::table('project_functype')->insert(array (
            0 => 
            array (
                'id' => 1,
                'type_id' => 0,
                'functype_name' => '12121',
                'functype_desc' => '1212121',
                'sort' => 255,
                'status' => 1,
                'created_at' => '2018-05-07 11:26:37',
                'updated_at' => '2018-05-11 06:15:43',
            ),
            1 => 
            array (
                'id' => 2,
                'type_id' => 1,
                'functype_name' => '基础功能',
                'functype_desc' => '基础功能建设',
                'sort' => 255,
                'status' => 1,
                'created_at' => '2018-05-07 12:27:44',
                'updated_at' => '2018-05-11 06:44:48',
            ),
        ));
        
        
    }
}