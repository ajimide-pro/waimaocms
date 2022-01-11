<?php

namespace app\controller;

use app\BaseController;
use think\facade\View;
use think\facade\Db;
use think\facade\Request;
use think\facade\Session;
use think\facade\Cookie;
use GeoIp2\Database\Reader;


class Common extends BaseController
{
    // 初始化
    protected function initialize()
    {

        //echo $_SERVER['HTTP_HOST'];
        //获取域名

        $this->domian=$_SERVER['HTTP_HOST'];
        $this->ip=request()->ip();
        if( $this->ip=='127.0.0.1')  $this->ip='175.8.64.200'; //本地调试模式下，重置为国内的IP
     //   $this->ip='207.226.141.205';
        $this->http_type = ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') || (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https')) ? 'https://' : 'http://';


        $this->lang_list=Db::name('lang')->where('status',1)->order('weight asc,id desc')->select()->toArray(); // 语言列表



        $cookie_lang=cookie('lang');
        $this->contraller=Request()->controller(); //语言标识
        //
        if( $this->contraller=='Index' || $this->contraller=='Ajax'  || $this->contraller=='Cart') {
           if($cookie_lang=='') {

               $auto_area=Db::name('siteinfo')->where('type',1)->where('lang', 'zh')->value('auto_area'); //部分的设置，以中文的为准
               if(intval( $auto_area)=='0') {
                   $this->contraller = Db::name('lang')->where('status', 1)->where('index', 1)->value('lang'); //默认语言
               }
               else if(intval( $auto_area)=='1')
               {
                   //识别国内国外
                   $reader = new Reader(app()->getRootPath().'/public/static/GeoLite2-Country.mmdb');
                   $record = $reader->country($this->ip);
                   if(!$record)
                   {
                       $this->contraller =Db::name('lang')->where('status', 1)->where('index', 1)->value('lang'); //默认语言;
                   }
                   else{
                       $this->contraller = strtolower($record->country->isoCode);
                       if($this->contraller=='cn' || $this->contraller=='tw' || $this->contraller=='hk' || $this->contraller=='mo')
                       {
                           $this->contraller='zh';
                       }
                       else{
                           $this->contraller='en';
                       }

                       cookie('lang',$this->contraller);


                   }

               }
               else{
                   //识别国家
                   $reader = new Reader(app()->getRootPath().'/public/static/GeoLite2-Country.mmdb');
                   $record = $reader->country($this->ip);
                   if(!$record)
                   {
                       $this->contraller = Db::name('lang')->where('status', 1)->where('index', 1)->value('lang'); //默认语言;
                   }
                   else{
                       $mmlang=[];
                       foreach( $this->lang_list as $mlang)
                       {
                           $mmlang[]=$mlang['lang'];
                       }
                       $this->contraller = strtolower($record->country->isoCode);
                       if(!in_array($this->contraller,$mmlang)) $this->contraller= Db::name('lang')->where('status', 1)->where('index', 1)->value('lang'); //默认语言;
                       cookie('lang',$this->contraller);


                   }
               }

           }
            else {

                $this->contraller = $cookie_lang;
            }
        }


        $this->config=Db::name('siteinfo')->where('type',1)->where('lang', $this->contraller)->find(); //全局参数
        if(!$this->config)
        {
            $this->config['title']='';
            $this->config['keyword']='';
            $this->config['description']='';
            $this->config['logo']='';
            $this->config['html']='';
            $this->config['open']=1;
            $this->config['auto_area']=0;
        }


        if($this->config['open']=='0')
        {
            $this->error($this->config['close_text']);
            //网站已关闭
        }

        $this->navigation=Db::name('navigation')->where('att_type',1)->where('lang', $this->contraller)->order('weight asc,id desc')->select()->toArray(); // 头部导航栏
        $this->navigation_footer=Db::name('navigation')->where('att_type',2)->where('lang', $this->contraller)->order('weight asc,id desc')->select()->toArray(); // 底部导航栏

        $this->ad_hdp=[];
        $ad_hdp=Db::name('ad')->where('att_type',1)->where("position",1)->where('lang', $this->contraller)->order('weight asc,id desc')->limit(5)->select()->toArray(); //首页幻灯广告
        foreach($ad_hdp as $a)
        {
            $a['image']=json_decode(  $a['image'],true);
            if(is_array(  $a['image'])) {

                foreach (   $a['image'] as $ii => $v) {
                    $a['image'][$ii]['url'] = image_url('uploads/' . $a['image'][$ii]['name']);
                }
            }
            else{
                $a['image']=[];
            }

            $this->ad_hdp[]=$a;
        }


        /* 联系方式 */
        $this->contact=Db::name('contact')->where('lang', $this->contraller)->order('weight asc,id desc')->select()->toArray();
        /* 联系方式 */




       // echo lang('user.login');;
        /* 当前使用模板 */
        $this->erdai_template=env('SYSTEM.TEMPLATE');

        View::assign('contact',  $this->contact);
        View::assign('erdai_template',  $this->erdai_template);
        View::assign('config',  $this->config);
        View::assign('navigation', list_to_tree( $this->navigation));
        View::assign('navigation_footer', list_to_tree( $this->navigation_footer));
        View::assign('ad_hdp', $this->ad_hdp);

        View::assign('lang_list',$this->lang_list);
        View::assign('contraller', $this->contraller);

        View::assign('http_type',  $this->http_type);
        View::assign('domian',  $this->domian);
    }

    /* 面包屑导航 */
    public function bootstrap($content='',$channel='')
    {
        $boot=[];

        $boot[]=['title'=>$channel['title'],'url'=>'/index/'.$channel['table_name']];
        $classify=array_values(array_filter(explode('|',$content['classify'])));
        if(count($classify)>'0')
        {
            $classinfo=Db::name('content_classify')->field('title,pinyin')->whereIn('id',$classify)->select()->toArray();
            foreach($classinfo as $c)
            {
                $boot[]=['title'=>$c['title'],'url'=>'/'.$c['pinyin']];
            }
        }
        //print_r($boot);
       return $boot;
    }
}
