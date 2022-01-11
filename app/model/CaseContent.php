<?php
/*  案列 */
namespace app\model;

use think\Model;


class  CaseContent extends Model
{

    // 模型初始化
    protected $table = 'erdai_case';
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

            $l['image']=json_encode($l['image']);
         //   $l['image_array']=json_encode($l['image_array']);
            $l['classify']=json_encode($l['classify']);
            $l['attvalue']=json_encode($l['attvalue'],JSON_UNESCAPED_UNICODE);
            $l['attvaluebox']=json_encode($l['attvaluebox'],JSON_UNESCAPED_UNICODE);
            $l['attvaluetext']=json_encode($l['attvaluetext'],JSON_UNESCAPED_UNICODE);
            $l['attvaluetextarea']=json_encode($l['attvaluetextarea'],JSON_UNESCAPED_UNICODE);

            $saveAll =  CaseContent::where($where)->strict(false)->update($l);
        }
        return $saveAll;
    }


    /*删除数据*/
    public static function deleteAll($where=[])
    {
        $delpic=CaseContent::where($where)->field('image')->select()->toArray();
        foreach($delpic as $d)
        {
            $dd=json_decode($d['image'],true);
            if(is_array($dd)) {
                foreach ($dd as $d)
                {
                    @unlink( app()->getRootPath().'uploads/'.$d);
                }
            }
        }
        $deleteAll=CaseContent::where($where)->delete();
        return $deleteAll;
    }

}
