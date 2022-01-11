;(function () {

	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var mobileClickMenu = function() {

		if ( isMobile.any() ) {
			$('#fh5co-header .nav li a').click(function(){
			if( $(this).next().is('ul') ){
			 $(this).next('ul').css('display','none');
			 if( $(this).next('ul').css('display') == 'none' ){
			  $(this).next('ul').show();

			  $(this).find('span').removeClass("downward");
			  $(this).find('span').addClass("upward");
			  return false;
			 }else{
			  $(this).next('ul').hide();
			  $(this).next('ul').find('ul').slideUp();
			  $(this).find('i').attr("class","touch-arrow-down");
			  $(this).find('span').removeClass("upward");
			  $(this).find('span').addClass("downward");
			  return false;
			 }
			}

		   });
		}

	};
    // Document on load.
	$(function(){
		mobileClickMenu();
	});


}());

jQuery(document).ready(function(){

 /*top*/
	 var $backToTopTxt = "", $backToTopEle = $('<div class="backToTop"></div>').appendTo($("body"))
        .text($backToTopTxt).attr("title", $backToTopTxt).click(function() {
            $("html, body").animate({ scrollTop: 0 }, 120);
     }), $backToTopFun = function() {
        var st = $(document).scrollTop(), winh = $(window).height();
        (st > 0)? $backToTopEle.show(): $backToTopEle.hide();

        if (!window.XMLHttpRequest) {
            $backToTopEle.css("top", st + winh - 166);
        }
     };
     $(window).bind("scroll", $backToTopFun);
    $(function() { $backToTopFun(); });

	 /*top*/


	 /*search*/
	 $("#fh5co-header .icon-search").click(function(){
	    $("#form-search").toggle();
	});
});


//clickcount
function showNum(cid,ctype,cshow,showid){

	$.get('/config/count.asp',{id:cid,stype:ctype,show:cshow},function(data){
		$(showid).html(data);
	});
}
