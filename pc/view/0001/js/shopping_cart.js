
$('html').on('click', '.default_shopping_cart', function(){
	console.log(1);
	if(!$('.global_shopping_cart_bg').length) $('body').append('<div class="global_shopping_cart_bg"></div><div class="global_shopping_cart_box"></div>');
	var $note = $('.global_shopping_cart_box'),
		$scroll_w = window.innerWidth-$(window).width();
	($scroll_w > 100 || $scroll_w < 0) && ($scroll_w = 0); //兼容IE
	$('.global_shopping_cart_bg').show();
	$note.css('right', '0');
	$('.header_fix').css({'width':'inherit'});
	($('.global_drafts_tips').length>0) && $('.global_drafts_tips').css({'width':'inherit'});
	$('body').css({'overflow':'hidden','width':$(window).width(),'position': 'relative'});
	$.ajax({
		url:"/ajax/shopping_cart.html?v=1",//"/?m=ajax&a=shopping_cart",
		async:false,
		type:'get',
		dataType:'html',
		success:function(result){
			if(result){
				$note.html(result);
				ShippingCartHeight();
				window.addEventListener("resize", ShippingCartHeight);
			}
		}
	});
	return false;
});
$('html').on('click', '.global_shopping_cart_bg, .global_shopping_cart_box .cart_close', function(){
	$('.global_shopping_cart_bg').hide();
	$('.global_shopping_cart_box').css('right', '-400px');
	$('body').removeAttr('style');
	$('.header_fix').removeAttr('style');
	($('.global_drafts_tips').length>0) && $('.global_drafts_tips').removeAttr('style');
	window.removeEventListener("resize", ShippingCartHeight);
});


$('#addtocart_button').on('click', function(){
	var subObj=$("#goods_form"),
		$attr_name='',
		result=0,
		$IsCustom=0;

	if($(this).attr('disabled')) return false;
	subObj.find("select").not('[data-custom=1]').each(function(){
		if(!$(this).val()){
			if(!$attr_name) $attr_name=$(this).parents('li').attr('name');
			result=1;
		}
	});
	subObj.find(".attr_value").each(function(){
		if(!$(this).val()){
			if(!$attr_name) $attr_name=$(this).parents('li').attr('name');
			result=1;
		}
	});
	if ($('.custom_attr_box').length) {
		//å®šåˆ¶å±žæ€§
		$IsCustom = 1;
		$('.custom_attr_box .widget>li').each(function(){
			if (parseInt($(this).data('required')) == 1) {
				//å¿…å¡«
				$(this).find('input[type=text], textarea, select').each(function() {
					if (!$(this).val()) {
						result = 1;
					}
				});
				if ($(this).find('input[type=checkbox]').size() > 0 && $(this).find('input[type=checkbox]:checked').size() < 1) {
					//å¤šé€‰
					result = 1;
				}
				if ($(this).find('input[type=file]').length && $(this).find('input[type=file]')[0].files.length < 1) {
					//å›¾ç‰‡
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
			$('.attributes').length <= 0 &&  $('.custom_attr_box .widget').addClass('not_attr');
		}
		return false;
	}

	$(this).attr('disabled', true);
	var offset = $('.cart_inner').offset(),
		btnLeft = $(this).offset().left+$(this).outerWidth(true)/3,
		btnTop = $(this).offset().top-$(this).outerHeight(true)-30,
		flyer = $('<div class="addtocart_flyer"></div>');

	var $Form = $('#goods_form'),
		$Formdata = new FormData($Form[0]);
	$Formdata.append('back', 1);
	$.ajax({
		type: 'POST',
		url: '/ajax/cart.html',
		data: $Formdata,
		dataType: 'json',
		async: false,
		cache: false,
		contentType: false,
		processData: false,
		success: function(data) {
			if (data.code == 201) {
				//错误
				//错误
				$(this).attr('disabled', false);
				global_obj.new_win_alert(data.msg);
			} else if (data.code == 200) {
				if ($('#shopbox_outer').length) {
					var parentObj=$(window.parent.document);
					parentObj.find('#div_mask').remove();
					parentObj.find('#shopbox').shopboxHide();
					parent.$('.default_shopping_cart:eq(0)',parent.doucment).click();
					parentObj.find('.header_cart .cart_count, .default_shopping_cart .cart_count').html(data.msg.qty);
					parentObj.find('.header_cart .cart_count_price, .default_shopping_cart .cart_count_price').text($('html').currencyFormat(data.msg.total_price,ueeshop_config.currency));
				} else {
					//添加成功
					$('.default_shopping_cart:eq(0)').click();
					$('#addtocart_button').attr('disabled', false);
					$('.header_cart .cart_count, .default_shopping_cart .cart_count').text(data.msg.qty);
					//$('.header_cart .cart_count_price, .default_shopping_cart .cart_count_price').text($('html').currencyFormat(data.msg.total_price,ueeshop_config.currency));
				}
				//åŠ å…¥è´­ç‰©è½¦ç»Ÿè®¡
			//	analytics_click_statistics(1);
			//	parseInt(ueeshop_config.FbPixelOpen)==1 && $('html').fbq_addtocart !== undefined && $('html').fbq_addtocart(data.msg.item_price);
			//	parseInt(ueeshop_config.GooglePixelOpen)==1 && $('html').gtag_addtocart !== undefined && $('html').gtag_addtocart(data.msg.item_price);
			//	parseInt(ueeshop_config.BingTabOpen)==1 && $('html').bing_addtocart !== undefined && $('html').bing_addtocart();
			//	parseInt(ueeshop_config.pintrkPixelOpen)==1 && $('html').pintrk_addtocart !== undefined && $('html').pintrk_addtocart(data.msg.item_price, data.msg.item_qty, data.msg.total_price, data.msg.qty);
			} else {
				$('#addtocart_button').attr('disabled', false);
				if($('#shopbox_outer').length){//äº§å“è¯¦ç»†å¼¹å‡ºæ¡†
					var parentObj=$(window.parent.document);
					parentObj.find('#shopbox').shopboxHide();
				}
			}
		}
	});
	return false;
});
$('html').on('click', '#div_mask, .btn_return', function(){
	$('#tips_cart').hide();
	global_obj.div_mask(1);
});
