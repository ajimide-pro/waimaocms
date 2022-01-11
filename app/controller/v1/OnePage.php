<?php
namespace app\controller\v1;
use app\BaseController;
use think\facade\Db;
use app\model\OnepageClassify;
use app\model\OnepageContent;
// 引入jwt插件
use thans\jwt\facade\JWTAuth;
class OnePage extends BaseController
{
    // 初始化
    protected function initialize()
    {

        parent::initialize();
        $this->classify=Db::name('onepage_classify');
        $this->onepage=Db::name('onepage');
        $this->lang=request()->header('lang');
        $payload = JWTAuth::auth(); //可验证token, 并获取token中的payload部分
        $this->admin_user= $payload['username']->getValue(); //可以继而获取payload里自定义的字段，比如uid

    }


    /* 添加 单页分类 */
    public function CreateClassify()
    {
        $data = input('post.');
        $data['lang']=$this->lang;
        $data['time']=time();
        $data['admin_user']=$this->admin_user;
        $into = $this->classify->strict(false)->insertGetId($data);
        if ($into) {
            return result($into, '操作成功', '200');
        } else {

            return result('写入失败', '写入数据库失败，请联系管理员', '202');
        }

    }

    /* 读取 单页分类 */
    public function CreateClassify_get()
    {
        $data = input('post.');

        $info = $this->classify->where('lang',$this->lang)->where('id',intval($data['id']))->find();
        if ($info) {
            return result($info, '读取成功', '200');
        } else {

            return result('获取分类失败，分类不存在', '写入数据库失败，请联系管理员', '202');
        }

    }

    /* 读取 单页分类列表 */
    public function CreateClassify_get_list()
    {
        $data = input('get.');

        if($data['limit']=='') $data['limit']='30';
        if($data['page']=='') $data['page']='0';
        $where=[];
        if($data['parent']>='0')
        {
            $where[]= ['parent','=',intval($data['parent'])]; //查找下级
        }
        if($data['key']!='')
        {
            $where[]= ['title','like','%'.$data['key'].'%']; //查找下级
        }
        $order='weight asc,id desc';
        if($data['sort']!='')
        {
            switch ($data['sort'])
            {
                case 1;
                $order='time desc';
                break;
                case 2;
                    $order='weight desc';
                break;
                case 3;
                    $order='weight asc';
                    break;
                default:
                    $order='id desc';
                    break;
            }

        }

        $list = $this->classify->where('lang',$this->lang)->where($where)->limit($data['limit'])->page($data['page'])->order($order)->select()->toArray();
        $total=$this->classify->where('lang',$this->lang)->where($where)->count();

        /* 读取模板列表*/
        $dir=app()->getRootPath().'/pc/view/'.env('SYSTEM.TEMPLATE').'/onepage';

        if(is_dir($dir)) {
            $tplist = scandir($dir);
            $template_list = [];
            $template_list[]['title'] = '默认模板';
            foreach ($tplist as $value) {

                $ext = pathinfo($value)['extension'];
                if (in_array($ext, array('html', 'htm'))) {

                    $template_list[]['title'] = $value;

                }
            }
        }else{
            $template_list = [];
            $template_list[]['title'] = '默认模板';
        }
        /* 读取模板列表*/

            $d=[];
            $d['total']=$total;
            $d['items']=$list;
            $d['template_list']=$template_list;
            return result($d, '读取列表成功', '200');
    }

    /* 编辑 单页分类 */
    public function CreateClassify_edit()
    {
        $data = input('post.');
        $list=$data['data'];
        if(count($list)>0)
        {
            $OnepageClassify  = new OnepageClassify();

            $up=$OnepageClassify->updateAll($list, $this->lang,$this->admin_user);
            if($up)  return result($up, '更新成功', '200');
            else  return result('更新失败，或者没有数据改变', '更新失败', '202');

        }else{
            return result('更新内容不能为空', '更新失败', '202');
        }

    }

    /* 删除 单页分类 */
    public function CreateClassify_delete()
    {
        $data = input('post.');
        $list=$data['data'];
        if(count($list)>0)
        {
            $OnepageClassify  = new OnepageClassify();
            $where[]= ['lang','=',$this->lang];;
            $where[]= ['id','in',$list];
            $del=$OnepageClassify->deleteAll($where);
            if($del)  return result($del, '删除成功，请稍后再试', '200');
            else  return result('更新失败，或者没有数据改变', '删除失败', '202');

        }else{
            return result('更新内容不能为空', '更新失败', '202');
        }

    }

    /* 添加 单页内容 */
    public function Create()
    {
        $data = input('post.');
        $data['lang']=$this->lang;
        $data['time']=time();
        $data['admin_user']=$this->admin_user;

        $data['image']=json_decode( $data['image'],true);
        if(is_array( $data['image'])) {

            foreach ($data['image'] as $ii => $v) {
                $data['image'][$ii]['url'] = image_url_reset($data['image'][$ii]['url']);
            }
        }
        else{
            $data['image']=[];
        }
        $data['image']=json_encode( $data['image']);
        $into = $this->onepage->strict(false)->insertGetId($data);
        if ($into) {
            return result($into, '操作成功', '200');
        } else {

            return result('写入失败', '写入数据库失败，请联系管理员', '202');
        }

    }



    /* 读取 单页内容列表 */
    public function Create_get_list()
    {
        $data = input('get.');

        if($data['limit']=='') $data['limit']='30';
        if($data['page']=='') $data['page']='0';
        $where=[];
        if($data['parent']>='0')
        {
            $where[]= ['parent','=',intval($data['parent'])]; //查找下级
        }
        if($data['key']!='')
        {
            $where[]= ['title','like','%'.$data['key'].'%']; //查找下级
        }
        $order='id desc';
        if($data['sort']!='')
        {
            switch ($data['sort'])
            {
                case 1;
                    $order='time desc';
                    break;
                case 2;
                    $order='weight desc';
                    break;
                case 3;
                    $order='weight asc';
                    break;
                default:
                    $order='id desc';
                    break;
            }

        }



        $list = $this->onepage->where('lang',$this->lang)->where($where)->limit($data['limit'])->page($data['page'])->order($order)->select()->toArray();
        $total=$this->onepage->where('lang',$this->lang)->where($where)->count();


        foreach($list as $i=>$info) {
            $list[$i]['image']=json_decode( $list[$i]['image'],true);

            if(is_array( $list[$i]['image'])) {

                foreach ( $list[$i]['image'] as $ii => $v) {
                    $list[$i]['image'][$ii]['url'] = image_url('uploads/' . $list[$i]['image'][$ii]['url']);
                }
            }
            else{
                $list[$i]['image']=[];
            }
            $list[$i]['att_type']= (string)$list[$i]['att_type'];
           // $list[$i]['parent']= (string)$list[$i]['parent'];
        }



        $d=[];
        $d['total']=$total;
        $d['items']=$list;
        return result($d, '读取列表成功', '200');
    }

    /* 编辑 单页内容 */
    public function Create_edit()
    {
        $data = input('post.');
        $list=$data['data'];
        if(count($list)>0)
        {
            $OnepageContent  = new OnepageContent();


            $up=$OnepageContent->updateAll($list, $this->lang,$this->admin_user);
            if($up)  return result($up, '更新成功', '200');
            else  return result('更新失败，或者没有数据改变', '更新失败', '202');

        }else{
            return result('更新内容不能为空', '更新失败', '202');
        }

    }

    /* 删除 单页内容 */
    public function Create_delete()
    {
        $data = input('post.');
        $list=$data['data'];
        if(count($list)>0)
        {
            $OnepageContent  = new OnepageContent();
            $where[]= ['lang','=',$this->lang];;
            $where[]= ['id','in',$list];
            $del=$OnepageContent->deleteAll($where);
            if($del)  return result($del, '删除成功，请稍后再试', '200');
            else  return result('更新失败，或者没有数据改变', '删除失败', '202');

        }else{
            return result('更新内容不能为空', '更新失败', '202');
        }

    }

    /* 读取 单页内容 */
    public function Create_get()
    {
        $data = input('post.');

        $info = $this->onepage->where('lang',$this->lang)->where('id',intval($data['id']))->find();
        if ($info) {
            $info['image']=json_decode($info['image'],true);
            foreach($info['image'] as $i=>$v)
            {
                $info['image'][$i]=image_url('uploads/'. $info['image'][$i]);
            }
            return result($info, '读取成功', '200');
        } else {

            return result('获取分类失败，分类不存在', '写入数据库失败，请联系管理员', '202');
        }

    }


}
