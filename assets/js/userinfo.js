$(function () { 
    const form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) { 
                return '昵称长度应为 1 ~ 6 位字符'
            }
         }
    })
})
initUserInfo()
function initUserInfo() { 
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            console.log(res);
           layui.form.val('formUserInfo',res.data)
         }
    })
}
$('#btnReset').on('click', function (e) {
    e.preventDefault();
    initUserInfo()
})
$('.layui-form').on('submit', function (e) { 
    e.preventDefault()
    $.ajax({
        method: 'post',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) { 
                return layui.layer.msg('修改用户信息失败')
            }
            layui.layer.msg('修改用户信息成功')
            window.parent.getUserInfo()
         }
    })
})