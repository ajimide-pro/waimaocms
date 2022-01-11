<?php
/* 检查用户登录的菜单  CheckMenu  再次检查用户菜单权限*/
namespace app\middleware;
use thans\jwt\facade\JWTAuth;
use thans\jwt\exception\JWTException;
use think\facade\Db;
use think\facade\Cache;


class CheckMenu
{
    public function handle($request, \Closure $next)
    {
        // OPTIONS请求直接返回

        $payload = JWTAuth::auth(); //可验证token, 并获取token中的payload部分
        $this->username= $payload['username']->getValue(); //
        $adminid=Db::name('admin')->where('username',$this->username)->value('id');

        $check_menu=Cache::get('check_menu'.$adminid);

        if(!$check_menu || !is_array($check_menu))
        {
            return result('没有菜单权限','没有菜单权限',201);
        }

        $menu_id=input('menu_id');
        if($menu_id=='')  return result('菜单权限标识不能为空','菜单权限标识不能为空',201);

        if(!in_array($menu_id,$check_menu))
        {
            return result('没有菜单请求权限','没有菜单请求权限',201);
        }
      //  echo $ff;


        return $next($request);
    }
}
