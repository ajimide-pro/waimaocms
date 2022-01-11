<?php
namespace app\controller;

use app\BaseController;
use think\facade\View;
use think\facade\Db;
use think\facade\Cookie;

class Zh extends Common
{
    protected function initialize()
    {
        parent::initialize();
        $this->links_list=Db::name('ad')->where('att_type',2)->where("position",2)->where('lang', $this->contraller)->order('weight asc,id desc')->limit(30)->select()->toArray(); //友情链接
        $token=rand(10000,99999).time().rand(10000,99999);

        Cookie::set('token',$token,600);

        View::assign('token',$token);
        View::assign('links_list', $this->links_list);
    }


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

        /*成功案列*/
        $this->case_list=Db::name('case')->where('status',1)->where('lang', $this->contraller)->order('weight asc,id desc')->limit(4)->select()->toArray();
        /*成功案列*/


        /* 首页产品列表 */
        View::assign('product_list',$this->product_list);
        View::assign('case_list',$this->case_list);
        View::config(['view_path' => app()->getRootPath().'/pc/view/']);

        return View::fetch($this->erdai_template.'/index');
    }


    /* 产品 */
    public function product()
    {

        $get=array_keys(input());
        if(empty($get))  $get=$_REQUEST['s'];

        $id=preg_replace('/\D/s', '', $get);
        if(!isset($id[0]))
        {
            $this->error('');
        }
        if(intval($id[0])=='0')
        {
            $this->error('');
        }
        $id=$id[0];

        $product=Db::name('product')->where('status',1)->where('lang', $this->contraller)->where('id',$id)->find();
        if(!$product)
        {
            $this->error('');
        }
        if($product['image']=='') $product['image']=[];
        else $product['image']=json_decode($product['image'],true);


        /* 广告 */
        $ad_list=Db::name('ad')->where('lang', $this->contraller)->where('position','2')->order('weight asc,id desc')->select()->toArray();
        foreach($ad_list as &$v)
        {
            $v['image']=json_decode($v['image'],true);
        }
        //print_r($ad_list);
        /* 广告 */

        /* 获取相关产品*/
            $like_list=Db::name('product')->where('status',1)->where('lang', $this->contraller)->where('parent',$product['parent'])->order('weight asc,id desc')->limit(5)->select()->toArray();
        /* 获取相关产品*/


        /* 获取产品分类*/
        $classify_list=Db::name('product_classify')->where('lang', $this->contraller)->where('parent',0)->order('weight asc,id desc')->limit(5)->select()->toArray();
        /* 获取产品分类*/

        //列表是按照根据id降序排列的，所以上一篇
        $prv=Db::name('product')->where('id','<',$id)->where('lang', $this->contraller)->limit('1')->find();
        View::assign('prv',$prv);
        //列表是按照根据id降序排列的，所以下一篇
        $next=Db::name('product')->where('id','>',$id)->where('lang', $this->contraller)->limit('1')->find();
        View::assign('next',$next);

        Db::name('product')->where('id',$id)->inc('click',1)->update();;

        View::assign('classify_list',$classify_list); //产品分类
        View::assign('like_list',$like_list); //相关产品
        View::assign('ad_list',$ad_list); //广告列表
        View::assign('data',$product); //产品数据
        View::config(['view_path' => app()->getRootPath().'/pc/view/']);
        return View::fetch($this->erdai_template.'/product');
    }

    /* 产品列表 */
    public function product_list()
    {

        $get=array_keys(input());
        $id=preg_replace('/\D/s', '', $get);
        if(intval($id[0])=='0')
        {
            $this->error('');
        }
        $id=$id[0];


        $classify=Db::name('product_classify')->where('lang', $this->contraller)->where('id',$id)->find();
        if(!$classify)
        {
            $this->error('');
        }
        if($classify['image']=='') $classify['image']=[];
        else $classify['image']=json_decode($classify['image'],true);



        /* 广告 */
        $ad_list=Db::name('ad')->where('lang', $this->contraller)->where('position','2')->order('weight asc,id desc')->select()->toArray();
        foreach($ad_list as &$v)
        {
            $v['image']=json_decode($v['image'],true);
        }


        /* 获取产品分类*/
        $classify_list=Db::name('product_classify')->where('lang', $this->contraller)->where('parent',0)->order('weight asc,id desc')->limit(5)->select()->toArray();
        /* 获取产品分类*/

        /* 获取热门产品*/
        $like_list=Db::name('product')->where('status',1)->where('lang', $this->contraller)->order('weight asc,id desc')->limit(5)->select()->toArray();
        /* 获取热门产品*/
        $where=[];

        $classify_parent=classify_parent($id,$classify['title'],$this->contraller,'news_classify'); //下级分类数据
        foreach($classify_parent as $fl)
        {
            $fldata[]='['.$fl['id'].']';
        }

        $where[]=['parent','like',$fldata,'OR'];

        $order='weight asc,id DESC';
        $limit=input('limit')?input('limit'):12;
        $page=input('page')?input('page'):0;

        $list=Db::name('product')->where('lang',$this->contraller)->where($where)->order($order)->paginate($limit);


        $page = $list->render();

        View::assign('classify_list',$classify_list); //产品分类
        View::assign('list',$list);
        View::assign('page',$page);
        View::assign('data',$classify); //相关产品
        View::assign('like_list',$like_list); //相关产品
        View::assign('ad_list',$ad_list); //广告列表
        View::config(['view_path' => app()->getRootPath().'/pc/view/']);
        return View::fetch($this->erdai_template.'/product_list');
    }

    /* 单页 */
    public function page()
    {

        $get=array_keys(input());
        $id=preg_replace('/\D/s', '', $get);
        if(intval($id[0])=='0')
        {
            $this->error('');
        }
        $id=$id[0];

        $data=Db::name('onepage')->where('lang', $this->contraller)->where('id',$id)->find();
        if(!$data)
        {
            $this->error('');
        }

        /* 广告 */
        $ad_list=Db::name('ad')->where('lang', $this->contraller)->where('position','4')->order('weight asc,id desc')->select()->toArray();
        foreach($ad_list as &$v)
        {
            $v['image']=json_decode($v['image'],true);
        }
        //print_r($ad_list);
        /* 广告 */

        /* 列表  */
        $list=Db::name('onepage')->where('lang', $this->contraller)->order('weight asc,id desc')->limit(5)->select()->toArray();
        /* 列表  */

        /* 获取产品分类*/
        $classify_list=Db::name('product_classify')->where('lang', $this->contraller)->where('parent',0)->order('weight asc,id desc')->limit(5)->select()->toArray();
        /* 获取产品分类*/

        $template=!empty($data['template']) && $data['template']!='默认模板'?'/onepage/'.$data['template']:'page';
        $template=str_replace('.html','',$template);
        $template=str_replace('.htm','',$template);


        View::assign('classify_list',$classify_list);
        View::assign('list',$list);
        View::assign('ad_list',$ad_list); //广告列表
        View::assign('data',$data);
        View::config(['view_path' => app()->getRootPath().'/pc/view/']);
        return View::fetch($this->erdai_template.'/'. $template);
    }


    /* 案例详情 */
    public function cases()
    {

        $get=array_keys(input());
        $id=preg_replace('/\D/s', '', $get);
        if(intval($id[0])=='0')
        {
            $this->error('');
        }
        $id=$id[0];

        $product=Db::name('case')->where('status',1)->where('lang', $this->contraller)->where('id',$id)->find();
        if(!$product)
        {
            $this->error('');
        }
        if($product['image']=='') $product['image']=[];
        else $product['image']=json_decode($product['image'],true);


        /* 广告 */
        $ad_list=Db::name('ad')->where('lang', $this->contraller)->where('position','5')->order('weight asc,id desc')->select()->toArray();
        foreach($ad_list as &$v)
        {
            $v['image']=json_decode($v['image'],true);
        }
        //print_r($ad_list);
        /* 广告 */

        /* 获取相关案列*/
        $like_list=Db::name('case')->where('status',1)->where('lang', $this->contraller)->where('parent',$product['parent'])->order('weight asc,id desc')->limit(5)->select()->toArray();
        /* 获取相关案列*/


        /* 获取产品分类*/
        $classify_list=Db::name('case_classify')->where('lang', $this->contraller)->where('parent',0)->order('weight asc,id desc')->limit(5)->select()->toArray();
        /* 获取产品分类*/


        //列表是按照根据id降序排列的，所以上一篇
        $prv=Db::name('case')->where('id','<',$id)->where('lang', $this->contraller)->limit('1')->find();
        View::assign('prv',$prv);
        //列表是按照根据id降序排列的，所以下一篇
        $next=Db::name('case')->where('id','>',$id)->where('lang', $this->contraller)->limit('1')->find();
        View::assign('next',$next);


        View::assign('classify_list',$classify_list); //产品分类
        View::assign('like_list',$like_list); //相关产品
        View::assign('ad_list',$ad_list); //广告列表
        View::assign('data',$product); //产品数据
        View::config(['view_path' => app()->getRootPath().'/pc/view/']);
        return View::fetch($this->erdai_template.'/cases');
    }


    /* 新闻 */
    public function news()
    {

        $get=array_keys(input());
        $id=preg_replace('/\D/s', '', $get);
        if(intval($id[0])=='0')
        {
            $this->error('');
        }
        $id=$id[0];

        $product=Db::name('news')->where('status',1)->where('lang', $this->contraller)->where('id',$id)->find();
        if(!$product)
        {
            $this->error('');
        }
        if($product['image']=='') $product['image']=[];
        else $product['image']=json_decode($product['image'],true);


        /* 广告 */
        $ad_list=Db::name('ad')->where('lang', $this->contraller)->where('position','5')->order('weight asc,id desc')->select()->toArray();
        foreach($ad_list as &$v)
        {
            $v['image']=json_decode($v['image'],true);
        }
        //print_r($ad_list);
        /* 广告 */

        /* 获取相关分类*/
        $like_list=Db::name('news_classify')->where('lang', $this->contraller)->where('parent',0)->order('weight asc,id desc')->limit(5)->select()->toArray();
        /* 获取相关分类*/

        /* 获取当前分类*/
        $parent=json_decode($product['parent'],true);

        if(isset($parent[0])) {
            $classify = Db::name('news_classify')->where('lang', $this->contraller)->where('id', $parent[0])->order('weight asc,id desc')->find();
        }
        else{
            $classify=[];
        }
        /* 获取当前分类*/



        /* 获取产品分类*/
        $classify_list=Db::name('product_classify')->where('lang', $this->contraller)->where('parent',0)->order('weight asc,id desc')->limit(5)->select()->toArray();
        /* 获取产品分类*/



        //列表是按照根据id降序排列的，所以上一篇
        $prv=Db::name('news')->where('id','<',$id)->where('lang', $this->contraller)->limit('1')->find();
        View::assign('prv',$prv);
        //列表是按照根据id降序排列的，所以下一篇
        $next=Db::name('news')->where('id','>',$id)->where('lang', $this->contraller)->limit('1')->find();
        View::assign('next',$next);

        Db::name('news')->where('id',$id)->inc('click',1)->update();;


        View::assign('classify_list',$classify_list); //产品分类
        View::assign('like_list',$like_list); //相关产品
        View::assign('ad_list',$ad_list); //广告列表
        View::assign('data',$product); //产品数据
        View::assign('classify',$classify); //当前分类
        View::config(['view_path' => app()->getRootPath().'/pc/view/']);
        return View::fetch($this->erdai_template.'/news');
    }


    /* 新闻列表 */
    public function news_list()
    {

        $get=array_keys(input());
        $id=preg_replace('/\D/s', '', $get);
        if(intval($id[0])=='0')
        {
            $this->error('');
        }
        $id=$id[0];


        $classify=Db::name('news_classify')->where('lang', $this->contraller)->where('id',$id)->find();
        if(!$classify)
        {
            $this->error('');
        }
        if($classify['image']=='') $classify['image']=[];
        else $classify['image']=json_decode($classify['image'],true);



        /* 广告 */
        $ad_list=Db::name('ad')->where('lang', $this->contraller)->where('position','2')->order('weight asc,id desc')->select()->toArray();
        foreach($ad_list as &$v)
        {
            $v['image']=json_decode($v['image'],true);
        }


        /* 获取产品分类*/
        $classify_list=Db::name('product_classify')->where('lang', $this->contraller)->where('parent',0)->order('weight asc,id desc')->limit(5)->select()->toArray();
        /* 获取产品分类*/

        /* 获取热门产品*/
        $like_list=Db::name('news')->where('status',1)->where('lang', $this->contraller)->order('weight asc,id desc')->limit(5)->select()->toArray();
        /* 获取热门产品*/
        $where=[];

        $classify_parent=classify_parent($id,$classify['title'],$this->contraller,'news_classify'); //下级分类数据
        foreach($classify_parent as $fl)
        {
            $fldata[]='['.$fl['id'].']';
        }

        $where[]=['parent','like',$fldata,'OR'];


        $order='weight asc,id DESC';
        $limit=input('limit')?input('limit'):12;
        $page=input('page')?input('page'):0;

        $list=Db::name('news')->where('lang',$this->contraller)->where($where)->order($order)->paginate($limit);


        $page = $list->render();

        View::assign('classify_list',$classify_list); //产品分类
        View::assign('list',$list);
        View::assign('page',$page);
        View::assign('data',$classify); //相关产品
        View::assign('like_list',$like_list); //相关产品
        View::assign('ad_list',$ad_list); //广告列表
        View::config(['view_path' => app()->getRootPath().'/pc/view/']);
        return View::fetch($this->erdai_template.'/news_list');
    }

    /* 搜索 */
    public function search()
    {
        $key=input('key');
        $channel=input('channel');

        $where[]= ['title','like','%'.$key.'%'];

        $count_product=Db::name('product')->where('status',1)->where('lang', $this->contraller)->where($where)->count();

        $count_news=Db::name('news')->where('status',1)->where('lang', $this->contraller)->where($where)->count();

        $count_case=Db::name('case')->where('status',1)->where('lang', $this->contraller)->where($where)->count();
        $limit=input('limit')?input('limit'):12;
        $page=input('page')?input('page'):0;

        if($channel=='news')
        {


            $list=Db::name('news')->where('lang',$this->contraller)->where($where)->order('weight asc,id DESC')->paginate($limit);
            $page = $list->render();
        }
        else if($channel=='case')
        {
            $list=Db::name('case')->where('lang',$this->contraller)->where($where)->order('weight asc,id DESC')->paginate($limit);
            $page = $list->render();
        }
        else
        {
            $list=Db::name('product')->where('lang',$this->contraller)->where($where)->order('weight asc,id DESC')->paginate($limit);
            $page = $list->render();
        }

        View::assign('count_product',$count_product);
        View::assign('count_news',$count_news);
        View::assign('count_case',$count_case);
        View::assign('key',urldecode($key));
        View::assign('list',$list);
        View::assign('page',$page);
        View::config(['view_path' => app()->getRootPath().'/pc/view/']);
        return View::fetch($this->erdai_template.'/search');
    }


    /* 案例列表 */
    public function cases_list()
    {

        $get=array_keys(input());
        $id=preg_replace('/\D/s', '', $get);
        if(intval($id[0])=='0')
        {
            $this->error('');
        }
        $id=$id[0];


        $classify=Db::name('case_classify')->where('lang', $this->contraller)->where('id',$id)->find();
        if(!$classify)
        {
            $this->error('');
        }
        if($classify['image']=='') $classify['image']=[];
        else $classify['image']=json_decode($classify['image'],true);



        /* 广告 */
        $ad_list=Db::name('ad')->where('lang', $this->contraller)->where('position','2')->order('weight asc,id desc')->select()->toArray();
        foreach($ad_list as &$v)
        {
            $v['image']=json_decode($v['image'],true);
        }


        /* 获取产品分类*/
        $classify_list=Db::name('case_classify')->where('lang', $this->contraller)->where('parent',0)->order('weight asc,id desc')->limit(5)->select()->toArray();
        /* 获取产品分类*/

        /* 获取热门产品*/
        $like_list=Db::name('case')->where('status',1)->where('lang', $this->contraller)->order('weight asc,id desc')->limit(5)->select()->toArray();
        /* 获取热门产品*/
        $where=[];

        $classify_parent=classify_parent($id,$classify['title'],$this->contraller,'case_classify'); //下级分类数据
        foreach($classify_parent as $fl)
        {
            $fldata[]='['.$fl['id'].']';
        }

        $where[]=['parent','like',$fldata,'OR'];

        $order='weight asc,id DESC';
        $limit=input('limit')?input('limit'):12;
        $page=input('page')?input('page'):0;

        $list=Db::name('case')->where('lang',$this->contraller)->where($where)->order($order)->paginate($limit);


        $page = $list->render();

        View::assign('classify_list',$classify_list); //案例分类
        View::assign('list',$list);
        View::assign('page',$page);
        View::assign('data',$classify); //相关产品
        View::assign('like_list',$like_list); //相关产品
        View::assign('ad_list',$ad_list); //广告列表
        View::config(['view_path' => app()->getRootPath().'/pc/view/']);
        return View::fetch($this->erdai_template.'/cases_list');
    }



}
