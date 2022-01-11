<?php
namespace app\controller\v1;
use app\BaseController;
use think\facade\Db;
use app\model\ProjectddContent;
// 引入jwt插件
use thans\jwt\facade\JWTAuth;
class Projectdd extends BaseController
{
    // 初始化
    protected function initialize()
    {

        parent::initialize();
        $this->project_declare=Db::name('project_declare');
        $this->project_declare_log=Db::name('project_declare_log');

        $this->project_detailed=Db::name('project_detailed'); //项目明细

        $this->lang=request()->header('lang');
        $payload = JWTAuth::auth(); //可验证token, 并获取token中的payload部分
        $this->admin_user= $payload['username']->getValue(); //可以继而获取payload里自定义的字段，比如uid

        /*验证用户真实性*/
        $this->admin=Db::name('admin')->field('department_rules,btn_rules,roles,id,position_rules,username')->where('username', $this->admin_user)->find();
        if(!$this->admin)  return result('操作失败，用户不存在，请重新登录', '用户校验失败', '201');
        $this->where_rules=where_rules($this->admin);//获取权限的条件查询语句

    }




    /* 读取 项目申报列表 */
    public function Create_dd_list()
    {
        $data = input('get.');

        if($data['limit']=='') $data['limit']='30';
        if($data['page']=='') $data['page']='0';
        $where=$this->where_rules;
        $where[]=['status','=','5'];
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
            $list[$i]['fujian_array']=json_decode( $list[$i]['fujian'],true);
            $list[$i]['ssfa_array']=json_decode( $list[$i]['ssfa'],true);
        }

        $d=[];
        $d['total']=$total;
        $d['items']=$list;
        return result($d, '读取列表成功', '200');
    }


    /* 添加 项目明细 */
    public function Create_detailed()
    {
        $data = input('post.');
        $data['lang']=$this->lang;
        $data['time']=time();
        $data['admin_user']=$this->admin_user;

        if($this->admin['department_rules']!='')
        {
            $data['department_rules']=$this->admin['department_rules'];
        }

        $into = $this->project_detailed->strict(false)->insertGetId($data);
        if ($into) {
            return result($into, '操作成功', '200');
        } else {

            return result('写入失败', '写入数据库失败，请联系管理员', '202');
        }

    }


    /* 读取 项目明细 列表 */
    public function Create_detailed_list()
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



        $list = $this->project_detailed->where('lang',$this->lang)->where($where)->limit($data['limit'])->page($data['page'])->order($order)->select()->toArray();
        $total=$this->project_detailed->where('lang',$this->lang)->where($where)->count();

        foreach($list as $i=>$info) {

            /*查询项目标题*/
            $project= $this->project_declare->where('id',$info['project_id'])->value('title');
            $list[$i]['title']=$project;
        }

        $d=[];
        $d['total']=$total;
        $d['items']=$list;
        return result($d, '读取列表成功', '200');
    }


    /* 删除  项目明细*/
    public function Create_detailed_delete()
    {
        $data = input('post.');
        $list=$data['data'];
        if(count($list)>0)
        {
            $ProjectddContent = new ProjectddContent();
            // $where[]= ['lang','=',$this->lang];;
            $where[]= ['id','in',$list];
            $del=$ProjectddContent->deleteAll($where);
            if($del)  return result($del, '删除成功，请稍后再试', '200');
            else  return result('删除失败，或者没有数据改变', '删除失败', '202');

        }else{
            return result('删除不能为空', '删除', '202');
        }

    }


    /* 编辑 项目明细 */
    public function Create_detailed_edit()
    {
        $data = input('post.');
        $list=$data['data'];
        if(count($list)>0)
        {
            $ProjectddContent  = new ProjectddContent();


            $up=$ProjectddContent->updateAll($list, $this->lang,$this->admin_user);
            if($up)  return result($up, '更新成功', '200');
            else  return result('更新失败，或者没有数据改变', '更新失败', '202');

        }else{
            return result('更新内容不能为空', '更新失败', '202');
        }

    }


}
