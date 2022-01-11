<?php
namespace app\controller\v1;
use app\BaseController;
use think\facade\Db;
use app\model\NavigaContent;
// 引入jwt插件
use thans\jwt\facade\JWTAuth;
class NavigaTion extends BaseController
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


    /* 添加 部门 */
    public function Create()
    {
        $data = input('post.');

        $data['time']=time();
        $data['admin_user']=$this->admin_user;
        $data['lang']=$this->lang;
        $data['image']=json_encode( $data['image']);
        $into = $this->navigation->strict(false)->insertGetId($data);
        if ($into) {
            return result($into, '操作成功', '200');
        } else {

            return result('写入失败', '写入数据库失败，请联系管理员', '202');
        }

    }

    /* 读取 角色列表 */
    public function NavigaTion_get_list()
    {
        $data = input('get.');

        if($data['limit']=='') $data['limit']='30';
        if($data['page']=='') $data['page']='0';
        $where=[];
        $where[]= ['lang','=', $this->lang];
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

        $list = $this->navigation->where($where)->limit($data['limit'])->page($data['page'])->order($order)->select()->toArray();
        $total=$this->navigation->where($where)->count();
        foreach($list as $i=>$info) {
            $list[$i]['image']=json_decode( $list[$i]['image'],true);
            if(is_array( $list[$i]['image'])) {

                foreach ( $list[$i]['image'] as $ii => $v) {
                    $list[$i]['image'][$ii]['url'] = image_url('uploads/' . $list[$i]['image'][$ii]['name']);
                }
            }
            else{
                $list[$i]['image']=[];
            }
            $list[$i]['label']= $list[$i]['title'];
            $list[$i]['value']= $list[$i]['id'];
            $list[$i]['att_type']= (string)$list[$i]['att_type'];
            $list[$i]['outflag']= (string)$list[$i]['outflag'];
            switch ( $list[$i]['att_type'])
            {
                case 1;
                $list[$i]['att_type_name']='头部';
                break;
                case 2;
                    $list[$i]['att_type_name']='底部';
                    break;
                case 3;
                    $list[$i]['att_type_name']='侧边栏';
                    break;
                default;
                    $list[$i]['att_type_name']='未知';
                    break;
            }

        }

        $listt=list_to_tree($list);
        $d=[];
        $d['total']=$total;
        $d['items']=$listt;
        return result($d, '读取列表成功', '200');
    }


    /* 删除 角色 */
    public function Create_delete()
    {
        $data = input('post.');
        $list=$data['data'];
        if(count($list)>0)
        {
            $NavigaContent = new NavigaContent();
           // $where[]= ['lang','=',$this->lang];;
            $where[]= ['id','in',$list];
            $del=$NavigaContent->deleteAll($where);
            if($del)  return result($del, '删除成功，请稍后再试', '200');
            else  return result('更新失败，或者没有数据改变', '删除失败', '202');

        }else{
            return result('更新内容不能为空', '更新失败', '202');
        }

    }

    /* 编辑 角色 */
    public function Create_edit()
    {
        $data = input('post.');
        $list=$data['data'];
        if(count($list)>0)
        {
            $NavigaContent  = new NavigaContent();

            $up=$NavigaContent->updateAll($list, $this->lang,$this->admin_user);
            if($up)  return result($up, '更新成功', '200');
            else  return result('更新失败，或者没有数据改变', '更新失败', '202');

        }else{
            return result('更新内容不能为空', '更新失败', '202');
        }

    }


}
