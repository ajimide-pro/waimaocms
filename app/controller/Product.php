<?php
namespace app\controller;

use app\BaseController;
use think\facade\View;
use think\facade\Db;

class Product extends Common
{

    /* 产品 */
    public function index()
    {



        View::config(['view_path' => app()->getRootPath().'/pc/view/']);
        return View::fetch($this->erdai_template.'/product');
    }







}
