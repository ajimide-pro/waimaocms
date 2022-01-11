<?php

namespace app\middleware;
use thans\jwt\facade\JWTAuth;
use thans\jwt\exception\JWTException;

class CheckToken
{
    public function handle($request, \Closure $next)
    {
        // OPTIONS请求直接返回
        if ($request->isOptions()) {
            return response();
        }
        try {
            JWTAuth::auth();
        }catch (JWTException $e) {
            return result('token不能为空',$e->getMessage(),201);
        }
        return $next($request);
    }
}
