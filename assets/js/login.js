$(function(){
    $('#link_reg').on('click',function(){
        $('.login_box').hide()
        $('.reg_box').show()
    })
    $('#link_login').on('click',function(){
        $('.login_box').show()
        $('.reg_box').hide()
    })

    // 验证表单
    var form =layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        repwd:function(value){
            if(value!==$('.reg_box [name=password]').val()){
                return  '俩次输入密码不一致'
            }
        }
    })
    // 注册功能
    var layer=layui.layer
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/api/reguser',
            // data:$(this).serialize()
            data:{
                username:$('.reg_box [name=username]').val(),
                password:$('.reg_box [name=password]').val()
            },
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('#link_login').click()
                $('#form_reg')[0].reset()
            }
        })
    })
    // 登录功能
    $("#form_login").on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:$('#form_login').serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')
                localStorage.setItem('token',res.token)
                location.href='/index.html'
            }
        })
    })

})