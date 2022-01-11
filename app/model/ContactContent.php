<?php
/* */
namespace app\model;

use think\Model;


class  ContactContent extends Model
{

    // 模型初始化
    protected $table = 'erdai_contact';
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
            $saveAll =  ContactContent::where($where)->strict(false)->update($l);
        }
        return $saveAll;
    }


    /*删除数据*/
    public static function deleteAll($where=[])
    {
        $deleteAll=ContactContent::where($where)->delete();
        return $deleteAll;
    }

}
