// 开发环境服务器地址
var baseURL='http://ajax.frontend.itheima.net'
// 拦截所有的ajax请求
$.ajaxPrefilter(function(parans){
    // 拼接对应环境的服务器地址
    parans.url=baseURL+parans.url
})