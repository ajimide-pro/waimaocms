<?php
namespace app\controller\v1;
use app\BaseController;
use think\facade\Db;
// 引入jwt插件
use thans\jwt\facade\JWTAuth;
class GiveNavigaTion extends BaseController
{
    // 初始化
    protected function initialize()
    {

        parent::initialize();

        $payload = JWTAuth::auth(); //可验证token, 并获取token中的payload部分
        $this->admin_user = $payload['username']->getValue(); //可以继而获取payload里自定义的字段，比如uid
        $this->navigation=Db::name('navigation');

        $this->lang=request()->header('lang');
    }


    /* 常用导航 */
    public function cydh()
    {
        $data = input('post.');
       // print_r($data);

        $url=[];
        $url[]=['title'=>'首页','url'=>'/'];
        $url[]=['title'=>'产品 首页','url'=>'/'.$data['lang'].'/product_list/id0.html'];
        $url[]=['title'=>'新闻 首页','url'=>'/'.$data['lang'].'/news_list/id0.html'];
        $url[]=['title'=>'单页 首页','url'=>'/'.$data['lang'].'/page_list/id0.html'];
        $url[]=['title'=>'案例 首页','url'=>'/'.$data['lang'].'/cases_list/id0.html'];
        $url[]=['title'=>'下载 首页','url'=>'/'.$data['lang'].'/down_list/id0.html'];


        return result($url, '操作成功', '200');

    }

    /* 产品分类 */
    public function cpfl()
    {
        $data = input('post.');
        // print_r($data);

        $where=[];
        if(isset($data['key']))
        {
            $where[]=['title','like','%'.$data['key'].'%'];
        }
        $list = Db::name('product_classify')->where('lang',$data['lang'])->where($where)->field('title,id')->limit(100)->order('weight asc,id desc')->select()->toArray();

        $url=[];
       foreach($list as $l) {
           $url[] = ['title' => $l['title'], 'url' => '/' . $data['lang'] . '/product_list/id'.$l['id'].'.html'];

       }


        return result($url, '操作成功', '200');

    }

    /* 产品 */
    public function cpcp()
    {
        $data = input('post.');
        // print_r($data);

        $where=[];
        if(isset($data['key']))
        {
            $where[]=['title','like','%'.$data['key'].'%'];
        }
        $list = Db::name('product')->where('lang',$data['lang'])->where($where)->field('title,id')->limit(100)->order('weight asc,id desc')->select()->toArray();

        $url=[];
        foreach($list as $l) {
            $url[] = ['title' => $l['title'], 'url' => '/' . $data['lang'] . '/product/id'.$l['id'].'.html'];

        }


        return result($url, '操作成功', '200');

    }


    /* 新闻分类 */
    public function xwfl()
    {
        $data = input('post.');
        // print_r($data);

        $where=[];
        if(isset($data['key']))
        {
            $where[]=['title','like','%'.$data['key'].'%'];
        }
        $list = Db::name('news_classify')->where('lang',$data['lang'])->where($where)->field('title,id')->limit(100)->order('weight asc,id desc')->select()->toArray();

        $url=[];
        foreach($list as $l) {
            $url[] = ['title' => $l['title'], 'url' => '/' . $data['lang'] . '/news_list/id'.$l['id'].'.html'];

        }


        return result($url, '操作成功', '200');

    }

    /* 新闻 */
    public function xwxw()
    {
        $data = input('post.');
        // print_r($data);

        $where=[];
        if(isset($data['key']))
        {
            $where[]=['title','like','%'.$data['key'].'%'];
        }
        $list = Db::name('news')->where('lang',$data['lang'])->where($where)->field('title,id')->limit(100)->order('weight asc,id desc')->select()->toArray();

        $url=[];
        foreach($list as $l) {
            $url[] = ['title' => $l['title'], 'url' => '/' . $data['lang'] . '/news/id'.$l['id'].'.html'];

        }


        return result($url, '操作成功', '200');

    }

    /* 案例分类 */
    public function alfl()
    {
        $data = input('post.');
        // print_r($data);

        $where=[];
        if(isset($data['key']))
        {
            $where[]=['title','like','%'.$data['key'].'%'];
        }
        $list = Db::name('case_classify')->where('lang',$data['lang'])->where($where)->field('title,id')->limit(100)->order('weight asc,id desc')->select()->toArray();

        $url=[];
        foreach($list as $l) {
            $url[] = ['title' => $l['title'], 'url' => '/' . $data['lang'] . '/cases_list/id'.$l['id'].'.html'];

        }


        return result($url, '操作成功', '200');

    }

    /* 案例 */
    public function alal()
    {
        $data = input('post.');
        // print_r($data);

        $where=[];
        if(isset($data['key']))
        {
            $where[]=['title','like','%'.$data['key'].'%'];
        }
        $list = Db::name('case')->where('lang',$data['lang'])->where($where)->field('title,id')->limit(100)->order('weight asc,id desc')->select()->toArray();

        $url=[];
        foreach($list as $l) {
            $url[] = ['title' => $l['title'], 'url' => '/' . $data['lang'] . '/cases/id'.$l['id'].'.html'];

        }


        return result($url, '操作成功', '200');

    }

    /* 单页 */
    public function dydy()
    {
        $data = input('post.');
        // print_r($data);

        $where=[];
        if(isset($data['key']))
        {
            $where[]=['title','like','%'.$data['key'].'%'];
        }
        $list = Db::name('onepage')->where('lang',$data['lang'])->where($where)->field('title,id')->limit(100)->order('weight asc,id desc')->select()->toArray();

        $url=[];
        foreach($list as $l) {
            $url[] = ['title' => $l['title'], 'url' => '/' . $data['lang'] . '/page/id'.$l['id'].'.html'];

        }


        return result($url, '操作成功', '200');

    }


}
