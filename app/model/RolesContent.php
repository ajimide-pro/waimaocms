<?php
/* 单页 分类*/
namespace app\model;

use think\Model;


class  RolesContent extends Model
{

    // 模型初始化
    protected $table = 'erdai_roles';
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
         //   $where[]= ['lang','=',$lang];;
            $where[]= ['id','=',$l['id']];
            $l['time']=time();
            $l['admin_user']=$admin_user;


           // $menuu=array_values(array_unique ($l['menu']));

          //  $l['menu']=json_encode($menuu);

            $saveAll =  RolesContent::where($where)->update($l);
        }
        return $saveAll;
    }


    /*删除数据*/
    public static function deleteAll($where=[])
    {
        $deleteAll=RolesContent::where($where)->delete();
        return $deleteAll;
    }

}
