<?php
namespace app\controller\v1;
use app\BaseController;
use think\facade\Db;
use app\model\ProjectContent;
// 引入jwt插件
use thans\jwt\facade\JWTAuth;
class Project extends BaseController
{
    // 初始化
    protected function initialize()
    {

        parent::initialize();
        $this->project_declare=Db::name('project_declare');
        $this->project_declare_log=Db::name('project_declare_log');


        $this->lang=request()->header('lang');
        $payload = JWTAuth::auth(); //可验证token, 并获取token中的payload部分
        $this->admin_user= $payload['username']->getValue(); //可以继而获取payload里自定义的字段，比如uid

        /*验证用户真实性*/
        $this->admin=Db::name('admin')->field('department_rules,btn_rules,roles,id,position_rules,username')->where('username', $this->admin_user)->find();
        if(!$this->admin)  return result('操作失败，用户不存在，请重新登录', '用户校验失败', '201');
        $this->where_rules=where_rules($this->admin);//获取权限的条件查询语句

    }



    /* 添加 项目申报 */
    public function Create_declare()
    {
        $data = input('post.');
        $data['lang']=$this->lang;
        $data['time']=time();
        $data['admin_user']=$this->admin_user;

        if($this->admin['department_rules']!='')
        {
            $data['department_rules']=$this->admin['department_rules'];
        }
        $data['fujian']=json_encode($data['fujian']);
        $data['ssfa']=json_encode($data['ssfa']);
        $into = $this->project_declare->strict(false)->insertGetId($data);
        if ($into) {
            return result($into, '操作成功', '200');
        } else {

            return result('写入失败', '写入数据库失败，请联系管理员', '202');
        }

    }



    /* 读取 项目申报列表 */
    public function Create_declare_list()
    {
        $data = input('get.');

        if($data['limit']=='') $data['limit']='30';
        if($data['page']=='') $data['page']='0';
        $where=$this->where_rules;

        $order='id desc';
        if($data['key']!='')
        {
            $where[]= ['title','like','%'.$data['key'].'%'];
        }

        if($data['kgnf']!='')   $where[]=['kgnf','=',$data['kgnf']];
        if($data['jcnf']!='')   $where[]=['jcnf','=',$data['jcnf']];
        if($data['tzlb']!='')   $where[]=['tzlb','=',$data['tzlb']];

        if($data['sort']!='')
        {
            switch ($data['sort'])
            {
                case 1;
                    $order='time desc';
                    break;
                case 2;
                    $order='weight desc';
                    break;
                case 3;
                    $order='weight asc';
                    break;
                default:
                    $order='id desc';
                    break;
            }

        }



        $list = $this->project_declare->where('lang',$this->lang)->where($where)->limit($data['limit'])->page($data['page'])->order($order)->select()->toArray();
        $total=$this->project_declare->where('lang',$this->lang)->where($where)->count();

        foreach($list as $i=>$info) {
            $list[$i]['city']=json_decode( $list[$i]['city'],true);
            $list[$i]['county']=json_decode( $list[$i]['county'],true);
            $list[$i]['status_txt']=status_project_txt($info['status']);//项目状态翻译

            $list[$i]['fujian']=json_decode( $list[$i]['fujian'],true);
            if(!is_array( $list[$i]['fujian']))  $list[$i]['fujian']=[];

            $list[$i]['ssfa']=json_decode( $list[$i]['ssfa'],true);
            if(!is_array( $list[$i]['ssfa']))  $list[$i]['ssfa']=[];
        }

        $d=[];
        $d['total']=$total;
        $d['items']=$list;
        return result($d, '读取列表成功', '200');
    }


    /* 删除 项目申报内容 */
    public function Create_declare_delete()
    {
        $data = input('post.');
        $list=$data['data'];
        if(count($list)>0)
        {
            $ProjectContent  = new ProjectContent();
            $where[]= ['lang','=',$this->lang];;
            $where[]= ['id','in',$list];
            $del=$ProjectContent->deleteAll($where);
            if($del)  return result($del, '删除成功', '200');
            else  return result('更新失败，或者没有数据改变', '删除失败', '202');

        }else{
            return result('更新内容不能为空', '更新失败', '202');
        }

    }


    /* 编辑 项目申报内容 */
    public function Create_declare_edit()
    {
        $data = input('post.');
        $list=$data['data'];
        if(count($list)>0)
        {
            $ProjectContent  = new ProjectContent();


            $up=$ProjectContent->updateAll($list, $this->lang,$this->admin_user);
            if($up)  return result($up, '更新成功', '200');
            else  return result('更新失败，或者没有数据改变', '更新失败', '202');

        }else{
            return result('更新内容不能为空', '更新失败', '202');
        }

    }

    /* 申报立项 */
    public  function Create_check()
    {

        $data = input('post.');
        $list=$data['data'];
        if(count($list)>0)
        {
            $ProjectContent  = new ProjectContent();
            $where[]= ['lang','=',$this->lang];;
            $where[]= ['id','in',$list];
            $check=$ProjectContent->checkAll($where);
            if($check) {

                /*写入申报记录*/
                $logg=[];
                foreach($list as $l)
                {
                    $log=[];
                    $log['admin_user']=$this->admin_user;
                    $log['time']=time();
                    $log['status']=1; //操作标识，申报成功
                    $log['project_id']=$l;
                    $log['content']='申报成功';
                    $logg[]=$log;
                }
                $this->project_declare_log->insertAll($logg);

                return result($check, '申报成功', '200');
            }
            else  return result('申报失败，或者没有数据改变', '删除失败', '202');

        }else{
            return result('申报失败，ID不能为空', '申报失败', '202');
        }

    }

    /* 审核项目 */
    public function Create_audit()
    {

        $data = input('post.');
        $list=$data['data']; //ID列表
        $status=$data['status']; //审核状态
        $content=$data['content']; //审核原因
        if(count($list)>0)
        {
            $ProjectContent  = new ProjectContent();
            $where[]= ['lang','=',$this->lang];;
            $where[]= ['id','in',$list];
            $audit=$ProjectContent->auditkAll($where,$status);
            if($audit) {

                /*写入审核记录*/
                $logg=[];
                foreach($list as $l)
                {
                    $log=[];
                    $log['admin_user']=$this->admin_user;
                    $log['time']=time();
                    $log['status']=$status; //操作标识
                    $log['project_id']=$l;
                    $log['content']= $content;
                    $logg[]=$log;
                }
                $this->project_declare_log->insertAll($logg);

                return result($audit, '审核成功', '200');
            }
            else  return result('审核失败，或者没有数据改变', '操作失败', '202');

        }else{
            return result('审核失败，ID不能为空', '审核失败', '202');
        }

    }




}
