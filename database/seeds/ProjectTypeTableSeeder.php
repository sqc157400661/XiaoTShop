<?php

use Illuminate\Database\Seeder;

class ProjectTypeTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('project_type')->delete();
        
        \DB::table('project_type')->insert(array (
            0 => 
            array (
                'id' => 1,
                'type_name' => 'web开发',
                'type_desc' => 'web开发',
                'type_img' => 'images/491d7980d4beb3e56a693e5dbfe786dd.jpg',
                'class_id' => 0,
                'sort' => 255,
                'status' => 1,
                'basal_price' => '66.00',
                'created_at' => NULL,
                'updated_at' => '2018-05-11 10:23:52',
                'carousel_imgs' => '["images\\/beebd3335612985d91f7226e5006ec8d.jpg","images\\/d22f4a870fb2ff05a96fa5a57551c1d0.jpg"]',
                'description' => NULL,
                'salenum' => 10,
            ),
            1 => 
            array (
                'id' => 2,
                'type_name' => 'IOS开发',
                'type_desc' => 'IOS开发',
                'type_img' => 'images/f68faa054e72fa50ac196d7b3eb02580.jpg',
                'class_id' => 0,
                'sort' => 255,
                'status' => 1,
                'basal_price' => '96.00',
                'created_at' => '2018-05-10 11:31:01',
                'updated_at' => '2018-05-10 11:42:14',
                'carousel_imgs' => '',
                'description' => NULL,
                'salenum' => 10,
            ),
        ));
        
        
    }
}