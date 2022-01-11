<?php
namespace app\controller;

use app\BaseController;
use think\facade\Db;
use think\Response;
use think\facade\Cookie;

class Ajax extends Common
{
    public function Quick_quote()
    {

        if(request()->isAjax())
        {
            $companyname=input('companyname');
            $email=input('email');
            $name=input('name');
            $tel=input('tel');
            $content=input('content');
            $content_id=input('content_id');
            $token=input('token');
            if($companyname=='' || $email=='' || $content_id=='' || $token=='')
            {
                return result('内容填写不完整', '错误', '201');
            }

            $mytoken=Cookie::get('token');

            if(!$mytoken || $mytoken=='')  return result('token不存在', '错误', '201');
            if($token!=$mytoken)  return result('token错误', '错误', '201');
            $data=[];
            $data['companyname']=$companyname;
            $data['email']=$email;
            $data['name']=$name;
            $data['tel']=$tel;
            $data['content']=$content;
            $data['content_id']=$content_id;
            $data['time']=date('Y-m-d H:i:s',time());
            $data['ip']=request()->ip();

            Cookie::delete('token');

            $into=Db::name('visitor_message')->insertGetId($data);
            if($into)  return result('提交成功', '成功', '200');
            else  return result('写入数据库失败', '错误', '201');
        }



    }

    public function cart()
    {

        if(request()->isAjax()) {

            $ProId=intval(input('ProId')); //产品ID
            $ItemPrice=input('ItemPrice'); //产品单价



            $product=Db::name('product')->where('id',$ProId)->find();
            if(!$product) return  result('产品不存在！', 'error', '201');

            return result('提交成功', '成功', '200');
        }

    }

    public function shopping_cart()
    {
        if(request()->isAjax()) {

            echo '<div class="cart_title">
			<div class="cart_close"><span class="giconn giconn-x"></span></div>
			<span>Your Shopping Cart</span>
		</div>
		<div class="cart_list">
							<div class="cart_item shipping_cart_item ">
					<a href="/products/2018-hot-new-lace-insert-bishop-sleeve-eyelet-embroidered-romper-353" class="c_img"><img class="lazyload"  data-srcset="/u_file/t/t152/2012/25/products/5483b5de94.jpg?x-oss-process=image/quality,q_80/resize,m_lfit,h_240,w_240" alt=""></a>
					<div class="c_info">
						<div class="name_box">					
							<a href="/products/2018-hot-new-lace-insert-bishop-sleeve-eyelet-embroidered-romper-353" class="pname themes_products_title">2018 Hot New Lace Insert Bishop Sleeve</a>
															<a href="javascript:;" rel="nofollow" class="pdel"><span class="icon iconfontt iconn-delete1"></span></a>
													</div>
						<div class="pattr">
													</div>
						<div>
														<div class="pprice themes_products_price shipping_cart_item_price">
								$83.97							</div>
							<div class="c_qty">
								<button class="qless qty_btn less"><span class="giconn"></span></button>
								<input type="tel" name="Qty[]" class="qinput cart_p_qty" value="3" moq="1" />
								<button class="qadd qty_btn add"><span class="giconn"></span></button>
								<input type="hidden" name="ProId" value="353">
								<input type="hidden" name="CId" value="281">
							</div>
							<div class="clear"></div>
						</div>
												
					</div>
					<div class="clear"></div>
				</div>
							 
						<div class="cart_empty hide">
				Your shopping cart is empty.			</div>
		</div>
		<div class="cart_foot">
			<div class="ftotal fsubtotal_price" style="display: none;">
				<span id="shipping_cart_subtotal_price" class="ftprice themes_products_price">$167.94</span>
				<span>Subtotal</span>
			</div>
			<div class="ftotal fsave_price" style="display: none;">
				<span id="shipping_cart_save_price" class="ftprice themes_products_price">$0.00</span>
				<span>Full discount(-)</span>
			</div>
			<div class="ftotal">
				<span id="shipping_cart_total_price" class="ftprice themes_products_price">$167.94</span>
				<span>Total</span>
			</div>
			<div class="fdesc">Taxes and shipping calculated at checkout</div>
			<a href="/cart/checkout.html" class="checkout_btn"><button>Check Out <span class="giconn"></span></button></a>
		</div>';

        }

    }



}
