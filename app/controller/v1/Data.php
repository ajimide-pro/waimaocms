<?php
namespace app\controller\v1;
use app\BaseController;
use think\facade\Db;
// 引入jwt插件
use thans\jwt\facade\JWTAuth;
class Data extends BaseController
{
    // 初始化
    protected function initialize()
    {

        parent::initialize();

        $payload = JWTAuth::auth(); //可验证token, 并获取token中的payload部分
        $this->admin_user = $payload['username']->getValue(); //可以继而获取payload里自定义的字段，比如uid
        $this->department=Db::name('department');

        $this->lang=request()->header('lang');
        /*验证用户真实性*/
        $this->admin=Db::name('admin')->field('department_rules,btn_rules,roles,id,position_rules,username')->where('username', $this->admin_user)->find();
        if(!$this->admin)  return result('操作失败，用户不存在，请重新登录', '用户校验失败', '201');
        $this->where_rules=where_rules($this->admin);//获取权限的条件查询语句
    }


     /* 表数据  按状态 统计
     name 表名
     value 状态值
     {'name':'status','value':0,'title':'储备项目','icon':'el-icon-document-copy'}
     */
    public function count_table()
    {
        $data = input('post.');
        /*
        $table=$data['table'];//要统计的数据表名称
        $field=$data['field'];//要统计的数据表字段名以及要统计的值，数据
        $dataa=[];
        foreach($field as $i=>$s)
        {
            $dataa[$i]['title']=$s['title'];
            $dataa[$i]['icon']=$s['icon'];
            $dataa[$i]['data']=Db::name($table)->where($this->where_rules)->where($s['name'],$s['value'])->count();
        }
          */

        $dataa[0]['title']='今日订单';
        $dataa[0]['icon']='el-icon-data-line';
        $dataa[0]['data']=Db::name('visitor_order')->whereDay('time')->count();
        $dataa[0]['url']=false;

        $dataa[1]['title']='总订单';
        $dataa[1]['icon']='el-icon-data-line';
        $dataa[1]['data']=Db::name('visitor_order')->count();
        $dataa[1]['url']=false;

        $dataa[2]['title']='今日留言';
        $dataa[2]['icon']='el-icon-data-line';
        $dataa[2]['data']=Db::name('visitor_message')->whereDay('time')->count();
        $dataa[2]['url']='/data/visitor_message';

        $dataa[3]['title']='总留言';
        $dataa[3]['icon']='el-icon-data-line';
        $dataa[3]['data']=Db::name('visitor_message')->count();
        $dataa[3]['url']='/data/visitor_message';

        return result($dataa, '查询成功', '200');
    }

    /* 表数据  按日期 统计
     name 表名
     value 状态值

     */
    public function count_day()
    {
        $data = input('post.');
        $table=$data['table'];//要统计的数据表名称
        $daycount=intval($data['daycount']);//要统计的天数
        $field=$data['field'];//要统计的数据表字段名以及要统计的值，数据
        if($daycount>31) $daycount=7;//最多一个周
        $dataaa= $dataa=[];
        $s=strtotime(date('Y-m-d',time()+86400));
        $date=[];


        for($i=1;$i<=$daycount;$i++)
        {
            $s=$s-86400;
            $date[]=date('m/d',$s);

            foreach($field as $ii=>$v)
            {
                $sss=$s+86400;
                $ssss=date('Y-m-d',$sss);
                if($v['lable']=='expectedData')
                {
                    //留言数量
                    $dataaa[$v['lable']][]=Db::name('visitor_message')->whereDay('time', $ssss)->count();
                }
                else{
                    //订单数量

                    $dataaa[$v['lable']][]=Db::name('visitor_order')->whereDay('time', $ssss)->count();
                }

            }


        }

        $dataaa['date']=$date;

        return result($dataaa, '查询成功', '200');
    }


}
