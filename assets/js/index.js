$(function(){
    getUserInfo()
    // 退出功能
    // layui  提供的询问框
    var layer=layui.layer
    $('#btnLogout').on('click',function(){
        layer.confirm('是否确认退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            location.href='/login.html'
            
            layer.close(index);
          });
    })
})
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers:{
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success:function(res){
            if(res.status!==0){
                return layui.layer.msg(res.message)
            }
            // 请求成功，渲染头像
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(user){
    var name=user.nickname||user.username
    $('#welcome').html('欢迎'+name)
    if(user.user_pic!==null){
       $('.layui-nav-img').show().attr('src',ser.user_pic) 
       $('.text-avatar').hide()
    }else{
        var text=name[0].toUpperCase()
        $('.text-avatar').show().html(text)
        $('.layui-nav-img').hide()
    }
}