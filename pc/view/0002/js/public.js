
// 汉堡导航
$('.hambur').click(function () {
    $('.hambur').toggleClass('open');
    $('.hammenu').toggleClass('open')
});
// 顶部 position
$('.header').addClass('position');
// 下拉导航
// $('.header .w1200 .right .nav li').hover(function(){
//     $(this).children('.list').stop().fadeIn()
// },function(){
//     $(this).children('.list').stop().fadeOut()
// })
// 登录弹窗
$('.header .w1200 .right .menu .login').click(function(){
    $('.blackBackground').fadeIn();
    $('.loginWindow').fadeIn()
});
$('.close').click(function(){
    $('.blackBackground').fadeOut();
    $('.loginWindow').fadeOut();
    $('.BindingPhone_outer').fadeOut()
});
// 个人信息下拉框
$('.loggedIn').hover(function(){
    $(this).children('.content').children('.list').stop().fadeIn()
},function(){
    $(this).children('.content').children('.list').stop().fadeOut()
});
// 判断登录状态,存缓存
let thisState = '已登录';

// 轮播图
var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal', // 垂直切换选项
    speed: 500,
    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// 多样化的功能扩展
// var mySwiper = new Swiper ('.swiper-container', {
//     direction: 'horizontal', // 垂直切换选项
//     observer: true,
//     // 如果需要分页器
//     pagination: {
// 	    el: '.swiper-pagination',
//     	clickable: true,
// 	    renderBullet: function (index, className) {
//             var text = ['系统','网站','询盘','营销','招聘'];
// 	        return '<div class="' + className + '"><image src="images/swipericon/index' + ( index  + 1 ) + '.png"><p>'+ text[index] +'</p></div>';
//     	},
//     },
// })
