// 开发环境服务器地址
var baseURL='http://ajax.frontend.itheima.net'
// 拦截所有的ajax请求
$.ajaxPrefilter(function(params){
    // 拼接对应环境的服务器地址
    params.url=baseURL+params.url
    // 对有需要权限的接口配置 headers 头信息
    // 必须是  /my/ 开头的
    if(params.url.indexOf('/my/')!==-1){
        params.headers={
            Authorization: localStorage.getItem('token') || ''
        }
    }
    params.complete=function(res){
        console.log(res.responseJSON);
        var obj=res.responseJSON
        if(obj.status==1&&obj.message=='身份认证失败！'){
            localStorage.removeItem('token')
            location.href='/login.html'
        }
    }
})