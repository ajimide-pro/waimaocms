<?php
namespace app;

use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\Handle;
use think\exception\HttpException;
use think\exception\HttpResponseException;
use think\exception\ValidateException;
use think\Response;
use Throwable;

/**
 * 应用异常处理类
 */
class ExceptionHandle extends Handle
{
    /**
     * 不需要记录信息（日志）的异常类列表
     * @var array
     */
    protected $ignoreReport = [
        HttpException::class,
        HttpResponseException::class,
        ModelNotFoundException::class,
        DataNotFoundException::class,
        ValidateException::class,
    ];

    /**
     * 记录异常信息（包括日志或者其它方式记录）
     *
     * @access public
     * @param  Throwable $exception
     * @return void
     */
    public function report(Throwable $exception): void
    {
        // 使用内置的方式记录异常日志
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @access public
     * @param \think\Request   $request
     * @param Throwable $e
     * @return Response
     */
    public function render($request, Throwable $e): Response
    {
        // 添加自定义异常处理机制
        // 请求异常

        if ($e instanceof HttpException && $request->isAjax()) {
            return response($e->getMessage(), $e->getStatusCode());
        }
        // 使用了错误的数据类型 或 缺失参数
        if ($e instanceof InvalidArgumentException || $e instanceof ErrorException) {
            $fileUrlArr = explode(DIRECTORY_SEPARATOR, $e->getFile());
            $data = [
                'err_msg' => $e->getMessage(),
                'file' => $fileUrlArr[count($fileUrlArr) - 1],
                'line' => $e->getLine()
            ];
            return result($data, '参数错误', 413);
        }
        // 1.参数验证错误
        if ($e instanceof ValidateException) {
            return result($e->getMessage(), '参数验证不通过', 201);
        }
        // 2.方法（控制器、路由、http请求）、资源（多媒体文件，如视频、文件）未匹配到，
        // 一旦在定义的路由规则中匹配不到，它就会直接去匹配控制器，但是因为在控制器中做了版本控制v1,v2这样的，所以它是无法获取对应控制器的
        // 所以都会直接走了HttpException的错误
        // 感觉好像也无所谓，反正是做api接口的，只不过这样就不好准确的提示信息了
        // 到底这个请求时控制器找不到呢？还是方法找不到？还是请求类型（get,post）不对？

/*
        if(($e instanceof ClassNotFoundException || $e instanceof RouteNotFoundException) || ($e instanceof HttpException && $e->getStatusCode()==404)){
            $data = [
                'err_msg' => $e -> getMessage(),
                'tip_1' => '请检查路径是否是否填写正确',
                'tips_2' => '请检查请求类型是否正确',
            ];
            return result($data, '方法或资源未找到，请检查', 404);
        }
*/
        // 3.语法错误
        if ($e instanceof ParseError) {
            $fileUrlArr = explode(DIRECTORY_SEPARATOR, $e->getFile());
            $data = [
                'err_msg' => $e->getMessage(),
                'file' => $fileUrlArr[count($fileUrlArr) - 1],
                'line' => $e->getLine()
            ];
            return result($data, '服务器异常-语法错误', 411);
        }
        // 4.数据库错误
        if ($e instanceof PDOException || $e instanceof DbException) {
            $fileUrlArr = explode(DIRECTORY_SEPARATOR, $e->getFile());
            $data = [
                'err_msg' => $e->getMessage(),
                'file' => $fileUrlArr[count($fileUrlArr) - 1],
                'line' => $e->getLine()
            ];
            return result($data, '服务器异常-数据库错误', 412);
        }
        // 其他错误交给系统处理
        return parent::render($request, $e);
    }

}
