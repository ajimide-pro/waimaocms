<?php
namespace app\controller\v1;
use app\BaseController;
use think\facade\Db;
// 引入jwt插件
use thans\jwt\facade\JWTAuth;
class Setting extends BaseController
{
    // 初始化
    protected function initialize()
    {

        parent::initialize();
        $this->model=Db::name('siteinfo');

        $this->lang=request()->header('lang');


    }


    /* 设置 网站资料 */
    public function siteinfo()
    {
        $data=input('post.');



        $find=$this->model->where('type',1)->where('lang', $this->lang)->find();


        if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $data['logo'], $result)){

            //上传了图片
            $savepic=saveBase64Image( $data['logo']);
            if($savepic['code']=='0') {
                $data['logo'] = $savepic['url'];
                @unlink( app()->getRootPath().'uploads'.$find['logo']);
            }
        }
        else{

            if($data['logo']!='')
            {
                $logo=explode('uploads',$data['logo']);
                if(isset($logo[1])) $data['logo']='/uploads'.$logo[1];
                else $data['logo']='';
            }
        }

        if(isset($data['index_lang'])) $index_lang=$data['index_lang'];//默认语言ID
        else $index_lang=1;

        Db::name('lang')->where('id','>',0)->update(['index'=>0]);
        Db::name('lang')->where('id',$index_lang)->update(['index'=>1]);

        unset($data['$index_lang']);

        $data['lang']=$this->lang;
        if(!$find) {
            $into = $this->model->strict(false)->insertGetId($data);
         //   if ($into) {
                return result($into, '操作成功', '200');
           // } else {
//
               // return result('写入失败', '写入数据库失败，请联系管理员', '202');
          //  }
        }
        else{

            $up=$this->model->where('type',1)->strict(false)->update($data);
            //if ($up) {
                return result($up, '操作成功', '200');
          //  } else {

               // return result('更新失败', '更新数据库失败或者没有数据改变', '202');
          //  }
        }
    }

    /* 读取 网站资料 */
    public function siteinfo_get()
    {

        $find=$this->model->where('type',1)->where('lang', $this->lang)->find();
       if($find) {

           $find['logo'] = image_url($find['logo']);
           $find['open']=(string)$find['open'];
           $find['order_open']=(string)$find['order_open'];
           $find['message_open']=(string)$find['message_open'];
       }
       else{

           $this->model->insertGetId(['type'=>1,'lang'=>$this->lang]);
           $find=$this->model->where('type',1)->where('lang', $this->lang)->find();
           $find['logo']=image_url( $find['logo']);
           $find['open']=(string)$find['open'];
           $find['order_open']=(string)$find['order_open'];
           $find['message_open']=(string)$find['message_open'];

       }
        $find['index_lang']= Db::name('lang')->where('index',1)->value('id');
       if(! $find['index_lang'])  $find['index_lang']=1;
        return result($find, '查询成功', '200');

    }



    /* 设置 系统资料 */
    public function systeminfo()
    {
        $data=input('post.');



        $find=$this->model->where('type',2)->where('lang', $this->lang)->find();


        if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $data['logo'], $result)){

            //上传了图片
            $savepic=saveBase64Image( $data['logo']);
            if($savepic['code']=='0') {
                $data['logo'] = $savepic['url'];
                @unlink( app()->getRootPath().'uploads'.$find['logo']);
            }
        }
        else{

            if($data['logo']!='')
            {
                $logo=explode('uploads',$data['logo']);
               if(isset($logo[1])) $data['logo']='/uploads'.$logo[1];
               else $data['logo']='';
            }
        }
        $data['lang']=$this->lang;
        if(!$find) {
            $into = $this->model->strict(false)->insertGetId($data);
            if ($into) {
                return result($into, '操作成功', '200');
            } else {

                return result('写入失败', '写入数据库失败，请联系管理员', '202');
            }
        }
        else{

            $up=$this->model->where('type',2)->strict(false)->update($data);
            if ($up) {
                return result($up, '操作成功', '200');
            } else {

                return result('更新失败', '更新数据库失败或者没有数据改变', '202');
            }
        }
    }

    /* 读取 系统资料 */
    public function systeminfo_get()
    {

        $find=$this->model->where('type',2)->where('lang', $this->lang)->find();
        if($find) $find['logo']=image_url( $find['logo']);
        else{
            $this->model->insertGetId(['type'=>2,'lang'=>$this->lang]);
            $find=$this->model->where('type',2)->where('lang', $this->lang)->find();
            $find['logo']=image_url( $find['logo']);
        }
        $find['cdn']=env('SYSTEM.IMAGEURL').'/uploads/';
      //  unset( $find['id']);
      //  $find['lang_list']=Db::name('lang')->where('status',1)->order('weight asc,id desc')->select()->toArray(); // 语言列表
        return result($find, '查询成功', '200');

    }
}
