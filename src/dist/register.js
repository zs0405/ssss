var user=document.querySelector(".text"),password=document.querySelector(".password"),btn=document.querySelector(".btn");console.log(btn),btn.onclick=function(){var e=user.value,o=password.value;ajax({url:"/api/register",type:"post",data:{user:e,pass:o},success:function(e){1===e.code&&(location.href="login.html")}})};