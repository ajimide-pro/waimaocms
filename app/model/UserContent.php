<?php
/* 单页 分类*/
namespace app\model;

use think\Model;
use think\facade\Db;

class UserContent extends Model
{

    // 模型初始化
    protected $table = 'erdai_admin';
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

           // $roles=json_decode($l['roles'],true);
           // $department_rules=json_decode($l['department_rules'],true);
            //$btn_rules=json_decode($l['btn_rules'],true);

            $roless=array_values(array_unique ($l['roles']));

            $l['roles']=json_encode($roless);

            $department_ruless= array_values(array_unique ($l['department_rules']));
            $l['department_rules']=json_encode($department_ruless);



            $btn_ruless=array_values(array_unique($l['btn_rules']));
            $l['btn_rules']=json_encode($btn_ruless);

            $position_ruless=array_values(array_unique($l['position_rules']));
            $l['position_rules']=json_encode($position_ruless);

            if($l['password']!='') $l['password']=md5($l['password']);
            else unset($l['password']);

            $check=Db::name('admin')->field('id')->where('username',$l['username'])->find();
            if($check)
            {
                if($check['id']!=$l['id']) return ['code'=>false,'msg'=>'错误，'.$l['username'].'已存在'];
            }

            $saveAll = UserContent::where($where)->strict(false)->update($l);
        }
        return ['code'=>true,'msg'=>'修改成功'];
    }


    /*删除数据*/
    public static function deleteAll($where=[])
    {
        $deleteAll=UserContent::where($where)->delete();
        return $deleteAll;
    }

}
