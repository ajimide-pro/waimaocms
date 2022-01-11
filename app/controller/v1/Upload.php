<?php
namespace app\controller\v1;
use app\BaseController;
use think\facade\Db;
// 引入jwt插件
use thans\jwt\facade\JWTAuth;

// 上传类
use think\File;

// 验证类
use think\Validate;

class Upload extends BaseController
{

// 初始化
    protected function initialize()
    {

        parent::initialize();
        $this->admin=Db::name('admin');
    }

    /* 图片上传*/
    public function image()
    {
        $file= request()->file('file');
        $files[]=$file;
        /* 客户端定义参数，编号用*/
        $a=input('a');
        $b=input('b');
        /* 客户端定义参数，编号用*/

        try {
            validate(['image'=>'fileSize:5120|fileExt:jpg,gif,png,jpeg,bmp'])
                ->check($files);
                $savename= \think\facade\Filesystem::putFile( 'image', $file);
                $rs=[];
                $rs['name']=$savename;
                $rs['url']= image_url('uploads/' . $savename);;

                $rs['a']=(int)$a;
                $rs['b']=(int)$b;

            return result($rs, '上传成功', '200');
        } catch (\think\exception\ValidateException $e) {

            return result($e->getMessage(), '上传失败', '201');
        }



    }

    /* 附件上传*/
    public function fujian()
    {
        $file= request()->file('file');
        $files[]=$file;
        try {
            validate(['image'=>'fileSize:30720|fileExt:jpg,gif,png,jpeg,zip,rar,pdf,doc,docx,xlsx'])
                ->check($files);
            $savename= \think\facade\Filesystem::putFile( 'fujian', $file);
            $rs=[];
            $rs['name']=$savename;
            $rs['url']= image_url('uploads/' . $savename);;
            return result($rs, '上传成功', '200');
        } catch (\think\exception\ValidateException $e) {

            return result($e->getMessage(), '上传失败', '201');
        }



    }

}
