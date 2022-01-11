<?php
/* 数据 内容*/
namespace app\model;

use think\Model;


class OnepageContent extends Model
{

    // 模型初始化
    protected $table = 'erdai_onepage';
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
           // $l['image']=json_decode($l['image'],true);
            $src=[];

         //   $image=json_decode($l['image'],true);
            if(is_array($l['image']))
            {
                  foreach($l['image'] as $i=>&$v)
                  {
                      $v['url']=image_url_reset( $v['url']);
                  }
                $l['image']=json_encode($l['image']);
            }
            else{
                $l['image']=json_encode($src);
            }

            $saveAll = OnepageContent::where($where)->update($l);
        }
        return $saveAll;
    }


    /*删除数据*/
    public static function deleteAll($where=[])
    {
        $deleteAll=OnepageContent::where($where)->delete();
        return $deleteAll;
    }

}
