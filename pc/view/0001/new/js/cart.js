
var cart_obj = {
	cart_init: {
		paypal_result: {
			"OId":"",
			"CUSTOM":""
		},

		ajax_get_coupon_info: function(code){
			//下单页面 优惠券显示
			var str='';
			if($('input[name=order_products_info]').length){ str='&jsonData='+$('input[name=order_products_info]').val();}
			var price=parseFloat($('#PlaceOrderFrom').attr('amountprice'));
			var order_discount_price=parseFloat($('input[name=order_discount_price]').val());
			var order_cid=$('input[name=order_cid]').val();
			$.ajaxSettings.async = false;
			$.post("/?do_action=cart.ajax_get_coupon_info", '&coupon='+encodeURIComponent(code)+'&price='+price+str+'&order_discount_price='+order_discount_price+'&order_cid='+(order_cid?order_cid:'')+($('input[name=Email]').val() ? '&email='+$('input[name=Email]').val() : '')+($('input[name=OrderId]').val() ? '&OrderId='+$('input[name=OrderId]').val() : ''), function(data){
				if(data.msg.status==1){
					var cutprice=parseFloat(data.msg.cutprice),
						$discount = 100;
					//优惠券处理
					$('.coupon_box .code_input, .coupon_box .code_error').hide();
					$('#CouponCharge').show();
					$('input[name=order_coupon_code]').val(data.msg.coupon).attr('cutprice', cutprice);
					$('#code_valid').slideDown(200);
					cart_obj.cart_init.count_shipping();
					$('#code_valid strong').eq(0).text(data.msg.coupon);
					$('#code_valid strong').eq(1).text(data.msg.end);
				}else{
					//$('.coupon_box .code_error').show().find('strong').text(data.msg.coupon);
					$('.coupon_box .code_error').show().html(lang_obj.checkout.checkout['coupon_tips_'+data.msg.status].replace('{CouponCode}', data.msg.coupon).replace('{Num}', data.msg.limitqty).replace('{Price}', $('html').iconvPriceFormat(parseFloat(data.msg.balance).toFixed(2))));
				}
				if($('input[name=order_shipping_address_cid]').length){
					var cid=parseInt($('input[name=order_shipping_address_cid]').val());
					if(cid<=0){
						cid=parseInt($('#country').val());
					}
					var StatesSId = $('#zoneId').find('select[name="Province"] option:selected').val();
					cart_obj.cart_init.get_shipping_method_from_country(cid, StatesSId);
				}
			}, 'json');
			$.ajaxSettings.async = true;
		},

		price_change: function(Data){
			//购物车列表 产品价格改变
			var $Count			= parseInt(Data.Count),
				$TotalPrice		= parseFloat(Data.TotalPrice),
				$DiscountPrice	= parseFloat(Data.CutPrice), //满额减价
				$Unit			= $Count>1?'itemsCount':'itemCount',
				$CutPrice		= 0,
				$FinalPrice		= 0;
			$CutPrice=$DiscountPrice; //订单折扣优惠
			$FinalPrice = $TotalPrice - $CutPrice;
			if ($FinalPrice < 0) $FinalPrice = 0;
			$('.cutprice_box .product_price_value').text($('html').iconvPriceFormat($CutPrice, 0, '', 1)); //优惠价格
			$('.cutprice_box .product_price_title').text(Data.disCountAry.DiscountText + '(-)'); //优惠价格
			$('.total_box .product_price_value').text($('html').iconvPriceFormat($TotalPrice, 0, '', 1)); //产品总价格
			// $('.product_total_price .product_count').text(lang_obj.cart.global[$Unit].replace('{Num}', $Count)); //产品总数量
			$('.product_total_price strong').text($('html').iconvPriceFormat($FinalPrice, 0, '', 1));
			$('.cartFrom input[name=CartProductPrice]').val($TotalPrice);
			$('.cartFrom input[name=DiscountPrice]').val($CutPrice);
			if($('.total_box').length && $CutPrice>0){ //购物车列表页 优惠栏目
				$('.cutprice_box, .total_box').show();
			}else{
				$('.cutprice_box, .total_box').hide();
			}
		},

		quantity_change: function(Obj, Type){
			//购物车列表 产品数量改变
			if (Obj.find('input[name=Qty\\[\\]]').attr('disabled') == 'disabled') {
				//禁止执行
				return false;
			}
			var $Qty	= Math.abs(parseInt(Obj.find('input[name=Qty\\[\\]]').val())),
				$Start	= Obj.find('.prod_quantity').attr('start'),
				$sQty	= Obj.find("input[name=S_Qty\\[\\]]").val(),
				$CId	= Obj.find("input[name=CId\\[\\]]").val(),
				$ProId	= Obj.find("input[name=ProId\\[\\]]").val(),
				$Data	= '',
				$CIdStr	= '',
				$MinTips= 0;
			if (isNaN($Qty)) {
				$Qty = 1;
			} else {
				if (Type == 1) {
					//加
					$Qty += 1;
				} else if (Type == -1) {
					//减
					$Qty -= 1;
				}
				!$Qty && ($Qty = 1) && ($MinTips = 1);
				$Qty < $Start && ($Qty = $Start) && ($MinTips = 1);
			}
			if ($MinTips == 1) {
				//低过起订量
				global_obj.win_alert_auto_close(lang_obj.products.goods.warning_MOQ);
			}
			/*
			if ($Qty == $sQty) {
				return;
			}
			*/
			cart_obj.cart_init.data_posting(true, lang_obj.web.global.processing);
			if ($('.cartFrom .item_from_table input[name=select]:checked').length) {
				//已选的产品
				$CIdStr = '0';
				$('.cartFrom .item_from_table input[name=select]:checked').each(function(){
					$CIdStr += ',' + $(this).val();
				});
			}
			$Data = {'Qty':$Qty, 'CId':$CId, 'ProId':$ProId, 'CIdAry':$CIdStr};
			cart_obj.cart_init.modify_quantity(Obj, $Data);
		},

		modify_quantity: function(Obj, Data){
			//购物车列表 产品数量改变执行函数
			var $sQty		= Obj.find("input[name=S_Qty\\[\\]]").val(),
				$IsBuyNow	= $('#lib_cart').hasClass('buynow_content')?1:0,
				$MaxTips	= 0,
				$QtyTips	= 0,
				$CartType	= 'pcMiddle';
				if ($IsBuyNow ==1) $CartType = 'pcBuyNow';

			$.post('/?do_action=cart.modify&BuyNow='+$IsBuyNow+'&CartType='+$CartType+'&t='+Math.random(), Data, function(data){
				if(data.ret==1 || data.ret==2){
					if(data.ret==2) window.location.reload();
					Obj.find("input[name=Qty\\[\\]]").val(data.msg.qty);
					Obj.find("input[name=S_Qty\\[\\]]").val(data.msg.qty);
					Obj.parents('.item_from_table').find('.gifts_item').remove();
					if (data.msg.gifts_html == 'location_buynow') { //有不同运费模板且符合满减赠礼的时候 刷新页面重新计算运费
						if ($('input[name="Email"]').val()) {
							$.post('/?do_action=cart.save_checkout_email&Email=' + $('input[name="Email"]').val());
						}
						$.post('/?do_action=cart.set_no_login_address', $('.checkout_address_form').serialize(), function(data){
							location = location;
						}, 'json');
					} else {
						Obj.parents('.item_from_table').find('.tr_bat').before(data.msg.gifts_html);
					}
					for(k in data.msg.price){
						$(".item_from_table .tr[cid="+k+"] .prod_price p").text($('html').iconvPriceFormat(data.msg.price[k], 0, '', 1));
						$(".item_from_table .tr[cid="+k+"] .prod_total_price p").text($('html').iconvPriceFormat(data.msg.amount[k], 0, '', 1)).attr('price', data.msg.amount[k]);
					}
					cart_obj.cart_init.price_change({ //购物车列表的价格控制
						'Count'		: data.msg.total_count,
						'TotalPrice': data.msg.total_price,
						'CutPrice'	: data.msg.cutprice,
						'disCountAry'	: data.msg.disCountAry,
					});
					if(data.msg.FullCondition){
						$('.fullcoupon').show().html(data.msg.FullCondition);
					}else{
						$('.fullcoupon').hide();
					}
					if($IsBuyNow==1){
						//BuyNow页面
						$ShipObj=$('.information_address .address_list .item:eq(0) input[name=shipping_address_id]');
						if($ShipObj.length){
							var StatesSId=$('#zoneId').find('select[name="Province"] option:selected').val();
							cart_obj.cart_init.get_shipping_method_from_country($ShipObj.attr('data-cid'), StatesSId);
						}
						if($('#total_weight').length) $('#total_weight').text(data.msg.total_weight.toFixed(3));
						//优惠券处理 消费条件不足
						if(parseInt(data.msg.IsCoupon)==0){
							$('input[name=order_coupon_code]').val('').attr('cutprice', '0.00');
							$('.coupon_box .code_input').show(200).find('input').val('');
							$('.coupon_box .code_valid').hide().find('strong').text('');
							$('#CouponCharge').hide();
							global_obj.new_win_alert(lang_obj.checkout.checkout.coupon_price_tips);
						}
						//价格计算初始化
						var $Amount		= parseFloat(data.msg.total_price), //产品总价
							$Count		= parseInt(data.msg.total_count),
							$Unit		= $Count>1?'itemsCount':'itemCount';
						$('#PlaceOrderFrom').attr('amountPrice', $Amount);
						$('#ot_weight').text(parseFloat(data.msg.total_weight).toFixed(3));
						$('#ot_subtotal').text($('html').iconvPriceFormat($Amount, 2, '', 1));
						$('input[name=order_discount_price]').val(data.msg.cutprice); //订单折扣
						$('#DiscountCharge .name').text(data.msg.disCountAry.DiscountText + ':');
						cart_obj.cart_init.count_shipping();
						$('.order_summary .total .product_count').text(lang_obj.cart[$Unit].replace('%num%', $Count)); //产品总数量
						$('.order_summary .total strong').text($('html').iconvPriceFormat(parseFloat(data.msg.total_price).toFixed(2)));
						//优惠券处理
						parseInt(data.msg.IsCoupon) && $('input[name=order_coupon_code]').val() && cart_obj.cart_init.ajax_get_coupon_info($('input[name=order_coupon_code]').val());
					}
				}else{
					Obj.find("input[name=Qty\\[\\]]").val($sQty);
                }
                /*if($MaxTips==1){ //高过库存
                    $('#data_posting').remove();
                    global_obj.win_alert_auto_close(lang_obj.products.goods.warning_stock.replace('{Num}', $QtyTips));
                }*/
				if($('input[name=order_shipping_address_cid]').length){
					var cid=parseInt($('input[name=order_shipping_address_cid]').val());
					if(cid<=0){
						cid=parseInt($('#country').val());
					}
					var StatesSId = $('#zoneId').find('select[name="Province"] option:selected').val();
					cart_obj.cart_init.get_shipping_method_from_country(cid, StatesSId);
				}
				cart_obj.cart_init.data_posting(false);
			}, 'json');
		},

		attribute_check_stock: function(){
			//购物车列表 检查产品属性的库存情况
			var attr_len=$('ul.attributes li').length,
				ext_attr=$.evalJSON($('#ext_attr').val()), //扩展属性
				$attrStock=parseInt($('#attrStock').val());

			if($attrStock){ //开启了0是库存为空的设定
				var ext_ary={}, ary={}, cur, stock_ary={};
				for(k in ext_attr){
					ary=k.split('_');
					for(k2 in ary){
						if(!stock_ary[ary[k2]]) stock_ary[ary[k2]]=0;
					}
					if(ext_attr[k][1]>0){
						for(k2 in ary){
							if(ary.length!=attr_len) continue;
							stock_ary[ary[k2]]+=1;
						}
					}
				}
				for(k in stock_ary){
					if(stock_ary[k]<1){
						if($('option[value="'+k+'"]').length) $('option[value="'+k+'"]').addClass('hide hide_fixed').get(0).disabled=true;
					}else{
						if($('option[value="'+k+'"]').length) $('option[value="'+k+'"]').removeClass('hide hide_fixed').get(0).disabled=false;
					}
				}
			}
		},


		get_shipping_method_from_country: function(CId, StatesSId){
			//下单页面 更改快递显示
			if(!CId){
				cart_obj.cart_init.set_shipping_method(1, -1, 0, '', 0);
				return false;
			}
			var dataVal='CId='+CId;
			var $AId=$('input[name=order_shipping_address_aid]').val(),
				$StatesSId=$('input[name=order_shipping_states_sid]').val();
			if (StatesSId > 0) $StatesSId = StatesSId;
			if($('input[name=order_cid]').val()) dataVal+='&order_cid='+$('input[name=order_cid]').val();
			if($('input[name=OId]').length) dataVal+='&Type=order&OId='+$('input[name=OId]').val();
			if($('input[name=Email]').length && $('input[name=Email]').val()) dataVal+='&Email='+$('input[name=Email]').val(); //用于优惠券使用判断
			if($('input[name=IsBuyNow]').length && $('input[name=IsBuyNow]').val()) dataVal+='&IsBuyNow='+$('input[name=IsBuyNow]').val(); //用于优惠券使用判断
			$.post('/?do_action=cart.get_shipping_methods', dataVal+($AId>0?'&AId='+$AId:'')+($StatesSId>0?'&StatesSId='+$StatesSId:''), function(data){
				if(data.ret==1){
					let inputSId = $('input[name=order_shipping_method_sid]');
					let inputSIdAry = '';
					inputSId.val()!='[]' && (inputSIdAry = $.evalJSON(inputSId.val()));
					if(Object.keys(data.msg.info).length > 1){
						//运费模板
						if(!$('input[name=shipping_template]').length && data.msg.shipping_template==1){
							$('#PlaceOrderFrom').append('<input type="hidden" name="shipping_template" value="1" />');
						}
						$('.information_shipping').remove();
						$('.information_product .item_pro_table').each(function(){
							var $this=$(this),
								$OvId=$this.attr('data-ovid'),
								$ShipTId=$this.attr('data-tid'),
								$KId=$OvId+'-'+$ShipTId,
								rowObj, rowStr = '', j=0;
							if(data.msg.info[$KId] && data.msg.info[$KId].length){
								for(i=0; i<data.msg.info[$KId].length; i++){
									rowObj = data.msg.info[$KId][i];
									rowStr += '<label class="ship_tr" for="shipping_method_' + $KId + i + '">';
										rowStr += '<div class="td_checked">';
											rowStr += '<input type="radio" data-price="' + rowObj.ShippingPrice + '" data-ovid="' + $OvId + '" data-tid="' + $ShipTId + '" name="_shipping_method[' + $KId + ']" id="shipping_method_' + $KId + i + '" class="radio_check" value="' + rowObj.SId + '">';
										rowStr += '</div>';
										rowStr += '<div class="td_name">' + rowObj.Name + '</div>';
										rowStr += '<div class="td_price">' + (parseFloat(rowObj.ShippingPrice) > 0 ? data.msg.Symbol + $('html').iconvPriceFormat(rowObj.ShippingPrice, 2, '', 1) : lang_obj.products.goods.free_shipping) + '</div>';
										rowStr += '<div class="td_desc">' + (rowObj.Brief ? rowObj.Brief : '') + '</div>';
									rowStr += '</label>';
								}
								$this.find('.prod_shipping .ship_table .ship_tr').remove();
								$this.find('.prod_shipping .ship_table').append(rowStr);
								$this.find('.prod_shipping .ship_table .ship_tr').eq(0).trigger('click');
								$this.find('.prod_shipping .ship_btn_confirm').trigger('click');
								$this.find('.prod_shipping .shipping_show_box').show();
								$this.find('.prod_shipping .shipping_error_box').hide();
							}else{
								$this.find('.prod_shipping .shipping_show_box').hide();
								$this.find('.prod_shipping .shipping_error_box').show().html(lang_obj.checkout.checkout.tips_no_delivery.replace('{Country}', $('.checkout_error_tips').attr('data-country')) + ($('.checkout_error_tips').attr('data-email') ? ' ' + lang_obj.checkout.checkout.tips_contact_us.replace(/{Email}/g, $('.checkout_error_tips').attr('data-email')) : ''));

								if($('.checkout_error_tips').attr('data-country')){
									if ($('#zoneId').is(':visible') && !$('#zoneId select[name=Province]').val()) {
										$this.find('.prod_shipping .shipping_error_box').html(lang_obj.checkout.result.address_error);
									} else {
										$this.find('.prod_shipping .shipping_error_box').html(lang_obj.checkout.checkout.tips_no_delivery.replace('{Country}', $('.checkout_error_tips').attr('data-country')) + ($('.checkout_error_tips').attr('data-email') ? ' ' + lang_obj.checkout.checkout.tips_contact_us.replace(/{Email}/g, $('.checkout_error_tips').attr('data-email')) : ''));
									}
								}else{
									$this.find('.prod_shipping .shipping_error_box').html(lang_obj.checkout.result.address_error);
								}
							}
						});
					}else{
						//普通模式
						var rowObj, rowStr, j=0;
						for(KId in data.msg.info){
							var OvId = KId.split('-')[0];
							if(!$('.information_shipping .shipping[data-id='+OvId+']').length) continue;//没有这个海外仓选项
							rowStr='';
							j=1;
							for(i=0; i<data.msg.info[KId].length; i++){
								rowObj=data.msg.info[KId][i];
								if(parseFloat(rowObj.ShippingPrice)<0) continue;
								rowStr+='<li name="'+rowObj.Name.toUpperCase()+'"'+(++j%2==0?' class="odd"':'')+' title="'+rowObj.Name+'">';
								rowStr+=	'<span class="name">';
								rowStr+=		'<input type="radio" name="_shipping_method['+KId+']" value="'+rowObj.SId+'" price="'+ rowObj.ShippingPrice+'" ShippingType="'+rowObj.type+'" cid="'+CId+'" asiafly="'+rowObj.ApiType+'" />';
								if(rowObj.Logo){
									rowStr+='<img src="'+rowObj.Logo+'" alt="'+rowObj.Name+'" />';
								}
								rowStr+=		'<label>';
								rowStr+=			'<span>' + rowObj.Name + '</span>';
								rowStr+=			'<span class="brief" title="'+rowObj.Brief+'">'+(rowObj.Brief ? rowObj.Brief : ' ')+'</span>';
								rowStr+=		'</label>';

								if(rowObj.ShippingPrice>0){
									rowStr+='<span class="price">'+data.msg.Symbol+$('html').iconvPriceFormat(rowObj.ShippingPrice, 2, '', 1)+'</span>';
								}else{
									rowStr+='<span class="price free_shipping">'+lang_obj.products.goods.free_shipping+'</span>';
								}

								rowStr+=	'</span>';
								rowStr+='</li>';
							}
							$('.information_shipping .shipping[data-id='+OvId+'] .shipping_method_list').html(rowStr);
							if(rowStr==''){
								$('.information_shipping .shipping[data-id='+OvId+'] .shipping_method_list').html(''); //清空内容
								cart_obj.cart_init.set_shipping_method(OvId, -1, 0, '', 0);
							}else{
								let clickObj = $('.information_shipping .shipping[data-id='+OvId+'] .shipping_method_list li:eq(0)');
								if (inputSIdAry) {
									for (k in inputSIdAry) {
										let clicksObj = $('.information_shipping input[name="_shipping_method[' + k + ']"][value="' + inputSIdAry[k] + '"]');
										if (clicksObj.length) {
											clicksObj.parent().parent().click();
										} else {
											// 默认点击第一个选项
											clickObj.click();
										}
									}
								} else {
									// 默认点击第一个选项
									clickObj.click();
								}
							}
						}
						$('.information_shipping .shipping').not('.hide').each(function(){ //检查海外仓的快递数据是否存在
							var $ovid = $(this).attr('data-id'),
								$tid = $(this).attr('data-tid');
							if(!data.msg.info[$ovid+'-'+$tid]){
								$('.information_shipping .shipping[data-id='+$ovid+'] .shipping_method_list').html(''); //清空内容
								cart_obj.cart_init.set_shipping_method($ovid, -1, 0, '', 0);
							}
						});
					}
				}else{
					$('.shipping_method_list').html(''); //清空内容
					if($('.item_pro_table .prod_shipping').length){
						$('.item_pro_table .prod_shipping .shipping_show_box').hide();
						$('.item_pro_table .prod_shipping .shipping_error_box').show().html(lang_obj.checkout.checkout.tips_no_delivery.replace('{Country}', $('.checkout_error_tips').attr('data-country')) + ($('.checkout_error_tips').attr('data-email') ? ' ' + lang_obj.checkout.checkout.tips_contact_us.replace(/{Email}/g, $('.checkout_error_tips').attr('data-email')) : ''));
					}
					cart_obj.cart_init.set_shipping_method(1, -1, 0, '', 0);
				}
				var $IsNotSId=0;
				$('.information_shipping .shipping').not('.hide').each(function(){ //检查海外仓的快递数据是否存在
					if($(this).find('.shipping_method_list>li').size()==0){
						++$IsNotSId;
					}
				});
				cart_obj.cart_init.show_place_your_order($IsNotSId?0:1);
			}, 'json');
		},

		set_shipping_method: function(OvId, SId, price, type, TId){ //TId 运费模板ID
			//下单页面 选择运费
			//运费记录
			var inputSId=$('input[name=order_shipping_method_sid]'),
				inputType=$('input[name=order_shipping_method_type]'),
				inputPrice=$('input[name=order_shipping_price]'),
				TId = TId > 0 ? TId : 0,
				KId = OvId+'-'+TId,
				inputSId_ary={}, inputType_ary={}, inputPrice_ary={};

			inputSId.val()!='[]' && (inputSId_ary=$.evalJSON(inputSId.val()));
			inputType.val()!='[]' && (inputType_ary=$.evalJSON(inputType.val()));
			inputPrice.val()!='[]' && (inputPrice_ary=$.evalJSON(inputPrice.val()));
			if (SId > 0) { //SId=0 的时候 不需要更新运费
				inputSId_ary[KId]=SId;
				inputSId.val($.toJSON(inputSId_ary));

				inputType_ary[KId]=type;
				inputType.val($.toJSON(inputType_ary));

				inputPrice_ary[KId]=price;
				inputPrice.val($.toJSON(inputPrice_ary));
			}

			var shipPrice=0; //运费
			for(k in inputPrice_ary){
				shipPrice+=parseFloat(inputPrice_ary[k]);
			}
			if(SId==-1){
				inputSId.val('[]');
				inputType.val('[]');
				inputPrice.val('[]')
			}
			cart_obj.cart_init.show_shipping_info(OvId);
			//订单各项价格的计算
			cart_obj.cart_init.order_price_charge({
				'Amount'		: $('#PlaceOrderFrom').attr('amountPrice'), //产品总价
				'DiscountPrice'	: $('input[name=order_discount_price]').val(), //订单折扣
				'CutPrice'		: $('input[name=order_coupon_code]').attr('cutprice'), //优惠券优惠
				'ShippingPrice'	: shipPrice, //快递运费
				'Fee'			: $('#ot_fee').attr('data-fee'), //手续费
				'Affix'			: $('#ot_fee').attr('data-affix'), //手续附加费
			});
		},
		count_shipping: function(){ //计算运费
			//运费计算
			var inputPrice=$('#PlaceOrderFrom input[name=order_shipping_price]'),
				inputPrice_ary={},
				shipPrice=0;
			inputPrice.val()!='[]' && (inputPrice_ary=$.evalJSON(inputPrice.val()));
			for(k in inputPrice_ary){
				shipPrice+=parseFloat(inputPrice_ary[k]);
			}
			//订单各项价格的计算
			cart_obj.cart_init.order_price_charge({
				'Amount'		: $('#PlaceOrderFrom').attr('amountPrice'), //产品总价
				'DiscountPrice'	: $('input[name=order_discount_price]').val(), //订单折扣
				'CutPrice'		: $('input[name=order_coupon_code]').attr('cutprice'), //优惠券优惠
				'ShippingPrice'	: shipPrice, //快递运费
				'Fee'			: $('#ot_fee').attr('data-fee'), //手续费
				'Affix'			: $('#ot_fee').attr('data-affix'), //手续附加费
			});
		},
		return_payment_list: function(totalAmount, feePrice){
			//下单页面 判断支付下拉显示内容
			var minPrice=maxPrice=0;
			isNaN(feePrice) && (feePrice=0);
			if(feePrice!=0) totalAmount=parseFloat((totalAmount-feePrice).toFixed(2));
			$('.payment_row').each(function(){
				minPrice=parseFloat($(this).attr('min'));
				maxPrice=parseFloat($(this).attr('max'));
				if((!minPrice && !maxPrice) || (maxPrice?(totalAmount>=minPrice && totalAmount<=maxPrice):(totalAmount>=minPrice))){
					$(this).css('display', 'flex').parent().css('display', 'flex');
				}else{
					$(this).hide().parent().hide().next().hide('.payment_contents');
				}
			});
			if($('.payment_list .payment_row.current').size()==0){
				$('.payment_list .payment_row:visible').eq(0).click();
			}
		},

		show_shipping_info: function(OvId){
			//下单页面 快递信息的显示
			var $Obj=$('.information_shipping .shipping[data-id='+OvId+']'),
				$shipObj=$Obj.find('.title .shipping_info'),
				$radioObj=$Obj.find('input:radio:checked'),
				$Price=parseFloat($radioObj.attr('price')),
				$sPrice=$Price;
			if($radioObj.length){ //快递信息存在
				$shipObj.find('.name').text($radioObj.next('label').text());
				if($sPrice==0){
					$shipObj.find('.price').text(lang_obj.products.goods.free_shipping).addClass('free_shipping');
				}else{
					$shipObj.find('.price').text($('html').iconvPriceFormat($sPrice)).removeClass('free_shipping');
				}
			}else{ //不存在
				$shipObj.find('.name').text('');
				$shipObj.find('.price').text('').removeClass('free_shipping');
				if($('.checkout_error_tips').attr('data-country')){
					if ($('#zoneId').is(':visible') && !$('#zoneId select[name=Province]').val()) {
						$Obj.find('.shipping_method_list').append('<div class="error">'+lang_obj.checkout.result.address_error+'</div>');
					} else {
						$Obj.find('.shipping_method_list').append('<div class="error">'+lang_obj.checkout.checkout.tips_no_delivery.replace('{Country}', $('.checkout_error_tips').attr('data-country'))+' '+lang_obj.checkout.checkout.tips_contact_us.replace(/{Email}/g, $('.checkout_error_tips').attr('data-email'))+'</div>');
					}
				}else{
					$Obj.find('.shipping_method_list').append('<div class="error">'+lang_obj.checkout.result.address_error+'</div>');
				}
			}
		},

		show_place_your_order: function(IsShow)
		{
			//下单页面 下单按钮的显示
			var $BtnPlaceOrder=$('.order_summary .btn_place_order'),
				$BtnPaypal=$('#paypal_button_container');
			if ($('.information_product .tr.error').size() > 0) {
				//如果有错误产品，就不允许下单
				IsShow = 0;
			}
			if ($('#orderFormSubmit, #excheckoutFormSubmit').hasClass("btn_disabled_fixed")) {
				IsShow = 0;
			}
			if (IsShow == 1) {
				//允许下单
				$('#orderFormSubmit, #excheckoutFormSubmit').removeClass('btn_disabled');
				if($BtnPaypal.length){
					if($('.information_payment .current').attr('method')=='Paypal'){
						$BtnPaypal.show();
						$BtnPlaceOrder.hide();
					}else{
						$BtnPaypal.hide();
						$BtnPlaceOrder.show();
					}
				}else{
					$BtnPlaceOrder.show();
				}
			} else {
				//不允许下单
				$('#orderFormSubmit, #excheckoutFormSubmit').addClass('btn_disabled');
				$BtnPaypal.hide();
				$BtnPlaceOrder.show();
			}
		},

		order_price_charge: function(Data){
			//下单页面 订单各项价格的计算
			var $Amount			= parseFloat(Data.Amount), //产品总价
				$DiscountPrice	= parseFloat(Data.DiscountPrice), //订单折扣
				$CutPrice		= parseFloat(Data.CutPrice), //优惠券优惠
				$ShippingPrice	= parseFloat(Data.ShippingPrice), //快递运费
				$Fee			= parseFloat(Data.Fee), //手续费
				$Affix			= parseFloat(Data.Affix), //手续附加费
				$TotalPrice		= 0, //最终价格
				$FeePrice		= 0, //付款手续费
				$TaxType 		= parseFloat($('#TaxPrice').data('type')), //税率计算方式
				$Tax 			= parseFloat($('#ot_tax_price').attr('data-tax')), //税率
				$TaxPrice		= 0; //税费
			isNaN($Fee) && ($Fee=0);
			isNaN($Affix) && ($Affix=0);

			if($DiscountPrice){ //订单折扣
				$('#MemberCharge').hide();
				$('#DiscountCharge').show();
			}else{ //没有优惠
				$('#MemberCharge, #DiscountCharge').hide();
			}
			$('input[name=order_discount_price]').val($DiscountPrice);
			if ($Tax > 0) {
				if ($TaxType) {
					$TaxPrice = parseFloat($('html').iconvPriceFormat($Amount.add($ShippingPrice).mul($Tax), 2)); //税费
				} else {
					$TaxPrice = parseFloat($('html').iconvPriceFormat($Amount.mul($Tax), 2)); //税费
				}
			}
			$TotalPrice = $Amount.add($ShippingPrice).add($TaxPrice).sub($CutPrice).sub($DiscountPrice); //最终价格
			$FeePrice = $('html').iconvPriceFormat($TotalPrice.mul($Fee.div(100)), 2); //付款手续费
			$FeePrice = parseFloat($FeePrice).add($Affix);
			$('#ot_tax_price').text($('html').iconvPriceFormat($TaxPrice, 2, '', 1));
			$('#ot_shipping').text($('html').iconvPriceFormat($ShippingPrice, 2, '', 1));
			$('#ot_coupon').text($('html').iconvPriceFormat($CutPrice, 2, '', 1));
			$('#ot_subtotal_discount').text($('html').iconvPriceFormat($DiscountPrice, 2, '', 1));
			$('#ot_fee').text($('html').iconvPriceFormat($FeePrice, 2, '', 1)).attr({'data-fee':$Fee, 'data-affix':$Affix});
			$TotalPrice = $TotalPrice.add($FeePrice);
			$TotalPrice <= 0 && ($TotalPrice = 0);
			$('#ot_total').text($('html').iconvPriceFormat($TotalPrice, 2, '', 1));

			if ($TaxPrice > 0) { //有税费才显示
				$('#TaxPrice').show();
			} else {
				$('#TaxPrice').hide();
			}
			if($FeePrice!=0){ //判断“手续费栏目”是否显示
				$('#ServiceCharge').show();
			}else{
				$('#ServiceCharge').hide();
			}
			cart_obj.cart_init.return_payment_list($TotalPrice); //判断支付下拉显示内容
		},

		get_state_from_country: function(CId, stateJson, countryCodeJson){
			// 初始化
			stateJson = stateJson == undefined ? [] : stateJson;
			countryCodeJson = countryCodeJson == undefined ? [] : countryCodeJson;
			//收货地址 国家和省份的显示
			if (!CId) $('#country').parents('.input_box').removeClass('filled');
			else $('#country').parents('.input_box').addClass('filled');
			$('#zoneId').removeClass('filled');

			// 获取省份信息和国家代码
			var d = stateJson[CId] ? stateJson[CId] : -1,
				code = countryCodeJson[CId] ? countryCodeJson[CId] : '';

			if(d == -1){
				$('#zoneId').css({'display':'none'}).find('select').attr('disabled', 'disabled').removeAttr('notnull');
				$('#state').css({'display':'block'}).find('input').removeAttr('disabled').attr('notnull', 'notnull');
				$('#zoneId').next().css({'display':'none'}); //error
			}else{
				$('#zoneId').css({'display':'block'}).find('select').removeAttr('disabled').attr('notnull', '');
				$('#state').css({'display':'none'}).find('input').attr('disabled', 'disabled').removeAttr('notnull');
				str='';
				var vselect='<option value=""></option>';
				var vli= '';
				for(i=0; i<d.length; i++){
					vselect+='<option data-tax="'+d[i]['Tax']+'" value="'+d[i]['SId']+'">'+d[i]['States']+'</option>';
					vli+='<li class="group-option active-result">'+d[i]['States']+'</li>';
				}
				$('#zoneId select').html(vselect);
				$('#zoneId ul').html(vli);
				$('#zoneId .chzn-container a span').text(lang_obj.user.account.state);
			}
			$('#countryCode').val('+'+code);
			if(CId==30){  // 巴西
				$('#taxCode').css({'display':'block'}).find('select, input').removeAttr('disabled');
				$('#taxCode').find('input').attr('notnull', 'notnull');
				$('#tariffCode, #rutCode').css({'display':'none'}).find('select, input').attr('disabled', 'disabled');
				$('#tariffCode, #rutCode').find('input').removeAttr('notnull');
			}else if(CId==211){  // 泰国
				$('#tariffCode').css({'display':'block'}).find('select, input').removeAttr('disabled');
				$('#tariffCode').find('input').removeAttr('notnull');
				$('#taxCode, #rutCode').css({'display':'none'}).find('select, input').attr('disabled', 'disabled');
				$('#taxCode, #rutCode').find('input').removeAttr('notnull');
			} else if (CId == 43) {  // 智利
				$('#rutCode').css({'display':'block'}).find('select, input').removeAttr('disabled');
				$('#rutCode').find('input').attr('notnull', 'notnull');
				$('#tariffCode, #taxCode').css({'display':'none'}).find('select, input').attr('disabled', 'disabled');
				$('#tariffCode, #taxCode').find('input').removeAttr('notnull');
			}else if(CId == 224){ //英国 省份不填写
				$('#state').css({'display':'block'}).find('input').removeAttr('notnull');
			}else{
				$('#taxCode, #tariffCode, #rutCode').css({'display':'none'}).find('select, input').attr('disabled', 'disabled');
				$('#taxCode, #tariffCode, #rutCode').find('input').removeAttr('notnull');
			}
			var $Tax = parseFloat($('select[name="country_id"] option:selected').attr('data-tax'));
			$('#ot_tax_price').attr('data-tax', $Tax); //切换国家时切换税率

			let $Country = $('select[name="country_id"] option:selected').text();
			$('.checkout_error_tips').attr('data-country', $Country);
		},

		set_default_address: function(AId, NotUser){
			$.ajax({
				url:"/",
				async:false,
				type:'post',
				data:{'do_action':'user.get_addressbook', 'AId':AId, 'NotUser':NotUser},
				dataType:'json',
				success:function(data){
					if(data.ret==1){
						let $FirstName = data.msg.address.FirstName,
							$LastName = data.msg.address.LastName,
							$AddressLine1 = data.msg.address.AddressLine1,
							$AddressLine2 = data.msg.address.AddressLine2;
						typeof($FirstName) == "string" && ($FirstName = global_obj.htmlspecialchars_decode($FirstName));
						typeof($LastName) == "string" && ($LastName = global_obj.htmlspecialchars_decode($LastName));
						typeof($AddressLine1) == "string" && ($AddressLine1 = global_obj.htmlspecialchars_decode($AddressLine1));
						typeof($AddressLine2) == "string" && ($AddressLine2 = global_obj.htmlspecialchars_decode($AddressLine2));

						$('input[name=edit_address_id]').val(data.msg.address.AId);
						$('input[name=FirstName]').val($FirstName);
						$('input[name=LastName]').val($LastName);
						$('input[name=AddressLine1]').val($AddressLine1);
						$('input[name=AddressLine2]').val($AddressLine2);
						$('input[name=City]').val(data.msg.address.City);

						if (data.msg.address.CId) {
							var index=$('select[name=country_id]').find('option[value='+data.msg.address.CId+']').eq(0).attr('selected', 'selected').index();
							$('input[name=order_shipping_address_cid]').val(data.msg.address.CId);
							$('#country_chzn a span').text(data.msg.country.Country);
							$('#country_chzn ul.chzn-results li.group-option').eq(index).addClass('result-selected');
							cart_obj.cart_init.get_state_from_country(data.msg.address.CId, data.msg.stateAry, data.msg.countryCodeAry);
							if(data.msg.address.CId==30 || data.msg.address.CId==211 || data.msg.address.CId == 43){  // 巴西 || 泰国 || 智利
								$('select[name=tax_code_type]').find('option[value='+data.msg.address.CodeOption+']').attr('selected', 'selected');
								$('input[name=tax_code_value]').val(data.msg.address.TaxCode);
							}
							if(data.msg.country.HasState==1){
								$('#zoneId').addClass('filled');
								$('#zoneId div a span').text(data.msg.address.StateName);
								var sindex=$('select[name=Province]').find('option[value='+data.msg.address.SId+']').attr('selected', true).index();
								$('#zoneId ul.chzn-results li.group-option').eq(sindex-1).addClass('result-selected');
								var $Tax = parseFloat($('select[name="Province"] option:selected').attr('data-tax')); // 省份税率
								var $countryTax = parseFloat($('select[name="country_id"] option:selected').attr('data-tax')); // 国家税率
								$Tax == 0 && $countryTax > 0 && ($Tax = $countryTax); // 省份税率为0 国家税率有税率 自动补上
								$('#ot_tax_price').attr('data-tax', $Tax); //省份有设置税率则覆盖国家的税率
							}else{
								$('input[name=State]').val(data.msg.address.State);
							}
						}

						$('input[name=ZipCode]').val(data.msg.address.ZipCode);
						$('input[name=CountryCode]').val('+'+data.msg.address.CountryCode);
						$('input[name=PhoneNumber]').val(data.msg.address.PhoneNumber);

					}else if(data.ret==2){
						$('input[name=edit_address_id], input[name=FirstName], input[name=LastName], input[name=AddressLine1], input[name=AddressLine2], input[name=City], input[name=tax_code_value], input[name=State], input[name=ZipCode], input[name=CountryCode], input[name=PhoneNumber]').val('');
						if (data.msg.country) {
							var index=$('select[name=country_id]').find('option[value='+data.msg.country.CId+']').eq(0).attr('selected', 'selected').index();
							$('input[name=order_shipping_address_cid]').val(data.msg.country.CId);
							$('#country_chzn a span').text(data.msg.country.Country);
							$('#country_chzn ul.chzn-results li.group-option').eq(index).addClass('result-selected');
							cart_obj.cart_init.get_state_from_country(data.msg.country.CId, data.msg.stateAry, data.msg.countryCodeAry);
						}
					}else{
						global_obj.new_win_alert(data.msg.error);
					}

					$('#ShipAddrFrom .input_box_txt').each(function(){
						if($.trim($(this).val())!=''){
							$(this).parent().addClass('filled');
						}else{
							$(this).parent().removeClass('filled');
						}
					});
				}
			});
		},

		checkout_no_login: function(json){
			$.post('/?do_action=cart.set_no_login_address', json?json:$('.checkout_address_form').serialize(), function(data){
				if(data.ret==1){
					data.msg.v.FirstName = global_obj.htmlspecialchars(data.msg.v.FirstName);
					data.msg.v.LastName = global_obj.htmlspecialchars(data.msg.v.LastName);
					data.msg.v.AddressLine1 = global_obj.htmlspecialchars(data.msg.v.AddressLine1);
					data.msg.v.City = global_obj.htmlspecialchars(data.msg.v.City);
					data.msg.v.StateName = global_obj.htmlspecialchars(data.msg.v.StateName);
					data.msg.v.Country = global_obj.htmlspecialchars(data.msg.v.Country);
					//data.msg.v.State = global_obj.htmlspecialchars(data.msg.v.State);
					data.msg.v.ZipCode = global_obj.htmlspecialchars(data.msg.v.ZipCode);
					data.msg.v.CountryCode = global_obj.htmlspecialchars(data.msg.v.CountryCode);
					data.msg.v.PhoneNumber = global_obj.htmlspecialchars(data.msg.v.PhoneNumber);
					$('#PlaceOrderFrom').attr('nologin', data.msg.info);
					var Html='';
					Html+=	'<input type="radio" name="shipping_address_id" id="address_0" value="0" data-cid="'+data.msg.v.CId+'" checked />';
					Html+=	'<p class="clearfix"><strong>'+data.msg.v.FirstName+' '+data.msg.v.LastName+'</strong><a href="javascript:;" class="edit_address_info btn_global sys_bg_button">'+lang_obj.global.edit+'</a></p>';
					Html+=	'<p class="address_line">'+data.msg.v.AddressLine1+' '+(data.msg.v.AddressLine2?data.msg.v.AddressLine2+'':'')+'</p>';
					Html+=	'<p>'+data.msg.v.City+', '+(data.msg.v.StateName?data.msg.v.StateName:data.msg.v.State)+' '+data.msg.v.Country+' ('+data.msg.v.ZipCode+')</p>';
					Html+=	'<p>'+data.msg.v.CountryCode+' '+data.msg.v.PhoneNumber+'</p>';

					if($('.information_address .address_list .item:eq(0)').length){ //存在
						$('.information_address .address_list .item:eq(0)').html(Html);
					}else{ //不存在
						$('.information_address .address_list').html('<div class="item odd current">'+Html+'</div>');
					}
					$('.address_default').html(Html).show(500);
					$('#ShipAddrFrom').slideUp(500);
					$('input[name=order_shipping_address_aid]').val(0);
					$('input[name=order_shipping_address_cid]').val(data.msg.v.CId);
					var StatesSId = $('#zoneId').find('select[name="Province"] option:selected').val();
					cart_obj.cart_init.get_shipping_method_from_country(data.msg.v.CId, StatesSId);
					$('.checkout_error_tips').attr('data-country', data.msg.v.Country);
				}
			}, 'json');
		},

		data_posting: function(display, tips){
			if(display){
				var $Width=$(window).width(),
					$SideObj=$('.list_information, .information_product'),
					$SideWidth=$SideObj.width(),
					$SideLeft=$SideObj.offset().left,
					$BoxLeft=0;
				$BoxLeft=$Width/2-(206/2);
				$('.list_information, .information_product').prepend('<div id="data_posting"><img src="/static/ico/data_posting.gif" width="16" height="16" align="absmiddle" />&nbsp;&nbsp;'+tips+'</div>');
				$('#data_posting').css({'width':'188px', 'height':'24px', 'line-height':'24px', 'padding':'0 8px', 'overflow':'hidden', 'background-color':'#ddd', 'border':'1px #bbb solid', 'position':'fixed', 'top':'40%', 'left':$BoxLeft, 'z-index':10001});
			}else{
				setTimeout('$("#data_posting").remove();', 500);
			}
		},

		payment_ready: function(OId, IsUpdate) {
			$("html").payLoadingEffect(1);
			IsUpdate == 0 && analytics_click_statistics(5);
			setTimeout(function(){
				$.post('/?do_action=cart.payment_ready', {'OId':OId}, function(data){
					$("html").payLoadingEffect(0);
					if (data.ret > 0) {
						//线上付款 or 线下付款
						window.top.location.href = '/cart/complete/'+OId+'.html?utm_nooverride=1';
					} else if (data.ret == 0) {
						window.top.location.href = '/cart/'+OId+'/success.html';
					} else {
						window.top.location.href = '/cart/'+OId+'/error.html';
					}
				}, 'json');
			}, 1000);
		},

		create_address: function()
		{
			var $notnull = $('.checkout_address_form input[notnull], .checkout_address_form select[notnull]'),
				status = 0,
				$errorObj = {};

			$notnull.each(function(){
				$errorObj=($(this).attr('name')=='PhoneNumber'?$(this).parent().parent().next('p.error'):$(this).parent().next('p.error'));
				if($.trim($(this).val())==''){
					$(this).addClass('null');
					$errorObj.text(lang_obj.user.account.address_tips_PleaseEnter.replace('{Field}', $(this).attr('placeholder'))).show();
					status++;
					if(status==1){
						$('body,html').animate({scrollTop:$(this).parents('.rows').offset().top-20}, 500);
					}
				}else{
					$(this).removeClass('null');
					$errorObj.hide();
				}
			});

			$('.checkout_address_form input[format][notnull]').each(function(){
				$errorObj=$(this).parent().next('p.error');
				$format=$(this).attr('format').split('|');
				if($format[0]=='Length' && $.trim($(this).val()).length!=parseInt($format[1])){
					$(this).addClass('null');
					$errorObj.text(lang_obj.web.global.format_length.replace('{Length}', $format[1])).show();
					status++;
					if(status==1){
						$('body,html').animate({scrollTop:$(this).offset().top-20}, 500);
					}
				}else{
					$(this).removeClass('null');
					$errorObj.hide();
				}
			});

			return status;
		},

		create_order: function($obj){
			var $Type=$(this).attr('id')=='orderFormSubmit'?1:0, $Result=1;
			$Type==1 && $obj.addClass('btn_processing').val(lang_obj.web.global.processing_str).attr('disabled', 'disabled');

			var Email		= $('input[name=Email]'),
				EmailVal	= $.trim(Email.val()),
				ShipId		= $('input[name=order_shipping_method_sid]'),
				PayId		= $('input[name=order_payment_method_pid]');

			// 检查收货地址
			var ShipAddrFrom = $('.checkout_address_form');
			$status = cart_obj.cart_init.create_address($obj);
			if ($status) {
				$Result = 0;
			} else if(ShipAddrFrom.length) {
				$.post('/account/', $('.checkout_address_form').serialize()+'&do_action=user.addressbook_mod');
			}

			if($Result==1 && Email.length){ //检查邮箱地址
				if(EmailVal=='' || (EmailVal && /^\w+[a-zA-Z0-9-.+_]+@[a-zA-Z0-9-.+_]+\.\w*$/.test(Email.val())==false)){
					Email.addClass('null').next('p.error').text(lang_obj.user.account.reg_err_EmailFormat).show();
					$('body, html').animate({scrollTop:Email.offset().top-20}, 500);
					$Type==1 && $obj.removeClass('btn_processing').val(lang_obj.checkout.checkout.place_order).removeAttr('disabled');
					$Result=0;
				}
			}

			if($Result==1 && $('.item_pro_table .tr.null, .item_from_table .tr.null').length){ //检查是否存在错误产品
				$('body, html').animate({scrollTop:$('.item_pro_table, .item_from_table').offset().top}, 500);
				global_obj.new_win_alert(lang_obj.checkout.result.attribute_error);
				$Type==1 && $obj.removeClass('btn_processing').val(lang_obj.checkout.checkout.place_order).removeAttr('disabled');
				$Result=0;
			}

			if($Result==1 && ShipId.val()==-1){ //检查运费方式
				$('body, html').animate({scrollTop:$('.information_shipping').offset().top}, 500);
				global_obj.new_win_alert(lang_obj.checkout.result.shipping_error);
				$Type==1 && $obj.removeClass('btn_processing').val(lang_obj.checkout.checkout.place_order).removeAttr('disabled');
				$Result=0;
			}
			if($Result==1 && PayId.val()==-1){ //检查付款方式
				$('body, html').animate({scrollTop:$('.information_payment').offset().top}, 500);
				global_obj.new_win_alert(lang_obj.checkout.result.payment_error);
				$Type==1 && $obj.removeClass('btn_processing').val(lang_obj.checkout.checkout.place_order).removeAttr('disabled');
				$Result=0;
			}
			let $payCurrent = $('.information_payment .payment_list .payment_row.current');
			if ($Result == 1 && $payCurrent.data('showtype') == 1 && $payCurrent.data('system-type') == "system" && typeof(check_creditcard_info) === "function") {
				// 检查信用卡支付并且存在信用卡检测函数
				$tips = check_creditcard_info();
				if ($tips) {
					// 有错误信息
					$('body, html').animate({scrollTop:$('.information_payment').offset().top}, 500);
					global_obj.new_win_alert($tips);
					$Type==1 && $obj.removeClass('btn_processing').val(lang_obj.checkout.checkout.place_order).removeAttr('disabled');
					$Result=0;
				}
			}

			return $Result;
		},

		create_order_action: function($obj){
			//检查表单
			$result=cart_obj.cart_init.create_order($obj);
			if($result==0){
				$('#orderFormSubmit').one('click', function(){
					cart_obj.cart_init.create_order_action($(this));
				});
				return false;
			}
			var EmailVal=$.trim($('input[name=Email]').val());
			var Attr ='', typeAddr = '', Comments = '';
			if ($('.checkout_address_form').length) {
				Attr ='&' + $('.checkout_address_form').serialize() +'&Email='+EmailVal;
				typeAddr += '&typeAddr=' + parseInt($('input[name=typeAddr]').val());
			}
			var Remark='';
			if($('.item_pro_table input[name=Remark\\[\\]]').length){
				$('.item_pro_table input[name=Remark\\[\\]]').each(function(){
					Remark+='&Remark_'+$(this).attr('proid')+'_'+$(this).attr('cid')+'='+encodeURIComponent($(this).val());
				});
			}

			//顾客备注
			if ($('textarea[name=Comments]').val()) Comments = '&Comments=' + encodeURIComponent($('textarea[name=Comments]').val());

			setTimeout(function(){
				$.post('/?do_action=cart.placeorder', $('#PlaceOrderFrom').serialize()+Attr+Remark+typeAddr+Comments, function(data){
					if(data.ret==1){
						cart_obj.cart_init.payment_ready(data.msg.OId, data.msg.IsUpdate);
						//window.top.location.href='/cart/complete/'+data.msg.OId+'.html?utm_nooverride=1';
						return false;
					}else if(data.ret==-1){
						$('body, html').animate({scrollTop:$('.information_address').offset().top}, 500);
						global_obj.new_win_alert(lang_obj.checkout.result.address_error);
					}else if(data.ret==-2){
						var _top;
						if ($('.item_pro_table .prod_shipping').length){
							_top=$('.item_pro_table .prod_shipping .shipping_error_box:visible').parent().offset().top;
						} else {
							_top=$('.information_shipping').offset().top;
						}
						$('body, html').animate({scrollTop:_top}, 500);
						global_obj.new_win_alert(lang_obj.checkout.result.no_delivery);
					}else if(data.ret==-3){
						$('body, html').animate({scrollTop:$('.information_payment').offset().top}, 500);
						global_obj.new_win_alert(lang_obj.checkout.result.payment_error);
					}else if(data.ret==-4){
						global_obj.new_win_alert(lang_obj.checkout.result.product_error, function(){ window.location.reload(); });
					}else if(data.ret==-5){
						$('body, html').animate({scrollTop:$('.information_product').offset().top}, 500);
						global_obj.new_win_alert(lang_obj.checkout.result.low_error+': '+data.msg, '', '', undefined, undefined, lang_obj.web.global.ok);
					}else if(data.ret==-6){
						var arr=data.msg.split(',');
						for(i in arr){
							if(!$('.item_pro_table .tr[cid='+arr[i]+'].error').length){
								$('.item_pro_table .tr[cid='+arr[i]+']').addClass('error').find('.prod_info .invalid').show();
							}
						}
						$('body, html').animate({scrollTop:$('.information_product').offset().top}, 500);
						global_obj.new_win_alert(lang_obj.checkout.result.stock_error);
					}else if(data.ret==-7){ //优惠券已经失效
						global_obj.new_win_alert(data.msg);
						$('.btn_coupon_remove').click();
					}
					$obj.removeClass('btn_processing').val(lang_obj.checkout.checkout.place_order).removeAttr('disabled');
					if(data.ret!=1){
						$('#orderFormSubmit').one('click', function(){
							cart_obj.cart_init.create_order_action($(this));
						});
						return false;
					}
				}, 'json');
			}, 1000);
			return false;
		},

		confirm_order: function($obj){
			var $Btn	= $obj,
				$Form	= $('#PlaceOrderFrom'),
				$Tariff	= $('input[name=tax_code_value]'),
				$Phone	= $('input[name=phoneCode]'),
				$ShipId	= $('input[name=order_shipping_method_sid]'),
				$Result	= 1;

			$Btn.addClass('btn_processing').val(lang_obj.web.global.processing_str).attr('disabled', 'disabled');
			if ($Result == 1 && $Tariff.length) {
				//税务相关
				var $Max = parseInt($Tariff.attr('maxlength'));
				$Tariff.removeClass('null').parent().next('p.error').hide();
				if ($.trim($Tariff.val()) == '') {
					$Tariff.addClass('null').parent().next('p.error').text(lang_obj.user.account.address_tips_PleaseEnter.replace('{Field}', $Tariff.attr('placeholder'))).show();
					$Result = 0;
				} else if ($.trim($Tariff.val()).length < $Max) {
					$Tariff.addClass('null').parent().next('p.error').text(lang_obj.user.account.address_tips_taxcode_length.replace('{Field}', $Tariff.attr('placeholder')).replace('{TaxLength}', $Max)).show();
					$Result = 0;
				}
				if ($Result == 0) {
					$('body, html').animate({scrollTop:$('.information_tariff').offset().top}, 500);
					global_obj.new_win_alert(lang_obj.user.account.address_tips_PleaseEnter.replace('{Field}', $Tariff.attr('placeholder')));
					$Btn.removeClass('btn_processing').val(lang_obj.web.global.confirm).removeAttr('disabled');
				}
			}
			if ($Result == 1 && $Phone.length) {
				//检查手机号码
				$Phone.removeClass('null').next('p.phone_error').hide();
				if ($.trim($Phone.val()) == '') {
					$Phone.addClass('null').parent().next('p.phone_error').text(lang_obj.user.account.address_tips_phone_format).show();
					$Result = 0;
				} else if ($.trim($Phone.val()).length < 7) {
					$Phone.addClass('null').parent().next('p.phone_error').text(lang_obj.user.account.address_tips_phone_length).show();
					$Result = 0;
				}
				if ($Result == 0) {
					$('body, html').animate({scrollTop:$('.information_phone').offset().top}, 500);
					global_obj.new_win_alert(lang_obj.user.account.address_tips_phone_format);
					$Btn.removeClass('btn_processing').val(lang_obj.web.global.confirm).removeAttr('disabled');
				}
			}
			if ($Result == 1 && $ShipId.val() == '[]') {
				//检查运费方式
				$('body, html').animate({scrollTop:$('.information_shipping').offset().top}, 500);
				global_obj.new_win_alert(lang_obj.checkout.result.shipping_error);
				$Btn.removeClass('btn_processing').val(lang_obj.web.global.confirm).removeAttr('disabled');
				$Result = 0;
			}

			return $Result;
		},
	},

	list_init: function(){
		//更改购物车列表的产品数量
		$('.item_from_table .quantity_box .cut, .item_from_table .quantity_box .add').click(function(){
			var $Parent=$(this).parents('.tr'),
				$Type=$(this).hasClass('add')?1:-1;
			cart_obj.cart_init.quantity_change($Parent, $Type);
		});
		$('.item_from_table .quantity_box input[name=Qty\\[\\]]').bind({
			'keyup paste':function(){
				p=/[^\d]/g;
				$(this).val($(this).val().replace(p, ''));
			},
			'blur':function(){
				cart_obj.cart_init.quantity_change($(this).parents('.tr'), 0);
			}
		});
		/*$(document).on('click', function(e){
			if($(e.target).attr('name')!='Qty[]'){
				$('.item_from_table .quantity_box input[name=Qty\\[\\]]').blur();
			}
		});*/

		//删除购物车按钮
		$('.operate_delete').click(function(){
			var $Url=$(this).attr('data-url');
			console.log(lang_obj);
			global_obj.new_win_alert(lang_obj.web.global.del_confirm, function(){
				$.get($Url, {}, function(data){
					window.location.reload();
				});
			}, 'confirm');
			return false;
		});

		//批量删除购物车按钮
		$('.btn_remove').click(function(){
			var $CIdStr='0';
			if($('.item_from_table input[name=select]:checked').length){
				$('.item_from_table input[name=select]:checked').each(function(){
					$CIdStr+=','+$(this).val();
				});
			}else{
				global_obj.new_win_alert(lang_obj.web.global.batch_remove_select);
				return false;
			}
			global_obj.new_win_alert(lang_obj.web.global.del_confirm, function(){
				$.post('/?do_action=cart.bacth_remove&t='+Math.random(), {'cid_list':$CIdStr}, function(data){
					if(data.ret==1){
						global_obj.new_win_alert(lang_obj.web.global.batch_remove_success, function(){ window.top.location.href='/cart/' }, '', undefined, ''); //'/cart/'
					}else{
						global_obj.new_win_alert(lang_obj.web.global.batch_remove_error);
					}
				}, 'json');
			}, 'confirm');
			return false;
		});

		//清空全部问题产品按钮
		$('.btn_remove_invalid').click(function(){
			var $CIdStr='0';
			if($('.item_from_table input[name=select].null').length){
				$('.item_from_table input[name=select].null').each(function(){
					$CIdStr+=','+$(this).val();
				});
			}else{
				global_obj.new_win_alert(lang_obj.web.global.batch_remove_select);
				return false;
			}
			$.post('/?do_action=cart.bacth_remove&t='+Math.random(), {'cid_list':$CIdStr}, function(data){
				if(data.ret==1){
					global_obj.new_win_alert(lang_obj.web.global.batch_remove_success, function(){ window.top.location.href='/cart/' }, '', undefined, ''); //'/cart/'
				}else{
					global_obj.new_win_alert(lang_obj.web.global.batch_remove_error);
				}
			}, 'json');
			return false;
		});

		//返回购物按钮
		$('.btn_continue').click(function(){
			window.top.location.href='/';
		});

		//收藏产品
		$('.operate_wish').click(function() {
			var $Obj = $(this),
				$ProId = $(this).attr('data-proid');
			if ($Obj.hasClass('current')) {
				// 取消收藏
				$.get('/account/favorite/remove' + $ProId + '.html', {isjson:1}, function(data) {
					if (data.ret == 1) {
						// 添加收藏
						$('.operate_wish[data-proid=' + $ProId + ']').removeClass('current');
					}
				}, 'json');
			} else {
				// 添加收藏
				$.get('/account/favorite/add' + $ProId + '.html', '', function(data) {
					if (data.ret == 1) {
						// 添加收藏
						$('.operate_wish[data-proid=' + $ProId + ']').addClass('current');
						if (parseInt(ueeshop_config.FbPixelOpen) == 1 && data.ret == 1) {
							// 收藏成功
							// When a product is added to a wishlist.
							fbq('track', 'AddToWishlist', {
								content_ids: '[' + data.msg.Num + ']',
								content_name: data.msg.Name,
								currency: data.msg.Currency,
								value: '0.00'
							});
						}
					} else if (data.ret == 0) {
						// 已收藏
						$('.operate_wish[data-proid=' + $ProId + ']').removeClass('current');
					} else {
						user_obj.set_form_sign_in('', '', 1);
						$('form[name=signin_form] input[name="comeback"]').val('$(\'.add_favorite[data=' + ProId + ']\').click();');
					}
				}, 'json');
			}
		});

		//勾选事件：主动勾选
		$('.item_from_table input[name^="select"]').on('change', function(){
			var $checked = true,
				$tr,
				$obj = $(this);
			if($obj.attr('disabled') == 'disabled'){ //禁止勾选
				return false;
			}
			if(!$obj.is(':checked')){
				$checked = false;
			}

			if($obj.attr('name') == 'select_all'){ //全选
				$('.item_from_table input[name=select]').not('.null').each(function(index, element) {
					if($checked == true){
						$(element).prop('checked', true);
					}else{
						$(element).prop('checked', false);
					}
				});
				$tr = $obj.parents('.item_from_table').find('input[name=select]:first').parents('.tr');
			}else{ //部分勾选
				if($('.item_from_table input[name=select]:checked').not('.null').length == $('.item_from_table input[name=select]').not('.null').length){
					$('.item_from_table input[name=select_all]').prop('checked', true);
				}else{
					$('.item_from_table input[name=select_all]').prop('checked', false);
                }
                $tr = $obj.parents('.tr');
			}

			cart_obj.cart_init.quantity_change($tr, 0);
			return false;
		});

		//下一步 Checkout
		$('.btn_checkout').click(function(){
			$('.btn_checkout').addClass('btn_processing').text(lang_obj.web.global.processing_str);
			if($('.item_from_table input[name=select_all]').get(0).checked && !$('.item_from_table input[name=select]').not(':checked').length){ //全选
				window.location.href='/cart/checkout.html';
			}else if($('.item_from_table input[name=select]:checked').length){ //部分已选
				var CId='0';
				$('.item_from_table input[name=select]:checked').each(function(){ CId+='.'+$(this).val() });
				window.location.href='/cart/checkout.html?CId='+CId;
			}else{
				global_obj.new_win_alert(lang_obj.cart.global.checked_error, function(){ $('.btn_checkout').removeClass('btn_processing').text(lang_obj.cart.global.checkout_str) });
			}
		});

		//Paypal快捷支付
		$('.btn_paypal_checkout, .paypal_checkout_button').click(function(){
			var CId='0';
			$(this).blur().attr('disabled', 'disabled');
			if(ueeshop_config['TouristsShopping']==0 && ueeshop_config['UserId']==0){ //游客状态
				$(this).loginOrVisitors('', 1, function(){
					$('.btn_paypal_checkout, .paypal_checkout_button').removeAttr('disabled');
				}, 'cart_obj.paypal_checkout_nvp_init();ueeshop_config[\'UserId\']=1;');
			}else{
				//cart_obj.cart_init.paypal_checkout_init();
				cart_obj.paypal_checkout_nvp_init();
			}
			$(this).removeAttr('disabled');
			return false;
		});

		//底部的选项卡
		$('.cart_prod .title>a').on('click', function(){
			var $type=$(this).attr('data-type');
			$(this).addClass('FontColor').siblings().removeClass('FontColor');
			$(this).parents('.cart_prod').find('.pro_list').eq($type).show().siblings().hide();
		});
		$('.cart_prod .title>a:eq(0)').click();

		//右侧栏目
		var right_position=function(){
			if ($(window).width() > 1000) {
				var $ScrollTop=$(window).scrollTop(),
					$SideObj=$('.list_information'),
					$SideTop=$SideObj.offset().top,
					$SideHeight=$SideObj.outerHeight();
					$Obj=$('.list_summary'),
					$BoxHeight=$Obj.height(),
					$BoxLeft=$Obj.offset().left;
				if($ScrollTop>$SideTop){
					$Obj.css({'position':'fixed', 'top':0, 'left':$BoxLeft});
					if((($ScrollTop-$SideTop)+$BoxHeight)>$SideHeight){
						$Obj.css({'top':-($ScrollTop+$BoxHeight-$SideHeight-$SideTop)});
					}
				}else{
					$Obj.removeAttr('style');
				}
			} else {
				$('.list_summary').removeAttr('style');
			}
		};
		if($('.list_summary').length){
			$(window).scroll(function(){
				right_position();
			});
			$(document).ready(function(){
				right_position();
			});
		}
	},

	checkout_init: function(){
		cart_obj.right_position();
		//收货地址
		$('.information_address .address_list .item').click(function(){
			var $Input	= $(this).find('input'),
				$Value	= $Input.val(),
				$CId	= parseInt($Input.attr('data-cid')),
				$Country= $Input.attr('data-country-name');
			$(this).addClass('current').siblings().removeClass('current');
			$Input.attr('checked', true);
			$('.address_default').html($(this).html()).show(500);
			$('.address_default .edit_address_info').addClass('btn_global sys_bg_button');
			$('.address_default input').attr({'checked':false, 'id':''});
			$('.address_list').removeClass('address_show').hide();
			$('#moreAddress').text(lang_obj.checkout.checkout.moreAddress);
			$Value>0 && $('input[name=order_shipping_address_aid]').val($Value);
			$CId>0 && $('input[name=order_shipping_address_cid]').val($CId);
			$('.checkout_error_tips').attr('data-country', $Country);
			var StatesSId = $('#zoneId').find('select[name="Province"] option:selected').val();
			cart_obj.cart_init.get_shipping_method_from_country($CId, StatesSId);
			$.post('/account/', 'do_action=user.addressbook_selected&AId='+$Value); //记录默认收货地址
		});
		if($('.information_address .address_list .item').size()>0){ //有收货地址信息
			$('.information_address .address_list .item:eq(0)').click(); //默认点击第一个
			$('#ShipAddrFrom').hide();
		}else{
			address_perfect=1;
		}
		if($('.information_address .address_list .item').size()<2){ //收货地址选项小于2个，更多地址按钮隐藏起来
			$('.information_address .address_button i, #moreAddress').hide();
		}
		$('#addAddress').click(function(){
			cart_obj.cart_init.set_default_address(0);
			$('.address_default, .address_list, .address_button').hide();
			$('#ShipAddrFrom').slideDown(500);
			$('#ShipAddrFrom input[notnull], #ShipAddrFrom select[notnull]').removeClass('null');
			$('#ShipAddrFrom p.error').hide();
		});
		$('#moreAddress').click(function(){ //更多地址 or 收起
			var $Obj=$('.address_list');
			if($Obj.hasClass('address_show')){ //隐藏
				$(this).text(lang_obj.checkout.checkout.moreAddress);
				$('.address_default').show(500);
				$Obj.removeClass('address_show').hide();
			}else{ //显示
				$(this).text(lang_obj.products.goods.foldAddress);
				$('.address_default').hide();
				$Obj.addClass('address_show').slideDown(500);
			}
			return false;
		});
		$('.information_address').delegate('.edit_address_info', 'click', function(){
			if($('.checkout_address_form input[name=typeAddr]').val()==0){ //会员状态
				var $AId=$(this).parents('.item').find('input').val();
				cart_obj.cart_init.set_default_address($AId);
			}else{ //非会员状态
				$('input[name=order_shipping_address_aid]').val(-1);
				cart_obj.cart_init.set_default_address(0, 1);
			}
			$('.address_default, .address_list, .address_button').hide();
			$('#ShipAddrFrom').slideDown(500);
			$('#ShipAddrFrom input[notnull], #ShipAddrFrom select[notnull]').removeClass('null');
			$('#ShipAddrFrom p.error').hide();
			return false;
		});
		$('#cancel_address').click(function(){
			$('.address_default, .address_button').show(500);
			$('#ShipAddrFrom').slideUp(500);
		});
		if(address_perfect==1){ //非会员 或者 缺失收货地址
			var $AId=0;
			$('input[name=order_shipping_address_aid]').val(-1);
			$('.address_default, .address_list, .address_button').hide();
			$('#ShipAddrFrom').slideDown(500);
			$('#cancel_address').hide();
			address_perfect_aid>0 && ($AId=address_perfect_aid);
			cart_obj.cart_init.set_default_address($AId, $('.checkout_address_form input[name=typeAddr]').val()); //大于0就是缺失收货地址 等于0就是非会员
			var CId=$('#country').find('option:selected').val(),
				StatesSId=$('#zoneId').find('select[name="Province"] option:selected').val();
			cart_obj.cart_init.get_shipping_method_from_country(CId, StatesSId);
		}

		//收货地址的编辑
		var address_rq_mark=true;
		$('.checkout_address_form').submit(function(){ return false; });
		if ($('.checkout_address_form').length) {
			$('.checkout_address_form #taxCodeValue').keyup(function(){
				var $type = $('#taxCodeOption').val();
				if ($('select[name="country_id"]').val() == 30) {  // 巴西
					if ($type==1) {
						$("#taxCodeValue").mask("000.000.000-00");
					} else {
						$("#taxCodeValue").mask("00.000.000/0000-00");
					}
				}
			});
			$('.checkout_address_form #rutCodeValue').on('keyup', function () {  // 智利
				$("#rutCodeValue").mask("00.000.00A-A");
			});
			$('.checkout_address_form #rutCodeValue').on('blur', function () {  // 智利
				let len = $(this).val().length;
				if (len == 10) $("#rutCodeValue").mask("0.000.000-A");
			});
			$('.checkout_address_form input[name="PhoneNumber"]').keyup(function(){
				if ($('select[name="country_id"]').val() == 30) {  // 巴西
					$('.checkout_address_form input[name="PhoneNumber"]').mask("(00) 0000-00000");
				}
			});
		}
		$('#country').change(function(){
			//应对谷歌的自动填写表单的功能
			var $Index = $(this).find('option:selected').index();
			$('#country_chzn li.group-option').eq($Index).click();
		});
		$('.chzn-container-single .chzn-search').css('height', $('.chzn-container-single .chzn-search input').height());
		$('a.chzn-single').off().on('click', function(){
			$(this).parent().next('p.errorInfo').text('');
			if($(this).hasClass('chzn-single-with-drop')){
				$(this).blur().removeClass('chzn-single-with-drop').next().css({'left':'-9000px'}).parent().removeClass('chzn-container-active').css('z-index', '0').find('li.result-selected').removeClass('highlighted');
			}else{
				$(this).blur().addClass('chzn-single-with-drop').next().css({'left':'0', 'top':'41px'}).parent().addClass('chzn-container-active').css('z-index', '11').find('li.result-selected').addClass('highlighted');
				if(!$('#country_chzn li.group-result:eq(0)').next('li.group-option').length) $('#country_chzn li.group-result').hide();
			}
		});
		$('.chzn-results').delegate('li.group-option', 'mouseover', function(){
			$(this).parent().find('li').removeClass('highlighted');
			$(this).addClass('highlighted');
		}).delegate('li.group-option', 'mouseout', function(){
			$(this).removeClass('highlighted');
		});
		$('#country_chzn li.group-option').click(function(){
			//Select Country
			$(this).parents('.input_box').addClass('filled');
			var obj		= $('#country_chzn li.group-option').removeClass('result-selected').index($(this)),
				s_cid	= $('#PlaceOrderFrom input[name=order_shipping_address_cid]').val();
			$(this).addClass('result-selected').parents('.chzn-drop').removeAttr('style').parent().removeClass('chzn-container-active').children('a').removeClass('chzn-single-with-drop').find('span').text($(this).text());
			$('#country option').eq(obj+1).attr('selected', 'selected').siblings().removeAttr('selected');
			var cid	= $('select[name=country_id]').val(),
				stateJson = $('select[name=country_id]').data('state'),
				countryCodeJson = $('select[name=country_id]').data('code');

			$('input[name=order_shipping_address_aid]').val(0);
			$('input[name=order_shipping_address_cid]').val(cid);
			(s_cid!=cid) && cart_obj.cart_init.get_state_from_country(cid, stateJson, countryCodeJson);	//change country
			cart_obj.cart_init.get_shipping_method_from_country(cid);
		});
		$('#zoneId').delegate('li.group-option', 'click', function(){
			$(this).parents('.input_box').addClass('filled');
			var obj=$('#zoneId li.group-option').removeClass('result-selected').index($(this));
			$(this).addClass('result-selected').parents('.chzn-drop').removeAttr('style').parent().removeClass('chzn-container-active').children('a').removeClass('chzn-single-with-drop').find('span').text($(this).text());
			$('#zoneId select>option').eq(obj+1).attr('selected', 'selected').siblings().removeAttr('selected');
			var $Tax = parseFloat($('#zoneId select>option').eq(obj+1).attr('data-tax')); //省份税率
			var $countryTax = parseFloat($('select[name="country_id"] option:selected').attr('data-tax')); // 国家税率
			$Tax == 0 && $countryTax > 0 && ($Tax = $countryTax); // 省份税率为0 国家税率有税率 自动补上
			$('#ot_tax_price').attr('data-tax', $Tax); //省份有设置税率则覆盖国家的税率
			var $CId = $('select[name="country_id"] option:selected').val(),
				$StatesSId = $('select[name="Province"] option:selected').val();
			cart_obj.cart_init.get_shipping_method_from_country($CId, $StatesSId);
		});
		$(document).click(function(e){
			e	= window.event || e; // 兼容IE7
			obj	= $(e.srcElement || e.target);
			if(!$(obj).is("#country_chzn, #country_chzn *")){
				$('#country_chzn').removeClass('chzn-container-active').css('z-index', '0').children('a').blur().removeClass('chzn-single-with-drop').end().children('.chzn-drop').css({'left':'-9000px'}).find('input').val('').parent().next().find('.group-option').addClass('active-result');
			}
			if(!$(obj).is("#zoneId .chzn-container, #zoneId .chzn-container *")){
				$('#zoneId .chzn-container').removeClass('chzn-container-active').css('z-index', '0').children('a').blur().removeClass('chzn-single-with-drop').end().children('.chzn-drop').css({'left':'-9000px'}).find('input').val('').parent().next().find('.group-option').addClass('active-result');
			}
		});
		jQuery.expr[':'].Contains=function(a,i,m){
			return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
		};
		function filterList(input, list){
			$(input).change(function(){
				var filter=$(this).val();
				if(filter){
					$matches=$(list).find('li:Contains('+filter+')');
					$('li', list).not($matches).removeClass('active-result');
					$matches.addClass('active-result');
				}else {
					$(list).find('li').addClass('active-result');
				}
				return false;
			})
			.keyup(function(){
				$(this).change();
			});
		}
		filterList('#country_chzn .chzn-search input', $('#country_chzn .chzn-results'));
		filterList('#zoneId .chzn-search input', $('#zoneId .chzn-results'));
		$("html").checkAmount($(".checkout_address_form"));

		//弹出提示
		$('.delivery_ins').each(function(){
			$('#main').tool_tips($(this), {position:'vertical', html:$(this).attr('content'), width:260});
		});

		//快递方式
		$('.information_shipping .shipping .title').click(function(){
			var $Obj=$(this).parent();
			if($Obj.hasClass('current')){ //隐藏
				$Obj.removeClass('current');
				$Obj.find('.list').slideUp();
			}else{ //展开
				$Obj.addClass('current');
				$(this).next('.list').slideDown();
			}
		});
		if($('.information_shipping .shipping').size()>0){ //有快递方式信息
			//$('.information_shipping .shipping:eq(0) .title').click(); //默认点击第一个
			$('.information_shipping .shipping .title').click(); //默认全都打开
		}

		//选择快递方式 单包裹
		$('.shipping_method_list').delegate('li', 'click', function(){
			var obj=$(this).find('input:radio'),
				OvId=obj.parents('.list').parent().attr('data-id'),
				TId=obj.parents('.list').parent().attr('data-tid'),
				SId=obj.val(),
				type=obj.attr('ShippingType'),
				price=obj.attr('price');
			obj.parent().parent().siblings().find('input').removeAttr('checked');
			obj.attr('checked', 'checked');
			cart_obj.cart_init.set_shipping_method(OvId, SId, price, type, TId);
		});
		//选择快递方式 多包裹
		$('.information_product .prod_shipping').delegate('.shipping_show_box .ship_name', 'click', function(){
			//打开物流选择框
			$(this).parents('.prod_shipping').find('.shipping_select_box').show();
		}).delegate('.shipping_select_box .ship_close', 'click', function(){
			//关闭物流选择框
			$(this).parents('.prod_shipping').find('.shipping_select_box').hide();
		}).delegate('.shipping_select_box .ship_tr', 'click', function(){
			//选择物流加上选中效果
			$(this).addClass('current').siblings().removeClass('current');
		}).delegate('.ship_btn_confirm', 'click', function(){
			//确认选中物流
			var obj = $(this).parents('.fixed_shipping_box').find('input:radio:checked'),
				show_box = $(this).parents('.prod_shipping').find('.shipping_show_box'),
				OvId = obj.attr('data-ovid'),
				TId = obj.attr('data-tid'),
				SId = obj.val(),
				price = obj.attr('data-price'),
				name = obj.parents('.ship_tr').find('.td_name').text(),
				desc = obj.parents('.ship_tr').find('.td_desc').text(),
				show_price = (parseFloat(price)>0 ? $('html').iconvPriceFormat(price) : lang_obj.products.goods.free_shipping);
			show_box.find('.ship_name').html(name + (desc ? '<span class="brief">' + desc + '</span>' : ''));
			show_box.find('.ship_price').text(show_price);
			$(this).parents('.shipping_select_box').hide();
			cart_obj.cart_init.set_shipping_method(OvId, SId, price, '', TId);
		});

		//付款方式
		$('.information_payment .icon_shipping_title').click(function(){
			if($(this).hasClass('current')){
				$(this).removeClass('current');
				$('.information_payment .payment_list:gt(0), .information_payment .payment_contents:gt(0)').hide();
			}else{
				$(this).addClass('current');
				$('.information_payment .payment_list, .information_payment .payment_contents').show();
			}
		});
		$('.payment_list .payment_row').click(function(){
			var $ID=$(this).attr('value'),
				$Method=$(this).attr('method');
			$(this).find('input').attr('checked', true);
			$(this).parents('.information_payment').find('.payment_row').removeClass('current');
			$(this).addClass('current');
			$('.payment_contents .payment_note[data-id!='+$ID+']').slideUp(); //收起全部
			$('.payment_contents .payment_note[data-id='+$ID+']').slideDown();
			$('#PlaceOrderFrom input[name=order_payment_method_pid]').val($(this).attr('value'));
			//Paypal按钮 (仅限于新用户版本)
			if($('#paypal_button_container').length){
				if($Method=='Paypal'){ //显示
					if(!$('.order_summary .btn_place_order').hasClass('btn_disabled')){ //下单按钮没有被屏蔽
						$('#paypal_button_container').show();
						$('.order_summary .btn_place_order').hide();
					}
				}else{ //隐藏
					$('#paypal_button_container').hide();
					$('.order_summary .btn_place_order').show();
				}
			}
			$('#ot_fee').attr('data-fee', $('.payment_contents .payment_note[data-id='+$ID+']').attr('data-fee'));
			$('#ot_fee').attr('data-affix', $('.payment_contents .payment_note[data-id='+$ID+']').attr('data-affix'));
			cart_obj.cart_init.count_shipping();
		});
		if (typeof(paypal) === 'undefined') {
			$(".payment_list .payment_row[method=\"Paypal\"]").parent().next().remove();
			$(".payment_list .payment_row[method=\"Paypal\"]").parent().next().remove();
			$(".payment_list .payment_row[method=\"Paypal\"]").parent().remove();
			$(".checkout_content .information_express").remove();
			$(".checkout_content .box_or").remove();
		}

		//优惠券
		var coupon_ajax_mark=true,
			couponCode=$('input[name=order_coupon_code]').val();
		if(couponCode!='') cart_obj.cart_init.ajax_get_coupon_info(couponCode);
		$('#coupon_apply').on('click', function(){ //优惠券提交
			var code=$('input[name=couponCode]').val();
			if(code && coupon_ajax_mark){
				cart_obj.cart_init.ajax_get_coupon_info(code);
			}else{
				$('input[name=couponCode]').addClass('null');
				setTimeout(function(){
					$('input[name=couponCode]').removeClass('null');
				}, 2000);
			}
		});
		$('input[name=couponCode]').on('focus keyup paste mousedown', function(){ //优惠券下拉选择
			var $This	= $(this),
				$Obj	= $This.parent(),
				$Email  = $('.information_customer input[name=Email]').val();
			$.post('/ajax/ajax_coupon.html', {'keyword':$(this).val(), 'Email':$Email}, function(data){
				$Obj.find('.coupon_content_box').remove();
				$Obj.append(data);
				$('.coupon_content_box .item').on('click', function(){
					$('input[name=couponCode]').val($(this).attr('data-number'));
					$('.coupon_content_box').remove();
				});
			});
			$('.coupon_box .code_input').on('mouseleave', function(){
				$(this).parent().find('.coupon_content_box').remove();
			});
		});
		$('.btn_coupon_remove').on('click', function(){ //优惠券取消
			$('input[name=order_coupon_code]').val('').attr('cutprice', '0.00');
			$('.coupon_box .code_input').show(200).find('input').val('');
			$('.coupon_box .code_valid').hide().find('strong').text('');
			$('#CouponCharge').hide();
			//取消
			$.post('/?do_action=cart.remove_coupon', '', function(){
				$('input[name=order_coupon_code]').attr('cutprice', 0);
				if($('input[name=order_shipping_address_cid]').length){
					var cid=parseInt($('input[name=order_shipping_address_cid]').val());
					if(cid<=0){
						cid=parseInt($('#country').val());
					}
					var StatesSId = $('#zoneId').find('select[name="Province"] option:selected').val();
					cart_obj.cart_init.get_shipping_method_from_country(cid, StatesSId);
				}
				cart_obj.cart_init.count_shipping();
			});
		});

		//下订单
		$('#orderFormSubmit').one('click', function(){
			if($(this).hasClass('btn_disabled')) return false;
			cart_obj.cart_init.create_order_action($(this));
		});

		//Paypal快捷支付
		$('#excheckoutFormSubmit').on('click', function(){
			//继续确认支付
			if ($(this).hasClass('btn_disabled')) return false;
			var $Form	= $('#PlaceOrderFrom'),
				$Phone	= $('input[name=phoneCode]'),
				$TaxType= $('input[name=tax_code_type]'),
				$Tariff	= $('input[name=tax_code_value]'),
				$PId    = $('input[name=PaymentId]').val(),
				$Result = cart_obj.cart_init.confirm_order($(this)),
				$Version= parseInt($('input[name=Version]').val()),
				$Data	= $Form.serialize() + ($Phone.length ? '&PhoneCode=' + $.trim($Phone.val()) : '') + ($TaxType.length ? '&TaxType=' + parseInt($TaxType.val()) : '') + ($Tariff.length ? '&TaxCode=' + $.trim($Tariff.val()) : '');
			if ($Result == 0) {
				return false;
			}
			//顾客备注
			if ($('textarea[name=Comments]').val()) $Data += '&Comments=' + encodeURIComponent($('textarea[name=Comments]').val());
			$.post('/?do_action=cart.orders_update_shipping_info', $Data, function(data) {
				if (data.ret == 1) {
					if ($PId == 2 && $Version >= 4) {
						//新版Paypal快捷支付
						$("html").payLoadingEffect(1);
						$.post('/?do_action=cart.paypal_checkout_change_log', {'OId':data.msg}, function(result){
							$("html").payLoadingEffect(0);
							if (result.ret == 1) {
								window.top.location = result.Url;
								return false;
							} else {
								global_obj.new_win_alert(result.msg);
							}
						}, 'json');
					} else if ($PId == 2 && $Version < 4) {
						//旧版快捷支付
						window.top.location = '/payment/paypal_excheckout/DoExpressCheckoutPayment/' + data.msg + '.html';
					} else {
						window.top.location = '/cart/complete/' + data.msg + '.html';
					}
					return false;
				} else {
					if (data.ret == -2) {
						var _top;
						if ($('.item_pro_table .prod_shipping').length){
							_top=$('.item_pro_table .prod_shipping .shipping_error_box:visible').parent().offset().top;
						} else {
							_top=$('.information_shipping').offset().top;
						}
						$('body, html').animate({scrollTop:_top}, 500);
						global_obj.new_win_alert(lang_obj.checkout.result.shipping_error);
					} else {
						global_obj.new_win_alert(data.msg);
					}
					$('#excheckoutFormSubmit').removeClass('btn_processing').val(lang_obj.checkout.checkout.place_order).removeAttr('disabled');
				}
				$Btn.removeClass('btn_processing').val(lang_obj.web.global.confirm).removeAttr('disabled');
			}, 'json');
		});
		$('#PlaceOrderFrom .btn_cancel').on('click', function(){
			//取消确认支付
			var $Form=$('#PlaceOrderFrom');
			global_obj.new_win_alert(lang_obj.checkout.checkout.cancel_tips, function(){
				$.post('/?do_action=cart.paypal_checkout_cancel_log', $Form.serialize(), function(data){
					if(data.ret==1){
						window.top.location='/';
						return false;
					}else{
						global_obj.new_win_alert(data.msg);
					}
				}, 'json');
			}, 'confirm');
			return false;
		});
	},

	paypal_init: function(){
		if (typeof(paypal) === 'undefined' || typeof(paypal.FUNDING) === 'undefined') return false;
		$('#paypal_button_container').loading();
		$('.loading_msg').css({'top':0, 'left':'48%'});
		ueeshop_config.Funding='';
		//Orders API v2
		$('#paypal_button_container').unloading();
		if(ueeshop_config.currency=='EUR' && ueeshop_config.PaypalLoaclPayment){
			ueeshop_config.Funding={'allowed':eval('[paypal.FUNDING.CREDIT,'+ueeshop_config.PaypalLoaclPayment+']')};
		}else{
			ueeshop_config.Funding={'allowed':eval('[paypal.FUNDING.CREDIT]')};
		}
		if ($("#paypal_button_container").length) {
			paypal.Buttons({
				env: ueeshop_config.PaypalENV, //sandbox | production
				commit: true,
				locale: (ueeshop_config.PaypalLanguage == 0 ? "en_US" : ""),
				style: { layout:(parseInt(ueeshop_config.PaypalCreditCard) == 1 ? 'vertical' : 'horizontal'), size:'medium', shape:'rect', tagline:false, fundingicons: true },
				funding: ueeshop_config.Funding,
				// onInit is called when the button first renders
				// onInit: function(data, actions) {

				// },

				// onClick is called when the button is clicked
				onClick: function() {
					if ($('#cart_checkout_container').size()) {
						var $result = cart_obj.cart_init.create_order($('paypal_button_container'));
						if ($result == 0) return false;
					}
				},
				createOrder: function(data, actions) {
					if ($('.complete_container').length) {
						//订单确认页面
						var $OId    = $('input[name=OId]').val(),
							$Form   = $('#PlaceOrderFrom'),
							$Phone	= $('input[name=phoneCode]'),
							UPDATE_URL = '/?do_action=cart.orders_update_shipping_info&OId=' + $OId,
							UPDATE_DATA = {"data":$Form.serialize() + ($Phone.length ? '&PhoneCode=' + $.trim($Phone.val()) : '')+ ($('textarea[name=Comments]').val() ? '&Comments=' + encodeURIComponent($('textarea[name=Comments]').val()) : '')};
						$Result = cart_obj.cart_init.confirm_order($('#excheckoutFormSubmit'));
						if ($Result == 1) {
							return fetch(UPDATE_URL, {
								method: 'POST',
								credentials: 'include',
								headers: {'content-type': 'application/json'},
								body: JSON.stringify(UPDATE_DATA)
							}).then(function(res) {
								return res.json();
							}).then(function(data) {
								return fetch('/?do_action=cart.paypal_payment_create_log&OId=' + $OId, {
									method: 'POST',
									credentials: 'include'
								}).then(function(res) {
									return res.json();
								}).then(function(data) {
									if (data.name && data.message) {
										//返回报错
										let errorText = "";
										if (data.details) {
											for (let k in data.details) {
												errorText += (k == 0 ? "" : ", ") + data.details[k].description;
											}
										}
										!errorText && (errorText = data.message);
										global_obj.new_win_alert(errorText, function(){
											$("#paypal_button_container").find('.paypal-button').show();
											$("#paypal_button_container").unloading();
										}, 'alert');
										$('.new_win_alert').css('z-index', 100001);
										return false;
									} else {
										return data.id;
									}
								});
							});
						} else {
							return false;
						}
					} else if ($('.success_container').length) {
						//支付失败页面
						var $OId = $('input[name=OId]').val();
						return fetch('/?do_action=cart.paypal_payment_create_log&OId=' + $OId, {
							method: 'POST',
							credentials: 'include'
						}).then(function(res) {
							return res.json();
						}).then(function(data) {
							if (data.name && data.message) {
								//返回报错
								let errorText = "";
								if (data.details) {
									for (let k in data.details) {
										errorText += (k == 0 ? "" : ", ") + data.details[k].description;
									}
								}
								!errorText && (errorText = data.message);
								global_obj.new_win_alert(errorText, function(){
									$("#paypal_button_container").find('.paypal-button').show();
									$("#paypal_button_container").unloading();
								}, 'alert');
								$('.new_win_alert').css('z-index', 100001);
								return false;
							} else {
								return data.id;
							}
						});
					} else {
						//下单页面
						if (cart_obj.cart_init.paypal_result.OId) {
							//重复点击，直接获取下单ID，再次付款
							var $OId = cart_obj.cart_init.paypal_result.OId;
							return fetch('/?do_action=cart.paypal_payment_create_log&OId=' + $OId, {
								method: 'POST',
								credentials: 'include'
							}).then(function(res) {
								return res.json();
							}).then(function(data) {
								if (data.name && data.message) {
									//返回报错
									let errorText = "";
									if (data.details) {
										for (let k in data.details) {
											errorText += (k == 0 ? "" : ", ") + data.details[k].description;
										}
									}
									!errorText && (errorText = data.message);
									global_obj.new_win_alert(errorText, function(){
										$("#paypal_button_container").find('.paypal-button').show();
										$("#paypal_button_container").unloading();
									}, 'alert');
									$('.new_win_alert').css('z-index', 100001);
									return false;
								} else {
									return data.id;
								}
							});
						}
						$result = cart_obj.cart_init.create_order($('paypal_button_container'));
						if ($result == 1) {
							var Attr ='', typeAddr = '';
							if ($('.checkout_address_form').length) {
								Attr ='&' + $('.checkout_address_form').serialize() + '&Email=' + $.trim($('.information_customer input[name=Email]').val());
								typeAddr += '&typeAddr=' + parseInt($('input[name=typeAddr]').val());
							}
							var Remark = '';
							if ($('.item_pro_table input[name=Remark\\[\\]]').length) {
								$('.item_pro_table input[name=Remark\\[\\]]').each(function() {
									Remark += '&Remark_' + $(this).attr('proid') + '_' + $(this).attr('cid') + '=' + $(this).val();
								});
							}
							var CREATE_URL = '/?do_action=cart.paypal_payment_create_log',
								CREATE_DATA = {"data":$('#PlaceOrderFrom').serialize() + Attr + Remark + typeAddr};
							return fetch(CREATE_URL, {
								method: 'POST',
								credentials: 'include',
								headers: {'content-type': 'application/json'},
								body: JSON.stringify(CREATE_DATA)
							}).then(function(res) {
								return res.json();
							}).then(function(data) {
								if (data.ret) {
									if (data.ret == -1) {
										$('body, html').animate({scrollTop:$('.information_address').offset().top}, 500);
										global_obj.new_win_alert(lang_obj.checkout.result.address_error);
									} else if (data.ret == -2) {
										var _top;
										if ($('.item_pro_table .prod_shipping').length){
											_top=$('.item_pro_table .prod_shipping .shipping_error_box:visible').parent().offset().top;
										} else {
											_top = $('.information_shipping').offset().top;
										}
										$('body, html').animate({scrollTop:_top}, 500);
										global_obj.new_win_alert(lang_obj.checkout.result.shipping_error);
									} else if (data.ret == -3) {
										$('body, html').animate({scrollTop:$('.information_payment').offset().top}, 500);
										global_obj.new_win_alert(lang_obj.checkout.result.payment_error);
									} else if (data.ret == -4) {
										global_obj.new_win_alert(lang_obj.checkout.result.product_error, function(){ window.location.reload(); });
									} else if (data.ret == -5) {
										$('body, html').animate({scrollTop:$('.information_product').offset().top}, 500);
										global_obj.new_win_alert(lang_obj.checkout.result.low_error + ': ' + data.msg, '', '', undefined, undefined, lang_obj.web.global.ok);
									} else if (data.ret == -6) {
										var arr = data.msg.split(',');
										for (i in arr) {
											if (!$('.item_pro_table .tr[cid=' + arr[i] + '].error').length) {
												$('.item_pro_table .tr[cid=' + arr[i] + ']').addClass('error').find('.prod_info .invalid').show();
											}
										}
										$('body, html').animate({scrollTop:$('.information_product').offset().top}, 500);
										global_obj.new_win_alert(lang_obj.checkout.result.stock_error);
									} else if (data.ret == -7) {
										//优惠券已经失效
										global_obj.new_win_alert(data.msg);
										$('.btn_coupon_remove').click();
									}
									if (data.ret < 0) {
										$('#paypal_button_container').find('.paypal-button').show();
										$('#paypal_button_container').unloading();
									}
									return false;
								} else {
									//Place an Order 生成订单 统计
									analytics_click_statistics(5);
									cart_obj.cart_init.paypal_result.OId = data.OId;
									return data.id;
								}
							});
						} else {
							return false;
						}
					}
				},
				onApprove: function(data, actions) {
					$("html").payLoadingEffect(1);
					return fetch('/?do_action=cart.paypal_payment_execute_log&orderID=' + data.orderID + '&payerID=' + data.payerID + '&paymentID=' + data.paymentID, {
						method:'GET',
						credentials: 'include'
					}).then(function(res) {
						return res.json();
					}).then(function(data) {
						window.top.location = data.Url;
					});
				},
				onCancel: function (data) {
					// Show a cancel page, or return to cart
					$.post('/?do_action=cart.paypal_payment_cancel_log&orderID=' + data.orderID + '&OId=' + cart_obj.cart_init.paypal_result.OId, data);
					if (!cart_obj.cart_init.paypal_result.OId && data.cancelUrl) {
						window.top.location = data.cancelUrl;
					}
				},
				onError: function (err) {
					// Show an error page here, when an error occurs
					$.post('/?do_action=cart.paypal_payment_error_log', {OId:cart_obj.cart_init.paypal_result.OId, Error:err.message});
				}
			}).render('#paypal_button_container');
		}
	},

	paypal_checkout_init: function(){
		if (typeof(paypal) === 'undefined' || typeof(paypal.FUNDING) === 'undefined') {
			if ($('#goods_form').length) {
				//产品详细页
				$('.box_paypal').remove();
			}
			return false;
		}
		$('#paypal_checkout_container').loading();
		if ($('#goods_form').length) {
			//产品详细页
			$('.loading_msg').css('left', 106);
		}
		ueeshop_config.Funding = '';
		var $Height = $('#paypal_checkout_container').height();
		//Orders API v2
		$('#paypal_checkout_container').unloading();
		if (ueeshop_config.currency == 'EUR' && ueeshop_config.PaypalLoaclPayment) {
			ueeshop_config.Funding = {'allowed':eval('[paypal.FUNDING.CREDIT,' + ueeshop_config.PaypalLoaclPayment + ']')};
		} else {
			ueeshop_config.Funding = {'allowed':eval('[paypal.FUNDING.CREDIT]')};
		}
		if ($("#paypal_checkout_container").length) {
			paypal.Buttons({
				env: ueeshop_config.PaypalENV, //sandbox | production
				commit: true,
				locale: (ueeshop_config.PaypalLanguage == 0 ? "en_US" : ""),
				style: { layout:'horizontal', size:'medium', shape:'rect', color:'gold', label:'checkout', tagline:false, height:$Height },
				funding: ueeshop_config.Funding,
				createOrder: function(data, actions) {
					var $proData = '', $CId = '-1', $Type = "Cart";
					if ($('#goods_form').length) {
						$Type = "Product";
						var $Form = $('#goods_form'),
							$proData = new FormData($Form[0]);
						$proData.append('SourceType', "shipping_cost");
						var $IsCustom = 0, result = 0;
						if ($('.custom_attr_box').length) {
							//定制属性
							$IsCustom = 1;
							$('.custom_attr_box .widget>li').each(function(){
								if (parseInt($(this).data('required')) == 1) {
									//必填
									$(this).find('input[type=text], textarea, select').each(function() {
										if (!$(this).val()) {
											result = 1;
										}
									});
									if ($(this).find('input[type=checkbox]').size() > 0 && $(this).find('input[type=checkbox]:checked').size() < 1) {
										//多选
										result = 1;
									}
									if ($(this).find('input[type=file]').length && $(this).find('input[type=file]')[0].files.length < 1) {
										//图片
										result = 1;
									}
								}
							});
						}
						$('.attributes').removeClass('attributes_tips');
						if ($IsCustom == 1) {
							$('.custom_attr_box .widget').removeClass('attributes_tips');
							$('.attributes').removeAttr('style');
						}
						if (result) {
							$('.attributes').addClass('attributes_tips');
							if ($IsCustom == 1) {
								$('.custom_attr_box .widget').addClass('attributes_tips');
								$('.attributes').css('border-bottom', 0);
							}
							return false;
						}
					} else if ($('.information_express').length) {
						$('.item_pro_table input[name=select]:checked').each(function(){ $CId += '.' + $(this).val() });
						$proData = 'CId=' + $CId;
						$proData = $proData.split('&');
						if ($CId == '-1') {
							//没有产品
							global_obj.win_alert(lang_obj.cart.global.checked_error);
							return false;
						}
						$proData = JSON.stringify($proData);
					} else {
						$('.item_from_table input[name=select]:checked').each(function(){ $CId += '.' + $(this).val() });
						$proData = 'CId=' + $CId;
						$proData = $proData.split('&');
						if ($CId == '-1') {
							//没有产品
							global_obj.win_alert(lang_obj.cart.global.checked_error);
							return false;
						}
						$proData = JSON.stringify($proData);
					}
					return fetch('/?do_action=cart.paypal_checkout_payment_log', {
						method: 'POST',
						credentials: 'include',
						headers: {'content-type': 'application/json'},
						body: $proData
					}).then(function(res) {
						return res.json();
					}).then(function(data) {
						var $payId = "";
						$.ajax({
							type: 'POST',
							url: '/?do_action=cart.paypal_checkout_create_log',
							data: $proData,
							dataType: 'json',
							async: false,
							cache: false,
							contentType: false,
							processData: false,
							success: function(result) {
								//快捷支付 统计
								$Type == "Product" && analytics_click_statistics(3); //仅有产品添加才记录
								if (result.message) {
									//返回报错
									if ($('#goods_form').length) {
										//产品详细页
										var subObj      = $('#goods_form'),
											$attr_name  = '',
											err			= 0;
										subObj.find('select').not('[data-custom=1]').each(function() {
											if (!$(this).val()) {
												if (!$attr_name) $attr_name = $(this).parents('li').attr('name');
												err = 1;
											}
										});
										subObj.find('.attr_value').each(function() {
											if (!$(this).val()) {
												if (!$attr_name) $attr_name = $(this).parents('li').attr('name');
												err = 1;
											}
										});
										$('.attributes').removeClass('attributes_tips');
										if (err) {
											$('.attributes').addClass('attributes_tips');
											return false;
										}
									}
									let errorText = "";
									if (result.details) {
										for (let k in result.details) {
											errorText += (k == 0 ? "" : ", ") + result.details[k].description;
										}
									}
									!errorText && (errorText = result.message);
									global_obj.new_win_alert(errorText, function() {
										$('#paypal_checkout_container').find('.paypal-button').show();
										$('#paypal_checkout_container').unloading();
									});
									$('.new_win_alert').css('z-index', 100001);
									$Type == "Product" && analytics_click_statistics(1); //仅有产品添加才记录(交易报错，记录加入购物车事件)
									return false;
								}
								$payId = result.id;
								return result.id;
							}
						});
						return $payId;
					});
				},
				onApprove: function(data, actions) {
					$("html").payLoadingEffect(1);
					return fetch('/?do_action=cart.paypal_checkout_complete_log&orderID=' + data.orderID + '&payerID=' + data.payerID + '&paymentID=' + data.paymentID, {
						method:'GET',
						credentials: 'include'
					}).then(function(res) {
						return res.json();
					}).then(function(data) {
						$("html").payLoadingEffect(0);
						if (data.error === 'INSTRUMENT_DECLINED') {
							return actions.restart();
						}
						if (data.ret == 1) {
							window.top.location = '/cart/complete/' + data.OId + '/checkout.html?utm_nooverride=1';
						} else {
							global_obj.new_win_alert(res.msg);
						}
					});
				},
				onCancel: function (data) {
					// Show a cancel page, or return to cart
					$('#paypal_checkout_container').find('.paypal-button').show();
					$('#paypal_checkout_container').unloading();
				},
				onError: function (err) {
					// Show an error page here, when an error occurs
					$('#goods_form').length && analytics_click_statistics(1); //仅有产品添加才记录(交易报错，记录加入购物车事件)
				}
			}).render("#paypal_checkout_container");
		}
	},

	paypal_checkout_nvp_init: function(){
		$('#paypal_checkout_button').loading();
		if ($('#goods_form').length) {
			//产品详细页
			$('.loading').css('opacity', 100);
			$('.loading_msg').css('left', 89);
		} else {
			$('.loading').css('opacity', 100);
			$('.loading_msg').css('left', 113);
		}

		var $proData='', $CId='-1';
		if ($('#goods_form').length) {
			$proData = $('#goods_form').serialize()+'&SourceType=shipping_cost';
		} else {
			$('.item_from_table input[name=select]:checked, .item_pro_table input[name=select]:checked').each(function(){ $CId+='.'+$(this).val() });
			$proData = 'CId=' + $CId;
			if ($CId == '-1') {
				//没有产品
				global_obj.win_alert(lang_obj.cart.global.checked_error);
				return false;
			}
		}

		var excheckout_html = '';
		excheckout_html += '<div id="box_paypal_checkout" style="position:absolute; width:500px; height:50px;">';
		excheckout_html +=  '<form name="paypal_checkout_form" method="POST" action="/payment/paypal_excheckout/do_payment/?utm_nooverride=1">';
		excheckout_html +=      '<input id="excheckout_button" type="submit" value="' + lang_obj.continue_str.continue_str.continue_str + '" />';
		excheckout_html +=      '<input type="hidden" name="Data" value="' + $proData + '" />';
		excheckout_html +=  '</form>';
		excheckout_html +='</div>';
		excheckout_html +='<script>';
		excheckout_html +=  'window.paypalCheckoutReady = function(){';
		excheckout_html +=      'setTimeout(function(){ $("#excheckout_button").click(); $("#paypal_checkout_button").unloading(); }, 1000); paypal.checkout.setup("'+ueeshop_config.PaypalExcheckout+'", {button:"excheckout_button", environment:"production", condition: function(){ return true; } });';
		excheckout_html +=  '};';
		excheckout_html +='</script>';
		$('#box_paypal_checkout').length && $('#box_paypal_checkout').remove();
		$('body').prepend(excheckout_html);

		$('#box_paypal_checkout form').submit();
	},

	success_init: function(){
		cart_obj.right_position();
		cart_obj.cart_init.return_payment_list($('input[name=TotalPrice]').val()); //判断支付下拉显示内容

		// 判断手续费有值，文本显示
		let $fee = $("#ot_fee").text();
		isNaN($fee) && ($fee = 0);
		$fee = parseFloat($fee);
		if ($fee > 0) {
			$("#ServiceCharge").show();
		}

		//付款方式
		$('.information_payment .icon_shipping_title').click(function(){
			if($(this).hasClass('current')){
				$(this).removeClass('current');
				$('.information_payment .payment_list:gt(0), .information_payment .payment_contents:gt(0)').hide();
			}else{
				$(this).addClass('current');
				$('.information_payment .payment_list, .information_payment .payment_contents').show();
			}
		});
		$('.payment_list .payment_row').click(function(){
			var $ID = $(this).attr('value'),
				$Method = $(this).attr('method');
			$(this).find('input').attr('checked', true);
			$(this).parents('.information_payment').find('.payment_row').removeClass('current');
			$(this).addClass('current');
			$('.payment_contents .payment_note[data-id!='+$ID+']').slideUp(); //收起全部
			$('.payment_contents .payment_note[data-id='+$ID+']').slideDown();
			$('form[name=pay_edit_form] input[name=PId]').val($ID);

			//Paypal按钮 (仅限于新用户版本)
			if ($('#paypal_button_container').length) {
				if ($Method == 'Paypal') {
					//显示
					$('#paypal_button_container').show();
					$('.order_summary .btn_coutinue').hide();
				} else {
					//隐藏
					$('#paypal_button_container').hide();
					$('.order_summary .btn_coutinue').show();
				}
			}

			var $TotalPrice = parseFloat($('input[name=TotalPrice]').val()), //订单金额
				$Currency = $('input[name=Symbols]').attr('currency'),
				$Fee = parseFloat($('.payment_contents .payment_note[data-id='+$ID+']').attr('data-fee')), //手续费
				$Affix = parseFloat($('.payment_contents .payment_note[data-id='+$ID+']').attr('data-affix')), //手续附加费
				$FeePrice = 0;
			isNaN($Fee) && ($Fee = 0);
			isNaN($Affix) && ($Affix = 0);
			$FeePrice = parseFloat($TotalPrice * ($Fee / 100)).add($Affix); //付款手续费
			$TotalPrice = $TotalPrice.add($FeePrice);
			$TotalPrice <= 0 && ($TotalPrice = 0);
			$('#ot_total').text($('html').iconvPriceFormat($TotalPrice, 2, $Currency, 1));
			if ($FeePrice > 0) {
				$('#ServiceCharge').show();
				$('#ot_fee').text($('html').iconvPriceFormat($FeePrice, 2, $Currency, 1));
			} else {
				$('#ServiceCharge').hide();
			}
		});
		if ($('input[name=PaymentId]').val()) {
			//已有付款ID
			$('.payment_list .payment_row[class!=not_show][value=' + $('input[name=PaymentId]').val() + ']').click();
		} else {
			//付款ID丢失
			$('.payment_list .payment_row:visible').eq(0).click();
		}
		if (typeof(paypal) === 'undefined') {
			$(".payment_list .payment_row[method=\"Paypal\"]").parent().next().remove();
			$(".payment_list .payment_row[method=\"Paypal\"]").parent().next().remove();
			$(".payment_list .payment_row[method=\"Paypal\"]").parent().remove();
			$(".checkout_content .information_express").remove();
			$(".checkout_content .box_or").remove();
		}

		//提交编辑付款方式
		$('form[name=pay_edit_form]').submit(function(){ return false; });
		$('#pay_button').click(function(){
			var obj = $('form[name=pay_edit_form]');
			var $this=$(this);
			$this.attr('disabled', 'disabled').blur();

			let $payCurrent = $('.information_payment .payment_list .payment_row.current');
			if ($payCurrent.data('showtype') == 1 && $payCurrent.data('system-type') == "system" && typeof(check_creditcard_info) === "function") {
				// 检查信用卡支付并且存在信用卡检测函数
				$tips = check_creditcard_info();
				if ($tips) {
					// 有错误信息
					global_obj.new_win_alert($tips);
					$this.attr('disabled', false).blur();
					return false;
				}
			}

			$.post('/?do_action=cart.orders_payment_update', obj.serialize(), function(data){
				window.top.location.href = $('form[name=pay_edit_form] input[name=BackLocation]').val();
			});
			return false;
		});

		//提交注册会员
		$('form[name=account_form]').submit(function(){ return false; });
		$('.btn_create_account').click(function(){
			var obj=$('form[name=account_form]');
			$('.pwd_input').removeAttr('style');
			if($.trim($('.pwd_input').val())==''){
				$('.pwd_input').css('border-color', '#c00');
				return false;
			}
			$(this).attr('disabled', 'disabled').blur();
			$.post('/?do_action=cart.orders_create_account', obj.serialize(), function(data){
				if(data.ret==1){
					window.top.location.href='/account/';
				}else{
					global_obj.new_win_alert(lang_obj.web.global.set_error);
				}
			}, 'json');
			return false;
		});

		//线下支付表单事件
		$('#lib_cart .complete').delegate('a.payButton', 'click', function() {
			$('.payment_info').slideUp(300).siblings('.payment_form').slideDown(500);
		});
		$('.payment_form').delegate('#Cancel', 'click', function() {
			$('.payment_info').slideDown(300).siblings('.payment_form').slideUp(500);
		});
		$('#PaymentForm').delegate('input[name=SentMoney]', 'keypress keyup', function() {
			$(this).val(($(this).val()).replace(/[^\d.]/g, ''));
		});
		$('#PaymentForm').delegate('input[name=MTCNNumber]', 'keypress keyup', function() {
			$(this).val(($(this).val()).replace(/[^\d]/g, ''));
		});
		$('#PaymentForm').delegate('input,select', 'click', function() {
			$(this).removeAttr('style');
		});
		var pay_rq_mark = true;
		$('#PaymentForm').submit(function(){ return false; });
		$('#paySubmit').on('click', function() {
			if (pay_rq_mark && !$('#paySubmit').hasClass('disabled')) {
				var $notnull = $('#PaymentForm input[notnull], #PaymentForm select[notnull]'),
					$errorObj = {},
					$format = {};
				$('#paySubmit').addClass('disabled');
				pay_rq_mark = false;
				setTimeout(function() {
					var status = 0;
					$notnull.each(function() {
						$errorObj = $(this).parent().next('p.error');
						if ($.trim($(this).val()) == '') {
							$(this).addClass('null');
							$errorObj.text(lang_obj.user.account.address_tips_PleaseEnter.replace('{Field}', $(this).attr('placeholder'))).show();
							status++;
							if (status == 1) {
								$('body,html').animate({scrollTop:$(this).offset().top-20}, 500);
							}
						} else {
							$(this).removeClass('null');
							$errorObj.hide();
						}
					});
					$('#PaymentForm input[format]').each(function() {
						$errorObj = $(this).parent().next('p.error');
						$format = $(this).attr('format').split('|');
						if ($format[0] == 'Length' && $.trim($(this).val()).length != parseInt($format[1])) {
							$(this).addClass('null');
							$errorObj.text(lang_obj.web.global.format_length.replace('{Length}', $format[1])).show();
							status++;
							if (status == 1) {
								$('body,html').animate({scrollTop:$(this).offset().top-20}, 500);
							}
						} else {
							$(this).removeClass('null');
							$errorObj.hide();
						}
					});
					if (status) {
						//检查表单
						pay_rq_mark = true;
						$('#paySubmit').removeClass('disabled');
						return false;
					}
					$.post('/?do_action=cart.offline_payment', $('#PaymentForm').serialize(), function(data) {
						if (data.ret == 1) {
							var $OId = $('#PaymentForm input[name=OId]').val();
							window.top.location = '/cart/' + $OId +'/success.html';
						} else if (data.ret == '-1') {
							global_obj.new_win_alert(lang_obj.checkout.checkout.required_fields_tips);
						} else if (data.ret == '-2') {
							global_obj.new_win_alert(lang_obj.checkout.checkout.already_paid_tips);
						} else if (data.ret == '-3') {
							global_obj.new_win_alert(lang_obj.checkout.checkout.abnormal_tips);
						}
					}, 'json');
					pay_rq_mark = true;
					$('#paySubmit').removeClass('disabled');
				}, 100);
			}
			return false;
		});
	},

	right_position: function(){
		//右侧栏目
		var right_position=function(){
			if ($(window).width() > 1000) {
				var $ScrollTop=$(window).scrollTop(),
					$SideObj=$('.checkout_content'),
					$SideTop=$SideObj.offset().top,
					$SideHeight=$SideObj.outerHeight();
					$Obj=$('.order_summary'),
					$BoxHeight=$Obj.height(),
					$BoxLeft=$Obj.offset().left;
				if($ScrollTop>$SideTop && $SideHeight > $BoxHeight + 10){
					$Obj.css({'position':'fixed', 'top':0, 'left':$BoxLeft});
					if((($ScrollTop-$SideTop)+$BoxHeight)>$SideHeight){
						$Obj.css({'top':-($ScrollTop+$BoxHeight-$SideHeight-$SideTop)});
					}
				}else{
					$Obj.removeAttr('style');
				}
			} else {
				$('.order_summary').removeAttr('style');
			}
		};
		if($('.order_summary').length){
			$(window).scroll(function(){
				right_position();
			});
			$(document).ready(function(){
				right_position();
			});
		}
	}
};
