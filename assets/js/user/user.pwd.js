$(function(){
    var form=layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        samePwd:function(value){
            if(value==$('[name=oldPwd]').val()){
                return '新密码和旧密码不能一样'
            }
        } ,
        rePwd:function(value){
            if(value!==$('[name=newPwd]').val()){
                return '俩次输入不一致'
            }
        }

    })
    // 表单提交
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layui.layer.msg('res.message')
                }
                layui.layer.msg('密码修改成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})