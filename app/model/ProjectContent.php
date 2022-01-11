<?php
/* 项目*/
namespace app\model;

use think\Model;


class ProjectContent extends Model
{

    // 模型初始化
    protected $table = 'erdai_project_declare';
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
            /*
            if($admin['department_rules']!='')
            {
                $l['department_rules']=$admin['department_rules'];
            }
            */

            $saveAll = ProjectContent::where($where)->strict(false)->update($l);
        }
        return $saveAll;
    }


    /*删除数据*/
    public static function deleteAll($where=[])
    {
        $delpic=ProjectContent::where($where)->field('fujian,ssfa')->select()->toArray();
        foreach($delpic as $d)
        {
            $dd=json_decode($d['fujian'],true);
            if(is_array($dd)) {
                foreach ($dd as $ddd) {
                    @unlink(app()->getRootPath() . 'uploads/' . $ddd['name']);
                }
            }

            $dds=json_decode($d['ssfa'],true);
            if(is_array($dds)) {
                foreach ($dds as $ddds) {
                    @unlink(app()->getRootPath() . 'uploads/' . $ddds['name']);
                }
            }
        }
        $deleteAll=ProjectContent::where($where)->delete();
        return $deleteAll;
    }

    /*申报立项 */
    public static function checkAll($where=[])
    {
        $checkAll=ProjectContent::where($where)->update(['status'=>1]);
        return $checkAll;
    }

    /*审核项目*/
    public static  function auditkAll($where=[],$status='0')
    {
        $checkAll=ProjectContent::where($where)->update(['status'=>$status]);
        return $checkAll;
    }



}
