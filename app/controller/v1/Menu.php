<?php
/* 获取菜单 */
namespace app\controller\v1;
use app\BaseController;
use think\facade\Db;
use app\model\UserContent;
// 引入jwt插件
use thans\jwt\facade\JWTAuth;
use think\facade\Cache;


class Menu extends BaseController
{
    // 初始化
    protected function initialize()
    {

        parent::initialize();
        $this->menu=Db::name('menu');
        $payload = JWTAuth::auth(); //可验证token, 并获取token中的payload部分
        $this->username= $payload['username']->getValue(); //

        $this->lang=request()->header('lang');

    }
    public function index()
    {

        $admin=Db::name('admin')->where('username',$this->username)->find();
        if(!$admin)   return result('获取菜单失败，管理员账户不存在，请重新登录', '获取菜单失败', '201');
        $where=[];
        if($admin['id']==1)
        {
            //超级管理员
            $mymenu=$this->menu->order('weight asc,ID desc')->select()->toArray();
            foreach($mymenu as &$v)
            {
                $v['meta']=json_decode( $v['meta'],true);
                $check_menu[]=$v['id'];//
            }
        }
        else{
            $where[]=['hidden','=',0];
            $roles=array_values(array_filter(json_decode($admin['roles'],true)));
            if(count($roles)=='0')  return result([], '获取菜单成功', '200'); //没有角色

            $r=Db::name('roles')->field('menu')->where('id','in',$roles)->select()->toArray();
            $menu=[];
            foreach($r as $rr)
            {
                $m=json_decode($rr['menu'],true);
                $menu=array_merge($menu,$m);
            }
            $menu=array_values(array_filter($menu));


            if(count($menu)=='0')
            {
                return result([], '获取菜单成功', '200'); //没有菜单

            }
            else {   //角色没有菜单
                $where[] = ['id', 'in', $menu];
            }

            $mymenu=$this->menu->where($where)->order('weight asc,ID desc')->select()->toArray();
            $check_menu=[];
            foreach($mymenu as &$v)
            {
                $v['meta']=json_decode( $v['meta'],true);
                $check_menu[]=$v['id'];// 有权限的菜单数组
            }
        }




        Cache::set('check_menu'.$admin['id'], $check_menu, 86400);
        $menutree=list_to_tree($mymenu);
        return result($menutree, '获取菜单成功', '200');
    }



}

