<?php
namespace app\controller\v1;
use app\BaseController;
use think\facade\Db;
use app\model\UserContent;
// 引入jwt插件
use thans\jwt\facade\JWTAuth;

// 引入验证码类
use app\validate\User as UserValidate;

class User extends BaseController
{
    // 初始化
    protected function initialize()
    {

        parent::initialize();
        $this->admin=Db::name('admin');
        $this->roles=Db::name('roles');
        $this->rules_btn=Db::name('rules_btn');
        $this->lang=request()->header('lang');

    }
    public function login()
    {
        $username=input('username');
        $password=input('password');
       validate(UserValidate::class)->batch(true)->check([
           'username'=>$username,
           'password'=>$password,
       ]);



       $check=$this->admin->field('password,status,login_num')->where('username',$username)->find();
       if(!$check)  return result('用户名不存在！', '账户验证错误', '201');
       if($check['password']!=md5($password))   return result('账户密码错误！', '账户验证错误', '201');
       if($check['status']=='0') return result('登录失败，账户已停用！', '账户验证错误', '201');
        $login_num=$check['login_num']+1;
        Db::name('admin')->where('username',$username)->update(['login_time'=>time(),'login_num'=>$login_num]);
        $token = JWTAuth::builder(['username'=>$username]);//生成token

        return result($token, '获取token成功', '200');
    }

    /* 用户资料 */
    public function info() {

        $payload = JWTAuth::auth(); //可验证token, 并获取token中的payload部分
        $username= $payload['username']->getValue(); //可以继而获取payload里自定义的字段，比如uid

        $find=$this->admin->where('username',$username)->find();
        $systemtitle=Db::name('siteinfo')->where('id',2)->value('title');
        $find['systemtitle']=$systemtitle;
        $find['weburl']=env('SYSTEM.WEBURL');
        if($find['avatar']=='') $find['avatar']=image_url('/uploads/default/user.png');
        else{
             $avatar=explode('uploads',$find['avatar']);
            $find['avatar']=image_url('/uploads/'.$avatar[1]);
        }

        $rules_btn=DB::name('rules_btn')->select()->toArray(); //按钮权限
        $btn_rules=[];
        $my_rules=json_decode($find['btn_rules'],true);

        $find['lang_list']=Db::name('lang')->where('status',1)->order('weight asc,id desc')->select()->toArray(); // 语言列表

        foreach($rules_btn as $j) {
            if ($find['id'] == 1) {
                //超级管理员
                $btn_rules[]=$j['value'];

            } else {
                if(in_array($j['id'],$my_rules)) $btn_rules[]=$j['value'];

            }
        }
        $find['roles']=$btn_rules;
        return result($find, '获取用户资料成功', '200');
    }

    /* 读取 角色列表 */
    public function Roles_get_list()
    {
        $data = input('get.');

        if($data['limit']=='') $data['limit']='30';
        if($data['page']=='') $data['page']='0';
        $where=[];

        if($data['key']!='')
        {
            $where[]= ['title','like','%'.$data['key'].'%']; //查找下级
        }


        $order='id desc';
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

        $list = $this->roles->where($where)->limit($data['limit'])->page($data['page'])->order($order)->select()->toArray();
        $total=$this->roles->where($where)->count();
        foreach($list as $i=>$l)
        {
            $list[$i]['menu']=json_decode($list[$i]['menu'],true);

        }

        $d=[];
        $d['total']=$total;
        $d['items']=$list;
        return result($d, '读取列表成功', '200');
    }


    /* 添加 用户 */
    public function Create()
    {
        $data = input('post.');
        $payload = JWTAuth::auth(); //可验证token, 并获取token中的payload部分
        $this->admin_user= $payload['username']->getValue(); //可以继而获取payload里自定义的字段，比如uid
        $data['time']=time();
        $data['admin_user']=$this->admin_user;
        $data['password']=md5($data['password']);

        $check= Db::name('admin')->field('id')->where('username',$data['username'])->find();
        if($check)   return result('用户名'.$data['username'].'已存在，请换一个', '参数错误', '202');

        $into =  $this->admin->strict(false)->insertGetId($data);
      //  echo $this->admin->getLastSql();
        if ($into) {
            return result($into, '操作成功', '200');
        } else {

            return result('写入失败', '写入数据库失败，请联系管理员', '202');
        }

    }

    /* 读取 用户列表 */
    public function Create_get_list()
    {
        $data = input('get.');

        if($data['limit']=='') $data['limit']='30';
        if($data['page']=='') $data['page']='0';

        $where='1=1';
        if($data['key']!='')
        {
            $where .= ' and (name like "%'.$data['key'].'%" OR username like "%'.$data['key'].'%")'; //查找下级
        }
        if($data['roles']!='')
        {
            $where .= ' and (roles like "%['.$data['roles'].']%" OR roles like "%,'.$data['roles'].',%" OR roles like "%,'.$data['roles'].']" OR roles like "['.$data['roles'].',%")';
        }
        $order='id desc';
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


//echo $where;
        $list = $this->admin->where($where)->limit($data['limit'])->page($data['page'])->order($order)->select()->toArray();
        $total=$this->admin->where($where)->count();

        foreach($list as $i=>$info) {

            $js=json_decode($info['roles'],true);
            $jss=json_decode($info['department_rules'],true);
            $jsss=json_decode($info['btn_rules'],true);
            $jssss=json_decode($info['position_rules'],true);
            if(is_array($js))
            {
                $list[$i]['roles_data']=Db::name('roles')->where('id','in',$js)->select()->toArray();
                $list[$i]['roles']=$js;
            }
            else{
                $list[$i]['roles_data']=[];
                $list[$i]['roles']=[];
            }

            if(is_array($jss))
            {
                $list[$i]['department_data']=Db::name('department')->where('id','in',$jss)->select()->toArray();
                $list[$i]['department_rules']=$jss;
            }
            else{

                $list[$i]['department_rules']=[];
                $list[$i]['department_data']=[];
            }
            if(is_array($jsss))
            {

                $list[$i]['btn_rules']=$jsss;
            }
            else{

                $list[$i]['btn_rules']=[];
            }

            if(is_array($jssss))
            {
                $list[$i]['position_data']=Db::name('position')->where('id','in',$jssss)->select()->toArray();
                $list[$i]['position_rules']=$jssss;
            }
            else{

                $list[$i]['position_rules']=[];
                $list[$i]['position_data']=[];
            }

        }

        $d=[];
        $d['total']=$total;
        $d['items']=$list;
        return result($d, '读取列表成功', '200');
    }

    /* 修改用户状态 */
    public function Status()
    {
        $data = input('post.');
        $status=intval($data['status']);
        $id=intval($data['id']);
        if($id<=1)    return result('参数错误【id】', '操作失败', '201');
        $up=$this->admin->where('id',$id)->update(['status'=>$status]);
        if ($up) {
            return result($up, '操作成功', '200');
        } else {

            return result('更新数据库失败，或者没有数据改变，请稍后再试！', '操作失败', '202');
        }

    }


    /* 编辑 用户 */
    public function Create_edit()
    {
        $data = input('post.');
        $list=$data['data'];
        if(count($list)>0)
        {


            $UserContent  = new UserContent();
            $payload = JWTAuth::auth(); //可验证token, 并获取token中的payload部分
            $this->admin_user= $payload['username']->getValue(); //可以继而获取payload里自定义的字段，比如uid
            $up=$UserContent->updateAll($list, $this->lang,$this->admin_user);
            if($up['code'])  return result($up, '更新成功', '200');
            else  return result($up['msg'], '更新失败', '202');

        }else{
            return result('更新内容不能为空', '更新失败', '202');
        }

    }

    /* 删除 用户 */
    public function Create_delete()
    {
        $data = input('post.');
        $list=$data['data'];
        if(count($list)>0)
        {
            $UserContent = new UserContent();
            // $where[]= ['lang','=',$this->lang];;
            $where[]= ['id','in',$list];
            $del=$UserContent->deleteAll($where);
            if($del)  return result($del, '删除成功，请稍后再试', '200');
            else  return result('更新失败，或者没有数据改变', '删除失败', '202');

        }else{
            return result('更新内容不能为空', '更新失败', '202');
        }

    }

    /* 修改用户资料 */
    public function editInfo() {

        $data = input('post.');
        $payload = JWTAuth::auth(); //可验证token, 并获取token中的payload部分
        $username= $payload['username']->getValue(); //可以继而获取payload里自定义的字段，比如uid

        $find=$this->admin->where('username',$username)->find();
        if(!$find)    return result('更新个人信息失败，用户账户不存在！', '操作失败', '202');


        if($data['password']!='') $data['password']=md5($data['password']);
        else{
            unset($data['password']);
        }


        $up=Db::name('admin')->strict(false)->where('username',$username)->update($data);
        if ($up) {
            return result($up, '操作成功', '200');
        } else {

            return result('更新数据库失败，或者没有数据改变，请稍后再试！', '操作失败', '202');
        }
        // $find['roles']=["admin"];

    }

    /* 读取 按钮权限列表 */
    public function Rules_btn_get_list()
    {
        $data = input('get.');

        if($data['limit']=='') $data['limit']='30';
        if($data['page']=='') $data['page']='0';
        $where=[];

        if($data['key']!='')
        {
            $where[]= ['title','like','%'.$data['key'].'%']; //查找下级
        }


        $order='id desc';
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

        $list = $this->rules_btn->where($where)->limit($data['limit'])->page($data['page'])->order($order)->select()->toArray();
     //   $total=$this->roles->where($where)->count();
        foreach($list as $i=>$l)
        {

        }

        $d=[];
        $d['total']='30';
        $d['items']=$list;
        return result($d, '读取列表成功', '200');
    }


}

