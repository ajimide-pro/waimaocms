<?php
namespace app\controller\v1;
use app\BaseController;
use think\facade\Db;
// 引入jwt插件
use thans\jwt\facade\JWTAuth;
class FanyiBaidu extends BaseController
{
    // 初始化
    protected function initialize()
    {

        parent::initialize();

        $payload = JWTAuth::auth(); //可验证token, 并获取token中的payload部分
        $this->admin_user = $payload['username']->getValue(); //可以继而获取payload里自定义的字段，比如uid
        $this->ad=Db::name('ad');

        $this->lang=request()->header('lang');
    }


    /** 百度翻译入口

     */
    function translate()
    {
        $data=Db::name('plug')->where('id',1)->find();
        if(!$data)  return result('请先配置后台翻译接口参数', '错误', '202');
        $value=json_decode($data['value'],true);
        if(!isset($value['fanyi_baidu_appid']))  return result('请先配置后台翻译接口参数', '错误', '202');

        $dataa = input('post.');
        if(!isset($dataa['from'])) $dataa['from']='auto';



        $fy_url    = env('FANYI.FANYI_URL_BAIDU');
        $app_id =   $value['fanyi_baidu_appid'];
        $sec_key =    $value['fanyi_baidu_key'];

        //echo $dataa['id'];
       // exit();

        $get_translate=get_translate($dataa['action'],$dataa['id'], $dataa['from']);//获取需要翻译的内容
    //   print_r($get_translate['translate']);
     //  exit();

        $tlist=[];//已翻译的字段名
        $c=count($get_translate['translate'])-1;
        $cc=0;

        foreach($get_translate['translate'] as $vv=>$g)
        {


            foreach($g as $n=>$v) {

                if ($v != '') {
                    $v=str_replace('\n','',$v);// \n用于区分多个翻译内容
                    if($cc<$c) {
                        $dataa['q'] = $dataa['q'] . $v . PHP_EOL;


                    }
                    else{
                        $dataa['q'] = $dataa['q'] . $v;
                    }
                    $tlist[]=$n;//已翻译的字段名
                }
                $cc++;
            }
        }

       // echo $dataa['q'];
       // exit();
        foreach($dataa['tolanglist'] as $lang) {


            $args = array(
                'q' => $dataa['q'],
                'appid' => $app_id,
                'salt' => rand(10000, 99999),
                'from' => $dataa['from'],
                'to' =>$lang,
            );
            $args['sign'] = $this->buildSign($dataa['q'], $app_id, $args['salt'], $sec_key);
          //  print_r($args);
            //exit();

            $ret = $this->call($fy_url, $args);


            $ret = json_decode($ret, true);
            if(isset($ret['error_msg']))  return result($ret['error_code'].$ret['error_msg'], '错误', '202');


            if(isset($ret['trans_result']))
            {

                if($dataa['action']=='systeminfo')
                {

                    foreach($get_translate['data'] as $v=>$g){
                        //替换原数据
                      //  if(in_array($v,$tlist)) $get_translate['data']['title']=
                        foreach($tlist as $i=>$a)
                        {
                           // echo $v.'---'.$a;
                            //exit();
                            if($v==$a)  $get_translate['data'][$v]=$ret['trans_result'][$i]['dst'];
                        }

                    }
                    $get_translate['data']['lang']=$lang;
                    $c=Db::name('siteinfo')->field('id')->where('lang',$lang)->where('type', $get_translate['data']['type'])->find();
                    if($c) Db::name('siteinfo')->where('lang',$lang)->where('type', $get_translate['data']['type'])->update( $get_translate['data']);
                    else  Db::name('siteinfo')->insertGetId($get_translate['data']);
                //systeminfo
                }
                else if($dataa['action']=='siteinfo')
                {

                    foreach($get_translate['data'] as $v=>$g){
                        //替换原数据
                        //  if(in_array($v,$tlist)) $get_translate['data']['title']=
                        foreach($tlist as $i=>$a)
                        {
                            // echo $v.'---'.$a;
                            //exit();
                            if($v==$a)  $get_translate['data'][$v]=$ret['trans_result'][$i]['dst'];
                        }

                    }
                    $get_translate['data']['lang']=$lang;
                    $c=Db::name('siteinfo')->field('id')->where('lang',$lang)->where('type', $get_translate['data']['type'])->find();
                    if($c) Db::name('siteinfo')->where('lang',$lang)->where('type', $get_translate['data']['type'])->update( $get_translate['data']);
                    else  Db::name('siteinfo')->insertGetId($get_translate['data']);

                   //siteinfo
                }
                else if($dataa['action']=='product') {

                    foreach($get_translate['data'] as $v=>$g){
                        //替换原数据
                        //  if(in_array($v,$tlist)) $get_translate['data']['title']=
                        foreach($tlist as $i=>$a)
                        {
                            // echo $v.'---'.$a;
                            //exit();
                            if($v==$a)  $get_translate['data'][$v]=$ret['trans_result'][$i]['dst'];
                        }

                    }
                    $get_translate['data']['lang']=$lang;
                    $c=Db::name('product')->field('id')->where('fanyi_from_id',$dataa['id'])->where('lang',$lang)->find(); //是否翻译过
                    if($c) Db::name('product')->where('id',$c['id'])->update( $get_translate['data']);
                    else {
                        $get_translate['data']['parent']=0;//
                        $get_translate['data']['fanyi_from_id']=$dataa['id'];//原始产品ID
                        Db::name('product')->insertGetId($get_translate['data']);
                    }
                    //产品翻译
                }
                else if($dataa['action']=='product_classify') {

                    foreach($get_translate['data'] as $v=>$g){
                        //替换原数据
                        //  if(in_array($v,$tlist)) $get_translate['data']['title']=
                        foreach($tlist as $i=>$a)
                        {
                            // echo $v.'---'.$a;
                            //exit();
                            if($v==$a)  $get_translate['data'][$v]=$ret['trans_result'][$i]['dst'];
                        }

                    }
                    $get_translate['data']['lang']=$lang;
                    $c=Db::name('product_classify')->field('id')->where('fanyi_from_id',$dataa['id'])->where('lang',$lang)->find(); //是否翻译过
                    if($c) Db::name('product_classify')->where('id',$c['id'])->update( $get_translate['data']);
                    else {
                        $get_translate['data']['parent']=0;//默认为顶级分类
                        $get_translate['data']['fanyi_from_id']=$dataa['id'];//原始产品ID
                        Db::name('product_classify')->insertGetId($get_translate['data']);
                    }
                    //产品分类翻译
                }
                else if($dataa['action']=='onepage') {

                    foreach($get_translate['data'] as $v=>$g){
                        //替换原数据
                        //  if(in_array($v,$tlist)) $get_translate['data']['title']=
                        foreach($tlist as $i=>$a)
                        {
                            // echo $v.'---'.$a;
                            //exit();
                            if($v==$a)  $get_translate['data'][$v]=$ret['trans_result'][$i]['dst'];
                        }

                    }
                    $get_translate['data']['lang']=$lang;
                    $c=Db::name('onepage')->field('id')->where('fanyi_from_id',$dataa['id'])->where('lang',$lang)->find(); //是否翻译过
                    if($c) Db::name('onepage')->where('id',$c['id'])->update( $get_translate['data']);
                    else {
                        $get_translate['data']['parent']=0;//
                        $get_translate['data']['fanyi_from_id']=$dataa['id'];//原始产品ID
                        Db::name('onepage')->insertGetId($get_translate['data']);
                    }
                    //单页翻译
                }

                else if($dataa['action']=='onepage_classify') {

                    foreach($get_translate['data'] as $v=>$g){
                        //替换原数据
                        //  if(in_array($v,$tlist)) $get_translate['data']['title']=
                        foreach($tlist as $i=>$a)
                        {
                            // echo $v.'---'.$a;
                            //exit();
                            if($v==$a)  $get_translate['data'][$v]=$ret['trans_result'][$i]['dst'];
                        }

                    }
                    $get_translate['data']['lang']=$lang;
                    $c=Db::name('onepage_classify')->field('id')->where('fanyi_from_id',$dataa['id'])->where('lang',$lang)->find(); //是否翻译过
                    if($c) Db::name('onepage_classify')->where('id',$c['id'])->update( $get_translate['data']);
                    else {
                        $get_translate['data']['parent']=0;//
                        $get_translate['data']['fanyi_from_id']=$dataa['id'];//原始产品ID
                        Db::name('onepage_classify')->insertGetId($get_translate['data']);
                    }
                    //单页分类翻译
                }

                else if($dataa['action']=='news') {

                    foreach($get_translate['data'] as $v=>$g){
                        //替换原数据
                        //  if(in_array($v,$tlist)) $get_translate['data']['title']=
                        foreach($tlist as $i=>$a)
                        {
                            // echo $v.'---'.$a;
                            //exit();
                            if($v==$a)  $get_translate['data'][$v]=$ret['trans_result'][$i]['dst'];
                        }

                    }
                    $get_translate['data']['lang']=$lang;
                    $c=Db::name('news')->field('id')->where('fanyi_from_id',$dataa['id'])->where('lang',$lang)->find(); //是否翻译过
                    if($c) Db::name('news')->where('id',$c['id'])->update( $get_translate['data']);
                    else {
                        $get_translate['data']['parent']=0;//
                        $get_translate['data']['fanyi_from_id']=$dataa['id'];//原始产品ID
                        Db::name('news')->insertGetId($get_translate['data']);
                    }
                    //新闻翻译
                }
                else if($dataa['action']=='news_classify') {

                    foreach($get_translate['data'] as $v=>$g){
                        //替换原数据
                        //  if(in_array($v,$tlist)) $get_translate['data']['title']=
                        foreach($tlist as $i=>$a)
                        {
                            // echo $v.'---'.$a;
                            //exit();
                            if($v==$a)  $get_translate['data'][$v]=$ret['trans_result'][$i]['dst'];
                        }

                    }
                    $get_translate['data']['lang']=$lang;
                    $c=Db::name('news_classify')->field('id')->where('fanyi_from_id',$dataa['id'])->where('lang',$lang)->find(); //是否翻译过
                    if($c) Db::name('news_classify')->where('id',$c['id'])->update( $get_translate['data']);
                    else {
                        $get_translate['data']['parent']=0;//
                        $get_translate['data']['fanyi_from_id']=$dataa['id'];//原始产品ID
                        Db::name('news_classify')->insertGetId($get_translate['data']);
                    }
                    //新闻分类翻译
                }
                else if($dataa['action']=='cases') {

                    foreach($get_translate['data'] as $v=>$g){
                        //替换原数据
                        //  if(in_array($v,$tlist)) $get_translate['data']['title']=
                        foreach($tlist as $i=>$a)
                        {
                            // echo $v.'---'.$a;
                            //exit();
                            if($v==$a)  $get_translate['data'][$v]=$ret['trans_result'][$i]['dst'];
                        }

                    }
                    $get_translate['data']['lang']=$lang;
                    $c=Db::name('case')->field('id')->where('fanyi_from_id',$dataa['id'])->where('lang',$lang)->find(); //是否翻译过
                    if($c) Db::name('case')->where('id',$c['id'])->update( $get_translate['data']);
                    else {
                        $get_translate['data']['parent']=0;//
                        $get_translate['data']['fanyi_from_id']=$dataa['id'];//原始产品ID
                        Db::name('case')->insertGetId($get_translate['data']);
                    }
                    //案例翻译
                } else if($dataa['action']=='cases_classify') {

                    foreach($get_translate['data'] as $v=>$g){
                        //替换原数据
                        //  if(in_array($v,$tlist)) $get_translate['data']['title']=
                        foreach($tlist as $i=>$a)
                        {
                            // echo $v.'---'.$a;
                            //exit();
                            if($v==$a)  $get_translate['data'][$v]=$ret['trans_result'][$i]['dst'];
                        }

                    }
                    $get_translate['data']['lang']=$lang;
                    $c=Db::name('case_classify')->field('id')->where('fanyi_from_id',$dataa['id'])->where('lang',$lang)->find(); //是否翻译过
                    if($c) Db::name('case_classify')->where('id',$c['id'])->update( $get_translate['data']);
                    else {
                        $get_translate['data']['parent']=0;//
                        $get_translate['data']['fanyi_from_id']=$dataa['id'];//原始产品ID
                        Db::name('case_classify')->insertGetId($get_translate['data']);
                    }
                    //案例分类翻译
                }
                else if($dataa['action']=='navigation') {

                    foreach($get_translate['data'] as $v=>$g){
                        //替换原数据
                        //  if(in_array($v,$tlist)) $get_translate['data']['title']=
                        foreach($tlist as $i=>$a)
                        {
                            // echo $v.'---'.$a;
                            //exit();
                            if($v==$a)  $get_translate['data'][$v]=$ret['trans_result'][$i]['dst'];
                        }

                    }
                    $get_translate['data']['url']=str_replace('/'.$dataa['from'].'/','/'.$lang.'/',$get_translate['data']['url']);
                    $get_translate['data']['lang']=$lang;
                    $c=Db::name('navigation')->field('id')->where('fanyi_from_id',$dataa['id'])->where('lang',$lang)->find(); //是否翻译过
                    if($c) Db::name('navigation')->where('id',$c['id'])->update( $get_translate['data']);
                    else {
                        $get_translate['data']['parent']=0;//默认为顶级分类
                        $get_translate['data']['fanyi_from_id']=$dataa['id'];//原始产品ID
                        Db::name('navigation')->insertGetId($get_translate['data']);
                    }
                    //导航翻译
                }

                }
            else{
                //翻译失败

                return result('翻译失败，请稍后再试', '错误', '202');
            }



            sleep(1);

        }
        return result('翻译成功，您可以切换到对应语种的后台查看结果！', '操作成功', '200');
    }

    //加密
    function buildSign($query, $appID, $salt, $secKey)
    {
        $str = $appID . $query . $salt . $secKey;
        $ret = md5($str);
        return $ret;
    }

    //发起网络请求
    function call($url, $args=null, $method="post", $testflag = 0, $timeout = 10, $headers=array())
    {
        $ret = false;
        $i = 0;
        while($ret === false)
        {
            if($i > 1)
                break;
            if($i > 0)
            {
                sleep(1);
            }
            $ret = $this->callOnce($url, $args, $method, false, $timeout, $headers);
            $i++;
        }
        return $ret;
    }

    function callOnce($url, $args=null, $method="post", $withCookie = false, $timeout = 10, $headers=array())
    {
        $ch = curl_init();
        if($method == "post")
        {
            $data = $this->convert($args);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            curl_setopt($ch, CURLOPT_POST, 1);
        }
        else
        {
            $data = convert($args);
            if($data)
            {
                if(stripos($url, "?") > 0)
                {
                    $url .= "&$data";
                }
                else
                {
                    $url .= "?$data";
                }
            }
        }
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        if(!empty($headers))
        {
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        }
        if($withCookie)
        {
            curl_setopt($ch, CURLOPT_COOKIEJAR, $_COOKIE);
        }
        $r = curl_exec($ch);
        curl_close($ch);
        return $r;
    }

    function convert(&$args)
    {
        $data = '';
        if (is_array($args))
        {
            foreach ($args as $key=>$val)
            {
                if (is_array($val))
                {
                    foreach ($val as $k=>$v)
                    {
                        $data .= $key.'['.$k.']='.rawurlencode($v).'&';
                    }
                }
                else
                {
                    $data .="$key=".rawurlencode($val)."&";
                }
            }
            return trim($data, "&");
        }
        return $args;
    }


}
