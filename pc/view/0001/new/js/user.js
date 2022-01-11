
var address_perfect=0;

var user_obj={
	/******************* 登录或注册 Start *******************/
	sign_in_init:function(){
		var cancelback=(typeof(arguments[0])=='undefined')?'':arguments[0];//取消返回函数

		$('body').off().on('click', '.SignInButton', function(){ //点击登录链接，显示登录框
			user_obj.set_form_sign_in('', '', 1);
		})
		.on('click', '#fixed_login_popup .signin_close, #fixed_login_popup_bg', function(){ //关闭登录
			cancelback && cancelback();
			if($('#fixed_login_popup').length && $('#fixed_login_popup .signin_close').is(':visible') && !ueeshop_config['_login']){
				$('#fixed_login_popup').hide();
			}
			return false;
		})
		.on('submit', 'form[name=signin_form]', function(){ //会员登录
            if (global_obj.check_form($(this).find('*[notnull]'))) {
                return false;
            }
            var $this = $(this),
				$popup = $this.parents('#fixed_login_popup').length,
				Email=$.trim(($this.find('input[name=AccountEmail]').length ? $this.find('input[name=AccountEmail]').val() : $this.find('input[name=Email]').val())),
				r=/^\w+[a-zA-Z0-9-.+_]+@[a-zA-Z0-9-.+_]+\.\w*$/;
			$('#error_login_box').hide();
			if(!r.test(Email)){
				if ($popup) {
					$('#error_login_box').html(lang_obj.web.global.format_email).show();
				} else {
					global_obj.new_win_alert(lang_obj.web.global.format_email);
				}
				return false;
			}
			$this.find('button:submit').attr('disabled', true);

			$.post('/', $this.serialize(), function(data){
				$this.find('button:submit').removeAttr('disabled');
				if(data.ret!=1){
					if ($popup) {
						$('#error_login_box').html(data.msg[0]).show();
					} else {
						global_obj.new_win_alert(data.msg[0]);
					}
				}else{
					if($this.find('input[name=comeback]').val() != ''){
						var $callback=$('input[name=comeback]').val();
						console.log($callback);
						$callback && eval($callback);
						$('html').checkUser();
					}else window.location=data.msg[0];
					$popup && $('#fixed_login_popup').hide();
				}
				$this.find('input[name=comeback]').val('');
			}, 'json');

			return false;
		})
	},

	set_form_sign_in:function(type){//生成登录框
		var Url=(typeof(arguments[1])=='undefined')?'':arguments[1];
		var Model=(typeof(arguments[2])=='undefined')?0:arguments[2];
		var addStr='',
			obj=$('body'),
			w=$(window);

		if(type=='parent'){//父框架元素
			obj=$(window.parent.document).find('body');
			w=$(window.parent.window);
		}

		if(obj.find('#attr_hide').val()){
			addStr=obj.find('#attr_hide').serialize()?obj.find('#attr_hide').serialize():obj.find('#attr_hide').val();
			addStr=Object(addStr);
		}
		$('#fixed_login_popup').show();
		if (Model) {
			$('#fixed_login_popup .signin_close').show();
		} else {
			$('#fixed_login_popup .signin_close').hide();
		}
		if (obj.find('form.register').length) {
			$('#fixed_login_popup .new_customer').hide();
		} else {
			$('#fixed_login_popup .new_customer').show();
		}
	},

	sign_up_init:function(){
		var frm_register=$('#signup form.register');
		frm_register.find('input[name=Birthday]').attr('readonly', 'readonly');
		frm_register.submit(function(){return false;});
		frm_register.find('button:submit').click(function(){
			var status=0;
			if(global_obj.check_form(frm_register.find('*[notnull]'), frm_register.find('*[format]'), 1, 1)){
				status+=1;
			}else status+=0;

			if(/^\w+[a-zA-Z0-9-.+_]+@[a-zA-Z0-9-.+_]+\.\w*$/.test($.trim($('#Email').val()))==false){
				$('#Email').next().show();
				status+=1;
			}else{
				$('#Email').next().hide();
				status+=0;
			}

			if($.trim($('#Password').val())!=$.trim($('#Password2').val())){
				$('#Password2').next().show();
				status+=1;
			}else{
				$('#Password2').next().hide();
				status+=0;
			}
			if(status) return false;
			$(this).attr('disabled', true);

			$.post('/', frm_register.serialize(), function(data){
				frm_register.find('button:submit').attr('disabled', false);
				if(data.ret!=1){
					$('#error_register_box').html(data.msg[0]).show();
					$("body, html").animate({scrollTop:$("#error_register_box").offset().top}, 500);
					if($('#Code').length){ //有验证码图片
						$('#Code').next().click();
					}
				}else{
					if (parseInt(ueeshop_config.FbPixelOpen) == 1 && typeof(fbq) !== 'undefined') {
						// When a sign up is completed, such as signup for trial.
						fbq("track", "Lead");
						fbq('track', 'CompleteRegistration', {
							value: '0.00',
							currency: 'USD'
						});
					}
					if (parseInt(ueeshop_config.pintrkPixelOpen) == 1 && typeof(pintrk) !== 'undefined') {
						// Track people who sign up for your product or service
						pintrk('track', 'signup', {
							lead_type: 'Registration'
						});
					}
					setTimeout(function(){window.location=data.msg[0]}, 1000);
				}
			}, 'json');
		});

		$('.amount').keydown(function(e){
			var value=$(this).val();
			var key=window.event?e.keyCode:e.which;
			if((key>95 && key<106) || (key>47 && key<60) || (key==109 && value.indexOf("-")<0) || (key==110 && value.indexOf(".")<0) || (key==190 && value.indexOf(".")<0)){
			}else if(key!=8){
				if(window.event){//IE
					e.returnValue=false;
				}else{//Firefox
					e.preventDefault();
				}
				return false;
			}
		});

		$('#send_email_btn').on('click', function(){
			$email=$.trim($(this).attr('email'));
			$uid=$(this).attr('uid');
			$.post('/', 'do_action=action.verification_mail&Email='+$email+'&UserId='+$uid, function(data){
				if(data.ret==1){
					alert(lang_obj.user.account.send_email_ture);
				}else{
					alert(lang_obj.user.account.send_email_false);
				}
			}, 'json');
		});

		frm_register.find('.verification_button').on('click', function() {
			$('.register_page').fadeIn('fast');
			if ($('#vcode_box').hasClass('use_vecode')) {
				imgver(1);
			} else {
				imgver();
			}
			var sxbtn = document.querySelector(".minbtn button");
			sxbtn.onclick = function(){
				imgver(1);
			}
		});
		$('.vcode_form').submit(function(){return false;});
		$('.register_page .vcode_box i').on('click', function(){
			$(this).parent().parent().fadeOut('fast');
		});
	},

	user_login_binding:function(){
		$('body').off().on('click', '#binding_close, #btn_cannel, #div_mask', function(){ //关闭
			if($('#binding_module').length && $('#binding_close').length){
				$('#binding_module').remove();
				global_obj.div_mask(1);
			}
		});

		var frm_binding=$('#binding_module form.login');
		frm_binding.submit(function(){return false;});
		frm_binding.find('button:submit').click(function(){
			if(global_obj.check_form(frm_binding.find('*[notnull]'), frm_binding.find('*[format]'), 0, 1)){return false;}
			$(this).attr('disabled', true);
			$.post('/', frm_binding.serialize()+'&do_action=user.user_oauth_binding', function(data){
				frm_binding.find('button:submit').attr('disabled', false);
				if(data.ret!=1){
					$('#error_login_box').html(data.msg[0]).show();
				}else{
					window.location=data.msg;
				}
			}, 'json');
		});
	},

	forgot_init:function (){
		var frm_register=$('#signup form.register');
		frm_register.submit(function(){return false;});
		frm_register.find('.fotgotbtn').click(function(){//发送忘记密码邮件
			if(global_obj.check_form(frm_register.find('*[notnull]'), frm_register.find('*[format]'), 1, 1)){
				status=1;
			}else status=0;

			if(/^\w+[a-zA-Z0-9-.+_]+@[a-zA-Z0-9-.+_]+\.\w*$/.test($('#Email').val())==false){
				$('#Email').next().show();
				status=1;
			}else{
				$('#Email').next().hide();
				status=0;
			}

			if(status==1) return false;
			$(this).attr('disabled', true);

			$.post('/account/', frm_register.serialize(), function(data){
				frm_register.find('.fotgotbtn').attr('disabled', false);
				if(data.ret!=1){
					$('#error_register_box').html(data.msg[0]).show();
				}else{
					window.location=data.msg[0];
				}
			}, 'json');
		});

		frm_register.find('.resetbtn').click(function(){//发送忘记密码邮件
			if(global_obj.check_form(frm_register.find('*[notnull]'), frm_register.find('*[format]'), 1, 1)){
				status=1;
			}else status=0;

			if($('#Password').val() && $('#Password2').val()){
				if($('#Password').val()!=$('#Password2').val()){
					$('#Password2').next().show();
					status=1;
				}else{
					$('#Password2').next().hide();
					status=0;
				}
			}else{
				status=1;
			}

			if(status==1) return false;
			$(this).attr('disabled', true);

			$.post('/account/', frm_register.serialize(), function(data){
				frm_register.find('.resetbtn').attr('disabled', false);
				if(data.ret!=1){
					$('#error_register_box').html(data.msg[0]).show();
				}else{
					window.location=data.msg[0];
				}
			}, 'json');
		});
	},
	/******************* 登录或注册 End *******************/

	/******************* 会员首页 Start *******************/
	user_index_init:function()
	{
		/*
		user_obj.edit_pay_init();
		$('.order_table .see_more').click(function(){
			if($(this).hasClass('cur')){
				$(this).removeClass('cur').parent().parent().parent().parent().find('.hide').hide();
			}else{
				$(this).addClass('cur').parent().parent().parent().parent().find('.hide').show();
			}
		});
		*/

		$(".user_products_menu a").click(function() {
			let index = $(this).index();
			$(this).addClass("current").siblings().removeClass("current");
			$(".user_products_container .box_pro:eq(" + index + ")").show().siblings().hide();
		});

		/*
		$('.user_get_coupons .get_it').click(function(){
			var	_this = $(this),
				CId = _this.attr('data-cid');
			$.post('/', 'do_action=user.get_user_coupons&CId='+CId, function(data){
				if(data.ret==1){
					global_obj.new_win_alert(data.msg,function(){
						_this.parent().remove();
					}, '', undefined, '', lang_obj.web.global.ok);
				}else{
					global_obj.new_win_alert(data.msg);
				}
			}, 'json');
		});

		$('.remove_newsletter').click(function(){
			var $email=$(this).attr('email');
			global_obj.new_win_alert(lang_obj.web.global.del_confirm, function(){
				$.post('/', 'do_action=user.cancel_newsletter&Email='+$email, function(data){
					if(data.ret==1){
						window.location.reload();
					}else{
						global_obj.new_win_alert(data.msg);
					}
				}, 'json');
			}, 'confirm');
		});
		*/

		if ($(".favorites_container .item").size() > 0) {
			$(".favorites_container").visualSrcoll({
				'speed': '500',
				'isTouch': 1,
				'number' : 0,
			});
		}
	},
	/******************* 会员首页 End *******************/

	order_init:function(){
		user_obj.edit_pay_init();
		$('.order_table .see_more').click(function(){
			if($(this).hasClass('cur')){
				$(this).removeClass('cur').parent().parent().parent().parent().find('.hide').hide();
			}else{
				$(this).addClass('cur').parent().parent().parent().parent().find('.hide').show();
			}
		});

		$(window).scroll(function(){
			var $footer = $('div[plugins=footer-0]').offset().top, //footer到顶的高度
				$this_height = $(this).scrollTop(),	//当前滚动的高度
				$w_heigth = $(this).height(),	//屏幕的高度
				$btn_height = $('.mobile_top_box .fixed_btn').outerHeight(true); //按钮的高度
			if($this_height + $w_heigth > $footer){
				$('.mobile_top_box .fixed_btn').addClass('static');
			}else{
				$('.mobile_top_box .fixed_btn').removeClass('static');
			}
		});

		$('#cancelForm').submit(function(){
			if(global_obj.check_form($(this).find('*[notnull]'))){
				return false;
			}else{
				var result=window.confirm(lang_obj.user.account.order_cancel);
				if(result){
					$.post('/?do_action=user.cancel_order', $('#cancelForm').serialize(), function(data){
						window.location.href='/account/orders/';
					});
				}
			}
			return false;
		});

		$('.confirm_receiving').click(function(){
			var _this = $(this);
			global_obj.new_win_alert(lang_obj.user.account.sure,function(){
				$.post('/?do_action=user.confirm_receiving', {OId:_this.attr('oid')}, function(data){
					window.location.reload();
				});
			},'confirm');
			return false;
		});
		/*
		$('.payment2btn').click(function(){
			if($('form[name=paypal_checkout_form]').length){ //Paypal支付方式
				$('#paypal_checkout_button').click();
			}else{
				window.open($(this).attr('href'));
			}
			return false;
		});
		*/
		if ($('#reply_form').length){
			$('#reply_form').submit(function(){
                if (global_obj.check_form($('#reply_form').find('*[notnull]'))) {
                    return false
                }
            });
			$('#lib_user_products .item .light_box_pic').lightBox();
			document.getElementById('View').scrollIntoView();
		}
	},

	coupon_init:function(){
		var maxWidth=0,
			coupon_item_size=function(){
			$('.cou_list .item').each(function(){
				$(this).find('.itl').width()>maxWidth && (maxWidth=$(this).find('.itl').width());
			});
			$('.cou_list .item').each(function(){
				$(this).find('.itl').css('width', maxWidth);
				$(this).find('.itr').css('width', $(this).outerWidth(true)-maxWidth-17-10);
			});
		};
		$(window).resize(function(){
			coupon_item_size();
		});
		coupon_item_size();
	},

	user_address:function(){
		$('.chzn-container-single .chzn-search').css('height', $('.chzn-container-single .chzn-search input').height());
		!address_perfect && user_obj.set_default_address(0);
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
		$('#country_chzn li.group-option').click(function(){	//Select Country
			var obj		= $('#country_chzn li.group-option').removeClass('result-selected').index($(this));
			var s_cid	= $('select[name=country_id]').val();
			$(this).addClass('result-selected').parent().parent().css({'left':'-9000px'}).parent().removeClass('chzn-container-active').children('a').removeClass('chzn-single-with-drop').find('span').text($(this).text()).parent().parent().prev().find('option').eq(obj+1).attr('selected', 'selected');
			var cid = $('select[name=country_id]').val(),
				stateJson = $('select[name=country_id]').data('state'),
				countryCodeJson = $('select[name=country_id]').data('code');
			(s_cid!=cid) && user_obj.get_state_from_country(cid, stateJson, countryCodeJson);	//change country
		});
		$('#zoneId').delegate('li.group-option', 'click', function(){
			var obj=$('#zoneId li.group-option').removeClass('result-selected').index($(this));
			$(this).addClass('result-selected').parent().parent().css({'left':'-9000px'}).parent().removeClass('chzn-container-active').children('a').removeClass('chzn-single-with-drop').find('span').text($(this).text()).parent().parent().prev().find('option').eq(obj+1).attr('selected', 'selected');
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
			$(input)
			.change(function(){
				var filter=$(this).val();
				if(filter){
					$matches=$(list).find('li:Contains(' + filter + ')');
					$('li', list).not($matches).removeClass('active-result');
					$matches.addClass('active-result');
				}else{
					$(list).find("li").addClass('active-result');
				}
				return false;
			})
			.keyup(function(){
				$(this).change();
			});
		}
		filterList("#country_chzn .chzn-search input", $("#country_chzn .chzn-results"));
		filterList("#zoneId .chzn-search input", $("#zoneId .chzn-results"));

		/*
		$('#save_address').on('click', function(){ //提交会员地址资料
			if(!check_form_address()){ return false; }
			$(this).attr('disabled', 'disabled');
			var obj=$('.user_address_form');
			var typeAddr=parseInt(obj.find('input[name=typeAddr]').val())==1?1:0;
			if(typeAddr==1){
				cart_obj.checkout_no_login();
			}else{
				$.post('/', obj.serialize()+'&do_action=user.addressbook_mod', function(data){
					if(data.ret==1){
						var $location=window.location.href;
						if($location.indexOf('/account/address/add.html')>0){
							window.top.location='/account/address/';
						}else{
							window.top.location.reload();
						}
					}
				}, 'json');
			}
			$(this).removeAttr('disabled');
			return false;
		});
		*/
		var address_rq_mark=true;
		$('.user_address_form').submit(function(){ return false; });
		if ($('.user_address_form').length) {
			$('.user_address_form #taxCodeValue').keyup(function(){
				var $type = $('#taxCodeOption').val();
				if ($('select[name="country_id"]').val() == 30) {
					if ($type==1) {
						$("#taxCodeValue").mask("000.000.000-00");
					} else {
						$("#taxCodeValue").mask("00.000.000/0000-00");
					}
				}
			});
			$('.user_address_form input[name="PhoneNumber"]').keyup(function(){
				if ($('select[name="country_id"]').val() == 30) {
					$('.user_address_form input[name="PhoneNumber"]').mask("(00) 0000-0000");
				}
			});
		}
		$('#save_address').on('click', function(){
			if(address_rq_mark && !$('#save_address').hasClass('disabled')){
				var $notnull=$('.user_address_form input[notnull], .user_address_form select[notnull]'),
					$TypeAddr=parseInt($('.user_address_form input[name=typeAddr]').val())==1?1:0,
					$errorObj={};
				$('#save_address').addClass('disabled');
				address_rq_mark=false;
				setTimeout(function(){
					var status=0;
					$notnull.each(function(){
						$errorObj=($(this).attr('name')=='PhoneNumber'?$(this).parent().parent().next('p.error'):$(this).parent().next('p.error'));
						if($.trim($(this).val())==''){
							if($(this).attr('name') == 'Province'){
								$(this).parent().find('.chzn-single').addClass('null');
							}else{
								$(this).addClass('null');
							}
							$errorObj.text(lang_obj.user.account.address_tips_PleaseEnter.replace('{Field}', $(this).attr('placeholder'))).show();
							status++;
							if(status==1){
								$('body,html').animate({scrollTop:$(this).offset().top-20}, 500);
							}
						}else{
							$(this).removeClass('null');
							$errorObj.hide();
						}
					});
					$('.user_address_form input[format][notnull]').each(function(){
						$errorObj=$(this).parent().next('p.error');
						$format=$(this).attr('format').split('|');
						if($format[0]=='Length' && $.trim($(this).val()).length<parseInt($format[1])){
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
					if(status){ //检查表单
						address_rq_mark=true;
						$('#save_address').removeClass('disabled');
						return false;
					}
					$.post('/', $('.user_address_form').serialize()+'&do_action=user.addressbook_mod', function(data){
						if(data.ret==1){
							var $location=window.location.href;
							if($location.indexOf('/account/address/add.html')>0){
								window.top.location='/account/address/';
							}else{
								window.top.location.reload();
							}
						}
					}, 'json');
					address_rq_mark=true;
					$('#save_address').removeClass('disabled');
				}, 100);
			}
			return false;
		});

		function set_tax_code_value(obj, v){
			maxlen=obj.val()==1?11:14;
			obj.next('input[name=tax_code_value]').attr('maxlength', maxlen);
			v==1 && obj.next('input[name=tax_code_value]').val('');
		}
		$('select[name=tax_code_type]').change(function(){set_tax_code_value($(this), 1);});
		set_tax_code_value($('select[name=tax_code_type]').not(':disabled'));

		$('select[name=country_id]').change(function(){ //使用谷歌浏览器的自动表单填写功能，出现country_id自动选择，相关联效果不能自动实现
			var name=$('select[name=country_id] option:selected').text(),
				cid=$('select[name=country_id]').val(),
				stateJson = $('select[name=country_id]').data('state'),
				countryCodeJson = $('select[name=country_id]').data('code');
			$('#country_chzn li.group-option').each(function(){
				if($(this).text()==name){
					$(this).click();
					user_obj.get_state_from_country(cid, stateJson, countryCodeJson); //已经自动选择国家选项，需要执行加载省份
				}
			});
		});
	},

	get_state_from_country:function(CId, stateJson, countryCodeJson){
		// 初始化
		stateJson = stateJson == undefined ? [] : stateJson;
		countryCodeJson = countryCodeJson == undefined ? [] : countryCodeJson;

		// 获取省份信息和国家代码
		var d = stateJson[CId] ? stateJson[CId] : -1,
		code = countryCodeJson[CId] ? countryCodeJson[CId] : '';

		if(d==-1){
			$('#zoneId').css({'display':'none'}).find('select').attr('disabled', 'disabled').removeAttr('notnull');
			$('#state').css({'display':'block'}).find('input').removeAttr('disabled').attr('notnull', 'notnull');
		}else{
			$('#zoneId').css({'display':'block'}).find('select').removeAttr('disabled').attr('notnull', '');
			$('#state').css({'display':'none'}).find('input').attr('disabled', 'disabled').removeAttr('notnull');
			str='';
			var vselect='<option value=""></option>';
			var vli='';
			for(i=0; i<d.length; i++){
				vselect+='<option value="'+d[i]['SId']+'">'+d[i]['States']+'</option>';
				vli+='<li class="group-option active-result">'+d[i]['States']+'</li>';
			}
			$('#zoneId select').html(vselect);
			$('#zoneId ul').html(vli);
			$('#zoneId .chzn-container a span').text(lang_obj.web.global.selected+'---');
		}
		$('#countryCode').val('+'+code);
		$('#phoneSample span').text(code);
		if(CId==30){
			$('#taxCode').css({'display':'block'}).find('select, input').removeAttr('disabled');
			$('#taxCode').find('input').attr('notnull', 'notnull');
			$('#tariffCode').css({'display':'none'}).find('select, input').attr('disabled', 'disabled');
			$('#tariffCode').find('input').removeAttr('notnull');
		}else if(CId==211){
			$('#tariffCode').css({'display':'block'}).find('select, input').removeAttr('disabled');
			$('#tariffCode').find('input').removeAttr('notnull');
			$('#taxCode').css({'display':'none'}).find('select, input').attr('disabled', 'disabled');
			$('#taxCode').find('input').removeAttr('notnull');
		}else{
			$('#taxCode').css({'display':'none'}).find('select, input').attr('disabled', 'disabled');
			$('#tariffCode').css({'display':'none'}).find('select, input').attr('disabled', 'disabled');
			$('#taxCode, #tariffCode').find('input').removeAttr('notnull');
		}
	},

	set_default_address:function(AId){
		$.ajax({
			url:"/",
			async:false,
			type:'post',
			data:{'do_action':'user.get_addressbook', 'AId':AId, 'Type':'user'},
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
						$('#country_chzn a span').text(data.msg.country.Country);
						$('#country_chzn ul.chzn-results li.group-option').eq(index).addClass('result-selected');
						user_obj.get_state_from_country(data.msg.address.CId, data.msg.stateAry, data.msg.countryCodeAry);
						if(data.msg.address.CId==30||data.msg.address.CId==211){
							$('select[name=tax_code_type]').find('option[value='+data.msg.address.CodeOption+']').attr('selected', 'selected');
							$('input[name=tax_code_value]').attr('maxlength', (data.msg.address.CodeOption==1?11:14)).val(data.msg.address.TaxCode);
						}

						if(data.msg.country.HasState==1){
							$('#zoneId div a span').text(data.msg.address.StateName);
							var sindex=$('select[name=Province]').find('option[value='+data.msg.address.SId+']').attr('selected', 'selected').index();
							$('#zoneId ul.chzn-results li.group-option').eq(sindex-1).addClass('result-selected');
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
						$('#country_chzn a span').text(data.msg.country.Country);
						$('#country_chzn ul.chzn-results li.group-option').eq(index).addClass('result-selected');
						user_obj.get_state_from_country(data.msg.country.CId, data.msg.stateAry, data.msg.countryCodeAry);
					}
				}else{
					global_obj.new_win_alert(data.msg.error);
				}

				$('.user_address_form .input_box_txt').each(function(){
					if($.trim($(this).val())!=''){
						$(this).parent().addClass('filled');
					}else{
						$(this).parent().removeClass('filled');
					}
				});
			}
		});
	},

	address_init:function(){
		$('.address_menu .menu_title li').click(function(){
			var $obj = $(this);
			if(!$(this).hasClass('add') && $('#addressForm').css('display')=='none'){
				$('.address_menu .menu_title li a').removeClass('current').removeClass('FontBorderColor');
				$(this).find('a').addClass('current').addClass('FontBorderColor');
				$('.address_menu .menu_content .menu').eq($(this).index()).removeClass('hide').siblings().addClass('hide');
				if($(this).hasClass('shipping')){
					$(this).parent().find('.add').show();
				}else{
					$(this).parent().find('.add').hide();
				}
			}else if(!$(this).hasClass('add')){
				$('#cancel_address').click();
				setTimeout(function(){
					$obj.click();
				},200);
			}
		});
		$('#cancel_address').click(function(){
			$('#addressForm').slideUp('fast', function(){
				$('.address_menu .menu_content').slideDown('fast');
			});
			$('#lib_user_address').removeClass('show_ship_addr').removeClass('show_bill_addr').removeClass('ship_detail');
			return false;
		});
		$('.address_list .options a[name=edit]').click(function(){
			var addrId=$(this).data('addrid'),
				type = $(this).parents('.address_list').hasClass('shipping_addr') ? 1 : 0;
			if(type == 1){
				$('#lib_user_address').addClass('show_ship_addr').addClass('ship_detail');
			}else{
				$('#lib_user_address').addClass('show_bill_addr').addClass('ship_detail');
			}
			$('#addressForm .errorInfo').html('');
			user_obj.set_default_address(addrId);
			$('.address_menu .menu_content').slideUp('fast',function(){
				$('#addressForm').slideDown('fast');
			});
			return false;
		});
		$('.address_list .options a[name=del]').click(function(){
			return window.confirm(lang_obj.user.account.delete_shipping);
		});
		$('.address_menu .menu_title li.add').click(function(){
			$('#addressForm .errorInfo').html('');
			user_obj.set_default_address(0);
			$('.address_menu .menu_content').slideUp('fast',function(){
				$('#addressForm').slideDown('fast');
			});
			return false;
		});
		// $('.address_list .options a[name=default]').click(function(){
		// 	$.post('/account/', 'do_action=user.addressbook_selected&AId='+$(this).data('addrid'), function(data){
		// 		if(data.ret==1){
		// 			window.location.reload();
		// 		}
		// 	}, 'json');
		// });

		$('#lib_user_address .add_item').click(function(){
			var $obj = $(this),
				addrid = $obj.find('a[name=default]').attr('data-addrid');
				if(!addrid){ return false; }
			$.post('/account/', 'do_action=user.addressbook_selected&AId='+addrid, function(data){
				if(data.ret==1){
					window.location.reload();
				}
			}, 'json');
		});
	},

	inbox_init:function(){
		$('body').on('click', '.inbox_full', function(){
			//收件箱事件
			var $Obj=$('.inbox_full');
			if($Obj.find('.unread_message').is(':visible')){
				$Obj.find('.unread_message').hide();
				$Obj.find('.message_dialogue, .message_bottom').show();
				$Obj.find('.message_dialogue_list').html(''); //清空对话栏
				$('.menu_products_list .item:eq(0)').click();
			}
		}).on('click', '.menu_products_list .item', function(){
			//右侧栏目
			var $This=$(this),
				$Obj=$('.inbox_left');
			$This.addClass('current').siblings().removeClass('current');
			if($Obj.find('.unread_message').is(':visible')){
				$Obj.find('.unread_message').hide();
				$Obj.find('.message_dialogue, .message_bottom').show();
			}
			$Obj.find('.message_dialogue_list').html(''); //清空对话栏
			$.post('?', {'do_action':'user.inbox_view'}, function(data){
				if(data.ret==1){
					var $Html='';
					for(k in data.msg.Reply){
						$Html+= '<div class="box_item">';
						$Html+= '	<div class="date">'+data.msg.Reply[k].Time+'</div>';
						$Html+=	'	<div class="clear"></div>';
						$Html+=	'	<div class="dialogue_box clean ' + (data.msg.Reply[k].UserType == 'manager' ? 'dialogue_box_left' : 'dialogue_box_right') + '">';
						$Html+=			'<div class="time"><span class="name">'+ data.msg.Reply[k].Name +'</span>&nbsp;&nbsp;&nbsp;</div>';
						$Html+=			'<div class="message">'+data.msg.Reply[k].Content.replace(/\r\n/g, '<br />');
						$Html+=			'<div class="clear"></div>';
						if(data.msg.Reply[k].PicPath){
							$Html+=			'<div class="picture"><a href="'+data.msg.Reply[k].PicPath+'" target="_blank" class="pic_box"><img src="'+data.msg.Reply[k].PicPath+'" /><span></span></a></div>';
						}
						$Html+=			'</div>';
						$Html+=	'	</div>';
						$Html+=	'	<div class="clear"></div>';
						$Html+=	'</div>';
						$Html+=	'<div class="clear"></div>';
					}
					$Obj.find('.message_dialogue_list').append($Html);
					$Obj.find('.message_dialogue_list .dialogue_box').size() && $Obj.find('.message_dialogue').animate({scrollTop:$Obj.find('.message_dialogue_list .dialogue_box:last').offset().top}, 10); //自动滚动到最后一个消息
					$This.find('i').hide();

					if ($('#lib_user_menu .inbox b').length) {
						$('#lib_user_menu .inbox b').remove();
					}
					if ($('.headerWrapper .inbox b').length) {
						$('.headerWrapper .inbox b').remove();
					}

				}
			}, 'json');
			return false;
		}).on('click', '.menu_products_list .btn_more', function(){
			//加载更多
			$('.inbox_full').click();
		}).on('submit', '#reply_form', function(){
			//站内信消息提交回复
			var $Stop=0;
			$('#reply_form *[notnull]').each(function(){
				if($.trim($(this).val())==''){
					$(this).addClass('null');
					$Stop+=1;
				}else{
					$(this).removeClass('null');
				}
			});
			if($Stop>0){
				return false;
			}
		});
		$('#reply_form textarea[name=Content]').on('keyup',function(){
			var $obj = $(this);
			$obj.removeClass('null');
		});

		$(window).scroll(function(){
			if($(this).width() > 1000){ return false; }
			var w_h = $(this).height(),
				w_s = $(this).scrollTop(),
				w_r = $('#reply_form').offset().top,
				w_f = $('div[plugins="footer-0"]').offset().top;
			if(w_r > w_f){
				$('#reply_form').css({'opacity':0,'pointer-events':'none'});
			}else if(w_f > w_r){
				$('#reply_form').css({'opacity':1,'pointer-events':'auto'});
			}
		});

		//默认触发
		$('.inbox_full').click();
	},

	edit_pay_init:function(){
		console.log('edit_pay_init');
		//编辑支付方式
		$('.edit_pay_btn').click(function(){
			if($(this).attr('disabled')) return false;
			$(this).blur().attr('disabled', 'disabled');
			var $OId=$(this).attr('oid');
			$.ajax({
				type: "POST",
				url: "/?do_action=cart.get_payment_methods",
				dataType: "json",
				data:{'OId':$OId},
				success: function(data){
					if (data.ret == 1) {
						var c = data.msg.info,
							defaultPId = 0,
							payment_list = '',
							pay_content = '',
							feePrice = 0,
							total = data.msg.total_price,
							//PId = parseInt($('.edit_pay_btn').attr('pid')),
                            PId = data.msg.PId,
							total = parseFloat(total.replace(data.msg.currency_symbols, '', total)),
                            isShippingInfo = parseInt(data.msg.IsShippingInfo);
						for(i = 0; i < c.length; i++){
							if (PId == c[i].PId) defaultPId = c[i].PId;
							var s = defaultPId == c[i].PId ? 'checked="checked"' : '';
							var i_feePrice = $('html').FloatPrice(total * (c[i].AdditionalFee / 100) + parseFloat(c[i].AffixPrice));
							var w = defaultPId == c[i].PId ? '' : 'style="display:none;"';
							defaultPId == c[i].PId && (feePrice=$('html').FloatPrice(total*(c[i].AdditionalFee/100)+parseFloat(c[i].AffixPrice)));	//付款手续费
							payment_list +='<div class="item">';
								payment_list +='<div class="item_info">';
									payment_list +='<input type="radio" name="PId" value="'+c[i].PId+'" fee="'+c[i].AdditionalFee+'" affix="'+c[i].AffixPrice+'" method="'+c[i].Method+'" data-showtype="'+c[i].ShowType+'" '+s+' />';
									if(c[i].ShowType==1 && data.msg.CreditCardNum==1){  //非多条信用卡
										payment_list +='<span class="txt_box">'+c[i].Name+'</span>';
									}else{
										payment_list +='<span class="pic_box"><img src="'+c[i].LogoPath+'" /><span></span></span>';
									}
									if (i_feePrice > 0) payment_list += ' ( +'+data.msg.currency_symbols+$('html').currencyFormat(i_feePrice, data.msg.currency)+' )';
									if(c[i].ShowType==1){  //信用卡
										payment_list +='<div class="img_table"><div class="img_box">';
										for(var key in c[i].Card){
											payment_list +='<img src="/static/themes/default/images/payment/icon_'+c[i].Card[key]+'.png" />';
										}
										payment_list +='</div></div>';
									}
									payment_list +='<div class="clear"></div>';
								payment_list +='</div>';
								if(c[i].ShowType==1 && data.msg.CreditCardNum==1 && data.msg.CreditCardType == 0){  //非多条信用卡
									var PaymentPId=c[i].PId;
									payment_list +='<div id="item_desc_'+PaymentPId+'" class="item_desc" '+w+'></div>';
									$.post('/?do_action=cart.get_credit_card_info', {PId:PaymentPId}, function(card_data){
										$('#item_desc_'+PaymentPId).html(card_data);
									});
								}else if(c[i].ShowType==2){  //本地
									payment_list +='<div class="item_desc">'+c[i].Description+'</div>';
								}
							payment_list +='</div>';


						}
						var pay_html='<div id="alert_choose" class="alert_choose">';
						pay_html += '<div class="box_bg themes_popups"></div><a class="noCtrTrack BuyNowBgColor" id="choose_close">×</a>';
						pay_html += '<div class="choose_content themes_popups"><form name="pay_edit_form" method="POST" action="">';
						pay_html +=     '<h2>'+lang_obj.products.goods.checkout+'</h2>';
						pay_html +=		'<div class="payment_list">';
						pay_html +=     	'<h3>'+lang_obj.user.account.paymentMethod+': </h3>';
						pay_html +=			payment_list;
						pay_html +=		'</div>';
						pay_html +=     '<p class="footRegion">';
						pay_html +=         '<input class="btn BuyNowBgColor" id="pay_button" type="submit" value="'+lang_obj.checkout.global.pay_now+'" />';
						pay_html +=         '<span id="paypal_button_container"></span>';
						pay_html +=         '<span class="choose_price">'+lang_obj.user.account.order_total+': <span>'+data.msg.currency_symbols+$('html').currencyFormat($('html').FloatPrice(total+feePrice), data.msg.currency)+'</span></span>';
						pay_html +=     '</p>';
                        pay_html +=     '<input type="hidden" name="TotalPrice" value="'+total+'" />';
                        pay_html +=     '<input type="hidden" name="Symbols" value="'+data.msg.currency_symbols+'" />';
                        pay_html +=     '<input type="hidden" name="Currency" value="'+data.msg.currency+'" />';
                        pay_html +=     '<input type="hidden" name="FeePrice" value="'+data.msg.fee_price+'" />';
                        pay_html +=     '<input type="hidden" name="OldPId" value="'+data.msg.PId+'" />';
                        pay_html +=     '<input type="hidden" name="OId" value="'+$OId+'" /></form></div>';
						pay_html += '</div>';

						$('#alert_choose').length && $('#alert_choose').remove();
						$('body').prepend(pay_html);
						$('#alert_choose').css({left:$(window).width()/2-280, top:'20%'});
						global_obj.div_mask();

						//提交编辑支付方式
						$('form[name=pay_edit_form]').submit(function(){ return false; });
						$('#pay_button').click(function(){
							var obj 	= $('form[name=pay_edit_form]'),
								OId		= $('input[name=OId]').val();
								$this	= $(this);
							$this.attr('disabled', 'disabled').blur();
							if($('form[name=pay_edit_form] input[name=PId]:radio:checked').data('showtype')==1 && typeof(check_creditcard_info) === "function"){  //检查信用卡支付并且存在信用卡检测函数
								$tips=check_creditcard_info();
								if($tips){  //有错误信息
									alert($tips);
									$this.attr('disabled', false).blur();
									return false;
								}
							}
							$.post('/?do_action=cart.orders_payment_update', obj.serialize(), function(data){
								if (data.msg == 1) {
									window.location.href = '/cart/complete/'+OId+'/checkout.html';
								} else {
									window.location.href = '/cart/complete/'+OId+'.html';
								}
							}, 'json');
							return false;
						});

                        //新版Paypal支付
						if (data.msg.NewFunVersion >= 4) {
                            isShippingInfo == 1 && user_obj.paypal_init($OId); //当如果丢失快递信息，需要跳转到complete页面重新确认快递方式
						}

						//重新触发一次点击效果，主要是为了显示Paypal按钮
						$('form[name=pay_edit_form] input[name=PId]:checked').change();
					}else{
						global_obj.new_win_alert(lang_obj.products.goods.sign_in, function(){window.top.location='/account/login.html';});
					}
				}
			});
			return false;
		});

		//关闭编辑支付方式
		$('body').on('click', '#choose_close, #div_mask, #exback_button', function(){
			if($('#alert_choose').length){
				$('#alert_choose').remove();
				global_obj.div_mask(1);
				$('.edit_pay_btn').removeAttr('disabled');
			}
		});

		//选择支付方式
		$('body').on('click', 'form[name=pay_edit_form] .payment_list .item', function(e){
			var radio = $(this).find('input[name=PId]');
            if ($(e.target).attr('type') == 'radio' && $(e.target).attr('name') == 'PId') {
                //点击单选按钮
			} else {
                //点击付款选项
			    if (radio.attr('checked') == 'checked') return false;
			    radio.attr('checked', true).trigger('change');
            }
		});
		$('body').on('change', 'form[name=pay_edit_form] input[name=PId]', function(){
			var PId=$(this).val(),
				Fee=parseFloat($(this).attr('fee')),
				Affix=parseFloat($(this).attr('affix')),
				Method=$(this).attr('method'),
				currency=$('form[name=pay_edit_form] input[name=Currency]').val();
				total_price=parseFloat($('form[name=pay_edit_form] input[name=TotalPrice]').val());
                OldPId=$('form[name=pay_edit_form] input[name=OldPId]').val();
                fee=$('form[name=pay_edit_form] input[name=FeePrice]').val();
				feePrice=$('html').FloatPrice(total_price*(Fee/100)+Affix);	//付款手续费

            if(OldPId==PId){
                //付款方式没变，固定手续费
                feePrice=$('html').FloatPrice(fee);
            }
			$('.choose_price>span').text($('form[name=pay_edit_form] input[name=Symbols]').val()+$('html').currencyFormat($('html').FloatPrice(total_price+feePrice), currency));

			//详细信息显示与异常
			$('form[name=pay_edit_form] .item_desc').slideUp();
			$('form[name=pay_edit_form] input[name=PId]:radio:checked').parent().next('.item_desc').slideDown();

			//付款按钮显示判断
            if (Method == 'Paypal' && $('#paypal_button_container').hasClass('NewFunVersion')) {
                //显示Paypal按钮
                $('#paypal_button_container').show();
                $('#pay_button').hide();
            } else {
                //隐藏
                $('#pay_button').show();
                $('#paypal_button_container').hide();
            }
		});
	},

    paypal_init:function(OId){
		if (typeof(paypal) === 'undefined' || typeof(paypal.FUNDING) === 'undefined') return false;
        $('#paypal_button_container').addClass('NewFunVersion').loading();
        $('.loading_msg').css('top', 5);
		//Orders API v2
		$('#paypal_button_container').unloading();
		ueeshop_config.Funding = '';
		if (ueeshop_config.currency == 'EUR' && ueeshop_config.PaypalLoaclPayment) {
			ueeshop_config.Funding = {'allowed':eval('[paypal.FUNDING.CREDIT,' + ueeshop_config.PaypalLoaclPayment + ']')};
		} else {
			ueeshop_config.Funding = {'allowed':eval('[paypal.FUNDING.CREDIT]')};
		}
		if ($('#paypal_button_container').length) {
			paypal.Buttons({
				env: ueeshop_config.PaypalENV, // sandbox | production
				commit: true,
				locale: (ueeshop_config.PaypalLanguage == 0 ? "en_US" : ""),
				style: { layout:'horizontal', size:'medium', shape:'rect', tagline:false },
				funding: ueeshop_config.Funding,
				createOrder: function(data, actions) {
					return fetch('/?do_action=cart.paypal_payment_create_log&OId=' + OId, {
						method: 'POST',
						credentials: 'include'
					}).then(function(res) {
						//检测弹窗状态
						return res.json();
					}).then(function(data) {
						//返回信息
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
								$('#paypal_button_container').find('.paypal-button').show();
								$('#paypal_button_container').unloading();
							}, 'alert', 0);
							$('.new_win_alert').css('z-index', 100001);
							return false;
						} else {
							return data.id;
						}
					});
				},
				onApprove: function(data, actions) {
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
					$.post('/?do_action=cart.paypal_payment_cancel_log&orderID=' + data.orderID + '&paymentID=' + data.paymentID + '&OId=' + OId, data);
				},
				onError: function (err) {
					// Show an error page here, when an error occurs
					$.post('/?do_action=cart.paypal_payment_error_log', {OId:OId, Error:err.message});
				}
			}).render('#paypal_button_container');
		}
    },

	//公共
	user_init:function(){

		//对左侧菜单栏下拉的高度进行赋值
		if($('.lib_user_menu .box_menu>li.cur').size() && $('.lib_user_menu .box_menu>li.cur .drop_list').length > 0){
			var height = $('.lib_user_menu .box_menu>li.cur').find('.drop_height').height();
			$('.lib_user_menu .box_menu>li.cur').find('.drop_list').height(height);
		}

		//点击左侧菜单栏下拉
		$('.lib_user_menu .box_menu>li>i').on('click', function(){
			var $this = $(this),
				$Obj = $this.parents('li'),
				cur = $Obj.hasClass('cur') ? 1 : 0,
				height = $Obj.find('.drop_height').height();
			if(cur){
				$Obj.removeClass('cur').find('.drop_list').height(0);
				$Obj.find($('i')).removeClass('icon-mb_cut1').addClass('icon-mb_add1');
			}else{
				$Obj.addClass('cur').find('.drop_list').height(height);
				$Obj.find($('i')).addClass('icon-mb_cut1').removeClass('icon-mb_add1');
			}
		})

	},


};
