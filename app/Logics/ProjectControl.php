<?php
/**
 * User: sqc
 * Date: 18-5-7
 * Time: 下午5:12
 */

namespace App\Logics;

use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use App\Models\ProjectFuncdot;
use App\Models\ProjectFunctype;
use App\Models\ProjectModel;
use App\Models\ProjectType;
use App\Http\Resources\ProjectType as ProjectTypeResource;

class ProjectControl
{
    const PROJECT_GOODS_CACHE_KEY = 'ProjectGoodsCacheKey';

    // 获取项目类型json格式
    static public function getJsonProjectTypes()
    {
        return ProjectTypeResource::collection(ProjectType::where([
            ['status', '=', ProjectType::STATUS_ON]
        ])->orderBy('sort', 'ASC')->get());
    }

    // 拼装获取项目 function_type  model dot
    static public function getJsonProjectGoodsByTypeId($type_id)
    {
        // 添加缓存
        $projectGoodsInfo = Cache::get(static::PROJECT_GOODS_CACHE_KEY);
        if (!$projectGoodsInfo) {
            $dbProjectFuncTypes = static::getProjectFuncTypesByOneLevel([$type_id, 0]);
            $dbProjectFuncTypes = array_column($dbProjectFuncTypes->toArray(), null, 'id');
            foreach ($dbProjectFuncTypes as $funcTypeKey => &$funcTypeVal) {
                $modelsTmp = static::getProjectModelsByOneLevel([$funcTypeVal['id']]);
                $modelsTmp = array_column($modelsTmp->toArray(), null, 'id');
                foreach ($modelsTmp as $modelsTmpKey => &$modelsTmpVal) {
                    $tmpDots = static::getProjectDotByOneLevel([$modelsTmpVal['id']]);
                    $modelsTmpVal['dots'] = array_column($tmpDots->toArray(), null, 'id');
                }
                $funcTypeVal['models'] = $modelsTmp;
            }
            $expiresAt = Carbon::now()->addMinutes(120);// 缓存2个小时
            Cache::put(static::PROJECT_GOODS_CACHE_KEY, \GuzzleHttp\json_encode($dbProjectFuncTypes), $expiresAt);
            return $dbProjectFuncTypes;
        }
        return \GuzzleHttp\json_decode($projectGoodsInfo);

    }

    // 获取项目类型
    static public function getProjectTypes()
    {
        $dbProjectTypes = ProjectType::pluck('type_name', 'id')->all();
        $projectTypes = array_merge(['0' => '全部'], $dbProjectTypes);
        return $projectTypes;
    }

    // 获取项目功能分类管理 一级操作
    static public function getProjectFuncTypesByOneLevel($type_id = [])
    {
        if (count($type_id) == 1 && in_array(0, $type_id)) {
            return ProjectFunctype::where([
                ['status', '=', ProjectFunctype::STATUS_ON]
            ])->orderBy('sort', 'ASC')->get();
        }
        $dbProjectFuncTypes = ProjectFunctype::where([
            ['status', '=', ProjectFunctype::STATUS_ON]
        ])->orderBy('sort', 'ASC')->whereIn('type_id', $type_id)->get();
        return $dbProjectFuncTypes;
    }

    // 获取项目功能模块管理  一级操作
    static public function getProjectModelsByOneLevel($functype_id = [])
    {
        if (in_array(0, $functype_id)) {
            return ProjectModel::where([
                ['status', '=', ProjectModel::STATUS_ON]
            ])->orderBy('sort', 'ASC')->get();
        }
        $dbProjectModels = ProjectModel::where([
            ['status', '=', ProjectModel::STATUS_ON]
        ])->orderBy('sort', 'ASC')->whereIn('functype_id', $functype_id)->get();
        return $dbProjectModels;
    }

    // 获取功能点
    static public function getProjectDotByOneLevel($model_id = [])
    {
        if (in_array(0, $model_id)) {
            return ProjectFuncdot::where([
                ['status', '=', ProjectFuncdot::STATUS_ON]
            ])->orderBy('sort', 'ASC')->get();
        }
        $dbProjectModels = ProjectFuncdot::where([
            ['status', '=', ProjectFuncdot::STATUS_ON]
        ])->orderBy('sort', 'ASC')->whereIn('model_id', $model_id)->get();
        return $dbProjectModels;
    }
}