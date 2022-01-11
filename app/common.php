<?php

use think\Response;
use think\facade\Db;
use think\facade\Lang;
// 应用公共文件

// 统一返回数据格式
function result($data = [], string $msg = 'error', int $code = 200, string $type = 'json'):Response
{
    $result = [
        "code" => $code,
        "msg" => $msg,
        "data" => $data
    ];
    // 调用Response的create方法，指定code可以改变请求的返回状态码
    return Response::create($result, $type)->code($code);
}

/* 统一保存 base64 为图片*/
function saveBase64Image($base64_image_content){

    if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image_content, $result)){
        //图片后缀
        $type = $result[2];
        //保存位置--图片名
        $image_name=date('His').str_pad(mt_rand(1, 99999), 5, '0', STR_PAD_LEFT).".".$type;
        $image_file_path = '/uploads/image/'.date('Ymd');
        $image_file ='..'.$image_file_path;
        $imge_real_url = $image_file.'/'.$image_name;
        $imge_web_url = $image_file_path.'/'.$image_name;
        if (!file_exists($image_file)){
            mkdir($image_file, 0700);
            fopen($image_file.'\\'.$image_name, "w");
        }
        //解码
        $decode=base64_decode(str_replace($result[1], '', $base64_image_content));
        if (file_put_contents($imge_real_url, $decode)){
            $data['code']=0;
            $data['imageName']=$image_name;
            $data['url']=$imge_web_url;
            $data['msg']='保存成功！';
        }else{
            $data['code']=1;
            $data['imgageName']='';
            $data['url']='';
            $data['msg']='图片保存失败！';
        }
    }else{
        $data['code']=1;
        $data['imgageName']='';
        $data['url']='';
        $data['msg']='base64图片格式有误！';
    }
    return $data;
}

/* 统一返回图片地址*/
function image_url($src)
{
 if($src=='') return env('SYSTEM.IMAGEURL').'/uploads/default/default.png';
   return env('SYSTEM.IMAGEURL').'/'.$src;
}

/* 统一处理入库的图片地址*/
function image_url_reset($src)
{
    $src=explode('uploads',$src);
    return $src[1];
}

/**
 * @param array $list 要转换的结果集
 * @param string $pid parent标记字段
 * @param string $level level标记字段
 */
function list_to_tree($list, $pk='id', $pid = 'parent', $child = 'children', $root = 0) {
    //创建Tree
    $tree = array();

    if (is_array($list)) {
        //创建基于主键的数组引用
        $refer = array();

        foreach ($list as $key => $data) {
            $refer[$data[$pk]] = &$list[$key];
        }

        foreach ($list as $key => $data) {
            //判断是否存在parent
            $parantId = $data[$pid];

            if ($root == $parantId) {
                $tree[] = &$list[$key];
            } else {
                if (isset($refer[$parantId])) {
                    $parent = &$refer[$parantId];
                    $parent[$child][] = &$list[$key];
                }
            }
        }
    }

    return $tree;
}

/*项目状态翻译*/
function status_project_txt($status='0')
{
    switch ($status)
    {
        case 0;
        return '待申报';
            break;
        case 1:
        return '已申报，待股站审核';
            break;
        case 2:
       return '股站已审核，待市局审核';
            break;
        case 3:
            return '股站审核失败';
            break;
        case 4:
            return '市局审核失败';
            break;
        case 5:
            return '已储备';
            break;
        default:
            return '待申报';

    }


}

/* 返回 权限的条件查询语句 */
function where_rules($admin=[])
{
    $position_rules=json_decode($admin['position_rules'],true);//岗位
    $department_rules=json_decode($admin['department_rules'],true);//部门
    if(!is_array($department_rules)) $department_rules=[];
   // print_r($position_rules);
    if(isset($position_rules[0])) {
        $position = Db::name('position')->field('department_rules,data_roles')->where('id', '=', $position_rules[0])->find();
        switch ($position['data_roles']) {
            case 1;
                //全部数据权限
                $where = [];
                break;
            case 2;
                //自定义权限
                $position_department=json_decode($position['department_rules'],true);
                if(is_array($position_department))
                {
                    $dd=[];
                    foreach($position_department as $d)
                    {
                        $dd[]='['.$d.']';
                    }
                    $where[] = ['department_rules', 'like',$dd,'or'];
                }
                else {
                    $where = [];
                }
                break;
            case 3;
                //仅本人数据
                $where[] = ['admin_user', '=', $admin['username']];
                break;
            case 4;
                //本部门数据
               if(count($department_rules)>0)
               {
                   $dd=[];
                   foreach($department_rules as $d)
                   {
                       $dd[]='['.$d.']';
                   }
                   $where[] = ['department_rules', 'like',$dd,'or'];
                }
               else {
                   $where = [];
               }
                break;
            default;
                $where = [];
                break;

        }
        // print_r($where);
        return $where;
    }
    else{
        return [];
    }
}

/* 统一处理 返回前端的图片格式 */

function getimage($image='',$num=1)
{
    $image=json_decode($image,true);

    if($num==1) {
        if (!is_array($image)) return image_url('/uploads/default/default.png');
        else {

            if(isset($image[0])) {
                $image[0]['name'] = str_replace('\\', '/', $image[0]['name']);
                return image_url('/uploads/' . $image[0]['name']);
            }
            else{
                return image_url('/uploads/default/default.png');
            }
        }
    }
    else{

        foreach ($image as $ii => $v) {

            $image[$ii]['name'] = image_url('uploads/' .  $image[$ii]['name'] );
        }
      return $image;
    }
}

/* 返回要翻译的内容 */
function get_translate($action='',$id='',$form='')
{
  if($action=='systeminfo')
  {
      //系统配置翻译
      $info=Db::name('siteinfo')->where('type',2)->where('lang',$form)->find();
      $t=[['title'=>$info['title']],['html'=>$info['html']]]; //需要翻译的字段
      unset($info['id']);
      return ['translate'=>$t,'data'=>$info];

  }
  else if($action=='siteinfo')
  {
      //网站配置翻译
      $info=Db::name('siteinfo')->where('type',1)->where('lang',$form)->find();
      $t=[['title'=>$info['title']],['html'=>$info['html']],['keyword'=>$info['keyword']],['description'=>$info['description']],['close_text'=>$info['close_text']]  ]; //需要翻译的字段
      unset($info['id']);
      return ['translate'=>$t,'data'=>$info];
  }
  else if($action=='product')
  {
      //产品翻译
      $info=Db::name('product')->where('id',$id)->find();
      $content=htmlspecialchars_decode($info['content']);
      $content = strip_tags($content);
      $content= mb_substr($content, 0, 2500, "utf-8");

      $content=str_replace(PHP_EOL,'',$content);
      $content=preg_replace('/\s+/','',$content);

      $content1=htmlspecialchars_decode($info['content1']);
      $content1 = strip_tags($content1);
      $content1= mb_substr($content1, 0, 2500, "utf-8");

      $content1=str_replace(PHP_EOL,'',$content1);
      $content1=preg_replace('/\s+/','',$content1);
      unset($info['id']);
      $t=[['title'=>$info['title']],['seo_title'=>$info['seo_title']],['keyword'=>$info['keyword']],['description'=>$info['description']],['content'=>$content],['content1'=>$content1]];
      return ['translate'=>$t,'data'=>$info];

  }
  else if($action=='product_classify')
  {
      //产品分类翻译
      $info=Db::name('product_classify')->where('id',$id)->find();

      unset($info['id']);
      $t=[['title'=>$info['title']],['seo_title'=>$info['seo_title']],['keyword'=>$info['keyword']],['description'=>$info['description']]];
      return ['translate'=>$t,'data'=>$info];

  }
  else if($action=='onepage')
  {
      //单页翻译
      $info=Db::name('onepage')->where('id',$id)->find();

      $content=htmlspecialchars_decode($info['content']);
      $content = strip_tags($content);
      $content= mb_substr($content, 0, 2500, "utf-8");

      $content=str_replace(PHP_EOL,'',$content);
      $content=preg_replace('/\s+/','',$content);

      unset($info['id']);
      $t=[['title'=>$info['title']],['seo_title'=>$info['seo_title']],['keyword'=>$info['keyword']],['description'=>$info['description']],['content'=>$content]];
      return ['translate'=>$t,'data'=>$info];

  }
  else if($action=='onepage_classify')
  {
      //单页分类
      $info=Db::name('onepage_classify')->where('id',$id)->find();


      unset($info['id']);
      $t=[['title'=>$info['title']],['seo_title'=>$info['seo_title']],['keyword'=>$info['keyword']],['description'=>$info['description']]];
      return ['translate'=>$t,'data'=>$info];

  }
  else if($action=='news')
  {
      //文章
      $info=Db::name('news')->where('id',$id)->find();
      $content=htmlspecialchars_decode($info['content']);
      $content = strip_tags($content);
      $content= mb_substr($content, 0, 2500, "utf-8");
      $content=str_replace(PHP_EOL,'',$content);
      $content=preg_replace('/\s+/','',$content);
     // echo $content;
     // exit();

      $content1=htmlspecialchars_decode($info['content1']);
      $content1 = strip_tags($content1);
      $content1= mb_substr($content1, 0, 2500, "utf-8");

      $content1=str_replace(PHP_EOL,'',$content1);
      $content1=preg_replace('/\s+/','',$content1);

      unset($info['id']);
      $t=[['title'=>$info['title']],['seo_title'=>$info['seo_title']],['keyword'=>$info['keyword']],['description'=>$info['description']],['content'=>$content],['content1'=>$content1]];
      return ['translate'=>$t,'data'=>$info];

  }
  else if($action=='news_classify')
  {
      //文章分类
      $info=Db::name('news_classify')->where('id',$id)->find();


      unset($info['id']);
      $t=[['title'=>$info['title']],['seo_title'=>$info['seo_title']],['keyword'=>$info['keyword']],['description'=>$info['description']]];
      return ['translate'=>$t,'data'=>$info];

  }
  else if($action=='cases')
  {
      //案例
      $info=Db::name('case')->where('id',$id)->find();
      $content=htmlspecialchars_decode($info['content']);
      $content = strip_tags($content);
      $content= mb_substr($content, 0, 2500, "utf-8");
      $content=str_replace(PHP_EOL,'',$content);
      $content=preg_replace('/\s+/','',$content);
      // echo $content;
      // exit();

      $content1=htmlspecialchars_decode($info['content1']);
      $content1 = strip_tags($content1);
      $content1= mb_substr($content1, 0, 2500, "utf-8");

      $content1=str_replace(PHP_EOL,'',$content1);
      $content1=preg_replace('/\s+/','',$content1);

      unset($info['id']);
      $t=[['title'=>$info['title']],['seo_title'=>$info['seo_title']],['keyword'=>$info['keyword']],['description'=>$info['description']],['content'=>$content],['content1'=>$content1]];
      return ['translate'=>$t,'data'=>$info];

  }
  else if($action=='cases_classify')
  {
      //案例分类
      $info=Db::name('case_classify')->where('id',$id)->find();


      unset($info['id']);
      $t=[['title'=>$info['title']],['seo_title'=>$info['seo_title']],['keyword'=>$info['keyword']],['description'=>$info['description']]];
      return ['translate'=>$t,'data'=>$info];

  }
  else if($action=='navigation')
  {
      //导航
      $info=Db::name('navigation')->where('id',$id)->find();


      unset($info['id']);
      $t=[['title'=>$info['title']],['description'=>$info['description']]];
      return ['translate'=>$t,'data'=>$info];

  }

}


function gettime($t)
{
    return date('Y-m-d',$t);
}

/*生成产品内容页URl*/
function content_url($id,$lang)
{

    return '/'.$lang.'/product/id'.$id.'.html';
}

/*生成产品分类页URl*/
function classify_url($id,$lang)
{

    return '/'.$lang.'/product_list/id'.$id.'.html';
}

/*生成单页内容 URl*/
function page_url($id,$lang)
{

    return '/'.$lang.'/page/id'.$id.'.html';
}

/*生成案列内容 URl*/
function case_url($id,$lang)
{

    return '/'.$lang.'/cases/id'.$id.'.html';
}

/*生成新闻内容 URl*/
function news_url($id,$lang)
{

    return '/'.$lang.'/news/id'.$id.'.html';
}


/*生成新闻分类页URl*/
function newsclassify_url($id,$lang)
{

    return '/'.$lang.'/news_list/id'.$id.'.html';
}

/*生成案例分类页URl*/
function casesclassify_url($id,$lang)
{

    return '/'.$lang.'/cases_list/id'.$id.'.html';
}

/* 返回下级分类数据
分类ID
分类名称
语言标识
表名
*/
function classify_parent($id='',$title='',$lang='',$sqlname='')
{
    $data=[];
    $data[]=['id'=>$id,'title'=>$title];
    $one=Db::name($sqlname)->field('id,title')->where('parent',$id)->where('lang',$lang)->limit(50)->select()->toArray();
    foreach($one as $o)
    {
        $data[]=$o;
        $two=Db::name($sqlname)->field('id,title')->where('parent',$o['id'])->where('lang',$lang)->limit(50)->select()->toArray();
        foreach($two as $t)
        {
            $data[]=$t;
        }
    }
  return $data;
}

function mylang(string $name,$autolang='')
{
    if($autolang)
    {



        $array=Lang::load(app()->getRootPath() . 'app\lang\\'. $autolang . '.php',$autolang);
        $lang=explode('.',$name);
       // print_r($array);

        return $array[$lang[0]][$lang[1]];
    }
    else {
        return lang($name); //默认的语言加载逻辑
    }
}
