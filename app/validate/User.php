<?php
/**
 * Created by PhpStorm.
 * User: guiyang
 * Date: 2021/10/17
 * Time: 13:02
 */
namespace app\validate;

use think\Validate;

class User extends Validate
{
    protected $rule =   [
        'username'  => 'require|max:25|min:5',
        'password'   => 'require|min:6',
    ];

    protected $message  =   [
        'username.require' => '用户名必须填写',
        'username.max'     => '用户名最多不能超过25个字符',
        'username.min'     => '用户名最小为5个字符',
        'password.require'   => '密码必须填写',
        'password.min'  => '密码不能小于6位',
    ];

}

