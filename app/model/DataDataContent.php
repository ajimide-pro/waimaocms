<?php
/* 单页 内容*/
namespace app\model;

use think\Model;


class DataDataContent extends Model
{

    // 模型初始化
    protected $table = 'erdai_visitor_message';
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
            $l['time']=date('Y-m-d H:i:s',time());
            $l['admin_user']=$admin_user;
           // $l['image']=json_decode($l['image'],true);
            $src=[];

            $image=json_decode($l['image'],true);
            if(is_array($image))
            {
                  foreach($image as $i=>&$v)
                  {
                      $v['url']=image_url_reset( $v['url']);
                  }
                $l['image']=json_encode($image);
            }
            else{
                $l['image']=json_encode($src);
            }

            $saveAll = DataDataContent::where($where)->update($l);
        }
        return $saveAll;
    }


    /*删除数据*/
    public static function deleteAll($where=[])
    {
        $deleteAll=DataDataContent::where($where)->delete();
        return $deleteAll;
    }

}
