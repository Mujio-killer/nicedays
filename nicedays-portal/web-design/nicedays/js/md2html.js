
// var marked = require('marked');
// var rendererMD = new marked.Renderer();
// marked.setOptions({
//   renderer: rendererMD,
//   gfm: true,
//   tables: true,
//   breaks: false,
//   pedantic: false,
//   sanitize: false,
//   smartLists: true,
//   smartypants: false
// });//基本设置
// console.log(marked('I am using __markdown__.'));
// // Outputs: <p>I am using <strong>markdown</strong>.</p>



// //省去声明...    
// document.getElementById('content').innerHTML =
//       marked('# Marked in browser\n\nRendered by **marked**.');




$("#mysql").click(function(){
    var url = "http://127.0.0.1:5501/article-html/mysql.html";
    var data = {type:1};
    $.ajax({
        type : "get",
        async : false,  //同步请求
        url : url,
        data : data,
        timeout:1000,
        success:function(dates){
            //alert(dates);
            $("#mainContent").html(dates);//要刷新的div
        },
        error: function() {
           // alert("失败，请稍后再试！");
        }
    });
});