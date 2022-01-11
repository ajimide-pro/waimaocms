<?php
namespace app\controller;

use app\BaseController;
use think\facade\View;
use think\facade\Db;

class Index extends Common
{
    protected function initialize()
    {

        parent::initialize();
    }

        /* 首页 */
    public function index()
    {


        /* 首页产品列表 */
        $this->product_list=Db::name('product')->where('status',1)->where('lang', $this->contraller)->order('weight asc,id desc')->limit(8)->select()->toArray();
        foreach( $this->product_list as &$v)
        {
            /* 处理图片 */
            $v['image']=json_decode( $v['image'],true);
            if(isset( $v['image'][0]))
            {
                $v['image_array']=[];
                $v['litpic']=image_url('uploads/'.$v['image'][0]['name']);

            }
            else{
                $v['litpic']=image_url('/uploads/default/user.png');
            }
            $v['litpic']=str_replace('\\','/',$v['litpic']);
            /* 处理图片 */
        }

        /*关于我们*/
        $about=Db::name('onepage')->where('att_type',2)->where('lang', $this->contraller)->order('weight asc,id desc')->find();
        if(!$about)
        {
            $about['description']='';
            $about['id']='';
            $about['lang']='';
        }

        /*成功案列*/
        $this->case_list=Db::name('case')->where('status',1)->where('lang', $this->contraller)->order('weight asc,id desc')->limit(4)->select()->toArray();
        /*成功案列*/


        /*新闻资讯*/
        $this->news_list=Db::name('news')->where('status',1)->where('lang', $this->contraller)->order('weight asc,id desc')->limit(8)->select()->toArray();
        /*新闻资讯*/


        $this->links_list=Db::name('ad')->where('att_type',2)->where("position",1)->where('lang', $this->contraller)->order('weight asc,id desc')->limit(30)->select()->toArray(); //友情链接

        /* 首页产品列表 */
        View::assign('about',$about);
        View::assign('links_list', $this->links_list);
        View::assign('news_list', $this->news_list);
        View::assign('case_list',$this->case_list);
        View::assign('product_list',$this->product_list);
        View::config(['view_path' => app()->getRootPath().'/pc/view/']);
        return View::fetch($this->erdai_template.'/index');
    }


    /* 产品 */
    public function product()
    {



        View::config(['view_path' => app()->getRootPath().'/pc/view/']);
        return View::fetch($this->erdai_template.'/product');
    }






}
