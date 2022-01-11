<?php
namespace app\controller\v1;
use app\BaseController;
use think\facade\Db;
// 引入jwt插件
use thans\jwt\facade\JWTAuth;


class Attribute extends BaseController
{
    // 初始化
    protected function initialize()
    {

        parent::initialize();
        $this->product_attribute=Db::name('product_attribute');
        $payload = JWTAuth::auth(); //可验证token, 并获取token中的payload部分
        $this->username= $payload['username']->getValue(); //

        $this->lang=request()->header('lang');

    }
    public function Create_get_list()
    {
        $data = input('get.');

        if($data['limit']=='') $data['limit']='10';
        if($data['page']=='') $data['page']='0';
        $where=[];

        if(intval($data['id'])>'0')
        {
            $where[]= ['id','=',$data['id']]; //指定了ID
        }

        if($data['key']!='')
        {
            $where[]= ['title','like','%'.$data['key'].'%'];
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

        $list = $this->product_attribute->where('lang',$this->lang)->where($where)->limit($data['limit'])->page($data['page'])->order($order)->select()->toArray();
        foreach($list as $i=>$l)
        {
           $sx=json_decode( $l['shuxing'],true);
            $list[$i]['shuxing_lable']=[];
            if(is_array($sx))
            {
               foreach($sx as $ii=>$s)
               {
                   $v=explode(PHP_EOL,$s['value']);
                   foreach($v as $iii=>$a)
                   {
                       $list[$i]['shuxing_lable'][] =['label'=>$a,'value'=>$a];
                   }
               }
           }
        }
        $total=$this->product_attribute->where('lang',$this->lang)->where($where)->count();

        $d=[];
        $d['total']=$total;
        $d['items']=$list;
        return result($d, '读取列表成功', '200');
    }


}

