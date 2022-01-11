<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------
use think\facade\Route;

// api版本控制
$v = request()->header('Api-Version');
// 默认api版本为v1
if ($v == null) $v = "v1";

// 菜单权限
Route::group('menu', function () {
    Route::get('index', 'index')->middleware(['CheckToken']);
})->prefix($v.'.menu/');

// 后台用户
Route::group('user', function () {
    Route::post('login', 'login');
    Route::get('info', 'info')->middleware(['CheckToken']);
    Route::post('editInfo', 'editInfo')->middleware(['CheckToken','CheckMenu']); //修改个人资料
    Route::get('Roles_get_list', 'Roles_get_list')->middleware(['CheckToken','CheckMenu']);
    Route::post('Create', 'Create')->middleware(['CheckToken','CheckMenu']);
    Route::get('Create_get_list', 'Create_get_list')->middleware(['CheckToken','CheckMenu']);
    Route::post('Status', 'Status')->middleware(['CheckToken','CheckMenu']);
    Route::post('Create_edit', 'Create_edit')->middleware(['CheckToken','CheckMenu']);
    Route::post('Create_delete', 'Create_delete')->middleware(['CheckToken','CheckMenu']); //用户删除
    Route::get('Rules_btn_get_list', 'Rules_btn_get_list')->middleware(['CheckToken','CheckMenu']);
})->prefix($v.'.user/')->pattern(['id' => '\d+']);

// 后台设置
Route::group('setting', function () {
    Route::post('siteinfo', 'siteinfo')->middleware(['CheckToken','CheckMenu']); //创建设置
    Route::post('siteinfo_get', 'siteinfo_get')->middleware(['CheckToken','CheckMenu']);//设置详情.
    Route::post('systeminfo', 'systeminfo')->middleware(['CheckToken','CheckMenu']); //创建设置
    Route::post('systeminfo_get', 'systeminfo_get');//设置详情
})->prefix($v.'.setting/')->pattern(['id' => '\d+']);

// 单页管理
Route::group('onePage', function () {
    Route::post('Create', 'Create')->middleware(['CheckToken','CheckMenu']); //创建内容
    Route::post('CreateClassify', 'CreateClassify')->middleware(['CheckToken','CheckMenu']); //创建分类
    Route::post('CreateClassify_get', 'CreateClassify_get')->middleware(['CheckToken','CheckMenu']); //分类详情
    Route::get('CreateClassify_get_list', 'CreateClassify_get_list')->middleware(['CheckToken','CheckMenu']); //分类列表
    Route::get('Create_get_list', 'Create_get_list')->middleware(['CheckToken','CheckMenu']); //内容列表
    Route::post('CreateClassify_edit', 'CreateClassify_edit')->middleware(['CheckToken','CheckMenu']); //分类编辑
    Route::post('Create_edit', 'Create_edit')->middleware(['CheckToken','CheckMenu']); //内容编辑
    Route::post('CreateClassify_delete', 'CreateClassify_delete')->middleware(['CheckToken','CheckMenu']); //分类删除
    Route::post('Create_delete', 'Create_delete')->middleware(['CheckToken','CheckMenu']); //内容删除
    Route::post('Create_get', 'Create_get')->middleware(['CheckToken','CheckMenu']); //内容详情
})->prefix($v.'.onePage/')->pattern(['id' => '\d+']);

// 上传
Route::group('upload', function () {
    Route::post('image', 'image')->middleware('CheckToken'); //上传图片
    Route::post('fujian', 'fujian')->middleware('CheckToken'); //上传附件
})->prefix($v.'.upload/')->pattern(['id' => '\d+']);

// 菜单权限
Route::group('roles', function () {
    Route::get('Menu_get_list', 'Menu_get_list')->middleware(['CheckToken','CheckMenu']); //
    Route::post('Create', 'Create')->middleware(['CheckToken','CheckMenu']); //创建
    Route::get('Roles_get_list', 'Roles_get_list')->middleware(['CheckToken','CheckMenu']); //权限列表
    Route::post('Create_delete', 'Create_delete')->middleware(['CheckToken','CheckMenu']); //角色删除
    Route::post('Create_edit', 'Create_edit')->middleware(['CheckToken','CheckMenu']); //角色编辑
})->prefix($v.'.roles/')->pattern(['id' => '\d+']);


// 项目管理
Route::group('project', function () {

    Route::post('Create_declare', 'Create_declare')->middleware(['CheckToken','CheckMenu']); //创建项目申报
    Route::get('Create_declare_list', 'Create_declare_list')->middleware(['CheckToken','CheckMenu']); //项目申报列表
    Route::post('Create_declare_delete', 'Create_declare_delete')->middleware(['CheckToken','CheckMenu']); //删除项目申报
    Route::post('Create_declare_edit', 'Create_declare_edit')->middleware(['CheckToken','CheckMenu']); //修改项目申报
    Route::post('Create_check', 'Create_check')->middleware(['CheckToken','CheckMenu']); //申报立项
    Route::post('Create_audit', 'Create_audit')->middleware(['CheckToken','CheckMenu']); //立项审核


})->prefix($v.'.project/');

// 实施项目管理
Route::group('projectdd', function () {


    Route::get('Create_dd_list', 'Create_dd_list')->middleware(['CheckToken','CheckMenu']); //实施项目列表
    Route::post('Create_detailed', 'Create_detailed')->middleware(['CheckToken','CheckMenu']); //创建项目明细
    Route::get('Create_detailed_list', 'Create_detailed_list')->middleware(['CheckToken','CheckMenu']); //项目明细列表
    Route::post('Create_detailed_delete', 'Create_detailed_delete')->middleware(['CheckToken','CheckMenu']); //项目明细删除
    Route::post('Create_detailed_edit', 'Create_detailed_edit')->middleware(['CheckToken','CheckMenu']); //修改项目明细

})->prefix($v.'.projectdd/');


// 部门管理
Route::group('DepartMent', function () {
    Route::post('Create', 'Create')->middleware(['CheckToken','CheckMenu']); //创建
    Route::get('DepartMent_get_list', 'DepartMent_get_list')->middleware(['CheckToken','CheckMenu']);
    Route::post('Create_edit', 'Create_edit')->middleware(['CheckToken','CheckMenu']); //部门编辑
    Route::post('Create_delete', 'Create_delete')->middleware(['CheckToken','CheckMenu']); //部门删除
})->prefix($v.'.DepartMent/');

// 岗位管理
Route::group('Position', function () {
    Route::post('Create', 'Create')->middleware(['CheckToken','CheckMenu']); //创建
    Route::get('Position_get_list', 'Position_get_list')->middleware(['CheckToken','CheckMenu']);
    Route::post('Create_edit', 'Create_edit')->middleware(['CheckToken','CheckMenu']); //部门编辑
    Route::post('Create_delete', 'Create_delete')->middleware(['CheckToken','CheckMenu']); //部门删除
})->prefix($v.'.Position/');

// 数据.....
Route::group('Data', function () {
    Route::post('count_table', 'count_table')->middleware(['CheckToken']); //
    Route::post('count_day', 'count_day')->middleware(['CheckToken']);
})->prefix($v.'.Data/');


// 产品
Route::group('Product', function () {
    Route::post('Create_attribute', 'Create_attribute')->middleware(['CheckToken','CheckMenu']); //
    Route::get('Create_attribute_list', 'Create_attribute_list')->middleware(['CheckToken','CheckMenu']);
    Route::post('Create_attribute_edit', 'Create_attribute_edit')->middleware(['CheckToken','CheckMenu']);
    Route::post('Create_attribute_delete', 'Create_attribute_delete')->middleware(['CheckToken','CheckMenu']);

    Route::post('CreateClassify', 'CreateClassify')->middleware(['CheckToken','CheckMenu']); //创建分类
    Route::post('CreateClassify_get', 'CreateClassify_get')->middleware(['CheckToken','CheckMenu']); //分类详情
    Route::get('CreateClassify_get_list', 'CreateClassify_get_list')->middleware(['CheckToken','CheckMenu']); //分类列表
    Route::post('CreateClassify_edit', 'CreateClassify_edit')->middleware(['CheckToken','CheckMenu']); //分类编辑
    Route::post('CreateClassify_delete', 'CreateClassify_delete')->middleware(['CheckToken','CheckMenu']); //分类删除

    Route::post('Create_product', 'Create_product')->middleware(['CheckToken','CheckMenu']);
    Route::get('Create_product_list', 'Create_product_list')->middleware(['CheckToken','CheckMenu']);
    Route::post('CreateProduct_edit', 'CreateProduct_edit')->middleware(['CheckToken','CheckMenu']);
    Route::post('CreateProduct_delete', 'CreateProduct_delete')->middleware(['CheckToken','CheckMenu']);



})->prefix($v.'.Product/');

// 属性  联动
Route::group('Attribute', function () {
    Route::get('Create_get_list', 'Create_get_list')->middleware(['CheckToken','CheckMenu']);
})->prefix($v.'.Attribute/');


// 导航管理
Route::group('NavigaTion', function () {
    Route::post('Create', 'Create')->middleware(['CheckToken','CheckMenu']); //创建
    Route::get('NavigaTion_get_list', 'NavigaTion_get_list')->middleware(['CheckToken','CheckMenu']);
    Route::post('Create_edit', 'Create_edit')->middleware(['CheckToken','CheckMenu']); //部门编辑
    Route::post('Create_delete', 'Create_delete')->middleware(['CheckToken','CheckMenu']); //部门删除
})->prefix($v.'.NavigaTion/');

// 广告管理
Route::group('Ad', function () {
    Route::post('Create', 'Create')->middleware(['CheckToken','CheckMenu']); //创建
    Route::get('Ad_get_list', 'Ad_get_list')->middleware(['CheckToken','CheckMenu']);
    Route::post('Create_edit', 'Create_edit')->middleware(['CheckToken','CheckMenu']); //部门编辑
    Route::post('Create_delete', 'Create_delete')->middleware(['CheckToken','CheckMenu']); //部门删除
})->prefix($v.'.Ad/');


// 联系方式
Route::group('Contact', function () {
    Route::post('Create', 'Create')->middleware(['CheckToken','CheckMenu']); //创建
    Route::get('Contact_get_list', 'Contact_get_list')->middleware(['CheckToken','CheckMenu']);
    Route::post('Create_edit', 'Create_edit')->middleware(['CheckToken','CheckMenu']); //部门编辑
    Route::post('Create_delete', 'Create_delete')->middleware(['CheckToken','CheckMenu']); //部门删除
})->prefix($v.'.Contact/');



// 案列
Route::group('CaseCase', function () {

    Route::get('Create_attribute_list', 'Create_attribute_list')->middleware(['CheckToken','CheckMenu']);
    Route::post('CreateClassify', 'CreateClassify')->middleware(['CheckToken','CheckMenu']); //创建分类
    Route::post('CreateClassify_get', 'CreateClassify_get')->middleware(['CheckToken','CheckMenu']); //分类详情
    Route::get('CreateClassify_get_list', 'CreateClassify_get_list')->middleware(['CheckToken','CheckMenu']); //分类列表
    Route::post('CreateClassify_edit', 'CreateClassify_edit')->middleware(['CheckToken','CheckMenu']); //分类编辑
    Route::post('CreateClassify_delete', 'CreateClassify_delete')->middleware(['CheckToken','CheckMenu']); //分类删除

    Route::post('Create_product', 'Create_product')->middleware(['CheckToken','CheckMenu']);
    Route::get('Create_product_list', 'Create_product_list')->middleware(['CheckToken','CheckMenu']);
    Route::post('CreateProduct_edit', 'CreateProduct_edit')->middleware(['CheckToken','CheckMenu']);
    Route::post('CreateProduct_delete', 'CreateProduct_delete')->middleware(['CheckToken','CheckMenu']);

})->prefix($v.'.CaseCase/');

// 新闻
Route::group('News', function () {

    Route::get('Create_attribute_list', 'Create_attribute_list')->middleware(['CheckToken','CheckMenu']);
    Route::post('CreateClassify', 'CreateClassify')->middleware(['CheckToken','CheckMenu']); //创建分类
    Route::post('CreateClassify_get', 'CreateClassify_get')->middleware(['CheckToken','CheckMenu']); //分类详情
    Route::get('CreateClassify_get_list', 'CreateClassify_get_list')->middleware(['CheckToken','CheckMenu']); //分类列表
    Route::post('CreateClassify_edit', 'CreateClassify_edit')->middleware(['CheckToken','CheckMenu']); //分类编辑
    Route::post('CreateClassify_delete', 'CreateClassify_delete')->middleware(['CheckToken','CheckMenu']); //分类删除

    Route::post('Create_product', 'Create_product')->middleware(['CheckToken','CheckMenu']);
    Route::get('Create_product_list', 'Create_product_list')->middleware(['CheckToken','CheckMenu']);
    Route::post('CreateProduct_edit', 'CreateProduct_edit')->middleware(['CheckToken','CheckMenu']);
    Route::post('CreateProduct_delete', 'CreateProduct_delete')->middleware(['CheckToken','CheckMenu']);

})->prefix($v.'.News/');

// 生成导航url
Route::group('Give_NavigaTion', function () {
    Route::post('cydh', 'cydh')->middleware('CheckToken'); //常用导航
    Route::post('cpfl', 'cpfl')->middleware('CheckToken'); //产品分类
    Route::post('cpcp', 'cpcp')->middleware('CheckToken'); //产品
    Route::post('xwfl', 'xwfl')->middleware('CheckToken'); //新闻分类
    Route::post('xwxw', 'xwxw')->middleware('CheckToken'); //新闻
    Route::post('alfl', 'alfl')->middleware('CheckToken'); //案例分类
    Route::post('dydy', 'dydy')->middleware('CheckToken'); //单页
})->prefix($v.'.Give_NavigaTion/');




// 插件管理
Route::group('Plug', function () {
    Route::post('Create', 'Create')->middleware(['CheckToken','CheckMenu']); //创建
    Route::get('Ad_get_list', 'Ad_get_list')->middleware(['CheckToken','CheckMenu']);
    Route::post('Create_edit', 'Create_edit')->middleware(['CheckToken','CheckMenu']); //部门编辑
    Route::post('Create_delete', 'Create_delete')->middleware(['CheckToken','CheckMenu']); //部门删除
})->prefix($v.'.Plug/');



// 百度翻译
Route::group('FanyiBaidu', function () {
    Route::post('translate', 'translate')->middleware(['CheckToken']);
})->prefix($v.'.FanyiBaidu/');


// 数据管理
Route::group('DataData', function () {
    Route::get('Create_get_list', 'Create_get_list')->middleware(['CheckToken','CheckMenu']);
    Route::post('Create_edit', 'Create_edit')->middleware(['CheckToken','CheckMenu']);
    Route::post('Create_delete', 'Create_delete')->middleware(['CheckToken','CheckMenu']);
})->prefix($v.'.DataData/');




