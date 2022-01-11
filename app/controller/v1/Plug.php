<?php
namespace app\controller\v1;
use app\BaseController;
use think\facade\Db;
// 引入jwt插件
use thans\jwt\facade\JWTAuth;
class Plug extends BaseController
{
    // 初始化
    protected function initialize()
    {

        parent::initialize();

        $payload = JWTAuth::auth(); //可验证token, 并获取token中的payload部分
        $this->admin_user = $payload['username']->getValue(); //可以继而获取payload里自定义的字段，比如uid
        $this->plug=Db::name('plug');

        $this->lang=request()->header('lang');
    }



    public function Create()
    {
        $data = input('post.');

        $id=$data['id'];

        $data['admin_user']=$this->admin_user;
        $value=json_encode($data);
        $c=Db::name('plug')->where('id',$id)->find();


        if ($c) {
            $this->plug->where('id',$id)->update(['value'=>$value,'admin_user'=>$data['admin_user']]);
            return result('更新成功', '操作成功', '200');
        } else {

            $data['value']=$value;
            $this->plug->strict(false)->insertGetId($data);
            return result('更新成功', '操作成功', '200');
        }


    }

    public function Ad_get_list()
    {

        $where=[];
        $list = $this->plug->where($where)->select()->toArray();
        foreach($list as $l)
        {
            $l['value']=json_decode($l['value'],true);
            $listt[$l['id']]=$l;
        }
        return result($listt, '读取列表成功', '200');

    }

}
