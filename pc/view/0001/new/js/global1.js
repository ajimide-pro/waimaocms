

//初始化统计函数
var analytics_click_statistics = function(obj){return false};
//前端显示方式(0:自适应 1:窄屏 2:宽屏)
$.fn.webDisplay=function(type){
	if(type==0){
		if($(window).width()>=1280){$('body').addClass('w_1200');}
		if($(window).width()>=1500){$('body').addClass('w_1440');}
		if($(window).width()>=1700){$('body').addClass('w_1680');}
		$(window).resize(function(){
			if($(window).width()>=1280){
				$('body').addClass('w_1200');
			}else{
				$('body').removeClass('w_1200');
			}
			if($(window).width()>=1500){
				$('body').addClass('w_1440');
			}else{
				$('body').removeClass('w_1440');
			}
			if($(window).width()>=1700){
				$('body').addClass('w_1680');
			}else{
				$('body').removeClass('w_1680');
			}
		});
	}else if(type==2){
		$('body').addClass('w_1200');
	}
};

//loading加载效果
$.fn.loading=function(e){
	e=$.extend({opacity:.5,size:"big"},e);
	$(this).each(function(){
		if($(this).hasClass("masked")) return;
		var obj=$(this);
		var l=$('<div class="loading"></div>').css("opacity", 0);
		obj.addClass("masked").append(l);
		//var lb=$('<div class="loading_msg loading_big"></div>').appendTo(obj);
		var lb=$('<div class="loading_msg loading_'+e.size+'"></div>').appendTo(obj);
		lb.css({
			top: obj.height() / 2 - (lb.height() + parseInt(lb.css("padding-top")) + parseInt(lb.css("padding-bottom"))) / 2,
			left: obj.width() / 2 - (lb.width() + parseInt(lb.css("padding-left")) + parseInt(lb.css("padding-right"))) / 2
		});
	});
	return this;
};
//取消loading加载效果
$.fn.unloading=function(){
	$(this).each(function(){
		$(this).find(".loading_msg, .loading").remove();
		$(this).removeClass("masked");
	});
};

//滚动插件
$.fn.carousel=function(e){
	e=$.extend({itemsPerMove:2,duration:1e3,vertical:!1,specification:"",width:0,height:0,step:1,preCtrEntity:"pre_arrow",nextCtrEntity:"next_arrow"},e);
	var t=this,
		n=t.find(".viewport"),
		r=n.find(".list"),
		i,s,o,u,a,f=!1,
		l={
			init:function(){
				var oFirst=r.children(":first"),
					oLast=r.children(":last"),
					l,c,list_len=r.children().length;

				if(e.vertical){	//判断滚动方式
					l=Math.max(oFirst.outerHeight(!0), oLast.outerHeight(!0));
					i=l*e.itemsPerMove;
					c=oFirst.outerHeight(!0)-oFirst.outerHeight();
					t.addClass("vertical").css({height:e.height||i-c, width:e.width||oFirst.outerWidth(!0)});
					r.height(l*list_len);
					if(l*list_len>(e.height || i-c)){
						s={scrollTop:"-="+i};
						o={scrollTop:i};
						u={scrollTop:"-="+i*e.step};
						a={scrollTop:i*e.step};
						this.bind_event();
					}
				}else{
					l=Math.max(oFirst.outerWidth(!0), oLast.outerWidth(!0));
					i=l*e.itemsPerMove;
					c=oFirst.outerWidth(!0)-oFirst.outerWidth();
					t.addClass("horizontal").css({height:e.height||oFirst.outerHeight(!0), width:e.width||i-c});
					r.width(l*list_len);
					if(l*list_len>(e.width || i-c)){
						s={scrollLeft:"-="+i};
						o={scrollLeft:"+="+i};
						u={scrollLeft:"-="+i*e.step};
						a={scrollLeft:i*e.step};
						this.bind_event();
					}
				}
			},
			step_prev:function(t){
				if(f) return;f=!0;
				for(var o=0;o<e.itemsPerMove;o++)r.prepend(r.children(":last"));
				n[e.vertical?"scrollTop":"scrollLeft"](i).stop().animate(s,{
					duration:e.duration,
					complete:function(){
						l.current(0);
						t-=1;
						f=!1;
						t>0 && l.step_prev(t);
					}
				});
			},
			step_next:function(t){
				if(f) return;
				f=!0;
				n.stop().animate(o, {
					duration:e.duration,
					complete:function(){
						l.current(1);
						l.repeatRun(function(){
							r.children(":last").after(r.children(":first"))
						}, e.itemsPerMove);
						e.vertical?n.scrollTop(0):n.scrollLeft(0);
						t-=1;
						f=!1;
						t>0 && l.step_next(t);
					}
				})
			},
			moveSlide:function(t){
				t==="next"?this.step_next(e.step):this.step_prev(e.step)
			},
			repeatRun:function(e,t){
				for(var n=0; n<t; n++) e()
			},
			bind_event:function(){
				t.find(".btn").on("click", function(e){
					l.moveSlide($(this).hasClass("prev")?"prev":"next")
				});
			},
			current:function(t){
				var b=r.find("li.current");
				t?b.next().addClass('current').siblings().removeClass('current'):b.prev().addClass('current').siblings().removeClass('current');
				b=r.find("li.current");
				$(".detail_pic .big_box").attr("href", $('#shopbox_outer').length?'javascript:;':b.find("img").attr("mask"));
				$(".detail_pic .normal").attr("src", b.find("img").attr("normal"));

				if(b.attr('pos')=='video'){ //视频
					$(".detail_pic .big_box").hide();
					$(".detail_pic .video_container").show();
				}else{ //图片
					$(".detail_pic .big_box").show().attr("href", $('#shopbox_outer').length?'javascript:;':b.find("img").attr("mask"));
					$(".detail_pic .normal").attr("src", b.find("img").attr("normal"));
					$(".detail_pic .video_container").hide().find('.ytp-chrome-bottom .ytp-play-button').click();
				}
			}
		};
	l.init();
};

//倒计时插件
$.fn.genTimer=function(e){
	function u(e){
		var t=Math.floor(e/n),
			r=Math.floor((e-t*n)/36e5),
			i=Math.floor((e-t*n-r*1e3*60*60)/6e4),
			s=Math.floor((e-t*n-r*1e3*60*60-i*1e3*60)/1e3);
		return {hours:("0"+r).slice(-2), minutes:("0"+i).slice(-2), seconds:("0"+s).slice(-2), dates:t}
	}

	var t={
			beginTime:new Date,
			day_label:(ueeshop_config.language_pack=='zh_tw'?"天":"day"),
			days_label:(ueeshop_config.language_pack=='zh_tw'?"天":"days"),
			unitWord:{hours:":", minutes:":", seconds:""},
			day_unitWord:'',
			type:"day",
			callbackOnlyDatas:!1
		},
		n=864e5,
		r=$.extend({}, t, e),
		i=this;

	r.targetTime=r.targetTime.replace(/\-/g, "/");
	var s=new Date(r.targetTime)-new Date(r.beginTime),
	o=function(){
		if(s<0){
			r.callback.call(i, r.callbackOnlyDatas ? {hours:"00", minutes:"00", seconds:"00",dates:0}: "00"+r.unitWord.hours+"00"+r.unitWord.minutes+"00");
			clearInterval(i.interval);
		}else{
			var e=u(s);
			if(r.callbackOnlyDatas) r.callback.call(i, e);
			else if(r.type=="day") s>=n*2 ? r.callback.call(i, '<span class="day_count">'+e.dates+(r.day_unitWord?r.day_unitWord:'')+'</span><span class="day">'+r.days_label+'</span><span class="day_seconds">'+e.hours+r.unitWord.hours+e.minutes+r.unitWord.minutes+e.seconds+r.unitWord.seconds+"</span>") : s>=n ? r.callback.call(i, '<span class="day_count">'+e.dates+'</span><span class="day">'+r.day_label+'</span><span class="day_seconds">'+e.hours+r.unitWord.hours+e.minutes+r.unitWord.minutes+e.seconds+r.unitWord.seconds+"</span>") : r.callback.call(i, '<span class="seconds">'+e.hours+r.unitWord.hours+e.minutes+r.unitWord.minutes+e.seconds+r.unitWord.seconds+"</span>");
			else if(r.type=="diffNoDay"){
				var t=e.hours;
				s>=n && (t=Number(e.dates*24)+Number(e.hours));
				r.callback.call(i, '<span class="hours">'+t+'</span><span class="miniutes">'+r.unitWord.hours+e.minutes+'</span><span class="senconds">'+r.unitWord.minutes+e.seconds+r.unitWord.seconds+"</span>");
			}else if(r.type=="day_separate"){
				var day_str='';
				if(s>=n*2){
					day_str=r.days_label;
				}else{
					day_str=r.day_label;
				}
				if(e.dates < 10) e.dates = '0'+e.dates;
				r.callback.call(i, (s>=n ? '<span class="day_count"><span class="d">'+String(e.dates).substr(0,1)+'</span><span class="d">'+String(e.dates).substr(1,1)+'</span>'+(e.dates>99 ? '<span class="d">'+String(e.dates).substr(2,1)+'</span>' : '')+'</span><span class="day">'+day_str+'</span>' : '' )+'<span class="day_seconds">'+'<span class="t">'+e.hours.substr(0,1)+'</span><span class="t">'+e.hours.substr(1,1)+'</span><span class="s">'+r.unitWord.hours+'</span><span class="t">'+e.minutes.substr(0,1)+'</span><span class="t">'+e.minutes.substr(1,1)+'</span><span class="s">'+r.unitWord.minutes+'</span><span class="t">'+e.seconds.substr(0,1)+'</span><span class="t">'+e.seconds.substr(1,1)+'</span><span class="s">'+r.unitWord.seconds+'</span></span>');
			}else{
				var t=e.hours;
				s>=n && (t=Number(e.dates*24)+Number(e.hours));
				r.callback.call(i, '<span class="seconds">'+t+r.unitWord.hours+e.minutes+r.unitWord.minutes+e.seconds+r.unitWord.seconds+"</span>");
			}
		}
		s-=1e3
	};
	i.interval=setInterval(o, 1e3);
	if (typeof(seckill_timer)=='object'){
		seckill_timer.push(i.interval);//秒杀页面计时器ID，防止时间乱跳
	}
	o();
	return this
};

//分享插件
$.fn.shareThis=function(type, title, url){
	var image=back_url=encode_url="";
	if(url==undefined){
		url=window.location.href;
	}
	if(url.indexOf("#")>0){
		url=url.substring(0, url.indexOf("#"));
	}
	if(type=="pinterest"){
		image=$(".big_box .big_pic>img").attr("src");
		if(image=='' || image==undefined){image=$(".detail_left .thumb_big li:eq(0) img").attr("src");}

		//没有产品主图 用logo代替
		if(image=='' || image==undefined){image = $('#header .logo img').attr('src');}
		if(image.indexOf('ly200-cdn.com')==-1){image=window.location.protocol+'//'+window.location.host+image;}
	}
	if(image!="" && image!=undefined){image=encodeURIComponent(image);}
	e_url=encodeURIComponent(url);
	title=encodeURIComponent(title);
	switch(type){
		case "delicious":
			back_url = '';
			break;

	}
	window.open(back_url, "bookmarkWindow");
};

$.fn.FloatPrice=function(price){ //处理价格 放大1000倍向下取整 返回两位小数
	var result=0;
	// result=(Math.floor(parseFloat(price)*1000)/1000).toFixed(2);
	result=parseFloat(parseFloat(price).toFixed(8).match(/^\d+(?:\.\d{0,2})?/));
	return parseFloat(result);
};

//关闭产品详细弹出框，this:#shopbox
$.fn.shopboxHide=function(){
	var obj=$(this);
	if(obj.length){
		//obj.find('.shopbox_wrap').animate({opacity:0}, {
		obj.animate({opacity:0}, {
			duration: 250,
			easing: 'swing',
			complete: function(){
				obj.parents('body').removeClass('hidden').css('margin-right', 0);
				obj.find('.shopbox_frame').hide().attr('src', '//about:blank').end().empty();
				global_obj.div_mask(1);
				obj.remove();
			}
		});
	}
};

//检查登录状态
$.fn.checkUser=function(){
	$.post('/?do_action=user.check_user&t='+Math.random(), '', function(data){
		if(data.ret==1){
			ueeshop_config['UserId']=data.msg['UserId']; //更新登录状态
		}
	}, 'json');
};

//购买流程，弹出会员登录框或者访客继续付款
$.fn.loginOrVisitors=function(url, type, cancelback){
	var comeback=(typeof(arguments[3])=='undefined')?'':arguments[3];//登录成功后执行函数
	var obj=$(this);
	if(ueeshop_config['TouristsShopping']==0 && ueeshop_config['UserId']==0/* && global_obj.getCookie('loginOrVisitors')!='ok'*/){
		user_obj.set_form_sign_in('', url, type);
		user_obj.sign_in_init(cancelback);
		$('form[name=signin_form] input[name="comeback"]').val(comeback);
		//global_obj.setCookie('loginOrVisitors', 'ok', 86400);
	}else{
		if(type==1) window.location.href=url;
		return false;
	}
};

//支付加载效果
$.fn.payLoadingEffect = function($Type) {
	let $Html = "";
	let $WinWidth = $(window).width();
	let $BoxWidth = 0;
	if ($Type == 1) {
		//显示
		if ($("#payment_ready").length) {
			$("#payment_ready").remove();
		}
		$Html += '<div id="payment_ready" class="themes_popups">';
		$Html += '	<div class="load">';
		$Html += '		<div class="load_payment"><div class="load_image"></div><div class="load_loader"></div></div>';
		$Html += '	</div>';
		$Html += '	<div class="info">';
		$Html += '		<p>' + lang_obj.checkout.checkout.tips_pay_loading_0 + '</p><p>' + lang_obj.checkout.checkout.tips_pay_loading_1 + '</p>';
		$Html += '	</div>';
		$Html += '</div>';
		$("body").append($Html);
		global_obj.div_mask();
		$BoxWidth = $("#payment_ready").outerWidth();
		$("#payment_ready").css({'left':($WinWidth / 2 - $BoxWidth / 2)});
	} else {
		//隐藏
		global_obj.div_mask(1);
		$("#payment_ready").remove();
	}
};

//图片lightbox效果(移动端)
$.fn.show_image=function(){
	if ($(window).width() > 768) return false;
	var size=0;
	var index=$(this).index();
	var html='';
	html+='<div id="global_show_image"><div class="global_show_img_container"><ul>';
	$(this).parent().find('a').each(function(){
		html+='<li><img src="'+$(this).attr('href')+'"/><span></span></li>';
		size++;
	});
	html+='</ul></div></div>';
	$('body').prepend(html);
	$('#global_show_image').css({'width':'100%','height':'100%','z-index':'10001','position':'fixed'});
	$('#global_show_image .global_show_img_container').css({'width':'90%','height':'90%','margin':'5%','position':'relative','overflow':'hidden'});
	$('#global_show_image ul').css({'width':(100*size)+'%','height':'100%','position':'absolute','left':'-'+(100*index)+'%','top':'0'});
	var li_width=(100/size);
	$('#global_show_image ul li').css({'width':li_width+'%','height':'100%','float':'left','text-align':'center','background':'url(/static/themes/default/mobile/images/loading.gif) center no-repeat','background-size':'20px'});
	$('#global_show_image ul li img').css({'vertical-align':'middle', 'background-color':'#fff'});
	$('#global_show_image ul li span').css({'height':'100%','display':'inline-block','vertical-align':'middle'});
	global_obj.div_mask();
	if(size>1){
		var touchStartX = 0;
		var touchEndX = 0;
		$('#global_show_image li').on('touchmove',function(event){
			event.preventDefault();
			event.stopPropagation();
		});
		$('#global_show_image li').on('touchstart',function(event){
			touchStartX=event.originalEvent.changedTouches[0].pageX;
		});
		$('#global_show_image li').on('touchend mouseup',function(event){
			event.preventDefault();
			event.stopPropagation();
			touchEndX='ontouchend' in window ? event.originalEvent.changedTouches[0].pageX : 0;
			if(touchEndX-touchStartX>30){	//右滑动	//30像素偏移值
				index = --index > 0 ? index : 0;
				$('#global_show_image ul').animate({'left':'-'+(100*index)+'%'});
			}else if(touchEndX-touchStartX<-30){	//左滑动	//30像素偏移值
				index = ++index < size ? index : size-1;
				$('#global_show_image ul').animate({'left':'-'+(100*index)+'%'});
			}else{	//点击取消
				$('#global_show_image').remove();
				global_obj.div_mask(1);
			}
		});
	}else{ //单张图片
		$('#global_show_image li').on('touchend mouseup',function(event){ //点击取消
			$('#global_show_image').remove();
			global_obj.div_mask(1);
		});
	}
};

/* 产品详细页评论 */
$.fn.ReviewsInit = function (options) {
    $.fn.ReviewsInit.defaults = {
        'HtmlContent'    :    '',  // HTML内容
        'ProId'            :    0,  // 产品ID
        'Action'        :    'review',  // 页面 goods[产品详细页]|review[评论列表页]
		'editMode'		:	0,
    };
    let _this = this;
    let IsFlow = _this.parents('.products_review').hasClass('flow') ? 1 : 0;
    let opts = $.extend({},$.fn.ReviewsInit.defaults,options);
    let data = {'page':0, 'ProId':opts.ProId, 'IsFlow' : IsFlow , 'Action':opts.Action, 'editMode':opts.editMode};
    let load_html = function () {  // 加载内容
        // 清除内容
        _this.html('');
        // 载入中遮罩层
        _this.loading();
        $(".loading_msg").css({"top":0, "position":"initial", "width":"auto", "height":300, "background-position":"center"});
        // 请求内容
        setTimeout(function(){
            $.ajax({
                url:"/ajax/get_review_list.html",
                async:false,
                type:'post',
                data:data,
                dataType:'json',
                success:function(data){
                    if (data.ret == 1) {
                        for (let i in data.msg.Data) {
                            // 替换变量
                            let Content = opts.HtmlContent;
                            Content = Content.replace('{review_name}', global_obj.htmlspecialchars_decode(data.msg.Data[i].Name));
                            Content = Content.replace('{review_star}', data.msg.Data[i].RatingHtml);
                            Content = Content.replace('{review_content}', global_obj.htmlspecialchars_decode(data.msg.Data[i].Content));
                            Content = Content.replace('{review_time}', data.msg.Data[i].AccTime);
                            Content = Content.replace('{review_img}', data.msg.Data[i].PicPathHtml);
                            // 插入内容
                            _this.append(Content);
                        }
                        // 插入额外内容
                        _this.append(data.msg.ExtHtml);
                        // 评论图片幻灯片
                        _this.find('img').parent('a').lightBox();  // PC端
                        _this.find('img').parent('a').on('click', function () {  // 移动端
                            $(this).show_image();
                            return false;
                        });
                        // 取消加载内容
                        _this.unloading();
                    }
                }
            });
        }, 300);
    };
    // 初始化加载
    load_html();
    // 翻页加载
    _this.on('click', '#turn_page a', function () {
        data.page = $(this).attr('href').replace(/\/ajax\/(.*).html/g, '$1');
        load_html();
        return false;
    });
};


function loadImg(obj){
    var file	= obj.files[0],		//获取文件
    	reader	= new FileReader(),	//创建读取文件的对象
		imgFile = '';
	if(file){
		//已选择
		reader.onload=function(e){ //为文件读取成功设置事件
			imgFile=e.target.result;
			window.document.getElementById('pic_show').innerHTML='<img src="'+imgFile+'" alt="" /><span></span>';
		};
		reader.readAsDataURL(file); //正式读取文件
	}else{
		//取消选择
		window.document.getElementById('pic_show').innerHTML='<img src="" alt="" /><span></span>';
	}
}

// 新版评论 start
function loadReviewImg(obj,Id){
    var file	= obj.files[0],		//获取文件
    	reader	= new FileReader(),	//创建读取文件的对象
		imgFile = '';

	if(file){
		$('#'+Id).parents('.upload_box').addClass('on');
		$('#'+Id).parents('.upload_box').find('.close').show();

		var Num=$('#review_form .inbox_popup_input .upload_box').length,
			html='',
			ImgNum=$('#review_form .inbox_popup_input .upload_box.on').length;

		html+='<div class="upload_box">';
			html+='<input class="upload_file" id="upload_file_'+Num+'" type="file" name="PicPath_'+Num+'" onchange="loadReviewImg(this,\'pic_show_'+Num+'\');" accept="image/gif,image/jpeg,image/png" />';
			html+='<div class="num_tips"><em>'+(Num+1)+'</em>/3</div>';
			html+='<div class="close" onclick="ReviewImgDel(\'pic_show_'+Num+'\',\'upload_file_'+Num+'\')">X</div>';
			html+='<label for="upload_file_'+Num+'"><div id="pic_show_'+Num+'" class="pic_box"></div></label>';
			html+='<i class="iconfont icon-camera1"></i>';
		html+='</div>';
		if(Num<3){
			$("#review_form .inbox_popup_input .upload_box:last").after(html);
		}
		$('#review_form .inbox_popup_input .upload_box').eq(ImgNum).show();

		//已选择
		reader.onload=function(e){ //为文件读取成功设置事件
			imgFile=e.target.result;
			window.document.getElementById(Id).innerHTML='<img src="'+imgFile+'" alt="" /><span></span><input type="hidden" name="FileName[]" value="'+imgFile+'">';
		};
		reader.readAsDataURL(file); //正式读取文件

	}else{
		remove_review_img(Id);
		window.document.getElementById(Id).innerHTML='<img src="" alt="" /><span></span>';
	}
}
function ReviewImgDel(Id,obj){
	var Num=$('#review_form .inbox_popup_input .upload_box').length,
		file = $("#"+obj);
	file.after(file.clone().val(""));
	file.remove();
	remove_review_img(Id);
	window.document.getElementById(Id).innerHTML='<img src="" alt="" /><span></span>';
}

function remove_review_img(Id){
	$('#'+Id).parents('.upload_box').removeClass('on');
	$('#'+Id).parents('.upload_box').find('.close').hide();
	var ImgNum=$('#review_form .inbox_popup_input .upload_box.on').length,
		index=$('#'+Id).parents('.upload_box').index();
	$('#review_form .inbox_popup_input .upload_box').hide();
	$('#review_form .inbox_popup_input .upload_box.on').show();
	if(index!=2){
		$('#review_form .inbox_popup_input .upload_box:last').after($('#'+Id).parents('.upload_box'));
	}
	sort_review_img();
	$('#review_form .inbox_popup_input .upload_box').eq(ImgNum).show();
}

function sort_review_img(){
	$('#review_form .inbox_popup_input .upload_box').each(function(){
		var Num=$(this).index();
		$(this).find('.num_tips em').text(Num+1);
	});
}
// 新版评论 end

function close_prolist_addtocart_window(){ //关闭产品列表页购物弹窗
	$('body').delegate('#div_mask, .new_win_alert .btn_cancel, .new_win_alert .close', 'click', function(){
		if($('body').find('.new_win_alert').length){
			$('body').find('.new_win_alert').remove();
			$('body').find('#div_mask').remove();
		}
	});
}


$(document).ready(function(){//图片淡入淡出的效果
	if($('img').length>0){
		$('img').each(function(k){
			$(this).addClass('img_loading');
			$(this).load(function(){
				$(this).removeClass('img_loading');
			});
		});
	}
});

$(document).ready(function(){
	//导航下拉
	setTimeout(function(){
		$('#nav').css('overflow','visible');
	},800);
	$('.small_nav_sec').parent().css({'position':'relative','overflow':'visible'});
	$('.nav_item li, .default_nav li').hover(function(){
		$this=$(this);
		$this.find('.nav_sec').show().animate({'opacity':'1','margin-top':0},200);
		if(!$this.find('.nav_sec').hasClass('small_nav_sec')){
			$this.find('.nav_list>.clear').remove();
			$eq=parseInt(($this.find('.nav_sec_box').width()-$this.find('.nav_img').outerWidth(true))/$this.find('.nav_sec_item').outerWidth(true));
			$this.find('.nav_sec_item').each(function(index){
				if(index%$eq==($eq-1)){
					$(this).after('<div class="clear"></div>');
				}
			});
		}
	},function(){
		$this=$(this);
		$this.find('.nav_sec').animate({'opacity':'0','margin-top':'30px'},0).hide();
	});

	$('.nav_list .nav_sec_item').hover(function(){
		$this=$(this);
		$this.find('.nav_third_box').show().animate({'opacity':'1','margin-top':0},200);
	},function(){
		$this=$(this);
		$this.find('.nav_third_box').animate({'opacity':'0','margin-top':'30px'},0).hide();
	});

	$(window).scroll(function(){
		var window_top = $(window).scrollTop();
		if(window_top>0){
			$('#go_top').css('display', 'block');
		}else{
			$('#go_top').hide();
		}
	});

	$('.small_nav_sec .nav_sec_item').hover(function(){
		if(!$(this).find('.nav_thd_list').length) return false;
		var $obj=$(this).find('.nav_thd_list'),
			$w0=(($obj.width()+$obj.offset().left) > $(window).width()),
			$w1=(($obj.width()*2+$obj.offset().left) > $(window).width());
		if($obj.length && ($w0 || ($obj.find('.nav_four_item').length && $w1))){ //处理小的下拉的定位
			$obj.css({'left':'auto','right':'100%'});
			$obj.find('.nav_four_item').css({'left':'auto','right':'100%'});
		}
	},function(){
		var $obj=$(this).find('.nav_thd_list');
		$obj.attr('style','').find('.nav_four_item').attr('style','');
	});
	//浏览器语言跳转
	if(navigator.userLanguage){
        CurLang=navigator.userLanguage.substring(0,2).toLowerCase();
    }else{
        CurLang=navigator.language.substring(0,2).toLowerCase();
    }

    //Cookies协议
    $('#cookies_agreement .button').click(function() {
        $('#cookies_agreement').css('opacity', 0).animate(2000, function(){
            $.post('?', {'do_action':'action.set_cookies_agreement'}, function(data){
                $(this).remove();
            }, 'json');
        });
    });

	//头部栏目设置
	$('#top_bar .crossn li').each(function(){
		var dd=$(this).find('dd.user');
        if(dd.length){
			var oWidth=($(this).width()-22);
			dd.css('width', oWidth+'px');
		}
    });
	$('#currency').text(ueeshop_config.currency);
	// $('.currency_data').text(ueeshop_config.currency_symbols);
	$('html').priceShow();

	//搜索下拉PC(移动在下面写有js)
	if ($(window).width() > 768) {
		$('.ajax_search input[name=Keyword]').keyup(function(){
	        var Keyword = $(this).val(),
	         	left = parseInt($('.ajax_search').css("border-left-width")),
	         	right = parseInt($('.ajax_search').css("border-right-width")),
	         	top = parseInt($('.ajax_search').css("border-top-width")),
	         	bottom = parseInt($('.ajax_search').css("border-bottom-width"));
	        if(Keyword){
	            $.post('/ajax/ajax_search.html',{'Keyword':Keyword},function(data){
	                $('.ajax_search .search_content_box').remove();
	            	$('.ajax_search').append(data);
	                $('.ajax_search .search_content_box').css('top', $('.ajax_search form').height()+bottom+'px');
	                $('.ajax_search .search_content_box').css('left', -left+'px');
	                $('.ajax_search .search_content_box').css('width', $('.ajax_search form').width()-2+left+right+'px');
	            });
	        }
	        $('.ajax_search').mouseleave(function(){
	        	$('.ajax_search .search_content_box').remove();
	        });
	    });
	}

	//收藏列表
	var $FavData='0';
	$('.ajax_favorite').each(function(){
		$proid=$(this).attr('data');
		if($proid) $FavData+=','+$proid;
	});
	if($FavData!='0'){
		$.post('/', 'do_action=action.favorite&ProId='+$FavData, function(data){
			if(data.ret==1){
				var $obj;
				for(k in data.msg){
					$obj=$('.ajax_favorite[data='+data.msg[k]+']');
					$obj.addClass('is_in');
				}
			}
		}, 'json');
	}

	//产品详细页折扣倒计时
	$(".discount_count").find(".discount_time").each(function(){
		var time=new Date();
		$(this).genTimer({
			beginTime: ueeshop_config.date,
			targetTime: $(this).attr("endTime"),
			callback: function(e){
				this.html(e)
			}
		});
	});

	//产品列表页筛选
	$("#more_prop").click(function(){
		$(this).hide();
		$("#less_prop").css('display', 'inline-block');
		$('[overshow=true]').show();
	});
	$("#less_prop").click(function(){
		$(this).hide();
		$("#more_prop").css('display', 'inline-block');
		$('[overshow=true]').hide();
	});


	//搜索框
	$('#header .search form').submit(function(){if(global_obj.check_form($(this).find('*[notnull]'))){return false;}});

	//货币切换
	$('#top_bar_outer .currency, #top_outer .currency, #toper .currency, #header .currency').delegate('a', 'click', function(){
		var v=$(this).attr('data');
		$.post('/', 'do_action=action.currency&currency='+v, function(data){
			if(data.ret==1){
				global_obj.set_currency_location();
			}
		}, 'json');
	});

	//购物车
	/*$(".header_cart, .default_shopping_cart").hover(function(){
		if(!$(this).attr('is_animate')){
			var $this=$(this),
				$lang=$this.attr('lang');
				$note=$this.find(".cart_note");

			$this.addClass("header_active");
			$note.show().css({'opacity':0, 'top':'150%'}).animate({'opacity':1, 'top':'100%'}, 200);
			//if(!$note.html()){
				$.ajax({
					url:"/ajax/shopping_cart.html",//"/?m=ajax&a=shopping_cart",
					async:false,
					type:'get',
					dataType:'html',
					success:function(result){
						if(result){
							$note.html(result);
						}
					}
				});
			//}
			$(this).attr('is_animate',1);
		}
	}, function(){
		if(!$(this).attr('status')){
			$(this).removeAttr('is_animate').removeClass("header_active").find(".cart_note").animate({'opacity':0, 'top':'150%'}, 200, function(){
				$(this).hide();
			});
		}else{
			setTimeout(function(){
				$(this).removeAttr('status').removeAttr('is_animate').removeClass("header_active").find(".cart_note").animate({'opacity':0, 'top':'150%'}, 200, function(){
					$(this).hide();
				});
			},10000);
		}
	});*/

	//订阅
	$('#newsletter_form,form[name=newsletter]').submit(function(){
		if(global_obj.check_form($(this).find('*[notnull]'), $(this).find('*[format]'), 0, 1)){return false;}
		$(this).find('input[type=submit]').attr('disabled', 'disabled');

		$.post('/', 'do_action=action.newsletter&'+$(this).serialize(), function(data){
			if (data.ret == 1) {
                //订阅成功
				global_obj.new_win_alert(lang_obj.web.global.newsletter_success, function(){
					$('#newsletter_form,form[name=newsletter]').find('input[name=Email]').val('');
				}, '', undefined, '');
			} else if (data.ret == 2) {
                //已订阅
                global_obj.new_win_alert('"'+data.msg+'" '+lang_obj.web.global.newsletter_exists, function(){
					$('#newsletter_form,form[name=newsletter]').find('input[name=Email]').val('');
				}, '', undefined, '');
            } else{
                //订阅失败
				global_obj.new_win_alert(lang_obj.web.global.format_email);
			}
		}, 'json');

		$(this).find('input[type=submit]').removeAttr('disabled');
		return false;
	});

	$('#go_top').click(function(){
		$("html, body").animate({"scrollTop":0}, 700);
	});

	//订单直播
	if($('.order_live').length){
		var $i=0,
			$box=$('.order_live .order_live_bd'),
			$bdHeight=$('.order_live .order_live_scroll').height(),
			OrderLiveFun=function(){
							$boxHeight=$box.find('li:eq(0)').outerHeight();
							if($box.scrollTop()>$boxHeight){
								$box.find('li:eq(0)').clone().appendTo('.order_live .order_live_scroll');
								$box.find('li:eq(0)').remove();
								$i=0;
							}
							$box.scrollTop(++$i);
						};

		if($bdHeight>$box.height()+50){
			var OrderLive=setInterval(OrderLiveFun, 50);

			$box.off().on("mouseenter", function(){
				clearInterval(OrderLive);
			}).on("mouseleave", function(){
				OrderLive=setInterval(OrderLiveFun, 50);
			});
		}
	}

	//首页产品特效
	var $effectsVal=$(".prod_list").attr("effects");
	if($effectsVal==1){
		$(".prod_list .prod_box").off().on("mouseenter", function(){
			$(this).addClass('hover_1');
		}).on("mouseleave", function(){
			$(this).removeClass('hover_1');
		});
	}else if($effectsVal==2){
		$(".prod_list .prod_box").off().on("mouseenter", function(){
			$(this).addClass('hover_2');
		}).on("mouseleave", function(){
			$(this).removeClass('hover_2');
		});
	}else if($effectsVal==3){
		$(".prod_list .prod_box").off().on("mouseenter", function(){
			$(this).addClass('hover_3');
		}).on("mouseleave", function(){
			$(this).removeClass('hover_3');
		});
	}else if($effectsVal==4){
		$(".prod_list .prod_box").off().on("mouseenter", function(){
			$(this).addClass('hover_4');
		}).on("mouseleave", function(){
			$(this).removeClass('hover_4');
		});
	}else if($effectsVal==5){
		$(".prod_list .prod_box").off().on("mouseenter", function(){
			$(this).children(".prod_box_pic").addClass("pic_enlarge");
		}).on("mouseleave", function(){
			$(this).children(".prod_box_pic").removeClass("pic_enlarge");
		});
	}else if($effectsVal==6){
		$(".prod_list .prod_box").off().on("mouseenter", function(){
			if($(this).find(".thumb_hover").length){
				$(this).find(".thumb").stop(true, true).animate({opacity:0}, 300);
				$(this).find(".thumb_hover").stop(true, true).animate({opacity:1}, 300);
			}
		}).on("mouseleave", function(){
			if($(this).find(".thumb_hover").length){
				$(this).find(".thumb").stop(true, true).animate({opacity:1}, 300);
				$(this).find(".thumb_hover").stop(true, true).animate({opacity:0}, 300);
			}
		});
	}

	//添加收藏夹
	$(document).on('click', '.add_favorite', function(e){
		var $this=$(this),
			ProId=$(this).attr("data");
		if($this.hasClass('is_in')){ //取消收藏
			$.get('/account/favorite/remove'+ProId+'.html', {isjson:1}, function(data){
				if(data.ret==1){ //添加收藏
					$this.removeClass('is_in');
					if(data.msg.FavoriteCount>=0 && $('.detail_favorites .favorites_count')){
						$('.detail_favorites .favorites_count').html('('+data.msg.FavoriteCount+')');
					}
				}
			}, 'json');
		}else{ //添加收藏
			$.get('/account/favorite/add'+ProId+'.html', '', function(data){
				if(data.ret==1 || data.ret==0){
					if(data.ret==0){
						return true;
					}
					$this.addClass('is_in');
					if(data.msg.FavoriteCount && $('.detail_favorites .favorites_count').length>0){
						$('.detail_favorites .favorites_count').html('('+data.msg.FavoriteCount+')');
					}
					// 收藏成功
					if (parseInt(ueeshop_config.FbPixelOpen) == 1 && data.ret == 1) {
						// When a product is added to a wishlist.
						fbq('track', 'AddToWishlist', {content_ids:'['+data.msg.Num+']', content_name:data.msg.Name, currency:data.msg.Currency, value:'0.00'});
					}
					if (parseInt(ueeshop_config.pintrkPixelOpen) == 1 && data.ret == 1) {
						// Track people who show interest in your product or service
						pintrk('track', 'Lead', {lead_type: 'Favorite'});
					}

				}else{
					//弹窗没登录
					var parentObj=$(window.parent.document);
					var sign_type = '';
					if(parentObj.find('#shopbox').length > 0){
						parentObj.find('#shopbox').shopboxHide();//需要登录的话就关闭弹窗
						sign_type = 'parent'; //弹窗点击的收藏的话
					}
					var login_form = $('form[name=signin_form]');
					if(parentObj.find('#shopbox').length) login_form = parentObj.find('form[name=signin_form]');
					user_obj.set_form_sign_in(sign_type, '', 1);
					login_form.find('input[name="comeback"]').val('$(\'.add_favorite[data='+ProId+']\').click();');
				}
			}, 'json');
		}
	});
	$('html').on('click', '#prompt_close, #prompt_button', function(){
		if($('#prompt_box').length){
			$('#prompt_box').remove();
			global_obj.div_mask(1);
		}
	});

	//语言和货币选择弹出框
	$('html').on('click', '.btn_language', function(){
		var obj={
			html:'',
			source:$('#pop_lang_currency').html()
		};
		obj.html='<div id="shopbox">'+obj.source+'</div>';
		$('#shopbox').length && $('#shopbox').remove();
		var scrollRight=window.innerWidth-$(window).width();
		$('body').addClass('hidden').css('margin-right', scrollRight).prepend(obj.html);
        $('#shopbox').height($('#shopbox .shopbox_wrap').height());
		if(!$('#div_mask').length) global_obj.div_mask();
	}).on('click', '.lang_item li', function(){
		$(this).parents('.pop_skin').find('.lang_item li').removeClass('current');
		$(this).addClass('current');
	}).on('click', '.btn_currency', function(){
		var $obj=$(this).parents('.pop_currency');
		if($obj.hasClass('pop_open')){
			$obj.removeClass('pop_open');
		}else{
			$obj.addClass('pop_open');
		}

		$(document)[0].addEventListener('click', function(e){
			var $obj=$(e.target);
			if(!$obj.parent().hasClass('btn_currency') && !$obj.hasClass('btn_currency') && $('#shopbox .pop_currency').hasClass('pop_open')){
				$('#shopbox .pop_currency').removeClass('pop_open');
			}
		}, false);
	}).on('click', '.pop_currency_menu a', function(){
		$('#shopbox .btn_currency').attr('data-currency', $(this).attr('data')).html($(this).html()+'<em></em>');
	}).on('click', '.btn_save', function(){
		var $lang=$('#shopbox .lang_item li.current').attr('data-lang'),
			$code=$('#shopbox .btn_currency').attr('data-currency');
		$.post('/', 'do_action=action.change_language_currency&language='+$lang+'&currency='+$code, function(data){
			if(data.ret==1){
				window.location.href=data.msg;
			}else if((data.ret==2)){
				window.open(data.msg);
			}
		}, 'json');
	});

	//添加购物车
	$('html').on('click', '.add_cart', function(){
		var obj={
			html:'',
			ProId:$(this).attr("data")
		};
		if (!obj.ProId) return true;
		obj.html='<div id="shopbox" class="themes_popups">';
			obj.html+='<button class="shopbox_close"><span>×</span></button>';
			obj.html+='<div class="shopbox_wrap"><div class="shopbox_skin"><div class="shopbox_inner"><iframe id="shopbox_frame" name="shopbox_frame" class="shopbox_frame" frameborder="0" vspace="0" hspace="0" scrolling="0" src="/custom-products/'+obj.ProId+'.html" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div></div></div>';
		obj.html+='</div>';

		$('#shopbox').length && $('#shopbox').remove();
		var scrollRight=window.innerWidth-$(window).width();
		$('body').addClass('hidden').css('margin-right', scrollRight).prepend(obj.html);
		$('#shopbox').height($('#shopbox .shopbox_wrap').height());
		if(!$('#div_mask').length) global_obj.div_mask();

        if($(window).width()<1200){
            $('#shopbox').css({'margin-left':'-30.6pc'});
        }
	});

	//共用弹出框的关闭事件
	$('html').on('click', '#shopbox .shopbox_close, #shopbox .btn_cancel, #div_mask', function(){
		$('#shopbox').shopboxHide();
	});

	//分享弹出框
	$('html').on('click', '.share_this', function(){
		var share=['facebook', 'google', 'twitter', 'vk', 'linkedin', 'googleplus', 'digg', 'reddit', 'stumbleupon', 'delicious', 'pinterest'],
			data=$.evalJSON($(this).attr("data")),
			html='';
		html='<div id="share_box">';
			html+='<button class="share_close"><span>×</span></button>';
			html+='<div class="share_content">';
				html+='<div class="share_hd"><span class="share_title">Share</span><span class="page_title">'+data.title+'</span><span class="page_url">'+data.url+'</span></div>';
				html+='<ul class="share_list">';
					for(k in share){
						html+='<li><button class="share_button share_'+share[k]+'" data="'+share[k]+'"></button><span class="share_label">'+share[k]+'</span></li>';
					}
				html+='</ul>';
			html+='</div>';
		html+='</div>';

		$('#share_box').length && $('#share_box').remove();
		$('body').prepend(html);
		if(!$('#div_mask').length) global_obj.div_mask();

		$('body').delegate('#share_box .share_list button', 'click', function(){
			$(this).shareThis($(this).attr('data'), data.title, data.url);
		});
	});
	$('html').on('click', '#share_box .share_close, #div_mask', function(){
		if($('#share_box').length){
			$('#share_box').remove();
			global_obj.div_mask(1);
		}
	});

	//产品详细页面询盘
	$('.product_inquiry').on('click',function(){
		if($(this).data('user') || !$(this).data('userused')){
			global_obj.div_mask();
			var html='<div id="inbox_popup">';
					html+='<div class="inbox_popup_close">×</div>';
					html+='<form id="inbox_popup_form" name="inbox_popup_form" method="post" enctype="multipart/form-data">';
						html+='<div class="inbox_popup_info">';
							html+='<div class="inbox_popup_img pic_box"><img src="'+$('.big_pic img').attr('src')+'" /><span></span></div>';
							html+='<div class="inbox_popup_name">'+$('.detail_right h1').text()+'</div>';
						html+='</div>';
						html+='<div class="inbox_popup_content">';
							if($(this).data('user')){
								html+='<div class="inbox_popup_email">'+$(this).data('email')+'</div>';
							}else{
								html+='<input class="inbox_popup_form_input" name="Email" placeholder="'+lang_obj.web.global.newsletter_your_email+'" notnull format="Email" />';
							}
							html+='<textarea class="inbox_popup_form_textarea" name="Content" placeholder="'+lang_obj.web.global.newsletter_your_questions+'" notnull></textarea>';
							html+='<div class="inbox_popup_upload upload_box">';
								html+='<div class="clear"></div>';
								html+='<input class="upload_file" id="upload_file" type="file" name="PicPath" onchange="loadImg(this);" accept="image/gif,image/jpeg,image/png" />';
								html+='<div id="pic_show" class="pic_box"></div>';
							html+='</div>';
							html+='<input class="inbox_popup_form_submit" type="submit" value="'+lang_obj.web.global.send+'" />';
							html+='<input type="hidden" name="ProId" value="'+$(this).data('proid')+'">';
							html+='<input type="hidden" name="do_action" value="user.product_inquiry">';
						html+='</div>';
					html+='</form>';
				html+='</div>';
			$('body').prepend(html);
			$('#inbox_popup .inbox_popup_close').click(function(){
				$(this).parent().remove();
				global_obj.div_mask(1);
			});
			$('#inbox_popup form').submit(function(){
                if (global_obj.check_form($(this).find('*[notnull]'))) {
                    return false;
                }
                if($(this).find('input[name=Email]').size()){
					var email_obj=$(this).find('input[name=Email]');
					var reg=new RegExp(/^\w+[a-zA-Z0-9-.+_]+@[a-zA-Z0-9-.+_]+\.\w*$/);
					if(!reg.test(email_obj.val())){
						global_obj.new_win_alert(lang_obj.web.global.format_email, '', '', 1);
						return false;
					}
				}
			});
		}else{
			user_obj.set_form_sign_in('', window.location.href, 1);
		}
	});

	//新版文本框 临时
	//$(document.body)
	$('.input_box input, .input_box textarea').on('change keyup blur force-reset', function(e){
		var n = $(e.currentTarget),
       		i = n.val(),
			o = n.closest('.input_box');
		(o.length || "force-reset" === e.type) && (i.length > 0 && "force-reset" !== e.type ? o.addClass('filled') : o.removeClass('filled'))
		/*
		if($(this).val().length>0){
			$(this).parent().addClass('filled');
		}else{
			$(this).parent().removeClass('filled');
		}
		*/
	});
	//新版选择框 临时
	//$(document.body)
	$('.box_select select').on('change', function(e){
		var n = $(e.currentTarget),
       		i = n.val(),
			o = n.closest('.box_select');
		o.find('.select_box_label').length && (o.length || "force-reset" === e.type) && (i.length > 0 && "force-reset" !== e.type ? o.addClass('filled') : o.removeClass('filled'))
		/*
		if($(this).val().length>0){
			$(this).parent().addClass('filled');
		}else{
			$(this).parent().removeClass('filled');
		}
		*/
	});
	$('#signup .box_select select').each(function(){
		if($(this).val()!=''){
			$(this).parent('.input_box').addClass('filled');
		}
	});

    //协议
    $('.agreement').click(function() {
        var $Type       = $(this).data('type'),
            $Title      = '',
            $Content    = '',
            $Html       = '';
        $.get('?','do_action=action.get_policies_content&Type='+$Type, function(data) {
            if (data.ret==1) {
                $Title = data.msg.Title;
                $Content = data.msg.Content;
                $Html += '<div class="agreement_outer">';
                $Html +=    '<div class="agreement_in">';
                $Html += 		'<a class="choose_close"></a>';
                $Html +=        '<div class="agreement_content"><div class="title">' + $Title + '</div><div class="wrap ck-content">' + $Content + '</div></div>';
                $Html +=    '</div>';
                $Html += '</div>';
                $('.agreement_outer').remove();
                $('body').prepend($Html);
                $('.agreement_outer').click(function(e) {
                    var $obj = $(e.target);
                    if (!$obj.parents('.agreement_outer').length) {
                        $('.agreement_outer').css('opacity', 0).animate(2000, function() {
                            $(this).remove();
                        });
                    }
                });
                $('body').on('click', '.agreement_outer .choose_close', function() {
                    if ($('.agreement_outer').length) {
                        $('.agreement_outer').css('opacity', 0).animate(2000, function() {
                            $(this).remove();
                        });
                    }
                });
            }
        }, 'json');
    });

	// 全局返回头部链接跳转
	$('html').on('click', 'a[href=#top]', function () {
		$('body,html').animate({scrollTop:0},500);
		return false;
	});


	$.fn.checkAmount = function(obj) {
		//只能填入数字
		obj.find('input[rel=amount]').off('keydown').keydown(function(e){
			var value	= $(this).val(),
				key		= (window.event?e.keyCode:e.which),
				ctrl	= (e.ctrlKey || e.metaKey),
				ext   	= 0;
				if (((key==109  && value.indexOf('-')<0) || (key==189  && value.indexOf('-')<0)) && $(this).attr('data-key')=='-') ext=1;
				if (key == 9 || key == 37 || key == 39 || key == 46) ext = 1; //保留tab 左右方向键 向后删除键
			if (!e.shiftKey && ((key>95 && key<106) || (key>47 && key<60) || (key==110 && value.indexOf('.')<0) || (key==190 && value.indexOf('.')<0) || ext)) { //[0~9][.]
			} else if ((ctrl && key==67) || (ctrl && key==86) || (ctrl && key==65)) { //Ctrl+C Ctrl+V Ctrl+A
			} else if (key!=8) { //删除键
				if (window.event) {//IE
					e.returnValue = false;
				} else {//Firefox
					e.preventDefault();
				}
				return false;
			}
		});
		obj.find('input[rel=int]').off('keydown').keydown(function(e){
			var value	= $(this).val(),
				key		= (window.event?e.keyCode:e.which),
				ctrl	= (e.ctrlKey || e.metaKey),
				ext   	= 0;
				if(((key==109  && value.indexOf('-')<0) || (key==189  && value.indexOf('-')<0)) && $(this).attr('data-key')=='-') ext=1;
				if(key == 9 || key == 37 || key == 39 || key == 46) ext = 1; //保留tab 左右方向键 向后删除键
			if (!e.shiftKey && ((key>95 && key<106) || (key>47 && key<60) || ext)) { //[0~9][.]
			} else if ((ctrl && key==67) || (ctrl && key==86) || (ctrl && key==65)) { //Ctrl+C Ctrl+V Ctrl+A
			} else if (key!=8) { //删除键
				if (window.event) {//IE
					e.returnValue = false;
				} else {//Firefox
					e.preventDefault();
				}
				return false;
			}
		});
	};

	/********************************************************* 公共插件js开始 *********************************************************/
	//货币切换
	$('.default_currency').delegate('.default_currency_list a', 'click', function(){
		var v=$(this).attr('data');
		$.post('/', 'do_action=action.currency&currency='+v, function(data){
			if(data.ret==1){
				global_obj.set_currency_location();
			}
		}, 'json');
	});

	//语言选择弹出框
	$('html').on('click', '.btn_default_language', function(){
		$('#default_language_box').height($('#default_language_box').outerHeight()).css('bottom', 0).fadeIn();
		if(!$('#div_mask').length) global_obj.div_mask(0, $('.default_language'));
	}).on('click', '.language_box_close,#div_mask', function(){
		$('#div_mask,#default_language_box').fadeOut(function(){
			global_obj.div_mask(1);
		});
	});

	// 语言货币选择弹出框(组合按钮)
	$('html').on('click', '.btn_default_language_currency', function(){
		if (!$('body').children('#default_language_currency_box').size()) {  // 把弹窗放到body下，避免局部样式影响
			$('body').after($('#default_language_currency_box'));
		}
		var max_htight = $('#default_language_currency_box').outerHeight();
		if (max_htight > $(window).height()*0.7) {
			max_htight = "70vh";
		}
		$('#default_language_currency_box').height(max_htight).css('bottom', 0).fadeIn();
		if(!$('#div_mask').length) global_obj.div_mask();
	}).on('click', '#default_language_currency_box h4 i,#div_mask', function(){
		$('#div_mask,#default_language_currency_box').fadeOut(function(){
			global_obj.div_mask(1);
		});
	});
	// 语言货币选择保存(组合按钮)
	$('html').on('click', '#default_language_currency_box .default_language_currency_list a', function(){
		$(this).addClass('current').siblings().removeClass('current');
	});
	$('html').on('click', '#default_language_currency_box .default_language_currency_submit', function(){
		if ($('.default_language_item').size() && $('.default_currency_item').size()) {  // 组合选择
			var lang = $('#default_language_currency_box .default_language_item a.current').data('lang');
			var currency = $('#default_language_currency_box .default_currency_item a.current').attr('data');
			$.post('/', 'do_action=action.change_language_currency&language=' + lang + '&currency=' + currency, function(data){
				if(data.ret==1){
					window.location.href=data.msg;
				}else if((data.ret==2)){
					window.open(data.msg);
				}
			}, 'json');
		} else if($('.default_language_item').size()) {  // 语言选择
			var lang_url = $('#default_language_currency_box .default_language_item a.current').data('url');
			window.location.href = lang_url;
		} else if ($('.default_currency_item').size()) {  // 货币选择
			var current = $('#default_language_currency_box .default_currency_item a.current').attr('data');
			$.post('/', 'do_action=action.currency&currency=' + current, function(data){
				if(data.ret==1){
					global_obj.set_currency_location();
				}
			}, 'json');
		}
	});

	//公共搜索功能
	$('.default_search').on('click', '.default_search_btn', function(){
		$('body').append($('#default_search_box'));
		$('#default_search_box').fadeIn();
	});
	$('#default_search_box i').click(function(){
		$('#default_search_box').fadeOut();
	});

	//语言栏、货币栏 触发效果
	$('.default_currency, .default_language').hover(function(){
		$(this).find('dd').css({'opacity':0, 'top':'150%'}).animate({'opacity':1, 'top':'100%'}, 200);
	},function(){
		$(this).find('dd').animate({'opacity':0, 'top':'150%'}, 200);
	});

	//弹窗公告公共处理Js
	$('.operation_activities .oper_close').click(function(){
		var $this = $(this).parents('.operation_activities'),
			$OId = $this.attr('data-oid'),
			$height = $this.height();
		$.post('/', 'do_action=action.operation_activities_del&OId='+$OId, function(data){});
		$this.fadeOut(500, function(){
			$this.remove();
			$('.header_content_height').height($('.header_content_height').height() - $height);
			if (!$('.operation_activities').not('[class*="operation_discount"]').length && !$('#operation_activities_tips').length) $('#operation_activities_bg').remove();
		});
	});
	$('.operation_activities .operation_click').click(function(){ //统计点击
		var $this = $(this).parents('.operation_activities'),
			$OId = $this.attr('data-oid');
		$.post('/', 'do_action=action.operation_activities_click&OId='+$OId, function(data){});
	});
	//订阅
	$('.operation_activities form').submit(function(){
		if(global_obj.check_form($(this).find('*[notnull]'), $(this).find('*[format]'), 1, 1)){return false;}
		$(this).find('input[type=submit], button').attr('disabled', 'disabled');
		var $this = $(this),
			$OId = $this.parents('.operation_activities').attr('data-oid');
		$.post('/', 'do_action=action.operation_activities&OId='+$OId+'&'+$(this).serialize(), function(data){
			if (data.ret == 1) {
				$('body').prepend(data.msg);
				$this.parents('.operation_activities').find('.oper_close').click();
			} else {
				if ($this.parents('.operation_activities').find('.operation_error').length) {
					$this.parents('.operation_activities').find('.operation_error').html(data.msg);
				} else {
					$this.parents('.operation_activities').find('form input[name=Email]').after('<div class="operation_error">' + data.msg + '</div>');
				}
				$this.parents('.operation_activities').find('form input[name=Email]').val('');
			}
		}, 'json');

		$(this).find('input[type=submit], button').removeAttr('disabled');
		return false;
	});
	if ($(".operation_activities .oper_time").length){
		var $this = $('.operation_activities .oper_time');
		var time=new Date();
		$('.operation_activities .oper_time').genTimer({
			beginTime: ueeshop_config.date,
			type:'day_separate',
			day_label:'d',
			days_label:'d',
			unitWord:{hours:"h <em>:</em>", minutes:"m <em>:</em>", seconds:"s"},
			targetTime: $('.operation_activities .oper_time').attr("data-endTime"),
			callback: function(e){
				this.html(e)
			}
		});
	}

	if ($('.operation_activities').not('[class*="operation_discount"]').length) {
		$('body').prepend('<div id="operation_activities_bg"></div>');
	}
	$('html').on('click', '#operation_activities_tips .tips_close', function(){
		$('#operation_activities_tips').remove();
		if (!$('.operation_activities').not('[class*="operation_discount"]').length && !$('#operation_activities_tips').length) $('#operation_activities_bg').remove();
	});

	function operation_show()
	{
		var operation_discount_bulletin = $("*[class*='operation_discount_bulletin']");  // 模糊查询弹窗公告公告类型的类名
		if ($('.header_content_height').size()) {
			setTimeout(function() {
				let content_height = $('.themes_global_header').outerHeight(true);
				if (operation_discount_bulletin.size()) {
					let operation_height = operation_discount_bulletin.outerHeight(true);
					content_height += operation_height;
				}
				$('.header_content_height').animate({height:content_height}, 300);
				if ($(window).width() >= 1000) {
					$('.header_content_height').hide();
				} else {
					$('.header_content_height').show();
				}
				if ($(window).width() >= 1000 && $('.header_fix').size() && !$('#banner').size()) $('.header_content_height').show();
			}, 300);
		}
	}
	operation_show();
	var resizeTimer = null;
	$(window).on('resize', function () {
		if (resizeTimer) clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
			operation_show();
		} , 500);
	});
	/********************************************************* 公共插件js结束 *********************************************************/
	/********************************************************* 响应式手机版头部导航弹窗js开始 *********************************************************/
	if ($(window).width() <= 768 && $('.left_fixed_side').size()) {
		// 取消PC的点击事件
		$('.default_search').off('click', '.default_search_btn');
		//
		var $pop_up=$('.pop_up'),
			$container=$('.pop_up_container'),
			$height;

		$('.global_menu, footer .menu .products').on('click', function(){//footer .menu .products 底部风格02 底部也可以点
			global_obj.div_mask();
			$height=$(window).height();
			$('.nav_side').css('visibility', 'visible').addClass('show');
			$('html, html body').css({'height':$height, 'overflow':'hidden'});
			//var h=$(window).outerHeight()-$('.nav_side .user').outerHeight(true)-$('.nav_side .search').outerHeight()-$('.nav_side .currency').outerHeight();
			var h=$(window).height()-$('.nav_side .user').outerHeight(true);
			$('.nav_side .menu_list').css({'height':h, 'max-height':h});

			$('#div_mask').off().on('click', function(){
				$('.nav_side>.close').click();
				return false;
			});
		});

		//搜索框
		$('.global_search').on('click', function(){
			global_obj.div_mask();
			$height=$(window).height();
			$('.search_side').css('visibility', 'visible').addClass('show');
			$('html, html body').css({'height':$height, 'overflow':'hidden'});
			// var h=$(window).outerHeight()-$('.search_side .search').outerHeight(true);
			var h=$(window).height()-$('.search_side .search').outerHeight(true);
			$('.search_side .menu_list').css({'height':h, 'max-height':h});
		});
		$('.search_side .search>form').submit(function(){
			var o=$(this).find('input[type=search]');
			o.removeClass('form_null');
			if(o.val()==''){
				o.addClass('form_null');
				return false;
			}
		});

		//会员头像
		$('.user_logo').click(function(){
			window.top.location.href=$(this).attr('data-url');
		});
		//头部导航
		$pop_up.find('.close').off().on('tap, click', function(e){
			e.stopPropagation();
			var o=$(this).parents('.pop_up');
			o.removeClass('show');
			if ($(window).width() > 1000) {
				//针对PC端
				$('.ajax_default_search, .ajax_search').hide();
			}
			setTimeout(function(){
				o.css('visibility', 'hidden');
			}, 40);
			if(o.hasClass('nav_side')){ //头部导航
				$('.category_side, .language_side, .currency_side').removeClass('show').css('visibility', 'hidden');
			}
			if(!o.hasClass('category_side') && !o.hasClass('language_side') && !o.hasClass('currency_side')){
				$('html, html body').css({'height':'auto', 'overflow':'auto'});
				setTimeout(function(){
					global_obj.div_mask(1);
					$('.fixed_pop_up').remove();
				}, 40);
			}
			if($('.nav_side').css('visibility')=='hidden'){ //如果导航自身已经隐藏
				$('html, html body').css({'height':'auto', 'overflow':'auto'});
				setTimeout(function(){
					global_obj.div_mask(1);
				}, 40);
			}
		});
		$('.left_fixed_side').on('tap, click', '.item.son>.nav_icon', function(){
			$html='<div class="pop_up fixed_pop_up category_side" style="visibility:visible;">'+$(this).next('.category_side').html()+'</div>';
			$('.left_fixed_side').append($html);
			setTimeout(function(){
				$('.left_fixed_side').find('.fixed_pop_up').addClass('show');
			},50);
			// $(this).next('.category_side').css('visibility', 'visible').addClass('show');
			// var h=$(window).outerHeight()-$('.category_side .category_title').outerHeight(true)-$('.category_side .search').outerHeight();
			// $('.category_side .menu_list').css({'height':h, 'max-height':h});
		});
		$('.left_fixed_side').on('tap, click', '.fixed_pop_up .close.category_close', function(){
			var o=$(this).parent().parent('.fixed_pop_up');
			o.removeClass('show');
			setTimeout(function(){
				o.remove();
			}, 400);
		});
		$container.find('.menu_list .item a').on('tap, click', function(e){
			e.stopPropagation();
			if(!$(this).attr('data-store')){
				window.self.location.href=$(this).attr('href');
			}else{
				window.location.href=$(this).attr('href');
			}
	    });
		$container.find('.menu_list .item a').on('tap, click', function(e){
			return false;
		});
		$container.find('div.menu_list .son>a').on('tap', function(){
			if($(this).parent().hasClass('open')){
				$(this).parent().removeClass('open');
				$(this).siblings('.menu_son').stop(true, false).slideUp();
			}else{
				$(this).parent().addClass('open');
				$(this).siblings('.menu_son').stop(true, false).slideDown();
			}
	    });
		$container.find('.menu_list .isub .navsub .next').on('tap, click', function(){ //下级弹窗
			if($(this).hasClass('on')){
				$(this).removeClass('on');
			}else{
				$('body,html').scrollTop(0);
				$(this).addClass('on');
			}
		});
		$container.find('.menu_list .isub .navsub .nextwd').on('tap, click', function(e){
			e.stopPropagation();
		});
		$container.find('.menu_list .isub .navsub .nextwd .nclose').on('tap, click', function(){
			$(this).parent().parent().parent().removeClass('on');
		});
		//二级弹窗js
		$container.find('.menu_list .navsub .subitem .nextwd .next0').on('tap, click', function(){
			if ($(this).hasClass('on')){
				$(this).removeClass('on');
				$(this).siblings('.next1').stop(true, false).slideUp();
			}else{
				$(this).addClass('on');
				$(this).siblings('.next1').stop(true, false).slideDown();
			}
		});
		$container.find('.menu_list .navsub .subitem .nextwd .t1bg').on('tap, click', function(){
			if ($(this).hasClass('on')){
				$(this).removeClass('on');
				$(this).siblings('.next2').stop(true, false).slideUp();
			}else{
				$(this).addClass('on');
				$(this).siblings('.next2').stop(true, false).slideDown();
			}
		});
		//搜索下拉 you may also like
		$('.ajax_search input[name=Keyword]').keyup(function(){
	        var Keyword = $(this).val();
	        if(Keyword){
	            $.post('/ajax/ajax_search.html',{'Keyword':Keyword},function(data){
	                $('.search_container .search_content_box').remove();
	            	$('.search_container .ajax_search_box').append(data);
	            	if(data){
	            		$('.search_container .search_ajax_hidden').addClass('hide');
	            	}
	            });
	        }else{
	        	 $('.search_container .search_content_box').remove();
	        	 $('.search_container .search_ajax_hidden').removeClass('hide');
	        }
	    });
	}
	//选择语言
	$('.nav_container .language_item>.icon[class!=noclick]').on('tap, click', function(e){
		$('.language_side').css('visibility', 'visible').addClass('show');
		var h=$(window).outerHeight()-$('.category_side .category_title').outerHeight(true)-$('.category_side .search').outerHeight();
		$('.language_side .menu_list').css({'height':h, 'max-height':h});
	});

	//选择货币
	$('.nav_container .currency_item>.icon[class!=noclick]').on('tap, click', function(e){
		$('.currency_side').css('visibility', 'visible').addClass('show');
		var h=$(window).outerHeight()-$('.category_side .category_title').outerHeight(true)-$('.category_side .search').outerHeight();
		$('.currency_side .menu_list').css({'height':h, 'max-height':h});
	});
	$('.currency_side .menu_list a.currency_item').on('tap, click', function(){
		var val=$(this).attr('data');
		$.post('/', 'do_action=action.currency&currency='+val, function(data){
			if(data.ret==1){
				global_obj.set_currency_location();
			}
		}, 'json');
		return false;
	});

	// 底部导航点击伸展
	$('.default_foot_menu .menu_list dt').on('click', function () {
		if ($(window).width() < 1000) {
			$(this).parent().toggleClass('focus');
			$(this).children('i').toggleClass('icon-mb_cut' + $(this).children('i').attr('class').match(/\d+/)[0]);
		}
	});

	/********************************************************* 响应式手机版头部导航弹窗js开始 *********************************************************/

	//************修改购物车产品 start**************
	//pc和手机都有 代码是一样的 修改的时候两边都要修改
	function ShippingCartHeight() {
		$('.global_shopping_cart_box .cart_list').height($(window).height() - $('.global_shopping_cart_box .cart_title').outerHeight(true) - $('.global_shopping_cart_box .cart_foot').outerHeight(true));
	}
	$('html').on('click', '.default_shopping_cart', function(){
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
	$.fn.shipping_cart_products_modify = function(obj, type) {
		var $this = obj,
			$box = $this.parent(),
			$qty = $box.find('input[name^="Qty"]'),
			$qty_num = parseInt($qty.val()),
			$moq_num = parseInt($qty.attr('moq')),
			$CId = parseInt($box.find('input[name="CId"]').val()),
			$ProId = parseInt($box.find('input[name="ProId"]').val());
		isNaN($qty_num) && type == 0 && ($qty_num = 1);
		isNaN($moq_num) && type == 0 && ($moq_num = 1);
		if (type == 1) {
			if ($this.hasClass('less')) {
				$qty_num--;
			} else {
				$qty_num++;
			}
		}
		if ($qty_num<=0 || $qty_num < $moq_num) {
			//移除产品
			if (type == 1) {
				$("html").shipping_cart_products_remove($CId, $box);
			}
		} else {
			//已选的产品
			$CIdStr = '0';
			$('.global_shopping_cart_box input[name="CId"]').each(function(){
				$CIdStr += ',' + $(this).val();
			});
			$Data = {'Qty':$qty_num, 'CId':$CId, 'ProId':$ProId, 'CIdAry':$CIdStr};
			$.post('/?do_action=cart.modify&CartType=pcRightSide'+'&t='+Math.random(), $Data, function(data){
				if (data.ret == 1) {
					let final_price = parseFloat(data.msg.total_price) - parseFloat(data.msg.cutprice);
					if (final_price < 0) final_price = 0;
					$qty.val(data.msg.qty);
					$('.global_shopping_cart_box .cart_list .gifts_item').remove();
					$('.global_shopping_cart_box .cart_list').append(data.msg.gifts_html);
					$box.parents('.shipping_cart_item').find('.shipping_cart_item_price').text($('html').iconvPriceFormat(data.msg.amount[$CId], 0, '', 1));
					$('.global_shopping_cart_box #shipping_cart_subtotal_price').text($('html').iconvPriceFormat(data.msg.total_price, 0, '', 1));
					$('.global_shopping_cart_box #shipping_cart_save_price').text($('html').iconvPriceFormat(data.msg.cutprice, 0, '', 1));
					$('.global_shopping_cart_box #shipping_cart_total_price').text($('html').iconvPriceFormat(final_price, 0, '', 1));
					if (parseFloat(data.msg.cutprice) > 0) {
						$('.global_shopping_cart_box .fsubtotal_price, .global_shopping_cart_box .fsave_price').show();
						$('.global_shopping_cart_box .fsave_price span:eq(1)').text(data.msg.disCountAry.DiscountText + '(-)');
					} else {
						$('.global_shopping_cart_box .fsubtotal_price, .global_shopping_cart_box .fsave_price').hide();
					}
					$('.header_cart .cart_count, .default_shopping_cart .cart_count').text(data.msg.cart_qty);
					$('.header_cart .cart_count_price, .default_shopping_cart .cart_count_price').text($('html').currencyFormat(data.msg.total_price,ueeshop_config.currency));
					$('.global_shopping_cart_box .cart_list').height($(window).height()-$('.global_shopping_cart_box .cart_title').outerHeight(true)-$('.global_shopping_cart_box .cart_foot').outerHeight(true));
				} else if (data.ret == -1) {
					//产品已被删，直接移除产品
					if (type == 1) {
						$("html").shipping_cart_products_remove($CId, $box);
					}
				}
			}, 'json');
		}
	};
	$.fn.shipping_cart_products_remove = function($CId, $box) {
		var $url = '/cart/remove_c' + $CId + '.html';
		$.get($url, {'ajax':1}, function(data) {
			$box.parents('.shipping_cart_item').fadeOut(500, function() {
				$box.parents('.shipping_cart_item').remove();
				if ($('.global_shopping_cart_box .cart_p_qty').length) {
					$('.global_shopping_cart_box .cart_p_qty:eq(0)').blur();
				} else {
					$('.global_shopping_cart_box .cart_empty').show();
					$('.global_shopping_cart_box #shipping_cart_total_price, .global_shopping_cart_box #shipping_cart_subtotal_price, .global_shopping_cart_box #shipping_cart_save_price').text($('html').iconvPriceFormat(0, 0, '', 1));
					$('.global_shopping_cart_box .fsubtotal_price, .global_shopping_cart_box .fsave_price').hide();
					$('.header_cart .cart_count, .default_shopping_cart .cart_count').text(0);
					$('.header_cart .cart_count_price, .default_shopping_cart .cart_count_price').text($('html').currencyFormat(0,ueeshop_config.currency));
				}
				$('.global_shopping_cart_box .cart_list').height($(window).height()-$('.global_shopping_cart_box .cart_title').outerHeight(true)-$('.global_shopping_cart_box .cart_foot').outerHeight(true));
			});
		}, 'json');
	};
	$('html').on('click', '.global_shopping_cart_box .qty_btn', function(){
		$("html").shipping_cart_products_modify($(this), 1);
	});
	$('html').on('blur', '.global_shopping_cart_box .cart_p_qty', function(){
		$("html").shipping_cart_products_modify($(this), 0);
	});
	$('html').on('click', '.global_shopping_cart_box .pdel', function(){
		var $box = $(this),
			$CId = parseInt($box.parents('.shipping_cart_item').find('input[name="CId"]').val());
		$("html").shipping_cart_products_remove($CId, $box);
	});
	$('html').on('keyup', '.global_shopping_cart_box .cart_p_qty', function(){
		var $reg = /^[0-9]*$/,
			$reg2 = /[^0-9]/g,
			$val = $(this).val();
		if (!$reg.test($val)) {
			$(this).val($val.replace($reg2, ''));
		}
		$val == '0' && $(this).val(1); //填写0就默认为1
	});
	$('html').on('click', '.global_shopping_cart_box .checkout_btn', function(){
		$(this).find('button').addClass('btn-loading');
	});
	// 预览模式底部弹窗栏
	if ($('.global_drafts_tips').size() && !window.frames.name) {
		setTimeout(function () {
			$('.global_drafts_tips').addClass('current');
		}, 2000);
		$('.global_drafts_tips .drafts_out_btn').on('click', function () {
			$.post('/', 'do_action=action.drafts_out', function (data) {
				if (data.ret == 1) window.location.href = '/';
			}, 'json');
		});
		$('.global_drafts_tips .drafts_hide_btn').on('click', function () {
			$('.global_drafts_tips').removeClass('current');
		});
	}
	//************修改购物车产品 end**************

	//后台编辑模式(放在最下面，以免有些事件禁止不了)
	if(window.frames.name == 'plugins_iframe_visual'){
		// 取消页面跳转
		$('*').on('click', function(){return false;});
		// 取消快捷购买弹窗，购物车
		$('html').off('click', '.add_cart').off('click', '.default_shopping_cart').off('click', '.btn_default_language_currency');
		// 跳转到当前编辑模块
		var get_id = global_obj.query_get('id');
		if (get_id != false) {
			$(window).load(function () {
				var get_id_top = parseInt($('*[visualWId='+get_id+']').offset().top);
				$('body,html').animate({scrollTop:get_id_top+'px'});
			});
		}
	}


	/****订单追踪start******/
	$('#tracking_btn').on('click',function(){
		var tracking_form = $('.query_number_form'),
			OrderNumber = tracking_form.find('input[name=OrderNumber]').val(),
			check_number = $('#check_number').val();
		if(global_obj.check_form(tracking_form.find('*[notnull]'), tracking_form.find('*[format]'), 0, 1)){return false;}
		if(OrderNumber==check_number) { return false;}
		tracking_form.find('input[type=submit]').attr('disabled', 'disabled');
		$.post('/','do_action=action.get_orders_tracking&OrderNumber='+OrderNumber,function(data){
			if(data.ret==1){
				$('#check_number').val(data.msg.OId);
				$('.no_orders').hide();
				$('.line_control_first').show();
				$('.line_control_second').hide();
				$('.ordersWrapper .orders_detail').hide();
				$('.ordersWrapper').show();
				$('#order_tracking_box').html('');
				$('.order_tracking_box').hide();
				global_obj.data_posting(1,lang_obj.web.global.loading); //加载效果
				let num = 1;
				for (k in data.msg.package_info) { //包裹信息
					let package_info = data.msg.package_info[k];
					let package_length = data.msg.package_info.length;
					let track_title = package_info.track_title;
					let track_info = '<div class="order_tracking_info"><div class="tracking_title" id="'+data.msg.OId+num+'">'+(package_length>1?track_title:'')+'</div><div class="tracking_box" id="order_tracking_box'+num+'">'+(package_info.TrackingNumber?'':data.msg.tips.no_tracking)+'</div></div>';
					$('#order_tracking_box').append(track_info);
					if(package_info.TrackingNumber){
						check_tracking(data.msg.OId,package_info.TrackingNumber,num);
					}
					num+=1;
				}
				click_track();
				$('.order_detail_btn').show();
				var  $pro_html= '';
				for (m in data.msg.pro_info){ //产品信息
					let pro_msg = data.msg.pro_info[m];
					$pro_html+='<div class="item clean ui_border_b">';
					$pro_html+=		'<div class="img fl"><a href="'+pro_msg.url+'"><img src="'+pro_msg.img+'" alt="'+pro_msg.name+'" /></a></div>';
					$pro_html+=		'<div class="info">';
					$pro_html+=			'<div class="name"><a href="'+pro_msg.url+'">'+pro_msg.name+'</a></div>';
					if(pro_msg.number){
						$pro_html+=		'<div class="number">'+data.msg.tips.number_tips+': '+pro_msg.number+'</div>';
					}
					if(pro_msg.attr_count){
						$pro_html+=pro_msg.attr;
					}
					if(pro_msg.custom_attributes){
						$pro_html+=pro_msg.custom_attributes;
					}
					$pro_html+=		'</div>';
					$pro_html+=		'<div class="value">';
					$pro_html+=			'<div class="price">'+pro_msg.price+'</div>';
					$pro_html+=			'<div class="qty">x'+pro_msg.qty+'</div>';
					$pro_html+=		'</div>';
					$pro_html+='</div>';
				}
				$('#detail_products').html($pro_html);
				let Symbol = data.msg.Symbol;
				$('#total_qty .value').html(data.msg.total_qty); //总数量
				$('#ProductPrice .value').html(Symbol+data.msg.ProductPrice); //产品价格
				$('#ShippingPrice .value').html(Symbol+data.msg.ShippingPrice); //运费
				if(data.msg.TaxPrice>0){ //税费
					$('#TaxPrice .value').html(Symbol+data.msg.TaxPrice);
					$('#TaxPrice').show();
				}else{ $('#TaxPrice').hide(); }
				if(data.msg.isFee && data.msg.FeePrice>0){ //手续费
					$('#FeePrice .value').html(Symbol+data.msg.FeePrice);
					$('#FeePrice').show();
				}else{ $('#FeePrice').hide(); }
				if(data.msg.DiscountPrice>0){ //限时促销
					$('#DiscountPrice .value').html(Symbol+data.msg.DiscountPrice);
					$('#DiscountPrice').show();
				}else{ $('#DiscountPrice').hide(); }
				if(data.msg.CouponPrice>0){ //优惠券折扣
					$('#CouponPrice .value').html(Symbol+data.msg.CouponPrice);
					$('#CouponPrice').show();
				}else{ $('#CouponPrice').hide(); }
				$('#TotalPrice .value').html(data.msg.TotalPrice);
			}else{
				$('.no_orders').show();
				$('.ordersWrapper').hide();
			}
		},'json');
		tracking_form.find('input[type=submit]').removeAttr('disabled');
	});

	$('.ordersWrapper').on('click','.order_detail_btn',function(){ //点击查看产品列表
		$(this).hide();
		$('.line_control_second').show();
		$('.ordersWrapper .orders_detail').show();
	});

	var check_tracking = function (OId,TrackingNumber,num){ //查询物流js
		YQV5.trackSingleF1({
            YQ_ElementId:""+OId+num+"",	//必须，指定悬浮位置的元素ID。
            YQ_TargetId:"order_tracking_box"+num,	//可选，指定悬浮位置的父级元素ID
            YQ_Width:600,	//可选，指定查询结果宽度，最小宽度为600px，默认撑满容器。
            YQ_Height:400,	//可选，指定查询结果高度，最大高度为800px，默认撑满容器。
            YQ_Lang:""+ueeshop_config.lang+"",	//可选，指定UI语言，默认根据浏览器自动识别。
            YQ_Num:""+TrackingNumber+""	//必须，指定要查询的单号。
        });
	};

	var load_track_div_show = function (){ //loading 效果后显示的div
		global_obj.data_posting(0);
		$('.order_tracking_box').show();
		$('.order_tracking_info').show();
		$('body, html').animate({scrollTop:$('.orders_tracking').offset().top-25}, 500);
	};
	var laod_track_iframe = function (){ //加载完iframe处理
		let track_iframe = $('#order_tracking_box').find('iframe');
		track_iframe.load(function(){
			load_track_div_show();
        	let track_height = $('#order_tracking_box').find('iframe').height();
        	$('#order_tracking_box .tracking_box').height(track_height);
		})
	};

	var click_track = function (){ //点击包裹
		$('#order_tracking_box .tracking_title:first').trigger('click');
		if($('#order_tracking_box .tracking_box iframe').size()){
			$('.order_tracking_info').hide();
			$('.order_tracking_info:not(:first)').find('.tracking_box').hide();
			laod_track_iframe();
		}else{
			load_track_div_show();
		}
		$('#order_tracking_box .tracking_title').on('click',function(){
			$(this).parent().find('.tracking_box').show();
			$(this).parent().siblings().find('.tracking_box').hide();
			laod_track_iframe();
		})

	};
	/****订单追踪end******/


	// cate_nav hover
	$('.cate_nav_item ,.cate_nav_sec_box').hover(function(){
		var mid = $(this).data('mid');
			$('.default_cate_nav .cate_nav_sec').find('.cate_nav_sec_box[data-mid="'+mid+'"]').css({"top":0,"opacity":"1","visibility":"unset"});
			$('.cate_nav_item').removeClass('hover');
			if(mid){
				$('.cate_nav_item[data-mid="'+mid+'"]').addClass('hover');
			}
	},function(){
		var mid = $(this).data('mid');
		$('.default_cate_nav .cate_nav_sec').find('.cate_nav_sec_box[data-mid="'+mid+'"]').css({"top":20,"opacity":"0","visibility":"hidden"});
		$('.cate_nav_item').removeClass('hover');
	});

});
