$(function () { 
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth()+1)
        var d = padZero(dt.getDate() )
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        
        return y + '-' + m + '-' + d + '' + hh + ':' + mm + ':' +ss
    }
    function padZero(n) { 
      n > 9 ? n : "0" + n
    }
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state:''
    }
    initTable()
    initCate()
    function initTable() { 
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) { 
                    return layer.msg('获取文章列表失败')
                }
                console.log(res);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }
    function initCate() { 
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) { 
                if (res.status !== 0) { 
                    return layer.msg('获取数据失败')
                }
                var htmlStr = template('tpl-cate', res)
                $('[name="cate_id"]').html(htmlStr)
                form.render()
            }
        })
    }
    $('#form-search').on('submit', function (e) { 
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    })
    function renderPage(total) { 
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            limits:[2,3,5,10],
            layout:['count','limit','prev', 'page', 'next','skip'],
            jump: function (obj,first) { 
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) { 
                    initTable()
                }
            }
        })
    }
})
