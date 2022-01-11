<?php
/* 部门 */
namespace app\model;

use think\Model;


class  NavigaContent extends Model
{

    // 模型初始化
    protected $table = 'erdai_navigation';
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
            $l['image']=json_encode( $l['image']);
            if($l['parent']!='')
            {
                //$parent=json_decode($l['parent'],true);
                if(isset($l['parent'][0])) $l['parent']=$l['parent'][0];
                else $l['parent']=0;
            }
            else{
                $l['parent']=0;
            }
            $saveAll =  NavigaContent::where($where)->strict(false)->update($l);
        }
        return $saveAll;
    }


    /*删除数据*/
    public static function deleteAll($where=[])
    {
        $deleteAll=NavigaContent::where($where)->delete();
        return $deleteAll;
    }

}
