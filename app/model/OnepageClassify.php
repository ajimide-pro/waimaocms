<?php
/* 单页 分类*/
namespace app\model;

use think\Model;


class OnepageClassify extends Model
{

    // 模型初始化
    protected $table = 'erdai_onepage_classify';
    protected static function init()
    {
        //TODO:初始化内容

    }

    /**
     * 更新数据
     * @return mixed
     */
    public static function updateAll($list=[],$lang,$admin_user)
    {
        foreach($list as $l) {
            $where=[];
            $where[]= ['lang','=',$lang];;
            $where[]= ['id','=',$l['id']];
            $l['time']=time();
            $l['admin_user']=$admin_user;
            $saveAll = OnepageClassify::where($where)->update($l);
        }
        return $saveAll;
    }


    /*删除数据*/
    public static function deleteAll($where=[])
    {
        $deleteAll=OnepageClassify::where($where)->delete();
        return $deleteAll;
    }

}
