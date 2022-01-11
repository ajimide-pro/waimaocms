<?php
/*  新闻分类 */
namespace app\model;

use think\Model;


class  NewsClassifyContent extends Model
{

    // 模型初始化
    protected $table = 'erdai_news_classify';
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

            if($l['parent']!='')
            {
                //$parent=json_decode($l['parent'],true);
                if(isset($l['parent'][0])) $l['parent']=$l['parent'][0];
                else $l['parent']=0;
            }
            else{
                $l['parent']=0;
            }

            $saveAll =  NewsClassifyContent::where($where)->strict(false)->update($l);
        }
        return $saveAll;
    }


    /*删除数据*/
    public static function deleteAll($where=[])
    {
        $deleteAll=NewsClassifyContent::where($where)->delete();
        return $deleteAll;
    }

}
