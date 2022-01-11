<?php
namespace app\controller;

use app\BaseController;
use think\facade\View;
use think\facade\Db;
use think\facade\Cookie;

class Cart extends Common
{
    protected function initialize()
    {
        parent::initialize();



    }


    public function buynow()
    {

        $id=intval(input('id'));
        $product=Db::name('product')->where('status',1)->where('lang', $this->contraller)->where('id',$id)->find();
        if(!$product)
        {
            $this->error('');
        }

        /* 首页产品列表 */

        View::config(['view_path' => app()->getRootPath().'/pc/view/']);
        View::assign('data',$product); //产品数据
        return View::fetch($this->erdai_template.'/buynow');
    }




}
